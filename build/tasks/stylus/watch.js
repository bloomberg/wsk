'use strict';

// Load our watcher module
var watcher = require('wsk').watcher;
var path = require('path');
var getTopLevelFiles = require('./helpers/getTopLevelFiles');
/* --------------------------------------------
 * Including an item in events will run `notify` with the appropriate event as specified in `build/notify.js`
 * Optionally you can specify one or more `taskFiles` to run something when that event is triggered. See `build/tasks/watcher.js` for more information
 *
 * List which file pattern to watch and what events to watch for and their corresponding action to perform when those events occur
 * An interesting feature of the equivalent `stylus -w` command is that it will watch imported files.
 * Instead, we are more simply watching all stylus files in our `css/` directory
 * The one disadvantage is that CSS will be compiled if a file that is not imported changes or is added
 * This is fine though because it has no effect on the resulting CSS and is less error-prone that adding and removing listeners
 * when new files appear and disappear from different imports.
 *
 */

var CONFIG = require('./config.js');

var watchGroup = [
  {
    serviceName: 'stylus',
    path: CONFIG.watchTopLevel,
    displayOptions: {
      hideChildDirs: true
    },
    events: [
      {
        type: 'change',
        taskFiles: 'build/tasks/stylus/onEvent.js',
        options: {
          sourcemap: true
        }
      },
      {
        type: 'add',
        taskFiles: 'build/tasks/stylus/onEvent.js',
        options: {
          sourcemap: true
        }
      },
      {
        type: 'unlink',
        taskFiles: 'build/tasks/stylus/onEvent-unlink.js',
        targetFiles: function (filePath) {
          // If we removed a top level file, remove its corresponding css and map files
          var outFileName = path.basename(filePath).replace(/\.styl$/, '.css');
          var outFilePath = path.join(CONFIG.outStem, outFileName);
          return [
            outFilePath,
            outFilePath + '.map'
          ];
        }
      }
    ]
  }, {
    serviceName: 'stylus module',
    path: CONFIG.watchModules,
    displayOptions: {
      hideChildDirs: true
    },
    events: [
      {
        type: 'change',
        taskFiles: 'build/tasks/stylus/onEvent.js',
        targetFiles: getTopLevelFiles,
        options: {
          sourcemap: true
        }
      },
      {
        type: 'add',
        taskFiles: 'build/tasks/stylus/onEvent.js',
        targetFiles: getTopLevelFiles,
        options: {
          sourcemap: true
        }
      },
      {
        type: 'unlink',
        taskFiles: 'build/tasks/stylus/onEvent.js',
        targetFiles: getTopLevelFiles,
        options: {
          sourcemap: true
        }
      }
    ]
  }
];

watcher.add(watchGroup);
