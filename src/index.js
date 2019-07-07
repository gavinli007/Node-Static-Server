const yargs = require('yargs')
const Server = require('./app')
// 封装了process.argv
const argv = yargs.usage('anywhere [options]')
.option('p', {alias:'port',describe:'端口号',default:'3000'})
.option('h',{alias:'hostname',describe:'host',default:'localhost'})
.option('d',{alias:'root',describe:'root path',default:process.cwd()})
.version()
.alias('v','verson')
.help()
.argv;

const server = new Server(argv);
server.start()