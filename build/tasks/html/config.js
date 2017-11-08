'use strict';

/* --------------------------------------------
 *
 * Configuration for html behavior.
 *
 * Template style
 * Set a different syntax for our templating so that it won't clash with any client-side templating
 * This will replace the `%` with hard brackets
 * Everything else is exactly the same, including the blank, `=` and `-` options for evaluating javascript, interpolating and HTML-escaping, respectively
 *
 * For example:
 * `<% var x = 'hello' %>` becomes `<[ var x = 'hello' ]>`
 * `<%= data.name %>` becomes `<[= data.name ]>`
 * `<%- data.htmlName %>` becomes `<[- data.htmlName ]>`
 */
var glob = require('glob');

module.exports = {
  configFile: 'config.json',
  templateInFiles: glob.sync('src/html/*/index.partial.html'),
  templateRegex: {
    evaluate: /<\[([\s\S]+?)\]>/g,
    interpolate: /<\[=([\s\S]+?)\]>/g,
    escape: /<\[-([\s\S]+?)\]>/g,
    pipe: /<\[~([\s\S]+?)\]>/g
  },
  htmlIgnorePrefix: '_', // Directories beginning with this prefix won't be compiled into HTML folders. Changes to files in them will trigger HTML pages to be rebuilt, however. Use these folders for partials or shareda assets.
  templateHelpersPath: '../../template-helpers.js',
  simpleHtml: false // Include this to compile HTML into subdir.html instead of subdir/index.html
  // collapseWhitespace: argv.c
};
