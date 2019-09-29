/**
* @module @svizzle/geometry/2DPoint
*/

import * as _ from "lamb";
import {__} from "lamb";

import {vectorLength2D} from "./2DVector";

/**
 * Creates a position object from an array of 2 numbers
 *
 * @function
 * @arg {array} pointArray - An array of 2 numbers
 * @return {object} - An object with {x, y} coordinates.
 *
 * @example [1, 2] => {x: 1, y: 2}
 *
 * @version 0.1.0
 */
export const makePosition2D = _.partial(_.make, [["x", "y"], __]);

/**
 * Return the distance between two 2D points
 *
 * @function
 * @arg {object} point - The first point
 * @arg {object} point - The second point
 * @return {number} - The distance between the two points
 *
 * @example ({x: 1, y: 1}, {x: 2, y: 2}) => 1.4142135623730951
 *
 * @version 0.1.0
 */
export const getDistance2D = ({x: x1, y: y1}, {x: x2, y: y2}) =>
    vectorLength2D(x2 - x1, y2 - y1);

/**
 * Return the center of two 2D points
 *
 * @function
 * @arg {object} point - The first point
 * @arg {object} point - The second point
 * @return {object} point - The center point
 *
 * @example ({x: 1, y: 1}, {x: 3, y: 3}) => {x: 2, y: 2}
 *
 * @version 0.1.0
 */
export const getTwoPointsCenter = ({x: x1, y: y1}, {x: x2, y: y2}) => ({
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2
});
