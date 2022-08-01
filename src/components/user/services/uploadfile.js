const User = require('../../../models/User')
const { uploadS3File, deleteS3File } = require('../../../utils/aws/S3')

const emptyImage = { name: '', url: '' }

const uploadfile = async ({ file, fileName, name, id }) => {
  if (name) {
    const remove = await deleteS3File({ name })
    if (!remove) return false
    const other = fileName === 'rut' ? { checkRut: false } : {}
    await User.findByIdAndUpdate(id, { [fileName]: emptyImage, ...other })
    return emptyImage
  }

  if (file) {
    const _file = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })

    await User.findByIdAndUpdate(id, { [fileName]: _file })

    return _file
  }

  return null
}

module.exports = uploadfile
