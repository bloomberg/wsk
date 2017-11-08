'use strict';

/* --------------------------------------------
 *
 * Generic remove function, a wrapper around fs-extra with error handling and notifications
 * See fs-extra's documentation for more info: https://www.npmjs.com/package/fs-extra#removedir-callback
 *
 * --------------------------------------------
 */

var fse = require('fs-extra');
var notify = require('wsk').notify;
var io = require('indian-ocean');

module.exports = function remove (target, format) {
  io.exists(target, function (err, exists) {
    if (err) {
      notify({
        message: 'Error determining if file exists' + format,
        value: target,
        display: 'error',
        error: err
      });
    } else if (exists) {
      fse.remove(target, function (err) {
        if (err) {
          notify({
            message: 'Error removing ' + format,
            value: target,
            display: 'error',
            error: err
          });
        } else {
          notify({
            message: 'Removed ' + format + '...',
            value: target,
            display: 'compile'
          });
        }
      });
    } else {
      notify({
        message: 'Attempted to remove ' + format + ' but it does not exist...',
        value: target,
        display: 'error'
      });
    }
  });
};
