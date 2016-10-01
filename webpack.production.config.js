var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'src/main.js'),
  ],
  output: {
    path: __dirname + '/docs',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'src'), loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
      { from: './src/main.css', to: 'main.css' }
    ]),
  ],
  postcss: function postcssInit(webpackInstance) {
    return [
      require('postcss-import')({
      /* We need to assign postcss plugins inside this function
         to pass webpackInstance to postcss-import. */
        addDependencyTo: webpackInstance,
      }),
      require('postcss-cssnext'),
      require('postcss-mixins'),
    ];
  },
};
