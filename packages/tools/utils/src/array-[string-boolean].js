/**
* @module @svizzle/utils/array-[string-boolean]
*/

import * as _ from "lamb";

/**
 * Return a function that checks if a string contains one of the provided strings.
 *
 * @function
 * @arg {array} strings - strings to check against
 * @return {function} - String -> Boolean
 *
 * @example
const isWeight = containsOneOf(['(g)', '(mg)', '(mcg)']);
const weightLabels = [
  'id',
  'Energy (kcal)',
  'Protein (g)',
  'Cholesterol (mg)',
  'Selenium (mcg)'
].filter(isWeight);
// ['Protein (g)', 'Cholesterol (mg)', 'Selenium (mcg)']
 *
 * @version 0.4.0
 */
export const containsOneOf = array =>
	string => _.someIn(array, x => string.includes(x));
