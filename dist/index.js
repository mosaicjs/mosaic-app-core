(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("promise"), require("mosaic-pathmapper"), require("mosaic-adapters"), require("mosaic-i18n"), require("mosaic-intents"));
	else if(typeof define === 'function' && define.amd)
		define(["promise", "mosaic-pathmapper", "mosaic-adapters", "mosaic-i18n", "mosaic-intents"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("promise"), require("mosaic-pathmapper"), require("mosaic-adapters"), require("mosaic-i18n"), require("mosaic-intents")) : factory(root["promise"], root["mosaic-pathmapper"], root["mosaic-adapters"], root["mosaic-i18n"], root["mosaic-intents"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _libAppRouter = __webpack_require__(10);

	var _libAppRouter2 = _interopRequireDefault(_libAppRouter);

	var _libApplication = __webpack_require__(12);

	var _libApplication2 = _interopRequireDefault(_libApplication);

	var _libAppModule = __webpack_require__(1);

	var _libAppModule2 = _interopRequireDefault(_libAppModule);

	var _libAppNavigation = __webpack_require__(41);

	var _libAppNavigation2 = _interopRequireDefault(_libAppNavigation);

	var _libAppUrlNavigation = __webpack_require__(42);

	var _libAppUrlNavigation2 = _interopRequireDefault(_libAppUrlNavigation);

	exports['default'] = {
	    AppRouter: _libAppRouter2['default'],
	    Application: _libApplication2['default'],
	    AppModule: _libAppModule2['default'],
	    AppNavigation: _libAppNavigation2['default'],
	    AppUrlNavigation: _libAppUrlNavigation2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _promise = __webpack_require__(9);

	var _promise2 = _interopRequireDefault(_promise);

	var AppModule = (function () {
	    function AppModule(options) {
	        _classCallCheck(this, AppModule);

	        this.options = options || {};
	        this.app = this.options.app;
	        var fields = this.options.fields || {};
	        for (var key in fields) {
	            this[key] = fields[key];
	        }
	    }

	    _createClass(AppModule, [{
	        key: 'activate',
	        value: function activate(params) {
	            return _promise2['default'].resolve();
	        }
	    }, {
	        key: 'update',
	        value: function update(params) {
	            return _promise2['default'].resolve();
	        }
	    }, {
	        key: 'deactivate',
	        value: function deactivate(params) {
	            return _promise2['default'].resolve();
	        }
	    }]);

	    return AppModule;
	})();

	exports['default'] = AppModule;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(3)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(6)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _promise = __webpack_require__(9);

	var _promise2 = _interopRequireDefault(_promise);

	var _mosaicPathmapper = __webpack_require__(11);

	/**
	 * This class allows to activate/deactivate/update modules associated with the
	 * specified path masks by changing paths. It could be considered as a simple
	 * "router" transforming paths changes into method calls.
	 * 
	 * <pre>
	 * Example:
	 *     const modules = new AppRouter();
	 *     modules.registerModule('about', {
	 *         activate(params) { console.log('Hello everybody!'); }
	 *     });
	 *     modules.registerModule('about/:member', {
	 *         activate(params) { console.log('Hello ' + params.member + '!'); },
	 *         deactivate(params) { console.log('Goodbye ' + params.member + '!'); },
	 *         update(params, oldParams) {
	 *             console.log('Goodbye ' + oldParams.member + 
	 *             ' and hello ' + params.member + '!');
	 *         }
	 *     });
	 *     modules.registerModule('info/*path', {
	 *         activate(params) {
	 *             console.log('Show content of the &quot;' + params.path + '&quot; file.');
	 *         }
	 *     });
	 *     let promise = Promise.resolve();
	 *     promise.then(function(){
	 *         // Should print 'Hello everybody!' 
	 *         return modules.setPath('about')
	 *     }).then(function(){
	 *         // Should print 'Hello John!' 
	 *         return modules.setPath('about/John');
	 *     }).then(function(){
	 *         // Should print 'Goodbye John and hello Mary!' 
	 *         return modules.setPath('about/Mary');
	 *     }).then(function(){
	 *         // Should print:
	 *         // - 'Goodbye Mary!' 
	 *         // - 'Show content of the &quot;path/to/my/file.txt&quot; file.'
	 *         return modules.setPath('info/path/to/my/file.txt');
	 *     });
	 * </pre>
	 */

	var AppRouter = (function () {
	    function AppRouter() {
	        _classCallCheck(this, AppRouter);

	        this._modules = new _mosaicPathmapper.PathMapper();
	    }

	    // -----------------------------------------------------------------------
	    // Modules registration

	    /**
	     * Adds a new module (a AppModule class instance) to activate when the
	     * specified path mask is changed.
	     */

	    _createClass(AppRouter, [{
	        key: 'registerModule',
	        value: function registerModule(pathMask, module) {
	            this._modules.add(pathMask, module);
	            return this;
	        }

	        /**
	         * Registers multiple modules at once.
	         */
	    }, {
	        key: 'registerModules',
	        value: function registerModules(moduleMapping) {
	            for (var pathMask in moduleMapping) {
	                var _module2 = moduleMapping[pathMask];
	                this.registerModule(pathMask, _module2);
	            }
	            return this;
	        }

	        // -----------------------------------------------------------------------
	        // Module path

	    }, {
	        key: 'setPath',
	        value: function setPath(path) {
	            path = path || '';
	            var slot = this._modules.find(path) || {
	                obj: undefined,
	                params: {}
	            };
	            if (slot) {
	                slot.path = path;
	            }
	            return this._updateActiveSlot(slot);
	        }

	        // -----------------------------------------------------------------------
	        // Currently active module and its parameters

	        /** Returns the currently active module. */
	    }, {
	        key: '_updateActiveSlot',

	        // -----------------------------------------------------------------------
	        // Internal methods

	        /**
	         * This method activates/deactivates/updates application modules and returns
	         * a promise with the result of the method executions.
	         * Activation/de-activation/update methods are called in chain. It is called
	         * when this router changes the path.
	         */
	        value: function _updateActiveSlot(newSlot) {
	            var prevModule = this._activeSlot ? this._activeSlot.obj : null;
	            var prevParams = this._activeSlot ? this._activeSlot.params : null;
	            this._activeSlot = newSlot;
	            var module = this._activeSlot ? this._activeSlot.obj : null;
	            var params = this._activeSlot ? this._activeSlot.params : null;
	            var promise = _promise2['default'].resolve();
	            if (prevModule === module) {
	                if (module && typeof module.update === 'function') {
	                    promise = promise.then(function () {
	                        return module.update(params, prevParams);
	                    });
	                }
	            } else {
	                if (prevModule && typeof prevModule.deactivate === 'function') {
	                    promise = promise.then(function () {
	                        return prevModule.deactivate(prevParams);
	                    });
	                }
	                if (module && typeof module.activate === 'function') {
	                    promise = promise.then(function () {
	                        return module.activate(params);
	                    });
	                }
	            }
	            return promise;
	        }
	    }, {
	        key: 'path',
	        get: function get() {
	            return this._activeSlot ? this._activeSlot.path : null;
	        },
	        set: function set(path) {
	            return this.setPath(path);
	        }
	    }, {
	        key: 'module',
	        get: function get() {
	            return this._activeSlot ? this._activeSlot.obj : null;
	        },
	        set: function set(m) {
	            throw new Error('Modules can not be changed directly. ' + 'Use the setPath(path) method instead.');
	        }

	        /** Returns parameters of the currently active module. */
	    }, {
	        key: 'moduleParams',
	        get: function get() {
	            return this._activeSlot ? this._activeSlot.params : {};
	        },
	        set: function set(m) {
	            throw new Error('Module parameters can not be changed directly. ' + 'Use the setPath(path) method instead. ' + 'Module parameters are extracted from the specified path.');
	        }
	    }]);

	    return AppRouter;
	})();

	exports['default'] = AppRouter;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(13)['default'];

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _toConsumableArray = __webpack_require__(19)['default'];

	var _Object$keys = __webpack_require__(36)['default'];

	var _Object$defineProperty = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _promise = __webpack_require__(9);

	var _promise2 = _interopRequireDefault(_promise);

	var _mosaicAdapters = __webpack_require__(38);

	var _mosaicPathmapper = __webpack_require__(11);

	var _mosaicI18n = __webpack_require__(39);

	var _mosaicIntents = __webpack_require__(40);

	var _AppRouter = __webpack_require__(10);

	/**
	 * The main super-class for applications. The internal state of this application
	 * is managed using the "setState" method which changes values. Users can define
	 * their own state fields. The application notify about state changes by firing
	 * the 'state' intent.
	 * <p>
	 * There are the following important fields defined internally:
	 * </p>
	 * <ol>
	 * <li> "path" - it reflects the current active path of the application; path
	 * changes lead to activation/de-activation/update of modules registered with
	 * the "registerModule" method.</li>
	 * <li>"locale" defines application internationalization (i18n); it defines the
	 * current application locale and changes all messages provided by the
	 * "getMessages" method</li>
	 * </ol>
	 */

	var _AppRouter2 = _interopRequireDefault(_AppRouter);

	var Application = (function () {
	    function Application(options) {
	        _classCallCheck(this, Application);

	        (0, _mosaicIntents.Intents)(this);
	        this.options = options || {};
	        this.adapters = new _mosaicAdapters.AdapterManager();
	        this.modules = new _AppRouter2['default']();
	        this.i18n = new _mosaicI18n.I18N();
	        this.initI18N();

	        // Internal application state initialization
	        this._state = {};
	        this._initStateFields();
	    }

	    // -----------------------------------------------------------------------
	    // Starts/stops application.
	    // These methods should be overloaded in subclasses

	    _createClass(Application, [{
	        key: 'start',
	        value: function start() {
	            return _promise2['default'].resolve();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            return _promise2['default'].resolve();
	        }

	        // -----------------------------------------------------------------------
	        // Overload the parent method to wrap the call in an intent.
	    }, {
	        key: '_updateActiveSlot',
	        value: function _updateActiveSlot(newSlot) {
	            var _this = this;

	            return this.action('module', function () {
	                var promise = _get(Object.getPrototypeOf(Application.prototype), '_updateActiveSlot', _this).call(_this, newSlot);
	                return promise;
	            });
	        }

	        // -----------------------------------------------------------------------

	    }, {
	        key: 'registerModule',
	        value: function registerModule(pathMask, module) {
	            this.modules.registerModule(pathMask, module);
	        }

	        // -----------------------------------------------------------------------
	        // Internal state management

	        /**
	         * Returns the current application state.
	         */
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return this.state;
	        }
	    }, {
	        key: 'setState',

	        /**
	         * Updates the internal state of the application.
	         */
	        value: function setState(state) {
	            var that = this;
	            if (!that._setState) {
	                that._setState = _mosaicIntents.Singleton.singletonAction(that, 'state', function (intent) {
	                    return _promise2['default'].resolve().then(function () {
	                        for (var type in intent.params) {
	                            that._state[type] = intent.params[type];
	                        }
	                        return that.modules.setPath(that._state.path).then(function () {
	                            return that._state;
	                        });
	                    });
	                });
	            }
	            return that._setState(state);
	        }

	        /**
	         * This method defines active fields (path, mode, locale, theme etc) and
	         * dependencies between them.
	         */
	    }, {
	        key: '_initStateFields',
	        value: function _initStateFields() {
	            var index = {};
	            var stateFields = this.options.stateFields || [];
	            ['path', 'locale'].concat(_toConsumableArray(stateFields)).forEach(function (key) {
	                index[key] = true;
	            });
	            this._setStateFields(_Object$keys(index));
	        }

	        /**
	         * Adds multiple active fields.
	         * 
	         * @param keys
	         *            an array of active field names
	         */
	    }, {
	        key: '_setStateFields',
	        value: function _setStateFields(keys) {
	            if (!Array.isArray(keys)) {
	                keys = arguments;
	            }
	            for (var i = 0, len = keys.length; i < len; i++) {
	                this._addStateField(keys[i]);
	            }
	        }

	        /**
	         * Adds a new active field. Changes of active fields leads to updates in
	         * hierarchy of dependent modules.
	         */
	    }, {
	        key: '_addStateField',
	        value: function _addStateField(key) {
	            var that = this;
	            _Object$defineProperty(that, key, {
	                enumerable: false,
	                configurable: false,
	                get: function get() {
	                    return that._state[key];
	                },
	                set: function set(value) {
	                    var state = {};
	                    state[key] = value;
	                    return that.setState(state);
	                }
	            });
	        }

	        // -----------------------------------------------------------------------

	    }, {
	        key: 'initI18N',
	        value: function initI18N() {
	            var i18n = this.options.i18n || {};
	            for (var locale in i18n) {
	                var batches = i18n[locale] || {};
	                for (var batchKey in batches) {
	                    var batch = batches[batchKey];
	                    this.i18n.registerTranslations(locale, batchKey, batch);
	                }
	            }
	        }

	        /**
	         * Returns internationalized messages for the specified bundle.
	         */
	    }, {
	        key: 'getMessages',
	        value: function getMessages(bundleKey, bundle) {
	            var locale = this.getState().locale;
	            return this.i18n.getMessages(locale, bundleKey, bundle);
	        }
	    }, {
	        key: 'state',
	        get: function get() {
	            return copy(this._state);
	        }
	    }]);

	    return Application;
	})();

	exports['default'] = Application;

	_mosaicIntents.Intents.addTo(Application);

	function copy(obj) {
	    return JSON.parse(JSON.stringify(obj));
	}
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(14)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	__webpack_require__(16);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , $def     = __webpack_require__(17)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(18).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(5)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(20)["default"];

	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return _Array$from(arr);
	  }
	};

	exports.__esModule = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	__webpack_require__(32);
	module.exports = __webpack_require__(5).core.Array.from;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(5).set
	  , $at   = __webpack_require__(23)(true)
	  , ITER  = __webpack_require__(24).safe('iter')
	  , $iter = __webpack_require__(25)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(30)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(5);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(5).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(5)
	  , cof               = __webpack_require__(26)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(29)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(27)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(28)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , TAG      = __webpack_require__(27)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5).g
	  , store  = __webpack_require__(28)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(24).safe('Symbol.' + name));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(17)
	  , $redef          = __webpack_require__(31)
	  , $               = __webpack_require__(5)
	  , cof             = __webpack_require__(26)
	  , $iter           = __webpack_require__(25)
	  , SYMBOL_ITERATOR = __webpack_require__(27)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).hide;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(5)
	  , ctx   = __webpack_require__(33)
	  , $def  = __webpack_require__(17)
	  , $iter = __webpack_require__(25)
	  , call  = __webpack_require__(34);
	$def($def.S + $def.F * !__webpack_require__(35)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(29).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(29).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(27)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	module.exports = __webpack_require__(5).core.Object.keys;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _promise = __webpack_require__(9);

	var _promise2 = _interopRequireDefault(_promise);

	var _mosaicPathmapper = __webpack_require__(11);

	var _mosaicIntents = __webpack_require__(40);

	var _AppRouter = __webpack_require__(10);

	/**
	 * Navigation is responsible for transforming URLs to the internal application
	 * state.
	 */

	var _AppRouter2 = _interopRequireDefault(_AppRouter);

	var AppNavigation = (function () {

	    /**
	     * @param options.app
	     *            the application
	     * @param options.locationOptions
	     *            location bar options
	     */

	    function AppNavigation(options) {
	        _classCallCheck(this, AppNavigation);

	        var that = this;
	        that.options = options || {};
	        that.app = that.options.app;
	        that._router = new _AppRouter2['default']();
	    }

	    /** Provides access to the current URL */

	    _createClass(AppNavigation, [{
	        key: 'setUrl',
	        value: function setUrl(url, force) {
	            if (this._router.path !== url || force) {
	                return this._router.setPath(url).then(function () {
	                    return url;
	                });
	            } else {
	                return _promise2['default'].resolve(url);
	            }
	        }
	    }, {
	        key: 'addUrlMask',
	        value: function addUrlMask(urlMask) {
	            var that = this;
	            that._router.registerModule(urlMask, {
	                urlMask: urlMask,
	                _setState: function _setState(params) {
	                    return that.app.setState(params);
	                },
	                activate: function activate(params) {
	                    return this._setState(params);
	                },
	                update: function update(params) {
	                    return this._setState(params);
	                }
	            });
	        }
	    }, {
	        key: 'url',
	        get: function get() {
	            var module = this._router.module;
	            var url = undefined;
	            if (module) {
	                var urlMask = module.urlMask;
	                var params = this.app.state;
	                params.path = this.app.path;
	                url = _mosaicPathmapper.PathFormatter.formatPath(urlMask, params);
	            }
	            return url;
	        },
	        set: function set(url) {
	            return this.setUrl(url);
	        }
	    }]);

	    return AppNavigation;
	})();

	exports['default'] = AppNavigation;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(13)['default'];

	var _inherits = __webpack_require__(43)['default'];

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _promise = __webpack_require__(9);

	var _promise2 = _interopRequireDefault(_promise);

	var _locationBar = __webpack_require__(46);

	var _locationBar2 = _interopRequireDefault(_locationBar);

	var _AppNavigation2 = __webpack_require__(41);

	var _AppNavigation3 = _interopRequireDefault(_AppNavigation2);

	var AppUrlNavigation = (function (_AppNavigation) {
	    _inherits(AppUrlNavigation, _AppNavigation);

	    function AppUrlNavigation(options) {
	        _classCallCheck(this, AppUrlNavigation);

	        _get(Object.getPrototypeOf(AppUrlNavigation.prototype), 'constructor', this).call(this, options);
	        this._locationBar = new _locationBar2['default']();
	        this._locationBar.onChange((function (path) {
	            this.setUrl(path, true);
	        }).bind(this));
	        this._onAppStateUpdate = this._onAppStateUpdate.bind(this);
	        if (this.options.urlMask) {
	            this.addUrlMask(this.options.urlMask);
	        }
	    }

	    _createClass(AppUrlNavigation, [{
	        key: 'start',
	        value: function start() {
	            var that = this;
	            return _promise2['default'].resolve().then(function () {
	                that.app.on('state', that._onAppStateUpdate);
	                return that.app.start();
	            }).then(function () {
	                that._locationBar.start(that.locationOptions);
	            });
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            var that = this;
	            return _promise2['default'].resolve().then(function () {
	                that.app.removeListener('state', this._onAppStateUpdate);
	                return that.app.stop();
	            });
	        }
	    }, {
	        key: '_onAppStateUpdate',
	        value: function _onAppStateUpdate(intent) {
	            var that = this;
	            intent.then(function () {
	                that._locationBar.update(that.url, {
	                    trigger: false
	                });
	            });
	        }
	    }, {
	        key: 'locationOptions',
	        get: function get() {
	            return this.options.locationOptions || {
	                // pushState: true,
	                hashChange: true,
	                root: "/"
	            };
	        }
	    }]);

	    return AppUrlNavigation;
	})(_AppNavigation3['default']);

	exports['default'] = AppUrlNavigation;
	module.exports = exports['default'];
	// replace : true

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(44)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// LocationBar module extracted from Backbone.js 1.1.0
	//
	// the dependency on backbone, underscore and jquery have been removed to turn
	// this into a small standalone library for handling browser's history API
	// cross browser and with a fallback to hashchange events or polling.

	(function(define) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  // 3 helper functions we use to avoid pulling in entire _ and $
	  var _ = {};
	  _.extend = function extend(obj, source) {
	    for (var prop in source) {
	      obj[prop] = source[prop];
	    }
	    return obj;
	  }
	  _.any = function any(arr, fn) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	      if (fn(arr[i])) {
	        return true;
	      }
	    }
	    return false;
	  }
	  
	  function on(obj, type, fn) {
	    if (obj.attachEvent) {
	      obj['e'+type+fn] = fn;
	      obj[type+fn] = function(){ obj['e'+type+fn]( window.event ); };
	      obj.attachEvent( 'on'+type, obj[type+fn] );
	    } else {
	      obj.addEventListener( type, fn, false );
	    }
	  }
	  function off(obj, type, fn) {
	    if (obj.detachEvent) {
	      obj.detachEvent('on'+type, obj[type+fn]);
	      obj[type+fn] = null;
	    } else {
	      obj.removeEventListener(type, fn, false);
	    }
	  }





	  // this is mostly original code with minor modifications
	  // to avoid dependency on 3rd party libraries
	  //
	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = function() {
	    this.handlers = [];

	    // MODIFICATION OF ORIGINAL BACKBONE.HISTORY
	    //
	    // _.bindAll(this, 'checkUrl');
	    //
	    var self = this;
	    var checkUrl = this.checkUrl;
	    this.checkUrl = function () {
	      checkUrl.apply(self, arguments);
	    };

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for detecting MSIE.
	  var isExplorer = /msie [\w.]+/;

	  // Cached regex for removing a trailing slash.
	  var trailingSlash = /\/$/;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the cross-browser normalized URL fragment, either from the URL,
	    // the hash, or the override.
	    getFragment: function(fragment, forcePushState) {
	      if (fragment == null) {
	        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
	          fragment = decodeURI(this.location.pathname + this.location.search);
	          var root = this.root.replace(trailingSlash, '');
	          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error("LocationBar has already been started");
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
	      var fragment          = this.getFragment();
	      var docMode           = document.documentMode;
	      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      if (oldIE && this._wantsHashChange) {
	        // MODIFICATION OF ORIGINAL BACKBONE.HISTORY
	        //
	        // var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
	        // this.iframe = frame.hide().appendTo('body')[0].contentWindow;
	        //
	        this.iframe = document.createElement("iframe");
	        this.iframe.setAttribute("src", "javascript:0");
	        this.iframe.setAttribute("tabindex", -1);
	        this.iframe.style.display = "none";
	        document.body.appendChild(this.iframe);
	        this.iframe = this.iframe.contentWindow;
	        this.navigate(fragment);
	      }

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._hasPushState) {
	        on(window, 'popstate', this.checkUrl);
	      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
	        on(window, 'hashchange', this.checkUrl);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      // Determine if we need to change the base url, for a pushState link
	      // opened by a non-pushState browser.
	      this.fragment = fragment;
	      var loc = this.location;

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          this.fragment = this.getFragment(null, true);
	          this.location.replace(this.root + '#' + this.fragment);
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot() && loc.hash) {
	          this.fragment = this.getHash().replace(routeStripper, '');
	          this.history.replaceState({}, document.title, this.root + this.fragment);
	        }

	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      off(window, 'popstate', this.checkUrl);
	      off(window, 'hashchange', this.checkUrl);
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function() {
	      var current = this.getFragment();
	      if (current === this.fragment && this.iframe) {
	        current = this.getFragment(this.getHash(this.iframe));
	      }
	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.any(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      var url = this.root + (fragment = this.getFragment(fragment || ''));

	      // Strip the hash for matching.
	      fragment = fragment.replace(pathStripper, '');

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // Don't include a trailing slash on the root.
	      if (fragment === '' && url !== '/') url = url.slice(0, -1);

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._hasPushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if(!options.replace) this.iframe.document.open().close();
	          this._updateHash(this.iframe.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });



	  // add some features to History

	  // a more intuitive alias for navigate
	  History.prototype.update = function () {
	    this.navigate.apply(this, arguments);
	  };

	  // a generic callback for any changes
	  History.prototype.onChange = function (callback) {
	    this.route(/^(.*?)$/, callback);
	  };

	  // checks if the browser has pushstate support
	  History.prototype.hasPushState = function () {
	    if (!History.started) {
	      throw new Error("only available after LocationBar.start()");
	    }
	    return this._hasPushState;
	  };






	  // export
	  return History;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(47));

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ])
});
;