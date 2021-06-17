import { A as _slicedToArray, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, W as add_render_callback, a0 as writable, Z as validate_store, $ as component_subscribe, v as validate_slots, g as element, t as text, f as space, k as claim_element, l as children, m as claim_text, h as detach_dev, j as claim_space, o as add_location, n as attr_dev, p as insert_dev, r as append_dev, I as listen_dev, H as set_data_dev, K as empty, X as add_resize_listener, u as noop, a2 as run_all, U as globals } from './client.6106bd4c.js';
import { g as getKey$1, G as collect, H as head, z as last, I as isUndefined, J as range, y as appendTo, K as sortWith, L as sorterDesc, p as pipe, M as zipWithIndex, m as mapWith, F as setIn, a as apply, N as make, O as identity, P as always, Q as generic, R as reduce, S as fromPairs, T as reduceFromEmptyObject, U as forEach, h as has, k as keys, E as pairs, V as joinWith, W as getTruthyValuesKeys, D as _ } from './defaultLocale.76beb823.js';

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
 * @since 0.4.0
 */

var getKey = getKey$1('key');
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
 * @since 0.4.0
 */

var getValue = getKey$1('value');
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
 * @since 0.4.0
 */

var getValues = getKey$1('values');

/**
 * Return an array containing the first and the last element of the provided array.
 *
 * @function
 * @arg {array} array
 * @return {array}
 *
 * @example getFirstAndLast([0, 1, 2, 3, 4]) // [0, 4]
 *
 * @since 0.3.0
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
 * @since 0.7.0
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
 * Return a copy of the provided array of objects
 * assigning each object index to a property with the provided key
 * (defaulting to `index`)
 *
 * @function
 * @arg {object[]} - Array of objects
 * @return {object[]} - Array of objects
 *
 * @example
> setIndex = setIndexAsKey()
> setIndex([{a: 2}, {c: 5}])
[{a: 2, index: 0}, {c: 5, index: 1}]

> setIndexAsIdx = setIndexAsKey('idx')
> setIndexAsIdx([{a: 2}, {c: 5}])
[{a: 2, idx: 0}, {c: 5, idx: 1}]
 *
 * @since 0.9.0
 */

var setIndexAsKey = function setIndexAsKey() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  return pipe([zipWithIndex, mapWith(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        obj = _ref4[0],
        index = _ref4[1];

    return setIn(obj, key, index);
  })]);
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
 * @since 0.5.0
 */

sortWith([getValue, sorterDesc(getKey)]);
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
 * @since 0.5.0
 */

sortWith([sorterDesc(getValue), getKey]);
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
 * @since 0.5.0
 */

sortWith([sorterDesc(getValue), sorterDesc(getKey)]);

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
 * @since 0.3.0
 */

var makeKeyed = function makeKeyed(value) {
  return pipe([collect([identity, mapWith(always(value))]), apply(make)]);
};

/**
* @module @svizzle/utils/string_proto-string
*/
/**
 * Return the portion of the provided string between the provided indices (first included, second excluded).
 * Note that indices can be negative.
 * (named `sliceString` to avoid conflict with `Array.prototype.slice`)
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice|String.prototype.slice},
 {@link module:@svizzle/utils/array-[string-string].sliceStringAt|sliceStringAt}
 *
 * @function
 * @arg {string} string
 * @arg {number} beginIndex - The zero-based index at which to begin extraction
 * @arg {number} endIndex - Optional. The zero-based index before which to end extraction. If negative, starts counting from the end.
 * @return {string}
 *
 * @example
> sliceString('0123456789', 3)
'3456789'
> sliceString('0123456789', 3, 5)
'34'
> sliceString('0123456789', 3, -1)
'345678'
 *
 * @since 0.5.0
 */

var sliceString = generic(String.prototype.slice);
/**
 * Return a string by trimming white space from the provided string
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim|String.prototype.trim}
 *
 * @function
 * @arg {string} string
 * @return {string}
 *
 * @example
> trim('   abc   \n  ')
'abc'
 *
 * @since 0.1.0
 */

