import StringUtils from './StringUtils';
import ObjectUtils from './ObjectUtils';

/**
 * 对象转换工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class ConvertUtils {
  /**
   * 转换对象属性名称
   *
   * @param object 待转换对象
   * @param convertFunc 转换对象属性名称回调，定义了如何转换属性名称，参数为属性名称
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等非自定义类型
   * @return {} 转换后的新对象
   */

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static convertObjectPropertyName(object: object, convertFunc: (propertyName)=> string,
                                          // eslint-disable-next-line @typescript-eslint/ban-types
                                          excludeTypes: Function[] = []): object {
    if (ObjectUtils.isNotNull(object)) {
      // 判断是否为数组
      if (Array.isArray(object)) {
        return object.map(curVal => {
          // 判断是否为基础类型或需排除类型
          if (ObjectUtils.isBasicType(curVal) || ObjectUtils.isAnyType(curVal, excludeTypes)) {
            return curVal
          }
          // 执行转换操作
          return this.convertObjectPropertyName(curVal, convertFunc, excludeTypes)
        })
      }
      // 不为数组则直接执行对象转换
      const newObj = {}
      // 遍历属性名称
      Object.keys(object).forEach(propertyName => {
        const newPropertyName = convertFunc(propertyName)
        const val = object[propertyName]
        // 判断是否为基础类型或需排除类型
        if (ObjectUtils.isBasicType(val) || ObjectUtils.isAnyType(val, excludeTypes)) {
          newObj[newPropertyName] = val
        } else {
          newObj[newPropertyName] = this.convertObjectPropertyName(val, convertFunc, excludeTypes)
        }
      })
      return newObj
    }
    return null
  }

  /**
   * 对象属性名称转驼峰
   *
   * @param object 待转换对象
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等系统类型
   * @return {} 转换后的对象
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static propertyNamesToCamlCase(object: object, excludeTypes?: Function[]): object {
    return this.convertObjectPropertyName(object,
        propertyName => StringUtils.underLineToCamelCase(propertyName), excludeTypes)
  }

  /**
   * 对象属性名称转下划线
   *
   * @param object 待转换对象
   * @param excludeTypes 转换时需要排除的对象类型，如File, Blob, Date 等非自定义类型
   * @return {} 转换后的对象
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static propertyNamesToUnderLine(object: object, excludeTypes?: Function[]): object {
    return this.convertObjectPropertyName(object,
        propertyName => StringUtils.camelCaseToUnderLine(propertyName), excludeTypes)
  }

  // 防止实例化
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
