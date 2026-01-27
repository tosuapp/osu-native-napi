import { OsuNativeError } from "./OsuNativeError";

import raw from "@tosuapp/osu-native-napi-raw";

import type OsuNativeRaw from "@tosuapp/osu-native-napi-raw";
import type { ManagedObjectHandle } from "@tosuapp/osu-native-napi-raw";

type ErrorCodeMap = (typeof OsuNativeRaw)["ErrorCode"];
type ErrorCodeValue = Extract<ErrorCodeMap[keyof ErrorCodeMap], number>;

export class OsuNative {
  static errorCode: Readonly<Record<string, ErrorCodeValue>> =
    raw.ErrorCode as unknown as Record<string, ErrorCodeValue>;

  private static errorCodeNameByValue: ReadonlyMap<ErrorCodeValue, string> =
    new Map(
      Object.entries(raw.ErrorCode as Record<string, unknown>)
        .filter(
          (entry): entry is [string, ErrorCodeValue] =>
            typeof entry[1] === "number",
        )
        .map(([name, value]) => [value, name]),
    );

  static getLastMessage(): string | undefined {
    const msg = raw.ErrorHandler_GetLastMessage();

    const trimmed = msg.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  static errorCodeName(value: ErrorCodeValue): string | undefined {
    return OsuNative.errorCodeNameByValue.get(value);
  }

  static toError(operation: string, value: ErrorCodeValue): OsuNativeError {
    const name = this.errorCodeName(value);
    const rawMessage = this.getLastMessage();
    const suffix = rawMessage ? `: ${rawMessage}` : "";
    const message = `${operation} failed (${name ?? value})${suffix}`;

    return new OsuNativeError(operation, value, message, name, rawMessage);
  }

  static assertOk(operation: string, value: ErrorCodeValue): void {
    if (value === raw.ErrorCode.SUCCESS) {
      return;
    }

    throw this.toError(operation, value);
  }

  static assertSizeQuery(operation: string, value: ErrorCodeValue): void {
    if (value === raw.ErrorCode.BUFFER_SIZE_QUERY) {
      return;
    }

    throw this.toError(operation, value);
  }

  static makeNullHandle(): ManagedObjectHandle {
    return new raw.ManagedObjectHandle();
  }
}
