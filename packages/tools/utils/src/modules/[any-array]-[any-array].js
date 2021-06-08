/**
* @module @svizzle/utils/[any-array]-[any-array]
*/

import * as _ from 'lamb';

import {makeBiPermutations} from './array-array';

/**
 * Return a function returning the pair-permutations of the items returned by the provided accessor.
 *
 * @function
 * @arg {function} accessor
 * @return {function} - (Any -> Array)
 *
 * @example
> object = {
  key: 'foobars',
  value: [
    {foo: 'a'},
    {foo: 'b'},
    {bar: 'c'},
    {bar: 'd'}
  ]
}
> makeBiPermutations = makeBiPermutationsWith(getValue)
[
  [{foo: 'a'}, {foo: 'b'}],
  [{foo: 'a'}, {bar: 'c'}],
  [{foo: 'a'}, {bar: 'd'}],
  [{foo: 'b'}, {bar: 'c'}],
  [{foo: 'b'}, {bar: 'd'}],
  [{bar: 'c'}, {bar: 'd'}]
]
 *
 * @since 0.5.0
 */
export const makeBiPermutationsWith = accessor => _.pipe([
	accessor,
	makeBiPermutations,
]);
