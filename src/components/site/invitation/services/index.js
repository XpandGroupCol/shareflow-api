const Invitation = require('../../../../models/Invitation')

const createInvitation = async ({ name, email, phone }) => {
  const user = await Invitation.findOne({ email }).lean().exec()
  if (user) return true
  const data = await Invitation.create({ name, email, phone })
  return data
}

module.exports = { createInvitation }
