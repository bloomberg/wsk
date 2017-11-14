var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('watch', 'multiWatchGroup', 'file.test');
io.writeDataSync(filePath, 'file', {makeDirs: true});

var filePath2 = tmpPath('watch', 'multiWatchGroup', 'file-2.test');
io.writeDataSync(filePath2, 'file', {makeDirs: true});

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        }
      ]
    },
    {
      serviceName: 'basic',
      path: filePath2,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{
        'tests/tmp/watch/multiWatchGroup': ['file.test']
      }, {
        'tests/tmp/watch/multiWatchGroup': ['file-2.test']
      }]
    }],
    onInit: [
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/multiWatchGroup/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/multiWatchGroup/file.test\u001b[22m',
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/multiWatchGroup/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/multiWatchGroup/file-2.test\u001b[22m'
    ]
  }
};
