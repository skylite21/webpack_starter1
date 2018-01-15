/*jshint esnext: true */
/*jshint devel: true */
/*jslint node: true */
/*jslint browser: true */
/*jslint jquery: true */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");


const config = {
  entry: './src/index.js',
  output: { 
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
      use: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          }
        }),
        test: /\.css$/
      },
      {
        test:/\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 1200,
              outputPath: 'styles/img',
            }
          },
          'image-webpack-loader',
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader:'html-loader',
          options: {
            minimize: false
          }
        }
      }
    ] 
  },
  plugins: [
    // find any files that where extracted and save it to this file
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
    // new MinifyPlugin()
  ]
};


module.exports = config;
