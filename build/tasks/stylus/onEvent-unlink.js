var fs = require('fs');
var notify = require('wsk').notify;

module.exports = {onEvent};

function onEvent (eventType, filePath, opts) {
  fs.unlink(filePath, (err) => {
    if (err) {
      notify({
        message: 'Error deleting file...',
        value: filePath,
        display: 'error',
        error: err
      });
    }
    notify({
      message: 'Deleted file...',
      value: filePath,
      display: 'compile'
    });
  });
}
