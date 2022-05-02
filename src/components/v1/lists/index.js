
const listRouter = require('express').Router()
const { SEX, DEVICE, ROLES, STATUS, CAMPAING_STATUS, BIDDING_MODEL } = require('../../../config')
const loggedIn = require('../../../middleware/isAuth')
const Age = require('../../../models/Age')
const Format = require('../../../models/Format')
const Location = require('../../../models/Location')
const Objetive = require('../../../models/Objetive')
const Sector = require('../../../models/Sector')
const Publisher = require('../../../models/Publisher')

const mapList = (list = []) => list.map(({ _id: id, name: label }) => ({ id, label }))

const mapPublishers = (data = []) =>
  data.map(({ _id: id, publisher: label, formats, locations, ageRange, ...restOfPublisher }) =>
    ({
      id,
      label,
      formats: mapList(formats),
      locations: mapList(formats),
      ageRange: mapList(formats),
      ...restOfPublisher
    }))

listRouter.get('/', loggedIn, async (_, response) => {
  try {
    const [sectors, objectives, ages, locations, formats, publisher] = await Promise.allSettled([
      Sector.find({ status: true }),
      Objetive.find({ status: true }),
      Age.find({ status: true }),
      Location.find({ status: true }),
      Format.find({ status: true }),
      Publisher.find({ status: true }).populate('locations').populate('formats').populate('ageRange').lean()
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
      statuses: STATUS,
      campaignStatuses: CAMPAING_STATUS,
      publisher: mapPublishers(publisher?.value || []),
      biddingModel: BIDDING_MODEL
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

module.exports = listRouter
