const { Schema, model } = require('mongoose')

const FormatSchema = new Schema({
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

FormatSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.label = returnedObject.name
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject.name
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Format = model('Format', FormatSchema)

module.exports = Format
