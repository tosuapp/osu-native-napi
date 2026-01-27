import type { NativeModsCollection } from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import type { Mod } from "./Mod";
import raw from "@tosuapp/osu-native-napi-raw";

export class ModsCollection extends NativeHandleOwner<NativeModsCollection> {
  static create(): ModsCollection {
    const native = new raw.NativeModsCollection();
    OsuNative.assertOk(
      "ModsCollection_Create",
      raw.ModsCollection_Create(native),
    );
    return new ModsCollection(native);
  }

  add(mod: Mod): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "ModsCollection_Add",
      raw.ModsCollection_Add(this.handle, mod.handle),
    );
  }

  remove(mod: Mod): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "ModsCollection_Remove",
      raw.ModsCollection_Remove(this.handle, mod.handle),
    );
  }

  debug(): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "ModsCollection_Debug",
      raw.ModsCollection_Debug(this.handle),
    );
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk(
      "ModsCollection_Destroy",
      raw.ModsCollection_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
