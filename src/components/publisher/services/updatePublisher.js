const Publisher = require('../../../models/Publisher')

const updatePublisher = async ({ id, body }) => {
  const data = await Publisher.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

module.exports = updatePublisher
