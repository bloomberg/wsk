'use strict';

/* --------------------------------------------
 *
 * Rollup displays the full path, convert these to relative paths from the file root for nicer display strings
 * `/Users/user/my-project/src/js/main.js -> `src/js/main.js`
 *
 * --------------------------------------------
 */
var projectPath = require('../../../utils/projectPath');

module.exports = function cleanupOutPath (event, fileConfig) {
  if (event.output && event.output[0]) {
    return projectPath(event.output[0]);
  }
  return fileConfig.output.file;
};
