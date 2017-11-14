'use strict';

var fs = require('fs');

module.exports = function exists (filename, cb) {
  fs.access(filename, function (err) {
    var exists;
    if (err && err.code === 'ENOENT') {
      exists = false;
      err = null;
    } else if (!err) {
      exists = true;
    }
    cb(err, exists);
  });
};
