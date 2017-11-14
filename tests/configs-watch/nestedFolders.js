var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

io.writeDataSync(tmpPath('watch', 'nestedFolders', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'nestedFolders', 'subdir', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'nestedFolders', 'subdir', 'subsubdir', 'file.test'), 'file', {makeDirs: true});

var glob = tmpPath('watch', 'nestedFolders', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
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
        'tests/tmp/watch/nestedFolders': ['file.test', 'subdir'],
        'tests/tmp/watch/nestedFolders/subdir': ['file.test', 'subsubdir'],
        'tests/tmp/watch/nestedFolders/subdir/subsubdir': ['file.test']
      }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/**/*\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/subdir/\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/subdir/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/subdir/subsubdir/\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/nestedFolders/subdir/subsubdir/file.test\u001b[22m']
  }
};
