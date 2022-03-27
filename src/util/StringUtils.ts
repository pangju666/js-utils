import {ObjectUtils} from "./ObjectUtils";
import {BooleanUtils} from "./BooleanUtils";
import {ArrayUtils} from "./ArrayUtils";
import {IllegalArgumentError} from "../core/runtimeError";
import {Supplier} from "../core/TypeAlias";

/**
 * 字符串工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class StringUtils {
    /**
     * 空字符串 ""。
     */
    public static readonly EMPTY = "";
    /**
     * 空白字符的字符串。
     */
    public static readonly SPACE = " ";
    /**
     * 表示失败的索引搜索。
     */
    public static readonly INDEX_NOT_FOUND = -1;
    /**
     * <p>填充常量可以扩展的最大大小。</p>
     */
    public static readonly PAD_LIMIT = 8192;
    /**
     * 换行符 LF ('\n', Unicode 000a)。
     */
    public static readonly LF = "\n";

    /**
     * 回车字符 CR ('\r', Unicode 000d)。
     */
    public static readonly CR = "\r";

    /**
     * <p>使用省略号缩写字符串。这会将“现在是所有好人的时候”变成“现在是...的时候了”</p>
     *
     * <p>具体来说：</p>
     * <ul>
     *   <li>如果 str 中的字符数小于或等于 maxWidth，则返回 str。</li>
     *   <li>否则将其缩写为 {@link substring}(str, 0, max-3) + "...")。</li>
     *   <li>如果 maxWidth 小于 4，则抛出 {@link IllegalArgumentError}。</li>
     *   <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
     * </ul>
     *
     * <pre>
     * StringUtils.abbreviate(null, *)      = null
     * StringUtils.abbreviate("", 4)        = ""
     * StringUtils.abbreviate("abcdefg", 6) = "abc..."
     * StringUtils.abbreviate("abcdefg", 7) = "abcdefg"
     * StringUtils.abbreviate("abcdefg", 8) = "abcdefg"
     * StringUtils.abbreviate("abcdefg", 4) = "a..."
     * StringUtils.abbreviate("abcdefg", 3) = {@link IllegalArgumentError}
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param maxWidth 结果字符串的最大长度，必须至少为 4
     * @return 缩写字符串，如果为空字符串输入则返回 null
     * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
     */
    public static abbreviate(str: string, maxWidth: number): string;
    /**
     * <p>使用省略号缩写字符串。这会将“现在是所有好人的时候”变成“现在是...的时候了”</p>
     *
     * <p>像 {@link abbreviate}(str, maxWidth) 一样工作，但允许您指定“左边缘”偏移量。
     * 请注意，此左边缘不一定是结果中最左边的字符，也不一定是椭圆后面的第一个字符，但它会出现在结果中的某个位置。
     *
     * <p>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</p>
     *
     * <pre>
     * StringUtils.abbreviate(null, *, *)                = null
     * StringUtils.abbreviate("", 0, 4)                  = ""
     * StringUtils.abbreviate("abcdefghijklmno", -1, 10) = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 0, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 1, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 4, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 5, 10)  = "...fghi..."
     * StringUtils.abbreviate("abcdefghijklmno", 6, 10)  = "...ghij..."
     * StringUtils.abbreviate("abcdefghijklmno", 8, 10)  = "...ijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", 10, 10) = "...ijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", 12, 10) = "...ijklmno"
     * StringUtils.abbreviate("abcdefghij", 0, 3)        = IllegalArgumentException
     * StringUtils.abbreviate("abcdefghij", 5, 6)        = IllegalArgumentException
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param offset 源字符串的左边缘
     * @param maxWidth 结果字符串的最大长度，必须至少为 4
     * @return 缩写字符串，如果为空字符串输入则返回 null
     * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
     */
    public static abbreviate(str: string, offset: number, maxWidth: number): string;
    /**
     * <p>使用另一个给定的字符串作为替换标记来缩写字符串。
     * 如果“...”被定义为替换标记，这会将“现在是所有好人的时候”变成“现在是...的时候了”。</p>
     *
     * <p>具体来说：</p>
     * <ul>
     *   <li>如果 str 中的字符数小于或等于 maxWidth，则返回 str。</li>
     *   <li>否则将其缩写为 {@link substring}(str, 0, max-abbrevMarker.length) + abbrevMarker)。</li>
     *   <li>如果 maxWidth 小于 abbrevMarker.length + 1，则抛出 {@link IllegalArgumentError}。</li>
     *   <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
     * </ul>
     *
     * <pre>
     * StringUtils.abbreviate(null, "...", *)      = null
     * StringUtils.abbreviate("abcdefg", null, *)  = "abcdefg"
     * StringUtils.abbreviate("", "...", 4)        = ""
     * StringUtils.abbreviate("abcdefg", ".", 5)   = "abcd."
     * StringUtils.abbreviate("abcdefg", ".", 7)   = "abcdefg"
     * StringUtils.abbreviate("abcdefg", ".", 8)   = "abcdefg"
     * StringUtils.abbreviate("abcdefg", "..", 4)  = "ab.."
     * StringUtils.abbreviate("abcdefg", "..", 3)  = "a.."
     * StringUtils.abbreviate("abcdefg", "..", 2)  = IllegalArgumentException
     * StringUtils.abbreviate("abcdefg", "...", 3) = IllegalArgumentException
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param abbrevMarker 用作替换标记的字符串
     * @param maxWidth 结果字符串的最大长度，必须至少为 abbrevMarker.length + 1
     * @return 缩写字符串，如果为空字符串输入则返回 null
     * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
     */
    public static abbreviate(str: string, abbrevMarker: string, maxWidth: number): string;
    /**
     * <p>使用给定的替换标记缩写字符串。
     * 如果“...”被定义为替换标记，这会将“现在是所有好人的时候”变成“......是时候......”。</p>
     *
     * <p>像 {@link abbreviate}(string, string, number)} 一样工作，但允许您指定“左边缘”偏移量。
     * 请注意，这个左边缘不一定是结果中最左边的字符，或者替换标记之后的第一个字符，但它会出现在结果中的某个位置。
     *
     * <p>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</p>
     *
     * <pre>
     * StringUtils.abbreviate(null, null, *, *)                 = null
     * StringUtils.abbreviate("abcdefghijklmno", null, *, *)    = "abcdefghijklmno"
     * StringUtils.abbreviate("", "...", 0, 4)                  = ""
     * StringUtils.abbreviate("abcdefghijklmno", "---", -1, 10) = "abcdefg---"
     * StringUtils.abbreviate("abcdefghijklmno", ",", 0, 10)    = "abcdefghi,"
     * StringUtils.abbreviate("abcdefghijklmno", ",", 1, 10)    = "abcdefghi,"
     * StringUtils.abbreviate("abcdefghijklmno", ",", 2, 10)    = "abcdefghi,"
     * StringUtils.abbreviate("abcdefghijklmno", "::", 4, 10)   = "::efghij::"
     * StringUtils.abbreviate("abcdefghijklmno", "...", 6, 10)  = "...ghij..."
     * StringUtils.abbreviate("abcdefghijklmno", "*", 9, 10)    = "*ghijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", "'", 10, 10)   = "'ghijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", "!", 12, 10)   = "!ghijklmno"
     * StringUtils.abbreviate("abcdefghij", "abra", 0, 4)       = IllegalArgumentException
     * StringUtils.abbreviate("abcdefghij", "...", 5, 6)        = IllegalArgumentException
     * </pre>
     *
     * @param str 要检查的字符串，可能为空
     * @param abbrevMarker 用作替换标记的字符串
     * @param offset 源字符串的左边缘
     * @param maxWidth 结果字符串的最大长度，必须至少为 4
     * @return 缩写字符串，如果为空字符串输入则返回 null
     * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
     */
    public static abbreviate(str: string, abbrevMarker: string, offset: number, maxWidth: number): string;
    static abbreviate(str: string, abbrevMarker: string | number, offset?: number, maxWidth?: number): string {
        if (maxWidth === undefined) {
            if (offset === undefined) {
                return this.abbreviate(str, abbrevMarker as number);
            }
            if (typeof abbrevMarker === "string") {
                return this.abbreviate(str, abbrevMarker, offset);
            }
            return this.abbreviate(str, abbrevMarker, offset);
        }

        if (this.isNotEmpty(str) && this.EMPTY === abbrevMarker && maxWidth > 0) {
            return this.substring(str, 0, maxWidth);
        } else if (this.isAnyEmpty(str, abbrevMarker as string)) {
            return str;
        }
        const abbrevMarkerLength = (abbrevMarker as string).length;
        const minAbbrevWidth = abbrevMarkerLength + 1;
        const minAbbrevWidthOffset = abbrevMarkerLength + abbrevMarkerLength + 1;

        if (maxWidth < minAbbrevWidth) {
            throw new IllegalArgumentError("最小缩写宽度为 " + minAbbrevWidth);
        }
        const strLen = str.length;
        if (strLen <= maxWidth) {
            return str;
        }
        if (offset > strLen) {
            offset = strLen;
        }
        if (strLen - offset < maxWidth - abbrevMarkerLength) {
            offset = strLen - (maxWidth - abbrevMarkerLength);
        }
        if (offset <= abbrevMarkerLength + 1) {
            return str.substring(0, maxWidth - abbrevMarkerLength) + abbrevMarker;
        }
        if (maxWidth < minAbbrevWidthOffset) {
            throw new IllegalArgumentError("带偏移的最小缩写宽度为 " + minAbbrevWidthOffset);
        }
        if (offset + maxWidth - abbrevMarkerLength < strLen) {
            return abbrevMarker + this.abbreviate(str.substring(offset), abbrevMarker as string, maxWidth - abbrevMarkerLength);
        }
        return abbrevMarker + str.substring(strLen - (maxWidth - abbrevMarkerLength));
    }

    /**
     * <p>将字符串缩写为传递的长度，用提供的替换字符串替换中间字符。</p>
     *
     * <p>仅当满足以下条件时才会出现此缩写：</p>
     * <ul>
     * <li>缩写字符串和替换字符串都不是 null、undefined 或空</li>
     * <li>要截断的长度小于提供的字符串的长度</li>
     * <li>要截断的长度大于 0</li>
     * <li>缩写的字符串将有足够的空间容纳提供的替换字符串的长度以及提供的缩写字符串的第一个和最后一个字符</li>
     * </ul>
     * <p>否则，返回的字符串将与提供的缩写字符串相同。
     * </p>
     *
     * <pre>
     * StringUtils.abbreviateMiddle(null, null, 0)      = null
     * StringUtils.abbreviateMiddle("abc", null, 0)      = "abc"
     * StringUtils.abbreviateMiddle("abc", ".", 0)      = "abc"
     * StringUtils.abbreviateMiddle("abc", ".", 3)      = "abc"
     * StringUtils.abbreviateMiddle("abcdef", ".", 4)     = "ab.f"
     * </pre>
     *
     * @param str 要缩写的字符串，可以为 null、undefined
     * @param middle 用于替换中间字符的字符串，可能为 null、undefined
     * @param length str 的缩写长度。
     * @return {} 如果满足上述条件，则为缩写字符串，或为缩写提供的原始字符串。
     */
    public static abbreviateMiddle(str: string, middle: string, length: number): string {
        if (this.isAnyEmpty(str, middle) || length >= str.length || length < middle.length + 2) {
            return str;
        }

        const targetSting = length - middle.length;
        const startOffset = targetSting / 2 + targetSting % 2;
        const endOffset = str.length - targetSting / 2;

        return str.substring(0, startOffset) + middle + str.substring(endOffset);
    }

    /**
     * 如果字符串尚未以任何后缀结尾，则将后缀附加到字符串的末尾。
     *
     * <pre>
     * StringUtils.appendIfMissing(null, null) = null
     * StringUtils.appendIfMissing("abc", null) = "abc"
     * StringUtils.appendIfMissing("", "xyz") = "xyz"
     * StringUtils.appendIfMissing("abc", "xyz") = "abcxyz"
     * StringUtils.appendIfMissing("abcxyz", "xyz") = "abcxyz"
     * StringUtils.appendIfMissing("abcXYZ", "xyz") = "abcXYZxyz"
     * </pre>
     *
     * <p>加上额外的后缀，</p>
     * <pre>
     * StringUtils.appendIfMissing(null, null, null) = null
     * StringUtils.appendIfMissing("abc", null, null) = "abc"
     * StringUtils.appendIfMissing("", "xyz", null) = "xyz"
     * StringUtils.appendIfMissing("abc", "xyz", new CharSequence[]{null}) = "abcxyz"
     * StringUtils.appendIfMissing("abc", "xyz", "") = "abc"
     * StringUtils.appendIfMissing("abc", "xyz", "mno") = "abcxyz"
     * StringUtils.appendIfMissing("abcxyz", "xyz", "mno") = "abcxyz"
     * StringUtils.appendIfMissing("abcmno", "xyz", "mno") = "abcmno"
     * StringUtils.appendIfMissing("abcXYZ", "xyz", "mno") = "abcXYZxyz"
     * StringUtils.appendIfMissing("abcMNO", "xyz", "mno") = "abcMNOxyz"
     * </pre>
     *
     * @param str 字符串。
     * @param suffix 附加到字符串末尾的后缀。
     * @param suffixes 作为有效终止符的附加后缀。
     * @return {} 如果附加了后缀，则为新字符串，否则为相同的字符串。
     */
    public static appendIfMissing(str: string, suffix: string, ...suffixes: string[]): string {
        if (ObjectUtils.isNull(str) || this.isEmpty(suffix) || this.endsWith(str, suffix, false)) {
            return str;
        }
        if (ArrayUtils.isNotEmpty(suffixes)) {
            for (let i = 0; i < suffixes.length; i++) {
                if (this.endsWith(str, suffix.charAt(i), false)) {
                    return str;
                }
            }
        }
        return str + suffix.toString();
    }

    /**
     * 如果字符串尚未结束，则将后缀附加到字符串的末尾，不区分大小写，带有任何后缀。
     *
     * <pre>
     * StringUtils.appendIfMissingIgnoreCase(null, null) = null
     * StringUtils.appendIfMissingIgnoreCase("abc", null) = "abc"
     * StringUtils.appendIfMissingIgnoreCase("", "xyz") = "xyz"
     * StringUtils.appendIfMissingIgnoreCase("abc", "xyz") = "abcxyz"
     * StringUtils.appendIfMissingIgnoreCase("abcxyz", "xyz") = "abcxyz"
     * StringUtils.appendIfMissingIgnoreCase("abcXYZ", "xyz") = "abcXYZ"
     * </pre>
     * <p>加上额外的后缀，</p>
     * <pre>
     * StringUtils.appendIfMissingIgnoreCase(null, null, null) = null
     * StringUtils.appendIfMissingIgnoreCase("abc", null, null) = "abc"
     * StringUtils.appendIfMissingIgnoreCase("", "xyz", null) = "xyz"
     * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", new CharSequence[]{null}) = "abcxyz"
     * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", "") = "abc"
     * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", "mno") = "abcxyz"
     * StringUtils.appendIfMissingIgnoreCase("abcxyz", "xyz", "mno") = "abcxyz"
     * StringUtils.appendIfMissingIgnoreCase("abcmno", "xyz", "mno") = "abcmno"
     * StringUtils.appendIfMissingIgnoreCase("abcXYZ", "xyz", "mno") = "abcXYZ"
     * StringUtils.appendIfMissingIgnoreCase("abcMNO", "xyz", "mno") = "abcMNO"
     * </pre>
     *
     * @param str 字符串。
     * @param suffix 附加到字符串末尾的后缀。
     * @param suffixes 作为有效终止符的附加后缀。
     * @return {} 如果附加了后缀，则为新字符串，否则为相同的字符串。
     */
    public static appendIfMissingIgnoreCase(str: string, suffix: string, ...suffixes: string[]): string {
        if (ObjectUtils.isNull(str) || this.isEmpty(suffix) || this.endsWith(str, suffix, true)) {
            return str;
        }
        if (ArrayUtils.isNotEmpty(suffixes)) {
            for (let i = 0; i < suffixes.length; i++) {
                if (this.endsWith(str, suffix.charAt(i), true)) {
                    return str;
                }
            }
        }
        return str + suffix.toString();
    }

    /**
     * <p>将一个字符串居中在一个较大的 size 大小的字符串中。
     * 使用提供的字符串作为填充字符串的值。</p>
     *
     * <p>如果大小小于字符串长度，则返回字符串。null、undefined 字符串返回 null。负大小被视为零。</p>
     *
     * <pre>
     * StringUtils.center(null, *, *)     = null
     * StringUtils.center("", 4, " ")     = "    "
     * StringUtils.center("ab", -1, " ")  = "ab"
     * StringUtils.center("ab", 4, " ")   = " ab "
     * StringUtils.center("abcd", 2, " ") = "abcd"
     * StringUtils.center("a", 4, " ")    = " a  "
     * StringUtils.center("a", 4, "yz")   = "yayz"
     * StringUtils.center("abc", 7, null) = "  abc  "
     * StringUtils.center("abc", 7, "")   = "  abc  "
     * </pre>
     *
     * @param str 居中的字符串，可能为 null 或 undefined
     * @param size 新字符串的大小，负数视为零
     * @param padStr 用于填充新字符串的字符串，不能为 null、undefined 或空
     * @return 居中字符串，如果为 null 或 undefined 字符串输入则返回 null
     * @throws {@link IllegalArgumentError} 如果 padStr 为 null、undefined 或为空
     */
    public static center(str: string, size: number, padStr = this.SPACE): string {
        if (ObjectUtils.isNull(str) || size <= 0) {
            return str;
        }
        if (this.isEmpty(padStr)) {
            padStr = this.SPACE;
        }
        const strLen = str.length;
        const pads = size - strLen;
        if (pads <= 0) {
            return str;
        }
        str = this.leftPad(str, strLen + pads / 2, padStr);
        str = this.rightPad(str, size, padStr);
        return str;
    }

    /**
     * <p>如果字符串存在，则从字符串末尾删除一个换行符，否则不理会它。
     * 换行符是 \n、\r 或 \r\n。</p>
     *
     * <pre>
     * StringUtils.chomp(null)          = null
     * StringUtils.chomp("")            = ""
     * StringUtils.chomp("abc \r")      = "abc "
     * StringUtils.chomp("abc\n")       = "abc"
     * StringUtils.chomp("abc\r\n")     = "abc"
     * StringUtils.chomp("abc\r\n\r\n") = "abc\r\n"
     * StringUtils.chomp("abc\n\r")     = "abc\n"
     * StringUtils.chomp("abc\n\rabc")  = "abc\n\rabc"
     * StringUtils.chomp("\r")          = ""
     * StringUtils.chomp("\n")          = ""
     * StringUtils.chomp("\r\n")        = ""
     * </pre>
     *
     * @param str 要从中选择换行符的字符串，可能为 null 或 undefined
     * @return 不带换行符的字符串，如果为 null、undefined 字符串输入则返回 null
     */
    public static chomp(str: string): string {
        if (this.isEmpty(str)) {
            return str;
        }

        if (str.length === 1) {
            const ch = str.charAt(0);
            if (ch === this.CR || ch === this.LF) {
                return this.EMPTY;
            }
            return str;
        }

        let lastIdx = str.length - 1;
        const last = str.charAt(lastIdx);

        if (last === this.LF) {
            if (str.charAt(lastIdx - 1) === this.CR) {
                lastIdx--;
            }
        } else if (last !== this.CR) {
            lastIdx++;
        }
        return str.substring(0, lastIdx);
    }

    /**
     * <p>字符串中删除最后一个字符。</p>
     *
     * <p>如果字符串以 \r\n 结尾，则删除它们。</p>
     *
     * <pre>
     * StringUtils.chop(null)          = null
     * StringUtils.chop("")            = ""
     * StringUtils.chop("abc \r")      = "abc "
     * StringUtils.chop("abc\n")       = "abc"
     * StringUtils.chop("abc\r\n")     = "abc"
     * StringUtils.chop("abc")         = "ab"
     * StringUtils.chop("abc\nabc")    = "abc\nab"
     * StringUtils.chop("a")           = ""
     * StringUtils.chop("\r")          = ""
     * StringUtils.chop("\n")          = ""
     * StringUtils.chop("\r\n")        = ""
     * </pre>
     *
     * @param str 要从中删除最后一个字符的字符串，可能为 null 或 undefined
     * @return 没有最后一个字符的字符串，如果为 null、undefined 字符串输入则返回 null
     */
    public static chop(str: string): string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        const strLen = str.length;
        if (strLen < 2) {
            return this.EMPTY;
        }
        const lastIdx = strLen - 1;
        const ret = str.substring(0, lastIdx);
        const last = str.charAt(lastIdx);
        if (last === this.LF && ret.charAt(lastIdx - 1) === this.CR) {
            return ret.substring(0, lastIdx - 1);
        }
        return ret;
    }

    /**
     * <p>根据字典顺序比较两个字符串（null 安全版本），返回：</p>
     *  <ul>
     *  <li>= 0，如果 str1 等于 str2（或两者都为 null ）</li>
     *  <li>< 0，如果 str1 小于 str2</li>
     *  <li>> 0，如果 str1 大于 str2</li>
     * </ul>
     *
     * <p>null 或 undefined 输入根据 nullIsLess 参数进行处理。两个 null 或 undefined 引用被认为是相等的。</p>
     *
     * <pre>
     * StringUtils.compare(null, null, *)     = 0
     * StringUtils.compare(null , "a", true)  &lt; 0
     * StringUtils.compare(null , "a", false) &gt; 0
     * StringUtils.compare("a", null, true)   &gt; 0
     * StringUtils.compare("a", null, false)  &lt; 0
     * StringUtils.compare("abc", "abc", *)   = 0
     * StringUtils.compare("a", "b", *)       &lt; 0
     * StringUtils.compare("b", "a", *)       &gt; 0
     * StringUtils.compare("a", "B", *)       &gt; 0
     * StringUtils.compare("ab", "abc", *)    &lt; 0
     * </pre>
     *
     * @param str1 要比较的字符串
     * @param str2 要比较的字符串
     * @param nullIsLess 是否考虑 null 值小于非 null 值
     * @return {} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
     * @see compare
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
     * <p>null 或 undefined 输入根据 nullIsLess 参数进行处理。两个 null 或 undefined 引用被认为是相等的。比较不区分大小写。</p>
     *
     * <pre>
     * StringUtils.compareIgnoreCase(null, null)   = 0
     * StringUtils.compareIgnoreCase(null , "a")   &lt; 0
     * StringUtils.compareIgnoreCase("a", null)    &gt; 0
     * StringUtils.compareIgnoreCase("abc", "abc") = 0
     * StringUtils.compareIgnoreCase("abc", "ABC") = 0
     * StringUtils.compareIgnoreCase("a", "b")     &lt; 0
     * StringUtils.compareIgnoreCase("b", "a")     &gt; 0
     * StringUtils.compareIgnoreCase("a", "B")     &lt; 0
     * StringUtils.compareIgnoreCase("A", "b")     &lt; 0
     * StringUtils.compareIgnoreCase("ab", "ABC")  &lt; 0
     * </pre>
     *
     * @param str1 要比较的字符串
     * @param str2 要比较的字符串
     * @param nullIsLess 是否考虑 null 值小于非 null 值
     * @return {} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
     @see compare
     */
    public static compareToIgnoreCase(str1: string, str2: string, nullIsLess = true): number {
        return this.compareStr(str1, str2, nullIsLess, true);
    }

    private static compareStr(str1: string, str2: string, nullIsLess: boolean, ignoreCase: boolean): number {
        if (str1 === str2) {
            return 0;
        }
        if (ObjectUtils.isNull(str1)) {
            return nullIsLess ? -1 : 1;
        }
        if (ObjectUtils.isNull(str2)) {
            return nullIsLess ? 1 : -1;
        }

        const str1Len = str1.length;
        const str2Len = str2.length;
        const lim = Math.min(str1.length, str2.length);
        const char1Array = this.toCharArray(str1);
        const char2Array = this.toCharArray(str2);

        let k = 0;
        while (k < lim) {
            const char1 = ignoreCase
                ? char1Array[k].toUpperCase()
                : char1Array[k];
            const char2 = ignoreCase
                ? char2Array[k].toUpperCase()
                : char1Array[k];
            if (char1 !== char2) {
                return char1.charCodeAt(0) - char2.charCodeAt(0);
            }
            k++;
        }
        return str1Len - str2Len;
    }

    /**
     * <p>检查字符串是否包含 searchStr，处理 null。</p>
     * <p>null 或 undefined 字符串将返回 false。</p>
     *
     * <pre>
     * StringUtils.contains(null, *)     = false
     * StringUtils.contains(*, null)     = false
     * StringUtils.contains("", "")      = true
     * StringUtils.contains("abc", "")   = true
     * StringUtils.contains("abc", "a")  = true
     * StringUtils.contains("abc", "z")  = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStr 要查找的字符串，可能为 null 或 undefined
     * @return {boolean} 如果字符串包含 searchStr，则为 true，否则为 false。字符串为 null 或 undefined 则返回 null。
     */
    public static contains(str: string, searchStr: string): boolean {
        if (ObjectUtils.anyNull(str, searchStr)) {
            return false;
        }
        return this.indexOf(str, searchStr, 0) >= 0;
    }

    /**
     * <p>检查字符串是否包含给定数组中的任何字符串。</p>
     * <p>如果字符串为 null，将返回 false。搜索数组为 null 或长度为 0 将返回 false。</p>
     *
     * <pre>
     * StringUtils.containsAny(null, *)                  = false
     * StringUtils.containsAny("", *)                    = false
     * StringUtils.containsAny(*, null)                  = false
     * StringUtils.containsAny(*, [])                    = false
     * StringUtils.containsAny("zzabyycdxx", ['z', 'a']) = true
     * StringUtils.containsAny("zzabyycdxx", ['b', 'y']) = true
     * StringUtils.containsAny("zzabyycdxx", ['z', 'y']) = true
     * StringUtils.containsAny("aba", ['z'])             = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStrs 要搜索的字符串数组或单个字符串，可能为 null 或 undefined。单个字符串也可以为 null 或 undefined。
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
     * <p>检查字符串是否包含给定数组中的任何字符串。</p>
     * <p>如果字符串为 null 或 undefined，将返回 false。搜索数组为 null 或长度为 0 将返回 false。</p>
     *
     * <pre>
     * StringUtils.containsAny(null, *)            = false
     * StringUtils.containsAny("", *)              = false
     * StringUtils.containsAny(*, null)            = false
     * StringUtils.containsAny(*, [])              = false
     * StringUtils.containsAny("abcd", "ab", null) = true
     * StringUtils.containsAny("abcd", "ab", "cd") = true
     * StringUtils.containsAny("abc", "d", "abc")  = true
     * StringUtils.containsAny("abc", "D", "ABC")  = true
     * StringUtils.containsAny("ABC", "d", "abc")  = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStrs 要搜索的字符串数组，可能为 null 或 undefined。单个字符串也可以为 null 或 undefined。
     * @return {boolean} 如果找到任何搜索数组中的元素，则为 true ，否则为 false
     */
    public static containsAnyIgnoreCase(str: string, ...searchStrs: string[]): boolean {
        if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrs)) {
            return false;
        }
        for (const searchStr of searchStrs) {
            if (this.containsIgnoreCase(str, searchStr)) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>忽略大小写，检查字符串是否包含 searchStr，处理 null。</p>
     * <p>null 或 undefined 字符串将返回 false。</p>
     *
     * <pre>
     * StringUtils.containsIgnoreCase(null, *) = false
     * StringUtils.containsIgnoreCase(*, null) = false
     * StringUtils.containsIgnoreCase("", "") = true
     * StringUtils.containsIgnoreCase("abc", "") = true
     * StringUtils.containsIgnoreCase("abc", "a") = true
     * StringUtils.containsIgnoreCase("abc", "z") = false
     * StringUtils.containsIgnoreCase("abc", "A") = true
     * StringUtils.containsIgnoreCase("abc", "Z") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStr 要查找的字符串，可能为 null 或 undefined
     * @return {boolean} 如果字符串包含忽略大小写的 searchStr，则为 true，否则为 false。字符串为 null 或 undefined 则返回 null。
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
     * 检查字符串是否不包含某些字符。<br />
     * 如果字符串为 null，将返回 true。无效字符串为 null，将返回 true。
     * 空字符串 (str.length === 0) 始终返回 true。
     *
     * <pre>
     * StringUtils.containsNone(null, *)       = true
     * StringUtils.containsNone(*, null)       = true
     * StringUtils.containsNone("", *)         = true
     * StringUtils.containsNone("ab", '')      = true
     * StringUtils.containsNone("abab", 'xyz') = true
     * StringUtils.containsNone("ab1", 'xyz')  = true
     * StringUtils.containsNone("abz", 'xyz')  = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param invalidString 无效字符串，可能为 null 或 undefined
     * @return {boolean} 如果它不包含任何无效字符或为 null、undefined，则为 true
     */
    public static containsNone(str: string, invalidString: string): boolean {
        if (ObjectUtils.anyNull(str, invalidString)) {
            return true;
        }

        const strLen = str.length;
        const strLast = strLen - 1;
        const searchLen = invalidString.length;
        const searchLast = searchLen - 1;
        for (let i = 0; i < strLen; i++) {
            const ch = str.charAt(i);
            for (let j = 0; j < searchLen; j++) {
                if (invalidString.charAt(j) === ch) {
                    if (j === searchLast) {
                        return false;
                    }
                    if (i < strLast && invalidString.charAt(j + 1) === str.charAt(i + 1)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * 检查字符串是否仅包含某些字符。<br />
     * 如果字符串为 null，将返回 false。有效字符串为 null，将返回 false。
     * 空字符串 (str.length === 0) 始终返回 true。
     *
     * <pre>
     * StringUtils.containsOnly(null, *)       = false
     * StringUtils.containsOnly(*, null)       = false
     * StringUtils.containsOnly("", *)         = true
     * StringUtils.containsOnly("ab", '')      = false
     * StringUtils.containsOnly("abab", 'abc') = true
     * StringUtils.containsOnly("ab1", 'abc')  = false
     * StringUtils.containsOnly("abz", 'abc')  = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param validString 有效字符串，可能为 null 或 undefined
     * @return {boolean} 如果它只包含有效字符并且是非 null、 undefined 的，则为 true
     */
    public static containsOnly(str: string, validString: string): boolean {
        if (ObjectUtils.anyNull(str, validString)) {
            return false;
        }
        if (str.length === 0) {
            return true;
        }
        if (validString.length === 0) {
            return false;
        }
        return this.indexOfAnyBut(str, validString) === this.INDEX_NOT_FOUND;
    }

    /**
     * 检查给定的字符串是否包含任何空白字符。
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
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
            if (this.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>计算子字符串在较大字符串中出现的次数。
     * 请注意，代码仅计算非重叠匹配。</p>
     *
     * <p>null、undefined 或空 ("") 字符串输入返回 0。</p>
     *
     * <pre>
     * StringUtils.countMatches(null, *)       = 0
     * StringUtils.countMatches("", *)         = 0
     * StringUtils.countMatches("abba", null)  = 0
     * StringUtils.countMatches("abba", "")    = 0
     * StringUtils.countMatches("abba", "a")   = 2
     * StringUtils.countMatches("abba", "ab")  = 1
     * StringUtils.countMatches("abba", "xxx") = 0
     * StringUtils.countMatches("ababa", "aba") = 1
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param sub 要计数的子字符串，可能为 null 或 undefined
     * @return 出现次数，如果任一 字符串为 null 或 undefined，则为 0
     */
    public static countMatches(str: string, sub: string): number {
        if (this.isAnyEmpty(str, sub)) {
            return 0;
        }

        let count = 0;
        let idx = 0;
        while ((idx = this.indexOf(str, sub, idx)) != this.INDEX_NOT_FOUND) {
            count++;
            idx += sub.length;
        }
        return count;
    }

    /**
     * <p>返回传入的字符串，或者如果字符串是空白(" ")、空 ("")、null 或 undefined，则返回 defaultStr 的值。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.defaultIfBlank(null, "NULL")  = "NULL"
     * StringUtils.defaultIfBlank("", "NULL")    = "NULL"
     * StringUtils.defaultIfBlank(" ", "NULL")   = "NULL"
     * StringUtils.defaultIfBlank("bat", "NULL") = "bat"
     * StringUtils.defaultIfBlank("", null)      = null
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param defaultStr 要返回的默认字符串，如果输入为空白(" ")、空 ("")、null 或 undefined，则可能为 null
     * @return {} 传入的字符串，或默认字符
     * @see defaultString
     */
    public static defaultIfBlank(str: string, defaultStr = ""): string {
        return this.isBlank(str) ? defaultStr : str;
    }

    /**
     * <p>返回传入的字符串，或者如果字符串为空 ("")、null 或 undefined，则返回 defaultStr 的值。</p>
     *
     * <pre>
     * StringUtils.defaultIfBlank(null, "NULL")  = "NULL"
     * StringUtils.defaultIfBlank("", "NULL")    = "NULL"
     * StringUtils.defaultIfBlank(" ", "NULL")   = "NULL"
     * StringUtils.defaultIfBlank("bat", "NULL") = "bat"
     * StringUtils.defaultIfBlank("", null)      = null
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param defaultStr 要返回的默认字符串，如果输入为空 ("")、null 或 undefined，则可能为 null
     * @return {} 传入的字符串，或默认字符
     * @see defaultString
     */
    public static defaultIfEmpty(str: string, defaultStr = ""): string {
        return this.isEmpty(str) ? defaultStr : str;
    }

    /**
     * <p>返回传入的字符串，或者如果字符串是 null 或 undefined，则返回 defaultStr 的值。</p>
     *
     * <pre>
     * StringUtils.defaultString(null, "NULL")  = "NULL"
     * StringUtils.defaultString("", "NULL")    = ""
     * StringUtils.defaultString("bat", "NULL") = "bat"
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param defaultStr 要返回的默认字符串，如果输入为 null 或 undefined，则可能为 null
     * @return 传入的字符串，如果是 null 或 undefined 则为默认值
     */
    public static defaultString(str: string, defaultStr = ""): string {
        return ObjectUtils.defaultIfNull(str, defaultStr);
    }

    /**
     * <p>从{@link isWhitespace}(string) 定义的字符串中删除所有空白。</p>
     *
     * <pre>
     * StringUtils.deleteWhitespace(null)         = null
     * StringUtils.deleteWhitespace("")           = ""
     * StringUtils.deleteWhitespace("abc")        = "abc"
     * StringUtils.deleteWhitespace("   ab  c  ") = "abc"
     * </pre>
     *
     * @param str 要从中删除空白的字符串，可能为 null 或 undefined
     * @return 没有空白的字符串，如果字符串输入为 null 或 undefined 则返回 null
     */
    public static deleteWhitespace(str: string): string {
        if (this.isEmpty(str)) {
            return str;
        }

        const sz = str.length;
        const chs = new Array<string>(sz);
        let count = 0;
        for (let i = 0; i < sz; i++) {
            if (!this.isWhitespace(str.charAt(i))) {
                chs[count++] = str.charAt(i);
            }
        }
        if (count === sz) {
            return str;
        }
        if (count === 0) {
            return this.EMPTY;
        }
        return chs.slice(0, count).join("");
    }

    /**
     * <p>比较两个字符串，并返回它们不同的部分。
     * 更准确地说，返回第二个字符串的剩余部分，从它与第一个不同的地方开始。
     * 这意味着 “abc” 和 “ab” 之间的区别是空字符串而不是 “c”。</p>
     *
     * <p>例如，StringUtils.difference("i am a machine", "i am a robot") -> "robot".</p>
     *
     * <pre>
     * StringUtils.difference(null, null) = null
     * StringUtils.difference("", "") = ""
     * StringUtils.difference("", "abc") = "abc"
     * StringUtils.difference("abc", "") = ""
     * StringUtils.difference("abc", "abc") = ""
     * StringUtils.difference("abc", "ab") = ""
     * StringUtils.difference("ab", "abxyz") = "xyz"
     * StringUtils.difference("abcde", "abxyz") = "xyz"
     * StringUtils.difference("abcde", "xyz") = "xyz"
     * </pre>
     *
     * @param str1 第一个字符串，可能为 null 或 undefined
     * @param str2 第二个字符串，可能为 null 或 undefined
     * @return str2 与 str1 不同的部分；如果它们相等，则返回空字符串
     * @see indexOfDifference
     */
    public static difference(str1: string, str2: string): string {
        if (ObjectUtils.isNull(str1)) {
            return str2;
        }
        if (ObjectUtils.isNull(str2)) {
            return str1;
        }
        const at = this.indexOfDifference(str1, str2);
        if (at === this.INDEX_NOT_FOUND) {
            return this.EMPTY;
        }
        return str2.substring(at);
    }

    /**
     * <p>检查字符串是否以指定的后缀结尾。</p>
     *
     * <p>无 null 或 undefined 异常处理。两个 null 或 undefined 引用被认为是相等的。比较区分大小写。</p>
     *
     * <pre>
     * StringUtils.endsWith(null, null)      = true
     * StringUtils.endsWith(null, "def")     = false
     * StringUtils.endsWith("abcdef", null)  = false
     * StringUtils.endsWith("abcdef", "def") = true
     * StringUtils.endsWith("ABCDEF", "def") = false
     * StringUtils.endsWith("ABCDEF", "cde") = false
     * StringUtils.endsWith("ABCDEF", "")    = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param suffix 要查找的后缀，可能为 null 或 undefined
     * @param ignoreCase 指示比较是否应忽略大小写（不区分大小写）。
     * @return 如果字符串以 suffix 结尾则返回 true，区分大小写，或两者都有 null、undefined
     */
    public static endsWith(str: string, suffix: string, ignoreCase = false): boolean {
        if (ObjectUtils.anyNull(str, suffix)) {
            return str === suffix;
        }
        if (suffix.length > str.length) {
            return false;
        }
        const strOffset = str.length - suffix.length;
        return this.regionMatches(str, strOffset, suffix, 0, suffix.length, ignoreCase);
    }

    /**
     * <p>检查字符串是否以任何提供的区分大小写的后缀结尾。</p>
     *
     * <pre>
     * StringUtils.endsWithAny(null, null)      = false
     * StringUtils.endsWithAny(null, ["abc"])  = false
     * StringUtils.endsWithAny("abcxyz", null)     = false
     * StringUtils.endsWithAny("abcxyz", [""]) = true
     * StringUtils.endsWithAny("abcxyz", ["xyz"]) = true
     * StringUtils.endsWithAny("abcxyz", [null, "xyz", "abc"]) = true
     * StringUtils.endsWithAny("abcXYZ", "def", "XYZ") = true
     * StringUtils.endsWithAny("abcXYZ", "def", "xyz") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStrings 要查找的区分大小写的字符串，可能为空或包含 null、undefined
     * @return 如果输入字符串是 null 或 undefined 并且没有提供 searchStrings 则返回 true，
     * 或者输入字符串以任何提供的区分大小写的 searchStrings 结尾。
     * @see endsWith
     */
    public static endsWithAny(str: string, ...searchStrings: string[]): boolean {
        if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrings)) {
            return false;
        }
        for (const searchString of searchStrings) {
            if (this.endsWith(str, searchString)) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>不区分大小写检查字符串是否以指定的后缀结尾。</p>
     *
     * <p>无 null 或 undefined 异常处理。两个 null 或 undefined 引用被认为是相等的。比较不区分大小写。</p>
     *
     * <pre>
     * StringUtils.endsWithAny(null, null)      = false
     * StringUtils.endsWithAny(null, ["abc"])  = false
     * StringUtils.endsWithAny("abcxyz", null)     = false
     * StringUtils.endsWithAny("abcxyz", [""]) = true
     * StringUtils.endsWithAny("abcxyz", ["xyz"]) = true
     * StringUtils.endsWithAny("abcxyz", [null, "XYZ"]) = true
     * StringUtils.endsWithAny("abcxyz", "def", "XYZ") = true
     * StringUtils.endsWithAny("abcXYZ", "def", "xyz") = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param suffix 要查找的后缀，可能为 null 或 undefined
     * @return 如果字符串以 suffix 结尾则返回 true，不区分大小写，或两者都有 null、undefined
     */
    public static endsWithIgnoreCase(str: string, suffix: string): boolean {
        return this.endsWith(str, suffix, true);
    }

    /**
     * <p>检查字符串是否以任何提供的不区分大小写的后缀结尾。</p>
     *
     * <pre>
     * StringUtils.endsWithAny(null, null)      = false
     * StringUtils.endsWithAny(null, new String[] {"abc"})  = false
     * StringUtils.endsWithAny("abcxyz", null)     = false
     * StringUtils.endsWithAny("abcxyz", new String[] {""}) = true
     * StringUtils.endsWithAny("abcxyz", new String[] {"xyz"}) = true
     * StringUtils.endsWithAny("abcxyz", new String[] {null, "xyz", "abc"}) = true
     * StringUtils.endsWithAny("abcXYZ", "def", "XYZ") = true
     * StringUtils.endsWithAny("abcXYZ", "def", "xyz") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStrings 要查找的区分大小写的字符串，可能为空或包含 null、undefined
     * @return 如果输入字符串是 null 或 undefined 并且没有提供 searchStrings 则返回 true，
     * 或者输入字符串以任何提供的不区分大小写的 searchStrings 结尾。
     * @see endsWithIgnoreCase
     */
    public static endsWithAnyWithIgnoreCase(str: string, ...searchStrings: string[]): boolean {
        if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrings)) {
            return false;
        }
        for (const searchString of searchStrings) {
            if (this.endsWithIgnoreCase(str, searchString)) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>比较两个字符串，如果它们表示相等的字符序列，则返回 true。</p>
     *
     * <p>无 null、undefined 异常处理。两个 null 或 undefined 被认为是相等的。比较<strong>默认区分大小写<strong>。</p>
     *
     * <pre>
     * StringUtils.equals(null, null)   = true
     * StringUtils.equals(null, "abc")  = false
     * StringUtils.equals("abc", null)  = false
     * StringUtils.equals("abc", "abc") = true
     * StringUtils.equals("abc", "ABC") = false
     * </pre>
     *
     * @param str1 第一个字符串，可能是 null 或 undefined
     * @param str2 第二个字符串，可能是 null 或 undefined
     * @param ignoreCase 指示比较是否应忽略大小写（不区分大小写）。
     * @return 如果字符串相等则返回 true，或者两者都是 null 或 undefined
     * @see equalsIgnoreCase
     */
    public static equals(str1: string, str2: string, ignoreCase = false): boolean {
        if (ObjectUtils.allNull(str1, str2)) {
            return true;
        }
        if (ObjectUtils.anyNull(str1, str2)) {
            return false;
        }
        if (str1.length !== str2.length) {
            return false;
        }
        return ignoreCase ? str1.toUpperCase() === str2.toUpperCase() : str1 === str2;
    }

    /**
     * <p>将给定的字符串与 searchStrings 中的每个字符串 进行比较，如果给定的字符串等于 searchStrings 中的任何字符串，则返回 true。</p>
     *
     * <pre>
     * StringUtils.equalsAny(null, null, null)    = true
     * StringUtils.equalsAny(null, "abc", "def")  = false
     * StringUtils.equalsAny("abc", null, "def")  = false
     * StringUtils.equalsAny("abc", "abc", "def") = true
     * StringUtils.equalsAny("abc", "ABC", "DEF") = false
     * </pre>
     *
     * @param str 待比较字符串，可能是 null 或 undefined。
     * @param searchStrings 要搜索的字符串数组或单个字符串，可能为 null 或 undefined
     * @return 如果字符串与 searchStrings 的任何其他元素相等（区分大小写）则返回true；
     * 如果 searchStrings为 null、undefined 或不包含匹配项则返回 false。
     */
    public static equalsAny(str: string, ...searchStrings: string[]): boolean {
        if (ArrayUtils.isNotEmpty(searchStrings)) {
            for (const next of searchStrings) {
                if (this.equals(str, next)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * <p>将给定的字符串与 searchStrings 中的每个字符串 进行比较，如果给定的字符串等于 searchStrings 中的任何字符串，则返回 true。</p>
     *
     * <pre>
     * StringUtils.equalsAnyIgnoreCase(null, null, null)    = true
     * StringUtils.equalsAnyIgnoreCase(null, "abc", "def")  = false
     * StringUtils.equalsAnyIgnoreCase("abc", null, "def")  = false
     * StringUtils.equalsAnyIgnoreCase("abc", "abc", "def") = true
     * StringUtils.equalsAnyIgnoreCase("abc", "ABC", "DEF") = true
     * </pre>
     *
     * @param str 待比较字符串，可能是 null 或 undefined。
     * @param searchStrings 要搜索的字符串数组或单个字符串，可能为 null 或 undefined
     * @return 如果字符串与 searchStrings 的任何其他元素相等（不区分大小写）则返回true；
     * 如果 searchStrings为 null、undefined 或不包含匹配项则返回 false。
     */
    public static equalsAnyIgnoreCase(str: string, ...searchStrings: string[]): boolean {
        if (ArrayUtils.isNotEmpty(searchStrings)) {
            for (const next of searchStrings) {
                if (this.equalsIgnoreCase(str, next)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * <p>比较两个字符串，如果它们表示相等的字符序列，则返回 true，忽略大小写。</p>
     *
     * <p>无 null、undefined 异常处理。两个 null 或 undefined 被认为是相等的。比较<strong>不区分大小写<strong>。</p>
     *
     * <pre>
     * StringUtils.equalsIgnoreCase(null, null)   = true
     * StringUtils.equalsIgnoreCase(null, "abc")  = false
     * StringUtils.equalsIgnoreCase("abc", null)  = false
     * StringUtils.equalsIgnoreCase("abc", "abc") = true
     * StringUtils.equalsIgnoreCase("abc", "ABC") = true
     * </pre>
     *
     * @param str1 第一个字符串，可能是 null 或 undefined
     * @param str2 第二个字符串，可能是 null 或 undefined
     * @return 如果字符串相等（不区分大小写）则返回 true，或者两者都是 null 或 undefined
     * @see equals
     */
    public static equalsIgnoreCase(str1: string, str2: string): boolean {
        return this.equals(str1, str2, true);
    }

    /**
     * <p>返回数组中第一个非空值 ("")、null、undefined 或仅空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <p>如果所有值都为空或数组为 null、undefined 或为空，则返回 null。</p>
     *
     * <pre>
     * StringUtils.firstNonBlank(null, null, null)     = null
     * StringUtils.firstNonBlank(null, "", " ")        = null
     * StringUtils.firstNonBlank("abc")                = "abc"
     * StringUtils.firstNonBlank(null, "xyz")          = "xyz"
     * StringUtils.firstNonBlank(null, "", " ", "xyz") = "xyz"
     * StringUtils.firstNonBlank(null, "xyz", "abc")   = "xyz"
     * StringUtils.firstNonBlank()                     = null
     * </pre>
     *
     * @param values 要测试的值，可以是 null、undefined 或空
     * @return value 中的第一个非空白值，如果没有非空白值，则返回 null
     */
    public static firstNonBlank(...values: string[]): string {
        if (ObjectUtils.nonNull(values)) {
            for (const val of values) {
                if (this.isNotBlank(val)) {
                    return val;
                }
            }
        }
        return null;
    }

    /**
     * <p>返回数组中第一个非空("")、null、undefined值。</p>
     *
     * <p>如果所有值都为空或数组为 null、undefined 或为空，则返回 null。</p>
     *
     * <pre>
     * StringUtils.firstNonEmpty(null, null, null)   = null
     * StringUtils.firstNonEmpty(null, null, "")     = null
     * StringUtils.firstNonEmpty(null, "", " ")      = " "
     * StringUtils.firstNonEmpty("abc")              = "abc"
     * StringUtils.firstNonEmpty(null, "xyz")        = "xyz"
     * StringUtils.firstNonEmpty("", "xyz")          = "xyz"
     * StringUtils.firstNonEmpty(null, "xyz", "abc") = "xyz"
     * StringUtils.firstNonEmpty()                   = null
     * </pre>
     *
     * @param values 要测试的值，可以是 null、undefined 或空
     * @return values 中的第一个非空值，如果没有非空值，则为 null
     */
    public static firstNonEmpty(...values: string[]): string {
        if (ObjectUtils.nonNull(values)) {
            for (const val of values) {
                if (this.isNotEmpty(val)) {
                    return val;
                }
            }
        }
        return null;
    }

    /**
     * <p>比较数组中的所有字符串并返回所有字符串共有的起始字符串。</p>
     *
     * <p>For example,
     * StringUtils.getCommonPrefix("i am a machine", "i am a robot") -> "i am a "</p>
     *
     * <pre>
     * StringUtils.getCommonPrefix(null) = ""
     * StringUtils.getCommonPrefix([]) = ""
     * StringUtils.getCommonPrefix("abc") = "abc"
     * StringUtils.getCommonPrefix(null, null) = ""
     * StringUtils.getCommonPrefix("", "") = ""
     * StringUtils.getCommonPrefix("", null) = ""
     * StringUtils.getCommonPrefix("abc", null, null) = ""
     * StringUtils.getCommonPrefix(null, null, "abc") = ""
     * StringUtils.getCommonPrefix("", "abc") = ""
     * StringUtils.getCommonPrefix("abc", "") = ""
     * StringUtils.getCommonPrefix("abc", "abc") = "abc"
     * StringUtils.getCommonPrefix("abc", "a") = "a"
     * StringUtils.getCommonPrefix("ab", "abxyz") = "ab"
     * StringUtils.getCommonPrefix("abcde", "abxyz") = "ab"
     * StringUtils.getCommonPrefix("abcde", "xyz") = ""
     * StringUtils.getCommonPrefix("xyz", "abcde") = ""
     * StringUtils.getCommonPrefix("i am a machine", "i am a robot") = "i am a "
     * </pre>
     *
     * @param strs 字符串数组，可能为空、null 或 undefined
     * @return {} 数组中所有字符串共有的起始字符串；如果数组为空、元素全部为空或没有公共前缀，则为空字符串。
     */
    public static getCommonPrefix(...strs: string[]): string {
        if (ArrayUtils.isEmpty(strs)) {
            return this.EMPTY;
        }
        const smallestIndexOfDiff = this.indexOfDifference(...strs);
        if (smallestIndexOfDiff === this.INDEX_NOT_FOUND) {
            if (ObjectUtils.isNull(strs[0])) {
                return this.EMPTY;
            }
            return strs[0];
        } else if (smallestIndexOfDiff === 0) {
            return this.EMPTY;
        } else {
            return strs[0].substring(0, smallestIndexOfDiff);
        }
    }

    /**
     * <p>返回传入的字符串，或者如果 CharSequence 是空白、空 ("")、null 或 undefined，则返回由 {@link Supplier defaultSupplier} 提供的值。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <p>调用者负责 {@link Supplier defaultSupplier} 的异常处理</p>
     *
     * <pre>
     * StringUtils.getIfBlank(null, () => "NULL")   = "NULL"
     * StringUtils.getIfBlank("", () => "NULL")     = "NULL"
     * StringUtils.getIfBlank(" ", () => "NULL")    = "NULL"
     * StringUtils.getIfBlank("bat", () => "NULL")  = "bat"
     * StringUtils.getIfBlank("", () => null)       = null
     * StringUtils.getIfBlank("", null)             = null
     * </pre>
     *
     * @param str 要测试的值，可能是 null、undefined 或空
     * @param defaultSupplier 如果输入为空白、空 ("")、null 或 undefined，则返回默认字符串的 {@link Supplier defaultSupplier}，可能为 null 或 undefined
     * @return {} 传入的字符串，或默认值
     * @see defaultString
     */
    public static getIfBlank(str: string, defaultSupplier: Supplier<string>): string {
        return this.isBlank(str) ? ObjectUtils.isNull(defaultSupplier) ? null : defaultSupplier() : str;
    }

    /**
     * <p>返回传入的字符串，或者如果字符串为空、null 或 undefined，则返回由 {@link Supplier defaultSupplier}} 提供的值。</p>
     *
     * <p>调用者负责 {@link Supplier defaultSupplier} 的异常处理</p>
     *
     * <pre>
     * StringUtils.getIfEmpty(null, () => "NULL")    = "NULL"
     * StringUtils.getIfEmpty("", () => "NULL")      = "NULL"
     * StringUtils.getIfEmpty(" ", () => "NULL")     = " "
     * StringUtils.getIfEmpty("bat", () => "NULL")   = "bat"
     * StringUtils.getIfEmpty("", () => null)        = null
     * StringUtils.getIfEmpty("", null)              = null
     * </pre>
     *
     * @param str 要测试的值，可能是 null、undefined 或空
     * @param defaultSupplier 如果输入为空白、空 ("")、null 或 undefined，则返回默认字符串的 {@link Supplier defaultSupplier}，可能为 null 或 undefined
     * @return {} 传入的字符串，或默认值
     * @see defaultString
     */
    public static getIfEmpty(str: string, defaultSupplier: Supplier<string>): string {
        return this.isEmpty(str) ? ObjectUtils.isNull(defaultSupplier) ? null : defaultSupplier() : str;
    }

    /**
     * <p>查找字符串中的第一个索引，处理 null、undefined。
     * 如果可能，此方法使用 {@link string.indexOf}。</p>
     *
     * <p>null、undefined 字符串 将返回 -1。负的起始位置被视为零。
     * 空 ("") 搜索字符串始终匹配。大于字符串长度的起始位置仅匹配空 ("")搜索字符串。</p>
     *
     * <pre>
     * StringUtils.indexOf(null, *, *)          = -1
     * StringUtils.indexOf(*, null, *)          = -1
     * StringUtils.indexOf("", "", 0)           = 0
     * StringUtils.indexOf("", *, 0)            = -1 (except when * = "")
     * StringUtils.indexOf("aabaabaa", "a", 0)  = 0
     * StringUtils.indexOf("aabaabaa", "b", 0)  = 2
     * StringUtils.indexOf("aabaabaa", "ab", 0) = 1
     * StringUtils.indexOf("aabaabaa", "b", 3)  = 5
     * StringUtils.indexOf("aabaabaa", "b", 9)  = -1
     * StringUtils.indexOf("aabaabaa", "b", -1) = 2
     * StringUtils.indexOf("aabaabaa", "", 2)   = 2
     * StringUtils.indexOf("abc", "", 9)        = 3
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchString 要查找的字符串，可能为 null 或 undefined
     * @param startPos 起始位置，负数视为零
     * @return 搜索字符串的第一个索引（总是 ≥ startPos），如果不匹配或 null、undefined 字符串输入，则为 -1
     */
    public static indexOf(str: string, searchString: string, startPos = 0): number {
        if (ObjectUtils.anyNull(str, searchString)) {
            return this.INDEX_NOT_FOUND;
        }
        return str.indexOf(searchString, startPos);
    }

    /**
     * <p>找到任何一组潜在子串的第一个索引。</p>
     *
     * <p>null 或 undefined 字符串将返回 -1。null、undefined 或空搜索数组将返回 -1。
     * null 或 undefined 搜索数组条目将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 0。
     * 如果可能，此方法使用 {@link string.indexOf}。</p>
     *
     * <pre>
     * StringUtils.indexOfAny(null, *)                      = -1
     * StringUtils.indexOfAny(*, null)                      = -1
     * StringUtils.indexOfAny(*, [])                        = -1
     * StringUtils.indexOfAny("zzabyycdxx", ["ab", "cd"])   = 2
     * StringUtils.indexOfAny("zzabyycdxx", ["cd", "ab"])   = 2
     * StringUtils.indexOfAny("zzabyycdxx", ["mn", "op"])   = -1
     * StringUtils.indexOfAny("zzabyycdxx", ["zab", "aby"]) = 1
     * StringUtils.indexOfAny("zzabyycdxx", [""])           = 0
     * StringUtils.indexOfAny("", [""])                     = 0
     * StringUtils.indexOfAny("", ["a"])                    = -1
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStrs 要搜索的字符串，可能为 null 或 undefined
     * @return str 中任何 searchStrs 的第一个索引，如果不匹配，则为 -1
     */
    public static indexOfAny(str: string, ...searchStrs: string[]): number {
        if (ObjectUtils.anyNull(str, ...searchStrs)) {
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
     * <p>搜索字符串以查找不在给定字符串中的任何字符的第一个索引。</p>
     *
     * <p>null、undefined 字符串将返回 -1。null、undefined 或空搜索字符串将返回 -1。</p>
     *
     * <pre>
     * StringUtils.indexOfAnyBut(null, *)            = -1
     * StringUtils.indexOfAnyBut("", *)              = -1
     * StringUtils.indexOfAnyBut(*, null)            = -1
     * StringUtils.indexOfAnyBut(*, "")              = -1
     * StringUtils.indexOfAnyBut("zzabyycdxx", "za") = 3
     * StringUtils.indexOfAnyBut("zzabyycdxx", "")   = -1
     * StringUtils.indexOfAnyBut("aba", "ab")        = -1
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchChars 要搜索的字符串，可能为 null 或 undefined
     * @return 任何字符的索引，如果不匹配或输入为 null、undefined，则为 -1
     */
    public static indexOfAnyBut(str: string, searchChars: string): number {
        if (this.isEmpty(str) || this.isEmpty(searchChars)) {
            return this.INDEX_NOT_FOUND;
        }
        const strLen = str.length;
        for (let i = 0; i < strLen; i++) {
            const ch = str.charAt(i);
            const chFound = searchChars.indexOf(ch, 0) >= 0;
            if (i + 1 < strLen) {
                const ch2 = str.charAt(i + 1);
                if (chFound && searchChars.indexOf(ch2, 0) < 0) {
                    return i;
                }
            } else if (!chFound) {
                return i;
            }
        }
        return this.INDEX_NOT_FOUND;
    }

    /**
     * <p>比较数组中的所有字符串并返回字符串起始不同的索引。</p>
     *
     * <p>例如，
     * StringUtils.indexOfDifference("i am a machine", "i am a robot") -> 7</p>
     *
     * <pre>
     * StringUtils.indexOfDifference(null) = -1
     * StringUtils.indexOfDifference() = -1
     * StringUtils.indexOfDifference("abc") = -1
     * StringUtils.indexOfDifference(null, null) = -1
     * StringUtils.indexOfDifference("", "") = -1
     * StringUtils.indexOfDifference("", null) = 0
     * StringUtils.indexOfDifference("abc", null, null) = 0
     * StringUtils.indexOfDifference(null, null, "abc") = 0
     * StringUtils.indexOfDifference("", "abc") = 0
     * StringUtils.indexOfDifference("abc", ""}) = 0
     * StringUtils.indexOfDifference("abc", "abc") = -1
     * StringUtils.indexOfDifference("abc", "a") = 1
     * StringUtils.indexOfDifference("ab", "abxyz") = 2
     * StringUtils.indexOfDifference("abcde", "abxyz") = 2
     * StringUtils.indexOfDifference("abcde", "xyz") = 0
     * StringUtils.indexOfDifference("xyz", "abcde") = 0
     * StringUtils.indexOfDifference("i am a machine", "i am a robot") = 7
     * </pre>
     *
     * @param strs 字符串数组，其中元素可能为 null、undefined
     * @return 字符串开始不同的索引；如果它们都相等，则返回 -1
     */
    public static indexOfDifference(...strs: string[]): number {
        if (ArrayUtils.getLength(strs) <= 1) {
            return this.INDEX_NOT_FOUND;
        }
        let anyStringNull = false;
        let allStringsNull = true;
        const arrayLen = strs.length;
        let shortestStrLen = Number.MAX_SAFE_INTEGER;
        let longestStrLen = 0;

        for (const str of strs) {
            if (ObjectUtils.isNull(str)) {
                anyStringNull = true;
                shortestStrLen = 0;
            } else {
                allStringsNull = false;
                shortestStrLen = Math.min(strs.length, shortestStrLen);
                longestStrLen = Math.max(strs.length, longestStrLen);
            }
        }

        if (allStringsNull || longestStrLen === 0 && !anyStringNull) {
            return this.INDEX_NOT_FOUND;
        }

        if (shortestStrLen === 0) {
            return 0;
        }

        let firstDiff = -1;
        for (let stringPos = 0; stringPos < shortestStrLen; stringPos++) {
            const comparisonChar = strs[0].charAt(stringPos);
            for (let arrayPos = 1; arrayPos < arrayLen; arrayPos++) {
                if (strs[arrayPos].charAt(stringPos) !== comparisonChar) {
                    firstDiff = stringPos;
                    break;
                }
            }
            if (firstDiff != -1) {
                break;
            }
        }

        if (firstDiff === -1 && shortestStrLen !== longestStrLen) {
            return shortestStrLen;
        }
        return firstDiff;
    }

    /**
     * <p>从指定位置查找字符串中的第一个索引，不区分大小写。</p>
     *
     * <p>null 或 undefined 字符串将返回 -1。负的起始位置被视为零。
     * 空 ("") 搜索字符串始终匹配。大于字符串长度的起始位置仅匹配空 ("")搜索字符串。</p>
     *
     * <pre>
     * StringUtils.indexOfIgnoreCase(null, *, *)          = -1
     * StringUtils.indexOfIgnoreCase(*, null, *)          = -1
     * StringUtils.indexOfIgnoreCase("", "", 0)           = 0
     * StringUtils.indexOfIgnoreCase("aabaabaa", "A", 0)  = 0
     * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 0)  = 2
     * StringUtils.indexOfIgnoreCase("aabaabaa", "AB", 0) = 1
     * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 3)  = 5
     * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 9)  = -1
     * StringUtils.indexOfIgnoreCase("aabaabaa", "B", -1) = 2
     * StringUtils.indexOfIgnoreCase("aabaabaa", "", 2)   = 2
     * StringUtils.indexOfIgnoreCase("abc", "", 9)        = -1
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @param searchStr 要查找的字符串，可能为 null 或 undefined
     * @param startPos 起始位置，负数视为零
     * @return 搜索字符串的第一个索引（总是 ≥ startPos），如果不匹配或 null、undefined 字符串输入，则为 -1
     */
    public static indexOfIgnoreCase(str: string, searchStr: string, startPos = 0): number {
        if (ObjectUtils.anyNull(str, searchStr)) {
            return this.INDEX_NOT_FOUND;
        }
        if (startPos < 0) {
            startPos = 0;
        }
        const endLimit = str.length - searchStr.length + 1;
        if (startPos > endLimit) {
            return this.INDEX_NOT_FOUND;
        }
        if (searchStr.length === 0) {
            return startPos;
        }
        for (let i = startPos; i < endLimit; i++) {
            if (this.regionMatches(str, i, searchStr, 0, searchStr.length, true)) {
                return i;
            }
        }
        return this.INDEX_NOT_FOUND;
    }

    /**
     * <p>检查所有字符串是否为空 ("")、null、undefined 或仅空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.isAllBlank(null)             = true
     * StringUtils.isAllBlank(null, "foo")      = false
     * StringUtils.isAllBlank(null, null)       = true
     * StringUtils.isAllBlank("", "bar")        = false
     * StringUtils.isAllBlank("bob", "")        = false
     * StringUtils.isAllBlank("  bob  ", null)  = false
     * StringUtils.isAllBlank(" ", "bar")       = false
     * StringUtils.isAllBlank("foo", "bar")     = false
     * StringUtils.isAllBlank()  = true
     * </pre>
     *
     * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
     * @return 如果所有字符串为空、null、undefined 或仅空白，则返回 true
     */
    public static isAllBlank(...strs: string[]): boolean {
        if (ArrayUtils.isEmpty(strs)) {
            return true;
        }
        for (const str of strs) {
            if (this.isNotBlank(str)) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>检查所有字符串是否为空 ("")、null 或 undefined。</p>
     *
     * <pre>
     * StringUtils.isAllEmpty(null)             = true
     * StringUtils.isAllEmpty(null, "")         = true
     * StringUtils.isAllEmpty()                 = true
     * StringUtils.isAllEmpty(null, "foo")      = false
     * StringUtils.isAllEmpty("", "bar")        = false
     * StringUtils.isAllEmpty("bob", "")        = false
     * StringUtils.isAllEmpty("  bob  ", null)  = false
     * StringUtils.isAllEmpty(" ", "bar")       = false
     * StringUtils.isAllEmpty("foo", "bar")     = false
     * </pre>
     *
     * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
     * @return 如果所有字符串为空、null 或 undefined，则返回 true
     */
    public static isAllEmpty(...strs: string[]): boolean {
        if (ArrayUtils.isEmpty(strs)) {
            return true;
        }
        for (const str of strs) {
            if (this.isNotEmpty(str)) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>检查字符串是否仅包含小写字符。</p>
     *
     * <p>null 将返回 false。一个空的字符串(“”)将返回 false。</p>
     *
     * <pre>
     * StringUtils.isAllLowerCase(null)   = false
     * StringUtils.isAllLowerCase("")     = false
     * StringUtils.isAllLowerCase("  ")   = false
     * StringUtils.isAllLowerCase("abc")  = true
     * StringUtils.isAllLowerCase("abC")  = false
     * StringUtils.isAllLowerCase("ab c") = false
     * StringUtils.isAllLowerCase("ab1c") = false
     * StringUtils.isAllLowerCase("ab/c") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果只包含小写字符，并且不为空，则返回 true
     */
    public static isAllLowerCase(str: string): boolean {
        if (this.isEmpty(str)) {
            return false;
        }
        const sz = str.length;
        for (let i = 0; i < sz; i++) {
            if (!this.isLowerCase(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>检查字符串是否仅包含大写字符。</p>
     *
     * <p>null 将返回 false。一个空的字符串(“”)将返回 false。</p>
     *
     * <pre>
     * StringUtils.isAllUpperCase(null)   = false
     * StringUtils.isAllUpperCase("")     = false
     * StringUtils.isAllUpperCase("  ")   = false
     * StringUtils.isAllUpperCase("ABC")  = true
     * StringUtils.isAllUpperCase("aBC")  = false
     * StringUtils.isAllUpperCase("A C")  = false
     * StringUtils.isAllUpperCase("A1C")  = false
     * StringUtils.isAllUpperCase("A/C")  = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果只包含大写字符，并且不为空，则返回 true
     */
    public static isAllUpperCase(str: string): boolean {
        if (this.isEmpty(str)) {
            return false;
        }
        const sz = str.length;
        for (let i = 0; i < sz; i++) {
            if (!this.isUpperCase(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>检查任何字符串是否为空 ("")、null、undefined 或仅空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.isAnyBlank(null)             = true
     * StringUtils.isAnyBlank(null, "foo")      = true
     * StringUtils.isAnyBlank(null, null)       = true
     * StringUtils.isAnyBlank("", "bar")        = true
     * StringUtils.isAnyBlank("bob", "")        = true
     * StringUtils.isAnyBlank("  bob  ", null)  = true
     * StringUtils.isAnyBlank(" ", "bar")       = true
     * StringUtils.isAnyBlank("")               = true
     * StringUtils.isAnyBlank("foo", "bar")     = false
     * </pre>
     *
     * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
     * @return 如果任何字符串为空、null、undefined 或仅空白，则返回 true
     */
    public static isAnyBlank(...strs: string[]): boolean {
        if (ArrayUtils.isEmpty(strs)) {
            return false;
        }
        for (const str of strs) {
            if (this.isBlank(str)) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>检查任何字符串是否为空 ("")、null、undefined。</p>
     *
     * <pre>
     * StringUtils.isAnyEmpty(null)             = true
     * StringUtils.isAnyEmpty(null, "foo")      = true
     * StringUtils.isAnyEmpty("", "bar")        = true
     * StringUtils.isAnyEmpty("bob", "")        = true
     * StringUtils.isAnyEmpty("  bob  ", null)  = true
     * StringUtils.isAnyEmpty(" ", "bar")       = false
     * StringUtils.isAnyEmpty("foo", "bar")     = false
     * StringUtils.isAnyEmpty("")               = true
     * </pre>
     *
     * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
     * @return 如果任何 CharSequence 为空、null 或 undefined，则返回 true
     */
    public static isAnyEmpty(...strs: string[]): boolean {
        if (ArrayUtils.isEmpty(strs)) {
            return false;
        }
        for (const str of strs) {
            if (this.isEmpty(str)) {
                return true;
            }
        }
        return false;
    }

    /**
     * <p>检查 CharSequence 是否为空 ("")、null、undefined 或仅空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.isBlank(null)      = true
     * StringUtils.isBlank("")        = true
     * StringUtils.isBlank(" ")       = true
     * StringUtils.isBlank("bob")     = false
     * StringUtils.isBlank("  bob  ") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果字符串为空、nul、undefined 或仅空白，则返回 true
     */
    public static isBlank(str: string): boolean {
        const strLen = this.getLength(str);
        if (strLen === 0) {
            return true;
        }
        for (let i = 0; i < str.length; i++) {
            if (this.isWhitespace(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>检查字符串是否为空 ("")、null 或 undefined。</p>
     *
     * <pre>
     * StringUtils.isEmpty(null)      = true
     * StringUtils.isEmpty("")        = true
     * StringUtils.isEmpty(" ")       = false
     * StringUtils.isEmpty("bob")     = false
     * StringUtils.isEmpty("  bob  ") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果字符串为空、null 或 undefined，则返回 true
     */
    public static isEmpty(str: string): boolean {
        return ObjectUtils.isNull(str) || str.length === 0;
    }

    /**
     * <p>检查字符串是否包含大小写字符的混合大小写</p>
     *
     * <p>null、undefined 将返回 false。一个空的字符串(“”) 将返回 false。</p>
     *
     * <pre>
     * StringUtils.isMixedCase(null)    = false
     * StringUtils.isMixedCase("")      = false
     * StringUtils.isMixedCase("ABC")   = false
     * StringUtils.isMixedCase("abc")   = false
     * StringUtils.isMixedCase("aBc")   = true
     * StringUtils.isMixedCase("A c")   = true
     * StringUtils.isMixedCase("A1c")   = true
     * StringUtils.isMixedCase("a/C")   = true
     * StringUtils.isMixedCase("aC\t")  = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果字符串同时包含大写和小写字符，则返回 true
     */
    public static isMixedCase(str: string): boolean {
        if (this.isEmpty(str) || str.length == 1) {
            return false;
        }
        let containsUppercase = false;
        let containsLowercase = false;
        const sz = str.length;
        for (let i = 0; i < sz; i++) {
            if (containsUppercase && containsLowercase) {
                return true;
            } else if (this.isUpperCase(str.charAt(i))) {
                containsUppercase = true;
            } else if (this.isLowerCase(str.charAt(i))) {
                containsLowercase = true;
            }
        }
        return containsUppercase && containsLowercase;
    }

    /**
     * <p>检查是否没有任何字符串为空 ("")、null、undefined 或仅空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.isNoneBlank(null)             = false
     * StringUtils.isNoneBlank(null, "foo")      = false
     * StringUtils.isNoneBlank(null, null)       = false
     * StringUtils.isNoneBlank("", "bar")        = false
     * StringUtils.isNoneBlank("bob", "")        = false
     * StringUtils.isNoneBlank("  bob  ", null)  = false
     * StringUtils.isNoneBlank(" ", "bar")       = false
     * StringUtils.isNoneBlank("")               = false
     * StringUtils.isNoneBlank("foo", "bar")     = true
     * </pre>
     *
     * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
     * @return 如果没有一个字符串是空的、null、undefined 或只有空白，则返回 true
     */
    public static isNoneBlank(...strs: string[]): boolean {
        return !this.isAnyBlank(...strs);
    }

    /**
     * <p>检查是否没有任何字符串为空 ("")、null 或 undefined。</p>
     *
     * <pre>
     * StringUtils.isNoneEmpty(null)             = false
     * StringUtils.isNoneEmpty(null, "foo")      = false
     * StringUtils.isNoneEmpty("", "bar")        = false
     * StringUtils.isNoneEmpty("bob", "")        = false
     * StringUtils.isNoneEmpty("  bob  ", null)  = false
     * StringUtils.isNoneEmpty("")               = false
     * StringUtils.isNoneEmpty(" ", "bar")       = true
     * StringUtils.isNoneEmpty("foo", "bar")     = true
     * </pre>
     *
     * @param strs 要检查的字符串，可以为 null、undefined 或为空
     * @return 如果没有一个字符串为空、null 或 undefined，则返回 true
     */
    public static isNoneEmpty(...strs: string[]): boolean {
        return !this.isAnyEmpty(...strs);
    }

    /**
     * <p>检查字符串是否不为空 ("")、不为null、不为 undefined 且仅不为空白。</p>
     *
     * <p>空白定义为 {@link isWhitespace}(string).</p>
     *
     * <pre>
     * StringUtils.isNotBlank(null)      = false
     * StringUtils.isNotBlank("")        = false
     * StringUtils.isNotBlank(" ")       = false
     * StringUtils.isNotBlank("bob")     = true
     * StringUtils.isNotBlank("  bob  ") = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果字符串不为空且不为 null 且不为 undefined 且仅为空格，则返回 true
     */
    public static isNotBlank(str: string): boolean {
        return !this.isBlank(str);
    }

    /**
     * <p>检查字符串是否不为空 ("") 且不为 null 且不为 undefined。</p>
     *
     * <pre>
     * StringUtils.isNotEmpty(null)      = false
     * StringUtils.isNotEmpty("")        = false
     * StringUtils.isNotEmpty(" ")       = true
     * StringUtils.isNotEmpty("bob")     = true
     * StringUtils.isNotEmpty("  bob  ") = true
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果字符串不为空且不为 null 且不为 undefined，则返回 true
     */
    public static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }

    /**
     * <p>检查字符串是否仅包含空白。</p>
     *
     * <p>null 或 undefined 将返回 false。一个空的字符串("") 将返回 true。</p>
     *
     * <pre>
     * StringUtils.isWhitespace(null)   = false
     * StringUtils.isWhitespace("")     = true
     * StringUtils.isWhitespace("  ")   = true
     * StringUtils.isWhitespace("abc")  = false
     * StringUtils.isWhitespace("ab2c") = false
     * StringUtils.isWhitespace("ab-c") = false
     * </pre>
     *
     * @param str 要检查的字符串，可能为 null 或 undefined
     * @return 如果只包含空格，并且不为 null 或 undefined 则返回 true
     */
    public static isWhitespace(str: string): boolean {
        if (ObjectUtils.isNull(str)) {
            return false;
        }
        const sz = str.length;
        for (let i = 0; i < sz; i++) {
            if (str.charAt(i) === " ") {
                return false;
            }
        }
        return true;
    }

    public static join(array: string[], separator = null, startIndex: 0, endIndex = array.length): string {
        if (ObjectUtils.isNull(array)) {
            return null;
        }
        if (ObjectUtils.isNull(separator)) {
            separator = this.EMPTY;
        }

        if (endIndex - startIndex <= 0) {
            return this.EMPTY;
        }

        let buf = "";
        for (let i = startIndex; i < endIndex; i++) {
            if (i > startIndex) {
                buf += separator;
            }
            if (array[i] !== null) {
                buf += array[i];
            }
        }
        return buf;
    }

    public static joinWith(separator: string, ...strs: string[]): string {
        if (ObjectUtils.isNull(strs)) {
            throw new TypeError("strings varargs must not be null");
        }

        const sanitizedSeparator = this.defaultString(separator);
        let result = "";
        for (let i = 0; i < strs.length; i++) {
            result += strs[i];
            if (i !== strs.length - 1) {
                result += sanitizedSeparator;
            }
        }
        return result;
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
     * 查找任何一组潜在子串的最新索引。<br />
     * 字符串为 null 将返回 -1。搜索数组如果为 null 将返回 -1。
     * 搜索数组中为null 的元素将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 0 。
     *
     * @param str 要检查的字符串，可能为 null
     * @param searchStrs 要搜索的字符串，可能为 null
     * @return {number} str 中任何 searchStrs 的第一个索引，如果不匹配则为 -1
     */
    public static lastIndexOfAny(str: string, ...searchStrs: string[]): number {
        if (ObjectUtils.anyNull(str, ...searchStrs)) {
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

    private static indexOfStr(str
                   :
                   string, searchString
                   :
                   string, startPos
                   :
                   number, lastIndex
                   :
                   boolean, ignoreCase
                   :
                   boolean
    ) {
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
                if (
                    this.regionMatches(
                        str,
                        i,
                        searchString,
                        0,
                        searchString.length,
                        true
                    )
                ) {
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
                if (
                    this.regionMatches(
                        str,
                        i,
                        searchString,
                        0,
                        searchString.length,
                        true
                    )
                ) {
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
    public static

    ordinalIndexOf(str
                       :
                       string, searchString
                       :
                       string, ordinal
                       :
                       number
    ):
        number {
        return this.ordinalStrIndexOf(str, searchString, ordinal, false);
    }

    private static

    ordinalStrIndexOf(str
                          :
                          string, searchString
                          :
                          string, ordinal
                          :
                          number, lastIndex
                          :
                          boolean
    ):
        number {
        if (
            BooleanUtils.or(
                ObjectUtils.anyNull(str, searchString),
                ordinal <= 0
            )
        ) {
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
     * 移除字符串串的两端字符的空白字符（空白、制表符、不间断空白等）和所有行终止符（LF、CR 等），字符串为 null则返回 null。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null则返回 null
     */
    public static

    trim(str
             :
             string
    ):
        string {
        return ObjectUtils.defaultIfNull(str.trim(), null);
    }

    /**
     * 移除字符串串的两端字符的空白字符（空白、制表符、不间断空白等）和所有行终止符（LF、CR 等），字符串为 null 或空则返回 null。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null 或空则返回 null
     */
    public static

    trimToNull(str
                   :
                   string
    ):
        string {
        const trimStr = this.trim(str);
        return ObjectUtils.defaultIfCondition(
            trimStr,
            null,
            this.isNotEmpty(trimStr)
        );
    }

    /**
     * 移除字符串串的两端字符的空白字符（空白、制表符、不间断空白等）和所有行终止符（LF、CR 等），字符串为 null 则返回空字符串。
     *
     * @param str 要修剪的字符串，可能为 null
     * @return {string} 修整后的字符串，如果字符串为 null 则返回空字符串
     */
    public static

    trimToEmpty(str
                    :
                    string
    ):
        string {
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
    public static

    truncate(str
                 :
                 string, maxLength
                 :
                 number, offset = 0
    ):
        string {
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
            const ix =
                offset + maxLength > str.length
                    ? str.length
                    : offset + maxLength;
            return str.substring(offset, ix);
        }
        return str.substr(offset);
    }

    /**
     * 从字符串的开头和结尾去除一组字符中的任何一个。 这与{@link trim}类似，但允许控制要去除的字符。
     * 如果字符串为 null，则返回null。如果为空字符串 ("") 则返回空字符串。
     *
     * @param str 要从中删除字符的字符串，可能为 null
     * @param stripChars 要删除的字符，null 视为空白
     * @return {string} 截断后的字符串。
     */
    public static

    strip(str
              :
              string, stripChars = null
    ):
        string {
        if (this.isEmpty(str)) {
            return str;
        }
        return this.stripEnd(this.stripStart(str, stripChars), stripChars);
    }

    /**
     * 如果字符串在删除后为空 ("")，则从字符串的开头和结尾删除空白，返回 null。
     * 这与{@link trimToNull}类似，但删除了空白
     *
     * @param str 从中删除字符的字符串，可能为 null
     * @return {string} 截取后的字符串，如果有空白，空字符串或为 null，则返回 null。
     */
    public static

    stripToNull(str
                    :
                    string
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        const stripStr = this.strip(str);
        return ObjectUtils.defaultIfCondition(
            stripStr,
            null,
            this.isNotEmpty(stripStr)
        );
    }

    /**
     * 如果字符串在删除后为空("")，则从字符串的开头和结尾删除空白，返回空("")。
     * 这与{@link trimToEmpty}类似，但删除了空白
     *
     * @param str 从中删除字符的字符串，可能为 null
     * @return {string} 截取后的字符串，如果有空白，空字符串或为 null，则返回空("")。
     */
    public static

    stripToEmpty(str
                     :
                     string
    ):
        string {
        return ObjectUtils.defaultIfNull(this.strip(str), this.EMPTY);
    }

    /**
     * 从字符串的开头去除一组字符中的任何一个。
     * 如果字符串为 null，则返回 null 。 如果为空字符串("")，则返回空字符串。
     *
     * @param str 要从中删除字符的字符串，可能为 null
     * @param stripChars 要删除的字符，null 视为空白
     * @return {string} 修整后的字符串，如果字符串为空则返回 null
     */
    public static

    stripStart(str
                   :
                   string, stripChars
                   :
                   string
    ):
        string {
        if (this.isEmpty(str)) {
            return str;
        }
        let start = 0;
        if (ObjectUtils.isNull(stripChars)) {
            while (
                start != str.length &&
                this.isWhitespace(str.charCodeAt(start))
                ) {
                start++;
            }
        } else if (this.isEmpty(stripChars)) {
            return str;
        } else {
            while (
                start != str.length &&
                stripChars.includes(str.charAt(start))
                ) {
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
     * @param stripChars 要删除的字符，null 视为空白
     * @return {string} 修整后的字符串，如果字符串为空则返回 null
     */
    public static

    stripEnd(str
                 :
                 string, stripChars
                 :
                 string
    ):
        string {
        if (this.isEmpty(str)) {
            return str;
        }
        let end = str.length;
        if (ObjectUtils.isNull(stripChars)) {
            while (end != 0 && this.isWhitespace(str.charAt(end - 1))) {
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
    public static

    stripAll(...strs
                 :
                 string[]
    ):
        string[];

    /**
     * 从数组中每个字符串的开头和结尾去除一组字符中的任何一个。
     * 每次返回一个新数组，长度为零除外。数组为 null 将返回 null。空数组将返回自身。null 数组元素将被忽略。
     *
     * @param strs 要从中删除字符的数组，可能为 null
     * @param stripChars 要删除的字符，null 视为空白
     * @return {Array} 修整后的字符串，如果数组输入为null则为空
     */
    public static

    stripAll(strs
                 :
                 string[], stripChars
                 :
                 string
    ):
        string[];

    public static

    stripAll(strs
                 :
                 unknown, stripChars
                 :
                 unknown
    ):
        string[] {
        if (!Array.isArray(strs)) {
            throw new TypeError("strs 必须是数组或可变参数");
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
     * 从指定的字符串中获取子字符串以避免异常。<br />
     * 负开始位置可用于从字符串末尾开始/结束的n个字符。<br />
     * 返回的子字符串从 start 位置的字符 start，在 end 位置之前 end。
     * 所有位置计数都是从零开始的——即，从字符串的开头开始使用 start = 0。
     * 负的开始和结束位置可用于指定相对于字符串结尾的偏移量。<br />
     * 如果 start 不是严格地在 end 的左侧，则返回 ""。
     *
     * @param str 从中获取子字符串的字符串，可能为 null
     * @param start 开始的位置，负数表示从字符串的末尾开始倒数这么多字符
     * @param end 结束的位置（可不填），负数表示从字符串的末尾开始倒数这么多字符
     * @return {string} 从开始位置到结束位置的子字符串，如果字符串为 null 则返回 null
     */
    public static

    substring(str
                  :
                  string, start
                  :
                  number, end ?: number
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }

        if (start < 0) {
            start = str.length + start;
        }

        if (ObjectUtils.isNull(end)) {
            if (start < 0) {
                start = 0;
            }
            if (start > str.length) {
                return this.EMPTY;
            }
            return str.substring(start);
        } else {
            if (end < 0) {
                end = str.length + end;
            }
            if (end > str.length) {
                end = str.length;
            }

            if (start > end) {
                return this.EMPTY;
            }

            if (start < 0) {
                start = 0;
            }
            if (end < 0) {
                end = 0;
            }

            return str.substring(start, end);
        }
    }

    /**
     * 获取字符串最左边的 length 个字符。
     * 如果字符串为 null，则字符串将无一例外地返回。如果 length 为负，则返回空字符串。
     *
     * @param str 从中获取最左边字符的字符串，可能为空
     * @param length 所需字符串的长度
     * @return {string} 最左边的字符，如果空字符串为null，则返回 null
     */
    public static

    left(str
             :
             string, length
             :
             number
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (length < 0) {
            return this.EMPTY;
        }
        if (str.length <= length) {
            return str;
        }
        return str.substr(0, length);
    }

    /**
     * 获取字符串最右边的 length 个字符。
     * 如果字符串为 null，则字符串将无一例外地返回。如果 length 为负，则返回空字符串。
     *
     * @param str 从中获取最右边字符的字符串，可能为空
     * @param length 所需字符串的长度
     * @return {string} 最右边的字符，如果空字符串为null，则返回 null
     */
    public static

    right(str
              :
              string, length
              :
              number
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (length < 0) {
            return this.EMPTY;
        }
        if (str.length <= length) {
            return str;
        }
        return str.substr(str.length - length);
    }

    /**
     * 获取字符串中间的 length 个字符。
     * 如果字符串为 null，则字符串将无一例外地返回。如果 length 为负，则返回空字符串。
     *
     * @param str 从中获取中间字符的字符串，可能为空
     * @param pos 起始位置，负数视为零
     * @param length 所需字符串的长度
     * @return {string} 中间的字符，如果空字符串为null，则返回 null
     */
    public static

    mid(str
            :
            string, pos
            :
            number, length
            :
            number
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (length < 0 || pos > str.length) {
            return this.EMPTY;
        }
        if (pos < 0) {
            pos = 0;
        }
        if (str.length <= pos + length) {
            return str.substring(pos);
        }
        return str.substring(pos, pos + length);
    }

    /**
     * 获取分隔符第一次出现之前的子字符串，不返回分隔符。
     * 字符串为 null 将返回null。空 ("") 字符串输入将返回空字符串。分隔符为 null 将返回输入字符串。
     * 如果未找到任何内容，则返回输入字符串。
     *
     * @param str 从中获取子字符串的字符串，可能为null
     * @param separator 要搜索的字符串，可能为 null
     * @return {string} 所述分离器的第一发生前的子串，如果搜索字符串为 null，则返回 null
     */
    public static

    substringBefore(str
                        :
                        string, separator
                        :
                        string
    ):
        string {
        if (BooleanUtils.or(this.isEmpty(str), ObjectUtils.isNull(separator))) {
            return str;
        }
        if (this.isEmpty(separator)) {
            return this.EMPTY;
        }
        const pos = str.indexOf(separator);
        if (pos == this.INDEX_NOT_FOUND) {
            return str;
        }
        return str.substring(0, pos);
    }

    /**
     * 获取分隔符第一次出现后的子字符串，不返回分隔符。
     * null 字符串输入将返回 null。 空 ("") 字符串输入将返回空字符串。
     * 如果输入字符串不是 null 则 null 分隔符将返回空字符串。
     * 如果未找到任何内容，则返回空字符串。
     *
     * @param str 从中获取子字符串的字符串，可能为null
     * @param separator 要搜索的字符串，可能为空
     * @return {string} 分离器的第一次出现，之后的子输入字符串如果 null 则返回空字符串
     */
    public static

    substringAfter(str
                       :
                       string, separator
                       :
                       string
    ):
        string {
        if (this.isAnyEmpty(str, separator)) {
            return str;
        }
        if (this.isEmpty(separator)) {
            return this.EMPTY;
        }
        const pos = str.indexOf(separator);
        if (pos == this.INDEX_NOT_FOUND) {
            return str;
        }
        return str.substring(0, pos);
    }

    /**
     * 获取最后一次出现分隔符之前的子字符串。 不返回分隔符。
     * null 字符串输入将返回 null 。 空 ("") 字符串输入将返回空字符串。 空或null分隔符将返回输入字符串。
     * 如果未找到任何内容，则返回字符串输入。
     *
     * @param str 从中获取子字符串的字符串，可能为 null
     * @param separator 要搜索的字符串，可能为空
     * @return {string} 隔板的最后一次出现前的子字符串， null如果空字符串输入
     */
    public static

    substringBeforeLast(str
                            :
                            string, separator
                            :
                            string
    ):
        string {
        if (this.isAnyEmpty(str, separator)) {
            return str;
        }
        const pos = str.lastIndexOf(separator);
        if (pos == this.INDEX_NOT_FOUND) {
            return str;
        }
        return str.substring(0, pos);
    }

    /**
     * 获取最后一次出现分隔符后的子字符串。不返回分隔符。
     * null 字符串输入将返回 null。 空 ("") 字符串输入将返回空字符串。
     * 如果输入字符串不是 null 则空或 null 分隔符将返回空字符串。
     * 如果未找到任何内容，则返回空字符串。
     *
     * @param str 从中获取子字符串的字符串，可能为空
     * @param separator 要搜索的字符串，可能为空
     * @return {string} 隔板的最后出现，后子null ，如果为空字符串输入
     */
    public static

    substringAfterLast(str
                           :
                           string, separator
                           :
                           string
    ):
        string {
        if (this.isEmpty(str)) {
            return str;
        }
        if (this.isEmpty(separator)) {
            return this.EMPTY;
        }
        const pos = str.lastIndexOf(separator);
        if (
            pos === this.INDEX_NOT_FOUND ||
            pos === str.length - separator.length
        ) {
            return this.EMPTY;
        }
        return str.substring(pos + separator.length);
    }

    /**
     * 获取嵌套在同一字符串的两个实例之间的字符串。
     * null输入字符串返回null。null标签返回null
     *
     * @param str 包含子字符串的字符串，可能为空
     * @param open 子字符串之前的字符串，可能为空
     * @param close 子字符串之后的字符串，可能为空
     * @return {string} 子字符串，如果不匹配则为null
     */
    public static

    substringBetween(
        str
            :
            string,
        open
            :
            string,
        close
            :
            string
    ):
        string {
        if (ObjectUtils.allNotNull(str, open, close)) {
            const start = str.indexOf(open);
            if (start != this.INDEX_NOT_FOUND) {
                const end = str.indexOf(close, start + open.length);
                if (end != this.INDEX_NOT_FOUND) {
                    return str.substring(start + open.length, end);
                }
            }
        }
        return null;
    }

    /**
     * 在字符串中搜索由开始和结束标记分隔的子字符串，返回数组中所有匹配的子字符串。
     * null输入字符串返回null 。 null打开/关闭返回null （不匹配）。 空 ("") 打开/关闭返回null （不匹配）。
     *
     * @param str 包含子字符串的字符串，空返回空，空返回空
     * @param open 标识子字符串开头的字符串，空返回 null
     * @param close 标识子字符串结尾的字符串，空返回 null
     * @return {string} 子字符串的字符串数组，如果不匹配则为null
     */
    public static

    substringsBetween(
        str
            :
            string,
        open
            :
            string,
        close
            :
            string
    ):
        string[] {
        if (
            BooleanUtils.or(
                ObjectUtils.isNull(str),
                this.isAnyEmpty(open, close)
            )
        ) {
            return null;
        }
        const strLen = str.length;
        if (strLen === 0) {
            return [];
        }
        const closeLen = close.length;
        const openLen = open.length;
        const list = [];
        let pos = 0;
        while (pos < strLen - closeLen) {
            let start = str.indexOf(open, pos);
            if (start < 0) {
                break;
            }
            start += openLen;
            const end = str.indexOf(close, start);
            if (end < 0) {
                break;
            }
            list.push(str.substring(start, end));
            pos = end + closeLen;
        }
        if (ArrayUtils.isEmpty(list)) {
            return null;
        }
        return list;
    }

    public static

    split(
        str
            :
            string,
        separatorChars = null,
        max = -1
    ):
        string[] {
        return this.splitWorker(str, separatorChars, max, false);
    }

    public static

    splitByWholeSeparator(
        str
            :
            string,
        separatorChars
            :
            string,
        max = -1
    ):
        string[] {
        return this.splitByWholeSeparatorWorker(
            str,
            separatorChars,
            max,
            false
        );
    }

    public static

    splitByWholeSeparatorPreserveAllTokens(
        str
            :
            string,
        separatorChars
            :
            string,
        max = -1
    ):
        string[] {
        return this.splitByWholeSeparatorWorker(str, separatorChars, max, true);
    }

    private static

    splitByWholeSeparatorWorker(
        str
            :
            string,
        separator
            :
            string,
        max
            :
            number,
        preserveAllTokens
            :
            boolean
    ):
        string[] {
        if (ObjectUtils.isNull(str)) {
            return null;
        }

        const len = str.length;
        if (len === 0) {
            return [];
        }
        if (this.isEmpty(separator)) {
            return this.splitWorker(str, null, max, preserveAllTokens);
        }

        const separatorLength = separator.length;
        const substrings = [];

        let numberOfSubstrings = 0;
        let beg = 0;
        let end = 0;
        while (end < len) {
            end = str.indexOf(separator, beg);

            if (end > -1) {
                if (end > beg) {
                    numberOfSubstrings += 1;

                    if (numberOfSubstrings == max) {
                        end = len;
                        substrings.push(str.substring(beg));
                    } else {
                        substrings.push(str.substring(beg, end));
                        beg = end + separatorLength;
                    }
                } else {
                    if (preserveAllTokens) {
                        numberOfSubstrings += 1;
                        if (numberOfSubstrings == max) {
                            end = len;
                            substrings.push(str.substring(beg));
                        } else {
                            substrings.push(this.EMPTY);
                        }
                    }
                    beg = end + separatorLength;
                }
            } else {
                substrings.push(str.substring(beg));
                end = len;
            }
        }
        return substrings;
    }

    public static

    splitPreserveAllTokens(
        str
            :
            string,
        separatorChar
            :
            string,
        max = -1
    ):
        string[] {
        return this.splitWorker(str, separatorChar, max, true);
    }

    private static

    splitWorker(
        str
            :
            string,
        separatorChars,
        max
            :
            number,
        preserveAllTokens
            :
            boolean
    ):
        string[] {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        const len = str.length;
        if (len === 0) {
            return [];
        }
        const list = [];
        let sizePlus1 = 1;
        let i = 0,
            start = 0;
        let match = false;
        let lastMatch = false;
        if (separatorChars === null) {
            while (i < len) {
                if (this.isWhitespace(str.charAt(i))) {
                    if (BooleanUtils.or(match, preserveAllTokens)) {
                        lastMatch = true;
                        if (sizePlus1++ === max) {
                            i = len;
                            lastMatch = false;
                        }
                        list.push(str.substring(start, i));
                        match = false;
                    }
                    start = ++i;
                    continue;
                }
                lastMatch = false;
                match = true;
                i++;
            }
        } else if (separatorChars.length() == 1) {
            const sep = separatorChars.charAt(0);
            while (i < len) {
                if (str.charAt(i) === sep) {
                    if (BooleanUtils.or(match, preserveAllTokens)) {
                        lastMatch = true;
                        if (sizePlus1++ === max) {
                            i = len;
                            lastMatch = false;
                        }
                        list.push(str.substring(start, i));
                        match = false;
                    }
                    start = ++i;
                    continue;
                }
                lastMatch = false;
                match = true;
                i++;
            }
        } else {
            while (i < len) {
                if (separatorChars.indexOf(str.charAt(i)) >= 0) {
                    if (BooleanUtils.or(match, preserveAllTokens)) {
                        lastMatch = true;
                        if (sizePlus1++ === max) {
                            i = len;
                            lastMatch = false;
                        }
                        list.push(str.substring(start, i));
                        match = false;
                    }
                    start = ++i;
                    continue;
                }
                lastMatch = false;
                match = true;
                i++;
            }
        }
        if (BooleanUtils.or(match, preserveAllTokens) && lastMatch) {
            list.push(str.substring(start, i));
        }
        return list;
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
    public static

    regionMatches(
        str1
            :
            string,
        str1Offset
            :
            number,
        str2
            :
            string,
        str2Offset
            :
            number,
        length
            :
            number,
        ignoreCase
            :
            boolean
    ):
        boolean {
        const strArr = this.toCharArray(str1);
        let to = str1Offset;

        const otherArr = this.toCharArray(str2);
        let po = str2Offset;

        if (
            BooleanUtils.or(
                str1Offset < 0 || str2Offset < 0,
                str1Offset > strArr.length - length,
                str2Offset > otherArr.length - length
            )
        ) {
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
    public static

    toCharArray(str
                    :
                    string
    ):
        string[] {
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
    public static

    isUpperCase(ch
                    :
                    string
    ):
        boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 65, code <= 90);
    }

    /**
     * 判断是否为大写字母
     *
     * @param {string} ch 待判断字符
     * @returns {boolean} 为大写字母返回true，否则返回false
     */
    public static

    isLowerCase(ch
                    :
                    string
    ):
        boolean {
        const code = ch.charCodeAt(0);
        return BooleanUtils.and(code >= 97, code <= 122);
    }

    /**
     * 下划线格式字符串转为小驼峰格式
     */
    public static

    underLineToCamelCase(str
                             :
                             string
    ):
        string {
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
    public static

    camelCaseToUnderLine(str
                             :
                             string
    ):
        string {
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

    public static

    getLength(str
                  :
                  string
    ):
        number {
        return ObjectUtils.isNull(str) ? 0 : str.length;
    }

    /**
     * <p>左填充一个具有指定字符串的字符串。</p>
     *
     * <p>填充到 size 的大小。</p>
     *
     * <pre>
     * StringUtils.leftPad(null, *, *)      = null
     * StringUtils.leftPad("", 3, "z")      = "zzz"
     * StringUtils.leftPad("bat", 3, "yz")  = "bat"
     * StringUtils.leftPad("bat", 5, "yz")  = "yzbat"
     * StringUtils.leftPad("bat", 8, "yz")  = "yzyzybat"
     * StringUtils.leftPad("bat", 1, "yz")  = "bat"
     * StringUtils.leftPad("bat", -1, "yz") = "bat"
     * StringUtils.leftPad("bat", 5, null)  = "  bat"
     * StringUtils.leftPad("bat", 5, "")    = "  bat"
     * </pre>
     *
     * @param str 要填充的字符串，可能为 null 或 undefined
     * @param size 要填充的大小
     * @param padStr 要填充的字符串，null、undefined 或空视为单个空白
     * @return 如果不需要填充，则为左填充字符串或原始字符串，如果为空字符串输入，则返回 null
     */
    public static

    leftPad(str
                :
                string, size
                :
                number, padStr
                :
                string
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (this.isEmpty(padStr)) {
            padStr = this.SPACE;
        }
        const padLen = padStr.length;
        const strLen = str.length;
        const pads = size - strLen;
        if (pads <= 0) {
            return str;
        }
        if (padLen === 1 && pads <= this.PAD_LIMIT) {
            return this.repeat(padStr, pads).concat(str);
        }

        if (pads === padLen) {
            return padStr.concat(str);
        } else if (pads < padLen) {
            return padStr.substring(0, pads).concat(str);
        } else {
            const padding = [];
            for (let i = 0; i < padStr.length; i++) {
                padding[i] = padStr.charAt(i % padLen);
            }
            return padding.join("").concat(str);
        }
    }

    /**
     * <p>用指定的字符串右填充一个字符串。</p>
     *
     * <p>字符串被填充到 size 的大小。</p>
     *
     * <pre>
     * StringUtils.rightPad(null, *, *)      = null
     * StringUtils.rightPad("", 3, "z")      = "zzz"
     * StringUtils.rightPad("bat", 3, "yz")  = "bat"
     * StringUtils.rightPad("bat", 5, "yz")  = "batyz"
     * StringUtils.rightPad("bat", 8, "yz")  = "batyzyzy"
     * StringUtils.rightPad("bat", 1, "yz")  = "bat"
     * StringUtils.rightPad("bat", -1, "yz") = "bat"
     * StringUtils.rightPad("bat", 5, null)  = "bat  "
     * StringUtils.rightPad("bat", 5, "")    = "bat  "
     * </pre>
     *
     * @param str 要填充的字符串，可能为 null 或 undefined
     * @param size 要填充的大小
     * @param padStr 要填充的字符串，null、undefined 或空视为单个空白
     * @return 如果不需要填充，则右填充字符串或原始字符串，如果为空字符串输入，则返回 null
     */
    public static

    rightPad(str
                 :
                 string, size
                 :
                 number, padStr
                 :
                 string
    ):
        string {
        if (ObjectUtils.isNull(str)) {
            return null;
        }
        if (this.isEmpty(padStr)) {
            padStr = this.SPACE;
        }
        const padLen = padStr.length;
        const strLen = str.length;
        const pads = size - strLen;
        if (pads <= 0) {
            return str;
        }
        if (padLen === 1 && pads <= this.PAD_LIMIT) {
            return this.repeat(padStr, pads).concat(str);
        }

        if (pads === padLen) {
            return str.concat(padStr);
        } else if (pads < padLen) {
            return str.concat(padStr.substring(0, pads));
        } else {
            const padding = [];
            for (let i = 0; i < padStr.length; i++) {
                padding[i] = padStr.charAt(i % padLen);
            }
            return str.concat(padding.join(""));
        }
    }

    /**
     * <p>使用重复到给定长度的指定字符串返回填充。</p>
     *
     * <pre>
     * StringUtils.repeat('e', 0)  = ""
     * StringUtils.repeat('e', 3)  = "eee"
     * StringUtils.repeat('e', -2) = ""
     * </pre>
     *
     * @param str 重复的字符串
     * @param repeat 重复字符的次数，负数视为零
     * @return {} 具有重复字符串的字符串
     */
    public static

    repeat(str
               :
               string, repeat
               :
               number
    ):
        string {
        if (repeat <= 0) {
            return this.EMPTY;
        }
        return ArrayUtils.fill(str, repeat).join("");
    }

// eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {
    }
}
