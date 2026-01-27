import type {
  NativeOsuDifficultyAttributes,
  NativeOsuDifficultyCalculator,
} from "@tosuapp/osu-native-napi-raw";
import raw from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import type { Beatmap } from "../../objects/Beatmap";
import type { ModsCollection } from "../../objects/ModsCollection";
import type { Ruleset } from "../../objects/Ruleset";

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

  calculate(): NativeOsuDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeOsuDifficultyAttributes();
    OsuNative.assertOk(
      "OsuDifficultyCalculator_Calculate",
      raw.OsuDifficultyCalculator_Calculate(this.handle, attrs),
    );
    return attrs;
  }

  calculateWithMods(mods: ModsCollection): NativeOsuDifficultyAttributes {
    this.ensureAlive();
    const attrs = new raw.NativeOsuDifficultyAttributes();
    OsuNative.assertOk(
      "OsuDifficultyCalculator_CalculateMods",
      raw.OsuDifficultyCalculator_CalculateMods(
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
      "OsuDifficultyCalculator_Destroy",
      raw.OsuDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
