const express = require('express');

const store = require('./apis/store');
const s3 = require('./apis/s3')

const router = express.Router();

router.get('/system/health', (req, res, next) => res.status(200).json({ statusCode: 200, statusMessage: 'ok' }));

router.use('/store', store);
router.use('/s3', s3)

module.exports = router;
