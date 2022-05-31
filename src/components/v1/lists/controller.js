const { SEX, DEVICE, ROLES, STATUS, CAMPAING_STATUS, BIDDING_MODEL, MEDIA_FORMATS, TARGET_TYPE, PUBLISHER_CATEGORY } = require('../../../config')
const Age = require('../../../models/Age')
const Format = require('../../../models/Format')
const Location = require('../../../models/Location')
const Target = require('../../../models/Target')
const Sector = require('../../../models/Sector')
const Publisher = require('../../../models/Publisher')

// todo

// servicios, objetivos, publishers => debe ser autocomplete

const mapPublishers = (data = []) =>
  data.map(({ _id: id, publisher: label, formats, locations, ageRange, ...restOfPublisher }) =>
    ({
      id,
      label,
      formats: formats.map(({ format, device, pricePerUnit, biddingModel, target: { category } }) => {
        return ({
          id: format._id,
          label: format.name,
          device: DEVICE.find(({ id }) => id === device)?.label || '',
          pricePerUnit: parseInt(pricePerUnit),
          biddingModel: biddingModel,
          target: { category }
        })
      }),
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
    biddingModel: BIDDING_MODEL,
    mediaFormats: MEDIA_FORMATS,
    targetTypes: TARGET_TYPE,
    publisherCategory: PUBLISHER_CATEGORY
  })
}

const getCampaignList = async (_, response) => {
  const [sectors, targets, ages, locations, publisher] = await Promise.allSettled([
    Sector.find({ status: true }),
    Target.find({ status: true }),
    Age.find({ status: true }),
    Location.find({ status: true })
  ])

  response.status(200).json({
    sectors: sectors?.value || [],
    targets: targets?.value || [],
    ages: ages?.value || [],
    locations: locations.value || [],
    sex: SEX
  })
}

module.exports = {
  getCampaignList,
  getLists
}
