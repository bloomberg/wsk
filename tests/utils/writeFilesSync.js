'use strict';

/* --------------------------------------------
 *
 * Create (or modify existing) files or dirs so we can test the watcher reports these events.
 *
 * --------------------------------------------
 */

var io = require('indian-ocean');
var normalizeWatchGroupPath = require('./normalizeWatchGroupPath');

module.exports = function writeFilesSync (watchGroups, cb) {
  watchGroups.forEach(normalizeWatchGroupPath(processPath));
};

function processPath (err, filePaths) {
  if (err) {
    console.error(err);
    return;
  }
  filePaths.forEach(function (filePath) {
    if (/\/$/.test(filePath) === true) {
      io.makeDirectoriesSync(filePath);
    } else {
      io.writeDataSync(filePath, 'modified', {makeDirs: true});
    }
  });
}
