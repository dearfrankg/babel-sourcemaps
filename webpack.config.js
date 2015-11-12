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

  output: {
    path: path.resolve('./lib'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },

  externals: nodeModules,

  devtool: 'source-map',

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

  // plugins: [
  //   new webpack.IgnorePlugin(/\.(css|less)$/),
  //   new webpack.BannerPlugin("\n\n" + 'require("source-map-support").install();' + "\n\n",
  //                            { raw: true, entryOnly: false })
  // ]

};
