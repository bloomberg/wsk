var glob = require('glob');
var CONFIG = require('../config.js');

module.exports = function getTopLevelFiles () {
  return glob.sync(CONFIG.watchTopLevel);
};
