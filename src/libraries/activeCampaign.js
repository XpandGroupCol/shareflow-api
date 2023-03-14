const axios = require('axios').default

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Api-Token': 'e7bcaf60a3b1848a77beb74483673001fa3c5c5d078c68308d275382d5812ba50d15212d'
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

const addContactToList = async (id) => {
  try {
    await fetcher('https://xpandgroup.api-us1.com/api/3/contactLists', {
      contactList: {
        list: 19,
        contact: id,
        status: 1
      }
    })
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
    await addContactToList(user?.contact?.id)
    return user?.contact?.id
  } catch (e) {
    return null
  }
}

module.exports = { createLead }
