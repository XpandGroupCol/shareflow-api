const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  target: joi.string().optional(),
  sector: joi.string().optional()
})

const idSchema = joi.object({
  id: joi.string().required()
})

const getPublishersByTargetIdSchema = joi.object({
  search: joi.string().optional(),
  miniBudget: joi.string().trim().required(),
  target: joi.string().optional(),
  page: joi.string().optional()
})

const validateFormatFileSchema = joi.object({
  width: joi.string().trim().required(),
  height: joi.string().trim().required()
})

module.exports = {
  getSchema,
  idSchema,
  getPublishersByTargetIdSchema,
  validateFormatFileSchema
}
