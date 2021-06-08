/**
* @module @svizzle/dev/log/string-[any-any]
*/

import * as _ from 'lamb';

/* taps */

/**
 * Return a function that prints a message and returns the input.
 * This can be useful for example with saveObjPassthrough
 *
 * @function
 * @arg {string} message
 * @return {function} - (Any -> Any) – @sideEffects: console.log
 *
 * @example
> doubleTriple = filepath => _.pipe([
	mapWith(x => 3 * x),
	saveObjPassthrough(filepath)
	tapMessage(`Saved tripled items in ${someFilepath}`),
	mapWith(x => 2 * x),
])
> fn = doubleTriple('foo/bar.json')
> fn([1, 2, 3])
[6, 12, 18]
Saved tripled items in foo/bar.json
 *
 * @since 0.3.0
 */
export const tapMessage = message => x => {
	message && console.log(message);

	return x;
};

/**
 * Return a function that prints the input (preceded by the label, if provided) and returns the input.
 *
 * @function
 * @arg {string} label
 * @return {function} - (Any -> Any) – @sideEffects: console.log
 *
 * @example
> doubleTriple = _.pipe([
	tapValue(),
	mapWith(x => 2 * x),
	tapValue('doubled'),
	mapWith(x => 3 * x),
	tapValue('tripled')
])
> doubleTriple([1,2,3])
[6, 12, 18]
[1, 2, 3] // logged
doubled: [2, 4, 6] // logged
tripled: [6, 12, 18] // logged
 *
 * @since 0.3.0
 */
export const tapValue = label => x => {
	if (label) {
		console.log(`${label}:`, x);
	} else {
		console.log(x);
	}

	return x;
};

/**
 * Return a function that prints the input type (preceded by the label, if provided) and returns the input.
 *
 * @function
 * @arg {string} label
 * @return {function} - (Any -> Any) – @sideEffects: console.log
 *
 * @example
> size = _.pipe([
	tapType(),
	_.values,
	tapType('values'),
	_.getKey('length')
	tapType('length'),
])
> size({a: 1, b: 2})
2
Object // logged
values: Array // logged
length: Number // logged
 *
 * @since 0.3.0
 */
export const tapType = label => x => {
	if (label) {
		console.log(`${label}:`, _.type(x));
	} else {
		console.log(_.type(x));
	}

	return x;
};

/**
 * Return a function that prints the input type an the input (preceded by the label, if provided) and returns the input.
 *
 * @function
 * @arg {string} label
 * @return {function} - (Any -> Any) – @sideEffects: console.log
 *
 * @example
> size = _.pipe([
	tapTypeAndValue(),
	_.values,
	tapTypeAndValue('values'),
	_.getKey('length')
	tapTypeAndValue('length'),
])
> size({a: 1, b: 2})
2
Object {a: 1, b: 2} // logged
values: Array [1, 2] // logged
length: Number 2 // logged
 *
 * @since 0.3.0
 */
export const tapTypeAndValue = label => x => {
	if (label) {
		console.log(`${label}:`, _.type(x), x);
	} else {
		console.log(_.type(x), x);
	}

	return x;
};
