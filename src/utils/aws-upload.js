const aws = require('aws-sdk')
const multer = require('multer')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_KEY
})

const receiveFile = multer({
  storage: multer.memoryStorage()
}).single('image')

const uploadFile = async ({ fileName, body, mimetype }) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: body,
    ContentType: mimetype
  }

  try {
    const { Location = null } = await s3.upload(params).promise()
    return Location
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  uploadFile,
  receiveFile
}
