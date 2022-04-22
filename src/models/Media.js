const { Schema, model } = require('mongoose')

const MediaSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
}, {
  timestamps: true
})

MediaSchema.set('toJSON', {
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

export const Media = model('Media', MediaSchema)

module.exports = Media
