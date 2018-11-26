/**
 * Calculates the length of a vector
 *
 * @function
 * @arg {object} point - A point representing a vector starting in the origin
 * @return {number} The vector length
 *
 * @example {x: 1, y: 1} => 1.4142135623730951
 *
 * @version 0.1.0
 */
export const vectorLength2D = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

/**
 * Calculates length and versor of a vector
 *
 * @function
 * @arg {object} point - A point representing a vector starting in the origin
 * @return {object} The vector features: {length, versor}
 *
 * @example {x: 1, y: 1} => {length: 1.414, versor: {x: 0.707, y: 0.707}}
 * @example {x: 0, y: 0} => {length: 0, versor: {x: 0, y: 0}}
 *
 * @version 0.1.0
 */
export const makeVectorFeatures = ({x, y}) => {
    const length = vectorLength2D(x, y);
    const versor = length
        ? {x: x / length, y: y / length}
        : {x: 0, y: 0};

    return {length, versor};
}

// /*
// {x: 1, y: 1} => {x: 0.707, y: 0.707}
// */
// export const makeVersor = ({x, y}) => {
//     const length = vectorLength2D(x, y);
//
//     return {
//         x: length && x / length,
//         y: length && y / length
//     };
// }
