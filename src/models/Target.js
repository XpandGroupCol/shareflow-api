const { Schema, model } = require('mongoose')

const TargetSchema = new Schema({
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
  },
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

TargetSchema.set('toJSON', {
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

const Target = model('Target', TargetSchema)

module.exports = Target
