const joi = require('joi')

const createCampaingSchema = joi.object({
  logo: joi.string(),
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
  summary: joi.object().optional()
})

module.exports = {
  createCampaingSchema
}
