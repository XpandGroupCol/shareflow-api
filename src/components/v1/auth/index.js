
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
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

loginRouter.post('/social-login', async (request, response) => {
  try {
    let user = null
    const { name, lastName, provider, password = '@', email, image } = request.body

    user = await User.findOne({ email })

    if (user && user.provider !== provider) {
      return response.status(401).json({
        code: 401,
        error: true,
        message: 'Ya tiene un usuario con otro proveedor de autenticacion'

      })
    }

    if (!user) {
      user = await User.create({ name, lastName, provider, password, email, image, role: ROLES[2]?.id, emailVerified: true })
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

    user = await User.create({ name, lastName, provider, password, email, image, emailVerified: false, role: ROLES[2].id })

    const tansporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'diego.contreras@globant.com',
        pass: 'nxdxrevyfomesxjo'
      }
    })

    const data = {
      id: user?._id,
      email: user?.email
    }

    const token = jwt.sign(data, process.env.AUTH_SECRET)

    tansporter.sendMail({
      from: 'diego.contreras@globant.com',
      to: 'diegocontreras1219@gmail.com',
      subject: 'Bienvenido a mediaX',
      text: 'Bienvenido a mediaX',
      html: `<a href="http://localhost:3000/auth/verify-email/${token}">Iniciar sesion</a>`
    }, async (error) => {
      if (error) {
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

module.exports = loginRouter
