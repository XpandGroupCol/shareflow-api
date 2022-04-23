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
    id: 'active',
    label: 'Activo'
  }, {
    id: 'inactive',
    label: 'Inactivo'
  }, {
    id: 'pending',
    label: 'Verificando email'
  }
]

module.exports = {
  ROLES,
  DEVICE,
  SEX,
  STATUS
}
