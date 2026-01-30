import type {
  NativeCatchDifficultyAttributes,
  NativeCatchPerformanceAttributes,
  NativeCatchPerformanceCalculator,
} from "@tosuapp/osu-native-napi";
import raw from "@tosuapp/osu-native-napi";

import { OsuNative } from "../../core/OsuNative";
import { NativeHandleOwner } from "../../internal/NativeHandleOwner";
import { makeScoreInfo, type ScoreInfoInput } from "../../internal/scoreInfo";

export class CatchPerformanceCalculator extends NativeHandleOwner<NativeCatchPerformanceCalculator> {
  static create(): CatchPerformanceCalculator {
    const native = new raw.NativeCatchPerformanceCalculator();
    OsuNative.assertOk(
      "CatchPerformanceCalculator_Create",
      raw.CatchPerformanceCalculator_Create(native),
    );
    return new CatchPerformanceCalculator(native);
  }

  calculate(
    score: ScoreInfoInput,
    difficulty: NativeCatchDifficultyAttributes,
  ): NativeCatchPerformanceAttributes {
    this.ensureAlive();
    const out = new raw.NativeCatchPerformanceAttributes();
    OsuNative.assertOk(
      "CatchPerformanceCalculator_Calculate",
      raw.CatchPerformanceCalculator_Calculate(
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
      "CatchPerformanceCalculator_Destroy",
      raw.CatchPerformanceCalculator_Destroy(this.handle),
    );
    this.destroyed = true;
  }
}
