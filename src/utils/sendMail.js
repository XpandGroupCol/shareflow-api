const nodemailer = require('nodemailer')

const tansporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'diego.contreras@globant.com',
    pass: process.env.GOOGLE_AUTH
  }
})

const sendMail = (options) => {
  return new Promise((resolve, reject) => {
    tansporter.sendMail(options, (error) => {
      if (error) return reject(error)
      return resolve(true)
    })
  })
}

const verifyEmal = (token) => ({
  from: 'diego.contreras@globant.com',
  to: 'diegocontreras1219@gmail.com',
  subject: 'Bienvenido a mediaX',
  text: 'Bienvenido a mediaX',
  html: `<a href="${process.env.BASE_URL}/auth/verify-email/${token}">Iniciar sesion</a>`
})

const forgotPassword = (token) => ({
  from: 'diego.contreras@globant.com',
  to: 'diegocontreras1219@gmail.com',
  subject: 'Recuperar contraseña',
  text: 'Recuperar contraseña',
  html: `<a href="${process.env.BASE_URL}/auth/forgot-password/${token}">Cambiar contraseña</a>`
})

module.exports = {
  sendMail,
  verifyEmal,
  forgotPassword
}
