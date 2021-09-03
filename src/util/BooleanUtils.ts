import { ObjectUtils } from "./ObjectUtils";

/**
 * 布尔工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class BooleanUtils {
    /**
     * 检查布尔值是否为 true
     *
     * @param bool 要检查的布尔值，null 则返回 false
     * @return {boolean} 仅当输入为非空且为 true 时才为真
     */
    public static isTrue(bool: boolean): boolean {
        return ObjectUtils.defaultIfNull(bool, false);
    }

    /**
     * 检查布尔值是否为 false
     *
     * @param bool 要检查的布尔值，null 返回 false
     * @return {boolean} 仅当输入为非空且为假时才为true
     */
    public static isFalse(bool: boolean): boolean {
        return ObjectUtils.defaultIfNull(!bool, false);
    }

    /**
     * 将布尔值转换为布尔值, 并安全处理null 。
     *
     * @param bool 要转换的布尔值
     * @param valueIfNull 为 null 返回的布尔值，默认为 false
     * @return {boolean} true 或 false，null 返回 false
     */
    public static toBooleanDefaultIfNull(
        bool: boolean,
        valueIfNull = false
    ): boolean {
        return ObjectUtils.defaultIfNull(bool, valueIfNull);
    }

    /**
     * 将数字转换为指定转换值的布尔值，如果找不到匹配项则抛出异常。
     *
     * @param value 要转换的数字
     * @param trueValue 与 true 匹配的值
     * @param falseValue 与 false 匹配的值
     * @return {boolean} true 或 false
     * @throws {Error} 要转换的数字与任意指定值都不匹配时抛出
     */
    public static fromNumber(
        value: number,
        trueValue = 1,
        falseValue = 0
    ): boolean {
        if (ObjectUtils.isNull(value)) {
            if (ObjectUtils.isNull(trueValue)) {
                return true;
            }
            if (ObjectUtils.isNull(falseValue)) {
                return false;
            }
        } else if (value === trueValue) {
            return true;
        } else if (value === falseValue) {
            return false;
        }
        throw new Error("要转换的数字与任一指定值都不匹配");
    }

    /**
     * 将布尔值转换为指定转换数字。
     *
     * @param bool 要转换的布尔值
     * @param trueValue 如果为 true 返回的值，可能为 null
     * @param falseValue 如果为 false 返回的值，可能为 null
     * @return {number} 匹配的值
     */
    public static toNumber(
        bool: boolean,
        trueValue = 1,
        falseValue = 0
    ): number {
        if (ObjectUtils.isNull(bool)) {
            return null;
        }
        return ObjectUtils.defaultIfCondition(trueValue, falseValue, bool);
    }

    /**
     * 将字符串转换为布尔值，如果找不到匹配项则抛出异常。
     *
     * @param str 要检查的字符串
     * @param trueString 与true匹配的字符串（区分大小写），可能为 null
     * @param falseString 与false匹配的字符串（区分大小写），可能为 null
     * @return {boolean} 字符串的布尔值
     * @throws {Error} 要转换的字符传与任意指定值都不匹配时抛出
     */
    public static fromString(
        str: string,
        trueString: string,
        falseString: string
    ): boolean {
        if (ObjectUtils.isNull(str)) {
            if (ObjectUtils.isNull(trueString)) {
                return true;
            }
            if (ObjectUtils.isNull(falseString)) {
                return false;
            }
        } else if (str === trueString) {
            return true;
        } else if (str === falseString) {
            return false;
        }
        throw new Error("要转换的字符串与任一指定值都不匹配");
    }

    /**
     * 将布尔值转换为指定字符串。
     *
     * @param bool 要检查的布尔值
     * @param trueString 如果为 true 返回的字符串，可能为 null
     * @param falseString 如果为 false 返回的字符串，可能为 null
     * @return {number} 两个指定字符串之一
     */
    public static toString(
        bool: boolean,
        trueString: string,
        falseString: string
    ): string {
        if (ObjectUtils.isNull(bool)) {
            return null;
        }
        return ObjectUtils.defaultIfCondition(trueString, falseString, bool);
    }

    /**
     * 否定指定的布尔值
     *
     * @param bool 要否定的布尔值，可能为 null
     * @return {boolean} 否定的布尔值，如果输入为 null 则为 null
     */
    public static negate(bool: boolean): boolean {
        return ObjectUtils.defaultIfNull(!bool, null);
    }

    /**
     * 对一组布尔值执行逻辑与
     *
     * @param array 布尔数组
     * @return {boolean} 如果逻辑与成功，则为 true。
     */
    public static and(...array: boolean[]): boolean {
        this.validateArray(array);
        for (const element of array) {
            if (!element) {
                return false;
            }
        }
        return true;
    }

    /**
     * 对一组布尔值执行逻辑或
     *
     * @param array 布尔数组
     * @return {boolean} 如果逻辑或成功，则为 true。
     */
    public static or(...array: boolean[]): boolean {
        this.validateArray(array);
        for (const element of array) {
            if (element) {
                return true;
            }
        }
        return false;
    }

    protected static validateArray(array: boolean[]): void {
        if (ObjectUtils.isNull(array)) {
            throw new TypeError("参数不能为null");
        }
        if (array.length === 0) {
            throw new TypeError("数组不能为空");
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
}
