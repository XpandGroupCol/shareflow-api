const { Schema, model } = require('mongoose')

const TargetSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  category: {
    type: [String],
    enum: ['clicks', 'prints', 'reproductions'],
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

const Target = model('Target', TargetSchema)

module.exports = Target
