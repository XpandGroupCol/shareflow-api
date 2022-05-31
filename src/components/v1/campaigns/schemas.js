const joi = require('joi')
const { createPublisherSchema } = require('../publishers/schemas')

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
  provider: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  image: joi.string()
})

const changePasswordSchema = joi.object({
  password: joi.string().required(),
  token: joi.string().required()
})

const campaignSchema = joi.object({
  logo: joi.string(),
  brand: joi.string(),
  name: joi.string(),
  startDate: joi.any(),
  endDate: joi.any(),
  target: joi.any(),
  sector: joi.any(),
  locations: joi.array(),
  ages: joi.array(),
  url: joi.string(),
  amount: joi.number(),
  status: joi.string(),
  publishers: joi.array(),
  sex: joi.string(),
  payment: joi.any()
})

const filesSchema = joi.array().items({
  name: joi.string().trim().required(),
  mimetype: joi.string().trim(),
  uri: joi.string().trim().required()
})

const createCampaingSchema = joi.object({
  files: filesSchema,
  campaign: campaignSchema
})

module.exports = {
  filesSchema,
  loginSchema,
  signupSchema,
  socialLoginSchema,
  verifyTokenSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  createCampaingSchema
}
