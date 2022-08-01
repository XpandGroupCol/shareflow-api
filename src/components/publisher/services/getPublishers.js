const { PER_PAGE } = require('../../../config')
const Publisher = require('../../../models/Publisher')
const { rgx } = require('../../../utils')

const getPublishers = async ({ search, page = 1, target, status, category }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      publisher: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (target) {
    query = { ...query, formats: { $elemMatch: { target: target } } }
  }

  if (category) {
    query = { ...query, category }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await Publisher.find(query)
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Publisher.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getPublishers
