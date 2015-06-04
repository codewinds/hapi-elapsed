'use strict';
var Hoek = require('hoek');

module.exports.register = function(server, options, next) {
  server.ext('onRequest', function (request, next) {
    request.plugins.elapsed = {
      bench: new Hoek.Bench() // store starting bench
    };
    next();
  });

  server.on('response', function (request) {
    server.log(['elapsed'], {
      id: request.id,
      msec: request.plugins.elapsed.bench.elapsed(),
      method: request.method,
      url: request.url.href,
      statusCode: request.response.statusCode,
      headers: request.response.headers
    });
  });

  next();
}

 module.exports.register.attributes = {
  pkg: require('../package.json')
}