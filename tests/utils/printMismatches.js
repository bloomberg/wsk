'use strict';

/* --------------------------------------------
 *
 * Helper function to print out the actual result when `toTest` does not equal `expected`.
 * Useful for colored strings, which we have a lot of.
 *
 * --------------------------------------------
 */
var io = require('indian-ocean');

module.exports = function printMismatches (toTest, info) {
  var str = JSON.stringify(toTest);
  io.writeDataSync('tests/tmp/snippets/' + [info.name, info.which, info.counter].join('_'), str, {makeDirs: true});
};
