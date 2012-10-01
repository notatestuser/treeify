node-treeify
============

_treeify_ converts a JS object into a nice, visible depth-indented tree for console printing. The structure 
generated is similar to what you get by running the ```tree``` command on Unixy platforms.

```
{
    oranges: {                                                  
        'mandarin': {                                          ├─ oranges
            clementine: null,                                  │  └─ mandarin
            tangerine: 'so cheap and juicy!'        -=>        │     ├─ clementine
        }                                                      │     └─ tangerine: so cheap and juicy!
    },                                                         └─ apples
    apples: {                                                     ├─ gala
        'gala': null,                                             └─ pink lady
        'pink lady': null
    }
}
```

It also works well with larger nested hierarchies such as file system directory trees.
In fact, the ```fs_tree``` example does a pretty good job of imitating ```tree```. Try it out!

See the other included examples or the test suite for usage scenarios.

Usage
-----

First you'll want to run this command in your project's root folder:
```
$ npm install treeify
```

Then proceed to use it in your project:
```js
var treeify = require('treeify');
console.log(
   treeify.asTree({
      apples: 'gala',      //  ├─ apples: gala
      oranges: 'mandarin'  //  └─ oranges: mandarin
   }, true)
);
```

Running the tests
-----------------

There's a pretty extensive suite of Vows tests included.

```
$ npm test
```
