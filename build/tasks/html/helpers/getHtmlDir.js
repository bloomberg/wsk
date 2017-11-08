'use strict';

/* --------------------------------------------
 *
 * Get the immediate parent directory of the passed in file
 * For example, if it's in `/Users/me/project-root/src/html/about/index.jst`
 * Return 'about'
 *
 * --------------------------------------------
 */
var path = require('path');

module.exports = function getHtmlDir (filePath) {
  return path.basename(path.dirname(filePath));
};
