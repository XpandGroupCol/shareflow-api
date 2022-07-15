const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  target: joi.string().optional(),
  category: joi.string().optional()
})

const deleteSchema = joi.object({
  status: joi.boolean().required()
})

const idSchema = joi.object({
  id: joi.string().required()
})

module.exports = {
  getSchema,
  deleteSchema,
  idSchema
}
