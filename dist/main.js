(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: CoreBase, ServiceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/core.js */ "./src/core.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoreBase", function() { return _src_core_js__WEBPACK_IMPORTED_MODULE_0__["CoreBase"]; });

/* harmony import */ var _src_service_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/service-provider.js */ "./src/service-provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServiceProvider", function() { return _src_service_provider_js__WEBPACK_IMPORTED_MODULE_1__["ServiceProvider"]; });




/***/ }),

/***/ "./node_modules/async-dependency-graph/dist/graph.js":
/*!***********************************************************!*\
  !*** ./node_modules/async-dependency-graph/dist/graph.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var mutex_1 = __webpack_require__(/*! ./mutex */ "./node_modules/async-dependency-graph/dist/mutex.js");
/**
 * Base dependency graph class.
 */


var Graph =
/** @class */
function () {
  function Graph() {
    this.nodes = {};
    this.outgoingEdges = {};
    this.incomingEdges = {};
  }
  /**
   * Add a node to the graph.
   * @param node Node object.
   */


  Graph.prototype.addNode = function (node) {
    if (this.hasNode(node.name)) throw new Error("A node with the name of \"" + node.name + "\" already exists in the graph!");
    this.nodes[node.name] = node;
    this.outgoingEdges[node.name] = [];
    this.incomingEdges[node.name] = [];
  };
  /**
   * Remove a node by name from the graph.
   * @param name Node name.
   */


  Graph.prototype.removeNode = function (name) {
    if (!this.hasNode(name)) throw new Error("A node with the name of \"" + name + "\" does not exist in the graph!");
    delete this.nodes[name];
    delete this.outgoingEdges[name];
    delete this.incomingEdges[name];

    for (var dependent in this.incomingEdges) {
      if (this.incomingEdges[dependent].includes(name)) this.incomingEdges[dependent].splice(dependent.indexOf(name), 1);
    }

    for (var dependency in this.outgoingEdges) {
      if (this.outgoingEdges[dependency].includes(name)) this.outgoingEdges[dependency].splice(dependency.indexOf(name), 1);
    }
  };
  /**
   * Checks to see if the graph contains a Node by name.
   * @param name Node name.
   */


  Graph.prototype.hasNode = function (name) {
    return this.nodes.hasOwnProperty(name);
  };

  Object.defineProperty(Graph.prototype, "size", {
    /**
     * Returns the number of nodes in a graph.
     */
    get: function () {
      return Object.keys(this.nodes).length;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns the Node instance given a node name.
   * @param name Node name.
   */

  Graph.prototype.getNode = function (name) {
    if (this.hasNode(name)) return this.nodes[name];
    throw new Error("Node \"" + name + "\" not found!");
  };
  /**
   *  Adds a node dependence. "from" is dependent on "to"
   *  @param from Node name.
   *  @param to  Node name.
   */


  Graph.prototype.addDependency = function (from, to) {
    if (!this.hasNode(from)) throw new Error("Node does not exist: " + from);
    if (!this.hasNode(to)) throw new Error("Node does not exist: " + to);
    if (from === to) throw new Error("Cannot add self dependency: " + to);

    if (!this.outgoingEdges[from].includes(to)) {
      this.outgoingEdges[from].push(to);
    }

    if (!this.incomingEdges[to].includes(from)) {
      this.incomingEdges[to].push(from);
    }
  };
  /**
   * Removes a node dependence. "from" is no longer dependent on "to".
   * @param from Node name.
   * @param to  Node name.
   * @todo Test this function.
   */


  Graph.prototype.removeDependency = function (from, to) {
    console.warn('removeDependency() has not been tested.');
    if (!this.hasNode(from)) throw new Error("Node does not exist: " + from);
    if (!this.hasNode(to)) throw new Error("Node does not exist: " + to);
    if (from === to) throw new Error("Cannot remove self dependency: " + to);

    if (!this.outgoingEdges[from].includes(to)) {
      this.outgoingEdges[from].splice(this.outgoingEdges[from].indexOf(to), 1);
    }

    if (!this.incomingEdges[to].includes(from)) {
      this.incomingEdges[to].splice(this.incomingEdges[to].indexOf(to), 1);
    }
  };
  /**
   * Get dependency node names for a Node by name. (Required nodes for this node to execute).
   * @param name Node name.
   */


  Graph.prototype.dependenciesOf = function (name) {
    return this.outgoingEdges[name];
  };
  /**
   * Get dependents node names for a Node by name. (Nodes that require this node to complete).
   * @param name Node name.
   */


  Graph.prototype.dependentsOf = function (name) {
    return this.incomingEdges[name];
  };
  /**
   * Breadth first search.
   */


  Graph.prototype.traverse = function () {
    var _this = this; // Clear all complete node mutexes.


    Object.keys(this.nodes).map(function (name) {
      return _this.getNode(name).clearMutex();
    }); // Visiting a node recursively calls visit on each node's dependents.

    var visit = function (node) {
      // First await all dependencies
      return Promise.all(_this.dependenciesOf(node.name).map(function (dependencyName) {
        return _this.nodes[dependencyName].awaitData();
      })).then(function () {
        node.signalDependenciesReady();

        if (_this.dependentsOf(node.name).length > 0) {
          // Then recursively visit all dependents
          return Promise.all(_this.dependentsOf(node.name).map(function (dependentName) {
            return visit(_this.getNode(dependentName));
          }));
        } else {
          // node has no dependents so await data
          return node.awaitData();
        }
      });
    }; // Find nodes with no dependencies


    var rootNodeNames = Object.keys(this.nodes).filter(function (name) {
      return _this.dependenciesOf(name).length === 0;
    });
    if (rootNodeNames.length === 0 && Object.keys(this.nodes).length > 0) return Promise.reject(new Error('The graph is circular. Cannot traverse graph due to no root node.')); // Start recursive traversal from root nodes.

    return Promise.all(rootNodeNames.map(function (name) {
      return visit(_this.nodes[name]);
    }));
  };
  /**
   * Clears the value of a node and the values of dependent nodes
   * @param name Node name.
   */


  Graph.prototype.clearNodeAndDependents = function (name) {
    var _this = this;

    var node = this.getNode(name);

    var visitAndClear = function (node) {
      if (node.hasData()) {
        node.clearData();
        return Promise.all(_this.dependentsOf(node.name).map(function (dependentName) {
          return visitAndClear(_this.getNode(dependentName));
        }));
      } else {
        return Promise.resolve();
      }
    };

    return visitAndClear(node);
  };
  /**
   * Resets the graph by resetting each node in the graph.
   */


  Graph.prototype.reset = function () {
    for (var name in this.nodes) {
      this.nodes[name].reset();
    }
  };
  /**
   * Prints graph nodes and node dependents.
   */


  Graph.prototype.ls = function () {
    for (var name in this.nodes) {
      console.log(name);
      console.log(this.dependentsOf(name));
    }
  };

  return Graph;
}();

exports.Graph = Graph;

var Node =
/** @class */
function () {
  function Node(name, promise) {
    this.locked = false;
    this._name = name;
    this._promise = promise;
  }

  Object.defineProperty(Node.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Await data.
   * @returns A `Promise<T | null>` that resolves when the node's data is ready.
   */

  Node.prototype.awaitData = function () {
    var _this = this;

    if (!this.mutex) {
      this.mutex = new mutex_1.Mutex(function () {
        return _this._data !== undefined;
      });
    }

    return new Promise(function (resolve, reject) {
      _this.mutex.await(function (error) {
        if (error) return reject(error);
        resolve(_this._data);
      });
    });
  };

  Node.prototype.signalDependenciesReady = function () {
    var _this = this;

    if (!this.mutex) {
      this.mutex = new mutex_1.Mutex(function () {
        return _this._data !== undefined;
      });
    }

    if (this._data === undefined) {
      // Only allow to _promise once
      if (this.locked === true) return;
      this.locked = true;

      var promise = this._promise();

      if (promise === undefined) throw new Error("Node \"" + this._name + "\" has undefined promise.");
      promise.then(function (data) {
        _this._data = data;
        _this.locked = false;

        _this.mutex.ready();
      }).catch(function (error) {
        _this._data = null;
        _this.locked = false;

        _this.mutex.ready(error);
      });
    } else {
      // Allow _data to be set externally from promise
      this.mutex.ready();
    }
  };

  Node.prototype.setData = function (data) {
    this._data = data;
    this.signalDependenciesReady();
  };
  /**
   * Resets node. Clears all node data and resets its mutex.
   */


  Node.prototype.reset = function () {
    this.clearData();
    this.clearMutex();
  };

  Node.prototype.clearMutex = function () {
    if (this.hasData()) this.mutex = undefined;
  };

  Node.prototype.hasData = function () {
    return this._data !== undefined;
  };

  Node.prototype.clearData = function () {
    this._data = undefined;
  };

  return Node;
}();

exports.Node = Node;

/***/ }),

/***/ "./node_modules/async-dependency-graph/dist/library.js":
/*!*************************************************************!*\
  !*** ./node_modules/async-dependency-graph/dist/library.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./graph */ "./node_modules/async-dependency-graph/dist/graph.js"));

