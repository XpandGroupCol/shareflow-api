const sgMail = require('@sendgrid/mail')

const sendSengridEmail = async ({
  to, from,
  attachments = undefined,
  subject, text, html
}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to,
    from: process.env.SENDGRID_TO_EMAIL || from,
    subject,
    text,
    html,
    attachments
  }

  try {
    await sgMail.send(msg)
    return true
  } catch {
    return false
  }
}

module.exports = { sendSengridEmail }
