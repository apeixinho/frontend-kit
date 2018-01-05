const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'production',
  DEBUG: false,
});

const prodConfig = merge({
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [{
              // translates CSS into CommonJS
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ],
          fallback: 'style-loader'
        }),
      }, {
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
            name: '[name][chunkhash].[ext]',
            limit: 8192
          }
        }]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(buildPath),
    new UglifyJSPlugin({
      sourceMap: true,
      output: {
          comments: false
      }
  }),
  new ExtractTextPlugin('styles.[contentHash].css', {
      allChunks: true
  }),
  new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
          map: {
              inline: false,
          },
          discardComments: {
              removeAll: true
          }
      },
      canPrint: true
  })
  ]

}, baseConfig,environmentPluginConfig);


module.exports = prodConfig;
