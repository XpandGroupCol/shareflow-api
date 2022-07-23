
const boom = require('@hapi/boom')

const Invitation = require('../../../models/Invitation')
const { verifyToken } = require('../../../utils/token')

const verifyAccount = async ({ token }) => {
  try {
    const { email } = verifyToken(token, process.env.VERIFY_ACCOUNT)
    const user = await Invitation.findOne({ email })
    if (user?.hasUser) throw boom.unauthorized('Ya hay un usuario registrado')
    return user
  } catch (e) {
    throw boom.unauthorized('Token no valido')
  }
}

module.exports = verifyAccount
