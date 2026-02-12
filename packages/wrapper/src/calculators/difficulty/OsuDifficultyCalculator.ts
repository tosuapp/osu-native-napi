import type {
  NativeOsuDifficultyAttributes,
  NativeOsuDifficultyCalculator,
  NativeTimedOsuDifficultyAttributes,
} from "@tosuapp/osu-native-napi";
import raw, { ManagedObjectHandle } from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";
import { TimedLazy } from "../../types/calculator";

export class OsuDifficultyCalculator extends NativeHandleOwner<NativeOsuDifficultyCalculator> {
  constructor(
    native: NativeOsuDifficultyCalculator,
    readonly ruleset: Ruleset,
    readonly beatmap: Beatmap,
  ) {
    super(native);
  }

  static create(ruleset: Ruleset, beatmap: Beatmap): OsuDifficultyCalculator {
    const native = new raw.NativeOsuDifficultyCalculator();
    OsuNative.assertOk(
      "OsuDifficultyCalculator_Create",
      raw.OsuDifficultyCalculator_Create(
        ruleset.handle,
        beatmap.handle,
        native,
      ),
    );
    return new OsuDifficultyCalculator(native, ruleset, beatmap);
  }

  calculate(mods: ModsCollection): NativeOsuDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeOsuDifficultyAttributes();
    OsuNative.assertOk(
      "OsuDifficultyCalculator_Calculate",
      raw.OsuDifficultyCalculator_Calculate(
        this.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
  }

  calculateTimed(
    mods: ModsCollection,
  ): NativeTimedOsuDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "OsuDifficultyCalculator_CalculateTimed",
      raw.OsuDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedOsuDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "OsuDifficultyCalculator_CalculateTimed",
      raw.OsuDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateTimedLazy(mods: ModsCollection): TimedLazy<NativeTimedOsuDifficultyAttributes> {
    this.ensureAlive();

    const enumerator = new ManagedObjectHandle();
    OsuNative.assertOk(
      "OsuDifficultyCalculator_CalculateTimedLazy",
      raw.OsuDifficultyCalculator_CalculateTimedLazy(
        this.handle,
        mods.handle,
        enumerator
      ),
    );

    const attrs = new raw.NativeTimedOsuDifficultyAttributes();
    let destroyed = false;
    return {
      enumerator,
      next: () => {
        if (destroyed == true) return null;
        OsuNative.assertOk(
          "OsuDifficultyCalculator_CalculateTimedLazy_Next",
          raw.OsuDifficultyCalculator_CalculateTimedLazy_Next(
            enumerator,
            attrs
          ),
        );

        return attrs;
      },
      destroy: () => {
        destroyed = true;

        OsuNative.assertOk(
          "OsuDifficultyCalculator_CalculateTimedLazy_Destroy",
          raw.OsuDifficultyCalculator_CalculateTimedLazy_Destroy(
            enumerator
          ),
        );

        return true;
      }
    }
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk(
      "OsuDifficultyCalculator_Destroy",
      raw.OsuDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
