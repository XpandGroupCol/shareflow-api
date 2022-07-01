const { Schema, model } = require('mongoose')

const FormatSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  width: {
    type: Number,
    required: true,
    default: 0
  },
  height: {
    type: Number,
    required: true,
    default: 0
  },
  isVideo: {
    type: Boolean,
    required: true,
    default: false
  },
  weight: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

const Format = model('Format', FormatSchema)

module.exports = Format
