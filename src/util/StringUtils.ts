/**
 * 字符串工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class StringUtils {
  // 防止实例化
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }

  /**
   * 判断是否为大写字母
   *
   * @param ch 待判断字符
   * @returns {boolean} 为大写字母返回true，否则返回false
   */
  public static isUpperCase(ch: string): boolean {
    const code = ch.charCodeAt(0)
    return code >= 65 && code <= 90
  }

  /**
   * 判断是否为大写字母
   *
   * @param {string} ch 待判断字符
   * @returns {boolean} 为大写字母返回true，否则返回false
   */
  public static isLowerCase(ch: string): boolean {
    const code = ch.charCodeAt(0)
    return code >= 97 && code <= 122
  }

  /**
   * 判断字符串是否为空
   */
  public static isEmpty(str: string): boolean {
    return str === undefined || str === null || str.length === 0
  }

  /**
   * 判断字符串是否不为空
   */
  public static isNotEmpty(str: string): boolean {
    return str !== undefined && str !== null && str.length !== 0
  }

  /**
   * 去除字符串两端的空白，若为空字符串则返回空字符串
   */
  public static trimToEmpty(str: string): string {
    return this.isEmpty(str) ? '' : str.trim()
  }

  /**
   * 去除字符串两端的空白，若为空字符串则返回空值
   */
  public static trimToNull(str: string): string {
    return this.isEmpty(str) ? null : str.trim()
  }

  /**
   * 下划线格式字符串转为小驼峰格式
   */
  public static underLineToCamelCase(str: string): string {
    const strArr = str.split('_')
    for (let i = 1; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }
    return strArr.join('')
  }

  /**
   * 小驼峰格式字符串转下划线格式
   */
  public static camelCaseToUnderLine(str: string): string {
    const newStr = []
    const indexArr = Array.of(0)
    for (let i = 1; i < str.length; i++) {
      if (StringUtils.isUpperCase(str[i])) {
        indexArr.push(i)
      }
    }
    indexArr.forEach((value, index) => {
      newStr.push(str.charAt(value).toLowerCase() + str.substring(value + 1, indexArr[index + 1]))
    })
    return newStr.join('_')
  }
}
