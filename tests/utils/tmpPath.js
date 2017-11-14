'use strict';

/* --------------------------------------------
 *
 * Simple file path abbrebiation to the `tests/fixtures/` dir
 *
 * --------------------------------------------
 */

var path = require('path');
var testPath = require('./testPath');

module.exports = function fixturesPath () {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(null, [testPath(), 'tmp'].concat(args));
};
