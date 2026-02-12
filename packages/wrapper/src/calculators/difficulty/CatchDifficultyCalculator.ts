import type {
  NativeCatchDifficultyAttributes,
  NativeCatchDifficultyCalculator,
  NativeTimedCatchDifficultyAttributes,
} from "@tosuapp/osu-native-napi";
import raw, { ManagedObjectHandle } from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";
import { TimedLazy } from "../../types/calculator";

export class CatchDifficultyCalculator extends NativeHandleOwner<NativeCatchDifficultyCalculator> {
  constructor(
    native: NativeCatchDifficultyCalculator,
    readonly ruleset: Ruleset,
    readonly beatmap: Beatmap,
  ) {
    super(native);
  }

  static create(ruleset: Ruleset, beatmap: Beatmap): CatchDifficultyCalculator {
    const native = new raw.NativeCatchDifficultyCalculator();
    OsuNative.assertOk(
      "CatchDifficultyCalculator_Create",
      raw.CatchDifficultyCalculator_Create(
        ruleset.handle,
        beatmap.handle,
        native,
      ),
    );
    return new CatchDifficultyCalculator(native, ruleset, beatmap);
  }

  calculate(mods: ModsCollection): NativeCatchDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeCatchDifficultyAttributes();
    OsuNative.assertOk(
      "CatchDifficultyCalculator_Calculate",
      raw.CatchDifficultyCalculator_Calculate(this.handle, mods.handle, attrs),
    );
    return attrs;
  }

  calculateTimed(mods: ModsCollection): NativeTimedCatchDifficultyAttributes[] {
    this.ensureAlive();

    const bufferSize = new Int32Array(1);
    OsuNative.assertSizeQuery(
      "CatchDifficultyCalculator_CalculateTimed",
      raw.CatchDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        null,
        bufferSize,
      ),
    );

    if (bufferSize[0] <= 0) {
      return [];
    }

    const outAttrs = new Array<NativeTimedCatchDifficultyAttributes>(
      bufferSize[0],
    );
    OsuNative.assertOk(
      "CatchDifficultyCalculator_CalculateTimed",
      raw.CatchDifficultyCalculator_CalculateTimed(
        this.handle,
        mods.handle,
        outAttrs,
        bufferSize,
      ),
    );

    return outAttrs;
  }

  calculateTimedLazy(mods: ModsCollection): TimedLazy<NativeTimedCatchDifficultyAttributes> {
    this.ensureAlive();

    const enumerator = new ManagedObjectHandle();
    OsuNative.assertOk(
      "CatchDifficultyCalculator_CalculateTimedLazy",
      raw.CatchDifficultyCalculator_CalculateTimedLazy(
        this.handle,
        mods.handle,
        enumerator
      ),
    );

    const attrs = new raw.NativeTimedCatchDifficultyAttributes();
    let destroyed = false;
    return {
      enumerator,
      next: () => {
        if (destroyed == true) return null;
        OsuNative.assertOk(
          "CatchDifficultyCalculator_CalculateTimedLazy_Next",
          raw.CatchDifficultyCalculator_CalculateTimedLazy_Next(
            enumerator,
            attrs
          ),
        );

        return attrs;
      },
      destroy: () => {
        destroyed = true;

        OsuNative.assertOk(
          "CatchDifficultyCalculator_CalculateTimedLazy_Destroy",
          raw.CatchDifficultyCalculator_CalculateTimedLazy_Destroy(
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
      "CatchDifficultyCalculator_Destroy",
      raw.CatchDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
