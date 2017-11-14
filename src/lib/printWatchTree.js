'use strict';

var fs = require('fs');
var path = require('path');
var fullPathsToPrjPath = require('./fullPathsToPrjPath');

var notify = require('../notify.js');

module.exports = function printWatchTree (watchTree, notification, displayOptions, onDone, cb) {
  // Per the chokidar docs: The object's keys are all the directories
  // (using absolute paths unless the cwd option was used)
  // The values are arrays of the names of the items contained in each directory.
  // https://github.com/paulmillr/chokidar#methods--events
  var shortWatchTree = {};
  Object.keys(watchTree).forEach(watchedDir => {
    // The `fullPath` starts at the computer root, `fullPathsToPrjPath` will shorten that to
    // begin the path at the whisk root directory
    // This is nicer for displaying to users
    // var shortPathRoot = fullPathsToPrjPath(watchedDir);
    var shortPathRoot = fullPathsToPrjPath(watchedDir);
    shortWatchTree[shortPathRoot] = watchTree[watchedDir];
    // Each value is an array, so loop through them to construct full file paths
    watchTree[watchedDir].forEach(child => {
      // Join the child path with the key to get the full path
      var fullPath = path.join(watchedDir, child);
      // See if the thing we're watching is a folder or a file
      // For simplicity, we're only going to show users files that are being watched
      var statInfo;
      try {
        statInfo = fs.statSync(fullPath);
      } catch (err) {
        /* istanbul ignore next */
        let en = notify({
          message: 'Error determining if path is file or directory...',
          value: fullPath,
          display: 'error',
          error: err
        });
        /* istanbul ignore next */
        cb.onInit(en);
        /* istanbul ignore next */
        onDone(en);
        /* istanbul ignore next */
        return;
      }
      // If we're logging directories, then log those out
      // By using the `---`, this will nicely indent underneath our bundle notification above
      if (statInfo && statInfo.isDirectory()) {
        if (displayOptions.hideChildDirs === false) {
          notification += '\n' + notify({
            message: '---',
            value: path.join(shortPathRoot, child) + '/',
            display: 'watch',
            silent: true
          });
        }
      } else if (displayOptions.hideChildFiles === false) {
        // If we're not watching directories notify the user that we're watching this file
        notification += '\n' + notify({
          message: '---',
          value: path.join(shortPathRoot, child),
          display: 'watch',
          silent: true
        });
      }
    });
  });
  console.log(notification);
  onDone(null, shortWatchTree);
  cb.onInit(null, notification);
};
