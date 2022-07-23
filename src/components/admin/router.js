const adminRouter = require('express').Router()

adminRouter.use('/admin', require('./auth/route'))
adminRouter.use('/admin', require('./sector/route'))
adminRouter.use('/admin', require('../invitation/route'))
adminRouter.use('/admin', require('./user/route'))
adminRouter.use('/admin', require('./age/route'))
adminRouter.use('/admin', require('./target/route'))
adminRouter.use('/admin', require('./campaign/route'))
adminRouter.use('/admin', require('./format/route'))
adminRouter.use('/admin', require('./publisher/route'))
adminRouter.use('/admin', require('./lists/route'))

module.exports = adminRouter
