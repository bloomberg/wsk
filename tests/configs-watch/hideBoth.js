var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

io.writeDataSync(tmpPath('watch', 'hideBoth', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'hideBoth', 'subdir', 'file.test'), 'file', {makeDirs: true});

var filePath = tmpPath('watch', 'hideBoth', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      displayOptions: {
        hideChildFiles: true,
        hideChildDirs: true
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
      notification: [{'tests/tmp/watch/hideBoth': ['file.test', 'subdir'], 'tests/tmp/watch/hideBoth/subdir': ['file.test']}]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/hideBoth/**/*\u001b[22m']
  }
};
