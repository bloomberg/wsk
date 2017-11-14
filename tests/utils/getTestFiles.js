'use strict';

/* --------------------------------------------
 *
 * Read in our individual test files from our `*-configs` folders,
 * skipping files that have `skip` in their name, which is useful when writing tests to just focus on the new ones
 *
 * --------------------------------------------
 */
var path = require('path');
var io = require('indian-ocean');
var chalk = require('chalk');

module.exports = function getTestFiles (topic) {
  var skipping = io.readdirFilterSync(path.join('tests', 'configs-' + topic), {include: /skip\.js/})
    .map(d => chalk.gray('Skipping... ') + d);
  console.log('Skipping', skipping.length);
  console.log(skipping.join('\n'));
  return io.readdirFilterSync(path.join('tests', 'configs-' + topic), {include: 'js', exclude: /skip/})
    .map(filePath => {
      return {
        name: path.basename(filePath).replace('.js', ''),
        file: require('../' + path.join('configs-' + topic, filePath))
      };
    });
};
