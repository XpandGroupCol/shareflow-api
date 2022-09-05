const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const updateCampaign = async ({ id, status, template, emailSubject, text }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const sendEmailPayload = {
    to: campaign?.user?.email,
    subject: emailSubject,
    text,
    html: template({ campaign })
  }
  const send = await sendSengridEmail(sendEmailPayload)

  try {
    await Activity.create({
      data: { status },
      createBy: campaign?._user?._id,
      updateBy: campaign?._user?._id,
      campaignId: campaign?._id
    })
  } catch (e) {
    console.log(e)
  }
  return { campaign, send }
}

module.exports = updateCampaign
