const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const Payment = require('../../../models/Payment')

const wompiEvent = async ({ reference, amount, transactionId, status, paymentMethod }) => {
  if (!transactionId) throw boom.notFound()

  const [campaignId] = reference.split('-')
  const campaign = await Campaign.findById(campaignId)
  if (!campaign) throw boom.notFound()

  console.log({ campaign })

  const payment = await Payment.create({
    campaignId,
    transactionId,
    amount,
    status,
    paymentMethod
  })

  console.log({ payment })

  if (!payment) throw boom.notFound()

  if (status === 'APPROVED') {
    campaign.status = 'paid'
  }

  const response = await campaign.save()
  console.log({ response })
  return response
}

module.exports = wompiEvent
