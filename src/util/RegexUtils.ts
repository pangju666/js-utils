import {ObjectUtils} from "./ObjectUtils";
import {StringUtils} from "./StringUtils";

/**
 * TODO:重构
 * 正则表达式工具类
 *
 * @author 胖橘
 * @version 1.0
 */
export class RegexUtils {
    /**
     * <p>删除与给定正则表达式模式匹配的文本字符串的每个子字符串。</p>
     *
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * RegexUtils.removeAll(null, *)      = null
     * RegexUtils.removeAll("any", (String) null)  = "any"
     * RegexUtils.removeAll("any", "")    = "any"
     * RegexUtils.removeAll("any", ".*")  = ""
     * RegexUtils.removeAll("any", ".+")  = ""
     * RegexUtils.removeAll("abc", ".?")  = ""
     * RegexUtils.removeAll("A<__>\n<__>B", "<.*>")      = "A\nB"
     * RegexUtils.removeAll("A<__>\n<__>B", "(?s)<.*>")  = "AB"
     * RegexUtils.removeAll("ABCabc123abc", "[a-z]")     = "ABC123"
     * </pre>
     *
     * @param text  text to remove from, may be null
     * @param regex  the regular expression to which this string is to be matched
     * @return  the text with any removes processed,
     *              {@code null} if null String input
     *
     * @see {@link RegexUtils#replaceAll}
     */
    public static removeAll(text: string, regex: string | RegExp): string {
        return this.replaceAll(text, regex, StringUtils.EMPTY);
    }

    /**
     * <p>Removes the first substring of the text string that matches the given regular expression pattern.</p>
     *
     * This method is a {@code null} safe equivalent to:
     * <ul>
     *  <li>{@code pattern.matcher(text).replaceFirst(RegexUtils.EMPTY)}</li>
     * </ul>
     *
     * <p>A {@code null} reference passed to this method is a no-op.</p>
     *
     * <pre>
     * RegexUtils.removeFirst(null, *)      = null
     * RegexUtils.removeFirst("any", (Pattern) null)  = "any"
     * RegexUtils.removeFirst("any", Pattern.compile(""))    = "any"
     * RegexUtils.removeFirst("any", Pattern.compile(".*"))  = ""
     * RegexUtils.removeFirst("any", Pattern.compile(".+"))  = ""
     * RegexUtils.removeFirst("abc", Pattern.compile(".?"))  = "bc"
     * RegexUtils.removeFirst("A&lt;__&gt;\n&lt;__&gt;B", Pattern.compile("&lt;.*&gt;"))      = "A\n&lt;__&gt;B"
     * RegexUtils.removeFirst("A&lt;__&gt;\n&lt;__&gt;B", Pattern.compile("(?s)&lt;.*&gt;"))  = "AB"
     * RegexUtils.removeFirst("ABCabc123", Pattern.compile("[a-z]"))          = "ABCbc123"
     * RegexUtils.removeFirst("ABCabc123abc", Pattern.compile("[a-z]+"))      = "ABC123abc"
     * </pre>
     *
     * @param text  text to remove from, may be null
     * @param regex  the regular expression pattern to which this string is to be matched
     * @return  the text with the first replacement processed,
     *              {@code null} if null String input
     *
     * @see #replaceFirst(String, Pattern, String)
     * @see java.util.regex.Matcher#replaceFirst(String)
     * @see java.util.regex.Pattern
     */
    public static removeFirst(text: string, regex: string | RegExp): string {
        return this.replaceFirst(text, regex, StringUtils.EMPTY);
    }

    /**
     * <p>删除与给定正则表达式模式匹配的文本字符串的每个子字符串。</p>
     *
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * RegexUtils.removeAll(null, *)      = null
     * RegexUtils.removeAll("any", (String) null)  = "any"
     * RegexUtils.removeAll("any", "")    = "any"
     * RegexUtils.removeAll("any", ".*")  = ""
     * RegexUtils.removeAll("any", ".+")  = ""
     * RegexUtils.removeAll("abc", ".?")  = ""
     * RegexUtils.removeAll("A<__>\n<__>B", "<.*>")      = "A\nB"
     * RegexUtils.removeAll("A<__>\n<__>B", "(?s)<.*>")  = "AB"
     * RegexUtils.removeAll("ABCabc123abc", "[a-z]")     = "ABC123"
     * </pre>
     *
     * @param text  text to remove from, may be null
     * @param regex  the regular expression to which this string is to be matched
     * @return  the text with any removes processed,
     *              {@code null} if null String input
     *
     * @see {@link RegexUtils#replaceAll}
     */
    public static removePattern(text: string, regex: string | RegExp): string {
        return this.replacePattern(text, regex, StringUtils.EMPTY);
    }

