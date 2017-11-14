'use strict';

/* --------------------------------------------
 *
 * Take a string or array of strings that looks like `/Users/my-name/code/my-project/src/js/main.js`, or a list of them
 * And return the path relative to the my-project base directory such as `src/js/main.js`
 *
 * --------------------------------------------
 */
var path = require('path');
var _ = require('underscore');

var baseDir = path.resolve('./');

module.exports = function fullPathsToPrjPath (filePaths) {
  // We were given an array of file paths, return an array
  // Otherwise return the converted string
  if (_.isArray(filePaths)) {
    return filePaths.filter(d => d).map(convert);
  } else {
    return convert(filePaths);
  }

  // Do a string replacement on our `baseDir`, which is `/Users/my-name/code/project`, that replaces it with an empty string
  // Optionally remove a trailing slash if it exists
  function convert (filePath) {
    return filePath.replace(new RegExp(baseDir + '(\\' + path.sep + '?)'), '');
  }
};
