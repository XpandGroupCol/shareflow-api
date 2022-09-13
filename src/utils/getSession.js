const { setToken } = require('./token')

const getSession = ({ role, name, lastName, avatar, _id, email }) => {
  const token = setToken({ _id, email, role }, process.env.ACCESS_TOKEN, { expiresIn: '6h' })
  const refreshToken = setToken({ _id, email, role }, process.env.REFRESH_TOKEN, { expiresIn: '12h' })

  return {
    role,
    name,
    lastName,
    avatar,
    email,
    token,
    refreshToken,
    id: _id
  }
}

module.exports = getSession
