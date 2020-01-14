/**
* @module @svizzle/utils/string-[any-any]
*/

import * as _ from "lamb";

/* taps */

/**
 * Return a function that prints a message and returns the input.
 * This can be useful for example with saveObjPassthrough
 *
 * @function
 * @arg {string} message
 * @return {function} - (Any -> Any) @side_effects: console.log
 *
 * @example
const doubleTriple = filepath => _.pipe([
  mapWith(x => 3 * x),
  saveObjPassthrough(filepath)
  tapMessage(`Saved tripled items in ${someFilepath}`),
  mapWith(x => 2 * x),
])

const fn = doubleTriple('foo/bar.json');
fn([1, 2, 3])
// Saves [3, 6, 9] in foo/bar.json
// Prints 'Saves tripled items in foo/bar.json'
// Returns [6, 12, 18]
 *
 * @version 0.5.0
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
 * @return {function} - (Any -> Any), @side_effects: console.log
 *
 * @example
const doubleTriple = _.pipe([
  tapValue(),
  mapWith(x => 2 * x),
  tapValue('doubled'),
  mapWith(x => 3 * x),
  tapValue('tripled')
])

doubleTriple([1,2,3])
// returns [6, 12, 18] and logs:
// [1, 2, 3]
// doubled: [2, 4, 6]
// tripled: [6, 12, 18]
 *
 * @version 0.1.0
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
 * @return {function} - (Any -> Any), @side_effects: console.log
 *
 * @example
 const size = _.pipe([
   tapType(),
   _.values,
   tapType('values'),
   _.getKey('length')
   tapType('length'),
 ]);

 size({a: 1, b: 2})
 // returns 2 and logs:
 // Object
 // values: Array
 // length: Number
 *
 * @version 0.1.0
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
 * @return {function} - (Any -> Any), @side_effects: console.log
 *
 * @example
const size = _.pipe([
  tapTypeAndValue(),
  _.values,
  tapTypeAndValue('values'),
  _.getKey('length')
  tapTypeAndValue('length'),
]);

size({a: 1, b: 2})
// returns 2 and logs:
// Object {a: 1, b: 2}
// values: Array [1, 2]
// length: Number 2
 *
 * @version 0.3.0
 */
export const tapTypeAndValue = label => x => {
  if (label) {
    console.log(`${label}:`, _.type(x), x);
  } else {
    console.log(_.type(x), x);
  }

  return x;
};
