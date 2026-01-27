import { OsuNative } from "../core/OsuNative";
import type { Ruleset } from "../objects/Ruleset";
import { CatchPerformanceCalculator } from "../calculators/performance/CatchPerformanceCalculator";
import { ManiaPerformanceCalculator } from "../calculators/performance/ManiaPerformanceCalculator";
import { OsuPerformanceCalculator } from "../calculators/performance/OsuPerformanceCalculator";
import { TaikoPerformanceCalculator } from "../calculators/performance/TaikoPerformanceCalculator";

export class PerformanceCalculatorFactory {
  static create<T>(ruleset: Ruleset): T {
    switch (ruleset.rulesetId) {
      case 0:
        return OsuPerformanceCalculator.create() as T;
      case 1:
        return TaikoPerformanceCalculator.create() as T;
      case 2:
        return CatchPerformanceCalculator.create() as T;
      case 3:
        return ManiaPerformanceCalculator.create() as T;
      default:
        throw new Error(`Unsupported rulesetId: ${ruleset.rulesetId}`);
    }
  }
}
