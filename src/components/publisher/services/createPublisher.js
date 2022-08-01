const Publisher = require('../../../models/Publisher')
const { uploadS3File } = require('../../../utils/aws/S3')

const createPublisher = async ({ file, body }) => {
  if (file) {
    const logo = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.logo = logo
  }

  const data = await Publisher.create({ ...body })
  return data
}

module.exports = createPublisher
