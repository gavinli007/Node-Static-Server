module.exports = {
    port:3000,
    hostname:'localhost',
    root:process.cwd(),
    // |表示匹配二者之一的选择,由于我们要匹配.html，匹配.需要\.
    compress: /\.(html|js|css|md)/,
    cache:{
        maxAge : 600,
        expires:true,
        etag:true,
        cacheControl:true,
        lastModified:true
    }
}