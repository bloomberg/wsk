'use strict';

/* --------------------------------------------
 *
 * Take a string that looks like `/Users/my-name/code/my-project/src/js/main.js`
 * And return the path relative to the project directory such as `src/js/main.js`
 *
 * --------------------------------------------
 */

var path = require('path');

module.exports = function projectPath (filePath) {
  // Optionally remove a trailing slash if it exists
  return filePath.replace(new RegExp(path.resolve('./') + '(\\' + path.sep + '?)'), '');
};
