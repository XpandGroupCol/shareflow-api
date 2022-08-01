const Format = require('../../../models/Format')

const createFormat = async (payload) => {
  const data = await Format.create({ ...payload })
  return data
}

module.exports = createFormat
