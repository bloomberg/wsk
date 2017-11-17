import test from 'ava';
var getTestFiles = require('./utils/getTestFiles');
var writeFilesSync = require('./utils/writeFilesSync');
var testEach = require('./utils/testEach');
var unlinkFilesSync = require('./utils/unlinkFilesSync');

/* --------------------------------------------
 * Add
 */
var addTestFiles = getTestFiles('add');

function addOn (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err);
    } else {
      cb(null, notification, which, counters[which]++);
      if (which === 'onInit') {
        writeFilesSync(watchGroups);
      }
    }
  };
}

addTestFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(addOn, testFile));
});

/* --------------------------------------------
 * Change
 */
var changeTestFiles = getTestFiles('change');

function changeOn (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err);
    } else {
      cb(null, notification, which, counters[which]++);
      if (which === 'onInit') {
        writeFilesSync(watchGroups);
      }
    }
  };
}

changeTestFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(changeOn, testFile));
});

/* --------------------------------------------
 * Errors
 */
var errorsTestFiles = getTestFiles('errors');

function errorsOn (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err, null, which, counters[which]++);
    } else {
      cb(null, notification, which, counters[which]++);
    }
  };
}

errorsTestFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(errorsOn, testFile));
});

/* --------------------------------------------
 * Unlink
 */
var unlinkTestFiles = getTestFiles('unlink');

function unlinkOn (which, counters, watchGroups, cb) {
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

unlinkTestFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(unlinkOn, testFile));
});

/* --------------------------------------------
 * Watch
 */
var watchTestFiles = getTestFiles('watch');

function watchOn (which, counters, watchGroups, cb) {
  counters[which] = 0;
  return function (err, notification) {
    if (err) {
      cb(err);
    } else {
      cb(null, notification, which, counters[which]++);
    }
  };
}

watchTestFiles.forEach(function (testFile) {
  test.serial.cb(testFile.name, testEach(watchOn, testFile));
});
