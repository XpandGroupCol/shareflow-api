const boom = require('@hapi/boom')
const { ORDER_EMAIL } = require('../../../config')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const Payment = require('../../../models/Payment')
const { validateDocuments } = require('../../../templates/validateDocuments')
const { createPdf } = require('../../../utils/pdf')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const clearNumber = (number) => {
  if (typeof number === 'number') {
    const clear = number.toString().slice(0, -2)
    return Number(clear)
  }
  return Number(number.toString().slice(0, -2))
}

const wompiEvent = async ({ reference, amount, transactionId, status, paymentMethod }) => {
  let campaign = null

  if (!transactionId) throw boom.notFound()

  const [campaignId] = reference.split('-')
  campaign = await Campaign.findById(campaignId)
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
    campaign = await Campaign.findByIdAndUpdate(campaignId, {
      status: 'paid',
      isPaid: true
    }, { new: true })

    const campaignLean = campaign.populate('user')
      .populate('sector')
      .populate('target')
      .populate('locations')
      .populate('ages')

    const attachment = await createPdf(campaignLean)

    const sendEmailPayload = {
      to: ORDER_EMAIL,
      subject: 'Nueva Orden',
      text: 'Nueva Orden',
      html: validateDocuments({ name: campaign?.user?.name }),
      attachedFiles: [{
        filename: `orden-${campaign?.orderNumber}.pdf`,
        content: Buffer.from(attachment).toString('base64'),
        contentType: 'application/pdf',
        content_id: `orden-${campaign?.orderNumber}`
      }]
    }

    await sendSengridEmail(sendEmailPayload)

    try {
      await Activity.create({
        data: { status: campaign.status },
        createBy: campaign?.user?._id,
        updateBy: campaign?.user?._id,
        campaignId: campaign?._id,
        type: 'update'
      })
    } catch (e) {
      console.log(e)
    }
  }

  return campaign
}

module.exports = wompiEvent