    /**
     * <p>Replaces each substring of the text String that matches the given regular expression pattern with the given replacement.</p>
     *
     * This method is a {@code null} safe equivalent to:
     * <ul>
     *  <li>{@code pattern.matcher(text).replaceAll(replacement)}</li>
     * </ul>
     *
     * <p>A {@code null} reference passed to this method is a no-op.</p>
     *
     * <pre>
     * RegexUtils.replaceAll(null, *, *)       = null
     * RegexUtils.replaceAll("any", (Pattern) null, *)   = "any"
     * RegexUtils.replaceAll("any", *, null)   = "any"
     * RegexUtils.replaceAll("", Pattern.compile(""), "zzz")    = "zzz"
     * RegexUtils.replaceAll("", Pattern.compile(".*"), "zzz")  = "zzz"
     * RegexUtils.replaceAll("", Pattern.compile(".+"), "zzz")  = ""
     * RegexUtils.replaceAll("abc", Pattern.compile(""), "ZZ")  = "ZZaZZbZZcZZ"
     * RegexUtils.replaceAll("&lt;__&gt;\n&lt;__&gt;", Pattern.compile("&lt;.*&gt;"), "z")                 = "z\nz"
     * RegexUtils.replaceAll("&lt;__&gt;\n&lt;__&gt;", Pattern.compile("&lt;.*&gt;", Pattern.DOTALL), "z") = "z"
     * RegexUtils.replaceAll("&lt;__&gt;\n&lt;__&gt;", Pattern.compile("(?s)&lt;.*&gt;"), "z")             = "z"
     * RegexUtils.replaceAll("ABCabc123", Pattern.compile("[a-z]"), "_")       = "ABC___123"
     * RegexUtils.replaceAll("ABCabc123", Pattern.compile("[^A-Z0-9]+"), "_")  = "ABC_123"
     * RegexUtils.replaceAll("ABCabc123", Pattern.compile("[^A-Z0-9]+"), "")   = "ABC123"
     * RegexUtils.replaceAll("Lorem ipsum  dolor   sit", Pattern.compile("( +)([a-z]+)"), "_$2")  = "Lorem_ipsum_dolor_sit"
     * </pre>
     *
     * @param text  text to search and replace in, may be null
     * @param regex  the regular expression pattern to which this string is to be matched
     * @param replacement  the string to be substituted for each match
     * @return  the text with any replacements processed,
     *              {@code null} if null String input
     *
     * @see java.util.regex.Matcher#replaceAll(String)
     * @see java.util.regex.Pattern
     */
    public static replaceAll(text: string, regex: string | RegExp, replacement: string): string {
        if (ObjectUtils.anyNull(text, regex, replacement)) {
            return text;
        }
        return text.replaceAll(new RegExp(regex, "m"), replacement);
    }

