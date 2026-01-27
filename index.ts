import type OsuNativeType from "./osu-native";

let addon: typeof OsuNativeType;

try {
  addon = require("./dist/osu-native-napi.node");
} catch {
  addon = require("./dist/Release/osu-native-napi.node");
}

export default addon;
