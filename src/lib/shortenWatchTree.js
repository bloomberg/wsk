'use strict';

/* --------------------------------------------
 *
 * Convert the long file paths to project relative
 *
 * --------------------------------------------
 */
var fullPathsToPrjPath = require('./fullPathsToPrjPath');

module.exports = function shortenWatchTree (watchTree) {
  var shortWatchTree = {};
  Object.keys(watchTree).forEach(watchedDir => {
    var shortPathRoot = fullPathsToPrjPath(watchedDir);
    shortWatchTree[shortPathRoot] = watchTree[watchedDir];
  });
  return shortWatchTree;
};
