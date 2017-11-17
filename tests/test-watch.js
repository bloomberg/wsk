import test from 'ava';

var getTestFiles = require('./utils/getTestFiles');
var testEach = require('./utils/testEach');

/* --------------------------------------------
 * Load all modules in corresponding config directory for this topic
 */
var topic = 'watch';
var testFiles = getTestFiles(topic);

function on (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err);
    } else {
      cb(null, notification, which, counters[which]++);
    }
  };
}

testFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(on, testFile));
});
