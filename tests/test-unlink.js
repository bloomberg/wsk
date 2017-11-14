import test from 'ava';
var getTestFiles = require('./utils/getTestFiles');
var unlinkFilesSync = require('./utils/unlinkFilesSync');
var testEach = require('./utils/testEach');

/* --------------------------------------------
 * Load all modules in corresponding config directory for this topic
 */
var topic = 'unlink';
var testFiles = getTestFiles(topic);

function on (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err);
    } else {
      cb(null, notification, which, counters[which]++);
      if (which === 'onInit') {
        unlinkFilesSync(watchGroups);
      }
    }
  };
}

testFiles.forEach(function (testFile) {
  test.cb(testFile.name, testEach(on, testFile));
});
