const merge = require('webpack-merge');
const prodConfig = require('./webpack.base.conf');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(prodConfig, {
  output: {
    path: path.resolve(__dirname, '../release/scratch'), // 打包后文件输出的目录
    publicPath: '/'
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../release/scratch')],
      cleanAfterEveryBuildPatterns: [path.resolve(__dirname, '../release/scratch/static')]
    }),

    new CopyWebpackPlugin([
      {
        from: 'release/package.json',
        to: ''
      }
    ])
  ]
});

module.exports = webpackConfig;
