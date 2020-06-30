/**
* @module @svizzle/utils/any-boolean
*/

import * as _ from "lamb";

/**
 * Return true is the input is an arguments list
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isArray([]) // false
isArray([1, 2]) // false
isArray({a: 1}) // false
isArray("foo") // false

function returnArgs () {
  return arguments;
}
isArray(returnArgs()) // true
 *
 * @version 0.5.0
 */
export const isArguments = _.isType("Arguments");

/**
 * Return true is the input is an array
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isArray([]) // true
isArray([1, 2]) // true
isArray({a: 1}) // false
isArray("foo") // false

function returnArgs () {
    return arguments;
}
isArray(returnArgs()) // false
 *
 * @version 0.1.0
 */
export const isArray = _.isType("Array");

/**
 * Return true is the input is a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isNumber(1) // true
isNumber(NaN) // true
isNumber(Infinity) // true
isNumber({a: 1}) // false
isNumber("foo") // false

function returnArgs () {
    return arguments;
}
isNumber(returnArgs()) // false
 *
 * @version 0.1.0
 */
export const isNumber = _.isType("Number");

/**
 * Return true is the input is an object
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isObject({a: 1}) // true
isObject([]) // false
isObject(1) // false
isObject(NaN) // false
isObject(Infinity) // false
isObject("foo") // false

function returnArgs () {
    return arguments;
}
isObject(returnArgs()) // false
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isObjectWith|isObjectWith}
 */
export const isObject = _.isType("Object");

/**
 * Return true is the input is a string
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isString("") // true
isString("foo") // true
isString(NaN) // false
isString(Infinity) // false
isString(1) // false
isString([1, 2]) // false
isString({a: 1}) // false

function returnArgs () {
    return arguments;
}
isString(returnArgs()) // false
 *
 * @version 0.1.0
 */
export const isString = _.isType("String");

/**
 * Return true is the input is not a NaN.
 * Remember that {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior|isNaN coerces the input with Number()} to the output can be a bit surprising.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isNotNaN(1) // true
isNotNaN(Infinity) // true
isNotNaN([123]) // true
isNotNaN("123") // true
isNotNaN(true) // true
isNotNaN(false) // true
isNotNaN(null) // true

isNotNaN([1, 2]) // false
isNotNaN({a: 1}) // false
isNotNaN("123px") // false
isNotNaN("foo") // false
isNotNaN(undefined) // false
isNotNaN(NaN) // false

function returnArgs () {
    return arguments;
}
isNotNaN(returnArgs()) // false
 *
 * @version 0.1.0
 */
export const isNotNaN = _.not(isNaN);

/**
 * Return true is the input is a valid number (including not being NaN)
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
// 👍
[
    1,
    1.2,
    Infinity,
].forEach(x => {
    isValidNumber(x) // true
});

// 👎
[
    [],
    [123],
    [1, 2],
    {a: 1},
    "",
    "123",
    "123px",
    "foo",
    true,
    null,
    undefined,
    NaN,
    returnArgs()
].forEach(x => {
    isValidNumber(x) // false
});
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isValidNumberWith|isValidNumberWith}
 */
export const isValidNumber = _.allOf([isNumber, isNotNaN]);

/**
 * Return true if the input, converted to Number, is indeed a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
 // 👍
 it("should return true if the input, converted to Number, is indeed a number", function() {
     [
         [],
         [2],
         "",
         "123",
         null,
         true,
     ].forEach(x => {
         toNumberisValidNumber(x) // true
     });
 });

 // 👎
 it("should return false if the input, converted to Number, is not a number", function() {
     [
         {a: 1},
         [1, 2],
         "123px",
         "foo",
         undefined,
         returnArgs(),
         returnArgs(1),
         returnArgs(1, 2),
         returnArgs(1, 2, 3)
     ].forEach(x => {
         toNumberisValidNumber(x) // false
     });
 });
 * @version 0.1.0
 */
export const toNumberisValidNumber = _.pipe([Number, isValidNumber]);

/**
 * Return true if the input, parsed to float, is a valid number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
 // 👍
 it("should return true if the input, parsed to float, is a valid number", function() {
     [
         [1],
         [1, 2],
         [1, 2, 3],
         "123",
         "123px",
     ].forEach(x => {
         toFloatIsValidNumber(x) // true
     });
 });

 // 👎
 it("should return true if the input, parsed to float, is not a valid number", function() {
     [
         [],
         "",
         "foo",
         {a: 1},
         true,
         null,
         undefined,
         returnArgs(),
         returnArgs(1),
         returnArgs(1, 2),
         returnArgs(1, 2, 3)
     ].forEach(x => {
         toFloatIsValidNumber(x) // false
     });
 });
 * @version 0.1.0
 */
export const toFloatIsValidNumber = _.pipe([parseFloat, isValidNumber]);

/**
 * Return true is the input is not undefined or null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isNotNil(1) // true
isNotNil(Infinity) // true
isNotNil("123") // true
isNotNil("123px") // true
isNotNil([1, 2]) // true
isNotNil({a: 1}) // true
isNotNil(true) // true
isNotNil(false) // true
isNotNil(NaN) // true

isNotNil(undefined) // false
isNotNil(null) // false

function returnArgs () {
    return arguments;
}
isNotNil(returnArgs()) // false
 *
 * @version 0.2.0
 */
export const isNotNil = _.not(_.isNil);

/**
 * Return true is the input is not null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
isNotNull(1) // true
isNotNull(Infinity) // true
isNotNull("123") // true
isNotNull("123px") // true
isNotNull([1, 2]) // true
isNotNull({a: 1}) // true
isNotNull(true) // true
isNotNull(false) // true
isNotNull(NaN) // true
isNotNull(undefined) // true

isNotNull(null) // false

function returnArgs () {
    return arguments;
}
isNotNull(returnArgs()) // true
 *
 * @version 0.4.0
 */
export const isNotNull = _.not(_.isNull);
