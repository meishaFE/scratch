const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 清理编译时的无用信息
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 在webpack中拷贝文件和文件夹
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 用于优化或者压缩CSS资源

module.exports = {
  target: 'web',
  mode: 'production',
  stats: 'errors-only',

  // context是webpack编译时的基础目录，entry入口会相对于此目录查找
  context: path.resolve(__dirname, '../'),

  entry: {
    index: './src/index.js'
  },

  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.resolve(__dirname, '../release/web'), // 打包后文件输出的目录
    publicPath: '/'
  },

  resolve: {
    // 是否将符号链接(symlink)解析到它们的符号链接位置(如 npm link)
    symlinks: false,

    // 创建import或require的别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src'), /node_modules[\\/]scratch-[^\\/]+[\\/]src/]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      ...utils.styleConfig({ sourceMap: false, extract: true })
    ]
  },

  plugins: [
    // 提取 css 到单独的文件
    new miniCssExtractPlugin({
      filename: 'styles.css'
    }),

    // 优化压缩CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),

    new CopyWebpackPlugin([
      {
        from: 'node_modules/scratch-blocks/media',
        to: 'static/blocks-media'
      },
      {
        from: 'package.json',
        to: ''
      }
    ]),

    new webpack.NoEmitOnErrorsPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`completed!!`]
      }
    })
  ]
};
