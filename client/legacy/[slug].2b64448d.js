import { A as _slicedToArray, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, v as validate_slots, g as element, t as text, k as claim_element, l as children, m as claim_text, h as detach_dev, n as attr_dev, E as toggle_class, o as add_location, p as insert_dev, r as append_dev, H as listen_dev, u as noop$1, I as bubble, G as set_data_dev, J as empty, K as getContext, L as setContext, M as create_component, N as claim_component, O as mount_component, C as transition_in, D as transition_out, P as destroy_component, f as space, j as claim_space, Q as group_outros, R as check_outros, x as validate_each_argument, z as destroy_each, T as globals, U as null_to_empty, V as validate_each_keys, W as createEventDispatcher, X as beforeUpdate, Y as afterUpdate, Z as svg_element, $ as is_function, a0 as run_all, a1 as add_render_callback, a2 as add_resize_listener, a3 as update_keyed_each, a4 as binding_callbacks, a5 as destroy_block, a6 as set_style, a7 as validate_store, a8 as component_subscribe, a9 as writable, aa as prop_dev, q as query_selector_all, ab as assign, ac as get_spread_update, ad as get_spread_object } from './client.b033306f.js';
import { p as pipe, i as isNotNull, r as reduceWith, g as getKey$3, c as collect, h as head, l as last, a as isUndefined, b as range, d as appendTo, e as sortWith, f as sorterDesc, j as apply, m as make, k as identity$2, n as mapWith, o as always, q as generic, t as allOf, u as isGTE, v as isLTE, w as partial, _ as __, x as transformer$1, y as copy, z as initRange, A as ticks, B as format, C as _defineProperty, D as skipIf, E as isNil, F as pairs$1, G as index, H as updateKey, I as has, J as getPath, K as sort, L as adapter, M as map, N as reduce, O as isNotNil, P as isIterableNotEmpty, Q as every, R as hasKey, S as flatten, T as findIndexWhere, U as findLastIndexWhere, V as slice, W as uniques, X as filterWith, Y as concat, Z as mergeObj, $ as linear$1, a0 as pullFrom, a1 as lookup, a2 as _, a3 as setIn } from './_utils.e3bc92e8.js';

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
  return pipe([collect([identity$2, mapWith(always(value))]), apply(make)]);
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
  var scale = loggish(transformer$1()).domain([1, 10]);

  scale.copy = function () {
    return copy(scale, log()).base(scale.base());
  };

  initRange.apply(scale, arguments);
  return scale;
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

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte";

function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[45] = list[i].barColor;
  child_ctx[46] = list[i].bkgColor;
  child_ctx[47] = list[i].displayValue;
  child_ctx[48] = list[i].dxKey;
  child_ctx[49] = list[i].isNeg;
  child_ctx[50] = list[i].key;
  child_ctx[51] = list[i].label;
  child_ctx[52] = list[i].x;
  child_ctx[53] = list[i].xValue;
  child_ctx[55] = i;
  return child_ctx;
} // (174:1) {#if title}


