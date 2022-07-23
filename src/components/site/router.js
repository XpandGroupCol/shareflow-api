const siteRouter = require('express').Router()

siteRouter.use('/site', require('./auth/route'))
siteRouter.use('/site', require('./campaign/route'))
siteRouter.use('/site', require('./user/route'))
siteRouter.use('/site', require('./publisher/route'))
siteRouter.use('/site', require('../invitation/route'))
siteRouter.use('/site', require('./lists/route'))
module.exports = siteRouter
