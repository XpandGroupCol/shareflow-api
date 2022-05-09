const jwt = require('jsonwebtoken')

const loggedIn = (req, res, next) => {
  const token = req.headers.authorization || null

  if (!token) return res.status(401).json({ error: true, code: 401, message: 'Token invalido' })
  if (!token.startsWith('Bearer ')) { return res.status(401).json({ error: true, code: 401, message: 'Token invalido' }) }

  const [, bearer] = token.split(' ')
  try {
    const { id: userId } = jwt.verify(bearer, process.env.AUTH_SECRET) || {}
    req.userId = userId
    next()
  } catch (e) {
    return res.status(401).json({ error: true, code: 401, message: 'Token invalido' })
  }
  // validar el usuario
}

module.exports = loggedIn
