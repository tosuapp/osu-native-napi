"use strict";

let file_path = '';

if (process.platform == 'win32') file_path = "./dist/Release/osu-native-napi-win-x64.node";
else if (process.platform == 'linux') file_path = "./dist/Release/osu-native-napi-linux-x64.node";

module.exports = require(file_path);
