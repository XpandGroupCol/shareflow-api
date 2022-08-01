const Age = require('../../../models/Age')

const updateAge = async ({ id, name }) => {
  const data = await Age.findByIdAndUpdate(id, { name }, { new: true })
  return data
}

module.exports = updateAge
