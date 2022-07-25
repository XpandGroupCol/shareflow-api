const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')

const updateCampaign = async ({ id, body }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true })

  return campaign
}

module.exports = updateCampaign
