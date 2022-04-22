const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const loggedIn = (req, res, next) => {
  const token = req.headers.authorization || null
  if (!token) throw boom.unauthorized('No valid Bearer token')
  if (!token.startsWith('Bearer ')) { throw boom.unauthorized('No valid Bearer token') }

  const [, bearer] = token.split(' ')
  const { id: userId } = jwt.verify(bearer, process.env.AUTH_SECRET) || {}
  // validar el usuario
  console.log({ userId })
  req.userId = userId
  next()
}

module.exports = loggedIn
