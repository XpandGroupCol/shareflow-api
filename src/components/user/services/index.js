const getUsers = require('./getUsers')
const deleteUser = require('./deleteUser')
const getUserById = require('./getUserById')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const changePassword = require('./changePassword')
const uploadfile = require('./uploadfile')
const updateCompany = require('./updateCompany')
const validateRut = require('./validateRut')

module.exports = {
  getUsers,
  deleteUser,
  uploadfile,
  changePassword,
  createUser,
  getUserById,
  updateUser,
  updateCompany,
  validateRut
}
