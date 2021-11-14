import './global-57908b51.js';
import { g as getCjsExportFromNamespace, c as createCommonjsModule, r as require$$0, a as commonjsRequire, p as process } from './empty-e277e9de.js';

const __dirname = '/home/alinux/Development/Hackathons/technica2021/docs-wallet/node_modules/module-alias';

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
function normalize(path) {
  var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isPathAbsolute).join('/');

  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isPathAbsolute ? '/' : '') + path;
};

// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}


// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
}

var sep = '/';
var delimiter = ':';

function dirname(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}


function extname(path) {
  return splitPath(path)[3];
}
const path = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) { return str.substr(start, len) } :
    function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

const path$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  resolve: resolve,
  normalize: normalize,
  isAbsolute: isAbsolute,
  join: join,
  relative: relative,
  sep: sep,
  delimiter: delimiter,
  dirname: dirname,
  basename: basename,
  extname: extname,
  'default': path
});

const nodePath = getCjsExportFromNamespace(path$1);

var moduleAlias = createCommonjsModule(function (module) {
'use strict';



// Guard against poorly mocked module constructors
var Module = module.constructor.length > 1
  ? module.constructor
  : require$$0;



var modulePaths = [];
var moduleAliases = {};
var moduleAliasNames = [];

var oldNodeModulePaths = Module._nodeModulePaths;
Module._nodeModulePaths = function (from) {
  var paths = oldNodeModulePaths.call(this, from);

  // Only include the module path for top-level modules
  // that were not installed:
  if (from.indexOf('node_modules') === -1) {
    paths = modulePaths.concat(paths);
  }

  return paths
};

var oldResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parentModule, isMain, options) {
  for (var i = moduleAliasNames.length; i-- > 0;) {
    var alias = moduleAliasNames[i];
    if (isPathMatchesAlias(request, alias)) {
      var aliasTarget = moduleAliases[alias];
      // Custom function handler
      if (typeof moduleAliases[alias] === 'function') {
        var fromPath = parentModule.filename;
        aliasTarget = moduleAliases[alias](fromPath, request, alias);
        if (!aliasTarget || typeof aliasTarget !== 'string') {
          throw new Error('[module-alias] Expecting custom handler function to return path.')
        }
      }
      request = nodePath.join(aliasTarget, request.substr(alias.length));
      // Only use the first match
      break
    }
  }

  return oldResolveFilename.call(this, request, parentModule, isMain, options)
};

function isPathMatchesAlias (path, alias) {
  // Matching /^alias(\/|$)/
  if (path.indexOf(alias) === 0) {
    if (path.length === alias.length) return true
    if (path[alias.length] === '/') return true
  }

  return false
}

function addPathHelper (path, targetArray) {
  path = nodePath.normalize(path);
  if (targetArray && targetArray.indexOf(path) === -1) {
    targetArray.unshift(path);
  }
}

function removePathHelper (path, targetArray) {
  if (targetArray) {
    var index = targetArray.indexOf(path);
    if (index !== -1) {
      targetArray.splice(index, 1);
    }
  }
}

function addPath (path) {
  var parent;
  path = nodePath.normalize(path);

  if (modulePaths.indexOf(path) === -1) {
    modulePaths.push(path);
    // Enable the search path for the current top-level module
    var mainModule = getMainModule();
    if (mainModule) {
      addPathHelper(path, mainModule.paths);
    }
    parent = module.parent;

    // Also modify the paths of the module that was used to load the
    // app-module-paths module and all of it's parents
    while (parent && parent !== mainModule) {
      addPathHelper(path, parent.paths);
      parent = parent.parent;
    }
  }
}

function addAliases (aliases) {
  for (var alias in aliases) {
    addAlias(alias, aliases[alias]);
  }
}

function addAlias (alias, target) {
  moduleAliases[alias] = target;
  // Cost of sorting is lower here than during resolution
  moduleAliasNames = Object.keys(moduleAliases);
  moduleAliasNames.sort();
}

/**
 * Reset any changes maded (resets all registered aliases
 * and custom module directories)
 * The function is undocumented and for testing purposes only
 */
function reset () {
  var mainModule = getMainModule();

  // Reset all changes in paths caused by addPath function
  modulePaths.forEach(function (path) {
    if (mainModule) {
      removePathHelper(path, mainModule.paths);
    }

    // Delete from require.cache if the module has been required before.
    // This is required for node >= 11
    Object.getOwnPropertyNames(commonjsRequire.cache).forEach(function (name) {
      if (name.indexOf(path) !== -1) {
        delete commonjsRequire.cache[name];
      }
    });

    var parent = module.parent;
    while (parent && parent !== mainModule) {
      removePathHelper(path, parent.paths);
      parent = parent.parent;
    }
  });

  modulePaths = [];
  moduleAliases = {};
  moduleAliasNames = [];
}

/**
 * Import aliases from package.json
 * @param {object} options
 */
function init (options) {
  if (typeof options === 'string') {
    options = { base: options };
  }

  options = options || {};

  var candidatePackagePaths;
  if (options.base) {
    candidatePackagePaths = [nodePath.resolve(options.base.replace(/\/package\.json$/, ''))];
  } else {
    // There is probably 99% chance that the project root directory in located
    // above the node_modules directory,
    // Or that package.json is in the node process' current working directory (when
    // running a package manager script, e.g. `yarn start` / `npm run start`)
    candidatePackagePaths = [nodePath.join(__dirname, '../..'), process.cwd()];
  }

  var npmPackage;
  var base;
  for (var i in candidatePackagePaths) {
    try {
      base = candidatePackagePaths[i];

      npmPackage = commonjsRequire(nodePath.join(base, 'package.json'));
      break
    } catch (e) {
      // noop
    }
  }

  if (typeof npmPackage !== 'object') {
    var pathString = candidatePackagePaths.join(',\n');
    throw new Error('Unable to find package.json in any of:\n[' + pathString + ']')
  }

  //
  // Import aliases
  //

  var aliases = npmPackage._moduleAliases || {};

  for (var alias in aliases) {
    if (aliases[alias][0] !== '/') {
      aliases[alias] = nodePath.join(base, aliases[alias]);
    }
  }

  addAliases(aliases);

  //
  // Register custom module directories (like node_modules)
  //

  if (npmPackage._moduleDirectories instanceof Array) {
    npmPackage._moduleDirectories.forEach(function (dir) {
      if (dir === 'node_modules') return

      var modulePath = nodePath.join(base, dir);
      addPath(modulePath);
    });
  }
}

function getMainModule () {
  return commonjsRequire.main._simulateRepl ? undefined : commonjsRequire.main
}

module.exports = init;
module.exports.addPath = addPath;
module.exports.addAlias = addAlias;
module.exports.addAliases = addAliases;
module.exports.isPathMatchesAlias = isPathMatchesAlias;
module.exports.reset = reset;
});
var moduleAlias_1 = moduleAlias.addPath;
var moduleAlias_2 = moduleAlias.addAlias;
var moduleAlias_3 = moduleAlias.addAliases;
var moduleAlias_4 = moduleAlias.isPathMatchesAlias;
var moduleAlias_5 = moduleAlias.reset;

moduleAlias();

var register = {

};
