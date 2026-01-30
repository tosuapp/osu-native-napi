import type {
  NativeTaikoDifficultyAttributes,
  NativeTaikoDifficultyCalculator,
  NativeTimedTaikoDifficultyAttributes,
} from "@tosuapp/osu-native-napi-raw";
import raw from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";

export class TaikoDifficultyCalculator extends NativeHandleOwner<NativeTaikoDifficultyCalculator> {
  constructor(
    native: NativeTaikoDifficultyCalculator,
    readonly ruleset: Ruleset,
    readonly beatmap: Beatmap,
  ) {
    super(native);
  }

  static create(ruleset: Ruleset, beatmap: Beatmap): TaikoDifficultyCalculator {
    const native = new raw.NativeTaikoDifficultyCalculator();
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_Create",
      raw.TaikoDifficultyCalculator_Create(
        ruleset.handle,
        beatmap.handle,
        native,
      ),
    );
    return new TaikoDifficultyCalculator(native, ruleset, beatmap);
  }

  calculate(): NativeTaikoDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeTaikoDifficultyAttributes();
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_Calculate",
      raw.TaikoDifficultyCalculator_Calculate(this.handle, attrs),
    );
    return attrs;
  }

  calculateWithMods(mods: ModsCollection): NativeTaikoDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeTaikoDifficultyAttributes();
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_CalculateMods",
      raw.TaikoDifficultyCalculator_CalculateMods(
        this.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
  }

  calculateTimed(): NativeTimedTaikoDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "TaikoDifficultyCalculator_CalculateTimed",
      raw.TaikoDifficultyCalculator_CalculateTimed(
        this.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedTaikoDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_CalculateTimed",
      raw.TaikoDifficultyCalculator_CalculateTimed(
        this.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateWithModsTimed(
    mods: ModsCollection,
  ): NativeTimedTaikoDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "TaikoDifficultyCalculator_CalculateModsTimed",
      raw.TaikoDifficultyCalculator_CalculateModsTimed(
        this.handle,
        mods.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedTaikoDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_CalculateModsTimed",
      raw.TaikoDifficultyCalculator_CalculateModsTimed(
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
      "TaikoDifficultyCalculator_Destroy",
      raw.TaikoDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
