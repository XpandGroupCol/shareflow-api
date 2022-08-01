const aws = require('aws-sdk')
const multer = require('multer')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_KEY
})

// TODO: CAMBIAR ESTE METODO

const receiveFile = multer({
  storage: multer.memoryStorage()
}).single('image')

const uploadFile = async ({ fileName, body, mimetype, bucket }) => {
  const params = {
    Bucket: bucket || process.env.AWS_BUCKET_NAME,
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

const uploadS3File = async ({ fileName, body, mimetype, bucket }) => {
  const key = `${Date.now()}-${fileName}`
  const params = {
    Bucket: bucket || process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: mimetype
  }

  try {
    const { Location = null } = await s3.upload(params).promise()
    return {
      url: Location,
      name: key
    }
  } catch (e) {
    return {
      url: null, name: null
    }
  }
}

const deleteS3File = async ({ name, bucket }) => {
  const params = {
    Bucket: bucket || process.env.AWS_BUCKET_NAME,
    Key: name
  }

  try {
    await s3.deleteObject(params).promise()
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  uploadFile,
  receiveFile,
  uploadS3File,
  deleteS3File
}
