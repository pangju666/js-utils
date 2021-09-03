import { ObjectUtils } from "./ObjectUtils";
import { BooleanUtils } from "./BooleanUtils";

/**
 * 字符串工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class StringUtils {
    /**
     * 判断字符串是否为空或 null
     *
     * @param str 要检查的字符串，可能为 null
     * @return {boolean} 如果为空或 null，则为true
     */
    public static isEmpty(str: string): boolean {
        return ObjectUtils.isNull(str) || str.length === 0;
    }

    /**
     * 判断字符串是否不为空且不为 null
     *
     * @param str 要检查的字符串，可能为 null
     * @return {boolean} 如果不为空且不为 null，则为true
     */
    public static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }

    /**
     * 在一个字符串数组中，是否任意一个为空或为 null
     *
     * @param strs 要检查的字符串，可能为 null
     * @return {boolean} 如果任何字符串为空或 null，则为true
     */
    public static isAnyEmpty(...strs: string[]): boolean {
        return strs.some((str) => this.isEmpty(str));
    }

    /**
     * 在一个字符串数组中，是否所有字符串都不为空且不为 null
     *
     * @param strs 要检查的字符串，可能为 null
     * @return {boolean} 如果没有一个字符串为空或 null，则为true
     */
    public static isNoneEmpty(...strs: string[]): boolean {
        return !this.isAnyEmpty(...strs);
    }

    /**
     * 在一个字符串数组中，是否所有字符串都为空或 null
     *
     * @param strs 要检查的字符串，可能为 null
     * @return {boolean} 如果没有一个字符串为空或 null，则为true
     */
    public static isAllEmpty(...strs: string[]): boolean {
        return strs.every((str) => this.isEmpty(str));
    }

    /**
     * 判断一个字符串，是否与一个字符串数组中的任意一个相等
     */
    public static isAnyEqual(str: string, ...strArr: string[]): boolean {
        return strArr.some((item) => this.equals(str, item));
    }

    /**
     * 判断是否为大写字母
     *
     * @param {String} ch 待判断字符
     * @returns {boolean} 为大写字母返回true，否则返回false
     */
    public static isUpperCase(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 65, code <= 90);
    }

    /**
     * 判断是否为大写字母
     *
     * @param {string} ch 待判断字符
     * @returns {boolean} 为大写字母返回true，否则返回false
     */
    public static isLowerCase(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 97, code <= 122);
    }

    /**
     * 判断一个字符串，是否与一个字符串数组中的任意一个相等（忽略大小写）
     */
    public static isAnyEqualsIgnoreCase(
        str: string,
        ...strArr: string[]
    ): boolean {
        return strArr.some((item) => this.equalsIgnoreCase(str, item));
    }

    /**
     * 判断目标字符串是否存在于指定字符串中
     * @param str 指定字符串
     * @param queryStr 目标字符串
     */
    public static contains(str: string, queryStr: string): boolean {
        return this.isNoneEmpty(str, queryStr) && str.indexOf(queryStr) !== -1;
    }

    /**
     * 比较两个字符串是否相等
     */
    public static equals(leftStr: string, rightStr: string): boolean {
        if (ObjectUtils.isNull(leftStr)) {
            if (ObjectUtils.isNull(rightStr)) {
                return true;
            }
        } else {
            if (ObjectUtils.isNotNull(rightStr)) {
                return leftStr === rightStr;
            }
        }
        return false;
    }

    /**
     * 比较两个字符串是否相等，忽略大小写
     */
    public static equalsIgnoreCase(leftStr: string, rightStr: string): boolean {
        if (ObjectUtils.isNull(leftStr)) {
            if (ObjectUtils.isNull(rightStr)) {
                return true;
            }
        } else {
            if (ObjectUtils.isNotNull(rightStr)) {
                return leftStr.toLowerCase() === rightStr.toLowerCase();
            }
        }
        return false;
    }

    /**
     * 去除字符串两端的空白，若为空字符串则返回空字符串
     */
    public static trimToEmpty(str: string): string {
        return this.isEmpty(str) ? "" : str.trim();
    }

    /**
     * 去除字符串两端的空白，若为空字符串则返回空值
     */
    public static trimToNull(str: string): string {
        return this.isEmpty(str) ? null : str.trim();
    }

    /**
     * 下划线格式字符串转为小驼峰格式
     */
    public static underLineToCamelCase(str: string): string {
        const strArr = str.split("_");
        for (let i = 1; i < strArr.length; i++) {
            strArr[i] =
                strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
        }
        return strArr.join("");
    }

    /**
     * 小驼峰格式字符串转下划线格式
     */
    public static camelCaseToUnderLine(str: string): string {
        const newStr = [];
        const indexArr = Array.of(0);
        for (let i = 1; i < str.length; i++) {
            if (StringUtils.isUpperCase(str[i])) {
                indexArr.push(i);
            }
        }
        indexArr.forEach((value, index) => {
            newStr.push(
                str.charAt(value).toLowerCase() +
                    str.substring(value + 1, indexArr[index + 1])
            );
        });
        return newStr.join("_");
    }

    // 防止实例化
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
}
