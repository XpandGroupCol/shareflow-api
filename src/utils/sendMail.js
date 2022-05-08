const nodemailer = require('nodemailer')

const tansporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'diego.contreras@globant.com',
    pass: 'nxdxrevyfomesxjo'
  }
})

const sendMail = (options, callback) => {
  return tansporter.sendMail(options, callback)
}

const verifyEmal = (token) => ({
  from: 'diego.contreras@globant.com',
  to: 'diegocontreras1219@gmail.com',
  subject: 'Bienvenido a mediaX',
  text: 'Bienvenido a mediaX',
  html: `<a href="http://localhost:3000/auth/verify-email/${token}">Iniciar sesion</a>`
})

const forgotPassword = (token) => ({
  from: 'diego.contreras@globant.com',
  to: 'diegocontreras1219@gmail.com',
  subject: 'Recuperar contraseña',
  text: 'Recuperar contraseña',
  html: `<a href="http://localhost:3000/auth/forgot-password/${token}">Cambiar contraseña</a>`
})

module.exports = {
  sendMail,
  verifyEmal,
  forgotPassword
}
