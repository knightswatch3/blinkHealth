import path from "path"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"


const config = {
    entry: {
        main: path.resolve(__dirname, "../../src/server/index.js")
    },
    output: {
        filename: "[name]-server-bundle.js",
        path: path.join(__dirname, "../../public/build")
    },
    module: {
        rules: [{
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }, {
                    loader: "import-glob"
                }]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: "./src/server/**/*"
            }
        })
    ]
}

export default config;