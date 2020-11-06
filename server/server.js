const http = require('http');
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')

const serve = serveStatic('build', { 'index': ['index.html'] })
 
const server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})
server.listen(process.env.PORT || 8081);
