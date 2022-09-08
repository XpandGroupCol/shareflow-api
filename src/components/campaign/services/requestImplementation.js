const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { createPdf } = require('../../../utils/pdf')
const { sendSengridEmail } = require('../../../utils/sendGrid')
const { leanById } = require('../../../utils/transformData')

const requestImplementation = async (id) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findOneAndUpdate(id, { status: 'paid' }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const attachment = await createPdf(campaign)

  const sendEmailPayload = {
    to: campaign?.user?.email,
    subject: 'Nueva campaña creada',
    text: 'Tienes una nueva campaña para revisar',
    html: validateDocuments({ name: campaign?.user?.name }),
    attachments: [{
      filename: `orden-${campaign?.orderNumber}.pdf`,
      content: Buffer.from(attachment, 'base64'),
      type: 'application/pdf',
      disposition: 'attachment'
    }]
  }
  const send = await sendSengridEmail(sendEmailPayload)
  return { campaign: leanById(campaign), send }
}

module.exports = requestImplementation
