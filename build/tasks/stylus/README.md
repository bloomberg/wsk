Stylus task
===

## What does this do?

Compiles Stylus files in `src/css/*.styl` into corresponding `public/css/*.css` file.

## What files are here

* `cli.js` — Entry point for package.json. Reads in the glob from `config.js` and hands off each path to `onEvent.js`. Also takes some command-line options to compress or write sourcemaps.
* `config.js` — Config settings including plugins.
* `onEvent.js` — Process a file path and render it from Stylus to CSS.
* `watch.js` — Configuration for which files to watch. Files are specified in config. This task has two watch commands, one for top-level files and one for modules. Modules rebuild all files by globbing for `src/css/*.styl` on change. This is faster than deferring to `npm run build:css-dev` or calling the node cli file.

#### Helper modules

* `helpers/prettyPrintError.js` — Better error printing.
* `helpers/getTopLevelFiles.js` — A glob on the watch config path, used on css module file events.

## Usage

In package.json:

```
"build:css": "node build/tasks/stylus/cli.js --sourcemap false --compress true",
"dev:css": "node build/tasks/stylus/watch.js"
```
