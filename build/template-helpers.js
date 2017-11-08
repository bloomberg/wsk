'use strict';

/* --------------------------------------------
 *
 * These functions are for any preprocessing of data values when they are converted into markup
 * The keys in `exports` are available for use in html partials within wsk template tags
 *
 * e.g. `<[= h.formatDate(pubDate) ]>` where `pubDate` is a key in `config.json`
 *
 * --------------------------------------------
 */

// var fs = require('fs');
var io = require('indian-ocean');
var marked = require('marked');
var hljs = require('highlight.js');
var GithubSlugger = require('github-slugger');
var slugger = new GithubSlugger();

var replaceStr = require('./utils/replace-str.js');

/* --------------------------------------------
 * For convenience, add indian ocean
 */
exports.io = io;

/* --------------------------------------------
 * Format hyperlinks from markdown format
 * Replace links in copy text formatted as `[text](url)` as anchor links classed `dvz-t-disable`
 *
 */
exports.formatLinks = function formatLinks (str) {
  return str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (a, b, c) {
    return '<a href="' + c + '" target="_blank" rel="noopener">' + b + '</a>';
  });
};

/* --------------------------------------------
 * Transformations that all body copy should go through when used with `h.import`
 */
exports.prettyCopy = function (input) {
  // Add other transform functions to this list that you want to be applied to body copy
  // The order is important because of the string replacement happening, so be careful
  // var taskFns = [exampleFunction]
  var taskFns = [markdownToHtml];
  // In normal projects you're not transforming markdown to html (which converts formatted links to hyperlinks) so this would normally be something like
  // var taskFns = [formatLinks]

  taskFns.forEach(function (taskFn) {
    input = replaceStr(input, taskFn);
  });
  return input;
};

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  var slug = slugger.slug(text.replace('&#39;', '\'').replace(/<.+?>/g, ''));

  return '<h' + level + ' id="' + slug + '"><a class="anchor-link" href="#' +
                 slug +
                 '">' + Array(parseFloat(level) - 1).fill('#').join('') + '</a> ' +
                  text + '</h' + level + '>';
};

/* --------------------------------------------
 * Adapted from Rich Harris
 * https://github.com/rollup/rollupjs.org/blob/61312d0a3b70fa8c62204a07fca7f0fff4160328/scripts/prep/build-guide.js
 */
function markdownToHtml (content) {
  var highlighted = {};
  var uid = 0;
  content = content
    .replace(/```([\w-]+)?\n([\s\S]+?)```/g, (match, lang, code) => {
      const { value } = hljs.highlight(lang || 'bash', code);
      highlighted[ ++uid ] = value;

      return `@@${uid}`;
    });

  var html = marked(content, {renderer})
    .replace(/<p>(<a [\s\S]+?)<\/p>/g, '$1')
    .replace(/<p>@@(\d+)<\/p>/g, (match, id) => {
      return `<pre><code>${highlighted[ id ]}</code></pre>`;
    });

  return html;
}

function makeTopMatter (html) {
  // This splitting could be better, a regex of (?:(?!<ul>).)* doesn't work great, though
  var parts = html.split('</blockquote>');
  var intro = `${parts[0]}</blockquote>`;
  var toc = parts[1].replace(intro, '');
  return {intro, toc};
};

function splitSections (readme) {
  // Change image paths
  readme = readme.replace(/screenshots\//g, 'img/');
  // Split string into subsections
  var parts = readme
    .split(/^## /m)
    .map((d, i) => i ? '## ' + d : d);
  // Get rid of backticks and remove the top image in the h1
  var header = parts[0].replace(/`/g, '').split('\n').map((d, i) => {
    if (i === 0) {
      return d.split(' ')[0];
    }
    return d;
  }).join('\n');
  var h2Sections = parts
    .slice(1, parts.length)
    .join('');
  return [header, h2Sections];
};

function wrapSections (html) {
  return html.split('<h')
    .map((d, i) => {
      if (d) {
        return `<div class="scroll-section"><h${d}</div>`;
      }
      return '';
    }).join('');
};

exports.compileHtml = function (readme) {
  var sections = splitSections(readme);
  var htmlSections = sections.map(markdownToHtml);
  var topMatter = makeTopMatter(htmlSections[0]);
  var content = wrapSections(htmlSections[1]);
  return {intro: topMatter.intro, toc: topMatter.toc, content};
};

exports.markdownToHtml = markdownToHtml;
