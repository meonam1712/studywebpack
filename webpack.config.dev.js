var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    'webpack-dev-server/client?http://localhost:4000/',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './client')
  ],
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: 'dist/bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?experimental&comments=false', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: [
    'inline-source-map',
    'eval'
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:' + (process.env.PORT || 3000)
    }
  }
};
