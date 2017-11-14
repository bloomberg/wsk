#!/usr/bin/env node

/* --------------------------------------------
 * Set our exit code to something custom so we can verify this script ran.
 * Set this in a timeout to ensure it finishes second to make our tests better.
 * Not great but it helps verify we're running the file we want.
 *
 */

setTimeout(function () {
  process.exit(100);
}, 500);
