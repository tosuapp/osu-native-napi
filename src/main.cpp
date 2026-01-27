#include <node_api.h>

#include <NAPIHelpers.h>

extern void register_cabinet(napi_env env, napi_value exports);

// napi_value NAPI_MODULE_INITIALIZER(napi_env env, napi_value exports)
NAPI_MODULE_INIT() {
  register_cabinet(env, exports);

  return nullptr;
}
