/**
* @module @svizzle/utils/[any-array]-[array-object]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting an array and returning an object
 * with keys and values defined by the provided function, which expects a value
 * and returns a pair [key, value].
 *
 * @function
 * @arg {function} valueToPair - (Any -> Array) Turns a value into a pair
 * @return {function} - (Array -> Object)
 *
 * @example
> valueToPair = x => [`${x}${x}`, `${x}${x}${x}`];
> arrayToObject1 = makeArrayToObjectWith(valueToPair)
> arrayToObject1(['a', 'b', 1])
{aa: 'aaa', bb: 'bbb', 11: '111'}
>
> valueIndexToPair = (x, i) => [`${i}${i}`, `${x}${x}${x}`];
> arrayToObject2 = makeArrayToObjectWith(valueIndexToPair)
> arrayToObject2(['a', 'b', 1])
{'00': 'aaa', '11': 'bbb', '22': '111'}
 *
 * @version 0.13.0
 */
export const makeArrayToObjectWith = valueIndexToPair => _.pipe([
	_.mapWith(valueIndexToPair),
	_.fromPairs,
]);
