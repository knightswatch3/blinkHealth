import baseConfiguration from "./webpack.base" 

 

const config = Object.assign({
        mode:"development", 
        watch: true
}, baseConfiguration)

export default config;