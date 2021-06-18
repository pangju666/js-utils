/**
 * 字符串工具类
 */
export default class StringUtils {
  /**
   * 下划线转驼峰
   *
   * @param {string} str 待转换字符串
   * @returns {string} 转换成功后的字符串，返回新字符串
   */
  static underLineToCamelCase(str) {
    const strArr = str.split('_')
    for (let i = 1; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }
    return strArr.join('')
  }

  /**
   * 驼峰转下划线
   *
   * @param {string} str 待转换字符串
   * @returns {string} 转换成功后的字符串，返回新字符串
   */
  static camelCaseToUnderLine(str) {
    const newStr = Array.of()
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

  /**
   * 判断是否为大写字母
   *
   * @param {string} ch 待判断字符
   * @returns {boolean} 为大写字母返回true，否则返回false
   */
  static isUpperCase(ch) {
    const code = ch.charCodeAt(0)
    return code >= 65 && code <= 90
  }

  /**
   * 判断是否为大写字母
   *
   * @param {string} ch 待判断字符
   * @returns {boolean} 为大写字母返回true，否则返回false
   */
  static isLowerCase(ch) {
    const code = ch.charCodeAt(0)
    return code >= 97 && code <= 122
  }

  /**
   * 去除字符串两端的空白，若为空字符串则返回空字符串
   *
   * @param {string} val
   * @return {string}
   */
  static trimToEmpty(val) {
    return this.isEmpty(val) ? '' : val.trim()
  }

  /**
   * 去除字符串两端的空白，若为空字符串则返回空
   *
   * @param {string} val
   * @return {string}
   */
  static trimToNull(val) {
    return this.isEmpty(val) ? null : val.trim()
  }

  /**
   * 判断字符串是否为空
   *
   * @param {string} str
   * @return {boolean}
   */
  static isEmpty(str) {
    return str === undefined || str === null || str.length === 0
  }

  /**
   * 判断字符串是否不为空
   *
   * @param {string} str
   * @return {boolean}
   */
  static isNotEmpty(str) {
    return str !== undefined && str !== null && str.length !== 0
  }
}
