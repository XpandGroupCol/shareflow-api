const siteRouter = require('express').Router()

siteRouter.use('/site', require('../auth/siteRoute'))
siteRouter.use('/site', require('../invitation/siteRoute'))
siteRouter.use('/site', require('../campaign/siteRoute'))
siteRouter.use('/site', require('./user/route'))
siteRouter.use('/site', require('../places/route'))
siteRouter.use('/site', require('./lists/route'))

module.exports = siteRouter
