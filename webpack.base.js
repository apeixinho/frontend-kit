const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const DIST_DIR = path.resolve(__dirname, 'dist');
// const CLIENT_DIR = path.resolve(__dirname, 'src');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'homepage',
  template: './ejs/index.ejs',
  favicon: './images/favicon.ico',
  inject: true
});

const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false,
});

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './index.js',
    './ejs/index.ejs'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
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
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'image/svg+xml',
            name: '[name].[ext]'
          }
        }]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]?hash=[hash:20]',
            limit: 8192
          }
        }]
      }, {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ],
  },
  plugins: [
    htmlWebpackPluginConfig,
    environmentPluginConfig,
  ],
};
