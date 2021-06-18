import StringUtils from '@/utils/StringUtils'
import RegexUtils from '@/utils/RegexUtils'

export default class NumberUtils {
  static isFloat(val) {
    return RegexUtils.isValid(val, RegexUtils.REGEX_EXPRESSION.FLOAT)
  }

  static isInteger(val) {
    return RegexUtils.isValid(val, RegexUtils.REGEX_EXPRESSION.NUMBER)
    /*    if (ObjectUtils.isString(val)) {
      return Number.isNaN(Number.parseInt(val, 10))
    }
    return Number.isInteger(val) */
  }

  static isNumber(val) {
    return this.isFloat(val) || this.isInteger(val)
  }

  static formatAsCurrency(valStr) {
    if (StringUtils.isNotEmpty(valStr)) {
      return Number.parseFloat(valStr).toLocaleString('zh-cn', { style: 'currency', currency: 'CNY' })
    }
    return ''
  }
}
