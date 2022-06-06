const joi = require('joi')

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
  createCampaingSchema,
  validateFormatFileSchema
}
