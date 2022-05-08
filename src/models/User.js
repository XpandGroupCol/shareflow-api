const { Schema, model } = require('mongoose')
const { ROLES, STATUS } = require('../config')

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
  image: {
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
    default: ROLES[2]?.id
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
    type: Number,
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
  }
},
{
  timestamps: true
}
)

userSchema.set('toJSON', {
  transform: (_, user) => {
    user.id = user._id
    user.fullName = `${user.name} ${user.lastName}`
    user.role = ROLES.find(({ id }) => user.role === id) || {}
    user.status = STATUS.find(({ id }) => user.status === !!id) || {}
    delete user.password
    delete user.createdAt
    delete user.updatedAt
    delete user._id
    delete user.__v
  }
})

const User = model('User', userSchema)

module.exports = User
