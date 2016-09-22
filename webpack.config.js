var path = require('path');
require('webpack');

module.exports = {
  cache: true,
  entry: path.join(__dirname, '/src/index.js'),
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-image-magnifier.js',
    library: 'ReactImageMagnifier',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ],
  },
};
