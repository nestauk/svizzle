/**
* @module @svizzle/utils/function/fn/object/object
*/

import * as _ from "lamb";

/**
 * Return a function expecting two objects to merge using the provided merge function
 *
 * @function
 * @arg {function} fn - Merge function
 * @return {function} - Object -> Object
 *
 * @example

const mergeWithSubtract = mergeWith(_.subtract)

mergeWithSubtract(
    {a: 8, b: 3},
    {a: 5, b: 2, c: 7}
)
=>  {a: 3, b: 1, c: 7},

 *
 * @version 0.1.0
 */
export const mergeWith = fn => (a, b) => _.reduce(
    _.pairs(b),
    (obj, [bKey, bValue]) => {
        obj[bKey] = _.has(obj, bKey) ? fn(obj[bKey], bValue) : bValue;

        return obj;
    },
    _.merge({}, a) // copy of a
);
