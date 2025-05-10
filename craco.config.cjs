const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@atoms': path.resolve(__dirname, 'src/atoms/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
    },
    configure: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
            exclude: [
              /node_modules\/react-datepicker/, // 🔥 제외합니다.
              /node_modules\/react-dom/,
              /node_modules\/react/,
            ],
          },
        ],
      },
    },
  },
};
