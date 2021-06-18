/**
 * 对象工具类，包含常用对象处理函数
 */
export default class ObjectUtils {
  /**
   * 安全取值，如果取值条件不成立则返回默认值
   *
   * @param {any} value
   * @param {any} defaultVal 默认值
   * @param condition{Function} 取值条件，如果不传入则默认为判断值是否为空值
   * @return {any}
   */
  static getSafeValue(value, defaultVal, condition = ObjectUtils.isNotNull) {
    return condition(value) ? value : defaultVal
  }

  static getSafePropertyValue(value, defaultVal, ...propertyNames) {
    if (ObjectUtils.isNotNullPropertyValue(value, propertyNames)) {
      let valueCopy = { ...value }
      let propertyName
      for (propertyName of propertyNames) {
        valueCopy = valueCopy[propertyName]
      }
      return this.getSafeValue(valueCopy, defaultVal)
    }
    return defaultVal
  }

  static getSafeObj(object, defaultObject = {}) {
    const propertyDefaultValMap = new Map(Object.entries(defaultObject))
    return this.getSafeObjByMap(object, propertyDefaultValMap)
  }

  static getSafeObjByMap(object, propertyDefaultValMap = new Map()) {
    const objectCopy = { ...object }
    const propertyNames = Object.getOwnPropertyNames(objectCopy)
    let propertyName
    for (propertyName of propertyNames) {
      if (objectCopy[propertyName] === null) {
        if (propertyDefaultValMap.has(propertyName)) {
          objectCopy[propertyName] = propertyDefaultValMap.get(propertyName)
        } else {
          objectCopy[propertyName] = ''
        }
      } else if (ObjectUtils.isObject(objectCopy[propertyName])) {
        if (propertyDefaultValMap.has(propertyName)) {
          const defaultObj = propertyDefaultValMap.get(propertyName)
          const defaultValMap = new Map()
          Object.getOwnPropertyNames(defaultObj).forEach(valueName => {
            defaultValMap.set(valueName, defaultObj[valueName])
          })
          objectCopy[propertyName] = this.getSafeObjByMap(objectCopy[propertyName], defaultValMap)
        }
      }
    }
    return objectCopy
  }

  /**
   * 值是否存在
   */
  static isExist(value) {
    return value !== undefined
  }

  static isExistPropertyValue(object, ...propertyNames) {
    if (ObjectUtils.isNotExist(object)) {
      return false
    }
    let propertyName
    for (propertyName of propertyNames) {
      if (ObjectUtils.isNotExist(object[propertyName])) {
        return false
      }
    }
    return true
  }

  /**
   * 值是否不存在
   */
  static isNotExist(value) {
    return value === undefined
  }

  /**
   * 判断对象是否不为空
   *
   * @param {any} value
   * @return {boolean}
   */
  static isNotNull(value) {
    return value !== undefined && value !== null
  }

  /**
   * 判断对象是否为空
   *
   * @param {any} value
   * @return {boolean}
   */
  static isNull(value) {
    return value === undefined || value === null
  }

  static isNotNullPropertyValue(object, ...propertyNames) {
    if (ObjectUtils.isNull(object)) {
      return false
    }
    let objectCopy = { ...object }
    let propertyName
    for (propertyName of propertyNames) {
      if (ObjectUtils.isNull(objectCopy[propertyName])) {
        console.log(propertyNames)
        return false
      }
      objectCopy = objectCopy[propertyName]
    }
    return true
  }

  /**
   * 判断对象是否为字符串
   *
   * @param {any} value
   * @return {boolean}
   */
  static isString(value) {
    return value instanceof String || typeof value === 'string'
  }

  /**
   * 判断对象是否为数字
   *
   * @param {any} value
   * @return {boolean}
   */
  static isNumber(value) {
    return value instanceof Number || typeof value === 'number'
  }

  /**
   * 判断对象是否为对象
   *
   * @param {any} value
   * @return {boolean}
   */
  static isObject(value) {
    return value instanceof Object || typeof value === 'object'
  }

  /**
   * 判断对象是否为布尔值
   *
   * @param {any} value
   * @return {boolean}
   */
  static isBoolean(value) {
    return value instanceof Boolean || typeof value === 'boolean'
  }

  /**
   * 判断对象是否为数组
   *
   * @param {any} value
   * @return {boolean}
   */
  static isArray(value) {
    return Array.isArray(value)
  }

  /**
   * 判断对象是否为正则表达式
   *
   * @param {any} value
   * @return {boolean}
   */
  static isRegExp(value) {
    return value instanceof RegExp
  }

  /**
   * 判断对象是否为日期
   *
   * @param {any} value
   * @return {boolean}
   */
  static isDate(value) {
    return value instanceof Date || new Date(value) !== undefined
  }

  /**
   * 判断对象是否为函数
   *
   * @param {any} value
   * @return {boolean}
   */
  static isFunction(value) {
    return value instanceof Function || typeof value === 'function'
  }
}
