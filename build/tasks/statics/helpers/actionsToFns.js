'use strict';

// Our corresponding actions to perform with some extra info
// Because the `remove` and `copy` functions can do both files and dirs, add some extra info about its provenance
// So we can let the user know what we did with more precision

var copy = require('./copy');
var remove = require('./remove');
var toPublic = require('./toPublic');

module.exports = {
  copyFile: function (filePath) {
    copy(filePath, toPublic(filePath), 'file');
  },
  copyDir: function (dirPath) {
    copy(dirPath, toPublic(dirPath), 'dir');
  },
  removeFile: function (filePath) {
    remove(toPublic(filePath), 'file');
  },
  removeDir: function (dirPath) {
    remove(toPublic(dirPath), 'dir');
  }
};
