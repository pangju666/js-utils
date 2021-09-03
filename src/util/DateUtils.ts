import { ObjectUtils } from "./ObjectUtils";
import * as dateFns from "date-fns";
import { StringUtils } from "./StringUtils";

/**
 * 日期工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export class DateUtils {
    /**
     * 日期转为时间戳
     *
     * @param date 日期
     * @param format 时间字符串格式，具体请参考{@link https://date-fns.org/v2.22.1/docs/parse#description}
     * @return {number} 时间戳, 转换错误时返回-1
     */
    public static getTimestamp(
        date: Date | string,
        format = "yyyy-MM-dd"
    ): number {
        if (ObjectUtils.isNull(date)) {
            return -1;
        }
        if (typeof date === "string") {
            if (StringUtils.isAnyEmpty(date, format)) {
                return -1;
            }
            return dateFns.getTime(dateFns.parse(date, format, new Date()));
        }
        return dateFns.getTime(date);
    }

    /**
     * 时间戳转为日期
     *
     * @param timestamp 时间戳，可接受字符串形式时间戳
     * @return {Date} 解析出的日期对象
     */
    public static fromTimeStamp(timestamp: number | string): Date {
        if (typeof timestamp === "string") {
            return dateFns.fromUnixTime(parseInt(timestamp, 10));
        }
        return dateFns.fromUnixTime(timestamp);
    }

    /**
     * 时间格式化
     *
     * @param {any} date 日期
     * @param formatStr 时间字符串格式，具体请参考{@link https://date-fns.org/v2.22.1/docs/parse#description}
     * @return {string} 格式化后的时间字符串
     */
    public static formatDate(
        date: Date | number | string,
        formatStr = "yyyy-MM-dd"
    ): string {
        if (ObjectUtils.isNull(date)) {
            return "";
        }
        if (typeof date === "string") {
            return ObjectUtils.defaultIfCondition(
                dateFns.format(parseInt(date, 10), formatStr),
                "",
                StringUtils.isNotEmpty
            );
        }
        return dateFns.format(date, formatStr);
    }

    // 防止实例化
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
}

Reflect.setPrototypeOf(DateUtils, dateFns);
