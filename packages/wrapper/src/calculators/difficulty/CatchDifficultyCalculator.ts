import type {
  NativeCatchDifficultyAttributes,
  NativeCatchDifficultyCalculator,
} from "@tosuapp/osu-native-napi-raw";
import raw from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";

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

  calculate(): NativeCatchDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeCatchDifficultyAttributes();
    OsuNative.assertOk(
      "CatchDifficultyCalculator_Calculate",
      raw.CatchDifficultyCalculator_Calculate(this.handle, attrs),
    );
    return attrs;
  }

  calculateWithMods(mods: ModsCollection): NativeCatchDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeCatchDifficultyAttributes();
    OsuNative.assertOk(
      "CatchDifficultyCalculator_CalculateMods",
      raw.CatchDifficultyCalculator_CalculateMods(
        this.handle,
        this.ruleset.handle,
        mods.handle,
        attrs,
      ),
    );
    return attrs;
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
