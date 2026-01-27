import { OsuNative } from "../core/OsuNative";
import type { Beatmap } from "../objects/Beatmap";
import type { Ruleset } from "../objects/Ruleset";
import { CatchDifficultyCalculator } from "../calculators/difficulty/CatchDifficultyCalculator";
import { ManiaDifficultyCalculator } from "../calculators/difficulty/ManiaDifficultyCalculator";
import { OsuDifficultyCalculator } from "../calculators/difficulty/OsuDifficultyCalculator";
import { TaikoDifficultyCalculator } from "../calculators/difficulty/TaikoDifficultyCalculator";

export class DifficultyCalculatorFactory {
  static create<T>(ruleset: Ruleset, beatmap: Beatmap): T {
    switch (ruleset.rulesetId) {
      case 0:
        return OsuDifficultyCalculator.create(ruleset, beatmap) as T;
      case 1:
        return TaikoDifficultyCalculator.create(ruleset, beatmap) as T;
      case 2:
        return CatchDifficultyCalculator.create(ruleset, beatmap) as T;
      case 3:
        return ManiaDifficultyCalculator.create(ruleset, beatmap) as T;
      default:
        throw new Error(`Unsupported rulesetId: ${ruleset.rulesetId}`);
    }
  }
}
