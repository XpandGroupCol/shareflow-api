const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { deepEqual } = require('../../../utils/deepEqual')
const { leanById } = require('../../../utils/transformData')

const updateCampaign = async ({ id, body, userId }) => {
  if (!id) throw boom.notFound()

  const previewCampaign = await Campaign.findById(id).lean().exec()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true })
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  try {
    await Activity.create({
      data: deepEqual(previewCampaign, body),
      createBy: campaign?.user?._id,
      updateBy: userId,
      campaignId: campaign?._id,
      type: 'update'
    })
  } catch (e) {
    console.log(e)
  }

  return leanById(campaign)
}

module.exports = updateCampaign
