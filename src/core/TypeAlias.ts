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
 */
export type Predicate<T> = (element: T, index?: number, obj?: T[]) => boolean;

/**
 * 将值以字符串形式输出
 *
 * @param value 要作为字符串输出的值
 */
export type ToString<T> = (value: T) => string;
