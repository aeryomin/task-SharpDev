const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
require('dotenv').config()

const config = {
  devtool: 'eval-cheap-module-source-map',
  entry: './client/App.jsx',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    port: process.env.CLIENT_DEV_PORT,
    host: 'localhost',
    index: 'index.html',
    open: true,
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: [
      {
        context: ['/api', '/auth', '/ws'],
        target: `http://localhost:${process.env.PORT || 8090}`,
        secure: false,
        changeOrigin: true,
        ws: process.env.ENABLE_SOCKETS || false
      }
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/main.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html'
        }
      ]
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        PORT: process.env.PORT,
        CLIENT_DEV_PORT: process.env.CLIENT_DEV_PORT,
        ENABLE_SOCKETS: process.env.ENABLE_SOCKETS
      }
    })
  ]
}

module.exports = config
