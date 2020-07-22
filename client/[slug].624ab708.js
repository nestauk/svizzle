import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, b as detach_dev, j as attr_dev, y as toggle_class, k as add_location, l as insert_dev, m as append_dev, A as listen_dev, n as noop$1, B as bubble, z as set_data_dev, C as empty, D as getContext, E as setContext, F as create_component, G as claim_component, H as mount_component, w as transition_in, x as transition_out, I as destroy_component, a as space, c as claim_space, J as group_outros, K as check_outros, o as validate_each_argument, r as destroy_each, L as globals, M as null_to_empty, N as validate_each_keys, O as createEventDispatcher, P as beforeUpdate, Q as afterUpdate, R as svg_element, T as is_function, U as run_all, V as add_render_callback, W as add_resize_listener, X as update_keyed_each, Y as binding_callbacks, Z as destroy_block, _ as set_style, $ as validate_store, a0 as component_subscribe, a1 as writable, a2 as prop_dev, q as query_selector_all, a3 as assign, a4 as get_spread_update, a5 as get_spread_object } from './client.618a260b.js';
import { p as pipe, i as isNotNull, r as reduceWith, g as getKey$3, c as collect, h as head, l as last, a as isUndefined, b as range, d as appendTo, e as sortWith, f as sorterDesc, j as apply, m as make, k as identity$2, n as mapWith, o as always, q as generic, t as allOf, u as isGTE, v as isLTE, w as partial, _ as __, x as transformer$1, y as copy, z as initRange, A as ticks, B as format, C as skipIf, D as isNil, E as pairs$1, F as index, G as updateKey, H as has, I as getPath, J as sort, K as adapter, L as map, M as reduce, N as isNotNil, O as isIterableNotEmpty, P as every, Q as hasKey, R as flatten, S as findIndexWhere, T as findLastIndexWhere, U as slice, V as uniques, W as filterWith, X as concat, Y as mergeObj, Z as linear$1, $ as pullFrom, a0 as lookup, a1 as _, a2 as setIn } from './_utils.92a11824.js';

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
	collect([identity$2, mapWith(always(value))]),
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
  var scale = loggish(transformer$1()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, log()).base(scale.base());
  };

  initRange.apply(scale, arguments);

  return scale;
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

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte generated by Svelte v3.24.0 */
const file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartVDiv.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
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
}

