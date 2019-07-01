const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: {
    app: ['whatwg-fetch', `./src/main.dev.js`]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 5001,
    hot: true
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
        test: /\.scss$|\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // favicon: 'src/components/srep/images/favicon.png',
      title: "Hot Module Replacer"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    })
    // ,
    // new CompressionPlugin({
    //   filename: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   // cache: true,
    //   minRatio: 0.8
    // })
  ]
}
