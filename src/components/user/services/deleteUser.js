const User = require('../../../models/User')

const deleteUser = async ({ id, status }) => {
  const data = await User.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deleteUser
