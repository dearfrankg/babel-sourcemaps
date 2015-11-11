
## Issue

After building with `webpack` the lib directory gets populated
with es5 and source-maps.

Now I would like to debug with source-maps.

After `node-debug --debug-brk lib/app.js` I can load the app in the browser
but the sourcemaps never get referenced.  Even after passing the line with:

`require("source-map-support").install();`