function create_if_block_1$3(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[3]);
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
      ctx[3]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-79144u");
      add_location(h2, file$7, 175, 2, 4165);
      attr_dev(header, "class", "svelte-79144u");
      add_location(header, file$7, 174, 1, 4154);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      append_dev(header, h2);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*title*/
      8) set_data_dev(t,
      /*title*/
      ctx[3]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(174:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (189:4) {#each bars as {      barColor,      bkgColor,      displayValue,      dxKey,      isNeg,      key,      label,      x,      xValue,     }


function create_each_block$3(key_1, ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var line;
  var line_stroke_value;
  var line_x__value;
  var text0;
  var t0_value =
  /*label*/
  ctx[51] + "";
  var t0;
  var text0_dx_value;
  var text1;
  var t1_value =
  /*displayValue*/
  ctx[47] + "";
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
        y2: true
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
      ctx[6]);
      attr_dev(rect, "fill", rect_fill_value =
      /*bkgColor*/
      ctx[46]);
      attr_dev(rect, "height",
      /*itemHeight*/
      ctx[9]);
      add_location(rect, file$7, 207, 5, 4840);
      attr_dev(line, "stroke", line_stroke_value =
      /*barColor*/
      ctx[45]);
      attr_dev(line, "stroke-width",
      /*barHeight*/
      ctx[0]);
      attr_dev(line, "x1",
      /*x0*/
      ctx[14]);
      attr_dev(line, "x2", line_x__value =
      /*x*/
      ctx[52]);
      attr_dev(line, "y1",
      /*barY*/
      ctx[10]);
      attr_dev(line, "y2",
      /*barY*/
      ctx[10]);
      add_location(line, file$7, 212, 5, 4921);
      attr_dev(text0, "class", "key svelte-79144u");
      attr_dev(text0, "dx", text0_dx_value =
      /*dxKey*/
      ctx[48]);
      attr_dev(text0, "x",
      /*x0*/
      ctx[14]);
      attr_dev(text0, "y",
      /*textY*/
      ctx[11]);
      toggle_class(text0, "neg",
      /*isNeg*/
      ctx[49]);
      add_location(text0, file$7, 220, 5, 5054);
      attr_dev(text1, "class", "value svelte-79144u");
      attr_dev(text1, "x", text1_x_value =
      /*xValue*/
      ctx[53]);
      attr_dev(text1, "y",
      /*textY*/
      ctx[11]);
      toggle_class(text1, "neg",
      /*isNeg*/
      ctx[49]);
      add_location(text1, file$7, 227, 5, 5174);
      attr_dev(g, "class", "item svelte-79144u");
      attr_dev(g, "transform", g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[9] *
      /*index*/
      ctx[55] + ")");
      toggle_class(g, "clickable",
      /*isInteractive*/
      ctx[1]);
      add_location(g, file$7, 199, 4, 4612);
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
          /*onClick*/
          ctx[16](
          /*key*/
          ctx[50])))
            /*onClick*/
            ctx[16](
            /*key*/
            ctx[50]).apply(this, arguments);
        }, false, false, false), listen_dev(g, "mouseenter", function () {
          if (is_function(
          /*onMouseenter*/
          ctx[17](
          /*key*/
          ctx[50])))
            /*onMouseenter*/
            ctx[17](
            /*key*/
            ctx[50]).apply(this, arguments);
        }, false, false, false), listen_dev(g, "mouseleave", function () {
          if (is_function(
          /*onMouseleave*/
          ctx[18](
          /*key*/
          ctx[50])))
            /*onMouseleave*/
            ctx[18](
            /*key*/
            ctx[50]).apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && rect_fill_value !== (rect_fill_value =
      /*bkgColor*/
      ctx[46])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*itemHeight*/
      512) {
        attr_dev(rect, "height",
        /*itemHeight*/
        ctx[9]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && line_stroke_value !== (line_stroke_value =
      /*barColor*/
      ctx[45])) {
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
      16384) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[14]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && line_x__value !== (line_x__value =
      /*x*/
      ctx[52])) {
        attr_dev(line, "x2", line_x__value);
      }

      if (dirty[0] &
      /*barY*/
      1024) {
        attr_dev(line, "y1",
        /*barY*/
        ctx[10]);
      }

      if (dirty[0] &
      /*barY*/
      1024) {
        attr_dev(line, "y2",
        /*barY*/
        ctx[10]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && t0_value !== (t0_value =
      /*label*/
      ctx[51] + "")) set_data_dev(t0, t0_value);

      if (dirty[0] &
      /*bars*/
      32768 && text0_dx_value !== (text0_dx_value =
      /*dxKey*/
      ctx[48])) {
        attr_dev(text0, "dx", text0_dx_value);
      }

      if (dirty[0] &
      /*x0*/
      16384) {
        attr_dev(text0, "x",
        /*x0*/
        ctx[14]);
      }

      if (dirty[0] &
      /*textY*/
      2048) {
        attr_dev(text0, "y",
        /*textY*/
        ctx[11]);
      }

      if (dirty[0] &
      /*bars*/
      32768) {
        toggle_class(text0, "neg",
        /*isNeg*/
        ctx[49]);
      }

      if (dirty[0] &
      /*bars*/
      32768 && t1_value !== (t1_value =
      /*displayValue*/
      ctx[47] + "")) set_data_dev(t1, t1_value);

      if (dirty[0] &
      /*bars*/
      32768 && text1_x_value !== (text1_x_value =
      /*xValue*/
      ctx[53])) {
        attr_dev(text1, "x", text1_x_value);
      }

      if (dirty[0] &
      /*textY*/
      2048) {
        attr_dev(text1, "y",
        /*textY*/
        ctx[11]);
      }

      if (dirty[0] &
      /*bars*/
      32768) {
        toggle_class(text1, "neg",
        /*isNeg*/
        ctx[49]);
      }

      if (dirty[0] &
      /*itemHeight, bars*/
      33280 && g_transform_value !== (g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[9] *
      /*index*/
      ctx[55] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }

      if (dirty[0] &
      /*isInteractive*/
      2) {
        toggle_class(g, "clickable",
        /*isInteractive*/
        ctx[1]);
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
    id: create_each_block$3.name,
    type: "each",
    source: "(189:4) {#each bars as {      barColor,      bkgColor,      displayValue,      dxKey,      isNeg,      key,      label,      x,      xValue,     }",
    ctx: ctx
  });
  return block;
} // (237:3) {#if crossesZero}


function create_if_block$4(ctx) {
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
      ctx[2].axisColor);
      attr_dev(line, "x1",
      /*x0*/
      ctx[14]);
      attr_dev(line, "x2",
      /*x0*/
      ctx[14]);
      attr_dev(line, "y2",
      /*svgHeight*/
      ctx[12]);
      add_location(line, file$7, 237, 3, 5338);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*theme*/
      4 && line_stroke_value !== (line_stroke_value =
      /*theme*/
      ctx[2].axisColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*x0*/
      16384) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[14]);
      }

      if (dirty[0] &
      /*x0*/
      16384) {
        attr_dev(line, "x2",
        /*x0*/
        ctx[14]);
      }

      if (dirty[0] &
      /*svgHeight*/
      4096) {
        attr_dev(line, "y2",
        /*svgHeight*/
        ctx[12]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(237:3) {#if crossesZero}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var rect;
  var g;
  var each_blocks = [];
  var each_1_lookup = new Map();
  var main_resize_listener;
  var mounted;
  var dispose;
  var if_block0 =
  /*title*/
  ctx[3] && create_if_block_1$3(ctx);
  var each_value =
  /*bars*/
  ctx[15];
  validate_each_argument(each_value);

  var get_key = function get_key(ctx) {
    return (
      /*key*/
      ctx[50]
    );
  };

  validate_each_keys(ctx, each_value, get_each_context$3, get_key);

  for (var i = 0; i < each_value.length; i += 1) {
    var child_ctx = get_each_context$3(ctx, each_value, i);
    var key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
  }

  var if_block1 =
  /*crossesZero*/
  ctx[13] && create_if_block$4(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");
      rect = svg_element("rect");
      g = svg_element("g");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      if (if_block1) if_block1.c();
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
      svg = claim_element(main_nodes, "svg", {
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
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-79144u");
      attr_dev(rect, "width",
      /*width*/
      ctx[6]);
      attr_dev(rect, "height",
      /*svgHeight*/
      ctx[12]);
      add_location(rect, file$7, 186, 3, 4396);
      add_location(g, file$7, 187, 3, 4447);
      attr_dev(svg, "width",
      /*width*/
      ctx[6]);
      attr_dev(svg, "height",
      /*svgHeight*/
      ctx[12]);
      add_location(svg, file$7, 185, 2, 4360);
      attr_dev(main, "class", "svelte-79144u");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[29].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[3]);
      add_location(main, file$7, 178, 1, 4201);
      attr_dev(div, "style",
      /*style*/
      ctx[8]);
      attr_dev(div, "class", "BarchartVDiv svelte-79144u");
      add_location(div, file$7, 169, 0, 4102);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      append_dev(main, svg);
      append_dev(svg, rect);
      append_dev(svg, g);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g, null);
      }

      if (if_block1) if_block1.m(svg, null);
      main_resize_listener = add_resize_listener(main,
      /*main_elementresize_handler*/
      ctx[29].bind(main));
      /*main_binding*/

      ctx[30](main);

      if (!mounted) {
        dispose = listen_dev(main, "mouseleave",
        /*mouseleave_handler*/
        ctx[31], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*title*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$3(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*svgHeight*/
      4096) {
        attr_dev(rect, "height",
        /*svgHeight*/
        ctx[12]);
      }

      if (dirty[0] &
      /*itemHeight, bars, isInteractive, onClick, onMouseenter, onMouseleave, textY, x0, barHeight, barY, width*/
      511555) {
        var _each_value =
        /*bars*/
        ctx[15];
        validate_each_argument(_each_value);
        validate_each_keys(ctx, _each_value, get_each_context$3, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value, each_1_lookup, g, destroy_block, create_each_block$3, null, get_each_context$3);
      }

      if (
      /*crossesZero*/
      ctx[13]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block$4(ctx);
          if_block1.c();
          if_block1.m(svg, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(svg, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*svgHeight*/
      4096) {
        attr_dev(svg, "height",
        /*svgHeight*/
        ctx[12]);
      }

      if (dirty[0] &
      /*title*/
      8) {
        toggle_class(main, "titled",
        /*title*/
        ctx[3]);
      }

      if (dirty[0] &
      /*style*/
      256) {
        attr_dev(div, "style",
        /*style*/
        ctx[8]);
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();

      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].d();
      }

      if (if_block1) if_block1.d();
      main_resize_listener();
      /*main_binding*/

      ctx[30](null);
      mounted = false;
      dispose();
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
  var defaultTheme = {
    // exposed but undocumented
    backgroundOpacity: 1,
    // exposed and documented
    axisColor: "grey",
    backgroundColor: transparentColor,
    barDefaultColor: "black",
    focusedKeyColor: "rgba(0, 0, 0, 0.1)",
    fontSize: 14,
    headerHeight: "2rem",
    hoverColor: "rgba(0, 0, 0, 0.05)",
    padding: "10px",
    textColor: "grey"
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
    $$invalidate(33, wasNotResettingScroll = !shouldResetScroll);
  });
  /* events */

  var onClick = function onClick(key) {
    return function () {
      isInteractive && dispatch("clicked", {
        id: key
      });
    };
  };

  var onMouseenter = function onMouseenter(key) {
    return function () {
      isInteractive && dispatch("entered", {
        id: key
      });
      $$invalidate(5, hoveredKey = key);
    };
  };

  var onMouseleave = function onMouseleave(key) {
    return function () {
      isInteractive && dispatch("exited", {
        id: key
      });
    };
  };

  var writable_props = ["barHeight", "focusedKey", "formatFn", "isInteractive", "items", "keyToColor", "keyToColorFn", "keyToLabel", "keyToLabelFn", "shouldResetScroll", "shouldScrollToFocusedKey", "theme", "title", "valueAccessor"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<BarchartVDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("BarchartVDiv", $$slots, []);

  function main_elementresize_handler() {
    width = this.clientWidth;
    height = this.clientHeight;
    $$invalidate(6, width);
    $$invalidate(4, height);
  }

  function main_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      scrollable = $$value;
      ((($$invalidate(7, scrollable), $$invalidate(23, items)), $$invalidate(19, shouldResetScroll)), $$invalidate(32, previousItems)), $$invalidate(33, wasNotResettingScroll);
    });
  }

  var mouseleave_handler = function mouseleave_handler() {
    $$invalidate(5, hoveredKey = null);
  };

  $$self.$set = function ($$props) {
    if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ("focusedKey" in $$props) $$invalidate(21, focusedKey = $$props.focusedKey);
    if ("formatFn" in $$props) $$invalidate(22, formatFn = $$props.formatFn);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("items" in $$props) $$invalidate(23, items = $$props.items);
    if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
    if ("keyToLabel" in $$props) $$invalidate(26, keyToLabel = $$props.keyToLabel);
    if ("keyToLabelFn" in $$props) $$invalidate(27, keyToLabelFn = $$props.keyToLabelFn);
    if ("shouldResetScroll" in $$props) $$invalidate(19, shouldResetScroll = $$props.shouldResetScroll);
    if ("shouldScrollToFocusedKey" in $$props) $$invalidate(28, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
    if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
    if ("valueAccessor" in $$props) $$invalidate(20, valueAccessor = $$props.valueAccessor);
  };

  $$self.$capture_state = function () {
    return {
      isEqual: justCompare,
      index: index,
      afterUpdate: afterUpdate,
      beforeUpdate: beforeUpdate,
      createEventDispatcher: createEventDispatcher,
      linearScale: linear,
      makeStyleVars: makeStyleVars,
      arrayMaxWith: arrayMaxWith,
      arrayMinWith: arrayMinWith,
      getKey: getKey,
      getValue: getValue,
      dispatch: dispatch,
      transparentColor: transparentColor,
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
      barPadding: barPadding,
      itemHeight: itemHeight,
      barY: barY,
      textY: textY,
      svgHeight: svgHeight,
      getMin: getMin,
      getMax: getMax,
      min: min,
      max: max,
      crossesZero: crossesZero,
      domain: domain,
      getX: getX,
      x0: x0,
      bars: bars,
      barsByKey: barsByKey,
      focusedY: focusedY
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ("focusedKey" in $$props) $$invalidate(21, focusedKey = $$props.focusedKey);
    if ("formatFn" in $$props) $$invalidate(22, formatFn = $$props.formatFn);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("items" in $$props) $$invalidate(23, items = $$props.items);
    if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
    if ("keyToLabel" in $$props) $$invalidate(26, keyToLabel = $$props.keyToLabel);
    if ("keyToLabelFn" in $$props) $$invalidate(27, keyToLabelFn = $$props.keyToLabelFn);
    if ("shouldResetScroll" in $$props) $$invalidate(19, shouldResetScroll = $$props.shouldResetScroll);
    if ("shouldScrollToFocusedKey" in $$props) $$invalidate(28, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
    if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
    if ("valueAccessor" in $$props) $$invalidate(20, valueAccessor = $$props.valueAccessor);
    if ("height" in $$props) $$invalidate(4, height = $$props.height);
    if ("hoveredKey" in $$props) $$invalidate(5, hoveredKey = $$props.hoveredKey);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("previousItems" in $$props) $$invalidate(32, previousItems = $$props.previousItems);
    if ("scrollable" in $$props) $$invalidate(7, scrollable = $$props.scrollable);
    if ("wasNotResettingScroll" in $$props) $$invalidate(33, wasNotResettingScroll = $$props.wasNotResettingScroll);
    if ("style" in $$props) $$invalidate(8, style = $$props.style);
    if ("barPadding" in $$props) $$invalidate(34, barPadding = $$props.barPadding);
    if ("itemHeight" in $$props) $$invalidate(9, itemHeight = $$props.itemHeight);
    if ("barY" in $$props) $$invalidate(10, barY = $$props.barY);
    if ("textY" in $$props) $$invalidate(11, textY = $$props.textY);
    if ("svgHeight" in $$props) $$invalidate(12, svgHeight = $$props.svgHeight);
    if ("getMin" in $$props) $$invalidate(35, getMin = $$props.getMin);
    if ("getMax" in $$props) $$invalidate(36, getMax = $$props.getMax);
    if ("min" in $$props) $$invalidate(37, min = $$props.min);
    if ("max" in $$props) $$invalidate(38, max = $$props.max);
    if ("crossesZero" in $$props) $$invalidate(13, crossesZero = $$props.crossesZero);
    if ("domain" in $$props) $$invalidate(39, domain = $$props.domain);
    if ("getX" in $$props) $$invalidate(40, getX = $$props.getX);
    if ("x0" in $$props) $$invalidate(14, x0 = $$props.x0);
    if ("bars" in $$props) $$invalidate(15, bars = $$props.bars);
    if ("barsByKey" in $$props) $$invalidate(41, barsByKey = $$props.barsByKey);
    if ("focusedY" in $$props) $$invalidate(42, focusedY = $$props.focusedY);
  };

  var style;
  var barPadding;
  var itemHeight;
  var barY;
  var textY;
  var svgHeight;
  var getMin;
  var getMax;
  var min;
  var max;
  var crossesZero;
  var domain;
  var getX;
  var x0;
  var bars;
  var barsByKey;
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
    /*shouldResetScroll*/
    524288) {
       $$invalidate(19, shouldResetScroll = shouldResetScroll || false);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    4) {
       $$invalidate(2, theme = theme ? _objectSpread$2(_objectSpread$2({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    1048576) {
       $$invalidate(20, valueAccessor = valueAccessor || getValue);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    4) {
       $$invalidate(8, style = makeStyleVars(theme));
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    4) {
       $$invalidate(34, barPadding = theme.fontSize / 2);
    }

    if ($$self.$$.dirty[0] &
    /*theme, barHeight*/
    5 | $$self.$$.dirty[1] &
    /*barPadding*/
    8) {
       $$invalidate(9, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, barHeight*/
    513 | $$self.$$.dirty[1] &
    /*barPadding*/
    8) {
       $$invalidate(10, barY = itemHeight - barPadding - barHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, barHeight*/
    513 | $$self.$$.dirty[1] &
    /*barPadding*/
    8) {
       $$invalidate(11, textY = itemHeight - barHeight - 2 * barPadding);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, items*/
    8389120) {
       $$invalidate(12, svgHeight = itemHeight * items.length);
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    1048576) {
       $$invalidate(35, getMin = arrayMinWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    1048576) {
       $$invalidate(36, getMax = arrayMaxWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    8388608 | $$self.$$.dirty[1] &
    /*getMin*/
    16) {
       $$invalidate(37, min = getMin(items));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    8388608 | $$self.$$.dirty[1] &
    /*getMax*/
    32) {
       $$invalidate(38, max = getMax(items));
    }

    if ($$self.$$.dirty[1] &
    /*min, max*/
    192) {
       $$invalidate(13, crossesZero = Math.sign(min) !== Math.sign(max));
    }

    if ($$self.$$.dirty[0] &
    /*crossesZero*/
    8192 | $$self.$$.dirty[1] &
    /*min, max*/
    192) {
       $$invalidate(39, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
    }

    if ($$self.$$.dirty[0] &
    /*width*/
    64 | $$self.$$.dirty[1] &
    /*domain*/
    256) {
       $$invalidate(40, getX = linear(domain, [0, width]));
    }

    if ($$self.$$.dirty[1] &
    /*getX*/
    512) {
       $$invalidate(14, x0 = getX(0));
    }

    if ($$self.$$.dirty[0] &
    /*items, valueAccessor, keyToColor, theme, keyToColorFn, focusedKey, hoveredKey, formatFn, crossesZero, keyToLabel, keyToLabelFn, width, itemHeight*/
    267395684 | $$self.$$.dirty[1] &
    /*barPadding, getX*/
    520) {
       $$invalidate(15, bars = items.map(function (item, idx) {
        var value = valueAccessor(item);
        var isNeg = value < 0;
        return _objectSpread$2(_objectSpread$2({}, item), {
          barColor: keyToColor ? keyToColor[item.key] || theme.barDefaultColor : keyToColorFn ? keyToColorFn(item.key) : theme.barDefaultColor,
          bkgColor: item.key === focusedKey ? theme.focusedKeyColor : item.key === hoveredKey ? theme.hoverColor : transparentColor,
          displayValue: formatFn ? formatFn(value) : value,
          dxKey: crossesZero ? isNeg ? -barPadding : barPadding : 0,
          isNeg: isNeg,
          label: keyToLabel && keyToLabel[item.key] ? keyToLabel[item.key] : keyToLabelFn ? keyToLabelFn(item.key) : item.key,
          x: getX(value),
          xValue: value > 0 ? width : 0,
          y: (idx + 1) * itemHeight // bottom of the item rect

        });
      }));
    }

    if ($$self.$$.dirty[0] &
    /*bars*/
    32768) {
       $$invalidate(41, barsByKey = index(bars, getKey));
    }

    if ($$self.$$.dirty[0] &
    /*items, shouldResetScroll*/
    8912896 | $$self.$$.dirty[1] &
    /*previousItems*/
    2) {
       afterUpdate(function () {
        if (items && shouldResetScroll && !justCompare(previousItems, items)) {
          $$invalidate(7, scrollable.scrollTop = 0, scrollable);
          $$invalidate(32, previousItems = items);
        }
      });
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll, scrollable*/
    524416 | $$self.$$.dirty[1] &
    /*wasNotResettingScroll*/
    4) {
       if (wasNotResettingScroll && shouldResetScroll && scrollable) {
        $$invalidate(7, scrollable.scrollTop = 0, scrollable);
      }
    }

    if ($$self.$$.dirty[0] &
    /*shouldScrollToFocusedKey, focusedKey*/
    270532608 | $$self.$$.dirty[1] &
    /*barsByKey*/
    1024) {
       $$invalidate(42, focusedY = shouldScrollToFocusedKey && focusedKey && barsByKey[focusedKey] && barsByKey[focusedKey].y);
    }

    if ($$self.$$.dirty[0] &
    /*shouldScrollToFocusedKey, focusedKey, scrollable, itemHeight, height*/
    270533264 | $$self.$$.dirty[1] &
    /*focusedY*/
    2048) {
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

  return [barHeight, isInteractive, theme, title, height, hoveredKey, width, scrollable, style, itemHeight, barY, textY, svgHeight, crossesZero, x0, bars, onClick, onMouseenter, onMouseleave, shouldResetScroll, valueAccessor, focusedKey, formatFn, items, keyToColor, keyToColorFn, keyToLabel, keyToLabelFn, shouldScrollToFocusedKey, main_elementresize_handler, main_binding, mouseleave_handler];
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
      focusedKey: 21,
      formatFn: 22,
      isInteractive: 1,
      items: 23,
      keyToColor: 24,
      keyToColorFn: 25,
      keyToLabel: 26,
      keyToLabelFn: 27,
      shouldResetScroll: 19,
      shouldScrollToFocusedKey: 28,
      theme: 2,
      title: 3,
      valueAccessor: 20
    }, [-1, -1]);
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
    ctx[21] === undefined && !("focusedKey" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'focusedKey'");
    }

    if (
    /*formatFn*/
    ctx[22] === undefined && !("formatFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'formatFn'");
    }

    if (
    /*isInteractive*/
    ctx[1] === undefined && !("isInteractive" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'isInteractive'");
    }

    if (
    /*items*/
    ctx[23] === undefined && !("items" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'items'");
    }

    if (
    /*keyToColor*/
    ctx[24] === undefined && !("keyToColor" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[25] === undefined && !("keyToColorFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*keyToLabel*/
    ctx[26] === undefined && !("keyToLabel" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToLabel'");
    }

    if (
    /*keyToLabelFn*/
    ctx[27] === undefined && !("keyToLabelFn" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'keyToLabelFn'");
    }

    if (
    /*shouldResetScroll*/
    ctx[19] === undefined && !("shouldResetScroll" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'shouldResetScroll'");
    }

    if (
    /*shouldScrollToFocusedKey*/
    ctx[28] === undefined && !("shouldScrollToFocusedKey" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'shouldScrollToFocusedKey'");
    }

    if (
    /*theme*/
    ctx[2] === undefined && !("theme" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'theme'");
    }

    if (
    /*title*/
    ctx[3] === undefined && !("title" in props)) {
      console.warn("<BarchartVDiv> was created without expected prop 'title'");
    }

    if (
    /*valueAccessor*/
    ctx[20] === undefined && !("valueAccessor" in props)) {
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

function identity (x) {
  return x;
}

function transform (transform) {
  if (transform == null) return identity;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;

    while (j < n) {
      output[j] = input[j], ++j;
    }

    return output;
  };
}

function reverse (array, n) {
  var t,
      j = array.length,
      i = j - n;

  while (i < --j) {
    t = array[i], array[i++] = array[j], array[j] = t;
  }
}

function geoObject (topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function (o) {
      return feature(topology, o);
    })
  } : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {
    type: "Feature",
    properties: properties,
    geometry: geometry
  } : bbox == null ? {
    type: "Feature",
    id: id,
    properties: properties,
    geometry: geometry
  } : {
    type: "Feature",
    id: id,
    bbox: bbox,
    properties: properties,
    geometry: geometry
  };
}

function object(topology, o) {
  var transformPoint = transform(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();

    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }

    if (i < 0) reverse(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];

    for (var i = 0, n = arcs.length; i < n; ++i) {
      arc(arcs[i], points);
    }

    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.

    return points;
  }

  function ring(arcs) {
    var points = line(arcs);

    while (points.length < 4) {
      points.push(points[0]);
    } // This may happen if an arc has only two points.


    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type,
        coordinates;

    switch (type) {
      case "GeometryCollection":
        return {
          type: type,
          geometries: o.geometries.map(geometry)
        };

      case "Point":
        coordinates = point(o.coordinates);
        break;

      case "MultiPoint":
        coordinates = o.coordinates.map(point);
        break;

      case "LineString":
        coordinates = line(o.arcs);
        break;

      case "MultiLineString":
        coordinates = o.arcs.map(line);
        break;

      case "Polygon":
        coordinates = polygon(o.arcs);
        break;

      case "MultiPolygon":
        coordinates = o.arcs.map(polygon);
        break;

      default:
        return null;
    }

    return {
      type: type,
      coordinates: coordinates
    };
  }

  return geometry(o);
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
function adder () {
  return new Adder();
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function reset() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function add(y) {
    _add(temp, y, this.t);

    _add(this, temp.s, this.s);

    if (this.s) this.t += temp.t;else this.s = temp.t;
  },
  valueOf: function valueOf() {
    return this.s;
  }
};
var temp = new Adder();

function _add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = a - av + (b - bv);
}

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;
var degrees = 180 / pi;
var radians = pi / 180;
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var exp = Math.exp;
var log$1 = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function (x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function noop() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function Feature(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function FeatureCollection(object, stream) {
    var features = object.features,
        i = -1,
        n = features.length;

    while (++i < n) {
      streamGeometry(features[i].geometry, stream);
    }
  }
};
var streamGeometryType = {
  Sphere: function Sphere(object, stream) {
    stream.sphere();
  },
  Point: function Point(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function MultiPoint(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      object = coordinates[i], stream.point(object[0], object[1], object[2]);
    }
  },
  LineString: function LineString(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function MultiLineString(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      streamLine(coordinates[i], stream, 0);
    }
  },
  Polygon: function Polygon(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function MultiPolygon(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      streamPolygon(coordinates[i], stream);
    }
  },
  GeometryCollection: function GeometryCollection(object, stream) {
    var geometries = object.geometries,
        i = -1,
        n = geometries.length;

    while (++i < n) {
      streamGeometry(geometries[i], stream);
    }
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1,
      n = coordinates.length - closed,
      coordinate;
  stream.lineStart();

  while (++i < n) {
    coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  }

  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1,
      n = coordinates.length;
  stream.polygonStart();

  while (++i < n) {
    streamLine(coordinates[i], stream, 1);
  }

  stream.polygonEnd();
}

function geoStream (object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}
function cartesian(spherical) {
  var lambda = spherical[0],
      phi = spherical[1],
      cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}
function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
} // TODO return a

function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}
function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
} // TODO return d

function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function compose (a, b) {
  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function (x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };
  return compose;
}

function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}

function forwardRotationLambda(deltaLambda) {
  return function (lambda, phi) {
    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi),
      sinDeltaPhi = sin(deltaPhi),
      cosDeltaGamma = cos(deltaGamma),
      sinDeltaGamma = sin(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), asin(k * cosDeltaGamma + y * sinDeltaGamma)];
  }

  rotation.invert = function (lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), asin(k * cosDeltaPhi - x * sinDeltaPhi)];
  };

  return rotation;
}

function rotation (rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  }

  forward.invert = function (coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  };

  return forward;
}

function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius),
      sinRadius = sin(radius),
      step = direction * delta;

  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }

  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
} // Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].

function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

function clipBuffer () {
  var lines = [],
      line;
  return {
    point: function point(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function lineStart() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function rejoin() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function result() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual (a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection

  this.e = entry; // is an entry?

  this.v = false; // visited

  this.n = this.p = null; // next & previous
} // A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.


function clipRejoin (segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;
  segments.forEach(function (segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n,
        p0 = segment[0],
        p1 = segment[n],
        x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();

        for (i = 0; i < n; ++i) {
          stream.point((p0 = segment[i])[0], p0[1]);
        }

        stream.lineEnd();
        return;
      } // handle degenerate cases by moving the point


      p1[0] += 2 * epsilon;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });
  if (!subject.length) return;
  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;

    while (current.v) {
      if ((current = current.n) === start) return;
    }

    points = current.z;
    stream.lineStart();

    do {
      current.v = current.o.v = true;

      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) {
            stream.point((point = points[i])[0], point[1]);
          }
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }

        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;

          for (i = points.length - 1; i >= 0; --i) {
            stream.point((point = points[i])[0], point[1]);
          }
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }

        current = current.p;
      }

      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);

    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;

  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }

  a.n = b = array[0];
  b.p = a;
}

var sum = adder();

function longitude(point) {
  if (abs(point[0]) <= pi) return point[0];else return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}

function polygonContains (polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin(phi),
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;
  sum.reset();
  if (sinPhi === 1) phi = halfPi + epsilon;else if (sinPhi === -1) phi = -halfPi - epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;
      sum.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign * tau : delta; // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?

      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);

        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  } // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.


  return (angle < -epsilon || angle < epsilon && sum < -epsilon) ^ winding & 1;
}

function ascending (a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector (compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    },
    right: function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);

function merge (arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) {
    j += arrays[i].length;
  }

  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;

    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}

function clip (pointVisible, clipLine, interpolate, start) {
  return function (sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;
    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function polygonStart() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function polygonEnd() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, start);

        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }

        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function sphere() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i,
          n = ringSegments.length,
          m,
          segment,
          point;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return; // No intersections.

      if (clean & 1) {
        segment = ringSegments[0];

        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();

          for (i = 0; i < m; ++i) {
            sink.point((point = segment[i])[0], point[1]);
          }

          sink.lineEnd();
        }

        return;
      } // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?


      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
} // Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.


function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(function () {
  return true;
}, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]); // Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.

