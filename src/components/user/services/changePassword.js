const User = require('../../../models/User')
const bcryptjs = require('bcryptjs')

const changePassword = async ({ id, password }) => {
  const newPassword = await bcryptjs.hash(password, 10)
  const data = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true }).lean().exec()
  return data
}

module.exports = changePassword
