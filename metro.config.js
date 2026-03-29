const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'css']
  }
});

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css'
});
