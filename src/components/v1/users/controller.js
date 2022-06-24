
const bcryptjs = require('bcryptjs')
const { STATUS, ROLES } = require('../../../config')
const User = require('../../../models/User')
const { rgx, perPage } = require('../../../utils')
const { uploadFile } = require('../../../utils/aws-upload')
const boom = require('@hapi/boom')
const { getRandomName } = require('../../../config/utils')

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
  const { address, avatar, checkRut, company, companyEmail, email, name, lastName, nit, percentage, phone, role, rut, id: userId } = data
  response.status(200).json({
    statusCode: 200,
    data: { address, avatar, checkRut, company, companyEmail, email, name, nit, percentage, phone, lastName, role: ROLES.find(({ id }) => role === id), rut, id: userId }
  })
}

const createUser = async (request, response) => {
  const { files, body } = request
  if (files) {
    await Promise.all(
      files.map(async ({ fieldname, mimetype, buffer }) => {
        const location = await uploadFile({
          fileName: getRandomName(fieldname),
          mimetype: mimetype,
          body: buffer
        })
        body[fieldname] = location
      })

    )
  }

  body.password = await bcryptjs.hash(body.password, 10)

  const data = await User.create({ ...body, emailVerified: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateProfileCompany = async (request, response) => {
  const { userId: id } = request

  const { files, body } = request
  await Promise.all(
    files.map(async ({ fieldname, mimetype, buffer }) => {
      const location = await uploadFile({
        fileName: getRandomName(fieldname),
        mimetype: mimetype,
        body: buffer
      })
      body[fieldname] = location
    }))

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
  const { address, avatar, checkRut, company, companyEmail, email, name, lastName, nit, percentage, phone, provider, role, rut } = request.body
  const data = await User.findByIdAndUpdate(id, { address, avatar, checkRut, company, companyEmail, email, name, lastName, nit, percentage, phone, provider, role, rut }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const deleteUser = async (request, response) => {
  const { id } = request.params
  if (!id) return boom.notFound('Usuario no encontrado')
  const data = await User.findByIdAndUpdate(id, { status: STATUS[1].id }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

// por ahora los voy a separar

const siteUpdateProfile = async (request, response) => {
  const { userId: id } = request
  if (!id) return boom.notFound('Usuario no encontrado')
  const { body, file } = request

  if (file) {
    body.rut = await uploadFile({
      fileName: `${Date.now()}-rut`,
      mimetype: file.mimetype,
      body: file.buffer
    })
  }

  const { name, lastName, email, company, companyEmail, nit, phone, rut, address } = body
  const data = await User.findByIdAndUpdate(id, { name, lastName, email, company, companyEmail, nit, phone, rut, address }, { new: true }).lean().exec()
  response.status(200).json({ statusCode: 200, data })
}

const siteUpdateCompany = async (request, response) => {
  const { userId: id } = request
  if (!id) throw boom.notFound('Usuario no encontrado')
  const { body, file } = request

  if (file) {
    body.rut = await uploadFile({
      fileName: `${Date.now()}-rut`,
      mimetype: file.mimetype,
      body: file.buffer
    })
  }

  const { company, companyEmail, nit, phone, rut, address } = request.body

  const data = await User.findByIdAndUpdate(id, { company, companyEmail, nit, phone, rut, address }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const siteMe = async (request, response) => {
  const { userId } = request
  const data = await User.findById(userId)
  response.status(200).json({ statusCode: 200, data })
}

const siteUserSession = async (request, response) => {
  const { userId } = request
  const user = await User.findById(userId).lean().exec()
  response.status(200).json({
    statusCode: 200,
    data: {
      role: user.role ? ROLES.find(({ id }) => id === user?.role)?.label : null,
      name: user.name,
      avatar: user.avatar
    }
  })
}

const siteUpdateAvatar = async (request, response) => {
  const { id } = request.params
  if (!id) return boom.notFound('Usuario no encontrado')
  const { file } = request

  if (file) {
    const avatar = await uploadFile({
      fileName: `${Date.now()}-rut`,
      mimetype: file.mimetype,
      body: file.buffer
    })
    const data = await User.findByIdAndUpdate(id, { avatar }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  }
}

const siteUpdatePassword = async (request, response) => {
  const { userId: id } = request
  const { password } = request.body
  const newPassword = await bcryptjs.hash(password, 10)
  const data = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true })
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
  deleteUser,
  siteUpdateProfile,
  siteUpdateCompany,
  siteMe,
  siteUpdateAvatar,
  siteUpdatePassword,
  siteUserSession
}
