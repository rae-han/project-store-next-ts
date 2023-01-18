const getBoundary = (contentType) => {
  console.log(contentType);

  const contentTypes = contentType.split(';');
  console.log(contentTypes)
  let boundaryValue = '';

  if (contentTypes) {
    const boundary = contentTypes.find((item) => item.trim().includes('boundary'))
    boundaryValue = boundary.trim().split('=')[1];

    console.log(2, boundaryValue)
  }

  console.log(3, boundaryValue)
}

getBoundary('multipart/form-data; boundary=--------------------------496092578438770810468409')