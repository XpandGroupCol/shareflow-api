const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { sendEmail } = require('../../../utils/aws/SES')
const { createPdf } = require('../../../utils/pdf')
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
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Nueva campaña creada',
    text: 'Tienes una nueva campaña para revisar',
    htmlMessage: validateDocuments({ name: campaign?.user?.name }),
    attachedFiles: [attachment]
  }
  const send = await sendEmail(sendEmailPayload)
  return { campaign: leanById(campaign), send }
}

module.exports = requestImplementation
