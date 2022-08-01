const User = require('../../../models/User')

const updateUser = async ({ id, body }) => {
  const data = await User.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

module.exports = updateUser
