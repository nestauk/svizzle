import { A as _slicedToArray, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, v as validate_slots, g as element, t as text, k as claim_element, l as children, m as claim_text, h as detach_dev, n as attr_dev, E as toggle_class, o as add_location, p as insert_dev, r as append_dev, H as listen_dev, u as noop$1, I as bubble, G as set_data_dev, J as empty, K as getContext, L as setContext, M as create_component, N as claim_component, O as mount_component, C as transition_in, D as transition_out, P as destroy_component, f as space, j as claim_space, Q as group_outros, R as check_outros, x as validate_each_argument, z as destroy_each, T as globals, U as null_to_empty, V as createEventDispatcher, W as beforeUpdate, X as afterUpdate, Y as _toConsumableArray, Z as binding_callbacks, $ as validate_each_keys, a0 as svg_element, a1 as is_function, a2 as run_all, a3 as add_render_callback, a4 as add_resize_listener, a5 as update_keyed_each, a6 as destroy_block, a7 as set_style, a8 as validate_store, a9 as component_subscribe, aa as writable, ab as prop_dev, q as query_selector_all, ac as assign, ad as get_spread_update, ae as get_spread_object } from './client.1c097984.js';
import { p as pipe, i as isNotNull, r as reduceWith, g as getKey$3, c as collect, h as head, l as last, a as isUndefined, b as range, d as appendTo, e as sortWith, f as sorterDesc, j as apply, m as make, k as identity, n as mapWith, o as always, q as generic, t as allOf, u as isGTE, v as isLTE, w as partial, _ as __, x as transformer, y as copy, z as initRange, A as ticks, B as format, C as adder, D as noop, E as abs, F as sqrt, G as tau, H as geoStream, I as boundsStream, J as identity$1, K as sin, L as atan2, M as asin, N as cos, O as projection, P as acos, Q as epsilon, R as _defineProperty, S as skipIf, T as isNil, U as pairs$1, V as makeMergeAppliedFnMap, W as index, X as isIn, Y as projectionFn, Z as mercator, $ as getPath, a0 as makeUpdateFeaturesProperty, a1 as topoToGeo, a2 as defaultGeometry, a3 as sort, a4 as adapter, a5 as map, a6 as reduce, a7 as isNotNil, a8 as isIterableNotEmpty, a9 as every, aa as hasKey, ab as flatten, ac as findIndexWhere, ad as findLastIndexWhere, ae as slice, af as uniques, ag as filterWith, ah as concat, ai as mergeObj, aj as linear$1, ak as pullFrom, al as has, am as lookup, an as _, ao as setIn } from './_utils.9d0e9823.js';

/**
* @module @svizzle/utils/[any-any]-[any-boolean]
*/
/**
 * Return a function returning true if the accessed value is not null
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
> isNotNullWith(getValue)({key: 'a', value: 1})
true
 *
 * @version 0.5.0
 */

var isNotNullWith = function isNotNullWith(accessor) {
  return pipe([accessor, isNotNull]);
};

/**
* @module @svizzle/utils/[any-number]:accumcb-[array-number]
*/
/**
 * Return a function expecting an array of objects and returning the max of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMax|arrayMax},
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example

> maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]))
> maxWithAbsSin([-Math.PI/2, -Math.PI/4])
1
> maxWithAbsSin([Math.PI/4, Math.PI/6])
0.7071067811865475

 *
 * @version 0.1.0
 */

var arrayMaxWith = function arrayMaxWith(fn) {
  return reduceWith(function (max, item) {
    var value = fn(item);
    return value > max ? value : max;
  }, -Infinity);
};
/**
 * Return a function expecting an array of objects and returning the min of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMin|arrayMin},
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example
> minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]))
> minWithAbsSin([-Math.PI/2, -Math.PI/4])
0.7071067811865475
> minWithAbsSin([Math.PI/4, Math.PI/6])
0.49999999999999994
 *
 * @version 0.1.0
 */

var arrayMinWith = function arrayMinWith(fn) {
  return reduceWith(function (min, item) {
    var value = fn(item);
    return value < min ? value : min;
  }, Infinity);
};

var justCompare = compare;
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

  if ({}.toString.call(value1) != {}.toString.call(value2)) {
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

  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  } else {
    return compareNativeSubtypes(value1, value2);
  }
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

  var alike = true;

  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }

  return alike;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1).sort();
  var keys2 = Object.keys(value2).sort();
  var len = keys1.length;

  if (len != keys2.length) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];

    if (!(key1 == key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }

  return true;
}

/**
* @module @svizzle/utils/object-any
*/
/**
 * Retrieve the 'key' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.key
 *
 * @example
> getKey({key: 'foo', value: 'bar'})
'foo'
 *
 * @version 0.4.0
 */

var getKey = getKey$3('key');
/**
 * Retrieve the 'value' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.value
 *
 * @example
> getValue({key: 'foo', value: 'bar'})
'bar'
 *
 * @version 0.4.0
 */

var getValue = getKey$3('value');
/**
 * Retrieve the 'values' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.values
 *
 * @example
> getValues({key: 'foo', values: [0, 1, 2, 3]})
[0, 1, 2, 3]
 *
 * @version 0.4.0
 */

var getValues = getKey$3('values');

/**
 * Return an array containing the first and the last element of the provided array.
 *
 * @function
 * @arg {array} array
 * @return {array}
 *
 * @example getFirstAndLast([0, 1, 2, 3, 4]) // [0, 4]
 *
 * @version 0.3.0
 */

var getFirstAndLast = collect([head, last]);
/**
 * Return the range within the provided limits, both limits being included.
 *
 * @function
 * @arg {array} args
 * @arg {number} args.0 - start
 * @arg {number} args.1 - end
 * @arg {number} [args.2 = 1] - step
 * @return {array}
 *
 * @example
> inclusiveRange([2, 5])
[2, 3, 4, 5]
> inclusiveRange([2, 12])
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
> inclusiveRange([2, 12, 2])
[2, 4, 6, 8, 10, 12]
> inclusiveRange([2, 11, 2])
[2, 4, 6, 8, 10];
 *
 * @version 0.7.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#range
 */

var inclusiveRange = function inclusiveRange(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      start = _ref2[0],
      end = _ref2[1],
      _ref2$ = _ref2[2],
      step = _ref2$ === void 0 ? 1 : _ref2$;

  if (start === end) {
    return isUndefined(start) ? [] : [start];
  }

  var range$1 = range(start, end, step);

  return range$1.length === 0 || last(range$1) + step > end ? range$1 : appendTo(range$1, end);
};
/**
 * Return a copy of the provided array with items
 * sorted by `value` (ascending) then by `key` (descending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueAscKeyAsc(items)
[
	{key: 'a', value: -30},
	{key: 'b', value: 1},
	{key: 'a', value: 1},
	{key: 'a', value: 4},
]
 *
 * @version 0.5.0
 */

var sortValueAscKeyDesc = sortWith([getValue, sorterDesc(getKey)]);
/**
 * Return a copy of the provided array with items
 * sorted by `value` (descending) then by `key` (ascending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueDescKeyAsc(items)
[
	{key: 'a', value: 4},
	{key: 'a', value: 1},
	{key: 'b', value: 1},
	{key: 'a', value: -30},
]
 *
 * @version 0.5.0
 */

var sortValueDescKeyAsc = sortWith([sorterDesc(getValue), getKey]);
/**
 * Return a copy of the provided array with items
 * sorted by `value` (descending) then by `key` (descending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueDescKeyDesc(items)
[
	{key: 'a', value: 4},
	{key: 'b', value: 1},
	{key: 'a', value: 1},
	{key: 'a', value: -30},
]
 *
 * @version 0.5.0
 */

var sortValueDescKeyDesc = sortWith([sorterDesc(getValue), sorterDesc(getKey)]);

/**
* @module @svizzle/utils/any-[array-object]
*/
/**
 * Return a function expecting an array of keys and returning an object with the provided value as value of those keys.
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
 * @version 0.3.0
 */

var makeKeyed = function makeKeyed(value) {
  return pipe([collect([identity, mapWith(always(value))]), apply(make)]);
};

/**
* @module @svizzle/utils/array_proto-string
*/
/**
 * Return an string by joining the provided array with the provided separator
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join|Array.prototype.join},
 {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @arg {string} separator
 * @return {string}
 *
 * @example
> join([0, 1, 2], '-')
'0-1-2'
 *
 * @version 0.1.0
 */

var join = generic(Array.prototype.join);

/**
* @module @svizzle/utils/array-[number-boolean]
*/
/**
 * Return a function expecting a number and returning true if the number is within the provided range.
 * Note that the range is inclusive.
 *
 * @function
 * @arg {array} range - Array of two numbers
 * @return {function} predicate - Number -> Boolean
 *
 * @example
> isWithinRange = makeIsWithinRange([0, 5])
> isWithinRange(2)
true
> isWithinRange(5)
true
> isWithinRange(8)
false
 *
 * @version 0.1.0
 */

var makeIsWithinRange = function makeIsWithinRange(range) {
  return allOf([isGTE(range[0]), isLTE(range[1])]);
};

/**
* @module @svizzle/utils/string-[array-string]
*/
/**
 * Return a function expecting an array to join with the provided separator
 * @see
 {@link module:@svizzle/utils/array_proto-string.join|join},
 {@link module:@svizzle/utils/array-string.joinWithColon|joinWithColon},
 {@link module:@svizzle/utils/array-string.joinWithDash|joinWithDash},
 {@link module:@svizzle/utils/array-string.joinWithSemicolon|joinWithSemicolon},
 *
 * @function
 * @arg {string} separator
 * @return {function} - Array -> String
 *
 * @example
> joinWithAt = joinWith('@')
> joinWithAt([0, 1, 2])
'1@2@3'
 *
 * @version 0.1.0
 */

var joinWith = function joinWith(separator) {
  return partial(join, [__, separator]);
};

/**
* @module @svizzle/utils/array-string
*/
/**
 * Return a string joining the provided array items with a colon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithColon(['a', 'b', 'c'])
'a:b:c'
 *
 * @version 0.1.0
 */

var joinWithColon = joinWith(':');
/**
 * Return a string joining the provided array items with a semicolon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithSemicolon(['a', 'b', 'c'])
'a;b;c'
 *
 * @version 0.1.0
 */

var joinWithSemicolon = joinWith(';');

/**
* @module @svizzle/utils/string-[string-string]
*/

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function} - String -> String
 *
 * @example
> prefixed = prepend('prefix')
> prefixed('A')
'prefixA'
> prefixed('B')
'prefixB'
 *
 * @version 0.1.0
 */
