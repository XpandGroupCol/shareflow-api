const Campaign = require('../../../models/Campaign')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { sendEmail } = require('../../../utils/aws/SES')
const { createPdf } = require('../../../utils/pdf')

const testEmail = async () => {
  const campaign = await Campaign.findById('62debba254f72b6df9f2c75a').populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const pdf = await createPdf(campaign)

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Test',
    text: 'Test',
    htmlMessage: validateDocuments({ campaign }),
    attachedFiles: [{
      filename: `orden-${campaign?.orderNumber}.pdf`,
      content: Buffer.from(pdf, 'base64'),
      contentType: 'application/pdf'
    }]
  }
  const send = await sendEmail(sendEmailPayload)
  return { send, campaign }
}

module.exports = testEmail
