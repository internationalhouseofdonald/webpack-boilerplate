const path = require('path');
// const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: ['whatwg-fetch', `./src/main.js`]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-maps',
  devServer: {
    contentBase: './dist',
    port: 80
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.php$/,
        loaders: [
          'php-loader'
        ]
      },
      {
        test: /\.scss$|\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(pdf|png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-2']
            }
          }
        ]
      }, 
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      }
    ]
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin()]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/components/srep/images/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // This was added per this documentation. If running this script doesn't work, try taking this part out as you may have cross-platform incompatibility issues.
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     warnings: false,
    //     parse: {},
    //     compress: {},
    //     mangle: true,
    //     output: null,
    //     toplevel: false,
    //     nameCache: null,
    //     ie8: false,
    //     keep_fnames: false
    //   }
    // }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      // cache: true,
      minRatio: 0.8
    })
  ]
}
