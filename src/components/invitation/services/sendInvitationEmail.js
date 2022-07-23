const boom = require('@hapi/boom')
const Invitation = require('../../../models/Invitation')
const { invitationTemplate } = require('../../../templates/invitation')
const { sendEmail } = require('../../../utils/aws/SES')
const { setToken } = require('../../../utils/token')

const sendInvitationEmail = async (id) => {
  const invitation = await Invitation.findById(id)

  if (!invitation) throw boom.badRequest('El usuario no existe.')

  const { email, name } = invitation

  const token = setToken({ email }, process.env.VERIFY_ACCOUNT, { expiresIn: '48h' })

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Bienvenido a Shareflow',
    text: 'Bienvenido a Shareflow',
    htmlMessage: invitationTemplate({ name, url: `${process.env.CLIENT_URL}/auth/sign-up/${token}` })
  }
  try {
    const data = await sendEmail(sendEmailPayload)
    if (data && !invitation.sendEmail) {
      invitation.sendEmail = true
      await invitation.save()
    }
    return data
  } catch (e) {
    return false
  }
}

module.exports = sendInvitationEmail
