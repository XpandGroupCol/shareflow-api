const { downloadResource } = require('../../../../libraries/downloadCSV')
const services = require('../services')
const { fields } = require('./constants')

const getUsers = async (request, response) => {
  const data = await services.getUsers(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
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

const changeAvatar = async (request, response) => {
  const { userId: id } = request
  const { avatar } = request.body
  response.status(200).json({
    statusCode: 200,
    data: await services.changeAvatar({ id, avatar })
  })
}

module.exports = {
  getUsers,
  deleteUser,
  download,
  getProfile,
  updateProfile,
  changePassword,
  changeAvatar
}
