const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

class Mongo {
  constructor () {
    this.connectionUri = connectionString
  }

  async connectMongoDB () {
    try {
      const connection = await mongoose.connect(this.connectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      console.info(`MongoDB Connected ${connection.connection.host}`)
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`)
    }
  }

  async closeDBConnection () {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.error(`Error trying to dissconect: ${error}`)
    }
  }

  closeConnectionCrashNodeProcess () {
    mongoose.connection.close(() => process.exit(0))
  }
}

module.exports = Mongo
