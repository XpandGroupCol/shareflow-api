const Target = require('../../../models/Target')

const updateTarget = async ({ id, ...rest }) => {
  const data = await Target.findByIdAndUpdate(id, { ...rest }, { new: true })
  return data
}

module.exports = updateTarget
