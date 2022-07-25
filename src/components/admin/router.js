const adminRouter = require('express').Router()

adminRouter.use('/admin', require('../auth/adminRoute'))
adminRouter.use('/admin', require('../invitation/adminRoute'))
adminRouter.use('/admin', require('../campaign/adminRoute'))
adminRouter.use('/admin', require('./user/route'))
adminRouter.use('/site', require('../places/route'))
adminRouter.use('/admin', require('./lists/route'))

adminRouter.use('/admin', require('./sector/route'))
adminRouter.use('/admin', require('./age/route'))
adminRouter.use('/admin', require('./target/route'))
adminRouter.use('/admin', require('./format/route'))
adminRouter.use('/admin', require('./publisher/route'))

module.exports = adminRouter
