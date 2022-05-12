const jwt = require('jsonwebtoken')
const { ROLES } = require('../config')

const getUserAuth = ({ _id: id, name, lastName, image, role, company = '', nit = '', phone = '', address = '', companyEmail = '', checkRut = false, email } = {}) => {
  const accessToken = jwt.sign({ id, email }, process.env.ACCESS_TOKEN)
  const refreshToken = jwt.sign({ id, email }, process.env.REFRESH_TOKEN)

  return {
    id,
    name: `${name} ${lastName}`,
    image: image,
    email,
    role: ROLES.find(({ id }) => role === id)?.label || '',
    company,
    nit,
    phone,
    address,
    companyEmail,
    checkRut,
    accessToken,
    refreshToken
  }
}

module.exports = {
  getUserAuth
}
