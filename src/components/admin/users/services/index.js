const User = require('../../../../models/User')

const getUsers = async () => {
  const data = await User.find({})
  return data
}

module.exports = { getUsers }
