const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  isVideo: joi.string().optional()
})

const createSchema = joi.object({
  name: joi.string().required(),
  width: joi.number().required(),
  height: joi.number().required(),
  weight: joi.number().optional(),
  isVideo: joi.boolean().required()
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
