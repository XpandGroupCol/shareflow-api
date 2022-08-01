
const SEX = {
  all: 'Todos',
  male: 'Hombres',
  women: 'Mujeres'
}

const NEW_CAMPAIGN_STATUS = {
  draft: 'Borrador',
  pending: 'Pendiente',
  paid: 'Pagada',
  inProgress: 'En progreso',
  cancel: 'Cancelada',
  completed: 'Completada'
}

const DEFAULT_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MEDIA_EXPERT: 'MEDIA_EXPERT',
  ANALIST: 'ANALIST',
  CLIENT: 'CLIENT'
}

const PER_PAGE = 10

module.exports = {
  SEX,
  NEW_CAMPAIGN_STATUS,
  DEFAULT_ROLES,
  PER_PAGE,
  GLOBAL_ERROR: 'Parece que tenemos problemas para procesar tu solicitud, por favor intenta nuevamente.'
}
