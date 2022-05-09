const { SEX, DEVICE, ROLES, STATUS, CAMPAING_STATUS, BIDDING_MODEL } = require('../../../config')
const Age = require('../../../models/Age')
const Format = require('../../../models/Format')
const Location = require('../../../models/Location')
const Target = require('../../../models/Target')
const Sector = require('../../../models/Sector')
const Publisher = require('../../../models/Publisher')

const mapPublishers = (data = []) =>
  data.map(({ _id: id, publisher: label, formats, locations, ageRange, ...restOfPublisher }) =>
    ({
      id,
      label,
      formats: formats.map(({ format, device, pricePerUnit, biddingModel }) => ({ id: format._id, label: format.name, device: device.label, pricePerUnit: parseInt(pricePerUnit), biddingModel: biddingModel.id })),
      locations,
      ageRange,
      ...restOfPublisher
    }))

const getLists = async (_, response) => {
  const [sectors, targets, ages, locations, formats, publisher] = await Promise.allSettled([
    Sector.find({ status: true }),
    Target.find({ status: true }),
    Age.find({ status: true }),
    Location.find({ status: true }),
    Format.find({ status: true }),
    Publisher.find({ status: true })
      .populate('locations')
      .populate('ageRange')
      .populate('formats.format')
      .populate('formats.target').lean()
  ])

  response.status(200).json({
    sectors: sectors?.value || [],
    targets: targets?.value || [],
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
}

module.exports = getLists
