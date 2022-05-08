const { ROLES } = require('../config')

const getUserAuth = ({ _id, name, lastName, image, role, company, nit, phone, address, companyEmail, checkRut } = {}) => ({
  id: _id,
  name: `${name} ${lastName}`,
  image: image,
  role: ROLES.find(({ id }) => role === id)?.label || '',
  company,
  nit,
  phone,
  address,
  companyEmail,
  checkRut
})

module.exports = {
  getUserAuth
}
