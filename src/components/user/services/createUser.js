const User = require('../../../models/User')
const bcryptjs = require('bcryptjs')
const { uploadS3File } = require('../../../utils/aws/S3')

const createUser = async ({ file, body }) => {
  if (file) {
    const avatar = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.avatar = avatar
  }

  body.password = await bcryptjs.hash(body.password, 10)

  const data = await User.create({ ...body, emailVerified: true })
  return data
}

module.exports = createUser
