/**
* @module @svizzle/geometry/angle
*/

/**
 * Convert degrees to radians
 *
 * @function
 * @arg {number} degrees - An angle in degrees
 * @return {number} radians - The same angle in radians
 *
 * @example
> degToRad(0)
0

> degToRad(45)
0.7853981633974483

> degToRad(90)
1.5707963267948966

> degToRad(180)
3.141592653589793

> degToRad(-90)
-1.5707963267948966
 *
 * @since 0.6.0
 */
export const degToRad = degrees => degrees * Math.PI / 180;

/**
 * Convert radians to degrees
 *
 * @function
 * @arg {number} radians - An angle in radians
 * @return {number} degrees - The same angle in degrees
 *
 * @example
> radToDeg(0)
0

> radToDeg(Math.PI / 4)
45

> radToDeg(Math.PI / 2)
90

> radToDeg(Math.PI)
180

> radToDeg(Math.PI / 2)
-90
 *
 * @since 0.6.0
 */
export const radToDeg = radians => radians * 180 / Math.PI;
