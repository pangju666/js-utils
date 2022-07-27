import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { StringUtils } from "./StringUtils";
import { ArrayUtils } from "./ArrayUtils";
import { ObjectUtils } from "./ObjectUtils";

/**
 * 随机数工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class RandomUtils {
  /**
   * 返回一个随机布尔值
   *
   * @return {} 随机布尔值
   */
  public static nextBoolean(): boolean {
    return this.nextInt(0, 1) === 1;
  }

  /**
   * 返回一个随机布尔值数组
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @return {} 随机布尔值数组
   */
  public static nextBooleanArray(length: number): boolean[] {
    const result = this.nextIntArray(0, 1, length);
    return result.map((item) => item === 1);
  }

  /**
   * 返回指定范围内的随机整数。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机整数
   */
  public static nextInt(startInclusive: number, endExclusive: number): number {
    return Math.floor(this.nextFloat(startInclusive, endExclusive));
  }

  /**
   * 返回指定范围内的随机整数数组。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机整数数组
   */
  public static nextIntArray(
    startInclusive: number,
    endExclusive: number,
    length: number
  ): number[] {
    const result = this.nextFloatArray(startInclusive, endExclusive, length);
    return result.map((item) => Math.floor(item));
  }

  /**
   * 返回指定范围内的随机浮点数。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机浮点数
   */
  public static nextFloat(
    startInclusive: number,
    endExclusive: number
  ): number {
    if (endExclusive < startInclusive) {
      throw new IllegalArgumentError("起始值必须小于或等于结束值。");
    }
    if (startInclusive < 0) {
      throw new IllegalArgumentError("两个范围值都必须为非负数。");
    }

    if (startInclusive === endExclusive) {
      return startInclusive;
    }

    return this.random(startInclusive, endExclusive);
  }

  /**
   * 返回指定范围内的随机浮点数数组。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机整数数组
   */
  public static nextFloatArray(
    startInclusive: number,
    endExclusive: number,
    length: number
  ): number[] {
    if (endExclusive < startInclusive) {
      throw new IllegalArgumentError("起始值必须小于或等于结束值。");
    }
    if (startInclusive < 0) {
      throw new IllegalArgumentError("两个范围值都必须为非负数。");
    }

    if (startInclusive === endExclusive) {
      return ArrayUtils.fill(startInclusive, length);
    }

    return this.randomArray(startInclusive, endExclusive, length);
  }

  /**
   * 返回指定范围内的随机字符串。
   *
   * @param startChar 起始字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param endChar 结束字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param length 字符串长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 startChar 或 endChar 为空、null 或 undefined
   * @throws {RangeError} 如果 startChar 或 endChar 长度大于 1
   * @return {} 随机字符串
   */
  public static nextString(
    startChar: string,
    endChar: string,
    length: number
  ): string {
    if (StringUtils.isEmpty(startChar)) {
      throw new IllegalArgumentError("起始字符范围不可为空。");
    }
    if (StringUtils.isEmpty(endChar)) {
      throw new IllegalArgumentError("结束字符范围不可为空。");
    }

    if (endChar.length > 1 || startChar.length > 1) {
      throw new RangeError("参数长度不可大于1");
    }

    const endCharCode = endChar.charCodeAt(0);
    const startCharCode = startChar.charCodeAt(0);

    if (startCharCode === endCharCode) {
      const charCodes = ArrayUtils.fill(startCharCode, length);
      return String.fromCharCode(...charCodes);
    }

    const charCodes = this.nextIntArray(endCharCode, startCharCode, length);
    return String.fromCharCode(...charCodes);
  }

  private static random(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }

  private static randomArray(
    min: number,
    max: number,
    length: number
  ): number[] {
    if (ObjectUtils.isNull(length) || length <= 0) {
      throw new IllegalArgumentError("数组长度不可小于1");
    }

    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = Math.random() * (max - min + 1) + min;
    }
    return result;
  }
}
