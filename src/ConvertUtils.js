import Config from '@/config'
import StringUtils from '@/utils/StringUtils'
import ObjectUtils from '@/utils/ObjectUtils'

function isFilterType(val) {
  let filterType
  for (filterType of Config.wrapFilterTypes) {
    if (val instanceof filterType) {
      return true
    }
  }
  return false
}

export default class ConvertUtils {
  /**
   * 转换对象属性名称回调
   *
   * @callback convertCallback
   * @param {string} propertyName 对象属性名称
   */
  /**
   * 转换对象属性名称
   *
   * @param obj{Object} 待转换对象
   * @param convertFunc{convertCallback} 转换对象属性名称回调，定义了如何转换属性名称，参数为属性名称
   * @returns {Object} 转换后的新对象
   */
  static convertObjectPropertyName(obj, convertFunc) {
    if (ObjectUtils.isNotNull(obj)) {
      if (Array.isArray(obj)) {
        const newArr = []
        obj.forEach(item => {
          if (!isFilterType(item) && ObjectUtils.isObject(item)) {
            newArr.push(this.convertObjectPropertyName(item, convertFunc))
          } else {
            newArr.push(item)
          }
        })
        return newArr
      }
      const newObj = {}
      const propertyNames = Object.keys(obj)
      propertyNames.forEach(propertyName => {
        let val = obj[propertyName]
        if (!isFilterType(val) && ObjectUtils.isObject(val)) {
          val = this.convertObjectPropertyName(val, convertFunc)
        }
        const newPropertyName = convertFunc(propertyName)
        newObj[newPropertyName] = val
      })
      return newObj
    }
    return obj
  }

  /**
   * 对象属性名称转驼峰
   *
   * @param {Object} obj 待转换对象
   * @returns {Object} 转换后的对象
   */
  static propertyNamesToCamlCase(obj) {
    return this.convertObjectPropertyName(obj, propertyName => StringUtils.underLineToCamelCase(propertyName))
  }

  /**
   * 对象属性名称转下划线
   *
   * @param {Object} obj 待转换对象
   * @returns {Object} 转换后的对象
   */
  static propertyNamesToUnderLine(obj) {
    return this.convertObjectPropertyName(obj, propertyName => StringUtils.camelCaseToUnderLine(propertyName))
  }
}
