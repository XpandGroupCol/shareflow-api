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

const regex = (pattern) => new RegExp(`.*${pattern}.*`)

const leanById = ({ ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  sex,
  ...restOfCampaign
})

module.exports = {
  getUserAuth,
  regex,
  leanById
}
