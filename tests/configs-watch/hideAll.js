var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

io.writeDataSync(tmpPath('watch', 'hideAll', 'file.test'), 'file', {makeDirs: true});
io.writeDataSync(tmpPath('watch', 'hideAll', 'subdir', 'file-2.test'), 'file', {makeDirs: true});

var glob = tmpPath('watch', 'hideAll', '**', '*');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      displayOptions: {
        hideAll: true
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
      notification: [{'tests/tmp/watch/hideAll': ['file.test', 'subdir'], 'tests/tmp/watch/hideAll/subdir': ['file-2.test']}]
    }],
    onInit: ['']
  }
};
