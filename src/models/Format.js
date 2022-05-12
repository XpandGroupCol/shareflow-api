const { Schema, model } = require('mongoose')
const { MEDIA_FORMATS } = require('../config')

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
  type: {
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

FormatSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.label = returnedObject.name
    returnedObject.type = MEDIA_FORMATS.find(({ id }) => id === returnedObject.type) || null
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject.name
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Format = model('Format', FormatSchema)

module.exports = Format
