module.exports=function({file, options,env}) {
    return {
        plugins:{
            "postcss-url": {
                url: "rebase"
            },
            "autoprefixer": true
        }
    }
}