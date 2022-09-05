const Campaign = require('../../../models/Campaign')
const { remainder } = require('../../../templates/remainder')
const { sendEmail } = require('../../../utils/aws/SES')

const testEmail = async () => {
  const campaign = await Campaign.findById('62debba254f72b6df9f2c75a').populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Test',
    text: 'Test',
    htmlMessage: remainder({ campaign })
  }
  const send = await sendEmail(sendEmailPayload)
  return { send, campaign }
}

module.exports = testEmail
