const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  from: joi.string().optional(),
  to: joi.string().optional()
})

module.exports = {
  getSchema
}
