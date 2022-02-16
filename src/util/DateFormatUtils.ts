import { format } from "date-fns";
import {ObjectUtils} from "./ObjectUtils";

/**
 * 日期格式化工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class DateFormatUtils {
    /**
     * 日期时间
     */
    public static readonly DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    /**
     * 日期时间时区
     */
    public static readonly DATE_TIME_TIME_ZONE_FORMAT = "yyyy-MM-dd HH:mm:ssZZ";
    /**
     * 日期
     */
    public static readonly DATE_FORMAT = "yyyy-MM-dd";
    /**
     * 日期时区
     */
    public static readonly DATE_TIME_ZONE_FORMAT = "yyyy-MM-ddZZ";
    /**
     * 时间
     */
    public static readonly TIME_FORMAT = "HH:mm:ss";
    /**
     * 秒时间戳
     */
    public static readonly SECONDS_TIMESTAMP_FORMAT = "t";
    /**
     * 毫秒时间戳
     */
    public static readonly MILLISECONDS_TIMESTAMP_FORMAT = "T";

    /**
     * <p>将日期（{@link Date}）或时间戳格式化为特定模式。</p>
     *
     * @param date 要格式化的日期（{@link Date}）或时间戳，不能为 null 或 undefined
     * @param pattern 用于格式化日期的表达式，不能为空、null 或 undefined
     * @return {} 格式化后的日期字符串
     * @see https://date-fns.org/v2.28.0/docs/format
     */
    public static format(date: number | Date, pattern: string): string {
        if (ObjectUtils.anyNull(date, pattern)) {
            return "";
        }
        return format(date, pattern);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}
