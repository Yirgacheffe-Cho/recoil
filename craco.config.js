// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@recoil': path.resolve(__dirname, 'src/recoil'),
    },
    configure: (webpackConfig) => {
      // ✅ Dead Code Elimination 활성화
      webpackConfig.optimization.usedExports = true;

      // ✅ Tree Shaking 활성화
      webpackConfig.optimization.sideEffects = true;

      // ✅ SplitChunks 설정
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
      };

      return webpackConfig;
    },
  },
};
