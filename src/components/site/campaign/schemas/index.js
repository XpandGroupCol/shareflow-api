const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  from: joi.string().optional(),
  to: joi.string().optional()
})

const getPublishersByTargetIdSchema = joi.object({
  search: joi.string().optional(),
  miniBudget: joi.string().trim().required(),
  target: joi.string().optional(),
  page: joi.string().optional()
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
  userPercentage: joi.any()
})

const validateFormatFileSchema = joi.object({
  width: joi.string().trim().required(),
  height: joi.string().trim().required()
})

module.exports = {
  getSchema,
  getPublishersByTargetIdSchema,
  createCampaingSchema,
  validateFormatFileSchema
}
