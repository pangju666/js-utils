/**
 * 比较它的两个参数的大小。返回负整数、零或正整数，表示第一个参数小于、等于或大于第二个参数
 *
 * @category 回调函数
 * @typeParam T -待比较参数类型
 * @param o1 第一个要比较的参数。
 * @param o2 第二个要比较的参数。
 * @returns {} 负整数、零或正整数，代表第一个参数小于、等于或大于第二个参数对象。
 */
export type Comparator<T> = (o1: T, o2: T) => number;

/**
 * 判断两个参数是否相等。
 *
 * @category 回调函数
 * @typeParam T -待比较参数类型
 * @param o1 第一个参数。
 * @param o2 第二个参数。
 * @returns {} 相等则返回 true，否则为 false。
 */
export type Equalizer<T> = (o1: T, o2: T) => boolean;

/**
 * 判断给定参数是否通过测试。
 *
 * @category 回调函数
 * @typeParam T -输入参数类型
 * @param t 输入参数
 * @returns {} 如果输入参数通过测试则返回 true，否则为 false
 */
export type Predicate<T> = (t: T) => boolean;

/**
 * 获取结果
 *
 * @category 回调函数
 * @return {} 结果
 */
export type Supplier<T> = () => T;

/**
 * 使用指定的参数执行返回 true 或 false 的测试。
 *
 * @category 回调函数
 * @param element 数组元素
 * @param index 数组索引
 * @param obj 待测试的数组
 * @return {} 是否通过测试，通过则返回 true，否则为 false
 */
export type ArrayPredicate<T> = (
  element: T,
  index?: number,
  obj?: T[]
) => boolean;

/**
 * 将值以字符串形式输出
 *
 * @category 回调函数
 * @param value 要作为字符串输出的值
 * @return {} 输出字符串
 */
export type ToString<T> = (value: T) => string;

/**
 * 对象属性名转换器
 *
 * @category 回调函数
 * @param propertyName 对象属性名
 * @return {} 新的属性名
 */
export type PropertyNameConverter = (propertyName: string) => string;

/**
 * 对象属性名排除器
 *
 * @category 回调函数
 * @param propertyName 对象属性名
 * @param value 对象属性名对应的值
 */
export type PropertyNameExclude = (
  propertyName: string,
  value: unknown
) => boolean;
