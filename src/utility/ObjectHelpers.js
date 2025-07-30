import _ from 'lodash'
import queryString from 'query-string'
import { ValidateEmail } from './Strings'
import history from './History'
import { PUBLIC_BASE_URL } from '../constants'

const arrEmpty = [null, undefined]

const DEFAULT_VALUE_CONFIG = {
  ifEmpty: null,
}

function clone(obj) {
  return Object.assign({}, obj)
}

function isNullOrUndefined(val) {
  return arrEmpty.indexOf(val) !== -1
}

function getValueByKey(obj, targets, valueIfNull = '') {
  if (isNullOrUndefined(obj)) {
    return valueIfNull
  }
  let targetSplit = targets.split('.')
  let value = null
  for (let target of targetSplit) {
    if (value) {
      value = value[target]
    } else {
      value = obj[target]
    }
    if (isNullOrUndefined(value)) {
      return valueIfNull
    }
  }
  return value
}

function getAllValue(srcObj, config) {
  let arrObj = Object.entries(config)
  let objResult = {}
  for (let i = 0; i < arrObj.length; i++) {
    let item = arrObj[i]
    let [key, value] = item
    value = Object.assign(clone(DEFAULT_VALUE_CONFIG), value)

    objResult[key] = getValueByKey(srcObj, value.getItem, value.ifEmpty)
  }
  return objResult
}

function objToParams(obj) {
  let params = []
  if (obj && typeof obj === 'object') {
    let arrQuery = Object.keys(obj)
    for (let i = 0; i < arrQuery.length; i++) {
      let element = arrQuery[i]
      params.push(`${element}=${obj[element]}`)
    }
  } else {
    throw new Error('obj must be an object, expected ' + typeof obj)
  }
  return encodeURI(params.join('&'))
}

function objToFormData(obj) {
  let arrData = Object.keys(obj)
  let formData = new FormData()
  for (let i = 0; i < arrData.length; i++) {
    let element = arrData[i]
    formData.append(element, obj[element])
  }

  return formData
}

function objValidateData(objData, arrValid) {
  let rayKosong = [null, undefined, '']
  let errors = []
  let strKosong = 'tidak boleh kosong'
  let strAngka = 'harus angka'
  let strEmail = 'harus email'
  let strMax = 'terlalu besar'
  let strMin = 'terlalu kecil'
  let strFix = 'tidak valid'
  let strConfrimPassword = 'tidak sama dengan'

  for (let i = 0; i < arrValid.length; i++) {
    let { element, rules, message } = arrValid[i]
    let {
      msgEmail,
      msgRequired,
      msgNumber,
      msgMax,
      msgMin,
      msgFix,
      msgConfirmPassword,
    } = getAllValue(message, {
      msgEmail: { getItem: 'email', ifEmpty: false },
      msgRequired: { getItem: 'required', ifEmpty: false },
      msgNumber: { getItem: 'number', ifEmpty: false },
      msgMax: { getItem: 'max', ifEmpty: false },
      msgMin: { getItem: 'min', ifEmpty: false },
      msgFix: { getItem: 'fix', ifEmpty: false },
      msgConfirmPassword: { getItem: 'confirm_password', ifEmpty: false },
    })
    let getRule = null
    let paramValid = rules.split(':')
    let objValid = _.cloneDeep(paramValid).map((item) => {
      let result = item
      let cekValue = item.split('=')
      if (cekValue.length > 1) {
        return cekValue[0]
      }
      return result
    })

    if (objValid.length >= 1) {
      if (objValid.indexOf('email') !== -1) {
        if (msgEmail === false) {
          msgEmail = `${element.toTitleCase()} ${strEmail}`
        }
        let validEmail = ValidateEmail(objData[element])
        if (validEmail === false) {
          errors.push({ error: element, message: msgEmail })
        }
      }

      if (objValid.indexOf('number') !== -1) {
        if (msgNumber === false) {
          msgNumber = `${element.toTitleCase()} ${strAngka}`
        }
        let validNumber = !isNaN(objData[element])
        if (validNumber === false) {
          errors.push({ error: element, message: msgNumber })
        }
      }

      if (objValid.indexOf('required') !== -1) {
        if (msgRequired === false) {
          msgRequired = `${element.toTitleCase()} ${strKosong}`
        }
        if (rayKosong.indexOf(objData[element]) !== -1) {
          errors.push({ error: element, message: msgRequired })
        }
      }

      if (objValid.indexOf('max') !== -1) {
        getRule = paramValid[objValid.indexOf('max')]
        getRule = getRule.split('=')
        if (msgMax === false) {
          msgMax = `${element.toTitleCase()} ${strMax}`
        }
        if (Number(objData[element]) > Number(getRule[getRule.length - 1])) {
          errors.push({ error: element, message: msgMax })
        }
      }

      if (objValid.indexOf('min') !== -1) {
        getRule = paramValid[objValid.indexOf('min')]
        getRule = getRule.split('=')
        if (msgMin === false) {
          msgMin = `${element.toTitleCase()} ${strMin}`
        }
        if (Number(objData[element]) < Number(getRule[getRule.length - 1])) {
          errors.push({ error: element, message: msgMin })
        }
      }

      if (objValid.indexOf('fix') !== -1) {
        getRule = paramValid[objValid.indexOf('fix')]
        getRule = getRule.split('=')
        if (msgFix === false) {
          msgFix = `${element.toTitleCase()} ${strFix}`
        }
        if (Number(objData[element]) !== Number(getRule[getRule.length - 1])) {
          errors.push({ error: element, message: msgFix })
        }
      }

      if (objValid.indexOf('confirm_password') !== -1) {
        getRule = paramValid[objValid.indexOf('confirm_password')]
        getRule = getRule.split('=')
        if (msgConfirmPassword === false) {
          msgConfirmPassword = `${element.toTitleCase()} ${strConfrimPassword} ${
            getRule[getRule.length - 1]
          }`
        }
        if (objData[element] !== objData[getRule[getRule.length - 1]]) {
          errors.push({ error: element, message: msgConfirmPassword })
        }
      }
    }
  }
  return errors
}

