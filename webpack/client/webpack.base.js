const path = require("path" )
const HtmlWebpackPlugin = require("html-webpack-plugin")
console.log("Dir is", path.resolve(__dirname, "../../src/assets/"))

module.exports ={ 
    entry : {
        main: path.resolve(__dirname, "../../src/client/index.js")
    },
    output: {
        filename: "[name]-client-bundle.js",
        path: path.join(__dirname, "../../public/build"),
        filename: "[name]-client.js",
        sourceMapFilename: "[name].map",
        chunkFilename: "[id].js",
        crossOriginLoading: "anonymous",
        publicPath: ("/")
    },
    stats: {
      colors: true,
      timings: true
    },
    resolve:{
        extensions: [".js", ".json"],
        alias: {
            Assets: path.resolve(__dirname, "../../src/assets"),
            Utilities: path.resolve(__dirname, "../../src/client/client_modules/utilities"),
            // Config: path.resolve(__dirname, "..")
        }
      },
    module:{
        rules:[
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                },{
                    loader: "import-glob"
                }]
            },{
                test: /\.(scss|sass)$/,
                use: [
                   {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },{
                        loader: "resolve-url-loader",
                    },{
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },{
                        loader: "postcss-loader",
                        options:{
                            postcssOptions: {
                                config: path.resolve(__dirname, "../postcss.config.js"),
                            }
                        }
                    },{
                        loader: "import-glob",
                    }
                ]
            },{
                test: /\.(css)$/,
                use:[{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options: {
                        importLoaders:1
                    }
                },
                {
                    loader: "postcss-loader",
                    options:{
                        postcssOptions: {
                            sourceMap: true,
                            config: path.resolve(__dirname, "../postcss.config.js"),
                        }
                    }
                }
            ]
            }
        ]
    },
    resolve:{
        extensions: [".jsx",".js"]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            title: "BlinkHealth",
            inject: "body"
        })
    ]
}

