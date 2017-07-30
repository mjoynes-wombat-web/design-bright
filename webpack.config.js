const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist/scripts',
    filename: 'bundle.js',
    publicPath: 'scripts',
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
        loader: ['babel'],
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
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader',
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
};
