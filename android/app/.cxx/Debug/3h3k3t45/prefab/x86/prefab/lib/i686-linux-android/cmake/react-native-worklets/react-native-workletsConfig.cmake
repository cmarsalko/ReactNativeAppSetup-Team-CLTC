if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "/Users/lukecusato/Desktop/ReactNativeAppSetup-Team-CLTC/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/56q1t1r8/obj/x86/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/lukecusato/Desktop/ReactNativeAppSetup-Team-CLTC/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