/***/ }),

/***/ "./node_modules/async-dependency-graph/dist/mutex.js":
/*!***********************************************************!*\
  !*** ./node_modules/async-dependency-graph/dist/mutex.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Mutex =
/** @class */
function () {
  function Mutex(readyTest) {
    this.readyTest = readyTest;
  }

  Mutex.prototype.await = function (callback) {
    if (this.readyTest() === true) {
      callback();
    } else {
      this.waiting = this.waiting || [];
      this.waiting.push(callback);
    }
  }; // called when we know what we are waiting for is ready


  Mutex.prototype.ready = function (error) {
    if (this.waiting) this.waiting.forEach(function (callback) {
      return callback(error);
    });
    delete this.waiting;
  };

  return Mutex;
}();

exports.Mutex = Mutex;

/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && typeof value === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }

  var customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  getKeys(source).forEach(function (key) {
    if (!options.isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    } else {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;
module.exports = deepmerge_1;

/***/ }),

/***/ "./node_modules/get-value/index.js":
/*!*****************************************!*\
  !*** ./node_modules/get-value/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
module.exports = function (obj, prop, a, b, c) {
  if (!isObject(obj) || !prop) {
    return obj;
  }

  prop = toString(prop); // allowing for multiple properties to be passed as
  // a string or array, but much faster (3-4x) than doing
  // `[].slice.call(arguments)`

  if (a) prop += '.' + toString(a);
  if (b) prop += '.' + toString(b);
  if (c) prop += '.' + toString(c);

  if (prop in obj) {
    return obj[prop];
  }

  var segs = prop.split('.');
  var len = segs.length;
  var i = -1;

  while (obj && ++i < len) {
    var key = segs[i];

    while (key[key.length - 1] === '\\') {
      key = key.slice(0, -1) + '.' + segs[++i];
    }

    obj = obj[key];
  }

  return obj;
};

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function toString(val) {
  if (!val) return '';

  if (Array.isArray(val)) {
    return val.join('.');
  }

  return val;
}

/***/ }),

