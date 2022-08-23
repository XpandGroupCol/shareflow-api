const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { remainder } = require('../../../templates/remainder')
const { sendEmail } = require('../../../utils/aws/SES')

const rememberEmail = async (id) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findById(id).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: '',
    text: '',
    htmlMessage: remainder({ name: campaign?.user?.name })
  }
  const send = await sendEmail(sendEmailPayload)
  return { campaign, send }
}

module.exports = rememberEmail
