const adminRouter = require('express').Router()

adminRouter.use('/admin', require('./auth/route'))
adminRouter.use('/admin', require('./sector/route'))
adminRouter.use('/admin', require('./invitation/route'))
adminRouter.use('/admin', require('./users/route'))

module.exports = adminRouter
