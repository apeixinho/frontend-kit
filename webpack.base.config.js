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
  entry: ['./src/index'],
  output: {
    publicPath: '/',
    path: DIST_DIR,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]?hash=[hash:20]',
            limit: 8192
          }
        }]
      }
    ],
  },
  plugins: [
    htmlWebpackPluginConfig,
    environmentPluginConfig,
  ],
};
