// import merge from 'webpack-merge';
// import baseConfig from './webpack.base.config';
//
// export default merge({
//   devtool: 'cheap-module-source-map',
// }, baseConfig);

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const prodConfig = merge({
  devtool: 'cheap-module-source-map',
}, baseConfig);


module.exports = prodConfig;
