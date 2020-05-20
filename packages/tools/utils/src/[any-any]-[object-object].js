/**
* @module @svizzle/utils/[any-any]-[object-object]
*/

import * as _ from "lamb";

import {concat} from "./array_proto-array";

/* re-shaping */

/**
 * Return a function expecting an object and returning an object grouping its values using the provided accessor.
 * Note that this works by concatenating all values before indexing hence you can also directly index values being arrays (see the second example).
 *
 * @function
 * @arg {function} accessor - Any -> Any
 * @return {function} - Object -> Object
 *
 * @example
> const regroupedByX = groupValuesWith(obj => obj.x);

> // single values
> const obj1 = {
  a: {x: 1, y: 2},
  b: {x: 3, y: 4},
  c: {x: 'a', y: 6},
  d: {x: 1, y: 8},
};
> regroupedByX(obj1)
{
  1: [{x: 1, y: 2}, {x: 1, y: 8}],
  3: [{x: 3, y: 4}],
  a: [{x: 'a', y: 6}],
}

> // values as arrays
> const obj2 = {
  a: [{x: 1, y: 2}, {x: 3, y: 4}],
  b: [{x: 'a', y: 6}, {x: 1, y: 8}],
};
> regroupedByX(obj2)
{
  1: [{x: 1, y: 2}, {x: 1, y: 8}],
  3: [{x: 3, y: 4}],
  a: [{x: 'a', y: 6}],
}
 *
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].indexValuesWith|indexValuesWith}
 */
export const groupValuesWith = accessor => _.pipe([
	_.values,
	_.apply(concat),
	_.groupBy(accessor)
]);

/**
 * Return a function expecting an object and returning an index of all its values using the provided accessor.
 * Use this if you're sure that applying the accessor on the object values returns unique strings.
 * Note that this works by concatenating all values before indexing hence you can also directly index values being arrays (see the second example).
 *
 * @function
 * @arg {function} accessor - Any -> Any
 * @return {function} - Object -> Object
 *
 * @example
> const reindexedByX = indexValuesWith(obj => obj.x);

> // single values
> const obj1 = {
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}
> reindexedByX(obj1)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}

> // values as arrays
> const obj2 = {
  a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
  b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
};
> reindexedByX(obj2)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
};
 *
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].groupValuesWith|groupValuesWith}
 */
export const indexValuesWith = accessor => _.pipe([
	_.values,
	_.apply(concat),
	_.indexBy(accessor)
]);

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
