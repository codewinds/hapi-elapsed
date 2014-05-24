'use strict';
var Hoek = require('hoek');

function register(plugin, options, next) {
  plugin.ext('onRequest', function (request, next) {
    request.plugins.elapsed = {
      bench: new Hoek.Bench() // store starting bench
    };
    next();
  });

  plugin.events.on('response', function (request) {
    plugin.log(['elapsed'], {
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

exports.register = register;