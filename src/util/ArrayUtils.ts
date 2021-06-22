import ObjectUtils from './ObjectUtils';

/**
 * 数组工具类
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export default class ArrayUtils {
  // 防止实例化
  protected constructor() {
  }

  /**
   * 判断数组是否为空
   *
   * @param array 待检测数组, 允许为空或未定义
   * @return 参数为空或未定义时返回true，否则返回数组长度是否为0
   * @throws TypeError 当传入参数不为数组类型时，则抛出类型错误异常
   */
  static isEmpty(array: any[]): boolean {
    return ObjectUtils.isNotNull(array) ? array.length === 0 : true
  }
}
