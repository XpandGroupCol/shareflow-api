const joi = require('joi')

// .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)

const createUserSchema = joi.object({
  email: joi.string().required().email(),
  name: joi.string().required(),
  avatar: joi.string().allow('', null),
  lastName: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required(),
  company: joi.string().allow('', null),
  nit: joi.string().allow('', null),
  phonePrefixed: joi.string().allow('', null),
  phone: joi.string().allow('', null),
  address: joi.string().allow('', null),
  companyEmail: joi.string().allow('', null),
  rut: joi.string().allow('', null),
  percentage: joi.number().min(1).max(100).required(),
  provider: joi.string().optional(),
  emailVerified: joi.bool().optional(),
  status: joi.bool().optional(),
  checkRut: joi.bool().optional(),
  expirationRutDate: joi.optional().allow(null),
  deletedAt: joi.optional().allow(null)
})

const editUserSchema = joi.object({
  email: joi.string().required().email(),
  name: joi.string().required(),
  avatar: joi.string().allow('', null),
  lastName: joi.string().required(),
  role: joi.string().required(),
  company: joi.string().allow('', null),
  nit: joi.string().allow('', null),
  phonePrefixed: joi.string().allow('', null),
  phone: joi.string().allow('', null),
  address: joi.string().allow('', null),
  companyEmail: joi.string().allow('', null),
  rut: joi.string().allow('', null),
  percentage: joi.number().min(1).max(100).required(),
  checkRut: joi.bool().optional()
})

module.exports = {
  createUserSchema,
  editUserSchema
}