var prepend = function prepend(prefix) {
  return function (string) {
    return prefix + string;
  };
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function extent (values, valueof) {
  var min;
  var max;

  if (valueof === undefined) {
    var _iterator = _createForOfIteratorHelper(values),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;

        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var index = -1;

    var _iterator2 = _createForOfIteratorHelper(values),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;

        if ((_value = valueof(_value, ++index, values)) != null) {
          if (min === undefined) {
            if (_value >= _value) min = max = _value;
          } else {
            if (min > _value) min = _value;
            if (max < _value) max = _value;
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return [min, max];
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pairs(values) {
  var pairof = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pair;
  var pairs = [];
  var previous;
  var first = false;

  var _iterator = _createForOfIteratorHelper$1(values),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var value = _step.value;
      if (first) pairs.push(pairof(previous, value));
      previous = value;
      first = true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return pairs;
}
function pair(a, b) {
  return [a, b];
}

function nice (domain, interval) {
  domain = domain.slice();
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
    return Math.pow(base, x);
  };
}

function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
    return Math.log(x) / base;
  });
}

function reflect(f) {
  return function (x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);

    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }

    return scale;
  }

  scale.base = function (_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function (count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;
    if (r = v < u) i = u, u = v, v = i;
    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function (count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

    return function (d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function () {
    return domain(nice(domain(), {
      floor: function floor(x) {
        return pows(Math.floor(logs(x)));
      },
      ceil: function ceil(x) {
        return pows(Math.ceil(logs(x)));
      }
    }));
  };

  return scale;
}
function log() {
  var scale = loggish(transformer()).domain([1, 10]);

  scale.copy = function () {
    return copy(scale, log()).base(scale.base());
  };

  initRange.apply(scale, arguments);
  return scale;
}

var areaSum = adder(),
    areaRingSum = adder(),
    x00,
    y00,
    x0,
    y0;
var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function polygonStart() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function polygonEnd() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function result() {
    var area = areaSum / 2;
    areaSum.reset();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00$1,
    y00$1,
    x0$1,
    y0$1;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function polygonStart() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function polygonEnd() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function result() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$1,
      dy = y - y0$1,
      z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$1 = x, y00$1 = y0$1 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$1,
      dy = y - y0$1,
      z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;
  z = y0$1 * x - x0$1 * y;
  X2 += z * (x0$1 + x);
  Y2 += z * (y0$1 + y);
  Z2 += z * 3;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function pointRadius(_) {
    return this._radius = _, this;
  },
  polygonStart: function polygonStart() {
    this._line = 0;
  },
  polygonEnd: function polygonEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function point(x, y) {
    switch (this._point) {
      case 0:
        {
          this._context.moveTo(x, y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._context.lineTo(x, y);

          break;
        }

      default:
        {
          this._context.moveTo(x + this._radius, y);

          this._context.arc(x, y, this._radius, 0, tau);

          break;
        }
    }
  },
  result: noop
};

var lengthSum = adder(),
    lengthRing,
    x00$2,
    y00$2,
    x0$2,
    y0$2;
var lengthStream = {
  point: noop,
  lineStart: function lineStart() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function lineEnd() {
    if (lengthRing) lengthPoint(x00$2, y00$2);
    lengthStream.point = noop;
  },
  polygonStart: function polygonStart() {
    lengthRing = true;
  },
  polygonEnd: function polygonEnd() {
    lengthRing = null;
  },
  result: function result() {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00$2 = x0$2 = x, y00$2 = y0$2 = y;
}

function lengthPoint(x, y) {
  x0$2 -= x, y0$2 -= y;
  lengthSum.add(sqrt(x0$2 * x0$2 + y0$2 * y0$2));
  x0$2 = x, y0$2 = y;
}

function PathString() {
  this._string = [];
}
PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function pointRadius(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function polygonStart() {
    this._line = 0;
  },
  polygonEnd: function polygonEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function point(x, y) {
    switch (this._point) {
      case 0:
        {
          this._string.push("M", x, ",", y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._string.push("L", x, ",", y);

          break;
        }

      default:
        {
          if (this._circle == null) this._circle = circle(this._radius);

          this._string.push("M", x, ",", y, this._circle);

          break;
        }
    }
  },
  result: function result() {
    if (this._string.length) {
      var result = this._string.join("");

      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}

function geoPath (projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }

    return contextStream.result();
  }

  path.area = function (object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function (object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function (object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function (object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function (_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
  };

  path.context = function (_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function azimuthalRaw(scale) {
  return function (x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [k * cy * sin(x), k * sin(y)];
  };
}
function azimuthalInvert(angle) {
  return function (x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [atan2(x * sc, z * cc), asin(z && y * sc / z)];
  };
}

var azimuthalEqualAreaRaw = azimuthalRaw(function (cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function (z) {
  return 2 * asin(z / 2);
});
function azimuthalEqualArea () {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function (c) {
  return (c = acos(c)) && c / sin(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function (z) {
  return z;
});
function azimuthalEquidistant () {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular () {
  return projection(equirectangularRaw).scale(152.63);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi,
      phi4 = phi2 * phi2;
  return [lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))), phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))];
}

naturalEarth1Raw.invert = function (x, y) {
  var phi = y,
      i = 25,
      delta;

  do {
    var phi2 = phi * phi,
        phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);

  return [x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))), phi];
};

function naturalEarth1 () {
  return projection(naturalEarth1Raw).scale(175.295);
}

var contextKey = {};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte";

function create_fragment(ctx) {
  var div1;
  var div0;
  var t_value = "▶" + "";
  var t;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      t = claim_text(div0_nodes, t_value);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "arrow svelte-1vyml86");
      toggle_class(div0, "expanded",
      /*expanded*/
      ctx[0]);
      add_location(div0, file, 29, 2, 622);
      attr_dev(div1, "class", "container svelte-1vyml86");
      add_location(div1, file, 28, 0, 587);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, t);

      if (!mounted) {
        dispose = listen_dev(div1, "click",
        /*click_handler*/
        ctx[1], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(div0, "expanded",
        /*expanded*/
        ctx[0]);
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      mounted = false;
      dispose();
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
  var expanded = $$props.expanded;
  var writable_props = ["expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONArrow> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONArrow", $$slots, []);

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$props) {
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      expanded: expanded
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [expanded, click_handler];
}

var JSONArrow = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONArrow, _SvelteComponentDev);

  var _super = _createSuper(JSONArrow);

  function JSONArrow(options) {
    var _this;

    _classCallCheck(this, JSONArrow);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      expanded: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONArrow",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*expanded*/
    ctx[0] === undefined && !("expanded" in props)) {
      console.warn("<JSONArrow> was created without expected prop 'expanded'");
    }

    return _this;
  }

  _createClass(JSONArrow, [{
    key: "expanded",
    get: function get() {
      throw new Error("<JSONArrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONArrow;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte"; // (16:0) {#if showKey && key}

function create_if_block(ctx) {
  var label;
  var span;
  var t0;
  var t1;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      label = element("label");
      span = element("span");
      t0 = text(
      /*key*/
      ctx[0]);
      t1 = text(
      /*colon*/
      ctx[2]);
      this.h();
    },
    l: function claim(nodes) {
      label = claim_element(nodes, "LABEL", {
        class: true
      });
      var label_nodes = children(label);
      span = claim_element(label_nodes, "SPAN", {});
      var span_nodes = children(span);
      t0 = claim_text(span_nodes,
      /*key*/
      ctx[0]);
      t1 = claim_text(span_nodes,
      /*colon*/
      ctx[2]);
      span_nodes.forEach(detach_dev);
      label_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$1, 17, 4, 399);
      attr_dev(label, "class", "svelte-1vlbacg");
      toggle_class(label, "spaced",
      /*isParentExpanded*/
      ctx[1]);
      add_location(label, file$1, 16, 2, 346);
    },
    m: function mount(target, anchor) {
      insert_dev(target, label, anchor);
      append_dev(label, span);
      append_dev(span, t0);
      append_dev(span, t1);

      if (!mounted) {
        dispose = listen_dev(label, "click",
        /*click_handler*/
        ctx[5], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*key*/
      1) set_data_dev(t0,
      /*key*/
      ctx[0]);
      if (dirty &
      /*colon*/
      4) set_data_dev(t1,
      /*colon*/
      ctx[2]);

      if (dirty &
      /*isParentExpanded*/
      2) {
        toggle_class(label, "spaced",
        /*isParentExpanded*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(label);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(16:0) {#if showKey && key}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var if_block_anchor;
  var if_block =
  /*showKey*/
  ctx[3] &&
  /*key*/
  ctx[0] && create_if_block(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*showKey*/
      ctx[3] &&
      /*key*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
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
  var key = $$props.key,
      isParentExpanded = $$props.isParentExpanded,
      _$$props$isParentArra = $$props.isParentArray,
      isParentArray = _$$props$isParentArra === void 0 ? false : _$$props$isParentArra,
      _$$props$colon = $$props.colon,
      colon = _$$props$colon === void 0 ? ":" : _$$props$colon;
  var writable_props = ["key", "isParentExpanded", "isParentArray", "colon"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONKey> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONKey", $$slots, []);

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
  };

  $$self.$capture_state = function () {
    return {
      key: key,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      colon: colon,
      showKey: showKey
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
    if ("showKey" in $$props) $$invalidate(3, showKey = $$props.showKey);
  };

  var showKey;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*isParentExpanded, isParentArray, key*/
    19) {
       $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
    }
  };

  return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

var JSONKey = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONKey, _SvelteComponentDev);

  var _super = _createSuper$1(JSONKey);

  function JSONKey(options) {
    var _this;

    _classCallCheck(this, JSONKey);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      key: 0,
      isParentExpanded: 1,
      isParentArray: 4,
      colon: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONKey",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONKey> was created without expected prop 'key'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONKey> was created without expected prop 'isParentExpanded'");
    }

    return _this;
  }

  _createClass(JSONKey, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colon",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONKey;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$2 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[20] = i;
  return child_ctx;
} // (57:4) {#if expandable && isParentExpanded}


function create_if_block_3(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    },
    $$inline: true
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[15]);
  var block = {
    c: function create() {
      create_component(jsonarrow.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonarrow.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonarrow, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(57:4) {#if expandable && isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (75:4) {:else}


function create_else_block(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("…");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, "…");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$2, 75, 6, 2085);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    p: noop$1,
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(75:4) {:else}",
    ctx: ctx
  });
  return block;
} // (63:4) {#if isParentExpanded}


function create_if_block$1(ctx) {
  var ul;
  var t;
  var current;
  var mounted;
  var dispose;
  var each_value =
  /*slicedKeys*/
  ctx[13];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block =
  /*slicedKeys*/
  ctx[13].length <
  /*previewKeys*/
  ctx[7].length && create_if_block_1(ctx);
  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }

      t = claim_space(ul_nodes);
      if (if_block) if_block.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-rwxv37");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
      add_location(ul, file$2, 63, 6, 1589);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }

      append_dev(ul, t);
      if (if_block) if_block.m(ul, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(ul, "click",
        /*expand*/
        ctx[16], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/
      10129) {
        each_value =
        /*slicedKeys*/
        ctx[13];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(ul, t);
          }
        }

        group_outros();

        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }

      if (
      /*slicedKeys*/
      ctx[13].length <
      /*previewKeys*/
      ctx[7].length) {
        if (if_block) ; else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(ul, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(63:4) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (67:10) {#if !expanded && index < previewKeys.length - 1}


function create_if_block_2(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(",");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, ",");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "comma svelte-rwxv37");
      add_location(span, file$2, 67, 12, 1901);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(67:10) {#if !expanded && index < previewKeys.length - 1}",
    ctx: ctx
  });
  return block;
} // (65:8) {#each slicedKeys as key, index}


function create_each_block(ctx) {
  var jsonnode;
  var t;
  var if_block_anchor;
  var current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]),
      isParentExpanded:
      /*expanded*/
      ctx[0],
      isParentArray:
      /*isArray*/
      ctx[4],
      value:
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12])
    },
    $$inline: true
  });
  var if_block = !
  /*expanded*/
  ctx[0] &&
  /*index*/
  ctx[20] <
  /*previewKeys*/
  ctx[7].length - 1 && create_if_block_2(ctx);
  var block = {
    c: function create() {
      create_component(jsonnode.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      claim_component(jsonnode.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert_dev(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var jsonnode_changes = {};
      if (dirty &
      /*getKey, slicedKeys*/
      8448) jsonnode_changes.key =
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]);
      if (dirty &
      /*expanded*/
      1) jsonnode_changes.isParentExpanded =
      /*expanded*/
      ctx[0];
      if (dirty &
      /*isArray*/
      16) jsonnode_changes.isParentArray =
      /*isArray*/
      ctx[4];
      if (dirty &
      /*expanded, getValue, slicedKeys, getPreviewValue*/
      9729) jsonnode_changes.value =
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12]);
      jsonnode.$set(jsonnode_changes);

      if (!
      /*expanded*/
      ctx[0] &&
      /*index*/
      ctx[20] <
      /*previewKeys*/
      ctx[7].length - 1) {
        if (if_block) ; else {
          if_block = create_if_block_2(ctx);
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
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach_dev(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(65:8) {#each slicedKeys as key, index}",
    ctx: ctx
  });
  return block;
} // (71:8) {#if slicedKeys.length < previewKeys.length }


function create_if_block_1(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("…");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, "…");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$2, 71, 10, 2026);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(71:8) {#if slicedKeys.length < previewKeys.length }",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var li;
  var label_1;
  var t0;
  var jsonkey;
  var t1;
  var span1;
  var span0;
  var t2;
  var t3;
  var t4;
  var current_block_type_index;
  var if_block1;
  var t5;
  var span2;
  var t6;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*expandable*/
  ctx[11] &&
  /*isParentExpanded*/
  ctx[2] && create_if_block_3(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[12],
      colon:
      /*context*/
      ctx[14].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3]
    },
    $$inline: true
  });
  jsonkey.$on("click",
  /*toggleExpand*/
  ctx[15]);
  var if_block_creators = [create_if_block$1, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*isParentExpanded*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      li = element("li");
      label_1 = element("label");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span1 = element("span");
      span0 = element("span");
      t2 = text(
      /*label*/
      ctx[1]);
      t3 = text(
      /*bracketOpen*/
      ctx[5]);
      t4 = space();
      if_block1.c();
      t5 = space();
      span2 = element("span");
      t6 = text(
      /*bracketClose*/
      ctx[6]);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      label_1 = claim_element(li_nodes, "LABEL", {
        class: true
      });
      var label_1_nodes = children(label_1);
      if (if_block0) if_block0.l(label_1_nodes);
      t0 = claim_space(label_1_nodes);
      claim_component(jsonkey.$$.fragment, label_1_nodes);
      t1 = claim_space(label_1_nodes);
      span1 = claim_element(label_1_nodes, "SPAN", {});
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", {});
      var span0_nodes = children(span0);
      t2 = claim_text(span0_nodes,
      /*label*/
      ctx[1]);
      span0_nodes.forEach(detach_dev);
      t3 = claim_text(span1_nodes,
      /*bracketOpen*/
      ctx[5]);
      span1_nodes.forEach(detach_dev);
      label_1_nodes.forEach(detach_dev);
      t4 = claim_space(li_nodes);
      if_block1.l(li_nodes);
      t5 = claim_space(li_nodes);
      span2 = claim_element(li_nodes, "SPAN", {});
      var span2_nodes = children(span2);
      t6 = claim_text(span2_nodes,
      /*bracketClose*/
      ctx[6]);
      span2_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span0, file$2, 60, 34, 1504);
      add_location(span1, file$2, 60, 4, 1474);
      attr_dev(label_1, "class", "svelte-rwxv37");
      add_location(label_1, file$2, 55, 2, 1253);
      add_location(span2, file$2, 77, 2, 2112);
      attr_dev(li, "class", "svelte-rwxv37");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[2]);
      add_location(li, file$2, 54, 0, 1214);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, label_1);
      if (if_block0) if_block0.m(label_1, null);
      append_dev(label_1, t0);
      mount_component(jsonkey, label_1, null);
      append_dev(label_1, t1);
      append_dev(label_1, span1);
      append_dev(span1, span0);
      append_dev(span0, t2);
      append_dev(span1, t3);
      append_dev(li, t4);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t5);
      append_dev(li, span2);
      append_dev(span2, t6);
      current = true;

      if (!mounted) {
        dispose = listen_dev(span1, "click",
        /*toggleExpand*/
        ctx[15], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*expandable*/
      ctx[11] &&
      /*isParentExpanded*/
      ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*expandable, isParentExpanded*/
          2052) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(label_1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      4096) jsonkey_changes.key =
      /*key*/
      ctx[12];
      if (dirty &
      /*isParentExpanded*/
      4) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (!current || dirty &
      /*label*/
      2) set_data_dev(t2,
      /*label*/
      ctx[1]);
      if (!current || dirty &
      /*bracketOpen*/
      32) set_data_dev(t3,
      /*bracketOpen*/
      ctx[5]);
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
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        }

        transition_in(if_block1, 1);
        if_block1.m(li, t5);
      }

      if (!current || dirty &
      /*bracketClose*/
      64) set_data_dev(t6,
      /*bracketClose*/
      ctx[6]);

      if (dirty &
      /*isParentExpanded*/
      4) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[2]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
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
  var key = $$props.key,
      keys = $$props.keys,
      _$$props$colon = $$props.colon,
      colon = _$$props$colon === void 0 ? ":" : _$$props$colon,
      _$$props$label = $$props.label,
      label = _$$props$label === void 0 ? "" : _$$props$label,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      _$$props$isArray = $$props.isArray,
      isArray = _$$props$isArray === void 0 ? false : _$$props$isArray,
      bracketOpen = $$props.bracketOpen,
      bracketClose = $$props.bracketClose;
  var _$$props$previewKeys = $$props.previewKeys,
      previewKeys = _$$props$previewKeys === void 0 ? keys : _$$props$previewKeys;
  var _$$props$getKey = $$props.getKey,
      getKey = _$$props$getKey === void 0 ? function (key) {
    return key;
  } : _$$props$getKey;
  var _$$props$getValue = $$props.getValue,
      getValue = _$$props$getValue === void 0 ? function (key) {
    return key;
  } : _$$props$getValue;
  var _$$props$getPreviewVa = $$props.getPreviewValue,
      getPreviewValue = _$$props$getPreviewVa === void 0 ? getValue : _$$props$getPreviewVa;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded,
      _$$props$expandable = $$props.expandable,
      expandable = _$$props$expandable === void 0 ? true : _$$props$expandable;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread(_objectSpread({}, context), {}, {
    colon: colon
  }));

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  function expand() {
    $$invalidate(0, expanded = true);
  }

  var writable_props = ["key", "keys", "colon", "label", "isParentExpanded", "isParentArray", "isArray", "bracketOpen", "bracketClose", "previewKeys", "getKey", "getValue", "getPreviewValue", "expanded", "expandable"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONNested> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONNested", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(12, key = $$props.key);
    if ("keys" in $$props) $$invalidate(17, keys = $$props.keys);
    if ("colon" in $$props) $$invalidate(18, colon = $$props.colon);
    if ("label" in $$props) $$invalidate(1, label = $$props.label);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("isArray" in $$props) $$invalidate(4, isArray = $$props.isArray);
    if ("bracketOpen" in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
    if ("bracketClose" in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
    if ("previewKeys" in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
    if ("getKey" in $$props) $$invalidate(8, getKey = $$props.getKey);
    if ("getValue" in $$props) $$invalidate(9, getValue = $$props.getValue);
    if ("getPreviewValue" in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ("expandable" in $$props) $$invalidate(11, expandable = $$props.expandable);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      contextKey: contextKey,
      JSONArrow: JSONArrow,
      JSONNode: JSONNode,
      JSONKey: JSONKey,
      key: key,
      keys: keys,
      colon: colon,
      label: label,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      isArray: isArray,
      bracketOpen: bracketOpen,
      bracketClose: bracketClose,
      previewKeys: previewKeys,
      getKey: getKey,
      getValue: getValue,
      getPreviewValue: getPreviewValue,
      expanded: expanded,
      expandable: expandable,
      context: context,
      toggleExpand: toggleExpand,
      expand: expand,
      slicedKeys: slicedKeys
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(12, key = $$props.key);
    if ("keys" in $$props) $$invalidate(17, keys = $$props.keys);
    if ("colon" in $$props) $$invalidate(18, colon = $$props.colon);
    if ("label" in $$props) $$invalidate(1, label = $$props.label);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("isArray" in $$props) $$invalidate(4, isArray = $$props.isArray);
    if ("bracketOpen" in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
    if ("bracketClose" in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
    if ("previewKeys" in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
    if ("getKey" in $$props) $$invalidate(8, getKey = $$props.getKey);
    if ("getValue" in $$props) $$invalidate(9, getValue = $$props.getValue);
    if ("getPreviewValue" in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ("expandable" in $$props) $$invalidate(11, expandable = $$props.expandable);
    if ("slicedKeys" in $$props) $$invalidate(13, slicedKeys = $$props.slicedKeys);
  };

  var slicedKeys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*isParentExpanded*/
    4) {
       if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }

    if ($$self.$$.dirty &
    /*expanded, keys, previewKeys*/
    131201) {
       $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
    }
  };

  return [expanded, label, isParentExpanded, isParentArray, isArray, bracketOpen, bracketClose, previewKeys, getKey, getValue, getPreviewValue, expandable, key, slicedKeys, context, toggleExpand, expand, keys, colon];
}

var JSONNested = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONNested, _SvelteComponentDev);

  var _super = _createSuper$2(JSONNested);

  function JSONNested(options) {
    var _this;

    _classCallCheck(this, JSONNested);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      key: 12,
      keys: 17,
      colon: 18,
      label: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      isArray: 4,
      bracketOpen: 5,
      bracketClose: 6,
      previewKeys: 7,
      getKey: 8,
      getValue: 9,
      getPreviewValue: 10,
      expanded: 0,
      expandable: 11
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONNested",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[12] === undefined && !("key" in props)) {
      console.warn("<JSONNested> was created without expected prop 'key'");
    }

    if (
    /*keys*/
    ctx[17] === undefined && !("keys" in props)) {
      console.warn("<JSONNested> was created without expected prop 'keys'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONNested> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONNested> was created without expected prop 'isParentArray'");
    }

    if (
    /*bracketOpen*/
    ctx[5] === undefined && !("bracketOpen" in props)) {
      console.warn("<JSONNested> was created without expected prop 'bracketOpen'");
    }

    if (
    /*bracketClose*/
    ctx[6] === undefined && !("bracketClose" in props)) {
      console.warn("<JSONNested> was created without expected prop 'bracketClose'");
    }

    return _this;
  }

  _createClass(JSONNested, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keys",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colon",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isArray",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bracketOpen",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bracketClose",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "previewKeys",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getKey",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getValue",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getPreviewValue",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expandable",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONNested;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;

function create_fragment$3(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label: "" + (
      /*nodeType*/
      ctx[3] + " "),
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(jsonnested.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonnested.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.previewKeys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*nodeType*/
      8) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + " ");
      jsonnested.$set(jsonnested_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnested, detaching);
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
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType", "expanded"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONObjectNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONObjectNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(7, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      expanded: expanded,
      getValue: getValue,
      keys: keys
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(7, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
    if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
  };

  var keys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    128) {
       $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, expanded, keys, getValue, value];
}

var JSONObjectNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONObjectNode, _SvelteComponentDev);

  var _super = _createSuper$3(JSONObjectNode);

  function JSONObjectNode(options) {
    var _this;

    _classCallCheck(this, JSONObjectNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      key: 0,
      value: 7,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONObjectNode",
      options: options,
      id: create_fragment$3.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[7] === undefined && !("value" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONObjectNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONObjectNode;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1$1 = globals.Object;

function create_fragment$4(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      isArray: true,
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*previewKeys*/
      ctx[6],
      getValue:
      /*getValue*/
      ctx[7],
      label: "Array(" +
      /*value*/
      ctx[1].length + ")",
      bracketOpen: "[",
      bracketClose: "]"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(jsonnested.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonnested.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*previewKeys*/
      64) jsonnested_changes.previewKeys =
      /*previewKeys*/
      ctx[6];
      if (dirty &
      /*value*/
      2) jsonnested_changes.label = "Array(" +
      /*value*/
      ctx[1].length + ")";
      jsonnested.$set(jsonnested_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnested, detaching);
    }
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

function instance$4($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var filteredKey = new Set(["length"]);

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object_1$1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONArrayNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONArrayNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      filteredKey: filteredKey,
      getValue: getValue,
      keys: keys,
      previewKeys: previewKeys
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
    if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
    if ("previewKeys" in $$props) $$invalidate(6, previewKeys = $$props.previewKeys);
  };

  var keys;
  var previewKeys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    2) {
       $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }

    if ($$self.$$.dirty &
    /*keys*/
    32) {
       $$invalidate(6, previewKeys = keys.filter(function (key) {
        return !filteredKey.has(key);
      }));
    }
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, previewKeys, getValue];
}

var JSONArrayNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONArrayNode, _SvelteComponentDev);

  var _super = _createSuper$4(JSONArrayNode);

  function JSONArrayNode(options) {
    var _this;

    _classCallCheck(this, JSONArrayNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONArrayNode",
      options: options,
      id: create_fragment$4.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONArrayNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONArrayNode;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function create_fragment$5(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey$1,
      getValue: getValue$1,
      isArray: true,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(jsonnested.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonnested.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnested, detaching);
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

function getKey$1(key) {
  return String(key[0]);
}

function getValue$1(key) {
  return key[1];
}

function instance$5($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var keys = [];
  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONIterableArrayNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONIterableArrayNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      keys: keys,
      getKey: getKey$1,
      getValue: getValue$1
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("keys" in $$props) $$invalidate(4, keys = $$props.keys);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    32) {
       {
        var result = [];
        var i = 0;

        var _iterator = _createForOfIteratorHelper$2(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            result.push([i++, entry]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

var JSONIterableArrayNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONIterableArrayNode, _SvelteComponentDev);

  var _super = _createSuper$5(JSONIterableArrayNode);

  function JSONIterableArrayNode(options) {
    var _this;

    _classCallCheck(this, JSONIterableArrayNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONIterableArrayNode",
      options: options,
      id: create_fragment$5.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[5] === undefined && !("value" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONIterableArrayNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONIterableArrayNode;
}(SvelteComponentDev);

var MapEntry = function MapEntry(key, value) {
  _classCallCheck(this, MapEntry);

  this.key = key;
  this.value = value;
};

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function create_fragment$6(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey$2,
      getValue: getValue$2,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      colon: "",
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(jsonnested.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonnested.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnested, detaching);
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

function getKey$2(entry) {
  return entry[0];
}

function getValue$2(entry) {
  return entry[1];
}

function instance$6($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var keys = [];
  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONIterableMapNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONIterableMapNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      MapEntry: MapEntry,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      keys: keys,
      getKey: getKey$2,
      getValue: getValue$2
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("keys" in $$props) $$invalidate(4, keys = $$props.keys);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    32) {
       {
        var result = [];
        var i = 0;

        var _iterator = _createForOfIteratorHelper$3(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            result.push([i++, new MapEntry(entry[0], entry[1])]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

var JSONIterableMapNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONIterableMapNode, _SvelteComponentDev);

  var _super = _createSuper$6(JSONIterableMapNode);

  function JSONIterableMapNode(options) {
    var _this;

    _classCallCheck(this, JSONIterableMapNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONIterableMapNode",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[5] === undefined && !("value" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONIterableMapNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONIterableMapNode;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment$7(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      key:
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key,
      keys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label:
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ",
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(jsonnested.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonnested.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*isParentExpanded, key, value*/
      7) jsonnested_changes.key =
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key;
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.label =
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ";
      jsonnested.$set(jsonnested_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnested, detaching);
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

function instance$7($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var keys = ["key", "value"];

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONMapEntryNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONMapEntryNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      keys: keys,
      getValue: getValue
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

var JSONMapEntryNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONMapEntryNode, _SvelteComponentDev);

  var _super = _createSuper$7(JSONMapEntryNode);

  function JSONMapEntryNode(options) {
    var _this;

    _classCallCheck(this, JSONMapEntryNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONMapEntryNode",
      options: options,
      id: create_fragment$7.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONMapEntryNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONMapEntryNode;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte";

function create_fragment$8(ctx) {
  var li;
  var jsonkey;
  var t0;
  var span;
  var t1_value = (
  /*valueGetter*/
  ctx[2] ?
  /*valueGetter*/
  ctx[2](
  /*value*/
  ctx[1]) :
  /*value*/
  ctx[1]) + "";
  var t1;
  var span_class_value;
  var current;
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[0],
      colon:
      /*colon*/
      ctx[6],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      claim_component(jsonkey.$$.fragment, li_nodes);
      t0 = claim_space(li_nodes);
      span = claim_element(li_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, t1_value);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"));
      add_location(span, file$3, 47, 2, 948);
      attr_dev(li, "class", "svelte-3bjyvl");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
      add_location(li, file$3, 45, 0, 846);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      mount_component(jsonkey, li, null);
      append_dev(li, t0);
      append_dev(li, span);
      append_dev(span, t1);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      1) jsonkey_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*valueGetter, value*/
      6) && t1_value !== (t1_value = (
      /*valueGetter*/
      ctx[2] ?
      /*valueGetter*/
      ctx[2](
      /*value*/
      ctx[1]) :
      /*value*/
      ctx[1]) + "")) set_data_dev(t1, t1_value);

      if (!current || dirty &
      /*nodeType*/
      32 && span_class_value !== (span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"))) {
        attr_dev(span, "class", span_class_value);
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      destroy_component(jsonkey);
    }
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
  var key = $$props.key,
      value = $$props.value,
      _$$props$valueGetter = $$props.valueGetter,
      valueGetter = _$$props$valueGetter === void 0 ? null : _$$props$valueGetter,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;

  var _getContext = getContext(contextKey),
      colon = _getContext.colon;

  var writable_props = ["key", "value", "valueGetter", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONValueNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONValueNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      contextKey: contextKey,
      JSONKey: JSONKey,
      key: key,
      value: value,
      valueGetter: valueGetter,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      colon: colon
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

var JSONValueNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONValueNode, _SvelteComponentDev);

  var _super = _createSuper$8(JSONValueNode);

  function JSONValueNode(options) {
    var _this;

    _classCallCheck(this, JSONValueNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      key: 0,
      value: 1,
      valueGetter: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      nodeType: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONValueNode",
      options: options,
      id: create_fragment$8.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[3] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[4] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[5] === undefined && !("nodeType" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONValueNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "valueGetter",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONValueNode;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$4 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
} // (40:2) {#if isParentExpanded}


function create_if_block_2$1(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    },
    $$inline: true
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[7]);
  var block = {
    c: function create() {
      create_component(jsonarrow.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(jsonarrow.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonarrow, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(40:2) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (45:2) {#if isParentExpanded}


function create_if_block$2(ctx) {
  var ul;
  var current;
  var if_block =
  /*expanded*/
  ctx[0] && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      ul = element("ul");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      if (if_block) if_block.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-1ca3gb2");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
      add_location(ul, file$4, 45, 4, 1134);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);
      if (if_block) if_block.m(ul, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*expanded*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*expanded*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(ul, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
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
      if (detaching) detach_dev(ul);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(45:2) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (47:6) {#if expanded}


function create_if_block_1$1(ctx) {
  var jsonnode;
  var t0;
  var li;
  var jsonkey;
  var t1;
  var span;
  var current;
  jsonnode = new JSONNode({
    props: {
      key: "message",
      value:
      /*value*/
      ctx[2].message
    },
    $$inline: true
  });
  jsonkey = new JSONKey({
    props: {
      key: "stack",
      colon: ":",
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3]
    },
    $$inline: true
  });
  var each_value =
  /*stack*/
  ctx[5];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      create_component(jsonnode.$$.fragment);
      t0 = space();
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      claim_component(jsonnode.$$.fragment, nodes);
      t0 = claim_space(nodes);
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      claim_component(jsonkey.$$.fragment, li_nodes);
      t1 = claim_space(li_nodes);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(span_nodes);
      }

      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$4, 50, 10, 1330);
      attr_dev(li, "class", "svelte-1ca3gb2");
      add_location(li, file$4, 48, 8, 1252);
    },
    m: function mount(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, li, anchor);
      mount_component(jsonkey, li, null);
      append_dev(li, t1);
      append_dev(li, span);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(span, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      var jsonnode_changes = {};
      if (dirty &
      /*value*/
      4) jsonnode_changes.value =
      /*value*/
      ctx[2].message;
      jsonnode.$set(jsonnode_changes);
      var jsonkey_changes = {};
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);

      if (dirty &
      /*stack*/
      32) {
        each_value =
        /*stack*/
        ctx[5];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(span, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnode.$$.fragment, local);
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(li);
      destroy_component(jsonkey);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(47:6) {#if expanded}",
    ctx: ctx
  });
  return block;
} // (52:12) {#each stack as line, index}


function create_each_block$1(ctx) {
  var span;
  var t_value =
  /*line*/
  ctx[8] + "";
  var t;
  var br;
  var block = {
    c: function create() {
      span = element("span");
      t = text(t_value);
      br = element("br");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      br = claim_element(nodes, "BR", {});
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-1ca3gb2");
      toggle_class(span, "indent",
      /*index*/
      ctx[10] > 0);
      add_location(span, file$4, 52, 14, 1392);
      add_location(br, file$4, 52, 58, 1436);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
      insert_dev(target, br, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*stack*/
      32 && t_value !== (t_value =
      /*line*/
      ctx[8] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (detaching) detach_dev(br);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(52:12) {#each stack as line, index}",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var li;
  var t0;
  var jsonkey;
  var t1;
  var span;
  var t2;
  var t3_value = (
  /*expanded*/
  ctx[0] ? "" :
  /*value*/
  ctx[2].message) + "";
  var t3;
  var t4;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*isParentExpanded*/
  ctx[3] && create_if_block_2$1(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[1],
      colon:
      /*context*/
      ctx[6].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    },
    $$inline: true
  });
  var if_block1 =
  /*isParentExpanded*/
  ctx[3] && create_if_block$2(ctx);
  var block = {
    c: function create() {
      li = element("li");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");
      t2 = text("Error: ");
      t3 = text(t3_value);
      t4 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      if (if_block0) if_block0.l(li_nodes);
      t0 = claim_space(li_nodes);
      claim_component(jsonkey.$$.fragment, li_nodes);
      t1 = claim_space(li_nodes);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      t2 = claim_text(span_nodes, "Error: ");
      t3 = claim_text(span_nodes, t3_value);
      span_nodes.forEach(detach_dev);
      t4 = claim_space(li_nodes);
      if (if_block1) if_block1.l(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$4, 43, 2, 1033);
      attr_dev(li, "class", "svelte-1ca3gb2");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
      add_location(li, file$4, 38, 0, 831);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if (if_block0) if_block0.m(li, null);
      append_dev(li, t0);
      mount_component(jsonkey, li, null);
      append_dev(li, t1);
      append_dev(li, span);
      append_dev(span, t2);
      append_dev(span, t3);
      append_dev(li, t4);
      if (if_block1) if_block1.m(li, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(span, "click",
        /*toggleExpand*/
        ctx[7], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(li, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      2) jsonkey_changes.key =
      /*key*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*expanded, value*/
      5) && t3_value !== (t3_value = (
      /*expanded*/
      ctx[0] ? "" :
      /*value*/
      ctx[2].message) + "")) set_data_dev(t3, t3_value);

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
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

function instance$9($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread$1(_objectSpread$1({}, context), {}, {
    colon: ":"
  }));

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ErrorNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ErrorNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(1, key = $$props.key);
    if ("value" in $$props) $$invalidate(2, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      contextKey: contextKey,
      JSONArrow: JSONArrow,
      JSONNode: JSONNode,
      JSONKey: JSONKey,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      context: context,
      toggleExpand: toggleExpand,
      stack: stack
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(1, key = $$props.key);
    if ("value" in $$props) $$invalidate(2, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ("stack" in $$props) $$invalidate(5, stack = $$props.stack);
  };

  var stack;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    4) {
       $$invalidate(5, stack = value.stack.split("\n"));
    }

    if ($$self.$$.dirty &
    /*isParentExpanded*/
    8) {
       if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
  };

  return [expanded, key, value, isParentExpanded, isParentArray, stack, context, toggleExpand];
}

var ErrorNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ErrorNode, _SvelteComponentDev);

  var _super = _createSuper$9(ErrorNode);

  function ErrorNode(options) {
    var _this;

    _classCallCheck(this, ErrorNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      key: 1,
      value: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      expanded: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ErrorNode",
      options: options,
      id: create_fragment$9.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[1] === undefined && !("key" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[2] === undefined && !("value" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[3] === undefined && !("isParentExpanded" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[4] === undefined && !("isParentArray" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(ErrorNode, [{
    key: "key",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ErrorNode;
}(SvelteComponentDev);

function objType(obj) {
  var type = Object.prototype.toString.call(obj).slice(8, -1);

  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }

    return obj.constructor.name;
  }

  return type;
}

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment$a(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_value =
  /*componentType*/
  ctx[5];

  function switch_props(ctx) {
    return {
      props: {
        key:
        /*key*/
        ctx[0],
        value:
        /*value*/
        ctx[1],
        isParentExpanded:
        /*isParentExpanded*/
        ctx[2],
        isParentArray:
        /*isParentArray*/
        ctx[3],
        nodeType:
        /*nodeType*/
        ctx[4],
        valueGetter:
        /*valueGetter*/
        ctx[6]
      },
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
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
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = {};
      if (dirty &
      /*key*/
      1) switch_instance_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) switch_instance_changes.value =
      /*value*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      4) switch_instance_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) switch_instance_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*nodeType*/
      16) switch_instance_changes.nodeType =
      /*nodeType*/
      ctx[4];
      if (dirty &
      /*valueGetter*/
      64) switch_instance_changes.valueGetter =
      /*valueGetter*/
      ctx[6];

      if (switch_value !== (switch_value =
      /*componentType*/
      ctx[5])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
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
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;

  function getComponent(nodeType) {
    switch (nodeType) {
      case "Object":
        return JSONObjectNode;

      case "Error":
        return ErrorNode;

      case "Array":
        return JSONArrayNode;

      case "Iterable":
      case "Map":
      case "Set":
        return typeof value.set === "function" ? JSONIterableMapNode : JSONIterableArrayNode;

      case "MapEntry":
        return JSONMapEntryNode;

      default:
        return JSONValueNode;
    }
  }

  function getValueGetter(nodeType) {
    switch (nodeType) {
      case "Object":
      case "Error":
      case "Array":
      case "Iterable":
      case "Map":
      case "Set":
      case "MapEntry":
      case "Number":
        return undefined;

      case "String":
        return function (raw) {
          return "\"".concat(raw, "\"");
        };

      case "Boolean":
        return function (raw) {
          return raw ? "true" : "false";
        };

      case "Date":
        return function (raw) {
          return raw.toISOString();
        };

      case "Null":
        return function () {
          return "null";
        };

      case "Undefined":
        return function () {
          return "undefined";
        };

      case "Function":
      case "Symbol":
        return function (raw) {
          return raw.toString();
        };

      default:
        return function () {
          return "<".concat(nodeType, ">");
        };
    }
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
  };

  $$self.$capture_state = function () {
    return {
      JSONObjectNode: JSONObjectNode,
      JSONArrayNode: JSONArrayNode,
      JSONIterableArrayNode: JSONIterableArrayNode,
      JSONIterableMapNode: JSONIterableMapNode,
      JSONMapEntryNode: JSONMapEntryNode,
      JSONValueNode: JSONValueNode,
      ErrorNode: ErrorNode,
      objType: objType,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      getComponent: getComponent,
      getValueGetter: getValueGetter,
      nodeType: nodeType,
      componentType: componentType,
      valueGetter: valueGetter
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(4, nodeType = $$props.nodeType);
    if ("componentType" in $$props) $$invalidate(5, componentType = $$props.componentType);
    if ("valueGetter" in $$props) $$invalidate(6, valueGetter = $$props.valueGetter);
  };

  var nodeType;
  var componentType;
  var valueGetter;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    2) {
       $$invalidate(4, nodeType = objType(value));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
       $$invalidate(5, componentType = getComponent(nodeType));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
       $$invalidate(6, valueGetter = getValueGetter(nodeType));
    }
  };

  return [key, value, isParentExpanded, isParentArray, nodeType, componentType, valueGetter];
}

var JSONNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONNode, _SvelteComponentDev);

  var _super = _createSuper$a(JSONNode);

  function JSONNode(options) {
    var _this;

    _classCallCheck(this, JSONNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONNode",
      options: options,
      id: create_fragment$a.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONNode;
}(SvelteComponentDev);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte";

function create_fragment$b(ctx) {
  var ul;
  var jsonnode;
  var current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*key*/
      ctx[0],
      value:
      /*value*/
      ctx[1],
      isParentExpanded: true,
      isParentArray: false
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      ul = element("ul");
      create_component(jsonnode.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      claim_component(jsonnode.$$.fragment, ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-773n60");
      add_location(ul, file$5, 37, 0, 1295);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);
      mount_component(jsonnode, ul, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnode_changes = {};
      if (dirty &
      /*key*/
      1) jsonnode_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) jsonnode_changes.value =
      /*value*/
      ctx[1];
      jsonnode.$set(jsonnode_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_component(jsonnode);
    }
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

function instance$b($$self, $$props, $$invalidate) {
  setContext(contextKey, {});
  var _$$props$key = $$props.key,
      key = _$$props$key === void 0 ? "" : _$$props$key,
      value = $$props.value;
  var writable_props = ["key", "value"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Root> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Root", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  $$self.$capture_state = function () {
    return {
      JSONNode: JSONNode,
      setContext: setContext,
      contextKey: contextKey,
      key: key,
      value: value
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [key, value];
}

var Root = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Root, _SvelteComponentDev);

  var _super = _createSuper$b(Root);

  function Root(options) {
    var _this;

    _classCallCheck(this, Root);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      key: 0,
      value: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Root",
      options: options,
      id: create_fragment$b.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<Root> was created without expected prop 'value'");
    }

    return _this;
  }

  _createClass(Root, [{
    key: "key",
    get: function get() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Root;
}(SvelteComponentDev);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "src/node_modules/app/components/Elements.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i].tag;
  child_ctx[2] = list[i].content;
  return child_ctx;
} // (8:25) 


function create_if_block_1$2(ctx) {
  var pre;
  var t_value =
  /*content*/
  ctx[2] + "";
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
      add_location(pre, file$6, 8, 2, 143);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*elements*/
      1 && t_value !== (t_value =
      /*content*/
      ctx[2] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(8:25) ",
    ctx: ctx
  });
  return block;
} // (6:1) {#if tag === 'p'}


function create_if_block$3(ctx) {
  var p;
  var t_value =
  /*content*/
  ctx[2] + "";
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p, file$6, 6, 2, 98);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*elements*/
      1 && t_value !== (t_value =
      /*content*/
      ctx[2] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(6:1) {#if tag === 'p'}",
    ctx: ctx
  });
  return block;
} // (5:0) {#each elements as {tag, content}}


function create_each_block$2(ctx) {
  var if_block_anchor;

  function select_block_type(ctx, dirty) {
    if (
    /*tag*/
    ctx[1] === "p") return create_if_block$3;
    if (
    /*tag*/
    ctx[1] === "pre") return create_if_block_1$2;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type && current_block_type(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if (if_block) if_block.d(1);
        if_block = current_block_type && current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d: function destroy(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }

      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(5:0) {#each elements as {tag, content}}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var each_1_anchor;
  var each_value =
  /*elements*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
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

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*elements*/
      1) {
        each_value =
        /*elements*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$2(child_ctx);

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
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
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

function instance$c($$self, $$props, $$invalidate) {
  var elements = $$props.elements;
  var writable_props = ["elements"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Elements> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Elements", $$slots, []);

  $$self.$set = function ($$props) {
    if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
  };

  $$self.$capture_state = function () {
    return {
      elements: elements
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [elements];
}

var Elements = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Elements, _SvelteComponentDev);

  var _super = _createSuper$c(Elements);

  function Elements(options) {
    var _this;

    _classCallCheck(this, Elements);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      elements: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Elements",
      options: options,
      id: create_fragment$c.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*elements*/
    ctx[0] === undefined && !("elements" in props)) {
      console.warn("<Elements> was created without expected prop 'elements'");
    }

    return _this;
  }

  _createClass(Elements, [{
    key: "elements",
    get: function get() {
      throw new Error("<Elements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Elements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Elements;
}(SvelteComponentDev);

function linear(domain, range) {
  var d0 = domain[0];
  var r0 = range[0];
  var m = (range[1] - r0) / (domain[1] - d0);
  return Object.assign(function (num) {
    return r0 + (num - d0) * m;
  }, {
    inverse: function inverse() {
      return linear(range, domain);
    }
  });
} // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

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
 * @version 0.1.0
 */

var makeStyle = pipe([skipIf(isNil), pairs$1, mapWith(joinWithColon), joinWithSemicolon]);
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
 * @version 0.4.0
 */

var makeStyleVars = pipe([skipIf(isNil), pairs$1, mapWith(pipe([joinWithColon, prepend('--')])), joinWithSemicolon]);
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
 * @version 0.1.0
 */

var toPx = function toPx(number) {
  return "".concat(number, "px");
};

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte";

function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[55] = list[i].color;
  child_ctx[56] = list[i].dasharray;
  child_ctx[57] = list[i].linewidth;
  child_ctx[58] = list[i].valueX;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[61] = list[i].barColor;
  child_ctx[62] = list[i].bkgColor;
  child_ctx[63] = list[i].deselected;
  child_ctx[64] = list[i].displayValue;
  child_ctx[65] = list[i].dxKey;
  child_ctx[66] = list[i].isNeg;
  child_ctx[67] = list[i].key;
  child_ctx[68] = list[i].label;
  child_ctx[58] = list[i].x;
  child_ctx[69] = list[i].xValue;
  child_ctx[71] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[55] = list[i].color;
  child_ctx[56] = list[i].dasharray;
  child_ctx[72] = list[i].isRight;
  child_ctx[68] = list[i].label;
  child_ctx[57] = list[i].linewidth;
  child_ctx[73] = list[i].rectWidth;
  child_ctx[74] = list[i].textLength;
  child_ctx[75] = list[i].textX;
  child_ctx[76] = list[i].valueX;
  child_ctx[58] = list[i].x;
  child_ctx[77] = list[i].y;
  return child_ctx;
} // (235:1) {#if title}


function create_if_block_4(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[6]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*title*/
      ctx[6]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1octkco");
      add_location(h2, file$7, 236, 2, 5666);
      attr_dev(header, "class", "svelte-1octkco");
      add_location(header, file$7, 235, 1, 5655);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      append_dev(header, h2);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*title*/
      64) set_data_dev(t,
      /*title*/
      ctx[6]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(235:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (247:2) {:else}


function create_else_block$1(ctx) {
  var t;
  var div;
  var svg;
  var rect;
  var g;
  var each_blocks = [];
  var each_1_lookup = new Map();
  var if_block1_anchor;
  var div_resize_listener;
  var mounted;
  var dispose;
  var if_block0 =
  /*refs*/
  ctx[4].length && create_if_block_3$1(ctx);
  var each_value_1 =
  /*bars*/
  ctx[19];
  validate_each_argument(each_value_1);

  var get_key = function get_key(ctx) {
    return (
      /*key*/
      ctx[67]
    );
  };

  validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

  for (var i = 0; i < each_value_1.length; i += 1) {
    var child_ctx = get_each_context_1(ctx, each_value_1, i);
    var key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
  }

  var if_block1 =
  /*crossesZero*/
  ctx[17] && create_if_block_2$2(ctx);
  var if_block2 =
  /*refsLayout*/
  ctx[21] && create_if_block_1$3(ctx);
  var block = {
    c: function create() {
      if (if_block0) if_block0.c();
      t = space();
      div = element("div");
      svg = svg_element("svg");
      rect = svg_element("rect");
      g = svg_element("g");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      if (if_block2) if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        width: true,
        height: true
      }, 1);
      var svg_nodes = children(svg);
      rect = claim_element(svg_nodes, "rect", {
        class: true,
        width: true,
        height: true
      }, 1);
      children(rect).forEach(detach_dev);
      g = claim_element(svg_nodes, "g", {}, 1);
      var g_nodes = children(g);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(g_nodes);
      }

      g_nodes.forEach(detach_dev);
      if (if_block1) if_block1.l(svg_nodes);
      if_block1_anchor = empty();
      if (if_block2) if_block2.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-1octkco");
      attr_dev(rect, "width",
      /*width*/
      ctx[9]);
      attr_dev(rect, "height",
      /*svgHeight*/
      ctx[16]);
      add_location(rect, file$7, 303, 4, 6897);
      add_location(g, file$7, 306, 4, 6968);
      attr_dev(svg, "width",
      /*width*/
      ctx[9]);
      attr_dev(svg, "height",
      /*svgHeight*/
      ctx[16]);
      add_location(svg, file$7, 302, 3, 6860);
      attr_dev(div, "class", "scrollable svelte-1octkco");
      add_render_callback(function () {
        return (
          /*div_elementresize_handler*/
          ctx[35].call(div)
        );
      });
      toggle_class(div, "withrefs",
      /*refs*/
      ctx[4] &&
      /*refs*/
      ctx[4].length);
      add_location(div, file$7, 294, 2, 6657);
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_dev(target, t, anchor);
      insert_dev(target, div, anchor);
      append_dev(div, svg);
      append_dev(svg, rect);
      append_dev(svg, g);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g, null);
      }

      if (if_block1) if_block1.m(svg, null);
      append_dev(svg, if_block1_anchor);
      if (if_block2) if_block2.m(svg, null);
      div_resize_listener = add_resize_listener(div,
      /*div_elementresize_handler*/
      ctx[35].bind(div));
      /*div_binding*/

      ctx[36](div);

      if (!mounted) {
        dispose = listen_dev(div, "mouseleave",
        /*mouseleave_handler*/
        ctx[37], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*refs*/
      ctx[4].length) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty[0] &
      /*width*/
      512) {
        attr_dev(rect, "width",
        /*width*/
        ctx[9]);
      }

      if (dirty[0] &
      /*svgHeight*/
      65536) {
        attr_dev(rect, "height",
        /*svgHeight*/
        ctx[16]);
      }

      if (dirty[0] &
      /*itemHeight, bars, isInteractive, onClick, onMouseenter, onMouseleave, textY, x0, barHeight, barY, width*/
      30204419) {
        var _each_value_ =
        /*bars*/
        ctx[19];
        validate_each_argument(_each_value_);
        validate_each_keys(ctx, _each_value_, get_each_context_1, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value_, each_1_lookup, g, destroy_block, create_each_block_1, null, get_each_context_1);
      }

      if (
      /*crossesZero*/
      ctx[17]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$2(ctx);
          if_block1.c();
          if_block1.m(svg, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (
      /*refsLayout*/
      ctx[21]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1$3(ctx);
          if_block2.c();
          if_block2.m(svg, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (dirty[0] &
      /*width*/
      512) {
        attr_dev(svg, "width",
        /*width*/
        ctx[9]);
      }

      if (dirty[0] &
      /*svgHeight*/
      65536) {
        attr_dev(svg, "height",
        /*svgHeight*/
        ctx[16]);
      }

      if (dirty[0] &
      /*refs*/
      16) {
        toggle_class(div, "withrefs",
        /*refs*/
        ctx[4] &&
        /*refs*/
        ctx[4].length);
      }
    },
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div);

      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].d();
      }

      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      div_resize_listener();
      /*div_binding*/

      ctx[36](null);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(247:2) {:else}",
    ctx: ctx
  });
  return block;
} // (241:2) {#if items.length === 0}


function create_if_block$4(ctx) {
  var div;
  var span;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      span = element("span");
      t = text(
      /*message*/
      ctx[3]);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes,
      /*message*/
      ctx[3]);
      span_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-1octkco");
      add_location(span, file$7, 243, 3, 5786);
      attr_dev(div, "class", "message svelte-1octkco");
      add_location(div, file$7, 242, 2, 5761);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, span);
      append_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*message*/
      8) set_data_dev(t,
      /*message*/
      ctx[3]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(241:2) {#if items.length === 0}",
    ctx: ctx
  });
  return block;
} // (250:2) {#if refs.length}


function create_if_block_3$1(ctx) {
  var div;
  var svg;
  var each_value_2 =
  /*refsLayout*/
  ctx[21];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        width: true,
        height: true
      }, 1);
      var svg_nodes = children(svg);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(svg_nodes);
      }

      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[9]);
      attr_dev(svg, "height",
      /*refsHeight*/
      ctx[12]);
      add_location(svg, file$7, 251, 3, 5896);
      attr_dev(div, "class", "refs svelte-1octkco");
      add_location(div, file$7, 250, 2, 5874);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, svg);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(svg, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*refsLayout, theme, refHeight, refsHeight*/
      3149856) {
        each_value_2 =
        /*refsLayout*/
        ctx[21];
        validate_each_argument(each_value_2);

        var _i8;

        for (_i8 = 0; _i8 < each_value_2.length; _i8 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_2(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(svg, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_2.length;
      }

      if (dirty[0] &
      /*width*/
      512) {
        attr_dev(svg, "width",
        /*width*/
        ctx[9]);
      }

      if (dirty[0] &
      /*refsHeight*/
      4096) {
        attr_dev(svg, "height",
        /*refsHeight*/
        ctx[12]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(250:2) {#if refs.length}",
    ctx: ctx
  });
  return block;
} // (253:4) {#each refsLayout as {      color,      dasharray,      isRight,      label,      linewidth,      rectWidth,      textLength,      textX,      valueX,      x,      y,     }}


function create_each_block_2(ctx) {
  var g;
  var rect;
  var rect_x_value;
  var rect_width_value;
  var text_1;
  var t_value =
  /*label*/
  ctx[68] + "";
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var text_1_textLength_value;
  var line;
  var line_stroke_value;
  var line_stroke_dasharray_value;
  var line_stroke_width_value;
  var line_y__value;
  var g_transform_value;
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      text_1 = svg_element("text");
      t = text(t_value);
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        x: true,
        width: true,
        height: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      text_1 = claim_element(g_nodes, "text", {
        x: true,
        y: true,
        textLength: true,
        class: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      line = claim_element(g_nodes, "line", {
        class: true,
        stroke: true,
        "stroke-dasharray": true,
        "stroke-width": true,
        y1: true,
        y2: true
      }, 1);
      children(line).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "x", rect_x_value =
      /*x*/
      ctx[58]);
      attr_dev(rect, "width", rect_width_value =
      /*rectWidth*/
      ctx[73]);
      attr_dev(rect, "height",
      /*refHeight*/
      ctx[20]);
      attr_dev(rect, "class", "svelte-1octkco");
      add_location(rect, file$7, 269, 5, 6185);
      attr_dev(text_1, "x", text_1_x_value =
      /*textX*/
      ctx[75]);
      attr_dev(text_1, "y", text_1_y_value =
      /*refHeight*/
      ctx[20] / 2);
      attr_dev(text_1, "textLength", text_1_textLength_value =
      /*textLength*/
      ctx[74]);
      attr_dev(text_1, "class", "svelte-1octkco");
      toggle_class(text_1, "right",
      /*isRight*/
      ctx[72]);
      add_location(text_1, file$7, 274, 5, 6263);
      attr_dev(line, "class", "ref");
      attr_dev(line, "stroke", line_stroke_value =
      /*color*/
      ctx[55] ||
      /*theme*/
      ctx[5].refColor);
      attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value =
      /*dasharray*/
      ctx[56] ||
      /*theme*/
      ctx[5].refDasharray);
      attr_dev(line, "stroke-width", line_stroke_width_value =
      /*linewidth*/
      ctx[57] ||
      /*theme*/
      ctx[5].refWidth);
      attr_dev(line, "y1",
      /*refHeight*/
      ctx[20]);
      attr_dev(line, "y2", line_y__value =
      /*refsHeight*/
      ctx[12] -
      /*y*/
      ctx[77]);
      add_location(line, file$7, 280, 5, 6382);
      attr_dev(g, "class", "ref svelte-1octkco");
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*valueX*/
      ctx[76] + ", " +
      /*y*/
      ctx[77] + ")");
      add_location(g, file$7, 265, 4, 6112);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, rect);
      append_dev(g, text_1);
      append_dev(text_1, t);
      append_dev(g, line);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*refsLayout*/
      2097152 && rect_x_value !== (rect_x_value =
      /*x*/
      ctx[58])) {
        attr_dev(rect, "x", rect_x_value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && rect_width_value !== (rect_width_value =
      /*rectWidth*/
      ctx[73])) {
        attr_dev(rect, "width", rect_width_value);
      }

      if (dirty[0] &
      /*refHeight*/
      1048576) {
        attr_dev(rect, "height",
        /*refHeight*/
        ctx[20]);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && t_value !== (t_value =
      /*label*/
      ctx[68] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*refsLayout*/
      2097152 && text_1_x_value !== (text_1_x_value =
      /*textX*/
      ctx[75])) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*refHeight*/
      1048576 && text_1_y_value !== (text_1_y_value =
      /*refHeight*/
      ctx[20] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && text_1_textLength_value !== (text_1_textLength_value =
      /*textLength*/
      ctx[74])) {
        attr_dev(text_1, "textLength", text_1_textLength_value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152) {
        toggle_class(text_1, "right",
        /*isRight*/
        ctx[72]);
      }

      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_value !== (line_stroke_value =
      /*color*/
      ctx[55] ||
      /*theme*/
      ctx[5].refColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_dasharray_value !== (line_stroke_dasharray_value =
      /*dasharray*/
      ctx[56] ||
      /*theme*/
      ctx[5].refDasharray)) {
        attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
      }

      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_width_value !== (line_stroke_width_value =
      /*linewidth*/
      ctx[57] ||
      /*theme*/
      ctx[5].refWidth)) {
        attr_dev(line, "stroke-width", line_stroke_width_value);
      }

      if (dirty[0] &
      /*refHeight*/
      1048576) {
        attr_dev(line, "y1",
        /*refHeight*/
        ctx[20]);
      }

      if (dirty[0] &
      /*refsHeight, refsLayout*/
      2101248 && line_y__value !== (line_y__value =
      /*refsHeight*/
      ctx[12] -
      /*y*/
      ctx[77])) {
        attr_dev(line, "y2", line_y__value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && g_transform_value !== (g_transform_value = "translate(" +
      /*valueX*/
      ctx[76] + ", " +
      /*y*/
      ctx[77] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(253:4) {#each refsLayout as {      color,      dasharray,      isRight,      label,      linewidth,      rectWidth,      textLength,      textX,      valueX,      x,      y,     }}",
    ctx: ctx
  });
  return block;
} // (308:5) {#each bars as {       barColor,       bkgColor,       deselected,       displayValue,       dxKey,       isNeg,       key,       label,       x,       xValue,      }


function create_each_block_1(key_1, ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var line;
  var line_stroke_value;
  var line_x__value;
  var text0;
  var t0_value =
  /*label*/
  ctx[68] + "";
  var t0;
  var text0_dx_value;
  var text1;
  var t1_value =
  /*displayValue*/
  ctx[64] + "";
  var t1;
  var text1_x_value;
  var g_transform_value;
  var mounted;
  var dispose;
  var block = {
    key: key_1,
    first: null,
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      line = svg_element("line");
      text0 = svg_element("text");
      t0 = text(t0_value);
      text1 = svg_element("text");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        width: true,
        fill: true,
        height: true
      }, 1);
      children(rect).forEach(detach_dev);
      line = claim_element(g_nodes, "line", {
        stroke: true,
        "stroke-width": true,
        x1: true,
        x2: true,
        y1: true,
        y2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);
      text0 = claim_element(g_nodes, "text", {
        class: true,
        dx: true,
        x: true,
        y: true
      }, 1);
      var text0_nodes = children(text0);
      t0 = claim_text(text0_nodes, t0_value);
      text0_nodes.forEach(detach_dev);
      text1 = claim_element(g_nodes, "text", {
        class: true,
        x: true,
        y: true
      }, 1);
      var text1_nodes = children(text1);
      t1 = claim_text(text1_nodes, t1_value);
      text1_nodes.forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "width",
      /*width*/
      ctx[9]);
      attr_dev(rect, "fill", rect_fill_value =
      /*bkgColor*/
      ctx[62]);
      attr_dev(rect, "height",
      /*itemHeight*/
      ctx[13]);
      add_location(rect, file$7, 328, 6, 7456);
      attr_dev(line, "stroke", line_stroke_value =
      /*barColor*/
      ctx[61]);
      attr_dev(line, "stroke-width",
      /*barHeight*/
      ctx[0]);
      attr_dev(line, "x1",
      /*x0*/
      ctx[18]);
      attr_dev(line, "x2", line_x__value =
      /*x*/
      ctx[58]);
      attr_dev(line, "y1",
      /*barY*/
      ctx[14]);
      attr_dev(line, "y2",
      /*barY*/
      ctx[14]);
      attr_dev(line, "class", "svelte-1octkco");
      add_location(line, file$7, 333, 6, 7542);
      attr_dev(text0, "class", "key svelte-1octkco");
      attr_dev(text0, "dx", text0_dx_value =
      /*dxKey*/
      ctx[65]);
      attr_dev(text0, "x",
      /*x0*/
      ctx[18]);
      attr_dev(text0, "y",
      /*textY*/
      ctx[15]);
      toggle_class(text0, "neg",
      /*isNeg*/
      ctx[66]);
      add_location(text0, file$7, 341, 6, 7683);
      attr_dev(text1, "class", "value svelte-1octkco");
      attr_dev(text1, "x", text1_x_value =
      /*xValue*/
      ctx[69]);
      attr_dev(text1, "y",
      /*textY*/
      ctx[15]);
      toggle_class(text1, "neg",
      /*isNeg*/
      ctx[66]);
      add_location(text1, file$7, 348, 6, 7810);
      attr_dev(g, "class", "item svelte-1octkco");
      attr_dev(g, "transform", g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[13] *
      /*index*/
      ctx[71] + ")");
      toggle_class(g, "clickable",
      /*isInteractive*/
      ctx[1]);
      toggle_class(g, "deselected",
      /*deselected*/
      ctx[63]);
      add_location(g, file$7, 319, 5, 7163);
      this.first = g;
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, rect);
      append_dev(g, line);
      append_dev(g, text0);
      append_dev(text0, t0);
      append_dev(g, text1);
      append_dev(text1, t1);

      if (!mounted) {
        dispose = [listen_dev(g, "click", function () {
          if (is_function(
          /*isInteractive*/
          ctx[1] &&
          /*onClick*/
          ctx[22](
          /*key*/
          ctx[67]))) (
          /*isInteractive*/
          ctx[1] &&
          /*onClick*/
          ctx[22](
          /*key*/
          ctx[67])).apply(this, arguments);
        }, false, false, false), listen_dev(g, "mouseenter", function () {
          if (is_function(
          /*onMouseenter*/
          ctx[23](
          /*key*/
          ctx[67])))
            /*onMouseenter*/
            ctx[23](
            /*key*/
            ctx[67]).apply(this, arguments);
        }, false, false, false), listen_dev(g, "mouseleave", function () {
          if (is_function(
          /*isInteractive*/
          ctx[1] &&
          /*onMouseleave*/
          ctx[24](
          /*key*/
          ctx[67]))) (
          /*isInteractive*/
          ctx[1] &&
          /*onMouseleave*/
          ctx[24](
          /*key*/
          ctx[67])).apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*width*/
      512) {
        attr_dev(rect, "width",
        /*width*/
        ctx[9]);
      }

      if (dirty[0] &
      /*bars*/
      524288 && rect_fill_value !== (rect_fill_value =
      /*bkgColor*/
      ctx[62])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*itemHeight*/
      8192) {
        attr_dev(rect, "height",
        /*itemHeight*/
        ctx[13]);
      }

      if (dirty[0] &
      /*bars*/
      524288 && line_stroke_value !== (line_stroke_value =
      /*barColor*/
      ctx[61])) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*barHeight*/
      1) {
        attr_dev(line, "stroke-width",
        /*barHeight*/
        ctx[0]);
      }

      if (dirty[0] &
      /*x0*/
      262144) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[18]);
      }

      if (dirty[0] &
      /*bars*/
      524288 && line_x__value !== (line_x__value =
      /*x*/
      ctx[58])) {
        attr_dev(line, "x2", line_x__value);
      }

      if (dirty[0] &
      /*barY*/
      16384) {
        attr_dev(line, "y1",
        /*barY*/
        ctx[14]);
      }

      if (dirty[0] &
      /*barY*/
      16384) {
        attr_dev(line, "y2",
        /*barY*/
        ctx[14]);
      }

      if (dirty[0] &
      /*bars*/
      524288 && t0_value !== (t0_value =
      /*label*/
      ctx[68] + "")) set_data_dev(t0, t0_value);

      if (dirty[0] &
      /*bars*/
      524288 && text0_dx_value !== (text0_dx_value =
      /*dxKey*/
      ctx[65])) {
        attr_dev(text0, "dx", text0_dx_value);
      }

      if (dirty[0] &
      /*x0*/
      262144) {
        attr_dev(text0, "x",
        /*x0*/
        ctx[18]);
      }

      if (dirty[0] &
      /*textY*/
      32768) {
        attr_dev(text0, "y",
        /*textY*/
        ctx[15]);
      }

      if (dirty[0] &
      /*bars*/
      524288) {
        toggle_class(text0, "neg",
        /*isNeg*/
        ctx[66]);
      }

      if (dirty[0] &
      /*bars*/
      524288 && t1_value !== (t1_value =
      /*displayValue*/
      ctx[64] + "")) set_data_dev(t1, t1_value);

      if (dirty[0] &
      /*bars*/
      524288 && text1_x_value !== (text1_x_value =
      /*xValue*/
      ctx[69])) {
        attr_dev(text1, "x", text1_x_value);
      }

      if (dirty[0] &
      /*textY*/
      32768) {
        attr_dev(text1, "y",
        /*textY*/
        ctx[15]);
      }

      if (dirty[0] &
      /*bars*/
      524288) {
        toggle_class(text1, "neg",
        /*isNeg*/
        ctx[66]);
      }

      if (dirty[0] &
      /*itemHeight, bars*/
      532480 && g_transform_value !== (g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[13] *
      /*index*/
      ctx[71] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }

      if (dirty[0] &
      /*isInteractive*/
      2) {
        toggle_class(g, "clickable",
        /*isInteractive*/
        ctx[1]);
      }

      if (dirty[0] &
      /*bars*/
      524288) {
        toggle_class(g, "deselected",
        /*deselected*/
        ctx[63]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(308:5) {#each bars as {       barColor,       bkgColor,       deselected,       displayValue,       dxKey,       isNeg,       key,       label,       x,       xValue,      }",
    ctx: ctx
  });
  return block;
} // (360:4) {#if crossesZero}


function create_if_block_2$2(ctx) {
  var line;
  var line_stroke_value;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_element(nodes, "line", {
        stroke: true,
        x1: true,
        x2: true,
        y2: true
      }, 1);
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "stroke", line_stroke_value =
      /*theme*/
      ctx[5].axisColor);
      attr_dev(line, "x1",
      /*x0*/
      ctx[18]);
      attr_dev(line, "x2",
      /*x0*/
      ctx[18]);
      attr_dev(line, "y2",
      /*svgHeight*/
      ctx[16]);
      add_location(line, file$7, 360, 4, 8003);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*theme*/
      32 && line_stroke_value !== (line_stroke_value =
      /*theme*/
      ctx[5].axisColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*x0*/
      262144) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[18]);
      }

      if (dirty[0] &
      /*x0*/
      262144) {
        attr_dev(line, "x2",
        /*x0*/
        ctx[18]);
      }

      if (dirty[0] &
      /*svgHeight*/
      65536) {
        attr_dev(line, "y2",
        /*svgHeight*/
        ctx[16]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$2.name,
    type: "if",
    source: "(360:4) {#if crossesZero}",
    ctx: ctx
  });
  return block;
} // (370:4) {#if refsLayout}


function create_if_block_1$3(ctx) {
  var each_1_anchor;
  var each_value =
  /*refsLayout*/
  ctx[21];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*refsLayout, theme, svgHeight*/
      2162720) {
        each_value =
        /*refsLayout*/
        ctx[21];
        validate_each_argument(each_value);

        var _i12;

        for (_i12 = 0; _i12 < each_value.length; _i12 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block$3(child_ctx);

            each_blocks[_i12].c();

            each_blocks[_i12].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(370:4) {#if refsLayout}",
    ctx: ctx
  });
  return block;
} // (371:4) {#each refsLayout as {      color,      dasharray,      linewidth,      valueX: x,     }}


function create_each_block$3(ctx) {
  var line;
  var line_stroke_value;
  var line_stroke_dasharray_value;
  var line_stroke_width_value;
  var line_x__value;
  var line_x__value_1;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_element(nodes, "line", {
        class: true,
        stroke: true,
        "stroke-dasharray": true,
        "stroke-width": true,
        x1: true,
        x2: true,
        y2: true
      }, 1);
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "class", "ref");
      attr_dev(line, "stroke", line_stroke_value =
      /*color*/
      ctx[55] ||
      /*theme*/
      ctx[5].refColor);
      attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value =
      /*dasharray*/
      ctx[56] ||
      /*theme*/
      ctx[5].refDasharray);
      attr_dev(line, "stroke-width", line_stroke_width_value =
      /*linewidth*/
      ctx[57] ||
      /*theme*/
      ctx[5].refWidth);
      attr_dev(line, "x1", line_x__value =
      /*x*/
      ctx[58]);
      attr_dev(line, "x2", line_x__value_1 =
      /*x*/
      ctx[58]);
      attr_dev(line, "y2",
      /*svgHeight*/
      ctx[16]);
      add_location(line, file$7, 376, 4, 8246);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_value !== (line_stroke_value =
      /*color*/
      ctx[55] ||
      /*theme*/
      ctx[5].refColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_dasharray_value !== (line_stroke_dasharray_value =
      /*dasharray*/
      ctx[56] ||
      /*theme*/
      ctx[5].refDasharray)) {
        attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
      }

      if (dirty[0] &
      /*refsLayout, theme*/
      2097184 && line_stroke_width_value !== (line_stroke_width_value =
      /*linewidth*/
      ctx[57] ||
      /*theme*/
      ctx[5].refWidth)) {
        attr_dev(line, "stroke-width", line_stroke_width_value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && line_x__value !== (line_x__value =
      /*x*/
      ctx[58])) {
        attr_dev(line, "x1", line_x__value);
      }

      if (dirty[0] &
      /*refsLayout*/
      2097152 && line_x__value_1 !== (line_x__value_1 =
      /*x*/
      ctx[58])) {
        attr_dev(line, "x2", line_x__value_1);
      }

      if (dirty[0] &
      /*svgHeight*/
      65536) {
        attr_dev(line, "y2",
        /*svgHeight*/
        ctx[16]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$3.name,
    type: "each",
    source: "(371:4) {#each refsLayout as {      color,      dasharray,      linewidth,      valueX: x,     }}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var div;
  var t;
  var main;
  var if_block0 =
  /*title*/
  ctx[6] && create_if_block_4(ctx);

  function select_block_type(ctx, dirty) {
    if (
    /*items*/
    ctx[2].length === 0) return create_if_block$4;
    return create_else_block$1;
  }

  var current_block_type = select_block_type(ctx);
  var if_block1 = current_block_type(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if_block1.l(main_nodes);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(main, "class", "svelte-1octkco");
      toggle_class(main, "titled",
      /*title*/
      ctx[6]);
      add_location(main, file$7, 239, 1, 5702);
      attr_dev(div, "style",
      /*style*/
      ctx[11]);
      attr_dev(div, "class", "BarchartVDiv svelte-1octkco");
      add_location(div, file$7, 230, 0, 5603);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      if_block1.m(main, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*title*/
      ctx[6]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);

        if (if_block1) {
          if_block1.c();
          if_block1.m(main, null);
        }
      }

      if (dirty[0] &
      /*title*/
      64) {
        toggle_class(main, "titled",
        /*title*/
        ctx[6]);
      }

      if (dirty[0] &
      /*style*/
      2048) {
        attr_dev(div, "style",
        /*style*/
        ctx[11]);
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if_block1.d();
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

var transparentColor = "rgba(0,0,0,0)";

function instance$d($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var sortByValue = sortWith([getValue]);
  var augmentTheme = makeMergeAppliedFnMap({
    paddingPx: pipe([function (x) {
      return x.padding;
    }, toPx])
  });
  var defaultTheme = {
    // exposed but undocumented
    backgroundOpacity: 1,
    // exposed and documented
    axisColor: "grey",
    backgroundColor: transparentColor,
    barDefaultColor: "black",
    deselectedOpacity: 0.25,
    focusedKeyColor: "rgba(0, 0, 0, 0.1)",
    fontSize: 14,
    headerHeight: "2em",
    hoverColor: "rgba(0, 0, 0, 0.05)",
    messageColor: "black",
    messageFontSize: "1rem",
    padding: 10,
    refColor: "grey",
    refDasharray: "4 4",
    refWidth: 0.5,
    textColor: "grey",
    titleFontSize: "1.5em"
  };
  var barHeight = $$props.barHeight;
  var focusedKey = $$props.focusedKey;
  var formatFn = $$props.formatFn;
  var isInteractive = $$props.isInteractive;
  var items = $$props.items;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var keyToLabel = $$props.keyToLabel;
  var keyToLabelFn = $$props.keyToLabelFn;
  var message = $$props.message;
  var refs = $$props.refs;
  var selectedKeys = $$props.selectedKeys;
  var shouldResetScroll = $$props.shouldResetScroll;
  var shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey;
  var theme = $$props.theme;
  var title = $$props.title;
  var valueAccessor = $$props.valueAccessor;
  var height;
  var hoveredKey;
  var width;
  /* scroll */

  var previousItems;
  var scrollable;
  var wasNotResettingScroll;
  beforeUpdate(function () {
    $$invalidate(39, wasNotResettingScroll = !shouldResetScroll);
  });
  /* events */

  var onClick = function onClick(key) {
    return function () {
      dispatch("clicked", {
        id: key
      });
    };
  };

  var onMouseenter = function onMouseenter(key) {
    return function () {
      $$invalidate(8, hoveredKey = key);
      isInteractive && dispatch("entered", {
        id: key
      });
    };
  };

  var onMouseleave = function onMouseleave(key) {
    return function () {
      dispatch("exited", {
        id: key
      });
    };
  };

  var writable_props = ["barHeight", "focusedKey", "formatFn", "isInteractive", "items", "keyToColor", "keyToColorFn", "keyToLabel", "keyToLabelFn", "message", "refs", "selectedKeys", "shouldResetScroll", "shouldScrollToFocusedKey", "theme", "title", "valueAccessor"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<BarchartVDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("BarchartVDiv", $$slots, []);

  function div_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(7, height);
    $$invalidate(9, width);
  }

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      scrollable = $$value;
      ((($$invalidate(10, scrollable), $$invalidate(26, shouldResetScroll)), $$invalidate(38, previousItems)), $$invalidate(2, items)), $$invalidate(39, wasNotResettingScroll);
    });
  }

  var mouseleave_handler = function mouseleave_handler() {
    $$invalidate(8, hoveredKey = null);
  };

  $$self.$set = function ($$props) {
    if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ("focusedKey" in $$props) $$invalidate(28, focusedKey = $$props.focusedKey);
    if ("formatFn" in $$props) $$invalidate(29, formatFn = $$props.formatFn);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("keyToColor" in $$props) $$invalidate(30, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(31, keyToColorFn = $$props.keyToColorFn);
    if ("keyToLabel" in $$props) $$invalidate(32, keyToLabel = $$props.keyToLabel);
    if ("keyToLabelFn" in $$props) $$invalidate(33, keyToLabelFn = $$props.keyToLabelFn);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("refs" in $$props) $$invalidate(4, refs = $$props.refs);
    if ("selectedKeys" in $$props) $$invalidate(25, selectedKeys = $$props.selectedKeys);
    if ("shouldResetScroll" in $$props) $$invalidate(26, shouldResetScroll = $$props.shouldResetScroll);
    if ("shouldScrollToFocusedKey" in $$props) $$invalidate(34, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
    if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
    if ("title" in $$props) $$invalidate(6, title = $$props.title);
    if ("valueAccessor" in $$props) $$invalidate(27, valueAccessor = $$props.valueAccessor);
  };

  $$self.$capture_state = function () {
    return {
      isEqual: justCompare,
      index: index,
      isIn: isIn,
      mapWith: mapWith,
      pipe: pipe,
      sortWith: sortWith,
      afterUpdate: afterUpdate,
      beforeUpdate: beforeUpdate,
      createEventDispatcher: createEventDispatcher,
      linearScale: linear,
      makeStyleVars: makeStyleVars,
      toPx: toPx,
      arrayMaxWith: arrayMaxWith,
      arrayMinWith: arrayMinWith,
      getKey: getKey,
      getValue: getValue,
      makeMergeAppliedFnMap: makeMergeAppliedFnMap,
      dispatch: dispatch,
      sortByValue: sortByValue,
      transparentColor: transparentColor,
      augmentTheme: augmentTheme,
      defaultTheme: defaultTheme,
      barHeight: barHeight,
      focusedKey: focusedKey,
      formatFn: formatFn,
      isInteractive: isInteractive,
      items: items,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      keyToLabel: keyToLabel,
      keyToLabelFn: keyToLabelFn,
      message: message,
      refs: refs,
      selectedKeys: selectedKeys,
      shouldResetScroll: shouldResetScroll,
      shouldScrollToFocusedKey: shouldScrollToFocusedKey,
      theme: theme,
      title: title,
      valueAccessor: valueAccessor,
      height: height,
      hoveredKey: hoveredKey,
      width: width,
      previousItems: previousItems,
      scrollable: scrollable,
      wasNotResettingScroll: wasNotResettingScroll,
      onClick: onClick,
      onMouseenter: onMouseenter,
      onMouseleave: onMouseleave,
      style: style,
      refsHeight: refsHeight,
      barPadding: barPadding,
      itemHeight: itemHeight,
      barY: barY,
      textY: textY,
      svgHeight: svgHeight,
      getMin: getMin,
      getMax: getMax,
      refsValues: refsValues,
      min: min,
      max: max,
      crossesZero: crossesZero,
      domain: domain,
      getX: getX,
      x0: x0,
      bars: bars,
      barsByKey: barsByKey,
      makeRefsLayout: makeRefsLayout,
      refHeight: refHeight,
      refsLayout: refsLayout,
      focusedY: focusedY
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ("focusedKey" in $$props) $$invalidate(28, focusedKey = $$props.focusedKey);
    if ("formatFn" in $$props) $$invalidate(29, formatFn = $$props.formatFn);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("keyToColor" in $$props) $$invalidate(30, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(31, keyToColorFn = $$props.keyToColorFn);
    if ("keyToLabel" in $$props) $$invalidate(32, keyToLabel = $$props.keyToLabel);
    if ("keyToLabelFn" in $$props) $$invalidate(33, keyToLabelFn = $$props.keyToLabelFn);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("refs" in $$props) $$invalidate(4, refs = $$props.refs);
    if ("selectedKeys" in $$props) $$invalidate(25, selectedKeys = $$props.selectedKeys);
    if ("shouldResetScroll" in $$props) $$invalidate(26, shouldResetScroll = $$props.shouldResetScroll);
    if ("shouldScrollToFocusedKey" in $$props) $$invalidate(34, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
    if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
    if ("title" in $$props) $$invalidate(6, title = $$props.title);
    if ("valueAccessor" in $$props) $$invalidate(27, valueAccessor = $$props.valueAccessor);
    if ("height" in $$props) $$invalidate(7, height = $$props.height);
    if ("hoveredKey" in $$props) $$invalidate(8, hoveredKey = $$props.hoveredKey);
    if ("width" in $$props) $$invalidate(9, width = $$props.width);
    if ("previousItems" in $$props) $$invalidate(38, previousItems = $$props.previousItems);
    if ("scrollable" in $$props) $$invalidate(10, scrollable = $$props.scrollable);
    if ("wasNotResettingScroll" in $$props) $$invalidate(39, wasNotResettingScroll = $$props.wasNotResettingScroll);
    if ("style" in $$props) $$invalidate(11, style = $$props.style);
    if ("refsHeight" in $$props) $$invalidate(12, refsHeight = $$props.refsHeight);
    if ("barPadding" in $$props) $$invalidate(40, barPadding = $$props.barPadding);
    if ("itemHeight" in $$props) $$invalidate(13, itemHeight = $$props.itemHeight);
    if ("barY" in $$props) $$invalidate(14, barY = $$props.barY);
    if ("textY" in $$props) $$invalidate(15, textY = $$props.textY);
    if ("svgHeight" in $$props) $$invalidate(16, svgHeight = $$props.svgHeight);
    if ("getMin" in $$props) $$invalidate(41, getMin = $$props.getMin);
    if ("getMax" in $$props) $$invalidate(42, getMax = $$props.getMax);
    if ("refsValues" in $$props) $$invalidate(43, refsValues = $$props.refsValues);
    if ("min" in $$props) $$invalidate(44, min = $$props.min);
    if ("max" in $$props) $$invalidate(45, max = $$props.max);
    if ("crossesZero" in $$props) $$invalidate(17, crossesZero = $$props.crossesZero);
    if ("domain" in $$props) $$invalidate(46, domain = $$props.domain);
    if ("getX" in $$props) $$invalidate(47, getX = $$props.getX);
    if ("x0" in $$props) $$invalidate(18, x0 = $$props.x0);
    if ("bars" in $$props) $$invalidate(19, bars = $$props.bars);
    if ("barsByKey" in $$props) $$invalidate(48, barsByKey = $$props.barsByKey);
    if ("makeRefsLayout" in $$props) $$invalidate(49, makeRefsLayout = $$props.makeRefsLayout);
    if ("refHeight" in $$props) $$invalidate(20, refHeight = $$props.refHeight);
    if ("refsLayout" in $$props) $$invalidate(21, refsLayout = $$props.refsLayout);
    if ("focusedY" in $$props) $$invalidate(50, focusedY = $$props.focusedY);
  };

  var style;
  var barPadding;
  var itemHeight;
  var barY;
  var textY;
  var svgHeight;
  var getMin;
  var getMax;
  var refsValues;
  var min;
  var max;
  var crossesZero;
  var domain;
  var getX;
  var x0;
  var bars;
  var barsByKey;
  var makeRefsLayout;
  var refsLayout;
  var refHeight;
  var refsHeight;
  var focusedY;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*barHeight*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(0, barHeight = barHeight || 4);
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    2) {
       $$invalidate(1, isInteractive = isInteractive || false);
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    4) {
       $$invalidate(2, items = items || []);
    }

    if ($$self.$$.dirty[0] &
    /*message*/
    8) {
       $$invalidate(3, message = message || "No data");
    }

    if ($$self.$$.dirty[0] &
    /*refs*/
    16) {
       $$invalidate(4, refs = refs || []);
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys*/
    33554432) {
       $$invalidate(25, selectedKeys = selectedKeys || []);
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll*/
    67108864) {
       $$invalidate(26, shouldResetScroll = shouldResetScroll || false);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    32) {
       $$invalidate(5, theme = theme ? _objectSpread$2(_objectSpread$2({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    32) {
       $$invalidate(20, refHeight = theme.padding + theme.fontSize);
    }

    if ($$self.$$.dirty[0] &
    /*refs, theme, refHeight*/
    1048624) {
       $$invalidate(12, refsHeight = refs && refs.length * (theme.padding + refHeight) + theme.padding || 0);
    }

    if ($$self.$$.dirty[0] &
    /*theme, refsHeight*/
    4128) {
       $$invalidate(11, style = makeStyleVars(_objectSpread$2(_objectSpread$2({}, augmentTheme(theme)), {}, {
        refsHeightPx: toPx(refsHeight)
      })));
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    134217728) {
       $$invalidate(27, valueAccessor = valueAccessor || getValue);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    32) {
       $$invalidate(40, barPadding = theme.fontSize / 2);
    }

    if ($$self.$$.dirty[0] &
    /*theme, barHeight*/
    33 | $$self.$$.dirty[1] &
    /*barPadding*/
    512) {
       $$invalidate(13, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, barHeight*/
    8193 | $$self.$$.dirty[1] &
    /*barPadding*/
    512) {
       $$invalidate(14, barY = itemHeight - barPadding - barHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, barHeight*/
    8193 | $$self.$$.dirty[1] &
    /*barPadding*/
    512) {
       $$invalidate(15, textY = itemHeight - barHeight - 2 * barPadding);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, items*/
    8196) {
       $$invalidate(16, svgHeight = itemHeight * items.length);
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    134217728) {
       $$invalidate(41, getMin = arrayMinWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    134217728) {
       $$invalidate(42, getMax = arrayMaxWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*refs*/
    16) {
       $$invalidate(43, refsValues = refs.map(getValue));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    4 | $$self.$$.dirty[1] &
    /*getMin, refsValues*/
    5120) {
       $$invalidate(44, min = Math.min.apply(Math, [getMin(items)].concat(_toConsumableArray(refsValues))));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    4 | $$self.$$.dirty[1] &
    /*getMax, refsValues*/
    6144) {
       $$invalidate(45, max = Math.max.apply(Math, [getMax(items)].concat(_toConsumableArray(refsValues))));
    }

    if ($$self.$$.dirty[1] &
    /*min, max*/
    24576) {
       $$invalidate(17, crossesZero = Math.sign(min) === -Math.sign(max));
    }

    if ($$self.$$.dirty[0] &
    /*crossesZero*/
    131072 | $$self.$$.dirty[1] &
    /*min, max*/
    24576) {
       $$invalidate(46, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
    }

    if ($$self.$$.dirty[0] &
    /*width*/
    512 | $$self.$$.dirty[1] &
    /*domain*/
    32768) {
       $$invalidate(47, getX = linear(domain, [0, width]));
    }

    if ($$self.$$.dirty[1] &
    /*getX*/
    65536) {
       $$invalidate(18, x0 = getX(0));
    }

    if ($$self.$$.dirty[0] &
    /*items, valueAccessor, keyToColor, theme, focusedKey, hoveredKey, formatFn, crossesZero, selectedKeys, width, itemHeight*/
    2046960420 | $$self.$$.dirty[1] &
    /*keyToColorFn, barPadding, keyToLabel, keyToLabelFn, getX*/
    66055) {
       $$invalidate(19, bars = items.map(function (item, idx) {
        var value = valueAccessor(item);
        var isNeg = value < 0;
        return _objectSpread$2(_objectSpread$2({}, item), {
          barColor: keyToColor ? keyToColor[item.key] || theme.barDefaultColor : keyToColorFn ? keyToColorFn(item.key) : theme.barDefaultColor,
          bkgColor: item.key === focusedKey ? theme.focusedKeyColor : item.key === hoveredKey ? theme.hoverColor : transparentColor,
          displayValue: formatFn ? formatFn(value) : value,
          dxKey: crossesZero ? isNeg ? -barPadding : barPadding : 0,
          isNeg: isNeg,
          label: keyToLabel && keyToLabel[item.key] ? keyToLabel[item.key] : keyToLabelFn ? keyToLabelFn(item.key) : item.key,
          deselected: selectedKeys.length && !isIn(selectedKeys, item.key),
          x: getX(value),
          xValue: value > 0 ? width : 0,
          y: (idx + 1) * itemHeight // bottom of the item rect

        });
      }));
    }

    if ($$self.$$.dirty[0] &
    /*bars*/
    524288) {
       $$invalidate(48, barsByKey = index(bars, getKey));
    }

    if ($$self.$$.dirty[0] &
    /*theme, width, refHeight*/
    1049120 | $$self.$$.dirty[1] &
    /*getX*/
    65536) {
       $$invalidate(49, makeRefsLayout = pipe([sortByValue, mapWith(function (obj, idx) {
        var label = "".concat(obj.key, " (").concat(obj.value, ")");
        var textLength = obj.key.length * theme.fontSize * 0.6;
        var rectWidth = textLength + 2 * theme.padding;
        var valueX = getX(obj.value);
        var isRight = valueX + rectWidth > width;
        return _objectSpread$2(_objectSpread$2({}, obj), {}, {
          isRight: isRight,
          label: label,
          rectWidth: rectWidth,
          textLength: textLength,
          textX: isRight ? -theme.padding : theme.padding,
          valueX: valueX,
          x: isRight ? -rectWidth : 0,
          y: theme.padding + idx * (theme.padding + refHeight)
        });
      })]));
    }

    if ($$self.$$.dirty[0] &
    /*refs*/
    16 | $$self.$$.dirty[1] &
    /*makeRefsLayout*/
    262144) {
       $$invalidate(21, refsLayout = refs && refs.length && makeRefsLayout(refs));
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll, items*/
    67108868 | $$self.$$.dirty[1] &
    /*previousItems*/
    128) {
       afterUpdate(function () {
        if (shouldResetScroll && !justCompare(previousItems, items)) {
          $$invalidate(10, scrollable.scrollTop = 0, scrollable);
          $$invalidate(38, previousItems = items);
        }
      });
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll, scrollable*/
    67109888 | $$self.$$.dirty[1] &
    /*wasNotResettingScroll*/
    256) {
       if (wasNotResettingScroll && shouldResetScroll && scrollable) {
        $$invalidate(10, scrollable.scrollTop = 0, scrollable);
      }
    }

    if ($$self.$$.dirty[0] &
    /*focusedKey*/
    268435456 | $$self.$$.dirty[1] &
    /*shouldScrollToFocusedKey, barsByKey*/
    131080) {
       $$invalidate(50, focusedY = shouldScrollToFocusedKey && focusedKey && barsByKey[focusedKey] && barsByKey[focusedKey].y);
    }

    if ($$self.$$.dirty[0] &
    /*focusedKey, scrollable, itemHeight, height*/
    268444800 | $$self.$$.dirty[1] &
    /*shouldScrollToFocusedKey, focusedY*/
    524296) {
       if (shouldScrollToFocusedKey && focusedKey && scrollable) {
        var yAbs = -scrollable.scrollTop + focusedY;

        if (yAbs < 0) {
          scrollable.scroll({
            top: focusedY - itemHeight,
            behavior: "smooth"
          });
        } else if (yAbs > height) {
          scrollable.scroll({
            top: focusedY - height,
            behavior: "smooth"
          });
        }
      }
    }
  };

  return [barHeight, isInteractive, items, message, refs, theme, title, height, hoveredKey, width, scrollable, style, refsHeight, itemHeight, barY, textY, svgHeight, crossesZero, x0, bars, refHeight, refsLayout, onClick, onMouseenter, onMouseleave, selectedKeys, shouldResetScroll, valueAccessor, focusedKey, formatFn, keyToColor, keyToColorFn, keyToLabel, keyToLabelFn, shouldScrollToFocusedKey, div_elementresize_handler, div_binding, mouseleave_handler];
}

var BarchartVDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(BarchartVDiv, _SvelteComponentDev);

  var _super = _createSuper$d(BarchartVDiv);

  function BarchartVDiv(options) {
    var _this;

    _classCallCheck(this, BarchartVDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      barHeight: 0,
      focusedKey: 28,
      formatFn: 29,
      isInteractive: 1,
      items: 2,
      keyToColor: 30,
      keyToColorFn: 31,
      keyToLabel: 32,
      keyToLabelFn: 33,
      message: 3,
      refs: 4,
      selectedKeys: 25,
      shouldResetScroll: 26,
      shouldScrollToFocusedKey: 34,
      theme: 5,
      title: 6,
      valueAccessor: 27
    }, [-1, -1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "BarchartVDiv",
      options: options,
      id: create_fragment$d.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*barHeight*/
    ctx[0] === undefined && !("barHeight" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'barHeight'");
    }

    if (
    /*focusedKey*/
    ctx[28] === undefined && !("focusedKey" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'focusedKey'");
    }

    if (
    /*formatFn*/
    ctx[29] === undefined && !("formatFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'formatFn'");
    }

    if (
    /*isInteractive*/
    ctx[1] === undefined && !("isInteractive" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'isInteractive'");
    }

    if (
    /*items*/
    ctx[2] === undefined && !("items" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'items'");
    }

    if (
    /*keyToColor*/
    ctx[30] === undefined && !("keyToColor" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[31] === undefined && !("keyToColorFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*keyToLabel*/
    ctx[32] === undefined && !("keyToLabel" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToLabel'");
    }

    if (
    /*keyToLabelFn*/
    ctx[33] === undefined && !("keyToLabelFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToLabelFn'");
    }

    if (
    /*message*/
    ctx[3] === undefined && !("message" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'message'");
    }

    if (
    /*refs*/
    ctx[4] === undefined && !("refs" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'refs'");
    }

    if (
    /*selectedKeys*/
    ctx[25] === undefined && !("selectedKeys" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'selectedKeys'");
    }

    if (
    /*shouldResetScroll*/
    ctx[26] === undefined && !("shouldResetScroll" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'shouldResetScroll'");
    }

    if (
    /*shouldScrollToFocusedKey*/
    ctx[34] === undefined && !("shouldScrollToFocusedKey" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'shouldScrollToFocusedKey'");
    }

    if (
    /*theme*/
    ctx[5] === undefined && !("theme" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'theme'");
    }

    if (
    /*title*/
    ctx[6] === undefined && !("title" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'title'");
    }

    if (
    /*valueAccessor*/
    ctx[27] === undefined && !("valueAccessor" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'valueAccessor'");
    }

    return _this;
  }

  _createClass(BarchartVDiv, [{
    key: "barHeight",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedKey",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "formatFn",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "items",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToLabel",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToLabelFn",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "refs",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedKeys",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shouldResetScroll",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shouldScrollToFocusedKey",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "valueAccessor",
    get: function get() {
      throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return BarchartVDiv;
}(SvelteComponentDev);

var barchart = /*#__PURE__*/Object.freeze({
	__proto__: null,
	BarchartVDiv: BarchartVDiv
});

var projections = /*#__PURE__*/Object.freeze({
	__proto__: null,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoEqualEarth: projectionFn,
	geoEquirectangular: equirectangular,
	geoMercator: mercator,
	geoNaturalEarth1: naturalEarth1
});

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte";

function get_each_context$4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[37] = list[i];
  return child_ctx;
} // (99:0) {#if height && width}


function create_if_block$5(ctx) {
  var g;

  function select_block_type(ctx, dirty) {
    if (!
    /*topojson*/
    ctx[5]) return create_if_block_1$4;
    return create_else_block$2;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        style: true,
        class: true
      }, 1);
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "style",
      /*style*/
      ctx[9]);
      attr_dev(g, "class", "ChoroplethG svelte-54gkh3");
      toggle_class(g, "interactive",
      /*isInteractive*/
      ctx[1]);
      add_location(g, file$8, 99, 0, 3025);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }

      if (dirty[0] &
      /*style*/
      512) {
        attr_dev(g, "style",
        /*style*/
        ctx[9]);
      }

      if (dirty[0] &
      /*isInteractive*/
      2) {
        toggle_class(g, "interactive",
        /*isInteractive*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(99:0) {#if height && width}",
    ctx: ctx
  });
  return block;
} // (113:1) {:else}


function create_else_block$2(ctx) {
  var rect;
  var g;
  var g_transform_value;
  var if_block =
  /*coloredGeojson*/
  ctx[10] && create_if_block_2$3(ctx);
  var block = {
    c: function create() {
      rect = svg_element("rect");
      g = svg_element("g");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      g = claim_element(nodes, "g", {
        transform: true
      }, 1);
      var g_nodes = children(g);
      if (if_block) if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[4]);
      attr_dev(rect, "width",
      /*width*/
      ctx[6]);
      attr_dev(rect, "class", "bkg svelte-54gkh3");
      add_location(rect, file$8, 114, 1, 3198);
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*geometry*/
      ctx[0].left + "," +
      /*geometry*/
      ctx[0].top + ")");
      add_location(g, file$8, 119, 1, 3244);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
      insert_dev(target, g, anchor);
      if (if_block) if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      16) {
        attr_dev(rect, "height",
        /*height*/
        ctx[4]);
      }

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (
      /*coloredGeojson*/
      ctx[10]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_2$3(ctx);
          if_block.c();
          if_block.m(g, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty[0] &
      /*geometry*/
      1 && g_transform_value !== (g_transform_value = "translate(" +
      /*geometry*/
      ctx[0].left + "," +
      /*geometry*/
      ctx[0].top + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      if (detaching) detach_dev(g);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(113:1) {:else}",
    ctx: ctx
  });
  return block;
} // (105:1) {#if !topojson}


function create_if_block_1$4(ctx) {
  var text_1;
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(
      /*message*/
      ctx[3]);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        class: true,
        x: true,
        y: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes,
      /*message*/
      ctx[3]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "message svelte-54gkh3");
      attr_dev(text_1, "x", text_1_x_value =
      /*width*/
      ctx[6] / 2);
      attr_dev(text_1, "y", text_1_y_value =
      /*height*/
      ctx[4] / 2);
      add_location(text_1, file$8, 106, 1, 3114);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*message*/
      8) set_data_dev(t,
      /*message*/
      ctx[3]);

      if (dirty[0] &
      /*width*/
      64 && text_1_x_value !== (text_1_x_value =
      /*width*/
      ctx[6] / 2)) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*height*/
      16 && text_1_y_value !== (text_1_y_value =
      /*height*/
      ctx[4] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$4.name,
    type: "if",
    source: "(105:1) {#if !topojson}",
    ctx: ctx
  });
  return block;
} // (121:2) {#if coloredGeojson}


function create_if_block_2$3(ctx) {
  var each_1_anchor;
  var each_value =
  /*coloredGeojson*/
  ctx[10].features;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
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

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*coloredGeojson, key, key_alt, isDeselected, isSelected, focusedKey, isFocused, geopath, isClickable, dispatch, getPayload, isInteractive*/
      261510) {
        each_value =
        /*coloredGeojson*/
        ctx[10].features;
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$4(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$4(child_ctx);

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
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$3.name,
    type: "if",
    source: "(121:2) {#if coloredGeojson}",
    ctx: ctx
  });
  return block;
} // (122:2) {#each coloredGeojson.features as feature}


function create_each_block$4(ctx) {
  var g;
  var path;
  var path_d_value;
  var g_id_value;
  var mounted;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[26].apply(_ctx, [
      /*feature*/
      ctx[37]].concat(args))
    );
  }

  function mouseenter_handler() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*mouseenter_handler*/
      (_ctx2 = ctx)[27].apply(_ctx2, [
      /*feature*/
      ctx[37]].concat(args))
    );
  }

  function mouseleave_handler() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*mouseleave_handler*/
      (_ctx3 = ctx)[28].apply(_ctx3, [
      /*feature*/
      ctx[37]].concat(args))
    );
  }

  var block = {
    c: function create() {
      g = svg_element("g");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        id: true
      }, 1);
      var g_nodes = children(g);
      path = claim_element(g_nodes, "path", {
        d: true,
        style: true,
        class: true
      }, 1);
      children(path).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", path_d_value =
      /*geopath*/
      ctx[11](
      /*feature*/
      ctx[37]));
      set_style(path, "fill",
      /*feature*/
      ctx[37].properties.color || null);
      attr_dev(path, "class", "svelte-54gkh3");
      toggle_class(path, "clickable",
      /*isClickable*/
      ctx[16](
      /*feature*/
      ctx[37]));
      add_location(path, file$8, 129, 3, 3600);
      attr_dev(g, "class", "feature svelte-54gkh3");
      attr_dev(g, "id", g_id_value =
      /*feature*/
      ctx[37].properties[
      /*key*/
      ctx[8]] ||
      /*feature*/
      ctx[37].properties[
      /*key_alt*/
      ctx[2]]);
      toggle_class(g, "deselected",
      /*isDeselected*/
      ctx[15](
      /*feature*/
      ctx[37]));
      toggle_class(g, "selected",
      /*isSelected*/
      ctx[14](
      /*feature*/
      ctx[37]));
      toggle_class(g, "focused",
      /*focusedKey*/
      ctx[7] &&
      /*isFocused*/
      ctx[13](
      /*feature*/
      ctx[37]));
      add_location(g, file$8, 122, 2, 3372);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, path);

      if (!mounted) {
        dispose = [listen_dev(path, "click", click_handler, false, false, false), listen_dev(path, "mouseenter", mouseenter_handler, false, false, false), listen_dev(path, "mouseleave", mouseleave_handler, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*geopath, coloredGeojson*/
      3072 && path_d_value !== (path_d_value =
      /*geopath*/
      ctx[11](
      /*feature*/
      ctx[37]))) {
        attr_dev(path, "d", path_d_value);
      }

      if (dirty[0] &
      /*coloredGeojson*/
      1024) {
        set_style(path, "fill",
        /*feature*/
        ctx[37].properties.color || null);
      }

      if (dirty[0] &
      /*isClickable, coloredGeojson*/
      66560) {
        toggle_class(path, "clickable",
        /*isClickable*/
        ctx[16](
        /*feature*/
        ctx[37]));
      }

      if (dirty[0] &
      /*coloredGeojson, key, key_alt*/
      1284 && g_id_value !== (g_id_value =
      /*feature*/
      ctx[37].properties[
      /*key*/
      ctx[8]] ||
      /*feature*/
      ctx[37].properties[
      /*key_alt*/
      ctx[2]])) {
        attr_dev(g, "id", g_id_value);
      }

      if (dirty[0] &
      /*isDeselected, coloredGeojson*/
      33792) {
        toggle_class(g, "deselected",
        /*isDeselected*/
        ctx[15](
        /*feature*/
        ctx[37]));
      }

      if (dirty[0] &
      /*isSelected, coloredGeojson*/
      17408) {
        toggle_class(g, "selected",
        /*isSelected*/
        ctx[14](
        /*feature*/
        ctx[37]));
      }

      if (dirty[0] &
      /*focusedKey, isFocused, coloredGeojson*/
      9344) {
        toggle_class(g, "focused",
        /*focusedKey*/
        ctx[7] &&
        /*isFocused*/
        ctx[13](
        /*feature*/
        ctx[37]));
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$4.name,
    type: "each",
    source: "(122:2) {#each coloredGeojson.features as feature}",
    ctx: ctx
  });
  return block;
}

function create_fragment$e(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[4] &&
  /*width*/
  ctx[6] && create_if_block$5(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (
      /*height*/
      ctx[4] &&
      /*width*/
      ctx[6]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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

function instance$e($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var hasColor = isNotNullWith(getPath("properties.color"));
  var defaultTheme = {
    backgroundColor: "white",
    defaultFill: "white",
    defaultStroke: "grey",
    defaultStrokeWidth: 0.5,
    deselectedOpacity: 0.25,
    focusedStroke: "red",
    focusedStrokeWidth: 2,
    focusedDasharray: "",
    hoverFill: "#f6f6f6",
    hoverStroke: "black",
    hoverStrokedasharray: "",
    hoverStrokeWidth: 1.5,
    messageColor: "black",
    messageFontSize: "1rem",
    selectedStroke: "black",
    selectedStrokeWidth: 1
  };
  var height = $$props.height;
  var topojson = $$props.topojson;
  var topojsonId = $$props.topojsonId;
  var width = $$props.width;
  var focusedKey = $$props.focusedKey;
  var geometry = $$props.geometry;
  var isInteractive = $$props.isInteractive;
  var key_alt = $$props.key_alt;
  var key = $$props.key;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var message = $$props.message;
  var projection = $$props.projection;
  var projectionFn = $$props.projectionFn;
  var projectionId = $$props.projectionId;
  var selectedKeys = $$props.selectedKeys;
  var theme = $$props.theme;
  var writable_props = ["height", "topojson", "topojsonId", "width", "focusedKey", "geometry", "isInteractive", "key_alt", "key", "keyToColor", "keyToColorFn", "message", "projection", "projectionFn", "projectionId", "selectedKeys", "theme"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChoroplethG> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ChoroplethG", $$slots, []);

  var click_handler = function click_handler(feature) {
    return isClickable(feature) && dispatch("clicked", getPayload(feature));
  };

  var mouseenter_handler = function mouseenter_handler(feature) {
    return isInteractive && dispatch("entered", getPayload(feature));
  };

  var mouseleave_handler = function mouseleave_handler(feature) {
    return isInteractive && dispatch("exited", getPayload(feature));
  };

  $$self.$set = function ($$props) {
    if ("height" in $$props) $$invalidate(4, height = $$props.height);
    if ("topojson" in $$props) $$invalidate(5, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(23, topojsonId = $$props.topojsonId);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("focusedKey" in $$props) $$invalidate(7, focusedKey = $$props.focusedKey);
    if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(8, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("projection" in $$props) $$invalidate(18, projection = $$props.projection);
    if ("projectionFn" in $$props) $$invalidate(19, projectionFn = $$props.projectionFn);
    if ("projectionId" in $$props) $$invalidate(20, projectionId = $$props.projectionId);
    if ("selectedKeys" in $$props) $$invalidate(21, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(22, theme = $$props.theme);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      geoPath: geoPath,
      getPath: getPath,
      makeStyleVars: makeStyleVars,
      makeUpdateFeaturesProperty: makeUpdateFeaturesProperty,
      isNotNullWith: isNotNullWith,
      projections: projections,
      topoToGeo: topoToGeo,
      defaultGeometry: defaultGeometry,
      dispatch: dispatch,
      hasColor: hasColor,
      defaultTheme: defaultTheme,
      height: height,
      topojson: topojson,
      topojsonId: topojsonId,
      width: width,
      focusedKey: focusedKey,
      geometry: geometry,
      isInteractive: isInteractive,
      key_alt: key_alt,
      key: key,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      message: message,
      projection: projection,
      projectionFn: projectionFn,
      projectionId: projectionId,
      selectedKeys: selectedKeys,
      theme: theme,
      projectionFunc: projectionFunc,
      style: style,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      createColoredGeojson: createColoredGeojson,
      geojson: geojson,
      coloredGeojson: coloredGeojson,
      currentProjection: currentProjection,
      geopath: geopath,
      getPayload: getPayload,
      isFocused: isFocused,
      isSelected: isSelected,
      isDeselected: isDeselected,
      isClickable: isClickable
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("height" in $$props) $$invalidate(4, height = $$props.height);
    if ("topojson" in $$props) $$invalidate(5, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(23, topojsonId = $$props.topojsonId);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("focusedKey" in $$props) $$invalidate(7, focusedKey = $$props.focusedKey);
    if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(8, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("projection" in $$props) $$invalidate(18, projection = $$props.projection);
    if ("projectionFn" in $$props) $$invalidate(19, projectionFn = $$props.projectionFn);
    if ("projectionId" in $$props) $$invalidate(20, projectionId = $$props.projectionId);
    if ("selectedKeys" in $$props) $$invalidate(21, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(22, theme = $$props.theme);
    if ("projectionFunc" in $$props) $$invalidate(29, projectionFunc = $$props.projectionFunc);
    if ("style" in $$props) $$invalidate(9, style = $$props.style);
    if ("innerHeight" in $$props) $$invalidate(30, innerHeight = $$props.innerHeight);
    if ("innerWidth" in $$props) $$invalidate(31, innerWidth = $$props.innerWidth);
    if ("createColoredGeojson" in $$props) $$invalidate(32, createColoredGeojson = $$props.createColoredGeojson);
    if ("geojson" in $$props) $$invalidate(33, geojson = $$props.geojson);
    if ("coloredGeojson" in $$props) $$invalidate(10, coloredGeojson = $$props.coloredGeojson);
    if ("currentProjection" in $$props) $$invalidate(34, currentProjection = $$props.currentProjection);
    if ("geopath" in $$props) $$invalidate(11, geopath = $$props.geopath);
    if ("getPayload" in $$props) $$invalidate(12, getPayload = $$props.getPayload);
    if ("isFocused" in $$props) $$invalidate(13, isFocused = $$props.isFocused);
    if ("isSelected" in $$props) $$invalidate(14, isSelected = $$props.isSelected);
    if ("isDeselected" in $$props) $$invalidate(15, isDeselected = $$props.isDeselected);
    if ("isClickable" in $$props) $$invalidate(16, isClickable = $$props.isClickable);
  };

  var projectionFunc;
  var style;
  var innerHeight;
  var innerWidth;
  var createColoredGeojson;
  var geojson;
  var coloredGeojson;
  var currentProjection;
  var geopath;
  var getPayload;
  var isFocused;
  var isSelected;
  var isDeselected;
  var isClickable;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*geometry*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(0, geometry = geometry ? _objectSpread$3(_objectSpread$3({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    2) {
       $$invalidate(1, isInteractive = isInteractive || false);
    }

    if ($$self.$$.dirty[0] &
    /*message*/
    8) {
       $$invalidate(3, message = message || "No data");
    }

    if ($$self.$$.dirty[0] &
    /*projection*/
    262144) {
       $$invalidate(18, projection = projection || null);
    }

    if ($$self.$$.dirty[0] &
    /*projectionFn*/
    524288) {
       $$invalidate(19, projectionFn = projectionFn || null);
    }

    if ($$self.$$.dirty[0] &
    /*projectionId*/
    1048576) {
       $$invalidate(20, projectionId = projectionId || null);
    }

    if ($$self.$$.dirty[0] &
    /*key_alt*/
    4) {
       $$invalidate(2, key_alt = key_alt || "name");
    }

    if ($$self.$$.dirty[0] &
    /*projectionFn, projectionId*/
    1572864) {
       $$invalidate(29, projectionFunc = projectionFn || projectionId && projections[projectionId] || equirectangular);
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys*/
    2097152) {
       $$invalidate(21, selectedKeys = selectedKeys || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    4194304) {
       $$invalidate(22, theme = theme ? _objectSpread$3(_objectSpread$3({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    4194304) {
       $$invalidate(9, style = makeStyleVars(theme));
    }

    if ($$self.$$.dirty[0] &
    /*height, geometry*/
    17) {
       $$invalidate(30, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
    }

    if ($$self.$$.dirty[0] &
    /*width, geometry*/
    65) {
       $$invalidate(31, innerWidth = Math.max(0, width - geometry.left - geometry.right));
    }

    if ($$self.$$.dirty[0] &
    /*key_alt, key, keyToColor, keyToColorFn*/
    50331908) {
       $$invalidate(32, createColoredGeojson = makeUpdateFeaturesProperty({
        key_alt: key_alt,
        key: key,
        map: keyToColor,
        mapFn: keyToColorFn,
        propName: "color"
      }));
    }

    if ($$self.$$.dirty[0] &
    /*topojson, topojsonId*/
    8388640) {
       $$invalidate(33, geojson = topojson && topoToGeo(topojson, topojsonId));
    }

    if ($$self.$$.dirty[1] &
    /*geojson, createColoredGeojson*/
    6) {
       $$invalidate(10, coloredGeojson = geojson && createColoredGeojson(geojson));
    }

    if ($$self.$$.dirty[0] &
    /*projection, projectionFunc, innerHeight*/
    1610874880 | $$self.$$.dirty[1] &
    /*geojson, innerWidth*/
    5) {
       $$invalidate(34, currentProjection = projection || geojson && projectionFunc().fitSize([innerWidth, innerHeight], geojson));
    }

    if ($$self.$$.dirty[1] &
    /*currentProjection*/
    8) {
       $$invalidate(11, geopath = currentProjection && geoPath(currentProjection));
    }

    if ($$self.$$.dirty[0] &
    /*key, key_alt*/
    260) {
       $$invalidate(12, getPayload = function getPayload(feature) {
        return feature.properties[key] || feature.properties[key_alt];
      });
    }

    if ($$self.$$.dirty[0] &
    /*focusedKey, getPayload*/
    4224) {
       $$invalidate(13, isFocused = function isFocused(feature) {
        return focusedKey === getPayload(feature);
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    2101248) {
       $$invalidate(14, isSelected = function isSelected(feature) {
        return selectedKeys.length && selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    2101248) {
       $$invalidate(15, isDeselected = function isDeselected(feature) {
        return selectedKeys.length && !selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    2) {
       $$invalidate(16, isClickable = function isClickable(feature) {
        return isInteractive && hasColor(feature);
      });
    }
  };

  return [geometry, isInteractive, key_alt, message, height, topojson, width, focusedKey, key, style, coloredGeojson, geopath, getPayload, isFocused, isSelected, isDeselected, isClickable, dispatch, projection, projectionFn, projectionId, selectedKeys, theme, topojsonId, keyToColor, keyToColorFn, click_handler, mouseenter_handler, mouseleave_handler];
}

var ChoroplethG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethG, _SvelteComponentDev);

  var _super = _createSuper$e(ChoroplethG);

  function ChoroplethG(options) {
    var _this;

    _classCallCheck(this, ChoroplethG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      height: 4,
      topojson: 5,
      topojsonId: 23,
      width: 6,
      focusedKey: 7,
      geometry: 0,
      isInteractive: 1,
      key_alt: 2,
      key: 8,
      keyToColor: 24,
      keyToColorFn: 25,
      message: 3,
      projection: 18,
      projectionFn: 19,
      projectionId: 20,
      selectedKeys: 21,
      theme: 22
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChoroplethG",
      options: options,
      id: create_fragment$e.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*height*/
    ctx[4] === undefined && !("height" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'height'");
    }

    if (
    /*topojson*/
    ctx[5] === undefined && !("topojson" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'topojson'");
    }

    if (
    /*topojsonId*/
    ctx[23] === undefined && !("topojsonId" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'topojsonId'");
    }

    if (
    /*width*/
    ctx[6] === undefined && !("width" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'width'");
    }

    if (
    /*focusedKey*/
    ctx[7] === undefined && !("focusedKey" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'focusedKey'");
    }

    if (
    /*geometry*/
    ctx[0] === undefined && !("geometry" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'geometry'");
    }

    if (
    /*isInteractive*/
    ctx[1] === undefined && !("isInteractive" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'isInteractive'");
    }

    if (
    /*key_alt*/
    ctx[2] === undefined && !("key_alt" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'key_alt'");
    }

    if (
    /*key*/
    ctx[8] === undefined && !("key" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'key'");
    }

    if (
    /*keyToColor*/
    ctx[24] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[25] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*message*/
    ctx[3] === undefined && !("message" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'message'");
    }

    if (
    /*projection*/
    ctx[18] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'projection'");
    }

    if (
    /*projectionFn*/
    ctx[19] === undefined && !("projectionFn" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'projectionFn'");
    }

    if (
    /*projectionId*/
    ctx[20] === undefined && !("projectionId" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'projectionId'");
    }

    if (
    /*selectedKeys*/
    ctx[21] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'selectedKeys'");
    }

    if (
    /*theme*/
    ctx[22] === undefined && !("theme" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'theme'");
    }

    return _this;
  }

  _createClass(ChoroplethG, [{
    key: "height",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojson",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojsonId",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedKey",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key_alt",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projection",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projectionFn",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projectionId",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedKeys",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ChoroplethG;
}(SvelteComponentDev);

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte"; // (43:1) {#if title}

function create_if_block$6(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*title*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-77ac80");
      add_location(h2, file$9, 44, 2, 856);
      attr_dev(header, "class", "svelte-77ac80");
      add_location(header, file$9, 43, 1, 845);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      append_dev(header, h2);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data_dev(t,
      /*title*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(43:1) {#if title}",
    ctx: ctx
  });
  return block;
}

function create_fragment$f(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var choroplethg;
  var main_resize_listener;
  var current;
  var if_block =
  /*title*/
  ctx[0] && create_if_block$6(ctx);
  choroplethg = new ChoroplethG({
    props: {
      focusedKey:
      /*focusedKey*/
      ctx[3],
      geometry:
      /*geometry*/
      ctx[4],
      height:
      /*height*/
      ctx[16],
      isInteractive:
      /*isInteractive*/
      ctx[5],
      key_alt:
      /*key_alt*/
      ctx[6],
      key:
      /*key*/
      ctx[7],
      keyToColor:
      /*keyToColor*/
      ctx[8],
      keyToColorFn:
      /*keyToColorFn*/
      ctx[9],
      message:
      /*message*/
      ctx[10],
      projection:
      /*projection*/
      ctx[11],
      projectionFn:
      /*projectionFn*/
      ctx[12],
      projectionId:
      /*projectionId*/
      ctx[13],
      selectedKeys:
      /*selectedKeys*/
      ctx[14],
      theme:
      /*theme*/
      ctx[15],
      topojson:
      /*topojson*/
      ctx[1],
      topojsonId:
      /*topojsonId*/
      ctx[2],
      width:
      /*width*/
      ctx[17]
    },
    $$inline: true
  });
  choroplethg.$on("clicked",
  /*clicked_handler*/
  ctx[21]);
  choroplethg.$on("entered",
  /*entered_handler*/
  ctx[22]);
  choroplethg.$on("exited",
  /*exited_handler*/
  ctx[23]);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block) if_block.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");
      create_component(choroplethg.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block) if_block.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      svg = claim_element(main_nodes, "svg", {
        width: true,
        height: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      claim_component(choroplethg.$$.fragment, svg_nodes);
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[17]);
      attr_dev(svg, "height",
      /*height*/
      ctx[16]);
      attr_dev(svg, "class", "svelte-77ac80");
      add_location(svg, file$9, 52, 2, 998);
      attr_dev(main, "class", "svelte-77ac80");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[24].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[0] &&
      /*title*/
      ctx[0].length);
      add_location(main, file$9, 47, 1, 892);
      attr_dev(div, "class", "ChoroplethDiv svelte-77ac80");
      attr_dev(div, "style",
      /*style*/
      ctx[18]);
      toggle_class(div, "interactive",
      /*isInteractive*/
      ctx[5]);
      add_location(div, file$9, 37, 0, 757);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      append_dev(main, svg);
      mount_component(choroplethg, svg, null);
      main_resize_listener = add_resize_listener(main,
      /*main_elementresize_handler*/
      ctx[24].bind(main));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*title*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          if_block.m(div, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      var choroplethg_changes = {};
      if (dirty &
      /*focusedKey*/
      8) choroplethg_changes.focusedKey =
      /*focusedKey*/
      ctx[3];
      if (dirty &
      /*geometry*/
      16) choroplethg_changes.geometry =
      /*geometry*/
      ctx[4];
      if (dirty &
      /*height*/
      65536) choroplethg_changes.height =
      /*height*/
      ctx[16];
      if (dirty &
      /*isInteractive*/
      32) choroplethg_changes.isInteractive =
      /*isInteractive*/
      ctx[5];
      if (dirty &
      /*key_alt*/
      64) choroplethg_changes.key_alt =
      /*key_alt*/
      ctx[6];
      if (dirty &
      /*key*/
      128) choroplethg_changes.key =
      /*key*/
      ctx[7];
      if (dirty &
      /*keyToColor*/
      256) choroplethg_changes.keyToColor =
      /*keyToColor*/
      ctx[8];
      if (dirty &
      /*keyToColorFn*/
      512) choroplethg_changes.keyToColorFn =
      /*keyToColorFn*/
      ctx[9];
      if (dirty &
      /*message*/
      1024) choroplethg_changes.message =
      /*message*/
      ctx[10];
      if (dirty &
      /*projection*/
      2048) choroplethg_changes.projection =
      /*projection*/
      ctx[11];
      if (dirty &
      /*projectionFn*/
      4096) choroplethg_changes.projectionFn =
      /*projectionFn*/
      ctx[12];
      if (dirty &
      /*projectionId*/
      8192) choroplethg_changes.projectionId =
      /*projectionId*/
      ctx[13];
      if (dirty &
      /*selectedKeys*/
      16384) choroplethg_changes.selectedKeys =
      /*selectedKeys*/
      ctx[14];
      if (dirty &
      /*theme*/
      32768) choroplethg_changes.theme =
      /*theme*/
      ctx[15];
      if (dirty &
      /*topojson*/
      2) choroplethg_changes.topojson =
      /*topojson*/
      ctx[1];
      if (dirty &
      /*topojsonId*/
      4) choroplethg_changes.topojsonId =
      /*topojsonId*/
      ctx[2];
      if (dirty &
      /*width*/
      131072) choroplethg_changes.width =
      /*width*/
      ctx[17];
      choroplethg.$set(choroplethg_changes);

      if (!current || dirty &
      /*width*/
      131072) {
        attr_dev(svg, "width",
        /*width*/
        ctx[17]);
      }

      if (!current || dirty &
      /*height*/
      65536) {
        attr_dev(svg, "height",
        /*height*/
        ctx[16]);
      }

      if (dirty &
      /*title*/
      1) {
        toggle_class(main, "titled",
        /*title*/
        ctx[0] &&
        /*title*/
        ctx[0].length);
      }

      if (!current || dirty &
      /*style*/
      262144) {
        attr_dev(div, "style",
        /*style*/
        ctx[18]);
      }

      if (dirty &
      /*isInteractive*/
      32) {
        toggle_class(div, "interactive",
        /*isInteractive*/
        ctx[5]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(choroplethg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(choroplethg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block) if_block.d();
      destroy_component(choroplethg);
      main_resize_listener();
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

function instance$f($$self, $$props, $$invalidate) {
  var headerHeight = $$props.headerHeight;
  var padding = $$props.padding;
  var title = $$props.title;
  var topojson = $$props.topojson;
  var topojsonId = $$props.topojsonId;
  var focusedKey = $$props.focusedKey;
  var geometry = $$props.geometry;
  var isInteractive = $$props.isInteractive;
  var key_alt = $$props.key_alt;
  var key = $$props.key;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var message = $$props.message;
  var projection = $$props.projection;
  var projectionFn = $$props.projectionFn;
  var projectionId = $$props.projectionId;
  var selectedKeys = $$props.selectedKeys;
  var theme = $$props.theme;
  var height = 0;
  var width = 0;
  var writable_props = ["headerHeight", "padding", "title", "topojson", "topojsonId", "focusedKey", "geometry", "isInteractive", "key_alt", "key", "keyToColor", "keyToColorFn", "message", "projection", "projectionFn", "projectionId", "selectedKeys", "theme"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChoroplethDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ChoroplethDiv", $$slots, []);

  function clicked_handler(event) {
    bubble($$self, event);
  }

  function entered_handler(event) {
    bubble($$self, event);
  }

  function exited_handler(event) {
    bubble($$self, event);
  }

  function main_elementresize_handler() {
    width = this.clientWidth;
    height = this.clientHeight;
    $$invalidate(17, width);
    $$invalidate(16, height);
  }

  $$self.$set = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(19, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(20, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("topojson" in $$props) $$invalidate(1, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
    if ("focusedKey" in $$props) $$invalidate(3, focusedKey = $$props.focusedKey);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(5, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(6, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(7, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(8, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(9, keyToColorFn = $$props.keyToColorFn);
    if ("message" in $$props) $$invalidate(10, message = $$props.message);
    if ("projection" in $$props) $$invalidate(11, projection = $$props.projection);
    if ("projectionFn" in $$props) $$invalidate(12, projectionFn = $$props.projectionFn);
    if ("projectionId" in $$props) $$invalidate(13, projectionId = $$props.projectionId);
    if ("selectedKeys" in $$props) $$invalidate(14, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(15, theme = $$props.theme);
  };

  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      ChoroplethG: ChoroplethG,
      headerHeight: headerHeight,
      padding: padding,
      title: title,
      topojson: topojson,
      topojsonId: topojsonId,
      focusedKey: focusedKey,
      geometry: geometry,
      isInteractive: isInteractive,
      key_alt: key_alt,
      key: key,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      message: message,
      projection: projection,
      projectionFn: projectionFn,
      projectionId: projectionId,
      selectedKeys: selectedKeys,
      theme: theme,
      height: height,
      width: width,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(19, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(20, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("topojson" in $$props) $$invalidate(1, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
    if ("focusedKey" in $$props) $$invalidate(3, focusedKey = $$props.focusedKey);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(5, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(6, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(7, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(8, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(9, keyToColorFn = $$props.keyToColorFn);
    if ("message" in $$props) $$invalidate(10, message = $$props.message);
    if ("projection" in $$props) $$invalidate(11, projection = $$props.projection);
    if ("projectionFn" in $$props) $$invalidate(12, projectionFn = $$props.projectionFn);
    if ("projectionId" in $$props) $$invalidate(13, projectionId = $$props.projectionId);
    if ("selectedKeys" in $$props) $$invalidate(14, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(15, theme = $$props.theme);
    if ("height" in $$props) $$invalidate(16, height = $$props.height);
    if ("width" in $$props) $$invalidate(17, width = $$props.width);
    if ("style" in $$props) $$invalidate(18, style = $$props.style);
  };

  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*padding*/
    1048576) {
       $$invalidate(20, padding = padding || "10px");
    }

    if ($$self.$$.dirty &
    /*headerHeight*/
    524288) {
       $$invalidate(19, headerHeight = headerHeight || "2rem");
    }

    if ($$self.$$.dirty &
    /*headerHeight, padding*/
    1572864) {
       $$invalidate(18, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };

  return [title, topojson, topojsonId, focusedKey, geometry, isInteractive, key_alt, key, keyToColor, keyToColorFn, message, projection, projectionFn, projectionId, selectedKeys, theme, height, width, style, headerHeight, padding, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}

var ChoroplethDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethDiv, _SvelteComponentDev);

  var _super = _createSuper$f(ChoroplethDiv);

  function ChoroplethDiv(options) {
    var _this;

    _classCallCheck(this, ChoroplethDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
      headerHeight: 19,
      padding: 20,
      title: 0,
      topojson: 1,
      topojsonId: 2,
      focusedKey: 3,
      geometry: 4,
      isInteractive: 5,
      key_alt: 6,
      key: 7,
      keyToColor: 8,
      keyToColorFn: 9,
      message: 10,
      projection: 11,
      projectionFn: 12,
      projectionId: 13,
      selectedKeys: 14,
      theme: 15
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChoroplethDiv",
      options: options,
      id: create_fragment$f.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*headerHeight*/
    ctx[19] === undefined && !("headerHeight" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'headerHeight'");
    }

    if (
    /*padding*/
    ctx[20] === undefined && !("padding" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'padding'");
    }

    if (
    /*title*/
    ctx[0] === undefined && !("title" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'title'");
    }

    if (
    /*topojson*/
    ctx[1] === undefined && !("topojson" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'topojson'");
    }

    if (
    /*topojsonId*/
    ctx[2] === undefined && !("topojsonId" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'topojsonId'");
    }

    if (
    /*focusedKey*/
    ctx[3] === undefined && !("focusedKey" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'focusedKey'");
    }

    if (
    /*geometry*/
    ctx[4] === undefined && !("geometry" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'geometry'");
    }

    if (
    /*isInteractive*/
    ctx[5] === undefined && !("isInteractive" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
    }

    if (
    /*key_alt*/
    ctx[6] === undefined && !("key_alt" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'key_alt'");
    }

    if (
    /*key*/
    ctx[7] === undefined && !("key" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'key'");
    }

    if (
    /*keyToColor*/
    ctx[8] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[9] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*message*/
    ctx[10] === undefined && !("message" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'message'");
    }

    if (
    /*projection*/
    ctx[11] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'projection'");
    }

    if (
    /*projectionFn*/
    ctx[12] === undefined && !("projectionFn" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'projectionFn'");
    }

    if (
    /*projectionId*/
    ctx[13] === undefined && !("projectionId" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'projectionId'");
    }

    if (
    /*selectedKeys*/
    ctx[14] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
    }

    if (
    /*theme*/
    ctx[15] === undefined && !("theme" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'theme'");
    }

    return _this;
  }

  _createClass(ChoroplethDiv, [{
    key: "headerHeight",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojson",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojsonId",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedKey",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key_alt",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projection",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projectionFn",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projectionId",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedKeys",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ChoroplethDiv;
}(SvelteComponentDev);

var choropleth = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ChoroplethG: ChoroplethG,
	ChoroplethDiv: ChoroplethDiv
});

/**
* @module @svizzle/geometry/2DVector
*/

/**
 * Calculates the length of a vector
 *
 * @function
 * @arg {object} point - A point representing a vector starting in the origin
 * @return {number} - The vector length
 *
 * @example
> vectorLength2D(1, 1)
1.4142135623730951
> vectorLength2D(0, 0)
0
 *
 * @version 0.1.0
 */
var vectorLength2D = function vectorLength2D(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
};

/* binning */

/**
 * A binning function that returns an exact amount of bins.
 *
 * @function
 * @arg {array} items - items to be binned
 * @arg {number} amount - desired amount of bins
 * @arg {function} [accessor=_.identity] - item accessor
 * @arg {(number[]|null)} [maxExtent=null] - the desired output extent
 * @return {array} bins - {range, values}[]
 *
 * @example
> const items = [1, 2, 6, 7, 8, 14, 20];
> exactAmountBins({array: items, amount: 3});
[
	{range: [1, 8], values: [1, 2, 6, 7, 8]},
	{range: [8, 15], values: [14]},
	{range: [15, 22], values: [20]}
]
> exactAmountBins({
	array,
	amount: 3,
	maxExtent: [2, 15]
})
[
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
]
> const items = [{a: 1}, {a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}, {a: 20}];
> exactAmountBins({
	array,
	amount: 3,
	accessor: _.getKey('a'),
	maxExtent: [2, 14]
});
[
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
]
 *
 * @version 0.1.0
 */

var exactAmountBins = function exactAmountBins(_ref) {
  var array = _ref.array,
      amount = _ref.amount,
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === void 0 ? identity : _ref$accessor,
      _ref$maxExtent = _ref.maxExtent,
      maxExtent = _ref$maxExtent === void 0 ? null : _ref$maxExtent;
  var activeRange = maxExtent ? sort(maxExtent) : extent(array, accessor);

  var _activeRange = _slicedToArray(activeRange, 2),
      min = _activeRange[0],
      max = _activeRange[1];

  if (min === max) {
    return [{
      values: array
    }];
  }

  var integerMin = Math.floor(min);
  var step = Math.ceil((max - integerMin) / amount);
  var integerMax = integerMin + step * amount;
  var ranges = pairs(inclusiveRange([integerMin, integerMax, step])); // TODO svizzle

  var findRangeIndex = adapter(map(ranges, function (range, index) {
    var predicate = pipe([accessor, allOf([makeIsWithinRange(activeRange), makeIsWithinRange(range)])]);

    return function (value) {
      return predicate(value) ? index : undefined;
    };
  }));

  return reduce(array, function (acc, item) {
    var index = findRangeIndex(item);
    isNotNil(index) && acc[index].values.push(item);
    return acc;
  }, map(ranges, function (range) {
    return {
      range: range,
      values: []
    };
  }));
};
/* bins getters and functions */

/**
 * Returns true if bins are valid, meaning:
 * - there is at least one bin object
 * - they all have a `range` key
 * - `range` is not `null` or `undefined`
 *
 * @function
 * @arg {array} bins
 * @return {array} bins - {range, values}[]
 *
 * @example
> areValidBins([])
false
> areValidBins([
	{values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false
> areValidBins([
	{range: null, values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false
> areValidBins([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
true
 *
 * @version 0.1.0
 */

var areValidBins = allOf([isIterableNotEmpty, every(allOf([hasKey('range'), pipe([getKey$3('range'), isNotNil])]))]);
/**
 * Return all the values in the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {any[]} values
 *
 * @example
> getBinsItems([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
[{a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}]
 *
 * @version 0.1.0
 */

var getBinsItems = pipe([mapWith(getValues), flatten]);
var getValuesLength = getPath('values.length');
/**
 * Return the length of the longest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} max - length of the longest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
3
 *
 * @version 0.1.0
 */

var getBinsMax = arrayMaxWith(getValuesLength);
/**
 * Return the length of the shortest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} min - length of the shortest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
1
 *
 * @version 0.1.0
 */

var getBinsMin = arrayMinWith(getValuesLength);
/**
 * Return the extent of the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {array} extent
 *
 * @example
> getBinsExtent([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
[1, 3]
 *
 * @version 0.1.0
 */

var getBinsExtent = collect([getBinsMin, getBinsMax]);
/**
 * Return `true` if the `values` property of the provided bin is not empty
 *
 * @function
 * @arg {object} bin - {range, values}
 * @return {boolean}
 *
 * @example
> isNonEmptyBin({range: [-8, -3], values: []})
false
> isNonEmptyBin({range: [2, 7], values: [2, 6, 7]})
true
 *
 * @version 0.1.0
 */

var isNonEmptyBin = pipe([getValues, isIterableNotEmpty]);
/**
 * Return the index of the first bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findFirstNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
2
 *
 * @version 0.1.0
 */

var findFirstNonEmptyBinIndex = findIndexWhere(isNonEmptyBin);
/**
 * Return the index of the last bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findLastNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
4
 *
 * @version 0.1.0
 */

var findLastNonEmptyBinIndex = findLastIndexWhere(isNonEmptyBin);
/**
 * Return an object containing:
 * - a copy of the provided bins without the trailing bins with no values
 * - `start` and `end` of the trim
 *
 * @function
 * @arg {array} bins
 * @return {object} object - {bins, end, start}
 *
 * @example
> getTrimmedBinsStats([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 4,
	start: 2
}
> getTrimmedBinsStats([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 2,
	start: 0
}
 *
 * @version 0.1.0
 */

var getTrimmedBinsStats = function getTrimmedBinsStats(bins) {
  var start = findFirstNonEmptyBinIndex(bins);
  var end = findLastNonEmptyBinIndex(bins);
  return {
    bins: slice(bins, start, end + 1),
    end: end,
    start: start
  };
};
/* ticks */

/**
 * Return the ticks for the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[-8, -3, 2, 7, 12, 17, 22, 27, 32]
 *
 * @version 0.1.0
 */

var getBinsTicks = pipe([mapWith(getKey$3('range')), flatten, uniques]);
/**
 * Return the ticks for the provided bins using the non-empty ones
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getNonEmptyBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[2, 7, 17, 22, 27]
 *
 * @version 0.1.0
 */

var getNonEmptyBinsTicks = pipe([filterWith(getValuesLength), getBinsTicks]);

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$a = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsG.svelte";

function get_each_context$5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[48] = list[i].label;
  child_ctx[49] = list[i].x;
  child_ctx[50] = list[i].y;
  return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[53] = list[i].barWidth;
  child_ctx[54] = list[i].barHeight;
  child_ctx[55] = list[i].fill;
  child_ctx[56] = list[i].selected;
  child_ctx[49] = list[i].x;
  child_ctx[50] = list[i].y;
  child_ctx[58] = i;
  return child_ctx;
} // (294:0) {#if height && width && scale}


function create_if_block$7(ctx) {
  var g2;
  var if_block0_anchor;
  var g1;
  var g0;
  var rect;
  var rect_height_value;
  var rect_width_value;
  var if_block2_anchor;
  var g1_transform_value;
  var mounted;
  var dispose;
  var if_block0 =
  /*flags*/
  ctx[0].withBackground && create_if_block_6(ctx);
  var if_block1 =
  /*flags*/
  ctx[0].isInteractive && create_if_block_5(ctx);
  var each_value_1 =
  /*bars*/
  ctx[10];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var if_block2 =
  /*flags*/
  ctx[0].showTicks && create_if_block_3$2(ctx);
  var if_block3 =
  /*isBrushing*/
  ctx[12] && create_if_block_1$5(ctx);
  var block = {
    c: function create() {
      g2 = svg_element("g");
      if (if_block0) if_block0.c();
      if_block0_anchor = empty();
      if (if_block1) if_block1.c();
      g1 = svg_element("g");
      g0 = svg_element("g");
      rect = svg_element("rect");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
      if (if_block3) if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      g2 = claim_element(nodes, "g", {
        style: true,
        class: true
      }, 1);
      var g2_nodes = children(g2);
      if (if_block0) if_block0.l(g2_nodes);
      if_block0_anchor = empty();
      if (if_block1) if_block1.l(g2_nodes);
      g1 = claim_element(g2_nodes, "g", {
        transform: true
      }, 1);
      var g1_nodes = children(g1);
      g0 = claim_element(g1_nodes, "g", {
        class: true
      }, 1);
      var g0_nodes = children(g0);
      rect = claim_element(g0_nodes, "rect", {
        class: true,
        height: true,
        width: true
      }, 1);
      children(rect).forEach(detach_dev);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(g0_nodes);
      }

      g0_nodes.forEach(detach_dev);
      if (if_block2) if_block2.l(g1_nodes);
      if_block2_anchor = empty();
      if (if_block3) if_block3.l(g1_nodes);
      g1_nodes.forEach(detach_dev);
      g2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "barsSensorBkg svelte-7e9eom");
      attr_dev(rect, "height", rect_height_value =
      /*binsSize*/
      ctx[8].height);
      attr_dev(rect, "width", rect_width_value =
      /*binsSize*/
      ctx[8].width);
      add_location(rect, file$a, 322, 3, 7527);
      attr_dev(g0, "class", "bars");
      add_location(g0, file$a, 318, 2, 7471);
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*origin*/
      ctx[7].x + "," +
      /*origin*/
      ctx[7].y + ")");
      add_location(g1, file$a, 315, 1, 7403);
      attr_dev(g2, "style",
      /*style*/
      ctx[14]);
      attr_dev(g2, "class", "ColorBinsG svelte-7e9eom");
      toggle_class(g2, "interactive",
      /*flags*/
      ctx[0].isInteractive);
      add_location(g2, file$a, 294, 0, 7034);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g2, anchor);
      if (if_block0) if_block0.m(g2, null);
      append_dev(g2, if_block0_anchor);
      if (if_block1) if_block1.m(g2, null);
      append_dev(g2, g1);
      append_dev(g1, g0);
      append_dev(g0, rect);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g0, null);
      }

      if (if_block2) if_block2.m(g1, null);
      append_dev(g1, if_block2_anchor);
      if (if_block3) if_block3.m(g1, null);

      if (!mounted) {
        dispose = listen_dev(g0, "mouseleave",
        /*resetBrush*/
        ctx[21], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*flags*/
      ctx[0].withBackground) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_6(ctx);
          if_block0.c();
          if_block0.m(g2, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*flags*/
      ctx[0].isInteractive) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_5(ctx);
          if_block1.c();
          if_block1.m(g2, g1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*binsSize*/
      256 && rect_height_value !== (rect_height_value =
      /*binsSize*/
      ctx[8].height)) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*binsSize*/
      256 && rect_width_value !== (rect_width_value =
      /*binsSize*/
      ctx[8].width)) {
        attr_dev(rect, "width", rect_width_value);
      }

      if (dirty[0] &
      /*bars, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags*/
      2032705) {
        each_value_1 =
        /*bars*/
        ctx[10];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(g0, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_1.length;
      }

      if (
      /*flags*/
      ctx[0].showTicks) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_3$2(ctx);
          if_block2.c();
          if_block2.m(g1, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (
      /*isBrushing*/
      ctx[12]) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_1$5(ctx);
          if_block3.c();
          if_block3.m(g1, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (dirty[0] &
      /*origin*/
      128 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*origin*/
      ctx[7].x + "," +
      /*origin*/
      ctx[7].y + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }

      if (dirty[0] &
      /*style*/
      16384) {
        attr_dev(g2, "style",
        /*style*/
        ctx[14]);
      }

      if (dirty[0] &
      /*flags*/
      1) {
        toggle_class(g2, "interactive",
        /*flags*/
        ctx[0].isInteractive);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g2);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      destroy_each(each_blocks, detaching);
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$7.name,
    type: "if",
    source: "(294:0) {#if height && width && scale}",
    ctx: ctx
  });
  return block;
} // (301:1) {#if flags.withBackground}


function create_if_block_6(ctx) {
  var rect;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        class: true,
        width: true,
        height: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-7e9eom");
      attr_dev(rect, "width",
      /*width*/
      ctx[5]);
      attr_dev(rect, "height",
      /*height*/
      ctx[4]);
      add_location(rect, file$a, 301, 1, 7159);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*width*/
      32) {
        attr_dev(rect, "width",
        /*width*/
        ctx[5]);
      }

      if (dirty[0] &
      /*height*/
      16) {
        attr_dev(rect, "height",
        /*height*/
        ctx[4]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(301:1) {#if flags.withBackground}",
    ctx: ctx
  });
  return block;
} // (306:1) {#if flags.isInteractive}


function create_if_block_5(ctx) {
  var rect;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[4]);
      attr_dev(rect, "width",
      /*width*/
      ctx[5]);
      attr_dev(rect, "class", "bkgSensor svelte-7e9eom");
      toggle_class(rect, "reset",
      /*selectedBins*/
      ctx[2].length > 0);
      add_location(rect, file$a, 306, 1, 7275);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = listen_dev(rect, "click",
        /*resetSelection*/
        ctx[22], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      16) {
        attr_dev(rect, "height",
        /*height*/
        ctx[4]);
      }

      if (dirty[0] &
      /*width*/
      32) {
        attr_dev(rect, "width",
        /*width*/
        ctx[5]);
      }

      if (dirty[0] &
      /*selectedBins*/
      4) {
        toggle_class(rect, "reset",
        /*selectedBins*/
        ctx[2].length > 0);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(306:1) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (347:4) {#if flags.isInteractive}


function create_if_block_4$1(ctx) {
  var rect;
  var rect_height_value;
  var rect_width_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        class: true,
        height: true,
        width: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "rectsensor svelte-7e9eom");
      attr_dev(rect, "height", rect_height_value =
      /*barHeight*/
      ctx[54]);
      attr_dev(rect, "width", rect_width_value =
      /*barWidth*/
      ctx[53]);
      add_location(rect, file$a, 347, 4, 7912);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = [listen_dev(rect, "mousedown",
        /*onMousedown*/
        ctx[17], false, false, false), listen_dev(rect, "mouseover",
        /*onMouseenter*/
        ctx[16](
        /*index*/
        ctx[58]), false, false, false), listen_dev(rect, "mouseout",
        /*onMouseleave*/
        ctx[20](
        /*index*/
        ctx[58]), false, false, false), listen_dev(rect, "mousemove", function () {
          if (is_function(
          /*isMousedown*/
          ctx[6] ?
          /*onMousemove*/
          ctx[18](
          /*index*/
          ctx[58]) : null)) (
          /*isMousedown*/
          ctx[6] ?
          /*onMousemove*/
          ctx[18](
          /*index*/
          ctx[58]) : null).apply(this, arguments);
        }, false, false, false), listen_dev(rect, "mouseup",
        /*onMouseup*/
        ctx[19](
        /*index*/
        ctx[58]), false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*bars*/
      1024 && rect_height_value !== (rect_height_value =
      /*barHeight*/
      ctx[54])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*bars*/
      1024 && rect_width_value !== (rect_width_value =
      /*barWidth*/
      ctx[53])) {
        attr_dev(rect, "width", rect_width_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(347:4) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }


function create_each_block_1$1(ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var rect_height_value;
  var rect_width_value;
  var g_transform_value;
  var if_block =
  /*flags*/
  ctx[0].isInteractive && create_if_block_4$1(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        fill: true,
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      if (if_block) if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "fill", rect_fill_value =
      /*fill*/
      ctx[55]);
      attr_dev(rect, "height", rect_height_value =
      /*barHeight*/
      ctx[54]);
      attr_dev(rect, "width", rect_width_value =
      /*barWidth*/
      ctx[53]);
      attr_dev(rect, "class", "svelte-7e9eom");
      toggle_class(rect, "selected",
      /*selected*/
      ctx[56]);
      add_location(rect, file$a, 340, 4, 7787);
      attr_dev(g, "class", "bar svelte-7e9eom");
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*x*/
      ctx[49] + "," +
      /*y*/
      ctx[50] + ")");
      add_location(g, file$a, 336, 3, 7724);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, rect);
      if (if_block) if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*bars*/
      1024 && rect_fill_value !== (rect_fill_value =
      /*fill*/
      ctx[55])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*bars*/
      1024 && rect_height_value !== (rect_height_value =
      /*barHeight*/
      ctx[54])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*bars*/
      1024 && rect_width_value !== (rect_width_value =
      /*barWidth*/
      ctx[53])) {
        attr_dev(rect, "width", rect_width_value);
      }

      if (dirty[0] &
      /*bars*/
      1024) {
        toggle_class(rect, "selected",
        /*selected*/
        ctx[56]);
      }

      if (
      /*flags*/
      ctx[0].isInteractive) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_4$1(ctx);
          if_block.c();
          if_block.m(g, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty[0] &
      /*bars*/
      1024 && g_transform_value !== (g_transform_value = "translate(" +
      /*x*/
      ctx[49] + "," +
      /*y*/
      ctx[50] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }",
    ctx: ctx
  });
  return block;
} // (364:2) {#if flags.showTicks}


function create_if_block_3$2(ctx) {
  var g;
  var g_font_size_value;
  var each_value =
  /*ticks*/
  ctx[11];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      g = svg_element("g");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        "font-size": true
      }, 1);
      var g_nodes = children(g);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(g_nodes);
      }

      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "class", "ticks svelte-7e9eom");
      attr_dev(g, "font-size", g_font_size_value =
      /*theme*/
      ctx[3].fontSize);
      toggle_class(g, "vertical",
      /*flags*/
      ctx[0].isVertical);
      add_location(g, file$a, 364, 2, 8281);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(g, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      2048) {
        each_value =
        /*ticks*/
        ctx[11];
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context$5(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block$5(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(g, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty[0] &
      /*theme*/
      8 && g_font_size_value !== (g_font_size_value =
      /*theme*/
      ctx[3].fontSize)) {
        attr_dev(g, "font-size", g_font_size_value);
      }

      if (dirty[0] &
      /*flags*/
      1) {
        toggle_class(g, "vertical",
        /*flags*/
        ctx[0].isVertical);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$2.name,
    type: "if",
    source: "(364:2) {#if flags.showTicks}",
    ctx: ctx
  });
  return block;
} // (370:3) {#each ticks as {label, x, y}}


function create_each_block$5(ctx) {
  var text_1;
  var t_value =
  /*label*/
  ctx[48] + "";
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        x: true,
        y: true,
        class: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "x", text_1_x_value =
      /*x*/
      ctx[49]);
      attr_dev(text_1, "y", text_1_y_value =
      /*y*/
      ctx[50]);
      attr_dev(text_1, "class", "svelte-7e9eom");
      add_location(text_1, file$a, 370, 3, 8409);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      2048 && t_value !== (t_value =
      /*label*/
      ctx[48] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*ticks*/
      2048 && text_1_x_value !== (text_1_x_value =
      /*x*/
      ctx[49])) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*ticks*/
      2048 && text_1_y_value !== (text_1_y_value =
      /*y*/
      ctx[50])) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$5.name,
    type: "each",
    source: "(370:3) {#each ticks as {label, x, y}}",
    ctx: ctx
  });
  return block;
} // (377:2) {#if isBrushing}


function create_if_block_1$5(ctx) {
  var g;

  function select_block_type(ctx, dirty) {
    if (
    /*flags*/
    ctx[0].isVertical) return create_if_block_2$4;
    return create_else_block$3;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true
      }, 1);
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "class", "brush svelte-7e9eom");
      add_location(g, file$a, 377, 2, 8503);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$5.name,
    type: "if",
    source: "(377:2) {#if isBrushing}",
    ctx: ctx
  });
  return block;
} // (386:3) {:else}


function create_else_block$3(ctx) {
  var line;
  var line_x__value;
  var line_x__value_1;
  var line_y__value;
  var line_y__value_1;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_element(nodes, "line", {
        x1: true,
        x2: true,
        y1: true,
        y2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "x1", line_x__value =
      /*brushLine*/
      ctx[13].p1);
      attr_dev(line, "x2", line_x__value_1 =
      /*brushLine*/
      ctx[13].p2);
      attr_dev(line, "y1", line_y__value =
      /*geometry*/
      ctx[1].barThickness);
      attr_dev(line, "y2", line_y__value_1 =
      /*geometry*/
      ctx[1].barThickness);
      attr_dev(line, "class", "svelte-7e9eom");
      add_location(line, file$a, 386, 3, 8626);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*brushLine*/
      8192 && line_x__value !== (line_x__value =
      /*brushLine*/
      ctx[13].p1)) {
        attr_dev(line, "x1", line_x__value);
      }

      if (dirty[0] &
      /*brushLine*/
      8192 && line_x__value_1 !== (line_x__value_1 =
      /*brushLine*/
      ctx[13].p2)) {
        attr_dev(line, "x2", line_x__value_1);
      }

      if (dirty[0] &
      /*geometry*/
      2 && line_y__value !== (line_y__value =
      /*geometry*/
      ctx[1].barThickness)) {
        attr_dev(line, "y1", line_y__value);
      }

      if (dirty[0] &
      /*geometry*/
      2 && line_y__value_1 !== (line_y__value_1 =
      /*geometry*/
      ctx[1].barThickness)) {
        attr_dev(line, "y2", line_y__value_1);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(386:3) {:else}",
    ctx: ctx
  });
  return block;
} // (381:3) {#if flags.isVertical}


function create_if_block_2$4(ctx) {
  var line;
  var line_y__value;
  var line_y__value_1;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_element(nodes, "line", {
        y1: true,
        y2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y1", line_y__value =
      /*brushLine*/
      ctx[13].p1);
      attr_dev(line, "y2", line_y__value_1 =
      /*brushLine*/
      ctx[13].p2);
      attr_dev(line, "class", "svelte-7e9eom");
      add_location(line, file$a, 381, 3, 8556);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*brushLine*/
      8192 && line_y__value !== (line_y__value =
      /*brushLine*/
      ctx[13].p1)) {
        attr_dev(line, "y1", line_y__value);
      }

      if (dirty[0] &
      /*brushLine*/
      8192 && line_y__value_1 !== (line_y__value_1 =
      /*brushLine*/
      ctx[13].p2)) {
        attr_dev(line, "y2", line_y__value_1);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$4.name,
    type: "if",
    source: "(381:3) {#if flags.isVertical}",
    ctx: ctx
  });
  return block;
}

function create_fragment$g(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[4] &&
  /*width*/
  ctx[5] &&
  /*scale*/
  ctx[9] && create_if_block$7(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (
      /*height*/
      ctx[4] &&
      /*width*/
      ctx[5] &&
      /*scale*/
      ctx[9]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$7(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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

function instance$g($$self, $$props, $$invalidate) {
  var $brush;
  var dispatch = createEventDispatcher();
  var defaultFlags = {
    isInteractive: false,
    isVertical: false,
    showTicks: true,
    withBackground: false
  };
  var defaultGeometry = {
    barThickness: 25,
    bottom: 10,
    brushThreshold: 10,
    // pixels to trigger brushing
    left: 10,
    right: 10,
    gap: 2,
    textPadding: 5,
    top: 10
  };
  var defaultTheme = {
    backgroundColor: "white",
    backgroundOpacity: 1,
    binFill: "white",
    binStroke: null,
    // null for no stroke, or a color string
    binStrokeWidth: 1,
    // ineffective for binStroke: null
    brushAddStroke: "rgb(107,248,134)",
    brushRemoveStroke: "rgb(246,97,20)",
    brushStrokeOpacity: 0.8,
    brushStrokeWidth: 8,
    fontSize: 12,
    selectedBinStroke: "black",
    selectedBinStrokeWidth: 2,
    textColor: "black"
  };
  var height = $$props.height;
  var width = $$props.width;
  var bins = $$props.bins; // {range: [number, number], color: string}[]

  var flags = $$props.flags;
  var geometry = $$props.geometry;
  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  /* brushing */

  var isMousedown = false;
  var brushOff = {
    delta: 0,
    end: null,
    origin: {
      x: null,
      y: null
    },
    start: null,
    modifier: null,
    state: "Off"
  };
  var brush = writable(brushOff);
  validate_store(brush, "brush");
  component_subscribe($$self, brush, function (value) {
    return $$invalidate(34, $brush = value);
  });
  /* events */

  var getModifier = function getModifier(event) {
    return event.shiftKey ? "shift" : event.altKey ? "alt" : null;
  };

  var onMouseenter = function onMouseenter(index) {
    return function () {
      if (isBrushing) {
        brush.update(mergeObj({
          end: index
        }));
      }

      dispatch("entered", index);
    };
  };

  var onMousedown = function onMousedown(event) {
    $$invalidate(6, isMousedown = true);
    brush.set({
      delta: 0,
      modifier: getModifier(event),
      origin: {
        x: event.offsetX,
        y: event.offsetY
      },
      state: "Pressed"
    });
  };

  var onMousemove = function onMousemove(index) {
    return function (event) {
      if (isPressed) {
        var delta = vectorLength2D(event.offsetX - $brush.origin.x, event.offsetY - $brush.origin.y);

        if (delta > geometry.brushThreshold) {
          brush.update(mergeObj({
            end: index,
            start: index,
            state: "Brushing"
          }));
          dispatch("brushstart", index);
        } else {
          brush.update(mergeObj({
            delta: delta
          }));
        }
      }
    };
  };

  var onMouseup = function onMouseup(index) {
    return function () {
      $$invalidate(6, isMousedown = false);

      if (isPressed) {
        if ($brush.delta < geometry.brushThreshold) {
          if (doesBrushAdd) {
            $$invalidate(2, selectedBins = uniques(appendTo(selectedBins, index)));
          } else if (doesBrushRemove) {
            $$invalidate(2, selectedBins = pullFrom(selectedBins, [index]));
          } else {
            $$invalidate(2, selectedBins = [index]);
          }

          dispatch("clicked", {
            index: index,
            selectedBins: selectedBins
          });
        }
      } else if (isBrushing) {
        dispatch("brushend", index);
      }

      brush.set(brushOff);
    };
  };

  var onMouseleave = function onMouseleave(index) {
    return function () {
      dispatch("exited", index);
    };
  };

  var resetBrush = function resetBrush() {
    brush.set(brushOff);
  };

  var resetSelection = function resetSelection() {
    $$invalidate(2, selectedBins = []);
    dispatch("clicked", {
      selectedBins: selectedBins
    });
  };

  var writable_props = ["height", "width", "bins", "flags", "geometry", "selectedBins", "theme", "ticksFormatFn"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ColorBinsG> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ColorBinsG", $$slots, []);

  $$self.$set = function ($$props) {
    if ("height" in $$props) $$invalidate(4, height = $$props.height);
    if ("width" in $$props) $$invalidate(5, width = $$props.width);
    if ("bins" in $$props) $$invalidate(23, bins = $$props.bins);
    if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(2, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(3, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(24, ticksFormatFn = $$props.ticksFormatFn);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      writable: writable,
      makeStyleVars: makeStyleVars,
      vectorLength2D: vectorLength2D,
      concat: concat,
      inclusiveRange: inclusiveRange,
      mergeObj: mergeObj,
      scaleLinear: linear$1,
      appendTo: appendTo,
      last: last,
      pullFrom: pullFrom,
      sort: sort,
      uniques: uniques,
      getBinsTicks: getBinsTicks,
      dispatch: dispatch,
      defaultFlags: defaultFlags,
      defaultGeometry: defaultGeometry,
      defaultTheme: defaultTheme,
      height: height,
      width: width,
      bins: bins,
      flags: flags,
      geometry: geometry,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      isMousedown: isMousedown,
      brushOff: brushOff,
      brush: brush,
      getModifier: getModifier,
      onMouseenter: onMouseenter,
      onMousedown: onMousedown,
      onMousemove: onMousemove,
      onMouseup: onMouseup,
      onMouseleave: onMouseleave,
      resetBrush: resetBrush,
      resetSelection: resetSelection,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      widgetThickness: widgetThickness,
      origin: origin,
      binsSize: binsSize,
      valuesMin: valuesMin,
      valuesMax: valuesMax,
      range: range,
      scale: scale,
      lastIndex: lastIndex,
      semigap: semigap,
      bars: bars,
      ticksDistance: ticksDistance,
      ticks: ticks,
      isBrushing: isBrushing,
      $brush: $brush,
      isPressed: isPressed,
      doesBrushAdd: doesBrushAdd,
      doesBrushRemove: doesBrushRemove,
      brushStroke: brushStroke,
      brushExtent: brushExtent,
      brushRange: brushRange,
      brushExtentBarYs: brushExtentBarYs,
      brushLine: brushLine,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("height" in $$props) $$invalidate(4, height = $$props.height);
    if ("width" in $$props) $$invalidate(5, width = $$props.width);
    if ("bins" in $$props) $$invalidate(23, bins = $$props.bins);
    if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(2, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(3, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(24, ticksFormatFn = $$props.ticksFormatFn);
    if ("isMousedown" in $$props) $$invalidate(6, isMousedown = $$props.isMousedown);
    if ("innerWidth" in $$props) $$invalidate(25, innerWidth = $$props.innerWidth);
    if ("innerHeight" in $$props) $$invalidate(26, innerHeight = $$props.innerHeight);
    if ("widgetThickness" in $$props) $$invalidate(27, widgetThickness = $$props.widgetThickness);
    if ("origin" in $$props) $$invalidate(7, origin = $$props.origin);
    if ("binsSize" in $$props) $$invalidate(8, binsSize = $$props.binsSize);
    if ("valuesMin" in $$props) $$invalidate(28, valuesMin = $$props.valuesMin);
    if ("valuesMax" in $$props) $$invalidate(29, valuesMax = $$props.valuesMax);
    if ("range" in $$props) $$invalidate(30, range = $$props.range);
    if ("scale" in $$props) $$invalidate(9, scale = $$props.scale);
    if ("lastIndex" in $$props) $$invalidate(31, lastIndex = $$props.lastIndex);
    if ("semigap" in $$props) $$invalidate(32, semigap = $$props.semigap);
    if ("bars" in $$props) $$invalidate(10, bars = $$props.bars);
    if ("ticksDistance" in $$props) $$invalidate(33, ticksDistance = $$props.ticksDistance);
    if ("ticks" in $$props) $$invalidate(11, ticks = $$props.ticks);
    if ("isBrushing" in $$props) $$invalidate(12, isBrushing = $$props.isBrushing);
    if ("isPressed" in $$props) isPressed = $$props.isPressed;
    if ("doesBrushAdd" in $$props) $$invalidate(36, doesBrushAdd = $$props.doesBrushAdd);
    if ("doesBrushRemove" in $$props) $$invalidate(37, doesBrushRemove = $$props.doesBrushRemove);
    if ("brushStroke" in $$props) $$invalidate(38, brushStroke = $$props.brushStroke);
    if ("brushExtent" in $$props) $$invalidate(39, brushExtent = $$props.brushExtent);
    if ("brushRange" in $$props) $$invalidate(40, brushRange = $$props.brushRange);
    if ("brushExtentBarYs" in $$props) $$invalidate(41, brushExtentBarYs = $$props.brushExtentBarYs);
    if ("brushLine" in $$props) $$invalidate(13, brushLine = $$props.brushLine);
    if ("style" in $$props) $$invalidate(14, style = $$props.style);
  };

  var innerWidth;
  var innerHeight;
  var widgetThickness;
  var origin;
  var binsSize;
  var valuesMin;
  var valuesMax;
  var range;
  var scale;
  var lastIndex;
  var semigap;
  var bars;
  var ticksDistance;
  var ticks;
  var isBrushing;
  var isPressed;
  var doesBrushAdd;
  var doesBrushRemove;
  var brushStroke;
  var brushExtent;
  var brushRange;
  var brushExtentBarYs;
  var brushLine;
  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*bins*/
    8388608) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(23, bins = bins || []);
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    1) {
       $$invalidate(0, flags = flags ? _objectSpread$4(_objectSpread$4({}, defaultFlags), flags) : defaultFlags);
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2) {
       $$invalidate(1, geometry = geometry ? _objectSpread$4(_objectSpread$4({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*selectedBins*/
    4) {
       $$invalidate(2, selectedBins = selectedBins || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    8) {
       $$invalidate(3, theme = theme ? _objectSpread$4(_objectSpread$4({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*ticksFormatFn*/
    16777216) {
       $$invalidate(24, ticksFormatFn = ticksFormatFn || function (x) {
        return x;
      });
    }

    if ($$self.$$.dirty[0] &
    /*width, geometry*/
    34) {
      /* layout */
       $$invalidate(25, innerWidth = Math.max(0, width - geometry.left - geometry.right));
    }

    if ($$self.$$.dirty[0] &
    /*height, geometry*/
    18) {
       $$invalidate(26, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
    }

    if ($$self.$$.dirty[0] &
    /*geometry, flags, theme*/
    11) {
       $$invalidate(27, widgetThickness = geometry.barThickness + flags.showTicks ? theme.fontSize + geometry.textPadding : 0);
    }

    if ($$self.$$.dirty[0] &
    /*geometry, flags, innerWidth, widgetThickness, innerHeight*/
    234881027) {
       $$invalidate(7, origin = {
        x: geometry.left + (flags.isVertical ? (innerWidth - widgetThickness) / 2 : 0),
        y: geometry.top + (flags.isVertical ? 0 : (innerHeight - widgetThickness) / 2)
      });
    }

    if ($$self.$$.dirty[0] &
    /*flags, geometry, innerWidth, innerHeight*/
    100663299) {
       $$invalidate(8, binsSize = {
        width: flags.isVertical ? geometry.barThickness : innerWidth,
        height: flags.isVertical ? innerHeight : geometry.barThickness
      });
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    8388608) {
      var _ref;

      /* scale */
       $$invalidate(28, (_ref = [bins[0].range[0], last(bins).range[1]], valuesMin = _ref[0], valuesMax = _ref[1], _ref), valuesMin, ($$invalidate(29, valuesMax), $$invalidate(23, bins)));
    }

    if ($$self.$$.dirty[0] &
    /*flags, innerHeight, innerWidth*/
    100663297) {
       $$invalidate(30, range = flags.isVertical ? [innerHeight, 0] : [0, innerWidth]);
    }

    if ($$self.$$.dirty[0] &
    /*bins, valuesMin, valuesMax, range*/
    1887436800) {
       $$invalidate(9, scale = bins.length && linear$1().domain([valuesMin, valuesMax]).range(range));
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    8388608) {
      /* bars */
       $$invalidate(31, lastIndex = bins.length - 1);
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2) {
       $$invalidate(32, semigap = geometry.gap / 2);
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    8) {
       $$invalidate(12, isBrushing = $brush.state === "Brushing");
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    8) {
       $$invalidate(36, doesBrushAdd = $brush.modifier === "shift");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    4096 | $$self.$$.dirty[1] &
    /*$brush*/
    8) {
       $$invalidate(39, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    4096 | $$self.$$.dirty[1] &
    /*brushExtent*/
    256) {
       $$invalidate(40, brushRange = isBrushing && inclusiveRange(brushExtent));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    8) {
       $$invalidate(37, doesBrushRemove = $brush.modifier === "alt");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, selectedBins*/
    4100 | $$self.$$.dirty[1] &
    /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/
    616) {
       if (isBrushing) {
        $$invalidate(2, selectedBins = doesBrushAdd ? uniques(concat(selectedBins, brushRange)) : doesBrushRemove ? pullFrom(selectedBins, brushRange) : brushRange);
        dispatch("brushed", {
          end: $brush.end,
          selectedBins: selectedBins,
          start: $brush.start
        });
      }
    }

    if ($$self.$$.dirty[0] &
    /*bins, selectedBins, scale, flags, geometry, theme*/
    8389135 | $$self.$$.dirty[1] &
    /*semigap, lastIndex*/
    3) {
       $$invalidate(10, bars = bins.map(function (bin, index) {
        var _bin$range = _slicedToArray(bin.range, 2),
            v1 = _bin$range[0],
            v2 = _bin$range[1],
            color = bin.color;

        var selected = selectedBins.length && selectedBins.includes(index);
        var p1 = scale(v1);
        var p2 = scale(v2);
        var x;
        var y;
        var start;
        var end;
        var sensorX;
        var sensorY;

        if (flags.isVertical) {
          start = p1 - (index > 0 ? semigap : 0);
          end = p2 + (index < lastIndex ? semigap : 0);
          x = 0;
          y = end;
          sensorX = 0;
          sensorY = p2;
        } else {
          start = p1 + (index > 0 ? semigap : 0);
          end = p2 - (index < lastIndex ? semigap : 0);
          x = start;
          y = 0;
          sensorX = p1;
          sensorY = 0;
        }

        var barLength = Math.abs(end - start);
        var sensorLength = Math.abs(p2 - p1);
        return _objectSpread$4(_objectSpread$4({}, bin), {
          barHeight: flags.isVertical ? barLength : geometry.barThickness,
          barWidth: flags.isVertical ? geometry.barThickness : barLength,
          fill: color || theme.binFill,
          p1: p1,
          p2: p2,
          selected: selected,
          sensorHeight: flags.isVertical ? sensorLength : geometry.barThickness,
          sensorWidth: flags.isVertical ? geometry.barThickness : sensorLength,
          sensorX: sensorX,
          sensorY: sensorY,
          x: x,
          y: y
        });
      }));
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2) {
      /* ticks */
       $$invalidate(33, ticksDistance = geometry.barThickness + geometry.textPadding);
    }

    if ($$self.$$.dirty[0] &
    /*bins, ticksFormatFn, flags, scale*/
    25166337 | $$self.$$.dirty[1] &
    /*ticksDistance*/
    4) {
       $$invalidate(11, ticks = getBinsTicks(bins).map(function (value) {
        return {
          label: ticksFormatFn(value),
          x: flags.isVertical ? ticksDistance : scale(value),
          y: flags.isVertical ? scale(value) : ticksDistance
        };
      }));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    8) {
       isPressed = $brush.state === "Pressed";
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    8 | $$self.$$.dirty[1] &
    /*doesBrushAdd, doesBrushRemove*/
    96) {
       $$invalidate(38, brushStroke = doesBrushAdd ? theme.brushAddStroke : doesBrushRemove ? theme.brushRemoveStroke : null);
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, bars*/
    5120 | $$self.$$.dirty[1] &
    /*brushExtent*/
    256) {
       $$invalidate(41, brushExtentBarYs = isBrushing && sort([bars[brushExtent[0]].p1, bars[brushExtent[0]].p2, bars[brushExtent[1]].p1, bars[brushExtent[1]].p2]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    4096 | $$self.$$.dirty[1] &
    /*brushExtentBarYs*/
    1024) {
       $$invalidate(13, brushLine = isBrushing && {
        p1: brushExtentBarYs[0],
        p2: brushExtentBarYs[3]
      });
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    8 | $$self.$$.dirty[1] &
    /*brushStroke*/
    128) {
      /* style */
       $$invalidate(14, style = makeStyleVars(_objectSpread$4(_objectSpread$4({}, theme), {}, {
        brushStroke: brushStroke
      })));
    }
  };

  return [flags, geometry, selectedBins, theme, height, width, isMousedown, origin, binsSize, scale, bars, ticks, isBrushing, brushLine, style, brush, onMouseenter, onMousedown, onMousemove, onMouseup, onMouseleave, resetBrush, resetSelection, bins, ticksFormatFn];
}

var ColorBinsG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorBinsG, _SvelteComponentDev);

  var _super = _createSuper$g(ColorBinsG);

  function ColorBinsG(options) {
    var _this;

    _classCallCheck(this, ColorBinsG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {
      height: 4,
      width: 5,
      bins: 23,
      flags: 0,
      geometry: 1,
      selectedBins: 2,
      theme: 3,
      ticksFormatFn: 24
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorBinsG",
      options: options,
      id: create_fragment$g.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*height*/
    ctx[4] === undefined && !("height" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'height'");
    }

    if (
    /*width*/
    ctx[5] === undefined && !("width" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'width'");
    }

    if (
    /*bins*/
    ctx[23] === undefined && !("bins" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'bins'");
    }

    if (
    /*flags*/
    ctx[0] === undefined && !("flags" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'flags'");
    }

    if (
    /*geometry*/
    ctx[1] === undefined && !("geometry" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'geometry'");
    }

    if (
    /*selectedBins*/
    ctx[2] === undefined && !("selectedBins" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'selectedBins'");
    }

    if (
    /*theme*/
    ctx[3] === undefined && !("theme" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'theme'");
    }

    if (
    /*ticksFormatFn*/
    ctx[24] === undefined && !("ticksFormatFn" in props)) {
      console.warn("<ColorBinsG> was created without expected prop 'ticksFormatFn'");
    }

    return _this;
  }

  _createClass(ColorBinsG, [{
    key: "height",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ColorBinsG;
}(SvelteComponentDev);

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsDiv.svelte"; // (32:1) {#if title}

function create_if_block_1$6(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*title*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1amymvq");
      add_location(h2, file$b, 33, 2, 651);
      attr_dev(header, "class", "svelte-1amymvq");
      add_location(header, file$b, 32, 1, 640);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      append_dev(header, h2);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data_dev(t,
      /*title*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$6.name,
    type: "if",
    source: "(32:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (46:3) {#if bins}


function create_if_block$8(ctx) {
  var colorbinsg;
  var current;
  colorbinsg = new ColorBinsG({
    props: {
      bins:
      /*bins*/
      ctx[1],
      flags:
      /*flags*/
      ctx[2],
      geometry:
      /*geometry*/
      ctx[3],
      height:
      /*height*/
      ctx[7],
      selectedBins:
      /*selectedBins*/
      ctx[4],
      theme:
      /*theme*/
      ctx[5],
      ticksFormatFn:
      /*ticksFormatFn*/
      ctx[6],
      width:
      /*width*/
      ctx[8]
    },
    $$inline: true
  });
  colorbinsg.$on("brushed",
  /*brushed_handler*/
  ctx[12]);
  colorbinsg.$on("brushend",
  /*brushend_handler*/
  ctx[13]);
  colorbinsg.$on("brushstart",
  /*brushstart_handler*/
  ctx[14]);
  colorbinsg.$on("clicked",
  /*clicked_handler*/
  ctx[15]);
  colorbinsg.$on("entered",
  /*entered_handler*/
  ctx[16]);
  colorbinsg.$on("exited",
  /*exited_handler*/
  ctx[17]);
  var block = {
    c: function create() {
      create_component(colorbinsg.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(colorbinsg.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(colorbinsg, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var colorbinsg_changes = {};
      if (dirty &
      /*bins*/
      2) colorbinsg_changes.bins =
      /*bins*/
      ctx[1];
      if (dirty &
      /*flags*/
      4) colorbinsg_changes.flags =
      /*flags*/
      ctx[2];
      if (dirty &
      /*geometry*/
      8) colorbinsg_changes.geometry =
      /*geometry*/
      ctx[3];
      if (dirty &
      /*height*/
      128) colorbinsg_changes.height =
      /*height*/
      ctx[7];
      if (dirty &
      /*selectedBins*/
      16) colorbinsg_changes.selectedBins =
      /*selectedBins*/
      ctx[4];
      if (dirty &
      /*theme*/
      32) colorbinsg_changes.theme =
      /*theme*/
      ctx[5];
      if (dirty &
      /*ticksFormatFn*/
      64) colorbinsg_changes.ticksFormatFn =
      /*ticksFormatFn*/
      ctx[6];
      if (dirty &
      /*width*/
      256) colorbinsg_changes.width =
      /*width*/
      ctx[8];
      colorbinsg.$set(colorbinsg_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(colorbinsg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(colorbinsg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(colorbinsg, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$8.name,
    type: "if",
    source: "(46:3) {#if bins}",
    ctx: ctx
  });
  return block;
}

function create_fragment$h(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var main_resize_listener;
  var current;
  var if_block0 =
  /*title*/
  ctx[0] && create_if_block_1$6(ctx);
  var if_block1 =
  /*bins*/
  ctx[1] && create_if_block$8(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      svg = claim_element(main_nodes, "svg", {
        width: true,
        height: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      if (if_block1) if_block1.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[8]);
      attr_dev(svg, "height",
      /*height*/
      ctx[7]);
      attr_dev(svg, "class", "svelte-1amymvq");
      add_location(svg, file$b, 41, 2, 793);
      attr_dev(main, "class", "svelte-1amymvq");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[18].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[0] &&
      /*title*/
      ctx[0].length);
      add_location(main, file$b, 36, 1, 687);
      attr_dev(div, "class", "ColorBinsDiv svelte-1amymvq");
      attr_dev(div, "style",
      /*style*/
      ctx[9]);
      toggle_class(div, "interactive",
      /*flags*/
      ctx[2] &&
      /*flags*/
      ctx[2].isInteractive);
      add_location(div, file$b, 26, 0, 538);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      append_dev(main, svg);
      if (if_block1) if_block1.m(svg, null);
      main_resize_listener = add_resize_listener(main,
      /*main_elementresize_handler*/
      ctx[18].bind(main));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*title*/
      ctx[0]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$6(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*bins*/
      ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*bins*/
          2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$8(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(svg, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*width*/
      256) {
        attr_dev(svg, "width",
        /*width*/
        ctx[8]);
      }

      if (!current || dirty &
      /*height*/
      128) {
        attr_dev(svg, "height",
        /*height*/
        ctx[7]);
      }

      if (dirty &
      /*title*/
      1) {
        toggle_class(main, "titled",
        /*title*/
        ctx[0] &&
        /*title*/
        ctx[0].length);
      }

      if (!current || dirty &
      /*style*/
      512) {
        attr_dev(div, "style",
        /*style*/
        ctx[9]);
      }

      if (dirty &
      /*flags*/
      4) {
        toggle_class(div, "interactive",
        /*flags*/
        ctx[2] &&
        /*flags*/
        ctx[2].isInteractive);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      main_resize_listener();
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

function instance$h($$self, $$props, $$invalidate) {
  var headerHeight = $$props.headerHeight;
  var padding = $$props.padding;
  var title = $$props.title;
  var bins = $$props.bins; // {range: [number, number], color: string}[]

  var flags = $$props.flags;
  var geometry = $$props.geometry;
  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  var height = 0;
  var width = 0;
  var writable_props = ["headerHeight", "padding", "title", "bins", "flags", "geometry", "selectedBins", "theme", "ticksFormatFn"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ColorBinsDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ColorBinsDiv", $$slots, []);

  function brushed_handler(event) {
    bubble($$self, event);
  }

  function brushend_handler(event) {
    bubble($$self, event);
  }

  function brushstart_handler(event) {
    bubble($$self, event);
  }

  function clicked_handler(event) {
    bubble($$self, event);
  }

  function entered_handler(event) {
    bubble($$self, event);
  }

  function exited_handler(event) {
    bubble($$self, event);
  }

  function main_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(7, height);
    $$invalidate(8, width);
  }

  $$self.$set = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(10, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(11, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("flags" in $$props) $$invalidate(2, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(6, ticksFormatFn = $$props.ticksFormatFn);
  };

  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      ColorBinsG: ColorBinsG,
      headerHeight: headerHeight,
      padding: padding,
      title: title,
      bins: bins,
      flags: flags,
      geometry: geometry,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      height: height,
      width: width,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(10, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(11, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("flags" in $$props) $$invalidate(2, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(6, ticksFormatFn = $$props.ticksFormatFn);
    if ("height" in $$props) $$invalidate(7, height = $$props.height);
    if ("width" in $$props) $$invalidate(8, width = $$props.width);
    if ("style" in $$props) $$invalidate(9, style = $$props.style);
  };

  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*padding*/
    2048) {
       $$invalidate(11, padding = padding || "10px");
    }

    if ($$self.$$.dirty &
    /*headerHeight*/
    1024) {
       $$invalidate(10, headerHeight = headerHeight || "2rem");
    }

    if ($$self.$$.dirty &
    /*headerHeight, padding*/
    3072) {
       $$invalidate(9, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };

  return [title, bins, flags, geometry, selectedBins, theme, ticksFormatFn, height, width, style, headerHeight, padding, brushed_handler, brushend_handler, brushstart_handler, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}

var ColorBinsDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorBinsDiv, _SvelteComponentDev);

  var _super = _createSuper$h(ColorBinsDiv);

  function ColorBinsDiv(options) {
    var _this;

    _classCallCheck(this, ColorBinsDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {
      headerHeight: 10,
      padding: 11,
      title: 0,
      bins: 1,
      flags: 2,
      geometry: 3,
      selectedBins: 4,
      theme: 5,
      ticksFormatFn: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorBinsDiv",
      options: options,
      id: create_fragment$h.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*headerHeight*/
    ctx[10] === undefined && !("headerHeight" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'headerHeight'");
    }

    if (
    /*padding*/
    ctx[11] === undefined && !("padding" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'padding'");
    }

    if (
    /*title*/
    ctx[0] === undefined && !("title" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'title'");
    }

    if (
    /*bins*/
    ctx[1] === undefined && !("bins" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'bins'");
    }

    if (
    /*flags*/
    ctx[2] === undefined && !("flags" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'flags'");
    }

    if (
    /*geometry*/
    ctx[3] === undefined && !("geometry" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'geometry'");
    }

    if (
    /*selectedBins*/
    ctx[4] === undefined && !("selectedBins" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'selectedBins'");
    }

    if (
    /*theme*/
    ctx[5] === undefined && !("theme" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'theme'");
    }

    if (
    /*ticksFormatFn*/
    ctx[6] === undefined && !("ticksFormatFn" in props)) {
      console.warn("<ColorBinsDiv> was created without expected prop 'ticksFormatFn'");
    }

    return _this;
  }

  _createClass(ColorBinsDiv, [{
    key: "headerHeight",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ColorBinsDiv;
}(SvelteComponentDev);

var legend = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ColorBinsG: ColorBinsG,
	ColorBinsDiv: ColorBinsDiv
});

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$c = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte";

function get_each_context$6(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[52] = list[i].tick;
  child_ctx[53] = list[i].y;
  return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[56] = list[i].barLength;
  child_ctx[57] = list[i].barThickness;
  child_ctx[58] = list[i].displayValue;
  child_ctx[59] = list[i].fill;
  child_ctx[60] = list[i].labelAnchor;
  child_ctx[61] = list[i].labelX;
  child_ctx[62] = list[i].selected;
  child_ctx[63] = list[i].x;
  child_ctx[64] = list[i].y1;
  child_ctx[66] = i;
  return child_ctx;
} // (327:0) {#if height && width}


function create_if_block$9(ctx) {
  var g;

  function select_block_type(ctx, dirty) {
    if (
    /*bins*/
    ctx[0].length === 0) return create_if_block_1$7;
    return create_else_block$4;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        style: true,
        class: true
      }, 1);
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "style",
      /*style*/
      ctx[19]);
      attr_dev(g, "class", "HistogramG svelte-1egg7b");
      toggle_class(g, "interactive",
      /*flags*/
      ctx[1].isInteractive);
      add_location(g, file$c, 327, 0, 7903);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }

      if (dirty[0] &
      /*style*/
      524288) {
        attr_dev(g, "style",
        /*style*/
        ctx[19]);
      }

      if (dirty[0] &
      /*flags*/
      2) {
        toggle_class(g, "interactive",
        /*flags*/
        ctx[1].isInteractive);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$9.name,
    type: "if",
    source: "(327:0) {#if height && width}",
    ctx: ctx
  });
  return block;
} // (341:1) {:else}


function create_else_block$4(ctx) {
  var if_block0_anchor;
  var g1;
  var g0;
  var line;
  var line_y__value;
  var if_block2_anchor;
  var g0_transform_value;
  var g1_transform_value;
  var if_block0 =
  /*flags*/
  ctx[1].withBackground && create_if_block_8(ctx);
  var if_block1 =
  /*flags*/
  ctx[1].isInteractive && create_if_block_7(ctx);
  var each_value_1 =
  /*bars*/
  ctx[15];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }

  var if_block2 = !
  /*flags*/
  ctx[1].hideOrigin && create_if_block_4$2(ctx);
  var if_block3 = !
  /*flags*/
  ctx[1].hideTicks && create_if_block_3$3(ctx);
  var if_block4 =
  /*isBrushing*/
  ctx[17] && create_if_block_2$5(ctx);
  var block = {
    c: function create() {
      if (if_block0) if_block0.c();
      if_block0_anchor = empty();
      if (if_block1) if_block1.c();
      g1 = svg_element("g");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      g0 = svg_element("g");
      line = svg_element("line");
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
      if (if_block3) if_block3.c();
      if (if_block4) if_block4.c();
      this.h();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      if_block0_anchor = empty();
      if (if_block1) if_block1.l(nodes);
      g1 = claim_element(nodes, "g", {
        transform: true
      }, 1);
      var g1_nodes = children(g1);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(g1_nodes);
      }

      g0 = claim_element(g1_nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g0_nodes = children(g0);
      line = claim_element(g0_nodes, "line", {
        y2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);
      if (if_block2) if_block2.l(g0_nodes);
      if_block2_anchor = empty();
      if (if_block3) if_block3.l(g0_nodes);
      g0_nodes.forEach(detach_dev);
      if (if_block4) if_block4.l(g1_nodes);
      g1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y2", line_y__value =
      /*flags*/
      ctx[1].isTopDown ?
      /*innerHeight*/
      ctx[10] : -
      /*innerHeight*/
      ctx[10]);
      attr_dev(line, "class", "svelte-1egg7b");
      add_location(line, file$c, 409, 3, 9348);
      attr_dev(g0, "class", "axis svelte-1egg7b");
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*origin*/
      ctx[11].x + "," +
      /*origin*/
      ctx[11].y + ")");
      add_location(g0, file$c, 405, 2, 9276);
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*safety*/
      ctx[8].left + "," +
      /*safety*/
      ctx[8].top + ")");
      add_location(g1, file$c, 358, 1, 8382);
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_dev(target, if_block0_anchor, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, g1, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g1, null);
      }

      append_dev(g1, g0);
      append_dev(g0, line);
      if (if_block2) if_block2.m(g0, null);
      append_dev(g0, if_block2_anchor);
      if (if_block3) if_block3.m(g0, null);
      if (if_block4) if_block4.m(g1, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*flags*/
      ctx[1].withBackground) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_8(ctx);
          if_block0.c();
          if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*flags*/
      ctx[1].isInteractive) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_7(ctx);
          if_block1.c();
          if_block1.m(g1.parentNode, g1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*bars, innerWidth, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags, fontSize*/
      65110658) {
        each_value_1 =
        /*bars*/
        ctx[15];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$2(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1$2(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(g1, g0);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_1.length;
      }

      if (dirty[0] &
      /*flags, innerHeight*/
      1026 && line_y__value !== (line_y__value =
      /*flags*/
      ctx[1].isTopDown ?
      /*innerHeight*/
      ctx[10] : -
      /*innerHeight*/
      ctx[10])) {
        attr_dev(line, "y2", line_y__value);
      }

      if (!
      /*flags*/
      ctx[1].hideOrigin) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_4$2(ctx);
          if_block2.c();
          if_block2.m(g0, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (!
      /*flags*/
      ctx[1].hideTicks) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_3$3(ctx);
          if_block3.c();
          if_block3.m(g0, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (dirty[0] &
      /*origin*/
      2048 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*origin*/
      ctx[11].x + "," +
      /*origin*/
      ctx[11].y + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (
      /*isBrushing*/
      ctx[17]) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
        } else {
          if_block4 = create_if_block_2$5(ctx);
          if_block4.c();
          if_block4.m(g1, null);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }

      if (dirty[0] &
      /*safety*/
      256 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*safety*/
      ctx[8].left + "," +
      /*safety*/
      ctx[8].top + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(if_block0_anchor);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(g1);
      destroy_each(each_blocks, detaching);
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$4.name,
    type: "else",
    source: "(341:1) {:else}",
    ctx: ctx
  });
  return block;
} // (333:1) {#if bins.length === 0}


function create_if_block_1$7(ctx) {
  var text_1;
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(
      /*message*/
      ctx[3]);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        class: true,
        x: true,
        y: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes,
      /*message*/
      ctx[3]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "message svelte-1egg7b");
      attr_dev(text_1, "x", text_1_x_value =
      /*width*/
      ctx[6] / 2);
      attr_dev(text_1, "y", text_1_y_value =
      /*height*/
      ctx[5] / 2);
      add_location(text_1, file$c, 334, 1, 8005);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*message*/
      8) set_data_dev(t,
      /*message*/
      ctx[3]);

      if (dirty[0] &
      /*width*/
      64 && text_1_x_value !== (text_1_x_value =
      /*width*/
      ctx[6] / 2)) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*height*/
      32 && text_1_y_value !== (text_1_y_value =
      /*height*/
      ctx[5] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$7.name,
    type: "if",
    source: "(333:1) {#if bins.length === 0}",
    ctx: ctx
  });
  return block;
} // (344:1) {#if flags.withBackground}


function create_if_block_8(ctx) {
  var rect;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        class: true,
        width: true,
        height: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-1egg7b");
      attr_dev(rect, "width",
      /*width*/
      ctx[6]);
      attr_dev(rect, "height",
      /*height*/
      ctx[5]);
      add_location(rect, file$c, 344, 1, 8138);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*height*/
      32) {
        attr_dev(rect, "height",
        /*height*/
        ctx[5]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_8.name,
    type: "if",
    source: "(344:1) {#if flags.withBackground}",
    ctx: ctx
  });
  return block;
} // (349:1) {#if flags.isInteractive}


function create_if_block_7(ctx) {
  var rect;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[5]);
      attr_dev(rect, "width",
      /*width*/
      ctx[6]);
      attr_dev(rect, "class", "bkgSensor svelte-1egg7b");
      toggle_class(rect, "reset",
      /*selectedBins*/
      ctx[4].length > 0);
      add_location(rect, file$c, 349, 1, 8254);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = listen_dev(rect, "click",
        /*resetSelection*/
        ctx[26], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      32) {
        attr_dev(rect, "height",
        /*height*/
        ctx[5]);
      }

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*selectedBins*/
      16) {
        toggle_class(rect, "reset",
        /*selectedBins*/
        ctx[4].length > 0);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7.name,
    type: "if",
    source: "(349:1) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (375:3) {#if displayValue}


function create_if_block_6$1(ctx) {
  var rect;
  var rect_fill_value;
  var rect_x_value;
  var rect_height_value;
  var rect_width_value;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        fill: true,
        x: true,
        class: true,
        height: true,
        width: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "fill", rect_fill_value =
      /*fill*/
      ctx[59]);
      attr_dev(rect, "x", rect_x_value =
      /*x*/
      ctx[63]);
      attr_dev(rect, "class", "bar svelte-1egg7b");
      attr_dev(rect, "height", rect_height_value =
      /*barThickness*/
      ctx[57]);
      attr_dev(rect, "width", rect_width_value =
      /*barLength*/
      ctx[56]);
      toggle_class(rect, "selected",
      /*selected*/
      ctx[62]);
      add_location(rect, file$c, 375, 3, 8659);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*bars*/
      32768 && rect_fill_value !== (rect_fill_value =
      /*fill*/
      ctx[59])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*bars*/
      32768 && rect_x_value !== (rect_x_value =
      /*x*/
      ctx[63])) {
        attr_dev(rect, "x", rect_x_value);
      }

      if (dirty[0] &
      /*bars*/
      32768 && rect_height_value !== (rect_height_value =
      /*barThickness*/
      ctx[57])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*bars*/
      32768 && rect_width_value !== (rect_width_value =
      /*barLength*/
      ctx[56])) {
        attr_dev(rect, "width", rect_width_value);
      }

      if (dirty[0] &
      /*bars*/
      32768) {
        toggle_class(rect, "selected",
        /*selected*/
        ctx[62]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6$1.name,
    type: "if",
    source: "(375:3) {#if displayValue}",
    ctx: ctx
  });
  return block;
} // (392:3) {#if flags.isInteractive}


function create_if_block_5$1(ctx) {
  var rect;
  var rect_height_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        class: true,
        height: true,
        width: true
      }, 1);
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "sensor svelte-1egg7b");
      attr_dev(rect, "height", rect_height_value =
      /*barThickness*/
      ctx[57]);
      attr_dev(rect, "width",
      /*innerWidth*/
      ctx[9]);
      add_location(rect, file$c, 392, 3, 8964);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = [listen_dev(rect, "mousedown",
        /*onMousedown*/
        ctx[22], false, false, false), listen_dev(rect, "mouseenter",
        /*onMouseenter*/
        ctx[21](
        /*index*/
        ctx[66]), false, false, false), listen_dev(rect, "mouseleave",
        /*onMouseleave*/
        ctx[25](
        /*index*/
        ctx[66]), false, false, false), listen_dev(rect, "mousemove", function () {
          if (is_function(
          /*isMousedown*/
          ctx[7] ?
          /*onMousemove*/
          ctx[23](
          /*index*/
          ctx[66]) : null)) (
          /*isMousedown*/
          ctx[7] ?
          /*onMousemove*/
          ctx[23](
          /*index*/
          ctx[66]) : null).apply(this, arguments);
        }, false, false, false), listen_dev(rect, "mouseup",
        /*onMouseup*/
        ctx[24](
        /*index*/
        ctx[66]), false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*bars*/
      32768 && rect_height_value !== (rect_height_value =
      /*barThickness*/
      ctx[57])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*innerWidth*/
      512) {
        attr_dev(rect, "width",
        /*innerWidth*/
        ctx[9]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5$1.name,
    type: "if",
    source: "(392:3) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (360:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }


function create_each_block_1$2(ctx) {
  var g;
  var text_1;
  var t_value =
  /*displayValue*/
  ctx[58] + "";
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var text_1_text_anchor_value;
  var g_transform_value;
  var if_block0 =
  /*displayValue*/
  ctx[58] && create_if_block_6$1(ctx);
  var if_block1 =
  /*flags*/
  ctx[1].isInteractive && create_if_block_5$1(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if (if_block0) if_block0.c();
      text_1 = svg_element("text");
      t = text(t_value);
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      if (if_block0) if_block0.l(g_nodes);
      text_1 = claim_element(g_nodes, "text", {
        class: true,
        x: true,
        y: true,
        "font-size": true,
        "text-anchor": true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      if (if_block1) if_block1.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "binsize svelte-1egg7b");
      attr_dev(text_1, "x", text_1_x_value =
      /*labelX*/
      ctx[61]);
      attr_dev(text_1, "y", text_1_y_value =
      /*barThickness*/
      ctx[57] / 2);
      attr_dev(text_1, "font-size",
      /*fontSize*/
      ctx[16]);
      attr_dev(text_1, "text-anchor", text_1_text_anchor_value =
      /*labelAnchor*/
      ctx[60]);
      add_location(text_1, file$c, 384, 3, 8785);
      attr_dev(g, "class", "bin svelte-1egg7b");
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*y1*/
      ctx[64] + ")");
      add_location(g, file$c, 370, 2, 8579);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      if (if_block0) if_block0.m(g, null);
      append_dev(g, text_1);
      append_dev(text_1, t);
      if (if_block1) if_block1.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*displayValue*/
      ctx[58]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_6$1(ctx);
          if_block0.c();
          if_block0.m(g, text_1);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty[0] &
      /*bars*/
      32768 && t_value !== (t_value =
      /*displayValue*/
      ctx[58] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*bars*/
      32768 && text_1_x_value !== (text_1_x_value =
      /*labelX*/
      ctx[61])) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*bars*/
      32768 && text_1_y_value !== (text_1_y_value =
      /*barThickness*/
      ctx[57] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty[0] &
      /*fontSize*/
      65536) {
        attr_dev(text_1, "font-size",
        /*fontSize*/
        ctx[16]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && text_1_text_anchor_value !== (text_1_text_anchor_value =
      /*labelAnchor*/
      ctx[60])) {
        attr_dev(text_1, "text-anchor", text_1_text_anchor_value);
      }

      if (
      /*flags*/
      ctx[1].isInteractive) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_5$1(ctx);
          if_block1.c();
          if_block1.m(g, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*bars*/
      32768 && g_transform_value !== (g_transform_value = "translate(0," +
      /*y1*/
      ctx[64] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$2.name,
    type: "each",
    source: "(360:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }",
    ctx: ctx
  });
  return block;
} // (413:3) {#if !flags.hideOrigin}


function create_if_block_4$2(ctx) {
  var circle;
  var circle_r_value;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_element(nodes, "circle", {
        r: true,
        class: true
      }, 1);
      children(circle).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "r", circle_r_value =
      /*geometry*/
      ctx[2].originRadius);
      attr_dev(circle, "class", "svelte-1egg7b");
      add_location(circle, file$c, 413, 3, 9444);
    },
    m: function mount(target, anchor) {
      insert_dev(target, circle, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*geometry*/
      4 && circle_r_value !== (circle_r_value =
      /*geometry*/
      ctx[2].originRadius)) {
        attr_dev(circle, "r", circle_r_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$2.name,
    type: "if",
    source: "(413:3) {#if !flags.hideOrigin}",
    ctx: ctx
  });
  return block;
} // (416:3) {#if !flags.hideTicks}


function create_if_block_3$3(ctx) {
  var each_1_anchor;
  var each_value =
  /*ticks*/
  ctx[14];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticksX, ticks, fontSize, ticksAnchor*/
      94208) {
        each_value =
        /*ticks*/
        ctx[14];
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context$6(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block$6(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$3.name,
    type: "if",
    source: "(416:3) {#if !flags.hideTicks}",
    ctx: ctx
  });
  return block;
} // (417:3) {#each ticks as {tick, y}}


function create_each_block$6(ctx) {
  var text_1;
  var t_value =
  /*tick*/
  ctx[52] + "";
  var t;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        class: true,
        x: true,
        y: true,
        "font-size": true,
        "text-anchor": true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "range svelte-1egg7b");
      attr_dev(text_1, "x",
      /*ticksX*/
      ctx[12]);
      attr_dev(text_1, "y", text_1_y_value =
      /*y*/
      ctx[53]);
      attr_dev(text_1, "font-size",
      /*fontSize*/
      ctx[16]);
      attr_dev(text_1, "text-anchor",
      /*ticksAnchor*/
      ctx[13]);
      add_location(text_1, file$c, 417, 3, 9548);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      16384 && t_value !== (t_value =
      /*tick*/
      ctx[52] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*ticksX*/
      4096) {
        attr_dev(text_1, "x",
        /*ticksX*/
        ctx[12]);
      }

      if (dirty[0] &
      /*ticks*/
      16384 && text_1_y_value !== (text_1_y_value =
      /*y*/
      ctx[53])) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty[0] &
      /*fontSize*/
      65536) {
        attr_dev(text_1, "font-size",
        /*fontSize*/
        ctx[16]);
      }

      if (dirty[0] &
      /*ticksAnchor*/
      8192) {
        attr_dev(text_1, "text-anchor",
        /*ticksAnchor*/
        ctx[13]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$6.name,
    type: "each",
    source: "(417:3) {#each ticks as {tick, y}}",
    ctx: ctx
  });
  return block;
} // (428:2) {#if isBrushing}


function create_if_block_2$5(ctx) {
  var g;
  var line;
  var line_y__value;
  var line_y__value_1;
  var g_transform_value;
  var block = {
    c: function create() {
      g = svg_element("g");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      line = claim_element(g_nodes, "line", {
        y1: true,
        y2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y1", line_y__value =
      /*brushLine*/
      ctx[18].y1);
      attr_dev(line, "y2", line_y__value_1 =
      /*brushLine*/
      ctx[18].y2);
      attr_dev(line, "class", "svelte-1egg7b");
      add_location(line, file$c, 432, 3, 9780);
      attr_dev(g, "class", "brush svelte-1egg7b");
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*origin*/
      ctx[11].x + ",0)");
      add_location(g, file$c, 428, 2, 9716);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, line);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*brushLine*/
      262144 && line_y__value !== (line_y__value =
      /*brushLine*/
      ctx[18].y1)) {
        attr_dev(line, "y1", line_y__value);
      }

      if (dirty[0] &
      /*brushLine*/
      262144 && line_y__value_1 !== (line_y__value_1 =
      /*brushLine*/
      ctx[18].y2)) {
        attr_dev(line, "y2", line_y__value_1);
      }

      if (dirty[0] &
      /*origin*/
      2048 && g_transform_value !== (g_transform_value = "translate(" +
      /*origin*/
      ctx[11].x + ",0)")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$5.name,
    type: "if",
    source: "(428:2) {#if isBrushing}",
    ctx: ctx
  });
  return block;
}

function create_fragment$i(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[5] &&
  /*width*/
  ctx[6] && create_if_block$9(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (
      /*height*/
      ctx[5] &&
      /*width*/
      ctx[6]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$9(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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

function instance$i($$self, $$props, $$invalidate) {
  var $brush;
  var dispatch = createEventDispatcher();
  var makeMaxBarThickness = arrayMaxWith(getKey$3("barThickness"));
  var defaultFlags = {
    hideOrigin: false,
    hideTicks: false,
    isInteractive: false,
    isRightToLeft: false,
    isTopDown: false,
    useLogScale: false,
    withBackground: false
  };
  var defaultGeometry = {
    // exposed but undocumented on the site
    brushThreshold: 10,
    // pixels to trigger brushing
    fontSizeFactor: 0.6,
    maxFontSize: 12,
    textPadding: 5,
    // documented on the site
    originRadius: 2,
    safetyXNoTicks: 20,
    safetyXTicks: 50,
    safetyXValues: 25,
    safetyY: 20
  };
  var defaultTheme = {
    // exposed but undocumented
    backgroundOpacity: 1,
    // exposed and documented but no example
    brushAddStroke: "rgb(107,248,134)",
    brushRemoveStroke: "rgb(246,97,20)",
    brushStrokeOpacity: 0.8,
    brushStrokeWidth: 8,
    // exposed but undocumented on the site
    axisStrokeWidth: 1,
    backgroundColor: "white",
    binFill: "white",
    binStroke: "black",
    binStrokeWidth: 1,
    originColor: "black",
    messageColor: "black",
    messageFontSize: "1rem",
    selectedBinFill: "rgb(255, 174, 0)",
    selectedBinStroke: "black",
    selectedBinStrokeWidth: 2,
    textColor: "black"
  };
  var height = $$props.height;
  var width = $$props.width;
  var bins = $$props.bins;
  var binsFill = $$props.binsFill;
  var flags = $$props.flags;
  var geometry = $$props.geometry;
  var message = $$props.message;
  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  var rangesExtent = [];
  /* brushing */

  var isMousedown = false;
  var brushOff = {
    delta: 0,
    end: null,
    origin: {
      x: null,
      y: null
    },
    start: null,
    modifier: null,
    state: "Off"
  };
  var brush = writable(brushOff);
  validate_store(brush, "brush");
  component_subscribe($$self, brush, function (value) {
    return $$invalidate(37, $brush = value);
  });
  /* events */

  var getModifier = function getModifier(event) {
    return event.shiftKey ? "shift" : event.altKey ? "alt" : null;
  };

  var onMouseenter = function onMouseenter(index) {
    return function () {
      if (isBrushing) {
        brush.update(mergeObj({
          end: index
        }));
      }

      dispatch("entered", index);
    };
  };

  var onMousedown = function onMousedown(event) {
    $$invalidate(7, isMousedown = true);
    brush.set({
      delta: 0,
      modifier: getModifier(event),
      origin: {
        x: event.offsetX,
        y: event.offsetY
      },
      state: "Pressed"
    });
  };

  var onMousemove = function onMousemove(index) {
    return function (event) {
      if (isPressed) {
        var delta = vectorLength2D(event.offsetX - $brush.origin.x, event.offsetY - $brush.origin.y);

        if (delta > geometry.brushThreshold) {
          brush.update(mergeObj({
            end: index,
            start: index,
            state: "Brushing"
          }));
          dispatch("brushstart", index);
        } else {
          brush.update(mergeObj({
            delta: delta
          }));
        }
      }
    };
  };

  var onMouseup = function onMouseup(index) {
    return function () {
      $$invalidate(7, isMousedown = false);

      if (isPressed) {
        if ($brush.delta < geometry.brushThreshold) {
          if (doesBrushAdd) {
            $$invalidate(4, selectedBins = uniques(appendTo(selectedBins, index)));
          } else if (doesBrushRemove) {
            $$invalidate(4, selectedBins = pullFrom(selectedBins, [index]));
          } else {
            $$invalidate(4, selectedBins = [index]);
          }

          dispatch("clicked", {
            index: index,
            selectedBins: selectedBins
          });
        }
      } else if (isBrushing) {
        dispatch("brushend", index);
      }

      brush.set(brushOff);
    };
  };

  var onMouseleave = function onMouseleave(index) {
    return function () {
      dispatch("exited", index);
    };
  };

  var resetSelection = function resetSelection() {
    $$invalidate(4, selectedBins = []);
    dispatch("clicked", {
      selectedBins: selectedBins
    });
  };

  var writable_props = ["height", "width", "bins", "binsFill", "flags", "geometry", "message", "selectedBins", "theme", "ticksFormatFn"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<HistogramG> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("HistogramG", $$slots, []);

  $$self.$set = function ($$props) {
    if ("height" in $$props) $$invalidate(5, height = $$props.height);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("bins" in $$props) $$invalidate(0, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(29, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(27, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      writable: writable,
      makeStyleVars: makeStyleVars,
      vectorLength2D: vectorLength2D,
      arrayMaxWith: arrayMaxWith,
      concat: concat,
      getValue: getValue,
      inclusiveRange: inclusiveRange,
      mergeObj: mergeObj,
      scaleLinear: linear$1,
      scaleLog: log,
      appendTo: appendTo,
      getKey: getKey$3,
      has: has,
      last: last,
      pullFrom: pullFrom,
      sort: sort,
      uniques: uniques,
      getBinsTicks: getBinsTicks,
      getValuesLength: getValuesLength,
      dispatch: dispatch,
      makeMaxBarThickness: makeMaxBarThickness,
      defaultFlags: defaultFlags,
      defaultGeometry: defaultGeometry,
      defaultTheme: defaultTheme,
      height: height,
      width: width,
      bins: bins,
      binsFill: binsFill,
      flags: flags,
      geometry: geometry,
      message: message,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      rangesExtent: rangesExtent,
      isMousedown: isMousedown,
      brushOff: brushOff,
      brush: brush,
      getModifier: getModifier,
      onMouseenter: onMouseenter,
      onMousedown: onMousedown,
      onMousemove: onMousemove,
      onMouseup: onMouseup,
      onMouseleave: onMouseleave,
      resetSelection: resetSelection,
      safety: safety,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      origin: origin,
      direction: direction,
      ticksX: ticksX,
      ticksAnchor: ticksAnchor,
      ticks: ticks,
      scales: scales,
      useValue: useValue,
      getBinsMax: getBinsMax,
      valuesMax: valuesMax,
      bars: bars,
      maxBarThickness: maxBarThickness,
      fontSize: fontSize,
      isBrushing: isBrushing,
      $brush: $brush,
      isPressed: isPressed,
      doesBrushAdd: doesBrushAdd,
      doesBrushRemove: doesBrushRemove,
      brushStroke: brushStroke,
      brushExtent: brushExtent,
      brushRange: brushRange,
      brushExtentBarYs: brushExtentBarYs,
      brushLine: brushLine,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("height" in $$props) $$invalidate(5, height = $$props.height);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("bins" in $$props) $$invalidate(0, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(29, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ("message" in $$props) $$invalidate(3, message = $$props.message);
    if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(27, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
    if ("rangesExtent" in $$props) $$invalidate(30, rangesExtent = $$props.rangesExtent);
    if ("isMousedown" in $$props) $$invalidate(7, isMousedown = $$props.isMousedown);
    if ("safety" in $$props) $$invalidate(8, safety = $$props.safety);
    if ("innerWidth" in $$props) $$invalidate(9, innerWidth = $$props.innerWidth);
    if ("innerHeight" in $$props) $$invalidate(10, innerHeight = $$props.innerHeight);
    if ("origin" in $$props) $$invalidate(11, origin = $$props.origin);
    if ("direction" in $$props) direction = $$props.direction;
    if ("ticksX" in $$props) $$invalidate(12, ticksX = $$props.ticksX);
    if ("ticksAnchor" in $$props) $$invalidate(13, ticksAnchor = $$props.ticksAnchor);
    if ("ticks" in $$props) $$invalidate(14, ticks = $$props.ticks);
    if ("scales" in $$props) $$invalidate(32, scales = $$props.scales);
    if ("useValue" in $$props) $$invalidate(33, useValue = $$props.useValue);
    if ("getBinsMax" in $$props) $$invalidate(34, getBinsMax = $$props.getBinsMax);
    if ("valuesMax" in $$props) $$invalidate(35, valuesMax = $$props.valuesMax);
    if ("bars" in $$props) $$invalidate(15, bars = $$props.bars);
    if ("maxBarThickness" in $$props) $$invalidate(36, maxBarThickness = $$props.maxBarThickness);
    if ("fontSize" in $$props) $$invalidate(16, fontSize = $$props.fontSize);
    if ("isBrushing" in $$props) $$invalidate(17, isBrushing = $$props.isBrushing);
    if ("isPressed" in $$props) isPressed = $$props.isPressed;
    if ("doesBrushAdd" in $$props) $$invalidate(39, doesBrushAdd = $$props.doesBrushAdd);
    if ("doesBrushRemove" in $$props) $$invalidate(40, doesBrushRemove = $$props.doesBrushRemove);
    if ("brushStroke" in $$props) $$invalidate(41, brushStroke = $$props.brushStroke);
    if ("brushExtent" in $$props) $$invalidate(42, brushExtent = $$props.brushExtent);
    if ("brushRange" in $$props) $$invalidate(43, brushRange = $$props.brushRange);
    if ("brushExtentBarYs" in $$props) $$invalidate(44, brushExtentBarYs = $$props.brushExtentBarYs);
    if ("brushLine" in $$props) $$invalidate(18, brushLine = $$props.brushLine);
    if ("style" in $$props) $$invalidate(19, style = $$props.style);
  };

  var safety;
  var innerWidth;
  var innerHeight;
  var origin;
  var direction;
  var ticksX;
  var ticksAnchor;
  var ticks;
  var useValue;
  var getBinsMax;
  var valuesMax;
  var scales;
  var bars;
  var maxBarThickness;
  var fontSize;
  var isBrushing;
  var isPressed;
  var doesBrushAdd;
  var doesBrushRemove;
  var brushStroke;
  var brushExtent;
  var brushRange;
  var brushExtentBarYs;
  var brushLine;
  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*bins*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(0, bins = bins || []);
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    2) {
       $$invalidate(1, flags = flags ? _objectSpread$5(_objectSpread$5({}, defaultFlags), flags) : defaultFlags);
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    4) {
       $$invalidate(2, geometry = geometry ? _objectSpread$5(_objectSpread$5({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*message*/
    8) {
       $$invalidate(3, message = message || "No data");
    }

    if ($$self.$$.dirty[0] &
    /*selectedBins*/
    16) {
       $$invalidate(4, selectedBins = selectedBins || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728) {
       $$invalidate(27, theme = theme ? _objectSpread$5(_objectSpread$5({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*ticksFormatFn*/
    268435456) {
       $$invalidate(28, ticksFormatFn = ticksFormatFn || function (x) {
        return x;
      });
    }

    if ($$self.$$.dirty[0] &
    /*geometry, flags*/
    6) {
       $$invalidate(8, safety = {
        top: geometry.safetyY,
        right: flags.isRightToLeft ? flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks : geometry.safetyXValues,
        bottom: geometry.safetyY,
        left: flags.isRightToLeft ? geometry.safetyXValues : flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks
      });
    }

    if ($$self.$$.dirty[0] &
    /*width, safety*/
    320) {
       $$invalidate(9, innerWidth = Math.max(0, width - safety.left - safety.right));
    }

    if ($$self.$$.dirty[0] &
    /*height, safety, geometry*/
    292) {
       $$invalidate(10, innerHeight = Math.max(0, height - safety.top - safety.bottom - geometry.maxFontSize));
    }

    if ($$self.$$.dirty[0] &
    /*flags, innerWidth, innerHeight*/
    1538) {
       $$invalidate(11, origin = {
        x: flags.isRightToLeft ? innerWidth : 0,
        y: flags.isTopDown ? 0 : innerHeight
      });
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    2) {
       direction = {
        x: flags.isRightToLeft ? -1 : 1,
        y: flags.isTopDown ? 1 : -1
      };
    }

    if ($$self.$$.dirty[0] &
    /*flags, geometry*/
    6) {
       $$invalidate(12, ticksX = flags.isRightToLeft ? geometry.originRadius + geometry.textPadding : -(geometry.originRadius + geometry.textPadding));
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    2) {
       $$invalidate(13, ticksAnchor = flags.isRightToLeft ? "start" : "end");
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    1) {
       $$invalidate(33, useValue = bins.length && has(bins[0], "value"));
    }

    if ($$self.$$.dirty[1] &
    /*useValue*/
    4) {
       $$invalidate(34, getBinsMax = useValue ? arrayMaxWith(getValue) : arrayMaxWith(getValuesLength));
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    1 | $$self.$$.dirty[1] &
    /*getBinsMax*/
    8) {
       $$invalidate(35, valuesMax = getBinsMax(bins));
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    1) {
       $$invalidate(30, rangesExtent = bins.length ? [bins[0].range[0], last(bins).range[1]] : []);
    }

    if ($$self.$$.dirty[0] &
    /*bins, flags, innerWidth, rangesExtent, innerHeight*/
    1073743363 | $$self.$$.dirty[1] &
    /*valuesMax*/
    16) {
      /* eslint-disable indent */
       $$invalidate(32, scales = bins.length && {
        x: flags.useLogScale ? log().domain([1, valuesMax]).range([innerWidth / Math.log10(valuesMax), innerWidth]) : linear$1().domain([0, valuesMax]).range([0, innerWidth]),
        y: linear$1().domain(rangesExtent).range([0, innerHeight])
      });
    }

    if ($$self.$$.dirty[0] &
    /*bins, ticksFormatFn, flags*/
    268435459 | $$self.$$.dirty[1] &
    /*scales*/
    2) {
       $$invalidate(14, ticks = getBinsTicks(bins).map(function (tick) {
        return {
          tick: ticksFormatFn(tick),
          y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
        };
      }));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    64) {
       $$invalidate(17, isBrushing = $brush.state === "Brushing");
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    64) {
       $$invalidate(39, doesBrushAdd = $brush.modifier === "shift");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    131072 | $$self.$$.dirty[1] &
    /*$brush*/
    64) {
       $$invalidate(42, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    131072 | $$self.$$.dirty[1] &
    /*brushExtent*/
    2048) {
       $$invalidate(43, brushRange = isBrushing && inclusiveRange(brushExtent));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    64) {
       $$invalidate(40, doesBrushRemove = $brush.modifier === "alt");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, selectedBins*/
    131088 | $$self.$$.dirty[1] &
    /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/
    4928) {
       if (isBrushing) {
        $$invalidate(4, selectedBins = doesBrushAdd ? uniques(concat(selectedBins, brushRange)) : doesBrushRemove ? pullFrom(selectedBins, brushRange) : brushRange);
        dispatch("brushed", {
          end: $brush.end,
          selectedBins: selectedBins,
          start: $brush.start
        });
      }
    }

    if ($$self.$$.dirty[0] &
    /*bins, selectedBins, flags, innerWidth, innerHeight, geometry, binsFill, theme*/
    671090199 | $$self.$$.dirty[1] &
    /*scales*/
    2) {
      /* eslint-enable indent */
       $$invalidate(15, bars = bins.map(function (bin, index) {
        var range = bin.range,
            values = bin.values,
            value = bin.value;
        var selected = selectedBins.length && selectedBins.includes(index);
        var displayValue = values ? values.length : value;
        var barLength = scales.x(displayValue);
        var barThickness = scales.y(range[1]) - scales.y(range[0]);
        var x = flags.isRightToLeft ? innerWidth - barLength : 0;
        var y1 = flags.isTopDown ? scales.y(range[0]) : innerHeight - scales.y(range[0]) - barThickness;
        var y2 = y1 + barThickness;
        var labelX = flags.isRightToLeft ? x - geometry.textPadding : barLength + geometry.textPadding;
        var labelAnchor = flags.isRightToLeft ? "end" : "start";
        var fill = bin.color || (binsFill && binsFill[index] ? binsFill[index] : theme.binFill);
        return _objectSpread$5(_objectSpread$5({}, bin), {
          barLength: barLength,
          barThickness: barThickness,
          displayValue: displayValue,
          fill: fill,
          labelAnchor: labelAnchor,
          labelX: labelX,
          selected: selected,
          x: x,
          y1: y1,
          y2: y2
        });
      }));
    }

    if ($$self.$$.dirty[0] &
    /*bars*/
    32768) {
       $$invalidate(36, maxBarThickness = makeMaxBarThickness(bars));
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    4 | $$self.$$.dirty[1] &
    /*maxBarThickness*/
    32) {
       $$invalidate(16, fontSize = Math.min(geometry.maxFontSize, geometry.fontSizeFactor * maxBarThickness));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    64) {
       isPressed = $brush.state === "Pressed";
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728 | $$self.$$.dirty[1] &
    /*doesBrushAdd, doesBrushRemove*/
    768) {
       $$invalidate(41, brushStroke = doesBrushAdd ? theme.brushAddStroke : doesBrushRemove ? theme.brushRemoveStroke : null);
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, bars*/
    163840 | $$self.$$.dirty[1] &
    /*brushExtent*/
    2048) {
       $$invalidate(44, brushExtentBarYs = isBrushing && sort([bars[brushExtent[0]].y1, bars[brushExtent[0]].y2, bars[brushExtent[1]].y1, bars[brushExtent[1]].y2]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    131072 | $$self.$$.dirty[1] &
    /*brushExtentBarYs*/
    8192) {
       $$invalidate(18, brushLine = isBrushing && {
        y1: brushExtentBarYs[0],
        y2: brushExtentBarYs[3]
      });
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728 | $$self.$$.dirty[1] &
    /*brushStroke*/
    1024) {
      /* style */
       $$invalidate(19, style = makeStyleVars(_objectSpread$5(_objectSpread$5({}, theme), {}, {
        brushStroke: brushStroke
      })));
    }
  };

  return [bins, flags, geometry, message, selectedBins, height, width, isMousedown, safety, innerWidth, innerHeight, origin, ticksX, ticksAnchor, ticks, bars, fontSize, isBrushing, brushLine, style, brush, onMouseenter, onMousedown, onMousemove, onMouseup, onMouseleave, resetSelection, theme, ticksFormatFn, binsFill];
}

var HistogramG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(HistogramG, _SvelteComponentDev);

  var _super = _createSuper$i(HistogramG);

  function HistogramG(options) {
    var _this;

    _classCallCheck(this, HistogramG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {
      height: 5,
      width: 6,
      bins: 0,
      binsFill: 29,
      flags: 1,
      geometry: 2,
      message: 3,
      selectedBins: 4,
      theme: 27,
      ticksFormatFn: 28
    }, [-1, -1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "HistogramG",
      options: options,
      id: create_fragment$i.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*height*/
    ctx[5] === undefined && !("height" in props)) {
      console.warn("<HistogramG> was created without expected prop 'height'");
    }

    if (
    /*width*/
    ctx[6] === undefined && !("width" in props)) {
      console.warn("<HistogramG> was created without expected prop 'width'");
    }

    if (
    /*bins*/
    ctx[0] === undefined && !("bins" in props)) {
      console.warn("<HistogramG> was created without expected prop 'bins'");
    }

    if (
    /*binsFill*/
    ctx[29] === undefined && !("binsFill" in props)) {
      console.warn("<HistogramG> was created without expected prop 'binsFill'");
    }

    if (
    /*flags*/
    ctx[1] === undefined && !("flags" in props)) {
      console.warn("<HistogramG> was created without expected prop 'flags'");
    }

    if (
    /*geometry*/
    ctx[2] === undefined && !("geometry" in props)) {
      console.warn("<HistogramG> was created without expected prop 'geometry'");
    }

    if (
    /*message*/
    ctx[3] === undefined && !("message" in props)) {
      console.warn("<HistogramG> was created without expected prop 'message'");
    }

    if (
    /*selectedBins*/
    ctx[4] === undefined && !("selectedBins" in props)) {
      console.warn("<HistogramG> was created without expected prop 'selectedBins'");
    }

    if (
    /*theme*/
    ctx[27] === undefined && !("theme" in props)) {
      console.warn("<HistogramG> was created without expected prop 'theme'");
    }

    if (
    /*ticksFormatFn*/
    ctx[28] === undefined && !("ticksFormatFn" in props)) {
      console.warn("<HistogramG> was created without expected prop 'ticksFormatFn'");
    }

    return _this;
  }

  _createClass(HistogramG, [{
    key: "height",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "binsFill",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return HistogramG;
}(SvelteComponentDev);

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$d = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramDiv.svelte"; // (34:1) {#if title}

function create_if_block_1$8(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*title*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-4i00u3");
      add_location(h2, file$d, 35, 2, 697);
      attr_dev(header, "class", "svelte-4i00u3");
      toggle_class(header, "rightToLeft",
      /*flags*/
      ctx[3] &&
      /*flags*/
      ctx[3].isRightToLeft);
      add_location(header, file$d, 34, 1, 637);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      append_dev(header, h2);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data_dev(t,
      /*title*/
      ctx[0]);

      if (dirty &
      /*flags*/
      8) {
        toggle_class(header, "rightToLeft",
        /*flags*/
        ctx[3] &&
        /*flags*/
        ctx[3].isRightToLeft);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$8.name,
    type: "if",
    source: "(34:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (48:3) {#if bins}


function create_if_block$a(ctx) {
  var histogramg;
  var current;
  histogramg = new HistogramG({
    props: {
      bins:
      /*bins*/
      ctx[1],
      binsFill:
      /*binsFill*/
      ctx[2],
      flags:
      /*flags*/
      ctx[3],
      geometry:
      /*geometry*/
      ctx[4],
      height:
      /*height*/
      ctx[9],
      message:
      /*message*/
      ctx[5],
      selectedBins:
      /*selectedBins*/
      ctx[6],
      theme:
      /*theme*/
      ctx[7],
      ticksFormatFn:
      /*ticksFormatFn*/
      ctx[8],
      width:
      /*width*/
      ctx[10]
    },
    $$inline: true
  });
  histogramg.$on("brushed",
  /*brushed_handler*/
  ctx[14]);
  histogramg.$on("brushend",
  /*brushend_handler*/
  ctx[15]);
  histogramg.$on("brushstart",
  /*brushstart_handler*/
  ctx[16]);
  histogramg.$on("clicked",
  /*clicked_handler*/
  ctx[17]);
  histogramg.$on("entered",
  /*entered_handler*/
  ctx[18]);
  histogramg.$on("exited",
  /*exited_handler*/
  ctx[19]);
  var block = {
    c: function create() {
      create_component(histogramg.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(histogramg.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(histogramg, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var histogramg_changes = {};
      if (dirty &
      /*bins*/
      2) histogramg_changes.bins =
      /*bins*/
      ctx[1];
      if (dirty &
      /*binsFill*/
      4) histogramg_changes.binsFill =
      /*binsFill*/
      ctx[2];
      if (dirty &
      /*flags*/
      8) histogramg_changes.flags =
      /*flags*/
      ctx[3];
      if (dirty &
      /*geometry*/
      16) histogramg_changes.geometry =
      /*geometry*/
      ctx[4];
      if (dirty &
      /*height*/
      512) histogramg_changes.height =
      /*height*/
      ctx[9];
      if (dirty &
      /*message*/
      32) histogramg_changes.message =
      /*message*/
      ctx[5];
      if (dirty &
      /*selectedBins*/
      64) histogramg_changes.selectedBins =
      /*selectedBins*/
      ctx[6];
      if (dirty &
      /*theme*/
      128) histogramg_changes.theme =
      /*theme*/
      ctx[7];
      if (dirty &
      /*ticksFormatFn*/
      256) histogramg_changes.ticksFormatFn =
      /*ticksFormatFn*/
      ctx[8];
      if (dirty &
      /*width*/
      1024) histogramg_changes.width =
      /*width*/
      ctx[10];
      histogramg.$set(histogramg_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(histogramg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(histogramg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(histogramg, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$a.name,
    type: "if",
    source: "(48:3) {#if bins}",
    ctx: ctx
  });
  return block;
}

function create_fragment$j(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var main_resize_listener;
  var current;
  var if_block0 =
  /*title*/
  ctx[0] && create_if_block_1$8(ctx);
  var if_block1 =
  /*bins*/
  ctx[1] && create_if_block$a(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      svg = claim_element(main_nodes, "svg", {
        width: true,
        height: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      if (if_block1) if_block1.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[10]);
      attr_dev(svg, "height",
      /*height*/
      ctx[9]);
      attr_dev(svg, "class", "svelte-4i00u3");
      add_location(svg, file$d, 43, 2, 839);
      attr_dev(main, "class", "svelte-4i00u3");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[20].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[0] &&
      /*title*/
      ctx[0].length);
      add_location(main, file$d, 38, 1, 733);
      attr_dev(div, "class", "HistogramDiv svelte-4i00u3");
      attr_dev(div, "style",
      /*style*/
      ctx[11]);
      toggle_class(div, "interactive",
      /*flags*/
      ctx[3] &&
      /*flags*/
      ctx[3].isInteractive);
      add_location(div, file$d, 28, 0, 535);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      append_dev(main, svg);
      if (if_block1) if_block1.m(svg, null);
      main_resize_listener = add_resize_listener(main,
      /*main_elementresize_handler*/
      ctx[20].bind(main));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*title*/
      ctx[0]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$8(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*bins*/
      ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*bins*/
          2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$a(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(svg, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*width*/
      1024) {
        attr_dev(svg, "width",
        /*width*/
        ctx[10]);
      }

      if (!current || dirty &
      /*height*/
      512) {
        attr_dev(svg, "height",
        /*height*/
        ctx[9]);
      }

      if (dirty &
      /*title*/
      1) {
        toggle_class(main, "titled",
        /*title*/
        ctx[0] &&
        /*title*/
        ctx[0].length);
      }

      if (!current || dirty &
      /*style*/
      2048) {
        attr_dev(div, "style",
        /*style*/
        ctx[11]);
      }

      if (dirty &
      /*flags*/
      8) {
        toggle_class(div, "interactive",
        /*flags*/
        ctx[3] &&
        /*flags*/
        ctx[3].isInteractive);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      main_resize_listener();
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

function instance$j($$self, $$props, $$invalidate) {
  var headerHeight = $$props.headerHeight;
  var padding = $$props.padding;
  var title = $$props.title;
  var bins = $$props.bins;
  var binsFill = $$props.binsFill;
  var flags = $$props.flags;
  var geometry = $$props.geometry;
  var message = $$props.message;
  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  var height = 0;
  var width = 0;
  var writable_props = ["headerHeight", "padding", "title", "bins", "binsFill", "flags", "geometry", "message", "selectedBins", "theme", "ticksFormatFn"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<HistogramDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("HistogramDiv", $$slots, []);

  function brushed_handler(event) {
    bubble($$self, event);
  }

  function brushend_handler(event) {
    bubble($$self, event);
  }

  function brushstart_handler(event) {
    bubble($$self, event);
  }

  function clicked_handler(event) {
    bubble($$self, event);
  }

  function entered_handler(event) {
    bubble($$self, event);
  }

  function exited_handler(event) {
    bubble($$self, event);
  }

  function main_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(9, height);
    $$invalidate(10, width);
  }

  $$self.$set = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(13, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(2, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(3, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("message" in $$props) $$invalidate(5, message = $$props.message);
    if ("selectedBins" in $$props) $$invalidate(6, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(7, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(8, ticksFormatFn = $$props.ticksFormatFn);
  };

  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      HistogramG: HistogramG,
      headerHeight: headerHeight,
      padding: padding,
      title: title,
      bins: bins,
      binsFill: binsFill,
      flags: flags,
      geometry: geometry,
      message: message,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      height: height,
      width: width,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(13, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(2, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(3, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("message" in $$props) $$invalidate(5, message = $$props.message);
    if ("selectedBins" in $$props) $$invalidate(6, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(7, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(8, ticksFormatFn = $$props.ticksFormatFn);
    if ("height" in $$props) $$invalidate(9, height = $$props.height);
    if ("width" in $$props) $$invalidate(10, width = $$props.width);
    if ("style" in $$props) $$invalidate(11, style = $$props.style);
  };

  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*padding*/
    8192) {
       $$invalidate(13, padding = padding || "10px");
    }

    if ($$self.$$.dirty &
    /*headerHeight*/
    4096) {
       $$invalidate(12, headerHeight = headerHeight || "2rem");
    }

    if ($$self.$$.dirty &
    /*headerHeight, padding*/
    12288) {
       $$invalidate(11, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };

  return [title, bins, binsFill, flags, geometry, message, selectedBins, theme, ticksFormatFn, height, width, style, headerHeight, padding, brushed_handler, brushend_handler, brushstart_handler, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}

var HistogramDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(HistogramDiv, _SvelteComponentDev);

  var _super = _createSuper$j(HistogramDiv);

  function HistogramDiv(options) {
    var _this;

    _classCallCheck(this, HistogramDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {
      headerHeight: 12,
      padding: 13,
      title: 0,
      bins: 1,
      binsFill: 2,
      flags: 3,
      geometry: 4,
      message: 5,
      selectedBins: 6,
      theme: 7,
      ticksFormatFn: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "HistogramDiv",
      options: options,
      id: create_fragment$j.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*headerHeight*/
    ctx[12] === undefined && !("headerHeight" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'headerHeight'");
    }

    if (
    /*padding*/
    ctx[13] === undefined && !("padding" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'padding'");
    }

    if (
    /*title*/
    ctx[0] === undefined && !("title" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'title'");
    }

    if (
    /*bins*/
    ctx[1] === undefined && !("bins" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'bins'");
    }

    if (
    /*binsFill*/
    ctx[2] === undefined && !("binsFill" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'binsFill'");
    }

    if (
    /*flags*/
    ctx[3] === undefined && !("flags" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'flags'");
    }

    if (
    /*geometry*/
    ctx[4] === undefined && !("geometry" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'geometry'");
    }

    if (
    /*message*/
    ctx[5] === undefined && !("message" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'message'");
    }

    if (
    /*selectedBins*/
    ctx[6] === undefined && !("selectedBins" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'selectedBins'");
    }

    if (
    /*theme*/
    ctx[7] === undefined && !("theme" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'theme'");
    }

    if (
    /*ticksFormatFn*/
    ctx[8] === undefined && !("ticksFormatFn" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'ticksFormatFn'");
    }

    return _this;
  }

  _createClass(HistogramDiv, [{
    key: "headerHeight",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "binsFill",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return HistogramDiv;
}(SvelteComponentDev);

var histogram = /*#__PURE__*/Object.freeze({
	__proto__: null,
	HistogramG: HistogramG,
	HistogramDiv: HistogramDiv,
	exactAmountBins: exactAmountBins,
	areValidBins: areValidBins,
	getBinsItems: getBinsItems,
	getValuesLength: getValuesLength,
	getBinsMax: getBinsMax,
	getBinsMin: getBinsMin,
	getBinsExtent: getBinsExtent,
	isNonEmptyBin: isNonEmptyBin,
	findFirstNonEmptyBinIndex: findFirstNonEmptyBinIndex,
	findLastNonEmptyBinIndex: findLastNonEmptyBinIndex,
	getTrimmedBinsStats: getTrimmedBinsStats,
	getBinsTicks: getBinsTicks,
	getNonEmptyBinsTicks: getNonEmptyBinsTicks
});

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var components = _objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6({}, barchart), choropleth), histogram), legend);

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$e = "src/routes/components/[slug].svelte";

function get_each_context$7(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[22] = list[i][0];
  child_ctx[23] = list[i][1];
  return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[26] = list[i][0];
  child_ctx[27] = list[i][1];
  return child_ctx;
}

function get_each_context_2$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[26] = list[i].key;
  child_ctx[31] = i;
  return child_ctx;
} // (73:2) {#if data.length > 1}


function create_if_block_2$6(ctx) {
  var div1;
  var h2;
  var t0;
  var t1;
  var div0;
  var select;
  var select_size_value;
  var mounted;
  var dispose;
  var each_value_2 =
  /*data*/
  ctx[0];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      div1 = element("div");
      h2 = element("h2");
      t0 = text("Choose an example");
      t1 = space();
      div0 = element("div");
      select = element("select");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h2 = claim_element(div1_nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Choose an example");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      select = claim_element(div0_nodes, "SELECT", {
        size: true,
        class: true
      });
      var select_nodes = children(select);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(select_nodes);
      }

      select_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h2, file$e, 74, 3, 1698);
      attr_dev(select, "size", select_size_value =
      /*data*/
      ctx[0].length);
      attr_dev(select, "class", "svelte-1gqqmmb");
      add_location(select, file$e, 77, 4, 1800);
      attr_dev(div0, "class", "distancer svelte-1gqqmmb");
      add_location(div0, file$e, 75, 3, 1728);
      attr_dev(div1, "class", "distancer svelte-1gqqmmb");
      add_location(div1, file$e, 73, 2, 1671);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, h2);
      append_dev(h2, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);
      append_dev(div0, select);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(select, null);
      }

      if (!mounted) {
        dispose = listen_dev(select, "change",
        /*change_handler*/
        ctx[15], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*selected, data*/
      1025) {
        each_value_2 =
        /*data*/
        ctx[0];
        validate_each_argument(each_value_2);

        var _i4;

        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2$1(ctx, each_value_2, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(select, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_2.length;
      }

      if (dirty[0] &
      /*data*/
      1 && select_size_value !== (select_size_value =
      /*data*/
      ctx[0].length)) {
        attr_dev(select, "size", select_size_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$6.name,
    type: "if",
    source: "(73:2) {#if data.length > 1}",
    ctx: ctx
  });
  return block;
} // (82:5) {#each data as {key}


function create_each_block_2$1(ctx) {
  var option;
  var t_value =
  /*key*/
  ctx[26] + "";
  var t;
  var option_value_value;
  var option_selected_value;
  var block = {
    c: function create() {
      option = element("option");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      option = claim_element(nodes, "OPTION", {
        value: true,
        selected: true,
        class: true
      });
      var option_nodes = children(option);
      t = claim_text(option_nodes, t_value);
      option_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      option.__value = option_value_value =
      /*index*/
      ctx[31];
      option.value = option.__value;
      option.selected = option_selected_value =
      /*index*/
      ctx[31] ===
      /*selected*/
      ctx[10];
      attr_dev(option, "class", "svelte-1gqqmmb");
      add_location(option, file$e, 82, 5, 1943);
    },
    m: function mount(target, anchor) {
      insert_dev(target, option, anchor);
      append_dev(option, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*data*/
      1 && t_value !== (t_value =
      /*key*/
      ctx[26] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*selected*/
      1024 && option_selected_value !== (option_selected_value =
      /*index*/
      ctx[31] ===
      /*selected*/
      ctx[10])) {
        prop_dev(option, "selected", option_selected_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(option);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2$1.name,
    type: "each",
    source: "(82:5) {#each data as {key}",
    ctx: ctx
  });
  return block;
} // (94:2) {#if payloads}


function create_if_block_1$9(ctx) {
  var h2;
  var t0;
  var t1;
  var div;

  var each_value_1 = pairs$1(
  /*payloads*/
  ctx[8]);

  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Events");
      t1 = space();
      div = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Events");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h2, file$e, 94, 2, 2120);
      attr_dev(div, "class", "distancer svelte-1gqqmmb");
      add_location(div, file$e, 95, 2, 2138);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*payloads*/
      256) {
        each_value_1 = pairs$1(
        /*payloads*/
        ctx[8]);
        validate_each_argument(each_value_1);

        var _i8;

        for (_i8 = 0; _i8 < each_value_1.length; _i8 += 1) {
          var child_ctx = get_each_context_1$3(ctx, each_value_1, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_1$3(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(div, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$9.name,
    type: "if",
    source: "(94:2) {#if payloads}",
    ctx: ctx
  });
  return block;
} // (97:3) {#each _.pairs(payloads) as [key, value]}


function create_each_block_1$3(ctx) {
  var div;
  var span;
  var t0_value =
  /*key*/
  ctx[26] + "";
  var t0;
  var t1;
  var pre;
  var t2_value = (
  /*value*/
  ctx[27] || "[payload]") + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      div = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      pre = element("pre");
      t2 = text(t2_value);
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      span_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      pre = claim_element(div_nodes, "PRE", {
        class: true
      });
      var pre_nodes = children(pre);
      t2 = claim_text(pre_nodes, t2_value);
      pre_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-1gqqmmb");
      add_location(span, file$e, 98, 4, 2232);
      attr_dev(pre, "class", "svelte-1gqqmmb");
      add_location(pre, file$e, 99, 4, 2255);
      attr_dev(div, "class", "row svelte-1gqqmmb");
      add_location(div, file$e, 97, 3, 2210);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, span);
      append_dev(span, t0);
      append_dev(div, t1);
      append_dev(div, pre);
      append_dev(pre, t2);
      append_dev(div, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*payloads*/
      256 && t0_value !== (t0_value =
      /*key*/
      ctx[26] + "")) set_data_dev(t0, t0_value);
      if (dirty[0] &
      /*payloads*/
      256 && t2_value !== (t2_value = (
      /*value*/
      ctx[27] || "[payload]") + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$3.name,
    type: "each",
    source: "(97:3) {#each _.pairs(payloads) as [key, value]}",
    ctx: ctx
  });
  return block;
} // (115:3) {#each displayProps as [propName, propValue]}


function create_each_block$7(ctx) {
  var h3;
  var code;
  var t0_value =
  /*propName*/
  ctx[22] + "";
  var t0;
  var t1;
  var div;
  var jsontree;
  var t2;
  var current;
  jsontree = new Root({
    props: {
      value:
      /*propValue*/
      ctx[23]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      h3 = element("h3");
      code = element("code");
      t0 = text(t0_value);
      t1 = space();
      div = element("div");
      create_component(jsontree.$$.fragment);
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      code = claim_element(h3_nodes, "CODE", {});
      var code_nodes = children(code);
      t0 = claim_text(code_nodes, t0_value);
      code_nodes.forEach(detach_dev);
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(jsontree.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(code, file$e, 115, 7, 2551);
      add_location(h3, file$e, 115, 3, 2547);
      attr_dev(div, "class", "distancer svelte-1gqqmmb");
      add_location(div, file$e, 116, 3, 2583);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h3, anchor);
      append_dev(h3, code);
      append_dev(code, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);
      mount_component(jsontree, div, null);
      append_dev(div, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty[0] &
      /*displayProps*/
      4096) && t0_value !== (t0_value =
      /*propName*/
      ctx[22] + "")) set_data_dev(t0, t0_value);
      var jsontree_changes = {};
      if (dirty[0] &
      /*displayProps*/
      4096) jsontree_changes.value =
      /*propValue*/
      ctx[23];
      jsontree.$set(jsontree_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsontree.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsontree.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h3);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_component(jsontree);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$7.name,
    type: "each",
    source: "(115:3) {#each displayProps as [propName, propValue]}",
    ctx: ctx
  });
  return block;
} // (138:2) {:else}


function create_else_block$5(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*current_data*/
  ctx[11].props];
  var switch_value =
  /*component*/
  ctx[9];

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
    switch_instance = new switch_value(switch_props());
    /*switch_instance_binding_1*/

    ctx[18](switch_instance);
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
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty[0] &
      /*current_data*/
      2048 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*current_data*/
      ctx[11].props)]) : {};

      if (switch_value !== (switch_value =
      /*component*/
      ctx[9])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          /*switch_instance_binding_1*/

          ctx[18](switch_instance);
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
      /*switch_instance_binding_1*/
      ctx[18](null);
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$5.name,
    type: "else",
    source: "(138:2) {:else}",
    ctx: ctx
  });
  return block;
} // (125:2) {#if isSVG}


function create_if_block$b(ctx) {
  var div;
  var svg;
  var switch_instance;
  var div_resize_listener;
  var current;
  var switch_instance_spread_levels = [_objectSpread$7(_objectSpread$7({},
  /*current_data*/
  ctx[11].props), {}, {
    width:
    /*width*/
    ctx[5],
    height:
    /*height*/
    ctx[6]
  })];
  var switch_value =
  /*component*/
  ctx[9];

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
    switch_instance = new switch_value(switch_props());
    /*switch_instance_binding*/

    ctx[16](switch_instance);
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
      svg = claim_element(div_nodes, "svg", {
        width: true,
        height: true
      }, 1);
      var svg_nodes = children(svg);
      if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[5]);
      attr_dev(svg, "height",
      /*height*/
      ctx[6]);
      add_location(svg, file$e, 129, 3, 2814);
      attr_dev(div, "class", "svgwrapper svelte-1gqqmmb");
      add_render_callback(function () {
        return (
          /*div_elementresize_handler*/
          ctx[17].call(div)
        );
      });
      add_location(div, file$e, 125, 2, 2721);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, svg);

      if (switch_instance) {
        mount_component(switch_instance, svg, null);
      }

      div_resize_listener = add_resize_listener(div,
      /*div_elementresize_handler*/
      ctx[17].bind(div));
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty[0] &
      /*current_data, width, height*/
      2144 ? get_spread_update(switch_instance_spread_levels, [_objectSpread$7(_objectSpread$7({},
      /*current_data*/
      ctx[11].props), {}, {
        width:
        /*width*/
        ctx[5],
        height:
        /*height*/
        ctx[6]
      })]) : {};

      if (switch_value !== (switch_value =
      /*component*/
      ctx[9])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          /*switch_instance_binding*/

          ctx[16](switch_instance);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, svg, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }

      if (!current || dirty[0] &
      /*width*/
      32) {
        attr_dev(svg, "width",
        /*width*/
        ctx[5]);
      }

      if (!current || dirty[0] &
      /*height*/
      64) {
        attr_dev(svg, "height",
        /*height*/
        ctx[6]);
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
      /*switch_instance_binding*/

      ctx[16](null);
      if (switch_instance) destroy_component(switch_instance);
      div_resize_listener();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$b.name,
    type: "if",
    source: "(125:2) {#if isSVG}",
    ctx: ctx
  });
  return block;
}

function create_fragment$k(ctx) {
  var title_value;
  var t0;
  var main;
  var h1;
  var t1;
  var t2;
  var div3;
  var div0;
  var elements;
  var t3;
  var t4;
  var t5;
  var div1;
  var h20;
  var t6;
  var t7;
  var pre;
  var t8_value =
  /*current_data*/
  ctx[11].usage + "";
  var t8;
  var t9;
  var div2;
  var h21;
  var t10;
  var t11;
  var t12;
  var div4;
  var current_block_type_index;
  var if_block2;
  var current;
  document.title = title_value = "" + (
  /*name*/
  ctx[2] + ": " +
  /*title*/
  ctx[3] + " - Svizzle");
  elements = new Elements({
    props: {
      elements:
      /*doc*/
      ctx[1]
    },
    $$inline: true
  });
  var if_block0 =
  /*data*/
  ctx[0].length > 1 && create_if_block_2$6(ctx);
  var if_block1 =
  /*payloads*/
  ctx[8] && create_if_block_1$9(ctx);
  var each_value =
  /*displayProps*/
  ctx[12];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block_creators = [create_if_block$b, create_else_block$5];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*isSVG*/
    ctx[7]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      t0 = space();
      main = element("main");
      h1 = element("h1");
      t1 = text(
      /*title*/
      ctx[3]);
      t2 = space();
      div3 = element("div");
      div0 = element("div");
      create_component(elements.$$.fragment);
      t3 = space();
      if (if_block0) if_block0.c();
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      div1 = element("div");
      h20 = element("h2");
      t6 = text("Usage");
      t7 = space();
      pre = element("pre");
      t8 = text(t8_value);
      t9 = space();
      div2 = element("div");
      h21 = element("h2");
      t10 = text("Props");
      t11 = space();

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      t12 = space();
      div4 = element("div");
      if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1sqseen\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      h1 = claim_element(main_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*title*/
      ctx[3]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(main_nodes);
      div3 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(elements.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      if (if_block0) if_block0.l(div3_nodes);
      t4 = claim_space(div3_nodes);
      if (if_block1) if_block1.l(div3_nodes);
      t5 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h20 = claim_element(div1_nodes, "H2", {});
      var h20_nodes = children(h20);
      t6 = claim_text(h20_nodes, "Usage");
      h20_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      pre = claim_element(div1_nodes, "PRE", {
        class: true
      });
      var pre_nodes = children(pre);
      t8 = claim_text(pre_nodes, t8_value);
      pre_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h21 = claim_element(div2_nodes, "H2", {});
      var h21_nodes = children(h21);
      t10 = claim_text(h21_nodes, "Props");
      h21_nodes.forEach(detach_dev);
      t11 = claim_space(div2_nodes);

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(div2_nodes);
      }

      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t12 = claim_space(main_nodes);
      div4 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      if_block2.l(div4_nodes);
      div4_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-1gqqmmb");
      add_location(h1, file$e, 63, 1, 1503);
      attr_dev(div0, "class", "distancer svelte-1gqqmmb");
      add_location(div0, file$e, 67, 2, 1562);
      add_location(h20, file$e, 107, 3, 2374);
      attr_dev(pre, "class", "svelte-1gqqmmb");
      add_location(pre, file$e, 108, 3, 2392);
      attr_dev(div1, "class", "distancer svelte-1gqqmmb");
      add_location(div1, file$e, 106, 2, 2347);
      add_location(h21, file$e, 113, 3, 2480);
      attr_dev(div2, "class", "distancer svelte-1gqqmmb");
      add_location(div2, file$e, 112, 2, 2453);
      attr_dev(div3, "class", "col col1 svelte-1gqqmmb");
      add_location(div3, file$e, 64, 1, 1521);
      attr_dev(div4, "class", "col col2 svelte-1gqqmmb");
      add_location(div4, file$e, 123, 1, 2682);
      attr_dev(main, "class", "svelte-1gqqmmb");
      add_location(main, file$e, 62, 0, 1495);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, main, anchor);
      append_dev(main, h1);
      append_dev(h1, t1);
      append_dev(main, t2);
      append_dev(main, div3);
      append_dev(div3, div0);
      mount_component(elements, div0, null);
      append_dev(div3, t3);
      if (if_block0) if_block0.m(div3, null);
      append_dev(div3, t4);
      if (if_block1) if_block1.m(div3, null);
      append_dev(div3, t5);
      append_dev(div3, div1);
      append_dev(div1, h20);
      append_dev(h20, t6);
      append_dev(div1, t7);
      append_dev(div1, pre);
      append_dev(pre, t8);
      append_dev(div3, t9);
      append_dev(div3, div2);
      append_dev(div2, h21);
      append_dev(h21, t10);
      append_dev(div2, t11);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(div2, null);
      }

      append_dev(main, t12);
      append_dev(main, div4);
      if_blocks[current_block_type_index].m(div4, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty[0] &
      /*name, title*/
      12) && title_value !== (title_value = "" + (
      /*name*/
      ctx[2] + ": " +
      /*title*/
      ctx[3] + " - Svizzle"))) {
        document.title = title_value;
      }

      if (!current || dirty[0] &
      /*title*/
      8) set_data_dev(t1,
      /*title*/
      ctx[3]);
      var elements_changes = {};
      if (dirty[0] &
      /*doc*/
      2) elements_changes.elements =
      /*doc*/
      ctx[1];
      elements.$set(elements_changes);

      if (
      /*data*/
      ctx[0].length > 1) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_2$6(ctx);
          if_block0.c();
          if_block0.m(div3, t4);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*payloads*/
      ctx[8]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_1$9(ctx);
          if_block1.c();
          if_block1.m(div3, t5);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if ((!current || dirty[0] &
      /*current_data*/
      2048) && t8_value !== (t8_value =
      /*current_data*/
      ctx[11].usage + "")) set_data_dev(t8, t8_value);

      if (dirty[0] &
      /*displayProps*/
      4096) {
        each_value =
        /*displayProps*/
        ctx[12];
        validate_each_argument(each_value);

        var _i12;

        for (_i12 = 0; _i12 < each_value.length; _i12 += 1) {
          var child_ctx = get_each_context$7(ctx, each_value, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);

            transition_in(each_blocks[_i12], 1);
          } else {
            each_blocks[_i12] = create_each_block$7(child_ctx);

            each_blocks[_i12].c();

            transition_in(each_blocks[_i12], 1);

            each_blocks[_i12].m(div2, null);
          }
        }

        group_outros();

        for (_i12 = each_value.length; _i12 < each_blocks.length; _i12 += 1) {
          out(_i12);
        }

        check_outros();
      }

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
        if_block2 = if_blocks[current_block_type_index];

        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block2.c();
        }

        transition_in(if_block2, 1);
        if_block2.m(div4, null);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(elements.$$.fragment, local);

      for (var _i13 = 0; _i13 < each_value.length; _i13 += 1) {
        transition_in(each_blocks[_i13]);
      }

      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(elements.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        transition_out(each_blocks[_i14]);
      }

      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      destroy_component(elements);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      destroy_each(each_blocks, detaching);
      if_blocks[current_block_type_index].d();
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

function preload(_ref) {
  var params = _ref.params,
      query = _ref.query;
  return lookup[params.slug];
}

function instance_1($$self, $$props, $$invalidate) {
  var makeKeyedEmptyString = makeKeyed("");
  var data = $$props.data;
  var doc = $$props.doc;
  var events = $$props.events;
  var name = $$props.name;
  var namespace = $$props.namespace;
  var title = $$props.title;
  var instance;
  var width;
  var height;

  var makeEventHandler = function makeEventHandler(eventName) {
    return function (event) {
      $$invalidate(8, payloads = setIn(payloads, eventName, JSON.stringify(event.detail)));
    };
  };

  var eventRemovers = [];
  var writable_props = ["data", "doc", "events", "name", "namespace", "title"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bslugu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bslugu5D", $$slots, []);

  var change_handler = function change_handler(event) {
    $$invalidate(10, selected = Number(event.target.value));
  };

  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      instance = $$value;
      $$invalidate(4, instance);
    });
  }

  function div_elementresize_handler() {
    width = this.clientWidth;
    height = this.clientHeight;
    $$invalidate(5, width);
    $$invalidate(6, height);
  }

  function switch_instance_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      instance = $$value;
      $$invalidate(4, instance);
    });
  }

  $$self.$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("events" in $$props) $$invalidate(14, events = $$props.events);
    if ("name" in $$props) $$invalidate(2, name = $$props.name);
    if ("namespace" in $$props) $$invalidate(13, namespace = $$props.namespace);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
  };

  $$self.$capture_state = function () {
    return {
      lookup: lookup,
      preload: preload,
      _: _,
      makeKeyed: makeKeyed,
      JSONTree: Root,
      Elements: Elements,
      components: components,
      makeKeyedEmptyString: makeKeyedEmptyString,
      data: data,
      doc: doc,
      events: events,
      name: name,
      namespace: namespace,
      title: title,
      instance: instance,
      width: width,
      height: height,
      makeEventHandler: makeEventHandler,
      eventRemovers: eventRemovers,
      isSVG: isSVG,
      payloads: payloads,
      component: component,
      selected: selected,
      current_data: current_data,
      displayProps: displayProps
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("events" in $$props) $$invalidate(14, events = $$props.events);
    if ("name" in $$props) $$invalidate(2, name = $$props.name);
    if ("namespace" in $$props) $$invalidate(13, namespace = $$props.namespace);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
    if ("instance" in $$props) $$invalidate(4, instance = $$props.instance);
    if ("width" in $$props) $$invalidate(5, width = $$props.width);
    if ("height" in $$props) $$invalidate(6, height = $$props.height);
    if ("eventRemovers" in $$props) $$invalidate(19, eventRemovers = $$props.eventRemovers);
    if ("isSVG" in $$props) $$invalidate(7, isSVG = $$props.isSVG);
    if ("payloads" in $$props) $$invalidate(8, payloads = $$props.payloads);
    if ("component" in $$props) $$invalidate(9, component = $$props.component);
    if ("selected" in $$props) $$invalidate(10, selected = $$props.selected);
    if ("current_data" in $$props) $$invalidate(11, current_data = $$props.current_data);
    if ("displayProps" in $$props) $$invalidate(12, displayProps = $$props.displayProps);
  };

  var isSVG;
  var payloads;
  var component;
  var selected;
  var current_data;
  var displayProps;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*namespace*/
    8192) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(13, namespace = namespace || "html");
    }

    if ($$self.$$.dirty[0] &
    /*namespace*/
    8192) {
       $$invalidate(7, isSVG = namespace === "svg");
    }

    if ($$self.$$.dirty[0] &
    /*events*/
    16384) {
       $$invalidate(8, payloads = events ? makeKeyedEmptyString(events) : null);
    }

    if ($$self.$$.dirty[0] &
    /*name*/
    4) {
       $$invalidate(9, component = components[name]);
    }

    if ($$self.$$.dirty[0] &
    /*data*/
    1) {
       $$invalidate(10, selected = data && 0);
    }

    if ($$self.$$.dirty[0] &
    /*data, selected*/
    1025) {
       $$invalidate(11, current_data = data[selected]);
    }

    if ($$self.$$.dirty[0] &
    /*current_data*/
    2048) {
       $$invalidate(12, displayProps = pairs$1(current_data.props));
    }

    if ($$self.$$.dirty[0] &
    /*data, instance, eventRemovers, events*/
    540689) {
       if (data && instance) {
        eventRemovers.forEach(function (remove) {
          return remove();
        });
        $$invalidate(19, eventRemovers = []);
        events && events.forEach(function (eventName) {
          var eventHandler = makeEventHandler(eventName);
          var eventRemover = instance.$on(eventName, eventHandler);
          eventRemovers.push(eventRemover);
        });
      }
    }
  };

  return [data, doc, name, title, instance, width, height, isSVG, payloads, component, selected, current_data, displayProps, namespace, events, change_handler, switch_instance_binding, div_elementresize_handler, switch_instance_binding_1];
}

var U5Bslugu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bslugu5D, _SvelteComponentDev);

  var _super = _createSuper$k(U5Bslugu5D);

  function U5Bslugu5D(options) {
    var _this;

    _classCallCheck(this, U5Bslugu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance_1, create_fragment$k, safe_not_equal, {
      data: 0,
      doc: 1,
      events: 14,
      name: 2,
      namespace: 13,
      title: 3
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bslugu5D",
      options: options,
      id: create_fragment$k.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'data'");
    }

    if (
    /*doc*/
    ctx[1] === undefined && !("doc" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'doc'");
    }

    if (
    /*events*/
    ctx[14] === undefined && !("events" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'events'");
    }

    if (
    /*name*/
    ctx[2] === undefined && !("name" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'name'");
    }

    if (
    /*namespace*/
    ctx[13] === undefined && !("namespace" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'namespace'");
    }

    if (
    /*title*/
    ctx[3] === undefined && !("title" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'title'");
    }

    return _this;
  }

  _createClass(U5Bslugu5D, [{
    key: "data",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "doc",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "events",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "name",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "namespace",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bslugu5D;
}(SvelteComponentDev);

export default U5Bslugu5D;
export { preload };
