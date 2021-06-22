import ObjectUtils from './ObjectUtils'
import dateformat from 'dateformat'

/**
 * 日期工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class DateUtils {
  // 防止实例化
  protected constructor() {
  }

  /**
   * 日期转为时间戳
   *
   * @param date 日期
   * @return {number} 时间戳
   */
  static dateToTimestamp(date: Date): number {
    if (ObjectUtils.isDate(date)) {
      const time = new Date(date)
      return time.getTime()
    }
  }

  /**
   * 时间戳转为日期
   *
   * @param timestamp 时间戳，可接受字符串形式时间戳
   * @return {Date} 解析出的日期对象
   */
  static timestampToDate(timestamp: number | string): Date {
    let timeStampVal = timestamp
    if (typeof timestamp === 'string') {
      timeStampVal = parseInt(timestamp, 10);
    }
    return new Date(timeStampVal)
  }

  /**
   * 时间格式化
   *
   * @param {any} date 日期
   * @param formatStr 格式化字符串
   * @return {string} 格式化后的时间字符串
   */
  static dateFormat(date: Date | number, formatStr = 'yyyy-mm-dd'): string {
    if (ObjectUtils.isNull(date)) {
      return ''
    }
    return dateformat(new Date(date), formatStr)
  }
}
