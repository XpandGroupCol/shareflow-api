
const jwt = require('jsonwebtoken')

const setToken = (data, options = {}) =>
  jwt.sign(data, process.env.AUTH_SECRET)

const verifyToken = (token) =>
  jwt.verify(token, process.env.AUTH_SECRET)

module.exports = {
  setToken,
  verifyToken
}
