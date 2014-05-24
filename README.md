# hapi-elapsed: Hapi plugin which logs elapsed time

[![Build Status](https://secure.travis-ci.org/codewinds/hapi-elapsed.png?branch=master)](http://travis-ci.org/codewinds/hapi-elapsed)

## Installation

Requires node.js >= 0.10

```bash
npm install ## install dependent node modules
```

## Usage

```javascript
// listen for our new elapsed log event
server.pack.events.on('log', function (event, tags) {
  if (tags.elapsed) {
    // do something with the elapsed event
    console.log('elapsed', event);
  }
});

var plugins = {
  'hapi-elapsed': {}
};
server.pack.require(plugins, function (err) {
  if (err) { throw err; }
  // plugin required, start server
});
```

## Goals

 - compute elapsed time from the beginning of request to the end of the response
 - emit log event with elapsed time

## Why

A simple functional Hapi plugin which calculates and logs elapsed time

## Get involved

If you have input or ideas or would like to get involved, you may:

 - contact me via twitter @codewinds  - <http://twitter.com/codewinds>
 - open an issue on github to begin a discussion - <https://github.com/codewinds/hapi-elapsed/issues>
 - fork the repo and send a pull request (ideally with tests) - <https://github.com/codewinds/hapi-elapsed>

## License

 - [MIT license](http://github.com/codewinds/hapi-elapsed/raw/master/LICENSE)

