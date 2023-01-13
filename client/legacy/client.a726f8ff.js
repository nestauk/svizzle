function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}

var regeneratorRuntime$1 = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof);

(function (module) {
  var _typeof$1 = _typeof.exports["default"];
  function _regeneratorRuntime() {

    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
      return exports;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function value(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(regeneratorRuntime$1);

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1.exports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof$1(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (_typeof$1(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$1(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function noop() {}
function assign(tar, src) {
  // @ts-ignore
  for (var k in src) tar[k] = src[k];
  return tar;
}
function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === 'function';
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof$1(a) === 'object' || typeof a === 'function';
}
var src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement('a');
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}
function subscribe(store) {
  if (store == null) {
    return noop;
  }
  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }
  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}
function get_store_value(store) {
  var value;
  subscribe(store, function (_) {
    return value = _;
  })();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));
    if ($$scope.dirty === undefined) {
      return lets;
    }
    if (_typeof$1(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);
      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    var dirty = [];
    var length = $$scope.ctx.length / 32;
    for (var i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function compute_slots(slots) {
  var result = {};
  for (var key in slots) {
    result[key] = true;
  }
  return result;
}
function null_to_empty(value) {
  return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  // Return first index of value larger than input value in the range [low, high)
  while (low < high) {
    var mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init) return;
  target.hydrate_init = true;
  // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
  var children = target.childNodes;
  // If target is <head>, there may be children without claim_order
  if (target.nodeName === 'HEAD') {
    var myChildren = [];
    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      if (node.claim_order !== undefined) {
        myChildren.push(node);
      }
    }
    children = myChildren;
  }
  /*
  * Reorder claimed children optimally.
  * We can reorder claimed children optimally by finding the longest subsequence of
  * nodes that are already claimed in order and only moving the rest. The longest
  * subsequence of nodes that are claimed in order can be found by
  * computing the longest increasing subsequence of .claim_order values.
  *
  * This algorithm is optimal in generating the least amount of reorder operations
  * possible.
  *
  * Proof:
  * We know that, given a set of reordering operations, the nodes that do not move
  * always form an increasing subsequence, since they do not move among each other
  * meaning that they must be already ordered among each other. Thus, the maximal
  * set of nodes that do not move form a longest increasing subsequence.
  */
  // Compute longest increasing subsequence
  // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
  var m = new Int32Array(children.length + 1);
  // Predecessor indices + 1
  var p = new Int32Array(children.length);
  m[0] = -1;
  var longest = 0;
  for (var _i = 0; _i < children.length; _i++) {
    var current = children[_i].claim_order;
    // Find the largest subsequence length such that it ends in a value less than our current value
    // upper_bound returns first greater value, so we subtract one
    // with fast path for when we are on the current longest subsequence
    var seqLen = (longest > 0 && children[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, function (idx) {
      return children[m[idx]].claim_order;
    }, current)) - 1;
    p[_i] = m[seqLen] + 1;
    var newLen = seqLen + 1;
    // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
    m[newLen] = _i;
    longest = Math.max(newLen, longest);
  }
  // The longest increasing subsequence of nodes (initially reversed)
  var lis = [];
  // The rest of the nodes, nodes that will be moved
  var toMove = [];
  var last = children.length - 1;
  for (var cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children[last]);
  }
  lis.reverse();
  // We sort the nodes being moved to guarantee that their insertion order matches the claim order
  toMove.sort(function (a, b) {
    return a.claim_order - b.claim_order;
  });
  // Finally, we move the nodes
  for (var _i2 = 0, j = 0; _i2 < toMove.length; _i2++) {
    while (j < lis.length && toMove[_i2].claim_order >= lis[j].claim_order) {
      j++;
    }
    var anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[_i2], anchor);
  }
}
function append$1(target, node) {
  target.appendChild(node);
}
function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === undefined || target.actual_end_child !== null && target.actual_end_child.parentNode !== target) {
      target.actual_end_child = target.firstChild;
    }
    // Skip nodes of undefined ordering
    while (target.actual_end_child !== null && target.actual_end_child.claim_order === undefined) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }
    if (node !== target.actual_end_child) {
      // We only insert if the ordering of this node should be modified or the parent node is not target
      if (node.claim_order !== undefined || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}
function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(' ');
}
function empty() {
  return text('');
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}
function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation();
    // @ts-ignore
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function set_svg_attributes(node, attributes) {
  for (var key in attributes) {
    attr(node, key, attributes[key]);
  }
}
function set_custom_element_data_map(node, data_map) {
  Object.keys(data_map).forEach(function (key) {
    set_custom_element_data(node, key, data_map[key]);
  });
}
function set_custom_element_data(node, prop, value) {
  if (prop in node) {
    node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
  } else {
    attr(node, prop, value);
  }
}
function children(element) {
  return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
  if (nodes.claim_info === undefined) {
    nodes.claim_info = {
      last_index: 0,
      total_claimed: 0
    };
  }
}
function claim_node(nodes, predicate, processNode, createNode) {
  var dontUpdateLastIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // Try to find nodes in an order such that we lengthen the longest increasing subsequence
  init_claim_info(nodes);
  var resultNode = function () {
    // We first try to find an element after the previous one
    for (var i = nodes.claim_info.last_index; i < nodes.length; i++) {
      var node = nodes[i];
      if (predicate(node)) {
        var replacement = processNode(node);
        if (replacement === undefined) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    // Otherwise, we try to find one before
    // We iterate in reverse so that we don't go too far back
    for (var _i3 = nodes.claim_info.last_index - 1; _i3 >= 0; _i3--) {
      var _node = nodes[_i3];
      if (predicate(_node)) {
        var _replacement = processNode(_node);
        if (_replacement === undefined) {
          nodes.splice(_i3, 1);
        } else {
          nodes[_i3] = _replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = _i3;
        } else if (_replacement === undefined) {
          // Since we spliced before the last_index, we decrease it
          nodes.claim_info.last_index--;
        }
        return _node;
      }
    }
    // If we can't find any matching node, we create a new one
    return createNode();
  }();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, function (node) {
    return node.nodeName === name;
  }, function (node) {
    var remove = [];
    for (var j = 0; j < node.attributes.length; j++) {
      var attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }
    remove.forEach(function (v) {
      return node.removeAttribute(v);
    });
    return undefined;
  }, function () {
    return create_element(name);
  });
}
function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
  return claim_node(nodes, function (node) {
    return node.nodeType === 3;
  }, function (node) {
    var dataStr = '' + data;
    if (node.data.startsWith(dataStr)) {
      if (node.data.length !== dataStr.length) {
        return node.splitText(dataStr.length);
      }
    } else {
      node.data = dataStr;
    }
  }, function () {
    return text(data);
  }, true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
  );
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? 'important' : '');
  }
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
var crossorigin;
function is_crossorigin() {
  if (crossorigin === undefined) {
    crossorigin = false;
    try {
      if (typeof window !== 'undefined' && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  var computed_style = getComputedStyle(node);
  if (computed_style.position === 'static') {
    node.style.position = 'relative';
  }
  var iframe = element('iframe');
  iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' + 'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.tabIndex = -1;
  var crossorigin = is_crossorigin();
  var unsubscribe;
  if (crossorigin) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
    unsubscribe = listen(window, 'message', function (event) {
      if (event.source === iframe.contentWindow) fn();
    });
  } else {
    iframe.src = 'about:blank';
    iframe.onload = function () {
      unsubscribe = listen(iframe.contentWindow, 'resize', fn);
    };
  }
  append$1(node, iframe);
  return function () {
    if (crossorigin) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$bubbles = _ref.bubbles,
    bubbles = _ref$bubbles === void 0 ? false : _ref$bubbles,
    _ref$cancelable = _ref.cancelable,
    cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable;
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function head_selector(nodeId, head) {
  var result = [];
  var started = 0;
  var _iterator2 = _createForOfIteratorHelper$1(head.childNodes),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var node = _step2.value;
      if (node.nodeType === 8 /* comment node */) {
        var comment = node.textContent.trim();
        if (comment === "HEAD_".concat(nodeId, "_END")) {
          started -= 1;
          result.push(node);
        } else if (comment === "HEAD_".concat(nodeId, "_START")) {
          started += 1;
          result.push(node);
        }
      } else if (started > 0) {
        result.push(node);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return result;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}
/**
 * Schedules a callback to run immediately before the component is updated after any state change.
 *
 * The first time the callback runs will be before the initial `onMount`
 *
 * https://svelte.dev/docs#run-time-svelte-beforeupdate
 */
function beforeUpdate(fn) {
  get_current_component().$$.before_update.push(fn);
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 */
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs#run-time-svelte-ondestroy
 */
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$cancelable = _ref3.cancelable,
      cancelable = _ref3$cancelable === void 0 ? false : _ref3$cancelable;
    var callbacks = component.$$.callbacks[type];
    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail, {
        cancelable: cancelable
      });
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-setcontext
 */
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
  var _this2 = this;
  var callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    // @ts-ignore
    callbacks.slice().forEach(function (fn) {
      return fn.call(_this2, event);
    });
  }
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
var seen_callbacks = new Set();
var flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
  // Do not reenter flush while dirty components are updated, as this can
  // result in an infinite loop. Instead, let the inner flush handle it.
  // Reentrancy is ok afterwards for bindings etc.
  if (flushidx !== 0) {
    return;
  }
  var saved_component = current_component;
  do {
    // first, call beforeUpdate functions
    // and update components
    try {
      while (flushidx < dirty_components.length) {
        var component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      // reset dirty state to not end up in a deadlocked state and then rethrow
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...
    for (var i = 0; i < render_callbacks.length; i += 1) {
      var callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group
  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);
      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  var o = old_blocks.length;
  var n = list.length;
  var i = o;
  var old_indexes = {};
  while (i--) old_indexes[old_blocks[i].key] = i;
  var new_blocks = [];
  var new_lookup = new Map();
  var deltas = new Map();
  i = n;
  while (i--) {
    var child_ctx = get_context(ctx, list, i);
    var key = get_key(child_ctx);
    var block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  var will_move = new Set();
  var did_move = new Set();
  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    var new_block = new_blocks[n - 1];
    var old_block = old_blocks[o - 1];
    var new_key = new_block.key;
    var old_key = old_block.key;
    if (new_block === old_block) {
      // do nothing
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      // remove old block
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    var _old_block = old_blocks[o];
    if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
  }
  while (n) insert(new_blocks[n - 1]);
  return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
  var keys = new Set();
  for (var i = 0; i < list.length; i++) {
    var key = get_key(get_context(ctx, list, i));
    if (keys.has(key)) {
      throw new Error('Cannot have duplicate keys in a keyed each');
    }
    keys.add(key);
  }
}
function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;
  while (i--) {
    var o = levels[i];
    var n = updates[i];
    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }
  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }
  return update;
}
function get_spread_object(spread_props) {
  return _typeof$1(spread_props) === 'object' && spread_props !== null ? spread_props : {};
}

/** regex of all html void element names */
var void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}
function bind$1(component, name, callback) {
  var index = component.$$.props[name];
  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  var _component$$$ = component.$$,
    fragment = _component$$$.fragment,
    after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(function () {
      var new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      // if the component was destroyed immediately
      // it will update the `$$.on_destroy` reference to `null`.
      // the destructured on_destroy may still reference to the old array
      if (component.$$.on_destroy) {
        var _component$$$$on_dest;
        (_component$$$$on_dest = component.$$.on_destroy).push.apply(_component$$$$on_dest, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  var $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init$2(component, options, instance, create_fragment, not_equal, props, append_styles) {
  var dirty = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  var ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  // `false` as a special case of no DOM component
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      var nodes = children(options.target);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }
  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);
  return SvelteComponent;
}();
function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.55.1'
  }, detail), {
    bubbles: true
  }));
}
function append_hydration_dev(target, node) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node
  });
  append_hydration(target, node);
}
function insert_hydration_dev(target, node, anchor) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node,
    anchor: anchor
  });
  insert_hydration(target, node, anchor);
}
function detach_dev(node) {
  dispatch_dev('SvelteDOMRemove', {
    node: node
  });
  detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev('SvelteDOMAddEventListener', {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev('SvelteDOMRemoveEventListener', {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}
function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', {
    node: node,
    attribute: attribute
  });else dispatch_dev('SvelteDOMSetAttribute', {
    node: node,
    attribute: attribute,
    value: value
  });
}
function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev('SvelteDOMSetProperty', {
    node: node,
    property: property,
    value: value
  });
}
function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev('SvelteDOMSetData', {
    node: text,
    data: data
  });
  text.data = data;
}
function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof$1(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';
    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }
    throw new Error(msg);
  }
}
function validate_slots(name, slot, keys) {
  for (var _i4 = 0, _Object$keys = Object.keys(slot); _i4 < _Object$keys.length; _i4++) {
    var slot_key = _Object$keys[_i4];
    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}
function validate_dynamic_element(tag) {
  var is_string = typeof tag === 'string';
  if (tag && !is_string) {
    throw new Error('<svelte:element> expects "this" attribute to be a string.');
  }
}
function validate_void_dynamic_element(tag) {
  if (tag && is_void(tag)) {
    console.warn("<svelte:element this=\"".concat(tag, "\"> is self-closing and cannot have content."));
  }
}
function construct_svelte_component_dev(component, props) {
  var error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
  try {
    var instance = new component(props);
    if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
      throw new Error(error_message);
    }
    return instance;
  } catch (err) {
    var message = err.message;
    if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
      throw new Error(error_message);
    } else {
      throw err;
    }
  }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);
  var _super3 = _createSuper$n(SvelteComponentDev);
  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }
    return _super3.call(this);
  }
  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);
      this.$destroy = function () {
        console.warn('Component was already destroyed'); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);
  return SvelteComponentDev;
}(SvelteComponent);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;
        var _iterator = _createForOfIteratorHelper(subscribers),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var subscriber = _step.value;
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (run_queue) {
          for (var i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return function () {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}
function derived(stores, fn, initial_value) {
  var single = !Array.isArray(stores);
  var stores_array = single ? [stores] : stores;
  var auto = fn.length < 2;
  return readable(initial_value, function (set) {
    var inited = false;
    var values = [];
    var pending = 0;
    var cleanup = noop;
    var sync = function sync() {
      if (pending) {
        return;
      }
      cleanup();
      var result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    var unsubscribers = stores_array.map(function (store, i) {
      return subscribe(store, function (value) {
        values[i] = value;
        pending &= ~(1 << i);
        if (inited) {
          sync();
        }
      }, function () {
        pending |= 1 << i;
      });
    });
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}

var CONTEXT_KEY = {};

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
* @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
* @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
* @version 0.61.0
* @module lamb
* @license MIT
*/
/**
 * The placeholder object used in partial application.
 * @memberof module:lamb
 * @alias module:lamb.__
 * @category Special properties
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.57.0
 * @type {Object}
 */
var __ = {};

/**
 * Builds a function that returns a constant value.
 * It's actually the simplest form of the K combinator or Kestrel.
 * @example
 * const truth = _.always(true);
 *
 * truth() // => true
 * truth(false) // => true
 * truth(1, 2) // => true
 *
 * // the value being returned is actually the
 * // very same value passed to the function
 * const foo = {bar: "baz"};
 * const alwaysFoo = _.always(foo);
 *
 * alwaysFoo() === foo // => true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
function always(value) {
  return function () {
    return value;
  };
}

/**
 * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
 * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
 * considered the same value.<br/>
 * See also {@link module:lamb.isSVZ|isSVZ} for a curried version building a predicate and
 * {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is} to perform a "SameValue" comparison.
 * @example
 * const testObject = {};
 *
 * _.areSVZ({}, testObject) // => false
 * _.areSVZ(testObject, testObject) // => true
 * _.areSVZ("foo", "foo") // => true
 * _.areSVZ(0, -0) // => true
 * _.areSVZ(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.isSVZ|isSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSVZ(a, b) {
  return a !== a ? b !== b : a === b; // eslint-disable-line no-self-compare
}

/**
 * Builds a function that passes only two arguments to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * _.list(1, 2, 3, 4, 5) // => [1, 2, 3, 4, 5]
 * _.binary(_.list)(1, 2, 3, 4, 5) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.unary|unary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function binary(fn) {
  return function (a, b) {
    return fn.call(this, a, b);
  };
}

/**
 * "Clamps" a number within the given limits, both included.<br/>
 * The function will convert to number all its parameters before starting any
 * evaluation, and will return <code>NaN</code> if <code>min</code> is greater
 * than <code>max</code>.
 * @example
 * _.clamp(-5, 0, 10) // => 0
 * _.clamp(5, 0, 10) // => 5
 * _.clamp(15, 0, 10) // => 10
 * _.clamp(0, 0, 10) // => 0
 * _.clamp(10, 0, 10) // => 10
 * _.is(_.clamp(-0, 0, 10), -0) // => true
 * _.clamp(10, 20, 15) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.clampWithin|clampWithin}
 * @since 0.13.0
 * @param {Number} n
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function clamp(n, min, max) {
  n = +n;
  min = +min;
  max = +max;
  if (min > max) {
    return NaN;
  } else {
    return n < min ? min : n > max ? max : n;
  }
}

/**
 * Builds a partially applied function.<br/>
 * The {@link module:lamb.__|__} object can be used as a placeholder for arguments.<br/>
 * @example
 * const __ = _.__;
 * const users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * const isKeyTrue = _.partial(_.hasKeyValue, [__, true]);
 * const isActive = isKeyTrue("active");
 * const hasConfirmedMail = isKeyTrue("confirmedMail");
 *
 * _.map(users, isActive) // => [true, true, false]
 * _.map(users, hasConfirmedMail) // => [true, false, false]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.1.0
 * @param {Function} fn
 * @param {Array} args
 * @returns {Function}
 */
function partial(fn, args) {
  return function () {
    if (!Array.isArray(args)) {
      return fn.apply(this, arguments);
    }
    var lastIdx = 0;
    var newArgs = [];
    var argsLen = args.length;
    for (var i = 0, boundArg; i < argsLen; i++) {
      boundArg = args[i];
      newArgs[i] = boundArg === __ ? arguments[lastIdx++] : boundArg;
    }
    for (var len = arguments.length; lastIdx < len; lastIdx++) {
      newArgs[i++] = arguments[lastIdx];
    }
    return fn.apply(this, newArgs);
  };
}

/**
 * Builds a partial application of a ternary function so that its first parameter
 * is expected as the last one.<br/>
 * The <code>shouldAritize</code> parameter is for the "reduce" functions, where
 * the absence of the <code>initialValue</code> transforms a "fold" operation into a
 * "reduce" one.
 * @private
 * @param {Function} fn
 * @param {Boolean} shouldAritize
 * @returns {Function}
 */
function _makePartial3(fn, shouldAritize) {
  return function (a, b) {
    var f = shouldAritize && arguments.length !== 2 ? binary(fn) : fn;
    return partial(f, [__, a, b]);
  };
}

/**
 * A curried version of {@link module:lamb.clamp|clamp}, expecting a <code>min</code>
 * and a <code>max</code> value, that builds a function waiting for the number to clamp.
 * @example
 * _.clampWithin(0, 10)(-5) // => 0
 * _.clampWithin(0, 10)(5) // => 5
 * _.clampWithin(0, 10)(15) // => 10
 * _.clampWithin(0, 10)(0) // => 0
 * _.clampWithin(0, 10)(10) // => 10
 * _.is(_.clampWithin(0, 10)(-0), -0) // => true
 * _.clampWithin(20, 15)(10) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.clamp|clamp}
 * @since 0.47.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
var clampWithin = _makePartial3(clamp);

/**
 * The I combinator. Any value passed to the function is simply returned as it is.
 * @example
 * const foo = {bar: "baz"};
 *
 * _.identity(foo) === foo // true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {*} The value passed as parameter.
 */
function identity(value) {
  return value;
}

/**
 * Returns a function that is the composition of the functions given as parameters.
 * The first function consumes the result of the function that follows.
 * @example
 * const sayHi = name => `Hi, ${name}`;
 * const capitalize = s => s[0].toUpperCase() + s.substring(1).toLowerCase();
 * const fixNameAndSayHi = _.compose(sayHi, capitalize);
 *
 * sayHi("bOb") // => "Hi, bOb"
 * fixNameAndSayHi("bOb") // "Hi, Bob"
 *
 * const users = [{name: "fred"}, {name: "bOb"}];
 * const sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
 *
 * _.map(users, sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.pipe|pipe}
 * @since 0.1.0
 * @param {Function} a
 * @param {Function} b
 * @returns {Function}
 */
function compose(a, b) {
  return arguments.length ? function () {
    return a.call(this, b.apply(this, arguments));
  } : identity;
}
var MAX_ARRAY_LENGTH = 4294967295;
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Converts a value to a valid array length, thus an integer within
 * <code>0</code> and <code>2<sup>32</sup> - 1</code> (both included).
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _toArrayLength(value) {
  return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}

/* eslint-disable jsdoc/require-returns-check */

/**
 * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment:</caption>
 * const addClass = _.curry(function (className, element) {
 *     element.classList.add(className);
 * });
 * const paragraphs = document.querySelectorAll("#some-container p");
 *
 * _.forEach(paragraphs, addClass("main"));
 * // each "p" element in the container will have the "main" class now
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Undefined}
 */
function forEach(arrayLike, iteratee) {
  for (var i = 0, len = _toArrayLength(arrayLike.length); i < len; i++) {
    iteratee(arrayLike[i], i, arrayLike);
  }
}

/**
 * Creates generic functions out of methods.
 * @author A very little change on a great idea by [Irakli Gozalishvili]{@link https://github.com/Gozala/}.
 * Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
 * @memberof module:lamb
 * @category Function
 * @function
 * @example
 * const join = _.generic(Array.prototype.join);
 *
 * join([1, 2, 3, 4, 5], "-") // => "1-2-3-4-5"
 *
 * // the function will work with any array-like object
 * join("hello", "-") // => "h-e-l-l-o"
 *
 * @since 0.1.0
 * @param {Function} method
 * @returns {Function}
 */
var generic = Function.bind.bind(Function.call);

/**
 * Verifies if a value is <code>null</code>.
 * @example
 * _.isNull(null) // => true
 * _.isNull(void 0) // => false
 * _.isNull(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>undefined</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNull(value) {
  return value === null;
}

/**
 * Verifies if a value is <code>undefined</code>.
 * @example
 * _.isUndefined(null) // => false
 * _.isUndefined(void 0) // => true
 * _.isUndefined(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>null</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isUndefined(value) {
  return value === void 0;
}

/**
 * Verifies if a value is <code>null</code> or <code>undefined</code>.
 * @example
 * _.isNil(NaN) // => false
 * _.isNil({}) // => false
 * _.isNil(null) // => true
 * _.isNil(void 0) // => true
 * _.isNil() // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNull|isNull}
 * @see {@link module:lamb.isUndefined|isUndefined}
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNil(value) {
  return isNull(value) || isUndefined(value);
}

/**
 * Curries a function of arity 2.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry2(fn, isRightCurry) {
  return function (a) {
    return function (b) {
      return isRightCurry ? fn.call(this, b, a) : fn.call(this, a, b);
    };
  };
}

/**
 * A curried version of {@link module:lamb.areSVZ|areSVZ}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValueZero"
 * comparison.<br/>
 * See also {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is}
 * to perform a "SameValue" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.isSVZ(john);
 * const isZero = _.isSVZ(0);
 * const isReallyNaN = _.isSVZ(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isZero(0) // => true
 * isZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSVZ|areSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var isSVZ = _curry2(areSVZ);

/**
 * Builds a new array by applying the iteratee function to each element of the
 * received array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.map(["Joe", "Mario", "Jane"], _.invoke("toUpperCase")) // => ["JOE", "MARIO", "JANE"]
 *
 * _.map([4, 9, 16], Math.sqrt); // => [2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.mapWith|mapWith}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function map(arrayLike, iteratee) {
  var len = _toArrayLength(arrayLike.length);
  var result = Array(len);
  for (var i = 0; i < len; i++) {
    result[i] = iteratee(arrayLike[i], i, arrayLike);
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.map|map} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const square = n => n ** 2;
 * const getSquares = _.mapWith(square);
 *
 * getSquares([1, 2, 3, 4, 5]) // => [1, 4, 9, 16, 25]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.map|map}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var mapWith = _curry2(map, true);

/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * const f1 = _.partial(_.list, ["a", "b", "c"]);
 * const f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * const __ = _.__;
 * const f1 = _.partial(_.list, ["a", __, __, "d"]);
 * const f2 = _.partialRight(_.list, ["a", __, __, "d"]);
 *
 * f1("b", "c", "e") // => ["a", "b", "c", "d", "e"]
 * f2("b", "c", "e") // => ["b", "a", "c", "e", "d"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @param {Function} fn
 * @param {Array} args
 * @since 0.52.0
 * @returns {Function}
 */
function partialRight(fn, args) {
  return function () {
    if (!Array.isArray(args)) {
      return fn.apply(this, arguments);
    }
    var lastIdx = arguments.length - 1;
    var argsLen = args.length;
    var boundArgs = Array(argsLen);
    var newArgs = [];
    for (var i = argsLen - 1, boundArg; i > -1; i--) {
      boundArg = args[i];
      boundArgs[i] = boundArg === __ ? arguments[lastIdx--] : boundArg;
    }
    for (i = 0; i <= lastIdx; i++) {
      newArgs[i] = arguments[i];
    }
    for (var j = 0; j < argsLen; j++) {
      newArgs[i++] = boundArgs[j];
    }
    return fn.apply(this, newArgs);
  };
}

/**
 * Builds a reduce function. The <code>step</code> parameter must be <code>1</code>
 * to build  {@link module:lamb.reduce|reduce} and <code>-1</code> to build
 * {@link module:lamb.reduceRight|reduceRight}.
 * @private
 * @param {Number} step
 * @returns {Function}
 */
function _makeReducer(step) {
  return function (arrayLike, accumulator, initialValue) {
    var len = _toArrayLength(arrayLike.length);
    var idx = step === 1 ? 0 : len - 1;
    var nCalls;
    var result;
    if (arguments.length === 3) {
      nCalls = len;
      result = initialValue;
    } else {
      if (len === 0) {
        throw new TypeError("Reduce of empty array-like with no initial value");
      }
      result = arrayLike[idx];
      idx += step;
      nCalls = len - 1;
    }
    for (; nCalls--; idx += step) {
      result = accumulator(result, arrayLike[idx], idx, arrayLike);
    }
    return result;
  };
}

/**
 * Reduces (or folds) the values of an array-like object, starting from the first, to a new
 * value using the provided <code>accumulator</code> function.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.reduce([1, 2, 3, 4], _.sum) // => 10
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRight|reduceRight}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */
var reduce = _makeReducer(1);

/**
 * A partial application of {@link module:lamb.reduce|reduce} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceWith(_.sum)(arr) // => 15
 * _.reduceWith(_.subtract)(arr) // => -13
 * _.reduceWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRightWith|reduceRightWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceWith = _makePartial3(reduce, true);

/**
 * Converts a value to an integer.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _toInteger(value) {
  var n = +value;
  if (n !== n) {
    // eslint-disable-line no-self-compare
    return 0;
  } else if (n % 1 === 0) {
    return n;
  } else {
    return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
  }
}

/**
 * Builds an array by extracting a portion of an array-like object.<br/>
 * Note that unlike the native array method this function ensures that dense
 * arrays are returned.<br/>
 * Also, unlike the native method, the <code>start</code> and <code>end</code>
 * parameters aren't optional and will be simply converted to integer.<br/>
 * See {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.slice(arr, 0, 2) // => [1, 2]
 * _.slice(arr, 2, -1) // => [3, 4]
 * _.slice(arr, -3, 5) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sliceAt|sliceAt}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike - Any array like object.
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Array}
 */
function slice(arrayLike, start, end) {
  var len = _toArrayLength(arrayLike.length);
  var begin = _toInteger(start);
  var upTo = _toInteger(end);
  if (begin < 0) {
    begin = begin < -len ? 0 : begin + len;
  }
  if (upTo < 0) {
    upTo = upTo < -len ? 0 : upTo + len;
  } else if (upTo > len) {
    upTo = len;
  }
  var resultLen = upTo - begin;
  var result = resultLen > 0 ? Array(resultLen) : [];
  for (var i = 0; i < resultLen; i++) {
    result[i] = arrayLike[begin + i];
  }
  return result;
}

/**
 * Given the <code>start</code> and <code>end</code> bounds, builds a partial application
 * of {@link module:lamb.slice|slice} expecting the array-like object to slice.<br/>
 * See also {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const s = "hello";
 * const dropFirstAndLast = _.sliceAt(1, -1);
 *
 * dropFirstAndLast(arr) // => [2, 3, 4]
 * dropFirstAndLast(s) // => ["e", "l", "l"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.slice|slice}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.48.0
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Function}
 */
var sliceAt = _makePartial3(slice);
var objectProtoToString = Object.prototype.toString;

/**
 * Retrieves the "type tag" from the given value.
 * @example
 * const x = 5;
 * const y = new Number(5);
 *
 * typeof x // => "number"
 * typeof y // => "object"
 * _.type(x) // => "Number"
 * _.type(y) // => "Number"
 *
 * _.type(Object.prototype.toString) // => "Function"
 * _.type(/a/) // => "RegExp"
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.9.0
 * @param {*} value
 * @returns {String}
 */
function type(value) {
  return objectProtoToString.call(value).slice(8, -1);
}

/**
 * Appends the given value at the end of a copy of the provided array-like object.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.appendTo(arr, 5) // => [1, 2, 3, 4, 5]
 * _.appendTo(arr, [5]) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.append|append}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Array}
 */
function appendTo(arrayLike, value) {
  return slice(arrayLike, 0, arrayLike.length).concat([value]);
}

/**
 * A curried version of {@link module:lamb.appendTo|appendTo} that uses the value to append
 * to build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.append(5)(arr) // => [1, 2, 3, 4, 5]
 * _.append([5])(arr) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.appendTo|appendTo}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {*} value
 * @returns {Function}
 */
var append = _curry2(appendTo, true);

/**
 * Checks if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.contains|contains} for a curried version building a predicate.
 * @example
 * const numbers = [0, 1, 2, 3, NaN];
 *
 * _.isIn(numbers, 1) // => true
 * _.isIn(numbers, 0) // => true
 * _.isIn(numbers, -0) // => true
 * _.isIn(numbers, NaN) // => true
 * _.isIn(numbers, 5) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.contains|contains}
 * @since 0.13.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Boolean}
 */
function isIn(arrayLike, value) {
  var result = false;
  for (var i = 0, len = arrayLike.length; i < len; i++) {
    if (areSVZ(value, arrayLike[i])) {
      result = true;
      break;
    }
  }
  return result;
}

/**
 * Builds a predicate to check if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.isIn|isIn} for an uncurried version.
 * @example
 * const containsNaN = _.contains(NaN);
 *
 * containsNaN([0, 1, 2, 3, NaN]) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.isIn|isIn}
 * @since 0.13.0
 * @param {*} value
 * @returns {Function}
 */
var contains = _curry2(isIn, true);

/**
 * Builds a "grouping function" for an array-like object.
 * @private
 * @param {Function} makeValue
 * @returns {Function}
 */
function _groupWith(makeValue) {
  return function (arrayLike, iteratee) {
    var result = {};
    var len = arrayLike.length;
    for (var i = 0, element, key; i < len; i++) {
      element = arrayLike[i];
      key = iteratee(element, i, arrayLike);
      result[key] = makeValue(result[key], element);
    }
    return result;
  };
}

/**
 * Transforms an array-like object in a lookup table with the keys generated by the provided
 * <code>iteratee</code>, having as values the count of matches for the key.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 17},
 *     {"name": "Paolo", "age": 15}
 * ];
 * const getAgeStatus = person => (person.age >= 18 ? "adult" : "minor");
 *
 * _.count(persons, getAgeStatus) // => {"adult": 1, "minor": 3}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var count = _groupWith(function (a) {
  return a ? ++a : 1;
});

/**
 * A curried version of {@link module:lamb.count|count} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCityOrUnknown = _.adapter([_.getKey("city"), _.always("Unknown")]);
 * const countByCity = _.countBy(getCityOrUnknown);
 *
 * countByCity(persons) // => {"New York": 2, "Rome": 1, "Unknown": 1}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.count|count}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var countBy = _curry2(count, true);
var nativeSlice = generic(Array.prototype.slice);

/**
 * Utility function to check whether the passed value is
 * an Array or an "array-like" object.
 * @private
 * @param {*} target
 * @returns {Boolean}
 */
function _isArrayLike(target) {
  var len = target ? target.length : NaN;
  return Array.isArray(target) || len === 0 || typeof len === "number" && len > 0 && len - 1 in Object(target);
}

/**
 * Helper object to have faster lookups if the environment
 * supports Sets.
 * @class
 * @private
 * @param {ArrayLike} [arrayLike]
 */
function _LookupHelper(arrayLike) {
  var hasNativeSet = typeof Set === "function";
  var sourceElements = Array.isArray(arrayLike) ? arrayLike : _isArrayLike(arrayLike) ? nativeSlice(arrayLike) : [];

  /* eslint-disable-next-line no-undef */
  var sourceElementsSet = hasNativeSet ? new Set(sourceElements) : null;
  this.add = function (value) {
    if (hasNativeSet) {
      sourceElementsSet.add(value);
    } else {
      sourceElements.push(value);
    }
    return this;
  };
  this.has = function (value) {
    return hasNativeSet ? sourceElementsSet.has(value) : isIn(sourceElements, value);
  };
}

/**
 * Builds a TypeError stating that it's not possible to convert the given value to the
 * desired type.
 * @private
 * @param {*} value
 * @param {String} desiredType
 * @returns {TypeError}
 */
function _makeTypeErrorFor(value, desiredType) {
  return new TypeError("Cannot convert " + type(value).toLowerCase() + " to " + desiredType);
}

/**
 * Builds an array comprised of all values of the array-like object passing the <code>predicate</code>
 * test.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 *
 * _.filter(["Foo", "bar", "baZ"], isLowerCase) // => ["bar"]
 *
 * // the function will work with any array-like object
 * _.filter("fooBAR", isLowerCase) // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.filterWith|filterWith}
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @since 0.1.0
 * @returns {Array}
 */
function filter(arrayLike, predicate) {
  var len = arrayLike.length;
  var result = [];
  for (var i = 0; i < len; i++) {
    predicate(arrayLike[i], i, arrayLike) && result.push(arrayLike[i]);
  }
  return result;
}

/**
 * Using the provided iteratee, builds a function that will return an array comprised of the
 * unique elements of an array-like object. The values being compared are the ones returned by
 * the iteratee.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniques|uniques} if you don't need to transform your values before the
 * comparison.
 * @example
 * const data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * const uniquesById = _.uniquesBy(_.getKey("id"));
 *
 * uniquesById(data) // => [{id: "1", name: "John"}, {id: "4", name: "Jane"}, {id: "5", name: "Joe"}]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.uniques|uniques}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function uniquesBy(iteratee) {
  return function (arrayLike) {
    var result = [];
    for (var i = 0, len = arrayLike.length, seen = new _LookupHelper(), value; i < len; i++) {
      value = iteratee(arrayLike[i], i, arrayLike);
      if (!seen.has(value)) {
        seen.add(value);
        result.push(arrayLike[i]);
      }
    }
    return result;
  };
}

/**
 * Returns an array comprised of the unique elements of the given array-like object.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniquesBy|uniquesBy} if you need to transform your values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.uniques([-0, 1, 2, 0, 2, 3, 4, 3, 5, 1]) // => [-0, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.uniquesBy|uniquesBy}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var uniques = uniquesBy(identity);

/**
 * Returns an array of unique items present only in the first of the two given
 * array-like objects. To determine uniqueness the function uses the
 * ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 1, 3, 4];
 * const a2 = [2, 4, 5, 6];
 * const a3 = [3, 4, 5, 2, 1];
 *
 * _.difference(a1, a2) // => [1, 3]
 * _.difference(a2, a3) // => [6]
 * _.difference(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.symmetricDifference|symmetricDifference}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.pull|pull}, {@link module:lamb.pullFrom|pullFrom}
 * @since 0.6.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
function difference(a, b) {
  if (isNil(b)) {
    throw _makeTypeErrorFor(b, "array");
  }
  var toExclude = new _LookupHelper(b);
  var isNotInB = function isNotInB(v) {
    return !toExclude.has(v);
  };
  return uniques(filter(a, isNotInB));
}

/**
 * Builds an array without the first <code>n</code> elements of the given array or array-like object.
 * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.dropFrom(arr, 2) // => [3, 4, 5]
 * _.dropFrom(arr, -1) // => [5]
 * _.dropFrom(arr, -10) // => [1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function dropFrom(arrayLike, n) {
  return slice(arrayLike, n, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.dropFrom|dropFrom} that expects the number of elements
 * to drop to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.dropFrom|dropFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const drop2 = _.drop(2);
 *
 * drop2([1, 2, 3, 4, 5]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.5.0
 * @see {@link module:lamb.dropFrom|dropFrom}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @param {Number} n
 * @returns {Function}
 */
var drop = _curry2(dropFrom, true);

/**
 * Gets the index of the last element satisfying a predicate in an array-like object.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _getLastHitIndex(arrayLike, predicate, fromLast) {
  var idx;
  var increment;
  var len = arrayLike.length;
  if (fromLast) {
    idx = len - 1;
    increment = -1;
  } else {
    idx = 0;
    increment = 1;
  }
  while (idx >= 0 && idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
    idx += increment;
  }
  return idx;
}

/**
 * Helper to build the {@link module:lamb.takeWhile|takeWhile},
 * {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropWhile|dropWhile} and
 * {@link module:lamb.dropLastWhile|dropLastWhile} functions.
 * @private
 * @param {Boolean} isTake
 * @param {Boolean} fromLast
 * @returns {Function}
 */
function _takeOrDropWhile(isTake, fromLast) {
  return function (predicate) {
    return function (arrayLike) {
      var idxFrom;
      var idxTo;
      var lastHitIndex = _getLastHitIndex(arrayLike, predicate, fromLast);
      if (isTake && fromLast) {
        idxFrom = lastHitIndex + 1;
        idxTo = arrayLike.length;
      } else if (isTake) {
        idxFrom = 0;
        idxTo = lastHitIndex;
      } else if (!isTake && fromLast) {
        idxFrom = 0;
        idxTo = lastHitIndex + 1;
      } else {
        idxFrom = lastHitIndex;
        idxTo = arrayLike.length;
      }
      return slice(arrayLike, idxFrom, idxTo);
    };
  };
}

/**
 * Builds a function that drops the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropLastWhileIsEven = _.dropLastWhile(isEven);
 *
 * dropLastWhileIsEven([2, 4, 6, 8]) // => []
 * dropLastWhileIsEven([2, 4, 7, 8]) // => [2, 4, 7]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropLastWhile = _takeOrDropWhile(false, true);

/**
 * Builds a function that drops the first elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropWhileIsEven = _.dropWhile(isEven);
 *
 * dropWhileIsEven([2, 4, 6, 8]) // => []
 * dropWhileIsEven([2, 4, 7, 8]) // => [7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeWhile|takeWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropWhile = _takeOrDropWhile(false, false);

/**
 * Helper to build the {@link module:lamb.everyIn|everyIn} or the
 * {@link module:lamb.someIn|someIn} function.
 * @private
 * @param {Boolean} defaultResult
 * @returns {Function}
 */
function _makeArrayChecker(defaultResult) {
  return function (arrayLike, predicate) {
    for (var i = 0, len = arrayLike.length; i < len; i++) {
      if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
        return !defaultResult;
      }
    }
    return defaultResult;
  };
}

/**
 * Checks if all the elements in an array-like object satisfy the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>falsy</em> value.<br/>
 * Note that an empty array-like will always produce a <code>true</code> result regardless of the
 * predicate because of [vacuous truth]{@link https://en.wikipedia.org/wiki/Vacuous_truth}.<br/>
 * Also note that unlike the native
 * [Array.prototype.every]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: true},
 *     {"name": "John", "age": 40, active: true},
 *     {"name": "Mario", "age": 17, active: true},
 *     {"name": "Paolo", "age": 15, active: true}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.everyIn(persons, isAdult) // => false
 * _.everyIn(persons, isActive) // => true
 *
 * @example <caption>Showing the difference with <code>Array.prototype.every</code>:</caption>
 * const isDefined = _.not(_.isUndefined);
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.every(isDefined) // => true
 * _.everyIn(arr, isDefined) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.every|every}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var everyIn = _makeArrayChecker(true);

/**
 * A curried version of {@link module:lamb.everyIn|everyIn} that expects a predicate
 * to build a function waiting for the array-like to act upon.
 * @example
 * const data = [2, 3, 5, 6, 8];
 * const isEven = n => n % 2 === 0;
 * const allEvens = _.every(isEven);
 * const allIntegers = _.every(_.isInteger);
 *
 * allEvens(data) // => false
 * allIntegers(data) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.everyIn|everyIn}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var every = _curry2(everyIn, true);

/**
 * A curried version of {@link module:lamb.filter|filter} that uses the given predicate
 * to build a function expecting the array-like object to act upon.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 * const getLowerCaseEntries = _.filterWith(isLowerCase);
 *
 * getLowerCaseEntries(["Foo", "bar", "baZ"]) // => ["bar"]
 *
 * // array-like objects can be used as well
 * getLowerCaseEntries("fooBAR") // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.filter|filter}
 * @since 0.9.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var filterWith = _curry2(filter, true);

/**
 * Helper to create the {@link module:lamb.findIndex|findIndex} and
 * {@link module:lamb.findLastIndex|findLastIndex} functions.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _findIndex(arrayLike, predicate, fromLast) {
  var start;
  var increment;
  var len = arrayLike.length;
  var result = -1;
  if (fromLast) {
    start = len - 1;
    increment = -1;
  } else {
    start = 0;
    increment = 1;
  }
  for (var i = start; i < len && i >= 0; i += increment) {
    if (predicate(arrayLike[i], i, arrayLike)) {
      result = i;
      break;
    }
  }
  return result;
}

/**
 * Searches for an element satisfying the predicate in the given array-like object and returns its
 * index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findIndex(persons, _.hasKeyValue("age", 40)) // => 1
 * _.findIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findIndex(arrayLike, predicate) {
  return _findIndex(arrayLike, predicate, false);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object and returns it if
 * the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.find(persons, _.hasKeyValue("age", 40)) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.find(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function find(arrayLike, predicate) {
  var idx = findIndex(arrayLike, predicate);
  return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findIndex|findIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEvenIdx = _.findIndexWhere(isEven);
 *
 * findEvenIdx([1, 3, 4, 5, 6, 7]) // => 2
 * findEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findIndex|findIndex}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findIndexWhere = _curry2(findIndex, true);

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from
 * the end and returns its index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLastIndex(persons, _.hasKeyValue("age", 40)) // => 3
 * _.findLastIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findLastIndex(arrayLike, predicate) {
  return _findIndex(arrayLike, predicate, true);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from the end
 * and returns it if the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLast(persons, _.hasKeyValue("surname", "Doe")) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.findLast(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function findLast(arrayLike, predicate) {
  var idx = findLastIndex(arrayLike, predicate);
  return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findLastIndex|findLastIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findLastEvenIdx = _.findLastIndexWhere(isEven);
 *
 * findLastEvenIdx([1, 3, 4, 5, 6, 7]) // => 4
 * findLastEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastIndex|findLastIndex}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastIndexWhere = _curry2(findLastIndex, true);

/**
 * A curried version of {@link module:lamb.findLast|findLast} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findLastWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 6, 7]) // => 6
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLast|findLast}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastWhere = _curry2(findLast, true);

/**
 * A curried version of {@link module:lamb.find|find} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 7]) // => 4
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.find|find}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findWhere = _curry2(find, true);

/**
 * Similar to {@link module:lamb.map|map}, but if the mapping function returns an array this will
 * be concatenated, rather than pushed, to the final result.
 * @example <caption>Showing the difference with <code>map</code>:</caption>
 * const words = ["foo", "bar"];
 * const toCharArray = _.splitBy("");
 *
 * _.map(words, toCharArray) // => [["f", "o", "o"], ["b", "a", "r"]]
 * _.flatMap(words, toCharArray) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.flatMapWith|flatMapWith}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.1.0
 * @param {Array} array
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function flatMap(array, iteratee) {
  return reduce(array, function (result, el, idx, arr) {
    var v = iteratee(el, idx, arr);
    if (!Array.isArray(v)) {
      v = [v];
    }
    for (var i = 0, len = v.length, rLen = result.length; i < len; i++) {
      result[rLen + i] = v[i];
    }
    return result;
  }, []);
}

/**
 * A curried version of {@link module:lamb.flatMap|flatMap} that uses provided iteratee
 * to build a function expecting the array to act upon.
 * @example
 * const toCharArray = _.splitBy("");
 * const wordsToCharArray = _.flatMapWith(toCharArray);
 *
 * wordsToCharArray(["foo", "bar"]) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatMap|flatMap}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.11.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var flatMapWith = _curry2(flatMap, true);

/**
 * Flattens an array.
 * @private
 * @param {Array} array - The source array
 * @param {Boolean} isDeep - Whether to perform a deep flattening or not
 * @param {Array} output - An array to collect the result
 * @param {Number} idx - The next index to be filled in the output
 * @returns {Array} The output array filled with the results
 */
function _flatten(array, isDeep, output, idx) {
  for (var i = 0, len = array.length, value, j, vLen; i < len; i++) {
    value = array[i];
    if (!Array.isArray(value)) {
      output[idx++] = value;
    } else if (isDeep) {
      _flatten(value, true, output, idx);
      idx = output.length;
    } else {
      vLen = value.length;
      output.length += vLen;
      for (j = 0; j < vLen; j++) {
        output[idx++] = value[j];
      }
    }
  }
  return output;
}

/**
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function
 * @param {Boolean} isDeep
 * @returns {Function}
 */
var _makeArrayFlattener = _curry2(function (isDeep, array) {
  return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});

/**
 * Flattens an array.
 * @example <caption>Showing the difference with <code>shallowFlatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.shallowFlatten|shallowFlatten}
 * @since 0.1.0
 * @param {Array} array
 * @returns {Array}
 */
var flatten = _makeArrayFlattener(true);

/**
 * Checks if the given number, even negative, represents an array-like index
 * within the provided length. If so returns its natural number equivalent.<br/>
 * Returns <code>NaN<code> otherwise.
 * @private
 * @param {Number} idx
 * @param {Number} len
 * @returns {Number}
 */
function _toNaturalIndex(idx, len) {
  idx = _toInteger(idx);
  return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
}

/**
 * Retrieves the element at the given index in an array-like object.<br/>
 * Like {@link module:lamb.slice|slice} the index can be negative.<br/>
 * If the index isn't supplied, or if its value isn't an integer within the array-like bounds,
 * the function will return <code>undefined</code>.<br/>
 * <code>getIndex</code> will throw an exception when receives <code>null</code> or
 * <code>undefined</code> in place of an array-like object, but returns <code>undefined</code>
 * for any other value.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.getIndex(arr, 1) // => 2
 * _.getIndex(arr, -1) // => 5
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.getAt|getAt}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @returns {*}
 */
function getIndex(arrayLike, index) {
  var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));
  return idx === idx ? arrayLike[idx] : void 0; // eslint-disable-line no-self-compare
}

/**
 * A curried version of {@link module:lamb.getIndex|getIndex} that uses the provided index
 * to build a function expecting the array-like object holding the element we want to retrieve.
 * @example
 * const getFifthElement = _.getAt(4);
 *
 * getFifthElement([1, 2, 3, 4, 5]) // => 5
 * getFifthElement("foo bar") // => "b"
 * getFifthElement([]) // => undefined
 * getFifthElement("foo") // => undefined
 *
 * @example <caption>Using negative indexes:</caption>
 * _.getAt(-2)([1, 2, 3]) // => 2
 * _.getAt(-3)("foo") // => "f"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.16.0
 * @see {@link module:lamb.getIndex|getIndex}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @param {Number} index
 * @returns {Function}
 */
var getAt = _curry2(getIndex, true);

/**
 * Transforms an array-like object into a lookup table using the provided iteratee as a grouping
 * criterion to generate keys and values.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCity = _.getKey("city");
 * const personsByCity = _.group(persons, getCity);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "undefined": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @example <caption>Adding a custom value for missing keys:</caption>
 *
 * const getCityOrUnknown = _.adapter([getCity, _.always("Unknown")]);
 *
 * const personsByCity = _.group(persons, getCityOrUnknown);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "Unknown": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var group = _groupWith(function (a, b) {
  if (!a) {
    return [b];
  }
  a[a.length] = b;
  return a;
});

/**
 * A curried version of {@link module:lamb.group|group} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 18},
 *     {"name": "Paolo", "age": 15}
 * ];
 *
 * const getAgeStatus = person => `${person.age > 20 ? "over" : "under"} 20`;
 * const groupByAgeStatus = _.groupBy(getAgeStatus);
 *
 * const personsByAgeStatus = groupByAgeStatus(persons);
 *
 * // "personsByAgeStatus" holds:
 * // {
 * //     "under 20": [
 * //         {"name": "Jane", "age": 12},
 * //         {"name": "Mario", "age": 18},
 * //         {"name": "Paolo", "age": 15}
 * //     ],
 * //     "over 20": [
 * //         {"name": "John", "age": 40}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.group|group}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var groupBy = _curry2(group, true);

/**
 * Retrieves the first element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.head([1, 2, 3]) // => 1
 * _.head("hello") // => "h"
 * _.head([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.last|last}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var head = getAt(0);

/**
 * Similar to {@link module:lamb.group|group}, but the generated lookup table will have
 * only one element of the original array-like object for each value.<br/>
 * Should be used only when you're sure that your <code>iteratee</code> won't produce
 * duplicate keys, otherwise only the last evaluated element will be in the result.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("id"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"},
 * //     "4": {id: 4, name: "John"}
 * // }
 *
 * @example <caption>Result of an <code>iteratee</code> producing a duplicate key:</caption>
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("name"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "John": {"id": 4, "name": "John"},
 * //     "Jane": {"id": 2, "name": "Jane"},
 * //     "Mario": {"id": 3, "name": "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.indexBy|indexBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var index = _groupWith(function (a, b) {
  return b;
});

/**
 * A curried version of {@link module:lamb.index|index} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"}
 * ];
 * const indexByID = _.indexBy(_.getKey("id"));
 *
 * const indexedUsers = indexByID(users);
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.index|index}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var indexBy = _curry2(index, true);

/**
 * Returns a copy of the given array-like object without the last element.
 * @example
 * _.init([1, 2, 3, 4]) // => [1, 2, 3]
 * _.init([1]) // => []
 * _.init([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.tail|tail}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var init$1 = partial(slice, [__, 0, -1]);

/**
 * Inserts the provided element in a copy of an array-like object at the
 * specified index.<br/>
 * If the index is greater than the length of the array-like, the element
 * will be appended at the end.<br/>
 * Negative indexes are allowed; when a negative index is out of bounds
 * the element will be inserted at the start of the resulting array.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insert(arr, 3, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, -2, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, 10, 99) // => [1, 2, 3, 4, 5, 99]
 * _.insert(arr, -10, 99) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.insertAt|insertAt}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} element
 * @returns {Array}
 */
function insert(arrayLike, index, element) {
  var result = slice(arrayLike, 0, arrayLike.length);
  result.splice(index, 0, element);
  return result;
}

/**
 * Builds a partial application of {@link module:lamb.insert|insert}
 * expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insertAt(3, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(-2, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(10, 99)(arr) // => [1, 2, 3, 4, 5, 99]
 * _.insertAt(-10, 99)(arr) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.insert|insert}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.27.0
 * @param {Number} index
 * @param {*} element
 * @returns {Function}
 */
var insertAt = _makePartial3(insert);

/**
 * Returns an array of every unique item that is included in all two given arrays
 * or array-like objects.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 3, 4];
 * const a2 = [2, 5, 4, 2, 6];
 * const a3 = [5, 6, 7];
 *
 * _.intersection(a1, a2) // => [2, 4]
 * _.intersection(a2, a3) // => [5, 6]
 * _.intersection(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.symmetricDifference|symmetricDifference}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
function intersection(a, b) {
  var result = [];
  var resultLookup = new _LookupHelper();
  var bLookup = new _LookupHelper(b);
  var lenA = a.length;
  if (lenA && b.length) {
    for (var i = 0, v; i < lenA; i++) {
      v = a[i];
      if (!resultLookup.has(v) && bLookup.has(v)) {
        resultLookup.add(v);
        result.push(v);
      }
    }
  }
  return result;
}

/**
 * Transforms an array-like object into a string by joining its elements with
 * the given separator.<br/>
 * Note that unlike the native method, this function won't convert
 * <code>null</code> and <code>undefined</code> values in the array to empty
 * strings and that the <code>separator</code> parameter isn't optional.<br/>
 * See the examples about these differences.
 * @example
 * const words = ["foo", "bar", "baz"];
 *
 * _.join(words, "-") // => "foo-bar-baz"
 *
 * @example <caption>Showing the differences with the native array method:</caption>
 * const mixed = [1, null, 2, undefined, 3, NaN, 4, 5];
 * const numbers = [1, 2, 3];
 *
 * _.join(mixed, "-") // => "1-null-2-undefined-3-NaN-4-5"
 * mixed.join("-") // => "1--2--3-NaN-4-5"
 *
 * _.join(numbers) // => "1undefined2undefined3"
 * numbers.join() // => "1,2,3"
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.joinWith|joinWith}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {String} separator
 * @returns {String}
 */
function join(arrayLike, separator) {
  return map(arrayLike, String).join(String(separator));
}

/**
 * A curried version of {@link module:lamb.join|join} that accepts an optional
 * separator and builds a function expecting the array-like object to act upon.<br/>
 * Please refer to the description and examples of {@link module:lamb.join|join}
 * to understand the differences with the native array method.
 * @example
 * const words = ["foo", "bar", "baz"];
 * const joinWithDash = _.joinWith("-");
 *
 * joinWithDash(words) // => "foo-bar-baz"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.join|join}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {String} separator
 * @returns {Function}
 */
var joinWith = _curry2(join, true);

/**
 * Retrieves the last element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.last([1, 2, 3]) // => 3
 * _.last("hello") // => "o"
 * _.last([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.head|head}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var last = getAt(-1);

/**
 * Builds helper functions to extract portions of the arguments
 * object rather efficiently without having to write for loops
 * manually for each case.<br/>
 * The arguments object needs to be passed to the apply method
 * of the generated function.
 * @private
 * @param {Number} idx
 * @returns {Function}
 */
function _argsToArrayFrom(idx) {
  return function () {
    var argsLen = arguments.length || idx;
    var len = argsLen - idx;
    var result = Array(len);
    for (var i = 0; i < len; i++) {
      result[i] = arguments[i + idx];
    }
    return result;
  };
}

/**
 * Generates an array with the values passed as arguments.<br/>
 * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.1.0
 * @param {...*} value
 * @returns {Array}
 */
var list = _argsToArrayFrom(0);

/**
 * Splits an array-like object in two lists: the first with the elements satisfying the given predicate,
 * the others with the remaining elements.
 * @example
 * const isEven = n => n % 2 === 0;
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * _.partition(numbers, isEven) // => [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.partitionWith|partitionWith}
 * @since 0.11.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Array<Array, Array>}
 */
function partition(arrayLike, predicate) {
  var result = [[], []];
  var len = arrayLike.length;
  for (var i = 0, el; i < len; i++) {
    el = arrayLike[i];
    result[predicate(el, i, arrayLike) ? 0 : 1].push(el);
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.partition|partition} that uses the provided
 * predicate to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {"name": "Jane", "surname": "Doe", "active": false},
 *     {"name": "John", "surname": "Doe", "active": true},
 *     {"name": "Mario", "surname": "Rossi", "active": true},
 *     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * ];
 * const isActive = _.hasKeyValue("active", true);
 * const splitByActiveStatus = _.partitionWith(isActive);
 *
 * splitByActiveStatus(users) // =>
 * // [[
 * //     {"name": "John", "surname": "Doe", "active": true},
 * //     {"name": "Mario", "surname": "Rossi", "active": true}
 * // ], [
 * //     {"name": "Jane", "surname": "Doe", "active": false},
 * //     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * // ]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.partition|partition}
 * @since 0.11.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var partitionWith = _curry2(partition, true);

/**
 * Returns the value of the object property with the given key.
 * @example
 * const user = {name: "John"};
 *
 * _.getIn(user, "name") // => "John";
 * _.getIn(user, "surname") // => undefined
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getKey|getKey}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.18.0
 * @param {Object} source
 * @param {String} key
 * @returns {*}
 */
function getIn(source, key) {
  return source[key];
}

/**
 * A curried version of {@link module:lamb.getIn|getIn}.<br/>
 * Receives a property name and builds a function expecting the object from which we want to retrieve
 * the property.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {name: "jane"};
 * const getName = _.getKey("name");
 *
 * getName(user1) // => "john"
 * getName(user2) // => "jane"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getIn|getIn}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var getKey = _curry2(getIn, true);

/**
 * A curried version of {@link module:lamb.pluckFrom|pluckFrom} expecting the key to retrieve to
 * build a function waiting for the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 * const getAges = _.pluck("age");
 *
 * getAges(persons) // => [12, 40, 18, 15]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pluckFrom|pluckFrom}
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */
var pluck = compose(mapWith, getKey);

/**
 * "Plucks" the values of the specified key from a list of objects.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 *
 * _.pluckFrom(persons, "age") // => [12, 40, 18, 15]
 *
 * const lists = [
 *     [1, 2],
 *     [3, 4, 5],
 *     [6]
 * ];
 *
 * _.pluckFrom(lists, "length") // => [2, 3, 1]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pluck|pluck}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {String} key
 * @returns {Array}
 */
function pluckFrom(arrayLike, key) {
  return map(arrayLike, getKey(key));
}

/**
 * Creates an array copy of the given array-like object without the
 * specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
 *
 * @example <caption>It's not the same as {@link module:lamb.difference|difference}:</caption>
 *
 * const arr = [1,1,2,3,4,4,5];
 *
 * _.pullFrom(arr, [1, 2]) // => [3, 4, 4, 5]
 * _.difference(arr, [1, 2]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pull|pull}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} values
 * @returns {Array}
 */
function pullFrom(arrayLike, values) {
  return values ? filter(arrayLike, function (element) {
    return !isIn(values, element);
  }) : slice(arrayLike, 0, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
 * a list of values to build a function waiting for an array-like object.<br/>
 * The new function will create an array copy of the array-like without
 * the specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * See examples in {@link module:lamb.pullFrom|pullFrom} about the
 * relationship with {@link module:lamb.difference|difference}.
 * @example
 * const scores = [40, 20, 30, 10];
 * const newScores = [30, 10];
 * const pullNewScores = _.pull(newScores);
 *
 * pullNewScores(scores) // => [40, 20]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pullFrom|pullFrom}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} values
 * @returns {Function}
 */
var pull = _curry2(pullFrom, true);

/**
 * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last
 * element instead.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduce|reduce}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */
var reduceRight = _makeReducer(-1);

/**
 * A partial application of {@link module:lamb.reduce|reduceRight} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceRightWith(_.sum)(arr) // => 15
 * _.reduceRightWith(_.subtract)(arr) // => -5
 * _.reduceRightWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceWith|reduceWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceRightWith = _makePartial3(reduceRight, true);

/**
 * Reverses a copy of the given array-like object.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.reverse(arr) // => [3, 2, 1];
 *
 * // `arr` still is [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.19.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
function reverse(arrayLike) {
  var len = _toArrayLength(arrayLike.length);
  var result = Array(len);
  for (var i = 0, ofs = len - 1; i < len; i++) {
    result[i] = arrayLike[ofs - i];
  }
  return result;
}

/**
 * Returns a copy of the given array-like with the element rotated by the desired amount.
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.rotate(arr, 3) // => [3, 4, 5, 1, 2]
 * _.rotate(arr, -3) // => [4, 5, 1, 2, 3]
 * _.rotate(arr, 11) // => [5, 1, 2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.rotateBy|rotateBy}
 * @since 0.55.0
 * @param {ArrayLike} arrayLike
 * @param {Number} amount
 * @returns {Array}
 */
function rotate(arrayLike, amount) {
  var len = arrayLike.length;
  var shift = amount % len;
  return slice(arrayLike, -shift, len).concat(slice(arrayLike, 0, -shift));
}

/**
 * A curried version of {@link module:lamb.rotate|rotate}.<br/>
 * Uses the given amount to build a function expecting the array to rotate by that amount.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const rotateByTwo = _.rotateBy(2);
 *
 * rotateByTwo(arr) // => [4, 5, 1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.rotate|rotate}
 * @since 0.55.0
 * @param {Number} amount
 * @returns {Function}
 */
var rotateBy = _curry2(rotate, true);

/**
 * Sets an index in an array-like object.<br/>
 * If provided with an updater function it will use it to update the current value,
 * otherwise sets the index to the specified value.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {Number} idx
 * @param {*} [value]
 * @param {Function} [updater]
 * @returns {Array}
 */
function _setIndex(arrayLike, idx, value, updater) {
  var result = slice(arrayLike, 0, arrayLike.length);
  var n = _toNaturalIndex(idx, result.length);
  if (n === n) {
    // eslint-disable-line no-self-compare
    result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.setIndex|setIndex} that builds
 * a function that creates a copy of an array-like object with the given
 * index changed to the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.setAt(2, 99)(arr) // => [1, 2, 99, 4, 5]
 * arr // => [1, 2, 3, 4, 5]
 *
 * _.setAt(10, 99)(arr) // => [1, 2, 3, 4, 5] (not a reference to `arr`)
 *
 * @example <caption>Using negative indexes:</caption>
 * _.setAt(-1, 99)(arr) // => [1, 2, 3, 4, 99]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setIndex|setIndex}
 * @since 0.17.0
 * @param {Number} index
 * @param {*} value
 * @returns {Function}
 */
var setAt = _makePartial3(_setIndex);

/**
 * Builds a new function that passes only the specified amount of arguments to the original one.<br/>
 * As {@link module:lamb.slice|slice} is used to extract the arguments, you can also
 * pass a negative arity.
 * @example
 * Math.max(10, 11, 45, 99) // => 99
 * _.aritize(Math.max, 2)(10, 11, 45, 99) // => 11
 *
 * @example <caption>Using a negative arity:</caption>
 * _.aritize(Math.max, -1)(10, 11, 45, 99) // => 45
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.binary|binary}, {@link module:lamb.unary|unary} for common use cases shortcuts
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} arity
 * @returns {Function}
 */
function aritize(fn, arity) {
  return function () {
    var n = _toInteger(arity);
    var args = list.apply(null, arguments).slice(0, n);
    for (var i = args.length; i < n; i++) {
      args[i] = void 0;
    }
    return fn.apply(this, args);
  };
}

/**
 * Creates a copy of an array-like object with the given index changed to
 * the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.setIndex(arr, 1, 99) // => [1, 99, 3]
 * _.setIndex(arr, -1, 99) // => [1, 2, 99]
 * _.setIndex(arr, 10, 99) // => [1, 2, 3] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setAt|setAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} value
 * @returns {Array}
 */
var setIndex = aritize(_setIndex, 3);

/**
 * Flattens the "first level" of an array.
 * @example <caption>Showing the difference with <code>flatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatten|flatten}
 * @since 0.9.0
 * @param {Array} array
 * @returns {Array}
 */
var shallowFlatten = _makeArrayFlattener(false);

/**
 * Checks if at least one element in an array-like object satisfies the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>truthy</em> value.<br/>
 * Note that unlike the native
 * [Array.prototype.some]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: false},
 *     {"name": "John", "age": 40, active: false},
 *     {"name": "Mario", "age": 17, active: false},
 *     {"name": "Paolo", "age": 15, active: false}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.someIn(persons, isAdult) // => true
 * _.someIn(persons, isActive) // => false
 *
 * @example <caption>Showing the difference with <code>Array.prototype.some</code>:</caption>
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.some(_.isUndefined) // => false
 * _.someIn(arr, _.isUndefined) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.some|some}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var someIn = _makeArrayChecker(false);

/**
 * A curried version of {@link module:lamb.someIn|someIn} that uses the given predicate to
 * build a function waiting for the array-like to act upon.
 * @example
 * const data = [1, 3, 5, 6, 7, 8];
 * const isEven = n => n % 2 === 0;
 * const containsEvens = _.some(isEven);
 * const containsStrings = _.some(_.isType("String"));
 *
 * containsEvens(data) // => true
 * containsStrings(data) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.someIn|someIn}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var some = _curry2(someIn, true);

/**
 * Accepts a list of sorting criteria with at least one element
 * and builds a function that compares two values with such criteria.
 * @private
 * @param {Sorter[]} criteria
 * @returns {Function}
 */
function _compareWith(criteria) {
  return function (a, b) {
    var len = criteria.length;
    var criterion = criteria[0];
    var result = criterion.compare(a.value, b.value);
    for (var i = 1; result === 0 && i < len; i++) {
      criterion = criteria[i];
      result = criterion.compare(a.value, b.value);
    }
    if (result === 0) {
      result = a.index - b.index;
    }
    return criterion.isDescending ? -result : result;
  };
}

/**
 * The default comparer for sorting functions.<br/>
 * If the given values are of different types they
 * will be both converted to strings.<br/>
 * Uses the SameValueZero comparison.
 * @private
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1 | 0 | 1
 */
function _comparer(a, b) {
  var result = 0;
  if (_typeof$1(a) !== _typeof$1(b)) {
    a = String(a);
    b = String(b);
  }
  if (!areSVZ(a, b)) {
    // eslint-disable-next-line no-self-compare
    result = a > b || a !== a ? 1 : -1;
  }
  return result;
}

/**
 * Builds a sorting criterion. If the comparer function is missing, the default
 * comparer will be used instead.
 * @private
 * @param {Function} reader
 * @param {Boolean} isDescending
 * @param {Function} [comparer]
 * @returns {Sorter}
 */
function _sorter(reader, isDescending, comparer) {
  if (typeof reader !== "function" || reader === identity) {
    reader = null;
  }
  if (typeof comparer !== "function") {
    comparer = _comparer;
  }
  return {
    isDescending: isDescending === true,
    compare: function compare(a, b) {
      if (reader) {
        a = reader(a);
        b = reader(b);
      }
      return comparer(a, b);
    }
  };
}

/**
 * Converts a sorting function to a sorting criterion if necessary.
 * @private
 * @param {Function} criterion
 * @returns {Sorter}
 */
function _makeCriterion(criterion) {
  return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}

/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */
function _makeCriteria(sorters) {
  return sorters && sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
}

/**
 * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted
 * copy of an array-like object using the given criteria.<br/>
 * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you
 * can also pass simple "reader" functions and default ascending sorters will be built for you.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used
 * in the comparison.<br/>
 * Please note that if the arguments received by the default comparer aren't of the same type,
 * they will be compared as strings.
 *
 * @example <caption>Stable sort:</caption>
 * const persons = [
 *     {"name": "John", "surname" :"Doe"},
 *     {"name": "Mario", "surname": "Rossi"},
 *     {"name": "John", "surname" :"Moe"},
 *     {"name": "Jane", "surname": "Foe"}
 * ];
 *
 * const personsByName = _.sort(persons, [_.getKey("name")]);
 *
 * // personsByName holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Stable multi-sort:</caption>
 * const personsByNameAscSurnameDesc = _.sort(persons, [
 *     _.getKey("name"),
 *     _.sorterDesc(_.getKey("surname"))
 * ]);
 *
 * // personsByNameAscSurnameDesc holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Using custom comparers:</caption>
 * const localeSorter = new Intl.Collator("it");
 * const chars = ["a", "è", "à", "é", "c", "b", "e"];
 *
 * _.sort(chars, [localeSorter]) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * const localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
 *
 * _.sort(chars, [localeSorterDesc]) // => ["è", "é", "e", "c", "b", "à", "a"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {ArrayLike} arrayLike
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Array}
 */
function sort(arrayLike, sorters) {
  var criteria = _makeCriteria(sorters);
  var len = _toArrayLength(arrayLike.length);
  var result = Array(len);
  for (var i = 0; i < len; i++) {
    result[i] = {
      value: arrayLike[i],
      index: i
    };
  }
  result.sort(_compareWith(criteria));
  for (i = 0; i < len; i++) {
    result[i] = result[i].value;
  }
  return result;
}

/**
 * Establishes at which index an element should be inserted in a sorted array to respect
 * the array order. Needs the comparer used to sort the array.
 * @private
 * @param {Array} array
 * @param {*} element
 * @param {Function} comparer
 * @param {Number} start
 * @param {Number} end
 * @returns {Number}
 */
function _getInsertionIndex(array, element, comparer, start, end) {
  if (array.length === 0) {
    return 0;
  }
  var pivot = start + end >> 1;
  var result = comparer({
    value: element,
    index: pivot
  }, {
    value: array[pivot],
    index: pivot
  });
  if (end - start <= 1) {
    return result < 0 ? pivot : pivot + 1;
  } else if (result < 0) {
    return _getInsertionIndex(array, element, comparer, start, pivot);
  } else if (result === 0) {
    return pivot + 1;
  } else {
    return _getInsertionIndex(array, element, comparer, pivot, end);
  }
}

/**
 * Inserts an element in a copy of a sorted array respecting the sort order.
 * @example <caption>With simple values:</caption>
 * _.sortedInsert([], 1) // => [1]
 * _.sortedInsert([2, 4, 6], 5) // => [2, 4, 5, 6]
 * _.sortedInsert([4, 2, 1], 3, _.sorterDesc()) // => [4, 3, 2, 1]
 *
 * @example <caption>With complex values:</caption>
 * const persons = [
 *     {"name": "jane", "surname": "doe"},
 *     {"name": "John", "surname": "Doe"},
 *     {"name": "Mario", "surname": "Rossi"}
 * ];
 *
 * const getLowerCaseName = _.compose(
 *     _.invoke("toLowerCase"),
 *     _.getKey("name")
 * );
 *
 * const result = _.sortedInsert(
 *     persons,
 *     {"name": "marco", "surname": "Rossi"},
 *     getLowerCaseName
 * );
 *
 * // `result` holds:
 * // [
 * //     {"name": "jane", "surname": "doe"},
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "marco", "surname": "Rossi"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt} to insert the element
 * at a specific index
 * @since 0.27.0
 * @param {ArrayLike} arrayLike
 * @param {*} element
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]] - The sorting criteria
 * used to sort the array.
 * @returns {Array}
 */
function sortedInsert(arrayLike, element, sorters) {
  var result = slice(arrayLike, 0, arrayLike.length);
  if (arguments.length === 1) {
    return result;
  }
  var criteria = _makeCriteria(sorters);
  var idx = _getInsertionIndex(result, element, _compareWith(criteria), 0, result.length);
  result.splice(idx, 0, element);
  return result;
}

/**
 * Creates an ascending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.1.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorter = partial(_sorter, [__, false, __]);

/**
 * Creates a descending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}
 * @since 0.15.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorterDesc = partial(_sorter, [__, true, __]);

/**
 * Builds a partial application of {@link module:lamb.sort|sort} using the provided criteria.
 * The returned function expects the array-like object to sort.
 * As usual, sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function,
 * but you can also pass simple "reader" functions and default ascending sorters will be built.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used in
 * the comparison.<br/>
 * See {@link module:lamb.sort|sort} for more examples.
 *
 * @example
 * var sortAsNumbers = _.sortWith([parseFloat]);
 * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * sortAsNumbers(weights) // => ["1 Kg", "2 Kg", "7 Kg", "10 Kg"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sort|sort}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Function}
 */
var sortWith = _curry2(sort, true);

/**
 * Returns the [symmetric difference]{@link https://en.wikipedia.org/wiki/Symmetric_difference}
 * of two array-like objects. In other words returns the array of unique
 * items contained in the first or second array-like, but not the ones
 * in their {@link module:lamb.intersection|intersection}.<br/>
 * To determine uniqueness the function uses the
 * ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [0, 1, 2, 3, 2, 4, NaN];
 * const a2 = [-0, 2, 3, 4, 5, NaN];
 * const a3 = [1, 3, 4, 5];
 *
 * _.symmetricDifference(a1, a2) // => [1, 5]
 * _.symmetricDifference(a2, a3) // => [-0, 2, NaN, 1]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @since 0.61.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
function symmetricDifference(a, b) {
  return difference(a, b).concat(difference(b, a));
}

/**
 * Returns a copy of the given array-like object without the first element.
 * @example
 * _.tail([1, 2, 3, 4]) // => [2, 3, 4]
 * _.tail([1]) // => []
 * _.tail([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.init|init}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var tail = drop(1);

/**
 * Retrieves the first <code>n</code> elements from an array or array-like object.<br/>
 * Note that, being this a shortcut for a common use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.takeFrom(arr, 3) // => [1, 2, 3]
 * _.takeFrom(arr, -1) // => [1, 2, 3, 4]
 * _.takeFrom(arr, -10) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function takeFrom(arrayLike, n) {
  return slice(arrayLike, 0, n);
}

/**
 * A curried version of {@link module:lamb.takeFrom|takeFrom} that expects the number of elements
 * to retrieve to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.takeFrom|takeFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const take2 = _.take(2);
 *
 * take2([1, 2, 3, 4, 5]) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeFrom|takeFrom}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.5.0
 * @param {Number} n
 * @returns {Function}
 */
var take = _curry2(takeFrom, true);

/**
 * Builds a function that takes the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeLastWhileIsEven = _.takeLastWhile(isEven);
 *
 * takeLastWhileIsEven([1, 3, 5, 7]) // => []
 * takeLastWhileIsEven([2, 3, 6, 8]) // => [6, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeLastWhile = _takeOrDropWhile(true, true);

/**
 * Builds a function that takes the first elements satisfying a predicate from
 * an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeWhileIsEven = _.takeWhile(isEven);
 *
 * takeWhileIsEven([1, 2, 4, 6, 8]) // => []
 * takeWhileIsEven([2, 4, 7, 8]) // => [2, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeWhile = _takeOrDropWhile(true, false);

/**
 * Transposes a matrix. Can also be used to reverse a {@link module:lamb.zip|zip} operation.<br/>
 * Just like {@link module:lamb.zip|zip}, the received array-like objects will be truncated to the
 * shortest length.
 * @example <caption>Transposing a matrix:</caption>
 * _.transpose([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9]
 * ]) // =>
 * // [
 * //     [1, 4, 7],
 * //     [2, 5, 8],
 * //     [3, 6, 9]
 * // ]
 *
 * @example <caption>Showing the relationship with <code>zip</code>:</caption>
 * const zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.transpose(zipped) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike<ArrayLike>} arrayLike
 * @returns {Array<Array>}
 */
function transpose(arrayLike) {
  var minLen = MAX_ARRAY_LENGTH;
  var len = _toArrayLength(arrayLike.length);
  if (len === 0) {
    return [];
  }
  for (var j = 0, elementLen; j < len; j++) {
    elementLen = _toArrayLength(arrayLike[j].length);
    if (elementLen < minLen) {
      minLen = elementLen;
    }
  }
  var result = Array(minLen);
  for (var i = 0, el; i < minLen; i++) {
    el = result[i] = Array(len);
    for (j = 0; j < len; j++) {
      el[j] = arrayLike[j][i];
    }
  }
  return result;
}

/**
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * const square = n => n ** 2;
 * const getMaxAndSquare = _.pipe([Math.max, square]);
 *
 * getMaxAndSquare(3, 5) // => 25
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.compose|compose}
 * @since 0.1.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function pipe(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }
  var len = functions.length;
  return len ? function () {
    var result = functions[0].apply(this, arguments);
    for (var i = 1; i < len; i++) {
      result = functions[i].call(this, result);
    }
    return result;
  } : identity;
}

/**
 * Using the provided iteratee to transform values, builds a function that will
 * return an array of the unique elements  in the two provided array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.union|union} if you don't need to compare transformed values.
 * @example
 * const unionByFloor = _.unionBy(Math.floor);
 *
 * unionByFloor([2.8, 3.2, 1.5], [3.5, 1.2, 4]) // => [2.8, 3.2, 1.5, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.union|union}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.symmetricDifference|symmetricDifference}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function unionBy(iteratee) {
  return pipe([binary(list), flatMapWith(drop(0)), uniquesBy(iteratee)]);
}

/**
 * Returns a list of every unique element present in the two given array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.unionBy|unionBy} if you need to transform the values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.union([1, 2, 3, 2], [2, 3, 4]) // => [1, 2, 3, 4]
 * _.union("abc", "bcd") // => ["a", "b", "c", "d"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.symmetricDifference|symmetricDifference}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
var union = unionBy(identity);

/**
 * Builds a function that creates a copy of an array-like object with the given index
 * changed by applying the provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateAt(1, toUpperCase)(arr) // => ["a", "B", "c"]
 * _.updateAt(-1, toUpperCase)(arr) // => ["a", "b", "C"]
 * _.updateAt(10, toUpperCase)(arr) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.updateIndex|updateIndex}
 * @since 0.22.0
 * @param {Number} index
 * @param {Function} updater
 * @returns {Function}
 */
function updateAt(index, updater) {
  return function (arrayLike) {
    return _setIndex(arrayLike, index, null, updater);
  };
}

/**
 * Creates a copy of an array-like object with the given index changed by applying the
 * provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIndex(arr, 1, toUpperCase) // => ["a", "B", "c"]
 * _.updateIndex(arr, -1, toUpperCase) // => ["a", "b", "C"]
 * _.updateIndex(arr, 10, toUpperCase) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.updateAt|updateAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {Function} updater
 * @returns {Array}
 */
var updateIndex = partial(_setIndex, [__, __, null, __]);

/**
 * Builds a list of arrays out of the two given array-like objects by pairing items with
 * the same index.<br/>
 * The received array-like objects will be truncated to the shortest length.
 * @example
 * _.zip(
 *     ["a", "b", "c"],
 *     [1, 2, 3]
 * ) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.zip([1, 2, 3, 4], [5, 6, 7]) // => [[1, 5], [2, 6], [3, 7]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.transpose|transpose} for the reverse operation
 * @see {@link module:lamb.zipWithIndex|zipWithIndex}
 * @since 0.14.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array<Array>}
 */
function zip(a, b) {
  return transpose([a, b]);
}

/**
 * "{@link module:lamb.zip|Zips}" an array-like object by pairing its values with their index.
 * @example
 * _.zipWithIndex(["a", "b", "c"]) // => [["a", 0], ["b", 1], ["c", 2]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike} arrayLike
 * @returns {Array<Array<*, Number>>}
 */
var zipWithIndex = mapWith(binary(list));

/**
 * Applies the given function to a list of arguments.
 * @example
 * _.application(_.sum, [3, 4]) // => 7
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.apply|apply}, {@link module:lamb.applyTo|applyTo}
 * @since 0.47.0
 * @param {Function} fn
 * @param {ArrayLike} args
 * @returns {*}
 */
function application(fn, args) {
  return fn.apply(this, Object(args));
}

/**
 * A left-curried version of {@link module:lamb.application|application}. Expects the function
 * to apply and builds a function waiting for the arguments array.
 * @example
 * const arrayMax = _.apply(Math.max);
 *
 * arrayMax([4, 5, 2, 6, 1]) // => 6
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.applyTo|applyTo}
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */
var apply = _curry2(application);

/**
 * A right-curried version of {@link module:lamb.application|application}. Expects an array-like
 * object to use as arguments and builds a function waiting for the target of the application.
 * @example
 * const data = [3, 4];
 * const applyToData = _.applyTo(data);
 *
 * applyToData(_.sum) // => 7
 * applyToData(_.multiply) // => 12
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.apply|apply}
 * @since 0.47.0
 * @param {ArrayLike} args
 * @returns {Function}
 */
var applyTo = _curry2(application, true);

/**
 * Keeps building a partial application of the received function as long
 * as it's called with placeholders; applies the original function to
 * the collected parameters otherwise.<br/>
 * The function checks only the public placeholder to gain a little performance
 * as no function in Lamb is built with {@link module:lamb.asPartial|asPartial}.
 * @private
 * @param {Function} fn
 * @param {Array} argsHolder
 * @returns {Function|*}
 */
function _asPartial(fn, argsHolder) {
  return function () {
    var argsLen = arguments.length;
    var lastIdx = 0;
    var newArgs = [];
    for (var i = 0, len = argsHolder.length, boundArg; i < len; i++) {
      boundArg = argsHolder[i];
      newArgs[i] = boundArg === __ && lastIdx < argsLen ? arguments[lastIdx++] : boundArg;
    }
    while (lastIdx < argsLen) {
      newArgs[i++] = arguments[lastIdx++];
    }
    for (i = 0; i < argsLen; i++) {
      if (arguments[i] === __) {
        return _asPartial(fn, newArgs);
      }
    }
    for (i = 0, len = newArgs.length; i < len; i++) {
      if (newArgs[i] === __) {
        newArgs[i] = void 0;
      }
    }
    return fn.apply(this, newArgs);
  };
}

/**
 * Decorates the received function so that it can be called with
 * placeholders to build a partial application of it.<br/>
 * The difference with {@link module:lamb.partial|partial} is that, as long as
 * you call the generated function with placeholders, another partial application
 * of the original function will be built.<br/>
 * The final application will happen when one of the generated functions is
 * invoked without placeholders, using the parameters collected so far. <br/>
 * This function comes in handy when you need to build different specialized
 * functions starting from a basic one, but it's also useful when dealing with
 * optional parameters as you can decide to apply the function even if its arity
 * hasn't been entirely consumed.
 * @example <caption>Explaining the function's behaviour:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + c);
 *
 * f(4, 3, 2) // => 9
 * f(4, __, 2)(3) // => 9
 * f(__, 3, __)(4, __)(2) // => 9
 *
 * @example <caption>Exploiting optional parameters:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + (c || 0));
 *
 * const addFive = f(5, __);
 * addFive(2) // => 7
 *
 * const addNine = addFive(4, __);
 * addNine(11) // => 20
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.36.0
 * @param {Function} fn
 * @returns {Function}
 */
function asPartial(fn) {
  return _asPartial(fn, []);
}

/**
 * Accepts a series of functions and builds a new function. The functions in the series
 * will then be applied, in order, with the values received by the function built with
 * <code>collect</code>.<br/>
 * The collected results will be returned in an array.
 * @example
 * const user = {
 *     id: "jdoe",
 *     name: "John",
 *     surname: "Doe",
 *     scores: [2, 4, 7]
 * };
 * const getIDAndLastScore = _.collect([_.getKey("id"), _.getPath("scores.-1")]);
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * const minAndMax = _.collect([Math.min, Math.max]);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function collect(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }
  return function () {
    return map(functions, applyTo(arguments));
  };
}

/**
 * Used by curry functions to collect arguments until the arity is consumed,
 * then applies the original function.
 * @private
 * @param {Function} fn
 * @param {Number} arity
 * @param {Boolean} isRightCurry
 * @param {Boolean} isAutoCurry
 * @param {Array} argsHolder
 * @returns {Function}
 */
function _currier(fn, arity, isRightCurry, isAutoCurry, argsHolder) {
  return function () {
    var holderLen = argsHolder.length;
    var argsLen = arguments.length;
    var newArgsLen = holderLen + (argsLen > 1 && isAutoCurry ? argsLen : 1);
    var newArgs = Array(newArgsLen);
    for (var i = 0; i < holderLen; i++) {
      newArgs[i] = argsHolder[i];
    }
    for (; i < newArgsLen; i++) {
      newArgs[i] = arguments[i - holderLen];
    }
    if (newArgsLen >= arity) {
      return fn.apply(this, isRightCurry ? newArgs.reverse() : newArgs);
    } else {
      return _currier(fn, arity, isRightCurry, isAutoCurry, newArgs);
    }
  };
}

/**
 * Curries a function of arity 3.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry3(fn, isRightCurry) {
  return function (a) {
    return function (b) {
      return function (c) {
        return isRightCurry ? fn.call(this, c, b, a) : fn.call(this, a, b, c);
      };
    };
  };
}

/**
 * Prepares a function for currying. If it's not auto-currying and the arity
 * is 2 or 3 returns optimized functions, otherwise delegates the currying
 * to the <code>_currier</code> function.<br/>
 * If the desumed arity isn't greater than one, it will return the received
 * function itself, instead.
 * @private
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @param {Boolean} [isRightCurry=false]
 * @param {Boolean} [isAutoCurry=false]
 * @returns {Function}
 */
function _curry(fn, arity, isRightCurry, isAutoCurry) {
  if (arity >>> 0 !== arity) {
    arity = fn.length;
  }
  if (isAutoCurry && arity > 1 || arity > 3) {
    return _currier(fn, arity, isRightCurry, isAutoCurry, []);
  } else if (arity === 2) {
    return _curry2(fn, isRightCurry);
  } else if (arity === 3) {
    return _curry3(fn, isRightCurry);
  } else {
    return fn;
  }
}

/**
 * Transforms the evaluation of the given function in the evaluation of a sequence of functions
 * expecting only one argument. Each function of the sequence is a partial application of the
 * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
 * for right currying.
 * @example
 * const makeWithKeys = _.curry(_.make);
 * const makePerson = makeWithKeys(["name", "surname"]);
 *
 * makePerson(["John", "Doe"]) // => {name: "John", surname: "Doe"};
 * makePerson(["Mario", "Rossi"]) // => {name: "Mario", surname: "Rossi"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curry(fn, arity) {
  return _curry(fn, arity, false);
}

/**
 * Builds an auto-curried function. The resulting function can be called multiple times with
 * any number of arguments, and the original function will be applied only when the specified
 * (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
 * for right currying.
 * @example
 * const collectFourElements = _.curryable(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2)(3, 4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3, 4, 5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3)(4, 5) // => [2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.6.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryable(fn, arity) {
  return _curry(fn, arity, false, true);
}

/**
 * Same as {@link module:lamb.curryable|curryable}, but currying starts from the rightmost argument.
 * @example
 * const collectFourElements = _.curryableRight(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2)(3, 4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3, 4, 5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3)(4, 5) // => [5, 4, 3, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryable|curryable}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryableRight(fn, arity) {
  return _curry(fn, arity, true, true);
}

/**
 * Same as {@link module:lamb.curry|curry}, but currying starts from the rightmost argument.
 * @example
 * const makeWithValues = _.curryRight(_.make);
 * const makeJohnDoe = makeWithValues(["John", "Doe"]);
 *
 * makeJohnDoe(["name", "surname"]) // => {name: "John", surname: "Doe"};
 * makeJohnDoe(["firstName", "lastName"]) // => {firstName: "John", lastName: "Doe"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curry|curry}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryRight(fn, arity) {
  return _curry(fn, arity, true);
}

/**
 * Returns a function that will execute the given function only if it stops being called for the
 * specified timespan.<br/>
 * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call
 * happens immediately.
 * @example <caption>A common use case of <code>debounce</code> in a browser environment:</caption>
 * function updateLayout () {
 *     // some heavy DOM operations here
 * }
 *
 * window.addEventListener("resize", _.debounce(updateLayout, 200), false);
 *
 * // The resize event is fired repeteadly until the user stops resizing the
 * // window, while the `updateLayout` function is called only once: 200 ms
 * // after he stopped.
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.throttle|throttle}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds
 * @returns {Function}
 */
function debounce(fn, timespan) {
  var timeoutID;
  return function () {
    var args = arguments;
    var debounced = function () {
      timeoutID = null;
      fn.apply(this, args);
    }.bind(this);
    clearTimeout(timeoutID);
    timeoutID = setTimeout(debounced, timespan);
  };
}

/**
 * Returns a function that applies the original function with the arguments in reverse order.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 * _.flip(_.list)(1, 2, 3) // => [3, 2, 1]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */
function flip(fn) {
  return function () {
    var args = list.apply(null, arguments).reverse();
    return fn.apply(this, args);
  };
}

/**
 * Builds a function that returns the argument received at the given index.<br/>
 * As with {@link module:lamb.getAt|getAt} negative indexes are allowed.<br/>
 * The resulting function will return <code>undefined</code> if no arguments are
 * passed or if the index is out of bounds.
 * @example
 * const getFirstArg = _.getArgAt(0);
 * const getLastArg = _.getArgAt(-1);
 *
 * getFirstArg(1, 2, 3) // => 1
 * getLastArg(1, 2, 3) // => 3
 *
 * _.getArgAt()(1, 2, 3) // => undefined
 * _.getArgAt(6)(1, 2, 3) // => undefined
 * _.getArgAt(1)() // => undefined
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.17.0
 * @param {Number} idx
 * @returns {Function}
 */
function getArgAt(idx) {
  return function () {
    return arguments[_toNaturalIndex(idx, arguments.length)];
  };
}

/* eslint-disable jsdoc/check-param-names */

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * received by {@link module:lamb.invoke|invoke}, with the final set of <code>args</code>,
 * if present.
 * @private
 * @param {String} methodName
 * @param {Array} boundArgs
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */
function _invoke(methodName, boundArgs, target) {
  var method = target[methodName];
  if (typeof method !== "function") {
    return void 0;
  }
  var boundArgsLen = boundArgs ? _toArrayLength(boundArgs.length) : 0;
  var finalArgsLen = boundArgsLen + arguments.length - 3;
  var finalArgs = Array(finalArgsLen);
  for (var i = 0; i < boundArgsLen; i++) {
    finalArgs[i] = boundArgs[i];
  }
  for (var ofs = 3 - i; i < finalArgsLen; i++) {
    finalArgs[i] = arguments[i + ofs];
  }
  return method.apply(target, finalArgs);
}

/**
 * Builds a function that will invoke the given method name on any received object and
 * return the result. If no method with such name is found the function will return
 * <code>undefined</code>.<br/>
 * Along with the method name it's possible to supply some arguments that will be bound to the
 * method call. Further arguments can also be passed when the function is actually called, and
 * they will be concatenated to the bound ones.<br/>
 * Returning <code>undefined</code> is a behaviour meant to quickly create a case for
 * {@link module:lamb.adapter|adapter} without the need to check for the existence of the
 * desired method.<br/>
 * See also {@link module:lamb.generic|generic} to create functions out of object methods.
 * @example <caption>Basic polymorphism with <code>invoke</code>:</caption>
 * const polySlice = _.invoke("slice");
 *
 * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
 * polySlice("Hello world", 1, 3) // => "el"
 *
 * @example <caption>With bound arguments:</caption>
 * const substringFrom2 = _.invoke("substring", [2]);
 *
 * substringFrom2("Hello world") // => "llo world"
 * substringFrom2("Hello world", 5) // => "llo"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invokeOn|invokeOn}
 * @since 0.1.0
 * @param {String} methodName
 * @param {ArrayLike} [boundArgs=[]]
 * @returns {Function}
 */
function invoke(methodName, boundArgs) {
  return partial(_invoke, [methodName, boundArgs]);
}

/**
 * Accepts an object and builds a function expecting a method name, and optionally arguments,
 * to call on such object.
 * Like {@link module:lamb.invoke|invoke}, if no method with the given name is found the
 * function will return <code>undefined</code>.
 * @example
 * const isEven = n => n % 2 === 0;
 * const arr = [1, 2, 3, 4, 5];
 * const invokeOnArr = _.invokeOn(arr);
 *
 * invokeOnArr("filter", isEven) // => [2, 4]
 * invokeOnArr("slice", 1, 3) // => [2, 3]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.15.0
 * @param {Object} target
 * @returns {Function}
 */
function invokeOn(target) {
  return partial(_invoke, [__, [], target]);
}

/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * const sumArray = _.reduceWith(_.sum);
 * const sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * const square = n => n ** 2;
 * const sumSquares = _.mapArgs(sumArgs, square);
 *
 * sumSquares(1, 2, 3, 4, 5) // => 55
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.tapArgs|tapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {ListIteratorCallback} mapper
 * @returns {Function}
 */
function mapArgs(fn, mapper) {
  return pipe([list, mapWith(mapper), apply(fn)]);
}

/**
 * Builds a function that allows to "tap" into the arguments of the original one.
 * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
 * If a "tapper" isn't found the argument is passed as it is.
 * @example
 * const someObject = {count: 5};
 * const someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
 * const getDataAmount = _.tapArgs(_.sum, [_.getKey("count"), _.getKey("length")]);
 *
 * getDataAmount(someObject, someArrayData); // => 15
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.mapArgs|mapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {Function[]} tappers
 * @returns {Function}
 */
function tapArgs(fn, tappers) {
  return function () {
    var len = arguments.length;
    var tappersLen = tappers.length;
    var args = [];
    for (var i = 0; i < len; i++) {
      args.push(i < tappersLen ? tappers[i](arguments[i]) : arguments[i]);
    }
    return fn.apply(this, args);
  };
}

/**
 * Returns a function that will invoke the passed function at most once in the given timespan.<br/>
 * The first call in this case happens as soon as the function is invoked; see also
 * {@link module:lamb.debounce|debounce} for a different behaviour where the first call is delayed.
 * @example
 * const log = _.throttle(console.log.bind(console), 5000);
 *
 * log("Hi"); // console logs "Hi"
 * log("Hi again"); // nothing happens
 * // after five seconds
 * log("Hello world"); // console logs "Hello world"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.debounce|debounce}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds.
 * @returns {Function}
 */
function throttle(fn, timespan) {
  var result;
  var lastCall = 0;
  return function () {
    var now = Date.now();
    if (now - lastCall >= timespan) {
      lastCall = now;
      result = fn.apply(this, arguments);
    }
    return result;
  };
}

/**
 * Builds a function that passes only one argument to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * const weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * _.map(weights, _.unary(parseInt)) // => [2, 10, 1, 7]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.binary|binary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function unary(fn) {
  return function (a) {
    return fn.call(this, a);
  };
}

/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in synergy with {@link module:lamb.casus|casus} and
 * {@link module:lamb.invoke|invoke}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * const isEven = n => n % 2 === 0;
 * const filterString = _.compose(_.joinWith(""), _.filter);
 * const filterAdapter = _.adapter([
 *     _.invoke("filter"),
 *     _.casus(_.isType("String"), filterString)
 * ]);
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // by its nature is composable
 * const filterWithDefault = _.adapter([filterAdapter, _.always("Not implemented")]);
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.casus|casus}
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.6.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function adapter(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }
  return function () {
    var len = functions.length;
    var result;
    for (var i = 0; i < len; i++) {
      result = functions[i].apply(this, arguments);
      if (!isUndefined(result)) {
        break;
      }
    }
    return result;
  };
}

/**
 * Creates a function to check the given predicates.<br/>
 * Used to build the {@link module:lamb.allOf|allOf} and the
 * {@link module:lamb.anyOf|anyOf} functions.
 * @private
 * @param {Boolean} checkAll
 * @returns {Function}
 */
function _checkPredicates(checkAll) {
  return function (predicates) {
    if (!Array.isArray(predicates)) {
      throw _makeTypeErrorFor(predicates, "array");
    }
    return function () {
      for (var i = 0, len = predicates.length, result; i < len; i++) {
        result = predicates[i].apply(this, arguments);
        if (checkAll && !result) {
          return false;
        } else if (!checkAll && result) {
          return true;
        }
      }
      return checkAll;
    };
  };
}

/**
 * Accepts an array of predicates and builds a new one that returns true if they are all satisfied
 * by the same arguments. The functions in the array will be applied one at a time until a
 * <code>false</code> value is produced, which is returned immediately.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isPositiveEven = _.allOf([isEven, _.isGT(0)]);
 *
 * isPositiveEven(-2) // => false
 * isPositiveEven(11) // => false
 * isPositiveEven(6) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.anyOf|anyOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var allOf = _checkPredicates(true);

/**
 * Accepts an array of predicates and builds a new one that returns true if at least one of them is
 * satisfied by the received arguments. The functions in the array will be applied one at a time
 * until a <code>true</code> value is produced, which is returned immediately.
 * @example
 * const users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * const isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * const isSuperUser = _.anyOf([isInGroup("admin"), isInGroup("root")]);
 *
 * isSuperUser(users[0]) // => false
 * isSuperUser(users[1]) // => true
 * isSuperUser(users[2]) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.allOf|allOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var anyOf = _checkPredicates(false);

/**
 * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
 * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
 * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
 * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally,
 * <code>NaN</code> is equal to itself.<br/>
 * See also {@link module:lamb.is|is} for a curried version building a predicate and
 * {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ} to perform a "SameValueZero"
 * comparison.
 * @example
 * const testObject = {};
 *
 * _.areSame({}, testObject) // => false
 * _.areSame(testObject, testObject) // => true
 * _.areSame("foo", "foo") // => true
 * _.areSame(0, -0) // => false
 * _.areSame(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.is|is}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSame(a, b) {
  return a === 0 && b === 0 ? 1 / a === 1 / b : areSVZ(a, b);
}

/**
 * Builds a case for {@link module:lamb.adapter|adapter}.<br/>
 * The function will apply the received arguments to <code>fn</code> if the predicate is satisfied
 * with the same arguments, otherwise will return <code>undefined</code>.<br/>
 * See also {@link module:lamb.condition|condition} to build a condition with two branching functions
 * and {@link module:lamb.unless|unless} and {@link module:lamb.when|when} where one of the branches
 * is the identity function.
 * @example
 * const halveIfNumber = _.casus(_.isType("Number"), _.divideBy(2));
 *
 * halveIfNumber(2) // => 1
 * halveIfNumber("2") // => undefined
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @since 0.51.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function casus(predicate, fn) {
  return function () {
    return predicate.apply(this, arguments) ? fn.apply(this, arguments) : void 0;
  };
}

/**
 * Builds a function that will apply the received arguments to <code>trueFn</code>,
 * if the predicate is satisfied with the same arguments, or to <code>falseFn</code> otherwise.<br/>
 * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>,
 * it's probably better to use {@link module:lamb.adapter|adapter} to build more complex behaviours.<br/>
 * See also {@link module:lamb.unless|unless} and {@link module:lamb.when|when} as they are
 * shortcuts to common use cases.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveEvenAndDoubleOdd = _.condition(isEven, _.divideBy(2), _.multiplyBy(2));
 *
 * halveEvenAndDoubleOdd(5) // => 10
 * halveEvenAndDoubleOdd(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.2.0
 * @param {Function} predicate
 * @param {Function} trueFn
 * @param {Function} falseFn
 * @returns {Function}
 */
function condition(predicate, trueFn, falseFn) {
  return function () {
    return (predicate.apply(this, arguments) ? trueFn : falseFn).apply(this, arguments);
  };
}

/**
 * Verifies that the first given value is greater than the second.<br/>
 * Wraps the native <code>&gt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.gt(today, pastDate) // => true
 * _.gt(pastDate, today) // => false
 * _.gt(3, 4) // => false
 * _.gt(3, 3) // => false
 * _.gt(3, 2) // => true
 * _.gt(0, -0) // => false
 * _.gt(-0, 0) // => false
 * _.gt("a", "A") // => true
 * _.gt("b", "a") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gt(a, b) {
  return a > b;
}

/**
 * Verifies that the first given value is greater than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&gt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.gte(3, 4) // => false
 * _.gte(3, 3) // => true
 * _.gte(3, 2) // => true
 * _.gte(0, -0) // => true
 * _.gte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gt|gt}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gte(a, b) {
  return a >= b;
}

/**
 * A curried version of {@link module:lamb.areSame|areSame}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValue"
 * comparison.<br/>
 * See also {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ}
 * to perform a "SameValueZero" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.is(john);
 * const isNegativeZero = _.is(-0);
 * const isReallyNaN = _.is(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isNegativeZero(0) // => false
 * isNegativeZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSame|areSame}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var is = _curry2(areSame);

/**
 * A right curried version of {@link module:lamb.gt|gt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than the one received by the predicate.
 * @example
 * const isGreaterThan5 = _.isGT(5);
 *
 * isGreaterThan5(3) // => false
 * isGreaterThan5(5) // => false
 * isGreaterThan5(7) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGT = _curry2(gt, true);

/**
 * A right curried version of {@link module:lamb.gte|gte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than or equal to the one received by the predicate.
 * @example
 * const isPositiveOrZero = _.isGTE(0);
 *
 * isPositiveOrZero(-3) // => false
 * isPositiveOrZero(-0) // => true
 * isPositiveOrZero(0) // => true
 * isPositiveOrZero(5) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGT|isGT}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGTE = _curry2(gte, true);

/**
 * Verifies that the first given value is less than the second.<br/>
 * Wraps the native <code>&lt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.lt(today, pastDate) // => false
 * _.lt(pastDate, today) // => true
 * _.lt(3, 4) // => true
 * _.lt(3, 3) // => false
 * _.lt(3, 2) // => false
 * _.lt(0, -0) // => false
 * _.lt(-0, 0) // => false
 * _.lt("a", "A") // => false
 * _.lt("a", "b") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lt(a, b) {
  return a < b;
}

/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * const isLessThan5 = _.isLT(5);
 *
 * isLessThan5(7) // => false
 * isLessThan5(5) // => false
 * isLessThan5(3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLT = _curry2(lt, true);

/**
 * Verifies that the first given value is less than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&lt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.lte(3, 4) // => true
 * _.lte(3, 3) // => true
 * _.lte(3, 2) // => false
 * _.lte(0, -0) // => true
 * _.lte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lt|lt}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lte(a, b) {
  return a <= b;
}

/**
 * A right curried version of {@link module:lamb.lte|lte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than or equal to the one received by the predicate.
 * @example
 * const isNegativeOrZero = _.isLTE(0);
 *
 * isNegativeOrZero(5) // => false
 * isNegativeOrZero(-0) // => true
 * isNegativeOrZero(0) // => true
 * isNegativeOrZero(-3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLT|isLT}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLTE = _curry2(lte, true);

/**
 * Returns a predicate that negates the given one.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isOdd = _.not(isEven);
 *
 * isOdd(5) // => true
 * isOdd(4) // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @since 0.1.0
 * @param {Function} predicate
 * @returns {Function}
 */
function not(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}

/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate isn't satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.when|when} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>trueFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveUnlessIsEven = _.unless(isEven, _.divideBy(2));
 *
 * halveUnlessIsEven(5) // => 2.5
 * halveUnlessIsEven(6) // => 6
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function unless(predicate, fn) {
  return function (value) {
    return predicate.call(this, value) ? value : fn.call(this, value);
  };
}

/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate is satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.unless|unless} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>falseFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveIfEven = _.when(isEven, _.divideBy(2));
 *
 * halveIfEven(5) // => 5
 * halveIfEven(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function when(predicate, fn) {
  return function (value) {
    return predicate.call(this, value) ? fn.call(this, value) : value;
  };
}

/**
 * Sums two numbers.
 * @example
 * _.sum(4, 5) // => 9
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.add|add}
 * @since 0.50.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * const add5 = _.add(5);
 *
 * _.add5(4) // => 9
 * _.add5(-2) // => 3
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.sum|sum}
 * @since 0.1.0
 * @param {Number} a
 * @returns {Function}
 */
var add = _curry2(sum, true);

/**
 * Subtracts two numbers.
 * @example
 * _.subtract(5, 3) // => 2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.deduct|deduct}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function subtract(a, b) {
  return a - b;
}

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * const deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var deduct = _curry2(subtract, true);

/**
 * Divides two numbers.
 * @example
 * _.divide(5, 2) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.divideBy|divideBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function divide(a, b) {
  return a / b;
}

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * const halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var divideBy = _curry2(divide, true);

/**
 * Generates a sequence of values of the desired length with the provided iteratee.
 * The values being iterated, and received by the iteratee, are the results generated so far.
 * @example
 * const fibonacci = (n, idx, results) => n + (results[idx - 1] || 0);
 *
 * _.generate(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.range|range}
 * @since 0.21.0
 * @param {*} start - The starting value
 * @param {Number} len - The desired length for the sequence
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function generate(start, len, iteratee) {
  var result = [start];
  for (var i = 0, limit = len - 1; i < limit; i++) {
    result.push(iteratee(result[i], i, result));
  }
  return result;
}

/**
 * Verifies whether the received value is a finite number.<br/>
 * Behaves almost as a shim of ES6's [Number.isFinite]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isFinite(5) // => true
 * _.isFinite(new Number(5)) // => true
 * _.isFinite(Infinity) // => false
 * _.isFinite(-Infinity) // => false
 * _.isFinite("5") // => false
 * _.isFinite(NaN) // => false
 * _.isFinite(null) // => false
 *
 * @alias module:lamb.isFinite
 * @category Math
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isFinite_(value) {
  return type(value) === "Number" && isFinite(value);
}

/**
 * Verifies whether the received value is a number and an integer.
 * Behaves almost as a shim of ES6's [Number.isInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isInteger(5) // => true
 * _.isInteger(new Number(5)) // => true
 * _.isInteger(2.5) // => false
 * _.isInteger(Infinity) // => false
 * _.isInteger(-Infinity) // => false
 * _.isInteger("5") // => false
 * _.isInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isSafeInteger|isSafeInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isInteger(value) {
  return type(value) === "Number" && value % 1 === 0;
}

/**
 * Verifies whether the received value is a "safe integer", meaning that is a number and that
 * can be exactly represented as an IEEE-754 double precision number.
 * The safe integers consist of all integers from -(2<sup>53</sup> - 1) inclusive to
 * 2<sup>53</sup> - 1 inclusive.<br/>
 * Behaves almost as a shim of ES6's [Number.isSafeInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isSafeInteger(5) // => true
 * _.isSafeInteger(new Number(5)) // => true
 * _.isSafeInteger(Math.pow(2, 53) - 1) // => true
 * _.isSafeInteger(Math.pow(2, 53)) // => false
 * _.isSafeInteger(2e32) // => false
 * _.isSafeInteger(2.5) // => false
 * _.isSafeInteger(Infinity) // => false
 * _.isSafeInteger(-Infinity) // => false
 * _.isSafeInteger("5") // => false
 * _.isSafeInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isInteger|isInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isSafeInteger(value) {
  return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}

/**
 * Calculates the [arithmetic mean]{@link https://en.wikipedia.org/wiki/Arithmetic_mean} of the given list of numbers.
 * @example
 * _.mean([1, 2, 3, 4, 5, 6, 7, 8, 9]) // => 5
 * _.mean([]) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.median|median}
 * @since 0.60.0
 * @param {Number[]} numbers
 * @returns {Number}
 */
function mean(numbers) {
  return reduce(numbers, function (r, n) {
    return +n + r;
  }, 0) / numbers.length;
}

/**
 * Calculates the [median]{@link https://en.wikipedia.org/wiki/Median} of the given list of numbers.
 * @example
 * _.median([10, 2, 3, 1, 4, 5, 7]) // => 4
 * _.median([]) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.mean|mean}
 * @since 0.60.0
 * @param {Number[]} numbers
 * @returns {Number}
 */
function median(numbers) {
  var len = numbers.length >>> 0;
  if (len === 0) {
    return NaN;
  }
  var result;
  var sortedNumbers = map(numbers, Number).sort(subtract);
  if (len % 2 === 0) {
    var pivot = len / 2;
    result = (sortedNumbers[pivot - 1] + sortedNumbers[pivot]) / 2;
  } else {
    result = sortedNumbers[(len - 1) / 2];
  }
  return result;
}

/**
 * Performs the modulo operation and should not be confused with the
 * {@link module:lamb.remainder|remainder}.
 * The function performs a floored division to calculate the result and not
 * a truncated one, hence the sign of the dividend is not kept, unlike the
 * {@link module:lamb.remainder|remainder}.
 * @example
 * _.modulo(5, 3) // => 2
 * _.remainder(5, 3) // => 2
 *
 * _.modulo(-5, 3) // => 1
 * _.remainder(-5, 3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.remainder|remainder}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function modulo(a, b) {
  return a - b * Math.floor(a / b);
}

/**
 * Multiplies two numbers.
 * @example
 * _.multiply(5, 3) // => 15
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.multiplyBy|multiplyBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * const double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var multiplyBy = _curry2(multiply, true);

/**
 * Generates a random integer between two given integers, both included.
 * Note that no safety measure is taken if the provided arguments aren't integers, so
 * you may end up with unexpected (not really) results.
 * For example <code>randomInt(0.1, 1.2)</code> could be <code>2</code>.
 * @example
 *
 * _.randomInt(1, 10) // => an integer >=1 && <= 10
 *
 * @memberof module:lamb
 * @category Math
 * @since 0.1.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _forceToNumber(value) {
  var n = +value;
  return n === n ? n : 0; // eslint-disable-line no-self-compare
}

/**
 * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
 * but not including, <code>limit</code>, using the given <code>step</code>.
 * @example
 * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
 * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
 * _.range(0, 3, 1) // => [0, 1, 2]
 * _.range(-0, 3, 1) // => [-0, 1, 2]
 * _.range(1, -10, 2) // => []
 * _.range(3, 5, -1) // => []
 *
 * @example <caption>Behaviour if <code>step</code> happens to be zero:</caption>
 * _.range(2, 10, 0) // => [2]
 * _.range(2, -10, 0) // => [2]
 * _.range(2, 2, 0) // => []
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.generate|generate}
 * @since 0.1.0
 * @param {Number} start
 * @param {Number} limit
 * @param {Number} [step=1]
 * @returns {Number[]}
 */
function range(start, limit, step) {
  start = _forceToNumber(start);
  limit = _forceToNumber(limit);
  step = arguments.length === 3 ? _forceToNumber(step) : 1;
  if (step === 0) {
    return limit === start ? [] : [start];
  }
  var len = Math.max(Math.ceil((limit - start) / step), 0);
  var result = Array(len);
  for (var i = 0, last = start; i < len; i++) {
    result[i] = last;
    last += step;
  }
  return result;
}

/**
 * Gets the remainder of the division of two numbers.
 * Not to be confused with the {@link module:lamb.modulo|modulo} as the remainder
 * keeps the sign of the dividend and may lead to some unexpected results.
 * @example
 * // example of wrong usage of the remainder
 * // (in this case the modulo operation should be used)
 * const isOdd = n => _.remainder(n, 2) === 1;
 *
 * isOdd(-3) // => false as -3 % 2 === -1
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.modulo|modulo}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function remainder(a, b) {
  return a % b;
}

/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function
 * @param {Object} source
 * @param {String} key
 * @returns {Boolean}
 */
var _isOwnEnumerable = generic(Object.prototype.propertyIsEnumerable);

/**
 * Builds a list of the enumerable properties of an object.
 * The function is null-safe, unlike the public one.
 * @private
 * @param {Object} source
 * @returns {String[]}
 */
function _safeEnumerables(source) {
  var result = [];
  for (var key in source) {
    result.push(key);
  }
  return result;
}

/**
 * Checks whether the specified key is an enumerable property of the given object or not.
 * @private
 * @param {Object} source
 * @param {String} key
 * @returns {Boolean}
 */
function _isEnumerable(source, key) {
  return key in Object(source) && (_isOwnEnumerable(source, key) || ~_safeEnumerables(source).indexOf(key));
}

/**
 * Helper to retrieve the correct key while evaluating a path.
 * @private
 * @param {Object} target
 * @param {String} key
 * @param {Boolean} includeNonEnumerables
 * @returns {String|Number|Undefined}
 */
function _getPathKey(target, key, includeNonEnumerables) {
  if (includeNonEnumerables && key in Object(target) || _isEnumerable(target, key)) {
    return key;
  }
  var n = +key;
  var len = target && target.length;
  return n >= -len && n < len ? n < 0 ? n + len : n : void 0;
}

/**
 * Checks if a path is valid in the given object and retrieves the path target.
 * @private
 * @param {Object} source
 * @param {String[]} parts
 * @param {Boolean} walkNonEnumerables
 * @returns {Object}
 */
function _getPathInfo(source, parts, walkNonEnumerables) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  var target = source;
  var i = -1;
  var len = parts.length;
  var key;
  while (++i < len) {
    key = _getPathKey(target, parts[i], walkNonEnumerables);
    if (isUndefined(key)) {
      break;
    }
    target = target[key];
  }
  return i === len ? {
    isValid: true,
    target: target
  } : {
    isValid: false,
    target: void 0
  };
}

/**
 * Splits a sting path using the provided separator and returns an array
 * of path parts.
 * @private
 * @param {String} path
 * @param {String} separator
 * @returns {String[]}
 */
function _toPathParts(path, separator) {
  return String(path).split(separator || ".");
}

/**
 * Gets a nested property value from an object using the given path.<br/>
 * The path is a string with property names separated by dots by default, but
 * it can be customised with the optional third parameter.<br/>
 * You can use integers in the path, even negative ones, to refer to array-like
 * object indexes, but the priority will be given to existing object keys:
 * the last example explains this particular case.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     },
 *     scores: [
 *         {id: 1, value: 10},
 *         {id: 2, value: 20},
 *         {id: 3, value: 30}
 *     ]
 * };
 *
 * _.getPathIn(user, "name") // => "John"
 * _.getPathIn(user, "login.password") // => "abc123";
 * _.getPathIn(user, "login/user.name", "/") // => "jdoe"
 * _.getPathIn(user, "name.foo") // => undefined
 * _.getPathIn(user, "name.foo.bar") // => undefined
 *
 * @example <caption>Accessing array-like objects indexes:</caption>
 * _.getPathIn(user, "login.password.1") // => "b"
 * _.getPathIn(user, "scores.0") // => {id: 1, value: 10}
 * _.getPathIn(user, "scores.-1.value") // => 30
 *
 * @example <caption>Priority will be given to existing object keys over indexes:</caption>
 * _.getPathIn(user, "scores.-1") // => {id: 3, value: 30}
 *
 * // let's do something funny
 * user.scores["-1"] = "foo bar";
 *
 * _.getPathIn(user, "scores.-1") // => "foo bar";
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getPath|getPath}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {Object|ArrayLike} source
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {*}
 */
function getPathIn(source, path, separator) {
  return _getPathInfo(source, _toPathParts(path, separator), true).target;
}

/**
 * Builds a <code>checker</code> function meant to be used with
 * {@link module:lamb.validate|validate}.<br/>
 * Note that the function accepts multiple <code>keyPaths</code> as a means to
 * compare their values. In other words all the received <code>keyPaths</code> will be
 * passed as arguments to the <code>predicate</code> to run the test.<br/>
 * If you want to run the same single property check with multiple properties, you should build
 * multiple <code>checker</code>s and combine them with {@link module:lamb.validate|validate}.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         username: "jdoe",
 *         password: "abc123",
 *         passwordConfirm: "abc123"
 *     }
 * };
 * const pwdMatch = _.checker(
 *     _.areSame,
 *     "Passwords don't match",
 *     ["login.password", "login.passwordConfirm"]
 * );
 *
 * pwdMatch(user) // => []
 *
 * const newUser = _.setPathIn(user, "login.passwordConfirm", "avc123");
 *
 * pwdMatch(newUser) // => ["Passwords don't match", ["login.password", "login.passwordConfirm"]]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validate|validate}, {@link module:lamb.validateWith|validateWith}
 * @since 0.1.0
 * @param {Function} predicate - The predicate to test the object properties
 * @param {String} message - The error message
 * @param {String[]} keyPaths - The array of keys, or {@link module:lamb.getPathIn|paths}, to test.
 * @param {String} [pathSeparator="."]
 * @returns {Function} A checker function which returns an error in the form
 * <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
 */
function checker(predicate, message, keyPaths, pathSeparator) {
  return function (obj) {
    var getValues = partial(getPathIn, [obj, __, pathSeparator]);
    return predicate.apply(obj, map(keyPaths, getValues)) ? [] : [message, keyPaths];
  };
}

/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _unsafeKeyListFrom = _curry2(function (getKeys, source) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  return getKeys(source);
});

/**
 * Creates an array with all the enumerable properties of the given object.
 * @example <caption>Showing the difference with {@link module:lamb.keys|keys}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.keys(foo) // => ["d"]
 * _.enumerables(foo) // => ["d", "a"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.keys|keys}
 * @since 0.12.0
 * @param {Object} source
 * @returns {String[]}
 */
var enumerables = _unsafeKeyListFrom(_safeEnumerables);

/**
 * Builds an object from a list of key / value pairs like the one
 * returned by {@link module:lamb.pairs|pairs} or {@link module:lamb.ownPairs|ownPairs}.<br/>
 * In case of duplicate keys the last key / value pair is used.
 * @example
 * _.fromPairs([["a", 1], ["b", 2], ["c", 3]]) // => {"a": 1, "b": 2, "c": 3}
 * _.fromPairs([["a", 1], ["b", 2], ["a", 3]]) // => {"a": 3, "b": 2}
 * _.fromPairs([[1], [void 0, 2], [null, 3]]) // => {"1": undefined, "undefined": 2, "null": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.ownPairs|ownPairs}, {@link module:lamb.pairs|pairs}
 * @since 0.8.0
 * @param {Array<Array<String, *>>} pairsList
 * @returns {Object}
 */
function fromPairs(pairsList) {
  var result = {};
  forEach(pairsList, function (pair) {
    result[pair[0]] = pair[1];
  });
  return result;
}

/**
 * Builds a partial application of {@link module:lamb.getPathIn|getPathIn} with the given
 * path and separator, expecting the object to act upon.<br/>
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     }
 * };
 *
 * const getPwd = _.getPath("login.password");
 * const getUsername = _.getPath("login/user.name", "/");
 *
 * getPwd(user) // => "abc123";
 * getUsername(user) // => "jdoe"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getPathIn|getPathIn}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var getPath = _makePartial3(getPathIn);

/**
 * Verifies the existence of a property in an sourceect.
 * @example
 * const user1 = {name: "john"};
 *
 * _.has(user1, "name") // => true
 * _.has(user1, "surname") // => false
 * _.has(user1, "toString") // => true
 *
 * const user2 = Object.create(null);
 *
 * // not inherited through the prototype chain
 * _.has(user2, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} source
 * @param {String} key
 * @returns {Boolean}
 */
function has(source, key) {
  if (_typeof$1(source) !== "object" && !isUndefined(source)) {
    source = Object(source);
  }
  return key in source;
}

/**
 * Curried version of {@link module:lamb.has|has}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {};
 * const hasName = _.hasKey("name");
 *
 * hasName(user1) // => true
 * hasName(user2) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.has|has}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasKey = _curry2(has, true);

/**
 * Verifies if an object has the specified property and that the property isn't inherited through
 * the prototype chain.<br/>
 * @example <caption>Comparison with <code>has</code>:</caption>
 * const user = {name: "john"};
 *
 * _.has(user, "name") // => true
 * _.has(user, "surname") // => false
 * _.has(user, "toString") // => true
 *
 * _.hasOwn(user, "name") // => true
 * _.hasOwn(user, "surname") // => false
 * _.hasOwn(user, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} source
 * @param {String} key
 * @returns {Boolean}
 */
var hasOwn = generic(Object.prototype.hasOwnProperty);

/**
 * Curried version of {@link module:lamb.hasOwn|hasOwn}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user = {name: "john"};
 * const hasOwnName = _.hasOwnKey("name");
 * const hasOwnToString = _.hasOwnToString("toString");
 *
 * hasOwnName(user) // => true
 * hasOwnToString(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwn|hasOwn}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasOwnKey = _curry2(hasOwn, true);

/**
 * Builds a predicate expecting an object to check against the given key / value pair.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
 *
 * hasTheCorrectAnswer({answer: 2}) // false
 * hasTheCorrectAnswer({answer: 42}) // true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasPathValue|hasPathValue}
 * @since 0.1.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
function hasKeyValue(key, value) {
  return function (source) {
    return isUndefined(value) ? has(source, key) && source[key] === value : areSVZ(value, source[key]);
  };
}

/**
 * Builds a predicate to check if the given path exists in an sourceect and holds the desired value.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     personal: {
 *         age: 25,
 *         gender: "M"
 *     },
 *     scores: [
 *         {id: 1, value: 10, passed: false},
 *         {id: 2, value: 20, passed: false},
 *         {id: 3, value: 30, passed: true}
 *     ]
 * };
 *
 * const isMale = _.hasPathValue("personal.gender", "M");
 * const hasPassedFirstTest = _.hasPathValue("scores.0.passed", true);
 * const hasPassedLastTest = _.hasPathValue("scores.-1.passed", true);
 *
 * isMale(user) // => true
 * hasPassedFirstTest(user) // => false
 * hasPassedLastTest(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKeyValue|hasKeyValue}
 * @since 0.41.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function hasPathValue(path, value, separator) {
  return function (source) {
    var pathInfo = _getPathInfo(source, _toPathParts(path, separator), true);
    return pathInfo.isValid && areSVZ(pathInfo.target, value);
  };
}

/**
 * A null-safe version of <code>Object.keys</code>.
 * @private
 * @function
 * @param {Object} source
 * @returns {String[]}
 */
var _safeKeys = compose(Object.keys, Object);

/**
 * Retrieves the list of the own enumerable properties of an object.<br/>
 * Although [Object.keys]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
 * is already present in ECMAScript 5, its behaviour changed in the subsequent specifications
 * of the standard.<br/>
 * This function <em>shims</em> the ECMAScript 6 version, by forcing a conversion to
 * object for any value but <code>null</code> and <code>undefined</code>.
 * @example <caption>Showing the difference with {@link module:lamb.enumerables|enumerables}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.enumerables(foo) // => ["d", "a"]
 * _.keys(foo) // => ["d"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.enumerables|enumerables}
 * @since 0.25.1
 * @param {Object} source
 * @returns {String[]}
 */
var keys = _unsafeKeyListFrom(_safeKeys);

/**
 * Builds a predicate to check if the given key satisfies the desired condition
 * on an object.
 * @example
 * const users = [
 *     {name: "John", age: 25},
 *     {name: "Jane", age: 15},
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 *
 * isAdult(users[0]) // => true
 * isAdult(users[1]) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathSatisfies|pathSatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} key
 * @returns {Function}
 */
function keySatisfies(predicate, key) {
  return function (source) {
    return predicate.call(this, source[key]);
  };
}

/**
 * Builds an object from the two given lists, using the first one as keys and the last
 * one as values.<br/>
 * If the list of keys is longer than the values one, the keys will be created with
 * <code>undefined</code> values.<br/>
 * If more values than keys are supplied, the extra values will be ignored.
 * @example
 * _.make(["a", "b", "c"], [1, 2, 3]) // => {a: 1, b: 2, c: 3}
 * _.make(["a", "b", "c"], [1, 2]) // => {a: 1, b: 2, c: undefined}
 * _.make(["a", "b"], [1, 2, 3]) // => {a: 1, b: 2}
 * _.make([null, void 0, 2], [1, 2, 3]) // => {"null": 1, "undefined": 2, "2": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.tear|tear}, {@link module:lamb.tearOwn|tearOwn} for the reverse operation
 * @since 0.8.0
 * @param {String[]} names
 * @param {ArrayLike} values
 * @returns {Object}
 */
function make(names, values) {
  var result = {};
  var valuesLen = values.length;
  for (var i = 0, len = names.length; i < len; i++) {
    result[names[i]] = i < valuesLen ? values[i] : void 0;
  }
  return result;
}

/**
 * Creates a new object by applying the given function
 * to all enumerable properties of the source one.
 * @example
 * const weights = {
 *     john: "72.5 Kg",
 *     jane: "52.3 Kg"
 * };
 *
 * _.mapValues(weights, parseFloat) // => {john: 72.5, jane: 52.3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValuesWith|mapValuesWith}
 * @since 0.54.0
 * @param {Object} source
 * @param {ObjectIteratorCallback} fn
 * @returns {Object}
 */
function mapValues(source, fn) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  var result = {};
  for (var key in source) {
    result[key] = fn(source[key], key, source);
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.mapValues|mapValues}.<br/>
 * Expects a mapping function to build a new function waiting for the
 * object to act upon.
 * @example
 * const incValues = _.mapValuesWith(_.add(1));
 * const results = {
 *     first: 10,
 *     second: 5,
 *     third: 3
 * };
 *
 * incValues(results) // => {first: 11, second: 6, third: 4}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValues|mapValues}
 * @since 0.54.0
 * @function
 * @param {ObjectIteratorCallback} fn
 * @returns {Function}
 */
var mapValuesWith = _curry2(mapValues, true);

/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {Object} a
 * @param {Object} b
 * @returns {Function}
 */
function _merge(getKeys, a, b) {
  return reduce([a, b], function (result, source) {
    forEach(getKeys(source), function (key) {
      result[key] = source[key];
    });
    return result;
  }, {});
}

/**
 * Merges the enumerable properties of the provided sources into a new object.<br/>
 * In case of key homonymy the last source has precedence over the first.
 * @example
 * _.merge({a: 1, b: 3}, {b: 5, c: 4}) // => {a: 1, b: 5, c: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.merge({a: 2}, 99) // => {a: 2}
 * _.merge({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
 * @since 0.10.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var merge = partial(_merge, [enumerables]);

/**
 * Same as {@link module:lamb.merge|merge}, but only the own properties of the
 * sources are taken into account.
 * @example <caption>Showing the difference with <code>merge</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * const bar = {d: 4};
 *
 * _.merge(foo, bar) // => {a: 1, b: 2, c: 3, d: 4}
 * _.mergeOwn(foo, bar) // => {c: 3, d: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.mergeOwn([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.mergeOwn("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.mergeOwn({a: 2}, 99) // => {a: 2}
 * _.mergeOwn({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.merge|merge} to merge all enumerable properties
 * @since 0.12.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var mergeOwn = partial(_merge, [keys]);

/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function
 * @param {Object} source
 * @returns {Function}
 */
var _keyToPairIn = _curry2(function (source, key) {
  return [key, source[key]];
});

/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _pairsFrom = _curry2(function (getKeys, source) {
  return map(getKeys(source), _keyToPairIn(source));
});

/**
 * Same as {@link module:lamb.pairs|pairs}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * See also {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example <caption>Showing the difference with <code>pairs</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.pairs(foo) // => [["c", 3], ["b", 2], ["a", 1]]
 * _.ownPairs(foo) // => [["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pairs|pairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.12.0
 * @param {Object} source
 * @returns {Array<Array<String, *>>}
 */
var ownPairs = _pairsFrom(keys);

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _valuesFrom = _curry2(function (getKeys, source) {
  return map(getKeys(source), function (key) {
    return source[key];
  });
});

/**
 * Same as {@link module:lamb.values|values}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * @example <caption>Showing the difference with <code>values</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.values(foo) // => [3, 2, 1]
 * _.ownValues(foo) // => [3]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.values|values}
 * @since 0.12.0
 * @param {Object} source
 * @returns {Array}
 */
var ownValues = _valuesFrom(keys);

/**
 * Converts an object into an array of key / value pairs of its enumerable properties.<br/>
 * See also {@link module:lamb.ownPairs|ownPairs} for picking only the own enumerable
 * properties and {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example
 * _.pairs({a: 1, b: 2, c: 3}) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownPairs|ownPairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.8.0
 * @param {Object} source
 * @returns {Array<Array<String, *>>}
 */
var pairs = _pairsFrom(enumerables);

/**
 * Checks if the provided path exists in the given object.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * _.pathExistsIn(user, "address.city") // => true
 * _.pathExistsIn(user, "address.country") // => false
 * _.pathExistsIn(user, "scores.1") // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathExists|pathExists}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {Object} source
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Boolean}
 */
function pathExistsIn(source, path, separator) {
  return _getPathInfo(source, _toPathParts(path, separator), true).isValid;
}

/**
 * Builds a partial application of {@link module:lamb.pathExistsIn|pathExistsIn} using the given
 * path and the optional separator. The resulting function expects the object to check.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * const hasCity = _.pathExists("address.city");
 * const hasCountry = _.pathExists("address.country");
 * const hasAtLeastThreeScores = _.pathExists("scores.2");
 *
 * hasCity(user) // => true
 * hasCountry(user) // => false
 * hasAtLeastThreeScores(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var pathExists = _makePartial3(pathExistsIn);

/**
 * Builds a predicate that verifies if a condition is satisfied for the given
 * path in an object.<br/>
 * Like the other "path functions" you can use integers in the path, even
 * negative ones, to refer to array-like object indexes, but the priority will
 * be given to existing object keys.
 * @example
 * const user = {
 *     name: "John",
 *     performance: {
 *         scores: [1, 5, 10]
 *     }
 * };
 *
 * const gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
 * const hadAGoodStart = _.pathSatisfies(_.isGT(6), "performance.scores.0");
 *
 * gotAnHighScore(user) // => true
 * hadAGoodStart(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.keySatisfies|keySatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
function pathSatisfies(predicate, path, separator) {
  return function (source) {
    var pathInfo = _getPathInfo(source, _toPathParts(path, separator), true);
    return predicate.call(this, pathInfo.target);
  };
}

/**
 * Returns an object containing only the specified properties of the given object.<br/>
 * Non existent properties will be ignored.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.pickIn(user, ["name", "age"]) // => {"name": "john", "age": 30};
 * _.pickIn(user, ["name", "email"]) // => {"name": "john"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIf|pickIf}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} whitelist
 * @returns {Object}
 */
function pickIn(source, whitelist) {
  var result = {};
  for (var i = 0, len = whitelist.length, key; i < len; i++) {
    key = whitelist[i];
    if (has(source, key)) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.pickIn|pickIn}, expecting a whitelist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.pick(["id", "active"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const select = _.compose(_.mapWith, _.pick);
 * const selectUserInfo = select(["id", "active"]);
 *
 * selectUserInfo(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pickIf|pickIf}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.35.0
 * @param {String[]} whitelist
 * @returns {Function}
 */
var pick = _curry2(pickIn, true);

/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be included in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const pickIfIsString = _.pickIf(_.isType("String"));
 *
 * pickIfIsString(user) // => {name: "john", surname: "doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
function pickIf(predicate) {
  return function (source) {
    if (isNil(source)) {
      throw _makeTypeErrorFor(source, "object");
    }
    var result = {};
    for (var key in source) {
      if (predicate(source[key], key, source)) {
        result[key] = source[key];
      }
    }
    return result;
  };
}

/**
 * Creates a copy of the given object with its enumerable keys renamed as
 * indicated in the provided lookup table.
 * @example
 * const person = {"firstName": "John", "lastName": "Doe"};
 * const keysMap = {"firstName": "name", "lastName": "surname"};
 *
 * _.renameIn(person, keysMap) // => {"name": "John", "surname": "Doe"}
 *
 * @example <caption>It's safe using it to swap keys:</caption>
 * const keysMap = {"firstName": "lastName", "lastName": "firstName"};
 *
 * _.renameIn(person, keysMap) // => {"lastName": "John", "firstName": "Doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} source
 * @param {Object} keysMap
 * @returns {Object}
 */
function renameIn(source, keysMap) {
  keysMap = Object(keysMap);
  var result = {};
  var oldKeys = enumerables(source);
  for (var prop in keysMap) {
    if (~oldKeys.indexOf(prop)) {
      result[keysMap[prop]] = source[prop];
    }
  }
  for (var i = 0, len = oldKeys.length, key; i < len; i++) {
    key = oldKeys[i];
    if (!(key in keysMap || key in result)) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.renameIn|renameIn} expecting a
 * <code>keysMap</code> to build a function waiting for the object to act upon.
 * @example
 * const persons = [
 *     {"firstName": "John", "lastName": "Doe"},
 *     {"first_name": "Mario", "last_name": "Rossi"},
 * ];
 * const normalizeKeys = _.rename({
 *     "firstName": "name",
 *     "first_name": "name",
 *     "lastName": "surname",
 *     "last_name": "surname"
 * });
 *
 * _.map(persons, normalizeKeys) // =>
 * // [
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} keysMap
 * @returns {Function}
 */
var rename = _curry2(renameIn, true);

/**
 * Uses the provided function as a <code>keysMap</code> generator and returns
 * a function expecting the object whose keys we want to {@link module:lamb.renameIn|renameIn}.
 * @example
 * const person = {"NAME": "John", "SURNAME": "Doe"};
 * const arrayToLower = _.mapWith(_.invoke("toLowerCase"));
 * const makeLowerKeysMap = function (source) {
 *     const sourceKeys = _.keys(source);
 *
 *     return _.make(sourceKeys, arrayToLower(sourceKeys));
 * };
 * const lowerKeysFor = _.renameWith(makeLowerKeysMap);
 *
 * lowerKeysFor(person) // => {"name": "John", "surname": "doe"};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.rename|rename}
 * @since 0.26.0
 * @param {Function} fn
 * @returns {Function}
 */
function renameWith(fn) {
  return function (source) {
    return renameIn(source, fn(source));
  };
}

/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
function _setIn(source, key, value) {
  var result = {};
  for (var prop in source) {
    result[prop] = source[prop];
  }
  result[key] = value;
  return result;
}

/**
 * Sets the specified key to the given value in a copy of the provided object.<br/>
 * All the remaining enumerable keys of the source object will be simply copied in the
 * result object without breaking references.<br/>
 * If the specified key is not part of the source object, it will be added to the
 * result.<br/>
 * The main purpose of the function is to work on simple plain objects used as
 * data structures, such as JSON objects, and makes no effort to play nice with
 * objects created from an OOP perspective (it's not worth it).<br/>
 * For example the prototype of the result will be <code>Object</code>'s regardless
 * of the <code>source</code>'s one.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 *
 * _.setIn(user, "name", "Jane") // => {name: "Jane", surname: "Doe", age: 30}
 * _.setIn(user, "gender", "male") // => {name: "John", surname: "Doe", age: 30, gender: "male"}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setKey|setKey}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
function setIn(source, key, value) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  return _setIn(source, key, value);
}

/**
 * Builds a partial application of {@link module:lamb.setIn|setIn} with the provided
 * <code>key</code> and <code>value</code>.<br/>
 * The resulting function expects the object to act upon.<br/>
 * Please refer to {@link module:lamb.setIn|setIn}'s description for explanations about
 * how the copy of the source object is made.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 * const setAgeTo40 = _.setKey("age", 40);
 *
 * setAgeTo40(user) // => {name: "john", surname: "doe", age: 40}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.setIn|setIn}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
var setKey = _makePartial3(setIn);

/**
 * Accepts a target object and a key name and verifies that the target is an array and that
 * the key is an existing index.
 * @private
 * @param {Object} target
 * @param {String|Number} key
 * @returns {Boolean}
 */
function _isArrayIndex(target, key) {
  var n = +key;
  return Array.isArray(target) && n % 1 === 0 && !(n < 0 && _isEnumerable(target, key));
}

/**
 * Sets the object's property targeted by the given path to the desired value.<br/>
 * Works with arrays and is able to set their indexes, even negative ones.
 * @private
 * @param {Object|Array} source
 * @param {String[]} parts
 * @param {*} value
 * @returns {Object|Array}
 */
function _setPathIn(source, parts, value) {
  var key = parts[0];
  var partsLen = parts.length;
  var v;
  if (partsLen === 1) {
    v = value;
  } else {
    var targetKey = _getPathKey(source, key, false);
    v = _setPathIn(isUndefined(targetKey) ? targetKey : source[targetKey], slice(parts, 1, partsLen), value);
  }
  return _isArrayIndex(source, key) ? _setIndex(source, key, v) : _setIn(source, key, v);
}

/**
 * Allows to change a nested value in a copy of the provided object.<br/>
 * The function will delegate the "set action" to {@link module:lamb.setIn|setIn} or
 * {@link module:lamb.setAt|setAt} depending on the value encountered in the path,
 * so please refer to the documentation of those functions for specifics about the
 * implementation.<br/>
 * Note anyway that the distinction will be between <code>Array</code>s, delegated
 * to {@link module:lamb.setAt|setAt}, and everything else (including array-like objects),
 * which will be delegated to {@link module:lamb.setIn|setIn}.<br/>
 * As a result of that, array-like objects will be converted to objects having numbers as keys
 * and paths targeting non-object values will be converted to empty objects.<br/>
 * You can anyway target array elements using integers in the path, even negative ones, but
 * the priority will be given to existing, and enumerable, object keys.<br/>
 * Non-enumerable properties encountered in the path will be considered as non-existent properties.<br/>
 * Like {@link module:lamb.getPathIn|getPathIn} or {@link module:lamb.getPath|getPath} you can
 * use custom path separators.
 * @example
 * const user = {id: 1, status: {active : false, scores: [2, 4, 6]}};
 *
 * _.setPathIn(user, "status.active", true) // => {id: 1, status: {active : true, scores: [2, 4, 6]}}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.setPathIn(user, "status.scores.0", 8) // => {id: 1, status: {active : false, scores: [8, 4, 6]}}
 *
 * // you can use negative indexes as well
 * _.setPathIn(user, "status.scores.-1", 8) // => {id: 1, status: {active : false, scores: [2, 4, 8]}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.setPathIn(user, "scores.0.value", 8);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 8, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPath|setPath}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */
function setPathIn(source, path, value, separator) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  return _setPathIn(source, _toPathParts(path, separator), value);
}

/**
 * Builds a partial application of {@link module:lamb.setPathIn|setPathIn} expecting the
 * object to act upon.<br/>
 * See {@link module:lamb.setPathIn|setPathIn} for more details and examples.
 * @example
 * const user = {id: 1, status: {active: false}};
 * const activate = _.setPath("status.active", true);
 *
 * activate(user) // => {id: 1, status: {active: true}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPathIn|setPathIn}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function setPath(path, value, separator) {
  return function (source) {
    return setPathIn(source, path, value, separator);
  };
}

/**
 * Returns a copy of the source object without the specified properties.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.skipIn(user, ["name", "age"]) // => {surname: "doe"};
 * _.skipIn(user, ["name", "email"]) // => {surname: "doe", age: 30};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} blacklist
 * @returns {Object}
 */
function skipIn(source, blacklist) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }
  var result = {};
  var props = make(blacklist, []);
  for (var key in source) {
    if (!(key in props)) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * A curried version of {@link module:lamb.skipIn|skipIn}, expecting a blacklist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.skip(["name", "surname"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const discard = _.compose(_.mapWith, _.skip);
 * const discardNames = discard(["name", "surname"]);
 *
 * discardNames(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.35.0
 * @param {String[]} blacklist
 * @returns {Function}
 */
var skip = _curry2(skipIn, true);

/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be omitted in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const skipIfIstring = _.skipIf(_.isType("String"));
 *
 * skipIfIstring(user) // => {age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
var skipIf = compose(pickIf, not);

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create an array containing a list
 * of the keys in its first index and the corresponding list of values
 * in the second one.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _tearFrom = _curry2(function (getKeys, source) {
  return reduce(getKeys(source), function (result, key) {
    result[0].push(key);
    result[1].push(source[key]);
    return result;
  }, [[], []]);
});

/**
 * Tears an object apart by transforming it in an array of two lists: one containing
 * its enumerable keys, the other containing the corresponding values.<br/>
 * Although this "tearing apart" may sound as a rather violent process, the source
 * object will be unharmed.
 * @example
 * _.tear({a: 1, b: 2, c: 3}) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tearOwn|tearOwn}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.8.0
 * @param {Object} source
 * @returns {Array<String[], Array>}
 */
var tear = _tearFrom(enumerables);

/**
 * Same as {@link module:lamb.tear|tear}, but only the own properties of the object are
 * taken into account.
 * @example <caption>Showing the difference with <code>tear</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.tear(foo) // => [["c", "b", "a"], [3, 2, 1]]
 * _.tearOwn(foo) // => [["c"], [3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tear|tear}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.12.0
 * @param {Object} source
 * @returns {Array<String[], Array>}
 */
var tearOwn = _tearFrom(keys);

/**
 * Creates a copy of the given object having the desired key value updated by applying
 * the provided function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIn(user, "name", toUpperCase) // => {name: "JOHN", visits: 2}
 * _.updateIn(user, "surname", toUpperCase) // => {name: "John", visits: 2}
 *
 * @example <caption>Non-enumerable properties will be treated as non-existent:</caption>
 * const user = Object.create({name: "John"}, {visits: {value: 2}});
 *
 * _.updateIn(user, "visits", _.add(1)) // => {name: "John", visits: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updateKey|updateKey}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {Object} source
 * @param {String} key
 * @param {Function} updater
 * @returns {Object}
 */
function updateIn(source, key, updater) {
  return _isEnumerable(source, key) ? _setIn(source, key, updater(source[key])) : _merge(enumerables, source, {});
}

/**
 * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
 * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const incrementVisits = _.updateKey("visits", _.add(1));
 *
 * incrementVisits(user) // => {name: "John", visits: 3}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.updateIn|updateIn}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {String} key
 * @param {Function} updater
 * @returns {Function}
 */
var updateKey = _makePartial3(updateIn);

/**
 * Allows to change a nested value in a copy of the given object by applying the provided
 * function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const inc = _.add(1);
 *
 * _.updatePathIn(user, "status.visits", inc) // => {id: 1, status: {scores: [2, 4, 6]}, visits: 1}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.updatePathIn(user, "status.scores.0", inc) // => {id: 1, status: {scores: [3, 4, 6], visits: 0}}
 *
 * // you can use negative indexes as well
 * _.updatePathIn(user, "status.scores.-1", inc) // => {id: 1, status: {scores: [2, 4, 7], visits: 0}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.updatePathIn(user, "scores.0.value", inc);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 3, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePath|updatePath}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */
function updatePathIn(source, path, updater, separator) {
  var parts = _toPathParts(path, separator);
  var pathInfo = _getPathInfo(source, parts, false);
  if (pathInfo.isValid) {
    return _setPathIn(source, parts, updater(pathInfo.target));
  } else {
    return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source, {});
  }
}

/**
 * Builds a partial application of {@link module:lamb.updatePathIn|updatePathIn}
 * expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const incrementScores = _.updatePath("status.scores", _.mapWith(_.add(1)))
 *
 * incrementScores(user) // => {id: 1, status: {scores: [3, 5, 7], visits: 0}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePathIn|updatePathIn}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Function}
 */
function updatePath(path, updater, separator) {
  return function (source) {
    return updatePathIn(source, path, updater, separator);
  };
}

/**
 * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * _.validate(user1, userCheckers) // => []
 * _.validate(user2, userCheckers) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validateWith|validateWith}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Object} source
 * @param {Function[]} checkers
 * @returns {Array<Array<String, String[]>>} An array of errors in the form returned by
 * {@link module:lamb.checker|checker}, or an empty array.
 */
function validate(source, checkers) {
  return reduce(checkers, function (errors, _checker) {
    var result = _checker(source);
    result.length && errors.push(result);
    return errors;
  }, []);
}

/**
 * A curried version of {@link module:lamb.validate|validate} accepting a list of
 * {@link module:lamb.checker|checkers} and returning a function expecting the object to validate.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 * const validateUser = _.validateWith(userCheckers);
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * validateUser(user1) // => []
 * validateUser(user2) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.validate|validate}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Function[]} checkers
 * @returns {Function}
 */
var validateWith = _curry2(validate, true);

/**
 * Generates an array with the values of the enumerable properties of the given object.<br/>
 * See also {@link module:lamb.ownValues|ownValues} to pick only from the own properties of the object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.values(user) // => ["john", "doe", 30]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownValues|ownValues}
 * @since 0.1.0
 * @param {Object} source
 * @returns {Array}
 */
var values = _valuesFrom(enumerables);

/**
 * A null-safe function to repeat the source string the desired amount of times.
 * @private
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */
function _repeat(source, times) {
  var result = "";
  for (var i = 0; i < times; i++) {
    result += source;
  }
  return result;
}

/**
 * Builds the prefix or suffix to be used when padding a string.
 * @private
 * @param {String} source
 * @param {String} char
 * @param {Number} len
 * @returns {String}
 */
function _getPadding(source, char, len) {
  if (!isNil(source) && type(source) !== "String") {
    source = String(source);
  }
  return _repeat(String(char)[0] || "", Math.ceil(len - source.length));
}

/**
 * Pads a string to the desired length with the given char starting from the beginning of the string.
 * @example
 * _.padLeft("foo", "-", 0) // => "foo"
 * _.padLeft("foo", "-", -1) // => "foo"
 * _.padLeft("foo", "-", 5) // => "--foo"
 * _.padLeft("foo", "-", 3) // => "foo"
 * _.padLeft("foo", "ab", 7) // => "aaaafoo"
 * _.padLeft("foo", "", 5) // => "foo"
 * _.padLeft("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padRight|padRight}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */
function padLeft(source, char, len) {
  return _getPadding(source, char, len) + source;
}

/**
 * Pads a string to the desired length with the given char starting from the end of the string.
 * @example
 * _.padRight("foo", "-", 0) // => "foo"
 * _.padRight("foo", "-", -1) // => "foo"
 * _.padRight("foo", "-", 5) // => "foo--"
 * _.padRight("foo", "-", 3) // => "foo"
 * _.padRight("foo", "ab", 7) // => "fooaaaa"
 * _.padRight("foo", "", 5) // => "foo"
 * _.padRight("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padLeft|padLeft}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */
function padRight(source, char, len) {
  return source + _getPadding(source, char, len);
}

/**
 * Builds a new string by repeating the source string the desired amount of times.<br/>
 * Note that unlike the current ES6 proposal for
 * [String.prototype.repeat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat},
 * this function doesn't throw a RangeError if <code>times</code> is negative,
 * but returns an empty string instead.
 * @example
 * _.repeat("Hello", -1) // => ""
 * _.repeat("Hello", 1) // => "Hello"
 * _.repeat("Hello", 3) // => "HelloHelloHello"
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */
function repeat(source, times) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "string");
  }
  return _repeat(source, Math.floor(times));
}

/**
 * Builds a partial application of [<code>String.prototype.replace</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
 * with the given needle and substitution.<br/>
 * Please refer to MDN docs for more insights and examples.
 * @example
 * const htmlString = "<p>Lorem <strong class=\"foo bar\">ipsum dolor</strong> sit amet</p>";
 * const stripHTML = _.replace(/<[^>]+>/g, "");
 *
 * stripHTML(htmlString) // => "Lorem ipsum dolor sit amet"
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see [<code>String.prototype.replace</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace} on MDN.
 * @since 0.60.0
 * @param {RegExp|String} needle
 * @param {Function|String} sub
 * @returns {Function} <code>(haystack: String) => String</code>
 */
var replace = _makePartial3(generic(String.prototype.replace));

/**
 * Splits a string into an array of substrings using the given separator.
 * @example
 * _.split("Jan,Feb,Mar,Apr,May", ",") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 * _.split("Jan, Feb , Mar,Apr,   May", /\s*,\s*‍/) // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.splitBy|splitBy}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String} source
 * @param {String|RegExp} separator
 * @returns {String[]}
 */
var split = binary(generic(String.prototype.split));

/**
 * A curried version of {@link module:lamb.split|split} that accepts
 * a separator and builds a function expecting the string to split.
 * @example
 * const splitByCommma = _.splitBy(",");
 *
 * splitByCommma("Jan,Feb,Mar,Apr,May") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.split|split}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String|RegExp} separator
 * @returns {Function}
 */
var splitBy = _curry2(split, true);

/**
 * A generic version of <code>String.prototype.search</code>
 * @private
 * @function
 * @param {String} s
 * @param {RegExp} pattern
 * @returns {Number}
 */
var _search = generic(String.prototype.search);

/**
 * Builds a predicate expecting a string to test against the given regular expression pattern.
 * @example
 * const hasNumbersOnly = _.testWith(/^\d+$/);
 *
 * hasNumbersOnly("123") // => true
 * hasNumbersOnly("123 Kg") // => false
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {RegExp} pattern
 * @returns {Function}
 */
function testWith(pattern) {
  return function (s) {
    return _search(s, pattern) !== -1;
  };
}

/**
 * Accepts a constructor and builds a predicate expecting an object,
 * which will be tested to verify whether the prototype of the constructor
 * is in its prototype chain.<br/>
 * Wraps in a convenient way the native
 * [instanceof]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof} operator.
 * @example
 * function SomeObjA () {}
 *
 * const a = new SomeObjA();
 * const sObj = new String("foo");
 * const s = "foo";
 *
 * _.isInstanceOf(Object)(a) // => true
 * _.isInstanceOf(SomeObjA)(a) // => true
 *
 * _.isInstanceOf(Object)(sObj) // => true
 * _.isInstanceOf(String)(sObj) // => true
 *
 * _.isInstanceOf(Object)(s) // => false
 * _.isInstanceOf(String)(s) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.47.0
 * @param {*} constructor
 * @returns {Function}
 */
function isInstanceOf(constructor) {
  return function (obj) {
    return obj instanceof constructor;
  };
}

/**
 * Builds a predicate that expects a value to check against the specified type.
 * @example
 * const isString = _.isType("String");
 *
 * isString("Hello") // => true
 * isString(new String("Hi")) // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.type|type}
 * @since 0.1.0
 * @param {String} typeName
 * @returns {Function}
 */
function isType(typeName) {
  return function (value) {
    return type(value) === typeName;
  };
}

var _ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __: __,
  adapter: adapter,
  add: add,
  allOf: allOf,
  always: always,
  anyOf: anyOf,
  append: append,
  appendTo: appendTo,
  application: application,
  apply: apply,
  applyTo: applyTo,
  areSVZ: areSVZ,
  areSame: areSame,
  aritize: aritize,
  asPartial: asPartial,
  binary: binary,
  casus: casus,
  checker: checker,
  clamp: clamp,
  clampWithin: clampWithin,
  collect: collect,
  compose: compose,
  condition: condition,
  contains: contains,
  count: count,
  countBy: countBy,
  curry: curry,
  curryRight: curryRight,
  curryable: curryable,
  curryableRight: curryableRight,
  debounce: debounce,
  deduct: deduct,
  difference: difference,
  divide: divide,
  divideBy: divideBy,
  drop: drop,
  dropFrom: dropFrom,
  dropLastWhile: dropLastWhile,
  dropWhile: dropWhile,
  enumerables: enumerables,
  every: every,
  everyIn: everyIn,
  filter: filter,
  filterWith: filterWith,
  find: find,
  findIndex: findIndex,
  findIndexWhere: findIndexWhere,
  findLast: findLast,
  findLastIndex: findLastIndex,
  findLastIndexWhere: findLastIndexWhere,
  findLastWhere: findLastWhere,
  findWhere: findWhere,
  flatMap: flatMap,
  flatMapWith: flatMapWith,
  flatten: flatten,
  flip: flip,
  forEach: forEach,
  fromPairs: fromPairs,
  generate: generate,
  generic: generic,
  getArgAt: getArgAt,
  getAt: getAt,
  getIn: getIn,
  getIndex: getIndex,
  getKey: getKey,
  getPath: getPath,
  getPathIn: getPathIn,
  group: group,
  groupBy: groupBy,
  gt: gt,
  gte: gte,
  has: has,
  hasKey: hasKey,
  hasKeyValue: hasKeyValue,
  hasOwn: hasOwn,
  hasOwnKey: hasOwnKey,
  hasPathValue: hasPathValue,
  head: head,
  identity: identity,
  index: index,
  indexBy: indexBy,
  init: init$1,
  insert: insert,
  insertAt: insertAt,
  intersection: intersection,
  invoke: invoke,
  invokeOn: invokeOn,
  is: is,
  isFinite: isFinite_,
  isGT: isGT,
  isGTE: isGTE,
  isIn: isIn,
  isInstanceOf: isInstanceOf,
  isInteger: isInteger,
  isLT: isLT,
  isLTE: isLTE,
  isNil: isNil,
  isNull: isNull,
  isSVZ: isSVZ,
  isSafeInteger: isSafeInteger,
  isType: isType,
  isUndefined: isUndefined,
  join: join,
  joinWith: joinWith,
  keySatisfies: keySatisfies,
  keys: keys,
  last: last,
  list: list,
  lt: lt,
  lte: lte,
  make: make,
  map: map,
  mapArgs: mapArgs,
  mapValues: mapValues,
  mapValuesWith: mapValuesWith,
  mapWith: mapWith,
  mean: mean,
  median: median,
  merge: merge,
  mergeOwn: mergeOwn,
  modulo: modulo,
  multiply: multiply,
  multiplyBy: multiplyBy,
  not: not,
  ownPairs: ownPairs,
  ownValues: ownValues,
  padLeft: padLeft,
  padRight: padRight,
  pairs: pairs,
  partial: partial,
  partialRight: partialRight,
  partition: partition,
  partitionWith: partitionWith,
  pathExists: pathExists,
  pathExistsIn: pathExistsIn,
  pathSatisfies: pathSatisfies,
  pick: pick,
  pickIf: pickIf,
  pickIn: pickIn,
  pipe: pipe,
  pluck: pluck,
  pluckFrom: pluckFrom,
  pull: pull,
  pullFrom: pullFrom,
  randomInt: randomInt,
  range: range,
  reduce: reduce,
  reduceRight: reduceRight,
  reduceRightWith: reduceRightWith,
  reduceWith: reduceWith,
  remainder: remainder,
  rename: rename,
  renameIn: renameIn,
  renameWith: renameWith,
  repeat: repeat,
  replace: replace,
  reverse: reverse,
  rotate: rotate,
  rotateBy: rotateBy,
  setAt: setAt,
  setIn: setIn,
  setIndex: setIndex,
  setKey: setKey,
  setPath: setPath,
  setPathIn: setPathIn,
  shallowFlatten: shallowFlatten,
  skip: skip,
  skipIf: skipIf,
  skipIn: skipIn,
  slice: slice,
  sliceAt: sliceAt,
  some: some,
  someIn: someIn,
  sort: sort,
  sortWith: sortWith,
  sortedInsert: sortedInsert,
  sorter: sorter,
  sorterDesc: sorterDesc,
  split: split,
  splitBy: splitBy,
  subtract: subtract,
  sum: sum,
  symmetricDifference: symmetricDifference,
  tail: tail,
  take: take,
  takeFrom: takeFrom,
  takeLastWhile: takeLastWhile,
  takeWhile: takeWhile,
  tapArgs: tapArgs,
  tear: tear,
  tearOwn: tearOwn,
  testWith: testWith,
  throttle: throttle,
  transpose: transpose,
  type: type,
  unary: unary,
  union: union,
  unionBy: unionBy,
  uniques: uniques,
  uniquesBy: uniquesBy,
  unless: unless,
  updateAt: updateAt,
  updateIn: updateIn,
  updateIndex: updateIndex,
  updateKey: updateKey,
  updatePath: updatePath,
  updatePathIn: updatePathIn,
  validate: validate,
  validateWith: validateWith,
  values: values,
  when: when,
  zip: zip,
  zipWithIndex: zipWithIndex
});

/**
* @module @svizzle/utils/any-boolean
*/

/**
 * Return true if the input is an array
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isArray([])
true
> isArray([1, 2])
true
> isArray({a: 1})
false
> isArray('foo')
false

> function returnArgs () {
	return arguments;
}
> isArray(returnArgs())
false
 *
 * @since 0.1.0
 */
var isArray = isType('Array');

/**
 * Return true if the input is not a NaN.
 * Remember that {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior|isNaN coerces the input with Number()} to the output can be a bit surprising.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNaN(1)
true
> isNotNaN(Infinity)
true
> isNotNaN([123])
true
> isNotNaN('123')
true
> isNotNaN(true)
true
> isNotNaN(false)
true
> isNotNaN(null)
true
> isNotNaN([1, 2])
false
> isNotNaN({a: 1})
false
> isNotNaN('123px')
false
> isNotNaN('foo')
false
> isNotNaN(undefined)
false
> isNotNaN(NaN)
false

> function returnArgs () {
	return arguments;
}
> isNotNaN(returnArgs())
false
 *
 * @since 0.1.0
 */
var isNotNaN = not(isNaN);

/**
 * Return true if the input is not undefined or null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNil(1)
true
> isNotNil(Infinity)
true
> isNotNil('123')
true
> isNotNil('123px')
true
> isNotNil([1, 2])
true
> isNotNil({a: 1})
true
> isNotNil(true)
true
> isNotNil(false)
true
> isNotNil(NaN)
true

> isNotNil(undefined)
false
> isNotNil(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNil(returnArgs())
false
 *
 * @since 0.2.0
 */
var isNotNil = not(isNil);

/**
 * Return true if the input is not null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNull(1)
true
> isNotNull(Infinity)
true
> isNotNull('123')
true
> isNotNull('123px')
true
> isNotNull([1, 2])
true
> isNotNull({a: 1})
true
> isNotNull(true)
true
> isNotNull(false)
true
> isNotNull(NaN)
true
> isNotNull(undefined)
true

> isNotNull(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNull(returnArgs())
true
 *
 * @since 0.4.0
 */
var isNotNull = not(isNull);

/**
 * Return true if the input is a function
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isFunction(() => 2)
true
> makeFunc = n => x => x + n;
> isFunction(makeFunc(3))
true
> isFunction(1)
false
> isFunction(NaN)
false
> isFunction(Infinity)
false
> isFunction([1, 2])
false
> isFunction({a: 1})
false
> isFunction('foo')
false
> function returnArgs () {return arguments}
> isFunction(returnArgs())
false
 *
 * @since 0.12.0
 */
var isFunction = isType('Function');

/**
 * Return true if the input is a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNumber(1)
true
> isNumber(NaN)
true
> isNumber(Infinity)
true
> isNumber({a: 1})
false
> isNumber('foo')
false

> function returnArgs () {
	return arguments;
}
> isNumber(returnArgs())
false
 *
 * @since 0.1.0
 */
var isNumber = isType('Number');

/**
 * Return true if the input is an object
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isObject({a: 1})
true
> isObject([])
false
> isObject(1)
false
> isObject(NaN)
false
> isObject(Infinity)
false
> isObject('foo')
false

> function returnArgs () {
	return arguments;
}
> isObject(returnArgs())
false
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isObjectWith|isObjectWith}
 */
var isObject = isType('Object');

/**
 * Return true if the input is a promise
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isPromise(aFuncReturningAPromise())
true
> isPromise({a: 1})
false
 *
 * @since 0.15.0
 */
allOf([isNotNil, function (obj) {
  return obj.then && isFunction(obj.then);
}]);

/**
 * Return true if the input is a valid number (including not being NaN)
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	1,
	1.2,
	Infinity,
].forEach(x => {
	isValidNumber(x)
});
[true, ...]

> [
	[],
	[123],
	[1, 2],
	{a: 1},
	'',
	'123',
	'123px',
	'foo',
	true,
	null,
	undefined,
	NaN,
	returnArgs()
].forEach(x => {
	isValidNumber(x)
});
[false, ...]
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isValidNumberWith|isValidNumberWith}
 */
var isValidNumber = allOf([isNumber, isNotNaN]);

/**
 * Return the negated input.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> negate(true)
false
> negate(false)
true
> negate(1)
false
> negate(0)
true
> negate('a')
false
> negate('')
true
> negate(null)
true
> negate(NaN)
true
> negate(undefined)
true
> negate([])
false
> negate({})
false
 * @since 0.10.0
 */
var negate = function negate(x) {
  return !x;
};

/**
 * Return true if the input, converted to Number, is indeed a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[],
	[2],
	'',
	'123',
	null,
	true,
].forEach(x => {
	toNumberisValidNumber(x)
});
[true, ...]

> [
	{a: 1},
	[1, 2],
	'123px',
	'foo',
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toNumberisValidNumber(x)
});
[false, ...]
 * @since 0.1.0
 */
pipe([Number, isValidNumber]);

/**
 * Return true if the input, parsed to float, is a valid number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[1],
	[1, 2],
	[1, 2, 3],
	'123',
	'123px',
].forEach(x => {
	toFloatIsValidNumber(x)
});
[true, ...]

> [
	[],
	'',
	'foo',
	{a: 1},
	true,
	null,
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toFloatIsValidNumber(x)
});
[false, ...]
 * @since 0.1.0
 */
pipe([parseFloat, isValidNumber]);

/**
* @module @svizzle/utils/iterable-number
*/

/**
 * Get the length of the iterable
 *
 * @function
 * @arg {iterable} iterable
 * @return {number}
 *
 * @example
> getLength('a')
1
> getLength('two')
3
> getLength([10])
1
> getLength([3, 7])
2
> function func () {
	return getLength(arguments);
}
> func()
0
> func()
0
> func('a', 'b')
2
 *
 * @since 0.1.0
 */
var getLength = getKey('length');

/**
* @module @svizzle/utils/array_proto-array
*/

/**
 * Return an array by concatenating the provided arrays
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.prototype.concat},
 {@link module:@svizzle/utils/object-array.concatValues|concatValues},
 {@link module:@svizzle/utils/array-[object-array].pickAndConcatValues|pickAndConcatValues},
 {@link module:@svizzle/utils/object-object.mergeWithConcat|mergeWithConcat}
 *
 * @function
 * @arg {...array} array
 * @return {array}
 *
 * @example
> concat([0, 1, 2], [3, 4], [5, 6])
[0, 1, 2, 3, 4, 5, 6]
 *
 * @since 0.1.0
 */
var concat = generic(Array.prototype.concat);

/**
 * Return a function expecting an object and returning an index of all its values using the provided accessor.
 * Use this if you're sure that applying the accessor on the object values returns unique strings.
 * Note that this works by concatenating all values before indexing hence you can also directly index values being arrays (see the second example).
 *
 * @function
 * @arg {function} accessor - Any -> Any
 * @return {function} - Object -> Object
 *
 * @example
> reindexedByX = indexValuesWith(obj => obj.x)

> // single values
> obj1 = {
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}
> reindexedByX(obj1)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}

> // values as arrays
> obj2 = {
  a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
  b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
}
> reindexedByX(obj2)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
};
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].groupValuesWith|groupValuesWith}
 */
var indexValuesWith = function indexValuesWith(accessor) {
  return pipe([values, apply(concat), indexBy(accessor)]);
};

/**
 * Return a function expecting two objects to merge using the provided merge function
 *
 * @function
 * @arg {function} fn - Merge function
 * @return {function} - Object -> Object
 *
 * @example

> mergeWithSubtract = mergeWith(_.subtract)
> mergeWithSubtract(
    {a: 8, b: 3},
    {a: 5, b: 2, c: 7}
)
{a: 3, b: 1, c: 7},

 *
 * @since 0.1.0
 */
var mergeWith = function mergeWith(fn) {
  return function (a, b) {
    return reduce(pairs(b), function (obj, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        bKey = _ref2[0],
        bValue = _ref2[1];
      obj[bKey] = has(obj, bKey) ? fn(obj[bKey], bValue) : bValue;
      return obj;
    }, merge({}, a) // copy of a
    );
  };
};

var collectionCompare = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }

  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if (value1 !== value1 && value2 !== value2) {
    return true;
  }
  if (_typeof$1(value1) != _typeof$1(value2) ||
  // primitive != primitive wrapper
  {}.toString.call(value1) != {}.toString.call(value2) // check for other (maybe nullish) objects
  ) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) == '[object Set]') {
    return compareArrays(Array.from(value1), Array.from(value2));
  }
  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  }
  return compareNativeSubtypes(value1, value2);
}
function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}
function compareArrays(value1, value2) {
  var len = value1.length;
  if (len != value2.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      return false;
    }
  }
  return true;
}
function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1);
  var len = keys1.length;
  if (len != Object.keys(value2).length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    if (!(value2.hasOwnProperty(key1) && compare(value1[key1], value2[key1]))) {
      return false;
    }
  }
  return true;
}

/**
* @module @svizzle/utils/constructor-[reduceCb[any-any]-[array-any]]
*/

/**
 * Return a function expecting a reducer function and returning a reduce function
 * with an instance of the provided constructor as the initial value
 * and expecting the array to reduce.
 *
 * @function
 * @arg {object} constructor
 * @return {function} - (Any -> Any):reduceCb -> (Array -> Any)
 *
 * @example
> reduceFromEmptyObject = reduceTo(Object)
> foo = reduceFromEmptyObject((acc, x) => {
	acc[x.id] = x.name;
	return acc;
})
> foo([{id: '00', name: 'a'}, {id: '11', name: 'b'}])
Object {11: 'b', 00: 'a'}
 *
 * @since 0.3.0
 */
var reduceTo = function reduceTo(ctor) {
  return function (reduceCb) {
    return reduceWith(reduceCb, new ctor());
  };
};

/**
* @module @svizzle/utils/reduceCb[any-any]-[array-any]
*/

/**
 * Return a reduce function expecting an array to reduce with the passed reducer
 * with an empty array as the initial value
 *
 * @function
 * @arg {function} function - reducer
 * @return {function} - Array -> Any
 *
 * @example
> reduce = reduceFromEmptyArray((acc, x) => {
  return acc.slice(-2).concat([x.value]);
})
> reduce([
  {a: 1, value: 2},
  {a: 1, value: 3},
  {a: 1, value: 0},
  {a: 1, value: 4},
  {a: 1, value: 7}
])
[0, 4, 7]
 *
 * @since 0.3.0
 */
var reduceFromEmptyArray = reduceTo(Array);

/**
 * Return a reduce function expecting an array to reduce with the passed reducer
 * with an empty object as the initial value
 *
 * @function
 * @arg {function} function - reducer
 * @return {function} - Array -> Any
 *
 * @example
> reduce = reduceFromEmptyObject((acc, x) => {
  acc[x.id] = x.name;
  return acc;
})
> reduce([
  {id: '00', name: 'a'},
  {id: '11', name: 'b'}
])
{11: 'b', 00: 'a'}
 *
 * @since 0.3.0
 */
var reduceFromEmptyObject = reduceTo(Object);

/**
* @module @svizzle/utils/any-[any-boolean]
*/

/**
 * Return a function that returns true if the input is different from the provided value.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isNotTwo = isNot(2)
> isNotTwo(3)
true
> isNotTwo(2)
false
 *
 * @since v0.3.0
 */
var isNot = function isNot(x) {
  return not(is(x));
};

/**
 * Return a function that returns true if the input value is equal to the provided value.
 * This can be used to compare objects and arrays, but if the input value is of native type {@link https://ascartabelli.github.io/lamb/module-lamb.html#is|_.is} or {@link https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ|_.isSVZ} should be used.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isEqualToObj = isEqualTo({a: 1, b: [1,2]})
> isEqualToObj({a: 1, b: [1, 2]})
true
> isEqualToObj({a: 1, b: [1, 2, 3})
false
> isEqualToArray = isEqualTo([1, 2, {a: 1}])
> isEqualToArray([1, 2, {a: 1}])
true
> isEqualToArray([1, 2, {a: 1}, 3])
false
 *
 * @since v0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#is
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ
 */
curry(collectionCompare);

/**
* @module @svizzle/utils/any-[array-object]
*/

/**
 * Return a function expecting an array of keys and returning an object with
 * the provided value as value of those keys.
 *
 * @function
 * @arg {*} value
 * @return {function} function - Array -> Object
 *
 * @example
> makeKeyedEmptyArray = makeKeyed([])
> makeKeyedEmptyArray([1, 2])
{1: [], 2: []}
> makeKeyedEmptyArray(['a', 'b'])
{a: [], b: []}
 *
 * @since 0.3.0
 */
var makeKeyed = function makeKeyed(value) {
  return pipe([collect([identity, mapWith(always(value))]), apply(make)]);
};

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `key` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [key, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isUSA = isKeyValue(['country_id', 'US'])
> isUSA({country_id: 'GB', id: 123})
false
> isUSA({country_id: 'US', id: 456})
true
 *
 * @since 0.3.0
 */
var isKeyValue = function isKeyValue(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    value = _ref2[1];
  return pipe([getKey(key), is(value)]);
};

/**
 * Return an object built using 'key's and 'value's from the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} object
 *
 * @example
> objects = [
	{key: 'ITA', value: 0},
	{key: 'FRA', value: 0},
	{key: 'BRA', value: 0},
	{key: 'GER', value: 1},
	{key: 'USA', value: 1},
]
> keyValueArrayToObject(objects)
{
	'ITA': 0,
	'FRA': 0,
	'BRA': 0,
	'GER': 1,
	'USA': 1
}
 *
 * @since 0.3.0
 */
var keyValueArrayToObject = function keyValueArrayToObject(objects) {
  return reduce(objects, function (acc, _ref) {
    var key = _ref.key,
      value = _ref.value;
    acc[key] = value;
    return acc;
  }, {});
};

/**
 * Return an object with the provided array elements as keys and all values equal to their index in the array
 *
 * @function
 * @arg {array} array
 * @return {object}
 *
 * @example
> makeIndexByKey(['a', 'b'])
{a: 0, b: 1}
> makeIndexByKey([2, -4])
{'2': 0, '-4': 1}
> makeIndexByKey([[1,2,3], [3,4,5], [1,2,3]])
{'3,4,5': 1, '1,2,3': 2}
> makeIndexByKey([[1,2,{a:1}], [3,4,5], [1,2,3]])
{'1,2,[object Object]': 0, '3,4,5': 1, '1,2,3': 2}
> makeIndexByKey([{a: 1}, {b: 2}, {c: 3}])
{'[object Object]': 2}
 *
 * @since 0.12.0
 */
pipe([zipWithIndex, fromPairs]);

/**
 * Return an object with the provided array elements as keys and all values equal to `true`
 *
 * @function
 * @arg {array} array
 * @return {object}
 *
 * @example
> makeKeyedFalse(['a', 'b'])
{a: false, b: false}
 *
 * @since 0.9.0
 */
makeKeyed(false);

/**
 * Return an object with the provided array elements as keys and all values equal to `false`
 *
 * @function
 * @arg {array} array
 * @return {object} - keyed trues
 *
 * @example
> makeKeyedTrue(['a', 'b'])
{a: true, b: true}
 *
 * @since 0.9.0
 */
makeKeyed(true);

/**
 * Return an object with the provided array elements as keys and all values equal to zero
 *
 * @function
 * @arg {array} array
 * @return {object} - keyed zeroes
 *
 * @example
> makeKeyedZeroes([1, 2])
{1: 0, 2: 0}
> makeKeyedZeroes(['a', 'b'])
{a: 0, b: 0}
 *
 * @since 0.1.0
 */
makeKeyed(0);

/**
 * Return an object of occurrences of all the keys contained in the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} occurrences - occurrences of keys
 *
 * @example
> objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}]
> makeAllOccurrences(objects)
{a: 3, b: 2, c: 2, e: 1}
 *
 * @since 0.1.0
 */
reduceFromEmptyObject(function (acc, item) {
  forEach(keys(item), function (key) {
    if (has(acc, key)) {
      acc[key] += 1;
    } else {
      acc[key] = 1;
    }
  });
  return acc;
});

/**
 * Merge all the objects in the provided array.
 * The result depends on the order of the objects in the array.
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} - merged objects
 *
 * @example
> mergeObjects([{a: 1}, {a: 6, b: -1}, {b: 1}])
{a: 6, b: 1}
> mergeObjects([{b: 1}, {a: 6, b: -1}, {a: 1}])
{a: 1, b: -1}
 *
 * @since 0.5.0
 */
var mergeObjects = reduceFromEmptyObject(function (acc, item) {
  forEach(pairs(item), function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    acc[key] = value;
  });
  return acc;
});
// IDEA merging from right just new keys might be faster

/**
* @module @svizzle/utils/array-string
*/

/**
 * Return a string joining the provided array items with a blank
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithBlank(['a', 'b', 'c'])
'a b c'
 *
 * @since 0.13.0
 */
var joinWithBlank = joinWith(' ');

/**
 * Return a string joining the provided array items with a colon
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithColon(['a', 'b', 'c'])
'a:b:c'
 *
 * @since 0.1.0
 */
var joinWithColon = joinWith(':');

/**
 * Return a string joining the provided array items with a semicolon
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithSemicolon(['a', 'b', 'c'])
'a;b;c'
 *
 * @since 0.1.0
 */
var joinWithSemicolon = joinWith(';');

/**
* @module @svizzle/utils/number-boolean
*/

/**
 * Return `true` if the input number is 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is0(0)
true
> is0(2)
false
 *
 * @since 0.1.0
 */
var is0 = is(0);

/**
 * Return `true` if the input number is 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is1(1)
true
> is1(2)
false
 *
 * @since 0.1.0
 */
var is1 = is(1);

/**
 * Return `true` if the input number is greater than 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT0(-1)
false
> isGT0(2)
true
 *
 * @since 0.1.0
 */
var isGT0 = isGT(0);

/**
 * Return `true` if the input number is greater than 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT1(0)
false
> isGT1(2)
true
 *
 * @since 0.1.0
 */
var isGT1 = isGT(1);

/**
* @module @svizzle/utils/iterable-boolean
*/

/**
 * Use to check if an iterable is empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableEmpty('string')
false
> isIterableEmpty('')
true
> isIterableEmpty([1, 2])
false
> isIterableEmpty([])
true
> isIterableEmpty([])
true
> function func () {
	return isIterableEmpty(arguments);
}
> func()
true
> func(1, 2)
false
 *
 * @since 0.1.0
 */
var isIterableEmpty = pipe([getLength, is0]);

/**
 * Use to check if an iterable is not empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableNotEmpty('string')
true
> isIterableNotEmpty('')
false
> isIterableNotEmpty([1, 2])
true
> isIterableNotEmpty([])
false
> function func () {
	return isIterableNotEmpty(arguments);
}
> func()
false
> func(1, 2)
true
 *
 * @since 0.1.0
 */
var isIterableNotEmpty = pipe([getLength, isGT0]);

/**
 * Use to check if an iterable has a single element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> hasIterableLength1('1')
true
> hasIterableLength1('two')
false
> hasIterableLength1([1])
true
> hasIterableLength1([1, 2])
false
> function func () {
	return hasIterableLength1(arguments);
}
> func()
false
> func(1)
true
> func(1, 2)
false
 *
 * @since 0.1.0
 */
pipe([getLength, is1]);

/**
 * Use to check if an iterable has more than an element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableLongerThan1('1')
false
> isIterableLongerThan1('two')
true
> isIterableLongerThan1([1])
false
> isIterableLongerThan1([1, 2])
true
> function func () {
	return isIterableLongerThan1(arguments);
}
> func()
false
> func(1)
false
> func(1, 2)
true
 *
 * @since 0.1.0
 */
pipe([getLength, isGT1]);

/**
* @module @svizzle/utils/iterable-object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {object}
 *
 * @example
> function func () {
	return pairToKeyValueObject(arguments);
}
> func()
{key: undefined, value: undefined}
> func(1)
{key: 1, value: undefined}
> func(1, 2)
{key: 1, value: 2}
> func(1, 2, 3)
{key: 1, value: 2}
> pairToKeyValueObject([])
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject([1])
{key: 1, value: undefined}
> pairToKeyValueObject([1, 2])
{key: 1, value: 2}
> pairToKeyValueObject([1, 2, 3])
{key: 1, value: 2}
> pairToKeyValueObject('')
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject('a')
{key: 'a', value: 'undefined'}
> pairToKeyValueObject('ab')
{key: 'a', value: 'b'}
> pairToKeyValueObject('abc')
{key: 'a', value: 'b'}
 *
 * @since 0.1.0
 */
var pairToKeyValueObject = function pairToKeyValueObject(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    value = _ref2[1];
  return {
    key: key,
    value: value
  };
};

/**
* @module @svizzle/utils/object-[any-object]
*/

/**
 * Return a function expecting any kind of input to be used as the argument
 * of the provided functions
 *
 * @function
 * @arg {object} fnMap - a map of keys and functions Any -> Any
 * @return {function} - Any -> Object
 *
 * @example
> array = [
	{fname: 'John', lname: 'Woo', lng: 1, lat: 2},
	{fname: 'John', lname: 'Foo', lng: 7, lat: 8}
];
> format = applyFnMap({
	coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
	fullname: _.pipe([
		_.collect([_.getKey('fname'), _.getKey('lname')]),
		_.joinWith(' ')
	]),
});
> formatted = _.map(raw, format)
[
	{coords: [1, 2], fullname: 'John Woo'},
	{coords: [7, 8], fullname: 'John Foo'}
]

> checkNumber = applyFnMap({
	range: _.collect([_.add(1), _.deduct(1)]),
	sign: Math.sign,
})
> checkNumber(1)
{range: [2, 0], sign: 1}
> checkNumber(-10)
{range: [-9, -11], sign: -1}

> checkString = applyFnMap({
	parts: _.splitBy('/'),
	hasNumbersOnly: _.testWith(/^\d+$/gu),
})
> checkString('aa/bb')
{parts: ['aa', 'bb'], hasNumbersOnly: false}
> checkString('123')
{parts: ['123'], hasNumbersOnly: true}
> checkString('123/g')
{parts: ['123', 'g'], hasNumbersOnly: false}

*
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
var applyFnMap = function applyFnMap(fnMap) {
  return function (any) {
    return mapValues(fnMap, applyTo([any]));
  };
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Return a function that applies the provided map to the expected object and merges the result to the object.
 * This is useful to add new properties to an object, eventually modifying existing ones by using keys expected to be in the input objects.
 *
 * @function
 * @arg {object} fnMap - a map key/function Any -> Any (applied to the object)
 * @return {function} - Object -> Object
 *
 * @example
> enhancer = makeMergeAppliedFnMap({
	coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
	fullname: _.pipe([
		_.collect([_.getKey('fname'), _.getKey('lname')]),
		_.joinWith(' ')
	]),
	lat: obj => roundTo2(obj.lat),
	lng: obj => roundTo2(obj.lng),
})
> enhancer({
	fname: 'John',
	lat: 2.345434,
	lname: 'Woo',
	lng: 10.3425,
})
{
	coords: [10.3425, 2.345434],
	fname: 'John',
	fullname: 'John Woo',
	lat: 2.35,
	lname: 'Woo',
	lng: 10.34,
}
 *
 * @since 0.9.0
 * @see {@link module:@svizzle/utils/object-[any-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
var makeMergeAppliedFnMap = function makeMergeAppliedFnMap(fnMap) {
  var makeProps = applyFnMap(fnMap);
  return function (obj) {
    return merge(obj, makeProps(obj));
  };
};

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the correspondent values of the provided object.
 * Can be useful with [d3.csvParse]{@link https://github.com/d3/d3-dsv#csvParse}, see the example below.
 * Since 0.6.0 it assumes identity for missing keys.
 *
 * @function
 * @arg {object} fnMap - object with functions as values
 * @return {function} - Object -> Object
 *
 * @example
> conversionFn = transformValues({
	name: _.identity,
	a: _.pipe([Number, Math.sqrt]),
	b: Number,
	width: parseFloat
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: 2, width: 10}

$ cat baseurl/file.csv
name,a,b,width
foo,9,2,10px
bar,4,4,25px

> d3.csvParse('baseurl/file.csv', conversionFn)
[{name: 'foo', a: 3, b: 2, width: 10}, {name: 'bar', a: 2, b: 4, width: 25}]

> conversionFn = transformValues({
	a: _.pipe([Number, Math.sqrt]),
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: '2', width: '10px'}
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[any-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 */
var transformValues = function transformValues(fnMap) {
  return mapValuesWith(function (value, key) {
    return key in fnMap ? application(fnMap[key], [value]) : value;
  });
};

/**
 * Return a function that expects an object and applies the provided updater
 * function to the values correspondent to the provided keys, leaving the other
 * properties unchanged.
 *
 * @function
 * @arg {object} - {keys: Array, updater: Any -> Any}
 * @return {function} - Object -> Object
 *
 * @example
> update = updateKeys({
	keys: ['a', 'k', 'm'],
	updater: x => x * 2
});
> update({a: 1, b: 2, d: 4, k: 7, m: 2})
{a: 2, b: 2, d: 4, k: 14, m: 4}
> update({a: 1, b: 2, d: 4})
{a: 2, b: 2, d: 4}
> update({b: 2, d: 4})
{b: 2, d: 4}
 *
 * @since 0.16.0
 */
var updateKeys = function updateKeys(_ref3) {
  var keys = _ref3.keys,
    updater = _ref3.updater;
  return function (obj) {
    return reduce(keys, function (acc, key) {
      if (key in acc) {
        acc[key] = updater(acc[key]);
      }
      return acc;
    }, _objectSpread$3({}, obj));
  };
};

/**
 * Return a function expecting an object to merge with the input object
 *
 * @function
 * @arg {object} object - Object to be merged to the provided object
 * @return {function} - Object -> Object
 *
 * @example
> mergeB = mergeObj({b: 2})
> mergeB({a: 1})
{a: 1, b: 2}
> mergeB({a: 1, b: 1})
{a: 1, b: 2}
 *
 * @since 0.1.0
 */
var mergeObj = function mergeObj(obj) {
  return partial(merge, [__, obj]);
};

/**
* @module @svizzle/utils/object-object
*/

/**
 * Return the merge of the two provided objects merging values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

> obj1 = {A: {a: 1}, B: {b: 1}}
> obj2 = {A: {b: 10}, B: {a: 10}}
> mergeWithMerge(obj1, obj2)
{A: {a: 1, b: 10}, B: {a: 10, b: 1}}
 *
 * @since 0.1.0
 */
var mergeWithMerge = mergeWith(merge);

/* sort keys */

/**
 * Return a copy of the input object with enumerable properties sorted
 * in ascending order.
 * Note that this should work from ES6 on.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
> sortObjectKeysAsc({c: 1, a: 2, b: 15})
{a: 2, b: 15, c: 1}
 *
 * @since 0.17.0
 */
pipe([pairs, sortWith([head]), fromPairs]);

/**
 * Return a copy of the input object with enumerable properties sorted
 * in descending order.
 * Note that this should work from ES6 on.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
> sortObjectKeysDesc({c: 1, a: 2, b: 15})
{c: 1, b: 15, a: 2}
 *
 * @since 0.17.0
 */
pipe([pairs, sortWith([sorterDesc(head)]), fromPairs]);

/* rest */

/**
 * Return a copy of the object without falsy values
 *
 * @function
 * @arg {object} object - The input object
 * @return {object} object - The object with truthy values
 *
 * @example
> pickIfTruthy({a: true, b: true, c: false})
{a: true, b: true}
> pickIfTruthy({a: 1, b: 0, c: false})
{a: 1}
> pickIfTruthy({a: [1, 2], b: {a: 1}, c: false})
{a: [1, 2], b: {a: 1}}
 *
 * @since 0.2.0
 */
var pickIfTruthy = pickIf(identity);

/**
 * Return an object with swapped keys and values.
 * Note that if there are duplicate values, since the keys of the resulting object have to be unique, the last occurrence of each value would be used but depending on the interpreter implementation the output keys might vary.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
// unique values
> swapKeyValue({a: 1, b: 2, c: 'd'})
{1: 'a', 2: 'b', d: 'c'}

// duplicate values
> swapKeyValue({a: 1, b: 2, c: 'd', e: 1})
{2: 'b', d: 'c', 1: 'e'}
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].indexValuesWith|indexValuesWith}
 */
pipe([pairs, mapWith(reverse), fromPairs]);

/**
 * Concatenate the values of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> concatValues({a: [1, 2, 3], b: [4, 5, 6]})
[1, 2, 3, 4, 5, 6]
 *
 * @since 0.4.0
 */
pipe([values, apply(concat)]);

/**
 * Return an array of the permutations of the provided object values items, by key.
 * Note that this function assumes the provided object values are arrays.
 *
 * @function
 * @arg {object} object - {string: any[]}
 * @return {array} - object[]
 *
 * @example
> makeKeyedValuesPermutations({a: [0, 1], b: [2, 3], c: [4, 5]})
[
	{a: 0, b: 2, c: 4}, {a: 1, b: 2, c: 4},
	{a: 0, b: 3, c: 4}, {a: 1, b: 3, c: 4},
	{a: 0, b: 2, c: 5}, {a: 1, b: 2, c: 5},
	{a: 0, b: 3, c: 5}, {a: 1, b: 3, c: 5}
]
 *
 * @since 0.6.0
 */
pipe([pairs, filterWith(pipe([last, allOf([isArray, isIterableNotEmpty])])), reduceFromEmptyArray(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    values = _ref2[1];
  var props = values.map(function (value) {
    return _defineProperty({}, key, value);
  });
  return acc.length === 0 ? props : flatMap(props, function (prop) {
    return acc.map(function (obj) {
      return merge(obj, prop);
    });
  });
})]);

/**
 * Return an array of {key, value} objects from an object
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> obj = {k1: 'v1', k2: 'v2'}
> objectToKeyValueArray(obj)
[{key: 'k1', value: 'v1'}, {key: 'k2', value: 'v2'}]
 *
 * @since 0.1.0
 */
var objectToKeyValueArray = pipe([pairs, mapWith(pairToKeyValueObject)]);

/**
 * Return the keys of the provided object with a truthy value
 *
 * @function
 * @arg {object} object - The input object
 * @return {array} - The keys correspondent to truthy values
 *
 * @example
> getTruthyValuesKeys({a: true, b: true, c: false})
['a', 'b']
> getTruthyValuesKeys({a: 1, b: 0, c: false})
['a']
> getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false})
['a', 'b']
 *
 * @since 0.1.0
 */
var getTruthyValuesKeys = pipe([pickIfTruthy, keys]);

/**
* @module @svizzle/utils/string-[string-string]
*/

/**
 * Return a function that appends the provided string to the input string
 *
 * @function
 * @arg {string} postfix - The string to be appended
 * @return {function} - String -> String
 *
 * @example
> postfixed = makePostfixed('---')
> postfixed('A')
'A---'
> postfixed('B')
'B---'
 *
 * @since 0.12.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePrefixed|makePrefixed}
 */
var makePostfixed = function makePostfixed(postfix) {
  return function (string) {
    return string + postfix;
  };
};

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function} - String -> String
 *
 * @example
> prefixed = makePrefixed('---')
> prefixed('A')
'---A'
> prefixed('B')
'---B'
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePostfixed|makePostfixed}
 */
var makePrefixed = function makePrefixed(prefix) {
  return function (string) {
    return prefix + string;
  };
};

/**
* @module @svizzle/dom/attrs
*/

/**
 * Return a style string from an object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyle({color: 'red', 'font-size': '10px'})
'color:red;font-size:10px'
 *
 * @since 0.1.0
 */
var makeStyle = pipe([skipIf(isNil), pairs, mapWith(joinWithColon), joinWithSemicolon]);

/**
 * Return a style string with hyphenate CSS variables derived from the keys of the expected object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyleVars({foo: 'red', 'bar': '10px'})
'--foo:red;--bar:10px'
 *
 * @since 0.4.0
 */
var makeStyleVars = pipe([skipIf(isNil), pairs, mapWith(pipe([joinWithColon, makePrefixed('--')])), joinWithSemicolon]);

/**
 * Return a px representation of the received number.
 * Throws an error if the input is not a number.
 *
 * @function
 * @arg {number} number
 * @return {string}
 *
 * @example
> toPx(10)
'10px'
 *
 * @since 0.1.0
 */
var toPx = function toPx(number) {
  return "".concat(number, "px");
};

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$g = "../../components/ui/src/icons/feather/ArrowLeftCircle.svelte";
function create_fragment$m(ctx) {
  var circle;
  var polyline;
  var line;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      polyline = svg_element("polyline");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file$g, 1, 0, 34);
      attr_dev(polyline, "points", "12 8 8 12 12 16");
      add_location(polyline, file$g, 1, 40, 74);
      attr_dev(line, "x1", "16");
      attr_dev(line, "y1", "12");
      attr_dev(line, "x2", "8");
      attr_dev(line, "y2", "12");
      add_location(line, file$g, 1, 86, 120);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, polyline, anchor);
      insert_hydration_dev(target, line, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(polyline);
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$m.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$m($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ArrowLeftCircle', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ArrowLeftCircle> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ArrowLeftCircle = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ArrowLeftCircle, _SvelteComponentDev);
  var _super = _createSuper$m(ArrowLeftCircle);
  function ArrowLeftCircle(options) {
    var _this;
    _classCallCheck(this, ArrowLeftCircle);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$m, create_fragment$m, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ArrowLeftCircle",
      options: options,
      id: create_fragment$m.name
    });
    return _this;
  }
  return _createClass(ArrowLeftCircle);
}(SvelteComponentDev);
var ArrowLeftCircle$1 = ArrowLeftCircle;

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$f = "../../components/ui/src/icons/feather/ArrowRightCircle.svelte";
function create_fragment$l(ctx) {
  var circle;
  var polyline;
  var line;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      polyline = svg_element("polyline");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file$f, 1, 0, 34);
      attr_dev(polyline, "points", "12 16 16 12 12 8");
      add_location(polyline, file$f, 1, 40, 74);
      attr_dev(line, "x1", "8");
      attr_dev(line, "y1", "12");
      attr_dev(line, "x2", "16");
      attr_dev(line, "y2", "12");
      add_location(line, file$f, 1, 87, 121);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, polyline, anchor);
      insert_hydration_dev(target, line, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(polyline);
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$l.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$l($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ArrowRightCircle', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ArrowRightCircle> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ArrowRightCircle = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ArrowRightCircle, _SvelteComponentDev);
  var _super = _createSuper$l(ArrowRightCircle);
  function ArrowRightCircle(options) {
    var _this;
    _classCallCheck(this, ArrowRightCircle);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$l, create_fragment$l, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ArrowRightCircle",
      options: options,
      id: create_fragment$l.name
    });
    return _this;
  }
  return _createClass(ArrowRightCircle);
}(SvelteComponentDev);
var ArrowRightCircle$1 = ArrowRightCircle;

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$e = "../../components/ui/src/icons/feather/ChevronLeft.svelte";
function create_fragment$k(ctx) {
  var polyline;
  var block = {
    c: function create() {
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(polyline, "points", "15 18 9 12 15 6");
      add_location(polyline, file$e, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, polyline, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polyline);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$k.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$k($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ChevronLeft', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ChevronLeft> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ChevronLeft = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChevronLeft, _SvelteComponentDev);
  var _super = _createSuper$k(ChevronLeft);
  function ChevronLeft(options) {
    var _this;
    _classCallCheck(this, ChevronLeft);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$k, create_fragment$k, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChevronLeft",
      options: options,
      id: create_fragment$k.name
    });
    return _this;
  }
  return _createClass(ChevronLeft);
}(SvelteComponentDev);
var ChevronLeft$1 = ChevronLeft;

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$d = "../../components/ui/src/icons/feather/ChevronRight.svelte";
function create_fragment$j(ctx) {
  var polyline;
  var block = {
    c: function create() {
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(polyline, "points", "9 18 15 12 9 6");
      add_location(polyline, file$d, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, polyline, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polyline);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$j.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$j($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ChevronRight', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ChevronRight> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ChevronRight = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChevronRight, _SvelteComponentDev);
  var _super = _createSuper$j(ChevronRight);
  function ChevronRight(options) {
    var _this;
    _classCallCheck(this, ChevronRight);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChevronRight",
      options: options,
      id: create_fragment$j.name
    });
    return _this;
  }
  return _createClass(ChevronRight);
}(SvelteComponentDev);
var ChevronRight$1 = ChevronRight;

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$c = "../../components/ui/src/icons/feather/MinusCircle.svelte";
function create_fragment$i(ctx) {
  var circle;
  var line;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file$c, 1, 0, 34);
      attr_dev(line, "x1", "8");
      attr_dev(line, "y1", "12");
      attr_dev(line, "x2", "16");
      attr_dev(line, "y2", "12");
      add_location(line, file$c, 1, 40, 74);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, line, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$i.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$i($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('MinusCircle', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<MinusCircle> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var MinusCircle = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(MinusCircle, _SvelteComponentDev);
  var _super = _createSuper$i(MinusCircle);
  function MinusCircle(options) {
    var _this;
    _classCallCheck(this, MinusCircle);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "MinusCircle",
      options: options,
      id: create_fragment$i.name
    });
    return _this;
  }
  return _createClass(MinusCircle);
}(SvelteComponentDev);
var MinusCircle$1 = MinusCircle;

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "../../components/ui/src/icons/feather/PlusCircle.svelte";
function create_fragment$h(ctx) {
  var circle;
  var line0;
  var line1;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      line0 = svg_element("line");
      line1 = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
      line0 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line0).forEach(detach_dev);
      line1 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line1).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file$b, 1, 0, 34);
      attr_dev(line0, "x1", "12");
      attr_dev(line0, "y1", "8");
      attr_dev(line0, "x2", "12");
      attr_dev(line0, "y2", "16");
      add_location(line0, file$b, 1, 40, 74);
      attr_dev(line1, "x1", "8");
      attr_dev(line1, "y1", "12");
      attr_dev(line1, "x2", "16");
      attr_dev(line1, "y2", "12");
      add_location(line1, file$b, 1, 84, 118);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, line0, anchor);
      insert_hydration_dev(target, line1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(line0);
      if (detaching) detach_dev(line1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$h.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$h($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('PlusCircle', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PlusCircle> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var PlusCircle = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(PlusCircle, _SvelteComponentDev);
  var _super = _createSuper$h(PlusCircle);
  function PlusCircle(options) {
    var _this;
    _classCallCheck(this, PlusCircle);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "PlusCircle",
      options: options,
      id: create_fragment$h.name
    });
    return _this;
  }
  return _createClass(PlusCircle);
}(SvelteComponentDev);
var PlusCircle$1 = PlusCircle;

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "../../components/ui/src/icons/svizzle/ColorClear.svelte";
function create_fragment$g(ctx) {
  var path;
  var t;
  var rect;
  var block = {
    c: function create() {
      path = svg_element("path");
      t = space();
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      t = claim_space(nodes);
      rect = claim_svg_element(nodes, "rect", {
        height: true,
        transform: true,
        width: true,
        x: true,
        y: true
      });
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z");
      add_location(path, file$a, 3, 0, 97);
      attr_dev(rect, "height", "1.5");
      attr_dev(rect, "transform", "matrix(0.69653614,0.71752171,-0.72279821,0.69105915,0,0)");
      attr_dev(rect, "width", "26");
      attr_dev(rect, "x", "3.5");
      attr_dev(rect, "y", "0");
      add_location(rect, file$a, 6, 0, 881);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, path, anchor);
      insert_hydration_dev(target, t, anchor);
      insert_hydration_dev(target, rect, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$g($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ColorClear', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ColorClear> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ColorClear = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorClear, _SvelteComponentDev);
  var _super = _createSuper$g(ColorClear);
  function ColorClear(options) {
    var _this;
    _classCallCheck(this, ColorClear);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorClear",
      options: options,
      id: create_fragment$g.name
    });
    return _this;
  }
  return _createClass(ColorClear);
}(SvelteComponentDev);
var ColorClear$1 = ColorClear;

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "../../components/ui/src/icons/svizzle/FormatClear.svelte";
function create_fragment$f(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M6,5V5.18L8.82,8H11.22L10.5,9.68L12.6,11.78L14.21,8H20V5H6M3.27,5L2,6.27L8.97,13.24L6.5,19H9.5L11.07,15.34L16.73,21L18,19.73L3.55,5.27L3.27,5Z");
      add_location(path, file$9, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, path, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$f($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('FormatClear', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<FormatClear> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var FormatClear = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FormatClear, _SvelteComponentDev);
  var _super = _createSuper$f(FormatClear);
  function FormatClear(options) {
    var _this;
    _classCallCheck(this, FormatClear);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FormatClear",
      options: options,
      id: create_fragment$f.name
    });
    return _this;
  }
  return _createClass(FormatClear);
}(SvelteComponentDev);
var FormatClear$1 = FormatClear;

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "../../components/ui/src/icons/Icon.svelte";
function create_fragment$e(ctx) {
  var div;
  var svg;
  var switch_instance;
  var current;
  var switch_value = /*glyph*/ctx[1];
  function switch_props(ctx) {
    return {
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props());
  }
  var block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        fill: true,
        stroke: true,
        svgxmlns: true,
        viewBox: true,
        height: true,
        "stroke-linecap": true,
        "stroke-linejoin": true,
        "stroke-width": true,
        width: true,
        class: true
      });
      var svg_nodes = children(svg);
      if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "fill", /*fill*/ctx[0]);
      attr_dev(svg, "stroke", /*stroke*/ctx[3]);
      attr_dev(svg, "svgxmlns", svgXmlns);
      attr_dev(svg, "viewBox", /*viewBox*/ctx[5]);
      attr_dev(svg, "height", /*size*/ctx[2]);
      attr_dev(svg, "stroke-linecap", strokeLinecap);
      attr_dev(svg, "stroke-linejoin", strokeLinejoin);
      attr_dev(svg, "stroke-width", /*strokeWidth*/ctx[4]);
      attr_dev(svg, "width", /*size*/ctx[2]);
      attr_dev(svg, "class", "svelte-1ase79a");
      add_location(svg, file$8, 28, 1, 834);
      attr_dev(div, "class", "svelte-1ase79a");
      add_location(div, file$8, 27, 0, 827);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, svg);
      if (switch_instance) mount_component(switch_instance, svg, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (switch_value !== (switch_value = /*glyph*/ctx[1])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, svg, null);
        } else {
          switch_instance = null;
        }
      }
      if (!current || dirty & /*fill*/1) {
        attr_dev(svg, "fill", /*fill*/ctx[0]);
      }
      if (!current || dirty & /*stroke*/8) {
        attr_dev(svg, "stroke", /*stroke*/ctx[3]);
      }
      if (!current || dirty & /*viewBox*/32) {
        attr_dev(svg, "viewBox", /*viewBox*/ctx[5]);
      }
      if (!current || dirty & /*size*/4) {
        attr_dev(svg, "height", /*size*/ctx[2]);
      }
      if (!current || dirty & /*strokeWidth*/16) {
        attr_dev(svg, "stroke-width", /*strokeWidth*/ctx[4]);
      }
      if (!current || dirty & /*size*/4) {
        attr_dev(svg, "width", /*size*/ctx[2]);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (switch_instance) destroy_component(switch_instance);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var defaultGlyph = null;
var strokeLinecap = 'round';
var strokeLinejoin = 'round';
var svgXmlns = 'http://www.w3.org/2000/svg';
function instance$e($$self, $$props, $$invalidate) {
  var viewBox;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Icon', slots, []);
  var defaultFill = 'none';
  var defaultSize = 24;
  var defaultStroke = 'currentColor';
  var defaultStrokeWidth = 2;
  var _$$props$fill = $$props.fill,
    fill = _$$props$fill === void 0 ? defaultFill : _$$props$fill;
  var _$$props$glyph = $$props.glyph,
    glyph = _$$props$glyph === void 0 ? defaultGlyph : _$$props$glyph;
  var _$$props$glyphSize = $$props.glyphSize,
    glyphSize = _$$props$glyphSize === void 0 ? defaultSize : _$$props$glyphSize;
  var _$$props$size = $$props.size,
    size = _$$props$size === void 0 ? defaultSize : _$$props$size;
  var _$$props$stroke = $$props.stroke,
    stroke = _$$props$stroke === void 0 ? defaultStroke : _$$props$stroke;
  var _$$props$strokeWidth = $$props.strokeWidth,
    strokeWidth = _$$props$strokeWidth === void 0 ? defaultStrokeWidth : _$$props$strokeWidth;
  var writable_props = ['fill', 'glyph', 'glyphSize', 'size', 'stroke', 'strokeWidth'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Icon> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ('glyphSize' in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
    if ('size' in $$props) $$invalidate(2, size = $$props.size);
    if ('stroke' in $$props) $$invalidate(3, stroke = $$props.stroke);
    if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
  };
  $$self.$capture_state = function () {
    return {
      defaultFill: defaultFill,
      defaultSize: defaultSize,
      defaultStroke: defaultStroke,
      defaultStrokeWidth: defaultStrokeWidth,
      defaultGlyph: defaultGlyph,
      strokeLinecap: strokeLinecap,
      strokeLinejoin: strokeLinejoin,
      svgXmlns: svgXmlns,
      fill: fill,
      glyph: glyph,
      glyphSize: glyphSize,
      size: size,
      stroke: stroke,
      strokeWidth: strokeWidth,
      viewBox: viewBox
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ('glyphSize' in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
    if ('size' in $$props) $$invalidate(2, size = $$props.size);
    if ('stroke' in $$props) $$invalidate(3, stroke = $$props.stroke);
    if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
    if ('viewBox' in $$props) $$invalidate(5, viewBox = $$props.viewBox);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*fill*/1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, fill = fill || defaultFill);
    }
    if ($$self.$$.dirty & /*glyph*/2) {
      $$invalidate(1, glyph = glyph || defaultGlyph);
    }
    if ($$self.$$.dirty & /*size*/4) {
      $$invalidate(2, size = size || defaultSize);
    }
    if ($$self.$$.dirty & /*stroke*/8) {
      $$invalidate(3, stroke = stroke || defaultStroke);
    }
    if ($$self.$$.dirty & /*strokeWidth*/16) {
      $$invalidate(4, strokeWidth = strokeWidth || defaultStrokeWidth);
    }
    if ($$self.$$.dirty & /*glyphSize*/1024) {
      $$invalidate(5, viewBox = "0 0 ".concat(glyphSize, " ").concat(glyphSize));
    }
  };
  return [fill, glyph, size, stroke, strokeWidth, viewBox, defaultFill, defaultSize, defaultStroke, defaultStrokeWidth, glyphSize];
}
var Icon = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Icon, _SvelteComponentDev);
  var _super = _createSuper$e(Icon);
  function Icon(options) {
    var _this;
    _classCallCheck(this, Icon);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      defaultFill: 6,
      defaultSize: 7,
      defaultStroke: 8,
      defaultStrokeWidth: 9,
      fill: 0,
      glyph: 1,
      glyphSize: 10,
      size: 2,
      stroke: 3,
      strokeWidth: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Icon",
      options: options,
      id: create_fragment$e.name
    });
    return _this;
  }
  _createClass(Icon, [{
    key: "defaultFill",
    get: function get() {
      return this.$$.ctx[6];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultSize",
    get: function get() {
      return this.$$.ctx[7];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultStroke",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultStrokeWidth",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fill",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyph",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyphSize",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "stroke",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "strokeWidth",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Icon;
}(SvelteComponentDev);
var Icon$1 = Icon;

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$7 = "../../components/ui/src/Switch.svelte";

// (52:1) {#if !hideLabels}
function create_if_block_1$4(ctx) {
  var span;
  var t_value = /*values*/ctx[0][0] + "";
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "labelLeft svelte-75un28");
      add_location(span, file$7, 52, 2, 1146);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*values*/1 && t_value !== (t_value = /*values*/ctx[0][0] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$4.name,
    type: "if",
    source: "(52:1) {#if !hideLabels}",
    ctx: ctx
  });
  return block;
}

// (64:1) {#if !hideLabels}
function create_if_block$6(ctx) {
  var span;
  var t_value = /*values*/ctx[0][1] + "";
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "labelRight svelte-75un28");
      add_location(span, file$7, 64, 2, 1410);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*values*/1 && t_value !== (t_value = /*values*/ctx[0][1] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(64:1) {#if !hideLabels}",
    ctx: ctx
  });
  return block;
}
function create_fragment$d(ctx) {
  var div;
  var t0;
  var span2;
  var span0;
  var t1;
  var span1;
  var t2;
  var mounted;
  var dispose;
  var if_block0 = ! /*hideLabels*/ctx[1] && create_if_block_1$4(ctx);
  var if_block1 = ! /*hideLabels*/ctx[1] && create_if_block$6(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      span2 = element("span");
      span0 = element("span");
      t1 = space();
      span1 = element("span");
      t2 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        title: true,
        "aria-label": true,
        class: true,
        role: true,
        tabindex: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      span2 = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span2_nodes = children(span2);
      span0 = claim_element(span2_nodes, "SPAN", {
        "aria-hidden": true,
        class: true
      });
      children(span0).forEach(detach_dev);
      t1 = claim_space(span2_nodes);
      span1 = claim_element(span2_nodes, "SPAN", {
        "aria-hidden": true,
        class: true
      });
      children(span1).forEach(detach_dev);
      span2_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "aria-hidden", "true");
      attr_dev(span0, "class", "bkg svelte-75un28");
      add_location(span0, file$7, 60, 2, 1287);
      attr_dev(span1, "aria-hidden", "true");
      attr_dev(span1, "class", "knob svelte-75un28");
      add_location(span1, file$7, 61, 2, 1334);
      attr_dev(span2, "class", "wrapper svelte-75un28");
      toggle_class(span2, "isRight", /*isRight*/ctx[4]);
      add_location(span2, file$7, 54, 1, 1197);
      attr_dev(div, "style", /*style*/ctx[3]);
      attr_dev(div, "title", /*title*/ctx[2]);
      attr_dev(div, "aria-label", /*title*/ctx[2]);
      attr_dev(div, "class", "switch svelte-75un28");
      attr_dev(div, "role", "button");
      attr_dev(div, "tabindex", "0");
      add_location(div, file$7, 43, 0, 1037);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_hydration_dev(div, t0);
      append_hydration_dev(div, span2);
      append_hydration_dev(span2, span0);
      append_hydration_dev(span2, t1);
      append_hydration_dev(span2, span1);
      append_hydration_dev(div, t2);
      if (if_block1) if_block1.m(div, null);
      if (!mounted) {
        dispose = [listen_dev(span2, "click", /*toggle*/ctx[5], false, false, false), listen_dev(span2, "keydown", /*onKeyDown*/ctx[6], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (! /*hideLabels*/ctx[1]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$4(ctx);
          if_block0.c();
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*isRight*/16) {
        toggle_class(span2, "isRight", /*isRight*/ctx[4]);
      }
      if (! /*hideLabels*/ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block$6(ctx);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*style*/8) {
        attr_dev(div, "style", /*style*/ctx[3]);
      }
      if (dirty & /*title*/4) {
        attr_dev(div, "title", /*title*/ctx[2]);
      }
      if (dirty & /*title*/4) {
        attr_dev(div, "aria-label", /*title*/ctx[2]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$d($$self, $$props, $$invalidate) {
  var currentValue;
  var isRight;
  var style;
  var title;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Switch', slots, []);
  var dispatch = createEventDispatcher();
  var defaultTheme = {
    color: 'black',
    backgroundColor: 'white',
    height: '24px',
    knobColor: 'lightgrey',
    outlineColor: 'black',
    outlineStyle: 'solid',
    outlineWidth: '1px'
  };
  var _$$props$value = $$props.value,
    value = _$$props$value === void 0 ? null : _$$props$value;
  var _$$props$values = $$props.values,
    values = _$$props$values === void 0 ? null : _$$props$values;
  var _$$props$theme = $$props.theme,
    theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$hideLabels = $$props.hideLabels,
    hideLabels = _$$props$hideLabels === void 0 ? false : _$$props$hideLabels;
  function toggle() {
    $$invalidate(9, currentValue = currentValue === values[0] ? values[1] : values[0]);
    dispatch('toggled', currentValue);
  }
  var onKeyDown = function onKeyDown(event) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      toggle();
    }
  };
  var writable_props = ['value', 'values', 'theme', 'hideLabels'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Switch> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('value' in $$props) $$invalidate(8, value = $$props.value);
    if ('values' in $$props) $$invalidate(0, values = $$props.values);
    if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
    if ('hideLabels' in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      createEventDispatcher: createEventDispatcher,
      dispatch: dispatch,
      defaultTheme: defaultTheme,
      value: value,
      values: values,
      theme: theme,
      hideLabels: hideLabels,
      toggle: toggle,
      onKeyDown: onKeyDown,
      currentValue: currentValue,
      title: title,
      style: style,
      isRight: isRight
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('value' in $$props) $$invalidate(8, value = $$props.value);
    if ('values' in $$props) $$invalidate(0, values = $$props.values);
    if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
    if ('hideLabels' in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
    if ('currentValue' in $$props) $$invalidate(9, currentValue = $$props.currentValue);
    if ('title' in $$props) $$invalidate(2, title = $$props.title);
    if ('style' in $$props) $$invalidate(3, style = $$props.style);
    if ('isRight' in $$props) $$invalidate(4, isRight = $$props.isRight);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value, values*/257) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(9, currentValue = value || values[0]);
    }
    if ($$self.$$.dirty & /*currentValue, values*/513) {
      $$invalidate(4, isRight = currentValue === values[1]);
    }
    if ($$self.$$.dirty & /*theme*/128) {
      $$invalidate(7, theme = theme ? _objectSpread$2(_objectSpread$2({}, defaultTheme), theme) : defaultTheme);
    }
    if ($$self.$$.dirty & /*theme*/128) {
      $$invalidate(3, style = makeStyleVars(theme));
    }
    if ($$self.$$.dirty & /*values*/1) {
      $$invalidate(2, title = "Select between ".concat(values[0], " and ").concat(values[1]));
    }
  };
  return [values, hideLabels, title, style, isRight, toggle, onKeyDown, theme, value, currentValue];
}
var Switch = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Switch, _SvelteComponentDev);
  var _super = _createSuper$d(Switch);
  function Switch(options) {
    var _this;
    _classCallCheck(this, Switch);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      value: 8,
      values: 0,
      theme: 7,
      hideLabels: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Switch",
      options: options,
      id: create_fragment$d.name
    });
    return _this;
  }
  _createClass(Switch, [{
    key: "value",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "values",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hideLabels",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Switch;
}(SvelteComponentDev);
var Switch$1 = Switch;

var defaultA11ySettings = {
  brightness: {
    defaultValue: 100,
    format: 'percentage',
    group: 'color',
    id: 'brightness',
    label: 'Brightness',
    next: 'contrast',
    prev: 'grayscale',
    range: [10, 150],
    value: 100
  },
  contrast: {
    defaultValue: 100,
    format: 'percentage',
    group: 'color',
    id: 'contrast',
    label: 'Contrast',
    next: null,
    prev: 'brightness',
    range: [10, 150],
    value: 100
  },
  cvd: {
    defaultValue: 'None',
    group: 'color',
    id: 'cvd',
    label: 'Color Vision Deficiency',
    next: 'hue',
    prev: 'invert',
    value: 'None',
    values: ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia']
  },
  fontScaling: {
    defaultValue: 100,
    format: 'percentage',
    group: 'text',
    id: 'fontScaling',
    label: 'Font scale',
    next: 'lineHeight',
    prev: 'typeface',
    value: 100,
    values: [50, 75, 100, 125, 150]
  },
  grayscale: {
    defaultValue: 0,
    format: 'percentage',
    group: 'color',
    id: 'grayscale',
    label: 'Grayscale',
    next: 'brightness',
    prev: 'hue',
    range: [0, 100],
    value: 0
  },
  hue: {
    defaultValue: 0,
    format: 'degrees',
    group: 'color',
    id: 'hue',
    label: 'Hue Shift',
    next: 'grayscale',
    prev: 'cvd',
    range: [0, 360],
    value: 0
  },
  invert: {
    defaultValue: false,
    format: 'boolean',
    group: 'color',
    id: 'invert',
    label: 'Invert',
    next: 'cvd',
    prev: 'wordSpacing',
    value: false
  },
  letterSpacing: {
    defaultValue: 0,
    format: 'percentage',
    group: 'text',
    id: 'letterSpacing',
    label: 'Letter spacing',
    next: 'wordSpacing',
    prev: 'lineHeight',
    value: 0,
    values: [0, 10, 20]
  },
  lineHeight: {
    defaultValue: 150,
    format: 'percentage',
    group: 'text',
    id: 'lineHeight',
    label: 'Line height',
    next: 'letterSpacing',
    prev: 'fontScaling',
    value: 150,
    values: [100, 125, 150, 175, 200]
  },
  typeface: {
    defaultValue: 'sans-serif',
    group: 'text',
    id: 'typeface',
    label: 'Font',
    next: 'fontScaling',
    prev: null,
    value: 'sans-serif',
    values: ['sans-serif', 'monospace']
  },
  wordSpacing: {
    defaultValue: 0,
    format: 'percentage',
    group: 'text',
    id: 'wordSpacing',
    label: 'Word spacing',
    next: 'invert',
    prev: 'letterSpacing',
    value: 0,
    values: [0, 20, 40]
  }
};
var _a11ySettings = writable(defaultA11ySettings);

/* init */

var isFirstSetting = pipe([getKey('prev'), isNull]);
var getFirstId = pipe([values, findWhere(isFirstSetting), getKey('id')]);
var firstId = getFirstId(defaultA11ySettings);

/* current setting */

var _currentId = writable(firstId);
var _currentSetting = derived([_a11ySettings, _currentId], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    settings = _ref2[0],
    id = _ref2[1];
  return settings[id];
});

/* formatting */

var formats = {
  'percentage': function percentage(value) {
    return "".concat(value, "%");
  },
  'degrees': function degrees(value) {
    return "".concat(value, "\xB0");
  },
  'boolean': function boolean(value) {
    return value ? 'Yes' : 'No';
  }
};
var _formatValue = derived(_currentSetting, function (setting) {
  return setting.format ? formats[setting.format] : identity;
});

/* navigation */

var setNextId = function setNextId() {
  return _currentId.set(get_store_value(_currentSetting).next);
};
var setPrevId = function setPrevId() {
  return _currentId.set(get_store_value(_currentSetting).prev);
};
var _hasPrev = derived(_currentSetting, pipe([getKey('prev'), isNotNull]));
var _hasNext = derived(_currentSetting, pipe([getKey('next'), isNotNull]));

/* update */

var isValueInRange = function isValueInRange(value, range) {
  return value >= range[0] && value <= range[1];
};
var updateSettingsOf = function updateSettingsOf(id, settings) {
  _a11ySettings.update(updateKey(id, mergeObj(settings)));
};
var updateCurrentValue = function updateCurrentValue(value) {
  var setting = get_store_value(_currentSetting);
  updateSettingsOf(setting.id, {
    value: value
  });
};

/* defaults */

var setValueToDefault = makeMergeAppliedFnMap({
  value: getKey('defaultValue')
});
var isValidValue = function isValidValue(setting) {
  return function (value) {
    return setting.values && value in setting.values || setting.range && isValueInRange(value, setting.range);
  };
};
var mergeOnlyUpdateValueIfInvalid = function mergeOnlyUpdateValueIfInvalid(newSetting, oldSetting) {
  var setting = isValidValue(newSetting)(oldSetting.value) ? skipIn(newSetting, ['value']) : newSetting;
  return merge(oldSetting, setting);
};
var mergeDefaultSettings = function mergeDefaultSettings(newDefaultSettings) {
  var mergedDefaultSettings = mapValuesWith(setValueToDefault)(newDefaultSettings);
  _a11ySettings.update(curry(mergeWith(mergeOnlyUpdateValueIfInvalid))(mergedDefaultSettings));
  return mergeWithMerge(defaultA11ySettings, mergedDefaultSettings);
};

/* resets */

var getGroupsResetStatus = pipe([values, groupBy(getKey('group')), mapValuesWith(pipe([mapWith(collect([getKey('value'), getKey('defaultValue')])), every(apply(areSame))]))]);
var _groupsResetStatus = derived(_a11ySettings, getGroupsResetStatus);
var _isA11yDirty = derived(_groupsResetStatus, pipe([values, some(not(identity))]));
var isNotOfGroup = function isNotOfGroup(groupId) {
  return pipe([getKey('group'), isNot(groupId)]);
};
var resetGroupItems = function resetGroupItems(groupId) {
  return mapValuesWith(adapter([casus(isNotOfGroup(groupId), identity), casus(hasKey('value'), setValueToDefault)]));
};
var resetGroup = function resetGroup(groupId) {
  return _a11ySettings.update(resetGroupItems(groupId));
};

/* Color corrections CSS property formatter */
var getValuesOrderedByKeys = function getValuesOrderedByKeys(keys) {
  return function (obj) {
    return map(keys, function (key) {
      return obj[key];
    });
  };
};
var hasDirtyValue = pipe([collect([getKey('defaultValue'), getKey('value')]), apply(not(areSame))]);
var cvdFilters = {
  Deuteranopia: 'url(#recolor-deuteranopia)',
  Protanopia: 'url(#recolor-protanopia)',
  Tritanopia: 'url(#recolor-tritanopia)'
};
var valueFormatters = {
  percentage: function percentage(value) {
    return "".concat(value, "%");
  },
  degrees: function degrees(value) {
    return "".concat(value, "deg");
  },
  boolean: function boolean(value) {
    return value ? '100%' : '0%';
  }
};
var getCssFilter = function getCssFilter(setting) {
  if (setting.id === 'cvd') {
    return cvdFilters[setting.value];
  }
  var filter = setting.id === 'hue' ? 'hue-rotate' : setting.id;
  return "".concat(filter, "(").concat(valueFormatters[setting.format](setting.value), ")");
};
var getColorCorrectionString = pipe([getValuesOrderedByKeys(['invert', 'cvd', 'hue', 'grayscale', 'brightness', 'contrast']), filterWith(hasDirtyValue), mapWith(getCssFilter), joinWith(' ')]);
var getColorStyles = applyFnMap({
  '--color-correction': getColorCorrectionString
});
var _a11yColorStyles = derived(_a11ySettings, getColorStyles);

/* Text corrections CSS property formatters */

var divideBy100 = divideBy(100);
var toRemPercent = pipe([divideBy100, makePostfixed('rem')]);
var getTextStyles = applyFnMap({
  'font-family': getPath('typeface.value'),
  'font-size': pipe([getPath('fontScaling.value'), toRemPercent]),
  'letter-spacing': pipe([getPath('letterSpacing.value'), toRemPercent]),
  'line-height': pipe([getPath('lineHeight.value'), divideBy100]),
  'word-spacing': pipe([getPath('wordSpacing.value'), toRemPercent])
});
var _a11yTextStyles = derived(_a11ySettings, getTextStyles);
var applyStyles = function applyStyles(domStyle, styles) {
  pairs(styles).forEach(function (prop) {
    return domStyle.setProperty.apply(domStyle, _toConsumableArray(prop));
  });
};

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$6 = "../../components/ui/src/a11y/menu/A11yMenu.svelte";
function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[30] = list[i];
  child_ctx[32] = i;
  return child_ctx;
}

// (180:50) 
function create_if_block_3(ctx) {
  var switch_1;
  var current;
  switch_1 = new Switch$1({
    props: {
      theme: /*switchTheme*/ctx[9],
      value: /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].value),
      values: ['No', 'Yes']
    },
    $$inline: true
  });
  switch_1.$on("toggled", /*toggled_handler*/ctx[27]);
  var block = {
    c: function create() {
      create_component(switch_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(switch_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(switch_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_1_changes = {};
      if (dirty[0] & /*switchTheme*/512) switch_1_changes.theme = /*switchTheme*/ctx[9];
      if (dirty[0] & /*$_formatValue, $_currentSetting*/160) switch_1_changes.value = /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].value);
      switch_1.$set(switch_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(switch_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(switch_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(switch_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(180:50) ",
    ctx: ctx
  });
  return block;
}

// (162:35) 
function create_if_block_2(ctx) {
  var div;
  var span0;
  var t0_value = /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].range[0]) + "";
  var t0;
  var t1;
  var input;
  var input_max_value;
  var input_min_value;
  var input_name_value;
  var input_value_value;
  var t2;
  var span1;
  var t3_value = /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].range[1]) + "";
  var t3;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div = element("div");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      t2 = space();
      span1 = element("span");
      t3 = text(t3_value);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span0 = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span0_nodes = children(span0);
      t0 = claim_text(span0_nodes, t0_value);
      span0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      input = claim_element(div_nodes, "INPUT", {
        class: true,
        max: true,
        min: true,
        name: true,
        type: true
      });
      t2 = claim_space(div_nodes);
      span1 = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span1_nodes = children(span1);
      t3 = claim_text(span1_nodes, t3_value);
      span1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "svelte-1sr6293");
      add_location(span0, file$6, 163, 4, 4435);
      attr_dev(input, "class", "clickable svelte-1sr6293");
      attr_dev(input, "max", input_max_value = /*$_currentSetting*/ctx[5].range[1]);
      attr_dev(input, "min", input_min_value = /*$_currentSetting*/ctx[5].range[0]);
      attr_dev(input, "name", input_name_value = /*$_currentSetting*/ctx[5].id);
      attr_dev(input, "type", "range");
      input.value = input_value_value = /*$_currentSetting*/ctx[5].value;
      add_location(input, file$6, 166, 4, 4506);
      attr_dev(span1, "class", "svelte-1sr6293");
      add_location(span1, file$6, 175, 4, 4771);
      attr_dev(div, "class", "slider svelte-1sr6293");
      add_location(div, file$6, 162, 3, 4410);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, span0);
      append_hydration_dev(span0, t0);
      append_hydration_dev(div, t1);
      append_hydration_dev(div, input);
      append_hydration_dev(div, t2);
      append_hydration_dev(div, span1);
      append_hydration_dev(span1, t3);
      if (!mounted) {
        dispose = listen_dev(input, "input", /*input_handler*/ctx[26], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*$_formatValue, $_currentSetting*/160 && t0_value !== (t0_value = /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].range[0]) + "")) set_data_dev(t0, t0_value);
      if (dirty[0] & /*$_currentSetting*/32 && input_max_value !== (input_max_value = /*$_currentSetting*/ctx[5].range[1])) {
        attr_dev(input, "max", input_max_value);
      }
      if (dirty[0] & /*$_currentSetting*/32 && input_min_value !== (input_min_value = /*$_currentSetting*/ctx[5].range[0])) {
        attr_dev(input, "min", input_min_value);
      }
      if (dirty[0] & /*$_currentSetting*/32 && input_name_value !== (input_name_value = /*$_currentSetting*/ctx[5].id)) {
        attr_dev(input, "name", input_name_value);
      }
      if (dirty[0] & /*$_currentSetting*/32 && input_value_value !== (input_value_value = /*$_currentSetting*/ctx[5].value)) {
        prop_dev(input, "value", input_value_value);
      }
      if (dirty[0] & /*$_formatValue, $_currentSetting*/160 && t3_value !== (t3_value = /*$_formatValue*/ctx[7]( /*$_currentSetting*/ctx[5].range[1]) + "")) set_data_dev(t3, t3_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(162:35) ",
    ctx: ctx
  });
  return block;
}

// (113:2) {#if $_currentSetting.values}
function create_if_block$5(ctx) {
  var div;
  var current_block_type_index;
  var if_block;
  var current;
  var if_block_creators = [create_if_block_1$3, create_else_block$1];
  var if_blocks = [];
  function select_block_type_1(ctx, dirty) {
    if ( /*useRadios*/ctx[13]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "controlContainer svelte-1sr6293");
      add_location(div, file$6, 113, 3, 3111);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(113:2) {#if $_currentSetting.values}",
    ctx: ctx
  });
  return block;
}

// (131:4) {:else}
function create_else_block$1(ctx) {
  var button0;
  var icon0;
  var button0_aria_label_value;
  var button0_disabled_value;
  var t;
  var button1;
  var icon1;
  var button1_aria_label_value;
  var button1_disabled_value;
  var current;
  var mounted;
  var dispose;
  icon0 = new Icon$1({
    props: {
      glyph: /*hasNumericValues*/ctx[12] ? MinusCircle$1 : ArrowLeftCircle$1,
      stroke: /*hasPrevValue*/ctx[4] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled
    },
    $$inline: true
  });
  icon1 = new Icon$1({
    props: {
      glyph: /*hasNumericValues*/ctx[12] ? PlusCircle$1 : ArrowRightCircle$1,
      stroke: /*hasNextValue*/ctx[3] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      button0 = element("button");
      create_component(icon0.$$.fragment);
      t = space();
      button1 = element("button");
      create_component(icon1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      button0 = claim_element(nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button0_nodes = children(button0);
      claim_component(icon0.$$.fragment, button0_nodes);
      button0_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      button1 = claim_element(nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button1_nodes = children(button1);
      claim_component(icon1.$$.fragment, button1_nodes);
      button1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(button0, "aria-label", button0_aria_label_value = "Previous ".concat( /*hasNumericValues*/ctx[12] ? 'numeric' : 'alphanumeric', " value"));
      button0.disabled = button0_disabled_value = ! /*hasPrevValue*/ctx[4];
      attr_dev(button0, "class", "svelte-1sr6293");
      toggle_class(button0, "clickable", /*hasPrevValue*/ctx[4]);
      add_location(button0, file$6, 131, 5, 3568);
      attr_dev(button1, "aria-label", button1_aria_label_value = "Next ".concat( /*hasNumericValues*/ctx[12] ? 'numeric' : 'alphanumeric', " value"));
      button1.disabled = button1_disabled_value = ! /*hasNextValue*/ctx[3];
      attr_dev(button1, "class", "svelte-1sr6293");
      toggle_class(button1, "clickable", /*hasNextValue*/ctx[3]);
      add_location(button1, file$6, 145, 5, 3964);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, button0, anchor);
      mount_component(icon0, button0, null);
      insert_hydration_dev(target, t, anchor);
      insert_hydration_dev(target, button1, anchor);
      mount_component(icon1, button1, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(button0, "click", function () {
          if (is_function( /*clickedPrev*/ctx[11])) /*clickedPrev*/ctx[11].apply(this, arguments);
        }, false, false, false), listen_dev(button1, "click", function () {
          if (is_function( /*clickedNext*/ctx[10])) /*clickedNext*/ctx[10].apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var icon0_changes = {};
      if (dirty[0] & /*hasNumericValues*/4096) icon0_changes.glyph = /*hasNumericValues*/ctx[12] ? MinusCircle$1 : ArrowLeftCircle$1;
      if (dirty[0] & /*hasPrevValue, theme*/17) icon0_changes.stroke = /*hasPrevValue*/ctx[4] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled;
      icon0.$set(icon0_changes);
      if (!current || dirty[0] & /*hasNumericValues*/4096 && button0_aria_label_value !== (button0_aria_label_value = "Previous ".concat( /*hasNumericValues*/ctx[12] ? 'numeric' : 'alphanumeric', " value"))) {
        attr_dev(button0, "aria-label", button0_aria_label_value);
      }
      if (!current || dirty[0] & /*hasPrevValue*/16 && button0_disabled_value !== (button0_disabled_value = ! /*hasPrevValue*/ctx[4])) {
        prop_dev(button0, "disabled", button0_disabled_value);
      }
      if (!current || dirty[0] & /*hasPrevValue*/16) {
        toggle_class(button0, "clickable", /*hasPrevValue*/ctx[4]);
      }
      var icon1_changes = {};
      if (dirty[0] & /*hasNumericValues*/4096) icon1_changes.glyph = /*hasNumericValues*/ctx[12] ? PlusCircle$1 : ArrowRightCircle$1;
      if (dirty[0] & /*hasNextValue, theme*/9) icon1_changes.stroke = /*hasNextValue*/ctx[3] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled;
      icon1.$set(icon1_changes);
      if (!current || dirty[0] & /*hasNumericValues*/4096 && button1_aria_label_value !== (button1_aria_label_value = "Next ".concat( /*hasNumericValues*/ctx[12] ? 'numeric' : 'alphanumeric', " value"))) {
        attr_dev(button1, "aria-label", button1_aria_label_value);
      }
      if (!current || dirty[0] & /*hasNextValue*/8 && button1_disabled_value !== (button1_disabled_value = ! /*hasNextValue*/ctx[3])) {
        prop_dev(button1, "disabled", button1_disabled_value);
      }
      if (!current || dirty[0] & /*hasNextValue*/8) {
        toggle_class(button1, "clickable", /*hasNextValue*/ctx[3]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button0);
      destroy_component(icon0);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(button1);
      destroy_component(icon1);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(131:4) {:else}",
    ctx: ctx
  });
  return block;
}

// (115:4) {#if useRadios}
function create_if_block_1$3(ctx) {
  var each_1_anchor;
  var each_value = /*$_currentSetting*/ctx[5].values;
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }
      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }
      insert_hydration_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*$_currentSetting, $_formatValue*/160) {
        each_value = /*$_currentSetting*/ctx[5].values;
        validate_each_argument(each_value);
        var _i4;
        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(115:4) {#if useRadios}",
    ctx: ctx
  });
  return block;
}

// (116:5) {#each $_currentSetting.values as value, index}
function create_each_block(ctx) {
  var div;
  var label_1;
  var t0_value = /*$_formatValue*/ctx[7]( /*value*/ctx[30]) + "";
  var t0;
  var t1;
  var input;
  var input_checked_value;
  var input_value_value;
  var t2;
  var mounted;
  var dispose;
  function change_handler() {
    return (/*change_handler*/ctx[25]( /*value*/ctx[30])
    );
  }
  var block = {
    c: function create() {
      div = element("div");
      label_1 = element("label");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      label_1 = claim_element(div_nodes, "LABEL", {
        for: true,
        class: true
      });
      var label_1_nodes = children(label_1);
      t0 = claim_text(label_1_nodes, t0_value);
      label_1_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      input = claim_element(div_nodes, "INPUT", {
        id: true,
        class: true,
        type: true
      });
      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(label_1, "for", "input-" + /*index*/ctx[32]);
      attr_dev(label_1, "class", "svelte-1sr6293");
      add_location(label_1, file$6, 117, 7, 3234);
      attr_dev(input, "id", "input-" + /*index*/ctx[32]);
      input.checked = input_checked_value = /*$_currentSetting*/ctx[5].value === /*value*/ctx[30];
      attr_dev(input, "class", "clickable svelte-1sr6293");
      attr_dev(input, "type", "radio");
      input.value = input_value_value = /*value*/ctx[30];
      add_location(input, file$6, 120, 7, 3316);
      add_location(div, file$6, 116, 6, 3221);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, label_1);
      append_hydration_dev(label_1, t0);
      append_hydration_dev(div, t1);
      append_hydration_dev(div, input);
      append_hydration_dev(div, t2);
      if (!mounted) {
        dispose = listen_dev(input, "change", change_handler, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*$_formatValue, $_currentSetting*/160 && t0_value !== (t0_value = /*$_formatValue*/ctx[7]( /*value*/ctx[30]) + "")) set_data_dev(t0, t0_value);
      if (dirty[0] & /*$_currentSetting*/32 && input_checked_value !== (input_checked_value = /*$_currentSetting*/ctx[5].value === /*value*/ctx[30])) {
        prop_dev(input, "checked", input_checked_value);
      }
      if (dirty[0] & /*$_currentSetting*/32 && input_value_value !== (input_value_value = /*value*/ctx[30])) {
        prop_dev(input, "value", input_value_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(116:5) {#each $_currentSetting.values as value, index}",
    ctx: ctx
  });
  return block;
}
function create_fragment$c(ctx) {
  var dialog;
  var nav0;
  var button0;
  var icon0;
  var t0;
  var button1;
  var icon1;
  var t1;
  var menu;
  var label_1;
  var t2;
  var t3;
  var current_block_type_index;
  var if_block;
  var menu_resize_listener;
  var t4;
  var nav1;
  var button2;
  var icon2;
  var button2_disabled_value;
  var t5;
  var button3;
  var icon3;
  var button3_disabled_value;
  var dialog_class_value;
  var current;
  var mounted;
  var dispose;
  icon0 = new Icon$1({
    props: {
      fill: /*$_groupsResetStatus*/ctx[15].text ? /*theme*/ctx[0].colorDisabled : /*theme*/ctx[0].colorText,
      glyph: FormatClear$1,
      stroke: "none"
    },
    $$inline: true
  });
  icon1 = new Icon$1({
    props: {
      fill: /*$_groupsResetStatus*/ctx[15].color ? /*theme*/ctx[0].colorDisabled : /*theme*/ctx[0].colorText,
      glyph: ColorClear$1,
      stroke: "none"
    },
    $$inline: true
  });
  var if_block_creators = [create_if_block$5, create_if_block_2, create_if_block_3];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*$_currentSetting*/ctx[5].values) return 0;
    if ( /*$_currentSetting*/ctx[5].range) return 1;
    if ( /*$_currentSetting*/ctx[5].format === 'boolean') return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  icon2 = new Icon$1({
    props: {
      glyph: ChevronLeft$1,
      stroke: /*$_hasPrev*/ctx[16] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled
    },
    $$inline: true
  });
  icon3 = new Icon$1({
    props: {
      glyph: ChevronRight$1,
      stroke: /*$_hasNext*/ctx[17] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      dialog = element("dialog");
      nav0 = element("nav");
      button0 = element("button");
      create_component(icon0.$$.fragment);
      t0 = space();
      button1 = element("button");
      create_component(icon1.$$.fragment);
      t1 = space();
      menu = element("menu");
      label_1 = element("label");
      t2 = text( /*label*/ctx[14]);
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();
      nav1 = element("nav");
      button2 = element("button");
      create_component(icon2.$$.fragment);
      t5 = space();
      button3 = element("button");
      create_component(icon3.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      dialog = claim_element(nodes, "DIALOG", {
        style: true,
        "aria-label": true,
        class: true
      });
      var dialog_nodes = children(dialog);
      nav0 = claim_element(dialog_nodes, "NAV", {
        class: true
      });
      var nav0_nodes = children(nav0);
      button0 = claim_element(nav0_nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button0_nodes = children(button0);
      claim_component(icon0.$$.fragment, button0_nodes);
      button0_nodes.forEach(detach_dev);
      t0 = claim_space(nav0_nodes);
      button1 = claim_element(nav0_nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button1_nodes = children(button1);
      claim_component(icon1.$$.fragment, button1_nodes);
      button1_nodes.forEach(detach_dev);
      nav0_nodes.forEach(detach_dev);
      t1 = claim_space(dialog_nodes);
      menu = claim_element(dialog_nodes, "MENU", {
        class: true
      });
      var menu_nodes = children(menu);
      label_1 = claim_element(menu_nodes, "LABEL", {
        for: true,
        class: true
      });
      var label_1_nodes = children(label_1);
      t2 = claim_text(label_1_nodes, /*label*/ctx[14]);
      label_1_nodes.forEach(detach_dev);
      t3 = claim_space(menu_nodes);
      if (if_block) if_block.l(menu_nodes);
      menu_nodes.forEach(detach_dev);
      t4 = claim_space(dialog_nodes);
      nav1 = claim_element(dialog_nodes, "NAV", {
        class: true
      });
      var nav1_nodes = children(nav1);
      button2 = claim_element(nav1_nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button2_nodes = children(button2);
      claim_component(icon2.$$.fragment, button2_nodes);
      button2_nodes.forEach(detach_dev);
      t5 = claim_space(nav1_nodes);
      button3 = claim_element(nav1_nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button3_nodes = children(button3);
      claim_component(icon3.$$.fragment, button3_nodes);
      button3_nodes.forEach(detach_dev);
      nav1_nodes.forEach(detach_dev);
      dialog_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      var _ctx$;
      attr_dev(button0, "aria-label", "Reset text accessibility adjustments");
      attr_dev(button0, "class", "text svelte-1sr6293");
      toggle_class(button0, "clickable", ! /*$_groupsResetStatus*/ctx[15].text);
      add_location(button0, file$6, 79, 2, 2337);
      attr_dev(button1, "aria-label", "Reset color accessibility adjustments");
      attr_dev(button1, "class", "color svelte-1sr6293");
      toggle_class(button1, "clickable", ! /*$_groupsResetStatus*/ctx[15].color);
      add_location(button1, file$6, 94, 2, 2667);
      attr_dev(nav0, "class", "resets svelte-1sr6293");
      add_location(nav0, file$6, 78, 1, 2314);
      attr_dev(label_1, "for", "");
      attr_dev(label_1, "class", "svelte-1sr6293");
      add_location(label_1, file$6, 111, 2, 3046);
      attr_dev(menu, "class", "svelte-1sr6293");
      add_render_callback(function () {
        return (/*menu_elementresize_handler*/ctx[28].call(menu)
        );
      });
      add_location(menu, file$6, 110, 1, 3008);
      attr_dev(button2, "aria-label", "Previous Setting");
      button2.disabled = button2_disabled_value = ! /*$_hasPrev*/ctx[16];
      attr_dev(button2, "class", "svelte-1sr6293");
      toggle_class(button2, "clickable", /*$_hasPrev*/ctx[16]);
      add_location(button2, file$6, 189, 2, 5123);
      attr_dev(button3, "aria-label", "Next Setting");
      button3.disabled = button3_disabled_value = ! /*$_hasNext*/ctx[17];
      attr_dev(button3, "class", "svelte-1sr6293");
      toggle_class(button3, "clickable", /*$_hasNext*/ctx[17]);
      add_location(button3, file$6, 203, 2, 5380);
      attr_dev(nav1, "class", "nav svelte-1sr6293");
      add_location(nav1, file$6, 188, 1, 5103);
      attr_dev(dialog, "style", /*style*/ctx[8]);
      attr_dev(dialog, "aria-label", "Accessibility settings");
      attr_dev(dialog, "class", dialog_class_value = "" + (null_to_empty( /*$_screen*/(_ctx$ = ctx[6]) === null || _ctx$ === void 0 ? void 0 : _ctx$.classes) + " svelte-1sr6293"));
      add_location(dialog, file$6, 73, 0, 2230);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, dialog, anchor);
      append_hydration_dev(dialog, nav0);
      append_hydration_dev(nav0, button0);
      mount_component(icon0, button0, null);
      append_hydration_dev(nav0, t0);
      append_hydration_dev(nav0, button1);
      mount_component(icon1, button1, null);
      append_hydration_dev(dialog, t1);
      append_hydration_dev(dialog, menu);
      append_hydration_dev(menu, label_1);
      append_hydration_dev(label_1, t2);
      append_hydration_dev(menu, t3);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(menu, null);
      }
      menu_resize_listener = add_resize_listener(menu, /*menu_elementresize_handler*/ctx[28].bind(menu));
      append_hydration_dev(dialog, t4);
      append_hydration_dev(dialog, nav1);
      append_hydration_dev(nav1, button2);
      mount_component(icon2, button2, null);
      append_hydration_dev(nav1, t5);
      append_hydration_dev(nav1, button3);
      mount_component(icon3, button3, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(button0, "click", /*click_handler*/ctx[23], false, false, false), listen_dev(button1, "click", /*click_handler_1*/ctx[24], false, false, false), listen_dev(button2, "click", setPrevId, false, false, false), listen_dev(button3, "click", setNextId, false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      var _ctx$2;
      var icon0_changes = {};
      if (dirty[0] & /*$_groupsResetStatus, theme*/32769) icon0_changes.fill = /*$_groupsResetStatus*/ctx[15].text ? /*theme*/ctx[0].colorDisabled : /*theme*/ctx[0].colorText;
      icon0.$set(icon0_changes);
      if (!current || dirty[0] & /*$_groupsResetStatus*/32768) {
        toggle_class(button0, "clickable", ! /*$_groupsResetStatus*/ctx[15].text);
      }
      var icon1_changes = {};
      if (dirty[0] & /*$_groupsResetStatus, theme*/32769) icon1_changes.fill = /*$_groupsResetStatus*/ctx[15].color ? /*theme*/ctx[0].colorDisabled : /*theme*/ctx[0].colorText;
      icon1.$set(icon1_changes);
      if (!current || dirty[0] & /*$_groupsResetStatus*/32768) {
        toggle_class(button1, "clickable", ! /*$_groupsResetStatus*/ctx[15].color);
      }
      if (!current || dirty[0] & /*label*/16384) set_data_dev(t2, /*label*/ctx[14]);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block.c();
          } else {
            if_block.p(ctx, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(menu, null);
        } else {
          if_block = null;
        }
      }
      var icon2_changes = {};
      if (dirty[0] & /*$_hasPrev, theme*/65537) icon2_changes.stroke = /*$_hasPrev*/ctx[16] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled;
      icon2.$set(icon2_changes);
      if (!current || dirty[0] & /*$_hasPrev*/65536 && button2_disabled_value !== (button2_disabled_value = ! /*$_hasPrev*/ctx[16])) {
        prop_dev(button2, "disabled", button2_disabled_value);
      }
      if (!current || dirty[0] & /*$_hasPrev*/65536) {
        toggle_class(button2, "clickable", /*$_hasPrev*/ctx[16]);
      }
      var icon3_changes = {};
      if (dirty[0] & /*$_hasNext, theme*/131073) icon3_changes.stroke = /*$_hasNext*/ctx[17] ? /*theme*/ctx[0].colorText : /*theme*/ctx[0].colorDisabled;
      icon3.$set(icon3_changes);
      if (!current || dirty[0] & /*$_hasNext*/131072 && button3_disabled_value !== (button3_disabled_value = ! /*$_hasNext*/ctx[17])) {
        prop_dev(button3, "disabled", button3_disabled_value);
      }
      if (!current || dirty[0] & /*$_hasNext*/131072) {
        toggle_class(button3, "clickable", /*$_hasNext*/ctx[17]);
      }
      if (!current || dirty[0] & /*style*/256) {
        attr_dev(dialog, "style", /*style*/ctx[8]);
      }
      if (!current || dirty[0] & /*$_screen*/64 && dialog_class_value !== (dialog_class_value = "" + (null_to_empty( /*$_screen*/(_ctx$2 = ctx[6]) === null || _ctx$2 === void 0 ? void 0 : _ctx$2.classes) + " svelte-1sr6293"))) {
        attr_dev(dialog, "class", dialog_class_value);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      transition_in(if_block);
      transition_in(icon2.$$.fragment, local);
      transition_in(icon3.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      transition_out(if_block);
      transition_out(icon2.$$.fragment, local);
      transition_out(icon3.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(dialog);
      destroy_component(icon0);
      destroy_component(icon1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      menu_resize_listener();
      destroy_component(icon2);
      destroy_component(icon3);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var gap = 24;
function instance$c($$self, $$props, $$invalidate) {
  var label;
  var settingValues;
  var getValueWidth;
  var useRadios;
  var hasNumericValues;
  var currentValueIndex;
  var prevValue;
  var nextValue;
  var hasPrevValue;
  var hasNextValue;
  var clickedPrev;
  var clickedNext;
  var switchTheme;
  var style;
  var $_currentSetting;
  var $_screen,
    $$unsubscribe__screen = noop,
    $$subscribe__screen = function $$subscribe__screen() {
      return $$unsubscribe__screen(), $$unsubscribe__screen = subscribe(_screen, function ($$value) {
        return $$invalidate(6, $_screen = $$value);
      }), _screen;
    };
  var $_formatValue;
  var $_groupsResetStatus;
  var $_hasPrev;
  var $_hasNext;
  validate_store(_currentSetting, '_currentSetting');
  component_subscribe($$self, _currentSetting, function ($$value) {
    return $$invalidate(5, $_currentSetting = $$value);
  });
  validate_store(_formatValue, '_formatValue');
  component_subscribe($$self, _formatValue, function ($$value) {
    return $$invalidate(7, $_formatValue = $$value);
  });
  validate_store(_groupsResetStatus, '_groupsResetStatus');
  component_subscribe($$self, _groupsResetStatus, function ($$value) {
    return $$invalidate(15, $_groupsResetStatus = $$value);
  });
  validate_store(_hasPrev, '_hasPrev');
  component_subscribe($$self, _hasPrev, function ($$value) {
    return $$invalidate(16, $_hasPrev = $$value);
  });
  validate_store(_hasNext, '_hasNext');
  component_subscribe($$self, _hasNext, function ($$value) {
    return $$invalidate(17, $_hasNext = $$value);
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__screen();
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('A11yMenu', slots, []);
  var _screen = $$props._screen;
  validate_store(_screen, '_screen');
  $$subscribe__screen();
  var theme = $$props.theme;
  var menuWidth; // bound

  var defaultTheme = {
    colorBackground: 'white',
    colorBorder: 'black',
    colorKnob: 'gray',
    colorDisabled: 'silver',
    colorText: 'black'
  };
  $$self.$$.on_mount.push(function () {
    if (_screen === undefined && !('_screen' in $$props || $$self.$$.bound[$$self.$$.props['_screen']])) {
      console.warn("<A11yMenu> was created without expected prop '_screen'");
    }
    if (theme === undefined && !('theme' in $$props || $$self.$$.bound[$$self.$$.props['theme']])) {
      console.warn("<A11yMenu> was created without expected prop 'theme'");
    }
  });
  var writable_props = ['_screen', 'theme'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<A11yMenu> was created with unknown prop '".concat(key, "'"));
  });
  var click_handler = function click_handler() {
    return resetGroup('text');
  };
  var click_handler_1 = function click_handler_1() {
    return resetGroup('color');
  };
  var change_handler = function change_handler(value) {
    return updateCurrentValue(value);
  };
  var input_handler = function input_handler(_ref) {
    var value = _ref.target.value;
    return updateCurrentValue(value);
  };
  var toggled_handler = function toggled_handler(_ref2) {
    var detail = _ref2.detail;
    return updateCurrentValue(detail === 'Yes');
  };
  function menu_elementresize_handler() {
    menuWidth = this.clientWidth;
    $$invalidate(2, menuWidth);
  }
  $$self.$$set = function ($$props) {
    if ('_screen' in $$props) $$subscribe__screen($$invalidate(1, _screen = $$props._screen));
    if ('theme' in $$props) $$invalidate(0, theme = $$props.theme);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      toPx: toPx,
      isNotNil: isNotNil,
      isNumber: isNumber,
      _: _,
      ArrowLeftCircle: ArrowLeftCircle$1,
      ArrowRightCircle: ArrowRightCircle$1,
      ChevronLeft: ChevronLeft$1,
      ChevronRight: ChevronRight$1,
      MinusCircle: MinusCircle$1,
      PlusCircle: PlusCircle$1,
      ColorClear: ColorClear$1,
      FormatClear: FormatClear$1,
      Icon: Icon$1,
      Switch: Switch$1,
      _currentSetting: _currentSetting,
      _formatValue: _formatValue,
      _groupsResetStatus: _groupsResetStatus,
      _hasNext: _hasNext,
      _hasPrev: _hasPrev,
      resetGroup: resetGroup,
      setNextId: setNextId,
      setPrevId: setPrevId,
      updateCurrentValue: updateCurrentValue,
      _screen: _screen,
      theme: theme,
      menuWidth: menuWidth,
      gap: gap,
      defaultTheme: defaultTheme,
      style: style,
      switchTheme: switchTheme,
      nextValue: nextValue,
      hasNextValue: hasNextValue,
      clickedNext: clickedNext,
      prevValue: prevValue,
      hasPrevValue: hasPrevValue,
      clickedPrev: clickedPrev,
      currentValueIndex: currentValueIndex,
      settingValues: settingValues,
      hasNumericValues: hasNumericValues,
      getValueWidth: getValueWidth,
      useRadios: useRadios,
      label: label,
      $_currentSetting: $_currentSetting,
      $_screen: $_screen,
      $_formatValue: $_formatValue,
      $_groupsResetStatus: $_groupsResetStatus,
      $_hasPrev: $_hasPrev,
      $_hasNext: $_hasNext
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('_screen' in $$props) $$subscribe__screen($$invalidate(1, _screen = $$props._screen));
    if ('theme' in $$props) $$invalidate(0, theme = $$props.theme);
    if ('menuWidth' in $$props) $$invalidate(2, menuWidth = $$props.menuWidth);
    if ('style' in $$props) $$invalidate(8, style = $$props.style);
    if ('switchTheme' in $$props) $$invalidate(9, switchTheme = $$props.switchTheme);
    if ('nextValue' in $$props) $$invalidate(18, nextValue = $$props.nextValue);
    if ('hasNextValue' in $$props) $$invalidate(3, hasNextValue = $$props.hasNextValue);
    if ('clickedNext' in $$props) $$invalidate(10, clickedNext = $$props.clickedNext);
    if ('prevValue' in $$props) $$invalidate(19, prevValue = $$props.prevValue);
    if ('hasPrevValue' in $$props) $$invalidate(4, hasPrevValue = $$props.hasPrevValue);
    if ('clickedPrev' in $$props) $$invalidate(11, clickedPrev = $$props.clickedPrev);
    if ('currentValueIndex' in $$props) $$invalidate(20, currentValueIndex = $$props.currentValueIndex);
    if ('settingValues' in $$props) $$invalidate(21, settingValues = $$props.settingValues);
    if ('hasNumericValues' in $$props) $$invalidate(12, hasNumericValues = $$props.hasNumericValues);
    if ('getValueWidth' in $$props) $$invalidate(22, getValueWidth = $$props.getValueWidth);
    if ('useRadios' in $$props) $$invalidate(13, useRadios = $$props.useRadios);
    if ('label' in $$props) $$invalidate(14, label = $$props.label);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] & /*$_currentSetting, $_formatValue*/160) {
      $$invalidate(14, label = "".concat($_currentSetting.label, ": ").concat($_formatValue($_currentSetting.value)));
    }
    if ($$self.$$.dirty[0] & /*$_currentSetting*/32) {
      $$invalidate(21, settingValues = $_currentSetting.values || []);
    }
    if ($$self.$$.dirty[0] & /*$_formatValue, $_screen*/192) {
      $$invalidate(22, getValueWidth = function getValueWidth(value) {
        var _$_screen;
        return $_formatValue(value).length * ((_$_screen = $_screen) === null || _$_screen === void 0 ? void 0 : _$_screen.glyph.width);
      });
    }
    if ($$self.$$.dirty[0] & /*menuWidth, settingValues, getValueWidth*/6291460) {
      $$invalidate(13, useRadios = menuWidth >= reduce(settingValues, function (acc, value) {
        return getValueWidth(value) + gap + acc;
      }, 0));
    }
    if ($$self.$$.dirty[0] & /*settingValues*/2097152) {
      $$invalidate(12, hasNumericValues = isNumber(settingValues[0]));
    }
    if ($$self.$$.dirty[0] & /*settingValues, $_currentSetting*/2097184) {
      $$invalidate(20, currentValueIndex = findIndex(settingValues, is($_currentSetting.value)));
    }
    if ($$self.$$.dirty[0] & /*settingValues, currentValueIndex*/3145728) {
      $$invalidate(19, prevValue = settingValues[currentValueIndex - 1]);
    }
    if ($$self.$$.dirty[0] & /*settingValues, currentValueIndex*/3145728) {
      $$invalidate(18, nextValue = settingValues[currentValueIndex + 1]);
    }
    if ($$self.$$.dirty[0] & /*prevValue*/524288) {
      $$invalidate(4, hasPrevValue = isNotNil(prevValue));
    }
    if ($$self.$$.dirty[0] & /*nextValue*/262144) {
      $$invalidate(3, hasNextValue = isNotNil(nextValue));
    }
    if ($$self.$$.dirty[0] & /*hasPrevValue, prevValue*/524304) {
      $$invalidate(11, clickedPrev = function clickedPrev() {
        return hasPrevValue && updateCurrentValue(prevValue);
      });
    }
    if ($$self.$$.dirty[0] & /*hasNextValue, nextValue*/262152) {
      $$invalidate(10, clickedNext = function clickedNext() {
        return hasNextValue && updateCurrentValue(nextValue);
      });
    }
    if ($$self.$$.dirty[0] & /*theme*/1) {
      $$invalidate(0, theme = _objectSpread$1(_objectSpread$1({}, defaultTheme), theme));
    }
    if ($$self.$$.dirty[0] & /*theme*/1) {
      $$invalidate(9, switchTheme = {
        color: theme.colorText,
        backgroundColor: theme.colorBackground,
        knobColor: theme.colorKnob
      });
    }
    if ($$self.$$.dirty[0] & /*theme*/1) {
      $$invalidate(8, style = makeStyleVars(_objectSpread$1({
        gap: toPx(gap)
      }, theme)));
    }
  };
  return [theme, _screen, menuWidth, hasNextValue, hasPrevValue, $_currentSetting, $_screen, $_formatValue, style, switchTheme, clickedNext, clickedPrev, hasNumericValues, useRadios, label, $_groupsResetStatus, $_hasPrev, $_hasNext, nextValue, prevValue, currentValueIndex, settingValues, getValueWidth, click_handler, click_handler_1, change_handler, input_handler, toggled_handler, menu_elementresize_handler];
}
var A11yMenu = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A11yMenu, _SvelteComponentDev);
  var _super = _createSuper$c(A11yMenu);
  function A11yMenu(options) {
    var _this;
    _classCallCheck(this, A11yMenu);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      _screen: 1,
      theme: 0
    }, null, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A11yMenu",
      options: options,
      id: create_fragment$c.name
    });
    return _this;
  }
  _createClass(A11yMenu, [{
    key: "_screen",
    get: function get() {
      throw new Error("<A11yMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A11yMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<A11yMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A11yMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return A11yMenu;
}(SvelteComponentDev);
var A11yMenu$1 = A11yMenu;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

// NOTE: this list must be up-to-date with browsers listed in
// test/acceptance/useragentstrings.yml
var BROWSER_ALIASES_MAP = {
  'Amazon Silk': 'amazon_silk',
  'Android Browser': 'android',
  Bada: 'bada',
  BlackBerry: 'blackberry',
  Chrome: 'chrome',
  Chromium: 'chromium',
  Electron: 'electron',
  Epiphany: 'epiphany',
  Firefox: 'firefox',
  Focus: 'focus',
  Generic: 'generic',
  'Google Search': 'google_search',
  Googlebot: 'googlebot',
  'Internet Explorer': 'ie',
  'K-Meleon': 'k_meleon',
  Maxthon: 'maxthon',
  'Microsoft Edge': 'edge',
  'MZ Browser': 'mz',
  'NAVER Whale Browser': 'naver',
  Opera: 'opera',
  'Opera Coast': 'opera_coast',
  PhantomJS: 'phantomjs',
  Puffin: 'puffin',
  QupZilla: 'qupzilla',
  QQ: 'qq',
  QQLite: 'qqlite',
  Safari: 'safari',
  Sailfish: 'sailfish',
  'Samsung Internet for Android': 'samsung_internet',
  SeaMonkey: 'seamonkey',
  Sleipnir: 'sleipnir',
  Swing: 'swing',
  Tizen: 'tizen',
  'UC Browser': 'uc',
  Vivaldi: 'vivaldi',
  'WebOS Browser': 'webos',
  WeChat: 'wechat',
  'Yandex Browser': 'yandex',
  Roku: 'roku'
};
var BROWSER_MAP = {
  amazon_silk: 'Amazon Silk',
  android: 'Android Browser',
  bada: 'Bada',
  blackberry: 'BlackBerry',
  chrome: 'Chrome',
  chromium: 'Chromium',
  electron: 'Electron',
  epiphany: 'Epiphany',
  firefox: 'Firefox',
  focus: 'Focus',
  generic: 'Generic',
  googlebot: 'Googlebot',
  google_search: 'Google Search',
  ie: 'Internet Explorer',
  k_meleon: 'K-Meleon',
  maxthon: 'Maxthon',
  edge: 'Microsoft Edge',
  mz: 'MZ Browser',
  naver: 'NAVER Whale Browser',
  opera: 'Opera',
  opera_coast: 'Opera Coast',
  phantomjs: 'PhantomJS',
  puffin: 'Puffin',
  qupzilla: 'QupZilla',
  qq: 'QQ Browser',
  qqlite: 'QQ Browser Lite',
  safari: 'Safari',
  sailfish: 'Sailfish',
  samsung_internet: 'Samsung Internet for Android',
  seamonkey: 'SeaMonkey',
  sleipnir: 'Sleipnir',
  swing: 'Swing',
  tizen: 'Tizen',
  uc: 'UC Browser',
  vivaldi: 'Vivaldi',
  webos: 'WebOS Browser',
  wechat: 'WeChat',
  yandex: 'Yandex Browser'
};
var PLATFORMS_MAP = {
  tablet: 'tablet',
  mobile: 'mobile',
  desktop: 'desktop',
  tv: 'tv'
};
var OS_MAP = {
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MacOS: 'macOS',
  iOS: 'iOS',
  Android: 'Android',
  WebOS: 'WebOS',
  BlackBerry: 'BlackBerry',
  Bada: 'Bada',
  Tizen: 'Tizen',
  Linux: 'Linux',
  ChromeOS: 'Chrome OS',
  PlayStation4: 'PlayStation 4',
  Roku: 'Roku'
};
var ENGINE_MAP = {
  EdgeHTML: 'EdgeHTML',
  Blink: 'Blink',
  Trident: 'Trident',
  Presto: 'Presto',
  Gecko: 'Gecko',
  WebKit: 'WebKit'
};

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
  _createClass(Utils, null, [{
    key: "getFirstMatch",
    value:
    /**
     * Get first matched item for a string
     * @param {RegExp} regexp
     * @param {String} ua
     * @return {Array|{index: number, input: string}|*|boolean|string}
     */
    function getFirstMatch(regexp, ua) {
      var match = ua.match(regexp);
      return match && match.length > 0 && match[1] || '';
    }

    /**
     * Get second matched item for a string
     * @param regexp
     * @param {String} ua
     * @return {Array|{index: number, input: string}|*|boolean|string}
     */
  }, {
    key: "getSecondMatch",
    value: function getSecondMatch(regexp, ua) {
      var match = ua.match(regexp);
      return match && match.length > 1 && match[2] || '';
    }

    /**
     * Match a regexp and return a constant or undefined
     * @param {RegExp} regexp
     * @param {String} ua
     * @param {*} _const Any const that will be returned if regexp matches the string
     * @return {*}
     */
  }, {
    key: "matchAndReturnConst",
    value: function matchAndReturnConst(regexp, ua, _const) {
      if (regexp.test(ua)) {
        return _const;
      }
      return void 0;
    }
  }, {
    key: "getWindowsVersionName",
    value: function getWindowsVersionName(version) {
      switch (version) {
        case 'NT':
          return 'NT';
        case 'XP':
          return 'XP';
        case 'NT 5.0':
          return '2000';
        case 'NT 5.1':
          return 'XP';
        case 'NT 5.2':
          return '2003';
        case 'NT 6.0':
          return 'Vista';
        case 'NT 6.1':
          return '7';
        case 'NT 6.2':
          return '8';
        case 'NT 6.3':
          return '8.1';
        case 'NT 10.0':
          return '10';
        default:
          return undefined;
      }
    }

    /**
     * Get macOS version name
     *    10.5 - Leopard
     *    10.6 - Snow Leopard
     *    10.7 - Lion
     *    10.8 - Mountain Lion
     *    10.9 - Mavericks
     *    10.10 - Yosemite
     *    10.11 - El Capitan
     *    10.12 - Sierra
     *    10.13 - High Sierra
     *    10.14 - Mojave
     *    10.15 - Catalina
     *
     * @example
     *   getMacOSVersionName("10.14") // 'Mojave'
     *
     * @param  {string} version
     * @return {string} versionName
     */
  }, {
    key: "getMacOSVersionName",
    value: function getMacOSVersionName(version) {
      var v = version.split('.').splice(0, 2).map(function (s) {
        return parseInt(s, 10) || 0;
      });
      v.push(0);
      if (v[0] !== 10) return undefined;
      switch (v[1]) {
        case 5:
          return 'Leopard';
        case 6:
          return 'Snow Leopard';
        case 7:
          return 'Lion';
        case 8:
          return 'Mountain Lion';
        case 9:
          return 'Mavericks';
        case 10:
          return 'Yosemite';
        case 11:
          return 'El Capitan';
        case 12:
          return 'Sierra';
        case 13:
          return 'High Sierra';
        case 14:
          return 'Mojave';
        case 15:
          return 'Catalina';
        default:
          return undefined;
      }
    }

    /**
     * Get Android version name
     *    1.5 - Cupcake
     *    1.6 - Donut
     *    2.0 - Eclair
     *    2.1 - Eclair
     *    2.2 - Froyo
     *    2.x - Gingerbread
     *    3.x - Honeycomb
     *    4.0 - Ice Cream Sandwich
     *    4.1 - Jelly Bean
     *    4.4 - KitKat
     *    5.x - Lollipop
     *    6.x - Marshmallow
     *    7.x - Nougat
     *    8.x - Oreo
     *    9.x - Pie
     *
     * @example
     *   getAndroidVersionName("7.0") // 'Nougat'
     *
     * @param  {string} version
     * @return {string} versionName
     */
  }, {
    key: "getAndroidVersionName",
    value: function getAndroidVersionName(version) {
      var v = version.split('.').splice(0, 2).map(function (s) {
        return parseInt(s, 10) || 0;
      });
      v.push(0);
      if (v[0] === 1 && v[1] < 5) return undefined;
      if (v[0] === 1 && v[1] < 6) return 'Cupcake';
      if (v[0] === 1 && v[1] >= 6) return 'Donut';
      if (v[0] === 2 && v[1] < 2) return 'Eclair';
      if (v[0] === 2 && v[1] === 2) return 'Froyo';
      if (v[0] === 2 && v[1] > 2) return 'Gingerbread';
      if (v[0] === 3) return 'Honeycomb';
      if (v[0] === 4 && v[1] < 1) return 'Ice Cream Sandwich';
      if (v[0] === 4 && v[1] < 4) return 'Jelly Bean';
      if (v[0] === 4 && v[1] >= 4) return 'KitKat';
      if (v[0] === 5) return 'Lollipop';
      if (v[0] === 6) return 'Marshmallow';
      if (v[0] === 7) return 'Nougat';
      if (v[0] === 8) return 'Oreo';
      if (v[0] === 9) return 'Pie';
      return undefined;
    }

    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */
  }, {
    key: "getVersionPrecision",
    value: function getVersionPrecision(version) {
      return version.split('.').length;
    }

    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
     *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
     *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
     *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
     *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
     *
     * @param {String} versionA versions versions to compare
     * @param {String} versionB versions versions to compare
     * @param {boolean} [isLoose] enable loose comparison
     * @return {Number} comparison result: -1 when versionA is lower,
     * 1 when versionA is bigger, 0 when both equal
     */
    /* eslint consistent-return: 1 */
  }, {
    key: "compareVersions",
    value: function compareVersions(versionA, versionB) {
      var isLoose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
      var versionAPrecision = Utils.getVersionPrecision(versionA);
      var versionBPrecision = Utils.getVersionPrecision(versionB);
      var precision = Math.max(versionAPrecision, versionBPrecision);
      var lastPrecision = 0;
      var chunks = Utils.map([versionA, versionB], function (version) {
        var delta = precision - Utils.getVersionPrecision(version);

        // 2) "9" -> "9.0" (for precision = 2)
        var _version = version + new Array(delta + 1).join('.0');

        // 3) "9.0" -> ["000000000"", "000000009"]
        return Utils.map(_version.split('.'), function (chunk) {
          return new Array(20 - chunk.length).join('0') + chunk;
        }).reverse();
      });

      // adjust precision for loose comparison
      if (isLoose) {
        lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
      }

      // iterate in reverse order by reversed chunks array
      precision -= 1;
      while (precision >= lastPrecision) {
        // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
        if (chunks[0][precision] > chunks[1][precision]) {
          return 1;
        }
        if (chunks[0][precision] === chunks[1][precision]) {
          if (precision === lastPrecision) {
            // all version chunks are same
            return 0;
          }
          precision -= 1;
        } else if (chunks[0][precision] < chunks[1][precision]) {
          return -1;
        }
      }
      return undefined;
    }

    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */
  }, {
    key: "map",
    value: function map(arr, iterator) {
      var result = [];
      var i;
      if (Array.prototype.map) {
        return Array.prototype.map.call(arr, iterator);
      }
      for (i = 0; i < arr.length; i += 1) {
        result.push(iterator(arr[i]));
      }
      return result;
    }

    /**
     * Array::find polyfill
     *
     * @param  {Array} arr
     * @param  {Function} predicate
     * @return {Array}
     */
  }, {
    key: "find",
    value: function find(arr, predicate) {
      var i;
      var l;
      if (Array.prototype.find) {
        return Array.prototype.find.call(arr, predicate);
      }
      for (i = 0, l = arr.length; i < l; i += 1) {
        var value = arr[i];
        if (predicate(value, i)) {
          return value;
        }
      }
      return undefined;
    }

    /**
     * Object::assign polyfill
     *
     * @param  {Object} obj
     * @param  {Object} ...objs
     * @return {Object}
     */
  }, {
    key: "assign",
    value: function assign(obj) {
      var result = obj;
      var i;
      var l;
      for (var _len = arguments.length, assigners = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        assigners[_key - 1] = arguments[_key];
      }
      if (Object.assign) {
        return Object.assign.apply(Object, [obj].concat(assigners));
      }
      var _loop = function _loop() {
        var assigner = assigners[i];
        if (_typeof$1(assigner) === 'object' && assigner !== null) {
          var keys = Object.keys(assigner);
          keys.forEach(function (key) {
            result[key] = assigner[key];
          });
        }
      };
      for (i = 0, l = assigners.length; i < l; i += 1) {
        _loop();
      }
      return obj;
    }

    /**
     * Get short version/alias for a browser name
     *
     * @example
     *   getBrowserAlias('Microsoft Edge') // edge
     *
     * @param  {string} browserName
     * @return {string}
     */
  }, {
    key: "getBrowserAlias",
    value: function getBrowserAlias(browserName) {
      return BROWSER_ALIASES_MAP[browserName];
    }

    /**
     * Get short version/alias for a browser name
     *
     * @example
     *   getBrowserAlias('edge') // Microsoft Edge
     *
     * @param  {string} browserAlias
     * @return {string}
     */
  }, {
    key: "getBrowserTypeByAlias",
    value: function getBrowserTypeByAlias(browserAlias) {
      return BROWSER_MAP[browserAlias] || '';
    }
  }]);
  return Utils;
}();

/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */
var commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
var browsersList = [/* Googlebot */
{
  test: [/googlebot/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Googlebot'
    };
    var version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* Opera < 13.0 */
{
  test: [/opera/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* Opera > 13.0 */
{
  test: [/opr\/|opios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera'
    };
    var version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/SamsungBrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Samsung Internet for Android'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/Whale/i],
  describe: function describe(ua) {
    var browser = {
      name: 'NAVER Whale Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/MZBrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'MZ Browser'
    };
    var version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/focus/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Focus'
    };
    var version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/swing/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Swing'
    };
    var version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/coast/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera Coast'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/opt\/\d+(?:.?_?\d+)+/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera Touch'
    };
    var version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/yabrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Yandex Browser'
    };
    var version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/ucbrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'UC Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/Maxthon|mxios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Maxthon'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/epiphany/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Epiphany'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/puffin/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Puffin'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/sleipnir/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Sleipnir'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/k-meleon/i],
  describe: function describe(ua) {
    var browser = {
      name: 'K-Meleon'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/micromessenger/i],
  describe: function describe(ua) {
    var browser = {
      name: 'WeChat'
    };
    var version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/qqbrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: /qqbrowserlite/i.test(ua) ? 'QQ Browser Lite' : 'QQ Browser'
    };
    var version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/msie|trident/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Internet Explorer'
    };
    var version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/\sedg\//i],
  describe: function describe(ua) {
    var browser = {
      name: 'Microsoft Edge'
    };
    var version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/edg([ea]|ios)/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Microsoft Edge'
    };
    var version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/vivaldi/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Vivaldi'
    };
    var version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/seamonkey/i],
  describe: function describe(ua) {
    var browser = {
      name: 'SeaMonkey'
    };
    var version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/sailfish/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Sailfish'
    };
    var version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/silk/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Amazon Silk'
    };
    var version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/phantom/i],
  describe: function describe(ua) {
    var browser = {
      name: 'PhantomJS'
    };
    var version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/slimerjs/i],
  describe: function describe(ua) {
    var browser = {
      name: 'SlimerJS'
    };
    var version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
  describe: function describe(ua) {
    var browser = {
      name: 'BlackBerry'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/(web|hpw)[o0]s/i],
  describe: function describe(ua) {
    var browser = {
      name: 'WebOS Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/bada/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Bada'
    };
    var version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/tizen/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Tizen'
    };
    var version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/qupzilla/i],
  describe: function describe(ua) {
    var browser = {
      name: 'QupZilla'
    };
    var version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/firefox|iceweasel|fxios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Firefox'
    };
    var version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/electron/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Electron'
    };
    var version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/MiuiBrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Miui'
    };
    var version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/chromium/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Chromium'
    };
    var version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/chrome|crios|crmo/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Chrome'
    };
    var version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, {
  test: [/GSA/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Google Search'
    };
    var version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* Android Browser */
{
  test: function test(parser) {
    var notLikeAndroid = !parser.test(/like android/i);
    var butAndroid = parser.test(/android/i);
    return notLikeAndroid && butAndroid;
  },
  describe: function describe(ua) {
    var browser = {
      name: 'Android Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* PlayStation 4 */
{
  test: [/playstation 4/i],
  describe: function describe(ua) {
    var browser = {
      name: 'PlayStation 4'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* Safari */
{
  test: [/safari|applewebkit/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Safari'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);
    if (version) {
      browser.version = version;
    }
    return browser;
  }
}, /* Something else */
{
  test: [/.*/i],
  describe: function describe(ua) {
    /* Here we try to make sure that there are explicit details about the device
     * in order to decide what regexp exactly we want to apply
     * (as there is a specific decision based on that conclusion)
     */
    var regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
    var regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
    var hasDeviceSpec = ua.search('\\(') !== -1;
    var regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
    return {
      name: Utils.getFirstMatch(regexp, ua),
      version: Utils.getSecondMatch(regexp, ua)
    };
  }
}];

var osParsersList = [/* Roku */
{
  test: [/Roku\/DVP/],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
    return {
      name: OS_MAP.Roku,
      version: version
    };
  }
}, /* Windows Phone */
{
  test: [/windows phone/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.WindowsPhone,
      version: version
    };
  }
}, /* Windows */
{
  test: [/windows /i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
    var versionName = Utils.getWindowsVersionName(version);
    return {
      name: OS_MAP.Windows,
      version: version,
      versionName: versionName
    };
  }
}, /* Firefox on iPad */
{
  test: [/Macintosh(.*?) FxiOS(.*?)\//],
  describe: function describe(ua) {
    var result = {
      name: OS_MAP.iOS
    };
    var version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
    if (version) {
      result.version = version;
    }
    return result;
  }
}, /* macOS */
{
  test: [/macintosh/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
    var versionName = Utils.getMacOSVersionName(version);
    var os = {
      name: OS_MAP.MacOS,
      version: version
    };
    if (versionName) {
      os.versionName = versionName;
    }
    return os;
  }
}, /* iOS */
{
  test: [/(ipod|iphone|ipad)/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');
    return {
      name: OS_MAP.iOS,
      version: version
    };
  }
}, /* Android */
{
  test: function test(parser) {
    var notLikeAndroid = !parser.test(/like android/i);
    var butAndroid = parser.test(/android/i);
    return notLikeAndroid && butAndroid;
  },
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
    var versionName = Utils.getAndroidVersionName(version);
    var os = {
      name: OS_MAP.Android,
      version: version
    };
    if (versionName) {
      os.versionName = versionName;
    }
    return os;
  }
}, /* WebOS */
{
  test: [/(web|hpw)[o0]s/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
    var os = {
      name: OS_MAP.WebOS
    };
    if (version && version.length) {
      os.version = version;
    }
    return os;
  }
}, /* BlackBerry */
{
  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || Utils.getFirstMatch(/\bbb(\d+)/i, ua);
    return {
      name: OS_MAP.BlackBerry,
      version: version
    };
  }
}, /* Bada */
{
  test: [/bada/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.Bada,
      version: version
    };
  }
}, /* Tizen */
{
  test: [/tizen/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.Tizen,
      version: version
    };
  }
}, /* Linux */
{
  test: [/linux/i],
  describe: function describe() {
    return {
      name: OS_MAP.Linux
    };
  }
}, /* Chrome OS */
{
  test: [/CrOS/],
  describe: function describe() {
    return {
      name: OS_MAP.ChromeOS
    };
  }
}, /* Playstation 4 */
{
  test: [/PlayStation 4/],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.PlayStation4,
      version: version
    };
  }
}];

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

var platformParsersList = [/* Googlebot */
{
  test: [/googlebot/i],
  describe: function describe() {
    return {
      type: 'bot',
      vendor: 'Google'
    };
  }
}, /* Huawei */
{
  test: [/huawei/i],
  describe: function describe(ua) {
    var model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
    var platform = {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Huawei'
    };
    if (model) {
      platform.model = model;
    }
    return platform;
  }
}, /* Nexus Tablet */
{
  test: [/nexus\s*(?:7|8|9|10).*/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Nexus'
    };
  }
}, /* iPad */
{
  test: [/ipad/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Apple',
      model: 'iPad'
    };
  }
}, /* Firefox on iPad */
{
  test: [/Macintosh(.*?) FxiOS(.*?)\//],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Apple',
      model: 'iPad'
    };
  }
}, /* Amazon Kindle Fire */
{
  test: [/kftt build/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Amazon',
      model: 'Kindle Fire HD 7'
    };
  }
}, /* Another Amazon Tablet with Silk */
{
  test: [/silk/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Amazon'
    };
  }
}, /* Tablet */
{
  test: [/tablet(?! pc)/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet
    };
  }
}, /* iPod/iPhone */
{
  test: function test(parser) {
    var iDevice = parser.test(/ipod|iphone/i);
    var likeIDevice = parser.test(/like (ipod|iphone)/i);
    return iDevice && !likeIDevice;
  },
  describe: function describe(ua) {
    var model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Apple',
      model: model
    };
  }
}, /* Nexus Mobile */
{
  test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Nexus'
    };
  }
}, /* Mobile */
{
  test: [/[^-]mobi/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
}, /* BlackBerry */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'blackberry';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'BlackBerry'
    };
  }
}, /* Bada */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'bada';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
}, /* Windows Phone */
{
  test: function test(parser) {
    return parser.getBrowserName() === 'windows phone';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Microsoft'
    };
  }
}, /* Android Tablet */
{
  test: function test(parser) {
    var osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
    return parser.getOSName(true) === 'android' && osMajorVersion >= 3;
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet
    };
  }
}, /* Android Mobile */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'android';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
}, /* desktop */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'macos';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop,
      vendor: 'Apple'
    };
  }
}, /* Windows */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'windows';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop
    };
  }
}, /* Linux */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'linux';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop
    };
  }
}, /* PlayStation 4 */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'playstation 4';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tv
    };
  }
}, /* Roku */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'roku';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tv
    };
  }
}];

/*
 * More specific goes first
 */
var enginesParsersList = [/* EdgeHTML */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'microsoft edge';
  },
  describe: function describe(ua) {
    var isBlinkBased = /\sedg\//i.test(ua);

    // return blink if it's blink-based one
    if (isBlinkBased) {
      return {
        name: ENGINE_MAP.Blink
      };
    }

    // otherwise match the version and return EdgeHTML
    var version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
    return {
      name: ENGINE_MAP.EdgeHTML,
      version: version
    };
  }
}, /* Trident */
{
  test: [/trident/i],
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Trident
    };
    var version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      engine.version = version;
    }
    return engine;
  }
}, /* Presto */
{
  test: function test(parser) {
    return parser.test(/presto/i);
  },
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Presto
    };
    var version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      engine.version = version;
    }
    return engine;
  }
}, /* Gecko */
{
  test: function test(parser) {
    var isGecko = parser.test(/gecko/i);
    var likeGecko = parser.test(/like gecko/i);
    return isGecko && !likeGecko;
  },
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Gecko
    };
    var version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      engine.version = version;
    }
    return engine;
  }
}, /* Blink */
{
  test: [/(apple)?webkit\/537\.36/i],
  describe: function describe() {
    return {
      name: ENGINE_MAP.Blink
    };
  }
}, /* WebKit */
{
  test: [/(apple)?webkit/i],
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.WebKit
    };
    var version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
    if (version) {
      engine.version = version;
    }
    return engine;
  }
}];

/**
 * The main class that arranges the whole parsing process.
 */
var Parser = /*#__PURE__*/function () {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  function Parser(UA) {
    var skipParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classCallCheck(this, Parser);
    if (UA === void 0 || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }
    this._ua = UA;

    /**
     * @typedef ParsedResult
     * @property {Object} browser
     * @property {String|undefined} [browser.name]
     * Browser name, like `"Chrome"` or `"Internet Explorer"`
     * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
     * @property {Object} os
     * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
     * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
     * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
     * @property {Object} platform
     * @property {String|undefined} [platform.type]
     * platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
     * @property {String|undefined} [platform.vendor] Vendor of the device,
     * like `"Apple"` or `"Samsung"`
     * @property {String|undefined} [platform.model] Device model,
     * like `"iPhone"` or `"Kindle Fire HD 7"`
     * @property {Object} engine
     * @property {String|undefined} [engine.name]
     * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
     * @property {String|undefined} [engine.version] String version of the engine
     */
    this.parsedResult = {};
    if (skipParsing !== true) {
      this.parse();
    }
  }

  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  _createClass(Parser, [{
    key: "getUA",
    value: function getUA() {
      return this._ua;
    }

    /**
     * Test a UA string for a regexp
     * @param {RegExp} regex
     * @return {Boolean}
     */
  }, {
    key: "test",
    value: function test(regex) {
      return regex.test(this._ua);
    }

    /**
     * Get parsed browser object
     * @return {Object}
     */
  }, {
    key: "parseBrowser",
    value: function parseBrowser() {
      var _this = this;
      this.parsedResult.browser = {};
      var browserDescriptor = Utils.find(browsersList, function (_browser) {
        if (typeof _browser.test === 'function') {
          return _browser.test(_this);
        }
        if (_browser.test instanceof Array) {
          return _browser.test.some(function (condition) {
            return _this.test(condition);
          });
        }
        throw new Error("Browser's test function is not valid");
      });
      if (browserDescriptor) {
        this.parsedResult.browser = browserDescriptor.describe(this.getUA());
      }
      return this.parsedResult.browser;
    }

    /**
     * Get parsed browser object
     * @return {Object}
     *
     * @public
     */
  }, {
    key: "getBrowser",
    value: function getBrowser() {
      if (this.parsedResult.browser) {
        return this.parsedResult.browser;
      }
      return this.parseBrowser();
    }

    /**
     * Get browser's name
     * @return {String} Browser's name or an empty string
     *
     * @public
     */
  }, {
    key: "getBrowserName",
    value: function getBrowserName(toLowerCase) {
      if (toLowerCase) {
        return String(this.getBrowser().name).toLowerCase() || '';
      }
      return this.getBrowser().name || '';
    }

    /**
     * Get browser's version
     * @return {String} version of browser
     *
     * @public
     */
  }, {
    key: "getBrowserVersion",
    value: function getBrowserVersion() {
      return this.getBrowser().version;
    }

    /**
     * Get OS
     * @return {Object}
     *
     * @example
     * this.getOS();
     * {
     *   name: 'macOS',
     *   version: '10.11.12'
     * }
     */
  }, {
    key: "getOS",
    value: function getOS() {
      if (this.parsedResult.os) {
        return this.parsedResult.os;
      }
      return this.parseOS();
    }

    /**
     * Parse OS and save it to this.parsedResult.os
     * @return {*|{}}
     */
  }, {
    key: "parseOS",
    value: function parseOS() {
      var _this2 = this;
      this.parsedResult.os = {};
      var os = Utils.find(osParsersList, function (_os) {
        if (typeof _os.test === 'function') {
          return _os.test(_this2);
        }
        if (_os.test instanceof Array) {
          return _os.test.some(function (condition) {
            return _this2.test(condition);
          });
        }
        throw new Error("Browser's test function is not valid");
      });
      if (os) {
        this.parsedResult.os = os.describe(this.getUA());
      }
      return this.parsedResult.os;
    }

    /**
     * Get OS name
     * @param {Boolean} [toLowerCase] return lower-cased value
     * @return {String} name of the OS — macOS, Windows, Linux, etc.
     */
  }, {
    key: "getOSName",
    value: function getOSName(toLowerCase) {
      var _this$getOS = this.getOS(),
        name = _this$getOS.name;
      if (toLowerCase) {
        return String(name).toLowerCase() || '';
      }
      return name || '';
    }

    /**
     * Get OS version
     * @return {String} full version with dots ('10.11.12', '5.6', etc)
     */
  }, {
    key: "getOSVersion",
    value: function getOSVersion() {
      return this.getOS().version;
    }

    /**
     * Get parsed platform
     * @return {{}}
     */
  }, {
    key: "getPlatform",
    value: function getPlatform() {
      if (this.parsedResult.platform) {
        return this.parsedResult.platform;
      }
      return this.parsePlatform();
    }

    /**
     * Get platform name
     * @param {Boolean} [toLowerCase=false]
     * @return {*}
     */
  }, {
    key: "getPlatformType",
    value: function getPlatformType() {
      var toLowerCase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$getPlatform = this.getPlatform(),
        type = _this$getPlatform.type;
      if (toLowerCase) {
        return String(type).toLowerCase() || '';
      }
      return type || '';
    }

    /**
     * Get parsed platform
     * @return {{}}
     */
  }, {
    key: "parsePlatform",
    value: function parsePlatform() {
      var _this3 = this;
      this.parsedResult.platform = {};
      var platform = Utils.find(platformParsersList, function (_platform) {
        if (typeof _platform.test === 'function') {
          return _platform.test(_this3);
        }
        if (_platform.test instanceof Array) {
          return _platform.test.some(function (condition) {
            return _this3.test(condition);
          });
        }
        throw new Error("Browser's test function is not valid");
      });
      if (platform) {
        this.parsedResult.platform = platform.describe(this.getUA());
      }
      return this.parsedResult.platform;
    }

    /**
     * Get parsed engine
     * @return {{}}
     */
  }, {
    key: "getEngine",
    value: function getEngine() {
      if (this.parsedResult.engine) {
        return this.parsedResult.engine;
      }
      return this.parseEngine();
    }

    /**
     * Get engines's name
     * @return {String} Engines's name or an empty string
     *
     * @public
     */
  }, {
    key: "getEngineName",
    value: function getEngineName(toLowerCase) {
      if (toLowerCase) {
        return String(this.getEngine().name).toLowerCase() || '';
      }
      return this.getEngine().name || '';
    }

    /**
     * Get parsed platform
     * @return {{}}
     */
  }, {
    key: "parseEngine",
    value: function parseEngine() {
      var _this4 = this;
      this.parsedResult.engine = {};
      var engine = Utils.find(enginesParsersList, function (_engine) {
        if (typeof _engine.test === 'function') {
          return _engine.test(_this4);
        }
        if (_engine.test instanceof Array) {
          return _engine.test.some(function (condition) {
            return _this4.test(condition);
          });
        }
        throw new Error("Browser's test function is not valid");
      });
      if (engine) {
        this.parsedResult.engine = engine.describe(this.getUA());
      }
      return this.parsedResult.engine;
    }

    /**
     * Parse full information about the browser
     * @returns {Parser}
     */
  }, {
    key: "parse",
    value: function parse() {
      this.parseBrowser();
      this.parseOS();
      this.parsePlatform();
      this.parseEngine();
      return this;
    }

    /**
     * Get parsed result
     * @return {ParsedResult}
     */
  }, {
    key: "getResult",
    value: function getResult() {
      return Utils.assign({}, this.parsedResult);
    }

    /**
     * Check if parsed browser matches certain conditions
     *
     * @param {Object} checkTree It's one or two layered object,
     * which can include a platform or an OS on the first layer
     * and should have browsers specs on the bottom-laying layer
     *
     * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
     * Returns `undefined` when the browser is no described in the checkTree object.
     *
     * @example
     * const browser = Bowser.getParser(window.navigator.userAgent);
     * if (browser.satisfies({chrome: '>118.01.1322' }))
     * // or with os
     * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
     * // or with platforms
     * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
     */
  }, {
    key: "satisfies",
    value: function satisfies(checkTree) {
      var _this5 = this;
      var platformsAndOSes = {};
      var platformsAndOSCounter = 0;
      var browsers = {};
      var browsersCounter = 0;
      var allDefinitions = Object.keys(checkTree);
      allDefinitions.forEach(function (key) {
        var currentDefinition = checkTree[key];
        if (typeof currentDefinition === 'string') {
          browsers[key] = currentDefinition;
          browsersCounter += 1;
        } else if (_typeof$1(currentDefinition) === 'object') {
          platformsAndOSes[key] = currentDefinition;
          platformsAndOSCounter += 1;
        }
      });
      if (platformsAndOSCounter > 0) {
        var platformsAndOSNames = Object.keys(platformsAndOSes);
        var OSMatchingDefinition = Utils.find(platformsAndOSNames, function (name) {
          return _this5.isOS(name);
        });
        if (OSMatchingDefinition) {
          var osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
          if (osResult !== void 0) {
            return osResult;
          }
        }
        var platformMatchingDefinition = Utils.find(platformsAndOSNames, function (name) {
          return _this5.isPlatform(name);
        });
        if (platformMatchingDefinition) {
          var platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
          if (platformResult !== void 0) {
            return platformResult;
          }
        }
      }
      if (browsersCounter > 0) {
        var browserNames = Object.keys(browsers);
        var matchingDefinition = Utils.find(browserNames, function (name) {
          return _this5.isBrowser(name, true);
        });
        if (matchingDefinition !== void 0) {
          return this.compareVersion(browsers[matchingDefinition]);
        }
      }
      return undefined;
    }

    /**
     * Check if the browser name equals the passed string
     * @param browserName The string to compare with the browser name
     * @param [includingAlias=false] The flag showing whether alias will be included into comparison
     * @returns {boolean}
     */
  }, {
    key: "isBrowser",
    value: function isBrowser(browserName) {
      var includingAlias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var defaultBrowserName = this.getBrowserName().toLowerCase();
      var browserNameLower = browserName.toLowerCase();
      var alias = Utils.getBrowserTypeByAlias(browserNameLower);
      if (includingAlias && alias) {
        browserNameLower = alias.toLowerCase();
      }
      return browserNameLower === defaultBrowserName;
    }
  }, {
    key: "compareVersion",
    value: function compareVersion(version) {
      var expectedResults = [0];
      var comparableVersion = version;
      var isLoose = false;
      var currentBrowserVersion = this.getBrowserVersion();
      if (typeof currentBrowserVersion !== 'string') {
        return void 0;
      }
      if (version[0] === '>' || version[0] === '<') {
        comparableVersion = version.substr(1);
        if (version[1] === '=') {
          isLoose = true;
          comparableVersion = version.substr(2);
        } else {
          expectedResults = [];
        }
        if (version[0] === '>') {
          expectedResults.push(1);
        } else {
          expectedResults.push(-1);
        }
      } else if (version[0] === '=') {
        comparableVersion = version.substr(1);
      } else if (version[0] === '~') {
        isLoose = true;
        comparableVersion = version.substr(1);
      }
      return expectedResults.indexOf(Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)) > -1;
    }
  }, {
    key: "isOS",
    value: function isOS(osName) {
      return this.getOSName(true) === String(osName).toLowerCase();
    }
  }, {
    key: "isPlatform",
    value: function isPlatform(platformType) {
      return this.getPlatformType(true) === String(platformType).toLowerCase();
    }
  }, {
    key: "isEngine",
    value: function isEngine(engineName) {
      return this.getEngineName(true) === String(engineName).toLowerCase();
    }

    /**
     * Is anything? Check if the browser is called "anything",
     * the OS called "anything" or the platform called "anything"
     * @param {String} anything
     * @param [includingAlias=false] The flag showing whether alias will be included into comparison
     * @returns {Boolean}
     */
  }, {
    key: "is",
    value: function is(anything) {
      var includingAlias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.isBrowser(anything, includingAlias) || this.isOS(anything) || this.isPlatform(anything);
    }

    /**
     * Check if any of the given values satisfies this.is(anything)
     * @param {String[]} anythings
     * @returns {Boolean}
     */
  }, {
    key: "some",
    value: function some() {
      var _this6 = this;
      var anythings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return anythings.some(function (anything) {
        return _this6.is(anything);
      });
    }
  }]);
  return Parser;
}();

/**
 * Bowser class.
 * Keep it simple as much as it can be.
 * It's supposed to work with collections of {@link Parser} instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 *
 * @class
 * @classdesc Bowser is a static object, that provides an API to the Parsers
 * @hideconstructor
 */
var Bowser = /*#__PURE__*/function () {
  function Bowser() {
    _classCallCheck(this, Bowser);
  }
  _createClass(Bowser, null, [{
    key: "getParser",
    value:
    /**
     * Creates a {@link Parser} instance
     *
     * @param {String} UA UserAgent string
     * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
     * explicitly. Same as `skipParsing` for {@link Parser}.
     * @returns {Parser}
     * @throws {Error} when UA is not a String
     *
     * @example
     * const parser = Bowser.getParser(window.navigator.userAgent);
     * const result = parser.getResult();
     */
    function getParser(UA) {
      var skipParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (typeof UA !== 'string') {
        throw new Error('UserAgent should be a string');
      }
      return new Parser(UA, skipParsing);
    }

    /**
     * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
     *
     * @param UA
     * @return {ParsedResult}
     *
     * @example
     * const result = Bowser.parse(window.navigator.userAgent);
     */
  }, {
    key: "parse",
    value: function parse(UA) {
      return new Parser(UA).getResult();
    }
  }, {
    key: "BROWSER_MAP",
    get: function get() {
      return BROWSER_MAP;
    }
  }, {
    key: "ENGINE_MAP",
    get: function get() {
      return ENGINE_MAP;
    }
  }, {
    key: "OS_MAP",
    get: function get() {
      return OS_MAP;
    }
  }, {
    key: "PLATFORMS_MAP",
    get: function get() {
      return PLATFORMS_MAP;
    }
  }]);
  return Bowser;
}();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isServerSide = typeof window === 'undefined';
var isClientSide = !isServerSide;
var PLATFORM = isClientSide ? _objectSpread({}, Bowser.parse(window.navigator.userAgent)) : null;
var isPlatformIn = function isPlatformIn(oses, browsers) {
  return isClientSide && oses.includes(PLATFORM === null || PLATFORM === void 0 ? void 0 : PLATFORM.os.name) && browsers.includes(PLATFORM === null || PLATFORM === void 0 ? void 0 : PLATFORM.browser.name);
};

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function create_fragment$b(ctx) {
  var block = {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var dbFactories;
var bind;
function instance$b($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('StorageIO', slots, []);
  var _$$props$_store = $$props._store,
    _store = _$$props$_store === void 0 ? writable() : _$$props$_store;
  var _$$props$defaultValue = $$props.defaultValue,
    defaultValue = _$$props$defaultValue === void 0 ? null : _$$props$defaultValue;
  var _$$props$isReactive = $$props.isReactive,
    isReactive = _$$props$isReactive === void 0 ? false : _$$props$isReactive;
  var _$$props$key = $$props.key,
    key = _$$props$key === void 0 ? null : _$$props$key;
  var _$$props$type = $$props.type,
    type = _$$props$type === void 0 ? 'noop' : _$$props$type;
  var isLoaded = false;
  var unbind;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var _yield$import, createCookieStorage, createIndexedDBStorage, createLocalStorage, createNoopStorage, createSessionStorage;
    return regenerator.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([import('./index.757ca0ec.js'), __inject_styles(["client-a40ce2c8.css"])]).then(function(x) { return x[0]; });
        case 2:
          _yield$import = _context.sent;
          createCookieStorage = _yield$import.createCookieStorage;
          createIndexedDBStorage = _yield$import.createIndexedDBStorage;
          createLocalStorage = _yield$import.createLocalStorage;
          createNoopStorage = _yield$import.createNoopStorage;
          createSessionStorage = _yield$import.createSessionStorage;
          if (!dbFactories) {
            dbFactories = {
              cookie: function cookie() {
                return createCookieStorage();
              },
              indexedDB: function indexedDB() {
                return createIndexedDBStorage();
              },
              localStorage: function localStorage(pIsReactive) {
                return createLocalStorage(pIsReactive);
              },
              noop: function noop() {
                return createNoopStorage();
              },
              sessionStorage: function sessionStorage(pIsReactive) {
                return createSessionStorage(pIsReactive);
              }
            };
          }
          if (!bind) {
            bind = function bind(_ref2) {
              var _database$addListener;
              var _store_ = _ref2._store,
                defaultValue_ = _ref2.defaultValue,
                isReactive_ = _ref2.isReactive,
                key_ = _ref2.key,
                type_ = _ref2.type;
              var database = dbFactories[type_](isReactive_);
              var initialValue = database.getValue(key_) || defaultValue_;
              _store_.set(initialValue);
              var syncStore = function syncStore() {
                var currentValue = database.getValue(key_) || defaultValue_;
                _store_.set(currentValue);
              };
              var updateDb = function updateDb(newValue) {
                if (collectionCompare(defaultValue_, newValue)) {
                  database.deleteValue(key_);
                } else {
                  database.setValue(key_, newValue);
                }
              };

              // When we update the store, we also update the database
              _store_.subscribe(updateDb);

              // When the database changes, we sync the store
              // e.g. you can edit `localStorage` in dev tools and expect the UI to
              // update because it's bound to the store.
              (_database$addListener = database.addListener) === null || _database$addListener === void 0 ? void 0 : _database$addListener.call(database, key_, syncStore);
              return function () {
                var _database$removeListe;
                (_database$removeListe = database.removeListener) === null || _database$removeListe === void 0 ? void 0 : _database$removeListe.call(database, key_, syncStore);
              };
            };
          }
          $$invalidate(5, isLoaded = true);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  var writable_props = ['_store', 'defaultValue', 'isReactive', 'key', 'type'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<StorageIO> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('_store' in $$props) $$invalidate(1, _store = $$props._store);
    if ('defaultValue' in $$props) $$invalidate(2, defaultValue = $$props.defaultValue);
    if ('isReactive' in $$props) $$invalidate(3, isReactive = $$props.isReactive);
    if ('key' in $$props) $$invalidate(4, key = $$props.key);
    if ('type' in $$props) $$invalidate(0, type = $$props.type);
  };
  $$self.$capture_state = function () {
    return {
      dbFactories: dbFactories,
      bind: bind,
      isEqual: collectionCompare,
      onMount: onMount,
      writable: writable,
      isClientSide: isClientSide,
      _store: _store,
      defaultValue: defaultValue,
      isReactive: isReactive,
      key: key,
      type: type,
      isLoaded: isLoaded,
      unbind: unbind
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('_store' in $$props) $$invalidate(1, _store = $$props._store);
    if ('defaultValue' in $$props) $$invalidate(2, defaultValue = $$props.defaultValue);
    if ('isReactive' in $$props) $$invalidate(3, isReactive = $$props.isReactive);
    if ('key' in $$props) $$invalidate(4, key = $$props.key);
    if ('type' in $$props) $$invalidate(0, type = $$props.type);
    if ('isLoaded' in $$props) $$invalidate(5, isLoaded = $$props.isLoaded);
    if ('unbind' in $$props) $$invalidate(6, unbind = $$props.unbind);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*isLoaded, type*/33) {
      if (isLoaded && !(type in dbFactories)) {
        $$invalidate(0, type = 'noop');
      }
    }
    if ($$self.$$.dirty & /*isLoaded, key, type, _store, unbind, defaultValue, isReactive*/127) {
      if (isLoaded && isClientSide && key && type && _store) {
        var _unbind;
        (_unbind = unbind) === null || _unbind === void 0 ? void 0 : _unbind();
        $$invalidate(6, unbind = bind({
          _store: _store,
          defaultValue: defaultValue,
          isReactive: isReactive,
          key: key,
          type: type
        }));
      }
    }
  };
  return [type, _store, defaultValue, isReactive, key, isLoaded, unbind];
}
var StorageIO = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(StorageIO, _SvelteComponentDev);
  var _super = _createSuper$b(StorageIO);
  function StorageIO(options) {
    var _this;
    _classCallCheck(this, StorageIO);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      _store: 1,
      defaultValue: 2,
      isReactive: 3,
      key: 4,
      type: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "StorageIO",
      options: options,
      id: create_fragment$b.name
    });
    return _this;
  }
  _createClass(StorageIO, [{
    key: "_store",
    get: function get() {
      throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultValue",
    get: function get() {
      throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isReactive",
    get: function get() {
      throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "type",
    get: function get() {
      throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return StorageIO;
}(SvelteComponentDev);
var StorageIO$1 = StorageIO;

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "../../components/ui/src/a11y/menu/ColorCorrection.svelte";
function create_fragment$a(ctx) {
  var svg;
  var defs;
  var filter0;
  var feColorMatrix0;
  var filter1;
  var feColorMatrix1;
  var filter2;
  var feColorMatrix2;
  var filter3;
  var feColorMatrix3;
  var filter4;
  var feColorMatrix4;
  var filter5;
  var feColorMatrix5;
  var filter6;
  var feColorMatrix6;
  var block = {
    c: function create() {
      svg = svg_element("svg");
      defs = svg_element("defs");
      filter0 = svg_element("filter");
      feColorMatrix0 = svg_element("feColorMatrix");
      filter1 = svg_element("filter");
      feColorMatrix1 = svg_element("feColorMatrix");
      filter2 = svg_element("filter");
      feColorMatrix2 = svg_element("feColorMatrix");
      filter3 = svg_element("filter");
      feColorMatrix3 = svg_element("feColorMatrix");
      filter4 = svg_element("filter");
      feColorMatrix4 = svg_element("feColorMatrix");
      filter5 = svg_element("filter");
      feColorMatrix5 = svg_element("feColorMatrix");
      filter6 = svg_element("filter");
      feColorMatrix6 = svg_element("feColorMatrix");
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        width: true,
        height: true,
        "aria-hidden": true,
        class: true
      });
      var svg_nodes = children(svg);
      defs = claim_svg_element(svg_nodes, "defs", {});
      var defs_nodes = children(defs);
      filter0 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter0_nodes = children(filter0);
      feColorMatrix0 = claim_svg_element(filter0_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix0).forEach(detach_dev);
      filter0_nodes.forEach(detach_dev);
      filter1 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter1_nodes = children(filter1);
      feColorMatrix1 = claim_svg_element(filter1_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix1).forEach(detach_dev);
      filter1_nodes.forEach(detach_dev);
      filter2 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter2_nodes = children(filter2);
      feColorMatrix2 = claim_svg_element(filter2_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix2).forEach(detach_dev);
      filter2_nodes.forEach(detach_dev);
      filter3 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter3_nodes = children(filter3);
      feColorMatrix3 = claim_svg_element(filter3_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix3).forEach(detach_dev);
      filter3_nodes.forEach(detach_dev);
      filter4 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter4_nodes = children(filter4);
      feColorMatrix4 = claim_svg_element(filter4_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix4).forEach(detach_dev);
      filter4_nodes.forEach(detach_dev);
      filter5 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter5_nodes = children(filter5);
      feColorMatrix5 = claim_svg_element(filter5_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix5).forEach(detach_dev);
      filter5_nodes.forEach(detach_dev);
      filter6 = claim_svg_element(defs_nodes, "filter", {
        id: true
      });
      var filter6_nodes = children(filter6);
      feColorMatrix6 = claim_svg_element(filter6_nodes, "feColorMatrix", {
        values: true
      });
      children(feColorMatrix6).forEach(detach_dev);
      filter6_nodes.forEach(detach_dev);
      defs_nodes.forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(feColorMatrix0, "values", " 0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
      add_location(feColorMatrix0, file$5, 12, 3, 690);
      attr_dev(filter0, "id", "achromatopsia");
      add_location(filter0, file$5, 11, 2, 659);
      attr_dev(feColorMatrix1, "values", " 0.367  0.861 -0.228  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.280  0.673  0.047  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.012  0.043  0.969  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
      add_location(feColorMatrix1, file$5, 19, 3, 928);
      attr_dev(filter1, "id", "deuteranopia");
      add_location(filter1, file$5, 18, 2, 898);
      attr_dev(feColorMatrix2, "values", " 0.152  1.053 -0.205  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.115  0.786  0.099  0.000  0.000\n\t\t\t\t\t\t\t\t\t-0.004 -0.048  1.052  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
      add_location(feColorMatrix2, file$5, 26, 3, 1164);
      attr_dev(filter2, "id", "protanopia");
      add_location(filter2, file$5, 25, 2, 1136);
      attr_dev(feColorMatrix3, "values", " 1.256 -0.077 -0.179  0.000  0.000\n\t\t\t\t\t\t\t\t\t-0.078  0.931  0.148  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.005  0.691  0.304  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
      add_location(feColorMatrix3, file$5, 33, 3, 1401);
      attr_dev(filter3, "id", "tritanopia");
      add_location(filter3, file$5, 32, 2, 1373);
      attr_dev(feColorMatrix4, "values", " 0, 0.5, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 1, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
      add_location(feColorMatrix4, file$5, 44, 3, 1758);
      attr_dev(filter4, "id", "recolor-deuteranopia");
      add_location(filter4, file$5, 43, 2, 1720);
      attr_dev(feColorMatrix5, "values", " 0.5, 0, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 1, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
      add_location(feColorMatrix5, file$5, 51, 3, 1933);
      attr_dev(filter5, "id", "recolor-protanopia");
      add_location(filter5, file$5, 50, 2, 1897);
      attr_dev(feColorMatrix6, "values", " 0.5, 0, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 1, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
      add_location(feColorMatrix6, file$5, 58, 3, 2108);
      attr_dev(filter6, "id", "recolor-tritanopia");
      add_location(filter6, file$5, 57, 2, 2072);
      add_location(defs, file$5, 10, 1, 650);
      attr_dev(svg, "width", "0");
      attr_dev(svg, "height", "0");
      attr_dev(svg, "aria-hidden", "true");
      attr_dev(svg, "class", "svelte-v6m6bt");
      add_location(svg, file$5, 9, 0, 603);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, svg, anchor);
      append_hydration_dev(svg, defs);
      append_hydration_dev(defs, filter0);
      append_hydration_dev(filter0, feColorMatrix0);
      append_hydration_dev(defs, filter1);
      append_hydration_dev(filter1, feColorMatrix1);
      append_hydration_dev(defs, filter2);
      append_hydration_dev(filter2, feColorMatrix2);
      append_hydration_dev(defs, filter3);
      append_hydration_dev(filter3, feColorMatrix3);
      append_hydration_dev(defs, filter4);
      append_hydration_dev(filter4, feColorMatrix4);
      append_hydration_dev(defs, filter5);
      append_hydration_dev(filter5, feColorMatrix5);
      append_hydration_dev(defs, filter6);
      append_hydration_dev(filter6, feColorMatrix6);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$a($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ColorCorrection', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ColorCorrection> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ColorCorrection = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorCorrection, _SvelteComponentDev);
  var _super = _createSuper$a(ColorCorrection);
  function ColorCorrection(options) {
    var _this;
    _classCallCheck(this, ColorCorrection);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorCorrection",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }
  return _createClass(ColorCorrection);
}(SvelteComponentDev);
var ColorCorrection$1 = ColorCorrection;

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// (31:0) {#if useLocalStorage}
function create_if_block$4(ctx) {
  var storageio;
  var current;
  storageio = new StorageIO$1({
    props: {
      _store: _a11ySettings,
      defaultValue: /*defaultValue*/ctx[1],
      isReactive: true,
      key: "a11ySettings",
      type: "localStorage"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(storageio.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(storageio.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(storageio, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var storageio_changes = {};
      if (dirty & /*defaultValue*/2) storageio_changes.defaultValue = /*defaultValue*/ctx[1];
      storageio.$set(storageio_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(storageio.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(storageio.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(storageio, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(31:0) {#if useLocalStorage}",
    ctx: ctx
  });
  return block;
}
function create_fragment$9(ctx) {
  var colorcorrection;
  var t;
  var if_block_anchor;
  var current;
  colorcorrection = new ColorCorrection$1({
    $$inline: true
  });
  var if_block = /*useLocalStorage*/ctx[0] && create_if_block$4(ctx);
  var block = {
    c: function create() {
      create_component(colorcorrection.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      claim_component(colorcorrection.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(colorcorrection, target, anchor);
      insert_hydration_dev(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if ( /*useLocalStorage*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*useLocalStorage*/1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(colorcorrection.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(colorcorrection.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(colorcorrection, detaching);
      if (detaching) detach_dev(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var colorTargetSelector = 'html';
var textTargetSelector = 'body';
function instance$9($$self, $$props, $$invalidate) {
  var colorTargetNode;
  var textTargetNode;
  var $_a11yTextStyles;
  var $_a11yColorStyles;
  validate_store(_a11yTextStyles, '_a11yTextStyles');
  component_subscribe($$self, _a11yTextStyles, function ($$value) {
    return $$invalidate(5, $_a11yTextStyles = $$value);
  });
  validate_store(_a11yColorStyles, '_a11yColorStyles');
  component_subscribe($$self, _a11yColorStyles, function ($$value) {
    return $$invalidate(6, $_a11yColorStyles = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('A11yMenuDriver', slots, []);
  var _$$props$defaults = $$props.defaults,
    defaults = _$$props$defaults === void 0 ? null : _$$props$defaults;
  var _$$props$useLocalStor = $$props.useLocalStorage,
    useLocalStorage = _$$props$useLocalStor === void 0 ? true : _$$props$useLocalStor;
  var defaultValue;
  var writable_props = ['defaults', 'useLocalStorage'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<A11yMenuDriver> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('defaults' in $$props) $$invalidate(2, defaults = $$props.defaults);
    if ('useLocalStorage' in $$props) $$invalidate(0, useLocalStorage = $$props.useLocalStorage);
  };
  $$self.$capture_state = function () {
    return {
      StorageIO: StorageIO$1,
      isClientSide: isClientSide,
      ColorCorrection: ColorCorrection$1,
      _a11yColorStyles: _a11yColorStyles,
      _a11yTextStyles: _a11yTextStyles,
      _a11ySettings: _a11ySettings,
      applyStyles: applyStyles,
      mergeDefaultSettings: mergeDefaultSettings,
      colorTargetSelector: colorTargetSelector,
      textTargetSelector: textTargetSelector,
      defaults: defaults,
      useLocalStorage: useLocalStorage,
      defaultValue: defaultValue,
      textTargetNode: textTargetNode,
      colorTargetNode: colorTargetNode,
      $_a11yTextStyles: $_a11yTextStyles,
      $_a11yColorStyles: $_a11yColorStyles
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('defaults' in $$props) $$invalidate(2, defaults = $$props.defaults);
    if ('useLocalStorage' in $$props) $$invalidate(0, useLocalStorage = $$props.useLocalStorage);
    if ('defaultValue' in $$props) $$invalidate(1, defaultValue = $$props.defaultValue);
    if ('textTargetNode' in $$props) $$invalidate(3, textTargetNode = $$props.textTargetNode);
    if ('colorTargetNode' in $$props) $$invalidate(4, colorTargetNode = $$props.colorTargetNode);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*defaults*/4) {
      defaults && $$invalidate(1, defaultValue = mergeDefaultSettings(defaults));
    }
    if ($$self.$$.dirty & /*colorTargetNode*/16) {
      var _colorTargetNode, _colorTargetNode$clas;
      (_colorTargetNode = colorTargetNode) === null || _colorTargetNode === void 0 ? void 0 : (_colorTargetNode$clas = _colorTargetNode.classList) === null || _colorTargetNode$clas === void 0 ? void 0 : _colorTargetNode$clas.add(['colorCorrected']);
    }
    if ($$self.$$.dirty & /*colorTargetNode, $_a11yColorStyles*/80) {
      colorTargetNode && applyStyles(colorTargetNode.style, $_a11yColorStyles);
    }
    if ($$self.$$.dirty & /*textTargetNode, $_a11yTextStyles*/40) {
      textTargetNode && applyStyles(textTargetNode.style, $_a11yTextStyles);
    }
  };
  $$invalidate(4, colorTargetNode = isClientSide && document.querySelector(colorTargetSelector));
  $$invalidate(3, textTargetNode = isClientSide && document.querySelector(textTargetSelector));
  return [useLocalStorage, defaultValue, defaults, textTargetNode, colorTargetNode, $_a11yTextStyles, $_a11yColorStyles];
}
var A11yMenuDriver = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A11yMenuDriver, _SvelteComponentDev);
  var _super = _createSuper$9(A11yMenuDriver);
  function A11yMenuDriver(options) {
    var _this;
    _classCallCheck(this, A11yMenuDriver);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      defaults: 2,
      useLocalStorage: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A11yMenuDriver",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }
  _createClass(A11yMenuDriver, [{
    key: "defaults",
    get: function get() {
      throw new Error("<A11yMenuDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A11yMenuDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "useLocalStorage",
    get: function get() {
      throw new Error("<A11yMenuDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A11yMenuDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return A11yMenuDriver;
}(SvelteComponentDev);
var A11yMenuDriver$1 = A11yMenuDriver;

var setupResizeObserver = function setupResizeObserver() {
  var _writable = writable({
    blockSize: 0,
    inlineSize: 0
  });
  function resizeObserver(node) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'borderBoxSize';
    var callback = function callback(entries) {
      return _writable.set(entries[0][type][0]);
    };
    var observer = new ResizeObserver(callback);
    observer.observe(node);
    return function () {
      return observer.disconnect();
    };
  }
  return {
    _writable: _writable,
    resizeObserver: resizeObserver
  };
};

var getFamily = getKey('family');
var getFamilies = mapWith(getFamily);
var isFamilyEqualTo = function isFamilyEqualTo(family) {
  return isKeyValue(['family', family]);
};
var createFontFaces = function createFontFaces(_ref) {
  var family = _ref.family,
    faces = _ref.faces;
  return faces && faces.map(function (_ref2) {
    var src = _ref2.src,
      descriptors = _ref2.descriptors;
    return new FontFace(family, src, descriptors);
  });
};
var loadFontFaces = function loadFontFaces(faces) {
  return faces && Promise.all(faces.map( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(face) {
      var fontFace;
      return regenerator.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return face.load();
          case 2:
            fontFace = _context.sent;
            document.fonts.add(fontFace);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }()));
};

// main stores
var _firstFamilyToLoad = writable();
var _fontsInfo = writable([]);
var _status = writable({
  isFirstLoaded: false,
  isDone: false
});

// deriveds
var _runtimeFonts = derived([_firstFamilyToLoad, _fontsInfo], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    firstFamilyToLoad = _ref2[0],
    fontsInfo = _ref2[1];
  var isFirstFamily = isFamilyEqualTo(firstFamilyToLoad);
  var createFonts = pipe([partitionWith(isFirstFamily), mapWith(mapWith(createFontFaces))]);
  return createFonts(fontsInfo);
});

// functions with side effects
var loadFonts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref3) {
    var _ref5, firstFonts, otherFonts;
    return regenerator.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref5 = _slicedToArray(_ref3, 2), firstFonts = _ref5[0], otherFonts = _ref5[1];
          if (get_store_value(_status).isDone) {
            _context.next = 8;
            break;
          }
          _context.next = 4;
          return Promise.all(firstFonts.map(loadFontFaces));
        case 4:
          _status.set({
            isFirstLoaded: true,
            isDone: false
          });
          _context.next = 7;
          return Promise.all(otherFonts.map(loadFontFaces));
        case 7:
          _status.set({
            isFirstLoaded: true,
            isDone: true
          });
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function loadFonts(_x) {
    return _ref4.apply(this, arguments);
  };
}();

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function create_fragment$8(ctx) {
  var block = {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$8($$self, $$props, $$invalidate) {
  var $_status;
  var $_runtimeFonts;
  validate_store(_status, '_status');
  component_subscribe($$self, _status, function ($$value) {
    return $$invalidate(3, $_status = $$value);
  });
  validate_store(_runtimeFonts, '_runtimeFonts');
  component_subscribe($$self, _runtimeFonts, function ($$value) {
    return $$invalidate(4, $_runtimeFonts = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('FontsLoader', slots, []);
  var _$$props$fontsInfo = $$props.fontsInfo,
    fontsInfo = _$$props$fontsInfo === void 0 ? [] : _$$props$fontsInfo;
  var _$$props$firstFamilyT = $$props.firstFamilyToLoad,
    firstFamilyToLoad = _$$props$firstFamilyT === void 0 ? null : _$$props$firstFamilyT;
  var _$$props$status = $$props.status,
    status = _$$props$status === void 0 ? $_status : _$$props$status;
  var writable_props = ['fontsInfo', 'firstFamilyToLoad', 'status'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<FontsLoader> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('fontsInfo' in $$props) $$invalidate(1, fontsInfo = $$props.fontsInfo);
    if ('firstFamilyToLoad' in $$props) $$invalidate(2, firstFamilyToLoad = $$props.firstFamilyToLoad);
    if ('status' in $$props) $$invalidate(0, status = $$props.status);
  };
  $$self.$capture_state = function () {
    return {
      isClientSide: isClientSide,
      _firstFamilyToLoad: _firstFamilyToLoad,
      _fontsInfo: _fontsInfo,
      _runtimeFonts: _runtimeFonts,
      _status: _status,
      loadFonts: loadFonts,
      fontsInfo: fontsInfo,
      firstFamilyToLoad: firstFamilyToLoad,
      status: status,
      $_status: $_status,
      $_runtimeFonts: $_runtimeFonts
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('fontsInfo' in $$props) $$invalidate(1, fontsInfo = $$props.fontsInfo);
    if ('firstFamilyToLoad' in $$props) $$invalidate(2, firstFamilyToLoad = $$props.firstFamilyToLoad);
    if ('status' in $$props) $$invalidate(0, status = $$props.status);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*fontsInfo*/2) {
      if (isClientSide) {
        _fontsInfo.set(fontsInfo);
        set_store_value(_status, $_status.isDone = false, $_status);
      }
    }
    if ($$self.$$.dirty & /*firstFamilyToLoad*/4) {
      isClientSide && _firstFamilyToLoad.set(firstFamilyToLoad);
    }
    if ($$self.$$.dirty & /*$_runtimeFonts*/16) {
      isClientSide && loadFonts($_runtimeFonts);
    }
    if ($$self.$$.dirty & /*$_status*/8) {
      $$invalidate(0, status = $_status);
    }
  };
  return [status, fontsInfo, firstFamilyToLoad, $_status, $_runtimeFonts];
}
var FontsLoader = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FontsLoader, _SvelteComponentDev);
  var _super = _createSuper$8(FontsLoader);
  function FontsLoader(options) {
    var _this;
    _classCallCheck(this, FontsLoader);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      fontsInfo: 1,
      firstFamilyToLoad: 2,
      status: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FontsLoader",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }
  _createClass(FontsLoader, [{
    key: "fontsInfo",
    get: function get() {
      throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "firstFamilyToLoad",
    get: function get() {
      throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return FontsLoader;
}(SvelteComponentDev);
var FontsLoader$1 = FontsLoader;

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "../../components/ui/src/icons/svizzle/A11yPerson.svelte";
function create_fragment$7(ctx) {
  var circle0;
  var t0;
  var circle1;
  var t1;
  var path;
  var block = {
    c: function create() {
      circle0 = svg_element("circle");
      t0 = space();
      circle1 = svg_element("circle");
      t1 = space();
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      circle0 = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle0).forEach(detach_dev);
      t0 = claim_space(nodes);
      circle1 = claim_svg_element(nodes, "circle", {
        cy: true,
        cx: true,
        r: true
      });
      children(circle1).forEach(detach_dev);
      t1 = claim_space(nodes);
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle0, "cx", "12");
      attr_dev(circle0, "cy", "12");
      attr_dev(circle0, "r", "11");
      add_location(circle0, file$4, 2, 0, 54);
      attr_dev(circle1, "cy", "5");
      attr_dev(circle1, "cx", "12");
      attr_dev(circle1, "r", "1.6");
      add_location(circle1, file$4, 4, 0, 102);
      attr_dev(path, "d", "m 19.060408,9.6465306 h -5.03347 l -0.424489,2.8269384 2.75102,7.371429 H 14.78449 l -2,-4.706939 h -1.56898 l -2,4.706939 H 7.6465306 L 10.560816,12.571428 10.136327,9.6465306 H 4.9395918 V 8.077551 H 19.060408 z");
      add_location(path, file$4, 6, 0, 150);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle0, anchor);
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, circle1, anchor);
      insert_hydration_dev(target, t1, anchor);
      insert_hydration_dev(target, path, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle0);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(circle1);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$7($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('A11yPerson', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<A11yPerson> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var A11yPerson = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A11yPerson, _SvelteComponentDev);
  var _super = _createSuper$7(A11yPerson);
  function A11yPerson(options) {
    var _this;
    _classCallCheck(this, A11yPerson);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A11yPerson",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }
  return _createClass(A11yPerson);
}(SvelteComponentDev);
var A11yPerson$1 = A11yPerson;

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function create_fragment$6(ctx) {
  var mounted;
  var dispose;
  add_render_callback( /*onwindowresize*/ctx[3]);
  var block = {
    c: noop,
    l: noop,
    m: function mount(target, anchor) {
      if (!mounted) {
        dispose = [listen_dev(window, "resize", function () {
          if (is_function( /*onResize*/ctx[2])) /*onResize*/ctx[2].apply(this, arguments);
        }, false, false, false), listen_dev(window, "resize", /*onwindowresize*/ctx[3])];
        mounted = true;
      }
    },
    p: function update(new_ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1);
        _ref2[0];
      ctx = new_ctx;
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$6($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('WindowBinder', slots, []);
  var _$$props$innerHeight = $$props.innerHeight,
    innerHeight = _$$props$innerHeight === void 0 ? null : _$$props$innerHeight;
  var _$$props$innerWidth = $$props.innerWidth,
    innerWidth = _$$props$innerWidth === void 0 ? null : _$$props$innerWidth;
  var onResize = $$props.onResize;
  $$self.$$.on_mount.push(function () {
    if (onResize === undefined && !('onResize' in $$props || $$self.$$.bound[$$self.$$.props['onResize']])) {
      console.warn("<WindowBinder> was created without expected prop 'onResize'");
    }
  });
  var writable_props = ['innerHeight', 'innerWidth', 'onResize'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<WindowBinder> was created with unknown prop '".concat(key, "'"));
  });
  function onwindowresize() {
    $$invalidate(1, innerWidth = window.innerWidth);
    $$invalidate(0, innerHeight = window.innerHeight);
  }
  $$self.$$set = function ($$props) {
    if ('innerHeight' in $$props) $$invalidate(0, innerHeight = $$props.innerHeight);
    if ('innerWidth' in $$props) $$invalidate(1, innerWidth = $$props.innerWidth);
    if ('onResize' in $$props) $$invalidate(2, onResize = $$props.onResize);
  };
  $$self.$capture_state = function () {
    return {
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      onResize: onResize
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('innerHeight' in $$props) $$invalidate(0, innerHeight = $$props.innerHeight);
    if ('innerWidth' in $$props) $$invalidate(1, innerWidth = $$props.innerWidth);
    if ('onResize' in $$props) $$invalidate(2, onResize = $$props.onResize);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [innerHeight, innerWidth, onResize, onwindowresize];
}
var WindowBinder = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(WindowBinder, _SvelteComponentDev);
  var _super = _createSuper$6(WindowBinder);
  function WindowBinder(options) {
    var _this;
    _classCallCheck(this, WindowBinder);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      innerHeight: 0,
      innerWidth: 1,
      onResize: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "WindowBinder",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }
  _createClass(WindowBinder, [{
    key: "innerHeight",
    get: function get() {
      throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "innerWidth",
    get: function get() {
      throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "onResize",
    get: function get() {
      throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return WindowBinder;
}(SvelteComponentDev);
var WindowBinder$1 = WindowBinder;

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "../../components/ui/src/sensors/screen/ScreenSensor.svelte";

// (107:0) {#if shouldRender}
function create_if_block$3(ctx) {
  var windowbinder;
  var updating_innerHeight;
  var updating_innerWidth;
  var t0;
  var div;
  var span;
  var t1;
  var t2;
  var if_block_anchor;
  var current;
  var mounted;
  var dispose;
  function windowbinder_innerHeight_binding(value) {
    /*windowbinder_innerHeight_binding*/ctx[12](value);
  }
  function windowbinder_innerWidth_binding(value) {
    /*windowbinder_innerWidth_binding*/ctx[13](value);
  }
  var windowbinder_props = {
    onResize: /*updateScreen*/ctx[9]
  };
  if ( /*innerHeight*/ctx[3] !== void 0) {
    windowbinder_props.innerHeight = /*innerHeight*/ctx[3];
  }
  if ( /*innerWidth*/ctx[4] !== void 0) {
    windowbinder_props.innerWidth = /*innerWidth*/ctx[4];
  }
  windowbinder = new WindowBinder$1({
    props: windowbinder_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind$1(windowbinder, 'innerHeight', windowbinder_innerHeight_binding);
  });
  binding_callbacks.push(function () {
    return bind$1(windowbinder, 'innerWidth', windowbinder_innerWidth_binding);
  });
  var if_block = /*isDev*/ctx[0] && /*$_sampleSize*/ctx[2] && /*devInfo*/ctx[5] && create_if_block_1$2(ctx);
  var block = {
    c: function create() {
      create_component(windowbinder.$$.fragment);
      t0 = space();
      div = element("div");
      span = element("span");
      t1 = text( /*sampleText*/ctx[1]);
      t2 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      claim_component(windowbinder.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, /*sampleText*/ctx[1]);
      span_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-c7ttbw");
      add_location(span, file$3, 113, 2, 2554);
      attr_dev(div, "class", "textSample svelte-c7ttbw");
      add_location(div, file$3, 112, 1, 2527);
    },
    m: function mount(target, anchor) {
      mount_component(windowbinder, target, anchor);
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, span);
      append_hydration_dev(span, t1);
      insert_hydration_dev(target, t2, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(/*resizeObserver*/ctx[8].call(null, span));
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      var windowbinder_changes = {};
      if (!updating_innerHeight && dirty & /*innerHeight*/8) {
        updating_innerHeight = true;
        windowbinder_changes.innerHeight = /*innerHeight*/ctx[3];
        add_flush_callback(function () {
          return updating_innerHeight = false;
        });
      }
      if (!updating_innerWidth && dirty & /*innerWidth*/16) {
        updating_innerWidth = true;
        windowbinder_changes.innerWidth = /*innerWidth*/ctx[4];
        add_flush_callback(function () {
          return updating_innerWidth = false;
        });
      }
      windowbinder.$set(windowbinder_changes);
      if (!current || dirty & /*sampleText*/2) set_data_dev(t1, /*sampleText*/ctx[1]);
      if ( /*isDev*/ctx[0] && /*$_sampleSize*/ctx[2] && /*devInfo*/ctx[5]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1$2(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(windowbinder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(windowbinder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(windowbinder, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div);
      if (detaching) detach_dev(t2);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(107:0) {#if shouldRender}",
    ctx: ctx
  });
  return block;
}

// (116:1) {#if isDev && $_sampleSize && devInfo}
function create_if_block_1$2(ctx) {
  var div;
  var p0;
  var t0;
  var t1_value = /*devInfo*/ctx[5].DPPR + "";
  var t1;
  var t2;
  var p1;
  var t3;
  var t4_value = /*devInfo*/ctx[5].Display + "";
  var t4;
  var t5;
  var p2;
  var t6;
  var t7_value = /*devInfo*/ctx[5].Text + "";
  var t7;
  var t8;
  var p3;
  var t9;
  var t10_value = /*devInfo*/ctx[5].Classes + "";
  var t10;
  var t11;
  var p4;
  var t12;
  var t13_value = /*devInfo*/ctx[5].Orientation + "";
  var t13;
  var t14;
  var button;
  var t15;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div = element("div");
      p0 = element("p");
      t0 = text("DPPR: ");
      t1 = text(t1_value);
      t2 = space();
      p1 = element("p");
      t3 = text("Display: ");
      t4 = text(t4_value);
      t5 = space();
      p2 = element("p");
      t6 = text("Text: ");
      t7 = text(t7_value);
      t8 = space();
      p3 = element("p");
      t9 = text("Classes: ");
      t10 = text(t10_value);
      t11 = space();
      p4 = element("p");
      t12 = text("Orientation: ");
      t13 = text(t13_value);
      t14 = space();
      button = element("button");
      t15 = text("Close");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "DPPR: ");
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Display: ");
      t4 = claim_text(p1_nodes, t4_value);
      p1_nodes.forEach(detach_dev);
      t5 = claim_space(div_nodes);
      p2 = claim_element(div_nodes, "P", {});
      var p2_nodes = children(p2);
      t6 = claim_text(p2_nodes, "Text: ");
      t7 = claim_text(p2_nodes, t7_value);
      p2_nodes.forEach(detach_dev);
      t8 = claim_space(div_nodes);
      p3 = claim_element(div_nodes, "P", {});
      var p3_nodes = children(p3);
      t9 = claim_text(p3_nodes, "Classes: ");
      t10 = claim_text(p3_nodes, t10_value);
      p3_nodes.forEach(detach_dev);
      t11 = claim_space(div_nodes);
      p4 = claim_element(div_nodes, "P", {});
      var p4_nodes = children(p4);
      t12 = claim_text(p4_nodes, "Orientation: ");
      t13 = claim_text(p4_nodes, t13_value);
      p4_nodes.forEach(detach_dev);
      t14 = claim_space(div_nodes);
      button = claim_element(div_nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      t15 = claim_text(button_nodes, "Close");
      button_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p0, file$3, 117, 3, 2674);
      add_location(p1, file$3, 118, 3, 2705);
      add_location(p2, file$3, 119, 3, 2742);
      add_location(p3, file$3, 120, 3, 2773);
      add_location(p4, file$3, 121, 3, 2810);
      attr_dev(button, "class", "svelte-c7ttbw");
      add_location(button, file$3, 122, 3, 2855);
      attr_dev(div, "class", "devInfo svelte-c7ttbw");
      add_location(div, file$3, 116, 2, 2649);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, p0);
      append_hydration_dev(p0, t0);
      append_hydration_dev(p0, t1);
      append_hydration_dev(div, t2);
      append_hydration_dev(div, p1);
      append_hydration_dev(p1, t3);
      append_hydration_dev(p1, t4);
      append_hydration_dev(div, t5);
      append_hydration_dev(div, p2);
      append_hydration_dev(p2, t6);
      append_hydration_dev(p2, t7);
      append_hydration_dev(div, t8);
      append_hydration_dev(div, p3);
      append_hydration_dev(p3, t9);
      append_hydration_dev(p3, t10);
      append_hydration_dev(div, t11);
      append_hydration_dev(div, p4);
      append_hydration_dev(p4, t12);
      append_hydration_dev(p4, t13);
      append_hydration_dev(div, t14);
      append_hydration_dev(div, button);
      append_hydration_dev(button, t15);
      if (!mounted) {
        dispose = listen_dev(button, "click", /*click_handler*/ctx[14], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty & /*devInfo*/32 && t1_value !== (t1_value = /*devInfo*/ctx[5].DPPR + "")) set_data_dev(t1, t1_value);
      if (dirty & /*devInfo*/32 && t4_value !== (t4_value = /*devInfo*/ctx[5].Display + "")) set_data_dev(t4, t4_value);
      if (dirty & /*devInfo*/32 && t7_value !== (t7_value = /*devInfo*/ctx[5].Text + "")) set_data_dev(t7, t7_value);
      if (dirty & /*devInfo*/32 && t10_value !== (t10_value = /*devInfo*/ctx[5].Classes + "")) set_data_dev(t10, t10_value);
      if (dirty & /*devInfo*/32 && t13_value !== (t13_value = /*devInfo*/ctx[5].Orientation + "")) set_data_dev(t13, t13_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(116:1) {#if isDev && $_sampleSize && devInfo}",
    ctx: ctx
  });
  return block;
}
function create_fragment$5(ctx) {
  var if_block_anchor;
  var current;
  var if_block = /*shouldRender*/ctx[6] && create_if_block$3(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if ( /*shouldRender*/ctx[6]) if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var _screen = writable();
var defaultBreakpoints = [45, 90, 135, 180];
var instancesCount = 0;
function instance$5($$self, $$props, $$invalidate) {
  var sampleLength;
  var devInfo;
  var $_screen,
    $$unsubscribe__screen = noop;
  var $_sampleSize;
  validate_store(_screen, '_screen');
  component_subscribe($$self, _screen, function ($$value) {
    return $$invalidate(11, $_screen = $$value);
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__screen();
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ScreenSensor', slots, []);
  var makeClasses = pipe([mergeObjects, getTruthyValuesKeys, joinWithBlank]);

  // singleton
  var instanceId = instancesCount++;
  var shouldRender = instanceId === 0;

  // action
  var _setupResizeObserver = setupResizeObserver(),
    _sampleSize = _setupResizeObserver._writable,
    resizeObserver = _setupResizeObserver.resizeObserver;
  validate_store(_sampleSize, '_sampleSize');
  component_subscribe($$self, _sampleSize, function (value) {
    return $$invalidate(2, $_sampleSize = value);
  });
  var _$$props$isDev = $$props.isDev,
    isDev = _$$props$isDev === void 0 ? false : _$$props$isDev;
  var _$$props$sampleText = $$props.sampleText,
    sampleText = _$$props$sampleText === void 0 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : _$$props$sampleText;
  var _$$props$breakpoints = $$props.breakpoints,
    breakpoints = _$$props$breakpoints === void 0 ? defaultBreakpoints : _$$props$breakpoints;
  var innerHeight;
  var innerWidth;
  var updateScreen = function updateScreen() {
    if (isServerSide) {
      return;
    }

    // geometry
    var display = {
      aspectRatio: window.innerWidth / window.innerHeight,
      height: window.innerHeight,
      orientation: window.screen.orientation,
      pixelRatio: window.devicePixelRatio,
      width: window.innerWidth
    };
    var glyph = {
      width: $_sampleSize.inlineSize / sampleLength,
      height: $_sampleSize.blockSize
    };
    var text = {
      maxChars: Math.floor(display.width / glyph.width),
      maxLines: Math.floor(display.height / glyph.height)
    };

    // flags
    var orientations = {
      landscape: display.aspectRatio >= 1,
      portrait: display.aspectRatio < 1
    };
    var sizes = {
      xSmall: text.maxChars < breakpoints[0],
      small: true,
      medium: text.maxChars >= breakpoints[1],
      large: text.maxChars >= breakpoints[2],
      xLarge: text.maxChars >= breakpoints[3]
    };

    // update
    _screen.set({
      classes: makeClasses([sizes, orientations]),
      display: display,
      glyph: glyph,
      orientations: orientations,
      sizes: sizes,
      text: text
    });
  };
  var writable_props = ['isDev', 'sampleText', 'breakpoints'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ScreenSensor> was created with unknown prop '".concat(key, "'"));
  });
  function windowbinder_innerHeight_binding(value) {
    innerHeight = value;
    $$invalidate(3, innerHeight);
  }
  function windowbinder_innerWidth_binding(value) {
    innerWidth = value;
    $$invalidate(4, innerWidth);
  }
  var click_handler = function click_handler() {
    $$invalidate(0, isDev = false);
  };
  $$self.$$set = function ($$props) {
    if ('isDev' in $$props) $$invalidate(0, isDev = $$props.isDev);
    if ('sampleText' in $$props) $$invalidate(1, sampleText = $$props.sampleText);
    if ('breakpoints' in $$props) $$invalidate(10, breakpoints = $$props.breakpoints);
  };
  $$self.$capture_state = function () {
    return {
      writable: writable,
      _screen: _screen,
      defaultBreakpoints: defaultBreakpoints,
      instancesCount: instancesCount,
      _: _,
      getTruthyValuesKeys: getTruthyValuesKeys,
      joinWithBlank: joinWithBlank,
      mergeObjects: mergeObjects,
      isServerSide: isServerSide,
      setupResizeObserver: setupResizeObserver,
      WindowBinder: WindowBinder$1,
      makeClasses: makeClasses,
      instanceId: instanceId,
      shouldRender: shouldRender,
      _sampleSize: _sampleSize,
      resizeObserver: resizeObserver,
      isDev: isDev,
      sampleText: sampleText,
      breakpoints: breakpoints,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      updateScreen: updateScreen,
      devInfo: devInfo,
      sampleLength: sampleLength,
      $_screen: $_screen,
      $_sampleSize: $_sampleSize
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('isDev' in $$props) $$invalidate(0, isDev = $$props.isDev);
    if ('sampleText' in $$props) $$invalidate(1, sampleText = $$props.sampleText);
    if ('breakpoints' in $$props) $$invalidate(10, breakpoints = $$props.breakpoints);
    if ('innerHeight' in $$props) $$invalidate(3, innerHeight = $$props.innerHeight);
    if ('innerWidth' in $$props) $$invalidate(4, innerWidth = $$props.innerWidth);
    if ('devInfo' in $$props) $$invalidate(5, devInfo = $$props.devInfo);
    if ('sampleLength' in $$props) sampleLength = $$props.sampleLength;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*sampleText*/2) {
      sampleLength = sampleText.length;
    }
    if ($$self.$$.dirty & /*$_sampleSize*/4) {
      $_sampleSize && updateScreen();
    }
    if ($$self.$$.dirty & /*$_screen*/2048) {
      $$invalidate(5, devInfo = shouldRender && $_screen && {
        Classes: $_screen.classes,
        Display: "".concat($_screen.display.width, " x ").concat($_screen.display.height, " px"),
        DPPR: $_screen.display.pixelRatio.toPrecision(4),
        Orientation: $_screen.display.aspectRatio > 1 ? 'landscape' : 'portrait',
        Text: "".concat($_screen.text.maxChars, " x ").concat($_screen.text.maxLines, " chars")
      });
    }
  };
  return [isDev, sampleText, $_sampleSize, innerHeight, innerWidth, devInfo, shouldRender, _sampleSize, resizeObserver, updateScreen, breakpoints, $_screen, windowbinder_innerHeight_binding, windowbinder_innerWidth_binding, click_handler];
}
var ScreenSensor = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ScreenSensor, _SvelteComponentDev);
  var _super = _createSuper$5(ScreenSensor);
  function ScreenSensor(options) {
    var _this;
    _classCallCheck(this, ScreenSensor);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      isDev: 0,
      sampleText: 1,
      breakpoints: 10
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ScreenSensor",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }
  _createClass(ScreenSensor, [{
    key: "isDev",
    get: function get() {
      throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sampleText",
    get: function get() {
      throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "breakpoints",
    get: function get() {
      throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return ScreenSensor;
}(SvelteComponentDev);
var ScreenSensor$1 = ScreenSensor;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function create_fragment$4(ctx) {
  var block = {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$4($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('NoScript', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<NoScript> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var NoScript = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(NoScript, _SvelteComponentDev);
  var _super = _createSuper$4(NoScript);
  function NoScript(options) {
    var _this;
    _classCallCheck(this, NoScript);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "NoScript",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }
  return _createClass(NoScript);
}(SvelteComponentDev);
var NoScript$1 = NoScript;

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "src/lib/components/Nav.svelte";
function create_fragment$3(ctx) {
  var nav;
  var div0;
  var ul0;
  var li0;
  var a0;
  var t0;
  var t1;
  var li1;
  var a1;
  var t2;
  var t3;
  var li2;
  var a2;
  var t4;
  var t5;
  var div1;
  var ul1;
  var li3;
  var a3;
  var t6;
  var t7;
  var li4;
  var button;
  var icon;
  var current;
  var mounted;
  var dispose;
  icon = new Icon$1({
    props: {
      glyph: A11yPerson$1,
      stroke: /*isA11yDirty*/ctx[0] ? 'white' : 'black',
      strokeWidth: "1",
      fill: /*isA11yDirty*/ctx[0] ? 'black' : 'white'
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      nav = element("nav");
      div0 = element("div");
      ul0 = element("ul");
      li0 = element("li");
      a0 = element("a");
      t0 = text("Tools");
      t1 = space();
      li1 = element("li");
      a1 = element("a");
      t2 = text("Components");
      t3 = space();
      li2 = element("li");
      a2 = element("a");
      t4 = text("Compounds");
      t5 = space();
      div1 = element("div");
      ul1 = element("ul");
      li3 = element("li");
      a3 = element("a");
      t6 = text("Github repo");
      t7 = space();
      li4 = element("li");
      button = element("button");
      create_component(icon.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div0 = claim_element(nav_nodes, "DIV", {});
      var div0_nodes = children(div0);
      ul0 = claim_element(div0_nodes, "UL", {
        class: true
      });
      var ul0_nodes = children(ul0);
      li0 = claim_element(ul0_nodes, "LI", {
        class: true
      });
      var li0_nodes = children(li0);
      a0 = claim_element(li0_nodes, "A", {
        href: true,
        class: true
      });
      var a0_nodes = children(a0);
      t0 = claim_text(a0_nodes, "Tools");
      a0_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t1 = claim_space(ul0_nodes);
      li1 = claim_element(ul0_nodes, "LI", {
        class: true
      });
      var li1_nodes = children(li1);
      a1 = claim_element(li1_nodes, "A", {
        rel: true,
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t2 = claim_text(a1_nodes, "Components");
      a1_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      t3 = claim_space(ul0_nodes);
      li2 = claim_element(ul0_nodes, "LI", {
        class: true
      });
      var li2_nodes = children(li2);
      a2 = claim_element(li2_nodes, "A", {
        rel: true,
        href: true,
        class: true
      });
      var a2_nodes = children(a2);
      t4 = claim_text(a2_nodes, "Compounds");
      a2_nodes.forEach(detach_dev);
      li2_nodes.forEach(detach_dev);
      ul0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t5 = claim_space(nav_nodes);
      div1 = claim_element(nav_nodes, "DIV", {});
      var div1_nodes = children(div1);
      ul1 = claim_element(div1_nodes, "UL", {
        class: true
      });
      var ul1_nodes = children(ul1);
      li3 = claim_element(ul1_nodes, "LI", {
        class: true
      });
      var li3_nodes = children(li3);
      a3 = claim_element(li3_nodes, "A", {
        href: true,
        class: true
      });
      var a3_nodes = children(a3);
      t6 = claim_text(a3_nodes, "Github repo");
      a3_nodes.forEach(detach_dev);
      li3_nodes.forEach(detach_dev);
      t7 = claim_space(ul1_nodes);
      li4 = claim_element(ul1_nodes, "LI", {
        class: true
      });
      var li4_nodes = children(li4);
      button = claim_element(li4_nodes, "BUTTON", {
        "aria-label": true,
        class: true
      });
      var button_nodes = children(button);
      claim_component(icon.$$.fragment, button_nodes);
      button_nodes.forEach(detach_dev);
      li4_nodes.forEach(detach_dev);
      ul1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a0, "href", "./");
      attr_dev(a0, "class", "svelte-1umjh0a");
      toggle_class(a0, "selected", /*segment*/ctx[1] === undefined);
      add_location(a0, file$2, 17, 4, 330);
      attr_dev(li0, "class", "svelte-1umjh0a");
      add_location(li0, file$2, 16, 3, 321);
      attr_dev(a1, "rel", "prefetch");
      attr_dev(a1, "href", "./components/BarchartVDiv");
      attr_dev(a1, "class", "svelte-1umjh0a");
      toggle_class(a1, "selected", /*segment*/ctx[1] === 'components');
      add_location(a1, file$2, 23, 4, 428);
      attr_dev(li1, "class", "svelte-1umjh0a");
      add_location(li1, file$2, 22, 3, 419);
      attr_dev(a2, "rel", "prefetch");
      attr_dev(a2, "href", "./compounds/time_region_value");
      attr_dev(a2, "class", "svelte-1umjh0a");
      toggle_class(a2, "selected", /*segment*/ctx[1] === 'compounds');
      add_location(a2, file$2, 30, 4, 575);
      attr_dev(li2, "class", "svelte-1umjh0a");
      add_location(li2, file$2, 29, 3, 566);
      attr_dev(ul0, "class", "svelte-1umjh0a");
      add_location(ul0, file$2, 15, 2, 313);
      add_location(div0, file$2, 14, 1, 305);
      attr_dev(a3, "href", "https://github.com/nestauk/svizzle");
      attr_dev(a3, "class", "svelte-1umjh0a");
      add_location(a3, file$2, 41, 4, 754);
      attr_dev(li3, "class", "svelte-1umjh0a");
      add_location(li3, file$2, 40, 3, 745);
      attr_dev(button, "aria-label", "Accessibility settings");
      attr_dev(button, "class", "clickable svelte-1umjh0a");
      add_location(button, file$2, 44, 4, 836);
      attr_dev(li4, "class", "svelte-1umjh0a");
      add_location(li4, file$2, 43, 3, 827);
      attr_dev(ul1, "class", "svelte-1umjh0a");
      add_location(ul1, file$2, 39, 2, 737);
      add_location(div1, file$2, 38, 1, 729);
      attr_dev(nav, "class", "svelte-1umjh0a");
      add_location(nav, file$2, 13, 0, 298);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, nav, anchor);
      append_hydration_dev(nav, div0);
      append_hydration_dev(div0, ul0);
      append_hydration_dev(ul0, li0);
      append_hydration_dev(li0, a0);
      append_hydration_dev(a0, t0);
      append_hydration_dev(ul0, t1);
      append_hydration_dev(ul0, li1);
      append_hydration_dev(li1, a1);
      append_hydration_dev(a1, t2);
      append_hydration_dev(ul0, t3);
      append_hydration_dev(ul0, li2);
      append_hydration_dev(li2, a2);
      append_hydration_dev(a2, t4);
      append_hydration_dev(nav, t5);
      append_hydration_dev(nav, div1);
      append_hydration_dev(div1, ul1);
      append_hydration_dev(ul1, li3);
      append_hydration_dev(li3, a3);
      append_hydration_dev(a3, t6);
      append_hydration_dev(ul1, t7);
      append_hydration_dev(ul1, li4);
      append_hydration_dev(li4, button);
      mount_component(icon, button, null);
      current = true;
      if (!mounted) {
        dispose = listen_dev(button, "click", /*toggleA11yMenu*/ctx[2], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (!current || dirty & /*segment, undefined*/2) {
        toggle_class(a0, "selected", /*segment*/ctx[1] === undefined);
      }
      if (!current || dirty & /*segment*/2) {
        toggle_class(a1, "selected", /*segment*/ctx[1] === 'components');
      }
      if (!current || dirty & /*segment*/2) {
        toggle_class(a2, "selected", /*segment*/ctx[1] === 'compounds');
      }
      var icon_changes = {};
      if (dirty & /*isA11yDirty*/1) icon_changes.stroke = /*isA11yDirty*/ctx[0] ? 'white' : 'black';
      if (dirty & /*isA11yDirty*/1) icon_changes.fill = /*isA11yDirty*/ctx[0] ? 'black' : 'white';
      icon.$set(icon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_component(icon);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$3($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Nav', slots, []);
  var _$$props$isA11yDirty = $$props.isA11yDirty,
    isA11yDirty = _$$props$isA11yDirty === void 0 ? false : _$$props$isA11yDirty;
  var segment = $$props.segment;
  var _$$props$showA11yMenu = $$props.showA11yMenu,
    showA11yMenu = _$$props$showA11yMenu === void 0 ? false : _$$props$showA11yMenu;
  var toggleA11yMenu = function toggleA11yMenu(event) {
    $$invalidate(3, showA11yMenu = !showA11yMenu);
    event.target.setAttribute('aria-expanded', showA11yMenu.toString());
  };
  $$self.$$.on_mount.push(function () {
    if (segment === undefined && !('segment' in $$props || $$self.$$.bound[$$self.$$.props['segment']])) {
      console.warn("<Nav> was created without expected prop 'segment'");
    }
  });
  var writable_props = ['isA11yDirty', 'segment', 'showA11yMenu'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Nav> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('isA11yDirty' in $$props) $$invalidate(0, isA11yDirty = $$props.isA11yDirty);
    if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
    if ('showA11yMenu' in $$props) $$invalidate(3, showA11yMenu = $$props.showA11yMenu);
  };
  $$self.$capture_state = function () {
    return {
      A11yPerson: A11yPerson$1,
      Icon: Icon$1,
      isA11yDirty: isA11yDirty,
      segment: segment,
      showA11yMenu: showA11yMenu,
      toggleA11yMenu: toggleA11yMenu
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('isA11yDirty' in $$props) $$invalidate(0, isA11yDirty = $$props.isA11yDirty);
    if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
    if ('showA11yMenu' in $$props) $$invalidate(3, showA11yMenu = $$props.showA11yMenu);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [isA11yDirty, segment, toggleA11yMenu, showA11yMenu];
}
var Nav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Nav, _SvelteComponentDev);
  var _super = _createSuper$3(Nav);
  function Nav(options) {
    var _this;
    _classCallCheck(this, Nav);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      isA11yDirty: 0,
      segment: 1,
      showA11yMenu: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Nav",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }
  _createClass(Nav, [{
    key: "isA11yDirty",
    get: function get() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segment",
    get: function get() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "showA11yMenu",
    get: function get() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Nav;
}(SvelteComponentDev);

var fontsInfo = [{
  family: 'Avenir Next Variable',
  faces: [{
    src: 'url(/svizzle/font/AvenirNext/Variable.ttf) format("truetype")'
  }]
}, {
  family: 'Archivo',
  faces: [{
    src: 'url(/svizzle/font/Archivo/VariableFont_wdth,wght.ttf) format("truetype")',
    descriptors: {
      style: 'normal'
    }
  }, {
    src: 'url(/svizzle/font/Archivo/Italic-VariableFont_wdth,wght.ttf) format("truetype")',
    descriptors: {
      style: 'italic'
    }
  }]
}, {
  family: 'Noboto Flex',
  faces: [{
    src: 'url(/svizzle/font/NobotoFlex/Variable.woff2)',
    descriptors: {
      weight: 140
    }
  }]
}, {
  family: 'Courier New'
}, {
  family: 'Open Dyslexia',
  faces: [{
    src: 'url(/svizzle/font/OpenDyslexic/Regular.otf) format("opentype")',
    descriptors: {
      weight: 400,
      style: 'normal'
    }
  }, {
    src: 'url(/svizzle/font/OpenDyslexic/Italic.otf) format("opentype")',
    descriptors: {
      weight: 400,
      style: 'italic'
    }
  }, {
    src: 'url(/svizzle/font/OpenDyslexic/Bold.otf) format("opentype")',
    descriptors: {
      weight: 700,
      style: 'normal'
    }
  }, {
    src: 'url(/svizzle/font/OpenDyslexic/BoldItalic.otf) format("opentype")',
    descriptors: {
      weight: 700,
      style: 'italic'
    }
  }]
}];
var a11yFontFamilies = getFamilies(fontsInfo);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "src/routes/_layout.svelte";

// (37:0) {#if fontLoadStatus?.isFirstLoaded}
function create_if_block_1$1(ctx) {
  var screensensor;
  var current;
  screensensor = new ScreenSensor$1({
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(screensensor.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(screensensor.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(screensensor, target, anchor);
      current = true;
    },
    i: function intro(local) {
      if (current) return;
      transition_in(screensensor.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(screensensor.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(screensensor, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(37:0) {#if fontLoadStatus?.isFirstLoaded}",
    ctx: ctx
  });
  return block;
}

// (52:0) {#if showA11yMenu}
function create_if_block$2(ctx) {
  var section;
  var a11ymenu;
  var current;
  a11ymenu = new A11yMenu$1({
    props: {
      _screen: _screen
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      section = element("section");
      create_component(a11ymenu.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        role: true,
        class: true
      });
      var section_nodes = children(section);
      claim_component(a11ymenu.$$.fragment, section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(section, "role", "region");
      attr_dev(section, "class", "svelte-1dty0qo");
      add_location(section, file$1, 53, 1, 832);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, section, anchor);
      mount_component(a11ymenu, section, null);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(a11ymenu.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(a11ymenu.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(section);
      destroy_component(a11ymenu);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(52:0) {#if showA11yMenu}",
    ctx: ctx
  });
  return block;
}
function create_fragment$2(ctx) {
  var _ctx$;
  var noscript;
  var t0;
  var a11ymenudriver;
  var t1;
  var fontsloader;
  var updating_status;
  var t2;
  var t3;
  var header;
  var nav;
  var updating_showA11yMenu;
  var t4;
  var main;
  var t5;
  var if_block1_anchor;
  var current;
  noscript = new NoScript$1({
    $$inline: true
  });
  a11ymenudriver = new A11yMenuDriver$1({
    props: {
      defaults: {
        typeface: {
          defaultValue: a11yFontFamilies[0],
          values: a11yFontFamilies
        }
      }
    },
    $$inline: true
  });
  function fontsloader_status_binding(value) {
    /*fontsloader_status_binding*/ctx[7](value);
  }
  var fontsloader_props = {
    firstFamilyToLoad: /*$_a11ySettings*/ctx[3].typeface.value,
    fontsInfo: fontsInfo
  };
  if ( /*fontLoadStatus*/ctx[1] !== void 0) {
    fontsloader_props.status = /*fontLoadStatus*/ctx[1];
  }
  fontsloader = new FontsLoader$1({
    props: fontsloader_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind$1(fontsloader, 'status', fontsloader_status_binding);
  });
  var if_block0 = /*fontLoadStatus*/((_ctx$ = ctx[1]) === null || _ctx$ === void 0 ? void 0 : _ctx$.isFirstLoaded) && create_if_block_1$1(ctx);
  function nav_showA11yMenu_binding(value) {
    /*nav_showA11yMenu_binding*/ctx[8](value);
  }
  var nav_props = {
    segment: /*segment*/ctx[0],
    isA11yDirty: /*$_isA11yDirty*/ctx[4]
  };
  if ( /*showA11yMenu*/ctx[2] !== void 0) {
    nav_props.showA11yMenu = /*showA11yMenu*/ctx[2];
  }
  nav = new Nav({
    props: nav_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind$1(nav, 'showA11yMenu', nav_showA11yMenu_binding);
  });
  var default_slot_template = /*#slots*/ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[5], null);
  var if_block1 = /*showA11yMenu*/ctx[2] && create_if_block$2(ctx);
  var block = {
    c: function create() {
      create_component(noscript.$$.fragment);
      t0 = space();
      create_component(a11ymenudriver.$$.fragment);
      t1 = space();
      create_component(fontsloader.$$.fragment);
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      header = element("header");
      create_component(nav.$$.fragment);
      t4 = space();
      main = element("main");
      if (default_slot) default_slot.c();
      t5 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      claim_component(noscript.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(a11ymenudriver.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(fontsloader.$$.fragment, nodes);
      t2 = claim_space(nodes);
      if (if_block0) if_block0.l(nodes);
      t3 = claim_space(nodes);
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      claim_component(nav.$$.fragment, header_nodes);
      header_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      t5 = claim_space(nodes);
      if (if_block1) if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(header, "class", "svelte-1dty0qo");
      add_location(header, file$1, 40, 0, 648);
      attr_dev(main, "class", "svelte-1dty0qo");
      add_location(main, file$1, 48, 0, 740);
    },
    m: function mount(target, anchor) {
      mount_component(noscript, target, anchor);
      insert_hydration_dev(target, t0, anchor);
      mount_component(a11ymenudriver, target, anchor);
      insert_hydration_dev(target, t1, anchor);
      mount_component(fontsloader, target, anchor);
      insert_hydration_dev(target, t2, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert_hydration_dev(target, t3, anchor);
      insert_hydration_dev(target, header, anchor);
      mount_component(nav, header, null);
      insert_hydration_dev(target, t4, anchor);
      insert_hydration_dev(target, main, anchor);
      if (default_slot) {
        default_slot.m(main, null);
      }
      insert_hydration_dev(target, t5, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_hydration_dev(target, if_block1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ctx$2;
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var fontsloader_changes = {};
      if (dirty & /*$_a11ySettings*/8) fontsloader_changes.firstFamilyToLoad = /*$_a11ySettings*/ctx[3].typeface.value;
      if (!updating_status && dirty & /*fontLoadStatus*/2) {
        updating_status = true;
        fontsloader_changes.status = /*fontLoadStatus*/ctx[1];
        add_flush_callback(function () {
          return updating_status = false;
        });
      }
      fontsloader.$set(fontsloader_changes);
      if ( /*fontLoadStatus*/(_ctx$2 = ctx[1]) !== null && _ctx$2 !== void 0 && _ctx$2.isFirstLoaded) {
        if (if_block0) {
          if (dirty & /*fontLoadStatus*/2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t3.parentNode, t3);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      var nav_changes = {};
      if (dirty & /*segment*/1) nav_changes.segment = /*segment*/ctx[0];
      if (dirty & /*$_isA11yDirty*/16) nav_changes.isA11yDirty = /*$_isA11yDirty*/ctx[4];
      if (!updating_showA11yMenu && dirty & /*showA11yMenu*/4) {
        updating_showA11yMenu = true;
        nav_changes.showA11yMenu = /*showA11yMenu*/ctx[2];
        add_flush_callback(function () {
          return updating_showA11yMenu = false;
        });
      }
      nav.$set(nav_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/32)) {
          update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[5], !current ? get_all_dirty_from_scope( /*$$scope*/ctx[5]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[5], dirty, null), null);
        }
      }
      if ( /*showA11yMenu*/ctx[2]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*showA11yMenu*/4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(noscript.$$.fragment, local);
      transition_in(a11ymenudriver.$$.fragment, local);
      transition_in(fontsloader.$$.fragment, local);
      transition_in(if_block0);
      transition_in(nav.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(noscript.$$.fragment, local);
      transition_out(a11ymenudriver.$$.fragment, local);
      transition_out(fontsloader.$$.fragment, local);
      transition_out(if_block0);
      transition_out(nav.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(noscript, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(a11ymenudriver, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(fontsloader, detaching);
      if (detaching) detach_dev(t2);
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t3);
      if (detaching) detach_dev(header);
      destroy_component(nav);
      if (detaching) detach_dev(t4);
      if (detaching) detach_dev(main);
      if (default_slot) default_slot.d(detaching);
      if (detaching) detach_dev(t5);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(if_block1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$2($$self, $$props, $$invalidate) {
  var $_a11ySettings;
  var $_isA11yDirty;
  validate_store(_a11ySettings, '_a11ySettings');
  component_subscribe($$self, _a11ySettings, function ($$value) {
    return $$invalidate(3, $_a11ySettings = $$value);
  });
  validate_store(_isA11yDirty, '_isA11yDirty');
  component_subscribe($$self, _isA11yDirty, function ($$value) {
    return $$invalidate(4, $_isA11yDirty = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
    $$scope = $$props.$$scope;
  validate_slots('Layout', slots, ['default']);
  var segment = $$props.segment;
  var fontLoadStatus;
  var showA11yMenu;
  $$self.$$.on_mount.push(function () {
    if (segment === undefined && !('segment' in $$props || $$self.$$.bound[$$self.$$.props['segment']])) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }
  });
  var writable_props = ['segment'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  function fontsloader_status_binding(value) {
    fontLoadStatus = value;
    $$invalidate(1, fontLoadStatus);
  }
  function nav_showA11yMenu_binding(value) {
    showA11yMenu = value;
    $$invalidate(2, showA11yMenu);
  }
  $$self.$$set = function ($$props) {
    if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
    if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
  };
  $$self.$capture_state = function () {
    return {
      _a11ySettings: _a11ySettings,
      _isA11yDirty: _isA11yDirty,
      _screen: _screen,
      A11yMenu: A11yMenu$1,
      A11yMenuDriver: A11yMenuDriver$1,
      FontsLoader: FontsLoader$1,
      NoScript: NoScript$1,
      ScreenSensor: ScreenSensor$1,
      Nav: Nav,
      a11yFontFamilies: a11yFontFamilies,
      fontsInfo: fontsInfo,
      segment: segment,
      fontLoadStatus: fontLoadStatus,
      showA11yMenu: showA11yMenu,
      $_a11ySettings: $_a11ySettings,
      $_isA11yDirty: $_isA11yDirty
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
    if ('fontLoadStatus' in $$props) $$invalidate(1, fontLoadStatus = $$props.fontLoadStatus);
    if ('showA11yMenu' in $$props) $$invalidate(2, showA11yMenu = $$props.showA11yMenu);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [segment, fontLoadStatus, showA11yMenu, $_a11ySettings, $_isA11yDirty, $$scope, slots, fontsloader_status_binding, nav_showA11yMenu_binding];
}
var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);
  var _super = _createSuper$2(Layout);
  function Layout(options) {
    var _this;
    _classCallCheck(this, Layout);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }
  _createClass(Layout, [{
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Layout;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;
var file = "src/routes/_error.svelte";

// (38:0) {#if dev && error.stack}
function create_if_block$1(ctx) {
  var pre;
  var t_value = /*error*/ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file, 38, 1, 443);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, pre, anchor);
      append_hydration_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*error*/2 && t_value !== (t_value = /*error*/ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(38:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}
function create_fragment$1(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value = /*error*/ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value = /*status*/ctx[0];
  var if_block = /*dev*/ctx[2] && /*error*/ctx[1].stack && create_if_block$1(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text( /*status*/ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = head_selector('svelte-1o9r2ue', document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, /*status*/ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-8od9u6");
      add_location(h1, file, 33, 0, 374);
      attr_dev(p, "class", "svelte-8od9u6");
      add_location(p, file, 35, 0, 393);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, h1, anchor);
      append_hydration_dev(h1, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, t3);
      insert_hydration_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (dirty & /*status*/1 && title_value !== (title_value = /*status*/ctx[0])) {
        document.title = title_value;
      }
      if (dirty & /*status*/1) set_data_dev(t1, /*status*/ctx[0]);
      if (dirty & /*error*/2 && t3_value !== (t3_value = /*error*/ctx[1].message + "")) set_data_dev(t3, t3_value);
      if ( /*dev*/ctx[2] && /*error*/ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$1($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Error', slots, []);
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === 'development';
  $$self.$$.on_mount.push(function () {
    if (status === undefined && !('status' in $$props || $$self.$$.bound[$$self.$$.props['status']])) {
      console.warn("<Error> was created without expected prop 'status'");
    }
    if (error === undefined && !('error' in $$props || $$self.$$.bound[$$self.$$.props['error']])) {
      console.warn("<Error> was created without expected prop 'error'");
    }
  });
  var writable_props = ['status', 'error'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('status' in $$props) $$invalidate(0, status = $$props.status);
    if ('error' in $$props) $$invalidate(1, error = $$props.error);
  };
  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('status' in $$props) $$invalidate(0, status = $$props.status);
    if ('error' in $$props) $$invalidate(1, error = $$props.error);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [status, error, dev];
}
var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);
  var _super = _createSuper$1(Error);
  function Error(options) {
    var _this;
    _classCallCheck(this, Error);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }
  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Error;
}(SvelteComponentDev);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;

// (24:1) {:else}
function create_else_block(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    segment: /*segments*/ctx[2][1]
  }, /*level1*/ctx[4].props];
  var switch_value = /*level1*/ctx[4].component;
  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    };
    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor);
      insert_hydration_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty & /*segments, level1*/20 ? get_spread_update(switch_instance_spread_levels, [dirty & /*segments*/4 && {
        segment: /*segments*/ctx[2][1]
      }, dirty & /*level1*/16 && get_spread_object( /*level1*/ctx[4].props)]) : {};
      if (dirty & /*$$scope, level2*/288) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }
      if (switch_value !== (switch_value = /*level1*/ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(24:1) {:else}",
    ctx: ctx
  });
  return block;
}

// (22:1) {#if error}
function create_if_block(ctx) {
  var error_1;
  var current;
  error_1 = new Error$1({
    props: {
      error: /*error*/ctx[0],
      status: /*status*/ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty & /*error*/1) error_1_changes.error = /*error*/ctx[0];
      if (dirty & /*status*/2) error_1_changes.status = /*status*/ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(22:1) {#if error}",
    ctx: ctx
  });
  return block;
}

// (26:3) {#if level2}
function create_if_block_1(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [/*level2*/ctx[5].props];
  var switch_value = /*level2*/ctx[5].component;
  function switch_props(ctx) {
    var switch_instance_props = {};
    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props());
  }
  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor);
      insert_hydration_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty & /*level2*/32 ? get_spread_update(switch_instance_spread_levels, [get_spread_object( /*level2*/ctx[5].props)]) : {};
      if (switch_value !== (switch_value = /*level2*/ctx[5].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(26:3) {#if level2}",
    ctx: ctx
  });
  return block;
}

// (25:2) <svelte:component this="{level1.component}" segment="{segments[1]}" {...level1.props}>
function create_default_slot_1(ctx) {
  var if_block_anchor;
  var current;
  var if_block = /*level2*/ctx[5] && create_if_block_1(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ( /*level2*/ctx[5]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*level2*/32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(25:2) <svelte:component this=\\\"{level1.component}\\\" segment=\\\"{segments[1]}\\\" {...level1.props}>",
    ctx: ctx
  });
  return block;
}

// (21:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*error*/ctx[0]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(21:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}
function create_fragment(ctx) {
  var layout;
  var current;
  var layout_spread_levels = [{
    segment: /*segments*/ctx[2][0]
  }, /*level0*/ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };
  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }
  layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var layout_changes = dirty & /*segments, level0*/12 ? get_spread_update(layout_spread_levels, [dirty & /*segments*/4 && {
        segment: /*segments*/ctx[2][0]
      }, dirty & /*level0*/8 && get_spread_object( /*level0*/ctx[3].props)]) : {};
      if (dirty & /*$$scope, error, status, level1, segments, level2*/311) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }
      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('App', slots, []);
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
    level1 = _$$props$level === void 0 ? null : _$$props$level;
  var _$$props$level2 = $$props.level2,
    level2 = _$$props$level2 === void 0 ? null : _$$props$level2;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  $$self.$$.on_mount.push(function () {
    if (stores === undefined && !('stores' in $$props || $$self.$$.bound[$$self.$$.props['stores']])) {
      console.warn("<App> was created without expected prop 'stores'");
    }
    if (error === undefined && !('error' in $$props || $$self.$$.bound[$$self.$$.props['error']])) {
      console.warn("<App> was created without expected prop 'error'");
    }
    if (status === undefined && !('status' in $$props || $$self.$$.bound[$$self.$$.props['status']])) {
      console.warn("<App> was created without expected prop 'status'");
    }
    if (segments === undefined && !('segments' in $$props || $$self.$$.bound[$$self.$$.props['segments']])) {
      console.warn("<App> was created without expected prop 'segments'");
    }
    if (level0 === undefined && !('level0' in $$props || $$self.$$.bound[$$self.$$.props['level0']])) {
      console.warn("<App> was created without expected prop 'level0'");
    }
    if (notify === undefined && !('notify' in $$props || $$self.$$.bound[$$self.$$.props['notify']])) {
      console.warn("<App> was created without expected prop 'notify'");
    }
  });
  var writable_props = ['stores', 'error', 'status', 'segments', 'level0', 'level1', 'level2', 'notify'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('stores' in $$props) $$invalidate(6, stores = $$props.stores);
    if ('error' in $$props) $$invalidate(0, error = $$props.error);
    if ('status' in $$props) $$invalidate(1, status = $$props.status);
    if ('segments' in $$props) $$invalidate(2, segments = $$props.segments);
    if ('level0' in $$props) $$invalidate(3, level0 = $$props.level0);
    if ('level1' in $$props) $$invalidate(4, level1 = $$props.level1);
    if ('level2' in $$props) $$invalidate(5, level2 = $$props.level2);
    if ('notify' in $$props) $$invalidate(7, notify = $$props.notify);
  };
  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      level2: level2,
      notify: notify
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('stores' in $$props) $$invalidate(6, stores = $$props.stores);
    if ('error' in $$props) $$invalidate(0, error = $$props.error);
    if ('status' in $$props) $$invalidate(1, status = $$props.status);
    if ('segments' in $$props) $$invalidate(2, segments = $$props.segments);
    if ('level0' in $$props) $$invalidate(3, level0 = $$props.level0);
    if ('level1' in $$props) $$invalidate(4, level1 = $$props.level1);
    if ('level2' in $$props) $$invalidate(5, level2 = $$props.level2);
    if ('notify' in $$props) $$invalidate(7, notify = $$props.notify);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [error, status, segments, level0, level1, level2, stores, notify];
}
var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);
  var _super = _createSuper(App);
  function App(options) {
    var _this;
    _classCallCheck(this, App);
    _this = _super.call(this, options);
    init$2(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      stores: 6,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      level2: 5,
      notify: 7
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }
  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level2",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [/^\/components\.json$/];
var components = [{
  js: function js() {
    return Promise.all([import('./index.efe96b7a.js'), __inject_styles(["client-a40ce2c8.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./_layout.4b41bebb.js'), __inject_styles(["client-a40ce2c8.css","rgb-4ddf9c7b.css","topojson-779c85bf.css","_utils-55e81f1e.css","_layout-bf19d42f.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./index.00f83b53.js'), __inject_styles(["client-a40ce2c8.css","index-685939ab.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./_slug_.aa5564e8.js'), __inject_styles(["client-a40ce2c8.css","rgb-4ddf9c7b.css","topojson-779c85bf.css","_utils-55e81f1e.css","ColorBinsDiv-9e7cfc98.css","ChoroplethG-0fb41d2b.css","_slug_-d331086f.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./_layout.39a9ef0f.js'), __inject_styles(["client-a40ce2c8.css","topojson-779c85bf.css","rgb-4ddf9c7b.css","_layout-9bde9bd6.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./index.c96fc30f.js'), __inject_styles(["client-a40ce2c8.css","index-b1ade5e1.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./index.998ea3e1.js'), __inject_styles(["client-a40ce2c8.css","rgb-4ddf9c7b.css","ColorBinsDiv-9e7cfc98.css","types-e2703f45.css","index-150444f5.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./_year_.ad73b17a.js'), __inject_styles(["client-a40ce2c8.css","rgb-4ddf9c7b.css","ColorBinsDiv-9e7cfc98.css","topojson-779c85bf.css","ChoroplethG-0fb41d2b.css","types-e2703f45.css","_year_-6fcebc5f.css"])]).then(function(x) { return x[0]; });
  }
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // components/index.svelte
    pattern: /^\/components\/?$/,
    parts: [{
      i: 1
    }, {
      i: 2
    }]
  }, {
    // components/[slug].svelte
    pattern: /^\/components\/([^/]+?)\/?$/,
    parts: [{
      i: 1
    }, {
      i: 3,
      params: function params(match) {
        return {
          slug: d(match[1])
        };
      }
    }]
  }, {
    // compounds/time_region_value/index.svelte
    pattern: /^\/compounds\/time_region_value\/?$/,
    parts: [null, {
      i: 4
    }, {
      i: 5
    }]
  }, {
    // compounds/time_region_value/[id]/index.svelte
    pattern: /^\/compounds\/time_region_value\/([^/]+?)\/?$/,
    parts: [null, {
      i: 4
    }, {
      i: 6,
      params: function params(match) {
        return {
          id: d(match[1])
        };
      }
    }]
  }, {
    // compounds/time_region_value/[id]/[year].svelte
    pattern: /^\/compounds\/time_region_value\/([^/]+?)\/([^/]+?)\/?$/,
    parts: [null, {
      i: 4
    }, null, {
      i: 7,
      params: function params(match) {
        return {
          id: d(match[1]),
          year: d(match[2])
        };
      }
    }]
  }];
}(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
  return node;
}
var uid = 1;
function set_uid(n) {
  uid = n;
}
var cid;
function set_cid(n) {
  cid = n;
}
var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState() {},
  replaceState: function replaceState() {},
  scrollRestoration: 'auto'
};
var scroll_history = {};
function load_current_page() {
  return Promise.resolve().then(function () {
    var _location = location,
      hash = _location.hash,
      href = _location.href;
    _history.replaceState({
      id: uid
    }, '', href);
    var target = select_target(new URL(location.href));
    if (target) return navigate(target, uid, true, hash);
  });
}
var base_url;
var handle_target;
function init(base, handler) {
  base_url = base;
  handle_target = handler;
  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  }
  // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.
  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  });
  // Setting scrollRestoration to manual again when returning to this page.
  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate);
}
// IE11 does not support URLSearchParams so we'll fall back to a custom
// RegExp that mimics the standard URLSearchParams method
var _get_query_array = function _get_query_array(search) {
  if (typeof URLSearchParams !== 'undefined') {
    return _toConsumableArray(new URLSearchParams(search).entries());
  }
  return search.slice(1).split('&').map(function (searchParam) {
    // Instead of `.*` we'll use \s\S to allow characters and non characters
    // such as [\r\n\v\f]
    var _exec = /([^=]*)(?:=([\S\s]*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
      _exec2 = _slicedToArray(_exec, 3),
      key = _exec2[1],
      _exec2$ = _exec2[2],
      value = _exec2$ === void 0 ? '' : _exec2$;
    return [key, value];
  });
};
function extract_query(search) {
  var query = Object.create(null);
  return search.length ? _get_query_array(search).reduce(function (query, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (typeof query[key] === 'string') query[key] = [query[key]];
    if (_typeof$1(query[key]) === 'object') query[key].push(value);else query[key] = value;
    return query;
  }, query) : query;
}
function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(base_url)) return null;
  var path = url.pathname.slice(base_url.length);
  if (path === '') {
    path = '/';
  }
  // avoid accidental clashes between server routes and page routes
  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;
  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);
    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}
function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return;
  // check if link is inside an svg
  // in this case, both href and target are always inside an object
  var svg = _typeof$1(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);
  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  }
  // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute
  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;
  // Ignore if <a> has a target
  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href);
  // Don't handle hash changes
  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);
  if (target) {
    var noscroll = a.hasAttribute('sapper:noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();
    _history.pushState({
      id: cid
    }, '', url.href);
  }
}
function which(event) {
  return event.which === null ? event.button : event.which;
}
function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}
function handle_popstate(event) {
  scroll_history[cid] = scroll_state();
  if (event.state) {
    var url = new URL(location.href);
    var _target = select_target(url);
    if (_target) {
      navigate(_target, event.state.id);
    } else {
      // eslint-disable-next-line
      location.href = location.href; // nosonar
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);
    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}
function navigate(dest, id, noscroll, hash) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    var popstate, current_scroll, scroll, deep_linked;
    return regenerator.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          popstate = !!id;
          if (popstate) {
            cid = id;
          } else {
            current_scroll = scroll_state(); // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : {
              x: 0,
              y: 0
            };
          }
          _context.next = 4;
          return handle_target(dest);
        case 4:
          if (document.activeElement && document.activeElement instanceof HTMLElement) document.activeElement.blur();
          if (!noscroll) {
            scroll = scroll_history[id];
            if (hash) {
              // scroll is an element id (from a hash), we need to compute y.
              deep_linked = document.getElementById(hash.slice(1));
              if (deep_linked) {
                scroll = {
                  x: 0,
                  y: deep_linked.getBoundingClientRect().top + scrollY
                };
              }
            }
            scroll_history[cid] = scroll;
            if (scroll && (popstate || deep_linked)) {
              scrollTo(scroll.x, scroll.y);
            } else {
              scrollTo(0, 0);
            }
          }
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
function get_base_uri(window_document) {
  var baseURI = window_document.baseURI;
  if (!baseURI) {
    var baseTags = window_document.getElementsByTagName('base');
    baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
  }
  return baseURI;
}
var prefetching = null;
var mousemove_timeout;
function start() {
  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
}
function prefetch(href) {
  var target = select_target(new URL(href, get_base_uri(document)));
  if (target) {
    if (!prefetching || href !== prefetching.href) {
      prefetching = {
        href: href,
        promise: hydrate_target(target)
      };
    }
    return prefetching.promise;
  }
}
function get_prefetched(target) {
  if (prefetching && prefetching.href === target.href) {
    return prefetching.promise;
  } else {
    return hydrate_target(target);
  }
}
function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (a && a.hasAttribute('sapper:prefetch')) {
    prefetch(a.href);
  }
}
function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}
function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    noscroll: false,
    replaceState: false
  };
  var target = select_target(new URL(href, get_base_uri(document)));
  if (target) {
    var res = navigate(target, null, opts.noscroll);
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);
    return res;
  }
  location.href = href;
  return new Promise(function () {
    /* never resolves */
  });
}
function page_store(value) {
  var store = writable(value);
  var ready = true;
  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run) {
    var old_value;
    return store.subscribe(function (new_value) {
      if (old_value === undefined || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }
  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}
var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(function (value) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
    var dest, token, _yield$hydrate_target, redirect, props, branch;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          $session = value;
          if (ready) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return");
        case 3:
          session_dirty = true;
          dest = select_target(new URL(location.href));
          token = current_token = {};
          _context2.next = 8;
          return hydrate_target(dest);
        case 8:
          _yield$hydrate_target = _context2.sent;
          redirect = _yield$hydrate_target.redirect;
          props = _yield$hydrate_target.props;
          branch = _yield$hydrate_target.branch;
          if (!(token !== current_token)) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return");
        case 14:
          if (!redirect) {
            _context2.next = 19;
            break;
          }
          _context2.next = 17;
          return goto(redirect.location, {
            replaceState: true
          });
        case 17:
          _context2.next = 21;
          break;
        case 19:
          _context2.next = 21;
          return render(branch, props, buildPageContext(props, dest.page));
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
});
var target;
function set_target(node) {
  target = node;
}
function start$1(opts) {
  set_target(opts.target);
  init(initial_data.baseUrl, handle_target$1);
  start();
  if (initial_data.error) {
    return Promise.resolve().then(function () {
      return handle_error();
    });
  }
  return load_current_page();
}
function handle_error() {
  var _location2 = location,
    host = _location2.host,
    pathname = _location2.pathname,
    search = _location2.search;
  var session = initial_data.session,
    preloaded = initial_data.preloaded,
    status = initial_data.status,
    error = initial_data.error;
  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }
  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render([], props, {
    host: host,
    path: pathname,
    query: query,
    params: {},
    error: error
  });
}
function buildPageContext(props, page) {
  var error = props.error;
  return Object.assign({
    error: error
  }, page);
}
function handle_target$1(dest) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
    var hydrating, token, hydrated_target, redirect, props, branch;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (root_component) stores.preloading.set(true);
          hydrating = get_prefetched(dest);
          token = current_token = {};
          _context3.next = 5;
          return hydrating;
        case 5:
          hydrated_target = _context3.sent;
          redirect = hydrated_target.redirect;
          if (!(token !== current_token)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return");
        case 9:
          if (!redirect) {
            _context3.next = 14;
            break;
          }
          _context3.next = 12;
          return goto(redirect.location, {
            replaceState: true
          });
        case 12:
          _context3.next = 17;
          break;
        case 14:
          props = hydrated_target.props, branch = hydrated_target.branch;
          _context3.next = 17;
          return render(branch, props, buildPageContext(props, dest.page));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
}
function render(branch, props, page) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          stores.page.set(page);
          stores.preloading.set(false);
          if (!root_component) {
            _context4.next = 6;
            break;
          }
          root_component.$set(props);
          _context4.next = 13;
          break;
        case 6:
          props.stores = {
            page: {
              subscribe: stores.page.subscribe
            },
            preloading: {
              subscribe: stores.preloading.subscribe
            },
            session: stores.session
          };
          _context4.next = 9;
          return root_preloaded;
        case 9:
          _context4.t0 = _context4.sent;
          props.level0 = {
            props: _context4.t0
          };
          props.notify = stores.page.notify;
          root_component = new App({
            target: target,
            props: props,
            hydrate: true
          });
        case 13:
          current_branch = branch;
          current_query = JSON.stringify(page.query);
          ready = true;
          session_dirty = false;
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
}
function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;
  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}
function hydrate_target(dest) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee6() {
    var _this = this;
    var route, page, segments, _redirect, props, preload_context, root_preload, branch, l, stringified_query, match, segment_dirty;
    return regenerator.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          route = dest.route, page = dest.page;
          segments = page.path.split('/').filter(Boolean);
          _redirect = null;
          props = {
            error: null,
            status: 200,
            segments: [segments[0]]
          };
          preload_context = {
            fetch: function (_fetch) {
              function fetch(_x, _x2) {
                return _fetch.apply(this, arguments);
              }
              fetch.toString = function () {
                return _fetch.toString();
              };
              return fetch;
            }(function (url, opts) {
              return fetch(url, opts);
            }),
            redirect: function redirect(statusCode, location) {
              if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                throw new Error('Conflicting redirects');
              }
              _redirect = {
                statusCode: statusCode,
                location: location
              };
            },
            error: function error(status, _error) {
              props.error = typeof _error === 'string' ? new Error(_error) : _error;
              props.status = status;
            }
          };
          if (!root_preloaded) {
            root_preload = undefined || function () {
              return {};
            };
            root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
              host: page.host,
              path: page.path,
              query: page.query,
              params: {}
            }, $session);
          }
          l = 1;
          _context6.prev = 7;
          stringified_query = JSON.stringify(page.query);
          match = route.pattern.exec(page.path);
          segment_dirty = false;
          _context6.next = 13;
          return Promise.all(route.parts.map(function (part, i) {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
              var segment, j, result, _yield$components$par, component, preload, preloaded;
              return regenerator.wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    segment = segments[i];
                    if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                    props.segments[l] = segments[i + 1]; // TODO make this less confusing
                    if (part) {
                      _context5.next = 5;
                      break;
                    }
                    return _context5.abrupt("return", {
                      segment: segment
                    });
                  case 5:
                    j = l++;
                    if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                      _context5.next = 10;
                      break;
                    }
                    result = current_branch[i];
                    _context5.next = 29;
                    break;
                  case 10:
                    segment_dirty = false;
                    _context5.next = 13;
                    return components[part.i].js();
                  case 13:
                    _yield$components$par = _context5.sent;
                    component = _yield$components$par.default;
                    preload = _yield$components$par.preload;
                    if (!(ready || !initial_data.preloaded[i + 1])) {
                      _context5.next = 27;
                      break;
                    }
                    if (!preload) {
                      _context5.next = 23;
                      break;
                    }
                    _context5.next = 20;
                    return preload.call(preload_context, {
                      host: page.host,
                      path: page.path,
                      query: page.query,
                      params: part.params ? part.params(dest.match) : {}
                    }, $session);
                  case 20:
                    _context5.t0 = _context5.sent;
                    _context5.next = 24;
                    break;
                  case 23:
                    _context5.t0 = {};
                  case 24:
                    preloaded = _context5.t0;
                    _context5.next = 28;
                    break;
                  case 27:
                    preloaded = initial_data.preloaded[i + 1];
                  case 28:
                    result = {
                      component: component,
                      props: preloaded,
                      segment: segment,
                      match: match,
                      part: part.i
                    };
                  case 29:
                    return _context5.abrupt("return", props["level".concat(j)] = result);
                  case 30:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
          }));
        case 13:
          branch = _context6.sent;
          _context6.next = 21;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](7);
          props.error = _context6.t0;
          props.status = 500;
          branch = [];
        case 21:
          return _context6.abrupt("return", {
            redirect: _redirect,
            props: props,
            branch: branch
          });
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[7, 16]]);
  }));
}

start$1({
  target: document.querySelector('#app')
});

export { _typeof$1 as $, _slicedToArray as A, transition_in as B, check_outros as C, update_slot_base as D, get_all_dirty_from_scope as E, get_slot_changes as F, transition_out as G, destroy_each as H, group_outros as I, create_component as J, claim_component as K, mount_component as L, destroy_component as M, toggle_class as N, svg_element as O, claim_svg_element as P, Icon$1 as Q, makeStyleVars as R, SvelteComponentDev as S, _defineProperty as T, listen_dev as U, _setPrototypeOf as V, createEventDispatcher as W, globals as X, prop_dev as Y, _get as Z, _inherits as _, _classCallCheck as a, _hasNext as a$, skipIn as a0, keys as a1, mapWith as a2, transformValues as a3, repeat as a4, ArrowRightCircle$1 as a5, indexValuesWith as a6, pipe as a7, mapValuesWith as a8, objectToKeyValueArray as a9, subscribe as aA, bubble as aB, _ as aC, tick as aD, empty as aE, _asyncToGenerator as aF, compute_slots as aG, component_subscribe as aH, setupResizeObserver as aI, action_destroyer as aJ, binding_callbacks as aK, construct_svelte_component_dev as aL, _screen as aM, onDestroy as aN, StorageIO$1 as aO, NoScript$1 as aP, Switch$1 as aQ, A11yMenu$1 as aR, A11yMenuDriver$1 as aS, ColorCorrection$1 as aT, _a11ySettings as aU, _currentId as aV, _currentSetting as aW, _formatValue as aX, setNextId as aY, setPrevId as aZ, _hasPrev as a_, getKey as aa, pick as ab, partial as ac, __ as ad, zip as ae, set_data_dev as af, regenerator as ag, generic as ah, curry as ai, curryRight as aj, splitBy as ak, filterWith as al, isIterableNotEmpty as am, find as an, hasKeyValue as ao, _toConsumableArray as ap, some as aq, collect as ar, getPath as as, fromPairs as at, reduceWith as au, hasPathValue as av, isClientSide as aw, validate_store as ax, stop_propagation as ay, run_all as az, _assertThisInitialized as b, isIn as b$, updateCurrentValue as b0, mergeDefaultSettings as b1, _groupsResetStatus as b2, _isA11yDirty as b3, resetGroup as b4, _a11yColorStyles as b5, _a11yTextStyles as b6, applyStyles as b7, FontsLoader$1 as b8, getFamily as b9, concat as bA, mergeObj as bB, appendTo as bC, has as bD, last as bE, pullFrom as bF, sort as bG, uniques as bH, is_function as bI, pairs as bJ, makeKeyed as bK, setIn as bL, validate_dynamic_element as bM, validate_void_dynamic_element as bN, set_custom_element_data_map as bO, set_attributes as bP, set_svg_attributes as bQ, isNotNull as bR, updateKey as bS, makeMergeAppliedFnMap as bT, toPx as bU, beforeUpdate as bV, afterUpdate as bW, isIterableEmpty as bX, collectionCompare as bY, always as bZ, index as b_, getFamilies as ba, isFamilyEqualTo as bb, createFontFaces as bc, loadFontFaces as bd, ArrowLeftCircle$1 as be, ChevronLeft$1 as bf, ChevronRight$1 as bg, MinusCircle$1 as bh, PlusCircle$1 as bi, A11yPerson$1 as bj, ScreenSensor$1 as bk, isServerSide as bl, PLATFORM as bm, isPlatformIn as bn, getContext as bo, setContext as bp, set_store_value as bq, writable as br, onMount as bs, null_to_empty as bt, assign as bu, get_spread_update as bv, get_spread_object as bw, readable as bx, add_render_callback as by, add_resize_listener as bz, _createClass as c, groupBy as c$, sortWith as c0, when as c1, validate_each_keys as c2, update_keyed_each as c3, destroy_block as c4, not as c5, set_style as c6, allOf as c7, isGTE as c8, isLTE as c9, add_flush_callback as cA, pluckFrom as cB, flatMap as cC, apply as cD, getLength as cE, sum as cF, pluck as cG, indexBy as cH, transpose as cI, derived as cJ, casus as cK, isNil as cL, getTruthyValuesKeys as cM, joinWithBlank as cN, _arrayWithHoles as cO, _iterableToArray as cP, _unsupportedIterableToArray$2 as cQ, _nonIterableRest as cR, filter as cS, forEach as cT, updatePathIn as cU, setPathIn as cV, updatePath as cW, mapValues as cX, sorter as cY, getAt as cZ, values as c_, adapter as ca, map as cb, reduce as cc, isNotNil as cd, every as ce, hasKey as cf, flatten as cg, findIndexWhere as ch, findLastIndexWhere as ci, slice as cj, identity as ck, get_store_value as cl, isNumber as cm, head as cn, isUndefined as co, range as cp, sorterDesc as cq, zipWithIndex as cr, isKeyValue as cs, difference as ct, union as cu, intersection as cv, pickIn as cw, findIndex as cx, is as cy, bind$1 as cz, dispatch_dev as d, setKey as d0, flatMapWith as d1, isGT as d2, updateKeys as d3, tail as d4, skip as d5, applyFnMap as d6, make as d7, isArray as d8, isObject as d9, negate as da, keyValueArrayToObject as db, makeStyle as dc, _getPrototypeOf as e, _possibleConstructorReturn as f, space as g, element as h, init$2 as i, head_selector as j, detach_dev as k, claim_space as l, claim_element as m, children as n, claim_text as o, attr_dev as p, src_url_equal as q, add_location as r, safe_not_equal as s, text as t, insert_hydration_dev as u, append_hydration_dev as v, noop as w, validate_slots as x, validate_each_argument as y, create_slot as z };

import __inject_styles from './inject_styles.099149d9.js';