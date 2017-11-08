'use strict';

/* --------------------------------------------
 *
 * Map the incoming event types to our copy / delete actions
 *
 * --------------------------------------------
 */
module.exports = {
  change: 'copyFile',
  add: 'copyFile',
  addDir: 'copyDir',
  unlink: 'removeFile',
  unlinkDir: 'removeDir'
};
