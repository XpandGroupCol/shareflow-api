const { PER_PAGE } = require('../../../../config')
const User = require('../../../../models/User')
const { rgx } = require('../../../../utils')
const bcryptjs = require('bcryptjs')
const { uploadS3File } = require('../../../../utils/aws-upload')
const boom = require('@hapi/boom')

const getUsers = async ({ search, page = 1, role, status, userId }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = { _id: { $ne: userId } }

  if (search) {
    query = {
      ...query,
      $or: [
        { email: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } },
        { lastName: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (status) {
    query = {
      ...query,
      status: Boolean(parseInt(status))
    }
  }

  if (role) {
    query = { ...query, role }
  }

  const data = await User.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await User.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

const getUserById = async (id) => {
  const data = await User.findById(id)
  if (!data) throw boom.badRequest('Usuario no encontrado')
  return data
}

const deleteUser = async ({ id, status }) => {
  const data = await User.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

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

module.exports = {
  getUsers,
  deleteUser,
  getProfile,
  updateProfile,
  uploadfile,
  changePassword,
  createUser,
  getUserById,
  updateUser
}
