import { ObjectUtils } from "./ObjectUtils";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { ParseError } from "../error/ParseError";
import * as dateFns from "date-fns";

/**
 * 日期工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class DateUtils {
  /**
   * 判断是否为日期对象
   *
   * @param value 待判断的值
   * @return {} 如果为合法的日期对象则返回 true，否则为 false
   */
  public static isDate(value?: unknown): boolean {
    return dateFns.isDate(value);
  }

  /**
   * <p>检查两个日期对象是否在同一天（忽略时间）。</p>
   *
   * <p>2002 年 3 月 28 日 13:45 和 2002 年 3 月 28 日 06:01 将返回 true。
   * 2002 年 3 月 28 日 13:45 和 2002 年 3 月 12 日 13:45 将返回 false。
   * </p>
   *
   * @param date1 第一个日期，未更改，不能为 null 或 undefined
   * @param date2 第二个日期，未更改，不能为 null 或 undefined
   * @return 如果它们代表同一天，则为 true
   * @throws {IllegalArgumentError} 如果任一日期为 null 或 undefined
   */
  public static isSameDay(date1: Date | number, date2: Date | number): boolean {
    if (ObjectUtils.anyNull(date1, date2)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return (
      dateFns.getYear(date1) === dateFns.getYear(date2) &&
      dateFns.getDayOfYear(date1) === dateFns.getDayOfYear(date2)
    );
  }

  /**
   * <p>检查两个日期对象是否代表同一时刻。</p>
   *
   * <p>此方法比较两个日期对象的毫秒时间戳。</p>
   *
   * @param date1 第一个日期，未更改，不能为 null 或 undefined
   * @param date2 第二个日期，未更改，不能为 null 或 undefined
   * @return {} 如果它们代表相同的毫秒时间戳，则为 true
   * @throws {IllegalArgumentError} 如果任一日期为 null 或 undefined
   * @since 2.1
   */
  public static isSameInstant(
    date1: Date | number,
    date2: Date | number
  ): boolean {
    if (ObjectUtils.anyNull(date1, date2)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.getTime(date1) === dateFns.getTime(date2);
  }

  /**
   * <p>通过尝试各种不同的解析表达式来解析表示日期的字符串。</p>
   *
   * <p>解析将依次尝试每个解析模式。仅当解析整个输入字符串时，解析才被视为成功。
   * 如果没有匹配的解析模式，则抛出{@link ParseError}。</p>
   *
   * @param str 要解析的日期字符串，不能为空、null 或 undefined
   * @param parsePatterns 要使用的日期格式模式，请参阅{@link https://date-fns.org/v2.28.0/docs/parse dateFns文档}，不能为空、null 或 undefined
   * @return {} 解析出的日期对象
   * @throws {IllegalArgumentError} 如果日期字符串为空、null 或 undefined
   * @throws {ParseError} 如果没有合适的日期解析模式或解析表达式为空、null 或 undefined
   */
  public static parseDate(str: string, ...parsePatterns: string[]): Date {
    if (ObjectUtils.anyNull(str, parsePatterns)) {
      throw new IllegalArgumentError("日期和解析表达式不能为空");
    }

    for (const parsePattern of parsePatterns) {
      try {
        return dateFns.parse(str, parsePattern, new Date());
      } catch (e) {
        // 空处理
      }
    }
    throw new ParseError("无法解析日期: " + str);
  }

  /**
   * 将指定的年份数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addYears(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addYears(date, Math.floor(amount));
  }

  /**
   * 将指定的季度数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addQuarters(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addQuarters(date, Math.floor(amount));
  }

  /**
   * 将指定的月份数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addMonths(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addMonths(date, Math.floor(amount));
  }

  /**
   * 将指定的周数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addWeeks(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addWeeks(date, Math.floor(amount));
  }

  /**
   * 将指定的工作日数（忽略周六、周日）添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addBusinessDays(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addBusinessDays(date, Math.floor(amount));
  }

  /**
   * 将指定的天数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addDays(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addDays(date, Math.floor(amount));
  }

  /**
   * 将指定的小时数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addHours(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addHours(date, Math.floor(amount));
  }

  /**
   * 将指定的分钟数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addMinutes(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addMinutes(date, Math.floor(amount));
  }

  /**
   * 将指定的秒数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addSeconds(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addSeconds(date, Math.floor(amount));
  }

  /**
   * 将指定的毫秒数添加到返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param amount 要添加的数量，可能为负数
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static addMilliseconds(date: Date | number, amount: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.addMilliseconds(date, Math.floor(amount));
  }

  /**
   * 将指定的年份设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param year 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setYear(date: Date | number, year: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setYear(date, Math.floor(year));
  }

  /**
   * 将指定的季度设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param quarter 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setQuarter(date: Date | number, quarter: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setQuarter(date, Math.floor(quarter));
  }

  /**
   * 将指定的月份设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param month 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setMonth(date: Date | number, month: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setMonth(date, Math.floor(month));
  }

  /**
   * 将指定的天数设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param day 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setDay(date: Date | number, day: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setDay(date, Math.floor(day));
  }

  /**
   * 将指定的小时数设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param hour 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setHours(date: Date | number, hour: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setHours(date, Math.floor(hour));
  }

  /**
   * 将指定的分钟数设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param minutes 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setMinutes(date: Date | number, minutes: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setMinutes(date, Math.floor(minutes));
  }

  /**
   * 将指定的秒数设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param seconds 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setSeconds(date: Date | number, seconds: number): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setSeconds(date, Math.floor(seconds));
  }

  /**
   * 将指定的毫秒数设置为返回新对象的日期。原来的 Date 没有改变。
   *
   * @param date 日期，不能为 null 或 undefined
   * @param milliseconds 要设置的数量
   * @return {} 新日期
   * @throws {IllegalArgumentError} 如果日期为 null 或 undefined
   */
  public static setMilliseconds(
    date: Date | number,
    milliseconds: number
  ): Date {
    if (ObjectUtils.isNull(date)) {
      throw new IllegalArgumentError("日期不能为空");
    }
    return dateFns.setMilliseconds(date, Math.floor(milliseconds));
  }

  /**
   * 将时间戳转为日期
   *
   * @param timestamp 时间戳，可接受字符串形式时间戳
   * @return {} 返回的新日期对象
   * @throws {IllegalArgumentError} 如果时间戳字符串无法解析为数字格式
   */
  public static toDate(timestamp: number | string): Date {
    let timestampVal = timestamp;
    if (typeof timestamp === "string") {
      timestampVal = parseInt(timestamp, 10);
      if (Number.isNaN(timestampVal)) {
        throw new IllegalArgumentError("时间戳格式不正确");
      }
    }
    return dateFns.toDate(timestampVal as number);
  }

  /**
   * 返回日期函数包，等价于：
   * <p> import * as dateFns from "date-fns"; </p>
   */
  public static dateFns(): unknown {
    return dateFns;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
