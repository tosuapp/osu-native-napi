import {
  ManagedObjectHandle,
  NativeModsCollection,
} from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import type { Mod } from "./Mod";
import raw from "@tosuapp/osu-native-napi-raw";

export class ModsCollection extends NativeHandleOwner<NativeModsCollection> {
  private mods: ManagedObjectHandle[] = [];

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

    this.mods.push(mod.handle);
  }

  has(mod: Mod): boolean {
    return this.mods.find((x) => x == mod.handle) !== undefined;
  }

  remove(mod: Mod): void {
    this.ensureAlive();
    OsuNative.assertOk(
      "ModsCollection_Remove",
      raw.ModsCollection_Remove(this.handle, mod.handle),
    );
    this.mods = this.mods.filter((x) => x !== mod.handle);
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
