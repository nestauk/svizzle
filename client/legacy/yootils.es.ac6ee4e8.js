import { $ as getKey$1, bl as collect, br as head, ar as last, E as _slicedToArray, bs as isUndefined, bt as range, ap as appendTo, b0 as sortWith, bu as sorterDesc, a0 as pipe, bv as zipWithIndex, W as mapWith, aN as setIn, bw as generic } from './client.50a99e71.js';

/**
* @module @svizzle/utils/object-any
*/
/**
 * Retrieve the 'id' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.id
 *
 * @example
> getId({id: 'foo', name: 'bar'})
'foo'
 *
 * @since 0.4.0
 */

var getId = getKey$1('id');
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

export { getKey as a, getValues as b, getFirstAndLast as c, getId as d, setIndexAsKey as e, getValue as g, inclusiveRange as i, linear as l, sliceString as s };