// (174:1) {#if title}
function create_if_block_1$3(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[3]);
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
			if (dirty[0] & /*title*/ 8) set_data_dev(t, /*title*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(174:1) {#if title}",
		ctx
	});

	return block;
}

// (189:4) {#each bars as {      barColor,      bkgColor,      displayValue,      dxKey,      isNeg,      key,      label,      x,      xValue,     }
function create_each_block$3(key_1, ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let line;
	let line_stroke_value;
	let line_x__value;
	let text0;
	let t0_value = /*label*/ ctx[51] + "";
	let t0;
	let text0_dx_value;
	let text1;
	let t1_value = /*displayValue*/ ctx[47] + "";
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
					y2: true
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
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "fill", rect_fill_value = /*bkgColor*/ ctx[46]);
			attr_dev(rect, "height", /*itemHeight*/ ctx[9]);
			add_location(rect, file$7, 207, 5, 4840);
			attr_dev(line, "stroke", line_stroke_value = /*barColor*/ ctx[45]);
			attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			attr_dev(line, "x1", /*x0*/ ctx[14]);
			attr_dev(line, "x2", line_x__value = /*x*/ ctx[52]);
			attr_dev(line, "y1", /*barY*/ ctx[10]);
			attr_dev(line, "y2", /*barY*/ ctx[10]);
			add_location(line, file$7, 212, 5, 4921);
			attr_dev(text0, "class", "key svelte-79144u");
			attr_dev(text0, "dx", text0_dx_value = /*dxKey*/ ctx[48]);
			attr_dev(text0, "x", /*x0*/ ctx[14]);
			attr_dev(text0, "y", /*textY*/ ctx[11]);
			toggle_class(text0, "neg", /*isNeg*/ ctx[49]);
			add_location(text0, file$7, 220, 5, 5054);
			attr_dev(text1, "class", "value svelte-79144u");
			attr_dev(text1, "x", text1_x_value = /*xValue*/ ctx[53]);
			attr_dev(text1, "y", /*textY*/ ctx[11]);
			toggle_class(text1, "neg", /*isNeg*/ ctx[49]);
			add_location(text1, file$7, 227, 5, 5174);
			attr_dev(g, "class", "item svelte-79144u");
			attr_dev(g, "transform", g_transform_value = "translate(0, " + /*itemHeight*/ ctx[9] * /*index*/ ctx[55] + ")");
			toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
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
				dispose = [
					listen_dev(
						g,
						"click",
						function () {
							if (is_function(/*onClick*/ ctx[16](/*key*/ ctx[50]))) /*onClick*/ ctx[16](/*key*/ ctx[50]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseenter",
						function () {
							if (is_function(/*onMouseenter*/ ctx[17](/*key*/ ctx[50]))) /*onMouseenter*/ ctx[17](/*key*/ ctx[50]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseleave",
						function () {
							if (is_function(/*onMouseleave*/ ctx[18](/*key*/ ctx[50]))) /*onMouseleave*/ ctx[18](/*key*/ ctx[50]).apply(this, arguments);
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

			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*bars*/ 32768 && rect_fill_value !== (rect_fill_value = /*bkgColor*/ ctx[46])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*itemHeight*/ 512) {
				attr_dev(rect, "height", /*itemHeight*/ ctx[9]);
			}

			if (dirty[0] & /*bars*/ 32768 && line_stroke_value !== (line_stroke_value = /*barColor*/ ctx[45])) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*barHeight*/ 1) {
				attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			}

			if (dirty[0] & /*x0*/ 16384) {
				attr_dev(line, "x1", /*x0*/ ctx[14]);
			}

			if (dirty[0] & /*bars*/ 32768 && line_x__value !== (line_x__value = /*x*/ ctx[52])) {
				attr_dev(line, "x2", line_x__value);
			}

			if (dirty[0] & /*barY*/ 1024) {
				attr_dev(line, "y1", /*barY*/ ctx[10]);
			}

			if (dirty[0] & /*barY*/ 1024) {
				attr_dev(line, "y2", /*barY*/ ctx[10]);
			}

			if (dirty[0] & /*bars*/ 32768 && t0_value !== (t0_value = /*label*/ ctx[51] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*bars*/ 32768 && text0_dx_value !== (text0_dx_value = /*dxKey*/ ctx[48])) {
				attr_dev(text0, "dx", text0_dx_value);
			}

			if (dirty[0] & /*x0*/ 16384) {
				attr_dev(text0, "x", /*x0*/ ctx[14]);
			}

			if (dirty[0] & /*textY*/ 2048) {
				attr_dev(text0, "y", /*textY*/ ctx[11]);
			}

			if (dirty[0] & /*bars*/ 32768) {
				toggle_class(text0, "neg", /*isNeg*/ ctx[49]);
			}

			if (dirty[0] & /*bars*/ 32768 && t1_value !== (t1_value = /*displayValue*/ ctx[47] + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*bars*/ 32768 && text1_x_value !== (text1_x_value = /*xValue*/ ctx[53])) {
				attr_dev(text1, "x", text1_x_value);
			}

			if (dirty[0] & /*textY*/ 2048) {
				attr_dev(text1, "y", /*textY*/ ctx[11]);
			}

			if (dirty[0] & /*bars*/ 32768) {
				toggle_class(text1, "neg", /*isNeg*/ ctx[49]);
			}

			if (dirty[0] & /*itemHeight, bars*/ 33280 && g_transform_value !== (g_transform_value = "translate(0, " + /*itemHeight*/ ctx[9] * /*index*/ ctx[55] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}

			if (dirty[0] & /*isInteractive*/ 2) {
				toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
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
		id: create_each_block$3.name,
		type: "each",
		source: "(189:4) {#each bars as {      barColor,      bkgColor,      displayValue,      dxKey,      isNeg,      key,      label,      x,      xValue,     }",
		ctx
	});

	return block;
}

// (237:3) {#if crossesZero}
function create_if_block$4(ctx) {
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
			attr_dev(line, "x1", /*x0*/ ctx[14]);
			attr_dev(line, "x2", /*x0*/ ctx[14]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[12]);
			add_location(line, file$7, 237, 3, 5338);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*theme*/ 4 && line_stroke_value !== (line_stroke_value = /*theme*/ ctx[2].axisColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*x0*/ 16384) {
				attr_dev(line, "x1", /*x0*/ ctx[14]);
			}

			if (dirty[0] & /*x0*/ 16384) {
				attr_dev(line, "x2", /*x0*/ ctx[14]);
			}

			if (dirty[0] & /*svgHeight*/ 4096) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[12]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(237:3) {#if crossesZero}",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let rect;
	let g;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let main_resize_listener;
	let mounted;
	let dispose;
	let if_block0 = /*title*/ ctx[3] && create_if_block_1$3(ctx);
	let each_value = /*bars*/ ctx[15];
	validate_each_argument(each_value);
	const get_key = ctx => /*key*/ ctx[50];
	validate_each_keys(ctx, each_value, get_each_context$3, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$3(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
	}

	let if_block1 = /*crossesZero*/ ctx[13] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			main = element("main");
			svg = svg_element("svg");
			rect = svg_element("rect");
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true, class: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_element(main_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);
			rect = claim_element(svg_nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			g = claim_element(svg_nodes, "g", {}, 1);
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
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
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "height", /*svgHeight*/ ctx[12]);
			add_location(rect, file$7, 186, 3, 4396);
			add_location(g, file$7, 187, 3, 4447);
			attr_dev(svg, "width", /*width*/ ctx[6]);
			attr_dev(svg, "height", /*svgHeight*/ ctx[12]);
			add_location(svg, file$7, 185, 2, 4360);
			attr_dev(main, "class", "svelte-79144u");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[29].call(main));
			toggle_class(main, "titled", /*title*/ ctx[3]);
			add_location(main, file$7, 178, 1, 4201);
			attr_dev(div, "style", /*style*/ ctx[8]);
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

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[29].bind(main));
			/*main_binding*/ ctx[30](main);

			if (!mounted) {
				dispose = listen_dev(main, "mouseleave", /*mouseleave_handler*/ ctx[31], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*title*/ ctx[3]) {
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

			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*svgHeight*/ 4096) {
				attr_dev(rect, "height", /*svgHeight*/ ctx[12]);
			}

			if (dirty[0] & /*itemHeight, bars, isInteractive, onClick, onMouseenter, onMouseleave, textY, x0, barHeight, barY, width*/ 511555) {
				const each_value = /*bars*/ ctx[15];
				validate_each_argument(each_value);
				validate_each_keys(ctx, each_value, get_each_context$3, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, g, destroy_block, create_each_block$3, null, get_each_context$3);
			}

			if (/*crossesZero*/ ctx[13]) {
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

			if (dirty[0] & /*width*/ 64) {
				attr_dev(svg, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*svgHeight*/ 4096) {
				attr_dev(svg, "height", /*svgHeight*/ ctx[12]);
			}

			if (dirty[0] & /*title*/ 8) {
				toggle_class(main, "titled", /*title*/ ctx[3]);
			}

			if (dirty[0] & /*style*/ 256) {
				attr_dev(div, "style", /*style*/ ctx[8]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block1) if_block1.d();
			main_resize_listener();
			/*main_binding*/ ctx[30](null);
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

	const defaultTheme = {
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

	let { barHeight } = $$props;
	let { focusedKey } = $$props;
	let { formatFn } = $$props;
	let { isInteractive } = $$props;
	let { items } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { keyToLabel } = $$props;
	let { keyToLabelFn } = $$props;
	let { shouldResetScroll } = $$props;
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
		$$invalidate(33, wasNotResettingScroll = !shouldResetScroll);
	});

	/* events */
	const onClick = key => () => {
		isInteractive && dispatch("clicked", { id: key });
	};

	const onMouseenter = key => () => {
		isInteractive && dispatch("entered", { id: key });
		$$invalidate(5, hoveredKey = key);
	};

	const onMouseleave = key => () => {
		isInteractive && dispatch("exited", { id: key });
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
		"shouldResetScroll",
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

	function main_elementresize_handler() {
		width = this.clientWidth;
		height = this.clientHeight;
		$$invalidate(6, width);
		$$invalidate(4, height);
	}

	function main_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			scrollable = $$value;
			(((($$invalidate(7, scrollable), $$invalidate(23, items)), $$invalidate(19, shouldResetScroll)), $$invalidate(32, previousItems)), $$invalidate(33, wasNotResettingScroll));
		});
	}

	const mouseleave_handler = () => {
		$$invalidate(5, hoveredKey = null);
	};

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		isEqual: justCompare,
		index,
		afterUpdate,
		beforeUpdate,
		createEventDispatcher,
		linearScale: linear,
		makeStyleVars,
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		dispatch,
		transparentColor,
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
		shouldResetScroll,
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
		focusedY
	});

	$$self.$inject_state = $$props => {
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

		if ($$self.$$.dirty[0] & /*shouldResetScroll*/ 524288) {
			 $$invalidate(19, shouldResetScroll = shouldResetScroll || false);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(2, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 1048576) {
			 $$invalidate(20, valueAccessor = valueAccessor || getValue);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(8, style = makeStyleVars(theme));
		}

		if ($$self.$$.dirty[0] & /*theme*/ 4) {
			 $$invalidate(34, barPadding = theme.fontSize / 2);
		}

		if ($$self.$$.dirty[0] & /*theme, barHeight*/ 5 | $$self.$$.dirty[1] & /*barPadding*/ 8) {
			 $$invalidate(9, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 513 | $$self.$$.dirty[1] & /*barPadding*/ 8) {
			 $$invalidate(10, barY = itemHeight - barPadding - barHeight / 2);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 513 | $$self.$$.dirty[1] & /*barPadding*/ 8) {
			 $$invalidate(11, textY = itemHeight - barHeight - 2 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, items*/ 8389120) {
			 $$invalidate(12, svgHeight = itemHeight * items.length);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 1048576) {
			 $$invalidate(35, getMin = arrayMinWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 1048576) {
			 $$invalidate(36, getMax = arrayMaxWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*items*/ 8388608 | $$self.$$.dirty[1] & /*getMin*/ 16) {
			 $$invalidate(37, min = getMin(items));
		}

		if ($$self.$$.dirty[0] & /*items*/ 8388608 | $$self.$$.dirty[1] & /*getMax*/ 32) {
			 $$invalidate(38, max = getMax(items));
		}

		if ($$self.$$.dirty[1] & /*min, max*/ 192) {
			 $$invalidate(13, crossesZero = Math.sign(min) !== Math.sign(max));
		}

		if ($$self.$$.dirty[0] & /*crossesZero*/ 8192 | $$self.$$.dirty[1] & /*min, max*/ 192) {
			 $$invalidate(39, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
		}

		if ($$self.$$.dirty[0] & /*width*/ 64 | $$self.$$.dirty[1] & /*domain*/ 256) {
			 $$invalidate(40, getX = linear(domain, [0, width]));
		}

		if ($$self.$$.dirty[1] & /*getX*/ 512) {
			 $$invalidate(14, x0 = getX(0));
		}

		if ($$self.$$.dirty[0] & /*items, valueAccessor, keyToColor, theme, keyToColorFn, focusedKey, hoveredKey, formatFn, crossesZero, keyToLabel, keyToLabelFn, width, itemHeight*/ 267395684 | $$self.$$.dirty[1] & /*barPadding, getX*/ 520) {
			 $$invalidate(15, bars = items.map((item, idx) => {
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
						x: getX(value),
						xValue: value > 0 ? width : 0,
						y: (idx + 1) * itemHeight, // bottom of the item rect
						
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*bars*/ 32768) {
			 $$invalidate(41, barsByKey = index(bars, getKey));
		}

		if ($$self.$$.dirty[0] & /*items, shouldResetScroll*/ 8912896 | $$self.$$.dirty[1] & /*previousItems*/ 2) {
			 afterUpdate(() => {
				if (items && shouldResetScroll && !justCompare(previousItems, items)) {
					$$invalidate(7, scrollable.scrollTop = 0, scrollable);
					$$invalidate(32, previousItems = items);
				}
			});
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll, scrollable*/ 524416 | $$self.$$.dirty[1] & /*wasNotResettingScroll*/ 4) {
			 if (wasNotResettingScroll && shouldResetScroll && scrollable) {
				$$invalidate(7, scrollable.scrollTop = 0, scrollable);
			}
		}

		if ($$self.$$.dirty[0] & /*shouldScrollToFocusedKey, focusedKey*/ 270532608 | $$self.$$.dirty[1] & /*barsByKey*/ 1024) {
			 $$invalidate(42, focusedY = shouldScrollToFocusedKey && focusedKey && barsByKey[focusedKey] && barsByKey[focusedKey].y);
		}

		if ($$self.$$.dirty[0] & /*shouldScrollToFocusedKey, focusedKey, scrollable, itemHeight, height*/ 270533264 | $$self.$$.dirty[1] & /*focusedY*/ 2048) {
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
		title,
		height,
		hoveredKey,
		width,
		scrollable,
		style,
		itemHeight,
		barY,
		textY,
		svgHeight,
		crossesZero,
		x0,
		bars,
		onClick,
		onMouseenter,
		onMouseleave,
		shouldResetScroll,
		valueAccessor,
		focusedKey,
		formatFn,
		items,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		shouldScrollToFocusedKey,
		main_elementresize_handler,
		main_binding,
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
			},
			[-1, -1]
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

		if (/*focusedKey*/ ctx[21] === undefined && !("focusedKey" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'focusedKey'");
		}

		if (/*formatFn*/ ctx[22] === undefined && !("formatFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'formatFn'");
		}

		if (/*isInteractive*/ ctx[1] === undefined && !("isInteractive" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'isInteractive'");
		}

		if (/*items*/ ctx[23] === undefined && !("items" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'items'");
		}

		if (/*keyToColor*/ ctx[24] === undefined && !("keyToColor" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[25] === undefined && !("keyToColorFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToColorFn'");
		}

		if (/*keyToLabel*/ ctx[26] === undefined && !("keyToLabel" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToLabel'");
		}

		if (/*keyToLabelFn*/ ctx[27] === undefined && !("keyToLabelFn" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'keyToLabelFn'");
		}

		if (/*shouldResetScroll*/ ctx[19] === undefined && !("shouldResetScroll" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'shouldResetScroll'");
		}

		if (/*shouldScrollToFocusedKey*/ ctx[28] === undefined && !("shouldScrollToFocusedKey" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'shouldScrollToFocusedKey'");
		}

		if (/*theme*/ ctx[2] === undefined && !("theme" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'theme'");
		}

		if (/*title*/ ctx[3] === undefined && !("title" in props)) {
			console.warn("<BarchartVDiv> was created without expected prop 'title'");
		}

		if (/*valueAccessor*/ ctx[20] === undefined && !("valueAccessor" in props)) {
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

	get shouldResetScroll() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldResetScroll(value) {
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

function geoObject(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
      : feature(topology, o);
}

function feature(topology, o) {
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

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

function adder() {
  return new Adder;
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
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
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
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
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

function geoStream(object, stream) {
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
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function compose(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}

function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
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
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

function rotation(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  };

  return forward;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
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
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

function clipBuffer() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
function clipRejoin(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
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
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
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
  if (abs(point[0]) <= pi)
    return point[0];
  else
    return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}

function polygonContains(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin(phi),
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  sum.reset();

  if (sinPhi === 1) phi = halfPi + epsilon;
  else if (sinPhi === -1) phi = -halfPi - epsilon;

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
      angle += antimeridian ? delta + sign * tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
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
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum < -epsilon) ^ (winding & 1);
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);

function merge(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
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

function clip(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
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
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
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
      sphere: function() {
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
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon
      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
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

function clipCircle(radius) {
  var cr = cos(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
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
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
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
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
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

function clipLine(a, b, x0, y0, x1, y1) {
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

var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
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
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
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
    }

    // TODO rather than special-case polygons, simply handle them separately.
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
        if (v && v_) activeStream.point(x, y);
        else {
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

function identity$1(x) {
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
  result: function() {
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
    x0$2,
    y0$2;

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
  centroidPoint(x0$2 = x, y0$2 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$2, dy = y - y0$2, z = sqrt(dx * dx + dy * dy);
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
    x0$3,
    y0$3;

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
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
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

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
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
  return fit(projection, function(b) {
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
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
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
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
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
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
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
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
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
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = clipAntimeridian, // pre-clip angle
      x0 = null, y0, x1, y1, postclip = identity$1, // post-clip extent
      delta2 = 0.5, // precision
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

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$1) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
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

  return function() {
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

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin(y0), n = (sy0 + sin(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin(y)) / n;
    return [r * sin(x *= n), r0 - r * cos(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y,
        l = atan2(x, abs(r0y)) * sign(r0y);
    if (r0y * n < 0)
      l -= pi * sign(x) * sign(r0y);
    return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

function conicEqualArea() {
  return conicProjection(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
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

function mercatorRaw(lambda, phi) {
  return [lambda, log$1(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

function mercator() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau);
}

function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
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
    if (f > 0) { if (y < -halfPi + epsilon) y = -halfPi + epsilon; }
    else { if (y > halfPi - epsilon) y = halfPi - epsilon; }
    var r = f / pow(tany(y), n);
    return [r * sin(n * x), f - r * cos(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy),
      l = atan2(x, abs(fy)) * sign(fy);
    if (fy * n < 0)
      l -= pi * sign(x) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };

  return project;
}

function conicConformal() {
  return conicProjection(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function equirectangular() {
  return projection(equirectangularRaw)
      .scale(152.63);
}

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : (cy0 - cos(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs(n) < epsilon) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin(nx), g - gy * cos(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y,
        l = atan2(x, abs(gy)) * sign(gy);
    if (gy * n < 0)
      l -= pi * sign(x) * sign(gy);
    return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}

function conicEquidistant() {
  return conicProjection(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
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

function gnomonicRaw(x, y) {
  var cy = cos(y), k = cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

gnomonicRaw.invert = azimuthalInvert(atan);

function gnomonic() {
  return projection(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
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

function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

function orthographic() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon);
}

function stereographicRaw(x, y) {
  var cy = cos(y), k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

function stereographic() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}

function transverseMercatorRaw(lambda, phi) {
  return [log$1(tan((halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi];
};

function transverseMercator() {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
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
function feature$1(geom, properties, options) {
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

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte generated by Svelte v3.24.0 */
const file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethG.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[34] = list[i];
	return child_ctx;
}

// (94:0) {#if height && width}
function create_if_block$5(ctx) {
	let g1;
	let rect;
	let g0;
	let g0_transform_value;
	let if_block = /*coloredGeojson*/ ctx[7] && create_if_block_1$4(ctx);

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
			attr_dev(rect, "class", "bkg svelte-12ajc17");
			add_location(rect, file$8, 99, 1, 2844);
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*geometry*/ ctx[0].left + "," + /*geometry*/ ctx[0].top + ")");
			add_location(g0, file$8, 104, 1, 2890);
			attr_dev(g1, "style", /*style*/ ctx[6]);
			attr_dev(g1, "class", "ChoroplethG svelte-12ajc17");
			toggle_class(g1, "interactive", /*isInteractive*/ ctx[1]);
			add_location(g1, file$8, 94, 0, 2772);
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

			if (/*coloredGeojson*/ ctx[7]) {
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

			if (dirty[0] & /*style*/ 64) {
				attr_dev(g1, "style", /*style*/ ctx[6]);
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
		source: "(94:0) {#if height && width}",
		ctx
	});

	return block;
}

// (106:2) {#if coloredGeojson}
function create_if_block_1$4(ctx) {
	let each_1_anchor;
	let each_value = /*coloredGeojson*/ ctx[7].features;
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
			if (dirty[0] & /*coloredGeojson, key, key_alt, isDeselected, isSelected, geopath, isClickable, dispatch, getPayload, isInteractive*/ 16294) {
				each_value = /*coloredGeojson*/ ctx[7].features;
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
		source: "(106:2) {#if coloredGeojson}",
		ctx
	});

	return block;
}

// (107:2) {#each coloredGeojson.features as feature}
function create_each_block$4(ctx) {
	let g;
	let path;
	let path_d_value;
	let g_id_value;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[21](/*feature*/ ctx[34], ...args);
	}

	function mouseenter_handler(...args) {
		return /*mouseenter_handler*/ ctx[22](/*feature*/ ctx[34], ...args);
	}

	function mouseleave_handler(...args) {
		return /*mouseleave_handler*/ ctx[23](/*feature*/ ctx[34], ...args);
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
			attr_dev(path, "d", path_d_value = /*geopath*/ ctx[8](/*feature*/ ctx[34]));
			set_style(path, "fill", /*feature*/ ctx[34].properties.color || null);
			attr_dev(path, "class", "svelte-12ajc17");
			toggle_class(path, "clickable", /*isClickable*/ ctx[12](/*feature*/ ctx[34]));
			add_location(path, file$8, 113, 3, 3194);
			attr_dev(g, "class", "feature svelte-12ajc17");
			attr_dev(g, "id", g_id_value = /*feature*/ ctx[34].properties[/*key*/ ctx[5]] || /*feature*/ ctx[34].properties[/*key_alt*/ ctx[2]]);
			toggle_class(g, "deselected", /*isDeselected*/ ctx[11](/*feature*/ ctx[34]));
			toggle_class(g, "selected", /*isSelected*/ ctx[10](/*feature*/ ctx[34]));
			add_location(g, file$8, 107, 2, 3018);
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

			if (dirty[0] & /*geopath, coloredGeojson*/ 384 && path_d_value !== (path_d_value = /*geopath*/ ctx[8](/*feature*/ ctx[34]))) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty[0] & /*coloredGeojson*/ 128) {
				set_style(path, "fill", /*feature*/ ctx[34].properties.color || null);
			}

			if (dirty[0] & /*isClickable, coloredGeojson*/ 4224) {
				toggle_class(path, "clickable", /*isClickable*/ ctx[12](/*feature*/ ctx[34]));
			}

			if (dirty[0] & /*coloredGeojson, key, key_alt*/ 164 && g_id_value !== (g_id_value = /*feature*/ ctx[34].properties[/*key*/ ctx[5]] || /*feature*/ ctx[34].properties[/*key_alt*/ ctx[2]])) {
				attr_dev(g, "id", g_id_value);
			}

			if (dirty[0] & /*isDeselected, coloredGeojson*/ 2176) {
				toggle_class(g, "deselected", /*isDeselected*/ ctx[11](/*feature*/ ctx[34]));
			}

			if (dirty[0] & /*isSelected, coloredGeojson*/ 1152) {
				toggle_class(g, "selected", /*isSelected*/ ctx[10](/*feature*/ ctx[34]));
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
		source: "(107:2) {#each coloredGeojson.features as feature}",
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
	const truncateGeojson = setGeometryPrecision(4);
	const topoToGeo = (topojson, id) => truncateGeojson(geoObject(topojson, topojson.objects[id]));
	const defaultGeometry = { bottom: 10, left: 10, right: 10, top: 10 };

	const defaultTheme = {
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

	let { height } = $$props;
	let { topojson } = $$props;
	let { topojsonId } = $$props;
	let { width } = $$props;
	let { geometry } = $$props;
	let { isInteractive } = $$props;
	let { key_alt } = $$props;
	let { key } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projection } = $$props;
	let { selectedKeys } = $$props;
	let { theme } = $$props;

	const writable_props = [
		"height",
		"topojson",
		"topojsonId",
		"width",
		"geometry",
		"isInteractive",
		"key_alt",
		"key",
		"keyToColor",
		"keyToColorFn",
		"projection",
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

	$$self.$capture_state = () => ({
		createEventDispatcher,
		geoObject,
		geoPath,
		getPath,
		makeStyleVars,
		makeUpdateFeaturesProperty,
		setGeometryPrecision,
		isNotNullWith,
		projections,
		dispatch,
		hasColor,
		truncateGeojson,
		topoToGeo,
		defaultGeometry,
		defaultTheme,
		height,
		topojson,
		topojsonId,
		width,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projection,
		selectedKeys,
		theme,
		geojson,
		style,
		innerHeight,
		innerWidth,
		createColoredGeojson,
		coloredGeojson,
		fitProjection,
		geopath,
		getPayload,
		isSelected,
		isDeselected,
		isClickable
	});

	$$self.$inject_state = $$props => {
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

	let geojson;
	let style;
	let innerHeight;
	let innerWidth;
	let createColoredGeojson;
	let coloredGeojson;
	let fitProjection;
	let geopath;
	let getPayload;
	let isSelected;
	let isDeselected;
	let isClickable;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*topojson, topojsonId*/ 393216) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(24, geojson = topoToGeo(topojson, topojsonId));
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

		if ($$self.$$.dirty[0] & /*projection*/ 16384) {
			 $$invalidate(14, projection = projection && projections[projection] || equirectangular);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 32768) {
			 $$invalidate(15, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 65536) {
			 $$invalidate(16, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 65536) {
			 $$invalidate(6, style = makeStyleVars(theme));
		}

		if ($$self.$$.dirty[0] & /*height, geometry*/ 9) {
			 $$invalidate(25, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
		}

		if ($$self.$$.dirty[0] & /*width, geometry*/ 17) {
			 $$invalidate(26, innerWidth = Math.max(0, width - geometry.left - geometry.right));
		}

		if ($$self.$$.dirty[0] & /*key_alt, key, keyToColor, keyToColorFn*/ 1572900) {
			 $$invalidate(27, createColoredGeojson = makeUpdateFeaturesProperty({
				key_alt,
				key,
				map: keyToColor,
				mapFn: keyToColorFn,
				propName: "color"
			}));
		}

		if ($$self.$$.dirty[0] & /*geojson, createColoredGeojson*/ 150994944) {
			 $$invalidate(7, coloredGeojson = geojson && createColoredGeojson(geojson));
		}

		if ($$self.$$.dirty[0] & /*geojson, projection, innerWidth, innerHeight*/ 117456896) {
			 $$invalidate(28, fitProjection = geojson && projection().fitSize([innerWidth, innerHeight], geojson));
		}

		if ($$self.$$.dirty[0] & /*fitProjection*/ 268435456) {
			 $$invalidate(8, geopath = fitProjection && geoPath(fitProjection));
		}

		if ($$self.$$.dirty[0] & /*key, key_alt*/ 36) {
			 $$invalidate(9, getPayload = feature => feature.properties[key] || feature.properties[key_alt]);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 33280) {
			 $$invalidate(10, isSelected = feature => selectedKeys.length && selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 33280) {
			 $$invalidate(11, isDeselected = feature => selectedKeys.length && !selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 2) {
			 $$invalidate(12, isClickable = feature => isInteractive && hasColor(feature));
		}
	};

	return [
		geometry,
		isInteractive,
		key_alt,
		height,
		width,
		key,
		style,
		coloredGeojson,
		geopath,
		getPayload,
		isSelected,
		isDeselected,
		isClickable,
		dispatch,
		projection,
		selectedKeys,
		theme,
		topojson,
		topojsonId,
		keyToColor,
		keyToColorFn,
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

		if (/*topojson*/ ctx[17] === undefined && !("topojson" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'topojson'");
		}

		if (/*topojsonId*/ ctx[18] === undefined && !("topojsonId" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'topojsonId'");
		}

		if (/*width*/ ctx[4] === undefined && !("width" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'width'");
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

		if (/*key*/ ctx[5] === undefined && !("key" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'key'");
		}

		if (/*keyToColor*/ ctx[19] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[20] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'keyToColorFn'");
		}

		if (/*projection*/ ctx[14] === undefined && !("projection" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'projection'");
		}

		if (/*selectedKeys*/ ctx[15] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethG> was created without expected prop 'selectedKeys'");
		}

		if (/*theme*/ ctx[16] === undefined && !("theme" in props)) {
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

	get projection() {
		throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projection(value) {
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

// (39:1) {#if title}
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
		source: "(39:1) {#if title}",
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
				height: /*height*/ ctx[12],
				geometry: /*geometry*/ ctx[3],
				isInteractive: /*isInteractive*/ ctx[4],
				key: /*key*/ ctx[6],
				key_alt: /*key_alt*/ ctx[5],
				keyToColor: /*keyToColor*/ ctx[7],
				keyToColorFn: /*keyToColorFn*/ ctx[8],
				projection: /*projection*/ ctx[9],
				selectedKeys: /*selectedKeys*/ ctx[10],
				theme: /*theme*/ ctx[11],
				topojson: /*topojson*/ ctx[1],
				topojsonId: /*topojsonId*/ ctx[2],
				width: /*width*/ ctx[13]
			},
			$$inline: true
		});

	choroplethg.$on("clicked", /*clicked_handler*/ ctx[17]);
	choroplethg.$on("entered", /*entered_handler*/ ctx[18]);
	choroplethg.$on("exited", /*exited_handler*/ ctx[19]);

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
			attr_dev(svg, "width", /*width*/ ctx[13]);
			attr_dev(svg, "height", /*height*/ ctx[12]);
			attr_dev(svg, "class", "svelte-77ac80");
			add_location(svg, file$9, 48, 2, 901);
			attr_dev(main, "class", "svelte-77ac80");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[20].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$9, 43, 1, 795);
			attr_dev(div, "class", "ChoroplethDiv svelte-77ac80");
			attr_dev(div, "style", /*style*/ ctx[14]);
			toggle_class(div, "interactive", /*isInteractive*/ ctx[4]);
			add_location(div, file$9, 33, 0, 660);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);
			mount_component(choroplethg, svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[20].bind(main));
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
			if (dirty & /*height*/ 4096) choroplethg_changes.height = /*height*/ ctx[12];
			if (dirty & /*geometry*/ 8) choroplethg_changes.geometry = /*geometry*/ ctx[3];
			if (dirty & /*isInteractive*/ 16) choroplethg_changes.isInteractive = /*isInteractive*/ ctx[4];
			if (dirty & /*key*/ 64) choroplethg_changes.key = /*key*/ ctx[6];
			if (dirty & /*key_alt*/ 32) choroplethg_changes.key_alt = /*key_alt*/ ctx[5];
			if (dirty & /*keyToColor*/ 128) choroplethg_changes.keyToColor = /*keyToColor*/ ctx[7];
			if (dirty & /*keyToColorFn*/ 256) choroplethg_changes.keyToColorFn = /*keyToColorFn*/ ctx[8];
			if (dirty & /*projection*/ 512) choroplethg_changes.projection = /*projection*/ ctx[9];
			if (dirty & /*selectedKeys*/ 1024) choroplethg_changes.selectedKeys = /*selectedKeys*/ ctx[10];
			if (dirty & /*theme*/ 2048) choroplethg_changes.theme = /*theme*/ ctx[11];
			if (dirty & /*topojson*/ 2) choroplethg_changes.topojson = /*topojson*/ ctx[1];
			if (dirty & /*topojsonId*/ 4) choroplethg_changes.topojsonId = /*topojsonId*/ ctx[2];
			if (dirty & /*width*/ 8192) choroplethg_changes.width = /*width*/ ctx[13];
			choroplethg.$set(choroplethg_changes);

			if (!current || dirty & /*width*/ 8192) {
				attr_dev(svg, "width", /*width*/ ctx[13]);
			}

			if (!current || dirty & /*height*/ 4096) {
				attr_dev(svg, "height", /*height*/ ctx[12]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 16384) {
				attr_dev(div, "style", /*style*/ ctx[14]);
			}

			if (dirty & /*isInteractive*/ 16) {
				toggle_class(div, "interactive", /*isInteractive*/ ctx[4]);
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
	let { geometry } = $$props;
	let { isInteractive } = $$props;
	let { key_alt } = $$props;
	let { key } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projection } = $$props;
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
		"geometry",
		"isInteractive",
		"key_alt",
		"key",
		"keyToColor",
		"keyToColorFn",
		"projection",
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
		$$invalidate(13, width);
		$$invalidate(12, height);
	}

	$$self.$set = $$props => {
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

	$$self.$capture_state = () => ({
		makeStyleVars,
		ChoroplethG,
		headerHeight,
		padding,
		title,
		topojson,
		topojsonId,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projection,
		selectedKeys,
		theme,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
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

	let style;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 65536) {
			 $$invalidate(16, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 32768) {
			 $$invalidate(15, headerHeight = headerHeight || "2rem");
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 98304) {
			 $$invalidate(14, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		topojson,
		topojsonId,
		geometry,
		isInteractive,
		key_alt,
		key,
		keyToColor,
		keyToColorFn,
		projection,
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
			component: this,
			tagName: "ChoroplethDiv",
			options,
			id: create_fragment$f.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[15] === undefined && !("headerHeight" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[16] === undefined && !("padding" in props)) {
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

		if (/*geometry*/ ctx[3] === undefined && !("geometry" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'geometry'");
		}

		if (/*isInteractive*/ ctx[4] === undefined && !("isInteractive" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
		}

		if (/*key_alt*/ ctx[5] === undefined && !("key_alt" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'key_alt'");
		}

		if (/*key*/ ctx[6] === undefined && !("key" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'key'");
		}

		if (/*keyToColor*/ ctx[7] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[8] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
		}

		if (/*projection*/ ctx[9] === undefined && !("projection" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'projection'");
		}

		if (/*selectedKeys*/ ctx[10] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
		}

		if (/*theme*/ ctx[11] === undefined && !("theme" in props)) {
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

	get projection() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projection(value) {
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
	accessor = identity$2,
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

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte generated by Svelte v3.24.0 */
const file$a = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramG.svelte";

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[50] = list[i].tick;
	child_ctx[51] = list[i].y;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[54] = list[i].barLength;
	child_ctx[55] = list[i].barThickness;
	child_ctx[56] = list[i].displayValue;
	child_ctx[57] = list[i].fill;
	child_ctx[58] = list[i].labelAnchor;
	child_ctx[59] = list[i].labelX;
	child_ctx[60] = list[i].selected;
	child_ctx[61] = list[i].x;
	child_ctx[62] = list[i].y1;
	child_ctx[64] = i;
	return child_ctx;
}

// (315:0) {#if height && width && scales}
function create_if_block$7(ctx) {
	let g2;
	let g1;
	let g0;
	let line;
	let line_y__value;
	let if_block1_anchor;
	let g0_transform_value;
	let g1_transform_value;
	let if_block0 = /*flags*/ ctx[0].withBackground && create_if_block_6(ctx);
	let each_value_1 = /*bars*/ ctx[13];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let if_block1 = !/*flags*/ ctx[0].hideOrigin && create_if_block_3$1(ctx);
	let if_block2 = !/*flags*/ ctx[0].hideTicks && create_if_block_2$2(ctx);
	let if_block3 = /*isBrushing*/ ctx[15] && create_if_block_1$5(ctx);

	const block = {
		c: function create() {
			g2 = svg_element("g");
			if (if_block0) if_block0.c();
			g1 = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			g0 = svg_element("g");
			line = svg_element("line");
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			if (if_block2) if_block2.c();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			g2 = claim_element(nodes, "g", { class: true, style: true }, 1);
			var g2_nodes = children(g2);
			if (if_block0) if_block0.l(g2_nodes);
			g1 = claim_element(g2_nodes, "g", { transform: true }, 1);
			var g1_nodes = children(g1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g1_nodes);
			}

			g0 = claim_element(g1_nodes, "g", { class: true, transform: true }, 1);
			var g0_nodes = children(g0);
			line = claim_element(g0_nodes, "line", { y2: true, class: true }, 1);
			children(line).forEach(detach_dev);
			if (if_block1) if_block1.l(g0_nodes);
			if_block1_anchor = empty();
			if (if_block2) if_block2.l(g0_nodes);
			g0_nodes.forEach(detach_dev);
			if (if_block3) if_block3.l(g1_nodes);
			g1_nodes.forEach(detach_dev);
			g2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y2", line_y__value = /*flags*/ ctx[0].isTopDown
			? /*innerHeight*/ ctx[7]
			: -/*innerHeight*/ ctx[7]);

			attr_dev(line, "class", "svelte-1oon2s6");
			add_location(line, file$a, 374, 3, 8821);
			attr_dev(g0, "class", "axis svelte-1oon2s6");
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*origin*/ ctx[8].x + "," + /*origin*/ ctx[8].y + ")");
			add_location(g0, file$a, 370, 2, 8749);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*safety*/ ctx[5].left + "," + /*safety*/ ctx[5].top + ")");
			add_location(g1, file$a, 323, 1, 7855);
			attr_dev(g2, "class", "HistogramG svelte-1oon2s6");
			attr_dev(g2, "style", /*style*/ ctx[17]);
			toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
			add_location(g2, file$a, 315, 0, 7705);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g2, anchor);
			if (if_block0) if_block0.m(g2, null);
			append_dev(g2, g1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g1, null);
			}

			append_dev(g1, g0);
			append_dev(g0, line);
			if (if_block1) if_block1.m(g0, null);
			append_dev(g0, if_block1_anchor);
			if (if_block2) if_block2.m(g0, null);
			if (if_block3) if_block3.m(g1, null);
		},
		p: function update(ctx, dirty) {
			if (/*flags*/ ctx[0].withBackground) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_6(ctx);
					if_block0.c();
					if_block0.m(g2, g1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*bars, innerWidth, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags, fontSize*/ 16277585) {
				each_value_1 = /*bars*/ ctx[13];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g1, g0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty[0] & /*flags, innerHeight*/ 129 && line_y__value !== (line_y__value = /*flags*/ ctx[0].isTopDown
			? /*innerHeight*/ ctx[7]
			: -/*innerHeight*/ ctx[7])) {
				attr_dev(line, "y2", line_y__value);
			}

			if (!/*flags*/ ctx[0].hideOrigin) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3$1(ctx);
					if_block1.c();
					if_block1.m(g0, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!/*flags*/ ctx[0].hideTicks) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2$2(ctx);
					if_block2.c();
					if_block2.m(g0, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*origin*/ 256 && g0_transform_value !== (g0_transform_value = "translate(" + /*origin*/ ctx[8].x + "," + /*origin*/ ctx[8].y + ")")) {
				attr_dev(g0, "transform", g0_transform_value);
			}

			if (/*isBrushing*/ ctx[15]) {
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

			if (dirty[0] & /*safety*/ 32 && g1_transform_value !== (g1_transform_value = "translate(" + /*safety*/ ctx[5].left + "," + /*safety*/ ctx[5].top + ")")) {
				attr_dev(g1, "transform", g1_transform_value);
			}

			if (dirty[0] & /*style*/ 131072) {
				attr_dev(g2, "style", /*style*/ ctx[17]);
			}

			if (dirty[0] & /*flags*/ 1) {
				toggle_class(g2, "interactive", /*flags*/ ctx[0].isInteractive);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g2);
			if (if_block0) if_block0.d();
			destroy_each(each_blocks, detaching);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(315:0) {#if height && width && scales}",
		ctx
	});

	return block;
}

// (321:1) {#if flags.withBackground}
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
			attr_dev(rect, "class", "bkg svelte-1oon2s6");
			attr_dev(rect, "width", /*width*/ ctx[3]);
			attr_dev(rect, "height", /*height*/ ctx[2]);
			add_location(rect, file$a, 321, 1, 7809);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*width*/ 8) {
				attr_dev(rect, "width", /*width*/ ctx[3]);
			}

			if (dirty[0] & /*height*/ 4) {
				attr_dev(rect, "height", /*height*/ ctx[2]);
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
		source: "(321:1) {#if flags.withBackground}",
		ctx
	});

	return block;
}

// (340:3) {#if displayValue}
function create_if_block_5(ctx) {
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
			attr_dev(rect, "fill", rect_fill_value = /*fill*/ ctx[57]);
			attr_dev(rect, "x", rect_x_value = /*x*/ ctx[61]);
			attr_dev(rect, "class", "bar svelte-1oon2s6");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[55]);
			attr_dev(rect, "width", rect_width_value = /*barLength*/ ctx[54]);
			toggle_class(rect, "selected", /*selected*/ ctx[60]);
			add_location(rect, file$a, 340, 3, 8132);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*bars*/ 8192 && rect_fill_value !== (rect_fill_value = /*fill*/ ctx[57])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*bars*/ 8192 && rect_x_value !== (rect_x_value = /*x*/ ctx[61])) {
				attr_dev(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*bars*/ 8192 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[55])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 8192 && rect_width_value !== (rect_width_value = /*barLength*/ ctx[54])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars*/ 8192) {
				toggle_class(rect, "selected", /*selected*/ ctx[60]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(340:3) {#if displayValue}",
		ctx
	});

	return block;
}

// (357:3) {#if flags.isInteractive}
function create_if_block_4(ctx) {
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
			attr_dev(rect, "class", "sensor svelte-1oon2s6");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[55]);
			attr_dev(rect, "width", /*innerWidth*/ ctx[6]);
			add_location(rect, file$a, 357, 3, 8437);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(rect, "mousedown", /*onMousedown*/ ctx[20], false, false, false),
					listen_dev(rect, "mouseenter", /*onMouseenter*/ ctx[19](/*index*/ ctx[64]), false, false, false),
					listen_dev(rect, "mouseleave", /*onMouseleave*/ ctx[23](/*index*/ ctx[64]), false, false, false),
					listen_dev(
						rect,
						"mousemove",
						function () {
							if (is_function(/*isMousedown*/ ctx[4]
							? /*onMousemove*/ ctx[21](/*index*/ ctx[64])
							: null)) (/*isMousedown*/ ctx[4]
							? /*onMousemove*/ ctx[21](/*index*/ ctx[64])
							: null).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(rect, "mouseup", /*onMouseup*/ ctx[22](/*index*/ ctx[64]), false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*bars*/ 8192 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[55])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*innerWidth*/ 64) {
				attr_dev(rect, "width", /*innerWidth*/ ctx[6]);
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
		source: "(357:3) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (325:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }
function create_each_block_1(ctx) {
	let g;
	let text_1;
	let t_value = /*displayValue*/ ctx[56] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;
	let text_1_text_anchor_value;
	let g_transform_value;
	let if_block0 = /*displayValue*/ ctx[56] && create_if_block_5(ctx);
	let if_block1 = /*flags*/ ctx[0].isInteractive && create_if_block_4(ctx);

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
			attr_dev(text_1, "class", "binsize svelte-1oon2s6");
			attr_dev(text_1, "x", text_1_x_value = /*labelX*/ ctx[59]);
			attr_dev(text_1, "y", text_1_y_value = /*barThickness*/ ctx[55] / 2);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[14]);
			attr_dev(text_1, "text-anchor", text_1_text_anchor_value = /*labelAnchor*/ ctx[58]);
			add_location(text_1, file$a, 349, 3, 8258);
			attr_dev(g, "class", "bin svelte-1oon2s6");
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*y1*/ ctx[62] + ")");
			add_location(g, file$a, 335, 2, 8052);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			if (if_block0) if_block0.m(g, null);
			append_dev(g, text_1);
			append_dev(text_1, t);
			if (if_block1) if_block1.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (/*displayValue*/ ctx[56]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					if_block0.m(g, text_1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*bars*/ 8192 && t_value !== (t_value = /*displayValue*/ ctx[56] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*bars*/ 8192 && text_1_x_value !== (text_1_x_value = /*labelX*/ ctx[59])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*bars*/ 8192 && text_1_y_value !== (text_1_y_value = /*barThickness*/ ctx[55] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 16384) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[14]);
			}

			if (dirty[0] & /*bars*/ 8192 && text_1_text_anchor_value !== (text_1_text_anchor_value = /*labelAnchor*/ ctx[58])) {
				attr_dev(text_1, "text-anchor", text_1_text_anchor_value);
			}

			if (/*flags*/ ctx[0].isInteractive) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					if_block1.m(g, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*bars*/ 8192 && g_transform_value !== (g_transform_value = "translate(0," + /*y1*/ ctx[62] + ")")) {
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
		id: create_each_block_1.name,
		type: "each",
		source: "(325:2) {#each bars as {    barLength,    barThickness,    displayValue,    fill,    labelAnchor,    labelX,    selected,    x,    y1,   }",
		ctx
	});

	return block;
}

// (378:3) {#if !flags.hideOrigin}
function create_if_block_3$1(ctx) {
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
			attr_dev(circle, "class", "svelte-1oon2s6");
			add_location(circle, file$a, 378, 3, 8917);
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
		id: create_if_block_3$1.name,
		type: "if",
		source: "(378:3) {#if !flags.hideOrigin}",
		ctx
	});

	return block;
}

// (381:3) {#if !flags.hideTicks}
function create_if_block_2$2(ctx) {
	let each_1_anchor;
	let each_value = /*ticks*/ ctx[11];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
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
			if (dirty[0] & /*ticksX, ticks, fontSize, ticksAnchor*/ 19968) {
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
		id: create_if_block_2$2.name,
		type: "if",
		source: "(381:3) {#if !flags.hideTicks}",
		ctx
	});

	return block;
}

// (382:3) {#each ticks as {tick, y}}
function create_each_block$5(ctx) {
	let text_1;
	let t_value = /*tick*/ ctx[50] + "";
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
			attr_dev(text_1, "class", "range svelte-1oon2s6");
			attr_dev(text_1, "x", /*ticksX*/ ctx[9]);
			attr_dev(text_1, "y", text_1_y_value = /*y*/ ctx[51]);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[14]);
			attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[10]);
			add_location(text_1, file$a, 382, 3, 9021);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 2048 && t_value !== (t_value = /*tick*/ ctx[50] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*ticksX*/ 512) {
				attr_dev(text_1, "x", /*ticksX*/ ctx[9]);
			}

			if (dirty[0] & /*ticks*/ 2048 && text_1_y_value !== (text_1_y_value = /*y*/ ctx[51])) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 16384) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[14]);
			}

			if (dirty[0] & /*ticksAnchor*/ 1024) {
				attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[10]);
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
		source: "(382:3) {#each ticks as {tick, y}}",
		ctx
	});

	return block;
}

// (393:2) {#if isBrushing}
function create_if_block_1$5(ctx) {
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
			attr_dev(line, "y1", line_y__value = /*brushLine*/ ctx[16].y1);
			attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ ctx[16].y2);
			attr_dev(line, "class", "svelte-1oon2s6");
			add_location(line, file$a, 397, 3, 9253);
			attr_dev(g, "class", "brush svelte-1oon2s6");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*origin*/ ctx[8].x + ",0)");
			add_location(g, file$a, 393, 2, 9189);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, line);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 65536 && line_y__value !== (line_y__value = /*brushLine*/ ctx[16].y1)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*brushLine*/ 65536 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ ctx[16].y2)) {
				attr_dev(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*origin*/ 256 && g_transform_value !== (g_transform_value = "translate(" + /*origin*/ ctx[8].x + ",0)")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$5.name,
		type: "if",
		source: "(393:2) {#if isBrushing}",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[2] && /*width*/ ctx[3] && /*scales*/ ctx[12] && create_if_block$7(ctx);

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
			if (/*height*/ ctx[2] && /*width*/ ctx[3] && /*scales*/ ctx[12]) {
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
		maxfontSize: 12,
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
	component_subscribe($$self, brush, value => $$invalidate(35, $brush = value));

	/* events */
	const getModifier = event => event.shiftKey ? "shift" : event.altKey ? "alt" : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			brush.update(mergeObj({ end: index }));
		}

		dispatch("entered", index);
	};

	const onMousedown = event => {
		$$invalidate(4, isMousedown = true);

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
		$$invalidate(4, isMousedown = false);

		if (isPressed) {
			if ($brush.delta < geometry.brushThreshold) {
				if (doesBrushAdd) {
					$$invalidate(25, selectedBins = uniques(appendTo(selectedBins, index)));
				} else if (doesBrushRemove) {
					$$invalidate(25, selectedBins = pullFrom(selectedBins, [index]));
				} else {
					$$invalidate(25, selectedBins = [index]);
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
		if ("bins" in $$props) $$invalidate(24, bins = $$props.bins);
		if ("binsFill" in $$props) $$invalidate(28, binsFill = $$props.binsFill);
		if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
		if ("height" in $$props) $$invalidate(2, height = $$props.height);
		if ("selectedBins" in $$props) $$invalidate(25, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(26, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(27, ticksFormatFn = $$props.ticksFormatFn);
		if ("width" in $$props) $$invalidate(3, width = $$props.width);
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
		if ("bins" in $$props) $$invalidate(24, bins = $$props.bins);
		if ("binsFill" in $$props) $$invalidate(28, binsFill = $$props.binsFill);
		if ("flags" in $$props) $$invalidate(0, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
		if ("height" in $$props) $$invalidate(2, height = $$props.height);
		if ("selectedBins" in $$props) $$invalidate(25, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(26, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(27, ticksFormatFn = $$props.ticksFormatFn);
		if ("width" in $$props) $$invalidate(3, width = $$props.width);
		if ("rangesExtent" in $$props) $$invalidate(29, rangesExtent = $$props.rangesExtent);
		if ("isMousedown" in $$props) $$invalidate(4, isMousedown = $$props.isMousedown);
		if ("safety" in $$props) $$invalidate(5, safety = $$props.safety);
		if ("innerWidth" in $$props) $$invalidate(6, innerWidth = $$props.innerWidth);
		if ("innerHeight" in $$props) $$invalidate(7, innerHeight = $$props.innerHeight);
		if ("origin" in $$props) $$invalidate(8, origin = $$props.origin);
		if ("direction" in $$props) direction = $$props.direction;
		if ("ticksX" in $$props) $$invalidate(9, ticksX = $$props.ticksX);
		if ("ticksAnchor" in $$props) $$invalidate(10, ticksAnchor = $$props.ticksAnchor);
		if ("ticks" in $$props) $$invalidate(11, ticks = $$props.ticks);
		if ("scales" in $$props) $$invalidate(12, scales = $$props.scales);
		if ("useValue" in $$props) $$invalidate(31, useValue = $$props.useValue);
		if ("getBinsMax" in $$props) $$invalidate(32, getBinsMax = $$props.getBinsMax);
		if ("valuesMax" in $$props) $$invalidate(33, valuesMax = $$props.valuesMax);
		if ("bars" in $$props) $$invalidate(13, bars = $$props.bars);
		if ("maxBarThickness" in $$props) $$invalidate(34, maxBarThickness = $$props.maxBarThickness);
		if ("fontSize" in $$props) $$invalidate(14, fontSize = $$props.fontSize);
		if ("isBrushing" in $$props) $$invalidate(15, isBrushing = $$props.isBrushing);
		if ("isPressed" in $$props) isPressed = $$props.isPressed;
		if ("doesBrushAdd" in $$props) $$invalidate(37, doesBrushAdd = $$props.doesBrushAdd);
		if ("doesBrushRemove" in $$props) $$invalidate(38, doesBrushRemove = $$props.doesBrushRemove);
		if ("brushStroke" in $$props) $$invalidate(39, brushStroke = $$props.brushStroke);
		if ("brushExtent" in $$props) $$invalidate(40, brushExtent = $$props.brushExtent);
		if ("brushRange" in $$props) $$invalidate(41, brushRange = $$props.brushRange);
		if ("brushExtentBarYs" in $$props) $$invalidate(42, brushExtentBarYs = $$props.brushExtentBarYs);
		if ("brushLine" in $$props) $$invalidate(16, brushLine = $$props.brushLine);
		if ("style" in $$props) $$invalidate(17, style = $$props.style);
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
		if ($$self.$$.dirty[0] & /*bins*/ 16777216) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(24, bins = bins || []);
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 $$invalidate(0, flags = flags ? { ...defaultFlags, ...flags } : defaultFlags);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			 $$invalidate(1, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*selectedBins*/ 33554432) {
			 $$invalidate(25, selectedBins = selectedBins || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 67108864) {
			 $$invalidate(26, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn*/ 134217728) {
			 $$invalidate(27, ticksFormatFn = ticksFormatFn || (x => x));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags*/ 3) {
			 $$invalidate(5, safety = {
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

		if ($$self.$$.dirty[0] & /*width, safety*/ 40) {
			 $$invalidate(6, innerWidth = Math.max(0, width - safety.left - safety.right));
		}

		if ($$self.$$.dirty[0] & /*height, safety, geometry*/ 38) {
			 $$invalidate(7, innerHeight = Math.max(0, height - safety.top - safety.bottom - geometry.maxfontSize));
		}

		if ($$self.$$.dirty[0] & /*flags, innerWidth, innerHeight*/ 193) {
			 $$invalidate(8, origin = {
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
			 $$invalidate(9, ticksX = flags.isRightToLeft
			? geometry.originRadius + geometry.textPadding
			: -(geometry.originRadius + geometry.textPadding));
		}

		if ($$self.$$.dirty[0] & /*flags*/ 1) {
			 $$invalidate(10, ticksAnchor = flags.isRightToLeft ? "start" : "end");
		}

		if ($$self.$$.dirty[0] & /*bins*/ 16777216) {
			 $$invalidate(31, useValue = bins.length && has(bins[0], "value"));
		}

		if ($$self.$$.dirty[1] & /*useValue*/ 1) {
			 $$invalidate(32, getBinsMax = useValue
			? arrayMaxWith(getValue)
			: arrayMaxWith(getValuesLength));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 16777216 | $$self.$$.dirty[1] & /*getBinsMax*/ 2) {
			 $$invalidate(33, valuesMax = getBinsMax(bins));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 16777216) {
			 $$invalidate(29, rangesExtent = bins.length
			? [bins[0].range[0], last(bins).range[1]]
			: []);
		}

		if ($$self.$$.dirty[0] & /*bins, flags, innerWidth, rangesExtent, innerHeight*/ 553648321 | $$self.$$.dirty[1] & /*valuesMax*/ 4) {
			/* eslint-disable indent */
			 $$invalidate(12, scales = bins.length && {
				x: flags.useLogScale
				? log().domain([1, valuesMax]).range([innerWidth / Math.log10(valuesMax), innerWidth])
				: linear$1().domain([0, valuesMax]).range([0, innerWidth]),
				y: linear$1().domain(rangesExtent).range([0, innerHeight])
			});
		}

		if ($$self.$$.dirty[0] & /*bins, ticksFormatFn, flags, scales*/ 150999041) {
			 $$invalidate(11, ticks = getBinsTicks(bins).map(tick => ({
				tick: ticksFormatFn(tick),
				y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
			})));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 16) {
			 $$invalidate(15, isBrushing = $brush.state === "Brushing");
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 16) {
			 $$invalidate(37, doesBrushAdd = $brush.modifier === "shift");
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 32768 | $$self.$$.dirty[1] & /*$brush*/ 16) {
			 $$invalidate(40, brushExtent = isBrushing && sort([$brush.start, $brush.end]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 32768 | $$self.$$.dirty[1] & /*brushExtent*/ 512) {
			 $$invalidate(41, brushRange = isBrushing && inclusiveRange(brushExtent));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 16) {
			 $$invalidate(38, doesBrushRemove = $brush.modifier === "alt");
		}

		if ($$self.$$.dirty[0] & /*isBrushing, selectedBins*/ 33587200 | $$self.$$.dirty[1] & /*doesBrushAdd, brushRange, doesBrushRemove, $brush*/ 1232) {
			 if (isBrushing) {
				$$invalidate(25, selectedBins = doesBrushAdd
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

		if ($$self.$$.dirty[0] & /*bins, selectedBins, scales, flags, innerWidth, innerHeight, geometry, binsFill, theme*/ 385880259) {
			/* eslint-enable indent */
			 $$invalidate(13, bars = bins.map((bin, index) => {
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

		if ($$self.$$.dirty[0] & /*bars*/ 8192) {
			 $$invalidate(34, maxBarThickness = makeMaxBarThickness(bars));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 2 | $$self.$$.dirty[1] & /*maxBarThickness*/ 8) {
			 $$invalidate(14, fontSize = Math.min(geometry.maxfontSize, geometry.fontSizeFactor * maxBarThickness));
		}

		if ($$self.$$.dirty[1] & /*$brush*/ 16) {
			 isPressed = $brush.state === "Pressed";
		}

		if ($$self.$$.dirty[0] & /*theme*/ 67108864 | $$self.$$.dirty[1] & /*doesBrushAdd, doesBrushRemove*/ 192) {
			 $$invalidate(39, brushStroke = doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove ? theme.brushRemoveStroke : null);
		}

		if ($$self.$$.dirty[0] & /*isBrushing, bars*/ 40960 | $$self.$$.dirty[1] & /*brushExtent*/ 512) {
			 $$invalidate(42, brushExtentBarYs = isBrushing && sort([
				bars[brushExtent[0]].y1,
				bars[brushExtent[0]].y2,
				bars[brushExtent[1]].y1,
				bars[brushExtent[1]].y2
			]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 32768 | $$self.$$.dirty[1] & /*brushExtentBarYs*/ 2048) {
			 $$invalidate(16, brushLine = isBrushing && {
				y1: brushExtentBarYs[0],
				y2: brushExtentBarYs[3]
			});
		}

		if ($$self.$$.dirty[0] & /*theme*/ 67108864 | $$self.$$.dirty[1] & /*brushStroke*/ 256) {
			/* style */
			 $$invalidate(17, style = makeStyleVars({ ...theme, brushStroke }));
		}
	};

	return [
		flags,
		geometry,
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
		bins,
		selectedBins,
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
			instance$g,
			create_fragment$g,
			safe_not_equal,
			{
				bins: 24,
				binsFill: 28,
				flags: 0,
				geometry: 1,
				height: 2,
				selectedBins: 25,
				theme: 26,
				ticksFormatFn: 27,
				width: 3
			},
			[-1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HistogramG",
			options,
			id: create_fragment$g.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*bins*/ ctx[24] === undefined && !("bins" in props)) {
			console.warn("<HistogramG> was created without expected prop 'bins'");
		}

		if (/*binsFill*/ ctx[28] === undefined && !("binsFill" in props)) {
			console.warn("<HistogramG> was created without expected prop 'binsFill'");
		}

		if (/*flags*/ ctx[0] === undefined && !("flags" in props)) {
			console.warn("<HistogramG> was created without expected prop 'flags'");
		}

		if (/*geometry*/ ctx[1] === undefined && !("geometry" in props)) {
			console.warn("<HistogramG> was created without expected prop 'geometry'");
		}

		if (/*height*/ ctx[2] === undefined && !("height" in props)) {
			console.warn("<HistogramG> was created without expected prop 'height'");
		}

		if (/*selectedBins*/ ctx[25] === undefined && !("selectedBins" in props)) {
			console.warn("<HistogramG> was created without expected prop 'selectedBins'");
		}

		if (/*theme*/ ctx[26] === undefined && !("theme" in props)) {
			console.warn("<HistogramG> was created without expected prop 'theme'");
		}

		if (/*ticksFormatFn*/ ctx[27] === undefined && !("ticksFormatFn" in props)) {
			console.warn("<HistogramG> was created without expected prop 'ticksFormatFn'");
		}

		if (/*width*/ ctx[3] === undefined && !("width" in props)) {
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
const file$b = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/histogram/src/HistogramDiv.svelte";

// (33:1) {#if title}
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
			attr_dev(h2, "class", "svelte-4i00u3");
			add_location(h2, file$b, 34, 2, 676);
			attr_dev(header, "class", "svelte-4i00u3");
			toggle_class(header, "rightToLeft", /*flags*/ ctx[3] && /*flags*/ ctx[3].isRightToLeft);
			add_location(header, file$b, 33, 1, 616);
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
		id: create_if_block_1$6.name,
		type: "if",
		source: "(33:1) {#if title}",
		ctx
	});

	return block;
}

// (47:3) {#if bins}
function create_if_block$8(ctx) {
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
		id: create_if_block$8.name,
		type: "if",
		source: "(47:3) {#if bins}",
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
			attr_dev(svg, "width", /*width*/ ctx[9]);
			attr_dev(svg, "height", /*height*/ ctx[8]);
			attr_dev(svg, "class", "svelte-4i00u3");
			add_location(svg, file$b, 42, 2, 818);
			attr_dev(main, "class", "svelte-4i00u3");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[19].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$b, 37, 1, 712);
			attr_dev(div, "class", "HistogramDiv svelte-4i00u3");
			attr_dev(div, "style", /*style*/ ctx[10]);
			toggle_class(div, "interactive", /*flags*/ ctx[3] && /*flags*/ ctx[3].isInteractive);
			add_location(div, file$b, 27, 0, 514);
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
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	let { title } = $$props;
	let { padding } = $$props;
	let { headerHeight } = $$props;
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
		"title",
		"padding",
		"headerHeight",
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
		width = this.clientWidth;
		height = this.clientHeight;
		$$invalidate(9, width);
		$$invalidate(8, height);
	}

	$$self.$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("padding" in $$props) $$invalidate(11, padding = $$props.padding);
		if ("headerHeight" in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
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
		title,
		padding,
		headerHeight,
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
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("padding" in $$props) $$invalidate(11, padding = $$props.padding);
		if ("headerHeight" in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
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
		if ($$self.$$.dirty & /*padding*/ 2048) {
			 $$invalidate(11, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 4096) {
			 $$invalidate(12, headerHeight = headerHeight || "2rem");
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
		padding,
		headerHeight,
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

		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
			title: 0,
			padding: 11,
			headerHeight: 12,
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
			id: create_fragment$h.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'title'");
		}

		if (/*padding*/ ctx[11] === undefined && !("padding" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'padding'");
		}

		if (/*headerHeight*/ ctx[12] === undefined && !("headerHeight" in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'headerHeight'");
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

	get title() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get headerHeight() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
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
};

/* src/routes/components/[slug].svelte generated by Svelte v3.24.0 */
const file$c = "src/routes/components/[slug].svelte";

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i][0];
	child_ctx[23] = list[i][1];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i][0];
	child_ctx[27] = list[i][1];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i].key;
	child_ctx[31] = i;
	return child_ctx;
}

// (73:2) {#if data.length > 1}
function create_if_block_2$3(ctx) {
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
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
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
			add_location(h2, file$c, 74, 3, 1698);
			attr_dev(select, "size", select_size_value = /*data*/ ctx[0].length);
			attr_dev(select, "class", "svelte-1gqqmmb");
			add_location(select, file$c, 77, 4, 1800);
			attr_dev(div0, "class", "distancer svelte-1gqqmmb");
			add_location(div0, file$c, 75, 3, 1728);
			attr_dev(div1, "class", "distancer svelte-1gqqmmb");
			add_location(div1, file$c, 73, 2, 1671);
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
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
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
		id: create_if_block_2$3.name,
		type: "if",
		source: "(73:2) {#if data.length > 1}",
		ctx
	});

	return block;
}

// (82:5) {#each data as {key}
function create_each_block_2(ctx) {
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
			add_location(option, file$c, 82, 5, 1943);
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
		id: create_each_block_2.name,
		type: "each",
		source: "(82:5) {#each data as {key}",
		ctx
	});

	return block;
}

// (94:2) {#if payloads}
function create_if_block_1$7(ctx) {
	let h2;
	let t0;
	let t1;
	let div;
	let each_value_1 = pairs$1(/*payloads*/ ctx[8]);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
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
			add_location(h2, file$c, 94, 2, 2120);
			attr_dev(div, "class", "distancer svelte-1gqqmmb");
			add_location(div, file$c, 95, 2, 2138);
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
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
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
		id: create_if_block_1$7.name,
		type: "if",
		source: "(94:2) {#if payloads}",
		ctx
	});

	return block;
}

// (97:3) {#each _.pairs(payloads) as [key, value]}
function create_each_block_1$1(ctx) {
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
			add_location(span, file$c, 98, 4, 2232);
			attr_dev(pre, "class", "svelte-1gqqmmb");
			add_location(pre, file$c, 99, 4, 2255);
			attr_dev(div, "class", "row svelte-1gqqmmb");
			add_location(div, file$c, 97, 3, 2210);
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
		id: create_each_block_1$1.name,
		type: "each",
		source: "(97:3) {#each _.pairs(payloads) as [key, value]}",
		ctx
	});

	return block;
}

// (115:3) {#each displayProps as [propName, propValue]}
function create_each_block$6(ctx) {
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
			add_location(code, file$c, 115, 7, 2551);
			add_location(h3, file$c, 115, 3, 2547);
			attr_dev(div, "class", "distancer svelte-1gqqmmb");
			add_location(div, file$c, 116, 3, 2583);
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
		id: create_each_block$6.name,
		type: "each",
		source: "(115:3) {#each displayProps as [propName, propValue]}",
		ctx
	});

	return block;
}

// (138:2) {:else}
function create_else_block$1(ctx) {
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
		id: create_else_block$1.name,
		type: "else",
		source: "(138:2) {:else}",
		ctx
	});

	return block;
}

// (125:2) {#if isSVG}
function create_if_block$9(ctx) {
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
			add_location(svg, file$c, 129, 3, 2814);
			attr_dev(div, "class", "svgwrapper svelte-1gqqmmb");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[17].call(div));
			add_location(div, file$c, 125, 2, 2721);
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
		id: create_if_block$9.name,
		type: "if",
		source: "(125:2) {#if isSVG}",
		ctx
	});

	return block;
}

function create_fragment$i(ctx) {
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

	let if_block0 = /*data*/ ctx[0].length > 1 && create_if_block_2$3(ctx);
	let if_block1 = /*payloads*/ ctx[8] && create_if_block_1$7(ctx);
	let each_value = /*displayProps*/ ctx[12];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const if_block_creators = [create_if_block$9, create_else_block$1];
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
			add_location(h1, file$c, 63, 1, 1503);
			attr_dev(div0, "class", "distancer svelte-1gqqmmb");
			add_location(div0, file$c, 67, 2, 1562);
			add_location(h20, file$c, 107, 3, 2374);
			attr_dev(pre, "class", "svelte-1gqqmmb");
			add_location(pre, file$c, 108, 3, 2392);
			attr_dev(div1, "class", "distancer svelte-1gqqmmb");
			add_location(div1, file$c, 106, 2, 2347);
			add_location(h21, file$c, 113, 3, 2480);
			attr_dev(div2, "class", "distancer svelte-1gqqmmb");
			add_location(div2, file$c, 112, 2, 2453);
			attr_dev(div3, "class", "col col1 svelte-1gqqmmb");
			add_location(div3, file$c, 64, 1, 1521);
			attr_dev(div4, "class", "col col2 svelte-1gqqmmb");
			add_location(div4, file$c, 123, 1, 2682);
			attr_dev(main, "class", "svelte-1gqqmmb");
			add_location(main, file$c, 62, 0, 1495);
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
					if_block0 = create_if_block_2$3(ctx);
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
					if_block1 = create_if_block_1$7(ctx);
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
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
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
		id: create_fragment$i.name,
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
			create_fragment$i,
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
			id: create_fragment$i.name
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
