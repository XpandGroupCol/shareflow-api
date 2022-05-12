const joi = require('joi')

// .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .trim()
    .required()
})

const socialLoginSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  provider: joi.string().required(),
  email: joi.string().email().required(),
  image: joi.string()
})

const forgotPasswordSchema = joi.object({
  email: joi.string().email().required()
})

const verifyTokenSchema = joi.object({
  token: joi.string().required()
})

const signupSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  image: joi.string()
})

const changePasswordSchema = joi.object({
  password: joi.string().required(),
  token: joi.string().required()
})

module.exports = {
  loginSchema,
  socialLoginSchema,
  forgotPasswordSchema,
  verifyTokenSchema,
  signupSchema,
  changePasswordSchema
}
