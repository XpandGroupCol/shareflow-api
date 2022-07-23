
const boom = require('@hapi/boom')

const User = require('../../../models/User')

const { verifyToken } = require('../../../utils/token')

const validateToken = async ({ token }) => {
  const [_token, _id] = token.split('@u@')

  const user = await User.findById(_id).lean().exec()

  if (!user) throw boom.badRequest('Token no valido')

  try {
    verifyToken(_token, `${process.env.ACCESS_TOKEN}${user.password}`)
    return true
  } catch {
    throw boom.unauthorized('Token no valido')
  }
}

module.exports = validateToken
