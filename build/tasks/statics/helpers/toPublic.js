'use strict';

/* --------------------------------------------
 *
 * Simple string replacement to send files to the corresponding place in `public/`
 *
 * --------------------------------------------
 */

module.exports = function toPublic (filePath) {
  return filePath.replace('src', 'public');
};
