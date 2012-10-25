//     treeify.js
//     Luke Plaster <notatestuser@gmail.com>
//     https://github.com/notatestuser/treeify.js

(function() {
  
  // namespacing
  var Treeify;
  if (typeof exports !== 'undefined') {
    Treeify = exports;
  } else {
    Treeify = this.Treeify = {};
  }

  function makePrefix(key, last) {
    var str = (last ? '└' : '├');
    if (key) {
      str += '─ ';
    } else {
      str += '──┐';
    }
    return str;
  }

  function growBranch(key, root, last, lastStates, showValues, callback) {
    var line = '', index = 0, lastKey, circular, lastStatesCopy = lastStates.slice(0);

    if (lastStatesCopy.push([ root, last ]) && lastStates.length > 0) {
      // based on the "was last element" states of whatever we're nested within,
      // we need to append either blankness or a branch to our line
      lastStates.forEach(function(lastState, idx) {
        if (idx > 0) {
          line += (lastState[1] ? ' ' : '│') + '  ';
        }
        if ( ! circular && lastState[0] === root) {
          circular = true;
        }
      });

      // the prefix varies based on whether the key contains something to show and 
      // whether we're dealing with the last element in this collection
      line += makePrefix(key, last) + key;

      // append values and the circular reference indicator
      showValues && typeof root !== 'object' && (line += ': ' + root);
      circular && (line += ' (circular ref.)');
      
      callback(line);
    }

    // can we descend into the next item?
    if ( ! circular && typeof root === 'object') {
      for (var branch in root) {
        // always exclude anything in the object's prototype
        if ( ! root.hasOwnProperty(branch)) {
          continue;
        }
        // hold your breath for recursive action
        lastKey = ++index === Object.keys(root).length;
        growBranch(branch, root[branch], lastKey, lastStatesCopy, showValues, callback);
      }
    }
  };

  // Treeify.asLines
  // --------------------
  // Outputs the tree line-by-line, calling the lineCallback when each one is available.

  Treeify.asLines = function(obj, showValues, lineCallback) {
    growBranch('.', obj, false, [], showValues, lineCallback);
  };

  // Treeify.asTree
  // --------------------
  // Outputs the entire tree, returning it as a string with line breaks.

  Treeify.asTree = function(obj, showValues) {
    var tree = '';
    growBranch('.', obj, false, [], showValues, function(line) {
      tree += line + '\n';
    });
    return tree;
  };

})();
