module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    '@babel/plugin-transform-flow-strip-types',
    ["import", { libraryName: "@ant-design/react-native" }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
};
