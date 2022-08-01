const { uploadS3File, deleteS3File } = require('../../../utils/aws/S3')
const Campaign = require('../../../models/Campaign')

const emptyImage = { name: '', url: '' }

const uploadfile = async ({ file, name, id }) => {
  if (name) {
    const remove = await deleteS3File({ name })
    if (!remove) return false
    await Campaign.findByIdAndUpdate(id, { logo: emptyImage })
    return emptyImage
  }

  if (file) {
    const logo = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })

    await Campaign.findByIdAndUpdate(id, { logo })

    return logo
  }

  return null
}

module.exports = uploadfile
