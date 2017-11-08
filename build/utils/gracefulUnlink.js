var fs = require('fs');
var io = require('indian-ocean');

module.exports = function (filePath, cb) {
  io.exists(filePath, function (err, exists) {
    if (err) {
      cb(err);
    } else if (exists) {
      fs.unlink(filePath, cb);
    } else {
      cb(null, 'No file', filePath);
    }
  });
};
