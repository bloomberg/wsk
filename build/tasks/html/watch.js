'use strict';

// Load our watcher module
var watcher = require('wsk').watcher;

var CONFIG = require('./config');

// Including an item in events will run `notify` with the appropriate event as specified in `build/notify.js`
// Optionally you can specify one or more `taskFiles` to run something when that event is triggered. See `build/tasks/watcher.js` for more information
var watchGroups = [
  {
    serviceName: 'html',
    path: ['config.json', 'src/html/**/*', 'build/template-helpers.js'],
    displayOptions: {
      hideChildDirs: true
    },
    events: [
      {
        type: 'change',
        taskFiles: 'build/tasks/html/onEvent-build.js',
        options: {
          simpleHtml: CONFIG.simpleHtml
        }
      },
      {
        type: 'add',
        taskFiles: 'build/tasks/html/onEvent-build.js',
        options: {
          simpleHtml: CONFIG.simpleHtml
        }
      },
      {
        type: 'unlink',
        taskFiles: 'build/tasks/html/onEvent-build.js',
        options: {
          simpleHtml: CONFIG.simpleHtml
        }
      }
    ]
  },
  {
    serviceName: 'html-folder',
    path: ['src/html/*'],
    chokidarOptions: {
      ignored: 'src/html/*.aml',
      ignoreInitial: true
    },
    displayOptions: {
      hideChildrenFiles: true
    },
    events: [
      {
        type: 'unlinkDir',
        taskFiles: 'build/tasks/html/onEvent-remove.js'
      }
    ]
  }
];

watcher.add(watchGroups);
