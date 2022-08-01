const Sector = require('../../../models/Sector')
const { PER_PAGE } = require('../../../config')
const { rgx } = require('../../../utils')

const getSectors = async ({ page = 1, search = '', status = null }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      name: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (status) {
    query = {
      ...query, status: Boolean(parseInt(status))
    }
  }

  const data = await Sector.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Sector.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getSectors
