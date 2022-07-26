const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { leanById } = require('../../../utils/transformData')

const updateCampaign = async ({ id, body }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  return leanById(campaign)
}

module.exports = updateCampaign
