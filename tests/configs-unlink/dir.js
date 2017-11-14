var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('unlink', 'dir', 'subdir/');
io.makeDirectoriesSync(filePath);
var dirToRemove = tmpPath('unlink', 'dir', 'subdir');

var glob = tmpPath('unlink', 'dir', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      testPath: dirToRemove,
      events: [
        {
          type: 'unlinkDir',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{
        'tests/tmp/unlink/dir': [ 'subdir' ],
        'tests/tmp/unlink/dir/subdir': []
      }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/unlink/dir/**/*\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/unlink/dir/subdir/\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mDir removal detected...\u001b[39m \u001b[1mtests/tmp/unlink/dir/subdir\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'unlinkDir',
      filePath: dirToRemove,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
