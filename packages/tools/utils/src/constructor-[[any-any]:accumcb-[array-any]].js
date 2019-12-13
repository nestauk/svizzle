/**
* @module @svizzle/utils/constructor-[[any-any]:accumcb-[array-any]]
*/

import * as _ from "lamb";

/**
 * Return a function expecting a reducer function and returning a reduce function
 * with an instance of the provided constructor as the initial value
 * and expecting the array to reduce.
 *
 * @function
 * @arg {object} constructor
 * @return {function} - (Any -> Any):accumcb -> (Array -> Any)
 *
 * @example
const reduceFromEmptyObject = reduceTo(Object);
const foo = reduceFromEmptyObject((acc, x) => {
  acc[x.id] = x.name;
  return acc;
});
foo([{id: '00', name: 'a'}, {id: '11', name: 'b'}])
// Object { 11: "b", 00: "a" }
 *
 * @version 0.3.0
 */
export const reduceTo = ctor => fn => _.reduceWith(fn, new ctor());
