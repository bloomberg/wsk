'use strict';

/* --------------------------------------------
 *
 * Bundle all of our top-level js files
 *
 * --------------------------------------------
 */
var fs = require('fs');
var io = require('indian-ocean');
var chalk = require('chalk');
var rollup = require('rollup');
var glob = require('glob');

var gracefulUnlink = require('../../utils/gracefulUnlink.js');
var formatBytes = require('../../utils/format-bytes.js');
var clock = require('../../utils/clock');
var formatTime = require('../../utils/format-time.js');
var constructOutPath = require('./helpers/constructOutPath');
var notify = require('wsk').notify;
var CONFIG = require('./config.js')({production: true});

var start = clock();

glob(CONFIG.filesToBundle, {
  ignore: CONFIG.ignored
}, function (err, files) {
  if (err) {
    notify({
      message: 'Error reading Stylus glob.',
      value: CONFIG.in.input,
      display: 'error',
      error: err
    });
  } else {
    files.forEach(function (file) {
      var inConfig = io.extend({}, CONFIG.in, {input: file});
      var outPath = constructOutPath(file, CONFIG);
      rollup.rollup(inConfig).then(function (bundle) {
        var outConfig = io.extend({}, CONFIG.out, {file: outPath});
        bundle.write(outConfig).then(function () {
          var outMap = outPath + '.map';
          gracefulUnlink(outMap, function (err) {
            if (err) {
              notify({
                message: 'Error removing file...',
                value: outMap,
                display: 'error',
                error: err
              });
            }
          });
          var stats = fs.statSync(outPath);
          var fileSizeInUnits = formatBytes(stats['size']);
          var duration = formatTime(clock(start));
          notify({
            message: 'Minified and compiled JS to',
            value: outPath + ' ' + chalk.reset('(' + fileSizeInUnits + ', ' + duration + ')'),
            display: 'compile'
          });
        })
          .catch(function (err) {
            notify({
              message: 'Error rolling up JS...',
              value: outPath,
              display: 'error',
              error: err
            });
          });
      }).catch(function (err) {
        fs.writeFile(outPath, 'console.error("' + err + '")', function (err1) {
          if (err1) {
            notify({
              message: 'Error writing file',
              value: outPath,
              display: 'error',
              error: err1
            });
          } else {
            notify({
              message: 'Error rolling up JS...',
              value: outPath,
              display: 'error',
              error: err
            });
          }
        });
      });
    });
  }
});
