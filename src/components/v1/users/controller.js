
const bcryptjs = require('bcryptjs')
const { STATUS } = require('../../../config')
const User = require('../../../models/User')
const { rgx, perPage } = require('../../../utils')
const { uploadFile } = require('../../../utils/aws-upload')
const boom = require('@hapi/boom')

const getUsers = async (request, response) => {
  const { page = 1, search = null, role = null, status = null } = request.query
  const currentPage = page < 1 ? 0 : page - 1

  let query = {}

  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: rgx(search), $options: 'i' } },
        { email: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (role) {
    query = { ...query, role }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await User.find(query)
    .limit(perPage)
    .skip(perPage * currentPage)

  const total = await User.countDocuments(query)

  response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
}

const getProfile = async (request, response) => {
  const { userId } = request
  const data = await User.findById(userId)
  response.status(200).json({ statusCode: 200, data })
}

const getUserById = async (request, response) => {
  const { id } = request.params
  if (!id) return boom.notFound('Usuario no encontrado')
  const data = await User.findById(id)
  response.status(200).json({ statusCode: 200, data })
}

const createUser = async (request, response) => {
  const { file, body } = request

  if (file) {
    body.image = await uploadFile({
      fileName: `${Date.now()}-avater`,
      mimetype: file.mimetype,
      body: file.buffer
    })
  }

  body.password = await bcryptjs.hash(body.password, 10)

  const data = await User.create({ ...body, emailVerified: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateProfileCompany = async (request, response) => {
  const { userId: id } = request
  const { company, nit, phone, address, companyEmail, rut = '' } = request.body

  const data = await User.findByIdAndUpdate(id, { company, nit, phone, address, companyEmail, rut }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const changePassword = async (request, response) => {
  const { userId: id } = request
  const { password } = request.body
  const newPassword = await bcryptjs.hash(password, 10)
  const data = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateUser = async (request, response) => {
  const { id } = request.params
  if (!id) return boom.notFound('Usuario no encontrado')
  const { password, ...restOfUser } = request.body
  const data = await User.findByIdAndUpdate(id, { ...restOfUser }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const deleteUser = async (request, response) => {
  const { id } = request.params
  if (!id) return boom.notFound('Usuario no encontrado')
  const data = await User.findByIdAndUpdate(id, { status: STATUS[1].id }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

module.exports = {
  getUsers,
  getProfile,
  getUserById,
  createUser,
  updateProfileCompany,
  changePassword,
  updateUser,
  deleteUser
}
