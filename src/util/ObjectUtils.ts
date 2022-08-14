import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { NullError } from "../error/NullError";
import { Comparator, Predicate } from "../type/TypeAlias";
import { StringUtils } from "./StringUtils";

// import structuredClone from "interface-js/actual/structured-clone";

/**
 * 对象工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ObjectUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * 根据属性路径字符串获取对象的属性
   *
   * 例如：
   * const a = {
   *     b: "test",
   *     c: {
   *         d: "test2"
   *     },
   *     e: ["test4"],
   *     f: [{g: "test3"}]
   * };
   * getProp(a, "b") => "test"
   * getProp(a, "c.d") => "test2"
   * getProp(a, "e[0]") => "test4"
   * getProp(a, "f[0].g") => "test3"
   *
   * @param obj 测试对象
   * @param key 属性路径字符串，如 "a.b"、"a"、"a[0].b"，如果参数为 null、undefined、"" 则返回默认值
   * @param defaultValue 默认值
   * @return {} 对象属性值，如果对象为 null、undefined 则返回默认值
   */
  public static getProp(
    obj: unknown,
    key: string,
    defaultValue: unknown
  ): unknown {
    if (ObjectUtils.nonNull(key) && typeof key !== "string") {
      throw new TypeError("key 必须为字符串类型");
    }

    if (StringUtils.isEmpty(key)) {
      return defaultValue;
    }

    const props = key.replace(/\[/g, ".").replace(/]/g, "").split(".");
    if (props.length <= 1) {
      return this.defaultIfNull(obj[props[0]], defaultValue);
    }
    const propValue = props.reduce((value, prop) => (value || {})[prop], obj);
    return this.defaultIfNull(propValue, defaultValue);
  }

  /**
   * 判断值是否不为 undefined
   *
   * <pre>
   *      ObjectUtils.nonExist(null)      = true;
   *      ObjectUtils.nonExist(undefined)  = false;
   *      ObjectUtils.nonExist({ name: "admin" }) = true;
   * </pre>
   *
   * @param value 待判断的值
   * @return {} 值为 undefined 则返回 false，否则为 true
   */
  public static nonExist(value: unknown): boolean {
    return value !== undefined;
  }

  /**
   * 判断值是否为 undefined
   *
   * <pre>
   *      ObjectUtils.isExist(null)      = false;
   *      ObjectUtils.isExist(undefined)  = true;
   *      ObjectUtils.isExist({ name: "admin" }) = false;
   * </pre>
   *
   * @param value 待判断的值
   * @return {} 值为 undefined 则返回 true，否则为 false
   */
  public static isExist(value: unknown): boolean {
    return !this.nonExist(value);
  }

  /**
   * 判断值是否不为 null 或 undefined
   *
   * <pre>
   *      ObjectUtils.nonNull(undefined) = false;
   *      ObjectUtils.nonNull(null)  = false;
   *      ObjectUtils.nonNull({ name: "admin" }) = true;
   * </pre>
   *
   * @param value 待判断的值
   * @return {} 值为 null 或 undefined 则返回 false，否则为 true
   */
  public static nonNull(value: unknown): boolean {
    return value !== undefined && value !== null;
  }

  /**
   * 判断值是否为 null 或 undefined
   *
   * <pre>
   *      ObjectUtils.isNull(undefined) = true;
   *      ObjectUtils.isNull(null)  = true;
   *      ObjectUtils.isNull({ name: "admin" }) = false;
   * </pre>
   *
   * @param value 待判断的值
   * @return {} 值为 null 或 undefined 则返回 true，否则为 false
   */
  public static isNull(value: unknown): boolean {
    return !this.nonNull(value);
  }

  /**
   * 检查给定参数中的所有值是否都不为空值
   *
   * @param values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 如果给定参数中存在至少一个空值或给定参数是空值则返回 false，
   * 如果给定参数中的所有值都不是空值则返回 true。
   */
  public static allNotNull(...values: unknown[]): boolean {
    if (this.isNull(values)) {
      return false;
    }

    for (const value of values) {
      if (this.isNull(value)) {
        return false;
      }
    }

    return true;
  }

  /**
   * 检查给定参数中的所有值是否都为空值
   *
   * @param values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 如果给定参数中存在至少一个非空值或给定参数是非空值则返回 false，
   * 如果给定参数中的所有值都是空值则返回 true。
   */
  public static allNull(...values: unknown[]): boolean {
    return !this.anyNotNull(values);
  }

  /**
   * 检查给定参数中是否存在非空值
   *
   * @param values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 如果在给定参数中至少存在一个非空值则返回 true，
   * 如果给定参数中的所有值都是空值，则返回 false
   */
  public static anyNotNull(...values: unknown[]): boolean {
    return this.nonNull(this.firstNonNull(values));
  }

  /**
   * 检查给定参数中是否存在空值
   *
   * @param values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 如果在给定参数中至少存在一个空值则返回 true，
   * 如果给定参数中的所有值都是非空值，则返回 false
   */
  public static anyNull(...values: unknown[]): boolean {
    return !this.allNotNull(values);
  }

  /**
   * 拷贝源对象至目录对象，如果源对象为 null 或 undefined，则什么也不发生
   *
   * @param source 源对象
   * @param target 目标对象
   */
  public static copy(source: unknown, target: unknown): void {
    if (this.nonNull(source)) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
  }

  /**
   * 浅克隆目标对象
   *
   * @param value 待克隆值
   * @return {} 克隆出的新值，如果输入为 null、undefined 则为 null
   */
  public static clone<T>(value: T): T {
    if (this.isNull(value)) {
      return null;
    }
    if (this.isBasicType(value)) {
      return value;
    }
    return Object.create(
      Object.getPrototypeOf(value),
      Object.getOwnPropertyDescriptors(value)
    );
  }

  // 基于{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm 结构化克隆算法}
  /**
   * 深克隆目标对象
   *
   * @param value 待克隆对象
   * @return {} 深克隆后的新值
   */
  public static deepClone(value: unknown): unknown {
    return this.deepCloneImpl(value, new WeakSet());
  }

  /**
   * <p>null、undefined 安全的值比较。</p>
   *
   * @param c1 第一个可比较的值，可能为 null 或 undefined
   * @param c2 第二个可比较的值，可能为 null 或 undefined
   * @param compareTo 值比较规则
   * @param nullGreater 如果为 true，则 null、undefined 被认为大于非 null、undefined 值，
   * 或者如果为 false，则 null、undefined 被认为小于非 null、undefined 值
   * @return 如果 c1 < c2 则为负值，如果 c1 = c2 则为零，如果 c1 > c2 则为正值
   */
  public static compare<T>(
    c1: T,
    c2: T,
    compareTo: Comparator<T>,
    nullGreater = false
  ): number {
    if (c1 === c2) {
      return 0;
    } else if (this.isNull(c1)) {
      return nullGreater ? 1 : -1;
    } else if (this.isNull(c2)) {
      return nullGreater ? -1 : 1;
    }
    return compareTo(c1, c2);
  }

  /**
   * 如果传递的对象为 null 或 undefined，则返回默认值。<br/>
   * 等价于（ES2020）：value ?? defaultVal
   *
   * @param value 待取值变量
   * @param defaultVal 默认值
   * @return {} 如果不为 null 或 undefined 则返回对象，否则返回默认值
   */
  public static defaultIfNull<T>(value: T, defaultVal: T): T {
    return value ?? defaultVal;
  }

  /**
   * 条件取值，如果取值条件不成立则返回默认值
   *
   * @param value 待取值变量
   * @param defaultVal 默认值
   * @param predicate 取值条件
   * @return {} 条件成立则返回此变量，否则返回默认值
   */
  public static defaultIfCondition<T>(
    value: T,
    defaultVal: T,
    predicate: boolean | Predicate<T>
  ): T {
    if (typeof predicate === "boolean") {
      return predicate ? value : defaultVal;
    }
    return predicate(value) ? value : defaultVal;
  }

  /**
   * 返回给定参数中第一个不为 null 或 undefined 的值
   *
   * @param {} values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 给定参数中第一个不是 null 或 undefined 的值。
   * 如果所有值都为 null、undefined 或者给定参数为 null、undefined，则返回 null
   */
  public static firstNonNull(...values: unknown[]): unknown {
    if (this.nonNull(values)) {
      for (const value of values) {
        if (this.nonNull(value)) {
          return value;
        }
      }
    }
    return null;
  }

  /**
   * <p>检查参数是否为空，null 或 undefined。</p>
   *
   * 支持以下类型：
   * <ul>
   * <li>{@link String}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Array}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Set}: 如果它有零个元素，则认为是空的。</li>
   * <li>{@link Map}: 如果它有零个键值映射，则认为是空的。</li>
   * </ul>
   *
   * <pre>
   *      ObjectUtils.isEmpty(null)             = true
   *      ObjectUtils.isEmpty("")               = true
   *      ObjectUtils.isEmpty("ab")             = false
   *      ObjectUtils.isEmpty([])               = true
   *      ObjectUtils.isEmpty([1,2,3])          = false
   *      ObjectUtils.isEmpty(1234)             = false
   * </pre>
   *
   * @param value 待判断的值，可能是 null 或 undefined
   * @return {} 如果对象具有受支持的类型并且为空、null 或 undefined，则为 true，否则为 false
   */
  public static isEmpty(value: unknown): boolean {
    if (this.isNull(value)) {
      return true;
    }
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }
    return false;
  }

  /**
   * 判断对象是否不为空
   *
   * 支持以下类型：
   * <ul>
   * <li>{@link String}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Array}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Set}: 如果它有零个元素，则认为是空的。</li>
   * <li>{@link Map}: 如果它有零个键值映射，则认为是空的。</li>
   * </ul>
   *
   * <pre>
   *      ObjectUtils.isNotEmpty(null)             = false
   *      ObjectUtils.isNotEmpty("")               = false
   *      ObjectUtils.isNotEmpty("ab")             = true
   *      ObjectUtils.isNotEmpty([])               = false
   *      ObjectUtils.isNotEmpty([1,2,3])          = true
   *      ObjectUtils.isNotEmpty(1234)             = true
   * </pre>
   *
   * @param value 待判断的值，可能是 null 或 undefined
   * @return {} 如果对象具有不受支持的类型或不为空、不为 null 且不为 undefined，则为 true，否则为 false
   */
  public static isNotEmpty(value: unknown): boolean {
    return !this.isEmpty(value);
  }

  /**
   * <p>null、undefined 安全的值比较。</p>
   *
   * @param compareTo 值比较规则
   * @param values 待比较值的集合，可能为 null 或 undefined
   * @return
   *  <ul>
   *   <li>如果任何对象不为 null 或 undefined 且不相等，则为更大的对象。
   *   <li>如果所有对象都不为 null 或 undefined 且相等，则为第一个。
   *   <li>如果任何可比较对象为 null 或 undefined，则非 null 或 undefined 对象中的较大者
   *   <li>如果所有可比较对象都为 null 或 undefined，则返回 null。
   *  </ul>
   */
  public static max<T>(compareTo: Comparator<T>, ...values: T[]): T {
    let result = null;
    if (this.nonNull(values)) {
      for (const value of values) {
        if (this.compare(value, result, compareTo, false) > 0) {
          result = value;
        }
      }
    }
    return result;
  }

  /**
   * <p>null、undefined 安全的值比较。</p>
   *
   * @param compareTo 值比较规则
   * @param values 待比较值的集合，可能为 null 或 undefined
   * @return
   * <ul>
   *   <li>如果任何对象不为 null 或 undefined 且不相等，则为更小的对象。
   *   <li>如果所有对象都不为 null 或 undefined 且相等，则为第一个。
   *   <li>如果任何可比较对象为 null 或 undefined，则非 null 或 undefined 对象中的较小者
   *   <li>如果所有可比较对象都为 null 或 undefined，则返回 null。
   *  </ul>
   */
  public static min<T>(compareTo: Comparator<T>, ...values: T[]): T {
    let result = null;
    if (this.nonNull(values)) {
      for (const value of values) {
        if (this.compare(value, result, compareTo, false) < 0) {
          result = value;
        }
      }
    }
    return result;
  }

  /**
   * 找出最常出现的变量
   *
   * @param values 待检查的变量
   * @return {} 出现次数最最多的项，如果不唯一或待检查的变量为 null 或 undefined，则返回 null
   */
  public static mode(...values: unknown[]): unknown {
    if (this.isNotEmpty(values)) {
      const occurrences = new Map();
      for (const value of values) {
        const count = this.defaultIfNull(occurrences.get(value), 1);
        if (count === 1) {
          occurrences.set(value, count + 1);
        }
      }
      let result = null;
      let max = 0;
      occurrences.forEach((value, key) => {
        const cmp = value;
        if (cmp === max) {
          result = null;
        } else if (cmp > max) {
          max = cmp;
          result = key;
        }
      });
      return result;
    }
    return null;
  }

  /**
   * 比较两个对象是否相等，其中一个或两个对象可能为 null 或 undefined。
   *
   * @param value1 第一个对象，可能为 null 或 undefined
   * @param value2 第二个对象，可能为 null 或 undefined
   * @param compareTo 值比较规则
   * @return {} 如果两个对象的值相同，则为 true，否则为 false
   */
  public static equals<T>(
    value1: T,
    value2: T,
    compareTo: Comparator<T>
  ): boolean {
    if (value1 === value2) {
      return true;
    }
    if (this.isNull(value1) || this.isNull(value2)) {
      return false;
    }
    return compareTo(value1, value2) === 0;
  }

  /**
   * 比较两个对象是否相等，其中一个或两个对象可能为 null 或 undefined。
   *
   * @param value1 第一个对象，可能为 null 或 undefined
   * @param value2 第二个对象，可能为 null 或 undefined
   * @param compareTo 值比较规则
   * @return {} 如果两个对象的值相同，则为 false，否则为 true
   */
  public static notEqual<T>(
    value1: T,
    value2: T,
    compareTo: Comparator<T>
  ): boolean {
    return !this.equals(value1, value2, compareTo);
  }

  /**
   * 检查指定的对象引用不为 null，undefined 或为空。
   * 使用此方法进行验证，例如：
   *
   * <blockquote>
   *
   * <pre>
   * let obj = new Map();
   * obj = ObjectUtils.requireNonEmpty(obj, "map");
   * </pre>
   *
   * </blockquote>
   *
   * @param value 检查无效性的值
   * @param message 异常消息。
   * @return {} 如果不为null、undefined 或为空, 则返回 value。
   * @throws {NullError} 如果 value 为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 value 为空.
   */
  public static requireNonEmpty(value: unknown, message?: string): unknown {
    if (this.isNull(value)) {
      throw new NullError(message);
    }
    if (this.isEmpty(value)) {
      throw new IllegalArgumentError(message);
    }
    return value;
  }

  /**
   * 返回传入对象的字符串表示。
   *
   * @param value
   * @param nullStr
   * @return {} 传入 value 的{@link Object.toString}，如果为 null 或 undefined，则返回 nullStr
   */
  public static toString(value: unknown, nullStr = ""): string {
    return this.isNull(value) ? nullStr : value.toString();
  }

  /**
   * 是否为基础类型
   *
   * @param value 待判断的值
   * @return {} 如果值为基础类型，则为 true，否则为 false
   */
  public static isBasicType(value: unknown): boolean {
    if (this.isNull(value)) {
      return true;
    }

    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "symbol" ||
      typeof value === "bigint" ||
      typeof value === "function"
    );
  }

  /**
   * 判断对象是否为某个类型
   *
   * @param value 待判断的值，不可以为 null 或 undefined
   * @param types 期待类型集合
   * @return {} 如果值为某个期待类型，则为 true，否则为 false
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isAnyType(value: unknown, ...types: Function[]): boolean {
    if (this.isNull(value) || this.isEmpty(types)) {
      return false;
    }
    return types.some((type) => {
      if (type === String && typeof value === "string") {
        return true;
      } else if (type === Number && typeof value === "number") {
        return true;
      } else if (type === BigInt && typeof value === "bigint") {
        return true;
      } else if (type === Boolean && typeof value === "boolean") {
        return true;
      } else if (type === Symbol && typeof value === "symbol") {
        return true;
      } else if (type === Object && typeof value === "object") {
        return true;
      } else if (type === Function && typeof value === "function") {
        return true;
      }
      return value instanceof type || value.constructor === type;
    });
  }

  private static deepCloneImpl(value: unknown, hash = new WeakSet()): unknown {
    // 非 object 类型或 ERROR 对象，无法深度拷贝，直接返回原值
    if (
      this.isNull(value) ||
      value instanceof Error ||
      typeof value !== "object"
    ) {
      return value;
    }
    // dom节点，无法深度拷贝，直接返回原值
    if (
      typeof window !== "undefined" &&
      (value instanceof Node || value instanceof HTMLCollection)
    ) {
      return value;
    }
    // 判断传入的待拷贝值的引用是否存在于hash中
    if (hash.has(value)) {
      return value;
    }

    /* if (typeof structuredClone !== "undefined") {
                    return structuredClone(value);
                }*/
    const newValue = {};
    for (const key of Object.keys(value)) {
      const currentValue = value[key];
      if (
        this.isNull(currentValue) ||
        value instanceof Error ||
        typeof currentValue !== "object"
      ) {
        newValue[key] = currentValue;
      } else if (Array.isArray(currentValue)) {
        newValue[key] = currentValue.map((item) =>
          this.deepCloneImpl(item, hash)
        );
      } else if (currentValue instanceof Set) {
        const newSet = new Set();
        currentValue.forEach((item) => {
          newSet.add(this.deepCloneImpl(item));
        });
        newValue[key] = newSet;
      } else if (currentValue instanceof Map) {
        const newMap = new Map();
        currentValue.forEach((itemValue, itemKey) => {
          newMap.set(itemKey, this.deepCloneImpl(itemValue, hash));
        });
        newValue[key] = newMap;
      } else {
        hash.add(value);
        newValue[key] = this.deepCloneImpl(currentValue, hash);
      }
    }
    return newValue;
  }
}
