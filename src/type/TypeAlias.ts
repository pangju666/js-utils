/**
 * 比较它的两个参数的顺序。返回负整数、零或正整数，因为第一个参数小于、等于或大于第二个参数
 *
 * @param o1 第一个要比较的对象。
 * @param o2 第二个要比较的对象。
 * @return {} 作为第一个参数的负整数、零或正整数小于、等于或大于第二个参数。
 */
export type Comparator<T> = (o1: T, o2: T) => number;

/**
 * 使用指定的参数执行返回 true 或 false 的测试。
 *
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
 * 根据给定参数测试此谓词。
 *
 * @param t 输入参数
 * @return {} 如果输入参数匹配谓词则返回 true，否则为 false
 */
export type Predicate<T> = (t: T) => boolean;

/**
 * 将值以字符串形式输出
 *
 * @param value 要作为字符串输出的值
 * @return {} 输出字符串
 */
export type ToString<T> = (value: T) => string;

/**
 * 对象属性名转换器
 *
 * @param propertyName 对象属性名
 * @return {} 新的属性名
 */
export type PropertyNameConverter = (propertyName: string) => string;

/**
 * 对象属性名排除器
 *
 * @param propertyName 对象属性名
 * @param value 对象属性名对应的值
 */
export type PropertyNameExclude = (
  propertyName: string,
  value: unknown
) => boolean;

/**
 * 获取结果
 *
 * @return {} 结果
 */
export type Supplier<T> = () => T;
