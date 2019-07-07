
const {createGzip,createDeflate} = require('zlib')

// rs指readStream
module.exports = (rs,req,res) =>{
   const acceptEncoding = req.headers['accept-encoding']
//    \babc\b匹配的是"abc"
//    \sabc\s匹配的不是"abc", 前后还带空格" abc "
//    \b只是匹配字符串开头结尾及空格回车等的位置, 不会匹配空格符本身 
   
//    例如"abc sdsadasabcasdsadasdabcasdsa",
//    \sabc\s不能匹配,\babc\b可以匹配到"abc"
   if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
       return rs
   } else if (acceptEncoding.match(/\bgzip\b/)) {
       res.setHeader('Content-Encoding','gzip')
       return rs.pipe(createGzip())
   }  else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding','deflate')
        return rs.pipe(createDeflate())
    } 

}