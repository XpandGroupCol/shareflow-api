const { PER_PAGE } = require('../../../config')
const Campaign = require('../../../models/Campaign')
const { DASHBOARD_NAMES } = require('../../../libraries/constants/dashboardNames.constanst')

const getDashboardOfCampaing = async ({ name, status, page }) => {
  const currentPage = page < 1 ? 0 : page - 1
  const perPage = PER_PAGE
  let query = {}

  if (name === DASHBOARD_NAMES.active) {
    query = filterActiveCampaigns(query)
  }

  if (status) {
    query = filterByStatusCampaigns(query, status)
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

const filterActiveCampaigns = (query) => {
  return {
    ...query,
    isDelete: false
  }
}

const filterByStatusCampaigns = (query, status) => {
  return {
    ...query,
    status
  }
}

module.exports = getDashboardOfCampaing
