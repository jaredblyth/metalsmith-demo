/*
  Don't bother running me directly.  I'm used per subfolder to avoid duplicate
  code in case we need to mess about with the local file server.
*/
var path = require('path');
var http = require('http');
var url = require('url');

module.exports = function(root, web, port) {
  var send = require(path.join(root, 'node_modules', 'send'));

  var webroot = path.join(root, web);

  var app = http.createServer(function(req, res) {
    function error(err) {
      res.statusCode = err.status || 500;
      res.end(http.STATUS_CODES[err.status]);
    }

    function redirect() {
      res.statusCode = 301;
      res.setHeader('Location', req.url + '/');
      res.end('Redirecting to ' + req.url + '/');
    }

    send(req, url.parse(req.url).pathname, {root: webroot})
      .on('error', error)
      .on('directory', redirect)
      .pipe(res);
  }).listen(port);

  return app;
};
