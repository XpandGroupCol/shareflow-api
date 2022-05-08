const ROLES = [
  {
    id: 'SUPER_ADMIN',
    label: 'Super Admin'
  },
  {
    id: 'ADMIN',
    label: 'Admin'
  },
  {
    id: 'CLIENT',
    label: 'Client'
  },
  {
    id: 'SEO',
    label: 'Seo'
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

const STATUS = [
  {
    id: 0,
    label: 'Activo'
  }, {
    id: 1,
    label: 'Inactivo'
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
    id: 'click',
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

module.exports = {
  ROLES,
  DEVICE,
  SEX,
  STATUS,
  CAMPAING_STATUS,
  BIDDING_MODEL,
  TARGET_TYPE
}
