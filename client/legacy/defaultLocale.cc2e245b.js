import { _ as getKey$1, a6 as collect, a7 as isUndefined, Z as range, a8 as last, a9 as appendTo, U as mapWith, X as sortWith, aa as sorterDesc, $ as head, W as pipe, ab as zipWithIndex, ac as setIn, ad as pick, ae as partial, af as __, ag as zip } from './client.c3033a77.js';

/**
* @module @svizzle/utils/object-any
*/

/**
 * Retrieve the 'id' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.id
 *
 * @example
> getId({id: 'foo', name: 'bar'})
'foo'
 *
 * @since 0.4.0
 */
const getId = getKey$1('id');

/**
 * Retrieve the 'key' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.key
 *
 * @example
> getKey({key: 'foo', value: 'bar'})
'foo'
 *
 * @since 0.4.0
 */
const getKey = getKey$1('key');

/**
 * Retrieve the 'value' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.value
 *
 * @example
> getValue({key: 'foo', value: 'bar'})
'bar'
 *
 * @since 0.4.0
 */
const getValue = getKey$1('value');

/**
 * Retrieve the 'values' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.values
 *
 * @example
> getValues({key: 'foo', values: [0, 1, 2, 3]})
[0, 1, 2, 3]
 *
 * @since 0.4.0
 */
const getValues = getKey$1('values');

/**
* @module @svizzle/utils/array-array
*/

/**
 * Return an array containing the first and the last element of the provided array.
 *
 * @function
 * @arg {array} array
 * @return {array}
 *
 * @example getFirstAndLast([0, 1, 2, 3, 4]) // [0, 4]
 *
 * @since 0.3.0
 */
const getFirstAndLast = collect([head, last]);

/**
 * Return the range within the provided limits, both limits being included.
 *
 * @function
 * @arg {array} args
 * @arg {number} args.0 - start
 * @arg {number} args.1 - end
 * @arg {number} [args.2 = 1] - step
 * @return {array}
 *
 * @example
> inclusiveRange([2, 5])
[2, 3, 4, 5]
> inclusiveRange([2, 12])
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
> inclusiveRange([2, 12, 2])
[2, 4, 6, 8, 10, 12]
> inclusiveRange([2, 11, 2])
[2, 4, 6, 8, 10];
 *
 * @since 0.7.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#range
 */
const inclusiveRange = _ref => {
  let [start, end, step = 1] = _ref;
  if (start === end) {
    return isUndefined(start) ? [] : [start];
  }
  const range$1 = range(start, end, step);
  return range$1.length === 0 || last(range$1) + step > end ? range$1 : appendTo(range$1, end);
};

/**
 * Pluck the `key` property value from an array of objects.
 *
 * @function
 * @arg {object[]} - key/value items
 * @return {string[]} array of `key`s.
 * @example
> pluckKey([{key: 'John', value: 'Foo'}, {key: 'Jane', value: 'Bar'}])
['John', 'Jane']
> pluckKey([{key: 'b', value: 2}, {key: 'a', value: 1}])
['b', 'a']
 */
const pluckKey = mapWith(getKey);

/**
 * Return a copy of the provided array of objects
 * assigning each object index to a property with the provided key
 * (defaulting to `index`)
 *
 * @function
 * @arg {object[]} - Array of objects
 * @return {object[]} - Array of objects
 *
 * @example
> setIndex = setIndexAsKey()
> setIndex([{a: 2}, {c: 5}])
[{a: 2, index: 0}, {c: 5, index: 1}]

> setIndexAsIdx = setIndexAsKey('idx')
> setIndexAsIdx([{a: 2}, {c: 5}])
[{a: 2, idx: 0}, {c: 5, idx: 1}]
 *
 * @since 0.9.0
 */
const setIndexAsKey = function () {
  let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  return pipe([zipWithIndex, mapWith(_ref2 => {
    let [obj, index] = _ref2;
    return setIn(obj, key, index);
  })]);
};

/**
 * Return a copy of the provided array with items
 * sorted by `value` (ascending) then by `key` (descending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueAscKeyAsc(items)
[
	{key: 'a', value: -30},
	{key: 'b', value: 1},
	{key: 'a', value: 1},
	{key: 'a', value: 4},
]
 *
 * @since 0.5.0
 */

