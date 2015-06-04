'use strict';

var expect = require('chai').expect;
var Hapi = require('hapi');

describe('hapi-elapsed', function () {
  var server;

  beforeEach(function (done) {
    server = new Hapi.Server();
    server.connection();
    server.register(require('../lib/hapi-elapsed'), done);
  });

  function injectAndGetElapsedEvent(next) {
    server.on('log', function (event, tags) {
        if (tags.elapsed) {
          next(event);
        }
      });

    server.inject({ url: '/' }, function (resp) {});
  }

  it('should fire event with id', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.id).to.be.a('string');
      done();
    });
  });

  it('should fire event w/elapsed', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.msec).to.be.above(0);
      done();
    });
  });

  it('should fire event with method', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.method).to.equal('get');
      done();
    });
  });

  it('should fire event with url', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.url).to.equal('/');
      done();
    });
  });

  it('should fire event w/status', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.statusCode).to.be.a('number');
      done();
    });
  });

  it('should fire event with headers', function (done) {
    injectAndGetElapsedEvent(function (event) {
      expect(event.data.headers).to.be.an('object');
      done();
    });
  });




});