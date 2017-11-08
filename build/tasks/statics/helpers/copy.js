'use strict';

/* --------------------------------------------
 *
 * Generic copy function, a wrapper around fs-extra with error handling and notifications
 * Delegates to `fs.copyFileSync` if that exists (Node 8.5.0>=)
 *
 * --------------------------------------------
 */

var fse = require('fs-extra');
var notify = require('wsk').notify;

module.exports = function copy (source, target, format) {
  // This is synchronous to avoid a race condition and timing issues when adding nested folders and files
  try {
    fse.copySync(source, target);
    notify({
      message: 'Copied ' + format + ' from `' + source + '` to',
      value: target,
      display: 'compile'
    });
  } catch (err) {
    if (err) {
      notify({
        message: 'Error copying ' + format + ' from `' + source + '` to',
        value: target,
        display: 'error',
        error: err
      });
    }
  }
};
