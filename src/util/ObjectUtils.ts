import {IllegalArgumentError, NullError} from "../core/runtimeError";

/**
 * 对象工具类，包含常用对象处理函数
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ObjectUtils {
    /**
     * 判断对象是否不为 null 或 undefined
     *
     * @param {any} value 对象
     * @return {boolean} 对象为 null 或 undefined 则返回 false，否则为 true
     */
    public static nonNull<T>(value: T): boolean {
        return value !== undefined && value !== null;
    }

    /**
     * 判断对象是否为 null 或 undefined
     *
     * @param {any} value 对象
     * @return {boolean} 对象为 null 或 undefined 则返回 true，否则为 false
     */
    public static isNull<T>(value: T): boolean {
        return !this.nonNull(value);
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
     * ObjectUtils.isEmpty(null)             = true
     * ObjectUtils.isEmpty("")               = true
     * ObjectUtils.isEmpty("ab")             = false
     * ObjectUtils.isEmpty([])               = true
     * ObjectUtils.isEmpty([1,2,3])          = false
     * ObjectUtils.isEmpty(1234)             = false
     * </pre>
     *
     * @param object {any} 要测试的对象，可能是 null 或 undefined
     * @return {boolean} 如果对象具有受支持的类型并且为空、null 或 undefined，则为 true，否则为 false
     */
    public static isEmpty<T>(object: T): boolean {
        if (ObjectUtils.isNull(object)) {
            return true;
        }
        if (typeof object === "string" || Array.isArray(object)) {
            return object.length === 0;
        }
        if (object instanceof Map || object instanceof Set) {
            return object.size === 0;
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
     * ObjectUtils.isNotEmpty(null)             = false
     * ObjectUtils.isNotEmpty("")               = false
     * ObjectUtils.isNotEmpty("ab")             = true
     * ObjectUtils.isNotEmpty([])               = false
     * ObjectUtils.isNotEmpty([1,2,3])          = true
     * ObjectUtils.isNotEmpty(1234)             = true
     * </pre>
     *
     * @param {any} object 要测试的对象，可能是 null 或 undefined
     * @return {boolean} 如果对象具有不受支持的类型或不为空、不为 null 且不为 undefined，则为 true，否则为 false
     */
    public static isNotEmpty<T>(object: T): boolean {
        return !this.isEmpty(object);
    }

    /**
     * 检查指定的对象引用不为 null，undefined 或为空。
     * 使用此方法进行验证，例如：
     *
     * <blockquote>
     *
     * <pre>
     * public Foo(Bar bar) {
     *     this.bar = ObjectUtils.requireNonEmpty(bar, "bar");
     * }
     * </pre>
     *
     * </blockquote>
     *
     * @param {any} obj 检查无效性的对象引用。
     * @param {string} message 异常消息。
     * @return {any} 如果不为null、undefined 或为空, 则返回 obj。
     * @throws {NullError} 如果 obj 为 null
     * @throws {IllegalArgumentError} 如果 obj 为空.
     * @see #isEmpty(Object)
     */
    public static requireNonEmpty<T>(obj: T, message?: string): T {
        if (this.isNull(obj)) {
            throw new NullError(message);
        }
        if (this.isEmpty(obj)) {
            throw new IllegalArgumentError(message);
        }
        return obj;
    }

    /**
     * 判断对象属性值是否为 undefined
     *
     * <pre>
     * const obj = { item: { name: "admin" } };
     * ObjectUtils.isExistProperty(obj, "item.name")      = true;
     * ObjectUtils.isExistProperty(obj, "item.password")  = false;
     * const obj2 = null;
     * ObjectUtils.isExistProperty(obj2, "item.password") = false;
     * </pre>
     *
     * @param {any} object 待检查对象
     * @param {string} expression 属性表达式
     * @return {boolean} 如果对象为 null、undefined 或要查询的属性为 undefined 则返回 true，否则为 false
     */
    public static isExistProperty<T>(object: T, expression: string): boolean {
        if (this.nonNull(object)) {
            return false;
        }
        let propertyVal;
        for (const propertyName of expression.split(".")) {
            propertyVal = object[propertyName];
            if (propertyVal === undefined) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断对象属性值是否为 undefined
     *
     * <pre>
     * const obj = { item: { name: "admin" } };
     * ObjectUtils.isExistProperty(obj, "item.name")      = false;
     * ObjectUtils.isExistProperty(obj, "item.password")  = true;
     * const obj2 = null;
     * ObjectUtils.isExistProperty(obj2, "item.password") = true;
     * </pre>
     *
     * @param {any} object 待检查对象
     * @param {string} expression 属性表达式
     * @return {boolean} 如果对象为 null、undefined 或要查询的属性为 undefined 则返回 false，否则为 true
     */
    public static isNotExistProperty<T>(
        object: T,
        expression: string
    ): boolean {
        return !this.isExistProperty(object, expression);
    }

    /**
     * 如果传递的对象为 null 或 undefined，则返回默认值。
     *
     * @param {any} value 待取值变量
     * @param {any} defaultVal 变量默认值
     * @return {any} 如果不为 null 或 undefined 则返回对象，否则返回默认值
     */
    public static defaultIfNull<T>(value: T, defaultVal: T): T {
        return this.defaultIfCondition(
            value,
            defaultVal,
            this.nonNull(value)
        );
    }

    /**
     * 条件取值，如果取值条件不成立则返回默认值
     *
     * @param {any} value 对象
     * @param {any} defaultVal 默认值
     * @param {boolean || function} condition 取值条件
     * @return {any} 条件成立则返回此变量，否则返回默认值
     */
    public static defaultIfCondition<T>(
        value: T,
        defaultVal: T,
        condition: boolean | ((value) => boolean)
    ): T {
        if (typeof condition === "boolean") {
            return condition ? value : defaultVal;
        }
        return condition(value) ? value : defaultVal;
    }

    /**
     * 返回给定参数中第一个不为 null 或 undefined 的值
     *
     * @param {any[]} values 待测试的一组值，可能是 null 或 undefined
     * @returns {boolean} 给定参数中第一个不是 null 或 undefined 的值。如果所有值都为 null、undefined 或者给定参数为 null、undefined，则返回 null
     */
    public static firstNonNull<T>(...values: T[]): unknown {
        if (this.nonNull(values)) {
            return this.defaultIfNull(
                values.find((value) => this.nonNull(value)),
                null
            );
        }
        return null;
    }

    /**
     * 检查给定参数中是否存在非空值
     *
     * @param {any[]} values 待测试的一组值，可能是 null 或 undefined
     * @returns {boolean} 如果在给定参数中至少存在一个非空值则返回 true，
     * 如果给定参数中的所有值都是空值，则返回 false
     */
    public static anyNotNull<T>(...values: T[]): boolean {
        return this.firstNonNull(values) != null;
    }

    /**
     * 检查给定参数中是否存在空值
     *
     * @param {any[]} values 待测试的一组值，可能是 null 或 undefined
     * @returns {boolean} 如果在给定参数中至少存在一个空值则返回 true，
     * 如果给定参数中的所有值都是非空值，则返回 false
     */
    public static anyNull<T>(...values: T[]): boolean {
        if (this.isNull(values)) {
            return true;
        }
        return values.some((value) => this.isNull(value));
    }

    /**
     * 检查给定参数中的所有值是否都不为空值
     *
     * @param {any[]} values 待测试的一组值，可能是 null 或 undefined
     * @returns {boolean} 如果给定参数中存在至少一个空值或给定参数是空值则返回 false，
     * 如果给定参数中的所有值都不是空值则返回 true。
     */
    public static allNotNull<T>(...values: T[]): boolean {
        if (this.isNull(values)) {
            return false;
        }
        return values.every((value) => this.nonNull(value));
    }

    /**
     * 检查给定参数中的所有值是否都为空值
     *
     * @param {any[]} values
     * @returns {boolean} 如果给定参数中存在至少一个非空值或给定参数是非空值则返回 false，
     * 如果给定参数中的所有值都是空值则返回 true。
     */
    public static allNull<T>(...values: T[]): boolean {
        if (this.isNull(values)) {
            return true;
        }
        return values.every((value) => this.isNull(value));
    }

    /**
     * 比较两个对象是否相等，其中一个或两个对象可能为空值。
     *
     * @param {any} value1 第一个对象，可能为 null 或 undefined
     * @param {any} value2 第二个对象，可能为 null 或 undefined
     * @return {boolean} 如果两个对象的值相同，则为 true
     */
    public static equals<T>(value1: T, value2: T): boolean {
        if (value1 === value2) {
            return true;
        }
        if (ObjectUtils.anyNull(value1, value2)) {
            return false;
        }
        return Object.is(value1, value2);
    }

    /**
     * 比较两个对象是否不相等，其中一个或两个对象可能为空。
     *
     * @param {any} value1 第一个对象，可能为 null 或 undefined
     * @param {any} value2 第二个对象，可能为 null 或 undefined
     * @return {boolean} 如果两个对象的值相同，则为 false
     */
    public static notEqual<T>(value1: T, value2: T): boolean {
        return !this.equals(value1, value2);
    }

    /**
     * 返回传入对象的字符串表示。
     *
     * @param {any} value
     * @param {string} nullStr
     * @return {string} 传入 value 的{@link Object.toString}，如果为 null，则返回 nullStr
     */
    public static toString<T>(value: T, nullStr = ""): string {
        return this.isNull(value) ? nullStr : value.toString();
    }

    /**
     * 找出最常出现的项目
     *
     * @param {any[]} items 检查项
     * @return {any} 出现次数最最多的项，如果不唯一或检查项为空，则返回 null
     */
    public static mode<T>(...items: T[]): T | null {
        if (this.isNotEmpty(items)) {
            const occurrences = new Map();
            for (const item of items) {
                const count = occurrences.get(item);
                if (count == null) {
                    occurrences.set(item, 1);
                } else {
                    count.increment();
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
     * 浅克隆目标对象
     *
     * @param {any} obj 待克隆对象
     * @return {any} 克隆的对象，如果输入为null则为null
     */
    public static clone<T>(obj: T): T {
        if (this.isNull(obj) || this.isBasicType(obj)) {
            return obj;
        }

        const newObj = Array.isArray(obj) ? [] : {};
        return Object.assign(newObj, obj);
    }

    /**
     * 深克隆目标对象
     *
     * @param {any} obj 待克隆对象
     * @return {any} 克隆的对象，如果输入为null则为null
     */
    public static deepClone<T>(obj: T): T {
        if (this.isNull(obj) || this.isBasicType(obj)) {
            return obj;
        }

        const newObj = Array.isArray(obj) ? [] : {};
        for (const propName of Object.getOwnPropertyNames(obj)) {
            newObj[propName] = this.deepClone(obj[propName]);
        }
        return newObj as T;
    }

    /**
     * 是否为基础类型
     *
     * @param {any} value 待判断的值
     */
    public static isBasicType<T>(value: T): boolean {
        return (
            this.isNull(value) ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            typeof value === "symbol"
        );
    }

    /**
     * 判断对象是否为对象
     *
     * @param {any} value 对象值，不可以为空或未定义
     * @param {Function[]} types 待比较类型
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isAnyType<T>(value: T, types: Function[]): boolean {
        return types.some((type) => value instanceof type);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {
    }
}
