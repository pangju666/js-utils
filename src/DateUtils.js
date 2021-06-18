import ObjectUtils from '@/utils/ObjectUtils'
import dateformat from 'dateformat'

/**
 * 日期工具类
 */
export default class DateUtils {
  /**
   * 日期转为时间戳
   *
   * @param {any} date 日期
   * @return {number} 时间戳
   */
  static dateToTimestamp(date) {
    if (ObjectUtils.isDate(date)) {
      const time = new Date(date)
      return time.getTime()
    }
  }

  static timestampToDate(timestamp) {
    let timeStampVal = timestamp
    if (ObjectUtils.isString(timestamp)) {
      timeStampVal = parseInt(timestamp, 10)
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
  static dateFormat(date, formatStr = 'yyyy-mm-dd') {
    if (ObjectUtils.isNull(date)) {
      return ''
    }
    let timestamp = date
    if (ObjectUtils.isString(date)) {
      timestamp = parseInt(date, 10)
      if (Number.isNaN(timestamp)) {
        return ''
      }
    }
    return dateformat(new Date(timestamp), formatStr)
  }
}
