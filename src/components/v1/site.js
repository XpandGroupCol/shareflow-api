const siteRouter = require('express').Router()

siteRouter.use('/site', require('../auth/siteRoute'))
siteRouter.use('/site', require('../invitation/siteRoute'))
siteRouter.use('/site', require('../campaign/siteRoute'))
siteRouter.use('/site', require('../user/siteRoute'))
siteRouter.use('/site', require('../lists/route'))
siteRouter.use('/site', require('../audit/route'))
siteRouter.use('/site', require('../activity/route'))

module.exports = siteRouter
