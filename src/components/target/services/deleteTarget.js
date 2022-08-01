const Target = require('../../../models/Target')

const deleteTarget = async ({ id, status }) => {
  const data = await Target.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deleteTarget
