const joi = require('joi')

const createSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required()
})

module.exports = {
  createSchema
}
