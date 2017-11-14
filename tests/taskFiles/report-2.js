var path = require('path');
module.exports = {onEvent};

function onEvent (eventType, filePath, opts, cb) {
  setTimeout(function () {
    var shortPath = __filename.replace(path.resolve('./') + '/', '');
    cb(null, {eventType: eventType, filePath: filePath, options: opts, taskFilePath: shortPath});
  }, 500);
}
