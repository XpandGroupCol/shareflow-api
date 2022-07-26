const { createLead } = require('../../../libraries/activeCampaign')
const Invitation = require('../../../models/Invitation')

const createInvitation = async ({ name, email, phone, lastName }) => {
  const user = await Invitation.findOne({ email }).lean().exec()
  if (user) return true
  const activeCampaignId = await createLead({ firstName: name, email, phone, lastName })
  const data = await Invitation.create({ name, email, phone, lastName, activeCampaignId })
  return data
}

module.exports = createInvitation
