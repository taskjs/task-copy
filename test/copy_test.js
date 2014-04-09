'use strict';

var assert = require('assert');
var path = require('path');
var Copy = require('../lib/copy');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

var fixtures = path.join(__dirname, 'fixtures');
var expected = path.join(__dirname, 'expected/');

(new Copy).run(
    [
        path.join(fixtures, 'foo.js'),
        path.join(fixtures, 'bar.js')
    ], // inputs
    {
        dest: expected
    }, // options
    console // logger
).then(function(inputs){
    
}).catch(errorHandler)