/**
 * Sebuah function untuk merubah text `"foo=30;bar='hello'"` menjadi
 * ```js
 * {
 *   foo: 30
 *   bar: 'hello'
 * }
 * ```
 */
function settingToObj(arrString) {
  let result = arrString.map((item) => {
    let { value } = item
    let obj = {}
    value = value.split(';')
    for (let i = 0; i < value.length; i++) {
      let rayValue = value[i].split('=')
      switch (rayValue[0]) {
        default:
          obj[rayValue[0]] = rayValue[1]
          break
      }
    }

    item.value = { ...obj }
    return item
  })
  return result
}

function getSettingRule(obj, string, parameter) {
  let resultObj = _.find(obj, (item) => item[parameter] === string)

  if (resultObj && typeof resultObj === 'object') {
    let resultKey = Object.keys(resultObj)[1]
    return `${resultKey}=${resultObj[resultKey]}`
  }
  return ''
}

function objectToArrayFilter(object) {
  let keys = Object.keys(object)
  let arr = []
  for (let i = 0; i < keys.length; i++) {
    let { id, value } = object[keys[i]]
    if (value) {
      arr.push({ id, value })
    }
  }
  return arr
}

function compareSort(a, b, attr) {
  const sortA = a[attr]
  const sortB = b[attr]

  let comparison = 0
  if (sortA > sortB) {
    comparison = 1
  } else if (sortA < sortB) {
    comparison = -1
  }
  return comparison
}

function getQueryParams() {
  // return object
  let path = window.location.href
  path = path.split('?')
  let query = path[path.length - 1]
  return queryString.parse(query)
}

function stringRoute(props) {
  let redirect = ''
  let previousProps = {}
  if (typeof props === 'object' && Object.keys(props).length > 0) {
    ;({ redirect, previousProps } = props)

    redirect = redirect || ''
    previousProps = previousProps || {}
  }
  const { origin } = window.location

  let uri = `${origin}${redirect}`

  // if (process.env.REACT_APP_BUILD_ENV === 'prod') {
  //   uri = `${origin}/sibaruv2/#/${redirect}`
  // }

  return uri
}

export const renderLinkFile = function (props) {
  let fileName = props.fileName
  return `${PUBLIC_BASE_URL}/files/${fileName}`
}

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const ObjectHelpers = {
  getValueByKey,
  getAllValue,
  objToParams,
  objToFormData,
  objValidateData,
  settingToObj,
  getSettingRule,
  objectToArrayFilter,
  compareSort,
  getQueryParams,
  stringRoute,
  renderLinkFile,
  toBase64,
}

export default ObjectHelpers
export {
  getAllValue,
  getValueByKey,
  objToParams,
  objToFormData,
  objValidateData,
  settingToObj,
  getSettingRule,
  objectToArrayFilter,
  compareSort,
  getQueryParams,
  stringRoute,
}
