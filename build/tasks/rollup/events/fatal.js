var notify = require('wsk').notify;
var cleanupOutPath = require('../helpers/cleanupOutPath');

// This even also fires if the file was deleted, so ignore if the file doesn't exist
module.exports = function (event, fileConfig) {
  notify({
    message: 'Error compiling JS...',
    value: cleanupOutPath(event, fileConfig),
    display: 'error',
    error: event.error
  });
};
