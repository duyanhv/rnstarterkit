module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@app': './src',
          '@core': './src/core',
          '@store': './src/store',
          '@models': './src/models',
          '@screens': './src/screens',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
