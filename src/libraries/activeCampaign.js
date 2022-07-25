const axios = require('axios').default

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Api-Token': process.env.ACTIVE_CAMPAIGN_KEY
  }
}

const fetcher = async (url, data) => axios.request({ ...options, url, data })

const addTag = async (id) => {
  try {
    const payload = {
      contactTag: { contact: id, tag: 34 }
    }
    const { data } = await fetcher('https://xpandgroup.api-us1.com/api/3/contactTags', payload)
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

const createLead = async (contact) => {
  try {
    const payload = { contact }
    const { data: user } = await fetcher('https://xpandgroup.api-us1.com/api/3/contacts', payload)
    if (!user?.contact?.id) return false
    await addTag(user?.contact?.id)
    return user?.contact?.id
  } catch (e) {
    console.log(e)
    return null
  }
}

module.exports = { createLead }
