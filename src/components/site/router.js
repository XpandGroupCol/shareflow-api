const siteRouter = require('express').Router()

siteRouter.use('/site', require('../auth/siteRoute'))
siteRouter.use('/site', require('../invitation/siteRoute'))

siteRouter.use('/site', require('./campaign/route'))
siteRouter.use('/site', require('./user/route'))
siteRouter.use('/site', require('./publisher/route'))

siteRouter.use('/site', require('./lists/route'))
siteRouter.use('/site', require('../places/route'))
module.exports = siteRouter
