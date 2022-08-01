const Target = require('../../../models/Target')

const createTarget = async ({ name, category }) => {
  const data = await Target.create({ name, category })
  return data
}

module.exports = createTarget
