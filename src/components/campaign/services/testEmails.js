const Campaign = require('../../../models/Campaign')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { createPdf } = require('../../../utils/pdf')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const testEmail = async () => {
  const campaign = await Campaign.findById('631a3e641a5569fc406684af').populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const pdf = await createPdf(campaign)

  const sendEmailPayload = {
    to: 'diegocontreras1219@gmail.com',
    subject: 'Test',
    text: 'Test',
    html: validateDocuments({ campaign }),
    attachments: [{
      filename: `orden-${campaign?.orderNumber}.pdf`,
      content: Buffer.from(pdf).toString('base64'),
      contentType: 'application/pdf',
      content_id: `orden-${campaign?.orderNumber}`
    }]
  }
  const send = await sendSengridEmail(sendEmailPayload)
  return { send, campaign }
}

module.exports = testEmail
