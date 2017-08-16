const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const path = require('path');

module.exports = {
  entry: './server.js',
  target: 'node',
  node: {
    fs: 'empty',
  },
  output: {
    path: path.resolve('dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets',
  },
  devServer: {
    inline: true,
    contentBase: './dist',
    port: 3000,
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
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader',
      },
      {
        test: /\.css$$/,
        loader: 'style-loader!css-loader',

      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader',
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: cssNano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
};
