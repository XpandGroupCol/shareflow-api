const _ = require('lodash')
const { isValidObjectId } = require('mongoose')

const isArray = (arr) => arr !== null && Array.isArray(arr)

const isObject = obj => obj !== null && typeof obj === 'object'

const isMongoId = (id) => isValidObjectId(id) ? id.toString() : id

const isDate = (date) => new Date(date).toString()

const deepEqual = (obj1, obj2) => {
  const cloneObj2 = JSON.parse(JSON.stringify(obj2))

  if (_.isEqual(obj1, obj2)) return {}

  for (const key in obj1) {
    if (cloneObj2[key] !== null || cloneObj2[key] !== undefined) {
      delete cloneObj2[key]
    }
  }

  const result = { ...cloneObj2 }

  for (const prop in obj2) {
    const obj1Prop = isMongoId(obj1[prop])
    const obj2Prop = isMongoId(obj2[prop])

    if (!obj1Prop) {
      result[prop] = obj2Prop
      continue
    }

    if (isArray(obj1Prop) && isArray(obj2Prop)) {
      const arr1 = obj1Prop.map((el) => isMongoId(el))
      const arr2 = obj2Prop.map((el) => isMongoId(el))

      if (!arr1.length) {
        result[prop] = arr2
        continue
      }

      if (_.isEqual(arr1, arr2)) continue

      const arr = []

      for (let i = 0; arr2.length > i; i++) {
        const arrayProp1 = isMongoId(arr1[i])
        const arrayProp2 = isMongoId(arr2[i])

        if (!arr1[i]) {
          arr.push(arr2[i])
          break
        }

        if (isObject(arrayProp1 || arrayProp2)) {
          const value = deepEqual(arrayProp1, arrayProp2)
          if (value) arr.push({ ...value, label: arrayProp2?.label })
          continue
        }

        if (arr1.includes(arrayProp1)) continue

        arr.push(arrayProp1)
      }
      result[prop] = arr
      continue
    }

    if (isObject(obj1Prop) && isObject(obj2Prop)) {
      const value = deepEqual(obj1Prop, obj2Prop)
      if (value) result[prop] = value
      continue
    }

    if (obj1Prop instanceof Date || obj2Prop instanceof Date) {
      const _date = isDate(obj1Prop)
      const _date2 = isDate(obj2Prop)

      if (_date !== _date2) {
        result[prop] = obj2Prop
      }
      continue
    }

    if (obj1Prop !== obj2Prop) {
      result[prop] = obj2Prop
    }
  }

  return Object.values(result).length ? result : undefined
}

module.exports = { deepEqual }
