import {ObjectUtils} from "./ObjectUtils";
import {RandomUtils} from "./RandomUtils";
import {IllegalArgumentError, IndexOutOfBoundsError} from "../core/runtimeError";
import {Predicate, Comparator} from "../core/TypeAlias";

/**
 * 数组工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ArrayUtils {
    static INDEX_NOT_FOUND = -1;

    /**
     * <p>复制给定数组并将给定元素添加到新数组的末尾。</p>
     *
     * <p>新数组包含输入数组的相同元素加上最后位置的给定元素。</p>
     *
     * <p>如果输入数组为 null 或 undefined，则返回一个新的元素数组</p>
     *
     * <pre>
     * ArrayUtils.add(null, null)      = IllegalArgumentException
     * ArrayUtils.add(null, "a")       = ["a"]
     * ArrayUtils.add(["a"], null)     = ["a", null]
     * ArrayUtils.add(["a"], "b")      = ["a", "b"]
     * ArrayUtils.add(["a", "b"], "c") = ["a", "b", "c"]
     * </pre>
     *
     * @param array 将元素添加到的数组，可能是 null 或 undefined
     * @param element 要添加的元素，可能是 null 或 undefined
     * @return {} 包含现有元素和新元素的新数组
     * 如果两者都为 null 或 undefined，则抛出{@link IllegalArgumentError}
     * @throws {IllegalArgumentError} 如果两个参数都为 null 或 undefined
     */
    public static add<T>(array: T[], element: T): T[] {
        if (ObjectUtils.isNull(array)) {
            if (ObjectUtils.isNull(element)) {
                throw new IllegalArgumentError("参数不能同时为 null 或 undefined");
            }
            return [element];
        }
        const newArray = [...array];
        newArray[newArray.length - 1] = element;
        return newArray;
    }

    /**
     * <p>将给定数组的所有元素添加到一个新数组中。
     * <p>新数组包含 array1 的所有元素，后跟所有元素 array2。
     * 当返回一个数组时，它始终是一个新数组。
     *
     * <pre>
     * ArrayUtils.addAll(null, null)     = null
     * ArrayUtils.addAll(array1, null)   = cloned copy of array1
     * ArrayUtils.addAll(null, array2)   = cloned copy of array2
     * ArrayUtils.addAll([], [])         = []
     * ArrayUtils.addAll([null], [null]) = [null, null]
     * ArrayUtils.addAll(["a", "b", "c"], ["1", "2", "3"]) = ["a", "b", "c", "1", "2", "3"]
     * </pre>
     *
     * @param array1 其元素添加到新数组的第一个数组可能是 null 或 undefined
     * @param array2 其元素添加到新数组的第二个数组可能是 null 或 undefined
     * @return 如果两个数组都是 null 或 undefined，新数组则为 null。
     */
    public static addAll<T>(array1: T[], ...array2: T[]): T[] {
        if (ObjectUtils.isNull(array1)) {
            return this.clone(array2);
        }
        if (ObjectUtils.isNull(array2)) {
            return this.clone(array1);
        }
        return [...array1, ...array2];
    }

    /**
     * 复制给定数组并将给定元素添加到新数组的开头。
     *
     * <p>新数组包含输入数组的相同元素以及第一个位置的给定元素。</p>
     *
     * <p>
     * 如果输入数组为 null 或 undefined，则返回一个新的元素数组
     * </p>
     *
     * <pre>
     * ArrayUtils.addFirst(null, null)      = IllegalArgumentException
     * ArrayUtils.addFirst(null, "a")       = ["a"]
     * ArrayUtils.addFirst(["a"], null)     = [null, "a"]
     * ArrayUtils.addFirst(["a"], "b")      = ["b", "a"]
     * ArrayUtils.addFirst(["a", "b"], "c") = ["c", "a", "b"]
     * </pre>
     *
     * @param array 将元素添加到的数组，可能是 null 或 undefined
     * @param element 要添加的元素，可能是 null 或 undefined
     * @return 包含现有元素和新元素的新数组，返回的数组类型将是输入数组的类型（除非为 null 或 undefined）。
     * 如果两者都为 null 或 undefined，则抛出{@link IllegalArgumentError}
     * @throws {IllegalArgumentError} 如果两个参数都为 null 或 undefined
     */
    public static addFirst<T>(array: T[], element: T): T[] {
        return ObjectUtils.isNull(array) ? this.add(array, element) : this.insert(0, array, element);
    }

    /**
     * <p>浅层克隆，并处理 null 或 undefined 的数组。
     *
     * <p>数组中的元素没有被克隆，因此对多维数组没有特殊处理。
     *
     * <p>此方法对 null 或 undefined 输入数组返回 null。
     *
     * @param array 要浅克隆的数组，可能是 null 或 undefined
     * @return 克隆的数组，null 如果 null 或 undefined 输入
     */
    public static clone<T>(array: T[]): T[] {
        if (ObjectUtils.isNull(array)) {
            return null;
        }
        return [...array];
    }

    /**
     * <p>深层克隆，并处理 null 或 undefined 的数组。
     *
     * <p>数组中的元素会被克隆，因此对多维数组有特殊处理。
     *
     * <p>此方法对 null 或 undefined 输入数组返回 null。
     *
     * @param array 要深克隆的数组，可能是 null 或 undefined
     * @return 深克隆的数组，null 如果 null 或 undefined 输入
     */
    public static deepClone<T>(array: T[]): T[] {
        if (ObjectUtils.isNull(array)) {
            return null;
        }
        return array.map((item) => ObjectUtils.deepClone(item));
    }

    /**
     * <p>检查指定元素或符合条件的元素是否在给定的数组中。
     *
     * <p>如果传入 null 或 undefined 数组，则该方法返回 false。
     *
     * @param array 要搜索的数组
     * @param elementToFind 要寻找的元素或谓词函数，函数数组请使用谓词方式
     * @param fromIndex 开始搜索的索引，默认为 0
     * @return 如果数组包含元素则返回 true
     */
    public static contains<T>(array: T[],
                              elementToFind: Predicate<T> | T,
                              fromIndex = 0): boolean {
        return this.indexOf(array, elementToFind, fromIndex) !== -1;
    }

    /**
     * 如果索引超出范围，则获取数组的第 n 个元素或默认值。
     *
     * @param array 要索引的数组
     * @param index 索引
     * @param defaultValue 给定索引超出范围的返回值
     * @return 如果索引超出范围，则为数组的第 n 个元素或默认值。
     */
    public static get<T>(array: T[], index: number, defaultValue = null): T {
        return this.isArrayIndexValid(array, index) ? array[index] : defaultValue;
    }

    /**
     * <p>返回指定数组的长度。
     *
     * <p>如果输入数组为 null 或 undefined，则返回 0。
     *
     * <pre>
     * ArrayUtils.getLength(null)            = 0
     * ArrayUtils.getLength([])              = 0
     * ArrayUtils.getLength([null])          = 1
     * ArrayUtils.getLength([true, false])   = 2
     * ArrayUtils.getLength([1, 2, 3])       = 3
     * ArrayUtils.getLength(["a", "b", "c"]) = 3
     * </pre>
     *
     * @param array 要从中检索长度的数组，可能为 null 或 undefined
     * @return 数组的长度，如果数组是 null，则为 0
     */
    public static getLength<T>(array: T[]): number {
        if (ObjectUtils.isNull(array)) {
            return 0;
        }
        return array.length;
    }

    /**
     * 从给定索引开始查找数组中给定值或符合条件的索引。
     *
     * <p>此方法为 null 或 undefined 输入数组时，返回一个空的数组。</p>
     *
     * <p>负的 startIndex 被视为零。大于数组长度的 startIndex 将返回一个空的数组</p>
     *
     * @param array 要搜索元素的数组，可能是 null 或 undefined
     * @param elementToFind 要寻找的元素或谓词函数，函数数组请使用谓词方式
     * @param startIndex 开始搜索的索引
     * @return 数组中值的所有索引的数组，如果未找到 或 输入为 null 数组则返回空数组
     */
    public static indexesOf<T>(array: T[],
                               elementToFind: Predicate<T> | T,
                               startIndex = 0): number[] {
        const indexes = [];

        if (ObjectUtils.isNull(array)) {
            return indexes;
        }

        let index = startIndex;
        while (index < array.length) {
            index = this.indexOf(array, elementToFind, index);

            if (index === this.INDEX_NOT_FOUND) {
                break;
            }

            indexes.push(index);
            ++startIndex;
        }

        return indexes;
    }

    /**
     * <p>从给定索引开始查找数组中给定值或符合搜索条件的索引。
     *
     * <p>此方法为 null 或 undefined 输入数组返回 {@link INDEX_NOT_FOUND}。
     *
     * <p>负的 startIndex 被视为 0。大于数组长度的 startIndex 将返回 {@link INDEX_NOT_FOUND}。
     *
     * @param array 要搜索元素的数组，可能是 null 或 undefined
     * @param search 要搜索的值或谓词函数，函数数组请使用谓词方式
     * @param fromIndex 开始搜索的索引
     * @return 数组中值的索引，如果未找到或 null 或 undefined 数组输入则为 {@link INDEX_NOT_FOUND}
     */
    public static indexOf<T>(
        array: T[],
        search: Predicate<T> | T,
        fromIndex = 0
    ): number {
        if (ObjectUtils.isNull(array)) {
            return this.INDEX_NOT_FOUND;
        }

        if (fromIndex < 0) {
            fromIndex = 0;
        }

        if (typeof search === "function") {
            const predicate = search as Predicate<T>;
            return array.findIndex(((value, index, obj) => predicate(value, index, obj)));
        } else {
            return array.indexOf(search as T, fromIndex);
        }
    }

    /**
     * <p>将元素插入到给定索引处的数组中（从 0 开始）。</p>
     *
     * <p>当返回一个数组时，它始终是一个新数组。</p>
     *
     * <pre>
     * ArrayUtils.insert(index, null, null)      = null
     * ArrayUtils.insert(index, array, null)     = cloned copy of 'array'
     * ArrayUtils.insert(index, null, values)    = null
     * </pre>
     *
     * @param index array 中插入新值的位置
     * @param array 插入值的数组，可能是 null 或 undefined
     * @param values 要插入的新值，可能是 null
     * @return {} 新数组
     * @throws {IndexOutOfBoundsError} 如果提供了 array 并且 index < 0 或 index > array.length
     */
    public static insert<T>(index: number, array: T[], ...values: T[]): T[] {
        if (ObjectUtils.isNull(array)) {
            return [];
        }
        if (this.isEmpty(values)) {
            return [...array];
        }
        if (index < 0 || index > array.length) {
            throw new IndexOutOfBoundsError("索引: " + index + ", 长度: " + array.length);
        }

        const newArray = [];
        for (let i = 0; index < array.length; i++) {
            newArray.push(array[i]);
            if (i === index) {
                newArray.push(...values);
            }
        }
        return newArray;
    }

    /**
     * 返回是否可以在给定索引处安全地访问给定数组。
     *
     * <pre>
     * ArrayUtils.isArrayIndexValid(null, 0)       = false
     * ArrayUtils.isArrayIndexValid([], 0)         = false
     * ArrayUtils.isArrayIndexValid(["a"], 0)      = true
     * </pre>
     *
     * @param array 要检查的数组，可能为 null 或 undefined
     * @param index 要检查的数组的索引
     * @return {} 给定的索引在给定的数组中是否可以安全访问
     */
    public static isArrayIndexValid<T>(array: T[], index: number): boolean {
        return index >= 0 && this.getLength(array) > index;
    }

    /**
     * <p>检查数组是否为空、 null 或 undefined。
     *
     * @param array 要测试的数组
     * @return true 如果数组为空、 null 或 undefined。
     */
    public static isEmpty<T>(array: T[]): boolean {
        return this.getLength(array) === 0;
    }

    /**
     * <p>检查数组是否不为空且不为 null 且不为 undefined
     *
     * @param array 要测试的数组
     * @return rue 如果数组不为空且不为 null 且不为 undefined。
     */
    public static isNotEmpty<T>(array: T[]): boolean {
        return !this.isEmpty(array);
    }

    /**
     * <p>检查两个数组的长度是否相同，将 null 或 undefined 数组视为长度 0。
     *
     * @param array1 第一个数组，可能是 null 或 undefined
     * @param array2 第二个数组，可能是 null 或 undefined
     * @return true 如果数组长度匹配，将 null 或 undefined 视为空数组
     */
    public static isSameLength<T>(array1: T[], array2: T[]): boolean {
        return this.getLength(array1) === this.getLength(array2);
    }

    /**
     * <p>此方法检查提供的数组是否根据提供的 {@code Comparator} 排序。
     *
     * @param array the array to check
     * @param comparator
     * @return whether the array is sorted
     * @since 3.4
     */
    public static isSorted<T>(array: T[], comparator: Comparator<T>): boolean {
        if (ObjectUtils.isNull(comparator)) {
            throw new IllegalArgumentError("元素比较函数不应该为 null 或 undefined。");
        }

        if (ObjectUtils.isNull(array) || array.length < 2) {
            return true;
        }

        let previous = array[0];
        for (let i = 1; i < array.length; i++) {
            const current = array[i];
            if (comparator(previous, current) > 0) {
                return false;
            }

            previous = current;
        }
        return true;
    }


    /**
     * 从给定索引开始查找数组中给定对象的最后一个索引。<br />
     * 负的 fromIndex 将返回 -1。大于数组长度的 fromIndex 将从数组的末尾开始搜索。
     *
     * @param array 要搜索对象的数组，可能为null
     * @param predicate 测试函数
     * @param fromIndex 开始搜索的索引
     * @return {number} 数组中查找对象的索引，如果未找到或为 null 数组则返回 -1
     */
    public static lastIndexOf<T>(
        array: T[],
        predicate: (value: T, index?: number, obj?: T[]) => boolean,
        fromIndex?: number
    ): number;
    /**
     * 从给定索引开始查找数组中给定对象的最后一个索引。<br />
     * 负的 fromIndex 将返回 -1。大于数组长度的 fromIndex 将从数组的末尾开始搜索。
     *
     * @param array 要搜索对象的数组，可能为null
     * @param searchElement 要查找的元素，可能为null
     * @param fromIndex 开始搜索的索引
     * @return {number} 数组中查找对象的索引，如果未找到或为 null 数组则返回 -1
     */
    public static lastIndexOf<T>(
        array: T[],
        searchElement: T,
        fromIndex?: number
    ): number;
    public static lastIndexOf<T>(
        array: T[],
        searchElement: unknown,
        fromIndex = 0
    ): number {
        if (ObjectUtils.isNull(array) || fromIndex < 0) {
            return -1;
        }

        if (fromIndex >= array.length) {
            fromIndex = array.length - 1;
        }
        if (typeof searchElement === "function") {
            for (let i = array.length - 1; i >= fromIndex; i--) {
                if (searchElement(array[i], i, array)) {
                    return i;
                }
            }
            return -1;
        } else {
            return array.lastIndexOf(searchElement as T, fromIndex);
        }
    }

    /**
     * 如果数组为 null，则返回一个空数组。
     *
     * @param array 要检查的数组，可能为 null
     * @return {Array} 相同的数组，如果为 null, 则返回空数组
     */
    public static nullToEmpty<T>(array: T[]): T[] {
        return ObjectUtils.defaultIfNull(array, []);
    }

    /**
     * 从指定数组中移除指定位置的元素。 所有后续元素都向左移动（从它们的索引中减去一）。
     * 如果输入数组为 null ，则将抛出 Error，因为在这种情况下无法指定有效索引。
     *
     * @param array 要从中删除元素的数组，不能为null
     * @param index 要删除的元素的位置或测试函数
     * @return {any} 已删除的元素, 如果未删除元素则返回undefined
     * @throws {RangeError} 如果索引超出范围（index < 0 || index >= array.length）。
     * @throws {Error} 如果数组为null
     */
    public static remove<T>(array: T[], index: number): T;
    /**
     * 从指定数组中移除指定位置的元素。 所有后续元素都向左移动（从它们的索引中减去一）。
     * 如果输入数组为 null ，则将抛出 Error，因为在这种情况下无法指定有效索引。
     *
     * @param array 要从中删除元素的数组，不能为null
     * @param predicate 测试函数
     * @return {any} 已删除的元素, 如果未删除元素则返回undefined
     * @throws {RangeError} 如果索引超出范围（index < 0 || index >= array.length）。
     * @throws {Error} 如果数组为null
     */
    public static remove<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T;
    public static remove<T>(array: T[], index: unknown): T {
        if (ObjectUtils.isNull(array)) {
            throw new Error("数组不可为null");
        }

        let removeIndex;
        if (typeof index === "function") {
            removeIndex = array.findIndex((value, index1, obj) => index(value, index, obj));
            if (removeIndex === -1) {
                return null;
            }
        } else if (typeof index === "number") {
            removeIndex = index;
            const length = this.getLength(array);
            if (index < 0 || index >= length) {
                throw new RangeError("索引: " + index + ", 数组长度: " + length);
            }
        }

        const result = array.splice(removeIndex, 1);
        return ObjectUtils.defaultIfCondition(result[0], undefined, this.isNotEmpty(result));
    }

    /**
     * 从指定数组中移除指定位置的元素。 所有剩余的元素都向左移动。
     * 此方法返回一个新数组，该数组具有与输入数组相同的元素。
     *
     * @param array 要从中删除元素的数组，可能为null
     * @param indices 要删除的元素的位置
     * @return {Array} 一个新数组，包含除指定位置的元素之外的现有元素。如果数组为null，则返回null
     */
    public static removeAll<T>(array: T[], ...indices: number[]): T[] {
        if (ObjectUtils.isNull(array)) {
            return null;
        }
        return array.filter((value, index) => !indices.includes(index));
    }

    /**
     * 从指定数组中以指定数量删除指定元素的出现次数。所有后续元素都向左移动。
     * 对于指定数量大于原始数组中包含的数量的任何要删除的元素，除了删除现有的匹配项之外不会发生任何更改。
     * 此方法返回一个新数组，该数组具有与输入数组相同的元素。
     *
     * @param array 要从中删除元素的数组，可能为null
     * @param predicate 测试函数
     * @return {Array} 一个包含现有元素的新数组。
     */
    public static removeElements<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T[];
    /**
     * 从指定数组中以指定数量删除指定元素的出现次数。所有后续元素都向左移动。
     * 对于指定数量大于原始数组中包含的数量的任何要删除的元素，除了删除现有的匹配项之外不会发生任何更改。
     * 此方法返回一个新数组，该数组具有与输入数组相同的元素。
     *
     * @param array 要从中删除元素的数组，可能为null
     * @param values 要删除的元素
     * @return {Array} 一个包含现有元素的新数组。如果数组为null，则返回null
     */
    public static removeElements<T>(array: T[], ...values: T[]): T[];
    public static removeElements<T>(array: T[], values: unknown): T[] {
        if (ObjectUtils.isNull(array)) {
            return null;
        }

        if (typeof values === "function") {
            return array.filter((value, index, obj) => !values(value, index, obj));
        } else if (Array.isArray(values)) {
            return array.filter(value => !values.includes(value));
        }
    }

    /**
     * 反转给定范围内给定数组的顺序。如果数组为null，则不生效
     *
     * @param array 要反转的数组，可能为null
     * @param startIndex 起始索引。低于(< 0) 被提升为 0，高于(> array.length) 没有变化。
     * @param endIndex 数组中反转直到 endIndex - 1 的元素。
     * 低于(< 起始索引)不会导致任何变化，超过(>array.length) 被降级为数组长度。
     */
    public static reverse<T>(
        array: T[],
        startIndex = 0,
        endIndex = array.length
    ): void {
        if (ObjectUtils.isNull(array)) {
            return;
        }

        let i = startIndex < 0 ? 0 : startIndex;
        let j = Math.min(array.length, endIndex) - 1;
        while (j > i) {
            const tmp = array[j];
            array[j] = array[i];
            array[i] = tmp;
            j--;
            i++;
        }
    }

    /**
     * 移动给定数组中一系列元素的顺序。多维数组没有特殊处理。对 null 或空数组不执行任何操作。
     *
     * @param array 要移动的数组，可能为 null
     * @param offset 旋转元素的位置数。如果偏移量大于要旋转的元素数，则有效偏移量以要旋转的元素数为模
     * @param startIndex 起始索引。低于(< 0) 被提升为 0，高于 (> array.length) 导致没有变化。
     * @param endIndex 数组中移动直到 endIndex - 1 的元素。
     * 低于（< 起始索引）导致没有变化。高于 (> array.length) 被降级为数组长度。
     */
    public static shift<T>(
        array: T[],
        offset: number,
        startIndex = 0,
        endIndex = array.length
    ): void {
        if (ObjectUtils.isNull(array)) {
            return;
        }
        if (startIndex >= array.length - 1 || endIndex <= 0) {
            return;
        }

        if (startIndex < 0) {
            startIndex = 0;
        }
        if (endIndex >= array.length) {
            endIndex = array.length;
        }
        let n = endIndex - startIndex;
        if (n <= 1) {
            return;
        }
        offset %= n;
        if (offset < 0) {
            offset += n;
        }

        while (n > 1 && offset > 0) {
            const n_offset = n - offset;

            if (offset > n_offset) {
                this.swap(
                    array,
                    startIndex,
                    startIndex + n - n_offset,
                    n_offset
                );
                n = offset;
                offset -= n_offset;
            } else if (offset < n_offset) {
                this.swap(array, startIndex, startIndex + n_offset, offset);
                startIndex += offset;
                n = n_offset;
            } else {
                this.swap(array, startIndex, startIndex + n_offset, offset);
                break;
            }
        }
    }


    /**
     * 使用 Fisher-Yates 算法随机排列指定数组的元素。
     *
     * @param array 要洗牌的数组
     */
    public static shuffle<T>(array: T[]): void {
        for (let i = array.length; i > 1; i--) {
            this.swap(array, i - 1, RandomUtils.randomInteger(i, 1), 1);
        }
    }

    /**
     * 生成一个包含开始和结束索引之间的元素的新数组。<br />
     * 开始索引是包含的，结束索引是不包含的。<br />
     * 空数组输入产生空输出。
     *
     * @param array 数组
     * @param startIndex 起始索引。 低于 (< 0) 被提升为 0，高于 (> array.length) 导致空数组。
     * @param endIndex 返回的子数组中存在直到 endIndex - 1 的元素。
     * 低于 (< startIndex) 产生空数组，高于 (> array.length) 被降级为数组长度。
     * @return {} 一个包含开始和结束索引之间的元素的新数组。
     *
     * @see Array.slice
     */
    public static subarray<T>(
        array: T[],
        startIndex: number,
        endIndex: number
    ): T[] | null {
        if (array == null) {
            return null;
        }

        if (startIndex < 0) {
            startIndex = 0;
        }
        if (endIndex > array.length) {
            endIndex = array.length;
        }

        const newLength = endIndex - startIndex;
        if (newLength <= 0) {
            return [];
        }

        return array.slice(startIndex, endIndex);
    }


    /**
     * 交换给定数组中的一系列元素。<br />
     * 此方法对null或空输入数组或溢出索引不执行任何操作。<br />
     * 负指数被提升为 0（零）。 <br />
     * 如果要交换的任何子数组落在给定数组之外，则交换在数组末尾停止，并交换尽可能多的元素。
     *
     * @param array 要交换的数组，可能为null
     * @param offset1 要交换的系列中第一个元素的索引
     * @param offset2 要交换的系列中第二个元素的索引
     * @param length 从给定索引开始交换的元素数
     */
    public static swap<T>(
        array: T[],
        offset1: number,
        offset2: number,
        length = 1
    ): void {
        if (
            this.isEmpty(array) ||
            offset1 >= array.length ||
            offset2 >= array.length
        ) {
            return;
        }

        if (offset1 < 0) {
            offset1 = 0;
        }
        if (offset2 < 0) {
            offset2 = 0;
        }

        length = Math.min(
            Math.min(length, array.length - offset1),
            array.length - offset2
        );
        for (let i = 0; i < length; i++, offset1++, offset2++) {
            const tmp = array[offset1];
            array[offset1] = array[offset2];
            array[offset2] = tmp;
        }
    }

    /**
     * 将数组输出为字符串，并处理 null 值。
     *
     * @param array 数组，可能为null
     * @param stringIfNull 数组为null返回的字符串
     * @return {string} 数组的字符串表示
     */
    public static toString<T>(array: T[], stringIfNull = "[]"): string {
        if (ObjectUtils.isNull(array)) {
            return stringIfNull;
        }

        let result = "";
        for (const element of array) {
            result += `${element.toString()},`;
        }
        return "[" + result + "]";
    }

    public static toStringArray<T>(array: T[], stringIfNull = "[]"): string {
        if (ObjectUtils.isNull(array)) {
            return stringIfNull;
        }

        let result = "";
        for (const element of array) {
            result += `${element.toString()},`;
        }
        return "[" + result + "]";
    }









    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {
    }
}
