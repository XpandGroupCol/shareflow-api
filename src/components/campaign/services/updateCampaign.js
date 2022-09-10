const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { leanById } = require('../../../utils/transformData')

const updateCampaign = async ({ id, body }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  try {
    await Activity.create({
      data: body,
      createBy: campaign?._user?._id,
      updateBy: campaign?._user?._id,
      campaignId: campaign?._id,
      type: 'update'
    })
  } catch (e) {
    console.log(e)
  }

  return leanById(campaign)
}

module.exports = updateCampaign
