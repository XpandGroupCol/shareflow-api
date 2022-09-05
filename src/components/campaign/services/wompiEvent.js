const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const Payment = require('../../../models/Payment')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { sendEmail } = require('../../../utils/aws/SES')
const { createPdf } = require('../../../utils/pdf')

const clearNumber = (number) => {
  if (typeof number === 'number') {
    const clear = number.toString().slice(0, -2)
    return Number(clear)
  }
  return Number(number.toString().slice(0, -2))
}

const wompiEvent = async ({ reference, amount, transactionId, status, paymentMethod }) => {
  if (!transactionId) throw boom.notFound()

  const [campaignId] = reference.split('-')
  const campaign = await Campaign.findById(campaignId)
  if (!campaign) throw boom.notFound()

  const payment = await Payment.create({
    campaignId,
    transactionId,
    amount: clearNumber(amount),
    status,
    paymentMethod
  })

  if (!payment) throw boom.notFound()

  if (status === 'APPROVED') {
    campaign.status = 'paid'
    campaign.isPaid = true
  }

  const campaignLean = campaign.populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')

  const attachment = await createPdf(campaignLean)

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: '',
    text: '',
    htmlMessage: validateDocuments({ name: campaign?.user?.name }),
    attachedFiles: [attachment]
  }

  await sendEmail(sendEmailPayload)

  const response = await campaign.save()

  try {
    await Activity.create({
      data: { status: campaign.status },
      createBy: campaign?.user?._id,
      updateBy: campaign?.user?._id,
      campaignId: campaign?._id
    })
  } catch (e) {
    console.log(e)
  }

  return response
}

module.exports = wompiEvent
