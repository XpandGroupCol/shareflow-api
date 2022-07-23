const joi = require('joi')

const searchSchema = joi.object({
  search: joi.string().required()

})

module.exports = {
  searchSchema
}
