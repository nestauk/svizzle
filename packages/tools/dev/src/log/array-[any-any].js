/**
* @module @svizzle/dev/log/array-[any-any]
*/

/**
 * Return a function that prints a message with the result of applying the provided function to the input
 * and return the input.
 *
 * @function
 * @arg {array} - [function, label]
 * @return {function} - (Any -> Any) - @sideEffects: console.log
 *
 * @example
> doubleTriple = filepath => _.pipe([
	mapWith(x => 3 * x),
	saveObjPassthrough(filepath)
	tapWith([arraySum, `Saved tripled items in ${someFilepath} – total`]),
	mapWith(x => 2 * x),
])
> fn = doubleTriple('foo/bar.json')
> fn([1, 2, 3])
[6, 12, 18]
'Saved tripled items in foo/bar.json – total: 18'
 *
 * @version 0.3.0
 */
export const tapWith = ([func, label]) => x => {
	if (label) {
		console.log(`${label}:`, func(x));
	} else {
		console.log(func(x));
	}

	return x;
};
