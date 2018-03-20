const path = require('path')
const slsw = require('serverless-webpack')
const webpackNodeExternalsPlugin = require('webpack-node-externals')

const absPath = (dir) => path.resolve(process.cwd(), dir)
const SRC = path.resolve(__dirname, 'src')

module.exports = {
  context: absPath('.'),
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs2',
    path: absPath('build'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.yml$/,
      use: ['json-loader', 'yaml-loader']
    }]
  },
  externals: [webpackNodeExternalsPlugin({
    whitelist: [/\.yml/]
  })],
  target: 'node',
  resolve: {
    alias: {
      base: process.cwd(),
      config: `${SRC}/config`,
      helper: `${SRC}/helper`,
      service: `${SRC}/service`,
      value: `${SRC}/value`,
      action: `${SRC}/action`
    }
  }
}
