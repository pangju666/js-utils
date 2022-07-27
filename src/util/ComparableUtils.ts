import {Comparator, Predicate} from "../type/TypeAlias";

export class ComparableUtils {
    /**
     * 检查 [b <= a <= c] 或 [b >= a >= c]
     *
     * @param b the object to compare to the tested object
     * @param c the object to compare to the tested object
     * @param <A> type of the test object
     * @return a predicate for true if the tested object is between b and c
     */
    public static between<T>(b: T, c: T, comparator: Comparator<T>): boolean {
        return a -> is(a).between(b, c);
    }
}
