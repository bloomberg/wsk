Statics task
===

## What does this do?

Moves files from `src/` to `public/`, unless they are files that other build tasks are in charge of compiling.

## What files are here

* `cli.js` — Entry point for package.json. This is mostly a constroller for figuring out whether to delete the `public/` folder if it exists. Afterwards, it proceeds to `helpers/copyByGlob.js`
* `config.js` — Files to watch and files to ignore.
* `onEvent.js` — Entry point for watch events. It handles a single single and an event type.
* `watch.js` — Configuration for which files to watch and ignore. These files are loaded via config.

#### Helper modules

* `helpers/copyByGlob.js` — The default "copy all" action that's loaded by `cli.js`. Loads config and sends each path to `onEvent.js`.
* `copy.js` — Copy a file or folder
* `remove.js` — Remove a file or folder
* `toPublic.js` — Rename `src` to `public`.
* `eventsToActions.js` — A lookup of events to copy and removal actions.
* `actionsToFns.js` — A lookup of actions to functions.

## Usage

In package.json:

```
"build:statics": "node build/tasks/statics/cli.js",
"dev:statics": "node build/tasks/statics/watch.js"
```
