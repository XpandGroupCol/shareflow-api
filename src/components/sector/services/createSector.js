const Sector = require('../../../models/Sector')

const createSector = async ({ name }) => {
  const data = await Sector.create({ name })
  return data
}

module.exports = createSector
