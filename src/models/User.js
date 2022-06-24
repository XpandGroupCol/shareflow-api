const { Schema, model } = require('mongoose')
const { ROLES } = require('../config')

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
    required: false,
    default: ''
  },
  avatar: {
    type: String,
    required: false,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    default: 'email'
  },
  emailVerified: {
    type: Boolean,
    default: false,
    required: false
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CLIENT'],
    default: 'CLIENT'
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  company: {
    type: String,
    required: false,
    default: ''
  },
  nit: {
    type: String,
    required: false,
    default: ''
  },
  phonePrefixed: {
    type: String,
    required: false,
    default: ''
  },
  phone: {
    type: String,
    required: false,
    default: ''
  },
  address: {
    type: String,
    required: false,
    default: ''
  },
  companyEmail: {
    type: String,
    required: false,
    default: ''
  },
  rut: {
    type: String,
    required: false,
    default: ''
  },
  checkRut: {
    type: Boolean,
    required: false,
    default: false
  },
  expirationRutDate: {
    type: Date,
    required: false,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  },
  percentage: {
    type: Number,
    required: true,
    default: 15
  }
},
{
  timestamps: true
}
)

const User = model('User', userSchema)

module.exports = User
