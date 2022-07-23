
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')

const User = require('../../../models/User')

const { verifyToken } = require('../../../utils/token')

const changePassword = async ({ password, token }) => {
  const [_token, _id] = token.split('@u@')

  const user = await User.findById(_id)

  console.log(user)

  if (!user) throw boom.badRequest('Token no valido')

  try {
    verifyToken(_token, `${process.env.ACCESS_TOKEN}${user.password}`)
    user.password = await bcryptjs.hash(password, 10)
    await user.save()
    return true
  } catch (e) {
    console.log(e)
    throw boom.unauthorized('Token no valido')
  }
}

module.exports = changePassword
