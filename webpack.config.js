const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Stylish = require('webpack-stylish')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      browser: 'google chrome',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new Stylish(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Rail Fence Cipher'
    })
  ]
}
