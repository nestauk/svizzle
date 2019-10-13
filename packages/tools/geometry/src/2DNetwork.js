/**
* @module @svizzle/geometry/2DNetwork
*/

import {makeVectorFeatures} from "./2DVector";

/**
 * Creates a vector from a link
 *
 * @function
 * @arg {object} link - The edge: {source: {x, y}, target: {x, y}}
 * @return {object} - An object `{x, y, length, versor}` representing a vector with its features
 *
 * @example {source: {x, y}, target: {x, y}} => {x, y, length, versor}
 *
 * @version 0.1.0
 */
export const linkVector = link => {
    const x = link.target.x - link.source.x;
    const y = link.target.y - link.source.y;
    const {length, versor} = makeVectorFeatures({x, y});

    return {x, y, length, versor}
}

/**
 * Creates a vector from a link, considering the nodes radiuses.
 * To get the vector between centers, don't pass radiuses or zero them
 *
 * @function
 * @arg {object} link - The edge: {source: {x, y, radius}, target: {x, y, radius}}
 * @return {object} - An object `{x1, y1, x2, y2}` representing origin and tip points
 *
 * @example {source: {x, y, radius}, target: {x, y, radius}} => {x1, y1, x2, y2}
 *
 * @version 0.1.0
 */
export const makeLinkVector = link => {
    const {versor, length} = linkVector(link);

    const sourceRadius = link.source.radius || 0;
    const targetRadius = link.target.radius || 0;
    const sign = length >= sourceRadius ? 1 : -1;

    return {
        x1: link.source.x + versor.x * sourceRadius,
        y1: link.source.y + versor.y * sourceRadius,
        x2: link.target.x - sign * versor.x * targetRadius,
        y2: link.target.y - sign * versor.y * targetRadius
    }
}
