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

const changePasswordSchema = joi.object({
  token: joi.string().required(),
  password: joi
    .string()
    .trim()
    .required()
})

module.exports = { authSchema, tokenSchema, forgotPasswordSchema, changePasswordSchema }
