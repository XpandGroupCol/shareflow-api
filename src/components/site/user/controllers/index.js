
const services = require('../services')

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

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadfile,
  updateUser
}
