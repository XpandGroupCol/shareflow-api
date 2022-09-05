const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { remainder } = require('../../../templates/remainder')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const rememberEmail = async (id) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findById(id).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const sendEmailPayload = {
    to: campaign?.user?.email,
    subject: 'Completar la orden',
    text: 'Completar la orden',
    html: remainder({ name: campaign?.user?.name })

  }

  const send = await sendSengridEmail(sendEmailPayload)

  return { campaign, send }
}

module.exports = rememberEmail
