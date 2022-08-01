const Age = require('../../../models/Age')

const deleteAge = async ({ id, status }) => {
  const data = await Age.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deleteAge
