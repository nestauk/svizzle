/**
* @module @svizzle/utils/[any-any]-[object-boolean]
*/

import * as _ from 'lamb';

import {areEqualWith} from './[any-any]-[array-boolean].js';

/**
* Return a function expecting an object and returning `true` if its values,
* once processed with the provided `accessor` function, are all equal.
*
* @function
* @arg {function} accessor - Any -> Any
* @return {function} - Object -> Boolean
*
* @example
> areValuesEqual = areValuesEqualWith(getValue)
> areValuesEqual({
	a: {key: 'a', value: 1},
	b: {key: 'b', value: 1},
})
true
> areValuesEqual({
	a: {key: 'a', value: 1},
	b: {key: 'b', value: 2},
})
false
 * @see {@link module:@svizzle/utils/object-boolean|areValuesEqual}
 *
 * @since 0.21.0
 */
export const areValuesEqualWith = accessor => _.pipe([
	_.values,
	areEqualWith(accessor),
]);