function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      _clean; // no intersections


  return {
    lineStart: function lineStart() {
      stream.lineStart();
      _clean = 1;
    },
    point: function point(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);

      if (abs(delta - pi) < epsilon) {
        // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        _clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) {
        // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies

        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        _clean = 0;
      }

      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function lineEnd() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function clean() {
      return 2 - _clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1) - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;

  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

function clipCircle (radius) {
  var cr = cos(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  } // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.


  function clipLine(stream) {
    var point0, // previous point
    c0, // code for previous point
    v0, // visibility of previous point
    v00, // visibility of first point
    _clean; // no intersections


    return {
      lineStart: function lineStart() {
        v00 = v0 = false;
        _clean = 1;
      },
      point: function point(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();

        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) point1[2] = 1;
        }

        if (v !== v0) {
          _clean = 0;

          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }

          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t; // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.

          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            _clean = 0;

            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }

        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }

        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function lineEnd() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function clean() {
        return _clean | (v00 && v0) << 1;
      }
    };
  } // Intersects the great circle between a and b with the clip circle.


  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b); // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).

    var n1 = [1, 0, 0],
        // normal
    n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0],
        // cartesianDot(n1, n2),
    determinant = n2n2 - n1n2 * n1n2; // Two polar points.

    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B); // Solve |p(t)|^2 = 1.

    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);
    if (t2 < 0) return;
    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);
    if (!two) return q; // Two intersection points.

    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;
    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;
    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;
    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z; // Check that the first point is between a and b.

    if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  } // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.


  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right

    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above

    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}

function clipLine (a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;
  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;

  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;

  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;

  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;

  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

var clipMax = 1e9,
    clipMin = -clipMax; // TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {
  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0,
        a1 = 0;

    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do {
        stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      } while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
  }

  return function (stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__,
        y__,
        v__,
        // first point
    x_,
        y_,
        v_,
        // previous point
    first,
        clean;
    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];

          if (a1 <= y1) {
            if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding;
          } else {
            if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding;
          }
        }
      }

      return winding;
    } // Buffer geometry within a polygon and then clip it en masse.


    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;

      if (cleanInside || visible) {
        stream.polygonStart();

        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }

        if (visible) {
          clipRejoin(segments, compareIntersection, startInside, interpolate, stream);
        }

        stream.polygonEnd();
      }

      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    } // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.


    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }

      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);

      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;

        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];

          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }

            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }

      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

