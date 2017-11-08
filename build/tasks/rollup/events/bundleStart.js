var fs = require('fs');
var notify = require('wsk').notify;

// This event also fires if the file was deleted, so ignore if the file doesn't exist
module.exports = function (event, fileConfig) {
  if (fs.existsSync(event.input)) {
    notify({
      message: 'File changed',
      value: event.input,
      display: 'change'
    });
  }
};
