
const User = require('../../../../models/User')
const bcryptjs = require('bcryptjs')
const { uploadS3File } = require('../../../../utils/aws-upload')

const getProfile = async (id) => {
  const data = await User.findById(id)
  return data
}

const updateProfile = async ({ id, body }) => {
  const data = await User.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

const updateUser = async ({ id, body }) => {
  const data = await User.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

const changePassword = async ({ id, password }) => {
  const newPassword = await bcryptjs.hash(password, 10)
  const data = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true }).lean().exec()
  return data
}

const uploadfile = async ({ file, isDelete }) => {
  if (isDelete) {
    // se debe eliminar
  }

  if (file) {
    const avatar = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })

    return avatar
  }
  return null
}

module.exports = {
  getProfile,
  updateProfile,
  uploadfile,
  changePassword,
  updateUser
}
