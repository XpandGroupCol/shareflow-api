
const listRouter = require('express').Router()
const { SEX, DEVICE, ROLES, STATUS } = require('../../../config')
const Age = require('../../../models/Age')
const Format = require('../../../models/Format')
const Location = require('../../../models/Location')
const Objetive = require('../../../models/Objetive')
const Sector = require('../../../models/Sector')

listRouter.get('/', async (request, response) => {
  try {
    const [sectors, objectives, ages, locations, formats] = await Promise.allSettled([
      Sector.find({ status: true }),
      Objetive.find({ status: true }),
      Age.find({ status: true }),
      Location.find({ status: true }),
      Format.find({ status: true })
    ])

    response.status(200).json({
      sectors: sectors?.value || [],
      objectives: objectives?.value || [],
      ages: ages?.value || [],
      locations: locations.value || [],
      formats: formats.value || [],
      sex: SEX,
      devices: DEVICE,
      roles: ROLES,
      statuses: STATUS
    })
  } catch (e) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = listRouter
