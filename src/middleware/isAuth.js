const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const loggedIn = (req, _, next) => {
  const token = req.headers.authorization || null

  if (!token || !token?.startsWith('Bearer ')) throw boom.unauthorized('Su sesion ha expirado.')

  const [, bearer] = token.split(' ')
  try {
    const jwtResult = jwt.verify(bearer, process.env.ACCESS_TOKEN) || {}
    req.userName = jwtResult.email
    req.userId = jwtResult._id
    next()
  } catch (error) {
    console.log(error)
    throw boom.unauthorized('Su sesion ha expirado.')
  }
}

module.exports = loggedIn