/***/ "./node_modules/has-value/index.js":
/*!*****************************************!*\
  !*** ./node_modules/has-value/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */


var isObject = __webpack_require__(/*! isobject */ "./node_modules/has-value/node_modules/isobject/index.js");

var hasValues = __webpack_require__(/*! has-values */ "./node_modules/has-values/index.js");

var get = __webpack_require__(/*! get-value */ "./node_modules/get-value/index.js");

module.exports = function (obj, prop, noZero) {
  if (isObject(obj)) {
    return hasValues(get(obj, prop), noZero);
  }

  return hasValues(obj, prop);
};

/***/ }),

/***/ "./node_modules/has-value/node_modules/isobject/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/has-value/node_modules/isobject/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};

/***/ }),

/***/ "./node_modules/has-values/index.js":
/*!******************************************!*\
  !*** ./node_modules/has-values/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-values <https://github.com/jonschlinkert/has-values>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


module.exports = function hasValue(o, noZero) {
  if (o === null || o === undefined) {
    return false;
  }

  if (typeof o === 'boolean') {
    return true;
  }

  if (typeof o === 'number') {
    if (o === 0 && noZero === true) {
      return false;
    }

    return true;
  }

  if (o.length !== undefined) {
    return o.length !== 0;
  }

  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
};

/***/ }),

