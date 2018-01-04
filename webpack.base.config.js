const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const CLIENT_DIR = path.resolve(__dirname, 'src');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'homepage',
  template: './src/ejs/index.ejs',
  favicon: './src/images/favicon.ico',
  inject: true
});

const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false,
});

module.exports = {
  context: CLIENT_DIR,
  target: 'web',
  entry: ['./index'],
  output: {
    publicPath: '/',
    path: DIST_DIR,
    filename: '[name].bundle.js',
  },
  plugins: [
    htmlWebpackPluginConfig,
    environmentPluginConfig,
  ],
};
