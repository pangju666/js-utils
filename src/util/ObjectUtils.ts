import { IllegalArgumentError, NullError } from "../core/runtimeError";
import { Comparator, Condition } from "../core/TypeAlias";

/**
 * 对象工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ObjectUtils {
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
     * @param obj 待克隆对象
     * @return {} 克隆出的新对象，如果输入为 null、undefined 则为 null
     */
    public static clone<T>(obj: T): T {
        if (this.isNull(obj)) {
            return null;
        }

        if (this.isBasicType(obj)) {
            return obj;
        }

        return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    }

    /**
     * 深克隆目标对象
     *
     * @param obj 待克隆对象
     * @return {} 克隆出的新对象，如果输入为 null、undefined 则为 null
     */
    public static deepClone(obj: unknown): unknown {
        if (this.isNull(obj)) {
            return null;
        }

        if (this.isBasicType(obj)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map((item) => this.deepClone(item));
        }

        const newObj = {};
        for (const propName of Object.getOwnPropertyNames(obj)) {
            newObj[propName] = this.deepClone(obj[propName]);
        }
        return newObj;
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
    public static compare<T>(c1: T, c2: T, compareTo: Comparator<T>, nullGreater = false): number {
        if (c1 == c2) {
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
     * @param condition 取值条件
     * @return {} 条件成立则返回此变量，否则返回默认值
     */
    public static defaultIfCondition<T>(value: T, defaultVal: T, condition: boolean | Condition): T {
        if (typeof condition === "boolean") {
            return condition ? value : defaultVal;
        }
        return condition(value) ? value : defaultVal;
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
    public static equals<T>(value1: T, value2: T, compareTo: Comparator<T>): boolean {
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
    public static notEqual<T>(value1: T, value2: T, compareTo: Comparator<T>): boolean {
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
            return false;
        }

        return (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            typeof value === "symbol"
        );
    }

    /**
     * 判断对象是否为某个类型
     *
     * @param value 待判断的值，不可以为 null 或 undefined
     * @param types 期待类型集合
     * @return {} 如果值为某个期待类型，则为 true，否则为 false
     */
    public static isAnyType(value: unknown, ...types: never[]): boolean {
        if (this.isNull(value) || this.isEmpty(types)) {
            return false;
        }
        return types.some(
            (type) => value instanceof type
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}