/***/ "./node_modules/is-plain-object/index.js":
/*!***********************************************!*\
  !*** ./node_modules/is-plain-object/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */


var isObject = __webpack_require__(/*! isobject */ "./node_modules/isobject/index.js");

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor, prot;
  if (isObjectObject(o) === false) return false; // If has modified constructor

  ctor = o.constructor;
  if (typeof ctor !== 'function') return false; // If has modified prototype

  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false; // If constructor does not have an Object-specific method

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  } // Most likely a plain Object


  return true;
};

/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "./node_modules/isobject/index.js":
/*!****************************************!*\
  !*** ./node_modules/isobject/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */


module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

/***/ }),

/***/ "./node_modules/omit-deep/index.js":
/*!*****************************************!*\
  !*** ./node_modules/omit-deep/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! is-plain-object */ "./node_modules/is-plain-object/index.js");

var unset = __webpack_require__(/*! unset-value */ "./node_modules/unset-value/index.js");

module.exports = function omitDeep(value, keys) {
  if (typeof value === 'undefined') {
    return {};
  }

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = omitDeep(value[i], keys);
    }

    return value;
  }

  if (!isObject(value)) {
    return value;
  }

  if (typeof keys === 'string') {
    keys = [keys];
  }

  if (!Array.isArray(keys)) {
    return value;
  }

  for (var j = 0; j < keys.length; j++) {
    unset(value, keys[j]);
  }

  for (var key in value) {
    if (value.hasOwnProperty(key)) {
      value[key] = omitDeep(value[key], keys);
    }
  }

  return value;
};

/***/ }),

/***/ "./node_modules/unset-value/index.js":
/*!*******************************************!*\
  !*** ./node_modules/unset-value/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * unset-value <https://github.com/jonschlinkert/unset-value>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */


var isObject = __webpack_require__(/*! isobject */ "./node_modules/isobject/index.js");

var has = __webpack_require__(/*! has-value */ "./node_modules/has-value/index.js");

module.exports = function unset(obj, prop) {
  if (!isObject(obj)) {
    throw new TypeError('expected an object.');
  }

  if (obj.hasOwnProperty(prop)) {
    delete obj[prop];
    return true;
  }

  if (has(obj, prop)) {
    var segs = prop.split('.');
    var last = segs.pop();

    while (segs.length && segs[segs.length - 1].slice(-1) === '\\') {
      last = segs.pop().slice(0, -1) + '.' + last;
    }

    while (segs.length) obj = obj[prop = segs.shift()];

    return delete obj[last];
  }

  return true;
};

/***/ }),

