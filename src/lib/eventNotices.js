'use strict';

/* --------------------------------------------
 *
 * Specify what language to display based on the event type
 *
 * These are arrays so we can have the option of more than one notice per event
 * Their color will be determined by the `notifyType` that gets passed to our notify module
 * But you can also do your own coloring for some of these events where we want to tell the user more about what is going on in the background
 * If you would like to also include the originating service, you can include it in `{{service}}` and that will get replaced
 * For example, `New {{service}} file detected` will be replaced with `New html file detected` for the `html` service and `New static file detected` when run from the static file watcher.
 *
 * --------------------------------------------
 */
var chalk = require('chalk');

module.exports = {
  add: [
    {notifyType: 'change', msg: 'New {{service}} file detected. ' + chalk.gray('Watching file...')}
  ],
  addDir: [
    {notifyType: 'change', msg: 'New {{service}} dir detected. ' + chalk.gray('Watching dir...')}
  ],
  change: [
    {notifyType: 'change', msg: 'File changed...'}
  ],
  unlink: [
    {notifyType: 'remove', msg: 'File removal detected...'}
  ],
  unlinkDir: [
    {notifyType: 'remove', msg: 'Dir removal detected...'}
  ]
};
