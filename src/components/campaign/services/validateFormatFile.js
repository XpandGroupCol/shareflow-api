const { uploadS3File } = require('../../../utils/aws/S3')
const { checkFormatFile } = require('../../../utils/formatFile')

const validateFormatFile = async ({ files, conditions }) => {
  if (files.length) {
    for await (const file of files) {
      await checkFormatFile(file.buffer, file.mimetype, conditions)
    }
  }

  const filesUpload = []
  for await (const file of files) {
    const response = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer,
      bucket: process.env.AWS_BUCKET_FORMATS
    })
    filesUpload.push(response)
  }

  return filesUpload
}

module.exports = validateFormatFile
