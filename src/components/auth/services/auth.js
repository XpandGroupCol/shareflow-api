
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')

const User = require('../../../models/User')
const getSession = require('../../../utils/getSession')

const auth = async ({ email, password, role }) => {
  const user = await User.findOne({
    email,
    status: true,
    role
  }).lean().exec()

  if (!user ||
      !bcryptjs.compareSync(password, user.password)) {
    throw boom.unauthorized('El correo electrónico o contraseña son incorrectos.')
  }

  if (user && !user?.emailVerified) {
    throw boom.unauthorized('Su cuenta no ha sido verificada.')
  }

  return getSession(user)
}

module.exports = auth
