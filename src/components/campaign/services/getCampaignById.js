const Campaign = require('../../../models/Campaign')
require('../../../models/Location')
const { leanById } = require('../../../utils/transformData')

const getCampaignById = async (id) => {
  const data = await Campaign.findById(id)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .lean().exec()

  return leanById(data)
}

module.exports = getCampaignById
