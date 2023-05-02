require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Mongo = require('./mongo')

require('./src/models/Payment.js')
require('./src/models/Audit.js')

const { notFoundHandler, logError } = require('./src/middleware/errorHandler')
const adminRouter = require('./src/components/v1/admin')
const siteRouter = require('./src/components/v1/site')

const mongoDB = new Mongo()
const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (_, res) => res.send('Shareflow - v1.1.0'))

app.use('/v1', adminRouter)
app.use('/v1', siteRouter)

app.use(notFoundHandler)
app.use(logError)

const startApp = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT} is the magic port`)
    })
    await mongoDB.connectMongoDB()
  } catch (e) {
    process.on('uncaughtException', console.log({ e }))
    process.on('unhandledRejection', console.log({ e }))

    // Handled DB exceptions - MongoDB
    process.on('SIGINT', mongoDB.closeConnectionCrashNodeProcess())
    process.on('SIGTERM', mongoDB.closeConnectionCrashNodeProcess())

    console.error(e)
  }
}

startApp()
