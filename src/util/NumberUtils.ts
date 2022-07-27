import { ObjectUtils } from "./ObjectUtils";
import { IllegalArgumentError } from "../error/IllegalArgumentError";

/**
 * 数字工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class NumberUtils {
  /**
   * <p>将字符串转换为整数，如果转换失败则返回默认值。</p>
   *
   * <p>如果字符串为 null 或 undefined，则返回默认值。</p>
   *
   * <pre>
   *   NumberUtils.toInt(null, 1) = 1
   *   NumberUtils.toInt("", 1)   = 1
   *   NumberUtils.toInt("1", 0)  = 1
   * </pre>
   *
   * @param str 要转换的字符串，可能为 null 或 undefined
   * @param defaultValue 默认值
   * @param radix 数字进制
   * @return {} 由字符串表示的数字，如果转换失败，则为默认值
   */
  public static toInt(str: string, defaultValue = 0, radix = 10): number {
    if (ObjectUtils.isNull(str)) {
      return defaultValue;
    }
    const value = Number.parseInt(str, radix);
    if (Number.isNaN(value)) {
      return defaultValue;
    }
    return value;
  }

  /**
   * <p>将字符串转换为浮点数，如果转换失败则返回默认值。</p>
   *
   * <p>如果字符串为 null 或 undefined，则返回默认值。</p>
   *
   * <pre>
   *   NumberUtils.toFloat(null, 1.1f)   = 1.0f
   *   NumberUtils.toFloat("", 1.1f)     = 1.1f
   *   NumberUtils.toFloat("1.5", 0.0f)  = 1.5f
   * </pre>
   *
   * @param str 要转换的字符串，可能为 null 或 undefined
   * @param defaultValue 默认值
   * @return 由字符串表示的浮点数，如果转换失败则为 defaultValue
   */
  public static toFloat(str: string, defaultValue = 0.0): number {
    if (ObjectUtils.isNull(str)) {
      return defaultValue;
    }
    const value = Number.parseFloat(str);
    if (Number.isNaN(value)) {
      return defaultValue;
    }
    return value;
  }

  /**
   * 返回数组中的最小值。
   *
   * @param array 一个数组，不能为 null 或为空
   * @return {number} 数组中的最小值
   * @throws {IllegalArgumentError} 如果数组为空、null 或 undefined
   */
  public static min(...array: number[]): number {
    this.validateArray(array);

    let min = array[0];
    for (let j = 1; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
      }
    }

    return min;
  }

  /**
   * 返回数组中的最大值。
   *
   * @param array 一个数组，不能为 null 或为空
   * @return {number} 数组中的最大值
   * @throws {IllegalArgumentError} 如果数组为空、null 或 undefined
   */
  public static max(...array: number[]): number {
    this.validateArray(array);

    let min = array[0];
    for (let j = 1; j < array.length; j++) {
      if (array[j] > min) {
        min = array[j];
      }
    }

    return min;
  }

  private static validateArray(array: number[]): void {
    if (ObjectUtils.isNull(array)) {
      throw new IllegalArgumentError("参数不能为null");
    }
    if (array.length === 0) {
      throw new IllegalArgumentError("数组不能为空");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
