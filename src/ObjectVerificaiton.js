/**
 * 判断变量是否合法
 *
 * @param {Array} values 待验证变量数组
 * @returns {boolean} 合法则返回true 否则为false
 */
export function isValuesValid (...values) {
  for (let val of values) {
    if (!isValueValid(val)) {
      return false
    }
  }
  return true
}

/**
 * 判断变量是否合法
 *
 * @param {any} value 待验证变量
 * @returns {boolean} 合法则返回true 否则为false
 */
export function isValueValid (value) {
  return value !== undefined && value !== null && value !== ''
}

export default isValueValid
