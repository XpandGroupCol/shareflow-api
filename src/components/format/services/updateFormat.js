const Format = require('../../../models/Format')

const updateFormat = async ({ id, ...payload }) => {
  const data = await Format.findByIdAndUpdate(id, { ...payload }, { new: true })
  return data
}

module.exports = updateFormat
