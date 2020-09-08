import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, b as detach_dev, j as attr_dev, y as toggle_class, k as add_location, l as insert_dev, m as append_dev, A as listen_dev, n as noop$1, B as bubble, z as set_data_dev, C as empty, D as getContext, E as setContext, F as create_component, G as claim_component, H as mount_component, w as transition_in, x as transition_out, I as destroy_component, a as space, c as claim_space, J as group_outros, K as check_outros, o as validate_each_argument, r as destroy_each, L as globals, M as null_to_empty, N as validate_each_keys, O as createEventDispatcher, P as beforeUpdate, Q as afterUpdate, R as svg_element, T as is_function, U as run_all, V as add_render_callback, W as add_resize_listener, X as update_keyed_each, Y as binding_callbacks, Z as destroy_block, _ as set_style, $ as validate_store, a0 as component_subscribe, a1 as writable, a2 as prop_dev, q as query_selector_all, a3 as assign, a4 as get_spread_update, a5 as get_spread_object } from './client.0807cbb2.js';
import { p as pipe, i as isNotNull, r as reduceWith, g as getKey$3, c as collect, h as head, l as last, a as isUndefined, b as range, d as appendTo, e as sortWith, f as sorterDesc, j as apply, m as make, k as identity$1, n as mapWith, o as always, q as generic, t as allOf, u as isGTE, v as isLTE, w as partial, _ as __, x as transformer, y as copy, z as initRange, A as ticks, B as format, C as adder, D as noop, E as abs, F as sqrt, G as tau, H as geoStream, I as boundsStream, J as identity$2, K as sin, L as atan2, M as asin, N as cos, O as projection, P as acos, Q as epsilon2, R as epsilon, S as skipIf, T as isNil, U as pairs$1, V as makeMergeAppliedFnMap, W as index, X as isIn, Y as updateKey, Z as has, $ as mercator, a0 as getPath, a1 as sort, a2 as adapter, a3 as map, a4 as reduce, a5 as isNotNil, a6 as isIterableNotEmpty, a7 as every, a8 as hasKey, a9 as flatten, aa as findIndexWhere, ab as findLastIndexWhere, ac as slice, ad as uniques, ae as filterWith, af as concat, ag as mergeObj, ah as linear$1, ai as pullFrom, aj as lookup, ak as _, al as setIn } from './_utils.08a69f72.js';

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
const isNotNullWith = accessor => pipe([accessor, isNotNull]);

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
const arrayMaxWith = fn => reduceWith((max, item) => {
	const value = fn(item);

	return value > max ? value : max;
}, -Infinity);

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
const arrayMinWith = fn => reduceWith((min, item) => {
	const value = fn(item);

	return value < min ? value : min;
}, Infinity);

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
  if ((value1 !== value1) && (value2 !== value2)) {
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
const getKey = getKey$3('key');

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
const getValue = getKey$3('value');

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
const getValues = getKey$3('values');

/**
* @module @svizzle/utils/array-array
*/

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
const getFirstAndLast = collect([head, last]);

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
const inclusiveRange = ([start, end, step = 1]) => {
	if (start === end) {
		return isUndefined(start) ? [] : [start];
	}

	const range$1 = range(start, end, step);

	return range$1.length === 0 || last(range$1) + step > end
		? range$1
		: appendTo(range$1, end);
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

const sortValueAscKeyDesc = sortWith([
	getValue,
	sorterDesc(getKey)
]);

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
const sortValueDescKeyAsc = sortWith([
	sorterDesc(getValue),
	getKey
]);

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
const sortValueDescKeyDesc = sortWith([
	sorterDesc(getValue),
	sorterDesc(getKey)
]);

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
const makeKeyed = value => pipe([
	collect([identity$1, mapWith(always(value))]),
	apply(make)
]);

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
const join = generic(Array.prototype.join);

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
const makeIsWithinRange = range => allOf([
	isGTE(range[0]),
	isLTE(range[1])
]);

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
const joinWith = separator => partial(join, [__, separator]);

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
const joinWithColon = joinWith(':');

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
const joinWithSemicolon = joinWith(';');

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
const prepend = prefix => string => prefix + string;

function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

function pairs(values, pairof = pair) {
  const pairs = [];
  let previous;
  let first = false;
  for (const value of values) {
    if (first) pairs.push(pairof(previous, value));
    previous = value;
    first = true;
  }
  return pairs;
}

function pair(a, b) {
  return [a, b];
}

function nice(domain, interval) {
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
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
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

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
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

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  return scale;
}

function log() {
  var scale = loggish(transformer()).domain([1, 10]);

  scale.copy = function() {
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
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
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

// TODO Enforce positive area for exterior, negative area for interior?

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
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
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
  var dx = x - x0$1, dy = y - y0$1, z = sqrt(dx * dx + dy * dy);
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
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
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
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00$2, y00$2);
    lengthStream.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
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
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
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
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

function geoPath(projection, context) {
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

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$2) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

function azimuthalEqualArea() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function azimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function equirectangular() {
  return projection(equirectangularRaw)
      .scale(152.63);
}

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = sqrt(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = asin(M * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
    asin(sin(l) / M)
  ];
};

function equalEarth() {
  return projection(equalEarthRaw)
      .scale(177.158);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

function naturalEarth1() {
  return projection(naturalEarth1Raw)
      .scale(175.295);
}

var contextKey = {};

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte generated by Svelte v3.24.0 */

const file = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte";

function create_fragment(ctx) {
	let div1;
	let div0;
	let t_value = "▶" + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t = claim_text(div0_nodes, t_value);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "arrow svelte-1vyml86");
			toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			add_location(div0, file, 29, 2, 622);
			attr_dev(div1, "class", "container svelte-1vyml86");
			add_location(div1, file, 28, 0, 587);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, t);

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*expanded*/ 1) {
				toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
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
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { expanded } = $$props;
	const writable_props = ["expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONArrow> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONArrow", $$slots, []);

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$set = $$props => {
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({ expanded });

	$$self.$inject_state = $$props => {
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [expanded, click_handler];
}

class JSONArrow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { expanded: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrow",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*expanded*/ ctx[0] === undefined && !("expanded" in props)) {
			console.warn("<JSONArrow> was created without expected prop 'expanded'");
		}
	}

	get expanded() {
		throw new Error("<JSONArrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte generated by Svelte v3.24.0 */

const file$1 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte";

// (16:0) {#if showKey && key}
function create_if_block(ctx) {
	let label;
	let span;
	let t0;
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = element("label");
			span = element("span");
			t0 = text(/*key*/ ctx[0]);
			t1 = text(/*colon*/ ctx[2]);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { class: true });
			var label_nodes = children(label);
			span = claim_element(label_nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, /*key*/ ctx[0]);
			t1 = claim_text(span_nodes, /*colon*/ ctx[2]);
			span_nodes.forEach(detach_dev);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 17, 4, 399);
			attr_dev(label, "class", "svelte-1vlbacg");
			toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			add_location(label, file$1, 16, 2, 346);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);
			append_dev(label, span);
			append_dev(span, t0);
			append_dev(span, t1);

			if (!mounted) {
				dispose = listen_dev(label, "click", /*click_handler*/ ctx[5], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*key*/ 1) set_data_dev(t0, /*key*/ ctx[0]);
			if (dirty & /*colon*/ 4) set_data_dev(t1, /*colon*/ ctx[2]);

			if (dirty & /*isParentExpanded*/ 2) {
				toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(16:0) {#if showKey && key}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let if_block_anchor;
	let if_block = /*showKey*/ ctx[3] && /*key*/ ctx[0] && create_if_block(ctx);

	const block = {
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
		p: function update(ctx, [dirty]) {
			if (/*showKey*/ ctx[3] && /*key*/ ctx[0]) {
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
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray = false } = $$props,
		{ colon = ":" } = $$props;

	const writable_props = ["key", "isParentExpanded", "isParentArray", "colon"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONKey> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONKey", $$slots, []);

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
	};

	$$self.$capture_state = () => ({
		key,
		isParentExpanded,
		isParentArray,
		colon,
		showKey
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
		if ("showKey" in $$props) $$invalidate(3, showKey = $$props.showKey);
	};

	let showKey;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded, isParentArray, key*/ 19) {
			 $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
		}
	};

	return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			key: 0,
			isParentExpanded: 1,
			isParentArray: 4,
			colon: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONKey",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONKey> was created without expected prop 'key'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONKey> was created without expected prop 'isParentExpanded'");
		}
	}

	get key() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte generated by Svelte v3.24.0 */
const file$2 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (57:4) {#if expandable && isParentExpanded}
function create_if_block_3(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[15]);

	const block = {
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
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
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
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(57:4) {#if expandable && isParentExpanded}",
		ctx
	});

	return block;
}

// (75:4) {:else}
function create_else_block(ctx) {
	let span;
	let t;

	const block = {
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
		block,
		id: create_else_block.name,
		type: "else",
		source: "(75:4) {:else}",
		ctx
	});

	return block;
}

// (63:4) {#if isParentExpanded}
function create_if_block$1(ctx) {
	let ul;
	let t;
	let current;
	let mounted;
	let dispose;
	let each_value = /*slicedKeys*/ ctx[13];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length && create_if_block_1(ctx);

	const block = {
		c: function create() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			t = claim_space(ul_nodes);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-rwxv37");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$2, 63, 6, 1589);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(ul, t);
			if (if_block) if_block.m(ul, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(ul, "click", /*expand*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/ 10129) {
				each_value = /*slicedKeys*/ ctx[13];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length) {
				if (if_block) ; else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(ul, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
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
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(63:4) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (67:10) {#if !expanded && index < previewKeys.length - 1}
function create_if_block_2(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(",");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
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
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(67:10) {#if !expanded && index < previewKeys.length - 1}",
		ctx
	});

	return block;
}

// (65:8) {#each slicedKeys as key, index}
function create_each_block(ctx) {
	let jsonnode;
	let t;
	let if_block_anchor;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*getKey*/ ctx[8](/*key*/ ctx[12]),
				isParentExpanded: /*expanded*/ ctx[0],
				isParentArray: /*isArray*/ ctx[4],
				value: /*expanded*/ ctx[0]
				? /*getValue*/ ctx[9](/*key*/ ctx[12])
				: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12])
			},
			$$inline: true
		});

	let if_block = !/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1 && create_if_block_2(ctx);

	const block = {
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
			const jsonnode_changes = {};
			if (dirty & /*getKey, slicedKeys*/ 8448) jsonnode_changes.key = /*getKey*/ ctx[8](/*key*/ ctx[12]);
			if (dirty & /*expanded*/ 1) jsonnode_changes.isParentExpanded = /*expanded*/ ctx[0];
			if (dirty & /*isArray*/ 16) jsonnode_changes.isParentArray = /*isArray*/ ctx[4];

			if (dirty & /*expanded, getValue, slicedKeys, getPreviewValue*/ 9729) jsonnode_changes.value = /*expanded*/ ctx[0]
			? /*getValue*/ ctx[9](/*key*/ ctx[12])
			: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12]);

			jsonnode.$set(jsonnode_changes);

			if (!/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1) {
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
		block,
		id: create_each_block.name,
		type: "each",
		source: "(65:8) {#each slicedKeys as key, index}",
		ctx
	});

	return block;
}

// (71:8) {#if slicedKeys.length < previewKeys.length }
function create_if_block_1(ctx) {
	let span;
	let t;

	const block = {
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
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(71:8) {#if slicedKeys.length < previewKeys.length }",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let li;
	let label_1;
	let t0;
	let jsonkey;
	let t1;
	let span1;
	let span0;
	let t2;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let span2;
	let t6;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2] && create_if_block_3(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[12],
				colon: /*context*/ ctx[14].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3]
			},
			$$inline: true
		});

	jsonkey.$on("click", /*toggleExpand*/ ctx[15]);
	const if_block_creators = [create_if_block$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isParentExpanded*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			li = element("li");
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span1 = element("span");
			span0 = element("span");
			t2 = text(/*label*/ ctx[1]);
			t3 = text(/*bracketOpen*/ ctx[5]);
			t4 = space();
			if_block1.c();
			t5 = space();
			span2 = element("span");
			t6 = text(/*bracketClose*/ ctx[6]);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			label_1 = claim_element(li_nodes, "LABEL", { class: true });
			var label_1_nodes = children(label_1);
			if (if_block0) if_block0.l(label_1_nodes);
			t0 = claim_space(label_1_nodes);
			claim_component(jsonkey.$$.fragment, label_1_nodes);
			t1 = claim_space(label_1_nodes);
			span1 = claim_element(label_1_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			span0 = claim_element(span1_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t2 = claim_text(span0_nodes, /*label*/ ctx[1]);
			span0_nodes.forEach(detach_dev);
			t3 = claim_text(span1_nodes, /*bracketOpen*/ ctx[5]);
			span1_nodes.forEach(detach_dev);
			label_1_nodes.forEach(detach_dev);
			t4 = claim_space(li_nodes);
			if_block1.l(li_nodes);
			t5 = claim_space(li_nodes);
			span2 = claim_element(li_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			t6 = claim_text(span2_nodes, /*bracketClose*/ ctx[6]);
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
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
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
				dispose = listen_dev(span1, "click", /*toggleExpand*/ ctx[15], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*expandable, isParentExpanded*/ 2052) {
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

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 4096) jsonkey_changes.key = /*key*/ ctx[12];
			if (dirty & /*isParentExpanded*/ 4) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[3];
			jsonkey.$set(jsonkey_changes);
			if (!current || dirty & /*label*/ 2) set_data_dev(t2, /*label*/ ctx[1]);
			if (!current || dirty & /*bracketOpen*/ 32) set_data_dev(t3, /*bracketOpen*/ ctx[5]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
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

			if (!current || dirty & /*bracketClose*/ 64) set_data_dev(t6, /*bracketClose*/ ctx[6]);

			if (dirty & /*isParentExpanded*/ 4) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
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
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ keys } = $$props,
		{ colon = ":" } = $$props,
		{ label = "" } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ isArray = false } = $$props,
		{ bracketOpen } = $$props,
		{ bracketClose } = $$props;

	let { previewKeys = keys } = $$props;
	let { getKey = key => key } = $$props;
	let { getValue = key => key } = $$props;
	let { getPreviewValue = getValue } = $$props;
	let { expanded = false } = $$props, { expandable = true } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	function expand() {
		$$invalidate(0, expanded = true);
	}

	const writable_props = [
		"key",
		"keys",
		"colon",
		"label",
		"isParentExpanded",
		"isParentArray",
		"isArray",
		"bracketOpen",
		"bracketClose",
		"previewKeys",
		"getKey",
		"getValue",
		"getPreviewValue",
		"expanded",
		"expandable"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONNested> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONNested", $$slots, []);

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		keys,
		colon,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expanded,
		expandable,
		context,
		toggleExpand,
		expand,
		slicedKeys
	});

	$$self.$inject_state = $$props => {
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

	let slicedKeys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded*/ 4) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}

		if ($$self.$$.dirty & /*expanded, keys, previewKeys*/ 131201) {
			 $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
		}
	};

	return [
		expanded,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expandable,
		key,
		slicedKeys,
		context,
		toggleExpand,
		expand,
		keys,
		colon
	];
}

class JSONNested extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
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
			component: this,
			tagName: "JSONNested",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[12] === undefined && !("key" in props)) {
			console.warn("<JSONNested> was created without expected prop 'key'");
		}

		if (/*keys*/ ctx[17] === undefined && !("keys" in props)) {
			console.warn("<JSONNested> was created without expected prop 'keys'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentArray'");
		}

		if (/*bracketOpen*/ ctx[5] === undefined && !("bracketOpen" in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketOpen'");
		}

		if (/*bracketClose*/ ctx[6] === undefined && !("bracketClose" in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketClose'");
		}
	}

	get key() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketOpen() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketOpen(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketClose() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketClose(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get previewKeys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set previewKeys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getKey() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getKey(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getPreviewValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getPreviewValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expandable() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expandable(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONObjectNode.svelte generated by Svelte v3.24.0 */

const { Object: Object_1 } = globals;

function create_fragment$3(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[5],
				previewKeys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: "" + (/*nodeType*/ ctx[3] + " "),
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
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
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*keys*/ 32) jsonnested_changes.previewKeys = /*keys*/ ctx[5];
			if (dirty & /*nodeType*/ 8) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + " ");
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
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let { expanded = false } = $$props;

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType", "expanded"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONObjectNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONObjectNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(7, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		getValue,
		keys
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(7, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
	};

	let keys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 128) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}
	};

	return [
		key,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		keys,
		getValue,
		value
	];
}

class JSONObjectNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			key: 0,
			value: 7,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONObjectNode",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[7] === undefined && !("value" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrayNode.svelte generated by Svelte v3.24.0 */

const { Object: Object_1$1 } = globals;

function create_fragment$4(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				isArray: true,
				keys: /*keys*/ ctx[5],
				previewKeys: /*previewKeys*/ ctx[6],
				getValue: /*getValue*/ ctx[7],
				label: "Array(" + /*value*/ ctx[1].length + ")",
				bracketOpen: "[",
				bracketClose: "]"
			},
			$$inline: true
		});

	const block = {
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
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*previewKeys*/ 64) jsonnested_changes.previewKeys = /*previewKeys*/ ctx[6];
			if (dirty & /*value*/ 2) jsonnested_changes.label = "Array(" + /*value*/ ctx[1].length + ")";
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
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const filteredKey = new Set(["length"]);

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONArrayNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONArrayNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		filteredKey,
		getValue,
		keys,
		previewKeys
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
		if ("previewKeys" in $$props) $$invalidate(6, previewKeys = $$props.previewKeys);
	};

	let keys;
	let previewKeys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}

		if ($$self.$$.dirty & /*keys*/ 32) {
			 $$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		previewKeys,
		getValue
	];
}

class JSONArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrayNode",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONIterableArrayNode.svelte generated by Svelte v3.24.0 */

function create_fragment$5(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$1,
				getValue: getValue$1,
				isArray: true,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
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
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
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
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
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
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let keys = [];
	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONIterableArrayNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONIterableArrayNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey: getKey$1,
		getValue: getValue$1
	});

	$$self.$inject_state = $$props => {
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

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, entry]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableArrayNode",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !("value" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONIterableMapNode.svelte generated by Svelte v3.24.0 */

