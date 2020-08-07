import { F as _typeof, A as _slicedToArray } from './client.b033306f.js';

/**
* @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
* @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
* @version 0.59.2
* @module lamb
* @license MIT
*/

/**
 * The placeholder object used in partial application.
 * @memberof module:lamb
 * @alias module:lamb.__
 * @category Special properties
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.57.0
 * @type {Object}
 */
var __ = {};
/**
 * Builds a function that returns a constant value.
 * It's actually the simplest form of the K combinator or Kestrel.
 * @example
 * const truth = _.always(true);
 *
 * truth() // => true
 * truth(false) // => true
 * truth(1, 2) // => true
 *
 * // the value being returned is actually the
 * // very same value passed to the function
 * const foo = {bar: "baz"};
 * const alwaysFoo = _.always(foo);
 *
 * alwaysFoo() === foo // => true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */

function always(value) {
  return function () {
    return value;
  };
}
/**
 * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
 * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
 * considered the same value.<br/>
 * See also {@link module:lamb.isSVZ|isSVZ} for a curried version building a predicate and
 * {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is} to perform a "SameValue" comparison.
 * @example
 * const testObject = {};
 *
 * _.areSVZ({}, testObject) // => false
 * _.areSVZ(testObject, testObject) // => true
 * _.areSVZ("foo", "foo") // => true
 * _.areSVZ(0, -0) // => true
 * _.areSVZ(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.isSVZ|isSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */


function areSVZ(a, b) {
  return a !== a ? b !== b : a === b; // eslint-disable-line no-self-compare
}
/**
 * Builds a function that passes only two arguments to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * _.list(1, 2, 3, 4, 5) // => [1, 2, 3, 4, 5]
 * _.binary(_.list)(1, 2, 3, 4, 5) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.unary|unary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */


function binary(fn) {
  return function (a, b) {
    return fn.call(this, a, b);
  };
}
/**
 * "Clamps" a number within the given limits, both included.<br/>
 * The function will convert to number all its parameters before starting any
 * evaluation, and will return <code>NaN</code> if <code>min</code> is greater
 * than <code>max</code>.
 * @example
 * _.clamp(-5, 0, 10) // => 0
 * _.clamp(5, 0, 10) // => 5
 * _.clamp(15, 0, 10) // => 10
 * _.clamp(0, 0, 10) // => 0
 * _.clamp(10, 0, 10) // => 10
 * _.is(_.clamp(-0, 0, 10), -0) // => true
 * _.clamp(10, 20, 15) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.clampWithin|clampWithin}
 * @since 0.13.0
 * @param {Number} n
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */


function clamp(n, min, max) {
  n = +n;
  min = +min;
  max = +max;

  if (min > max) {
    return NaN;
  } else {
    return n < min ? min : n > max ? max : n;
  }
}
/**
 * Builds a partially applied function.<br/>
 * The {@link module:lamb.__|__} object can be used as a placeholder for arguments.<br/>
 * @example
 * const __ = _.__;
 * const users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * const isKeyTrue = _.partial(_.hasKeyValue, [__, true]);
 * const isActive = isKeyTrue("active");
 * const hasConfirmedMail = isKeyTrue("confirmedMail");
 *
 * _.map(users, isActive) // => [true, true, false]
 * _.map(users, hasConfirmedMail) // => [true, false, false]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.1.0
 * @param {Function} fn
 * @param {Array} args
 * @returns {Function}
 */


function partial(fn, args) {
  return function () {
    if (!Array.isArray(args)) {
      return fn.apply(this, arguments);
    }

    var lastIdx = 0;
    var newArgs = [];
    var argsLen = args.length;

    for (var i = 0, boundArg; i < argsLen; i++) {
      boundArg = args[i];
      newArgs[i] = boundArg === __ ? arguments[lastIdx++] : boundArg;
    }

    for (var len = arguments.length; lastIdx < len; lastIdx++) {
      newArgs[i++] = arguments[lastIdx];
    }

    return fn.apply(this, newArgs);
  };
}
/**
 * Builds a partial application of a ternary function so that its first parameter
 * is expected as the last one.<br/>
 * The <code>shouldAritize</code> parameter is for the "reduce" functions, where
 * the absence of the <code>initialValue</code> transforms a "fold" operation into a
 * "reduce" one.
 * @private
 * @param {Function} fn
 * @param {Boolean} shouldAritize
 * @returns {Function}
 */


function _makePartial3(fn, shouldAritize) {
  return function (a, b) {
    var f = shouldAritize && arguments.length !== 2 ? binary(fn) : fn;
    return partial(f, [__, a, b]);
  };
}
/**
 * A curried version of {@link module:lamb.clamp|clamp}, expecting a <code>min</code>
 * and a <code>max</code> value, that builds a function waiting for the number to clamp.
 * @example
 * _.clampWithin(0, 10)(-5) // => 0
 * _.clampWithin(0, 10)(5) // => 5
 * _.clampWithin(0, 10)(15) // => 10
 * _.clampWithin(0, 10)(0) // => 0
 * _.clampWithin(0, 10)(10) // => 10
 * _.is(_.clampWithin(0, 10)(-0), -0) // => true
 * _.clampWithin(20, 15)(10) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.clamp|clamp}
 * @since 0.47.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */


var clampWithin = _makePartial3(clamp);
/**
 * The I combinator. Any value passed to the function is simply returned as it is.
 * @example
 * const foo = {bar: "baz"};
 *
 * _.identity(foo) === foo // true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {*} The value passed as parameter.
 */


function identity(value) {
  return value;
}
/**
 * Returns a function that is the composition of the functions given as parameters.
 * The first function consumes the result of the function that follows.
 * @example
 * const sayHi = name => `Hi, ${name}`;
 * const capitalize = s => s[0].toUpperCase() + s.substr(1).toLowerCase();
 * const fixNameAndSayHi = _.compose(sayHi, capitalize);
 *
 * sayHi("bOb") // => "Hi, bOb"
 * fixNameAndSayHi("bOb") // "Hi, Bob"
 *
 * const users = [{name: "fred"}, {name: "bOb"}];
 * const sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
 *
 * _.map(users, sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.pipe|pipe}
 * @since 0.1.0
 * @param {Function} a
 * @param {Function} b
 * @returns {Function}
 */


function compose(a, b) {
  return arguments.length ? function () {
    return a.call(this, b.apply(this, arguments));
  } : identity;
}

var MAX_ARRAY_LENGTH = 4294967295;
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Converts a value to a valid array length, thus an integer within
 * <code>0</code> and <code>2<sup>32</sup> - 1</code> (both included).
 * @private
 * @param {*} value
 * @returns {Number}
 */

function _toArrayLength(value) {
  return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}
/* eslint-disable jsdoc/require-returns-check */

/**
 * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment:</caption>
 * const addClass = _.curry(function (className, element) {
 *     element.classList.add(className);
 * });
 * const paragraphs = document.querySelectorAll("#some-container p");
 *
 * _.forEach(paragraphs, addClass("main"));
 * // each "p" element in the container will have the "main" class now
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Undefined}
 */


function forEach(arrayLike, iteratee) {
  for (var i = 0, len = _toArrayLength(arrayLike.length); i < len; i++) {
    iteratee(arrayLike[i], i, arrayLike);
  }
}
/**
 * Creates generic functions out of methods.
 * @author A very little change on a great idea by [Irakli Gozalishvili]{@link https://github.com/Gozala/}.
 * Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
 * @memberof module:lamb
 * @category Function
 * @function
 * @example
 * const join = _.generic(Array.prototype.join);
 *
 * join([1, 2, 3, 4, 5], "-") // => "1-2-3-4-5"
 *
 * // the function will work with any array-like object
 * join("hello", "-") // => "h-e-l-l-o"
 *
 * @since 0.1.0
 * @param {Function} method
 * @returns {Function}
 */


var generic = Function.bind.bind(Function.call);
/**
 * Verifies if a value is <code>null</code>.
 * @example
 * _.isNull(null) // => true
 * _.isNull(void 0) // => false
 * _.isNull(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>undefined</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */

function isNull(value) {
  return value === null;
}
/**
 * Verifies if a value is <code>undefined</code>.
 * @example
 * _.isUndefined(null) // => false
 * _.isUndefined(void 0) // => true
 * _.isUndefined(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>null</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */


function isUndefined(value) {
  return value === void 0;
}
/**
 * Verifies if a value is <code>null</code> or <code>undefined</code>.
 * @example
 * _.isNil(NaN) // => false
 * _.isNil({}) // => false
 * _.isNil(null) // => true
 * _.isNil(void 0) // => true
 * _.isNil() // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNull|isNull}
 * @see {@link module:lamb.isUndefined|isUndefined}
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */


function isNil(value) {
  return isNull(value) || isUndefined(value);
}
/**
 * Curries a function of arity 2.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */


function _curry2(fn, isRightCurry) {
  return function (a) {
    return function (b) {
      return isRightCurry ? fn.call(this, b, a) : fn.call(this, a, b);
    };
  };
}
/**
 * A curried version of {@link module:lamb.areSVZ|areSVZ}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValueZero"
 * comparison.<br/>
 * See also {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is}
 * to perform a "SameValue" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.isSVZ(john);
 * const isZero = _.isSVZ(0);
 * const isReallyNaN = _.isSVZ(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isZero(0) // => true
 * isZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSVZ|areSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */


var isSVZ = _curry2(areSVZ);
/**
 * Builds a new array by applying the iteratee function to each element of the
 * received array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.map(["Joe", "Mario", "Jane"], _.invoke("toUpperCase")) // => ["JOE", "MARIO", "JANE"]
 *
 * _.map([4, 9, 16], Math.sqrt); // => [2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.mapWith|mapWith}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */


function map(arrayLike, iteratee) {
  var len = _toArrayLength(arrayLike.length);

  var result = Array(len);

  for (var i = 0; i < len; i++) {
    result[i] = iteratee(arrayLike[i], i, arrayLike);
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.map|map} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const square = n => n ** 2;
 * const getSquares = _.mapWith(square);
 *
 * getSquares([1, 2, 3, 4, 5]) // => [1, 4, 9, 16, 25]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.map|map}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


var mapWith = _curry2(map, true);
/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * const f1 = _.partial(_.list, ["a", "b", "c"]);
 * const f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * const __ = _.__;
 * const f1 = _.partial(_.list, ["a", __, __, "d"]);
 * const f2 = _.partialRight(_.list, ["a", __, __, "d"]);
 *
 * f1("b", "c", "e") // => ["a", "b", "c", "d", "e"]
 * f2("b", "c", "e") // => ["b", "a", "c", "e", "d"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @param {Function} fn
 * @param {Array} args
 * @since 0.52.0
 * @returns {Function}
 */


function partialRight(fn, args) {
  return function () {
    if (!Array.isArray(args)) {
      return fn.apply(this, arguments);
    }

    var lastIdx = arguments.length - 1;
    var argsLen = args.length;
    var boundArgs = Array(argsLen);
    var newArgs = [];

    for (var i = argsLen - 1, boundArg; i > -1; i--) {
      boundArg = args[i];
      boundArgs[i] = boundArg === __ ? arguments[lastIdx--] : boundArg;
    }

    for (i = 0; i <= lastIdx; i++) {
      newArgs[i] = arguments[i];
    }

    for (var j = 0; j < argsLen; j++) {
      newArgs[i++] = boundArgs[j];
    }

    return fn.apply(this, newArgs);
  };
}
/**
 * Builds a reduce function. The <code>step</code> parameter must be <code>1</code>
 * to build  {@link module:lamb.reduce|reduce} and <code>-1</code> to build
 * {@link module:lamb.reduceRight|reduceRight}.
 * @private
 * @param {Number} step
 * @returns {Function}
 */


function _makeReducer(step) {
  return function (arrayLike, accumulator, initialValue) {
    var len = _toArrayLength(arrayLike.length);

    var idx = step === 1 ? 0 : len - 1;
    var nCalls;
    var result;

    if (arguments.length === 3) {
      nCalls = len;
      result = initialValue;
    } else {
      if (len === 0) {
        throw new TypeError("Reduce of empty array-like with no initial value");
      }

      result = arrayLike[idx];
      idx += step;
      nCalls = len - 1;
    }

    for (; nCalls--; idx += step) {
      result = accumulator(result, arrayLike[idx], idx, arrayLike);
    }

    return result;
  };
}
/**
 * Reduces (or folds) the values of an array-like object, starting from the first, to a new
 * value using the provided <code>accumulator</code> function.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.reduce([1, 2, 3, 4], _.sum) // => 10
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRight|reduceRight}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */


var reduce = _makeReducer(1);
/**
 * A partial application of {@link module:lamb.reduce|reduce} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceWith(_.sum)(arr) // => 15
 * _.reduceWith(_.subtract)(arr) // => -13
 * _.reduceWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRightWith|reduceRightWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */


var reduceWith = _makePartial3(reduce, true);
/**
 * Converts a value to an integer.
 * @private
 * @param {*} value
 * @returns {Number}
 */


function _toInteger(value) {
  var n = +value;

  if (n !== n) {
    // eslint-disable-line no-self-compare
    return 0;
  } else if (n % 1 === 0) {
    return n;
  } else {
    return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
  }
}
/**
 * Builds an array by extracting a portion of an array-like object.<br/>
 * Note that unlike the native array method this function ensures that dense
 * arrays are returned.<br/>
 * Also, unlike the native method, the <code>start</code> and <code>end</code>
 * parameters aren't optional and will be simply converted to integer.<br/>
 * See {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.slice(arr, 0, 2) // => [1, 2]
 * _.slice(arr, 2, -1) // => [3, 4]
 * _.slice(arr, -3, 5) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sliceAt|sliceAt}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike - Any array like object.
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Array}
 */


function slice(arrayLike, start, end) {
  var len = _toArrayLength(arrayLike.length);

  var begin = _toInteger(start);

  var upTo = _toInteger(end);

  if (begin < 0) {
    begin = begin < -len ? 0 : begin + len;
  }

  if (upTo < 0) {
    upTo = upTo < -len ? 0 : upTo + len;
  } else if (upTo > len) {
    upTo = len;
  }

  var resultLen = upTo - begin;
  var result = resultLen > 0 ? Array(resultLen) : [];

  for (var i = 0; i < resultLen; i++) {
    result[i] = arrayLike[begin + i];
  }

  return result;
}
/**
 * Given the <code>start</code> and <code>end</code> bounds, builds a partial application
 * of {@link module:lamb.slice|slice} expecting the array-like object to slice.<br/>
 * See also {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const s = "hello";
 * const dropFirstAndLast = _.sliceAt(1, -1);
 *
 * dropFirstAndLast(arr) // => [2, 3, 4]
 * dropFirstAndLast(s) // => ["e", "l", "l"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.slice|slice}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.48.0
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Function}
 */


var sliceAt = _makePartial3(slice);

var objectProtoToString = Object.prototype.toString;
/**
 * Retrieves the "type tag" from the given value.
 * @example
 * const x = 5;
 * const y = new Number(5);
 *
 * typeof x // => "number"
 * typeof y // => "object"
 * _.type(x) // => "Number"
 * _.type(y) // => "Number"
 *
 * _.type(Object.prototype.toString) // => "Function"
 * _.type(/a/) // => "RegExp"
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.9.0
 * @param {*} value
 * @returns {String}
 */

function type(value) {
  return objectProtoToString.call(value).slice(8, -1);
}
/**
 * Appends the given value at the end of a copy of the provided array-like object.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.appendTo(arr, 5) // => [1, 2, 3, 4, 5]
 * _.appendTo(arr, [5]) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.append|append}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Array}
 */


function appendTo(arrayLike, value) {
  return slice(arrayLike, 0, arrayLike.length).concat([value]);
}
/**
 * A curried version of {@link module:lamb.appendTo|appendTo} that uses the value to append
 * to build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.append(5)(arr) // => [1, 2, 3, 4, 5]
 * _.append([5])(arr) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.appendTo|appendTo}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {*} value
 * @returns {Function}
 */


var append = _curry2(appendTo, true);
/**
 * Checks if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.contains|contains} for a curried version building a predicate.
 * @example
 * const numbers = [0, 1, 2, 3, NaN];
 *
 * _.isIn(numbers, 1) // => true
 * _.isIn(numbers, 0) // => true
 * _.isIn(numbers, -0) // => true
 * _.isIn(numbers, NaN) // => true
 * _.isIn(numbers, 5) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.contains|contains}
 * @since 0.13.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Boolean}
 */


function isIn(arrayLike, value) {
  var result = false;

  for (var i = 0, len = arrayLike.length; i < len; i++) {
    if (areSVZ(value, arrayLike[i])) {
      result = true;
      break;
    }
  }

  return result;
}
/**
 * Builds a predicate to check if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.isIn|isIn} for an uncurried version.
 * @example
 * const containsNaN = _.contains(NaN);
 *
 * containsNaN([0, 1, 2, 3, NaN]) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.isIn|isIn}
 * @since 0.13.0
 * @param {*} value
 * @returns {Function}
 */


var contains = _curry2(isIn, true);
/**
 * Builds a "grouping function" for an array-like object.
 * @private
 * @param {Function} makeValue
 * @returns {Function}
 */


function _groupWith(makeValue) {
  return function (arrayLike, iteratee) {
    var result = {};
    var len = arrayLike.length;

    for (var i = 0, element, key; i < len; i++) {
      element = arrayLike[i];
      key = iteratee(element, i, arrayLike);
      result[key] = makeValue(result[key], element);
    }

    return result;
  };
}
/**
 * Transforms an array-like object in a lookup table with the keys generated by the provided
 * <code>iteratee</code>, having as values the count of matches for the key.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 17},
 *     {"name": "Paolo", "age": 15}
 * ];
 * const getAgeStatus = person => (person.age >= 18 ? "adult" : "minor");
 *
 * _.count(persons, getAgeStatus) // => {"adult": 1, "minor": 3}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */


var count = _groupWith(function (a) {
  return a ? ++a : 1;
});
/**
 * A curried version of {@link module:lamb.count|count} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCityOrUnknown = _.adapter([_.getKey("city"), _.always("Unknown")]);
 * const countByCity = _.countBy(getCityOrUnknown);
 *
 * countByCity(persons) // => {"New York": 2, "Rome": 1, "Unknown": 1}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.count|count}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


var countBy = _curry2(count, true);
/**
 * Builds an array comprised of all values of the array-like object passing the <code>predicate</code>
 * test.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 *
 * _.filter(["Foo", "bar", "baZ"], isLowerCase) // => ["bar"]
 *
 * // the function will work with any array-like object
 * _.filter("fooBAR", isLowerCase) // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.filterWith|filterWith}
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @since 0.1.0
 * @returns {Array}
 */


function filter(arrayLike, predicate) {
  var len = arrayLike.length;
  var result = [];

  for (var i = 0; i < len; i++) {
    predicate(arrayLike[i], i, arrayLike) && result.push(arrayLike[i]);
  }

  return result;
}
/**
 * Returns a predicate that negates the given one.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isOdd = _.not(isEven);
 *
 * isOdd(5) // => true
 * isOdd(4) // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @since 0.1.0
 * @param {Function} predicate
 * @returns {Function}
 */


function not(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}
/**
 * Using the provided iteratee, builds a function that will return an array comprised of the
 * unique elements of an array-like object. The values being compared are the ones returned by
 * the iteratee.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniques|uniques} if you don't need to transform your values before the
 * comparison.
 * @example
 * const data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * const uniquesById = _.uniquesBy(_.getKey("id"));
 *
 * uniquesById(data) // => [{id: "1", name: "John"}, {id: "4", name: "Jane"}, {id: "5", name: "Joe"}]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.uniques|uniques}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


function uniquesBy(iteratee) {
  return function (arrayLike) {
    var result = [];

    for (var i = 0, len = arrayLike.length, seen = [], value; i < len; i++) {
      value = iteratee(arrayLike[i], i, arrayLike);

      if (!isIn(seen, value)) {
        seen.push(value);
        result.push(arrayLike[i]);
      }
    }

    return result;
  };
}
/**
 * Returns an array comprised of the unique elements of the given array-like object.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniquesBy|uniquesBy} if you need to transform your values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.uniques([-0, 1, 2, 0, 2, 3, 4, 3, 5, 1]) // => [-0, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.uniquesBy|uniquesBy}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */


var uniques = uniquesBy(identity);
/**
 * Returns an array of unique items present only in the first of the two given
 * array-like objects. To determine uniqueness the function uses the
 * ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 1, 3, 4];
 * const a2 = [2, 4, 5, 6];
 * const a3 = [3, 4, 5, 2, 1];
 *
 * _.difference(a1, a2) // => [1, 3]
 * _.difference(a2, a3) // => [6]
 * _.difference(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.pull|pull}, {@link module:lamb.pullFrom|pullFrom}
 * @since 0.6.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} other
 * @returns {Array}
 */

function difference(arrayLike, other) {
  var isNotInOther = partial(not(isIn), [other]);
  return uniques(filter(arrayLike, isNotInOther));
}
/**
 * Builds an array without the first <code>n</code> elements of the given array or array-like object.
 * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.dropFrom(arr, 2) // => [3, 4, 5]
 * _.dropFrom(arr, -1) // => [5]
 * _.dropFrom(arr, -10) // => [1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */


function dropFrom(arrayLike, n) {
  return slice(arrayLike, n, arrayLike.length);
}
/**
 * A curried version of {@link module:lamb.dropFrom|dropFrom} that expects the number of elements
 * to drop to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.dropFrom|dropFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const drop2 = _.drop(2);
 *
 * drop2([1, 2, 3, 4, 5]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.5.0
 * @see {@link module:lamb.dropFrom|dropFrom}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @param {Number} n
 * @returns {Function}
 */


var drop = _curry2(dropFrom, true);
/**
 * Gets the index of the last element satisfying a predicate in an array-like object.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */


function _getLastHitIndex(arrayLike, predicate, fromLast) {
  var idx;
  var increment;
  var len = arrayLike.length;

  if (fromLast) {
    idx = len - 1;
    increment = -1;
  } else {
    idx = 0;
    increment = 1;
  }

  while (idx >= 0 && idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
    idx += increment;
  }

  return idx;
}
/**
 * Helper to build the {@link module:lamb.takeWhile|takeWhile},
 * {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropWhile|dropWhile} and
 * {@link module:lamb.dropLastWhile|dropLastWhile} functions.
 * @private
 * @param {Boolean} isTake
 * @param {Boolean} fromLast
 * @returns {Function}
 */


function _takeOrDropWhile(isTake, fromLast) {
  return function (predicate) {
    return function (arrayLike) {
      var idxFrom;
      var idxTo;

      var lastHitIndex = _getLastHitIndex(arrayLike, predicate, fromLast);

      if (isTake && fromLast) {
        idxFrom = lastHitIndex + 1;
        idxTo = arrayLike.length;
      } else if (isTake) {
        idxFrom = 0;
        idxTo = lastHitIndex;
      } else if (!isTake && fromLast) {
        idxFrom = 0;
        idxTo = lastHitIndex + 1;
      } else {
        idxFrom = lastHitIndex;
        idxTo = arrayLike.length;
      }

      return slice(arrayLike, idxFrom, idxTo);
    };
  };
}
/**
 * Builds a function that drops the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropLastWhileIsEven = _.dropLastWhile(isEven);
 *
 * dropLastWhileIsEven([2, 4, 6, 8]) // => []
 * dropLastWhileIsEven([2, 4, 7, 8]) // => [2, 4, 7]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var dropLastWhile = _takeOrDropWhile(false, true);
/**
 * Builds a function that drops the first elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropWhileIsEven = _.dropWhile(isEven);
 *
 * dropWhileIsEven([2, 4, 6, 8]) // => []
 * dropWhileIsEven([2, 4, 7, 8]) // => [7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeWhile|takeWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var dropWhile = _takeOrDropWhile(false, false);
/**
 * Helper to build the {@link module:lamb.everyIn|everyIn} or the
 * {@link module:lamb.someIn|someIn} function.
 * @private
 * @param {Boolean} defaultResult
 * @returns {Function}
 */


function _makeArrayChecker(defaultResult) {
  return function (arrayLike, predicate) {
    for (var i = 0, len = arrayLike.length; i < len; i++) {
      if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
        return !defaultResult;
      }
    }

    return defaultResult;
  };
}
/**
 * Checks if all the elements in an array-like object satisfy the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>falsy</em> value.<br/>
 * Note that an empty array-like will always produce a <code>true</code> result regardless of the
 * predicate because of [vacuous truth]{@link https://en.wikipedia.org/wiki/Vacuous_truth}.<br/>
 * Also note that unlike the native
 * [Array.prototype.every]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: true},
 *     {"name": "John", "age": 40, active: true},
 *     {"name": "Mario", "age": 17, active: true},
 *     {"name": "Paolo", "age": 15, active: true}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.everyIn(persons, isAdult) // => false
 * _.everyIn(persons, isActive) // => true
 *
 * @example <caption>Showing the difference with <code>Array.prototype.every</code>:</caption>
 * const isDefined = _.not(_.isUndefined);
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.every(isDefined) // => true
 * _.everyIn(arr, isDefined) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.every|every}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */


var everyIn = _makeArrayChecker(true);
/**
 * A curried version of {@link module:lamb.everyIn|everyIn} that expects a predicate
 * to build a function waiting for the array-like to act upon.
 * @example
 * const data = [2, 3, 5, 6, 8];
 * const isEven = n => n % 2 === 0;
 * const allEvens = _.every(isEven);
 * const allIntegers = _.every(_.isInteger);
 *
 * allEvens(data) // => false
 * allIntegers(data) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.everyIn|everyIn}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var every = _curry2(everyIn, true);
/**
 * A curried version of {@link module:lamb.filter|filter} that uses the given predicate
 * to build a function expecting the array-like object to act upon.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 * const getLowerCaseEntries = _.filterWith(isLowerCase);
 *
 * getLowerCaseEntries(["Foo", "bar", "baZ"]) // => ["bar"]
 *
 * // array-like objects can be used as well
 * getLowerCaseEntries("fooBAR") // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.filter|filter}
 * @since 0.9.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var filterWith = _curry2(filter, true);
/**
 * Helper to create the {@link module:lamb.findIndex|findIndex} and
 * {@link module:lamb.findLastIndex|findLastIndex} functions.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */


function _findIndex(arrayLike, predicate, fromLast) {
  var start;
  var increment;
  var len = arrayLike.length;
  var result = -1;

  if (fromLast) {
    start = len - 1;
    increment = -1;
  } else {
    start = 0;
    increment = 1;
  }

  for (var i = start; i < len && i >= 0; i += increment) {
    if (predicate(arrayLike[i], i, arrayLike)) {
      result = i;
      break;
    }
  }

  return result;
}
/**
 * Searches for an element satisfying the predicate in the given array-like object and returns its
 * index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findIndex(persons, _.hasKeyValue("age", 40)) // => 1
 * _.findIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */


function findIndex(arrayLike, predicate) {
  return _findIndex(arrayLike, predicate, false);
}
/**
 * Searches for an element satisfying the predicate in the given array-like object and returns it if
 * the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.find(persons, _.hasKeyValue("age", 40)) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.find(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */


function find(arrayLike, predicate) {
  var idx = findIndex(arrayLike, predicate);
  return idx === -1 ? void 0 : arrayLike[idx];
}
/**
 * A curried version of {@link module:lamb.findIndex|findIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEvenIdx = _.findIndexWhere(isEven);
 *
 * findEvenIdx([1, 3, 4, 5, 6, 7]) // => 2
 * findEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findIndex|findIndex}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var findIndexWhere = _curry2(findIndex, true);
/**
 * Searches for an element satisfying the predicate in the given array-like object starting from
 * the end and returns its index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLastIndex(persons, _.hasKeyValue("age", 40)) // => 3
 * _.findLastIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */


function findLastIndex(arrayLike, predicate) {
  return _findIndex(arrayLike, predicate, true);
}
/**
 * Searches for an element satisfying the predicate in the given array-like object starting from the end
 * and returns it if the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLast(persons, _.hasKeyValue("surname", "Doe")) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.findLast(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */


function findLast(arrayLike, predicate) {
  var idx = findLastIndex(arrayLike, predicate);
  return idx === -1 ? void 0 : arrayLike[idx];
}
/**
 * A curried version of {@link module:lamb.findLastIndex|findLastIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findLastEvenIdx = _.findLastIndexWhere(isEven);
 *
 * findLastEvenIdx([1, 3, 4, 5, 6, 7]) // => 4
 * findLastEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastIndex|findLastIndex}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var findLastIndexWhere = _curry2(findLastIndex, true);
/**
 * A curried version of {@link module:lamb.findLast|findLast} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findLastWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 6, 7]) // => 6
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLast|findLast}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var findLastWhere = _curry2(findLast, true);
/**
 * A curried version of {@link module:lamb.find|find} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 7]) // => 4
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.find|find}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var findWhere = _curry2(find, true);
/**
 * Similar to {@link module:lamb.map|map}, but if the mapping function returns an array this will
 * be concatenated, rather than pushed, to the final result.
 * @example <caption>Showing the difference with <code>map</code>:</caption>
 * const words = ["foo", "bar"];
 * const toCharArray = _.splitBy("");
 *
 * _.map(words, toCharArray) // => [["f", "o", "o"], ["b", "a", "r"]]
 * _.flatMap(words, toCharArray) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.flatMapWith|flatMapWith}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.1.0
 * @param {Array} array
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */


function flatMap(array, iteratee) {
  return reduce(array, function (result, el, idx, arr) {
    var v = iteratee(el, idx, arr);

    if (!Array.isArray(v)) {
      v = [v];
    }

    for (var i = 0, len = v.length, rLen = result.length; i < len; i++) {
      result[rLen + i] = v[i];
    }

    return result;
  }, []);
}
/**
 * A curried version of {@link module:lamb.flatMap|flatMap} that uses provided iteratee
 * to build a function expecting the array to act upon.
 * @example
 * const toCharArray = _.splitBy("");
 * const wordsToCharArray = _.flatMapWith(toCharArray);
 *
 * wordsToCharArray(["foo", "bar"]) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatMap|flatMap}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.11.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


var flatMapWith = _curry2(flatMap, true);
/**
 * Flattens an array.
 * @private
 * @param {Array} array - The source array
 * @param {Boolean} isDeep - Whether to perform a deep flattening or not
 * @param {Array} output - An array to collect the result
 * @param {Number} idx - The next index to be filled in the output
 * @returns {Array} The output array filled with the results
 */


function _flatten(array, isDeep, output, idx) {
  for (var i = 0, len = array.length, value, j, vLen; i < len; i++) {
    value = array[i];

    if (!Array.isArray(value)) {
      output[idx++] = value;
    } else if (isDeep) {
      _flatten(value, true, output, idx);

      idx = output.length;
    } else {
      vLen = value.length;
      output.length += vLen;

      for (j = 0; j < vLen; j++) {
        output[idx++] = value[j];
      }
    }
  }

  return output;
}
/**
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function
 * @param {Boolean} isDeep
 * @returns {Function}
 */


var _makeArrayFlattener = _curry2(function (isDeep, array) {
  return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});
/**
 * Flattens an array.
 * @example <caption>Showing the difference with <code>shallowFlatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.shallowFlatten|shallowFlatten}
 * @since 0.1.0
 * @param {Array} array
 * @returns {Array}
 */


var flatten = _makeArrayFlattener(true);
/**
 * Checks if the given number, even negative, represents an array-like index
 * within the provided length. If so returns its natural number equivalent.<br/>
 * Returns <code>NaN<code> otherwise.
 * @private
 * @param {Number} idx
 * @param {Number} len
 * @returns {Number}
 */


function _toNaturalIndex(idx, len) {
  idx = _toInteger(idx);
  return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
}
/**
 * Retrieves the element at the given index in an array-like object.<br/>
 * Like {@link module:lamb.slice|slice} the index can be negative.<br/>
 * If the index isn't supplied, or if its value isn't an integer within the array-like bounds,
 * the function will return <code>undefined</code>.<br/>
 * <code>getIndex</code> will throw an exception when receives <code>null</code> or
 * <code>undefined</code> in place of an array-like object, but returns <code>undefined</code>
 * for any other value.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.getIndex(arr, 1) // => 2
 * _.getIndex(arr, -1) // => 5
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.getAt|getAt}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @returns {*}
 */


function getIndex(arrayLike, index) {
  var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));

  return idx === idx ? arrayLike[idx] : void 0; // eslint-disable-line no-self-compare
}
/**
 * A curried version of {@link module:lamb.getIndex|getIndex} that uses the provided index
 * to build a function expecting the array-like object holding the element we want to retrieve.
 * @example
 * const getFifthElement = _.getAt(4);
 *
 * getFifthElement([1, 2, 3, 4, 5]) // => 5
 * getFifthElement("foo bar") // => "b"
 * getFifthElement([]) // => undefined
 * getFifthElement("foo") // => undefined
 *
 * @example <caption>Using negative indexes:</caption>
 * _.getAt(-2)([1, 2, 3]) // => 2
 * _.getAt(-3)("foo") // => "f"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.16.0
 * @see {@link module:lamb.getIndex|getIndex}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @param {Number} index
 * @returns {Function}
 */


var getAt = _curry2(getIndex, true);
/**
 * Transforms an array-like object into a lookup table using the provided iteratee as a grouping
 * criterion to generate keys and values.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCity = _.getKey("city");
 * const personsByCity = _.group(persons, getCity);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "undefined": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @example <caption>Adding a custom value for missing keys:</caption>
 *
 * const getCityOrUnknown = _.adapter([getCity, _.always("Unknown")]);
 *
 * const personsByCity = _.group(persons, getCityOrUnknown);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "Unknown": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */


var group = _groupWith(function (a, b) {
  if (!a) {
    return [b];
  }

  a[a.length] = b;
  return a;
});
/**
 * A curried version of {@link module:lamb.group|group} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 18},
 *     {"name": "Paolo", "age": 15}
 * ];
 *
 * const getAgeStatus = person => `${person.age > 20 ? "over" : "under"} 20`;
 * const groupByAgeStatus = _.groupBy(getAgeStatus);
 *
 * const personsByAgeStatus = groupByAgeStatus(persons);
 *
 * // "personsByAgeStatus" holds:
 * // {
 * //     "under 20": [
 * //         {"name": "Jane", "age": 12},
 * //         {"name": "Mario", "age": 18},
 * //         {"name": "Paolo", "age": 15}
 * //     ],
 * //     "over 20": [
 * //         {"name": "John", "age": 40}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.group|group}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


var groupBy = _curry2(group, true);
/**
 * Retrieves the first element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.head([1, 2, 3]) // => 1
 * _.head("hello") // => "h"
 * _.head([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.last|last}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */


var head = getAt(0);
/**
 * Similar to {@link module:lamb.group|group}, but the generated lookup table will have
 * only one element of the original array-like object for each value.<br/>
 * Should be used only when you're sure that your <code>iteratee</code> won't produce
 * duplicate keys, otherwise only the last evaluated element will be in the result.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("id"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"},
 * //     "4": {id: 4, name: "John"}
 * // }
 *
 * @example <caption>Result of an <code>iteratee</code> producing a duplicate key:</caption>
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("name"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "John": {"id": 4, "name": "John"},
 * //     "Jane": {"id": 2, "name": "Jane"},
 * //     "Mario": {"id": 3, "name": "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.indexBy|indexBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */

var index = _groupWith(function (a, b) {
  return b;
});
/**
 * A curried version of {@link module:lamb.index|index} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"}
 * ];
 * const indexByID = _.indexBy(_.getKey("id"));
 *
 * const indexedUsers = indexByID(users);
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.index|index}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


var indexBy = _curry2(index, true);
/**
 * Returns a copy of the given array-like object without the last element.
 * @example
 * _.init([1, 2, 3, 4]) // => [1, 2, 3]
 * _.init([1]) // => []
 * _.init([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.tail|tail}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */


var init = partial(slice, [__, 0, -1]);
/**
 * Inserts the provided element in a copy of an array-like object at the
 * specified index.<br/>
 * If the index is greater than the length of the array-like, the element
 * will be appended at the end.<br/>
 * Negative indexes are allowed; when a negative index is out of bounds
 * the element will be inserted at the start of the resulting array.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insert(arr, 3, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, -2, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, 10, 99) // => [1, 2, 3, 4, 5, 99]
 * _.insert(arr, -10, 99) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.insertAt|insertAt}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} element
 * @returns {Array}
 */

function insert(arrayLike, index, element) {
  var result = slice(arrayLike, 0, arrayLike.length);
  result.splice(index, 0, element);
  return result;
}
/**
 * Builds a partial application of {@link module:lamb.insert|insert}
 * expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insertAt(3, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(-2, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(10, 99)(arr) // => [1, 2, 3, 4, 5, 99]
 * _.insertAt(-10, 99)(arr) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.insert|insert}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.27.0
 * @param {Number} index
 * @param {*} element
 * @returns {Function}
 */


var insertAt = _makePartial3(insert);
/**
 * Returns an array of every unique item that is included in all two given arrays
 * or array-like objects.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 3, 4];
 * const a2 = [2, 5, 4, 2, 6];
 * const a3 = [5, 6, 7];
 *
 * _.intersection(a1, a2) // => [2, 4]
 * _.intersection(a2, a3) // => [5, 6]
 * _.intersection(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */


function intersection(a, b) {
  var result = [];
  var lenA = a.length;

  if (lenA && b.length) {
    for (var i = 0; i < lenA; i++) {
      !isIn(result, a[i]) && isIn(b, a[i]) && result.push(a[i]);
    }
  }

  return result;
}
/**
 * Transforms an array-like object into a string by joining its elements with
 * the given separator.<br/>
 * Note that unlike the native method, this function won't convert
 * <code>null</code> and <code>undefined</code> values in the array to empty
 * strings and that the <code>separator</code> parameter isn't optional.<br/>
 * See the examples about these differences.
 * @example
 * const words = ["foo", "bar", "baz"];
 *
 * _.join(words, "-") // => "foo-bar-baz"
 *
 * @example <caption>Showing the differences with the native array method:</caption>
 * const mixed = [1, null, 2, undefined, 3, NaN, 4, 5];
 * const numbers = [1, 2, 3];
 *
 * _.join(mixed, "-") // => "1-null-2-undefined-3-NaN-4-5"
 * mixed.join("-") // => "1--2--3-NaN-4-5"
 *
 * _.join(numbers) // => "1undefined2undefined3"
 * numbers.join() // => "1,2,3"
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.joinWith|joinWith}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {String} separator
 * @returns {String}
 */


function join(arrayLike, separator) {
  return map(arrayLike, String).join(String(separator));
}
/**
 * A curried version of {@link module:lamb.join|join} that accepts an optional
 * separator and builds a function expecting the array-like object to act upon.<br/>
 * Please refer to the description and examples of {@link module:lamb.join|join}
 * to understand the differences with the native array method.
 * @example
 * const words = ["foo", "bar", "baz"];
 * const joinWithDash = _.joinWith("-");
 *
 * joinWithDash(words) // => "foo-bar-baz"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.join|join}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {String} separator
 * @returns {Function}
 */


var joinWith = _curry2(join, true);
/**
 * Retrieves the last element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.last([1, 2, 3]) // => 3
 * _.last("hello") // => "o"
 * _.last([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.head|head}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */


var last = getAt(-1);
/**
 * Builds helper functions to extract portions of the arguments
 * object rather efficiently without having to write for loops
 * manually for each case.<br/>
 * The arguments object needs to be passed to the apply method
 * of the generated function.
 * @private
 * @param {Number} idx
 * @returns {Function}
 */

function _argsToArrayFrom(idx) {
  return function () {
    var argsLen = arguments.length || idx;
    var len = argsLen - idx;
    var result = Array(len);

    for (var i = 0; i < len; i++) {
      result[i] = arguments[i + idx];
    }

    return result;
  };
}
/**
 * Generates an array with the values passed as arguments.<br/>
 * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.1.0
 * @param {...*} value
 * @returns {Array}
 */


var list = _argsToArrayFrom(0);
/**
 * Splits an array-like object in two lists: the first with the elements satisfying the given predicate,
 * the others with the remaining elements.
 * @example
 * const isEven = n => n % 2 === 0;
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * _.partition(numbers, isEven) // => [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.partitionWith|partitionWith}
 * @since 0.11.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Array<Array, Array>}
 */


function partition(arrayLike, predicate) {
  var result = [[], []];
  var len = arrayLike.length;

  for (var i = 0, el; i < len; i++) {
    el = arrayLike[i];
    result[predicate(el, i, arrayLike) ? 0 : 1].push(el);
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.partition|partition} that uses the provided
 * predicate to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {"name": "Jane", "surname": "Doe", "active": false},
 *     {"name": "John", "surname": "Doe", "active": true},
 *     {"name": "Mario", "surname": "Rossi", "active": true},
 *     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * ];
 * const isActive = _.hasKeyValue("active", true);
 * const splitByActiveStatus = _.partitionWith(isActive);
 *
 * splitByActiveStatus(users) // =>
 * // [[
 * //     {"name": "John", "surname": "Doe", "active": true},
 * //     {"name": "Mario", "surname": "Rossi", "active": true}
 * // ], [
 * //     {"name": "Jane", "surname": "Doe", "active": false},
 * //     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * // ]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.partition|partition}
 * @since 0.11.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var partitionWith = _curry2(partition, true);
/**
 * Returns the value of the object property with the given key.
 * @example
 * const user = {name: "John"};
 *
 * _.getIn(user, "name") // => "John";
 * _.getIn(user, "surname") // => undefined
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getKey|getKey}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.18.0
 * @param {Object} obj
 * @param {String} key
 * @returns {*}
 */


function getIn(obj, key) {
  return obj[key];
}
/**
 * A curried version of {@link module:lamb.getIn|getIn}.<br/>
 * Receives a property name and builds a function expecting the object from which we want to retrieve
 * the property.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {name: "jane"};
 * const getName = _.getKey("name");
 *
 * getName(user1) // => "john"
 * getName(user2) // => "jane"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getIn|getIn}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */


var getKey = _curry2(getIn, true);
/**
 * A curried version of {@link module:lamb.pluckFrom|pluckFrom} expecting the key to retrieve to
 * build a function waiting for the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 * const getAges = _.pluck("age");
 *
 * getAges(persons) // => [12, 40, 18, 15]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pluckFrom|pluckFrom}
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */


var pluck = compose(mapWith, getKey);
/**
 * "Plucks" the values of the specified key from a list of objects.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 *
 * _.pluckFrom(persons, "age") // => [12, 40, 18, 15]
 *
 * const lists = [
 *     [1, 2],
 *     [3, 4, 5],
 *     [6]
 * ];
 *
 * _.pluckFrom(lists, "length") // => [2, 3, 1]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pluck|pluck}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {String} key
 * @returns {Array}
 */

function pluckFrom(arrayLike, key) {
  return map(arrayLike, getKey(key));
}
/**
 * Creates an array copy of the given array-like object without the
 * specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
 *
 * @example <caption>It's not the same as {@link module:lamb.difference|difference}:</caption>
 *
 * const arr = [1,1,2,3,4,4,5];
 *
 * _.pullFrom(arr, [1, 2]) // => [3, 4, 4, 5]
 * _.difference(arr, [1, 2]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pull|pull}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} values
 * @returns {Array}
 */


function pullFrom(arrayLike, values) {
  return values ? filter(arrayLike, function (element) {
    return !isIn(values, element);
  }) : slice(arrayLike, 0, arrayLike.length);
}
/**
 * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
 * a list of values to build a function waiting for an array-like object.<br/>
 * The new function will create an array copy of the array-like without
 * the specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * See examples in {@link module:lamb.pullFrom|pullFrom} about the
 * relationship with {@link module:lamb.difference|difference}.
 * @example
 * const scores = [40, 20, 30, 10];
 * const newScores = [30, 10];
 * const pullNewScores = _.pull(newScores);
 *
 * pullNewScores(scores) // => [40, 20]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pullFrom|pullFrom}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} values
 * @returns {Function}
 */


var pull = _curry2(pullFrom, true);
/**
 * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last
 * element instead.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduce|reduce}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */


var reduceRight = _makeReducer(-1);
/**
 * A partial application of {@link module:lamb.reduce|reduceRight} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceRightWith(_.sum)(arr) // => 15
 * _.reduceRightWith(_.subtract)(arr) // => -5
 * _.reduceRightWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceWith|reduceWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */


var reduceRightWith = _makePartial3(reduceRight, true);
/**
 * Reverses a copy of the given array-like object.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.reverse(arr) // => [3, 2, 1];
 *
 * // `arr` still is [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.19.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */


function reverse(arrayLike) {
  var len = _toArrayLength(arrayLike.length);

  var result = Array(len);

  for (var i = 0, ofs = len - 1; i < len; i++) {
    result[i] = arrayLike[ofs - i];
  }

  return result;
}
/**
 * Returns a copy of the given array-like with the element rotated by the desired amount.
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.rotate(arr, 3) // => [3, 4, 5, 1, 2]
 * _.rotate(arr, -3) // => [4, 5, 1, 2, 3]
 * _.rotate(arr, 11) // => [5, 1, 2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.rotateBy|rotateBy}
 * @since 0.55.0
 * @param {ArrayLike} arrayLike
 * @param {Number} amount
 * @returns {Array}
 */


function rotate(arrayLike, amount) {
  var len = arrayLike.length;
  var shift = amount % len;
  return slice(arrayLike, -shift, len).concat(slice(arrayLike, 0, -shift));
}
/**
 * A curried version of {@link module:lamb.rotate|rotate}.<br/>
 * Uses the given amount to build a function expecting the array to rotate by that amount.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const rotateByTwo = _.rotateBy(2);
 *
 * rotateByTwo(arr) // => [4, 5, 1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.rotate|rotate}
 * @since 0.55.0
 * @param {Number} amount
 * @returns {Function}
 */


var rotateBy = _curry2(rotate, true);
/**
 * Sets an index in an array-like object.<br/>
 * If provided with an updater function it will use it to update the current value,
 * otherwise sets the index to the specified value.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {Number} idx
 * @param {*} [value]
 * @param {Function} [updater]
 * @returns {Array}
 */


function _setIndex(arrayLike, idx, value, updater) {
  var result = slice(arrayLike, 0, arrayLike.length);

  var n = _toNaturalIndex(idx, result.length);

  if (n === n) {
    // eslint-disable-line no-self-compare
    result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.setIndex|setIndex} that builds
 * a function that creates a copy of an array-like object with the given
 * index changed to the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.setAt(2, 99)(arr) // => [1, 2, 99, 4, 5]
 * arr // => [1, 2, 3, 4, 5]
 *
 * _.setAt(10, 99)(arr) // => [1, 2, 3, 4, 5] (not a reference to `arr`)
 *
 * @example <caption>Using negative indexes:</caption>
 * _.setAt(-1, 99)(arr) // => [1, 2, 3, 4, 99]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setIndex|setIndex}
 * @since 0.17.0
 * @param {Number} index
 * @param {*} value
 * @returns {Function}
 */


var setAt = _makePartial3(_setIndex);
/**
 * Builds a new function that passes only the specified amount of arguments to the original one.<br/>
 * As {@link module:lamb.slice|slice} is used to extract the arguments, you can also
 * pass a negative arity.
 * @example
 * Math.max(10, 11, 45, 99) // => 99
 * _.aritize(Math.max, 2)(10, 11, 45, 99) // => 11
 *
 * @example <caption>Using a negative arity:</caption>
 * _.aritize(Math.max, -1)(10, 11, 45, 99) // => 45
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.binary|binary}, {@link module:lamb.unary|unary} for common use cases shortcuts
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} arity
 * @returns {Function}
 */


function aritize(fn, arity) {
  return function () {
    var n = _toInteger(arity);

    var args = list.apply(null, arguments).slice(0, n);

    for (var i = args.length; i < n; i++) {
      args[i] = void 0;
    }

    return fn.apply(this, args);
  };
}
/**
 * Creates a copy of an array-like object with the given index changed to
 * the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.setIndex(arr, 1, 99) // => [1, 99, 3]
 * _.setIndex(arr, -1, 99) // => [1, 2, 99]
 * _.setIndex(arr, 10, 99) // => [1, 2, 3] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setAt|setAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} value
 * @returns {Array}
 */


var setIndex = aritize(_setIndex, 3);
/**
 * Flattens the "first level" of an array.
 * @example <caption>Showing the difference with <code>flatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatten|flatten}
 * @since 0.9.0
 * @param {Array} array
 * @returns {Array}
 */

var shallowFlatten = _makeArrayFlattener(false);
/**
 * Checks if at least one element in an array-like object satisfies the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>truthy</em> value.<br/>
 * Note that unlike the native
 * [Array.prototype.some]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: false},
 *     {"name": "John", "age": 40, active: false},
 *     {"name": "Mario", "age": 17, active: false},
 *     {"name": "Paolo", "age": 15, active: false}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.someIn(persons, isAdult) // => true
 * _.someIn(persons, isActive) // => false
 *
 * @example <caption>Showing the difference with <code>Array.prototype.some</code>:</caption>
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.some(_.isUndefined) // => false
 * _.someIn(arr, _.isUndefined) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.some|some}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */


var someIn = _makeArrayChecker(false);
/**
 * A curried version of {@link module:lamb.someIn|someIn} that uses the given predicate to
 * build a function waiting for the array-like to act upon.
 * @example
 * const data = [1, 3, 5, 6, 7, 8];
 * const isEven = n => n % 2 === 0;
 * const containsEvens = _.some(isEven);
 * const containsStrings = _.some(_.isType("String"));
 *
 * containsEvens(data) // => true
 * containsStrings(data) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.someIn|someIn}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var some = _curry2(someIn, true);
/**
 * Accepts a list of sorting criteria with at least one element
 * and builds a function that compares two values with such criteria.
 * @private
 * @param {Sorter[]} criteria
 * @returns {Function}
 */


function _compareWith(criteria) {
  return function (a, b) {
    var len = criteria.length;
    var criterion = criteria[0];
    var result = criterion.compare(a.value, b.value);

    for (var i = 1; result === 0 && i < len; i++) {
      criterion = criteria[i];
      result = criterion.compare(a.value, b.value);
    }

    if (result === 0) {
      result = a.index - b.index;
    }

    return criterion.isDescending ? -result : result;
  };
}
/**
 * The default comparer for sorting functions.<br/>
 * If the given values are of different types they
 * will be both converted to strings.<br/>
 * Uses the SameValueZero comparison.
 * @private
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1 | 0 | 1
 */


function _comparer(a, b) {
  var result = 0;

  if (_typeof(a) !== _typeof(b)) {
    a = String(a);
    b = String(b);
  }

  if (!areSVZ(a, b)) {
    // eslint-disable-next-line no-self-compare
    result = a > b || a !== a ? 1 : -1;
  }

  return result;
}
/**
 * Builds a sorting criterion. If the comparer function is missing, the default
 * comparer will be used instead.
 * @private
 * @param {Function} reader
 * @param {Boolean} isDescending
 * @param {Function} [comparer]
 * @returns {Sorter}
 */


function _sorter(reader, isDescending, comparer) {
  if (typeof reader !== "function" || reader === identity) {
    reader = null;
  }

  if (typeof comparer !== "function") {
    comparer = _comparer;
  }

  return {
    isDescending: isDescending === true,
    compare: function compare(a, b) {
      if (reader) {
        a = reader(a);
        b = reader(b);
      }

      return comparer(a, b);
    }
  };
}
/**
 * Converts a sorting function to a sorting criterion if necessary.
 * @private
 * @param {Function} criterion
 * @returns {Sorter}
 */


function _makeCriterion(criterion) {
  return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}
/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */


function _makeCriteria(sorters) {
  return sorters && sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
}
/**
 * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted
 * copy of an array-like object using the given criteria.<br/>
 * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you
 * can also pass simple "reader" functions and default ascending sorters will be built for you.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used
 * in the comparison.<br/>
 * Please note that if the arguments received by the default comparer aren't of the same type,
 * they will be compared as strings.
 *
 * @example <caption>Stable sort:</caption>
 * const persons = [
 *     {"name": "John", "surname" :"Doe"},
 *     {"name": "Mario", "surname": "Rossi"},
 *     {"name": "John", "surname" :"Moe"},
 *     {"name": "Jane", "surname": "Foe"}
 * ];
 *
 * const personsByName = _.sort(persons, [_.getKey("name")]);
 *
 * // personsByName holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Stable multi-sort:</caption>
 * const personsByNameAscSurnameDesc = _.sort(persons, [
 *     _.getKey("name"),
 *     _.sorterDesc(_.getKey("surname"))
 * ]);
 *
 * // personsByNameAscSurnameDesc holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Using custom comparers:</caption>
 * const localeSorter = new Intl.Collator("it");
 * const chars = ["a", "è", "à", "é", "c", "b", "e"];
 *
 * _.sort(chars, [localeSorter]) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * const localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
 *
 * _.sort(chars, [localeSorterDesc]) // => ["è", "é", "e", "c", "b", "à", "a"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {ArrayLike} arrayLike
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Array}
 */


function sort(arrayLike, sorters) {
  var criteria = _makeCriteria(sorters);

  var len = _toArrayLength(arrayLike.length);

  var result = Array(len);

  for (var i = 0; i < len; i++) {
    result[i] = {
      value: arrayLike[i],
      index: i
    };
  }

  result.sort(_compareWith(criteria));

  for (i = 0; i < len; i++) {
    result[i] = result[i].value;
  }

  return result;
}
/**
 * Establishes at which index an element should be inserted in a sorted array to respect
 * the array order. Needs the comparer used to sort the array.
 * @private
 * @param {Array} array
 * @param {*} element
 * @param {Function} comparer
 * @param {Number} start
 * @param {Number} end
 * @returns {Number}
 */


function _getInsertionIndex(array, element, comparer, start, end) {
  if (array.length === 0) {
    return 0;
  }

  var pivot = start + end >> 1;
  var result = comparer({
    value: element,
    index: pivot
  }, {
    value: array[pivot],
    index: pivot
  });

  if (end - start <= 1) {
    return result < 0 ? pivot : pivot + 1;
  } else if (result < 0) {
    return _getInsertionIndex(array, element, comparer, start, pivot);
  } else if (result === 0) {
    return pivot + 1;
  } else {
    return _getInsertionIndex(array, element, comparer, pivot, end);
  }
}
/**
 * Inserts an element in a copy of a sorted array respecting the sort order.
 * @example <caption>With simple values:</caption>
 * _.sortedInsert([], 1) // => [1]
 * _.sortedInsert([2, 4, 6], 5) // => [2, 4, 5, 6]
 * _.sortedInsert([4, 2, 1], 3, _.sorterDesc()) // => [4, 3, 2, 1]
 *
 * @example <caption>With complex values:</caption>
 * const persons = [
 *     {"name": "jane", "surname": "doe"},
 *     {"name": "John", "surname": "Doe"},
 *     {"name": "Mario", "surname": "Rossi"}
 * ];
 *
 * const getLowerCaseName = _.compose(
 *     _.invoke("toLowerCase"),
 *     _.getKey("name")
 * );
 *
 * const result = _.sortedInsert(
 *     persons,
 *     {"name": "marco", "surname": "Rossi"},
 *     getLowerCaseName
 * );
 *
 * // `result` holds:
 * // [
 * //     {"name": "jane", "surname": "doe"},
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "marco", "surname": "Rossi"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt} to insert the element
 * at a specific index
 * @since 0.27.0
 * @param {ArrayLike} arrayLike
 * @param {*} element
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]] - The sorting criteria
 * used to sort the array.
 * @returns {Array}
 */


function sortedInsert(arrayLike, element, sorters) {
  var result = slice(arrayLike, 0, arrayLike.length);

  if (arguments.length === 1) {
    return result;
  }

  var criteria = _makeCriteria(sorters);

  var idx = _getInsertionIndex(result, element, _compareWith(criteria), 0, result.length);

  result.splice(idx, 0, element);
  return result;
}
/**
 * Creates an ascending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.1.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */


var sorter = partial(_sorter, [__, false, __]);
/**
 * Creates a descending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}
 * @since 0.15.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */

var sorterDesc = partial(_sorter, [__, true, __]);
/**
 * Builds a partial application of {@link module:lamb.sort|sort} using the provided criteria.
 * The returned function expects the array-like object to sort.
 * As usual, sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function,
 * but you can also pass simple "reader" functions and default ascending sorters will be built.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used in
 * the comparison.<br/>
 * See {@link module:lamb.sort|sort} for more examples.
 *
 * @example
 * var sortAsNumbers = _.sortWith([parseFloat]);
 * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * sortAsNumbers(weights) // => ["1 Kg", "2 Kg", "7 Kg", "10 Kg"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sort|sort}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Function}
 */

var sortWith = _curry2(sort, true);
/**
 * Returns a copy of the given array-like object without the first element.
 * @example
 * _.tail([1, 2, 3, 4]) // => [2, 3, 4]
 * _.tail([1]) // => []
 * _.tail([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.init|init}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */


var tail = drop(1);
/**
 * Retrieves the first <code>n</code> elements from an array or array-like object.<br/>
 * Note that, being this a shortcut for a common use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.takeFrom(arr, 3) // => [1, 2, 3]
 * _.takeFrom(arr, -1) // => [1, 2, 3, 4]
 * _.takeFrom(arr, -10) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */

function takeFrom(arrayLike, n) {
  return slice(arrayLike, 0, n);
}
/**
 * A curried version of {@link module:lamb.takeFrom|takeFrom} that expects the number of elements
 * to retrieve to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.takeFrom|takeFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const take2 = _.take(2);
 *
 * take2([1, 2, 3, 4, 5]) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeFrom|takeFrom}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.5.0
 * @param {Number} n
 * @returns {Function}
 */


var take = _curry2(takeFrom, true);
/**
 * Builds a function that takes the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeLastWhileIsEven = _.takeLastWhile(isEven);
 *
 * takeLastWhileIsEven([1, 3, 5, 7]) // => []
 * takeLastWhileIsEven([2, 3, 6, 8]) // => [6, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var takeLastWhile = _takeOrDropWhile(true, true);
/**
 * Builds a function that takes the first elements satisfying a predicate from
 * an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeWhileIsEven = _.takeWhile(isEven);
 *
 * takeWhileIsEven([1, 2, 4, 6, 8]) // => []
 * takeWhileIsEven([2, 4, 7, 8]) // => [2, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */


var takeWhile = _takeOrDropWhile(true, false);
/**
 * Transposes a matrix. Can also be used to reverse a {@link module:lamb.zip|zip} operation.<br/>
 * Just like {@link module:lamb.zip|zip}, the received array-like objects will be truncated to the
 * shortest length.
 * @example <caption>Transposing a matrix:</caption>
 * _.transpose([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9]
 * ]) // =>
 * // [
 * //     [1, 4, 7],
 * //     [2, 5, 8],
 * //     [3, 6, 9]
 * // ]
 *
 * @example <caption>Showing the relationship with <code>zip</code>:</caption>
 * const zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.transpose(zipped) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike<ArrayLike>} arrayLike
 * @returns {Array<Array>}
 */


function transpose(arrayLike) {
  var minLen = MAX_ARRAY_LENGTH;

  var len = _toArrayLength(arrayLike.length);

  if (len === 0) {
    return [];
  }

  for (var j = 0, elementLen; j < len; j++) {
    elementLen = _toArrayLength(arrayLike[j].length);

    if (elementLen < minLen) {
      minLen = elementLen;
    }
  }

  var result = Array(minLen);

  for (var i = 0, el; i < minLen; i++) {
    el = result[i] = Array(len);

    for (j = 0; j < len; j++) {
      el[j] = arrayLike[j][i];
    }
  }

  return result;
}
/**
 * Builds a TypeError stating that it's not possible to convert the given value to the
 * desired type.
 * @private
 * @param {*} value
 * @param {String} desiredType
 * @returns {TypeError}
 */


function _makeTypeErrorFor(value, desiredType) {
  return new TypeError("Cannot convert " + type(value).toLowerCase() + " to " + desiredType);
}
/**
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * const square = n => n ** 2;
 * const getMaxAndSquare = _.pipe([Math.max, square]);
 *
 * getMaxAndSquare(3, 5) // => 25
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.compose|compose}
 * @since 0.1.0
 * @param {Function[]} functions
 * @returns {Function}
 */


function pipe(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }

  var len = functions.length;
  return len ? function () {
    var result = functions[0].apply(this, arguments);

    for (var i = 1; i < len; i++) {
      result = functions[i].call(this, result);
    }

    return result;
  } : identity;
}
/**
 * Using the provided iteratee to transform values, builds a function that will
 * return an array of the unique elements  in the two provided array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.union|union} if you don't need to compare transformed values.
 * @example
 * const unionByFloor = _.unionBy(Math.floor);
 *
 * unionByFloor([2.8, 3.2, 1.5], [3.5, 1.2, 4]) // => [2.8, 3.2, 1.5, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.union|union}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */


function unionBy(iteratee) {
  return pipe([binary(list), flatMapWith(drop(0)), uniquesBy(iteratee)]);
}
/**
 * Returns a list of every unique element present in the two given array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.unionBy|unionBy} if you need to transform the values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.union([1, 2, 3, 2], [2, 3, 4]) // => [1, 2, 3, 4]
 * _.union("abc", "bcd") // => ["a", "b", "c", "d"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */


var union = unionBy(identity);
/**
 * Builds a function that creates a copy of an array-like object with the given index
 * changed by applying the provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateAt(1, toUpperCase)(arr) // => ["a", "B", "c"]
 * _.updateAt(-1, toUpperCase)(arr) // => ["a", "b", "C"]
 * _.updateAt(10, toUpperCase)(arr) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.updateIndex|updateIndex}
 * @since 0.22.0
 * @param {Number} index
 * @param {Function} updater
 * @returns {Function}
 */

function updateAt(index, updater) {
  return function (arrayLike) {
    return _setIndex(arrayLike, index, null, updater);
  };
}
/**
 * Creates a copy of an array-like object with the given index changed by applying the
 * provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIndex(arr, 1, toUpperCase) // => ["a", "B", "c"]
 * _.updateIndex(arr, -1, toUpperCase) // => ["a", "b", "C"]
 * _.updateIndex(arr, 10, toUpperCase) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.updateAt|updateAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {Function} updater
 * @returns {Array}
 */


var updateIndex = partial(_setIndex, [__, __, null, __]);
/**
 * Builds a list of arrays out of the two given array-like objects by pairing items with
 * the same index.<br/>
 * The received array-like objects will be truncated to the shortest length.
 * @example
 * _.zip(
 *     ["a", "b", "c"],
 *     [1, 2, 3]
 * ) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.zip([1, 2, 3, 4], [5, 6, 7]) // => [[1, 5], [2, 6], [3, 7]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.transpose|transpose} for the reverse operation
 * @see {@link module:lamb.zipWithIndex|zipWithIndex}
 * @since 0.14.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array<Array>}
 */

function zip(a, b) {
  return transpose([a, b]);
}
/**
 * "{@link module:lamb.zip|Zips}" an array-like object by pairing its values with their index.
 * @example
 * _.zipWithIndex(["a", "b", "c"]) // => [["a", 0], ["b", 1], ["c", 2]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike} arrayLike
 * @returns {Array<Array<*, Number>>}
 */


var zipWithIndex = mapWith(binary(list));
/**
 * Applies the given function to a list of arguments.
 * @example
 * _.application(_.sum, [3, 4]) // => 7
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.apply|apply}, {@link module:lamb.applyTo|applyTo}
 * @since 0.47.0
 * @param {Function} fn
 * @param {ArrayLike} args
 * @returns {*}
 */

function application(fn, args) {
  return fn.apply(this, Object(args));
}
/**
 * A left-curried version of {@link module:lamb.application|application}. Expects the function
 * to apply and builds a function waiting for the arguments array.
 * @example
 * const arrayMax = _.apply(Math.max);
 *
 * arrayMax([4, 5, 2, 6, 1]) // => 6
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.applyTo|applyTo}
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */


var apply = _curry2(application);
/**
 * A right-curried version of {@link module:lamb.application|application}. Expects an array-like
 * object to use as arguments and builds a function waiting for the target of the application.
 * @example
 * const data = [3, 4];
 * const applyToData = _.applyTo(data);
 *
 * applyToData(_.sum) // => 7
 * applyToData(_.multiply) // => 12
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.apply|apply}
 * @since 0.47.0
 * @param {ArrayLike} args
 * @returns {Function}
 */


var applyTo = _curry2(application, true);
/**
 * Keeps building a partial application of the received function as long
 * as it's called with placeholders; applies the original function to
 * the collected parameters otherwise.<br/>
 * The function checks only the public placeholder to gain a little performance
 * as no function in Lamb is built with {@link module:lamb.asPartial|asPartial}.
 * @private
 * @param {Function} fn
 * @param {Array} argsHolder
 * @returns {Function|*}
 */


function _asPartial(fn, argsHolder) {
  return function () {
    var argsLen = arguments.length;
    var lastIdx = 0;
    var newArgs = [];

    for (var i = 0, len = argsHolder.length, boundArg; i < len; i++) {
      boundArg = argsHolder[i];
      newArgs[i] = boundArg === __ && lastIdx < argsLen ? arguments[lastIdx++] : boundArg;
    }

    while (lastIdx < argsLen) {
      newArgs[i++] = arguments[lastIdx++];
    }

    for (i = 0; i < argsLen; i++) {
      if (arguments[i] === __) {
        return _asPartial(fn, newArgs);
      }
    }

    for (i = 0, len = newArgs.length; i < len; i++) {
      if (newArgs[i] === __) {
        newArgs[i] = void 0;
      }
    }

    return fn.apply(this, newArgs);
  };
}
/**
 * Decorates the received function so that it can be called with
 * placeholders to build a partial application of it.<br/>
 * The difference with {@link module:lamb.partial|partial} is that, as long as
 * you call the generated function with placeholders, another partial application
 * of the original function will be built.<br/>
 * The final application will happen when one of the generated functions is
 * invoked without placeholders, using the parameters collected so far. <br/>
 * This function comes in handy when you need to build different specialized
 * functions starting from a basic one, but it's also useful when dealing with
 * optional parameters as you can decide to apply the function even if its arity
 * hasn't been entirely consumed.
 * @example <caption>Explaining the function's behaviour:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + c);
 *
 * f(4, 3, 2) // => 9
 * f(4, __, 2)(3) // => 9
 * f(__, 3, __)(4, __)(2) // => 9
 *
 * @example <caption>Exploiting optional parameters:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + (c || 0));
 *
 * const addFive = f(5, __);
 * addFive(2) // => 7
 *
 * const addNine = addFive(4, __);
 * addNine(11) // => 20
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.36.0
 * @param {Function} fn
 * @returns {Function}
 */


function asPartial(fn) {
  return _asPartial(fn, []);
}
/**
 * Accepts a series of functions and builds a new function. The functions in the series
 * will then be applied, in order, with the values received by the function built with
 * <code>collect</code>.<br/>
 * The collected results will be returned in an array.
 * @example
 * const user = {
 *     id: "jdoe",
 *     name: "John",
 *     surname: "Doe",
 *     scores: [2, 4, 7]
 * };
 * const getIDAndLastScore = _.collect([_.getKey("id"), _.getPath("scores.-1")]);
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * const minAndMax = _.collect([Math.min, Math.max]);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {Function[]} functions
 * @returns {Function}
 */


function collect(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }

  return function () {
    return map(functions, applyTo(arguments));
  };
}
/**
 * Used by curry functions to collect arguments until the arity is consumed,
 * then applies the original function.
 * @private
 * @param {Function} fn
 * @param {Number} arity
 * @param {Boolean} isRightCurry
 * @param {Boolean} isAutoCurry
 * @param {Array} argsHolder
 * @returns {Function}
 */


function _currier(fn, arity, isRightCurry, isAutoCurry, argsHolder) {
  return function () {
    var holderLen = argsHolder.length;
    var argsLen = arguments.length;
    var newArgsLen = holderLen + (argsLen > 1 && isAutoCurry ? argsLen : 1);
    var newArgs = Array(newArgsLen);

    for (var i = 0; i < holderLen; i++) {
      newArgs[i] = argsHolder[i];
    }

    for (; i < newArgsLen; i++) {
      newArgs[i] = arguments[i - holderLen];
    }

    if (newArgsLen >= arity) {
      return fn.apply(this, isRightCurry ? newArgs.reverse() : newArgs);
    } else {
      return _currier(fn, arity, isRightCurry, isAutoCurry, newArgs);
    }
  };
}
/**
 * Curries a function of arity 3.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */


function _curry3(fn, isRightCurry) {
  return function (a) {
    return function (b) {
      return function (c) {
        return isRightCurry ? fn.call(this, c, b, a) : fn.call(this, a, b, c);
      };
    };
  };
}
/**
 * Prepares a function for currying. If it's not auto-currying and the arity
 * is 2 or 3 returns optimized functions, otherwise delegates the currying
 * to the <code>_currier</code> function.<br/>
 * If the desumed arity isn't greater than one, it will return the received
 * function itself, instead.
 * @private
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @param {Boolean} [isRightCurry=false]
 * @param {Boolean} [isAutoCurry=false]
 * @returns {Function}
 */


function _curry(fn, arity, isRightCurry, isAutoCurry) {
  if (arity >>> 0 !== arity) {
    arity = fn.length;
  }

  if (isAutoCurry && arity > 1 || arity > 3) {
    return _currier(fn, arity, isRightCurry, isAutoCurry, []);
  } else if (arity === 2) {
    return _curry2(fn, isRightCurry);
  } else if (arity === 3) {
    return _curry3(fn, isRightCurry);
  } else {
    return fn;
  }
}
/**
 * Transforms the evaluation of the given function in the evaluation of a sequence of functions
 * expecting only one argument. Each function of the sequence is a partial application of the
 * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
 * for right currying.
 * @example
 * const makeWithKeys = _.curry(_.make);
 * const makePerson = makeWithKeys(["name", "surname"]);
 *
 * makePerson(["John", "Doe"]) // => {name: "John", surname: "Doe"};
 * makePerson(["Mario", "Rossi"]) // => {name: "Mario", surname: "Rossi"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */


function curry(fn, arity) {
  return _curry(fn, arity, false);
}
/**
 * Builds an auto-curried function. The resulting function can be called multiple times with
 * any number of arguments, and the original function will be applied only when the specified
 * (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
 * for right currying.
 * @example
 * const collectFourElements = _.curryable(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2)(3, 4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3, 4, 5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3)(4, 5) // => [2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.6.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */


function curryable(fn, arity) {
  return _curry(fn, arity, false, true);
}
/**
 * Same as {@link module:lamb.curryable|curryable}, but currying starts from the rightmost argument.
 * @example
 * const collectFourElements = _.curryableRight(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2)(3, 4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3, 4, 5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3)(4, 5) // => [5, 4, 3, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryable|curryable}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */


function curryableRight(fn, arity) {
  return _curry(fn, arity, true, true);
}
/**
 * Same as {@link module:lamb.curry|curry}, but currying starts from the rightmost argument.
 * @example
 * const makeWithValues = _.curryRight(_.make);
 * const makeJohnDoe = makeWithValues(["John", "Doe"]);
 *
 * makeJohnDoe(["name", "surname"]) // => {name: "John", surname: "Doe"};
 * makeJohnDoe(["firstName", "lastName"]) // => {firstName: "John", lastName: "Doe"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curry|curry}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */


function curryRight(fn, arity) {
  return _curry(fn, arity, true);
}
/**
 * Returns a function that will execute the given function only if it stops being called for the
 * specified timespan.<br/>
 * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call
 * happens immediately.
 * @example <caption>A common use case of <code>debounce</code> in a browser environment:</caption>
 * function updateLayout () {
 *     // some heavy DOM operations here
 * }
 *
 * window.addEventListener("resize", _.debounce(updateLayout, 200), false);
 *
 * // The resize event is fired repeteadly until the user stops resizing the
 * // window, while the `updateLayout` function is called only once: 200 ms
 * // after he stopped.
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.throttle|throttle}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds
 * @returns {Function}
 */


function debounce(fn, timespan) {
  var timeoutID;
  return function () {
    var args = arguments;

    var debounced = function () {
      timeoutID = null;
      fn.apply(this, args);
    }.bind(this);

    clearTimeout(timeoutID);
    timeoutID = setTimeout(debounced, timespan);
  };
}
/**
 * Returns a function that applies the original function with the arguments in reverse order.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 * _.flip(_.list)(1, 2, 3) // => [3, 2, 1]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */


function flip(fn) {
  return function () {
    var args = list.apply(null, arguments).reverse();
    return fn.apply(this, args);
  };
}
/**
 * Builds a function that returns the argument received at the given index.<br/>
 * As with {@link module:lamb.getAt|getAt} negative indexes are allowed.<br/>
 * The resulting function will return <code>undefined</code> if no arguments are
 * passed or if the index is out of bounds.
 * @example
 * const getFirstArg = _.getArgAt(0);
 * const getLastArg = _.getArgAt(-1);
 *
 * getFirstArg(1, 2, 3) // => 1
 * getLastArg(1, 2, 3) // => 3
 *
 * _.getArgAt()(1, 2, 3) // => undefined
 * _.getArgAt(6)(1, 2, 3) // => undefined
 * _.getArgAt(1)() // => undefined
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.17.0
 * @param {Number} idx
 * @returns {Function}
 */


function getArgAt(idx) {
  return function () {
    return arguments[_toNaturalIndex(idx, arguments.length)];
  };
}
/* eslint-disable jsdoc/check-param-names */

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * received by {@link module:lamb.invoke|invoke}, with the final set of <code>args</code>,
 * if present.
 * @private
 * @param {String} methodName
 * @param {Array} boundArgs
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */


function _invoke(methodName, boundArgs, target) {
  var method = target[methodName];

  if (typeof method !== "function") {
    return void 0;
  }

  var boundArgsLen = boundArgs ? _toArrayLength(boundArgs.length) : 0;
  var finalArgsLen = boundArgsLen + arguments.length - 3;
  var finalArgs = Array(finalArgsLen);

  for (var i = 0; i < boundArgsLen; i++) {
    finalArgs[i] = boundArgs[i];
  }

  for (var ofs = 3 - i; i < finalArgsLen; i++) {
    finalArgs[i] = arguments[i + ofs];
  }

  return method.apply(target, finalArgs);
}
/**
 * Builds a function that will invoke the given method name on any received object and
 * return the result. If no method with such name is found the function will return
 * <code>undefined</code>.<br/>
 * Along with the method name it's possible to supply some arguments that will be bound to the
 * method call. Further arguments can also be passed when the function is actually called, and
 * they will be concatenated to the bound ones.<br/>
 * Returning <code>undefined</code> is a behaviour meant to quickly create a case for
 * {@link module:lamb.adapter|adapter} without the need to check for the existence of the
 * desired method.<br/>
 * See also {@link module:lamb.generic|generic} to create functions out of object methods.
 * @example <caption>Basic polymorphism with <code>invoke</code>:</caption>
 * const polySlice = _.invoke("slice");
 *
 * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
 * polySlice("Hello world", 1, 3) // => "el"
 *
 * @example <caption>With bound arguments:</caption>
 * const substrFrom2 = _.invoke("substr", [2]);
 *
 * substrFrom2("Hello world") // => "llo world"
 * substrFrom2("Hello world", 5) // => "llo w"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invokeOn|invokeOn}
 * @since 0.1.0
 * @param {String} methodName
 * @param {ArrayLike} [boundArgs=[]]
 * @returns {Function}
 */


function invoke(methodName, boundArgs) {
  return partial(_invoke, [methodName, boundArgs]);
}
/**
 * Accepts an object and builds a function expecting a method name, and optionally arguments,
 * to call on such object.
 * Like {@link module:lamb.invoke|invoke}, if no method with the given name is found the
 * function will return <code>undefined</code>.
 * @example
 * const isEven = n => n % 2 === 0;
 * const arr = [1, 2, 3, 4, 5];
 * const invokeOnArr = _.invokeOn(arr);
 *
 * invokeOnArr("filter", isEven) // => [2, 4]
 * invokeOnArr("slice", 1, 3) // => [2, 3]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.15.0
 * @param {Object} target
 * @returns {Function}
 */


function invokeOn(target) {
  return partial(_invoke, [__, [], target]);
}
/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * const sumArray = _.reduceWith(_.sum);
 * const sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * const square = n => n ** 2;
 * const sumSquares = _.mapArgs(sumArgs, square);
 *
 * sumSquares(1, 2, 3, 4, 5) // => 55
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.tapArgs|tapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {ListIteratorCallback} mapper
 * @returns {Function}
 */


function mapArgs(fn, mapper) {
  return pipe([list, mapWith(mapper), apply(fn)]);
}
/**
 * Builds a function that allows to "tap" into the arguments of the original one.
 * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
 * If a "tapper" isn't found the argument is passed as it is.
 * @example
 * const someObject = {count: 5};
 * const someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
 * const getDataAmount = _.tapArgs(_.sum, [_.getKey("count"), _.getKey("length")]);
 *
 * getDataAmount(someObject, someArrayData); // => 15
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.mapArgs|mapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {Function[]} tappers
 * @returns {Function}
 */


function tapArgs(fn, tappers) {
  return function () {
    var len = arguments.length;
    var tappersLen = tappers.length;
    var args = [];

    for (var i = 0; i < len; i++) {
      args.push(i < tappersLen ? tappers[i](arguments[i]) : arguments[i]);
    }

    return fn.apply(this, args);
  };
}
/**
 * Returns a function that will invoke the passed function at most once in the given timespan.<br/>
 * The first call in this case happens as soon as the function is invoked; see also
 * {@link module:lamb.debounce|debounce} for a different behaviour where the first call is delayed.
 * @example
 * const log = _.throttle(console.log.bind(console), 5000);
 *
 * log("Hi"); // console logs "Hi"
 * log("Hi again"); // nothing happens
 * // after five seconds
 * log("Hello world"); // console logs "Hello world"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.debounce|debounce}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds.
 * @returns {Function}
 */


function throttle(fn, timespan) {
  var result;
  var lastCall = 0;
  return function () {
    var now = Date.now();

    if (now - lastCall >= timespan) {
      lastCall = now;
      result = fn.apply(this, arguments);
    }

    return result;
  };
}
/**
 * Builds a function that passes only one argument to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * const weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * _.map(weights, _.unary(parseInt)) // => [2, 10, 1, 7]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.binary|binary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */


function unary(fn) {
  return function (a) {
    return fn.call(this, a);
  };
}
/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in synergy with {@link module:lamb.casus|casus} and
 * {@link module:lamb.invoke|invoke}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * const isEven = n => n % 2 === 0;
 * const filterString = _.compose(_.joinWith(""), _.filter);
 * const filterAdapter = _.adapter([
 *     _.invoke("filter"),
 *     _.casus(_.isType("String"), filterString)
 * ]);
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // by its nature is composable
 * const filterWithDefault = _.adapter([filterAdapter, _.always("Not implemented")]);
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.casus|casus}
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.6.0
 * @param {Function[]} functions
 * @returns {Function}
 */


function adapter(functions) {
  if (!Array.isArray(functions)) {
    throw _makeTypeErrorFor(functions, "array");
  }

  return function () {
    var len = functions.length;
    var result;

    for (var i = 0; i < len; i++) {
      result = functions[i].apply(this, arguments);

      if (!isUndefined(result)) {
        break;
      }
    }

    return result;
  };
}
/**
 * Creates a function to check the given predicates.<br/>
 * Used to build the {@link module:lamb.allOf|allOf} and the
 * {@link module:lamb.anyOf|anyOf} functions.
 * @private
 * @param {Boolean} checkAll
 * @returns {Function}
 */


function _checkPredicates(checkAll) {
  return function (predicates) {
    if (!Array.isArray(predicates)) {
      throw _makeTypeErrorFor(predicates, "array");
    }

    return function () {
      for (var i = 0, len = predicates.length, result; i < len; i++) {
        result = predicates[i].apply(this, arguments);

        if (checkAll && !result) {
          return false;
        } else if (!checkAll && result) {
          return true;
        }
      }

      return checkAll;
    };
  };
}
/**
 * Accepts an array of predicates and builds a new one that returns true if they are all satisfied
 * by the same arguments. The functions in the array will be applied one at a time until a
 * <code>false</code> value is produced, which is returned immediately.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isPositiveEven = _.allOf([isEven, _.isGT(0)]);
 *
 * isPositiveEven(-2) // => false
 * isPositiveEven(11) // => false
 * isPositiveEven(6) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.anyOf|anyOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */


var allOf = _checkPredicates(true);
/**
 * Accepts an array of predicates and builds a new one that returns true if at least one of them is
 * satisfied by the received arguments. The functions in the array will be applied one at a time
 * until a <code>true</code> value is produced, which is returned immediately.
 * @example
 * const users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * const isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * const isSuperUser = _.anyOf([isInGroup("admin"), isInGroup("root")]);
 *
 * isSuperUser(users[0]) // => false
 * isSuperUser(users[1]) // => true
 * isSuperUser(users[2]) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.allOf|allOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */


var anyOf = _checkPredicates(false);
/**
 * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
 * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
 * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
 * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally,
 * <code>NaN</code> is equal to itself.<br/>
 * See also {@link module:lamb.is|is} for a curried version building a predicate and
 * {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ} to perform a "SameValueZero"
 * comparison.
 * @example
 * const testObject = {};
 *
 * _.areSame({}, testObject) // => false
 * _.areSame(testObject, testObject) // => true
 * _.areSame("foo", "foo") // => true
 * _.areSame(0, -0) // => false
 * _.areSame(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.is|is}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */


function areSame(a, b) {
  return a === 0 && b === 0 ? 1 / a === 1 / b : areSVZ(a, b);
}
/**
 * Builds a case for {@link module:lamb.adapter|adapter}.<br/>
 * The function will apply the received arguments to <code>fn</code> if the predicate is satisfied
 * with the same arguments, otherwise will return <code>undefined</code>.<br/>
 * See also {@link module:lamb.condition|condition} to build a condition with two branching functions
 * and {@link module:lamb.unless|unless} and {@link module:lamb.when|when} where one of the branches
 * is the identity function.
 * @example
 * const halveIfNumber = _.casus(_.isType("Number"), _.divideBy(2));
 *
 * halveIfNumber(2) // => 1
 * halveIfNumber("2") // => undefined
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @since 0.51.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */


function casus(predicate, fn) {
  return function () {
    return predicate.apply(this, arguments) ? fn.apply(this, arguments) : void 0;
  };
}
/**
 * Builds a function that will apply the received arguments to <code>trueFn</code>,
 * if the predicate is satisfied with the same arguments, or to <code>falseFn</code> otherwise.<br/>
 * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>,
 * it's probably better to use {@link module:lamb.adapter|adapter} to build more complex behaviours.<br/>
 * See also {@link module:lamb.unless|unless} and {@link module:lamb.when|when} as they are
 * shortcuts to common use cases.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveEvenAndDoubleOdd = _.condition(isEven, _.divideBy(2), _.multiplyBy(2));
 *
 * halveEvenAndDoubleOdd(5) // => 10
 * halveEvenAndDoubleOdd(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.2.0
 * @param {Function} predicate
 * @param {Function} trueFn
 * @param {Function} falseFn
 * @returns {Function}
 */


function condition(predicate, trueFn, falseFn) {
  return function () {
    return (predicate.apply(this, arguments) ? trueFn : falseFn).apply(this, arguments);
  };
}
/**
 * Verifies that the first given value is greater than the second.<br/>
 * Wraps the native <code>&gt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.gt(today, pastDate) // => true
 * _.gt(pastDate, today) // => false
 * _.gt(3, 4) // => false
 * _.gt(3, 3) // => false
 * _.gt(3, 2) // => true
 * _.gt(0, -0) // => false
 * _.gt(-0, 0) // => false
 * _.gt("a", "A") // => true
 * _.gt("b", "a") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */


function gt(a, b) {
  return a > b;
}
/**
 * Verifies that the first given value is greater than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&gt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.gte(3, 4) // => false
 * _.gte(3, 3) // => true
 * _.gte(3, 2) // => true
 * _.gte(0, -0) // => true
 * _.gte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gt|gt}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */


function gte(a, b) {
  return a >= b;
}
/**
 * A curried version of {@link module:lamb.areSame|areSame}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValue"
 * comparison.<br/>
 * See also {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ}
 * to perform a "SameValueZero" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.is(john);
 * const isNegativeZero = _.is(-0);
 * const isReallyNaN = _.is(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isNegativeZero(0) // => false
 * isNegativeZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSame|areSame}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */


var is = _curry2(areSame);
/**
 * A right curried version of {@link module:lamb.gt|gt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than the one received by the predicate.
 * @example
 * const isGreaterThan5 = _.isGT(5);
 *
 * isGreaterThan5(3) // => false
 * isGreaterThan5(5) // => false
 * isGreaterThan5(7) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */


var isGT = _curry2(gt, true);
/**
 * A right curried version of {@link module:lamb.gte|gte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than or equal to the one received by the predicate.
 * @example
 * const isPositiveOrZero = _.isGTE(0);
 *
 * isPositiveOrZero(-3) // => false
 * isPositiveOrZero(-0) // => true
 * isPositiveOrZero(0) // => true
 * isPositiveOrZero(5) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGT|isGT}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */


var isGTE = _curry2(gte, true);
/**
 * Verifies that the first given value is less than the second.<br/>
 * Wraps the native <code>&lt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.lt(today, pastDate) // => false
 * _.lt(pastDate, today) // => true
 * _.lt(3, 4) // => true
 * _.lt(3, 3) // => false
 * _.lt(3, 2) // => false
 * _.lt(0, -0) // => false
 * _.lt(-0, 0) // => false
 * _.lt("a", "A") // => false
 * _.lt("a", "b") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */


function lt(a, b) {
  return a < b;
}
/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * const isLessThan5 = _.isLT(5);
 *
 * isLessThan5(7) // => false
 * isLessThan5(5) // => false
 * isLessThan5(3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */


var isLT = _curry2(lt, true);
/**
 * Verifies that the first given value is less than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&lt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.lte(3, 4) // => true
 * _.lte(3, 3) // => true
 * _.lte(3, 2) // => false
 * _.lte(0, -0) // => true
 * _.lte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lt|lt}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */


function lte(a, b) {
  return a <= b;
}
/**
 * A right curried version of {@link module:lamb.lte|lte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than or equal to the one received by the predicate.
 * @example
 * const isNegativeOrZero = _.isLTE(0);
 *
 * isNegativeOrZero(5) // => false
 * isNegativeOrZero(-0) // => true
 * isNegativeOrZero(0) // => true
 * isNegativeOrZero(-3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLT|isLT}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */


var isLTE = _curry2(lte, true);
/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate isn't satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.when|when} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>trueFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveUnlessIsEven = _.unless(isEven, _.divideBy(2));
 *
 * halveUnlessIsEven(5) // => 2.5
 * halveUnlessIsEven(6) // => 6
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */


function unless(predicate, fn) {
  return function (value) {
    return predicate.call(this, value) ? value : fn.call(this, value);
  };
}
/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate is satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.unless|unless} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>falseFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveIfEven = _.when(isEven, _.divideBy(2));
 *
 * halveIfEven(5) // => 5
 * halveIfEven(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */


function when(predicate, fn) {
  return function (value) {
    return predicate.call(this, value) ? fn.call(this, value) : value;
  };
}
/**
 * Sums two numbers.
 * @example
 * _.sum(4, 5) // => 9
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.add|add}
 * @since 0.50.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function sum(a, b) {
  return a + b;
}
/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * const add5 = _.add(5);
 *
 * _.add5(4) // => 9
 * _.add5(-2) // => 3
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.sum|sum}
 * @since 0.1.0
 * @param {Number} a
 * @returns {Function}
 */


var add = _curry2(sum, true);
/**
 * Subtracts two numbers.
 * @example
 * _.subtract(5, 3) // => 2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.deduct|deduct}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function subtract(a, b) {
  return a - b;
}
/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * const deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */


var deduct = _curry2(subtract, true);
/**
 * Divides two numbers.
 * @example
 * _.divide(5, 2) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.divideBy|divideBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function divide(a, b) {
  return a / b;
}
/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * const halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */


var divideBy = _curry2(divide, true);
/**
 * Generates a sequence of values of the desired length with the provided iteratee.
 * The values being iterated, and received by the iteratee, are the results generated so far.
 * @example
 * const fibonacci = (n, idx, results) => n + (results[idx - 1] || 0);
 *
 * _.generate(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.range|range}
 * @since 0.21.0
 * @param {*} start - The starting value
 * @param {Number} len - The desired length for the sequence
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */


function generate(start, len, iteratee) {
  var result = [start];

  for (var i = 0, limit = len - 1; i < limit; i++) {
    result.push(iteratee(result[i], i, result));
  }

  return result;
}
/**
 * Verifies whether the received value is a finite number.<br/>
 * Behaves almost as a shim of ES6's [Number.isFinite]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isFinite(5) // => true
 * _.isFinite(new Number(5)) // => true
 * _.isFinite(Infinity) // => false
 * _.isFinite(-Infinity) // => false
 * _.isFinite("5") // => false
 * _.isFinite(NaN) // => false
 * _.isFinite(null) // => false
 *
 * @alias module:lamb.isFinite
 * @category Math
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */


function isFinite_(value) {
  return type(value) === "Number" && isFinite(value);
}
/**
 * Verifies whether the received value is a number and an integer.
 * Behaves almost as a shim of ES6's [Number.isInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isInteger(5) // => true
 * _.isInteger(new Number(5)) // => true
 * _.isInteger(2.5) // => false
 * _.isInteger(Infinity) // => false
 * _.isInteger(-Infinity) // => false
 * _.isInteger("5") // => false
 * _.isInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isSafeInteger|isSafeInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */


function isInteger(value) {
  return type(value) === "Number" && value % 1 === 0;
}
/**
 * Verifies whether the received value is a "safe integer", meaning that is a number and that
 * can be exactly represented as an IEEE-754 double precision number.
 * The safe integers consist of all integers from -(2<sup>53</sup> - 1) inclusive to
 * 2<sup>53</sup> - 1 inclusive.<br/>
 * Behaves almost as a shim of ES6's [Number.isSafeInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isSafeInteger(5) // => true
 * _.isSafeInteger(new Number(5)) // => true
 * _.isSafeInteger(Math.pow(2, 53) - 1) // => true
 * _.isSafeInteger(Math.pow(2, 53)) // => false
 * _.isSafeInteger(2e32) // => false
 * _.isSafeInteger(2.5) // => false
 * _.isSafeInteger(Infinity) // => false
 * _.isSafeInteger(-Infinity) // => false
 * _.isSafeInteger("5") // => false
 * _.isSafeInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isInteger|isInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */


function isSafeInteger(value) {
  return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}
/**
 * Performs the modulo operation and should not be confused with the
 * {@link module:lamb.remainder|remainder}.
 * The function performs a floored division to calculate the result and not
 * a truncated one, hence the sign of the dividend is not kept, unlike the
 * {@link module:lamb.remainder|remainder}.
 * @example
 * _.modulo(5, 3) // => 2
 * _.remainder(5, 3) // => 2
 *
 * _.modulo(-5, 3) // => 1
 * _.remainder(-5, 3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.remainder|remainder}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function modulo(a, b) {
  return a - b * Math.floor(a / b);
}
/**
 * Multiplies two numbers.
 * @example
 * _.multiply(5, 3) // => 15
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.multiplyBy|multiplyBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function multiply(a, b) {
  return a * b;
}
/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * const double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */


var multiplyBy = _curry2(multiply, true);
/**
 * Generates a random integer between two given integers, both included.
 * Note that no safety measure is taken if the provided arguments aren't integers, so
 * you may end up with unexpected (not really) results.
 * For example <code>randomInt(0.1, 1.2)</code> could be <code>2</code>.
 * @example
 *
 * _.randomInt(1, 10) // => an integer >=1 && <= 10
 *
 * @memberof module:lamb
 * @category Math
 * @since 0.1.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */


function _forceToNumber(value) {
  var n = +value;
  return n === n ? n : 0; // eslint-disable-line no-self-compare
}
/**
 * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
 * but not including, <code>limit</code>, using the given <code>step</code>.
 * @example
 * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
 * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
 * _.range(0, 3, 1) // => [0, 1, 2]
 * _.range(-0, 3, 1) // => [-0, 1, 2]
 * _.range(1, -10, 2) // => []
 * _.range(3, 5, -1) // => []
 *
 * @example <caption>Behaviour if <code>step</code> happens to be zero:</caption>
 * _.range(2, 10, 0) // => [2]
 * _.range(2, -10, 0) // => [2]
 * _.range(2, 2, 0) // => []
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.generate|generate}
 * @since 0.1.0
 * @param {Number} start
 * @param {Number} limit
 * @param {Number} [step=1]
 * @returns {Number[]}
 */


function range(start, limit, step) {
  start = _forceToNumber(start);
  limit = _forceToNumber(limit);
  step = arguments.length === 3 ? _forceToNumber(step) : 1;

  if (step === 0) {
    return limit === start ? [] : [start];
  }

  var len = Math.max(Math.ceil((limit - start) / step), 0);
  var result = Array(len);

  for (var i = 0, last = start; i < len; i++) {
    result[i] = last;
    last += step;
  }

  return result;
}
/**
 * Gets the remainder of the division of two numbers.
 * Not to be confused with the {@link module:lamb.modulo|modulo} as the remainder
 * keeps the sign of the dividend and may lead to some unexpected results.
 * @example
 * // example of wrong usage of the remainder
 * // (in this case the modulo operation should be used)
 * const isOdd = n => _.remainder(n, 2) === 1;
 *
 * isOdd(-3) // => false as -3 % 2 === -1
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.modulo|modulo}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */


function remainder(a, b) {
  return a % b;
}
/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */


var _isOwnEnumerable = generic(Object.prototype.propertyIsEnumerable);
/**
 * Builds a list of the enumerable properties of an object.
 * The function is null-safe, unlike the public one.
 * @private
 * @param {Object} obj
 * @returns {String[]}
 */


function _safeEnumerables(obj) {
  var result = [];

  for (var key in obj) {
    result.push(key);
  }

  return result;
}
/**
 * Checks whether the specified key is an enumerable property of the given object or not.
 * @private
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */


function _isEnumerable(obj, key) {
  return key in Object(obj) && (_isOwnEnumerable(obj, key) || ~_safeEnumerables(obj).indexOf(key));
}
/**
 * Helper to retrieve the correct key while evaluating a path.
 * @private
 * @param {Object} target
 * @param {String} key
 * @param {Boolean} includeNonEnumerables
 * @returns {String|Number|Undefined}
 */


function _getPathKey(target, key, includeNonEnumerables) {
  if (includeNonEnumerables && key in Object(target) || _isEnumerable(target, key)) {
    return key;
  }

  var n = +key;
  var len = target && target.length;
  return n >= -len && n < len ? n < 0 ? n + len : n : void 0;
}
/**
 * Checks if a path is valid in the given object and retrieves the path target.
 * @private
 * @param {Object} obj
 * @param {String[]} parts
 * @param {Boolean} walkNonEnumerables
 * @returns {Object}
 */


function _getPathInfo(obj, parts, walkNonEnumerables) {
  if (isNil(obj)) {
    throw _makeTypeErrorFor(obj, "object");
  }

  var target = obj;
  var i = -1;
  var len = parts.length;
  var key;

  while (++i < len) {
    key = _getPathKey(target, parts[i], walkNonEnumerables);

    if (isUndefined(key)) {
      break;
    }

    target = target[key];
  }

  return i === len ? {
    isValid: true,
    target: target
  } : {
    isValid: false,
    target: void 0
  };
}
/**
 * Splits a sting path using the provided separator and returns an array
 * of path parts.
 * @private
 * @param {String} path
 * @param {String} separator
 * @returns {String[]}
 */


function _toPathParts(path, separator) {
  return String(path).split(separator || ".");
}
/**
 * Gets a nested property value from an object using the given path.<br/>
 * The path is a string with property names separated by dots by default, but
 * it can be customised with the optional third parameter.<br/>
 * You can use integers in the path, even negative ones, to refer to array-like
 * object indexes, but the priority will be given to existing object keys:
 * the last example explains this particular case.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     },
 *     scores: [
 *         {id: 1, value: 10},
 *         {id: 2, value: 20},
 *         {id: 3, value: 30}
 *     ]
 * };
 *
 * _.getPathIn(user, "name") // => "John"
 * _.getPathIn(user, "login.password") // => "abc123";
 * _.getPathIn(user, "login/user.name", "/") // => "jdoe"
 * _.getPathIn(user, "name.foo") // => undefined
 * _.getPathIn(user, "name.foo.bar") // => undefined
 *
 * @example <caption>Accessing array-like objects indexes:</caption>
 * _.getPathIn(user, "login.password.1") // => "b"
 * _.getPathIn(user, "scores.0") // => {id: 1, value: 10}
 * _.getPathIn(user, "scores.-1.value") // => 30
 *
 * @example <caption>Priority will be given to existing object keys over indexes:</caption>
 * _.getPathIn(user, "scores.-1") // => {id: 3, value: 30}
 *
 * // let's do something funny
 * user.scores["-1"] = "foo bar";
 *
 * _.getPathIn(user, "scores.-1") // => "foo bar";
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getPath|getPath}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {Object|ArrayLike} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {*}
 */


function getPathIn(obj, path, separator) {
  return _getPathInfo(obj, _toPathParts(path, separator), true).target;
}
/**
 * Builds a <code>checker</code> function meant to be used with
 * {@link module:lamb.validate|validate}.<br/>
 * Note that the function accepts multiple <code>keyPaths</code> as a means to
 * compare their values. In other words all the received <code>keyPaths</code> will be
 * passed as arguments to the <code>predicate</code> to run the test.<br/>
 * If you want to run the same single property check with multiple properties, you should build
 * multiple <code>checker</code>s and combine them with {@link module:lamb.validate|validate}.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         username: "jdoe",
 *         password: "abc123",
 *         passwordConfirm: "abc123"
 *     }
 * };
 * const pwdMatch = _.checker(
 *     _.areSame,
 *     "Passwords don't match",
 *     ["login.password", "login.passwordConfirm"]
 * );
 *
 * pwdMatch(user) // => []
 *
 * const newUser = _.setPathIn(user, "login.passwordConfirm", "avc123");
 *
 * pwdMatch(newUser) // => ["Passwords don't match", ["login.password", "login.passwordConfirm"]]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validate|validate}, {@link module:lamb.validateWith|validateWith}
 * @since 0.1.0
 * @param {Function} predicate - The predicate to test the object properties
 * @param {String} message - The error message
 * @param {String[]} keyPaths - The array of keys, or {@link module:lamb.getPathIn|paths}, to test.
 * @param {String} [pathSeparator="."]
 * @returns {Function} A checker function which returns an error in the form
 * <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
 */


function checker(predicate, message, keyPaths, pathSeparator) {
  return function (obj) {
    var getValues = partial(getPathIn, [obj, __, pathSeparator]);
    return predicate.apply(obj, map(keyPaths, getValues)) ? [] : [message, keyPaths];
  };
}
/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */


var _unsafeKeyListFrom = _curry2(function (getKeys, obj) {
  if (isNil(obj)) {
    throw _makeTypeErrorFor(obj, "object");
  }

  return getKeys(obj);
});
/**
 * Creates an array with all the enumerable properties of the given object.
 * @example <caption>Showing the difference with {@link module:lamb.keys|keys}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.keys(foo) // => ["d"]
 * _.enumerables(foo) // => ["d", "a"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.keys|keys}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {String[]}
 */


var enumerables = _unsafeKeyListFrom(_safeEnumerables);
/**
 * Builds an object from a list of key / value pairs like the one
 * returned by {@link module:lamb.pairs|pairs} or {@link module:lamb.ownPairs|ownPairs}.<br/>
 * In case of duplicate keys the last key / value pair is used.
 * @example
 * _.fromPairs([["a", 1], ["b", 2], ["c", 3]]) // => {"a": 1, "b": 2, "c": 3}
 * _.fromPairs([["a", 1], ["b", 2], ["a", 3]]) // => {"a": 3, "b": 2}
 * _.fromPairs([[1], [void 0, 2], [null, 3]]) // => {"1": undefined, "undefined": 2, "null": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.ownPairs|ownPairs}, {@link module:lamb.pairs|pairs}
 * @since 0.8.0
 * @param {Array<Array<String, *>>} pairsList
 * @returns {Object}
 */


function fromPairs(pairsList) {
  var result = {};
  forEach(pairsList, function (pair) {
    result[pair[0]] = pair[1];
  });
  return result;
}
/**
 * Builds a partial application of {@link module:lamb.getPathIn|getPathIn} with the given
 * path and separator, expecting the object to act upon.<br/>
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     }
 * };
 *
 * const getPwd = _.getPath("login.password");
 * const getUsername = _.getPath("login/user.name", "/");
 *
 * getPwd(user) // => "abc123";
 * getUsername(user) // => "jdoe"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getPathIn|getPathIn}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */


var getPath = _makePartial3(getPathIn);
/**
 * Verifies the existence of a property in an object.
 * @example
 * const user1 = {name: "john"};
 *
 * _.has(user1, "name") // => true
 * _.has(user1, "surname") // => false
 * _.has(user1, "toString") // => true
 *
 * const user2 = Object.create(null);
 *
 * // not inherited through the prototype chain
 * _.has(user2, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */


function has(obj, key) {
  if (_typeof(obj) !== "object" && !isUndefined(obj)) {
    obj = Object(obj);
  }

  return key in obj;
}
/**
 * Curried version of {@link module:lamb.has|has}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {};
 * const hasName = _.hasKey("name");
 *
 * hasName(user1) // => true
 * hasName(user2) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.has|has}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */


var hasKey = _curry2(has, true);
/**
 * Verifies if an object has the specified property and that the property isn't inherited through
 * the prototype chain.<br/>
 * @example <caption>Comparison with <code>has</code>:</caption>
 * const user = {name: "john"};
 *
 * _.has(user, "name") // => true
 * _.has(user, "surname") // => false
 * _.has(user, "toString") // => true
 *
 * _.hasOwn(user, "name") // => true
 * _.hasOwn(user, "surname") // => false
 * _.hasOwn(user, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */


var hasOwn = generic(Object.prototype.hasOwnProperty);
/**
 * Curried version of {@link module:lamb.hasOwn|hasOwn}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user = {name: "john"};
 * const hasOwnName = _.hasOwnKey("name");
 * const hasOwnToString = _.hasOwnToString("toString");
 *
 * hasOwnName(user) // => true
 * hasOwnToString(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwn|hasOwn}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */

var hasOwnKey = _curry2(hasOwn, true);
/**
 * Builds a predicate expecting an object to check against the given key / value pair.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
 *
 * hasTheCorrectAnswer({answer: 2}) // false
 * hasTheCorrectAnswer({answer: 42}) // true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasPathValue|hasPathValue}
 * @since 0.1.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */


function hasKeyValue(key, value) {
  return function (obj) {
    return isUndefined(value) ? has(obj, key) && obj[key] === value : areSVZ(value, obj[key]);
  };
}
/**
 * Builds a predicate to check if the given path exists in an object and holds the desired value.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     personal: {
 *         age: 25,
 *         gender: "M"
 *     },
 *     scores: [
 *         {id: 1, value: 10, passed: false},
 *         {id: 2, value: 20, passed: false},
 *         {id: 3, value: 30, passed: true}
 *     ]
 * };
 *
 * const isMale = _.hasPathValue("personal.gender", "M");
 * const hasPassedFirstTest = _.hasPathValue("scores.0.passed", true);
 * const hasPassedLastTest = _.hasPathValue("scores.-1.passed", true);
 *
 * isMale(user) // => true
 * hasPassedFirstTest(user) // => false
 * hasPassedLastTest(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKeyValue|hasKeyValue}
 * @since 0.41.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */


function hasPathValue(path, value, separator) {
  return function (obj) {
    var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

    return pathInfo.isValid && areSVZ(pathInfo.target, value);
  };
}
/**
 * A null-safe version of <code>Object.keys</code>.
 * @private
 * @function
 * @param {Object} obj
 * @returns {String[]}
 */


var _safeKeys = compose(Object.keys, Object);
/**
 * Retrieves the list of the own enumerable properties of an object.<br/>
 * Although [Object.keys]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
 * is already present in ECMAScript 5, its behaviour changed in the subsequent specifications
 * of the standard.<br/>
 * This function <em>shims</em> the ECMAScript 6 version, by forcing a conversion to
 * object for any value but <code>null</code> and <code>undefined</code>.
 * @example <caption>Showing the difference with {@link module:lamb.enumerables|enumerables}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.enumerables(foo) // => ["d", "a"]
 * _.keys(foo) // => ["d"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.enumerables|enumerables}
 * @since 0.25.1
 * @param {Object} obj
 * @returns {String[]}
 */


var keys = _unsafeKeyListFrom(_safeKeys);
/**
 * Builds a predicate to check if the given key satisfies the desired condition
 * on an object.
 * @example
 * const users = [
 *     {name: "John", age: 25},
 *     {name: "Jane", age: 15},
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 *
 * isAdult(users[0]) // => true
 * isAdult(users[1]) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathSatisfies|pathSatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} key
 * @returns {Function}
 */


function keySatisfies(predicate, key) {
  return function (obj) {
    return predicate.call(this, obj[key]);
  };
}
/**
 * Builds an object from the two given lists, using the first one as keys and the last
 * one as values.<br/>
 * If the list of keys is longer than the values one, the keys will be created with
 * <code>undefined</code> values.<br/>
 * If more values than keys are supplied, the extra values will be ignored.
 * @example
 * _.make(["a", "b", "c"], [1, 2, 3]) // => {a: 1, b: 2, c: 3}
 * _.make(["a", "b", "c"], [1, 2]) // => {a: 1, b: 2, c: undefined}
 * _.make(["a", "b"], [1, 2, 3]) // => {a: 1, b: 2}
 * _.make([null, void 0, 2], [1, 2, 3]) // => {"null": 1, "undefined": 2, "2": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.tear|tear}, {@link module:lamb.tearOwn|tearOwn} for the reverse operation
 * @since 0.8.0
 * @param {String[]} names
 * @param {ArrayLike} values
 * @returns {Object}
 */


function make(names, values) {
  var result = {};
  var valuesLen = values.length;

  for (var i = 0, len = names.length; i < len; i++) {
    result[names[i]] = i < valuesLen ? values[i] : void 0;
  }

  return result;
}
/**
 * Creates a new object by applying the given function
 * to all enumerable properties of the source one.
 * @example
 * const weights = {
 *     john: "72.5 Kg",
 *     jane: "52.3 Kg"
 * };
 *
 * _.mapValues(weights, parseFloat) // => {john: 72.5, jane: 52.3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValuesWith|mapValuesWith}
 * @since 0.54.0
 * @param {Object} source
 * @param {ObjectIteratorCallback} fn
 * @returns {Object}
 */


function mapValues(source, fn) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }

  var result = {};

  for (var key in source) {
    result[key] = fn(source[key], key, source);
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.mapValues|mapValues}.<br/>
 * Expects a mapping function to build a new function waiting for the
 * object to act upon.
 * @example
 * const incValues = _.mapValuesWith(_.add(1));
 * const results = {
 *     first: 10,
 *     second: 5,
 *     third: 3
 * };
 *
 * incValues(results) // => {first: 11, second: 6, third: 4}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValues|mapValues}
 * @since 0.54.0
 * @function
 * @param {ObjectIteratorCallback} fn
 * @returns {Function}
 */


var mapValuesWith = _curry2(mapValues, true);
/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {Object} a
 * @param {Object} b
 * @returns {Function}
 */


function _merge(getKeys, a, b) {
  return reduce([a, b], function (result, source) {
    forEach(getKeys(source), function (key) {
      result[key] = source[key];
    });
    return result;
  }, {});
}
/**
 * Merges the enumerable properties of the provided sources into a new object.<br/>
 * In case of key homonymy the last source has precedence over the first.
 * @example
 * _.merge({a: 1, b: 3}, {b: 5, c: 4}) // => {a: 1, b: 5, c: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.merge({a: 2}, 99) // => {a: 2}
 * _.merge({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
 * @since 0.10.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */


var merge = partial(_merge, [enumerables]);
/**
 * Same as {@link module:lamb.merge|merge}, but only the own properties of the
 * sources are taken into account.
 * @example <caption>Showing the difference with <code>merge</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * const bar = {d: 4};
 *
 * _.merge(foo, bar) // => {a: 1, b: 2, c: 3, d: 4}
 * _.mergeOwn(foo, bar) // => {c: 3, d: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.mergeOwn([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.mergeOwn("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.mergeOwn({a: 2}, 99) // => {a: 2}
 * _.mergeOwn({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.merge|merge} to merge all enumerable properties
 * @since 0.12.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */

var mergeOwn = partial(_merge, [keys]);
/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function
 * @param {Object} obj
 * @returns {Function}
 */

var _keyToPairIn = _curry2(function (obj, key) {
  return [key, obj[key]];
});
/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */


var _pairsFrom = _curry2(function (getKeys, obj) {
  return map(getKeys(obj), _keyToPairIn(obj));
});
/**
 * Same as {@link module:lamb.pairs|pairs}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * See also {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example <caption>Showing the difference with <code>pairs</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.pairs(foo) // => [["c", 3], ["b", 2], ["a", 1]]
 * _.ownPairs(foo) // => [["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pairs|pairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */


var ownPairs = _pairsFrom(keys);
/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */


var _valuesFrom = _curry2(function (getKeys, obj) {
  return map(getKeys(obj), function (key) {
    return obj[key];
  });
});
/**
 * Same as {@link module:lamb.values|values}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * @example <caption>Showing the difference with <code>values</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.values(foo) // => [3, 2, 1]
 * _.ownValues(foo) // => [3]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.values|values}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array}
 */


var ownValues = _valuesFrom(keys);
/**
 * Converts an object into an array of key / value pairs of its enumerable properties.<br/>
 * See also {@link module:lamb.ownPairs|ownPairs} for picking only the own enumerable
 * properties and {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example
 * _.pairs({a: 1, b: 2, c: 3}) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownPairs|ownPairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */


var pairs = _pairsFrom(enumerables);
/**
 * Checks if the provided path exists in the given object.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * _.pathExistsIn(user, "address.city") // => true
 * _.pathExistsIn(user, "address.country") // => false
 * _.pathExistsIn(user, "scores.1") // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathExists|pathExists}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {Object} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Boolean}
 */


function pathExistsIn(obj, path, separator) {
  return _getPathInfo(obj, _toPathParts(path, separator), true).isValid;
}
/**
 * Builds a partial application of {@link module:lamb.pathExistsIn|pathExistsIn} using the given
 * path and the optional separator. The resulting function expects the object to check.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * const hasCity = _.pathExists("address.city");
 * const hasCountry = _.pathExists("address.country");
 * const hasAtLeastThreeScores = _.pathExists("scores.2");
 *
 * hasCity(user) // => true
 * hasCountry(user) // => false
 * hasAtLeastThreeScores(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */


var pathExists = _makePartial3(pathExistsIn);
/**
 * Builds a predicate that verifies if a condition is satisfied for the given
 * path in an object.<br/>
 * Like the other "path functions" you can use integers in the path, even
 * negative ones, to refer to array-like object indexes, but the priority will
 * be given to existing object keys.
 * @example
 * const user = {
 *     name: "John",
 *     performance: {
 *         scores: [1, 5, 10]
 *     }
 * };
 *
 * const gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
 * const hadAGoodStart = _.pathSatisfies(_.isGT(6), "performance.scores.0");
 *
 * gotAnHighScore(user) // => true
 * hadAGoodStart(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.keySatisfies|keySatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */


function pathSatisfies(predicate, path, separator) {
  return function (obj) {
    var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

    return predicate.call(this, pathInfo.target);
  };
}
/**
 * Returns an object containing only the specified properties of the given object.<br/>
 * Non existent properties will be ignored.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.pickIn(user, ["name", "age"]) // => {"name": "john", "age": 30};
 * _.pickIn(user, ["name", "email"]) // => {"name": "john"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIf|pickIf}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} whitelist
 * @returns {Object}
 */


function pickIn(source, whitelist) {
  var result = {};

  for (var i = 0, len = whitelist.length, key; i < len; i++) {
    key = whitelist[i];

    if (has(source, key)) {
      result[key] = source[key];
    }
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.pickIn|pickIn}, expecting a whitelist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.pick(["id", "active"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const select = _.compose(_.mapWith, _.pick);
 * const selectUserInfo = select(["id", "active"]);
 *
 * selectUserInfo(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pickIf|pickIf}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.35.0
 * @param {String[]} whitelist
 * @returns {Function}
 */


var pick = _curry2(pickIn, true);
/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be included in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const pickIfIsString = _.pickIf(_.isType("String"));
 *
 * pickIfIsString(user) // => {name: "john", surname: "doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */


function pickIf(predicate) {
  return function (source) {
    if (isNil(source)) {
      throw _makeTypeErrorFor(source, "object");
    }

    var result = {};

    for (var key in source) {
      if (predicate(source[key], key, source)) {
        result[key] = source[key];
      }
    }

    return result;
  };
}
/**
 * Creates a copy of the given object with its enumerable keys renamed as
 * indicated in the provided lookup table.
 * @example
 * const person = {"firstName": "John", "lastName": "Doe"};
 * const keysMap = {"firstName": "name", "lastName": "surname"};
 *
 * _.renameIn(person, keysMap) // => {"name": "John", "surname": "Doe"}
 *
 * @example <caption>It's safe using it to swap keys:</caption>
 * const keysMap = {"firstName": "lastName", "lastName": "firstName"};
 *
 * _.renameIn(person, keysMap) // => {"lastName": "John", "firstName": "Doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} source
 * @param {Object} keysMap
 * @returns {Object}
 */


function renameIn(source, keysMap) {
  keysMap = Object(keysMap);
  var result = {};
  var oldKeys = enumerables(source);

  for (var prop in keysMap) {
    if (~oldKeys.indexOf(prop)) {
      result[keysMap[prop]] = source[prop];
    }
  }

  for (var i = 0, len = oldKeys.length, key; i < len; i++) {
    key = oldKeys[i];

    if (!(key in keysMap || key in result)) {
      result[key] = source[key];
    }
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.renameIn|renameIn} expecting a
 * <code>keysMap</code> to build a function waiting for the object to act upon.
 * @example
 * const persons = [
 *     {"firstName": "John", "lastName": "Doe"},
 *     {"first_name": "Mario", "last_name": "Rossi"},
 * ];
 * const normalizeKeys = _.rename({
 *     "firstName": "name",
 *     "first_name": "name",
 *     "lastName": "surname",
 *     "last_name": "surname"
 * });
 *
 * _.map(persons, normalizeKeys) // =>
 * // [
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} keysMap
 * @returns {Function}
 */


var rename = _curry2(renameIn, true);
/**
 * Uses the provided function as a <code>keysMap</code> generator and returns
 * a function expecting the object whose keys we want to {@link module:lamb.renameIn|renameIn}.
 * @example
 * const person = {"NAME": "John", "SURNAME": "Doe"};
 * const arrayToLower = _.mapWith(_.invoke("toLowerCase"));
 * const makeLowerKeysMap = function (source) {
 *     const sourceKeys = _.keys(source);
 *
 *     return _.make(sourceKeys, arrayToLower(sourceKeys));
 * };
 * const lowerKeysFor = _.renameWith(makeLowerKeysMap);
 *
 * lowerKeysFor(person) // => {"name": "John", "surname": "doe"};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.rename|rename}
 * @since 0.26.0
 * @param {Function} fn
 * @returns {Function}
 */


function renameWith(fn) {
  return function (source) {
    return renameIn(source, fn(source));
  };
}
/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */


function _setIn(source, key, value) {
  var result = {};

  for (var prop in source) {
    result[prop] = source[prop];
  }

  result[key] = value;
  return result;
}
/**
 * Sets the specified key to the given value in a copy of the provided object.<br/>
 * All the remaining enumerable keys of the source object will be simply copied in the
 * result object without breaking references.<br/>
 * If the specified key is not part of the source object, it will be added to the
 * result.<br/>
 * The main purpose of the function is to work on simple plain objects used as
 * data structures, such as JSON objects, and makes no effort to play nice with
 * objects created from an OOP perspective (it's not worth it).<br/>
 * For example the prototype of the result will be <code>Object</code>'s regardless
 * of the <code>source</code>'s one.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 *
 * _.setIn(user, "name", "Jane") // => {name: "Jane", surname: "Doe", age: 30}
 * _.setIn(user, "gender", "male") // => {name: "John", surname: "Doe", age: 30, gender: "male"}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setKey|setKey}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */


function setIn(source, key, value) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }

  return _setIn(source, key, value);
}
/**
 * Builds a partial application of {@link module:lamb.setIn|setIn} with the provided
 * <code>key</code> and <code>value</code>.<br/>
 * The resulting function expects the object to act upon.<br/>
 * Please refer to {@link module:lamb.setIn|setIn}'s description for explanations about
 * how the copy of the source object is made.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 * const setAgeTo40 = _.setKey("age", 40);
 *
 * setAgeTo40(user) // => {name: "john", surname: "doe", age: 40}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.setIn|setIn}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */


var setKey = _makePartial3(setIn);
/**
 * Accepts a target object and a key name and verifies that the target is an array and that
 * the key is an existing index.
 * @private
 * @param {Object} target
 * @param {String|Number} key
 * @returns {Boolean}
 */


function _isArrayIndex(target, key) {
  var n = +key;
  return Array.isArray(target) && n % 1 === 0 && !(n < 0 && _isEnumerable(target, key));
}
/**
 * Sets the object's property targeted by the given path to the desired value.<br/>
 * Works with arrays and is able to set their indexes, even negative ones.
 * @private
 * @param {Object|Array} obj
 * @param {String[]} parts
 * @param {*} value
 * @returns {Object|Array}
 */


function _setPathIn(obj, parts, value) {
  var key = parts[0];
  var partsLen = parts.length;
  var v;

  if (partsLen === 1) {
    v = value;
  } else {
    var targetKey = _getPathKey(obj, key, false);

    v = _setPathIn(isUndefined(targetKey) ? targetKey : obj[targetKey], slice(parts, 1, partsLen), value);
  }

  return _isArrayIndex(obj, key) ? _setIndex(obj, key, v) : _setIn(obj, key, v);
}
/**
 * Allows to change a nested value in a copy of the provided object.<br/>
 * The function will delegate the "set action" to {@link module:lamb.setIn|setIn} or
 * {@link module:lamb.setAt|setAt} depending on the value encountered in the path,
 * so please refer to the documentation of those functions for specifics about the
 * implementation.<br/>
 * Note anyway that the distinction will be between <code>Array</code>s, delegated
 * to {@link module:lamb.setAt|setAt}, and everything else (including array-like objects),
 * which will be delegated to {@link module:lamb.setIn|setIn}.<br/>
 * As a result of that, array-like objects will be converted to objects having numbers as keys
 * and paths targeting non-object values will be converted to empty objects.<br/>
 * You can anyway target array elements using integers in the path, even negative ones, but
 * the priority will be given to existing, and enumerable, object keys.<br/>
 * Non-enumerable properties encountered in the path will be considered as non-existent properties.<br/>
 * Like {@link module:lamb.getPathIn|getPathIn} or {@link module:lamb.getPath|getPath} you can
 * use custom path separators.
 * @example
 * const user = {id: 1, status: {active : false, scores: [2, 4, 6]}};
 *
 * _.setPathIn(user, "status.active", true) // => {id: 1, status: {active : true, scores: [2, 4, 6]}}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.setPathIn(user, "status.scores.0", 8) // => {id: 1, status: {active : false, scores: [8, 4, 6]}}
 *
 * // you can use negative indexes as well
 * _.setPathIn(user, "status.scores.-1", 8) // => {id: 1, status: {active : false, scores: [2, 4, 8]}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.setPathIn(user, "scores.0.value", 8);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 8, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPath|setPath}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */


function setPathIn(source, path, value, separator) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }

  return _setPathIn(source, _toPathParts(path, separator), value);
}
/**
 * Builds a partial application of {@link module:lamb.setPathIn|setPathIn} expecting the
 * object to act upon.<br/>
 * See {@link module:lamb.setPathIn|setPathIn} for more details and examples.
 * @example
 * const user = {id: 1, status: {active: false}};
 * const activate = _.setPath("status.active", true);
 *
 * activate(user) // => {id: 1, status: {active: true}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPathIn|setPathIn}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */


function setPath(path, value, separator) {
  return function (source) {
    return setPathIn(source, path, value, separator);
  };
}
/**
 * Returns a copy of the source object without the specified properties.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.skipIn(user, ["name", "age"]) // => {surname: "doe"};
 * _.skipIn(user, ["name", "email"]) // => {surname: "doe", age: 30};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} blacklist
 * @returns {Object}
 */


function skipIn(source, blacklist) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "object");
  }

  var result = {};
  var props = make(blacklist, []);

  for (var key in source) {
    if (!(key in props)) {
      result[key] = source[key];
    }
  }

  return result;
}
/**
 * A curried version of {@link module:lamb.skipIn|skipIn}, expecting a blacklist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.skip(["name", "surname"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const discard = _.compose(_.mapWith, _.skip);
 * const discardNames = discard(["name", "surname"]);
 *
 * discardNames(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.35.0
 * @param {String[]} blacklist
 * @returns {Function}
 */


var skip = _curry2(skipIn, true);
/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be omitted in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const skipIfIstring = _.skipIf(_.isType("String"));
 *
 * skipIfIstring(user) // => {age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */


var skipIf = compose(pickIf, not);
/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create an array containing a list
 * of the keys in its first index and the corresponding list of values
 * in the second one.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */

var _tearFrom = _curry2(function (getKeys, obj) {
  return reduce(getKeys(obj), function (result, key) {
    result[0].push(key);
    result[1].push(obj[key]);
    return result;
  }, [[], []]);
});
/**
 * Tears an object apart by transforming it in an array of two lists: one containing
 * its enumerable keys, the other containing the corresponding values.<br/>
 * Although this "tearing apart" may sound as a rather violent process, the source
 * object will be unharmed.
 * @example
 * _.tear({a: 1, b: 2, c: 3}) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tearOwn|tearOwn}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
 */


var tear = _tearFrom(enumerables);
/**
 * Same as {@link module:lamb.tear|tear}, but only the own properties of the object are
 * taken into account.
 * @example <caption>Showing the difference with <code>tear</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.tear(foo) // => [["c", "b", "a"], [3, 2, 1]]
 * _.tearOwn(foo) // => [["c"], [3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tear|tear}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
 */


var tearOwn = _tearFrom(keys);
/**
 * Creates a copy of the given object having the desired key value updated by applying
 * the provided function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIn(user, "name", toUpperCase) // => {name: "JOHN", visits: 2}
 * _.updateIn(user, "surname", toUpperCase) // => {name: "John", visits: 2}
 *
 * @example <caption>Non-enumerable properties will be treated as non-existent:</caption>
 * const user = Object.create({name: "John"}, {visits: {value: 2}});
 *
 * _.updateIn(user, "visits", _.add(1)) // => {name: "John", visits: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updateKey|updateKey}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {Object} source
 * @param {String} key
 * @param {Function} updater
 * @returns {Object}
 */


function updateIn(source, key, updater) {
  return _isEnumerable(source, key) ? _setIn(source, key, updater(source[key])) : _merge(enumerables, source, {});
}
/**
 * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
 * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const incrementVisits = _.updateKey("visits", _.add(1));
 *
 * incrementVisits(user) // => {name: "John", visits: 3}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.updateIn|updateIn}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {String} key
 * @param {Function} updater
 * @returns {Function}
 */


var updateKey = _makePartial3(updateIn);
/**
 * Allows to change a nested value in a copy of the given object by applying the provided
 * function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const inc = _.add(1);
 *
 * _.updatePathIn(user, "status.visits", inc) // => {id: 1, status: {scores: [2, 4, 6]}, visits: 1}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.updatePathIn(user, "status.scores.0", inc) // => {id: 1, status: {scores: [3, 4, 6], visits: 0}}
 *
 * // you can use negative indexes as well
 * _.updatePathIn(user, "status.scores.-1", inc) // => {id: 1, status: {scores: [2, 4, 7], visits: 0}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.updatePathIn(user, "scores.0.value", inc);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 3, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePath|updatePath}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */


function updatePathIn(source, path, updater, separator) {
  var parts = _toPathParts(path, separator);

  var pathInfo = _getPathInfo(source, parts, false);

  if (pathInfo.isValid) {
    return _setPathIn(source, parts, updater(pathInfo.target));
  } else {
    return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source, {});
  }
}
/**
 * Builds a partial application of {@link module:lamb.updatePathIn|updatePathIn}
 * expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const incrementScores = _.updatePath("status.scores", _.mapWith(_.add(1)))
 *
 * incrementScores(user) // => {id: 1, status: {scores: [3, 5, 7], visits: 0}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePathIn|updatePathIn}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Function}
 */


function updatePath(path, updater, separator) {
  return function (source) {
    return updatePathIn(source, path, updater, separator);
  };
}
/**
 * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * _.validate(user1, userCheckers) // => []
 * _.validate(user2, userCheckers) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validateWith|validateWith}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Object} obj
 * @param {Function[]} checkers
 * @returns {Array<Array<String, String[]>>} An array of errors in the form returned by
 * {@link module:lamb.checker|checker}, or an empty array.
 */


function validate(obj, checkers) {
  return reduce(checkers, function (errors, _checker) {
    var result = _checker(obj);

    result.length && errors.push(result);
    return errors;
  }, []);
}
/**
 * A curried version of {@link module:lamb.validate|validate} accepting a list of
 * {@link module:lamb.checker|checkers} and returning a function expecting the object to validate.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 * const validateUser = _.validateWith(userCheckers);
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * validateUser(user1) // => []
 * validateUser(user2) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.validate|validate}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Function[]} checkers
 * @returns {Function}
 */


var validateWith = _curry2(validate, true);
/**
 * Generates an array with the values of the enumerable properties of the given object.<br/>
 * See also {@link module:lamb.ownValues|ownValues} to pick only from the own properties of the object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.values(user) // => ["john", "doe", 30]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownValues|ownValues}
 * @since 0.1.0
 * @param {Object} obj
 * @returns {Array}
 */


var values = _valuesFrom(enumerables);
/**
 * A null-safe function to repeat the source string the desired amount of times.
 * @private
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */


function _repeat(source, times) {
  var result = "";

  for (var i = 0; i < times; i++) {
    result += source;
  }

  return result;
}
/**
 * Builds the prefix or suffix to be used when padding a string.
 * @private
 * @param {String} source
 * @param {String} char
 * @param {Number} len
 * @returns {String}
 */


function _getPadding(source, char, len) {
  if (!isNil(source) && type(source) !== "String") {
    source = String(source);
  }

  return _repeat(String(char)[0] || "", Math.ceil(len - source.length));
}
/**
 * Pads a string to the desired length with the given char starting from the beginning of the string.
 * @example
 * _.padLeft("foo", "-", 0) // => "foo"
 * _.padLeft("foo", "-", -1) // => "foo"
 * _.padLeft("foo", "-", 5) // => "--foo"
 * _.padLeft("foo", "-", 3) // => "foo"
 * _.padLeft("foo", "ab", 7) // => "aaaafoo"
 * _.padLeft("foo", "", 5) // => "foo"
 * _.padLeft("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padRight|padRight}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */


function padLeft(source, char, len) {
  return _getPadding(source, char, len) + source;
}
/**
 * Pads a string to the desired length with the given char starting from the end of the string.
 * @example
 * _.padRight("foo", "-", 0) // => "foo"
 * _.padRight("foo", "-", -1) // => "foo"
 * _.padRight("foo", "-", 5) // => "foo--"
 * _.padRight("foo", "-", 3) // => "foo"
 * _.padRight("foo", "ab", 7) // => "fooaaaa"
 * _.padRight("foo", "", 5) // => "foo"
 * _.padRight("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padLeft|padLeft}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */


function padRight(source, char, len) {
  return source + _getPadding(source, char, len);
}
/**
 * Builds a new string by repeating the source string the desired amount of times.<br/>
 * Note that unlike the current ES6 proposal for
 * [String.prototype.repeat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat},
 * this function doesn't throw a RangeError if <code>times</code> is negative,
 * but returns an empty string instead.
 * @example
 * _.repeat("Hello", -1) // => ""
 * _.repeat("Hello", 1) // => "Hello"
 * _.repeat("Hello", 3) // => "HelloHelloHello"
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */


function repeat(source, times) {
  if (isNil(source)) {
    throw _makeTypeErrorFor(source, "string");
  }

  return _repeat(source, Math.floor(times));
}
/**
 * Splits a string into an array of substrings using the given separator.
 * @example
 * _.split("Jan,Feb,Mar,Apr,May", ",") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 * _.split("Jan, Feb , Mar,Apr,   May", /\s*,\s*‍/) // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.splitBy|splitBy}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String} source
 * @param {String|RegExp} separator
 * @returns {String[]}
 */


var split = binary(generic(String.prototype.split));
/**
 * A curried version of {@link module:lamb.split|split} that accepts
 * a separator and builds a function expecting the string to split.
 * @example
 * const splitByCommma = _.splitBy(",");
 *
 * splitByCommma("Jan,Feb,Mar,Apr,May") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.split|split}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String|RegExp} separator
 * @returns {Function}
 */

var splitBy = _curry2(split, true);
/**
 * A generic version of <code>String.prototype.search</code>
 * @private
 * @function
 * @param {String} s
 * @param {RegExp} pattern
 * @returns {Number}
 */


var _search = generic(String.prototype.search);
/**
 * Builds a predicate expecting a string to test against the given regular expression pattern.
 * @example
 * const hasNumbersOnly = _.testWith(/^\d+$/);
 *
 * hasNumbersOnly("123") // => true
 * hasNumbersOnly("123 Kg") // => false
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {RegExp} pattern
 * @returns {Function}
 */


function testWith(pattern) {
  return function (s) {
    return _search(s, pattern) !== -1;
  };
}
/**
 * Accepts a constructor and builds a predicate expecting an object,
 * which will be tested to verify whether the prototype of the constructor
 * is in its prototype chain.<br/>
 * Wraps in a convenient way the native
 * [instanceof]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof} operator.
 * @example
 * function SomeObjA () {}
 *
 * const a = new SomeObjA();
 * const sObj = new String("foo");
 * const s = "foo";
 *
 * _.isInstanceOf(Object)(a) // => true
 * _.isInstanceOf(SomeObjA)(a) // => true
 *
 * _.isInstanceOf(Object)(sObj) // => true
 * _.isInstanceOf(String)(sObj) // => true
 *
 * _.isInstanceOf(Object)(s) // => false
 * _.isInstanceOf(String)(s) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.47.0
 * @param {*} constructor
 * @returns {Function}
 */


function isInstanceOf(constructor) {
  return function (obj) {
    return obj instanceof constructor;
  };
}
/**
 * Builds a predicate that expects a value to check against the specified type.
 * @example
 * const isString = _.isType("String");
 *
 * isString("Hello") // => true
 * isString(new String("Hi")) // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.type|type}
 * @since 0.1.0
 * @param {String} typeName
 * @returns {Function}
 */


function isType(typeName) {
  return function (value) {
    return type(value) === typeName;
  };
}

var _ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __: __,
    adapter: adapter,
    add: add,
    allOf: allOf,
    always: always,
    anyOf: anyOf,
    append: append,
    appendTo: appendTo,
    application: application,
    apply: apply,
    applyTo: applyTo,
    areSVZ: areSVZ,
    areSame: areSame,
    aritize: aritize,
    asPartial: asPartial,
    binary: binary,
    casus: casus,
    checker: checker,
    clamp: clamp,
    clampWithin: clampWithin,
    collect: collect,
    compose: compose,
    condition: condition,
    contains: contains,
    count: count,
    countBy: countBy,
    curry: curry,
    curryRight: curryRight,
    curryable: curryable,
    curryableRight: curryableRight,
    debounce: debounce,
    deduct: deduct,
    difference: difference,
    divide: divide,
    divideBy: divideBy,
    drop: drop,
    dropFrom: dropFrom,
    dropLastWhile: dropLastWhile,
    dropWhile: dropWhile,
    enumerables: enumerables,
    every: every,
    everyIn: everyIn,
    filter: filter,
    filterWith: filterWith,
    find: find,
    findIndex: findIndex,
    findIndexWhere: findIndexWhere,
    findLast: findLast,
    findLastIndex: findLastIndex,
    findLastIndexWhere: findLastIndexWhere,
    findLastWhere: findLastWhere,
    findWhere: findWhere,
    flatMap: flatMap,
    flatMapWith: flatMapWith,
    flatten: flatten,
    flip: flip,
    forEach: forEach,
    fromPairs: fromPairs,
    generate: generate,
    generic: generic,
    getArgAt: getArgAt,
    getAt: getAt,
    getIn: getIn,
    getIndex: getIndex,
    getKey: getKey,
    getPath: getPath,
    getPathIn: getPathIn,
    group: group,
    groupBy: groupBy,
    gt: gt,
    gte: gte,
    has: has,
    hasKey: hasKey,
    hasKeyValue: hasKeyValue,
    hasOwn: hasOwn,
    hasOwnKey: hasOwnKey,
    hasPathValue: hasPathValue,
    head: head,
    identity: identity,
    index: index,
    indexBy: indexBy,
    init: init,
    insert: insert,
    insertAt: insertAt,
    intersection: intersection,
    invoke: invoke,
    invokeOn: invokeOn,
    is: is,
    isFinite: isFinite_,
    isGT: isGT,
    isGTE: isGTE,
    isIn: isIn,
    isInstanceOf: isInstanceOf,
    isInteger: isInteger,
    isLT: isLT,
    isLTE: isLTE,
    isNil: isNil,
    isNull: isNull,
    isSVZ: isSVZ,
    isSafeInteger: isSafeInteger,
    isType: isType,
    isUndefined: isUndefined,
    join: join,
    joinWith: joinWith,
    keySatisfies: keySatisfies,
    keys: keys,
    last: last,
    list: list,
    lt: lt,
    lte: lte,
    make: make,
    map: map,
    mapArgs: mapArgs,
    mapValues: mapValues,
    mapValuesWith: mapValuesWith,
    mapWith: mapWith,
    merge: merge,
    mergeOwn: mergeOwn,
    modulo: modulo,
    multiply: multiply,
    multiplyBy: multiplyBy,
    not: not,
    ownPairs: ownPairs,
    ownValues: ownValues,
    padLeft: padLeft,
    padRight: padRight,
    pairs: pairs,
    partial: partial,
    partialRight: partialRight,
    partition: partition,
    partitionWith: partitionWith,
    pathExists: pathExists,
    pathExistsIn: pathExistsIn,
    pathSatisfies: pathSatisfies,
    pick: pick,
    pickIf: pickIf,
    pickIn: pickIn,
    pipe: pipe,
    pluck: pluck,
    pluckFrom: pluckFrom,
    pull: pull,
    pullFrom: pullFrom,
    randomInt: randomInt,
    range: range,
    reduce: reduce,
    reduceRight: reduceRight,
    reduceRightWith: reduceRightWith,
    reduceWith: reduceWith,
    remainder: remainder,
    rename: rename,
    renameIn: renameIn,
    renameWith: renameWith,
    repeat: repeat,
    reverse: reverse,
    rotate: rotate,
    rotateBy: rotateBy,
    setAt: setAt,
    setIn: setIn,
    setIndex: setIndex,
    setKey: setKey,
    setPath: setPath,
    setPathIn: setPathIn,
    shallowFlatten: shallowFlatten,
    skip: skip,
    skipIf: skipIf,
    skipIn: skipIn,
    slice: slice,
    sliceAt: sliceAt,
    some: some,
    someIn: someIn,
    sort: sort,
    sortWith: sortWith,
    sortedInsert: sortedInsert,
    sorter: sorter,
    sorterDesc: sorterDesc,
    split: split,
    splitBy: splitBy,
    subtract: subtract,
    sum: sum,
    tail: tail,
    take: take,
    takeFrom: takeFrom,
    takeLastWhile: takeLastWhile,
    takeWhile: takeWhile,
    tapArgs: tapArgs,
    tear: tear,
    tearOwn: tearOwn,
    testWith: testWith,
    throttle: throttle,
    transpose: transpose,
    type: type,
    unary: unary,
    union: union,
    unionBy: unionBy,
    uniques: uniques,
    uniquesBy: uniquesBy,
    unless: unless,
    updateAt: updateAt,
    updateIn: updateIn,
    updateIndex: updateIndex,
    updateKey: updateKey,
    updatePath: updatePath,
    updatePathIn: updatePathIn,
    validate: validate,
    validateWith: validateWith,
    values: values,
    when: when,
    zip: zip,
    zipWithIndex: zipWithIndex
});

/**
* @module @svizzle/utils/any-boolean
*/
/**
 * Return true is the input is an array
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isArray([])
true
> isArray([1, 2])
true
> isArray({a: 1})
false
> isArray('foo')
false

> function returnArgs () {
	return arguments;
}
> isArray(returnArgs())
false
 *
 * @version 0.1.0
 */

var isArray = isType('Array');
/**
 * Return true is the input is a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNumber(1)
true
> isNumber(NaN)
true
> isNumber(Infinity)
true
> isNumber({a: 1})
false
> isNumber('foo')
false

> function returnArgs () {
	return arguments;
}
> isNumber(returnArgs())
false
 *
 * @version 0.1.0
 */

var isNumber = isType('Number');
/**
 * Return true is the input is not a NaN.
 * Remember that {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior|isNaN coerces the input with Number()} to the output can be a bit surprising.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNaN(1)
true
> isNotNaN(Infinity)
true
> isNotNaN([123])
true
> isNotNaN('123')
true
> isNotNaN(true)
true
> isNotNaN(false)
true
> isNotNaN(null)
true
> isNotNaN([1, 2])
false
> isNotNaN({a: 1})
false
> isNotNaN('123px')
false
> isNotNaN('foo')
false
> isNotNaN(undefined)
false
> isNotNaN(NaN)
false

> function returnArgs () {
	return arguments;
}
> isNotNaN(returnArgs())
false
 *
 * @version 0.1.0
 */

var isNotNaN = not(isNaN);
/**
 * Return true is the input is a valid number (including not being NaN)
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	1,
	1.2,
	Infinity,
].forEach(x => {
	isValidNumber(x)
});
[true, ...]

> [
	[],
	[123],
	[1, 2],
	{a: 1},
	'',
	'123',
	'123px',
	'foo',
	true,
	null,
	undefined,
	NaN,
	returnArgs()
].forEach(x => {
	isValidNumber(x)
});
[false, ...]
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isValidNumberWith|isValidNumberWith}
 */

var isValidNumber = allOf([isNumber, isNotNaN]);
/**
 * Return true if the input, converted to Number, is indeed a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[],
	[2],
	'',
	'123',
	null,
	true,
].forEach(x => {
	toNumberisValidNumber(x)
});
[true, ...]

> [
	{a: 1},
	[1, 2],
	'123px',
	'foo',
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toNumberisValidNumber(x)
});
[false, ...]
 * @version 0.1.0
 */

var toNumberisValidNumber = pipe([Number, isValidNumber]);
/**
 * Return true if the input, parsed to float, is a valid number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[1],
	[1, 2],
	[1, 2, 3],
	'123',
	'123px',
].forEach(x => {
	toFloatIsValidNumber(x)
});
[true, ...]

> [
	[],
	'',
	'foo',
	{a: 1},
	true,
	null,
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toFloatIsValidNumber(x)
});
[false, ...]
 * @version 0.1.0
 */

var toFloatIsValidNumber = pipe([parseFloat, isValidNumber]);
/**
 * Return true is the input is not undefined or null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNil(1)
true
> isNotNil(Infinity)
true
> isNotNil('123')
true
> isNotNil('123px')
true
> isNotNil([1, 2])
true
> isNotNil({a: 1})
true
> isNotNil(true)
true
> isNotNil(false)
true
> isNotNil(NaN)
true

> isNotNil(undefined)
false
> isNotNil(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNil(returnArgs())
false
 *
 * @version 0.2.0
 */

var isNotNil = not(isNil);
/**
 * Return true is the input is not null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNull(1)
true
> isNotNull(Infinity)
true
> isNotNull('123')
true
> isNotNull('123px')
true
> isNotNull([1, 2])
true
> isNotNull({a: 1})
true
> isNotNull(true)
true
> isNotNull(false)
true
> isNotNull(NaN)
true
> isNotNull(undefined)
true

> isNotNull(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNull(returnArgs())
true
 *
 * @version 0.4.0
 */

var isNotNull = not(isNull);

/**
* @module @svizzle/utils/array_proto-array
*/
/**
 * Return an array by concatenating the provided arrays
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.prototype.concat},
 {@link module:@svizzle/utils/object-array.concatValues|concatValues},
 {@link module:@svizzle/utils/array-[object-array].pickAndConcatValues|pickAndConcatValues},
 {@link module:@svizzle/utils/object-object.mergeWithConcat|mergeWithConcat}
 *
 * @function
 * @arg {...array} array
 * @return {array}
 *
 * @example
> concat([0, 1, 2], [3, 4], [5, 6])
[0, 1, 2, 3, 4, 5, 6]
 *
 * @version 0.1.0
 */

var concat = generic(Array.prototype.concat);

/**
 * Return a function expecting an object and returning an index of all its values using the provided accessor.
 * Use this if you're sure that applying the accessor on the object values returns unique strings.
 * Note that this works by concatenating all values before indexing hence you can also directly index values being arrays (see the second example).
 *
 * @function
 * @arg {function} accessor - Any -> Any
 * @return {function} - Object -> Object
 *
 * @example
> reindexedByX = indexValuesWith(obj => obj.x)

> // single values
> obj1 = {
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}
> reindexedByX(obj1)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}

> // values as arrays
> obj2 = {
  a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
  b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
}
> reindexedByX(obj2)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
};
 *
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].groupValuesWith|groupValuesWith}
 */

var indexValuesWith = function indexValuesWith(accessor) {
  return pipe([values, apply(concat), indexBy(accessor)]);
};

/**
* @module @svizzle/utils/constructor-[[any-any]:accumcb-[array-any]]
*/
/**
 * Return a function expecting a reducer function and returning a reduce function
 * with an instance of the provided constructor as the initial value
 * and expecting the array to reduce.
 *
 * @function
 * @arg {object} constructor
 * @return {function} - (Any -> Any):accumcb -> (Array -> Any)
 *
 * @example
> reduceFromEmptyObject = reduceTo(Object)
> foo = reduceFromEmptyObject((acc, x) => {
	acc[x.id] = x.name;
	return acc;
})
> foo([{id: '00', name: 'a'}, {id: '11', name: 'b'}])
Object { 11: 'b', 00: 'a' }
 *
 * @version 0.3.0
 */

var reduceTo = function reduceTo(ctor) {
  return function (fn) {
    return reduceWith(fn, new ctor());
  };
};

/**
* @module @svizzle/utils/[any-any]:accumcb-[array-any]
*/
/**
 * Return a reduce function expecting an array to reduce with the passed reducer
 * with an empty array as the initial value
 *
 * @function
 * @arg {function} function - reducer
 * @return {function} - Array -> Any
 *
 * @example
> reduce = reduceFromEmptyArray((acc, x) => {
  return acc.slice(-2).concat([x.value]);
})
> reduce([
  {a: 1, value: 2},
  {a: 1, value: 3},
  {a: 1, value: 0},
  {a: 1, value: 4},
  {a: 1, value: 7}
])
[0, 4, 7]
 *
 * @version 0.3.0
 */

var reduceFromEmptyArray = reduceTo(Array);

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
 * @version 0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#pluckKey
 */

var pluckKeys = function pluckKeys(keys) {
  return mapWith(pick(keys));
};

/**
* @module @svizzle/utils/number-boolean
*/
/**
 * Return `true` if the input number is 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is0(0)
true
> is0(2)
false
 *
 * @version 0.1.0
 */

var is0 = is(0);
/**
 * Return `true` if the input number is 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is1(1)
true
> is1(2)
false
 *
 * @version 0.1.0
 */

var is1 = is(1);
/**
 * Return `true` if the input number is greater than 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT0(-1)
false
> isGT0(2)
true
 *
 * @version 0.1.0
 */

var isGT0 = isGT(0);
/**
 * Return `true` if the input number is greater than 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT1(0)
false
> isGT1(2)
true
 *
 * @version 0.1.0
 */

var isGT1 = isGT(1);

/**
* @module @svizzle/utils/iterable-number
*/
/**
 * Get the length of the iterable
 *
 * @function
 * @arg {iterable} iterable
 * @return {number}
 *
 * @example
> getLength('a')
1
> getLength('two')
3
> getLength([10])
1
> getLength([3, 7])
2
> function func () {
	return getLength(arguments);
}
> func()
0
> func()
0
> func('a', 'b')
2
 *
 * @version 0.1.0
 */

var getLength = getKey('length');

/**
* @module @svizzle/utils/iterable-boolean
*/
/**
 * Use to check if an iterable is empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableEmpty('string')
false
> isIterableEmpty('')
true
> isIterableEmpty([1, 2])
false
> isIterableEmpty([])
true
> isIterableEmpty([])
true
> function func () {
	return isIterableEmpty(arguments);
}
> func()
true
> func(1, 2)
false
 *
 * @version 0.1.0
 */

var isIterableEmpty = pipe([getLength, is0]);
/**
 * Use to check if an iterable is not empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableNotEmpty('string')
true
> isIterableNotEmpty('')
false
> isIterableNotEmpty([1, 2])
true
> isIterableNotEmpty([])
false
> function func () {
	return isIterableNotEmpty(arguments);
}
> func()
false
> func(1, 2)
true
 *
 * @version 0.1.0
 */

var isIterableNotEmpty = pipe([getLength, isGT0]);
/**
 * Use to check if an iterable has a single element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> hasIterableLength1('1')
true
> hasIterableLength1('two')
false
> hasIterableLength1([1])
true
> hasIterableLength1([1, 2])
false
> function func () {
	return hasIterableLength1(arguments);
}
> func()
false
> func(1)
true
> func(1, 2)
false
 *
 * @version 0.1.0
 */

var hasIterableLength1 = pipe([getLength, is1]);
/**
 * Use to check if an iterable has more than an element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableLongerThan1('1')
false
> isIterableLongerThan1('two')
true
> isIterableLongerThan1([1])
false
> isIterableLongerThan1([1, 2])
true
> function func () {
	return isIterableLongerThan1(arguments);
}
> func()
false
> func(1)
false
> func(1, 2)
true
 *
 * @version 0.1.0
 */

var isIterableLongerThan1 = pipe([getLength, isGT1]);

/**
* @module @svizzle/utils/iterable-object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {object}
 *
 * @example
> function func () {
	return pairToKeyValueObject(arguments);
}
> func()
{key: undefined, value: undefined}
> func(1)
{key: 1, value: undefined}
> func(1, 2)
{key: 1, value: 2}
> func(1, 2, 3)
{key: 1, value: 2}
> pairToKeyValueObject([])
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject([1])
{key: 1, value: undefined}
> pairToKeyValueObject([1, 2])
{key: 1, value: 2}
> pairToKeyValueObject([1, 2, 3])
{key: 1, value: 2}
> pairToKeyValueObject('')
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject('a')
{key: 'a', value: 'undefined'}
> pairToKeyValueObject('ab')
{key: 'a', value: 'b'}
> pairToKeyValueObject('abc')
{key: 'a', value: 'b'}
 *
 * @version 0.1.0
 */
var pairToKeyValueObject = function pairToKeyValueObject(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  return {
    key: key,
    value: value
  };
};

/**
* @module @svizzle/utils/number-[number-number]
*/

/**
 * Return a function that rounds the input number to the provided number of digits.
 * @see https://github.com/d3/d3-path/issues/10#issuecomment-262577521
 *
 * @function
 * @arg {number} precision - Must be an integer
 * @return {function} - Number -> Number
 *
 * @example
> roundTo2 = roundTo(2)
> roundTo2(2.41285)
2.41
> roundTo2(2.41785)
2.42
 * @version 0.6.0
 */
var roundTo = function roundTo(precision) {
  return function (x) {
    return Number(x.toFixed(precision));
  };
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the correspondent values of the provided object .
 * Can be useful with [d3.csvParse]{@link https://github.com/d3/d3-dsv#csvParse}, see the example below.
 * Since 0.6.0 it assumes identity for missing keys.
 *
 * @function
 * @arg {object} fnMap - object with functions as values
 * @return {function} - Object -> Object
 *
 * @example
> conversionFn = transformValues({
	name: _.identity,
	a: _.pipe([Number, Math.sqrt]),
	b: Number,
	width: parseFloat
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: 2, width: 10}

$ cat baseurl/file.csv
name,a,b,width
foo,9,2,10px
bar,4,4,25px

> d3.csvParse('baseurl/file.csv', conversionFn)
[{name: 'foo', a: 3, b: 2, width: 10}, {name: 'bar', a: 2, b: 4, width: 25}]

> conversionFn = transformValues({
	a: _.pipe([Number, Math.sqrt]),
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: '2', width: '10px'}
 *
 * @version 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 */

var transformValues = function transformValues(fnMap) {
  return mapValuesWith(function (value, key) {
    return key in fnMap ? application(fnMap[key], [value]) : value;
  });
};
/**
 * Return a function expecting an object to merge with the input object
 *
 * @function
 * @arg {object} object - Object to be merged to the provided object
 * @return {function} - Object -> Object
 *
 * @example
> mergeB = mergeObj({b: 2})
> mergeB({a: 1})
{a: 1, b: 2}
> mergeB({a: 1, b: 1})
{a: 1, b: 2}
 *
 * @version 0.1.0
 */

var mergeObj = function mergeObj(obj) {
  return partial(merge, [__, obj]);
};

/**
* @module @svizzle/utils/object-object
*/
/**
 * Return a copy of the object without falsy values
 *
 * @function
 * @arg {object} object - The input object
 * @return {object} object - The object with truthy values
 *
 * @example
> pickIfTruthy({a: true, b: true, c: false})
{a: true, b: true}
> pickIfTruthy({a: 1, b: 0, c: false})
{a: 1}
> pickIfTruthy({a: [1, 2], b: {a: 1}, c: false})
{a: [1, 2], b: {a: 1}}
 *
 * @version 0.2.0
 */

var pickIfTruthy = pickIf(identity);
/**
 * Return an object with swapped keys and values.
 * Note that if there are duplicate values, since the keys of the resulting object have to be unique, the last occurrence of each value would be used but depending on the interpreter implementation the output keys might vary.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
// unique values
> swapKeyValue({a: 1, b: 2, c: 'd'})
{1: 'a', 2: 'b', d: 'c'}

// duplicate values
> swapKeyValue({a: 1, b: 2, c: 'd', e: 1})
{2: 'b', d: 'c', 1: 'e'}
 *
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].indexValuesWith|indexValuesWith}
 */

var swapKeyValue = pipe([pairs, mapWith(reverse), fromPairs]);

/**
 * Concatenate the values of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> concatValues({a: [1, 2, 3], b: [4, 5, 6]})
[1, 2, 3, 4, 5, 6]
 *
 * @version 0.4.0
 */

var concatValues = pipe([values, apply(concat)]);
/**
 * Return an array of the permutations of the provided object values items, by key.
 * Note that this function assumes the provided object values are arrays.
 *
 * @function
 * @arg {object} object - {string: any[]}
 * @return {array} - object[]
 *
 * @example
> makeKeyedValuesPermutations({a: [0, 1], b: [2, 3], c: [4, 5]})
[
	{a: 0, b: 2, c: 4}, {a: 1, b: 2, c: 4},
	{a: 0, b: 3, c: 4}, {a: 1, b: 3, c: 4},
	{a: 0, b: 2, c: 5}, {a: 1, b: 2, c: 5},
	{a: 0, b: 3, c: 5}, {a: 1, b: 3, c: 5}
]
 *
 * @version 0.6.0
 */

var makeKeyedValuesPermutations = pipe([pairs, filterWith(pipe([last, allOf([isArray, isIterableNotEmpty])])), reduceFromEmptyArray(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      values = _ref2[1];

  var props = values.map(function (value) {
    return _defineProperty({}, key, value);
  });
  return acc.length === 0 ? props : flatMap(props, function (prop) {
    return acc.map(function (obj) {
      return merge(obj, prop);
    });
  });
})]);
/**
 * Return an array of {key, value} objects from an object
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> obj = {k1: 'v1', k2: 'v2'}
> objectToKeyValueArray(obj)
[{key: 'k1', value: 'v1'}, {key: 'k2', value: 'v2'}]
 *
 * @version 0.1.0
 */

var objectToKeyValueArray = pipe([pairs, mapWith(pairToKeyValueObject)]);
/**
 * Return the keys of the provided object with a truthy value
 *
 * @function
 * @arg {object} object - The input object
 * @return {array} - The keys correspondent to truthy values
 *
 * @example
> getTruthyValuesKeys({a: true, b: true, c: false})
['a', 'b']
> getTruthyValuesKeys({a: 1, b: 0, c: false})
['a']
> getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false})
['a', 'b']
 *
 * @version 0.1.0
 */

var getTruthyValuesKeys = pipe([pickIfTruthy, keys]);

function ascending (a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector (compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    },
    right: function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);
function ticks (start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));

    while (++i < n) {
      ticks[i] = (start + i) * step;
    }
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));

    while (++i < n) {
      ticks[i] = (start - i) / step;
    }
  }

  if (reverse) ticks.reverse();
  return ticks;
}
function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;

    case 1:
      this.range(domain);
      break;

    default:
      this.range(range).domain(domain);
      break;
  }

  return this;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var implicit = Symbol("implicit");
function ordinal() {
  var index = new Map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "",
        i = index.get(key);

    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }

    return range[(i - 1) % range.length];
  }

  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();

    var _iterator = _createForOfIteratorHelper(_),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;
        var key = value + "";
        if (index.has(key)) continue;
        index.set(key, domain.push(value));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return scale;
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function () {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);
  return scale;
}

function define (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) {
    prototype[key] = definition[key];
  }

  return prototype;
}

function Color() {}
var _darker = 0.7;

var _brighter = 1 / _darker;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
define(Color, color, {
  copy: function copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  displayable: function displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function formatHsl() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

function constant (x) {
  return function () {
    return x;
  };
}

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

var rgb$1 = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;
  return rgb$1;
})(1);

function numberArray (a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function (t) {
    for (i = 0; i < n; ++i) {
      c[i] = a[i] * (1 - t) + b[i] * t;
    }

    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) {
    x[i] = interpolate(a[i], b[i]);
  }

  for (; i < nb; ++i) {
    c[i] = b[i];
  }

  return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }

    return c;
  };
}

function date (a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber (a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}

function object (a, b) {
  var i = {},
      c = {},
      k;
  if (a === null || _typeof(a) !== "object") a = {};
  if (b === null || _typeof(b) !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) {
      c[k] = i[k](t);
    }

    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

function string (a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators
  // Coerce inputs to strings.

  a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: interpolateNumber(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) {
      s[(o = q[i]).i] = o.x(t);
    }

    return s.join("");
  });
}

function interpolate (a, b) {
  var t = _typeof(b),
      c;

  return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb$1) : string : b instanceof color ? rgb$1 : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}

function interpolateRound (a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function constant$1 (x) {
  return function () {
    return x;
  };
}

function number (x) {
  return +x;
}

var unit = [0, 1];
function identity$1(x) {
  return x;
}

function normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : constant$1(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
} // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


function bimap(domain, range, interpolate) {
  var d0 = domain[0],
      d1 = domain[1],
      r0 = range[0],
      r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function (x) {
    return r0(d0(x));
  };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1; // Reverse descending domains.

  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function (x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$1,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function (_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
  };

  scale.interpolate = function (_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity$1, identity$1);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function formatDecimal (x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

  var i,
      coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}

function exponent (x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
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
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded (x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function _(x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function b(x) {
    return Math.round(x).toString(2);
  },
  "c": function c(x) {
    return x + "";
  },
  "d": function d(x) {
    return Math.round(x).toString(10);
  },
  "e": function e(x, p) {
    return x.toExponential(p);
  },
  "f": function f(x, p) {
    return x.toFixed(p);
  },
  "g": function g(x, p) {
    return x.toPrecision(p);
  },
  "o": function o(x) {
    return Math.round(x).toString(8);
  },
  "p": function p(x, _p) {
    return formatRounded(x * 100, _p);
  },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function X(x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function x(_x) {
    return Math.round(_x).toString(16);
  }
};

function identity$2 (x) {
  return x;
}

var map$1 = Array.prototype.map,
    prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale (locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map$1.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map$1.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
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
        type = specifier.type; // The "n" type is an alias for ",g".

    if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.

    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?

    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
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
        value = +value; // Determine the sign. -0 is not less than 0, but 1 / -0 is!

        var valueNegative = value < 0 || 1 / value < 0; // Perform the initial formatting.

        value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

        if (trim) value = formatTrim(value); // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.

        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false; // Compute the prefix and suffix.

        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
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
      } // If the fill character is not "0", grouping is applied before padding.


      if (comma && !zero) value = group(value, Infinity); // Compute the padding.

      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

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
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed (step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix (step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound (step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat (start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);

  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }

    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }

    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }

  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function (count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}
function linear$1() {
  var scale = continuous();

  scale.copy = function () {
    return copy(scale, linear$1());
  };

  initRange.apply(scale, arguments);
  return linearish(scale);
}

var countryKeyValuePositive = [{
  key: 'AL',
  value: 112
}, {
  key: 'AD',
  value: 234
}, {
  key: 'AM',
  value: 36
}, {
  key: 'AT',
  value: 357
}, {
  key: 'AZ',
  value: 123
}, {
  key: 'BY',
  value: 56
}, {
  key: 'BE',
  value: 15
}, {
  key: 'BA',
  value: 12
}, {
  key: 'BG',
  value: 568
}, {
  key: 'HR',
  value: 213
}, {
  key: 'CY',
  value: 456
}, {
  key: 'CZ',
  value: 21
}, {
  key: 'DK',
  value: 345
}, {
  key: 'EE',
  value: 37
}, {
  key: 'FI',
  value: 376
}, {
  key: 'FR',
  value: 346
}, {
  key: 'GE',
  value: 17
}, {
  key: 'DE',
  value: 567
}, {
  key: 'GR',
  value: 47
}, {
  key: 'HU',
  value: 23
}, {
  key: 'IS',
  value: 578
}, {
  key: 'IE',
  value: 24
}, {
  key: 'IT',
  value: 6
}, {
  key: 'KZ',
  value: 5
}, {
  key: 'LV',
  value: 58
}, {
  key: 'LI',
  value: 5
}, {
  key: 'LT',
  value: 69
}, {
  key: 'LU',
  value: 23
}, {
  key: 'MT',
  value: 36
}, {
  key: 'MD',
  value: 57
}, {
  key: 'MC',
  value: 69
}, {
  key: 'ME',
  value: 223
}, {
  key: 'NL',
  value: 35
}, {
  key: 'MK',
  value: 57
}, {
  key: 'NO',
  value: 79
}, {
  key: 'PL',
  value: 12
}, {
  key: 'PT',
  value: 46
}, {
  key: 'RO',
  value: 37
}, {
  key: 'RU',
  value: 678
}, {
  key: 'SM',
  value: 345
}, {
  key: 'RS',
  value: 67
}, {
  key: 'SK',
  value: 23
}, {
  key: 'SI',
  value: 567
}, {
  key: 'ES',
  value: 23
}, {
  key: 'SE',
  value: 768
}, {
  key: 'CH',
  value: 56
}, {
  key: 'TR',
  value: 78
}, {
  key: 'UA',
  value: 2
}, {
  key: 'GB',
  value: 56
}].sort(function (a, b) {
  return b.value - a.value;
});
var countryKeyValueNegatives = [{
  key: 'AL',
  value: -112
}, {
  key: 'AD',
  value: -234
}, {
  key: 'AM',
  value: -36
}, {
  key: 'AT',
  value: -357
}, {
  key: 'AZ',
  value: -123
}, {
  key: 'BY',
  value: -56
}, {
  key: 'BE',
  value: -15
}, {
  key: 'BA',
  value: -12
}, {
  key: 'BG',
  value: -568
}, {
  key: 'HR',
  value: -213
}, {
  key: 'CY',
  value: -456
}, {
  key: 'CZ',
  value: -21
}, {
  key: 'DK',
  value: -345
}, {
  key: 'EE',
  value: -37
}, {
  key: 'FI',
  value: -376
}, {
  key: 'FR',
  value: -346
}, {
  key: 'GE',
  value: -17
}, {
  key: 'DE',
  value: -567
}, {
  key: 'GR',
  value: -47
}, {
  key: 'HU',
  value: -23
}, {
  key: 'IS',
  value: -578
}, {
  key: 'IE',
  value: -24
}, {
  key: 'IT',
  value: -6
}, {
  key: 'KZ',
  value: -5
}, {
  key: 'LV',
  value: -58
}, {
  key: 'LI',
  value: -5
}, {
  key: 'LT',
  value: -69
}, {
  key: 'LU',
  value: -23
}, {
  key: 'MT',
  value: -36
}, {
  key: 'MD',
  value: -57
}, {
  key: 'MC',
  value: -69
}, {
  key: 'ME',
  value: -223
}, {
  key: 'NL',
  value: -35
}, {
  key: 'MK',
  value: -57
}, {
  key: 'NO',
  value: -79
}, {
  key: 'PL',
  value: -12
}, {
  key: 'PT',
  value: -46
}, {
  key: 'RO',
  value: -37
}, {
  key: 'RU',
  value: -678
}, {
  key: 'SM',
  value: -345
}, {
  key: 'RS',
  value: -67
}, {
  key: 'SK',
  value: -23
}, {
  key: 'SI',
  value: -567
}, {
  key: 'ES',
  value: -23
}, {
  key: 'SE',
  value: -768
}, {
  key: 'CH',
  value: -56
}, {
  key: 'TR',
  value: -78
}, {
  key: 'UA',
  value: -2
}, {
  key: 'GB',
  value: -56
}].sort(function (a, b) {
  return a.value - b.value;
});
var countryKeyValueMixed = [{
  key: 'AL',
  value: 112
}, {
  key: 'AD',
  value: -234
}, {
  key: 'AM',
  value: 36
}, {
  key: 'AT',
  value: 357
}, {
  key: 'AZ',
  value: -123
}, {
  key: 'BY',
  value: 56
}, {
  key: 'BE',
  value: 15
}, {
  key: 'BA',
  value: -12
}, {
  key: 'BG',
  value: 568
}, {
  key: 'HR',
  value: -213
}, {
  key: 'CY',
  value: 456
}, {
  key: 'CZ',
  value: 21
}, {
  key: 'DK',
  value: -345
}, {
  key: 'EE',
  value: 37
}, {
  key: 'FI',
  value: 376
}, {
  key: 'FR',
  value: 346
}, {
  key: 'GE',
  value: 17
}, {
  key: 'DE',
  value: 567
}, {
  key: 'GR',
  value: 47
}, {
  key: 'HU',
  value: -23
}, {
  key: 'IS',
  value: 578
}, {
  key: 'IE',
  value: 24
}, {
  key: 'IT',
  value: 6
}, {
  key: 'KZ',
  value: 5
}, {
  key: 'LV',
  value: -58
}, {
  key: 'LI',
  value: 5
}, {
  key: 'LT',
  value: 69
}, {
  key: 'LU',
  value: 23
}, {
  key: 'MT',
  value: 36
}, {
  key: 'MD',
  value: -57
}, {
  key: 'MC',
  value: 69
}, {
  key: 'ME',
  value: 223
}, {
  key: 'NL',
  value: 35
}, {
  key: 'MK',
  value: -57
}, {
  key: 'NO',
  value: 79
}, {
  key: 'PL',
  value: 12
}, {
  key: 'PT',
  value: -46
}, {
  key: 'RO',
  value: 37
}, {
  key: 'RU',
  value: 678
}, {
  key: 'SM',
  value: -345
}, {
  key: 'RS',
  value: 67
}, {
  key: 'SK',
  value: 23
}, {
  key: 'SI',
  value: 567
}, {
  key: 'ES',
  value: 23
}, {
  key: 'SE',
  value: 768
}, {
  key: 'CH',
  value: 56
}, {
  key: 'TR',
  value: 78
}, {
  key: 'UA',
  value: 2
}, {
  key: 'GB',
  value: 56
}].sort(function (a, b) {
  return b.value - a.value;
});
var countryKeyValueAlt = [{
  key: 'AL',
  value: 113
}, {
  key: 'AD',
  value: 193
}, {
  key: 'AM',
  value: 66
}, {
  key: 'AT',
  value: 923
}, {
  key: 'AZ',
  value: 8
}, {
  key: 'BY',
  value: 122
}, {
  key: 'BE',
  value: 6
}, {
  key: 'BA',
  value: 29
}, {
  key: 'BG',
  value: 272
}, {
  key: 'HR',
  value: 300
}, {
  key: 'CY',
  value: 585
}, {
  key: 'CZ',
  value: 31
}, {
  key: 'DK',
  value: 406
}, {
  key: 'EE',
  value: 46
}, {
  key: 'FI',
  value: 1097
}, {
  key: 'FR',
  value: 611
}, {
  key: 'GE',
  value: 48
}, {
  key: 'DE',
  value: 30
}, {
  key: 'GR',
  value: 37
}, {
  key: 'HU',
  value: 11
}, {
  key: 'IS',
  value: 432
}, {
  key: 'IE',
  value: 52
}, {
  key: 'IT',
  value: 11
}, {
  key: 'KZ',
  value: 12
}, {
  key: 'LV',
  value: 128
}, {
  key: 'LI',
  value: 2
}, {
  key: 'LT',
  value: 129
}, {
  key: 'LU',
  value: 26
}, {
  key: 'MT',
  value: 61
}, {
  key: 'MD',
  value: 18
}, {
  key: 'MC',
  value: 84
}, {
  key: 'ME',
  value: 188
}, {
  key: 'NL',
  value: 18
}, {
  key: 'MK',
  value: 100
}, {
  key: 'NO',
  value: 50
}, {
  key: 'PL',
  value: 32
}, {
  key: 'PT',
  value: 89
}, {
  key: 'RO',
  value: 31
}, {
  key: 'RU',
  value: 303
}, {
  key: 'SM',
  value: 907
}, {
  key: 'RS',
  value: 113
}, {
  key: 'SK',
  value: 48
}, {
  key: 'SI',
  value: 1272
}, {
  key: 'ES',
  value: 6
}, {
  key: 'SE',
  value: 291
}, {
  key: 'CH',
  value: 16
}, {
  key: 'TR',
  value: 16
}, {
  key: 'UA',
  value: 1
} // { key: 'GB', value: 92 }
];
var countryKeyRawValue = [{
  key: 'AL',
  rawValue: 112
}, {
  key: 'AD',
  rawValue: 234
}, {
  key: 'AM',
  rawValue: 36
}, {
  key: 'AT',
  rawValue: 357
}, {
  key: 'AZ',
  rawValue: 123
}, {
  key: 'BY',
  rawValue: 56
}, {
  key: 'BE',
  rawValue: 15
}, {
  key: 'BA',
  rawValue: 12
}, {
  key: 'BG',
  rawValue: 568
}, {
  key: 'HR',
  rawValue: 213
}, {
  key: 'CY',
  rawValue: 456
}, {
  key: 'CZ',
  rawValue: 21
}, {
  key: 'DK',
  rawValue: 345
}, {
  key: 'EE',
  rawValue: 37
}, {
  key: 'FI',
  rawValue: 376
}, {
  key: 'FR',
  rawValue: 346
}, {
  key: 'GE',
  rawValue: 17
}, {
  key: 'DE',
  rawValue: 567
}, {
  key: 'GR',
  rawValue: 47
}, {
  key: 'HU',
  rawValue: 23
}, {
  key: 'IS',
  rawValue: 578
}, {
  key: 'IE',
  rawValue: 24
}, {
  key: 'IT',
  rawValue: 6
}, {
  key: 'KZ',
  rawValue: 5
}, {
  key: 'LV',
  rawValue: 58
}, {
  key: 'LI',
  rawValue: 5
}, {
  key: 'LT',
  rawValue: 69
}, {
  key: 'LU',
  rawValue: 23
}, {
  key: 'MT',
  rawValue: 36
}, {
  key: 'MD',
  rawValue: 57
}, {
  key: 'MC',
  rawValue: 69
}, {
  key: 'ME',
  rawValue: 223
}, {
  key: 'NL',
  rawValue: 35
}, {
  key: 'MK',
  rawValue: 57
}, {
  key: 'NO',
  rawValue: 79
}, {
  key: 'PL',
  rawValue: 12
}, {
  key: 'PT',
  rawValue: 46
}, {
  key: 'RO',
  rawValue: 37
}, {
  key: 'RU',
  rawValue: 678
}, {
  key: 'SM',
  rawValue: 345
}, {
  key: 'RS',
  rawValue: 67
}, {
  key: 'SK',
  rawValue: 23
}, {
  key: 'SI',
  rawValue: 567
}, {
  key: 'ES',
  rawValue: 23
}, {
  key: 'SE',
  rawValue: 768
}, {
  key: 'CH',
  rawValue: 56
}, {
  key: 'TR',
  rawValue: 78
}, {
  key: 'UA',
  rawValue: 2
}, {
  key: 'GB',
  rawValue: 56
}];
var keyToColorWorldFull = {
  AL: 'antiquewhite',
  AD: 'aqua',
  AM: 'blue',
  AT: 'blueviolet',
  AZ: 'chartreuse',
  BY: 'rgb(255, 69, 0)',
  BE: 'brown',
  BA: 'aquamarine',
  BG: 'rgb(128, 128, 0)',
  HR: 'cadetblue',
  CY: 'deepskyblue',
  CZ: 'gold',
  DK: 'chocolate',
  EE: 'cornflowerblue',
  FI: 'dimgray',
  FR: 'firebrick',
  GE: 'rgb( 65, 105, 225)',
  DE: 'greenyellow',
  GR: 'darkgoldenrod',
  HU: 'darkmagenta',
  IS: 'dodgerblue',
  IE: 'crimson',
  IT: 'darkcyan',
  KZ: 'darkblue',
  LV: 'darkturquoise',
  LI: 'coral',
  LT: 'darkkhaki',
  LU: 'lightsalmon',
  MT: 'darkorchid',
  MD: 'darkolivegreen',
  MC: 'darkslategray',
  ME: 'darkslateblue',
  NL: 'rgb(216, 191, 216)',
  MK: 'tomato',
  NO: 'darksalmon',
  PL: 'rgb(238, 130, 238)',
  PT: 'darkred',
  RO: 'red',
  RU: 'green',
  SM: 'rgb(188, 143, 143)',
  RS: 'darkorange',
  SK: 'rgb( 0, 0, 128)',
  SI: 'darkseagreen',
  ES: 'lightblue',
  SE: 'mediumseagreen',
  CH: 'rgb(255, 255, 0)',
  TR: 'yellowgreen',
  UA: 'rgb(152, 251, 152)',
  GB: 'rgb(128, 0, 128)'
}; // keep these 2 commented for the `keyToColorWorld` example to show 2 black bars.

var keyToColorWorld = skipIn(keyToColorWorldFull, ['AL', 'AD']);
var keyToColorWorldShort = {
  AM: 'blue',
  AT: 'blueviolet',
  AZ: 'chartreuse',
  BY: 'rgb(255, 69, 0)',
  BE: 'brown',
  BA: 'aquamarine',
  BG: 'rgb(128, 128, 0)'
};

var keyToColorWorldFullKeys = keys(keyToColorWorldFull);

var hueScale = linear$1().domain([0, keyToColorWorldFullKeys.length]).range([0, 300]);
var keyToColorWorldFn = ordinal().domain(keyToColorWorldFullKeys).range(keyToColorWorldFullKeys.map(function (k, i) {
  return hsl(hueScale(i), 0.5, 0.5).toString();
}));
var keyToColorUK2016 = {
  UK: 'cornsilk',
  UKC: 'antiquewhite',
  UKC1: 'aqua',
  UKC11: 'aquamarine',
  UKC12: 'azure',
  UKC13: 'beige',
  UKC14: 'bisque',
  UKC2: 'black',
  UKC21: 'blanchedalmond',
  UKC22: 'blue',
  UKC23: 'blueviolet',
  UKD: 'brown',
  UKD1: 'burlywood',
  UKD11: 'cadetblue',
  UKD12: 'chartreuse',
  UKD3: 'chocolate',
  UKD33: 'coral',
  UKD34: 'cornflowerblue',
  UKD35: 'cornsilk',
  UKD36: 'crimson',
  UKD37: 'cyan',
  UKD4: 'darkblue',
  UKD41: 'darkcyan',
  UKD42: 'darkgoldenrod',
  UKD44: 'darkgray',
  UKD45: 'darkgreen',
  UKD46: 'darkgrey',
  UKD47: 'darkkhaki',
  UKD6: 'darkmagenta',
  UKD61: 'darkolivegreen',
  UKD62: 'darkorange',
  UKD63: 'darkorchid',
  UKD7: 'darkred',
  UKD71: 'darksalmon',
  UKD72: 'darkseagreen',
  UKD73: 'darkslateblue',
  UKD74: 'darkslategray',
  UKE: 'darkslategrey',
  UKE1: 'darkturquoise',
  UKE11: 'darkviolet',
  UKE12: 'deeppink',
  UKE13: 'deepskyblue',
  UKE2: 'dimgray',
  UKE21: 'dimgrey',
  UKE22: 'dodgerblue',
  UKE3: 'firebrick',
  UKE31: 'floralwhite',
  UKE32: 'forestgreen',
  UKE4: 'fuchsia',
  UKE41: 'gainsboro',
  UKE42: 'ghostwhite',
  UKE44: 'gold',
  UKE45: 'goldenrod',
  UKF: 'gray',
  UKF1: 'grey',
  UKF11: 'green',
  UKF12: 'greenyellow',
  UKF13: 'honeydew',
  UKF14: 'hotpink',
  UKF15: 'indianred',
  UKF16: 'indigo',
  UKF2: 'ivory',
  UKF21: 'khaki',
  UKF22: 'lavender',
  UKF24: 'lavenderblush',
  UKF25: 'lawngreen',
  UKF3: 'lemonchiffon',
  UKF30: 'lightblue',
  UKG: 'lightcoral',
  UKG1: 'lightcyan',
  UKG11: 'lightgoldenrodyellow',
  UKG12: 'lightgray',
  UKG13: 'lightgreen',
  UKG2: 'lightgrey',
  UKG21: 'lightpink',
  UKG22: 'lightsalmon',
  UKG23: 'lightseagreen',
  UKG24: 'lightskyblue',
  UKG3: 'lightslategray',
  UKG31: 'lightslategrey',
  UKG32: 'lightsteelblue',
  UKG33: 'lightyellow',
  UKG36: 'lime',
  UKG37: 'limegreen',
  UKG38: 'linen',
  UKG39: 'magenta',
  UKH: 'maroon',
  UKH1: 'mediumaquamarine',
  UKH11: 'mediumblue',
  UKH12: 'mediumorchid',
  UKH14: 'mediumpurple',
  UKH15: 'mediumseagreen',
  UKH16: 'mediumslateblue',
  UKH17: 'mediumspringgreen',
  UKH2: 'mediumturquoise',
  UKH21: 'mediumvioletred',
  UKH23: 'midnightblue',
  UKH24: 'mintcream',
  UKH25: 'mistyrose',
  UKH3: 'moccasin',
  UKH31: 'navajowhite',
  UKH32: 'navy',
  UKH34: 'oldlace',
  UKH35: 'olive',
  UKH36: 'olivedrab',
  UKH37: 'orange',
  UKI: 'orangered',
  UKI3: 'orchid',
  UKI31: 'palegoldenrod',
  UKI32: 'palegreen',
  UKI33: 'paleturquoise',
  UKI34: 'palevioletred',
  UKI4: 'papayawhip',
  UKI41: 'peachpuff',
  UKI42: 'peru',
  UKI43: 'pink',
  UKI44: 'plum',
  UKI45: 'powderblue',
  UKI5: 'purple',
  UKI51: 'red',
  UKI52: 'rosybrown',
  UKI53: 'royalblue',
  UKI54: 'saddlebrown',
  UKI6: 'salmon',
  UKI61: 'sandybrown',
  UKI62: 'seagreen',
  UKI63: 'seashell',
  UKI7: 'sienna',
  UKI71: 'silver',
  UKI72: 'skyblue',
  UKI73: 'slateblue',
  UKI74: 'slategray',
  UKI75: 'slategrey',
  UKJ: 'snow',
  UKJ1: 'springgreen',
  UKJ11: 'steelblue',
  UKJ12: 'tan',
  UKJ13: 'teal',
  UKJ14: 'thistle',
  UKJ2: 'tomato',
  UKJ21: 'turquoise',
  UKJ22: 'violet',
  UKJ25: 'wheat',
  UKJ26: 'white',
  UKJ27: 'whitesmoke',
  UKJ28: 'yellow',
  UKJ3: 'yellowgreen',
  UKJ31: 'aliceblue',
  UKJ32: 'antiquewhite',
  UKJ34: 'aqua',
  UKJ35: 'aquamarine',
  UKJ36: 'azure',
  UKJ37: 'beige',
  UKJ4: 'bisque',
  UKJ41: 'black',
  UKJ43: 'blanchedalmond',
  UKJ44: 'blue',
  UKJ45: 'blueviolet',
  UKJ46: 'brown',
  UKK: 'burlywood',
  UKK1: 'cadetblue',
  UKK11: 'chartreuse',
  UKK12: 'chocolate',
  UKK13: 'coral',
  UKK14: 'cornflowerblue',
  UKK15: 'cornsilk',
  UKK2: 'crimson',
  UKK21: 'cyan',
  UKK22: 'darkblue',
  UKK23: 'darkcyan',
  UKK3: 'darkgoldenrod',
  UKK30: 'darkgray',
  UKK4: 'darkgreen',
  UKK41: 'darkgrey',
  UKK42: 'darkkhaki',
  UKK43: 'darkmagenta',
  UKL: 'darkolivegreen',
  UKL1: 'darkorange',
  UKL11: 'darkorchid',
  UKL12: 'darkred',
  UKL13: 'darksalmon',
  UKL14: 'darkseagreen',
  UKL15: 'darkslateblue',
  UKL16: 'darkslategray',
  UKL17: 'darkslategrey',
  UKL18: 'darkturquoise',
  UKL2: 'darkviolet',
  UKL21: 'deeppink',
  UKL22: 'deepskyblue',
  UKL23: 'dimgray',
  UKL24: 'dimgrey',
  UKM: 'dodgerblue',
  UKM5: 'firebrick',
  UKM50: 'floralwhite',
  UKM6: 'forestgreen',
  UKM61: 'fuchsia',
  UKM62: 'gainsboro',
  UKM63: 'ghostwhite',
  UKM64: 'gold',
  UKM65: 'goldenrod',
  UKM66: 'gray',
  UKM7: 'grey',
  UKM71: 'green',
  UKM72: 'greenyellow',
  UKM73: 'honeydew',
  UKM75: 'hotpink',
  UKM76: 'indianred',
  UKM77: 'indigo',
  UKM78: 'ivory',
  UKM8: 'khaki',
  UKM81: 'lavender',
  UKM82: 'lavenderblush',
  UKM83: 'lawngreen',
  UKM84: 'lemonchiffon',
  UKM9: 'lightblue',
  UKM91: 'lightcoral',
  UKM92: 'lightcyan',
  UKM93: 'lightgoldenrodyellow',
  UKM94: 'lightgray',
  UKM95: 'lightgreen',
  UKN: 'lightgrey',
  UKN0: 'lightpink',
  UKN06: 'lightsalmon',
  UKN07: 'lightseagreen',
  UKN08: 'lightskyblue',
  UKN09: 'lightslategray',
  UKN10: 'lightslategrey',
  UKN11: 'lightsteelblue',
  UKN12: 'lightyellow',
  UKN13: 'lime',
  UKN14: 'limegreen',
  UKN15: 'linen',
  UKN16: 'magenta'
};
var keyToLabel = {
  AL: 'Albania',
  AD: 'Andorra',
  AM: 'Armenia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BY: 'Belarus',
  BE: 'Belgium',
  BA: 'Bosnia and Herzegovina',
  BG: 'Bulgaria',
  HR: 'Croatia',
  CY: 'Cyprus',
  CZ: 'Czechia',
  DK: 'Denmark',
  EE: 'Estonia',
  FI: 'Finland',
  FR: 'France',
  GE: 'Georgia',
  DE: 'Germany',
  GR: 'Greece',
  HU: 'Hungary',
  IS: 'Iceland',
  IE: 'Ireland',
  IT: 'Italy',
  KZ: 'Kazakhstan',
  LV: 'Latvia',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MT: 'Malta',
  MD: 'Moldova',
  MC: 'Monaco',
  ME: 'Montenegro',
  NL: 'Netherlands',
  MK: 'North Macedonia (formerly Macedonia)',
  NO: 'Norway',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  RU: 'Russian Federation',
  SM: 'San Marino',
  RS: 'Serbia',
  SK: 'Slovakia',
  SI: 'Slovenia',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  TR: 'Turkey',
  UA: 'Ukraine',
  GB: 'United Kingdom (UK)'
};

var formatSvelteMarkup = function formatSvelteMarkup(str) {
  return str.trim().replace(/^\t{4}/gm, '').replace(/^\t/gm, '  ');
};
var formatExamples = mapWith(transformValues({
  doc: mapWith(transformValues({
    content: function content(s) {
      return s.trim();
    }
  })),
  data: mapWith(transformValues({
    usage: formatSvelteMarkup
  }))
}));

var axisColor = 'red';
var backgroundColor = 'antiquewhite';
var barDefaultColor = 'orange';
var barHeight = 12;
var fontSize = 22;
var textColor = 'green';
var title = 'My title';
var barchart = formatExamples([{
  data: [{
    key: 'All positive values',
    props: {
      items: countryKeyValuePositive
    },
    usage: "\n\t\t\t\t<BarchartV {items} />\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      items: countryKeyValueNegatives
    },
    usage: "\n\t\t\t\t<BarchartV {items} />\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      items: countryKeyValueMixed
    },
    usage: "\n\t\t\t\t<BarchartV {items} />\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'In the most basic setup, you need to provide a `{items}` array of objects with the shape `{key: string, props: number}`.'
  }, {
    tag: 'p',
    content: 'Note that if there are both positive and negative values the chart will show a vertical axis, `grey` by default.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv',
  title: 'Basic props'
}, {
  data: [{
    key: null,
    props: {
      items: countryKeyValuePositive,
      title: title
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\ttitle='".concat(title, "'\n\t\t\t\t/>\n\t\t\t")
  }],
  doc: [{
    tag: 'p',
    content: 'Providing a `{title}` shows the barchart with an `h2` header.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-title',
  title: 'Title'
}, {
  data: [{
    key: 'All positive values',
    props: {
      barHeight: barHeight,
      items: countryKeyValuePositive,
      theme: {
        axisColor: axisColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        hoverColor: 'palegreen',
        textColor: textColor
      },
      title: 'Hover me!'
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tbarHeight = ".concat(barHeight, "\n\t\t\t\t\ttheme={{\n\t\t\t\t\t\taxisColor: '").concat(axisColor, "',\n\t\t\t\t\t\tbackgroundColor: '").concat(backgroundColor, "',\n\t\t\t\t\t\tfontSize: ").concat(fontSize, ",\n\t\t\t\t\t\thoverColor: 'palegreen',\n\t\t\t\t\t\ttextColor: '").concat(textColor, "',\n\t\t\t\t\t}}\n\t\t\t\t/>\n\t\t\t")
  }, {
    key: 'All negative values',
    props: {
      barHeight: barHeight,
      items: countryKeyValueNegatives,
      theme: {
        axisColor: axisColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        textColor: textColor
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tbarHeight = ".concat(barHeight, "\n\t\t\t\t\ttheme={{\n\t\t\t\t\t\taxisColor: '").concat(axisColor, "',\n\t\t\t\t\t\tbackgroundColor: '").concat(backgroundColor, "',\n\t\t\t\t\t\tfontSize: ").concat(fontSize, ",\n\t\t\t\t\t\ttextColor: '").concat(textColor, "'\n\t\t\t\t\t}}\n\t\t\t\t/>\n\t\t\t")
  }, {
    key: 'Mixed values',
    props: {
      barHeight: barHeight,
      items: countryKeyValueMixed,
      theme: {
        axisColor: axisColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        textColor: textColor
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tbarHeight = ".concat(barHeight, "\n\t\t\t\t\ttheme={{\n\t\t\t\t\t\taxisColor: '").concat(axisColor, "',\n\t\t\t\t\t\tbackgroundColor: '").concat(backgroundColor, "',\n\t\t\t\t\t\tfontSize: ").concat(fontSize, ",\n\t\t\t\t\t\ttextColor: '").concat(textColor, "'\n\t\t\t\t\t}}\n\t\t\t\t/>\n\t\t\t")
  }],
  doc: [{
    tag: 'p',
    content: 'You can setup a `backgroundColor` and the `textColor`.'
  }, {
    tag: 'p',
    content: '`barHeight` and `fontSize` contribute to determine the distance between bars.'
  }, {
    tag: 'p',
    content: 'You can configure the axis color using the `axisColor` props (used in case there are values of both signs).'
  }, {
    tag: 'p',
    content: 'You can choose the hovered bar background color by providing `hoverColor`.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-styles',
  title: 'Styles'
}, {
  data: [{
    key: 'All positive values',
    props: {
      items: countryKeyValuePositive,
      keyToColor: keyToColorWorldShort,
      theme: {
        barDefaultColor: barDefaultColor
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t\ttheme={{barDefaultColor:'".concat(barDefaultColor, "'}}\n\t\t\t\t/>\n\t\t\t")
  }, {
    key: 'All negative values',
    props: {
      items: countryKeyValueNegatives,
      keyToColor: keyToColorWorldShort,
      theme: {
        barDefaultColor: barDefaultColor
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t\ttheme={{barDefaultColor:'".concat(barDefaultColor, "'}}\n\t\t\t\t/>\n\t\t\t")
  }, {
    key: 'Mixed values',
    props: {
      items: countryKeyValueMixed,
      keyToColor: keyToColorWorldShort,
      theme: {
        barDefaultColor: barDefaultColor
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t\ttheme={{barDefaultColor:'".concat(barDefaultColor, "'}}\n\t\t\t\t/>\n\t\t\t")
  }],
  doc: [{
    tag: 'p',
    content: 'You can provide a `barDefaultColor` to be used for bars with no correspondent key in `keyToColor`.'
  }, {
    tag: 'p',
    content: 'If not provided, `barDefaultColor` is `null`, which renders `black`.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-barDefaultColor',
  title: 'Default bars color'
}, {
  data: [{
    key: 'All positive values',
    props: {
      items: countryKeyValuePositive,
      keyToColor: keyToColorWorld
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      items: countryKeyValueNegatives,
      keyToColor: keyToColorWorld
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      items: countryKeyValueMixed,
      keyToColor: keyToColorWorld
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToColor}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'By providing `keyToColor`, an object mapping bar key -> bar color, you can assign bars color.'
  }, {
    tag: 'p',
    content: 'Notice that the default color for keys not in `keyToColor` is set by `barDefaultColor` (black if not provided, see `AL` and `AD`).'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-keyToColor',
  title: 'Bars color (via mapping)'
}, {
  data: [{
    key: 'All positive values',
    props: {
      items: countryKeyValuePositive,
      keyToColorFn: keyToColorWorldFn
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{keyToColorFn}\n\t\t\t\t\t{items}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      items: countryKeyValueNegatives,
      keyToColorFn: keyToColorWorldFn
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{keyToColorFn}\n\t\t\t\t\t{items}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      items: countryKeyValueMixed,
      keyToColorFn: keyToColorWorldFn
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{keyToColorFn}\n\t\t\t\t\t{items}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'Instead of passing `keyToColor` you can pass a function `keyToColorFn`.'
  }, {
    tag: 'p',
    content: 'Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence.'
  }, {
    tag: 'p',
    content: 'Also note that if the value returned by `keyToColorFn` is falsy the fallback is `barDefaultColor` (which falls back to `black` if `barDefaultColor` is not provided).'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-keyToColorFn',
  title: 'Bars color (via function)'
}, {
  data: [{
    key: 'A focused key (no scroll)',
    props: {
      focusedKey: 'CY',
      items: countryKeyValueMixed,
      theme: {
        focusedKeyColor: 'yellow'
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tfocusedKey='CY'\n\t\t\t\t\ttheme={{focusedKeyColor: 'yellow'}}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Another focused key',
    props: {
      focusedKey: 'BG',
      items: countryKeyValueMixed,
      shouldScrollToFocusedKey: true,
      theme: {
        focusedKeyColor: 'yellow'
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tfocusedKey='CY'\n\t\t\t\t\tshouldScrollToFocusedKey={true}\n\t\t\t\t\ttheme={{focusedKeyColor: 'yellow'}}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Another focused key',
    props: {
      focusedKey: 'PL',
      items: countryKeyValueMixed,
      shouldScrollToFocusedKey: true,
      theme: {
        focusedKeyColor: 'yellow'
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tfocusedKey='PL'\n\t\t\t\t\tshouldScrollToFocusedKey={true}\n\t\t\t\t\ttheme={{focusedKeyColor: 'yellow'}}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'No focused key (should not scroll)',
    props: {
      items: countryKeyValueMixed,
      shouldScrollToFocusedKey: true,
      theme: {
        focusedKeyColor: 'yellow'
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tshouldScrollToFocusedKey={true}\n\t\t\t\t\ttheme={{focusedKeyColor: 'yellow'}}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'You can set the focused bar by providing its key.'
  }, {
    tag: 'p',
    content: 'This is useful when we select the chosen key in another part of the application and we want to provide a way to see what bar correspond to the current selection.'
  }, {
    tag: 'p',
    content: 'You can set the focused bar background color by providing its `focusedKeyColor`.'
  }, {
    tag: 'p',
    content: 'By passing `shouldScrollToFocusedKey` to `true` you can set chart to always scroll to the focused key, if any.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-focusedKey',
  title: 'Focused key'
}, {
  data: [{
    key: 'All positive values',
    props: {
      keyToLabel: keyToLabel,
      items: countryKeyValuePositive
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToLabel}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      keyToLabel: keyToLabel,
      items: countryKeyValueNegatives
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToLabel}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      keyToLabel: keyToLabel,
      items: countryKeyValueMixed
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\t{keyToLabel}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'By providing a object mapping bar key -> bar label, you can control how the bar are labeled.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-keyToLabel',
  title: 'Labels (via mapping)'
}, {
  data: [{
    key: null,
    props: {
      items: countryKeyValuePositive,
      keyToLabelFn: function keyToLabelFn(x) {
        return "--".concat(x, "--");
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tkeyToLabelFn={x => '--' + x + '--'}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-keyToLabelFn',
  title: 'Labels (via function)'
}, {
  data: [{
    key: 'All positive values',
    props: {
      isInteractive: true,
      items: countryKeyValuePositive,
      title: 'Hover and click me'
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tisInteractive={true}\n\t\t\t\t\ton:clicked={onClicked}\n\t\t\t\t\ton:entered={onEntered}\n\t\t\t\t\ton:exited={onExited}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      isInteractive: true,
      items: countryKeyValueNegatives,
      title: 'Hover and click me'
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tisInteractive={true}\n\t\t\t\t\ton:clicked={onClicked}\n\t\t\t\t\ton:entered={onEntered}\n\t\t\t\t\ton:exited={onExited}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      isInteractive: true,
      items: countryKeyValueMixed,
      title: 'Hover and click me'
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tisInteractive={true}\n\t\t\t\t\ton:clicked={onClicked}\n\t\t\t\t\ton:entered={onEntered}\n\t\t\t\t\ton:exited={onExited}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'If `true`, the component emits events when interacting with the bars.'
  }, {
    tag: 'p',
    content: 'The payload is an object `{id: key}` (`key` being the key of the bar we interacted with)'
  }, {
    tag: 'p',
    content: "• Clicking on a bar dispatches a `clicked` event: `dispatch('clicked', {id: key})`."
  }, {
    tag: 'p',
    content: "• Mouse-entering a bar dispatches a `entered` event: `dispatch('entered', {id: key})`."
  }, {
    tag: 'p',
    content: "• Mouse-exiting a bar dispatches a `exited` event: `dispatch('exited', {id: key})`."
  }, {
    tag: 'p',
    content: 'Please hover and click the bars of this barchart to read the correspondent event payload below.'
  }],
  events: ['entered', 'exited', 'clicked'],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-interactivity',
  title: 'Interactivity'
}, {
  data: [{
    key: null,
    props: {
      items: countryKeyRawValue,
      valueAccessor: function valueAccessor(item) {
        return Number(Math.sqrt(item.rawValue).toFixed(3));
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tvalueAccessor={item => Number((item.rawValue / 25.3).toFixed(3))}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'By default we assume that `items` has the shape `{key, value}`.'
  }, {
    tag: 'p',
    content: 'By providing a `valueAccessor` function we can derive the bar value from `items` with different shapes.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-valueAccessor',
  title: 'Values accessor'
}, {
  data: [{
    key: 'All positive values',
    props: {
      items: countryKeyValuePositive,
      formatFn: function formatFn(x) {
        return "".concat(x, "%");
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tformatFn={x => x + '%'}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'All negative values',
    props: {
      items: countryKeyValueNegatives,
      formatFn: function formatFn(x) {
        return "".concat(x, "%");
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tformatFn={x => x + '%'}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'Mixed values',
    props: {
      items: countryKeyValueMixed,
      formatFn: function formatFn(x) {
        return "".concat(x, "%");
      }
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tformatFn={x => x + '%'}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'You can provide a `formatFn` function to turn the `value` in the desired string.'
  }, {
    tag: 'p',
    content: 'A way to use this would be to pass a function derived from `d3-format`.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-formatFn',
  title: 'Values format'
}, {
  data: [{
    key: 'countryKeyValuePositive',
    props: {
      shouldResetScroll: false,
      items: countryKeyValuePositive,
      title: "When updated, scroll doesn't reset"
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tshouldResetScroll={false}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'countryKeyValueAlt',
    props: {
      shouldResetScroll: false,
      items: countryKeyValueAlt,
      title: "When updated, scroll doesn't reset"
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tshouldResetScroll={false}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll.'
  }, {
    tag: 'p',
    content: 'In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-no-shouldResetScroll',
  title: 'Scroll reset (disabled)'
}, {
  data: [{
    key: 'countryKeyValuePositive',
    props: {
      shouldResetScroll: true,
      items: countryKeyValuePositive,
      title: "When updated, scroll resets"
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tshouldResetScroll={true}\n\t\t\t\t/>\n\t\t\t"
  }, {
    key: 'countryKeyValueAlt',
    props: {
      shouldResetScroll: true,
      items: countryKeyValueAlt,
      title: "When updated, scroll resets"
    },
    usage: "\n\t\t\t\t<BarchartV\n\t\t\t\t\t{items}\n\t\t\t\t\tshouldResetScroll={true}\n\t\t\t\t/>\n\t\t\t"
  }],
  doc: [{
    tag: 'p',
    content: 'If `shouldResetScroll` is set to `true`, updating the `items` prop will reset the scroll.'
  }, {
    tag: 'p',
    content: 'In this example, scrolling the barchart and then updating props using the buttons below should reset the scroll.'
  }],
  name: 'BarchartVDiv',
  packageName: 'barchart',
  slug: 'BarchartVDiv-shouldResetScroll',
  title: 'Scroll reset (enabled)'
}]);

var type$1 = "Topology";
var objects = {
	countries: {
		type: "GeometryCollection",
		geometries: [
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							0
						]
					],
					[
						[
							1
						]
					]
				],
				id: "242",
				properties: {
					iso_a2: "FJ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10
					]
				],
				id: "834",
				properties: {
					iso_a2: "TZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						11,
						12,
						13,
						14
					]
				],
				id: "732",
				properties: {
					iso_a2: "EH"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							15,
							16,
							17,
							18
						]
					],
					[
						[
							19
						]
					],
					[
						[
							20
						]
					],
					[
						[
							21
						]
					],
					[
						[
							22
						]
					],
					[
						[
							23
						]
					],
					[
						[
							24
						]
					],
					[
						[
							25
						]
					],
					[
						[
							26
						]
					],
					[
						[
							27
						]
					],
					[
						[
							28
						]
					],
					[
						[
							29
						]
					],
					[
						[
							30
						]
					],
					[
						[
							31
						]
					],
					[
						[
							32
						]
					],
					[
						[
							33
						]
					],
					[
						[
							34
						]
					],
					[
						[
							35
						]
					],
					[
						[
							36
						]
					],
					[
						[
							37
						]
					],
					[
						[
							38
						]
					],
					[
						[
							39
						]
					],
					[
						[
							40
						]
					],
					[
						[
							41
						]
					],
					[
						[
							42
						]
					],
					[
						[
							43
						]
					],
					[
						[
							44
						]
					],
					[
						[
							45
						]
					],
					[
						[
							46
						]
					],
					[
						[
							47
						]
					]
				],
				id: "124",
				properties: {
					iso_a2: "CA"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-19,
							48,
							49,
							50
						]
					],
					[
						[
							51
						]
					],
					[
						[
							52
						]
					],
					[
						[
							53
						]
					],
					[
						[
							54
						]
					],
					[
						[
							55
						]
					],
					[
						[
							56
						]
					],
					[
						[
							57
						]
					],
					[
						[
							-17,
							58
						]
					],
					[
						[
							59
						]
					]
				],
				id: "840",
				properties: {
					iso_a2: "US"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						60,
						61,
						62,
						63,
						64,
						65
					]
				],
				id: "398",
				properties: {
					iso_a2: "KZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-63,
						66,
						67,
						68,
						69
					]
				],
				id: "860",
				properties: {
					iso_a2: "UZ"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							70,
							71
						]
					],
					[
						[
							72
						]
					],
					[
						[
							73
						]
					],
					[
						[
							74
						]
					]
				],
				id: "598",
				properties: {
					iso_a2: "PG"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-72,
							75
						]
					],
					[
						[
							76,
							77
						]
					],
					[
						[
							78
						]
					],
					[
						[
							79,
							80
						]
					],
					[
						[
							81
						]
					],
					[
						[
							82
						]
					],
					[
						[
							83
						]
					],
					[
						[
							84
						]
					],
					[
						[
							85
						]
					],
					[
						[
							86
						]
					],
					[
						[
							87
						]
					],
					[
						[
							88
						]
					],
					[
						[
							89
						]
					]
				],
				id: "360",
				properties: {
					iso_a2: "ID"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							90,
							91
						]
					],
					[
						[
							92,
							93,
							94,
							95,
							96,
							97
						]
					]
				],
				id: "032",
				properties: {
					iso_a2: "AR"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-92,
							98
						]
					],
					[
						[
							99,
							-95,
							100,
							101
						]
					]
				],
				id: "152",
				properties: {
					iso_a2: "CL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-8,
						102,
						103,
						104,
						105,
						106,
						107,
						108,
						109,
						110,
						111
					]
				],
				id: "180",
				properties: {
					iso_a2: "CD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						112,
						113,
						114,
						115
					]
				],
				id: "706",
				properties: {
					iso_a2: "SO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-3,
						116,
						117,
						118,
						-113,
						119
					]
				],
				id: "404",
				properties: {
					iso_a2: "KE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						120,
						121,
						122,
						123,
						124,
						125,
						126,
						127
					]
				],
				id: "729",
				properties: {
					iso_a2: "SD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-122,
						128,
						129,
						130,
						131
					]
				],
				id: "148",
				properties: {
					iso_a2: "TD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						132,
						133
					]
				],
				id: "332",
				properties: {
					iso_a2: "HT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-133,
						134
					]
				],
				id: "214",
				properties: {
					iso_a2: "DO"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							135
						]
					],
					[
						[
							136
						]
					],
					[
						[
							137
						]
					],
					[
						[
							138
						]
					],
					[
						[
							139
						]
					],
					[
						[
							140
						]
					],
					[
						[
							141,
							142,
							143
						]
					],
					[
						[
							144
						]
					],
					[
						[
							145
						]
					],
					[
						[
							146,
							147,
							148,
							149,
							-66,
							150,
							151,
							152,
							153,
							154,
							155,
							156,
							157,
							158,
							159,
							160,
							161
						]
					],
					[
						[
							162
						]
					],
					[
						[
							163,
							164
						]
					]
				],
				id: "643",
				properties: {
					iso_a2: "RU"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							165
						]
					],
					[
						[
							166
						]
					],
					[
						[
							167
						]
					]
				],
				id: "044",
				properties: {
					iso_a2: "BS"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						168
					]
				],
				id: "238",
				properties: {
					iso_a2: "FK"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							169
						]
					],
					[
						[
							-161,
							170,
							171,
							172
						]
					],
					[
						[
							173
						]
					],
					[
						[
							174
						]
					]
				],
				id: "578",
				properties: {
					iso_a2: "NO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						175
					]
				],
				id: "304",
				properties: {
					iso_a2: "GL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						176
					]
				],
				id: "260",
				properties: {
					iso_a2: "TF"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						177,
						-77
					]
				],
				id: "626",
				properties: {
					iso_a2: "TL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						178,
						179,
						180,
						181,
						182,
						183,
						184
					],
					[
						185
					]
				],
				id: "710",
				properties: {
					iso_a2: "ZA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-186
					]
				],
				id: "426",
				properties: {
					iso_a2: "LS"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-50,
						186,
						187,
						188,
						189
					]
				],
				id: "484",
				properties: {
					iso_a2: "MX"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						190,
						191,
						-93
					]
				],
				id: "858",
				properties: {
					iso_a2: "UY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-191,
						-98,
						192,
						193,
						194,
						195,
						196,
						197,
						198,
						199,
						200
					]
				],
				id: "076",
				properties: {
					iso_a2: "BR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-194,
						201,
						-96,
						-100,
						202
					]
				],
				id: "068",
				properties: {
					iso_a2: "BO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-195,
						-203,
						-102,
						203,
						204,
						205
					]
				],
				id: "604",
				properties: {
					iso_a2: "PE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-196,
						-206,
						206,
						207,
						208,
						209,
						210
					]
				],
				id: "170",
				properties: {
					iso_a2: "CO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-209,
						211,
						212,
						213
					]
				],
				id: "591",
				properties: {
					iso_a2: "PA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-213,
						214,
						215,
						216
					]
				],
				id: "188",
				properties: {
					iso_a2: "CR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-216,
						217,
						218,
						219
					]
				],
				id: "558",
				properties: {
					iso_a2: "NI"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-219,
						220,
						221,
						222,
						223
					]
				],
				id: "340",
				properties: {
					iso_a2: "HN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-222,
						224,
						225
					]
				],
				id: "222",
				properties: {
					iso_a2: "SV"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-189,
						226,
						227,
						-223,
						-226,
						228
					]
				],
				id: "320",
				properties: {
					iso_a2: "GT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-188,
						229,
						-227
					]
				],
				id: "084",
				properties: {
					iso_a2: "BZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-197,
						-211,
						230,
						231
					]
				],
				id: "862",
				properties: {
					iso_a2: "VE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-198,
						-232,
						232,
						233
					]
				],
				id: "328",
				properties: {
					iso_a2: "GY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-199,
						-234,
						234,
						235
					]
				],
				id: "740",
				properties: {
					iso_a2: "SR"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-200,
							-236,
							236
						]
					],
					[
						[
							237,
							238,
							239,
							240,
							241,
							242,
							243,
							244
						]
					],
					[
						[
							245
						]
					]
				],
				id: "250",
				properties: {
					iso_a2: "FR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-205,
						246,
						-207
					]
				],
				id: "218",
				properties: {
					iso_a2: "EC"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						247
					]
				],
				id: "630",
				properties: {
					iso_a2: "PR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						248
					]
				],
				id: "388",
				properties: {
					iso_a2: "JM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						249
					]
				],
				id: "192",
				properties: {
					iso_a2: "CU"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-181,
						250,
						251,
						252
					]
				],
				id: "716",
				properties: {
					iso_a2: "ZW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-180,
						253,
						254,
						-251
					]
				],
				id: "072",
				properties: {
					iso_a2: "BW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-179,
						255,
						256,
						257,
						-254
					]
				],
				id: "516",
				properties: {
					iso_a2: "NA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						258,
						259,
						260,
						261,
						262,
						263,
						264
					]
				],
				id: "686",
				properties: {
					iso_a2: "SN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-261,
						265,
						266,
						267,
						268,
						269,
						270
					]
				],
				id: "466",
				properties: {
					iso_a2: "ML"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-13,
						271,
						-266,
						-260,
						272
					]
				],
				id: "478",
				properties: {
					iso_a2: "MR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						273,
						274,
						275,
						276,
						277
					]
				],
				id: "204",
				properties: {
					iso_a2: "BJ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-131,
						278,
						279,
						-277,
						280,
						-268,
						281,
						282
					]
				],
				id: "562",
				properties: {
					iso_a2: "NE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-278,
						-280,
						283,
						284
					]
				],
				id: "566",
				properties: {
					iso_a2: "NG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-130,
						285,
						286,
						287,
						288,
						289,
						-284,
						-279
					]
				],
				id: "120",
				properties: {
					iso_a2: "CM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-275,
						290,
						291,
						292
					]
				],
				id: "768",
				properties: {
					iso_a2: "TG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-292,
						293,
						294,
						295
					]
				],
				id: "288",
				properties: {
					iso_a2: "GH"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-270,
						296,
						-295,
						297,
						298,
						299
					]
				],
				id: "384",
				properties: {
					iso_a2: "CI"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-262,
						-271,
						-300,
						300,
						301,
						302,
						303
					]
				],
				id: "324",
				properties: {
					iso_a2: "GN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-263,
						-304,
						304
					]
				],
				id: "624",
				properties: {
					iso_a2: "GW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-299,
						305,
						306,
						-301
					]
				],
				id: "430",
				properties: {
					iso_a2: "LR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-302,
						-307,
						307
					]
				],
				id: "694",
				properties: {
					iso_a2: "SL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-269,
						-281,
						-276,
						-293,
						-296,
						-297
					]
				],
				id: "854",
				properties: {
					iso_a2: "BF"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-108,
						308,
						-286,
						-129,
						-121,
						309
					]
				],
				id: "140",
				properties: {
					iso_a2: "CF"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-107,
						310,
						311,
						312,
						-287,
						-309
					]
				],
				id: "178",
				properties: {
					iso_a2: "CG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-288,
						-313,
						313,
						314
					]
				],
				id: "266",
				properties: {
					iso_a2: "GA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-289,
						-315,
						315
					]
				],
				id: "226",
				properties: {
					iso_a2: "GQ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-7,
						316,
						317,
						-252,
						-255,
						-258,
						318,
						-103
					]
				],
				id: "894",
				properties: {
					iso_a2: "ZM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-6,
						319,
						-317
					]
				],
				id: "454",
				properties: {
					iso_a2: "MW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-5,
						320,
						-184,
						321,
						-182,
						-253,
						-318,
						-320
					]
				],
				id: "508",
				properties: {
					iso_a2: "MZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-183,
						-322
					]
				],
				id: "748",
				properties: {
					iso_a2: "SZ"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-106,
							322,
							-311
						]
					],
					[
						[
							-104,
							-319,
							-257,
							323
						]
					]
				],
				id: "024",
				properties: {
					iso_a2: "AO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-9,
						-112,
						324
					]
				],
				id: "108",
				properties: {
					iso_a2: "BI"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						325,
						326,
						327,
						328,
						329,
						330,
						331
					]
				],
				id: "376",
				properties: {
					iso_a2: "IL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-331,
						332,
						333
					]
				],
				id: "422",
				properties: {
					iso_a2: "LB"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						334
					]
				],
				id: "450",
				properties: {
					iso_a2: "MG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-327,
						335
					]
				],
				id: "275",
				properties: {
					iso_a2: "PS"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-265,
						336
					]
				],
				id: "270",
				properties: {
					iso_a2: "GM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						337,
						338,
						339
					]
				],
				id: "788",
				properties: {
					iso_a2: "TN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-12,
						340,
						341,
						-338,
						342,
						-282,
						-267,
						-272
					]
				],
				id: "012",
				properties: {
					iso_a2: "DZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-326,
						343,
						344,
						345,
						346,
						-328,
						-336
					]
				],
				id: "400",
				properties: {
					iso_a2: "JO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						347,
						348,
						349,
						350,
						351
					]
				],
				id: "784",
				properties: {
					iso_a2: "AE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						352,
						353
					]
				],
				id: "634",
				properties: {
					iso_a2: "QA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						354,
						355,
						356
					]
				],
				id: "414",
				properties: {
					iso_a2: "KW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-345,
						357,
						358,
						359,
						360,
						-357,
						361
					]
				],
				id: "368",
				properties: {
					iso_a2: "IQ"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-351,
							362,
							363,
							364
						]
					],
					[
						[
							-349,
							365
						]
					]
				],
				id: "512",
				properties: {
					iso_a2: "OM"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							366
						]
					],
					[
						[
							367
						]
					]
				],
				id: "548",
				properties: {
					iso_a2: "VU"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						368,
						369,
						370,
						371
					]
				],
				id: "116",
				properties: {
					iso_a2: "KH"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-369,
						372,
						373,
						374,
						375,
						376
					]
				],
				id: "764",
				properties: {
					iso_a2: "TH"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-370,
						-377,
						377,
						378,
						379
					]
				],
				id: "418",
				properties: {
					iso_a2: "LA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-376,
						380,
						381,
						382,
						383,
						-378
					]
				],
				id: "104",
				properties: {
					iso_a2: "MM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-371,
						-380,
						384,
						385
					]
				],
				id: "704",
				properties: {
					iso_a2: "VN"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							386,
							386,
							386
						]
					],
					[
						[
							-147,
							387,
							388,
							389,
							390
						]
					]
				],
				id: "408",
				properties: {
					iso_a2: "KP"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-389,
						391
					]
				],
				id: "410",
				properties: {
					iso_a2: "KR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-149,
						392
					]
				],
				id: "496",
				properties: {
					iso_a2: "MN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-383,
						393,
						394,
						395,
						396,
						397,
						398,
						399,
						400
					]
				],
				id: "356",
				properties: {
					iso_a2: "IN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-382,
						401,
						-394
					]
				],
				id: "050",
				properties: {
					iso_a2: "BD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-400,
						402
					]
				],
				id: "064",
				properties: {
					iso_a2: "BT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-398,
						403
					]
				],
				id: "524",
				properties: {
					iso_a2: "NP"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-396,
						404,
						405,
						406,
						407
					]
				],
				id: "586",
				properties: {
					iso_a2: "PK"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-69,
						408,
						409,
						-407,
						410,
						411
					]
				],
				id: "004",
				properties: {
					iso_a2: "AF"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-68,
						412,
						413,
						-409
					]
				],
				id: "762",
				properties: {
					iso_a2: "TJ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-62,
						414,
						-413,
						-67
					]
				],
				id: "417",
				properties: {
					iso_a2: "KG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-64,
						-70,
						-412,
						415,
						416
					]
				],
				id: "795",
				properties: {
					iso_a2: "TM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-360,
						417,
						418,
						419,
						420,
						421,
						-416,
						-411,
						-406,
						422
					]
				],
				id: "364",
				properties: {
					iso_a2: "IR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-332,
						-334,
						423,
						424,
						-358,
						-344
					]
				],
				id: "760",
				properties: {
					iso_a2: "SY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-420,
						425,
						426,
						427,
						428
					]
				],
				id: "051",
				properties: {
					iso_a2: "AM"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-172,
						429,
						430
					]
				],
				id: "752",
				properties: {
					iso_a2: "SE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-156,
						431,
						432,
						433,
						434
					]
				],
				id: "112",
				properties: {
					iso_a2: "BY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-155,
						435,
						-164,
						436,
						437,
						438,
						439,
						440,
						441,
						442,
						-432
					]
				],
				id: "804",
				properties: {
					iso_a2: "UA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-433,
						-443,
						443,
						444,
						445,
						446,
						-142,
						447
					]
				],
				id: "616",
				properties: {
					iso_a2: "PL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						448,
						449,
						450,
						451,
						452,
						453,
						454
					]
				],
				id: "040",
				properties: {
					iso_a2: "AT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-441,
						455,
						456,
						457,
						458,
						-449,
						459
					]
				],
				id: "348",
				properties: {
					iso_a2: "HU"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-439,
						460
					]
				],
				id: "498",
				properties: {
					iso_a2: "MD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-438,
						461,
						462,
						463,
						-456,
						-440,
						-461
					]
				],
				id: "642",
				properties: {
					iso_a2: "RO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-434,
						-448,
						-144,
						464,
						465
					]
				],
				id: "440",
				properties: {
					iso_a2: "LT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-157,
						-435,
						-466,
						466,
						467
					]
				],
				id: "428",
				properties: {
					iso_a2: "LV"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-158,
						-468,
						468
					]
				],
				id: "233",
				properties: {
					iso_a2: "EE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-446,
						469,
						-453,
						470,
						-238,
						471,
						472,
						473,
						474,
						475,
						476
					]
				],
				id: "276",
				properties: {
					iso_a2: "DE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-463,
						477,
						478,
						479,
						480,
						481
					]
				],
				id: "100",
				properties: {
					iso_a2: "BG"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							482
						]
					],
					[
						[
							-480,
							483,
							484,
							485,
							486
						]
					]
				],
				id: "300",
				properties: {
					iso_a2: "GR"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-359,
							-425,
							487,
							488,
							-427,
							-418
						]
					],
					[
						[
							-479,
							489,
							-484
						]
					]
				],
				id: "792",
				properties: {
					iso_a2: "TR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-486,
						490,
						491,
						492,
						493
					]
				],
				id: "008",
				properties: {
					iso_a2: "AL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-458,
						494,
						495,
						496,
						497,
						498
					]
				],
				id: "191",
				properties: {
					iso_a2: "HR"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-452,
						499,
						-239,
						-471
					]
				],
				id: "756",
				properties: {
					iso_a2: "CH"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-472,
						-245,
						500
					]
				],
				id: "442",
				properties: {
					iso_a2: "LU"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-473,
						-501,
						-244,
						501,
						502
					]
				],
				id: "056",
				properties: {
					iso_a2: "BE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-474,
						-503,
						503
					]
				],
				id: "528",
				properties: {
					iso_a2: "NL"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						504,
						505
					]
				],
				id: "620",
				properties: {
					iso_a2: "PT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-505,
						506,
						-242,
						507
					]
				],
				id: "724",
				properties: {
					iso_a2: "ES"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						508,
						509
					]
				],
				id: "372",
				properties: {
					iso_a2: "IE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						510
					]
				],
				id: "540",
				properties: {
					iso_a2: "NC"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							511
						]
					],
					[
						[
							512
						]
					],
					[
						[
							513
						]
					],
					[
						[
							514
						]
					],
					[
						[
							515
						]
					]
				],
				id: "090",
				properties: {
					iso_a2: "SB"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							516
						]
					],
					[
						[
							517
						]
					]
				],
				id: "554",
				properties: {
					iso_a2: "NZ"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							518
						]
					],
					[
						[
							519
						]
					]
				],
				id: "036",
				properties: {
					iso_a2: "AU"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						520
					]
				],
				id: "144",
				properties: {
					iso_a2: "LK"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							521
						]
					],
					[
						[
							-61,
							-150,
							-393,
							-148,
							-391,
							522,
							-385,
							-379,
							-384,
							-401,
							-403,
							-399,
							-404,
							-397,
							-408,
							-410,
							-414,
							-415
						]
					]
				],
				id: "156",
				properties: {
					iso_a2: "CN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						523
					]
				],
				id: "158",
				properties: {
					iso_a2: "TW"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-451,
							524,
							525,
							-240,
							-500
						]
					],
					[
						[
							526
						]
					],
					[
						[
							527
						]
					]
				],
				id: "380",
				properties: {
					iso_a2: "IT"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-476,
							528
						]
					],
					[
						[
							529
						]
					]
				],
				id: "208",
				properties: {
					iso_a2: "DK"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-510,
							530
						]
					],
					[
						[
							531
						]
					]
				],
				id: "826",
				properties: {
					iso_a2: "GB"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						532
					]
				],
				id: "352",
				properties: {
					iso_a2: "IS"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-152,
							533,
							-421,
							-429,
							534
						]
					],
					[
						[
							-419,
							-426
						]
					]
				],
				id: "031",
				properties: {
					iso_a2: "AZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-153,
						-535,
						-428,
						-489,
						535
					]
				],
				id: "268",
				properties: {
					iso_a2: "GE"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							536
						]
					],
					[
						[
							537
						]
					],
					[
						[
							538
						]
					],
					[
						[
							539
						]
					],
					[
						[
							540
						]
					],
					[
						[
							541
						]
					],
					[
						[
							542
						]
					]
				],
				id: "608",
				properties: {
					iso_a2: "PH"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-374,
							543
						]
					],
					[
						[
							-81,
							544,
							545,
							546
						]
					]
				],
				id: "458",
				properties: {
					iso_a2: "MY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-546,
						547
					]
				],
				id: "096",
				properties: {
					iso_a2: "BN"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-450,
						-459,
						-499,
						548,
						-525
					]
				],
				id: "705",
				properties: {
					iso_a2: "SI"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-160,
						549,
						-430,
						-171
					]
				],
				id: "246",
				properties: {
					iso_a2: "FI"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-442,
						-460,
						-455,
						550,
						-444
					]
				],
				id: "703",
				properties: {
					iso_a2: "SK"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-445,
						-551,
						-454,
						-470
					]
				],
				id: "203",
				properties: {
					iso_a2: "CZ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-126,
						551,
						552,
						553
					]
				],
				id: "232",
				properties: {
					iso_a2: "ER"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							554
						]
					],
					[
						[
							555
						]
					],
					[
						[
							556
						]
					]
				],
				id: "392",
				properties: {
					iso_a2: "JP"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-193,
						-97,
						-202
					]
				],
				id: "600",
				properties: {
					iso_a2: "PY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-364,
						557,
						558
					]
				],
				id: "887",
				properties: {
					iso_a2: "YE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-346,
						-362,
						-356,
						559,
						-354,
						560,
						-352,
						-365,
						-559,
						561
					]
				],
				id: "682",
				properties: {
					iso_a2: "SA"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							562
						]
					],
					[
						[
							563
						]
					],
					[
						[
							564
						]
					],
					[
						[
							565
						]
					],
					[
						[
							566
						]
					],
					[
						[
							567
						]
					],
					[
						[
							568
						]
					],
					[
						[
							569
						]
					]
				],
				id: "010",
				properties: {
					iso_a2: "AQ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						570,
						571
					]
				],
				properties: {
					name: "N. Cyprus"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-572,
						572
					]
				],
				id: "196",
				properties: {
					iso_a2: "CY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-341,
						-15,
						573
					]
				],
				id: "504",
				properties: {
					iso_a2: "MA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-124,
						574,
						575,
						-329,
						576
					]
				],
				id: "818",
				properties: {
					iso_a2: "EG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-123,
						-132,
						-283,
						-343,
						-340,
						577,
						-575
					]
				],
				id: "434",
				properties: {
					iso_a2: "LY"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-114,
						-119,
						578,
						-127,
						-554,
						579,
						580
					]
				],
				id: "231",
				properties: {
					iso_a2: "ET"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-553,
						581,
						582,
						-580
					]
				],
				id: "262",
				properties: {
					iso_a2: "DJ"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-115,
						-581,
						-583,
						583
					]
				],
				properties: {
					iso_a2: "SO"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-11,
						584,
						-110,
						585,
						-117
					]
				],
				id: "800",
				properties: {
					iso_a2: "UG"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-10,
						-325,
						-111,
						-585
					]
				],
				id: "646",
				properties: {
					iso_a2: "RW"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-496,
						586,
						587
					]
				],
				id: "070",
				properties: {
					iso_a2: "BA"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-481,
						-487,
						-494,
						588,
						589
					]
				],
				id: "807",
				properties: {
					iso_a2: "MK"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-457,
						-464,
						-482,
						-590,
						590,
						591,
						-587,
						-495
					]
				],
				id: "688",
				properties: {
					iso_a2: "RS"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-492,
						592,
						-497,
						-588,
						-592,
						593
					]
				],
				id: "499",
				properties: {
					iso_a2: "ME"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-493,
						-594,
						-591,
						-589
					]
				],
				properties: {
					name: "Kosovo"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						594
					]
				],
				id: "780",
				properties: {
					iso_a2: "TT"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-109,
						-310,
						-128,
						-579,
						-118,
						-586
					]
				],
				id: "728",
				properties: {
					iso_a2: "SS"
				}
			}
		]
	},
	land: {
		type: "GeometryCollection",
		geometries: [
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							0
						]
					],
					[
						[
							1
						]
					],
					[
						[
							3,
							320,
							184,
							255,
							323,
							104,
							322,
							311,
							313,
							315,
							289,
							284,
							273,
							290,
							293,
							297,
							305,
							307,
							302,
							304,
							263,
							336,
							258,
							272,
							13,
							573,
							341,
							338,
							577,
							575,
							329,
							332,
							423,
							487,
							535,
							153,
							435,
							164,
							436,
							461,
							477,
							489,
							484,
							490,
							592,
							497,
							548,
							525,
							240,
							507,
							505,
							506,
							242,
							501,
							503,
							474,
							528,
							476,
							446,
							142,
							464,
							466,
							468,
							158,
							549,
							430,
							172,
							161,
							387,
							391,
							389,
							522,
							385,
							371,
							372,
							543,
							374,
							380,
							401,
							394,
							404,
							422,
							360,
							354,
							559,
							352,
							560,
							347,
							365,
							349,
							362,
							557,
							561,
							346,
							576,
							124,
							551,
							581,
							583,
							115,
							119
						],
						[
							421,
							416,
							64,
							150,
							533
						]
					],
					[
						[
							17,
							48,
							186,
							229,
							227,
							223,
							219,
							216,
							213,
							209,
							230,
							232,
							234,
							236,
							200,
							191,
							93,
							100,
							203,
							246,
							207,
							211,
							214,
							217,
							220,
							224,
							228,
							189,
							50,
							15,
							58
						]
					],
					[
						[
							19
						]
					],
					[
						[
							20
						]
					],
					[
						[
							21
						]
					],
					[
						[
							22
						]
					],
					[
						[
							23
						]
					],
					[
						[
							24
						]
					],
					[
						[
							25
						]
					],
					[
						[
							26
						]
					],
					[
						[
							27
						]
					],
					[
						[
							28
						]
					],
					[
						[
							29
						]
					],
					[
						[
							30
						]
					],
					[
						[
							31
						]
					],
					[
						[
							32
						]
					],
					[
						[
							33
						]
					],
					[
						[
							34
						]
					],
					[
						[
							35
						]
					],
					[
						[
							36
						]
					],
					[
						[
							37
						]
					],
					[
						[
							38
						]
					],
					[
						[
							39
						]
					],
					[
						[
							40
						]
					],
					[
						[
							41
						]
					],
					[
						[
							42
						]
					],
					[
						[
							43
						]
					],
					[
						[
							44
						]
					],
					[
						[
							45
						]
					],
					[
						[
							46
						]
					],
					[
						[
							47
						]
					],
					[
						[
							51
						]
					],
					[
						[
							52
						]
					],
					[
						[
							53
						]
					],
					[
						[
							54
						]
					],
					[
						[
							55
						]
					],
					[
						[
							56
						]
					],
					[
						[
							57
						]
					],
					[
						[
							59
						]
					],
					[
						[
							70,
							75
						]
					],
					[
						[
							72
						]
					],
					[
						[
							73
						]
					],
					[
						[
							74
						]
					],
					[
						[
							77,
							177
						]
					],
					[
						[
							78
						]
					],
					[
						[
							546,
							79,
							544,
							547
						]
					],
					[
						[
							81
						]
					],
					[
						[
							82
						]
					],
					[
						[
							83
						]
					],
					[
						[
							84
						]
					],
					[
						[
							85
						]
					],
					[
						[
							86
						]
					],
					[
						[
							87
						]
					],
					[
						[
							88
						]
					],
					[
						[
							89
						]
					],
					[
						[
							90,
							98
						]
					],
					[
						[
							133,
							134
						]
					],
					[
						[
							135
						]
					],
					[
						[
							136
						]
					],
					[
						[
							137
						]
					],
					[
						[
							138
						]
					],
					[
						[
							139
						]
					],
					[
						[
							140
						]
					],
					[
						[
							144
						]
					],
					[
						[
							145
						]
					],
					[
						[
							162
						]
					],
					[
						[
							165
						]
					],
					[
						[
							166
						]
					],
					[
						[
							167
						]
					],
					[
						[
							168
						]
					],
					[
						[
							169
						]
					],
					[
						[
							173
						]
					],
					[
						[
							174
						]
					],
					[
						[
							175
						]
					],
					[
						[
							176
						]
					],
					[
						[
							245
						]
					],
					[
						[
							247
						]
					],
					[
						[
							248
						]
					],
					[
						[
							249
						]
					],
					[
						[
							334
						]
					],
					[
						[
							366
						]
					],
					[
						[
							367
						]
					],
					[
						[
							482
						]
					],
					[
						[
							508,
							530
						]
					],
					[
						[
							510
						]
					],
					[
						[
							511
						]
					],
					[
						[
							512
						]
					],
					[
						[
							513
						]
					],
					[
						[
							514
						]
					],
					[
						[
							515
						]
					],
					[
						[
							516
						]
					],
					[
						[
							517
						]
					],
					[
						[
							518
						]
					],
					[
						[
							519
						]
					],
					[
						[
							520
						]
					],
					[
						[
							521
						]
					],
					[
						[
							523
						]
					],
					[
						[
							526
						]
					],
					[
						[
							527
						]
					],
					[
						[
							529
						]
					],
					[
						[
							531
						]
					],
					[
						[
							532
						]
					],
					[
						[
							536
						]
					],
					[
						[
							537
						]
					],
					[
						[
							538
						]
					],
					[
						[
							539
						]
					],
					[
						[
							540
						]
					],
					[
						[
							541
						]
					],
					[
						[
							542
						]
					],
					[
						[
							554
						]
					],
					[
						[
							555
						]
					],
					[
						[
							556
						]
					],
					[
						[
							562
						]
					],
					[
						[
							563
						]
					],
					[
						[
							564
						]
					],
					[
						[
							565
						]
					],
					[
						[
							566
						]
					],
					[
						[
							567
						]
					],
					[
						[
							568
						]
					],
					[
						[
							569
						]
					],
					[
						[
							570,
							572
						]
					],
					[
						[
							594
						]
					]
				]
			}
		]
	}
};
var arcs = [
	[
		[
			99478,
			40237
		],
		[
			69,
			98
		],
		[
			96,
			-171
		],
		[
			-46,
			-308
		],
		[
			-172,
			-81
		],
		[
			-153,
			73
		],
		[
			-27,
			260
		],
		[
			107,
			203
		],
		[
			126,
			-74
		]
	],
	[
		[
			0,
			41087
		],
		[
			57,
			27
		],
		[
			-34,
			-284
		],
		[
			-23,
			-32
		],
		[
			99822,
			-145
		],
		[
			-177,
			-124
		],
		[
			-36,
			220
		],
		[
			139,
			121
		],
		[
			88,
			33
		],
		[
			163,
			184
		],
		[
			-99999,
			0
		]
	],
	[
		[
			59417,
			50018
		],
		[
			47,
			-65
		],
		[
			1007,
			-1203
		],
		[
			19,
			-343
		],
		[
			399,
			-590
		]
	],
	[
		[
			60889,
			47817
		],
		[
			-128,
			-728
		],
		[
			16,
			-335
		],
		[
			178,
			-216
		],
		[
			8,
			-153
		],
		[
			-76,
			-357
		],
		[
			16,
			-180
		],
		[
			-18,
			-282
		],
		[
			97,
			-370
		],
		[
			115,
			-583
		],
		[
			101,
			-129
		]
	],
	[
		[
			61198,
			44484
		],
		[
			-221,
			-342
		],
		[
			-303,
			-230
		],
		[
			-167,
			10
		],
		[
			-99,
			-177
		],
		[
			-193,
			-16
		],
		[
			-73,
			-74
		],
		[
			-334,
			166
		],
		[
			-209,
			-48
		]
	],
	[
		[
			59599,
			43773
		],
		[
			-77,
			804
		],
		[
			-95,
			275
		],
		[
			-55,
			164
		],
		[
			-273,
			110
		]
	],
	[
		[
			59099,
			45126
		],
		[
			-157,
			177
		],
		[
			-177,
			100
		],
		[
			-111,
			99
		],
		[
			-116,
			150
		]
	],
	[
		[
			58538,
			45652
		],
		[
			-150,
			745
		],
		[
			-161,
			330
		],
		[
			-55,
			343
		],
		[
			27,
			307
		],
		[
			-50,
			544
		]
	],
	[
		[
			58149,
			47921
		],
		[
			115,
			28
		],
		[
			101,
			214
		],
		[
			108,
			308
		],
		[
			69,
			124
		],
		[
			-3,
			192
		],
		[
			-60,
			134
		],
		[
			-16,
			233
		]
	],
	[
		[
			58463,
			49154
		],
		[
			80,
			74
		],
		[
			16,
			348
		],
		[
			-110,
			333
		]
	],
	[
		[
			58449,
			49909
		],
		[
			98,
			71
		],
		[
			304,
			-7
		],
		[
			566,
			45
		]
	],
	[
		[
			47592,
			66920
		],
		[
			1,
			-40
		],
		[
			-6,
			-114
		]
	],
	[
		[
			47587,
			66766
		],
		[
			-1,
			-895
		],
		[
			-911,
			31
		],
		[
			9,
			-1512
		],
		[
			-261,
			-53
		],
		[
			-68,
			-304
		],
		[
			53,
			-853
		],
		[
			-1088,
			4
		],
		[
			-60,
			-197
		]
	],
	[
		[
			45260,
			62987
		],
		[
			12,
			249
		]
	],
	[
		[
			45272,
			63236
		],
		[
			5,
			-1
		],
		[
			625,
			48
		],
		[
			33,
			213
		],
		[
			114,
			265
		],
		[
			92,
			816
		],
		[
			386,
			637
		],
		[
			131,
			745
		],
		[
			86,
			44
		],
		[
			91,
			460
		],
		[
			234,
			63
		],
		[
			100,
			-76
		],
		[
			126,
			0
		],
		[
			90,
			134
		],
		[
			172,
			19
		],
		[
			-7,
			317
		],
		[
			42,
			0
		]
	],
	[
		[
			15878,
			79530
		],
		[
			-38,
			1
		],
		[
			-537,
			581
		],
		[
			-199,
			255
		],
		[
			-503,
			244
		],
		[
			-155,
			523
		],
		[
			40,
			363
		],
		[
			-356,
			252
		],
		[
			-48,
			476
		],
		[
			-336,
			429
		],
		[
			-6,
			304
		]
	],
	[
		[
			13740,
			82958
		],
		[
			154,
			285
		],
		[
			-7,
			373
		],
		[
			-473,
			376
		],
		[
			-284,
			674
		],
		[
			-173,
			424
		],
		[
			-255,
			266
		],
		[
			-187,
			242
		],
		[
			-147,
			306
		],
		[
			-279,
			-192
		],
		[
			-270,
			-330
		],
		[
			-247,
			388
		],
		[
			-194,
			259
		],
		[
			-271,
			164
		],
		[
			-273,
			17
		],
		[
			1,
			3364
		],
		[
			2,
			2193
		]
	],
	[
		[
			10837,
			91767
		],
		[
			518,
			-142
		],
		[
			438,
			-285
		],
		[
			289,
			-54
		],
		[
			244,
			247
		],
		[
			336,
			184
		],
		[
			413,
			-72
		],
		[
			416,
			259
		],
		[
			455,
			148
		],
		[
			191,
			-245
		],
		[
			207,
			138
		],
		[
			62,
			278
		],
		[
			192,
			-63
		],
		[
			470,
			-530
		],
		[
			369,
			401
		],
		[
			38,
			-449
		],
		[
			341,
			97
		],
		[
			105,
			173
		],
		[
			337,
			-34
		],
		[
			424,
			-248
		],
		[
			650,
			-217
		],
		[
			383,
			-100
		],
		[
			272,
			38
		],
		[
			374,
			-300
		],
		[
			-390,
			-293
		],
		[
			502,
			-127
		],
		[
			750,
			70
		],
		[
			236,
			103
		],
		[
			296,
			-354
		],
		[
			302,
			299
		],
		[
			-283,
			251
		],
		[
			179,
			202
		],
		[
			338,
			27
		],
		[
			223,
			59
		],
		[
			224,
			-141
		],
		[
			279,
			-321
		],
		[
			310,
			47
		],
		[
			491,
			-266
		],
		[
			431,
			94
		],
		[
			405,
			-14
		],
		[
			-32,
			367
		],
		[
			247,
			103
		],
		[
			431,
			-200
		],
		[
			-2,
			-559
		],
		[
			177,
			471
		],
		[
			223,
			-16
		],
		[
			126,
			594
		],
		[
			-298,
			364
		],
		[
			-324,
			239
		],
		[
			22,
			653
		],
		[
			329,
			429
		],
		[
			366,
			-95
		],
		[
			281,
			-261
		],
		[
			378,
			-666
		],
		[
			-247,
			-290
		],
		[
			517,
			-120
		],
		[
			-1,
			-604
		],
		[
			371,
			463
		],
		[
			332,
			-380
		],
		[
			-83,
			-438
		],
		[
			269,
			-399
		],
		[
			290,
			427
		],
		[
			202,
			510
		],
		[
			16,
			649
		],
		[
			394,
			-46
		],
		[
			411,
			-87
		],
		[
			373,
			-293
		],
		[
			17,
			-293
		],
		[
			-207,
			-315
		],
		[
			196,
			-316
		],
		[
			-36,
			-288
		],
		[
			-544,
			-413
		],
		[
			-386,
			-91
		],
		[
			-287,
			178
		],
		[
			-83,
			-297
		],
		[
			-268,
			-498
		],
		[
			-81,
			-259
		],
		[
			-322,
			-399
		],
		[
			-397,
			-39
		],
		[
			-220,
			-250
		],
		[
			-18,
			-384
		],
		[
			-323,
			-74
		],
		[
			-340,
			-479
		],
		[
			-301,
			-665
		],
		[
			-108,
			-466
		],
		[
			-16,
			-686
		],
		[
			409,
			-99
		],
		[
			125,
			-553
		],
		[
			130,
			-448
		],
		[
			388,
			117
		],
		[
			517,
			-256
		],
		[
			277,
			-225
		],
		[
			199,
			-279
		],
		[
			348,
			-163
		],
		[
			294,
			-248
		],
		[
			459,
			-34
		],
		[
			302,
			-58
		],
		[
			-45,
			-511
		],
		[
			86,
			-594
		],
		[
			201,
			-661
		],
		[
			414,
			-561
		],
		[
			214,
			192
		],
		[
			150,
			607
		],
		[
			-145,
			934
		],
		[
			-196,
			311
		],
		[
			445,
			276
		],
		[
			314,
			415
		],
		[
			154,
			411
		],
		[
			-23,
			395
		],
		[
			-188,
			502
		],
		[
			-338,
			445
		],
		[
			328,
			619
		],
		[
			-121,
			535
		],
		[
			-93,
			922
		],
		[
			194,
			137
		],
		[
			476,
			-161
		],
		[
			286,
			-57
		],
		[
			230,
			155
		],
		[
			258,
			-200
		],
		[
			342,
			-343
		],
		[
			85,
			-229
		],
		[
			495,
			-45
		],
		[
			-8,
			-496
		],
		[
			92,
			-747
		],
		[
			254,
			-92
		],
		[
			201,
			-348
		],
		[
			402,
			328
		],
		[
			266,
			652
		],
		[
			184,
			274
		],
		[
			216,
			-527
		],
		[
			362,
			-754
		],
		[
			307,
			-709
		],
		[
			-112,
			-371
		],
		[
			370,
			-333
		],
		[
			250,
			-338
		],
		[
			442,
			-152
		],
		[
			179,
			-189
		],
		[
			110,
			-500
		],
		[
			216,
			-78
		],
		[
			112,
			-223
		],
		[
			20,
			-664
		],
		[
			-202,
			-222
		],
		[
			-199,
			-207
		],
		[
			-458,
			-210
		],
		[
			-349,
			-486
		],
		[
			-470,
			-96
		],
		[
			-594,
			125
		],
		[
			-417,
			4
		],
		[
			-287,
			-41
		],
		[
			-233,
			-424
		],
		[
			-354,
			-262
		],
		[
			-401,
			-782
		],
		[
			-320,
			-545
		],
		[
			236,
			97
		],
		[
			446,
			776
		],
		[
			583,
			493
		],
		[
			415,
			58
		],
		[
			246,
			-289
		],
		[
			-262,
			-397
		],
		[
			88,
			-637
		],
		[
			91,
			-446
		],
		[
			361,
			-295
		],
		[
			459,
			86
		],
		[
			278,
			664
		],
		[
			19,
			-429
		],
		[
			180,
			-214
		],
		[
			-344,
			-387
		],
		[
			-615,
			-351
		],
		[
			-276,
			-239
		],
		[
			-310,
			-426
		],
		[
			-211,
			44
		],
		[
			-11,
			500
		],
		[
			483,
			488
		],
		[
			-445,
			-19
		],
		[
			-309,
			-72
		]
	],
	[
		[
			31350,
			77248
		],
		[
			-181,
			334
		],
		[
			0,
			805
		],
		[
			-123,
			171
		],
		[
			-187,
			-100
		],
		[
			-92,
			155
		],
		[
			-212,
			-446
		],
		[
			-84,
			-460
		],
		[
			-99,
			-269
		],
		[
			-118,
			-91
		],
		[
			-89,
			-30
		],
		[
			-28,
			-146
		],
		[
			-512,
			0
		],
		[
			-422,
			-4
		],
		[
			-125,
			-109
		],
		[
			-294,
			-425
		],
		[
			-34,
			-46
		],
		[
			-89,
			-231
		],
		[
			-255,
			1
		],
		[
			-273,
			-3
		],
		[
			-125,
			-93
		],
		[
			44,
			-116
		],
		[
			25,
			-181
		],
		[
			-5,
			-60
		],
		[
			-363,
			-293
		],
		[
			-286,
			-93
		],
		[
			-323,
			-316
		],
		[
			-70,
			0
		],
		[
			-94,
			93
		],
		[
			-31,
			85
		],
		[
			6,
			61
		],
		[
			61,
			207
		],
		[
			131,
			325
		],
		[
			81,
			349
		],
		[
			-56,
			514
		],
		[
			-59,
			536
		],
		[
			-290,
			277
		],
		[
			35,
			105
		],
		[
			-41,
			73
		],
		[
			-76,
			0
		],
		[
			-56,
			93
		],
		[
			-14,
			140
		],
		[
			-54,
			-61
		],
		[
			-75,
			18
		],
		[
			17,
			59
		],
		[
			-65,
			58
		],
		[
			-27,
			155
		],
		[
			-216,
			189
		],
		[
			-224,
			197
		],
		[
			-272,
			229
		],
		[
			-261,
			214
		],
		[
			-248,
			-167
		],
		[
			-91,
			-6
		],
		[
			-342,
			154
		],
		[
			-225,
			-77
		],
		[
			-269,
			183
		],
		[
			-284,
			94
		],
		[
			-194,
			36
		],
		[
			-86,
			100
		],
		[
			-49,
			325
		],
		[
			-94,
			-3
		],
		[
			-1,
			-227
		],
		[
			-575,
			0
		],
		[
			-951,
			0
		],
		[
			-944,
			0
		],
		[
			-833,
			0
		],
		[
			-834,
			0
		],
		[
			-819,
			0
		],
		[
			-847,
			0
		],
		[
			-273,
			0
		],
		[
			-824,
			0
		],
		[
			-789,
			0
		]
	],
	[
		[
			26668,
			87478
		],
		[
			207,
			273
		],
		[
			381,
			-6
		],
		[
			-6,
			-114
		],
		[
			-325,
			-326
		],
		[
			-196,
			13
		],
		[
			-61,
			160
		]
	],
	[
		[
			27840,
			93593
		],
		[
			-306,
			313
		],
		[
			12,
			213
		],
		[
			133,
			39
		],
		[
			636,
			-63
		],
		[
			479,
			-325
		],
		[
			25,
			-163
		],
		[
			-296,
			17
		],
		[
			-299,
			13
		],
		[
			-304,
			-80
		],
		[
			-80,
			36
		]
	],
	[
		[
			27690,
			87261
		],
		[
			107,
			177
		],
		[
			114,
			-13
		],
		[
			70,
			-121
		],
		[
			-108,
			-310
		],
		[
			-123,
			50
		],
		[
			-73,
			176
		],
		[
			13,
			41
		]
	],
	[
		[
			23996,
			94879
		],
		[
			-151,
			-229
		],
		[
			-403,
			44
		],
		[
			-337,
			155
		],
		[
			148,
			266
		],
		[
			399,
			159
		],
		[
			243,
			-208
		],
		[
			101,
			-187
		]
	],
	[
		[
			23933,
			96380
		],
		[
			-126,
			-17
		],
		[
			-521,
			38
		],
		[
			-74,
			165
		],
		[
			559,
			-9
		],
		[
			195,
			-109
		],
		[
			-33,
			-68
		]
	],
	[
		[
			23124,
			97116
		],
		[
			332,
			-205
		],
		[
			-76,
			-214
		],
		[
			-411,
			-122
		],
		[
			-226,
			138
		],
		[
			-119,
			221
		],
		[
			-22,
			245
		],
		[
			360,
			-24
		],
		[
			162,
			-39
		]
	],
	[
		[
			25514,
			94532
		],
		[
			-449,
			73
		],
		[
			-738,
			190
		],
		[
			-96,
			325
		],
		[
			-34,
			293
		],
		[
			-279,
			258
		],
		[
			-574,
			72
		],
		[
			-322,
			183
		],
		[
			104,
			242
		],
		[
			573,
			-37
		],
		[
			308,
			-190
		],
		[
			547,
			1
		],
		[
			240,
			-194
		],
		[
			-64,
			-222
		],
		[
			319,
			-134
		],
		[
			177,
			-140
		],
		[
			374,
			-26
		],
		[
			406,
			-50
		],
		[
			441,
			128
		],
		[
			566,
			51
		],
		[
			451,
			-42
		],
		[
			298,
			-223
		],
		[
			62,
			-244
		],
		[
			-174,
			-157
		],
		[
			-414,
			-127
		],
		[
			-355,
			72
		],
		[
			-797,
			-91
		],
		[
			-570,
			-11
		]
	],
	[
		[
			19093,
			96754
		],
		[
			392,
			-92
		],
		[
			-93,
			-177
		],
		[
			-518,
			-170
		],
		[
			-411,
			191
		],
		[
			224,
			188
		],
		[
			406,
			60
		]
	],
	[
		[
			19177,
			97139
		],
		[
			361,
			-120
		],
		[
			-339,
			-115
		],
		[
			-461,
			1
		],
		[
			5,
			84
		],
		[
			285,
			177
		],
		[
			149,
			-27
		]
	],
	[
		[
			34555,
			80899
		],
		[
			-148,
			-372
		],
		[
			-184,
			-517
		],
		[
			181,
			199
		],
		[
			187,
			-126
		],
		[
			-98,
			-206
		],
		[
			247,
			-162
		],
		[
			128,
			144
		],
		[
			277,
			-182
		],
		[
			-86,
			-433
		],
		[
			194,
			101
		],
		[
			36,
			-313
		],
		[
			86,
			-367
		],
		[
			-117,
			-520
		],
		[
			-125,
			-22
		],
		[
			-183,
			111
		],
		[
			60,
			484
		],
		[
			-77,
			75
		],
		[
			-322,
			-513
		],
		[
			-166,
			21
		],
		[
			196,
			277
		],
		[
			-267,
			144
		],
		[
			-298,
			-35
		],
		[
			-539,
			18
		],
		[
			-43,
			175
		],
		[
			173,
			208
		],
		[
			-121,
			160
		],
		[
			234,
			356
		],
		[
			287,
			941
		],
		[
			172,
			336
		],
		[
			241,
			204
		],
		[
			129,
			-26
		],
		[
			-54,
			-160
		]
	],
	[
		[
			26699,
			89048
		],
		[
			304,
			-203
		],
		[
			318,
			-184
		],
		[
			25,
			-281
		],
		[
			204,
			46
		],
		[
			199,
			-196
		],
		[
			-247,
			-186
		],
		[
			-432,
			142
		],
		[
			-156,
			266
		],
		[
			-275,
			-314
		],
		[
			-396,
			-306
		],
		[
			-95,
			346
		],
		[
			-377,
			-57
		],
		[
			242,
			292
		],
		[
			35,
			465
		],
		[
			95,
			542
		],
		[
			201,
			-49
		],
		[
			51,
			-259
		],
		[
			143,
			91
		],
		[
			161,
			-155
		]
	],
	[
		[
			28119,
			93327
		],
		[
			263,
			235
		],
		[
			616,
			-299
		],
		[
			383,
			-282
		],
		[
			36,
			-258
		],
		[
			515,
			134
		],
		[
			290,
			-376
		],
		[
			670,
			-234
		],
		[
			242,
			-238
		],
		[
			263,
			-553
		],
		[
			-510,
			-275
		],
		[
			654,
			-386
		],
		[
			441,
			-130
		],
		[
			400,
			-543
		],
		[
			437,
			-39
		],
		[
			-87,
			-414
		],
		[
			-487,
			-687
		],
		[
			-342,
			253
		],
		[
			-437,
			568
		],
		[
			-359,
			-74
		],
		[
			-35,
			-338
		],
		[
			292,
			-344
		],
		[
			377,
			-272
		],
		[
			114,
			-157
		],
		[
			181,
			-584
		],
		[
			-96,
			-425
		],
		[
			-350,
			160
		],
		[
			-697,
			473
		],
		[
			393,
			-509
		],
		[
			289,
			-357
		],
		[
			45,
			-206
		],
		[
			-753,
			236
		],
		[
			-596,
			343
		],
		[
			-337,
			287
		],
		[
			97,
			167
		],
		[
			-414,
			304
		],
		[
			-405,
			286
		],
		[
			5,
			-171
		],
		[
			-803,
			-94
		],
		[
			-235,
			203
		],
		[
			183,
			435
		],
		[
			522,
			10
		],
		[
			571,
			76
		],
		[
			-92,
			211
		],
		[
			96,
			294
		],
		[
			360,
			576
		],
		[
			-77,
			261
		],
		[
			-107,
			203
		],
		[
			-425,
			286
		],
		[
			-563,
			201
		],
		[
			178,
			150
		],
		[
			-294,
			367
		],
		[
			-245,
			34
		],
		[
			-219,
			201
		],
		[
			-149,
			-175
		],
		[
			-503,
			-76
		],
		[
			-1011,
			132
		],
		[
			-588,
			174
		],
		[
			-450,
			89
		],
		[
			-231,
			207
		],
		[
			290,
			270
		],
		[
			-394,
			2
		],
		[
			-88,
			599
		],
		[
			213,
			528
		],
		[
			286,
			241
		],
		[
			717,
			158
		],
		[
			-204,
			-382
		],
		[
			219,
			-369
		],
		[
			256,
			477
		],
		[
			704,
			242
		],
		[
			477,
			-611
		],
		[
			-42,
			-387
		],
		[
			550,
			172
		]
	],
	[
		[
			23749,
			94380
		],
		[
			579,
			-20
		],
		[
			530,
			-144
		],
		[
			-415,
			-526
		],
		[
			-331,
			-115
		],
		[
			-298,
			-442
		],
		[
			-317,
			22
		],
		[
			-173,
			519
		],
		[
			4,
			294
		],
		[
			145,
			251
		],
		[
			276,
			161
		]
	],
	[
		[
			15873,
			95551
		],
		[
			472,
			442
		],
		[
			570,
			383
		],
		[
			426,
			-9
		],
		[
			381,
			87
		],
		[
			-38,
			-454
		],
		[
			-214,
			-205
		],
		[
			-259,
			-29
		],
		[
			-517,
			-252
		],
		[
			-444,
			-91
		],
		[
			-377,
			128
		]
	],
	[
		[
			13136,
			82508
		],
		[
			267,
			47
		],
		[
			-84,
			-671
		],
		[
			242,
			-475
		],
		[
			-111,
			1
		],
		[
			-167,
			270
		],
		[
			-103,
			272
		],
		[
			-140,
			184
		],
		[
			-51,
			260
		],
		[
			16,
			188
		],
		[
			131,
			-76
		]
	],
	[
		[
			20696,
			97433
		],
		[
			546,
			-81
		],
		[
			751,
			-215
		],
		[
			212,
			-281
		],
		[
			108,
			-247
		],
		[
			-453,
			66
		],
		[
			-457,
			192
		],
		[
			-619,
			21
		],
		[
			268,
			176
		],
		[
			-335,
			142
		],
		[
			-21,
			227
		]
	],
	[
		[
			15692,
			79240
		],
		[
			-140,
			-82
		],
		[
			-456,
			269
		],
		[
			-84,
			209
		],
		[
			-248,
			207
		],
		[
			-50,
			168
		],
		[
			-286,
			107
		],
		[
			-107,
			321
		],
		[
			24,
			137
		],
		[
			291,
			-129
		],
		[
			171,
			-89
		],
		[
			261,
			-63
		],
		[
			94,
			-204
		],
		[
			138,
			-280
		],
		[
			277,
			-244
		],
		[
			115,
			-327
		]
	],
	[
		[
			16239,
			94566
		],
		[
			397,
			-123
		],
		[
			709,
			-33
		],
		[
			270,
			-171
		],
		[
			298,
			-249
		],
		[
			-349,
			-149
		],
		[
			-681,
			-415
		],
		[
			-344,
			-414
		],
		[
			0,
			-257
		],
		[
			-731,
			-285
		],
		[
			-147,
			259
		],
		[
			-641,
			312
		],
		[
			119,
			250
		],
		[
			192,
			432
		],
		[
			241,
			388
		],
		[
			-272,
			362
		],
		[
			939,
			93
		]
	],
	[
		[
			20050,
			95391
		],
		[
			247,
			99
		],
		[
			291,
			-26
		],
		[
			49,
			-289
		],
		[
			-169,
			-281
		],
		[
			-940,
			-91
		],
		[
			-701,
			-256
		],
		[
			-423,
			-14
		],
		[
			-35,
			193
		],
		[
			577,
			261
		],
		[
			-1255,
			-70
		],
		[
			-389,
			106
		],
		[
			379,
			577
		],
		[
			262,
			165
		],
		[
			782,
			-199
		],
		[
			493,
			-350
		],
		[
			485,
			-45
		],
		[
			-397,
			565
		],
		[
			255,
			215
		],
		[
			286,
			-68
		],
		[
			94,
			-282
		],
		[
			109,
			-210
		]
	],
	[
		[
			20410,
			93755
		],
		[
			311,
			-239
		],
		[
			175,
			-575
		],
		[
			86,
			-417
		],
		[
			466,
			-293
		],
		[
			502,
			-279
		],
		[
			-31,
			-260
		],
		[
			-456,
			-48
		],
		[
			178,
			-227
		],
		[
			-94,
			-217
		],
		[
			-503,
			93
		],
		[
			-478,
			160
		],
		[
			-322,
			-36
		],
		[
			-522,
			-201
		],
		[
			-704,
			-88
		],
		[
			-494,
			-56
		],
		[
			-151,
			279
		],
		[
			-379,
			161
		],
		[
			-246,
			-66
		],
		[
			-343,
			468
		],
		[
			185,
			62
		],
		[
			429,
			101
		],
		[
			392,
			-26
		],
		[
			362,
			103
		],
		[
			-537,
			138
		],
		[
			-594,
			-47
		],
		[
			-394,
			12
		],
		[
			-146,
			217
		],
		[
			644,
			237
		],
		[
			-428,
			-9
		],
		[
			-485,
			156
		],
		[
			233,
			443
		],
		[
			193,
			235
		],
		[
			744,
			359
		],
		[
			284,
			-114
		],
		[
			-139,
			-277
		],
		[
			618,
			179
		],
		[
			386,
			-298
		],
		[
			314,
			302
		],
		[
			254,
			-194
		],
		[
			227,
			-580
		],
		[
			140,
			244
		],
		[
			-197,
			606
		],
		[
			244,
			86
		],
		[
			276,
			-94
		]
	],
	[
		[
			22100,
			93536
		],
		[
			-306,
			386
		],
		[
			329,
			286
		],
		[
			331,
			-124
		],
		[
			496,
			75
		],
		[
			72,
			-172
		],
		[
			-259,
			-283
		],
		[
			420,
			-254
		],
		[
			-50,
			-532
		],
		[
			-455,
			-229
		],
		[
			-268,
			50
		],
		[
			-192,
			225
		],
		[
			-690,
			456
		],
		[
			5,
			189
		],
		[
			567,
			-73
		]
	],
	[
		[
			20389,
			94064
		],
		[
			372,
			24
		],
		[
			211,
			-130
		],
		[
			-244,
			-390
		],
		[
			-434,
			413
		],
		[
			95,
			83
		]
	],
	[
		[
			22639,
			95907
		],
		[
			212,
			-273
		],
		[
			9,
			-303
		],
		[
			-127,
			-440
		],
		[
			-458,
			-60
		],
		[
			-298,
			94
		],
		[
			5,
			345
		],
		[
			-455,
			-46
		],
		[
			-18,
			457
		],
		[
			299,
			-18
		],
		[
			419,
			201
		],
		[
			390,
			-34
		],
		[
			22,
			77
		]
	],
	[
		[
			23329,
			98201
		],
		[
			192,
			180
		],
		[
			285,
			42
		],
		[
			-122,
			135
		],
		[
			646,
			30
		],
		[
			355,
			-315
		],
		[
			468,
			-127
		],
		[
			455,
			-112
		],
		[
			220,
			-390
		],
		[
			334,
			-190
		],
		[
			-381,
			-176
		],
		[
			-513,
			-445
		],
		[
			-492,
			-42
		],
		[
			-575,
			76
		],
		[
			-299,
			240
		],
		[
			4,
			215
		],
		[
			220,
			157
		],
		[
			-508,
			-4
		],
		[
			-306,
			196
		],
		[
			-176,
			268
		],
		[
			193,
			262
		]
	],
	[
		[
			24559,
			98965
		],
		[
			413,
			112
		],
		[
			324,
			19
		],
		[
			545,
			96
		],
		[
			409,
			220
		],
		[
			344,
			-30
		],
		[
			300,
			-166
		],
		[
			211,
			319
		],
		[
			367,
			95
		],
		[
			498,
			65
		],
		[
			849,
			24
		],
		[
			148,
			-63
		],
		[
			802,
			100
		],
		[
			601,
			-38
		],
		[
			602,
			-37
		],
		[
			742,
			-47
		],
		[
			597,
			-75
		],
		[
			508,
			-161
		],
		[
			-12,
			-157
		],
		[
			-678,
			-257
		],
		[
			-672,
			-119
		],
		[
			-251,
			-133
		],
		[
			605,
			3
		],
		[
			-656,
			-358
		],
		[
			-452,
			-167
		],
		[
			-476,
			-483
		],
		[
			-573,
			-98
		],
		[
			-177,
			-120
		],
		[
			-841,
			-64
		],
		[
			383,
			-74
		],
		[
			-192,
			-105
		],
		[
			230,
			-292
		],
		[
			-264,
			-202
		],
		[
			-429,
			-167
		],
		[
			-132,
			-232
		],
		[
			-388,
			-176
		],
		[
			39,
			-134
		],
		[
			475,
			23
		],
		[
			6,
			-144
		],
		[
			-742,
			-355
		],
		[
			-726,
			163
		],
		[
			-816,
			-91
		],
		[
			-414,
			71
		],
		[
			-525,
			31
		],
		[
			-35,
			284
		],
		[
			514,
			133
		],
		[
			-137,
			427
		],
		[
			170,
			41
		],
		[
			742,
			-255
		],
		[
			-379,
			379
		],
		[
			-450,
			113
		],
		[
			225,
			229
		],
		[
			492,
			141
		],
		[
			79,
			206
		],
		[
			-392,
			231
		],
		[
			-118,
			304
		],
		[
			759,
			-26
		],
		[
			220,
			-64
		],
		[
			433,
			216
		],
		[
			-625,
			68
		],
		[
			-972,
			-38
		],
		[
			-491,
			201
		],
		[
			-232,
			239
		],
		[
			-324,
			173
		],
		[
			-61,
			202
		]
	],
	[
		[
			29106,
			90427
		],
		[
			-180,
			-174
		],
		[
			-312,
			-30
		],
		[
			-69,
			289
		],
		[
			118,
			331
		],
		[
			255,
			82
		],
		[
			217,
			-163
		],
		[
			3,
			-253
		],
		[
			-32,
			-82
		]
	],
	[
		[
			23262,
			91636
		],
		[
			169,
			-226
		],
		[
			-173,
			-207
		],
		[
			-374,
			179
		],
		[
			-226,
			-65
		],
		[
			-380,
			266
		],
		[
			245,
			183
		],
		[
			194,
			256
		],
		[
			295,
			-168
		],
		[
			166,
			-106
		],
		[
			84,
			-112
		]
	],
	[
		[
			32078,
			80046
		],
		[
			96,
			49
		],
		[
			365,
			-148
		],
		[
			284,
			-247
		],
		[
			8,
			-108
		],
		[
			-135,
			-11
		],
		[
			-360,
			186
		],
		[
			-258,
			279
		]
	],
	[
		[
			32218,
			78370
		],
		[
			97,
			-288
		],
		[
			202,
			-79
		],
		[
			257,
			16
		],
		[
			-137,
			-242
		],
		[
			-102,
			-38
		],
		[
			-353,
			250
		],
		[
			-69,
			198
		],
		[
			105,
			183
		]
	],
	[
		[
			31350,
			77248
		],
		[
			48,
			-194
		],
		[
			-296,
			-286
		],
		[
			-286,
			-204
		],
		[
			-293,
			-175
		],
		[
			-147,
			-351
		],
		[
			-47,
			-133
		],
		[
			-3,
			-313
		],
		[
			92,
			-313
		],
		[
			115,
			-15
		],
		[
			-29,
			216
		],
		[
			83,
			-131
		],
		[
			-22,
			-169
		],
		[
			-188,
			-96
		],
		[
			-133,
			11
		],
		[
			-205,
			-103
		],
		[
			-121,
			-29
		],
		[
			-162,
			-29
		],
		[
			-231,
			-171
		],
		[
			408,
			111
		],
		[
			82,
			-112
		],
		[
			-389,
			-177
		],
		[
			-177,
			-1
		],
		[
			8,
			72
		],
		[
			-84,
			-164
		],
		[
			82,
			-27
		],
		[
			-60,
			-424
		],
		[
			-203,
			-455
		],
		[
			-20,
			152
		],
		[
			-61,
			30
		],
		[
			-91,
			148
		],
		[
			57,
			-318
		],
		[
			69,
			-105
		],
		[
			5,
			-223
		],
		[
			-89,
			-230
		],
		[
			-157,
			-472
		],
		[
			-25,
			24
		],
		[
			86,
			402
		],
		[
			-142,
			225
		],
		[
			-33,
			491
		],
		[
			-53,
			-255
		],
		[
			59,
			-375
		],
		[
			-183,
			93
		],
		[
			191,
			-191
		],
		[
			12,
			-562
		],
		[
			79,
			-41
		],
		[
			29,
			-204
		],
		[
			39,
			-591
		],
		[
			-176,
			-439
		],
		[
			-288,
			-175
		],
		[
			-182,
			-346
		],
		[
			-139,
			-38
		],
		[
			-141,
			-217
		],
		[
			-39,
			-199
		],
		[
			-305,
			-383
		],
		[
			-157,
			-281
		],
		[
			-131,
			-351
		],
		[
			-43,
			-419
		],
		[
			50,
			-411
		],
		[
			92,
			-505
		],
		[
			124,
			-418
		],
		[
			1,
			-256
		],
		[
			132,
			-685
		],
		[
			-9,
			-398
		],
		[
			-12,
			-230
		],
		[
			-69,
			-361
		],
		[
			-83,
			-75
		],
		[
			-137,
			72
		],
		[
			-44,
			259
		],
		[
			-105,
			136
		],
		[
			-148,
			508
		],
		[
			-129,
			452
		],
		[
			-42,
			231
		],
		[
			57,
			393
		],
		[
			-77,
			325
		],
		[
			-217,
			494
		],
		[
			-108,
			90
		],
		[
			-281,
			-268
		],
		[
			-49,
			30
		],
		[
			-135,
			275
		],
		[
			-174,
			147
		],
		[
			-314,
			-75
		],
		[
			-247,
			66
		],
		[
			-212,
			-41
		],
		[
			-114,
			-92
		],
		[
			50,
			-157
		],
		[
			-5,
			-240
		],
		[
			59,
			-117
		],
		[
			-53,
			-77
		],
		[
			-103,
			87
		],
		[
			-104,
			-112
		],
		[
			-202,
			18
		],
		[
			-207,
			312
		],
		[
			-242,
			-73
		],
		[
			-202,
			137
		],
		[
			-173,
			-42
		],
		[
			-234,
			-138
		],
		[
			-253,
			-438
		],
		[
			-276,
			-255
		],
		[
			-152,
			-282
		],
		[
			-63,
			-266
		],
		[
			-3,
			-407
		],
		[
			14,
			-284
		],
		[
			52,
			-201
		]
	],
	[
		[
			23016,
			65864
		],
		[
			-108,
			-18
		],
		[
			-197,
			130
		],
		[
			-217,
			184
		],
		[
			-78,
			277
		],
		[
			-61,
			414
		],
		[
			-164,
			337
		],
		[
			-96,
			346
		],
		[
			-139,
			404
		],
		[
			-196,
			236
		],
		[
			-227,
			-11
		],
		[
			-175,
			-467
		],
		[
			-230,
			177
		],
		[
			-144,
			178
		],
		[
			-69,
			325
		],
		[
			-92,
			309
		],
		[
			-165,
			260
		],
		[
			-142,
			186
		],
		[
			-102,
			210
		],
		[
			-481,
			0
		],
		[
			0,
			-244
		],
		[
			-221,
			0
		],
		[
			-552,
			-4
		],
		[
			-634,
			416
		],
		[
			-419,
			287
		],
		[
			26,
			116
		],
		[
			-353,
			-64
		],
		[
			-316,
			-46
		]
	],
	[
		[
			17464,
			69802
		],
		[
			-46,
			302
		],
		[
			-180,
			340
		],
		[
			-130,
			71
		],
		[
			-30,
			169
		],
		[
			-156,
			30
		],
		[
			-100,
			159
		],
		[
			-258,
			59
		],
		[
			-71,
			95
		],
		[
			-33,
			324
		],
		[
			-270,
			594
		],
		[
			-231,
			821
		],
		[
			10,
			137
		],
		[
			-123,
			195
		],
		[
			-215,
			495
		],
		[
			-38,
			482
		],
		[
			-148,
			323
		],
		[
			61,
			489
		],
		[
			-10,
			507
		],
		[
			-89,
			453
		],
		[
			109,
			557
		],
		[
			34,
			536
		],
		[
			33,
			536
		],
		[
			-50,
			792
		],
		[
			-88,
			506
		],
		[
			-80,
			274
		],
		[
			33,
			115
		],
		[
			402,
			-200
		],
		[
			148,
			-558
		],
		[
			69,
			156
		],
		[
			-45,
			484
		],
		[
			-94,
			485
		]
	],
	[
		[
			6833,
			62443
		],
		[
			49,
			-51
		],
		[
			45,
			-79
		],
		[
			71,
			-207
		],
		[
			-7,
			-33
		],
		[
			-108,
			-126
		],
		[
			-89,
			-92
		],
		[
			-41,
			-99
		],
		[
			-69,
			84
		],
		[
			8,
			165
		],
		[
			-46,
			216
		],
		[
			14,
			65
		],
		[
			48,
			97
		],
		[
			-19,
			116
		],
		[
			16,
			55
		],
		[
			21,
			-11
		],
		[
			107,
			-100
		]
	],
	[
		[
			6668,
			62848
		],
		[
			-23,
			-71
		],
		[
			-94,
			-43
		],
		[
			-47,
			125
		],
		[
			-32,
			48
		],
		[
			-3,
			37
		],
		[
			27,
			50
		],
		[
			99,
			-56
		],
		[
			73,
			-90
		]
	],
	[
		[
			6456,
			63091
		],
		[
			-9,
			-63
		],
		[
			-149,
			17
		],
		[
			21,
			72
		],
		[
			137,
			-26
		]
	],
	[
		[
			6104,
			63411
		],
		[
			23,
			-38
		],
		[
			80,
			-196
		],
		[
			-15,
			-34
		],
		[
			-19,
			8
		],
		[
			-97,
			21
		],
		[
			-35,
			133
		],
		[
			-11,
			24
		],
		[
			74,
			82
		]
	],
	[
		[
			5732,
			63705
		],
		[
			5,
			-138
		],
		[
			-33,
			-58
		],
		[
			-93,
			107
		],
		[
			14,
			43
		],
		[
			43,
			58
		],
		[
			64,
			-12
		]
	],
	[
		[
			3759,
			86256
		],
		[
			220,
			-54
		],
		[
			27,
			-226
		],
		[
			-171,
			-92
		],
		[
			-182,
			110
		],
		[
			-168,
			161
		],
		[
			274,
			101
		]
	],
	[
		[
			7436,
			84829
		],
		[
			185,
			-40
		],
		[
			117,
			-183
		],
		[
			-240,
			-281
		],
		[
			-277,
			-225
		],
		[
			-142,
			152
		],
		[
			-43,
			277
		],
		[
			252,
			210
		],
		[
			148,
			90
		]
	],
	[
		[
			13740,
			82958
		],
		[
			-153,
			223
		],
		[
			-245,
			188
		],
		[
			-78,
			515
		],
		[
			-358,
			478
		],
		[
			-150,
			558
		],
		[
			-267,
			38
		],
		[
			-441,
			15
		],
		[
			-326,
			170
		],
		[
			-574,
			613
		],
		[
			-266,
			112
		],
		[
			-486,
			211
		],
		[
			-385,
			-51
		],
		[
			-546,
			272
		],
		[
			-330,
			252
		],
		[
			-309,
			-125
		],
		[
			58,
			-411
		],
		[
			-154,
			-38
		],
		[
			-321,
			-123
		],
		[
			-245,
			-199
		],
		[
			-308,
			-126
		],
		[
			-39,
			348
		],
		[
			125,
			580
		],
		[
			295,
			182
		],
		[
			-76,
			148
		],
		[
			-354,
			-329
		],
		[
			-190,
			-394
		],
		[
			-400,
			-420
		],
		[
			203,
			-287
		],
		[
			-262,
			-424
		],
		[
			-299,
			-248
		],
		[
			-278,
			-180
		],
		[
			-69,
			-261
		],
		[
			-434,
			-305
		],
		[
			-87,
			-278
		],
		[
			-325,
			-252
		],
		[
			-191,
			45
		],
		[
			-259,
			-165
		],
		[
			-282,
			-201
		],
		[
			-231,
			-197
		],
		[
			-477,
			-169
		],
		[
			-43,
			99
		],
		[
			304,
			276
		],
		[
			271,
			182
		],
		[
			296,
			324
		],
		[
			345,
			66
		],
		[
			137,
			243
		],
		[
			385,
			353
		],
		[
			62,
			119
		],
		[
			205,
			208
		],
		[
			48,
			448
		],
		[
			141,
			349
		],
		[
			-320,
			-179
		],
		[
			-90,
			102
		],
		[
			-150,
			-215
		],
		[
			-181,
			300
		],
		[
			-75,
			-212
		],
		[
			-104,
			294
		],
		[
			-278,
			-236
		],
		[
			-170,
			0
		],
		[
			-24,
			352
		],
		[
			50,
			216
		],
		[
			-179,
			211
		],
		[
			-361,
			-113
		],
		[
			-235,
			277
		],
		[
			-190,
			142
		],
		[
			-1,
			334
		],
		[
			-214,
			252
		],
		[
			108,
			340
		],
		[
			226,
			330
		],
		[
			99,
			303
		],
		[
			225,
			43
		],
		[
			191,
			-94
		],
		[
			224,
			285
		],
		[
			201,
			-51
		],
		[
			212,
			183
		],
		[
			-52,
			270
		],
		[
			-155,
			106
		],
		[
			205,
			228
		],
		[
			-170,
			-7
		],
		[
			-295,
			-128
		],
		[
			-85,
			-131
		],
		[
			-219,
			131
		],
		[
			-392,
			-67
		],
		[
			-407,
			142
		],
		[
			-117,
			238
		],
		[
			-351,
			343
		],
		[
			390,
			247
		],
		[
			620,
			289
		],
		[
			228,
			0
		],
		[
			-38,
			-296
		],
		[
			586,
			23
		],
		[
			-225,
			366
		],
		[
			-342,
			225
		],
		[
			-197,
			296
		],
		[
			-267,
			252
		],
		[
			-381,
			187
		],
		[
			155,
			309
		],
		[
			493,
			19
		],
		[
			350,
			270
		],
		[
			66,
			287
		],
		[
			284,
			281
		],
		[
			271,
			68
		],
		[
			526,
			262
		],
		[
			256,
			-40
		],
		[
			427,
			315
		],
		[
			421,
			-124
		],
		[
			201,
			-266
		],
		[
			123,
			114
		],
		[
			469,
			-35
		],
		[
			-16,
			-136
		],
		[
			425,
			-101
		],
		[
			283,
			59
		],
		[
			585,
			-186
		],
		[
			534,
			-56
		],
		[
			214,
			-77
		],
		[
			370,
			96
		],
		[
			421,
			-177
		],
		[
			302,
			-83
		]
	],
	[
		[
			2297,
			88264
		],
		[
			171,
			-113
		],
		[
			173,
			61
		],
		[
			225,
			-156
		],
		[
			276,
			-79
		],
		[
			-23,
			-64
		],
		[
			-211,
			-125
		],
		[
			-211,
			128
		],
		[
			-106,
			107
		],
		[
			-245,
			-34
		],
		[
			-66,
			52
		],
		[
			17,
			223
		]
	],
	[
		[
			74266,
			79657
		],
		[
			-212,
			-393
		],
		[
			-230,
			-56
		],
		[
			-13,
			-592
		],
		[
			-155,
			-267
		],
		[
			-551,
			194
		],
		[
			-200,
			-1058
		],
		[
			-143,
			-131
		],
		[
			-550,
			-236
		],
		[
			250,
			-1026
		],
		[
			-190,
			-154
		],
		[
			22,
			-337
		]
	],
	[
		[
			72294,
			75601
		],
		[
			-171,
			87
		],
		[
			-140,
			212
		],
		[
			-412,
			62
		],
		[
			-461,
			16
		],
		[
			-100,
			-65
		],
		[
			-396,
			248
		],
		[
			-158,
			-122
		],
		[
			-43,
			-349
		],
		[
			-457,
			204
		],
		[
			-183,
			-84
		],
		[
			-62,
			-259
		]
	],
	[
		[
			69711,
			75551
		],
		[
			-159,
			-109
		],
		[
			-367,
			-412
		],
		[
			-121,
			-422
		],
		[
			-104,
			-4
		],
		[
			-76,
			280
		],
		[
			-353,
			19
		],
		[
			-57,
			484
		],
		[
			-135,
			4
		],
		[
			21,
			593
		],
		[
			-333,
			431
		],
		[
			-476,
			-46
		],
		[
			-326,
			-86
		],
		[
			-265,
			533
		],
		[
			-227,
			223
		],
		[
			-431,
			423
		],
		[
			-52,
			51
		],
		[
			-715,
			-349
		],
		[
			11,
			-2178
		]
	],
	[
		[
			65546,
			74986
		],
		[
			-142,
			-29
		],
		[
			-195,
			463
		],
		[
			-188,
			166
		],
		[
			-315,
			-123
		],
		[
			-123,
			-197
		]
	],
	[
		[
			64583,
			75266
		],
		[
			-15,
			144
		],
		[
			68,
			246
		],
		[
			-53,
			206
		],
		[
			-322,
			202
		],
		[
			-125,
			530
		],
		[
			-154,
			150
		],
		[
			-9,
			192
		],
		[
			270,
			-56
		],
		[
			11,
			432
		],
		[
			236,
			96
		],
		[
			243,
			-88
		],
		[
			50,
			576
		],
		[
			-50,
			365
		],
		[
			-278,
			-28
		],
		[
			-236,
			144
		],
		[
			-321,
			-260
		],
		[
			-259,
			-124
		]
	],
	[
		[
			63639,
			77993
		],
		[
			-142,
			96
		],
		[
			29,
			304
		],
		[
			-177,
			395
		],
		[
			-207,
			-17
		],
		[
			-235,
			401
		],
		[
			160,
			448
		],
		[
			-81,
			120
		],
		[
			222,
			649
		],
		[
			285,
			-342
		],
		[
			35,
			431
		],
		[
			573,
			643
		],
		[
			434,
			15
		],
		[
			612,
			-409
		],
		[
			329,
			-239
		],
		[
			295,
			249
		],
		[
			440,
			12
		],
		[
			356,
			-306
		],
		[
			80,
			175
		],
		[
			391,
			-25
		],
		[
			69,
			280
		],
		[
			-450,
			406
		],
		[
			267,
			288
		],
		[
			-52,
			161
		],
		[
			266,
			153
		],
		[
			-200,
			405
		],
		[
			127,
			202
		],
		[
			1039,
			205
		],
		[
			136,
			146
		],
		[
			695,
			218
		],
		[
			250,
			245
		],
		[
			499,
			-127
		],
		[
			88,
			-612
		],
		[
			290,
			144
		],
		[
			356,
			-202
		],
		[
			-23,
			-322
		],
		[
			267,
			33
		],
		[
			696,
			558
		],
		[
			-102,
			-185
		],
		[
			355,
			-457
		],
		[
			620,
			-1500
		],
		[
			148,
			309
		],
		[
			383,
			-340
		],
		[
			399,
			151
		],
		[
			154,
			-106
		],
		[
			133,
			-341
		],
		[
			194,
			-115
		],
		[
			119,
			-251
		],
		[
			358,
			79
		],
		[
			147,
			-361
		]
	],
	[
		[
			69711,
			75551
		],
		[
			83,
			-58
		],
		[
			-234,
			-382
		],
		[
			205,
			-223
		],
		[
			198,
			147
		],
		[
			329,
			-311
		],
		[
			-355,
			-425
		],
		[
			-212,
			58
		]
	],
	[
		[
			69725,
			74357
		],
		[
			-114,
			-15
		],
		[
			-40,
			164
		],
		[
			58,
			274
		],
		[
			-371,
			-137
		],
		[
			-89,
			-380
		],
		[
			-132,
			-326
		],
		[
			-232,
			28
		],
		[
			-72,
			-261
		],
		[
			204,
			-140
		],
		[
			60,
			-440
		],
		[
			-156,
			-598
		]
	],
	[
		[
			68841,
			72526
		],
		[
			-210,
			124
		],
		[
			-154,
			4
		]
	],
	[
		[
			68477,
			72654
		],
		[
			7,
			362
		],
		[
			-369,
			253
		],
		[
			-291,
			289
		],
		[
			-181,
			278
		],
		[
			-317,
			408
		],
		[
			-137,
			609
		],
		[
			-93,
			108
		],
		[
			-301,
			-27
		],
		[
			-106,
			121
		],
		[
			-30,
			471
		],
		[
			-374,
			312
		],
		[
			-234,
			-343
		],
		[
			-237,
			-204
		],
		[
			45,
			-297
		],
		[
			-313,
			-8
		]
	],
	[
		[
			89166,
			49043
		],
		[
			482,
			-407
		],
		[
			513,
			-338
		],
		[
			192,
			-302
		],
		[
			154,
			-297
		],
		[
			43,
			-349
		],
		[
			462,
			-365
		],
		[
			68,
			-313
		],
		[
			-256,
			-64
		],
		[
			62,
			-393
		],
		[
			248,
			-388
		],
		[
			180,
			-627
		],
		[
			159,
			20
		],
		[
			-11,
			-262
		],
		[
			215,
			-100
		],
		[
			-84,
			-111
		],
		[
			295,
			-249
		],
		[
			-30,
			-171
		],
		[
			-184,
			-41
		],
		[
			-69,
			153
		],
		[
			-238,
			66
		],
		[
			-281,
			89
		],
		[
			-216,
			377
		],
		[
			-158,
			325
		],
		[
			-144,
			517
		],
		[
			-362,
			259
		],
		[
			-235,
			-169
		],
		[
			-170,
			-195
		],
		[
			35,
			-436
		],
		[
			-218,
			-203
		],
		[
			-155,
			99
		],
		[
			-288,
			25
		]
	],
	[
		[
			89175,
			45193
		],
		[
			-4,
			1925
		],
		[
			-5,
			1925
		]
	],
	[
		[
			92399,
			48417
		],
		[
			106,
			-189
		],
		[
			33,
			-307
		],
		[
			-87,
			-157
		],
		[
			-52,
			348
		],
		[
			-65,
			229
		],
		[
			-126,
			193
		],
		[
			-158,
			252
		],
		[
			-200,
			174
		],
		[
			77,
			143
		],
		[
			150,
			-166
		],
		[
			94,
			-130
		],
		[
			117,
			-142
		],
		[
			111,
			-248
		]
	],
	[
		[
			92027,
			47129
		],
		[
			-152,
			-144
		],
		[
			-142,
			-138
		],
		[
			-148,
			1
		],
		[
			-228,
			171
		],
		[
			-158,
			165
		],
		[
			23,
			183
		],
		[
			249,
			-86
		],
		[
			152,
			46
		],
		[
			42,
			283
		],
		[
			40,
			15
		],
		[
			27,
			-314
		],
		[
			158,
			45
		],
		[
			78,
			202
		],
		[
			155,
			211
		],
		[
			-30,
			348
		],
		[
			166,
			11
		],
		[
			56,
			-97
		],
		[
			-5,
			-327
		],
		[
			-93,
			-361
		],
		[
			-146,
			-48
		],
		[
			-44,
			-166
		]
	],
	[
		[
			92988,
			47425
		],
		[
			84,
			-134
		],
		[
			135,
			-375
		],
		[
			131,
			-200
		],
		[
			-39,
			-166
		],
		[
			-78,
			-59
		],
		[
			-120,
			227
		],
		[
			-122,
			375
		],
		[
			-59,
			450
		],
		[
			38,
			57
		],
		[
			30,
			-175
		]
	],
	[
		[
			89175,
			45193
		],
		[
			-247,
			485
		],
		[
			-282,
			118
		],
		[
			-69,
			-168
		],
		[
			-352,
			-18
		],
		[
			118,
			481
		],
		[
			175,
			164
		],
		[
			-72,
			642
		],
		[
			-134,
			496
		],
		[
			-538,
			500
		],
		[
			-229,
			50
		],
		[
			-417,
			546
		],
		[
			-82,
			-287
		],
		[
			-107,
			-52
		],
		[
			-63,
			216
		],
		[
			-1,
			257
		],
		[
			-212,
			290
		],
		[
			299,
			213
		],
		[
			198,
			-11
		],
		[
			-23,
			156
		],
		[
			-407,
			1
		],
		[
			-110,
			352
		],
		[
			-248,
			109
		],
		[
			-117,
			293
		],
		[
			374,
			143
		],
		[
			142,
			192
		],
		[
			446,
			-242
		],
		[
			44,
			-220
		],
		[
			78,
			-955
		],
		[
			287,
			-354
		],
		[
			232,
			627
		],
		[
			319,
			356
		],
		[
			247,
			1
		],
		[
			238,
			-206
		],
		[
			206,
			-212
		],
		[
			298,
			-113
		]
	],
	[
		[
			84713,
			45326
		],
		[
			28,
			-117
		],
		[
			5,
			-179
		]
	],
	[
		[
			84746,
			45030
		],
		[
			-181,
			-441
		],
		[
			-238,
			-130
		],
		[
			-33,
			71
		],
		[
			25,
			201
		],
		[
			119,
			360
		],
		[
			275,
			235
		]
	],
	[
		[
			87280,
			46506
		],
		[
			-27,
			445
		],
		[
			49,
			212
		],
		[
			58,
			200
		],
		[
			63,
			-173
		],
		[
			0,
			-282
		],
		[
			-143,
			-402
		]
	],
	[
		[
			82744,
			53024
		],
		[
			-158,
			-533
		],
		[
			204,
			-560
		],
		[
			-48,
			-272
		],
		[
			312,
			-546
		],
		[
			-329,
			-70
		],
		[
			-93,
			-403
		],
		[
			12,
			-535
		],
		[
			-267,
			-404
		],
		[
			-7,
			-589
		],
		[
			-107,
			-903
		],
		[
			-41,
			210
		],
		[
			-316,
			-266
		],
		[
			-110,
			361
		],
		[
			-198,
			34
		],
		[
			-139,
			189
		],
		[
			-330,
			-212
		],
		[
			-101,
			285
		],
		[
			-182,
			-32
		],
		[
			-229,
			68
		],
		[
			-43,
			793
		],
		[
			-138,
			164
		],
		[
			-134,
			505
		],
		[
			-38,
			517
		],
		[
			32,
			548
		],
		[
			165,
			392
		]
	],
	[
		[
			80461,
			51765
		],
		[
			47,
			-395
		],
		[
			190,
			-334
		],
		[
			179,
			121
		],
		[
			177,
			-43
		],
		[
			162,
			299
		],
		[
			133,
			52
		],
		[
			263,
			-166
		],
		[
			226,
			126
		],
		[
			143,
			822
		],
		[
			107,
			205
		],
		[
			96,
			672
		],
		[
			319,
			0
		],
		[
			241,
			-100
		]
	],
	[
		[
			85936,
			48924
		],
		[
			305,
			-172
		],
		[
			101,
			-452
		],
		[
			-234,
			244
		],
		[
			-232,
			49
		],
		[
			-157,
			-39
		],
		[
			-192,
			21
		],
		[
			65,
			325
		],
		[
			344,
			24
		]
	],
	[
		[
			85242,
			48340
		],
		[
			-192,
			108
		],
		[
			-54,
			254
		],
		[
			281,
			29
		],
		[
			69,
			-195
		],
		[
			-104,
			-196
		]
	],
	[
		[
			85536,
			51864
		],
		[
			20,
			-322
		],
		[
			164,
			-52
		],
		[
			26,
			-241
		],
		[
			-15,
			-517
		],
		[
			-143,
			58
		],
		[
			-42,
			-359
		],
		[
			114,
			-312
		],
		[
			-78,
			-71
		],
		[
			-112,
			374
		],
		[
			-82,
			755
		],
		[
			56,
			472
		],
		[
			92,
			215
		]
	],
	[
		[
			84146,
			51097
		],
		[
			319,
			25
		],
		[
			275,
			429
		],
		[
			48,
			-132
		],
		[
			-223,
			-587
		],
		[
			-209,
			-113
		],
		[
			-267,
			115
		],
		[
			-463,
			-29
		],
		[
			-243,
			-85
		],
		[
			-39,
			-447
		],
		[
			248,
			-526
		],
		[
			150,
			268
		],
		[
			518,
			201
		],
		[
			-22,
			-272
		],
		[
			-121,
			86
		],
		[
			-121,
			-347
		],
		[
			-245,
			-229
		],
		[
			263,
			-757
		],
		[
			-50,
			-203
		],
		[
			249,
			-682
		],
		[
			-2,
			-388
		],
		[
			-148,
			-173
		],
		[
			-109,
			207
		],
		[
			134,
			484
		],
		[
			-273,
			-229
		],
		[
			-69,
			164
		],
		[
			36,
			228
		],
		[
			-200,
			346
		],
		[
			21,
			576
		],
		[
			-186,
			-179
		],
		[
			24,
			-689
		],
		[
			11,
			-846
		],
		[
			-176,
			-85
		],
		[
			-119,
			173
		],
		[
			79,
			544
		],
		[
			-43,
			570
		],
		[
			-117,
			4
		],
		[
			-86,
			405
		],
		[
			115,
			387
		],
		[
			40,
			469
		],
		[
			139,
			891
		],
		[
			58,
			243
		],
		[
			237,
			439
		],
		[
			217,
			-174
		],
		[
			350,
			-82
		]
	],
	[
		[
			83414,
			44519
		],
		[
			-368,
			414
		],
		[
			259,
			116
		],
		[
			146,
			-180
		],
		[
			97,
			-180
		],
		[
			-17,
			-159
		],
		[
			-117,
			-11
		]
	],
	[
		[
			83705,
			45536
		],
		[
			185,
			45
		],
		[
			249,
			216
		],
		[
			-41,
			-328
		],
		[
			-417,
			-168
		],
		[
			-370,
			73
		],
		[
			0,
			216
		],
		[
			220,
			123
		],
		[
			174,
			-177
		]
	],
	[
		[
			82849,
			45639
		],
		[
			172,
			48
		],
		[
			69,
			-251
		],
		[
			-321,
			-119
		],
		[
			-193,
			-79
		],
		[
			-149,
			5
		],
		[
			95,
			340
		],
		[
			153,
			5
		],
		[
			74,
			209
		],
		[
			100,
			-158
		]
	],
	[
		[
			80134,
			46785
		],
		[
			38,
			-210
		],
		[
			533,
			-59
		],
		[
			61,
			244
		],
		[
			515,
			-284
		],
		[
			101,
			-383
		],
		[
			417,
			-108
		],
		[
			341,
			-351
		],
		[
			-317,
			-225
		],
		[
			-306,
			238
		],
		[
			-251,
			-16
		],
		[
			-288,
			44
		],
		[
			-260,
			106
		],
		[
			-322,
			225
		],
		[
			-204,
			59
		],
		[
			-116,
			-74
		],
		[
			-506,
			243
		],
		[
			-48,
			254
		],
		[
			-255,
			44
		],
		[
			191,
			564
		],
		[
			337,
			-35
		],
		[
			224,
			-231
		],
		[
			115,
			-45
		]
	],
	[
		[
			78991,
			49939
		],
		[
			47,
			-412
		],
		[
			97,
			-330
		],
		[
			204,
			-52
		],
		[
			135,
			-374
		],
		[
			-70,
			-735
		],
		[
			-11,
			-914
		],
		[
			-308,
			-12
		],
		[
			-234,
			494
		],
		[
			-356,
			482
		],
		[
			-119,
			358
		],
		[
			-210,
			481
		],
		[
			-138,
			443
		],
		[
			-212,
			827
		],
		[
			-244,
			493
		],
		[
			-81,
			508
		],
		[
			-103,
			461
		],
		[
			-250,
			372
		],
		[
			-145,
			506
		],
		[
			-209,
			330
		],
		[
			-290,
			652
		],
		[
			-24,
			300
		],
		[
			178,
			-24
		],
		[
			430,
			-114
		],
		[
			246,
			-577
		],
		[
			215,
			-401
		],
		[
			153,
			-246
		],
		[
			263,
			-635
		],
		[
			283,
			-9
		],
		[
			233,
			-405
		],
		[
			161,
			-495
		],
		[
			211,
			-270
		],
		[
			-111,
			-482
		],
		[
			159,
			-205
		],
		[
			100,
			-15
		]
	],
	[
		[
			30935,
			19481
		],
		[
			106,
			-274
		],
		[
			139,
			-443
		],
		[
			361,
			-355
		],
		[
			389,
			-147
		],
		[
			-125,
			-296
		],
		[
			-264,
			-29
		],
		[
			-141,
			208
		]
	],
	[
		[
			31400,
			18145
		],
		[
			-168,
			16
		],
		[
			-297,
			1
		],
		[
			0,
			1319
		]
	],
	[
		[
			33993,
			32727
		],
		[
			-70,
			-473
		],
		[
			-74,
			-607
		],
		[
			3,
			-588
		],
		[
			-61,
			-132
		],
		[
			-21,
			-382
		]
	],
	[
		[
			33770,
			30545
		],
		[
			-19,
			-308
		],
		[
			353,
			-506
		],
		[
			-38,
			-408
		],
		[
			173,
			-257
		],
		[
			-14,
			-289
		],
		[
			-267,
			-757
		],
		[
			-412,
			-317
		],
		[
			-557,
			-123
		],
		[
			-305,
			59
		],
		[
			59,
			-352
		],
		[
			-57,
			-442
		],
		[
			51,
			-298
		],
		[
			-167,
			-208
		],
		[
			-284,
			-82
		],
		[
			-267,
			216
		],
		[
			-108,
			-155
		],
		[
			39,
			-587
		],
		[
			188,
			-178
		],
		[
			152,
			186
		],
		[
			82,
			-307
		],
		[
			-255,
			-183
		],
		[
			-223,
			-367
		],
		[
			-41,
			-595
		],
		[
			-66,
			-316
		],
		[
			-262,
			-2
		],
		[
			-218,
			-302
		],
		[
			-80,
			-443
		],
		[
			273,
			-433
		],
		[
			266,
			-119
		],
		[
			-96,
			-531
		],
		[
			-328,
			-333
		],
		[
			-180,
			-692
		],
		[
			-254,
			-234
		],
		[
			-113,
			-276
		],
		[
			89,
			-614
		],
		[
			185,
			-342
		],
		[
			-117,
			30
		]
	],
	[
		[
			30952,
			19680
		],
		[
			-257,
			93
		],
		[
			-672,
			79
		],
		[
			-115,
			344
		],
		[
			6,
			443
		],
		[
			-185,
			-38
		],
		[
			-98,
			214
		],
		[
			-24,
			626
		],
		[
			213,
			260
		],
		[
			88,
			375
		],
		[
			-33,
			299
		],
		[
			148,
			504
		],
		[
			101,
			782
		],
		[
			-30,
			347
		],
		[
			122,
			112
		],
		[
			-30,
			223
		],
		[
			-129,
			118
		],
		[
			92,
			248
		],
		[
			-126,
			224
		],
		[
			-65,
			682
		],
		[
			112,
			120
		],
		[
			-47,
			720
		],
		[
			65,
			605
		],
		[
			75,
			527
		],
		[
			166,
			215
		],
		[
			-84,
			576
		],
		[
			-1,
			543
		],
		[
			210,
			386
		],
		[
			-7,
			494
		],
		[
			159,
			576
		],
		[
			1,
			544
		],
		[
			-72,
			108
		],
		[
			-128,
			1020
		],
		[
			171,
			607
		],
		[
			-27,
			572
		],
		[
			100,
			537
		],
		[
			182,
			555
		],
		[
			196,
			367
		],
		[
			-83,
			232
		],
		[
			58,
			190
		],
		[
			-9,
			985
		],
		[
			302,
			291
		],
		[
			96,
			614
		],
		[
			-34,
			148
		]
	],
	[
		[
			31359,
			37147
		],
		[
			231,
			534
		],
		[
			364,
			-144
		],
		[
			163,
			-427
		],
		[
			109,
			475
		],
		[
			316,
			-24
		],
		[
			45,
			-127
		]
	],
	[
		[
			32587,
			37434
		],
		[
			511,
			-964
		],
		[
			227,
			-89
		],
		[
			339,
			-437
		],
		[
			286,
			-231
		],
		[
			40,
			-261
		],
		[
			-273,
			-898
		],
		[
			280,
			-160
		],
		[
			312,
			-91
		],
		[
			220,
			95
		],
		[
			252,
			453
		],
		[
			45,
			521
		]
	],
	[
		[
			34826,
			35372
		],
		[
			138,
			114
		],
		[
			139,
			-341
		],
		[
			-6,
			-472
		],
		[
			-234,
			-326
		],
		[
			-186,
			-241
		],
		[
			-314,
			-573
		],
		[
			-370,
			-806
		]
	],
	[
		[
			31400,
			18145
		],
		[
			-92,
			-239
		],
		[
			-238,
			-183
		],
		[
			-137,
			19
		],
		[
			-164,
			48
		],
		[
			-202,
			177
		],
		[
			-291,
			86
		],
		[
			-350,
			330
		],
		[
			-283,
			317
		],
		[
			-383,
			662
		],
		[
			229,
			-124
		],
		[
			390,
			-395
		],
		[
			369,
			-212
		],
		[
			143,
			271
		],
		[
			90,
			405
		],
		[
			256,
			244
		],
		[
			198,
			-70
		]
	],
	[
		[
			30669,
			40193
		],
		[
			136,
			-402
		],
		[
			37,
			-426
		],
		[
			146,
			-250
		],
		[
			-88,
			-572
		],
		[
			150,
			-663
		],
		[
			109,
			-814
		],
		[
			200,
			81
		]
	],
	[
		[
			30952,
			19680
		],
		[
			-247,
			4
		],
		[
			-134,
			-145
		],
		[
			-250,
			-213
		],
		[
			-45,
			-552
		],
		[
			-118,
			-14
		],
		[
			-313,
			192
		],
		[
			-318,
			412
		],
		[
			-346,
			338
		],
		[
			-87,
			374
		],
		[
			79,
			346
		],
		[
			-140,
			393
		],
		[
			-36,
			1007
		],
		[
			119,
			568
		],
		[
			293,
			457
		],
		[
			-422,
			172
		],
		[
			265,
			522
		],
		[
			94,
			982
		],
		[
			309,
			-208
		],
		[
			145,
			1224
		],
		[
			-186,
			157
		],
		[
			-87,
			-738
		],
		[
			-175,
			83
		],
		[
			87,
			845
		],
		[
			95,
			1095
		],
		[
			127,
			404
		],
		[
			-80,
			576
		],
		[
			-22,
			666
		],
		[
			117,
			19
		],
		[
			170,
			954
		],
		[
			192,
			945
		],
		[
			118,
			881
		],
		[
			-64,
			885
		],
		[
			83,
			487
		],
		[
			-34,
			730
		],
		[
			163,
			721
		],
		[
			50,
			1143
		],
		[
			89,
			1227
		],
		[
			87,
			1321
		],
		[
			-20,
			967
		],
		[
			-58,
			832
		]
	],
	[
		[
			30452,
			39739
		],
		[
			143,
			151
		],
		[
			74,
			303
		]
	],
	[
		[
			58538,
			45652
		],
		[
			-109,
			60
		],
		[
			-373,
			-99
		],
		[
			-75,
			-71
		],
		[
			-79,
			-377
		],
		[
			62,
			-261
		],
		[
			-49,
			-699
		],
		[
			-34,
			-593
		],
		[
			75,
			-105
		],
		[
			194,
			-230
		],
		[
			76,
			107
		],
		[
			23,
			-637
		],
		[
			-212,
			5
		],
		[
			-114,
			325
		],
		[
			-103,
			252
		],
		[
			-213,
			82
		],
		[
			-62,
			310
		],
		[
			-170,
			-187
		],
		[
			-222,
			83
		],
		[
			-93,
			268
		],
		[
			-176,
			55
		],
		[
			-131,
			-15
		],
		[
			-15,
			184
		],
		[
			-96,
			15
		]
	],
	[
		[
			56642,
			44124
		],
		[
			-127,
			35
		],
		[
			-172,
			-89
		],
		[
			-121,
			15
		],
		[
			-68,
			-54
		],
		[
			15,
			703
		],
		[
			-93,
			219
		],
		[
			-21,
			363
		],
		[
			41,
			356
		],
		[
			-56,
			228
		],
		[
			-5,
			372
		],
		[
			-337,
			-5
		],
		[
			24,
			213
		],
		[
			-142,
			-2
		],
		[
			-15,
			-103
		],
		[
			-172,
			-23
		],
		[
			-69,
			-344
		],
		[
			-42,
			-148
		],
		[
			-154,
			83
		],
		[
			-91,
			-83
		],
		[
			-184,
			-47
		],
		[
			-106,
			309
		],
		[
			-64,
			191
		],
		[
			-80,
			354
		],
		[
			-68,
			440
		],
		[
			-820,
			8
		],
		[
			-98,
			-71
		],
		[
			-80,
			11
		],
		[
			-115,
			-79
		]
	],
	[
		[
			53422,
			46976
		],
		[
			-39,
			183
		]
	],
	[
		[
			53383,
			47159
		],
		[
			71,
			62
		],
		[
			9,
			258
		],
		[
			45,
			152
		],
		[
			101,
			124
		]
	],
	[
		[
			53609,
			47755
		],
		[
			73,
			-60
		],
		[
			95,
			226
		],
		[
			152,
			-6
		],
		[
			17,
			-167
		],
		[
			104,
			-105
		],
		[
			164,
			370
		],
		[
			161,
			289
		],
		[
			71,
			189
		],
		[
			-10,
			486
		],
		[
			121,
			574
		],
		[
			127,
			304
		],
		[
			183,
			285
		],
		[
			32,
			189
		],
		[
			7,
			216
		],
		[
			45,
			205
		],
		[
			-14,
			335
		],
		[
			34,
			524
		],
		[
			55,
			368
		],
		[
			83,
			316
		],
		[
			16,
			357
		]
	],
	[
		[
			55125,
			52650
		],
		[
			25,
			412
		],
		[
			108,
			300
		],
		[
			149,
			190
		],
		[
			229,
			-200
		],
		[
			177,
			-218
		],
		[
			203,
			-59
		],
		[
			207,
			-115
		],
		[
			83,
			357
		],
		[
			38,
			46
		],
		[
			127,
			-60
		],
		[
			309,
			295
		],
		[
			110,
			-125
		],
		[
			90,
			18
		],
		[
			41,
			143
		],
		[
			104,
			51
		],
		[
			209,
			-62
		],
		[
			178,
			-14
		],
		[
			91,
			63
		]
	],
	[
		[
			57603,
			53672
		],
		[
			169,
			-488
		],
		[
			124,
			-71
		],
		[
			75,
			99
		],
		[
			128,
			-39
		],
		[
			155,
			125
		],
		[
			66,
			-252
		],
		[
			244,
			-393
		]
	],
	[
		[
			58564,
			52653
		],
		[
			-16,
			-691
		],
		[
			111,
			-80
		],
		[
			-89,
			-210
		],
		[
			-107,
			-157
		],
		[
			-106,
			-308
		],
		[
			-59,
			-274
		],
		[
			-15,
			-475
		],
		[
			-65,
			-225
		],
		[
			-2,
			-446
		]
	],
	[
		[
			58216,
			49787
		],
		[
			-80,
			-165
		],
		[
			-10,
			-351
		],
		[
			-38,
			-46
		],
		[
			-26,
			-323
		]
	],
	[
		[
			58062,
			48902
		],
		[
			70,
			-268
		],
		[
			17,
			-713
		]
	],
	[
		[
			61551,
			49585
		],
		[
			-165,
			488
		],
		[
			-3,
			2152
		],
		[
			243,
			670
		]
	],
	[
		[
			61626,
			52895
		],
		[
			76,
			186
		],
		[
			178,
			11
		],
		[
			247,
			417
		],
		[
			362,
			26
		],
		[
			785,
			1773
		]
	],
	[
		[
			63274,
			55308
		],
		[
			194,
			493
		],
		[
			125,
			363
		],
		[
			0,
			308
		],
		[
			0,
			596
		],
		[
			1,
			244
		],
		[
			2,
			9
		]
	],
	[
		[
			63596,
			57321
		],
		[
			89,
			12
		],
		[
			128,
			88
		],
		[
			147,
			59
		],
		[
			132,
			202
		],
		[
			105,
			2
		],
		[
			6,
			-163
		],
		[
			-25,
			-344
		],
		[
			1,
			-310
		],
		[
			-59,
			-214
		],
		[
			-78,
			-639
		],
		[
			-134,
			-659
		],
		[
			-172,
			-755
		],
		[
			-238,
			-866
		],
		[
			-237,
			-661
		],
		[
			-327,
			-806
		],
		[
			-278,
			-479
		],
		[
			-415,
			-586
		],
		[
			-259,
			-450
		],
		[
			-304,
			-715
		],
		[
			-64,
			-312
		],
		[
			-63,
			-140
		]
	],
	[
		[
			59417,
			50018
		],
		[
			-3,
			627
		],
		[
			80,
			239
		],
		[
			137,
			391
		],
		[
			101,
			431
		],
		[
			-123,
			678
		],
		[
			-32,
			296
		],
		[
			-132,
			411
		]
	],
	[
		[
			59445,
			53091
		],
		[
			171,
			352
		],
		[
			188,
			390
		]
	],
	[
		[
			59804,
			53833
		],
		[
			145,
			-99
		],
		[
			0,
			-332
		],
		[
			95,
			-194
		],
		[
			193,
			0
		],
		[
			352,
			-502
		],
		[
			87,
			-6
		],
		[
			65,
			16
		],
		[
			62,
			-68
		],
		[
			185,
			-47
		],
		[
			82,
			247
		],
		[
			254,
			247
		],
		[
			112,
			-200
		],
		[
			190,
			0
		]
	],
	[
		[
			61551,
			49585
		],
		[
			-195,
			-236
		],
		[
			-68,
			-246
		],
		[
			-104,
			-44
		],
		[
			-40,
			-416
		],
		[
			-89,
			-238
		],
		[
			-54,
			-393
		],
		[
			-112,
			-195
		]
	],
	[
		[
			56824,
			55442
		],
		[
			-212,
			258
		],
		[
			-96,
			170
		],
		[
			-18,
			184
		],
		[
			45,
			246
		],
		[
			-1,
			241
		],
		[
			-160,
			369
		],
		[
			-31,
			253
		]
	],
	[
		[
			56351,
			57163
		],
		[
			3,
			143
		],
		[
			-102,
			174
		],
		[
			-3,
			343
		],
		[
			-58,
			228
		],
		[
			-98,
			-34
		],
		[
			28,
			217
		],
		[
			72,
			246
		],
		[
			-32,
			245
		],
		[
			92,
			181
		],
		[
			-58,
			138
		],
		[
			73,
			365
		],
		[
			127,
			435
		],
		[
			240,
			-41
		],
		[
			-14,
			2345
		]
	],
	[
		[
			56621,
			62148
		],
		[
			3,
			248
		],
		[
			320,
			2
		],
		[
			0,
			1180
		]
	],
	[
		[
			56944,
			63578
		],
		[
			1117,
			0
		],
		[
			1077,
			0
		],
		[
			1102,
			0
		]
	],
	[
		[
			60240,
			63578
		],
		[
			90,
			-580
		],
		[
			-61,
			-107
		],
		[
			40,
			-608
		],
		[
			102,
			-706
		],
		[
			106,
			-145
		],
		[
			152,
			-219
		]
	],
	[
		[
			60669,
			61213
		],
		[
			-141,
			-337
		],
		[
			-204,
			-97
		],
		[
			-88,
			-181
		],
		[
			-27,
			-393
		],
		[
			-120,
			-868
		],
		[
			30,
			-236
		]
	],
	[
		[
			60119,
			59101
		],
		[
			-45,
			-508
		],
		[
			-112,
			-582
		],
		[
			-168,
			-293
		],
		[
			-119,
			-451
		],
		[
			-28,
			-241
		],
		[
			-132,
			-166
		],
		[
			-82,
			-618
		],
		[
			4,
			-531
		]
	],
	[
		[
			59437,
			55711
		],
		[
			-3,
			460
		],
		[
			-39,
			12
		],
		[
			5,
			294
		],
		[
			-33,
			203
		],
		[
			-143,
			233
		],
		[
			-34,
			426
		],
		[
			34,
			436
		],
		[
			-129,
			41
		],
		[
			-19,
			-132
		],
		[
			-167,
			-30
		],
		[
			67,
			-173
		],
		[
			23,
			-355
		],
		[
			-152,
			-324
		],
		[
			-138,
			-426
		],
		[
			-144,
			-61
		],
		[
			-233,
			345
		],
		[
			-105,
			-122
		],
		[
			-29,
			-172
		],
		[
			-143,
			-112
		],
		[
			-9,
			-122
		],
		[
			-277,
			0
		],
		[
			-38,
			122
		],
		[
			-200,
			20
		],
		[
			-100,
			-101
		],
		[
			-77,
			51
		],
		[
			-143,
			344
		],
		[
			-48,
			163
		],
		[
			-200,
			-81
		],
		[
			-76,
			-274
		],
		[
			-72,
			-528
		],
		[
			-95,
			-111
		],
		[
			-85,
			-65
		],
		[
			189,
			-230
		]
	],
	[
		[
			56351,
			57163
		],
		[
			-176,
			-101
		],
		[
			-141,
			-239
		],
		[
			-201,
			-645
		],
		[
			-261,
			-273
		],
		[
			-269,
			36
		],
		[
			-78,
			-54
		],
		[
			28,
			-208
		],
		[
			-145,
			-207
		],
		[
			-118,
			-230
		],
		[
			-350,
			-226
		],
		[
			-69,
			134
		],
		[
			-46,
			11
		],
		[
			-52,
			-152
		],
		[
			-229,
			-44
		]
	],
	[
		[
			54244,
			54965
		],
		[
			43,
			160
		],
		[
			-87,
			407
		],
		[
			-39,
			245
		],
		[
			-121,
			100
		],
		[
			-164,
			345
		],
		[
			60,
			279
		],
		[
			127,
			-60
		],
		[
			78,
			42
		],
		[
			155,
			-6
		],
		[
			-151,
			537
		],
		[
			10,
			393
		],
		[
			-18,
			392
		],
		[
			-111,
			378
		]
	],
	[
		[
			54026,
			58177
		],
		[
			28,
			279
		],
		[
			-178,
			13
		],
		[
			0,
			380
		],
		[
			-115,
			219
		],
		[
			120,
			778
		],
		[
			354,
			557
		],
		[
			15,
			769
		],
		[
			107,
			1199
		],
		[
			60,
			254
		],
		[
			-116,
			203
		],
		[
			-4,
			188
		],
		[
			-104,
			153
		],
		[
			-68,
			919
		]
	],
	[
		[
			54125,
			64088
		],
		[
			280,
			323
		],
		[
			1108,
			-1132
		],
		[
			1108,
			-1131
		]
	],
	[
		[
			30080,
			62227
		],
		[
			24,
			-321
		],
		[
			-21,
			-228
		],
		[
			-68,
			-99
		],
		[
			71,
			-177
		],
		[
			-5,
			-161
		]
	],
	[
		[
			30081,
			61241
		],
		[
			-185,
			100
		],
		[
			-131,
			-41
		],
		[
			-169,
			43
		],
		[
			-130,
			-110
		],
		[
			-149,
			184
		],
		[
			24,
			190
		],
		[
			256,
			-82
		],
		[
			210,
			-47
		],
		[
			100,
			131
		],
		[
			-127,
			256
		],
		[
			2,
			226
		],
		[
			-175,
			92
		],
		[
			62,
			163
		],
		[
			170,
			-26
		],
		[
			241,
			-93
		]
	],
	[
		[
			30080,
			62227
		],
		[
			34,
			101
		],
		[
			217,
			-3
		],
		[
			165,
			-152
		],
		[
			73,
			15
		],
		[
			50,
			-209
		],
		[
			152,
			11
		],
		[
			-9,
			-176
		],
		[
			124,
			-21
		],
		[
			136,
			-217
		],
		[
			-103,
			-240
		],
		[
			-132,
			128
		],
		[
			-127,
			-25
		],
		[
			-92,
			28
		],
		[
			-50,
			-107
		],
		[
			-106,
			-37
		],
		[
			-43,
			144
		],
		[
			-92,
			-85
		],
		[
			-111,
			-405
		],
		[
			-71,
			94
		],
		[
			-14,
			170
		]
	],
	[
		[
			76049,
			98451
		],
		[
			600,
			133
		],
		[
			540,
			-297
		],
		[
			640,
			-572
		],
		[
			-69,
			-531
		],
		[
			-606,
			-73
		],
		[
			-773,
			170
		],
		[
			-462,
			226
		],
		[
			-213,
			423
		],
		[
			-379,
			117
		],
		[
			722,
			404
		]
	],
	[
		[
			78565,
			97421
		],
		[
			704,
			-336
		],
		[
			-82,
			-240
		],
		[
			-1566,
			-228
		],
		[
			507,
			776
		],
		[
			229,
			66
		],
		[
			208,
			-38
		]
	],
	[
		[
			88563,
			95563
		],
		[
			734,
			-26
		],
		[
			1004,
			-313
		],
		[
			-219,
			-439
		],
		[
			-1023,
			16
		],
		[
			-461,
			-139
		],
		[
			-550,
			384
		],
		[
			149,
			406
		],
		[
			366,
			111
		]
	],
	[
		[
			91172,
			95096
		],
		[
			697,
			-155
		],
		[
			-321,
			-234
		],
		[
			-444,
			53
		],
		[
			-516,
			233
		],
		[
			66,
			192
		],
		[
			518,
			-89
		]
	],
	[
		[
			88850,
			93928
		],
		[
			263,
			234
		],
		[
			348,
			54
		],
		[
			394,
			-226
		],
		[
			34,
			-155
		],
		[
			-421,
			-4
		],
		[
			-569,
			66
		],
		[
			-49,
			31
		]
	],
	[
		[
			62457,
			98194
		],
		[
			542,
			107
		],
		[
			422,
			8
		],
		[
			57,
			-160
		],
		[
			159,
			142
		],
		[
			262,
			97
		],
		[
			412,
			-129
		],
		[
			-107,
			-90
		],
		[
			-373,
			-78
		],
		[
			-250,
			-45
		],
		[
			-39,
			-97
		],
		[
			-324,
			-98
		],
		[
			-301,
			140
		],
		[
			158,
			185
		],
		[
			-618,
			18
		]
	],
	[
		[
			56314,
			82678
		],
		[
			-511,
			-9
		],
		[
			-342,
			67
		]
	],
	[
		[
			55461,
			82736
		],
		[
			63,
			260
		],
		[
			383,
			191
		]
	],
	[
		[
			55907,
			83187
		],
		[
			291,
			-103
		],
		[
			123,
			-94
		],
		[
			-30,
			-162
		],
		[
			23,
			-150
		]
	],
	[
		[
			64863,
			94153
		],
		[
			665,
			518
		],
		[
			-75,
			268
		],
		[
			621,
			312
		],
		[
			917,
			380
		],
		[
			925,
			110
		],
		[
			475,
			220
		],
		[
			541,
			76
		],
		[
			193,
			-233
		],
		[
			-187,
			-184
		],
		[
			-984,
			-293
		],
		[
			-848,
			-282
		],
		[
			-863,
			-562
		],
		[
			-414,
			-577
		],
		[
			-435,
			-568
		],
		[
			56,
			-491
		],
		[
			531,
			-484
		],
		[
			-164,
			-52
		],
		[
			-907,
			77
		],
		[
			-74,
			262
		],
		[
			-503,
			158
		],
		[
			-40,
			320
		],
		[
			284,
			126
		],
		[
			-10,
			323
		],
		[
			551,
			503
		],
		[
			-255,
			73
		]
	],
	[
		[
			89698,
			82309
		],
		[
			96,
			-569
		],
		[
			-7,
			-581
		],
		[
			114,
			-597
		],
		[
			280,
			-1046
		],
		[
			-411,
			195
		],
		[
			-171,
			-854
		],
		[
			271,
			-605
		],
		[
			-8,
			-413
		],
		[
			-211,
			356
		],
		[
			-182,
			-457
		],
		[
			-51,
			496
		],
		[
			31,
			575
		],
		[
			-32,
			638
		],
		[
			64,
			446
		],
		[
			13,
			790
		],
		[
			-163,
			581
		],
		[
			24,
			808
		],
		[
			257,
			271
		],
		[
			-110,
			274
		],
		[
			123,
			83
		],
		[
			73,
			-391
		]
	],
	[
		[
			86327,
			75524
		],
		[
			-39,
			104
		]
	],
	[
		[
			86288,
			75628
		],
		[
			-2,
			300
		],
		[
			142,
			16
		],
		[
			40,
			698
		],
		[
			-73,
			506
		],
		[
			238,
			208
		],
		[
			338,
			-104
		],
		[
			186,
			575
		],
		[
			96,
			647
		],
		[
			107,
			216
		],
		[
			146,
			532
		],
		[
			-459,
			-175
		],
		[
			-240,
			-233
		],
		[
			-423,
			1
		],
		[
			-112,
			555
		],
		[
			-329,
			420
		],
		[
			-483,
			189
		],
		[
			-103,
			579
		],
		[
			-97,
			363
		],
		[
			-104,
			254
		],
		[
			-172,
			596
		],
		[
			-244,
			217
		],
		[
			-415,
			176
		],
		[
			-369,
			-16
		],
		[
			-345,
			-106
		],
		[
			-229,
			-294
		],
		[
			152,
			-141
		],
		[
			4,
			-326
		],
		[
			-155,
			-189
		],
		[
			-251,
			-627
		],
		[
			3,
			-260
		],
		[
			-392,
			-373
		],
		[
			-333,
			223
		]
	],
	[
		[
			82410,
			80055
		],
		[
			-331,
			-49
		],
		[
			-146,
			198
		],
		[
			-166,
			63
		],
		[
			-407,
			-416
		],
		[
			-366,
			-98
		],
		[
			-255,
			-146
		],
		[
			-350,
			96
		],
		[
			-258,
			-6
		],
		[
			-168,
			302
		],
		[
			-272,
			284
		],
		[
			-279,
			78
		],
		[
			-351,
			-78
		],
		[
			-263,
			-109
		],
		[
			-394,
			248
		],
		[
			-53,
			443
		],
		[
			-327,
			152
		],
		[
			-252,
			69
		],
		[
			-311,
			244
		],
		[
			-288,
			-612
		],
		[
			113,
			-348
		],
		[
			-270,
			-411
		],
		[
			-402,
			148
		],
		[
			-277,
			22
		],
		[
			-186,
			276
		],
		[
			-289,
			8
		],
		[
			-242,
			182
		],
		[
			-423,
			-278
		],
		[
			-530,
			-509
		],
		[
			-292,
			-102
		]
	],
	[
		[
			74375,
			79706
		],
		[
			-109,
			-49
		]
	],
	[
		[
			63639,
			77993
		],
		[
			-127,
			-350
		],
		[
			-269,
			-97
		],
		[
			-276,
			-610
		],
		[
			252,
			-561
		],
		[
			-27,
			-398
		],
		[
			303,
			-696
		]
	],
	[
		[
			63495,
			75281
		],
		[
			-166,
			-238
		],
		[
			-48,
			-150
		],
		[
			-122,
			40
		],
		[
			-191,
			359
		],
		[
			-78,
			20
		]
	],
	[
		[
			62890,
			75312
		],
		[
			-175,
			137
		],
		[
			-85,
			242
		],
		[
			-259,
			124
		],
		[
			-169,
			-93
		],
		[
			-48,
			110
		],
		[
			-378,
			283
		],
		[
			-409,
			96
		],
		[
			-235,
			101
		],
		[
			-34,
			-70
		]
	],
	[
		[
			61098,
			76242
		],
		[
			-354,
			499
		],
		[
			-317,
			223
		],
		[
			-240,
			347
		],
		[
			202,
			95
		],
		[
			231,
			494
		],
		[
			-156,
			234
		],
		[
			410,
			241
		],
		[
			-8,
			129
		],
		[
			-249,
			-95
		]
	],
	[
		[
			60617,
			78409
		],
		[
			9,
			262
		],
		[
			143,
			165
		],
		[
			269,
			43
		],
		[
			44,
			197
		],
		[
			-62,
			326
		],
		[
			113,
			310
		],
		[
			-3,
			173
		],
		[
			-410,
			192
		],
		[
			-162,
			-6
		],
		[
			-172,
			277
		],
		[
			-213,
			-94
		],
		[
			-352,
			208
		],
		[
			6,
			116
		],
		[
			-99,
			256
		],
		[
			-222,
			29
		],
		[
			-23,
			183
		],
		[
			70,
			120
		],
		[
			-178,
			334
		],
		[
			-288,
			-57
		],
		[
			-84,
			30
		],
		[
			-70,
			-134
		],
		[
			-104,
			23
		]
	],
	[
		[
			58829,
			81362
		],
		[
			-68,
			379
		],
		[
			-66,
			196
		],
		[
			54,
			55
		],
		[
			224,
			-20
		],
		[
			108,
			129
		],
		[
			-80,
			157
		],
		[
			-187,
			104
		],
		[
			16,
			107
		],
		[
			-113,
			108
		],
		[
			-174,
			387
		],
		[
			60,
			159
		],
		[
			-27,
			277
		],
		[
			-272,
			141
		],
		[
			-146,
			-70
		],
		[
			-39,
			146
		],
		[
			-293,
			149
		]
	],
	[
		[
			57826,
			83766
		],
		[
			-89,
			348
		],
		[
			-24,
			287
		],
		[
			-134,
			136
		]
	],
	[
		[
			57579,
			84537
		],
		[
			120,
			187
		],
		[
			-83,
			551
		],
		[
			198,
			341
		],
		[
			-42,
			103
		]
	],
	[
		[
			57772,
			85719
		],
		[
			316,
			327
		],
		[
			-291,
			280
		]
	],
	[
		[
			57797,
			86326
		],
		[
			594,
			755
		],
		[
			258,
			341
		],
		[
			105,
			301
		],
		[
			-411,
			405
		],
		[
			113,
			385
		],
		[
			-250,
			440
		],
		[
			187,
			506
		],
		[
			-323,
			673
		],
		[
			256,
			445
		],
		[
			-425,
			394
		],
		[
			41,
			414
		]
	],
	[
		[
			57942,
			91385
		],
		[
			224,
			54
		],
		[
			473,
			237
		]
	],
	[
		[
			58639,
			91676
		],
		[
			286,
			206
		],
		[
			456,
			-358
		],
		[
			761,
			-140
		],
		[
			1050,
			-668
		],
		[
			213,
			-281
		],
		[
			18,
			-393
		],
		[
			-308,
			-311
		],
		[
			-454,
			-157
		],
		[
			-1240,
			449
		],
		[
			-204,
			-75
		],
		[
			453,
			-433
		],
		[
			18,
			-274
		],
		[
			18,
			-604
		],
		[
			358,
			-180
		],
		[
			217,
			-153
		],
		[
			36,
			286
		],
		[
			-168,
			254
		],
		[
			177,
			224
		],
		[
			672,
			-368
		],
		[
			233,
			144
		],
		[
			-186,
			433
		],
		[
			647,
			578
		],
		[
			256,
			-34
		],
		[
			260,
			-206
		],
		[
			161,
			406
		],
		[
			-231,
			352
		],
		[
			136,
			353
		],
		[
			-204,
			367
		],
		[
			777,
			-190
		],
		[
			158,
			-331
		],
		[
			-351,
			-73
		],
		[
			1,
			-328
		],
		[
			219,
			-203
		],
		[
			429,
			128
		],
		[
			68,
			377
		],
		[
			580,
			282
		],
		[
			970,
			507
		],
		[
			209,
			-29
		],
		[
			-273,
			-359
		],
		[
			344,
			-61
		],
		[
			199,
			202
		],
		[
			521,
			16
		],
		[
			412,
			245
		],
		[
			317,
			-356
		],
		[
			315,
			391
		],
		[
			-291,
			343
		],
		[
			145,
			195
		],
		[
			820,
			-179
		],
		[
			385,
			-185
		],
		[
			1006,
			-675
		],
		[
			186,
			309
		],
		[
			-282,
			313
		],
		[
			-8,
			125
		],
		[
			-335,
			58
		],
		[
			92,
			280
		],
		[
			-149,
			461
		],
		[
			-8,
			189
		],
		[
			512,
			535
		],
		[
			183,
			537
		],
		[
			206,
			116
		],
		[
			736,
			-156
		],
		[
			57,
			-328
		],
		[
			-263,
			-479
		],
		[
			173,
			-189
		],
		[
			89,
			-413
		],
		[
			-63,
			-809
		],
		[
			307,
			-362
		],
		[
			-120,
			-395
		],
		[
			-544,
			-839
		],
		[
			318,
			-87
		],
		[
			110,
			213
		],
		[
			306,
			151
		],
		[
			74,
			293
		],
		[
			240,
			281
		],
		[
			-162,
			336
		],
		[
			130,
			390
		],
		[
			-304,
			49
		],
		[
			-67,
			328
		],
		[
			222,
			593
		],
		[
			-361,
			482
		],
		[
			497,
			398
		],
		[
			-64,
			421
		],
		[
			139,
			13
		],
		[
			145,
			-328
		],
		[
			-109,
			-570
		],
		[
			297,
			-108
		],
		[
			-127,
			426
		],
		[
			465,
			233
		],
		[
			577,
			31
		],
		[
			513,
			-337
		],
		[
			-247,
			492
		],
		[
			-28,
			630
		],
		[
			483,
			119
		],
		[
			669,
			-26
		],
		[
			602,
			77
		],
		[
			-226,
			309
		],
		[
			321,
			388
		],
		[
			319,
			16
		],
		[
			540,
			293
		],
		[
			734,
			79
		],
		[
			93,
			162
		],
		[
			729,
			55
		],
		[
			227,
			-133
		],
		[
			624,
			314
		],
		[
			510,
			-10
		],
		[
			77,
			255
		],
		[
			265,
			252
		],
		[
			656,
			242
		],
		[
			476,
			-191
		],
		[
			-378,
			-146
		],
		[
			629,
			-90
		],
		[
			75,
			-292
		],
		[
			254,
			143
		],
		[
			812,
			-7
		],
		[
			626,
			-289
		],
		[
			223,
			-221
		],
		[
			-69,
			-307
		],
		[
			-307,
			-175
		],
		[
			-730,
			-328
		],
		[
			-209,
			-175
		],
		[
			345,
			-83
		],
		[
			410,
			-149
		],
		[
			251,
			112
		],
		[
			141,
			-379
		],
		[
			122,
			153
		],
		[
			444,
			93
		],
		[
			892,
			-97
		],
		[
			67,
			-276
		],
		[
			1162,
			-88
		],
		[
			15,
			451
		],
		[
			590,
			-104
		],
		[
			443,
			4
		],
		[
			449,
			-312
		],
		[
			128,
			-378
		],
		[
			-165,
			-247
		],
		[
			349,
			-465
		],
		[
			437,
			-240
		],
		[
			268,
			620
		],
		[
			446,
			-266
		],
		[
			473,
			159
		],
		[
			538,
			-182
		],
		[
			204,
			166
		],
		[
			455,
			-83
		],
		[
			-201,
			549
		],
		[
			367,
			256
		],
		[
			2509,
			-384
		],
		[
			236,
			-351
		],
		[
			727,
			-451
		],
		[
			1122,
			112
		],
		[
			553,
			-98
		],
		[
			231,
			-244
		],
		[
			-33,
			-432
		],
		[
			342,
			-168
		],
		[
			372,
			121
		],
		[
			492,
			15
		],
		[
			525,
			-116
		],
		[
			526,
			66
		],
		[
			484,
			-526
		],
		[
			344,
			189
		],
		[
			-224,
			378
		],
		[
			123,
			262
		],
		[
			886,
			-165
		],
		[
			578,
			36
		],
		[
			799,
			-282
		],
		[
			-99610,
			-258
		],
		[
			681,
			-451
		],
		[
			728,
			-588
		],
		[
			-24,
			-367
		],
		[
			187,
			-147
		],
		[
			-64,
			429
		],
		[
			754,
			-88
		],
		[
			544,
			-553
		],
		[
			-276,
			-257
		],
		[
			-455,
			-61
		],
		[
			-7,
			-578
		],
		[
			-111,
			-122
		],
		[
			-260,
			17
		],
		[
			-212,
			206
		],
		[
			-369,
			172
		],
		[
			-62,
			257
		],
		[
			-283,
			96
		],
		[
			-315,
			-76
		],
		[
			-151,
			207
		],
		[
			60,
			219
		],
		[
			-333,
			-140
		],
		[
			126,
			-278
		],
		[
			-158,
			-251
		],
		[
			99997,
			-3
		],
		[
			-357,
			-260
		],
		[
			-360,
			44
		],
		[
			250,
			-315
		],
		[
			166,
			-487
		],
		[
			128,
			-159
		],
		[
			32,
			-244
		],
		[
			-71,
			-157
		],
		[
			-518,
			129
		],
		[
			-777,
			-445
		],
		[
			-247,
			-69
		],
		[
			-425,
			-415
		],
		[
			-403,
			-362
		],
		[
			-102,
			-269
		],
		[
			-397,
			409
		],
		[
			-724,
			-464
		],
		[
			-126,
			219
		],
		[
			-268,
			-253
		],
		[
			-371,
			81
		],
		[
			-90,
			-388
		],
		[
			-333,
			-572
		],
		[
			10,
			-239
		],
		[
			316,
			-132
		],
		[
			-37,
			-860
		],
		[
			-258,
			-22
		],
		[
			-119,
			-494
		],
		[
			116,
			-255
		],
		[
			-486,
			-302
		],
		[
			-96,
			-674
		],
		[
			-415,
			-144
		],
		[
			-83,
			-600
		],
		[
			-400,
			-551
		],
		[
			-103,
			407
		],
		[
			-119,
			862
		],
		[
			-155,
			1313
		],
		[
			134,
			819
		],
		[
			234,
			353
		],
		[
			14,
			276
		],
		[
			432,
			132
		],
		[
			496,
			744
		],
		[
			479,
			608
		],
		[
			499,
			471
		],
		[
			223,
			833
		],
		[
			-337,
			-50
		],
		[
			-167,
			-487
		],
		[
			-705,
			-649
		],
		[
			-227,
			727
		],
		[
			-717,
			-201
		],
		[
			-696,
			-990
		],
		[
			230,
			-362
		],
		[
			-620,
			-154
		],
		[
			-430,
			-61
		],
		[
			20,
			427
		],
		[
			-431,
			90
		],
		[
			-344,
			-291
		],
		[
			-850,
			102
		],
		[
			-914,
			-175
		],
		[
			-899,
			-1153
		],
		[
			-1065,
			-1394
		],
		[
			438,
			-74
		],
		[
			136,
			-370
		],
		[
			270,
			-132
		],
		[
			178,
			295
		],
		[
			305,
			-38
		],
		[
			401,
			-650
		],
		[
			9,
			-503
		],
		[
			-217,
			-590
		],
		[
			-23,
			-705
		],
		[
			-126,
			-945
		],
		[
			-418,
			-855
		],
		[
			-94,
			-409
		],
		[
			-377,
			-688
		],
		[
			-374,
			-682
		],
		[
			-179,
			-349
		],
		[
			-370,
			-346
		],
		[
			-175,
			-8
		],
		[
			-175,
			287
		],
		[
			-373,
			-432
		],
		[
			-43,
			-197
		]
	],
	[
		[
			0,
			92833
		],
		[
			36,
			24
		],
		[
			235,
			-1
		],
		[
			402,
			-169
		],
		[
			-24,
			-81
		],
		[
			-286,
			-141
		],
		[
			-363,
			-36
		],
		[
			99694,
			-30
		],
		[
			-49,
			187
		],
		[
			-99645,
			247
		]
	],
	[
		[
			59287,
			77741
		],
		[
			73,
			146
		],
		[
			198,
			-127
		],
		[
			89,
			-23
		],
		[
			36,
			-117
		],
		[
			42,
			-18
		]
	],
	[
		[
			59725,
			77602
		],
		[
			2,
			-51
		],
		[
			136,
			-142
		],
		[
			284,
			35
		],
		[
			-55,
			-210
		],
		[
			-304,
			-103
		],
		[
			-377,
			-342
		],
		[
			-154,
			121
		],
		[
			61,
			277
		],
		[
			-304,
			173
		],
		[
			50,
			113
		],
		[
			265,
			197
		],
		[
			-42,
			71
		]
	],
	[
		[
			28061,
			66408
		],
		[
			130,
			47
		],
		[
			184,
			-18
		],
		[
			8,
			-153
		],
		[
			-303,
			-95
		],
		[
			-19,
			219
		]
	],
	[
		[
			28391,
			66555
		],
		[
			220,
			-265
		],
		[
			-48,
			-420
		],
		[
			-51,
			75
		],
		[
			4,
			309
		],
		[
			-124,
			234
		],
		[
			-1,
			67
		]
	],
	[
		[
			28280,
			65474
		],
		[
			84,
			-23
		],
		[
			97,
			-491
		],
		[
			1,
			-343
		],
		[
			-68,
			-29
		],
		[
			-70,
			340
		],
		[
			-104,
			171
		],
		[
			60,
			375
		]
	],
	[
		[
			33000,
			19946
		],
		[
			333,
			354
		],
		[
			236,
			-148
		],
		[
			167,
			237
		],
		[
			222,
			-266
		],
		[
			-83,
			-207
		],
		[
			-375,
			-177
		],
		[
			-125,
			207
		],
		[
			-236,
			-266
		],
		[
			-139,
			266
		]
	],
	[
		[
			54206,
			97653
		],
		[
			105,
			202
		],
		[
			408,
			20
		],
		[
			350,
			-206
		],
		[
			915,
			-440
		],
		[
			-699,
			-233
		],
		[
			-155,
			-435
		],
		[
			-243,
			-111
		],
		[
			-132,
			-490
		],
		[
			-335,
			-23
		],
		[
			-598,
			361
		],
		[
			252,
			210
		],
		[
			-416,
			170
		],
		[
			-541,
			499
		],
		[
			-216,
			463
		],
		[
			757,
			212
		],
		[
			152,
			-207
		],
		[
			396,
			8
		]
	],
	[
		[
			57942,
			91385
		],
		[
			117,
			414
		],
		[
			-356,
			235
		],
		[
			-431,
			-200
		],
		[
			-137,
			-433
		],
		[
			-265,
			-262
		],
		[
			-298,
			143
		],
		[
			-362,
			-29
		],
		[
			-309,
			312
		],
		[
			-167,
			-156
		]
	],
	[
		[
			55734,
			91409
		],
		[
			-172,
			-24
		],
		[
			-41,
			-389
		],
		[
			-523,
			95
		],
		[
			-74,
			-329
		],
		[
			-267,
			2
		],
		[
			-183,
			-421
		],
		[
			-278,
			-655
		],
		[
			-431,
			-831
		],
		[
			101,
			-202
		],
		[
			-97,
			-234
		],
		[
			-275,
			10
		],
		[
			-180,
			-554
		],
		[
			17,
			-784
		],
		[
			177,
			-300
		],
		[
			-92,
			-694
		],
		[
			-231,
			-405
		],
		[
			-122,
			-341
		]
	],
	[
		[
			53063,
			85353
		],
		[
			-187,
			363
		],
		[
			-548,
			-684
		],
		[
			-371,
			-138
		],
		[
			-384,
			301
		],
		[
			-99,
			635
		],
		[
			-88,
			1363
		],
		[
			256,
			381
		],
		[
			733,
			496
		],
		[
			549,
			609
		],
		[
			508,
			824
		],
		[
			668,
			1141
		],
		[
			465,
			444
		],
		[
			763,
			741
		],
		[
			610,
			259
		],
		[
			457,
			-31
		],
		[
			423,
			489
		],
		[
			506,
			-26
		],
		[
			499,
			118
		],
		[
			869,
			-433
		],
		[
			-358,
			-158
		],
		[
			305,
			-371
		]
	],
	[
		[
			57613,
			97879
		],
		[
			-412,
			-318
		],
		[
			-806,
			-70
		],
		[
			-819,
			98
		],
		[
			-50,
			163
		],
		[
			-398,
			11
		],
		[
			-304,
			271
		],
		[
			858,
			165
		],
		[
			403,
			-142
		],
		[
			281,
			177
		],
		[
			702,
			-148
		],
		[
			545,
			-207
		]
	],
	[
		[
			56867,
			96577
		],
		[
			-620,
			-241
		],
		[
			-490,
			137
		],
		[
			191,
			152
		],
		[
			-167,
			189
		],
		[
			575,
			119
		],
		[
			110,
			-222
		],
		[
			401,
			-134
		]
	],
	[
		[
			37010,
			99398
		],
		[
			932,
			353
		],
		[
			975,
			-27
		],
		[
			354,
			218
		],
		[
			982,
			57
		],
		[
			2219,
			-74
		],
		[
			1737,
			-469
		],
		[
			-513,
			-227
		],
		[
			-1062,
			-26
		],
		[
			-1496,
			-58
		],
		[
			140,
			-105
		],
		[
			984,
			65
		],
		[
			836,
			-204
		],
		[
			540,
			181
		],
		[
			231,
			-212
		],
		[
			-305,
			-344
		],
		[
			707,
			220
		],
		[
			1348,
			229
		],
		[
			833,
			-114
		],
		[
			156,
			-253
		],
		[
			-1132,
			-420
		],
		[
			-157,
			-136
		],
		[
			-888,
			-102
		],
		[
			643,
			-28
		],
		[
			-324,
			-431
		],
		[
			-224,
			-383
		],
		[
			9,
			-658
		],
		[
			333,
			-386
		],
		[
			-434,
			-24
		],
		[
			-457,
			-187
		],
		[
			513,
			-313
		],
		[
			65,
			-502
		],
		[
			-297,
			-55
		],
		[
			360,
			-508
		],
		[
			-617,
			-42
		],
		[
			322,
			-241
		],
		[
			-91,
			-208
		],
		[
			-391,
			-91
		],
		[
			-388,
			-2
		],
		[
			348,
			-400
		],
		[
			4,
			-263
		],
		[
			-549,
			244
		],
		[
			-143,
			-158
		],
		[
			375,
			-148
		],
		[
			364,
			-361
		],
		[
			105,
			-476
		],
		[
			-495,
			-114
		],
		[
			-214,
			228
		],
		[
			-344,
			340
		],
		[
			95,
			-401
		],
		[
			-322,
			-311
		],
		[
			732,
			-25
		],
		[
			383,
			-32
		],
		[
			-745,
			-515
		],
		[
			-755,
			-466
		],
		[
			-813,
			-204
		],
		[
			-306,
			-2
		],
		[
			-288,
			-228
		],
		[
			-386,
			-624
		],
		[
			-597,
			-414
		],
		[
			-192,
			-24
		],
		[
			-370,
			-145
		],
		[
			-399,
			-138
		],
		[
			-238,
			-365
		],
		[
			-4,
			-415
		],
		[
			-141,
			-388
		],
		[
			-453,
			-472
		],
		[
			112,
			-462
		],
		[
			-125,
			-488
		],
		[
			-142,
			-577
		],
		[
			-391,
			-36
		],
		[
			-410,
			482
		],
		[
			-556,
			3
		],
		[
			-269,
			324
		],
		[
			-186,
			577
		],
		[
			-481,
			735
		],
		[
			-141,
			385
		],
		[
			-38,
			530
		],
		[
			-384,
			546
		],
		[
			100,
			435
		],
		[
			-186,
			208
		],
		[
			275,
			691
		],
		[
			418,
			220
		],
		[
			110,
			247
		],
		[
			58,
			461
		],
		[
			-318,
			-209
		],
		[
			-151,
			-88
		],
		[
			-249,
			-84
		],
		[
			-341,
			193
		],
		[
			-19,
			401
		],
		[
			109,
			314
		],
		[
			258,
			9
		],
		[
			567,
			-157
		],
		[
			-478,
			375
		],
		[
			-249,
			202
		],
		[
			-276,
			-83
		],
		[
			-232,
			147
		],
		[
			310,
			550
		],
		[
			-169,
			220
		],
		[
			-220,
			409
		],
		[
			-335,
			626
		],
		[
			-353,
			230
		],
		[
			3,
			247
		],
		[
			-745,
			346
		],
		[
			-590,
			43
		],
		[
			-743,
			-24
		],
		[
			-677,
			-44
		],
		[
			-323,
			188
		],
		[
			-482,
			372
		],
		[
			729,
			186
		],
		[
			559,
			31
		],
		[
			-1188,
			154
		],
		[
			-627,
			241
		],
		[
			39,
			229
		],
		[
			1051,
			285
		],
		[
			1018,
			284
		],
		[
			107,
			214
		],
		[
			-750,
			213
		],
		[
			243,
			235
		],
		[
			961,
			413
		],
		[
			404,
			63
		],
		[
			-115,
			265
		],
		[
			658,
			156
		],
		[
			854,
			93
		],
		[
			853,
			5
		],
		[
			303,
			-184
		],
		[
			737,
			325
		],
		[
			663,
			-221
		],
		[
			390,
			-46
		],
		[
			577,
			-192
		],
		[
			-660,
			318
		],
		[
			38,
			253
		]
	],
	[
		[
			69148,
			21851
		],
		[
			179,
			-186
		],
		[
			263,
			-74
		],
		[
			9,
			-112
		],
		[
			-77,
			-269
		],
		[
			-427,
			-38
		],
		[
			-7,
			314
		],
		[
			41,
			244
		],
		[
			19,
			121
		]
	],
	[
		[
			84713,
			45326
		],
		[
			32,
			139
		],
		[
			239,
			133
		],
		[
			194,
			20
		],
		[
			87,
			74
		],
		[
			105,
			-74
		],
		[
			-102,
			-160
		],
		[
			-289,
			-258
		],
		[
			-233,
			-170
		]
	],
	[
		[
			54540,
			33696
		],
		[
			133,
			292
		],
		[
			109,
			-162
		],
		[
			47,
			-252
		],
		[
			125,
			-43
		],
		[
			175,
			-112
		],
		[
			149,
			43
		],
		[
			248,
			302
		],
		[
			0,
			2182
		]
	],
	[
		[
			55526,
			35946
		],
		[
			75,
			-88
		],
		[
			165,
			-562
		],
		[
			-26,
			-360
		],
		[
			62,
			-207
		],
		[
			199,
			60
		],
		[
			139,
			264
		],
		[
			132,
			177
		],
		[
			68,
			283
		],
		[
			135,
			137
		],
		[
			117,
			-71
		],
		[
			133,
			-166
		],
		[
			226,
			-29
		],
		[
			178,
			138
		],
		[
			28,
			184
		],
		[
			48,
			283
		],
		[
			152,
			47
		],
		[
			83,
			222
		],
		[
			93,
			393
		],
		[
			249,
			442
		],
		[
			393,
			435
		]
	],
	[
		[
			58175,
			37528
		],
		[
			113,
			-7
		],
		[
			134,
			-100
		],
		[
			94,
			71
		],
		[
			148,
			-59
		]
	],
	[
		[
			58664,
			37433
		],
		[
			133,
			-832
		],
		[
			72,
			-419
		],
		[
			-49,
			-659
		],
		[
			23,
			-212
		]
	],
	[
		[
			58843,
			35311
		],
		[
			-140,
			108
		],
		[
			-80,
			-42
		],
		[
			-26,
			-172
		],
		[
			-76,
			-222
		],
		[
			2,
			-204
		],
		[
			166,
			-320
		],
		[
			163,
			63
		],
		[
			56,
			263
		]
	],
	[
		[
			58908,
			34785
		],
		[
			211,
			-5
		]
	],
	[
		[
			59119,
			34780
		],
		[
			-70,
			-430
		],
		[
			-32,
			-491
		],
		[
			-72,
			-267
		],
		[
			-190,
			-298
		],
		[
			-54,
			-86
		],
		[
			-118,
			-300
		],
		[
			-77,
			-303
		],
		[
			-158,
			-424
		],
		[
			-314,
			-609
		],
		[
			-196,
			-355
		],
		[
			-210,
			-269
		],
		[
			-290,
			-229
		],
		[
			-141,
			-31
		],
		[
			-36,
			-164
		],
		[
			-169,
			88
		],
		[
			-138,
			-113
		],
		[
			-301,
			114
		],
		[
			-168,
			-72
		],
		[
			-115,
			31
		],
		[
			-286,
			-233
		],
		[
			-238,
			-94
		],
		[
			-171,
			-223
		],
		[
			-127,
			-14
		],
		[
			-117,
			210
		],
		[
			-94,
			11
		],
		[
			-120,
			264
		],
		[
			-13,
			-82
		],
		[
			-37,
			159
		],
		[
			2,
			346
		],
		[
			-90,
			396
		],
		[
			89,
			108
		],
		[
			-7,
			453
		],
		[
			-182,
			553
		],
		[
			-139,
			501
		],
		[
			-1,
			1
		],
		[
			-199,
			768
		]
	],
	[
		[
			58049,
			33472
		],
		[
			-121,
			182
		],
		[
			-130,
			-120
		],
		[
			-151,
			-232
		],
		[
			-148,
			-374
		],
		[
			209,
			-454
		],
		[
			99,
			59
		],
		[
			51,
			188
		],
		[
			155,
			93
		],
		[
			47,
			192
		],
		[
			85,
			288
		],
		[
			-96,
			178
		]
	],
	[
		[
			23016,
			65864
		],
		[
			-107,
			-518
		],
		[
			-49,
			-426
		],
		[
			-20,
			-791
		],
		[
			-27,
			-289
		],
		[
			48,
			-322
		],
		[
			86,
			-288
		],
		[
			56,
			-458
		],
		[
			184,
			-440
		],
		[
			65,
			-337
		],
		[
			109,
			-291
		],
		[
			295,
			-157
		],
		[
			114,
			-247
		],
		[
			244,
			165
		],
		[
			212,
			60
		],
		[
			208,
			106
		],
		[
			175,
			101
		],
		[
			176,
			241
		],
		[
			67,
			345
		],
		[
			22,
			496
		],
		[
			48,
			173
		],
		[
			188,
			155
		],
		[
			294,
			137
		],
		[
			246,
			-21
		],
		[
			169,
			50
		],
		[
			66,
			-125
		],
		[
			-9,
			-285
		],
		[
			-149,
			-351
		],
		[
			-66,
			-360
		],
		[
			51,
			-103
		],
		[
			-42,
			-255
		],
		[
			-69,
			-461
		],
		[
			-71,
			152
		],
		[
			-58,
			-10
		]
	],
	[
		[
			25472,
			61510
		],
		[
			-53,
			-8
		],
		[
			-99,
			-357
		],
		[
			-51,
			70
		],
		[
			-33,
			-27
		],
		[
			2,
			-87
		]
	],
	[
		[
			25238,
			61101
		],
		[
			-257,
			7
		],
		[
			-259,
			-1
		],
		[
			-1,
			-333
		],
		[
			-125,
			-1
		],
		[
			103,
			-198
		],
		[
			103,
			-136
		],
		[
			31,
			-128
		],
		[
			45,
			-36
		],
		[
			-7,
			-201
		],
		[
			-357,
			-2
		],
		[
			-133,
			-481
		],
		[
			39,
			-111
		],
		[
			-32,
			-138
		],
		[
			-7,
			-172
		]
	],
	[
		[
			24381,
			59170
		],
		[
			-314,
			636
		],
		[
			-144,
			191
		],
		[
			-226,
			155
		],
		[
			-156,
			-43
		],
		[
			-223,
			-223
		],
		[
			-140,
			-58
		],
		[
			-196,
			156
		],
		[
			-208,
			112
		],
		[
			-260,
			271
		],
		[
			-208,
			83
		],
		[
			-314,
			275
		],
		[
			-233,
			282
		],
		[
			-70,
			158
		],
		[
			-155,
			35
		],
		[
			-284,
			187
		],
		[
			-116,
			270
		],
		[
			-299,
			335
		],
		[
			-139,
			373
		],
		[
			-66,
			288
		],
		[
			93,
			57
		],
		[
			-29,
			169
		],
		[
			64,
			153
		],
		[
			1,
			204
		],
		[
			-93,
			266
		],
		[
			-25,
			235
		],
		[
			-94,
			298
		],
		[
			-244,
			587
		],
		[
			-280,
			462
		],
		[
			-135,
			368
		],
		[
			-238,
			241
		],
		[
			-51,
			145
		],
		[
			42,
			365
		],
		[
			-142,
			138
		],
		[
			-164,
			287
		],
		[
			-69,
			412
		],
		[
			-149,
			48
		],
		[
			-162,
			311
		],
		[
			-130,
			288
		],
		[
			-12,
			184
		],
		[
			-149,
			446
		],
		[
			-99,
			452
		],
		[
			5,
			227
		],
		[
			-201,
			234
		],
		[
			-93,
			-25
		],
		[
			-159,
			163
		],
		[
			-44,
			-240
		],
		[
			46,
			-284
		],
		[
			27,
			-444
		],
		[
			95,
			-243
		],
		[
			206,
			-407
		],
		[
			46,
			-139
		],
		[
			42,
			-42
		],
		[
			37,
			-203
		],
		[
			49,
			8
		],
		[
			56,
			-381
		],
		[
			85,
			-150
		],
		[
			59,
			-210
		],
		[
			174,
			-300
		],
		[
			92,
			-550
		],
		[
			83,
			-259
		],
		[
			77,
			-277
		],
		[
			15,
			-311
		],
		[
			134,
			-20
		],
		[
			112,
			-268
		],
		[
			100,
			-264
		],
		[
			-6,
			-106
		],
		[
			-117,
			-217
		],
		[
			-49,
			3
		],
		[
			-74,
			359
		],
		[
			-181,
			337
		],
		[
			-201,
			286
		],
		[
			-142,
			150
		],
		[
			9,
			432
		],
		[
			-42,
			320
		],
		[
			-132,
			183
		],
		[
			-191,
			264
		],
		[
			-37,
			-76
		],
		[
			-70,
			154
		],
		[
			-171,
			143
		],
		[
			-164,
			343
		],
		[
			20,
			44
		],
		[
			115,
			-33
		],
		[
			103,
			221
		],
		[
			10,
			266
		],
		[
			-214,
			422
		],
		[
			-163,
			163
		],
		[
			-102,
			369
		],
		[
			-103,
			388
		],
		[
			-129,
			472
		],
		[
			-113,
			531
		]
	],
	[
		[
			33993,
			32727
		],
		[
			180,
			63
		],
		[
			279,
			-457
		],
		[
			103,
			18
		],
		[
			286,
			-379
		],
		[
			218,
			-327
		],
		[
			160,
			-402
		],
		[
			-122,
			-280
		],
		[
			77,
			-334
		]
	],
	[
		[
			35174,
			30629
		],
		[
			-121,
			-372
		],
		[
			-313,
			-328
		],
		[
			-205,
			118
		],
		[
			-151,
			-63
		],
		[
			-256,
			253
		],
		[
			-189,
			-19
		],
		[
			-169,
			327
		]
	],
	[
		[
			34826,
			35372
		],
		[
			54,
			341
		],
		[
			38,
			350
		],
		[
			0,
			325
		],
		[
			-100,
			107
		],
		[
			-104,
			-96
		],
		[
			-103,
			26
		],
		[
			-33,
			228
		],
		[
			-26,
			541
		],
		[
			-52,
			177
		],
		[
			-187,
			160
		],
		[
			-114,
			-116
		],
		[
			-293,
			113
		],
		[
			18,
			802
		],
		[
			-82,
			329
		]
	],
	[
		[
			33842,
			38659
		],
		[
			87,
			122
		],
		[
			-27,
			337
		],
		[
			77,
			259
		],
		[
			49,
			465
		],
		[
			-66,
			367
		],
		[
			-151,
			166
		],
		[
			-30,
			233
		],
		[
			41,
			342
		],
		[
			-533,
			24
		],
		[
			-107,
			688
		],
		[
			81,
			10
		],
		[
			-3,
			255
		],
		[
			-55,
			172
		],
		[
			-12,
			342
		],
		[
			-161,
			175
		],
		[
			-175,
			-6
		],
		[
			-115,
			172
		],
		[
			-188,
			117
		],
		[
			-109,
			220
		],
		[
			-311,
			98
		],
		[
			-302,
			529
		],
		[
			23,
			396
		],
		[
			-34,
			227
		],
		[
			29,
			443
		],
		[
			-363,
			-100
		],
		[
			-147,
			-222
		],
		[
			-243,
			-239
		],
		[
			-62,
			-179
		],
		[
			-143,
			-13
		],
		[
			-206,
			50
		]
	],
	[
		[
			30686,
			44109
		],
		[
			-157,
			-102
		],
		[
			-126,
			68
		],
		[
			18,
			898
		],
		[
			-228,
			-348
		],
		[
			-245,
			15
		],
		[
			-105,
			315
		],
		[
			-184,
			34
		],
		[
			59,
			254
		],
		[
			-155,
			359
		],
		[
			-115,
			532
		],
		[
			73,
			108
		],
		[
			0,
			250
		],
		[
			168,
			171
		],
		[
			-28,
			319
		],
		[
			71,
			206
		],
		[
			20,
			275
		],
		[
			318,
			402
		],
		[
			227,
			114
		],
		[
			37,
			89
		],
		[
			251,
			-28
		]
	],
	[
		[
			30585,
			48040
		],
		[
			125,
			1620
		],
		[
			6,
			256
		],
		[
			-43,
			339
		],
		[
			-123,
			215
		],
		[
			1,
			430
		],
		[
			156,
			97
		],
		[
			56,
			-61
		],
		[
			9,
			226
		],
		[
			-162,
			61
		],
		[
			-4,
			370
		],
		[
			541,
			-13
		],
		[
			92,
			203
		],
		[
			77,
			-187
		],
		[
			55,
			-349
		],
		[
			52,
			73
		]
	],
	[
		[
			31423,
			51320
		],
		[
			153,
			-312
		],
		[
			216,
			38
		],
		[
			54,
			181
		],
		[
			206,
			138
		],
		[
			115,
			97
		],
		[
			32,
			250
		],
		[
			198,
			168
		],
		[
			-15,
			124
		],
		[
			-235,
			51
		],
		[
			-39,
			372
		],
		[
			12,
			396
		],
		[
			-125,
			153
		],
		[
			52,
			55
		],
		[
			206,
			-76
		],
		[
			221,
			-148
		],
		[
			80,
			140
		],
		[
			200,
			92
		],
		[
			310,
			221
		],
		[
			102,
			225
		],
		[
			-37,
			167
		]
	],
	[
		[
			33129,
			53652
		],
		[
			145,
			26
		],
		[
			64,
			-136
		],
		[
			-36,
			-259
		],
		[
			96,
			-90
		],
		[
			63,
			-274
		],
		[
			-77,
			-209
		],
		[
			-44,
			-502
		],
		[
			71,
			-299
		],
		[
			20,
			-274
		],
		[
			171,
			-277
		],
		[
			137,
			-29
		],
		[
			30,
			116
		],
		[
			88,
			25
		],
		[
			126,
			104
		],
		[
			90,
			157
		],
		[
			154,
			-50
		],
		[
			67,
			21
		]
	],
	[
		[
			34294,
			51702
		],
		[
			151,
			-48
		],
		[
			25,
			120
		],
		[
			-46,
			118
		],
		[
			28,
			171
		],
		[
			112,
			-53
		],
		[
			131,
			61
		],
		[
			159,
			-125
		]
	],
	[
		[
			34854,
			51946
		],
		[
			121,
			-122
		],
		[
			86,
			160
		],
		[
			62,
			-25
		],
		[
			38,
			-166
		],
		[
			133,
			42
		],
		[
			107,
			224
		],
		[
			85,
			436
		],
		[
			164,
			540
		]
	],
	[
		[
			35650,
			53035
		],
		[
			95,
			28
		],
		[
			69,
			-327
		],
		[
			155,
			-1033
		],
		[
			149,
			-97
		],
		[
			7,
			-408
		],
		[
			-208,
			-487
		],
		[
			86,
			-178
		],
		[
			491,
			-92
		],
		[
			10,
			-593
		],
		[
			211,
			388
		],
		[
			349,
			-212
		],
		[
			462,
			-361
		],
		[
			135,
			-346
		],
		[
			-45,
			-327
		],
		[
			323,
			182
		],
		[
			540,
			-313
		],
		[
			415,
			23
		],
		[
			411,
			-489
		],
		[
			355,
			-662
		],
		[
			214,
			-170
		],
		[
			237,
			-24
		],
		[
			101,
			-186
		],
		[
			94,
			-752
		],
		[
			46,
			-358
		],
		[
			-110,
			-977
		],
		[
			-142,
			-385
		],
		[
			-391,
			-822
		],
		[
			-177,
			-668
		],
		[
			-206,
			-513
		],
		[
			-69,
			-11
		],
		[
			-78,
			-435
		],
		[
			20,
			-1107
		],
		[
			-77,
			-910
		],
		[
			-30,
			-390
		],
		[
			-88,
			-233
		],
		[
			-49,
			-790
		],
		[
			-282,
			-771
		],
		[
			-47,
			-610
		],
		[
			-225,
			-256
		],
		[
			-65,
			-355
		],
		[
			-302,
			2
		],
		[
			-437,
			-227
		],
		[
			-195,
			-263
		],
		[
			-311,
			-173
		],
		[
			-327,
			-470
		],
		[
			-235,
			-586
		],
		[
			-41,
			-441
		],
		[
			46,
			-326
		],
		[
			-51,
			-597
		],
		[
			-63,
			-289
		],
		[
			-195,
			-325
		],
		[
			-308,
			-1040
		],
		[
			-244,
			-468
		],
		[
			-189,
			-277
		],
		[
			-127,
			-562
		],
		[
			-183,
			-337
		]
	],
	[
		[
			33842,
			38659
		],
		[
			-4,
			182
		],
		[
			-259,
			302
		],
		[
			-258,
			9
		],
		[
			-484,
			-172
		],
		[
			-133,
			-520
		],
		[
			-7,
			-318
		],
		[
			-110,
			-708
		]
	],
	[
		[
			30669,
			40193
		],
		[
			175,
			638
		],
		[
			-119,
			496
		],
		[
			63,
			199
		],
		[
			-49,
			219
		],
		[
			108,
			295
		],
		[
			6,
			503
		],
		[
			13,
			415
		],
		[
			60,
			200
		],
		[
			-240,
			951
		]
	],
	[
		[
			30452,
			39739
		],
		[
			-279,
			340
		],
		[
			-24,
			242
		],
		[
			-551,
			593
		],
		[
			-498,
			646
		],
		[
			-214,
			365
		],
		[
			-115,
			488
		],
		[
			46,
			170
		],
		[
			-236,
			775
		],
		[
			-274,
			1090
		],
		[
			-262,
			1177
		],
		[
			-114,
			269
		],
		[
			-87,
			435
		],
		[
			-216,
			386
		],
		[
			-198,
			239
		],
		[
			90,
			264
		],
		[
			-134,
			563
		],
		[
			86,
			414
		],
		[
			221,
			373
		]
	],
	[
		[
			27693,
			48568
		],
		[
			33,
			-246
		],
		[
			-79,
			-141
		],
		[
			8,
			-216
		],
		[
			114,
			47
		],
		[
			113,
			-64
		],
		[
			116,
			-298
		],
		[
			157,
			243
		],
		[
			53,
			398
		],
		[
			170,
			514
		],
		[
			334,
			233
		],
		[
			303,
			619
		],
		[
			86,
			384
		],
		[
			-38,
			449
		]
	],
	[
		[
			29063,
			50490
		],
		[
			74,
			56
		],
		[
			184,
			-280
		],
		[
			89,
			-279
		],
		[
			129,
			-152
		],
		[
			163,
			-620
		],
		[
			207,
			-74
		],
		[
			153,
			157
		],
		[
			101,
			-103
		],
		[
			166,
			51
		],
		[
			213,
			-276
		],
		[
			-179,
			-602
		],
		[
			83,
			-14
		],
		[
			139,
			-314
		]
	],
	[
		[
			29063,
			50490
		],
		[
			-119,
			140
		],
		[
			-137,
			195
		],
		[
			-79,
			-94
		],
		[
			-235,
			82
		],
		[
			-68,
			255
		],
		[
			-52,
			-10
		],
		[
			-278,
			338
		]
	],
	[
		[
			28095,
			51396
		],
		[
			-37,
			183
		],
		[
			103,
			44
		],
		[
			-12,
			296
		],
		[
			65,
			214
		],
		[
			138,
			40
		],
		[
			117,
			371
		],
		[
			106,
			310
		],
		[
			-102,
			141
		],
		[
			52,
			343
		],
		[
			-62,
			540
		],
		[
			59,
			155
		],
		[
			-44,
			500
		],
		[
			-112,
			315
		]
	],
	[
		[
			28366,
			54848
		],
		[
			36,
			287
		],
		[
			89,
			-43
		],
		[
			52,
			176
		],
		[
			-64,
			348
		],
		[
			34,
			86
		]
	],
	[
		[
			28513,
			55702
		],
		[
			143,
			-18
		],
		[
			209,
			412
		],
		[
			114,
			63
		],
		[
			3,
			195
		],
		[
			51,
			500
		],
		[
			159,
			274
		],
		[
			175,
			11
		],
		[
			22,
			123
		],
		[
			218,
			-49
		],
		[
			218,
			298
		],
		[
			109,
			132
		],
		[
			134,
			285
		],
		[
			98,
			-36
		],
		[
			73,
			-156
		],
		[
			-54,
			-199
		]
	],
	[
		[
			30185,
			57537
		],
		[
			-178,
			-99
		],
		[
			-71,
			-295
		],
		[
			-107,
			-169
		],
		[
			-81,
			-220
		],
		[
			-34,
			-422
		],
		[
			-77,
			-345
		],
		[
			144,
			-40
		],
		[
			35,
			-271
		],
		[
			62,
			-130
		],
		[
			21,
			-238
		],
		[
			-33,
			-219
		],
		[
			10,
			-123
		],
		[
			69,
			-49
		],
		[
			66,
			-207
		],
		[
			357,
			57
		],
		[
			161,
			-75
		],
		[
			196,
			-508
		],
		[
			112,
			63
		],
		[
			200,
			-32
		],
		[
			158,
			68
		],
		[
			99,
			-102
		],
		[
			-50,
			-318
		],
		[
			-62,
			-199
		],
		[
			-22,
			-423
		],
		[
			56,
			-393
		],
		[
			79,
			-175
		],
		[
			9,
			-133
		],
		[
			-140,
			-294
		],
		[
			100,
			-130
		],
		[
			74,
			-207
		],
		[
			85,
			-589
		]
	],
	[
		[
			28366,
			54848
		],
		[
			-93,
			170
		],
		[
			-59,
			319
		],
		[
			68,
			158
		],
		[
			-70,
			40
		],
		[
			-52,
			196
		],
		[
			-138,
			164
		],
		[
			-122,
			-38
		],
		[
			-56,
			-205
		],
		[
			-112,
			-149
		],
		[
			-61,
			-20
		],
		[
			-27,
			-123
		],
		[
			132,
			-321
		],
		[
			-75,
			-76
		],
		[
			-40,
			-87
		],
		[
			-130,
			-30
		],
		[
			-48,
			353
		],
		[
			-36,
			-101
		],
		[
			-92,
			35
		],
		[
			-56,
			238
		],
		[
			-114,
			39
		],
		[
			-72,
			69
		],
		[
			-119,
			-1
		],
		[
			-8,
			-128
		],
		[
			-32,
			89
		]
	],
	[
		[
			26954,
			55439
		],
		[
			14,
			117
		],
		[
			23,
			120
		],
		[
			-10,
			107
		],
		[
			41,
			70
		],
		[
			-58,
			88
		],
		[
			-1,
			238
		],
		[
			107,
			53
		]
	],
	[
		[
			27070,
			56232
		],
		[
			100,
			-212
		],
		[
			-6,
			-126
		],
		[
			111,
			-26
		],
		[
			26,
			48
		],
		[
			77,
			-145
		],
		[
			136,
			42
		],
		[
			119,
			150
		],
		[
			168,
			119
		],
		[
			95,
			176
		],
		[
			153,
			-34
		],
		[
			-10,
			-58
		],
		[
			155,
			-21
		],
		[
			124,
			-102
		],
		[
			90,
			-177
		],
		[
			105,
			-164
		]
	],
	[
		[
			26954,
			55439
		],
		[
			-151,
			131
		],
		[
			-56,
			124
		],
		[
			32,
			103
		],
		[
			-11,
			130
		],
		[
			-77,
			142
		],
		[
			-109,
			116
		],
		[
			-95,
			76
		],
		[
			-19,
			173
		],
		[
			-73,
			105
		],
		[
			18,
			-172
		],
		[
			-55,
			-141
		],
		[
			-64,
			164
		],
		[
			-89,
			58
		],
		[
			-38,
			120
		],
		[
			2,
			179
		],
		[
			36,
			187
		],
		[
			-78,
			83
		],
		[
			64,
			114
		]
	],
	[
		[
			26191,
			57131
		],
		[
			42,
			76
		],
		[
			183,
			-156
		],
		[
			63,
			77
		],
		[
			89,
			-50
		],
		[
			46,
			-121
		],
		[
			82,
			-40
		],
		[
			66,
			126
		]
	],
	[
		[
			26762,
			57043
		],
		[
			70,
			-321
		],
		[
			108,
			-238
		],
		[
			130,
			-252
		]
	],
	[
		[
			26191,
			57131
		],
		[
			-96,
			186
		],
		[
			-130,
			238
		],
		[
			-61,
			200
		],
		[
			-117,
			185
		],
		[
			-140,
			267
		],
		[
			31,
			91
		],
		[
			46,
			-88
		],
		[
			21,
			41
		]
	],
	[
		[
			25745,
			58251
		],
		[
			86,
			25
		],
		[
			35,
			135
		],
		[
			41,
			5
		],
		[
			-6,
			290
		],
		[
			65,
			14
		],
		[
			58,
			-4
		],
		[
			60,
			158
		],
		[
			82,
			-120
		],
		[
			29,
			74
		],
		[
			51,
			70
		],
		[
			97,
			163
		],
		[
			4,
			121
		],
		[
			27,
			-5
		],
		[
			36,
			141
		],
		[
			29,
			17
		],
		[
			47,
			-90
		],
		[
			56,
			-27
		],
		[
			61,
			76
		],
		[
			70,
			0
		],
		[
			97,
			77
		],
		[
			38,
			81
		],
		[
			95,
			-12
		]
	],
	[
		[
			26903,
			59440
		],
		[
			-24,
			-57
		],
		[
			-14,
			-132
		],
		[
			29,
			-216
		],
		[
			-64,
			-202
		],
		[
			-30,
			-237
		],
		[
			-9,
			-261
		],
		[
			15,
			-152
		],
		[
			7,
			-266
		],
		[
			-43,
			-58
		],
		[
			-26,
			-253
		],
		[
			19,
			-156
		],
		[
			-56,
			-151
		],
		[
			12,
			-159
		],
		[
			43,
			-97
		]
	],
	[
		[
			25745,
			58251
		],
		[
			-48,
			185
		],
		[
			-84,
			51
		]
	],
	[
		[
			25613,
			58487
		],
		[
			19,
			237
		],
		[
			-38,
			64
		],
		[
			-57,
			42
		],
		[
			-122,
			-70
		],
		[
			-10,
			79
		],
		[
			-84,
			95
		],
		[
			-60,
			118
		],
		[
			-82,
			50
		]
	],
	[
		[
			25179,
			59102
		],
		[
			58,
			150
		],
		[
			-22,
			116
		],
		[
			20,
			113
		],
		[
			131,
			166
		],
		[
			127,
			225
		]
	],
	[
		[
			25493,
			59872
		],
		[
			29,
			-23
		],
		[
			61,
			104
		],
		[
			79,
			8
		],
		[
			26,
			-48
		],
		[
			43,
			29
		],
		[
			129,
			-53
		],
		[
			128,
			15
		],
		[
			90,
			66
		],
		[
			32,
			66
		],
		[
			89,
			-31
		],
		[
			66,
			-40
		],
		[
			73,
			14
		],
		[
			55,
			51
		],
		[
			127,
			-82
		],
		[
			44,
			-13
		],
		[
			85,
			-110
		],
		[
			80,
			-132
		],
		[
			101,
			-91
		],
		[
			73,
			-162
		]
	],
	[
		[
			25613,
			58487
		],
		[
			-31,
			-139
		],
		[
			-161,
			9
		],
		[
			-100,
			57
		],
		[
			-115,
			117
		],
		[
			-154,
			37
		],
		[
			-79,
			127
		]
	],
	[
		[
			24973,
			58695
		],
		[
			9,
			86
		],
		[
			95,
			149
		],
		[
			52,
			66
		],
		[
			-15,
			69
		],
		[
			65,
			37
		]
	],
	[
		[
			25238,
			61101
		],
		[
			-2,
			-468
		],
		[
			-22,
			-667
		],
		[
			83,
			0
		]
	],
	[
		[
			25297,
			59966
		],
		[
			90,
			-107
		],
		[
			24,
			88
		],
		[
			82,
			-75
		]
	],
	[
		[
			24973,
			58695
		],
		[
			-142,
			103
		],
		[
			-174,
			11
		],
		[
			-127,
			117
		],
		[
			-149,
			244
		]
	],
	[
		[
			25472,
			61510
		],
		[
			1,
			-87
		],
		[
			53,
			-3
		],
		[
			-5,
			-160
		],
		[
			-45,
			-256
		],
		[
			24,
			-91
		],
		[
			-29,
			-212
		],
		[
			18,
			-56
		],
		[
			-32,
			-299
		],
		[
			-55,
			-156
		],
		[
			-50,
			-19
		],
		[
			-55,
			-205
		]
	],
	[
		[
			30185,
			57537
		],
		[
			-8,
			-139
		],
		[
			-163,
			-69
		],
		[
			91,
			-268
		],
		[
			-3,
			-309
		],
		[
			-123,
			-344
		],
		[
			105,
			-468
		],
		[
			120,
			38
		],
		[
			62,
			427
		],
		[
			-86,
			208
		],
		[
			-14,
			447
		],
		[
			346,
			241
		],
		[
			-38,
			278
		],
		[
			97,
			186
		],
		[
			100,
			-415
		],
		[
			195,
			-9
		],
		[
			180,
			-330
		],
		[
			11,
			-195
		],
		[
			249,
			-6
		],
		[
			297,
			61
		],
		[
			159,
			-264
		],
		[
			213,
			-74
		],
		[
			155,
			185
		],
		[
			4,
			149
		],
		[
			344,
			35
		],
		[
			333,
			9
		],
		[
			-236,
			-175
		],
		[
			95,
			-279
		],
		[
			222,
			-44
		],
		[
			210,
			-291
		],
		[
			45,
			-473
		],
		[
			144,
			13
		],
		[
			109,
			-139
		]
	],
	[
		[
			33400,
			55523
		],
		[
			-220,
			-347
		],
		[
			-24,
			-215
		],
		[
			95,
			-220
		],
		[
			-69,
			-110
		],
		[
			-171,
			-95
		],
		[
			5,
			-273
		],
		[
			-75,
			-163
		],
		[
			188,
			-448
		]
	],
	[
		[
			33400,
			55523
		],
		[
			183,
			-217
		],
		[
			171,
			-385
		],
		[
			8,
			-304
		],
		[
			105,
			-14
		],
		[
			149,
			-289
		],
		[
			109,
			-205
		]
	],
	[
		[
			34125,
			54109
		],
		[
			-44,
			-532
		],
		[
			-169,
			-154
		],
		[
			15,
			-139
		],
		[
			-51,
			-305
		],
		[
			123,
			-429
		],
		[
			89,
			-1
		],
		[
			37,
			-333
		],
		[
			169,
			-514
		]
	],
	[
		[
			34125,
			54109
		],
		[
			333,
			-119
		],
		[
			30,
			107
		],
		[
			225,
			43
		],
		[
			298,
			-159
		]
	],
	[
		[
			35011,
			53981
		],
		[
			-144,
			-508
		],
		[
			22,
			-404
		],
		[
			109,
			-351
		],
		[
			-49,
			-254
		],
		[
			-24,
			-270
		],
		[
			-71,
			-248
		]
	],
	[
		[
			35011,
			53981
		],
		[
			95,
			-65
		],
		[
			204,
			-140
		],
		[
			294,
			-499
		],
		[
			46,
			-242
		]
	],
	[
		[
			51718,
			79804
		],
		[
			131,
			-155
		],
		[
			400,
			-109
		],
		[
			-140,
			-404
		],
		[
			-35,
			-421
		]
	],
	[
		[
			52074,
			78715
		],
		[
			-77,
			-101
		],
		[
			-126,
			54
		],
		[
			9,
			-150
		],
		[
			-203,
			-332
		],
		[
			-5,
			-267
		],
		[
			133,
			92
		],
		[
			95,
			-259
		]
	],
	[
		[
			51900,
			77752
		],
		[
			-11,
			-167
		],
		[
			82,
			-222
		],
		[
			-97,
			-180
		],
		[
			72,
			-457
		],
		[
			151,
			-75
		],
		[
			-32,
			-256
		]
	],
	[
		[
			52065,
			76395
		],
		[
			-252,
			-334
		],
		[
			-548,
			160
		],
		[
			-404,
			-192
		],
		[
			-32,
			-355
		]
	],
	[
		[
			50829,
			75674
		],
		[
			-322,
			-77
		],
		[
			-313,
			267
		],
		[
			-101,
			-127
		],
		[
			-511,
			268
		],
		[
			-111,
			230
		]
	],
	[
		[
			49471,
			76235
		],
		[
			144,
			354
		],
		[
			53,
			1177
		],
		[
			-287,
			620
		],
		[
			-205,
			299
		],
		[
			-424,
			227
		],
		[
			-28,
			431
		],
		[
			360,
			129
		],
		[
			466,
			-152
		],
		[
			-88,
			669
		],
		[
			263,
			-254
		],
		[
			646,
			461
		],
		[
			84,
			484
		],
		[
			243,
			119
		]
	],
	[
		[
			50698,
			80799
		],
		[
			40,
			-207
		],
		[
			129,
			-10
		],
		[
			129,
			-237
		],
		[
			194,
			-279
		],
		[
			143,
			46
		],
		[
			243,
			-269
		]
	],
	[
		[
			51576,
			79843
		],
		[
			62,
			-52
		],
		[
			80,
			13
		]
	],
	[
		[
			52429,
			75765
		],
		[
			179,
			226
		],
		[
			47,
			-507
		],
		[
			-92,
			-456
		],
		[
			-126,
			120
		],
		[
			-64,
			398
		],
		[
			56,
			219
		]
	],
	[
		[
			27693,
			48568
		],
		[
			148,
			442
		],
		[
			-60,
			258
		],
		[
			-106,
			-275
		],
		[
			-166,
			259
		],
		[
			56,
			167
		],
		[
			-47,
			536
		],
		[
			97,
			89
		],
		[
			52,
			368
		],
		[
			105,
			381
		],
		[
			-20,
			241
		],
		[
			153,
			126
		],
		[
			190,
			236
		]
	],
	[
		[
			31588,
			61519
		],
		[
			142,
			-52
		],
		[
			50,
			-118
		],
		[
			-71,
			-149
		],
		[
			-209,
			4
		],
		[
			-163,
			-21
		],
		[
			-16,
			253
		],
		[
			40,
			86
		],
		[
			227,
			-3
		]
	],
	[
		[
			28453,
			61504
		],
		[
			187,
			-53
		],
		[
			147,
			-142
		],
		[
			46,
			-161
		],
		[
			-195,
			-11
		],
		[
			-84,
			-99
		],
		[
			-156,
			95
		],
		[
			-159,
			215
		],
		[
			34,
			135
		],
		[
			116,
			41
		],
		[
			64,
			-20
		]
	],
	[
		[
			27147,
			64280
		],
		[
			240,
			-42
		],
		[
			219,
			-7
		],
		[
			261,
			-201
		],
		[
			110,
			-216
		],
		[
			260,
			66
		],
		[
			98,
			-138
		],
		[
			235,
			-366
		],
		[
			173,
			-267
		],
		[
			92,
			8
		],
		[
			165,
			-120
		],
		[
			-20,
			-167
		],
		[
			205,
			-24
		],
		[
			210,
			-242
		],
		[
			-33,
			-138
		],
		[
			-185,
			-75
		],
		[
			-187,
			-29
		],
		[
			-191,
			46
		],
		[
			-398,
			-57
		],
		[
			186,
			329
		],
		[
			-113,
			154
		],
		[
			-179,
			39
		],
		[
			-96,
			171
		],
		[
			-66,
			336
		],
		[
			-157,
			-23
		],
		[
			-259,
			159
		],
		[
			-83,
			124
		],
		[
			-362,
			91
		],
		[
			-97,
			115
		],
		[
			104,
			148
		],
		[
			-273,
			30
		],
		[
			-199,
			-307
		],
		[
			-115,
			-8
		],
		[
			-40,
			-144
		],
		[
			-138,
			-65
		],
		[
			-118,
			56
		],
		[
			146,
			183
		],
		[
			60,
			213
		],
		[
			126,
			131
		],
		[
			142,
			116
		],
		[
			210,
			56
		],
		[
			67,
			65
		]
	],
	[
		[
			58175,
			37528
		],
		[
			-177,
			267
		],
		[
			-215,
			90
		],
		[
			-82,
			375
		],
		[
			0,
			208
		],
		[
			-119,
			64
		],
		[
			-315,
			649
		],
		[
			-87,
			342
		],
		[
			-56,
			105
		],
		[
			-107,
			473
		]
	],
	[
		[
			57017,
			40101
		],
		[
			311,
			-65
		],
		[
			90,
			-68
		],
		[
			94,
			13
		],
		[
			154,
			383
		],
		[
			241,
			486
		],
		[
			100,
			46
		],
		[
			33,
			205
		],
		[
			159,
			235
		],
		[
			210,
			81
		]
	],
	[
		[
			58409,
			41417
		],
		[
			18,
			-220
		],
		[
			232,
			12
		],
		[
			128,
			-125
		],
		[
			60,
			-146
		],
		[
			132,
			-43
		],
		[
			145,
			-190
		],
		[
			0,
			-748
		],
		[
			-54,
			-409
		],
		[
			-12,
			-442
		],
		[
			45,
			-175
		],
		[
			-31,
			-348
		],
		[
			-42,
			-53
		],
		[
			-74,
			-426
		],
		[
			-292,
			-671
		]
	],
	[
		[
			55526,
			35946
		],
		[
			0,
			1725
		],
		[
			274,
			20
		],
		[
			8,
			2105
		],
		[
			207,
			19
		],
		[
			428,
			207
		],
		[
			106,
			-243
		],
		[
			177,
			231
		],
		[
			85,
			2
		],
		[
			156,
			133
		]
	],
	[
		[
			56967,
			40145
		],
		[
			50,
			-44
		]
	],
	[
		[
			54540,
			33696
		],
		[
			-207,
			446
		],
		[
			-108,
			432
		],
		[
			-62,
			575
		],
		[
			-68,
			428
		],
		[
			-93,
			910
		],
		[
			-7,
			707
		],
		[
			-35,
			322
		],
		[
			-108,
			243
		],
		[
			-144,
			489
		],
		[
			-146,
			708
		],
		[
			-60,
			371
		],
		[
			-226,
			577
		],
		[
			-17,
			453
		]
	],
	[
		[
			53259,
			40357
		],
		[
			134,
			113
		],
		[
			166,
			100
		],
		[
			180,
			-17
		],
		[
			166,
			-267
		],
		[
			42,
			41
		],
		[
			1126,
			26
		],
		[
			192,
			-284
		],
		[
			673,
			-83
		],
		[
			510,
			241
		]
	],
	[
		[
			56448,
			40227
		],
		[
			228,
			134
		],
		[
			180,
			-34
		],
		[
			109,
			-133
		],
		[
			2,
			-49
		]
	],
	[
		[
			45357,
			58612
		],
		[
			-115,
			460
		],
		[
			-138,
			210
		],
		[
			122,
			112
		],
		[
			134,
			415
		],
		[
			66,
			304
		]
	],
	[
		[
			45426,
			60113
		],
		[
			96,
			189
		],
		[
			138,
			-51
		],
		[
			135,
			129
		],
		[
			155,
			6
		],
		[
			133,
			-173
		],
		[
			184,
			-157
		],
		[
			168,
			-435
		],
		[
			184,
			-405
		]
	],
	[
		[
			46619,
			59216
		],
		[
			13,
			-368
		],
		[
			54,
			-338
		],
		[
			104,
			-166
		],
		[
			24,
			-229
		],
		[
			-13,
			-184
		]
	],
	[
		[
			46801,
			57931
		],
		[
			-40,
			-33
		],
		[
			-151,
			47
		],
		[
			-21,
			-66
		],
		[
			-61,
			-13
		],
		[
			-200,
			144
		],
		[
			-134,
			6
		]
	],
	[
		[
			46194,
			58016
		],
		[
			-513,
			25
		],
		[
			-75,
			-67
		],
		[
			-92,
			19
		],
		[
			-147,
			-96
		]
	],
	[
		[
			45367,
			57897
		],
		[
			-46,
			453
		]
	],
	[
		[
			45321,
			58350
		],
		[
			253,
			-13
		],
		[
			67,
			83
		],
		[
			50,
			5
		],
		[
			103,
			136
		],
		[
			119,
			-124
		],
		[
			121,
			-11
		],
		[
			120,
			133
		],
		[
			-56,
			170
		],
		[
			-92,
			-99
		],
		[
			-86,
			3
		],
		[
			-110,
			145
		],
		[
			-88,
			-9
		],
		[
			-63,
			-140
		],
		[
			-302,
			-17
		]
	],
	[
		[
			46619,
			59216
		],
		[
			93,
			107
		],
		[
			47,
			348
		],
		[
			88,
			14
		],
		[
			194,
			-165
		],
		[
			157,
			117
		],
		[
			107,
			-39
		],
		[
			42,
			131
		],
		[
			1114,
			9
		],
		[
			62,
			414
		],
		[
			-48,
			73
		],
		[
			-134,
			2550
		],
		[
			-134,
			2550
		],
		[
			425,
			10
		]
	],
	[
		[
			48632,
			65335
		],
		[
			937,
			-1289
		],
		[
			937,
			-1289
		],
		[
			66,
			-277
		],
		[
			173,
			-169
		],
		[
			129,
			-96
		],
		[
			3,
			-376
		],
		[
			308,
			58
		]
	],
	[
		[
			51185,
			61897
		],
		[
			1,
			-1361
		],
		[
			-152,
			-394
		],
		[
			-24,
			-364
		],
		[
			-247,
			-94
		],
		[
			-379,
			-51
		],
		[
			-102,
			-210
		],
		[
			-178,
			-23
		]
	],
	[
		[
			50104,
			59400
		],
		[
			-178,
			-3
		],
		[
			-70,
			114
		],
		[
			-153,
			-84
		],
		[
			-259,
			-246
		],
		[
			-53,
			-184
		],
		[
			-216,
			-265
		],
		[
			-38,
			-152
		],
		[
			-116,
			-120
		],
		[
			-134,
			79
		],
		[
			-76,
			-144
		],
		[
			-41,
			-405
		],
		[
			-221,
			-490
		],
		[
			7,
			-200
		],
		[
			-76,
			-250
		],
		[
			18,
			-343
		]
	],
	[
		[
			48498,
			56707
		],
		[
			-114,
			-88
		],
		[
			-65,
			-74
		],
		[
			-43,
			253
		],
		[
			-80,
			-67
		],
		[
			-48,
			11
		],
		[
			-51,
			-172
		],
		[
			-215,
			5
		],
		[
			-77,
			89
		],
		[
			-36,
			-54
		]
	],
	[
		[
			47769,
			56610
		],
		[
			-85,
			170
		],
		[
			15,
			176
		],
		[
			-35,
			69
		],
		[
			-59,
			-58
		],
		[
			11,
			192
		],
		[
			57,
			152
		],
		[
			-114,
			248
		],
		[
			-33,
			163
		],
		[
			-62,
			130
		],
		[
			-55,
			15
		],
		[
			-67,
			-83
		],
		[
			-90,
			-79
		],
		[
			-76,
			-128
		],
		[
			-119,
			48
		],
		[
			-77,
			150
		],
		[
			-46,
			19
		],
		[
			-73,
			-78
		],
		[
			-44,
			-1
		],
		[
			-16,
			216
		]
	],
	[
		[
			47587,
			66766
		],
		[
			1045,
			-1431
		]
	],
	[
		[
			45426,
			60113
		],
		[
			-24,
			318
		],
		[
			78,
			291
		],
		[
			34,
			557
		],
		[
			-30,
			583
		],
		[
			-34,
			294
		],
		[
			28,
			295
		],
		[
			-72,
			281
		],
		[
			-146,
			255
		]
	],
	[
		[
			50747,
			54278
		],
		[
			-229,
			-69
		]
	],
	[
		[
			50518,
			54209
		],
		[
			-69,
			407
		],
		[
			13,
			1357
		],
		[
			-56,
			122
		],
		[
			-11,
			290
		],
		[
			-96,
			207
		],
		[
			-85,
			174
		],
		[
			35,
			311
		]
	],
	[
		[
			50249,
			57077
		],
		[
			96,
			67
		],
		[
			56,
			258
		],
		[
			136,
			56
		],
		[
			61,
			176
		]
	],
	[
		[
			50598,
			57634
		],
		[
			93,
			173
		],
		[
			100,
			2
		],
		[
			212,
			-340
		]
	],
	[
		[
			51003,
			57469
		],
		[
			-11,
			-197
		],
		[
			62,
			-350
		],
		[
			-54,
			-238
		],
		[
			29,
			-159
		],
		[
			-135,
			-366
		],
		[
			-86,
			-181
		],
		[
			-52,
			-372
		],
		[
			7,
			-376
		],
		[
			-16,
			-952
		]
	],
	[
		[
			54026,
			58177
		],
		[
			-78,
			-34
		],
		[
			-9,
			-188
		]
	],
	[
		[
			53939,
			57955
		],
		[
			-52,
			-13
		],
		[
			-188,
			647
		],
		[
			-65,
			24
		],
		[
			-217,
			-331
		],
		[
			-215,
			173
		],
		[
			-150,
			34
		],
		[
			-80,
			-83
		],
		[
			-163,
			18
		],
		[
			-164,
			-252
		],
		[
			-141,
			-14
		],
		[
			-337,
			305
		],
		[
			-131,
			-145
		],
		[
			-142,
			10
		],
		[
			-104,
			223
		],
		[
			-279,
			221
		],
		[
			-298,
			-70
		],
		[
			-72,
			-128
		],
		[
			-39,
			-340
		],
		[
			-80,
			-238
		],
		[
			-19,
			-527
		]
	],
	[
		[
			50598,
			57634
		],
		[
			6,
			405
		],
		[
			-320,
			134
		],
		[
			-9,
			286
		],
		[
			-156,
			386
		],
		[
			-37,
			269
		],
		[
			22,
			286
		]
	],
	[
		[
			51185,
			61897
		],
		[
			392,
			263
		],
		[
			804,
			1161
		],
		[
			952,
			1126
		]
	],
	[
		[
			53333,
			64447
		],
		[
			439,
			-255
		],
		[
			156,
			-324
		],
		[
			197,
			220
		]
	],
	[
		[
			53939,
			57955
		],
		[
			110,
			-235
		],
		[
			-31,
			-107
		],
		[
			-14,
			-196
		],
		[
			-234,
			-457
		],
		[
			-74,
			-377
		],
		[
			-39,
			-307
		],
		[
			-59,
			-132
		],
		[
			-56,
			-414
		],
		[
			-148,
			-243
		],
		[
			-43,
			-299
		],
		[
			-63,
			-238
		],
		[
			-26,
			-246
		],
		[
			-191,
			-199
		],
		[
			-156,
			243
		],
		[
			-105,
			-10
		],
		[
			-165,
			-345
		],
		[
			-81,
			-6
		],
		[
			-132,
			-570
		],
		[
			-71,
			-418
		]
	],
	[
		[
			52361,
			53399
		],
		[
			-289,
			-213
		],
		[
			-105,
			31
		],
		[
			-107,
			-132
		],
		[
			-222,
			13
		],
		[
			-149,
			370
		],
		[
			-91,
			427
		],
		[
			-197,
			389
		],
		[
			-209,
			-7
		],
		[
			-245,
			1
		]
	],
	[
		[
			54244,
			54965
		],
		[
			-140,
			-599
		],
		[
			-67,
			-107
		],
		[
			-21,
			-458
		],
		[
			28,
			-249
		],
		[
			-23,
			-176
		],
		[
			132,
			-309
		],
		[
			23,
			-212
		],
		[
			103,
			-305
		],
		[
			127,
			-190
		],
		[
			12,
			-269
		],
		[
			29,
			-172
		]
	],
	[
		[
			54447,
			51919
		],
		[
			-20,
			-319
		],
		[
			-220,
			140
		],
		[
			-225,
			156
		],
		[
			-350,
			23
		]
	],
	[
		[
			53632,
			51919
		],
		[
			-35,
			32
		],
		[
			-164,
			-76
		],
		[
			-169,
			79
		],
		[
			-132,
			-38
		]
	],
	[
		[
			53132,
			51916
		],
		[
			-452,
			13
		]
	],
	[
		[
			52680,
			51929
		],
		[
			40,
			466
		],
		[
			-108,
			391
		],
		[
			-127,
			100
		],
		[
			-56,
			265
		],
		[
			-72,
			85
		],
		[
			4,
			163
		]
	],
	[
		[
			50518,
			54209
		],
		[
			-224,
			-126
		]
	],
	[
		[
			50294,
			54083
		],
		[
			-62,
			207
		],
		[
			-74,
			375
		],
		[
			-22,
			294
		],
		[
			61,
			532
		],
		[
			-69,
			215
		],
		[
			-27,
			466
		],
		[
			1,
			429
		],
		[
			-116,
			305
		],
		[
			20,
			184
		]
	],
	[
		[
			50006,
			57090
		],
		[
			243,
			-13
		]
	],
	[
		[
			50294,
			54083
		],
		[
			-436,
			-346
		],
		[
			-154,
			-203
		],
		[
			-250,
			-171
		],
		[
			-248,
			168
		]
	],
	[
		[
			49206,
			53531
		],
		[
			13,
			233
		],
		[
			-121,
			509
		],
		[
			73,
			667
		],
		[
			117,
			496
		],
		[
			-74,
			841
		]
	],
	[
		[
			49214,
			56277
		],
		[
			-38,
			444
		],
		[
			7,
			336
		],
		[
			482,
			27
		],
		[
			123,
			-43
		],
		[
			90,
			96
		],
		[
			128,
			-47
		]
	],
	[
		[
			48498,
			56707
		],
		[
			125,
			-129
		],
		[
			49,
			-195
		],
		[
			125,
			-125
		],
		[
			97,
			149
		],
		[
			130,
			22
		],
		[
			190,
			-152
		]
	],
	[
		[
			49206,
			53531
		],
		[
			-126,
			-7
		],
		[
			-194,
			116
		],
		[
			-178,
			-7
		],
		[
			-329,
			-103
		],
		[
			-193,
			-170
		],
		[
			-275,
			-217
		],
		[
			-54,
			15
		]
	],
	[
		[
			47857,
			53158
		],
		[
			22,
			487
		],
		[
			26,
			74
		],
		[
			-8,
			233
		],
		[
			-118,
			247
		],
		[
			-88,
			40
		],
		[
			-81,
			162
		],
		[
			60,
			262
		],
		[
			-28,
			286
		],
		[
			13,
			172
		]
	],
	[
		[
			47655,
			55121
		],
		[
			44,
			0
		],
		[
			17,
			258
		],
		[
			-22,
			114
		],
		[
			27,
			82
		],
		[
			103,
			71
		],
		[
			-69,
			473
		],
		[
			-64,
			245
		],
		[
			23,
			200
		],
		[
			55,
			46
		]
	],
	[
		[
			47655,
			55121
		],
		[
			-78,
			15
		],
		[
			-57,
			-238
		],
		[
			-78,
			3
		],
		[
			-55,
			126
		],
		[
			19,
			237
		],
		[
			-116,
			362
		],
		[
			-73,
			-67
		],
		[
			-59,
			-13
		]
	],
	[
		[
			47158,
			55546
		],
		[
			-77,
			-34
		],
		[
			3,
			217
		],
		[
			-44,
			155
		],
		[
			9,
			171
		],
		[
			-60,
			249
		],
		[
			-78,
			211
		],
		[
			-222,
			1
		],
		[
			-65,
			-112
		],
		[
			-76,
			-13
		],
		[
			-48,
			-128
		],
		[
			-32,
			-163
		],
		[
			-148,
			-260
		]
	],
	[
		[
			46320,
			55840
		],
		[
			-122,
			349
		],
		[
			-108,
			232
		],
		[
			-71,
			76
		],
		[
			-69,
			118
		],
		[
			-32,
			261
		],
		[
			-41,
			130
		],
		[
			-80,
			97
		]
	],
	[
		[
			45797,
			57103
		],
		[
			123,
			288
		],
		[
			84,
			-11
		],
		[
			73,
			99
		],
		[
			61,
			1
		],
		[
			44,
			78
		],
		[
			-24,
			196
		],
		[
			31,
			62
		],
		[
			5,
			200
		]
	],
	[
		[
			45797,
			57103
		],
		[
			-149,
			247
		],
		[
			-117,
			39
		],
		[
			-63,
			166
		],
		[
			1,
			90
		],
		[
			-84,
			125
		],
		[
			-18,
			127
		]
	],
	[
		[
			47857,
			53158
		],
		[
			-73,
			-5
		],
		[
			-286,
			282
		],
		[
			-252,
			449
		],
		[
			-237,
			324
		],
		[
			-187,
			381
		]
	],
	[
		[
			46822,
			54589
		],
		[
			66,
			189
		],
		[
			15,
			172
		],
		[
			126,
			320
		],
		[
			129,
			276
		]
	],
	[
		[
			46822,
			54589
		],
		[
			-75,
			44
		],
		[
			-200,
			238
		],
		[
			-144,
			316
		],
		[
			-49,
			216
		],
		[
			-34,
			437
		]
	],
	[
		[
			55125,
			52650
		],
		[
			-178,
			33
		],
		[
			-188,
			99
		],
		[
			-166,
			-313
		],
		[
			-146,
			-550
		]
	],
	[
		[
			56824,
			55442
		],
		[
			152,
			-239
		],
		[
			2,
			-192
		],
		[
			187,
			-308
		],
		[
			116,
			-255
		],
		[
			70,
			-355
		],
		[
			208,
			-234
		],
		[
			44,
			-187
		]
	],
	[
		[
			53609,
			47755
		],
		[
			-104,
			203
		],
		[
			-84,
			-100
		],
		[
			-112,
			-255
		]
	],
	[
		[
			53309,
			47603
		],
		[
			-228,
			626
		]
	],
	[
		[
			53081,
			48229
		],
		[
			212,
			326
		],
		[
			-105,
			391
		],
		[
			95,
			148
		],
		[
			187,
			73
		],
		[
			23,
			261
		],
		[
			148,
			-283
		],
		[
			245,
			-25
		],
		[
			85,
			279
		],
		[
			36,
			393
		],
		[
			-31,
			461
		],
		[
			-131,
			350
		],
		[
			120,
			684
		],
		[
			-69,
			117
		],
		[
			-207,
			-48
		],
		[
			-78,
			305
		],
		[
			21,
			258
		]
	],
	[
		[
			53081,
			48229
		],
		[
			-285,
			596
		],
		[
			-184,
			488
		],
		[
			-169,
			610
		],
		[
			9,
			196
		],
		[
			61,
			189
		],
		[
			67,
			430
		],
		[
			56,
			438
		]
	],
	[
		[
			52636,
			51176
		],
		[
			94,
			35
		],
		[
			404,
			-6
		],
		[
			-2,
			711
		]
	],
	[
		[
			52636,
			51176
		],
		[
			-52,
			90
		],
		[
			96,
			663
		]
	],
	[
		[
			59099,
			45126
		],
		[
			131,
			-264
		],
		[
			71,
			-501
		],
		[
			-47,
			-160
		],
		[
			-56,
			-479
		],
		[
			53,
			-490
		],
		[
			-87,
			-205
		],
		[
			-85,
			-549
		],
		[
			147,
			-153
		]
	],
	[
		[
			59226,
			42325
		],
		[
			-843,
			-487
		],
		[
			26,
			-421
		]
	],
	[
		[
			56448,
			40227
		],
		[
			-181,
			369
		],
		[
			-188,
			483
		],
		[
			13,
			1880
		],
		[
			579,
			-7
		],
		[
			-24,
			203
		],
		[
			41,
			222
		],
		[
			-49,
			277
		],
		[
			32,
			286
		],
		[
			-29,
			184
		]
	],
	[
		[
			59599,
			43773
		],
		[
			-77,
			-449
		],
		[
			77,
			-768
		],
		[
			97,
			9
		],
		[
			100,
			-191
		],
		[
			116,
			-427
		],
		[
			24,
			-760
		],
		[
			-120,
			-124
		],
		[
			-85,
			-410
		],
		[
			-181,
			365
		],
		[
			-21,
			417
		],
		[
			59,
			274
		],
		[
			-16,
			237
		],
		[
			-110,
			149
		],
		[
			-77,
			-54
		],
		[
			-159,
			284
		]
	],
	[
		[
			61198,
			44484
		],
		[
			45,
			-265
		],
		[
			-11,
			-588
		],
		[
			34,
			-519
		],
		[
			11,
			-923
		],
		[
			49,
			-290
		],
		[
			-83,
			-422
		],
		[
			-108,
			-410
		],
		[
			-177,
			-366
		],
		[
			-254,
			-225
		],
		[
			-313,
			-287
		],
		[
			-313,
			-634
		],
		[
			-107,
			-108
		],
		[
			-194,
			-420
		],
		[
			-115,
			-136
		],
		[
			-23,
			-421
		],
		[
			132,
			-448
		],
		[
			54,
			-346
		],
		[
			4,
			-177
		],
		[
			49,
			29
		],
		[
			-8,
			-579
		],
		[
			-45,
			-275
		],
		[
			65,
			-101
		],
		[
			-41,
			-245
		],
		[
			-116,
			-211
		],
		[
			-229,
			-199
		],
		[
			-334,
			-320
		],
		[
			-122,
			-219
		],
		[
			24,
			-248
		],
		[
			71,
			-40
		],
		[
			-24,
			-311
		]
	],
	[
		[
			58908,
			34785
		],
		[
			-24,
			261
		],
		[
			-41,
			265
		]
	],
	[
		[
			53383,
			47159
		],
		[
			-74,
			444
		]
	],
	[
		[
			53259,
			40357
		],
		[
			-26,
			372
		],
		[
			38,
			519
		],
		[
			96,
			541
		],
		[
			15,
			254
		],
		[
			90,
			532
		],
		[
			66,
			243
		],
		[
			159,
			386
		],
		[
			90,
			263
		],
		[
			29,
			438
		],
		[
			-15,
			335
		],
		[
			-83,
			211
		],
		[
			-74,
			358
		],
		[
			-68,
			355
		],
		[
			15,
			122
		],
		[
			85,
			235
		],
		[
			-84,
			570
		],
		[
			-57,
			396
		],
		[
			-139,
			374
		],
		[
			26,
			115
		]
	],
	[
		[
			58062,
			48902
		],
		[
			169,
			-46
		],
		[
			85,
			336
		],
		[
			147,
			-38
		]
	],
	[
		[
			59922,
			69905
		],
		[
			-49,
			-186
		]
	],
	[
		[
			59873,
			69719
		],
		[
			-100,
			82
		],
		[
			-58,
			-394
		],
		[
			69,
			-66
		],
		[
			-71,
			-81
		],
		[
			-12,
			-156
		],
		[
			131,
			80
		]
	],
	[
		[
			59832,
			69184
		],
		[
			7,
			-230
		],
		[
			-139,
			-944
		]
	],
	[
		[
			59700,
			68010
		],
		[
			-27,
			153
		],
		[
			-155,
			862
		]
	],
	[
		[
			59518,
			69025
		],
		[
			80,
			194
		],
		[
			-19,
			34
		],
		[
			74,
			276
		],
		[
			56,
			446
		],
		[
			40,
			149
		],
		[
			8,
			6
		]
	],
	[
		[
			59757,
			70130
		],
		[
			93,
			-1
		],
		[
			25,
			104
		],
		[
			75,
			8
		]
	],
	[
		[
			59950,
			70241
		],
		[
			4,
			-242
		],
		[
			-38,
			-90
		],
		[
			6,
			-4
		]
	],
	[
		[
			59757,
			70130
		],
		[
			99,
			482
		],
		[
			138,
			416
		],
		[
			5,
			21
		]
	],
	[
		[
			59999,
			71049
		],
		[
			125,
			-31
		],
		[
			45,
			-231
		],
		[
			-151,
			-223
		],
		[
			-68,
			-323
		]
	],
	[
		[
			63761,
			43212
		],
		[
			74,
			-251
		],
		[
			69,
			-390
		],
		[
			45,
			-711
		],
		[
			72,
			-276
		],
		[
			-28,
			-284
		],
		[
			-49,
			-174
		],
		[
			-94,
			347
		],
		[
			-53,
			-175
		],
		[
			53,
			-438
		],
		[
			-24,
			-250
		],
		[
			-77,
			-137
		],
		[
			-18,
			-500
		],
		[
			-109,
			-689
		],
		[
			-137,
			-814
		],
		[
			-172,
			-1120
		],
		[
			-106,
			-821
		],
		[
			-125,
			-685
		],
		[
			-226,
			-140
		],
		[
			-243,
			-250
		],
		[
			-160,
			151
		],
		[
			-220,
			211
		],
		[
			-77,
			312
		],
		[
			-18,
			524
		],
		[
			-98,
			471
		],
		[
			-26,
			425
		],
		[
			50,
			426
		],
		[
			128,
			102
		],
		[
			1,
			197
		],
		[
			133,
			447
		],
		[
			25,
			377
		],
		[
			-65,
			280
		],
		[
			-52,
			372
		],
		[
			-23,
			544
		],
		[
			97,
			331
		],
		[
			38,
			375
		],
		[
			138,
			22
		],
		[
			155,
			121
		],
		[
			103,
			107
		],
		[
			122,
			7
		],
		[
			158,
			337
		],
		[
			229,
			364
		],
		[
			83,
			297
		],
		[
			-38,
			253
		],
		[
			118,
			-71
		],
		[
			153,
			410
		],
		[
			6,
			356
		],
		[
			92,
			264
		],
		[
			96,
			-254
		]
	],
	[
		[
			59873,
			69719
		],
		[
			0,
			-362
		],
		[
			-41,
			-173
		]
	],
	[
		[
			45321,
			58350
		],
		[
			36,
			262
		]
	],
	[
		[
			52633,
			68486
		],
		[
			-118,
			1061
		],
		[
			-171,
			238
		],
		[
			-3,
			143
		],
		[
			-227,
			352
		],
		[
			-24,
			445
		],
		[
			171,
			330
		],
		[
			65,
			487
		],
		[
			-44,
			563
		],
		[
			57,
			303
		]
	],
	[
		[
			52339,
			72408
		],
		[
			302,
			239
		],
		[
			195,
			-71
		],
		[
			-9,
			-299
		],
		[
			236,
			217
		],
		[
			20,
			-113
		],
		[
			-139,
			-290
		],
		[
			-2,
			-273
		],
		[
			96,
			-147
		],
		[
			-36,
			-511
		],
		[
			-183,
			-297
		],
		[
			53,
			-322
		],
		[
			143,
			-10
		],
		[
			70,
			-281
		],
		[
			106,
			-92
		]
	],
	[
		[
			53191,
			70158
		],
		[
			-16,
			-454
		],
		[
			-135,
			-170
		],
		[
			-86,
			-189
		],
		[
			-191,
			-228
		],
		[
			30,
			-244
		],
		[
			-24,
			-250
		],
		[
			-136,
			-137
		]
	],
	[
		[
			47592,
			66920
		],
		[
			-2,
			700
		],
		[
			449,
			436
		],
		[
			277,
			90
		],
		[
			227,
			159
		],
		[
			107,
			295
		],
		[
			324,
			234
		],
		[
			12,
			438
		],
		[
			161,
			51
		],
		[
			126,
			219
		],
		[
			363,
			99
		],
		[
			51,
			230
		],
		[
			-73,
			125
		],
		[
			-96,
			624
		],
		[
			-17,
			359
		],
		[
			-104,
			379
		]
	],
	[
		[
			49397,
			71358
		],
		[
			267,
			323
		],
		[
			300,
			102
		],
		[
			175,
			244
		],
		[
			268,
			180
		],
		[
			471,
			105
		],
		[
			459,
			48
		],
		[
			140,
			-87
		],
		[
			262,
			232
		],
		[
			297,
			5
		],
		[
			113,
			-137
		],
		[
			190,
			35
		]
	],
	[
		[
			52633,
			68486
		],
		[
			90,
			-522
		],
		[
			15,
			-274
		],
		[
			-49,
			-482
		],
		[
			21,
			-270
		],
		[
			-36,
			-323
		],
		[
			24,
			-371
		],
		[
			-110,
			-247
		],
		[
			164,
			-431
		],
		[
			11,
			-253
		],
		[
			99,
			-330
		],
		[
			130,
			109
		],
		[
			219,
			-275
		],
		[
			122,
			-370
		]
	],
	[
		[
			59922,
			69905
		],
		[
			309,
			-234
		],
		[
			544,
			630
		]
	],
	[
		[
			60775,
			70301
		],
		[
			112,
			-720
		]
	],
	[
		[
			60887,
			69581
		],
		[
			-53,
			-89
		],
		[
			-556,
			-296
		],
		[
			277,
			-591
		],
		[
			-92,
			-101
		],
		[
			-46,
			-197
		],
		[
			-212,
			-82
		],
		[
			-66,
			-213
		],
		[
			-120,
			-182
		],
		[
			-310,
			94
		]
	],
	[
		[
			59709,
			67924
		],
		[
			-9,
			86
		]
	],
	[
		[
			64327,
			64904
		],
		[
			49,
			29
		],
		[
			11,
			-162
		],
		[
			217,
			93
		],
		[
			230,
			-15
		],
		[
			168,
			-18
		],
		[
			190,
			400
		],
		[
			207,
			379
		],
		[
			176,
			364
		]
	],
	[
		[
			65575,
			65974
		],
		[
			52,
			-202
		]
	],
	[
		[
			65627,
			65772
		],
		[
			38,
			-466
		]
	],
	[
		[
			65665,
			65306
		],
		[
			-142,
			-3
		],
		[
			-23,
			-384
		],
		[
			50,
			-82
		],
		[
			-126,
			-117
		],
		[
			-1,
			-241
		],
		[
			-81,
			-245
		],
		[
			-7,
			-238
		]
	],
	[
		[
			65335,
			63996
		],
		[
			-56,
			-125
		],
		[
			-835,
			298
		],
		[
			-106,
			599
		],
		[
			-11,
			136
		]
	],
	[
		[
			64113,
			65205
		],
		[
			-18,
			430
		],
		[
			75,
			310
		],
		[
			76,
			64
		],
		[
			84,
			-185
		],
		[
			5,
			-346
		],
		[
			-61,
			-348
		]
	],
	[
		[
			64274,
			65130
		],
		[
			-77,
			-42
		],
		[
			-84,
			117
		]
	],
	[
		[
			63326,
			68290
		],
		[
			58,
			-261
		],
		[
			-25,
			-135
		],
		[
			89,
			-445
		]
	],
	[
		[
			63448,
			67449
		],
		[
			-196,
			-16
		],
		[
			-69,
			282
		],
		[
			-248,
			57
		]
	],
	[
		[
			62935,
			67772
		],
		[
			204,
			567
		],
		[
			187,
			-49
		]
	],
	[
		[
			60775,
			70301
		],
		[
			615,
			614
		],
		[
			105,
			715
		],
		[
			-26,
			431
		],
		[
			152,
			146
		],
		[
			142,
			369
		]
	],
	[
		[
			61763,
			72576
		],
		[
			119,
			92
		],
		[
			324,
			-77
		],
		[
			97,
			-150
		],
		[
			133,
			100
		]
	],
	[
		[
			62436,
			72541
		],
		[
			180,
			-705
		],
		[
			182,
			-177
		],
		[
			21,
			-345
		],
		[
			-139,
			-204
		],
		[
			-65,
			-461
		],
		[
			193,
			-562
		],
		[
			340,
			-324
		],
		[
			143,
			-449
		],
		[
			-46,
			-428
		],
		[
			89,
			0
		],
		[
			3,
			-314
		],
		[
			153,
			-311
		]
	],
	[
		[
			63490,
			68261
		],
		[
			-164,
			29
		]
	],
	[
		[
			62935,
			67772
		],
		[
			-516,
			47
		],
		[
			-784,
			1188
		],
		[
			-413,
			414
		],
		[
			-335,
			160
		]
	],
	[
		[
			65665,
			65306
		],
		[
			125,
			-404
		],
		[
			155,
			-214
		],
		[
			203,
			-78
		],
		[
			165,
			-107
		],
		[
			125,
			-339
		],
		[
			75,
			-196
		],
		[
			100,
			-75
		],
		[
			-1,
			-132
		],
		[
			-101,
			-352
		],
		[
			-44,
			-166
		],
		[
			-117,
			-189
		],
		[
			-104,
			-404
		],
		[
			-126,
			31
		],
		[
			-58,
			-141
		],
		[
			-44,
			-300
		],
		[
			34,
			-395
		],
		[
			-26,
			-72
		],
		[
			-128,
			2
		],
		[
			-174,
			-221
		],
		[
			-27,
			-288
		],
		[
			-63,
			-125
		],
		[
			-173,
			5
		],
		[
			-109,
			-149
		],
		[
			1,
			-238
		],
		[
			-134,
			-165
		],
		[
			-153,
			56
		],
		[
			-186,
			-199
		],
		[
			-128,
			-34
		]
	],
	[
		[
			64752,
			60417
		],
		[
			-91,
			413
		],
		[
			-217,
			975
		]
	],
	[
		[
			64444,
			61805
		],
		[
			833,
			591
		],
		[
			185,
			1182
		],
		[
			-127,
			418
		]
	],
	[
		[
			65575,
			65974
		],
		[
			80,
			201
		],
		[
			35,
			-51
		],
		[
			-26,
			-244
		],
		[
			-37,
			-108
		]
	],
	[
		[
			96448,
			41190
		],
		[
			175,
			-339
		],
		[
			-92,
			-78
		],
		[
			-93,
			259
		],
		[
			10,
			158
		]
	],
	[
		[
			96330,
			41322
		],
		[
			-39,
			163
		],
		[
			-6,
			453
		],
		[
			133,
			-182
		],
		[
			45,
			-476
		],
		[
			-75,
			74
		],
		[
			-58,
			-32
		]
	],
	[
		[
			78495,
			57780
		],
		[
			-66,
			713
		],
		[
			178,
			492
		],
		[
			359,
			112
		],
		[
			261,
			-84
		]
	],
	[
		[
			79227,
			59013
		],
		[
			229,
			-232
		],
		[
			126,
			407
		],
		[
			246,
			-217
		]
	],
	[
		[
			79828,
			58971
		],
		[
			64,
			-394
		],
		[
			-34,
			-708
		],
		[
			-467,
			-455
		],
		[
			122,
			-358
		],
		[
			-292,
			-43
		],
		[
			-240,
			-238
		]
	],
	[
		[
			78981,
			56775
		],
		[
			-233,
			87
		],
		[
			-112,
			307
		],
		[
			-141,
			611
		]
	],
	[
		[
			78495,
			57780
		],
		[
			-249,
			271
		],
		[
			-238,
			-11
		],
		[
			41,
			464
		],
		[
			-245,
			-3
		],
		[
			-22,
			-650
		],
		[
			-150,
			-863
		],
		[
			-90,
			-522
		],
		[
			19,
			-428
		],
		[
			181,
			-18
		],
		[
			113,
			-539
		],
		[
			50,
			-512
		],
		[
			155,
			-338
		],
		[
			168,
			-69
		],
		[
			144,
			-306
		]
	],
	[
		[
			78372,
			54256
		],
		[
			-91,
			-243
		],
		[
			-183,
			-71
		],
		[
			-22,
			304
		],
		[
			-227,
			258
		],
		[
			-48,
			-105
		]
	],
	[
		[
			77801,
			54399
		],
		[
			-110,
			227
		],
		[
			-47,
			292
		],
		[
			-148,
			334
		],
		[
			-135,
			280
		],
		[
			-45,
			-347
		],
		[
			-53,
			328
		],
		[
			30,
			369
		],
		[
			82,
			566
		]
	],
	[
		[
			77375,
			56448
		],
		[
			135,
			607
		],
		[
			152,
			551
		],
		[
			-108,
			539
		],
		[
			4,
			274
		],
		[
			-32,
			330
		],
		[
			-185,
			470
		],
		[
			-66,
			296
		],
		[
			96,
			109
		],
		[
			101,
			514
		],
		[
			-113,
			390
		],
		[
			-177,
			431
		],
		[
			-134,
			519
		],
		[
			117,
			107
		],
		[
			127,
			639
		],
		[
			196,
			26
		],
		[
			162,
			256
		],
		[
			159,
			137
		]
	],
	[
		[
			77809,
			62643
		],
		[
			120,
			-182
		],
		[
			16,
			-355
		],
		[
			188,
			-27
		],
		[
			-68,
			-623
		],
		[
			6,
			-530
		],
		[
			293,
			353
		],
		[
			83,
			-104
		],
		[
			163,
			17
		],
		[
			56,
			205
		],
		[
			210,
			-40
		],
		[
			211,
			-480
		],
		[
			18,
			-583
		],
		[
			224,
			-515
		],
		[
			-12,
			-500
		],
		[
			-90,
			-266
		]
	],
	[
		[
			77809,
			62643
		],
		[
			59,
			218
		],
		[
			237,
			384
		]
	],
	[
		[
			78105,
			63245
		],
		[
			25,
			-139
		],
		[
			148,
			-16
		],
		[
			-42,
			676
		],
		[
			144,
			86
		]
	],
	[
		[
			78380,
			63852
		],
		[
			162,
			-466
		],
		[
			125,
			-537
		],
		[
			342,
			-5
		],
		[
			108,
			-515
		],
		[
			-178,
			-155
		],
		[
			-80,
			-212
		],
		[
			333,
			-353
		],
		[
			231,
			-699
		],
		[
			175,
			-520
		],
		[
			210,
			-411
		],
		[
			70,
			-418
		],
		[
			-50,
			-590
		]
	],
	[
		[
			77375,
			56448
		],
		[
			-27,
			439
		],
		[
			86,
			452
		],
		[
			-94,
			350
		],
		[
			23,
			644
		],
		[
			-113,
			306
		],
		[
			-90,
			707
		],
		[
			-50,
			746
		],
		[
			-121,
			490
		],
		[
			-183,
			-297
		],
		[
			-315,
			-421
		],
		[
			-156,
			53
		],
		[
			-172,
			138
		],
		[
			96,
			732
		],
		[
			-58,
			554
		],
		[
			-218,
			681
		],
		[
			34,
			213
		],
		[
			-163,
			76
		],
		[
			-197,
			481
		]
	],
	[
		[
			75657,
			62792
		],
		[
			-18,
			476
		],
		[
			97,
			-90
		],
		[
			6,
			424
		]
	],
	[
		[
			75742,
			63602
		],
		[
			137,
			140
		],
		[
			-30,
			251
		],
		[
			63,
			201
		],
		[
			11,
			612
		],
		[
			217,
			-135
		],
		[
			124,
			487
		],
		[
			14,
			288
		],
		[
			153,
			496
		],
		[
			-8,
			338
		],
		[
			359,
			408
		],
		[
			199,
			-107
		],
		[
			-23,
			364
		],
		[
			97,
			108
		],
		[
			-20,
			224
		]
	],
	[
		[
			77035,
			67277
		],
		[
			162,
			44
		],
		[
			93,
			-348
		],
		[
			121,
			-141
		],
		[
			8,
			-452
		],
		[
			-11,
			-487
		],
		[
			-263,
			-493
		],
		[
			-33,
			-701
		],
		[
			293,
			98
		],
		[
			66,
			-544
		],
		[
			176,
			-115
		],
		[
			-81,
			-490
		],
		[
			206,
			-222
		],
		[
			121,
			-109
		],
		[
			203,
			172
		],
		[
			9,
			-244
		]
	],
	[
		[
			78380,
			63852
		],
		[
			149,
			145
		],
		[
			221,
			-3
		],
		[
			271,
			68
		],
		[
			236,
			315
		],
		[
			134,
			-222
		],
		[
			254,
			-108
		],
		[
			-44,
			-340
		],
		[
			132,
			-240
		],
		[
			280,
			-154
		]
	],
	[
		[
			80013,
			63313
		],
		[
			-371,
			-505
		],
		[
			-231,
			-558
		],
		[
			-61,
			-410
		],
		[
			212,
			-623
		],
		[
			260,
			-772
		],
		[
			252,
			-365
		],
		[
			169,
			-475
		],
		[
			127,
			-1093
		],
		[
			-37,
			-1039
		],
		[
			-232,
			-389
		],
		[
			-318,
			-381
		],
		[
			-227,
			-492
		],
		[
			-346,
			-550
		],
		[
			-101,
			378
		],
		[
			78,
			401
		],
		[
			-206,
			335
		]
	],
	[
		[
			86327,
			75524
		],
		[
			0,
			0
		]
	],
	[
		[
			86327,
			75524
		],
		[
			-106,
			36
		],
		[
			-120,
			-200
		],
		[
			-83,
			-202
		],
		[
			10,
			-424
		],
		[
			-143,
			-130
		],
		[
			-50,
			-105
		],
		[
			-104,
			-174
		],
		[
			-185,
			-97
		],
		[
			-121,
			-159
		],
		[
			-9,
			-256
		],
		[
			-32,
			-65
		],
		[
			111,
			-96
		],
		[
			157,
			-259
		]
	],
	[
		[
			85652,
			73393
		],
		[
			-40,
			-143
		],
		[
			-118,
			-39
		],
		[
			-197,
			-29
		],
		[
			-108,
			-266
		],
		[
			-124,
			21
		],
		[
			-17,
			-54
		]
	],
	[
		[
			85048,
			72883
		],
		[
			-135,
			112
		],
		[
			-34,
			-111
		],
		[
			-81,
			-49
		],
		[
			-10,
			112
		],
		[
			-72,
			54
		],
		[
			-75,
			94
		],
		[
			76,
			260
		],
		[
			66,
			69
		],
		[
			-25,
			108
		],
		[
			71,
			319
		],
		[
			-18,
			96
		],
		[
			-163,
			65
		],
		[
			-131,
			158
		]
	],
	[
		[
			84517,
			74170
		],
		[
			227,
			379
		],
		[
			306,
			318
		],
		[
			191,
			419
		],
		[
			131,
			-185
		],
		[
			241,
			-22
		],
		[
			-44,
			312
		],
		[
			429,
			254
		],
		[
			111,
			331
		],
		[
			179,
			-348
		]
	],
	[
		[
			85652,
			73393
		],
		[
			240,
			-697
		],
		[
			68,
			-383
		],
		[
			3,
			-681
		],
		[
			-105,
			-325
		],
		[
			-252,
			-113
		],
		[
			-222,
			-245
		],
		[
			-250,
			-51
		],
		[
			-31,
			322
		],
		[
			51,
			443
		],
		[
			-122,
			615
		],
		[
			206,
			99
		],
		[
			-190,
			506
		]
	],
	[
		[
			82410,
			80055
		],
		[
			-135,
			-446
		],
		[
			-197,
			-590
		],
		[
			72,
			-241
		],
		[
			157,
			74
		],
		[
			274,
			-92
		],
		[
			214,
			219
		],
		[
			223,
			-189
		],
		[
			251,
			-413
		],
		[
			-30,
			-210
		],
		[
			-219,
			66
		],
		[
			-404,
			-78
		],
		[
			-195,
			-168
		],
		[
			-204,
			-391
		],
		[
			-423,
			-229
		],
		[
			-277,
			-313
		],
		[
			-286,
			120
		],
		[
			-156,
			53
		],
		[
			-146,
			-381
		],
		[
			89,
			-227
		],
		[
			45,
			-195
		],
		[
			-194,
			-199
		],
		[
			-200,
			-316
		],
		[
			-324,
			-208
		],
		[
			-417,
			-22
		],
		[
			-448,
			-205
		],
		[
			-324,
			-318
		],
		[
			-123,
			184
		],
		[
			-336,
			-1
		],
		[
			-411,
			359
		],
		[
			-274,
			88
		],
		[
			-369,
			-82
		],
		[
			-574,
			133
		],
		[
			-306,
			-14
		],
		[
			-163,
			351
		],
		[
			-127,
			544
		],
		[
			-171,
			66
		],
		[
			-336,
			368
		],
		[
			-374,
			83
		],
		[
			-330,
			101
		],
		[
			-100,
			256
		],
		[
			107,
			690
		],
		[
			-192,
			476
		],
		[
			-396,
			222
		],
		[
			-233,
			313
		],
		[
			-73,
			413
		]
	],
	[
		[
			75742,
			63602
		],
		[
			-147,
			937
		],
		[
			-76,
			-2
		],
		[
			-46,
			-377
		],
		[
			-152,
			306
		],
		[
			86,
			336
		],
		[
			124,
			34
		],
		[
			128,
			500
		],
		[
			-160,
			101
		],
		[
			-257,
			-8
		],
		[
			-265,
			81
		],
		[
			-24,
			410
		],
		[
			-133,
			30
		],
		[
			-220,
			255
		],
		[
			-98,
			-401
		],
		[
			200,
			-313
		],
		[
			-173,
			-220
		],
		[
			-62,
			-215
		],
		[
			171,
			-159
		],
		[
			-47,
			-356
		],
		[
			96,
			-444
		],
		[
			43,
			-486
		]
	],
	[
		[
			74730,
			63611
		],
		[
			-39,
			-216
		],
		[
			-189,
			7
		],
		[
			-343,
			-122
		],
		[
			16,
			-445
		],
		[
			-148,
			-349
		],
		[
			-400,
			-398
		],
		[
			-311,
			-695
		],
		[
			-209,
			-373
		],
		[
			-276,
			-387
		],
		[
			-1,
			-271
		],
		[
			-138,
			-146
		],
		[
			-251,
			-212
		],
		[
			-129,
			-31
		],
		[
			-84,
			-450
		],
		[
			58,
			-769
		],
		[
			15,
			-490
		],
		[
			-118,
			-561
		],
		[
			-1,
			-1004
		],
		[
			-144,
			-29
		],
		[
			-126,
			-450
		],
		[
			84,
			-195
		],
		[
			-253,
			-168
		],
		[
			-93,
			-401
		],
		[
			-112,
			-170
		],
		[
			-263,
			552
		],
		[
			-128,
			827
		],
		[
			-107,
			596
		],
		[
			-97,
			279
		],
		[
			-148,
			568
		],
		[
			-69,
			739
		],
		[
			-48,
			369
		],
		[
			-253,
			811
		],
		[
			-115,
			1145
		],
		[
			-83,
			756
		],
		[
			1,
			716
		],
		[
			-54,
			553
		],
		[
			-404,
			-353
		],
		[
			-196,
			70
		],
		[
			-362,
			716
		],
		[
			133,
			214
		],
		[
			-82,
			232
		],
		[
			-326,
			501
		]
	],
	[
		[
			68937,
			64577
		],
		[
			185,
			395
		],
		[
			612,
			-2
		],
		[
			-56,
			507
		],
		[
			-156,
			300
		],
		[
			-31,
			455
		],
		[
			-182,
			265
		],
		[
			306,
			619
		],
		[
			323,
			-45
		],
		[
			290,
			620
		],
		[
			174,
			599
		],
		[
			270,
			593
		],
		[
			-4,
			421
		],
		[
			236,
			342
		],
		[
			-224,
			292
		],
		[
			-96,
			400
		],
		[
			-99,
			517
		],
		[
			137,
			255
		],
		[
			421,
			-144
		],
		[
			310,
			88
		],
		[
			268,
			496
		]
	],
	[
		[
			71621,
			71550
		],
		[
			298,
			-692
		],
		[
			-28,
			-482
		],
		[
			111,
			-303
		],
		[
			-9,
			-301
		],
		[
			-200,
			79
		],
		[
			78,
			-651
		],
		[
			273,
			-374
		],
		[
			386,
			-413
		]
	],
	[
		[
			72530,
			68413
		],
		[
			-176,
			-268
		],
		[
			-108,
			-553
		],
		[
			269,
			-224
		],
		[
			262,
			-289
		],
		[
			362,
			-332
		],
		[
			381,
			-76
		],
		[
			160,
			-301
		],
		[
			215,
			-56
		],
		[
			334,
			-138
		],
		[
			231,
			10
		],
		[
			32,
			234
		],
		[
			-36,
			375
		],
		[
			21,
			255
		]
	],
	[
		[
			74477,
			67050
		],
		[
			170,
			124
		],
		[
			23,
			-465
		]
	],
	[
		[
			74670,
			66709
		],
		[
			6,
			-119
		],
		[
			252,
			-224
		],
		[
			175,
			92
		],
		[
			234,
			-39
		],
		[
			227,
			17
		],
		[
			20,
			363
		],
		[
			-113,
			189
		]
	],
	[
		[
			75471,
			66988
		],
		[
			224,
			74
		],
		[
			252,
			439
		],
		[
			321,
			376
		],
		[
			233,
			-145
		],
		[
			198,
			249
		],
		[
			130,
			-367
		],
		[
			-94,
			-248
		],
		[
			300,
			-89
		]
	],
	[
		[
			75657,
			62792
		],
		[
			-79,
			308
		],
		[
			-16,
			301
		],
		[
			-53,
			285
		],
		[
			-116,
			344
		],
		[
			-256,
			23
		],
		[
			25,
			-243
		],
		[
			-87,
			-329
		],
		[
			-118,
			120
		],
		[
			-41,
			-108
		],
		[
			-78,
			65
		],
		[
			-108,
			53
		]
	],
	[
		[
			74670,
			66709
		],
		[
			184,
			439
		],
		[
			150,
			150
		],
		[
			198,
			-137
		],
		[
			147,
			-14
		],
		[
			122,
			-159
		]
	],
	[
		[
			72530,
			68413
		],
		[
			115,
			141
		],
		[
			223,
			-182
		],
		[
			280,
			-385
		],
		[
			157,
			-84
		],
		[
			93,
			-284
		],
		[
			216,
			-117
		],
		[
			225,
			-259
		],
		[
			314,
			-136
		],
		[
			324,
			-57
		]
	],
	[
		[
			68937,
			64577
		],
		[
			-203,
			150
		],
		[
			-83,
			424
		],
		[
			-215,
			450
		],
		[
			-512,
			-111
		],
		[
			-451,
			-11
		],
		[
			-391,
			-83
		]
	],
	[
		[
			67082,
			65396
		],
		[
			105,
			687
		],
		[
			400,
			305
		],
		[
			-23,
			272
		],
		[
			-133,
			96
		],
		[
			-7,
			520
		],
		[
			-266,
			260
		],
		[
			-112,
			357
		],
		[
			-137,
			310
		]
	],
	[
		[
			66909,
			68203
		],
		[
			465,
			-301
		],
		[
			278,
			88
		],
		[
			166,
			-75
		],
		[
			56,
			129
		],
		[
			194,
			-52
		],
		[
			361,
			246
		],
		[
			10,
			503
		],
		[
			154,
			334
		],
		[
			207,
			-1
		],
		[
			31,
			166
		],
		[
			212,
			77
		],
		[
			103,
			-55
		],
		[
			108,
			166
		],
		[
			-15,
			355
		],
		[
			118,
			356
		],
		[
			177,
			150
		],
		[
			-110,
			390
		],
		[
			265,
			-18
		],
		[
			76,
			213
		],
		[
			-12,
			227
		],
		[
			139,
			248
		],
		[
			-32,
			294
		],
		[
			-66,
			250
		],
		[
			163,
			258
		],
		[
			298,
			124
		],
		[
			319,
			68
		],
		[
			141,
			109
		],
		[
			162,
			67
		]
	],
	[
		[
			70877,
			72519
		],
		[
			205,
			-276
		],
		[
			82,
			-454
		],
		[
			457,
			-239
		]
	],
	[
		[
			68841,
			72526
		],
		[
			85,
			-72
		],
		[
			201,
			189
		],
		[
			93,
			-114
		],
		[
			90,
			271
		],
		[
			166,
			-12
		],
		[
			43,
			86
		],
		[
			29,
			239
		],
		[
			120,
			205
		],
		[
			150,
			-134
		],
		[
			-30,
			-181
		],
		[
			84,
			-28
		],
		[
			-26,
			-496
		],
		[
			110,
			-194
		],
		[
			97,
			125
		],
		[
			123,
			58
		],
		[
			173,
			265
		],
		[
			192,
			-44
		],
		[
			286,
			-1
		]
	],
	[
		[
			70827,
			72688
		],
		[
			50,
			-169
		]
	],
	[
		[
			66909,
			68203
		],
		[
			252,
			536
		],
		[
			-23,
			380
		],
		[
			-210,
			100
		],
		[
			-22,
			375
		],
		[
			-91,
			472
		],
		[
			119,
			323
		],
		[
			-121,
			87
		],
		[
			76,
			430
		],
		[
			113,
			736
		]
	],
	[
		[
			67002,
			71642
		],
		[
			284,
			-224
		],
		[
			209,
			79
		],
		[
			58,
			268
		],
		[
			219,
			89
		],
		[
			157,
			180
		],
		[
			55,
			472
		],
		[
			234,
			114
		],
		[
			44,
			211
		],
		[
			131,
			-158
		],
		[
			84,
			-19
		]
	],
	[
		[
			69725,
			74357
		],
		[
			-101,
			-182
		],
		[
			-303,
			98
		],
		[
			-26,
			-340
		],
		[
			301,
			46
		],
		[
			343,
			-192
		],
		[
			526,
			89
		]
	],
	[
		[
			70465,
			73876
		],
		[
			70,
			-546
		],
		[
			91,
			59
		],
		[
			169,
			-134
		],
		[
			-10,
			-230
		],
		[
			42,
			-337
		]
	],
	[
		[
			72294,
			75601
		],
		[
			-39,
			-134
		],
		[
			-438,
			-320
		],
		[
			-99,
			-234
		],
		[
			-356,
			-70
		],
		[
			-105,
			-378
		],
		[
			-294,
			80
		],
		[
			-192,
			-116
		],
		[
			-266,
			-279
		],
		[
			39,
			-138
		],
		[
			-79,
			-136
		]
	],
	[
		[
			67002,
			71642
		],
		[
			-24,
			498
		],
		[
			-207,
			21
		],
		[
			-318,
			523
		],
		[
			-221,
			65
		],
		[
			-308,
			299
		],
		[
			-197,
			55
		],
		[
			-122,
			-110
		],
		[
			-186,
			17
		],
		[
			-197,
			-338
		],
		[
			-244,
			-114
		]
	],
	[
		[
			64978,
			72558
		],
		[
			-52,
			417
		],
		[
			40,
			618
		],
		[
			-216,
			200
		],
		[
			71,
			405
		],
		[
			-184,
			34
		],
		[
			61,
			498
		],
		[
			262,
			-145
		],
		[
			244,
			189
		],
		[
			-202,
			355
		],
		[
			-80,
			338
		],
		[
			-224,
			-151
		],
		[
			-28,
			-433
		],
		[
			-87,
			383
		]
	],
	[
		[
			62436,
			72541
		],
		[
			-152,
			473
		],
		[
			55,
			183
		],
		[
			-87,
			678
		],
		[
			190,
			168
		]
	],
	[
		[
			62442,
			74043
		],
		[
			44,
			-223
		],
		[
			141,
			-273
		],
		[
			190,
			-78
		]
	],
	[
		[
			62817,
			73469
		],
		[
			101,
			17
		]
	],
	[
		[
			62918,
			73486
		],
		[
			327,
			436
		],
		[
			104,
			44
		],
		[
			82,
			-174
		],
		[
			-95,
			-292
		],
		[
			173,
			-309
		],
		[
			69,
			29
		]
	],
	[
		[
			63578,
			73220
		],
		[
			88,
			-436
		],
		[
			263,
			-123
		],
		[
			193,
			-296
		],
		[
			395,
			-102
		],
		[
			434,
			156
		],
		[
			27,
			139
		]
	],
	[
		[
			67082,
			65396
		],
		[
			-523,
			179
		],
		[
			-303,
			136
		],
		[
			-313,
			76
		],
		[
			-118,
			725
		],
		[
			-133,
			105
		],
		[
			-214,
			-106
		],
		[
			-280,
			-286
		],
		[
			-339,
			196
		],
		[
			-281,
			454
		],
		[
			-267,
			168
		],
		[
			-186,
			561
		],
		[
			-205,
			788
		],
		[
			-149,
			-96
		],
		[
			-177,
			196
		],
		[
			-104,
			-231
		]
	],
	[
		[
			59999,
			71049
		],
		[
			-26,
			452
		],
		[
			68,
			243
		]
	],
	[
		[
			60041,
			71744
		],
		[
			74,
			129
		],
		[
			75,
			130
		],
		[
			15,
			329
		],
		[
			91,
			-115
		],
		[
			306,
			165
		],
		[
			147,
			-112
		],
		[
			229,
			2
		],
		[
			320,
			222
		],
		[
			149,
			-10
		],
		[
			316,
			92
		]
	],
	[
		[
			62817,
			73469
		],
		[
			-113,
			342
		],
		[
			1,
			91
		],
		[
			-123,
			-2
		],
		[
			-82,
			159
		],
		[
			-58,
			-16
		]
	],
	[
		[
			62442,
			74043
		],
		[
			-109,
			172
		],
		[
			-207,
			147
		],
		[
			27,
			288
		],
		[
			-47,
			208
		]
	],
	[
		[
			62106,
			74858
		],
		[
			386,
			92
		]
	],
	[
		[
			62492,
			74950
		],
		[
			57,
			-155
		],
		[
			106,
			-103
		],
		[
			-56,
			-148
		],
		[
			148,
			-202
		],
		[
			-78,
			-189
		],
		[
			118,
			-160
		],
		[
			124,
			-97
		],
		[
			7,
			-410
		]
	],
	[
		[
			55734,
			91409
		],
		[
			371,
			-289
		],
		[
			433,
			-402
		],
		[
			8,
			-910
		],
		[
			93,
			-230
		]
	],
	[
		[
			56639,
			89578
		],
		[
			-478,
			-167
		],
		[
			-269,
			-413
		],
		[
			43,
			-361
		],
		[
			-441,
			-475
		],
		[
			-537,
			-509
		],
		[
			-202,
			-832
		],
		[
			198,
			-416
		],
		[
			265,
			-328
		],
		[
			-255,
			-666
		],
		[
			-289,
			-138
		],
		[
			-106,
			-992
		],
		[
			-157,
			-554
		],
		[
			-337,
			57
		],
		[
			-158,
			-468
		],
		[
			-321,
			-27
		],
		[
			-89,
			558
		],
		[
			-232,
			671
		],
		[
			-211,
			835
		]
	],
	[
		[
			58829,
			81362
		],
		[
			-239,
			-35
		],
		[
			-85,
			-129
		],
		[
			-18,
			-298
		],
		[
			-111,
			57
		],
		[
			-250,
			-28
		],
		[
			-73,
			138
		],
		[
			-104,
			-103
		],
		[
			-105,
			86
		],
		[
			-218,
			12
		],
		[
			-310,
			141
		],
		[
			-281,
			47
		],
		[
			-215,
			-14
		],
		[
			-152,
			-160
		],
		[
			-133,
			-23
		]
	],
	[
		[
			56535,
			81053
		],
		[
			-6,
			263
		],
		[
			-85,
			274
		],
		[
			166,
			121
		],
		[
			2,
			235
		],
		[
			-77,
			225
		],
		[
			-12,
			261
		]
	],
	[
		[
			56523,
			82432
		],
		[
			268,
			-4
		],
		[
			302,
			223
		],
		[
			64,
			333
		],
		[
			228,
			190
		],
		[
			-26,
			264
		]
	],
	[
		[
			57359,
			83438
		],
		[
			169,
			100
		],
		[
			298,
			228
		]
	],
	[
		[
			60617,
			78409
		],
		[
			-222,
			-48
		],
		[
			-185,
			-191
		],
		[
			-260,
			-31
		],
		[
			-239,
			-220
		],
		[
			14,
			-317
		]
	],
	[
		[
			59287,
			77741
		],
		[
			-38,
			64
		],
		[
			-432,
			149
		],
		[
			-19,
			221
		],
		[
			-257,
			-73
		],
		[
			-103,
			-325
		],
		[
			-215,
			-437
		]
	],
	[
		[
			58223,
			77340
		],
		[
			-126,
			101
		],
		[
			-131,
			-95
		],
		[
			-124,
			109
		]
	],
	[
		[
			57842,
			77455
		],
		[
			70,
			64
		],
		[
			49,
			203
		],
		[
			76,
			188
		],
		[
			-20,
			106
		],
		[
			58,
			47
		],
		[
			27,
			-81
		],
		[
			164,
			-18
		],
		[
			74,
			44
		],
		[
			-52,
			60
		],
		[
			19,
			88
		],
		[
			-97,
			150
		],
		[
			-40,
			247
		],
		[
			-101,
			97
		],
		[
			20,
			200
		],
		[
			-125,
			159
		],
		[
			-115,
			22
		],
		[
			-204,
			184
		],
		[
			-185,
			-58
		],
		[
			-66,
			-87
		]
	],
	[
		[
			57394,
			79070
		],
		[
			-118,
			0
		],
		[
			-69,
			-139
		],
		[
			-205,
			-56
		],
		[
			-95,
			-91
		],
		[
			-129,
			144
		],
		[
			-178,
			3
		],
		[
			-172,
			65
		],
		[
			-120,
			-127
		]
	],
	[
		[
			56308,
			78869
		],
		[
			-19,
			159
		],
		[
			-155,
			161
		]
	],
	[
		[
			56134,
			79189
		],
		[
			55,
			238
		],
		[
			77,
			154
		]
	],
	[
		[
			56266,
			79581
		],
		[
			60,
			-35
		],
		[
			-71,
			266
		],
		[
			252,
			491
		],
		[
			138,
			69
		],
		[
			29,
			166
		],
		[
			-139,
			515
		]
	],
	[
		[
			56266,
			79581
		],
		[
			-264,
			227
		],
		[
			-200,
			-84
		],
		[
			-131,
			61
		],
		[
			-165,
			-127
		],
		[
			-140,
			210
		],
		[
			-114,
			-81
		],
		[
			-16,
			36
		]
	],
	[
		[
			55236,
			79823
		],
		[
			-127,
			291
		],
		[
			-207,
			36
		],
		[
			-26,
			185
		],
		[
			-191,
			66
		],
		[
			-41,
			-153
		],
		[
			-151,
			122
		],
		[
			17,
			163
		],
		[
			-207,
			51
		],
		[
			-132,
			191
		]
	],
	[
		[
			54171,
			80775
		],
		[
			-114,
			377
		],
		[
			22,
			204
		],
		[
			-69,
			316
		],
		[
			-101,
			210
		],
		[
			77,
			158
		],
		[
			-64,
			300
		]
	],
	[
		[
			53922,
			82340
		],
		[
			189,
			174
		],
		[
			434,
			273
		],
		[
			350,
			200
		],
		[
			277,
			-100
		],
		[
			21,
			-144
		],
		[
			268,
			-7
		]
	],
	[
		[
			56314,
			82678
		],
		[
			142,
			-64
		],
		[
			67,
			-182
		]
	],
	[
		[
			54716,
			79012
		],
		[
			-21,
			-241
		],
		[
			-156,
			-2
		],
		[
			53,
			-128
		],
		[
			-92,
			-380
		]
	],
	[
		[
			54500,
			78261
		],
		[
			-53,
			-100
		],
		[
			-243,
			-14
		],
		[
			-140,
			-134
		],
		[
			-229,
			45
		]
	],
	[
		[
			53835,
			78058
		],
		[
			-398,
			153
		],
		[
			-62,
			205
		],
		[
			-274,
			-102
		],
		[
			-32,
			-113
		],
		[
			-169,
			84
		]
	],
	[
		[
			52900,
			78285
		],
		[
			-142,
			16
		],
		[
			-125,
			108
		],
		[
			42,
			145
		],
		[
			-10,
			104
		]
	],
	[
		[
			52665,
			78658
		],
		[
			83,
			33
		],
		[
			141,
			-164
		],
		[
			39,
			156
		],
		[
			245,
			-25
		],
		[
			199,
			106
		],
		[
			133,
			-18
		],
		[
			87,
			-121
		],
		[
			26,
			100
		],
		[
			-40,
			385
		],
		[
			100,
			75
		],
		[
			98,
			272
		]
	],
	[
		[
			53776,
			79457
		],
		[
			206,
			-190
		],
		[
			157,
			242
		],
		[
			98,
			44
		],
		[
			215,
			-180
		],
		[
			131,
			30
		],
		[
			128,
			-111
		]
	],
	[
		[
			54711,
			79292
		],
		[
			-23,
			-75
		],
		[
			28,
			-205
		]
	],
	[
		[
			56308,
			78869
		],
		[
			-170,
			-123
		],
		[
			-131,
			-401
		],
		[
			-168,
			-401
		],
		[
			-223,
			-111
		]
	],
	[
		[
			55616,
			77833
		],
		[
			-173,
			26
		],
		[
			-213,
			-155
		]
	],
	[
		[
			55230,
			77704
		],
		[
			-104,
			-89
		],
		[
			-229,
			114
		],
		[
			-208,
			253
		],
		[
			-88,
			73
		]
	],
	[
		[
			54601,
			78055
		],
		[
			-54,
			200
		],
		[
			-47,
			6
		]
	],
	[
		[
			54716,
			79012
		],
		[
			141,
			-151
		],
		[
			103,
			-65
		],
		[
			233,
			73
		],
		[
			22,
			118
		],
		[
			111,
			18
		],
		[
			135,
			92
		],
		[
			30,
			-38
		],
		[
			130,
			74
		],
		[
			66,
			139
		],
		[
			91,
			36
		],
		[
			297,
			-180
		],
		[
			59,
			61
		]
	],
	[
		[
			57842,
			77455
		],
		[
			-50,
			270
		],
		[
			30,
			252
		],
		[
			-9,
			259
		],
		[
			-160,
			352
		],
		[
			-89,
			249
		],
		[
			-86,
			175
		],
		[
			-84,
			58
		]
	],
	[
		[
			58223,
			77340
		],
		[
			6,
			-152
		],
		[
			-135,
			-128
		],
		[
			-84,
			56
		],
		[
			-78,
			-713
		]
	],
	[
		[
			57932,
			76403
		],
		[
			-163,
			62
		],
		[
			-202,
			215
		],
		[
			-327,
			-138
		],
		[
			-138,
			-150
		],
		[
			-408,
			31
		],
		[
			-213,
			92
		],
		[
			-108,
			-43
		],
		[
			-80,
			243
		]
	],
	[
		[
			56293,
			76715
		],
		[
			-51,
			103
		],
		[
			65,
			99
		],
		[
			-69,
			74
		],
		[
			-87,
			-133
		],
		[
			-162,
			172
		],
		[
			-22,
			244
		],
		[
			-169,
			139
		],
		[
			-31,
			188
		],
		[
			-151,
			232
		]
	],
	[
		[
			55907,
			83187
		],
		[
			-59,
			497
		]
	],
	[
		[
			55848,
			83684
		],
		[
			318,
			181
		],
		[
			466,
			-38
		],
		[
			273,
			59
		],
		[
			39,
			-123
		],
		[
			148,
			-38
		],
		[
			267,
			-287
		]
	],
	[
		[
			55848,
			83684
		],
		[
			10,
			445
		],
		[
			136,
			371
		],
		[
			262,
			202
		],
		[
			221,
			-442
		],
		[
			223,
			12
		],
		[
			53,
			453
		]
	],
	[
		[
			56753,
			84725
		],
		[
			237,
			105
		],
		[
			121,
			-73
		],
		[
			239,
			-219
		],
		[
			229,
			-1
		]
	],
	[
		[
			56753,
			84725
		],
		[
			32,
			349
		],
		[
			-102,
			-75
		],
		[
			-176,
			210
		],
		[
			-24,
			340
		],
		[
			351,
			164
		],
		[
			350,
			86
		],
		[
			301,
			-97
		],
		[
			287,
			17
		]
	],
	[
		[
			54171,
			80775
		],
		[
			-124,
			-62
		],
		[
			-73,
			68
		],
		[
			-70,
			-113
		],
		[
			-200,
			-114
		],
		[
			-103,
			-147
		],
		[
			-202,
			-129
		],
		[
			49,
			-176
		],
		[
			30,
			-249
		],
		[
			141,
			-142
		],
		[
			157,
			-254
		]
	],
	[
		[
			52665,
			78658
		],
		[
			-298,
			181
		],
		[
			-57,
			-128
		],
		[
			-236,
			4
		]
	],
	[
		[
			51718,
			79804
		],
		[
			16,
			259
		],
		[
			-56,
			133
		]
	],
	[
		[
			51678,
			80196
		],
		[
			32,
			400
		]
	],
	[
		[
			51710,
			80596
		],
		[
			-47,
			619
		],
		[
			167,
			0
		],
		[
			70,
			222
		],
		[
			69,
			541
		],
		[
			-51,
			200
		]
	],
	[
		[
			51918,
			82178
		],
		[
			54,
			125
		],
		[
			232,
			32
		],
		[
			52,
			-130
		],
		[
			188,
			291
		],
		[
			-63,
			222
		],
		[
			-13,
			335
		]
	],
	[
		[
			52368,
			83053
		],
		[
			210,
			-78
		],
		[
			178,
			90
		]
	],
	[
		[
			52756,
			83065
		],
		[
			4,
			-228
		],
		[
			281,
			-138
		],
		[
			-3,
			-210
		],
		[
			283,
			111
		],
		[
			156,
			162
		],
		[
			313,
			-233
		],
		[
			132,
			-189
		]
	],
	[
		[
			57932,
			76403
		],
		[
			-144,
			-245
		],
		[
			-101,
			-422
		],
		[
			89,
			-337
		]
	],
	[
		[
			57776,
			75399
		],
		[
			-239,
			79
		],
		[
			-283,
			-186
		]
	],
	[
		[
			57254,
			75292
		],
		[
			-3,
			-294
		],
		[
			-252,
			-56
		],
		[
			-196,
			206
		],
		[
			-222,
			-162
		],
		[
			-206,
			17
		]
	],
	[
		[
			56375,
			75003
		],
		[
			-20,
			391
		],
		[
			-139,
			189
		]
	],
	[
		[
			56216,
			75583
		],
		[
			46,
			84
		],
		[
			-30,
			70
		],
		[
			47,
			188
		],
		[
			105,
			185
		],
		[
			-135,
			255
		],
		[
			-24,
			216
		],
		[
			68,
			134
		]
	],
	[
		[
			57302,
			71436
		],
		[
			-35,
			-175
		],
		[
			-400,
			-50
		],
		[
			3,
			98
		],
		[
			-339,
			115
		],
		[
			52,
			251
		],
		[
			152,
			-199
		],
		[
			216,
			34
		],
		[
			207,
			-42
		],
		[
			-7,
			-103
		],
		[
			151,
			71
		]
	],
	[
		[
			57254,
			75292
		],
		[
			135,
			-157
		],
		[
			-86,
			-369
		],
		[
			-66,
			-67
		]
	],
	[
		[
			57237,
			74699
		],
		[
			-169,
			17
		],
		[
			-145,
			56
		],
		[
			-336,
			-154
		],
		[
			192,
			-332
		],
		[
			-141,
			-96
		],
		[
			-154,
			-1
		],
		[
			-147,
			305
		],
		[
			-52,
			-130
		],
		[
			62,
			-353
		],
		[
			139,
			-277
		],
		[
			-105,
			-129
		],
		[
			155,
			-273
		],
		[
			137,
			-171
		],
		[
			4,
			-334
		],
		[
			-257,
			157
		],
		[
			82,
			-302
		],
		[
			-176,
			-62
		],
		[
			105,
			-521
		],
		[
			-184,
			-8
		],
		[
			-228,
			257
		],
		[
			-104,
			473
		],
		[
			-49,
			393
		],
		[
			-108,
			272
		],
		[
			-143,
			337
		],
		[
			-18,
			168
		]
	],
	[
		[
			55597,
			73991
		],
		[
			129,
			287
		],
		[
			16,
			192
		],
		[
			91,
			85
		],
		[
			5,
			155
		]
	],
	[
		[
			55838,
			74710
		],
		[
			182,
			53
		],
		[
			106,
			129
		],
		[
			150,
			-12
		],
		[
			46,
			103
		],
		[
			53,
			20
		]
	],
	[
		[
			60041,
			71744
		],
		[
			-102,
			268
		],
		[
			105,
			222
		],
		[
			-169,
			-51
		],
		[
			-233,
			136
		],
		[
			-191,
			-340
		],
		[
			-421,
			-66
		],
		[
			-225,
			317
		],
		[
			-300,
			20
		],
		[
			-64,
			-245
		],
		[
			-192,
			-70
		],
		[
			-268,
			314
		],
		[
			-303,
			-11
		],
		[
			-165,
			588
		],
		[
			-203,
			328
		],
		[
			135,
			459
		],
		[
			-176,
			283
		],
		[
			308,
			565
		],
		[
			428,
			23
		],
		[
			117,
			449
		],
		[
			529,
			-78
		],
		[
			334,
			383
		],
		[
			324,
			167
		],
		[
			459,
			13
		],
		[
			485,
			-417
		],
		[
			399,
			-228
		],
		[
			323,
			91
		],
		[
			239,
			-53
		],
		[
			328,
			309
		]
	],
	[
		[
			61542,
			75120
		],
		[
			296,
			28
		],
		[
			268,
			-290
		]
	],
	[
		[
			57776,
			75399
		],
		[
			33,
			-228
		],
		[
			243,
			-190
		],
		[
			-51,
			-145
		],
		[
			-330,
			-33
		],
		[
			-118,
			-182
		],
		[
			-232,
			-319
		],
		[
			-87,
			276
		],
		[
			3,
			121
		]
	],
	[
		[
			55597,
			73991
		],
		[
			-48,
			41
		],
		[
			-5,
			130
		],
		[
			-154,
			199
		],
		[
			-24,
			281
		],
		[
			23,
			403
		],
		[
			38,
			184
		],
		[
			-47,
			93
		]
	],
	[
		[
			55380,
			75322
		],
		[
			-18,
			188
		],
		[
			120,
			291
		],
		[
			18,
			-111
		],
		[
			75,
			52
		]
	],
	[
		[
			55575,
			75742
		],
		[
			59,
			-159
		],
		[
			66,
			-60
		],
		[
			19,
			-214
		]
	],
	[
		[
			55719,
			75309
		],
		[
			-35,
			-201
		],
		[
			39,
			-254
		],
		[
			115,
			-144
		]
	],
	[
		[
			55230,
			77704
		],
		[
			67,
			-229
		],
		[
			89,
			-169
		],
		[
			-107,
			-222
		]
	],
	[
		[
			55279,
			77084
		],
		[
			-126,
			131
		],
		[
			-192,
			-8
		],
		[
			-239,
			98
		],
		[
			-130,
			-13
		],
		[
			-60,
			-123
		],
		[
			-99,
			136
		],
		[
			-59,
			-245
		],
		[
			136,
			-277
		],
		[
			61,
			-183
		],
		[
			127,
			-221
		],
		[
			106,
			-130
		],
		[
			105,
			-247
		],
		[
			246,
			-224
		]
	],
	[
		[
			55155,
			75778
		],
		[
			-31,
			-100
		]
	],
	[
		[
			55124,
			75678
		],
		[
			-261,
			218
		],
		[
			-161,
			213
		],
		[
			-254,
			176
		],
		[
			-233,
			434
		],
		[
			56,
			45
		],
		[
			-127,
			248
		],
		[
			-5,
			200
		],
		[
			-179,
			93
		],
		[
			-85,
			-255
		],
		[
			-82,
			198
		],
		[
			6,
			205
		],
		[
			10,
			9
		]
	],
	[
		[
			53809,
			77462
		],
		[
			194,
			-20
		],
		[
			51,
			100
		],
		[
			94,
			-97
		],
		[
			109,
			-11
		],
		[
			-1,
			165
		],
		[
			97,
			60
		],
		[
			27,
			239
		],
		[
			221,
			157
		]
	],
	[
		[
			52900,
			78285
		],
		[
			-22,
			-242
		],
		[
			-122,
			-100
		],
		[
			-206,
			75
		],
		[
			-60,
			-239
		],
		[
			-132,
			-19
		],
		[
			-48,
			94
		],
		[
			-156,
			-200
		],
		[
			-134,
			-28
		],
		[
			-120,
			126
		]
	],
	[
		[
			51576,
			79843
		],
		[
			30,
			331
		],
		[
			72,
			22
		]
	],
	[
		[
			50698,
			80799
		],
		[
			222,
			117
		]
	],
	[
		[
			50920,
			80916
		],
		[
			204,
			-47
		],
		[
			257,
			123
		],
		[
			176,
			-258
		],
		[
			153,
			-138
		]
	],
	[
		[
			50920,
			80916
		],
		[
			143,
			162
		],
		[
			244,
			869
		],
		[
			380,
			248
		],
		[
			231,
			-17
		]
	],
	[
		[
			47490,
			75324
		],
		[
			101,
			150
		],
		[
			113,
			86
		],
		[
			70,
			-289
		],
		[
			164,
			0
		],
		[
			47,
			75
		],
		[
			162,
			-21
		],
		[
			78,
			-296
		],
		[
			-129,
			-160
		],
		[
			-3,
			-461
		],
		[
			-45,
			-86
		],
		[
			-11,
			-280
		],
		[
			-120,
			-48
		],
		[
			111,
			-355
		],
		[
			-77,
			-388
		],
		[
			96,
			-175
		],
		[
			-38,
			-161
		],
		[
			-103,
			-222
		],
		[
			23,
			-195
		]
	],
	[
		[
			47929,
			72498
		],
		[
			-112,
			-153
		],
		[
			-146,
			83
		],
		[
			-143,
			-65
		],
		[
			42,
			462
		],
		[
			-26,
			363
		],
		[
			-124,
			55
		],
		[
			-67,
			224
		],
		[
			22,
			386
		],
		[
			111,
			215
		],
		[
			20,
			239
		],
		[
			58,
			355
		],
		[
			-6,
			250
		],
		[
			-56,
			212
		],
		[
			-12,
			200
		]
	],
	[
		[
			47490,
			75324
		],
		[
			14,
			420
		],
		[
			-114,
			257
		],
		[
			393,
			426
		],
		[
			340,
			-106
		],
		[
			373,
			3
		],
		[
			296,
			-101
		],
		[
			230,
			31
		],
		[
			449,
			-19
		]
	],
	[
		[
			50829,
			75674
		],
		[
			15,
			-344
		],
		[
			-263,
			-393
		],
		[
			-356,
			-125
		],
		[
			-25,
			-199
		],
		[
			-171,
			-327
		],
		[
			-107,
			-481
		],
		[
			108,
			-338
		],
		[
			-160,
			-263
		],
		[
			-60,
			-384
		],
		[
			-210,
			-118
		],
		[
			-197,
			-454
		],
		[
			-352,
			-9
		],
		[
			-265,
			11
		],
		[
			-174,
			-209
		],
		[
			-106,
			-223
		],
		[
			-136,
			49
		],
		[
			-103,
			199
		],
		[
			-79,
			340
		],
		[
			-259,
			92
		]
	],
	[
		[
			48278,
			82406
		],
		[
			46,
			-422
		],
		[
			-210,
			-528
		],
		[
			-493,
			-349
		],
		[
			-393,
			89
		],
		[
			225,
			617
		],
		[
			-145,
			601
		],
		[
			378,
			463
		],
		[
			210,
			276
		]
	],
	[
		[
			47896,
			83153
		],
		[
			57,
			-317
		],
		[
			-57,
			-317
		],
		[
			172,
			9
		],
		[
			210,
			-122
		]
	],
	[
		[
			96049,
			38125
		],
		[
			228,
			-366
		],
		[
			144,
			-272
		],
		[
			-105,
			-142
		],
		[
			-153,
			160
		],
		[
			-199,
			266
		],
		[
			-179,
			313
		],
		[
			-184,
			416
		],
		[
			-38,
			201
		],
		[
			119,
			-9
		],
		[
			156,
			-201
		],
		[
			122,
			-200
		],
		[
			89,
			-166
		]
	],
	[
		[
			95032,
			44386
		],
		[
			78,
			-203
		],
		[
			-194,
			4
		],
		[
			-106,
			363
		],
		[
			166,
			-142
		],
		[
			56,
			-22
		]
	],
	[
		[
			94910,
			44908
		],
		[
			-42,
			-109
		],
		[
			-206,
			512
		],
		[
			-57,
			353
		],
		[
			94,
			0
		],
		[
			100,
			-473
		],
		[
			111,
			-283
		]
	],
	[
		[
			94680,
			44747
		],
		[
			-108,
			-14
		],
		[
			-170,
			60
		],
		[
			-58,
			91
		],
		[
			17,
			235
		],
		[
			183,
			-93
		],
		[
			91,
			-124
		],
		[
			45,
			-155
		]
	],
	[
		[
			94344,
			45841
		],
		[
			65,
			-187
		],
		[
			12,
			-119
		],
		[
			-218,
			251
		],
		[
			-152,
			212
		],
		[
			-104,
			197
		],
		[
			41,
			60
		],
		[
			128,
			-142
		],
		[
			228,
			-272
		]
	],
	[
		[
			93649,
			46431
		],
		[
			111,
			-193
		],
		[
			-56,
			-33
		],
		[
			-121,
			134
		],
		[
			-114,
			243
		],
		[
			14,
			99
		],
		[
			166,
			-250
		]
	],
	[
		[
			99134,
			26908
		],
		[
			-105,
			-319
		],
		[
			-138,
			-404
		],
		[
			-214,
			-236
		],
		[
			-48,
			155
		],
		[
			-116,
			85
		],
		[
			160,
			486
		],
		[
			-91,
			326
		],
		[
			-299,
			236
		],
		[
			8,
			214
		],
		[
			201,
			206
		],
		[
			47,
			455
		],
		[
			-13,
			382
		],
		[
			-113,
			396
		],
		[
			8,
			104
		],
		[
			-133,
			244
		],
		[
			-218,
			523
		],
		[
			-117,
			418
		],
		[
			104,
			46
		],
		[
			151,
			-328
		],
		[
			216,
			-153
		],
		[
			78,
			-526
		],
		[
			202,
			-622
		],
		[
			5,
			403
		],
		[
			126,
			-161
		],
		[
			41,
			-447
		],
		[
			224,
			-192
		],
		[
			188,
			-48
		],
		[
			158,
			226
		],
		[
			141,
			-69
		],
		[
			-67,
			-524
		],
		[
			-85,
			-345
		],
		[
			-212,
			12
		],
		[
			-74,
			-179
		],
		[
			26,
			-254
		],
		[
			-41,
			-110
		]
	],
	[
		[
			97129,
			24846
		],
		[
			238,
			310
		],
		[
			167,
			306
		],
		[
			123,
			441
		],
		[
			106,
			149
		],
		[
			41,
			330
		],
		[
			195,
			273
		],
		[
			61,
			-251
		],
		[
			63,
			-244
		],
		[
			198,
			239
		],
		[
			80,
			-249
		],
		[
			0,
			-249
		],
		[
			-103,
			-274
		],
		[
			-182,
			-435
		],
		[
			-142,
			-238
		],
		[
			103,
			-284
		],
		[
			-214,
			-7
		],
		[
			-238,
			-223
		],
		[
			-75,
			-387
		],
		[
			-157,
			-597
		],
		[
			-219,
			-264
		],
		[
			-138,
			-169
		],
		[
			-256,
			13
		],
		[
			-180,
			194
		],
		[
			-302,
			42
		],
		[
			-46,
			217
		],
		[
			149,
			438
		],
		[
			349,
			583
		],
		[
			179,
			111
		],
		[
			200,
			225
		]
	],
	[
		[
			91024,
			26469
		],
		[
			166,
			-39
		],
		[
			20,
			-702
		],
		[
			-95,
			-203
		],
		[
			-29,
			-476
		],
		[
			-97,
			162
		],
		[
			-193,
			-412
		],
		[
			-57,
			32
		],
		[
			-171,
			19
		],
		[
			-171,
			505
		],
		[
			-38,
			390
		],
		[
			-160,
			515
		],
		[
			7,
			271
		],
		[
			181,
			-52
		],
		[
			269,
			-204
		],
		[
			151,
			81
		],
		[
			217,
			113
		]
	],
	[
		[
			85040,
			31546
		],
		[
			-294,
			-303
		],
		[
			-241,
			-137
		],
		[
			-53,
			-309
		],
		[
			-103,
			-240
		],
		[
			-236,
			-15
		],
		[
			-174,
			-52
		],
		[
			-246,
			107
		],
		[
			-199,
			-64
		],
		[
			-191,
			-27
		],
		[
			-165,
			-315
		],
		[
			-81,
			26
		],
		[
			-140,
			-167
		],
		[
			-133,
			-187
		],
		[
			-203,
			23
		],
		[
			-186,
			0
		],
		[
			-295,
			377
		],
		[
			-149,
			113
		],
		[
			6,
			338
		],
		[
			138,
			81
		],
		[
			47,
			134
		],
		[
			-10,
			212
		],
		[
			34,
			411
		],
		[
			-31,
			350
		],
		[
			-147,
			598
		],
		[
			-45,
			337
		],
		[
			12,
			336
		],
		[
			-111,
			385
		],
		[
			-7,
			174
		],
		[
			-123,
			235
		],
		[
			-35,
			463
		],
		[
			-158,
			467
		],
		[
			-39,
			252
		],
		[
			122,
			-255
		],
		[
			-93,
			548
		],
		[
			137,
			-171
		],
		[
			83,
			-229
		],
		[
			-5,
			303
		],
		[
			-138,
			465
		],
		[
			-26,
			186
		],
		[
			-65,
			177
		],
		[
			31,
			341
		],
		[
			56,
			146
		],
		[
			38,
			295
		],
		[
			-29,
			346
		],
		[
			114,
			425
		],
		[
			21,
			-450
		],
		[
			118,
			406
		],
		[
			225,
			198
		],
		[
			136,
			252
		],
		[
			212,
			217
		],
		[
			126,
			46
		],
		[
			77,
			-73
		],
		[
			219,
			220
		],
		[
			168,
			66
		],
		[
			42,
			129
		],
		[
			74,
			54
		],
		[
			153,
			-14
		],
		[
			292,
			173
		],
		[
			151,
			262
		],
		[
			71,
			316
		],
		[
			163,
			300
		],
		[
			13,
			236
		],
		[
			7,
			321
		],
		[
			194,
			502
		],
		[
			117,
			-510
		],
		[
			119,
			118
		],
		[
			-99,
			279
		],
		[
			87,
			287
		],
		[
			122,
			-128
		],
		[
			34,
			449
		],
		[
			152,
			291
		],
		[
			67,
			233
		],
		[
			140,
			101
		],
		[
			4,
			165
		],
		[
			122,
			-69
		],
		[
			5,
			148
		],
		[
			122,
			85
		],
		[
			134,
			80
		],
		[
			205,
			-271
		],
		[
			155,
			-350
		],
		[
			173,
			-4
		],
		[
			177,
			-56
		],
		[
			-59,
			325
		],
		[
			133,
			473
		],
		[
			126,
			155
		],
		[
			-44,
			147
		],
		[
			121,
			338
		],
		[
			168,
			208
		],
		[
			142,
			-70
		],
		[
			234,
			111
		],
		[
			-5,
			302
		],
		[
			-204,
			195
		],
		[
			148,
			86
		],
		[
			184,
			-147
		],
		[
			148,
			-242
		],
		[
			234,
			-151
		],
		[
			79,
			60
		],
		[
			172,
			-182
		],
		[
			162,
			169
		],
		[
			105,
			-51
		],
		[
			65,
			113
		],
		[
			127,
			-292
		],
		[
			-74,
			-316
		],
		[
			-105,
			-239
		],
		[
			-96,
			-20
		],
		[
			32,
			-236
		],
		[
			-81,
			-295
		],
		[
			-99,
			-291
		],
		[
			20,
			-166
		],
		[
			221,
			-327
		],
		[
			214,
			-189
		],
		[
			143,
			-204
		],
		[
			201,
			-350
		],
		[
			78,
			1
		],
		[
			145,
			-151
		],
		[
			43,
			-183
		],
		[
			265,
			-200
		],
		[
			183,
			202
		],
		[
			55,
			317
		],
		[
			56,
			262
		],
		[
			34,
			324
		],
		[
			85,
			470
		],
		[
			-39,
			286
		],
		[
			20,
			171
		],
		[
			-32,
			339
		],
		[
			37,
			445
		],
		[
			53,
			120
		],
		[
			-43,
			197
		],
		[
			67,
			313
		],
		[
			52,
			325
		],
		[
			7,
			168
		],
		[
			104,
			222
		],
		[
			78,
			-289
		],
		[
			19,
			-371
		],
		[
			70,
			-71
		],
		[
			11,
			-249
		],
		[
			101,
			-300
		],
		[
			21,
			-335
		],
		[
			-10,
			-214
		],
		[
			100,
			-464
		],
		[
			179,
			223
		],
		[
			92,
			-250
		],
		[
			133,
			-231
		],
		[
			-29,
			-262
		],
		[
			60,
			-506
		],
		[
			42,
			-295
		],
		[
			70,
			-72
		],
		[
			75,
			-505
		],
		[
			-27,
			-307
		],
		[
			90,
			-400
		],
		[
			301,
			-309
		],
		[
			197,
			-281
		],
		[
			186,
			-257
		],
		[
			-37,
			-143
		],
		[
			159,
			-371
		],
		[
			108,
			-639
		],
		[
			111,
			130
		],
		[
			113,
			-256
		],
		[
			68,
			91
		],
		[
			48,
			-626
		],
		[
			197,
			-363
		],
		[
			129,
			-226
		],
		[
			217,
			-478
		],
		[
			78,
			-475
		],
		[
			7,
			-337
		],
		[
			-19,
			-365
		],
		[
			132,
			-502
		],
		[
			-16,
			-523
		],
		[
			-48,
			-274
		],
		[
			-75,
			-527
		],
		[
			6,
			-339
		],
		[
			-55,
			-423
		],
		[
			-123,
			-538
		],
		[
			-205,
			-290
		],
		[
			-102,
			-458
		],
		[
			-93,
			-292
		],
		[
			-82,
			-510
		],
		[
			-107,
			-294
		],
		[
			-70,
			-442
		],
		[
			-36,
			-407
		],
		[
			14,
			-187
		],
		[
			-159,
			-205
		],
		[
			-311,
			-22
		],
		[
			-257,
			-242
		],
		[
			-127,
			-229
		],
		[
			-168,
			-254
		],
		[
			-230,
			262
		],
		[
			-170,
			104
		],
		[
			43,
			308
		],
		[
			-152,
			-112
		],
		[
			-243,
			-428
		],
		[
			-240,
			160
		],
		[
			-158,
			94
		],
		[
			-159,
			42
		],
		[
			-269,
			171
		],
		[
			-179,
			364
		],
		[
			-52,
			449
		],
		[
			-64,
			298
		],
		[
			-137,
			240
		],
		[
			-267,
			71
		],
		[
			91,
			287
		],
		[
			-67,
			438
		],
		[
			-136,
			-408
		],
		[
			-247,
			-109
		],
		[
			146,
			327
		],
		[
			42,
			341
		],
		[
			107,
			289
		],
		[
			-22,
			438
		],
		[
			-226,
			-504
		],
		[
			-174,
			-202
		],
		[
			-106,
			-470
		],
		[
			-217,
			243
		],
		[
			9,
			313
		],
		[
			-174,
			429
		],
		[
			-147,
			221
		],
		[
			52,
			137
		],
		[
			-356,
			358
		],
		[
			-195,
			17
		],
		[
			-267,
			287
		],
		[
			-498,
			-56
		],
		[
			-359,
			-211
		],
		[
			-317,
			-197
		],
		[
			-265,
			39
		]
	],
	[
		[
			72718,
			55024
		],
		[
			-42,
			-615
		],
		[
			-116,
			-168
		],
		[
			-242,
			-135
		],
		[
			-132,
			470
		],
		[
			-49,
			849
		],
		[
			126,
			959
		],
		[
			192,
			-328
		],
		[
			129,
			-416
		],
		[
			134,
			-616
		]
	],
	[
		[
			80409,
			61331
		],
		[
			-228,
			183
		],
		[
			-8,
			509
		],
		[
			137,
			267
		],
		[
			304,
			166
		],
		[
			159,
			-14
		],
		[
			62,
			-226
		],
		[
			-122,
			-260
		],
		[
			-64,
			-341
		],
		[
			-240,
			-284
		]
	],
	[
		[
			84517,
			74170
		],
		[
			-388,
			-171
		],
		[
			-204,
			-277
		],
		[
			-300,
			-161
		],
		[
			148,
			274
		],
		[
			-58,
			230
		],
		[
			220,
			397
		],
		[
			-147,
			310
		],
		[
			-242,
			-209
		],
		[
			-314,
			-411
		],
		[
			-171,
			-381
		],
		[
			-272,
			-29
		],
		[
			-142,
			-275
		],
		[
			147,
			-400
		],
		[
			227,
			-97
		],
		[
			9,
			-265
		],
		[
			220,
			-173
		],
		[
			311,
			422
		],
		[
			247,
			-230
		],
		[
			179,
			-15
		],
		[
			45,
			-310
		],
		[
			-393,
			-165
		],
		[
			-130,
			-319
		],
		[
			-270,
			-296
		],
		[
			-142,
			-414
		],
		[
			299,
			-325
		],
		[
			109,
			-581
		],
		[
			169,
			-541
		],
		[
			189,
			-454
		],
		[
			-5,
			-439
		],
		[
			-174,
			-161
		],
		[
			66,
			-315
		],
		[
			164,
			-184
		],
		[
			-43,
			-481
		],
		[
			-71,
			-468
		],
		[
			-155,
			-53
		],
		[
			-203,
			-640
		],
		[
			-225,
			-775
		],
		[
			-258,
			-705
		],
		[
			-382,
			-545
		],
		[
			-386,
			-498
		],
		[
			-313,
			-68
		],
		[
			-170,
			-262
		],
		[
			-96,
			192
		],
		[
			-157,
			-294
		],
		[
			-388,
			-296
		],
		[
			-294,
			-90
		],
		[
			-95,
			-624
		],
		[
			-154,
			-35
		],
		[
			-73,
			429
		],
		[
			66,
			228
		],
		[
			-373,
			189
		],
		[
			-131,
			-96
		]
	],
	[
		[
			83826,
			64992
		],
		[
			-167,
			-947
		],
		[
			-119,
			-485
		],
		[
			-146,
			499
		],
		[
			-32,
			438
		],
		[
			163,
			581
		],
		[
			223,
			447
		],
		[
			127,
			-176
		],
		[
			-49,
			-357
		]
	],
	[
		[
			53835,
			78058
		],
		[
			-31,
			-291
		],
		[
			67,
			-251
		]
	],
	[
		[
			53871,
			77516
		],
		[
			-221,
			86
		],
		[
			-226,
			-210
		],
		[
			15,
			-293
		],
		[
			-34,
			-168
		],
		[
			91,
			-301
		],
		[
			261,
			-298
		],
		[
			140,
			-488
		],
		[
			309,
			-476
		],
		[
			217,
			3
		],
		[
			68,
			-130
		],
		[
			-78,
			-118
		],
		[
			249,
			-214
		],
		[
			204,
			-178
		],
		[
			238,
			-308
		],
		[
			29,
			-111
		],
		[
			-52,
			-211
		],
		[
			-154,
			276
		],
		[
			-242,
			97
		],
		[
			-116,
			-382
		],
		[
			200,
			-219
		],
		[
			-33,
			-309
		],
		[
			-116,
			-35
		],
		[
			-148,
			-506
		],
		[
			-116,
			-46
		],
		[
			1,
			181
		],
		[
			57,
			317
		],
		[
			60,
			126
		],
		[
			-108,
			342
		],
		[
			-85,
			298
		],
		[
			-115,
			74
		],
		[
			-82,
			255
		],
		[
			-179,
			107
		],
		[
			-120,
			238
		],
		[
			-206,
			38
		],
		[
			-217,
			267
		],
		[
			-254,
			384
		],
		[
			-189,
			340
		],
		[
			-86,
			585
		],
		[
			-138,
			68
		],
		[
			-226,
			195
		],
		[
			-128,
			-80
		],
		[
			-161,
			-274
		],
		[
			-115,
			-43
		]
	],
	[
		[
			54100,
			73116
		],
		[
			211,
			51
		],
		[
			-100,
			-465
		],
		[
			41,
			-183
		],
		[
			-58,
			-303
		],
		[
			-213,
			222
		],
		[
			-141,
			64
		],
		[
			-387,
			300
		],
		[
			38,
			304
		],
		[
			325,
			-54
		],
		[
			284,
			64
		]
	],
	[
		[
			52419,
			74744
		],
		[
			139,
			183
		],
		[
			166,
			-419
		],
		[
			-39,
			-782
		],
		[
			-126,
			38
		],
		[
			-113,
			-197
		],
		[
			-105,
			156
		],
		[
			-11,
			713
		],
		[
			-64,
			338
		],
		[
			153,
			-30
		]
	],
	[
		[
			52368,
			83053
		],
		[
			-113,
			328
		],
		[
			-8,
			604
		],
		[
			46,
			159
		],
		[
			80,
			177
		],
		[
			244,
			37
		],
		[
			98,
			163
		],
		[
			223,
			167
		],
		[
			-9,
			-304
		],
		[
			-82,
			-192
		],
		[
			33,
			-166
		],
		[
			151,
			-89
		],
		[
			-68,
			-223
		],
		[
			-83,
			64
		],
		[
			-200,
			-425
		],
		[
			76,
			-288
		]
	],
	[
		[
			53436,
			83731
		],
		[
			88,
			-296
		],
		[
			-166,
			-478
		],
		[
			-291,
			333
		],
		[
			-39,
			246
		],
		[
			408,
			195
		]
	],
	[
		[
			47896,
			83153
		],
		[
			233,
			24
		],
		[
			298,
			-365
		],
		[
			-149,
			-406
		]
	],
	[
		[
			49140,
			82132
		],
		[
			1,
			0
		],
		[
			40,
			343
		],
		[
			-186,
			364
		],
		[
			-4,
			8
		],
		[
			-337,
			104
		],
		[
			-66,
			160
		],
		[
			101,
			264
		],
		[
			-92,
			163
		],
		[
			-149,
			-279
		],
		[
			-17,
			569
		],
		[
			-140,
			301
		],
		[
			101,
			611
		],
		[
			216,
			480
		],
		[
			222,
			-47
		],
		[
			335,
			49
		],
		[
			-297,
			-639
		],
		[
			283,
			81
		],
		[
			304,
			-3
		],
		[
			-72,
			-481
		],
		[
			-250,
			-530
		],
		[
			287,
			-38
		],
		[
			22,
			-62
		],
		[
			248,
			-697
		],
		[
			190,
			-95
		],
		[
			171,
			-673
		],
		[
			79,
			-233
		],
		[
			337,
			-113
		],
		[
			-34,
			-378
		],
		[
			-142,
			-173
		],
		[
			111,
			-305
		],
		[
			-250,
			-310
		],
		[
			-371,
			6
		],
		[
			-473,
			-163
		],
		[
			-130,
			116
		],
		[
			-183,
			-276
		],
		[
			-257,
			67
		],
		[
			-195,
			-226
		],
		[
			-148,
			118
		],
		[
			407,
			621
		],
		[
			249,
			127
		],
		[
			-2,
			1
		],
		[
			-434,
			98
		],
		[
			-79,
			235
		],
		[
			291,
			183
		],
		[
			-152,
			319
		],
		[
			52,
			387
		],
		[
			413,
			-54
		]
	],
	[
		[
			45969,
			89843
		],
		[
			-64,
			-382
		],
		[
			314,
			-403
		],
		[
			-361,
			-451
		],
		[
			-801,
			-405
		],
		[
			-240,
			-107
		],
		[
			-365,
			87
		],
		[
			-775,
			187
		],
		[
			273,
			261
		],
		[
			-605,
			289
		],
		[
			492,
			114
		],
		[
			-12,
			174
		],
		[
			-583,
			137
		],
		[
			188,
			385
		],
		[
			421,
			87
		],
		[
			433,
			-400
		],
		[
			422,
			321
		],
		[
			349,
			-167
		],
		[
			453,
			315
		],
		[
			461,
			-42
		]
	],
	[
		[
			63495,
			75281
		],
		[
			146,
			-311
		],
		[
			141,
			-419
		],
		[
			130,
			-28
		],
		[
			85,
			-159
		],
		[
			-228,
			-47
		],
		[
			-49,
			-459
		],
		[
			-48,
			-207
		],
		[
			-101,
			-138
		],
		[
			7,
			-293
		]
	],
	[
		[
			62492,
			74950
		],
		[
			68,
			96
		],
		[
			207,
			-169
		],
		[
			149,
			-36
		],
		[
			38,
			70
		],
		[
			-136,
			319
		],
		[
			72,
			82
		]
	],
	[
		[
			61542,
			75120
		],
		[
			42,
			252
		],
		[
			-70,
			403
		],
		[
			-160,
			218
		],
		[
			-154,
			68
		],
		[
			-102,
			181
		]
	],
	[
		[
			83564,
			58086
		],
		[
			-142,
			450
		],
		[
			238,
			-22
		],
		[
			97,
			-213
		],
		[
			-74,
			-510
		],
		[
			-119,
			295
		]
	],
	[
		[
			84051,
			56477
		],
		[
			70,
			165
		],
		[
			30,
			367
		],
		[
			153,
			35
		],
		[
			-44,
			-398
		],
		[
			205,
			570
		],
		[
			-26,
			-563
		],
		[
			-100,
			-195
		],
		[
			-87,
			-373
		],
		[
			-87,
			-175
		],
		[
			-171,
			409
		],
		[
			57,
			158
		]
	],
	[
		[
			85104,
			55551
		],
		[
			28,
			-392
		],
		[
			16,
			-332
		],
		[
			-94,
			-540
		],
		[
			-102,
			602
		],
		[
			-130,
			-300
		],
		[
			89,
			-435
		],
		[
			-79,
			-277
		],
		[
			-327,
			343
		],
		[
			-78,
			428
		],
		[
			84,
			280
		],
		[
			-176,
			280
		],
		[
			-87,
			-245
		],
		[
			-131,
			23
		],
		[
			-205,
			-330
		],
		[
			-46,
			173
		],
		[
			109,
			498
		],
		[
			175,
			166
		],
		[
			151,
			223
		],
		[
			98,
			-268
		],
		[
			212,
			162
		],
		[
			45,
			264
		],
		[
			196,
			15
		],
		[
			-16,
			457
		],
		[
			225,
			-280
		],
		[
			23,
			-297
		],
		[
			20,
			-218
		]
	],
	[
		[
			82917,
			56084
		],
		[
			-369,
			-561
		],
		[
			136,
			414
		],
		[
			200,
			364
		],
		[
			167,
			409
		],
		[
			146,
			587
		],
		[
			49,
			-482
		],
		[
			-183,
			-325
		],
		[
			-146,
			-406
		]
	],
	[
		[
			83982,
			61347
		],
		[
			-46,
			-245
		],
		[
			95,
			-423
		],
		[
			-73,
			-491
		],
		[
			-164,
			-196
		],
		[
			-43,
			-476
		],
		[
			62,
			-471
		],
		[
			147,
			-65
		],
		[
			123,
			70
		],
		[
			347,
			-328
		],
		[
			-27,
			-321
		],
		[
			91,
			-142
		],
		[
			-29,
			-272
		],
		[
			-216,
			290
		],
		[
			-103,
			310
		],
		[
			-71,
			-217
		],
		[
			-177,
			354
		],
		[
			-253,
			-87
		],
		[
			-138,
			130
		],
		[
			14,
			244
		],
		[
			87,
			151
		],
		[
			-83,
			136
		],
		[
			-36,
			-213
		],
		[
			-137,
			340
		],
		[
			-41,
			257
		],
		[
			-11,
			566
		],
		[
			112,
			-195
		],
		[
			29,
			925
		],
		[
			90,
			535
		],
		[
			169,
			-1
		],
		[
			171,
			-168
		],
		[
			85,
			153
		],
		[
			26,
			-150
		]
	],
	[
		[
			83899,
			57324
		],
		[
			-43,
			282
		],
		[
			166,
			-183
		],
		[
			177,
			1
		],
		[
			-5,
			-247
		],
		[
			-129,
			-251
		],
		[
			-176,
			-178
		],
		[
			-10,
			275
		],
		[
			20,
			301
		]
	],
	[
		[
			84861,
			57766
		],
		[
			78,
			-660
		],
		[
			-214,
			157
		],
		[
			5,
			-199
		],
		[
			68,
			-364
		],
		[
			-132,
			-133
		],
		[
			-11,
			416
		],
		[
			-84,
			31
		],
		[
			-43,
			357
		],
		[
			163,
			-47
		],
		[
			-4,
			224
		],
		[
			-169,
			451
		],
		[
			266,
			-13
		],
		[
			77,
			-220
		]
	],
	[
		[
			78372,
			54256
		],
		[
			64,
			-56
		],
		[
			164,
			-356
		],
		[
			116,
			-396
		],
		[
			16,
			-398
		],
		[
			-29,
			-269
		],
		[
			27,
			-203
		],
		[
			20,
			-349
		],
		[
			98,
			-163
		],
		[
			109,
			-523
		],
		[
			-5,
			-199
		],
		[
			-197,
			-40
		],
		[
			-263,
			438
		],
		[
			-329,
			469
		],
		[
			-32,
			301
		],
		[
			-161,
			395
		],
		[
			-38,
			489
		],
		[
			-100,
			322
		],
		[
			30,
			431
		],
		[
			-61,
			250
		]
	],
	[
		[
			80461,
			51765
		],
		[
			204,
			-202
		],
		[
			214,
			110
		],
		[
			56,
			500
		],
		[
			119,
			112
		],
		[
			333,
			128
		],
		[
			199,
			467
		],
		[
			137,
			374
		]
	],
	[
		[
			81723,
			53254
		],
		[
			126,
			-307
		],
		[
			58,
			202
		],
		[
			133,
			-19
		],
		[
			16,
			377
		],
		[
			13,
			291
		]
	],
	[
		[
			82069,
			53798
		],
		[
			214,
			411
		],
		[
			140,
			462
		],
		[
			112,
			2
		],
		[
			143,
			-299
		],
		[
			13,
			-257
		],
		[
			183,
			-165
		],
		[
			231,
			-177
		],
		[
			-20,
			-232
		],
		[
			-186,
			-29
		],
		[
			50,
			-289
		],
		[
			-205,
			-201
		]
	],
	[
		[
			81723,
			53254
		],
		[
			110,
			221
		],
		[
			236,
			323
		]
	],
	[
		[
			53809,
			77462
		],
		[
			62,
			54
		]
	],
	[
		[
			57797,
			86326
		],
		[
			-504,
			-47
		],
		[
			-489,
			-216
		],
		[
			-452,
			-125
		],
		[
			-161,
			323
		],
		[
			-269,
			193
		],
		[
			62,
			582
		],
		[
			-135,
			533
		],
		[
			133,
			345
		],
		[
			252,
			371
		],
		[
			635,
			640
		],
		[
			185,
			124
		],
		[
			-28,
			250
		],
		[
			-387,
			279
		]
	],
	[
		[
			54711,
			79292
		],
		[
			39,
			130
		],
		[
			123,
			-10
		],
		[
			95,
			61
		],
		[
			7,
			55
		],
		[
			54,
			28
		],
		[
			18,
			134
		],
		[
			64,
			26
		],
		[
			43,
			106
		],
		[
			82,
			1
		]
	],
	[
		[
			60669,
			61213
		],
		[
			161,
			-684
		],
		[
			77,
			-542
		],
		[
			152,
			-288
		],
		[
			379,
			-558
		],
		[
			154,
			-336
		],
		[
			151,
			-341
		],
		[
			87,
			-203
		],
		[
			136,
			-178
		]
	],
	[
		[
			61966,
			58083
		],
		[
			-83,
			-144
		],
		[
			-119,
			51
		]
	],
	[
		[
			61764,
			57990
		],
		[
			-95,
			191
		],
		[
			-114,
			346
		],
		[
			-124,
			190
		],
		[
			-71,
			204
		],
		[
			-242,
			237
		],
		[
			-191,
			7
		],
		[
			-67,
			124
		],
		[
			-163,
			-139
		],
		[
			-168,
			268
		],
		[
			-87,
			-441
		],
		[
			-323,
			124
		]
	],
	[
		[
			89411,
			73729
		],
		[
			-256,
			-595
		],
		[
			4,
			-610
		],
		[
			-104,
			-472
		],
		[
			48,
			-296
		],
		[
			-145,
			-416
		],
		[
			-355,
			-278
		],
		[
			-488,
			-36
		],
		[
			-396,
			-675
		],
		[
			-186,
			227
		],
		[
			-12,
			442
		],
		[
			-483,
			-130
		],
		[
			-329,
			-279
		],
		[
			-325,
			-11
		],
		[
			282,
			-435
		],
		[
			-186,
			-1004
		],
		[
			-179,
			-248
		],
		[
			-135,
			229
		],
		[
			69,
			533
		],
		[
			-176,
			172
		],
		[
			-113,
			405
		],
		[
			263,
			182
		],
		[
			145,
			371
		],
		[
			280,
			306
		],
		[
			203,
			403
		],
		[
			553,
			177
		],
		[
			297,
			-121
		],
		[
			291,
			1050
		],
		[
			185,
			-282
		],
		[
			408,
			591
		],
		[
			158,
			229
		],
		[
			174,
			723
		],
		[
			-47,
			664
		],
		[
			117,
			374
		],
		[
			295,
			108
		],
		[
			152,
			-819
		],
		[
			-9,
			-479
		]
	],
	[
		[
			90169,
			76553
		],
		[
			197,
			250
		],
		[
			62,
			-663
		],
		[
			-412,
			-162
		],
		[
			-244,
			-587
		],
		[
			-436,
			404
		],
		[
			-152,
			-646
		],
		[
			-308,
			-9
		],
		[
			-39,
			587
		],
		[
			138,
			455
		],
		[
			296,
			33
		],
		[
			81,
			817
		],
		[
			83,
			460
		],
		[
			326,
			-615
		],
		[
			213,
			-198
		],
		[
			195,
			-126
		]
	],
	[
		[
			86769,
			70351
		],
		[
			154,
			352
		],
		[
			158,
			-68
		],
		[
			114,
			248
		],
		[
			204,
			-127
		],
		[
			35,
			-203
		],
		[
			-156,
			-357
		],
		[
			-114,
			189
		],
		[
			-143,
			-137
		],
		[
			-73,
			-346
		],
		[
			-181,
			168
		],
		[
			2,
			281
		]
	],
	[
		[
			64752,
			60417
		],
		[
			-201,
			-158
		],
		[
			-54,
			-263
		],
		[
			-6,
			-201
		],
		[
			-277,
			-249
		],
		[
			-444,
			-276
		],
		[
			-249,
			-417
		],
		[
			-122,
			-33
		],
		[
			-83,
			35
		],
		[
			-163,
			-245
		],
		[
			-177,
			-114
		],
		[
			-233,
			-30
		],
		[
			-70,
			-34
		],
		[
			-61,
			-156
		],
		[
			-73,
			-43
		],
		[
			-43,
			-150
		],
		[
			-137,
			13
		],
		[
			-89,
			-80
		],
		[
			-192,
			30
		],
		[
			-72,
			345
		],
		[
			8,
			323
		],
		[
			-46,
			174
		],
		[
			-54,
			437
		],
		[
			-80,
			243
		],
		[
			56,
			29
		],
		[
			-29,
			270
		],
		[
			34,
			114
		],
		[
			-12,
			257
		]
	],
	[
		[
			61883,
			60238
		],
		[
			121,
			189
		],
		[
			-28,
			249
		],
		[
			74,
			290
		],
		[
			114,
			-153
		],
		[
			75,
			53
		],
		[
			321,
			14
		],
		[
			50,
			-59
		],
		[
			269,
			-60
		],
		[
			106,
			30
		],
		[
			70,
			-197
		],
		[
			130,
			99
		],
		[
			199,
			620
		],
		[
			259,
			266
		],
		[
			801,
			226
		]
	],
	[
		[
			63448,
			67449
		],
		[
			109,
			-510
		],
		[
			137,
			-135
		],
		[
			47,
			-207
		],
		[
			190,
			-249
		],
		[
			16,
			-243
		],
		[
			-27,
			-197
		],
		[
			35,
			-199
		],
		[
			80,
			-165
		],
		[
			37,
			-194
		],
		[
			41,
			-145
		]
	],
	[
		[
			64274,
			65130
		],
		[
			53,
			-226
		]
	],
	[
		[
			61883,
			60238
		],
		[
			-37,
			252
		],
		[
			-83,
			178
		],
		[
			-22,
			236
		],
		[
			-143,
			212
		],
		[
			-148,
			495
		],
		[
			-79,
			482
		],
		[
			-192,
			406
		],
		[
			-124,
			97
		],
		[
			-184,
			563
		],
		[
			-32,
			411
		],
		[
			12,
			350
		],
		[
			-159,
			655
		],
		[
			-130,
			231
		],
		[
			-150,
			122
		],
		[
			-92,
			339
		],
		[
			15,
			133
		],
		[
			-77,
			306
		],
		[
			-81,
			132
		],
		[
			-108,
			440
		],
		[
			-170,
			476
		],
		[
			-141,
			406
		],
		[
			-139,
			-3
		],
		[
			44,
			325
		],
		[
			12,
			206
		],
		[
			34,
			236
		]
	],
	[
		[
			36483,
			4468
		],
		[
			141,
			0
		],
		[
			414,
			127
		],
		[
			419,
			-127
		],
		[
			342,
			-255
		],
		[
			120,
			-359
		],
		[
			33,
			-254
		],
		[
			11,
			-301
		],
		[
			-430,
			-186
		],
		[
			-452,
			-150
		],
		[
			-522,
			-139
		],
		[
			-582,
			-116
		],
		[
			-658,
			35
		],
		[
			-365,
			197
		],
		[
			49,
			243
		],
		[
			593,
			162
		],
		[
			239,
			197
		],
		[
			174,
			254
		],
		[
			126,
			220
		],
		[
			168,
			209
		],
		[
			180,
			243
		]
	],
	[
		[
			31586,
			3163
		],
		[
			625,
			-23
		],
		[
			599,
			-58
		],
		[
			207,
			243
		],
		[
			147,
			208
		],
		[
			288,
			-243
		],
		[
			-82,
			-301
		],
		[
			-81,
			-266
		],
		[
			-582,
			81
		],
		[
			-621,
			-35
		],
		[
			-348,
			197
		],
		[
			0,
			23
		],
		[
			-152,
			174
		]
	],
	[
		[
			29468,
			8472
		],
		[
			190,
			70
		],
		[
			321,
			-23
		],
		[
			82,
			301
		],
		[
			16,
			219
		],
		[
			-6,
			475
		],
		[
			158,
			278
		],
		[
			256,
			93
		],
		[
			147,
			-220
		],
		[
			65,
			-220
		],
		[
			120,
			-267
		],
		[
			92,
			-254
		],
		[
			76,
			-267
		],
		[
			33,
			-266
		],
		[
			-49,
			-231
		],
		[
			-76,
			-220
		],
		[
			-326,
			-81
		],
		[
			-311,
			-116
		],
		[
			-364,
			11
		],
		[
			136,
			232
		],
		[
			-327,
			-81
		],
		[
			-310,
			-81
		],
		[
			-212,
			174
		],
		[
			-16,
			243
		],
		[
			305,
			231
		]
	],
	[
		[
			21575,
			8103
		],
		[
			174,
			104
		],
		[
			353,
			-81
		],
		[
			403,
			-46
		],
		[
			305,
			-81
		],
		[
			304,
			69
		],
		[
			163,
			-335
		],
		[
			-217,
			46
		],
		[
			-337,
			-23
		],
		[
			-343,
			23
		],
		[
			-376,
			-35
		],
		[
			-283,
			116
		],
		[
			-146,
			243
		]
	],
	[
		[
			15938,
			7061
		],
		[
			60,
			197
		],
		[
			332,
			-104
		],
		[
			359,
			-93
		],
		[
			332,
			104
		],
		[
			-158,
			-208
		],
		[
			-261,
			-151
		],
		[
			-386,
			47
		],
		[
			-278,
			208
		]
	],
	[
		[
			14643,
			7177
		],
		[
			202,
			127
		],
		[
			277,
			-139
		],
		[
			425,
			-231
		],
		[
			-164,
			23
		],
		[
			-359,
			58
		],
		[
			-381,
			162
		]
	],
	[
		[
			4524,
			4144
		],
		[
			169,
			220
		],
		[
			517,
			-93
		],
		[
			277,
			-185
		],
		[
			212,
			-209
		],
		[
			76,
			-266
		],
		[
			-533,
			-81
		],
		[
			-364,
			208
		],
		[
			-163,
			209
		],
		[
			-11,
			35
		],
		[
			-180,
			162
		]
	],
	[
		[
			0,
			529
		],
		[
			16,
			-5
		],
		[
			245,
			344
		],
		[
			501,
			-185
		],
		[
			32,
			21
		],
		[
			294,
			188
		],
		[
			38,
			-7
		],
		[
			32,
			-4
		],
		[
			402,
			-246
		],
		[
			352,
			246
		],
		[
			63,
			34
		],
		[
			816,
			104
		],
		[
			265,
			-138
		],
		[
			130,
			-71
		],
		[
			419,
			-196
		],
		[
			789,
			-151
		],
		[
			625,
			-185
		],
		[
			1072,
			-139
		],
		[
			800,
			162
		],
		[
			1181,
			-116
		],
		[
			669,
			-185
		],
		[
			734,
			174
		],
		[
			773,
			162
		],
		[
			60,
			278
		],
		[
			-1094,
			23
		],
		[
			-898,
			139
		],
		[
			-234,
			231
		],
		[
			-745,
			128
		],
		[
			49,
			266
		],
		[
			103,
			243
		],
		[
			104,
			220
		],
		[
			-55,
			243
		],
		[
			-462,
			162
		],
		[
			-212,
			209
		],
		[
			-430,
			185
		],
		[
			675,
			-35
		],
		[
			642,
			93
		],
		[
			402,
			-197
		],
		[
			495,
			173
		],
		[
			457,
			220
		],
		[
			223,
			197
		],
		[
			-98,
			243
		],
		[
			-359,
			162
		],
		[
			-408,
			174
		],
		[
			-571,
			35
		],
		[
			-500,
			81
		],
		[
			-539,
			58
		],
		[
			-180,
			220
		],
		[
			-359,
			185
		],
		[
			-217,
			208
		],
		[
			-87,
			672
		],
		[
			136,
			-58
		],
		[
			250,
			-185
		],
		[
			457,
			58
		],
		[
			441,
			81
		],
		[
			228,
			-255
		],
		[
			441,
			58
		],
		[
			370,
			127
		],
		[
			348,
			162
		],
		[
			315,
			197
		],
		[
			419,
			58
		],
		[
			-11,
			220
		],
		[
			-97,
			220
		],
		[
			81,
			208
		],
		[
			359,
			104
		],
		[
			163,
			-196
		],
		[
			425,
			115
		],
		[
			321,
			151
		],
		[
			397,
			12
		],
		[
			375,
			57
		],
		[
			376,
			139
		],
		[
			299,
			128
		],
		[
			337,
			127
		],
		[
			218,
			-35
		],
		[
			190,
			-46
		],
		[
			414,
			81
		],
		[
			370,
			-104
		],
		[
			381,
			11
		],
		[
			364,
			81
		],
		[
			375,
			-57
		],
		[
			414,
			-58
		],
		[
			386,
			23
		],
		[
			403,
			-12
		],
		[
			413,
			-11
		],
		[
			381,
			23
		],
		[
			283,
			174
		],
		[
			337,
			92
		],
		[
			349,
			-127
		],
		[
			331,
			104
		],
		[
			300,
			208
		],
		[
			179,
			-185
		],
		[
			98,
			-208
		],
		[
			180,
			-197
		],
		[
			288,
			174
		],
		[
			332,
			-220
		],
		[
			375,
			-70
		],
		[
			321,
			-162
		],
		[
			392,
			35
		],
		[
			354,
			104
		],
		[
			418,
			-23
		],
		[
			376,
			-81
		],
		[
			381,
			-104
		],
		[
			147,
			254
		],
		[
			-180,
			197
		],
		[
			-136,
			209
		],
		[
			-359,
			46
		],
		[
			-158,
			220
		],
		[
			-60,
			220
		],
		[
			-98,
			440
		],
		[
			213,
			-81
		],
		[
			364,
			-35
		],
		[
			359,
			35
		],
		[
			327,
			-93
		],
		[
			283,
			-174
		],
		[
			119,
			-208
		],
		[
			376,
			-35
		],
		[
			359,
			81
		],
		[
			381,
			116
		],
		[
			342,
			70
		],
		[
			283,
			-139
		],
		[
			370,
			46
		],
		[
			239,
			451
		],
		[
			224,
			-266
		],
		[
			321,
			-104
		],
		[
			348,
			58
		],
		[
			228,
			-232
		],
		[
			365,
			-23
		],
		[
			337,
			-69
		],
		[
			332,
			-128
		],
		[
			218,
			220
		],
		[
			108,
			209
		],
		[
			278,
			-232
		],
		[
			381,
			58
		],
		[
			283,
			-127
		],
		[
			190,
			-197
		],
		[
			370,
			58
		],
		[
			288,
			127
		],
		[
			283,
			151
		],
		[
			337,
			81
		],
		[
			392,
			69
		],
		[
			354,
			81
		],
		[
			272,
			127
		],
		[
			163,
			186
		],
		[
			65,
			254
		],
		[
			-32,
			244
		],
		[
			-87,
			231
		],
		[
			-98,
			232
		],
		[
			-87,
			231
		],
		[
			-71,
			209
		],
		[
			-16,
			231
		],
		[
			27,
			232
		],
		[
			130,
			220
		],
		[
			109,
			243
		],
		[
			44,
			231
		],
		[
			-55,
			255
		],
		[
			-32,
			232
		],
		[
			136,
			266
		],
		[
			152,
			173
		],
		[
			180,
			220
		],
		[
			190,
			186
		],
		[
			223,
			173
		],
		[
			109,
			255
		],
		[
			152,
			162
		],
		[
			174,
			151
		],
		[
			267,
			34
		],
		[
			174,
			186
		],
		[
			196,
			115
		],
		[
			228,
			70
		],
		[
			202,
			150
		],
		[
			157,
			186
		],
		[
			218,
			69
		],
		[
			163,
			-151
		],
		[
			-103,
			-196
		],
		[
			-283,
			-174
		],
		[
			-120,
			-127
		],
		[
			-206,
			92
		],
		[
			-229,
			-58
		],
		[
			-190,
			-139
		],
		[
			-202,
			-150
		],
		[
			-136,
			-174
		],
		[
			-38,
			-231
		],
		[
			17,
			-220
		],
		[
			130,
			-197
		],
		[
			-190,
			-139
		],
		[
			-261,
			-46
		],
		[
			-153,
			-197
		],
		[
			-163,
			-185
		],
		[
			-174,
			-255
		],
		[
			-44,
			-220
		],
		[
			98,
			-243
		],
		[
			147,
			-185
		],
		[
			229,
			-139
		],
		[
			212,
			-185
		],
		[
			114,
			-232
		],
		[
			60,
			-220
		],
		[
			82,
			-232
		],
		[
			130,
			-196
		],
		[
			82,
			-220
		],
		[
			38,
			-544
		],
		[
			81,
			-220
		],
		[
			22,
			-232
		],
		[
			87,
			-231
		],
		[
			-38,
			-313
		],
		[
			-152,
			-243
		],
		[
			-163,
			-197
		],
		[
			-370,
			-81
		],
		[
			-125,
			-208
		],
		[
			-169,
			-197
		],
		[
			-419,
			-220
		],
		[
			-370,
			-93
		],
		[
			-348,
			-127
		],
		[
			-376,
			-128
		],
		[
			-223,
			-243
		],
		[
			-446,
			-23
		],
		[
			-489,
			23
		],
		[
			-441,
			-46
		],
		[
			-468,
			0
		],
		[
			87,
			-232
		],
		[
			424,
			-104
		],
		[
			311,
			-162
		],
		[
			174,
			-208
		],
		[
			-310,
			-185
		],
		[
			-479,
			58
		],
		[
			-397,
			-151
		],
		[
			-17,
			-243
		],
		[
			-11,
			-232
		],
		[
			327,
			-196
		],
		[
			60,
			-220
		],
		[
			353,
			-220
		],
		[
			588,
			-93
		],
		[
			500,
			-162
		],
		[
			398,
			-185
		],
		[
			506,
			-186
		],
		[
			690,
			-92
		],
		[
			681,
			-162
		],
		[
			473,
			-174
		],
		[
			517,
			-197
		],
		[
			272,
			-278
		],
		[
			136,
			-220
		],
		[
			337,
			209
		],
		[
			457,
			173
		],
		[
			484,
			186
		],
		[
			577,
			150
		],
		[
			495,
			162
		],
		[
			691,
			12
		],
		[
			680,
			-81
		],
		[
			560,
			-139
		],
		[
			180,
			255
		],
		[
			386,
			173
		],
		[
			702,
			12
		],
		[
			550,
			127
		],
		[
			522,
			128
		],
		[
			577,
			81
		],
		[
			614,
			104
		],
		[
			430,
			150
		],
		[
			-196,
			209
		],
		[
			-119,
			208
		],
		[
			0,
			220
		],
		[
			-539,
			-23
		],
		[
			-571,
			-93
		],
		[
			-544,
			0
		],
		[
			-77,
			220
		],
		[
			39,
			440
		],
		[
			125,
			128
		],
		[
			397,
			138
		],
		[
			468,
			139
		],
		[
			337,
			174
		],
		[
			337,
			174
		],
		[
			251,
			231
		],
		[
			380,
			104
		],
		[
			376,
			81
		],
		[
			190,
			47
		],
		[
			430,
			23
		],
		[
			408,
			81
		],
		[
			343,
			116
		],
		[
			337,
			139
		],
		[
			305,
			139
		],
		[
			386,
			185
		],
		[
			245,
			197
		],
		[
			261,
			173
		],
		[
			82,
			232
		],
		[
			-294,
			139
		],
		[
			98,
			243
		],
		[
			185,
			185
		],
		[
			288,
			116
		],
		[
			305,
			139
		],
		[
			283,
			185
		],
		[
			217,
			232
		],
		[
			136,
			277
		],
		[
			202,
			163
		],
		[
			331,
			-35
		],
		[
			136,
			-197
		],
		[
			332,
			-23
		],
		[
			11,
			220
		],
		[
			142,
			231
		],
		[
			299,
			-58
		],
		[
			71,
			-220
		],
		[
			331,
			-34
		],
		[
			360,
			104
		],
		[
			348,
			69
		],
		[
			315,
			-34
		],
		[
			120,
			-243
		],
		[
			305,
			196
		],
		[
			283,
			105
		],
		[
			315,
			81
		],
		[
			310,
			81
		],
		[
			283,
			139
		],
		[
			310,
			92
		],
		[
			240,
			128
		],
		[
			168,
			208
		],
		[
			207,
			-151
		],
		[
			288,
			81
		],
		[
			202,
			-277
		],
		[
			157,
			-209
		],
		[
			316,
			116
		],
		[
			125,
			232
		],
		[
			283,
			162
		],
		[
			365,
			-35
		],
		[
			108,
			-220
		],
		[
			229,
			220
		],
		[
			299,
			69
		],
		[
			326,
			23
		],
		[
			294,
			-11
		],
		[
			310,
			-70
		],
		[
			300,
			-34
		],
		[
			130,
			-197
		],
		[
			180,
			-174
		],
		[
			304,
			104
		],
		[
			327,
			24
		],
		[
			315,
			0
		],
		[
			310,
			11
		],
		[
			278,
			81
		],
		[
			294,
			70
		],
		[
			245,
			162
		],
		[
			261,
			104
		],
		[
			283,
			58
		],
		[
			212,
			162
		],
		[
			152,
			324
		],
		[
			158,
			197
		],
		[
			288,
			-93
		],
		[
			109,
			-208
		],
		[
			239,
			-139
		],
		[
			289,
			46
		],
		[
			196,
			-208
		],
		[
			206,
			-151
		],
		[
			283,
			139
		],
		[
			98,
			255
		],
		[
			250,
			104
		],
		[
			289,
			197
		],
		[
			272,
			81
		],
		[
			326,
			116
		],
		[
			218,
			127
		],
		[
			228,
			139
		],
		[
			218,
			127
		],
		[
			261,
			-69
		],
		[
			250,
			208
		],
		[
			180,
			162
		],
		[
			261,
			-11
		],
		[
			229,
			139
		],
		[
			54,
			208
		],
		[
			234,
			162
		],
		[
			228,
			116
		],
		[
			278,
			93
		],
		[
			256,
			46
		],
		[
			244,
			-35
		],
		[
			262,
			-58
		],
		[
			223,
			-162
		],
		[
			27,
			-254
		],
		[
			245,
			-197
		],
		[
			168,
			-162
		],
		[
			332,
			-70
		],
		[
			185,
			-162
		],
		[
			229,
			-162
		],
		[
			266,
			-35
		],
		[
			223,
			116
		],
		[
			240,
			243
		],
		[
			261,
			-127
		],
		[
			272,
			-70
		],
		[
			261,
			-69
		],
		[
			272,
			-46
		],
		[
			277,
			0
		],
		[
			229,
			-614
		],
		[
			-11,
			-150
		],
		[
			-33,
			-267
		],
		[
			-266,
			-150
		],
		[
			-218,
			-220
		],
		[
			38,
			-232
		],
		[
			310,
			12
		],
		[
			-38,
			-232
		],
		[
			-141,
			-220
		],
		[
			-131,
			-243
		],
		[
			212,
			-185
		],
		[
			321,
			-58
		],
		[
			321,
			104
		],
		[
			153,
			232
		],
		[
			92,
			220
		],
		[
			153,
			185
		],
		[
			174,
			174
		],
		[
			70,
			208
		],
		[
			147,
			289
		],
		[
			174,
			58
		],
		[
			316,
			24
		],
		[
			277,
			69
		],
		[
			283,
			93
		],
		[
			136,
			231
		],
		[
			82,
			220
		],
		[
			190,
			220
		],
		[
			272,
			151
		],
		[
			234,
			115
		],
		[
			153,
			197
		],
		[
			157,
			104
		],
		[
			202,
			93
		],
		[
			277,
			-58
		],
		[
			250,
			58
		],
		[
			272,
			69
		],
		[
			305,
			-34
		],
		[
			201,
			162
		],
		[
			142,
			393
		],
		[
			103,
			-162
		],
		[
			131,
			-278
		],
		[
			234,
			-115
		],
		[
			266,
			-47
		],
		[
			267,
			70
		],
		[
			283,
			-46
		],
		[
			261,
			-12
		],
		[
			174,
			58
		],
		[
			234,
			-35
		],
		[
			212,
			-127
		],
		[
			250,
			81
		],
		[
			300,
			0
		],
		[
			255,
			81
		],
		[
			289,
			-81
		],
		[
			185,
			197
		],
		[
			141,
			196
		],
		[
			191,
			163
		],
		[
			348,
			439
		],
		[
			179,
			-81
		],
		[
			212,
			-162
		],
		[
			185,
			-208
		],
		[
			354,
			-359
		],
		[
			272,
			-12
		],
		[
			256,
			0
		],
		[
			299,
			70
		],
		[
			299,
			81
		],
		[
			229,
			162
		],
		[
			190,
			174
		],
		[
			310,
			23
		],
		[
			207,
			127
		],
		[
			218,
			-116
		],
		[
			141,
			-185
		],
		[
			196,
			-185
		],
		[
			305,
			23
		],
		[
			190,
			-150
		],
		[
			332,
			-151
		],
		[
			348,
			-58
		],
		[
			288,
			47
		],
		[
			218,
			185
		],
		[
			185,
			185
		],
		[
			250,
			46
		],
		[
			251,
			-81
		],
		[
			288,
			-58
		],
		[
			261,
			93
		],
		[
			250,
			0
		],
		[
			245,
			-58
		],
		[
			256,
			-58
		],
		[
			250,
			104
		],
		[
			299,
			93
		],
		[
			283,
			23
		],
		[
			316,
			0
		],
		[
			255,
			58
		],
		[
			251,
			46
		],
		[
			76,
			290
		],
		[
			11,
			243
		],
		[
			174,
			-162
		],
		[
			49,
			-266
		],
		[
			92,
			-244
		],
		[
			115,
			-196
		],
		[
			234,
			-105
		],
		[
			315,
			35
		],
		[
			365,
			12
		],
		[
			250,
			35
		],
		[
			364,
			0
		],
		[
			262,
			11
		],
		[
			364,
			-23
		],
		[
			310,
			-46
		],
		[
			196,
			-186
		],
		[
			-54,
			-220
		],
		[
			179,
			-173
		],
		[
			299,
			-139
		],
		[
			310,
			-151
		],
		[
			360,
			-104
		],
		[
			375,
			-92
		],
		[
			283,
			-93
		],
		[
			315,
			-12
		],
		[
			180,
			197
		],
		[
			245,
			-162
		],
		[
			212,
			-185
		],
		[
			245,
			-139
		],
		[
			337,
			-58
		],
		[
			321,
			-69
		],
		[
			136,
			-232
		],
		[
			316,
			-139
		],
		[
			212,
			-208
		],
		[
			310,
			-93
		],
		[
			321,
			12
		],
		[
			299,
			-35
		],
		[
			332,
			12
		],
		[
			332,
			-47
		],
		[
			310,
			-81
		],
		[
			288,
			-139
		],
		[
			289,
			-116
		],
		[
			195,
			-173
		],
		[
			-32,
			-232
		],
		[
			-147,
			-208
		],
		[
			-125,
			-266
		],
		[
			-98,
			-209
		],
		[
			-131,
			-243
		],
		[
			-364,
			-93
		],
		[
			-163,
			-208
		],
		[
			-360,
			-127
		],
		[
			-125,
			-232
		],
		[
			-190,
			-220
		],
		[
			-201,
			-185
		],
		[
			-115,
			-243
		],
		[
			-70,
			-220
		],
		[
			-28,
			-266
		],
		[
			6,
			-220
		],
		[
			158,
			-232
		],
		[
			60,
			-220
		],
		[
			130,
			-208
		],
		[
			517,
			-81
		],
		[
			109,
			-255
		],
		[
			-501,
			-93
		],
		[
			-424,
			-127
		],
		[
			-528,
			-23
		],
		[
			-234,
			-336
		],
		[
			-49,
			-278
		],
		[
			-119,
			-220
		],
		[
			-147,
			-220
		],
		[
			370,
			-196
		],
		[
			141,
			-244
		],
		[
			239,
			-219
		],
		[
			338,
			-197
		],
		[
			386,
			-186
		],
		[
			419,
			-185
		],
		[
			636,
			-185
		],
		[
			142,
			-289
		],
		[
			800,
			-128
		],
		[
			53,
			-45
		],
		[
			208,
			-175
		],
		[
			767,
			151
		],
		[
			636,
			-186
		],
		[
			479,
			-142
		],
		[
			-99999,
			0
		]
	],
	[
		[
			59092,
			71341
		],
		[
			19,
			3
		],
		[
			40,
			143
		],
		[
			200,
			-8
		],
		[
			253,
			176
		],
		[
			-188,
			-251
		],
		[
			21,
			-111
		]
	],
	[
		[
			59437,
			71293
		],
		[
			-30,
			21
		],
		[
			-53,
			-45
		],
		[
			-42,
			12
		],
		[
			-14,
			-22
		],
		[
			-5,
			59
		],
		[
			-20,
			37
		],
		[
			-54,
			6
		],
		[
			-75,
			-51
		],
		[
			-52,
			31
		]
	],
	[
		[
			59437,
			71293
		],
		[
			8,
			-48
		],
		[
			-285,
			-240
		],
		[
			-136,
			77
		],
		[
			-64,
			237
		],
		[
			132,
			22
		]
	],
	[
		[
			45272,
			63236
		],
		[
			13,
			274
		],
		[
			106,
			161
		],
		[
			91,
			308
		],
		[
			-18,
			200
		],
		[
			96,
			417
		],
		[
			155,
			376
		],
		[
			93,
			95
		],
		[
			74,
			344
		],
		[
			6,
			315
		],
		[
			100,
			365
		],
		[
			185,
			216
		],
		[
			177,
			603
		],
		[
			5,
			8
		],
		[
			139,
			227
		],
		[
			259,
			65
		],
		[
			218,
			404
		],
		[
			140,
			158
		],
		[
			232,
			493
		],
		[
			-70,
			735
		],
		[
			106,
			508
		],
		[
			37,
			312
		],
		[
			179,
			399
		],
		[
			278,
			270
		],
		[
			206,
			244
		],
		[
			186,
			612
		],
		[
			87,
			362
		],
		[
			205,
			-2
		],
		[
			167,
			-251
		],
		[
			264,
			41
		],
		[
			288,
			-131
		],
		[
			121,
			-6
		]
	],
	[
		[
			56944,
			63578
		],
		[
			0,
			2175
		],
		[
			0,
			2101
		],
		[
			-83,
			476
		],
		[
			71,
			365
		],
		[
			-43,
			253
		],
		[
			101,
			283
		]
	],
	[
		[
			56990,
			69231
		],
		[
			369,
			10
		],
		[
			268,
			-156
		],
		[
			275,
			-175
		],
		[
			129,
			-92
		],
		[
			214,
			188
		],
		[
			114,
			169
		],
		[
			245,
			49
		],
		[
			198,
			-75
		],
		[
			75,
			-293
		],
		[
			65,
			193
		],
		[
			222,
			-140
		],
		[
			217,
			-33
		],
		[
			137,
			149
		]
	],
	[
		[
			59700,
			68010
		],
		[
			-78,
			-238
		],
		[
			-60,
			-446
		],
		[
			-75,
			-308
		],
		[
			-65,
			-103
		],
		[
			-93,
			191
		],
		[
			-125,
			263
		],
		[
			-198,
			847
		],
		[
			-29,
			-53
		],
		[
			115,
			-624
		],
		[
			171,
			-594
		],
		[
			210,
			-920
		],
		[
			102,
			-321
		],
		[
			90,
			-334
		],
		[
			249,
			-654
		],
		[
			-55,
			-103
		],
		[
			9,
			-384
		],
		[
			323,
			-530
		],
		[
			49,
			-121
		]
	],
	[
		[
			53191,
			70158
		],
		[
			326,
			-204
		],
		[
			117,
			51
		],
		[
			232,
			-98
		],
		[
			368,
			-264
		],
		[
			130,
			-526
		],
		[
			250,
			-114
		],
		[
			391,
			-248
		],
		[
			296,
			-293
		],
		[
			136,
			153
		],
		[
			133,
			272
		],
		[
			-65,
			452
		],
		[
			87,
			288
		],
		[
			200,
			277
		],
		[
			192,
			80
		],
		[
			375,
			-121
		],
		[
			95,
			-264
		],
		[
			104,
			-2
		],
		[
			88,
			-101
		],
		[
			276,
			-70
		],
		[
			68,
			-195
		]
	],
	[
		[
			59804,
			53833
		],
		[
			-164,
			643
		],
		[
			-127,
			137
		],
		[
			-48,
			236
		],
		[
			-141,
			288
		],
		[
			-171,
			42
		],
		[
			95,
			337
		],
		[
			147,
			14
		],
		[
			42,
			181
		]
	],
	[
		[
			61764,
			57990
		],
		[
			-98,
			-261
		],
		[
			-94,
			-277
		],
		[
			22,
			-163
		],
		[
			4,
			-180
		],
		[
			155,
			-10
		],
		[
			67,
			42
		],
		[
			62,
			-106
		]
	],
	[
		[
			61882,
			57035
		],
		[
			-61,
			-209
		],
		[
			103,
			-325
		],
		[
			102,
			-285
		],
		[
			106,
			-210
		],
		[
			909,
			-702
		],
		[
			233,
			4
		]
	],
	[
		[
			61966,
			58083
		],
		[
			66,
			-183
		],
		[
			-9,
			-245
		],
		[
			-158,
			-142
		],
		[
			119,
			-161
		]
	],
	[
		[
			61984,
			57352
		],
		[
			-102,
			-317
		]
	],
	[
		[
			61984,
			57352
		],
		[
			91,
			-109
		],
		[
			54,
			-245
		],
		[
			125,
			-247
		],
		[
			138,
			-2
		],
		[
			262,
			151
		],
		[
			302,
			70
		],
		[
			245,
			184
		],
		[
			138,
			39
		],
		[
			99,
			108
		],
		[
			158,
			20
		]
	],
	[
		[
			58449,
			49909
		],
		[
			-166,
			-182
		],
		[
			-67,
			60
		]
	],
	[
		[
			58564,
			52653
		],
		[
			115,
			161
		],
		[
			176,
			-132
		],
		[
			224,
			138
		],
		[
			195,
			-1
		],
		[
			171,
			272
		]
	],
	[
		[
			55279,
			77084
		],
		[
			100,
			2
		],
		[
			-69,
			-260
		],
		[
			134,
			-227
		],
		[
			-41,
			-278
		],
		[
			-65,
			-27
		]
	],
	[
		[
			55338,
			76294
		],
		[
			-52,
			-53
		],
		[
			-90,
			-138
		],
		[
			-41,
			-325
		]
	],
	[
		[
			55719,
			75309
		],
		[
			35,
			-5
		],
		[
			13,
			121
		],
		[
			164,
			91
		],
		[
			62,
			23
		]
	],
	[
		[
			55993,
			75539
		],
		[
			95,
			35
		],
		[
			128,
			9
		]
	],
	[
		[
			55993,
			75539
		],
		[
			-9,
			44
		],
		[
			33,
			71
		],
		[
			31,
			144
		],
		[
			-39,
			-4
		],
		[
			-54,
			110
		],
		[
			-46,
			28
		],
		[
			-36,
			94
		],
		[
			-52,
			36
		],
		[
			-40,
			84
		],
		[
			-50,
			-33
		],
		[
			-38,
			-196
		],
		[
			-66,
			-43
		]
	],
	[
		[
			55627,
			75874
		],
		[
			22,
			51
		],
		[
			-106,
			123
		],
		[
			-91,
			63
		],
		[
			-40,
			82
		],
		[
			-74,
			101
		]
	],
	[
		[
			55380,
			75322
		],
		[
			-58,
			46
		],
		[
			-78,
			192
		],
		[
			-120,
			118
		]
	],
	[
		[
			55627,
			75874
		],
		[
			-52,
			-132
		]
	],
	[
		[
			32866,
			56937
		],
		[
			160,
			77
		],
		[
			58,
			-21
		],
		[
			-11,
			-440
		],
		[
			-232,
			-65
		],
		[
			-50,
			53
		],
		[
			81,
			163
		],
		[
			-6,
			233
		]
	]
];
var bbox = [
	-180,
	-85.60903777459771,
	180,
	83.64513000000001
];
var transform = {
	scale: [
		0.0036000360003600037,
		0.0016925586033320105
	],
	translate: [
		-180,
		-85.60903777459771
	]
};
var World_110m_iso_a2_topo = {
	type: type$1,
	objects: objects,
	arcs: arcs,
	bbox: bbox,
	transform: transform
};

var type$2 = "Topology";
var transform$1 = {
	scale: [
		0.00001,
		0.00001
	],
	translate: [
		-63.15176,
		-21.38696
	]
};
var objects$1 = {
	NUTS: {
		type: "GeometryCollection",
		geometries: [
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							3
						]
					],
					[
						[
							4,
							-1,
							-2,
							5
						],
						[
							-3
						]
					],
					[
						[
							6
						]
					],
					[
						[
							7
						]
					],
					[
						[
							8
						]
					],
					[
						[
							9
						]
					],
					[
						[
							10
						]
					],
					[
						[
							11
						]
					],
					[
						[
							12
						]
					],
					[
						[
							13
						]
					],
					[
						[
							14
						]
					],
					[
						[
							15
						]
					],
					[
						[
							16
						]
					],
					[
						[
							17
						]
					],
					[
						[
							18
						]
					],
					[
						[
							19
						]
					],
					[
						[
							20
						]
					],
					[
						[
							21
						]
					],
					[
						[
							22
						]
					],
					[
						[
							23
						]
					],
					[
						[
							24
						]
					],
					[
						[
							25
						]
					],
					[
						[
							26
						]
					],
					[
						[
							27
						]
					],
					[
						[
							28
						]
					],
					[
						[
							29
						]
					],
					[
						[
							30
						]
					],
					[
						[
							31
						]
					],
					[
						[
							32
						]
					],
					[
						[
							33
						]
					],
					[
						[
							34
						]
					],
					[
						[
							35
						]
					],
					[
						[
							36
						]
					],
					[
						[
							37
						]
					],
					[
						[
							38
						]
					],
					[
						[
							39
						]
					],
					[
						[
							40
						]
					],
					[
						[
							41
						]
					],
					[
						[
							42
						]
					],
					[
						[
							43
						]
					],
					[
						[
							44
						]
					],
					[
						[
							45
						]
					],
					[
						[
							46
						]
					],
					[
						[
							47
						]
					],
					[
						[
							48
						]
					],
					[
						[
							49
						]
					],
					[
						[
							50
						]
					],
					[
						[
							51
						]
					],
					[
						[
							52
						]
					],
					[
						[
							53
						]
					],
					[
						[
							54
						]
					],
					[
						[
							55
						]
					],
					[
						[
							56
						]
					],
					[
						[
							57
						]
					],
					[
						[
							58
						]
					],
					[
						[
							59
						]
					],
					[
						[
							60
						]
					],
					[
						[
							61
						]
					],
					[
						[
							62
						]
					],
					[
						[
							63
						]
					],
					[
						[
							64
						]
					],
					[
						[
							65
						]
					],
					[
						[
							66
						]
					],
					[
						[
							67
						]
					],
					[
						[
							68
						]
					],
					[
						[
							69
						]
					],
					[
						[
							70
						]
					],
					[
						[
							71
						]
					],
					[
						[
							72
						]
					],
					[
						[
							73
						]
					],
					[
						[
							74
						]
					],
					[
						[
							75
						]
					],
					[
						[
							76
						]
					],
					[
						[
							77
						]
					],
					[
						[
							78
						]
					],
					[
						[
							79
						]
					],
					[
						[
							80
						]
					],
					[
						[
							81
						]
					],
					[
						[
							82
						]
					],
					[
						[
							83
						]
					],
					[
						[
							84
						]
					],
					[
						[
							85
						]
					],
					[
						[
							86
						]
					],
					[
						[
							87
						]
					],
					[
						[
							88
						]
					],
					[
						[
							89
						]
					],
					[
						[
							90
						]
					],
					[
						[
							91
						]
					],
					[
						[
							92
						]
					],
					[
						[
							93
						]
					],
					[
						[
							94
						]
					],
					[
						[
							95
						]
					],
					[
						[
							96
						]
					],
					[
						[
							97
						]
					],
					[
						[
							98
						]
					],
					[
						[
							99
						]
					],
					[
						[
							100
						]
					],
					[
						[
							101
						]
					],
					[
						[
							102
						]
					],
					[
						[
							103
						]
					],
					[
						[
							104
						]
					],
					[
						[
							105
						]
					],
					[
						[
							106
						]
					],
					[
						[
							107
						]
					],
					[
						[
							108
						]
					],
					[
						[
							109
						]
					],
					[
						[
							110
						]
					],
					[
						[
							111
						]
					],
					[
						[
							112
						]
					],
					[
						[
							113
						]
					],
					[
						[
							114
						]
					],
					[
						[
							115
						]
					],
					[
						[
							116
						]
					],
					[
						[
							117
						]
					],
					[
						[
							118
						]
					],
					[
						[
							119
						]
					],
					[
						[
							120
						]
					],
					[
						[
							121
						]
					],
					[
						[
							122
						]
					],
					[
						[
							123
						]
					],
					[
						[
							124
						]
					],
					[
						[
							125
						]
					],
					[
						[
							126
						]
					],
					[
						[
							127
						]
					],
					[
						[
							128
						]
					],
					[
						[
							129
						]
					],
					[
						[
							130
						]
					],
					[
						[
							131
						]
					],
					[
						[
							132
						]
					],
					[
						[
							133
						]
					],
					[
						[
							134
						]
					],
					[
						[
							135
						]
					],
					[
						[
							136
						]
					],
					[
						[
							137
						]
					],
					[
						[
							138
						]
					],
					[
						[
							139
						]
					],
					[
						[
							140
						]
					],
					[
						[
							141
						]
					],
					[
						[
							142
						]
					],
					[
						[
							143
						]
					],
					[
						[
							144
						]
					],
					[
						[
							145
						]
					],
					[
						[
							146
						]
					],
					[
						[
							147
						]
					],
					[
						[
							148
						]
					],
					[
						[
							149
						]
					],
					[
						[
							150
						]
					],
					[
						[
							151
						]
					],
					[
						[
							152
						]
					],
					[
						[
							153
						]
					],
					[
						[
							154
						]
					],
					[
						[
							155
						]
					],
					[
						[
							156
						]
					],
					[
						[
							157
						]
					],
					[
						[
							158
						]
					],
					[
						[
							159
						]
					],
					[
						[
							160
						]
					],
					[
						[
							161
						]
					],
					[
						[
							162
						]
					],
					[
						[
							163
						]
					],
					[
						[
							164
						]
					],
					[
						[
							165
						]
					],
					[
						[
							166
						]
					],
					[
						[
							167
						]
					],
					[
						[
							168
						]
					],
					[
						[
							169
						]
					],
					[
						[
							170
						]
					],
					[
						[
							171
						]
					],
					[
						[
							172
						]
					],
					[
						[
							173
						]
					],
					[
						[
							174
						]
					],
					[
						[
							175
						]
					],
					[
						[
							176
						]
					],
					[
						[
							177
						]
					],
					[
						[
							178
						]
					],
					[
						[
							179
						]
					],
					[
						[
							180
						]
					],
					[
						[
							181
						]
					],
					[
						[
							182
						]
					],
					[
						[
							183
						]
					],
					[
						[
							184
						]
					],
					[
						[
							185
						]
					],
					[
						[
							186
						]
					],
					[
						[
							187
						]
					],
					[
						[
							188
						]
					],
					[
						[
							189
						]
					],
					[
						[
							190
						]
					],
					[
						[
							191
						]
					],
					[
						[
							192
						]
					],
					[
						[
							193
						]
					],
					[
						[
							194
						]
					],
					[
						[
							195
						]
					]
				],
				id: "UK",
				properties: {
					LEVL_CODE: 0,
					NUTS_ID: "UK",
					CNTR_CODE: "UK",
					NUTS_NAME: "UNITED KINGDOM",
					FID: "UK"
				}
			}
		]
	}
};
var arcs$1 = [
	[
		[
			5544835,
			7599525
		],
		[
			-8305,
			-2743
		],
		[
			-6357,
			-4403
		],
		[
			-8701,
			-255
		],
		[
			-6227,
			952
		],
		[
			-1658,
			-1811
		],
		[
			-3259,
			-3561
		],
		[
			-11175,
			-2531
		],
		[
			1098,
			-1359
		],
		[
			-217,
			-1427
		],
		[
			5374,
			-3152
		],
		[
			4330,
			-3741
		],
		[
			5159,
			-1243
		],
		[
			2127,
			-1947
		],
		[
			2982,
			-2731
		],
		[
			7921,
			-1843
		],
		[
			1787,
			-6802
		],
		[
			891,
			-881
		],
		[
			3253,
			-1077
		],
		[
			12045,
			196
		],
		[
			1868,
			-1998
		],
		[
			4146,
			-1454
		],
		[
			2020,
			-2415
		],
		[
			3372,
			-629
		],
		[
			2394,
			-1508
		],
		[
			2884,
			878
		],
		[
			4459,
			-956
		],
		[
			3095,
			2393
		],
		[
			3667,
			721
		],
		[
			-734,
			-1500
		],
		[
			3910,
			-121
		],
		[
			-608,
			-1488
		],
		[
			2616,
			518
		],
		[
			4318,
			-1274
		],
		[
			3798,
			799
		],
		[
			2464,
			3040
		],
		[
			529,
			1647
		],
		[
			-608,
			1692
		],
		[
			1742,
			1771
		],
		[
			9199,
			2155
		],
		[
			-80,
			2994
		],
		[
			-2634,
			1621
		],
		[
			-249,
			1196
		],
		[
			-3128,
			1323
		],
		[
			2781,
			1519
		],
		[
			-745,
			2214
		],
		[
			3706,
			207
		],
		[
			3466,
			1433
		],
		[
			5572,
			5250
		],
		[
			3246,
			1313
		],
		[
			10513,
			-3958
		],
		[
			2067,
			-2481
		],
		[
			3198,
			-1764
		],
		[
			606,
			-591
		],
		[
			960,
			-3903
		],
		[
			-1993,
			-1302
		],
		[
			4231,
			-1529
		],
		[
			1731,
			-3672
		],
		[
			2061,
			-1610
		],
		[
			5690,
			-2623
		],
		[
			4047,
			1562
		],
		[
			5305,
			-1938
		],
		[
			1058,
			-2885
		],
		[
			-2410,
			-3261
		],
		[
			837,
			-1908
		],
		[
			-844,
			-1843
		],
		[
			-510,
			-1115
		],
		[
			3483,
			-2824
		],
		[
			3278,
			301
		],
		[
			1573,
			1006
		],
		[
			6793,
			133
		],
		[
			3680,
			1668
		],
		[
			1784,
			-652
		],
		[
			1802,
			-659
		],
		[
			4285,
			185
		],
		[
			3181,
			1957
		],
		[
			426,
			3113
		],
		[
			1676,
			-171
		],
		[
			1903,
			-1739
		],
		[
			3205,
			1850
		],
		[
			2389,
			-924
		]
	],
	[
		[
			5589569,
			7645399
		],
		[
			-3237,
			-1517
		],
		[
			-6030,
			-637
		],
		[
			-4159,
			-2718
		],
		[
			-1545,
			-6867
		],
		[
			-3969,
			-2580
		],
		[
			-402,
			-5650
		],
		[
			-3498,
			-4053
		],
		[
			-5485,
			-3279
		],
		[
			-1043,
			-4738
		],
		[
			-9177,
			75
		],
		[
			-10790,
			-3856
		],
		[
			-8046,
			2269
		],
		[
			-2015,
			-761
		],
		[
			-6146,
			-3088
		],
		[
			1129,
			-2664
		],
		[
			5017,
			-2776
		],
		[
			4047,
			-71
		],
		[
			5713,
			-1493
		],
		[
			3836,
			503
		],
		[
			1066,
			-1973
		]
	],
	[
		[
			5586561,
			7552716
		],
		[
			-667,
			-860
		],
		[
			-1941,
			-157
		],
		[
			-704,
			724
		],
		[
			-795,
			-110
		],
		[
			-1083,
			965
		],
		[
			1232,
			535
		],
		[
			1570,
			1496
		],
		[
			1935,
			445
		],
		[
			915,
			-415
		],
		[
			-370,
			-1304
		],
		[
			-1017,
			-590
		],
		[
			925,
			-729
		]
	],
	[
		[
			5871971,
			7888131
		],
		[
			6520,
			-1353
		],
		[
			7540,
			119
		],
		[
			6895,
			1173
		],
		[
			4371,
			-564
		],
		[
			2134,
			1550
		],
		[
			1444,
			1048
		],
		[
			2550,
			532
		],
		[
			6763,
			3792
		],
		[
			474,
			1221
		],
		[
			-1372,
			1349
		],
		[
			1031,
			781
		],
		[
			4562,
			908
		],
		[
			7607,
			-1201
		],
		[
			6972,
			574
		],
		[
			7683,
			3254
		],
		[
			11886,
			3472
		],
		[
			2975,
			-197
		],
		[
			652,
			-2067
		],
		[
			3018,
			-381
		],
		[
			717,
			767
		],
		[
			-767,
			1905
		],
		[
			5764,
			467
		],
		[
			1284,
			104
		],
		[
			2260,
			1014
		],
		[
			2209,
			2398
		],
		[
			10047,
			1874
		],
		[
			8963,
			267
		],
		[
			15959,
			-4271
		],
		[
			10489,
			-1460
		],
		[
			6007,
			1559
		],
		[
			8736,
			2266
		],
		[
			7681,
			-810
		],
		[
			6336,
			-1019
		],
		[
			8430,
			260
		],
		[
			14221,
			-2014
		],
		[
			15797,
			489
		],
		[
			5557,
			1887
		],
		[
			10793,
			-1647
		],
		[
			7342,
			2259
		],
		[
			10392,
			-89
		],
		[
			3136,
			-1617
		],
		[
			5640,
			-819
		],
		[
			4492,
			-3529
		],
		[
			4631,
			-2286
		],
		[
			3171,
			-8286
		],
		[
			2330,
			-2754
		],
		[
			-1121,
			-1100
		],
		[
			805,
			-2874
		],
		[
			-4301,
			-4222
		],
		[
			-2954,
			-1583
		],
		[
			-1952,
			-2369
		],
		[
			-11727,
			-6255
		],
		[
			-456,
			-1881
		],
		[
			-4700,
			-5877
		],
		[
			-2538,
			-4901
		],
		[
			-595,
			-1149
		],
		[
			-127,
			-2251
		],
		[
			722,
			-887
		],
		[
			1120,
			-1374
		],
		[
			-45,
			-1626
		],
		[
			-1075,
			-1410
		],
		[
			-3050,
			-4000
		],
		[
			-5551,
			-4549
		],
		[
			-2230,
			-2564
		],
		[
			-2272,
			-2611
		],
		[
			-45,
			-5738
		],
		[
			-2012,
			-3328
		],
		[
			-9925,
			-7684
		],
		[
			-8595,
			-3132
		],
		[
			-2028,
			-1476
		],
		[
			-2379,
			-4638
		],
		[
			939,
			-1189
		],
		[
			-302,
			-1029
		],
		[
			-6125,
			-3147
		],
		[
			256,
			-2093
		],
		[
			1711,
			-834
		],
		[
			-465,
			-1032
		],
		[
			-5518,
			-5053
		],
		[
			-7576,
			-2315
		],
		[
			-7223,
			-3576
		],
		[
			-1762,
			-873
		],
		[
			-2750,
			-3171
		],
		[
			-6763,
			1389
		],
		[
			-6237,
			-1514
		],
		[
			-6918,
			3
		],
		[
			-2921,
			-685
		],
		[
			-2475,
			-581
		],
		[
			-6146,
			669
		],
		[
			-7926,
			-3128
		],
		[
			-8156,
			-4894
		],
		[
			-6507,
			-1809
		],
		[
			80,
			-966
		],
		[
			8279,
			1445
		],
		[
			27855,
			8351
		],
		[
			8566,
			-674
		],
		[
			1506,
			-650
		],
		[
			408,
			-1553
		],
		[
			-769,
			-2359
		],
		[
			-2758,
			-3290
		],
		[
			3227,
			-588
		],
		[
			4996,
			-2398
		],
		[
			7171,
			-1140
		],
		[
			1991,
			-533
		],
		[
			6572,
			-4000
		],
		[
			-8563,
			-5244
		],
		[
			-11052,
			-3394
		],
		[
			-6082,
			54
		],
		[
			-5995,
			1786
		],
		[
			-4433,
			-432
		],
		[
			-17776,
			-9001
		],
		[
			-3455,
			-4812
		],
		[
			-9757,
			-1036
		],
		[
			-9720,
			-2930
		],
		[
			-2285,
			-1440
		],
		[
			-14014,
			3386
		],
		[
			-4004,
			967
		],
		[
			-10991,
			-490
		],
		[
			-11059,
			5533
		],
		[
			-6844,
			1455
		],
		[
			56,
			-1195
		],
		[
			2066,
			713
		],
		[
			2547,
			-1672
		],
		[
			1945,
			404
		],
		[
			6296,
			-3826
		],
		[
			2116,
			-3729
		],
		[
			2848,
			757
		],
		[
			2164,
			-2115
		],
		[
			6739,
			526
		],
		[
			6121,
			-1251
		],
		[
			2214,
			-452
		],
		[
			535,
			-228
		],
		[
			8504,
			-595
		],
		[
			3387,
			-325
		],
		[
			3958,
			860
		],
		[
			6554,
			-1985
		],
		[
			10953,
			829
		],
		[
			4672,
			-2345
		],
		[
			1138,
			-592
		],
		[
			2340,
			-882
		],
		[
			1766,
			-273
		],
		[
			11197,
			2064
		],
		[
			5218,
			961
		],
		[
			1812,
			1058
		],
		[
			541,
			1225
		],
		[
			426,
			964
		],
		[
			2757,
			503
		],
		[
			-484,
			2076
		],
		[
			4792,
			2568
		],
		[
			2814,
			368
		],
		[
			9475,
			-332
		],
		[
			2056,
			-72
		],
		[
			3962,
			-898
		],
		[
			4502,
			-3144
		],
		[
			-835,
			-1967
		],
		[
			2551,
			700
		],
		[
			2061,
			-659
		],
		[
			3243,
			397
		],
		[
			1851,
			-504
		],
		[
			5421,
			-1477
		],
		[
			7743,
			-3910
		],
		[
			4758,
			-1572
		],
		[
			10525,
			-36
		],
		[
			7017,
			-1426
		],
		[
			1883,
			-2874
		],
		[
			4455,
			-1617
		],
		[
			1197,
			-2592
		],
		[
			3394,
			-3378
		],
		[
			3469,
			-2841
		],
		[
			317,
			-2084
		],
		[
			11054,
			-6813
		],
		[
			4807,
			-5069
		],
		[
			2509,
			-744
		],
		[
			2703,
			680
		],
		[
			1725,
			-1385
		],
		[
			-683,
			-1293
		],
		[
			531,
			-744
		],
		[
			4761,
			774
		],
		[
			7873,
			-3822
		],
		[
			1649,
			-2389
		],
		[
			-742,
			-1414
		],
		[
			1972,
			-1862
		],
		[
			43,
			-1864
		],
		[
			2115,
			-1446
		],
		[
			404,
			-4804
		],
		[
			1075,
			-1141
		],
		[
			-389,
			-1987
		],
		[
			-2426,
			-2247
		],
		[
			177,
			-1408
		],
		[
			1606,
			-3202
		],
		[
			3768,
			-2098
		],
		[
			-1795,
			-2924
		],
		[
			98,
			-2065
		],
		[
			6398,
			-7516
		],
		[
			-1979,
			-3652
		],
		[
			3284,
			-5813
		],
		[
			2940,
			-2504
		],
		[
			4150,
			-5343
		],
		[
			-625,
			-1279
		],
		[
			6608,
			-4057
		],
		[
			405,
			-1042
		],
		[
			-759,
			-1300
		],
		[
			1653,
			-8349
		],
		[
			3178,
			-4381
		],
		[
			1124,
			-4036
		],
		[
			2842,
			-2467
		],
		[
			3370,
			-2926
		],
		[
			5699,
			-2342
		],
		[
			-935,
			-2072
		],
		[
			2754,
			-3610
		],
		[
			-1789,
			-1660
		],
		[
			2049,
			-1137
		],
		[
			-3851,
			-2886
		],
		[
			-4870,
			289
		],
		[
			-959,
			-1651
		],
		[
			1012,
			1638
		],
		[
			5140,
			-635
		],
		[
			4333,
			2083
		],
		[
			511,
			2202
		],
		[
			1621,
			1158
		],
		[
			7919,
			-1951
		],
		[
			5791,
			-2405
		],
		[
			6349,
			-499
		],
		[
			3942,
			-1584
		],
		[
			576,
			-69
		],
		[
			9840,
			-1180
		],
		[
			4953,
			-2991
		],
		[
			2862,
			142
		],
		[
			629,
			-363
		],
		[
			4839,
			-2791
		],
		[
			9147,
			-2292
		],
		[
			4086,
			-2895
		],
		[
			-489,
			-1733
		],
		[
			663,
			-1142
		],
		[
			4544,
			-1840
		],
		[
			2315,
			-2207
		],
		[
			3457,
			-4367
		],
		[
			1622,
			-4068
		],
		[
			1525,
			-905
		],
		[
			185,
			-1669
		],
		[
			2740,
			-2342
		],
		[
			7654,
			-2440
		],
		[
			1219,
			-3825
		],
		[
			5895,
			-2457
		],
		[
			12268,
			-4039
		],
		[
			-1649,
			-1098
		],
		[
			-6118,
			-1157
		],
		[
			-1865,
			-1364
		],
		[
			-2352,
			-3196
		],
		[
			269,
			-4427
		],
		[
			6152,
			-10917
		],
		[
			23970,
			-21403
		],
		[
			2872,
			-4657
		],
		[
			-8495,
			985
		],
		[
			-8886,
			-1231
		],
		[
			-4449,
			442
		],
		[
			-11436,
			6358
		],
		[
			-4046,
			3273
		],
		[
			-2631,
			729
		],
		[
			-1821,
			196
		],
		[
			-1250,
			-64
		],
		[
			-2488,
			-336
		],
		[
			-2189,
			-659
		],
		[
			-2551,
			-627
		],
		[
			-623,
			-154
		],
		[
			-1096,
			-106
		],
		[
			-2255,
			-349
		],
		[
			-2774,
			-551
		],
		[
			-1631,
			267
		],
		[
			-2357,
			-35
		],
		[
			-4996,
			-730
		],
		[
			-1367,
			20
		],
		[
			-873,
			218
		],
		[
			-2800,
			1420
		],
		[
			-504,
			255
		],
		[
			-2344,
			256
		],
		[
			-2132,
			-306
		],
		[
			-1136,
			-205
		],
		[
			-4992,
			-2232
		],
		[
			-17,
			-1874
		],
		[
			910,
			-63
		],
		[
			584,
			1403
		],
		[
			6445,
			1476
		],
		[
			5995,
			-2912
		],
		[
			1767,
			415
		],
		[
			2244,
			-867
		],
		[
			4764,
			1772
		],
		[
			17450,
			1594
		],
		[
			2113,
			-892
		],
		[
			7288,
			-6584
		],
		[
			9710,
			-5016
		],
		[
			5118,
			-963
		],
		[
			7187,
			-5291
		],
		[
			1954,
			-917
		],
		[
			3883,
			-149
		],
		[
			1213,
			-1720
		],
		[
			1630,
			-543
		],
		[
			1784,
			692
		],
		[
			1412,
			-1199
		],
		[
			1932,
			-132
		],
		[
			2844,
			-3256
		],
		[
			4290,
			-4911
		],
		[
			9465,
			-13660
		],
		[
			1515,
			-3683
		],
		[
			1777,
			-4318
		],
		[
			-1660,
			-7947
		],
		[
			-216,
			-1035
		],
		[
			-3616,
			-1031
		],
		[
			-11555,
			-6063
		],
		[
			-1737,
			-912
		],
		[
			-4921,
			-3716
		],
		[
			-1314,
			-993
		],
		[
			-2862,
			-3585
		],
		[
			-3151,
			-1750
		],
		[
			-685,
			-1089
		],
		[
			6698,
			-1611
		],
		[
			6653,
			-1702
		],
		[
			1319,
			-1401
		],
		[
			3008,
			-3196
		],
		[
			621,
			-660
		],
		[
			4577,
			-1038
		],
		[
			5366,
			357
		],
		[
			4762,
			-1368
		],
		[
			2995,
			2709
		],
		[
			4175,
			2030
		],
		[
			4439,
			8690
		],
		[
			3573,
			2925
		],
		[
			3058,
			960
		],
		[
			11487,
			-40
		],
		[
			3961,
			993
		],
		[
			21901,
			-1793
		],
		[
			3923,
			197
		],
		[
			1596,
			1044
		],
		[
			1710,
			-927
		],
		[
			5543,
			-130
		],
		[
			24896,
			-3571
		],
		[
			13755,
			-5239
		],
		[
			9677,
			-5139
		],
		[
			7513,
			-4017
		],
		[
			6622,
			-4424
		],
		[
			2452,
			-2593
		],
		[
			4174,
			-8311
		],
		[
			-890,
			-7086
		],
		[
			770,
			-3069
		],
		[
			1439,
			-5594
		],
		[
			-1910,
			-3209
		],
		[
			-1794,
			-5987
		],
		[
			-4032,
			-6374
		],
		[
			-4100,
			-4460
		],
		[
			-1730,
			-8770
		],
		[
			-4571,
			-9749
		],
		[
			-9509,
			-3561
		],
		[
			-4982,
			-4867
		],
		[
			-3655,
			-1314
		],
		[
			-1704,
			-2130
		],
		[
			-4475,
			-2535
		],
		[
			-3572,
			1692
		],
		[
			-2685,
			3001
		],
		[
			-7653,
			2236
		],
		[
			231,
			-894
		],
		[
			6959,
			-2176
		],
		[
			867,
			-2295
		],
		[
			-7261,
			-503
		],
		[
			-4212,
			708
		],
		[
			-10067,
			-1280
		],
		[
			6120,
			-1046
		],
		[
			16956,
			367
		],
		[
			-4110,
			-5342
		],
		[
			3694,
			-1832
		],
		[
			326,
			-993
		],
		[
			-5986,
			-4712
		],
		[
			-10582,
			-3961
		],
		[
			-7618,
			-245
		],
		[
			-1836,
			2680
		],
		[
			-2924,
			1618
		],
		[
			-1792,
			2144
		],
		[
			-805,
			-2689
		],
		[
			2099,
			-1497
		],
		[
			-1111,
			-909
		],
		[
			-5038,
			-1220
		],
		[
			-3012,
			1069
		],
		[
			-5563,
			-443
		],
		[
			1722,
			-674
		],
		[
			739,
			-1803
		],
		[
			-1931,
			-1288
		],
		[
			-12487,
			-904
		],
		[
			-1023,
			-752
		],
		[
			4723,
			-2942
		],
		[
			4108,
			1915
		],
		[
			4971,
			203
		],
		[
			4604,
			2362
		],
		[
			3306,
			11
		],
		[
			1525,
			-1789
		],
		[
			9,
			-3740
		],
		[
			-2182,
			-5712
		],
		[
			-6657,
			-827
		],
		[
			-10746,
			1722
		],
		[
			-10776,
			-82
		],
		[
			-3602,
			-831
		],
		[
			15084,
			319
		],
		[
			10492,
			-2407
		],
		[
			6383,
			-195
		],
		[
			-1946,
			-2460
		],
		[
			-8648,
			-4193
		],
		[
			-3790,
			-1805
		],
		[
			-13134,
			1666
		],
		[
			-2521,
			-715
		],
		[
			502,
			-954
		],
		[
			-667,
			-520
		],
		[
			-5287,
			-875
		],
		[
			-5258,
			2020
		],
		[
			0,
			-582
		],
		[
			963,
			-1305
		],
		[
			-963,
			-93
		],
		[
			-6788,
			-658
		],
		[
			-1931,
			-3911
		],
		[
			-1894,
			-725
		],
		[
			-3848,
			-206
		],
		[
			-2755,
			-147
		],
		[
			-3110,
			1993
		],
		[
			-4032,
			-852
		],
		[
			-6560,
			2602
		],
		[
			-2103,
			13
		],
		[
			-558,
			407
		],
		[
			-2517,
			1838
		],
		[
			-5455,
			209
		],
		[
			-718,
			96
		],
		[
			-3365,
			-1666
		],
		[
			-3721,
			41
		],
		[
			-1672,
			768
		],
		[
			-1221,
			-254
		],
		[
			-1095,
			-1635
		],
		[
			-2152,
			1925
		],
		[
			-4419,
			34
		],
		[
			-3206,
			295
		],
		[
			-1859,
			-2209
		],
		[
			-1985,
			-314
		],
		[
			-2246,
			-387
		],
		[
			-1328,
			-1304
		],
		[
			-1497,
			-267
		],
		[
			-1732,
			542
		],
		[
			-1229,
			1615
		],
		[
			-1357,
			142
		],
		[
			2101,
			-1711
		],
		[
			1531,
			-762
		],
		[
			1562,
			-88
		],
		[
			924,
			338
		],
		[
			1186,
			1339
		],
		[
			4243,
			497
		],
		[
			1951,
			2339
		],
		[
			6965,
			-317
		],
		[
			1450,
			-1963
		],
		[
			1876,
			178
		],
		[
			1163,
			1204
		],
		[
			5918,
			-365
		],
		[
			4589,
			1334
		],
		[
			4263,
			-329
		],
		[
			3052,
			-2298
		],
		[
			3354,
			-282
		],
		[
			5569,
			-2468
		],
		[
			3935,
			891
		],
		[
			4575,
			-1845
		],
		[
			1685,
			-63
		],
		[
			3514,
			-132
		],
		[
			4868,
			1104
		],
		[
			974,
			2231
		],
		[
			2244,
			875
		],
		[
			2861,
			-176
		],
		[
			16317,
			-1003
		],
		[
			3196,
			-1381
		],
		[
			441,
			-1216
		],
		[
			-749,
			-955
		],
		[
			-7750,
			377
		],
		[
			-2271,
			-2195
		],
		[
			-3426,
			-706
		],
		[
			-1297,
			-1251
		],
		[
			3868,
			-1679
		],
		[
			2110,
			65
		],
		[
			281,
			-959
		],
		[
			2131,
			1941
		],
		[
			2380,
			-1588
		],
		[
			1982,
			1261
		],
		[
			815,
			-901
		],
		[
			1206,
			266
		],
		[
			-1299,
			1804
		],
		[
			72,
			1444
		],
		[
			2491,
			420
		],
		[
			-414,
			-1135
		],
		[
			1071,
			-104
		],
		[
			2090,
			3558
		],
		[
			14301,
			-2736
		],
		[
			5139,
			-4243
		],
		[
			-4399,
			-1913
		],
		[
			-11036,
			1597
		],
		[
			-2660,
			-82
		],
		[
			304,
			-837
		],
		[
			10037,
			-887
		],
		[
			3023,
			-1118
		],
		[
			5107,
			307
		],
		[
			4682,
			225
		],
		[
			3280,
			1572
		],
		[
			7723,
			859
		],
		[
			16119,
			551
		],
		[
			15001,
			1527
		],
		[
			2189,
			-611
		],
		[
			786,
			-1208
		],
		[
			-644,
			-2357
		],
		[
			-1853,
			-2125
		],
		[
			-4690,
			-234
		],
		[
			-1350,
			-1108
		],
		[
			4121,
			-8505
		],
		[
			-544,
			-6832
		],
		[
			-2460,
			-2268
		],
		[
			-10556,
			-3856
		],
		[
			-4681,
			-444
		],
		[
			-3966,
			-2121
		],
		[
			-10847,
			-1386
		],
		[
			-6479,
			-3020
		],
		[
			-2677,
			-2351
		],
		[
			-1614,
			-3761
		],
		[
			1538,
			-5411
		],
		[
			-704,
			-539
		],
		[
			-1498,
			-64
		],
		[
			-6003,
			603
		],
		[
			-609,
			79
		],
		[
			-862,
			131
		],
		[
			-1301,
			198
		],
		[
			-1653,
			252
		],
		[
			-7115,
			839
		],
		[
			-4334,
			-1499
		],
		[
			-7196,
			-4294
		],
		[
			-4806,
			-1362
		],
		[
			-10058,
			-1741
		],
		[
			-14461,
			-2502
		],
		[
			-884,
			-153
		],
		[
			-11550,
			-7965
		],
		[
			-6684,
			1128
		],
		[
			-5620,
			948
		],
		[
			-3850,
			1631
		],
		[
			-12738,
			2549
		],
		[
			-17783,
			2806
		],
		[
			-7652,
			-314
		],
		[
			-10619,
			-1823
		],
		[
			-15616,
			-606
		],
		[
			-15159,
			-2834
		],
		[
			-3866,
			-722
		],
		[
			-2570,
			298
		],
		[
			-704,
			-484
		],
		[
			1264,
			-1629
		],
		[
			-2682,
			-1972
		],
		[
			-11206,
			4926
		],
		[
			3347,
			3430
		],
		[
			-3487,
			2533
		],
		[
			-898,
			-2536
		],
		[
			-1679,
			300
		],
		[
			-762,
			1175
		],
		[
			607,
			1817
		],
		[
			-1836,
			-51
		],
		[
			-497,
			-295
		],
		[
			-1631,
			220
		],
		[
			-814,
			-410
		],
		[
			-848,
			11
		],
		[
			-1270,
			582
		],
		[
			-1640,
			-54
		],
		[
			-20,
			-619
		],
		[
			-558,
			-407
		],
		[
			-1860,
			-427
		],
		[
			45,
			-4262
		],
		[
			-4473,
			-730
		],
		[
			-2083,
			1425
		],
		[
			1102,
			3556
		],
		[
			-989,
			1496
		],
		[
			-1003,
			-100
		],
		[
			-3668,
			-323
		],
		[
			3096,
			-4452
		],
		[
			-674,
			-1206
		],
		[
			-1810,
			-477
		],
		[
			-14183,
			5563
		],
		[
			-1985,
			2243
		],
		[
			-1829,
			59
		],
		[
			-3805,
			2350
		],
		[
			-1873,
			1509
		],
		[
			-1847,
			-292
		],
		[
			-7268,
			2487
		],
		[
			768,
			-1034
		],
		[
			4077,
			-1156
		],
		[
			11475,
			-8059
		],
		[
			-3634,
			-2896
		],
		[
			-4426,
			-127
		],
		[
			-2770,
			-1752
		],
		[
			-10314,
			-1260
		],
		[
			-1884,
			-2401
		],
		[
			-3148,
			-1197
		],
		[
			-11845,
			1834
		],
		[
			-2839,
			-292
		],
		[
			-2029,
			-1217
		],
		[
			-1199,
			-809
		],
		[
			-11394,
			334
		],
		[
			-6314,
			-2115
		],
		[
			-3266,
			1634
		],
		[
			-3644,
			-246
		],
		[
			-4170,
			1044
		],
		[
			-2081,
			-909
		],
		[
			-387,
			-1273
		],
		[
			2701,
			190
		],
		[
			2419,
			-2337
		],
		[
			6652,
			-1613
		],
		[
			908,
			-2537
		],
		[
			-2579,
			-3943
		],
		[
			-8412,
			-1441
		],
		[
			-3230,
			1393
		],
		[
			-11783,
			2437
		],
		[
			-21459,
			1359
		],
		[
			-2589,
			-1004
		],
		[
			-1635,
			-2484
		],
		[
			-2346,
			-1555
		],
		[
			-12696,
			6602
		],
		[
			-16637,
			6280
		],
		[
			-11872,
			1902
		],
		[
			-5695,
			-1232
		],
		[
			-7260,
			-1859
		],
		[
			-5695,
			209
		],
		[
			-2525,
			-1564
		],
		[
			-15135,
			-1259
		],
		[
			-4582,
			-4001
		],
		[
			-6761,
			-2599
		],
		[
			-4682,
			685
		],
		[
			-3387,
			5850
		],
		[
			-1582,
			470
		],
		[
			-248,
			-1101
		],
		[
			2724,
			-6676
		],
		[
			-5662,
			-5808
		],
		[
			-1327,
			-2527
		],
		[
			-195,
			-3056
		],
		[
			1308,
			-2140
		],
		[
			-4378,
			-886
		],
		[
			-1514,
			-2787
		],
		[
			1116,
			-2185
		],
		[
			4910,
			-781
		],
		[
			-1088,
			-1917
		],
		[
			-1945,
			-3357
		],
		[
			-3781,
			-738
		],
		[
			-6794,
			-3949
		],
		[
			-811,
			-2500
		],
		[
			-1731,
			-5330
		],
		[
			-6050,
			-1395
		],
		[
			-5152,
			2316
		],
		[
			-1896,
			-1169
		],
		[
			-554,
			-341
		],
		[
			-5548,
			1823
		],
		[
			-1187,
			590
		],
		[
			144,
			1899
		],
		[
			-1406,
			1607
		],
		[
			-739,
			844
		],
		[
			-5913,
			1550
		],
		[
			-901,
			1116
		],
		[
			-7914,
			-1369
		],
		[
			-2806,
			288
		],
		[
			-1971,
			1632
		],
		[
			-3892,
			675
		],
		[
			-737,
			2590
		],
		[
			-634,
			1558
		],
		[
			-3419,
			-120
		],
		[
			-1901,
			826
		],
		[
			-1900,
			3025
		],
		[
			1478,
			2470
		],
		[
			-3159,
			5080
		],
		[
			-1945,
			-914
		],
		[
			-114,
			-184
		],
		[
			114,
			-509
		],
		[
			775,
			-311
		],
		[
			399,
			131
		],
		[
			486,
			544
		],
		[
			466,
			7
		],
		[
			454,
			-581
		],
		[
			349,
			-1124
		],
		[
			807,
			-905
		],
		[
			-352,
			-584
		],
		[
			-698,
			-334
		],
		[
			21,
			-1226
		],
		[
			421,
			-663
		],
		[
			-428,
			-771
		],
		[
			-1316,
			-447
		],
		[
			-206,
			-346
		],
		[
			313,
			-203
		],
		[
			1168,
			104
		],
		[
			770,
			-372
		],
		[
			380,
			-562
		],
		[
			-115,
			-333
		],
		[
			672,
			-434
		],
		[
			-162,
			-278
		],
		[
			-426,
			-161
		],
		[
			-725,
			89
		],
		[
			-1398,
			-323
		],
		[
			-200,
			-383
		],
		[
			747,
			-486
		],
		[
			984,
			130
		],
		[
			728,
			-156
		],
		[
			422,
			-655
		],
		[
			1418,
			682
		],
		[
			628,
			-46
		],
		[
			761,
			-935
		],
		[
			-291,
			-504
		],
		[
			-1916,
			-448
		],
		[
			-1069,
			-765
		],
		[
			70,
			-385
		],
		[
			865,
			-593
		],
		[
			-44,
			-483
		],
		[
			-2023,
			-51
		],
		[
			-1327,
			-519
		],
		[
			-175,
			617
		],
		[
			488,
			413
		],
		[
			32,
			215
		],
		[
			-814,
			820
		],
		[
			-1537,
			855
		],
		[
			-3882,
			1512
		],
		[
			-2547,
			449
		],
		[
			-2225,
			85
		],
		[
			-869,
			-191
		],
		[
			-1428,
			138
		],
		[
			-1178,
			-110
		],
		[
			-2151,
			397
		],
		[
			-5007,
			-405
		],
		[
			-1366,
			-916
		],
		[
			-393,
			-612
		],
		[
			-1567,
			-605
		],
		[
			-613,
			-503
		],
		[
			-1848,
			161
		],
		[
			-1072,
			-484
		],
		[
			-3101,
			-610
		],
		[
			-1579,
			34
		],
		[
			-1581,
			335
		],
		[
			-7396,
			19
		],
		[
			-3424,
			-1110
		],
		[
			-1745,
			2727
		],
		[
			-5851,
			-1388
		],
		[
			-1160,
			-1103
		],
		[
			853,
			-1785
		],
		[
			-2526,
			-1664
		],
		[
			-100,
			-1169
		],
		[
			517,
			-2308
		],
		[
			-2278,
			-2565
		],
		[
			-5094,
			842
		],
		[
			-6439,
			-3074
		],
		[
			-3681,
			-175
		],
		[
			-3159,
			-4296
		],
		[
			-1973,
			-1069
		],
		[
			-2024,
			1878
		],
		[
			-1268,
			3754
		],
		[
			-2621,
			-452
		],
		[
			1061,
			-2470
		],
		[
			-1143,
			-1486
		],
		[
			840,
			-1191
		],
		[
			-3121,
			-2012
		],
		[
			-690,
			-1978
		],
		[
			-1583,
			-1060
		],
		[
			3025,
			-1879
		],
		[
			1126,
			-3394
		],
		[
			-4076,
			-3794
		],
		[
			-5575,
			-449
		],
		[
			-3496,
			-3842
		],
		[
			-4976,
			1998
		],
		[
			-1438,
			1989
		],
		[
			-300,
			3040
		],
		[
			-4615,
			4462
		],
		[
			-7535,
			2288
		],
		[
			-4069,
			146
		],
		[
			-4547,
			2070
		],
		[
			-5414,
			-253
		],
		[
			-1509,
			-1371
		],
		[
			-28,
			-3243
		],
		[
			-3851,
			-2144
		],
		[
			-9182,
			-1519
		],
		[
			-3727,
			2653
		],
		[
			1621,
			2479
		],
		[
			-932,
			3998
		],
		[
			2895,
			3245
		],
		[
			4520,
			978
		],
		[
			9612,
			4363
		],
		[
			3727,
			193
		],
		[
			3282,
			-1740
		],
		[
			2944,
			-361
		],
		[
			4609,
			4348
		],
		[
			4927,
			216
		],
		[
			6856,
			3185
		],
		[
			4006,
			4322
		],
		[
			3229,
			849
		],
		[
			3897,
			2503
		],
		[
			1546,
			5307
		],
		[
			6197,
			1531
		],
		[
			2752,
			1596
		],
		[
			1559,
			3359
		],
		[
			744,
			7718
		],
		[
			4090,
			-150
		],
		[
			3854,
			1873
		],
		[
			1990,
			-2826
		],
		[
			1486,
			-243
		],
		[
			-923,
			2220
		],
		[
			72,
			3378
		],
		[
			3467,
			-269
		],
		[
			9386,
			1717
		],
		[
			2282,
			2189
		],
		[
			1518,
			4423
		],
		[
			7462,
			2959
		],
		[
			4081,
			4205
		],
		[
			7419,
			3930
		],
		[
			1375,
			5210
		],
		[
			-1171,
			7343
		],
		[
			2030,
			2336
		],
		[
			1411,
			7225
		],
		[
			1670,
			1885
		],
		[
			4794,
			-49
		],
		[
			8244,
			-2499
		],
		[
			3919,
			-327
		],
		[
			4655,
			1228
		],
		[
			7349,
			5378
		],
		[
			3971,
			-760
		],
		[
			1385,
			2297
		],
		[
			-3546,
			373
		],
		[
			-4092,
			6366
		],
		[
			2775,
			1656
		],
		[
			746,
			3000
		],
		[
			1303,
			1085
		],
		[
			10791,
			1775
		],
		[
			5179,
			-310
		],
		[
			11170,
			1792
		],
		[
			10941,
			281
		],
		[
			3027,
			1046
		],
		[
			6826,
			-968
		],
		[
			10140,
			-1390
		],
		[
			7878,
			1175
		],
		[
			8678,
			-2287
		],
		[
			5489,
			-2463
		],
		[
			12206,
			-220
		],
		[
			13537,
			2780
		],
		[
			6787,
			-556
		],
		[
			4062,
			936
		],
		[
			500,
			-1511
		],
		[
			2563,
			3548
		],
		[
			-1602,
			4000
		],
		[
			316,
			4393
		],
		[
			2229,
			318
		],
		[
			266,
			2493
		],
		[
			128,
			1207
		],
		[
			2320,
			1413
		],
		[
			-289,
			1829
		],
		[
			5805,
			820
		],
		[
			6066,
			5597
		],
		[
			4731,
			2902
		],
		[
			8338,
			1661
		],
		[
			2713,
			-1321
		],
		[
			1256,
			-612
		],
		[
			-1256,
			1047
		],
		[
			-1917,
			1597
		],
		[
			1917,
			1930
		],
		[
			1836,
			1848
		],
		[
			1334,
			3023
		],
		[
			7039,
			5001
		],
		[
			2893,
			3803
		],
		[
			2646,
			1457
		],
		[
			3985,
			1950
		],
		[
			1620,
			2748
		],
		[
			8976,
			3217
		],
		[
			579,
			1521
		],
		[
			-1820,
			733
		],
		[
			-6858,
			-3523
		],
		[
			-4066,
			-3480
		],
		[
			-9819,
			-3701
		],
		[
			-4278,
			-5603
		],
		[
			-1459,
			2351
		],
		[
			-4,
			-2586
		],
		[
			-2604,
			-1607
		],
		[
			-2295,
			-1417
		],
		[
			-4596,
			-645
		],
		[
			-14205,
			-4308
		],
		[
			-5683,
			359
		],
		[
			-2582,
			1263
		],
		[
			-2170,
			-1979
		],
		[
			-7521,
			-2829
		],
		[
			-3856,
			-1263
		],
		[
			-3031,
			-3311
		],
		[
			-2277,
			48
		],
		[
			710,
			-1835
		],
		[
			-1013,
			-3377
		],
		[
			-16513,
			-2220
		],
		[
			-21010,
			1828
		],
		[
			-4523,
			3964
		],
		[
			-3787,
			1963
		],
		[
			-217,
			996
		],
		[
			-2271,
			949
		],
		[
			-5653,
			59
		],
		[
			-7194,
			8256
		],
		[
			-2232,
			2560
		],
		[
			-3870,
			2703
		],
		[
			-3617,
			228
		],
		[
			-9387,
			-1202
		],
		[
			-1730,
			-1844
		],
		[
			1206,
			-1806
		],
		[
			-780,
			-392
		],
		[
			-4317,
			366
		],
		[
			-3076,
			-883
		],
		[
			-6679,
			860
		],
		[
			-2018,
			-875
		],
		[
			113,
			-1559
		],
		[
			-6315,
			-458
		],
		[
			-8758,
			2260
		],
		[
			1204,
			1603
		],
		[
			-1123,
			3174
		],
		[
			5759,
			3420
		],
		[
			1505,
			-1302
		],
		[
			5927,
			-461
		],
		[
			8982,
			3210
		],
		[
			2855,
			4478
		],
		[
			-3528,
			-3532
		],
		[
			-2335,
			-707
		],
		[
			-3923,
			-111
		],
		[
			-6007,
			2266
		],
		[
			-9238,
			-910
		],
		[
			-6732,
			4501
		],
		[
			23,
			922
		],
		[
			1549,
			901
		],
		[
			-1332,
			1268
		],
		[
			-395,
			2720
		],
		[
			-3775,
			-1471
		],
		[
			-3673,
			953
		],
		[
			-262,
			-770
		],
		[
			1885,
			-1708
		],
		[
			-984,
			-800
		],
		[
			-22554,
			-1056
		],
		[
			-2113,
			-1191
		],
		[
			-725,
			-3143
		],
		[
			-2805,
			-2919
		],
		[
			-6582,
			-1707
		],
		[
			-6938,
			415
		],
		[
			-6481,
			-3771
		],
		[
			-2625,
			-398
		],
		[
			-9794,
			2044
		],
		[
			-2000,
			3559
		],
		[
			-4157,
			2419
		],
		[
			1428,
			689
		],
		[
			3824,
			-631
		],
		[
			2760,
			985
		],
		[
			6245,
			-1206
		],
		[
			972,
			2341
		],
		[
			-11188,
			499
		],
		[
			-4462,
			1131
		],
		[
			-4708,
			-576
		],
		[
			-473,
			-1831
		],
		[
			-1098,
			-568
		],
		[
			-5442,
			3765
		],
		[
			5820,
			3821
		],
		[
			5807,
			1344
		],
		[
			332,
			3857
		],
		[
			-2854,
			4030
		],
		[
			-8319,
			1381
		],
		[
			-8828,
			-134
		],
		[
			1692,
			3848
		],
		[
			10268,
			3972
		],
		[
			9377,
			2288
		],
		[
			1474,
			4365
		],
		[
			1279,
			1075
		],
		[
			6736,
			-313
		],
		[
			2824,
			-1970
		],
		[
			3999,
			876
		],
		[
			2796,
			1747
		],
		[
			5265,
			-415
		],
		[
			1631,
			2154
		],
		[
			5015,
			1935
		],
		[
			5127,
			4367
		],
		[
			4203,
			-839
		],
		[
			896,
			2136
		],
		[
			1321,
			753
		],
		[
			9436,
			1210
		],
		[
			5867,
			-324
		],
		[
			13995,
			7287
		],
		[
			5841,
			633
		],
		[
			9935,
			4150
		],
		[
			8666,
			7789
		],
		[
			3155,
			4578
		],
		[
			4459,
			9925
		],
		[
			596,
			4256
		],
		[
			11986,
			2879
		],
		[
			-12832,
			-424
		],
		[
			-5503,
			5422
		],
		[
			1359,
			4989
		],
		[
			7300,
			6631
		],
		[
			-3697,
			1226
		],
		[
			-7154,
			7185
		],
		[
			864,
			4257
		],
		[
			-720,
			4098
		],
		[
			3261,
			1609
		],
		[
			-30,
			1061
		],
		[
			-14410,
			60
		],
		[
			-15393,
			-2652
		],
		[
			-7250,
			-3488
		],
		[
			-1894,
			-2341
		],
		[
			-629,
			-3026
		],
		[
			-2063,
			-1178
		],
		[
			-7726,
			3002
		],
		[
			-13360,
			-2635
		],
		[
			-2018,
			702
		],
		[
			3361,
			5443
		],
		[
			6992,
			5025
		],
		[
			7025,
			3188
		],
		[
			6474,
			1369
		],
		[
			14290,
			7913
		],
		[
			2534,
			3412
		],
		[
			742,
			4029
		],
		[
			15138,
			10904
		],
		[
			5593,
			1933
		],
		[
			12109,
			1618
		],
		[
			15949,
			4786
		],
		[
			177,
			1930
		],
		[
			-2417,
			1811
		],
		[
			290,
			765
		],
		[
			2579,
			-201
		],
		[
			2472,
			-1299
		],
		[
			2784,
			78
		],
		[
			1281,
			84
		],
		[
			5498,
			-2941
		],
		[
			10655,
			-596
		],
		[
			25131,
			6093
		],
		[
			4556,
			51
		],
		[
			3196,
			-2490
		],
		[
			17840,
			-7595
		],
		[
			854,
			107
		],
		[
			-242,
			1418
		],
		[
			1220,
			1166
		],
		[
			-2156,
			1772
		],
		[
			-1360,
			2909
		],
		[
			-6621,
			4478
		],
		[
			-721,
			1502
		],
		[
			2594,
			1621
		],
		[
			12081,
			3879
		],
		[
			1391,
			-355
		],
		[
			3787,
			-6354
		],
		[
			3352,
			-3077
		],
		[
			3712,
			-3407
		],
		[
			5800,
			-1676
		],
		[
			3081,
			1537
		],
		[
			5005,
			-840
		],
		[
			3729,
			1626
		],
		[
			-597,
			2953
		],
		[
			-3266,
			-1841
		],
		[
			-3564,
			580
		],
		[
			-4754,
			151
		],
		[
			-9146,
			4183
		],
		[
			-617,
			282
		],
		[
			-2640,
			2844
		],
		[
			-1049,
			3214
		],
		[
			-2878,
			2657
		],
		[
			-2921,
			5481
		],
		[
			-3352,
			2256
		],
		[
			-349,
			1613
		],
		[
			6955,
			8520
		],
		[
			6015,
			5098
		],
		[
			836,
			135
		],
		[
			948,
			152
		],
		[
			2640,
			2632
		],
		[
			6553,
			888
		],
		[
			2459,
			-702
		],
		[
			-1939,
			1162
		],
		[
			-6234,
			-551
		],
		[
			-4427,
			308
		],
		[
			-4164,
			289
		],
		[
			-4088,
			2087
		],
		[
			-917,
			1782
		],
		[
			943,
			9929
		],
		[
			1132,
			4450
		],
		[
			2448,
			178
		],
		[
			1666,
			-2198
		],
		[
			1179,
			3206
		],
		[
			1801,
			530
		],
		[
			7766,
			1057
		],
		[
			1888,
			1364
		],
		[
			948,
			3604
		],
		[
			-3329,
			47
		],
		[
			-1289,
			3173
		],
		[
			2867,
			3596
		],
		[
			3314,
			1521
		],
		[
			1040,
			477
		],
		[
			2282,
			2721
		],
		[
			-5866,
			6371
		],
		[
			902,
			2332
		],
		[
			-3346,
			-607
		],
		[
			-4864,
			-3631
		],
		[
			-5861,
			-1747
		],
		[
			-606,
			3099
		],
		[
			-2924,
			4542
		],
		[
			-3345,
			-5684
		],
		[
			-7915,
			-6618
		],
		[
			-2423,
			-1173
		],
		[
			-1998,
			1893
		],
		[
			-3171,
			-453
		],
		[
			-1376,
			1123
		],
		[
			-92,
			4421
		],
		[
			-1370,
			1512
		],
		[
			3172,
			937
		],
		[
			1669,
			3893
		],
		[
			1067,
			1401
		],
		[
			-1730,
			1868
		],
		[
			-381,
			869
		],
		[
			-1439,
			358
		],
		[
			367,
			-1789
		],
		[
			-2392,
			-2256
		],
		[
			653,
			-1638
		],
		[
			-703,
			-782
		],
		[
			-5683,
			-638
		],
		[
			-1993,
			653
		],
		[
			-9130,
			8758
		],
		[
			-342,
			4745
		],
		[
			489,
			546
		],
		[
			911,
			1017
		],
		[
			-369,
			874
		],
		[
			-703,
			230
		],
		[
			-909,
			-1180
		],
		[
			-1262,
			312
		],
		[
			-12458,
			10654
		],
		[
			-3169,
			2884
		],
		[
			-2673,
			1173
		],
		[
			-1217,
			2007
		],
		[
			1928,
			990
		],
		[
			570,
			292
		],
		[
			2657,
			3837
		],
		[
			1348,
			4318
		],
		[
			-468,
			3782
		],
		[
			5259,
			4185
		],
		[
			1441,
			2544
		],
		[
			5799,
			3658
		],
		[
			1288,
			814
		],
		[
			240,
			4385
		],
		[
			3911,
			6542
		],
		[
			4910,
			2746
		],
		[
			5544,
			-1578
		],
		[
			711,
			1005
		],
		[
			2270,
			453
		],
		[
			330,
			1253
		],
		[
			-2376,
			-370
		],
		[
			-2795,
			1101
		],
		[
			2836,
			2589
		],
		[
			7342,
			1230
		],
		[
			7807,
			-2541
		],
		[
			1094,
			-25
		],
		[
			875,
			586
		],
		[
			-1240,
			1120
		],
		[
			1709,
			1998
		],
		[
			4834,
			2197
		],
		[
			-9296,
			-2049
		],
		[
			-5673,
			816
		],
		[
			-6785,
			-639
		],
		[
			-5124,
			818
		],
		[
			-4812,
			-377
		],
		[
			-6045,
			1495
		],
		[
			-3818,
			-1803
		],
		[
			-3916,
			-284
		],
		[
			-4130,
			1088
		],
		[
			-2738,
			2543
		],
		[
			-530,
			-6398
		],
		[
			1675,
			-3094
		],
		[
			-2767,
			-3002
		],
		[
			-10449,
			561
		],
		[
			-7740,
			-2642
		],
		[
			-4130,
			2786
		],
		[
			-74,
			-2990
		],
		[
			-2118,
			510
		],
		[
			-959,
			-1577
		],
		[
			1470,
			-1657
		],
		[
			-386,
			-873
		],
		[
			-14423,
			-4814
		],
		[
			-6983,
			853
		],
		[
			-543,
			1123
		],
		[
			715,
			2374
		],
		[
			-1332,
			1692
		],
		[
			-2024,
			-1874
		],
		[
			-1045,
			-3849
		],
		[
			-5869,
			812
		],
		[
			-5632,
			4020
		],
		[
			-562,
			3581
		],
		[
			-4584,
			-1848
		],
		[
			-3710,
			420
		],
		[
			-6070,
			2168
		],
		[
			-3565,
			3151
		],
		[
			-2649,
			-2397
		],
		[
			878,
			-3534
		],
		[
			6643,
			-3663
		],
		[
			-1685,
			-2143
		],
		[
			635,
			-2073
		],
		[
			-120,
			-736
		],
		[
			-355,
			-2194
		],
		[
			883,
			-2229
		],
		[
			-3883,
			-2743
		],
		[
			-12245,
			3291
		],
		[
			-5262,
			2694
		],
		[
			-1139,
			1181
		],
		[
			-2128,
			2207
		],
		[
			-10642,
			4797
		],
		[
			-6532,
			973
		],
		[
			-4084,
			2858
		],
		[
			-2781,
			531
		],
		[
			-9191,
			-3412
		],
		[
			-2114,
			-2205
		],
		[
			2731,
			-5749
		],
		[
			2212,
			-4658
		],
		[
			3053,
			-2457
		],
		[
			-619,
			-4150
		],
		[
			-4526,
			769
		],
		[
			-3297,
			1748
		],
		[
			-857,
			1629
		],
		[
			1313,
			2133
		],
		[
			-845,
			2387
		],
		[
			-2445,
			1024
		],
		[
			-811,
			1414
		],
		[
			-2060,
			3092
		],
		[
			-12144,
			7295
		],
		[
			-4482,
			6846
		],
		[
			34,
			4817
		],
		[
			981,
			2037
		],
		[
			6643,
			2287
		],
		[
			3117,
			-2619
		],
		[
			1588,
			-6053
		],
		[
			2892,
			-1674
		],
		[
			2183,
			228
		],
		[
			777,
			2440
		],
		[
			-3981,
			6053
		],
		[
			-1618,
			2726
		],
		[
			455,
			2209
		],
		[
			3981,
			4768
		],
		[
			1634,
			3266
		],
		[
			811,
			1621
		],
		[
			3519,
			1820
		],
		[
			8657,
			6299
		],
		[
			2858,
			5903
		],
		[
			-505,
			4049
		],
		[
			6746,
			3845
		],
		[
			1197,
			4330
		],
		[
			3476,
			2131
		],
		[
			7938,
			1908
		],
		[
			2599,
			5432
		],
		[
			-916,
			1780
		],
		[
			-4425,
			2564
		],
		[
			1510,
			676
		],
		[
			279,
			1929
		],
		[
			-5097,
			4081
		],
		[
			-10484,
			2849
		],
		[
			-1286,
			1098
		],
		[
			-7128,
			5363
		],
		[
			344,
			2164
		],
		[
			3476,
			3805
		],
		[
			-2648,
			5980
		],
		[
			-286,
			5204
		],
		[
			-388,
			1441
		],
		[
			1893,
			4991
		],
		[
			5135,
			1914
		],
		[
			3207,
			225
		],
		[
			12055,
			-2747
		],
		[
			19157,
			-1151
		],
		[
			12032,
			-4673
		],
		[
			-518,
			399
		],
		[
			-2878,
			996
		],
		[
			-8402,
			3703
		],
		[
			-21613,
			4202
		],
		[
			-1426,
			2379
		],
		[
			-2094,
			746
		],
		[
			-5629,
			2005
		],
		[
			-4680,
			5406
		],
		[
			-717,
			-1426
		],
		[
			967,
			-2041
		],
		[
			4407,
			-3944
		],
		[
			686,
			-614
		],
		[
			-3291,
			-965
		],
		[
			-3908,
			890
		],
		[
			-252,
			689
		],
		[
			-2293,
			6270
		],
		[
			6868,
			8487
		],
		[
			5753,
			5578
		],
		[
			-3559,
			-2076
		],
		[
			-4658,
			-5212
		],
		[
			-2915,
			-2015
		],
		[
			-1884,
			413
		],
		[
			-1237,
			3210
		],
		[
			-1553,
			743
		],
		[
			334,
			-3542
		],
		[
			1819,
			-2932
		],
		[
			-2096,
			-4165
		],
		[
			362,
			-4759
		],
		[
			-2525,
			-1463
		],
		[
			399,
			-3381
		],
		[
			-6215,
			-7893
		],
		[
			-4743,
			1075
		],
		[
			-4848,
			6521
		],
		[
			-983,
			-3010
		],
		[
			-1643,
			-714
		],
		[
			-8558,
			3491
		],
		[
			-2944,
			-4481
		],
		[
			1107,
			-5157
		],
		[
			-760,
			-1095
		],
		[
			-8313,
			1913
		],
		[
			-3449,
			4510
		],
		[
			34,
			7181
		],
		[
			1378,
			2503
		],
		[
			2690,
			3783
		],
		[
			9616,
			8365
		],
		[
			9351,
			4072
		],
		[
			8812,
			6779
		],
		[
			260,
			636
		],
		[
			-807,
			141
		],
		[
			-3832,
			-660
		],
		[
			-5487,
			-4858
		],
		[
			-10735,
			-5427
		],
		[
			-9651,
			-6571
		],
		[
			-4750,
			-4347
		],
		[
			-6869,
			-880
		],
		[
			-94,
			-1033
		],
		[
			-205,
			-3562
		],
		[
			1668,
			-4533
		],
		[
			7924,
			-9486
		],
		[
			1365,
			-4448
		],
		[
			-1381,
			-1534
		],
		[
			-7910,
			-4181
		],
		[
			-4330,
			-6785
		],
		[
			-1013,
			-8086
		],
		[
			-3813,
			-7527
		],
		[
			-5410,
			-6829
		],
		[
			2804,
			-3700
		],
		[
			-274,
			-4429
		],
		[
			-2423,
			-2092
		],
		[
			-3815,
			-1540
		],
		[
			-14792,
			-1504
		],
		[
			-3279,
			1449
		],
		[
			-471,
			6468
		],
		[
			6837,
			7633
		],
		[
			1441,
			11185
		],
		[
			4634,
			11049
		],
		[
			9944,
			9348
		],
		[
			-4237,
			1022
		],
		[
			-4496,
			3515
		],
		[
			285,
			4057
		],
		[
			2963,
			5293
		],
		[
			-4296,
			-191
		],
		[
			-962,
			1262
		],
		[
			5962,
			8146
		],
		[
			415,
			702
		],
		[
			-346,
			342
		],
		[
			-1448,
			-313
		],
		[
			-868,
			-731
		],
		[
			-4381,
			-4086
		],
		[
			-922,
			725
		],
		[
			2699,
			3361
		],
		[
			5402,
			6625
		],
		[
			5721,
			2976
		],
		[
			-413,
			2936
		],
		[
			822,
			3063
		],
		[
			-3496,
			1235
		],
		[
			3224,
			7646
		],
		[
			-5654,
			2993
		],
		[
			-2585,
			-5426
		],
		[
			-1280,
			-590
		],
		[
			-924,
			2434
		],
		[
			1450,
			5502
		],
		[
			2383,
			2380
		],
		[
			6999,
			3208
		],
		[
			6835,
			7820
		],
		[
			5429,
			3006
		],
		[
			165,
			1860
		],
		[
			-2265,
			1787
		],
		[
			556,
			1912
		],
		[
			13277,
			13623
		],
		[
			9557,
			3842
		],
		[
			-1982,
			3076
		],
		[
			10056,
			8889
		],
		[
			772,
			1840
		],
		[
			-1393,
			-14
		],
		[
			-8574,
			-5577
		],
		[
			-4463,
			-5283
		],
		[
			-5097,
			-1670
		],
		[
			-8716,
			-5012
		],
		[
			-9136,
			-3740
		],
		[
			-8795,
			-7340
		],
		[
			-10068,
			-3199
		],
		[
			-5727,
			1347
		],
		[
			-3132,
			1936
		],
		[
			-13096,
			1622
		],
		[
			-5731,
			3312
		],
		[
			-2811,
			2918
		],
		[
			377,
			2302
		],
		[
			6241,
			2064
		],
		[
			166,
			976
		],
		[
			-14008,
			1752
		],
		[
			-10763,
			132
		],
		[
			-3873,
			2245
		],
		[
			2528,
			3203
		],
		[
			5129,
			1518
		],
		[
			15921,
			1405
		],
		[
			9507,
			-1497
		],
		[
			2471,
			2531
		],
		[
			-690,
			1776
		],
		[
			738,
			1510
		],
		[
			7561,
			4377
		],
		[
			-1011,
			1560
		],
		[
			-8405,
			55
		],
		[
			-2096,
			770
		],
		[
			5994,
			10614
		],
		[
			8272,
			1798
		],
		[
			6357,
			-2348
		],
		[
			2688,
			172
		],
		[
			-3531,
			3991
		],
		[
			-7665,
			2207
		],
		[
			42,
			2898
		],
		[
			5312,
			3283
		],
		[
			5109,
			910
		],
		[
			12854,
			-2253
		],
		[
			-4956,
			3487
		],
		[
			-8666,
			2522
		],
		[
			-152,
			1880
		],
		[
			2590,
			2905
		],
		[
			1002,
			3365
		],
		[
			2372,
			2695
		],
		[
			-3377,
			1429
		],
		[
			-6174,
			629
		],
		[
			-487,
			1811
		],
		[
			4438,
			3154
		],
		[
			6236,
			525
		],
		[
			10137,
			2406
		],
		[
			3474,
			2200
		],
		[
			1041,
			2171
		],
		[
			-2358,
			-411
		],
		[
			-8927,
			-4505
		],
		[
			-4440,
			833
		],
		[
			454,
			2236
		],
		[
			-899,
			939
		],
		[
			-12534,
			-4600
		],
		[
			-4449,
			44
		],
		[
			-2712,
			1858
		],
		[
			-124,
			5740
		],
		[
			-3391,
			2207
		],
		[
			-1042,
			4287
		],
		[
			187,
			667
		],
		[
			1321,
			4350
		],
		[
			2876,
			2448
		],
		[
			10452,
			-2385
		],
		[
			5082,
			-2154
		],
		[
			10280,
			596
		],
		[
			1675,
			754
		],
		[
			-2288,
			1207
		],
		[
			-10705,
			750
		],
		[
			-12089,
			8301
		],
		[
			-240,
			2302
		],
		[
			2205,
			2495
		],
		[
			7691,
			1920
		],
		[
			-1551,
			1610
		],
		[
			-7886,
			3131
		],
		[
			-268,
			8293
		],
		[
			685,
			1132
		],
		[
			3710,
			1243
		],
		[
			4239,
			-393
		],
		[
			5330,
			-5712
		],
		[
			3826,
			-1726
		],
		[
			1847,
			1140
		],
		[
			529,
			1608
		],
		[
			-607,
			1125
		],
		[
			-2868,
			1197
		],
		[
			516,
			1584
		],
		[
			-1332,
			3516
		],
		[
			2153,
			2273
		],
		[
			4243,
			-201
		],
		[
			4481,
			-3216
		],
		[
			4277,
			-1273
		],
		[
			2438,
			335
		],
		[
			2984,
			2228
		],
		[
			2549,
			747
		],
		[
			9373,
			-1793
		],
		[
			-5894,
			3968
		],
		[
			2104,
			887
		],
		[
			13967,
			-2468
		],
		[
			8595,
			-3046
		],
		[
			-515,
			1015
		],
		[
			-5928,
			3333
		],
		[
			-2150,
			2929
		],
		[
			-19883,
			9594
		],
		[
			-3195,
			4050
		],
		[
			2261,
			1318
		],
		[
			7306,
			-2213
		],
		[
			4555,
			917
		],
		[
			1349,
			1472
		],
		[
			153,
			5413
		],
		[
			-9125,
			7445
		],
		[
			-281,
			2190
		],
		[
			7238,
			-936
		],
		[
			5127,
			2000
		],
		[
			7305,
			-603
		],
		[
			7191,
			1543
		],
		[
			-5189,
			6712
		],
		[
			-1704,
			4348
		],
		[
			4362,
			2367
		],
		[
			4533,
			612
		],
		[
			-647,
			2194
		],
		[
			943,
			3111
		],
		[
			-1928,
			2654
		],
		[
			-231,
			2185
		],
		[
			1702,
			2004
		],
		[
			5272,
			3393
		],
		[
			4795,
			5451
		],
		[
			13468,
			-1401
		],
		[
			5251,
			-4371
		],
		[
			4255,
			2590
		],
		[
			8299,
			-3215
		],
		[
			615,
			-2719
		],
		[
			-5518,
			-5035
		],
		[
			0,
			-1354
		],
		[
			5456,
			2459
		],
		[
			6038,
			4515
		],
		[
			2859,
			3622
		],
		[
			2680,
			862
		],
		[
			5882,
			-422
		],
		[
			6199,
			-2750
		],
		[
			916,
			-2136
		],
		[
			-1872,
			-3095
		],
		[
			391,
			-1365
		],
		[
			11002,
			6089
		],
		[
			3730,
			409
		],
		[
			6175,
			-897
		],
		[
			8793,
			2523
		],
		[
			6791,
			272
		],
		[
			4864,
			2189
		],
		[
			4698,
			-1424
		],
		[
			9669,
			-638
		],
		[
			10746,
			735
		],
		[
			14306,
			4748
		],
		[
			7169,
			212
		],
		[
			2500,
			-897
		],
		[
			1892,
			-845
		],
		[
			6422,
			587
		],
		[
			7290,
			-709
		],
		[
			1046,
			973
		],
		[
			548,
			511
		],
		[
			-3231,
			3388
		],
		[
			2059,
			1354
		],
		[
			6755,
			-1624
		],
		[
			10741,
			698
		],
		[
			5387,
			-1306
		],
		[
			10878,
			-711
		],
		[
			-308,
			-2310
		],
		[
			-8058,
			-10139
		],
		[
			1490,
			-2599
		],
		[
			4372,
			-1589
		],
		[
			-24,
			-2451
		],
		[
			-4803,
			-6693
		],
		[
			-6341,
			-4295
		],
		[
			-20404,
			-6805
		],
		[
			-14827,
			-10061
		],
		[
			-884,
			-362
		],
		[
			-25205,
			-10320
		],
		[
			-7995,
			-5456
		],
		[
			-9460,
			-3356
		],
		[
			-2590,
			-2432
		],
		[
			-1717,
			-4658
		],
		[
			-3058,
			-3149
		],
		[
			-7451,
			-963
		],
		[
			-10169,
			1134
		],
		[
			-6805,
			-353
		],
		[
			22261,
			-4230
		],
		[
			9775,
			1286
		],
		[
			7443,
			-1014
		],
		[
			6967,
			2288
		],
		[
			1628,
			-373
		],
		[
			-2955,
			-3522
		],
		[
			-14808,
			-10424
		],
		[
			-2783,
			-56
		],
		[
			-2340,
			1781
		],
		[
			-2421,
			425
		],
		[
			-10086,
			-3188
		],
		[
			-7828,
			-991
		],
		[
			-8506,
			-2829
		],
		[
			-4394,
			-3347
		],
		[
			14497,
			4306
		],
		[
			8241,
			-325
		],
		[
			8001,
			1053
		],
		[
			2127,
			-808
		],
		[
			-7761,
			-7878
		],
		[
			-8056,
			-3922
		],
		[
			-4038,
			-3220
		],
		[
			-15673,
			-1248
		],
		[
			-4260,
			-925
		]
	],
	[
		[
			5717523,
			7644356
		],
		[
			733,
			-1971
		],
		[
			-975,
			-5237
		],
		[
			5629,
			-2346
		],
		[
			4437,
			-4897
		],
		[
			4208,
			-2313
		],
		[
			2955,
			-3068
		],
		[
			655,
			-2980
		],
		[
			2766,
			-390
		],
		[
			-913,
			2408
		],
		[
			2129,
			582
		],
		[
			4320,
			-1772
		],
		[
			2377,
			-3673
		],
		[
			-149,
			-3002
		],
		[
			-1374,
			-1816
		],
		[
			-378,
			-425
		],
		[
			-15601,
			-5883
		],
		[
			-2578,
			-1546
		],
		[
			-1881,
			-2527
		],
		[
			5759,
			-1427
		],
		[
			5182,
			2497
		],
		[
			5880,
			1565
		],
		[
			6940,
			-804
		],
		[
			4872,
			1092
		],
		[
			3930,
			-251
		],
		[
			4646,
			-2538
		],
		[
			2045,
			-4841
		],
		[
			3674,
			-3297
		],
		[
			1720,
			-6002
		],
		[
			2828,
			-2448
		],
		[
			-509,
			-2830
		],
		[
			-3083,
			-2688
		],
		[
			945,
			-3887
		],
		[
			-2030,
			-1438
		],
		[
			-1969,
			-3633
		],
		[
			-2329,
			1028
		],
		[
			-4700,
			5524
		],
		[
			410,
			1590
		],
		[
			3474,
			3177
		],
		[
			-579,
			4046
		],
		[
			-1704,
			3139
		],
		[
			-12202,
			5456
		],
		[
			-2226,
			-3956
		],
		[
			3983,
			-2112
		],
		[
			-542,
			-1652
		],
		[
			1829,
			-1426
		],
		[
			445,
			-2785
		],
		[
			870,
			-2123
		],
		[
			-489,
			-2602
		],
		[
			-2579,
			-3950
		],
		[
			2363,
			-419
		],
		[
			6327,
			1160
		],
		[
			2224,
			-994
		],
		[
			1254,
			-3367
		],
		[
			619,
			-1663
		],
		[
			-402,
			-2831
		],
		[
			-1843,
			64
		],
		[
			-4485,
			-3517
		],
		[
			-2991,
			-388
		],
		[
			-1824,
			-1856
		],
		[
			-3345,
			1349
		],
		[
			-4641,
			372
		],
		[
			-8587,
			-705
		],
		[
			-3601,
			-1567
		],
		[
			-2683,
			-2204
		],
		[
			899,
			-4153
		],
		[
			-2143,
			-5469
		],
		[
			-5007,
			-2935
		],
		[
			-1903,
			-1115
		],
		[
			-5342,
			-2894
		],
		[
			-4632,
			-1309
		],
		[
			-3028,
			1112
		],
		[
			1043,
			1186
		],
		[
			-1104,
			944
		],
		[
			-7230,
			961
		],
		[
			-1354,
			1115
		],
		[
			-2057,
			1693
		],
		[
			-6527,
			436
		]
	],
	[
		[
			5589569,
			7645399
		],
		[
			794,
			-2015
		],
		[
			2436,
			1124
		],
		[
			4370,
			221
		],
		[
			2900,
			-384
		],
		[
			200,
			-1311
		],
		[
			10147,
			878
		],
		[
			2920,
			2264
		],
		[
			-10,
			2425
		],
		[
			2444,
			1091
		],
		[
			2987,
			5187
		],
		[
			502,
			3124
		],
		[
			7783,
			-2368
		],
		[
			14336,
			137
		],
		[
			2456,
			2089
		],
		[
			17476,
			2855
		],
		[
			1371,
			1420
		],
		[
			4503,
			1663
		],
		[
			2323,
			-561
		],
		[
			4950,
			-1196
		],
		[
			3668,
			1078
		],
		[
			3469,
			-519
		],
		[
			10023,
			-3354
		],
		[
			9625,
			1880
		],
		[
			7179,
			-2775
		],
		[
			3908,
			-3473
		],
		[
			-821,
			-5525
		],
		[
			-1905,
			-3771
		],
		[
			1292,
			-1320
		],
		[
			2266,
			150
		],
		[
			2671,
			224
		],
		[
			1691,
			-281
		]
	],
	[
		[
			5683190,
			7959195
		],
		[
			-2130,
			-1025
		],
		[
			-3391,
			66
		],
		[
			-863,
			-5449
		],
		[
			-5776,
			-2551
		],
		[
			4840,
			-2208
		],
		[
			1206,
			-2150
		],
		[
			580,
			-4452
		],
		[
			-2610,
			-1975
		],
		[
			-5539,
			-266
		],
		[
			-2300,
			-409
		],
		[
			1894,
			-2259
		],
		[
			-1396,
			-2847
		],
		[
			-8802,
			-2798
		],
		[
			-5122,
			1858
		],
		[
			-1394,
			-1498
		],
		[
			-2193,
			166
		],
		[
			-4749,
			4055
		],
		[
			-1797,
			3368
		],
		[
			-1772,
			-354
		],
		[
			-444,
			-740
		],
		[
			1379,
			-2651
		],
		[
			3385,
			-3357
		],
		[
			2255,
			-6872
		],
		[
			-1985,
			-130
		],
		[
			-4345,
			2338
		],
		[
			-1684,
			-1316
		],
		[
			-677,
			1551
		],
		[
			-2990,
			203
		],
		[
			-637,
			-1436
		],
		[
			2971,
			-2343
		],
		[
			363,
			-1836
		],
		[
			-4614,
			-1774
		],
		[
			-4011,
			-69
		],
		[
			-4446,
			-3564
		],
		[
			-7871,
			-3472
		],
		[
			-13109,
			6616
		],
		[
			-1334,
			1706
		],
		[
			5531,
			11
		],
		[
			6645,
			3526
		],
		[
			4448,
			1023
		],
		[
			1109,
			2857
		],
		[
			6488,
			1913
		],
		[
			-2722,
			1768
		],
		[
			-14837,
			2465
		],
		[
			-4572,
			2584
		],
		[
			253,
			1456
		],
		[
			5136,
			3149
		],
		[
			-1884,
			3094
		],
		[
			-4051,
			1227
		],
		[
			-2433,
			4739
		],
		[
			2294,
			4978
		],
		[
			4575,
			1367
		],
		[
			165,
			2200
		],
		[
			1264,
			1891
		],
		[
			8713,
			-283
		],
		[
			2148,
			-1158
		],
		[
			1048,
			-2135
		],
		[
			4106,
			-791
		],
		[
			2055,
			1636
		],
		[
			-2391,
			4283
		],
		[
			1410,
			1816
		],
		[
			6691,
			-3697
		],
		[
			2331,
			-2617
		],
		[
			2920,
			-818
		],
		[
			-730,
			1936
		],
		[
			-2193,
			468
		],
		[
			257,
			1334
		],
		[
			-3265,
			3154
		],
		[
			-709,
			2323
		],
		[
			982,
			1275
		],
		[
			13721,
			5211
		],
		[
			4981,
			145
		],
		[
			5713,
			1550
		],
		[
			4704,
			3232
		],
		[
			5524,
			2268
		],
		[
			14770,
			5967
		],
		[
			4631,
			3041
		],
		[
			1850,
			-403
		],
		[
			5065,
			-3684
		],
		[
			1645,
			-4799
		],
		[
			-2998,
			-4897
		],
		[
			1609,
			-3344
		],
		[
			-12485,
			-7680
		],
		[
			-1273,
			-2637
		],
		[
			869,
			-3070
		]
	],
	[
		[
			5700407,
			7889056
		],
		[
			394,
			-4717
		],
		[
			-2942,
			-4878
		],
		[
			3357,
			-1461
		],
		[
			3078,
			-7809
		],
		[
			4519,
			-1128
		],
		[
			1394,
			-2460
		],
		[
			3354,
			-155
		],
		[
			1350,
			806
		],
		[
			-1230,
			1840
		],
		[
			225,
			1127
		],
		[
			4209,
			609
		],
		[
			4434,
			-2255
		],
		[
			-2227,
			-3198
		],
		[
			5087,
			-1943
		],
		[
			15533,
			2355
		],
		[
			7243,
			-1122
		],
		[
			844,
			-897
		],
		[
			-417,
			-1647
		],
		[
			-2782,
			-3435
		],
		[
			-9745,
			-3172
		],
		[
			-222,
			-2218
		],
		[
			-1743,
			-1996
		],
		[
			-4879,
			-2618
		],
		[
			-5866,
			-4722
		],
		[
			-8603,
			-2228
		],
		[
			-1892,
			2255
		],
		[
			331,
			1557
		],
		[
			2550,
			4521
		],
		[
			6418,
			4846
		],
		[
			61,
			798
		],
		[
			-4889,
			529
		],
		[
			-4488,
			2630
		],
		[
			-6754,
			-5996
		],
		[
			-1238,
			653
		],
		[
			-1596,
			2910
		],
		[
			-2415,
			1011
		],
		[
			-14822,
			-1991
		],
		[
			-1679,
			2198
		],
		[
			-5289,
			1303
		],
		[
			-1326,
			3165
		],
		[
			-5456,
			1858
		],
		[
			-2781,
			2775
		],
		[
			-693,
			691
		],
		[
			269,
			2177
		],
		[
			424,
			310
		],
		[
			1095,
			802
		],
		[
			5851,
			575
		],
		[
			-1226,
			1627
		],
		[
			-5204,
			1075
		],
		[
			-516,
			376
		],
		[
			-3640,
			2650
		],
		[
			-4448,
			196
		],
		[
			-1436,
			-269
		],
		[
			-2145,
			-3348
		],
		[
			-2639,
			-374
		],
		[
			-9677,
			2680
		],
		[
			-7077,
			5207
		],
		[
			-613,
			1459
		],
		[
			846,
			1437
		],
		[
			2164,
			856
		],
		[
			337,
			2787
		],
		[
			1868,
			1356
		],
		[
			7918,
			-5254
		],
		[
			3214,
			-274
		],
		[
			-1104,
			4223
		],
		[
			3486,
			1965
		],
		[
			-5239,
			4250
		],
		[
			1694,
			4502
		],
		[
			3407,
			-1291
		],
		[
			4200,
			-3857
		],
		[
			8884,
			-3974
		],
		[
			0,
			-260
		],
		[
			582,
			0
		],
		[
			1185,
			-530
		],
		[
			1769,
			530
		],
		[
			3252,
			973
		],
		[
			2082,
			-973
		],
		[
			3316,
			-1551
		],
		[
			-69,
			1118
		],
		[
			-418,
			433
		],
		[
			-4399,
			4557
		],
		[
			467,
			3435
		],
		[
			-2992,
			5444
		],
		[
			4759,
			3576
		],
		[
			1820,
			2374
		],
		[
			1633,
			451
		],
		[
			6254,
			-2568
		],
		[
			3701,
			-3369
		],
		[
			4595,
			-2390
		],
		[
			2644,
			-2885
		],
		[
			719,
			-8625
		]
	],
	[
		[
			6184532,
			8199801
		],
		[
			-1734,
			-2900
		],
		[
			556,
			-3014
		],
		[
			-3072,
			-1923
		],
		[
			1386,
			-2093
		],
		[
			-663,
			-2589
		],
		[
			1277,
			-2889
		],
		[
			-2703,
			-2645
		],
		[
			-1194,
			-2664
		],
		[
			2020,
			369
		],
		[
			2182,
			2679
		],
		[
			4910,
			1140
		],
		[
			-1591,
			2024
		],
		[
			863,
			1301
		],
		[
			4492,
			1059
		],
		[
			2493,
			-672
		],
		[
			3893,
			-4058
		],
		[
			-358,
			-1605
		],
		[
			-2506,
			-138
		],
		[
			-1174,
			-1069
		],
		[
			3814,
			-568
		],
		[
			1613,
			-1544
		],
		[
			2467,
			1055
		],
		[
			1735,
			1878
		],
		[
			1843,
			64
		],
		[
			3112,
			2004
		],
		[
			1426,
			-180
		],
		[
			-1148,
			-1521
		],
		[
			-6667,
			-3926
		],
		[
			770,
			-890
		],
		[
			2122,
			1260
		],
		[
			2139,
			-373
		],
		[
			-176,
			-2819
		],
		[
			-9257,
			-998
		],
		[
			806,
			-1755
		],
		[
			7482,
			-1052
		],
		[
			642,
			-936
		],
		[
			-5720,
			-2922
		],
		[
			531,
			-813
		],
		[
			3092,
			-235
		],
		[
			347,
			-939
		],
		[
			-6092,
			-1888
		],
		[
			-1131,
			1587
		],
		[
			-2060,
			372
		],
		[
			-1413,
			-2795
		],
		[
			1397,
			-734
		],
		[
			153,
			-1424
		],
		[
			1556,
			-134
		],
		[
			-435,
			-1909
		],
		[
			2697,
			-152
		],
		[
			177,
			-2453
		],
		[
			1137,
			-1248
		],
		[
			-1174,
			-1832
		],
		[
			-4107,
			-1114
		],
		[
			-1587,
			-3837
		],
		[
			347,
			-1766
		],
		[
			2372,
			-2951
		],
		[
			-3826,
			-690
		],
		[
			-20,
			-1440
		],
		[
			2127,
			-2424
		],
		[
			-191,
			-1607
		],
		[
			-1581,
			1339
		],
		[
			-4887,
			-329
		],
		[
			1270,
			-1430
		],
		[
			90,
			-1494
		],
		[
			-483,
			-2148
		],
		[
			-2011,
			-1816
		],
		[
			985,
			-1245
		],
		[
			-913,
			-2623
		],
		[
			1059,
			-1113
		],
		[
			-464,
			-1148
		],
		[
			-2229,
			1346
		],
		[
			-1367,
			-742
		],
		[
			92,
			1938
		],
		[
			-1182,
			1334
		],
		[
			-5232,
			-524
		],
		[
			-1248,
			1586
		],
		[
			1924,
			1473
		],
		[
			884,
			2983
		],
		[
			2262,
			-291
		],
		[
			433,
			2749
		],
		[
			-971,
			2178
		],
		[
			2120,
			2008
		],
		[
			4786,
			10299
		],
		[
			-506,
			1043
		],
		[
			-2472,
			-5058
		],
		[
			-2495,
			-2736
		],
		[
			-464,
			233
		],
		[
			306,
			1580
		],
		[
			-1781,
			-847
		],
		[
			-614,
			1366
		],
		[
			1243,
			967
		],
		[
			682,
			1822
		],
		[
			2872,
			431
		],
		[
			753,
			1597
		],
		[
			490,
			5245
		],
		[
			-2531,
			-32
		],
		[
			822,
			4817
		],
		[
			-3585,
			-1097
		],
		[
			-2008,
			2670
		],
		[
			-1730,
			250
		],
		[
			1603,
			-4058
		],
		[
			-2717,
			86
		],
		[
			-1890,
			-2758
		],
		[
			-2875,
			3
		],
		[
			-2237,
			-2036
		],
		[
			-7342,
			3287
		],
		[
			574,
			1418
		],
		[
			3103,
			1138
		],
		[
			-1293,
			1824
		],
		[
			-3531,
			-2327
		],
		[
			-3273,
			965
		],
		[
			-4003,
			-670
		],
		[
			-5769,
			2368
		],
		[
			-1301,
			2122
		],
		[
			351,
			3590
		],
		[
			2123,
			987
		],
		[
			5307,
			302
		],
		[
			4448,
			-1104
		],
		[
			2019,
			389
		],
		[
			953,
			1326
		],
		[
			2794,
			358
		],
		[
			2991,
			-1890
		],
		[
			1692,
			1337
		],
		[
			-1280,
			1404
		],
		[
			541,
			1215
		],
		[
			7459,
			-2209
		],
		[
			2640,
			-1963
		],
		[
			899,
			337
		],
		[
			-11,
			3726
		],
		[
			5108,
			2542
		],
		[
			-79,
			508
		],
		[
			-3310,
			510
		],
		[
			-1236,
			1858
		],
		[
			-1518,
			-652
		],
		[
			-1999,
			-2844
		],
		[
			-2584,
			-596
		],
		[
			-3641,
			840
		],
		[
			-970,
			1481
		],
		[
			2030,
			1472
		],
		[
			4518,
			80
		],
		[
			-1439,
			2464
		],
		[
			-3177,
			1161
		],
		[
			-46,
			2202
		],
		[
			-1768,
			3429
		],
		[
			-2989,
			-1663
		],
		[
			-1961,
			1786
		],
		[
			-8863,
			-248
		],
		[
			-1739,
			1126
		],
		[
			1361,
			1339
		],
		[
			3190,
			580
		],
		[
			1469,
			2920
		],
		[
			1931,
			1103
		],
		[
			5814,
			-2603
		],
		[
			357,
			354
		],
		[
			-705,
			1615
		],
		[
			4309,
			3318
		],
		[
			2416,
			3651
		],
		[
			6958,
			-444
		],
		[
			1200,
			1459
		],
		[
			1641,
			409
		],
		[
			1451,
			-1569
		]
	],
	[
		[
			5736164,
			7789505
		],
		[
			3000,
			-1898
		],
		[
			4067,
			-639
		],
		[
			4114,
			-2848
		],
		[
			2270,
			-377
		],
		[
			572,
			-1136
		],
		[
			-1725,
			-1335
		],
		[
			552,
			-1783
		],
		[
			-4245,
			-4240
		],
		[
			-8605,
			-3933
		],
		[
			-4878,
			-1317
		],
		[
			-2821,
			216
		],
		[
			-857,
			1039
		],
		[
			2022,
			2199
		],
		[
			-2038,
			610
		],
		[
			-6028,
			-3005
		],
		[
			-5137,
			-458
		],
		[
			-5940,
			-2416
		],
		[
			-3506,
			428
		],
		[
			-6345,
			-1185
		],
		[
			-9329,
			-201
		],
		[
			-3815,
			-1620
		],
		[
			-3915,
			270
		],
		[
			-5500,
			2388
		],
		[
			617,
			3446
		],
		[
			2047,
			1493
		],
		[
			4786,
			-329
		],
		[
			4797,
			-2179
		],
		[
			817,
			2020
		],
		[
			9342,
			-107
		],
		[
			12117,
			2582
		],
		[
			1430,
			1265
		],
		[
			-1558,
			1495
		],
		[
			-8150,
			-2516
		],
		[
			-8917,
			-422
		],
		[
			-836,
			1171
		],
		[
			494,
			1204
		],
		[
			4765,
			2725
		],
		[
			2591,
			3262
		],
		[
			6845,
			498
		],
		[
			4143,
			1898
		],
		[
			1497,
			1912
		],
		[
			-1526,
			634
		],
		[
			-10731,
			-1959
		],
		[
			-3120,
			2457
		],
		[
			-6052,
			2225
		],
		[
			-6958,
			237
		],
		[
			-4271,
			1323
		],
		[
			-233,
			1263
		],
		[
			3537,
			2245
		],
		[
			-1632,
			1084
		],
		[
			-56,
			1748
		],
		[
			8192,
			522
		],
		[
			1424,
			2327
		],
		[
			9026,
			1981
		],
		[
			8979,
			-3296
		],
		[
			8385,
			-9363
		],
		[
			16296,
			-1605
		]
	],
	[
		[
			5894404,
			7469949
		],
		[
			65,
			-1520
		],
		[
			5741,
			777
		],
		[
			3364,
			1352
		],
		[
			7096,
			-858
		],
		[
			-4818,
			-4915
		],
		[
			-10946,
			-4741
		],
		[
			-1977,
			-2749
		],
		[
			-7528,
			-3602
		],
		[
			-3779,
			-407
		],
		[
			-2185,
			-1204
		],
		[
			-4722,
			1188
		],
		[
			-1814,
			1718
		],
		[
			-1977,
			-317
		],
		[
			-2057,
			1989
		],
		[
			-3820,
			838
		],
		[
			-90,
			2316
		],
		[
			-1841,
			1275
		],
		[
			-3239,
			2249
		],
		[
			-5317,
			-111
		],
		[
			-1643,
			3257
		],
		[
			-5731,
			558
		],
		[
			-1215,
			2409
		],
		[
			1410,
			1340
		],
		[
			2873,
			44
		],
		[
			6919,
			-3022
		],
		[
			1242,
			194
		],
		[
			310,
			2194
		],
		[
			-1523,
			1597
		],
		[
			2171,
			4128
		],
		[
			-1406,
			2823
		],
		[
			5149,
			1253
		],
		[
			6376,
			330
		],
		[
			3313,
			1195
		],
		[
			13291,
			-1447
		],
		[
			1595,
			-1636
		],
		[
			-145,
			-2242
		],
		[
			1565,
			-1351
		],
		[
			2682,
			-570
		],
		[
			2611,
			-4332
		]
	],
	[
		[
			5704804,
			7722792
		],
		[
			1349,
			-4739
		],
		[
			3978,
			-3115
		],
		[
			2474,
			-8037
		],
		[
			-4505,
			-2327
		],
		[
			-533,
			-821
		],
		[
			-396,
			-610
		],
		[
			-6170,
			-1551
		],
		[
			573,
			-1093
		],
		[
			-417,
			-1216
		],
		[
			-1442,
			1158
		],
		[
			649,
			1072
		],
		[
			-6006,
			213
		],
		[
			-3168,
			-3519
		],
		[
			-4257,
			-1503
		],
		[
			-5246,
			1654
		],
		[
			1302,
			3500
		],
		[
			1895,
			1589
		],
		[
			1512,
			306
		],
		[
			2059,
			417
		],
		[
			177,
			1623
		],
		[
			-2887,
			3557
		],
		[
			-3990,
			951
		],
		[
			-513,
			799
		],
		[
			1134,
			1811
		],
		[
			6621,
			2460
		],
		[
			589,
			782
		],
		[
			-773,
			627
		],
		[
			-7939,
			237
		],
		[
			-3750,
			-4640
		],
		[
			-4764,
			-3777
		],
		[
			-2853,
			-1243
		],
		[
			-2837,
			-1236
		],
		[
			-3392,
			1346
		],
		[
			2032,
			2294
		],
		[
			161,
			2218
		],
		[
			3773,
			3956
		],
		[
			-209,
			1019
		],
		[
			-1919,
			1186
		],
		[
			2061,
			1758
		],
		[
			330,
			1606
		],
		[
			264,
			1288
		],
		[
			809,
			1371
		],
		[
			4198,
			152
		],
		[
			4503,
			1934
		],
		[
			2658,
			1075
		],
		[
			462,
			-327
		],
		[
			-136,
			-748
		],
		[
			-1596,
			-4039
		],
		[
			748,
			-890
		],
		[
			1333,
			19
		],
		[
			-322,
			786
		],
		[
			536,
			667
		],
		[
			1230,
			3187
		],
		[
			1391,
			270
		],
		[
			9979,
			4803
		],
		[
			5791,
			1134
		],
		[
			1342,
			-673
		],
		[
			-307,
			-3455
		],
		[
			701,
			-1809
		],
		[
			1713,
			-3457
		]
	],
	[
		[
			6014679,
			8045146
		],
		[
			-1001,
			-2037
		],
		[
			-3773,
			244
		],
		[
			-1075,
			-1939
		],
		[
			-2961,
			-994
		],
		[
			-1027,
			-1204
		],
		[
			4243,
			-917
		],
		[
			2374,
			1248
		],
		[
			2824,
			68
		],
		[
			4895,
			-2262
		],
		[
			2238,
			2214
		],
		[
			2148,
			-57
		],
		[
			557,
			-732
		],
		[
			-549,
			-3376
		],
		[
			1843,
			-404
		],
		[
			467,
			0
		],
		[
			3898,
			2058
		],
		[
			4944,
			524
		],
		[
			940,
			-751
		],
		[
			-322,
			-1293
		],
		[
			-2752,
			-538
		],
		[
			-2003,
			-391
		],
		[
			1622,
			-1578
		],
		[
			61,
			-1657
		],
		[
			2280,
			12
		],
		[
			1587,
			-1280
		],
		[
			-3853,
			-3770
		],
		[
			-4859,
			2154
		],
		[
			-606,
			-44
		],
		[
			-557,
			-1608
		],
		[
			-1855,
			336
		],
		[
			486,
			1132
		],
		[
			-2685,
			-196
		],
		[
			-3946,
			4452
		],
		[
			43,
			2047
		],
		[
			-983,
			308
		],
		[
			-4093,
			-1936
		],
		[
			-5893,
			-373
		],
		[
			-5166,
			-2085
		],
		[
			-7704,
			-145
		],
		[
			-2181,
			1793
		],
		[
			-326,
			2829
		],
		[
			-1757,
			1400
		],
		[
			-1931,
			-1267
		],
		[
			-1123,
			-133
		],
		[
			-1421,
			-74
		],
		[
			-655,
			-1059
		],
		[
			-2344,
			243
		],
		[
			-1933,
			890
		],
		[
			-763,
			352
		],
		[
			-1354,
			2964
		],
		[
			1092,
			4956
		],
		[
			1544,
			887
		],
		[
			-1372,
			5066
		],
		[
			3687,
			3107
		],
		[
			11076,
			1630
		],
		[
			7465,
			-2349
		],
		[
			7326,
			-1840
		],
		[
			486,
			-1498
		],
		[
			3900,
			-1864
		],
		[
			797,
			-1263
		]
	],
	[
		[
			5803767,
			7682900
		],
		[
			-6807,
			-679
		],
		[
			-6079,
			321
		],
		[
			-3535,
			1218
		],
		[
			-777,
			201
		],
		[
			-2751,
			1274
		],
		[
			-1223,
			1713
		],
		[
			-89,
			1467
		],
		[
			-2815,
			1001
		],
		[
			447,
			1198
		],
		[
			-362,
			1072
		],
		[
			1115,
			1430
		],
		[
			-627,
			2645
		],
		[
			-2262,
			1532
		],
		[
			-2383,
			2609
		],
		[
			-136,
			630
		],
		[
			224,
			951
		],
		[
			865,
			808
		],
		[
			383,
			1462
		],
		[
			1103,
			2105
		],
		[
			799,
			701
		],
		[
			3191,
			1041
		],
		[
			1559,
			1617
		],
		[
			2083,
			113
		],
		[
			269,
			832
		],
		[
			1214,
			481
		],
		[
			7358,
			-1596
		],
		[
			4905,
			-3253
		],
		[
			996,
			-2041
		],
		[
			1672,
			-3869
		],
		[
			-1976,
			-2826
		],
		[
			3639,
			-1139
		],
		[
			516,
			-162
		],
		[
			1895,
			-1489
		],
		[
			-2411,
			-1743
		],
		[
			-1167,
			-843
		],
		[
			1167,
			-576
		],
		[
			3001,
			-1485
		],
		[
			-822,
			-2078
		],
		[
			1029,
			-2487
		],
		[
			-2500,
			-2085
		],
		[
			-708,
			-71
		]
	],
	[
		[
			5598614,
			7905618
		],
		[
			-2714,
			-2703
		],
		[
			81,
			-1727
		],
		[
			4524,
			-3107
		],
		[
			3113,
			-995
		],
		[
			-3558,
			-6597
		],
		[
			-6313,
			-1623
		],
		[
			655,
			-985
		],
		[
			3775,
			668
		],
		[
			668,
			-927
		],
		[
			-1523,
			-1275
		],
		[
			-4017,
			85
		],
		[
			-841,
			-2211
		],
		[
			-1819,
			-1221
		],
		[
			3339,
			-1227
		],
		[
			1563,
			-1893
		],
		[
			-156,
			-1627
		],
		[
			-1955,
			-386
		],
		[
			-1132,
			1479
		],
		[
			-1893,
			-1013
		],
		[
			-3099,
			1318
		],
		[
			-3981,
			-436
		],
		[
			-6570,
			2057
		],
		[
			-1930,
			2214
		],
		[
			508,
			2218
		],
		[
			4026,
			1812
		],
		[
			9252,
			-1526
		],
		[
			667,
			470
		],
		[
			-698,
			1360
		],
		[
			639,
			1431
		],
		[
			-5239,
			848
		],
		[
			-4514,
			3898
		],
		[
			-6173,
			2421
		],
		[
			-5907,
			-413
		],
		[
			-4850,
			2610
		],
		[
			292,
			1169
		],
		[
			4727,
			4740
		],
		[
			3904,
			-76
		],
		[
			4996,
			-1702
		],
		[
			5918,
			3911
		],
		[
			639,
			-1881
		],
		[
			1705,
			-467
		],
		[
			1316,
			1435
		],
		[
			779,
			-80
		],
		[
			233,
			-1991
		],
		[
			2941,
			2181
		],
		[
			5706,
			1850
		],
		[
			2916,
			-2086
		]
	],
	[
		[
			5718997,
			7719147
		],
		[
			-6245,
			-631
		],
		[
			-5174,
			2258
		],
		[
			-1624,
			5729
		],
		[
			1040,
			2222
		],
		[
			3860,
			3464
		],
		[
			7914,
			2299
		],
		[
			-2854,
			2483
		],
		[
			1135,
			1723
		],
		[
			3320,
			3650
		],
		[
			20687,
			10017
		],
		[
			2515,
			890
		],
		[
			1608,
			-451
		],
		[
			809,
			-1457
		],
		[
			-520,
			-2155
		],
		[
			-10400,
			-10494
		],
		[
			-3095,
			-3242
		],
		[
			-4486,
			-7130
		],
		[
			-5903,
			-3846
		],
		[
			-2587,
			-5329
		]
	],
	[
		[
			6185204,
			7215287
		],
		[
			799,
			-877
		],
		[
			419,
			575
		],
		[
			1831,
			148
		],
		[
			2967,
			-2060
		],
		[
			2382,
			-557
		],
		[
			-106,
			-289
		],
		[
			5646,
			-218
		],
		[
			2085,
			-611
		],
		[
			2973,
			-557
		],
		[
			1122,
			-1591
		],
		[
			69,
			-978
		],
		[
			1495,
			-152
		],
		[
			1241,
			-992
		],
		[
			-2432,
			-1275
		],
		[
			-316,
			-576
		],
		[
			-3573,
			-391
		],
		[
			-1842,
			-744
		],
		[
			-1589,
			-1270
		],
		[
			-628,
			-1665
		],
		[
			-99,
			-1815
		],
		[
			-929,
			-903
		],
		[
			-6599,
			-1691
		],
		[
			-4428,
			-576
		],
		[
			-1257,
			270
		],
		[
			-1003,
			1085
		],
		[
			-2196,
			1316
		],
		[
			-2271,
			810
		],
		[
			-2696,
			1651
		],
		[
			-2117,
			755
		],
		[
			-3607,
			866
		],
		[
			-1789,
			879
		],
		[
			-2262,
			1527
		],
		[
			-2356,
			270
		],
		[
			-5815,
			-804
		],
		[
			-305,
			231
		],
		[
			429,
			1016
		],
		[
			1932,
			539
		],
		[
			1295,
			1394
		],
		[
			153,
			775
		],
		[
			1286,
			609
		],
		[
			3447,
			-28
		],
		[
			1642,
			309
		],
		[
			2893,
			1237
		],
		[
			1531,
			408
		],
		[
			1190,
			-188
		],
		[
			-74,
			-1016
		],
		[
			1003,
			468
		],
		[
			1081,
			-223
		],
		[
			-217,
			1244
		],
		[
			4177,
			977
		],
		[
			1032,
			1239
		],
		[
			2304,
			1375
		],
		[
			2082,
			74
		]
	],
	[
		[
			5592743,
			7850389
		],
		[
			-1431,
			-1439
		],
		[
			-12182,
			319
		],
		[
			-2044,
			977
		],
		[
			-1484,
			1442
		],
		[
			-3992,
			10435
		],
		[
			1502,
			5182
		],
		[
			2061,
			1625
		],
		[
			213,
			2582
		],
		[
			-2447,
			5623
		],
		[
			2725,
			1287
		],
		[
			5375,
			161
		],
		[
			6547,
			-2201
		],
		[
			3687,
			-3400
		],
		[
			-1507,
			-1555
		],
		[
			4799,
			-2396
		],
		[
			226,
			-1726
		],
		[
			-3481,
			-1736
		],
		[
			-2292,
			-3446
		],
		[
			-2273,
			-1372
		],
		[
			3177,
			-3056
		],
		[
			-137,
			-2467
		],
		[
			-5775,
			-1826
		],
		[
			42,
			-524
		],
		[
			6129,
			-899
		],
		[
			2562,
			-1590
		]
	],
	[
		[
			6215929,
			8204473
		],
		[
			-527,
			-2101
		],
		[
			-3413,
			715
		],
		[
			-1872,
			1155
		],
		[
			132,
			-1314
		],
		[
			2712,
			-1942
		],
		[
			-1869,
			-2449
		],
		[
			3530,
			-2192
		],
		[
			-1269,
			-2552
		],
		[
			-2573,
			-578
		],
		[
			1864,
			-1609
		],
		[
			-895,
			-3319
		],
		[
			-3388,
			-438
		],
		[
			-2488,
			618
		],
		[
			-1319,
			-1312
		],
		[
			-2048,
			293
		],
		[
			-3719,
			1152
		],
		[
			-1856,
			2549
		],
		[
			-95,
			3596
		],
		[
			-1413,
			803
		],
		[
			641,
			1473
		],
		[
			-774,
			1748
		],
		[
			1441,
			3436
		],
		[
			2259,
			1616
		],
		[
			1328,
			-2013
		],
		[
			489,
			94
		],
		[
			1699,
			8284
		],
		[
			529,
			1067
		],
		[
			1310,
			274
		],
		[
			9316,
			-275
		],
		[
			1557,
			-2244
		],
		[
			711,
			-4535
		]
	],
	[
		[
			5993607,
			8026639
		],
		[
			-479,
			-995
		],
		[
			359,
			-701
		],
		[
			1752,
			-742
		],
		[
			-361,
			-1658
		],
		[
			617,
			-8
		],
		[
			14,
			-1190
		],
		[
			1808,
			-76
		],
		[
			736,
			-478
		],
		[
			-2906,
			-967
		],
		[
			-582,
			-1053
		],
		[
			949,
			-168
		],
		[
			1704,
			347
		],
		[
			1458,
			-99
		],
		[
			1234,
			488
		],
		[
			1310,
			-311
		],
		[
			-778,
			-1940
		],
		[
			-4221,
			-653
		],
		[
			-1294,
			78
		],
		[
			-2240,
			776
		],
		[
			1579,
			1423
		],
		[
			-201,
			469
		],
		[
			-2843,
			-220
		],
		[
			-1042,
			-453
		],
		[
			-509,
			-921
		],
		[
			2976,
			-1026
		],
		[
			-804,
			-593
		],
		[
			-1951,
			830
		],
		[
			-3867,
			-418
		],
		[
			-3230,
			2221
		],
		[
			-2,
			645
		],
		[
			-1092,
			771
		],
		[
			378,
			449
		],
		[
			-3814,
			1942
		],
		[
			-926,
			2099
		],
		[
			225,
			586
		],
		[
			-1502,
			687
		],
		[
			-1327,
			-126
		],
		[
			-2885,
			208
		],
		[
			-236,
			452
		],
		[
			1140,
			1433
		],
		[
			759,
			2027
		],
		[
			1371,
			1135
		],
		[
			2411,
			174
		],
		[
			2508,
			791
		],
		[
			2742,
			-392
		],
		[
			13,
			-892
		],
		[
			1314,
			-296
		],
		[
			-262,
			-874
		],
		[
			3028,
			-224
		],
		[
			5378,
			-1762
		],
		[
			1591,
			-795
		]
	],
	[
		[
			6228053,
			8220384
		],
		[
			448,
			-223
		],
		[
			2663,
			2373
		],
		[
			4902,
			-726
		],
		[
			1397,
			-1145
		],
		[
			-1962,
			-1048
		],
		[
			1394,
			-1168
		],
		[
			-215,
			-1363
		],
		[
			-3785,
			64
		],
		[
			1422,
			-2333
		],
		[
			-2154,
			-228
		],
		[
			-43,
			-528
		],
		[
			1198,
			-328
		],
		[
			-58,
			-1269
		],
		[
			-4491,
			-3036
		],
		[
			206,
			-848
		],
		[
			2516,
			-709
		],
		[
			-591,
			-1005
		],
		[
			-1853,
			-412
		],
		[
			-5187,
			1026
		],
		[
			-3257,
			-1174
		],
		[
			-3091,
			1044
		],
		[
			601,
			1292
		],
		[
			-822,
			1800
		],
		[
			2103,
			183
		],
		[
			-451,
			1839
		],
		[
			1649,
			1224
		],
		[
			838,
			2517
		],
		[
			-876,
			2074
		],
		[
			6238,
			4757
		],
		[
			1399,
			-937
		],
		[
			-138,
			-1713
		]
	],
	[
		[
			5813912,
			7712654
		],
		[
			-455,
			-1027
		],
		[
			-2501,
			157
		],
		[
			-3158,
			3312
		],
		[
			-4031,
			1380
		],
		[
			-541,
			184
		],
		[
			-1856,
			3555
		],
		[
			107,
			2914
		],
		[
			-5669,
			3120
		],
		[
			-1979,
			2588
		],
		[
			3248,
			2083
		],
		[
			10043,
			-4671
		],
		[
			-542,
			-1276
		],
		[
			6207,
			-3079
		],
		[
			1733,
			-5595
		],
		[
			-1773,
			-1889
		],
		[
			1167,
			-1756
		]
	],
	[
		[
			5688804,
			7834932
		],
		[
			-5790,
			-2638
		],
		[
			-4416,
			1677
		],
		[
			-1426,
			1986
		],
		[
			-5382,
			2227
		],
		[
			-1820,
			1279
		],
		[
			6141,
			3716
		],
		[
			5687,
			1344
		],
		[
			7256,
			-2368
		],
		[
			688,
			-1033
		],
		[
			-800,
			-1212
		],
		[
			1633,
			-876
		],
		[
			36,
			-850
		],
		[
			-1807,
			-3252
		]
	],
	[
		[
			5642000,
			7792885
		],
		[
			65,
			-1425
		],
		[
			-7355,
			-598
		],
		[
			-584,
			-757
		],
		[
			1085,
			-972
		],
		[
			-1570,
			-1377
		],
		[
			-6261,
			-478
		],
		[
			-1462,
			-1203
		],
		[
			-853,
			-2966
		],
		[
			-7679,
			1248
		],
		[
			103,
			2961
		],
		[
			-845,
			1723
		],
		[
			1140,
			1319
		],
		[
			3035,
			1135
		],
		[
			7129,
			-720
		],
		[
			5330,
			2110
		],
		[
			1263,
			0
		],
		[
			1168,
			-603
		],
		[
			1419,
			152
		],
		[
			625,
			451
		],
		[
			1137,
			414
		],
		[
			785,
			897
		],
		[
			1210,
			-1016
		],
		[
			1115,
			-295
		]
	],
	[
		[
			5660090,
			7798387
		],
		[
			-6146,
			-1501
		],
		[
			-1361,
			501
		],
		[
			-1302,
			-1073
		],
		[
			-3042,
			599
		],
		[
			-1962,
			-1529
		],
		[
			-1576,
			850
		],
		[
			2040,
			1544
		],
		[
			3044,
			733
		],
		[
			4780,
			4013
		],
		[
			7859,
			3785
		],
		[
			3905,
			1233
		],
		[
			3178,
			-109
		],
		[
			89,
			-25
		],
		[
			325,
			-660
		],
		[
			-414,
			-947
		],
		[
			-4159,
			-4671
		],
		[
			-2383,
			-179
		],
		[
			-2875,
			-2564
		]
	],
	[
		[
			5577388,
			7837366
		],
		[
			-565,
			-536
		],
		[
			-1436,
			81
		],
		[
			-5395,
			-3529
		],
		[
			-4182,
			524
		],
		[
			-3457,
			-631
		],
		[
			675,
			-1159
		],
		[
			-923,
			-1035
		],
		[
			1690,
			-329
		],
		[
			-144,
			-687
		],
		[
			-3313,
			-214
		],
		[
			-564,
			580
		],
		[
			602,
			947
		],
		[
			-2063,
			916
		],
		[
			1333,
			3111
		],
		[
			3803,
			1192
		],
		[
			380,
			1587
		],
		[
			792,
			1815
		],
		[
			4628,
			1528
		],
		[
			1077,
			2512
		],
		[
			2055,
			-1124
		],
		[
			-1119,
			-2105
		],
		[
			4340,
			-2626
		],
		[
			1786,
			-818
		]
	],
	[
		[
			5716264,
			7888815
		],
		[
			596,
			-1756
		],
		[
			-1824,
			-2840
		],
		[
			-2781,
			-2350
		],
		[
			1234,
			-4163
		],
		[
			2065,
			-2179
		],
		[
			3,
			-1042
		],
		[
			-2244,
			-2151
		],
		[
			-2920,
			-689
		],
		[
			-1460,
			393
		],
		[
			-2169,
			2348
		],
		[
			725,
			2585
		],
		[
			-571,
			3995
		],
		[
			2044,
			3253
		],
		[
			4140,
			394
		],
		[
			-918,
			2999
		],
		[
			2052,
			-79
		],
		[
			2028,
			1282
		]
	],
	[
		[
			6007569,
			8058731
		],
		[
			1145,
			-493
		],
		[
			1331,
			173
		],
		[
			286,
			-1397
		],
		[
			2136,
			-531
		],
		[
			3290,
			103
		],
		[
			1474,
			775
		],
		[
			1364,
			58
		],
		[
			1236,
			-1202
		],
		[
			1640,
			-878
		],
		[
			1022,
			385
		],
		[
			1882,
			-761
		],
		[
			-1232,
			-3388
		],
		[
			-1641,
			1089
		],
		[
			-683,
			2073
		],
		[
			-633,
			-315
		],
		[
			-1601,
			1751
		],
		[
			-1241,
			-1240
		],
		[
			1471,
			-2404
		],
		[
			-376,
			-352
		],
		[
			-2775,
			-712
		],
		[
			-4805,
			-34
		],
		[
			-3345,
			1136
		],
		[
			-1527,
			742
		],
		[
			-938,
			1131
		],
		[
			-1306,
			474
		],
		[
			-352,
			1047
		],
		[
			1280,
			639
		],
		[
			291,
			804
		],
		[
			2607,
			1327
		]
	],
	[
		[
			6026294,
			8022076
		],
		[
			224,
			-1183
		],
		[
			-2105,
			-994
		],
		[
			-601,
			-940
		],
		[
			-1523,
			-856
		],
		[
			805,
			-825
		],
		[
			-631,
			-1237
		],
		[
			-1118,
			-707
		],
		[
			2911,
			-1314
		],
		[
			-1086,
			-1845
		],
		[
			-4122,
			-498
		],
		[
			-604,
			980
		],
		[
			-2427,
			1500
		],
		[
			1031,
			794
		],
		[
			-83,
			2296
		],
		[
			-1268,
			200
		],
		[
			-2617,
			1801
		],
		[
			1117,
			715
		],
		[
			1237,
			-1163
		],
		[
			1533,
			645
		],
		[
			210,
			504
		],
		[
			-1468,
			572
		],
		[
			-873,
			753
		],
		[
			-2397,
			-769
		],
		[
			-403,
			316
		],
		[
			1606,
			1137
		],
		[
			2191,
			-322
		],
		[
			2880,
			621
		],
		[
			667,
			-840
		],
		[
			1154,
			585
		],
		[
			3896,
			633
		],
		[
			1864,
			-559
		]
	],
	[
		[
			6067838,
			8066323
		],
		[
			-3240,
			-2061
		],
		[
			-2173,
			-348
		],
		[
			-1156,
			-1342
		],
		[
			-2664,
			198
		],
		[
			-493,
			-2213
		],
		[
			-1136,
			772
		],
		[
			-183,
			1246
		],
		[
			-1860,
			-599
		],
		[
			-2662,
			37
		],
		[
			-6289,
			-4247
		],
		[
			-622,
			447
		],
		[
			554,
			2323
		],
		[
			8498,
			4356
		],
		[
			663,
			967
		],
		[
			-200,
			2001
		],
		[
			4817,
			612
		],
		[
			237,
			-443
		],
		[
			-2000,
			-2313
		],
		[
			1739,
			-684
		],
		[
			9369,
			2619
		],
		[
			3064,
			1900
		],
		[
			1880,
			-2304
		],
		[
			-6143,
			-924
		]
	],
	[
		[
			6024943,
			8068531
		],
		[
			2402,
			-2810
		],
		[
			2254,
			-478
		],
		[
			1151,
			-1475
		],
		[
			-3705,
			-1705
		],
		[
			96,
			2023
		],
		[
			-4192,
			2752
		],
		[
			-2768,
			655
		],
		[
			-1117,
			-225
		],
		[
			563,
			-1219
		],
		[
			-3265,
			-978
		],
		[
			-3212,
			1505
		],
		[
			-484,
			2603
		],
		[
			-3161,
			2129
		],
		[
			265,
			282
		],
		[
			5385,
			95
		],
		[
			4239,
			2683
		],
		[
			738,
			-618
		],
		[
			-901,
			-1993
		],
		[
			-1827,
			-852
		],
		[
			34,
			-502
		],
		[
			3915,
			-1224
		],
		[
			3590,
			-648
		]
	],
	[
		[
			6228384,
			8201983
		],
		[
			2067,
			-456
		],
		[
			1343,
			54
		],
		[
			1002,
			-738
		],
		[
			0,
			-1416
		],
		[
			1535,
			-752
		],
		[
			971,
			164
		],
		[
			652,
			1103
		],
		[
			1701,
			271
		],
		[
			33,
			-812
		],
		[
			889,
			-356
		],
		[
			-594,
			-1111
		],
		[
			-1708,
			-793
		],
		[
			33,
			-677
		],
		[
			-1220,
			-868
		],
		[
			-685,
			720
		],
		[
			-788,
			-65
		],
		[
			-1533,
			1235
		],
		[
			-1577,
			-422
		],
		[
			-1269,
			940
		],
		[
			-1276,
			-229
		],
		[
			-2138,
			117
		],
		[
			-92,
			-608
		],
		[
			1809,
			-427
		],
		[
			1213,
			-1359
		],
		[
			-2367,
			-545
		],
		[
			-2073,
			981
		],
		[
			-1770,
			2421
		],
		[
			-2219,
			1615
		],
		[
			1240,
			1748
		],
		[
			2265,
			-272
		],
		[
			1652,
			-637
		],
		[
			1048,
			166
		],
		[
			1856,
			1008
		]
	],
	[
		[
			5696409,
			7742890
		],
		[
			-2580,
			-1237
		],
		[
			-903,
			972
		],
		[
			-1447,
			-629
		],
		[
			-1333,
			206
		],
		[
			-286,
			700
		],
		[
			-959,
			136
		],
		[
			573,
			606
		],
		[
			-304,
			1534
		],
		[
			1173,
			723
		],
		[
			-591,
			238
		],
		[
			927,
			1183
		],
		[
			500,
			250
		],
		[
			3475,
			1678
		],
		[
			2313,
			36
		],
		[
			703,
			1334
		],
		[
			2902,
			1145
		],
		[
			702,
			-1354
		],
		[
			-2399,
			-2839
		],
		[
			-494,
			-984
		],
		[
			-2505,
			-1706
		],
		[
			843,
			-913
		],
		[
			-310,
			-1079
		]
	],
	[
		[
			6054782,
			8050919
		],
		[
			1746,
			-740
		],
		[
			3968,
			696
		],
		[
			-134,
			-2082
		],
		[
			2080,
			-775
		],
		[
			-1694,
			-1445
		],
		[
			-2059,
			496
		],
		[
			-1226,
			-724
		],
		[
			-1239,
			19
		],
		[
			-1260,
			-466
		],
		[
			-477,
			421
		],
		[
			527,
			1200
		],
		[
			-312,
			746
		],
		[
			-3148,
			1039
		],
		[
			-1641,
			-534
		],
		[
			697,
			-1284
		],
		[
			-531,
			-1121
		],
		[
			-2764,
			-124
		],
		[
			-881,
			1044
		],
		[
			1516,
			1352
		],
		[
			527,
			934
		],
		[
			1594,
			316
		],
		[
			2008,
			-43
		],
		[
			957,
			848
		],
		[
			-363,
			602
		],
		[
			-1704,
			727
		],
		[
			-2065,
			1829
		],
		[
			2790,
			710
		],
		[
			1219,
			-1394
		],
		[
			2106,
			-433
		],
		[
			-523,
			-1255
		],
		[
			286,
			-559
		]
	],
	[
		[
			5698888,
			7961631
		],
		[
			540,
			-714
		],
		[
			-405,
			-707
		],
		[
			-8396,
			-3387
		],
		[
			-3677,
			2050
		],
		[
			2035,
			1337
		],
		[
			1327,
			849
		],
		[
			1109,
			-47
		],
		[
			1664,
			755
		],
		[
			1866,
			1699
		],
		[
			3304,
			671
		],
		[
			601,
			820
		],
		[
			2540,
			-291
		],
		[
			-266,
			-812
		],
		[
			-803,
			-118
		],
		[
			3,
			-966
		],
		[
			-1442,
			-1139
		]
	],
	[
		[
			6038997,
			8062053
		],
		[
			1168,
			-328
		],
		[
			662,
			1611
		],
		[
			648,
			122
		],
		[
			2080,
			-1491
		],
		[
			-1221,
			-397
		],
		[
			-946,
			207
		],
		[
			233,
			-1435
		],
		[
			-1345,
			-936
		],
		[
			-323,
			-982
		],
		[
			-869,
			-381
		],
		[
			327,
			-1087
		],
		[
			-3,
			-2171
		],
		[
			1862,
			-1130
		],
		[
			-443,
			-643
		],
		[
			-2677,
			116
		],
		[
			-1905,
			-490
		],
		[
			-661,
			2139
		],
		[
			-1917,
			1108
		],
		[
			-896,
			117
		],
		[
			-328,
			1422
		],
		[
			2596,
			-306
		],
		[
			2128,
			599
		],
		[
			350,
			1359
		],
		[
			-1297,
			1074
		],
		[
			538,
			1270
		],
		[
			-538,
			773
		],
		[
			797,
			633
		],
		[
			2334,
			889
		],
		[
			257,
			-498
		],
		[
			-611,
			-1164
		]
	],
	[
		[
			6033662,
			8044676
		],
		[
			-727,
			-1166
		],
		[
			1159,
			-1063
		],
		[
			265,
			-802
		],
		[
			-2109,
			-950
		],
		[
			-815,
			453
		],
		[
			-2978,
			708
		],
		[
			-2318,
			5
		],
		[
			-260,
			-1406
		],
		[
			-693,
			-329
		],
		[
			-1484,
			1598
		],
		[
			-1623,
			124
		],
		[
			-150,
			371
		],
		[
			1807,
			2660
		],
		[
			1206,
			944
		],
		[
			1507,
			-999
		],
		[
			3010,
			-426
		],
		[
			1685,
			682
		],
		[
			141,
			1259
		],
		[
			2122,
			367
		],
		[
			1333,
			662
		],
		[
			467,
			-454
		],
		[
			-327,
			-1294
		],
		[
			-1218,
			-944
		]
	],
	[
		[
			5703986,
			7831114
		],
		[
			-625,
			-2784
		],
		[
			121,
			-880
		],
		[
			-2361,
			-1620
		],
		[
			-2038,
			23
		],
		[
			-2429,
			704
		],
		[
			-2501,
			1004
		],
		[
			209,
			1862
		],
		[
			2219,
			823
		],
		[
			2558,
			-92
		],
		[
			440,
			442
		],
		[
			-678,
			1606
		],
		[
			1165,
			717
		],
		[
			1299,
			246
		],
		[
			2011,
			-954
		],
		[
			610,
			-1097
		]
	],
	[
		[
			6207431,
			8157540
		],
		[
			383,
			-2549
		],
		[
			2213,
			286
		],
		[
			192,
			-1278
		],
		[
			-3225,
			-4713
		],
		[
			-3847,
			1581
		],
		[
			-346,
			1387
		],
		[
			781,
			1320
		],
		[
			-1074,
			1125
		],
		[
			-1269,
			431
		],
		[
			-780,
			914
		],
		[
			136,
			665
		],
		[
			1913,
			260
		],
		[
			3778,
			-569
		],
		[
			1145,
			1140
		]
	],
	[
		[
			5693159,
			7788616
		],
		[
			3489,
			-1334
		],
		[
			1489,
			97
		],
		[
			2697,
			-1333
		],
		[
			-1650,
			-878
		],
		[
			-2893,
			94
		],
		[
			-1131,
			-388
		],
		[
			-1332,
			865
		],
		[
			-2756,
			-294
		],
		[
			-2502,
			976
		],
		[
			-1884,
			414
		],
		[
			-1788,
			-48
		],
		[
			-526,
			1463
		],
		[
			2386,
			181
		],
		[
			1235,
			-430
		],
		[
			5166,
			615
		]
	],
	[
		[
			5608006,
			7903380
		],
		[
			666,
			-539
		],
		[
			-2789,
			-2710
		],
		[
			-910,
			-413
		],
		[
			-1393,
			553
		],
		[
			-717,
			-753
		],
		[
			-1098,
			-71
		],
		[
			-1567,
			949
		],
		[
			929,
			697
		],
		[
			1160,
			-351
		],
		[
			585,
			959
		],
		[
			-3401,
			124
		],
		[
			-773,
			-287
		],
		[
			-285,
			1266
		],
		[
			-743,
			385
		],
		[
			868,
			789
		],
		[
			2157,
			-188
		],
		[
			751,
			367
		],
		[
			53,
			-815
		],
		[
			3009,
			394
		],
		[
			-162,
			854
		],
		[
			1316,
			895
		],
		[
			798,
			-514
		],
		[
			-1061,
			-714
		],
		[
			2607,
			-877
		]
	],
	[
		[
			6043432,
			8030966
		],
		[
			-5765,
			-531
		],
		[
			-1786,
			2921
		],
		[
			4416,
			1642
		],
		[
			3498,
			919
		],
		[
			492,
			-249
		],
		[
			177,
			-670
		],
		[
			-1032,
			-4032
		]
	],
	[
		[
			6216811,
			8171848
		],
		[
			-2439,
			-333
		],
		[
			-2581,
			872
		],
		[
			3166,
			3032
		],
		[
			4233,
			1396
		],
		[
			4039,
			202
		],
		[
			170,
			-490
		],
		[
			-6588,
			-4679
		]
	],
	[
		[
			5764296,
			7788566
		],
		[
			-6915,
			-2942
		],
		[
			-374,
			219
		],
		[
			1405,
			2577
		],
		[
			4151,
			1502
		],
		[
			5787,
			4241
		],
		[
			2548,
			255
		],
		[
			234,
			-441
		],
		[
			-912,
			-1093
		],
		[
			-5924,
			-4318
		]
	],
	[
		[
			5745208,
			7754731
		],
		[
			-2258,
			-107
		],
		[
			-2174,
			211
		],
		[
			-705,
			731
		],
		[
			523,
			799
		],
		[
			1196,
			429
		],
		[
			416,
			735
		],
		[
			3716,
			1093
		],
		[
			-1928,
			1429
		],
		[
			1669,
			1452
		],
		[
			888,
			-2881
		],
		[
			899,
			-715
		],
		[
			-185,
			-701
		],
		[
			752,
			-980
		],
		[
			-52,
			-586
		],
		[
			-1270,
			-129
		],
		[
			-1487,
			-780
		]
	],
	[
		[
			5664493,
			7845813
		],
		[
			2139,
			-546
		],
		[
			-190,
			-1447
		],
		[
			1981,
			-16
		],
		[
			244,
			-884
		],
		[
			-4696,
			277
		],
		[
			-343,
			1139
		],
		[
			-3140,
			95
		],
		[
			-2437,
			-1216
		],
		[
			-2605,
			-243
		],
		[
			-1312,
			871
		],
		[
			2093,
			929
		],
		[
			3110,
			385
		],
		[
			209,
			525
		],
		[
			2699,
			-222
		],
		[
			2248,
			353
		]
	],
	[
		[
			5616362,
			7929108
		],
		[
			-971,
			-1554
		],
		[
			-1617,
			-629
		],
		[
			-2691,
			1164
		],
		[
			-961,
			-140
		],
		[
			-253,
			-955
		],
		[
			-2464,
			-733
		],
		[
			-482,
			802
		],
		[
			966,
			1193
		],
		[
			2405,
			252
		],
		[
			718,
			1474
		],
		[
			1106,
			607
		],
		[
			3273,
			243
		],
		[
			971,
			-1724
		]
	],
	[
		[
			5698300,
			7668523
		],
		[
			-1252,
			-1913
		],
		[
			-123,
			-1178
		],
		[
			-823,
			-768
		],
		[
			-906,
			850
		],
		[
			-44,
			935
		],
		[
			1024,
			838
		],
		[
			-553,
			623
		],
		[
			-3218,
			371
		],
		[
			-3172,
			-538
		],
		[
			-2512,
			352
		],
		[
			511,
			665
		],
		[
			2367,
			966
		],
		[
			1623,
			207
		],
		[
			1881,
			-576
		],
		[
			2376,
			-7
		],
		[
			2271,
			-378
		],
		[
			550,
			-449
		]
	],
	[
		[
			6220929,
			7216857
		],
		[
			-309,
			-383
		],
		[
			-3309,
			498
		],
		[
			-4043,
			317
		],
		[
			-261,
			490
		],
		[
			1884,
			349
		],
		[
			1295,
			918
		],
		[
			592,
			1686
		],
		[
			-209,
			596
		],
		[
			834,
			649
		],
		[
			1955,
			-232
		],
		[
			656,
			-560
		],
		[
			-567,
			-1669
		],
		[
			0,
			-1867
		],
		[
			1482,
			-792
		]
	],
	[
		[
			6110099,
			8150514
		],
		[
			-1371,
			-803
		],
		[
			-379,
			587
		],
		[
			-4546,
			2096
		],
		[
			1259,
			1330
		],
		[
			3287,
			654
		],
		[
			1383,
			-101
		],
		[
			1359,
			-1505
		],
		[
			-597,
			-674
		],
		[
			-395,
			-1584
		]
	],
	[
		[
			5739715,
			7703753
		],
		[
			-812,
			-536
		],
		[
			-425,
			536
		],
		[
			342,
			1352
		],
		[
			-821,
			1468
		],
		[
			4007,
			4561
		],
		[
			1307,
			250
		],
		[
			-1873,
			-6273
		],
		[
			-1725,
			-1358
		]
	],
	[
		[
			5765520,
			7781035
		],
		[
			-246,
			-1068
		],
		[
			-2606,
			-1553
		],
		[
			-192,
			-512
		],
		[
			-1962,
			-1627
		],
		[
			-744,
			-311
		],
		[
			-1167,
			888
		],
		[
			-2269,
			18
		],
		[
			458,
			832
		],
		[
			1728,
			824
		],
		[
			260,
			965
		],
		[
			1934,
			85
		],
		[
			1319,
			537
		],
		[
			1508,
			-42
		],
		[
			1979,
			964
		]
	],
	[
		[
			5600498,
			7912036
		],
		[
			-687,
			-1579
		],
		[
			-1285,
			87
		],
		[
			-127,
			-568
		],
		[
			-1534,
			-938
		],
		[
			-1297,
			615
		],
		[
			-831,
			-642
		],
		[
			-2018,
			447
		],
		[
			1191,
			980
		],
		[
			1299,
			1694
		],
		[
			3715,
			458
		],
		[
			1574,
			-554
		]
	],
	[
		[
			5825056,
			7714063
		],
		[
			-1290,
			-808
		],
		[
			-33,
			780
		],
		[
			-1611,
			-137
		],
		[
			-1457,
			-910
		],
		[
			-601,
			881
		],
		[
			2593,
			3654
		],
		[
			976,
			386
		],
		[
			1679,
			-98
		],
		[
			-189,
			-1913
		],
		[
			649,
			-702
		],
		[
			-716,
			-1133
		]
	],
	[
		[
			5605163,
			7939301
		],
		[
			-1521,
			-258
		],
		[
			-952,
			588
		],
		[
			-2581,
			28
		],
		[
			-1363,
			964
		],
		[
			-584,
			980
		],
		[
			1820,
			638
		],
		[
			479,
			514
		],
		[
			1785,
			-333
		],
		[
			2102,
			-819
		],
		[
			815,
			-2302
		]
	],
	[
		[
			6026385,
			8024255
		],
		[
			1734,
			-244
		],
		[
			-305,
			-739
		],
		[
			-1851,
			-403
		],
		[
			-1522,
			336
		],
		[
			-2063,
			-289
		],
		[
			-2860,
			437
		],
		[
			-789,
			437
		],
		[
			2173,
			922
		],
		[
			2632,
			-500
		],
		[
			240,
			1646
		],
		[
			2486,
			252
		],
		[
			125,
			-1855
		]
	],
	[
		[
			5697182,
			7854586
		],
		[
			-825,
			-976
		],
		[
			-1910,
			193
		],
		[
			-438,
			-545
		],
		[
			809,
			-831
		],
		[
			-1397,
			-712
		],
		[
			-1435,
			-21
		],
		[
			-1678,
			758
		],
		[
			-820,
			1113
		],
		[
			2463,
			888
		],
		[
			1382,
			213
		],
		[
			945,
			646
		],
		[
			2187,
			-199
		],
		[
			717,
			-527
		]
	],
	[
		[
			6070849,
			7190726
		],
		[
			-1498,
			-679
		],
		[
			-179,
			365
		],
		[
			396,
			862
		],
		[
			4,
			1622
		],
		[
			745,
			1668
		],
		[
			-1056,
			1001
		],
		[
			309,
			289
		],
		[
			2573,
			-367
		],
		[
			1421,
			-1769
		],
		[
			-214,
			-738
		],
		[
			-1104,
			-698
		],
		[
			-1397,
			-1556
		]
	],
	[
		[
			5718136,
			7891594
		],
		[
			-418,
			-1178
		],
		[
			-1373,
			212
		],
		[
			-462,
			966
		],
		[
			-561,
			1174
		],
		[
			1440,
			697
		],
		[
			-288,
			2098
		],
		[
			1244,
			607
		],
		[
			1285,
			486
		],
		[
			598,
			-929
		],
		[
			-1465,
			-4133
		]
	],
	[
		[
			5994123,
			7544957
		],
		[
			399,
			-1299
		],
		[
			-662,
			144
		],
		[
			-3291,
			2999
		],
		[
			-2275,
			2965
		],
		[
			-306,
			3280
		],
		[
			1270,
			-638
		],
		[
			1646,
			-4238
		],
		[
			1782,
			-1369
		],
		[
			180,
			-1021
		],
		[
			1257,
			-823
		]
	],
	[
		[
			6027381,
			8072003
		],
		[
			-757,
			-814
		],
		[
			-1044,
			538
		],
		[
			-1070,
			-538
		],
		[
			-461,
			2307
		],
		[
			1306,
			1339
		],
		[
			70,
			1041
		],
		[
			813,
			1258
		],
		[
			973,
			265
		],
		[
			1209,
			-1159
		],
		[
			-1117,
			-875
		],
		[
			-891,
			-1484
		],
		[
			969,
			-929
		],
		[
			0,
			-949
		]
	],
	[
		[
			6146035,
			8172728
		],
		[
			964,
			-495
		],
		[
			12,
			621
		],
		[
			1089,
			96
		],
		[
			422,
			-800
		],
		[
			-826,
			-532
		],
		[
			586,
			-667
		],
		[
			-2162,
			-647
		],
		[
			-1001,
			35
		],
		[
			-400,
			1135
		],
		[
			-1273,
			-694
		],
		[
			-1873,
			1638
		],
		[
			777,
			756
		],
		[
			1116,
			41
		],
		[
			2569,
			-487
		]
	],
	[
		[
			5674454,
			7770175
		],
		[
			-1392,
			-753
		],
		[
			-1914,
			266
		],
		[
			-425,
			418
		],
		[
			2033,
			839
		],
		[
			-242,
			1620
		],
		[
			2484,
			883
		],
		[
			1982,
			97
		],
		[
			-353,
			-1276
		],
		[
			-2173,
			-2094
		]
	],
	[
		[
			6154234,
			8093685
		],
		[
			-145,
			-2537
		],
		[
			-1405,
			116
		],
		[
			-378,
			-1054
		],
		[
			-2396,
			-202
		],
		[
			-463,
			820
		],
		[
			1135,
			488
		],
		[
			194,
			1750
		],
		[
			509,
			859
		],
		[
			2949,
			-240
		]
	],
	[
		[
			5594217,
			7915191
		],
		[
			-1314,
			-472
		],
		[
			-2490,
			121
		],
		[
			-1896,
			1250
		],
		[
			780,
			693
		],
		[
			1659,
			50
		],
		[
			266,
			378
		],
		[
			2504,
			-8
		],
		[
			1419,
			-1046
		],
		[
			-928,
			-966
		]
	],
	[
		[
			5579520,
			7889237
		],
		[
			175,
			-676
		],
		[
			-1335,
			299
		],
		[
			-531,
			1492
		],
		[
			-1372,
			1242
		],
		[
			-155,
			989
		],
		[
			1791,
			925
		],
		[
			1752,
			-767
		],
		[
			429,
			-1147
		],
		[
			-882,
			-381
		],
		[
			950,
			-1084
		],
		[
			-822,
			-892
		]
	],
	[
		[
			5587154,
			7844915
		],
		[
			-1201,
			-774
		],
		[
			-1549,
			782
		],
		[
			-371,
			2240
		],
		[
			1826,
			581
		],
		[
			2368,
			29
		],
		[
			-1073,
			-2858
		]
	],
	[
		[
			6074419,
			8074451
		],
		[
			-984,
			-639
		],
		[
			-2798,
			827
		],
		[
			1340,
			2597
		],
		[
			1974,
			360
		],
		[
			553,
			-506
		],
		[
			-85,
			-2639
		]
	],
	[
		[
			6006218,
			8020817
		],
		[
			-4085,
			-696
		],
		[
			-819,
			303
		],
		[
			-890,
			1168
		],
		[
			1709,
			868
		],
		[
			2753,
			585
		],
		[
			-418,
			-889
		],
		[
			1816,
			-814
		],
		[
			-66,
			-525
		]
	],
	[
		[
			5687572,
			7130981
		],
		[
			-744,
			-1107
		],
		[
			-1258,
			-50
		],
		[
			-793,
			-550
		],
		[
			-638,
			606
		],
		[
			-1343,
			-675
		],
		[
			-760,
			755
		],
		[
			976,
			822
		],
		[
			1079,
			52
		],
		[
			-283,
			593
		],
		[
			1444,
			1020
		],
		[
			2067,
			-825
		],
		[
			253,
			-641
		]
	],
	[
		[
			5460316,
			7919972
		],
		[
			-772,
			-399
		],
		[
			-1151,
			220
		],
		[
			-657,
			-919
		],
		[
			-3418,
			866
		],
		[
			-390,
			943
		],
		[
			2191,
			631
		],
		[
			1617,
			-280
		],
		[
			984,
			-216
		],
		[
			1596,
			-846
		]
	],
	[
		[
			5552717,
			7819063
		],
		[
			-2184,
			-701
		],
		[
			-994,
			840
		],
		[
			-167,
			1516
		],
		[
			377,
			352
		],
		[
			3515,
			513
		],
		[
			-547,
			-2520
		]
	],
	[
		[
			5692748,
			7823202
		],
		[
			933,
			-863
		],
		[
			-1935,
			-1164
		],
		[
			-1529,
			742
		],
		[
			-1971,
			-455
		],
		[
			-849,
			720
		],
		[
			1388,
			1000
		],
		[
			990,
			-348
		],
		[
			2973,
			368
		]
	],
	[
		[
			5691433,
			7739432
		],
		[
			-1792,
			-661
		],
		[
			21,
			1314
		],
		[
			-1245,
			821
		],
		[
			259,
			303
		],
		[
			3458,
			232
		],
		[
			1795,
			-97
		],
		[
			-542,
			-720
		],
		[
			-1253,
			-8
		],
		[
			-701,
			-1184
		]
	],
	[
		[
			5756067,
			7759164
		],
		[
			-2067,
			-961
		],
		[
			-615,
			1901
		],
		[
			550,
			1283
		],
		[
			1620,
			4
		],
		[
			516,
			-898
		],
		[
			-4,
			-1329
		]
	],
	[
		[
			5565154,
			7826832
		],
		[
			-1684,
			-12
		],
		[
			-1423,
			679
		],
		[
			-755,
			934
		],
		[
			840,
			441
		],
		[
			1958,
			26
		],
		[
			1063,
			-335
		],
		[
			1,
			-1733
		]
	],
	[
		[
			5984541,
			8032801
		],
		[
			2386,
			-851
		],
		[
			595,
			418
		],
		[
			1130,
			-665
		],
		[
			-113,
			-626
		],
		[
			-1590,
			-407
		],
		[
			-2612,
			642
		],
		[
			-564,
			1271
		],
		[
			768,
			218
		]
	],
	[
		[
			5681683,
			7135050
		],
		[
			1491,
			-1070
		],
		[
			-265,
			-777
		],
		[
			-1002,
			-513
		],
		[
			-651,
			1519
		],
		[
			-761,
			360
		],
		[
			-429,
			-1310
		],
		[
			-1072,
			20
		],
		[
			-292,
			672
		],
		[
			1719,
			1520
		],
		[
			1262,
			-421
		]
	],
	[
		[
			5849207,
			7254849
		],
		[
			-1005,
			-242
		],
		[
			-1018,
			1359
		],
		[
			531,
			836
		],
		[
			-434,
			1508
		],
		[
			333,
			528
		],
		[
			1394,
			-1587
		],
		[
			199,
			-2402
		]
	],
	[
		[
			6020902,
			8046639
		],
		[
			-826,
			-800
		],
		[
			-785,
			425
		],
		[
			-1274,
			-341
		],
		[
			-580,
			619
		],
		[
			-1662,
			239
		],
		[
			-11,
			604
		],
		[
			3078,
			513
		],
		[
			386,
			-1059
		],
		[
			1674,
			-200
		]
	],
	[
		[
			6004394,
			8005891
		],
		[
			-2245,
			-293
		],
		[
			-315,
			230
		],
		[
			241,
			560
		],
		[
			735,
			1706
		],
		[
			637,
			194
		],
		[
			1518,
			-1387
		],
		[
			-290,
			-513
		],
		[
			-281,
			-497
		]
	],
	[
		[
			6214967,
			8152622
		],
		[
			-1141,
			-837
		],
		[
			-1970,
			1009
		],
		[
			-850,
			1024
		],
		[
			3695,
			31
		],
		[
			266,
			-1227
		]
	],
	[
		[
			6137199,
			7705628
		],
		[
			-2281,
			-23
		],
		[
			-967,
			1413
		],
		[
			1147,
			575
		],
		[
			2047,
			-318
		],
		[
			54,
			-1647
		]
	],
	[
		[
			6218404,
			8199980
		],
		[
			-1355,
			-954
		],
		[
			-2064,
			223
		],
		[
			47,
			-841
		],
		[
			-1171,
			269
		],
		[
			1250,
			1197
		],
		[
			122,
			737
		],
		[
			2433,
			-75
		],
		[
			738,
			-556
		]
	],
	[
		[
			6158325,
			8158168
		],
		[
			-1817,
			-351
		],
		[
			-2014,
			1031
		],
		[
			1981,
			935
		],
		[
			2015,
			-717
		],
		[
			-165,
			-898
		]
	],
	[
		[
			5775338,
			7938899
		],
		[
			-1337,
			-197
		],
		[
			-991,
			771
		],
		[
			146,
			1268
		],
		[
			923,
			384
		],
		[
			1049,
			-260
		],
		[
			210,
			-1966
		]
	],
	[
		[
			5999916,
			8022131
		],
		[
			-1823,
			-148
		],
		[
			-1187,
			1382
		],
		[
			711,
			870
		],
		[
			2640,
			-1313
		],
		[
			-341,
			-791
		]
	],
	[
		[
			6384340,
			7279915
		],
		[
			-36,
			-1576
		],
		[
			-1699,
			345
		],
		[
			-991,
			2294
		],
		[
			1501,
			286
		],
		[
			15,
			-1283
		],
		[
			1210,
			-66
		]
	],
	[
		[
			5733437,
			7872481
		],
		[
			-860,
			-522
		],
		[
			-1934,
			183
		],
		[
			-913,
			1360
		],
		[
			2079,
			348
		],
		[
			1628,
			-1369
		]
	],
	[
		[
			6020245,
			8050553
		],
		[
			-1718,
			-842
		],
		[
			-2454,
			725
		],
		[
			339,
			388
		],
		[
			3058,
			700
		],
		[
			775,
			-971
		]
	],
	[
		[
			5772327,
			7943449
		],
		[
			-212,
			-989
		],
		[
			-2696,
			584
		],
		[
			-354,
			-437
		],
		[
			-1142,
			784
		],
		[
			1649,
			965
		],
		[
			719,
			-613
		],
		[
			2036,
			-294
		]
	],
	[
		[
			5820675,
			7710154
		],
		[
			-1118,
			-520
		],
		[
			-1283,
			920
		],
		[
			329,
			570
		],
		[
			2141,
			949
		],
		[
			372,
			-320
		],
		[
			-441,
			-1599
		]
	],
	[
		[
			5809308,
			7690457
		],
		[
			-1165,
			-672
		],
		[
			-632,
			1010
		],
		[
			-1132,
			435
		],
		[
			-315,
			999
		],
		[
			1717,
			66
		],
		[
			1527,
			-1838
		]
	],
	[
		[
			5610860,
			7904576
		],
		[
			-381,
			-860
		],
		[
			-899,
			-129
		],
		[
			-342,
			801
		],
		[
			-1183,
			-512
		],
		[
			-761,
			1227
		],
		[
			258,
			411
		],
		[
			1830,
			-284
		],
		[
			1478,
			-654
		]
	],
	[
		[
			5555078,
			7891612
		],
		[
			-1634,
			-1614
		],
		[
			-2196,
			503
		],
		[
			165,
			1111
		],
		[
			1247,
			-569
		],
		[
			1918,
			999
		],
		[
			500,
			-430
		]
	],
	[
		[
			5582491,
			7841649
		],
		[
			933,
			-1478
		],
		[
			-1442,
			158
		],
		[
			-414,
			-934
		],
		[
			-2361,
			729
		],
		[
			579,
			586
		],
		[
			879,
			-235
		],
		[
			1826,
			1174
		]
	],
	[
		[
			5752070,
			7588398
		],
		[
			-1000,
			-886
		],
		[
			-1070,
			2360
		],
		[
			1047,
			926
		],
		[
			942,
			-638
		],
		[
			-424,
			-634
		],
		[
			505,
			-1128
		]
	],
	[
		[
			5781913,
			7326257
		],
		[
			-135,
			-2689
		],
		[
			-1994,
			1653
		],
		[
			653,
			1138
		],
		[
			1476,
			-102
		]
	],
	[
		[
			5800452,
			7717160
		],
		[
			-697,
			-813
		],
		[
			-1024,
			545
		],
		[
			-387,
			1009
		],
		[
			377,
			1364
		],
		[
			615,
			-171
		],
		[
			1116,
			-1934
		]
	],
	[
		[
			6241369,
			8180781
		],
		[
			-2255,
			-266
		],
		[
			-1580,
			346
		],
		[
			340,
			848
		],
		[
			2509,
			79
		],
		[
			986,
			-1007
		]
	],
	[
		[
			5787081,
			7312802
		],
		[
			-1218,
			-1390
		],
		[
			-1794,
			561
		],
		[
			-233,
			692
		],
		[
			1247,
			544
		],
		[
			1998,
			-407
		]
	],
	[
		[
			6226989,
			8205017
		],
		[
			-1741,
			-201
		],
		[
			-1599,
			1470
		],
		[
			689,
			393
		],
		[
			2336,
			-842
		],
		[
			315,
			-820
		]
	],
	[
		[
			5768470,
			7928686
		],
		[
			854,
			-2144
		],
		[
			-1869,
			354
		],
		[
			-561,
			1171
		],
		[
			210,
			570
		],
		[
			1366,
			49
		]
	],
	[
		[
			5558301,
			7823643
		],
		[
			-3049,
			-44
		],
		[
			712,
			936
		],
		[
			1668,
			382
		],
		[
			1294,
			-512
		],
		[
			-625,
			-762
		]
	],
	[
		[
			6177051,
			8171497
		],
		[
			-1327,
			-660
		],
		[
			-978,
			607
		],
		[
			1097,
			726
		],
		[
			-405,
			596
		],
		[
			1147,
			148
		],
		[
			988,
			-488
		],
		[
			-522,
			-929
		]
	],
	[
		[
			5571580,
			7895815
		],
		[
			1406,
			-1084
		],
		[
			1852,
			101
		],
		[
			-790,
			-1164
		],
		[
			-1379,
			236
		],
		[
			-1503,
			1386
		],
		[
			414,
			525
		]
	],
	[
		[
			5587435,
			7910231
		],
		[
			-11,
			-1313
		],
		[
			-1808,
			185
		],
		[
			-515,
			1291
		],
		[
			1096,
			271
		],
		[
			1238,
			-434
		]
	],
	[
		[
			5627016,
			7959375
		],
		[
			-1426,
			-1496
		],
		[
			-832,
			560
		],
		[
			790,
			1771
		],
		[
			743,
			0
		],
		[
			725,
			-835
		]
	],
	[
		[
			5686157,
			7135458
		],
		[
			1333,
			-333
		],
		[
			1087,
			288
		],
		[
			305,
			-490
		],
		[
			-1853,
			-544
		],
		[
			-2336,
			805
		],
		[
			1046,
			896
		],
		[
			418,
			-622
		]
	],
	[
		[
			5608106,
			7914685
		],
		[
			-216,
			-690
		],
		[
			-2231,
			1082
		],
		[
			-196,
			395
		],
		[
			1629,
			635
		],
		[
			1014,
			-1422
		]
	],
	[
		[
			6198972,
			8138564
		],
		[
			-1281,
			-1047
		],
		[
			-1019,
			1483
		],
		[
			-1246,
			238
		],
		[
			754,
			491
		],
		[
			2792,
			-1165
		]
	],
	[
		[
			6119422,
			7208210
		],
		[
			-252,
			-900
		],
		[
			-2406,
			85
		],
		[
			-440,
			527
		],
		[
			1355,
			528
		],
		[
			1743,
			-240
		]
	],
	[
		[
			5666187,
			7871838
		],
		[
			-914,
			-268
		],
		[
			-1128,
			610
		],
		[
			1694,
			1163
		],
		[
			977,
			-427
		],
		[
			-629,
			-1078
		]
	],
	[
		[
			5553230,
			7816958
		],
		[
			-1501,
			-442
		],
		[
			-1778,
			784
		],
		[
			655,
			428
		],
		[
			2557,
			-168
		],
		[
			67,
			-602
		]
	],
	[
		[
			5882571,
			7994440
		],
		[
			-1342,
			-925
		],
		[
			-1159,
			222
		],
		[
			-216,
			967
		],
		[
			2522,
			151
		],
		[
			195,
			-415
		]
	],
	[
		[
			6184031,
			8186976
		],
		[
			-1676,
			-255
		],
		[
			-648,
			439
		],
		[
			880,
			1094
		],
		[
			905,
			171
		],
		[
			539,
			-1449
		]
	],
	[
		[
			5576417,
			7905084
		],
		[
			-2635,
			-712
		],
		[
			-466,
			491
		],
		[
			345,
			620
		],
		[
			2625,
			148
		],
		[
			131,
			-547
		]
	],
	[
		[
			5576749,
			7843175
		],
		[
			-1354,
			-107
		],
		[
			-501,
			434
		],
		[
			1440,
			1136
		],
		[
			1170,
			-561
		],
		[
			-755,
			-902
		]
	],
	[
		[
			5758764,
			7666849
		],
		[
			-1914,
			-646
		],
		[
			-1433,
			451
		],
		[
			925,
			622
		],
		[
			1691,
			70
		],
		[
			731,
			-497
		]
	],
	[
		[
			5682339,
			7127568
		],
		[
			-1511,
			-389
		],
		[
			-912,
			1143
		],
		[
			86,
			290
		],
		[
			2472,
			-408
		],
		[
			-135,
			-636
		]
	],
	[
		[
			5776942,
			7798205
		],
		[
			-871,
			-1635
		],
		[
			-1536,
			749
		],
		[
			621,
			753
		],
		[
			1786,
			133
		]
	],
	[
		[
			6033760,
			8060185
		],
		[
			-966,
			-1328
		],
		[
			-713,
			1141
		],
		[
			579,
			1468
		],
		[
			1100,
			-1281
		]
	],
	[
		[
			6180491,
			8143836
		],
		[
			-1182,
			-859
		],
		[
			-1291,
			410
		],
		[
			2094,
			1491
		],
		[
			379,
			-1042
		]
	],
	[
		[
			5847729,
			7302456
		],
		[
			-1046,
			-794
		],
		[
			-1522,
			406
		],
		[
			-157,
			463
		],
		[
			1478,
			377
		],
		[
			1247,
			-452
		]
	],
	[
		[
			5730506,
			7866123
		],
		[
			-1951,
			-573
		],
		[
			-607,
			772
		],
		[
			1789,
			668
		],
		[
			769,
			-867
		]
	],
	[
		[
			6211911,
			8174144
		],
		[
			-915,
			-280
		],
		[
			-343,
			1098
		],
		[
			1074,
			699
		],
		[
			716,
			-257
		],
		[
			-532,
			-1260
		]
	],
	[
		[
			5771914,
			7940513
		],
		[
			562,
			-794
		],
		[
			-1079,
			-551
		],
		[
			-1445,
			-66
		],
		[
			-99,
			937
		],
		[
			1336,
			-271
		],
		[
			725,
			745
		]
	],
	[
		[
			5739877,
			7762996
		],
		[
			-2206,
			-641
		],
		[
			-490,
			391
		],
		[
			809,
			623
		],
		[
			1651,
			296
		],
		[
			236,
			-669
		]
	],
	[
		[
			5837117,
			7415427
		],
		[
			-490,
			-1446
		],
		[
			-1191,
			260
		],
		[
			180,
			1275
		],
		[
			1501,
			-89
		]
	],
	[
		[
			5607980,
			7912651
		],
		[
			-961,
			-512
		],
		[
			-1561,
			1063
		],
		[
			1140,
			520
		],
		[
			1382,
			-1071
		]
	],
	[
		[
			5603355,
			7947109
		],
		[
			29,
			-1146
		],
		[
			-1905,
			340
		],
		[
			265,
			927
		],
		[
			1611,
			-121
		]
	],
	[
		[
			6180130,
			8153798
		],
		[
			-155,
			-1046
		],
		[
			-1946,
			256
		],
		[
			913,
			1104
		],
		[
			1188,
			-314
		]
	],
	[
		[
			5681381,
			7781627
		],
		[
			-997,
			-127
		],
		[
			-326,
			744
		],
		[
			1415,
			954
		],
		[
			418,
			-625
		],
		[
			-510,
			-946
		]
	],
	[
		[
			5680404,
			7927916
		],
		[
			-170,
			-957
		],
		[
			-2203,
			1864
		],
		[
			1432,
			410
		],
		[
			-79,
			-1025
		],
		[
			1020,
			-292
		]
	],
	[
		[
			5690448,
			7783506
		],
		[
			-1078,
			-578
		],
		[
			-1113,
			1098
		],
		[
			1672,
			427
		],
		[
			519,
			-947
		]
	],
	[
		[
			5773164,
			7936534
		],
		[
			-1543,
			-1347
		],
		[
			-647,
			783
		],
		[
			871,
			933
		],
		[
			1319,
			-369
		]
	],
	[
		[
			6033095,
			8051101
		],
		[
			-605,
			-531
		],
		[
			-1241,
			1032
		],
		[
			1453,
			878
		],
		[
			393,
			-1379
		]
	],
	[
		[
			5999244,
			8026768
		],
		[
			-1102,
			-1121
		],
		[
			-1029,
			1004
		],
		[
			510,
			672
		],
		[
			1621,
			-555
		]
	],
	[
		[
			5726712,
			7869307
		],
		[
			-1322,
			-296
		],
		[
			-335,
			995
		],
		[
			427,
			701
		],
		[
			1325,
			-892
		],
		[
			-95,
			-508
		]
	],
	[
		[
			5549080,
			7891364
		],
		[
			109,
			-928
		],
		[
			-2517,
			218
		],
		[
			578,
			718
		],
		[
			1830,
			-8
		]
	],
	[
		[
			6132312,
			7706933
		],
		[
			-1240,
			-722
		],
		[
			-1103,
			871
		],
		[
			1404,
			659
		],
		[
			939,
			-808
		]
	],
	[
		[
			5663337,
			7875710
		],
		[
			-1,
			-1503
		],
		[
			-1629,
			690
		],
		[
			672,
			1061
		],
		[
			958,
			-248
		]
	],
	[
		[
			5467329,
			7925342
		],
		[
			-890,
			-372
		],
		[
			-1397,
			372
		],
		[
			1104,
			1197
		],
		[
			540,
			-289
		],
		[
			122,
			-578
		],
		[
			521,
			-330
		]
	],
	[
		[
			5571843,
			7830384
		],
		[
			-1410,
			-866
		],
		[
			-675,
			1142
		],
		[
			1401,
			503
		],
		[
			684,
			-779
		]
	],
	[
		[
			5591270,
			7907475
		],
		[
			-1406,
			-899
		],
		[
			-977,
			808
		],
		[
			1139,
			722
		],
		[
			1244,
			-631
		]
	],
	[
		[
			6077760,
			8077049
		],
		[
			-2063,
			-173
		],
		[
			-432,
			355
		],
		[
			1650,
			1012
		],
		[
			845,
			-1194
		]
	],
	[
		[
			5998572,
			7544517
		],
		[
			-273,
			-1341
		],
		[
			-1847,
			523
		],
		[
			806,
			789
		],
		[
			1314,
			29
		]
	],
	[
		[
			5781496,
			7937768
		],
		[
			-923,
			-1410
		],
		[
			-1015,
			312
		],
		[
			909,
			1501
		],
		[
			1029,
			-403
		]
	],
	[
		[
			6048352,
			8028128
		],
		[
			-1349,
			-481
		],
		[
			-651,
			1164
		],
		[
			2084,
			163
		],
		[
			-84,
			-846
		]
	],
	[
		[
			6179306,
			8150582
		],
		[
			-1490,
			-939
		],
		[
			-764,
			949
		],
		[
			1596,
			658
		],
		[
			658,
			-668
		]
	],
	[
		[
			5558587,
			7826120
		],
		[
			-199,
			-578
		],
		[
			-1625,
			6
		],
		[
			-311,
			474
		],
		[
			503,
			795
		],
		[
			1632,
			-697
		]
	],
	[
		[
			6201074,
			8185153
		],
		[
			-860,
			-550
		],
		[
			-1319,
			887
		],
		[
			1141,
			807
		],
		[
			1038,
			-1144
		]
	],
	[
		[
			5762062,
			7680941
		],
		[
			-1911,
			-303
		],
		[
			-849,
			558
		],
		[
			2055,
			647
		],
		[
			705,
			-902
		]
	],
	[
		[
			5551050,
			7892518
		],
		[
			-376,
			-1441
		],
		[
			-1624,
			412
		],
		[
			339,
			742
		],
		[
			1661,
			287
		]
	],
	[
		[
			5578922,
			7838922
		],
		[
			269,
			-1258
		],
		[
			-1967,
			386
		],
		[
			-335,
			571
		],
		[
			2033,
			301
		]
	],
	[
		[
			6010266,
			8012753
		],
		[
			-1126,
			-577
		],
		[
			-669,
			378
		],
		[
			177,
			747
		],
		[
			1472,
			437
		],
		[
			146,
			-985
		]
	],
	[
		[
			5685302,
			7912096
		],
		[
			966,
			-1320
		],
		[
			-1706,
			21
		],
		[
			-781,
			520
		],
		[
			1521,
			779
		]
	],
	[
		[
			5798420,
			7968743
		],
		[
			-1109,
			-250
		],
		[
			153,
			999
		],
		[
			1390,
			858
		],
		[
			204,
			-856
		],
		[
			-638,
			-751
		]
	],
	[
		[
			5764588,
			7934219
		],
		[
			-1118,
			-131
		],
		[
			-535,
			570
		],
		[
			1387,
			973
		],
		[
			586,
			-452
		],
		[
			-320,
			-960
		]
	],
	[
		[
			6200819,
			8182466
		],
		[
			-1738,
			-260
		],
		[
			-351,
			366
		],
		[
			1503,
			1315
		],
		[
			586,
			-1421
		]
	],
	[
		[
			6065457,
			8061444
		],
		[
			-1104,
			-614
		],
		[
			-849,
			661
		],
		[
			565,
			787
		],
		[
			1004,
			-16
		],
		[
			384,
			-818
		]
	],
	[
		[
			5803767,
			7663476
		],
		[
			-744,
			-252
		],
		[
			-649,
			695
		],
		[
			790,
			860
		],
		[
			603,
			-318
		],
		[
			558,
			-295
		],
		[
			-41,
			-514
		],
		[
			-517,
			-176
		]
	],
	[
		[
			6004230,
			8053276
		],
		[
			-1077,
			-858
		],
		[
			-1241,
			393
		],
		[
			440,
			1013
		],
		[
			1878,
			-548
		]
	],
	[
		[
			5590397,
			7919314
		],
		[
			-960,
			-1603
		],
		[
			-809,
			1264
		],
		[
			447,
			719
		],
		[
			1322,
			-380
		]
	],
	[
		[
			5875768,
			7992056
		],
		[
			-441,
			-728
		],
		[
			-1641,
			823
		],
		[
			1367,
			934
		],
		[
			715,
			-1029
		]
	],
	[
		[
			6193579,
			8190055
		],
		[
			-440,
			-715
		],
		[
			-1745,
			889
		],
		[
			1486,
			794
		],
		[
			699,
			-968
		]
	],
	[
		[
			6218749,
			8205045
		],
		[
			-1269,
			-950
		],
		[
			-798,
			938
		],
		[
			575,
			818
		],
		[
			1492,
			-806
		]
	],
	[
		[
			5666951,
			7874322
		],
		[
			-1315,
			-358
		],
		[
			-684,
			809
		],
		[
			86,
			552
		],
		[
			444,
			384
		],
		[
			1469,
			-1387
		]
	],
	[
		[
			5619390,
			7931890
		],
		[
			-1050,
			-113
		],
		[
			-608,
			844
		],
		[
			998,
			701
		],
		[
			876,
			-712
		],
		[
			-216,
			-720
		]
	],
	[
		[
			6057024,
			8054648
		],
		[
			371,
			-1476
		],
		[
			-1514,
			49
		],
		[
			-420,
			712
		],
		[
			1563,
			715
		]
	],
	[
		[
			5677100,
			7789372
		],
		[
			-655,
			-605
		],
		[
			-1291,
			917
		],
		[
			331,
			1102
		],
		[
			1615,
			-1414
		]
	],
	[
		[
			5763229,
			7605731
		],
		[
			-1134,
			-117
		],
		[
			-1170,
			774
		],
		[
			843,
			541
		],
		[
			1351,
			-548
		],
		[
			110,
			-650
		]
	],
	[
		[
			5768444,
			7940876
		],
		[
			-1071,
			-25
		],
		[
			-60,
			977
		],
		[
			572,
			421
		],
		[
			1395,
			-634
		],
		[
			-836,
			-739
		]
	],
	[
		[
			6179529,
			8141514
		],
		[
			-342,
			-858
		],
		[
			-860,
			140
		],
		[
			-459,
			1245
		],
		[
			844,
			347
		],
		[
			817,
			-874
		]
	],
	[
		[
			6018198,
			8023936
		],
		[
			-1260,
			-671
		],
		[
			-915,
			828
		],
		[
			1828,
			775
		],
		[
			347,
			-932
		]
	],
	[
		[
			5673603,
			7787432
		],
		[
			-1328,
			-469
		],
		[
			-558,
			1114
		],
		[
			1327,
			549
		],
		[
			559,
			-1194
		]
	],
	[
		[
			6005892,
			8018673
		],
		[
			-768,
			-686
		],
		[
			-1369,
			384
		],
		[
			339,
			605
		],
		[
			1481,
			421
		],
		[
			317,
			-724
		]
	],
	[
		[
			5682357,
			7928905
		],
		[
			-1063,
			-684
		],
		[
			-1196,
			433
		],
		[
			1177,
			1172
		],
		[
			1082,
			-921
		]
	],
	[
		[
			5788378,
			7308172
		],
		[
			-1631,
			-336
		],
		[
			-372,
			381
		],
		[
			496,
			745
		],
		[
			1179,
			293
		],
		[
			328,
			-1083
		]
	],
	[
		[
			5741007,
			7702789
		],
		[
			-933,
			-1788
		],
		[
			-1113,
			397
		],
		[
			1365,
			1549
		],
		[
			681,
			-158
		]
	],
	[
		[
			5452920,
			7921361
		],
		[
			-1955,
			-482
		],
		[
			-334,
			726
		],
		[
			2212,
			660
		],
		[
			77,
			-904
		]
	],
	[
		[
			5708158,
			7785623
		],
		[
			-393,
			-823
		],
		[
			-2359,
			637
		],
		[
			496,
			557
		],
		[
			2256,
			-371
		]
	],
	[
		[
			6180028,
			8173996
		],
		[
			-1805,
			-100
		],
		[
			-240,
			821
		],
		[
			1953,
			351
		],
		[
			92,
			-1072
		]
	],
	[
		[
			6181424,
			8135703
		],
		[
			-469,
			-332
		],
		[
			-1979,
			266
		],
		[
			711,
			1183
		],
		[
			1737,
			-1117
		]
	],
	[
		[
			5651144,
			7889730
		],
		[
			-802,
			-347
		],
		[
			-1005,
			1580
		],
		[
			1298,
			230
		],
		[
			509,
			-1463
		]
	],
	[
		[
			5733281,
			8052078
		],
		[
			143,
			-1462
		],
		[
			-1747,
			-187
		],
		[
			-407,
			791
		],
		[
			943,
			-39
		],
		[
			1068,
			897
		]
	],
	[
		[
			5624693,
			7961053
		],
		[
			-714,
			-462
		],
		[
			-1076,
			900
		],
		[
			604,
			761
		],
		[
			824,
			-104
		],
		[
			362,
			-1095
		]
	],
	[
		[
			6059098,
			8042193
		],
		[
			-1128,
			-1282
		],
		[
			-848,
			1145
		],
		[
			355,
			658
		],
		[
			1621,
			-521
		]
	],
	[
		[
			5744176,
			7761579
		],
		[
			-1466,
			-619
		],
		[
			-938,
			386
		],
		[
			950,
			1125
		],
		[
			1454,
			-892
		]
	],
	[
		[
			5735602,
			7912481
		],
		[
			-290,
			-1355
		],
		[
			-2044,
			635
		],
		[
			275,
			375
		],
		[
			2059,
			345
		]
	],
	[
		[
			5622142,
			7961633
		],
		[
			-704,
			-95
		],
		[
			-1424,
			1076
		],
		[
			481,
			501
		],
		[
			1132,
			-290
		],
		[
			515,
			-1192
		]
	],
	[
		[
			6393794,
			7310889
		],
		[
			-1354,
			-641
		],
		[
			-1128,
			763
		],
		[
			1979,
			658
		],
		[
			503,
			-780
		]
	],
	[
		[
			6236985,
			8213431
		],
		[
			-901,
			-798
		],
		[
			-781,
			443
		],
		[
			831,
			950
		],
		[
			851,
			-595
		]
	],
	[
		[
			5892769,
			7185300
		],
		[
			-569,
			-959
		],
		[
			-720,
			242
		],
		[
			3,
			674
		],
		[
			1053,
			525
		],
		[
			233,
			-482
		]
	],
	[
		[
			6236343,
			8214182
		],
		[
			-264,
			-173
		],
		[
			-601,
			305
		],
		[
			374,
			492
		],
		[
			477,
			-101
		],
		[
			14,
			-523
		]
	],
	[
		[
			6180449,
			8141504
		],
		[
			-424,
			-660
		],
		[
			-554,
			497
		],
		[
			479,
			418
		],
		[
			499,
			-255
		]
	]
];
var NUTS_RG_03M_2016_4326_LEVL_0_UK = {
	type: type$2,
	transform: transform$1,
	objects: objects$1,
	arcs: arcs$1
};

var type$3 = "Topology";
var transform$2 = {
	scale: [
		0.00001,
		0.00001
	],
	translate: [
		-63.15176,
		-21.38696
	]
};
var objects$2 = {
	NUTS: {
		type: "GeometryCollection",
		geometries: [
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							3,
							4,
							5,
							6
						]
					],
					[
						[
							7
						]
					],
					[
						[
							8
						]
					],
					[
						[
							9
						]
					],
					[
						[
							10
						]
					],
					[
						[
							11
						]
					],
					[
						[
							12
						]
					],
					[
						[
							13
						]
					],
					[
						[
							14
						]
					],
					[
						[
							15
						]
					],
					[
						[
							16
						]
					],
					[
						[
							17
						]
					],
					[
						[
							18
						]
					],
					[
						[
							19
						]
					],
					[
						[
							20
						]
					],
					[
						[
							21
						]
					],
					[
						[
							22
						]
					],
					[
						[
							23
						]
					],
					[
						[
							24
						]
					],
					[
						[
							25
						]
					],
					[
						[
							26
						]
					],
					[
						[
							27
						]
					],
					[
						[
							28
						]
					],
					[
						[
							29
						]
					],
					[
						[
							30
						]
					],
					[
						[
							31
						]
					],
					[
						[
							32
						]
					],
					[
						[
							33
						]
					],
					[
						[
							34
						]
					],
					[
						[
							35
						]
					],
					[
						[
							36
						]
					],
					[
						[
							37
						]
					],
					[
						[
							38
						]
					],
					[
						[
							39
						]
					],
					[
						[
							40
						]
					],
					[
						[
							41
						]
					],
					[
						[
							42
						]
					],
					[
						[
							43
						]
					],
					[
						[
							44
						]
					],
					[
						[
							45
						]
					],
					[
						[
							46
						]
					],
					[
						[
							47
						]
					],
					[
						[
							48
						]
					],
					[
						[
							49
						]
					],
					[
						[
							50
						]
					],
					[
						[
							51
						]
					],
					[
						[
							52
						]
					],
					[
						[
							53
						]
					],
					[
						[
							54
						]
					],
					[
						[
							55
						]
					],
					[
						[
							56
						]
					],
					[
						[
							57
						]
					],
					[
						[
							58
						]
					],
					[
						[
							59
						]
					],
					[
						[
							60
						]
					],
					[
						[
							61
						]
					],
					[
						[
							62
						]
					],
					[
						[
							63
						]
					],
					[
						[
							64
						]
					],
					[
						[
							65
						]
					],
					[
						[
							66
						]
					],
					[
						[
							67
						]
					],
					[
						[
							68
						]
					],
					[
						[
							69
						]
					],
					[
						[
							70
						]
					],
					[
						[
							71
						]
					],
					[
						[
							72
						]
					],
					[
						[
							73
						]
					],
					[
						[
							74
						]
					],
					[
						[
							75
						]
					],
					[
						[
							76
						]
					],
					[
						[
							77
						]
					],
					[
						[
							78
						]
					],
					[
						[
							79
						]
					],
					[
						[
							80
						]
					],
					[
						[
							81
						]
					],
					[
						[
							82
						]
					],
					[
						[
							83
						]
					],
					[
						[
							84
						]
					],
					[
						[
							85
						]
					],
					[
						[
							86
						]
					],
					[
						[
							87
						]
					],
					[
						[
							88
						]
					],
					[
						[
							89
						]
					],
					[
						[
							90
						]
					],
					[
						[
							91
						]
					],
					[
						[
							92
						]
					],
					[
						[
							93
						]
					],
					[
						[
							94
						]
					],
					[
						[
							95
						]
					],
					[
						[
							96
						]
					],
					[
						[
							97
						]
					],
					[
						[
							98
						]
					],
					[
						[
							99
						]
					],
					[
						[
							100
						]
					],
					[
						[
							101
						]
					],
					[
						[
							102
						]
					],
					[
						[
							103
						]
					],
					[
						[
							104
						]
					],
					[
						[
							105
						]
					],
					[
						[
							106
						]
					],
					[
						[
							107
						]
					],
					[
						[
							108
						]
					],
					[
						[
							109
						]
					],
					[
						[
							110
						]
					],
					[
						[
							111
						]
					],
					[
						[
							112
						]
					],
					[
						[
							113
						]
					],
					[
						[
							114
						]
					],
					[
						[
							115
						]
					],
					[
						[
							116
						]
					],
					[
						[
							117
						]
					],
					[
						[
							118
						]
					],
					[
						[
							119
						]
					],
					[
						[
							120
						]
					],
					[
						[
							121
						]
					],
					[
						[
							122
						]
					],
					[
						[
							123
						]
					],
					[
						[
							124
						]
					],
					[
						[
							125
						]
					],
					[
						[
							126
						]
					],
					[
						[
							127
						]
					],
					[
						[
							128
						]
					],
					[
						[
							129
						]
					],
					[
						[
							130
						]
					],
					[
						[
							131
						]
					],
					[
						[
							132
						]
					],
					[
						[
							133
						]
					],
					[
						[
							134
						]
					],
					[
						[
							135
						]
					],
					[
						[
							136
						]
					],
					[
						[
							137
						]
					],
					[
						[
							138
						]
					],
					[
						[
							139
						]
					],
					[
						[
							140
						]
					],
					[
						[
							141
						]
					],
					[
						[
							142
						]
					],
					[
						[
							143
						]
					],
					[
						[
							144
						]
					],
					[
						[
							145
						]
					],
					[
						[
							146
						]
					],
					[
						[
							147
						]
					],
					[
						[
							148
						]
					],
					[
						[
							149
						]
					],
					[
						[
							150
						]
					],
					[
						[
							151
						]
					],
					[
						[
							152
						]
					],
					[
						[
							153
						]
					],
					[
						[
							154
						]
					],
					[
						[
							155
						]
					],
					[
						[
							156
						]
					],
					[
						[
							157
						]
					],
					[
						[
							158
						]
					],
					[
						[
							159
						]
					],
					[
						[
							160
						]
					],
					[
						[
							161
						]
					],
					[
						[
							162
						]
					],
					[
						[
							163
						]
					],
					[
						[
							164
						]
					],
					[
						[
							165
						]
					],
					[
						[
							166
						]
					],
					[
						[
							167
						]
					],
					[
						[
							168
						]
					],
					[
						[
							169
						]
					],
					[
						[
							170
						]
					],
					[
						[
							171
						]
					]
				],
				id: "UKM",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKM",
					CNTR_CODE: "UK",
					NUTS_NAME: "SCOTLAND",
					FID: "UKM"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							172,
							173,
							174,
							175
						]
					],
					[
						[
							176
						]
					],
					[
						[
							177
						]
					],
					[
						[
							178
						]
					],
					[
						[
							179
						]
					],
					[
						[
							180
						]
					],
					[
						[
							181
						]
					],
					[
						[
							182
						]
					],
					[
						[
							183
						]
					]
				],
				id: "UKK",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKK",
					CNTR_CODE: "UK",
					NUTS_NAME: "SOUTH WEST (ENGLAND)",
					FID: "UKK"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							184,
							185,
							-175,
							186
						]
					],
					[
						[
							187
						]
					],
					[
						[
							188
						]
					],
					[
						[
							189
						]
					],
					[
						[
							190
						]
					],
					[
						[
							191
						]
					],
					[
						[
							192
						]
					]
				],
				id: "UKL",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKL",
					CNTR_CODE: "UK",
					NUTS_NAME: "WALES",
					FID: "UKL"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							193,
							194,
							195,
							196,
							-185,
							197,
							-6,
							198
						]
					],
					[
						[
							199
						]
					],
					[
						[
							200
						]
					]
				],
				id: "UKD",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKD",
					CNTR_CODE: "UK",
					NUTS_NAME: "NORTH WEST (ENGLAND)",
					FID: "UKD"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						201,
						202,
						-195,
						203
					]
				],
				id: "UKE",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKE",
					CNTR_CODE: "UK",
					NUTS_NAME: "YORKSHIRE AND THE HUMBER",
					FID: "UKE"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						204,
						205,
						206,
						207,
						-196,
						-203
					]
				],
				id: "UKF",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKF",
					CNTR_CODE: "UK",
					NUTS_NAME: "EAST MIDLANDS (ENGLAND)",
					FID: "UKF"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							208,
							-1,
							-2,
							209
						],
						[
							-3
						]
					],
					[
						[
							210
						]
					],
					[
						[
							211
						]
					],
					[
						[
							212
						]
					]
				],
				id: "UKN",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKN",
					CNTR_CODE: "UK",
					NUTS_NAME: "NORTHERN IRELAND",
					FID: "UKN"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							213,
							-204,
							-194,
							-199,
							-5,
							214
						]
					],
					[
						[
							215
						]
					],
					[
						[
							216
						]
					]
				],
				id: "UKC",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKC",
					CNTR_CODE: "UK",
					NUTS_NAME: "NORTH EAST (ENGLAND)",
					FID: "UKC"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-208,
						217,
						-176,
						-186,
						-197
					]
				],
				id: "UKG",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKG",
					CNTR_CODE: "UK",
					NUTS_NAME: "WEST MIDLANDS (ENGLAND)",
					FID: "UKG"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							218,
							219,
							220,
							-206,
							221
						]
					],
					[
						[
							222
						]
					]
				],
				id: "UKH",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKH",
					CNTR_CODE: "UK",
					NUTS_NAME: "EAST OF ENGLAND",
					FID: "UKH"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-220,
						223,
						224
					]
				],
				id: "UKI",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKI",
					CNTR_CODE: "UK",
					NUTS_NAME: "LONDON",
					FID: "UKI"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-221,
							-225,
							225,
							-173,
							-218,
							-207
						]
					],
					[
						[
							226
						]
					],
					[
						[
							227
						]
					],
					[
						[
							228
						]
					]
				],
				id: "UKJ",
				properties: {
					LEVL_CODE: 1,
					NUTS_ID: "UKJ",
					CNTR_CODE: "UK",
					NUTS_NAME: "SOUTH EAST (ENGLAND)",
					FID: "UKJ"
				}
			}
		]
	}
};
var arcs$2 = [
	[
		[
			5544835,
			7599525
		],
		[
			-8305,
			-2743
		],
		[
			-6357,
			-4403
		],
		[
			-8701,
			-255
		],
		[
			-6227,
			952
		],
		[
			-1658,
			-1811
		],
		[
			-3259,
			-3561
		],
		[
			-11175,
			-2531
		],
		[
			1098,
			-1359
		],
		[
			-217,
			-1427
		],
		[
			5374,
			-3152
		],
		[
			4330,
			-3741
		],
		[
			5159,
			-1243
		],
		[
			2127,
			-1947
		],
		[
			2982,
			-2731
		],
		[
			7921,
			-1843
		],
		[
			1787,
			-6802
		],
		[
			891,
			-881
		],
		[
			3253,
			-1077
		],
		[
			12045,
			196
		],
		[
			1868,
			-1998
		],
		[
			4146,
			-1454
		],
		[
			2020,
			-2415
		],
		[
			3372,
			-629
		],
		[
			2394,
			-1508
		],
		[
			2884,
			878
		],
		[
			4459,
			-956
		],
		[
			3095,
			2393
		],
		[
			3667,
			721
		],
		[
			-734,
			-1500
		],
		[
			3910,
			-121
		],
		[
			-608,
			-1488
		],
		[
			2616,
			518
		],
		[
			4318,
			-1274
		],
		[
			3798,
			799
		],
		[
			2464,
			3040
		],
		[
			529,
			1647
		],
		[
			-608,
			1692
		],
		[
			1742,
			1771
		],
		[
			9199,
			2155
		],
		[
			-80,
			2994
		],
		[
			-2634,
			1621
		],
		[
			-249,
			1196
		],
		[
			-3128,
			1323
		],
		[
			2781,
			1519
		],
		[
			-745,
			2214
		],
		[
			3706,
			207
		],
		[
			3466,
			1433
		],
		[
			5572,
			5250
		],
		[
			3246,
			1313
		],
		[
			10513,
			-3958
		],
		[
			2067,
			-2481
		],
		[
			3198,
			-1764
		],
		[
			606,
			-591
		],
		[
			960,
			-3903
		],
		[
			-1993,
			-1302
		],
		[
			4231,
			-1529
		],
		[
			1731,
			-3672
		],
		[
			2061,
			-1610
		],
		[
			5690,
			-2623
		],
		[
			4047,
			1562
		],
		[
			5305,
			-1938
		],
		[
			1058,
			-2885
		],
		[
			-2410,
			-3261
		],
		[
			837,
			-1908
		],
		[
			-844,
			-1843
		],
		[
			-510,
			-1115
		],
		[
			3483,
			-2824
		],
		[
			3278,
			301
		],
		[
			1573,
			1006
		],
		[
			6793,
			133
		],
		[
			3680,
			1668
		],
		[
			1784,
			-652
		],
		[
			1802,
			-659
		],
		[
			4285,
			185
		],
		[
			3181,
			1957
		],
		[
			426,
			3113
		],
		[
			1676,
			-171
		],
		[
			1903,
			-1739
		],
		[
			3205,
			1850
		],
		[
			2389,
			-924
		]
	],
	[
		[
			5589569,
			7645399
		],
		[
			-3237,
			-1517
		],
		[
			-6030,
			-637
		],
		[
			-4159,
			-2718
		],
		[
			-1545,
			-6867
		],
		[
			-3969,
			-2580
		],
		[
			-402,
			-5650
		],
		[
			-3498,
			-4053
		],
		[
			-5485,
			-3279
		],
		[
			-1043,
			-4738
		],
		[
			-9177,
			75
		],
		[
			-10790,
			-3856
		],
		[
			-8046,
			2269
		],
		[
			-2015,
			-761
		],
		[
			-6146,
			-3088
		],
		[
			1129,
			-2664
		],
		[
			5017,
			-2776
		],
		[
			4047,
			-71
		],
		[
			5713,
			-1493
		],
		[
			3836,
			503
		],
		[
			1066,
			-1973
		]
	],
	[
		[
			5586561,
			7552716
		],
		[
			-667,
			-860
		],
		[
			-1941,
			-157
		],
		[
			-704,
			724
		],
		[
			-795,
			-110
		],
		[
			-1083,
			965
		],
		[
			1232,
			535
		],
		[
			1570,
			1496
		],
		[
			1935,
			445
		],
		[
			915,
			-415
		],
		[
			-370,
			-1304
		],
		[
			-1017,
			-590
		],
		[
			925,
			-729
		]
	],
	[
		[
			5871971,
			7888131
		],
		[
			6520,
			-1353
		],
		[
			7540,
			119
		],
		[
			6895,
			1173
		],
		[
			4371,
			-564
		],
		[
			2134,
			1550
		],
		[
			1444,
			1048
		],
		[
			2550,
			532
		],
		[
			6763,
			3792
		],
		[
			474,
			1221
		],
		[
			-1372,
			1349
		],
		[
			1031,
			781
		],
		[
			4562,
			908
		],
		[
			7607,
			-1201
		],
		[
			6972,
			574
		],
		[
			7683,
			3254
		],
		[
			11886,
			3472
		],
		[
			2975,
			-197
		],
		[
			652,
			-2067
		],
		[
			3018,
			-381
		],
		[
			717,
			767
		],
		[
			-767,
			1905
		],
		[
			5764,
			467
		],
		[
			1284,
			104
		],
		[
			2260,
			1014
		],
		[
			2209,
			2398
		],
		[
			10047,
			1874
		],
		[
			8963,
			267
		],
		[
			15959,
			-4271
		],
		[
			10489,
			-1460
		],
		[
			6007,
			1559
		],
		[
			8736,
			2266
		],
		[
			7681,
			-810
		],
		[
			6336,
			-1019
		],
		[
			8430,
			260
		],
		[
			14221,
			-2014
		],
		[
			15797,
			489
		],
		[
			5557,
			1887
		],
		[
			10793,
			-1647
		],
		[
			7342,
			2259
		],
		[
			10392,
			-89
		],
		[
			3136,
			-1617
		],
		[
			5640,
			-819
		],
		[
			4492,
			-3529
		],
		[
			4631,
			-2286
		],
		[
			3171,
			-8286
		],
		[
			2330,
			-2754
		],
		[
			-1121,
			-1100
		],
		[
			805,
			-2874
		],
		[
			-4301,
			-4222
		],
		[
			-2954,
			-1583
		],
		[
			-1952,
			-2369
		],
		[
			-11727,
			-6255
		],
		[
			-456,
			-1881
		],
		[
			-4700,
			-5877
		],
		[
			-2538,
			-4901
		],
		[
			-595,
			-1149
		],
		[
			-127,
			-2251
		],
		[
			722,
			-887
		],
		[
			1120,
			-1374
		],
		[
			-45,
			-1626
		],
		[
			-1075,
			-1410
		],
		[
			-3050,
			-4000
		],
		[
			-5551,
			-4549
		],
		[
			-2230,
			-2564
		],
		[
			-2272,
			-2611
		],
		[
			-45,
			-5738
		],
		[
			-2012,
			-3328
		],
		[
			-9925,
			-7684
		],
		[
			-8595,
			-3132
		],
		[
			-2028,
			-1476
		],
		[
			-2379,
			-4638
		],
		[
			939,
			-1189
		],
		[
			-302,
			-1029
		],
		[
			-6125,
			-3147
		],
		[
			256,
			-2093
		],
		[
			1711,
			-834
		],
		[
			-465,
			-1032
		],
		[
			-5518,
			-5053
		],
		[
			-7576,
			-2315
		],
		[
			-7223,
			-3576
		],
		[
			-1762,
			-873
		],
		[
			-2750,
			-3171
		],
		[
			-6763,
			1389
		],
		[
			-6237,
			-1514
		],
		[
			-6918,
			3
		],
		[
			-2921,
			-685
		],
		[
			-2475,
			-581
		],
		[
			-6146,
			669
		],
		[
			-7926,
			-3128
		],
		[
			-8156,
			-4894
		],
		[
			-6507,
			-1809
		],
		[
			80,
			-966
		],
		[
			8279,
			1445
		],
		[
			27855,
			8351
		],
		[
			8566,
			-674
		],
		[
			1506,
			-650
		],
		[
			408,
			-1553
		],
		[
			-769,
			-2359
		],
		[
			-2758,
			-3290
		],
		[
			3227,
			-588
		],
		[
			4996,
			-2398
		],
		[
			7171,
			-1140
		],
		[
			1991,
			-533
		],
		[
			6572,
			-4000
		],
		[
			-8563,
			-5244
		],
		[
			-11052,
			-3394
		],
		[
			-6082,
			54
		],
		[
			-5995,
			1786
		],
		[
			-4433,
			-432
		],
		[
			-17776,
			-9001
		],
		[
			-3455,
			-4812
		],
		[
			-9757,
			-1036
		],
		[
			-9720,
			-2930
		],
		[
			-2285,
			-1440
		],
		[
			-14014,
			3386
		],
		[
			-4004,
			967
		],
		[
			-10991,
			-490
		],
		[
			-11059,
			5533
		],
		[
			-6844,
			1455
		],
		[
			56,
			-1195
		],
		[
			2066,
			713
		],
		[
			2547,
			-1672
		],
		[
			1945,
			404
		],
		[
			6296,
			-3826
		],
		[
			2116,
			-3729
		],
		[
			2848,
			757
		],
		[
			2164,
			-2115
		],
		[
			6739,
			526
		],
		[
			6121,
			-1251
		],
		[
			2214,
			-452
		],
		[
			535,
			-228
		],
		[
			8504,
			-595
		],
		[
			3387,
			-325
		],
		[
			3958,
			860
		],
		[
			6554,
			-1985
		],
		[
			10953,
			829
		],
		[
			4672,
			-2345
		],
		[
			1138,
			-592
		],
		[
			2340,
			-882
		],
		[
			1766,
			-273
		],
		[
			11197,
			2064
		],
		[
			5218,
			961
		],
		[
			1812,
			1058
		],
		[
			541,
			1225
		],
		[
			426,
			964
		],
		[
			2757,
			503
		],
		[
			-484,
			2076
		],
		[
			4792,
			2568
		],
		[
			2814,
			368
		],
		[
			9475,
			-332
		],
		[
			2056,
			-72
		],
		[
			3962,
			-898
		],
		[
			4502,
			-3144
		],
		[
			-835,
			-1967
		],
		[
			2551,
			700
		],
		[
			2061,
			-659
		],
		[
			3243,
			397
		],
		[
			1851,
			-504
		],
		[
			5421,
			-1477
		],
		[
			7743,
			-3910
		],
		[
			4758,
			-1572
		],
		[
			10525,
			-36
		],
		[
			7017,
			-1426
		],
		[
			1883,
			-2874
		],
		[
			4455,
			-1617
		],
		[
			1197,
			-2592
		],
		[
			3394,
			-3378
		]
	],
	[
		[
			6111743,
			7719812
		],
		[
			-3394,
			-1267
		],
		[
			-1302,
			-745
		],
		[
			-1149,
			-3005
		],
		[
			-7305,
			-3798
		],
		[
			-1057,
			-1963
		],
		[
			-6484,
			-5281
		],
		[
			177,
			-733
		],
		[
			-6723,
			293
		],
		[
			-2438,
			-1005
		],
		[
			3709,
			-3090
		],
		[
			822,
			-2265
		],
		[
			4796,
			-3355
		],
		[
			1313,
			-4057
		],
		[
			2411,
			-2943
		],
		[
			2414,
			-881
		],
		[
			-2099,
			-2597
		],
		[
			-13414,
			-3703
		],
		[
			-947,
			-842
		],
		[
			749,
			-1531
		],
		[
			-837,
			-1682
		],
		[
			-3964,
			-1651
		],
		[
			-5999,
			818
		],
		[
			-4680,
			-817
		],
		[
			-2836,
			-2383
		],
		[
			-3568,
			-981
		],
		[
			-5934,
			-3641
		],
		[
			-2203,
			-2168
		],
		[
			670,
			-1057
		],
		[
			-840,
			-2229
		],
		[
			-3415,
			-881
		],
		[
			-2015,
			-2770
		]
	],
	[
		[
			6046201,
			7657602
		],
		[
			-2776,
			-1975
		],
		[
			-10531,
			-3370
		],
		[
			-3569,
			-2719
		],
		[
			-9814,
			-5637
		],
		[
			-903,
			10
		],
		[
			-7876,
			86
		],
		[
			1425,
			-2130
		],
		[
			-2718,
			-4481
		]
	],
	[
		[
			6009439,
			7637386
		],
		[
			-9296,
			-2049
		],
		[
			-5673,
			816
		],
		[
			-6785,
			-639
		],
		[
			-5124,
			818
		],
		[
			-4812,
			-377
		],
		[
			-6045,
			1495
		],
		[
			-3818,
			-1803
		],
		[
			-3916,
			-284
		],
		[
			-4130,
			1088
		],
		[
			-2738,
			2543
		],
		[
			-530,
			-6398
		],
		[
			1675,
			-3094
		],
		[
			-2767,
			-3002
		],
		[
			-10449,
			561
		],
		[
			-7740,
			-2642
		],
		[
			-4130,
			2786
		],
		[
			-74,
			-2990
		],
		[
			-2118,
			510
		],
		[
			-959,
			-1577
		],
		[
			1470,
			-1657
		],
		[
			-386,
			-873
		],
		[
			-14423,
			-4814
		],
		[
			-6983,
			853
		],
		[
			-543,
			1123
		],
		[
			715,
			2374
		],
		[
			-1332,
			1692
		],
		[
			-2024,
			-1874
		],
		[
			-1045,
			-3849
		],
		[
			-5869,
			812
		],
		[
			-5632,
			4020
		],
		[
			-562,
			3581
		],
		[
			-4584,
			-1848
		],
		[
			-3710,
			420
		],
		[
			-6070,
			2168
		],
		[
			-3565,
			3151
		],
		[
			-2649,
			-2397
		],
		[
			878,
			-3534
		],
		[
			6643,
			-3663
		],
		[
			-1685,
			-2143
		],
		[
			635,
			-2073
		],
		[
			-120,
			-736
		],
		[
			-355,
			-2194
		],
		[
			883,
			-2229
		],
		[
			-3883,
			-2743
		],
		[
			-12245,
			3291
		],
		[
			-5262,
			2694
		],
		[
			-1139,
			1181
		],
		[
			-2128,
			2207
		],
		[
			-10642,
			4797
		],
		[
			-6532,
			973
		],
		[
			-4084,
			2858
		],
		[
			-2781,
			531
		],
		[
			-9191,
			-3412
		],
		[
			-2114,
			-2205
		],
		[
			2731,
			-5749
		],
		[
			2212,
			-4658
		],
		[
			3053,
			-2457
		],
		[
			-619,
			-4150
		],
		[
			-4526,
			769
		],
		[
			-3297,
			1748
		],
		[
			-857,
			1629
		],
		[
			1313,
			2133
		],
		[
			-845,
			2387
		],
		[
			-2445,
			1024
		],
		[
			-811,
			1414
		],
		[
			-2060,
			3092
		],
		[
			-12144,
			7295
		],
		[
			-4482,
			6846
		],
		[
			34,
			4817
		],
		[
			981,
			2037
		],
		[
			6643,
			2287
		],
		[
			3117,
			-2619
		],
		[
			1588,
			-6053
		],
		[
			2892,
			-1674
		],
		[
			2183,
			228
		],
		[
			777,
			2440
		],
		[
			-3981,
			6053
		],
		[
			-1618,
			2726
		],
		[
			455,
			2209
		],
		[
			3981,
			4768
		],
		[
			1634,
			3266
		],
		[
			811,
			1621
		],
		[
			3519,
			1820
		],
		[
			8657,
			6299
		],
		[
			2858,
			5903
		],
		[
			-505,
			4049
		],
		[
			6746,
			3845
		],
		[
			1197,
			4330
		],
		[
			3476,
			2131
		],
		[
			7938,
			1908
		],
		[
			2599,
			5432
		],
		[
			-916,
			1780
		],
		[
			-4425,
			2564
		],
		[
			1510,
			676
		],
		[
			279,
			1929
		],
		[
			-5097,
			4081
		],
		[
			-10484,
			2849
		],
		[
			-1286,
			1098
		],
		[
			-7128,
			5363
		],
		[
			344,
			2164
		],
		[
			3476,
			3805
		],
		[
			-2648,
			5980
		],
		[
			-286,
			5204
		],
		[
			-388,
			1441
		],
		[
			1893,
			4991
		],
		[
			5135,
			1914
		],
		[
			3207,
			225
		],
		[
			12055,
			-2747
		],
		[
			19157,
			-1151
		],
		[
			12032,
			-4673
		],
		[
			-518,
			399
		],
		[
			-2878,
			996
		],
		[
			-8402,
			3703
		],
		[
			-21613,
			4202
		],
		[
			-1426,
			2379
		],
		[
			-2094,
			746
		],
		[
			-5629,
			2005
		],
		[
			-4680,
			5406
		],
		[
			-717,
			-1426
		],
		[
			967,
			-2041
		],
		[
			4407,
			-3944
		],
		[
			686,
			-614
		],
		[
			-3291,
			-965
		],
		[
			-3908,
			890
		],
		[
			-252,
			689
		],
		[
			-2293,
			6270
		],
		[
			6868,
			8487
		],
		[
			5753,
			5578
		],
		[
			-3559,
			-2076
		],
		[
			-4658,
			-5212
		],
		[
			-2915,
			-2015
		],
		[
			-1884,
			413
		],
		[
			-1237,
			3210
		],
		[
			-1553,
			743
		],
		[
			334,
			-3542
		],
		[
			1819,
			-2932
		],
		[
			-2096,
			-4165
		],
		[
			362,
			-4759
		],
		[
			-2525,
			-1463
		],
		[
			399,
			-3381
		],
		[
			-6215,
			-7893
		],
		[
			-4743,
			1075
		],
		[
			-4848,
			6521
		],
		[
			-983,
			-3010
		],
		[
			-1643,
			-714
		],
		[
			-8558,
			3491
		],
		[
			-2944,
			-4481
		],
		[
			1107,
			-5157
		],
		[
			-760,
			-1095
		],
		[
			-8313,
			1913
		],
		[
			-3449,
			4510
		],
		[
			34,
			7181
		],
		[
			1378,
			2503
		],
		[
			2690,
			3783
		],
		[
			9616,
			8365
		],
		[
			9351,
			4072
		],
		[
			8812,
			6779
		],
		[
			260,
			636
		],
		[
			-807,
			141
		],
		[
			-3832,
			-660
		],
		[
			-5487,
			-4858
		],
		[
			-10735,
			-5427
		],
		[
			-9651,
			-6571
		],
		[
			-4750,
			-4347
		],
		[
			-6869,
			-880
		],
		[
			-94,
			-1033
		],
		[
			-205,
			-3562
		],
		[
			1668,
			-4533
		],
		[
			7924,
			-9486
		],
		[
			1365,
			-4448
		],
		[
			-1381,
			-1534
		],
		[
			-7910,
			-4181
		],
		[
			-4330,
			-6785
		],
		[
			-1013,
			-8086
		],
		[
			-3813,
			-7527
		],
		[
			-5410,
			-6829
		],
		[
			2804,
			-3700
		],
		[
			-274,
			-4429
		],
		[
			-2423,
			-2092
		],
		[
			-3815,
			-1540
		],
		[
			-14792,
			-1504
		],
		[
			-3279,
			1449
		],
		[
			-471,
			6468
		],
		[
			6837,
			7633
		],
		[
			1441,
			11185
		],
		[
			4634,
			11049
		],
		[
			9944,
			9348
		],
		[
			-4237,
			1022
		],
		[
			-4496,
			3515
		],
		[
			285,
			4057
		],
		[
			2963,
			5293
		],
		[
			-4296,
			-191
		],
		[
			-962,
			1262
		],
		[
			5962,
			8146
		],
		[
			415,
			702
		],
		[
			-346,
			342
		],
		[
			-1448,
			-313
		],
		[
			-868,
			-731
		],
		[
			-4381,
			-4086
		],
		[
			-922,
			725
		],
		[
			2699,
			3361
		],
		[
			5402,
			6625
		],
		[
			5721,
			2976
		],
		[
			-413,
			2936
		],
		[
			822,
			3063
		],
		[
			-3496,
			1235
		],
		[
			3224,
			7646
		],
		[
			-5654,
			2993
		],
		[
			-2585,
			-5426
		],
		[
			-1280,
			-590
		],
		[
			-924,
			2434
		],
		[
			1450,
			5502
		],
		[
			2383,
			2380
		],
		[
			6999,
			3208
		],
		[
			6835,
			7820
		],
		[
			5429,
			3006
		],
		[
			165,
			1860
		],
		[
			-2265,
			1787
		],
		[
			556,
			1912
		],
		[
			13277,
			13623
		],
		[
			9557,
			3842
		],
		[
			-1982,
			3076
		],
		[
			10056,
			8889
		],
		[
			772,
			1840
		],
		[
			-1393,
			-14
		],
		[
			-8574,
			-5577
		],
		[
			-4463,
			-5283
		],
		[
			-5097,
			-1670
		],
		[
			-8716,
			-5012
		],
		[
			-9136,
			-3740
		],
		[
			-8795,
			-7340
		],
		[
			-10068,
			-3199
		],
		[
			-5727,
			1347
		],
		[
			-3132,
			1936
		],
		[
			-13096,
			1622
		],
		[
			-5731,
			3312
		],
		[
			-2811,
			2918
		],
		[
			377,
			2302
		],
		[
			6241,
			2064
		],
		[
			166,
			976
		],
		[
			-14008,
			1752
		],
		[
			-10763,
			132
		],
		[
			-3873,
			2245
		],
		[
			2528,
			3203
		],
		[
			5129,
			1518
		],
		[
			15921,
			1405
		],
		[
			9507,
			-1497
		],
		[
			2471,
			2531
		],
		[
			-690,
			1776
		],
		[
			738,
			1510
		],
		[
			7561,
			4377
		],
		[
			-1011,
			1560
		],
		[
			-8405,
			55
		],
		[
			-2096,
			770
		],
		[
			5994,
			10614
		],
		[
			8272,
			1798
		],
		[
			6357,
			-2348
		],
		[
			2688,
			172
		],
		[
			-3531,
			3991
		],
		[
			-7665,
			2207
		],
		[
			42,
			2898
		],
		[
			5312,
			3283
		],
		[
			5109,
			910
		],
		[
			12854,
			-2253
		],
		[
			-4956,
			3487
		],
		[
			-8666,
			2522
		],
		[
			-152,
			1880
		],
		[
			2590,
			2905
		],
		[
			1002,
			3365
		],
		[
			2372,
			2695
		],
		[
			-3377,
			1429
		],
		[
			-6174,
			629
		],
		[
			-487,
			1811
		],
		[
			4438,
			3154
		],
		[
			6236,
			525
		],
		[
			10137,
			2406
		],
		[
			3474,
			2200
		],
		[
			1041,
			2171
		],
		[
			-2358,
			-411
		],
		[
			-8927,
			-4505
		],
		[
			-4440,
			833
		],
		[
			454,
			2236
		],
		[
			-899,
			939
		],
		[
			-12534,
			-4600
		],
		[
			-4449,
			44
		],
		[
			-2712,
			1858
		],
		[
			-124,
			5740
		],
		[
			-3391,
			2207
		],
		[
			-1042,
			4287
		],
		[
			187,
			667
		],
		[
			1321,
			4350
		],
		[
			2876,
			2448
		],
		[
			10452,
			-2385
		],
		[
			5082,
			-2154
		],
		[
			10280,
			596
		],
		[
			1675,
			754
		],
		[
			-2288,
			1207
		],
		[
			-10705,
			750
		],
		[
			-12089,
			8301
		],
		[
			-240,
			2302
		],
		[
			2205,
			2495
		],
		[
			7691,
			1920
		],
		[
			-1551,
			1610
		],
		[
			-7886,
			3131
		],
		[
			-268,
			8293
		],
		[
			685,
			1132
		],
		[
			3710,
			1243
		],
		[
			4239,
			-393
		],
		[
			5330,
			-5712
		],
		[
			3826,
			-1726
		],
		[
			1847,
			1140
		],
		[
			529,
			1608
		],
		[
			-607,
			1125
		],
		[
			-2868,
			1197
		],
		[
			516,
			1584
		],
		[
			-1332,
			3516
		],
		[
			2153,
			2273
		],
		[
			4243,
			-201
		],
		[
			4481,
			-3216
		],
		[
			4277,
			-1273
		],
		[
			2438,
			335
		],
		[
			2984,
			2228
		],
		[
			2549,
			747
		],
		[
			9373,
			-1793
		],
		[
			-5894,
			3968
		],
		[
			2104,
			887
		],
		[
			13967,
			-2468
		],
		[
			8595,
			-3046
		],
		[
			-515,
			1015
		],
		[
			-5928,
			3333
		],
		[
			-2150,
			2929
		],
		[
			-19883,
			9594
		],
		[
			-3195,
			4050
		],
		[
			2261,
			1318
		],
		[
			7306,
			-2213
		],
		[
			4555,
			917
		],
		[
			1349,
			1472
		],
		[
			153,
			5413
		],
		[
			-9125,
			7445
		],
		[
			-281,
			2190
		],
		[
			7238,
			-936
		],
		[
			5127,
			2000
		],
		[
			7305,
			-603
		],
		[
			7191,
			1543
		],
		[
			-5189,
			6712
		],
		[
			-1704,
			4348
		],
		[
			4362,
			2367
		],
		[
			4533,
			612
		],
		[
			-647,
			2194
		],
		[
			943,
			3111
		],
		[
			-1928,
			2654
		],
		[
			-231,
			2185
		],
		[
			1702,
			2004
		],
		[
			5272,
			3393
		],
		[
			4795,
			5451
		],
		[
			13468,
			-1401
		],
		[
			5251,
			-4371
		],
		[
			4255,
			2590
		],
		[
			8299,
			-3215
		],
		[
			615,
			-2719
		],
		[
			-5518,
			-5035
		],
		[
			0,
			-1354
		],
		[
			5456,
			2459
		],
		[
			6038,
			4515
		],
		[
			2859,
			3622
		],
		[
			2680,
			862
		],
		[
			5882,
			-422
		],
		[
			6199,
			-2750
		],
		[
			916,
			-2136
		],
		[
			-1872,
			-3095
		],
		[
			391,
			-1365
		],
		[
			11002,
			6089
		],
		[
			3730,
			409
		],
		[
			6175,
			-897
		],
		[
			8793,
			2523
		],
		[
			6791,
			272
		],
		[
			4864,
			2189
		],
		[
			4698,
			-1424
		],
		[
			9669,
			-638
		],
		[
			10746,
			735
		],
		[
			14306,
			4748
		],
		[
			7169,
			212
		],
		[
			2500,
			-897
		],
		[
			1892,
			-845
		],
		[
			6422,
			587
		],
		[
			7290,
			-709
		],
		[
			1046,
			973
		],
		[
			548,
			511
		],
		[
			-3231,
			3388
		],
		[
			2059,
			1354
		],
		[
			6755,
			-1624
		],
		[
			10741,
			698
		],
		[
			5387,
			-1306
		],
		[
			10878,
			-711
		],
		[
			-308,
			-2310
		],
		[
			-8058,
			-10139
		],
		[
			1490,
			-2599
		],
		[
			4372,
			-1589
		],
		[
			-24,
			-2451
		],
		[
			-4803,
			-6693
		],
		[
			-6341,
			-4295
		],
		[
			-20404,
			-6805
		],
		[
			-14827,
			-10061
		],
		[
			-884,
			-362
		],
		[
			-25205,
			-10320
		],
		[
			-7995,
			-5456
		],
		[
			-9460,
			-3356
		],
		[
			-2590,
			-2432
		],
		[
			-1717,
			-4658
		],
		[
			-3058,
			-3149
		],
		[
			-7451,
			-963
		],
		[
			-10169,
			1134
		],
		[
			-6805,
			-353
		],
		[
			22261,
			-4230
		],
		[
			9775,
			1286
		],
		[
			7443,
			-1014
		],
		[
			6967,
			2288
		],
		[
			1628,
			-373
		],
		[
			-2955,
			-3522
		],
		[
			-14808,
			-10424
		],
		[
			-2783,
			-56
		],
		[
			-2340,
			1781
		],
		[
			-2421,
			425
		],
		[
			-10086,
			-3188
		],
		[
			-7828,
			-991
		],
		[
			-8506,
			-2829
		],
		[
			-4394,
			-3347
		],
		[
			14497,
			4306
		],
		[
			8241,
			-325
		],
		[
			8001,
			1053
		],
		[
			2127,
			-808
		],
		[
			-7761,
			-7878
		],
		[
			-8056,
			-3922
		],
		[
			-4038,
			-3220
		],
		[
			-15673,
			-1248
		],
		[
			-4260,
			-925
		]
	],
	[
		[
			5683190,
			7959195
		],
		[
			-2130,
			-1025
		],
		[
			-3391,
			66
		],
		[
			-863,
			-5449
		],
		[
			-5776,
			-2551
		],
		[
			4840,
			-2208
		],
		[
			1206,
			-2150
		],
		[
			580,
			-4452
		],
		[
			-2610,
			-1975
		],
		[
			-5539,
			-266
		],
		[
			-2300,
			-409
		],
		[
			1894,
			-2259
		],
		[
			-1396,
			-2847
		],
		[
			-8802,
			-2798
		],
		[
			-5122,
			1858
		],
		[
			-1394,
			-1498
		],
		[
			-2193,
			166
		],
		[
			-4749,
			4055
		],
		[
			-1797,
			3368
		],
		[
			-1772,
			-354
		],
		[
			-444,
			-740
		],
		[
			1379,
			-2651
		],
		[
			3385,
			-3357
		],
		[
			2255,
			-6872
		],
		[
			-1985,
			-130
		],
		[
			-4345,
			2338
		],
		[
			-1684,
			-1316
		],
		[
			-677,
			1551
		],
		[
			-2990,
			203
		],
		[
			-637,
			-1436
		],
		[
			2971,
			-2343
		],
		[
			363,
			-1836
		],
		[
			-4614,
			-1774
		],
		[
			-4011,
			-69
		],
		[
			-4446,
			-3564
		],
		[
			-7871,
			-3472
		],
		[
			-13109,
			6616
		],
		[
			-1334,
			1706
		],
		[
			5531,
			11
		],
		[
			6645,
			3526
		],
		[
			4448,
			1023
		],
		[
			1109,
			2857
		],
		[
			6488,
			1913
		],
		[
			-2722,
			1768
		],
		[
			-14837,
			2465
		],
		[
			-4572,
			2584
		],
		[
			253,
			1456
		],
		[
			5136,
			3149
		],
		[
			-1884,
			3094
		],
		[
			-4051,
			1227
		],
		[
			-2433,
			4739
		],
		[
			2294,
			4978
		],
		[
			4575,
			1367
		],
		[
			165,
			2200
		],
		[
			1264,
			1891
		],
		[
			8713,
			-283
		],
		[
			2148,
			-1158
		],
		[
			1048,
			-2135
		],
		[
			4106,
			-791
		],
		[
			2055,
			1636
		],
		[
			-2391,
			4283
		],
		[
			1410,
			1816
		],
		[
			6691,
			-3697
		],
		[
			2331,
			-2617
		],
		[
			2920,
			-818
		],
		[
			-730,
			1936
		],
		[
			-2193,
			468
		],
		[
			257,
			1334
		],
		[
			-3265,
			3154
		],
		[
			-709,
			2323
		],
		[
			982,
			1275
		],
		[
			13721,
			5211
		],
		[
			4981,
			145
		],
		[
			5713,
			1550
		],
		[
			4704,
			3232
		],
		[
			5524,
			2268
		],
		[
			14770,
			5967
		],
		[
			4631,
			3041
		],
		[
			1850,
			-403
		],
		[
			5065,
			-3684
		],
		[
			1645,
			-4799
		],
		[
			-2998,
			-4897
		],
		[
			1609,
			-3344
		],
		[
			-12485,
			-7680
		],
		[
			-1273,
			-2637
		],
		[
			869,
			-3070
		]
	],
	[
		[
			5700407,
			7889056
		],
		[
			394,
			-4717
		],
		[
			-2942,
			-4878
		],
		[
			3357,
			-1461
		],
		[
			3078,
			-7809
		],
		[
			4519,
			-1128
		],
		[
			1394,
			-2460
		],
		[
			3354,
			-155
		],
		[
			1350,
			806
		],
		[
			-1230,
			1840
		],
		[
			225,
			1127
		],
		[
			4209,
			609
		],
		[
			4434,
			-2255
		],
		[
			-2227,
			-3198
		],
		[
			5087,
			-1943
		],
		[
			15533,
			2355
		],
		[
			7243,
			-1122
		],
		[
			844,
			-897
		],
		[
			-417,
			-1647
		],
		[
			-2782,
			-3435
		],
		[
			-9745,
			-3172
		],
		[
			-222,
			-2218
		],
		[
			-1743,
			-1996
		],
		[
			-4879,
			-2618
		],
		[
			-5866,
			-4722
		],
		[
			-8603,
			-2228
		],
		[
			-1892,
			2255
		],
		[
			331,
			1557
		],
		[
			2550,
			4521
		],
		[
			6418,
			4846
		],
		[
			61,
			798
		],
		[
			-4889,
			529
		],
		[
			-4488,
			2630
		],
		[
			-6754,
			-5996
		],
		[
			-1238,
			653
		],
		[
			-1596,
			2910
		],
		[
			-2415,
			1011
		],
		[
			-14822,
			-1991
		],
		[
			-1679,
			2198
		],
		[
			-5289,
			1303
		],
		[
			-1326,
			3165
		],
		[
			-5456,
			1858
		],
		[
			-2781,
			2775
		],
		[
			-693,
			691
		],
		[
			269,
			2177
		],
		[
			424,
			310
		],
		[
			1095,
			802
		],
		[
			5851,
			575
		],
		[
			-1226,
			1627
		],
		[
			-5204,
			1075
		],
		[
			-516,
			376
		],
		[
			-3640,
			2650
		],
		[
			-4448,
			196
		],
		[
			-1436,
			-269
		],
		[
			-2145,
			-3348
		],
		[
			-2639,
			-374
		],
		[
			-9677,
			2680
		],
		[
			-7077,
			5207
		],
		[
			-613,
			1459
		],
		[
			846,
			1437
		],
		[
			2164,
			856
		],
		[
			337,
			2787
		],
		[
			1868,
			1356
		],
		[
			7918,
			-5254
		],
		[
			3214,
			-274
		],
		[
			-1104,
			4223
		],
		[
			3486,
			1965
		],
		[
			-5239,
			4250
		],
		[
			1694,
			4502
		],
		[
			3407,
			-1291
		],
		[
			4200,
			-3857
		],
		[
			8884,
			-3974
		],
		[
			0,
			-260
		],
		[
			582,
			0
		],
		[
			1185,
			-530
		],
		[
			1769,
			530
		],
		[
			3252,
			973
		],
		[
			2082,
			-973
		],
		[
			3316,
			-1551
		],
		[
			-69,
			1118
		],
		[
			-418,
			433
		],
		[
			-4399,
			4557
		],
		[
			467,
			3435
		],
		[
			-2992,
			5444
		],
		[
			4759,
			3576
		],
		[
			1820,
			2374
		],
		[
			1633,
			451
		],
		[
			6254,
			-2568
		],
		[
			3701,
			-3369
		],
		[
			4595,
			-2390
		],
		[
			2644,
			-2885
		],
		[
			719,
			-8625
		]
	],
	[
		[
			6184532,
			8199801
		],
		[
			-1734,
			-2900
		],
		[
			556,
			-3014
		],
		[
			-3072,
			-1923
		],
		[
			1386,
			-2093
		],
		[
			-663,
			-2589
		],
		[
			1277,
			-2889
		],
		[
			-2703,
			-2645
		],
		[
			-1194,
			-2664
		],
		[
			2020,
			369
		],
		[
			2182,
			2679
		],
		[
			4910,
			1140
		],
		[
			-1591,
			2024
		],
		[
			863,
			1301
		],
		[
			4492,
			1059
		],
		[
			2493,
			-672
		],
		[
			3893,
			-4058
		],
		[
			-358,
			-1605
		],
		[
			-2506,
			-138
		],
		[
			-1174,
			-1069
		],
		[
			3814,
			-568
		],
		[
			1613,
			-1544
		],
		[
			2467,
			1055
		],
		[
			1735,
			1878
		],
		[
			1843,
			64
		],
		[
			3112,
			2004
		],
		[
			1426,
			-180
		],
		[
			-1148,
			-1521
		],
		[
			-6667,
			-3926
		],
		[
			770,
			-890
		],
		[
			2122,
			1260
		],
		[
			2139,
			-373
		],
		[
			-176,
			-2819
		],
		[
			-9257,
			-998
		],
		[
			806,
			-1755
		],
		[
			7482,
			-1052
		],
		[
			642,
			-936
		],
		[
			-5720,
			-2922
		],
		[
			531,
			-813
		],
		[
			3092,
			-235
		],
		[
			347,
			-939
		],
		[
			-6092,
			-1888
		],
		[
			-1131,
			1587
		],
		[
			-2060,
			372
		],
		[
			-1413,
			-2795
		],
		[
			1397,
			-734
		],
		[
			153,
			-1424
		],
		[
			1556,
			-134
		],
		[
			-435,
			-1909
		],
		[
			2697,
			-152
		],
		[
			177,
			-2453
		],
		[
			1137,
			-1248
		],
		[
			-1174,
			-1832
		],
		[
			-4107,
			-1114
		],
		[
			-1587,
			-3837
		],
		[
			347,
			-1766
		],
		[
			2372,
			-2951
		],
		[
			-3826,
			-690
		],
		[
			-20,
			-1440
		],
		[
			2127,
			-2424
		],
		[
			-191,
			-1607
		],
		[
			-1581,
			1339
		],
		[
			-4887,
			-329
		],
		[
			1270,
			-1430
		],
		[
			90,
			-1494
		],
		[
			-483,
			-2148
		],
		[
			-2011,
			-1816
		],
		[
			985,
			-1245
		],
		[
			-913,
			-2623
		],
		[
			1059,
			-1113
		],
		[
			-464,
			-1148
		],
		[
			-2229,
			1346
		],
		[
			-1367,
			-742
		],
		[
			92,
			1938
		],
		[
			-1182,
			1334
		],
		[
			-5232,
			-524
		],
		[
			-1248,
			1586
		],
		[
			1924,
			1473
		],
		[
			884,
			2983
		],
		[
			2262,
			-291
		],
		[
			433,
			2749
		],
		[
			-971,
			2178
		],
		[
			2120,
			2008
		],
		[
			4786,
			10299
		],
		[
			-506,
			1043
		],
		[
			-2472,
			-5058
		],
		[
			-2495,
			-2736
		],
		[
			-464,
			233
		],
		[
			306,
			1580
		],
		[
			-1781,
			-847
		],
		[
			-614,
			1366
		],
		[
			1243,
			967
		],
		[
			682,
			1822
		],
		[
			2872,
			431
		],
		[
			753,
			1597
		],
		[
			490,
			5245
		],
		[
			-2531,
			-32
		],
		[
			822,
			4817
		],
		[
			-3585,
			-1097
		],
		[
			-2008,
			2670
		],
		[
			-1730,
			250
		],
		[
			1603,
			-4058
		],
		[
			-2717,
			86
		],
		[
			-1890,
			-2758
		],
		[
			-2875,
			3
		],
		[
			-2237,
			-2036
		],
		[
			-7342,
			3287
		],
		[
			574,
			1418
		],
		[
			3103,
			1138
		],
		[
			-1293,
			1824
		],
		[
			-3531,
			-2327
		],
		[
			-3273,
			965
		],
		[
			-4003,
			-670
		],
		[
			-5769,
			2368
		],
		[
			-1301,
			2122
		],
		[
			351,
			3590
		],
		[
			2123,
			987
		],
		[
			5307,
			302
		],
		[
			4448,
			-1104
		],
		[
			2019,
			389
		],
		[
			953,
			1326
		],
		[
			2794,
			358
		],
		[
			2991,
			-1890
		],
		[
			1692,
			1337
		],
		[
			-1280,
			1404
		],
		[
			541,
			1215
		],
		[
			7459,
			-2209
		],
		[
			2640,
			-1963
		],
		[
			899,
			337
		],
		[
			-11,
			3726
		],
		[
			5108,
			2542
		],
		[
			-79,
			508
		],
		[
			-3310,
			510
		],
		[
			-1236,
			1858
		],
		[
			-1518,
			-652
		],
		[
			-1999,
			-2844
		],
		[
			-2584,
			-596
		],
		[
			-3641,
			840
		],
		[
			-970,
			1481
		],
		[
			2030,
			1472
		],
		[
			4518,
			80
		],
		[
			-1439,
			2464
		],
		[
			-3177,
			1161
		],
		[
			-46,
			2202
		],
		[
			-1768,
			3429
		],
		[
			-2989,
			-1663
		],
		[
			-1961,
			1786
		],
		[
			-8863,
			-248
		],
		[
			-1739,
			1126
		],
		[
			1361,
			1339
		],
		[
			3190,
			580
		],
		[
			1469,
			2920
		],
		[
			1931,
			1103
		],
		[
			5814,
			-2603
		],
		[
			357,
			354
		],
		[
			-705,
			1615
		],
		[
			4309,
			3318
		],
		[
			2416,
			3651
		],
		[
			6958,
			-444
		],
		[
			1200,
			1459
		],
		[
			1641,
			409
		],
		[
			1451,
			-1569
		]
	],
	[
		[
			5736164,
			7789505
		],
		[
			3000,
			-1898
		],
		[
			4067,
			-639
		],
		[
			4114,
			-2848
		],
		[
			2270,
			-377
		],
		[
			572,
			-1136
		],
		[
			-1725,
			-1335
		],
		[
			552,
			-1783
		],
		[
			-4245,
			-4240
		],
		[
			-8605,
			-3933
		],
		[
			-4878,
			-1317
		],
		[
			-2821,
			216
		],
		[
			-857,
			1039
		],
		[
			2022,
			2199
		],
		[
			-2038,
			610
		],
		[
			-6028,
			-3005
		],
		[
			-5137,
			-458
		],
		[
			-5940,
			-2416
		],
		[
			-3506,
			428
		],
		[
			-6345,
			-1185
		],
		[
			-9329,
			-201
		],
		[
			-3815,
			-1620
		],
		[
			-3915,
			270
		],
		[
			-5500,
			2388
		],
		[
			617,
			3446
		],
		[
			2047,
			1493
		],
		[
			4786,
			-329
		],
		[
			4797,
			-2179
		],
		[
			817,
			2020
		],
		[
			9342,
			-107
		],
		[
			12117,
			2582
		],
		[
			1430,
			1265
		],
		[
			-1558,
			1495
		],
		[
			-8150,
			-2516
		],
		[
			-8917,
			-422
		],
		[
			-836,
			1171
		],
		[
			494,
			1204
		],
		[
			4765,
			2725
		],
		[
			2591,
			3262
		],
		[
			6845,
			498
		],
		[
			4143,
			1898
		],
		[
			1497,
			1912
		],
		[
			-1526,
			634
		],
		[
			-10731,
			-1959
		],
		[
			-3120,
			2457
		],
		[
			-6052,
			2225
		],
		[
			-6958,
			237
		],
		[
			-4271,
			1323
		],
		[
			-233,
			1263
		],
		[
			3537,
			2245
		],
		[
			-1632,
			1084
		],
		[
			-56,
			1748
		],
		[
			8192,
			522
		],
		[
			1424,
			2327
		],
		[
			9026,
			1981
		],
		[
			8979,
			-3296
		],
		[
			8385,
			-9363
		],
		[
			16296,
			-1605
		]
	],
	[
		[
			5704804,
			7722792
		],
		[
			1349,
			-4739
		],
		[
			3978,
			-3115
		],
		[
			2474,
			-8037
		],
		[
			-4505,
			-2327
		],
		[
			-533,
			-821
		],
		[
			-396,
			-610
		],
		[
			-6170,
			-1551
		],
		[
			573,
			-1093
		],
		[
			-417,
			-1216
		],
		[
			-1442,
			1158
		],
		[
			649,
			1072
		],
		[
			-6006,
			213
		],
		[
			-3168,
			-3519
		],
		[
			-4257,
			-1503
		],
		[
			-5246,
			1654
		],
		[
			1302,
			3500
		],
		[
			1895,
			1589
		],
		[
			1512,
			306
		],
		[
			2059,
			417
		],
		[
			177,
			1623
		],
		[
			-2887,
			3557
		],
		[
			-3990,
			951
		],
		[
			-513,
			799
		],
		[
			1134,
			1811
		],
		[
			6621,
			2460
		],
		[
			589,
			782
		],
		[
			-773,
			627
		],
		[
			-7939,
			237
		],
		[
			-3750,
			-4640
		],
		[
			-4764,
			-3777
		],
		[
			-2853,
			-1243
		],
		[
			-2837,
			-1236
		],
		[
			-3392,
			1346
		],
		[
			2032,
			2294
		],
		[
			161,
			2218
		],
		[
			3773,
			3956
		],
		[
			-209,
			1019
		],
		[
			-1919,
			1186
		],
		[
			2061,
			1758
		],
		[
			330,
			1606
		],
		[
			264,
			1288
		],
		[
			809,
			1371
		],
		[
			4198,
			152
		],
		[
			4503,
			1934
		],
		[
			2658,
			1075
		],
		[
			462,
			-327
		],
		[
			-136,
			-748
		],
		[
			-1596,
			-4039
		],
		[
			748,
			-890
		],
		[
			1333,
			19
		],
		[
			-322,
			786
		],
		[
			536,
			667
		],
		[
			1230,
			3187
		],
		[
			1391,
			270
		],
		[
			9979,
			4803
		],
		[
			5791,
			1134
		],
		[
			1342,
			-673
		],
		[
			-307,
			-3455
		],
		[
			701,
			-1809
		],
		[
			1713,
			-3457
		]
	],
	[
		[
			6014679,
			8045146
		],
		[
			-1001,
			-2037
		],
		[
			-3773,
			244
		],
		[
			-1075,
			-1939
		],
		[
			-2961,
			-994
		],
		[
			-1027,
			-1204
		],
		[
			4243,
			-917
		],
		[
			2374,
			1248
		],
		[
			2824,
			68
		],
		[
			4895,
			-2262
		],
		[
			2238,
			2214
		],
		[
			2148,
			-57
		],
		[
			557,
			-732
		],
		[
			-549,
			-3376
		],
		[
			1843,
			-404
		],
		[
			467,
			0
		],
		[
			3898,
			2058
		],
		[
			4944,
			524
		],
		[
			940,
			-751
		],
		[
			-322,
			-1293
		],
		[
			-2752,
			-538
		],
		[
			-2003,
			-391
		],
		[
			1622,
			-1578
		],
		[
			61,
			-1657
		],
		[
			2280,
			12
		],
		[
			1587,
			-1280
		],
		[
			-3853,
			-3770
		],
		[
			-4859,
			2154
		],
		[
			-606,
			-44
		],
		[
			-557,
			-1608
		],
		[
			-1855,
			336
		],
		[
			486,
			1132
		],
		[
			-2685,
			-196
		],
		[
			-3946,
			4452
		],
		[
			43,
			2047
		],
		[
			-983,
			308
		],
		[
			-4093,
			-1936
		],
		[
			-5893,
			-373
		],
		[
			-5166,
			-2085
		],
		[
			-7704,
			-145
		],
		[
			-2181,
			1793
		],
		[
			-326,
			2829
		],
		[
			-1757,
			1400
		],
		[
			-1931,
			-1267
		],
		[
			-1123,
			-133
		],
		[
			-1421,
			-74
		],
		[
			-655,
			-1059
		],
		[
			-2344,
			243
		],
		[
			-1933,
			890
		],
		[
			-763,
			352
		],
		[
			-1354,
			2964
		],
		[
			1092,
			4956
		],
		[
			1544,
			887
		],
		[
			-1372,
			5066
		],
		[
			3687,
			3107
		],
		[
			11076,
			1630
		],
		[
			7465,
			-2349
		],
		[
			7326,
			-1840
		],
		[
			486,
			-1498
		],
		[
			3900,
			-1864
		],
		[
			797,
			-1263
		]
	],
	[
		[
			5803767,
			7682900
		],
		[
			-6807,
			-679
		],
		[
			-6079,
			321
		],
		[
			-3535,
			1218
		],
		[
			-777,
			201
		],
		[
			-2751,
			1274
		],
		[
			-1223,
			1713
		],
		[
			-89,
			1467
		],
		[
			-2815,
			1001
		],
		[
			447,
			1198
		],
		[
			-362,
			1072
		],
		[
			1115,
			1430
		],
		[
			-627,
			2645
		],
		[
			-2262,
			1532
		],
		[
			-2383,
			2609
		],
		[
			-136,
			630
		],
		[
			224,
			951
		],
		[
			865,
			808
		],
		[
			383,
			1462
		],
		[
			1103,
			2105
		],
		[
			799,
			701
		],
		[
			3191,
			1041
		],
		[
			1559,
			1617
		],
		[
			2083,
			113
		],
		[
			269,
			832
		],
		[
			1214,
			481
		],
		[
			7358,
			-1596
		],
		[
			4905,
			-3253
		],
		[
			996,
			-2041
		],
		[
			1672,
			-3869
		],
		[
			-1976,
			-2826
		],
		[
			3639,
			-1139
		],
		[
			516,
			-162
		],
		[
			1895,
			-1489
		],
		[
			-2411,
			-1743
		],
		[
			-1167,
			-843
		],
		[
			1167,
			-576
		],
		[
			3001,
			-1485
		],
		[
			-822,
			-2078
		],
		[
			1029,
			-2487
		],
		[
			-2500,
			-2085
		],
		[
			-708,
			-71
		]
	],
	[
		[
			5598614,
			7905618
		],
		[
			-2714,
			-2703
		],
		[
			81,
			-1727
		],
		[
			4524,
			-3107
		],
		[
			3113,
			-995
		],
		[
			-3558,
			-6597
		],
		[
			-6313,
			-1623
		],
		[
			655,
			-985
		],
		[
			3775,
			668
		],
		[
			668,
			-927
		],
		[
			-1523,
			-1275
		],
		[
			-4017,
			85
		],
		[
			-841,
			-2211
		],
		[
			-1819,
			-1221
		],
		[
			3339,
			-1227
		],
		[
			1563,
			-1893
		],
		[
			-156,
			-1627
		],
		[
			-1955,
			-386
		],
		[
			-1132,
			1479
		],
		[
			-1893,
			-1013
		],
		[
			-3099,
			1318
		],
		[
			-3981,
			-436
		],
		[
			-6570,
			2057
		],
		[
			-1930,
			2214
		],
		[
			508,
			2218
		],
		[
			4026,
			1812
		],
		[
			9252,
			-1526
		],
		[
			667,
			470
		],
		[
			-698,
			1360
		],
		[
			639,
			1431
		],
		[
			-5239,
			848
		],
		[
			-4514,
			3898
		],
		[
			-6173,
			2421
		],
		[
			-5907,
			-413
		],
		[
			-4850,
			2610
		],
		[
			292,
			1169
		],
		[
			4727,
			4740
		],
		[
			3904,
			-76
		],
		[
			4996,
			-1702
		],
		[
			5918,
			3911
		],
		[
			639,
			-1881
		],
		[
			1705,
			-467
		],
		[
			1316,
			1435
		],
		[
			779,
			-80
		],
		[
			233,
			-1991
		],
		[
			2941,
			2181
		],
		[
			5706,
			1850
		],
		[
			2916,
			-2086
		]
	],
	[
		[
			5718997,
			7719147
		],
		[
			-6245,
			-631
		],
		[
			-5174,
			2258
		],
		[
			-1624,
			5729
		],
		[
			1040,
			2222
		],
		[
			3860,
			3464
		],
		[
			7914,
			2299
		],
		[
			-2854,
			2483
		],
		[
			1135,
			1723
		],
		[
			3320,
			3650
		],
		[
			20687,
			10017
		],
		[
			2515,
			890
		],
		[
			1608,
			-451
		],
		[
			809,
			-1457
		],
		[
			-520,
			-2155
		],
		[
			-10400,
			-10494
		],
		[
			-3095,
			-3242
		],
		[
			-4486,
			-7130
		],
		[
			-5903,
			-3846
		],
		[
			-2587,
			-5329
		]
	],
	[
		[
			5592743,
			7850389
		],
		[
			-1431,
			-1439
		],
		[
			-12182,
			319
		],
		[
			-2044,
			977
		],
		[
			-1484,
			1442
		],
		[
			-3992,
			10435
		],
		[
			1502,
			5182
		],
		[
			2061,
			1625
		],
		[
			213,
			2582
		],
		[
			-2447,
			5623
		],
		[
			2725,
			1287
		],
		[
			5375,
			161
		],
		[
			6547,
			-2201
		],
		[
			3687,
			-3400
		],
		[
			-1507,
			-1555
		],
		[
			4799,
			-2396
		],
		[
			226,
			-1726
		],
		[
			-3481,
			-1736
		],
		[
			-2292,
			-3446
		],
		[
			-2273,
			-1372
		],
		[
			3177,
			-3056
		],
		[
			-137,
			-2467
		],
		[
			-5775,
			-1826
		],
		[
			42,
			-524
		],
		[
			6129,
			-899
		],
		[
			2562,
			-1590
		]
	],
	[
		[
			6215929,
			8204473
		],
		[
			-527,
			-2101
		],
		[
			-3413,
			715
		],
		[
			-1872,
			1155
		],
		[
			132,
			-1314
		],
		[
			2712,
			-1942
		],
		[
			-1869,
			-2449
		],
		[
			3530,
			-2192
		],
		[
			-1269,
			-2552
		],
		[
			-2573,
			-578
		],
		[
			1864,
			-1609
		],
		[
			-895,
			-3319
		],
		[
			-3388,
			-438
		],
		[
			-2488,
			618
		],
		[
			-1319,
			-1312
		],
		[
			-2048,
			293
		],
		[
			-3719,
			1152
		],
		[
			-1856,
			2549
		],
		[
			-95,
			3596
		],
		[
			-1413,
			803
		],
		[
			641,
			1473
		],
		[
			-774,
			1748
		],
		[
			1441,
			3436
		],
		[
			2259,
			1616
		],
		[
			1328,
			-2013
		],
		[
			489,
			94
		],
		[
			1699,
			8284
		],
		[
			529,
			1067
		],
		[
			1310,
			274
		],
		[
			9316,
			-275
		],
		[
			1557,
			-2244
		],
		[
			711,
			-4535
		]
	],
	[
		[
			5993607,
			8026639
		],
		[
			-479,
			-995
		],
		[
			359,
			-701
		],
		[
			1752,
			-742
		],
		[
			-361,
			-1658
		],
		[
			617,
			-8
		],
		[
			14,
			-1190
		],
		[
			1808,
			-76
		],
		[
			736,
			-478
		],
		[
			-2906,
			-967
		],
		[
			-582,
			-1053
		],
		[
			949,
			-168
		],
		[
			1704,
			347
		],
		[
			1458,
			-99
		],
		[
			1234,
			488
		],
		[
			1310,
			-311
		],
		[
			-778,
			-1940
		],
		[
			-4221,
			-653
		],
		[
			-1294,
			78
		],
		[
			-2240,
			776
		],
		[
			1579,
			1423
		],
		[
			-201,
			469
		],
		[
			-2843,
			-220
		],
		[
			-1042,
			-453
		],
		[
			-509,
			-921
		],
		[
			2976,
			-1026
		],
		[
			-804,
			-593
		],
		[
			-1951,
			830
		],
		[
			-3867,
			-418
		],
		[
			-3230,
			2221
		],
		[
			-2,
			645
		],
		[
			-1092,
			771
		],
		[
			378,
			449
		],
		[
			-3814,
			1942
		],
		[
			-926,
			2099
		],
		[
			225,
			586
		],
		[
			-1502,
			687
		],
		[
			-1327,
			-126
		],
		[
			-2885,
			208
		],
		[
			-236,
			452
		],
		[
			1140,
			1433
		],
		[
			759,
			2027
		],
		[
			1371,
			1135
		],
		[
			2411,
			174
		],
		[
			2508,
			791
		],
		[
			2742,
			-392
		],
		[
			13,
			-892
		],
		[
			1314,
			-296
		],
		[
			-262,
			-874
		],
		[
			3028,
			-224
		],
		[
			5378,
			-1762
		],
		[
			1591,
			-795
		]
	],
	[
		[
			6228053,
			8220384
		],
		[
			448,
			-223
		],
		[
			2663,
			2373
		],
		[
			4902,
			-726
		],
		[
			1397,
			-1145
		],
		[
			-1962,
			-1048
		],
		[
			1394,
			-1168
		],
		[
			-215,
			-1363
		],
		[
			-3785,
			64
		],
		[
			1422,
			-2333
		],
		[
			-2154,
			-228
		],
		[
			-43,
			-528
		],
		[
			1198,
			-328
		],
		[
			-58,
			-1269
		],
		[
			-4491,
			-3036
		],
		[
			206,
			-848
		],
		[
			2516,
			-709
		],
		[
			-591,
			-1005
		],
		[
			-1853,
			-412
		],
		[
			-5187,
			1026
		],
		[
			-3257,
			-1174
		],
		[
			-3091,
			1044
		],
		[
			601,
			1292
		],
		[
			-822,
			1800
		],
		[
			2103,
			183
		],
		[
			-451,
			1839
		],
		[
			1649,
			1224
		],
		[
			838,
			2517
		],
		[
			-876,
			2074
		],
		[
			6238,
			4757
		],
		[
			1399,
			-937
		],
		[
			-138,
			-1713
		]
	],
	[
		[
			5813912,
			7712654
		],
		[
			-455,
			-1027
		],
		[
			-2501,
			157
		],
		[
			-3158,
			3312
		],
		[
			-4031,
			1380
		],
		[
			-541,
			184
		],
		[
			-1856,
			3555
		],
		[
			107,
			2914
		],
		[
			-5669,
			3120
		],
		[
			-1979,
			2588
		],
		[
			3248,
			2083
		],
		[
			10043,
			-4671
		],
		[
			-542,
			-1276
		],
		[
			6207,
			-3079
		],
		[
			1733,
			-5595
		],
		[
			-1773,
			-1889
		],
		[
			1167,
			-1756
		]
	],
	[
		[
			5688804,
			7834932
		],
		[
			-5790,
			-2638
		],
		[
			-4416,
			1677
		],
		[
			-1426,
			1986
		],
		[
			-5382,
			2227
		],
		[
			-1820,
			1279
		],
		[
			6141,
			3716
		],
		[
			5687,
			1344
		],
		[
			7256,
			-2368
		],
		[
			688,
			-1033
		],
		[
			-800,
			-1212
		],
		[
			1633,
			-876
		],
		[
			36,
			-850
		],
		[
			-1807,
			-3252
		]
	],
	[
		[
			5642000,
			7792885
		],
		[
			65,
			-1425
		],
		[
			-7355,
			-598
		],
		[
			-584,
			-757
		],
		[
			1085,
			-972
		],
		[
			-1570,
			-1377
		],
		[
			-6261,
			-478
		],
		[
			-1462,
			-1203
		],
		[
			-853,
			-2966
		],
		[
			-7679,
			1248
		],
		[
			103,
			2961
		],
		[
			-845,
			1723
		],
		[
			1140,
			1319
		],
		[
			3035,
			1135
		],
		[
			7129,
			-720
		],
		[
			5330,
			2110
		],
		[
			1263,
			0
		],
		[
			1168,
			-603
		],
		[
			1419,
			152
		],
		[
			625,
			451
		],
		[
			1137,
			414
		],
		[
			785,
			897
		],
		[
			1210,
			-1016
		],
		[
			1115,
			-295
		]
	],
	[
		[
			5660090,
			7798387
		],
		[
			-6146,
			-1501
		],
		[
			-1361,
			501
		],
		[
			-1302,
			-1073
		],
		[
			-3042,
			599
		],
		[
			-1962,
			-1529
		],
		[
			-1576,
			850
		],
		[
			2040,
			1544
		],
		[
			3044,
			733
		],
		[
			4780,
			4013
		],
		[
			7859,
			3785
		],
		[
			3905,
			1233
		],
		[
			3178,
			-109
		],
		[
			89,
			-25
		],
		[
			325,
			-660
		],
		[
			-414,
			-947
		],
		[
			-4159,
			-4671
		],
		[
			-2383,
			-179
		],
		[
			-2875,
			-2564
		]
	],
	[
		[
			5577388,
			7837366
		],
		[
			-565,
			-536
		],
		[
			-1436,
			81
		],
		[
			-5395,
			-3529
		],
		[
			-4182,
			524
		],
		[
			-3457,
			-631
		],
		[
			675,
			-1159
		],
		[
			-923,
			-1035
		],
		[
			1690,
			-329
		],
		[
			-144,
			-687
		],
		[
			-3313,
			-214
		],
		[
			-564,
			580
		],
		[
			602,
			947
		],
		[
			-2063,
			916
		],
		[
			1333,
			3111
		],
		[
			3803,
			1192
		],
		[
			380,
			1587
		],
		[
			792,
			1815
		],
		[
			4628,
			1528
		],
		[
			1077,
			2512
		],
		[
			2055,
			-1124
		],
		[
			-1119,
			-2105
		],
		[
			4340,
			-2626
		],
		[
			1786,
			-818
		]
	],
	[
		[
			5716264,
			7888815
		],
		[
			596,
			-1756
		],
		[
			-1824,
			-2840
		],
		[
			-2781,
			-2350
		],
		[
			1234,
			-4163
		],
		[
			2065,
			-2179
		],
		[
			3,
			-1042
		],
		[
			-2244,
			-2151
		],
		[
			-2920,
			-689
		],
		[
			-1460,
			393
		],
		[
			-2169,
			2348
		],
		[
			725,
			2585
		],
		[
			-571,
			3995
		],
		[
			2044,
			3253
		],
		[
			4140,
			394
		],
		[
			-918,
			2999
		],
		[
			2052,
			-79
		],
		[
			2028,
			1282
		]
	],
	[
		[
			6007569,
			8058731
		],
		[
			1145,
			-493
		],
		[
			1331,
			173
		],
		[
			286,
			-1397
		],
		[
			2136,
			-531
		],
		[
			3290,
			103
		],
		[
			1474,
			775
		],
		[
			1364,
			58
		],
		[
			1236,
			-1202
		],
		[
			1640,
			-878
		],
		[
			1022,
			385
		],
		[
			1882,
			-761
		],
		[
			-1232,
			-3388
		],
		[
			-1641,
			1089
		],
		[
			-683,
			2073
		],
		[
			-633,
			-315
		],
		[
			-1601,
			1751
		],
		[
			-1241,
			-1240
		],
		[
			1471,
			-2404
		],
		[
			-376,
			-352
		],
		[
			-2775,
			-712
		],
		[
			-4805,
			-34
		],
		[
			-3345,
			1136
		],
		[
			-1527,
			742
		],
		[
			-938,
			1131
		],
		[
			-1306,
			474
		],
		[
			-352,
			1047
		],
		[
			1280,
			639
		],
		[
			291,
			804
		],
		[
			2607,
			1327
		]
	],
	[
		[
			6026294,
			8022076
		],
		[
			224,
			-1183
		],
		[
			-2105,
			-994
		],
		[
			-601,
			-940
		],
		[
			-1523,
			-856
		],
		[
			805,
			-825
		],
		[
			-631,
			-1237
		],
		[
			-1118,
			-707
		],
		[
			2911,
			-1314
		],
		[
			-1086,
			-1845
		],
		[
			-4122,
			-498
		],
		[
			-604,
			980
		],
		[
			-2427,
			1500
		],
		[
			1031,
			794
		],
		[
			-83,
			2296
		],
		[
			-1268,
			200
		],
		[
			-2617,
			1801
		],
		[
			1117,
			715
		],
		[
			1237,
			-1163
		],
		[
			1533,
			645
		],
		[
			210,
			504
		],
		[
			-1468,
			572
		],
		[
			-873,
			753
		],
		[
			-2397,
			-769
		],
		[
			-403,
			316
		],
		[
			1606,
			1137
		],
		[
			2191,
			-322
		],
		[
			2880,
			621
		],
		[
			667,
			-840
		],
		[
			1154,
			585
		],
		[
			3896,
			633
		],
		[
			1864,
			-559
		]
	],
	[
		[
			6067838,
			8066323
		],
		[
			-3240,
			-2061
		],
		[
			-2173,
			-348
		],
		[
			-1156,
			-1342
		],
		[
			-2664,
			198
		],
		[
			-493,
			-2213
		],
		[
			-1136,
			772
		],
		[
			-183,
			1246
		],
		[
			-1860,
			-599
		],
		[
			-2662,
			37
		],
		[
			-6289,
			-4247
		],
		[
			-622,
			447
		],
		[
			554,
			2323
		],
		[
			8498,
			4356
		],
		[
			663,
			967
		],
		[
			-200,
			2001
		],
		[
			4817,
			612
		],
		[
			237,
			-443
		],
		[
			-2000,
			-2313
		],
		[
			1739,
			-684
		],
		[
			9369,
			2619
		],
		[
			3064,
			1900
		],
		[
			1880,
			-2304
		],
		[
			-6143,
			-924
		]
	],
	[
		[
			6024943,
			8068531
		],
		[
			2402,
			-2810
		],
		[
			2254,
			-478
		],
		[
			1151,
			-1475
		],
		[
			-3705,
			-1705
		],
		[
			96,
			2023
		],
		[
			-4192,
			2752
		],
		[
			-2768,
			655
		],
		[
			-1117,
			-225
		],
		[
			563,
			-1219
		],
		[
			-3265,
			-978
		],
		[
			-3212,
			1505
		],
		[
			-484,
			2603
		],
		[
			-3161,
			2129
		],
		[
			265,
			282
		],
		[
			5385,
			95
		],
		[
			4239,
			2683
		],
		[
			738,
			-618
		],
		[
			-901,
			-1993
		],
		[
			-1827,
			-852
		],
		[
			34,
			-502
		],
		[
			3915,
			-1224
		],
		[
			3590,
			-648
		]
	],
	[
		[
			6228384,
			8201983
		],
		[
			2067,
			-456
		],
		[
			1343,
			54
		],
		[
			1002,
			-738
		],
		[
			0,
			-1416
		],
		[
			1535,
			-752
		],
		[
			971,
			164
		],
		[
			652,
			1103
		],
		[
			1701,
			271
		],
		[
			33,
			-812
		],
		[
			889,
			-356
		],
		[
			-594,
			-1111
		],
		[
			-1708,
			-793
		],
		[
			33,
			-677
		],
		[
			-1220,
			-868
		],
		[
			-685,
			720
		],
		[
			-788,
			-65
		],
		[
			-1533,
			1235
		],
		[
			-1577,
			-422
		],
		[
			-1269,
			940
		],
		[
			-1276,
			-229
		],
		[
			-2138,
			117
		],
		[
			-92,
			-608
		],
		[
			1809,
			-427
		],
		[
			1213,
			-1359
		],
		[
			-2367,
			-545
		],
		[
			-2073,
			981
		],
		[
			-1770,
			2421
		],
		[
			-2219,
			1615
		],
		[
			1240,
			1748
		],
		[
			2265,
			-272
		],
		[
			1652,
			-637
		],
		[
			1048,
			166
		],
		[
			1856,
			1008
		]
	],
	[
		[
			5696409,
			7742890
		],
		[
			-2580,
			-1237
		],
		[
			-903,
			972
		],
		[
			-1447,
			-629
		],
		[
			-1333,
			206
		],
		[
			-286,
			700
		],
		[
			-959,
			136
		],
		[
			573,
			606
		],
		[
			-304,
			1534
		],
		[
			1173,
			723
		],
		[
			-591,
			238
		],
		[
			927,
			1183
		],
		[
			500,
			250
		],
		[
			3475,
			1678
		],
		[
			2313,
			36
		],
		[
			703,
			1334
		],
		[
			2902,
			1145
		],
		[
			702,
			-1354
		],
		[
			-2399,
			-2839
		],
		[
			-494,
			-984
		],
		[
			-2505,
			-1706
		],
		[
			843,
			-913
		],
		[
			-310,
			-1079
		]
	],
	[
		[
			6054782,
			8050919
		],
		[
			1746,
			-740
		],
		[
			3968,
			696
		],
		[
			-134,
			-2082
		],
		[
			2080,
			-775
		],
		[
			-1694,
			-1445
		],
		[
			-2059,
			496
		],
		[
			-1226,
			-724
		],
		[
			-1239,
			19
		],
		[
			-1260,
			-466
		],
		[
			-477,
			421
		],
		[
			527,
			1200
		],
		[
			-312,
			746
		],
		[
			-3148,
			1039
		],
		[
			-1641,
			-534
		],
		[
			697,
			-1284
		],
		[
			-531,
			-1121
		],
		[
			-2764,
			-124
		],
		[
			-881,
			1044
		],
		[
			1516,
			1352
		],
		[
			527,
			934
		],
		[
			1594,
			316
		],
		[
			2008,
			-43
		],
		[
			957,
			848
		],
		[
			-363,
			602
		],
		[
			-1704,
			727
		],
		[
			-2065,
			1829
		],
		[
			2790,
			710
		],
		[
			1219,
			-1394
		],
		[
			2106,
			-433
		],
		[
			-523,
			-1255
		],
		[
			286,
			-559
		]
	],
	[
		[
			5698888,
			7961631
		],
		[
			540,
			-714
		],
		[
			-405,
			-707
		],
		[
			-8396,
			-3387
		],
		[
			-3677,
			2050
		],
		[
			2035,
			1337
		],
		[
			1327,
			849
		],
		[
			1109,
			-47
		],
		[
			1664,
			755
		],
		[
			1866,
			1699
		],
		[
			3304,
			671
		],
		[
			601,
			820
		],
		[
			2540,
			-291
		],
		[
			-266,
			-812
		],
		[
			-803,
			-118
		],
		[
			3,
			-966
		],
		[
			-1442,
			-1139
		]
	],
	[
		[
			6038997,
			8062053
		],
		[
			1168,
			-328
		],
		[
			662,
			1611
		],
		[
			648,
			122
		],
		[
			2080,
			-1491
		],
		[
			-1221,
			-397
		],
		[
			-946,
			207
		],
		[
			233,
			-1435
		],
		[
			-1345,
			-936
		],
		[
			-323,
			-982
		],
		[
			-869,
			-381
		],
		[
			327,
			-1087
		],
		[
			-3,
			-2171
		],
		[
			1862,
			-1130
		],
		[
			-443,
			-643
		],
		[
			-2677,
			116
		],
		[
			-1905,
			-490
		],
		[
			-661,
			2139
		],
		[
			-1917,
			1108
		],
		[
			-896,
			117
		],
		[
			-328,
			1422
		],
		[
			2596,
			-306
		],
		[
			2128,
			599
		],
		[
			350,
			1359
		],
		[
			-1297,
			1074
		],
		[
			538,
			1270
		],
		[
			-538,
			773
		],
		[
			797,
			633
		],
		[
			2334,
			889
		],
		[
			257,
			-498
		],
		[
			-611,
			-1164
		]
	],
	[
		[
			6033662,
			8044676
		],
		[
			-727,
			-1166
		],
		[
			1159,
			-1063
		],
		[
			265,
			-802
		],
		[
			-2109,
			-950
		],
		[
			-815,
			453
		],
		[
			-2978,
			708
		],
		[
			-2318,
			5
		],
		[
			-260,
			-1406
		],
		[
			-693,
			-329
		],
		[
			-1484,
			1598
		],
		[
			-1623,
			124
		],
		[
			-150,
			371
		],
		[
			1807,
			2660
		],
		[
			1206,
			944
		],
		[
			1507,
			-999
		],
		[
			3010,
			-426
		],
		[
			1685,
			682
		],
		[
			141,
			1259
		],
		[
			2122,
			367
		],
		[
			1333,
			662
		],
		[
			467,
			-454
		],
		[
			-327,
			-1294
		],
		[
			-1218,
			-944
		]
	],
	[
		[
			5703986,
			7831114
		],
		[
			-625,
			-2784
		],
		[
			121,
			-880
		],
		[
			-2361,
			-1620
		],
		[
			-2038,
			23
		],
		[
			-2429,
			704
		],
		[
			-2501,
			1004
		],
		[
			209,
			1862
		],
		[
			2219,
			823
		],
		[
			2558,
			-92
		],
		[
			440,
			442
		],
		[
			-678,
			1606
		],
		[
			1165,
			717
		],
		[
			1299,
			246
		],
		[
			2011,
			-954
		],
		[
			610,
			-1097
		]
	],
	[
		[
			6207431,
			8157540
		],
		[
			383,
			-2549
		],
		[
			2213,
			286
		],
		[
			192,
			-1278
		],
		[
			-3225,
			-4713
		],
		[
			-3847,
			1581
		],
		[
			-346,
			1387
		],
		[
			781,
			1320
		],
		[
			-1074,
			1125
		],
		[
			-1269,
			431
		],
		[
			-780,
			914
		],
		[
			136,
			665
		],
		[
			1913,
			260
		],
		[
			3778,
			-569
		],
		[
			1145,
			1140
		]
	],
	[
		[
			5693159,
			7788616
		],
		[
			3489,
			-1334
		],
		[
			1489,
			97
		],
		[
			2697,
			-1333
		],
		[
			-1650,
			-878
		],
		[
			-2893,
			94
		],
		[
			-1131,
			-388
		],
		[
			-1332,
			865
		],
		[
			-2756,
			-294
		],
		[
			-2502,
			976
		],
		[
			-1884,
			414
		],
		[
			-1788,
			-48
		],
		[
			-526,
			1463
		],
		[
			2386,
			181
		],
		[
			1235,
			-430
		],
		[
			5166,
			615
		]
	],
	[
		[
			5608006,
			7903380
		],
		[
			666,
			-539
		],
		[
			-2789,
			-2710
		],
		[
			-910,
			-413
		],
		[
			-1393,
			553
		],
		[
			-717,
			-753
		],
		[
			-1098,
			-71
		],
		[
			-1567,
			949
		],
		[
			929,
			697
		],
		[
			1160,
			-351
		],
		[
			585,
			959
		],
		[
			-3401,
			124
		],
		[
			-773,
			-287
		],
		[
			-285,
			1266
		],
		[
			-743,
			385
		],
		[
			868,
			789
		],
		[
			2157,
			-188
		],
		[
			751,
			367
		],
		[
			53,
			-815
		],
		[
			3009,
			394
		],
		[
			-162,
			854
		],
		[
			1316,
			895
		],
		[
			798,
			-514
		],
		[
			-1061,
			-714
		],
		[
			2607,
			-877
		]
	],
	[
		[
			6043432,
			8030966
		],
		[
			-5765,
			-531
		],
		[
			-1786,
			2921
		],
		[
			4416,
			1642
		],
		[
			3498,
			919
		],
		[
			492,
			-249
		],
		[
			177,
			-670
		],
		[
			-1032,
			-4032
		]
	],
	[
		[
			6216811,
			8171848
		],
		[
			-2439,
			-333
		],
		[
			-2581,
			872
		],
		[
			3166,
			3032
		],
		[
			4233,
			1396
		],
		[
			4039,
			202
		],
		[
			170,
			-490
		],
		[
			-6588,
			-4679
		]
	],
	[
		[
			5764296,
			7788566
		],
		[
			-6915,
			-2942
		],
		[
			-374,
			219
		],
		[
			1405,
			2577
		],
		[
			4151,
			1502
		],
		[
			5787,
			4241
		],
		[
			2548,
			255
		],
		[
			234,
			-441
		],
		[
			-912,
			-1093
		],
		[
			-5924,
			-4318
		]
	],
	[
		[
			5745208,
			7754731
		],
		[
			-2258,
			-107
		],
		[
			-2174,
			211
		],
		[
			-705,
			731
		],
		[
			523,
			799
		],
		[
			1196,
			429
		],
		[
			416,
			735
		],
		[
			3716,
			1093
		],
		[
			-1928,
			1429
		],
		[
			1669,
			1452
		],
		[
			888,
			-2881
		],
		[
			899,
			-715
		],
		[
			-185,
			-701
		],
		[
			752,
			-980
		],
		[
			-52,
			-586
		],
		[
			-1270,
			-129
		],
		[
			-1487,
			-780
		]
	],
	[
		[
			5664493,
			7845813
		],
		[
			2139,
			-546
		],
		[
			-190,
			-1447
		],
		[
			1981,
			-16
		],
		[
			244,
			-884
		],
		[
			-4696,
			277
		],
		[
			-343,
			1139
		],
		[
			-3140,
			95
		],
		[
			-2437,
			-1216
		],
		[
			-2605,
			-243
		],
		[
			-1312,
			871
		],
		[
			2093,
			929
		],
		[
			3110,
			385
		],
		[
			209,
			525
		],
		[
			2699,
			-222
		],
		[
			2248,
			353
		]
	],
	[
		[
			5616362,
			7929108
		],
		[
			-971,
			-1554
		],
		[
			-1617,
			-629
		],
		[
			-2691,
			1164
		],
		[
			-961,
			-140
		],
		[
			-253,
			-955
		],
		[
			-2464,
			-733
		],
		[
			-482,
			802
		],
		[
			966,
			1193
		],
		[
			2405,
			252
		],
		[
			718,
			1474
		],
		[
			1106,
			607
		],
		[
			3273,
			243
		],
		[
			971,
			-1724
		]
	],
	[
		[
			6110099,
			8150514
		],
		[
			-1371,
			-803
		],
		[
			-379,
			587
		],
		[
			-4546,
			2096
		],
		[
			1259,
			1330
		],
		[
			3287,
			654
		],
		[
			1383,
			-101
		],
		[
			1359,
			-1505
		],
		[
			-597,
			-674
		],
		[
			-395,
			-1584
		]
	],
	[
		[
			5739715,
			7703753
		],
		[
			-812,
			-536
		],
		[
			-425,
			536
		],
		[
			342,
			1352
		],
		[
			-821,
			1468
		],
		[
			4007,
			4561
		],
		[
			1307,
			250
		],
		[
			-1873,
			-6273
		],
		[
			-1725,
			-1358
		]
	],
	[
		[
			5765520,
			7781035
		],
		[
			-246,
			-1068
		],
		[
			-2606,
			-1553
		],
		[
			-192,
			-512
		],
		[
			-1962,
			-1627
		],
		[
			-744,
			-311
		],
		[
			-1167,
			888
		],
		[
			-2269,
			18
		],
		[
			458,
			832
		],
		[
			1728,
			824
		],
		[
			260,
			965
		],
		[
			1934,
			85
		],
		[
			1319,
			537
		],
		[
			1508,
			-42
		],
		[
			1979,
			964
		]
	],
	[
		[
			5600498,
			7912036
		],
		[
			-687,
			-1579
		],
		[
			-1285,
			87
		],
		[
			-127,
			-568
		],
		[
			-1534,
			-938
		],
		[
			-1297,
			615
		],
		[
			-831,
			-642
		],
		[
			-2018,
			447
		],
		[
			1191,
			980
		],
		[
			1299,
			1694
		],
		[
			3715,
			458
		],
		[
			1574,
			-554
		]
	],
	[
		[
			5825056,
			7714063
		],
		[
			-1290,
			-808
		],
		[
			-33,
			780
		],
		[
			-1611,
			-137
		],
		[
			-1457,
			-910
		],
		[
			-601,
			881
		],
		[
			2593,
			3654
		],
		[
			976,
			386
		],
		[
			1679,
			-98
		],
		[
			-189,
			-1913
		],
		[
			649,
			-702
		],
		[
			-716,
			-1133
		]
	],
	[
		[
			5605163,
			7939301
		],
		[
			-1521,
			-258
		],
		[
			-952,
			588
		],
		[
			-2581,
			28
		],
		[
			-1363,
			964
		],
		[
			-584,
			980
		],
		[
			1820,
			638
		],
		[
			479,
			514
		],
		[
			1785,
			-333
		],
		[
			2102,
			-819
		],
		[
			815,
			-2302
		]
	],
	[
		[
			6026385,
			8024255
		],
		[
			1734,
			-244
		],
		[
			-305,
			-739
		],
		[
			-1851,
			-403
		],
		[
			-1522,
			336
		],
		[
			-2063,
			-289
		],
		[
			-2860,
			437
		],
		[
			-789,
			437
		],
		[
			2173,
			922
		],
		[
			2632,
			-500
		],
		[
			240,
			1646
		],
		[
			2486,
			252
		],
		[
			125,
			-1855
		]
	],
	[
		[
			5697182,
			7854586
		],
		[
			-825,
			-976
		],
		[
			-1910,
			193
		],
		[
			-438,
			-545
		],
		[
			809,
			-831
		],
		[
			-1397,
			-712
		],
		[
			-1435,
			-21
		],
		[
			-1678,
			758
		],
		[
			-820,
			1113
		],
		[
			2463,
			888
		],
		[
			1382,
			213
		],
		[
			945,
			646
		],
		[
			2187,
			-199
		],
		[
			717,
			-527
		]
	],
	[
		[
			5718136,
			7891594
		],
		[
			-418,
			-1178
		],
		[
			-1373,
			212
		],
		[
			-462,
			966
		],
		[
			-561,
			1174
		],
		[
			1440,
			697
		],
		[
			-288,
			2098
		],
		[
			1244,
			607
		],
		[
			1285,
			486
		],
		[
			598,
			-929
		],
		[
			-1465,
			-4133
		]
	],
	[
		[
			6027381,
			8072003
		],
		[
			-757,
			-814
		],
		[
			-1044,
			538
		],
		[
			-1070,
			-538
		],
		[
			-461,
			2307
		],
		[
			1306,
			1339
		],
		[
			70,
			1041
		],
		[
			813,
			1258
		],
		[
			973,
			265
		],
		[
			1209,
			-1159
		],
		[
			-1117,
			-875
		],
		[
			-891,
			-1484
		],
		[
			969,
			-929
		],
		[
			0,
			-949
		]
	],
	[
		[
			6146035,
			8172728
		],
		[
			964,
			-495
		],
		[
			12,
			621
		],
		[
			1089,
			96
		],
		[
			422,
			-800
		],
		[
			-826,
			-532
		],
		[
			586,
			-667
		],
		[
			-2162,
			-647
		],
		[
			-1001,
			35
		],
		[
			-400,
			1135
		],
		[
			-1273,
			-694
		],
		[
			-1873,
			1638
		],
		[
			777,
			756
		],
		[
			1116,
			41
		],
		[
			2569,
			-487
		]
	],
	[
		[
			5674454,
			7770175
		],
		[
			-1392,
			-753
		],
		[
			-1914,
			266
		],
		[
			-425,
			418
		],
		[
			2033,
			839
		],
		[
			-242,
			1620
		],
		[
			2484,
			883
		],
		[
			1982,
			97
		],
		[
			-353,
			-1276
		],
		[
			-2173,
			-2094
		]
	],
	[
		[
			6154234,
			8093685
		],
		[
			-145,
			-2537
		],
		[
			-1405,
			116
		],
		[
			-378,
			-1054
		],
		[
			-2396,
			-202
		],
		[
			-463,
			820
		],
		[
			1135,
			488
		],
		[
			194,
			1750
		],
		[
			509,
			859
		],
		[
			2949,
			-240
		]
	],
	[
		[
			5594217,
			7915191
		],
		[
			-1314,
			-472
		],
		[
			-2490,
			121
		],
		[
			-1896,
			1250
		],
		[
			780,
			693
		],
		[
			1659,
			50
		],
		[
			266,
			378
		],
		[
			2504,
			-8
		],
		[
			1419,
			-1046
		],
		[
			-928,
			-966
		]
	],
	[
		[
			5579520,
			7889237
		],
		[
			175,
			-676
		],
		[
			-1335,
			299
		],
		[
			-531,
			1492
		],
		[
			-1372,
			1242
		],
		[
			-155,
			989
		],
		[
			1791,
			925
		],
		[
			1752,
			-767
		],
		[
			429,
			-1147
		],
		[
			-882,
			-381
		],
		[
			950,
			-1084
		],
		[
			-822,
			-892
		]
	],
	[
		[
			5587154,
			7844915
		],
		[
			-1201,
			-774
		],
		[
			-1549,
			782
		],
		[
			-371,
			2240
		],
		[
			1826,
			581
		],
		[
			2368,
			29
		],
		[
			-1073,
			-2858
		]
	],
	[
		[
			6074419,
			8074451
		],
		[
			-984,
			-639
		],
		[
			-2798,
			827
		],
		[
			1340,
			2597
		],
		[
			1974,
			360
		],
		[
			553,
			-506
		],
		[
			-85,
			-2639
		]
	],
	[
		[
			6006218,
			8020817
		],
		[
			-4085,
			-696
		],
		[
			-819,
			303
		],
		[
			-890,
			1168
		],
		[
			1709,
			868
		],
		[
			2753,
			585
		],
		[
			-418,
			-889
		],
		[
			1816,
			-814
		],
		[
			-66,
			-525
		]
	],
	[
		[
			5460316,
			7919972
		],
		[
			-772,
			-399
		],
		[
			-1151,
			220
		],
		[
			-657,
			-919
		],
		[
			-3418,
			866
		],
		[
			-390,
			943
		],
		[
			2191,
			631
		],
		[
			1617,
			-280
		],
		[
			984,
			-216
		],
		[
			1596,
			-846
		]
	],
	[
		[
			5552717,
			7819063
		],
		[
			-2184,
			-701
		],
		[
			-994,
			840
		],
		[
			-167,
			1516
		],
		[
			377,
			352
		],
		[
			3515,
			513
		],
		[
			-547,
			-2520
		]
	],
	[
		[
			5692748,
			7823202
		],
		[
			933,
			-863
		],
		[
			-1935,
			-1164
		],
		[
			-1529,
			742
		],
		[
			-1971,
			-455
		],
		[
			-849,
			720
		],
		[
			1388,
			1000
		],
		[
			990,
			-348
		],
		[
			2973,
			368
		]
	],
	[
		[
			5691433,
			7739432
		],
		[
			-1792,
			-661
		],
		[
			21,
			1314
		],
		[
			-1245,
			821
		],
		[
			259,
			303
		],
		[
			3458,
			232
		],
		[
			1795,
			-97
		],
		[
			-542,
			-720
		],
		[
			-1253,
			-8
		],
		[
			-701,
			-1184
		]
	],
	[
		[
			5756067,
			7759164
		],
		[
			-2067,
			-961
		],
		[
			-615,
			1901
		],
		[
			550,
			1283
		],
		[
			1620,
			4
		],
		[
			516,
			-898
		],
		[
			-4,
			-1329
		]
	],
	[
		[
			5565154,
			7826832
		],
		[
			-1684,
			-12
		],
		[
			-1423,
			679
		],
		[
			-755,
			934
		],
		[
			840,
			441
		],
		[
			1958,
			26
		],
		[
			1063,
			-335
		],
		[
			1,
			-1733
		]
	],
	[
		[
			5984541,
			8032801
		],
		[
			2386,
			-851
		],
		[
			595,
			418
		],
		[
			1130,
			-665
		],
		[
			-113,
			-626
		],
		[
			-1590,
			-407
		],
		[
			-2612,
			642
		],
		[
			-564,
			1271
		],
		[
			768,
			218
		]
	],
	[
		[
			6020902,
			8046639
		],
		[
			-826,
			-800
		],
		[
			-785,
			425
		],
		[
			-1274,
			-341
		],
		[
			-580,
			619
		],
		[
			-1662,
			239
		],
		[
			-11,
			604
		],
		[
			3078,
			513
		],
		[
			386,
			-1059
		],
		[
			1674,
			-200
		]
	],
	[
		[
			6004394,
			8005891
		],
		[
			-2245,
			-293
		],
		[
			-315,
			230
		],
		[
			241,
			560
		],
		[
			735,
			1706
		],
		[
			637,
			194
		],
		[
			1518,
			-1387
		],
		[
			-290,
			-513
		],
		[
			-281,
			-497
		]
	],
	[
		[
			6214967,
			8152622
		],
		[
			-1141,
			-837
		],
		[
			-1970,
			1009
		],
		[
			-850,
			1024
		],
		[
			3695,
			31
		],
		[
			266,
			-1227
		]
	],
	[
		[
			6218404,
			8199980
		],
		[
			-1355,
			-954
		],
		[
			-2064,
			223
		],
		[
			47,
			-841
		],
		[
			-1171,
			269
		],
		[
			1250,
			1197
		],
		[
			122,
			737
		],
		[
			2433,
			-75
		],
		[
			738,
			-556
		]
	],
	[
		[
			6158325,
			8158168
		],
		[
			-1817,
			-351
		],
		[
			-2014,
			1031
		],
		[
			1981,
			935
		],
		[
			2015,
			-717
		],
		[
			-165,
			-898
		]
	],
	[
		[
			5775338,
			7938899
		],
		[
			-1337,
			-197
		],
		[
			-991,
			771
		],
		[
			146,
			1268
		],
		[
			923,
			384
		],
		[
			1049,
			-260
		],
		[
			210,
			-1966
		]
	],
	[
		[
			5999916,
			8022131
		],
		[
			-1823,
			-148
		],
		[
			-1187,
			1382
		],
		[
			711,
			870
		],
		[
			2640,
			-1313
		],
		[
			-341,
			-791
		]
	],
	[
		[
			5733437,
			7872481
		],
		[
			-860,
			-522
		],
		[
			-1934,
			183
		],
		[
			-913,
			1360
		],
		[
			2079,
			348
		],
		[
			1628,
			-1369
		]
	],
	[
		[
			6020245,
			8050553
		],
		[
			-1718,
			-842
		],
		[
			-2454,
			725
		],
		[
			339,
			388
		],
		[
			3058,
			700
		],
		[
			775,
			-971
		]
	],
	[
		[
			5772327,
			7943449
		],
		[
			-212,
			-989
		],
		[
			-2696,
			584
		],
		[
			-354,
			-437
		],
		[
			-1142,
			784
		],
		[
			1649,
			965
		],
		[
			719,
			-613
		],
		[
			2036,
			-294
		]
	],
	[
		[
			5820675,
			7710154
		],
		[
			-1118,
			-520
		],
		[
			-1283,
			920
		],
		[
			329,
			570
		],
		[
			2141,
			949
		],
		[
			372,
			-320
		],
		[
			-441,
			-1599
		]
	],
	[
		[
			5809308,
			7690457
		],
		[
			-1165,
			-672
		],
		[
			-632,
			1010
		],
		[
			-1132,
			435
		],
		[
			-315,
			999
		],
		[
			1717,
			66
		],
		[
			1527,
			-1838
		]
	],
	[
		[
			5610860,
			7904576
		],
		[
			-381,
			-860
		],
		[
			-899,
			-129
		],
		[
			-342,
			801
		],
		[
			-1183,
			-512
		],
		[
			-761,
			1227
		],
		[
			258,
			411
		],
		[
			1830,
			-284
		],
		[
			1478,
			-654
		]
	],
	[
		[
			5555078,
			7891612
		],
		[
			-1634,
			-1614
		],
		[
			-2196,
			503
		],
		[
			165,
			1111
		],
		[
			1247,
			-569
		],
		[
			1918,
			999
		],
		[
			500,
			-430
		]
	],
	[
		[
			5582491,
			7841649
		],
		[
			933,
			-1478
		],
		[
			-1442,
			158
		],
		[
			-414,
			-934
		],
		[
			-2361,
			729
		],
		[
			579,
			586
		],
		[
			879,
			-235
		],
		[
			1826,
			1174
		]
	],
	[
		[
			5800452,
			7717160
		],
		[
			-697,
			-813
		],
		[
			-1024,
			545
		],
		[
			-387,
			1009
		],
		[
			377,
			1364
		],
		[
			615,
			-171
		],
		[
			1116,
			-1934
		]
	],
	[
		[
			6241369,
			8180781
		],
		[
			-2255,
			-266
		],
		[
			-1580,
			346
		],
		[
			340,
			848
		],
		[
			2509,
			79
		],
		[
			986,
			-1007
		]
	],
	[
		[
			6226989,
			8205017
		],
		[
			-1741,
			-201
		],
		[
			-1599,
			1470
		],
		[
			689,
			393
		],
		[
			2336,
			-842
		],
		[
			315,
			-820
		]
	],
	[
		[
			5768470,
			7928686
		],
		[
			854,
			-2144
		],
		[
			-1869,
			354
		],
		[
			-561,
			1171
		],
		[
			210,
			570
		],
		[
			1366,
			49
		]
	],
	[
		[
			5558301,
			7823643
		],
		[
			-3049,
			-44
		],
		[
			712,
			936
		],
		[
			1668,
			382
		],
		[
			1294,
			-512
		],
		[
			-625,
			-762
		]
	],
	[
		[
			6177051,
			8171497
		],
		[
			-1327,
			-660
		],
		[
			-978,
			607
		],
		[
			1097,
			726
		],
		[
			-405,
			596
		],
		[
			1147,
			148
		],
		[
			988,
			-488
		],
		[
			-522,
			-929
		]
	],
	[
		[
			5571580,
			7895815
		],
		[
			1406,
			-1084
		],
		[
			1852,
			101
		],
		[
			-790,
			-1164
		],
		[
			-1379,
			236
		],
		[
			-1503,
			1386
		],
		[
			414,
			525
		]
	],
	[
		[
			5587435,
			7910231
		],
		[
			-11,
			-1313
		],
		[
			-1808,
			185
		],
		[
			-515,
			1291
		],
		[
			1096,
			271
		],
		[
			1238,
			-434
		]
	],
	[
		[
			5627016,
			7959375
		],
		[
			-1426,
			-1496
		],
		[
			-832,
			560
		],
		[
			790,
			1771
		],
		[
			743,
			0
		],
		[
			725,
			-835
		]
	],
	[
		[
			5608106,
			7914685
		],
		[
			-216,
			-690
		],
		[
			-2231,
			1082
		],
		[
			-196,
			395
		],
		[
			1629,
			635
		],
		[
			1014,
			-1422
		]
	],
	[
		[
			6198972,
			8138564
		],
		[
			-1281,
			-1047
		],
		[
			-1019,
			1483
		],
		[
			-1246,
			238
		],
		[
			754,
			491
		],
		[
			2792,
			-1165
		]
	],
	[
		[
			5666187,
			7871838
		],
		[
			-914,
			-268
		],
		[
			-1128,
			610
		],
		[
			1694,
			1163
		],
		[
			977,
			-427
		],
		[
			-629,
			-1078
		]
	],
	[
		[
			5553230,
			7816958
		],
		[
			-1501,
			-442
		],
		[
			-1778,
			784
		],
		[
			655,
			428
		],
		[
			2557,
			-168
		],
		[
			67,
			-602
		]
	],
	[
		[
			5882571,
			7994440
		],
		[
			-1342,
			-925
		],
		[
			-1159,
			222
		],
		[
			-216,
			967
		],
		[
			2522,
			151
		],
		[
			195,
			-415
		]
	],
	[
		[
			6184031,
			8186976
		],
		[
			-1676,
			-255
		],
		[
			-648,
			439
		],
		[
			880,
			1094
		],
		[
			905,
			171
		],
		[
			539,
			-1449
		]
	],
	[
		[
			5576417,
			7905084
		],
		[
			-2635,
			-712
		],
		[
			-466,
			491
		],
		[
			345,
			620
		],
		[
			2625,
			148
		],
		[
			131,
			-547
		]
	],
	[
		[
			5576749,
			7843175
		],
		[
			-1354,
			-107
		],
		[
			-501,
			434
		],
		[
			1440,
			1136
		],
		[
			1170,
			-561
		],
		[
			-755,
			-902
		]
	],
	[
		[
			5758764,
			7666849
		],
		[
			-1914,
			-646
		],
		[
			-1433,
			451
		],
		[
			925,
			622
		],
		[
			1691,
			70
		],
		[
			731,
			-497
		]
	],
	[
		[
			5776942,
			7798205
		],
		[
			-871,
			-1635
		],
		[
			-1536,
			749
		],
		[
			621,
			753
		],
		[
			1786,
			133
		]
	],
	[
		[
			6033760,
			8060185
		],
		[
			-966,
			-1328
		],
		[
			-713,
			1141
		],
		[
			579,
			1468
		],
		[
			1100,
			-1281
		]
	],
	[
		[
			6180491,
			8143836
		],
		[
			-1182,
			-859
		],
		[
			-1291,
			410
		],
		[
			2094,
			1491
		],
		[
			379,
			-1042
		]
	],
	[
		[
			5730506,
			7866123
		],
		[
			-1951,
			-573
		],
		[
			-607,
			772
		],
		[
			1789,
			668
		],
		[
			769,
			-867
		]
	],
	[
		[
			6211911,
			8174144
		],
		[
			-915,
			-280
		],
		[
			-343,
			1098
		],
		[
			1074,
			699
		],
		[
			716,
			-257
		],
		[
			-532,
			-1260
		]
	],
	[
		[
			5771914,
			7940513
		],
		[
			562,
			-794
		],
		[
			-1079,
			-551
		],
		[
			-1445,
			-66
		],
		[
			-99,
			937
		],
		[
			1336,
			-271
		],
		[
			725,
			745
		]
	],
	[
		[
			5739877,
			7762996
		],
		[
			-2206,
			-641
		],
		[
			-490,
			391
		],
		[
			809,
			623
		],
		[
			1651,
			296
		],
		[
			236,
			-669
		]
	],
	[
		[
			5607980,
			7912651
		],
		[
			-961,
			-512
		],
		[
			-1561,
			1063
		],
		[
			1140,
			520
		],
		[
			1382,
			-1071
		]
	],
	[
		[
			5603355,
			7947109
		],
		[
			29,
			-1146
		],
		[
			-1905,
			340
		],
		[
			265,
			927
		],
		[
			1611,
			-121
		]
	],
	[
		[
			6180130,
			8153798
		],
		[
			-155,
			-1046
		],
		[
			-1946,
			256
		],
		[
			913,
			1104
		],
		[
			1188,
			-314
		]
	],
	[
		[
			5681381,
			7781627
		],
		[
			-997,
			-127
		],
		[
			-326,
			744
		],
		[
			1415,
			954
		],
		[
			418,
			-625
		],
		[
			-510,
			-946
		]
	],
	[
		[
			5680404,
			7927916
		],
		[
			-170,
			-957
		],
		[
			-2203,
			1864
		],
		[
			1432,
			410
		],
		[
			-79,
			-1025
		],
		[
			1020,
			-292
		]
	],
	[
		[
			5690448,
			7783506
		],
		[
			-1078,
			-578
		],
		[
			-1113,
			1098
		],
		[
			1672,
			427
		],
		[
			519,
			-947
		]
	],
	[
		[
			5773164,
			7936534
		],
		[
			-1543,
			-1347
		],
		[
			-647,
			783
		],
		[
			871,
			933
		],
		[
			1319,
			-369
		]
	],
	[
		[
			6033095,
			8051101
		],
		[
			-605,
			-531
		],
		[
			-1241,
			1032
		],
		[
			1453,
			878
		],
		[
			393,
			-1379
		]
	],
	[
		[
			5999244,
			8026768
		],
		[
			-1102,
			-1121
		],
		[
			-1029,
			1004
		],
		[
			510,
			672
		],
		[
			1621,
			-555
		]
	],
	[
		[
			5726712,
			7869307
		],
		[
			-1322,
			-296
		],
		[
			-335,
			995
		],
		[
			427,
			701
		],
		[
			1325,
			-892
		],
		[
			-95,
			-508
		]
	],
	[
		[
			5549080,
			7891364
		],
		[
			109,
			-928
		],
		[
			-2517,
			218
		],
		[
			578,
			718
		],
		[
			1830,
			-8
		]
	],
	[
		[
			5663337,
			7875710
		],
		[
			-1,
			-1503
		],
		[
			-1629,
			690
		],
		[
			672,
			1061
		],
		[
			958,
			-248
		]
	],
	[
		[
			5467329,
			7925342
		],
		[
			-890,
			-372
		],
		[
			-1397,
			372
		],
		[
			1104,
			1197
		],
		[
			540,
			-289
		],
		[
			122,
			-578
		],
		[
			521,
			-330
		]
	],
	[
		[
			5571843,
			7830384
		],
		[
			-1410,
			-866
		],
		[
			-675,
			1142
		],
		[
			1401,
			503
		],
		[
			684,
			-779
		]
	],
	[
		[
			5591270,
			7907475
		],
		[
			-1406,
			-899
		],
		[
			-977,
			808
		],
		[
			1139,
			722
		],
		[
			1244,
			-631
		]
	],
	[
		[
			6077760,
			8077049
		],
		[
			-2063,
			-173
		],
		[
			-432,
			355
		],
		[
			1650,
			1012
		],
		[
			845,
			-1194
		]
	],
	[
		[
			5781496,
			7937768
		],
		[
			-923,
			-1410
		],
		[
			-1015,
			312
		],
		[
			909,
			1501
		],
		[
			1029,
			-403
		]
	],
	[
		[
			6048352,
			8028128
		],
		[
			-1349,
			-481
		],
		[
			-651,
			1164
		],
		[
			2084,
			163
		],
		[
			-84,
			-846
		]
	],
	[
		[
			6179306,
			8150582
		],
		[
			-1490,
			-939
		],
		[
			-764,
			949
		],
		[
			1596,
			658
		],
		[
			658,
			-668
		]
	],
	[
		[
			5558587,
			7826120
		],
		[
			-199,
			-578
		],
		[
			-1625,
			6
		],
		[
			-311,
			474
		],
		[
			503,
			795
		],
		[
			1632,
			-697
		]
	],
	[
		[
			6201074,
			8185153
		],
		[
			-860,
			-550
		],
		[
			-1319,
			887
		],
		[
			1141,
			807
		],
		[
			1038,
			-1144
		]
	],
	[
		[
			5762062,
			7680941
		],
		[
			-1911,
			-303
		],
		[
			-849,
			558
		],
		[
			2055,
			647
		],
		[
			705,
			-902
		]
	],
	[
		[
			5551050,
			7892518
		],
		[
			-376,
			-1441
		],
		[
			-1624,
			412
		],
		[
			339,
			742
		],
		[
			1661,
			287
		]
	],
	[
		[
			5578922,
			7838922
		],
		[
			269,
			-1258
		],
		[
			-1967,
			386
		],
		[
			-335,
			571
		],
		[
			2033,
			301
		]
	],
	[
		[
			6010266,
			8012753
		],
		[
			-1126,
			-577
		],
		[
			-669,
			378
		],
		[
			177,
			747
		],
		[
			1472,
			437
		],
		[
			146,
			-985
		]
	],
	[
		[
			5685302,
			7912096
		],
		[
			966,
			-1320
		],
		[
			-1706,
			21
		],
		[
			-781,
			520
		],
		[
			1521,
			779
		]
	],
	[
		[
			5798420,
			7968743
		],
		[
			-1109,
			-250
		],
		[
			153,
			999
		],
		[
			1390,
			858
		],
		[
			204,
			-856
		],
		[
			-638,
			-751
		]
	],
	[
		[
			5764588,
			7934219
		],
		[
			-1118,
			-131
		],
		[
			-535,
			570
		],
		[
			1387,
			973
		],
		[
			586,
			-452
		],
		[
			-320,
			-960
		]
	],
	[
		[
			6200819,
			8182466
		],
		[
			-1738,
			-260
		],
		[
			-351,
			366
		],
		[
			1503,
			1315
		],
		[
			586,
			-1421
		]
	],
	[
		[
			6065457,
			8061444
		],
		[
			-1104,
			-614
		],
		[
			-849,
			661
		],
		[
			565,
			787
		],
		[
			1004,
			-16
		],
		[
			384,
			-818
		]
	],
	[
		[
			5803767,
			7663476
		],
		[
			-744,
			-252
		],
		[
			-649,
			695
		],
		[
			790,
			860
		],
		[
			603,
			-318
		],
		[
			558,
			-295
		],
		[
			-41,
			-514
		],
		[
			-517,
			-176
		]
	],
	[
		[
			6004230,
			8053276
		],
		[
			-1077,
			-858
		],
		[
			-1241,
			393
		],
		[
			440,
			1013
		],
		[
			1878,
			-548
		]
	],
	[
		[
			5590397,
			7919314
		],
		[
			-960,
			-1603
		],
		[
			-809,
			1264
		],
		[
			447,
			719
		],
		[
			1322,
			-380
		]
	],
	[
		[
			5875768,
			7992056
		],
		[
			-441,
			-728
		],
		[
			-1641,
			823
		],
		[
			1367,
			934
		],
		[
			715,
			-1029
		]
	],
	[
		[
			6193579,
			8190055
		],
		[
			-440,
			-715
		],
		[
			-1745,
			889
		],
		[
			1486,
			794
		],
		[
			699,
			-968
		]
	],
	[
		[
			6218749,
			8205045
		],
		[
			-1269,
			-950
		],
		[
			-798,
			938
		],
		[
			575,
			818
		],
		[
			1492,
			-806
		]
	],
	[
		[
			5666951,
			7874322
		],
		[
			-1315,
			-358
		],
		[
			-684,
			809
		],
		[
			86,
			552
		],
		[
			444,
			384
		],
		[
			1469,
			-1387
		]
	],
	[
		[
			5619390,
			7931890
		],
		[
			-1050,
			-113
		],
		[
			-608,
			844
		],
		[
			998,
			701
		],
		[
			876,
			-712
		],
		[
			-216,
			-720
		]
	],
	[
		[
			6057024,
			8054648
		],
		[
			371,
			-1476
		],
		[
			-1514,
			49
		],
		[
			-420,
			712
		],
		[
			1563,
			715
		]
	],
	[
		[
			5677100,
			7789372
		],
		[
			-655,
			-605
		],
		[
			-1291,
			917
		],
		[
			331,
			1102
		],
		[
			1615,
			-1414
		]
	],
	[
		[
			5768444,
			7940876
		],
		[
			-1071,
			-25
		],
		[
			-60,
			977
		],
		[
			572,
			421
		],
		[
			1395,
			-634
		],
		[
			-836,
			-739
		]
	],
	[
		[
			6179529,
			8141514
		],
		[
			-342,
			-858
		],
		[
			-860,
			140
		],
		[
			-459,
			1245
		],
		[
			844,
			347
		],
		[
			817,
			-874
		]
	],
	[
		[
			6018198,
			8023936
		],
		[
			-1260,
			-671
		],
		[
			-915,
			828
		],
		[
			1828,
			775
		],
		[
			347,
			-932
		]
	],
	[
		[
			5673603,
			7787432
		],
		[
			-1328,
			-469
		],
		[
			-558,
			1114
		],
		[
			1327,
			549
		],
		[
			559,
			-1194
		]
	],
	[
		[
			6005892,
			8018673
		],
		[
			-768,
			-686
		],
		[
			-1369,
			384
		],
		[
			339,
			605
		],
		[
			1481,
			421
		],
		[
			317,
			-724
		]
	],
	[
		[
			5682357,
			7928905
		],
		[
			-1063,
			-684
		],
		[
			-1196,
			433
		],
		[
			1177,
			1172
		],
		[
			1082,
			-921
		]
	],
	[
		[
			5741007,
			7702789
		],
		[
			-933,
			-1788
		],
		[
			-1113,
			397
		],
		[
			1365,
			1549
		],
		[
			681,
			-158
		]
	],
	[
		[
			5452920,
			7921361
		],
		[
			-1955,
			-482
		],
		[
			-334,
			726
		],
		[
			2212,
			660
		],
		[
			77,
			-904
		]
	],
	[
		[
			5708158,
			7785623
		],
		[
			-393,
			-823
		],
		[
			-2359,
			637
		],
		[
			496,
			557
		],
		[
			2256,
			-371
		]
	],
	[
		[
			6180028,
			8173996
		],
		[
			-1805,
			-100
		],
		[
			-240,
			821
		],
		[
			1953,
			351
		],
		[
			92,
			-1072
		]
	],
	[
		[
			6181424,
			8135703
		],
		[
			-469,
			-332
		],
		[
			-1979,
			266
		],
		[
			711,
			1183
		],
		[
			1737,
			-1117
		]
	],
	[
		[
			5651144,
			7889730
		],
		[
			-802,
			-347
		],
		[
			-1005,
			1580
		],
		[
			1298,
			230
		],
		[
			509,
			-1463
		]
	],
	[
		[
			5733281,
			8052078
		],
		[
			143,
			-1462
		],
		[
			-1747,
			-187
		],
		[
			-407,
			791
		],
		[
			943,
			-39
		],
		[
			1068,
			897
		]
	],
	[
		[
			5624693,
			7961053
		],
		[
			-714,
			-462
		],
		[
			-1076,
			900
		],
		[
			604,
			761
		],
		[
			824,
			-104
		],
		[
			362,
			-1095
		]
	],
	[
		[
			6059098,
			8042193
		],
		[
			-1128,
			-1282
		],
		[
			-848,
			1145
		],
		[
			355,
			658
		],
		[
			1621,
			-521
		]
	],
	[
		[
			5744176,
			7761579
		],
		[
			-1466,
			-619
		],
		[
			-938,
			386
		],
		[
			950,
			1125
		],
		[
			1454,
			-892
		]
	],
	[
		[
			5735602,
			7912481
		],
		[
			-290,
			-1355
		],
		[
			-2044,
			635
		],
		[
			275,
			375
		],
		[
			2059,
			345
		]
	],
	[
		[
			5622142,
			7961633
		],
		[
			-704,
			-95
		],
		[
			-1424,
			1076
		],
		[
			481,
			501
		],
		[
			1132,
			-290
		],
		[
			515,
			-1192
		]
	],
	[
		[
			6236985,
			8213431
		],
		[
			-901,
			-798
		],
		[
			-781,
			443
		],
		[
			831,
			950
		],
		[
			851,
			-595
		]
	],
	[
		[
			6236343,
			8214182
		],
		[
			-264,
			-173
		],
		[
			-601,
			305
		],
		[
			374,
			492
		],
		[
			477,
			-101
		],
		[
			14,
			-523
		]
	],
	[
		[
			6180449,
			8141504
		],
		[
			-424,
			-660
		],
		[
			-554,
			497
		],
		[
			479,
			418
		],
		[
			499,
			-255
		]
	],
	[
		[
			6148603,
			7337445
		],
		[
			759,
			-2462
		],
		[
			3864,
			-2307
		],
		[
			-2299,
			-1862
		],
		[
			636,
			-2095
		],
		[
			-2276,
			-689
		],
		[
			-2391,
			-2701
		],
		[
			-21,
			-6209
		],
		[
			-3273,
			-2139
		],
		[
			1813,
			-2165
		],
		[
			848,
			-4560
		],
		[
			3761,
			-2956
		],
		[
			-1447,
			-402
		],
		[
			-1707,
			809
		],
		[
			-1407,
			-1874
		],
		[
			971,
			-1987
		],
		[
			2354,
			-1729
		],
		[
			-797,
			-1801
		],
		[
			-1556,
			-1022
		],
		[
			-34,
			-2395
		],
		[
			1218,
			-1013
		],
		[
			2578,
			-80
		],
		[
			4700,
			-5280
		],
		[
			1810,
			661
		],
		[
			676,
			-3181
		],
		[
			4964,
			-4921
		],
		[
			-630,
			-1494
		],
		[
			-2781,
			-1884
		],
		[
			6174,
			-4278
		],
		[
			1069,
			-2208
		],
		[
			-831,
			-1587
		],
		[
			-2014,
			901
		],
		[
			-1001,
			-538
		],
		[
			-289,
			-1667
		],
		[
			900,
			-2181
		],
		[
			-1628,
			-1406
		],
		[
			70,
			-3114
		],
		[
			-6333,
			307
		],
		[
			-3497,
			-3277
		],
		[
			-5456,
			-1080
		],
		[
			1825,
			-1822
		],
		[
			1570,
			-3481
		],
		[
			-338,
			-2672
		],
		[
			3238,
			-1527
		],
		[
			-423,
			-7700
		],
		[
			2999,
			-1504
		],
		[
			29,
			-1218
		],
		[
			-2401,
			-1162
		],
		[
			1768,
			-2142
		],
		[
			-1341,
			-1757
		],
		[
			-4540,
			-1168
		],
		[
			-5492,
			2848
		],
		[
			-9471,
			1362
		],
		[
			-2222,
			1778
		],
		[
			-2999,
			-1654
		],
		[
			-1367,
			1074
		],
		[
			-7440,
			-1155
		],
		[
			537,
			-1280
		],
		[
			7513,
			-5537
		],
		[
			3891,
			829
		],
		[
			2224,
			-438
		],
		[
			-183,
			-846
		],
		[
			-462,
			-1730
		],
		[
			-2014,
			-687
		],
		[
			-713,
			-3114
		],
		[
			4217,
			-356
		],
		[
			1127,
			-2222
		],
		[
			-1263,
			-2928
		],
		[
			2108,
			-3662
		],
		[
			3729,
			678
		],
		[
			857,
			-2728
		],
		[
			5498,
			136
		],
		[
			-590,
			-1435
		]
	],
	[
		[
			6145971,
			7212359
		],
		[
			-2839,
			-292
		],
		[
			-2029,
			-1217
		],
		[
			-1199,
			-809
		],
		[
			-11394,
			334
		],
		[
			-6314,
			-2115
		],
		[
			-3266,
			1634
		],
		[
			-3644,
			-246
		],
		[
			-4170,
			1044
		],
		[
			-2081,
			-909
		],
		[
			-387,
			-1273
		],
		[
			2701,
			190
		],
		[
			2419,
			-2337
		],
		[
			6652,
			-1613
		],
		[
			908,
			-2537
		],
		[
			-2579,
			-3943
		],
		[
			-8412,
			-1441
		],
		[
			-3230,
			1393
		],
		[
			-11783,
			2437
		],
		[
			-21459,
			1359
		],
		[
			-2589,
			-1004
		],
		[
			-1635,
			-2484
		],
		[
			-2346,
			-1555
		],
		[
			-12696,
			6602
		],
		[
			-16637,
			6280
		],
		[
			-11872,
			1902
		],
		[
			-5695,
			-1232
		],
		[
			-7260,
			-1859
		],
		[
			-5695,
			209
		],
		[
			-2525,
			-1564
		],
		[
			-15135,
			-1259
		],
		[
			-4582,
			-4001
		],
		[
			-6761,
			-2599
		],
		[
			-4682,
			685
		],
		[
			-3387,
			5850
		],
		[
			-1582,
			470
		],
		[
			-248,
			-1101
		],
		[
			2724,
			-6676
		],
		[
			-5662,
			-5808
		],
		[
			-1327,
			-2527
		],
		[
			-195,
			-3056
		],
		[
			1308,
			-2140
		],
		[
			-4378,
			-886
		],
		[
			-1514,
			-2787
		],
		[
			1116,
			-2185
		],
		[
			4910,
			-781
		],
		[
			-1088,
			-1917
		],
		[
			-1945,
			-3357
		],
		[
			-3781,
			-738
		],
		[
			-6794,
			-3949
		],
		[
			-811,
			-2500
		],
		[
			-1731,
			-5330
		],
		[
			-6050,
			-1395
		],
		[
			-5152,
			2316
		],
		[
			-1896,
			-1169
		],
		[
			-554,
			-341
		],
		[
			-5548,
			1823
		],
		[
			-1187,
			590
		],
		[
			144,
			1899
		],
		[
			-1406,
			1607
		],
		[
			-739,
			844
		],
		[
			-5913,
			1550
		],
		[
			-901,
			1116
		],
		[
			-7914,
			-1369
		],
		[
			-2806,
			288
		],
		[
			-1971,
			1632
		],
		[
			-3892,
			675
		],
		[
			-737,
			2590
		],
		[
			-634,
			1558
		],
		[
			-3419,
			-120
		],
		[
			-1901,
			826
		],
		[
			-1900,
			3025
		],
		[
			1478,
			2470
		],
		[
			-3159,
			5080
		],
		[
			-1945,
			-914
		],
		[
			-114,
			-184
		],
		[
			114,
			-509
		],
		[
			775,
			-311
		],
		[
			399,
			131
		],
		[
			486,
			544
		],
		[
			466,
			7
		],
		[
			454,
			-581
		],
		[
			349,
			-1124
		],
		[
			807,
			-905
		],
		[
			-352,
			-584
		],
		[
			-698,
			-334
		],
		[
			21,
			-1226
		],
		[
			421,
			-663
		],
		[
			-428,
			-771
		],
		[
			-1316,
			-447
		],
		[
			-206,
			-346
		],
		[
			313,
			-203
		],
		[
			1168,
			104
		],
		[
			770,
			-372
		],
		[
			380,
			-562
		],
		[
			-115,
			-333
		],
		[
			672,
			-434
		],
		[
			-162,
			-278
		],
		[
			-426,
			-161
		],
		[
			-725,
			89
		],
		[
			-1398,
			-323
		],
		[
			-200,
			-383
		],
		[
			747,
			-486
		],
		[
			984,
			130
		],
		[
			728,
			-156
		],
		[
			422,
			-655
		],
		[
			1418,
			682
		],
		[
			628,
			-46
		],
		[
			761,
			-935
		],
		[
			-291,
			-504
		],
		[
			-1916,
			-448
		],
		[
			-1069,
			-765
		],
		[
			70,
			-385
		],
		[
			865,
			-593
		],
		[
			-44,
			-483
		],
		[
			-2023,
			-51
		],
		[
			-1327,
			-519
		],
		[
			-175,
			617
		],
		[
			488,
			413
		],
		[
			32,
			215
		],
		[
			-814,
			820
		],
		[
			-1537,
			855
		],
		[
			-3882,
			1512
		],
		[
			-2547,
			449
		],
		[
			-2225,
			85
		],
		[
			-869,
			-191
		],
		[
			-1428,
			138
		],
		[
			-1178,
			-110
		],
		[
			-2151,
			397
		],
		[
			-5007,
			-405
		],
		[
			-1366,
			-916
		],
		[
			-393,
			-612
		],
		[
			-1567,
			-605
		],
		[
			-613,
			-503
		],
		[
			-1848,
			161
		],
		[
			-1072,
			-484
		],
		[
			-3101,
			-610
		],
		[
			-1579,
			34
		],
		[
			-1581,
			335
		],
		[
			-7396,
			19
		],
		[
			-3424,
			-1110
		],
		[
			-1745,
			2727
		],
		[
			-5851,
			-1388
		],
		[
			-1160,
			-1103
		],
		[
			853,
			-1785
		],
		[
			-2526,
			-1664
		],
		[
			-100,
			-1169
		],
		[
			517,
			-2308
		],
		[
			-2278,
			-2565
		],
		[
			-5094,
			842
		],
		[
			-6439,
			-3074
		],
		[
			-3681,
			-175
		],
		[
			-3159,
			-4296
		],
		[
			-1973,
			-1069
		],
		[
			-2024,
			1878
		],
		[
			-1268,
			3754
		],
		[
			-2621,
			-452
		],
		[
			1061,
			-2470
		],
		[
			-1143,
			-1486
		],
		[
			840,
			-1191
		],
		[
			-3121,
			-2012
		],
		[
			-690,
			-1978
		],
		[
			-1583,
			-1060
		],
		[
			3025,
			-1879
		],
		[
			1126,
			-3394
		],
		[
			-4076,
			-3794
		],
		[
			-5575,
			-449
		],
		[
			-3496,
			-3842
		],
		[
			-4976,
			1998
		],
		[
			-1438,
			1989
		],
		[
			-300,
			3040
		],
		[
			-4615,
			4462
		],
		[
			-7535,
			2288
		],
		[
			-4069,
			146
		],
		[
			-4547,
			2070
		],
		[
			-5414,
			-253
		],
		[
			-1509,
			-1371
		],
		[
			-28,
			-3243
		],
		[
			-3851,
			-2144
		],
		[
			-9182,
			-1519
		],
		[
			-3727,
			2653
		],
		[
			1621,
			2479
		],
		[
			-932,
			3998
		],
		[
			2895,
			3245
		],
		[
			4520,
			978
		],
		[
			9612,
			4363
		],
		[
			3727,
			193
		],
		[
			3282,
			-1740
		],
		[
			2944,
			-361
		],
		[
			4609,
			4348
		],
		[
			4927,
			216
		],
		[
			6856,
			3185
		],
		[
			4006,
			4322
		],
		[
			3229,
			849
		],
		[
			3897,
			2503
		],
		[
			1546,
			5307
		],
		[
			6197,
			1531
		],
		[
			2752,
			1596
		],
		[
			1559,
			3359
		],
		[
			744,
			7718
		],
		[
			4090,
			-150
		],
		[
			3854,
			1873
		],
		[
			1990,
			-2826
		],
		[
			1486,
			-243
		],
		[
			-923,
			2220
		],
		[
			72,
			3378
		],
		[
			3467,
			-269
		],
		[
			9386,
			1717
		],
		[
			2282,
			2189
		],
		[
			1518,
			4423
		],
		[
			7462,
			2959
		],
		[
			4081,
			4205
		],
		[
			7419,
			3930
		],
		[
			1375,
			5210
		],
		[
			-1171,
			7343
		],
		[
			2030,
			2336
		],
		[
			1411,
			7225
		],
		[
			1670,
			1885
		],
		[
			4794,
			-49
		],
		[
			8244,
			-2499
		],
		[
			3919,
			-327
		],
		[
			4655,
			1228
		],
		[
			7349,
			5378
		],
		[
			3971,
			-760
		],
		[
			1385,
			2297
		],
		[
			-3546,
			373
		],
		[
			-4092,
			6366
		],
		[
			2775,
			1656
		],
		[
			746,
			3000
		],
		[
			1303,
			1085
		],
		[
			10791,
			1775
		],
		[
			5179,
			-310
		],
		[
			11170,
			1792
		],
		[
			10941,
			281
		],
		[
			3027,
			1046
		],
		[
			6826,
			-968
		],
		[
			10140,
			-1390
		],
		[
			7878,
			1175
		],
		[
			8678,
			-2287
		],
		[
			5489,
			-2463
		],
		[
			12206,
			-220
		],
		[
			13537,
			2780
		],
		[
			6787,
			-556
		],
		[
			4062,
			936
		],
		[
			500,
			-1511
		],
		[
			2563,
			3548
		],
		[
			-1602,
			4000
		],
		[
			316,
			4393
		],
		[
			2229,
			318
		],
		[
			266,
			2493
		],
		[
			128,
			1207
		],
		[
			2320,
			1413
		],
		[
			-289,
			1829
		],
		[
			5805,
			820
		],
		[
			6066,
			5597
		],
		[
			4731,
			2902
		],
		[
			8338,
			1661
		],
		[
			2713,
			-1321
		],
		[
			1256,
			-612
		],
		[
			-1256,
			1047
		],
		[
			-1917,
			1597
		],
		[
			1917,
			1930
		],
		[
			1836,
			1848
		],
		[
			1334,
			3023
		],
		[
			7039,
			5001
		],
		[
			2893,
			3803
		],
		[
			2646,
			1457
		],
		[
			3985,
			1950
		],
		[
			1620,
			2748
		],
		[
			8976,
			3217
		],
		[
			579,
			1521
		],
		[
			-1820,
			733
		],
		[
			-6858,
			-3523
		],
		[
			-4066,
			-3480
		],
		[
			-9819,
			-3701
		],
		[
			-4278,
			-5603
		],
		[
			-1459,
			2351
		]
	],
	[
		[
			6048567,
			7302636
		],
		[
			-1406,
			2669
		],
		[
			1741,
			911
		],
		[
			-2101,
			5273
		],
		[
			1727,
			2207
		],
		[
			-1063,
			1891
		],
		[
			280,
			3349
		],
		[
			2410,
			2375
		]
	],
	[
		[
			6050155,
			7321311
		],
		[
			4960,
			2693
		],
		[
			6883,
			900
		],
		[
			2429,
			2059
		],
		[
			2326,
			-21
		],
		[
			4041,
			1616
		],
		[
			-2380,
			5220
		],
		[
			-2882,
			1014
		],
		[
			383,
			1904
		],
		[
			1657,
			1427
		],
		[
			-1252,
			1435
		],
		[
			813,
			1093
		],
		[
			4057,
			-647
		],
		[
			688,
			-1486
		],
		[
			1613,
			-341
		],
		[
			1507,
			292
		],
		[
			1434,
			1535
		],
		[
			3608,
			829
		],
		[
			2647,
			-2112
		],
		[
			248,
			-2250
		],
		[
			2205,
			-891
		],
		[
			4684,
			-23
		],
		[
			2851,
			2300
		],
		[
			1834,
			406
		],
		[
			4031,
			353
		],
		[
			-1805,
			1863
		],
		[
			743,
			2356
		],
		[
			1175,
			487
		],
		[
			689,
			284
		],
		[
			1112,
			-284
		],
		[
			2771,
			-710
		],
		[
			-2653,
			-2418
		],
		[
			-130,
			-801
		],
		[
			938,
			-447
		],
		[
			2582,
			1088
		],
		[
			4387,
			-520
		],
		[
			2568,
			-305
		],
		[
			5827,
			2982
		],
		[
			2186,
			-144
		],
		[
			2778,
			-183
		],
		[
			2255,
			1055
		],
		[
			7004,
			-3347
		],
		[
			1289,
			2453
		],
		[
			-1941,
			1297
		],
		[
			-1103,
			736
		],
		[
			-896,
			1712
		],
		[
			5585,
			1206
		],
		[
			1863,
			1936
		],
		[
			2649,
			1043
		],
		[
			1748,
			-1655
		],
		[
			1811,
			-356
		],
		[
			662,
			-1989
		],
		[
			2035,
			-371
		],
		[
			1238,
			-2262
		],
		[
			306,
			-560
		],
		[
			6757,
			-628
		],
		[
			-4367,
			-4689
		]
	],
	[
		[
			6070849,
			7190726
		],
		[
			-1498,
			-679
		],
		[
			-179,
			365
		],
		[
			396,
			862
		],
		[
			4,
			1622
		],
		[
			745,
			1668
		],
		[
			-1056,
			1001
		],
		[
			309,
			289
		],
		[
			2573,
			-367
		],
		[
			1421,
			-1769
		],
		[
			-214,
			-738
		],
		[
			-1104,
			-698
		],
		[
			-1397,
			-1556
		]
	],
	[
		[
			5687572,
			7130981
		],
		[
			-744,
			-1107
		],
		[
			-1258,
			-50
		],
		[
			-793,
			-550
		],
		[
			-638,
			606
		],
		[
			-1343,
			-675
		],
		[
			-760,
			755
		],
		[
			976,
			822
		],
		[
			1079,
			52
		],
		[
			-283,
			593
		],
		[
			1444,
			1020
		],
		[
			2067,
			-825
		],
		[
			253,
			-641
		]
	],
	[
		[
			5681683,
			7135050
		],
		[
			1491,
			-1070
		],
		[
			-265,
			-777
		],
		[
			-1002,
			-513
		],
		[
			-651,
			1519
		],
		[
			-761,
			360
		],
		[
			-429,
			-1310
		],
		[
			-1072,
			20
		],
		[
			-292,
			672
		],
		[
			1719,
			1520
		],
		[
			1262,
			-421
		]
	],
	[
		[
			5849207,
			7254849
		],
		[
			-1005,
			-242
		],
		[
			-1018,
			1359
		],
		[
			531,
			836
		],
		[
			-434,
			1508
		],
		[
			333,
			528
		],
		[
			1394,
			-1587
		],
		[
			199,
			-2402
		]
	],
	[
		[
			5686157,
			7135458
		],
		[
			1333,
			-333
		],
		[
			1087,
			288
		],
		[
			305,
			-490
		],
		[
			-1853,
			-544
		],
		[
			-2336,
			805
		],
		[
			1046,
			896
		],
		[
			418,
			-622
		]
	],
	[
		[
			6119422,
			7208210
		],
		[
			-252,
			-900
		],
		[
			-2406,
			85
		],
		[
			-440,
			527
		],
		[
			1355,
			528
		],
		[
			1743,
			-240
		]
	],
	[
		[
			5682339,
			7127568
		],
		[
			-1511,
			-389
		],
		[
			-912,
			1143
		],
		[
			86,
			290
		],
		[
			2472,
			-408
		],
		[
			-135,
			-636
		]
	],
	[
		[
			5892769,
			7185300
		],
		[
			-569,
			-959
		],
		[
			-720,
			242
		],
		[
			3,
			674
		],
		[
			1053,
			525
		],
		[
			233,
			-482
		]
	],
	[
		[
			6005041,
			7465390
		],
		[
			10111,
			-3059
		],
		[
			3456,
			-2144
		],
		[
			4050,
			-2511
		],
		[
			-311,
			-1739
		],
		[
			-3739,
			-1102
		],
		[
			-2188,
			-645
		],
		[
			2188,
			-1575
		],
		[
			2387,
			-1717
		],
		[
			3481,
			-805
		],
		[
			2224,
			464
		],
		[
			-482,
			-1067
		],
		[
			-251,
			-556
		],
		[
			-513,
			-1135
		],
		[
			3065,
			-3046
		],
		[
			957,
			-3775
		],
		[
			2435,
			-2473
		],
		[
			10583,
			-1479
		]
	],
	[
		[
			6042494,
			7437026
		],
		[
			-332,
			-5574
		],
		[
			-2774,
			-544
		],
		[
			-3930,
			-2358
		],
		[
			-5049,
			4481
		],
		[
			-4422,
			698
		],
		[
			-3986,
			-947
		],
		[
			-4434,
			2443
		],
		[
			-3247,
			-1045
		],
		[
			-3251,
			-2576
		],
		[
			-5587,
			-113
		],
		[
			-2054,
			-3083
		],
		[
			-3000,
			-696
		],
		[
			860,
			-2281
		],
		[
			-2321,
			-4405
		],
		[
			572,
			-2415
		],
		[
			5976,
			-934
		],
		[
			2664,
			-1650
		],
		[
			4551,
			-894
		],
		[
			4932,
			-3762
		],
		[
			-4796,
			-1197
		],
		[
			-6354,
			-10427
		],
		[
			-4317,
			-2675
		],
		[
			973,
			-4783
		],
		[
			2129,
			-114
		],
		[
			2325,
			1786
		],
		[
			5278,
			1633
		],
		[
			2213,
			-2531
		],
		[
			-754,
			-1691
		],
		[
			-3472,
			-2409
		],
		[
			-6581,
			-526
		],
		[
			-8656,
			-2345
		],
		[
			-2814,
			-1830
		],
		[
			-433,
			-1885
		],
		[
			1997,
			-1921
		],
		[
			14207,
			-6494
		],
		[
			11097,
			-340
		],
		[
			-3655,
			-2597
		],
		[
			-995,
			-1635
		],
		[
			-389,
			-2182
		],
		[
			1612,
			-1825
		],
		[
			-4508,
			-1309
		],
		[
			-3035,
			-1897
		],
		[
			-4641,
			-6301
		],
		[
			1928,
			-2009
		],
		[
			-3549,
			-2191
		],
		[
			1496,
			-1795
		],
		[
			-603,
			-3675
		],
		[
			2435,
			-2884
		],
		[
			53,
			-2674
		],
		[
			2587,
			-3637
		],
		[
			4341,
			-2864
		],
		[
			1996,
			-2763
		],
		[
			2698,
			-321
		],
		[
			994,
			-1701
		],
		[
			8954,
			2529
		],
		[
			10141,
			-5036
		],
		[
			159,
			-1627
		],
		[
			3330,
			-2525
		],
		[
			2240,
			564
		],
		[
			2666,
			-760
		],
		[
			4196,
			-1196
		]
	],
	[
		[
			6048567,
			7302636
		],
		[
			-4,
			-2586
		],
		[
			-2604,
			-1607
		],
		[
			-2295,
			-1417
		],
		[
			-4596,
			-645
		],
		[
			-14205,
			-4308
		],
		[
			-5683,
			359
		],
		[
			-2582,
			1263
		],
		[
			-2170,
			-1979
		],
		[
			-7521,
			-2829
		],
		[
			-3856,
			-1263
		],
		[
			-3031,
			-3311
		],
		[
			-2277,
			48
		],
		[
			710,
			-1835
		],
		[
			-1013,
			-3377
		],
		[
			-16513,
			-2220
		],
		[
			-21010,
			1828
		],
		[
			-4523,
			3964
		],
		[
			-3787,
			1963
		],
		[
			-217,
			996
		],
		[
			-2271,
			949
		],
		[
			-5653,
			59
		],
		[
			-7194,
			8256
		],
		[
			-2232,
			2560
		],
		[
			-3870,
			2703
		],
		[
			-3617,
			228
		],
		[
			-9387,
			-1202
		],
		[
			-1730,
			-1844
		],
		[
			1206,
			-1806
		],
		[
			-780,
			-392
		],
		[
			-4317,
			366
		],
		[
			-3076,
			-883
		],
		[
			-6679,
			860
		],
		[
			-2018,
			-875
		],
		[
			113,
			-1559
		],
		[
			-6315,
			-458
		],
		[
			-8758,
			2260
		],
		[
			1204,
			1603
		],
		[
			-1123,
			3174
		],
		[
			5759,
			3420
		],
		[
			1505,
			-1302
		],
		[
			5927,
			-461
		],
		[
			8982,
			3210
		],
		[
			2855,
			4478
		],
		[
			-3528,
			-3532
		],
		[
			-2335,
			-707
		],
		[
			-3923,
			-111
		],
		[
			-6007,
			2266
		],
		[
			-9238,
			-910
		],
		[
			-6732,
			4501
		],
		[
			23,
			922
		],
		[
			1549,
			901
		],
		[
			-1332,
			1268
		],
		[
			-395,
			2720
		],
		[
			-3775,
			-1471
		],
		[
			-3673,
			953
		],
		[
			-262,
			-770
		],
		[
			1885,
			-1708
		],
		[
			-984,
			-800
		],
		[
			-22554,
			-1056
		],
		[
			-2113,
			-1191
		],
		[
			-725,
			-3143
		],
		[
			-2805,
			-2919
		],
		[
			-6582,
			-1707
		],
		[
			-6938,
			415
		],
		[
			-6481,
			-3771
		],
		[
			-2625,
			-398
		],
		[
			-9794,
			2044
		],
		[
			-2000,
			3559
		],
		[
			-4157,
			2419
		],
		[
			1428,
			689
		],
		[
			3824,
			-631
		],
		[
			2760,
			985
		],
		[
			6245,
			-1206
		],
		[
			972,
			2341
		],
		[
			-11188,
			499
		],
		[
			-4462,
			1131
		],
		[
			-4708,
			-576
		],
		[
			-473,
			-1831
		],
		[
			-1098,
			-568
		],
		[
			-5442,
			3765
		],
		[
			5820,
			3821
		],
		[
			5807,
			1344
		],
		[
			332,
			3857
		],
		[
			-2854,
			4030
		],
		[
			-8319,
			1381
		],
		[
			-8828,
			-134
		],
		[
			1692,
			3848
		],
		[
			10268,
			3972
		],
		[
			9377,
			2288
		],
		[
			1474,
			4365
		],
		[
			1279,
			1075
		],
		[
			6736,
			-313
		],
		[
			2824,
			-1970
		],
		[
			3999,
			876
		],
		[
			2796,
			1747
		],
		[
			5265,
			-415
		],
		[
			1631,
			2154
		],
		[
			5015,
			1935
		],
		[
			5127,
			4367
		],
		[
			4203,
			-839
		],
		[
			896,
			2136
		],
		[
			1321,
			753
		],
		[
			9436,
			1210
		],
		[
			5867,
			-324
		],
		[
			13995,
			7287
		],
		[
			5841,
			633
		],
		[
			9935,
			4150
		],
		[
			8666,
			7789
		],
		[
			3155,
			4578
		],
		[
			4459,
			9925
		],
		[
			596,
			4256
		],
		[
			11986,
			2879
		],
		[
			-12832,
			-424
		],
		[
			-5503,
			5422
		],
		[
			1359,
			4989
		],
		[
			7300,
			6631
		],
		[
			-3697,
			1226
		],
		[
			-7154,
			7185
		],
		[
			864,
			4257
		],
		[
			-720,
			4098
		],
		[
			3261,
			1609
		],
		[
			-30,
			1061
		],
		[
			-14410,
			60
		],
		[
			-15393,
			-2652
		],
		[
			-7250,
			-3488
		],
		[
			-1894,
			-2341
		],
		[
			-629,
			-3026
		],
		[
			-2063,
			-1178
		],
		[
			-7726,
			3002
		],
		[
			-13360,
			-2635
		],
		[
			-2018,
			702
		],
		[
			3361,
			5443
		],
		[
			6992,
			5025
		],
		[
			7025,
			3188
		],
		[
			6474,
			1369
		],
		[
			14290,
			7913
		],
		[
			2534,
			3412
		],
		[
			742,
			4029
		],
		[
			15138,
			10904
		],
		[
			5593,
			1933
		],
		[
			12109,
			1618
		],
		[
			15949,
			4786
		],
		[
			177,
			1930
		],
		[
			-2417,
			1811
		],
		[
			290,
			765
		],
		[
			2579,
			-201
		],
		[
			2472,
			-1299
		],
		[
			2784,
			78
		],
		[
			1281,
			84
		],
		[
			5498,
			-2941
		],
		[
			10655,
			-596
		],
		[
			25131,
			6093
		],
		[
			4556,
			51
		],
		[
			3196,
			-2490
		],
		[
			17840,
			-7595
		],
		[
			854,
			107
		],
		[
			-242,
			1418
		]
	],
	[
		[
			5894404,
			7469949
		],
		[
			65,
			-1520
		],
		[
			5741,
			777
		],
		[
			3364,
			1352
		],
		[
			7096,
			-858
		],
		[
			-4818,
			-4915
		],
		[
			-10946,
			-4741
		],
		[
			-1977,
			-2749
		],
		[
			-7528,
			-3602
		],
		[
			-3779,
			-407
		],
		[
			-2185,
			-1204
		],
		[
			-4722,
			1188
		],
		[
			-1814,
			1718
		],
		[
			-1977,
			-317
		],
		[
			-2057,
			1989
		],
		[
			-3820,
			838
		],
		[
			-90,
			2316
		],
		[
			-1841,
			1275
		],
		[
			-3239,
			2249
		],
		[
			-5317,
			-111
		],
		[
			-1643,
			3257
		],
		[
			-5731,
			558
		],
		[
			-1215,
			2409
		],
		[
			1410,
			1340
		],
		[
			2873,
			44
		],
		[
			6919,
			-3022
		],
		[
			1242,
			194
		],
		[
			310,
			2194
		],
		[
			-1523,
			1597
		],
		[
			2171,
			4128
		],
		[
			-1406,
			2823
		],
		[
			5149,
			1253
		],
		[
			6376,
			330
		],
		[
			3313,
			1195
		],
		[
			13291,
			-1447
		],
		[
			1595,
			-1636
		],
		[
			-145,
			-2242
		],
		[
			1565,
			-1351
		],
		[
			2682,
			-570
		],
		[
			2611,
			-4332
		]
	],
	[
		[
			5781913,
			7326257
		],
		[
			-135,
			-2689
		],
		[
			-1994,
			1653
		],
		[
			653,
			1138
		],
		[
			1476,
			-102
		]
	],
	[
		[
			5787081,
			7312802
		],
		[
			-1218,
			-1390
		],
		[
			-1794,
			561
		],
		[
			-233,
			692
		],
		[
			1247,
			544
		],
		[
			1998,
			-407
		]
	],
	[
		[
			5847729,
			7302456
		],
		[
			-1046,
			-794
		],
		[
			-1522,
			406
		],
		[
			-157,
			463
		],
		[
			1478,
			377
		],
		[
			1247,
			-452
		]
	],
	[
		[
			5837117,
			7415427
		],
		[
			-490,
			-1446
		],
		[
			-1191,
			260
		],
		[
			180,
			1275
		],
		[
			1501,
			-89
		]
	],
	[
		[
			5788378,
			7308172
		],
		[
			-1631,
			-336
		],
		[
			-372,
			381
		],
		[
			496,
			745
		],
		[
			1179,
			293
		],
		[
			328,
			-1083
		]
	],
	[
		[
			6083972,
			7617804
		],
		[
			-1041,
			-3923
		],
		[
			-700,
			-2636
		],
		[
			-2270,
			-3514
		],
		[
			5926,
			-3042
		],
		[
			-75,
			-1074
		],
		[
			-2798,
			-1787
		],
		[
			1913,
			-3434
		],
		[
			5119,
			-2570
		],
		[
			3591,
			-1802
		],
		[
			1525,
			-1700
		],
		[
			2494,
			-534
		],
		[
			1380,
			-5651
		],
		[
			-877,
			-1615
		]
	],
	[
		[
			6098159,
			7584522
		],
		[
			-2920,
			-941
		],
		[
			-5514,
			144
		],
		[
			-3400,
			-1253
		],
		[
			-1766,
			-2183
		],
		[
			773,
			-3584
		],
		[
			-5756,
			-2485
		],
		[
			2593,
			-1916
		],
		[
			1631,
			-1206
		],
		[
			-1294,
			-8003
		],
		[
			-1804,
			-438
		],
		[
			-1979,
			711
		],
		[
			-4529,
			-2075
		],
		[
			-5101,
			79
		],
		[
			-7534,
			-6787
		],
		[
			-2202,
			-789
		],
		[
			-419,
			-1754
		],
		[
			3919,
			-3573
		],
		[
			4318,
			-1668
		],
		[
			983,
			-380
		],
		[
			16,
			-735
		],
		[
			50,
			-2364
		],
		[
			2127,
			-531
		],
		[
			7578,
			577
		],
		[
			2752,
			-3260
		],
		[
			-576,
			-1017
		],
		[
			512,
			-1067
		],
		[
			2716,
			-188
		],
		[
			3033,
			-1600
		],
		[
			5461,
			402
		],
		[
			886,
			-1527
		],
		[
			2728,
			292
		],
		[
			1287,
			-1477
		],
		[
			547,
			-1506
		],
		[
			5810,
			-1805
		],
		[
			4776,
			-5583
		],
		[
			488,
			-239
		],
		[
			2214,
			-1083
		],
		[
			110,
			-1121
		],
		[
			-185,
			-938
		],
		[
			-1433,
			-388
		],
		[
			-706,
			-295
		],
		[
			-5546,
			-2317
		],
		[
			-957,
			-2033
		],
		[
			114,
			-2530
		],
		[
			-3783,
			-2821
		],
		[
			2370,
			-4344
		],
		[
			4415,
			-1128
		],
		[
			3387,
			694
		],
		[
			1429,
			292
		],
		[
			2930,
			-6082
		],
		[
			10916,
			-7003
		],
		[
			594,
			-1158
		]
	],
	[
		[
			6124218,
			7492538
		],
		[
			-1331,
			-1057
		],
		[
			-214,
			-1708
		],
		[
			-3832,
			-92
		],
		[
			-2244,
			-3047
		],
		[
			-67,
			-2275
		],
		[
			-3800,
			-2536
		],
		[
			573,
			-1158
		],
		[
			2349,
			-789
		],
		[
			-1249,
			-2549
		],
		[
			-2329,
			-1602
		],
		[
			2294,
			-1623
		],
		[
			161,
			-9149
		],
		[
			2753,
			-2969
		],
		[
			-844,
			-1927
		]
	],
	[
		[
			6116438,
			7460057
		],
		[
			-1695,
			-1987
		],
		[
			-3941,
			-224
		],
		[
			-2453,
			-1538
		],
		[
			-706,
			-443
		],
		[
			-3565,
			-161
		],
		[
			-2921,
			1022
		],
		[
			-366,
			-2114
		],
		[
			-2675,
			-1030
		],
		[
			-3607,
			-2993
		],
		[
			-1669,
			-1099
		],
		[
			-844,
			-556
		],
		[
			-1826,
			-1203
		],
		[
			-6917,
			-1156
		],
		[
			-2958,
			-2134
		],
		[
			-2879,
			-552
		],
		[
			-563,
			-1787
		],
		[
			933,
			-1915
		],
		[
			-687,
			-1648
		],
		[
			-5265,
			-1312
		],
		[
			-659,
			-1553
		],
		[
			-3577,
			-830
		],
		[
			-4307,
			902
		],
		[
			-1309,
			-2036
		],
		[
			-2822,
			1227
		],
		[
			-2977,
			-329
		],
		[
			-1284,
			2373
		],
		[
			-2853,
			1138
		],
		[
			-4662,
			-704
		],
		[
			-1425,
			552
		],
		[
			-710,
			275
		],
		[
			-2755,
			-1216
		]
	],
	[
		[
			6005041,
			7465390
		],
		[
			1220,
			1166
		],
		[
			-2156,
			1772
		],
		[
			-1360,
			2909
		],
		[
			-6621,
			4478
		],
		[
			-721,
			1502
		],
		[
			2594,
			1621
		],
		[
			12081,
			3879
		],
		[
			1391,
			-355
		],
		[
			3787,
			-6354
		],
		[
			3352,
			-3077
		],
		[
			3712,
			-3407
		],
		[
			5800,
			-1676
		],
		[
			3081,
			1537
		],
		[
			5005,
			-840
		],
		[
			3729,
			1626
		],
		[
			-597,
			2953
		],
		[
			-3266,
			-1841
		],
		[
			-3564,
			580
		],
		[
			-4754,
			151
		],
		[
			-9146,
			4183
		],
		[
			-617,
			282
		],
		[
			-2640,
			2844
		],
		[
			-1049,
			3214
		],
		[
			-2878,
			2657
		],
		[
			-2921,
			5481
		],
		[
			-3352,
			2256
		],
		[
			-349,
			1613
		],
		[
			6955,
			8520
		],
		[
			6015,
			5098
		],
		[
			836,
			135
		],
		[
			948,
			152
		],
		[
			2640,
			2632
		],
		[
			6553,
			888
		],
		[
			2459,
			-702
		],
		[
			-1939,
			1162
		],
		[
			-6234,
			-551
		],
		[
			-4427,
			308
		],
		[
			-4164,
			289
		],
		[
			-4088,
			2087
		],
		[
			-917,
			1782
		],
		[
			943,
			9929
		],
		[
			1132,
			4450
		],
		[
			2448,
			178
		],
		[
			1666,
			-2198
		],
		[
			1179,
			3206
		],
		[
			1801,
			530
		],
		[
			7766,
			1057
		],
		[
			1888,
			1364
		],
		[
			948,
			3604
		],
		[
			-3329,
			47
		],
		[
			-1289,
			3173
		],
		[
			2867,
			3596
		],
		[
			3314,
			1521
		],
		[
			1040,
			477
		],
		[
			2282,
			2721
		],
		[
			-5866,
			6371
		],
		[
			902,
			2332
		],
		[
			-3346,
			-607
		],
		[
			-4864,
			-3631
		],
		[
			-5861,
			-1747
		],
		[
			-606,
			3099
		],
		[
			-2924,
			4542
		],
		[
			-3345,
			-5684
		],
		[
			-7915,
			-6618
		],
		[
			-2423,
			-1173
		],
		[
			-1998,
			1893
		],
		[
			-3171,
			-453
		],
		[
			-1376,
			1123
		],
		[
			-92,
			4421
		],
		[
			-1370,
			1512
		],
		[
			3172,
			937
		],
		[
			1669,
			3893
		],
		[
			1067,
			1401
		],
		[
			-1730,
			1868
		],
		[
			-381,
			869
		],
		[
			-1439,
			358
		],
		[
			367,
			-1789
		],
		[
			-2392,
			-2256
		],
		[
			653,
			-1638
		],
		[
			-703,
			-782
		],
		[
			-5683,
			-638
		],
		[
			-1993,
			653
		],
		[
			-9130,
			8758
		],
		[
			-342,
			4745
		],
		[
			489,
			546
		],
		[
			911,
			1017
		],
		[
			-369,
			874
		],
		[
			-703,
			230
		],
		[
			-909,
			-1180
		],
		[
			-1262,
			312
		],
		[
			-12458,
			10654
		],
		[
			-3169,
			2884
		],
		[
			-2673,
			1173
		],
		[
			-1217,
			2007
		],
		[
			1928,
			990
		],
		[
			570,
			292
		],
		[
			2657,
			3837
		],
		[
			1348,
			4318
		],
		[
			-468,
			3782
		],
		[
			5259,
			4185
		],
		[
			1441,
			2544
		],
		[
			5799,
			3658
		],
		[
			1288,
			814
		],
		[
			240,
			4385
		],
		[
			3911,
			6542
		],
		[
			4910,
			2746
		],
		[
			5544,
			-1578
		],
		[
			711,
			1005
		],
		[
			2270,
			453
		],
		[
			330,
			1253
		],
		[
			-2376,
			-370
		],
		[
			-2795,
			1101
		],
		[
			2836,
			2589
		],
		[
			7342,
			1230
		],
		[
			7807,
			-2541
		],
		[
			1094,
			-25
		],
		[
			875,
			586
		],
		[
			-1240,
			1120
		],
		[
			1709,
			1998
		],
		[
			4834,
			2197
		]
	],
	[
		[
			6046201,
			7657602
		],
		[
			1384,
			-3118
		],
		[
			2120,
			-2132
		],
		[
			4936,
			-1197
		],
		[
			4952,
			-4135
		],
		[
			5044,
			546
		],
		[
			987,
			-541
		],
		[
			-355,
			-2267
		],
		[
			1088,
			-1970
		],
		[
			-7840,
			-2391
		],
		[
			-775,
			-2766
		],
		[
			-2333,
			-1821
		],
		[
			2614,
			-1374
		],
		[
			1810,
			-2967
		],
		[
			-2490,
			-3001
		],
		[
			-2336,
			-1363
		],
		[
			2432,
			-2630
		],
		[
			-204,
			-1541
		],
		[
			1159,
			-1729
		],
		[
			3651,
			-1753
		],
		[
			3003,
			250
		],
		[
			9297,
			4321
		],
		[
			1839,
			-1887
		],
		[
			7788,
			-4332
		]
	],
	[
		[
			5994123,
			7544957
		],
		[
			399,
			-1299
		],
		[
			-662,
			144
		],
		[
			-3291,
			2999
		],
		[
			-2275,
			2965
		],
		[
			-306,
			3280
		],
		[
			1270,
			-638
		],
		[
			1646,
			-4238
		],
		[
			1782,
			-1369
		],
		[
			180,
			-1021
		],
		[
			1257,
			-823
		]
	],
	[
		[
			5998572,
			7544517
		],
		[
			-273,
			-1341
		],
		[
			-1847,
			523
		],
		[
			806,
			789
		],
		[
			1314,
			29
		]
	],
	[
		[
			6236085,
			7594644
		],
		[
			4953,
			-2991
		],
		[
			2862,
			142
		],
		[
			629,
			-363
		],
		[
			4839,
			-2791
		],
		[
			9147,
			-2292
		],
		[
			4086,
			-2895
		],
		[
			-489,
			-1733
		],
		[
			663,
			-1142
		],
		[
			4544,
			-1840
		],
		[
			2315,
			-2207
		],
		[
			3457,
			-4367
		],
		[
			1622,
			-4068
		],
		[
			1525,
			-905
		],
		[
			185,
			-1669
		],
		[
			2740,
			-2342
		],
		[
			7654,
			-2440
		],
		[
			1219,
			-3825
		],
		[
			5895,
			-2457
		],
		[
			12268,
			-4039
		],
		[
			-1649,
			-1098
		],
		[
			-6118,
			-1157
		],
		[
			-1865,
			-1364
		],
		[
			-2352,
			-3196
		],
		[
			269,
			-4427
		],
		[
			6152,
			-10917
		],
		[
			23970,
			-21403
		],
		[
			2872,
			-4657
		],
		[
			-8495,
			985
		],
		[
			-8886,
			-1231
		],
		[
			-4449,
			442
		],
		[
			-11436,
			6358
		],
		[
			-4046,
			3273
		],
		[
			-2631,
			729
		],
		[
			-1821,
			196
		],
		[
			-1250,
			-64
		],
		[
			-2488,
			-336
		],
		[
			-2189,
			-659
		],
		[
			-2551,
			-627
		],
		[
			-623,
			-154
		],
		[
			-1096,
			-106
		],
		[
			-2255,
			-349
		],
		[
			-2774,
			-551
		],
		[
			-1631,
			267
		],
		[
			-2357,
			-35
		],
		[
			-4996,
			-730
		],
		[
			-1367,
			20
		],
		[
			-873,
			218
		],
		[
			-2800,
			1420
		],
		[
			-504,
			255
		],
		[
			-2344,
			256
		],
		[
			-2132,
			-306
		],
		[
			-1136,
			-205
		],
		[
			-4992,
			-2232
		],
		[
			-17,
			-1874
		],
		[
			910,
			-63
		],
		[
			584,
			1403
		],
		[
			6445,
			1476
		],
		[
			5995,
			-2912
		],
		[
			1767,
			415
		],
		[
			2244,
			-867
		],
		[
			4764,
			1772
		],
		[
			17450,
			1594
		],
		[
			2113,
			-892
		],
		[
			7288,
			-6584
		],
		[
			9710,
			-5016
		],
		[
			5118,
			-963
		],
		[
			7187,
			-5291
		]
	],
	[
		[
			6316914,
			7491233
		],
		[
			-8216,
			-966
		],
		[
			-1076,
			-2264
		],
		[
			-2849,
			-2328
		],
		[
			1787,
			-1900
		],
		[
			-4184,
			-1432
		],
		[
			-1760,
			781
		],
		[
			-1609,
			2169
		],
		[
			-4569,
			2299
		],
		[
			135,
			2256
		],
		[
			-1065,
			2178
		],
		[
			2391,
			3418
		],
		[
			-2903,
			312
		],
		[
			-7887,
			4369
		],
		[
			-419,
			-1961
		],
		[
			-3541,
			-3605
		],
		[
			-6915,
			411
		],
		[
			-2307,
			900
		],
		[
			-5525,
			-2657
		],
		[
			364,
			-652
		],
		[
			5071,
			629
		],
		[
			2567,
			-2209
		],
		[
			-7221,
			-1629
		],
		[
			-397,
			-3089
		],
		[
			-808,
			-457
		],
		[
			-13145,
			-1291
		],
		[
			-978,
			1311
		],
		[
			473,
			3975
		],
		[
			-7799,
			623
		],
		[
			-3202,
			257
		],
		[
			-2171,
			-1900
		],
		[
			-3722,
			-4576
		],
		[
			-2102,
			446
		],
		[
			-5144,
			650
		],
		[
			-507,
			-425
		],
		[
			-4125,
			-148
		],
		[
			-311,
			548
		],
		[
			1785,
			981
		],
		[
			-2846,
			2249
		],
		[
			-560,
			442
		],
		[
			-4673,
			-3042
		],
		[
			-1544,
			-3369
		],
		[
			-1902,
			-1093
		],
		[
			-5976,
			-123
		],
		[
			-2123,
			-823
		],
		[
			-3320,
			-2766
		],
		[
			-1140,
			-3205
		],
		[
			-1584,
			-297
		],
		[
			1157,
			-1480
		],
		[
			-5312,
			-2909
		],
		[
			-5384,
			-879
		],
		[
			-3492,
			1159
		],
		[
			-1216,
			1582
		],
		[
			-2406,
			-126
		],
		[
			-1542,
			-1103
		],
		[
			-3614,
			-87
		],
		[
			-1212,
			459
		],
		[
			-456,
			1489
		],
		[
			-1607,
			369
		],
		[
			-3715,
			-527
		],
		[
			-1921,
			-1618
		],
		[
			-7291,
			-1291
		],
		[
			-4832,
			1227
		],
		[
			-1255,
			-667
		],
		[
			-2897,
			882
		],
		[
			2102,
			2752
		],
		[
			-5297,
			1919
		],
		[
			364,
			2352
		],
		[
			-8287,
			3177
		],
		[
			-918,
			3877
		],
		[
			-5302,
			2008
		],
		[
			294,
			2004
		],
		[
			-2366,
			2009
		],
		[
			-515,
			193
		],
		[
			-1480,
			-250
		],
		[
			-1767,
			1296
		],
		[
			-1386,
			642
		],
		[
			-786,
			-65
		],
		[
			-1143,
			-509
		],
		[
			-730,
			400
		],
		[
			-932,
			23
		]
	],
	[
		[
			6098159,
			7584522
		],
		[
			5952,
			535
		],
		[
			4238,
			1253
		],
		[
			2014,
			596
		],
		[
			8060,
			-2880
		],
		[
			2456,
			55
		],
		[
			7838,
			2795
		],
		[
			1736,
			2382
		],
		[
			5361,
			-1753
		],
		[
			1901,
			4218
		],
		[
			3608,
			-149
		],
		[
			2141,
			1156
		],
		[
			2026,
			-428
		],
		[
			3383,
			-225
		],
		[
			3650,
			-1757
		],
		[
			3789,
			-545
		],
		[
			1217,
			-1707
		],
		[
			3332,
			-2056
		],
		[
			1284,
			15
		],
		[
			645,
			967
		],
		[
			2770,
			-42
		],
		[
			3217,
			-2756
		],
		[
			567,
			99
		],
		[
			-135,
			2860
		],
		[
			-1037,
			1613
		],
		[
			1357,
			86
		],
		[
			2169,
			-1407
		],
		[
			1596,
			-888
		],
		[
			1439,
			1211
		],
		[
			2595,
			13
		],
		[
			1139,
			-2073
		],
		[
			2809,
			-390
		],
		[
			5600,
			2257
		],
		[
			2164,
			68
		],
		[
			2657,
			2088
		],
		[
			37853,
			-2125
		],
		[
			900,
			336
		],
		[
			-427,
			1716
		],
		[
			882,
			2614
		],
		[
			5180,
			2370
		]
	],
	[
		[
			6316914,
			7491233
		],
		[
			1954,
			-917
		],
		[
			3883,
			-149
		],
		[
			1213,
			-1720
		],
		[
			1630,
			-543
		],
		[
			1784,
			692
		],
		[
			1412,
			-1199
		],
		[
			1932,
			-132
		],
		[
			2844,
			-3256
		],
		[
			4290,
			-4911
		],
		[
			9465,
			-13660
		],
		[
			1515,
			-3683
		],
		[
			1777,
			-4318
		],
		[
			-1660,
			-7947
		],
		[
			-216,
			-1035
		],
		[
			-3616,
			-1031
		],
		[
			-11555,
			-6063
		],
		[
			-1737,
			-912
		],
		[
			-4921,
			-3716
		],
		[
			-1314,
			-993
		],
		[
			-2862,
			-3585
		],
		[
			-3151,
			-1750
		],
		[
			-685,
			-1089
		],
		[
			6698,
			-1611
		],
		[
			6653,
			-1702
		],
		[
			1319,
			-1401
		],
		[
			3008,
			-3196
		],
		[
			621,
			-660
		],
		[
			4577,
			-1038
		]
	],
	[
		[
			6341772,
			7419708
		],
		[
			-1637,
			-2451
		],
		[
			1077,
			-1576
		],
		[
			-6963,
			-3146
		],
		[
			-683,
			-12
		],
		[
			-1221,
			-23
		],
		[
			-6751,
			-815
		],
		[
			-570,
			9
		],
		[
			-470,
			-317
		],
		[
			-471,
			-318
		],
		[
			-2431,
			333
		],
		[
			-1669,
			-869
		],
		[
			-326,
			-430
		],
		[
			-6,
			-1285
		],
		[
			38,
			-844
		],
		[
			409,
			-493
		],
		[
			-115,
			-670
		],
		[
			-2651,
			-1616
		],
		[
			-2156,
			-138
		],
		[
			-3133,
			-199
		],
		[
			-2824,
			1141
		],
		[
			-4460,
			-273
		],
		[
			-3874,
			-1682
		],
		[
			-4885,
			203
		],
		[
			-1926,
			1064
		],
		[
			-4736,
			-1241
		],
		[
			-6845,
			2036
		],
		[
			-7927,
			-2489
		],
		[
			-4343,
			304
		],
		[
			-4524,
			-1184
		],
		[
			2159,
			-1796
		],
		[
			-2094,
			-3341
		],
		[
			343,
			-657
		],
		[
			1534,
			-702
		],
		[
			5997,
			339
		],
		[
			-33,
			-2242
		],
		[
			1147,
			-1254
		],
		[
			-388,
			-1844
		],
		[
			5093,
			-2061
		],
		[
			1242,
			-3737
		],
		[
			-3191,
			-3949
		],
		[
			-6740,
			-4188
		],
		[
			-4892,
			-1341
		],
		[
			-378,
			-1073
		],
		[
			1945,
			-2163
		],
		[
			960,
			-435
		],
		[
			241,
			-1291
		],
		[
			-4807,
			-876
		],
		[
			-2453,
			-2257
		],
		[
			395,
			-2059
		],
		[
			-982,
			-1251
		],
		[
			-2255,
			-247
		],
		[
			-4067,
			2197
		],
		[
			-4300,
			-1065
		],
		[
			949,
			-3955
		],
		[
			-2758,
			-3280
		]
	],
	[
		[
			6248366,
			7358199
		],
		[
			-1886,
			95
		],
		[
			-1846,
			-441
		],
		[
			-105,
			-56
		],
		[
			-4328,
			-2294
		],
		[
			-2602,
			11
		],
		[
			-5993,
			-3647
		],
		[
			-4408,
			-691
		],
		[
			-294,
			-984
		],
		[
			4840,
			-4176
		],
		[
			-2095,
			-1100
		],
		[
			-1164,
			-1594
		],
		[
			-438,
			-601
		],
		[
			-3673,
			-1555
		],
		[
			-1711,
			1413
		],
		[
			-402,
			743
		],
		[
			-1708,
			3160
		],
		[
			-3219,
			-705
		],
		[
			-4546,
			315
		],
		[
			-734,
			-853
		],
		[
			-8166,
			-1917
		],
		[
			-565,
			-133
		],
		[
			-1520,
			-2161
		],
		[
			1567,
			-789
		],
		[
			-2048,
			-1712
		],
		[
			-5067,
			-1776
		],
		[
			-9001,
			491
		],
		[
			-415,
			3014
		],
		[
			-2067,
			3066
		],
		[
			58,
			3714
		],
		[
			4422,
			1995
		],
		[
			-7266,
			6513
		]
	],
	[
		[
			6181986,
			7355544
		],
		[
			1860,
			1976
		],
		[
			5429,
			1279
		],
		[
			-1737,
			3244
		],
		[
			5647,
			2967
		],
		[
			-966,
			3004
		],
		[
			1674,
			2016
		],
		[
			-4818,
			1468
		],
		[
			1218,
			1220
		],
		[
			7153,
			1772
		],
		[
			-2428,
			3880
		],
		[
			-10552,
			9676
		],
		[
			-20897,
			7527
		],
		[
			-3952,
			2735
		],
		[
			-1305,
			3560
		],
		[
			2077,
			1298
		],
		[
			196,
			1204
		],
		[
			-4370,
			3053
		],
		[
			-790,
			1316
		],
		[
			-5048,
			67
		],
		[
			-1369,
			2038
		],
		[
			-3921,
			1231
		],
		[
			3454,
			4773
		],
		[
			4600,
			116
		],
		[
			2746,
			1713
		],
		[
			-1415,
			1697
		],
		[
			1308,
			1751
		],
		[
			-4832,
			2097
		],
		[
			-8793,
			659
		],
		[
			-4715,
			1948
		],
		[
			-4672,
			390
		],
		[
			-2889,
			3797
		],
		[
			2070,
			2172
		],
		[
			817,
			3068
		],
		[
			1106,
			477
		],
		[
			4541,
			1953
		],
		[
			645,
			1603
		],
		[
			119,
			1853
		],
		[
			-1980,
			1383
		],
		[
			-1044,
			3074
		],
		[
			407,
			2335
		],
		[
			-2950,
			3170
		],
		[
			-488,
			2379
		],
		[
			-5182,
			3477
		],
		[
			-8674,
			2879
		],
		[
			-2828,
			-782
		]
	],
	[
		[
			5717523,
			7644356
		],
		[
			733,
			-1971
		],
		[
			-975,
			-5237
		],
		[
			5629,
			-2346
		],
		[
			4437,
			-4897
		],
		[
			4208,
			-2313
		],
		[
			2955,
			-3068
		],
		[
			655,
			-2980
		],
		[
			2766,
			-390
		],
		[
			-913,
			2408
		],
		[
			2129,
			582
		],
		[
			4320,
			-1772
		],
		[
			2377,
			-3673
		],
		[
			-149,
			-3002
		],
		[
			-1374,
			-1816
		],
		[
			-378,
			-425
		],
		[
			-15601,
			-5883
		],
		[
			-2578,
			-1546
		],
		[
			-1881,
			-2527
		],
		[
			5759,
			-1427
		],
		[
			5182,
			2497
		],
		[
			5880,
			1565
		],
		[
			6940,
			-804
		],
		[
			4872,
			1092
		],
		[
			3930,
			-251
		],
		[
			4646,
			-2538
		],
		[
			2045,
			-4841
		],
		[
			3674,
			-3297
		],
		[
			1720,
			-6002
		],
		[
			2828,
			-2448
		],
		[
			-509,
			-2830
		],
		[
			-3083,
			-2688
		],
		[
			945,
			-3887
		],
		[
			-2030,
			-1438
		],
		[
			-1969,
			-3633
		],
		[
			-2329,
			1028
		],
		[
			-4700,
			5524
		],
		[
			410,
			1590
		],
		[
			3474,
			3177
		],
		[
			-579,
			4046
		],
		[
			-1704,
			3139
		],
		[
			-12202,
			5456
		],
		[
			-2226,
			-3956
		],
		[
			3983,
			-2112
		],
		[
			-542,
			-1652
		],
		[
			1829,
			-1426
		],
		[
			445,
			-2785
		],
		[
			870,
			-2123
		],
		[
			-489,
			-2602
		],
		[
			-2579,
			-3950
		],
		[
			2363,
			-419
		],
		[
			6327,
			1160
		],
		[
			2224,
			-994
		],
		[
			1254,
			-3367
		],
		[
			619,
			-1663
		],
		[
			-402,
			-2831
		],
		[
			-1843,
			64
		],
		[
			-4485,
			-3517
		],
		[
			-2991,
			-388
		],
		[
			-1824,
			-1856
		],
		[
			-3345,
			1349
		],
		[
			-4641,
			372
		],
		[
			-8587,
			-705
		],
		[
			-3601,
			-1567
		],
		[
			-2683,
			-2204
		],
		[
			899,
			-4153
		],
		[
			-2143,
			-5469
		],
		[
			-5007,
			-2935
		],
		[
			-1903,
			-1115
		],
		[
			-5342,
			-2894
		],
		[
			-4632,
			-1309
		],
		[
			-3028,
			1112
		],
		[
			1043,
			1186
		],
		[
			-1104,
			944
		],
		[
			-7230,
			961
		],
		[
			-1354,
			1115
		],
		[
			-2057,
			1693
		],
		[
			-6527,
			436
		]
	],
	[
		[
			5589569,
			7645399
		],
		[
			794,
			-2015
		],
		[
			2436,
			1124
		],
		[
			4370,
			221
		],
		[
			2900,
			-384
		],
		[
			200,
			-1311
		],
		[
			10147,
			878
		],
		[
			2920,
			2264
		],
		[
			-10,
			2425
		],
		[
			2444,
			1091
		],
		[
			2987,
			5187
		],
		[
			502,
			3124
		],
		[
			7783,
			-2368
		],
		[
			14336,
			137
		],
		[
			2456,
			2089
		],
		[
			17476,
			2855
		],
		[
			1371,
			1420
		],
		[
			4503,
			1663
		],
		[
			2323,
			-561
		],
		[
			4950,
			-1196
		],
		[
			3668,
			1078
		],
		[
			3469,
			-519
		],
		[
			10023,
			-3354
		],
		[
			9625,
			1880
		],
		[
			7179,
			-2775
		],
		[
			3908,
			-3473
		],
		[
			-821,
			-5525
		],
		[
			-1905,
			-3771
		],
		[
			1292,
			-1320
		],
		[
			2266,
			150
		],
		[
			2671,
			224
		],
		[
			1691,
			-281
		]
	],
	[
		[
			5698300,
			7668523
		],
		[
			-1252,
			-1913
		],
		[
			-123,
			-1178
		],
		[
			-823,
			-768
		],
		[
			-906,
			850
		],
		[
			-44,
			935
		],
		[
			1024,
			838
		],
		[
			-553,
			623
		],
		[
			-3218,
			371
		],
		[
			-3172,
			-538
		],
		[
			-2512,
			352
		],
		[
			511,
			665
		],
		[
			2367,
			966
		],
		[
			1623,
			207
		],
		[
			1881,
			-576
		],
		[
			2376,
			-7
		],
		[
			2271,
			-378
		],
		[
			550,
			-449
		]
	],
	[
		[
			5752070,
			7588398
		],
		[
			-1000,
			-886
		],
		[
			-1070,
			2360
		],
		[
			1047,
			926
		],
		[
			942,
			-638
		],
		[
			-424,
			-634
		],
		[
			505,
			-1128
		]
	],
	[
		[
			5763229,
			7605731
		],
		[
			-1134,
			-117
		],
		[
			-1170,
			774
		],
		[
			843,
			541
		],
		[
			1351,
			-548
		],
		[
			110,
			-650
		]
	],
	[
		[
			6169007,
			7646135
		],
		[
			4150,
			-5343
		],
		[
			-625,
			-1279
		],
		[
			6608,
			-4057
		],
		[
			405,
			-1042
		],
		[
			-759,
			-1300
		],
		[
			1653,
			-8349
		],
		[
			3178,
			-4381
		],
		[
			1124,
			-4036
		],
		[
			2842,
			-2467
		],
		[
			3370,
			-2926
		],
		[
			5699,
			-2342
		],
		[
			-935,
			-2072
		],
		[
			2754,
			-3610
		],
		[
			-1789,
			-1660
		],
		[
			2049,
			-1137
		],
		[
			-3851,
			-2886
		],
		[
			-4870,
			289
		],
		[
			-959,
			-1651
		],
		[
			1012,
			1638
		],
		[
			5140,
			-635
		],
		[
			4333,
			2083
		],
		[
			511,
			2202
		],
		[
			1621,
			1158
		],
		[
			7919,
			-1951
		],
		[
			5791,
			-2405
		],
		[
			6349,
			-499
		],
		[
			3942,
			-1584
		],
		[
			576,
			-69
		],
		[
			9840,
			-1180
		]
	],
	[
		[
			6111743,
			7719812
		],
		[
			3469,
			-2841
		],
		[
			317,
			-2084
		],
		[
			11054,
			-6813
		],
		[
			4807,
			-5069
		],
		[
			2509,
			-744
		],
		[
			2703,
			680
		],
		[
			1725,
			-1385
		],
		[
			-683,
			-1293
		],
		[
			531,
			-744
		],
		[
			4761,
			774
		],
		[
			7873,
			-3822
		],
		[
			1649,
			-2389
		],
		[
			-742,
			-1414
		],
		[
			1972,
			-1862
		],
		[
			43,
			-1864
		],
		[
			2115,
			-1446
		],
		[
			404,
			-4804
		],
		[
			1075,
			-1141
		],
		[
			-389,
			-1987
		],
		[
			-2426,
			-2247
		],
		[
			177,
			-1408
		],
		[
			1606,
			-3202
		],
		[
			3768,
			-2098
		],
		[
			-1795,
			-2924
		],
		[
			98,
			-2065
		],
		[
			6398,
			-7516
		],
		[
			-1979,
			-3652
		],
		[
			3284,
			-5813
		],
		[
			2940,
			-2504
		]
	],
	[
		[
			6137199,
			7705628
		],
		[
			-2281,
			-23
		],
		[
			-967,
			1413
		],
		[
			1147,
			575
		],
		[
			2047,
			-318
		],
		[
			54,
			-1647
		]
	],
	[
		[
			6132312,
			7706933
		],
		[
			-1240,
			-722
		],
		[
			-1103,
			871
		],
		[
			1404,
			659
		],
		[
			939,
			-808
		]
	],
	[
		[
			6181986,
			7355544
		],
		[
			-1718,
			-2888
		],
		[
			-3035,
			-1543
		],
		[
			944,
			-2388
		],
		[
			-1653,
			-205
		],
		[
			-4790,
			1781
		],
		[
			-4889,
			-2420
		],
		[
			-2222,
			-4559
		],
		[
			-2428,
			-4983
		],
		[
			-8089,
			-3593
		],
		[
			-5503,
			2699
		]
	],
	[
		[
			6482724,
			7412965
		],
		[
			2452,
			-2593
		],
		[
			4174,
			-8311
		],
		[
			-890,
			-7086
		],
		[
			770,
			-3069
		],
		[
			1439,
			-5594
		],
		[
			-1910,
			-3209
		],
		[
			-1794,
			-5987
		],
		[
			-4032,
			-6374
		],
		[
			-4100,
			-4460
		],
		[
			-1730,
			-8770
		],
		[
			-4571,
			-9749
		],
		[
			-9509,
			-3561
		],
		[
			-4982,
			-4867
		],
		[
			-3655,
			-1314
		],
		[
			-1704,
			-2130
		],
		[
			-4475,
			-2535
		],
		[
			-3572,
			1692
		],
		[
			-2685,
			3001
		],
		[
			-7653,
			2236
		],
		[
			231,
			-894
		],
		[
			6959,
			-2176
		],
		[
			867,
			-2295
		],
		[
			-7261,
			-503
		],
		[
			-4212,
			708
		],
		[
			-10067,
			-1280
		],
		[
			6120,
			-1046
		],
		[
			16956,
			367
		],
		[
			-4110,
			-5342
		],
		[
			3694,
			-1832
		],
		[
			326,
			-993
		],
		[
			-5986,
			-4712
		],
		[
			-10582,
			-3961
		],
		[
			-7618,
			-245
		],
		[
			-1836,
			2680
		],
		[
			-2924,
			1618
		],
		[
			-1792,
			2144
		],
		[
			-805,
			-2689
		],
		[
			2099,
			-1497
		],
		[
			-1111,
			-909
		],
		[
			-5038,
			-1220
		],
		[
			-3012,
			1069
		],
		[
			-5563,
			-443
		],
		[
			1722,
			-674
		],
		[
			739,
			-1803
		],
		[
			-1931,
			-1288
		],
		[
			-12487,
			-904
		],
		[
			-1023,
			-752
		],
		[
			4723,
			-2942
		],
		[
			4108,
			1915
		],
		[
			4971,
			203
		],
		[
			4604,
			2362
		],
		[
			3306,
			11
		],
		[
			1525,
			-1789
		],
		[
			9,
			-3740
		],
		[
			-2182,
			-5712
		],
		[
			-6657,
			-827
		],
		[
			-10746,
			1722
		],
		[
			-10776,
			-82
		],
		[
			-3602,
			-831
		],
		[
			15084,
			319
		],
		[
			10492,
			-2407
		],
		[
			6383,
			-195
		],
		[
			-1946,
			-2460
		],
		[
			-8648,
			-4193
		],
		[
			-3790,
			-1805
		],
		[
			-13134,
			1666
		],
		[
			-2521,
			-715
		],
		[
			502,
			-954
		],
		[
			-667,
			-520
		],
		[
			-5287,
			-875
		],
		[
			-5258,
			2020
		],
		[
			0,
			-582
		],
		[
			963,
			-1305
		],
		[
			-963,
			-93
		],
		[
			-6788,
			-658
		],
		[
			-1931,
			-3911
		],
		[
			-1894,
			-725
		],
		[
			-3848,
			-206
		],
		[
			-2755,
			-147
		],
		[
			-3110,
			1993
		],
		[
			-4032,
			-852
		],
		[
			-6560,
			2602
		]
	],
	[
		[
			6336227,
			7287700
		],
		[
			3520,
			3351
		],
		[
			1452,
			-346
		],
		[
			1232,
			1234
		],
		[
			5597,
			912
		],
		[
			-1544,
			2426
		],
		[
			-2430,
			416
		],
		[
			-3065,
			4138
		],
		[
			-2577,
			1578
		],
		[
			-3201,
			-220
		],
		[
			-1645,
			-37
		],
		[
			-4567,
			-102
		],
		[
			-3405,
			-1052
		],
		[
			-4328,
			-486
		],
		[
			-3042,
			1478
		],
		[
			-1266,
			1695
		],
		[
			-3004,
			634
		],
		[
			34,
			3465
		],
		[
			-9745,
			1032
		],
		[
			-5240,
			-509
		],
		[
			-2032,
			-1751
		],
		[
			-12237,
			-3225
		],
		[
			-1509,
			230
		],
		[
			-8198,
			-2472
		],
		[
			-5693,
			22
		],
		[
			-3580,
			1475
		],
		[
			-634,
			-2921
		]
	],
	[
		[
			6265120,
			7298665
		],
		[
			-1945,
			459
		],
		[
			-1700,
			3057
		],
		[
			360,
			2292
		],
		[
			2399,
			1823
		],
		[
			-3524,
			862
		],
		[
			-1454,
			2817
		],
		[
			180,
			2038
		],
		[
			-3166,
			1787
		],
		[
			-5285,
			402
		],
		[
			-2609,
			1114
		],
		[
			-2189,
			3700
		],
		[
			-1658,
			834
		],
		[
			-1864,
			937
		],
		[
			-1704,
			1931
		],
		[
			3568,
			1551
		],
		[
			5191,
			-4012
		],
		[
			6958,
			-519
		],
		[
			3138,
			1629
		],
		[
			1043,
			606
		],
		[
			-4040,
			3554
		],
		[
			-11463,
			3830
		],
		[
			556,
			1721
		],
		[
			3969,
			4541
		],
		[
			-607,
			2730
		],
		[
			1617,
			3470
		],
		[
			-1781,
			1503
		],
		[
			-466,
			393
		],
		[
			7355,
			6050
		],
		[
			-1461,
			1981
		],
		[
			-2898,
			1217
		],
		[
			356,
			3999
		],
		[
			-3630,
			1237
		]
	],
	[
		[
			6341772,
			7419708
		],
		[
			5366,
			357
		],
		[
			4762,
			-1368
		],
		[
			2995,
			2709
		],
		[
			4175,
			2030
		],
		[
			4439,
			8690
		],
		[
			3573,
			2925
		],
		[
			3058,
			960
		],
		[
			11487,
			-40
		],
		[
			3961,
			993
		],
		[
			21901,
			-1793
		],
		[
			3923,
			197
		],
		[
			1596,
			1044
		],
		[
			1710,
			-927
		],
		[
			5543,
			-130
		],
		[
			24896,
			-3571
		],
		[
			13755,
			-5239
		],
		[
			9677,
			-5139
		],
		[
			7513,
			-4017
		],
		[
			6622,
			-4424
		]
	],
	[
		[
			6393794,
			7310889
		],
		[
			-1354,
			-641
		],
		[
			-1128,
			763
		],
		[
			1979,
			658
		],
		[
			503,
			-780
		]
	],
	[
		[
			6336227,
			7287700
		],
		[
			-2103,
			13
		],
		[
			-558,
			407
		],
		[
			-2517,
			1838
		],
		[
			-5455,
			209
		],
		[
			-718,
			96
		],
		[
			-3365,
			-1666
		],
		[
			-3721,
			41
		],
		[
			-1672,
			768
		],
		[
			-1221,
			-254
		],
		[
			-1095,
			-1635
		],
		[
			-2152,
			1925
		],
		[
			-4419,
			34
		],
		[
			-3206,
			295
		],
		[
			-1859,
			-2209
		],
		[
			-1985,
			-314
		],
		[
			-2246,
			-387
		],
		[
			-1328,
			-1304
		],
		[
			-1497,
			-267
		],
		[
			-1732,
			542
		],
		[
			-1229,
			1615
		],
		[
			-1357,
			142
		],
		[
			2101,
			-1711
		],
		[
			1531,
			-762
		],
		[
			1562,
			-88
		],
		[
			924,
			338
		],
		[
			1186,
			1339
		],
		[
			4243,
			497
		],
		[
			1951,
			2339
		],
		[
			6965,
			-317
		],
		[
			1450,
			-1963
		],
		[
			1876,
			178
		],
		[
			1163,
			1204
		],
		[
			5918,
			-365
		],
		[
			4589,
			1334
		],
		[
			4263,
			-329
		],
		[
			3052,
			-2298
		],
		[
			3354,
			-282
		]
	],
	[
		[
			6336920,
			7286703
		],
		[
			-1379,
			-2424
		],
		[
			-1975,
			-1181
		],
		[
			-2798,
			-1671
		],
		[
			-295,
			-1861
		],
		[
			-410,
			-20
		],
		[
			921,
			-1363
		],
		[
			-1536,
			-4118
		],
		[
			-1197,
			-844
		],
		[
			-2657,
			-1872
		],
		[
			-1661,
			-1188
		],
		[
			-322,
			-2083
		],
		[
			-4192,
			-115
		],
		[
			-817,
			1185
		],
		[
			-1968,
			-757
		],
		[
			-1225,
			3218
		],
		[
			-4129,
			800
		],
		[
			-8327,
			-4819
		],
		[
			-3365,
			1702
		],
		[
			-63,
			1555
		],
		[
			-3607,
			1964
		],
		[
			-3084,
			-795
		],
		[
			-51,
			1205
		],
		[
			-50,
			1167
		],
		[
			-2778,
			2262
		],
		[
			-3083,
			-1440
		],
		[
			-1720,
			-1989
		],
		[
			-1074,
			-1242
		],
		[
			-1968,
			-382
		],
		[
			627,
			1624
		],
		[
			1346,
			3485
		],
		[
			-677,
			1357
		],
		[
			-13192,
			4265
		],
		[
			-899,
			1999
		],
		[
			-3295,
			626
		],
		[
			-1811,
			660
		],
		[
			1968,
			2558
		],
		[
			-205,
			4353
		],
		[
			1198,
			2044
		],
		[
			-2050,
			4097
		]
	],
	[
		[
			6336920,
			7286703
		],
		[
			5569,
			-2468
		],
		[
			3935,
			891
		],
		[
			4575,
			-1845
		],
		[
			1685,
			-63
		],
		[
			3514,
			-132
		],
		[
			4868,
			1104
		],
		[
			974,
			2231
		],
		[
			2244,
			875
		],
		[
			2861,
			-176
		],
		[
			16317,
			-1003
		],
		[
			3196,
			-1381
		],
		[
			441,
			-1216
		],
		[
			-749,
			-955
		],
		[
			-7750,
			377
		],
		[
			-2271,
			-2195
		],
		[
			-3426,
			-706
		],
		[
			-1297,
			-1251
		],
		[
			3868,
			-1679
		],
		[
			2110,
			65
		],
		[
			281,
			-959
		],
		[
			2131,
			1941
		],
		[
			2380,
			-1588
		],
		[
			1982,
			1261
		],
		[
			815,
			-901
		],
		[
			1206,
			266
		],
		[
			-1299,
			1804
		],
		[
			72,
			1444
		],
		[
			2491,
			420
		],
		[
			-414,
			-1135
		],
		[
			1071,
			-104
		],
		[
			2090,
			3558
		],
		[
			14301,
			-2736
		],
		[
			5139,
			-4243
		],
		[
			-4399,
			-1913
		],
		[
			-11036,
			1597
		],
		[
			-2660,
			-82
		],
		[
			304,
			-837
		],
		[
			10037,
			-887
		],
		[
			3023,
			-1118
		],
		[
			5107,
			307
		],
		[
			4682,
			225
		],
		[
			3280,
			1572
		],
		[
			7723,
			859
		],
		[
			16119,
			551
		],
		[
			15001,
			1527
		],
		[
			2189,
			-611
		],
		[
			786,
			-1208
		],
		[
			-644,
			-2357
		],
		[
			-1853,
			-2125
		],
		[
			-4690,
			-234
		],
		[
			-1350,
			-1108
		],
		[
			4121,
			-8505
		],
		[
			-544,
			-6832
		],
		[
			-2460,
			-2268
		],
		[
			-10556,
			-3856
		],
		[
			-4681,
			-444
		],
		[
			-3966,
			-2121
		],
		[
			-10847,
			-1386
		],
		[
			-6479,
			-3020
		],
		[
			-2677,
			-2351
		],
		[
			-1614,
			-3761
		],
		[
			1538,
			-5411
		],
		[
			-704,
			-539
		],
		[
			-1498,
			-64
		],
		[
			-6003,
			603
		],
		[
			-609,
			79
		],
		[
			-862,
			131
		],
		[
			-1301,
			198
		],
		[
			-1653,
			252
		],
		[
			-7115,
			839
		],
		[
			-4334,
			-1499
		],
		[
			-7196,
			-4294
		],
		[
			-4806,
			-1362
		],
		[
			-10058,
			-1741
		],
		[
			-14461,
			-2502
		],
		[
			-884,
			-153
		],
		[
			-11550,
			-7965
		],
		[
			-6684,
			1128
		],
		[
			-5620,
			948
		],
		[
			-3850,
			1631
		],
		[
			-12738,
			2549
		],
		[
			-17783,
			2806
		],
		[
			-7652,
			-314
		],
		[
			-10619,
			-1823
		],
		[
			-15616,
			-606
		],
		[
			-15159,
			-2834
		],
		[
			-3866,
			-722
		],
		[
			-2570,
			298
		],
		[
			-704,
			-484
		],
		[
			1264,
			-1629
		],
		[
			-2682,
			-1972
		],
		[
			-11206,
			4926
		],
		[
			3347,
			3430
		],
		[
			-3487,
			2533
		],
		[
			-898,
			-2536
		],
		[
			-1679,
			300
		],
		[
			-762,
			1175
		],
		[
			607,
			1817
		],
		[
			-1836,
			-51
		],
		[
			-497,
			-295
		],
		[
			-1631,
			220
		],
		[
			-814,
			-410
		],
		[
			-848,
			11
		],
		[
			-1270,
			582
		],
		[
			-1640,
			-54
		],
		[
			-20,
			-619
		],
		[
			-558,
			-407
		],
		[
			-1860,
			-427
		],
		[
			45,
			-4262
		],
		[
			-4473,
			-730
		],
		[
			-2083,
			1425
		],
		[
			1102,
			3556
		],
		[
			-989,
			1496
		],
		[
			-1003,
			-100
		],
		[
			-3668,
			-323
		],
		[
			3096,
			-4452
		],
		[
			-674,
			-1206
		],
		[
			-1810,
			-477
		],
		[
			-14183,
			5563
		],
		[
			-1985,
			2243
		],
		[
			-1829,
			59
		],
		[
			-3805,
			2350
		],
		[
			-1873,
			1509
		],
		[
			-1847,
			-292
		],
		[
			-7268,
			2487
		],
		[
			768,
			-1034
		],
		[
			4077,
			-1156
		],
		[
			11475,
			-8059
		],
		[
			-3634,
			-2896
		],
		[
			-4426,
			-127
		],
		[
			-2770,
			-1752
		],
		[
			-10314,
			-1260
		],
		[
			-1884,
			-2401
		],
		[
			-3148,
			-1197
		],
		[
			-11845,
			1834
		]
	],
	[
		[
			6185204,
			7215287
		],
		[
			799,
			-877
		],
		[
			419,
			575
		],
		[
			1831,
			148
		],
		[
			2967,
			-2060
		],
		[
			2382,
			-557
		],
		[
			-106,
			-289
		],
		[
			5646,
			-218
		],
		[
			2085,
			-611
		],
		[
			2973,
			-557
		],
		[
			1122,
			-1591
		],
		[
			69,
			-978
		],
		[
			1495,
			-152
		],
		[
			1241,
			-992
		],
		[
			-2432,
			-1275
		],
		[
			-316,
			-576
		],
		[
			-3573,
			-391
		],
		[
			-1842,
			-744
		],
		[
			-1589,
			-1270
		],
		[
			-628,
			-1665
		],
		[
			-99,
			-1815
		],
		[
			-929,
			-903
		],
		[
			-6599,
			-1691
		],
		[
			-4428,
			-576
		],
		[
			-1257,
			270
		],
		[
			-1003,
			1085
		],
		[
			-2196,
			1316
		],
		[
			-2271,
			810
		],
		[
			-2696,
			1651
		],
		[
			-2117,
			755
		],
		[
			-3607,
			866
		],
		[
			-1789,
			879
		],
		[
			-2262,
			1527
		],
		[
			-2356,
			270
		],
		[
			-5815,
			-804
		],
		[
			-305,
			231
		],
		[
			429,
			1016
		],
		[
			1932,
			539
		],
		[
			1295,
			1394
		],
		[
			153,
			775
		],
		[
			1286,
			609
		],
		[
			3447,
			-28
		],
		[
			1642,
			309
		],
		[
			2893,
			1237
		],
		[
			1531,
			408
		],
		[
			1190,
			-188
		],
		[
			-74,
			-1016
		],
		[
			1003,
			468
		],
		[
			1081,
			-223
		],
		[
			-217,
			1244
		],
		[
			4177,
			977
		],
		[
			1032,
			1239
		],
		[
			2304,
			1375
		],
		[
			2082,
			74
		]
	],
	[
		[
			6220929,
			7216857
		],
		[
			-309,
			-383
		],
		[
			-3309,
			498
		],
		[
			-4043,
			317
		],
		[
			-261,
			490
		],
		[
			1884,
			349
		],
		[
			1295,
			918
		],
		[
			592,
			1686
		],
		[
			-209,
			596
		],
		[
			834,
			649
		],
		[
			1955,
			-232
		],
		[
			656,
			-560
		],
		[
			-567,
			-1669
		],
		[
			0,
			-1867
		],
		[
			1482,
			-792
		]
	],
	[
		[
			6384340,
			7279915
		],
		[
			-36,
			-1576
		],
		[
			-1699,
			345
		],
		[
			-991,
			2294
		],
		[
			1501,
			286
		],
		[
			15,
			-1283
		],
		[
			1210,
			-66
		]
	]
];
var NUTS_RG_03M_2016_4326_LEVL_1_UK = {
	type: type$3,
	transform: transform$2,
	objects: objects$2,
	arcs: arcs$2
};

var type$4 = "Topology";
var transform$3 = {
	scale: [
		0.00001,
		0.00001
	],
	translate: [
		-63.15176,
		-21.38696
	]
};
var objects$3 = {
	NUTS: {
		type: "GeometryCollection",
		geometries: [
			{
				type: "Polygon",
				arcs: [
					[
						4,
						5,
						6,
						7,
						8,
						9
					]
				],
				id: "UKD4",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKD4",
					CNTR_CODE: "UK",
					NUTS_NAME: "Lancashire",
					FID: "UKD4"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						10,
						11,
						12,
						13,
						14
					]
				],
				id: "UKC1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKC1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Tees Valley and Durham",
					FID: "UKC1"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							15,
							-11,
							-15,
							16,
							17,
							18
						]
					],
					[
						[
							19
						]
					],
					[
						[
							20
						]
					]
				],
				id: "UKC2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKC2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Northumberland and Tyne and Wear",
					FID: "UKC2"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-14,
							21,
							-10,
							22,
							23,
							-17
						]
					],
					[
						[
							24
						]
					],
					[
						[
							25
						]
					]
				],
				id: "UKD1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKD1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Cumbria",
					FID: "UKD1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						26,
						27,
						28,
						29,
						-7
					]
				],
				id: "UKD3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKD3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Greater Manchester",
					FID: "UKD3"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-29,
						30,
						31,
						32,
						33,
						34,
						35,
						36
					]
				],
				id: "UKD6",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKD6",
					CNTR_CODE: "UK",
					NUTS_NAME: "Cheshire",
					FID: "UKD6"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-8,
							-30,
							-37,
							37
						]
					],
					[
						[
							-35,
							38
						]
					]
				],
				id: "UKD7",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKD7",
					CNTR_CODE: "UK",
					NUTS_NAME: "Merseyside",
					FID: "UKD7"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						39,
						40,
						41,
						42,
						43
					]
				],
				id: "UKE1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKE1",
					CNTR_CODE: "UK",
					NUTS_NAME: "East Yorkshire and Northern Lincolnshire",
					FID: "UKE1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						44,
						-44,
						45,
						46,
						-5,
						-22,
						-13
					]
				],
				id: "UKE2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKE2",
					CNTR_CODE: "UK",
					NUTS_NAME: "North Yorkshire",
					FID: "UKE2"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-43,
						47,
						48,
						-46
					]
				],
				id: "UKE3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKE3",
					CNTR_CODE: "UK",
					NUTS_NAME: "South Yorkshire",
					FID: "UKE3"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-47,
						-49,
						49,
						-27,
						-6
					]
				],
				id: "UKE4",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKE4",
					CNTR_CODE: "UK",
					NUTS_NAME: "West Yorkshire",
					FID: "UKE4"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-48,
						-42,
						50,
						51,
						52,
						-31,
						-28,
						-50
					]
				],
				id: "UKF1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKF1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Derbyshire and Nottinghamshire",
					FID: "UKF1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						53,
						54,
						55,
						56,
						57,
						58,
						-52,
						59
					]
				],
				id: "UKF2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKF2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Leicestershire, Rutland and Northamptonshire",
					FID: "UKF2"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						60,
						-54,
						-60,
						-51,
						-41,
						61
					]
				],
				id: "UKF3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKF3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Lincolnshire",
					FID: "UKF3"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-58,
						62,
						63,
						64,
						65,
						66,
						67
					]
				],
				id: "UKG1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKG1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Herefordshire, Worcestershire and Warwickshire",
					FID: "UKG1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-59,
						-68,
						68,
						-66,
						69,
						-32,
						-53
					]
				],
				id: "UKG2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKG2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Shropshire and Staffordshire",
					FID: "UKG2"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-69,
						-67
					]
				],
				id: "UKG3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKG3",
					CNTR_CODE: "UK",
					NUTS_NAME: "West Midlands",
					FID: "UKG3"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						70,
						71,
						72,
						-55,
						-61,
						73
					]
				],
				id: "UKH1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKH1",
					CNTR_CODE: "UK",
					NUTS_NAME: "East Anglia",
					FID: "UKH1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-73,
						74,
						75,
						76,
						77,
						-56
					]
				],
				id: "UKH2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKH2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Bedfordshire and Hertfordshire",
					FID: "UKH2"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-72,
							78,
							79,
							-75
						]
					],
					[
						[
							80
						]
					]
				],
				id: "UKH3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKH3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Essex",
					FID: "UKH3"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							81,
							82,
							83,
							84
						]
					],
					[
						[
							85,
							86,
							87,
							88
						]
					]
				],
				id: "UKI3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKI3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Inner London - West",
					FID: "UKI3"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							89,
							90,
							-82,
							-85,
							91,
							92
						]
					],
					[
						[
							93,
							-89,
							94,
							95,
							96
						]
					]
				],
				id: "UKI4",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKI4",
					CNTR_CODE: "UK",
					NUTS_NAME: "Inner London - East",
					FID: "UKI4"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							97,
							98,
							99,
							100,
							101
						]
					],
					[
						[
							102
						]
					],
					[
						[
							103
						]
					],
					[
						[
							104
						]
					],
					[
						[
							105
						]
					],
					[
						[
							106
						]
					],
					[
						[
							107
						]
					],
					[
						[
							108
						]
					],
					[
						[
							109
						]
					],
					[
						[
							110
						]
					],
					[
						[
							111
						]
					],
					[
						[
							112
						]
					],
					[
						[
							113
						]
					],
					[
						[
							114
						]
					],
					[
						[
							115
						]
					],
					[
						[
							116
						]
					],
					[
						[
							117
						]
					],
					[
						[
							118
						]
					],
					[
						[
							119
						]
					],
					[
						[
							120
						]
					],
					[
						[
							121
						]
					],
					[
						[
							122
						]
					],
					[
						[
							123
						]
					],
					[
						[
							124
						]
					],
					[
						[
							125
						]
					],
					[
						[
							126
						]
					],
					[
						[
							127
						]
					],
					[
						[
							128
						]
					],
					[
						[
							129
						]
					],
					[
						[
							130
						]
					],
					[
						[
							131
						]
					],
					[
						[
							132
						]
					],
					[
						[
							133
						]
					],
					[
						[
							134
						]
					],
					[
						[
							135
						]
					],
					[
						[
							136
						]
					],
					[
						[
							137
						]
					],
					[
						[
							138
						]
					],
					[
						[
							139
						]
					],
					[
						[
							140
						]
					],
					[
						[
							141
						]
					],
					[
						[
							142
						]
					],
					[
						[
							143
						]
					],
					[
						[
							144
						]
					],
					[
						[
							145
						]
					],
					[
						[
							146
						]
					],
					[
						[
							147
						]
					],
					[
						[
							148
						]
					],
					[
						[
							149
						]
					],
					[
						[
							150
						]
					],
					[
						[
							151
						]
					],
					[
						[
							152
						]
					],
					[
						[
							153
						]
					],
					[
						[
							154
						]
					],
					[
						[
							155
						]
					],
					[
						[
							156
						]
					],
					[
						[
							157
						]
					],
					[
						[
							158
						]
					],
					[
						[
							159
						]
					],
					[
						[
							160
						]
					],
					[
						[
							161
						]
					],
					[
						[
							162
						]
					],
					[
						[
							163
						]
					],
					[
						[
							164
						]
					],
					[
						[
							165
						]
					],
					[
						[
							166
						]
					],
					[
						[
							167
						]
					],
					[
						[
							168
						]
					],
					[
						[
							169
						]
					],
					[
						[
							170
						]
					],
					[
						[
							171
						]
					],
					[
						[
							172
						]
					],
					[
						[
							173
						]
					],
					[
						[
							174
						]
					],
					[
						[
							175
						]
					],
					[
						[
							176
						]
					],
					[
						[
							177
						]
					],
					[
						[
							178
						]
					],
					[
						[
							179
						]
					],
					[
						[
							180
						]
					],
					[
						[
							181
						]
					],
					[
						[
							182
						]
					],
					[
						[
							183
						]
					],
					[
						[
							184
						]
					],
					[
						[
							185
						]
					],
					[
						[
							186
						]
					],
					[
						[
							187
						]
					],
					[
						[
							188
						]
					],
					[
						[
							189
						]
					],
					[
						[
							190
						]
					],
					[
						[
							191
						]
					],
					[
						[
							192
						]
					],
					[
						[
							193
						]
					],
					[
						[
							194
						]
					],
					[
						[
							195
						]
					],
					[
						[
							196
						]
					],
					[
						[
							197
						]
					],
					[
						[
							198
						]
					],
					[
						[
							199
						]
					],
					[
						[
							200
						]
					],
					[
						[
							201
						]
					],
					[
						[
							202
						]
					],
					[
						[
							203
						]
					],
					[
						[
							204
						]
					],
					[
						[
							205
						]
					],
					[
						[
							206
						]
					],
					[
						[
							207
						]
					],
					[
						[
							208
						]
					],
					[
						[
							209
						]
					],
					[
						[
							210
						]
					],
					[
						[
							211
						]
					],
					[
						[
							212
						]
					],
					[
						[
							213
						]
					],
					[
						[
							214
						]
					],
					[
						[
							215
						]
					],
					[
						[
							216
						]
					],
					[
						[
							217
						]
					],
					[
						[
							218
						]
					],
					[
						[
							219
						]
					],
					[
						[
							220
						]
					],
					[
						[
							221
						]
					],
					[
						[
							222
						]
					],
					[
						[
							223
						]
					],
					[
						[
							224
						]
					],
					[
						[
							225
						]
					],
					[
						[
							226
						]
					],
					[
						[
							227
						]
					],
					[
						[
							228
						]
					],
					[
						[
							229
						]
					],
					[
						[
							230
						]
					],
					[
						[
							231
						]
					],
					[
						[
							232
						]
					],
					[
						[
							233
						]
					],
					[
						[
							234
						]
					],
					[
						[
							235
						]
					],
					[
						[
							236
						]
					],
					[
						[
							237
						]
					],
					[
						[
							238
						]
					],
					[
						[
							239
						]
					],
					[
						[
							240
						]
					],
					[
						[
							241
						]
					],
					[
						[
							242
						]
					],
					[
						[
							243
						]
					],
					[
						[
							244
						]
					],
					[
						[
							245
						]
					],
					[
						[
							246
						]
					],
					[
						[
							247
						]
					],
					[
						[
							248
						]
					],
					[
						[
							249
						]
					],
					[
						[
							250
						]
					],
					[
						[
							251
						]
					],
					[
						[
							252
						]
					],
					[
						[
							253
						]
					],
					[
						[
							254
						]
					],
					[
						[
							255
						]
					],
					[
						[
							256
						]
					],
					[
						[
							257
						]
					],
					[
						[
							258
						]
					],
					[
						[
							259
						]
					],
					[
						[
							260
						]
					],
					[
						[
							261
						]
					],
					[
						[
							262
						]
					],
					[
						[
							263
						]
					],
					[
						[
							264
						]
					],
					[
						[
							265
						]
					]
				],
				id: "UKM6",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKM6",
					CNTR_CODE: "UK",
					NUTS_NAME: "Highlands and Islands",
					FID: "UKM6"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-80,
							266,
							-90,
							-93,
							267,
							-76
						]
					],
					[
						[
							268,
							269,
							-96,
							270
						]
					]
				],
				id: "UKI5",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKI5",
					CNTR_CODE: "UK",
					NUTS_NAME: "Outer London - East and North East",
					FID: "UKI5"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-270,
						271,
						272,
						273,
						-86,
						-94,
						-97
					]
				],
				id: "UKI6",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKI6",
					CNTR_CODE: "UK",
					NUTS_NAME: "Outer London - South",
					FID: "UKI6"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-268,
						-92,
						-84,
						274,
						-87,
						-274,
						275,
						276,
						-77
					]
				],
				id: "UKI7",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKI7",
					CNTR_CODE: "UK",
					NUTS_NAME: "Outer London - West and North West",
					FID: "UKI7"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-78,
						-277,
						277,
						278,
						279,
						-63,
						-57
					]
				],
				id: "UKJ1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKJ1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Berkshire, Buckinghamshire and Oxfordshire",
					FID: "UKJ1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-276,
						-273,
						280,
						281,
						282,
						-278
					]
				],
				id: "UKJ2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKJ2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Surrey, East and West Sussex",
					FID: "UKJ2"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-283,
							283,
							284,
							285,
							-279
						]
					],
					[
						[
							286
						]
					],
					[
						[
							287
						]
					]
				],
				id: "UKJ3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKJ3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Hampshire and Isle of Wight",
					FID: "UKJ3"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							288,
							-281,
							-272,
							-269,
							289
						]
					],
					[
						[
							290
						]
					]
				],
				id: "UKJ4",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKJ4",
					CNTR_CODE: "UK",
					NUTS_NAME: "Kent",
					FID: "UKJ4"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-280,
						-286,
						291,
						292,
						293,
						-64
					]
				],
				id: "UKK1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKK1",
					CNTR_CODE: "UK",
					NUTS_NAME: "Gloucestershire, Wiltshire and Bristol/Bath area",
					FID: "UKK1"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-292,
							-285,
							294,
							295,
							296
						]
					],
					[
						[
							297
						]
					],
					[
						[
							298
						]
					]
				],
				id: "UKK2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKK2",
					CNTR_CODE: "UK",
					NUTS_NAME: "Dorset and Somerset",
					FID: "UKK2"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							299,
							300
						]
					],
					[
						[
							301
						]
					],
					[
						[
							302
						]
					],
					[
						[
							303
						]
					],
					[
						[
							304
						]
					]
				],
				id: "UKK3",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKK3",
					CNTR_CODE: "UK",
					NUTS_NAME: "Cornwall and Isles of Scilly",
					FID: "UKK3"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-296,
							305,
							-301,
							306
						]
					],
					[
						[
							307
						]
					],
					[
						[
							308
						]
					]
				],
				id: "UKK4",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKK4",
					CNTR_CODE: "UK",
					NUTS_NAME: "Devon",
					FID: "UKK4"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							309,
							310,
							311
						]
					],
					[
						[
							312
						]
					],
					[
						[
							313
						]
					],
					[
						[
							314
						]
					],
					[
						[
							315
						]
					],
					[
						[
							316
						]
					],
					[
						[
							317
						]
					]
				],
				id: "UKL1",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKL1",
					CNTR_CODE: "UK",
					NUTS_NAME: "West Wales and The Valleys",
					FID: "UKL1"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-33,
						-70,
						-65,
						-294,
						318,
						-310,
						-312,
						319
					]
				],
				id: "UKL2",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKL2",
					CNTR_CODE: "UK",
					NUTS_NAME: "East Wales",
					FID: "UKL2"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-99,
						320,
						321
					]
				],
				id: "UKM5",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKM5",
					CNTR_CODE: "UK",
					NUTS_NAME: "North Eastern Scotland",
					FID: "UKM5"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						322,
						323,
						324,
						-100,
						-322
					]
				],
				id: "UKM7",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKM7",
					CNTR_CODE: "UK",
					NUTS_NAME: "Eastern Scotland",
					FID: "UKM7"
				}
			},
			{
				type: "Polygon",
				arcs: [
					[
						-325,
						325,
						326,
						-101
					]
				],
				id: "UKM8",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKM8",
					CNTR_CODE: "UK",
					NUTS_NAME: "West Central Scotland",
					FID: "UKM8"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							-18,
							-24,
							327,
							-326,
							-324,
							328
						]
					],
					[
						[
							329
						]
					]
				],
				id: "UKM9",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKM9",
					CNTR_CODE: "UK",
					NUTS_NAME: "Southern Scotland",
					FID: "UKM9"
				}
			},
			{
				type: "MultiPolygon",
				arcs: [
					[
						[
							330,
							-4,
							-1,
							-2,
							331
						],
						[
							-3
						]
					],
					[
						[
							332
						]
					],
					[
						[
							333
						]
					],
					[
						[
							334
						]
					]
				],
				id: "UKN0",
				properties: {
					LEVL_CODE: 2,
					NUTS_ID: "UKN0",
					CNTR_CODE: "UK",
					NUTS_NAME: "Northern Ireland",
					FID: "UKN0"
				}
			}
		]
	}
};
var arcs$3 = [
	[
		[
			5544835,
			7599525
		],
		[
			-8305,
			-2743
		],
		[
			-6357,
			-4403
		],
		[
			-8701,
			-255
		],
		[
			-6227,
			952
		],
		[
			-1658,
			-1811
		],
		[
			-3259,
			-3561
		],
		[
			-11175,
			-2531
		],
		[
			1098,
			-1359
		],
		[
			-217,
			-1427
		],
		[
			5374,
			-3152
		],
		[
			4330,
			-3741
		],
		[
			5159,
			-1243
		],
		[
			2127,
			-1947
		],
		[
			2982,
			-2731
		],
		[
			7921,
			-1843
		],
		[
			1787,
			-6802
		],
		[
			891,
			-881
		],
		[
			3253,
			-1077
		],
		[
			12045,
			196
		],
		[
			1868,
			-1998
		],
		[
			4146,
			-1454
		],
		[
			2020,
			-2415
		],
		[
			3372,
			-629
		],
		[
			2394,
			-1508
		],
		[
			2884,
			878
		],
		[
			4459,
			-956
		],
		[
			3095,
			2393
		],
		[
			3667,
			721
		],
		[
			-734,
			-1500
		],
		[
			3910,
			-121
		],
		[
			-608,
			-1488
		],
		[
			2616,
			518
		],
		[
			4318,
			-1274
		],
		[
			3798,
			799
		],
		[
			2464,
			3040
		],
		[
			529,
			1647
		],
		[
			-608,
			1692
		],
		[
			1742,
			1771
		],
		[
			9199,
			2155
		],
		[
			-80,
			2994
		],
		[
			-2634,
			1621
		],
		[
			-249,
			1196
		],
		[
			-3128,
			1323
		],
		[
			2781,
			1519
		],
		[
			-745,
			2214
		],
		[
			3706,
			207
		],
		[
			3466,
			1433
		],
		[
			5572,
			5250
		],
		[
			3246,
			1313
		],
		[
			10513,
			-3958
		],
		[
			2067,
			-2481
		],
		[
			3198,
			-1764
		],
		[
			606,
			-591
		],
		[
			960,
			-3903
		],
		[
			-1993,
			-1302
		],
		[
			4231,
			-1529
		],
		[
			1731,
			-3672
		],
		[
			2061,
			-1610
		],
		[
			5690,
			-2623
		],
		[
			4047,
			1562
		],
		[
			5305,
			-1938
		],
		[
			1058,
			-2885
		],
		[
			-2410,
			-3261
		],
		[
			837,
			-1908
		],
		[
			-844,
			-1843
		],
		[
			-510,
			-1115
		],
		[
			3483,
			-2824
		],
		[
			3278,
			301
		]
	],
	[
		[
			5589569,
			7645399
		],
		[
			-3237,
			-1517
		],
		[
			-6030,
			-637
		],
		[
			-4159,
			-2718
		],
		[
			-1545,
			-6867
		],
		[
			-3969,
			-2580
		],
		[
			-402,
			-5650
		],
		[
			-3498,
			-4053
		],
		[
			-5485,
			-3279
		],
		[
			-1043,
			-4738
		],
		[
			-9177,
			75
		],
		[
			-10790,
			-3856
		],
		[
			-8046,
			2269
		],
		[
			-2015,
			-761
		],
		[
			-6146,
			-3088
		],
		[
			1129,
			-2664
		],
		[
			5017,
			-2776
		],
		[
			4047,
			-71
		],
		[
			5713,
			-1493
		],
		[
			3836,
			503
		],
		[
			1066,
			-1973
		]
	],
	[
		[
			5586561,
			7552716
		],
		[
			-667,
			-860
		],
		[
			-1941,
			-157
		],
		[
			-704,
			724
		],
		[
			-795,
			-110
		],
		[
			-1083,
			965
		],
		[
			1232,
			535
		],
		[
			1570,
			1496
		],
		[
			1935,
			445
		],
		[
			915,
			-415
		],
		[
			-370,
			-1304
		],
		[
			-1017,
			-590
		],
		[
			925,
			-729
		]
	],
	[
		[
			5655677,
			7543163
		],
		[
			1573,
			1006
		],
		[
			6793,
			133
		],
		[
			3680,
			1668
		],
		[
			1784,
			-652
		],
		[
			1802,
			-659
		],
		[
			4285,
			185
		],
		[
			3181,
			1957
		],
		[
			426,
			3113
		],
		[
			1676,
			-171
		],
		[
			1903,
			-1739
		],
		[
			3205,
			1850
		],
		[
			2389,
			-924
		]
	],
	[
		[
			6069093,
			7561372
		],
		[
			-7534,
			-6787
		],
		[
			-2202,
			-789
		],
		[
			-419,
			-1754
		],
		[
			3919,
			-3573
		],
		[
			4318,
			-1668
		],
		[
			983,
			-380
		],
		[
			16,
			-735
		],
		[
			50,
			-2364
		],
		[
			2127,
			-531
		],
		[
			7578,
			577
		],
		[
			2752,
			-3260
		],
		[
			-576,
			-1017
		],
		[
			512,
			-1067
		],
		[
			2716,
			-188
		],
		[
			3033,
			-1600
		],
		[
			5461,
			402
		],
		[
			886,
			-1527
		],
		[
			2728,
			292
		],
		[
			1287,
			-1477
		],
		[
			547,
			-1506
		],
		[
			5810,
			-1805
		],
		[
			4776,
			-5583
		],
		[
			488,
			-239
		],
		[
			2214,
			-1083
		]
	],
	[
		[
			6110563,
			7523710
		],
		[
			110,
			-1121
		],
		[
			-185,
			-938
		],
		[
			-1433,
			-388
		],
		[
			-706,
			-295
		],
		[
			-5546,
			-2317
		],
		[
			-957,
			-2033
		],
		[
			114,
			-2530
		],
		[
			-3783,
			-2821
		],
		[
			2370,
			-4344
		]
	],
	[
		[
			6100547,
			7506923
		],
		[
			-2058,
			-4058
		],
		[
			-1509,
			-163
		],
		[
			-2471,
			1880
		],
		[
			-2115,
			979
		],
		[
			-3210,
			-1461
		],
		[
			-733,
			-1007
		],
		[
			584,
			-2428
		],
		[
			-769,
			-399
		],
		[
			-1280,
			675
		],
		[
			-1787,
			3982
		],
		[
			-2779,
			-568
		],
		[
			-4365,
			1052
		],
		[
			591,
			-1288
		],
		[
			-1380,
			-2333
		],
		[
			-3929,
			-503
		],
		[
			-2134,
			1739
		],
		[
			-3132,
			-2473
		],
		[
			-4025,
			850
		],
		[
			-5897,
			-2957
		],
		[
			-2493,
			1137
		],
		[
			-2933,
			-1207
		],
		[
			-1455,
			968
		],
		[
			-4825,
			-393
		],
		[
			-484,
			-435
		],
		[
			-2189,
			-1969
		],
		[
			652,
			-1842
		],
		[
			-2296,
			-3942
		]
	],
	[
		[
			6042126,
			7490759
		],
		[
			-3292,
			-643
		],
		[
			-2194,
			1393
		],
		[
			-2980,
			-1745
		],
		[
			-1744,
			-2676
		],
		[
			-5536,
			1992
		],
		[
			20,
			1580
		],
		[
			-3317,
			617
		],
		[
			-2984,
			1824
		],
		[
			-1491,
			46
		],
		[
			-789,
			24
		],
		[
			671,
			-1962
		],
		[
			-830,
			-717
		],
		[
			-6713,
			2568
		],
		[
			444,
			1977
		],
		[
			1524,
			1258
		],
		[
			-907,
			1273
		],
		[
			350,
			1181
		],
		[
			2866,
			2353
		],
		[
			2863,
			527
		],
		[
			521,
			558
		],
		[
			2110,
			2257
		],
		[
			-1162,
			4005
		]
	],
	[
		[
			6019556,
			7508449
		],
		[
			2640,
			2632
		],
		[
			6553,
			888
		],
		[
			2459,
			-702
		],
		[
			-1939,
			1162
		],
		[
			-6234,
			-551
		],
		[
			-4427,
			308
		],
		[
			-4164,
			289
		],
		[
			-4088,
			2087
		],
		[
			-917,
			1782
		],
		[
			943,
			9929
		],
		[
			1132,
			4450
		],
		[
			2448,
			178
		],
		[
			1666,
			-2198
		],
		[
			1179,
			3206
		],
		[
			1801,
			530
		],
		[
			7766,
			1057
		],
		[
			1888,
			1364
		],
		[
			948,
			3604
		],
		[
			-3329,
			47
		],
		[
			-1289,
			3173
		],
		[
			2867,
			3596
		],
		[
			3314,
			1521
		],
		[
			1040,
			477
		],
		[
			2282,
			2721
		],
		[
			-5866,
			6371
		]
	],
	[
		[
			6028229,
			7556370
		],
		[
			3667,
			-26
		],
		[
			3533,
			1930
		],
		[
			5472,
			-950
		],
		[
			1424,
			-1854
		],
		[
			3634,
			-320
		],
		[
			906,
			-80
		],
		[
			4495,
			3593
		],
		[
			6816,
			-263
		],
		[
			10454,
			3838
		],
		[
			463,
			-866
		]
	],
	[
		[
			6159242,
			7626906
		],
		[
			4907,
			-1135
		],
		[
			700,
			-3713
		],
		[
			2196,
			-3344
		],
		[
			5439,
			380
		],
		[
			1211,
			3861
		],
		[
			6744,
			1810
		]
	],
	[
		[
			6180439,
			7624765
		],
		[
			3178,
			-4381
		],
		[
			1124,
			-4036
		],
		[
			2842,
			-2467
		],
		[
			3370,
			-2926
		],
		[
			5699,
			-2342
		],
		[
			-935,
			-2072
		],
		[
			2754,
			-3610
		],
		[
			-1789,
			-1660
		],
		[
			2049,
			-1137
		],
		[
			-3851,
			-2886
		],
		[
			-4870,
			289
		],
		[
			-959,
			-1651
		],
		[
			1012,
			1638
		],
		[
			5140,
			-635
		],
		[
			4333,
			2083
		],
		[
			511,
			2202
		],
		[
			1621,
			1158
		],
		[
			7919,
			-1951
		],
		[
			5791,
			-2405
		],
		[
			6349,
			-499
		],
		[
			3942,
			-1584
		],
		[
			576,
			-69
		],
		[
			9840,
			-1180
		]
	],
	[
		[
			6236085,
			7594644
		],
		[
			-5180,
			-2370
		],
		[
			-882,
			-2614
		],
		[
			427,
			-1716
		],
		[
			-900,
			-336
		],
		[
			-37853,
			2125
		],
		[
			-2657,
			-2088
		],
		[
			-2164,
			-68
		],
		[
			-5600,
			-2257
		],
		[
			-2809,
			390
		],
		[
			-1139,
			2073
		],
		[
			-2595,
			-13
		],
		[
			-1439,
			-1211
		],
		[
			-1596,
			888
		],
		[
			-2169,
			1407
		],
		[
			-1357,
			-86
		],
		[
			1037,
			-1613
		],
		[
			135,
			-2860
		],
		[
			-567,
			-99
		],
		[
			-3217,
			2756
		],
		[
			-2770,
			42
		],
		[
			-645,
			-967
		],
		[
			-1284,
			-15
		],
		[
			-3332,
			2056
		],
		[
			-1217,
			1707
		],
		[
			-3789,
			545
		],
		[
			-3650,
			1757
		],
		[
			-3383,
			225
		],
		[
			-2026,
			428
		],
		[
			-2141,
			-1156
		],
		[
			-3608,
			149
		],
		[
			-1901,
			-4218
		],
		[
			-5361,
			1753
		],
		[
			-1736,
			-2382
		],
		[
			-7838,
			-2795
		],
		[
			-2456,
			-55
		],
		[
			-8060,
			2880
		],
		[
			-2014,
			-596
		],
		[
			-4238,
			-1253
		],
		[
			-5952,
			-535
		]
	],
	[
		[
			6098159,
			7584522
		],
		[
			877,
			1615
		],
		[
			-1380,
			5651
		],
		[
			-2494,
			534
		],
		[
			-1525,
			1700
		],
		[
			-3591,
			1802
		],
		[
			-5119,
			2570
		],
		[
			-1913,
			3434
		],
		[
			2798,
			1787
		],
		[
			75,
			1074
		],
		[
			-5926,
			3042
		],
		[
			2270,
			3514
		],
		[
			700,
			2636
		],
		[
			1041,
			3923
		]
	],
	[
		[
			6083972,
			7617804
		],
		[
			3152,
			561
		],
		[
			6058,
			-1209
		],
		[
			2306,
			2010
		],
		[
			2659,
			219
		],
		[
			3562,
			3405
		],
		[
			5057,
			-223
		],
		[
			1583,
			575
		],
		[
			6716,
			2436
		],
		[
			9016,
			-2981
		],
		[
			3634,
			1095
		],
		[
			2663,
			4205
		],
		[
			2703,
			1372
		],
		[
			8003,
			1186
		],
		[
			6285,
			-1060
		],
		[
			3686,
			-2561
		],
		[
			4418,
			1789
		],
		[
			2055,
			-1878
		],
		[
			1714,
			161
		]
	],
	[
		[
			6169007,
			7646135
		],
		[
			4150,
			-5343
		],
		[
			-625,
			-1279
		],
		[
			6608,
			-4057
		],
		[
			405,
			-1042
		],
		[
			-759,
			-1300
		],
		[
			1653,
			-8349
		]
	],
	[
		[
			6083972,
			7617804
		],
		[
			-7788,
			4332
		],
		[
			-1839,
			1887
		],
		[
			-9297,
			-4321
		],
		[
			-3003,
			-250
		],
		[
			-3651,
			1753
		],
		[
			-1159,
			1729
		],
		[
			204,
			1541
		],
		[
			-2432,
			2630
		],
		[
			2336,
			1363
		],
		[
			2490,
			3001
		],
		[
			-1810,
			2967
		],
		[
			-2614,
			1374
		],
		[
			2333,
			1821
		],
		[
			775,
			2766
		],
		[
			7840,
			2391
		],
		[
			-1088,
			1970
		],
		[
			355,
			2267
		],
		[
			-987,
			541
		],
		[
			-5044,
			-546
		],
		[
			-4952,
			4135
		],
		[
			-4936,
			1197
		],
		[
			-2120,
			2132
		],
		[
			-1384,
			3118
		]
	],
	[
		[
			6046201,
			7657602
		],
		[
			2015,
			2770
		],
		[
			3415,
			881
		],
		[
			840,
			2229
		],
		[
			-670,
			1057
		],
		[
			2203,
			2168
		],
		[
			5934,
			3641
		],
		[
			3568,
			981
		],
		[
			2836,
			2383
		],
		[
			4680,
			817
		],
		[
			5999,
			-818
		],
		[
			3964,
			1651
		],
		[
			837,
			1682
		],
		[
			-749,
			1531
		],
		[
			947,
			842
		],
		[
			13414,
			3703
		],
		[
			2099,
			2597
		],
		[
			-2414,
			881
		],
		[
			-2411,
			2943
		],
		[
			-1313,
			4057
		],
		[
			-4796,
			3355
		],
		[
			-822,
			2265
		],
		[
			-3709,
			3090
		],
		[
			2438,
			1005
		],
		[
			6723,
			-293
		],
		[
			-177,
			733
		],
		[
			6484,
			5281
		],
		[
			1057,
			1963
		],
		[
			7305,
			3798
		],
		[
			1149,
			3005
		],
		[
			1302,
			745
		],
		[
			3394,
			1267
		]
	],
	[
		[
			6111743,
			7719812
		],
		[
			3469,
			-2841
		],
		[
			317,
			-2084
		],
		[
			11054,
			-6813
		],
		[
			4807,
			-5069
		],
		[
			2509,
			-744
		],
		[
			2703,
			680
		],
		[
			1725,
			-1385
		],
		[
			-683,
			-1293
		],
		[
			531,
			-744
		],
		[
			4761,
			774
		],
		[
			7873,
			-3822
		],
		[
			1649,
			-2389
		],
		[
			-742,
			-1414
		],
		[
			1972,
			-1862
		],
		[
			43,
			-1864
		],
		[
			2115,
			-1446
		],
		[
			404,
			-4804
		],
		[
			1075,
			-1141
		],
		[
			-389,
			-1987
		],
		[
			-2426,
			-2247
		],
		[
			177,
			-1408
		],
		[
			1606,
			-3202
		],
		[
			3768,
			-2098
		],
		[
			-1795,
			-2924
		],
		[
			98,
			-2065
		],
		[
			6398,
			-7516
		],
		[
			-1979,
			-3652
		],
		[
			3284,
			-5813
		],
		[
			2940,
			-2504
		]
	],
	[
		[
			6137199,
			7705628
		],
		[
			-2281,
			-23
		],
		[
			-967,
			1413
		],
		[
			1147,
			575
		],
		[
			2047,
			-318
		],
		[
			54,
			-1647
		]
	],
	[
		[
			6132312,
			7706933
		],
		[
			-1240,
			-722
		],
		[
			-1103,
			871
		],
		[
			1404,
			659
		],
		[
			939,
			-808
		]
	],
	[
		[
			6098159,
			7584522
		],
		[
			-2920,
			-941
		],
		[
			-5514,
			144
		],
		[
			-3400,
			-1253
		],
		[
			-1766,
			-2183
		],
		[
			773,
			-3584
		],
		[
			-5756,
			-2485
		],
		[
			2593,
			-1916
		],
		[
			1631,
			-1206
		],
		[
			-1294,
			-8003
		],
		[
			-1804,
			-438
		],
		[
			-1979,
			711
		],
		[
			-4529,
			-2075
		],
		[
			-5101,
			79
		]
	],
	[
		[
			6028229,
			7556370
		],
		[
			902,
			2332
		],
		[
			-3346,
			-607
		],
		[
			-4864,
			-3631
		],
		[
			-5861,
			-1747
		],
		[
			-606,
			3099
		],
		[
			-2924,
			4542
		],
		[
			-3345,
			-5684
		],
		[
			-7915,
			-6618
		],
		[
			-2423,
			-1173
		],
		[
			-1998,
			1893
		],
		[
			-3171,
			-453
		],
		[
			-1376,
			1123
		],
		[
			-92,
			4421
		],
		[
			-1370,
			1512
		],
		[
			3172,
			937
		],
		[
			1669,
			3893
		],
		[
			1067,
			1401
		],
		[
			-1730,
			1868
		],
		[
			-381,
			869
		],
		[
			-1439,
			358
		],
		[
			367,
			-1789
		],
		[
			-2392,
			-2256
		],
		[
			653,
			-1638
		],
		[
			-703,
			-782
		],
		[
			-5683,
			-638
		],
		[
			-1993,
			653
		],
		[
			-9130,
			8758
		],
		[
			-342,
			4745
		],
		[
			489,
			546
		],
		[
			911,
			1017
		],
		[
			-369,
			874
		],
		[
			-703,
			230
		],
		[
			-909,
			-1180
		],
		[
			-1262,
			312
		],
		[
			-12458,
			10654
		],
		[
			-3169,
			2884
		],
		[
			-2673,
			1173
		],
		[
			-1217,
			2007
		],
		[
			1928,
			990
		],
		[
			570,
			292
		],
		[
			2657,
			3837
		],
		[
			1348,
			4318
		],
		[
			-468,
			3782
		],
		[
			5259,
			4185
		],
		[
			1441,
			2544
		],
		[
			5799,
			3658
		],
		[
			1288,
			814
		],
		[
			240,
			4385
		],
		[
			3911,
			6542
		],
		[
			4910,
			2746
		],
		[
			5544,
			-1578
		],
		[
			711,
			1005
		],
		[
			2270,
			453
		],
		[
			330,
			1253
		],
		[
			-2376,
			-370
		],
		[
			-2795,
			1101
		],
		[
			2836,
			2589
		],
		[
			7342,
			1230
		],
		[
			7807,
			-2541
		],
		[
			1094,
			-25
		],
		[
			875,
			586
		],
		[
			-1240,
			1120
		],
		[
			1709,
			1998
		],
		[
			4834,
			2197
		]
	],
	[
		[
			6009439,
			7637386
		],
		[
			2718,
			4481
		],
		[
			-1425,
			2130
		],
		[
			7876,
			-86
		],
		[
			903,
			-10
		],
		[
			9814,
			5637
		],
		[
			3569,
			2719
		],
		[
			10531,
			3370
		],
		[
			2776,
			1975
		]
	],
	[
		[
			5994123,
			7544957
		],
		[
			399,
			-1299
		],
		[
			-662,
			144
		],
		[
			-3291,
			2999
		],
		[
			-2275,
			2965
		],
		[
			-306,
			3280
		],
		[
			1270,
			-638
		],
		[
			1646,
			-4238
		],
		[
			1782,
			-1369
		],
		[
			180,
			-1021
		],
		[
			1257,
			-823
		]
	],
	[
		[
			5998572,
			7544517
		],
		[
			-273,
			-1341
		],
		[
			-1847,
			523
		],
		[
			806,
			789
		],
		[
			1314,
			29
		]
	],
	[
		[
			6100547,
			7506923
		],
		[
			4415,
			-1128
		],
		[
			3387,
			694
		],
		[
			1429,
			292
		],
		[
			2930,
			-6082
		],
		[
			10916,
			-7003
		],
		[
			594,
			-1158
		]
	],
	[
		[
			6124218,
			7492538
		],
		[
			-1331,
			-1057
		],
		[
			-214,
			-1708
		],
		[
			-3832,
			-92
		],
		[
			-2244,
			-3047
		],
		[
			-67,
			-2275
		],
		[
			-3800,
			-2536
		],
		[
			573,
			-1158
		],
		[
			2349,
			-789
		],
		[
			-1249,
			-2549
		],
		[
			-2329,
			-1602
		]
	],
	[
		[
			6112074,
			7475725
		],
		[
			-3725,
			-1170
		],
		[
			-6540,
			485
		],
		[
			-1686,
			-2711
		],
		[
			-1331,
			-637
		],
		[
			-1972,
			507
		],
		[
			-952,
			1607
		],
		[
			-4768,
			850
		],
		[
			-5204,
			-1662
		],
		[
			-2117,
			1447
		],
		[
			-2884,
			978
		],
		[
			-3124,
			-100
		],
		[
			-5256,
			2123
		],
		[
			-4118,
			795
		],
		[
			1587,
			2878
		],
		[
			-3777,
			3610
		],
		[
			-199,
			1507
		],
		[
			-1111,
			379
		],
		[
			-4314,
			-1057
		],
		[
			-3081,
			-2254
		]
	],
	[
		[
			6057502,
			7483300
		],
		[
			-3254,
			1692
		],
		[
			-511,
			1660
		],
		[
			-2896,
			219
		],
		[
			-4882,
			2178
		],
		[
			-3833,
			1710
		]
	],
	[
		[
			6112074,
			7475725
		],
		[
			2294,
			-1623
		],
		[
			161,
			-9149
		],
		[
			2753,
			-2969
		],
		[
			-844,
			-1927
		]
	],
	[
		[
			6116438,
			7460057
		],
		[
			-1695,
			-1987
		],
		[
			-3941,
			-224
		],
		[
			-2453,
			-1538
		],
		[
			-706,
			-443
		],
		[
			-3565,
			-161
		],
		[
			-2921,
			1022
		],
		[
			-366,
			-2114
		],
		[
			-2675,
			-1030
		],
		[
			-3607,
			-2993
		],
		[
			-1669,
			-1099
		],
		[
			-844,
			-556
		],
		[
			-1826,
			-1203
		],
		[
			-6917,
			-1156
		],
		[
			-2958,
			-2134
		],
		[
			-2879,
			-552
		],
		[
			-563,
			-1787
		],
		[
			933,
			-1915
		],
		[
			-687,
			-1648
		],
		[
			-5265,
			-1312
		],
		[
			-659,
			-1553
		],
		[
			-3577,
			-830
		],
		[
			-4307,
			902
		],
		[
			-1309,
			-2036
		],
		[
			-2822,
			1227
		],
		[
			-2977,
			-329
		],
		[
			-1284,
			2373
		],
		[
			-2853,
			1138
		],
		[
			-4662,
			-704
		],
		[
			-1425,
			552
		],
		[
			-710,
			275
		],
		[
			-2755,
			-1216
		]
	],
	[
		[
			6042494,
			7437026
		],
		[
			-10583,
			1479
		],
		[
			-2435,
			2473
		],
		[
			-957,
			3775
		],
		[
			-3065,
			3046
		],
		[
			513,
			1135
		],
		[
			251,
			556
		],
		[
			482,
			1067
		],
		[
			-2224,
			-464
		],
		[
			-3481,
			805
		],
		[
			-2387,
			1717
		],
		[
			-2188,
			1575
		],
		[
			2188,
			645
		],
		[
			3739,
			1102
		],
		[
			311,
			1739
		],
		[
			-4050,
			2511
		],
		[
			-3456,
			2144
		],
		[
			-10111,
			3059
		]
	],
	[
		[
			6005041,
			7465390
		],
		[
			1220,
			1166
		],
		[
			-2156,
			1772
		]
	],
	[
		[
			6004105,
			7468328
		],
		[
			3625,
			1807
		],
		[
			4792,
			-1513
		],
		[
			6086,
			560
		],
		[
			3712,
			342
		]
	],
	[
		[
			6022320,
			7469524
		],
		[
			5800,
			-1676
		],
		[
			3081,
			1537
		],
		[
			5005,
			-840
		],
		[
			3729,
			1626
		]
	],
	[
		[
			6039935,
			7470171
		],
		[
			6024,
			-388
		],
		[
			5262,
			-340
		],
		[
			4433,
			1498
		],
		[
			-1888,
			770
		],
		[
			285,
			1293
		],
		[
			-1634,
			489
		],
		[
			-430,
			1379
		],
		[
			-4334,
			-727
		],
		[
			-1325,
			270
		],
		[
			-369,
			427
		],
		[
			-110,
			1684
		],
		[
			2201,
			3277
		],
		[
			-287,
			3603
		],
		[
			4792,
			-916
		],
		[
			4947,
			810
		]
	],
	[
		[
			6039935,
			7470171
		],
		[
			-597,
			2953
		],
		[
			-3266,
			-1841
		],
		[
			-3564,
			580
		],
		[
			-4754,
			151
		],
		[
			-9146,
			4183
		],
		[
			-617,
			282
		],
		[
			-2640,
			2844
		],
		[
			-1049,
			3214
		],
		[
			-2878,
			2657
		],
		[
			-2921,
			5481
		],
		[
			-3352,
			2256
		],
		[
			-349,
			1613
		],
		[
			6955,
			8520
		],
		[
			6015,
			5098
		],
		[
			836,
			135
		],
		[
			948,
			152
		]
	],
	[
		[
			6004105,
			7468328
		],
		[
			-1360,
			2909
		],
		[
			-6621,
			4478
		],
		[
			-721,
			1502
		],
		[
			2594,
			1621
		],
		[
			12081,
			3879
		],
		[
			1391,
			-355
		],
		[
			3787,
			-6354
		],
		[
			3352,
			-3077
		],
		[
			3712,
			-3407
		]
	],
	[
		[
			6293931,
			7554459
		],
		[
			12268,
			-4039
		],
		[
			-1649,
			-1098
		],
		[
			-6118,
			-1157
		],
		[
			-1865,
			-1364
		],
		[
			-2352,
			-3196
		],
		[
			269,
			-4427
		],
		[
			6152,
			-10917
		],
		[
			23970,
			-21403
		],
		[
			2872,
			-4657
		],
		[
			-8495,
			985
		],
		[
			-8886,
			-1231
		],
		[
			-4449,
			442
		],
		[
			-11436,
			6358
		],
		[
			-4046,
			3273
		],
		[
			-2631,
			729
		],
		[
			-1821,
			196
		],
		[
			-1250,
			-64
		],
		[
			-2488,
			-336
		],
		[
			-2189,
			-659
		],
		[
			-2551,
			-627
		],
		[
			-623,
			-154
		],
		[
			-1096,
			-106
		],
		[
			-2255,
			-349
		],
		[
			-2774,
			-551
		],
		[
			-1631,
			267
		],
		[
			-2357,
			-35
		],
		[
			-4996,
			-730
		],
		[
			-1367,
			20
		],
		[
			-873,
			218
		],
		[
			-2800,
			1420
		],
		[
			-504,
			255
		],
		[
			-2344,
			256
		],
		[
			-2132,
			-306
		],
		[
			-1136,
			-205
		],
		[
			-4992,
			-2232
		],
		[
			-17,
			-1874
		],
		[
			910,
			-63
		],
		[
			584,
			1403
		],
		[
			6445,
			1476
		],
		[
			5995,
			-2912
		],
		[
			1767,
			415
		],
		[
			2244,
			-867
		],
		[
			4764,
			1772
		],
		[
			17450,
			1594
		],
		[
			2113,
			-892
		],
		[
			7288,
			-6584
		],
		[
			9710,
			-5016
		],
		[
			5118,
			-963
		],
		[
			7187,
			-5291
		]
	],
	[
		[
			6316914,
			7491233
		],
		[
			-8216,
			-966
		],
		[
			-1076,
			-2264
		],
		[
			-2849,
			-2328
		],
		[
			1787,
			-1900
		],
		[
			-4184,
			-1432
		],
		[
			-1760,
			781
		],
		[
			-1609,
			2169
		],
		[
			-4569,
			2299
		],
		[
			135,
			2256
		],
		[
			-1065,
			2178
		],
		[
			2391,
			3418
		],
		[
			-2903,
			312
		],
		[
			-7887,
			4369
		],
		[
			-419,
			-1961
		],
		[
			-3541,
			-3605
		],
		[
			-6915,
			411
		],
		[
			-2307,
			900
		],
		[
			-5525,
			-2657
		],
		[
			364,
			-652
		],
		[
			5071,
			629
		],
		[
			2567,
			-2209
		],
		[
			-7221,
			-1629
		],
		[
			-397,
			-3089
		],
		[
			-808,
			-457
		],
		[
			-13145,
			-1291
		],
		[
			-978,
			1311
		],
		[
			473,
			3975
		],
		[
			-7799,
			623
		],
		[
			-3202,
			257
		],
		[
			-2171,
			-1900
		],
		[
			-3722,
			-4576
		]
	],
	[
		[
			6235434,
			7484205
		],
		[
			-2102,
			446
		],
		[
			-5144,
			650
		],
		[
			-507,
			-425
		],
		[
			-4125,
			-148
		],
		[
			-311,
			548
		],
		[
			1785,
			981
		],
		[
			-2846,
			2249
		],
		[
			-560,
			442
		]
	],
	[
		[
			6221624,
			7488948
		],
		[
			-1107,
			1427
		],
		[
			435,
			1117
		],
		[
			4537,
			861
		],
		[
			-66,
			4500
		],
		[
			3226,
			5616
		],
		[
			-8143,
			2053
		],
		[
			-10190,
			-218
		]
	],
	[
		[
			6210316,
			7504304
		],
		[
			-2971,
			681
		],
		[
			-1187,
			1147
		],
		[
			2145,
			2519
		],
		[
			7794,
			-80
		],
		[
			6424,
			2349
		],
		[
			-2885,
			2327
		],
		[
			2545,
			3363
		],
		[
			288,
			3163
		],
		[
			-1576,
			4359
		],
		[
			1938,
			2643
		],
		[
			-1701,
			1692
		],
		[
			1675,
			2636
		],
		[
			-761,
			4770
		],
		[
			610,
			1978
		],
		[
			4819,
			2407
		],
		[
			3657,
			530
		],
		[
			10096,
			742
		],
		[
			1533,
			-1610
		],
		[
			1770,
			-132
		],
		[
			1856,
			-138
		],
		[
			430,
			2162
		],
		[
			2730,
			1055
		],
		[
			1040,
			2346
		],
		[
			1321,
			473
		],
		[
			3112,
			1115
		],
		[
			2995,
			1073
		],
		[
			4868,
			-460
		],
		[
			5659,
			2162
		],
		[
			1309,
			1784
		],
		[
			2233,
			1129
		],
		[
			72,
			2536
		],
		[
			1485,
			1039
		],
		[
			2447,
			85
		],
		[
			2266,
			-2109
		],
		[
			4531,
			-493
		],
		[
			2110,
			-1058
		],
		[
			7422,
			9
		],
		[
			1516,
			1961
		]
	],
	[
		[
			6236085,
			7594644
		],
		[
			4953,
			-2991
		],
		[
			2862,
			142
		],
		[
			629,
			-363
		],
		[
			4839,
			-2791
		],
		[
			9147,
			-2292
		],
		[
			4086,
			-2895
		],
		[
			-489,
			-1733
		],
		[
			663,
			-1142
		],
		[
			4544,
			-1840
		],
		[
			2315,
			-2207
		],
		[
			3457,
			-4367
		],
		[
			1622,
			-4068
		],
		[
			1525,
			-905
		],
		[
			185,
			-1669
		],
		[
			2740,
			-2342
		],
		[
			7654,
			-2440
		],
		[
			1219,
			-3825
		],
		[
			5895,
			-2457
		]
	],
	[
		[
			6210316,
			7504304
		],
		[
			-6725,
			-928
		],
		[
			-2016,
			-1130
		],
		[
			-7439,
			560
		],
		[
			-2239,
			-1996
		]
	],
	[
		[
			6191897,
			7500810
		],
		[
			-1622,
			2332
		],
		[
			43,
			1700
		],
		[
			561,
			1812
		],
		[
			2544,
			2352
		],
		[
			-4410,
			1390
		],
		[
			-4036,
			2476
		],
		[
			-1011,
			883
		],
		[
			1751,
			1484
		],
		[
			-1738,
			1840
		],
		[
			132,
			3531
		],
		[
			-3130,
			3382
		],
		[
			2632,
			1493
		],
		[
			-382,
			3108
		],
		[
			1818,
			1703
		],
		[
			-1222,
			1858
		],
		[
			-3063,
			968
		],
		[
			-5256,
			-346
		],
		[
			-6039,
			-3342
		],
		[
			-4276,
			662
		],
		[
			-12463,
			-929
		],
		[
			-8101,
			1245
		],
		[
			-2170,
			-692
		],
		[
			-8376,
			2791
		],
		[
			-4512,
			-448
		],
		[
			-2761,
			2607
		],
		[
			-6502,
			-496
		],
		[
			-1403,
			-433
		],
		[
			-933,
			-2270
		],
		[
			1692,
			-2017
		],
		[
			-2205,
			-847
		],
		[
			-285,
			-2546
		],
		[
			-4000,
			-357
		],
		[
			-2611,
			-1994
		]
	],
	[
		[
			6221624,
			7488948
		],
		[
			-4673,
			-3042
		],
		[
			-1544,
			-3369
		],
		[
			-1902,
			-1093
		],
		[
			-5976,
			-123
		],
		[
			-2123,
			-823
		],
		[
			-3320,
			-2766
		],
		[
			-1140,
			-3205
		],
		[
			-1584,
			-297
		],
		[
			1157,
			-1480
		],
		[
			-5312,
			-2909
		],
		[
			-5384,
			-879
		],
		[
			-3492,
			1159
		],
		[
			-1216,
			1582
		],
		[
			-2406,
			-126
		],
		[
			-1542,
			-1103
		],
		[
			-3614,
			-87
		],
		[
			-1212,
			459
		],
		[
			-456,
			1489
		],
		[
			-1607,
			369
		],
		[
			-3715,
			-527
		],
		[
			-1921,
			-1618
		],
		[
			-7291,
			-1291
		],
		[
			-4832,
			1227
		],
		[
			-1255,
			-667
		],
		[
			-2897,
			882
		],
		[
			2102,
			2752
		],
		[
			-5297,
			1919
		],
		[
			364,
			2352
		],
		[
			-8287,
			3177
		],
		[
			-918,
			3877
		],
		[
			-5302,
			2008
		],
		[
			294,
			2004
		],
		[
			-2366,
			2009
		]
	],
	[
		[
			6132957,
			7490808
		],
		[
			1980,
			1409
		],
		[
			5287,
			409
		],
		[
			3133,
			1982
		],
		[
			4557,
			-512
		],
		[
			5585,
			1067
		],
		[
			3037,
			4253
		],
		[
			5222,
			-1139
		],
		[
			5186,
			75
		],
		[
			3416,
			1353
		],
		[
			4466,
			-965
		],
		[
			2737,
			403
		],
		[
			2763,
			-2138
		],
		[
			4028,
			-632
		],
		[
			4937,
			1764
		],
		[
			2606,
			2673
		]
	],
	[
		[
			6132957,
			7490808
		],
		[
			-515,
			193
		],
		[
			-1480,
			-250
		],
		[
			-1767,
			1296
		],
		[
			-1386,
			642
		],
		[
			-786,
			-65
		],
		[
			-1143,
			-509
		],
		[
			-730,
			400
		],
		[
			-932,
			23
		]
	],
	[
		[
			6235434,
			7484205
		],
		[
			-1878,
			-1467
		],
		[
			-79,
			-1012
		],
		[
			2596,
			-1712
		],
		[
			1037,
			-1764
		],
		[
			-618,
			-3008
		],
		[
			2373,
			-1032
		],
		[
			90,
			-2452
		],
		[
			1317,
			-2769
		],
		[
			-2430,
			-1651
		],
		[
			596,
			-1678
		],
		[
			-665,
			-2080
		],
		[
			3215,
			-399
		],
		[
			1698,
			1069
		],
		[
			1843,
			139
		],
		[
			1344,
			101
		],
		[
			2410,
			-1939
		],
		[
			-902,
			-1835
		],
		[
			-2852,
			-661
		],
		[
			-2511,
			-582
		],
		[
			-2671,
			-2358
		],
		[
			3955,
			-1119
		],
		[
			-593,
			-6506
		],
		[
			-51,
			-556
		],
		[
			123,
			-583
		],
		[
			1748,
			-1931
		],
		[
			652,
			-714
		],
		[
			-652,
			-236
		],
		[
			-3840,
			-1468
		],
		[
			-1822,
			-2113
		],
		[
			-2909,
			-1548
		],
		[
			-443,
			-1471
		],
		[
			1839,
			-2481
		]
	],
	[
		[
			6237354,
			7436389
		],
		[
			-1750,
			-50
		],
		[
			-1398,
			-1106
		],
		[
			-357,
			-758
		],
		[
			-670,
			268
		],
		[
			-4336,
			-5660
		],
		[
			-7132,
			-2746
		],
		[
			204,
			-968
		],
		[
			-1056,
			-1212
		],
		[
			-2910,
			-1394
		],
		[
			-1798,
			-2014
		],
		[
			-7050,
			-528
		],
		[
			-2049,
			751
		],
		[
			-11465,
			-3077
		],
		[
			-2903,
			237
		],
		[
			-3132,
			1306
		],
		[
			-1310,
			1611
		],
		[
			145,
			4984
		],
		[
			-3969,
			188
		],
		[
			-7034,
			-2835
		],
		[
			-3645,
			-4053
		],
		[
			-2666,
			-555
		],
		[
			-3395,
			-3532
		],
		[
			-7839,
			-518
		],
		[
			-633,
			-985
		],
		[
			1141,
			-1760
		],
		[
			-274,
			-1067
		],
		[
			-4648,
			-2177
		]
	],
	[
		[
			6155425,
			7408739
		],
		[
			-5048,
			67
		],
		[
			-1369,
			2038
		],
		[
			-3921,
			1231
		],
		[
			3454,
			4773
		],
		[
			4600,
			116
		],
		[
			2746,
			1713
		],
		[
			-1415,
			1697
		],
		[
			1308,
			1751
		],
		[
			-4832,
			2097
		],
		[
			-8793,
			659
		],
		[
			-4715,
			1948
		],
		[
			-4672,
			390
		],
		[
			-2889,
			3797
		],
		[
			2070,
			2172
		],
		[
			817,
			3068
		],
		[
			1106,
			477
		],
		[
			4541,
			1953
		],
		[
			645,
			1603
		],
		[
			119,
			1853
		],
		[
			-1980,
			1383
		],
		[
			-1044,
			3074
		],
		[
			407,
			2335
		],
		[
			-2950,
			3170
		],
		[
			-488,
			2379
		],
		[
			-5182,
			3477
		],
		[
			-8674,
			2879
		],
		[
			-2828,
			-782
		]
	],
	[
		[
			6265679,
			7402720
		],
		[
			20,
			7
		]
	],
	[
		[
			6265699,
			7402727
		],
		[
			2159,
			-1796
		],
		[
			-2094,
			-3341
		],
		[
			343,
			-657
		],
		[
			1534,
			-702
		],
		[
			5997,
			339
		],
		[
			-33,
			-2242
		],
		[
			1147,
			-1254
		],
		[
			-388,
			-1844
		],
		[
			5093,
			-2061
		],
		[
			1242,
			-3737
		],
		[
			-3191,
			-3949
		],
		[
			-6740,
			-4188
		],
		[
			-4892,
			-1341
		],
		[
			-378,
			-1073
		],
		[
			1945,
			-2163
		],
		[
			960,
			-435
		],
		[
			241,
			-1291
		]
	],
	[
		[
			6268644,
			7370992
		],
		[
			-4807,
			-876
		],
		[
			-2453,
			-2257
		],
		[
			395,
			-2059
		],
		[
			-982,
			-1251
		],
		[
			-2255,
			-247
		],
		[
			-4067,
			2197
		],
		[
			-4300,
			-1065
		],
		[
			949,
			-3955
		],
		[
			-2758,
			-3280
		]
	],
	[
		[
			6248366,
			7358199
		],
		[
			-1886,
			95
		],
		[
			-1846,
			-441
		],
		[
			-105,
			-56
		],
		[
			-4328,
			-2294
		],
		[
			-2602,
			11
		],
		[
			-5993,
			-3647
		],
		[
			-4408,
			-691
		],
		[
			-294,
			-984
		],
		[
			4840,
			-4176
		],
		[
			-2095,
			-1100
		],
		[
			-1164,
			-1594
		],
		[
			-438,
			-601
		],
		[
			-3673,
			-1555
		],
		[
			-1711,
			1413
		],
		[
			-402,
			743
		],
		[
			-1708,
			3160
		],
		[
			-3219,
			-705
		],
		[
			-4546,
			315
		],
		[
			-734,
			-853
		],
		[
			-8166,
			-1917
		],
		[
			-565,
			-133
		],
		[
			-1520,
			-2161
		],
		[
			1567,
			-789
		],
		[
			-2048,
			-1712
		],
		[
			-5067,
			-1776
		],
		[
			-9001,
			491
		],
		[
			-415,
			3014
		],
		[
			-2067,
			3066
		],
		[
			58,
			3714
		],
		[
			4422,
			1995
		],
		[
			-7266,
			6513
		]
	],
	[
		[
			6181986,
			7355544
		],
		[
			1860,
			1976
		],
		[
			5429,
			1279
		],
		[
			-1737,
			3244
		],
		[
			5647,
			2967
		],
		[
			-966,
			3004
		],
		[
			1674,
			2016
		],
		[
			-4818,
			1468
		],
		[
			1218,
			1220
		],
		[
			7153,
			1772
		],
		[
			-2428,
			3880
		],
		[
			-10552,
			9676
		],
		[
			-20897,
			7527
		],
		[
			-3952,
			2735
		],
		[
			-1305,
			3560
		],
		[
			2077,
			1298
		],
		[
			196,
			1204
		],
		[
			-4370,
			3053
		]
	],
	[
		[
			6156215,
			7407423
		],
		[
			-790,
			1316
		]
	],
	[
		[
			6237354,
			7436389
		],
		[
			276,
			-1625
		],
		[
			1777,
			-1180
		],
		[
			-1378,
			-4425
		],
		[
			6500,
			-6870
		],
		[
			835,
			-883
		],
		[
			1253,
			-1324
		],
		[
			2208,
			-5475
		],
		[
			8732,
			-753
		],
		[
			3166,
			-1306
		],
		[
			854,
			-1521
		],
		[
			10407,
			-2062
		],
		[
			-266,
			-1616
		],
		[
			-2221,
			-1443
		],
		[
			-5683,
			-1290
		],
		[
			1865,
			-1896
		]
	],
	[
		[
			6341772,
			7419708
		],
		[
			-1637,
			-2451
		],
		[
			1077,
			-1576
		],
		[
			-6963,
			-3146
		],
		[
			-683,
			-12
		],
		[
			-1221,
			-23
		],
		[
			-6751,
			-815
		],
		[
			-570,
			9
		],
		[
			-470,
			-317
		],
		[
			-471,
			-318
		],
		[
			-2431,
			333
		],
		[
			-1669,
			-869
		],
		[
			-326,
			-430
		],
		[
			-6,
			-1285
		],
		[
			38,
			-844
		],
		[
			409,
			-493
		],
		[
			-115,
			-670
		],
		[
			-2651,
			-1616
		],
		[
			-2156,
			-138
		],
		[
			-3133,
			-199
		],
		[
			-2824,
			1141
		],
		[
			-4460,
			-273
		],
		[
			-3874,
			-1682
		],
		[
			-4885,
			203
		],
		[
			-1926,
			1064
		],
		[
			-4736,
			-1241
		],
		[
			-6845,
			2036
		],
		[
			-7927,
			-2489
		],
		[
			-4343,
			304
		],
		[
			-4524,
			-1184
		]
	],
	[
		[
			6316914,
			7491233
		],
		[
			1954,
			-917
		],
		[
			3883,
			-149
		],
		[
			1213,
			-1720
		],
		[
			1630,
			-543
		],
		[
			1784,
			692
		],
		[
			1412,
			-1199
		],
		[
			1932,
			-132
		],
		[
			2844,
			-3256
		],
		[
			4290,
			-4911
		],
		[
			9465,
			-13660
		],
		[
			1515,
			-3683
		],
		[
			1777,
			-4318
		],
		[
			-1660,
			-7947
		],
		[
			-216,
			-1035
		],
		[
			-3616,
			-1031
		],
		[
			-11555,
			-6063
		],
		[
			-1737,
			-912
		],
		[
			-4921,
			-3716
		],
		[
			-1314,
			-993
		],
		[
			-2862,
			-3585
		],
		[
			-3151,
			-1750
		],
		[
			-685,
			-1089
		],
		[
			6698,
			-1611
		],
		[
			6653,
			-1702
		],
		[
			1319,
			-1401
		],
		[
			3008,
			-3196
		],
		[
			621,
			-660
		],
		[
			4577,
			-1038
		]
	],
	[
		[
			6181986,
			7355544
		],
		[
			-1718,
			-2888
		],
		[
			-3035,
			-1543
		],
		[
			944,
			-2388
		],
		[
			-1653,
			-205
		],
		[
			-4790,
			1781
		],
		[
			-4889,
			-2420
		],
		[
			-2222,
			-4559
		],
		[
			-2428,
			-4983
		],
		[
			-8089,
			-3593
		],
		[
			-5503,
			2699
		]
	],
	[
		[
			6148603,
			7337445
		],
		[
			4367,
			4689
		],
		[
			-6757,
			628
		],
		[
			-306,
			560
		],
		[
			-1238,
			2262
		],
		[
			-2035,
			371
		],
		[
			-662,
			1989
		],
		[
			-1811,
			356
		],
		[
			-1748,
			1655
		],
		[
			-2649,
			-1043
		],
		[
			-1863,
			-1936
		],
		[
			-5585,
			-1206
		],
		[
			896,
			-1712
		],
		[
			1103,
			-736
		],
		[
			1941,
			-1297
		],
		[
			-1289,
			-2453
		],
		[
			-7004,
			3347
		],
		[
			-2255,
			-1055
		],
		[
			-2778,
			183
		],
		[
			-2186,
			144
		],
		[
			-5827,
			-2982
		],
		[
			-2568,
			305
		],
		[
			-4387,
			520
		],
		[
			-2582,
			-1088
		],
		[
			-938,
			447
		],
		[
			130,
			801
		],
		[
			2653,
			2418
		],
		[
			-2771,
			710
		],
		[
			-1112,
			284
		],
		[
			-689,
			-284
		],
		[
			-1175,
			-487
		],
		[
			-743,
			-2356
		],
		[
			1805,
			-1863
		],
		[
			-4031,
			-353
		],
		[
			-1834,
			-406
		],
		[
			-2851,
			-2300
		],
		[
			-4684,
			23
		],
		[
			-2205,
			891
		],
		[
			-248,
			2250
		],
		[
			-2647,
			2112
		],
		[
			-3608,
			-829
		],
		[
			-1434,
			-1535
		],
		[
			-1507,
			-292
		],
		[
			-1613,
			341
		],
		[
			-688,
			1486
		],
		[
			-4057,
			647
		],
		[
			-813,
			-1093
		],
		[
			1252,
			-1435
		],
		[
			-1657,
			-1427
		],
		[
			-383,
			-1904
		],
		[
			2882,
			-1014
		],
		[
			2380,
			-5220
		],
		[
			-4041,
			-1616
		],
		[
			-2326,
			21
		],
		[
			-2429,
			-2059
		],
		[
			-6883,
			-900
		],
		[
			-4960,
			-2693
		]
	],
	[
		[
			6050155,
			7321311
		],
		[
			-4196,
			1196
		],
		[
			-2666,
			760
		],
		[
			-2240,
			-564
		],
		[
			-3330,
			2525
		],
		[
			-159,
			1627
		],
		[
			-10141,
			5036
		],
		[
			-8954,
			-2529
		],
		[
			-994,
			1701
		],
		[
			-2698,
			321
		],
		[
			-1996,
			2763
		],
		[
			-4341,
			2864
		],
		[
			-2587,
			3637
		],
		[
			-53,
			2674
		],
		[
			-2435,
			2884
		],
		[
			603,
			3675
		],
		[
			-1496,
			1795
		],
		[
			3549,
			2191
		],
		[
			-1928,
			2009
		],
		[
			4641,
			6301
		],
		[
			3035,
			1897
		],
		[
			4508,
			1309
		],
		[
			-1612,
			1825
		],
		[
			389,
			2182
		],
		[
			995,
			1635
		],
		[
			3655,
			2597
		]
	],
	[
		[
			6019704,
			7373622
		],
		[
			4359,
			3222
		],
		[
			6971,
			1164
		],
		[
			3113,
			-630
		],
		[
			2387,
			-2698
		],
		[
			4298,
			-395
		],
		[
			-766,
			-2680
		],
		[
			3375,
			-1557
		],
		[
			2518,
			59
		],
		[
			2947,
			2267
		],
		[
			4468,
			-2982
		],
		[
			5352,
			712
		],
		[
			568,
			1872
		],
		[
			1980,
			1007
		],
		[
			5169,
			-1164
		],
		[
			1333,
			3276
		],
		[
			4921,
			442
		],
		[
			2179,
			1549
		],
		[
			4741,
			325
		],
		[
			-1110,
			1886
		],
		[
			569,
			2776
		],
		[
			4264,
			467
		],
		[
			3100,
			1689
		],
		[
			-174,
			-739
		],
		[
			1692,
			-785
		],
		[
			6551,
			-1060
		],
		[
			3594,
			-512
		],
		[
			590,
			584
		]
	],
	[
		[
			6098693,
			7381717
		],
		[
			2456,
			-266
		],
		[
			4192,
			1668
		],
		[
			1891,
			-1069
		],
		[
			1117,
			228
		],
		[
			2240,
			457
		],
		[
			1360,
			-1065
		],
		[
			1530,
			295
		],
		[
			1975,
			-1816
		],
		[
			-2597,
			-1136
		],
		[
			2173,
			-1985
		],
		[
			3900,
			349
		],
		[
			2909,
			260
		],
		[
			2108,
			1547
		],
		[
			4357,
			-14
		],
		[
			2315,
			-531
		],
		[
			-1450,
			-1421
		],
		[
			-690,
			-1236
		],
		[
			-504,
			-526
		],
		[
			5977,
			-189
		],
		[
			3250,
			-1511
		],
		[
			590,
			1295
		],
		[
			2769,
			-587
		],
		[
			2088,
			1279
		],
		[
			962,
			-1259
		],
		[
			1818,
			-447
		],
		[
			2009,
			1014
		],
		[
			2756,
			-425
		],
		[
			2212,
			703
		],
		[
			2668,
			2299
		],
		[
			3403,
			-682
		],
		[
			1681,
			-1612
		],
		[
			1972,
			1079
		],
		[
			6516,
			119
		],
		[
			3042,
			1682
		],
		[
			751,
			3570
		],
		[
			-3905,
			2666
		],
		[
			-4077,
			-579
		],
		[
			-3414,
			1082
		],
		[
			-5413,
			-665
		],
		[
			-2042,
			556
		],
		[
			-2767,
			-1777
		],
		[
			-3207,
			-619
		],
		[
			-7787,
			7545
		],
		[
			1626,
			1389
		],
		[
			-5082,
			6101
		]
	],
	[
		[
			6136371,
			7397483
		],
		[
			8122,
			19
		],
		[
			5363,
			1107
		],
		[
			1500,
			1767
		],
		[
			-312,
			4062
		],
		[
			5171,
			2985
		]
	],
	[
		[
			6136371,
			7397483
		],
		[
			-1258,
			1208
		],
		[
			-2901,
			764
		],
		[
			-4290,
			-2264
		],
		[
			-5453,
			7468
		],
		[
			-2642,
			6
		],
		[
			-897,
			-1140
		],
		[
			-438,
			-557
		],
		[
			-8385,
			-2219
		],
		[
			-1758,
			-444
		],
		[
			-1169,
			-296
		],
		[
			-2413,
			2056
		],
		[
			-2388,
			281
		],
		[
			-6362,
			-3109
		],
		[
			-833,
			-2397
		],
		[
			1665,
			-675
		],
		[
			1033,
			-1764
		],
		[
			3947,
			-297
		],
		[
			-1798,
			-3749
		],
		[
			-3284,
			-1057
		],
		[
			1946,
			-7581
		]
	],
	[
		[
			6019704,
			7373622
		],
		[
			-11097,
			340
		],
		[
			-14207,
			6494
		],
		[
			-1997,
			1921
		],
		[
			433,
			1885
		],
		[
			2814,
			1830
		],
		[
			8656,
			2345
		],
		[
			6581,
			526
		],
		[
			3472,
			2409
		],
		[
			754,
			1691
		],
		[
			-2213,
			2531
		],
		[
			-5278,
			-1633
		],
		[
			-2325,
			-1786
		],
		[
			-2129,
			114
		],
		[
			-973,
			4783
		],
		[
			4317,
			2675
		],
		[
			6354,
			10427
		],
		[
			4796,
			1197
		],
		[
			-4932,
			3762
		],
		[
			-4551,
			894
		],
		[
			-2664,
			1650
		],
		[
			-5976,
			934
		],
		[
			-572,
			2415
		],
		[
			2321,
			4405
		],
		[
			-860,
			2281
		],
		[
			3000,
			696
		],
		[
			2054,
			3083
		],
		[
			5587,
			113
		],
		[
			3251,
			2576
		],
		[
			3247,
			1045
		],
		[
			4434,
			-2443
		],
		[
			3986,
			947
		],
		[
			4422,
			-698
		],
		[
			5049,
			-4481
		],
		[
			3930,
			2358
		],
		[
			2774,
			544
		],
		[
			332,
			5574
		]
	],
	[
		[
			6482724,
			7412965
		],
		[
			2452,
			-2593
		],
		[
			4174,
			-8311
		],
		[
			-890,
			-7086
		],
		[
			770,
			-3069
		],
		[
			1439,
			-5594
		],
		[
			-1910,
			-3209
		],
		[
			-1794,
			-5987
		],
		[
			-4032,
			-6374
		],
		[
			-4100,
			-4460
		],
		[
			-1730,
			-8770
		],
		[
			-4571,
			-9749
		],
		[
			-9509,
			-3561
		],
		[
			-4982,
			-4867
		],
		[
			-3655,
			-1314
		],
		[
			-1704,
			-2130
		],
		[
			-4475,
			-2535
		],
		[
			-3572,
			1692
		],
		[
			-2685,
			3001
		],
		[
			-7653,
			2236
		],
		[
			231,
			-894
		],
		[
			6959,
			-2176
		],
		[
			867,
			-2295
		],
		[
			-7261,
			-503
		],
		[
			-4212,
			708
		],
		[
			-10067,
			-1280
		]
	],
	[
		[
			6420814,
			7333845
		],
		[
			-7915,
			1149
		],
		[
			-1862,
			1201
		],
		[
			-5933,
			-118
		],
		[
			-5037,
			-1131
		],
		[
			-6434,
			270
		],
		[
			-4181,
			4295
		],
		[
			-425,
			2078
		],
		[
			-3815,
			1058
		],
		[
			749,
			3236
		],
		[
			-2264,
			1268
		],
		[
			-4957,
			12
		],
		[
			-10361,
			-2684
		],
		[
			-1234,
			-27
		],
		[
			-2160,
			-48
		],
		[
			-3025,
			1927
		],
		[
			-6315,
			-1085
		],
		[
			-1448,
			-588
		],
		[
			-953,
			-986
		],
		[
			694,
			-627
		],
		[
			212,
			-703
		],
		[
			-1466,
			473
		],
		[
			-2678,
			862
		],
		[
			-2943,
			2559
		],
		[
			-3954,
			1564
		],
		[
			-2764,
			-1154
		],
		[
			-4425,
			1140
		],
		[
			-2354,
			-3121
		],
		[
			-4620,
			-847
		],
		[
			-2486,
			545
		],
		[
			-901,
			-1041
		],
		[
			-1778,
			-3065
		],
		[
			-1788,
			-982
		]
	],
	[
		[
			6321993,
			7339275
		],
		[
			-2649,
			4047
		],
		[
			-504,
			393
		],
		[
			-2859,
			90
		],
		[
			-2722,
			1042
		],
		[
			-4012,
			-1525
		],
		[
			-5982,
			-2355
		],
		[
			-2409,
			2355
		],
		[
			-809,
			791
		],
		[
			-595,
			2638
		],
		[
			884,
			1844
		],
		[
			87,
			3941
		],
		[
			-7432,
			740
		],
		[
			28,
			1528
		],
		[
			-3350,
			1462
		],
		[
			533,
			867
		],
		[
			402,
			761
		],
		[
			-1869,
			1615
		],
		[
			-3041,
			635
		],
		[
			393,
			2407
		],
		[
			-3947,
			391
		],
		[
			-1642,
			-1017
		],
		[
			-2179,
			256
		],
		[
			-1114,
			4420
		],
		[
			-4320,
			868
		],
		[
			-1509,
			2265
		],
		[
			-2732,
			1258
		]
	],
	[
		[
			6341772,
			7419708
		],
		[
			5366,
			357
		],
		[
			4762,
			-1368
		],
		[
			2995,
			2709
		],
		[
			4175,
			2030
		],
		[
			4439,
			8690
		],
		[
			3573,
			2925
		],
		[
			3058,
			960
		],
		[
			11487,
			-40
		],
		[
			3961,
			993
		],
		[
			21901,
			-1793
		],
		[
			3923,
			197
		],
		[
			1596,
			1044
		],
		[
			1710,
			-927
		],
		[
			5543,
			-130
		],
		[
			24896,
			-3571
		],
		[
			13755,
			-5239
		],
		[
			9677,
			-5139
		],
		[
			7513,
			-4017
		],
		[
			6622,
			-4424
		]
	],
	[
		[
			6321993,
			7339275
		],
		[
			502,
			-2199
		],
		[
			3099,
			-1020
		],
		[
			1867,
			-4821
		],
		[
			276,
			-3721
		],
		[
			5369,
			538
		],
		[
			460,
			-929
		],
		[
			731,
			-1475
		],
		[
			-731,
			-397
		],
		[
			-1130,
			-613
		],
		[
			-913,
			-2113
		],
		[
			187,
			-2139
		],
		[
			-1363,
			-1522
		],
		[
			-4753,
			-1557
		],
		[
			-7535,
			-1281
		],
		[
			-1866,
			-1308
		],
		[
			-2276,
			-2433
		],
		[
			-572,
			-3296
		],
		[
			643,
			-2205
		]
	],
	[
		[
			6313988,
			7306784
		],
		[
			-9745,
			1032
		],
		[
			-5240,
			-509
		],
		[
			-2032,
			-1751
		]
	],
	[
		[
			6296971,
			7305556
		],
		[
			-12237,
			-3225
		],
		[
			-1509,
			230
		],
		[
			-8198,
			-2472
		],
		[
			-5693,
			22
		],
		[
			-3580,
			1475
		],
		[
			-634,
			-2921
		]
	],
	[
		[
			6265120,
			7298665
		],
		[
			-1945,
			459
		],
		[
			-1700,
			3057
		],
		[
			360,
			2292
		],
		[
			2399,
			1823
		],
		[
			-3524,
			862
		],
		[
			-1454,
			2817
		],
		[
			180,
			2038
		],
		[
			-3166,
			1787
		],
		[
			-5285,
			402
		],
		[
			-2609,
			1114
		],
		[
			-2189,
			3700
		],
		[
			-1658,
			834
		],
		[
			-1864,
			937
		],
		[
			-1704,
			1931
		],
		[
			3568,
			1551
		],
		[
			5191,
			-4012
		],
		[
			6958,
			-519
		],
		[
			3138,
			1629
		],
		[
			1043,
			606
		],
		[
			-4040,
			3554
		],
		[
			-11463,
			3830
		],
		[
			556,
			1721
		],
		[
			3969,
			4541
		],
		[
			-607,
			2730
		],
		[
			1617,
			3470
		],
		[
			-1781,
			1503
		],
		[
			-466,
			393
		],
		[
			7355,
			6050
		],
		[
			-1461,
			1981
		],
		[
			-2898,
			1217
		],
		[
			356,
			3999
		],
		[
			-3630,
			1237
		]
	],
	[
		[
			6420814,
			7333845
		],
		[
			6120,
			-1046
		],
		[
			16956,
			367
		],
		[
			-4110,
			-5342
		],
		[
			3694,
			-1832
		],
		[
			326,
			-993
		],
		[
			-5986,
			-4712
		],
		[
			-10582,
			-3961
		],
		[
			-7618,
			-245
		],
		[
			-1836,
			2680
		],
		[
			-2924,
			1618
		],
		[
			-1792,
			2144
		],
		[
			-805,
			-2689
		],
		[
			2099,
			-1497
		],
		[
			-1111,
			-909
		],
		[
			-5038,
			-1220
		],
		[
			-3012,
			1069
		],
		[
			-5563,
			-443
		],
		[
			1722,
			-674
		],
		[
			739,
			-1803
		],
		[
			-1931,
			-1288
		],
		[
			-12487,
			-904
		],
		[
			-1023,
			-752
		],
		[
			4723,
			-2942
		],
		[
			4108,
			1915
		],
		[
			4971,
			203
		],
		[
			4604,
			2362
		],
		[
			3306,
			11
		],
		[
			1525,
			-1789
		],
		[
			9,
			-3740
		],
		[
			-2182,
			-5712
		],
		[
			-6657,
			-827
		],
		[
			-10746,
			1722
		],
		[
			-10776,
			-82
		],
		[
			-3602,
			-831
		],
		[
			15084,
			319
		],
		[
			10492,
			-2407
		],
		[
			6383,
			-195
		],
		[
			-1946,
			-2460
		],
		[
			-8648,
			-4193
		],
		[
			-3790,
			-1805
		],
		[
			-13134,
			1666
		],
		[
			-2521,
			-715
		],
		[
			502,
			-954
		],
		[
			-667,
			-520
		],
		[
			-5287,
			-875
		],
		[
			-5258,
			2020
		],
		[
			0,
			-582
		],
		[
			963,
			-1305
		],
		[
			-963,
			-93
		],
		[
			-6788,
			-658
		],
		[
			-1931,
			-3911
		],
		[
			-1894,
			-725
		],
		[
			-3848,
			-206
		],
		[
			-2755,
			-147
		],
		[
			-3110,
			1993
		],
		[
			-4032,
			-852
		],
		[
			-6560,
			2602
		]
	],
	[
		[
			6336227,
			7287700
		],
		[
			3520,
			3351
		],
		[
			1452,
			-346
		],
		[
			1232,
			1234
		],
		[
			5597,
			912
		],
		[
			-1544,
			2426
		],
		[
			-2430,
			416
		],
		[
			-3065,
			4138
		],
		[
			-2577,
			1578
		],
		[
			-3201,
			-220
		],
		[
			-1645,
			-37
		],
		[
			-4567,
			-102
		],
		[
			-3405,
			-1052
		],
		[
			-4328,
			-486
		],
		[
			-3042,
			1478
		],
		[
			-1266,
			1695
		],
		[
			-3004,
			634
		],
		[
			34,
			3465
		]
	],
	[
		[
			6393794,
			7310889
		],
		[
			-1354,
			-641
		],
		[
			-1128,
			763
		],
		[
			1979,
			658
		],
		[
			503,
			-780
		]
	],
	[
		[
			6306661,
			7290729
		],
		[
			669,
			119
		],
		[
			-99,
			-1372
		]
	],
	[
		[
			6307231,
			7289476
		],
		[
			-3206,
			295
		],
		[
			-1859,
			-2209
		],
		[
			-1985,
			-314
		],
		[
			-2246,
			-387
		],
		[
			-1328,
			-1304
		],
		[
			-1497,
			-267
		],
		[
			-1732,
			542
		],
		[
			-1229,
			1615
		],
		[
			-1357,
			142
		]
	],
	[
		[
			6290792,
			7287589
		],
		[
			-918,
			1247
		],
		[
			669,
			3140
		],
		[
			3036,
			-487
		],
		[
			2455,
			836
		],
		[
			-2198,
			1886
		],
		[
			4218,
			1728
		]
	],
	[
		[
			6298054,
			7295939
		],
		[
			2622,
			-445
		],
		[
			3709,
			-4574
		],
		[
			2276,
			-191
		]
	],
	[
		[
			6301142,
			7280621
		],
		[
			-3785,
			494
		],
		[
			-1569,
			1561
		],
		[
			-6010,
			-256
		]
	],
	[
		[
			6289778,
			7282420
		],
		[
			796,
			648
		],
		[
			-798,
			1747
		],
		[
			3117,
			1063
		]
	],
	[
		[
			6292893,
			7285878
		],
		[
			1531,
			-762
		],
		[
			1562,
			-88
		],
		[
			924,
			338
		],
		[
			1186,
			1339
		],
		[
			4243,
			497
		]
	],
	[
		[
			6302339,
			7287202
		],
		[
			-2053,
			-2109
		],
		[
			856,
			-4472
		]
	],
	[
		[
			6309064,
			7296475
		],
		[
			4645,
			-2542
		],
		[
			6701,
			828
		],
		[
			1605,
			-1624
		],
		[
			2861,
			-2874
		]
	],
	[
		[
			6324876,
			7290263
		],
		[
			-3365,
			-1666
		],
		[
			-3721,
			41
		],
		[
			-1672,
			768
		],
		[
			-1221,
			-254
		],
		[
			-1095,
			-1635
		],
		[
			-2152,
			1925
		],
		[
			-4419,
			34
		]
	],
	[
		[
			6298054,
			7295939
		],
		[
			1285,
			2794
		],
		[
			1965,
			982
		]
	],
	[
		[
			6301304,
			7299715
		],
		[
			9734,
			-455
		],
		[
			-1974,
			-2785
		]
	],
	[
		[
			6307350,
			7280747
		],
		[
			-35,
			-69
		],
		[
			-3093,
			243
		],
		[
			-1820,
			-993
		],
		[
			-1435,
			132
		],
		[
			175,
			561
		]
	],
	[
		[
			6302339,
			7287202
		],
		[
			1951,
			2339
		],
		[
			6965,
			-317
		],
		[
			1450,
			-1963
		]
	],
	[
		[
			6312705,
			7287261
		],
		[
			703,
			-1164
		],
		[
			2765,
			-310
		],
		[
			1899,
			-2929
		]
	],
	[
		[
			6318072,
			7282858
		],
		[
			574,
			-1603
		],
		[
			-3321,
			-781
		],
		[
			-7975,
			273
		]
	],
	[
		[
			5871971,
			7888131
		],
		[
			6520,
			-1353
		],
		[
			7540,
			119
		],
		[
			6895,
			1173
		],
		[
			4371,
			-564
		],
		[
			2134,
			1550
		],
		[
			1444,
			1048
		],
		[
			2550,
			532
		],
		[
			6763,
			3792
		],
		[
			474,
			1221
		],
		[
			-1372,
			1349
		],
		[
			1031,
			781
		],
		[
			4562,
			908
		],
		[
			7607,
			-1201
		],
		[
			6972,
			574
		],
		[
			7683,
			3254
		],
		[
			11886,
			3472
		],
		[
			2975,
			-197
		],
		[
			652,
			-2067
		],
		[
			3018,
			-381
		],
		[
			717,
			767
		],
		[
			-767,
			1905
		],
		[
			5764,
			467
		],
		[
			1284,
			104
		],
		[
			2260,
			1014
		],
		[
			2209,
			2398
		],
		[
			10047,
			1874
		],
		[
			8963,
			267
		],
		[
			15959,
			-4271
		],
		[
			10489,
			-1460
		],
		[
			6007,
			1559
		],
		[
			8736,
			2266
		],
		[
			7681,
			-810
		]
	],
	[
		[
			6035025,
			7908221
		],
		[
			1757,
			-4899
		],
		[
			-864,
			-4067
		],
		[
			11336,
			-7859
		],
		[
			-4871,
			-1978
		],
		[
			-12949,
			2583
		],
		[
			-2754,
			-706
		],
		[
			-3444,
			-2239
		],
		[
			-900,
			-586
		],
		[
			-5138,
			-1367
		],
		[
			-2644,
			-3124
		],
		[
			2216,
			-2271
		],
		[
			-2410,
			-2277
		],
		[
			3708,
			-2959
		],
		[
			470,
			-6328
		],
		[
			-1725,
			-2808
		],
		[
			-3931,
			-1597
		],
		[
			-5623,
			982
		],
		[
			-3929,
			-268
		],
		[
			-8616,
			-2470
		],
		[
			-5090,
			-4943
		],
		[
			-8942,
			-2904
		],
		[
			-310,
			-1398
		],
		[
			1363,
			-3446
		],
		[
			-3300,
			-2136
		],
		[
			-16062,
			-1706
		],
		[
			-983,
			64
		],
		[
			-4555,
			295
		],
		[
			-7394,
			-1401
		],
		[
			-3832,
			1154
		],
		[
			-3950,
			-1082
		],
		[
			-1069,
			-986
		],
		[
			-801,
			-7310
		],
		[
			-4776,
			-5887
		]
	],
	[
		[
			5935013,
			7832297
		],
		[
			-1360,
			-75
		],
		[
			-1083,
			195
		],
		[
			-1667,
			-945
		],
		[
			-965,
			-323
		],
		[
			-2159,
			-57
		],
		[
			-1192,
			170
		],
		[
			-980,
			-136
		],
		[
			-866,
			706
		],
		[
			-3010,
			539
		],
		[
			-584,
			950
		],
		[
			-868,
			-30
		],
		[
			-1697,
			-1361
		],
		[
			-349,
			-1257
		],
		[
			557,
			-1107
		],
		[
			-416,
			-778
		],
		[
			-1529,
			-710
		],
		[
			-1237,
			-220
		],
		[
			-1273,
			573
		],
		[
			-727,
			-531
		],
		[
			-692,
			-158
		],
		[
			-1271,
			867
		],
		[
			-679,
			-178
		],
		[
			-2329,
			-206
		],
		[
			-1237,
			62
		],
		[
			-1128,
			-191
		],
		[
			-2320,
			114
		],
		[
			-1330,
			345
		],
		[
			-1131,
			-46
		],
		[
			-1965,
			618
		],
		[
			-1145,
			157
		],
		[
			-744,
			344
		],
		[
			-715,
			-148
		],
		[
			-1709,
			-1522
		],
		[
			-201,
			-634
		],
		[
			651,
			-929
		],
		[
			-622,
			-570
		],
		[
			-1628,
			-358
		],
		[
			-1527,
			-1049
		],
		[
			-1947,
			-303
		],
		[
			-1056,
			187
		],
		[
			-1518,
			-513
		],
		[
			-1628,
			159
		],
		[
			-839,
			-131
		],
		[
			-1130,
			-793
		],
		[
			-1322,
			-546
		],
		[
			-408,
			-1204
		],
		[
			-669,
			-287
		],
		[
			-618,
			-10
		],
		[
			-1272,
			522
		],
		[
			-1843,
			237
		],
		[
			-1262,
			-1025
		],
		[
			-2604,
			-2116
		],
		[
			-1988,
			-1983
		],
		[
			-656,
			-360
		],
		[
			-2733,
			350
		],
		[
			-1786,
			1302
		],
		[
			-2283,
			1008
		],
		[
			-1185,
			326
		],
		[
			-3116,
			-3139
		],
		[
			-867,
			-408
		],
		[
			-2217,
			-1044
		],
		[
			100,
			-2251
		],
		[
			-1717,
			-2357
		],
		[
			-176,
			-1962
		],
		[
			-11568,
			-2500
		],
		[
			-60,
			-1601
		],
		[
			1121,
			-899
		],
		[
			7431,
			469
		],
		[
			676,
			-1014
		],
		[
			-329,
			-1762
		],
		[
			3664,
			-1964
		],
		[
			1719,
			-2192
		],
		[
			-8744,
			-1846
		],
		[
			-2356,
			-1230
		],
		[
			-281,
			-852
		],
		[
			2915,
			-1529
		],
		[
			-1964,
			-3348
		],
		[
			1960,
			-1164
		],
		[
			-178,
			-755
		],
		[
			-1408,
			-926
		],
		[
			-4746,
			-511
		],
		[
			-1392,
			-1942
		],
		[
			-3443,
			-624
		],
		[
			-4508,
			-2394
		],
		[
			-2427,
			-3435
		],
		[
			4890,
			-2860
		],
		[
			477,
			-2117
		]
	],
	[
		[
			5836595,
			7771081
		],
		[
			59,
			-921
		],
		[
			-4728,
			-2372
		],
		[
			4309,
			-2671
		],
		[
			475,
			-2099
		],
		[
			4775,
			-1013
		],
		[
			210,
			-1146
		],
		[
			-1384,
			-1830
		]
	],
	[
		[
			5840311,
			7759029
		],
		[
			-3559,
			-2076
		],
		[
			-4658,
			-5212
		],
		[
			-2915,
			-2015
		],
		[
			-1884,
			413
		],
		[
			-1237,
			3210
		],
		[
			-1553,
			743
		],
		[
			334,
			-3542
		],
		[
			1819,
			-2932
		],
		[
			-2096,
			-4165
		],
		[
			362,
			-4759
		],
		[
			-2525,
			-1463
		],
		[
			399,
			-3381
		],
		[
			-6215,
			-7893
		],
		[
			-4743,
			1075
		],
		[
			-4848,
			6521
		],
		[
			-983,
			-3010
		],
		[
			-1643,
			-714
		],
		[
			-8558,
			3491
		],
		[
			-2944,
			-4481
		],
		[
			1107,
			-5157
		],
		[
			-760,
			-1095
		],
		[
			-8313,
			1913
		],
		[
			-3449,
			4510
		],
		[
			34,
			7181
		],
		[
			1378,
			2503
		],
		[
			2690,
			3783
		],
		[
			9616,
			8365
		],
		[
			9351,
			4072
		],
		[
			8812,
			6779
		],
		[
			260,
			636
		],
		[
			-807,
			141
		],
		[
			-3832,
			-660
		],
		[
			-5487,
			-4858
		],
		[
			-10735,
			-5427
		],
		[
			-9651,
			-6571
		],
		[
			-4750,
			-4347
		],
		[
			-6869,
			-880
		],
		[
			-94,
			-1033
		],
		[
			-205,
			-3562
		],
		[
			1668,
			-4533
		],
		[
			7924,
			-9486
		],
		[
			1365,
			-4448
		],
		[
			-1381,
			-1534
		],
		[
			-7910,
			-4181
		],
		[
			-4330,
			-6785
		],
		[
			-1013,
			-8086
		],
		[
			-3813,
			-7527
		],
		[
			-5410,
			-6829
		],
		[
			2804,
			-3700
		],
		[
			-274,
			-4429
		],
		[
			-2423,
			-2092
		],
		[
			-3815,
			-1540
		],
		[
			-14792,
			-1504
		],
		[
			-3279,
			1449
		],
		[
			-471,
			6468
		],
		[
			6837,
			7633
		],
		[
			1441,
			11185
		],
		[
			4634,
			11049
		],
		[
			9944,
			9348
		],
		[
			-4237,
			1022
		],
		[
			-4496,
			3515
		],
		[
			285,
			4057
		],
		[
			2963,
			5293
		],
		[
			-4296,
			-191
		],
		[
			-962,
			1262
		],
		[
			5962,
			8146
		],
		[
			415,
			702
		],
		[
			-346,
			342
		],
		[
			-1448,
			-313
		],
		[
			-868,
			-731
		],
		[
			-4381,
			-4086
		],
		[
			-922,
			725
		],
		[
			2699,
			3361
		],
		[
			5402,
			6625
		],
		[
			5721,
			2976
		],
		[
			-413,
			2936
		],
		[
			822,
			3063
		],
		[
			-3496,
			1235
		],
		[
			3224,
			7646
		],
		[
			-5654,
			2993
		],
		[
			-2585,
			-5426
		],
		[
			-1280,
			-590
		],
		[
			-924,
			2434
		],
		[
			1450,
			5502
		],
		[
			2383,
			2380
		],
		[
			6999,
			3208
		],
		[
			6835,
			7820
		],
		[
			5429,
			3006
		],
		[
			165,
			1860
		],
		[
			-2265,
			1787
		],
		[
			556,
			1912
		],
		[
			13277,
			13623
		],
		[
			9557,
			3842
		],
		[
			-1982,
			3076
		],
		[
			10056,
			8889
		],
		[
			772,
			1840
		],
		[
			-1393,
			-14
		],
		[
			-8574,
			-5577
		],
		[
			-4463,
			-5283
		],
		[
			-5097,
			-1670
		],
		[
			-8716,
			-5012
		],
		[
			-9136,
			-3740
		],
		[
			-8795,
			-7340
		],
		[
			-10068,
			-3199
		],
		[
			-5727,
			1347
		],
		[
			-3132,
			1936
		],
		[
			-13096,
			1622
		],
		[
			-5731,
			3312
		],
		[
			-2811,
			2918
		],
		[
			377,
			2302
		],
		[
			6241,
			2064
		],
		[
			166,
			976
		],
		[
			-14008,
			1752
		],
		[
			-10763,
			132
		],
		[
			-3873,
			2245
		],
		[
			2528,
			3203
		],
		[
			5129,
			1518
		],
		[
			15921,
			1405
		],
		[
			9507,
			-1497
		],
		[
			2471,
			2531
		],
		[
			-690,
			1776
		],
		[
			738,
			1510
		],
		[
			7561,
			4377
		],
		[
			-1011,
			1560
		],
		[
			-8405,
			55
		],
		[
			-2096,
			770
		],
		[
			5994,
			10614
		],
		[
			8272,
			1798
		],
		[
			6357,
			-2348
		],
		[
			2688,
			172
		],
		[
			-3531,
			3991
		],
		[
			-7665,
			2207
		],
		[
			42,
			2898
		],
		[
			5312,
			3283
		],
		[
			5109,
			910
		],
		[
			12854,
			-2253
		],
		[
			-4956,
			3487
		],
		[
			-8666,
			2522
		],
		[
			-152,
			1880
		],
		[
			2590,
			2905
		],
		[
			1002,
			3365
		],
		[
			2372,
			2695
		],
		[
			-3377,
			1429
		],
		[
			-6174,
			629
		],
		[
			-487,
			1811
		],
		[
			4438,
			3154
		],
		[
			6236,
			525
		],
		[
			10137,
			2406
		],
		[
			3474,
			2200
		],
		[
			1041,
			2171
		],
		[
			-2358,
			-411
		],
		[
			-8927,
			-4505
		],
		[
			-4440,
			833
		],
		[
			454,
			2236
		],
		[
			-899,
			939
		],
		[
			-12534,
			-4600
		],
		[
			-4449,
			44
		],
		[
			-2712,
			1858
		],
		[
			-124,
			5740
		],
		[
			-3391,
			2207
		],
		[
			-1042,
			4287
		],
		[
			187,
			667
		],
		[
			1321,
			4350
		],
		[
			2876,
			2448
		],
		[
			10452,
			-2385
		],
		[
			5082,
			-2154
		],
		[
			10280,
			596
		],
		[
			1675,
			754
		],
		[
			-2288,
			1207
		],
		[
			-10705,
			750
		],
		[
			-12089,
			8301
		],
		[
			-240,
			2302
		],
		[
			2205,
			2495
		],
		[
			7691,
			1920
		],
		[
			-1551,
			1610
		],
		[
			-7886,
			3131
		],
		[
			-268,
			8293
		],
		[
			685,
			1132
		],
		[
			3710,
			1243
		],
		[
			4239,
			-393
		],
		[
			5330,
			-5712
		],
		[
			3826,
			-1726
		],
		[
			1847,
			1140
		],
		[
			529,
			1608
		],
		[
			-607,
			1125
		],
		[
			-2868,
			1197
		],
		[
			516,
			1584
		],
		[
			-1332,
			3516
		],
		[
			2153,
			2273
		],
		[
			4243,
			-201
		],
		[
			4481,
			-3216
		],
		[
			4277,
			-1273
		],
		[
			2438,
			335
		],
		[
			2984,
			2228
		],
		[
			2549,
			747
		],
		[
			9373,
			-1793
		],
		[
			-5894,
			3968
		],
		[
			2104,
			887
		],
		[
			13967,
			-2468
		],
		[
			8595,
			-3046
		],
		[
			-515,
			1015
		],
		[
			-5928,
			3333
		],
		[
			-2150,
			2929
		],
		[
			-19883,
			9594
		],
		[
			-3195,
			4050
		],
		[
			2261,
			1318
		],
		[
			7306,
			-2213
		],
		[
			4555,
			917
		],
		[
			1349,
			1472
		],
		[
			153,
			5413
		],
		[
			-9125,
			7445
		],
		[
			-281,
			2190
		],
		[
			7238,
			-936
		],
		[
			5127,
			2000
		],
		[
			7305,
			-603
		],
		[
			7191,
			1543
		],
		[
			-5189,
			6712
		],
		[
			-1704,
			4348
		],
		[
			4362,
			2367
		],
		[
			4533,
			612
		],
		[
			-647,
			2194
		],
		[
			943,
			3111
		],
		[
			-1928,
			2654
		],
		[
			-231,
			2185
		],
		[
			1702,
			2004
		],
		[
			5272,
			3393
		],
		[
			4795,
			5451
		],
		[
			13468,
			-1401
		],
		[
			5251,
			-4371
		],
		[
			4255,
			2590
		],
		[
			8299,
			-3215
		],
		[
			615,
			-2719
		],
		[
			-5518,
			-5035
		],
		[
			0,
			-1354
		],
		[
			5456,
			2459
		],
		[
			6038,
			4515
		],
		[
			2859,
			3622
		],
		[
			2680,
			862
		],
		[
			5882,
			-422
		],
		[
			6199,
			-2750
		],
		[
			916,
			-2136
		],
		[
			-1872,
			-3095
		],
		[
			391,
			-1365
		],
		[
			11002,
			6089
		],
		[
			3730,
			409
		],
		[
			6175,
			-897
		],
		[
			8793,
			2523
		],
		[
			6791,
			272
		],
		[
			4864,
			2189
		],
		[
			4698,
			-1424
		],
		[
			9669,
			-638
		],
		[
			10746,
			735
		],
		[
			14306,
			4748
		],
		[
			7169,
			212
		],
		[
			2500,
			-897
		],
		[
			1892,
			-845
		],
		[
			6422,
			587
		],
		[
			7290,
			-709
		],
		[
			1046,
			973
		],
		[
			548,
			511
		],
		[
			-3231,
			3388
		],
		[
			2059,
			1354
		],
		[
			6755,
			-1624
		],
		[
			10741,
			698
		],
		[
			5387,
			-1306
		],
		[
			10878,
			-711
		],
		[
			-308,
			-2310
		],
		[
			-8058,
			-10139
		],
		[
			1490,
			-2599
		],
		[
			4372,
			-1589
		],
		[
			-24,
			-2451
		],
		[
			-4803,
			-6693
		],
		[
			-6341,
			-4295
		],
		[
			-20404,
			-6805
		],
		[
			-14827,
			-10061
		],
		[
			-884,
			-362
		],
		[
			-25205,
			-10320
		],
		[
			-7995,
			-5456
		],
		[
			-9460,
			-3356
		],
		[
			-2590,
			-2432
		],
		[
			-1717,
			-4658
		],
		[
			-3058,
			-3149
		],
		[
			-7451,
			-963
		],
		[
			-10169,
			1134
		],
		[
			-6805,
			-353
		],
		[
			22261,
			-4230
		],
		[
			9775,
			1286
		],
		[
			7443,
			-1014
		],
		[
			6967,
			2288
		],
		[
			1628,
			-373
		],
		[
			-2955,
			-3522
		],
		[
			-14808,
			-10424
		],
		[
			-2783,
			-56
		],
		[
			-2340,
			1781
		],
		[
			-2421,
			425
		],
		[
			-10086,
			-3188
		],
		[
			-7828,
			-991
		],
		[
			-8506,
			-2829
		],
		[
			-4394,
			-3347
		],
		[
			14497,
			4306
		],
		[
			8241,
			-325
		],
		[
			8001,
			1053
		],
		[
			2127,
			-808
		],
		[
			-7761,
			-7878
		],
		[
			-8056,
			-3922
		],
		[
			-4038,
			-3220
		],
		[
			-15673,
			-1248
		],
		[
			-4260,
			-925
		]
	],
	[
		[
			5683190,
			7959195
		],
		[
			-2130,
			-1025
		],
		[
			-3391,
			66
		],
		[
			-863,
			-5449
		],
		[
			-5776,
			-2551
		],
		[
			4840,
			-2208
		],
		[
			1206,
			-2150
		],
		[
			580,
			-4452
		],
		[
			-2610,
			-1975
		],
		[
			-5539,
			-266
		],
		[
			-2300,
			-409
		],
		[
			1894,
			-2259
		],
		[
			-1396,
			-2847
		],
		[
			-8802,
			-2798
		],
		[
			-5122,
			1858
		],
		[
			-1394,
			-1498
		],
		[
			-2193,
			166
		],
		[
			-4749,
			4055
		],
		[
			-1797,
			3368
		],
		[
			-1772,
			-354
		],
		[
			-444,
			-740
		],
		[
			1379,
			-2651
		],
		[
			3385,
			-3357
		],
		[
			2255,
			-6872
		],
		[
			-1985,
			-130
		],
		[
			-4345,
			2338
		],
		[
			-1684,
			-1316
		],
		[
			-677,
			1551
		],
		[
			-2990,
			203
		],
		[
			-637,
			-1436
		],
		[
			2971,
			-2343
		],
		[
			363,
			-1836
		],
		[
			-4614,
			-1774
		],
		[
			-4011,
			-69
		],
		[
			-4446,
			-3564
		],
		[
			-7871,
			-3472
		],
		[
			-13109,
			6616
		],
		[
			-1334,
			1706
		],
		[
			5531,
			11
		],
		[
			6645,
			3526
		],
		[
			4448,
			1023
		],
		[
			1109,
			2857
		],
		[
			6488,
			1913
		],
		[
			-2722,
			1768
		],
		[
			-14837,
			2465
		],
		[
			-4572,
			2584
		],
		[
			253,
			1456
		],
		[
			5136,
			3149
		],
		[
			-1884,
			3094
		],
		[
			-4051,
			1227
		],
		[
			-2433,
			4739
		],
		[
			2294,
			4978
		],
		[
			4575,
			1367
		],
		[
			165,
			2200
		],
		[
			1264,
			1891
		],
		[
			8713,
			-283
		],
		[
			2148,
			-1158
		],
		[
			1048,
			-2135
		],
		[
			4106,
			-791
		],
		[
			2055,
			1636
		],
		[
			-2391,
			4283
		],
		[
			1410,
			1816
		],
		[
			6691,
			-3697
		],
		[
			2331,
			-2617
		],
		[
			2920,
			-818
		],
		[
			-730,
			1936
		],
		[
			-2193,
			468
		],
		[
			257,
			1334
		],
		[
			-3265,
			3154
		],
		[
			-709,
			2323
		],
		[
			982,
			1275
		],
		[
			13721,
			5211
		],
		[
			4981,
			145
		],
		[
			5713,
			1550
		],
		[
			4704,
			3232
		],
		[
			5524,
			2268
		],
		[
			14770,
			5967
		],
		[
			4631,
			3041
		],
		[
			1850,
			-403
		],
		[
			5065,
			-3684
		],
		[
			1645,
			-4799
		],
		[
			-2998,
			-4897
		],
		[
			1609,
			-3344
		],
		[
			-12485,
			-7680
		],
		[
			-1273,
			-2637
		],
		[
			869,
			-3070
		]
	],
	[
		[
			5700407,
			7889056
		],
		[
			394,
			-4717
		],
		[
			-2942,
			-4878
		],
		[
			3357,
			-1461
		],
		[
			3078,
			-7809
		],
		[
			4519,
			-1128
		],
		[
			1394,
			-2460
		],
		[
			3354,
			-155
		],
		[
			1350,
			806
		],
		[
			-1230,
			1840
		],
		[
			225,
			1127
		],
		[
			4209,
			609
		],
		[
			4434,
			-2255
		],
		[
			-2227,
			-3198
		],
		[
			5087,
			-1943
		],
		[
			15533,
			2355
		],
		[
			7243,
			-1122
		],
		[
			844,
			-897
		],
		[
			-417,
			-1647
		],
		[
			-2782,
			-3435
		],
		[
			-9745,
			-3172
		],
		[
			-222,
			-2218
		],
		[
			-1743,
			-1996
		],
		[
			-4879,
			-2618
		],
		[
			-5866,
			-4722
		],
		[
			-8603,
			-2228
		],
		[
			-1892,
			2255
		],
		[
			331,
			1557
		],
		[
			2550,
			4521
		],
		[
			6418,
			4846
		],
		[
			61,
			798
		],
		[
			-4889,
			529
		],
		[
			-4488,
			2630
		],
		[
			-6754,
			-5996
		],
		[
			-1238,
			653
		],
		[
			-1596,
			2910
		],
		[
			-2415,
			1011
		],
		[
			-14822,
			-1991
		],
		[
			-1679,
			2198
		],
		[
			-5289,
			1303
		],
		[
			-1326,
			3165
		],
		[
			-5456,
			1858
		],
		[
			-2781,
			2775
		],
		[
			-693,
			691
		],
		[
			269,
			2177
		],
		[
			424,
			310
		],
		[
			1095,
			802
		],
		[
			5851,
			575
		],
		[
			-1226,
			1627
		],
		[
			-5204,
			1075
		],
		[
			-516,
			376
		],
		[
			-3640,
			2650
		],
		[
			-4448,
			196
		],
		[
			-1436,
			-269
		],
		[
			-2145,
			-3348
		],
		[
			-2639,
			-374
		],
		[
			-9677,
			2680
		],
		[
			-7077,
			5207
		],
		[
			-613,
			1459
		],
		[
			846,
			1437
		],
		[
			2164,
			856
		],
		[
			337,
			2787
		],
		[
			1868,
			1356
		],
		[
			7918,
			-5254
		],
		[
			3214,
			-274
		],
		[
			-1104,
			4223
		],
		[
			3486,
			1965
		],
		[
			-5239,
			4250
		],
		[
			1694,
			4502
		],
		[
			3407,
			-1291
		],
		[
			4200,
			-3857
		],
		[
			8884,
			-3974
		],
		[
			0,
			-260
		],
		[
			582,
			0
		],
		[
			1185,
			-530
		],
		[
			1769,
			530
		],
		[
			3252,
			973
		],
		[
			2082,
			-973
		],
		[
			3316,
			-1551
		],
		[
			-69,
			1118
		],
		[
			-418,
			433
		],
		[
			-4399,
			4557
		],
		[
			467,
			3435
		],
		[
			-2992,
			5444
		],
		[
			4759,
			3576
		],
		[
			1820,
			2374
		],
		[
			1633,
			451
		],
		[
			6254,
			-2568
		],
		[
			3701,
			-3369
		],
		[
			4595,
			-2390
		],
		[
			2644,
			-2885
		],
		[
			719,
			-8625
		]
	],
	[
		[
			6184532,
			8199801
		],
		[
			-1734,
			-2900
		],
		[
			556,
			-3014
		],
		[
			-3072,
			-1923
		],
		[
			1386,
			-2093
		],
		[
			-663,
			-2589
		],
		[
			1277,
			-2889
		],
		[
			-2703,
			-2645
		],
		[
			-1194,
			-2664
		],
		[
			2020,
			369
		],
		[
			2182,
			2679
		],
		[
			4910,
			1140
		],
		[
			-1591,
			2024
		],
		[
			863,
			1301
		],
		[
			4492,
			1059
		],
		[
			2493,
			-672
		],
		[
			3893,
			-4058
		],
		[
			-358,
			-1605
		],
		[
			-2506,
			-138
		],
		[
			-1174,
			-1069
		],
		[
			3814,
			-568
		],
		[
			1613,
			-1544
		],
		[
			2467,
			1055
		],
		[
			1735,
			1878
		],
		[
			1843,
			64
		],
		[
			3112,
			2004
		],
		[
			1426,
			-180
		],
		[
			-1148,
			-1521
		],
		[
			-6667,
			-3926
		],
		[
			770,
			-890
		],
		[
			2122,
			1260
		],
		[
			2139,
			-373
		],
		[
			-176,
			-2819
		],
		[
			-9257,
			-998
		],
		[
			806,
			-1755
		],
		[
			7482,
			-1052
		],
		[
			642,
			-936
		],
		[
			-5720,
			-2922
		],
		[
			531,
			-813
		],
		[
			3092,
			-235
		],
		[
			347,
			-939
		],
		[
			-6092,
			-1888
		],
		[
			-1131,
			1587
		],
		[
			-2060,
			372
		],
		[
			-1413,
			-2795
		],
		[
			1397,
			-734
		],
		[
			153,
			-1424
		],
		[
			1556,
			-134
		],
		[
			-435,
			-1909
		],
		[
			2697,
			-152
		],
		[
			177,
			-2453
		],
		[
			1137,
			-1248
		],
		[
			-1174,
			-1832
		],
		[
			-4107,
			-1114
		],
		[
			-1587,
			-3837
		],
		[
			347,
			-1766
		],
		[
			2372,
			-2951
		],
		[
			-3826,
			-690
		],
		[
			-20,
			-1440
		],
		[
			2127,
			-2424
		],
		[
			-191,
			-1607
		],
		[
			-1581,
			1339
		],
		[
			-4887,
			-329
		],
		[
			1270,
			-1430
		],
		[
			90,
			-1494
		],
		[
			-483,
			-2148
		],
		[
			-2011,
			-1816
		],
		[
			985,
			-1245
		],
		[
			-913,
			-2623
		],
		[
			1059,
			-1113
		],
		[
			-464,
			-1148
		],
		[
			-2229,
			1346
		],
		[
			-1367,
			-742
		],
		[
			92,
			1938
		],
		[
			-1182,
			1334
		],
		[
			-5232,
			-524
		],
		[
			-1248,
			1586
		],
		[
			1924,
			1473
		],
		[
			884,
			2983
		],
		[
			2262,
			-291
		],
		[
			433,
			2749
		],
		[
			-971,
			2178
		],
		[
			2120,
			2008
		],
		[
			4786,
			10299
		],
		[
			-506,
			1043
		],
		[
			-2472,
			-5058
		],
		[
			-2495,
			-2736
		],
		[
			-464,
			233
		],
		[
			306,
			1580
		],
		[
			-1781,
			-847
		],
		[
			-614,
			1366
		],
		[
			1243,
			967
		],
		[
			682,
			1822
		],
		[
			2872,
			431
		],
		[
			753,
			1597
		],
		[
			490,
			5245
		],
		[
			-2531,
			-32
		],
		[
			822,
			4817
		],
		[
			-3585,
			-1097
		],
		[
			-2008,
			2670
		],
		[
			-1730,
			250
		],
		[
			1603,
			-4058
		],
		[
			-2717,
			86
		],
		[
			-1890,
			-2758
		],
		[
			-2875,
			3
		],
		[
			-2237,
			-2036
		],
		[
			-7342,
			3287
		],
		[
			574,
			1418
		],
		[
			3103,
			1138
		],
		[
			-1293,
			1824
		],
		[
			-3531,
			-2327
		],
		[
			-3273,
			965
		],
		[
			-4003,
			-670
		],
		[
			-5769,
			2368
		],
		[
			-1301,
			2122
		],
		[
			351,
			3590
		],
		[
			2123,
			987
		],
		[
			5307,
			302
		],
		[
			4448,
			-1104
		],
		[
			2019,
			389
		],
		[
			953,
			1326
		],
		[
			2794,
			358
		],
		[
			2991,
			-1890
		],
		[
			1692,
			1337
		],
		[
			-1280,
			1404
		],
		[
			541,
			1215
		],
		[
			7459,
			-2209
		],
		[
			2640,
			-1963
		],
		[
			899,
			337
		],
		[
			-11,
			3726
		],
		[
			5108,
			2542
		],
		[
			-79,
			508
		],
		[
			-3310,
			510
		],
		[
			-1236,
			1858
		],
		[
			-1518,
			-652
		],
		[
			-1999,
			-2844
		],
		[
			-2584,
			-596
		],
		[
			-3641,
			840
		],
		[
			-970,
			1481
		],
		[
			2030,
			1472
		],
		[
			4518,
			80
		],
		[
			-1439,
			2464
		],
		[
			-3177,
			1161
		],
		[
			-46,
			2202
		],
		[
			-1768,
			3429
		],
		[
			-2989,
			-1663
		],
		[
			-1961,
			1786
		],
		[
			-8863,
			-248
		],
		[
			-1739,
			1126
		],
		[
			1361,
			1339
		],
		[
			3190,
			580
		],
		[
			1469,
			2920
		],
		[
			1931,
			1103
		],
		[
			5814,
			-2603
		],
		[
			357,
			354
		],
		[
			-705,
			1615
		],
		[
			4309,
			3318
		],
		[
			2416,
			3651
		],
		[
			6958,
			-444
		],
		[
			1200,
			1459
		],
		[
			1641,
			409
		],
		[
			1451,
			-1569
		]
	],
	[
		[
			5736164,
			7789505
		],
		[
			3000,
			-1898
		],
		[
			4067,
			-639
		],
		[
			4114,
			-2848
		],
		[
			2270,
			-377
		],
		[
			572,
			-1136
		],
		[
			-1725,
			-1335
		],
		[
			552,
			-1783
		],
		[
			-4245,
			-4240
		],
		[
			-8605,
			-3933
		],
		[
			-4878,
			-1317
		],
		[
			-2821,
			216
		],
		[
			-857,
			1039
		],
		[
			2022,
			2199
		],
		[
			-2038,
			610
		],
		[
			-6028,
			-3005
		],
		[
			-5137,
			-458
		],
		[
			-5940,
			-2416
		],
		[
			-3506,
			428
		],
		[
			-6345,
			-1185
		],
		[
			-9329,
			-201
		],
		[
			-3815,
			-1620
		],
		[
			-3915,
			270
		],
		[
			-5500,
			2388
		],
		[
			617,
			3446
		],
		[
			2047,
			1493
		],
		[
			4786,
			-329
		],
		[
			4797,
			-2179
		],
		[
			817,
			2020
		],
		[
			9342,
			-107
		],
		[
			12117,
			2582
		],
		[
			1430,
			1265
		],
		[
			-1558,
			1495
		],
		[
			-8150,
			-2516
		],
		[
			-8917,
			-422
		],
		[
			-836,
			1171
		],
		[
			494,
			1204
		],
		[
			4765,
			2725
		],
		[
			2591,
			3262
		],
		[
			6845,
			498
		],
		[
			4143,
			1898
		],
		[
			1497,
			1912
		],
		[
			-1526,
			634
		],
		[
			-10731,
			-1959
		],
		[
			-3120,
			2457
		],
		[
			-6052,
			2225
		],
		[
			-6958,
			237
		],
		[
			-4271,
			1323
		],
		[
			-233,
			1263
		],
		[
			3537,
			2245
		],
		[
			-1632,
			1084
		],
		[
			-56,
			1748
		],
		[
			8192,
			522
		],
		[
			1424,
			2327
		],
		[
			9026,
			1981
		],
		[
			8979,
			-3296
		],
		[
			8385,
			-9363
		],
		[
			16296,
			-1605
		]
	],
	[
		[
			5704804,
			7722792
		],
		[
			1349,
			-4739
		],
		[
			3978,
			-3115
		],
		[
			2474,
			-8037
		],
		[
			-4505,
			-2327
		],
		[
			-533,
			-821
		],
		[
			-396,
			-610
		],
		[
			-6170,
			-1551
		],
		[
			573,
			-1093
		],
		[
			-417,
			-1216
		],
		[
			-1442,
			1158
		],
		[
			649,
			1072
		],
		[
			-6006,
			213
		],
		[
			-3168,
			-3519
		],
		[
			-4257,
			-1503
		],
		[
			-5246,
			1654
		],
		[
			1302,
			3500
		],
		[
			1895,
			1589
		],
		[
			1512,
			306
		],
		[
			2059,
			417
		],
		[
			177,
			1623
		],
		[
			-2887,
			3557
		],
		[
			-3990,
			951
		],
		[
			-513,
			799
		],
		[
			1134,
			1811
		],
		[
			6621,
			2460
		],
		[
			589,
			782
		],
		[
			-773,
			627
		],
		[
			-7939,
			237
		],
		[
			-3750,
			-4640
		],
		[
			-4764,
			-3777
		],
		[
			-2853,
			-1243
		],
		[
			-2837,
			-1236
		],
		[
			-3392,
			1346
		],
		[
			2032,
			2294
		],
		[
			161,
			2218
		],
		[
			3773,
			3956
		],
		[
			-209,
			1019
		],
		[
			-1919,
			1186
		],
		[
			2061,
			1758
		],
		[
			330,
			1606
		],
		[
			264,
			1288
		],
		[
			809,
			1371
		],
		[
			4198,
			152
		],
		[
			4503,
			1934
		],
		[
			2658,
			1075
		],
		[
			462,
			-327
		],
		[
			-136,
			-748
		],
		[
			-1596,
			-4039
		],
		[
			748,
			-890
		],
		[
			1333,
			19
		],
		[
			-322,
			786
		],
		[
			536,
			667
		],
		[
			1230,
			3187
		],
		[
			1391,
			270
		],
		[
			9979,
			4803
		],
		[
			5791,
			1134
		],
		[
			1342,
			-673
		],
		[
			-307,
			-3455
		],
		[
			701,
			-1809
		],
		[
			1713,
			-3457
		]
	],
	[
		[
			6014679,
			8045146
		],
		[
			-1001,
			-2037
		],
		[
			-3773,
			244
		],
		[
			-1075,
			-1939
		],
		[
			-2961,
			-994
		],
		[
			-1027,
			-1204
		],
		[
			4243,
			-917
		],
		[
			2374,
			1248
		],
		[
			2824,
			68
		],
		[
			4895,
			-2262
		],
		[
			2238,
			2214
		],
		[
			2148,
			-57
		],
		[
			557,
			-732
		],
		[
			-549,
			-3376
		],
		[
			1843,
			-404
		],
		[
			467,
			0
		],
		[
			3898,
			2058
		],
		[
			4944,
			524
		],
		[
			940,
			-751
		],
		[
			-322,
			-1293
		],
		[
			-2752,
			-538
		],
		[
			-2003,
			-391
		],
		[
			1622,
			-1578
		],
		[
			61,
			-1657
		],
		[
			2280,
			12
		],
		[
			1587,
			-1280
		],
		[
			-3853,
			-3770
		],
		[
			-4859,
			2154
		],
		[
			-606,
			-44
		],
		[
			-557,
			-1608
		],
		[
			-1855,
			336
		],
		[
			486,
			1132
		],
		[
			-2685,
			-196
		],
		[
			-3946,
			4452
		],
		[
			43,
			2047
		],
		[
			-983,
			308
		],
		[
			-4093,
			-1936
		],
		[
			-5893,
			-373
		],
		[
			-5166,
			-2085
		],
		[
			-7704,
			-145
		],
		[
			-2181,
			1793
		],
		[
			-326,
			2829
		],
		[
			-1757,
			1400
		],
		[
			-1931,
			-1267
		],
		[
			-1123,
			-133
		],
		[
			-1421,
			-74
		],
		[
			-655,
			-1059
		],
		[
			-2344,
			243
		],
		[
			-1933,
			890
		],
		[
			-763,
			352
		],
		[
			-1354,
			2964
		],
		[
			1092,
			4956
		],
		[
			1544,
			887
		],
		[
			-1372,
			5066
		],
		[
			3687,
			3107
		],
		[
			11076,
			1630
		],
		[
			7465,
			-2349
		],
		[
			7326,
			-1840
		],
		[
			486,
			-1498
		],
		[
			3900,
			-1864
		],
		[
			797,
			-1263
		]
	],
	[
		[
			5803767,
			7682900
		],
		[
			-6807,
			-679
		],
		[
			-6079,
			321
		],
		[
			-3535,
			1218
		],
		[
			-777,
			201
		],
		[
			-2751,
			1274
		],
		[
			-1223,
			1713
		],
		[
			-89,
			1467
		],
		[
			-2815,
			1001
		],
		[
			447,
			1198
		],
		[
			-362,
			1072
		],
		[
			1115,
			1430
		],
		[
			-627,
			2645
		],
		[
			-2262,
			1532
		],
		[
			-2383,
			2609
		],
		[
			-136,
			630
		],
		[
			224,
			951
		],
		[
			865,
			808
		],
		[
			383,
			1462
		],
		[
			1103,
			2105
		],
		[
			799,
			701
		],
		[
			3191,
			1041
		],
		[
			1559,
			1617
		],
		[
			2083,
			113
		],
		[
			269,
			832
		],
		[
			1214,
			481
		],
		[
			7358,
			-1596
		],
		[
			4905,
			-3253
		],
		[
			996,
			-2041
		],
		[
			1672,
			-3869
		],
		[
			-1976,
			-2826
		],
		[
			3639,
			-1139
		],
		[
			516,
			-162
		],
		[
			1895,
			-1489
		],
		[
			-2411,
			-1743
		],
		[
			-1167,
			-843
		],
		[
			1167,
			-576
		],
		[
			3001,
			-1485
		],
		[
			-822,
			-2078
		],
		[
			1029,
			-2487
		],
		[
			-2500,
			-2085
		],
		[
			-708,
			-71
		]
	],
	[
		[
			5598614,
			7905618
		],
		[
			-2714,
			-2703
		],
		[
			81,
			-1727
		],
		[
			4524,
			-3107
		],
		[
			3113,
			-995
		],
		[
			-3558,
			-6597
		],
		[
			-6313,
			-1623
		],
		[
			655,
			-985
		],
		[
			3775,
			668
		],
		[
			668,
			-927
		],
		[
			-1523,
			-1275
		],
		[
			-4017,
			85
		],
		[
			-841,
			-2211
		],
		[
			-1819,
			-1221
		],
		[
			3339,
			-1227
		],
		[
			1563,
			-1893
		],
		[
			-156,
			-1627
		],
		[
			-1955,
			-386
		],
		[
			-1132,
			1479
		],
		[
			-1893,
			-1013
		],
		[
			-3099,
			1318
		],
		[
			-3981,
			-436
		],
		[
			-6570,
			2057
		],
		[
			-1930,
			2214
		],
		[
			508,
			2218
		],
		[
			4026,
			1812
		],
		[
			9252,
			-1526
		],
		[
			667,
			470
		],
		[
			-698,
			1360
		],
		[
			639,
			1431
		],
		[
			-5239,
			848
		],
		[
			-4514,
			3898
		],
		[
			-6173,
			2421
		],
		[
			-5907,
			-413
		],
		[
			-4850,
			2610
		],
		[
			292,
			1169
		],
		[
			4727,
			4740
		],
		[
			3904,
			-76
		],
		[
			4996,
			-1702
		],
		[
			5918,
			3911
		],
		[
			639,
			-1881
		],
		[
			1705,
			-467
		],
		[
			1316,
			1435
		],
		[
			779,
			-80
		],
		[
			233,
			-1991
		],
		[
			2941,
			2181
		],
		[
			5706,
			1850
		],
		[
			2916,
			-2086
		]
	],
	[
		[
			5718997,
			7719147
		],
		[
			-6245,
			-631
		],
		[
			-5174,
			2258
		],
		[
			-1624,
			5729
		],
		[
			1040,
			2222
		],
		[
			3860,
			3464
		],
		[
			7914,
			2299
		],
		[
			-2854,
			2483
		],
		[
			1135,
			1723
		],
		[
			3320,
			3650
		],
		[
			20687,
			10017
		],
		[
			2515,
			890
		],
		[
			1608,
			-451
		],
		[
			809,
			-1457
		],
		[
			-520,
			-2155
		],
		[
			-10400,
			-10494
		],
		[
			-3095,
			-3242
		],
		[
			-4486,
			-7130
		],
		[
			-5903,
			-3846
		],
		[
			-2587,
			-5329
		]
	],
	[
		[
			5592743,
			7850389
		],
		[
			-1431,
			-1439
		],
		[
			-12182,
			319
		],
		[
			-2044,
			977
		],
		[
			-1484,
			1442
		],
		[
			-3992,
			10435
		],
		[
			1502,
			5182
		],
		[
			2061,
			1625
		],
		[
			213,
			2582
		],
		[
			-2447,
			5623
		],
		[
			2725,
			1287
		],
		[
			5375,
			161
		],
		[
			6547,
			-2201
		],
		[
			3687,
			-3400
		],
		[
			-1507,
			-1555
		],
		[
			4799,
			-2396
		],
		[
			226,
			-1726
		],
		[
			-3481,
			-1736
		],
		[
			-2292,
			-3446
		],
		[
			-2273,
			-1372
		],
		[
			3177,
			-3056
		],
		[
			-137,
			-2467
		],
		[
			-5775,
			-1826
		],
		[
			42,
			-524
		],
		[
			6129,
			-899
		],
		[
			2562,
			-1590
		]
	],
	[
		[
			6215929,
			8204473
		],
		[
			-527,
			-2101
		],
		[
			-3413,
			715
		],
		[
			-1872,
			1155
		],
		[
			132,
			-1314
		],
		[
			2712,
			-1942
		],
		[
			-1869,
			-2449
		],
		[
			3530,
			-2192
		],
		[
			-1269,
			-2552
		],
		[
			-2573,
			-578
		],
		[
			1864,
			-1609
		],
		[
			-895,
			-3319
		],
		[
			-3388,
			-438
		],
		[
			-2488,
			618
		],
		[
			-1319,
			-1312
		],
		[
			-2048,
			293
		],
		[
			-3719,
			1152
		],
		[
			-1856,
			2549
		],
		[
			-95,
			3596
		],
		[
			-1413,
			803
		],
		[
			641,
			1473
		],
		[
			-774,
			1748
		],
		[
			1441,
			3436
		],
		[
			2259,
			1616
		],
		[
			1328,
			-2013
		],
		[
			489,
			94
		],
		[
			1699,
			8284
		],
		[
			529,
			1067
		],
		[
			1310,
			274
		],
		[
			9316,
			-275
		],
		[
			1557,
			-2244
		],
		[
			711,
			-4535
		]
	],
	[
		[
			5993607,
			8026639
		],
		[
			-479,
			-995
		],
		[
			359,
			-701
		],
		[
			1752,
			-742
		],
		[
			-361,
			-1658
		],
		[
			617,
			-8
		],
		[
			14,
			-1190
		],
		[
			1808,
			-76
		],
		[
			736,
			-478
		],
		[
			-2906,
			-967
		],
		[
			-582,
			-1053
		],
		[
			949,
			-168
		],
		[
			1704,
			347
		],
		[
			1458,
			-99
		],
		[
			1234,
			488
		],
		[
			1310,
			-311
		],
		[
			-778,
			-1940
		],
		[
			-4221,
			-653
		],
		[
			-1294,
			78
		],
		[
			-2240,
			776
		],
		[
			1579,
			1423
		],
		[
			-201,
			469
		],
		[
			-2843,
			-220
		],
		[
			-1042,
			-453
		],
		[
			-509,
			-921
		],
		[
			2976,
			-1026
		],
		[
			-804,
			-593
		],
		[
			-1951,
			830
		],
		[
			-3867,
			-418
		],
		[
			-3230,
			2221
		],
		[
			-2,
			645
		],
		[
			-1092,
			771
		],
		[
			378,
			449
		],
		[
			-3814,
			1942
		],
		[
			-926,
			2099
		],
		[
			225,
			586
		],
		[
			-1502,
			687
		],
		[
			-1327,
			-126
		],
		[
			-2885,
			208
		],
		[
			-236,
			452
		],
		[
			1140,
			1433
		],
		[
			759,
			2027
		],
		[
			1371,
			1135
		],
		[
			2411,
			174
		],
		[
			2508,
			791
		],
		[
			2742,
			-392
		],
		[
			13,
			-892
		],
		[
			1314,
			-296
		],
		[
			-262,
			-874
		],
		[
			3028,
			-224
		],
		[
			5378,
			-1762
		],
		[
			1591,
			-795
		]
	],
	[
		[
			6228053,
			8220384
		],
		[
			448,
			-223
		],
		[
			2663,
			2373
		],
		[
			4902,
			-726
		],
		[
			1397,
			-1145
		],
		[
			-1962,
			-1048
		],
		[
			1394,
			-1168
		],
		[
			-215,
			-1363
		],
		[
			-3785,
			64
		],
		[
			1422,
			-2333
		],
		[
			-2154,
			-228
		],
		[
			-43,
			-528
		],
		[
			1198,
			-328
		],
		[
			-58,
			-1269
		],
		[
			-4491,
			-3036
		],
		[
			206,
			-848
		],
		[
			2516,
			-709
		],
		[
			-591,
			-1005
		],
		[
			-1853,
			-412
		],
		[
			-5187,
			1026
		],
		[
			-3257,
			-1174
		],
		[
			-3091,
			1044
		],
		[
			601,
			1292
		],
		[
			-822,
			1800
		],
		[
			2103,
			183
		],
		[
			-451,
			1839
		],
		[
			1649,
			1224
		],
		[
			838,
			2517
		],
		[
			-876,
			2074
		],
		[
			6238,
			4757
		],
		[
			1399,
			-937
		],
		[
			-138,
			-1713
		]
	],
	[
		[
			5813912,
			7712654
		],
		[
			-455,
			-1027
		],
		[
			-2501,
			157
		],
		[
			-3158,
			3312
		],
		[
			-4031,
			1380
		],
		[
			-541,
			184
		],
		[
			-1856,
			3555
		],
		[
			107,
			2914
		],
		[
			-5669,
			3120
		],
		[
			-1979,
			2588
		],
		[
			3248,
			2083
		],
		[
			10043,
			-4671
		],
		[
			-542,
			-1276
		],
		[
			6207,
			-3079
		],
		[
			1733,
			-5595
		],
		[
			-1773,
			-1889
		],
		[
			1167,
			-1756
		]
	],
	[
		[
			5688804,
			7834932
		],
		[
			-5790,
			-2638
		],
		[
			-4416,
			1677
		],
		[
			-1426,
			1986
		],
		[
			-5382,
			2227
		],
		[
			-1820,
			1279
		],
		[
			6141,
			3716
		],
		[
			5687,
			1344
		],
		[
			7256,
			-2368
		],
		[
			688,
			-1033
		],
		[
			-800,
			-1212
		],
		[
			1633,
			-876
		],
		[
			36,
			-850
		],
		[
			-1807,
			-3252
		]
	],
	[
		[
			5642000,
			7792885
		],
		[
			65,
			-1425
		],
		[
			-7355,
			-598
		],
		[
			-584,
			-757
		],
		[
			1085,
			-972
		],
		[
			-1570,
			-1377
		],
		[
			-6261,
			-478
		],
		[
			-1462,
			-1203
		],
		[
			-853,
			-2966
		],
		[
			-7679,
			1248
		],
		[
			103,
			2961
		],
		[
			-845,
			1723
		],
		[
			1140,
			1319
		],
		[
			3035,
			1135
		],
		[
			7129,
			-720
		],
		[
			5330,
			2110
		],
		[
			1263,
			0
		],
		[
			1168,
			-603
		],
		[
			1419,
			152
		],
		[
			625,
			451
		],
		[
			1137,
			414
		],
		[
			785,
			897
		],
		[
			1210,
			-1016
		],
		[
			1115,
			-295
		]
	],
	[
		[
			5660090,
			7798387
		],
		[
			-6146,
			-1501
		],
		[
			-1361,
			501
		],
		[
			-1302,
			-1073
		],
		[
			-3042,
			599
		],
		[
			-1962,
			-1529
		],
		[
			-1576,
			850
		],
		[
			2040,
			1544
		],
		[
			3044,
			733
		],
		[
			4780,
			4013
		],
		[
			7859,
			3785
		],
		[
			3905,
			1233
		],
		[
			3178,
			-109
		],
		[
			89,
			-25
		],
		[
			325,
			-660
		],
		[
			-414,
			-947
		],
		[
			-4159,
			-4671
		],
		[
			-2383,
			-179
		],
		[
			-2875,
			-2564
		]
	],
	[
		[
			5577388,
			7837366
		],
		[
			-565,
			-536
		],
		[
			-1436,
			81
		],
		[
			-5395,
			-3529
		],
		[
			-4182,
			524
		],
		[
			-3457,
			-631
		],
		[
			675,
			-1159
		],
		[
			-923,
			-1035
		],
		[
			1690,
			-329
		],
		[
			-144,
			-687
		],
		[
			-3313,
			-214
		],
		[
			-564,
			580
		],
		[
			602,
			947
		],
		[
			-2063,
			916
		],
		[
			1333,
			3111
		],
		[
			3803,
			1192
		],
		[
			380,
			1587
		],
		[
			792,
			1815
		],
		[
			4628,
			1528
		],
		[
			1077,
			2512
		],
		[
			2055,
			-1124
		],
		[
			-1119,
			-2105
		],
		[
			4340,
			-2626
		],
		[
			1786,
			-818
		]
	],
	[
		[
			5716264,
			7888815
		],
		[
			596,
			-1756
		],
		[
			-1824,
			-2840
		],
		[
			-2781,
			-2350
		],
		[
			1234,
			-4163
		],
		[
			2065,
			-2179
		],
		[
			3,
			-1042
		],
		[
			-2244,
			-2151
		],
		[
			-2920,
			-689
		],
		[
			-1460,
			393
		],
		[
			-2169,
			2348
		],
		[
			725,
			2585
		],
		[
			-571,
			3995
		],
		[
			2044,
			3253
		],
		[
			4140,
			394
		],
		[
			-918,
			2999
		],
		[
			2052,
			-79
		],
		[
			2028,
			1282
		]
	],
	[
		[
			6007569,
			8058731
		],
		[
			1145,
			-493
		],
		[
			1331,
			173
		],
		[
			286,
			-1397
		],
		[
			2136,
			-531
		],
		[
			3290,
			103
		],
		[
			1474,
			775
		],
		[
			1364,
			58
		],
		[
			1236,
			-1202
		],
		[
			1640,
			-878
		],
		[
			1022,
			385
		],
		[
			1882,
			-761
		],
		[
			-1232,
			-3388
		],
		[
			-1641,
			1089
		],
		[
			-683,
			2073
		],
		[
			-633,
			-315
		],
		[
			-1601,
			1751
		],
		[
			-1241,
			-1240
		],
		[
			1471,
			-2404
		],
		[
			-376,
			-352
		],
		[
			-2775,
			-712
		],
		[
			-4805,
			-34
		],
		[
			-3345,
			1136
		],
		[
			-1527,
			742
		],
		[
			-938,
			1131
		],
		[
			-1306,
			474
		],
		[
			-352,
			1047
		],
		[
			1280,
			639
		],
		[
			291,
			804
		],
		[
			2607,
			1327
		]
	],
	[
		[
			6026294,
			8022076
		],
		[
			224,
			-1183
		],
		[
			-2105,
			-994
		],
		[
			-601,
			-940
		],
		[
			-1523,
			-856
		],
		[
			805,
			-825
		],
		[
			-631,
			-1237
		],
		[
			-1118,
			-707
		],
		[
			2911,
			-1314
		],
		[
			-1086,
			-1845
		],
		[
			-4122,
			-498
		],
		[
			-604,
			980
		],
		[
			-2427,
			1500
		],
		[
			1031,
			794
		],
		[
			-83,
			2296
		],
		[
			-1268,
			200
		],
		[
			-2617,
			1801
		],
		[
			1117,
			715
		],
		[
			1237,
			-1163
		],
		[
			1533,
			645
		],
		[
			210,
			504
		],
		[
			-1468,
			572
		],
		[
			-873,
			753
		],
		[
			-2397,
			-769
		],
		[
			-403,
			316
		],
		[
			1606,
			1137
		],
		[
			2191,
			-322
		],
		[
			2880,
			621
		],
		[
			667,
			-840
		],
		[
			1154,
			585
		],
		[
			3896,
			633
		],
		[
			1864,
			-559
		]
	],
	[
		[
			6067838,
			8066323
		],
		[
			-3240,
			-2061
		],
		[
			-2173,
			-348
		],
		[
			-1156,
			-1342
		],
		[
			-2664,
			198
		],
		[
			-493,
			-2213
		],
		[
			-1136,
			772
		],
		[
			-183,
			1246
		],
		[
			-1860,
			-599
		],
		[
			-2662,
			37
		],
		[
			-6289,
			-4247
		],
		[
			-622,
			447
		],
		[
			554,
			2323
		],
		[
			8498,
			4356
		],
		[
			663,
			967
		],
		[
			-200,
			2001
		],
		[
			4817,
			612
		],
		[
			237,
			-443
		],
		[
			-2000,
			-2313
		],
		[
			1739,
			-684
		],
		[
			9369,
			2619
		],
		[
			3064,
			1900
		],
		[
			1880,
			-2304
		],
		[
			-6143,
			-924
		]
	],
	[
		[
			6024943,
			8068531
		],
		[
			2402,
			-2810
		],
		[
			2254,
			-478
		],
		[
			1151,
			-1475
		],
		[
			-3705,
			-1705
		],
		[
			96,
			2023
		],
		[
			-4192,
			2752
		],
		[
			-2768,
			655
		],
		[
			-1117,
			-225
		],
		[
			563,
			-1219
		],
		[
			-3265,
			-978
		],
		[
			-3212,
			1505
		],
		[
			-484,
			2603
		],
		[
			-3161,
			2129
		],
		[
			265,
			282
		],
		[
			5385,
			95
		],
		[
			4239,
			2683
		],
		[
			738,
			-618
		],
		[
			-901,
			-1993
		],
		[
			-1827,
			-852
		],
		[
			34,
			-502
		],
		[
			3915,
			-1224
		],
		[
			3590,
			-648
		]
	],
	[
		[
			6228384,
			8201983
		],
		[
			2067,
			-456
		],
		[
			1343,
			54
		],
		[
			1002,
			-738
		],
		[
			0,
			-1416
		],
		[
			1535,
			-752
		],
		[
			971,
			164
		],
		[
			652,
			1103
		],
		[
			1701,
			271
		],
		[
			33,
			-812
		],
		[
			889,
			-356
		],
		[
			-594,
			-1111
		],
		[
			-1708,
			-793
		],
		[
			33,
			-677
		],
		[
			-1220,
			-868
		],
		[
			-685,
			720
		],
		[
			-788,
			-65
		],
		[
			-1533,
			1235
		],
		[
			-1577,
			-422
		],
		[
			-1269,
			940
		],
		[
			-1276,
			-229
		],
		[
			-2138,
			117
		],
		[
			-92,
			-608
		],
		[
			1809,
			-427
		],
		[
			1213,
			-1359
		],
		[
			-2367,
			-545
		],
		[
			-2073,
			981
		],
		[
			-1770,
			2421
		],
		[
			-2219,
			1615
		],
		[
			1240,
			1748
		],
		[
			2265,
			-272
		],
		[
			1652,
			-637
		],
		[
			1048,
			166
		],
		[
			1856,
			1008
		]
	],
	[
		[
			5696409,
			7742890
		],
		[
			-2580,
			-1237
		],
		[
			-903,
			972
		],
		[
			-1447,
			-629
		],
		[
			-1333,
			206
		],
		[
			-286,
			700
		],
		[
			-959,
			136
		],
		[
			573,
			606
		],
		[
			-304,
			1534
		],
		[
			1173,
			723
		],
		[
			-591,
			238
		],
		[
			927,
			1183
		],
		[
			500,
			250
		],
		[
			3475,
			1678
		],
		[
			2313,
			36
		],
		[
			703,
			1334
		],
		[
			2902,
			1145
		],
		[
			702,
			-1354
		],
		[
			-2399,
			-2839
		],
		[
			-494,
			-984
		],
		[
			-2505,
			-1706
		],
		[
			843,
			-913
		],
		[
			-310,
			-1079
		]
	],
	[
		[
			6054782,
			8050919
		],
		[
			1746,
			-740
		],
		[
			3968,
			696
		],
		[
			-134,
			-2082
		],
		[
			2080,
			-775
		],
		[
			-1694,
			-1445
		],
		[
			-2059,
			496
		],
		[
			-1226,
			-724
		],
		[
			-1239,
			19
		],
		[
			-1260,
			-466
		],
		[
			-477,
			421
		],
		[
			527,
			1200
		],
		[
			-312,
			746
		],
		[
			-3148,
			1039
		],
		[
			-1641,
			-534
		],
		[
			697,
			-1284
		],
		[
			-531,
			-1121
		],
		[
			-2764,
			-124
		],
		[
			-881,
			1044
		],
		[
			1516,
			1352
		],
		[
			527,
			934
		],
		[
			1594,
			316
		],
		[
			2008,
			-43
		],
		[
			957,
			848
		],
		[
			-363,
			602
		],
		[
			-1704,
			727
		],
		[
			-2065,
			1829
		],
		[
			2790,
			710
		],
		[
			1219,
			-1394
		],
		[
			2106,
			-433
		],
		[
			-523,
			-1255
		],
		[
			286,
			-559
		]
	],
	[
		[
			5698888,
			7961631
		],
		[
			540,
			-714
		],
		[
			-405,
			-707
		],
		[
			-8396,
			-3387
		],
		[
			-3677,
			2050
		],
		[
			2035,
			1337
		],
		[
			1327,
			849
		],
		[
			1109,
			-47
		],
		[
			1664,
			755
		],
		[
			1866,
			1699
		],
		[
			3304,
			671
		],
		[
			601,
			820
		],
		[
			2540,
			-291
		],
		[
			-266,
			-812
		],
		[
			-803,
			-118
		],
		[
			3,
			-966
		],
		[
			-1442,
			-1139
		]
	],
	[
		[
			6038997,
			8062053
		],
		[
			1168,
			-328
		],
		[
			662,
			1611
		],
		[
			648,
			122
		],
		[
			2080,
			-1491
		],
		[
			-1221,
			-397
		],
		[
			-946,
			207
		],
		[
			233,
			-1435
		],
		[
			-1345,
			-936
		],
		[
			-323,
			-982
		],
		[
			-869,
			-381
		],
		[
			327,
			-1087
		],
		[
			-3,
			-2171
		],
		[
			1862,
			-1130
		],
		[
			-443,
			-643
		],
		[
			-2677,
			116
		],
		[
			-1905,
			-490
		],
		[
			-661,
			2139
		],
		[
			-1917,
			1108
		],
		[
			-896,
			117
		],
		[
			-328,
			1422
		],
		[
			2596,
			-306
		],
		[
			2128,
			599
		],
		[
			350,
			1359
		],
		[
			-1297,
			1074
		],
		[
			538,
			1270
		],
		[
			-538,
			773
		],
		[
			797,
			633
		],
		[
			2334,
			889
		],
		[
			257,
			-498
		],
		[
			-611,
			-1164
		]
	],
	[
		[
			6033662,
			8044676
		],
		[
			-727,
			-1166
		],
		[
			1159,
			-1063
		],
		[
			265,
			-802
		],
		[
			-2109,
			-950
		],
		[
			-815,
			453
		],
		[
			-2978,
			708
		],
		[
			-2318,
			5
		],
		[
			-260,
			-1406
		],
		[
			-693,
			-329
		],
		[
			-1484,
			1598
		],
		[
			-1623,
			124
		],
		[
			-150,
			371
		],
		[
			1807,
			2660
		],
		[
			1206,
			944
		],
		[
			1507,
			-999
		],
		[
			3010,
			-426
		],
		[
			1685,
			682
		],
		[
			141,
			1259
		],
		[
			2122,
			367
		],
		[
			1333,
			662
		],
		[
			467,
			-454
		],
		[
			-327,
			-1294
		],
		[
			-1218,
			-944
		]
	],
	[
		[
			5703986,
			7831114
		],
		[
			-625,
			-2784
		],
		[
			121,
			-880
		],
		[
			-2361,
			-1620
		],
		[
			-2038,
			23
		],
		[
			-2429,
			704
		],
		[
			-2501,
			1004
		],
		[
			209,
			1862
		],
		[
			2219,
			823
		],
		[
			2558,
			-92
		],
		[
			440,
			442
		],
		[
			-678,
			1606
		],
		[
			1165,
			717
		],
		[
			1299,
			246
		],
		[
			2011,
			-954
		],
		[
			610,
			-1097
		]
	],
	[
		[
			6207431,
			8157540
		],
		[
			383,
			-2549
		],
		[
			2213,
			286
		],
		[
			192,
			-1278
		],
		[
			-3225,
			-4713
		],
		[
			-3847,
			1581
		],
		[
			-346,
			1387
		],
		[
			781,
			1320
		],
		[
			-1074,
			1125
		],
		[
			-1269,
			431
		],
		[
			-780,
			914
		],
		[
			136,
			665
		],
		[
			1913,
			260
		],
		[
			3778,
			-569
		],
		[
			1145,
			1140
		]
	],
	[
		[
			5693159,
			7788616
		],
		[
			3489,
			-1334
		],
		[
			1489,
			97
		],
		[
			2697,
			-1333
		],
		[
			-1650,
			-878
		],
		[
			-2893,
			94
		],
		[
			-1131,
			-388
		],
		[
			-1332,
			865
		],
		[
			-2756,
			-294
		],
		[
			-2502,
			976
		],
		[
			-1884,
			414
		],
		[
			-1788,
			-48
		],
		[
			-526,
			1463
		],
		[
			2386,
			181
		],
		[
			1235,
			-430
		],
		[
			5166,
			615
		]
	],
	[
		[
			5608006,
			7903380
		],
		[
			666,
			-539
		],
		[
			-2789,
			-2710
		],
		[
			-910,
			-413
		],
		[
			-1393,
			553
		],
		[
			-717,
			-753
		],
		[
			-1098,
			-71
		],
		[
			-1567,
			949
		],
		[
			929,
			697
		],
		[
			1160,
			-351
		],
		[
			585,
			959
		],
		[
			-3401,
			124
		],
		[
			-773,
			-287
		],
		[
			-285,
			1266
		],
		[
			-743,
			385
		],
		[
			868,
			789
		],
		[
			2157,
			-188
		],
		[
			751,
			367
		],
		[
			53,
			-815
		],
		[
			3009,
			394
		],
		[
			-162,
			854
		],
		[
			1316,
			895
		],
		[
			798,
			-514
		],
		[
			-1061,
			-714
		],
		[
			2607,
			-877
		]
	],
	[
		[
			6043432,
			8030966
		],
		[
			-5765,
			-531
		],
		[
			-1786,
			2921
		],
		[
			4416,
			1642
		],
		[
			3498,
			919
		],
		[
			492,
			-249
		],
		[
			177,
			-670
		],
		[
			-1032,
			-4032
		]
	],
	[
		[
			6216811,
			8171848
		],
		[
			-2439,
			-333
		],
		[
			-2581,
			872
		],
		[
			3166,
			3032
		],
		[
			4233,
			1396
		],
		[
			4039,
			202
		],
		[
			170,
			-490
		],
		[
			-6588,
			-4679
		]
	],
	[
		[
			5764296,
			7788566
		],
		[
			-6915,
			-2942
		],
		[
			-374,
			219
		],
		[
			1405,
			2577
		],
		[
			4151,
			1502
		],
		[
			5787,
			4241
		],
		[
			2548,
			255
		],
		[
			234,
			-441
		],
		[
			-912,
			-1093
		],
		[
			-5924,
			-4318
		]
	],
	[
		[
			5745208,
			7754731
		],
		[
			-2258,
			-107
		],
		[
			-2174,
			211
		],
		[
			-705,
			731
		],
		[
			523,
			799
		],
		[
			1196,
			429
		],
		[
			416,
			735
		],
		[
			3716,
			1093
		],
		[
			-1928,
			1429
		],
		[
			1669,
			1452
		],
		[
			888,
			-2881
		],
		[
			899,
			-715
		],
		[
			-185,
			-701
		[