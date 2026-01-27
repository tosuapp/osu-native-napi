import type * as OsuNativeType from "./osu-native";

export default require("./dist/Release/osu-native-napi.node") as typeof OsuNativeType
export type * from "./osu-native";
