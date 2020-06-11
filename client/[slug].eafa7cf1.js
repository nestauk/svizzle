import { S as SvelteComponentDev, i as init$1, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, b as detach_dev, j as attr_dev, z as toggle_class, k as add_location, l as insert_dev, m as append_dev, A as listen_dev, n as noop$1, B as bubble, r as set_data_dev, C as empty, D as getContext, E as setContext, F as create_component, G as claim_component, H as mount_component, x as transition_in, y as transition_out, I as destroy_component, a as space, c as claim_space, J as group_outros, K as check_outros, o as validate_each_argument, u as destroy_each, L as globals, M as null_to_empty, N as validate_each_keys, O as createEventDispatcher, P as beforeUpdate, Q as afterUpdate, R as svg_element, T as run_all, U as add_render_callback, V as add_resize_listener, W as update_keyed_each, X as binding_callbacks, Y as destroy_block, Z as assign, q as query_selector_all, _ as get_spread_update, $ as get_spread_object } from './client.e3a9bce3.js';

/**
* @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
* @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
* @version 0.58.0
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
 * var truth = _.always(true);
 *
 * truth() // => true
 * truth(false) // => true
 * truth(1, 2) // => true
 *
 * // the value being returned is actually the
 * // very same value passed to the function
 * var foo = {bar: "baz"};
 * var alwaysFoo = _.always(foo);
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
function always (value) {
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
 * var testObject = {};
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
function areSVZ (a, b) {
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
function binary (fn) {
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
function clamp (n, min, max) {
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
 * var __ = _.__;
 * var users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * var isKeyTrue = _.partial(_.hasKeyValue, [__, true]);
 * var isActive = isKeyTrue("active");
 * var hasConfirmedMail = isKeyTrue("confirmedMail");
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
function partial (fn, args) {
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
function _makePartial3 (fn, shouldAritize) {
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
 * var foo = {bar: "baz"};
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
function identity (value) {
    return value;
}

/**
 * Returns a function that is the composition of the functions given as parameters.
 * The first function consumes the result of the function that follows.
 * @example
 * var sayHi = function (name) { return "Hi, " + name; };
 * var capitalize = function (s) {
 *     return s[0].toUpperCase() + s.substr(1).toLowerCase();
 * };
 * var fixNameAndSayHi = _.compose(sayHi, capitalize);
 *
 * sayHi("bOb") // => "Hi, bOb"
 * fixNameAndSayHi("bOb") // "Hi, Bob"
 *
 * var users = [{name: "fred"}, {name: "bOb"}];
 * var sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
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
function compose (a, b) {
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
function _toArrayLength (value) {
    return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}

/* eslint-disable jsdoc/require-returns-check */

/**
 * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment:</caption>
 * var addClass = _.curry(function (className, element) {
 *     element.classList.add(className);
 * });
 * var paragraphs = document.querySelectorAll("#some-container p");
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
function forEach (arrayLike, iteratee) {
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
 * var join = _.generic(Array.prototype.join);
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
function isNull (value) {
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
function isUndefined (value) {
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
function isNil (value) {
    return isNull(value) || isUndefined(value);
}

/**
 * Curries a function of arity 2.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry2 (fn, isRightCurry) {
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
 * var john = {name: "John", surname: "Doe"};
 * var isJohn = _.isSVZ(john);
 * var isZero = _.isSVZ(0);
 * var isReallyNaN = _.isSVZ(NaN);
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
 * _.map(["Joe", "Mario", "Jane"], _.invoker("toUpperCase")) // => ["JOE", "MARIO", "JANE"]
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
function map (arrayLike, iteratee) {
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
 * var square = function (n) { return n * n; };
 * var getSquares = _.mapWith(square);
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
 * @returns {function}
 */
var mapWith = _curry2(map, true);

