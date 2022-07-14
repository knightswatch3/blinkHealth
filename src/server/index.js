import express from "express"
import path from "path"
import * as http from "http"

const app = express()

const statPath = path.join(process.cwd(),'./build/public')
app.use("/", express.static(statPath))
const server = http.createServer(app)

server.listen(4002,"0.0.0.0", ()=>{
    console.log("Server started at 4002")
})