    /**
     * <p>Replaces the first substring of the text string that matches the given regular expression pattern
     * with the given replacement.</p>
     *
     * This method is a {@code null} safe equivalent to:
     * <ul>
     *  <li>{@code pattern.matcher(text).replaceFirst(replacement)}</li>
     * </ul>
     *
     * <p>A {@code null} reference passed to this method is a no-op.</p>
     *
     * <pre>
     * RegexUtils.replaceFirst(null, *, *)       = null
     * RegexUtils.replaceFirst("any", (Pattern) null, *)   = "any"
     * RegexUtils.replaceFirst("any", *, null)   = "any"
     * RegexUtils.replaceFirst("", Pattern.compile(""), "zzz")    = "zzz"
     * RegexUtils.replaceFirst("", Pattern.compile(".*"), "zzz")  = "zzz"
     * RegexUtils.replaceFirst("", Pattern.compile(".+"), "zzz")  = ""
     * RegexUtils.replaceFirst("abc", Pattern.compile(""), "ZZ")  = "ZZabc"
     * RegexUtils.replaceFirst("&lt;__&gt;\n&lt;__&gt;", Pattern.compile("&lt;.*&gt;"), "z")      = "z\n&lt;__&gt;"
     * RegexUtils.replaceFirst("&lt;__&gt;\n&lt;__&gt;", Pattern.compile("(?s)&lt;.*&gt;"), "z")  = "z"
     * RegexUtils.replaceFirst("ABCabc123", Pattern.compile("[a-z]"), "_")          = "ABC_bc123"
     * RegexUtils.replaceFirst("ABCabc123abc", Pattern.compile("[^A-Z0-9]+"), "_")  = "ABC_123abc"
     * RegexUtils.replaceFirst("ABCabc123abc", Pattern.compile("[^A-Z0-9]+"), "")   = "ABC123abc"
     * RegexUtils.replaceFirst("Lorem ipsum  dolor   sit", Pattern.compile("( +)([a-z]+)"), "_$2")  = "Lorem_ipsum  dolor   sit"
     * </pre>
     *
     * @param text  text to search and replace in, may be null
     * @param regex  the regular expression pattern to which this string is to be matched
     * @param replacement  the string to be substituted for the first match
     * @return  the text with the first replacement processed,
     *              {@code null} if null String input
     *
     * @see java.util.regex.Matcher#replaceFirst(String)
     * @see java.util.regex.Pattern
     */
    public static replaceFirst(text: string, regex: string | RegExp, replacement: string): string {
        if (text == null || regex == null || replacement == null) {
            return text;
        }
        return text.replace(new RegExp(regex), replacement);
    }

    /**
     * <p>Replaces each substring of the source String that matches the given regular expression with the given
     * replacement using the {@link Pattern#DOTALL} option. DOTALL is also known as single-line mode in Perl.</p>
     *
     * This call is a {@code null} safe equivalent to:
     * <ul>
     * <li>{@code text.replaceAll(&quot;(?s)&quot; + regex, replacement)}</li>
     * <li>{@code Pattern.compile(regex, Pattern.DOTALL).matcher(text).replaceAll(replacement)}</li>
     * </ul>
     *
     * <p>A {@code null} reference passed to this method is a no-op.</p>
     *
     * <pre>
     * StringUtils.replacePattern(null, *, *)       = null
     * StringUtils.replacePattern("any", (String) null, *)   = "any"
     * StringUtils.replacePattern("any", *, null)   = "any"
     * StringUtils.replacePattern("", "", "zzz")    = "zzz"
     * StringUtils.replacePattern("", ".*", "zzz")  = "zzz"
     * StringUtils.replacePattern("", ".+", "zzz")  = ""
     * StringUtils.replacePattern("&lt;__&gt;\n&lt;__&gt;", "&lt;.*&gt;", "z")       = "z"
     * StringUtils.replacePattern("ABCabc123", "[a-z]", "_")       = "ABC___123"
     * StringUtils.replacePattern("ABCabc123", "[^A-Z0-9]+", "_")  = "ABC_123"
     * StringUtils.replacePattern("ABCabc123", "[^A-Z0-9]+", "")   = "ABC123"
     * StringUtils.replacePattern("Lorem ipsum  dolor   sit", "( +)([a-z]+)", "_$2")  = "Lorem_ipsum_dolor_sit"
     * </pre>
     *
     * @param text
     *            the source string
     * @param regex
     *            the regular expression to which this string is to be matched
     * @param replacement
     *            the string to be substituted for each match
     * @return The resulting {@code String}
     * @see #replaceAll(String, String, String)
     * @see String#replaceAll(String, String)
     * @see Pattern#DOTALL
     */
    public static replacePattern(text: string, regex: string | RegExp, replacement: string): string {
        if (ObjectUtils.anyNull(text, regex, replacement)) {
            return text;
        }
        return text.replaceAll(new RegExp(regex, "m"), replacement);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {
    }
}
