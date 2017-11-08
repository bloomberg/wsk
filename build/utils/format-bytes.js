'use strict';

/* --------------------------------------------
 *
 * Pretty-print bytes into their most-sensible units
 *
 * --------------------------------------------
 */

module.exports = function (bytes, decimals) {
  var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (bytes === 0) {
    return '0 ' + sizes[0];
  }
  var k = 1000;
  var dm = decimals + 1 || 2;
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
