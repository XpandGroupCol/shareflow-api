const User = require('../../../models/User')

const updateCompany = async ({ id, body }) => {
  const data = await User.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  // aqui se debe enviar un email
  return data
}

module.exports = updateCompany
