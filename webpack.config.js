const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
let TARGET = process.env.npm_lifecycle_event
let APP_PATH = path.join(__dirname, '/src')

const commonConfig = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}

const buildConfig = {
  module: {
    rules: [
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("main.css")
  ]
}

const devConfig = {
  plugins:[
    new CleanWebpackPlugin(['dist'])
  ]
}



module.exports = Object.assign(commonConfig, TARGET === 'build'? buildConfig : devConfig);
