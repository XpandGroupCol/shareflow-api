const User = require('../../../models/User')
const boom = require('@hapi/boom')

const getUserById = async (id) => {
  const data = await User.findById(id)
  if (!data) throw boom.badRequest('Usuario no encontrado')
  return data
}

module.exports = getUserById
