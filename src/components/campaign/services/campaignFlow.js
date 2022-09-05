const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { sendEmail } = require('../../../utils/aws/SES')

const updateCampaign = async ({ id, status, template, emailSubject, text }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject,
    text,
    htmlMessage: template({ campaign })
  }
  const send = await sendEmail(sendEmailPayload)

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
