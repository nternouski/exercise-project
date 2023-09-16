"use strict";
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const extensions = ['.tsx', '.ts', '.js']

module.exports = {
  target: 'node',
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: path.join(path.resolve(__dirname, "src"), "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions,
    plugins: [new TsconfigPathsPlugin({extensions})]
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "this", // <-- Important
  },
  optimization: {
    minimize: true, // enabling this reduces file size and readability
  },
};
