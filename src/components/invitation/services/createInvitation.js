const { createLead } = require('../../../libraries/activeCampaign')
const Invitation = require('../../../models/Invitation')
const sendInvitationEmail = require('./sendInvitationEmail')

const createInvitation = async ({ name, email, phone, lastName }) => {
  const user = await Invitation.findOne({ email }).lean().exec()
  if (user) return true
  const activeCampaignId = await createLead({ firstName: name, email, phone, lastName })
  const data = await Invitation.create({ name, email, phone, lastName, activeCampaignId })
  const sendEmail = await sendInvitationEmail(data?._id)
  return { ...data, sendEmail }
}

module.exports = createInvitation
