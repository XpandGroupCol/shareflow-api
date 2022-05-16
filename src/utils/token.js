
const jwt = require('jsonwebtoken')

const setToken = (data, options = {}) =>
  jwt.sign(data, process.env.ACCESS_TOKEN)

const verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN)

module.exports = {
  setToken,
  verifyToken
}
