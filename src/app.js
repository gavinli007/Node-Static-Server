const http = require('http');
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/router')
const openurl = require('./helper/openUrl')

class Server {
    constructor(config){
        this.conf = {...conf,...config};
        // this.conf = Object.assign({},conf,config)
    }

    start() {
        const server = http.createServer((req,res) =>{
            const url = req.url;
            const filePath = path.join(this.conf.root, url)
            route(req,res,filePath,this.conf)
        })
        server.listen(this.conf.port,this.conf.hostname,()=>{
           const addr = `http://${this.conf.hostname}:${this.conf.port}`
           console.info(`Server started at ${chalk.green(addr)}`)
           openurl(addr)
        })
    }
}

module.exports = Server;