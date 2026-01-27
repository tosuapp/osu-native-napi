import type OsuNativeType from "osu-native";

let addon: typeof OsuNativeType;

try {
  addon = require("./dist/osu_native_napi.node");
} catch {
  addon = require("./dist/Release/osu_native_napi.node");
}

export default addon;
