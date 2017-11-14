'use strict';

/* --------------------------------------------
 *
 * Delete files or dirs so we can test the watcher reports these events.
 *
 * --------------------------------------------
 */

var fse = require('fs-extra');
var normalizeWatchGroupPath = require('./normalizeWatchGroupPath');

module.exports = function unlinkFilesSync (watchGroups, cb) {
  watchGroups.forEach(normalizeWatchGroupPath(processPath));
};

function processPath (err, filePaths) {
  if (err) {
    console.error(err);
    return;
  }
  filePaths.forEach(function (filePath) {
    fse.remove(filePath);
  });
}
