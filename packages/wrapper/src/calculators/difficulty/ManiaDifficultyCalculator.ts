import type {
  NativeManiaDifficultyAttributes,
  NativeManiaDifficultyCalculator,
  NativeTimedManiaDifficultyAttributes,
} from "@tosuapp/osu-native-napi-raw";
import raw from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";

export class ManiaDifficultyCalculator extends NativeHandleOwner<NativeManiaDifficultyCalculator> {
  constructor(
    native: NativeManiaDifficultyCalculator,
    readonly ruleset: Ruleset,
    readonly beatmap: Beatmap,
  ) {
    super(native);
  }

  static create(ruleset: Ruleset, beatmap: Beatmap): ManiaDifficultyCalculator {
    const native = new raw.NativeManiaDifficultyCalculator();
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_Create",
      raw.ManiaDifficultyCalculator_Create(
        ruleset.handle,
        beatmap.handle,
        native,
      ),
    );
    return new ManiaDifficultyCalculator(native, ruleset, beatmap);
  }

  calculate(): NativeManiaDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeManiaDifficultyAttributes();
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_Calculate",
      raw.ManiaDifficultyCalculator_Calculate(this.handle, attrs),
    );
    return attrs;
  }

  calculateWithMods(mods: ModsCollection): NativeManiaDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeManiaDifficultyAttributes();
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_CalculateMods",
      raw.ManiaDifficultyCalculator_CalculateMods(
        this.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
  }

  calculateTimed(): NativeTimedManiaDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "ManiaDifficultyCalculator_CalculateTimed",
      raw.ManiaDifficultyCalculator_CalculateTimed(
        this.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedManiaDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_CalculateTimed",
      raw.ManiaDifficultyCalculator_CalculateTimed(
        this.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateWithModsTimed(
    mods: ModsCollection,
  ): NativeTimedManiaDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "ManiaDifficultyCalculator_CalculateModsTimed",
      raw.ManiaDifficultyCalculator_CalculateModsTimed(
        this.handle,
        mods.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedManiaDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_CalculateModsTimed",
      raw.ManiaDifficultyCalculator_CalculateModsTimed(
        this.handle,
        mods.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk(
      "ManiaDifficultyCalculator_Destroy",
      raw.ManiaDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
