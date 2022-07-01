const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const loggedIn = (req, _, next) => {
  const token = req.headers.authorization || null

  if (!token || !token?.startsWith('Bearer ')) throw boom.unauthorized('Su sesion ha expirado.')

  const [, bearer] = token.split(' ')
  try {
    const { _id: userId } = jwt.verify(bearer, process.env.ACCESS_TOKEN) || {}
    req.userId = userId
    next()
  } catch {
    throw boom.unauthorized('Su sesion ha expirado.')
  }
}

module.exports = loggedIn
