const Sector = require('../../../models/Sector')

const updateSector = async ({ id, name }) => {
  const data = await Sector.findByIdAndUpdate(id, { name }, { new: true })
  return data
}

module.exports = updateSector
