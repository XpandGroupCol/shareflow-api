
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')

const User = require('../../../models/User')
const { DEFAULT_ROLES, GLOBAL_ERROR } = require('../../../config')
const getSession = require('../../../utils/getSession')
const Invitation = require('../../../models/Invitation')

const signup = async ({ name, lastName, password, email, phone, role = DEFAULT_ROLES.CLIENT }) => {
  let user = null

  user = await User.findOne({ email })

  if (user) {
    throw boom.badRequest(GLOBAL_ERROR)
  }

  const hashPassword = await bcryptjs.hash(password, 10)

  user = await User.create({ name, lastName, password: hashPassword, email, emailVerified: true, phone, role })
  await Invitation.findOneAndUpdate({ email }, { hasUser: true })

  return getSession(user)
}

module.exports = signup
