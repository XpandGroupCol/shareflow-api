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
    default: false,
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
    default: ROLES[2]?.id
  },
  status: {
    type: Boolean,
    default: true,
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
