
const bcrypt = require('bcryptjs')
const { ROLES } = require('../../../config')
const loginRouter = require('express').Router()
const User = require('../../../models/User')

loginRouter.post('/admin', async (request, response) => {
  try {
    const { email, password } = request.body
    const user = await User.findOne({ email })

    if (!user ||
            !bcrypt.compareSync(password, user.password)) {
      return response.status(400).json({
        code: 400,
        message: 'Usuario o contraseña invalida'

      })
    }

    // si hay usuario y esta inactivo : se debe retornar error
    // si hay usuario y no esta verificado : re debe enviar otro mensaje

    response.status(200).json({
      code: 200,
      data: {
        id: user?._id,
        name: `${user?.name} ${user?.lastName}`,
        image: user?.image,
        role: ROLES.find(({ id }) => user.role === id)?.label || ''
      }
    })
  } catch (e) {
    response.status(400).json({
      code: 400,
      message: 'bad request'

    })
  }
})

module.exports = loginRouter
