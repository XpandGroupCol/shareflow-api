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

module.exports = {
  ROLES,
  DEVICE,
  SEX,
  STATUS,
  CAMPAING_STATUS
}
