var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {

  entry: [
    'babel-polyfill',
    './src/myapp.js'
  ],

  target: 'node',

  output: {
    path: path.resolve('./lib'),
    filename: 'app.js'
  },

  externals: nodeModules,

  module: {
    loaders: [
      {
        loader: "babel-loader",
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],

  devtool: 'sourcemap'

};
