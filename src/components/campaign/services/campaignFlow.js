const boom = require('@hapi/boom')
const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { createPdf } = require('../../../utils/pdf')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const updateCampaign = async ({ id, status, template, emailSubject, text }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true }).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages').lean().exec()

  const attachment = await createPdf(campaign)

  const sendEmailPayload = {
    to: campaign?.user?.email,
    subject: emailSubject,
    text,
    html: template({ campaign }),
    attachments: [{
      filename: `orden-${campaign?.orderNumber}.pdf`,
      content: Buffer.from(attachment).toString('base64'),
      contentType: 'application/pdf',
      content_id: `orden-${campaign?.orderNumber}`,
      disposition: 'attachment'
    }]
  }
  const send = await sendSengridEmail(sendEmailPayload)

  try {
    await Activity.create({
      data: { status },
      createBy: campaign?._user?._id,
      updateBy: campaign?._user?._id,
      campaignId: campaign?._id
    })
  } catch (e) {
    console.log(e)
  }
  return { campaign, send }
}

module.exports = updateCampaign
