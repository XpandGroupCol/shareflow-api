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
  page: joi.string().optional(),
  sex: joi.string().optional(),
  ages: joi.string().optional()
})

const validateFormatFileSchema = joi.object({
  width: joi.string().trim().required(),
  height: joi.string().trim().required()
})

const createCampaingSchema = joi.object({
  logo: joi.string().allow('', null),
  image: joi.string().optional(),
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
  user: joi.string(),
  publishers: joi.array(),
  sex: joi.string(),
  payment: joi.any(),
  summary: joi.object().optional(),
  userPercentage: joi.any(),
  file: joi.any().optional()
})

module.exports = {
  getSchema,
  idSchema,
  getPublishersByTargetIdSchema,
  validateFormatFileSchema,
  createCampaingSchema
}
