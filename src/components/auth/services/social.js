
const boom = require('@hapi/boom')

const User = require('../../../../models/User')
const { DEFAULT_ROLES } = require('../../../../config')
const getSession = require('../../../../utils/getSession')

const social = async ({ name, lastName = '', provider, password = '@', email, image }) => {
  let user = null

  user = await User.findOne({ email })

  if (user && user?.provider !== provider) {
    throw boom.unauthorized('Parece que tenemos problemas, por favor intente con otro metodo de autenticación')
  }

  if (user && (user?.role !== DEFAULT_ROLES.CLIENT || !user?.status)) {
    throw boom.unauthorized(`No pudimos acceder con su cuenta de ${provider}.Si necesitas que te rescatemos, escribemos a support@mediax.com`)
  }

  if (!user) {
    user = await User.create({ name, lastName, provider, password, email, image, role: DEFAULT_ROLES.CLIENT, emailVerified: true })
  }

  return getSession(user)
}

module.exports = social
