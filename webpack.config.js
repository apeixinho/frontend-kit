//const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// UNCOMMENT TO RUN
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  devtool: env === 'production' ? 'source-map' : 'cheap-eval-source-map',
  devServer: env === 'production' ? {} : {
    contentBase: path.resolve(__dirname, './dist'), // A directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    compress: true,
    open: true // open default browser while launching
  },
  entry: ['./index.js',
    './ejs/index.ejs',
  ],
  output: {
    filename: env === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }, {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // about importing favicon
    // https://github.com/coryhouse/react-slingshot/issues/128
    // about ejs loading
    //https://github.com/takahiro-saeki/webpack2-web-design.git
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      title: 'homepage ' + env,
      template: './src/ejs/index.ejs'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
});
