const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfiguration = require("./webpack.base.js") 
const config = Object.assign({
        mode:"development",
        optimization:{
            minimizer: [new UglifyJsPlugin({
              sourceMap: true,
              uglifyOptions:{
                comments: false,
                warnings: false,
                compress: {
                  drop_console: false
                },
                //mangle: false,
                mangle:true,
                output: {
                  comments: false,
                }
              }
            })]
          },
        devServer:{
            static: path.join("./public"),
            compress: true,
            port: 4001,
            historyApiFallback: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
}, baseConfiguration)


module.exports = config;