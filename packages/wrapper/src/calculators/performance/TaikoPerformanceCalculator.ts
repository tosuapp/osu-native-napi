import type {
  NativeTaikoDifficultyAttributes,
  NativeTaikoPerformanceAttributes,
  NativeTaikoPerformanceCalculator,
} from "@tosuapp/osu-native-napi";
import raw from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import { makeScoreInfo, type ScoreInfoInput } from "../../internal/scoreInfo";

export class TaikoPerformanceCalculator extends NativeHandleOwner<NativeTaikoPerformanceCalculator> {
  static create(): TaikoPerformanceCalculator {
    const native = new raw.NativeTaikoPerformanceCalculator();
    OsuNative.assertOk(
      "TaikoPerformanceCalculator_Create",
      raw.TaikoPerformanceCalculator_Create(native),
    );
    return new TaikoPerformanceCalculator(native);
  }

  calculate(
    score: ScoreInfoInput,
    difficulty: NativeTaikoDifficultyAttributes,
  ): NativeTaikoPerformanceAttributes {
    this.ensureAlive();
    const out = new raw.NativeTaikoPerformanceAttributes();
    OsuNative.assertOk(
      "TaikoPerformanceCalculator_Calculate",
      raw.TaikoPerformanceCalculator_Calculate(
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
      "TaikoPerformanceCalculator_Destroy",
      raw.TaikoPerformanceCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
