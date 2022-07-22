const { downloadResource } = require('../../../../libraries/downloadCSV')
const services = require('../services')
const { fields } = require('./constants')

const getUsers = async (request, response) => {
  const data = await services.getUsers({ ...request.query, userId: request.userId })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const getUserById = async (request, response) => {
  const { id } = request.params
  const data = await services.getUserById(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const deleteUser = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deleteUser({ status, id })
  })
}

const download = async (request, response) => {
  const data = await services.getUsers(request.query)

  return downloadResource(response, 'users.csv', fields, data?.data || [])
}

const getProfile = async (request, response) => {
  const { userId } = request
  response.status(200).json({
    statusCode: 200,
    data: await services.getProfile(userId)
  })
}

const updateUser = async (request, response) => {
  const { body } = request
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updateUser({ id, body })
  })
}

const updateProfile = async (request, response) => {
  const { userId: id, body } = request
  response.status(200).json({
    statusCode: 200,
    data: await services.updateProfile({ id, body })
  })
}

const changePassword = async (request, response) => {
  const { userId: id } = request
  const { password } = request.body
  response.status(200).json({
    statusCode: 200,
    data: await services.changePassword({ id, password })
  })
}

const uploadfile = async (request, response) => {
  const { file, isDelete } = request
  response.status(200).json({
    statusCode: 200,
    data: await services.uploadfile({ file, isDelete })
  })
}

const createUser = async (request, response) => {
  const { file, body } = request
  response.status(200).json({
    statusCode: 200,
    data: await services.createUser({ file, body })
  })
}

module.exports = {
  getUsers,
  deleteUser,
  download,
  getProfile,
  updateProfile,
  changePassword,
  uploadfile,
  createUser,
  getUserById,
  updateUser
}
