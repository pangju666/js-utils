import { ObjectUtils } from "./ObjectUtils";
import { BooleanUtils } from "./BooleanUtils";

/**
 * 数组工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
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
   */
  public static safeIndex<T>(array: T[], index: number): T {
    if(BooleanUtils.or(ObjectUtils.isNull(array), index < 0, index >= array.length)) {
      return undefined
    }
    return array[index]
  }

  /**
   * 根据条件对数组进行过滤
   *
   * @param array 待过滤数组
   * @param condition 过滤条件
   */
  public static filterByCondition<T>(array: T[], condition: (item: T) => boolean): T[] {
    const result = []
    for (const item of array) {
      if (condition(item)) {
        result.push(item)
      }
    }
    return result
  }

  /**
   * 查找第一个匹配的结果
   */
  public static findFirst<T>(array: T[], value: T): T {
    const index = array.indexOf(value)
    return ObjectUtils.getSafeValue(array[index], undefined, () => index >= 0)
  }

  /**
   * 查找最后一个匹配的结果
   */
  public static findLast<T>(array: T[], value: T): T {
    const index = array.lastIndexOf(value)
    return ObjectUtils.getSafeValue(array[index], undefined, () => index >= 0)
  }

  /**
   * 判断数组中是否存在符合条件的值
   */
  public static contains<T>(array: T[], condition: (value) => boolean): boolean;
  public static contains<T>(array: T[], condition: T): boolean;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static contains(array, condition): unknown {
    if (typeof condition === 'function') {
      for (const item of array) {
        if (condition(item)) {
          return true
        }
      }
      return false
    }
    return array.indexOf(condition) != -1
  }

  /**
   * 对一个数组进行拷贝（深度拷贝）
   */
  public copy<T>(array: T[]): T[] {
    const copyArr = []
    array.forEach(item => copyArr.push(ObjectUtils.deepClone(item)))
    return copyArr
  }


  // 防止实例化
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
