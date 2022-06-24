const joi = require('joi')

const authSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .trim()
    .required()
})

const tokenSchema = joi.object({
  token: joi.string().required()
})

const forgotPasswordSchema = joi.object({
  email: joi.string().email().required()
})

const signupSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  lastName: joi.string().required(),
  password: joi
    .string()
    .trim()
    .required()
})

const socialSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  lastName: joi.string().optional(),
  provider: joi.string().required(),
  password: joi.string().trim(),
  image: joi.string().optional()
})

const changePasswordSchema = joi.object({
  token: joi.string().required(),
  password: joi
    .string()
    .trim()
    .required()
})

module.exports = {
  authSchema,
  tokenSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  signupSchema,
  socialSchema
}
