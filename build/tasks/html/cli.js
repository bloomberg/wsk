var buildHtml = require('./onEvent-build');

var CONFIG = require('./config');

buildHtml.onEvent(null, null, CONFIG.simpleHtml);