/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * var f1 = _.partial(_.list, ["a", "b", "c"]);
 * var f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * var __ = _.__;
 * var f1 = _.partial(_.list, ["a", __, __, "d"]);
 * var f2 = _.partialRight(_.list, ["a", __, __, "d"]);
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
function partialRight (fn, args) {
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
function _makeReducer (step) {
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
 * var arr = [1, 2, 3, 4, 5];
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
function _toInteger (value) {
    var n = +value;

    if (n !== n) { // eslint-disable-line no-self-compare
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
 * var arr = [1, 2, 3, 4, 5];
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
function slice (arrayLike, start, end) {
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
 * var arr = [1, 2, 3, 4, 5];
 * var s = "hello";
 * var dropFirstAndLast = _.sliceAt(1, -1);
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
 * var x = 5;
 * var y = new Number(5);
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
function type (value) {
    return objectProtoToString.call(value).slice(8, -1);
}

/**
 * Appends the given value at the end of a copy of the provided array-like object.
 * @example
 * var arr = [1, 2, 3, 4];
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
function appendTo (arrayLike, value) {
    return slice(arrayLike, 0, arrayLike.length).concat([value]);
}

/**
 * A curried version of {@link module:lamb.appendTo|appendTo} that uses the value to append
 * to build a function expecting the array-like object to act upon.
 * @example
 * var arr = [1, 2, 3, 4];
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
 * var numbers = [0, 1, 2, 3, NaN];
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
function isIn (arrayLike, value) {
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
 * var containsNaN = _.contains(NaN);
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
function _groupWith (makeValue) {
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
 * var persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 17},
 *     {"name": "Paolo", "age": 15}
 * ];
 * var getAgeStatus = function (person) { return person.age >= 18 ? "adult" : "minor"; };
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
 * var persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * var getCityOrUnknown = _.adapter([_.getKey("city"), _.always("Unknown")]);
 * var countByCity = _.countBy(getCityOrUnknown);
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
 * var isLowerCase = function (s) { return s.toLowerCase() === s; };
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
function filter (arrayLike, predicate) {
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var isOdd = _.not(isEven);
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
function not (predicate) {
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
 * var data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * var uniquesById = _.uniquesBy(_.getKey("id"));
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
function uniquesBy (iteratee) {
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
 * var a1 = [1, 2, 1, 3, 4];
 * var a2 = [2, 4, 5, 6];
 * var a3 = [3, 4, 5, 2, 1];
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
function difference (arrayLike, other) {
    var isNotInOther = partial(not(isIn), [other]);

    return uniques(filter(arrayLike, isNotInOther));
}

/**
 * Builds an array without the first <code>n</code> elements of the given array or array-like object.
 * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * var arr = [1, 2, 3, 4, 5];
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
function dropFrom (arrayLike, n) {
    return slice(arrayLike, n, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.dropFrom|dropFrom} that expects the number of elements
 * to drop to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.dropFrom|dropFrom} about passing a
 * negative <code>n</code>.
 * @example
 * var drop2 = _.drop(2);
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
function _getLastHitIndex (arrayLike, predicate, fromLast) {
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
function _takeOrDropWhile (isTake, fromLast) {
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var dropLastWhileIsEven = _.dropLastWhile(isEven);
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var dropWhileIsEven = _.dropWhile(isEven);
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
function _makeArrayChecker (defaultResult) {
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
 * var persons = [
 *     {"name": "Jane", "age": 12, active: true},
 *     {"name": "John", "age": 40, active: true},
 *     {"name": "Mario", "age": 17, active: true},
 *     {"name": "Paolo", "age": 15, active: true}
 * ];
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
 * var isActive = _.hasKeyValue("active", true);
 *
 * _.everyIn(persons, isAdult) // => false
 * _.everyIn(persons, isActive) // => true
 *
 * @example <caption>Showing the difference with <code>Array.prototype.every</code>:</caption>
 * var isDefined = _.not(_.isUndefined);
 * var arr = new Array(5);
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
 * var data = [2, 3, 5, 6, 8];
 * var isEven = function (n) { return n % 2 === 0; };
 * var allEvens = _.every(isEven);
 * var allIntegers = _.every(_.isInteger);
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
 * var isLowerCase = function (s) { return s.toLowerCase() === s; };
 * var getLowerCaseEntries = _.filterWith(isLowerCase);
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
function _findIndex (arrayLike, predicate, fromLast) {
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
 * var persons = [
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
function findIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, false);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object and returns it if
 * the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * var persons = [
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
function find (arrayLike, predicate) {
    var idx = findIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findIndex|findIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEvenIdx = _.findIndexWhere(isEven);
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
 * var persons = [
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
function findLastIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, true);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from the end
 * and returns it if the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * var persons = [
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
function findLast (arrayLike, predicate) {
    var idx = findLastIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findLastIndex|findLastIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var findLastEvenIdx = _.findLastIndexWhere(isEven);
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEven = _.findLastWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 6, 7]) // => 6
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastWhere|findLastWhere}
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var findEven = _.findWhere(isEven);
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
 * var words = ["foo", "bar"];
 * var toCharArray = function (s) { return s.split(""); };
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
function flatMap (array, iteratee) {
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
 * var toCharArray = function (s) { return s.split(""); };
 * var wordsToCharArray = _.flatMapWith(toCharArray);
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
function _flatten (array, isDeep, output, idx) {
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
 * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
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
function _toNaturalIndex (idx, len) {
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
 * var arr = [1, 2, 3, 4, 5];
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
function getIndex (arrayLike, index) {
    var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));

    return idx === idx ? arrayLike[idx] : void 0; // eslint-disable-line no-self-compare
}

/**
 * A curried version of {@link module:lamb.getIndex|getIndex} that uses the provided index
 * to build a function expecting the array-like object holding the element we want to retrieve.
 * @example
 * var getFifthElement = _.getAt(4);
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
 * var persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * var getCity = _.getKey("city");
 * var personsByCity = _.group(persons, getCity);
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
 * var getCityOrUnknown = _.adapter([getCity, _.always("Unknown")]);
 *
 * var personsByCity = _.group(persons, getCityOrUnknown);
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
 * var persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 18},
 *     {"name": "Paolo", "age": 15}
 * ];
 *
 * var getAgeStatus = function (person) { return person.age > 20 ? "over 20" : "under 20"; };
 * var groupByAgeStatus = _.groupBy(getAgeStatus);
 *
 * var personsByAgeStatus = groupByAgeStatus(persons);
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
 * var users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * var indexedUsers = _.index(users, _.getKey("id"));
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
 * var users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * var indexedUsers = _.index(users, _.getKey("name"));
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
 * var users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"}
 * ];
 * var indexByID = _.indexBy(_.getKey("id"));
 *
 * var indexedUsers = indexByID(users);
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
 * var arr = [1, 2, 3, 4, 5];
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
function insert (arrayLike, index, element) {
    var result = slice(arrayLike, 0, arrayLike.length);

    result.splice(index, 0, element);

    return result;
}

/**
 * Builds a partial application of {@link module:lamb.insert|insert}
 * expecting the array-like object to act upon.
 * @example
 * var arr = [1, 2, 3, 4, 5];
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
 * var a1 = [1, 2, 3, 4];
 * var a2 = [2, 5, 4, 2, 6];
 * var a3 = [5, 6, 7];
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
function intersection (a, b) {
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
 * var words = ["foo", "bar", "baz"];
 *
 * _.join(words, "-") // => "foo-bar-baz"
 *
 * @example <caption>Showing the differences with the native array method:</caption>
 * var mixed = [1, null, 2, undefined, 3, NaN, 4, 5];
 * var numbers = [1, 2, 3];
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
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {String} separator
 * @returns {String}
 */
function join (arrayLike, separator) {
    return map(arrayLike, String).join(String(separator));
}

/**
 * A curried version of {@link module:lamb.join|join} that accepts an optional
 * separator and builds a function expecting the array-like object to act upon.<br/>
 * Please refer to the description and examples of {@link module:lamb.join|join}
 * to understand the differences with the native array method.
 * @example
 * var words = ["foo", "bar", "baz"];
 * var joinWithDash = _.joinWith("-");
 *
 * joinWithDash(words) // => "foo-bar-baz"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.join|join}
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
function _argsToArrayFrom (idx) {
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
function partition (arrayLike, predicate) {
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
 * var users = [
 *     {"name": "Jane", "surname": "Doe", "active": false},
 *     {"name": "John", "surname": "Doe", "active": true},
 *     {"name": "Mario", "surname": "Rossi", "active": true},
 *     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * ];
 * var isActive = _.hasKeyValue("active", true);
 * var splitByActiveStatus = _.partitionWith(isActive);
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
 * var user = {name: "John"};
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
function getIn (obj, key) {
    return obj[key];
}

/**
 * A curried version of {@link module:lamb.getIn|getIn}.<br/>
 * Receives a property name and builds a function expecting the object from which we want to retrieve
 * the property.
 * @example
 * var user1 = {name: "john"};
 * var user2 = {name: "jane"};
 * var getName = _.getKey("name");
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
 * "Plucks" the values of the specified key from a list of objects.
 * @example
 * var persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 *
 * _.pluck(persons, "age") // => [12, 40, 18, 15]
 *
 * var lists = [
 *     [1, 2],
 *     [3, 4, 5],
 *     [6]
 * ];
 *
 * _.pluck(lists, "length") // => [2, 3, 1]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pluckKey|pluckKey}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {String} key
 * @returns {Array}
 */
function pluck (arrayLike, key) {
    return map(arrayLike, getKey(key));
}

/**
 * A curried version of {@link module:lamb.pluck|pluck} expecting the key to retrieve to
 * build a function waiting for the array-like object to act upon.
 * @example
 * var persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 * var getAges = _.pluckKey("age");
 *
 * getAges(persons) // => [12, 40, 18, 15]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pluck|pluck}
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */
var pluckKey = compose(mapWith, getKey);

/**
 * Creates an array copy of the given array-like object without the
 * specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 *
 * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
 *
 * @example <caption>It's not the same as {@link module:lamb.difference|difference}:</caption>
 *
 * var arr = [1,1,2,3,4,4,5];
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
function pullFrom (arrayLike, values) {
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
 * var scores = [40, 20, 30, 10];
 * var newScores = [30, 10];
 * var pullNewScores = _.pull(newScores);
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
 * var arr = [1, 2, 3, 4, 5];
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
 * var arr = [1, 2, 3];
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
function reverse (arrayLike) {
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
 * var arr = [1, 2, 3, 4, 5];
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
function rotate (arrayLike, amount) {
    var len = arrayLike.length;
    var shift = amount % len;

    return slice(arrayLike, -shift, len).concat(slice(arrayLike, 0, -shift));
}

/**
 * A curried version of {@link module:lamb.rotate|rotate}.<br/>
 * Uses the given amount to build a function expecting the array to rotate by that amount.
 * @example
 * var arr = [1, 2, 3, 4, 5];
 * var rotateByTwo = _.rotateBy(2);
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
function _setIndex (arrayLike, idx, value, updater) {
    var result = slice(arrayLike, 0, arrayLike.length);
    var n = _toNaturalIndex(idx, result.length);

    if (n === n) { // eslint-disable-line no-self-compare
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
 * var arr = [1, 2, 3, 4, 5];
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
function aritize (fn, arity) {
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
 * var arr = [1, 2, 3];
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
 * var arr = [1, 2, [3, 4, [5, 6]], 7, 8];
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
 * var persons = [
 *     {"name": "Jane", "age": 12, active: false},
 *     {"name": "John", "age": 40, active: false},
 *     {"name": "Mario", "age": 17, active: false},
 *     {"name": "Paolo", "age": 15, active: false}
 * ];
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
 * var isActive = _.hasKeyValue("active", true);
 *
 * _.someIn(persons, isAdult) // => true
 * _.someIn(persons, isActive) // => false
 *
 * @example <caption>Showing the difference with <code>Array.prototype.some</code>:</caption>
 * var arr = new Array(5);
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
 * var data = [1, 3, 5, 6, 7, 8];
 * var isEven = function (n) { return n % 2 === 0; };
 * var containsEvens = _.some(isEven);
 * var containsStrings = _.some(_.isType("String"));
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
function _compareWith (criteria) {
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
function _comparer (a, b) {
    var result = 0;

    if (typeof a !== typeof b) {
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
function _sorter (reader, isDescending, comparer) {
    if (typeof reader !== "function" || reader === identity) {
        reader = null;
    }

    if (typeof comparer !== "function") {
        comparer = _comparer;
    }

    return {
        isDescending: isDescending === true,
        compare: function (a, b) {
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
function _makeCriterion (criterion) {
    return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}

/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */
function _makeCriteria (sorters) {
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
 * var persons = [
 *     {"name": "John", "surname" :"Doe"},
 *     {"name": "Mario", "surname": "Rossi"},
 *     {"name": "John", "surname" :"Moe"},
 *     {"name": "Jane", "surname": "Foe"}
 * ];
 *
 * var personsByName = _.sort(persons, [_.getKey("name")]);
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
 * var personsByNameAscSurnameDesc = _.sort(persons, [
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
 * var localeSorter = new Intl.Collator("it");
 * var chars = ["a", "è", "à", "é", "c", "b", "e"];
 *
 * _.sort(chars, [localeSorter]) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * var localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
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
function sort (arrayLike, sorters) {
    var criteria = _makeCriteria(sorters);
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = { value: arrayLike[i], index: i };
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
function _getInsertionIndex (array, element, comparer, start, end) {
    if (array.length === 0) {
        return 0;
    }

    var pivot = (start + end) >> 1;
    var result = comparer(
        { value: element, index: pivot },
        { value: array[pivot], index: pivot }
    );

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
 * var persons = [
 *     {"name": "jane", "surname": "doe"},
 *     {"name": "John", "surname": "Doe"},
 *     {"name": "Mario", "surname": "Rossi"}
 * ];
 *
 * var getLowerCaseName = _.compose(
 *     _.invoker("toLowerCase"),
 *     _.getKey("name")
 * );
 *
 * var result = _.sortedInsert(
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
function sortedInsert (arrayLike, element, sorters) {
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
 * var arr = [1, 2, 3, 4, 5];
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
function takeFrom (arrayLike, n) {
    return slice(arrayLike, 0, n);
}

/**
 * A curried version of {@link module:lamb.takeFrom|takeFrom} that expects the number of elements
 * to retrieve to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.takeFrom|takeFrom} about passing a
 * negative <code>n</code>.
 * @example
 * var take2 = _.take(2);
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var takeLastWhileIsEven = _.takeLastWhile(isEven);
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var takeWhileIsEven = _.takeWhile(isEven);
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
 * var zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
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
function transpose (arrayLike) {
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
function _makeTypeErrorFor (value, desiredType) {
    return new TypeError("Cannot convert " + type(value).toLowerCase() + " to " + desiredType);
}

/**
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * var __ = _.__;
 * var square = _.partial(Math.pow, [__, 2]);
 * var getMaxAndSquare = _.pipe([Math.max, square]);
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
function pipe (functions) {
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
 * var unionByFloor = _.unionBy(Math.floor);
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
function unionBy (iteratee) {
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
 * var arr = ["a", "b", "c"];
 * var toUpperCase = _.invoker("toUpperCase");
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
function updateAt (index, updater) {
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
 * var arr = ["a", "b", "c"];
 * var toUpperCase = _.invoker("toUpperCase");
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
function zip (a, b) {
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
function application (fn, args) {
    return fn.apply(this, Object(args));
}

/**
 * A left-curried version of {@link module:lamb.application|application}. Expects the function
 * to apply and builds a function waiting for the arguments array.
 * @example
 * var arrayMax = _.apply(Math.max);
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
 * var data = [3, 4];
 * var applyToData = _.applyTo(data);
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
function _asPartial (fn, argsHolder) {
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
 * var __ = _.__;
 * var f = _.asPartial(function (a, b, c) {
 *     return a + b + c;
 * });
 *
 * f(4, 3, 2) // => 9
 * f(4, __, 2)(3) // => 9
 * f(__, 3, __)(4, __)(2) // => 9
 *
 * @example <caption>Exploiting optional parameters:</caption>
 * var __ = _.__;
 * var f = _.asPartial(function (a, b, c) {
 *     return a + b + (c || 0);
 * });
 *
 * var addFive = f(5, __);
 * addFive(2) // => 7
 *
 * var addNine = addFive(4, __);
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
function asPartial (fn) {
    return _asPartial(fn, []);
}

/**
 * Accepts a series of functions and builds a new function. The functions in the series
 * will then be applied, in order, with the values received by the function built with
 * <code>collect</code>.<br/>
 * The collected results will be returned in an array.
 * @example
 * var user = {
 *     id: "jdoe",
 *     name: "John",
 *     surname: "Doe",
 *     scores: [2, 4, 7]
 * };
 * var getIDAndLastScore = _.collect([_.getKey("id"), _.getPath("scores.-1")]);
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * var minAndMax = _.collect([Math.min, Math.max]);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function collect (functions) {
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
function _currier (fn, arity, isRightCurry, isAutoCurry, argsHolder) {
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
function _curry3 (fn, isRightCurry) {
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
function _curry (fn, arity, isRightCurry, isAutoCurry) {
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
 * var makeWithKeys = _.curry(_.make);
 * var makePerson = makeWithKeys(["name", "surname"]);
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
function curry (fn, arity) {
    return _curry(fn, arity, false);
}

/**
 * Builds an auto-curried function. The resulting function can be called multiple times with
 * any number of arguments, and the original function will be applied only when the specified
 * (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
 * for right currying.
 * @example
 * var collectFourElements = _.curryable(_.list, 4);
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
function curryable (fn, arity) {
    return _curry(fn, arity, false, true);
}

/**
 * Same as {@link module:lamb.curryable|curryable}, but currying starts from the rightmost argument.
 * @example
 * var collectFourElements = _.curryableRight(_.list, 4);
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
function curryableRight (fn, arity) {
    return _curry(fn, arity, true, true);
}

/**
 * Same as {@link module:lamb.curry|curry}, but currying starts from the rightmost argument.
 * @example
 * var makeWithValues = _.curryRight(_.make);
 * var makeJohnDoe = makeWithValues(["John", "Doe"]);
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
function curryRight (fn, arity) {
    return _curry(fn, arity, true);
}

/**
 * Returns a function that will execute the given function only if it stops being called for the
 * specified timespan.<br/>
 * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call
 * happens immediately.
 * @example <caption>A common use case of <code>debounce</code> in a browser environment:</caption>
 * var updateLayout = function () {
 *     // some heavy DOM operations here
 * };
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
function debounce (fn, timespan) {
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
function flip (fn) {
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
 * var getFirstArg = _.getArgAt(0);
 * var getLastArg = _.getArgAt(-1);
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
function getArgAt (idx) {
    return function () {
        return arguments[_toNaturalIndex(idx, arguments.length)];
    };
}

/* eslint-disable jsdoc/check-param-names */

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * received by {@link module:lamb.invoker|invoker}, with the final set of <code>args</code>,
 * if present.
 * @private
 * @param {String} methodName
 * @param {Array} boundArgs
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */
function _invoker (methodName, boundArgs, target) {
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
 * @example <caption>Basic polymorphism with <code>invoker</code>:</caption>
 * var polySlice = _.invoker("slice");
 *
 * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
 * polySlice("Hello world", 1, 3) // => "el"
 *
 * @example <caption>With bound arguments:</caption>
 * var substrFrom2 = _.invoker("substr", [2]);
 * substrFrom2("Hello world") // => "llo world"
 * substrFrom2("Hello world", 5) // => "llo w"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invokerOn|invokerOn}
 * @since 0.1.0
 * @param {String} methodName
 * @param {ArrayLike} [boundArgs=[]]
 * @returns {Function}
 */
function invoker (methodName, boundArgs) {
    return partial(_invoker, [methodName, boundArgs]);
}

/**
 * Accepts an object and builds a function expecting a method name, and optionally arguments,
 * to call on such object.
 * Like {@link module:lamb.invoker|invoker}, if no method with the given name is found the
 * function will return <code>undefined</code>.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var arr = [1, 2, 3, 4, 5];
 * var invokerOnArr = _.invokerOn(arr);
 *
 * invokerOnArr("filter", isEven) // => [2, 4]
 * invokerOnArr("slice", 1, 3) // => [2, 3]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invoker|invoker}
 * @since 0.15.0
 * @param {Object} target
 * @returns {Function}
 */
function invokerOn (target) {
    return partial(_invoker, [__, [], target]);
}

/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * var __ = _.__;
 * var sumArray = _.reduceWith(_.sum);
 * var sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * var square = _.partial(Math.pow, [__, 2]);
 * var sumSquares = _.mapArgs(sumArgs, square);
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
function mapArgs (fn, mapper) {
    return pipe([list, mapWith(mapper), apply(fn)]);
}

/**
 * Builds a function that allows to "tap" into the arguments of the original one.
 * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
 * If a "tapper" isn't found the argument is passed as it is.
 * @example
 * var someObject = {count: 5};
 * var someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
 * var getDataAmount = _.tapArgs(_.sum, [_.getKey("count"), _.getKey("length")]);
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
function tapArgs (fn, tappers) {
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
 * var log = _.throttle(console.log.bind(console), 5000);
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
function throttle (fn, timespan) {
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
 * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
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
function unary (fn) {
    return function (a) {
        return fn.call(this, a);
    };
}

/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in synergy with {@link module:lamb.case|case} and
 * {@link module:lamb.invoker|invoker}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * var isEven = function (n) { return n % 2 === 0; };
 * var filterString = _.compose(_.joinWith(""), _.filter);
 * var filterAdapter = _.adapter([
 *     _.invoker("filter"),
 *     _.case(_.isType("String"), filterString)
 * ]);
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // by its nature is composable
 * var filterWithDefault = _.adapter([filterAdapter, _.always("Not implemented")]);
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.case|case}
 * @see {@link module:lamb.invoker|invoker}
 * @since 0.6.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function adapter (functions) {
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
function _checkPredicates (checkAll) {
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var isPositiveEven = _.allOf([isEven, _.isGT(0)]);
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
 * var users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * var isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * var isSuperUser = _.anyOf([isInGroup("admin"), isInGroup("root")]);
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
 * var testObject = {};
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
function areSame (a, b) {
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
 * var halveIfNumber = _.case(_.isType("Number"), _.divideBy(2));
 *
 * halveIfNumber(2) // => 1
 * halveIfNumber("2") // => undefined
 *
 * @alias module:lamb.case
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
function case_ (predicate, fn) {
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
 * var isEven = function (n) { return n % 2 === 0};
 * var halveEvenAndDoubleOdd = _.condition(isEven, _.divideBy(2), _.multiplyBy(2));
 *
 * halveEvenAndDoubleOdd(5) // => 10
 * halveEvenAndDoubleOdd(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.2.0
 * @param {Function} predicate
 * @param {Function} trueFn
 * @param {Function} falseFn
 * @returns {Function}
 */
function condition (predicate, trueFn, falseFn) {
    return function () {
        return (predicate.apply(this, arguments) ? trueFn : falseFn).apply(this, arguments);
    };
}

/**
 * Verifies that the first given value is greater than the second.<br/>
 * Wraps the native <code>&gt;</code> operator within a function.
 * @example
 * var pastDate = new Date(2010, 2, 12);
 * var today = new Date();
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
function gt (a, b) {
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
function gte (a, b) {
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
 * var john = {name: "John", surname: "Doe"};
 * var isJohn = _.is(john);
 * var isNegativeZero = _.is(-0);
 * var isReallyNaN = _.is(NaN);
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
 * var isGreaterThan5 = _.isGT(5);
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
 * var isPositiveOrZero = _.isGTE(0);
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
 * var pastDate = new Date(2010, 2, 12);
 * var today = new Date();
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
function lt (a, b) {
    return a < b;
}

/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * var isLessThan5 = _.isLT(5);
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
function lte (a, b) {
    return a <= b;
}

/**
 * A right curried version of {@link module:lamb.lte|lte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than or equal to the one received by the predicate.
 * @example
 * var isNegativeOrZero = _.isLTE(0);
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
 * var isEven = function (n) { return n % 2 === 0};
 * var halveUnlessIsEven = _.unless(isEven, _.divideBy(2));
 *
 * halveUnlessIsEven(5) // => 2.5
 * halveUnlessIsEven(6) // => 6
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function unless (predicate, fn) {
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
 * var isEven = function (n) { return n % 2 === 0; };
 * var halveIfEven = _.when(isEven, _.divideBy(2));
 *
 * halveIfEven(5) // => 5
 * halveIfEven(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.case|case}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function when (predicate, fn) {
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
function sum (a, b) {
    return a + b;
}

/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * var add5 = _.add(5);
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
function subtract (a, b) {
    return a - b;
}

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * var deduct5 = _.deduct(5);
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
function divide (a, b) {
    return a / b;
}

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * var halve = divideBy(2);
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
 * var fibonacci = function (n, idx, results) {
 *     return n + (results[idx - 1] || 0);
 * };
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
function generate (start, len, iteratee) {
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
function isFinite_ (value) {
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
function isInteger (value) {
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
function isSafeInteger (value) {
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
function modulo (a, b) {
    return a - (b * Math.floor(a / b));
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
function multiply (a, b) {
    return a * b;
}

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * var double = _.multiplyBy(2);
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
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _forceToNumber (value) {
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
function range (start, limit, step) {
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
 * var isOdd = function (n) { return _.remainder(n, 2) === 1; };
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
function remainder (a, b) {
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
function _safeEnumerables (obj) {
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
function _isEnumerable (obj, key) {
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
function _getPathKey (target, key, includeNonEnumerables) {
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
function _getPathInfo (obj, parts, walkNonEnumerables) {
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

    return i === len ? { isValid: true, target: target } : { isValid: false, target: void 0 };
}

/**
 * Splits a sting path using the provided separator and returns an array
 * of path parts.
 * @private
 * @param {String} path
 * @param {String} separator
 * @returns {String[]}
 */
function _toPathParts (path, separator) {
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
 * var user = {
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
function getPathIn (obj, path, separator) {
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
 * var user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         username: "jdoe",
 *         password: "abc123",
 *         passwordConfirm: "abc123"
 *     }
 * };
 * var pwdMatch = _.checker(
 *     _.areSame,
 *     "Passwords don't match",
 *     ["login.password", "login.passwordConfirm"]
 * );
 *
 * pwdMatch(user) // => []
 *
 * var newUser = _.setPathIn(user, "login.passwordConfirm", "avc123");
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
function checker (predicate, message, keyPaths, pathSeparator) {
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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * var foo = Object.create(baseFoo, {
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
function fromPairs (pairsList) {
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
 *  var user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     }
 * };
 *
 * var getPwd = _.getPath("login.password");
 * var getUsername = _.getPath("login/user.name", "/");
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
 * var user1 = {name: "john"};
 *
 * _.has(user1, "name") // => true
 * _.has(user1, "surname") // => false
 * _.has(user1, "toString") // => true
 *
 * var user2 = Object.create(null);
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
function has (obj, key) {
    if (typeof obj !== "object" && !isUndefined(obj)) {
        obj = Object(obj);
    }

    return key in obj;
}

/**
 * Curried version of {@link module:lamb.has|has}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * var user1 = {name: "john"};
 * var user2 = {};
 * var hasName = _.hasKey("name");
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
 * var user = {name: "john"};
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
 * var user = {name: "john"};
 * var hasOwnName = _.hasOwnKey("name");
 * var hasOwnToString = _.hasOwnToString("toString");
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
 * var hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
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
function hasKeyValue (key, value) {
    return function (obj) {
        return isUndefined(value) ? has(obj, key) && obj[key] === value : areSVZ(value, obj[key]);
    };
}

/**
 * Builds a predicate to check if the given path exists in an object and holds the desired value.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * var user = {
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
 * var isMale = _.hasPathValue("personal.gender", "M");
 * var hasPassedFirstTest = _.hasPathValue("scores.0.passed", true);
 * var hasPassedLastTest = _.hasPathValue("scores.-1.passed", true);
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
function hasPathValue (path, value, separator) {
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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * var foo = Object.create(baseFoo, {
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
 * var users = [
 *     {name: "John", age: 25},
 *     {name: "Jane", age: 15},
 * ];
 * var isAdult = _.keySatisfies(_.isGTE(18), "age");
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
function keySatisfies (predicate, key) {
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
function make (names, values) {
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
 * var weights = {
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
function mapValues (source, fn) {
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
 * var incValues = _.mapValuesWith(_.add(1));
 * var results = {
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
function _merge (getKeys, a, b) {
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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * var foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * var bar = {d: 4};
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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * var foo = Object.create(baseFoo, {
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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * var foo = Object.create(baseFoo, {
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
 * var user = {
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
function pathExistsIn (obj, path, separator) {
    return _getPathInfo(obj, _toPathParts(path, separator), true).isValid;
}

/**
 * Builds a partial application of {@link module:lamb.pathExistsIn|pathExistsIn} using the given
 * path and the optional separator. The resulting function expects the object to check.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * var user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * var hasCity = _.pathExists("address.city");
 * var hasCountry = _.pathExists("address.country");
 * var hasAtLeastThreeScores = _.pathExists("scores.2");
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
 * var user = {
 *     name: "John",
 *     performance: {
 *         scores: [1, 5, 10]
 *     }
 * };
 *
 * var gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
 * var hadAGoodStart = _.pathSatisfies(_.isGT(6), "performance.scores.0");
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
function pathSatisfies (predicate, path, separator) {
    return function (obj) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return predicate.call(this, pathInfo.target);
    };
}

/**
 * Returns an object containing only the specified properties of the given object.<br/>
 * Non existent properties will be ignored.
 * @example
 * var user = {name: "john", surname: "doe", age: 30};
 *
 * _.pick(user, ["name", "age"]) // => {"name": "john", "age": 30};
 * _.pick(user, ["name", "email"]) // => {"name": "john"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIf|pickIf}, {@link module:lamb.pickKeys|pickKeys}
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} whitelist
 * @returns {Object}
 */
function pick (source, whitelist) {
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
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be included in the resulting object.
 * @example
 * var user = {name: "john", surname: "doe", age: 30};
 * var pickIfIsString = _.pickIf(_.isType("String"));
 *
 * pickIfIsString(user) // => {name: "john", surname: "doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys}
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
function pickIf (predicate) {
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
 * A curried version of {@link module:lamb.pick|pick}, expecting a whitelist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * var user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * var getUserInfo = _.pickKeys(["id", "active"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * var users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * var select = _.compose(_.mapWith, _.pickKeys);
 * var selectUserInfo = select(["id", "active"]);
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
 * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickIf|pickIf}
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.35.0
 * @param {String[]} whitelist
 * @returns {Function}
 */
var pickKeys = _curry2(pick, true);

/**
 * Creates a copy of the given object with its enumerable keys renamed as
 * indicated in the provided lookup table.
 * @example
 * var person = {"firstName": "John", "lastName": "Doe"};
 * var keysMap = {"firstName": "name", "lastName": "surname"};
 *
 * _.rename(person, keysMap) // => {"name": "John", "surname": "Doe"}
 *
 * @example <caption>It's safe using it to swap keys:</caption>
 * var keysMap = {"firstName": "lastName", "lastName": "firstName"};
 *
 * _.rename(person, keysMap) // => {"lastName": "John", "firstName": "Doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.renameKeys|renameKeys}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} source
 * @param {Object} keysMap
 * @returns {Object}
 */
function rename (source, keysMap) {
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
 * A curried version of {@link module:lamb.rename|rename} expecting a
 * <code>keysMap</code> to build a function waiting for the object to act upon.
 * @example
 * var persons = [
 *     {"firstName": "John", "lastName": "Doe"},
 *     {"first_name": "Mario", "last_name": "Rossi"},
 * ];
 * var normalizeKeys = _.renameKeys({
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
 * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} keysMap
 * @returns {Function}
 */
var renameKeys = _curry2(rename, true);

/**
 * Uses the provided function as a <code>keysMap</code> generator and returns
 * a function expecting the object whose keys we want to {@link module:lamb.rename|rename}.
 * @example
 * var person = {"NAME": "John", "SURNAME": "Doe"};
 * var arrayToLower = _.mapWith(_.invoker("toLowerCase"));
 * var makeLowerKeysMap = function (source) {
 *     var sourceKeys = _.keys(source);
 *
 *     return _.make(sourceKeys, arrayToLower(sourceKeys));
 * };
 * var lowerKeysFor = _.renameWith(makeLowerKeysMap);
 *
 * lowerKeysFor(person) // => {"name": "John", "surname": "doe"};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameKeys|renameKeys}
 * @since 0.26.0
 * @param {Function} fn
 * @returns {Function}
 */
function renameWith (fn) {
    return function (source) {
        return rename(source, fn(source));
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
function _setIn (source, key, value) {
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
 * var user = {name: "John", surname: "Doe", age: 30};
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
function setIn (source, key, value) {
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
 * var user = {name: "John", surname: "Doe", age: 30};
 * var setAgeTo40 = _.setKey("age", 40);
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
function _isArrayIndex (target, key) {
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
function _setPathIn (obj, parts, value) {
    var key = parts[0];
    var partsLen = parts.length;
    var v;

    if (partsLen === 1) {
        v = value;
    } else {
        var targetKey = _getPathKey(obj, key, false);

        v = _setPathIn(
            isUndefined(targetKey) ? targetKey : obj[targetKey],
            slice(parts, 1, partsLen),
            value
        );
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
 * var user = {id: 1, status: {active : false, scores: [2, 4, 6]}};
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
 * var user = {id: 1, scores: [
 *     {value: 2, year: "2000"},
 *     {value: 4, year: "2001"},
 *     {value: 6, year: "2002"}
 * ]};
 *
 * var newUser = _.setPathIn(user, "scores.0.value", 8);
 * // "newUser" holds:
 * // {id: 1, scores: [
 * //     {value: 8, year: "2000"},
 * //     {value: 4, year: "2001"},
 * //     {value: 6, year: "2002"}
 * // ]}
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
function setPathIn (source, path, value, separator) {
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
 * var user = {id: 1, status: {active: false}};
 * var activate = _.setPath("status.active", true);
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
function setPath (path, value, separator) {
    return function (source) {
        return setPathIn(source, path, value, separator);
    };
}

/**
 * Returns a copy of the source object without the specified properties.
 * @example
 * var user = {name: "john", surname: "doe", age: 30};
 *
 * _.skip(user, ["name", "age"]) // => {surname: "doe"};
 * _.skip(user, ["name", "email"]) // => {surname: "doe", age: 30};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.skipKeys|skipKeys}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} blacklist
 * @returns {Object}
 */
function skip (source, blacklist) {
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
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be omitted in the resulting object.
 * @example
 * var user = {name: "john", surname: "doe", age: 30};
 * var skipIfIstring = _.skipIf(_.isType("String"));
 *
 * skipIfIstring(user) // => {age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipKeys|skipKeys}
 * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
var skipIf = compose(pickIf, not);

/**
 * A curried version of {@link module:lamb.skip|skip}, expecting a blacklist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * var user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * var getUserInfo = _.skipKeys(["name", "surname"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * var users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * var discard = _.compose(_.mapWith, _.skipKeys);
 * var discardNames = discard(["name", "surname"]);
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
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pick|pick}, {@link module:lamb.pickKeys|pickKeys},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.35.0
 * @param {String[]} blacklist
 * @returns {Function}
 */
var skipKeys = _curry2(skip, true);

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
 * var baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * var foo = Object.create(baseFoo, {
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
 * var user = {name: "John", visits: 2};
 * var toUpperCase = _.invoker("toUpperCase");
 *
 * _.updateIn(user, "name", toUpperCase) // => {name: "JOHN", visits: 2}
 * _.updateIn(user, "surname", toUpperCase) // => {name: "John", visits: 2}
 *
 * @example <caption>Non-enumerable properties will be treated as non-existent:</caption>
 * var user = Object.create({name: "John"}, {visits: {value: 2}});
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
function updateIn (source, key, updater) {
    return _isEnumerable(source, key)
        ? _setIn(source, key, updater(source[key]))
        : _merge(enumerables, source, {});
}

/**
 * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
 * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * var user = {name: "John", visits: 2};
 * var incrementVisits = _.updateKey("visits", _.add(1));
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
 * var user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * var inc = _.add(1);
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
 * var user = {id: 1, scores: [
 *     {value: 2, year: "2000"},
 *     {value: 4, year: "2001"},
 *     {value: 6, year: "2002"}
 * ]};
 *
 * var newUser = _.updatePathIn(user, "scores.0.value", inc);
 * // "newUser" holds:
 * // {id: 1, scores: [
 * //     {value: 3, year: "2000"},
 * //     {value: 4, year: "2001"},
 * //     {value: 6, year: "2002"}
 * // ]}
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
function updatePathIn (source, path, updater, separator) {
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
 * var user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * var incrementScores = _.updatePath("status.scores", _.mapWith(_.add(1)))
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
function updatePath (path, updater, separator) {
    return function (source) {
        return updatePathIn(source, path, updater, separator);
    };
}

/**
 * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
 * @example
 * var hasContent = function (s) { return s.trim().length > 0; };
 * var userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 *
 * var user1 = {name: "john", surname: "doe", age: 30};
 * var user2 = {name: "jane", surname: "", age: 15};
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
function validate (obj, checkers) {
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
 * var hasContent = function (s) { return s.trim().length > 0; };
 * var userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 * var validateUser = _.validateWith(userCheckers);
 *
 * var user1 = {name: "john", surname: "doe", age: 30};
 * var user2 = {name: "jane", surname: "", age: 15};
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
 * var user = {name: "john", surname: "doe", age: 30};
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
function _repeat (source, times) {
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
function _getPadding (source, char, len) {
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
function padLeft (source, char, len) {
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
function padRight (source, char, len) {
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
function repeat (source, times) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "string");
    }

    return _repeat(source, Math.floor(times));
}

/**
 * A generic version of <code>String.prototype.search</code>
 * @private
 * @function
 * @param {String} s
 * @param {RegExp} pattern
 * @return {Number}
 */
var _search = generic(String.prototype.search);

/**
 * Builds a predicate expecting a string to test against the given regular expression pattern.
 * @example
 * var hasNumbersOnly = _.testWith(/^\d+$/);
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
function testWith (pattern) {
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
 * var a = new SomeObjA();
 * var sObj = new String("foo");
 * var s = "foo";
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
function isInstanceOf (constructor) {
    return function (obj) {
        return obj instanceof constructor;
    };
}

/**
 * Builds a predicate that expects a value to check against the specified type.
 * @example
 * var isString = _.isType("String");
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
function isType (typeName) {
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
    'case': case_,
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
    invoker: invoker,
    invokerOn: invokerOn,
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
    pickKeys: pickKeys,
    pipe: pipe,
    pluck: pluck,
    pluckKey: pluckKey,
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
    renameKeys: renameKeys,
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
    skipKeys: skipKeys,
    slice: slice,
    sliceAt: sliceAt,
    some: some,
    someIn: someIn,
    sort: sort,
    sortWith: sortWith,
    sortedInsert: sortedInsert,
    sorter: sorter,
    sorterDesc: sorterDesc,
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
const isNumber = isType("Number");

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
const isNotNaN = not(isNaN);

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
const isValidNumber = allOf([isNumber, isNotNaN]);

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
const toNumberisValidNumber = pipe([Number, isValidNumber]);

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
const toFloatIsValidNumber = pipe([parseFloat, isValidNumber]);

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
const isNotNull = not(isNull);

/**
* @module @svizzle/utils/[any-any]-[any-boolean]
*/

/**
 * Return a function returning true if the accessed value is not null
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNotNullWith(getValue)({key: 'a', value: 1}) // true
 *
 * @version 0.5.0
 */
const isNotNullWith = accessor => pipe([accessor, isNotNull]);

/**
* @module @svizzle/utils/[any-number]:accumcb-[array-number]
*/

/**
 * Return a function expecting an array of objects and returning the max of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMax|arrayMax},
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example

const maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]));
const maxWithAbsSin([-Math.PI/2, -Math.PI/4]) // 1
const maxWithAbsSin([Math.PI/4, Math.PI/6]) // 0.7071067811865475

 *
 * @version 0.1.0
 */
const arrayMaxWith = fn => reduceWith((max, item) => {
	const value = fn(item);

	return value > max ? value : max;
}, -Infinity);

/**
 * Return a function expecting an array of objects and returning the min of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMin|arrayMin},
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example
const minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]));
const minWithAbsSin([-Math.PI/2, -Math.PI/4]) // 0.7071067811865475
const minWithAbsSin([Math.PI/4, Math.PI/6]) // 0.49999999999999994
 *
 * @version 0.1.0
 */
const arrayMinWith = fn => reduceWith((min, item) => {
	const value = fn(item);

	return value < min ? value : min;
}, Infinity);

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
 * @example concat([0, 1, 2], [3, 4], [5, 6]) // [0, 1, 2, 3, 4, 5, 6]
 *
 * @version 0.1.0
 */
const concat = generic(Array.prototype.concat);

/**
* @module @svizzle/utils/[any-any]-[object-object]
*/

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
> const reindexedByX = indexValuesWith(obj => obj.x);

> // single values
> const obj1 = {
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
> const obj2 = {
  a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
  b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
};
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
const indexValuesWith = accessor => pipe([
	values,
	apply(concat),
	indexBy(accessor)
]);

var justCompare = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }
  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if ((value1 !== value1) && (value2 !== value2)) {
    return true;
  }
  if ({}.toString.call(value1) != {}.toString.call(value2)) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  } else {
    return compareNativeSubtypes(value1, value2);
  }
}

function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1, value2) {
  var len = value1.length;
  if (len != value2.length) {
    return false;
  }
  var alike = true;
  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }
  return alike;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1).sort();
  var keys2 = Object.keys(value2).sort();
  var len = keys1.length;
  if (len != keys2.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];
    if (!(key1 == key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }
  return true;
}

/**
* @module @svizzle/utils/object-any
*/

/**
 * Retrieve the 'value' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {*} - object.value
 *
 * @example
getValue({key: 'foo', value: 'bar'})
// 'bar'
 *
 * @version 0.4.0
 */
const getValue = getKey('value');

/**
* @module @svizzle/utils/any-[array-object]
*/

/**
 * Return a function expecting an array of keys and returning an object with the provided value as value of those keys.
 *
 * @function
 * @arg {*} value
 * @return {function} function - Array -> Object
 *
 * @example
const makeKeyedEmptyArray = makeKeyed([])
makeKeyedEmptyArray([1, 2]) -> {1: [], 2: []}
makeKeyedEmptyArray(["a", "b"]) -> {a: [], b: []}
 *
 * @version 0.3.0
 */
const makeKeyed = value => pipe([
	collect([identity, mapWith(always(value))]),
	apply(make)
]);

/**
* @module @svizzle/utils/array_proto-string
*/

/**
 * Return an string by joining the provided array with the provided separator
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join|Array.prototype.join},
 {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @arg {string} separator
 * @return {string}
 *
 * @example join([0, 1, 2], "-") // "0-1-2"
 *
 * @version 0.1.0
 */
const join$1 = generic(Array.prototype.join);

/**
* @module @svizzle/utils/string-[array-string]
*/

/**
 * Return a function expecting an array to join with the provided separator
 * @see
 {@link module:@svizzle/utils/array_proto-string.join|join},
 {@link module:@svizzle/utils/array-string.joinWithColon|joinWithColon},
 {@link module:@svizzle/utils/array-string.joinWithDash|joinWithDash},
 {@link module:@svizzle/utils/array-string.joinWithSemicolon|joinWithSemicolon},
 *
 * @function
 * @arg {string} separator
 * @return {function} - Array -> String
 *
 * @example
const joinWithAt = joinWith("@");
joinWithAt([0, 1, 2]) // "1@2@3"
 *
 * @version 0.1.0
 */
const joinWith$1 = separator => partial(join$1, [__, separator]);

/**
* @module @svizzle/utils/array-string
*/

/**
 * Return a string joining the provided array items with a colon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example joinWithColon(["a", "b", "c"]) // "a:b:c"
 *
 * @version 0.1.0
 */
const joinWithColon = joinWith$1(":");

/**
 * Return a string joining the provided array items with a semicolon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example joinWithSemicolon(["a", "b", "c"]) // "a;b;c"
 *
 * @version 0.1.0
 */
const joinWithSemicolon = joinWith$1(";");

var contextKey = {};

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte generated by Svelte v3.23.2 */

const file = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte";

function create_fragment(ctx) {
	let div1;
	let div0;
	let t_value = "▶" + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t = claim_text(div0_nodes, t_value);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "arrow svelte-1vyml86");
			toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			add_location(div0, file, 29, 2, 622);
			attr_dev(div1, "class", "container svelte-1vyml86");
			add_location(div1, file, 28, 0, 587);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, t);

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*expanded*/ 1) {
				toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { expanded } = $$props;
	const writable_props = ["expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONArrow> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONArrow", $$slots, []);

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$set = $$props => {
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({ expanded });

	$$self.$inject_state = $$props => {
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [expanded, click_handler];
}

class JSONArrow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, { expanded: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrow",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*expanded*/ ctx[0] === undefined && !("expanded" in props)) {
			console.warn("<JSONArrow> was created without expected prop 'expanded'");
		}
	}

	get expanded() {
		throw new Error("<JSONArrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte generated by Svelte v3.23.2 */

const file$1 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte";

// (16:0) {#if showKey && key}
function create_if_block(ctx) {
	let label;
	let span;
	let t0;
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = element("label");
			span = element("span");
			t0 = text(/*key*/ ctx[0]);
			t1 = text(/*colon*/ ctx[2]);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { class: true });
			var label_nodes = children(label);
			span = claim_element(label_nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, /*key*/ ctx[0]);
			t1 = claim_text(span_nodes, /*colon*/ ctx[2]);
			span_nodes.forEach(detach_dev);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 17, 4, 399);
			attr_dev(label, "class", "svelte-1vlbacg");
			toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			add_location(label, file$1, 16, 2, 346);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);
			append_dev(label, span);
			append_dev(span, t0);
			append_dev(span, t1);

			if (!mounted) {
				dispose = listen_dev(label, "click", /*click_handler*/ ctx[5], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*key*/ 1) set_data_dev(t0, /*key*/ ctx[0]);
			if (dirty & /*colon*/ 4) set_data_dev(t1, /*colon*/ ctx[2]);

			if (dirty & /*isParentExpanded*/ 2) {
				toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(16:0) {#if showKey && key}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let if_block_anchor;
	let if_block = /*showKey*/ ctx[3] && /*key*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*showKey*/ ctx[3] && /*key*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray = false } = $$props,
		{ colon = ":" } = $$props;

	const writable_props = ["key", "isParentExpanded", "isParentArray", "colon"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONKey> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONKey", $$slots, []);

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
	};

	$$self.$capture_state = () => ({
		key,
		isParentExpanded,
		isParentArray,
		colon,
		showKey
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
		if ("showKey" in $$props) $$invalidate(3, showKey = $$props.showKey);
	};

	let showKey;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded, isParentArray, key*/ 19) {
			 $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
		}
	};

	return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {
			key: 0,
			isParentExpanded: 1,
			isParentArray: 4,
			colon: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONKey",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONKey> was created without expected prop 'key'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONKey> was created without expected prop 'isParentExpanded'");
		}
	}

	get key() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte generated by Svelte v3.23.2 */
const file$2 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (57:4) {#if expandable && isParentExpanded}
function create_if_block_3(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[15]);

	const block = {
		c: function create() {
			create_component(jsonarrow.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonarrow.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(57:4) {#if expandable && isParentExpanded}",
		ctx
	});

	return block;
}

// (75:4) {:else}
function create_else_block(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text("…");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, "…");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$2, 75, 6, 2085);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: noop$1,
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(75:4) {:else}",
		ctx
	});

	return block;
}

// (63:4) {#if isParentExpanded}
function create_if_block$1(ctx) {
	let ul;
	let t;
	let current;
	let mounted;
	let dispose;
	let each_value = /*slicedKeys*/ ctx[13];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length && create_if_block_1(ctx);

	const block = {
		c: function create() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			t = claim_space(ul_nodes);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-rwxv37");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$2, 63, 6, 1589);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(ul, t);
			if (if_block) if_block.m(ul, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(ul, "click", /*expand*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/ 10129) {
				each_value = /*slicedKeys*/ ctx[13];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length) {
				if (if_block) ; else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(ul, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(63:4) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (67:10) {#if !expanded && index < previewKeys.length - 1}
function create_if_block_2(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(",");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, ",");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "comma svelte-rwxv37");
			add_location(span, file$2, 67, 12, 1901);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(67:10) {#if !expanded && index < previewKeys.length - 1}",
		ctx
	});

	return block;
}

// (65:8) {#each slicedKeys as key, index}
function create_each_block(ctx) {
	let jsonnode;
	let t;
	let if_block_anchor;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*getKey*/ ctx[8](/*key*/ ctx[12]),
				isParentExpanded: /*expanded*/ ctx[0],
				isParentArray: /*isArray*/ ctx[4],
				value: /*expanded*/ ctx[0]
				? /*getValue*/ ctx[9](/*key*/ ctx[12])
				: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12])
			},
			$$inline: true
		});

	let if_block = !/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1 && create_if_block_2(ctx);

	const block = {
		c: function create() {
			create_component(jsonnode.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			claim_component(jsonnode.$$.fragment, nodes);
			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert_dev(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*getKey, slicedKeys*/ 8448) jsonnode_changes.key = /*getKey*/ ctx[8](/*key*/ ctx[12]);
			if (dirty & /*expanded*/ 1) jsonnode_changes.isParentExpanded = /*expanded*/ ctx[0];
			if (dirty & /*isArray*/ 16) jsonnode_changes.isParentArray = /*isArray*/ ctx[4];

			if (dirty & /*expanded, getValue, slicedKeys, getPreviewValue*/ 9729) jsonnode_changes.value = /*expanded*/ ctx[0]
			? /*getValue*/ ctx[9](/*key*/ ctx[12])
			: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12]);

			jsonnode.$set(jsonnode_changes);

			if (!/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1) {
				if (if_block) ; else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach_dev(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(65:8) {#each slicedKeys as key, index}",
		ctx
	});

	return block;
}

// (71:8) {#if slicedKeys.length < previewKeys.length }
function create_if_block_1(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text("…");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, "…");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$2, 71, 10, 2026);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(71:8) {#if slicedKeys.length < previewKeys.length }",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let li;
	let label_1;
	let t0;
	let jsonkey;
	let t1;
	let span1;
	let span0;
	let t2;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let span2;
	let t6;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2] && create_if_block_3(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[12],
				colon: /*context*/ ctx[14].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3]
			},
			$$inline: true
		});

	jsonkey.$on("click", /*toggleExpand*/ ctx[15]);
	const if_block_creators = [create_if_block$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isParentExpanded*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			li = element("li");
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span1 = element("span");
			span0 = element("span");
			t2 = text(/*label*/ ctx[1]);
			t3 = text(/*bracketOpen*/ ctx[5]);
			t4 = space();
			if_block1.c();
			t5 = space();
			span2 = element("span");
			t6 = text(/*bracketClose*/ ctx[6]);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			label_1 = claim_element(li_nodes, "LABEL", { class: true });
			var label_1_nodes = children(label_1);
			if (if_block0) if_block0.l(label_1_nodes);
			t0 = claim_space(label_1_nodes);
			claim_component(jsonkey.$$.fragment, label_1_nodes);
			t1 = claim_space(label_1_nodes);
			span1 = claim_element(label_1_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			span0 = claim_element(span1_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t2 = claim_text(span0_nodes, /*label*/ ctx[1]);
			span0_nodes.forEach(detach_dev);
			t3 = claim_text(span1_nodes, /*bracketOpen*/ ctx[5]);
			span1_nodes.forEach(detach_dev);
			label_1_nodes.forEach(detach_dev);
			t4 = claim_space(li_nodes);
			if_block1.l(li_nodes);
			t5 = claim_space(li_nodes);
			span2 = claim_element(li_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			t6 = claim_text(span2_nodes, /*bracketClose*/ ctx[6]);
			span2_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span0, file$2, 60, 34, 1504);
			add_location(span1, file$2, 60, 4, 1474);
			attr_dev(label_1, "class", "svelte-rwxv37");
			add_location(label_1, file$2, 55, 2, 1253);
			add_location(span2, file$2, 77, 2, 2112);
			attr_dev(li, "class", "svelte-rwxv37");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
			add_location(li, file$2, 54, 0, 1214);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, label_1);
			if (if_block0) if_block0.m(label_1, null);
			append_dev(label_1, t0);
			mount_component(jsonkey, label_1, null);
			append_dev(label_1, t1);
			append_dev(label_1, span1);
			append_dev(span1, span0);
			append_dev(span0, t2);
			append_dev(span1, t3);
			append_dev(li, t4);
			if_blocks[current_block_type_index].m(li, null);
			append_dev(li, t5);
			append_dev(li, span2);
			append_dev(span2, t6);
			current = true;

			if (!mounted) {
				dispose = listen_dev(span1, "click", /*toggleExpand*/ ctx[15], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*expandable, isParentExpanded*/ 2052) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(label_1, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 4096) jsonkey_changes.key = /*key*/ ctx[12];
			if (dirty & /*isParentExpanded*/ 4) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[3];
			jsonkey.$set(jsonkey_changes);
			if (!current || dirty & /*label*/ 2) set_data_dev(t2, /*label*/ ctx[1]);
			if (!current || dirty & /*bracketOpen*/ 32) set_data_dev(t3, /*bracketOpen*/ ctx[5]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				}

				transition_in(if_block1, 1);
				if_block1.m(li, t5);
			}

			if (!current || dirty & /*bracketClose*/ 64) set_data_dev(t6, /*bracketClose*/ ctx[6]);

			if (dirty & /*isParentExpanded*/ 4) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ keys } = $$props,
		{ colon = ":" } = $$props,
		{ label = "" } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ isArray = false } = $$props,
		{ bracketOpen } = $$props,
		{ bracketClose } = $$props;

	let { previewKeys = keys } = $$props;
	let { getKey = key => key } = $$props;
	let { getValue = key => key } = $$props;
	let { getPreviewValue = getValue } = $$props;
	let { expanded = false } = $$props, { expandable = true } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	function expand() {
		$$invalidate(0, expanded = true);
	}

	const writable_props = [
		"key",
		"keys",
		"colon",
		"label",
		"isParentExpanded",
		"isParentArray",
		"isArray",
		"bracketOpen",
		"bracketClose",
		"previewKeys",
		"getKey",
		"getValue",
		"getPreviewValue",
		"expanded",
		"expandable"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONNested> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONNested", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(12, key = $$props.key);
		if ("keys" in $$props) $$invalidate(17, keys = $$props.keys);
		if ("colon" in $$props) $$invalidate(18, colon = $$props.colon);
		if ("label" in $$props) $$invalidate(1, label = $$props.label);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("isArray" in $$props) $$invalidate(4, isArray = $$props.isArray);
		if ("bracketOpen" in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
		if ("bracketClose" in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
		if ("previewKeys" in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
		if ("getKey" in $$props) $$invalidate(8, getKey = $$props.getKey);
		if ("getValue" in $$props) $$invalidate(9, getValue = $$props.getValue);
		if ("getPreviewValue" in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ("expandable" in $$props) $$invalidate(11, expandable = $$props.expandable);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		keys,
		colon,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expanded,
		expandable,
		context,
		toggleExpand,
		expand,
		slicedKeys
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(12, key = $$props.key);
		if ("keys" in $$props) $$invalidate(17, keys = $$props.keys);
		if ("colon" in $$props) $$invalidate(18, colon = $$props.colon);
		if ("label" in $$props) $$invalidate(1, label = $$props.label);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("isArray" in $$props) $$invalidate(4, isArray = $$props.isArray);
		if ("bracketOpen" in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
		if ("bracketClose" in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
		if ("previewKeys" in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
		if ("getKey" in $$props) $$invalidate(8, getKey = $$props.getKey);
		if ("getValue" in $$props) $$invalidate(9, getValue = $$props.getValue);
		if ("getPreviewValue" in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ("expandable" in $$props) $$invalidate(11, expandable = $$props.expandable);
		if ("slicedKeys" in $$props) $$invalidate(13, slicedKeys = $$props.slicedKeys);
	};

	let slicedKeys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded*/ 4) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}

		if ($$self.$$.dirty & /*expanded, keys, previewKeys*/ 131201) {
			 $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
		}
	};

	return [
		expanded,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expandable,
		key,
		slicedKeys,
		context,
		toggleExpand,
		expand,
		keys,
		colon
	];
}

class JSONNested extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
			key: 12,
			keys: 17,
			colon: 18,
			label: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			isArray: 4,
			bracketOpen: 5,
			bracketClose: 6,
			previewKeys: 7,
			getKey: 8,
			getValue: 9,
			getPreviewValue: 10,
			expanded: 0,
			expandable: 11
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONNested",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[12] === undefined && !("key" in props)) {
			console.warn("<JSONNested> was created without expected prop 'key'");
		}

		if (/*keys*/ ctx[17] === undefined && !("keys" in props)) {
			console.warn("<JSONNested> was created without expected prop 'keys'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentArray'");
		}

		if (/*bracketOpen*/ ctx[5] === undefined && !("bracketOpen" in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketOpen'");
		}

		if (/*bracketClose*/ ctx[6] === undefined && !("bracketClose" in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketClose'");
		}
	}

	get key() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketOpen() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketOpen(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketClose() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketClose(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get previewKeys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set previewKeys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getKey() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getKey(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getPreviewValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getPreviewValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expandable() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expandable(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONObjectNode.svelte generated by Svelte v3.23.2 */

const { Object: Object_1 } = globals;

function create_fragment$3(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[5],
				previewKeys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: "" + (/*nodeType*/ ctx[3] + " "),
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*keys*/ 32) jsonnested_changes.previewKeys = /*keys*/ ctx[5];
			if (dirty & /*nodeType*/ 8) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + " ");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let { expanded = false } = $$props;

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType", "expanded"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONObjectNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONObjectNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(7, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		getValue,
		keys
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(7, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
	};

	let keys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 128) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}
	};

	return [
		key,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		keys,
		getValue,
		value
	];
}

class JSONObjectNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {
			key: 0,
			value: 7,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONObjectNode",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[7] === undefined && !("value" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrayNode.svelte generated by Svelte v3.23.2 */

const { Object: Object_1$1 } = globals;

function create_fragment$4(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				isArray: true,
				keys: /*keys*/ ctx[5],
				previewKeys: /*previewKeys*/ ctx[6],
				getValue: /*getValue*/ ctx[7],
				label: "Array(" + /*value*/ ctx[1].length + ")",
				bracketOpen: "[",
				bracketClose: "]"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*previewKeys*/ 64) jsonnested_changes.previewKeys = /*previewKeys*/ ctx[6];
			if (dirty & /*value*/ 2) jsonnested_changes.label = "Array(" + /*value*/ ctx[1].length + ")";
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const filteredKey = new Set(["length"]);

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONArrayNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONArrayNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		filteredKey,
		getValue,
		keys,
		previewKeys
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
		if ("previewKeys" in $$props) $$invalidate(6, previewKeys = $$props.previewKeys);
	};

	let keys;
	let previewKeys;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}

		if ($$self.$$.dirty & /*keys*/ 32) {
			 $$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		previewKeys,
		getValue
	];
}

class JSONArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrayNode",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONIterableArrayNode.svelte generated by Svelte v3.23.2 */

function create_fragment$5(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$1,
				getValue: getValue$1,
				isArray: true,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function getKey$1(key) {
	return String(key[0]);
}

function getValue$1(key) {
	return key[1];
}

function instance$5($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let keys = [];
	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONIterableArrayNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONIterableArrayNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey: getKey$1,
		getValue: getValue$1
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("keys" in $$props) $$invalidate(4, keys = $$props.keys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, entry]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableArrayNode",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !("value" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONIterableMapNode.svelte generated by Svelte v3.23.2 */

function create_fragment$6(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$2,
				getValue: getValue$2,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				colon: "",
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function getKey$2(entry) {
	return entry[0];
}

function getValue$2(entry) {
	return entry[1];
}

function instance$6($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	let keys = [];
	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONIterableMapNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONIterableMapNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		MapEntry,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey: getKey$2,
		getValue: getValue$2
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ("keys" in $$props) $$invalidate(4, keys = $$props.keys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, new MapEntry(entry[0], entry[1])]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableMapNode",
			options,
			id: create_fragment$6.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !("value" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !("nodeType" in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONMapEntryNode.svelte generated by Svelte v3.23.2 */

function create_fragment$7(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				key: /*isParentExpanded*/ ctx[2]
				? String(/*key*/ ctx[0])
				: /*value*/ ctx[1].key,
				keys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: /*isParentExpanded*/ ctx[2] ? "Entry " : "=> ",
				bracketOpen: "{",
				bracketClose: "}"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];

			if (dirty & /*isParentExpanded, key, value*/ 7) jsonnested_changes.key = /*isParentExpanded*/ ctx[2]
			? String(/*key*/ ctx[0])
			: /*value*/ ctx[1].key;

			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.label = /*isParentExpanded*/ ctx[2] ? "Entry " : "=> ";
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const keys = ["key", "value"];

	function getValue(key) {
		return value[key];
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONMapEntryNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONMapEntryNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		getValue
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

class JSONMapEntryNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONMapEntryNode",
			options,
			id: create_fragment$7.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte generated by Svelte v3.23.2 */
const file$3 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte";

function create_fragment$8(ctx) {
	let li;
	let jsonkey;
	let t0;
	let span;

	let t1_value = (/*valueGetter*/ ctx[2]
	? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
	: /*value*/ ctx[1]) + "";

	let t1;
	let span_class_value;
	let current;

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[0],
				colon: /*colon*/ ctx[6],
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t0 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, t1_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"));
			add_location(span, file$3, 47, 2, 948);
			attr_dev(li, "class", "svelte-3bjyvl");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			add_location(li, file$3, 45, 0, 846);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			mount_component(jsonkey, li, null);
			append_dev(li, t0);
			append_dev(li, span);
			append_dev(span, t1);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonkey_changes = {};
			if (dirty & /*key*/ 1) jsonkey_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);

			if ((!current || dirty & /*valueGetter, value*/ 6) && t1_value !== (t1_value = (/*valueGetter*/ ctx[2]
			? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
			: /*value*/ ctx[1]) + "")) set_data_dev(t1, t1_value);

			if (!current || dirty & /*nodeType*/ 32 && span_class_value !== (span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"))) {
				attr_dev(span, "class", span_class_value);
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(jsonkey);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ valueGetter = null } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props,
		{ nodeType } = $$props;

	const { colon } = getContext(contextKey);
	const writable_props = ["key", "value", "valueGetter", "isParentExpanded", "isParentArray", "nodeType"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONValueNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONValueNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		getContext,
		contextKey,
		JSONKey,
		key,
		value,
		valueGetter,
		isParentExpanded,
		isParentArray,
		nodeType,
		colon
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

class JSONValueNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {
			key: 0,
			value: 1,
			valueGetter: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			nodeType: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONValueNode",
			options,
			id: create_fragment$8.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[5] === undefined && !("nodeType" in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueGetter() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueGetter(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte generated by Svelte v3.23.2 */
const file$4 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (40:2) {#if isParentExpanded}
function create_if_block_2$1(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(jsonarrow.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonarrow.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(40:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (45:2) {#if isParentExpanded}
function create_if_block$2(ctx) {
	let ul;
	let current;
	let if_block = /*expanded*/ ctx[0] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			ul = element("ul");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-1ca3gb2");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$4, 45, 4, 1134);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);
			if (if_block) if_block.m(ul, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*expanded*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*expanded*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(ul, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(45:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (47:6) {#if expanded}
function create_if_block_1$1(ctx) {
	let jsonnode;
	let t0;
	let li;
	let jsonkey;
	let t1;
	let span;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: "message",
				value: /*value*/ ctx[2].message
			},
			$$inline: true
		});

	jsonkey = new JSONKey({
			props: {
				key: "stack",
				colon: ":",
				isParentExpanded: /*isParentExpanded*/ ctx[3]
			},
			$$inline: true
		});

	let each_value = /*stack*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			create_component(jsonnode.$$.fragment);
			t0 = space();
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			claim_component(jsonnode.$$.fragment, nodes);
			t0 = claim_space(nodes);
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t1 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(span_nodes);
			}

			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4, 50, 10, 1330);
			attr_dev(li, "class", "svelte-1ca3gb2");
			add_location(li, file$4, 48, 8, 1252);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, li, anchor);
			mount_component(jsonkey, li, null);
			append_dev(li, t1);
			append_dev(li, span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*value*/ 4) jsonnode_changes.value = /*value*/ ctx[2].message;
			jsonnode.$set(jsonnode_changes);
			const jsonkey_changes = {};
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			jsonkey.$set(jsonkey_changes);

			if (dirty & /*stack*/ 32) {
				each_value = /*stack*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(li);
			destroy_component(jsonkey);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(47:6) {#if expanded}",
		ctx
	});

	return block;
}

// (52:12) {#each stack as line, index}
function create_each_block$1(ctx) {
	let span;
	let t_value = /*line*/ ctx[8] + "";
	let t;
	let br;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			br = element("br");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			br = claim_element(nodes, "BR", {});
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-1ca3gb2");
			toggle_class(span, "indent", /*index*/ ctx[10] > 0);
			add_location(span, file$4, 52, 14, 1392);
			add_location(br, file$4, 52, 58, 1436);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
			insert_dev(target, br, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stack*/ 32 && t_value !== (t_value = /*line*/ ctx[8] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(br);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(52:12) {#each stack as line, index}",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let li;
	let t0;
	let jsonkey;
	let t1;
	let span;
	let t2;
	let t3_value = (/*expanded*/ ctx[0] ? "" : /*value*/ ctx[2].message) + "";
	let t3;
	let t4;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isParentExpanded*/ ctx[3] && create_if_block_2$1(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[1],
				colon: /*context*/ ctx[6].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	let if_block1 = /*isParentExpanded*/ ctx[3] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			li = element("li");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");
			t2 = text("Error: ");
			t3 = text(t3_value);
			t4 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			if (if_block0) if_block0.l(li_nodes);
			t0 = claim_space(li_nodes);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t1 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			t2 = claim_text(span_nodes, "Error: ");
			t3 = claim_text(span_nodes, t3_value);
			span_nodes.forEach(detach_dev);
			t4 = claim_space(li_nodes);
			if (if_block1) if_block1.l(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4, 43, 2, 1033);
			attr_dev(li, "class", "svelte-1ca3gb2");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			add_location(li, file$4, 38, 0, 831);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			if (if_block0) if_block0.m(li, null);
			append_dev(li, t0);
			mount_component(jsonkey, li, null);
			append_dev(li, t1);
			append_dev(li, span);
			append_dev(span, t2);
			append_dev(span, t3);
			append_dev(li, t4);
			if (if_block1) if_block1.m(li, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(span, "click", /*toggleExpand*/ ctx[7], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(li, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 2) jsonkey_changes.key = /*key*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);
			if ((!current || dirty & /*expanded, value*/ 5) && t3_value !== (t3_value = (/*expanded*/ ctx[0] ? "" : /*value*/ ctx[2].message) + "")) set_data_dev(t3, t3_value);

			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(li, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	let { expanded = false } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon: ":" });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ErrorNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ErrorNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		context,
		toggleExpand,
		stack
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ("stack" in $$props) $$invalidate(5, stack = $$props.stack);
	};

	let stack;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 4) {
			 $$invalidate(5, stack = value.stack.split("\n"));
		}

		if ($$self.$$.dirty & /*isParentExpanded*/ 8) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}
	};

	return [
		expanded,
		key,
		value,
		isParentExpanded,
		isParentArray,
		stack,
		context,
		toggleExpand
	];
}

class ErrorNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {
			key: 1,
			value: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			expanded: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ErrorNode",
			options,
			id: create_fragment$9.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[1] === undefined && !("key" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[2] === undefined && !("value" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !("isParentExpanded" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !("isParentArray" in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }
    return obj.constructor.name;
  }

  return type;
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNode.svelte generated by Svelte v3.23.2 */

function create_fragment$a(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*componentType*/ ctx[5];

	function switch_props(ctx) {
		return {
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				nodeType: /*nodeType*/ ctx[4],
				valueGetter: /*valueGetter*/ ctx[6]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*key*/ 1) switch_instance_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) switch_instance_changes.value = /*value*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 4) switch_instance_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) switch_instance_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*nodeType*/ 16) switch_instance_changes.nodeType = /*nodeType*/ ctx[4];
			if (dirty & /*valueGetter*/ 64) switch_instance_changes.valueGetter = /*valueGetter*/ ctx[6];

			if (switch_value !== (switch_value = /*componentType*/ ctx[5])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { key } = $$props,
		{ value } = $$props,
		{ isParentExpanded } = $$props,
		{ isParentArray } = $$props;

	function getComponent(nodeType) {
		switch (nodeType) {
			case "Object":
				return JSONObjectNode;
			case "Error":
				return ErrorNode;
			case "Array":
				return JSONArrayNode;
			case "Iterable":
			case "Map":
			case "Set":
				return typeof value.set === "function"
				? JSONIterableMapNode
				: JSONIterableArrayNode;
			case "MapEntry":
				return JSONMapEntryNode;
			default:
				return JSONValueNode;
		}
	}

	function getValueGetter(nodeType) {
		switch (nodeType) {
			case "Object":
			case "Error":
			case "Array":
			case "Iterable":
			case "Map":
			case "Set":
			case "MapEntry":
			case "Number":
				return undefined;
			case "String":
				return raw => `"${raw}"`;
			case "Boolean":
				return raw => raw ? "true" : "false";
			case "Date":
				return raw => raw.toISOString();
			case "Null":
				return () => "null";
			case "Undefined":
				return () => "undefined";
			case "Function":
			case "Symbol":
				return raw => raw.toString();
			default:
				return () => `<${nodeType}>`;
		}
	}

	const writable_props = ["key", "value", "isParentExpanded", "isParentArray"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JSONNode> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("JSONNode", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
	};

	$$self.$capture_state = () => ({
		JSONObjectNode,
		JSONArrayNode,
		JSONIterableArrayNode,
		JSONIterableMapNode,
		JSONMapEntryNode,
		JSONValueNode,
		ErrorNode,
		objType,
		key,
		value,
		isParentExpanded,
		isParentArray,
		getComponent,
		getValueGetter,
		nodeType,
		componentType,
		valueGetter
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ("nodeType" in $$props) $$invalidate(4, nodeType = $$props.nodeType);
		if ("componentType" in $$props) $$invalidate(5, componentType = $$props.componentType);
		if ("valueGetter" in $$props) $$invalidate(6, valueGetter = $$props.valueGetter);
	};

	let nodeType;
	let componentType;
	let valueGetter;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(4, nodeType = objType(value));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(5, componentType = getComponent(nodeType));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(6, valueGetter = getValueGetter(nodeType));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		componentType,
		valueGetter
	];
}

class JSONNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONNode",
			options,
			id: create_fragment$a.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !("key" in props)) {
			console.warn("<JSONNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<JSONNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !("isParentExpanded" in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !("isParentArray" in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte generated by Svelte v3.23.2 */
const file$5 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte";

function create_fragment$b(ctx) {
	let ul;
	let jsonnode;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: true,
				isParentArray: false
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			ul = element("ul");
			create_component(jsonnode.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			claim_component(jsonnode.$$.fragment, ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-773n60");
			add_location(ul, file$5, 37, 0, 1295);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);
			mount_component(jsonnode, ul, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnode_changes = {};
			if (dirty & /*key*/ 1) jsonnode_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) jsonnode_changes.value = /*value*/ ctx[1];
			jsonnode.$set(jsonnode_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_component(jsonnode);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	setContext(contextKey, {});
	let { key = "" } = $$props, { value } = $$props;
	const writable_props = ["key", "value"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Root> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Root", $$slots, []);

	$$self.$set = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	$$self.$capture_state = () => ({
		JSONNode,
		setContext,
		contextKey,
		key,
		value
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(0, key = $$props.key);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value];
}

class Root extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { key: 0, value: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Root",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*value*/ ctx[1] === undefined && !("value" in props)) {
			console.warn("<Root> was created without expected prop 'value'");
		}
	}

	get key() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/app/components/Elements.svelte generated by Svelte v3.23.2 */

const file$6 = "src/node_modules/app/components/Elements.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i].tag;
	child_ctx[2] = list[i].content;
	return child_ctx;
}

// (8:25) 
function create_if_block_1$2(ctx) {
	let pre;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$6, 8, 2, 143);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(8:25) ",
		ctx
	});

	return block;
}

// (6:1) {#if tag === 'p'}
function create_if_block$3(ctx) {
	let p;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file$6, 6, 2, 98);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(6:1) {#if tag === 'p'}",
		ctx
	});

	return block;
}

// (5:0) {#each elements as {tag, content}}
function create_each_block$2(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*tag*/ ctx[1] === "p") return create_if_block$3;
		if (/*tag*/ ctx[1] === "pre") return create_if_block_1$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(5:0) {#each elements as {tag, content}}",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let each_1_anchor;
	let each_value = /*elements*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*elements*/ 1) {
				each_value = /*elements*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { elements } = $$props;
	const writable_props = ["elements"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Elements> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Elements", $$slots, []);

	$$self.$set = $$props => {
		if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
	};

	$$self.$capture_state = () => ({ elements });

	$$self.$inject_state = $$props => {
		if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [elements];
}

class Elements extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, { elements: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Elements",
			options,
			id: create_fragment$c.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*elements*/ ctx[0] === undefined && !("elements" in props)) {
			console.warn("<Elements> was created without expected prop 'elements'");
		}
	}

	get elements() {
		throw new Error("<Elements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set elements(value) {
		throw new Error("<Elements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function linear(domain, range) {
    var d0 = domain[0];
    var r0 = range[0];
    var m = (range[1] - r0) / (domain[1] - d0);
    return Object.assign(function (num) {
        return r0 + (num - d0) * m;
    }, {
        inverse: function () { return linear(range, domain); }
    });
}

/**
* @module @svizzle/dom/attrs
*/

/**
 * Return a style string from an object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
makeStyle({color: "red", "font-size": "10px"})
// "color:red;font-size:10px"
 *
 * @version 0.1.0
 */
const makeStyle = pipe([
	skipIf(isNil),
	pairs,
	mapWith(joinWithColon),
	joinWithSemicolon
]);

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartV.svelte generated by Svelte v3.23.2 */
const file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartV.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[44] = list[i].barColor;
	child_ctx[45] = list[i].bkgColor;
	child_ctx[46] = list[i].displayValue;
	child_ctx[47] = list[i].dxKey;
	child_ctx[48] = list[i].isNeg;
	child_ctx[49] = list[i].key;
	child_ctx[50] = list[i].label;
	child_ctx[51] = list[i].length;
	child_ctx[52] = list[i].x;
	child_ctx[53] = list[i].xValue;
	child_ctx[54] = list[i].y;
	child_ctx[55] = list[i].yText;
	child_ctx[57] = i;
	return child_ctx;
}

// (119:1) {#if title}
function create_if_block_1$3(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[5]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", {});
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[5]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file$7, 120, 2, 3309);
			attr_dev(header, "class", "svelte-1vlflhi");
			add_location(header, file$7, 119, 1, 3298);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*title*/ 32) set_data_dev(t, /*title*/ ctx[5]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(119:1) {#if title}",
		ctx
	});

	return block;
}

// (131:3) {#each bars as {     barColor,     bkgColor,     displayValue,     dxKey,     isNeg,     key,     label,     length,     x,     xValue,     y,     yText    }
function create_each_block$3(key_1, ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let line;
	let line_stroke_value;
	let line_x__value;
	let line_y__value;
	let line_y__value_1;
	let text0;
	let t0_value = /*label*/ ctx[50] + "";
	let t0;
	let text0_dx_value;
	let text0_y_value;
	let text1;
	let t1_value = /*displayValue*/ ctx[46] + "";
	let t1;
	let text1_x_value;
	let text1_y_value;
	let g_transform_value;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[29](/*key*/ ctx[49], ...args);
	}

	function mouseenter_handler(...args) {
		return /*mouseenter_handler*/ ctx[30](/*key*/ ctx[49], ...args);
	}

	function mouseleave_handler(...args) {
		return /*mouseleave_handler*/ ctx[31](/*key*/ ctx[49], ...args);
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			line = svg_element("line");
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);
			rect = claim_element(g_nodes, "rect", { width: true, fill: true, height: true }, 1);
			children(rect).forEach(detach_dev);

			line = claim_element(
				g_nodes,
				"line",
				{
					stroke: true,
					"stroke-width": true,
					x1: true,
					x2: true,
					y1: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);

			text0 = claim_element(
				g_nodes,
				"text",
				{
					class: true,
					dx: true,
					fill: true,
					"font-size": true,
					x: true,
					y: true
				},
				1
			);

			var text0_nodes = children(text0);
			t0 = claim_text(text0_nodes, t0_value);
			text0_nodes.forEach(detach_dev);

			text1 = claim_element(
				g_nodes,
				"text",
				{
					class: true,
					fill: true,
					"font-size": true,
					x: true,
					y: true
				},
				1
			);

			var text1_nodes = children(text1);
			t1 = claim_text(text1_nodes, t1_value);
			text1_nodes.forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "fill", rect_fill_value = /*bkgColor*/ ctx[45]);
			attr_dev(rect, "height", /*itemHeight*/ ctx[10]);
			add_location(rect, file$7, 155, 4, 4078);
			attr_dev(line, "stroke", line_stroke_value = /*barColor*/ ctx[44]);
			attr_dev(line, "stroke-width", /*barHeight*/ ctx[1]);
			attr_dev(line, "x1", /*x0*/ ctx[13]);
			attr_dev(line, "x2", line_x__value = /*x*/ ctx[52]);
			attr_dev(line, "y1", line_y__value = /*y*/ ctx[54]);
			attr_dev(line, "y2", line_y__value_1 = /*y*/ ctx[54]);
			add_location(line, file$7, 160, 4, 4154);
			attr_dev(text0, "class", "key svelte-1vlflhi");
			attr_dev(text0, "dx", text0_dx_value = /*dxKey*/ ctx[47]);
			attr_dev(text0, "fill", /*textColor*/ ctx[4]);
			attr_dev(text0, "font-size", /*fontSize*/ ctx[2]);
			attr_dev(text0, "x", /*x0*/ ctx[13]);
			attr_dev(text0, "y", text0_y_value = /*yText*/ ctx[55]);
			toggle_class(text0, "neg", /*isNeg*/ ctx[48]);
			add_location(text0, file$7, 168, 4, 4273);
			attr_dev(text1, "class", "value svelte-1vlflhi");
			attr_dev(text1, "fill", /*textColor*/ ctx[4]);
			attr_dev(text1, "font-size", /*fontSize*/ ctx[2]);
			attr_dev(text1, "x", text1_x_value = /*xValue*/ ctx[53]);
			attr_dev(text1, "y", text1_y_value = /*yText*/ ctx[55]);
			toggle_class(text1, "neg", /*isNeg*/ ctx[48]);
			add_location(text1, file$7, 177, 4, 4434);
			attr_dev(g, "class", "item svelte-1vlflhi");
			attr_dev(g, "transform", g_transform_value = "translate(0, " + /*itemHeight*/ ctx[10] * /*index*/ ctx[57] + ")");
			toggle_class(g, "clickable", /*isInteractive*/ ctx[3]);
			add_location(g, file$7, 144, 3, 3692);
			this.first = g;
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			append_dev(g, line);
			append_dev(g, text0);
			append_dev(text0, t0);
			append_dev(g, text1);
			append_dev(text1, t1);

			if (!mounted) {
				dispose = [
					listen_dev(g, "click", click_handler, false, false, false),
					listen_dev(g, "mouseenter", mouseenter_handler, false, false, false),
					listen_dev(g, "mouseleave", mouseleave_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*bars*/ 16384 && rect_fill_value !== (rect_fill_value = /*bkgColor*/ ctx[45])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*itemHeight*/ 1024) {
				attr_dev(rect, "height", /*itemHeight*/ ctx[10]);
			}

			if (dirty[0] & /*bars*/ 16384 && line_stroke_value !== (line_stroke_value = /*barColor*/ ctx[44])) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*barHeight*/ 2) {
				attr_dev(line, "stroke-width", /*barHeight*/ ctx[1]);
			}

			if (dirty[0] & /*x0*/ 8192) {
				attr_dev(line, "x1", /*x0*/ ctx[13]);
			}

			if (dirty[0] & /*bars*/ 16384 && line_x__value !== (line_x__value = /*x*/ ctx[52])) {
				attr_dev(line, "x2", line_x__value);
			}

			if (dirty[0] & /*bars*/ 16384 && line_y__value !== (line_y__value = /*y*/ ctx[54])) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*bars*/ 16384 && line_y__value_1 !== (line_y__value_1 = /*y*/ ctx[54])) {
				attr_dev(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*bars*/ 16384 && t0_value !== (t0_value = /*label*/ ctx[50] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*bars*/ 16384 && text0_dx_value !== (text0_dx_value = /*dxKey*/ ctx[47])) {
				attr_dev(text0, "dx", text0_dx_value);
			}

			if (dirty[0] & /*textColor*/ 16) {
				attr_dev(text0, "fill", /*textColor*/ ctx[4]);
			}

			if (dirty[0] & /*fontSize*/ 4) {
				attr_dev(text0, "font-size", /*fontSize*/ ctx[2]);
			}

			if (dirty[0] & /*x0*/ 8192) {
				attr_dev(text0, "x", /*x0*/ ctx[13]);
			}

			if (dirty[0] & /*bars*/ 16384 && text0_y_value !== (text0_y_value = /*yText*/ ctx[55])) {
				attr_dev(text0, "y", text0_y_value);
			}

			if (dirty[0] & /*bars*/ 16384) {
				toggle_class(text0, "neg", /*isNeg*/ ctx[48]);
			}

			if (dirty[0] & /*bars*/ 16384 && t1_value !== (t1_value = /*displayValue*/ ctx[46] + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*textColor*/ 16) {
				attr_dev(text1, "fill", /*textColor*/ ctx[4]);
			}

			if (dirty[0] & /*fontSize*/ 4) {
				attr_dev(text1, "font-size", /*fontSize*/ ctx[2]);
			}

			if (dirty[0] & /*bars*/ 16384 && text1_x_value !== (text1_x_value = /*xValue*/ ctx[53])) {
				attr_dev(text1, "x", text1_x_value);
			}

			if (dirty[0] & /*bars*/ 16384 && text1_y_value !== (text1_y_value = /*yText*/ ctx[55])) {
				attr_dev(text1, "y", text1_y_value);
			}

			if (dirty[0] & /*bars*/ 16384) {
				toggle_class(text1, "neg", /*isNeg*/ ctx[48]);
			}

			if (dirty[0] & /*itemHeight, bars*/ 17408 && g_transform_value !== (g_transform_value = "translate(0, " + /*itemHeight*/ ctx[10] * /*index*/ ctx[57] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}

			if (dirty[0] & /*isInteractive*/ 8) {
				toggle_class(g, "clickable", /*isInteractive*/ ctx[3]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(131:3) {#each bars as {     barColor,     bkgColor,     displayValue,     dxKey,     isNeg,     key,     label,     length,     x,     xValue,     y,     yText    }",
		ctx
	});

	return block;
}

// (188:3) {#if crossesZero}
function create_if_block$4(ctx) {
	let line;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					stroke: true,
					x1: true,
					x2: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "stroke", /*axisColor*/ ctx[0]);
			attr_dev(line, "x1", /*x0*/ ctx[13]);
			attr_dev(line, "x2", /*x0*/ ctx[13]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[11]);
			add_location(line, file$7, 188, 3, 4631);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*axisColor*/ 1) {
				attr_dev(line, "stroke", /*axisColor*/ ctx[0]);
			}

			if (dirty[0] & /*x0*/ 8192) {
				attr_dev(line, "x1", /*x0*/ ctx[13]);
			}

			if (dirty[0] & /*x0*/ 8192) {
				attr_dev(line, "x2", /*x0*/ ctx[13]);
			}

			if (dirty[0] & /*svgHeight*/ 2048) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[11]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(188:3) {#if crossesZero}",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let main_resize_listener;
	let mounted;
	let dispose;
	let if_block0 = /*title*/ ctx[5] && create_if_block_1$3(ctx);
	let each_value = /*bars*/ ctx[14];
	validate_each_argument(each_value);
	const get_key = ctx => /*key*/ ctx[49];
	validate_each_keys(ctx, each_value, get_each_context$3, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$3(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
	}

	let if_block1 = /*crossesZero*/ ctx[12] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			main = element("main");
			svg = svg_element("svg");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_element(main_nodes, "svg", { width: true, height: true, class: true }, 1);
			var svg_nodes = children(svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(svg_nodes);
			}

			each_1_anchor = empty();
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[6]);
			attr_dev(svg, "height", /*svgHeight*/ ctx[11]);
			attr_dev(svg, "class", "svelte-1vlflhi");
			add_location(svg, file$7, 129, 2, 3481);
			attr_dev(main, "class", "svelte-1vlflhi");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[32].call(main));
			toggle_class(main, "titled", /*title*/ ctx[5]);
			add_location(main, file$7, 123, 1, 3345);
			attr_dev(div, "class", "BarchartV svelte-1vlflhi");
			attr_dev(div, "style", /*divStyle*/ ctx[9]);
			add_location(div, file$7, 114, 0, 3240);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}

			append_dev(svg, each_1_anchor);
			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[32].bind(main));
			/*main_binding*/ ctx[33](main);

			if (!mounted) {
				dispose = listen_dev(main, "mouseleave", /*mouseleave_handler_1*/ ctx[34], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*title*/ ctx[5]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$3(ctx);
					if_block0.c();
					if_block0.m(div, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*itemHeight, bars, isInteractive, dispatch, hoveredKey, textColor, fontSize, x0, barHeight, width*/ 58590) {
				const each_value = /*bars*/ ctx[14];
				validate_each_argument(each_value);
				validate_each_keys(ctx, each_value, get_each_context$3, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, svg, destroy_block, create_each_block$3, each_1_anchor, get_each_context$3);
			}

			if (/*crossesZero*/ ctx[12]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$4(ctx);
					if_block1.c();
					if_block1.m(svg, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*width*/ 64) {
				attr_dev(svg, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*svgHeight*/ 2048) {
				attr_dev(svg, "height", /*svgHeight*/ ctx[11]);
			}

			if (dirty[0] & /*title*/ 32) {
				toggle_class(main, "titled", /*title*/ ctx[5]);
			}

			if (dirty[0] & /*divStyle*/ 512) {
				attr_dev(div, "style", /*divStyle*/ ctx[9]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block1) if_block1.d();
			main_resize_listener();
			/*main_binding*/ ctx[33](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const transparentColor = "rgba(0,0,0,0)";

function instance$d($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { axisColor } = $$props;
	let { backgroundColor } = $$props;
	let { barDefaultColor } = $$props;
	let { barHeight } = $$props;
	let { focusedKey } = $$props;
	let { focusedKeyColor } = $$props;
	let { fontSize } = $$props;
	let { formatFn } = $$props;
	let { hoverColor } = $$props;
	let { isInteractive } = $$props;
	let { items } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { keyToLabel } = $$props;
	let { keyToLabelFn } = $$props;
	let { shouldResetScroll } = $$props;
	let { textColor } = $$props;
	let { title } = $$props;
	let { valueAccessor } = $$props;
	let width;
	let hoveredKey;

	/* scroll */
	let previousItems;

	let scrollable;
	let wasNotResettingScroll;

	beforeUpdate(() => {
		$$invalidate(36, wasNotResettingScroll = !shouldResetScroll);
	});

	const writable_props = [
		"axisColor",
		"backgroundColor",
		"barDefaultColor",
		"barHeight",
		"focusedKey",
		"focusedKeyColor",
		"fontSize",
		"formatFn",
		"hoverColor",
		"isInteractive",
		"items",
		"keyToColor",
		"keyToColorFn",
		"keyToLabel",
		"keyToLabelFn",
		"shouldResetScroll",
		"textColor",
		"title",
		"valueAccessor"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BarchartV> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("BarchartV", $$slots, []);

	const click_handler = key => {
		isInteractive && dispatch("clicked", { id: key });
	};

	const mouseenter_handler = key => {
		isInteractive && dispatch("entered", { id: key });
		$$invalidate(7, hoveredKey = key);
	};

	const mouseleave_handler = key => isInteractive && dispatch("exited", { id: key });

	function main_elementresize_handler() {
		width = this.clientWidth;
		$$invalidate(6, width);
	}

	function main_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			scrollable = $$value;
			(((($$invalidate(8, scrollable), $$invalidate(24, items)), $$invalidate(20, shouldResetScroll)), $$invalidate(35, previousItems)), $$invalidate(36, wasNotResettingScroll));
		});
	}

	const mouseleave_handler_1 = () => {
		$$invalidate(7, hoveredKey = null);
	};

	$$self.$set = $$props => {
		if ("axisColor" in $$props) $$invalidate(0, axisColor = $$props.axisColor);
		if ("backgroundColor" in $$props) $$invalidate(16, backgroundColor = $$props.backgroundColor);
		if ("barDefaultColor" in $$props) $$invalidate(17, barDefaultColor = $$props.barDefaultColor);
		if ("barHeight" in $$props) $$invalidate(1, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(22, focusedKey = $$props.focusedKey);
		if ("focusedKeyColor" in $$props) $$invalidate(18, focusedKeyColor = $$props.focusedKeyColor);
		if ("fontSize" in $$props) $$invalidate(2, fontSize = $$props.fontSize);
		if ("formatFn" in $$props) $$invalidate(23, formatFn = $$props.formatFn);
		if ("hoverColor" in $$props) $$invalidate(19, hoverColor = $$props.hoverColor);
		if ("isInteractive" in $$props) $$invalidate(3, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(24, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(25, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(26, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(27, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(28, keyToLabelFn = $$props.keyToLabelFn);
		if ("shouldResetScroll" in $$props) $$invalidate(20, shouldResetScroll = $$props.shouldResetScroll);
		if ("textColor" in $$props) $$invalidate(4, textColor = $$props.textColor);
		if ("title" in $$props) $$invalidate(5, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(21, valueAccessor = $$props.valueAccessor);
	};

	$$self.$capture_state = () => ({
		_,
		linearScale: linear,
		isEqual: justCompare,
		afterUpdate,
		beforeUpdate,
		createEventDispatcher,
		makeStyle,
		arrayMaxWith,
		arrayMinWith,
		getValue,
		dispatch,
		transparentColor,
		axisColor,
		backgroundColor,
		barDefaultColor,
		barHeight,
		focusedKey,
		focusedKeyColor,
		fontSize,
		formatFn,
		hoverColor,
		isInteractive,
		items,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		shouldResetScroll,
		textColor,
		title,
		valueAccessor,
		width,
		hoveredKey,
		previousItems,
		scrollable,
		wasNotResettingScroll,
		divStyle,
		padding,
		itemHeight,
		svgHeight,
		getMin,
		getMax,
		min,
		max,
		crossesZero,
		domain,
		getX,
		x0,
		bars
	});

	$$self.$inject_state = $$props => {
		if ("axisColor" in $$props) $$invalidate(0, axisColor = $$props.axisColor);
		if ("backgroundColor" in $$props) $$invalidate(16, backgroundColor = $$props.backgroundColor);
		if ("barDefaultColor" in $$props) $$invalidate(17, barDefaultColor = $$props.barDefaultColor);
		if ("barHeight" in $$props) $$invalidate(1, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(22, focusedKey = $$props.focusedKey);
		if ("focusedKeyColor" in $$props) $$invalidate(18, focusedKeyColor = $$props.focusedKeyColor);
		if ("fontSize" in $$props) $$invalidate(2, fontSize = $$props.fontSize);
		if ("formatFn" in $$props) $$invalidate(23, formatFn = $$props.formatFn);
		if ("hoverColor" in $$props) $$invalidate(19, hoverColor = $$props.hoverColor);
		if ("isInteractive" in $$props) $$invalidate(3, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(24, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(25, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(26, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(27, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(28, keyToLabelFn = $$props.keyToLabelFn);
		if ("shouldResetScroll" in $$props) $$invalidate(20, shouldResetScroll = $$props.shouldResetScroll);
		if ("textColor" in $$props) $$invalidate(4, textColor = $$props.textColor);
		if ("title" in $$props) $$invalidate(5, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(21, valueAccessor = $$props.valueAccessor);
		if ("width" in $$props) $$invalidate(6, width = $$props.width);
		if ("hoveredKey" in $$props) $$invalidate(7, hoveredKey = $$props.hoveredKey);
		if ("previousItems" in $$props) $$invalidate(35, previousItems = $$props.previousItems);
		if ("scrollable" in $$props) $$invalidate(8, scrollable = $$props.scrollable);
		if ("wasNotResettingScroll" in $$props) $$invalidate(36, wasNotResettingScroll = $$props.wasNotResettingScroll);
		if ("divStyle" in $$props) $$invalidate(9, divStyle = $$props.divStyle);
		if ("padding" in $$props) $$invalidate(37, padding = $$props.padding);
		if ("itemHeight" in $$props) $$invalidate(10, itemHeight = $$props.itemHeight);
		if ("svgHeight" in $$props) $$invalidate(11, svgHeight = $$props.svgHeight);
		if ("getMin" in $$props) $$invalidate(38, getMin = $$props.getMin);
		if ("getMax" in $$props) $$invalidate(39, getMax = $$props.getMax);
		if ("min" in $$props) $$invalidate(40, min = $$props.min);
		if ("max" in $$props) $$invalidate(41, max = $$props.max);
		if ("crossesZero" in $$props) $$invalidate(12, crossesZero = $$props.crossesZero);
		if ("domain" in $$props) $$invalidate(42, domain = $$props.domain);
		if ("getX" in $$props) $$invalidate(43, getX = $$props.getX);
		if ("x0" in $$props) $$invalidate(13, x0 = $$props.x0);
		if ("bars" in $$props) $$invalidate(14, bars = $$props.bars);
	};

	let divStyle;
	let padding;
	let itemHeight;
	let svgHeight;
	let getMin;
	let getMax;
	let min;
	let max;
	let crossesZero;
	let domain;
	let getX;
	let x0;
	let bars;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*axisColor*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(0, axisColor = axisColor || "grey");
		}

		if ($$self.$$.dirty[0] & /*backgroundColor*/ 65536) {
			 $$invalidate(16, backgroundColor = backgroundColor || transparentColor);
		}

		if ($$self.$$.dirty[0] & /*barDefaultColor*/ 131072) {
			 $$invalidate(17, barDefaultColor = barDefaultColor || "black");
		}

		if ($$self.$$.dirty[0] & /*barHeight*/ 2) {
			 $$invalidate(1, barHeight = barHeight || 4);
		}

		if ($$self.$$.dirty[0] & /*focusedKeyColor*/ 262144) {
			 $$invalidate(18, focusedKeyColor = focusedKeyColor || "rgba(0, 0, 0, 0.1)");
		}

		if ($$self.$$.dirty[0] & /*fontSize*/ 4) {
			 $$invalidate(2, fontSize = fontSize || 14);
		}

		if ($$self.$$.dirty[0] & /*hoverColor*/ 524288) {
			 $$invalidate(19, hoverColor = hoverColor || "rgba(0, 0, 0, 0.05)");
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 8) {
			 $$invalidate(3, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll*/ 1048576) {
			 $$invalidate(20, shouldResetScroll = shouldResetScroll || false);
		}

		if ($$self.$$.dirty[0] & /*textColor*/ 16) {
			 $$invalidate(4, textColor = textColor || "grey");
		}

		if ($$self.$$.dirty[0] & /*title*/ 32) {
			 $$invalidate(5, title = title || undefined);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 2097152) {
			 $$invalidate(21, valueAccessor = valueAccessor || getValue);
		}

		if ($$self.$$.dirty[0] & /*backgroundColor*/ 65536) {
			 $$invalidate(9, divStyle = makeStyle({ "background-color": backgroundColor }));
		}

		if ($$self.$$.dirty[0] & /*fontSize*/ 4) {
			 $$invalidate(37, padding = fontSize / 2);
		}

		if ($$self.$$.dirty[0] & /*fontSize, barHeight*/ 6 | $$self.$$.dirty[1] & /*padding*/ 64) {
			 $$invalidate(10, itemHeight = fontSize + barHeight + 3 * padding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, items*/ 16778240) {
			 $$invalidate(11, svgHeight = itemHeight * items.length);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 2097152) {
			 $$invalidate(38, getMin = arrayMinWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 2097152) {
			 $$invalidate(39, getMax = arrayMaxWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*items*/ 16777216 | $$self.$$.dirty[1] & /*getMin*/ 128) {
			 $$invalidate(40, min = getMin(items));
		}

		if ($$self.$$.dirty[0] & /*items*/ 16777216 | $$self.$$.dirty[1] & /*getMax*/ 256) {
			 $$invalidate(41, max = getMax(items));
		}

		if ($$self.$$.dirty[1] & /*min, max*/ 1536) {
			 $$invalidate(12, crossesZero = Math.sign(min) !== Math.sign(max));
		}

		if ($$self.$$.dirty[0] & /*crossesZero*/ 4096 | $$self.$$.dirty[1] & /*min, max*/ 1536) {
			 $$invalidate(42, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
		}

		if ($$self.$$.dirty[0] & /*width*/ 64 | $$self.$$.dirty[1] & /*domain*/ 2048) {
			 $$invalidate(43, getX = linear(domain, [0, width]));
		}

		if ($$self.$$.dirty[1] & /*getX*/ 4096) {
			 $$invalidate(13, x0 = getX(0));
		}

		if ($$self.$$.dirty[0] & /*items, valueAccessor, keyToColor, barDefaultColor, keyToColorFn, focusedKey, focusedKeyColor, hoveredKey, hoverColor, formatFn, crossesZero, keyToLabel, keyToLabelFn, width, itemHeight, barHeight*/ 535696578 | $$self.$$.dirty[1] & /*padding, getX*/ 4160) {
			 $$invalidate(14, bars = items.map(item => {
				const value = valueAccessor(item);
				const isNeg = value < 0;

				return merge(item, {
					barColor: keyToColor
					? keyToColor[item.key] || barDefaultColor
					: keyToColorFn ? keyToColorFn(item.key) : barDefaultColor,
					bkgColor: item.key === focusedKey
					? focusedKeyColor
					: item.key === hoveredKey ? hoverColor : transparentColor,
					displayValue: formatFn ? formatFn(value) : value,
					dxKey: crossesZero ? isNeg ? -padding : padding : 0,
					isNeg,
					label: keyToLabel && keyToLabel[item.key]
					? keyToLabel[item.key]
					: keyToLabelFn ? keyToLabelFn(item.key) : item.key,
					x: getX(value),
					xValue: value > 0 ? width : 0,
					y: itemHeight - padding - barHeight / 2,
					yText: itemHeight - barHeight - 2 * padding
				});
			}));
		}

		if ($$self.$$.dirty[0] & /*items, shouldResetScroll*/ 17825792 | $$self.$$.dirty[1] & /*previousItems*/ 16) {
			 afterUpdate(() => {
				if (items && shouldResetScroll && !justCompare(previousItems, items)) {
					$$invalidate(8, scrollable.scrollTop = 0, scrollable);
					$$invalidate(35, previousItems = items);
				}
			});
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll, scrollable*/ 1048832 | $$self.$$.dirty[1] & /*wasNotResettingScroll*/ 32) {
			 if (wasNotResettingScroll && shouldResetScroll && scrollable) {
				$$invalidate(8, scrollable.scrollTop = 0, scrollable);
			}
		}
	};

	return [
		axisColor,
		barHeight,
		fontSize,
		isInteractive,
		textColor,
		title,
		width,
		hoveredKey,
		scrollable,
		divStyle,
		itemHeight,
		svgHeight,
		crossesZero,
		x0,
		bars,
		dispatch,
		backgroundColor,
		barDefaultColor,
		focusedKeyColor,
		hoverColor,
		shouldResetScroll,
		valueAccessor,
		focusedKey,
		formatFn,
		items,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		click_handler,
		mouseenter_handler,
		mouseleave_handler,
		main_elementresize_handler,
		main_binding,
		mouseleave_handler_1
	];
}

class BarchartV extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$d,
			create_fragment$d,
			safe_not_equal,
			{
				axisColor: 0,
				backgroundColor: 16,
				barDefaultColor: 17,
				barHeight: 1,
				focusedKey: 22,
				focusedKeyColor: 18,
				fontSize: 2,
				formatFn: 23,
				hoverColor: 19,
				isInteractive: 3,
				items: 24,
				keyToColor: 25,
				keyToColorFn: 26,
				keyToLabel: 27,
				keyToLabelFn: 28,
				shouldResetScroll: 20,
				textColor: 4,
				title: 5,
				valueAccessor: 21
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BarchartV",
			options,
			id: create_fragment$d.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*axisColor*/ ctx[0] === undefined && !("axisColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'axisColor'");
		}

		if (/*backgroundColor*/ ctx[16] === undefined && !("backgroundColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'backgroundColor'");
		}

		if (/*barDefaultColor*/ ctx[17] === undefined && !("barDefaultColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'barDefaultColor'");
		}

		if (/*barHeight*/ ctx[1] === undefined && !("barHeight" in props)) {
			console.warn("<BarchartV> was created without expected prop 'barHeight'");
		}

		if (/*focusedKey*/ ctx[22] === undefined && !("focusedKey" in props)) {
			console.warn("<BarchartV> was created without expected prop 'focusedKey'");
		}

		if (/*focusedKeyColor*/ ctx[18] === undefined && !("focusedKeyColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'focusedKeyColor'");
		}

		if (/*fontSize*/ ctx[2] === undefined && !("fontSize" in props)) {
			console.warn("<BarchartV> was created without expected prop 'fontSize'");
		}

		if (/*formatFn*/ ctx[23] === undefined && !("formatFn" in props)) {
			console.warn("<BarchartV> was created without expected prop 'formatFn'");
		}

		if (/*hoverColor*/ ctx[19] === undefined && !("hoverColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'hoverColor'");
		}

		if (/*isInteractive*/ ctx[3] === undefined && !("isInteractive" in props)) {
			console.warn("<BarchartV> was created without expected prop 'isInteractive'");
		}

		if (/*items*/ ctx[24] === undefined && !("items" in props)) {
			console.warn("<BarchartV> was created without expected prop 'items'");
		}

		if (/*keyToColor*/ ctx[25] === undefined && !("keyToColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[26] === undefined && !("keyToColorFn" in props)) {
			console.warn("<BarchartV> was created without expected prop 'keyToColorFn'");
		}

		if (/*keyToLabel*/ ctx[27] === undefined && !("keyToLabel" in props)) {
			console.warn("<BarchartV> was created without expected prop 'keyToLabel'");
		}

		if (/*keyToLabelFn*/ ctx[28] === undefined && !("keyToLabelFn" in props)) {
			console.warn("<BarchartV> was created without expected prop 'keyToLabelFn'");
		}

		if (/*shouldResetScroll*/ ctx[20] === undefined && !("shouldResetScroll" in props)) {
			console.warn("<BarchartV> was created without expected prop 'shouldResetScroll'");
		}

		if (/*textColor*/ ctx[4] === undefined && !("textColor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'textColor'");
		}

		if (/*title*/ ctx[5] === undefined && !("title" in props)) {
			console.warn("<BarchartV> was created without expected prop 'title'");
		}

		if (/*valueAccessor*/ ctx[21] === undefined && !("valueAccessor" in props)) {
			console.warn("<BarchartV> was created without expected prop 'valueAccessor'");
		}
	}

	get axisColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set axisColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get backgroundColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backgroundColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get barDefaultColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set barDefaultColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get barHeight() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set barHeight(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKey() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKeyColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKeyColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fontSize() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fontSize(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get formatFn() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set formatFn(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hoverColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hoverColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get items() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToLabel() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToLabel(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToLabelFn() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToLabelFn(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shouldResetScroll() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldResetScroll(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get textColor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set textColor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueAccessor() {
		throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueAccessor(value) {
		throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}



var barchart = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BarchartV: BarchartV
});

function identity$1(x) {
  return x;
}

function transform(transform) {
  if (transform == null) return identity$1;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}

function reverse$1(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}

function geoObject(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
      : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object(topology, o) {
  var transformPoint = transform(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }
    if (i < 0) reverse$1(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

function adder() {
  return new Adder;
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add$1(temp, y, this.t);
    add$1(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add$1(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var exp = Math.exp;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function noop() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

function geoStream(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function compose$1(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}

function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose$1(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi),
      sinDeltaPhi = sin(deltaPhi),
      cosDeltaGamma = cos(deltaGamma),
      sinDeltaGamma = sin(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

function rotation(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  };

  return forward;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius),
      sinRadius = sin(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

function clipBuffer() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
function clipRejoin(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * epsilon;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var sum$1 = adder();

function longitude(point) {
  if (abs(point[0]) <= pi)
    return point[0];
  else
    return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}

function polygonContains(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin(phi),
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  sum$1.reset();

  if (sinPhi === 1) phi = halfPi + epsilon;
  else if (sinPhi === -1) phi = -halfPi - epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;

      sum$1.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign * tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum$1 < -epsilon) ^ (winding & 1);
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
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
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function merge$1(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}

function clip(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge$1(segments);
        var startInside = polygonContains(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon
      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

function clipCircle(radius) {
  var cr = cos(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}

function clipLine(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge$1(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipRejoin(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

function identity$2(x) {
  return x;
}

var areaSum = adder(),
    areaRingSum = adder(),
    x00,
    y00,
    x0,
    y0;

var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum.reset();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

var x0$1 = Infinity,
    y0$1 = x0$1,
    x1 = -x0$1,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function() {
    var bounds = [[x0$1, y0$1], [x1, y1]];
    x1 = y1 = -(y0$1 = x0$1 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0$1) x0$1 = x;
  if (x > x1) x1 = x;
  if (y < y0$1) y0$1 = y;
  if (y > y1) y1 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00$1,
    y00$1,
    x0$2,
    y0$2;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$2 = x, y0$2 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$2, dy = y - y0$2, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$2 + x) / 2;
  Y1 += z * (y0$2 + y) / 2;
  Z1 += z;
  centroidPoint(x0$2 = x, y0$2 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$2 = x, y00$1 = y0$2 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$2,
      dy = y - y0$2,
      z = sqrt(dx * dx + dy * dy);

  X1 += z * (x0$2 + x) / 2;
  Y1 += z * (y0$2 + y) / 2;
  Z1 += z;

  z = y0$2 * x - x0$2 * y;
  X2 += z * (x0$2 + x);
  Y2 += z * (y0$2 + y);
  Z2 += z * 3;
  centroidPoint(x0$2 = x, y0$2 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};

var lengthSum = adder(),
    lengthRing,
    x00$2,
    y00$2,
    x0$3,
    y0$3;

var lengthStream = {
  point: noop,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00$2, y00$2);
    lengthStream.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00$2 = x0$3 = x, y00$2 = y0$3 = y;
}

function lengthPoint(x, y) {
  x0$3 -= x, y0$3 -= y;
  lengthSum.add(sqrt(x0$3 * x0$3 + y0$3 * y0$3));
  x0$3 = x, y0$3 = y;
}

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

function geoPath(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$2) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  geoStream(object, projection.stream(boundsStream));
  fitBounds(boundsStream.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  var cosAlpha = cos(alpha),
      sinAlpha = sin(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = clipAntimeridian, // pre-clip angle
      x0 = null, y0, x1, y1, postclip = identity$2, // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees, point[1] * degrees];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$2) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose$1(project, transform);
    projectRotateTransform = compose$1(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = pi / 3,
      m = projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin(y0), n = (sy0 + sin(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin(y)) / n;
    return [r * sin(x *= n), r0 - r * cos(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y,
        l = atan2(x, abs(r0y)) * sign(r0y);
    if (r0y * n < 0)
      l -= pi * sign(x) * sign(r0y);
    return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

function conicEqualArea() {
  return conicProjection(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
}

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

function azimuthalEqualArea() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function azimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

function mercator() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau);
}

function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

function tany(y) {
  return tan((halfPi + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : log(cy0 / cos(y1)) / log(tany(y1) / tany(y0)),
      f = cy0 * pow(tany(y0), n) / n;

  if (!n) return mercatorRaw;

  function project(x, y) {
    if (f > 0) { if (y < -halfPi + epsilon) y = -halfPi + epsilon; }
    else { if (y > halfPi - epsilon) y = halfPi - epsilon; }
    var r = f / pow(tany(y), n);
    return [r * sin(n * x), f - r * cos(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy),
      l = atan2(x, abs(fy)) * sign(fy);
    if (fy * n < 0)
      l -= pi * sign(x) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };

  return project;
}

function conicConformal() {
  return conicProjection(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function equirectangular() {
  return projection(equirectangularRaw)
      .scale(152.63);
}

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : (cy0 - cos(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs(n) < epsilon) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin(nx), g - gy * cos(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y,
        l = atan2(x, abs(gy)) * sign(gy);
    if (gy * n < 0)
      l -= pi * sign(x) * sign(gy);
    return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}

function conicEquidistant() {
  return conicProjection(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
}

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = sqrt(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = asin(M * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
    asin(sin(l) / M)
  ];
};

function equalEarth() {
  return projection(equalEarthRaw)
      .scale(177.158);
}

function gnomonicRaw(x, y) {
  var cy = cos(y), k = cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

gnomonicRaw.invert = azimuthalInvert(atan);

function gnomonic() {
  return projection(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

function naturalEarth1() {
  return projection(naturalEarth1Raw)
      .scale(175.295);
}

function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

function orthographic() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon);
}

function stereographicRaw(x, y) {
  var cy = cos(y), k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

function stereographic() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}

function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi];
};

function transverseMercator() {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var helpers = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.370,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.370,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, options) {
    switch (type) {
        case "Point": return point(coordinates).geometry;
        case "LineString": return lineString(coordinates).geometry;
        case "Polygon": return polygon(coordinates).geometry;
        case "MultiPoint": return multiPoint(coordinates).geometry;
        case "MultiLineString": return multiLineString(coordinates).geometry;
        case "MultiPolygon": return multiPolygon(coordinates).geometry;
        default: throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;
// Deprecated methods
function radians2degrees() {
    throw new Error("method has been renamed to `radiansToDegrees`");
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
    throw new Error("method has been renamed to `degreesToRadians`");
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
    throw new Error("method has been renamed to `lengthToDegrees`");
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
    throw new Error("method has been renamed to `lengthToRadians`");
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
    throw new Error("method has been renamed to `radiansToLength`");
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
    throw new Error("method has been renamed to `bearingToAzimuth`");
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
    throw new Error("method has been renamed to `convertLength`");
}
exports.convertDistance = convertDistance;
});

unwrapExports(helpers);
var helpers_1 = helpers.earthRadius;
var helpers_2 = helpers.factors;
var helpers_3 = helpers.unitsFactors;
var helpers_4 = helpers.areaFactors;
var helpers_5 = helpers.feature;
var helpers_6 = helpers.geometry;
var helpers_7 = helpers.point;
var helpers_8 = helpers.points;
var helpers_9 = helpers.polygon;
var helpers_10 = helpers.polygons;
var helpers_11 = helpers.lineString;
var helpers_12 = helpers.lineStrings;
var helpers_13 = helpers.featureCollection;
var helpers_14 = helpers.multiLineString;
var helpers_15 = helpers.multiPoint;
var helpers_16 = helpers.multiPolygon;
var helpers_17 = helpers.geometryCollection;
var helpers_18 = helpers.round;
var helpers_19 = helpers.radiansToLength;
var helpers_20 = helpers.lengthToRadians;
var helpers_21 = helpers.lengthToDegrees;
var helpers_22 = helpers.bearingToAzimuth;
var helpers_23 = helpers.radiansToDegrees;
var helpers_24 = helpers.degreesToRadians;
var helpers_25 = helpers.convertLength;
var helpers_26 = helpers.convertArea;
var helpers_27 = helpers.isNumber;
var helpers_28 = helpers.isObject;
var helpers_29 = helpers.validateBBox;
var helpers_30 = helpers.validateId;
var helpers_31 = helpers.radians2degrees;
var helpers_32 = helpers.degrees2radians;
var helpers_33 = helpers.distanceToDegrees;
var helpers_34 = helpers.distanceToRadians;
var helpers_35 = helpers.radiansToDistance;
var helpers_36 = helpers.bearingToAngle;
var helpers_37 = helpers.convertDistance;

var meta = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
                multiFeatureIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                    coordIndex++;
                    if (geomType === 'MultiPoint') multiFeatureIndex++;
                }
                if (geomType === 'LineString') multiFeatureIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') multiFeatureIndex++;
                    if (geomType === 'Polygon') geometryIndex++;
                }
                if (geomType === 'Polygon') multiFeatureIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    geometryIndex = 0;
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                            coordIndex++;
                        }
                        geometryIndex++;
                    }
                    multiFeatureIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < geometry.geometries.length; j++)
                    if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;
        else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
    }, excludeWrapCoord);
    return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
    case 'Feature':
        callback(geojson.properties, 0);
        break;
    }
}


/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;
        else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i], i) === false) break;
        }
    }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
    var i, j, g, geometry, stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry :
            (isFeature ? geojson.geometry : geojson));
        featureProperties = (isFeatureCollection ? geojson.features[i].properties :
            (isFeature ? geojson.properties : {}));
        featureBBox = (isFeatureCollection ? geojson.features[i].bbox :
            (isFeature ? geojson.bbox : undefined));
        featureId = (isFeatureCollection ? geojson.features[i].id :
            (isFeature ? geojson.id : undefined));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            // Handle null Geometry
            if (geometry === null) {
                if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
        // Callback for single geometry
        var type = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            if (callback(helpers.feature(geometry, properties, {bbox: bbox, id: id}), featureIndex, 0) === false) return false;
            return;
        }

        var geomType;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
            var coordinate = geometry.coordinates[multiFeatureIndex];
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            if (callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
        }
    });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, multiFeatureIndex) {
        if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
    });
    return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        var segmentIndex = 0;

        // Exclude null Geometries
        if (!feature.geometry) return;
        // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        // Generate 2-vertex line segments
        var previousCoords;
        var previousFeatureIndex = 0;
        var previousMultiIndex = 0;
        var prevGeomIndex = 0;
        if (coordEach(feature, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
            // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
            if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
                previousCoords = currentCoord;
                previousFeatureIndex = featureIndex;
                previousMultiIndex = multiPartIndexCoord;
                prevGeomIndex = geometryIndex;
                segmentIndex = 0;
                return;
            }
            var currentSegment = helpers.lineString([previousCoords, currentCoord], feature.properties);
            if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
            segmentIndex++;
            previousCoords = currentCoord;
        }) === false) return false;
    });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentInex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
        if (started === false && initialValue === undefined) previousValue = currentSegment;
        else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
        started = true;
    });
    return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error('geojson is required');

    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        if (feature.geometry === null) return;
        var type = feature.geometry.type;
        var coords = feature.geometry.coordinates;
        switch (type) {
        case 'LineString':
            if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false) return false;
            break;
        case 'Polygon':
            for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
                if (callback(helpers.lineString(coords[geometryIndex], feature.properties), featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            }
            break;
        }
    });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(geojson, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine;
        else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
    });
    return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find SegmentIndex
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return helpers.lineString([coords[segmentIndex], coords[segmentIndex + 1]], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[geometryIndex][segmentIndex], coords[geometryIndex][segmentIndex + 1]], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][segmentIndex], coords[multiFeatureIndex][segmentIndex + 1]], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][geometryIndex][segmentIndex], coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]], properties, options);
    }
    throw new Error('geojson is invalid');
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find Coord Index
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
        return helpers.point(coords, properties, options);
    case 'MultiPoint':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        return helpers.point(coords[multiFeatureIndex], properties, options);
    case 'LineString':
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return helpers.point(coords[coordIndex], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[geometryIndex].length + coordIndex;
        return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return helpers.point(coords[multiFeatureIndex][geometryIndex][coordIndex], properties, options);
    }
    throw new Error('geojson is invalid');
}

exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.coordAll = coordAll;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.findSegment = findSegment;
exports.findPoint = findPoint;
});

unwrapExports(meta);
var meta_1 = meta.coordEach;
var meta_2 = meta.coordReduce;
var meta_3 = meta.propEach;
var meta_4 = meta.propReduce;
var meta_5 = meta.featureEach;
var meta_6 = meta.featureReduce;
var meta_7 = meta.coordAll;
var meta_8 = meta.geomEach;
var meta_9 = meta.geomReduce;
var meta_10 = meta.flattenEach;
var meta_11 = meta.flattenReduce;
var meta_12 = meta.segmentEach;
var meta_13 = meta.segmentReduce;
var meta_14 = meta.lineEach;
var meta_15 = meta.lineReduce;
var meta_16 = meta.findSegment;
var meta_17 = meta.findPoint;

var bbox_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta.coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
exports.default = bbox;
});

unwrapExports(bbox_1);

var centroid_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @name centroid
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] an Object that is used as the {@link Feature}'s properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = turf.centroid(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, centroid]
 */
function centroid(geojson, options) {
    if (options === void 0) { options = {}; }
    var xSum = 0;
    var ySum = 0;
    var len = 0;
    meta.coordEach(geojson, function (coord) {
        xSum += coord[0];
        ySum += coord[1];
        len++;
    });
    return helpers.point([xSum / len, ySum / len], options.properties);
}
exports.default = centroid;
});

var centroid = unwrapExports(centroid_1);

var truncate_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @name truncate
 * @param {GeoJSON} geojson any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.precision=6] coordinate decimal precision
 * @param {number} [options.coordinates=3] maximum number of coordinates (primarly used to remove z coordinates)
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = turf.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = turf.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 *
 * //addToMap
 * var addToMap = [truncated];
 */
function truncate(geojson, options) {
    if (options === void 0) { options = {}; }
    // Optional parameters
    var precision = options.precision;
    var coordinates = options.coordinates;
    var mutate = options.mutate;
    // default params
    precision = (precision === undefined || precision === null || isNaN(precision)) ? 6 : precision;
    coordinates = (coordinates === undefined || coordinates === null || isNaN(coordinates)) ? 3 : coordinates;
    // validation
    if (!geojson)
        throw new Error('<geojson> is required');
    if (typeof precision !== 'number')
        throw new Error('<precision> must be a number');
    if (typeof coordinates !== 'number')
        throw new Error('<coordinates> must be a number');
    // prevent input mutation
    if (mutate === false || mutate === undefined)
        geojson = JSON.parse(JSON.stringify(geojson));
    var factor = Math.pow(10, precision);
    // Truncate Coordinates
    meta.coordEach(geojson, function (coords) {
        truncateCoords(coords, factor, coordinates);
    });
    return geojson;
}
/**
 * Truncate Coordinates - Mutates coordinates in place
 *
 * @private
 * @param {Array<any>} coords Geometry Coordinates
 * @param {number} factor rounding factor for coordinate decimal precision
 * @param {number} coordinates maximum number of coordinates (primarly used to remove z coordinates)
 * @returns {Array<any>} mutated coordinates
 */
function truncateCoords(coords, factor, coordinates) {
    // Remove extra coordinates (usually elevation coordinates and more)
    if (coords.length > coordinates)
        coords.splice(coordinates, coords.length);
    // Truncate coordinate decimals
    for (var i = 0; i < coords.length; i++) {
        coords[i] = Math.round(coords[i] * factor) / factor;
    }
    return coords;
}
exports.default = truncate;
});

var truncate = unwrapExports(truncate_1);

/**
* @module @svizzle/geo/geojson
*/

/**
 * Return a function expecting a geojson and creating or updating the provided property of all features using the provided map.
 * Note that you can pass a `key or an alternative key `key_alt` e.g. when you use ISO Alpha 2 codes and you need to identify unrecognized territories with another key.
 *
 * @function
 * @arg {object} args - Geojson object
 * @arg {string} args.key_alt - Alternative key to be found in properties in `key` is not found.
 * @arg {string} args.key - Key to be found in properties
 * @arg {object} args.map - Mapping key (string) -> string
 * @arg {function} args.mapFn - Function key (string) -> string
 * @arg {string} args.propName - Name of the property to be added to `properties`
 * @return {function} - Object -> Object
 *
 * @example
> const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
        ]
      },
      properties: {iso_a2: 'BF'}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
        ]
      },
      properties: {name: 'Kosovo'}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
        ]
      },
      properties: {iso_a2: 'FR'}
    }
  ]
}
> const keyToColor = {BF: 'red', Kosovo: 'yellow'};
> const addColor = makeAddFeaturesProperty({
  propName: 'color',
  map: keyToColor,
  key: 'iso_a2',
  key_alt: 'name'
});
> const coloredFeatures = addColor(geojson);
{
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
        ]
      },
      properties: {iso_a2: 'BF', color: 'red'}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
        ]
      },
      properties: {name: 'Kosovo', color: 'yellow'}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
        ]
      },
      properties: {iso_a2: 'FR', color: undefined}
    }
  ]
}
 * @version 0.5.0
 */
const makeUpdateFeaturesProperty = ({
	key_alt,
	key,
	map,
	mapFn,
	propName,
}) =>
	updateKey('features', mapWith(
		updateKey('properties', properties => {
			let propValue;

			if (map) {
				propValue = has(map, properties[key])
					? map[properties[key]]
					: has(map, properties[key_alt])
						? map[properties[key_alt]]
						: undefined;
			} else if (mapFn) {
				propValue = properties[key]
					? mapFn(properties[key])
					: properties[key_alt]
						? mapFn(properties[key_alt])
						: undefined;
			}

			return {
				...properties,
				[propName]: propValue
			}
		})
	));

/**
 * Return the a collection of centroids of the provided features, each having the correspondent feature properties.
 *
 * @function
 * @arg {array} features - Array of features
 * @return {object} collection - FeatureCollection of Point features
 *
 * @example

makeCentroids([
  {type: "Feature",
   properties: {"foo": "a"},
   geometry: {type: "LineString", coordinates: [
     [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
   ]}
  },
  {type: "Feature",
   properties: {"foo": "b"},
   geometry: {type: "LineString", coordinates: [
     [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
   ]}
  }
])
// => {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    geometry: {type: "Point", coordinates: [0.2, -0.2]},
    properties: {foo: "a"}
  }, {
    type: "Feature",
    geometry: {type: "Point", coordinates: [1.2, -0.2]},
    properties: {foo: "b"}
  }]
}

 * @version 0.1.0
 */
const makeCentroids = pipe([
	mapWith(feature => centroid(feature, {properties: feature.properties})),
	helpers_13
]);

// TODO use a reduce to include only items with lat/lng as defined by coordPicker

/**
 * Return a function returning a copy of the provided geojson having the geometry coordinates rounded to the given precision.
 *
 * @function
 * @arg {number} precision - coordinate decimal precision
 * @return {function} - Geojson -> Geojson
 *
 * @example
const truncateGeometry = setGeometryPrecision(4);
const point = {
  "type": "Feature",
  "geometry": {"type": "Point", "coordinates": [0.1234567, 0.12341]},
  "properties": {"name": "a"}
};
truncateGeometry(point)
// => {
  "type": "Feature",
  "geometry": {"type": "Point", "coordinates": [0.1234, 0.1234]},
  "properties": {"name": "a"}
}
 * @version 0.1.0
 */
const setGeometryPrecision = precision =>
	geojson => truncate(geojson, {precision, mutate: false});

// TODO DOC: define FeatureCollection type



var projections = /*#__PURE__*/Object.freeze({
    __proto__: null,
    geoAzimuthalEqualArea: azimuthalEqualArea,
    geoAzimuthalEquidistant: azimuthalEquidistant,
    geoGnomonic: gnomonic,
    geoOrthographic: orthographic,
    geoStereographic: stereographic,
    geoEqualEarth: equalEarth,
    geoConicConformal: conicConformal,
    geoConicEqualArea: conicEqualArea,
    geoConicEquidistant: conicEquidistant,
    geoEquirectangular: equirectangular,
    geoMercator: mercator,
    geoTransverseMercator: transverseMercator,
    geoNaturalEarth1: naturalEarth1
});

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethSVG.svelte generated by Svelte v3.23.2 */
const file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethSVG.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[35] = list[i];
	return child_ctx;
}

// (85:0) {#if height && width}
function create_if_block$5(ctx) {
	let svg;
	let g;
	let g_transform_value;
	let if_block = /*isReady*/ ctx[15] && create_if_block_1$4(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			g = svg_element("g");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(nodes, "svg", { height: true, width: true, class: true }, 1);
			var svg_nodes = children(svg);
			g = claim_element(svg_nodes, "g", { transform: true }, 1);
			var g_nodes = children(g);
			if (if_block) if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "transform", g_transform_value = `translate(${/*safety*/ ctx[18].left},${/*safety*/ ctx[18].top})`);
			add_location(g, file$8, 86, 2, 2743);
			attr_dev(svg, "height", /*height*/ ctx[0]);
			attr_dev(svg, "width", /*width*/ ctx[1]);
			attr_dev(svg, "class", "svelte-113z93j");
			add_location(svg, file$8, 85, 0, 2718);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, g);
			if (if_block) if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (/*isReady*/ ctx[15]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$4(ctx);
					if_block.c();
					if_block.m(g, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*height*/ 1) {
				attr_dev(svg, "height", /*height*/ ctx[0]);
			}

			if (dirty[0] & /*width*/ 2) {
				attr_dev(svg, "width", /*width*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(85:0) {#if height && width}",
		ctx
	});

	return block;
}

// (88:4) {#if isReady}
function create_if_block_1$4(ctx) {
	let rect;
	let each_1_anchor;
	let each_value = /*coloredGeojson*/ ctx[10].features;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			rect = svg_element("rect");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { height: true, width: true, fill: true }, 1);
			children(rect).forEach(detach_dev);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[0]);
			attr_dev(rect, "width", /*width*/ ctx[1]);
			attr_dev(rect, "fill", /*colorSea*/ ctx[3]);
			add_location(rect, file$8, 88, 4, 2825);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 1) {
				attr_dev(rect, "height", /*height*/ ctx[0]);
			}

			if (dirty[0] & /*width*/ 2) {
				attr_dev(rect, "width", /*width*/ ctx[1]);
			}

			if (dirty[0] & /*colorSea*/ 8) {
				attr_dev(rect, "fill", /*colorSea*/ ctx[3]);
			}

			if (dirty[0] & /*key_alt, geopath, coloredGeojson, colorDefaultFill, isSelected, colorStrokeSelected, colorStroke, sizeStrokeSelected, sizeStroke, isClickable, isDeselected, dispatch, getPayload, isInteractive*/ 229364) {
				each_value = /*coloredGeojson*/ ctx[10].features;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(88:4) {#if isReady}",
		ctx
	});

	return block;
}

// (94:4) {#each coloredGeojson.features as feature}
function create_each_block$4(ctx) {
	let g;
	let path;
	let path_d_value;
	let path_fill_value;
	let path_stroke_value;
	let path_stroke_width_value;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[26](/*feature*/ ctx[35], ...args);
	}

	function mouseenter_handler(...args) {
		return /*mouseenter_handler*/ ctx[27](/*feature*/ ctx[35], ...args);
	}

	function mouseleave_handler(...args) {
		return /*mouseleave_handler*/ ctx[28](/*feature*/ ctx[35], ...args);
	}

	const block = {
		c: function create() {
			g = svg_element("g");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, id: true }, 1);
			var g_nodes = children(g);

			path = claim_element(
				g_nodes,
				"path",
				{
					d: true,
					fill: true,
					stroke: true,
					"stroke-width": true,
					class: true
				},
				1
			);

			children(path).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", path_d_value = /*geopath*/ ctx[11](/*feature*/ ctx[35]));
			attr_dev(path, "fill", path_fill_value = /*feature*/ ctx[35].properties.color || /*colorDefaultFill*/ ctx[2]);

			attr_dev(path, "stroke", path_stroke_value = /*isSelected*/ ctx[13](/*feature*/ ctx[35])
			? /*colorStrokeSelected*/ ctx[5]
			: /*colorStroke*/ ctx[4]);

			attr_dev(path, "stroke-width", path_stroke_width_value = /*isSelected*/ ctx[13](/*feature*/ ctx[35])
			? /*sizeStrokeSelected*/ ctx[9]
			: /*sizeStroke*/ ctx[8]);

			attr_dev(path, "class", "svelte-113z93j");
			toggle_class(path, "clickable", /*isClickable*/ ctx[16](/*feature*/ ctx[35]));
			toggle_class(path, "deselected", /*isDeselected*/ ctx[14](/*feature*/ ctx[35]));
			add_location(path, file$8, 95, 6, 2981);
			attr_dev(g, "class", "feature svelte-113z93j");
			attr_dev(g, "id", /*key_alt*/ ctx[7]);
			add_location(g, file$8, 94, 4, 2940);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, path);

			if (!mounted) {
				dispose = [
					listen_dev(path, "click", click_handler, false, false, false),
					listen_dev(path, "mouseenter", mouseenter_handler, false, false, false),
					listen_dev(path, "mouseleave", mouseleave_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*geopath, coloredGeojson*/ 3072 && path_d_value !== (path_d_value = /*geopath*/ ctx[11](/*feature*/ ctx[35]))) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty[0] & /*coloredGeojson, colorDefaultFill*/ 1028 && path_fill_value !== (path_fill_value = /*feature*/ ctx[35].properties.color || /*colorDefaultFill*/ ctx[2])) {
				attr_dev(path, "fill", path_fill_value);
			}

			if (dirty[0] & /*isSelected, coloredGeojson, colorStrokeSelected, colorStroke*/ 9264 && path_stroke_value !== (path_stroke_value = /*isSelected*/ ctx[13](/*feature*/ ctx[35])
			? /*colorStrokeSelected*/ ctx[5]
			: /*colorStroke*/ ctx[4])) {
				attr_dev(path, "stroke", path_stroke_value);
			}

			if (dirty[0] & /*isSelected, coloredGeojson, sizeStrokeSelected, sizeStroke*/ 9984 && path_stroke_width_value !== (path_stroke_width_value = /*isSelected*/ ctx[13](/*feature*/ ctx[35])
			? /*sizeStrokeSelected*/ ctx[9]
			: /*sizeStroke*/ ctx[8])) {
				attr_dev(path, "stroke-width", path_stroke_width_value);
			}

			if (dirty[0] & /*isClickable, coloredGeojson*/ 66560) {
				toggle_class(path, "clickable", /*isClickable*/ ctx[16](/*feature*/ ctx[35]));
			}

			if (dirty[0] & /*isDeselected, coloredGeojson*/ 17408) {
				toggle_class(path, "deselected", /*isDeselected*/ ctx[14](/*feature*/ ctx[35]));
			}

			if (dirty[0] & /*key_alt*/ 128) {
				attr_dev(g, "id", /*key_alt*/ ctx[7]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$4.name,
		type: "each",
		source: "(94:4) {#each coloredGeojson.features as feature}",
		ctx
	});

	return block;
}

function create_fragment$e(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[0] && /*width*/ ctx[1] && create_if_block$5(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*height*/ ctx[0] && /*width*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	const hasColor = isNotNullWith(getPath("properties.color"));
	const safety = { top: 10, right: 10, bottom: 10, left: 10 };
	const truncateGeojson = setGeometryPrecision(4);
	const topoToGeo = (topojson, id) => truncateGeojson(geoObject(topojson, topojson.objects[id]));
	let { height } = $$props;
	let { key } = $$props;
	let { topojson } = $$props;
	let { topojsonId } = $$props;
	let { width } = $$props;
	let { colorDefaultFill } = $$props;
	let { colorSea } = $$props;
	let { colorStroke } = $$props;
	let { colorStrokeSelected } = $$props;
	let { isInteractive } = $$props;
	let { key_alt } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projection } = $$props;
	let { selectedKeys } = $$props;
	let { sizeStroke } = $$props;
	let { sizeStrokeSelected } = $$props;

	const writable_props = [
		"height",
		"key",
		"topojson",
		"topojsonId",
		"width",
		"colorDefaultFill",
		"colorSea",
		"colorStroke",
		"colorStrokeSelected",
		"isInteractive",
		"key_alt",
		"keyToColor",
		"keyToColorFn",
		"projection",
		"selectedKeys",
		"sizeStroke",
		"sizeStrokeSelected"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoroplethSVG> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ChoroplethSVG", $$slots, []);
	const click_handler = feature => isClickable(feature) && dispatch("clicked", getPayload(feature));
	const mouseenter_handler = feature => isInteractive && dispatch("entered", getPayload(feature));
	const mouseleave_handler = feature => isInteractive && dispatch("exited", getPayload(feature));

	$$self.$set = $$props => {
		if ("height" in $$props) $$invalidate(0, height = $$props.height);
		if ("key" in $$props) $$invalidate(21, key = $$props.key);
		if ("topojson" in $$props) $$invalidate(22, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(23, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(1, width = $$props.width);
		if ("colorDefaultFill" in $$props) $$invalidate(2, colorDefaultFill = $$props.colorDefaultFill);
		if ("colorSea" in $$props) $$invalidate(3, colorSea = $$props.colorSea);
		if ("colorStroke" in $$props) $$invalidate(4, colorStroke = $$props.colorStroke);
		if ("colorStrokeSelected" in $$props) $$invalidate(5, colorStrokeSelected = $$props.colorStrokeSelected);
		if ("isInteractive" in $$props) $$invalidate(6, isInteractive = $$props.isInteractive);
		if ("key_alt" in $$props) $$invalidate(7, key_alt = $$props.key_alt);
		if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
		if ("projection" in $$props) $$invalidate(19, projection = $$props.projection);
		if ("selectedKeys" in $$props) $$invalidate(20, selectedKeys = $$props.selectedKeys);
		if ("sizeStroke" in $$props) $$invalidate(8, sizeStroke = $$props.sizeStroke);
		if ("sizeStrokeSelected" in $$props) $$invalidate(9, sizeStrokeSelected = $$props.sizeStrokeSelected);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		geoObject,
		geoPath,
		_,
		makeUpdateFeaturesProperty,
		setGeometryPrecision,
		isNotNullWith,
		projections,
		dispatch,
		hasColor,
		safety,
		truncateGeojson,
		topoToGeo,
		height,
		key,
		topojson,
		topojsonId,
		width,
		colorDefaultFill,
		colorSea,
		colorStroke,
		colorStrokeSelected,
		isInteractive,
		key_alt,
		keyToColor,
		keyToColorFn,
		projection,
		selectedKeys,
		sizeStroke,
		sizeStrokeSelected,
		geojson,
		createColoredGeojson,
		coloredGeojson,
		fitProjection,
		geopath,
		getPayload,
		isSelected,
		isDeselected,
		isReady,
		isClickable
	});

	$$self.$inject_state = $$props => {
		if ("height" in $$props) $$invalidate(0, height = $$props.height);
		if ("key" in $$props) $$invalidate(21, key = $$props.key);
		if ("topojson" in $$props) $$invalidate(22, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(23, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(1, width = $$props.width);
		if ("colorDefaultFill" in $$props) $$invalidate(2, colorDefaultFill = $$props.colorDefaultFill);
		if ("colorSea" in $$props) $$invalidate(3, colorSea = $$props.colorSea);
		if ("colorStroke" in $$props) $$invalidate(4, colorStroke = $$props.colorStroke);
		if ("colorStrokeSelected" in $$props) $$invalidate(5, colorStrokeSelected = $$props.colorStrokeSelected);
		if ("isInteractive" in $$props) $$invalidate(6, isInteractive = $$props.isInteractive);
		if ("key_alt" in $$props) $$invalidate(7, key_alt = $$props.key_alt);
		if ("keyToColor" in $$props) $$invalidate(24, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(25, keyToColorFn = $$props.keyToColorFn);
		if ("projection" in $$props) $$invalidate(19, projection = $$props.projection);
		if ("selectedKeys" in $$props) $$invalidate(20, selectedKeys = $$props.selectedKeys);
		if ("sizeStroke" in $$props) $$invalidate(8, sizeStroke = $$props.sizeStroke);
		if ("sizeStrokeSelected" in $$props) $$invalidate(9, sizeStrokeSelected = $$props.sizeStrokeSelected);
		if ("geojson" in $$props) $$invalidate(29, geojson = $$props.geojson);
		if ("createColoredGeojson" in $$props) $$invalidate(30, createColoredGeojson = $$props.createColoredGeojson);
		if ("coloredGeojson" in $$props) $$invalidate(10, coloredGeojson = $$props.coloredGeojson);
		if ("fitProjection" in $$props) $$invalidate(31, fitProjection = $$props.fitProjection);
		if ("geopath" in $$props) $$invalidate(11, geopath = $$props.geopath);
		if ("getPayload" in $$props) $$invalidate(12, getPayload = $$props.getPayload);
		if ("isSelected" in $$props) $$invalidate(13, isSelected = $$props.isSelected);
		if ("isDeselected" in $$props) $$invalidate(14, isDeselected = $$props.isDeselected);
		if ("isReady" in $$props) $$invalidate(15, isReady = $$props.isReady);
		if ("isClickable" in $$props) $$invalidate(16, isClickable = $$props.isClickable);
	};

	let geojson;
	let createColoredGeojson;
	let coloredGeojson;
	let fitProjection;
	let geopath;
	let getPayload;
	let isSelected;
	let isDeselected;
	let isReady;
	let isClickable;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*colorDefaultFill*/ 4) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			 $$invalidate(2, colorDefaultFill = colorDefaultFill || "white");
		}

		if ($$self.$$.dirty[0] & /*colorSea*/ 8) {
			 $$invalidate(3, colorSea = colorSea || "white");
		}

		if ($$self.$$.dirty[0] & /*colorStroke*/ 16) {
			 $$invalidate(4, colorStroke = colorStroke || "grey");
		}

		if ($$self.$$.dirty[0] & /*colorStrokeSelected*/ 32) {
			 $$invalidate(5, colorStrokeSelected = colorStrokeSelected || "black");
		}

		if ($$self.$$.dirty[0] & /*topojson, topojsonId*/ 12582912) {
			 $$invalidate(29, geojson = topoToGeo(topojson, topojsonId));
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 64) {
			 $$invalidate(6, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*key_alt*/ 128) {
			 $$invalidate(7, key_alt = key_alt || "name");
		}

		if ($$self.$$.dirty[0] & /*projection*/ 524288) {
			 $$invalidate(19, projection = projection && projections[projection] || equirectangular);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 1048576) {
			 $$invalidate(20, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*sizeStroke*/ 256) {
			 $$invalidate(8, sizeStroke = sizeStroke || 0.5);
		}

		if ($$self.$$.dirty[0] & /*sizeStrokeSelected*/ 512) {
			 $$invalidate(9, sizeStrokeSelected = sizeStrokeSelected || 1);
		}

		if ($$self.$$.dirty[0] & /*height*/ 1) {
			 $$invalidate(0, height = Math.max(0, height - safety.top - safety.bottom));
		}

		if ($$self.$$.dirty[0] & /*width*/ 2) {
			 $$invalidate(1, width = Math.max(0, width - safety.left - safety.right));
		}

		if ($$self.$$.dirty[0] & /*key_alt, key, keyToColor, keyToColorFn*/ 52428928) {
			 $$invalidate(30, createColoredGeojson = makeUpdateFeaturesProperty({
				key_alt,
				key,
				map: keyToColor,
				mapFn: keyToColorFn,
				propName: "color"
			}));
		}

		if ($$self.$$.dirty[0] & /*geojson, createColoredGeojson*/ 1610612736) {
			 $$invalidate(10, coloredGeojson = geojson && createColoredGeojson(geojson));
		}

		if ($$self.$$.dirty[0] & /*geojson, projection, width, height*/ 537395203) {
			 $$invalidate(31, fitProjection = geojson && projection().fitSize([width, height], geojson));
		}

		if ($$self.$$.dirty[1] & /*fitProjection*/ 1) {
			 $$invalidate(11, geopath = fitProjection && geoPath(fitProjection));
		}

		if ($$self.$$.dirty[0] & /*key, key_alt*/ 2097280) {
			 $$invalidate(12, getPayload = feature => feature.properties[key] || feature.properties[key_alt]);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 1052672) {
			 $$invalidate(13, isSelected = feature => selectedKeys.length && selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 1052672) {
			 $$invalidate(14, isDeselected = feature => selectedKeys.length && !selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*geopath, coloredGeojson*/ 3072) {
			 $$invalidate(15, isReady = geopath && coloredGeojson);
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 64) {
			 $$invalidate(16, isClickable = feature => isInteractive && hasColor(feature));
		}
	};

	return [
		height,
		width,
		colorDefaultFill,
		colorSea,
		colorStroke,
		colorStrokeSelected,
		isInteractive,
		key_alt,
		sizeStroke,
		sizeStrokeSelected,
		coloredGeojson,
		geopath,
		getPayload,
		isSelected,
		isDeselected,
		isReady,
		isClickable,
		dispatch,
		safety,
		projection,
		selectedKeys,
		key,
		topojson,
		topojsonId,
		keyToColor,
		keyToColorFn,
		click_handler,
		mouseenter_handler,
		mouseleave_handler
	];
}

class ChoroplethSVG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$e,
			create_fragment$e,
			safe_not_equal,
			{
				height: 0,
				key: 21,
				topojson: 22,
				topojsonId: 23,
				width: 1,
				colorDefaultFill: 2,
				colorSea: 3,
				colorStroke: 4,
				colorStrokeSelected: 5,
				isInteractive: 6,
				key_alt: 7,
				keyToColor: 24,
				keyToColorFn: 25,
				projection: 19,
				selectedKeys: 20,
				sizeStroke: 8,
				sizeStrokeSelected: 9
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChoroplethSVG",
			options,
			id: create_fragment$e.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*height*/ ctx[0] === undefined && !("height" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'height'");
		}

		if (/*key*/ ctx[21] === undefined && !("key" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'key'");
		}

		if (/*topojson*/ ctx[22] === undefined && !("topojson" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'topojson'");
		}

		if (/*topojsonId*/ ctx[23] === undefined && !("topojsonId" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'topojsonId'");
		}

		if (/*width*/ ctx[1] === undefined && !("width" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'width'");
		}

		if (/*colorDefaultFill*/ ctx[2] === undefined && !("colorDefaultFill" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'colorDefaultFill'");
		}

		if (/*colorSea*/ ctx[3] === undefined && !("colorSea" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'colorSea'");
		}

		if (/*colorStroke*/ ctx[4] === undefined && !("colorStroke" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'colorStroke'");
		}

		if (/*colorStrokeSelected*/ ctx[5] === undefined && !("colorStrokeSelected" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'colorStrokeSelected'");
		}

		if (/*isInteractive*/ ctx[6] === undefined && !("isInteractive" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'isInteractive'");
		}

		if (/*key_alt*/ ctx[7] === undefined && !("key_alt" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'key_alt'");
		}

		if (/*keyToColor*/ ctx[24] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[25] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'keyToColorFn'");
		}

		if (/*projection*/ ctx[19] === undefined && !("projection" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'projection'");
		}

		if (/*selectedKeys*/ ctx[20] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'selectedKeys'");
		}

		if (/*sizeStroke*/ ctx[8] === undefined && !("sizeStroke" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'sizeStroke'");
		}

		if (/*sizeStrokeSelected*/ ctx[9] === undefined && !("sizeStrokeSelected" in props)) {
			console.warn("<ChoroplethSVG> was created without expected prop 'sizeStrokeSelected'");
		}
	}

	get height() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojson() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojson(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojsonId() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojsonId(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorDefaultFill() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorDefaultFill(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorSea() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorSea(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorStroke() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorStroke(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorStrokeSelected() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorStrokeSelected(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key_alt() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key_alt(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projection() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projection(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sizeStroke() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sizeStroke(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sizeStrokeSelected() {
		throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sizeStrokeSelected(value) {
		throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte generated by Svelte v3.23.2 */
const file$9 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte";

function create_fragment$f(ctx) {
	let div;
	let choroplethsvg;
	let div_resize_listener;
	let current;

	choroplethsvg = new ChoroplethSVG({
			props: {
				colorDefaultFill: /*colorDefaultFill*/ ctx[0],
				colorSea: /*colorSea*/ ctx[1],
				colorStroke: /*colorStroke*/ ctx[2],
				colorStrokeSelected: /*colorStrokeSelected*/ ctx[3],
				height: /*height*/ ctx[14],
				isInteractive: /*isInteractive*/ ctx[4],
				key: /*key*/ ctx[5],
				keyToColor: /*keyToColor*/ ctx[6],
				keyToColorFn: /*keyToColorFn*/ ctx[7],
				projection: /*projection*/ ctx[8],
				selectedKeys: /*selectedKeys*/ ctx[9],
				sizeStroke: /*sizeStroke*/ ctx[10],
				sizeStrokeSelected: /*sizeStrokeSelected*/ ctx[11],
				topojson: /*topojson*/ ctx[12],
				topojsonId: /*topojsonId*/ ctx[13],
				width: /*width*/ ctx[15]
			},
			$$inline: true
		});

	choroplethsvg.$on("clicked", /*clicked_handler*/ ctx[16]);
	choroplethsvg.$on("entered", /*entered_handler*/ ctx[17]);
	choroplethsvg.$on("exited", /*exited_handler*/ ctx[18]);

	const block = {
		c: function create() {
			div = element("div");
			create_component(choroplethsvg.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(choroplethsvg.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "ChoroplethDiv svelte-1g30svd");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[19].call(div));
			add_location(div, file$9, 23, 0, 498);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(choroplethsvg, div, null);
			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[19].bind(div));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const choroplethsvg_changes = {};
			if (dirty & /*colorDefaultFill*/ 1) choroplethsvg_changes.colorDefaultFill = /*colorDefaultFill*/ ctx[0];
			if (dirty & /*colorSea*/ 2) choroplethsvg_changes.colorSea = /*colorSea*/ ctx[1];
			if (dirty & /*colorStroke*/ 4) choroplethsvg_changes.colorStroke = /*colorStroke*/ ctx[2];
			if (dirty & /*colorStrokeSelected*/ 8) choroplethsvg_changes.colorStrokeSelected = /*colorStrokeSelected*/ ctx[3];
			if (dirty & /*height*/ 16384) choroplethsvg_changes.height = /*height*/ ctx[14];
			if (dirty & /*isInteractive*/ 16) choroplethsvg_changes.isInteractive = /*isInteractive*/ ctx[4];
			if (dirty & /*key*/ 32) choroplethsvg_changes.key = /*key*/ ctx[5];
			if (dirty & /*keyToColor*/ 64) choroplethsvg_changes.keyToColor = /*keyToColor*/ ctx[6];
			if (dirty & /*keyToColorFn*/ 128) choroplethsvg_changes.keyToColorFn = /*keyToColorFn*/ ctx[7];
			if (dirty & /*projection*/ 256) choroplethsvg_changes.projection = /*projection*/ ctx[8];
			if (dirty & /*selectedKeys*/ 512) choroplethsvg_changes.selectedKeys = /*selectedKeys*/ ctx[9];
			if (dirty & /*sizeStroke*/ 1024) choroplethsvg_changes.sizeStroke = /*sizeStroke*/ ctx[10];
			if (dirty & /*sizeStrokeSelected*/ 2048) choroplethsvg_changes.sizeStrokeSelected = /*sizeStrokeSelected*/ ctx[11];
			if (dirty & /*topojson*/ 4096) choroplethsvg_changes.topojson = /*topojson*/ ctx[12];
			if (dirty & /*topojsonId*/ 8192) choroplethsvg_changes.topojsonId = /*topojsonId*/ ctx[13];
			if (dirty & /*width*/ 32768) choroplethsvg_changes.width = /*width*/ ctx[15];
			choroplethsvg.$set(choroplethsvg_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(choroplethsvg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(choroplethsvg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(choroplethsvg);
			div_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let { colorDefaultFill } = $$props;
	let { colorSea } = $$props;
	let { colorStroke } = $$props;
	let { colorStrokeSelected } = $$props;
	let { isInteractive } = $$props;
	let { key } = $$props;
	let { keyToColor } = $$props;
	let { keyToColorFn } = $$props;
	let { projection } = $$props;
	let { selectedKeys } = $$props;
	let { sizeStroke } = $$props;
	let { sizeStrokeSelected } = $$props;
	let { topojson } = $$props;
	let { topojsonId } = $$props;
	let height;
	let width;

	const writable_props = [
		"colorDefaultFill",
		"colorSea",
		"colorStroke",
		"colorStrokeSelected",
		"isInteractive",
		"key",
		"keyToColor",
		"keyToColorFn",
		"projection",
		"selectedKeys",
		"sizeStroke",
		"sizeStrokeSelected",
		"topojson",
		"topojsonId"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoroplethDiv> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ChoroplethDiv", $$slots, []);

	function clicked_handler(event) {
		bubble($$self, event);
	}

	function entered_handler(event) {
		bubble($$self, event);
	}

	function exited_handler(event) {
		bubble($$self, event);
	}

	function div_elementresize_handler() {
		height = this.clientHeight;
		width = this.clientWidth;
		$$invalidate(14, height);
		$$invalidate(15, width);
	}

	$$self.$set = $$props => {
		if ("colorDefaultFill" in $$props) $$invalidate(0, colorDefaultFill = $$props.colorDefaultFill);
		if ("colorSea" in $$props) $$invalidate(1, colorSea = $$props.colorSea);
		if ("colorStroke" in $$props) $$invalidate(2, colorStroke = $$props.colorStroke);
		if ("colorStrokeSelected" in $$props) $$invalidate(3, colorStrokeSelected = $$props.colorStrokeSelected);
		if ("isInteractive" in $$props) $$invalidate(4, isInteractive = $$props.isInteractive);
		if ("key" in $$props) $$invalidate(5, key = $$props.key);
		if ("keyToColor" in $$props) $$invalidate(6, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(7, keyToColorFn = $$props.keyToColorFn);
		if ("projection" in $$props) $$invalidate(8, projection = $$props.projection);
		if ("selectedKeys" in $$props) $$invalidate(9, selectedKeys = $$props.selectedKeys);
		if ("sizeStroke" in $$props) $$invalidate(10, sizeStroke = $$props.sizeStroke);
		if ("sizeStrokeSelected" in $$props) $$invalidate(11, sizeStrokeSelected = $$props.sizeStrokeSelected);
		if ("topojson" in $$props) $$invalidate(12, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(13, topojsonId = $$props.topojsonId);
	};

	$$self.$capture_state = () => ({
		ChoroplethSVG,
		colorDefaultFill,
		colorSea,
		colorStroke,
		colorStrokeSelected,
		isInteractive,
		key,
		keyToColor,
		keyToColorFn,
		projection,
		selectedKeys,
		sizeStroke,
		sizeStrokeSelected,
		topojson,
		topojsonId,
		height,
		width
	});

	$$self.$inject_state = $$props => {
		if ("colorDefaultFill" in $$props) $$invalidate(0, colorDefaultFill = $$props.colorDefaultFill);
		if ("colorSea" in $$props) $$invalidate(1, colorSea = $$props.colorSea);
		if ("colorStroke" in $$props) $$invalidate(2, colorStroke = $$props.colorStroke);
		if ("colorStrokeSelected" in $$props) $$invalidate(3, colorStrokeSelected = $$props.colorStrokeSelected);
		if ("isInteractive" in $$props) $$invalidate(4, isInteractive = $$props.isInteractive);
		if ("key" in $$props) $$invalidate(5, key = $$props.key);
		if ("keyToColor" in $$props) $$invalidate(6, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(7, keyToColorFn = $$props.keyToColorFn);
		if ("projection" in $$props) $$invalidate(8, projection = $$props.projection);
		if ("selectedKeys" in $$props) $$invalidate(9, selectedKeys = $$props.selectedKeys);
		if ("sizeStroke" in $$props) $$invalidate(10, sizeStroke = $$props.sizeStroke);
		if ("sizeStrokeSelected" in $$props) $$invalidate(11, sizeStrokeSelected = $$props.sizeStrokeSelected);
		if ("topojson" in $$props) $$invalidate(12, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(13, topojsonId = $$props.topojsonId);
		if ("height" in $$props) $$invalidate(14, height = $$props.height);
		if ("width" in $$props) $$invalidate(15, width = $$props.width);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		colorDefaultFill,
		colorSea,
		colorStroke,
		colorStrokeSelected,
		isInteractive,
		key,
		keyToColor,
		keyToColorFn,
		projection,
		selectedKeys,
		sizeStroke,
		sizeStrokeSelected,
		topojson,
		topojsonId,
		height,
		width,
		clicked_handler,
		entered_handler,
		exited_handler,
		div_elementresize_handler
	];
}

class ChoroplethDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, {
			colorDefaultFill: 0,
			colorSea: 1,
			colorStroke: 2,
			colorStrokeSelected: 3,
			isInteractive: 4,
			key: 5,
			keyToColor: 6,
			keyToColorFn: 7,
			projection: 8,
			selectedKeys: 9,
			sizeStroke: 10,
			sizeStrokeSelected: 11,
			topojson: 12,
			topojsonId: 13
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChoroplethDiv",
			options,
			id: create_fragment$f.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*colorDefaultFill*/ ctx[0] === undefined && !("colorDefaultFill" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'colorDefaultFill'");
		}

		if (/*colorSea*/ ctx[1] === undefined && !("colorSea" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'colorSea'");
		}

		if (/*colorStroke*/ ctx[2] === undefined && !("colorStroke" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'colorStroke'");
		}

		if (/*colorStrokeSelected*/ ctx[3] === undefined && !("colorStrokeSelected" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'colorStrokeSelected'");
		}

		if (/*isInteractive*/ ctx[4] === undefined && !("isInteractive" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
		}

		if (/*key*/ ctx[5] === undefined && !("key" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'key'");
		}

		if (/*keyToColor*/ ctx[6] === undefined && !("keyToColor" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
		}

		if (/*keyToColorFn*/ ctx[7] === undefined && !("keyToColorFn" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
		}

		if (/*projection*/ ctx[8] === undefined && !("projection" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'projection'");
		}

		if (/*selectedKeys*/ ctx[9] === undefined && !("selectedKeys" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
		}

		if (/*sizeStroke*/ ctx[10] === undefined && !("sizeStroke" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'sizeStroke'");
		}

		if (/*sizeStrokeSelected*/ ctx[11] === undefined && !("sizeStrokeSelected" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'sizeStrokeSelected'");
		}

		if (/*topojson*/ ctx[12] === undefined && !("topojson" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'topojson'");
		}

		if (/*topojsonId*/ ctx[13] === undefined && !("topojsonId" in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'topojsonId'");
		}
	}

	get colorDefaultFill() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorDefaultFill(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorSea() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorSea(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorStroke() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorStroke(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colorStrokeSelected() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colorStrokeSelected(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projection() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projection(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sizeStroke() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sizeStroke(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sizeStrokeSelected() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sizeStrokeSelected(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojson() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojson(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojsonId() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojsonId(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}



var choropleth = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ChoroplethSVG: ChoroplethSVG,
    ChoroplethDiv: ChoroplethDiv
});

var components = {
	...barchart,
	...choropleth,
};

const formatSvelteMarkup = str =>
	str.trim()
	.replace(/^\t{3}/gum, '')
	.replace(/^\t/gum, '  ');

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new Map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();
    for (const value of _) {
      const key = value + "";
      if (index.has(key)) continue;
      index.set(key, domain.push(value));
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

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
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
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
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
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
  if (!o) return new Rgb;
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
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
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

function constant(x) {
  return function() {
    return x;
  };
}

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
}

var rgb$1 = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
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

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
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

  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object$1(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, rgb$1) : string)
      : b instanceof color ? rgb$1
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object$1
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function constant$1(x) {
  return function() {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];

function identity$3(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant$1(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$1() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$3,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$3) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$3, rescale()) : clamp !== identity$3;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer$1()(identity$3, identity$3);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function formatDecimal(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
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

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
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

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity$4(x) {
  return x;
}

var map$1 = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$4 : formatGroup(map$1.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$4 : formatNumerals(map$1.call(locale.numerals, String)),
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
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

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
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

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
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
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
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
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

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
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

function linear$2() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear$2());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

const countryKeyValuePositive = [
	{ key: 'AL', value: 112 },
	{ key: 'AD', value: 234 },
	{ key: 'AM', value: 36 },
	{ key: 'AT', value: 357 },
	{ key: 'AZ', value: 123 },
	{ key: 'BY', value: 56 },
	{ key: 'BE', value: 15 },
	{ key: 'BA', value: 12 },
	{ key: 'BG', value: 568 },
	{ key: 'HR', value: 213 },
	{ key: 'CY', value: 456 },
	{ key: 'CZ', value: 21 },
	{ key: 'DK', value: 345 },
	{ key: 'EE', value: 37 },
	{ key: 'FI', value: 376 },
	{ key: 'FR', value: 346 },
	{ key: 'GE', value: 17 },
	{ key: 'DE', value: 567 },
	{ key: 'GR', value: 47 },
	{ key: 'HU', value: 23 },
	{ key: 'IS', value: 578 },
	{ key: 'IE', value: 24 },
	{ key: 'IT', value: 6 },
	{ key: 'KZ', value: 5 },
	{ key: 'LV', value: 58 },
	{ key: 'LI', value: 5 },
	{ key: 'LT', value: 69 },
	{ key: 'LU', value: 23 },
	{ key: 'MT', value: 36 },
	{ key: 'MD', value: 57 },
	{ key: 'MC', value: 69 },
	{ key: 'ME', value: 223 },
	{ key: 'NL', value: 35 },
	{ key: 'MK', value: 57 },
	{ key: 'NO', value: 79 },
	{ key: 'PL', value: 12 },
	{ key: 'PT', value: 46 },
	{ key: 'RO', value: 37 },
	{ key: 'RU', value: 678 },
	{ key: 'SM', value: 345 },
	{ key: 'RS', value: 67 },
	{ key: 'SK', value: 23 },
	{ key: 'SI', value: 567 },
	{ key: 'ES', value: 23 },
	{ key: 'SE', value: 768 },
	{ key: 'CH', value: 56 },
	{ key: 'TR', value: 78 },
	{ key: 'UA', value: 2 },
	{ key: 'GB', value: 56 }
].sort((a, b) => b.value - a.value);

const countryKeyValueNegatives = [
	{ key: 'AL', value: -112 },
	{ key: 'AD', value: -234 },
	{ key: 'AM', value: -36 },
	{ key: 'AT', value: -357 },
	{ key: 'AZ', value: -123 },
	{ key: 'BY', value: -56 },
	{ key: 'BE', value: -15 },
	{ key: 'BA', value: -12 },
	{ key: 'BG', value: -568 },
	{ key: 'HR', value: -213 },
	{ key: 'CY', value: -456 },
	{ key: 'CZ', value: -21 },
	{ key: 'DK', value: -345 },
	{ key: 'EE', value: -37 },
	{ key: 'FI', value: -376 },
	{ key: 'FR', value: -346 },
	{ key: 'GE', value: -17 },
	{ key: 'DE', value: -567 },
	{ key: 'GR', value: -47 },
	{ key: 'HU', value: -23 },
	{ key: 'IS', value: -578 },
	{ key: 'IE', value: -24 },
	{ key: 'IT', value: -6 },
	{ key: 'KZ', value: -5 },
	{ key: 'LV', value: -58 },
	{ key: 'LI', value: -5 },
	{ key: 'LT', value: -69 },
	{ key: 'LU', value: -23 },
	{ key: 'MT', value: -36 },
	{ key: 'MD', value: -57 },
	{ key: 'MC', value: -69 },
	{ key: 'ME', value: -223 },
	{ key: 'NL', value: -35 },
	{ key: 'MK', value: -57 },
	{ key: 'NO', value: -79 },
	{ key: 'PL', value: -12 },
	{ key: 'PT', value: -46 },
	{ key: 'RO', value: -37 },
	{ key: 'RU', value: -678 },
	{ key: 'SM', value: -345 },
	{ key: 'RS', value: -67 },
	{ key: 'SK', value: -23 },
	{ key: 'SI', value: -567 },
	{ key: 'ES', value: -23 },
	{ key: 'SE', value: -768 },
	{ key: 'CH', value: -56 },
	{ key: 'TR', value: -78 },
	{ key: 'UA', value: -2 },
	{ key: 'GB', value: -56 }
].sort((a, b) => a.value - b.value);

const countryKeyValueMixed = [
	{ key: 'AL', value: 112 },
	{ key: 'AD', value: -234 },
	{ key: 'AM', value: 36 },
	{ key: 'AT', value: 357 },
	{ key: 'AZ', value: -123 },
	{ key: 'BY', value: 56 },
	{ key: 'BE', value: 15 },
	{ key: 'BA', value: -12 },
	{ key: 'BG', value: 568 },
	{ key: 'HR', value: -213 },
	{ key: 'CY', value: 456 },
	{ key: 'CZ', value: 21 },
	{ key: 'DK', value: -345 },
	{ key: 'EE', value: 37 },
	{ key: 'FI', value: 376 },
	{ key: 'FR', value: 346 },
	{ key: 'GE', value: 17 },
	{ key: 'DE', value: 567 },
	{ key: 'GR', value: 47 },
	{ key: 'HU', value: -23 },
	{ key: 'IS', value: 578 },
	{ key: 'IE', value: 24 },
	{ key: 'IT', value: 6 },
	{ key: 'KZ', value: 5 },
	{ key: 'LV', value: -58 },
	{ key: 'LI', value: 5 },
	{ key: 'LT', value: 69 },
	{ key: 'LU', value: 23 },
	{ key: 'MT', value: 36 },
	{ key: 'MD', value: -57 },
	{ key: 'MC', value: 69 },
	{ key: 'ME', value: 223 },
	{ key: 'NL', value: 35 },
	{ key: 'MK', value: -57 },
	{ key: 'NO', value: 79 },
	{ key: 'PL', value: 12 },
	{ key: 'PT', value: -46 },
	{ key: 'RO', value: 37 },
	{ key: 'RU', value: 678 },
	{ key: 'SM', value: -345 },
	{ key: 'RS', value: 67 },
	{ key: 'SK', value: 23 },
	{ key: 'SI', value: 567 },
	{ key: 'ES', value: 23 },
	{ key: 'SE', value: 768 },
	{ key: 'CH', value: 56 },
	{ key: 'TR', value: 78 },
	{ key: 'UA', value: 2 },
	{ key: 'GB', value: 56 }
].sort((a, b) => b.value - a.value);

const countryKeyValueAlt = [
	{ key: 'AL', value: 113 },
	{ key: 'AD', value: 193 },
	{ key: 'AM', value: 66 },
	{ key: 'AT', value: 923 },
	{ key: 'AZ', value: 8 },
	{ key: 'BY', value: 122 },
	{ key: 'BE', value: 6 },
	{ key: 'BA', value: 29 },
	{ key: 'BG', value: 272 },
	{ key: 'HR', value: 300 },
	{ key: 'CY', value: 585 },
	{ key: 'CZ', value: 31 },
	{ key: 'DK', value: 406 },
	{ key: 'EE', value: 46 },
	{ key: 'FI', value: 1097 },
	{ key: 'FR', value: 611 },
	{ key: 'GE', value: 48 },
	{ key: 'DE', value: 30 },
	{ key: 'GR', value: 37 },
	{ key: 'HU', value: 11 },
	{ key: 'IS', value: 432 },
	{ key: 'IE', value: 52 },
	{ key: 'IT', value: 11 },
	{ key: 'KZ', value: 12 },
	{ key: 'LV', value: 128 },
	{ key: 'LI', value: 2 },
	{ key: 'LT', value: 129 },
	{ key: 'LU', value: 26 },
	{ key: 'MT', value: 61 },
	{ key: 'MD', value: 18 },
	{ key: 'MC', value: 84 },
	{ key: 'ME', value: 188 },
	{ key: 'NL', value: 18 },
	{ key: 'MK', value: 100 },
	{ key: 'NO', value: 50 },
	{ key: 'PL', value: 32 },
	{ key: 'PT', value: 89 },
	{ key: 'RO', value: 31 },
	{ key: 'RU', value: 303 },
	{ key: 'SM', value: 907 },
	{ key: 'RS', value: 113 },
	{ key: 'SK', value: 48 },
	{ key: 'SI', value: 1272 },
	{ key: 'ES', value: 6 },
	{ key: 'SE', value: 291 },
	{ key: 'CH', value: 16 },
	{ key: 'TR', value: 16 },
	{ key: 'UA', value: 1 },
	// { key: 'GB', value: 92 }
];

const countryKeyRawValue = [
	{ key: 'AL', rawValue: 112 },
	{ key: 'AD', rawValue: 234 },
	{ key: 'AM', rawValue: 36 },
	{ key: 'AT', rawValue: 357 },
	{ key: 'AZ', rawValue: 123 },
	{ key: 'BY', rawValue: 56 },
	{ key: 'BE', rawValue: 15 },
	{ key: 'BA', rawValue: 12 },
	{ key: 'BG', rawValue: 568 },
	{ key: 'HR', rawValue: 213 },
	{ key: 'CY', rawValue: 456 },
	{ key: 'CZ', rawValue: 21 },
	{ key: 'DK', rawValue: 345 },
	{ key: 'EE', rawValue: 37 },
	{ key: 'FI', rawValue: 376 },
	{ key: 'FR', rawValue: 346 },
	{ key: 'GE', rawValue: 17 },
	{ key: 'DE', rawValue: 567 },
	{ key: 'GR', rawValue: 47 },
	{ key: 'HU', rawValue: 23 },
	{ key: 'IS', rawValue: 578 },
	{ key: 'IE', rawValue: 24 },
	{ key: 'IT', rawValue: 6 },
	{ key: 'KZ', rawValue: 5 },
	{ key: 'LV', rawValue: 58 },
	{ key: 'LI', rawValue: 5 },
	{ key: 'LT', rawValue: 69 },
	{ key: 'LU', rawValue: 23 },
	{ key: 'MT', rawValue: 36 },
	{ key: 'MD', rawValue: 57 },
	{ key: 'MC', rawValue: 69 },
	{ key: 'ME', rawValue: 223 },
	{ key: 'NL', rawValue: 35 },
	{ key: 'MK', rawValue: 57 },
	{ key: 'NO', rawValue: 79 },
	{ key: 'PL', rawValue: 12 },
	{ key: 'PT', rawValue: 46 },
	{ key: 'RO', rawValue: 37 },
	{ key: 'RU', rawValue: 678 },
	{ key: 'SM', rawValue: 345 },
	{ key: 'RS', rawValue: 67 },
	{ key: 'SK', rawValue: 23 },
	{ key: 'SI', rawValue: 567 },
	{ key: 'ES', rawValue: 23 },
	{ key: 'SE', rawValue: 768 },
	{ key: 'CH', rawValue: 56 },
	{ key: 'TR', rawValue: 78 },
	{ key: 'UA', rawValue: 2 },
	{ key: 'GB', rawValue: 56 }
];

const keyToColorFull = {
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
};

// keep these 2 commented for the `keyToColor` example to show 2 black bars.
const keyToColor = skip(keyToColorFull, ['AL', 'AD']);

const keyToColorShort = {
	AM: 'blue',
	AT: 'blueviolet',
	AZ: 'chartreuse',
	BY: 'rgb(255, 69, 0)',
	BE: 'brown',
	BA: 'aquamarine',
	BG: 'rgb(128, 128, 0)',
};

const keyToColorFullKeys = keys(keyToColorFull);
const hueScale =
	linear$2()
	.domain([0, keyToColorFullKeys.length])
	.range([0, 300]);

const keyToColorFn =
	ordinal()
	.domain(keyToColorFullKeys)
	.range(keyToColorFullKeys.map((k, i) => hsl(hueScale(i), 0.5, 0.5).toString()));

const keyToLabel = {
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
	GB: 'United Kingdom (UK)',
};

const axisColor = 'red';
const backgroundColor = 'antiquewhite';
const barDefaultColor = 'orange';
const barHeight = 12;
const focusedKey = 'BG';
const fontSize = 22;
const textColor = 'green';
const title = 'My title';

const examples = [
	{
		content: [
			{tag: 'p', content: "In the most basic setup, you need to provide a `{items}` array of objects with the shape `{key: string, value: number}`."},
			{tag: 'p', content: "Note that if there are both positive and negative values the chart will show a vertical axis, `grey` by default."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				items: countryKeyValuePositive,
			},
		}, {
			key: 'All negative values',
			value: {
				items: countryKeyValueNegatives,
			},
		}, {
			key: 'Mixed values',
			value: {
				items: countryKeyValueMixed,
			},
		}],
		slug: 'BarchartV',
		title: 'Items (default shape)',
		usage: `
			<BarchartV {items} />
		`,
	},
	{
		content: [
			{tag: 'p', content: "Providing a `{title}` shows the barchart with an `h2` header."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyValuePositive,
				title
			},
		}],
		slug: 'BarchartV-title',
		title: 'Title',
		usage: `
			<BarchartV {items} title="${title}" />
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can setup a `backgroundColor` and the `textColor`."},
			{tag: 'p', content: "`barHeight` and `fontSize` contribute to determine the distance between bars."},
			{tag: 'p', content: "You can configure the axis color using the `axisColor` props (used in case there are values of both signs)."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValuePositive,
				textColor,
			},
		}, {
			key: 'All negative values',
			value: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValueNegatives,
				textColor,
			},
		}, {
			key: 'Mixed values',
			value: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValueMixed,
				textColor,
			},
		}],
		slug: 'BarchartV-styles',
		title: 'Styles',
		usage: `
			<BarchartV
				{items}
				axisColor = '${axisColor}'
				backgroundColor = '${backgroundColor}'
				barHeight = ${barHeight}
				fontSize = ${fontSize}
				textColor = '${textColor}'
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can provide a `barDefaultColor` to be used for bars with no correspondent key in `keyToColor`."},
			{tag: 'p', content: "If not provided, `barDefaultColor` is `null`, which renders `black`."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				barDefaultColor,
				items: countryKeyValuePositive,
				keyToColor: keyToColorShort,
			},
		}, {
			key: 'All negative values',
			value: {
				barDefaultColor,
				items: countryKeyValueNegatives,
				keyToColor: keyToColorShort,
			},
		}, {
			key: 'Mixed values',
			value: {
				barDefaultColor,
				items: countryKeyValueMixed,
				keyToColor: keyToColorShort,
			},
		}],
		slug: 'BarchartV-barDefaultColor',
		title: 'Default bars color',
		usage: `
			<BarchartV
				barDefaultColor="${barDefaultColor}"
				{items}
				{keyToColor}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing `keyToColor`, an object mapping bar key -> bar color, you can assign bars color."},
			{tag: 'p', content: "Notice that the default color for keys not in `keyToColor` is set by `barDefaultColor` (black if not provided, see `AL` and `AD`)."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				items: countryKeyValuePositive,
				keyToColor
			},
		}, {
			key: 'All negative values',
			value: {
				items: countryKeyValueNegatives,
				keyToColor
			},
		}, {
			key: 'Mixed values',
			value: {
				items: countryKeyValueMixed,
				keyToColor
			},
		}],
		slug: 'BarchartV-keyToColor',
		title: 'Bar colors (via mapping)',
		usage: `
			<BarchartV {items} {keyToColor} />
		`,
	},
	{
		content: [
			{tag: 'p', content: "Instead of passing `keyToColor` you can pass a function `keyToColorFn`."},
			{tag: 'p', content: "Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence."},
			{tag: 'p', content: "Also note that if the value returned by `keyToColorFn` is falsy the fallback is `barDefaultColor` (which falls back to `black` if `barDefaultColor` is not provided)."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				items: countryKeyValuePositive,
				keyToColorFn
			},
		}, {
			key: 'All negative values',
			value: {
				items: countryKeyValueNegatives,
				keyToColorFn
			},
		}, {
			key: 'Mixed values',
			value: {
				items: countryKeyValueMixed,
				keyToColorFn
			},
		}],
		slug: 'BarchartV-keyToColorFn',
		title: 'Bar colors (via function)',
		usage: `
			<BarchartV {items} {keyToColorFn} />
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can set the focused bar by providing its key."},
			{tag: 'p', content: "This is useful when we select the chosen key in another part of the application and we want to provide a way to see what bar correspond to the current selection."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				focusedKey,
				items: countryKeyValuePositive,
			},
		}, {
			key: 'All negative values',
			value: {
				focusedKey,
				items: countryKeyValueNegatives,
			},
		}, {
			key: 'Mixed values',
			value: {
				focusedKey,
				items: countryKeyValueMixed,
			},
		}],
		slug: 'BarchartV-focusedKey',
		title: 'Focused key',
		usage: `
			<BarchartV
				focusedKey="${focusedKey}"
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can set the focused bar background color by providing its `focusedKeyColor`."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValuePositive,
			},
		}, {
			key: 'All negative values',
			value: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValueNegatives,
			},
		}, {
			key: 'Mixed values',
			value: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValueMixed,
			},
		}],
		slug: 'BarchartV-focusedKeyColor',
		title: 'Focused key color',
		usage: `
			<BarchartV
				{items}
				focusedKey="${focusedKey}"
				focusedKeyColor="yellow"
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can choose the hovered bar background color by providing `hoverColor`."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				hoverColor: 'palegreen',
				items: countryKeyValuePositive,
				title: 'Hover me',
			},
		}],
		slug: 'BarchartV-hoverColor',
		title: 'Hovered bar color',
		usage: `
			<BarchartV
				{items}
				hoverColor="palegreen"
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing a object mapping bar key -> bar label, you can control how the bar are labeled."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				keyToLabel,
				items: countryKeyValuePositive,
			},
		}, {
			key: 'All negative values',
			value: {
				keyToLabel,
				items: countryKeyValueNegatives,
			},
		}, {
			key: 'Mixed values',
			value: {
				keyToLabel,
				items: countryKeyValueMixed,
			},
		}],
		slug: 'BarchartV-keyToLabel',
		title: 'Labels (via mapping)',
		usage: `
			<BarchartV
				{keyToLabel}
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyValuePositive,
				keyToLabelFn: x => `--${x}--`,
			},
		}],
		slug: 'BarchartV-keyToLabelFn',
		title: 'Labels (via function)',
		usage: `
			<BarchartV
				keyToLabelFn={x => '--' + x + '--'}
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `true`, the component emits events when interacting with the bars."},
			{tag: 'p', content: "The payload is an object `{id: key}` (`key` being the key of the bar we interacted with)"},
			{tag: 'p', content: "• Clicking on a bar dispatches a `clicked` event: `dispatch('clicked', {id: key})`."},
			{tag: 'p', content: "• Mouse-entering a bar dispatches a `entered` event: `dispatch('entered', {id: key})`."},
			{tag: 'p', content: "• Mouse-exiting a bar dispatches a `exited` event: `dispatch('exited', {id: key})`."},
			{tag: 'p', content: "Please hover and click the bars of this barchart to read the correspondent event payload below."},
		],
		events: [
			'entered',
			'exited',
			'clicked',
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				isInteractive: true,
				items: countryKeyValuePositive,
				title: 'Hover and click me',
			},
		}, {
			key: 'All negative values',
			value: {
				isInteractive: true,
				items: countryKeyValueNegatives,
				title: 'Hover and click me',
			},
		}, {
			key: 'Mixed values',
			value: {
				isInteractive: true,
				items: countryKeyValueMixed,
				title: 'Hover and click me',
			},
		}],
		slug: 'BarchartV-isInteractive',
		title: 'Interactivity',
		usage: `
			<BarchartV
				{items}
				isInteractive={true}
				on:entered={onEntered}
				on:exited={onExited}
				on:clicked={onClicked}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By default we assume that `items` has the shape `{key, value}`."},
			{tag: 'p', content: "By providing a `valueAccessor` function we can derive the bar value from `items` with different shapes."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyRawValue,
				valueAccessor: item => Number(Math.sqrt(item.rawValue).toFixed(3)),
			},
		}],
		slug: 'BarchartV-valueAccessor',
		title: 'Values accessor',
		usage: `
			<BarchartV
				{items}
				valueAccessor={item => Number((item.value / 25.3).toFixed(3))}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can provide a `formatFn` function to turn the `value` in the desired string."},
			{tag: 'p', content: "A way to use this would be to pass a function derived from `d3-format`."},
		],
		name: 'BarchartV',
		props: [{
			key: 'All positive values',
			value: {
				items: countryKeyValuePositive,
				formatFn: x => `${x}%`,
			},
		}, {
			key: 'All negative values',
			value: {
				items: countryKeyValueNegatives,
				formatFn: x => `${x}%`,
			},
		}, {
			key: 'Mixed values',
			value: {
				items: countryKeyValueMixed,
				formatFn: x => `${x}%`,
			},
		}],
		slug: 'BarchartV-formatFn',
		title: 'Values format',
		usage: `
			<BarchartV
				{items}
				formatFn={x => x + '%'}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll."},
			{tag: 'p', content: "In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll."},
		],
		name: 'BarchartV',
		props: [{
			key: 'countryKeyValuePositive',
			value: {
				shouldResetScroll: false,
				items: countryKeyValuePositive,
				title: `When updated, scroll doesn't reset`,
			},
		}, {
			key: 'countryKeyValueAlt',
			value: {
				shouldResetScroll: false,
				items: countryKeyValueAlt,
				title: `When updated, scroll doesn't reset`,
			},
		}],
		slug: 'BarchartV-no-shouldResetScroll',
		title: 'Scroll reset (disabled)',
		usage: `
			<BarchartV
				{items}
				shouldResetScroll={false}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `shouldResetScroll` is set to `true`, updating the props will reset the scroll."},
			{tag: 'p', content: "In this example, scrolling the barchart and then switching props using the buttons below should reset the scroll."},
		],
		name: 'BarchartV',
		props: [{
			key: 'countryKeyValuePositive',
			value: {
				shouldResetScroll: true,
				items: countryKeyValuePositive,
				title: `When updated, scroll resets`,
			},
		}, {
			key: 'countryKeyValueAlt',
			value: {
				shouldResetScroll: true,
				items: countryKeyValueAlt,
				title: `When updated, scroll resets`,
			},
		}],
		slug: 'BarchartV-shouldResetScroll',
		title: 'Scroll reset (enabled)',
		usage: `
			<BarchartV
				{items}
				shouldResetScroll={true}
			/>
		`,
	},
].map(obj => ({
	...obj,
	content: obj.content.map(element => ({
		...element,
		content: element.content.trim(),
	})),
	usage: formatSvelteMarkup(obj.usage)
}));

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
var transform$1 = {
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
	transform: transform$1
};

var type$2 = "Topology";
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