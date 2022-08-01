const Sector = require('../../../models/Sector')

const deleteSector = async ({ id, status }) => {
  const data = await Sector.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = deleteSector
