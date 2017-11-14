var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

io.writeDataSync(tmpPath('watch', 'hideChildDirs', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'hideChildDirs', 'file-2.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'hideChildDirs', 'subdir', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'hideChildDirs', 'subdir', 'file-2.test'), 'file', {makeDirs: true});

var filePath = tmpPath('watch', 'hideChildDirs', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      displayOptions: {
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
      notification: [{'tests/tmp/watch/hideChildDirs': ['file-2.test', 'file.test', 'subdir'], 'tests/tmp/watch/hideChildDirs/subdir': ['file-2.test', 'file.test']}]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/hideChildDirs/**/*\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/hideChildDirs/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/hideChildDirs/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/hideChildDirs/subdir/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/hideChildDirs/subdir/file.test\u001b[22m']
  }
};
