const joi = require('joi')
const yup = require('yup')

// .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)

const createUserSchema = joi.object({
  email: joi.string().required().email(),
  name: joi.string().required(),
  avatar: joi.string().allow('', null),
  lastName: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required(),
  company: joi.string().allow('', null),
  nit: joi.string().allow('', null),
  phonePrefixed: joi.string().allow('', null),
  phone: joi.string().allow('', null),
  address: joi.string().allow('', null),
  companyEmail: joi.string().allow('', null),
  rut: joi.string().allow('', null),
  percentage: joi.number().min(1).max(100).required(),
  provider: joi.string().optional(),
  emailVerified: joi.bool().optional(),
  status: joi.bool().optional(),
  checkRut: joi.bool().optional(),
  expirationRutDate: joi.optional().allow(null),
  deletedAt: joi.optional().allow(null)
})

const editUserSchema = yup.object({
  email: yup.string().required('Correo electronico es requerido').email('Ingrese un correo electronico valido'),
  name: yup.string().required('Nombres es requerido'),
  lastName: yup.string().required('Apellidos es requerido'),
  role: yup.object().required('Rol es requerido').nullable(),
  company: yup.string(),
  nit: yup.string(),
  phonePrefixed: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  companyEmail: yup.string(),
  rut: yup.object().nullable(),
  percentage: yup.number().typeError('Porcentaje debe ser un numero').min(1, 'El valor minimo debe ser 1').max(100, 'El valor maximo debe ser 100').nullable().required('Porcentaje es requerido')
}).required()

module.exports = {
  createUserSchema,
  editUserSchema
}
