import {ObjectUtils} from "./ObjectUtils";
import {BooleanUtils} from "./BooleanUtils";
import {ArrayUtils} from "./ArrayUtils";

/**
 * 字符串工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class StringUtils {
    static readonly WHITESPACE_CHAR_CODE = " ".charCodeAt(0);
    static readonly EMPTY = " ";
    static readonly INDEX_NOT_FOUND = -1;

    /**
     * 判断该字符是否为空白字符
     *
     * @param char 要判断的字符串，只能存在一个字符
     * @return {boolean} 字符串为空白字符则返回true，否则为false
     */
    public static isWhitespace(char: string): boolean;
    /**
     * 判断该字符是否为空白字符
     *
     * @param charCode 要判断的字符串编码
     * @return {boolean} 字符串为空白字符则返回true，否则为false
     */
    public static isWhitespace(charCode: number): boolean;
    public static isWhitespace(char: unknown): boolean {
        let charCode = char;
        if (typeof char === "string") {
            charCode = char.charCodeAt(0);
        }
        return charCode <= this.WHITESPACE_CHAR_CODE;
    }

    /**
     * 判断字符串是否为空或 null
     *
     * @param str 要检查的字符串，可能为 null
     * @return {boolean} 如果字符串为空或 null，则为 true
     */
    public static isEmpty(str: string): boolean {
        return ObjectUtils.isNull(str) || str.length === 0;
    }

    /**
     * 判断字符串是否不为空且不为 null
     *
     * @param str 要检查的字符串，可能为 null
     * @return {boolean} 如果字符串不为空且不为 null，则为  true
     */
    public static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }

    /**
     * 检查是否有任何字符串为空或为 null
     *
     * @param strings 要检查的字符串，可能为 null
     * @return {boolean} 如果任何字符串为空或 null，则为 true
     */
    public static isAnyEmpty(...strings: string[]): boolean {
        if (ArrayUtils.isEmpty(strings)) {
            return false;
        }
        return strings.some((str) => this.isEmpty(str));
    }

    /**
     * 检查是否没有一个为空且或为 null
     *
     * @param strings 要检查的字符串，可能为 null
     * @return {boolean} 如果没有一个字符串为空或 null，则为 true
     */
    public static isNoneEmpty(...strings: string[]): boolean {
        return !this.isAnyEmpty(...strings);
    }

    /**
     * 检查所有字符串 是否为空 ("") 或 null
     *
     * @param strings 要检查的字符串，可能为 null
     * @return {boolean} 如果没有一个字符串为空或 null，则为 true
     */
    public static isAllEmpty(...strings: string[]): boolean {
        if (ArrayUtils.isEmpty(strings)) {
            return true;
        }
        return strings.every((str) => this.isEmpty(str));
    }

    /**
     * 检查字符串是否为空 ("")、null 或仅空白。
     *
     * @param str 要检查的字符串，可能为 null或为空
     * @return {boolean} 如果字符串为 null、空或仅空白，则为 true
     */
    public static isBlank(str: string): boolean {
        if (this.isEmpty(str)) {
            return true;
        }
        for (let i = 0; i < str.length; i++) {
            if (this.isWhitespace(str.charCodeAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断字符串是否不为空 ("")、不为空且不为空白。
     *
     * @param str 要检查的字符串，可能为 null或为空
     * @return {boolean} 如果字符串不为空且不为 null 且不为空白，则为 true
     */
    public static isNotBlank(str: string): boolean {
        return !this.isBlank(str);
    }

    /**
     * 检查是否有任何字符串为空 ("") 或 null 或仅空格。
     *
     * @param strings 要检查的字符串，可能为 null或为空
     * @return {boolean} 如果任何字符串为空或 null，则为 true
     */
    public static isAnyBlank(...strings: string[]): boolean {
        if (ArrayUtils.isEmpty(strings)) {
            return false;
        }
        return strings.some((str) => this.isBlank(str));
    }

    /**
     * 检查是否没有一个字符串为空 ("")、null 或空白
     *
     * @param strings 要检查的字符串，可能为 null或为空
     * @return {boolean} 如果没有一个字符串为空或 null 或只有空格，则为 true
     */
    public static isNoneBlank(...strings: string[]): boolean {
        return !this.isAnyBlank(...strings);
    }

    /**
     * 检查所有字符串是否为空 ("")、null 或仅空白。
     *
     * @param strings 要检查的字符串，可能为 null或为空
     * @return {boolean} 如果所有字符串都为空或 null 或只有空格，则为 true
     */
    public static isAllBlank(...strings: string[]): boolean {
        if (ArrayUtils.isEmpty(strings)) {
            return true;
        }
        return strings.every((str) => this.isBlank(str));
    }

    /**
     * 移除字符串串的两端字符的空白字符（空格、制表符、不间断空格等）和所有行终止符（LF、CR 等），字符串为 null则返回 null。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null则返回 null
     */
    public static trim(str: string): string {
        return ObjectUtils.defaultIfNull(str.trim(), null);
    }

    /**
     * 移除字符串串的两端字符的空白字符（空格、制表符、不间断空格等）和所有行终止符（LF、CR 等），字符串为 null 或空则返回 null。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null 或空则返回 null
     */
    public static trimToNull(str: string): string {
        const trimStr = this.trim(str);
        return ObjectUtils.defaultIfCondition(trimStr, null, this.isNotEmpty(trimStr));
    }

    /**
     * 移除字符串串的两端字符的空白字符（空格、制表符、不间断空格等）和所有行终止符（LF、CR 等），字符串为 null 则返回空字符串。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null 则返回空字符串
     */
    public static trimToEmpty(str: string): string {
        return ObjectUtils.defaultIfNull(str.trim(), this.EMPTY);
    }

    /**
     * 截断一个字符串。这将把“Now is the time for all good men”变成“is the time for all”。
     *
     * <p>具体来说：</p>
     * <ul>
     * <li>如果 str的长度 小于 maxWidth，则返回str.substring(offset)。<li>
     * <li>否则将其截断为 str.substring(offset, offset + maxWidth)。</li>
     * <li>如果 maxWidth 小于0 ，则抛出RangeError。</li>
     * <li>如果 offset 小于0 ，则抛出RangeError。</li>
     * <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
     * </ul>
     *
     * @param str 要检查的字符串，可能为 null
     * @param maxLength 截取字符串的最大长度，必须为正数
     * @param offset 源字符串的左偏移位置
     * @return {string} 截断的字符串，如果是空字符串则返回 null
     */
    public static truncate(str: string, maxLength: number, offset = 0): string {
        if (offset < 0) {
            throw new RangeError("偏移量不能为负数");
        }
        if (maxLength < 0) {
            throw new RangeError("最大长度不能为负数");
        }
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (offset > str.length) {
            return this.EMPTY;
        }
        if (str.length > maxLength) {
            const ix = offset + maxLength > str.length ? str.length : offset + maxLength;
            return str.substring(offset, ix);
        }
        return str.substr(offset);
    }

    /**
     * 从字符串的开头和结尾去除一组字符中的任何一个。 这与{@link trim}类似，但允许控制要去除的字符。
     * 如果字符串为 null，则返回null。如果为空字符串 ("") 则返回空字符串。
     *
     * @param str 要从中删除字符的字符串，可能为 null
     * @param stripChars 要删除的字符，null 视为空格
     * @return {string} 截断后的字符串。
     */
    public static strip(str: string, stripChars = null): string {
        if (this.isEmpty(str)) {
            return str;
        }
        return this.stripEnd(this.stripStart(str, stripChars), stripChars);
    }

    /**
     * 如果字符串在删除后为空 ("")，则从字符串的开头和结尾删除空格，返回 null。
     * 这与{@link trimToNull}类似，但删除了空格
     *
     * @param str 从中删除字符的字符串，可能为 null
     * @return {string} 截取后的字符串，如果有空格，空字符串或为 null，则返回 null。
     */
    public static stripToNull(str: string): string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        const stripStr = this.strip(str);
        return ObjectUtils.defaultIfCondition(stripStr, null, this.isNotEmpty(stripStr));
    }

    /**
     * 如果字符串在删除后为空("")，则从字符串的开头和结尾删除空格，返回空("")。
     * 这与{@link trimToEmpty}类似，但删除了空格
     *
     * @param str 从中删除字符的字符串，可能为 null
     * @return {string} 截取后的字符串，如果有空格，空字符串或为 null，则返回空("")。
     */
    public static stripToEmpty(str: string): string {
        return ObjectUtils.defaultIfNull(this.strip(str), this.EMPTY);
    }

    /**
     * 从字符串的开头去除一组字符中的任何一个。
     * 如果字符串为 null，则返回 null 。 如果为空字符串("")，则返回空字符串。
     *
     * @param str 要从中删除字符的字符串，可能为 null
     * @param stripChars 要删除的字符，null 视为空格
     * @return {string} 修整后的字符串，如果字符串为空则返回 null
     */
    public static stripStart(str: string, stripChars: string): string {
        if (this.isEmpty(str)) {
            return str;
        }
        let start = 0;
        if (ObjectUtils.isNull(stripChars)) {
            while (start != str.length && this.isWhitespace(str.charCodeAt(start))) {
                start++;
            }
        } else if (this.isEmpty(stripChars)) {
            return str;
        } else {
            while (start != str.length && stripChars.includes(str.charAt(start))) {
                start++;
            }
        }
        return str.substring(start);
    }

    /**
     * 从字符串的末尾去除一组字符中的任何一个。
     * 如果字符串为 null，则返回 null 。 如果为空字符串("")，则返回空字符串。
     *
     * @param str 要从中删除字符的字符串，可能为 null
     * @param stripChars 要删除的字符，null 视为空格
     * @return {string} 修整后的字符串，如果字符串为空则返回 null
     */
    public static stripEnd(str: string, stripChars: string): string {
        if (this.isEmpty(str)) {
            return str;
        }
        let end = str.length;
        if (ObjectUtils.isNull(stripChars)) {
            while (end != 0 && this.isWhitespace(str.charCodeAt(end - 1))) {
                end--;
            }
        } else if (this.isEmpty(stripChars)) {
            return str;
        } else {
            while (end != 0 && stripChars.includes(str.charAt(end - 1))) {
                end--;
            }
        }
        return str.substring(0, end);
    }

    /**
     * 从数组中每个字符串的开头和结尾去除一组字符中的任何一个。
     * 每次返回一个新数组，长度为零除外。数组为 null 将返回 null。空数组将返回自身。null 数组元素将被忽略。
     *
     * @param strs 要从中删除字符的数组，可能为 null
     * @return {Array} 修整后的字符串，如果数组输入为null则为空
     */
    public static stripAll(...strs: string[]): string[];
    /**
     * 从数组中每个字符串的开头和结尾去除一组字符中的任何一个。
     * 每次返回一个新数组，长度为零除外。数组为 null 将返回 null。空数组将返回自身。null 数组元素将被忽略。
     *
     * @param strs 要从中删除字符的数组，可能为 null
     * @param stripChars 要删除的字符，null 视为空格
     * @return {Array} 修整后的字符串，如果数组输入为null则为空
     */
    public static stripAll(strs: string[], stripChars: string): string[];
    public static stripAll(strs: unknown, stripChars: unknown): string[] {
        if (!Array.isArray(strs)) {
            throw new TypeError("strs 必须是数组或可变参数")
        }
        if (ObjectUtils.isNull(stripChars)) {
            stripChars = null;
        }
        if (ArrayUtils.isEmpty(strs)) {
            return strs;
        }
        const newArr = new Array(strs.length);
        for (let i = 0; i < strs.length; i++) {
            newArr[i] = this.strip(strs[i], stripChars);
        }
        return newArr;
    }

    /**
     * 比较两个字符串，如果它们表示相等的字符序列，则返回 true。
     * null 被无一例外地处理。两个 null 值被认为是相等的。比较区分大小写。
     *
     * @param str1 第一个字符串，可能为 null
     * @param str2 第二个字符串，可能为 null
     * @return {boolean} 如果字符串相等（区分大小写）或两者都为 null ，则为 true
     */
    public static equals(str1: string, str2: string): boolean {
        return this.equalsStr(str1, str2, false);
    }

    /**
     * 比较两个字符串，如果它们表示相等的字符序列，则返回 true。
     * null 被无一例外地处理。两个 null 值被认为是相等的。比较不区分大小写。
     *
     * @param str1 第一个字符串，可能为 null
     * @param str2 第二个字符串，可能为 null
     * @return {boolean} 如果字符串相等（不区分大小写）或两者都为 null ，则为 true
     */
    public static equalsIgnoreCase(str1: string, str2: string): boolean {
        return this.equalsStr(str1, str2, true);
    }

    private static equalsStr(str1: string, str2: string, ignoreCase: boolean): boolean {
        if (str1 === str2) {
            return true;
        }
        if (ObjectUtils.anyNull(str1, str2)) {
            return false;
        }
        if (str1.length !== str2.length) {
            return false;
        }

        for (let i = 0; i < str1.length; i++) {
            const str1Char = ignoreCase ? str1.charAt(i).toUpperCase() : str1.charAt(i);
            const str2Char = ignoreCase ? str2.charAt(i).toUpperCase() : str2.charAt(i);
            if (str1Char !== str2Char) {
                return false;
            }
        }
        return true;
    }

    /**
     * 比较给定字符串和待比较字符串数组，如果给定字符串等于任何的待比较字符串返回 true。
     *
     * @param str 给定字符串，可能为 null。
     * @param searchStrings 待比较字符串，可能为 null。
     * @return {boolean} 如果字符串是等于（区分大小写）的任何待比较字符串则返回 true。
     * 如果待比较字符串为 null 或等于任何待比较字符串则为 false。
     */
    public static equalsAny(str: string, ...searchStrings: string[]): boolean {
        if (ArrayUtils.isNotEmpty(searchStrings)) {
            return searchStrings.some(value => this.equals(str, value));
        }
        return false;
    }

    /**
     * 比较给定字符串和待比较字符串数组，如果给定字符串等于任何的待比较字符串返回 true。
     *
     * @param str 给定字符串，可能为 null。
     * @param searchStrings 待比较字符串，可能为 null。
     * @return {boolean} 如果字符串是等于（不区分大小写）的任何待比较字符串则返回 true。
     * 如果待比较字符串为 null 或等于任何待比较字符串则为 false。
     */
    public static equalsAnyIgnoreCase(str: string, ...searchStrings: string[]): boolean {
        if (ArrayUtils.isNotEmpty(searchStrings)) {
            return searchStrings.some(value => this.equalsIgnoreCase(str, value));
        }
        return false;
    }

    /**
     * <p>根据字典顺序比较两个字符串（null 安全版本），返回：</p>
     *  <ul>
     *  <li>= 0，如果 str1 等于 str2（或两者都为 null ）</li>
     *  <li>< 0，如果 str1 小于 str2</li>
     *  <li>> 0，如果 str1 大于 str2</li>
     * </ul>
     *
     * @param str1 要比较的字符串
     * @param str2 要比较的字符串
     * @param nullIsLess 是否考虑 null 值小于非 null 值
     * @return {number} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
     */
    public static compare(str1: string, str2: string, nullIsLess = true): number {
        return this.compareStr(str1, str2, nullIsLess, false);
    }

    /**
     * <p>根据字典顺序比较两个字符串（null 安全版本），忽略大小写差异，返回：</p>
     *  <ul>
     *  <li>= 0，如果 str1 等于 str2（或两者都为 null ）</li>
     *  <li>< 0，如果 str1 小于 str2</li>
     *  <li>> 0，如果 str1 大于 str2</li>
     * </ul>
     *
     * @param str1 要比较的字符串
     * @param str2 要比较的字符串
     * @param nullIsLess 是否考虑 null 值小于非 null 值
     * @return {number} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
     */
    public static compareToIgnoreCase(str1: string, str2: string, nullIsLess = true): number {
        return this.compareStr(str1, str2, nullIsLess, true);
    }

    private static compareStr(str1: string, str2: string, nullIsLess: boolean, ignoreCase: boolean): number {
        if (str1 === str2) {
            return 0;
        }
        if (str1 === null) {
            return nullIsLess ? -1 : 1;
        }
        if (str2 === null) {
            return nullIsLess ? 1 : -1;
        }

        const str1Len = str1.length;
        const str2Len = str2.length;
        const lim = Math.min(str1.length, str2.length);
        const char1Array = this.toCharArray(str1);
        const char2Array = this.toCharArray(str2);

        let k = 0;
        while (k < lim) {
            const char1 = ignoreCase ? char1Array[k].toUpperCase() : char1Array[k];
            const char2 = ignoreCase ? char2Array[k].toUpperCase() : char1Array[k];
            if (char1 !== char2) {
                return char1.charCodeAt(0) - char2.charCodeAt(0);
            }
            k++;
        }
        return str1Len - str2Len;
    }

    /**
     * 查找字符串中的第一个索引，处理 null。
     * null 字符串将返回 -1。
     * 负起始位置被视为0。
     * 空 ("") 搜索字符串始终匹配。
     * 大于字符串长度的起始位置仅匹配空搜索字符串。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param startPos 起始位置，负数视为 0
     * @return {number} 搜索字符串的第一个索引（总是 ≥ startPos），如果没有匹配或 字符串为 null 则返回 -1
     */
    public static indexOf(str: string, searchString: string, startPos = 0): number {
        return this.indexOfStr(str, searchString, startPos, false, false);
    }

    /**
     * 查找字符串中的第一个索引，不区分大小写。
     * null 字符串将返回 -1。
     * 负起始位置被视为0。
     * 空 ("") 搜索字符串始终匹配。
     * 大于字符串长度的起始位置仅匹配空搜索字符串。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param startPos 起始位置，负数视为 0
     * @return {number} 搜索字符串的第一个索引（总是 ≥ startPos），如果没有匹配或 字符串为 null 则返回 -1
     */
    public static indexOfIgnoreCase(str: string, searchString: string, startPos = 0): number {
        return this.indexOfStr(str, searchString, startPos, false, true);
    }

    /**
     * 查找字符串中的最后一个索引，不区分大小写。
     * null 字符串将返回 -1。
     * 负起始位置被视为0。
     * 除非起始位置为负，否则空 ("") 搜索字符串始终匹配。
     * 大于字符串长度的起始位置仅匹配空搜索字符串。搜索从 startPos 开始并向后工作；在开始位置之后开始的匹配将被忽略。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param startPos 起始位置，负数视为 0
     * @return {number} 搜索 字符串 的最后一个索引（总是≤ startPos），如果没有匹配或 字符串为 null 则返回 -1
     */
    public static lastIndexOf(str: string, searchString: string, startPos = 0): number {
        return this.indexOfStr(str, searchString, startPos, true, false);
    }

    /**
     * 查找字符串中的最后一个索引，处理 null。
     * null 字符串将返回 -1。
     * 负起始位置被视为0。
     * 除非起始位置为负，否则空 ("") 搜索字符串始终匹配。
     * 大于字符串长度的起始位置仅匹配空搜索字符串。搜索从 startPos 开始并向后工作；在开始位置之后开始的匹配将被忽略。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param startPos 起始位置，负数视为 0
     * @return {number} 搜索 字符串 的最后一个索引（总是≤ startPos），如果没有匹配或 字符串为 null 则返回 -1
     */
    public static lastIndexOfIgnoreCase(str: string, searchString: string, startPos = 0): number {
        return this.indexOfStr(str, searchString, startPos, true, true);
    }

    private static indexOfStr(str: string, searchString: string, startPos: number, lastIndex: boolean, ignoreCase: boolean) {
        if (ObjectUtils.anyNull(str, searchString)) {
            return this.INDEX_NOT_FOUND;
        }
        if (searchString.length === 0) {
            return startPos;
        }

        if (lastIndex) {
            if (!ignoreCase) {
                return str.lastIndexOf(searchString, startPos);
            }

            if (startPos > str.length - searchString.length) {
                startPos = str.length - searchString.length;
            }
            if (startPos < 0) {
                return this.INDEX_NOT_FOUND;
            }
            for (let i = startPos; i >= 0; i--) {
                if (this.regionMatches(str, i, searchString, 0, searchString.length, true)) {
                    return i;
                }
            }
        } else {
            if (!ignoreCase) {
                return str.indexOf(searchString, startPos);
            }

            if (startPos < 0) {
                startPos = 0;
            }
            const endLimit = str.length - searchString.length + 1;
            if (startPos > endLimit) {
                return this.INDEX_NOT_FOUND;
            }
            for (let i = startPos; i < endLimit; i++) {
                if (this.regionMatches(str, i, searchString, 0, searchString.length, true)) {
                    return i;
                }
            }
        }
        return this.INDEX_NOT_FOUND;
    }

    /**
     * 查找字符串中的第 n 个索引，处理 null。
     * 注意：代码在目标的开头开始寻找匹配项，在每次成功匹配后将起始索引增加 1
     * （除非searchStr是空字符串，在这种情况下，位置永远不会增加并立即返回 0）。
     * 这意味着匹配可能会重叠。
     * 字符串为 null 将返回-1。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param ordinal 要查找第 n 个 searchStr
     * @return {number} 搜索字符串的第 n 个索引，如果没有匹配或字符串为 null 则返回 -1
     */
    public static ordinalIndexOf(str: string, searchString: string, ordinal: number): number {
        return this.ordinalStrIndexOf(str, searchString, ordinal, false);
    }

    /**
     * 查找字符串中的第 n 个的最后一个索引，处理 null。
     * 字符串为 null 将返回-1。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchString 要查找的字符串，可能为 null
     * @param ordinal 要查找第 n 个的最后一个 searchStr
     * @return {number} 搜索字符串的第 n 个的最后一个索引，如果没有匹配或字符串为 null 则返回 -1
     */
    public static lastOrdinalIndexOf(str: string, searchString: string, ordinal: number): number {
        return this.ordinalStrIndexOf(str, searchString, ordinal, true);
    }

    private static ordinalStrIndexOf(str: string, searchString: string, ordinal: number, lastIndex: boolean): number {
        if (BooleanUtils.or(ObjectUtils.anyNull(str, searchString), ordinal <= 0)) {
            return this.INDEX_NOT_FOUND;
        }
        if (searchString.length === 0) {
            return lastIndex ? str.length : 0;
        }

        let found = 0;
        let index = lastIndex ? str.length : this.INDEX_NOT_FOUND;
        do {
            if (lastIndex) {
                index = str.lastIndexOf(searchString, index - 1);
            } else {
                index = str.indexOf(searchString, index + 1);
            }
            if (index < 0) {
                return index;
            }
            found++;
        } while (found < ordinal);
        return index;
    }

    /**
     * 检查字符串是否包含 searchStr，处理null。
     * null 字符串将返回 false。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStr 要查找的字符串，可能为 null
     * @return {boolean} 如果字符串包含 searchStr，则为 true，否则为 false。字符串为 null 则返回 null。
     */
    public static contains(str: string, searchStr: string): boolean {
        if (ObjectUtils.anyNull(str, searchStr)) {
            return false;
        }
        return this.indexOf(str, searchStr, 0) >= 0;
    }

    /**
     * 忽略大小写，检查字符串是否包含 searchStr，处理null。
     * null 字符串将返回 false。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStr 要查找的字符串，可能为 null
     * @return {boolean} 如果字符串包含忽略大小写的 searchStr，则为 true，否则为 false。字符串为 null 则返回 null。
     */
    public static containsIgnoreCase(str: string, searchStr: string): boolean {
        if (ObjectUtils.anyNull(str, searchStr)) {
            return false;
        }

        const strLen = searchStr.length;
        const max = str.length - strLen;
        for (let i = 0; i <= max; i++) {
            if (this.regionMatches(str, i, searchStr, 0, strLen, true)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查给定的字符串是否包含任何空白字符。
     *
     * @param str 要检查的字符串，可能为 null
     * @return {boolean} 如果字符串不为空并且包含至少 1 个（中断）空白字符，则为 true
     */
    public static containsWhitespace(str: string): boolean {
        if (this.isEmpty(str)) {
            return false;
        }

        const strLen = str.length;
        for (let i = 0; i < strLen; i++) {
            if (this.isWhitespace(str.charCodeAt(i))) {
                return true;
            }
        }
        return false;
    }

    /**
     * 找到一组潜在子串中任何一个的第一个索引。<br />
     * 字符串为 null 将返回 -1。 搜索数组如果为 null 或长度为 0 将返回 -1。
     * 搜索数组中为 null 或为 "" 的元素将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 str 的长度。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStrs 要搜索的字符串，可能为 null
     * @return {number} str 中任何 searchStrs 的最后一个索引，如果不匹配则为 -1
     */
    public static indexOfAny(str: string, ...searchStrs: string[]): number {
        if (ObjectUtils.anyNull(str, searchStrs)) {
            return this.INDEX_NOT_FOUND;
        }

        let ret = Number.MAX_VALUE;
        let tmp = 0;
        for (const searchStr of searchStrs) {
            if (ObjectUtils.isNull(searchStr)) {
                continue;
            }
            tmp = str.indexOf(searchStr, 0);
            if (tmp === this.INDEX_NOT_FOUND) {
                continue;
            }

            if (tmp < ret) {
                ret = tmp;
            }
        }

        return ret === Number.MAX_VALUE ? this.INDEX_NOT_FOUND : ret;
    }

    /**
     * 查找任何一组潜在子串的最新索引。<br />
     * 字符串为 null 将返回 -1。搜索数组如果为 null 将返回 -1。
     * 搜索数组中为null 的元素将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 0 。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStrs 要搜索的字符串，可能为 null
     * @return {number} str 中任何 searchStrs 的第一个索引，如果不匹配则为 -1
     */
    public static lastIndexOfAny(str: string, ...searchStrs: string[]): number {
        if (ObjectUtils.anyNull(str, searchStrs)) {
            return this.INDEX_NOT_FOUND;
        }

        let ret = this.INDEX_NOT_FOUND;
        let tmp = 0;
        for (const searchStr of searchStrs) {
            if (ObjectUtils.isNull(searchStr)) {
                continue;
            }
            tmp = str.lastIndexOf(searchStr, str.length);
            if (tmp > ret) {
                ret = tmp;
            }
        }
        return ret;
    }

    /**
     * 搜索字符串以查找不在给定字符集中的任何字符的第一个索引。<br />
     * 字符串为 null 将返回 -1。搜索字符串为 null或空将返回 -1。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchChars 要搜索的字符，可能为 null
     * @return {number} 任何字符的索引，如果没有匹配或字符串为 null 则返回 -1
     */
    public static indexOfAnyBut(str: string, searchChars: string): number {
        if (this.isEmpty(str) || this.isEmpty(searchChars)) {
            return this.INDEX_NOT_FOUND;
        }
        str.trimRight()
        const strLen = str.length;
        for (let i = 0; i < strLen; i++) {
            const ch = str.charAt(i);
            const chFound = searchChars.indexOf(ch, 0) >= 0;
            if (i + 1 < strLen) {
                const ch2 = str.charAt(i + 1);
                if (chFound && searchChars.indexOf(ch2, 0) < 0) {
                    return i;
                }
            } else {
                if (!chFound) {
                    return i;
                }
            }
        }
        return this.INDEX_NOT_FOUND;
    }

    /**
     * 检查字符串是否包含给定数组中的任何字符串。<br />
     * 如果字符串为 null，将返回 false。搜索数组为 null 或长度为 0 将返回 false。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStrs 要搜索的字符串数组，可能为 null。单个字符串也可以为 null。
     * @return {boolean} 如果找到任何搜索数组中的元素，则为 true ，否则为 false
     */
    public static containsAny(str: string, ...searchStrs: string[]): boolean {
        if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrs)) {
            return false;
        }
        for (const searchStr of searchStrs) {
            if (this.contains(str, searchStr)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查字符串是否仅包含某些字符。<br />
     * 如果字符串为 null，将返回 false。有效字符串为 null，将返回 false。
     * 空字符串 (str.length === 0) 始终返回 true。
     *
     * @param str 要检查的字符串，可能为 null
     * @param validChars 有效字符串，可能为 null
     * @return {boolean} 如果它只包含有效字符并且是非 null 的，则为 true
     */
    public static containsOnly(str: string, validChars: string): boolean {
        if (ObjectUtils.anyNull(str, validChars)) {
            return false;
        }
        if (str.length === 0) {
            return true;
        }
        if (validChars.length === 0) {
            return false;
        }
        return this.indexOfAnyBut(str, validChars) === this.INDEX_NOT_FOUND;
    }

    /**
     * 检查字符串是否不包含某些字符。<br />
     * 如果字符串为 null，将返回 true。无效字符串为 null，将返回 true。
     * 空字符串 (str.length === 0) 始终返回 true。
     *
     * @param str 要检查的字符串，可能为 null
     * @param invalidChars 无效字符串，可能为 null
     * @return {boolean} 如果它不包含任何无效字符或为 null，则为 true
     */
    public static containsNone(str: string, invalidChars: string): boolean {
        if (ObjectUtils.anyNull(str, invalidChars)) {
            return true;
        }

        const strLen = str.length;
        const strLast = strLen - 1;
        const searchLen = invalidChars.length;
        const searchLast = searchLen - 1;
        for (let i = 0; i < strLen; i++) {
            const ch = str.charAt(i);
            for (let j = 0; j < searchLen; j++) {
                if (invalidChars.charAt(j) === ch) {
                    if (j === searchLast) {
                        return false;
                    }
                    if (i < strLast && invalidChars.charAt(j + 1) === str.charAt(i + 1)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }



    /**
     *  * 测试两个字符串区域是否相等。参数 str 的子字符串与参数 other 的子字符串进行比较。
     * <p>
     * 如果这些子字符串表示相同的字符序列，则结果为 true，当且仅当 ignoreCase 为 true 时忽略大小写。
     * 要比较的 str 的子串从索引 strOffset 开始，长度为 length。
     * 要比较的 other 的子串从索引 otherOffset 开始，长度为 length。
     * </p>
     * 当且仅当以下至少一项为真时，结果为 false:
     * <ul>
     *  <li>strOffset 小于 0</li>
     *  <li>otherOffset 小于 0</li>
     *  <li>strOffset + length 大于 str.length</li>
     *  <li>otherOffset + length 大于 other.length</li>
     *  <li>
     *     ignoreCase 为 false 并且存在一些小于 length 的非负整数k使得：
     *     <p>str.charAt(strOffset + k) !== other.charAt(otherOffset + k)</p>
     *  </li>
     *  <li>
     *      ignoreCase 为 true 并且存在一些小于 length 非负整数k使得：
     *      <p>str.charAt(strOffset + k).toLowerCase() !== other.charAt(otherOffset + k).toLowerCase()</p>
     *      <p>和：</p>
     *      <p>str.charAt(strOffset + k).toUpperCase() !== other.charAt(otherOffset + k).toUpperCase()</p>
     *  </li>
     * </ul>
     *
     * @param str1 第一个字符串
     * @param str1Offset 第一个字符串中子区域的起始偏移量
     * @param str2 第二个字符串
     * @param str2Offset 第二个字符串中子区域的起始偏移量
     * @param length 要比较的字符数。
     * @param ignoreCase 如果为 true，则在比较字符时忽略大小写
     * @return {boolean} 如果此字符串的指定子区域与字符串参数的指定子区域匹配，则为 true；否则为 false。
     * 匹配是精确匹配还是不区分大小写取决于 ignoreCase 参数。
     */
    public static regionMatches(str1: string, str1Offset: number, str2: string, str2Offset: number, length: number, ignoreCase: boolean): boolean {
        const strArr = this.toCharArray(str1);
        let to = str1Offset;

        const otherArr = this.toCharArray(str2);
        let po = str2Offset;

        if (BooleanUtils.or(
            str1Offset < 0 || str2Offset < 0,
            str1Offset > strArr.length - length,
            str2Offset > otherArr.length - length
        )) {
            return false;
        }

        while (length-- > 0) {
            const c1 = strArr[to++];
            const c2 = otherArr[po++];
            if (c1 === c2) {
                continue;
            }
            if (ignoreCase) {
                const u1 = c1.toUpperCase();
                const u2 = c2.toUpperCase();
                if (u1 === u2) {
                    continue;
                }
                if (u1.toLowerCase() === u2.toLowerCase()) {
                    continue;
                }
            }
            return false;
        }
        return true;
    }


    /**
     * 将此字符串转换为新的字符数组。
     *
     * @param str 待转换字符串，不能为 null
     * @return {Array} 一个新分配的字符数组，其长度是这个字符串的长度，其内容被初始化为包含这个字符串所代表的字符序列。
     */
    public static toCharArray(str: string): string[] {
        const charArray = new Array(str.length);
        for (let i = 0; i < str.length; i++) {
            charArray.push(str.charAt(i));
        }
        return charArray;
    }

    /**
     * 判断是否为大写字母
     *
     * @param {String} ch 待判断字符
     * @returns {boolean} 为大写字母返回true，否则返回false
     */
    public static isUpperCase(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 65, code <= 90);
    }

    /**
     * 判断是否为大写字母
     *
     * @param {string} ch 待判断字符
     * @returns {boolean} 为大写字母返回true，否则返回false
     */
    public static isLowerCase(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 97, code <= 122);
    }

    /**
     * 下划线格式字符串转为小驼峰格式
     */
    public static underLineToCamelCase(str: string): string {
        const strArr = str.split("_");
        for (let i = 1; i < strArr.length; i++) {
            strArr[i] =
                strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
        }
        return strArr.join("");
    }

    /**
     * 小驼峰格式字符串转下划线格式
     */
    public static camelCaseToUnderLine(str: string): string {
        const newStr = [];
        const indexArr = Array.of(0);
        for (let i = 1; i < str.length; i++) {
            if (StringUtils.isUpperCase(str[i])) {
                indexArr.push(i);
            }
        }
        indexArr.forEach((value, index) => {
            newStr.push(
                str.charAt(value).toLowerCase() +
                str.substring(value + 1, indexArr[index + 1])
            );
        });
        return newStr.join("_");
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {
    }
}
