const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  role: joi.string().optional(),
  status: joi.string().optional()
})

const idSchema = joi.object({
  id: joi.string().required()
})

const deleteSchema = joi.object({
  status: joi.boolean().required()
})

const changePasswordSchema = joi.object({
  password: joi
    .string()
    .trim()
    .required()
})

const updateProfileSchema = joi.object({
  name: joi.string().optional(),
  lastName: joi
    .string()
    .trim()
    .optional(),
  avatar: joi.object().optional(),
  address: joi.string().optional(),
  company: joi.string().optional(),
  companyEmail: joi.string().optional(),
  nit: joi.string().optional(),
  phone: joi.string().optional(),
  phonePrefixed: joi.string().optional(),
  rut: joi.object().optional()
})

const updateCompanySchema = joi.object({
  address: joi.string().optional(),
  company: joi.string().optional(),
  companyEmail: joi.string().optional(),
  nit: joi.string().optional(),
  phone: joi.string().optional(),
  phonePrefixed: joi.string().optional(),
  rut: joi.object().optional()
})

module.exports = {
  getSchema,
  idSchema,
  deleteSchema,
  changePasswordSchema,
  updateProfileSchema,
  updateCompanySchema
}
