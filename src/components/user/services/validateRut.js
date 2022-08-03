const User = require('../../../models/User')

const validateRut = async ({ id, checkRut }) => {
  const data = await User.findByIdAndUpdate(id, { checkRut }, { new: true }).lean().exec()
  // TODO AQUI SE DEBE ENVIAR CORREO AL USUARIO PARA QUE PUEDA IR A PAGAR
  return data
}

module.exports = validateRut
