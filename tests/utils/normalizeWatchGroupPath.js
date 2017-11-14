'use strict';

/* --------------------------------------------
 *
 * Normalize the `path` in the watch group into an array of paths depending on whether it's a simple string, glob or we're manually setting the path via `testPath`.
 *
 * --------------------------------------------
 */

var glob = require('glob');
var isGlob = require('is-glob');

module.exports = function (cb) {
  return function (watchGroup) {
    if (isGlob(watchGroup.path) === false) {
      cb(null, [watchGroup.path]);
    } else if (watchGroup.testPath) {
      cb(null, [watchGroup.testPath]);
    } else {
      glob(watchGroup.path, cb);
    }
  };
};
