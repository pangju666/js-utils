import { ObjectUtils } from "./ObjectUtils";

/**
 * 数字工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class NumberUtils {
    /**
     * 将字符串转换为整数，如果转换失败则返回默认值。
     *
     * @param str 要转换的字符串，可能为空
     * @param defaultValue 默认值，默认为0
     */
    public static toInt(str: string, defaultValue = 0): number {
        if (ObjectUtils.isNull(str)) {
            return defaultValue;
        }
        return parseInt(str, 10);
    }

    /**
     * 将字符串转换为浮点数，如果转换失败则返回默认值。
     *
     * @param str 要转换的字符串，可能为空
     * @param defaultValue 默认值，默认为0.0
     */
    public static toFloat(str: string, defaultValue = 0.0): number {
        if (ObjectUtils.isNull(str)) {
            return defaultValue;
        }
        return parseFloat(str);
    }

    /**
     * 返回数组中的最小值。
     *
     * @param array 一个数组，不能为 null 或为空
     * @return {number} 数组中的最小值
     * @throws {TypeError} 数组为null或为空时抛出
     */
    public static min(...array: number[]): number {
        this.validateArray(array);
        return Math.min(...array);
    }

    /**
     * 返回数组中的最大值。
     *
     * @param array 一个数组，不能为 null 或为空
     * @return {number} 数组中的最大值
     * @throws {TypeError} 数组为null或为空时抛出
     */
    public static max(...array: number[]): number {
        this.validateArray(array);
        return Math.max(...array);
    }

    protected static validateArray(array: number[]): void {
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
