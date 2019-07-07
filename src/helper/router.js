const file = require('fs')
const path = require('path')
const chalk = require('chalk')
const promiseify = require('util').promisify
const readdir = promiseify(file.readdir)
const stat = promiseify(file.stat)
const HandleBars = require('handlebars')
const mine = require('./mime')
const isFresh = require('./cache')
const compress = require('./compress')
console.log(`__dirname:${chalk.green(__dirname)}`)
const tplPath = path.join(__dirname, '../template/dir.tpl')
console.log(`tplPath:${chalk.red(tplPath)}`)
//同步
const source = file.readFileSync(tplPath)
const template = HandleBars.compile(source.toString())
module.exports= async function (req,res,filePath,conf) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            //绝对路径
            const contentType = mine(filePath);
            // res.statusCode =200;
            res.setHeader('Content-Type',contentType);
            if(isFresh(stats,req,res)) {
                res.statusCode =304;
                res.end()
                return
            }
            res.statusCode =200;
            // file.readFile(filePath,(err,data)=>{
            //     res.end(dara)
            // })
            let rs = file.createReadStream(filePath)
            if (filePath.match(conf.compress)) {
                rs = compress(rs,req,res)
            }
            rs.pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode =200;
            res.setHeader('Content-Type','text/html');
            const data = {
                title: path.basename(filePath),
                dir: path.relative(conf.root,filePath),
                files: files.map(file=>{return {file,fileType:mine(file)}} )
            }
            res.end(template(data))
            // res.end(files.join(','))
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.write(`${filePath} is not a directory or file`)
    }
}