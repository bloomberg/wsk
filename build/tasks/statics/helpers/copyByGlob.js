'use strict';

var path = require('path');
var glob = require('glob');
var notify = require('wsk').notify;
var statics = require('../onEvent');

var CONFIG = require('../config.js');

// Put this as a separate function so we can call it from different scenarios depending on what we had to do with the `public/` folder
module.exports = function copyByGlob () {
  // Turn our globs into an array of real life files!
  glob(CONFIG.files, {
    ignore: CONFIG.ignoreOnBuild, // Pass our set of ignored files and dirs
    mark: true // Put a trailing slash on directories. This will be useful to differentiate them so we can know which copy function to use
  },
  function (err, files) {
    var eventType;
    if (err) {
      notify({
        message: 'Error globbing static files to move',
        value: '',
        display: 'error',
        error: err
      });
    } else {
      // Don't include file contents of directories we're copying over
      // Since those will be copied over anyway
      // For instance, our glob brings us back `src/js/thirdparty/` and `src/js/thirdparty/test.js`
      // Let's filter out the file since we will be copying over the whole `src/js/thirdparty/` directory
      // Our globs above should be written so that behavior is appropriate
      // For instance, we've excluded `src/js/` since we don't want to copy over allll of the contents since our js tasks are taking care transforming and copying those
      files.filter(function (file) {
        // A file string looks like `src/js/thirdparty/test.js`. its corresponding `path.dirname` is `src/js/thirdparty`. Add a file separator character and see if it matches any of our directories
        // If it does, filter it out!
        if (files.indexOf(path.dirname(file) + path.sep) > -1) {
          return false;
        }
        // Otherwise it's cool to keep
        return true;
      }).forEach(function (filePath) {
        // If it ends in a `/`, it is a directory per our `mark: true` option above, so make our `eventType` match
        if (/\/$/.test(filePath)) {
          eventType = 'addDir';
        } else {
          eventType = 'add';
        }
        // Send this to the appropriate copy functions
        statics.onEvent(eventType, filePath);
      });
    }
  });
};
