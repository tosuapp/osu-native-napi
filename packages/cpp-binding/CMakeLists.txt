cmake_minimum_required(VERSION 3.28)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

project(osu-native-napi)

set(CMAKE_CXX_STANDARD          23)
set(CMAKE_CXX_EXTENSIONS        ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/dist)

set(NODE_DOWNLOAD_URL https://nodejs.org/dist/v24.8.0/win-x64/node.lib)
set(NODE_API_INCLUDE_URL https://github.com/nodejs/node-api-headers/raw/refs/heads/main/include)
set(NODE_ADDON_API_INCLUDE_URL https://raw.githubusercontent.com/nodejs/node-addon-api/refs/heads/main/)

# node headers download

file(DOWNLOAD
    ${NODE_DOWNLOAD_URL}
    ${CMAKE_SOURCE_DIR}/lib/node.lib)

file(DOWNLOAD
    ${NODE_API_INCLUDE_URL}/js_native_api.h
    ${CMAKE_SOURCE_DIR}/include/js_native_api.h)

file(DOWNLOAD
    ${NODE_API_INCLUDE_URL}/js_native_api_types.h
    ${CMAKE_SOURCE_DIR}/include/js_native_api_types.h)

file(DOWNLOAD
    ${NODE_API_INCLUDE_URL}/node_api.h
    ${CMAKE_SOURCE_DIR}/include/node_api.h)

file(DOWNLOAD
    ${NODE_API_INCLUDE_URL}/node_api_types.h
    ${CMAKE_SOURCE_DIR}/include/node_api_types.h)

file(DOWNLOAD
    ${NODE_ADDON_API_INCLUDE_URL}/napi-inl.h
    ${CMAKE_SOURCE_DIR}/include/napi-inl.h)

file(DOWNLOAD
    ${NODE_ADDON_API_INCLUDE_URL}/napi.h
    ${CMAKE_SOURCE_DIR}/include/napi.h)

add_compile_definitions(NODE_ADDON_API_DISABLE_DEPRECATED)

if (NOT (CMAKE_CXX_COMPILER_ID STREQUAL "MSVC"))
  add_compile_options(
    -Wall
    -Wextra
    -fno-rtti
    -Wno-missing-designated-field-initializers
  )
endif()

set(COPY_POSTFIX "")

if (CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
  set(COPY_POSTFIX "/Release")
endif()

file(
  GLOB_RECURSE
  SOURCES
  src/*.cpp
)

add_library(
  ${PROJECT_NAME}
  SHARED
  ${SOURCES}
)

add_custom_command(
TARGET ${PROJECT_NAME} POST_BUILD
COMMAND ${CMAKE_COMMAND} -E copy
        "${CMAKE_SOURCE_DIR}/osu.Native.dll"
        "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}${COPY_POSTFIX}/"
)

if (CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
  target_link_options(${PROJECT_NAME} PUBLIC "/DELAYLOAD:node.exe")
endif()

set_target_properties(${PROJECT_NAME} PROPERTIES
    SUFFIX ".node"
)

target_include_directories(${PROJECT_NAME} PRIVATE include)
target_include_directories(${PROJECT_NAME} PRIVATE src)

target_link_directories(${PROJECT_NAME} PRIVATE lib)

target_link_libraries(${PROJECT_NAME} PRIVATE osunative node)