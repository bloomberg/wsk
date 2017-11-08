'use strict';

var watcher = require('wsk').watcher;

// Our JavaScript files are from our normal watcher scheme because rollup watch handles incremental builds
// So this file just looks for a `add` and `unlink` events.
var watchGroup = [
  {
    serviceName: 'js',
    path: 'src/js/*.js',
    events: [
      {
        type: 'add',
        taskFiles: 'build/tasks/rollup/onEvent.js'
      },
      {
        type: 'unlink',
        targetFiles: function (changedFile) {
          var outFile = changedFile.replace('src', 'public');
          return [
            outFile.replace(/\.js$/, '.pkgd.js'),
            outFile.replace(/\.js$/, '.pkgd.js.map')
          ];
        },
        taskFiles: 'build/tasks/statics/onEvent.js'
      }
    ]
  }
];

watcher.add(watchGroup, (err, watchTree) => {
  if (err) {
    console.error(err);
  } else {
    require('../browserSync/cli');
  }
});