/***/ "./node_modules/useosc-emitter/dist/main.js":
/*!**************************************************!*\
  !*** ./node_modules/useosc-emitter/dist/main.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(global, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./index.js":
      /*!******************!*\
        !*** ./index.js ***!
        \******************/

      /*! exports provided: EventEmitter */

      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "EventEmitter", function () {
          return EventEmitter;
        }); //简单的事件库


        const getEventNames = name => name instanceof Array ? //返回事件数组
        name : String(name).replace(/\s+/g, '').split(',');

        class EventEmitter {
          constructor(name = 'undefined') {
            //事件对象名称
            this.name = name; //事件数组

            this.events = {};
          } //删除事件


          destroy() {
            this.events = {};
          } //监听事件(options.once=>触发一次)


          on(name, callback, options = {}) {
            options = options || {};

            if (typeof callback !== 'function') {
              throw new TypeError('Invalid callback');
            }

            getEventNames(name).forEach(n => {
              if (!this.events[n]) {
                this.events[n] = [];
              }

              this.events[n].push({
                callback,
                options
              });
            });
            return this;
          } //添加一个只触发一次的事件


          once(name, callback) {
            return this.on(name, callback, {
              once: true
            });
          } //删除一个事件监听


          off(name, callback = null, force = false) {
            getEventNames(name).filter(n => !!this.events[n]).forEach(n => {
              if (callback) {
                let i = this.events[n].length;

                while (i--) {
                  const ev = this.events[n][i];
                  const removable = !ev.options.persist || force;

                  if (removable && ev.callback === callback) {
                    this.events[n].split(i, 1);
                  }
                }
              } else {
                this.events[n] = force ? [] : this.events[n].filter(({
                  options
                }) => options.persist === true);
              }
            });
            return this;
          } //触发事件


          emit(name, ...args) {
            getEventNames(name).forEach(n => {
              if (this.events[n]) {
                let i = this.events[n].length;

                while (i--) {
                  const {
                    options,
                    callback
                  } = this.events[n][i];

                  try {
                    callback(...args);
                  } catch (e) {
                    console.warn(e);
                  }

                  if (options && options.once) {
                    this.events[n].split(i, 1);
                  }
                }
              }
            });
            return this;
          }

        }
        /***/

      },

      /***/
      0:
      /*!************************!*\
        !*** multi ./index.js ***!
        \************************/

      /*! no static exports found */

      /***/
      function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
        /*! E:\useosc\useosc-emitter\index.js */
        "./index.js");
        /***/
      }
      /******/

    })
  );
});

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: CoreBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreBase", function() { return CoreBase; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var useosc_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! useosc-emitter */ "./node_modules/useosc-emitter/dist/main.js");
/* harmony import */ var useosc_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(useosc_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var omit_deep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! omit-deep */ "./node_modules/omit-deep/index.js");
/* harmony import */ var omit_deep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(omit_deep__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var async_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! async_hooks */ "async_hooks");
/* harmony import */ var async_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(async_hooks__WEBPACK_IMPORTED_MODULE_4__);





class CoreBase extends useosc_emitter__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"] {
  constructor(defaultConfiguration, configuration, options) {
    super('Core'); // https://github.com/KyleAMathews/deepmerge#webpack-bug

    const merger = deepmerge__WEBPACK_IMPORTED_MODULE_2___default.a.default ? deepmerge__WEBPACK_IMPORTED_MODULE_2___default.a.default : deepmerge__WEBPACK_IMPORTED_MODULE_2___default.a;
    const omitted = omit_deep__WEBPACK_IMPORTED_MODULE_3___default()(defaultConfiguration, options.omit || []);
    this.logger = console;
    this.configuration = merger(omitted, configuration);
    this.options = options;
    this.booted = false;
    this.started = false;
    this.destroyed = false;
    this.providers = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["providerHandler"])(this);
  } //销毁core实例


  destroy() {
    if (this.destroyed) {
      return false;
    }

    this.booted = false;
    this.destroyed = true;
    this.started = false;
    this.providers.destroy();
    super.destroy(); //清除事件监听

    return true;
  } //启动useosc


  boot() {
    if (this.booted) {
      return Promise.resolve(true);
    }

    this.started = false;
    this.destroyed = false;
    this.booted = true;
    return this.providers.init(true).then(() => true);
  } //启动所有的core服务


  start() {
    if (this.started) {
      return Promise.resolve(true);
    }

    this.started = true;
    return this.providers.init(false).then(() => true);
  } //


  config(key, defaultValue) {
    return key ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["resolveTreeByKey"])(this.configuration, key, defaultValue) : Object.assign({}, this.configuration);
  } //注册一个服务提供者


  register(ref, options = {}) {
    this.providers.register(ref, options);
  } //为服务注册新的实例工厂


  instance(name, callback) {
    this.providers.bind(name, false, callback);
  } //为服务注册新的单例实例工厂


  singleton(name, callback) {
    this.providers.bind(name, true, callback);
  }
  /**
   * @param 服务名称
   * @param args 构造参数
   * @return 服务实例
   */


  make(name, ...args) {
    return this.providers.make(name, ...args);
  }
  /**
   * 检测服务是否存在
   * @param name 服务名称
   * @return {Boolean}
   */


  has(name) {
    return this.providers.has(name);
  }

}

