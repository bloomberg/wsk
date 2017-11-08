'use strict';

var fs = require('fs');
var path = require('path');
var stylus = require('stylus');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var io = require('indian-ocean');
var notify = require('wsk').notify;
var formatBytes = require('../../utils/format-bytes.js');
var prettyPrintError = require('./helpers/prettyPrintError.js');
var clock = require('../../utils/clock');
var formatTime = require('../../utils/format-time.js');

module.exports = {onEvent: onEvent};

function onEvent (eventType, filePath, opts) {
  // Load our config opts unless we're already being passed a full set, you could load the CONFIG at the top of this script but this optimizes it so it doesn't load the module if it doesn't need to
  var CONFIG;
  if (!opts || !opts.use) {
    CONFIG = require('./config.js');
    io.extend(CONFIG, opts);
  } else {
    CONFIG = opts;
  }

  var start = clock();

  fs.readFile(filePath, 'utf-8', function (err, str) {
    if (err) {
      notify({
        message: 'Error reading Stylus file.',
        value: filePath,
        display: 'error',
        err: err
      });
      return false;
    }
    var options = {
      filename: path.basename(filePath),
      use: CONFIG.use,
      paths: CONFIG.searchPaths,
      sourcemap: CONFIG.sourcemap,
      compress: CONFIG.compress
    };

    var inFileName = path.basename(filePath);
    var outFilePath = CONFIG.outStem + inFileName.replace(path.extname(inFileName), '.css');
    var style = stylus(str, options);

    // Wrap this in a try bc autoprefixer's postcss dependency likes to throw errors
    try {
      // Render css to stylus
      style.render(function (err, css) {
        if (err) {
          notify({
            message: 'Error compiling CSS...',
            value: filePath,
            display: 'error'
          });
          console.error(err.message);
        } else {
          // Make out directory if it does not exist
          mkdirp.sync(path.dirname(outFilePath));

          // Write file
          fs.writeFile(outFilePath, css, function (err) {
            var prefix = (CONFIG.compress) ? 'Minified and c' : 'C';
            var stats;
            var fileSizeInUnits;
            var duration;
            if (err) {
              notify({
                message: 'Error writing compiled CSS.',
                value: outFilePath,
                display: 'error',
                err: err
              });
            } else {
              stats = fs.statSync(outFilePath);
              fileSizeInUnits = formatBytes(stats['size']);
              duration = formatTime(clock(start));
              notify({
                message: prefix + 'ompiled CSS to',
                value: outFilePath + ' ' + chalk.reset('(' + fileSizeInUnits + ', ' + duration + ')'),
                display: 'compile'
              });
            }
          });

          // Write sourcemap, which shares the same path and filename as our `outFilePath` with `.map` added to the end
          // For example, css is `styles.css`, sourcemap is `styles.css.map`
          // Somewhat sneakily stylus, generates this object on our `style` object above
          var sourceMapPath = outFilePath + '.map';
          if (CONFIG.sourcemap) {
            fs.writeFile(sourceMapPath, JSON.stringify(style.sourcemap), function (err) {
              var duration;
              if (err) {
                notify({
                  message: 'Error writing CSS sourcemap.',
                  value: sourceMapPath,
                  display: 'error',
                  error: err
                });
              } else {
                duration = formatTime(clock(start));
                notify({
                  message: 'Compiled CSS sourcemap to',
                  value: sourceMapPath + ' ' + chalk.reset('(' + duration + ')'),
                  display: 'compile'
                });
              }
            });
          } else {
            if (io.existsSync(sourceMapPath)) {
              fs.unlinkSync(sourceMapPath);
            }
          }
        }
      });
    } catch (err) {
      notify({
        message: 'Error compiling CSS.',
        value: '',
        display: 'error'
      });
      prettyPrintError(err);
    }
  });
}
