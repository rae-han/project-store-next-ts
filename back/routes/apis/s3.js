const express = require('express');
const { Readable } = require('stream');
const AWS = require('aws-sdk')
const multer = require('multer');
const sharp = require('sharp');
const axios = require('axios');

const router = express.Router();
const upload = multer()

AWS.config.update({ region: 'ap-northeast-2' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function CreateUploadParams ({ bucket, file, key }) {
  this.bucket = bucket;
  this.key = key;

  const mimetype = file.mimetype;
  const today = new Date();

  this.do = async ({ option, resizeConfig } = {}) => {
    let fileBuffer = file.buffer;

    if (option === 'resize' || option === 'loading') {
      console.log(resizeConfig)
      fileBuffer = await sharp(fileBuffer)
        .resize(resizeConfig)
        .toBuffer()
    }

    if (option === 'grey') {
      fileBuffer = await sharp(fileBuffer)
        .greyscale()
    }

    if (option === 'webp') {
      fileBuffer = await sharp(fileBuffer)
        .webp()
    }

    const fileStream = Readable.from(fileBuffer);

    const directory = `images`;
    const utcTime = `${today.getUTCFullYear()}/${today.getUTCMonth()+1}/${today.getTime()}`;
    const ext = option === 'webp' ? 'webp' : mimetype.split('/')[1];

    const Key = `${directory}/${utcTime}_${option}.${ext}`;

    const params = {
      Bucket: this.bucket,
      Key,
      Body: fileStream,
      ACL: 'public-read',
      ContentType: `${mimetype}`,
    }

    const result = await s3.upload(params).promise();
    console.log(result)
    return result.Location;
  }
}

// # File Upload Router
router.post('/upload', upload.single('file'), async (req, res, next) => {
  // ## req.body
  const {
    options = {
      resize: true,
      gray: false,
      grey: true,
    },
    bucketName = 'raehan-test',
    resizeConfig = {},
  } = req.body;
  const result = {}
  const webp = ['jpeg', 'png', 'gif'];
  console.log('######## ######## file upload server ######## ########');
  // ## req.file
  // console.log(req.file)
  if (!req.file) {
    return res.json({ message: 'not a image' });
  }

  const file = req.file
  const upload = new CreateUploadParams({ bucket: bucketName, file, key: 'test' })

  const metadata = await sharp(file.buffer).metadata();
  const { format, size, width, height } = metadata;
  console.log(format, size, width, height)

  result.origin = await upload.do({ option: 'original' });
  result.loading = await upload.do({ option: 'loading', resizeConfig: {
    width: width/4 > 160 ? Math.ceil(width/4) : 160
  }})

  if (webp.includes(format)) {
    result.webp = await upload.do({ option: 'webp' });
  }

  if (options.resize) {
    result.resize = await upload.do({ option: 'resize', resizeConfig });
  }

  if (options.gray || options.grey) {
    result.grey = await upload.do({ option: 'grey' })
  }

  res.status(200).json(result);
});

module.exports = router;