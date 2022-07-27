/**
 * 抛出以指示方法已传递了 undefined 或 null 的参数。
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class NullError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
