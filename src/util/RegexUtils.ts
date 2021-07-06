/**
 * 正则工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export class RegexUtils {
  public static readonly REGEX_EXPRESSION = {
    FLOAT: /^[-+]?[0-9]*\.?[0-9]+$/,
    NUMBER: /^\d+$/
  }

  public static isValid(str: string, expression: RegExp): boolean {
    return expression.test(str)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
