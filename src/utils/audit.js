const { isValidObjectId } = require('mongoose')
const { auditActions, ignoreFields } = require('../libraries/constants/auditActions.constants')
const Audit = require('../models/Audit')
const _ = require('lodash')

const loggerUpdateRecord = async (currentData, newData, user, module) => {
  const data = deepEqual(currentData, newData)
  const recordsToSave = {
    newElementId: newData._id,
    modifiedBy: user,
    module: module,
    action: auditActions.update,
    data
  }

  const newAuditRecord = await Audit.create(recordsToSave)
  return newAuditRecord
}

const loggerCreateRecord = async (request, user, module) => {
  const keys = Object.keys(request)
  const data = []
  for (const key of keys) {
    if (!(Object.values(ignoreFields).includes(key))) {
      const newRecord = {
        [key]: {
          newValue: request[key],
          previousValue: 'NA'
        }
      }
      data.push(newRecord)
    }
  }
  const recordsToSave = {
    newElementId: request._id,
    modifiedBy: user,
    module: module,
    action: auditActions.create,
    data
  }

  const newAuditRecord = await Audit.create(recordsToSave)

  return newAuditRecord
}

const deepEqual = (object1, object2) => {
  const recordsToSave = []
  let keys1 = Object.keys(object1)

  keys1 = keys1.filter(key => !(Object.values(ignoreFields).includes(key)))

  for (const key of keys1) {
    let val1 = object1[key]
    let val2 = object2[key]
    val1 = isValidObjectId(val1) ? val1.toString() : val1
    val2 = isValidObjectId(val2) ? val2.toString() : val2
    const areObjects = isObject(val1) && isObject(val2)
    const areArrays = (Array.isArray(val1) && Array.isArray(val2)) ?? true

    if (areObjects && !areArrays) {
      deepEqual(val1, val2)
    }

    if (areArrays) {
      const isArrayOfObjectsId = isArraysObjectsId(val1) && isArraysObjectsId(val2)
      if (isArrayOfObjectsId) {
        const newValues = getNewValuesArraysOfOBjectsId(val1, val2)
        if (newValues.length) {
          const newRecord = {
            [key]: {
              newValue: newValues,
              previousValue: val1
            }
          }
          recordsToSave.push(newRecord)
        }
      } else {
        let validate = false

        // In case en la db is 0
        if (!val1.length && val2.length) {
          const newRecord = {
            [key]: {
              newValue: val2,
              previousValue: val1
            }
          }
          recordsToSave.push(newRecord)
          validate = true
        }

        // In case de que por actualizar is 0
        if (val1.length && !val2.length && !validate) {
          validate = true
        }

        // In case both are 0
        if (!val1.length && !val2.length && !validate) {
          validate = true
        }

        // In case new array is greater than old array
        if (val2.length > val1.length && !validate) {
          const newValues = []
          val2.forEach(value2 => {
            val1.forEach(value1 => {
              const validationResult = areSameObjects(value2, value1)
              if (!validationResult) {
                newValues.push(value2)
              }
            })
          })
          if (newValues.length) {
            const newRecord = {
              [key]: {
                newValue: newValues,
                previousValue: val1
              }
            }
            recordsToSave.push(newRecord)
          }
          validate = true
        }

        // In case new array is less than old array
        if (val2.length < val1.length && !validate) {
          const newValues = []
          val1.forEach(value1 => {
            val2.forEach(value2 => {
              const validationResult = areSameObjects(value1, value2)
              if (!validationResult) {
                newValues.push(value2)
              }
            })
          })
          if (newValues.length) {
            const newRecord = {
              [key]: {
                newValue: newValues,
                previousValue: val1
              }
            }
            recordsToSave.push(newRecord)
          }
          validate = true
        }

        // In case new array is equal to old array
        if (val1.length === val2.length && !validate) {
          if (_.isEqual()) {
            validate = true
          } else {
            val1.forEach(value1 => {
              val2.forEach(value2 => {
                const validationResult = areSameObjects(value1, value2)
                if (!validationResult) {
                  const newRecord = {
                    [key]: {
                      newValue: value2,
                      previousValue: value1
                    }
                  }
                  recordsToSave.push(newRecord)
                }
              })
            })
            validate = true
          }
        }
      }
    }

    if (val1 !== val2 && !areArrays) {
      const newRecord = {
        [key]: {
          newValue: object2[key],
          previousValue: object1[key]
        }
      }
      recordsToSave.push(newRecord)
    }
  }
  return recordsToSave
}

const isObject = (object) => {
  return object != null && typeof object === 'object'
}

const formatArrayOfObjectsId = (object) => {
  return object.map(element => element.toString())
}

const isArraysObjectsId = (object) => {
  return Array.isArray(object) && object.every(element => isValidObjectId(element))
}

const areSameObjects = (object1, object2) => {
  let keys1 = Object.keys(object1)

  keys1 = keys1.filter(key => !(Object.values(ignoreFields).includes(key)))

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }
  return true
}

const getNewValuesArraysOfOBjectsId = (val1, val2) => {
  const currentValues = formatArrayOfObjectsId(val1)
  const newValues = formatArrayOfObjectsId(val2)
  let validate = false
  const recordsToSave = []

  // In case en la db is 0
  if (!currentValues.length && newValues.length) {
    recordsToSave.push(val2)
    validate = true
  }

  // In case de que por actualizar is 0
  if (currentValues.length && !newValues.length && !validate) {
    validate = true
  }

  // In case both are 0
  if (!currentValues.length && !newValues.length && !validate) {
    validate = true
  }

  // In case new array is greater than old array
  if (newValues.length > currentValues.length && !validate) {
    newValues.forEach((value2, index2) => {
      currentValues.forEach((value1) => {
        const validationResult = value2 === value1
        if (!validationResult) {
          recordsToSave.push(val2[index2])
        }
      })
    })
    validate = true
  }

  // In case new array is less than old array
  if (newValues.length < currentValues.length && !validate) {
    currentValues.forEach(value1 => {
      newValues.forEach((value2, index2) => {
        const validationResult = value1 === value2
        if (!validationResult) {
          recordsToSave.push(val2[index2])
        }
      })
    })
    validate = true
  }

  // In case new array is equal to old array
  if (newValues.length === currentValues.length && !validate) {
    if (_.isEqual(newValues, currentValues)) {
      validate = true
    } else {
      currentValues.forEach(value1 => {
        newValues.forEach((value2, index2) => {
          const validationResult = value1 === value2
          if (!validationResult) {
            recordsToSave.push(val2[index2])
          }
        })
      })
      validate = true
    }
  }

  return recordsToSave
}

module.exports = {
  loggerUpdateRecord,
  loggerCreateRecord
}
