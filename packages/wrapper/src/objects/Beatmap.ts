import type { NativeBeatmap } from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import raw from "@tosuapp/osu-native-napi-raw";

export class Beatmap extends NativeHandleOwner<NativeBeatmap> {
  static fromFile(filePath: string): Beatmap {
    const native = new raw.NativeBeatmap();
    OsuNative.assertOk(
      "Beatmap_CreateFromFile",
      raw.Beatmap_CreateFromFile(filePath, native),
    );
    return new Beatmap(native);
  }

  static fromText(text: string): Beatmap {
    const native = new raw.NativeBeatmap();
    OsuNative.assertOk(
      "Beatmap_CreateFromText",
      raw.Beatmap_CreateFromText(text, native),
    );
    return new Beatmap(native);
  }

  constructor(native: NativeBeatmap) {
    super(native);
  }

  // note: those are not handled, because we don't have a way to pass null to obtain buffer size yet
  getTitle(): string {
    this.ensureAlive();

    return "";
  }

  getArtist(): string {
    this.ensureAlive();

    return "";
  }

  getVersion(): string {
    this.ensureAlive();

    return "";
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk("Beatmap_Destroy", raw.Beatmap_Destroy(this.handle));
    this.destroyed = true;
  }
}
