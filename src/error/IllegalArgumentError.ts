/**
 * 抛出以指示方法已传递了非法或不适当的参数。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class IllegalArgumentError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
