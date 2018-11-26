import * as _ from "lamb";
import {__} from "lamb";

import {toFloatOrIdentity} from "../any/any";
import {concat} from "../array/array";

/* map values */

/**
 * Return a copy of the object with values converted to float.
 * Use if absolutely sure all values can be turned into numbers to avoid `NaN`s,
 * otherwise use `mapValuesToFloatPossibly`.
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example

mapValuesToFloat({a: "1.2px",  b: "20px"}) // {a: 1.2,  b: 20}
mapValuesToFloat({a: "1.2",  b: "h2o"}) // {a: 1.2,  b: NaN}

 *
 * @version 0.1.0
 */
export const mapValuesToFloat = _.mapValuesWith(parseFloat);

/**
 * Return the object with values converted to numbers where possible
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example

mapValuesToFloatPossibly({a: "1.2", b: "2px", c: "h2o"})
// {a: 1.2,  b: 2, c: "h2o"}

 *
 * @version 0.1.0
 */
export const mapValuesToFloatPossibly = _.mapValuesWith(toFloatOrIdentity);

/**
 * Return a copy of the object with values converted to numbers.
 * Use if absolutely sure all values can be turned into numbers to avoid `NaN`s,
 * otherwise use `mapValuesToFloatPossibly`.
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example

mapValuesToNumber({a: "1.2",  b: "2"}) // {a: 1.2,  b: 2}
mapValuesToNumber({a: "1.2",  b: "2s"}) // {a: 1.2,  b: NaN}

 *
 * @version 0.1.0
 */
export const mapValuesToNumber = _.mapValuesWith(Number);

/* merge */

/**
 * Return a function expecting an object to merge with the input object
 *
 * @function
 * @arg {object} inputObject - Object to be merged to the provided object
 * @return {function}
 *
 * @example
const mergeB = mergeObj({b: 2});
mergeB({a: 1}) // {a: 1, b: 2}
mergeB({a: 1, b: 1}) // {a: 1, b: 2}
 *
 * @version 0.1.0
 */
export const mergeObj = obj => _.partial(_.merge, [__, obj]);

/**
 * Return a function that merges the provided value on the provided key of the expected object
 *
 * @function
 * @arg {string} key - Key where to merge the Value
 * @arg {object} object - Value to be merged
 * @return {array}
 *
 * @example

const mergeFooValue = makeMergeKeyValue("foo", {b: -2, c: -3});

mergeFooValue({
    foo: {a: 1, b: 2},
    bar: {k: 1}
})
=> {
    foo: {a: 1, b: -2, c: -3},
    bar: {k: 1}
}

mergeFooValue({
    bar: {k: 1}
})
=> {
    foo: {b: -2, c: -3},
    bar: {k: 1}
}

 *
 * @version 0.1.0
 */
export const makeMergeKeyValue = (key, value) => object =>
    _.merge(object, {
        [key]: object[key]
            ? _.merge(object[key], value)
            : value
    });

/**
 * Return a function expecting two objects to merge using the provided merge function
 *
 * @function
 * @arg {function} fn - Merge functon
 * @return {function}
 *
 * @example

const mergeWithSubtract = mergeWith(_.subtract)

mergeWithSubtract(
    {a: 8, b: 3},
    {a: 5, b: 2, c: 7}
)
=>  {a: 3, b: 1, c: 7},

 *
 * @version 0.1.0
 */
export const mergeWith = fn => (a, b) => _.reduce(
    _.pairs(b),
    (obj, [bKey, bValue]) => {
        obj[bKey] = _.has(obj, bKey) ? fn(obj[bKey], bValue) : bValue;

        return obj;
    },
    _.merge({}, a) // copy of a
);

/**
 * Return the merge of the two provided objects adding values of correspondent keys
 *
 * @function
 * @arg {object} - The base object
 * @arg {object} - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

const obj1 = {a: 1,  b: 2};
const obj2 = {a: 10,       c: 1};
const obj3 = {a: 11, b: 2, c: 1};

mergeWithSum(obj1, obj2) // obj3

 *
 * @version 0.1.0
 */
export const mergeWithSum = mergeWith(_.sum);

/**
 * Return the merge of the two provided objects merging values of correspondent keys
 *
 * @function
 * @arg {object} - The base object
 * @arg {object} - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

const obj1 = {A: {a: 1       }, B: {       b: 1}};
const obj2 = {A: {      b: 10}, B: {a: 10      }};
const obj3 = {A: {a: 1, b: 10}, B: {a: 10, b: 1}};

mergeWithMerge(obj1, obj2) // obj3
 *
 * @version 0.1.0
 */
export const mergeWithMerge = mergeWith(_.merge);

/**
 * Return the merge of the two provided objects concatenating values of correspondent keys
 *
 * @function
 * @arg {object} - The base object
 * @arg {object} - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

const obj1 = {a: [1, 2, 3         ], b: [4, 5, 6         ]};
const obj2 = {a: [         1, 2, 3], b: [         4, 5, 6]};
const obj3 = {a: [1, 2, 3, 1, 2, 3], b: [4, 5, 6, 4, 5, 6]};

mergeWithConcat(obj1, obj2) // obj3

 *
 * @version 0.1.0
 */
export const mergeWithConcat = mergeWith(concat);

/**
 * Return the merge of the two provided objects appending values of correspondent keys
 *
 * @function
 * @arg {object} - The base object
 * @arg {object} - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

const obj1 = {a: [1, 2, 3],    b: [4, 5, 6]     };
const obj2 = {a:           4,  b:           [7] };
const obj3 = {a: [1, 2, 3, 4], b: [4, 5, 6, [7]]};

mergeWithAppendTo(obj1, obj2) // obj3

 *
 * @version 0.1.0
 */
export const mergeWithAppendTo = mergeWith(_.appendTo);
