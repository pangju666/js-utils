/**
 * 表示解析时意外到达错误的信号。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ParseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
