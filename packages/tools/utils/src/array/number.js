import * as _ from "lamb";

/* random */

/**
 * Return a random number in the specified range.
 *
 * @function
 * @arg {array} range
 * @return {number}
 *
 * @example
 * makeRandomNumInRange(1.2, 7.4) // 4.2
 *
 * @version 0.1.0
 */
export const makeRandomNumInRange = ([min, max]) =>
    min + (max - min) * Math.random();

/* max */

/**
 * Return the max of the numbers in the provided array
 *
 * @function
 * @arg {array} array
 * @return {number} max
 *
 * @example arrayMax([-1, -2, 0, 1, 2]) // 2
 *
 * @version 0.1.0
 */
export const arrayMax = _.apply(Math.max);

/**
 * Return a function expecting an array of objects and returning the max of values by the provided key.
 * The same can be done by `arrayMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function}
 *
 * @example

 const maxByA = arrayMaxBy("a");
 maxByA([{a: -1, b: -1}, {a: 0, b: 0}]) // 0
 maxByA([{a: 1, b: 1}, {a: 2, b: -2}]) // 2

 *
 * @version 0.1.0
 */
export const arrayMaxBy = key => _.reduceWith((max, item) => {
    const value = item[key];

    return value > max ? value : max;

    // no need to check if _.has(item, key) because:
    // undefined > -Infinity === false
}, -Infinity);

/**
 * Return a function expecting an array of objects and returning the max of results
 * of applying the provided fuction on all of the array items
 *
 * @function
 * @arg {function} fn
 * @return {function}
 *
 * @example

const maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]));
const maxWithAbsSin([-Math.PI/2, -Math.PI/4]) // 1
const maxWithAbsSin([Math.PI/4, Math.PI/6]) // 0.7071067811865475

 *
 * @version 0.1.0
 */
export const arrayMaxWith = fn => _.reduceWith((max, item) => {
    const value = fn(item);

    return value > max ? value : max;
}, -Infinity);

/* min */

/**
 * Return the min of the numbers in the provided array
 *
 * @function
 * @arg {array} array
 * @return {number} min
 *
 * @example arrayMin([-1, -2, 0, 1, 2]) // -2
 *
 * @version 0.1.0
 */
export const arrayMin = _.apply(Math.min);

/**
 * Return a function expecting an array of numbers and returning the min of values by the provided key
 * The same can be done by `arrayMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function}
 *
 * @example
const minByA = arrayMinBy("a");
minByA([{a: -1, b: -1}, {a: 0, b: 0}]) // -1
minByA([{a: 1, b: 1}, {a: 2, b: -2}]) // 1
 *
 * @version 0.1.0
 */
export const arrayMinBy = key => _.reduceWith((min, item) => {
    const value = item[key];

    return value < min ? value : min;

    // no need to check if _.has(item, key) because:
    // undefined < Infinity === false
}, Infinity);

/**
 * Return a function expecting an array of objects and returning the min of results
 * of applying the provided fuction on all of the array items
 *
 * @function
 * @arg {function} fn
 * @return {function}
 *
 * @example
const minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]));
const minWithAbsSin([-Math.PI/2, -Math.PI/4]) // 0.7071067811865475
const minWithAbsSin([Math.PI/4, Math.PI/6]) // 0.49999999999999994
 *
 * @version 0.1.0
 */
export const arrayMinWith = fn => _.reduceWith((min, item) => {
    const value = fn(item);

    return value < min ? value : min;
}, Infinity);

// IDEA
// arrayMaxWith(fn, globalMax)
// if we reach an expected globalMax, we found the max already, we can stop iterating the array
// example being funcs like sin/cos being limited to [-1, 1]

// TODO for By and With: what if we have string values?
