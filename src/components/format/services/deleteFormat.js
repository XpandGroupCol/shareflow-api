const Format = require('../../../models/Format')

const deleteFormat = async ({ id, status }) => {
  const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deleteFormat
