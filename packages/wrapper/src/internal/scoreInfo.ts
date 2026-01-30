import { OsuNative } from "../core/OsuNative";
import type { NativeScoreInfo } from "@tosuapp/osu-native-napi";

import type { Beatmap } from "../objects/Beatmap";
import type { ModsCollection } from "../objects/ModsCollection";
import type { Ruleset } from "../objects/Ruleset";

import raw from "@tosuapp/osu-native-napi";

export type ScoreInfoInput = Partial<
  Omit<NativeScoreInfo, "rulesetHandle" | "beatmapHandle" | "modsHandle">
> & {
  ruleset: Ruleset;
  beatmap: Beatmap;
  mods?: ModsCollection | null;
};

export function makeScoreInfo(input: ScoreInfoInput): NativeScoreInfo {
  const score = new raw.NativeScoreInfo();
  score.rulesetHandle = input.ruleset.handle;
  score.beatmapHandle = input.beatmap.handle;
  score.modsHandle = input.mods?.handle ?? OsuNative.makeNullHandle();

  score.maxCombo = input.maxCombo ?? 0;
  score.accuracy = input.accuracy ?? 0;
  score.countMiss = input.countMiss ?? 0;
  score.countMeh = input.countMeh ?? 0;
  score.countOk = input.countOk ?? 0;
  score.countGood = input.countGood ?? 0;
  score.countGreat = input.countGreat ?? 0;
  score.countPerfect = input.countPerfect ?? 0;
  score.countSliderTailHit = input.countSliderTailHit ?? 0;
  score.countLargeTickMiss = input.countLargeTickMiss ?? 0;

  return score;
}
