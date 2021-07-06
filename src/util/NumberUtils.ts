export class NumberUtils {
  /**
   * 生成随机整数
   *
   * @param min 最小取值，必须大于等于0
   * @param max 最大取值，必须大于等于0
   */
  public static randomInteger(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
