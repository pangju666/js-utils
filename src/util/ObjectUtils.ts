/**
 * 对象工具类，包含常用对象处理函数
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ObjectUtils {
    /**
     * 判断对象是否不为null
     *
     * @param value 对象
     * @return {boolean} 对象为 null 或 undefined 则返回 false，否则为 true
     */
    public static isNotNull(value: unknown): boolean {
        return value !== undefined && value !== null;
    }

    /**
     * 判断对象是否为 null
     *
     * @param value 对象
     * @return {boolean} 对象为 null 或 undefined 则返回 true，否则为 false
     */
    public static isNull(value: unknown): boolean {
        return !this.isNotNull(value);
    }

    /**
     * 判断对象属性值是否存在
     * @example
     * const obj = { item: { name: "admin" } };
     * // return true
     * ObjectUtils.isExistProperty(obj, "item.name");
     * // return false
     * ObjectUtils.isExistProperty(obj, "item.password");
     * // return false
     * const obj2 = null;
     * ObjectUtils.isExistProperty(obj2, "item.password");
     *
     * @param object 待判断对象
     * @param expression 属性表达式
     * @return {boolean} 如果对象或要查询的属性不存在则返回 true，否则为 false
     */
    public static isExistProperty(
        object: unknown,
        expression: string
    ): boolean {
        if (this.isNotNull(object)) {
            return false;
        }
        let propertyVal;
        for (const propertyName of expression.split(".")) {
            propertyVal = object[propertyName];
            if (this.isNull(propertyVal)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断对象属性值是否不存在
     * @example
     * const obj = { item: { name: "admin" } };
     * // return false
     * ObjectUtils.isExistProperty(obj, "item.name");
     * // return true
     * ObjectUtils.isExistProperty(obj, "item.password");
     * // return true
     * const obj2 = null;
     * ObjectUtils.isExistProperty(obj2, "item.password");
     *
     * @param object 待判断对象
     * @param expression 属性表达式
     * @return {boolean} 如果对象或要查询的属性不存在则返回 false，否则为 true
     */
    public static isNotExistProperty(
        object: unknown,
        expression: string
    ): boolean {
        return !this.isExistProperty(object, expression);
    }

    /**
     * 判断对象是否为空
     *
     * @param value 对象
     * @return {boolean} 对象如果为字符串或数组则判断是否为空，
     * 否则使用{@link ObjectUtils.isNull}判断对象是否为 null
     */
    public static isEmpty(value: unknown): boolean {
        if (this.isNull(value)) {
            return value != null;
        } else if (typeof value === "string" || Array.isArray(value)) {
            return value.length !== 0;
        }
        return false;
    }

    /**
     * 判断对象是否不为空
     *
     * @param value 对象
     * @return {boolean} 对象如果为字符串或数组则判断是否为空，
     * 否则使用{@link ObjectUtils.isNull}判断对象是否不为 null
     */
    public static isNotEmpty(value: unknown): boolean {
        return !this.isEmpty(value);
    }

    /**
     * 如果传递的对象为空，则返回默认值。
     *
     * @param value 待取值变量
     * @param defaultVal 变量默认值
     * @return {T} 如果不是空则返回对象，否则返回默认值
     */
    public static defaultIfNull<T>(value: T, defaultVal: T): T {
        return this.defaultIfCondition(
            value,
            defaultVal,
            this.isNotNull(value)
        );
    }

    /**
     * 条件取值，如果取值条件不成立则返回默认值
     *
     * @param value 对象
     * @param defaultVal 默认值
     * @param condition 取值条件
     * @return {T} 条件成立则返回此变量，否则返回默认值
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
     * 返回给定参数中第一个不为null的值
     *
     * @param values 要测试的值，可能是 null 或空
     * @returns {} 给定参数中第一个不是 null 的值。如果所有值都为 null 或者给定参数为 null 或空，则返回 null
     */
    public static firstNonNull(...values: unknown[]): unknown {
        if (this.isNotNull(values)) {
            for (const value of values) {
                if (this.isNotNull(value)) {
                    return value;
                }
            }
        }
        return null;
    }

    /**
     * 检查给定参数中是否存在非空值
     *
     * @param values 要测试的值，可能是 null 或空
     * @returns {} 如果在给定参数中至少存在一个非空值则返回 true，
     * 如果给定参数中的所有值都是 null、给定参数为 null 或空，则返回 false
     */
    public static anyNotNull(...values: unknown[]): boolean {
        return this.firstNonNull(values) != null;
    }

    /**
     * 检查给定参数中的所有值是否都不为null
     *
     * @param values
     * @returns {} 如果给定参数中存在至少一个 null 值或给定参数是 null 则返回 false，
     * 如果给定参数中的所有值都不是 null 或给定参数为空则返回 true。
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
     * 比较两个对象是否相等，其中一个或两个对象可能为空。
     *
     * @param value1 第一个对象，可能为 null
     * @param value2 第二个对象，可能为 null
     * @return {boolean} 如果两个对象的值相同，则为 true
     */
    public static equals(value1: unknown, value2: unknown): boolean {
        if (value1 === value2) {
            return true;
        }
        if (value1 === null || value2 === null) {
            return false;
        }
        return Object.is(value1, value2);
    }

    /**
     * 比较两个对象是否不相等，其中一个或两个对象可能为空。
     *
     * @param value1 第一个对象，可能为 null
     * @param value2 第二个对象，可能为 null
     * @return {boolean} 如果两个对象的值相同，则为 false
     */
    public static notEqual(value1: unknown, value2: unknown): boolean {
        return !this.equals(value1, value2);
    }

    /**
     * 返回传入对象的字符串表示。
     *
     * @param value
     * @param nullStr
     * @return {string} 传入 value 的{@link Object.toString}，如果为 null，则返回 nullStr
     */
    public static toString(value: unknown, nullStr = ""): string {
        return this.isNull(value) ? nullStr : value.toString();
    }

    /**
     * 找出最常出现的项目
     *
     * @param items 检查项
     * @return {T} 出现次数最最多的项，如果不唯一或检查项为空，则返回 null
     */
    public static mode<T>(...items: T[]): T {
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
     * 拷贝目标对象
     *
     * @param obj 待拷贝对象
     */
    public static clone<T>(obj: T): T {
        if (this.isBasicType(obj)) {
            return obj;
        }
        const newObject = {};
        for (const propName of Object.getOwnPropertyNames(obj)) {
            newObject[propName] = this.clone(obj[propName]);
        }
        return newObject as T;
    }

    /**
     * 如果可能，克隆一个对象。<br />
     *
     * @param obj 要克隆的对象，null 返回 null
     * @return {T} 如果对象可克隆，则返回克隆对象，不然则返回对象本身
     */
    public static cloneIfPossible<T>(obj: T): T {
        const clone = this.clone(obj);
        return this.isNull(clone) ? obj : clone;
    }

    /**
     * 是否为基础类型
     *
     * @param value 待判断的值
     */
    public static isBasicType(value: unknown): boolean {
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
     * @param value 对象值，不可以为空或未定义
     * @param types 待比较类型
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isAnyType(value: unknown, types: Function[]): boolean {
        return types.some((type) => value instanceof type);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
}
