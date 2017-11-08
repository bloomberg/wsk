'use strict';

var path = require('path');
var fse = require('fs-extra');
var chalk = require('chalk');
var io = require('indian-ocean');
var notify = require('wsk').notify;

// Ignore folders that begin with this prefix
var CONFIG = require('./config.js');
var htmlIgnorePrefix = CONFIG.htmlIgnorePrefix;
var simpleHtml = CONFIG.simpleHtml;

module.exports = {onEvent: onEvent};

// Our main function that does the template compilation
function onEvent (eventType, filePath) {
  var fileName = path.basename(filePath);
  var target;
  var targetType;
  if (simpleHtml === true) {
    target = path.join('public', fileName + '.html');
    targetType = 'file';
  } else {
    target = path.join('public', fileName);
    targetType = 'dir';
  }
  // Put this in a try so it doesn't kill the process
  // This makes it so the user can see the error and correct the mistake without having to restart watch process
  try {
    if (io.existsSync(target)) {
      fse.remove(target, function (err) {
        if (err) {
          notify({
            message: 'Error removing ' + targetType,
            value: target,
            display: 'error',
            err: err
          });
        } else {
          notify({
            message: 'Removed ' + targetType + '...',
            value: target,
            display: 'compile'
          });
        }
      });
    } else {
      // Only notify if it's not a hidden folder, since a hidden folder does not not have a corresponding file to remove so it's fine that a file was not found. Anything else should be properly notified as a warning, perhaps? We'll see how it goes.
      if (fileName.charAt(0) !== htmlIgnorePrefix) {
        notify({
          message: chalk.yellow('Target ' + targetType + ' not found. Skipping...'),
          value: target,
          display: 'compile'
        });
      }
    }
  } catch (err) {
    notify({
      message: 'Error removing HTML' + targetType,
      value: target,
      display: 'error',
      error: err
    });
  }
}