function identity$1 (x) {
  return x;
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

var x0$1 = Infinity,
    y0$1 = x0$1,
    x1 = -x0$1,
    y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function result() {
    var bounds = [[x0$1, y0$1], [x1, y1]];
    x1 = y1 = -(y0$1 = x0$1 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0$1) x0$1 = x;
  if (x > x1) x1 = x;
  if (y < y0$1) y0$1 = y;
  if (y > y1) y1 = y;
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
    x0$2,
    y0$2;
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
  centroidPoint(x0$2 = x, y0$2 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$2,
      dy = y - y0$2,
      z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$2 + x) / 2;
  Y1 += z * (y0$2 + y) / 2;
  Z1 += z;
  centroidPoint(x0$2 = x, y0$2 = y);
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
  centroidPoint(x00$1 = x0$2 = x, y00$1 = y0$2 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$2,
      dy = y - y0$2,
      z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$2 + x) / 2;
  Y1 += z * (y0$2 + y) / 2;
  Z1 += z;
  z = y0$2 * x - x0$2 * y;
  X2 += z * (x0$2 + x);
  Y2 += z * (y0$2 + y);
  Z2 += z * 3;
  centroidPoint(x0$2 = x, y0$2 = y);
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
    x0$3,
    y0$3;
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
  x00$2 = x0$3 = x, y00$2 = y0$3 = y;
}

function lengthPoint(x, y) {
  x0$3 -= x, y0$3 -= y;
  lengthSum.add(sqrt(x0$3 * x0$3 + y0$3 * y0$3));
  x0$3 = x, y0$3 = y;
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

function transformer(methods) {
  return function (stream) {
    var s = new TransformStream();

    for (var key in methods) {
      s[key] = methods[key];
    }

    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function point(x, y) {
    this.stream.point(x, y);
  },
  sphere: function sphere() {
    this.stream.sphere();
  },
  lineStart: function lineStart() {
    this.stream.lineStart();
  },
  lineEnd: function lineEnd() {
    this.stream.lineEnd();
  },
  polygonStart: function polygonStart() {
    this.stream.polygonStart();
  },
  polygonEnd: function polygonEnd() {
    this.stream.polygonEnd();
  }
};

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  geoStream(object, projection.stream(boundsStream));
  fitBounds(boundsStream.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function (b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}
function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}
function fitWidth(projection, width, object) {
  return fit(projection, function (b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}
function fitHeight(projection, height, object) {
  return fit(projection, function (b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16,
    // maximum depth of subdivision
cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

function resample (project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function point(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {
  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;

    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;

      if (dz * dz / d2 > delta2 // perpendicular projected distance
      || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
      || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }

  return function (stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
    lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function polygonStart() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function polygonEnd() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]),
          p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function point(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function point(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx;
    y *= sy;
    return [dx + k * x, dy - k * y];
  }

  transform.invert = function (x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };

  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  var cosAlpha = cos(alpha),
      sinAlpha = sin(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;

  function transform(x, y) {
    x *= sx;
    y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }

  transform.invert = function (x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };

  return transform;
}

function projection(project) {
  return projectionMutator(function () {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project,
      k = 150,
      // scale
  x = 480,
      y = 250,
      // translate
  lambda = 0,
      phi = 0,
      // center
  deltaLambda = 0,
      deltaPhi = 0,
      deltaGamma = 0,
      rotate,
      // pre-rotate
  alpha = 0,
      // post-rotate angle
  sx = 1,
      // reflectX
  sy = 1,
      // reflectX
  theta = null,
      preclip = clipAntimeridian,
      // pre-clip angle
  x0 = null,
      y0,
      x1,
      y1,
      postclip = identity$1,
      // post-clip extent
  delta2 = 0.5,
      // precision
  projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees, point[1] * degrees];
  }

  projection.stream = function (stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function (_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function (_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function (_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function (_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$1) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function (_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function (_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function (_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function (_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.angle = function (_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };

  projection.reflectX = function (_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function (_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function (_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function (extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function (size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function (width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function (height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function () {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = pi / 3,
      m = projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function (_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin(phi) / cosPhi0];
  }

  forward.invert = function (x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin(y0),
      n = (sy0 + sin(y1)) / 2; // Are the parallels symmetrical around the Equator?

  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);
  var c = 1 + sy0 * (2 * n - sy0),
      r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin(y)) / n;
    return [r * sin(x *= n), r0 - r * cos(x)];
  }

  project.invert = function (x, y) {
    var r0y = r0 - y,
        l = atan2(x, abs(r0y)) * sign(r0y);
    if (r0y * n < 0) l -= pi * sign(x) * sign(r0y);
    return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}
function conicEqualArea () {
  return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
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

function mercatorRaw(lambda, phi) {
  return [lambda, log$1(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function (x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

function mercator () {
  return mercatorProjection(mercatorRaw).scale(961 / tau);
}
function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null,
      y0,
      x1,
      y1; // clip extent

  m.scale = function (_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function (_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function (_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function (_) {
    return arguments.length ? (_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]] : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

function tany(y) {
  return tan((halfPi + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : log$1(cy0 / cos(y1)) / log$1(tany(y1) / tany(y0)),
      f = cy0 * pow(tany(y0), n) / n;
  if (!n) return mercatorRaw;

  function project(x, y) {
    if (f > 0) {
      if (y < -halfPi + epsilon) y = -halfPi + epsilon;
    } else {
      if (y > halfPi - epsilon) y = halfPi - epsilon;
    }

    var r = f / pow(tany(y), n);
    return [r * sin(n * x), f - r * cos(n * x)];
  }

  project.invert = function (x, y) {
    var fy = f - y,
        r = sign(n) * sqrt(x * x + fy * fy),
        l = atan2(x, abs(fy)) * sign(fy);
    if (fy * n < 0) l -= pi * sign(x) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };

  return project;
}
function conicConformal () {
  return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular () {
  return projection(equirectangularRaw).scale(152.63);
}

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : (cy0 - cos(y1)) / (y1 - y0),
      g = cy0 / n + y0;
  if (abs(n) < epsilon) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y,
        nx = n * x;
    return [gy * sin(nx), g - gy * cos(nx)];
  }

  project.invert = function (x, y) {
    var gy = g - y,
        l = atan2(x, abs(gy)) * sign(gy);
    if (gy * n < 0) l -= pi * sign(x) * sign(gy);
    return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}
function conicEquidistant () {
  return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = sqrt(3) / 2,
    iterations = 12;
function equalEarthRaw(lambda, phi) {
  var l = asin(M * sin(phi)),
      l2 = l * l,
      l6 = l2 * l2 * l2;
  return [lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))];
}

equalEarthRaw.invert = function (x, y) {
  var l = y,
      l2 = l * l,
      l6 = l2 * l2 * l2;

  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2) break;
  }

  return [M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l), asin(sin(l) / M)];
};

function equalEarth () {
  return projection(equalEarthRaw).scale(177.158);
}

function gnomonicRaw(x, y) {
  var cy = cos(y),
      k = cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic () {
  return projection(gnomonicRaw).scale(144.049).clipAngle(60);
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

function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}
orthographicRaw.invert = azimuthalInvert(asin);
function orthographic () {
  return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon);
}

function stereographicRaw(x, y) {
  var cy = cos(y),
      k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}
stereographicRaw.invert = azimuthalInvert(function (z) {
  return 2 * atan(z);
});
function stereographic () {
  return projection(stereographicRaw).scale(250).clipAngle(142);
}

function transverseMercatorRaw(lambda, phi) {
  return [log$1(tan((halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function (x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi];
};

function transverseMercator () {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function (_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function (_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90]).scale(159.155);
}

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */

function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
      k,
      l,
      geometry,
      stopG,
      coords,
      geometryMaybeCollection,
      wrapShrink = 0,
      coordIndex = 0,
      isGeometryCollection,
      type = geojson.type,
      isFeatureCollection = type === 'FeatureCollection',
      isFeature = type === 'Feature',
      stop = isFeatureCollection ? geojson.features.length : 1; // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.

  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection; // Handles null Geometry -- Skips this geometry

      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;
      wrapShrink = excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon') ? 1 : 0;

      switch (geomType) {
        case null:
          break;

        case 'Point':
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
          coordIndex++;
          multiFeatureIndex++;
          break;

        case 'LineString':
        case 'MultiPoint':
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            coordIndex++;
            if (geomType === 'MultiPoint') multiFeatureIndex++;
          }

          if (geomType === 'LineString') multiFeatureIndex++;
          break;

        case 'Polygon':
        case 'MultiLineString':
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
              coordIndex++;
            }

            if (geomType === 'MultiLineString') multiFeatureIndex++;
            if (geomType === 'Polygon') geometryIndex++;
          }

          if (geomType === 'Polygon') multiFeatureIndex++;
          break;

        case 'MultiPolygon':
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;

            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
              }

              geometryIndex++;
            }

            multiFeatureIndex++;
          }

          break;

        case 'GeometryCollection':
          for (j = 0; j < geometry.geometries.length; j++) {
            if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
          }

          break;

        default:
          throw new Error('Unknown Geometry Type');
      }
    }
  }
}

/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */

function feature$1(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }

  var feat = {
    type: "Feature"
  };

  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }

  if (options.bbox) {
    feat.bbox = options.bbox;
  }

  feat.properties = properties || {};
  feat.geometry = geom;
  return feat;
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */

function point(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }

  var geom = {
    type: "Point",
    coordinates: coordinates
  };
  return feature$1(geom, properties, options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */

function featureCollection(features, options) {
  if (options === void 0) {
    options = {};
  }

  var fc = {
    type: "FeatureCollection"
  };

  if (options.id) {
    fc.id = options.id;
  }

  if (options.bbox) {
    fc.bbox = options.bbox;
  }

  fc.features = features;
  return fc;
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @name centroid
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] an Object that is used as the {@link Feature}'s properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = turf.centroid(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, centroid]
 */

function centroid(geojson, options) {
  if (options === void 0) {
    options = {};
  }

  var xSum = 0;
  var ySum = 0;
  var len = 0;
  coordEach(geojson, function (coord) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  });
  return point([xSum / len, ySum / len], options.properties);
}

/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @name truncate
 * @param {GeoJSON} geojson any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.precision=6] coordinate decimal precision
 * @param {number} [options.coordinates=3] maximum number of coordinates (primarly used to remove z coordinates)
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = turf.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = turf.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 *
 * //addToMap
 * var addToMap = [truncated];
 */

function truncate(geojson, options) {
  if (options === void 0) {
    options = {};
  } // Optional parameters


  var precision = options.precision;
  var coordinates = options.coordinates;
  var mutate = options.mutate; // default params

  precision = precision === undefined || precision === null || isNaN(precision) ? 6 : precision;
  coordinates = coordinates === undefined || coordinates === null || isNaN(coordinates) ? 3 : coordinates; // validation

  if (!geojson) throw new Error('<geojson> is required');
  if (typeof precision !== 'number') throw new Error('<precision> must be a number');
  if (typeof coordinates !== 'number') throw new Error('<coordinates> must be a number'); // prevent input mutation

  if (mutate === false || mutate === undefined) geojson = JSON.parse(JSON.stringify(geojson));
  var factor = Math.pow(10, precision); // Truncate Coordinates

  coordEach(geojson, function (coords) {
    truncateCoords(coords, factor, coordinates);
  });
  return geojson;
}
/**
 * Truncate Coordinates - Mutates coordinates in place
 *
 * @private
 * @param {Array<any>} coords Geometry Coordinates
 * @param {number} factor rounding factor for coordinate decimal precision
 * @param {number} coordinates maximum number of coordinates (primarly used to remove z coordinates)
 * @returns {Array<any>} mutated coordinates
 */


function truncateCoords(coords, factor, coordinates) {
  // Remove extra coordinates (usually elevation coordinates and more)
  if (coords.length > coordinates) coords.splice(coordinates, coords.length); // Truncate coordinate decimals

  for (var i = 0; i < coords.length; i++) {
    coords[i] = Math.round(coords[i] * factor) / factor;
  }

  return coords;
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Return a function expecting a geojson and creating or updating the provided property of all features using the provided map.
 * Note that you can pass a `key or an alternative key `key_alt` e.g. when you use ISO Alpha 2 codes and you need to identify unrecognized territories with another key.
 *
 * @function
 * @arg {object} args - Geojson object
 * @arg {string} args.key_alt - Alternative key to be found in properties in `key` is not found.
 * @arg {string} args.key - Key to be found in properties
 * @arg {object} args.map - Mapping key (string) -> string
 * @arg {function} args.mapFn - Function key (string) -> string
 * @arg {string} args.propName - Name of the property to be added to `properties`
 * @return {function} - Object -> Object
 *
 * @example
> geojson = {
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
			]
		},
		properties: {iso_a2: 'BF'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
			]
		},
		properties: {name: 'Kosovo'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
			]
		},
		properties: {iso_a2: 'FR'}
	}]
}
> keyToColor = {BF: 'red', Kosovo: 'yellow'}
> addColor = makeAddFeaturesProperty({
	propName: 'color',
	map: keyToColor,
	key: 'iso_a2',
	key_alt: 'name'
})
> coloredFeatures = addColor(geojson)
{
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
			]
		},
		properties: {iso_a2: 'BF', color: 'red'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
			]
		},
		properties: {name: 'Kosovo', color: 'yellow'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
			]
		},
		properties: {iso_a2: 'FR', color: undefined}
	}]
}
 * @version 0.5.0
 */

var makeUpdateFeaturesProperty = function makeUpdateFeaturesProperty(_ref) {
  var key_alt = _ref.key_alt,
      key = _ref.key,
      map = _ref.map,
      mapFn = _ref.mapFn,
      propName = _ref.propName;
  return updateKey('features', mapWith(updateKey('properties', function (properties) {
    var propValue;

    if (map) {
      propValue = has(map, properties[key]) ? map[properties[key]] : has(map, properties[key_alt]) ? map[properties[key_alt]] : undefined;
    } else if (mapFn) {
      propValue = properties[key] ? mapFn(properties[key]) : properties[key_alt] ? mapFn(properties[key_alt]) : undefined;
    }

    return _objectSpread$3(_objectSpread$3({}, properties), {}, _defineProperty({}, propName, propValue));
  })));
};
/**
 * Return the a collection of centroids of the provided features, each having the correspondent feature properties.
 *
 * @function
 * @arg {array} features - Array of features
 * @return {object} collection - FeatureCollection of Point features
 *
 * @example
> makeCentroids([
	{
		type: 'Feature',
		properties: {foo: 'a'},
		geometry: {type: 'LineString', coordinates: [
			[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
		]}
	},
	{
		type: 'Feature',
		properties: {foo: 'b'},
		geometry: {type: 'LineString', coordinates: [
			[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
		]}
	}
])
{
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [0.2, -0.2]},
		properties: {foo: 'a'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [1.2, -0.2]},
		properties: {foo: 'b'}
	}]
}
 * @version 0.1.0
 */

var makeCentroids = pipe([mapWith(function (feature) {
  return centroid(feature, {
    properties: feature.properties
  });
}), featureCollection]);

/**
 * Return a function returning a copy of the provided geojson having the geometry coordinates rounded to the given precision.
 *
 * @function
 * @arg {number} precision - coordinate decimal precision
 * @return {function} - Geojson -> Geojson
 *
 * @example
> truncateGeometry = setGeometryPrecision(4)
> point = {
	type: 'Feature',
	geometry: {type: 'Point', coordinates: [0.1234567, 0.12341]},
	properties: {name: 'a'}
}
> truncateGeometry(point)
{
	type: 'Feature',
	geometry: {type: 'Point', coordinates: [0.1234, 0.1234]},
	properties: {name: 'a'}
}
 * @version 0.1.0
 */

var setGeometryPrecision = function setGeometryPrecision(precision) {
  return function (geojson) {
    return truncate(geojson, {
      precision: precision,
      mutate: false
    });
  };
}; // TODO DOC: define FeatureCollection type

var projections = /*#__PURE__*/Object.freeze({
	__proto__: null,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoGnomonic: gnomonic,
	geoOrthographic: orthographic,
	geoStereographic: stereographic,
	geoEqualEarth: equalEarth,
	geoConicConformal: conicConformal,
	geoConicEqualArea: conicEqualArea,
	geoConicEquidistant: conicEquidistant,
	geoEquirectangular: equirectangular,
	geoMercator: mercator,
	geoTransverseMercator: transverseMercator,
	geoNaturalEarth1: naturalEarth1
});

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte";

function get_each_context$4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  return child_ctx;
} // (94:0) {#if height && width}


function create_if_block$5(ctx) {
  var g1;
  var rect;
  var g0;
  var g0_transform_value;
  var if_block =
  /*coloredGeojson*/
  ctx[7] && create_if_block_1$4(ctx);
  var block = {
    c: function create() {
      g1 = svg_element("g");
      rect = svg_element("rect");
      g0 = svg_element("g");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g1 = claim_element(nodes, "g", {
        style: true,
        class: true
      }, 1);
      var g1_nodes = children(g1);
      rect = claim_element(g1_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      g0 = claim_element(g1_nodes, "g", {
        transform: true
      }, 1);
      var g0_nodes = children(g0);
      if (if_block) if_block.l(g0_nodes);
      g0_nodes.forEach(detach_dev);
      g1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[3]);
      attr_dev(rect, "width",
      /*width*/
      ctx[4]);
      attr_dev(rect, "class", "bkg svelte-12ajc17");
      add_location(rect, file$8, 99, 1, 2844);
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*geometry*/
      ctx[0].left + "," +
      /*geometry*/
      ctx[0].top + ")");
      add_location(g0, file$8, 104, 1, 2890);
      attr_dev(g1, "style",
      /*style*/
      ctx[6]);
      attr_dev(g1, "class", "ChoroplethG svelte-12ajc17");
      toggle_class(g1, "interactive",
      /*isInteractive*/
      ctx[1]);
      add_location(g1, file$8, 94, 0, 2772);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g1, anchor);
      append_dev(g1, rect);
      append_dev(g1, g0);
      if (if_block) if_block.m(g0, null);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      8) {
        attr_dev(rect, "height",
        /*height*/
        ctx[3]);
      }

      if (dirty[0] &
      /*width*/
      16) {
        attr_dev(rect, "width",
        /*width*/
        ctx[4]);
      }

      if (
      /*coloredGeojson*/
      ctx[7]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1$4(ctx);
          if_block.c();
          if_block.m(g0, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty[0] &
      /*geometry*/
      1 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*geometry*/
      ctx[0].left + "," +
      /*geometry*/
      ctx[0].top + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (dirty[0] &
      /*style*/
      64) {
        attr_dev(g1, "style",
        /*style*/
        ctx[6]);
      }

      if (dirty[0] &
      /*isInteractive*/
      2) {
        toggle_class(g1, "interactive",
        /*isInteractive*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g1);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(94:0) {#if height && width}",
    ctx: ctx
  });
  return block;
} // (106:2) {#if coloredGeojson}


function create_if_block_1$4(ctx) {
  var each_1_anchor;
  var each_value =
  /*coloredGeojson*/
  ctx[7].features;
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
      /*coloredGeojson, key, key_alt, isDeselected, isSelected, geopath, isClickable, dispatch, getPayload, isInteractive*/
      16294) {
        each_value =
        /*coloredGeojson*/
        ctx[7].features;
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
    id: create_if_block_1$4.name,
    type: "if",
    source: "(106:2) {#if coloredGeojson}",
    ctx: ctx
  });
  return block;
} // (107:2) {#each coloredGeojson.features as feature}


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
      (_ctx = ctx)[21].apply(_ctx, [
      /*feature*/
      ctx[34]].concat(args))
    );
  }

  function mouseenter_handler() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*mouseenter_handler*/
      (_ctx2 = ctx)[22].apply(_ctx2, [
      /*feature*/
      ctx[34]].concat(args))
    );
  }

  function mouseleave_handler() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*mouseleave_handler*/
      (_ctx3 = ctx)[23].apply(_ctx3, [
      /*feature*/
      ctx[34]].concat(args))
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
      ctx[8](
      /*feature*/
      ctx[34]));
      set_style(path, "fill",
      /*feature*/
      ctx[34].properties.color || null);
      attr_dev(path, "class", "svelte-12ajc17");
      toggle_class(path, "clickable",
      /*isClickable*/
      ctx[12](
      /*feature*/
      ctx[34]));
      add_location(path, file$8, 113, 3, 3194);
      attr_dev(g, "class", "feature svelte-12ajc17");
      attr_dev(g, "id", g_id_value =
      /*feature*/
      ctx[34].properties[
      /*key*/
      ctx[5]] ||
      /*feature*/
      ctx[34].properties[
      /*key_alt*/
      ctx[2]]);
      toggle_class(g, "deselected",
      /*isDeselected*/
      ctx[11](
      /*feature*/
      ctx[34]));
      toggle_class(g, "selected",
      /*isSelected*/
      ctx[10](
      /*feature*/
      ctx[34]));
      add_location(g, file$8, 107, 2, 3018);
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
      384 && path_d_value !== (path_d_value =
      /*geopath*/
      ctx[8](
      /*feature*/
      ctx[34]))) {
        attr_dev(path, "d", path_d_value);
      }

      if (dirty[0] &
      /*coloredGeojson*/
      128) {
        set_style(path, "fill",
        /*feature*/
        ctx[34].properties.color || null);
      }

      if (dirty[0] &
      /*isClickable, coloredGeojson*/
      4224) {
        toggle_class(path, "clickable",
        /*isClickable*/
        ctx[12](
        /*feature*/
        ctx[34]));
      }

      if (dirty[0] &
      /*coloredGeojson, key, key_alt*/
      164 && g_id_value !== (g_id_value =
      /*feature*/
      ctx[34].properties[
      /*key*/
      ctx[5]] ||
      /*feature*/
      ctx[34].properties[
      /*key_alt*/
      ctx[2]])) {
        attr_dev(g, "id", g_id_value);
      }

      if (dirty[0] &
      /*isDeselected, coloredGeojson*/
      2176) {
        toggle_class(g, "deselected",
        /*isDeselected*/
        ctx[11](
        /*feature*/
        ctx[34]));
      }

      if (dirty[0] &
      /*isSelected, coloredGeojson*/
      1152) {
        toggle_class(g, "selected",
        /*isSelected*/
        ctx[10](
        /*feature*/
        ctx[34]));
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
    source: "(107:2) {#each coloredGeojson.features as feature}",
    ctx: ctx
  });
  return block;
}

function create_fragment$e(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[3] &&
  /*width*/
  ctx[4] && create_if_block$5(ctx);
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
      ctx[3] &&
      /*width*/
      ctx[4]) {
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
  var truncateGeojson = setGeometryPrecision(4);

  var topoToGeo = function topoToGeo(topojson, id) {
    return truncateGeojson(geoObject(topojson, topojson.objects[id]));
  };

  var defaultGeometry = {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10
  };
  var defaultTheme = {
    backgroundColor: "white",
    defaultFill: "white",
    defaultStroke: "grey",
    defaultStrokeWidth: 0.5,
    hoverFill: "#f6f6f6",
    hoverStroke: "black",
    hoverStrokeWidth: 1.5,
    hoverStrokedasharray: "",
    selectedStroke: "black",
    selectedStrokeWidth: 1,
    deselectedOpacity: 0.25
  };
  var height = $$props.height;
  var topojson = $$props.topojson;
  var topojsonId = $$props.topojsonId;
  var width = $$props.width;
  var geometry = $$props.geometry;
  var isInteractive = $$props.isInteractive;
  var key_alt = $$props.key_alt;
  var key = $$props.key;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var projection = $$props.projection;
  var selectedKeys = $$props.selectedKeys;
  var theme = $$props.theme;
  var writable_props = ["height", "topojson", "topojsonId", "width", "geometry", "isInteractive", "key_alt", "key", "keyToColor", "keyToColorFn", "projection", "selectedKeys", "theme"];
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
    if ("height" in $$props) $$invalidate(3, height = $$props.height);
    if ("topojson" in $$props) $$invalidate(17, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(18, topojsonId = $$props.topojsonId);
    if ("width" in $$props) $$invalidate(4, width = $$props.width);
    if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(5, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(19, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(20, keyToColorFn = $$props.keyToColorFn);
    if ("projection" in $$props) $$invalidate(14, projection = $$props.projection);
    if ("selectedKeys" in $$props) $$invalidate(15, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(16, theme = $$props.theme);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      geoObject: geoObject,
      geoPath: geoPath,
      getPath: getPath,
      makeStyleVars: makeStyleVars,
      makeUpdateFeaturesProperty: makeUpdateFeaturesProperty,
      setGeometryPrecision: setGeometryPrecision,
      isNotNullWith: isNotNullWith,
      projections: projections,
      dispatch: dispatch,
      hasColor: hasColor,
      truncateGeojson: truncateGeojson,
      topoToGeo: topoToGeo,
      defaultGeometry: defaultGeometry,
      defaultTheme: defaultTheme,
      height: height,
      topojson: topojson,
      topojsonId: topojsonId,
      width: width,
      geometry: geometry,
      isInteractive: isInteractive,
      key_alt: key_alt,
      key: key,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      projection: projection,
      selectedKeys: selectedKeys,
      theme: theme,
      geojson: geojson,
      style: style,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      createColoredGeojson: createColoredGeojson,
      coloredGeojson: coloredGeojson,
      fitProjection: fitProjection,
      geopath: geopath,
      getPayload: getPayload,
      isSelected: isSelected,
      isDeselected: isDeselected,
      isClickable: isClickable
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("height" in $$props) $$invalidate(3, height = $$props.height);
    if ("topojson" in $$props) $$invalidate(17, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(18, topojsonId = $$props.topojsonId);
    if ("width" in $$props) $$invalidate(4, width = $$props.width);
    if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(5, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(19, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(20, keyToColorFn = $$props.keyToColorFn);
    if ("projection" in $$props) $$invalidate(14, projection = $$props.projection);
    if ("selectedKeys" in $$props) $$invalidate(15, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(16, theme = $$props.theme);
    if ("geojson" in $$props) $$invalidate(24, geojson = $$props.geojson);
    if ("style" in $$props) $$invalidate(6, style = $$props.style);
    if ("innerHeight" in $$props) $$invalidate(25, innerHeight = $$props.innerHeight);
    if ("innerWidth" in $$props) $$invalidate(26, innerWidth = $$props.innerWidth);
    if ("createColoredGeojson" in $$props) $$invalidate(27, createColoredGeojson = $$props.createColoredGeojson);
    if ("coloredGeojson" in $$props) $$invalidate(7, coloredGeojson = $$props.coloredGeojson);
    if ("fitProjection" in $$props) $$invalidate(28, fitProjection = $$props.fitProjection);
    if ("geopath" in $$props) $$invalidate(8, geopath = $$props.geopath);
    if ("getPayload" in $$props) $$invalidate(9, getPayload = $$props.getPayload);
    if ("isSelected" in $$props) $$invalidate(10, isSelected = $$props.isSelected);
    if ("isDeselected" in $$props) $$invalidate(11, isDeselected = $$props.isDeselected);
    if ("isClickable" in $$props) $$invalidate(12, isClickable = $$props.isClickable);
  };

  var geojson;
  var style;
  var innerHeight;
  var innerWidth;
  var createColoredGeojson;
  var coloredGeojson;
  var fitProjection;
  var geopath;
  var getPayload;
  var isSelected;
  var isDeselected;
  var isClickable;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*topojson, topojsonId*/
    393216) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(24, geojson = topoToGeo(topojson, topojsonId));
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    1) {
       $$invalidate(0, geometry = geometry ? _objectSpread$4(_objectSpread$4({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    2) {
       $$invalidate(1, isInteractive = isInteractive || false);
    }

    if ($$self.$$.dirty[0] &
    /*key_alt*/
    4) {
       $$invalidate(2, key_alt = key_alt || "name");
    }

    if ($$self.$$.dirty[0] &
    /*projection*/
    16384) {
       $$invalidate(14, projection = projection && projections[projection] || equirectangular);
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys*/
    32768) {
       $$invalidate(15, selectedKeys = selectedKeys || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    65536) {
       $$invalidate(16, theme = theme ? _objectSpread$4(_objectSpread$4({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    65536) {
       $$invalidate(6, style = makeStyleVars(theme));
    }

    if ($$self.$$.dirty[0] &
    /*height, geometry*/
    9) {
       $$invalidate(25, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
    }

    if ($$self.$$.dirty[0] &
    /*width, geometry*/
    17) {
       $$invalidate(26, innerWidth = Math.max(0, width - geometry.left - geometry.right));
    }

    if ($$self.$$.dirty[0] &
    /*key_alt, key, keyToColor, keyToColorFn*/
    1572900) {
       $$invalidate(27, createColoredGeojson = makeUpdateFeaturesProperty({
        key_alt: key_alt,
        key: key,
        map: keyToColor,
        mapFn: keyToColorFn,
        propName: "color"
      }));
    }

    if ($$self.$$.dirty[0] &
    /*geojson, createColoredGeojson*/
    150994944) {
       $$invalidate(7, coloredGeojson = geojson && createColoredGeojson(geojson));
    }

    if ($$self.$$.dirty[0] &
    /*geojson, projection, innerWidth, innerHeight*/
    117456896) {
       $$invalidate(28, fitProjection = geojson && projection().fitSize([innerWidth, innerHeight], geojson));
    }

    if ($$self.$$.dirty[0] &
    /*fitProjection*/
    268435456) {
       $$invalidate(8, geopath = fitProjection && geoPath(fitProjection));
    }

    if ($$self.$$.dirty[0] &
    /*key, key_alt*/
    36) {
       $$invalidate(9, getPayload = function getPayload(feature) {
        return feature.properties[key] || feature.properties[key_alt];
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    33280) {
       $$invalidate(10, isSelected = function isSelected(feature) {
        return selectedKeys.length && selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    33280) {
       $$invalidate(11, isDeselected = function isDeselected(feature) {
        return selectedKeys.length && !selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    2) {
       $$invalidate(12, isClickable = function isClickable(feature) {
        return isInteractive && hasColor(feature);
      });
    }
  };

  return [geometry, isInteractive, key_alt, height, width, key, style, coloredGeojson, geopath, getPayload, isSelected, isDeselected, isClickable, dispatch, projection, selectedKeys, theme, topojson, topojsonId, keyToColor, keyToColorFn, click_handler, mouseenter_handler, mouseleave_handler];
}

var ChoroplethG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethG, _SvelteComponentDev);

  var _super = _createSuper$e(ChoroplethG);

  function ChoroplethG(options) {
    var _this;

    _classCallCheck(this, ChoroplethG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      height: 3,
      topojson: 17,
      topojsonId: 18,
      width: 4,
      geometry: 0,
      isInteractive: 1,
      key_alt: 2,
      key: 5,
      keyToColor: 19,
      keyToColorFn: 20,
      projection: 14,
      selectedKeys: 15,
      theme: 16
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
    ctx[3] === undefined && !("height" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'height'");
    }

    if (
    /*topojson*/
    ctx[17] === undefined && !("topojson" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'topojson'");
    }

    if (
    /*topojsonId*/
    ctx[18] === undefined && !("topojsonId" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'topojsonId'");
    }

    if (
    /*width*/
    ctx[4] === undefined && !("width" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'width'");
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
    ctx[5] === undefined && !("key" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'key'");
    }

    if (
    /*keyToColor*/
    ctx[19] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[20] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*projection*/
    ctx[14] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'projection'");
    }

    if (
    /*selectedKeys*/
    ctx[15] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethG> was created without expected prop 'selectedKeys'");
    }

    if (
    /*theme*/
    ctx[16] === undefined && !("theme" in props)) {
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
    key: "projection",
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
var file$9 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte"; // (39:1) {#if title}

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
      add_location(h2, file$9, 40, 2, 759);
      attr_dev(header, "class", "svelte-77ac80");
      add_location(header, file$9, 39, 1, 748);
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
    source: "(39:1) {#if title}",
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
      height:
      /*height*/
      ctx[12],
      geometry:
      /*geometry*/
      ctx[3],
      isInteractive:
      /*isInteractive*/
      ctx[4],
      key:
      /*key*/
      ctx[6],
      key_alt:
      /*key_alt*/
      ctx[5],
      keyToColor:
      /*keyToColor*/
      ctx[7],
      keyToColorFn:
      /*keyToColorFn*/
      ctx[8],
      projection:
      /*projection*/
      ctx[9],
      selectedKeys:
      /*selectedKeys*/
      ctx[10],
      theme:
      /*theme*/
      ctx[11],
      topojson:
      /*topojson*/
      ctx[1],
      topojsonId:
      /*topojsonId*/
      ctx[2],
      width:
      /*width*/
      ctx[13]
    },
    $$inline: true
  });
  choroplethg.$on("clicked",
  /*clicked_handler*/
  ctx[17]);
  choroplethg.$on("entered",
  /*entered_handler*/
  ctx[18]);
  choroplethg.$on("exited",
  /*exited_handler*/
  ctx[19]);
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
      ctx[13]);
      attr_dev(svg, "height",
      /*height*/
      ctx[12]);
      attr_dev(svg, "class", "svelte-77ac80");
      add_location(svg, file$9, 48, 2, 901);
      attr_dev(main, "class", "svelte-77ac80");
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
      add_location(main, file$9, 43, 1, 795);
      attr_dev(div, "class", "ChoroplethDiv svelte-77ac80");
      attr_dev(div, "style",
      /*style*/
      ctx[14]);
      toggle_class(div, "interactive",
      /*isInteractive*/
      ctx[4]);
      add_location(div, file$9, 33, 0, 660);
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
      ctx[20].bind(main));
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
      /*height*/
      4096) choroplethg_changes.height =
      /*height*/
      ctx[12];
      if (dirty &
      /*geometry*/
      8) choroplethg_changes.geometry =
      /*geometry*/
      ctx[3];
      if (dirty &
      /*isInteractive*/
      16) choroplethg_changes.isInteractive =
      /*isInteractive*/
      ctx[4];
      if (dirty &
      /*key*/
      64) choroplethg_changes.key =
      /*key*/
      ctx[6];
      if (dirty &
      /*key_alt*/
      32) choroplethg_changes.key_alt =
      /*key_alt*/
      ctx[5];
      if (dirty &
      /*keyToColor*/
      128) choroplethg_changes.keyToColor =
      /*keyToColor*/
      ctx[7];
      if (dirty &
      /*keyToColorFn*/
      256) choroplethg_changes.keyToColorFn =
      /*keyToColorFn*/
      ctx[8];
      if (dirty &
      /*projection*/
      512) choroplethg_changes.projection =
      /*projection*/
      ctx[9];
      if (dirty &
      /*selectedKeys*/
      1024) choroplethg_changes.selectedKeys =
      /*selectedKeys*/
      ctx[10];
      if (dirty &
      /*theme*/
      2048) choroplethg_changes.theme =
      /*theme*/
      ctx[11];
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
      8192) choroplethg_changes.width =
      /*width*/
      ctx[13];
      choroplethg.$set(choroplethg_changes);

      if (!current || dirty &
      /*width*/
      8192) {
        attr_dev(svg, "width",
        /*width*/
        ctx[13]);
      }

      if (!current || dirty &
      /*height*/
      4096) {
        attr_dev(svg, "height",
        /*height*/
        ctx[12]);
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
      16384) {
        attr_dev(div, "style",
        /*style*/
        ctx[14]);
      }

      if (dirty &
      /*isInteractive*/
      16) {
        toggle_class(div, "interactive",
        /*isInteractive*/
        ctx[4]);
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
  var geometry = $$props.geometry;
  var isInteractive = $$props.isInteractive;
  var key_alt = $$props.key_alt;
  var key = $$props.key;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var projection = $$props.projection;
  var selectedKeys = $$props.selectedKeys;
  var theme = $$props.theme;
  var height = 0;
  var width = 0;
  var writable_props = ["headerHeight", "padding", "title", "topojson", "topojsonId", "geometry", "isInteractive", "key_alt", "key", "keyToColor", "keyToColorFn", "projection", "selectedKeys", "theme"];
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
    $$invalidate(13, width);
    $$invalidate(12, height);
  }

  $$self.$set = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(15, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(16, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("topojson" in $$props) $$invalidate(1, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
    if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(4, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(5, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(6, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(7, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(8, keyToColorFn = $$props.keyToColorFn);
    if ("projection" in $$props) $$invalidate(9, projection = $$props.projection);
    if ("selectedKeys" in $$props) $$invalidate(10, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(11, theme = $$props.theme);
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
      geometry: geometry,
      isInteractive: isInteractive,
      key_alt: key_alt,
      key: key,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      projection: projection,
      selectedKeys: selectedKeys,
      theme: theme,
      height: height,
      width: width,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(15, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(16, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("topojson" in $$props) $$invalidate(1, topojson = $$props.topojson);
    if ("topojsonId" in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
    if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ("isInteractive" in $$props) $$invalidate(4, isInteractive = $$props.isInteractive);
    if ("key_alt" in $$props) $$invalidate(5, key_alt = $$props.key_alt);
    if ("key" in $$props) $$invalidate(6, key = $$props.key);
    if ("keyToColor" in $$props) $$invalidate(7, keyToColor = $$props.keyToColor);
    if ("keyToColorFn" in $$props) $$invalidate(8, keyToColorFn = $$props.keyToColorFn);
    if ("projection" in $$props) $$invalidate(9, projection = $$props.projection);
    if ("selectedKeys" in $$props) $$invalidate(10, selectedKeys = $$props.selectedKeys);
    if ("theme" in $$props) $$invalidate(11, theme = $$props.theme);
    if ("height" in $$props) $$invalidate(12, height = $$props.height);
    if ("width" in $$props) $$invalidate(13, width = $$props.width);
    if ("style" in $$props) $$invalidate(14, style = $$props.style);
  };

  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*padding*/
    65536) {
       $$invalidate(16, padding = padding || "10px");
    }

    if ($$self.$$.dirty &
    /*headerHeight*/
    32768) {
       $$invalidate(15, headerHeight = headerHeight || "2rem");
    }

    if ($$self.$$.dirty &
    /*headerHeight, padding*/
    98304) {
       $$invalidate(14, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };

  return [title, topojson, topojsonId, geometry, isInteractive, key_alt, key, keyToColor, keyToColorFn, projection, selectedKeys, theme, height, width, style, headerHeight, padding, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}

var ChoroplethDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethDiv, _SvelteComponentDev);

  var _super = _createSuper$f(ChoroplethDiv);

  function ChoroplethDiv(options) {
    var _this;

    _classCallCheck(this, ChoroplethDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
      headerHeight: 15,
      padding: 16,
      title: 0,
      topojson: 1,
      topojsonId: 2,
      geometry: 3,
      isInteractive: 4,
      key_alt: 5,
      key: 6,
      keyToColor: 7,
      keyToColorFn: 8,
      projection: 9,
      selectedKeys: 10,
      theme: 11
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
    ctx[15] === undefined && !("headerHeight" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'headerHeight'");
    }

    if (
    /*padding*/
    ctx[16] === undefined && !("padding" in props)) {
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
    /*geometry*/
    ctx[3] === undefined && !("geometry" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'geometry'");
    }

    if (
    /*isInteractive*/
    ctx[4] === undefined && !("isInteractive" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
    }

    if (
    /*key_alt*/
    ctx[5] === undefined && !("key_alt" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'key_alt'");
    }

    if (
    /*key*/
    ctx[6] === undefined && !("key" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'key'");
    }

    if (
    /*keyToColor*/
    ctx[7] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[8] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*projection*/
    ctx[9] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'projection'");
    }

    if (
    /*selectedKeys*/
    ctx[10] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
    }

    if (
    /*theme*/
    ctx[11] === undefined && !("theme" in props)) {
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
    key: "projection",
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
      accessor = _ref$accessor === void 0 ? identity$2 : _ref$accessor,
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

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$a = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsG.svelte";

function get_each_context$5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[48] = list[i].label;
  child_ctx[49] = list[i].x;
  child_ctx[50] = list[i].y;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
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
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var if_block2 =
  /*flags*/
  ctx[0].showTicks && create_if_block_3$1(ctx);
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
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

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
          if_block2 = create_if_block_3$1(ctx);
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


function create_if_block_4(ctx) {
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
    id: create_if_block_4.name,
    type: "if",
    source: "(347:4) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }


function create_each_block_1(ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var rect_height_value;
  var rect_width_value;
  var g_transform_value;
  var if_block =
  /*flags*/
  ctx[0].isInteractive && create_if_block_4(ctx);
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
          if_block = create_if_block_4(ctx);
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
    id: create_each_block_1.name,
    type: "each",
    source: "(329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }",
    ctx: ctx
  });
  return block;
} // (364:2) {#if flags.showTicks}


function create_if_block_3$1(ctx) {
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
    id: create_if_block_3$1.name,
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
    ctx[0].isVertical) return create_if_block_2$2;
    return create_else_block$1;
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


function create_else_block$1(ctx) {
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
    id: create_else_block$1.name,
    type: "else",
    source: "(386:3) {:else}",
    ctx: ctx
  });
  return block;
} // (381:3) {#if flags.isVertical}


function create_if_block_2$2(ctx) {
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
    id: create_if_block_2$2.name,
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
       $$invalidate(0, flags = flags ? _objectSpread$5(_objectSpread$5({}, defaultFlags), flags) : defaultFlags);
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2) {
       $$invalidate(1, geometry = geometry ? _objectSpread$5(_objectSpread$5({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*selectedBins*/
    4) {
       $$invalidate(2, selectedBins = selectedBins || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    8) {
       $$invalidate(3, theme = theme ? _objectSpread$5(_objectSpread$5({}, defaultTheme), theme) : defaultTheme);
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
        return _objectSpread$5(_objectSpread$5({}, bin), {
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
       $$invalidate(14, style = makeStyleVars(_objectSpread$5(_objectSpread$5({}, theme), {}, {
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

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$c = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte";

function get_each_context$6(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[51] = list[i].tick;
  child_ctx[52] = list[i].y;
  return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[55] = list[i].barLength;
  child_ctx[56] = list[i].barThickness;
  child_ctx[57] = list[i].displayValue;
  child_ctx[58] = list[i].fill;
  child_ctx[59] = list[i].labelAnchor;
  child_ctx[60] = list[i].labelX;
  child_ctx[61] = list[i].selected;
  child_ctx[62] = list[i].x;
  child_ctx[63] = list[i].y1;
  child_ctx[65] = i;
  return child_ctx;
} // (320:0) {#if height && width && scales}


function create_if_block$9(ctx) {
  var g2;
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
  ctx[0].withBackground && create_if_block_7(ctx);
  var if_block1 =
  /*flags*/
  ctx[0].isInteractive && create_if_block_6$1(ctx);
  var each_value_1 =
  /*bars*/
  ctx[14];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var if_block2 = !
  /*flags*/
  ctx[0].hideOrigin && create_if_block_3$2(ctx);
  var if_block3 = !
  /*flags*/
  ctx[0].hideTicks && create_if_block_2$3(ctx);
  var if_block4 =
  /*isBrushing*/
  ctx[16] && create_if_block_1$7(ctx);
  var block = {
    c: function create() {
      g2 = svg_element("g");
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
      g2 = claim_element(nodes, "g", {
        class: true,
        style: true
      }, 1);
      var g2_nodes = children(g2);
      if (if_block0) if_block0.l(g2_nodes);
      if_block0_anchor = empty();
      if (if_block1) if_block1.l(g2_nodes);
      g1 = claim_element(g2_nodes, "g", {
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
      g2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y2", line_y__value =
      /*flags*/
      ctx[0].isTopDown ?
      /*innerHeight*/
      ctx[8] : -
      /*innerHeight*/
      ctx[8]);
      attr_dev(line, "class", "svelte-xezn7c");
      add_location(line, file$c, 392, 3, 9136);
      attr_dev(g0, "class", "axis svelte-xezn7c");
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*origin*/
      ctx[9].x + "," +
      /*origin*/
      ctx[9].y + ")");
      add_location(g0, file$c, 388, 2, 9064);
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*safety*/
      ctx[6].left + "," +
      /*safety*/
      ctx[6].top + ")");
      add_location(g1, file$c, 341, 1, 8170);
      attr_dev(g2, "class", "HistogramG svelte-xezn7c");
      attr_dev(g2, "style",
      /*style*/
      ctx[18]);
      toggle_class(g2, "interactive",
      /*flags*/
      ctx[0].isInteractive);
      add_location(g2, file$c, 320, 0, 7801);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g2, anchor);
      if (if_block0) if_block0.m(g2, null);
      append_dev(g2, if_block0_anchor);
      if (if_block1) if_block1.m(g2, null);
      append_dev(g2, g1);

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
      ctx[0].withBackground) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_7(ctx);
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
          if_block1 = create_if_block_6$1(ctx);
          if_block1.c();
          if_block1.m(g2, g1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*bars, innerWidth, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags, fontSize*/
      32555169) {
        each_value_1 =
        /*bars*/
        ctx[14];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

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
      257 && line_y__value !== (line_y__value =
      /*flags*/
      ctx[0].isTopDown ?
      /*innerHeight*/
      ctx[8] : -
      /*innerHeight*/
      ctx[8])) {
        attr_dev(line, "y2", line_y__value);
      }

      if (!
      /*flags*/
      ctx[0].hideOrigin) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_3$2(ctx);
          if_block2.c();
          if_block2.m(g0, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (!
      /*flags*/
      ctx[0].hideTicks) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_2$3(ctx);
          if_block3.c();
          if_block3.m(g0, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (dirty[0] &
      /*origin*/
      512 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*origin*/
      ctx[9].x + "," +
      /*origin*/
      ctx[9].y + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (
      /*isBrushing*/
      ctx[16]) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
        } else {
          if_block4 = create_if_block_1$7(ctx);
          if_block4.c();
          if_block4.m(g1, null);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }

      if (dirty[0] &
      /*safety*/
      64 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*safety*/
      ctx[6].left + "," +
      /*safety*/
      ctx[6].top + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }

      if (dirty[0] &
      /*style*/
      262144) {
        attr_dev(g2, "style",
        /*style*/
        ctx[18]);
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
      if (if_block4) if_block4.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$9.name,
    type: "if",
    source: "(320:0) {#if height && width && scales}",
    ctx: ctx
  });
  return block;
} // (327:1) {#if flags.withBackground}


function create_if_block_7(ctx) {
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
      attr_dev(rect, "class", "bkg svelte-xezn7c");
      attr_dev(rect, "width",
      /*width*/
      ctx[4]);
      attr_dev(rect, "height",
      /*height*/
      ctx[3]);
      add_location(rect, file$c, 327, 1, 7926);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*width*/
      16) {
        attr_dev(rect, "width",
        /*width*/
        ctx[4]);
      }

      if (dirty[0] &
      /*height*/
      8) {
        attr_dev(rect, "height",
        /*height*/
        ctx[3]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7.name,
    type: "if",
    source: "(327:1) {#if flags.withBackground}",
    ctx: ctx
  });
  return block;
} // (332:1) {#if flags.isInteractive}


function create_if_block_6$1(ctx) {
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
      ctx[3]);
      attr_dev(rect, "width",
      /*width*/
      ctx[4]);
      attr_dev(rect, "class", "bkgSensor svelte-xezn7c");
      toggle_class(rect, "reset",
      /*selectedBins*/
      ctx[2].length > 0);
      add_location(rect, file$c, 332, 1, 8042);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = listen_dev(rect, "click",
        /*resetSelection*/
        ctx[25], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      8) {
        attr_dev(rect, "height",
        /*height*/
        ctx[3]);
      }

      if (dirty[0] &
      /*width*/
      16) {
        attr_dev(rect, "width",
        /*width*/
        ctx[4]);
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
    id: create_if_block_6$1.name,
    type: "if",
    source: "(332:1) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (358:3) {#if displayValue}


function create_if_block_5$1(ctx) {
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
      ctx[58]);
      attr_dev(rect, "x", rect_x_value =
      /*x*/
      ctx[62]);
      attr_dev(rect, "class", "bar svelte-xezn7c");
      attr_dev(rect, "height", rect_height_value =
      /*barThickness*/
      ctx[56]);
      attr_dev(rect, "width", rect_width_value =
      /*barLength*/
      ctx[55]);
      toggle_class(rect, "selected",
      /*selected*/
      ctx[61]);
      add_location(rect, file$c, 358, 3, 8447);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*bars*/
      16384 && rect_fill_value !== (rect_fill_value =
      /*fill*/
      ctx[58])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && rect_x_value !== (rect_x_value =
      /*x*/
      ctx[62])) {
        attr_dev(rect, "x", rect_x_value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && rect_height_value !== (rect_height_value =
      /*barThickness*/
      ctx[56])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && rect_width_value !== (rect_width_value =
      /*barLength*/
      ctx[55])) {
        attr_dev(rect, "width", rect_width_value);
      }

      if (dirty[0] &
      /*bars*/
      16384) {
        toggle_class(rect, "selected",
        /*selected*/
        ctx[61]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5$1.name,
    type: "if",
    source: "(358:3) {#if displayValue}",
    ctx: ctx
  });
  return block;
} // (375:3) {#if flags.isInteractive}


function create_if_block_4$1(ctx) {
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
      attr_dev(rect, "class", "sensor svelte-xezn7c");
      attr_dev(rect, "height", rect_height_value =
      /*barThickness*/
      ctx[56]);
      attr_dev(rect, "width",
      /*innerWidth*/
      ctx[7]);
      add_location(rect, file$c, 375, 3, 8752);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      if (!mounted) {
        dispose = [listen_dev(rect, "mousedown",
        /*onMousedown*/
        ctx[21], false, false, false), listen_dev(rect, "mouseenter",
        /*onMouseenter*/
        ctx[20](
        /*index*/
        ctx[65]), false, false, false), listen_dev(rect, "mouseleave",
        /*onMouseleave*/
        ctx[24](
        /*index*/
        ctx[65]), false, false, false), listen_dev(rect, "mousemove", function () {
          if (is_function(
          /*isMousedown*/
          ctx[5] ?
          /*onMousemove*/
          ctx[22](
          /*index*/
          ctx[65]) : null)) (
          /*isMousedown*/
          ctx[5] ?
          /*onMousemove*/
          ctx[22](
          /*index*/
          ctx[65]) : null).apply(this, arguments);
        }, false, false, false), listen_dev(rect, "mouseup",
        /*onMouseup*/
        ctx[23](
        /*index*/
        ctx[65]), false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*bars*/
      16384 && rect_height_value !== (rect_height_value =
      /*barThickness*/
      ctx[56])) {
        attr_dev(rect, "height", rect_height_value);
      }

      if (dirty[0] &
      /*innerWidth*/
      128) {
        attr_dev(rect, "width",
        /*innerWidth*/
        ctx[7]);
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
    source: "(375:3) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
} // (343:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }


function create_each_block_1$1(ctx) {
  var g;
  var text_1;
  var t_value =
  /*displayValue*/
  ctx[57] + "";
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var text_1_text_anchor_value;
  var g_transform_value;
  var if_block0 =
  /*displayValue*/
  ctx[57] && create_if_block_5$1(ctx);
  var if_block1 =
  /*flags*/
  ctx[0].isInteractive && create_if_block_4$1(ctx);
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
      attr_dev(text_1, "class", "binsize svelte-xezn7c");
      attr_dev(text_1, "x", text_1_x_value =
      /*labelX*/
      ctx[60]);
      attr_dev(text_1, "y", text_1_y_value =
      /*barThickness*/
      ctx[56] / 2);
      attr_dev(text_1, "font-size",
      /*fontSize*/
      ctx[15]);
      attr_dev(text_1, "text-anchor", text_1_text_anchor_value =
      /*labelAnchor*/
      ctx[59]);
      add_location(text_1, file$c, 367, 3, 8573);
      attr_dev(g, "class", "bin svelte-xezn7c");
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*y1*/
      ctx[63] + ")");
      add_location(g, file$c, 353, 2, 8367);
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
      ctx[57]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_5$1(ctx);
          if_block0.c();
          if_block0.m(g, text_1);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty[0] &
      /*bars*/
      16384 && t_value !== (t_value =
      /*displayValue*/
      ctx[57] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*bars*/
      16384 && text_1_x_value !== (text_1_x_value =
      /*labelX*/
      ctx[60])) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && text_1_y_value !== (text_1_y_value =
      /*barThickness*/
      ctx[56] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty[0] &
      /*fontSize*/
      32768) {
        attr_dev(text_1, "font-size",
        /*fontSize*/
        ctx[15]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && text_1_text_anchor_value !== (text_1_text_anchor_value =
      /*labelAnchor*/
      ctx[59])) {
        attr_dev(text_1, "text-anchor", text_1_text_anchor_value);
      }

      if (
      /*flags*/
      ctx[0].isInteractive) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_4$1(ctx);
          if_block1.c();
          if_block1.m(g, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty[0] &
      /*bars*/
      16384 && g_transform_value !== (g_transform_value = "translate(0," +
      /*y1*/
      ctx[63] + ")")) {
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
    id: create_each_block_1$1.name,
    type: "each",
    source: "(343:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }",
    ctx: ctx
  });
  return block;
} // (396:3) {#if !flags.hideOrigin}


function create_if_block_3$2(ctx) {
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
      ctx[1].originRadius);
      attr_dev(circle, "class", "svelte-xezn7c");
      add_location(circle, file$c, 396, 3, 9232);
    },
    m: function mount(target, anchor) {
      insert_dev(target, circle, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*geometry*/
      2 && circle_r_value !== (circle_r_value =
      /*geometry*/
      ctx[1].originRadius)) {
        attr_dev(circle, "r", circle_r_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$2.name,
    type: "if",
    source: "(396:3) {#if !flags.hideOrigin}",
    ctx: ctx
  });
  return block;
} // (399:3) {#if !flags.hideTicks}


function create_if_block_2$3(ctx) {
  var each_1_anchor;
  var each_value =
  /*ticks*/
  ctx[12];
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
      39936) {
        each_value =
        /*ticks*/
        ctx[12];
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
    id: create_if_block_2$3.name,
    type: "if",
    source: "(399:3) {#if !flags.hideTicks}",
    ctx: ctx
  });
  return block;
} // (400:3) {#each ticks as {tick, y}}


function create_each_block$6(ctx) {
  var text_1;
  var t_value =
  /*tick*/
  ctx[51] + "";
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
      attr_dev(text_1, "class", "range svelte-xezn7c");
      attr_dev(text_1, "x",
      /*ticksX*/
      ctx[10]);
      attr_dev(text_1, "y", text_1_y_value =
      /*y*/
      ctx[52]);
      attr_dev(text_1, "font-size",
      /*fontSize*/
      ctx[15]);
      attr_dev(text_1, "text-anchor",
      /*ticksAnchor*/
      ctx[11]);
      add_location(text_1, file$c, 400, 3, 9336);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      4096 && t_value !== (t_value =
      /*tick*/
      ctx[51] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*ticksX*/
      1024) {
        attr_dev(text_1, "x",
        /*ticksX*/
        ctx[10]);
      }

      if (dirty[0] &
      /*ticks*/
      4096 && text_1_y_value !== (text_1_y_value =
      /*y*/
      ctx[52])) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty[0] &
      /*fontSize*/
      32768) {
        attr_dev(text_1, "font-size",
        /*fontSize*/
        ctx[15]);
      }

      if (dirty[0] &
      /*ticksAnchor*/
      2048) {
        attr_dev(text_1, "text-anchor",
        /*ticksAnchor*/
        ctx[11]);
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
    source: "(400:3) {#each ticks as {tick, y}}",
    ctx: ctx
  });
  return block;
} // (411:2) {#if isBrushing}


function create_if_block_1$7(ctx) {
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
      ctx[17].y1);
      attr_dev(line, "y2", line_y__value_1 =
      /*brushLine*/
      ctx[17].y2);
      attr_dev(line, "class", "svelte-xezn7c");
      add_location(line, file$c, 415, 3, 9568);
      attr_dev(g, "class", "brush svelte-xezn7c");
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*origin*/
      ctx[9].x + ",0)");
      add_location(g, file$c, 411, 2, 9504);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, line);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*brushLine*/
      131072 && line_y__value !== (line_y__value =
      /*brushLine*/
      ctx[17].y1)) {
        attr_dev(line, "y1", line_y__value);
      }

      if (dirty[0] &
      /*brushLine*/
      131072 && line_y__value_1 !== (line_y__value_1 =
      /*brushLine*/
      ctx[17].y2)) {
        attr_dev(line, "y2", line_y__value_1);
      }

      if (dirty[0] &
      /*origin*/
      512 && g_transform_value !== (g_transform_value = "translate(" +
      /*origin*/
      ctx[9].x + ",0)")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$7.name,
    type: "if",
    source: "(411:2) {#if isBrushing}",
    ctx: ctx
  });
  return block;
}

function create_fragment$i(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[3] &&
  /*width*/
  ctx[4] &&
  /*scales*/
  ctx[13] && create_if_block$9(ctx);
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
      ctx[3] &&
      /*width*/
      ctx[4] &&
      /*scales*/
      ctx[13]) {
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
    selectedBinFill: "rgb(255, 174, 0)",
    selectedBinStroke: "black",
    selectedBinStrokeWidth: 2,
    textColor: "black"
  };
  var bins = $$props.bins;
  var binsFill = $$props.binsFill;
  var flags = $$props.flags;
  var geometry = $$props.geometry;
  var height = $$props.height; // required

  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  var width = $$props.width; // required

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
    return $$invalidate(36, $brush = value);
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
    $$invalidate(5, isMousedown = true);
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
      $$invalidate(5, isMousedown = false);

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

  var resetSelection = function resetSelection() {
    $$invalidate(2, selectedBins = []);
    dispatch("clicked", {
      selectedBins: selectedBins
    });
  };

  var writable_props = ["bins", "binsFill", "flags", "geometry", "height", "selectedBins", "theme", "ticksFormatFn", "width"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<HistogramG> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("HistogramG", $$slots, []);

  $$self.$set = function ($$props) {
    if ("bins" in $$props) $$invalidate(26, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(29, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
    if ("height" in $$props) $$invalidate(3, height = $$props.height);
    if ("selectedBins" in $$props) $$invalidate(2, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(27, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
    if ("width" in $$props) $$invalidate(4, width = $$props.width);
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
      bins: bins,
      binsFill: binsFill,
      flags: flags,
      geometry: geometry,
      height: height,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      width: width,
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
    if ("bins" in $$props) $$invalidate(26, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(29, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
    if ("height" in $$props) $$invalidate(3, height = $$props.height);
    if ("selectedBins" in $$props) $$invalidate(2, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(27, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
    if ("width" in $$props) $$invalidate(4, width = $$props.width);
    if ("rangesExtent" in $$props) $$invalidate(30, rangesExtent = $$props.rangesExtent);
    if ("isMousedown" in $$props) $$invalidate(5, isMousedown = $$props.isMousedown);
    if ("safety" in $$props) $$invalidate(6, safety = $$props.safety);
    if ("innerWidth" in $$props) $$invalidate(7, innerWidth = $$props.innerWidth);
    if ("innerHeight" in $$props) $$invalidate(8, innerHeight = $$props.innerHeight);
    if ("origin" in $$props) $$invalidate(9, origin = $$props.origin);
    if ("direction" in $$props) direction = $$props.direction;
    if ("ticksX" in $$props) $$invalidate(10, ticksX = $$props.ticksX);
    if ("ticksAnchor" in $$props) $$invalidate(11, ticksAnchor = $$props.ticksAnchor);
    if ("ticks" in $$props) $$invalidate(12, ticks = $$props.ticks);
    if ("scales" in $$props) $$invalidate(13, scales = $$props.scales);
    if ("useValue" in $$props) $$invalidate(32, useValue = $$props.useValue);
    if ("getBinsMax" in $$props) $$invalidate(33, getBinsMax = $$props.getBinsMax);
    if ("valuesMax" in $$props) $$invalidate(34, valuesMax = $$props.valuesMax);
    if ("bars" in $$props) $$invalidate(14, bars = $$props.bars);
    if ("maxBarThickness" in $$props) $$invalidate(35, maxBarThickness = $$props.maxBarThickness);
    if ("fontSize" in $$props) $$invalidate(15, fontSize = $$props.fontSize);
    if ("isBrushing" in $$props) $$invalidate(16, isBrushing = $$props.isBrushing);
    if ("isPressed" in $$props) isPressed = $$props.isPressed;
    if ("doesBrushAdd" in $$props) $$invalidate(38, doesBrushAdd = $$props.doesBrushAdd);
    if ("doesBrushRemove" in $$props) $$invalidate(39, doesBrushRemove = $$props.doesBrushRemove);
    if ("brushStroke" in $$props) $$invalidate(40, brushStroke = $$props.brushStroke);
    if ("brushExtent" in $$props) $$invalidate(41, brushExtent = $$props.brushExtent);
    if ("brushRange" in $$props) $$invalidate(42, brushRange = $$props.brushRange);
    if ("brushExtentBarYs" in $$props) $$invalidate(43, brushExtentBarYs = $$props.brushExtentBarYs);
    if ("brushLine" in $$props) $$invalidate(17, brushLine = $$props.brushLine);
    if ("style" in $$props) $$invalidate(18, style = $$props.style);
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
    67108864) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(26, bins = bins || []);
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    1) {
       $$invalidate(0, flags = flags ? _objectSpread$6(_objectSpread$6({}, defaultFlags), flags) : defaultFlags);
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2) {
       $$invalidate(1, geometry = geometry ? _objectSpread$6(_objectSpread$6({}, defaultGeometry), geometry) : defaultGeometry);
    }

    if ($$self.$$.dirty[0] &
    /*selectedBins*/
    4) {
       $$invalidate(2, selectedBins = selectedBins || []);
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728) {
       $$invalidate(27, theme = theme ? _objectSpread$6(_objectSpread$6({}, defaultTheme), theme) : defaultTheme);
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
    3) {
       $$invalidate(6, safety = {
        top: geometry.safetyY,
        right: flags.isRightToLeft ? flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks : geometry.safetyXValues,
        bottom: geometry.safetyY,
        left: flags.isRightToLeft ? geometry.safetyXValues : flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks
      });
    }

    if ($$self.$$.dirty[0] &
    /*width, safety*/
    80) {
       $$invalidate(7, innerWidth = Math.max(0, width - safety.left - safety.right));
    }

    if ($$self.$$.dirty[0] &
    /*height, safety, geometry*/
    74) {
       $$invalidate(8, innerHeight = Math.max(0, height - safety.top - safety.bottom - geometry.maxFontSize));
    }

    if ($$self.$$.dirty[0] &
    /*flags, innerWidth, innerHeight*/
    385) {
       $$invalidate(9, origin = {
        x: flags.isRightToLeft ? innerWidth : 0,
        y: flags.isTopDown ? 0 : innerHeight
      });
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    1) {
       direction = {
        x: flags.isRightToLeft ? -1 : 1,
        y: flags.isTopDown ? 1 : -1
      };
    }

    if ($$self.$$.dirty[0] &
    /*flags, geometry*/
    3) {
       $$invalidate(10, ticksX = flags.isRightToLeft ? geometry.originRadius + geometry.textPadding : -(geometry.originRadius + geometry.textPadding));
    }

    if ($$self.$$.dirty[0] &
    /*flags*/
    1) {
       $$invalidate(11, ticksAnchor = flags.isRightToLeft ? "start" : "end");
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    67108864) {
       $$invalidate(32, useValue = bins.length && has(bins[0], "value"));
    }

    if ($$self.$$.dirty[1] &
    /*useValue*/
    2) {
       $$invalidate(33, getBinsMax = useValue ? arrayMaxWith(getValue) : arrayMaxWith(getValuesLength));
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    67108864 | $$self.$$.dirty[1] &
    /*getBinsMax*/
    4) {
       $$invalidate(34, valuesMax = getBinsMax(bins));
    }

    if ($$self.$$.dirty[0] &
    /*bins*/
    67108864) {
       $$invalidate(30, rangesExtent = bins.length ? [bins[0].range[0], last(bins).range[1]] : []);
    }

    if ($$self.$$.dirty[0] &
    /*bins, flags, innerWidth, rangesExtent, innerHeight*/
    1140851073 | $$self.$$.dirty[1] &
    /*valuesMax*/
    8) {
      /* eslint-disable indent */
       $$invalidate(13, scales = bins.length && {
        x: flags.useLogScale ? log().domain([1, valuesMax]).range([innerWidth / Math.log10(valuesMax), innerWidth]) : linear$1().domain([0, valuesMax]).range([0, innerWidth]),
        y: linear$1().domain(rangesExtent).range([0, innerHeight])
      });
    }

    if ($$self.$$.dirty[0] &
    /*bins, ticksFormatFn, flags, scales*/
    335552513) {
       $$invalidate(12, ticks = getBinsTicks(bins).map(function (tick) {
        return {
          tick: ticksFormatFn(tick),
          y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
        };
      }));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    32) {
       $$invalidate(16, isBrushing = $brush.state === "Brushing");
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    32) {
       $$invalidate(38, doesBrushAdd = $brush.modifier === "shift");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    65536 | $$self.$$.dirty[1] &
    /*$brush*/
    32) {
       $$invalidate(41, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    65536 | $$self.$$.dirty[1] &
    /*brushExtent*/
    1024) {
       $$invalidate(42, brushRange = isBrushing && inclusiveRange(brushExtent));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    32) {
       $$invalidate(39, doesBrushRemove = $brush.modifier === "alt");
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, selectedBins*/
    65540 | $$self.$$.dirty[1] &
    /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/
    2464) {
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
    /*bins, selectedBins, scales, flags, innerWidth, innerHeight, geometry, binsFill, theme*/
    738206087) {
      /* eslint-enable indent */
       $$invalidate(14, bars = bins.map(function (bin, index) {
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
        return _objectSpread$6(_objectSpread$6({}, bin), {
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
    16384) {
       $$invalidate(35, maxBarThickness = makeMaxBarThickness(bars));
    }

    if ($$self.$$.dirty[0] &
    /*geometry*/
    2 | $$self.$$.dirty[1] &
    /*maxBarThickness*/
    16) {
       $$invalidate(15, fontSize = Math.min(geometry.maxFontSize, geometry.fontSizeFactor * maxBarThickness));
    }

    if ($$self.$$.dirty[1] &
    /*$brush*/
    32) {
       isPressed = $brush.state === "Pressed";
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728 | $$self.$$.dirty[1] &
    /*doesBrushAdd, doesBrushRemove*/
    384) {
       $$invalidate(40, brushStroke = doesBrushAdd ? theme.brushAddStroke : doesBrushRemove ? theme.brushRemoveStroke : null);
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing, bars*/
    81920 | $$self.$$.dirty[1] &
    /*brushExtent*/
    1024) {
       $$invalidate(43, brushExtentBarYs = isBrushing && sort([bars[brushExtent[0]].y1, bars[brushExtent[0]].y2, bars[brushExtent[1]].y1, bars[brushExtent[1]].y2]));
    }

    if ($$self.$$.dirty[0] &
    /*isBrushing*/
    65536 | $$self.$$.dirty[1] &
    /*brushExtentBarYs*/
    4096) {
       $$invalidate(17, brushLine = isBrushing && {
        y1: brushExtentBarYs[0],
        y2: brushExtentBarYs[3]
      });
    }

    if ($$self.$$.dirty[0] &
    /*theme*/
    134217728 | $$self.$$.dirty[1] &
    /*brushStroke*/
    512) {
      /* style */
       $$invalidate(18, style = makeStyleVars(_objectSpread$6(_objectSpread$6({}, theme), {}, {
        brushStroke: brushStroke
      })));
    }
  };

  return [flags, geometry, selectedBins, height, width, isMousedown, safety, innerWidth, innerHeight, origin, ticksX, ticksAnchor, ticks, scales, bars, fontSize, isBrushing, brushLine, style, brush, onMouseenter, onMousedown, onMousemove, onMouseup, onMouseleave, resetSelection, bins, theme, ticksFormatFn, binsFill];
}

var HistogramG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(HistogramG, _SvelteComponentDev);

  var _super = _createSuper$i(HistogramG);

  function HistogramG(options) {
    var _this;

    _classCallCheck(this, HistogramG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {
      bins: 26,
      binsFill: 29,
      flags: 0,
      geometry: 1,
      height: 3,
      selectedBins: 2,
      theme: 27,
      ticksFormatFn: 28,
      width: 4
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
    /*bins*/
    ctx[26] === undefined && !("bins" in props)) {
      console.warn("<HistogramG> was created without expected prop 'bins'");
    }

    if (
    /*binsFill*/
    ctx[29] === undefined && !("binsFill" in props)) {
      console.warn("<HistogramG> was created without expected prop 'binsFill'");
    }

    if (
    /*flags*/
    ctx[0] === undefined && !("flags" in props)) {
      console.warn("<HistogramG> was created without expected prop 'flags'");
    }

    if (
    /*geometry*/
    ctx[1] === undefined && !("geometry" in props)) {
      console.warn("<HistogramG> was created without expected prop 'geometry'");
    }

    if (
    /*height*/
    ctx[3] === undefined && !("height" in props)) {
      console.warn("<HistogramG> was created without expected prop 'height'");
    }

    if (
    /*selectedBins*/
    ctx[2] === undefined && !("selectedBins" in props)) {
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

    if (
    /*width*/
    ctx[4] === undefined && !("width" in props)) {
      console.warn("<HistogramG> was created without expected prop 'width'");
    }

    return _this;
  }

  _createClass(HistogramG, [{
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
    key: "height",
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
  }, {
    key: "width",
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
var file$d = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramDiv.svelte"; // (33:1) {#if title}

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
      add_location(h2, file$d, 34, 2, 676);
      attr_dev(header, "class", "svelte-4i00u3");
      toggle_class(header, "rightToLeft",
      /*flags*/
      ctx[3] &&
      /*flags*/
      ctx[3].isRightToLeft);
      add_location(header, file$d, 33, 1, 616);
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
    source: "(33:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (47:3) {#if bins}


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
      ctx[8],
      selectedBins:
      /*selectedBins*/
      ctx[5],
      theme:
      /*theme*/
      ctx[6],
      ticksFormatFn:
      /*ticksFormatFn*/
      ctx[7],
      width:
      /*width*/
      ctx[9]
    },
    $$inline: true
  });
  histogramg.$on("brushed",
  /*brushed_handler*/
  ctx[13]);
  histogramg.$on("brushend",
  /*brushend_handler*/
  ctx[14]);
  histogramg.$on("brushstart",
  /*brushstart_handler*/
  ctx[15]);
  histogramg.$on("clicked",
  /*clicked_handler*/
  ctx[16]);
  histogramg.$on("entered",
  /*entered_handler*/
  ctx[17]);
  histogramg.$on("exited",
  /*exited_handler*/
  ctx[18]);
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
      256) histogramg_changes.height =
      /*height*/
      ctx[8];
      if (dirty &
      /*selectedBins*/
      32) histogramg_changes.selectedBins =
      /*selectedBins*/
      ctx[5];
      if (dirty &
      /*theme*/
      64) histogramg_changes.theme =
      /*theme*/
      ctx[6];
      if (dirty &
      /*ticksFormatFn*/
      128) histogramg_changes.ticksFormatFn =
      /*ticksFormatFn*/
      ctx[7];
      if (dirty &
      /*width*/
      512) histogramg_changes.width =
      /*width*/
      ctx[9];
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
    source: "(47:3) {#if bins}",
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
      ctx[9]);
      attr_dev(svg, "height",
      /*height*/
      ctx[8]);
      attr_dev(svg, "class", "svelte-4i00u3");
      add_location(svg, file$d, 42, 2, 818);
      attr_dev(main, "class", "svelte-4i00u3");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[19].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[0] &&
      /*title*/
      ctx[0].length);
      add_location(main, file$d, 37, 1, 712);
      attr_dev(div, "class", "HistogramDiv svelte-4i00u3");
      attr_dev(div, "style",
      /*style*/
      ctx[10]);
      toggle_class(div, "interactive",
      /*flags*/
      ctx[3] &&
      /*flags*/
      ctx[3].isInteractive);
      add_location(div, file$d, 27, 0, 514);
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
      ctx[19].bind(main));
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
      512) {
        attr_dev(svg, "width",
        /*width*/
        ctx[9]);
      }

      if (!current || dirty &
      /*height*/
      256) {
        attr_dev(svg, "height",
        /*height*/
        ctx[8]);
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
      1024) {
        attr_dev(div, "style",
        /*style*/
        ctx[10]);
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
  var selectedBins = $$props.selectedBins;
  var theme = $$props.theme;
  var ticksFormatFn = $$props.ticksFormatFn;
  var height = 0;
  var width = 0;
  var writable_props = ["headerHeight", "padding", "title", "bins", "binsFill", "flags", "geometry", "selectedBins", "theme", "ticksFormatFn"];
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
    $$invalidate(8, height);
    $$invalidate(9, width);
  }

  $$self.$set = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(12, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(2, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(3, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
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
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      height: height,
      width: width,
      style: style
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("headerHeight" in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
    if ("padding" in $$props) $$invalidate(12, padding = $$props.padding);
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
    if ("binsFill" in $$props) $$invalidate(2, binsFill = $$props.binsFill);
    if ("flags" in $$props) $$invalidate(3, flags = $$props.flags);
    if ("geometry" in $$props) $$invalidate(4, geometry = $$props.geometry);
    if ("selectedBins" in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
    if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
    if ("ticksFormatFn" in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
    if ("height" in $$props) $$invalidate(8, height = $$props.height);
    if ("width" in $$props) $$invalidate(9, width = $$props.width);
    if ("style" in $$props) $$invalidate(10, style = $$props.style);
  };

  var style;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*padding*/
    4096) {
       $$invalidate(12, padding = padding || "10px");
    }

    if ($$self.$$.dirty &
    /*headerHeight*/
    2048) {
       $$invalidate(11, headerHeight = headerHeight || "2rem");
    }

    if ($$self.$$.dirty &
    /*headerHeight, padding*/
    6144) {
       $$invalidate(10, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };

  return [title, bins, binsFill, flags, geometry, selectedBins, theme, ticksFormatFn, height, width, style, headerHeight, padding, brushed_handler, brushend_handler, brushstart_handler, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}

var HistogramDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(HistogramDiv, _SvelteComponentDev);

  var _super = _createSuper$j(HistogramDiv);

  function HistogramDiv(options) {
    var _this;

    _classCallCheck(this, HistogramDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {
      headerHeight: 11,
      padding: 12,
      title: 0,
      bins: 1,
      binsFill: 2,
      flags: 3,
      geometry: 4,
      selectedBins: 5,
      theme: 6,
      ticksFormatFn: 7
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
    ctx[11] === undefined && !("headerHeight" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'headerHeight'");
    }

    if (
    /*padding*/
    ctx[12] === undefined && !("padding" in props)) {
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
    /*selectedBins*/
    ctx[5] === undefined && !("selectedBins" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'selectedBins'");
    }

    if (
    /*theme*/
    ctx[6] === undefined && !("theme" in props)) {
      console.warn("<HistogramDiv> was created without expected prop 'theme'");
    }

    if (
    /*ticksFormatFn*/
    ctx[7] === undefined && !("ticksFormatFn" in props)) {
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

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var components = _objectSpread$7(_objectSpread$7(_objectSpread$7(_objectSpread$7({}, barchart), choropleth), histogram), legend);

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$e = "src/routes/components/[slug].svelte";

function get_each_context$7(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[22] = list[i][0];
  child_ctx[23] = list[i][1];
  return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[26] = list[i][0];
  child_ctx[27] = list[i][1];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[26] = list[i].key;
  child_ctx[31] = i;
  return child_ctx;
} // (73:2) {#if data.length > 1}


function create_if_block_2$4(ctx) {
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
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
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
          var child_ctx = get_each_context_2(ctx, each_value_2, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2(child_ctx);

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
    id: create_if_block_2$4.name,
    type: "if",
    source: "(73:2) {#if data.length > 1}",
    ctx: ctx
  });
  return block;
} // (82:5) {#each data as {key}


function create_each_block_2(ctx) {
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
    id: create_each_block_2.name,
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
    each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
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
          var child_ctx = get_each_context_1$2(ctx, each_value_1, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_1$2(child_ctx);

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


function create_each_block_1$2(ctx) {
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
    id: create_each_block_1$2.name,
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


function create_else_block$2(ctx) {
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
    id: create_else_block$2.name,
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
  var switch_instance_spread_levels = [_objectSpread$8(_objectSpread$8({},
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
      2144 ? get_spread_update(switch_instance_spread_levels, [_objectSpread$8(_objectSpread$8({},
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
  ctx[0].length > 1 && create_if_block_2$4(ctx);
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

  var if_block_creators = [create_if_block$b, create_else_block$2];
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
          if_block0 = create_if_block_2$4(ctx);
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