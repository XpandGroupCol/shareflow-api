const { PER_PAGE } = require('../../../../config')
const Campaign = require('../../../../models/Campaign')
const { rgx } = require('../../../../utils')

const getCampaigns = async ({ search, page = 1, target, sector, status }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      $or: [
        { brand: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (target) {
    query = { ...query, target }
  }

  if (sector) {
    query = { ...query, sector }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await Campaign.find(query)
    .populate('ages')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Campaign.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = { getCampaigns }
