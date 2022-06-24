const { Schema, model } = require('mongoose')

const AgeSchema = new Schema({
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

const Age = model('Age', AgeSchema)

module.exports = Age
