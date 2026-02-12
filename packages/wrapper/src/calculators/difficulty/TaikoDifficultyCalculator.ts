import type {
  NativeTaikoDifficultyAttributes,
  NativeTaikoDifficultyCalculator,
  NativeTimedTaikoDifficultyAttributes,
} from "@tosuapp/osu-native-napi";
import raw, { ManagedObjectHandle } from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";
import { TimedLazy } from "../../types/calculator";

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

  calculate(mods: ModsCollection): NativeTaikoDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeTaikoDifficultyAttributes();
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_Calculate",
      raw.TaikoDifficultyCalculator_Calculate(
        this.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
  }

  calculateTimed(
    mods: ModsCollection,
  ): NativeTimedTaikoDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "TaikoDifficultyCalculator_CalculateTimed",
      raw.TaikoDifficultyCalculator_CalculateTimed(
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
      "TaikoDifficultyCalculator_CalculateTimed",
      raw.TaikoDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateTimedLazy(mods: ModsCollection): TimedLazy<NativeTimedTaikoDifficultyAttributes> {
    this.ensureAlive();

    const enumerator = new ManagedObjectHandle();
    OsuNative.assertOk(
      "TaikoDifficultyCalculator_CalculateTimedLazy",
      raw.TaikoDifficultyCalculator_CalculateTimedLazy(
        this.handle,
        mods.handle,
        enumerator
      ),
    );

    const attrs = new raw.NativeTimedTaikoDifficultyAttributes();
    let destroyed = false;
    return {
      enumerator,
      next: () => {
        if (destroyed == true) return null;
        OsuNative.assertOk(
          "TaikoDifficultyCalculator_CalculateTimedLazy_Next",
          raw.TaikoDifficultyCalculator_CalculateTimedLazy_Next(
            enumerator,
            attrs
          ),
        );

        return attrs;
      },
      destroy: () => {
        destroyed = true;

        OsuNative.assertOk(
          "TaikoDifficultyCalculator_CalculateTimedLazy_Destroy",
          raw.TaikoDifficultyCalculator_CalculateTimedLazy_Destroy(
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
      "TaikoDifficultyCalculator_Destroy",
      raw.TaikoDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
