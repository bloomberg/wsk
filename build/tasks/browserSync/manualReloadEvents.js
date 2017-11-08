'use strict';

// These are events that browser sync doesn't reload the browser for
// Keep track of them so we can manually trigger a reload when we detect them
module.exports = ['add', 'unlink', 'addDir', 'unlinkDir'];
