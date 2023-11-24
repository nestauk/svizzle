import { au as reduceWith, cu as isNumber, ai as generic } from './client.c3033a77.js';

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

export { arrayMaxWith as a, arrayMinWith as b, arraySumWith as c, linear as l, sliceString as s, trim as t };
