
const User = require('../../../models/User')
const { recoveryPasswordTemplate } = require('../../../templates/recoveryPassword')
const { sendSengridEmail } = require('../../../utils/sendGrid')

const { setToken } = require('../../../utils/token')

const forgotPassword = async ({ email, baseUrl }) => {
  const user = await User.findOne({
    email,
    status: true
  }).lean().exec()

  if (user) {
    const data = { id: user?._id, email: user?.email }

    const token = setToken(data, `${process.env.ACCESS_TOKEN}${user.password}`, { expiresIn: '15m' })
    const url = `${baseUrl}/auth/recovery-password/${token}@u@${user?._id}`

    const sendEmailPayload = {
      to: user?.email,
      subject: 'Recuperar contraseña',
      text: 'Recuperar contraseña',
      html: recoveryPasswordTemplate({ url, name: user?.name })
    }
    const send = await sendSengridEmail(sendEmailPayload)
    return send
  }
}

module.exports = forgotPassword
