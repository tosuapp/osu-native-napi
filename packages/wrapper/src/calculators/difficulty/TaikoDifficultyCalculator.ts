import type {
  NativeTaikoDifficultyAttributes,
  NativeTaikoDifficultyCalculator,
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
      "TaikoDifficultyCalculator_Destroy",
      raw.TaikoDifficultyCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
