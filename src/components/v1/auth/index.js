
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ROLES } = require('../../../config')
const loginRouter = require('express').Router()
const User = require('../../../models/User')

loginRouter.post('/admin-login', async (request, response) => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({
        code: 400,
        error: true,
        message: 'Usuario y/o contraseña son requeridos.'
      })
    }

    const user = await User.findOne({
      email,
      status: true,
      role: { $ne: ROLES[2].id }
    })

    if (!user ||
            !bcrypt.compareSync(password, user.password)) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Ingrese un usuario o contraseña valido.'

      })
    }

    if (user && !user?.emailVerified) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Su cuenta no ha sido verificada desde su correo electronico.'

      })
    }

    const data = {
      id: user?._id,
      name: `${user?.name} ${user?.lastName}`,
      image: user?.image,
      role: ROLES.find(({ id }) => user.role === id)?.label || ''
    }

    const token = jwt.sign(data, process.env.AUTH_SECRET)

    response.status(200).json({
      code: 200,
      error: false,
      data: {
        ...data,
        token
      }
    })
  } catch (e) {
    response.status(500).json({
      code: 500,
      error: true,
      message: 'Algo salio mal, por favor intente nuevamente'

    })
  }
})

module.exports = loginRouter