sortWith([getValue, sorterDesc(getKey)]);

/**
 * Return a copy of the provided array with items
 * sorted by `value` (descending) then by `key` (ascending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueDescKeyAsc(items)
[
	{key: 'a', value: 4},
	{key: 'a', value: 1},
	{key: 'b', value: 1},
	{key: 'a', value: -30},
]
 *
 * @since 0.5.0
 */
sortWith([sorterDesc(getValue), getKey]);

/**
 * Return a copy of the provided array with items
 * sorted by `value` (descending) then by `key` (descending)
 *
 * @function
 * @arg {array} - key/value items
 * @return {array} - sorted items
 *
 * @example
> items = [
	{key: 'b', value: 1},
	{key: 'a', value: 4},
	{key: 'a', value: -30},
	{key: 'a', value: 1},
]
> sortValueDescKeyDesc(items)
[
	{key: 'a', value: 4},
	{key: 'b', value: 1},
	{key: 'a', value: 1},
	{key: 'a', value: -30},
]
 *
 * @since 0.5.0
 */
sortWith([sorterDesc(getValue), sorterDesc(getKey)]);

/**
* @module @svizzle/utils/array-[array-array]
*/

/**
 * Return a function expecting an array and that applies the provided transforms to its elements
 *
 * @function
 * @arg {array} transforms - array of functions
 * @return {function} - Array -> Array
 *
 * @example
> transformer = makeArrayTransformer([x => x * 20, x => x + 3])
> transformer([2, 2])
[40, 5]
> transformer = makeArrayTransformer([x => x * 20])
> transformer([1, 1, 1, 1, 1])
[20]
> transformer = makeArrayTransformer([x => x * 20, x => x + 3])
> transformer([1])
[20]
 *
 * @since 0.1.0
 */
const makeArrayTransformer = fnArr => pipe([partial(zip, [fnArr, __]), mapWith(_ref => {
  let [fn, arg] = _ref;
  return fn(arg);
})]);

/**
 * Return a function plucking the provided keys from the expected array
 *
 * @function
 * @arg {array} keys - array of keys to pluck
 * @return {function} - Array -> Array
 *
 * @example
> select = pluckKeys(['a', 'k'])
> select([
	{a: 1, b: 2, c: 3, k: 4},
	{a: 5, b: 8},
])
[{a: 1, k: 4}, {a: 5}]
 *
 * @since 0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#pluck
 */
const pluckKeys = keys => mapWith(pick(keys));

function formatDecimal (x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i,
    coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}

function exponent (x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup (grouping, thousands) {
  return function (value, width) {
    var i = value.length,
      t = [],
      j = 0,
      g = grouping[0],
      length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

function formatNumerals (numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim (s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;
function formatPrefixAuto (x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1],
    i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
    n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded (x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};

function identity (x) {
  return x;
}

var map = Array.prototype.map,
  prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale (locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
    currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
    currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
    decimal = locale.decimal === undefined ? "." : locale.decimal + "",
    numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
    percent = locale.percent === undefined ? "%" : locale.percent + "",
    minus = locale.minus === undefined ? "−" : locale.minus + "",
    nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill,
      align = specifier.align,
      sign = specifier.sign,
      symbol = specifier.symbol,
      zero = specifier.zero,
      width = specifier.width,
      comma = specifier.comma,
      precision = specifier.precision,
      trim = specifier.trim,
      type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
      suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
      maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format(value) {
      var valuePrefix = prefix,
        valueSuffix = suffix,
        i,
        n,
        c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
        padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format.toString = function () {
      return specifier + "";
    };
    return format;
  }
  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
      e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
      k = Math.pow(10, -e),
      prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

export { pluckKeys as a, formatPrefix as b, format as c, getKey as d, exponent as e, formatSpecifier as f, getValue as g, getValues as h, inclusiveRange as i, getFirstAndLast as j, getId as k, makeArrayTransformer as m, pluckKey as p, setIndexAsKey as s };
