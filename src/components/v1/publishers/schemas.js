const joi = require('joi')

const getPublishersByTargetIdSchema = joi.object({
  search: joi.string().optional(),
  miniBudget: joi.string().trim().required(),
  target: joi.string().optional(),
  page: joi.string().optional()
})

const createPublisherSchema = joi.object({
  logo: joi.string(),
  publisher: joi.string(),
  miniBudget: joi.number(),
  locations: joi.array(),
  sex: joi.string(),
  ageRange: joi.array(),
  kpi: joi.string(),
  status: joi.any(),
  category: joi.string(),
  formats: joi.array()

})

module.exports = {
  createPublisherSchema,
  getPublishersByTargetIdSchema
}
