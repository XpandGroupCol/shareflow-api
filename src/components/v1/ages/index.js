const agesRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const controller = require('./controller')
const asyncHandler = require('../../../middleware/asynHandler')

agesRouter.get('/', loggedIn, asyncHandler(controller.getAges))

agesRouter.post('/', loggedIn, asyncHandler(controller.createAge))

agesRouter.delete('/:id', loggedIn, asyncHandler(controller.deleteAge))

agesRouter.put('/:id', loggedIn, asyncHandler(controller.updateAge))

module.exports = agesRouter
