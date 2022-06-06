const { uploadFile } = require('../../../utils/aws-upload')

const hookUploadFile = async (file) => {
  const location = await uploadFile({
    fileName: `${Date.now()}-${file.originalname}`,
    mimetype: file.mimetype,
    body: file.buffer,
    bucket: process.env.AWS_BUCKET_FORMATS
  }).catch((error) => console.log(error))

  return {
    name: file.originalname,
    mimetype: file.mimetype,
    url: location
  }
}

module.exports = {
  hookUploadFile
}
