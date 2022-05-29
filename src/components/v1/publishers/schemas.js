const joi = require('joi')

const getPublishersSchema = joi.object({
  search: joi.string().trim().optional(),
  miniBudget: joi.string().trim().required(),
  target: joi.string().trim().optional(),
  location: joi.string().trim().optional(),
  page: joi.string().trim().optional()
})

module.exports = {
  getPublishersSchema
}
