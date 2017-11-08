var fs = require('fs');
var notify = require('wsk').notify;
var chalk = require('chalk');
var cleanupOutPath = require('../helpers/cleanupOutPath');

var formatBytes = require('../../../utils/format-bytes.js');
var formatTime = require('../../../utils/format-time.js');

module.exports = function (event, fileConfig) {
  var stats = fs.statSync(event.output[0]);
  var fileSizeInUnits = formatBytes(stats['size']);

  notify({
    message: 'Compiled JS to',
    value: cleanupOutPath(event, fileConfig) + ' ' + chalk.reset('(' + fileSizeInUnits + ', ' + formatTime(event.duration) + ')'),
    display: 'compile'
  });
};
