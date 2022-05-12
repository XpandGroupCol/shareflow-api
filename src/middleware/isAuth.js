const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const loggedIn = (req, res, next) => {
  const token = req.headers.authorization || null

  if (!token || !token?.startsWith('Bearer ')) throw boom.unauthorized('La sesion del usuario ha expirado.')

  const [, bearer] = token.split(' ')

  const { id: userId } = jwt.verify(bearer, process.env.ACCESS_TOKEN) || {}
  req.userId = userId
  next()
}

module.exports = loggedIn
