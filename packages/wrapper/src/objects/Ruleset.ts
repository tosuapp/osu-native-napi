import type { NativeRuleset } from "@tosuapp/osu-native-napi-raw";

import { OsuNative } from "../core/OsuNative";
import { NativeHandleOwner } from "../internal/NativeHandleOwner";
import { RULESET_SHORT_NAME_BY_ID } from "../internal/rulesetShortName";

import raw from "@tosuapp/osu-native-napi-raw";

export class Ruleset extends NativeHandleOwner<NativeRuleset> {
  static fromId(rulesetId: number): Ruleset {
    const native = new raw.NativeRuleset();
    OsuNative.assertOk(
      "Ruleset_CreateFromId",
      raw.Ruleset_CreateFromId(rulesetId, native),
    );
    return new Ruleset(native);
  }

  static fromShortName(shortName: string): Ruleset {
    const native = new raw.NativeRuleset();
    OsuNative.assertOk(
      "Ruleset_CreateFromShortName",
      raw.Ruleset_CreateFromShortName(shortName, native),
    );
    return new Ruleset(native);
  }

  get rulesetId(): number {
    return this.native.rulesetId;
  }

  get shortName(): string | undefined {
    return RULESET_SHORT_NAME_BY_ID.get(this.rulesetId);
  }

  getShortName(): void {
    this.ensureAlive();

    return;
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    OsuNative.assertOk("Ruleset_Destroy", raw.Ruleset_Destroy(this.handle));
    this.destroyed = true;
  }
}