function create_fragment$6(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$2,
				getValue: getValue$2,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				colon: "",
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
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
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
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
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
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
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let keys = [];
	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONIterableMapNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONIterableMapNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		MapEntry,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey: getKey$2,
		getValue: getValue$2
	});

	$$self.$inject_state = $$props => {
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

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, new MapEntry(entry[0], entry[1])]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableMapNode",
			options,
			id: create_fragment$6.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !("value" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONMapEntryNode.svelte generated by Svelte v3.24.0 */

function create_fragment$7(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				key: /*isParentExpanded*/ ctx[2]
				? String(/*key*/ ctx[0])
				: /*value*/ ctx[1].key,
				keys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: /*isParentExpanded*/ ctx[2] ? "Entry " : "=> ",
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
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
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];

			if (dirty & /*isParentExpanded, key, value*/ 7) jsonnested_changes.key = /*isParentExpanded*/ ctx[2]
			? String(/*key*/ ctx[0])
			: /*value*/ ctx[1].key;

			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.label = /*isParentExpanded*/ ctx[2] ? "Entry " : "=> ";
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
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const keys = ["key", "value"];

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONMapEntryNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONMapEntryNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		getValue
	});

	$$self.$inject_state = $$props => {
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

class JSONMapEntryNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONMapEntryNode",
			options,
			id: create_fragment$7.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte generated by Svelte v3.24.0 */
const file$3 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte";

function create_fragment$8(ctx) {
	let li;
	let jsonkey;
	let t0;
	let span;

	let t1_value = (/*valueGetter*/ ctx[2]
	? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
	: /*value*/ ctx[1]) + "";

	let t1;
	let span_class_value;
	let current;

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[0],
				colon: /*colon*/ ctx[6],
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t0 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, t1_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"));
			add_location(span, file$3, 47, 2, 948);
			attr_dev(li, "class", "svelte-3bjyvl");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
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
		p: function update(ctx, [dirty]) {
			const jsonkey_changes = {};
			if (dirty & /*key*/ 1) jsonkey_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);

			if ((!current || dirty & /*valueGetter, value*/ 6) && t1_value !== (t1_value = (/*valueGetter*/ ctx[2]
			? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
			: /*value*/ ctx[1]) + "")) set_data_dev(t1, t1_value);

			if (!current || dirty & /*nodeType*/ 32 && span_class_value !== (span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"))) {
				attr_dev(span, "class", span_class_value);
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
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
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ valueGetter = null } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	const { colon } = getContext(contextKey);
	const writable_props = ["key", "value", "valueGetter", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONValueNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONValueNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		getContext,
		contextKey,
		JSONKey,
		key,
		value,
		valueGetter,
		isParentExpanded,
		isParentArray,
		nodeType,
		colon
	});

	$$self.$inject_state = $$props => {
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

class JSONValueNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			key: 0,
			value: 1,
			valueGetter: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			nodeType: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONValueNode",
			options,
			id: create_fragment$8.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[5] === undefined && !("nodeType" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueGetter() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueGetter(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte generated by Svelte v3.24.0 */
const file$4 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (40:2) {#if isParentExpanded}
function create_if_block_2$1(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[7]);

	const block = {
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
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
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
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(40:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (45:2) {#if isParentExpanded}
function create_if_block$2(ctx) {
	let ul;
	let current;
	let if_block = /*expanded*/ ctx[0] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			ul = element("ul");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-1ca3gb2");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$4, 45, 4, 1134);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);
			if (if_block) if_block.m(ul, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*expanded*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*expanded*/ 1) {
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

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
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
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(45:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (47:6) {#if expanded}
function create_if_block_1$1(ctx) {
	let jsonnode;
	let t0;
	let li;
	let jsonkey;
	let t1;
	let span;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: "message",
				value: /*value*/ ctx[2].message
			},
			$$inline: true
		});

	jsonkey = new JSONKey({
			props: {
				key: "stack",
				colon: ":",
				isParentExpanded: /*isParentExpanded*/ ctx[3]
			},
			$$inline: true
		});

	let each_value = /*stack*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			create_component(jsonnode.$$.fragment);
			t0 = space();
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			claim_component(jsonnode.$$.fragment, nodes);
			t0 = claim_space(nodes);
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t1 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(span_nodes);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*value*/ 4) jsonnode_changes.value = /*value*/ ctx[2].message;
			jsonnode.$set(jsonnode_changes);
			const jsonkey_changes = {};
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			jsonkey.$set(jsonkey_changes);

			if (dirty & /*stack*/ 32) {
				each_value = /*stack*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(47:6) {#if expanded}",
		ctx
	});

	return block;
}

// (52:12) {#each stack as line, index}
function create_each_block$1(ctx) {
	let span;
	let t_value = /*line*/ ctx[8] + "";
	let t;
	let br;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			br = element("br");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			br = claim_element(nodes, "BR", {});
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-1ca3gb2");
			toggle_class(span, "indent", /*index*/ ctx[10] > 0);
			add_location(span, file$4, 52, 14, 1392);
			add_location(br, file$4, 52, 58, 1436);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
			insert_dev(target, br, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stack*/ 32 && t_value !== (t_value = /*line*/ ctx[8] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(br);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(52:12) {#each stack as line, index}",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let li;
	let t0;
	let jsonkey;
	let t1;
	let span;
	let t2;
	let t3_value = (/*expanded*/ ctx[0] ? "" : /*value*/ ctx[2].message) + "";
	let t3;
	let t4;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isParentExpanded*/ ctx[3] && create_if_block_2$1(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[1],
				colon: /*context*/ ctx[6].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	let if_block1 = /*isParentExpanded*/ ctx[3] && create_if_block$2(ctx);

	const block = {
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
			li = claim_element(nodes, "LI", { class: true });
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
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
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
				dispose = listen_dev(span, "click", /*toggleExpand*/ ctx[7], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
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

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 2) jsonkey_changes.key = /*key*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);
			if ((!current || dirty & /*expanded, value*/ 5) && t3_value !== (t3_value = (/*expanded*/ ctx[0] ? "" : /*value*/ ctx[2].message) + "")) set_data_dev(t3, t3_value);

			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
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

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
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
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon: ":" });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ErrorNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ErrorNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		context,
		toggleExpand,
		stack
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ("stack" in $$props) $$invalidate(5, stack = $$props.stack);
	};

	let stack;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 4) {
			 $$invalidate(5, stack = value.stack.split("\n"));
		}

		if ($$self.$$.dirty & /*isParentExpanded*/ 8) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}
	};

	return [
		expanded,
		key,
		value,
		isParentExpanded,
		isParentArray,
		stack,
		context,
		toggleExpand
	];
}

class ErrorNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			key: 1,
			value: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			expanded: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ErrorNode",
			options,
			id: create_fragment$9.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[1] === undefined && !("key" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[2] === undefined && !("value" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !("isParentExpanded" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !("isParentArray" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }
    return obj.constructor.name;
  }

  return type;
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNode.svelte generated by Svelte v3.24.0 */

function create_fragment$a(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*componentType*/ ctx[5];

	function switch_props(ctx) {
		return {
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				nodeType: /*nodeType*/ ctx[4],
				valueGetter: /*valueGetter*/ ctx[6]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
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
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*key*/ 1) switch_instance_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) switch_instance_changes.value = /*value*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 4) switch_instance_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) switch_instance_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*nodeType*/ 16) switch_instance_changes.nodeType = /*nodeType*/ ctx[4];
			if (dirty & /*valueGetter*/ 64) switch_instance_changes.valueGetter = /*valueGetter*/ ctx[6];

			if (switch_value !== (switch_value = /*componentType*/ ctx[5])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
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
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

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
				return typeof value.set === "function"
				? JSONIterableMapNode
				: JSONIterableArrayNode;
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
				return raw => `"${raw}"`;
			case "Boolean":
				return raw => raw ? "true" : "false";
			case "Date":
				return raw => raw.toISOString();
			case "Null":
				return () => "null";
			case "Undefined":
				return () => "undefined";
			case "Function":
			case "Symbol":
				return raw => raw.toString();
			default:
				return () => `<${nodeType}>`;
		}
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
	};

	$$self.$capture_state = () => ({
		JSONObjectNode,
		JSONArrayNode,
		JSONIterableArrayNode,
		JSONIterableMapNode,
		JSONMapEntryNode,
		JSONValueNode,
		ErrorNode,
		objType,
		key,
		value,
		isParentExpanded,
		isParentArray,
		getComponent,
		getValueGetter,
		nodeType,
		componentType,
		valueGetter
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(4, nodeType = $$props.nodeType);
		if ("componentType" in $$props) $$invalidate(5, componentType = $$props.componentType);
		if ("valueGetter" in $$props) $$invalidate(6, valueGetter = $$props.valueGetter);
	};

	let nodeType;
	let componentType;
	let valueGetter;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(4, nodeType = objType(value));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(5, componentType = getComponent(nodeType));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(6, valueGetter = getValueGetter(nodeType));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		componentType,
		valueGetter
	];
}

class JSONNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONNode",
			options,
			id: create_fragment$a.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte generated by Svelte v3.24.0 */
const file$5 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte";

function create_fragment$b(ctx) {
	let ul;
	let jsonnode;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: true,
				isParentArray: false
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			ul = element("ul");
			create_component(jsonnode.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
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
		p: function update(ctx, [dirty]) {
			const jsonnode_changes = {};
			if (dirty & /*key*/ 1) jsonnode_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) jsonnode_changes.value = /*value*/ ctx[1];
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
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	setContext(contextKey, {});
	let { key = "" } = $$props, { value } = $$props;
	const writable_props = ["key", "value"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Root> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Root", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	$$self.$capture_state = () => ({
		JSONNode,
		setContext,
		contextKey,
		key,
		value
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value];
}

class Root extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$b, create_fragment$b, safe_not_equal, { key: 0, value: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Root",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<Root> was created without expected prop 'value'");
		}
	}

	get key() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/app/components/Elements.svelte generated by Svelte v3.24.0 */

const file$6 = "src/node_modules/app/components/Elements.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i].tag;
	child_ctx[2] = list[i].content;
	return child_ctx;
}

// (8:25) 
function create_if_block_1$2(ctx) {
	let pre;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
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
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(8:25) ",
		ctx
	});

	return block;
}

// (6:1) {#if tag === 'p'}
function create_if_block$3(ctx) {
	let p;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
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
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(6:1) {#if tag === 'p'}",
		ctx
	});

	return block;
}

// (5:0) {#each elements as {tag, content}}
function create_each_block$2(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*tag*/ ctx[1] === "p") return create_if_block$3;
		if (/*tag*/ ctx[1] === "pre") return create_if_block_1$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
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
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(5:0) {#each elements as {tag, content}}",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let each_1_anchor;
	let each_value = /*elements*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*elements*/ 1) {
				each_value = /*elements*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { elements } = $$props;
	const writable_props = ["elements"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Elements> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Elements", $$slots, []);

	$$self.$set = $$props => {
		if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
	};

	$$self.$capture_state = () => ({ elements });

	$$self.$inject_state = $$props => {
		if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [elements];
}

class Elements extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { elements: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Elements",
			options,
			id: create_fragment$c.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*elements*/ ctx[0] === undefined && !("elements" in props)) {
			console.warn("<Elements> was created without expected prop 'elements'");
		}
	}

	get elements() {
		throw new Error("<Elements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set elements(value) {
		throw new Error("<Elements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function linear(domain, range) {
    var d0 = domain[0];
    var r0 = range[0];
    var m = (range[1] - r0) / (domain[1] - d0);
    return Object.assign(function (num) {
        return r0 + (num - d0) * m;
    }, {
        inverse: function () { return linear(range, domain); }
    });
}

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
const makeStyle = pipe([
	skipIf(isNil),
	pairs$1,
	mapWith(joinWithColon),
	joinWithSemicolon
]);

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
const makeStyleVars = pipe([
	skipIf(isNil),
	pairs$1,
	mapWith(pipe([joinWithColon, prepend('--')])),
	joinWithSemicolon
]);

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
const toPx = number => `${number}px`;

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte generated by Svelte v3.24.0 */

const file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[53] = list[i].color;
	child_ctx[54] = list[i].dasharray;
	child_ctx[55] = list[i].linewidth;
	child_ctx[56] = list[i].valueX;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[59] = list[i].barColor;
	child_ctx[60] = list[i].bkgColor;
	child_ctx[61] = list[i].deselected;
	child_ctx[62] = list[i].displayValue;
	child_ctx[63] = list[i].dxKey;
	child_ctx[64] = list[i].isNeg;
	child_ctx[65] = list[i].key;
	child_ctx[66] = list[i].label;
	child_ctx[56] = list[i].x;
	child_ctx[67] = list[i].xValue;
	child_ctx[69] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[53] = list[i].color;
	child_ctx[54] = list[i].dasharray;
	child_ctx[70] = list[i].isRight;
	child_ctx[66] = list[i].label;
	child_ctx[55] = list[i].linewidth;
	child_ctx[71] = list[i].rectWidth;
	child_ctx[72] = list[i].textLength;
	child_ctx[73] = list[i].textX;
	child_ctx[74] = list[i].valueX;
	child_ctx[56] = list[i].x;
	child_ctx[75] = list[i].y;
	return child_ctx;
}

// (228:1) {#if title}
function create_if_block_3$1(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[4]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[4]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-18pi9lw");
			add_location(h2, file$7, 229, 2, 5431);
			attr_dev(header, "class", "svelte-18pi9lw");
			add_location(header, file$7, 228, 1, 5420);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*title*/ 16) set_data_dev(t, /*title*/ ctx[4]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(228:1) {#if title}",
		ctx
	});

	return block;
}

// (235:2) {#if refs}
function create_if_block_2$2(ctx) {
	let div;
	let svg;
	let each_value_2 = /*refsLayout*/ ctx[19];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_element(div_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(svg_nodes);
			}

			svg_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[7]);
			attr_dev(svg, "height", /*refsHeight*/ ctx[10]);
			add_location(svg, file$7, 236, 3, 5555);
			attr_dev(div, "class", "refs svelte-18pi9lw");
			add_location(div, file$7, 235, 2, 5533);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme, refHeight, refsHeight*/ 787460) {
				each_value_2 = /*refsLayout*/ ctx[19];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}

			if (dirty[0] & /*width*/ 128) {
				attr_dev(svg, "width", /*width*/ ctx[7]);
			}

			if (dirty[0] & /*refsHeight*/ 1024) {
				attr_dev(svg, "height", /*refsHeight*/ ctx[10]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(235:2) {#if refs}",
		ctx
	});

	return block;
}

