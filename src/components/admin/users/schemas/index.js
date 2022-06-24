const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional(),
  role: joi.string().optional(),
  status: joi.string().optional()
})

module.exports = {
  getSchema
}
