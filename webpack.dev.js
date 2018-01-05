// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = merge({

  devtool: 'eval-source-map',
  devServer: {
    contentBase:  path.resolve(__dirname, 'dist'), // A directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    compress: true,
    open: true // open default browser while launching
  },
}, baseConfig);

module.exports = devConfig;
