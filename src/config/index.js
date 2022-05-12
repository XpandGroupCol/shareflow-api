const ROLES = [
  {
    id: 'ADMIN',
    label: 'Admin'
  },
  {
    id: 'CLIENT',
    label: 'Client'
  }
]

const DEVICE = [
  {
    id: 'all',
    label: 'Todos'
  },
  {
    id: 'mobile',
    label: 'Mobile'
  },
  {
    id: 'desktop',
    label: 'Desktop'
  }
]

const SEX = [
  {
    id: 'all',
    label: 'Todos'
  }, {
    id: 'male',
    label: 'Hombres'
  }, {
    id: 'women',
    label: 'Mujeres'
  }
]

const CAMPAING_STATUS = [
  {
    id: 'draft',
    label: 'Borrador'
  }, {
    id: 'pending',
    label: 'Pendiente'
  }, {
    id: 'paid',
    label: 'Pagada'
  }
]

const BIDDING_MODEL = [
  {
    id: 'CPM',
    label: 'CPM'
  },
  {
    id: 'CPC',
    label: 'CPC'
  },
  {
    id: 'CPV',
    label: 'CPV'
  },
  {
    id: 'CPA',
    label: 'CPA'
  }
]

const TARGET_TYPE = [
  {
    id: 'clicks',
    label: 'Click'
  },
  {
    id: 'reproductions',
    label: 'Reproducciones'
  },
  {
    id: 'prints',
    label: 'Impresiones'
  }
]

const PUBLISHER_CATEGORY = [
  {
    id: 'platform',
    label: 'Plataforma'
  },
  {
    id: 'medium',
    label: 'Medio'
  }
]

const MEDIA_FORMATS = [
  { id: 'mp4', label: 'MP4', isVideo: true },
  { id: 'avi', label: 'AVI', isVideo: true },
  { id: 'vod', label: 'VOB', isVideo: true },
  { id: 'wmv', label: 'WMV', isVideo: true },
  { id: 'gif', label: 'GIF', isVideo: false },
  { id: 'jpg', label: 'JPG', isVideo: false },
  { id: 'tif', label: 'TIF', isVideo: false },
  { id: 'png', label: 'PNG', isVideo: false },
  { id: 'svg', label: 'SVG', isVideo: false },
  { id: 'jpeg', label: 'JPEG', isVideo: false }
]

module.exports = {
  ROLES,
  DEVICE,
  SEX,
  PUBLISHER_CATEGORY,
  CAMPAING_STATUS,
  BIDDING_MODEL,
  TARGET_TYPE,
  MEDIA_FORMATS
}
