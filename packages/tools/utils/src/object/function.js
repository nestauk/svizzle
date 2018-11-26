import * as _ from "lamb";

/**
 * Return a function expecting an object to be used as the argument of the provided functions
 *
 * @function
 * @arg {object}
 * @return {function}
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
 */
export const applyFnMap = fnMap => obj => _.mapValues(fnMap, _.applyTo([obj]));

/**
 * Return a function expecting an object and applying the functions in the provided object to the correspondent object values
 * Can be useful with [d3.csvParse]{@link https://github.com/d3/d3-dsv#csvParse}, see the example below.
 *
 * @function
 * @arg {object} fnMap - object with functions as values
 * @return {function}
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
 */
export const transformValues = fnMap => _.mapValuesWith(
    (value, key) => _.application(fnMap[key], [value])
);
