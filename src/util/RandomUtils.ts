import {IllegalArgumentError} from "../core/runtimeError";

/**
 * 随机数工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class RandomUtils {
    private static readonly MIN_CODE = String.fromCharCode(33);
    private static readonly MAX_CODE = String.fromCharCode(126);

    /**
     * <p>
     * Returns a random boolean value
     * </p>
     *
     * @return the random boolean
     * @since 3.5
     */
    public static nextBoolean(): boolean {
        return this.nextInt(1) === 1;
    }

    public static nextInt(endExclusive = Number.MAX_SAFE_INTEGER, startInclusive = 0): number {
        if (endExclusive < startInclusive) {
            throw new IllegalArgumentError("起始值必须小于或等于结束值。");
        }
        if (startInclusive < 0) {
            throw new IllegalArgumentError("两个范围值都必须为非负数。");
        }

        if (startInclusive === endExclusive) {
            return startInclusive;
        }

        return Math.floor(this.random(startInclusive, endExclusive));
    }

    public static nextFloat(endExclusive = Number.MAX_VALUE, startInclusive = 0): number {
        if (endExclusive < startInclusive) {
            throw new IllegalArgumentError("起始值必须小于或等于结束值。");
        }
        if (startInclusive < 0) {
            throw new IllegalArgumentError("两个范围值都必须为非负数。");
        }

        if (startInclusive === endExclusive) {
            return startInclusive;
        }

        return this.random(startInclusive, endExclusive);
    }

    private static random(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }
}
