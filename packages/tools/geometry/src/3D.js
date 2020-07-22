/**
* @module @svizzle/geometry/3D
*/

import * as _ from 'lamb';

/**
 * Creates a position object from an array of 3 numbers
 *
 * @function
 * @arg {array} pointArray - An array of 3 numbers
 * @return {object} - An object with {x, y, z} coordinates.
 *
 * @example
> makePosition3D([1, 2, 3])
{x: 1, y: 2, z: 3}
 *
 * @version 0.1.0
 */
export const makePosition3D = _.partial(_.make, [['x', 'y', 'z'], _.__]);
