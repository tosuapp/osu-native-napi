export class OsuNativeError extends Error {
  readonly errno: number;
  readonly operation: string;
  readonly rawMessage?: string;
  readonly code?: string;

  constructor(operation: string, errno: number, message: string, code?: string, rawMessage?: string) {
    super(message);
    this.name = "OsuNativeError";
    this.errno = errno;
    this.operation = operation;
    this.rawMessage = rawMessage;
    this.code = code;
  }
}
