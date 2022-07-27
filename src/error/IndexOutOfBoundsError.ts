/**
 * 抛出以指示某种索引（例如数组、字符串或向量）超出范围。
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class IndexOutOfBoundsError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
