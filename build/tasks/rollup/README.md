Rollup task
===

## What does this do?

Compiles JavaScript files in `src/js/*.js` into corresponding `public/js/*.js` file. This task file is a little more complex because Rollup doesn't support watching for **new** JavaScript files and is only [in the process](https://github.com/rollup/rollupjs.org/issues/69) of documenting an array of entry points.

How this works is `cli.js` is a normal rollup bundler. `init-watch.js` will watch and bundle the glob in config. `watch-for-new.js` is a separate task that will call `init-watch.js` when new Js files are created.

## What files are here

* `cli.js` — Entry point for package.json. Reads in the glob from `config.js` and rolls up each one to `public/js/*.js`.
* `config.js` — Rollup config for both dev and production environments. These are kept in the same file since they largely overlap.
* `init-watch.js` — Read in the glob from `config.js` and send each file path to `onEvent.js`. Rollup will automatically bundle the file when it is first watched.
* `onEvent.js` — Begin watching a file path and listen for various events, reporting them back to the user.
* `watch-for-new.js` — The rollup watcher won't listen for new js files if they are created to set up wsk watcher for handle `add` and `unlink` events.

#### Event files

* `events/index.js` — Makes available the other files in `event/*.js`. These are called from within `onEvent.js` depending on the type of event it is and sometimes more detail, such as whether it's the first time we're bundling a file or not.

#### Helper modules

* `helpers/cleanupOutPath.js` — Formatting to turn full paths to paths relative to project root.
* `helpers/constructOutPath.js` — Formatting to turn an infile path to an outfile path according to the template in `config.js`.

## Usage

In package.json:

```
"build:js": "node build/tasks/rollup/cli.js",
"dev:js": "node build/tasks/rollup/init-watch.js & node build/tasks/rollup/watch-for-new.js"
```
