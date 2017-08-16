const path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'stage-0', 'react'],
        },
      },
    ],
  },
};
