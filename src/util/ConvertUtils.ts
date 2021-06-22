import StringUtils from './StringUtils';
import ObjectUtils from './ObjectUtils';

/**
 * 对象转换工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class ConvertUtils {
  // 防止实例化
  protected constructor() {
  }

  /**
   * 转换对象属性名称
   *
   * @param object 待转换对象
   * @param convertFunc 转换对象属性名称回调，定义了如何转换属性名称，参数为属性名称
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等非自定义类型
   * @return {Object} 转换后的新对象
   */
  public static convertObjectPropertyName(object: object, excludeTypes: any[], convertFunc: (propertyName)=> string): object {
    if (ObjectUtils.isNotNull(object)) {
      // 判断是否为数组
      if (Array.isArray(object)) {
        return object.map(curVal => {
          if (ObjectUtils.isObject(curVal)) {
            for (let filterType of excludeTypes) {
              if (curVal instanceof filterType) {
                return curVal
              }
            }
          }
          return this.convertObjectPropertyName(curVal, excludeTypes, convertFunc)
        })
      }
      // 不为数组则执行对象转换
      const newObj = {}
      Object.keys(object).forEach(propertyName => {
        let val = object[propertyName]
        if (ObjectUtils.isObject(val)) {
          let isExclude = false
          for (let filterType of excludeTypes) {
            if (val instanceof filterType) {
              isExclude = true
              break
            }
          }
          if (!isExclude) {
            val = this.convertObjectPropertyName(val, excludeTypes, convertFunc)
          }
        }
        const newPropertyName = convertFunc(propertyName)
        newObj[newPropertyName] = val
      })
      return newObj
    }
    return null
  }

  /**
   * 对象属性名称转驼峰
   *
   * @param object 待转换对象
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等非自定义类型
   * @return {Object} 转换后的对象
   */
  public static propertyNamesToCamlCase(object: object, excludeTypes: any[] = [File, Blob, Date]) {
    return this.convertObjectPropertyName(object, excludeTypes,
        propertyName => StringUtils.underLineToCamelCase(propertyName))
  }

  /**
   * 对象属性名称转下划线
   *
   * @param object 待转换对象
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等非自定义类型
   * @return {Object} 转换后的对象
   */
  public static propertyNamesToUnderLine(object: object, excludeTypes: any[] = [File, Blob, Date]) {
    return this.convertObjectPropertyName(object, excludeTypes,
        propertyName => StringUtils.camelCaseToUnderLine(propertyName))
  }
}