generic(String.prototype.trim);

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
}); // IDEA merging from right just new keys might be faster

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var window_1 = globals.window;
var file = "../../components/ui/src/gauges/screen/ScreenGauge.svelte"; // (112:0) {#if isDev && sampleHeight && sampleWidth && devInfo}

function create_if_block(ctx) {
  var div;
  var p0;
  var t0;
  var t1_value =
  /*devInfo*/
  ctx[7].DPPR + "";
  var t1;
  var t2;
  var p1;
  var t3;
  var t4_value =
  /*devInfo*/
  ctx[7].Display + "";
  var t4;
  var t5;
  var p2;
  var t6;
  var t7_value =
  /*devInfo*/
  ctx[7].Text + "";
  var t7;
  var t8;
  var p3;
  var t9;
  var t10_value =
  /*devInfo*/
  ctx[7].Classes + "";
  var t10;
  var t11;
  var p4;
  var t12;
  var t13_value =
  /*devInfo*/
  ctx[7].Orientation + "";
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
      add_location(p0, file, 113, 2, 2521);
      add_location(p1, file, 114, 2, 2551);
      add_location(p2, file, 115, 2, 2587);
      add_location(p3, file, 116, 2, 2617);
      add_location(p4, file, 117, 2, 2653);
      attr_dev(button, "class", "svelte-jv3yaw");
      add_location(button, file, 118, 2, 2697);
      attr_dev(div, "class", "devInfo svelte-jv3yaw");
      add_location(div, file, 112, 1, 2497);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, p0);
      append_dev(p0, t0);
      append_dev(p0, t1);
      append_dev(div, t2);
      append_dev(div, p1);
      append_dev(p1, t3);
      append_dev(p1, t4);
      append_dev(div, t5);
      append_dev(div, p2);
      append_dev(p2, t6);
      append_dev(p2, t7);
      append_dev(div, t8);
      append_dev(div, p3);
      append_dev(p3, t9);
      append_dev(p3, t10);
      append_dev(div, t11);
      append_dev(div, p4);
      append_dev(p4, t12);
      append_dev(p4, t13);
      append_dev(div, t14);
      append_dev(div, button);
      append_dev(button, t15);

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler*/
        ctx[13], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*devInfo*/
      128 && t1_value !== (t1_value =
      /*devInfo*/
      ctx[7].DPPR + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*devInfo*/
      128 && t4_value !== (t4_value =
      /*devInfo*/
      ctx[7].Display + "")) set_data_dev(t4, t4_value);
      if (dirty &
      /*devInfo*/
      128 && t7_value !== (t7_value =
      /*devInfo*/
      ctx[7].Text + "")) set_data_dev(t7, t7_value);
      if (dirty &
      /*devInfo*/
      128 && t10_value !== (t10_value =
      /*devInfo*/
      ctx[7].Classes + "")) set_data_dev(t10, t10_value);
      if (dirty &
      /*devInfo*/
      128 && t13_value !== (t13_value =
      /*devInfo*/
      ctx[7].Orientation + "")) set_data_dev(t13, t13_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(112:0) {#if isDev && sampleHeight && sampleWidth && devInfo}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div;
  var span;
  var t0;
  var span_style_value;
  var span_resize_listener;
  var t1;
  var if_block_anchor;
  var mounted;
  var dispose;
  add_render_callback(
  /*onwindowresize*/
  ctx[11]);
  var if_block =
  /*isDev*/
  ctx[0] &&
  /*sampleHeight*/
  ctx[3] &&
  /*sampleWidth*/
  ctx[4] &&
  /*devInfo*/
  ctx[7] && create_if_block(ctx);
  var block = {
    c: function create() {
      div = element("div");
      span = element("span");
      t0 = text(
      /*sampleText*/
      ctx[2]);
      t1 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {
        style: true,
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes,
      /*sampleText*/
      ctx[2]);
      span_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "style", span_style_value =
      /*fontSize*/
      ctx[1] && "font-size: ".concat(
      /*fontSize*/
      ctx[1]));
      attr_dev(span, "class", "svelte-jv3yaw");
      add_render_callback(function () {
        return (
          /*span_elementresize_handler*/
          ctx[12].call(span)
        );
      });
      add_location(span, file, 104, 1, 2290);
      attr_dev(div, "class", "textSample svelte-jv3yaw");
      add_location(div, file, 103, 0, 2264);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, span);
      append_dev(span, t0);
      span_resize_listener = add_resize_listener(span,
      /*span_elementresize_handler*/
      ctx[12].bind(span));
      insert_dev(target, t1, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);

      if (!mounted) {
        dispose = [listen_dev(window_1, "resize",
        /*updateScreen*/
        ctx[8], false, false, false), listen_dev(window_1, "resize",
        /*onwindowresize*/
        ctx[11])];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*sampleText*/
      4) set_data_dev(t0,
      /*sampleText*/
      ctx[2]);

      if (dirty &
      /*fontSize*/
      2 && span_style_value !== (span_style_value =
      /*fontSize*/
      ctx[1] && "font-size: ".concat(
      /*fontSize*/
      ctx[1]))) {
        attr_dev(span, "style", span_style_value);
      }

      if (
      /*isDev*/
      ctx[0] &&
      /*sampleHeight*/
      ctx[3] &&
      /*sampleWidth*/
      ctx[4] &&
      /*devInfo*/
      ctx[7]) {
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
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      span_resize_listener();
      if (detaching) detach_dev(t1);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
      mounted = false;
      run_all(dispose);
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

var _screen = writable();

var defaultBreakpoints = [45, 90, 135, 180];

function instance($$self, $$props, $$invalidate) {
  var sampleLength;
  var isClient;
  var devInfo;

  var $_screen,
      $$unsubscribe__screen = noop;

  validate_store(_screen, "_screen");
  component_subscribe($$self, _screen, function ($$value) {
    return $$invalidate(10, $_screen = $$value);
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__screen();
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("ScreenGauge", slots, []);

  var makeClasses = pipe([mergeObjects, getTruthyValuesKeys, joinWithBlank]);

  var _$$props$fontSize = $$props.fontSize,
      fontSize = _$$props$fontSize === void 0 ? null : _$$props$fontSize;
  var _$$props$isDev = $$props.isDev,
      isDev = _$$props$isDev === void 0 ? false : _$$props$isDev;
  var _$$props$sampleText = $$props.sampleText,
      sampleText = _$$props$sampleText === void 0 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" : _$$props$sampleText;
  var _$$props$breakpoints = $$props.breakpoints,
      breakpoints = _$$props$breakpoints === void 0 ? defaultBreakpoints : _$$props$breakpoints;
  var innerHeight;
  var innerWidth;
  var sampleHeight;
  var sampleWidth;

  var updateScreen = function updateScreen() {
    if (isClient) {
      return;
    } // geometry


    var display = {
      aspectRatio: window.innerWidth / window.innerHeight,
      height: window.innerHeight,
      orientation: window.screen.orientation,
      pixelRatio: window.devicePixelRatio,
      width: window.innerWidth
    };
    var glyph = {
      width: sampleWidth / sampleLength,
      height: sampleHeight
    };
    var text = {
      maxChars: Math.floor(display.width / glyph.width),
      maxLines: Math.floor(display.height / glyph.height)
    }; // flags

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
    }; // update

    _screen.set({
      classes: makeClasses([sizes, orientations]),
      display: display,
      glyph: glyph,
      orientations: orientations,
      sizes: sizes,
      text: text
    });
  };

  var writable_props = ["fontSize", "isDev", "sampleText", "breakpoints"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ScreenGauge> was created with unknown prop '".concat(key, "'"));
  });

  function onwindowresize() {
    $$invalidate(6, innerWidth = window_1.innerWidth);
    $$invalidate(5, innerHeight = window_1.innerHeight);
  }

  function span_elementresize_handler() {
    sampleWidth = this.offsetWidth;
    sampleHeight = this.offsetHeight;
    $$invalidate(4, sampleWidth);
    $$invalidate(3, sampleHeight);
  }

  var click_handler = function click_handler() {
    $$invalidate(0, isDev = false);
  };

  $$self.$$set = function ($$props) {
    if ("fontSize" in $$props) $$invalidate(1, fontSize = $$props.fontSize);
    if ("isDev" in $$props) $$invalidate(0, isDev = $$props.isDev);
    if ("sampleText" in $$props) $$invalidate(2, sampleText = $$props.sampleText);
    if ("breakpoints" in $$props) $$invalidate(9, breakpoints = $$props.breakpoints);
  };

  $$self.$capture_state = function () {
    return {
      writable: writable,
      _screen: _screen,
      defaultBreakpoints: defaultBreakpoints,
      _: _,
      getTruthyValuesKeys: getTruthyValuesKeys,
      joinWithBlank: joinWithBlank,
      mergeObjects: mergeObjects,
      makeClasses: makeClasses,
      fontSize: fontSize,
      isDev: isDev,
      sampleText: sampleText,
      breakpoints: breakpoints,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      sampleHeight: sampleHeight,
      sampleWidth: sampleWidth,
      updateScreen: updateScreen,
      sampleLength: sampleLength,
      isClient: isClient,
      devInfo: devInfo,
      $_screen: $_screen
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("fontSize" in $$props) $$invalidate(1, fontSize = $$props.fontSize);
    if ("isDev" in $$props) $$invalidate(0, isDev = $$props.isDev);
    if ("sampleText" in $$props) $$invalidate(2, sampleText = $$props.sampleText);
    if ("breakpoints" in $$props) $$invalidate(9, breakpoints = $$props.breakpoints);
    if ("innerHeight" in $$props) $$invalidate(5, innerHeight = $$props.innerHeight);
    if ("innerWidth" in $$props) $$invalidate(6, innerWidth = $$props.innerWidth);
    if ("sampleHeight" in $$props) $$invalidate(3, sampleHeight = $$props.sampleHeight);
    if ("sampleWidth" in $$props) $$invalidate(4, sampleWidth = $$props.sampleWidth);
    if ("sampleLength" in $$props) sampleLength = $$props.sampleLength;
    if ("isClient" in $$props) isClient = $$props.isClient;
    if ("devInfo" in $$props) $$invalidate(7, devInfo = $$props.devInfo);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*sampleText*/
    4) {
      sampleLength = sampleText.length;
    }

    if ($$self.$$.dirty &
    /*sampleHeight, sampleWidth*/
    24) {
      sampleHeight && sampleWidth && updateScreen();
    }

    if ($$self.$$.dirty &
    /*fontSize*/
    2) {
      fontSize && updateScreen();
    }

    if ($$self.$$.dirty &
    /*$_screen*/
    1024) {
      $$invalidate(7, devInfo = $_screen && {
        Classes: $_screen.classes,
        Display: "".concat($_screen.display.width, " x ").concat($_screen.display.height, " px"),
        DPPR: $_screen.display.pixelRatio.toPrecision(4),
        Orientation: $_screen.display.aspectRatio > 1 ? "landscape" : "portrait",
        Text: "".concat($_screen.text.maxChars, " x ").concat($_screen.text.maxLines, " chars")
      });
    }
  };

  isClient = typeof window === "undefined";

  return [isDev, fontSize, sampleText, sampleHeight, sampleWidth, innerHeight, innerWidth, devInfo, updateScreen, breakpoints, $_screen, onwindowresize, span_elementresize_handler, click_handler];
}

var ScreenGauge = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ScreenGauge, _SvelteComponentDev);

  var _super = _createSuper(ScreenGauge);

  function ScreenGauge(options) {
    var _this;

    _classCallCheck(this, ScreenGauge);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      fontSize: 1,
      isDev: 0,
      sampleText: 2,
      breakpoints: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ScreenGauge",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(ScreenGauge, [{
    key: "fontSize",
    get: function get() {
      throw new Error("<ScreenGauge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenGauge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isDev",
    get: function get() {
      throw new Error("<ScreenGauge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenGauge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sampleText",
    get: function get() {
      throw new Error("<ScreenGauge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenGauge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "breakpoints",
    get: function get() {
      throw new Error("<ScreenGauge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ScreenGauge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ScreenGauge;
}(SvelteComponentDev);

export { ScreenGauge as S, _screen as _, getKey as a, getValues as b, getFirstAndLast as c, joinWithSemicolon as d, joinWithBlank as e, setIndexAsKey as f, getValue as g, inclusiveRange as i, joinWithColon as j, keyValueArrayToObject as k, linear as l, makeKeyed as m, sliceString as s };
