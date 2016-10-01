var webpack = require('webpack');
var path = require('path');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: 8080
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/main.js')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader' },
    ],
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'src'), loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.js?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
      files: ['src/**/*.css'],
      failOnError: false,
    }),
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
