var path = require('path');

var app = require('../server.js')(
  path.resolve('./'),
  './build',
  8080
);