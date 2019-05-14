var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var openInEditor = require('launch-editor-middleware');
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  devServer: {
    before (app) {
      app.use('/__open-in-editor', openInEditor('/Users/luvletteru/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/191.7141.49/WebStorm.app/Contents/MacOS/webstorm'));
    }
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.test.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.test.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
