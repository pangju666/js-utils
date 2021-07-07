import { ObjectUtils } from "./ObjectUtils";
import { BooleanUtils } from "./BooleanUtils";

/**
 * 数组工具类
 *
 * @author 胖橘
 * @version 1.0-alpha 2021-6-21
 * @version 1.0-beta 2021-7-5
 */
export class ArrayUtils {
    /**
     * 判断数组是否为空
     *
     * @param array 待检测数组, 允许为空或未定义
     * @return {} 参数为空或未定义时返回true，否则返回数组长度是否为0
     * @throws TypeError 当传入参数不为数组类型时，则抛出类型错误异常
     */
    public static isEmpty<T>(array: T[]): boolean {
        return ObjectUtils.isNotNull(array) ? array.length === 0 : true
    }

    /**
     * 安全取值，如果下标越界或下标小于0，则返回undefined
     * @param array 待取值数组，允许为空或定义
     * @param index 下标值
     * @param defaultVal 当取值错误时，返回的默认值
     */
    public static safeIndex<T>(array: T[], index: number, defaultVal?: T): T {
        if (ObjectUtils.isNull(array)) {
            return defaultVal
        }
        if(BooleanUtils.or(index < 0, index >= array.length)) {
            return defaultVal
        }
        return array[index]
    }

    /**
     * 查找所有符合条件的元素的索引，数组为空则返回空数组
     */
    public static findIndexes<T>(array: T[], condition: (value: T, index?: number, obj?: T[]) => boolean): number[] {
        const indexes = []
        if (ObjectUtils.isNotNull(array)) {
            array.forEach((item, index) => {
                if (condition(item, index, array)) {
                    indexes.push(index)
                }
            })
        }
        return indexes
    }

    /**
     * 判断数组中是否存在符合条件的值
     */
    public static contain<T>(array: T[], condition: (value: T, index?: number, obj?: T[]) => boolean): boolean {
        if (ObjectUtils.isNotNull(array)) {
            for (let i = 0; i < array.length; i++) {
                if (condition(array[i], i, array)) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * 对一个数组进行拷贝（深度拷贝）
     */
    public static copy<T>(array: T[]): T[] {
        return array.map(item => ObjectUtils.deepClone(item))
    }

    // 防止实例化
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {
    }
}
