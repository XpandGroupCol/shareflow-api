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
  name: joi.string().required(),
  lastName: joi
    .string()
    .trim()
    .required(),
  avatar: joi.object().optional()
})

module.exports = {
  getSchema,
  idSchema,
  deleteSchema,
  changePasswordSchema,
  updateProfileSchema
}
