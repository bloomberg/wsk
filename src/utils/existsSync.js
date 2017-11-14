'use strict';

var fs = require('fs');

// Defer to fs.existsSync if it exists
module.exports = function existsSync (filename) {
  if (fs.existsSync) {
    return fs.existsSync(filename);
  } else {
    try {
      fs.accessSync(filename);
      return true;
    } catch (ex) {
      return false;
    }
  }
};
