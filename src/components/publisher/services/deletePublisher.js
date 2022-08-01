const Publisher = require('../../../models/Publisher')

const deletePublisher = async ({ id, status }) => {
  const data = await Publisher.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deletePublisher
