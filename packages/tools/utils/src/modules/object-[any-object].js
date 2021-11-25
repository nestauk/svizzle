/**
* @module @svizzle/utils/object-[any-object]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting any kind of input to be used as the argument
 * of the provided functions
 *
 * @function
 * @arg {object} fnMap - a map of keys and functions Any -> Any
 * @return {function} - Any -> Object
 *
 * @example
> array = [
	{fname: 'John', lname: 'Woo', lng: 1, lat: 2},
	{fname: 'John', lname: 'Foo', lng: 7, lat: 8}
];
> format = applyFnMap({
	coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
	fullname: _.pipe([
		_.collect([_.getKey('fname'), _.getKey('lname')]),
		_.joinWith(' ')
	]),
});
> formatted = _.map(raw, format)
[
	{coords: [1, 2], fullname: 'John Woo'},
	{coords: [7, 8], fullname: 'John Foo'}
]

> checkNumber = applyFnMap({
	range: _.collect([_.add(1), _.deduct(1)]),
	sign: Math.sign,
})
> checkNumber(1)
{range: [2, 0], sign: 1}
> checkNumber(-10)
{range: [-9, -11], sign: -1}

> checkString = applyFnMap({
	parts: _.splitBy('/'),
	hasNumbersOnly: _.testWith(/^\d+$/gu),
})
> checkString('aa/bb')
{parts: ['aa', 'bb'], hasNumbersOnly: false}
> checkString('123')
{parts: ['123'], hasNumbersOnly: true}
> checkString('123/g')
{parts: ['123', 'g'], hasNumbersOnly: false}

*
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
export const applyFnMap = fnMap => any => _.mapValues(fnMap, _.applyTo([any]));
