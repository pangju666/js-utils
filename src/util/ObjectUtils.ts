/**
 * 对象工具类，包含常用对象处理函数
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class ObjectUtils {
  // 防止实例化
  protected constructor() {
  }

  /**
   * 值是否存在
   */
  public static isExist(value: any): boolean {
    return value !== undefined
  }

  /**
   * 值是否不存在
   */
  public static isNotExist(value: any): boolean {
    return value === undefined
  }

  /**
   * 判断对象是否不为空
   */
  public static isNotNull(value: any): boolean {
    return value !== undefined && value !== null
  }

  /**
   * 判断对象是否为空
   */
  public static isNull(value: any): boolean {
    return value === undefined || value === null
  }

  /**
   * 判断对象属性值是否存在
   *
   * @param object 待判断对象
   * @param propertyExpression 属性表达式
   */
  public static isExistProperty(object: object, propertyExpression: string): boolean {
    if (ObjectUtils.isNotExist(object)) {
      return false
    }
    let propertyVal
    for (const propertyName of propertyExpression.split('.')) {
      propertyVal = object[propertyName]
      if (ObjectUtils.isNotExist(propertyVal)) {
        return false
      }
    }
    return true
  }

  /**
   * 判断对象属性值是否不存在
   *
   * @param object 待判断对象
   * @param propertyExpression 属性表达式
   */
  public static isNotExistProperty(object: object, propertyExpression: string): boolean {
    return !this.isExistProperty(object, propertyExpression)
  }

  /**
   * 判断对象属性值是否为空
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * // return true
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: null}}
   * // return false
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: undefined}
   * // return false
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test');
   *
   * @example
   * const obj = {test: {}}
   * // return false
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: undefined}}
   * // return false
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test.demo');
   *
   * @param object 待验证对象
   * @param expression 获取属性表达式
   * @return{boolean} 对象属性为空则返回false, 否则返回true
   */
  public static isNotNullProperty(object: object, expression: string): boolean {
    if (ObjectUtils.isNull(object)) {
      return false
    }

    let objectCopy = object
    const propertyNames = expression.split('.')
    for (const propertyName of propertyNames) {
      if (ObjectUtils.isNull(objectCopy[propertyName])) {
        return false
      }
      objectCopy = objectCopy[propertyName]
    }
    return true
  }

  /**
   * 判断对象属性值是否为空
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * // return false
   * ObjectUtils.isNotNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: null}}
   * // return true
   * ObjectUtils.isNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: undefined}
   * // return true
   * ObjectUtils.isNullPropertyValue(obj, '', 'test');
   *
   * @example
   * const obj = {test: {}}
   * // return true
   * ObjectUtils.isNullPropertyValue(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: undefined}}
   * // return true
   * ObjectUtils.isNullPropertyValue(obj, '', 'test.demo');
   *
   * @param object 待验证对象
   * @param expression 获取属性表达式
   * @return{boolean} 对象属性为空则返回true, 否则返回false
   */
  public static isNullProperty(object: object, expression: string): boolean {
    return !this.isNotNullProperty(object, expression)
  }

  /**
   * 安全取值，如果取值条件不成立则返回默认值
   *
   * @example
   * const val = 'success'
   * // return 'success'
   * ObjectUtils.getSafeValue(val, '');
   *
   * @example
   * const val = null
   * // return ''
   * ObjectUtils.getSafeValue(val, '');
   *
   * @example
   * const val = undefined
   * // return ''
   * ObjectUtils.getSafeValue(val, '');
   *
   * @param value 待取值变量
   * @param defaultVal 变量默认值
   * @param condition 取值条件，如果不传入则默认为判断值是否为空值
   * @return{T} 条件成立则返回此变量，否则返回默认值
   */
  public static getSafeValue<T>(value: T, defaultVal: T, condition = ObjectUtils.isNotNull) : T {
    return condition(value) ? value : defaultVal
  }

  /**
   * 安全获取对象属性值，如果属性不存在或为空则返回默认值
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * // return 'success'
   * ObjectUtils.getSafeProperty(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: null}}
   * // return ''
   * ObjectUtils.getSafeProperty(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: undefined}
   * // return ''
   * ObjectUtils.getSafeProperty(obj, '', 'test.key');
   *
   * @example
   * const obj = {test: {key: null}}
   * // return ''
   * ObjectUtils.getSafeProperty(obj, '', 'test.demo');
   *
   * @param object 待取值属性
   * @param defaultVal 属性默认值
   * @param expression 获取属性表达式
   * @return{any} 对象属性值或默认值
   */
  public static getSafeProperty(object: object, defaultVal: any, expression: string): any {
    if (ObjectUtils.isNullProperty(object, expression)) {
      return defaultVal
    }
    let objectCopy = object
    const propertyNames = expression.split('.')
    for (const propertyName of propertyNames) {
      objectCopy = objectCopy[propertyName]
    }
    return this.getSafeValue(objectCopy, defaultVal)
  }

  /**
   * 安全获取对象，将对象中为空或未定义的属性，使用默认对象中对应的属性值进行替换
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * const defaultObj = {test: {key: '', key2: ''}}
   * // return {test: {key: 'success', key2: ''}}
   * ObjectUtils.getSafeObject(obj, defaultObj);
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * const defaultObj = {test: {key: null, key2: 'demo'}}
   * // return {test: {key: 'success', key2: 'demo'}}
   * ObjectUtils.getSafeObject(obj, defaultObj);
   *
   * @example
   * const obj = {test: {key: 'success'}}
   * const defaultObj = {test: {key2: 'demo'}}
   * // return {test: {key: 'success', key2: 'demo'}}
   * ObjectUtils.getSafeObject(obj, defaultObj);
   *
   * @example
   * const obj = {test: {key: null}}
   * const defaultObj = {test: {key2: 'demo'}}
   * // return {test: {key: '', key2: 'demo'}}
   * ObjectUtils.getSafeObject(obj, defaultObj);
   *
   * @param object 待获取对象
   * @param defaultObject 默认对象
   * @return{object} 对象为空时会直接返回默认对象，否则进行安全获取操作
   */
  public static getSafeObject(object: object, defaultObject: object = {}): object {
    const propertyDefaultValMap = new Map(Object.entries(defaultObject))
    const objectCopy = { ...object }
    const propertyNames = Object.getOwnPropertyNames(objectCopy)
    for (let propertyName of propertyNames) {
      if (ObjectUtils.isNull(objectCopy[propertyName])) {
        if (propertyDefaultValMap.has(propertyName)) {
          objectCopy[propertyName] = propertyDefaultValMap.get(propertyName)
        } else {
          objectCopy[propertyName] = ''
        }
      } else if (ObjectUtils.isObject(objectCopy[propertyName])) {
        if (propertyDefaultValMap.has(propertyName)) {
          const defaultObj = propertyDefaultValMap.get(propertyName)
          objectCopy[propertyName] = this.getSafeObject(objectCopy[propertyName], defaultObj)
        }
      }
    }
    return objectCopy
  }

  /**
   * 深度拷贝目标对象
   *
   * @param object 待拷贝对象
   */
  public static deepClone(object: object) {
    const newObject = {}
    for (const propertyName of Object.getOwnPropertyNames(object)) {
      const propertyValue = object[propertyName]
      if (this.isObject(propertyValue)) {
        newObject[propertyName] = this.deepClone(object[propertyName])
      } else {
        newObject[propertyName] = object[propertyName]
      }
    }
    return newObject
  }

  /**
   * 判断值是否为字符串
   */
  public static isString(value: any): boolean {
    return value instanceof String || typeof value === 'string'
  }

  /**
   * 判断对象是否为数字
   */
  public static isNumber(value: any): boolean {
    return value instanceof Number || typeof value === 'number'
  }

  /**
   * 判断对象是否为对象
   */
  public static isObject(value: any): boolean {
    return value instanceof Object || typeof value === 'object'
  }

  /**
   * 判断对象是否为布尔值
   */
  public static isBoolean(value: any): boolean {
    return value instanceof Boolean || typeof value === 'boolean'
  }

  /**
   * 判断对象是否为数组
   */
  public static isArray(value: any): boolean {
    return Array.isArray(value)
  }

  /**
   * 判断对象是否为正则表达式
   */
  public static isRegExp(value: any): boolean {
    return value instanceof RegExp
  }

  /**
   * 判断对象是否为日期
   */
  public static isDate(value: any): boolean {
    return value instanceof Date || new Date(value) !== undefined
  }

  /**
   * 判断对象是否为函数
   */
  public static isFunction(value: any): boolean {
    return value instanceof Function || typeof value === 'function'
  }
}
