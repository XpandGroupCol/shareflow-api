const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

const Location = model('Location', LocationSchema)

module.exports = Location
