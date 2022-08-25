const boom = require('@hapi/boom')
const { modules } = require('../../../libraries/constants/auditActions.constants')
const Campaign = require('../../../models/Campaign')
const { loggerUpdateRecord } = require('../../../utils/audit')
const { leanById } = require('../../../utils/transformData')

const updateCampaign = async ({ id, body, userId }) => {
  if (!id) throw boom.notFound()
  const currentData = await Campaign.findById(id).lean().exec()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const newData = await Campaign.findById(campaign._id).lean().exec()
  await loggerUpdateRecord(currentData, newData, userId, modules.CAMPAIGN)
  return leanById(campaign)
}

module.exports = updateCampaign
