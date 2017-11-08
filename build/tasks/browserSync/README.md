BrowserSync task
===

## What does this do?

Runs a BrowserSync server that live reloads the page on change.

## What files are here

* `cli.js` — Entry point for package.json. This loads our config and sets up notifications for different events.
* `config.js` — BrowserSync configuration
* `manualReloadEvents.js` — More configuration. BrowserSync doesn't trigger a reload on certain events that we want a reload for. These are a list of them.

## Usage

In package.json:

```
"dev:server": "node build/tasks/browserSync/cli.js"
```
