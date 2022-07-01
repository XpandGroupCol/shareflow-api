const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  status: joi.string().optional(),
  target: joi.string().optional(),
  category: joi.string().optional()
})

module.exports = {
  getSchema
}
