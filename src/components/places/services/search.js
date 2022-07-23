const { PER_PAGE } = require('../../../config')
const Location = require('../../../models/Location')
const { rgx } = require('../../../utils')

const search = async ({ search, page = 1, status = true }) => {
  const currentPage = page < 1 ? 0 : page - 1

  let query = { status }

  if (search) {
    query = {
      ...query,
      $or: [
        { city: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  const data = await Location.find(query)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .populate({
      path: 'payments',
      options: { sort: '-createdAt', limit: 1 }
    })
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  return {
    data
  }
}

module.exports = search
