import type {
  NativeManiaDifficultyAttributes,
  NativeManiaPerformanceAttributes,
  NativeManiaPerformanceCalculator,
} from "@tosuapp/osu-native-napi-raw";
import raw from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import { makeScoreInfo, type ScoreInfoInput } from "../../internal/scoreInfo";

export class ManiaPerformanceCalculator extends NativeHandleOwner<NativeManiaPerformanceCalculator> {
  static create(): ManiaPerformanceCalculator {
    const native = new raw.NativeManiaPerformanceCalculator();
    OsuNative.assertOk(
      "ManiaPerformanceCalculator_Create",
      raw.ManiaPerformanceCalculator_Create(native),
    );
    return new ManiaPerformanceCalculator(native);
  }

  calculate(
    score: ScoreInfoInput,
    difficulty: NativeManiaDifficultyAttributes,
  ): NativeManiaPerformanceAttributes {
    this.ensureAlive();
    const out = new raw.NativeManiaPerformanceAttributes();
    OsuNative.assertOk(
      "ManiaPerformanceCalculator_Calculate",
      raw.ManiaPerformanceCalculator_Calculate(
        this.handle,
        makeScoreInfo(score),
        difficulty,
        out,
      ),
    );
    return out;
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk(
      "ManiaPerformanceCalculator_Destroy",
      raw.ManiaPerformanceCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
