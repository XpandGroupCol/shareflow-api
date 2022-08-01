const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  category: joi.string().optional()
})

const createSchema = joi.object({
  name: joi.string().required(),
  category: joi.array().required().min(1)
})

const idSchema = joi.object({
  id: joi.string().required()
})

const deleteSchema = joi.object({
  status: joi.boolean().required()
})

module.exports = {
  getSchema,
  createSchema,
  idSchema,
  deleteSchema
}
