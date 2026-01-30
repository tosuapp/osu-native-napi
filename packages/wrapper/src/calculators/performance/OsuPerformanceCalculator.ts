import type {
  NativeOsuDifficultyAttributes,
  NativeOsuPerformanceAttributes,
  NativeOsuPerformanceCalculator,
} from "@tosuapp/osu-native-napi";

import raw from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import { makeScoreInfo, type ScoreInfoInput } from "../../internal/scoreInfo";

export class OsuPerformanceCalculator extends NativeHandleOwner<NativeOsuPerformanceCalculator> {
  static create(): OsuPerformanceCalculator {
    const native = new raw.NativeOsuPerformanceCalculator();
    OsuNative.assertOk(
      "OsuPerformanceCalculator_Create",
      raw.OsuPerformanceCalculator_Create(native),
    );
    return new OsuPerformanceCalculator(native);
  }

  calculate(
    score: ScoreInfoInput,
    difficulty: NativeOsuDifficultyAttributes,
  ): NativeOsuPerformanceAttributes {
    this.ensureAlive();
    const out = new raw.NativeOsuPerformanceAttributes();
    OsuNative.assertOk(
      "OsuPerformanceCalculator_Calculate",
      raw.OsuPerformanceCalculator_Calculate(
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
      "OsuPerformanceCalculator_Destroy",
      raw.OsuPerformanceCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
