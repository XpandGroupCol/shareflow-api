const adminRouter = require('express').Router()

adminRouter.use('/site', require('./auth/route'))

module.exports = adminRouter
