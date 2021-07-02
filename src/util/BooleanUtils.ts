/**
 * 布尔工具类
 *
 * @author pangju
 * @version 1.0 2021-7-2
 */
export default class BooleanUtils {
    /**
     * 判断是否至少有一个条件成立
     * @param conditions 判断条件
     */
    public static or(...conditions: boolean[]): boolean {
        for (const condition of conditions) {
            if (condition) {
                return true
            }
        }
        return false
    }

    /**
     * 判断是否全部条件都成立
     * @param conditions 判断条件
     */
    public static and(...conditions: boolean[]): boolean {
        for (const condition of conditions) {
            if (!condition) {
                return false
            }
        }
        return true
    }

    /**
     * 取条件相反结果
     * @param condition 判断条件
     */
    public static not(condition: boolean): boolean {
        return !condition
    }

    // 防止实例化
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {
    }
}
