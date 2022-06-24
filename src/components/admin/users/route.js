const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const userRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

userRouter.get('/users',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getUsers))

module.exports = userRouter
