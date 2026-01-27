import type { NativeMod } from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import raw from "@tosuapp/osu-native-napi-raw";

export class Mod extends NativeHandleOwner<NativeMod> {
  static create(acronym: string): Mod {
    const native = new raw.NativeMod();
    OsuNative.assertOk("Mod_Create", raw.Mod_Create(acronym, native));
    return new Mod(native);
  }

  setSettingBool(key: string, value: boolean): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "Mod_SetSettingBool",
      raw.Mod_SetSettingBool(this.handle, key, value),
    );
  }

  setSettingInteger(key: string, value: number): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "Mod_SetSettingInteger",
      raw.Mod_SetSettingInteger(this.handle, key, value),
    );
  }

  setSettingFloat(key: string, value: number): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "Mod_SetSettingFloat",
      raw.Mod_SetSettingFloat(this.handle, key, value),
    );
  }

  debug(): void {
    this.ensureAlive();
    OsuNative.assertOk("Mod_Debug", raw.Mod_Debug(this.handle));
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk("Mod_Destroy", raw.Mod_Destroy(this.handle));
    this.destroyed = true;
  }
}
