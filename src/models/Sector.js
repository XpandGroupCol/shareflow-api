const { Schema, model } = require('mongoose')

const SectorSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

const Sector = model('Sector', SectorSchema)

module.exports = Sector
