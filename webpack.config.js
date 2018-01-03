const webpack = require('webpack');
const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// UNCOMMENT TO RUN
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  devtool: env === 'production' ? 'hidden-source-map' : 'cheap-eval-source-map',
  devServer: env === 'production' ? {} : {
    contentBase: path.resolve(__dirname, './dist'), // A directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    compress: true, // use compression by default
    open: true, // open default browser while launching
    hotOnly: true
  },
  entry: ['./src/index.js',
    './src/ejs/index.ejs',
  ],
  target: 'web',
  output: {
    filename: env === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }],
          fallback: 'style-loader'
        })
      }, {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    // new webpack.NamedModulesPlugin(),
    // about importing favicon
    // https://github.com/coryhouse/react-slingshot/issues/128
    // about ejs loading
    //https://github.com/takahiro-saeki/webpack2-web-design.git
    // new ExtractTextPlugin('styles.css'),
    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlWebpackPlugin({
      title: 'homepage ' + env,
      template: './src/ejs/index.ejs',
      favicon: './src/images/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      trackJSToken: ''
    }),
    new CleanWebpackPlugin(['dist']),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: ({
    //     resource
    //   }) => (
    //     resource !== undefined &&
    //     resource.indexOf('node_modules') !== -1
    //   ),
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'main',
    //   children: true,
    //   async: true,
    //   minChunks: ({
    //     resource
    //   }) => (
    //     resource !== undefined &&
    //     resource.indexOf('node_modules') !== -1
    //   ),
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity,
    // })
  ]
});
