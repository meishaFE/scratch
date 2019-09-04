const merge = require('webpack-merge');
const prodConfig = require('./webpack.base.conf');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(prodConfig, {
  output: {
    path: path.resolve(__dirname, '../release/scratch-electron'), // 打包后文件输出的目录
    publicPath: './'
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../release/scratch-electron')]
    }),

    new CopyWebpackPlugin([
      {
        from: 'node_modules/scratch-blocks/media',
        to: 'static/blocks-media'
      },
      {
        from: 'release/package-electron.json',
        to: 'package.json'
      }
    ])
  ]
});

module.exports = webpackConfig;
