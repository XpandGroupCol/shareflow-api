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

LocationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.label = `${returnedObject.name}, ${returnedObject.country ?? ''}`
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject.name
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Location = model('Location', LocationSchema)

module.exports = Location
