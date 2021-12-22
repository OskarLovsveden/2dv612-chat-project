/* eslint-disable */
const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      'root': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'context': path.resolve(__dirname, 'src/context'),
      'images': path.resolve(__dirname, 'src/images'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'types': path.resolve(__dirname, 'src/types'),
      'http': path.resolve(__dirname, 'src/utils/http'),
    },
  };

  return config;
};