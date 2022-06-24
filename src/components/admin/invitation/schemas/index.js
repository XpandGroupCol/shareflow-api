const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional()
})

const createSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required()
})

const sendEmailSchema = joi.object({
  email: joi.string().email().required()
})

module.exports = {
  getSchema,
  createSchema,
  sendEmailSchema
}
