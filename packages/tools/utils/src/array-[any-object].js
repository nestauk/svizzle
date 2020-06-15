/**
* @module @svizzle/utils/array-[any-object]
*/

import * as _ from "lamb";

import {makeWithKeys} from "./array-[array-object]";

/**
 * Return a function returning an object by assigning the results of the provided functions assigned to the provided keys.
 *
 * @function
 * @arg {array} array - Array of keys and functions arrays
 * @return {function} - Any -> Object
 *
 * @example
const makeCircle = makeWith([
    ["radius", "perimeter", "area"],
    [_.identity, r => 2 * Math.PI * r, r => Math.PI * Math.pow(r, 2)]
]);
makeCircle(3) // {radius: 3, perimeter: 18.85, area: 28.27}
makeCircle(4) // {radius: 4, perimeter: 25.13, area: 50.27}
 *
 * @version 0.2.0
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithKeys|makeWithKeys}
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithValues|makeWithValues}
 */
export const makeWith = ([keys, functions]) => _.pipe([
	_.collect(functions),
	makeWithKeys(keys)
]);
