#include <stdbool.h>
#include <stdint.h>

typedef enum ErrorCode {
  BUFFER_SIZE_QUERY = -1,
  SUCCESS = 0,
  OBJECT_NOT_FOUND = 1,
  RULESET_UNAVAILABLE = 2,
  UNEXPECTED_RULESET = 3,
  FAILURE = 127
} ErrorCode;

typedef struct ManagedObjectHandle {
  int32_t id;
} ManagedObjectHandle;

typedef struct NativeScoreInfo {
  ManagedObjectHandle rulesetHandle;
  ManagedObjectHandle beatmapHandle;
  ManagedObjectHandle modsHandle;
  int32_t maxCombo;
  double accuracy;
  int32_t countMiss;
  int32_t countMeh;
  int32_t countOk;
  int32_t countGood;
  int32_t countGreat;
  int32_t countPerfect;
  int32_t countSliderTailHit;
  int32_t countLargeTickMiss;
} NativeScoreInfo;

typedef struct NativeCatchPerformanceAttributes {
  double total;
} NativeCatchPerformanceAttributes;

typedef struct NativeManiaPerformanceAttributes {
  double total;
  double difficulty;
} NativeManiaPerformanceAttributes;

typedef struct Cabinet__Nullable_double {
  bool hasValue;
  double value;
} Cabinet__Nullable_double;

typedef struct NativeOsuPerformanceAttributes {
  double total;
  double aim;
  double speed;
  double accuracy;
  double flashlight;
  double effectiveMissCount;
  Cabinet__Nullable_double speedDeviation;
  double comboBasedEstimatedMissCount;
  Cabinet__Nullable_double scoreBasedEstimatedMissCount;
  double aimEstimatedSliderBreaks;
  double speedEstimatedSliderBreaks;
} NativeOsuPerformanceAttributes;

typedef struct NativeTaikoPerformanceAttributes {
  double total;
  double difficulty;
  double accuracy;
  Cabinet__Nullable_double estimatedUnstableRate;
} NativeTaikoPerformanceAttributes;

typedef struct NativeCatchDifficultyAttributes {
  double starRating;
  int32_t maxCombo;
} NativeCatchDifficultyAttributes;

typedef struct NativeManiaDifficultyAttributes {
  double starRating;
  int32_t maxCombo;
} NativeManiaDifficultyAttributes;

typedef struct NativeOsuDifficultyAttributes {
  double starRating;
  int32_t maxCombo;
  double aimDifficulty;
  double aimDifficultSliderCount;
  double speedDifficulty;
  double speedNoteCount;
  double flashlightDifficulty;
  double sliderFactor;
  double aimTopWeightedSliderFactor;
  double speedTopWeightedSliderFactor;
  double aimDifficultStrainCount;
  double speedDifficultStrainCount;
  double nestedScorePerObject;
  double legacyScoreBaseMultiplier;
  double maximumLegacyComboScore;
  double drainRate;
  int32_t hitCircleCount;
  int32_t sliderCount;
  int32_t spinnerCount;
} NativeOsuDifficultyAttributes;

typedef struct NativeTaikoDifficultyAttributes {
  double starRating;
  int32_t maxCombo;
  double mechanicalDifficulty;
  double rhythmDifficulty;
  double readingDifficulty;
  double colourDifficulty;
  double staminaDifficulty;
  double monoStaminaFactor;
  double consistencyFactor;
  double staminaTopStrains;
} NativeTaikoDifficultyAttributes;

typedef struct NativeBeatmap {
  ManagedObjectHandle handle;
  int32_t rulesetId;
  float approachRate;
  float drainRate;
  float overallDifficulty;
  float circleSize;
  double sliderMultiplier;
  double sliderTickRate;
} NativeBeatmap;

typedef struct NativeCatchDifficultyCalculator {
  ManagedObjectHandle handle;
} NativeCatchDifficultyCalculator;

typedef struct NativeManiaDifficultyCalculator {
  ManagedObjectHandle handle;
} NativeManiaDifficultyCalculator;

typedef struct NativeOsuDifficultyCalculator {
  ManagedObjectHandle handle;
} NativeOsuDifficultyCalculator;

typedef struct NativeTaikoDifficultyCalculator {
  ManagedObjectHandle handle;
} NativeTaikoDifficultyCalculator;

