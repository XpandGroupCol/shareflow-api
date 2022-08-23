const joi = require('joi')
const getAuditInformation = joi.object({
  module: joi.string().required(),
  page: joi.string().optional()

})

module.exports = {
  getAuditInformation
}
