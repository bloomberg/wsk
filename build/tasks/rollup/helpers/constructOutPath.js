'use strict';

/* --------------------------------------------
 *
 * Convert the infile path to an outfile path
 * `Users/user/my-project/src/js/main.js` -> `public/js/main.pkgd.js`
 *
 * --------------------------------------------
 */
var path = require('path');

module.exports = function constructOutPath (file, CONFIG) {
  var fileName = path.basename(file).replace(path.extname(file), CONFIG.outFileExt);
  var outPath = CONFIG.outFileTemplate.replace(CONFIG.nameTemplate, fileName);
  return outPath;
};
