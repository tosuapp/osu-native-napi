cmake_minimum_required(VERSION 3.28)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

project(osu-native-napi)

set(CMAKE_CXX_STANDARD          23)
set(CMAKE_CXX_EXTENSIONS        ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/dist)
file(MAKE_DIRECTORY "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}")


message(STATUS "Configuring Node.js URLs...")
set(NODE_DOWNLOAD_URL https://nodejs.org/dist/v24.8.0/win-x64/node.lib)
message(DEBUG "  NODE_DOWNLOAD_URL: ${NODE_DOWNLOAD_URL}")

set(NODE_API_INCLUDE_URL https://github.com/nodejs/node-api-headers/raw/refs/heads/main/include)
message(DEBUG "  NODE_API_INCLUDE_URL: ${NODE_API_INCLUDE_URL}")

set(NODE_ADDON_API_INCLUDE_URL https://raw.githubusercontent.com/nodejs/node-addon-api/refs/heads/main/)
message(DEBUG "  NODE_ADDON_API_INCLUDE_URL: ${NODE_ADDON_API_INCLUDE_URL}")


function(log_download name src dest)
    message(STATUS "Downloading ${name} to ${dest}")
    file(DOWNLOAD
        ${src}
        ${dest}
        STATUS DOWNLOAD_STATUS
    )
    message(STATUS "  -> Downloaded (${DOWNLOAD_STATUS}) ${name} to ${dest}")
endfunction()


if (WIN32 AND NOT "${NODE_DOWNLOAD_URL}" STREQUAL "")
    log_download("node.lib" "${NODE_DOWNLOAD_URL}" "${CMAKE_SOURCE_DIR}/lib/node.lib")
else()
    message(DEBUG "Skipping Node.lib download (Not Windows or URL empty).")
endif()


log_download("js_native_api.h" "${NODE_API_INCLUDE_URL}/js_native_api.h" "${CMAKE_SOURCE_DIR}/include/js_native_api.h")
log_download("js_native_api_types.h" "${NODE_API_INCLUDE_URL}/js_native_api_types.h" "${CMAKE_SOURCE_DIR}/include/js_native_api_types.h")
log_download("node_api.h" "${NODE_API_INCLUDE_URL}/node_api.h" "${CMAKE_SOURCE_DIR}/include/node_api.h")
log_download("node_api_types.h" "${NODE_API_INCLUDE_URL}/node_api_types.h" "${CMAKE_SOURCE_DIR}/include/node_api_types.h")
log_download("napi-inl.h" "${NODE_ADDON_API_INCLUDE_URL}/napi-inl.h" "${CMAKE_SOURCE_DIR}/include/napi-inl.h")
log_download("napi.h" "${NODE_ADDON_API_INCLUDE_URL}/napi.h" "${CMAKE_SOURCE_DIR}/include/napi.h")


add_compile_definitions(NODE_ADDON_API_DISABLE_DEPRECATED)
file(GLOB_RECURSE SOURCES src/*.cpp)


message(STATUS "========================================")
message(STATUS "Source Files Found:")
foreach(SRC_FILE ${SOURCES})
    message(DEBUG "  - ${SRC_FILE}")
endforeach()
message(STATUS "Total Source Count: ${SOURCES}")
message(STATUS "========================================")


add_library(${PROJECT_NAME} SHARED ${SOURCES})

if (WIN32)
    set(SRC_FILE "${CMAKE_SOURCE_DIR}/osu.Native.dll")
    set(DEST_DIR "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/Release")
else()
    set(SRC_FILE "${CMAKE_SOURCE_DIR}/osu.Native.so")
    set(DEST_DIR "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/Release")
endif()

message(STATUS "  -> Folder: ${DEST_DIR}/")


message(STATUS "Checking for native dependency: ${SRC_FILE}")
if(EXISTS ${SRC_FILE})
    message(STATUS "  -> File EXISTS. Proceeding with copy to ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/")
    file(MAKE_DIRECTORY "${DEST_DIR}")

    add_custom_command(
        TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy
                ${SRC_FILE}
                ${DEST_DIR}/
        COMMENT "Copying native dependency to dist/Release"
    )
else()
    message(WARNING "  -> File NOT FOUND: ${SRC_FILE}. Skipping copy command to prevent build failure.")
endif()

if (CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
  message(STATUS "Configuring MSVC specific options...")
  target_link_options(${PROJECT_NAME} PUBLIC "/DELAYLOAD:node.exe")
else()
  message(DEBUG "Not MSVC. Skipping DELAYLOAD option.")
endif()

if (WIN32)
    message(STATUS "Setting Windows-specific properties...")
    set_target_properties(${PROJECT_NAME} PROPERTIES
        PREFIX ""
        SUFFIX "-win-x64.node"
    )
else()
    message(STATUS "Setting Linux/Mac specific properties...")
    set_target_properties(${PROJECT_NAME} PROPERTIES
        PREFIX ""
        SUFFIX "-linux-x64.node"
    )
endif()

message(DEBUG "Target Properties Set:")
get_target_property(TARGET_SUFFIX ${PROJECT_NAME} SUFFIX)
message(DEBUG "  Suffix: ${TARGET_SUFFIX}")

target_include_directories(${PROJECT_NAME} PRIVATE include)
target_include_directories(${PROJECT_NAME} PRIVATE src)

message(STATUS "Link Configuration:")
if (WIN32)
    message(STATUS "  -> Linking for Windows...")
    target_link_directories(${PROJECT_NAME} PRIVATE lib)
    message(DEBUG "  -> Libraries to link: osunative, node")
    target_link_libraries(${PROJECT_NAME} PRIVATE osunative node)
else()
    message(DEBUG "  -> Not linking specific native libraries for non-Windows (Empty list).")
endif()

message(STATUS "========================================")
message(STATUS "BUILD CONFIGURATION COMPLETE")
message(STATUS "Target Name: ${PROJECT_NAME}")
message(STATUS "Output Type: SHARED")
message(STATUS "Output Directory: ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}")
message(STATUS "========================================")
