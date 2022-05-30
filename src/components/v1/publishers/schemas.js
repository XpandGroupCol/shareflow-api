const joi = require('joi')

const getPublishersByTargetIdSchema = joi.object({
  search: joi.string().optional(),
  miniBudget: joi.string().trim().required(),
  target: joi.string().optional(),
  page: joi.string().optional()
})

module.exports = {
  getPublishersByTargetIdSchema
}
