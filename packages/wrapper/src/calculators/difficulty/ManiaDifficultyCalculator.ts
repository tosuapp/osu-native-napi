import type {
  NativeManiaDifficultyAttributes,
  NativeManiaDifficultyCalculator,
  NativeTimedManiaDifficultyAttributes,
} from "@tosuapp/osu-native-napi";
import raw, { ManagedObjectHandle } from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";
import { TimedLazy } from "../../types/calculator";

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

  calculate(mods: ModsCollection): NativeManiaDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeManiaDifficultyAttributes();
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_Calculate",
      raw.ManiaDifficultyCalculator_Calculate(
        this.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
  }

  calculateTimed(
    mods: ModsCollection,
  ): NativeTimedManiaDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "ManiaDifficultyCalculator_CalculateTimed",
      raw.ManiaDifficultyCalculator_CalculateTimed(
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
      "ManiaDifficultyCalculator_CalculateTimed",
      raw.ManiaDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateTimedLazy(mods: ModsCollection): TimedLazy<NativeTimedManiaDifficultyAttributes> {
    this.ensureAlive();

    const enumerator = new ManagedObjectHandle();
    OsuNative.assertOk(
      "ManiaDifficultyCalculator_CalculateTimedLazy",
      raw.ManiaDifficultyCalculator_CalculateTimedLazy(
        this.handle,
        mods.handle,
        enumerator
      ),
    );

    const attrs = new raw.NativeTimedManiaDifficultyAttributes();
    let destroyed = false;
    return {
      enumerator,
      next: () => {
        if (destroyed == true) return null;
        OsuNative.assertOk(
          "ManiaDifficultyCalculator_CalculateTimedLazy_Next",
          raw.ManiaDifficultyCalculator_CalculateTimedLazy_Next(
            enumerator,
            attrs
          ),
        );

        return attrs;
      },
      destroy: () => {
        destroyed = true;

        OsuNative.assertOk(
          "ManiaDifficultyCalculator_CalculateTimedLazy_Destroy",
          raw.ManiaDifficultyCalculator_CalculateTimedLazy_Destroy(
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
      "ManiaDifficultyCalculator_Destroy",
      raw.ManiaDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
