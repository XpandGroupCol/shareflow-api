
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ROLES } = require('../../../config')
const loginRouter = require('express').Router()
const User = require('../../../models/User')
const { sendMail, verifyEmal, forgotPassword } = require('../../../utils/sendMail')
const { getUserAuth } = require('../../../utils/transformData')

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
        message: 'El correo electrónico o contraseña son incorrectos.'

      })
    }

    if (user && !user?.emailVerified) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Su cuenta no ha sido verificada.'

      })
    }

    const data = getUserAuth(user)

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

loginRouter.post('/login', async (request, response) => {
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
      role: ROLES[2].id
    })

    if (!user ||
            !bcrypt.compareSync(password, user.password)) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'El correo electrónico o contraseña son incorrectos.'

      })
    }

    if (user && !user?.emailVerified) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Su cuenta no ha sido verificada desde su correo electronico.'

      })
    }

    const data = getUserAuth(user)

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

loginRouter.post('/social-login', async (request, response) => {
  try {
    let user = null
    const { name, lastName, provider, password = '@', email, image } = request.body

    user = await User.findOne({ email })

    if (user?.provider !== provider) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Ya tiene un usuario con otro proveedor de autenticacion'

      })
    }

    if (user?.role !== ROLES[2].id || !user?.status) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: `No pudimos acceder con su cuenta de ${provider}.Si necesitas que te rescatemos, escribemos a
        support@mediax.com`
      })
    }

    if (!user) {
      user = await User.create({ name, lastName, provider, password, email, image, role: ROLES[2]?.id, emailVerified: true })
    }

    const data = getUserAuth(user)

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

loginRouter.post('/verify-email', async (request, response) => {
  try {
    const { token } = request.body

    const { email } = jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOneAndUpdate({ email }, { emailVerified: true })

    if (!user) {
      return response.status(500).json({
        code: 500,
        error: true,
        message: 'Token no es valido'

      })
    }

    if (user.emailVerified) {
      return response.status(500).json({
        code: 500,
        error: true,
        message: 'Ya este token expiro'

      })
    }

    const data = {
      id: user?._id,
      name: `${user?.name} ${user?.lastName}`,
      image: user?.image,
      role: ROLES.find(({ id }) => user.role === id)?.label || ''
    }

    response.status(200).json({
      code: 200,
      error: false,
      data: {
        ...data,
        token: jwt.sign(data, process.env.AUTH_SECRET)
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

loginRouter.post('/forgot-password', async (request, response) => {
  try {
    const { email } = request.body

    const user = await User.findOne({ email })

    console.log({ user })

    if (user) {
      const data = {
        id: user?._id,
        email: user?.email
      }

      const token = jwt.sign(data, process.env.AUTH_SECRET)
      sendMail(forgotPassword(token), async (error) => {
        if (error) {
          console.log()
          return response.status(500).json({
            code: 500,
            error: true,
            message: 'Algo salio mal, por favor intente nuevamente'
          })
        }
      })
    }

    response.status(200).json({
      code: 200,
      error: false,
      data: true
    })
  } catch (e) {
    response.status(500).json({
      code: 500,
      error: true,
      message: 'Algo salio mal, por favor intente nuevamente'
    })
  }
})

loginRouter.post('/verify-forgot-password', async (request, response) => {
  try {
    const { token } = request.body

    const { email } = jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOne({ email })

    if (!user) {
      return response.status(500).json({
        code: 500,
        error: true,
        message: 'Token no es valido'
      })
    }

    response.status(200).json({
      code: 200,
      error: false,
      data: true
    })
  } catch (e) {
    response.status(500).json({
      code: 500,
      error: true,
      message: 'Algo salio mal, por favor intente nuevamente'

    })
  }
})

loginRouter.post('/signup', async (request, response) => {
  try {
    let user = null
    const { name, lastName, provider, password = '@', email, image } = request.body

    user = await User.findOne({ email })

    if (user) {
      return response.status(400).json({
        code: 400,
        error: true,
        message: 'ya hay un usuario registrado con esos datos.'

      })
    }

    const hashPassword = await bcryptjs.hash(password, 10)

    user = await User.create({ name, lastName, provider, password: hashPassword, email, image, emailVerified: false, role: ROLES[2].id })

    const data = {
      id: user?._id,
      email: user?.email
    }

    const token = jwt.sign(data, process.env.AUTH_SECRET)

    sendMail(verifyEmal(token), async (error) => {
      if (error) {
        console.log({ error })
        await User.deleteOne({ email })
        return response.status(400).json({ error })
      }
    })

    response.status(200).json({
      code: 200,
      error: false,
      data: true
    })
  } catch (e) {
    response.status(500).json({
      code: 500,
      error: true,
      message: 'Algo salio mal, por favor intente nuevamente'

    })
  }
})

loginRouter.post('/change-password', async (request, response) => {
  try {
    const { password, token } = request.body
    const { id } = jwt.verify(token, process.env.AUTH_SECRET)
    const newPassword = await bcryptjs.hash(password, 10)

    const data = await User.findByIdAndUpdate(id, { password: newPassword })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    console.log({ error })
    response.status(500).json({
      code: 500,
      error: true,
      message: 'Algo salio mal, por favor intente nuevamente'
    })
  }
})

module.exports = loginRouter
