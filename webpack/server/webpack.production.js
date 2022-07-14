import baseConfig from "./webpack.base"
import { EnvironmentPlugin} from "webpack";
 
const config = Object.assign({
    mode:"production",
    plugins: [new EnvironmentPlugin({
        DEBUG: false,
        NODE_ENV: false
    })]
}, baseConfig)

export default config;