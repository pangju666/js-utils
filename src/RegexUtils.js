export default class RegexUtils {
  static isValid(val, expression) {
    return expression.test(val)
  }
}

RegexUtils.REGEX_EXPRESSION = {
  FLOAT: /^[-+]?[0-9]*\.?[0-9]+$/,
  NUMBER: /^\d+$/
}
