
const User = require('../../../models/User')
const { recoveryPasswordTemplate } = require('../../../templates/recoveryPassword')
const { sendEmail } = require('../../../utils/aws/SES')

const { setToken } = require('../../../utils/token')

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({
    email,
    status: true
  }).lean().exec()

  if (user) {
    const data = { id: user?._id, email: user?.email }

    const token = setToken(data, `${process.env.ACCESS_TOKEN}${user.password}`, { expiresIn: '15m' })
    const url = `${process.env.CLIENT_URL}/auth/recovery-password/${token}@u@${user?._id}`

    const sendEmailPayload = {
      destinationEmails: ['diegocontreras1219@gmail.com'],
      emailSubject: 'Recuperar contraseña',
      text: 'Recuperar contraseña',
      htmlMessage: recoveryPasswordTemplate({ url, name: user?.name })
    }
    const send = await sendEmail(sendEmailPayload)
    return send
  }
}

module.exports = forgotPassword
