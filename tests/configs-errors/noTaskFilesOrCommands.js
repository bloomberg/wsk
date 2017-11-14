var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'noTaskFilesOrCommands', 'file.test');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      events: [
        {
          type: 'add'
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: 'Error: No `taskFiles` or `commands` set for `basic` service\'s event... add',
      notification: null
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[31mError: No `taskFiles` or `commands` set for `basic` service\'s event...\u001b[39m \u001b[1madd\u001b[22m']
  }
};
