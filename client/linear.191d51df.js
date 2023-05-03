import { ah as reduceWith, c8 as isNumber, $ as getKey$1, ae as collect, c9 as isUndefined, ca as range, bq as last, bo as appendTo, bO as sortWith, cb as sorterDesc, cc as head, Y as pipe, cd as zipWithIndex, T as mapWith, bx as setIn, a5 as generic } from './client.c587a315.js';

/**
* @module @svizzle/utils/[any-number]-[array-number]
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
 * @since 0.1.0
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
 * @since 0.1.0
 */
const arrayMinWith = fn => reduceWith((min, item) => {
	const value = fn(item);

	return value < min ? value : min;
}, Infinity);

/**
 * Return a function expecting an array and summing the numbers obtained
 * from applying the provided accessor to the array items.
 * Note that it skips items where the accessor does not return a number.
 *
 * @function
 * @arg {function} accessor - Any -> Number
 * @return {function} - Array -> Number
 *
 * @example
> sumValues = arraySumWith(_.getKey('a'))
> sumValues([{a: 1}, {a: 2}, {a: 3}])
6
> sumValues([{a: 1}, {a: 2}, {a: 'hey'}])
3
> sumValues([{a: 1}, {a: 2}, {notA: 3}])
3
> sumValues([{a: 'hey'}, {notA: 'b'}, {notA: 3}])
0
> sumValues([])
0
 *
 * @since 0.16.0
 * @see {@link module:@svizzle/utils/array-number.arraySum|arraySum}
 */
const arraySumWith = accessor => reduceWith((acc, item) => {
	const value = accessor(item);

	return acc + (isNumber(value) ? value : 0);
}, 0);

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
const getId = getKey$1('id');

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
const getKey = getKey$1('key');

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
const getValue = getKey$1('value');

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
const getValues = getKey$1('values');

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
 * @since 0.3.0
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
 * @since 0.7.0
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
const setIndexAsKey = (key = 'index') => pipe([
	zipWithIndex,
	mapWith(([obj, index]) => setIn(obj, key, index))
]);

/**
 * Return a copy of the provided array with items
 * sorted by `value` (ascending) then by `key` (ascending)
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
	{key: 'a', value: 1},
	{key: 'b', value: 1},
	{key: 'a', value: 4},
]
 *
 * @since 0.5.0
 */
sortWith([getValue, getKey]);

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

sortWith([
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
 * @since 0.5.0
 */
sortWith([
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
 * @since 0.5.0
 */
sortWith([
	sorterDesc(getValue),
	sorterDesc(getKey)
]);

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
const sliceString = generic(String.prototype.slice);

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
const trim = generic(String.prototype.trim);

/**
 * Generates a `scale` function that maps from `domain` to `range`.
 * `scale.inverse()` returns a function that maps from `range` to `domain`
 * @param {[number, number]} domain
 * @param {[number, number]} range
 */
function linear(domain, range) {
	const d0 = domain[0];
	const r0 = range[0];
	const m = (range[1] - r0) / (domain[1] - d0);

	/** @param {number} num */
	function scale(num) {
		return r0 + (num - d0) * m;
	}

	scale.inverse = () => linear(range, domain);

	return scale;
}

export { arrayMaxWith as a, arrayMinWith as b, getKey as c, getValues as d, getFirstAndLast as e, arraySumWith as f, getValue as g, getId as h, inclusiveRange as i, setIndexAsKey as j, linear as l, sliceString as s, trim as t };
