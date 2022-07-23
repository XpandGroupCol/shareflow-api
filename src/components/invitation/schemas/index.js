const joi = require('joi')

const getSchema = joi.object({
  search: joi.string().optional(),
  page: joi.string().optional()
})

const createSchema = joi.object({
  name: joi.string().required().error(new Error('Tenemos problemas con el NOMBRE, por favor verifica que el valor sea valido')),
  lastName: joi.string().required().error(new Error('Tenemos problemas con el APELLIDO, por favor verifica que el valor sea valido')),
  email: joi.string().email().required()
    .error(new Error('Tenemos problemas con el CORREO, por favor verifica que el valor sea valido')),
  phone: joi.string().required().error(new Error('Tenemos problemas con el WHATSAPP, por favor verifica que el valor sea valido'))
})

const sendEmailSchema = joi.object({
  id: joi.string().required()
})

module.exports = {
  getSchema,
  createSchema,
  sendEmailSchema
}
