const {getDefaultConfig, mergeConfig} = requireNativeComponent('@react-native/metro-config');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);