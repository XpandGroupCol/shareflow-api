const { PER_PAGE } = require('../../../config')
const Campaign = require('../../../models/Campaign')
const { rgx } = require('../../../utils')

const getCampaigns = async ({ user, search, page = 1, target, sector, status, perPage = PER_PAGE }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = { isDelete: false }

  if (search) {
    query = {
      ...query,
      $or: [
        { brand: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (user) {
    query = { ...query, user }
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

  const data = await Campaign.find(query).sort([['createdAt', -1]])
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('ages')
    .limit(perPage).skip(perPage * currentPage).lean().exec()

  const total = await Campaign.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / perPage),
    page: currentPage + 1
  }
}

module.exports = getCampaigns
