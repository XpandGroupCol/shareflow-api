
const Campaign = require('../../../../models/Campaign')
const { rgx } = require('../../../../utils')
require('../../../../models/Location')
require('../../../../models/Payment')

const PER_PAGE = 9
const getCampaigns = async ({ user, search, page = 1, status }) => {
  console.log({ user })
  const currentPage = page < 1 ? 0 : page - 1
  let query = { user }

  if (search) {
    query = {
      ...query,
      $or: [
        { brand: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await Campaign.find(query)
    .populate('user')
    .populate('sector')
    .populate('target')
    // .populate('locations')
    .populate('ages')
    .populate({
      path: 'payments',
      options: { sort: '-createdAt', limit: 1 }
    })
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
