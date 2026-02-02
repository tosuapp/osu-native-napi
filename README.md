# osu-native-napi

N-API bindings and TypeScript wrapper for [osu-native](https://github.com/minisbett/osu-native).
Primary use is calculating future pp in [tosu](https://github.com/tosuapp/tosu), but it is also handy for
inspecting rebalance changes based on pull requests from [ppy/osu](https://github.com/ppy/osu).

## Requirements

- Windows x64 (current packages target win32/x64)
- .NET SDK 10
- MSVC C++ build tools
- Node.js 20 LTS
- pnpm v10

## Monorepo structure

- `packages/cpp-binding` - native N-API binding built with CMake; outputs the `.node` addon and `osu.Native.dll`
- `packages/wrapper` - TypeScript API layer that depends on `@tosuapp/osu-native-napi`

## Install and build

```bash
pnpm install
```

`pnpm install` runs `pnpm -r build` via the root `postinstall` script. You can also run it manually:

```bash
pnpm -r build
```

## Development

Common local workflows:

```bash
pnpm -r build
```

```bash
pnpm -C packages/wrapper dev
```

If you only need the native addon:

```bash
pnpm -C packages/cpp-binding run build
```

## Usage

See `packages/wrapper/examples/usage.ts` for a full example. Minimal flow:

```ts
import {
  Beatmap,
  DifficultyCalculatorFactory,
  Mod,
  ModsCollection,
  PerformanceCalculatorFactory,
  Ruleset,
} from "@tosuapp/osu-native-wrapper";

const beatmap = Beatmap.fromText("osu file format v14\n...\n");
const ruleset = Ruleset.fromId(0);

const diffCalculator = DifficultyCalculatorFactory.create(ruleset, beatmap);
const perfCalculator = PerformanceCalculatorFactory.create(ruleset);

const mods = ModsCollection.create();
mods.add(Mod.create("HD"));
mods.add(Mod.create("DT"));

const attributes = diffCalculator.calculateWithModsTimed(mods);
const last = attributes[attributes.length - 1].attributes;

const result = perfCalculator.calculate(
  {
    ruleset,
    beatmap,
    mods,
    maxCombo: 589,
    countOk: 4,
    countMiss: 1,
    countGreat: 395,
    countGood: 3,
    countPerfect: 117,
    accuracy: 0.9908333333333332,
    legacyScore: 8577684,
  },
  last,
);

console.log("Total PP:", result.total);
```

## Links

- osu-native: https://github.com/minisbett/osu-native
- tosu: https://github.com/tosuapp/tosu
- ppy/osu PRs: https://github.com/ppy/osu/pulls
