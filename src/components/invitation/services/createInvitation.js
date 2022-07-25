const { createLead } = require('../../../libraries/activeCampaign')
const Invitation = require('../../../models/Invitation')
const { welcomeTemplate } = require('../../../templates/welcome')
const { sendEmail } = require('../../../utils/aws/SES')

const createInvitation = async ({ name, email, phone, lastName }) => {
  const user = await Invitation.findOne({ email }).lean().exec()
  if (user) return true
  const activeCampaignId = await createLead({ firstName: name, email, phone, lastName })
  await Invitation.create({ name, email, phone, lastName, activeCampaignId })

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Bienvenido a Shareflow',
    text: 'Bienvenido a Shareflow',
    htmlMessage: welcomeTemplate({ name })
  }
  try {
    const data = await sendEmail(sendEmailPayload)
    return data
  } catch (e) {
    return false
  }
}

module.exports = createInvitation
