import ObjectUtils from "./ObjectUtils";

export default class NumberUtils {
  /**
   * 生成随机整数
   *
   * @param min 最小取值，必须大于0
   * @param max 最大取值，必须大于0
   */
  public static randomInteger(min: number, max?: number): number {
    if (ObjectUtils.isNull(max)) {
      return Math.floor(Math.random() * (min + 1));
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 进制转换
   *
   * @param number 带转换数字
   * @param radix 转化基数
   */
  public static convertBase(number: number, radix: number): number;
  public static convertBase(number: string, radix: number): number;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static convertBase(number, radix): number {
    if (typeof number === 'string') {
      return parseInt(number, radix)
    }
    return parseInt(String(number), radix)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
