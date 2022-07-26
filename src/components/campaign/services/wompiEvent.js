const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const Payment = require('../../../models/Payment')

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
  }

  const response = await campaign.save()
  return response
}

module.exports = wompiEvent