typedef struct NativeMod {
  ManagedObjectHandle handle;
} NativeMod;

typedef struct NativeModsCollection {
  ManagedObjectHandle handle;
} NativeModsCollection;

typedef struct NativeRuleset {
  ManagedObjectHandle handle;
  int32_t rulesetId;
} NativeRuleset;

typedef struct NativeCatchPerformanceCalculator {
  ManagedObjectHandle handle;
} NativeCatchPerformanceCalculator;

typedef struct NativeManiaPerformanceCalculator {
  ManagedObjectHandle handle;
} NativeManiaPerformanceCalculator;

typedef struct NativeOsuPerformanceCalculator {
  ManagedObjectHandle handle;
} NativeOsuPerformanceCalculator;

typedef struct NativeTaikoPerformanceCalculator {
  ManagedObjectHandle handle;
} NativeTaikoPerformanceCalculator;

extern "C" {
const char *ErrorHandler_GetLastMessage();
const ErrorCode Beatmap_CreateFromFile(const char *filePathPtr,
                                       NativeBeatmap *nativeBeatmapPtr);
const ErrorCode Beatmap_CreateFromText(const char *beatmapTextPtr,
                                       NativeBeatmap *nativeBeatmapPtr);
const ErrorCode Beatmap_GetTitle(ManagedObjectHandle beatmapHandle,
                                 const char *buffer, int32_t *bufferSize);
const ErrorCode Beatmap_GetArtist(ManagedObjectHandle beatmapHandle,
                                  const char *buffer, int32_t *bufferSize);
const ErrorCode Beatmap_GetVersion(ManagedObjectHandle beatmapHandle,
                                   const char *buffer, int32_t *bufferSize);
const ErrorCode Beatmap_Destroy(ManagedObjectHandle handle);
const ErrorCode CatchDifficultyCalculator_Create(
    ManagedObjectHandle rulesetHandle, ManagedObjectHandle beatmapHandle,
    NativeCatchDifficultyCalculator *nativeCatchDifficultyCalculatorPtr);
const ErrorCode CatchDifficultyCalculator_Calculate(
    ManagedObjectHandle calcHandle,
    NativeCatchDifficultyAttributes *nativeAttributesPtr);
const ErrorCode CatchDifficultyCalculator_CalculateMods(
    ManagedObjectHandle calcHandle, ManagedObjectHandle rulesetHandle,
    ManagedObjectHandle modsHandle,
    NativeCatchDifficultyAttributes *nativeAttributesPtr);
const ErrorCode CatchDifficultyCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode ManiaDifficultyCalculator_Create(
    ManagedObjectHandle rulesetHandle, ManagedObjectHandle beatmapHandle,
    NativeManiaDifficultyCalculator *nativeManiaDifficultyCalculatorPtr);
const ErrorCode ManiaDifficultyCalculator_Calculate(
    ManagedObjectHandle calcHandle,
    NativeManiaDifficultyAttributes *nativeAttributesPtr);
const ErrorCode ManiaDifficultyCalculator_CalculateMods(
    ManagedObjectHandle calcHandle, ManagedObjectHandle rulesetHandle,
    ManagedObjectHandle modsHandle,
    NativeManiaDifficultyAttributes *nativeAttributesPtr);
const ErrorCode ManiaDifficultyCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode OsuDifficultyCalculator_Create(
    ManagedObjectHandle rulesetHandle, ManagedObjectHandle beatmapHandle,
    NativeOsuDifficultyCalculator *nativeOsuDifficultyCalculatorPtr);
const ErrorCode OsuDifficultyCalculator_Calculate(
    ManagedObjectHandle calcHandle,
    NativeOsuDifficultyAttributes *nativeAttributesPtr);
const ErrorCode OsuDifficultyCalculator_CalculateMods(
    ManagedObjectHandle calcHandle, ManagedObjectHandle rulesetHandle,
    ManagedObjectHandle modsHandle,
    NativeOsuDifficultyAttributes *nativeAttributesPtr);
const ErrorCode OsuDifficultyCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode TaikoDifficultyCalculator_Create(
    ManagedObjectHandle rulesetHandle, ManagedObjectHandle beatmapHandle,
    NativeTaikoDifficultyCalculator *nativeTaikoDifficultyCalculatorPtr);
const ErrorCode TaikoDifficultyCalculator_Calculate(
    ManagedObjectHandle calcHandle,
    NativeTaikoDifficultyAttributes *nativeAttributesPtr);
const ErrorCode TaikoDifficultyCalculator_CalculateMods(
    ManagedObjectHandle calcHandle, ManagedObjectHandle rulesetHandle,
    ManagedObjectHandle modsHandle,
    NativeTaikoDifficultyAttributes *nativeAttributesPtr);
const ErrorCode TaikoDifficultyCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode Mod_Create(const char *acronymPtr, NativeMod *nativeModPtr);
const ErrorCode Mod_SetSettingBool(ManagedObjectHandle modHandle,
                                   const char *keyPtr, bool value);
const ErrorCode Mod_SetSettingInteger(ManagedObjectHandle modHandle,
                                      const char *keyPtr, int32_t value);
const ErrorCode Mod_SetSettingFloat(ManagedObjectHandle modHandle,
                                    const char *keyPtr, float value);
const ErrorCode Mod_Debug(ManagedObjectHandle modHandle);
const ErrorCode Mod_Destroy(ManagedObjectHandle handle);
const ErrorCode
ModsCollection_Create(NativeModsCollection *nativeModsCollectionPtr);
const ErrorCode ModsCollection_Add(ManagedObjectHandle modsHandle,
                                   ManagedObjectHandle modHandle);
const ErrorCode ModsCollection_Remove(ManagedObjectHandle modsHandle,
                                      ManagedObjectHandle modHandle);
const ErrorCode ModsCollection_Debug(ManagedObjectHandle modsHandle);
const ErrorCode ModsCollection_Destroy(ManagedObjectHandle handle);
const ErrorCode Ruleset_CreateFromId(int32_t rulesetId,
                                     NativeRuleset *rulesetPtr);
const ErrorCode Ruleset_CreateFromShortName(const char *shortName,
                                            NativeRuleset *rulesetPtr);
const ErrorCode Ruleset_GetShortName(ManagedObjectHandle rulesetHandle,
                                     const char *buffer, int32_t *bufferSize);
const ErrorCode Ruleset_Destroy(ManagedObjectHandle handle);
const ErrorCode CatchPerformanceCalculator_Create(
    NativeCatchPerformanceCalculator *nativeCatchPerformanceCalculatorPtr);
const ErrorCode CatchPerformanceCalculator_Calculate(
    ManagedObjectHandle calcHandle, NativeScoreInfo nativeScoreInfo,
    NativeCatchDifficultyAttributes nativeDifficultyAttributes,
    NativeCatchPerformanceAttributes *nativeAttributesPtr);
const ErrorCode CatchPerformanceCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode ManiaPerformanceCalculator_Create(
    NativeManiaPerformanceCalculator *nativeManiaPerformanceCalculatorPtr);
const ErrorCode ManiaPerformanceCalculator_Calculate(
    ManagedObjectHandle calcHandle, NativeScoreInfo nativeScoreInfo,
    NativeManiaDifficultyAttributes nativeDifficultyAttributes,
    NativeManiaPerformanceAttributes *nativeAttributesPtr);
const ErrorCode ManiaPerformanceCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode OsuPerformanceCalculator_Create(
    NativeOsuPerformanceCalculator *nativeOsuPerformanceCalculatorPtr);
const ErrorCode OsuPerformanceCalculator_Calculate(
    ManagedObjectHandle calcHandle, NativeScoreInfo nativeScoreInfo,
    NativeOsuDifficultyAttributes nativeDifficultyAttributes,
    NativeOsuPerformanceAttributes *nativeAttributesPtr);
const ErrorCode OsuPerformanceCalculator_Destroy(ManagedObjectHandle handle);
const ErrorCode TaikoPerformanceCalculator_Create(
    NativeTaikoPerformanceCalculator *nativeTaikoPerformanceCalculatorPtr);
const ErrorCode TaikoPerformanceCalculator_Calculate(
    ManagedObjectHandle calcHandle, NativeScoreInfo nativeScoreInfo,
    NativeTaikoDifficultyAttributes nativeDifficultyAttributes,
    NativeTaikoPerformanceAttributes *nativeAttributesPtr);
const ErrorCode TaikoPerformanceCalculator_Destroy(ManagedObjectHandle handle);
}