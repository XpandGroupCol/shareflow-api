
const boom = require('@hapi/boom')

const User = require('../../../models/User')
const getSession = require('../../../utils/getSession')
const { verifyToken } = require('../../../utils/token')

const refreshToken = async ({ token }) => {
  let email = ''
  try {
    const user = verifyToken(token, process.env.REFRESH_TOKEN)
    email = user?.email
  } catch {
    throw boom.unauthorized('Su session ha expirado')
  }

  if (!email) throw boom.unauthorized('Su session ha expirado')

  const user = await User.findOne({
    email,
    status: true
  }).lean().exec()

  if (!user) {
    throw boom.unauthorized('Su session ha expirado')
  }

  return { ...getSession(user), refreshToken: token }
}

module.exports = refreshToken
