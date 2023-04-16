module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './assets',
          '@constants': './src/constants',
          '@custom-types': './src/types',
          '@custom-hooks': './src/hooks',
          '@services': './src/services',
          '@modules': './src/modules',
          '@config': './src/config',
          '@themes': './src/themes',
        },
      },
    ],
  ],
};
