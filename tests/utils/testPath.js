'use strict';

/* --------------------------------------------
 *
 * Simple file path abbrebiation to the `tests/` dir
 *
 * --------------------------------------------
 */

var path = require('path');

module.exports = function testPath () {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(null, ['tests'].concat(args));
  // return path.join('tests', ...arguments);
};
