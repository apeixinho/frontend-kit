const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");


const loaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  noInfo: true // set to false to see a list of every file being bundled.
});
const environmentPluginConfig = new webpack.EnvironmentPlugin({
  NODE_ENV: 'production',
  DEBUG: false,
});
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'homepage',
  template: './ejs/index.ejs',
  favicon: './images/favicon.ico',
  inject: true,
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
  // Properties you define here are available in index.html
  // using htmlWebpackPlugin.options.varName
  // trackJSToken: 'INSERT YOUR TOKEN HERE'
});
const prodConfig = module.exports = {
  devtool: 'hidden-source-map',
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: [
    // 'font-awesome/scss/font-awesome.scss',
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
        use: ExtractTextPlugin.extract({
          use: [{
              // translates CSS into CommonJS
              loader: 'css-loader',
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
            }, {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
          ],
          fallback: 'style-loader'
        }),
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/octet-stream',
            name: 'fonts/[name].[ext]'
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
            name: 'fonts/[name].[ext]'
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
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'font-awesome-loader'
          }
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ],
  },
  plugins: [
    environmentPluginConfig,
    loaderOptionsPluginConfig,
    // new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
    new GoogleFontsPlugin({
      fonts: [{
        family: "PT Sans"
      }, ],
      path: "fonts/",
      filename: "fonts/fonts.css"
    }),
    new ExtractTextPlugin('styles.[contentHash].css', {
      allChunks: true
    }),
    htmlWebpackPluginConfig
  ]
};
module.exports = prodConfig;