// (238:4) {#each refsLayout as {      color,      dasharray,      isRight,      label,      linewidth,      rectWidth,      textLength,      textX,      valueX,      x,      y,     }}
function create_each_block_2(ctx) {
	let g;
	let rect;
	let rect_x_value;
	let rect_width_value;
	let text_1;
	let t_value = /*label*/ ctx[66] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;
	let text_1_textLength_value;
	let line;
	let line_stroke_value;
	let line_stroke_dasharray_value;
	let line_stroke_width_value;
	let line_y__value;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			text_1 = svg_element("text");
			t = text(t_value);
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);

			rect = claim_element(
				g_nodes,
				"rect",
				{
					x: true,
					width: true,
					height: true,
					class: true
				},
				1
			);

			children(rect).forEach(detach_dev);

			text_1 = claim_element(
				g_nodes,
				"text",
				{
					x: true,
					y: true,
					textLength: true,
					class: true
				},
				1
			);

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);

			line = claim_element(
				g_nodes,
				"line",
				{
					class: true,
					stroke: true,
					"stroke-dasharray": true,
					"stroke-width": true,
					y1: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", rect_x_value = /*x*/ ctx[56]);
			attr_dev(rect, "width", rect_width_value = /*rectWidth*/ ctx[71]);
			attr_dev(rect, "height", /*refHeight*/ ctx[18]);
			attr_dev(rect, "class", "svelte-18pi9lw");
			add_location(rect, file$7, 254, 5, 5844);
			attr_dev(text_1, "x", text_1_x_value = /*textX*/ ctx[73]);
			attr_dev(text_1, "y", text_1_y_value = /*refHeight*/ ctx[18] / 2);
			attr_dev(text_1, "textLength", text_1_textLength_value = /*textLength*/ ctx[72]);
			attr_dev(text_1, "class", "svelte-18pi9lw");
			toggle_class(text_1, "right", /*isRight*/ ctx[70]);
			add_location(text_1, file$7, 259, 5, 5922);
			attr_dev(line, "class", "ref");
			attr_dev(line, "stroke", line_stroke_value = /*color*/ ctx[53] || /*theme*/ ctx[2].refColor);
			attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ ctx[54] || /*theme*/ ctx[2].refDasharray);
			attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ ctx[55] || /*theme*/ ctx[2].refWidth);
			attr_dev(line, "y1", /*refHeight*/ ctx[18]);
			attr_dev(line, "y2", line_y__value = /*refsHeight*/ ctx[10] - /*y*/ ctx[75]);
			add_location(line, file$7, 265, 5, 6041);
			attr_dev(g, "class", "ref svelte-18pi9lw");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*valueX*/ ctx[74] + ", " + /*y*/ ctx[75] + ")");
			add_location(g, file$7, 250, 4, 5771);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			append_dev(g, text_1);
			append_dev(text_1, t);
			append_dev(g, line);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout*/ 524288 && rect_x_value !== (rect_x_value = /*x*/ ctx[56])) {
				attr_dev(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && rect_width_value !== (rect_width_value = /*rectWidth*/ ctx[71])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*refHeight*/ 262144) {
				attr_dev(rect, "height", /*refHeight*/ ctx[18]);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && t_value !== (t_value = /*label*/ ctx[66] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*refsLayout*/ 524288 && text_1_x_value !== (text_1_x_value = /*textX*/ ctx[73])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*refHeight*/ 262144 && text_1_y_value !== (text_1_y_value = /*refHeight*/ ctx[18] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && text_1_textLength_value !== (text_1_textLength_value = /*textLength*/ ctx[72])) {
				attr_dev(text_1, "textLength", text_1_textLength_value);
			}

			if (dirty[0] & /*refsLayout*/ 524288) {
				toggle_class(text_1, "right", /*isRight*/ ctx[70]);
			}

			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_value !== (line_stroke_value = /*color*/ ctx[53] || /*theme*/ ctx[2].refColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ ctx[54] || /*theme*/ ctx[2].refDasharray)) {
				attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ ctx[55] || /*theme*/ ctx[2].refWidth)) {
				attr_dev(line, "stroke-width", line_stroke_width_value);
			}

			if (dirty[0] & /*refHeight*/ 262144) {
				attr_dev(line, "y1", /*refHeight*/ ctx[18]);
			}

			if (dirty[0] & /*refsHeight, refsLayout*/ 525312 && line_y__value !== (line_y__value = /*refsHeight*/ ctx[10] - /*y*/ ctx[75])) {
				attr_dev(line, "y2", line_y__value);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && g_transform_value !== (g_transform_value = "translate(" + /*valueX*/ ctx[74] + ", " + /*y*/ ctx[75] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(238:4) {#each refsLayout as {      color,      dasharray,      isRight,      label,      linewidth,      rectWidth,      textLength,      textX,      valueX,      x,      y,     }}",
		ctx
	});

	return block;
}

// (293:5) {#each bars as {       barColor,       bkgColor,       deselected,       displayValue,       dxKey,       isNeg,       key,       label,       x,       xValue,      }
function create_each_block_1(key_1, ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let line;
	let line_stroke_value;
	let line_x__value;
	let text0;
	let t0_value = /*label*/ ctx[66] + "";
	let t0;
	let text0_dx_value;
	let text1;
	let t1_value = /*displayValue*/ ctx[62] + "";
	let t1;
	let text1_x_value;
	let g_transform_value;
	let mounted;
	let dispose;

	const block = {
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
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);
			rect = claim_element(g_nodes, "rect", { width: true, fill: true, height: true }, 1);
			children(rect).forEach(detach_dev);

			line = claim_element(
				g_nodes,
				"line",
				{
					stroke: true,
					"stroke-width": true,
					x1: true,
					x2: true,
					y1: true,
					y2: true,
					class: true
				},
				1
			);

			children(line).forEach(detach_dev);
			text0 = claim_element(g_nodes, "text", { class: true, dx: true, x: true, y: true }, 1);
			var text0_nodes = children(text0);
			t0 = claim_text(text0_nodes, t0_value);
			text0_nodes.forEach(detach_dev);
			text1 = claim_element(g_nodes, "text", { class: true, x: true, y: true }, 1);
			var text1_nodes = children(text1);
			t1 = claim_text(text1_nodes, t1_value);
			text1_nodes.forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "width", /*width*/ ctx[7]);
			attr_dev(rect, "fill", rect_fill_value = /*bkgColor*/ ctx[60]);
			attr_dev(rect, "height", /*itemHeight*/ ctx[11]);
			add_location(rect, file$7, 313, 6, 7115);
			attr_dev(line, "stroke", line_stroke_value = /*barColor*/ ctx[59]);
			attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			attr_dev(line, "x1", /*x0*/ ctx[16]);
			attr_dev(line, "x2", line_x__value = /*x*/ ctx[56]);
			attr_dev(line, "y1", /*barY*/ ctx[12]);
			attr_dev(line, "y2", /*barY*/ ctx[12]);
			attr_dev(line, "class", "svelte-18pi9lw");
			add_location(line, file$7, 318, 6, 7201);
			attr_dev(text0, "class", "key svelte-18pi9lw");
			attr_dev(text0, "dx", text0_dx_value = /*dxKey*/ ctx[63]);
			attr_dev(text0, "x", /*x0*/ ctx[16]);
			attr_dev(text0, "y", /*textY*/ ctx[13]);
			toggle_class(text0, "neg", /*isNeg*/ ctx[64]);
			add_location(text0, file$7, 326, 6, 7342);
			attr_dev(text1, "class", "value svelte-18pi9lw");
			attr_dev(text1, "x", text1_x_value = /*xValue*/ ctx[67]);
			attr_dev(text1, "y", /*textY*/ ctx[13]);
			toggle_class(text1, "neg", /*isNeg*/ ctx[64]);
			add_location(text1, file$7, 333, 6, 7469);
			attr_dev(g, "class", "item svelte-18pi9lw");
			attr_dev(g, "transform", g_transform_value = "translate(0, " + /*itemHeight*/ ctx[11] * /*index*/ ctx[69] + ")");
			toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
			toggle_class(g, "deselected", /*deselected*/ ctx[61]);
			add_location(g, file$7, 304, 5, 6822);
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
				dispose = [
					listen_dev(
						g,
						"click",
						function () {
							if (is_function(/*isInteractive*/ ctx[1] && /*onClick*/ ctx[20](/*key*/ ctx[65]))) (/*isInteractive*/ ctx[1] && /*onClick*/ ctx[20](/*key*/ ctx[65])).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseenter",
						function () {
							if (is_function(/*onMouseenter*/ ctx[21](/*key*/ ctx[65]))) /*onMouseenter*/ ctx[21](/*key*/ ctx[65]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseleave",
						function () {
							if (is_function(/*isInteractive*/ ctx[1] && /*onMouseleave*/ ctx[22](/*key*/ ctx[65]))) (/*isInteractive*/ ctx[1] && /*onMouseleave*/ ctx[22](/*key*/ ctx[65])).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*width*/ 128) {
				attr_dev(rect, "width", /*width*/ ctx[7]);
			}

			if (dirty[0] & /*bars*/ 131072 && rect_fill_value !== (rect_fill_value = /*bkgColor*/ ctx[60])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*itemHeight*/ 2048) {
				attr_dev(rect, "height", /*itemHeight*/ ctx[11]);
			}

			if (dirty[0] & /*bars*/ 131072 && line_stroke_value !== (line_stroke_value = /*barColor*/ ctx[59])) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*barHeight*/ 1) {
				attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			}

			if (dirty[0] & /*x0*/ 65536) {
				attr_dev(line, "x1", /*x0*/ ctx[16]);
			}

			if (dirty[0] & /*bars*/ 131072 && line_x__value !== (line_x__value = /*x*/ ctx[56])) {
				attr_dev(line, "x2", line_x__value);
			}

			if (dirty[0] & /*barY*/ 4096) {
				attr_dev(line, "y1", /*barY*/ ctx[12]);
			}

			if (dirty[0] & /*barY*/ 4096) {
				attr_dev(line, "y2", /*barY*/ ctx[12]);
			}

			if (dirty[0] & /*bars*/ 131072 && t0_value !== (t0_value = /*label*/ ctx[66] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*bars*/ 131072 && text0_dx_value !== (text0_dx_value = /*dxKey*/ ctx[63])) {
				attr_dev(text0, "dx", text0_dx_value);
			}

			if (dirty[0] & /*x0*/ 65536) {
				attr_dev(text0, "x", /*x0*/ ctx[16]);
			}

			if (dirty[0] & /*textY*/ 8192) {
				attr_dev(text0, "y", /*textY*/ ctx[13]);
			}

			if (dirty[0] & /*bars*/ 131072) {
				toggle_class(text0, "neg", /*isNeg*/ ctx[64]);
			}

			if (dirty[0] & /*bars*/ 131072 && t1_value !== (t1_value = /*displayValue*/ ctx[62] + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*bars*/ 131072 && text1_x_value !== (text1_x_value = /*xValue*/ ctx[67])) {
				attr_dev(text1, "x", text1_x_value);
			}

			if (dirty[0] & /*textY*/ 8192) {
				attr_dev(text1, "y", /*textY*/ ctx[13]);
			}

			if (dirty[0] & /*bars*/ 131072) {
				toggle_class(text1, "neg", /*isNeg*/ ctx[64]);
			}

			if (dirty[0] & /*itemHeight, bars*/ 133120 && g_transform_value !== (g_transform_value = "translate(0, " + /*itemHeight*/ ctx[11] * /*index*/ ctx[69] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}

			if (dirty[0] & /*isInteractive*/ 2) {
				toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
			}

			if (dirty[0] & /*bars*/ 131072) {
				toggle_class(g, "deselected", /*deselected*/ ctx[61]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(293:5) {#each bars as {       barColor,       bkgColor,       deselected,       displayValue,       dxKey,       isNeg,       key,       label,       x,       xValue,      }",
		ctx
	});

	return block;
}

// (345:4) {#if crossesZero}
function create_if_block_1$3(ctx) {
	let line;
	let line_stroke_value;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					stroke: true,
					x1: true,
					x2: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "stroke", line_stroke_value = /*theme*/ ctx[2].axisColor);
			attr_dev(line, "x1", /*x0*/ ctx[16]);
			attr_dev(line, "x2", /*x0*/ ctx[16]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[14]);
			add_location(line, file$7, 345, 4, 7662);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*theme*/ 4 && line_stroke_value !== (line_stroke_value = /*theme*/ ctx[2].axisColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*x0*/ 65536) {
				attr_dev(line, "x1", /*x0*/ ctx[16]);
			}

			if (dirty[0] & /*x0*/ 65536) {
				attr_dev(line, "x2", /*x0*/ ctx[16]);
			}

			if (dirty[0] & /*svgHeight*/ 16384) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[14]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(345:4) {#if crossesZero}",
		ctx
	});

	return block;
}

// (355:4) {#if refsLayout}
function create_if_block$4(ctx) {
	let each_1_anchor;
	let each_value = /*refsLayout*/ ctx[19];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme, svgHeight*/ 540676) {
				each_value = /*refsLayout*/ ctx[19];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(355:4) {#if refsLayout}",
		ctx
	});

	return block;
}

// (356:4) {#each refsLayout as {      color,      dasharray,      linewidth,      valueX: x,     }}
function create_each_block$3(ctx) {
	let line;
	let line_stroke_value;
	let line_stroke_dasharray_value;
	let line_stroke_width_value;
	let line_x__value;
	let line_x__value_1;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					class: true,
					stroke: true,
					"stroke-dasharray": true,
					"stroke-width": true,
					x1: true,
					x2: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "class", "ref");
			attr_dev(line, "stroke", line_stroke_value = /*color*/ ctx[53] || /*theme*/ ctx[2].refColor);
			attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ ctx[54] || /*theme*/ ctx[2].refDasharray);
			attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ ctx[55] || /*theme*/ ctx[2].refWidth);
			attr_dev(line, "x1", line_x__value = /*x*/ ctx[56]);
			attr_dev(line, "x2", line_x__value_1 = /*x*/ ctx[56]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[14]);
			add_location(line, file$7, 361, 4, 7905);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_value !== (line_stroke_value = /*color*/ ctx[53] || /*theme*/ ctx[2].refColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ ctx[54] || /*theme*/ ctx[2].refDasharray)) {
				attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 524292 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ ctx[55] || /*theme*/ ctx[2].refWidth)) {
				attr_dev(line, "stroke-width", line_stroke_width_value);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && line_x__value !== (line_x__value = /*x*/ ctx[56])) {
				attr_dev(line, "x1", line_x__value);
			}

			if (dirty[0] & /*refsLayout*/ 524288 && line_x__value_1 !== (line_x__value_1 = /*x*/ ctx[56])) {
				attr_dev(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*svgHeight*/ 16384) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[14]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(356:4) {#each refsLayout as {      color,      dasharray,      linewidth,      valueX: x,     }}",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let div1;
	let t0;
	let main;
	let t1;
	let div0;
	let svg;
	let rect;
	let g;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let if_block2_anchor;
	let div0_resize_listener;
	let mounted;
	let dispose;
	let if_block0 = /*title*/ ctx[4] && create_if_block_3$1(ctx);
	let if_block1 = /*refs*/ ctx[3] && create_if_block_2$2(ctx);
	let each_value_1 = /*bars*/ ctx[17];
	validate_each_argument(each_value_1);
	const get_key = ctx => /*key*/ ctx[65];
	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	let if_block2 = /*crossesZero*/ ctx[15] && create_if_block_1$3(ctx);
	let if_block3 = /*refsLayout*/ ctx[19] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			main = element("main");
			if (if_block1) if_block1.c();
			t1 = space();
			div0 = element("div");
			svg = svg_element("svg");
			rect = svg_element("rect");
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { style: true, class: true });
			var div1_nodes = children(div1);
			if (if_block0) if_block0.l(div1_nodes);
			t0 = claim_space(div1_nodes);
			main = claim_element(div1_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if (if_block1) if_block1.l(main_nodes);
			t1 = claim_space(main_nodes);
			div0 = claim_element(main_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			svg = claim_element(div0_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);
			rect = claim_element(svg_nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			g = claim_element(svg_nodes, "g", {}, 1);
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			if (if_block2) if_block2.l(svg_nodes);
			if_block2_anchor = empty();
			if (if_block3) if_block3.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "bkg svelte-18pi9lw");
			attr_dev(rect, "width", /*width*/ ctx[7]);
			attr_dev(rect, "height", /*svgHeight*/ ctx[14]);
			add_location(rect, file$7, 288, 4, 6556);
			add_location(g, file$7, 291, 4, 6627);
			attr_dev(svg, "width", /*width*/ ctx[7]);
			attr_dev(svg, "height", /*svgHeight*/ ctx[14]);
			add_location(svg, file$7, 287, 3, 6519);
			attr_dev(div0, "class", "scrollable svelte-18pi9lw");
			add_render_callback(() => /*div0_elementresize_handler*/ ctx[34].call(div0));
			toggle_class(div0, "withrefs", /*refs*/ ctx[3] && /*refs*/ ctx[3].length);
			add_location(div0, file$7, 279, 2, 6316);
			attr_dev(main, "class", "svelte-18pi9lw");
			toggle_class(main, "titled", /*title*/ ctx[4]);
			add_location(main, file$7, 232, 1, 5467);
			attr_dev(div1, "style", /*style*/ ctx[9]);
			attr_dev(div1, "class", "BarchartVDiv svelte-18pi9lw");
			add_location(div1, file$7, 223, 0, 5368);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			if (if_block0) if_block0.m(div1, null);
			append_dev(div1, t0);
			append_dev(div1, main);
			if (if_block1) if_block1.m(main, null);
			append_dev(main, t1);
			append_dev(main, div0);
			append_dev(div0, svg);
			append_dev(svg, rect);
			append_dev(svg, g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			if (if_block2) if_block2.m(svg, null);
			append_dev(svg, if_block2_anchor);
			if (if_block3) if_block3.m(svg, null);
			div0_resize_listener = add_resize_listener(div0, /*div0_elementresize_handler*/ ctx[34].bind(div0));
			/*div0_binding*/ ctx[35](div0);

			if (!mounted) {
				dispose = listen_dev(div0, "mouseleave", /*mouseleave_handler*/ ctx[36], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*title*/ ctx[4]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					if_block0.m(div1, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*refs*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$2(ctx);
					if_block1.c();
					if_block1.m(main, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*width*/ 128) {
				attr_dev(rect, "width", /*width*/ ctx[7]);
			}

			if (dirty[0] & /*svgHeight*/ 16384) {
				attr_dev(rect, "height", /*svgHeight*/ ctx[14]);
			}

			if (dirty[0] & /*itemHeight, bars, isInteractive, onClick, onMouseenter, onMouseleave, textY, x0, barHeight, barY, width*/ 7551107) {
				const each_value_1 = /*bars*/ ctx[17];
				validate_each_argument(each_value_1);
				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, g, destroy_block, create_each_block_1, null, get_each_context_1);
			}

			if (/*crossesZero*/ ctx[15]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_1$3(ctx);
					if_block2.c();
					if_block2.m(svg, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*refsLayout*/ ctx[19]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block$4(ctx);
					if_block3.c();
					if_block3.m(svg, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*width*/ 128) {
				attr_dev(svg, "width", /*width*/ ctx[7]);
			}

			if (dirty[0] & /*svgHeight*/ 16384) {
				attr_dev(svg, "height", /*svgHeight*/ ctx[14]);
			}

			if (dirty[0] & /*refs*/ 8) {
				toggle_class(div0, "withrefs", /*refs*/ ctx[3] && /*refs*/ ctx[3].length);
			}

			if (dirty[0] & /*title*/ 16) {
				toggle_class(main, "titled", /*title*/ ctx[4]);
			}

			if (dirty[0] & /*style*/ 512) {
				attr_dev(div1, "style", /*style*/ ctx[9]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			div0_resize_listener();
			/*div0_binding*/ ctx[35](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const transparentColor = "rgba(0,0,0,0)";

function instance$d($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	const sortByValue = sortWith([getValue]);
	const augmentTheme = makeMergeAppliedFnMap({ paddingPx: pipe([x => x.padding, toPx]) });

	const defaultTheme = {
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
		padding: 10,
		refColor: "grey",
		refDasharray: "4 4",
		refWidth: 0.5,
		textColor: "grey",
		titleFontSize: "1.5em"
	};

	let { barHeight } = $$props;
	let { focusedKey } = $$props;
	let { formatFn } = $$props;
	let { isInteractive } = $$props;
	let { items } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { keyToLabel } = $$props;
	let { keyToLabelFn } = $$props;
	let { refs } = $$props;
	let { shouldResetScroll } = $$props;
	let { selectedKeys } = $$props;
	let { shouldScrollToFocusedKey } = $$props;
	let { theme } = $$props;
	let { title } = $$props;
	let { valueAccessor } = $$props;
	let height;
	let hoveredKey;
	let width;

	/* scroll */
	let previousItems;

	let scrollable;
	let wasNotResettingScroll;

	beforeUpdate(() => {
		$$invalidate(38, wasNotResettingScroll = !shouldResetScroll);
	});

	/* events */
	const onClick = key => () => {
		dispatch("clicked", { id: key });
	};

	const onMouseenter = key => () => {
		$$invalidate(6, hoveredKey = key);
		isInteractive && dispatch("entered", { id: key });
	};

	const onMouseleave = key => () => {
		dispatch("exited", { id: key });
	};

	const writable_props = [
		"barHeight",
		"focusedKey",
		"formatFn",
		"isInteractive",
		"items",
		"keyToColor",
		"keyToColorFn",
		"keyToLabel",
		"keyToLabelFn",
		"refs",
		"shouldResetScroll",
		"selectedKeys",
		"shouldScrollToFocusedKey",
		"theme",
		"title",
		"valueAccessor"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BarchartVDiv> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("BarchartVDiv", $$slots, []);

	function div0_elementresize_handler() {
		height = this.clientHeight;
		width = this.clientWidth;
		$$invalidate(5, height);
		$$invalidate(7, width);
	}

	function div0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			scrollable = $$value;
			(((($$invalidate(8, scrollable), $$invalidate(28, items)), $$invalidate(23, shouldResetScroll)), $$invalidate(37, previousItems)), $$invalidate(38, wasNotResettingScroll));
		});
	}

	const mouseleave_handler = () => {
		$$invalidate(6, hoveredKey = null);
	};

	$$self.$set = $$props => {
		if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(26, focusedKey = $$props.focusedKey);
		if ("formatFn" in $$props) $$invalidate(27, formatFn = $$props.formatFn);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(28, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(29, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(30, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(31, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(32, keyToLabelFn = $$props.keyToLabelFn);
		if ("refs" in $$props) $$invalidate(3, refs = $$props.refs);
		if ("shouldResetScroll" in $$props) $$invalidate(23, shouldResetScroll = $$props.shouldResetScroll);
		if ("selectedKeys" in $$props) $$invalidate(24, selectedKeys = $$props.selectedKeys);
		if ("shouldScrollToFocusedKey" in $$props) $$invalidate(33, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
		if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
		if ("title" in $$props) $$invalidate(4, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(25, valueAccessor = $$props.valueAccessor);
	};

	$$self.$capture_state = () => ({
		isEqual: justCompare,
		index,
		isIn,
		mapWith,
		pipe,
		sortWith,
		afterUpdate,
		beforeUpdate,
		createEventDispatcher,
		linearScale: linear,
		makeStyleVars,
		toPx,
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		makeMergeAppliedFnMap,
		dispatch,
		sortByValue,
		transparentColor,
		augmentTheme,
		defaultTheme,
		barHeight,
		focusedKey,
		formatFn,
		isInteractive,
		items,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		refs,
		shouldResetScroll,
		selectedKeys,
		shouldScrollToFocusedKey,
		theme,
		title,
		valueAccessor,
		height,
		hoveredKey,
		width,
		previousItems,
		scrollable,
		wasNotResettingScroll,
		onClick,
		onMouseenter,
		onMouseleave,
		style,
		refsHeight,
		barPadding,
		itemHeight,
		barY,
		textY,
		svgHeight,
		getMin,
		getMax,
		min,
		max,
		crossesZero,
		domain,
		getX,
		x0,
		bars,
		barsByKey,
		makeRefsLayout,
		refHeight,
		refsLayout,
		focusedY
	});

	$$self.$inject_state = $$props => {
		if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(26, focusedKey = $$props.focusedKey);
		if ("formatFn" in $$props) $$invalidate(27, formatFn = $$props.formatFn);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(28, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(29, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(30, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(31, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(32, keyToLabelFn = $$props.keyToLabelFn);
		if ("refs" in $$props) $$invalidate(3, refs = $$props.refs);
		if ("shouldResetScroll" in $$props) $$invalidate(23, shouldResetScroll = $$props.shouldResetScroll);
		if ("selectedKeys" in $$props) $$invalidate(24, selectedKeys = $$props.selectedKeys);
		if ("shouldScrollToFocusedKey" in $$props) $$invalidate(33, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
		if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
		if ("title" in $$props) $$invalidate(4, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(25, valueAccessor = $$props.valueAccessor);
		if ("height" in $$props) $$invalidate(5, height = $$props.height);
		if ("hoveredKey" in $$props) $$invalidate(6, hoveredKey = $$props.hoveredKey);
		if ("width" in $$props) $$invalidate(7, width = $$props.width);
		if ("previousItems" in $$props) $$invalidate(37, previousItems = $$props.previousItems);
		if ("scrollable" in $$props) $$invalidate(8, scrollable = $$props.scrollable);
		if ("wasNotResettingScroll" in $$props) $$invalidate(38, wasNotResettingScroll = $$props.wasNotResettingScroll);
		if ("style" in $$props) $$invalidate(9, style = $$props.style);
		if ("refsHeight" in $$props) $$invalidate(10, refsHeight = $$props.refsHeight);
		if ("barPadding" in $$props) $$invalidate(39, barPadding = $$props.barPadding);
		if ("itemHeight" in $$props) $$invalidate(11, itemHeight = $$props.itemHeight);
		if ("barY" in $$props) $$invalidate(12, barY = $$props.barY);
		if ("textY" in $$props) $$invalidate(13, textY = $$props.textY);
		if ("svgHeight" in $$props) $$invalidate(14, svgHeight = $$props.svgHeight);
		if ("getMin" in $$props) $$invalidate(40, getMin = $$props.getMin);
		if ("getMax" in $$props) $$invalidate(41, getMax = $$props.getMax);
		if ("min" in $$props) $$invalidate(42, min = $$props.min);
		if ("max" in $$props) $$invalidate(43, max = $$props.max);
		if ("crossesZero" in $$props) $$invalidate(15, crossesZero = $$props.crossesZero);
		if ("domain" in $$props) $$invalidate(44, domain = $$props.domain);
		if ("getX" in $$props) $$invalidate(45, getX = $$props.getX);
		if ("x0" in $$props) $$invalidate(16, x0 = $$props.x0);
		if ("bars" in $$props) $$invalidate(17, bars = $$props.bars);
		if ("barsByKey" in $$props) $$invalidate(46, barsByKey = $$props.barsByKey);
		if ("makeRefsLayout" in $$props) $$invalidate(47, makeRefsLayout = $$props.makeRefsLayout);
		if ("refHeight" in $$props) $$invalidate(18, refHeight = $$props.refHeight);
		if ("refsLayout" in $$props) $$invalidate(19, refsLayout = $$props.refsLayout);
		if ("focusedY" in $$props) $$invalidate(48, focusedY = $$props.focusedY);
	};

	let style;
	let barPadding;
	let itemHeight;
	let barY;
	let textY;
	let svgHeight;
	let getMin;
	let getMax;
	let min;
	let max;
	let crossesZero;
	let domain;
	let getX;
	let x0;
	let bars;
	let barsByKey;
	let makeRefsLayout;
	let refsLayout;
	let refHeight;
	let refsHeight;
	let focusedY;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*barHeight*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(0, barHeight = barHeight || 4);
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 2) {
			 $$invalidate(1, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 16777216) {
			 $$invalidate(24, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll*/ 8388608) {
			 $$invalidate(23, shouldResetScroll = shouldResetScroll || false);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(2, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(18, refHeight = theme.padding + theme.fontSize);
		}

		if ($$self.$$.dirty[0] & /*refs, theme, refHeight*/ 262156) {
			 $$invalidate(10, refsHeight = refs && refs.length * (theme.padding + refHeight) + theme.padding || 0);
		}

		if ($$self.$$.dirty[0] & /*theme, refsHeight*/ 1028) {
			 $$invalidate(9, style = makeStyleVars({
				...augmentTheme(theme),
				refsHeightPx: toPx(refsHeight)
			}));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 33554432) {
			 $$invalidate(25, valueAccessor = valueAccessor || getValue);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(39, barPadding = theme.fontSize / 2);
		}

		if ($$self.$$.dirty[0] & /*theme, barHeight*/ 5 | $$self.$$.dirty[1] & /*barPadding*/ 256) {
			 $$invalidate(11, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 2049 | $$self.$$.dirty[1] & /*barPadding*/ 256) {
			 $$invalidate(12, barY = itemHeight - barPadding - barHeight / 2);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 2049 | $$self.$$.dirty[1] & /*barPadding*/ 256) {
			 $$invalidate(13, textY = itemHeight - barHeight - 2 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, items*/ 268437504) {
			 $$invalidate(14, svgHeight = itemHeight * items.length);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 33554432) {
			 $$invalidate(40, getMin = arrayMinWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 33554432) {
			 $$invalidate(41, getMax = arrayMaxWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*items*/ 268435456 | $$self.$$.dirty[1] & /*getMin*/ 512) {
			 $$invalidate(42, min = getMin(items));
		}

		if ($$self.$$.dirty[0] & /*items*/ 268435456 | $$self.$$.dirty[1] & /*getMax*/ 1024) {
			 $$invalidate(43, max = getMax(items));
		}

		if ($$self.$$.dirty[1] & /*min, max*/ 6144) {
			 $$invalidate(15, crossesZero = Math.sign(min) === -Math.sign(max));
		}

		if ($$self.$$.dirty[0] & /*crossesZero*/ 32768 | $$self.$$.dirty[1] & /*min, max*/ 6144) {
			 $$invalidate(44, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
		}

		if ($$self.$$.dirty[0] & /*width*/ 128 | $$self.$$.dirty[1] & /*domain*/ 8192) {
			 $$invalidate(45, getX = linear(domain, [0, width]));
		}

		if ($$self.$$.dirty[1] & /*getX*/ 16384) {
			 $$invalidate(16, x0 = getX(0));
		}

		if ($$self.$$.dirty[0] & /*items, valueAccessor, keyToColor, theme, keyToColorFn, focusedKey, hoveredKey, formatFn, crossesZero, selectedKeys, width, itemHeight*/ 2130741444 | $$self.$$.dirty[1] & /*barPadding, keyToLabel, keyToLabelFn, getX*/ 16643) {
			 $$invalidate(17, bars = items.map((item, idx) => {
				const value = valueAccessor(item);
				const isNeg = value < 0;

				return {
					...item,
					...{
						barColor: keyToColor
						? keyToColor[item.key] || theme.barDefaultColor
						: keyToColorFn
							? keyToColorFn(item.key)
							: theme.barDefaultColor,
						bkgColor: item.key === focusedKey
						? theme.focusedKeyColor
						: item.key === hoveredKey
							? theme.hoverColor
							: transparentColor,
						displayValue: formatFn ? formatFn(value) : value,
						dxKey: crossesZero ? isNeg ? -barPadding : barPadding : 0,
						isNeg,
						label: keyToLabel && keyToLabel[item.key]
						? keyToLabel[item.key]
						: keyToLabelFn ? keyToLabelFn(item.key) : item.key,
						deselected: selectedKeys.length && !isIn(selectedKeys, item.key),
						x: getX(value),
						xValue: value > 0 ? width : 0,
						y: (idx + 1) * itemHeight, // bottom of the item rect
						
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*bars*/ 131072) {
			 $$invalidate(46, barsByKey = index(bars, getKey));
		}

		if ($$self.$$.dirty[0] & /*theme, width, refHeight*/ 262276 | $$self.$$.dirty[1] & /*getX*/ 16384) {
			 $$invalidate(47, makeRefsLayout = pipe([
				sortByValue,
				mapWith((obj, idx) => {
					const label = `${obj.key} (${obj.value})`;
					const textLength = obj.key.length * theme.fontSize * 0.6;
					const rectWidth = textLength + 2 * theme.padding;
					const valueX = getX(obj.value);
					const isRight = valueX + rectWidth > width;

					return {
						...obj,
						isRight,
						label,
						rectWidth,
						textLength,
						textX: isRight ? -theme.padding : theme.padding,
						valueX,
						x: isRight ? -rectWidth : 0,
						y: theme.padding + idx * (theme.padding + refHeight)
					};
				})
			]));
		}

		if ($$self.$$.dirty[0] & /*refs*/ 8 | $$self.$$.dirty[1] & /*makeRefsLayout*/ 65536) {
			 $$invalidate(19, refsLayout = refs && refs.length && makeRefsLayout(refs));
		}

		if ($$self.$$.dirty[0] & /*items, shouldResetScroll*/ 276824064 | $$self.$$.dirty[1] & /*previousItems*/ 64) {
			 afterUpdate(() => {
				if (items && shouldResetScroll && !justCompare(previousItems, items)) {
					$$invalidate(8, scrollable.scrollTop = 0, scrollable);
					$$invalidate(37, previousItems = items);
				}
			});
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll, scrollable*/ 8388864 | $$self.$$.dirty[1] & /*wasNotResettingScroll*/ 128) {
			 if (wasNotResettingScroll && shouldResetScroll && scrollable) {
				$$invalidate(8, scrollable.scrollTop = 0, scrollable);
			}
		}

		if ($$self.$$.dirty[0] & /*focusedKey*/ 67108864 | $$self.$$.dirty[1] & /*shouldScrollToFocusedKey, barsByKey*/ 32772) {
			 $$invalidate(48, focusedY = shouldScrollToFocusedKey && focusedKey && barsByKey[focusedKey] && barsByKey[focusedKey].y);
		}

		if ($$self.$$.dirty[0] & /*focusedKey, scrollable, itemHeight, height*/ 67111200 | $$self.$$.dirty[1] & /*shouldScrollToFocusedKey, focusedY*/ 131076) {
			 if (shouldScrollToFocusedKey && focusedKey && scrollable) {
				const yAbs = -scrollable.scrollTop + focusedY;

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

	return [
		barHeight,
		isInteractive,
		theme,
		refs,
		title,
		height,
		hoveredKey,
		width,
		scrollable,
		style,
		refsHeight,
		itemHeight,
		barY,
		textY,
		svgHeight,
		crossesZero,
		x0,
		bars,
		refHeight,
		refsLayout,
		onClick,
		onMouseenter,
		onMouseleave,
		shouldResetScroll,
		selectedKeys,
		valueAccessor,
		focusedKey,
		formatFn,
		items,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		shouldScrollToFocusedKey,
		div0_elementresize_handler,
		div0_binding,
		mouseleave_handler
	];
}

class BarchartVDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$d,
			create_fragment$d,
			safe_not_equal,
			{
				barHeight: 0,
				focusedKey: 26,
				formatFn: 27,
				isInteractive: 1,
				items: 28,
				keyToColor: 29,
				keyToColorFn: 30,
				keyToLabel: 31,
				keyToLabelFn: 32,
				refs: 3,
				shouldResetScroll: 23,
				selectedKeys: 24,
				shouldScrollToFocusedKey: 33,
				theme: 2,
				title: 4,
				valueAccessor: 25
			},
			[-1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BarchartVDiv",
			options,
			id: create_fragment$d.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*barHeight*/ ctx[0] === undefined && !("barHeight" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'barHeight'");
		}

		if (/*focusedKey*/ ctx[26] === undefined && !("focusedKey" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'focusedKey'");
		}

		if (/*formatFn*/ ctx[27] === undefined && !("formatFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'formatFn'");
		}

		if (/*isInteractive*/ ctx[1] === undefined && !("isInteractive" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'isInteractive'");
		}

		if (/*items*/ ctx[28] === undefined && !("items" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'items'");
		}

		if (/*keyToColor*/ ctx[29] === undefined && !("keyToColor" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[30] === undefined && !("keyToColorFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToColorFn'");
		}

		if (/*keyToLabel*/ ctx[31] === undefined && !("keyToLabel" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToLabel'");
		}

		if (/*keyToLabelFn*/ ctx[32] === undefined && !("keyToLabelFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToLabelFn'");
		}

		if (/*refs*/ ctx[3] === undefined && !("refs" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'refs'");
		}

		if (/*shouldResetScroll*/ ctx[23] === undefined && !("shouldResetScroll" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'shouldResetScroll'");
		}

		if (/*selectedKeys*/ ctx[24] === undefined && !("selectedKeys" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'selectedKeys'");
		}

		if (/*shouldScrollToFocusedKey*/ ctx[33] === undefined && !("shouldScrollToFocusedKey" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'shouldScrollToFocusedKey'");
		}

		if (/*theme*/ ctx[2] === undefined && !("theme" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'theme'");
		}

		if (/*title*/ ctx[4] === undefined && !("title" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'title'");
		}

		if (/*valueAccessor*/ ctx[25] === undefined && !("valueAccessor" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'valueAccessor'");
		}
	}

	get barHeight() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set barHeight(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKey() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get formatFn() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set formatFn(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get items() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToLabel() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToLabel(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToLabelFn() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToLabelFn(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get refs() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set refs(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shouldResetScroll() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldResetScroll(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shouldScrollToFocusedKey() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldScrollToFocusedKey(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueAccessor() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueAccessor(value) {
		throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var barchart = /*#__PURE__*/Object.freeze({
	__proto__: null,
	BarchartVDiv: BarchartVDiv
});

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
    var j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
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
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

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
                for (j = 0; j < geometry.geometries.length; j++)
                    if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * @module helpers
 */
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
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
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
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
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
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
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
    if (options === void 0) { options = {}; }
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
    if (options === void 0) { options = {}; }
    // Optional parameters
    var precision = options.precision;
    var coordinates = options.coordinates;
    var mutate = options.mutate;
    // default params
    precision = (precision === undefined || precision === null || isNaN(precision)) ? 6 : precision;
    coordinates = (coordinates === undefined || coordinates === null || isNaN(coordinates)) ? 3 : coordinates;
    // validation
    if (!geojson)
        throw new Error('<geojson> is required');
    if (typeof precision !== 'number')
        throw new Error('<precision> must be a number');
    if (typeof coordinates !== 'number')
        throw new Error('<coordinates> must be a number');
    // prevent input mutation
    if (mutate === false || mutate === undefined)
        geojson = JSON.parse(JSON.stringify(geojson));
    var factor = Math.pow(10, precision);
    // Truncate Coordinates
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
    if (coords.length > coordinates)
        coords.splice(coordinates, coords.length);
    // Truncate coordinate decimals
    for (var i = 0; i < coords.length; i++) {
        coords[i] = Math.round(coords[i] * factor) / factor;
    }
    return coords;
}

/**
* @module @svizzle/geo/geojson
*/

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
const makeUpdateFeaturesProperty = ({
	key_alt,
	key,
	map,
	mapFn,
	propName,
}) =>
	updateKey('features', mapWith(
		updateKey('properties', properties => {
			let propValue;

			if (map) {
				propValue = has(map, properties[key])
					? map[properties[key]]
					: has(map, properties[key_alt])
						? map[properties[key_alt]]
						: undefined;
			} else if (mapFn) {
				propValue = properties[key]
					? mapFn(properties[key])
					: properties[key_alt]
						? mapFn(properties[key_alt])
						: undefined;
			}

			return {
				...properties,
				[propName]: propValue
			}
		})
	));

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
const makeCentroids = pipe([
	mapWith(feature => centroid(feature, {properties: feature.properties})),
	featureCollection
]);

// TODO use a reduce to include only items with lat/lng as defined by coordPicker

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
const setGeometryPrecision = precision =>
	geojson => truncate(geojson, {precision, mutate: false});

// TODO DOC: define FeatureCollection type

var projections = /*#__PURE__*/Object.freeze({
	__proto__: null,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoEqualEarth: equalEarth,
	geoEquirectangular: equirectangular,
	geoMercator: mercator,
	geoNaturalEarth1: naturalEarth1
});

function identity(x) {
  return x;
}

function transform(transform) {
  if (transform == null) return identity;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}

function reverse(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}

function feature$1(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature$2(topology, o); })}
      : feature$2(topology, o);
}

function feature$2(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
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
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}

/**
* @module @svizzle/choropleth/utils
*/

const defaultGeometry = {
	bottom: 10,
	left: 10,
	right: 10,
	top: 10,
};

const truncateGeojson = setGeometryPrecision(4);

/**
 * Convert a topojson to a geojson truncating coordinates to precision 4.
 * This is quite specific to `@svizzle/choropleth` to limit the geojson weight down for performance reasons.
 * For a full conversion use:
 * ```
 * import {feature} from 'topojson-client';
 * feature(topojson, topojson.objects[id])
 * ```
 *
 * @function
 * @arg {object} topojson - the topojson to be converted to geojson
 * @arg {id} string - the id of the object to convert
 * @return {object} geojson
 *
 * @example
> const topojson = {
	'type': 'Topology',
	'transform': {
		'scale': [0.00001,0.00001],
		'translate': [-63.15364,-21.38731]
	},
	'objects': {
		'NUTS': {
			'type': 'GeometryCollection',
			'geometries': [
				{
					'type': 'Polygon',
					'arcs': [...],
					'id': 'BE',
					'properties': {...}
				}
			]
		}
	},
	'arcs': [[[6569909,7247636], [1369,-1901], ...]
}
> topoToGeo(topojson, 'NUTS')
{
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'id': 'BE',
			'properties': {...},
			'geometry': {
				'type': 'Polygon',
				'coordinates': [
					[[6.3163,50.4967], ...
				]
			}
		}
	]
}
 *
 * @version 0.4.0
 */
const topoToGeo = (topojson, id) =>
	truncateGeojson(feature$1(topojson, topojson.objects[id]));

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte generated by Svelte v3.24.0 */
const file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[35] = list[i];
	return child_ctx;
}

// (90:0) {#if height && width}
function create_if_block$5(ctx) {
	let g1;
	let rect;
	let g0;
	let g0_transform_value;
	let if_block = /*coloredGeojson*/ ctx[8] && create_if_block_1$4(ctx);

	const block = {
		c: function create() {
			g1 = svg_element("g");
			rect = svg_element("rect");
			g0 = svg_element("g");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g1 = claim_element(nodes, "g", { style: true, class: true }, 1);
			var g1_nodes = children(g1);
			rect = claim_element(g1_nodes, "rect", { height: true, width: true, class: true }, 1);
			children(rect).forEach(detach_dev);
			g0 = claim_element(g1_nodes, "g", { transform: true }, 1);
			var g0_nodes = children(g0);
			if (if_block) if_block.l(g0_nodes);
			g0_nodes.forEach(detach_dev);
			g1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[3]);
			attr_dev(rect, "width", /*width*/ ctx[4]);
			attr_dev(rect, "class", "bkg svelte-pao8j0");
			add_location(rect, file$8, 95, 1, 2797);
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*geometry*/ ctx[0].left + "," + /*geometry*/ ctx[0].top + ")");
			add_location(g0, file$8, 100, 1, 2843);
			attr_dev(g1, "style", /*style*/ ctx[7]);
			attr_dev(g1, "class", "ChoroplethG svelte-pao8j0");
			toggle_class(g1, "interactive", /*isInteractive*/ ctx[1]);
			add_location(g1, file$8, 90, 0, 2725);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g1, anchor);
			append_dev(g1, rect);
			append_dev(g1, g0);
			if (if_block) if_block.m(g0, null);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 8) {
				attr_dev(rect, "height", /*height*/ ctx[3]);
			}

			if (dirty[0] & /*width*/ 16) {
				attr_dev(rect, "width", /*width*/ ctx[4]);
			}

			if (/*coloredGeojson*/ ctx[8]) {
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

			if (dirty[0] & /*geometry*/ 1 && g0_transform_value !== (g0_transform_value = "translate(" + /*geometry*/ ctx[0].left + "," + /*geometry*/ ctx[0].top + ")")) {
				attr_dev(g0, "transform", g0_transform_value);
			}

			if (dirty[0] & /*style*/ 128) {
				attr_dev(g1, "style", /*style*/ ctx[7]);
			}

			if (dirty[0] & /*isInteractive*/ 2) {
				toggle_class(g1, "interactive", /*isInteractive*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g1);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(90:0) {#if height && width}",
		ctx
	});

	return block;
}

// (102:2) {#if coloredGeojson}
function create_if_block_1$4(ctx) {
	let each_1_anchor;
	let each_value = /*coloredGeojson*/ ctx[8].features;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*coloredGeojson, key, key_alt, isDeselected, isSelected, focusedKey, isFocused, geopath, isClickable, dispatch, getPayload, isInteractive*/ 65382) {
				each_value = /*coloredGeojson*/ ctx[8].features;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(102:2) {#if coloredGeojson}",
		ctx
	});

	return block;
}

// (103:2) {#each coloredGeojson.features as feature}
function create_each_block$4(ctx) {
	let g;
	let path;
	let path_d_value;
	let g_id_value;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[24](/*feature*/ ctx[35], ...args);
	}

	function mouseenter_handler(...args) {
		return /*mouseenter_handler*/ ctx[25](/*feature*/ ctx[35], ...args);
	}

	function mouseleave_handler(...args) {
		return /*mouseleave_handler*/ ctx[26](/*feature*/ ctx[35], ...args);
	}

	const block = {
		c: function create() {
			g = svg_element("g");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, id: true }, 1);
			var g_nodes = children(g);
			path = claim_element(g_nodes, "path", { d: true, style: true, class: true }, 1);
			children(path).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", path_d_value = /*geopath*/ ctx[9](/*feature*/ ctx[35]));
			set_style(path, "fill", /*feature*/ ctx[35].properties.color || null);
			attr_dev(path, "class", "svelte-pao8j0");
			toggle_class(path, "clickable", /*isClickable*/ ctx[14](/*feature*/ ctx[35]));
			add_location(path, file$8, 110, 3, 3199);
			attr_dev(g, "class", "feature svelte-pao8j0");
			attr_dev(g, "id", g_id_value = /*feature*/ ctx[35].properties[/*key*/ ctx[6]] || /*feature*/ ctx[35].properties[/*key_alt*/ ctx[2]]);
			toggle_class(g, "deselected", /*isDeselected*/ ctx[13](/*feature*/ ctx[35]));
			toggle_class(g, "selected", /*isSelected*/ ctx[12](/*feature*/ ctx[35]));
			toggle_class(g, "focused", /*focusedKey*/ ctx[5] && /*isFocused*/ ctx[11](/*feature*/ ctx[35]));
			add_location(g, file$8, 103, 2, 2971);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, path);

			if (!mounted) {
				dispose = [
					listen_dev(path, "click", click_handler, false, false, false),
					listen_dev(path, "mouseenter", mouseenter_handler, false, false, false),
					listen_dev(path, "mouseleave", mouseleave_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*geopath, coloredGeojson*/ 768 && path_d_value !== (path_d_value = /*geopath*/ ctx[9](/*feature*/ ctx[35]))) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty[0] & /*coloredGeojson*/ 256) {
				set_style(path, "fill", /*feature*/ ctx[35].properties.color || null);
			}

			if (dirty[0] & /*isClickable, coloredGeojson*/ 16640) {
				toggle_class(path, "clickable", /*isClickable*/ ctx[14](/*feature*/ ctx[35]));
			}

			if (dirty[0] & /*coloredGeojson, key, key_alt*/ 324 && g_id_value !== (g_id_value = /*feature*/ ctx[35].properties[/*key*/ ctx[6]] || /*feature*/ ctx[35].properties[/*key_alt*/ ctx[2]])) {
				attr_dev(g, "id", g_id_value);
			}

			if (dirty[0] & /*isDeselected, coloredGeojson*/ 8448) {
				toggle_class(g, "deselected", /*isDeselected*/ ctx[13](/*feature*/ ctx[35]));
			}

			if (dirty[0] & /*isSelected, coloredGeojson*/ 4352) {
				toggle_class(g, "selected", /*isSelected*/ ctx[12](/*feature*/ ctx[35]));
			}

			if (dirty[0] & /*focusedKey, isFocused, coloredGeojson*/ 2336) {
				toggle_class(g, "focused", /*focusedKey*/ ctx[5] && /*isFocused*/ ctx[11](/*feature*/ ctx[35]));
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$4.name,
		type: "each",
		source: "(103:2) {#each coloredGeojson.features as feature}",
		ctx
	});

	return block;
}

function create_fragment$e(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[3] && /*width*/ ctx[4] && create_if_block$5(ctx);

	const block = {
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
			if (/*height*/ ctx[3] && /*width*/ ctx[4]) {
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
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	const hasColor = isNotNullWith(getPath("properties.color"));

	const defaultTheme = {
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
		selectedStroke: "black",
		selectedStrokeWidth: 1
	};

	let { height } = $$props;
	let { topojson } = $$props;
	let { topojsonId } = $$props;
	let { width } = $$props;
	let { focusedKey } = $$props;
	let { geometry } = $$props;
	let { isInteractive } = $$props;
	let { key_alt } = $$props;
	let { key } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projectionFn } = $$props;
	let { projectionId } = $$props;
	let { selectedKeys } = $$props;
	let { theme } = $$props;

	const writable_props = [
		"height",
		"topojson",
		"topojsonId",
		"width",
		"focusedKey",
		"geometry",
		"isInteractive",
		"key_alt",
		"key",
		"keyToColor",
		"keyToColorFn",
		"projectionFn",
		"projectionId",
		"selectedKeys",
		"theme"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoroplethG> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ChoroplethG", $$slots, []);
	const click_handler = feature => isClickable(feature) && dispatch("clicked", getPayload(feature));
	const mouseenter_handler = feature => isInteractive && dispatch("entered", getPayload(feature));
	const mouseleave_handler = feature => isInteractive && dispatch("exited", getPayload(feature));

	$$self.$set = $$props => {
		if ("height" in $$props) $$invalidate(3, height = $$props.height);
		if ("topojson" in $$props) $$invalidate(18, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(19, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(4, width = $$props.width);
		if ("focusedKey" in $$props) $$invalidate(5, focusedKey = $$props.focusedKey);
		if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
		if ("key" in $$props) $$invalidate(6, key = $$props.key);
		if ("keyToColor" in $$props) $$invalidate(20, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(21, keyToColorFn = $$props.keyToColorFn);
		if ("projectionFn" in $$props) $$invalidate(22, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(23, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(16, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(17, theme = $$props.theme);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		geoPath,
		getPath,
		makeStyleVars,
		makeUpdateFeaturesProperty,
		isNotNullWith,
		projections,
		topoToGeo,
		defaultGeometry,
		dispatch,
		hasColor,
		defaultTheme,
		height,
		topojson,
		topojsonId,
		width,
		focusedKey,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		geojson,
		projection,
		style,
		innerHeight,
		innerWidth,
		createColoredGeojson,
		coloredGeojson,
		fitProjection,
		geopath,
		getPayload,
		isFocused,
		isSelected,
		isDeselected,
		isClickable
	});

	$$self.$inject_state = $$props => {
		if ("height" in $$props) $$invalidate(3, height = $$props.height);
		if ("topojson" in $$props) $$invalidate(18, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(19, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(4, width = $$props.width);
		if ("focusedKey" in $$props) $$invalidate(5, focusedKey = $$props.focusedKey);
		if ("geometry" in $$props) $$invalidate(0, geometry = $$props.geometry);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("key_alt" in $$props) $$invalidate(2, key_alt = $$props.key_alt);
		if ("key" in $$props) $$invalidate(6, key = $$props.key);
		if ("keyToColor" in $$props) $$invalidate(20, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(21, keyToColorFn = $$props.keyToColorFn);
		if ("projectionFn" in $$props) $$invalidate(22, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(23, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(16, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(17, theme = $$props.theme);
		if ("geojson" in $$props) $$invalidate(27, geojson = $$props.geojson);
		if ("projection" in $$props) $$invalidate(28, projection = $$props.projection);
		if ("style" in $$props) $$invalidate(7, style = $$props.style);
		if ("innerHeight" in $$props) $$invalidate(29, innerHeight = $$props.innerHeight);
		if ("innerWidth" in $$props) $$invalidate(30, innerWidth = $$props.innerWidth);
		if ("createColoredGeojson" in $$props) $$invalidate(31, createColoredGeojson = $$props.createColoredGeojson);
		if ("coloredGeojson" in $$props) $$invalidate(8, coloredGeojson = $$props.coloredGeojson);
		if ("fitProjection" in $$props) $$invalidate(32, fitProjection = $$props.fitProjection);
		if ("geopath" in $$props) $$invalidate(9, geopath = $$props.geopath);
		if ("getPayload" in $$props) $$invalidate(10, getPayload = $$props.getPayload);
		if ("isFocused" in $$props) $$invalidate(11, isFocused = $$props.isFocused);
		if ("isSelected" in $$props) $$invalidate(12, isSelected = $$props.isSelected);
		if ("isDeselected" in $$props) $$invalidate(13, isDeselected = $$props.isDeselected);
		if ("isClickable" in $$props) $$invalidate(14, isClickable = $$props.isClickable);
	};

	let geojson;
	let projection;
	let style;
	let innerHeight;
	let innerWidth;
	let createColoredGeojson;
	let coloredGeojson;
	let fitProjection;
	let geopath;
	let getPayload;
	let isFocused;
	let isSelected;
	let isDeselected;
	let isClickable;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*topojson, topojsonId*/ 786432) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(27, geojson = topoToGeo(topojson, topojsonId));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 1) {
			 $$invalidate(0, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 2) {
			 $$invalidate(1, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*key_alt*/ 4) {
			 $$invalidate(2, key_alt = key_alt || "name");
		}

		if ($$self.$$.dirty[0] & /*projectionFn, projectionId*/ 12582912) {
			 $$invalidate(28, projection = projectionFn || projectionId && projections[projectionId] || equirectangular);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 65536) {
			 $$invalidate(16, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 131072) {
			 $$invalidate(17, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 131072) {
			 $$invalidate(7, style = makeStyleVars(theme));
		}

		if ($$self.$$.dirty[0] & /*height, geometry*/ 9) {
			 $$invalidate(29, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
		}

		if ($$self.$$.dirty[0] & /*width, geometry*/ 17) {
			 $$invalidate(30, innerWidth = Math.max(0, width - geometry.left - geometry.right));
		}

		if ($$self.$$.dirty[0] & /*key_alt, key, keyToColor, keyToColorFn*/ 3145796) {
			 $$invalidate(31, createColoredGeojson = makeUpdateFeaturesProperty({
				key_alt,
				key,
				map: keyToColor,
				mapFn: keyToColorFn,
				propName: "color"
			}));
		}

		if ($$self.$$.dirty[0] & /*geojson*/ 134217728 | $$self.$$.dirty[1] & /*createColoredGeojson*/ 1) {
			 $$invalidate(8, coloredGeojson = geojson && createColoredGeojson(geojson));
		}

		if ($$self.$$.dirty[0] & /*geojson, projection, innerWidth, innerHeight*/ 2013265920) {
			 $$invalidate(32, fitProjection = geojson && projection().fitSize([innerWidth, innerHeight], geojson));
		}

		if ($$self.$$.dirty[1] & /*fitProjection*/ 2) {
			 $$invalidate(9, geopath = fitProjection && geoPath(fitProjection));
		}

		if ($$self.$$.dirty[0] & /*key, key_alt*/ 68) {
			 $$invalidate(10, getPayload = feature => feature.properties[key] || feature.properties[key_alt]);
		}

		if ($$self.$$.dirty[0] & /*focusedKey, getPayload*/ 1056) {
			 $$invalidate(11, isFocused = feature => focusedKey === getPayload(feature));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 66560) {
			 $$invalidate(12, isSelected = feature => selectedKeys.length && selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 66560) {
			 $$invalidate(13, isDeselected = feature => selectedKeys.length && !selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 2) {
			 $$invalidate(14, isClickable = feature => isInteractive && hasColor(feature));
		}
	};

	return [
		geometry,
		isInteractive,
		key_alt,
		height,
		width,
		focusedKey,
		key,
		style,
		coloredGeojson,
		geopath,
		getPayload,
		isFocused,
		isSelected,
		isDeselected,
		isClickable,
		dispatch,
		selectedKeys,
		theme,
		topojson,
		topojsonId,
		keyToColor,
		keyToColorFn,
		projectionFn,
		projectionId,
		click_handler,
		mouseenter_handler,
		mouseleave_handler
	];
}

class ChoroplethG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$e,
			create_fragment$e,
			safe_not_equal,
			{
				height: 3,
				topojson: 18,
				topojsonId: 19,
				width: 4,
				focusedKey: 5,
				geometry: 0,
				isInteractive: 1,
				key_alt: 2,
				key: 6,
				keyToColor: 20,
				keyToColorFn: 21,
				projectionFn: 22,
				projectionId: 23,
				selectedKeys: 16,
				theme: 17
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChoroplethG",
			options,
			id: create_fragment$e.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*height*/ ctx[3] === undefined && !("height" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'height'");
		}

		if (/*topojson*/ ctx[18] === undefined && !("topojson" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'topojson'");
		}

		if (/*topojsonId*/ ctx[19] === undefined && !("topojsonId" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'topojsonId'");
		}

		if (/*width*/ ctx[4] === undefined && !("width" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'width'");
		}

		if (/*focusedKey*/ ctx[5] === undefined && !("focusedKey" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'focusedKey'");
		}

		if (/*geometry*/ ctx[0] === undefined && !("geometry" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'geometry'");
		}

		if (/*isInteractive*/ ctx[1] === undefined && !("isInteractive" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'isInteractive'");
		}

		if (/*key_alt*/ ctx[2] === undefined && !("key_alt" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'key_alt'");
		}

		if (/*key*/ ctx[6] === undefined && !("key" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'key'");
		}

		if (/*keyToColor*/ ctx[20] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[21] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'keyToColorFn'");
		}

		if (/*projectionFn*/ ctx[22] === undefined && !("projectionFn" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'projectionFn'");
		}

		if (/*projectionId*/ ctx[23] === undefined && !("projectionId" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'projectionId'");
		}

		if (/*selectedKeys*/ ctx[16] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'selectedKeys'");
		}

		if (/*theme*/ ctx[17] === undefined && !("theme" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'theme'");
		}
	}

	get height() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojson() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojson(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojsonId() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojsonId(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKey() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key_alt() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key_alt(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionFn() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionFn(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionId() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionId(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte generated by Svelte v3.24.0 */
const file$9 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte";

// (41:1) {#if title}
function create_if_block$6(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-77ac80");
			add_location(h2, file$9, 42, 2, 811);
			attr_dev(header, "class", "svelte-77ac80");
			add_location(header, file$9, 41, 1, 800);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(41:1) {#if title}",
		ctx
	});

	return block;
}

function create_fragment$f(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let choroplethg;
	let main_resize_listener;
	let current;
	let if_block = /*title*/ ctx[0] && create_if_block$6(ctx);

	choroplethg = new ChoroplethG({
			props: {
				focusedKey: /*focusedKey*/ ctx[3],
				geometry: /*geometry*/ ctx[4],
				height: /*height*/ ctx[14],
				isInteractive: /*isInteractive*/ ctx[5],
				key_alt: /*key_alt*/ ctx[6],
				key: /*key*/ ctx[7],
				keyToColor: /*keyToColor*/ ctx[8],
				keyToColorFn: /*keyToColorFn*/ ctx[9],
				projectionFn: /*projectionFn*/ ctx[10],
				projectionId: /*projectionId*/ ctx[11],
				selectedKeys: /*selectedKeys*/ ctx[12],
				theme: /*theme*/ ctx[13],
				topojson: /*topojson*/ ctx[1],
				topojsonId: /*topojsonId*/ ctx[2],
				width: /*width*/ ctx[15]
			},
			$$inline: true
		});

	choroplethg.$on("clicked", /*clicked_handler*/ ctx[19]);
	choroplethg.$on("entered", /*entered_handler*/ ctx[20]);
	choroplethg.$on("exited", /*exited_handler*/ ctx[21]);

	const block = {
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
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_element(main_nodes, "svg", { width: true, height: true, class: true }, 1);
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[15]);
			attr_dev(svg, "height", /*height*/ ctx[14]);
			attr_dev(svg, "class", "svelte-77ac80");
			add_location(svg, file$9, 50, 2, 953);
			attr_dev(main, "class", "svelte-77ac80");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[22].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$9, 45, 1, 847);
			attr_dev(div, "class", "ChoroplethDiv svelte-77ac80");
			attr_dev(div, "style", /*style*/ ctx[16]);
			toggle_class(div, "interactive", /*isInteractive*/ ctx[5]);
			add_location(div, file$9, 35, 0, 712);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);
			mount_component(choroplethg, svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[22].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
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

			const choroplethg_changes = {};
			if (dirty & /*focusedKey*/ 8) choroplethg_changes.focusedKey = /*focusedKey*/ ctx[3];
			if (dirty & /*geometry*/ 16) choroplethg_changes.geometry = /*geometry*/ ctx[4];
			if (dirty & /*height*/ 16384) choroplethg_changes.height = /*height*/ ctx[14];
			if (dirty & /*isInteractive*/ 32) choroplethg_changes.isInteractive = /*isInteractive*/ ctx[5];
			if (dirty & /*key_alt*/ 64) choroplethg_changes.key_alt = /*key_alt*/ ctx[6];
			if (dirty & /*key*/ 128) choroplethg_changes.key = /*key*/ ctx[7];
			if (dirty & /*keyToColor*/ 256) choroplethg_changes.keyToColor = /*keyToColor*/ ctx[8];
			if (dirty & /*keyToColorFn*/ 512) choroplethg_changes.keyToColorFn = /*keyToColorFn*/ ctx[9];
			if (dirty & /*projectionFn*/ 1024) choroplethg_changes.projectionFn = /*projectionFn*/ ctx[10];
			if (dirty & /*projectionId*/ 2048) choroplethg_changes.projectionId = /*projectionId*/ ctx[11];
			if (dirty & /*selectedKeys*/ 4096) choroplethg_changes.selectedKeys = /*selectedKeys*/ ctx[12];
			if (dirty & /*theme*/ 8192) choroplethg_changes.theme = /*theme*/ ctx[13];
			if (dirty & /*topojson*/ 2) choroplethg_changes.topojson = /*topojson*/ ctx[1];
			if (dirty & /*topojsonId*/ 4) choroplethg_changes.topojsonId = /*topojsonId*/ ctx[2];
			if (dirty & /*width*/ 32768) choroplethg_changes.width = /*width*/ ctx[15];
			choroplethg.$set(choroplethg_changes);

			if (!current || dirty & /*width*/ 32768) {
				attr_dev(svg, "width", /*width*/ ctx[15]);
			}

			if (!current || dirty & /*height*/ 16384) {
				attr_dev(svg, "height", /*height*/ ctx[14]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 65536) {
				attr_dev(div, "style", /*style*/ ctx[16]);
			}

			if (dirty & /*isInteractive*/ 32) {
				toggle_class(div, "interactive", /*isInteractive*/ ctx[5]);
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
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let { headerHeight } = $$props;
	let { padding } = $$props;
	let { title } = $$props;
	let { topojson } = $$props;
	let { topojsonId } = $$props;
	let { focusedKey } = $$props;
	let { geometry } = $$props;
	let { isInteractive } = $$props;
	let { key_alt } = $$props;
	let { key } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projectionFn } = $$props;
	let { projectionId } = $$props;
	let { selectedKeys } = $$props;
	let { theme } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		"headerHeight",
		"padding",
		"title",
		"topojson",
		"topojsonId",
		"focusedKey",
		"geometry",
		"isInteractive",
		"key_alt",
		"key",
		"keyToColor",
		"keyToColorFn",
		"projectionFn",
		"projectionId",
		"selectedKeys",
		"theme"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoroplethDiv> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
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
		$$invalidate(15, width);
		$$invalidate(14, height);
	}

	$$self.$set = $$props => {
		if ("headerHeight" in $$props) $$invalidate(17, headerHeight = $$props.headerHeight);
		if ("padding" in $$props) $$invalidate(18, padding = $$props.padding);
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
		if ("projectionFn" in $$props) $$invalidate(10, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(11, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(12, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(13, theme = $$props.theme);
	};

	$$self.$capture_state = () => ({
		makeStyleVars,
		ChoroplethG,
		headerHeight,
		padding,
		title,
		topojson,
		topojsonId,
		focusedKey,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
		if ("headerHeight" in $$props) $$invalidate(17, headerHeight = $$props.headerHeight);
		if ("padding" in $$props) $$invalidate(18, padding = $$props.padding);
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
		if ("projectionFn" in $$props) $$invalidate(10, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(11, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(12, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(13, theme = $$props.theme);
		if ("height" in $$props) $$invalidate(14, height = $$props.height);
		if ("width" in $$props) $$invalidate(15, width = $$props.width);
		if ("style" in $$props) $$invalidate(16, style = $$props.style);
	};

	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 262144) {
			 $$invalidate(18, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 131072) {
			 $$invalidate(17, headerHeight = headerHeight || "2rem");
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 393216) {
			 $$invalidate(16, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		topojson,
		topojsonId,
		focusedKey,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		height,
		width,
		style,
		headerHeight,
		padding,
		clicked_handler,
		entered_handler,
		exited_handler,
		main_elementresize_handler
	];
}

class ChoroplethDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
			headerHeight: 17,
			padding: 18,
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
			projectionFn: 10,
			projectionId: 11,
			selectedKeys: 12,
			theme: 13
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChoroplethDiv",
			options,
			id: create_fragment$f.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[17] === undefined && !("headerHeight" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[18] === undefined && !("padding" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'padding'");
		}

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'title'");
		}

		if (/*topojson*/ ctx[1] === undefined && !("topojson" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'topojson'");
		}

		if (/*topojsonId*/ ctx[2] === undefined && !("topojsonId" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'topojsonId'");
		}

		if (/*focusedKey*/ ctx[3] === undefined && !("focusedKey" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'focusedKey'");
		}

		if (/*geometry*/ ctx[4] === undefined && !("geometry" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'geometry'");
		}

		if (/*isInteractive*/ ctx[5] === undefined && !("isInteractive" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
		}

		if (/*key_alt*/ ctx[6] === undefined && !("key_alt" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'key_alt'");
		}

		if (/*key*/ ctx[7] === undefined && !("key" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'key'");
		}

		if (/*keyToColor*/ ctx[8] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[9] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
		}

		if (/*projectionFn*/ ctx[10] === undefined && !("projectionFn" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'projectionFn'");
		}

		if (/*projectionId*/ ctx[11] === undefined && !("projectionId" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'projectionId'");
		}

		if (/*selectedKeys*/ ctx[12] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
		}

		if (/*theme*/ ctx[13] === undefined && !("theme" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'theme'");
		}
	}

	get headerHeight() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojson() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojson(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojsonId() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojsonId(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKey() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key_alt() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key_alt(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionFn() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionFn(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionId() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionId(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

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
const vectorLength2D = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

/**
* @module @svizzle/histogram/utils
*/

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
const exactAmountBins = ({
	array,
	amount,
	accessor = identity$1,
	maxExtent = null
}) => {
	const activeRange = maxExtent
		? sort(maxExtent)
		: extent(array, accessor);
	const [min, max] = activeRange;

	if (min === max) {
		return [{ values: array }]
	}

	const integerMin = Math.floor(min);
	const step = Math.ceil((max - integerMin) / amount);
	const integerMax = integerMin + step * amount;
	const ranges = pairs(inclusiveRange([integerMin, integerMax, step]));

	// TODO svizzle
	const findRangeIndex = adapter(
		map(ranges, (range, index) => {
			const predicate = pipe([
				accessor,
				allOf([
					makeIsWithinRange(activeRange),
					makeIsWithinRange(range),
				])
			]);

			return value => predicate(value) ? index : undefined
		})
	);

	return reduce(array,
		(acc, item) => {
			const index = findRangeIndex(item);
			isNotNil(index) && acc[index].values.push(item);
			return acc;
		},
		map(ranges, range => ({ range, values: [] }))
	);
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
const areValidBins = allOf([
	isIterableNotEmpty,
	every(allOf([
		hasKey('range'),
		pipe([getKey$3('range'), isNotNil])
	]))
]);

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
const getBinsItems = pipe([
	mapWith(getValues),
	flatten,
]);

const getValuesLength = getPath('values.length');

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
const getBinsMax = arrayMaxWith(getValuesLength);

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
const getBinsMin = arrayMinWith(getValuesLength);

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
const getBinsExtent = collect([getBinsMin, getBinsMax]);

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
const isNonEmptyBin = pipe([getValues, isIterableNotEmpty]);

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
const findFirstNonEmptyBinIndex = findIndexWhere(isNonEmptyBin);

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
const findLastNonEmptyBinIndex = findLastIndexWhere(isNonEmptyBin);

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
const getTrimmedBinsStats = bins => {
	const start = findFirstNonEmptyBinIndex(bins);
	const end = findLastNonEmptyBinIndex(bins);

	return {
		bins: slice(bins, start, end + 1),
		end,
		start
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
const getBinsTicks = pipe([
	mapWith(getKey$3('range')),
	flatten,
	uniques
]);

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
const getNonEmptyBinsTicks = pipe([
	filterWith(getValuesLength),
	getBinsTicks
]);

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsG.svelte generated by Svelte v3.24.0 */
const file$a = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsG.svelte";

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[48] = list[i].label;
	child_ctx[49] = list[i].x;
	child_ctx[50] = list[i].y;
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[53] = list[i].barWidth;
	child_ctx[54] = list[i].barHeight;
	child_ctx[55] = list[i].fill;
	child_ctx[56] = list[i].selected;
	child_ctx[49] = list[i].x;
	child_ctx[50] = list[i].y;
	child_ctx[58] = i;
	return child_ctx;
}

// (294:0) {#if height && width && scale}
function create_if_block$7(ctx) {
	let g2;
	let if_block0_anchor;
	let g1;
	let g0;
	let rect;
	let rect_height_value;
	let rect_width_value;
	let if_block2_anchor;
	let g1_transform_value;
	let mounted;
	let dispose;
	let if_block0 = /*flags*/ ctx[0].withBackground && create_if_block_6(ctx);
	let if_block1 = /*flags*/ ctx[0].isInteractive && create_if_block_5(ctx);
	let each_value_1 = /*bars*/ ctx[10];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	let if_block2 = /*flags*/ ctx[0].showTicks && create_if_block_3$2(ctx);
	let if_block3 = /*isBrushing*/ ctx[12] && create_if_block_1$5(ctx);

	const block = {
		c: function create() {
			g2 = svg_element("g");
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			g1 = svg_element("g");
			g0 = svg_element("g");
			rect = svg_element("rect");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			g2 = claim_element(nodes, "g", { style: true, class: true }, 1);
			var g2_nodes = children(g2);
			if (if_block0) if_block0.l(g2_nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(g2_nodes);
			g1 = claim_element(g2_nodes, "g", { transform: true }, 1);
			var g1_nodes = children(g1);
			g0 = claim_element(g1_nodes, "g", { class: true }, 1);
			var g0_nodes = children(g0);
			rect = claim_element(g0_nodes, "rect", { class: true, height: true, width: true }, 1);
			children(rect).forEach(detach_dev);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g0_nodes);
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
			attr_dev(rect, "height", rect_height_value = /*binsSize*/ ctx[8].height);
			attr_dev(rect, "width", rect_width_value = /*binsSize*/ ctx[8].width);
			add_location(rect, file$a, 322, 3, 7527);
			attr_dev(g0, "class", "bars");
			add_location(g0, file$a, 318, 2, 7471);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*origin*/ ctx[7].x + "," + /*origin*/ ctx[7].y + ")");
			add_location(g1, file$a, 315, 1, 7403);
			attr_dev(g2, "style", /*style*/ ctx[14]);
			attr_dev(g2, "class", "ColorBinsG svelte-7e9eom");
			toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g0, null);
			}

			if (if_block2) if_block2.m(g1, null);
			append_dev(g1, if_block2_anchor);
			if (if_block3) if_block3.m(g1, null);

			if (!mounted) {
				dispose = listen_dev(g0, "mouseleave", /*resetBrush*/ ctx[21], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*flags*/ ctx[0].withBackground) {
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

			if (/*flags*/ ctx[0].isInteractive) {
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

			if (dirty[0] & /*binsSize*/ 256 && rect_height_value !== (rect_height_value = /*binsSize*/ ctx[8].height)) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*binsSize*/ 256 && rect_width_value !== (rect_width_value = /*binsSize*/ ctx[8].width)) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags*/ 2032705) {
				each_value_1 = /*bars*/ ctx[10];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (/*flags*/ ctx[0].showTicks) {
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

			if (/*isBrushing*/ ctx[12]) {
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

			if (dirty[0] & /*origin*/ 128 && g1_transform_value !== (g1_transform_value = "translate(" + /*origin*/ ctx[7].x + "," + /*origin*/ ctx[7].y + ")")) {
				attr_dev(g1, "transform", g1_transform_value);
			}

			if (dirty[0] & /*style*/ 16384) {
				attr_dev(g2, "style", /*style*/ ctx[14]);
			}

			if (dirty[0] & /*flags*/ 1) {
				toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
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
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(294:0) {#if height && width && scale}",
		ctx
	});

	return block;
}

// (301:1) {#if flags.withBackground}
function create_if_block_6(ctx) {
	let rect;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "bkg svelte-7e9eom");
			attr_dev(rect, "width", /*width*/ ctx[5]);
			attr_dev(rect, "height", /*height*/ ctx[4]);
			add_location(rect, file$a, 301, 1, 7159);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*width*/ 32) {
				attr_dev(rect, "width", /*width*/ ctx[5]);
			}

			if (dirty[0] & /*height*/ 16) {
				attr_dev(rect, "height", /*height*/ ctx[4]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(301:1) {#if flags.withBackground}",
		ctx
	});

	return block;
}

// (306:1) {#if flags.isInteractive}
function create_if_block_5(ctx) {
	let rect;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { height: true, width: true, class: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[4]);
			attr_dev(rect, "width", /*width*/ ctx[5]);
			attr_dev(rect, "class", "bkgSensor svelte-7e9eom");
			toggle_class(rect, "reset", /*selectedBins*/ ctx[2].length > 0);
			add_location(rect, file$a, 306, 1, 7275);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = listen_dev(rect, "click", /*resetSelection*/ ctx[22], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 16) {
				attr_dev(rect, "height", /*height*/ ctx[4]);
			}

			if (dirty[0] & /*width*/ 32) {
				attr_dev(rect, "width", /*width*/ ctx[5]);
			}

			if (dirty[0] & /*selectedBins*/ 4) {
				toggle_class(rect, "reset", /*selectedBins*/ ctx[2].length > 0);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(306:1) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (347:4) {#if flags.isInteractive}
function create_if_block_4(ctx) {
	let rect;
	let rect_height_value;
	let rect_width_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, height: true, width: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "rectsensor svelte-7e9eom");
			attr_dev(rect, "height", rect_height_value = /*barHeight*/ ctx[54]);
			attr_dev(rect, "width", rect_width_value = /*barWidth*/ ctx[53]);
			add_location(rect, file$a, 347, 4, 7912);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(rect, "mousedown", /*onMousedown*/ ctx[17], false, false, false),
					listen_dev(rect, "mouseover", /*onMouseenter*/ ctx[16](/*index*/ ctx[58]), false, false, false),
					listen_dev(rect, "mouseout", /*onMouseleave*/ ctx[20](/*index*/ ctx[58]), false, false, false),
					listen_dev(
						rect,
						"mousemove",
						function () {
							if (is_function(/*isMousedown*/ ctx[6]
							? /*onMousemove*/ ctx[18](/*index*/ ctx[58])
							: null)) (/*isMousedown*/ ctx[6]
							? /*onMousemove*/ ctx[18](/*index*/ ctx[58])
							: null).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(rect, "mouseup", /*onMouseup*/ ctx[19](/*index*/ ctx[58]), false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*bars*/ 1024 && rect_height_value !== (rect_height_value = /*barHeight*/ ctx[54])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 1024 && rect_width_value !== (rect_width_value = /*barWidth*/ ctx[53])) {
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
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(347:4) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }
function create_each_block_1$1(ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let rect_height_value;
	let rect_width_value;
	let g_transform_value;
	let if_block = /*flags*/ ctx[0].isInteractive && create_if_block_4(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);

			rect = claim_element(
				g_nodes,
				"rect",
				{
					fill: true,
					height: true,
					width: true,
					class: true
				},
				1
			);

			children(rect).forEach(detach_dev);
			if (if_block) if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "fill", rect_fill_value = /*fill*/ ctx[55]);
			attr_dev(rect, "height", rect_height_value = /*barHeight*/ ctx[54]);
			attr_dev(rect, "width", rect_width_value = /*barWidth*/ ctx[53]);
			attr_dev(rect, "class", "svelte-7e9eom");
			toggle_class(rect, "selected", /*selected*/ ctx[56]);
			add_location(rect, file$a, 340, 4, 7787);
			attr_dev(g, "class", "bar svelte-7e9eom");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*x*/ ctx[49] + "," + /*y*/ ctx[50] + ")");
			add_location(g, file$a, 336, 3, 7724);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			if (if_block) if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*bars*/ 1024 && rect_fill_value !== (rect_fill_value = /*fill*/ ctx[55])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*bars*/ 1024 && rect_height_value !== (rect_height_value = /*barHeight*/ ctx[54])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 1024 && rect_width_value !== (rect_width_value = /*barWidth*/ ctx[53])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars*/ 1024) {
				toggle_class(rect, "selected", /*selected*/ ctx[56]);
			}

			if (/*flags*/ ctx[0].isInteractive) {
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

			if (dirty[0] & /*bars*/ 1024 && g_transform_value !== (g_transform_value = "translate(" + /*x*/ ctx[49] + "," + /*y*/ ctx[50] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(329:3) {#each bars as {     barWidth,     barHeight,     fill,     selected,     x,     y    }",
		ctx
	});

	return block;
}

// (364:2) {#if flags.showTicks}
function create_if_block_3$2(ctx) {
	let g;
	let g_font_size_value;
	let each_value = /*ticks*/ ctx[11];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, "font-size": true }, 1);
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "class", "ticks svelte-7e9eom");
			attr_dev(g, "font-size", g_font_size_value = /*theme*/ ctx[3].fontSize);
			toggle_class(g, "vertical", /*flags*/ ctx[0].isVertical);
			add_location(g, file$a, 364, 2, 8281);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 2048) {
				each_value = /*ticks*/ ctx[11];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty[0] & /*theme*/ 8 && g_font_size_value !== (g_font_size_value = /*theme*/ ctx[3].fontSize)) {
				attr_dev(g, "font-size", g_font_size_value);
			}

			if (dirty[0] & /*flags*/ 1) {
				toggle_class(g, "vertical", /*flags*/ ctx[0].isVertical);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(364:2) {#if flags.showTicks}",
		ctx
	});

	return block;
}

// (370:3) {#each ticks as {label, x, y}}
function create_each_block$5(ctx) {
	let text_1;
	let t_value = /*label*/ ctx[48] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_element(nodes, "text", { x: true, y: true, class: true }, 1);
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "x", text_1_x_value = /*x*/ ctx[49]);
			attr_dev(text_1, "y", text_1_y_value = /*y*/ ctx[50]);
			attr_dev(text_1, "class", "svelte-7e9eom");
			add_location(text_1, file$a, 370, 3, 8409);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 2048 && t_value !== (t_value = /*label*/ ctx[48] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*ticks*/ 2048 && text_1_x_value !== (text_1_x_value = /*x*/ ctx[49])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*ticks*/ 2048 && text_1_y_value !== (text_1_y_value = /*y*/ ctx[50])) {
				attr_dev(text_1, "y", text_1_y_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$5.name,
		type: "each",
		source: "(370:3) {#each ticks as {label, x, y}}",
		ctx
	});

	return block;
}

// (377:2) {#if isBrushing}
function create_if_block_1$5(ctx) {
	let g;

	function select_block_type(ctx, dirty) {
		if (/*flags*/ ctx[0].isVertical) return create_if_block_2$3;
		return create_else_block$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true }, 1);
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
		block,
		id: create_if_block_1$5.name,
		type: "if",
		source: "(377:2) {#if isBrushing}",
		ctx
	});

	return block;
}

// (386:3) {:else}
function create_else_block$1(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let line_y__value;
	let line_y__value_1;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					x1: true,
					x2: true,
					y1: true,
					y2: true,
					class: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", line_x__value = /*brushLine*/ ctx[13].p1);
			attr_dev(line, "x2", line_x__value_1 = /*brushLine*/ ctx[13].p2);
			attr_dev(line, "y1", line_y__value = /*geometry*/ ctx[1].barThickness);
			attr_dev(line, "y2", line_y__value_1 = /*geometry*/ ctx[1].barThickness);
			attr_dev(line, "class", "svelte-7e9eom");
			add_location(line, file$a, 386, 3, 8626);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 8192 && line_x__value !== (line_x__value = /*brushLine*/ ctx[13].p1)) {
				attr_dev(line, "x1", line_x__value);
			}

			if (dirty[0] & /*brushLine*/ 8192 && line_x__value_1 !== (line_x__value_1 = /*brushLine*/ ctx[13].p2)) {
				attr_dev(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*geometry*/ 2 && line_y__value !== (line_y__value = /*geometry*/ ctx[1].barThickness)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*geometry*/ 2 && line_y__value_1 !== (line_y__value_1 = /*geometry*/ ctx[1].barThickness)) {
				attr_dev(line, "y2", line_y__value_1);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(386:3) {:else}",
		ctx
	});

	return block;
}

// (381:3) {#if flags.isVertical}
function create_if_block_2$3(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(nodes, "line", { y1: true, y2: true, class: true }, 1);
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y1", line_y__value = /*brushLine*/ ctx[13].p1);
			attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ ctx[13].p2);
			attr_dev(line, "class", "svelte-7e9eom");
			add_location(line, file$a, 381, 3, 8556);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 8192 && line_y__value !== (line_y__value = /*brushLine*/ ctx[13].p1)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*brushLine*/ 8192 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ ctx[13].p2)) {
				attr_dev(line, "y2", line_y__value_1);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$3.name,
		type: "if",
		source: "(381:3) {#if flags.isVertical}",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[4] && /*width*/ ctx[5] && /*scale*/ ctx[9] && create_if_block$7(ctx);

	const block = {
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
			if (/*height*/ ctx[4] && /*width*/ ctx[5] && /*scale*/ ctx[9]) {
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
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let $brush;
	const dispatch = createEventDispatcher();

	const defaultFlags = {
		isInteractive: false,
		isVertical: false,
		showTicks: true,
		withBackground: false
	};

	const defaultGeometry = {
		barThickness: 25,
		bottom: 10,
		brushThreshold: 10, // pixels to trigger brushing
		left: 10,
		right: 10,
		gap: 2,
		textPadding: 5,
		top: 10
	};

	const defaultTheme = {
		backgroundColor: "white",
		backgroundOpacity: 1,
		binFill: "white",
		binStroke: null, // null for no stroke, or a color string
		binStrokeWidth: 1, // ineffective for binStroke: null
		brushAddStroke: "rgb(107,248,134)",
		brushRemoveStroke: "rgb(246,97,20)",
		brushStrokeOpacity: 0.8,
		brushStrokeWidth: 8,
		fontSize: 12,
		selectedBinStroke: "black",
		selectedBinStrokeWidth: 2,
		textColor: "black"
	};

	let { height } = $$props;
	let { width } = $$props;
	let { bins } = $$props; // {range: [number, number], color: string}[]
	let { flags } = $$props;
	let { geometry } = $$props;
	let { selectedBins } = $$props;
	let { theme } = $$props;
	let { ticksFormatFn } = $$props;

	/* brushing */
	let isMousedown = false;

	const brushOff = {
		delta: 0,
		end: null,
		origin: { x: null, y: null },
		start: null,
		modifier: null,
		state: "Off"
	};

	const brush = writable(brushOff);
	validate_store(brush, "brush");
	component_subscribe($$self, brush, value => $$invalidate(34, $brush = value));

	/* events */
	const getModifier = event => event.shiftKey ? "shift" : event.altKey ? "alt" : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			brush.update(mergeObj({ end: index }));
		}

		dispatch("entered", index);
	};

	const onMousedown = event => {
		$$invalidate(6, isMousedown = true);

		brush.set({
			delta: 0,
			modifier: getModifier(event),
			origin: { x: event.offsetX, y: event.offsetY },
			state: "Pressed"
		});
	};

	const onMousemove = index => event => {
		if (isPressed) {
			const delta = vectorLength2D(event.offsetX - $brush.origin.x, event.offsetY - $brush.origin.y);

			if (delta > geometry.brushThreshold) {
				brush.update(mergeObj({
					end: index,
					start: index,
					state: "Brushing"
				}));

				dispatch("brushstart", index);
			} else {
				brush.update(mergeObj({ delta }));
			}
		}
	};

	const onMouseup = index => () => {
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

				dispatch("clicked", { index, selectedBins });
			}
		} else if (isBrushing) {
			dispatch("brushend", index);
		}

		brush.set(brushOff);
	};

	const onMouseleave = index => () => {
		dispatch("exited", index);
	};

	const resetBrush = () => {
		brush.set(brushOff);
	};

	const resetSelection = () => {
		$$invalidate(2, selectedBins = []);
		dispatch("clicked", { selectedBins });
	};

	const writable_props = [
		"height",
		"width",
		"bins",
		"flags",
		"geometry",
		"selectedBins",
		"theme",
		"ticksFormatFn"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ColorBinsG> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ColorBinsG", $$slots, []);

	$$self.$set = $$props => {
		if ("height" in $$props) $$invalidate(4, height = $$props.height);
		if ("width" in $$props) $$invalidate(5, width = $$props.width);
		if ("bins" in $$props) $$invalidate(23, bins = $$props.bins);
		if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
		if ("selectedBins" in $$props) $$invalidate(2, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(3, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(24, ticksFormatFn = $$props.ticksFormatFn);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		writable,
		makeStyleVars,
		vectorLength2D,
		concat,
		inclusiveRange,
		mergeObj,
		scaleLinear: linear$1,
		appendTo,
		last,
		pullFrom,
		sort,
		uniques,
		getBinsTicks,
		dispatch,
		defaultFlags,
		defaultGeometry,
		defaultTheme,
		height,
		width,
		bins,
		flags,
		geometry,
		selectedBins,
		theme,
		ticksFormatFn,
		isMousedown,
		brushOff,
		brush,
		getModifier,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetBrush,
		resetSelection,
		innerWidth,
		innerHeight,
		widgetThickness,
		origin,
		binsSize,
		valuesMin,
		valuesMax,
		range,
		scale,
		lastIndex,
		semigap,
		bars,
		ticksDistance,
		ticks,
		isBrushing,
		$brush,
		isPressed,
		doesBrushAdd,
		doesBrushRemove,
		brushStroke,
		brushExtent,
		brushRange,
		brushExtentBarYs,
		brushLine,
		style
	});

	$$self.$inject_state = $$props => {
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

	let innerWidth;
	let innerHeight;
	let widgetThickness;
	let origin;
	let binsSize;
	let valuesMin;
	let valuesMax;
	let range;
	let scale;
	let lastIndex;
	let semigap;
	let bars;
	let ticksDistance;
	let ticks;
	let isBrushing;
	let isPressed;
	let doesBrushAdd;
	let doesBrushRemove;
	let brushStroke;
	let brushExtent;
	let brushRange;
	let brushExtentBarYs;
	let brushLine;
	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*bins*/ 8388608) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(23, bins = bins || []);
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 $$invalidate(0, flags = flags ? { ...defaultFlags, ...flags } : defaultFlags);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			 $$invalidate(1, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*selectedBins*/ 4) {
			 $$invalidate(2, selectedBins = selectedBins || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8) {
			 $$invalidate(3, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn*/ 16777216) {
			 $$invalidate(24, ticksFormatFn = ticksFormatFn || (x => x));
		}

		if ($$self.$$.dirty[0] & /*width, geometry*/ 34) {
			/* layout */
			 $$invalidate(25, innerWidth = Math.max(0, width - geometry.left - geometry.right));
		}

		if ($$self.$$.dirty[0] & /*height, geometry*/ 18) {
			 $$invalidate(26, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags, theme*/ 11) {
			 $$invalidate(27, widgetThickness = geometry.barThickness + flags.showTicks
			? theme.fontSize + geometry.textPadding
			: 0);
		}

		if ($$self.$$.dirty[0] & /*geometry, flags, innerWidth, widgetThickness, innerHeight*/ 234881027) {
			 $$invalidate(7, origin = {
				x: geometry.left + (flags.isVertical
				? (innerWidth - widgetThickness) / 2
				: 0),
				y: geometry.top + (flags.isVertical
				? 0
				: (innerHeight - widgetThickness) / 2)
			});
		}

		if ($$self.$$.dirty[0] & /*flags, geometry, innerWidth, innerHeight*/ 100663299) {
			 $$invalidate(8, binsSize = {
				width: flags.isVertical ? geometry.barThickness : innerWidth,
				height: flags.isVertical ? innerHeight : geometry.barThickness
			});
		}

		if ($$self.$$.dirty[0] & /*bins*/ 8388608) {
			/* scale */
			 $$invalidate(28, [valuesMin, valuesMax] = [bins[0].range[0], last(bins).range[1]], valuesMin, ($$invalidate(29, valuesMax), $$invalidate(23, bins)));
		}

		if ($$self.$$.dirty[0] & /*flags, innerHeight, innerWidth*/ 100663297) {
			 $$invalidate(30, range = flags.isVertical ? [innerHeight, 0] : [0, innerWidth]);
		}

		if ($$self.$$.dirty[0] & /*bins, valuesMin, valuesMax, range*/ 1887436800) {
			 $$invalidate(9, scale = bins.length && linear$1().domain([valuesMin, valuesMax]).range(range));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 8388608) {
			/* bars */
			 $$invalidate(31, lastIndex = bins.length - 1);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			 $$invalidate(32, semigap = geometry.gap / 2);
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 8) {
			 $$invalidate(12, isBrushing = $brush.state === "Brushing");
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 8) {
			 $$invalidate(36, doesBrushAdd = $brush.modifier === "shift");
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 4096 | $$self.$$.dirty[1] & /*$brush*/ 8) {
			 $$invalidate(39, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 4096 | $$self.$$.dirty[1] & /*brushExtent*/ 256) {
			 $$invalidate(40, brushRange = isBrushing && inclusiveRange(brushExtent));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 8) {
			 $$invalidate(37, doesBrushRemove = $brush.modifier === "alt");
		}

		if ($$self.$$.dirty[0] & /*isBrushing, selectedBins*/ 4100 | $$self.$$.dirty[1] & /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/ 616) {
			 if (isBrushing) {
				$$invalidate(2, selectedBins = doesBrushAdd
				? uniques(concat(selectedBins, brushRange))
				: doesBrushRemove
					? pullFrom(selectedBins, brushRange)
					: brushRange);

				dispatch("brushed", {
					end: $brush.end,
					selectedBins,
					start: $brush.start
				});
			}
		}

		if ($$self.$$.dirty[0] & /*bins, selectedBins, scale, flags, geometry, theme*/ 8389135 | $$self.$$.dirty[1] & /*semigap, lastIndex*/ 3) {
			 $$invalidate(10, bars = bins.map((bin, index) => {
				const { range: [v1, v2], color } = bin;
				const selected = selectedBins.length && selectedBins.includes(index);
				const p1 = scale(v1);
				const p2 = scale(v2);
				let x;
				let y;
				let start;
				let end;
				let sensorX;
				let sensorY;

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

				const barLength = Math.abs(end - start);
				const sensorLength = Math.abs(p2 - p1);

				return {
					...bin,
					...{
						barHeight: flags.isVertical ? barLength : geometry.barThickness,
						barWidth: flags.isVertical ? geometry.barThickness : barLength,
						fill: color || theme.binFill,
						p1,
						p2,
						selected,
						sensorHeight: flags.isVertical ? sensorLength : geometry.barThickness,
						sensorWidth: flags.isVertical ? geometry.barThickness : sensorLength,
						sensorX,
						sensorY,
						x,
						y
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			/* ticks */
			 $$invalidate(33, ticksDistance = geometry.barThickness + geometry.textPadding);
		}

		if ($$self.$$.dirty[0] & /*bins, ticksFormatFn, flags, scale*/ 25166337 | $$self.$$.dirty[1] & /*ticksDistance*/ 4) {
			 $$invalidate(11, ticks = getBinsTicks(bins).map(value => ({
				label: ticksFormatFn(value),
				x: flags.isVertical ? ticksDistance : scale(value),
				y: flags.isVertical ? scale(value) : ticksDistance
			})));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 8) {
			 isPressed = $brush.state === "Pressed";
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8 | $$self.$$.dirty[1] & /*doesBrushAdd, doesBrushRemove*/ 96) {
			 $$invalidate(38, brushStroke = doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove ? theme.brushRemoveStroke : null);
		}

		if ($$self.$$.dirty[0] & /*isBrushing, bars*/ 5120 | $$self.$$.dirty[1] & /*brushExtent*/ 256) {
			 $$invalidate(41, brushExtentBarYs = isBrushing && sort([
				bars[brushExtent[0]].p1,
				bars[brushExtent[0]].p2,
				bars[brushExtent[1]].p1,
				bars[brushExtent[1]].p2
			]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 4096 | $$self.$$.dirty[1] & /*brushExtentBarYs*/ 1024) {
			 $$invalidate(13, brushLine = isBrushing && {
				p1: brushExtentBarYs[0],
				p2: brushExtentBarYs[3]
			});
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8 | $$self.$$.dirty[1] & /*brushStroke*/ 128) {
			/* style */
			 $$invalidate(14, style = makeStyleVars({ ...theme, brushStroke }));
		}
	};

	return [
		flags,
		geometry,
		selectedBins,
		theme,
		height,
		width,
		isMousedown,
		origin,
		binsSize,
		scale,
		bars,
		ticks,
		isBrushing,
		brushLine,
		style,
		brush,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetBrush,
		resetSelection,
		bins,
		ticksFormatFn
	];
}

class ColorBinsG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$g,
			create_fragment$g,
			safe_not_equal,
			{
				height: 4,
				width: 5,
				bins: 23,
				flags: 0,
				geometry: 1,
				selectedBins: 2,
				theme: 3,
				ticksFormatFn: 24
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ColorBinsG",
			options,
			id: create_fragment$g.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*height*/ ctx[4] === undefined && !("height" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'height'");
		}

		if (/*width*/ ctx[5] === undefined && !("width" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'width'");
		}

		if (/*bins*/ ctx[23] === undefined && !("bins" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'bins'");
		}

		if (/*flags*/ ctx[0] === undefined && !("flags" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'flags'");
		}

		if (/*geometry*/ ctx[1] === undefined && !("geometry" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'geometry'");
		}

		if (/*selectedBins*/ ctx[2] === undefined && !("selectedBins" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'selectedBins'");
		}

		if (/*theme*/ ctx[3] === undefined && !("theme" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'theme'");
		}

		if (/*ticksFormatFn*/ ctx[24] === undefined && !("ticksFormatFn" in props)) {
			console.warn("<ColorBinsG> was created without expected prop 'ticksFormatFn'");
		}
	}

	get height() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsDiv.svelte generated by Svelte v3.24.0 */
const file$b = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/legend/src/ColorBinsDiv.svelte";

// (32:1) {#if title}
function create_if_block_1$6(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
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
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$6.name,
		type: "if",
		source: "(32:1) {#if title}",
		ctx
	});

	return block;
}

// (46:3) {#if bins}
function create_if_block$8(ctx) {
	let colorbinsg;
	let current;

	colorbinsg = new ColorBinsG({
			props: {
				bins: /*bins*/ ctx[1],
				flags: /*flags*/ ctx[2],
				geometry: /*geometry*/ ctx[3],
				height: /*height*/ ctx[7],
				selectedBins: /*selectedBins*/ ctx[4],
				theme: /*theme*/ ctx[5],
				ticksFormatFn: /*ticksFormatFn*/ ctx[6],
				width: /*width*/ ctx[8]
			},
			$$inline: true
		});

	colorbinsg.$on("brushed", /*brushed_handler*/ ctx[12]);
	colorbinsg.$on("brushend", /*brushend_handler*/ ctx[13]);
	colorbinsg.$on("brushstart", /*brushstart_handler*/ ctx[14]);
	colorbinsg.$on("clicked", /*clicked_handler*/ ctx[15]);
	colorbinsg.$on("entered", /*entered_handler*/ ctx[16]);
	colorbinsg.$on("exited", /*exited_handler*/ ctx[17]);

	const block = {
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
			const colorbinsg_changes = {};
			if (dirty & /*bins*/ 2) colorbinsg_changes.bins = /*bins*/ ctx[1];
			if (dirty & /*flags*/ 4) colorbinsg_changes.flags = /*flags*/ ctx[2];
			if (dirty & /*geometry*/ 8) colorbinsg_changes.geometry = /*geometry*/ ctx[3];
			if (dirty & /*height*/ 128) colorbinsg_changes.height = /*height*/ ctx[7];
			if (dirty & /*selectedBins*/ 16) colorbinsg_changes.selectedBins = /*selectedBins*/ ctx[4];
			if (dirty & /*theme*/ 32) colorbinsg_changes.theme = /*theme*/ ctx[5];
			if (dirty & /*ticksFormatFn*/ 64) colorbinsg_changes.ticksFormatFn = /*ticksFormatFn*/ ctx[6];
			if (dirty & /*width*/ 256) colorbinsg_changes.width = /*width*/ ctx[8];
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
		block,
		id: create_if_block$8.name,
		type: "if",
		source: "(46:3) {#if bins}",
		ctx
	});

	return block;
}

function create_fragment$h(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let main_resize_listener;
	let current;
	let if_block0 = /*title*/ ctx[0] && create_if_block_1$6(ctx);
	let if_block1 = /*bins*/ ctx[1] && create_if_block$8(ctx);

	const block = {
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
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_element(main_nodes, "svg", { width: true, height: true, class: true }, 1);
			var svg_nodes = children(svg);
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[8]);
			attr_dev(svg, "height", /*height*/ ctx[7]);
			attr_dev(svg, "class", "svelte-1amymvq");
			add_location(svg, file$b, 41, 2, 793);
			attr_dev(main, "class", "svelte-1amymvq");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[18].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$b, 36, 1, 687);
			attr_dev(div, "class", "ColorBinsDiv svelte-1amymvq");
			attr_dev(div, "style", /*style*/ ctx[9]);
			toggle_class(div, "interactive", /*flags*/ ctx[2] && /*flags*/ ctx[2].isInteractive);
			add_location(div, file$b, 26, 0, 538);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);
			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[18].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
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

			if (/*bins*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*bins*/ 2) {
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

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*width*/ 256) {
				attr_dev(svg, "width", /*width*/ ctx[8]);
			}

			if (!current || dirty & /*height*/ 128) {
				attr_dev(svg, "height", /*height*/ ctx[7]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 512) {
				attr_dev(div, "style", /*style*/ ctx[9]);
			}

			if (dirty & /*flags*/ 4) {
				toggle_class(div, "interactive", /*flags*/ ctx[2] && /*flags*/ ctx[2].isInteractive);
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
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	let { headerHeight } = $$props;
	let { padding } = $$props;
	let { title } = $$props;
	let { bins } = $$props; // {range: [number, number], color: string}[]
	let { flags } = $$props;
	let { geometry } = $$props;
	let { selectedBins } = $$props;
	let { theme } = $$props;
	let { ticksFormatFn } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		"headerHeight",
		"padding",
		"title",
		"bins",
		"flags",
		"geometry",
		"selectedBins",
		"theme",
		"ticksFormatFn"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ColorBinsDiv> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
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

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		makeStyleVars,
		ColorBinsG,
		headerHeight,
		padding,
		title,
		bins,
		flags,
		geometry,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
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

	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 2048) {
			 $$invalidate(11, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 1024) {
			 $$invalidate(10, headerHeight = headerHeight || "2rem");
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 3072) {
			 $$invalidate(9, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		bins,
		flags,
		geometry,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style,
		headerHeight,
		padding,
		brushed_handler,
		brushend_handler,
		brushstart_handler,
		clicked_handler,
		entered_handler,
		exited_handler,
		main_elementresize_handler
	];
}

class ColorBinsDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
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
			component: this,
			tagName: "ColorBinsDiv",
			options,
			id: create_fragment$h.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[10] === undefined && !("headerHeight" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[11] === undefined && !("padding" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'padding'");
		}

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'title'");
		}

		if (/*bins*/ ctx[1] === undefined && !("bins" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'bins'");
		}

		if (/*flags*/ ctx[2] === undefined && !("flags" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'flags'");
		}

		if (/*geometry*/ ctx[3] === undefined && !("geometry" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'geometry'");
		}

		if (/*selectedBins*/ ctx[4] === undefined && !("selectedBins" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'selectedBins'");
		}

		if (/*theme*/ ctx[5] === undefined && !("theme" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'theme'");
		}

		if (/*ticksFormatFn*/ ctx[6] === undefined && !("ticksFormatFn" in props)) {
			console.warn("<ColorBinsDiv> was created without expected prop 'ticksFormatFn'");
		}
	}

	get headerHeight() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var legend = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ColorBinsG: ColorBinsG,
	ColorBinsDiv: ColorBinsDiv
});

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte generated by Svelte v3.24.0 */
const file$c = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte";

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[51] = list[i].tick;
	child_ctx[52] = list[i].y;
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
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
}

// (320:0) {#if height && width && scales}
function create_if_block$9(ctx) {
	let g2;
	let if_block0_anchor;
	let g1;
	let g0;
	let line;
	let line_y__value;
	let if_block2_anchor;
	let g0_transform_value;
	let g1_transform_value;
	let if_block0 = /*flags*/ ctx[0].withBackground && create_if_block_7(ctx);
	let if_block1 = /*flags*/ ctx[0].isInteractive && create_if_block_6$1(ctx);
	let each_value_1 = /*bars*/ ctx[14];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	let if_block2 = !/*flags*/ ctx[0].hideOrigin && create_if_block_3$3(ctx);
	let if_block3 = !/*flags*/ ctx[0].hideTicks && create_if_block_2$4(ctx);
	let if_block4 = /*isBrushing*/ ctx[16] && create_if_block_1$7(ctx);

	const block = {
		c: function create() {
			g2 = svg_element("g");
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			g1 = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
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
			g2 = claim_element(nodes, "g", { class: true, style: true }, 1);
			var g2_nodes = children(g2);
			if (if_block0) if_block0.l(g2_nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(g2_nodes);
			g1 = claim_element(g2_nodes, "g", { transform: true }, 1);
			var g1_nodes = children(g1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g1_nodes);
			}

			g0 = claim_element(g1_nodes, "g", { class: true, transform: true }, 1);
			var g0_nodes = children(g0);
			line = claim_element(g0_nodes, "line", { y2: true, class: true }, 1);
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
			attr_dev(line, "y2", line_y__value = /*flags*/ ctx[0].isTopDown
			? /*innerHeight*/ ctx[8]
			: -/*innerHeight*/ ctx[8]);

			attr_dev(line, "class", "svelte-xezn7c");
			add_location(line, file$c, 392, 3, 9136);
			attr_dev(g0, "class", "axis svelte-xezn7c");
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*origin*/ ctx[9].x + "," + /*origin*/ ctx[9].y + ")");
			add_location(g0, file$c, 388, 2, 9064);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*safety*/ ctx[6].left + "," + /*safety*/ ctx[6].top + ")");
			add_location(g1, file$c, 341, 1, 8170);
			attr_dev(g2, "class", "HistogramG svelte-xezn7c");
			attr_dev(g2, "style", /*style*/ ctx[18]);
			toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
			add_location(g2, file$c, 320, 0, 7801);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g2, anchor);
			if (if_block0) if_block0.m(g2, null);
			append_dev(g2, if_block0_anchor);
			if (if_block1) if_block1.m(g2, null);
			append_dev(g2, g1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g1, null);
			}

			append_dev(g1, g0);
			append_dev(g0, line);
			if (if_block2) if_block2.m(g0, null);
			append_dev(g0, if_block2_anchor);
			if (if_block3) if_block3.m(g0, null);
			if (if_block4) if_block4.m(g1, null);
		},
		p: function update(ctx, dirty) {
			if (/*flags*/ ctx[0].withBackground) {
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

			if (/*flags*/ ctx[0].isInteractive) {
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

			if (dirty[0] & /*bars, innerWidth, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags, fontSize*/ 32555169) {
				each_value_1 = /*bars*/ ctx[14];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g1, g0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty[0] & /*flags, innerHeight*/ 257 && line_y__value !== (line_y__value = /*flags*/ ctx[0].isTopDown
			? /*innerHeight*/ ctx[8]
			: -/*innerHeight*/ ctx[8])) {
				attr_dev(line, "y2", line_y__value);
			}

			if (!/*flags*/ ctx[0].hideOrigin) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_3$3(ctx);
					if_block2.c();
					if_block2.m(g0, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!/*flags*/ ctx[0].hideTicks) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_2$4(ctx);
					if_block3.c();
					if_block3.m(g0, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*origin*/ 512 && g0_transform_value !== (g0_transform_value = "translate(" + /*origin*/ ctx[9].x + "," + /*origin*/ ctx[9].y + ")")) {
				attr_dev(g0, "transform", g0_transform_value);
			}

			if (/*isBrushing*/ ctx[16]) {
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

			if (dirty[0] & /*safety*/ 64 && g1_transform_value !== (g1_transform_value = "translate(" + /*safety*/ ctx[6].left + "," + /*safety*/ ctx[6].top + ")")) {
				attr_dev(g1, "transform", g1_transform_value);
			}

			if (dirty[0] & /*style*/ 262144) {
				attr_dev(g2, "style", /*style*/ ctx[18]);
			}

			if (dirty[0] & /*flags*/ 1) {
				toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
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
		block,
		id: create_if_block$9.name,
		type: "if",
		source: "(320:0) {#if height && width && scales}",
		ctx
	});

	return block;
}

// (327:1) {#if flags.withBackground}
function create_if_block_7(ctx) {
	let rect;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "bkg svelte-xezn7c");
			attr_dev(rect, "width", /*width*/ ctx[4]);
			attr_dev(rect, "height", /*height*/ ctx[3]);
			add_location(rect, file$c, 327, 1, 7926);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*width*/ 16) {
				attr_dev(rect, "width", /*width*/ ctx[4]);
			}

			if (dirty[0] & /*height*/ 8) {
				attr_dev(rect, "height", /*height*/ ctx[3]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(327:1) {#if flags.withBackground}",
		ctx
	});

	return block;
}

// (332:1) {#if flags.isInteractive}
function create_if_block_6$1(ctx) {
	let rect;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { height: true, width: true, class: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[3]);
			attr_dev(rect, "width", /*width*/ ctx[4]);
			attr_dev(rect, "class", "bkgSensor svelte-xezn7c");
			toggle_class(rect, "reset", /*selectedBins*/ ctx[2].length > 0);
			add_location(rect, file$c, 332, 1, 8042);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = listen_dev(rect, "click", /*resetSelection*/ ctx[25], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 8) {
				attr_dev(rect, "height", /*height*/ ctx[3]);
			}

			if (dirty[0] & /*width*/ 16) {
				attr_dev(rect, "width", /*width*/ ctx[4]);
			}

			if (dirty[0] & /*selectedBins*/ 4) {
				toggle_class(rect, "reset", /*selectedBins*/ ctx[2].length > 0);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6$1.name,
		type: "if",
		source: "(332:1) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (358:3) {#if displayValue}
function create_if_block_5$1(ctx) {
	let rect;
	let rect_fill_value;
	let rect_x_value;
	let rect_height_value;
	let rect_width_value;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(
				nodes,
				"rect",
				{
					fill: true,
					x: true,
					class: true,
					height: true,
					width: true
				},
				1
			);

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "fill", rect_fill_value = /*fill*/ ctx[58]);
			attr_dev(rect, "x", rect_x_value = /*x*/ ctx[62]);
			attr_dev(rect, "class", "bar svelte-xezn7c");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[56]);
			attr_dev(rect, "width", rect_width_value = /*barLength*/ ctx[55]);
			toggle_class(rect, "selected", /*selected*/ ctx[61]);
			add_location(rect, file$c, 358, 3, 8447);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*bars*/ 16384 && rect_fill_value !== (rect_fill_value = /*fill*/ ctx[58])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*bars*/ 16384 && rect_x_value !== (rect_x_value = /*x*/ ctx[62])) {
				attr_dev(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*bars*/ 16384 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[56])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 16384 && rect_width_value !== (rect_width_value = /*barLength*/ ctx[55])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars*/ 16384) {
				toggle_class(rect, "selected", /*selected*/ ctx[61]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$1.name,
		type: "if",
		source: "(358:3) {#if displayValue}",
		ctx
	});

	return block;
}

// (375:3) {#if flags.isInteractive}
function create_if_block_4$1(ctx) {
	let rect;
	let rect_height_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, height: true, width: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "sensor svelte-xezn7c");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[56]);
			attr_dev(rect, "width", /*innerWidth*/ ctx[7]);
			add_location(rect, file$c, 375, 3, 8752);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(rect, "mousedown", /*onMousedown*/ ctx[21], false, false, false),
					listen_dev(rect, "mouseenter", /*onMouseenter*/ ctx[20](/*index*/ ctx[65]), false, false, false),
					listen_dev(rect, "mouseleave", /*onMouseleave*/ ctx[24](/*index*/ ctx[65]), false, false, false),
					listen_dev(
						rect,
						"mousemove",
						function () {
							if (is_function(/*isMousedown*/ ctx[5]
							? /*onMousemove*/ ctx[22](/*index*/ ctx[65])
							: null)) (/*isMousedown*/ ctx[5]
							? /*onMousemove*/ ctx[22](/*index*/ ctx[65])
							: null).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(rect, "mouseup", /*onMouseup*/ ctx[23](/*index*/ ctx[65]), false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*bars*/ 16384 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[56])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*innerWidth*/ 128) {
				attr_dev(rect, "width", /*innerWidth*/ ctx[7]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$1.name,
		type: "if",
		source: "(375:3) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (343:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }
function create_each_block_1$2(ctx) {
	let g;
	let text_1;
	let t_value = /*displayValue*/ ctx[57] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;
	let text_1_text_anchor_value;
	let g_transform_value;
	let if_block0 = /*displayValue*/ ctx[57] && create_if_block_5$1(ctx);
	let if_block1 = /*flags*/ ctx[0].isInteractive && create_if_block_4$1(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			if (if_block0) if_block0.c();
			text_1 = svg_element("text");
			t = text(t_value);
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);
			if (if_block0) if_block0.l(g_nodes);

			text_1 = claim_element(
				g_nodes,
				"text",
				{
					class: true,
					x: true,
					y: true,
					"font-size": true,
					"text-anchor": true
				},
				1
			);

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			if (if_block1) if_block1.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "binsize svelte-xezn7c");
			attr_dev(text_1, "x", text_1_x_value = /*labelX*/ ctx[60]);
			attr_dev(text_1, "y", text_1_y_value = /*barThickness*/ ctx[56] / 2);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			attr_dev(text_1, "text-anchor", text_1_text_anchor_value = /*labelAnchor*/ ctx[59]);
			add_location(text_1, file$c, 367, 3, 8573);
			attr_dev(g, "class", "bin svelte-xezn7c");
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*y1*/ ctx[63] + ")");
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
			if (/*displayValue*/ ctx[57]) {
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

			if (dirty[0] & /*bars*/ 16384 && t_value !== (t_value = /*displayValue*/ ctx[57] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*bars*/ 16384 && text_1_x_value !== (text_1_x_value = /*labelX*/ ctx[60])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*bars*/ 16384 && text_1_y_value !== (text_1_y_value = /*barThickness*/ ctx[56] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 32768) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			}

			if (dirty[0] & /*bars*/ 16384 && text_1_text_anchor_value !== (text_1_text_anchor_value = /*labelAnchor*/ ctx[59])) {
				attr_dev(text_1, "text-anchor", text_1_text_anchor_value);
			}

			if (/*flags*/ ctx[0].isInteractive) {
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

			if (dirty[0] & /*bars*/ 16384 && g_transform_value !== (g_transform_value = "translate(0," + /*y1*/ ctx[63] + ")")) {
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
		block,
		id: create_each_block_1$2.name,
		type: "each",
		source: "(343:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }",
		ctx
	});

	return block;
}

// (396:3) {#if !flags.hideOrigin}
function create_if_block_3$3(ctx) {
	let circle;
	let circle_r_value;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_element(nodes, "circle", { r: true, class: true }, 1);
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "r", circle_r_value = /*geometry*/ ctx[1].originRadius);
			attr_dev(circle, "class", "svelte-xezn7c");
			add_location(circle, file$c, 396, 3, 9232);
		},
		m: function mount(target, anchor) {
			insert_dev(target, circle, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*geometry*/ 2 && circle_r_value !== (circle_r_value = /*geometry*/ ctx[1].originRadius)) {
				attr_dev(circle, "r", circle_r_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$3.name,
		type: "if",
		source: "(396:3) {#if !flags.hideOrigin}",
		ctx
	});

	return block;
}

// (399:3) {#if !flags.hideTicks}
function create_if_block_2$4(ctx) {
	let each_1_anchor;
	let each_value = /*ticks*/ ctx[12];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticksX, ticks, fontSize, ticksAnchor*/ 39936) {
				each_value = /*ticks*/ ctx[12];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_if_block_2$4.name,
		type: "if",
		source: "(399:3) {#if !flags.hideTicks}",
		ctx
	});

	return block;
}

// (400:3) {#each ticks as {tick, y}}
function create_each_block$6(ctx) {
	let text_1;
	let t_value = /*tick*/ ctx[51] + "";
	let t;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_element(
				nodes,
				"text",
				{
					class: true,
					x: true,
					y: true,
					"font-size": true,
					"text-anchor": true
				},
				1
			);

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "range svelte-xezn7c");
			attr_dev(text_1, "x", /*ticksX*/ ctx[10]);
			attr_dev(text_1, "y", text_1_y_value = /*y*/ ctx[52]);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[11]);
			add_location(text_1, file$c, 400, 3, 9336);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 4096 && t_value !== (t_value = /*tick*/ ctx[51] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*ticksX*/ 1024) {
				attr_dev(text_1, "x", /*ticksX*/ ctx[10]);
			}

			if (dirty[0] & /*ticks*/ 4096 && text_1_y_value !== (text_1_y_value = /*y*/ ctx[52])) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 32768) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			}

			if (dirty[0] & /*ticksAnchor*/ 2048) {
				attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[11]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$6.name,
		type: "each",
		source: "(400:3) {#each ticks as {tick, y}}",
		ctx
	});

	return block;
}

// (411:2) {#if isBrushing}
function create_if_block_1$7(ctx) {
	let g;
	let line;
	let line_y__value;
	let line_y__value_1;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);
			line = claim_element(g_nodes, "line", { y1: true, y2: true, class: true }, 1);
			children(line).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y1", line_y__value = /*brushLine*/ ctx[17].y1);
			attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ ctx[17].y2);
			attr_dev(line, "class", "svelte-xezn7c");
			add_location(line, file$c, 415, 3, 9568);
			attr_dev(g, "class", "brush svelte-xezn7c");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*origin*/ ctx[9].x + ",0)");
			add_location(g, file$c, 411, 2, 9504);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, line);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 131072 && line_y__value !== (line_y__value = /*brushLine*/ ctx[17].y1)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*brushLine*/ 131072 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ ctx[17].y2)) {
				attr_dev(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*origin*/ 512 && g_transform_value !== (g_transform_value = "translate(" + /*origin*/ ctx[9].x + ",0)")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$7.name,
		type: "if",
		source: "(411:2) {#if isBrushing}",
		ctx
	});

	return block;
}

function create_fragment$i(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[3] && /*width*/ ctx[4] && /*scales*/ ctx[13] && create_if_block$9(ctx);

	const block = {
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
			if (/*height*/ ctx[3] && /*width*/ ctx[4] && /*scales*/ ctx[13]) {
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
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props, $$invalidate) {
	let $brush;
	const dispatch = createEventDispatcher();
	const makeMaxBarThickness = arrayMaxWith(getKey$3("barThickness"));

	const defaultFlags = {
		hideOrigin: false,
		hideTicks: false,
		isInteractive: false,
		isRightToLeft: false,
		isTopDown: false,
		useLogScale: false,
		withBackground: false
	};

	const defaultGeometry = {
		// exposed but undocumented on the site
		brushThreshold: 10, // pixels to trigger brushing
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

	const defaultTheme = {
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

	let { bins } = $$props;
	let { binsFill } = $$props;
	let { flags } = $$props;
	let { geometry } = $$props;
	let { height } = $$props; // required
	let { selectedBins } = $$props;
	let { theme } = $$props;
	let { ticksFormatFn } = $$props;
	let { width } = $$props; // required
	let rangesExtent = [];

	/* brushing */
	let isMousedown = false;

	const brushOff = {
		delta: 0,
		end: null,
		origin: { x: null, y: null },
		start: null,
		modifier: null,
		state: "Off"
	};

	const brush = writable(brushOff);
	validate_store(brush, "brush");
	component_subscribe($$self, brush, value => $$invalidate(36, $brush = value));

	/* events */
	const getModifier = event => event.shiftKey ? "shift" : event.altKey ? "alt" : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			brush.update(mergeObj({ end: index }));
		}

		dispatch("entered", index);
	};

	const onMousedown = event => {
		$$invalidate(5, isMousedown = true);

		brush.set({
			delta: 0,
			modifier: getModifier(event),
			origin: { x: event.offsetX, y: event.offsetY },
			state: "Pressed"
		});
	};

	const onMousemove = index => event => {
		if (isPressed) {
			const delta = vectorLength2D(event.offsetX - $brush.origin.x, event.offsetY - $brush.origin.y);

			if (delta > geometry.brushThreshold) {
				brush.update(mergeObj({
					end: index,
					start: index,
					state: "Brushing"
				}));

				dispatch("brushstart", index);
			} else {
				brush.update(mergeObj({ delta }));
			}
		}
	};

	const onMouseup = index => () => {
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

				dispatch("clicked", { index, selectedBins });
			}
		} else if (isBrushing) {
			dispatch("brushend", index);
		}

		brush.set(brushOff);
	};

	const onMouseleave = index => () => {
		dispatch("exited", index);
	};

	const resetSelection = () => {
		$$invalidate(2, selectedBins = []);
		dispatch("clicked", { selectedBins });
	};

	const writable_props = [
		"bins",
		"binsFill",
		"flags",
		"geometry",
		"height",
		"selectedBins",
		"theme",
		"ticksFormatFn",
		"width"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HistogramG> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("HistogramG", $$slots, []);

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		createEventDispatcher,
		writable,
		makeStyleVars,
		vectorLength2D,
		arrayMaxWith,
		concat,
		getValue,
		inclusiveRange,
		mergeObj,
		scaleLinear: linear$1,
		scaleLog: log,
		appendTo,
		getKey: getKey$3,
		has,
		last,
		pullFrom,
		sort,
		uniques,
		getBinsTicks,
		getValuesLength,
		dispatch,
		makeMaxBarThickness,
		defaultFlags,
		defaultGeometry,
		defaultTheme,
		bins,
		binsFill,
		flags,
		geometry,
		height,
		selectedBins,
		theme,
		ticksFormatFn,
		width,
		rangesExtent,
		isMousedown,
		brushOff,
		brush,
		getModifier,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetSelection,
		safety,
		innerWidth,
		innerHeight,
		origin,
		direction,
		ticksX,
		ticksAnchor,
		ticks,
		scales,
		useValue,
		getBinsMax,
		valuesMax,
		bars,
		maxBarThickness,
		fontSize,
		isBrushing,
		$brush,
		isPressed,
		doesBrushAdd,
		doesBrushRemove,
		brushStroke,
		brushExtent,
		brushRange,
		brushExtentBarYs,
		brushLine,
		style
	});

	$$self.$inject_state = $$props => {
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

	let safety;
	let innerWidth;
	let innerHeight;
	let origin;
	let direction;
	let ticksX;
	let ticksAnchor;
	let ticks;
	let useValue;
	let getBinsMax;
	let valuesMax;
	let scales;
	let bars;
	let maxBarThickness;
	let fontSize;
	let isBrushing;
	let isPressed;
	let doesBrushAdd;
	let doesBrushRemove;
	let brushStroke;
	let brushExtent;
	let brushRange;
	let brushExtentBarYs;
	let brushLine;
	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*bins*/ 67108864) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(26, bins = bins || []);
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 $$invalidate(0, flags = flags ? { ...defaultFlags, ...flags } : defaultFlags);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			 $$invalidate(1, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*selectedBins*/ 4) {
			 $$invalidate(2, selectedBins = selectedBins || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728) {
			 $$invalidate(27, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn*/ 268435456) {
			 $$invalidate(28, ticksFormatFn = ticksFormatFn || (x => x));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags*/ 3) {
			 $$invalidate(6, safety = {
				top: geometry.safetyY,
				right: flags.isRightToLeft
				? flags.hideTicks
					? geometry.safetyXNoTicks
					: geometry.safetyXTicks
				: geometry.safetyXValues,
				bottom: geometry.safetyY,
				left: flags.isRightToLeft
				? geometry.safetyXValues
				: flags.hideTicks
					? geometry.safetyXNoTicks
					: geometry.safetyXTicks
			});
		}

		if ($$self.$$.dirty[0] & /*width, safety*/ 80) {
			 $$invalidate(7, innerWidth = Math.max(0, width - safety.left - safety.right));
		}

		if ($$self.$$.dirty[0] & /*height, safety, geometry*/ 74) {
			 $$invalidate(8, innerHeight = Math.max(0, height - safety.top - safety.bottom - geometry.maxFontSize));
		}

		if ($$self.$$.dirty[0] & /*flags, innerWidth, innerHeight*/ 385) {
			 $$invalidate(9, origin = {
				x: flags.isRightToLeft ? innerWidth : 0,
				y: flags.isTopDown ? 0 : innerHeight
			});
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 direction = {
				x: flags.isRightToLeft ? -1 : 1,
				y: flags.isTopDown ? 1 : -1
			};
		}

		if ($$self.$$.dirty[0] & /*flags, geometry*/ 3) {
			 $$invalidate(10, ticksX = flags.isRightToLeft
			? geometry.originRadius + geometry.textPadding
			: -(geometry.originRadius + geometry.textPadding));
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 $$invalidate(11, ticksAnchor = flags.isRightToLeft ? "start" : "end");
		}

		if ($$self.$$.dirty[0] & /*bins*/ 67108864) {
			 $$invalidate(32, useValue = bins.length && has(bins[0], "value"));
		}

		if ($$self.$$.dirty[1] & /*useValue*/ 2) {
			 $$invalidate(33, getBinsMax = useValue
			? arrayMaxWith(getValue)
			: arrayMaxWith(getValuesLength));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 67108864 | $$self.$$.dirty[1] & /*getBinsMax*/ 4) {
			 $$invalidate(34, valuesMax = getBinsMax(bins));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 67108864) {
			 $$invalidate(30, rangesExtent = bins.length
			? [bins[0].range[0], last(bins).range[1]]
			: []);
		}

		if ($$self.$$.dirty[0] & /*bins, flags, innerWidth, rangesExtent, innerHeight*/ 1140851073 | $$self.$$.dirty[1] & /*valuesMax*/ 8) {
			/* eslint-disable indent */
			 $$invalidate(13, scales = bins.length && {
				x: flags.useLogScale
				? log().domain([1, valuesMax]).range([innerWidth / Math.log10(valuesMax), innerWidth])
				: linear$1().domain([0, valuesMax]).range([0, innerWidth]),
				y: linear$1().domain(rangesExtent).range([0, innerHeight])
			});
		}

		if ($$self.$$.dirty[0] & /*bins, ticksFormatFn, flags, scales*/ 335552513) {
			 $$invalidate(12, ticks = getBinsTicks(bins).map(tick => ({
				tick: ticksFormatFn(tick),
				y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
			})));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 32) {
			 $$invalidate(16, isBrushing = $brush.state === "Brushing");
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 32) {
			 $$invalidate(38, doesBrushAdd = $brush.modifier === "shift");
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 65536 | $$self.$$.dirty[1] & /*$brush*/ 32) {
			 $$invalidate(41, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 65536 | $$self.$$.dirty[1] & /*brushExtent*/ 1024) {
			 $$invalidate(42, brushRange = isBrushing && inclusiveRange(brushExtent));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 32) {
			 $$invalidate(39, doesBrushRemove = $brush.modifier === "alt");
		}

		if ($$self.$$.dirty[0] & /*isBrushing, selectedBins*/ 65540 | $$self.$$.dirty[1] & /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/ 2464) {
			 if (isBrushing) {
				$$invalidate(2, selectedBins = doesBrushAdd
				? uniques(concat(selectedBins, brushRange))
				: doesBrushRemove
					? pullFrom(selectedBins, brushRange)
					: brushRange);

				dispatch("brushed", {
					end: $brush.end,
					selectedBins,
					start: $brush.start
				});
			}
		}

		if ($$self.$$.dirty[0] & /*bins, selectedBins, scales, flags, innerWidth, innerHeight, geometry, binsFill, theme*/ 738206087) {
			/* eslint-enable indent */
			 $$invalidate(14, bars = bins.map((bin, index) => {
				const { range, values, value } = bin;
				const selected = selectedBins.length && selectedBins.includes(index);
				const displayValue = values ? values.length : value;
				const barLength = scales.x(displayValue);
				const barThickness = scales.y(range[1]) - scales.y(range[0]);
				const x = flags.isRightToLeft ? innerWidth - barLength : 0;

				const y1 = flags.isTopDown
				? scales.y(range[0])
				: innerHeight - scales.y(range[0]) - barThickness;

				const y2 = y1 + barThickness;

				const labelX = flags.isRightToLeft
				? x - geometry.textPadding
				: barLength + geometry.textPadding;

				const labelAnchor = flags.isRightToLeft ? "end" : "start";

				const fill = bin.color || (binsFill && binsFill[index]
				? binsFill[index]
				: theme.binFill);

				return {
					...bin,
					...{
						barLength,
						barThickness,
						displayValue,
						fill,
						labelAnchor,
						labelX,
						selected,
						x,
						y1,
						y2
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*bars*/ 16384) {
			 $$invalidate(35, maxBarThickness = makeMaxBarThickness(bars));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2 | $$self.$$.dirty[1] & /*maxBarThickness*/ 16) {
			 $$invalidate(15, fontSize = Math.min(geometry.maxFontSize, geometry.fontSizeFactor * maxBarThickness));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 32) {
			 isPressed = $brush.state === "Pressed";
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728 | $$self.$$.dirty[1] & /*doesBrushAdd, doesBrushRemove*/ 384) {
			 $$invalidate(40, brushStroke = doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove ? theme.brushRemoveStroke : null);
		}

		if ($$self.$$.dirty[0] & /*isBrushing, bars*/ 81920 | $$self.$$.dirty[1] & /*brushExtent*/ 1024) {
			 $$invalidate(43, brushExtentBarYs = isBrushing && sort([
				bars[brushExtent[0]].y1,
				bars[brushExtent[0]].y2,
				bars[brushExtent[1]].y1,
				bars[brushExtent[1]].y2
			]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 65536 | $$self.$$.dirty[1] & /*brushExtentBarYs*/ 4096) {
			 $$invalidate(17, brushLine = isBrushing && {
				y1: brushExtentBarYs[0],
				y2: brushExtentBarYs[3]
			});
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728 | $$self.$$.dirty[1] & /*brushStroke*/ 512) {
			/* style */
			 $$invalidate(18, style = makeStyleVars({ ...theme, brushStroke }));
		}
	};

	return [
		flags,
		geometry,
		selectedBins,
		height,
		width,
		isMousedown,
		safety,
		innerWidth,
		innerHeight,
		origin,
		ticksX,
		ticksAnchor,
		ticks,
		scales,
		bars,
		fontSize,
		isBrushing,
		brushLine,
		style,
		brush,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetSelection,
		bins,
		theme,
		ticksFormatFn,
		binsFill
	];
}

class HistogramG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$i,
			create_fragment$i,
			safe_not_equal,
			{
				bins: 26,
				binsFill: 29,
				flags: 0,
				geometry: 1,
				height: 3,
				selectedBins: 2,
				theme: 27,
				ticksFormatFn: 28,
				width: 4
			},
			[-1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HistogramG",
			options,
			id: create_fragment$i.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*bins*/ ctx[26] === undefined && !("bins" in props)) {
			console.warn("<HistogramG> was created without expected prop 'bins'");
		}

		if (/*binsFill*/ ctx[29] === undefined && !("binsFill" in props)) {
			console.warn("<HistogramG> was created without expected prop 'binsFill'");
		}

		if (/*flags*/ ctx[0] === undefined && !("flags" in props)) {
			console.warn("<HistogramG> was created without expected prop 'flags'");
		}

		if (/*geometry*/ ctx[1] === undefined && !("geometry" in props)) {
			console.warn("<HistogramG> was created without expected prop 'geometry'");
		}

		if (/*height*/ ctx[3] === undefined && !("height" in props)) {
			console.warn("<HistogramG> was created without expected prop 'height'");
		}

		if (/*selectedBins*/ ctx[2] === undefined && !("selectedBins" in props)) {
			console.warn("<HistogramG> was created without expected prop 'selectedBins'");
		}

		if (/*theme*/ ctx[27] === undefined && !("theme" in props)) {
			console.warn("<HistogramG> was created without expected prop 'theme'");
		}

		if (/*ticksFormatFn*/ ctx[28] === undefined && !("ticksFormatFn" in props)) {
			console.warn("<HistogramG> was created without expected prop 'ticksFormatFn'");
		}

		if (/*width*/ ctx[4] === undefined && !("width" in props)) {
			console.warn("<HistogramG> was created without expected prop 'width'");
		}
	}

	get bins() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get binsFill() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set binsFill(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get height() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramDiv.svelte generated by Svelte v3.24.0 */
const file$d = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramDiv.svelte";

// (33:1) {#if title}
function create_if_block_1$8(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-4i00u3");
			add_location(h2, file$d, 34, 2, 676);
			attr_dev(header, "class", "svelte-4i00u3");
			toggle_class(header, "rightToLeft", /*flags*/ ctx[3] && /*flags*/ ctx[3].isRightToLeft);
			add_location(header, file$d, 33, 1, 616);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);

			if (dirty & /*flags*/ 8) {
				toggle_class(header, "rightToLeft", /*flags*/ ctx[3] && /*flags*/ ctx[3].isRightToLeft);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$8.name,
		type: "if",
		source: "(33:1) {#if title}",
		ctx
	});

	return block;
}

// (47:3) {#if bins}
function create_if_block$a(ctx) {
	let histogramg;
	let current;

	histogramg = new HistogramG({
			props: {
				bins: /*bins*/ ctx[1],
				binsFill: /*binsFill*/ ctx[2],
				flags: /*flags*/ ctx[3],
				geometry: /*geometry*/ ctx[4],
				height: /*height*/ ctx[8],
				selectedBins: /*selectedBins*/ ctx[5],
				theme: /*theme*/ ctx[6],
				ticksFormatFn: /*ticksFormatFn*/ ctx[7],
				width: /*width*/ ctx[9]
			},
			$$inline: true
		});

	histogramg.$on("brushed", /*brushed_handler*/ ctx[13]);
	histogramg.$on("brushend", /*brushend_handler*/ ctx[14]);
	histogramg.$on("brushstart", /*brushstart_handler*/ ctx[15]);
	histogramg.$on("clicked", /*clicked_handler*/ ctx[16]);
	histogramg.$on("entered", /*entered_handler*/ ctx[17]);
	histogramg.$on("exited", /*exited_handler*/ ctx[18]);

	const block = {
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
			const histogramg_changes = {};
			if (dirty & /*bins*/ 2) histogramg_changes.bins = /*bins*/ ctx[1];
			if (dirty & /*binsFill*/ 4) histogramg_changes.binsFill = /*binsFill*/ ctx[2];
			if (dirty & /*flags*/ 8) histogramg_changes.flags = /*flags*/ ctx[3];
			if (dirty & /*geometry*/ 16) histogramg_changes.geometry = /*geometry*/ ctx[4];
			if (dirty & /*height*/ 256) histogramg_changes.height = /*height*/ ctx[8];
			if (dirty & /*selectedBins*/ 32) histogramg_changes.selectedBins = /*selectedBins*/ ctx[5];
			if (dirty & /*theme*/ 64) histogramg_changes.theme = /*theme*/ ctx[6];
			if (dirty & /*ticksFormatFn*/ 128) histogramg_changes.ticksFormatFn = /*ticksFormatFn*/ ctx[7];
			if (dirty & /*width*/ 512) histogramg_changes.width = /*width*/ ctx[9];
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
		block,
		id: create_if_block$a.name,
		type: "if",
		source: "(47:3) {#if bins}",
		ctx
	});

	return block;
}

function create_fragment$j(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let main_resize_listener;
	let current;
	let if_block0 = /*title*/ ctx[0] && create_if_block_1$8(ctx);
	let if_block1 = /*bins*/ ctx[1] && create_if_block$a(ctx);

	const block = {
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
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_element(main_nodes, "svg", { width: true, height: true, class: true }, 1);
			var svg_nodes = children(svg);
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[9]);
			attr_dev(svg, "height", /*height*/ ctx[8]);
			attr_dev(svg, "class", "svelte-4i00u3");
			add_location(svg, file$d, 42, 2, 818);
			attr_dev(main, "class", "svelte-4i00u3");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[19].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$d, 37, 1, 712);
			attr_dev(div, "class", "HistogramDiv svelte-4i00u3");
			attr_dev(div, "style", /*style*/ ctx[10]);
			toggle_class(div, "interactive", /*flags*/ ctx[3] && /*flags*/ ctx[3].isInteractive);
			add_location(div, file$d, 27, 0, 514);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);
			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[19].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
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

			if (/*bins*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*bins*/ 2) {
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

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*width*/ 512) {
				attr_dev(svg, "width", /*width*/ ctx[9]);
			}

			if (!current || dirty & /*height*/ 256) {
				attr_dev(svg, "height", /*height*/ ctx[8]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 1024) {
				attr_dev(div, "style", /*style*/ ctx[10]);
			}

			if (dirty & /*flags*/ 8) {
				toggle_class(div, "interactive", /*flags*/ ctx[3] && /*flags*/ ctx[3].isInteractive);
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
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props, $$invalidate) {
	let { headerHeight } = $$props;
	let { padding } = $$props;
	let { title } = $$props;
	let { bins } = $$props;
	let { binsFill } = $$props;
	let { flags } = $$props;
	let { geometry } = $$props;
	let { selectedBins } = $$props;
	let { theme } = $$props;
	let { ticksFormatFn } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		"headerHeight",
		"padding",
		"title",
		"bins",
		"binsFill",
		"flags",
		"geometry",
		"selectedBins",
		"theme",
		"ticksFormatFn"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HistogramDiv> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
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

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		makeStyleVars,
		HistogramG,
		headerHeight,
		padding,
		title,
		bins,
		binsFill,
		flags,
		geometry,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
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

	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 4096) {
			 $$invalidate(12, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 2048) {
			 $$invalidate(11, headerHeight = headerHeight || "2rem");
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 6144) {
			 $$invalidate(10, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		bins,
		binsFill,
		flags,
		geometry,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style,
		headerHeight,
		padding,
		brushed_handler,
		brushend_handler,
		brushstart_handler,
		clicked_handler,
		entered_handler,
		exited_handler,
		main_elementresize_handler
	];
}

class HistogramDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
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
			component: this,
			tagName: "HistogramDiv",
			options,
			id: create_fragment$j.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[11] === undefined && !("headerHeight" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[12] === undefined && !("padding" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'padding'");
		}

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'title'");
		}

		if (/*bins*/ ctx[1] === undefined && !("bins" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'bins'");
		}

		if (/*binsFill*/ ctx[2] === undefined && !("binsFill" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'binsFill'");
		}

		if (/*flags*/ ctx[3] === undefined && !("flags" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'flags'");
		}

		if (/*geometry*/ ctx[4] === undefined && !("geometry" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'geometry'");
		}

		if (/*selectedBins*/ ctx[5] === undefined && !("selectedBins" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'selectedBins'");
		}

		if (/*theme*/ ctx[6] === undefined && !("theme" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'theme'");
		}

		if (/*ticksFormatFn*/ ctx[7] === undefined && !("ticksFormatFn" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'ticksFormatFn'");
		}
	}

	get headerHeight() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get binsFill() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set binsFill(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

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

var components = {
	...barchart,
	...choropleth,
	...histogram,
	...legend,
};

/* src/routes/components/[slug].svelte generated by Svelte v3.24.0 */
const file$e = "src/routes/components/[slug].svelte";

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i][0];
	child_ctx[23] = list[i][1];
	return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i][0];
	child_ctx[27] = list[i][1];
	return child_ctx;
}

function get_each_context_2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i].key;
	child_ctx[31] = i;
	return child_ctx;
}

// (73:2) {#if data.length > 1}
function create_if_block_2$5(ctx) {
	let div1;
	let h2;
	let t0;
	let t1;
	let div0;
	let select;
	let select_size_value;
	let mounted;
	let dispose;
	let each_value_2 = /*data*/ ctx[0];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			h2 = element("h2");
			t0 = text("Choose an example");
			t1 = space();
			div0 = element("div");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h2 = claim_element(div1_nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Choose an example");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			select = claim_element(div0_nodes, "SELECT", { size: true, class: true });
			var select_nodes = children(select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(select_nodes);
			}

			select_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file$e, 74, 3, 1698);
			attr_dev(select, "size", select_size_value = /*data*/ ctx[0].length);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			if (!mounted) {
				dispose = listen_dev(select, "change", /*change_handler*/ ctx[15], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selected, data*/ 1025) {
				each_value_2 = /*data*/ ctx[0];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}

			if (dirty[0] & /*data*/ 1 && select_size_value !== (select_size_value = /*data*/ ctx[0].length)) {
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
		block,
		id: create_if_block_2$5.name,
		type: "if",
		source: "(73:2) {#if data.length > 1}",
		ctx
	});

	return block;
}

// (82:5) {#each data as {key}
function create_each_block_2$1(ctx) {
	let option;
	let t_value = /*key*/ ctx[26] + "";
	let t;
	let option_value_value;
	let option_selected_value;

	const block = {
		c: function create() {
			option = element("option");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			option = claim_element(nodes, "OPTION", { value: true, selected: true, class: true });
			var option_nodes = children(option);
			t = claim_text(option_nodes, t_value);
			option_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			option.__value = option_value_value = /*index*/ ctx[31];
			option.value = option.__value;
			option.selected = option_selected_value = /*index*/ ctx[31] === /*selected*/ ctx[10];
			attr_dev(option, "class", "svelte-1gqqmmb");
			add_location(option, file$e, 82, 5, 1943);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*data*/ 1 && t_value !== (t_value = /*key*/ ctx[26] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*selected*/ 1024 && option_selected_value !== (option_selected_value = /*index*/ ctx[31] === /*selected*/ ctx[10])) {
				prop_dev(option, "selected", option_selected_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2$1.name,
		type: "each",
		source: "(82:5) {#each data as {key}",
		ctx
	});

	return block;
}

// (94:2) {#if payloads}
function create_if_block_1$9(ctx) {
	let h2;
	let t0;
	let t1;
	let div;
	let each_value_1 = pairs$1(/*payloads*/ ctx[8]);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text("Events");
			t1 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Events");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*payloads*/ 256) {
				each_value_1 = pairs$1(/*payloads*/ ctx[8]);
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
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
		block,
		id: create_if_block_1$9.name,
		type: "if",
		source: "(94:2) {#if payloads}",
		ctx
	});

	return block;
}

// (97:3) {#each _.pairs(payloads) as [key, value]}
function create_each_block_1$3(ctx) {
	let div;
	let span;
	let t0_value = /*key*/ ctx[26] + "";
	let t0;
	let t1;
	let pre;
	let t2_value = (/*value*/ ctx[27] || "[payload]") + "";
	let t2;
	let t3;

	const block = {
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
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, t0_value);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			pre = claim_element(div_nodes, "PRE", { class: true });
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
			if (dirty[0] & /*payloads*/ 256 && t0_value !== (t0_value = /*key*/ ctx[26] + "")) set_data_dev(t0, t0_value);
			if (dirty[0] & /*payloads*/ 256 && t2_value !== (t2_value = (/*value*/ ctx[27] || "[payload]") + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$3.name,
		type: "each",
		source: "(97:3) {#each _.pairs(payloads) as [key, value]}",
		ctx
	});

	return block;
}

// (115:3) {#each displayProps as [propName, propValue]}
function create_each_block$7(ctx) {
	let h3;
	let code;
	let t0_value = /*propName*/ ctx[22] + "";
	let t0;
	let t1;
	let div;
	let jsontree;
	let t2;
	let current;

	jsontree = new Root({
			props: { value: /*propValue*/ ctx[23] },
			$$inline: true
		});

	const block = {
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
			div = claim_element(nodes, "DIV", { class: true });
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
			if ((!current || dirty[0] & /*displayProps*/ 4096) && t0_value !== (t0_value = /*propName*/ ctx[22] + "")) set_data_dev(t0, t0_value);
			const jsontree_changes = {};
			if (dirty[0] & /*displayProps*/ 4096) jsontree_changes.value = /*propValue*/ ctx[23];
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
		block,
		id: create_each_block$7.name,
		type: "each",
		source: "(115:3) {#each displayProps as [propName, propValue]}",
		ctx
	});

	return block;
}

// (138:2) {:else}
function create_else_block$2(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*current_data*/ ctx[11].props];
	var switch_value = /*component*/ ctx[9];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
		/*switch_instance_binding_1*/ ctx[18](switch_instance);
	}

	const block = {
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
			const switch_instance_changes = (dirty[0] & /*current_data*/ 2048)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*current_data*/ ctx[11].props)])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[9])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					/*switch_instance_binding_1*/ ctx[18](switch_instance);
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
			/*switch_instance_binding_1*/ ctx[18](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(138:2) {:else}",
		ctx
	});

	return block;
}

// (125:2) {#if isSVG}
function create_if_block$b(ctx) {
	let div;
	let svg;
	let switch_instance;
	let div_resize_listener;
	let current;

	const switch_instance_spread_levels = [
		{
			.../*current_data*/ ctx[11].props,
			width: /*width*/ ctx[5],
			height: /*height*/ ctx[6]
		}
	];

	var switch_value = /*component*/ ctx[9];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
		/*switch_instance_binding*/ ctx[16](switch_instance);
	}

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_element(div_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);
			if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[5]);
			attr_dev(svg, "height", /*height*/ ctx[6]);
			add_location(svg, file$e, 129, 3, 2814);
			attr_dev(div, "class", "svgwrapper svelte-1gqqmmb");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[17].call(div));
			add_location(div, file$e, 125, 2, 2721);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);

			if (switch_instance) {
				mount_component(switch_instance, svg, null);
			}

			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[17].bind(div));
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*current_data, width, height*/ 2144)
			? get_spread_update(switch_instance_spread_levels, [
					{
						.../*current_data*/ ctx[11].props,
						width: /*width*/ ctx[5],
						height: /*height*/ ctx[6]
					}
				])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[9])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					/*switch_instance_binding*/ ctx[16](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, svg, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*width*/ 32) {
				attr_dev(svg, "width", /*width*/ ctx[5]);
			}

			if (!current || dirty[0] & /*height*/ 64) {
				attr_dev(svg, "height", /*height*/ ctx[6]);
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
			/*switch_instance_binding*/ ctx[16](null);
			if (switch_instance) destroy_component(switch_instance);
			div_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$b.name,
		type: "if",
		source: "(125:2) {#if isSVG}",
		ctx
	});

	return block;
}

function create_fragment$k(ctx) {
	let title_value;
	let t0;
	let main;
	let h1;
	let t1;
	let t2;
	let div3;
	let div0;
	let elements;
	let t3;
	let t4;
	let t5;
	let div1;
	let h20;
	let t6;
	let t7;
	let pre;
	let t8_value = /*current_data*/ ctx[11].usage + "";
	let t8;
	let t9;
	let div2;
	let h21;
	let t10;
	let t11;
	let t12;
	let div4;
	let current_block_type_index;
	let if_block2;
	let current;
	document.title = title_value = "" + (/*name*/ ctx[2] + ": " + /*title*/ ctx[3] + " - Svizzle");

	elements = new Elements({
			props: { elements: /*doc*/ ctx[1] },
			$$inline: true
		});

	let if_block0 = /*data*/ ctx[0].length > 1 && create_if_block_2$5(ctx);
	let if_block1 = /*payloads*/ ctx[8] && create_if_block_1$9(ctx);
	let each_value = /*displayProps*/ ctx[12];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const if_block_creators = [create_if_block$b, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isSVG*/ ctx[7]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			t0 = space();
			main = element("main");
			h1 = element("h1");
			t1 = text(/*title*/ ctx[3]);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t12 = space();
			div4 = element("div");
			if_block2.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1sqseen\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			h1 = claim_element(main_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*title*/ ctx[3]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(main_nodes);
			div3 = claim_element(main_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div0 = claim_element(div3_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(elements.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div3_nodes);
			if (if_block0) if_block0.l(div3_nodes);
			t4 = claim_space(div3_nodes);
			if (if_block1) if_block1.l(div3_nodes);
			t5 = claim_space(div3_nodes);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h20 = claim_element(div1_nodes, "H2", {});
			var h20_nodes = children(h20);
			t6 = claim_text(h20_nodes, "Usage");
			h20_nodes.forEach(detach_dev);
			t7 = claim_space(div1_nodes);
			pre = claim_element(div1_nodes, "PRE", { class: true });
			var pre_nodes = children(pre);
			t8 = claim_text(pre_nodes, t8_value);
			pre_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t9 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			h21 = claim_element(div2_nodes, "H2", {});
			var h21_nodes = children(h21);
			t10 = claim_text(h21_nodes, "Props");
			h21_nodes.forEach(detach_dev);
			t11 = claim_space(div2_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div2_nodes);
			}

			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t12 = claim_space(main_nodes);
			div4 = claim_element(main_nodes, "DIV", { class: true });
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			append_dev(main, t12);
			append_dev(main, div4);
			if_blocks[current_block_type_index].m(div4, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty[0] & /*name, title*/ 12) && title_value !== (title_value = "" + (/*name*/ ctx[2] + ": " + /*title*/ ctx[3] + " - Svizzle"))) {
				document.title = title_value;
			}

			if (!current || dirty[0] & /*title*/ 8) set_data_dev(t1, /*title*/ ctx[3]);
			const elements_changes = {};
			if (dirty[0] & /*doc*/ 2) elements_changes.elements = /*doc*/ ctx[1];
			elements.$set(elements_changes);

			if (/*data*/ ctx[0].length > 1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2$5(ctx);
					if_block0.c();
					if_block0.m(div3, t4);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*payloads*/ ctx[8]) {
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

			if ((!current || dirty[0] & /*current_data*/ 2048) && t8_value !== (t8_value = /*current_data*/ ctx[11].usage + "")) set_data_dev(t8, t8_value);

			if (dirty[0] & /*displayProps*/ 4096) {
				each_value = /*displayProps*/ ctx[12];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div2, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
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

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(elements.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
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
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function preload({ params, query }) {
	return lookup[params.slug];
}

function instance_1($$self, $$props, $$invalidate) {
	const makeKeyedEmptyString = makeKeyed("");
	let { data } = $$props;
	let { doc } = $$props;
	let { events } = $$props;
	let { name } = $$props;
	let { namespace } = $$props;
	let { title } = $$props;
	let instance;
	let width;
	let height;

	const makeEventHandler = eventName => event => {
		$$invalidate(8, payloads = setIn(payloads, eventName, JSON.stringify(event.detail)));
	};

	let eventRemovers = [];
	const writable_props = ["data", "doc", "events", "name", "namespace", "title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("U5Bslugu5D", $$slots, []);

	const change_handler = event => {
		$$invalidate(10, selected = Number(event.target.value));
	};

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
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
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			instance = $$value;
			$$invalidate(4, instance);
		});
	}

	$$self.$set = $$props => {
		if ("data" in $$props) $$invalidate(0, data = $$props.data);
		if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
		if ("events" in $$props) $$invalidate(14, events = $$props.events);
		if ("name" in $$props) $$invalidate(2, name = $$props.name);
		if ("namespace" in $$props) $$invalidate(13, namespace = $$props.namespace);
		if ("title" in $$props) $$invalidate(3, title = $$props.title);
	};

	$$self.$capture_state = () => ({
		lookup,
		preload,
		_,
		makeKeyed,
		JSONTree: Root,
		Elements,
		components,
		makeKeyedEmptyString,
		data,
		doc,
		events,
		name,
		namespace,
		title,
		instance,
		width,
		height,
		makeEventHandler,
		eventRemovers,
		isSVG,
		payloads,
		component,
		selected,
		current_data,
		displayProps
	});

	$$self.$inject_state = $$props => {
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

	let isSVG;
	let payloads;
	let component;
	let selected;
	let current_data;
	let displayProps;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*namespace*/ 8192) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(13, namespace = namespace || "html");
		}

		if ($$self.$$.dirty[0] & /*namespace*/ 8192) {
			 $$invalidate(7, isSVG = namespace === "svg");
		}

		if ($$self.$$.dirty[0] & /*events*/ 16384) {
			 $$invalidate(8, payloads = events ? makeKeyedEmptyString(events) : null);
		}

		if ($$self.$$.dirty[0] & /*name*/ 4) {
			 $$invalidate(9, component = components[name]);
		}

		if ($$self.$$.dirty[0] & /*data*/ 1) {
			 $$invalidate(10, selected = data && 0);
		}

		if ($$self.$$.dirty[0] & /*data, selected*/ 1025) {
			 $$invalidate(11, current_data = data[selected]);
		}

		if ($$self.$$.dirty[0] & /*current_data*/ 2048) {
			 $$invalidate(12, displayProps = pairs$1(current_data.props));
		}

		if ($$self.$$.dirty[0] & /*data, instance, eventRemovers, events*/ 540689) {
			 if (data && instance) {
				eventRemovers.forEach(remove => remove());
				$$invalidate(19, eventRemovers = []);

				events && events.forEach(eventName => {
					const eventHandler = makeEventHandler(eventName);
					const eventRemover = instance.$on(eventName, eventHandler);
					eventRemovers.push(eventRemover);
				});
			}
		}
	};

	return [
		data,
		doc,
		name,
		title,
		instance,
		width,
		height,
		isSVG,
		payloads,
		component,
		selected,
		current_data,
		displayProps,
		namespace,
		events,
		change_handler,
		switch_instance_binding,
		div_elementresize_handler,
		switch_instance_binding_1
	];
}

class U5Bslugu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance_1,
			create_fragment$k,
			safe_not_equal,
			{
				data: 0,
				doc: 1,
				events: 14,
				name: 2,
				namespace: 13,
				title: 3
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment$k.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'data'");
		}

		if (/*doc*/ ctx[1] === undefined && !("doc" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'doc'");
		}

		if (/*events*/ ctx[14] === undefined && !("events" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'events'");
		}

		if (/*name*/ ctx[2] === undefined && !("name" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'name'");
		}

		if (/*namespace*/ ctx[13] === undefined && !("namespace" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'namespace'");
		}

		if (/*title*/ ctx[3] === undefined && !("title" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'title'");
		}
	}

	get data() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get doc() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set doc(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get events() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set events(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get namespace() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set namespace(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bslugu5D;
export { preload };
