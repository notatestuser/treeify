node-treeify
============

Converts a JS object into a nice, visible depth-indented tree for console printing. The output 
generated is similar to what you get with running the ```tree``` command on Unixy platforms.

In fact, the ```fs_tree``` example is effectively a clone of ```tree```. Try it out!

This:
```js
var Eukaryotes = {
   'Archaeplastida (Plantae)': {
      'Green plants': 'green algae & land plants',
      'Rhodophyta': 'red algae',
      'Glaucophytes': 'microalgae'
   },
   'Unikonts': {
      'Opisthokonts': {
         'Animals': null,
         'Choanoflagellates': null,
         'Filasterea': null,
         'Ichthyosporea': null,
         'Fungi': 'mushrooms, sac fungi, yeast, molds, etc',
         'Nucleariidae': 'filose amoebae'
      },
      'Amoebozoa': 'amoebae, slime molds, and parasitic protists',
   }
};
```
becomes:
```
├─ Archaeplastida (Plantae)
│  ├─ Green plants: green algae & land plants
│  ├─ Rhodophyta: red algae
│  └─ Glaucophytes: microalgae
└─ Unikonts
   ├─ Opisthokonts
   │  ├─ Animals
   │  ├─ Choanoflagellates
   │  ├─ Filasterea
   │  ├─ Ichthyosporea
   │  ├─ Fungi: mushrooms, sac fungi, yeast, molds, etc
   │  └─ Nucleariidae: filose amoebae
   └─ Amoebozoa: amoebae, slime molds, and parasitic protists
```

See the included ```examples``` folder or test suite for usage scenarios!

Usage
-----

First you'll want to run this command in your project's root folder:
```
$ npm install treeify
```

Then use it in your project:
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

```
$ npm test
```
