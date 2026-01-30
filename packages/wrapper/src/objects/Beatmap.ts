import type { NativeBeatmap } from "@tosuapp/osu-native-napi";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import raw from "@tosuapp/osu-native-napi";

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

  getTitle(): string {
    this.ensureAlive();

    const bufferSizeArr = new Int32Array([0]);
    OsuNative.assertSizeQuery(
      "Beatmap_GetTitle",
      raw.Beatmap_GetTitle(this.handle, null, bufferSizeArr),
    );

    const buffer = Buffer.alloc(bufferSizeArr[0]);
    OsuNative.assertOk(
      "Beatmap_GetTitle",
      raw.Beatmap_GetTitle(this.handle, buffer, bufferSizeArr),
    );

    return buffer.toString();
  }

  getArtist(): string {
    this.ensureAlive();

    const bufferSizeArr = new Int32Array([0]);
    OsuNative.assertSizeQuery(
      "Beatmap_GetArtist",
      raw.Beatmap_GetArtist(this.handle, null, bufferSizeArr),
    );

    const buffer = Buffer.alloc(bufferSizeArr[0]);
    OsuNative.assertOk(
      "Beatmap_GetArtist",
      raw.Beatmap_GetArtist(this.handle, buffer, bufferSizeArr),
    );

    return buffer.toString();
  }

  getVersion(): string {
    this.ensureAlive();

    const bufferSizeArr = new Int32Array([0]);
    OsuNative.assertSizeQuery(
      "Beatmap_GetVersion",
      raw.Beatmap_GetVersion(this.handle, null, bufferSizeArr),
    );

    const buffer = Buffer.alloc(bufferSizeArr[0]);
    OsuNative.assertOk(
      "Beatmap_GetArtist",
      raw.Beatmap_GetVersion(this.handle, buffer, bufferSizeArr),
    );

    return buffer.toString();
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk("Beatmap_Destroy", raw.Beatmap_Destroy(this.handle));
    this.destroyed = true;
  }
}
