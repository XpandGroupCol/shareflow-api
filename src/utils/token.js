
const jwt = require('jsonwebtoken')

const setToken = (...arg) => jwt.sign(...arg)

const verifyToken = (...arg) => jwt.verify(...arg)

module.exports = {
  setToken,
  verifyToken
}
