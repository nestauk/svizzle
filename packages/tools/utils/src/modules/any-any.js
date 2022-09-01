/**
* @module @svizzle/utils/any-any
*/

import * as _ from 'lamb';

import {isValidNumber} from './any-boolean.js';

/**
 * Return an empty array if the input is undefined or identity otherwise.
 *
 * @function
 * @arg {*} any
 * @return {(*|array)}
 *
 * @example
> makeEmptyArrayIfUndefined(undefined)
[]
> makeEmptyArrayIfUndefined([1, 2, 3])
[1, 2, 3]
> makeEmptyArrayIfUndefined({a: 1})
{a: 1}
> makeEmptyArrayIfUndefined('a')
'a'
 *
 * @since 0.1.0
 */
export const makeEmptyArrayIfUndefined = x => _.isUndefined(x) ? [] : x;

/**
 * Return a number if the input can be converted to float, identity otherwise
 *
 * @function
 * @arg {*} any
 * @return {number|*}
 *
 * @example
> toFloatOrIdentity('2')
2
> toFloatOrIdentity('2px')
2
> toFloatOrIdentity('')
''
> toFloatOrIdentity('h2o')
'h2o'
> toFloatOrIdentity([1.1])
1.1
> toFloatOrIdentity([1.1, 2])
1.1
> toFloatOrIdentity([1.1, 2, 3])
1.1
> toFloatOrIdentity([])
[]
> toFloatOrIdentity({a: 1})
{a: 1}
> toFloatOrIdentity(true)
true
> toFloatOrIdentity(null)
null
> toFloatOrIdentity(undefined)
undefined
 * @since 0.1.0
 */
export const toFloatOrIdentity = x => {
	const parsed = parseFloat(x);

	return isValidNumber(parsed) ? parsed : x;
};

/**
 * Return a copy of the input after stringifying it and parsing it.
 * This can be useful to check equality of json variables with json objects
 * obtained from a file, because e.g. stringifying strips `undefined` values.
 *
 * @function
 * @arg {*} any
 * @return {*} any
 *
 * @example
 *
> actual = {a: 1, b: undefined}
{a: 1, b: undefined}
>
> // note how `JSON.stringify` works
> JSON.stringify(actual)
'{"a":1}'
>
> expectedFromFile = {a: 1}
> assert.deepStrictEqual(actual, expectedFromFile)
Uncaught AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
+ actual - expected

  {
    a: 1,
+   b: undefined
  }
>
> sanitizedObj = sanitize(actual)
> assert.deepStrictEqual(sanitizedObj, expectedFromFile)
undefined

> array = [1, undefined]
> sanitize(array)
[1, null]
 *
 * @since 0.17.0
 */
export const sanitize = _.pipe([JSON.stringify, JSON.parse]);
