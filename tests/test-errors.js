import test from 'ava';
// import sinon from 'sinon';
var getTestFiles = require('./utils/getTestFiles');
var testEach = require('./utils/testEach');

/* --------------------------------------------
 * Load all modules in corresponding config directory for this topic
 */
var topic = 'errors';
var testFiles = getTestFiles(topic);

function on (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err, null, which, counters[which]++);
    } else {
      cb(null, notification, which, counters[which]++);
    }
  };
}

// test.beforeEach(t => {
//   sinon.spy(console, 'log');
// });

// test.afterEach(t => {
//   console.log.restore();
// });

testFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(on, testFile));
});