/***/ }),

/***/ "./src/service-provider.js":
/*!*********************************!*\
  !*** ./src/service-provider.js ***!
  \*********************************/
/*! exports provided: ServiceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceProvider", function() { return ServiceProvider; });
//服务提供者接口
class ServiceProvider {
  /**
   * @param {Core} core Core类
   */
  constructor(core, options = {}) {
    this.core = core;
    this.options = options;
  }
  /**
   * 服务名称（数组）
   * @return {string[]}
   */


  provides() {
    return [];
  }
  /**
   * 服务依赖的其他服务
   */


  depends() {
    return [];
  } //初始化服务


  async init() {} //启动服务


  start() {} //销毁服务提供者


  destroy() {}

}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: resolveTreeByKey, providerHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveTreeByKey", function() { return resolveTreeByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "providerHandler", function() { return providerHandler; });
/* harmony import */ var async_dependency_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! async-dependency-graph */ "./node_modules/async-dependency-graph/dist/library.js");
/* harmony import */ var async_dependency_graph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(async_dependency_graph__WEBPACK_IMPORTED_MODULE_0__);

const resolveTreeByKey = (tree, key, defaultValue) => {
  let result;

  try {
    result = key.split(/\./g).reduce((result, key) => result[key], Object.assign({}, tree));
  } catch (e) {
    /* noop */
  }

  return typeof result === 'undefined' ? defaultValue : result;
};

const each = (list, method) => Promise.all(list.map(p => {
  try {
    return p.provider[method]();
  } catch (e) {
    return Promise.reject(e);
  }
})).catch(err => console.warn(err));

const providerHandler = core => {
  let instances = {};
  let providers = [];
  let registry = []; //list => providers [{provider: new ref(core, options.args),options}]

  const createGraph = (list, method) => {
    const graph = new async_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["Graph"]();
    const provides = list.map(p => typeof p.provider.provides === 'function' ? p.provider.provides() : []);

    const dependsOnIndex = wants => provides.findIndex(arr => arr.some(a => wants.indexOf(a) !== -1));

    list.forEach((p, i) => {
      graph.addNode(new async_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["Node"](String(i), () => {
        try {
          return Promise.resolve(p.provider[method]());
        } catch (e) {
          return Promise.reject(e);
        }
      }));
    });
    list.forEach((p, i) => {
      const dependsOptions = p.options.depends instanceof Array ? p.options.depends : [];
      const dependsInstance = typeof p.provider.depends === 'function' ? p.provider.depends() : [];
      const depends = [...dependsOptions, ...dependsInstance];

      if (depends.length > 0) {
        const dindex = dependsOnIndex(depends);

        if (dindex !== -1) {
          graph.addDependency(String(i), String(dindex));
        }
      }
    });
    return graph.traverse().catch(e => console.warn(e));
  };

  const handle = list => createGraph(list, 'init').then(() => createGraph(list, 'start'));

  const has = name => registry.findIndex(p => p.name === name) !== -1;

  const destroy = () => {
    each(providers, 'destroy');
    instances = {};
    registry = [];
  };

  const init = before => handle(before ? providers.filter(p => p.options.before) : providers.filter(p => !p.options.before));

  const register = (ref, options) => {
    try {
      providers.push({
        provider: new ref(core, options.args),
        options
      });
    } catch (e) {
      console.error('服务注册失败', e);
    }
  };

  const bind = (name, singleton, callback) => {
    core.logger.info('服务绑定', name);
    registry.push({
      singleton,
      name,

      make(...args) {
        return callback(...args);
      }

    });
  };

  const make = (name, ...args) => {
    const found = registry.find(p => p.name === name);

    if (!found) {
      throw new Error(`服务'${name}'没有找到`);
    }

    if (!found.singleton) {
      return found.make(...args);
    }

    if (!instances[name]) {
      if (found) {
        instances[name] = found.make(...args);
      }
    }

    return instances[name];
  };

  return {
    register,
    init,
    bind,
    has,
    make,
    destroy
  };
};

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\useosc\useosc-common\index.js */"./index.js");


/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("async_hooks");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map