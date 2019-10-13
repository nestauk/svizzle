/**
* @module @svizzle/utils/array-iterable
*/

/**
 * Return the shorter iterable of the provided pair.
 *
 * @function
 * @arg {iterable[]}
 * @return {iterable}
 *
 * @example
getShorter([[1, 2], ['b'], [1, 2, 3], ['a']]) // ['b']
getShorter(['abc', 'a', [1]]) // 'a'
getShorter(['bc', 'g', '']) // ''
getShorter([[3, 4], [1, 2]]) // [3, 4]
getShorter(['b', 'a']) // 'b'
getShorter([]) // undefined
getShorter('') // undefined
 *
 * @version 0.5.0
 */

export const getShorter = iterable => {
  let result;

  if (iterable.length > 0) {
    let i = 0;
    [result] = iterable;

    if (result.length > 0) {
      while (++i <= iterable.length - 1) {
        result = result.length <= iterable[i].length
          ? result
          : iterable[i];

        // can't be shorter than zero
        if (result.length === 0) {
          break;
        }
      }
    }
  }

  // undefined if we provide an empty iterable
  return result;
}
