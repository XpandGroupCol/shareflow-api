const Campaign = require('../../../models/Campaign')
const { campaignClosing } = require('../../../templates/campaignClosing')
const { createPdf } = require('../../../utils/pdf')
const { sendSengridEmail } = require('../../../utils/sendGrid')
const { leanById } = require('../../../utils/transformData')

const testEmail = async () => {
  const campaign = await Campaign.findByIdAndUpdate('631a3e641a5569fc406684af', { status: 'paid' }, { new: true })
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const pdf = await createPdf(leanById(campaign))

  const sendEmailPayload = {
    to: 'diegocontreras1219@gmail.com',
    subject: 'Test',
    text: 'Test',
    html: campaignClosing({ campaign }),
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
