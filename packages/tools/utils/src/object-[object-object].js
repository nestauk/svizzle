/**
* @module @svizzle/utils/object-[object-object]
*/

import * as _ from "lamb";

/**
 * Return a function expecting an object to be used as the argument of the provided functions
 *
 * @function
 * @arg {object} object
 * @return {function} - Object -> Object
 *
 * @example
const format = applyFnMap({
    fullname: _.pipe([
        _.collect([_.getKey("fname"), _.getKey("lname")]),
        join(" ")
    ]),
    coords: _.collect([_.getKey("lng"), _.getKey("lat")])
});
const raw = [
    {fname: "John", lname: "Woo", lng: 1, lat: 2},
    {fname: "John", lname: "Foo", lng: 7, lat: 8}
];
const formatted = _.map(raw, format);
// => [
//     {fullname: "John Woo", coords: [1, 2]},
//     {fullname: "John Foo", coords: [7, 8]}
// ]
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
export const applyFnMap = fnMap => obj => _.mapValues(fnMap, _.applyTo([obj]));

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the values of the provided object found in the paths in the correspondent keys.
 * Note that since the provided transforms is an object, paths can be processed only once.
 * However, providing a transform that makes another transform meaningless can generate errors because internally the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Description|for..in statement} is used to list transforms: because the order of iteration is implementation-dependent, the order of the execution could be unpredictable on old browsers.
 * To apply a specific sequence of transforms, including those modifying the same path multiple times, please see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}.
 *
 * @function
 * @arg {object} pathToFn - object with paths as keys and functions as values
 * @return {function} - Object -> Object
 *
 * @example
> const transform = transformPaths({
   'a.a2.a22': _.pipe([Number, Math.sqrt]),
   'a.a3': parseInt,
   'b.b2': parseInt,
 });
> transform({
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: '9',
    },
    a3: '3px',
    a4: '2',
  },
  b: {
    b1: 'b1',
    b2: '4px'
  },
})

{
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: 3,
    },
    a3: 3,
    a4: '2',
  },
  b: {
    b1: 'b1',
    b2: 4
  },
}

> const dangerousTransform = transformPaths({
   'a': _.values,     // assuming we have an object in `a`...
   'a.0': x => 2 * x  // ...if this runs first, it could return `2 * undefined = NaN`
 });
 *
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
export const transformPaths = pathToFn => obj =>
  _.reduce(_.pairs(pathToFn), (acc, [path, fn]) => {
    const value = _.getPathIn(acc, path);

    return _.setPathIn(acc, path, _.application(fn, [value]));
  }, _.merge({}, obj));

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the correspondent values of the provided object .
 * Can be useful with [d3.csvParse]{@link https://github.com/d3/d3-dsv#csvParse}, see the example below.
 *
 * @function
 * @arg {object} fnMap - object with functions as values
 * @return {function} - Object -> Object
 *
 * @example
const conversionFn = transformValues({
    name: _.identity,
    a: _.pipe([Number, Math.sqrt]),
    b: Number,
    width: parseFloat
});
conversionFn({name: "foo", a: "9", b: "2", width: "10px"})
// {name: "foo", a: 3, b: 2, width: 10}

d3.csvParse("baseurl/file.csv", conversionFn);
// [{name: "foo", a: 3, b: 2, width: 10}, {name: "bar", a: 2, b: 4, width: 25}]

> baseurl/file.csv
name,a,b,width
foo,9,2,10px
bar,4,4,25px
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 */
export const transformValues = fnMap => _.mapValuesWith(
  (value, key) => key in fnMap
    ? _.application(fnMap[key], [value])
    : value
);

/**
 * Return a function expecting an object to merge with the input object
 *
 * @function
 * @arg {object} object - Object to be merged to the provided object
 * @return {function} - Object -> Object
 *
 * @example
const mergeB = mergeObj({b: 2});
mergeB({a: 1}) // {a: 1, b: 2}
mergeB({a: 1, b: 1}) // {a: 1, b: 2}
 *
 * @version 0.1.0
 */
export const mergeObj = obj => _.partial(_.merge, [_.__, obj]);

/**
 * Return a function that merges the provided value on the provided key of the expected object
 *
 * @function
 * @arg {string} key - Key where to merge the Value
 * @arg {object} object - Value to be merged
 * @return {function} - Object -> Object
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
