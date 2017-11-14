var path = require('path');
module.exports = {onEvent};

function onEvent (eventType, filePath, opts, cb) {
  var shortPath = __filename.replace(path.resolve('./') + '/', '');
  cb(null, {eventType: eventType, filePath: filePath, options: opts, taskFilePath: shortPath});
}
