/**
* @module @svizzle/utils/array-[any-any]
*/

/**
 * Return a function that prints a message with the result of applying the provided function to the input
 * and return the input.
 *
 * @function
 * @arg {array} - [function, label]
 * @return {function} - (Any -> Any) @side_effects: console.log
 *
 * @example
const doubleTriple = filepath => _.pipe([
  mapWith(x => 3 * x),
  saveObjPassthrough(filepath)
  tapWith([arraySum, `Saved tripled items in ${someFilepath} – total`]),
  mapWith(x => 2 * x),
])

const fn = doubleTriple('foo/bar.json');
fn([1, 2, 3])
// Saves [3, 6, 9] in foo/bar.json
// Prints 'Saves tripled items in foo/bar.json – total: 18'
// Returns [6, 12, 18]
 *
 * @version 0.5.0
 */
export const tapWith = ([func, label]) => x => {
  if (label) {
    console.log(`${label}:`, func(x));
  } else {
    console.log(func(x));
  }

  return x;
};
