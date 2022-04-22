const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  provider: {
    type: String,
    required: true,
    default: 'email'
  },
  emailVerified: {
    type: Boolean,
    default: true,
    required: false
  },
  company: {
    type: String,
    required: false
  },
  nit: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: '',
    required: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
{
  timestamps: true
}
)

const User = model('User', userSchema)

module.exports = User
