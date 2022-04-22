require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const loginRouter = require('./src/components/v1/auth')
const campaignRouter = require('./src/components/v1/campaigns')
const userRouter = require('./src/components/v1/users')
const publisherRouter = require('./src/components/v1/publishers')

const listRouter = require('./src/components/v1/lists')
const agesRouter = require('./src/components/v1/ages')
const sectorsRouter = require('./src/components/v1/sectors')
const objectivesRouter = require('./src/components/v1/objectives')
const formatsRouter = require('./src/components/v1/formats')
const locationsRouter = require('./src/components/v1/locations')

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (_, res) => res.send('MediaX api - v1.0.0'))
app.use('/auth', loginRouter)
app.use('/publishers', publisherRouter)
app.use('/users', userRouter)
app.use('/campaigns', campaignRouter)

app.use('/lists', listRouter)
app.use('/ages', agesRouter)
app.use('/sectors', sectorsRouter)
app.use('/objetives', objectivesRouter)
app.use('/locations', formatsRouter)
app.use('/formats', locationsRouter)

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} is the magic port`)
})
