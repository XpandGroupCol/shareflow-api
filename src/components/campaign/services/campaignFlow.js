const boom = require('@hapi/boom')
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
    htmlMessage: template({ name: campaign?.user?.name })
  }
  const send = await sendEmail(sendEmailPayload)
  return { campaign, send }
}

module.exports = updateCampaign
