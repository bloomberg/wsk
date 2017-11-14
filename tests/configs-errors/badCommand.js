var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'badCommand', 'file.test');
io.writeDataSync(filePath, 'file', {makeDirs: true});

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      chokidarOptions: {
        ignoreInitial: false
      },
      events: [
        {
          type: 'add',
          commands: 'ndoe ' + testPath('clis', 'report.js')
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/errors/badCommand': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/errors/badCommand/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/errors/badCommand/file.test\u001b[22m'],
    onCommandEvent: [
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[31mError running command...\u001b[39m \u001b[1mndoe tests/clis/report.js\u001b[22m',
      {
        code: 127,
        command: 'tests/clis/report.js',
        env: undefined
      }
    ]
  }
};
