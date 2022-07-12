const aws = require('aws-sdk')
const { getRandomName } = require('../config/utils')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_KEY
})

const uploadFile = async ({ fileName, body, mimetype, bucket }) => {
  const params = {
    Bucket: bucket || process.env.AWS_BUCKET_NAME,
    Key: `${getRandomName(fileName)}`,
    Body: body,
    ContentType: mimetype
  }

  try {
    const { Location = null } = await s3.upload(params).promise()

    return {
      name: fileName,
      url: Location
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

const removeFile = async ({ bucket, key }) => {
  try {
    await s3.deleteObjects({ Bucket: bucket || process.env.AWS_BUCKET_NAME, Key: key }).promise()
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  uploadFile,
  removeFile
}
