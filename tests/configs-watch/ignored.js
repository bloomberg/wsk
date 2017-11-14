var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('watch', 'ignored', 'file.test');
var filePath2 = tmpPath('watch', 'ignored', 'file-2.test');
var filePath3 = tmpPath('watch', 'ignored', 'subdir', 'file.test');
var filePath4 = tmpPath('watch', 'ignored', 'subdir', 'file-2.test');

io.writeDataSync(filePath, 'file', {makeDirs: true});
io.writeDataSync(filePath2, 'file', {makeDirs: true});
io.writeDataSync(filePath3, 'file', {makeDirs: true});
io.writeDataSync(filePath4, 'file', {makeDirs: true});

var glob = tmpPath('watch', 'ignored', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      chokidarOptions: {
        ignored: [filePath2]
      },
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        },
        {
          type: 'change',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{
        'tests/tmp/watch/ignored': ['file.test', 'subdir'],
        'tests/tmp/watch/ignored/subdir': ['file-2.test', 'file.test']
      }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/ignored/**/*\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/ignored/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/ignored/subdir/\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/ignored/subdir/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/ignored/subdir/file.test\u001b[22m']
  }
};
