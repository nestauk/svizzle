import { bZ as map$1, ce as isKeyValue, br as pullFrom, R as keys, cf as difference, cg as union, cc as head, ch as intersection, _ as objectToKeyValueArray, ci as pickIn, c0 as identity$1, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, ap as _, bc as set_store_value, p as noop$2, an as subscribe, q as validate_each_argument, ak as validate_store, at as component_subscribe, be as onMount, e as element, f as claim_element, g as children, b as detach_dev, k as attr_dev, bk as add_render_callback, m as add_location, n as insert_hydration_dev, bl as add_resize_listener, u as transition_in, w as group_outros, x as check_outros, B as transition_out, C as destroy_each, aw as binding_callbacks, t as text, a as space, j as claim_text, c as claim_space, o as append_hydration_dev, a4 as set_data_dev, D as create_component, E as claim_component, F as mount_component, G as destroy_component, H as toggle_class, av as action_destroyer, bu as is_function, b7 as isServerSide, b$ as isNotNil, bq as last$1, cj as findIndex, ck as is, bP as when, bL as always, I as svg_element, ar as empty, J as claim_svg_element, L as Icon, Z as mapValuesWith, M as listen_dev, am as run_all, b6 as ScreenSensor, aj as isClientSide, cl as bind$1, r as create_slot, cm as add_flush_callback, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, h as head_selector } from './client.c587a315.js';
import { L as LoadingView } from './topojson.2e1480c8.js';
import { n as noop$1, _ as _theme, a as _style, b as _availableYears, c as _regionSettings, d as customizeTheme } from './indicator.eeca413a.js';
import { c as getKey } from './linear.191d51df.js';
import { a as rxStreamToSvWritable, r as rxStreamToSvReadable, L as List, A as Activity, B as BarChart, C as Clock, M as MapPin } from './rx.609ef8e2.js';
import { L as Link } from './Link.8362b490.js';
import { _ as _hrefBase, s as setGroups, a as _timelineLayout, b as _yearRange, c as shortenYear, d as _routes, e as _isSmallScreen, f as _screenClasses, g as _viewsClasses, h as _isTimelineHidden, i as _timelineWidth, j as _timelineHeight, k as _selectedYear, l as _navFlags, m as _views, n as showView, o as _groups } from './stores.b3a38050.js';
import { m as makeURL, f as flags, h as hrefBase, r as regionSettings } from './_config.d35e78d1.js';
import { I as Info } from './Info.8bfa132b.js';
import { S as Settings } from './Settings.ccc24978.js';
import { _ as _topojsonPriorities, a as _topoCache, b as _loadingTopojsonKeys, c as _uriMap, d as _POIs } from './POIs.314ab2c8.js';
import './rgb.f19d26e1.js';
import './defaultLocale.dfea7cf7.js';
import './index.2a4e05c3.js';

/**
* @module @svizzle/utils/array-[any-any]
*/

/**
 * Return a function that maps the input to the first or the second element of the provided pair: the first if its truthy, the second otherwise.
 *
 * @function
 * @arg {array} pair - Pair of output values
 * @return {function} - Any -> Any
 *
 * @example
> boolToNum = truthynessTo([0, 1])
> boolToNum(true)
0
> boolToNum(false)
1

> boolToString = truthynessTo(['OK!', 'Sorry!'])
> boolToString(true)
'OK!'
> boolToString(false)
'Sorry!'

> numToString = truthynessTo(['OK!', 'Sorry!'])
> numToString(3)
'OK!'
> numToString(0)
'Sorry!'

> stringToString = truthynessTo(['OK!', 'Sorry!'])
> stringToString('hey')
'OK!'
> stringToString('')
'Sorry!'

> stringToObject = truthynessTo([{value: 1}, {value: -1}])
> stringToObject('hey')
{value: 1}
> stringToObject('')
{value: -1}
 *
 * @since 0.14.0
 */
const truthynessTo =
	([valueIfTruthy, valueIfFalsy]) => x => x ? valueIfTruthy : valueIfFalsy;

/**
* @module @svizzle/utils/string-any
*/

// TODO test, document
const exportedJsObjToAny = jsStr => {
	let jsonStr = jsStr;

	if (jsonStr.startsWith('export default ')) {
		jsonStr = jsStr.slice(15);
	}
	if (jsonStr.endsWith('\n')) {
		jsonStr = jsonStr.slice(0, -1);
	}
	if (jsonStr.endsWith(';')) {
		jsonStr = jsonStr.slice(0, -1);
	}

	return JSON.parse(jsonStr);
};

/**
* @module @svizzle/utils/buffer-any
*/

// TODO document and add tests
const exportedObjBufferToAny = (buffer, encoding = 'utf-8') => {
	const decoder = new TextDecoder(encoding);
	const jsStr = decoder.decode(buffer);
	const json = exportedJsObjToAny(jsStr);

	return json;
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

var context = null;
function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(function () {
            _this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription));

var intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};

var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

var asyncScheduler = new AsyncScheduler(AsyncAction);

var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });

function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : undefined;
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator$1;
        executeSchedule(subscriber, scheduler, function () {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator$1.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
    return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}

function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        executeSchedule(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}

var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

function zip$1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    var sources = argsOrArgArray(args);
    return sources.length
        ? new Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : EMPTY;
}

function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    return resultSelector
        ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector))
        : operate(function (source, subscriber) {
            combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
        });
}

function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}

function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return operate(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}

function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

function skipWhile(predicate) {
    return operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}

function switchMap(project, resultSelector) {
    return operate(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}

function switchMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? switchMap(function () { return innerObservable; }, resultSelector) : switchMap(function () { return innerObservable; });
}

function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = popResultSelector(inputs);
    return operate(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            innerFrom(inputs[i]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity)) && (hasValue = null);
                }
            }, noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = __spreadArray([value], __read(otherValues));
                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
            }
        }));
    });
}

function zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return operate(function (source, subscriber) {
        zip$1.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
}

function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip.apply(void 0, __spreadArray([], __read(otherInputs)));
}

const derive = ([first, ...rest], fn) =>
	first.pipe(
		combineLatestWith(...rest),
		debounceTime(0),
		map(fn),
		share()
	);

const makeSideEffectors = ({
	_outEvents,
	downloadFn
}) => {
	const cancellersMap = {};

	const cancel = (key, reason) => {
		cancellersMap[key] && cancellersMap[key](reason);
	};

	const startDownload = async ([
		[uris, groupId],
		fetchingOrFetchedTargetKeys
	]) => {
		const keys = map$1(uris, getKey);

		_outEvents.next({
			groupId,
			keys,
			skipping: fetchingOrFetchedTargetKeys,
			type: 'group:start'
		});

		let cancelledKeys = [];

		await Promise.all(
			uris.map(
				async ({key, value}) => {
					_outEvents.next({
						key,
						type: 'file:start'
					});

					try {
						const result = await downloadFn(key, value, cancellersMap);

						if (result.type === 'complete') {
							_outEvents.next({
								data: result.contents,
								key,
								type: 'file:complete'
							});
						} else if (result.type === 'cancel') {
							cancelledKeys.push(key);

							_outEvents.next({
								key,
								reason: result.reason,
								type: 'file:cancel'
							});
						}
					} catch (error) {
						console.error(error);

						_outEvents.next({
							key,
							error,
							type: 'file:error'
						});
					}
				}
			)
		);

		_outEvents.next({
			keys,
			cancelledKeys,
			groupId,
			type: 'group:complete'
		});
	};

	return {
		cancel,
		startDownload
	}
};

const createFetchManagerStreams = downloadFn => {

	/* input streams */

	const _asapKeys = new BehaviorSubject([]);
	const _nextKeys = new BehaviorSubject([]);
	const _shouldPrefetch = new BehaviorSubject(false);
	const _uriMap = new BehaviorSubject({});

	/* output streams */

	const _outData = new BehaviorSubject({});
	const _outEvents = new Subject();
	const _outLoadingKeys = new BehaviorSubject([]);

	/* internal streams */

	const _groupIds = from(['asap', 'next', 'rest']);
	const _startNextGroup = new BehaviorSubject();
	const _runChain = new BehaviorSubject();

	/* internal derived streams */

	const _allKeys = _uriMap.pipe(
		map(keys),
		share()
	);

	const _restKeys = derive(
		[_allKeys, _asapKeys, _nextKeys, _runChain],
		([allKeys, asapKeys, nextKeys]) =>
			difference(allKeys, union(asapKeys, nextKeys))
	);

	const _groups = _restKeys.pipe(
		withLatestFrom(_asapKeys, _nextKeys),
		map(([restKeys, asapKeys, nextKeys]) => ({
			asap: asapKeys,
			next: nextKeys,
			rest: restKeys
		}))
	);

	const _targetGroupId = _groups.pipe(
		debounceTime(0),
		switchMapTo(
			_groupIds.pipe(
				zipWith(_startNextGroup), // wait for download to complete
				map(head),
			)
		),
		share(),
	);

	// Keys of files that are fully fetched
	const _fetchedKeys = _outData.pipe(
		map(keys),
		share()
	);

	// Keys in target group that are not yet fully fetched
	// Some of them might be currently downloading
	const _fetchingOrUnfetchedTargetKeys = _targetGroupId.pipe(
		withLatestFrom(_groups, _shouldPrefetch, _fetchedKeys),
		map(([targetGroupId, groups, shouldPrefetch, fetchedKeys]) =>
			shouldPrefetch || targetGroupId === 'asap'
				? difference(groups[targetGroupId], fetchedKeys)
				: []
		),
		share()
	);

	const _fetchingOrFetchedTargetKeys = _targetGroupId.pipe(
		withLatestFrom(_groups, _fetchedKeys, _outLoadingKeys),
		map(([targetGroupId, groups, fetchedKeys, loadingKeys]) =>
			intersection(
				groups[targetGroupId],
				union(fetchedKeys, loadingKeys)
			)
		),
		share()
	);

	// keys in target group that have not started downloading
	const _unfetchedTargetKeys = _fetchingOrUnfetchedTargetKeys.pipe(
		withLatestFrom(_outLoadingKeys),
		map(([fetchingOrUnfetchedTargetKeys, outLoadingKeys]) =>
			difference(
				fetchingOrUnfetchedTargetKeys,
				outLoadingKeys
			)
		),
	);

	const _unfetchedUris = _unfetchedTargetKeys.pipe(
		withLatestFrom(_uriMap),
		map(([unfetchedTargetKeys, uriMap]) =>
			objectToKeyValueArray(pickIn(uriMap, unfetchedTargetKeys))
		)
	);

	// If asapKeys changes cancel all current downloads, except those in asap
	const _cancelKeys = _asapKeys.pipe(
		debounceTime(0),
		// use `withLatestFrom` instead of `combineLatestWith` (in `derive`) so
		// that it is not recomputed more than needed.
		withLatestFrom(_outLoadingKeys),
		map(([asapKeys, outLoadingKeys]) =>
			difference(outLoadingKeys, asapKeys)
		)
	);

	/* subscripted updates */

	// restart the chain when `_shouldPrefetch` changes
	_shouldPrefetch.subscribe(
		should => should && _runChain.next()
	);

	/* side effects */

	const {
		cancel,
		startDownload
	} = makeSideEffectors({
		_outEvents,
		downloadFn
	});

	// cancelling

	const cancelAll = reason =>
		_outLoadingKeys
		.getValue()
		.forEach(key => cancel(key, reason));

	// When `_uriMap` changes we:
	// * cancel all downloads
	// * wipe `_outData` (clear the cache)
	_uriMap
	.pipe(debounceTime(0))
	.subscribe(() => {
		cancelAll('Cancelled by uriMap change');
		_outData.next({});
		_outEvents.next({type: 'reset'});
	});

	_cancelKeys
	.pipe(debounceTime(0))
	.subscribe(cancelKeys =>
		cancelKeys.forEach(key => cancel(key, 'Cancelled by priority change'))
	);

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'file:start'])),
		withLatestFrom(_outLoadingKeys)
	)
	.subscribe(([{key}, loadingUris]) =>
		_outLoadingKeys.next([...loadingUris, key])
	);

	_outEvents
	.pipe(
		filter(
			({type}) => [
				'file:cancel',
				'file:complete',
				'file:error'
			].includes(type)
		),
		withLatestFrom(_outLoadingKeys, _outData),
	)
	.subscribe(([{data, key, type}, loadingKeys, outData]) => {
		_outLoadingKeys.next(pullFrom(loadingKeys, [key]));

		if (type === 'file:complete') {
			_outData.next({...outData, [key]: data});
		}
	});

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'group:complete'])),
		withLatestFrom(_outLoadingKeys)
	)
	.subscribe(() => _startNextGroup.next());

	// downloading

	_unfetchedUris
	.pipe(
		zipWith(_targetGroupId),
		withLatestFrom(_fetchingOrFetchedTargetKeys),
	)
	.subscribe(startDownload);

	// FIXME this happens on every completed download and is rather abusive of
	// memory allocation and the garbage collector. Should rewrite conditional
	// without creating new arrays.
	_fetchedKeys
	.pipe(
		withLatestFrom(_allKeys, _asapKeys, _shouldPrefetch),
		skipWhile(
			([fetchedUris, allKeys, asapKeys, shouldPrefetch]) =>
				intersection(
					shouldPrefetch ? allKeys : asapKeys,
					fetchedUris
				).length < (shouldPrefetch ? allKeys : asapKeys).length
		),
		debounceTime(0)
	)
	.subscribe(() => _outEvents.next({type: 'done'}));

	return {
		_asapKeys,
		_nextKeys,
		_outData,
		_outEvents,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
	}
};

const mergeUint8Arrays = arrays => {
	const totalLength = arrays.reduce(
		(acc, array) => acc + array.length,
		0
	);
	const mergedArray = new Uint8Array(totalLength);

	let start = 0;
	arrays.forEach(array => {
		mergedArray.set(array, start);
		start += array.length;
	});

	return mergedArray;
};

const makeWebStreamsFetcher = (myFetch, transformer = identity$1) =>
	myFetch
		? async (key, {customTransformer, url}, cancellers) => {
			const response = await myFetch(url);
			const stream = await response.body;
			const reader = stream.getReader();

			return new Promise((resolve/* , reject */) => {
				let hasCancelled = false;

				cancellers[key] = async reason => {
					hasCancelled = true;
					await reader.cancel(reason);

					resolve({
						type: 'cancel',
						reason
					});
				};

				let chunks = [];
				const processChunk = ({done, value}) => {
					if (!done) {
						chunks.push(value);
						reader.read().then(processChunk);
					} else {
						if (!hasCancelled) {
							const mergedArray = mergeUint8Arrays(chunks);
							const results = (customTransformer || transformer)(mergedArray);

							resolve({
								type: 'complete',
								contents: results
							});
						}

						delete cancellers[key];
					}
				};

				// start reading
				reader.read().then(processChunk);
			});
		}
		: noop$1;

const createFetchManagerStores = downloadFn => {
	const {
		_asapKeys,
		_nextKeys,
		_outData,
		_outEvents,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
	} = createFetchManagerStreams(downloadFn);

	return {
		_asapKeys: rxStreamToSvWritable(_asapKeys),
		_nextKeys: rxStreamToSvWritable(_nextKeys),
		_outData: rxStreamToSvReadable(_outData),
		_outEvents: rxStreamToSvReadable(_outEvents),
		_outLoadingKeys: rxStreamToSvReadable(_outLoadingKeys),
		_shouldPrefetch: rxStreamToSvWritable(_shouldPrefetch),
		_uriMap: rxStreamToSvWritable(_uriMap),
	};
};

/* ../../components/ui/src/io/net/FetchDriver.svelte generated by Svelte v3.58.0 */

function create_fragment$5(ctx) {
	const block = {
		c: noop$2,
		l: noop$2,
		m: noop$2,
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: noop$2
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

function instance$5($$self, $$props, $$invalidate) {
	let downloadFn;

	let $_outLoadingKeys,
		$$unsubscribe__outLoadingKeys = noop$2,
		$$subscribe__outLoadingKeys = () => ($$unsubscribe__outLoadingKeys(), $$unsubscribe__outLoadingKeys = subscribe(_outLoadingKeys, $$value => $$invalidate(14, $_outLoadingKeys = $$value)), _outLoadingKeys);

	let $_outData,
		$$unsubscribe__outData = noop$2,
		$$subscribe__outData = () => ($$unsubscribe__outData(), $$unsubscribe__outData = subscribe(_outData, $$value => $$invalidate(15, $_outData = $$value)), _outData);

	let $_uriMap,
		$$unsubscribe__uriMap = noop$2,
		$$subscribe__uriMap = () => ($$unsubscribe__uriMap(), $$unsubscribe__uriMap = subscribe(_uriMap, $$value => $$invalidate(16, $_uriMap = $$value)), _uriMap);

	let $_shouldPrefetch,
		$$unsubscribe__shouldPrefetch = noop$2,
		$$subscribe__shouldPrefetch = () => ($$unsubscribe__shouldPrefetch(), $$unsubscribe__shouldPrefetch = subscribe(_shouldPrefetch, $$value => $$invalidate(17, $_shouldPrefetch = $$value)), _shouldPrefetch);

	let $_nextKeys,
		$$unsubscribe__nextKeys = noop$2,
		$$subscribe__nextKeys = () => ($$unsubscribe__nextKeys(), $$unsubscribe__nextKeys = subscribe(_nextKeys, $$value => $$invalidate(18, $_nextKeys = $$value)), _nextKeys);

	let $_asapKeys,
		$$unsubscribe__asapKeys = noop$2,
		$$subscribe__asapKeys = () => ($$unsubscribe__asapKeys(), $$unsubscribe__asapKeys = subscribe(_asapKeys, $$value => $$invalidate(19, $_asapKeys = $$value)), _asapKeys);

	$$self.$$.on_destroy.push(() => $$unsubscribe__outLoadingKeys());
	$$self.$$.on_destroy.push(() => $$unsubscribe__outData());
	$$self.$$.on_destroy.push(() => $$unsubscribe__uriMap());
	$$self.$$.on_destroy.push(() => $$unsubscribe__shouldPrefetch());
	$$self.$$.on_destroy.push(() => $$unsubscribe__nextKeys());
	$$self.$$.on_destroy.push(() => $$unsubscribe__asapKeys());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FetchDriver', slots, []);
	let _asapKeys;
	let _nextKeys;
	let _outData;
	let _outLoadingKeys;
	let _shouldPrefetch;
	let _uriMap;
	let { asapKeys = [] } = $$props;
	let { nextKeys = [] } = $$props;
	let { shouldPrefetch = false } = $$props;
	let { transformer = identity$1 } = $$props;
	let { uriMap = {} } = $$props;
	let { outData = $_outData } = $$props;
	let { outLoadingKeys = $_outLoadingKeys } = $$props;

	const reset = downloadFunc => {
		$$subscribe__asapKeys($$invalidate(0, { _asapKeys, _nextKeys, _outData, _outLoadingKeys, _shouldPrefetch, _uriMap } = createFetchManagerStores(downloadFunc), _asapKeys, $$subscribe__nextKeys($$invalidate(1, _nextKeys)), $$subscribe__outData($$invalidate(2, _outData)), $$subscribe__outLoadingKeys($$invalidate(3, _outLoadingKeys)), $$subscribe__shouldPrefetch($$invalidate(4, _shouldPrefetch)), $$subscribe__uriMap($$invalidate(5, _uriMap))));
		set_store_value(_asapKeys, $_asapKeys = asapKeys, $_asapKeys);
		set_store_value(_nextKeys, $_nextKeys = nextKeys, $_nextKeys);
		set_store_value(_shouldPrefetch, $_shouldPrefetch = shouldPrefetch, $_shouldPrefetch);
		set_store_value(_uriMap, $_uriMap = uriMap, $_uriMap);
	};

	const writable_props = [
		'asapKeys',
		'nextKeys',
		'shouldPrefetch',
		'transformer',
		'uriMap',
		'outData',
		'outLoadingKeys'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FetchDriver> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('asapKeys' in $$props) $$invalidate(8, asapKeys = $$props.asapKeys);
		if ('nextKeys' in $$props) $$invalidate(9, nextKeys = $$props.nextKeys);
		if ('shouldPrefetch' in $$props) $$invalidate(10, shouldPrefetch = $$props.shouldPrefetch);
		if ('transformer' in $$props) $$invalidate(11, transformer = $$props.transformer);
		if ('uriMap' in $$props) $$invalidate(12, uriMap = $$props.uriMap);
		if ('outData' in $$props) $$invalidate(6, outData = $$props.outData);
		if ('outLoadingKeys' in $$props) $$invalidate(7, outLoadingKeys = $$props.outLoadingKeys);
	};

	$$self.$capture_state = () => ({
		makeWebStreamsFetcher,
		_,
		createFetchManagerStores,
		_asapKeys,
		_nextKeys,
		_outData,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
		asapKeys,
		nextKeys,
		shouldPrefetch,
		transformer,
		uriMap,
		outData,
		outLoadingKeys,
		reset,
		downloadFn,
		$_outLoadingKeys,
		$_outData,
		$_uriMap,
		$_shouldPrefetch,
		$_nextKeys,
		$_asapKeys
	});

	$$self.$inject_state = $$props => {
		if ('_asapKeys' in $$props) $$subscribe__asapKeys($$invalidate(0, _asapKeys = $$props._asapKeys));
		if ('_nextKeys' in $$props) $$subscribe__nextKeys($$invalidate(1, _nextKeys = $$props._nextKeys));
		if ('_outData' in $$props) $$subscribe__outData($$invalidate(2, _outData = $$props._outData));
		if ('_outLoadingKeys' in $$props) $$subscribe__outLoadingKeys($$invalidate(3, _outLoadingKeys = $$props._outLoadingKeys));
		if ('_shouldPrefetch' in $$props) $$subscribe__shouldPrefetch($$invalidate(4, _shouldPrefetch = $$props._shouldPrefetch));
		if ('_uriMap' in $$props) $$subscribe__uriMap($$invalidate(5, _uriMap = $$props._uriMap));
		if ('asapKeys' in $$props) $$invalidate(8, asapKeys = $$props.asapKeys);
		if ('nextKeys' in $$props) $$invalidate(9, nextKeys = $$props.nextKeys);
		if ('shouldPrefetch' in $$props) $$invalidate(10, shouldPrefetch = $$props.shouldPrefetch);
		if ('transformer' in $$props) $$invalidate(11, transformer = $$props.transformer);
		if ('uriMap' in $$props) $$invalidate(12, uriMap = $$props.uriMap);
		if ('outData' in $$props) $$invalidate(6, outData = $$props.outData);
		if ('outLoadingKeys' in $$props) $$invalidate(7, outLoadingKeys = $$props.outLoadingKeys);
		if ('downloadFn' in $$props) $$invalidate(13, downloadFn = $$props.downloadFn);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*transformer*/ 2048) {
			// eslint-disable-next-line no-undef
			$$invalidate(13, downloadFn = makeWebStreamsFetcher(globalThis.fetch, transformer));
		}

		if ($$self.$$.dirty & /*downloadFn*/ 8192) {
			reset(downloadFn);
		}

		if ($$self.$$.dirty & /*_asapKeys, asapKeys*/ 257) {
			// eslint-disable-next-line no-unused-vars
			_asapKeys && set_store_value(_asapKeys, $_asapKeys = asapKeys, $_asapKeys);
		}

		if ($$self.$$.dirty & /*_nextKeys, nextKeys*/ 514) {
			// eslint-disable-next-line no-unused-vars
			_nextKeys && set_store_value(_nextKeys, $_nextKeys = nextKeys, $_nextKeys);
		}

		if ($$self.$$.dirty & /*_shouldPrefetch, shouldPrefetch*/ 1040) {
			// eslint-disable-next-line no-unused-vars
			_shouldPrefetch && set_store_value(_shouldPrefetch, $_shouldPrefetch = shouldPrefetch, $_shouldPrefetch);
		}

		if ($$self.$$.dirty & /*_uriMap, uriMap*/ 4128) {
			// eslint-disable-next-line no-unused-vars
			_uriMap && set_store_value(_uriMap, $_uriMap = uriMap, $_uriMap);
		}

		if ($$self.$$.dirty & /*_outData, $_outData*/ 32772) {
			_outData && $$invalidate(6, outData = $_outData);
		}

		if ($$self.$$.dirty & /*_outLoadingKeys, $_outLoadingKeys*/ 16392) {
			_outLoadingKeys && $$invalidate(7, outLoadingKeys = $_outLoadingKeys);
		}
	};

	return [
		_asapKeys,
		_nextKeys,
		_outData,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
		outData,
		outLoadingKeys,
		asapKeys,
		nextKeys,
		shouldPrefetch,
		transformer,
		uriMap,
		downloadFn,
		$_outLoadingKeys,
		$_outData
	];
}

class FetchDriver extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
			asapKeys: 8,
			nextKeys: 9,
			shouldPrefetch: 10,
			transformer: 11,
			uriMap: 12,
			outData: 6,
			outLoadingKeys: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FetchDriver",
			options,
			id: create_fragment$5.name
		});
	}

	get asapKeys() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asapKeys(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nextKeys() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nextKeys(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shouldPrefetch() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldPrefetch(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transformer() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transformer(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get uriMap() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set uriMap(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outData() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outData(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outLoadingKeys() {
		throw new Error("<FetchDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outLoadingKeys(value) {
		throw new Error("<FetchDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var FetchDriver$1 = FetchDriver;

/* ../../components/time_region_value/src/lib/components/Sidebar.svelte generated by Svelte v3.58.0 */

const file$3 = "../../components/time_region_value/src/lib/components/Sidebar.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i].label;
	child_ctx[12] = list[i].indicators;
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i].title;
	child_ctx[16] = list[i].schema;
	return child_ctx;
}

// (63:4) <Link      href={makeURL($_hrefBase, schema.value.id)}      rel='prefetch'      theme={{color: $_theme.colorWhite}}     >
function create_default_slot$1(ctx) {
	let p;
	let t_value = /*title*/ ctx[15] + "";
	let t;
	let keepOnScreen_action;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(p, "class", "svelte-13lnbxn");
			toggle_class(p, "selected", /*schema*/ ctx[16].value.id === /*currentId*/ ctx[1]);
			add_location(p, file$3, 67, 5, 1515);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, p, anchor);
			append_hydration_dev(p, t);

			if (!mounted) {
				dispose = action_destroyer(keepOnScreen_action = /*keepOnScreen*/ ctx[7].call(null, p, {
					id: /*schema*/ ctx[16].value.id,
					currentId: /*currentId*/ ctx[1],
					scrollableHeight: /*scrollableHeight*/ ctx[4]
				}));

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$_groups*/ 4 && t_value !== (t_value = /*title*/ ctx[15] + "")) set_data_dev(t, t_value);

			if (keepOnScreen_action && is_function(keepOnScreen_action.update) && dirty & /*$_groups, currentId, scrollableHeight*/ 22) keepOnScreen_action.update.call(null, {
				id: /*schema*/ ctx[16].value.id,
				currentId: /*currentId*/ ctx[1],
				scrollableHeight: /*scrollableHeight*/ ctx[4]
			});

			if (dirty & /*$_groups, currentId*/ 6) {
				toggle_class(p, "selected", /*schema*/ ctx[16].value.id === /*currentId*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(63:4) <Link      href={makeURL($_hrefBase, schema.value.id)}      rel='prefetch'      theme={{color: $_theme.colorWhite}}     >",
		ctx
	});

	return block;
}

// (62:3) {#each indicators as {title, schema}}
function create_each_block_1$1(ctx) {
	let link;
	let current;

	link = new Link({
			props: {
				href: makeURL(/*$_hrefBase*/ ctx[5], /*schema*/ ctx[16].value.id),
				rel: "prefetch",
				theme: { color: /*$_theme*/ ctx[6].colorWhite },
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(link.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(link.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(link, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const link_changes = {};
			if (dirty & /*$_hrefBase, $_groups*/ 36) link_changes.href = makeURL(/*$_hrefBase*/ ctx[5], /*schema*/ ctx[16].value.id);
			if (dirty & /*$_theme*/ 64) link_changes.theme = { color: /*$_theme*/ ctx[6].colorWhite };

			if (dirty & /*$$scope, $_groups, currentId, scrollableHeight*/ 524310) {
				link_changes.$$scope = { dirty, ctx };
			}

			link.$set(link_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(link.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(link, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(62:3) {#each indicators as {title, schema}}",
		ctx
	});

	return block;
}

// (59:1) {#each $_groups as {label, indicators}}
function create_each_block$1(ctx) {
	let div;
	let header;
	let t0_value = /*label*/ ctx[11] + "";
	let t0;
	let t1;
	let t2;
	let current;
	let each_value_1 = /*indicators*/ ctx[12];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div = element("div");
			header = element("header");
			t0 = text(t0_value);
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			header = claim_element(div_nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			t0 = claim_text(header_nodes, t0_value);
			header_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			t2 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(header, "class", "svelte-13lnbxn");
			add_location(header, file$3, 60, 3, 1318);
			attr_dev(div, "class", "group svelte-13lnbxn");
			add_location(div, file$3, 59, 2, 1295);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, header);
			append_hydration_dev(header, t0);
			append_hydration_dev(div, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			append_hydration_dev(div, t2);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*$_groups*/ 4) && t0_value !== (t0_value = /*label*/ ctx[11] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*makeURL, $_hrefBase, $_groups, $_theme, currentId, scrollableHeight*/ 118) {
				each_value_1 = /*indicators*/ ctx[12];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t2);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
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
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(59:1) {#each $_groups as {label, indicators}}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let nav;
	let nav_resize_listener;
	let current;
	let each_value = /*$_groups*/ ctx[2];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			nav = element("nav");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nav_nodes);
			}

			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(nav, "class", "svelte-13lnbxn");
			add_render_callback(() => /*nav_elementresize_handler*/ ctx[8].call(nav));
			add_location(nav, file$3, 54, 0, 1183);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, nav, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(nav, null);
				}
			}

			nav_resize_listener = add_resize_listener(nav, /*nav_elementresize_handler*/ ctx[8].bind(nav));
			/*nav_binding*/ ctx[9](nav);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$_groups, makeURL, $_hrefBase, $_theme, currentId, scrollableHeight*/ 118) {
				each_value = /*$_groups*/ ctx[2];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(nav, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
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
			if (detaching) detach_dev(nav);
			destroy_each(each_blocks, detaching);
			nav_resize_listener();
			/*nav_binding*/ ctx[9](null);
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
	let $_groups,
		$$unsubscribe__groups = noop$2,
		$$subscribe__groups = () => ($$unsubscribe__groups(), $$unsubscribe__groups = subscribe(_groups, $$value => $$invalidate(2, $_groups = $$value)), _groups);

	let $_hrefBase;
	let $_theme;
	validate_store(_hrefBase, '_hrefBase');
	component_subscribe($$self, _hrefBase, $$value => $$invalidate(5, $_hrefBase = $$value));
	validate_store(_theme, '_theme');
	component_subscribe($$self, _theme, $$value => $$invalidate(6, $_theme = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe__groups());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sidebar', slots, []);
	let { _groups = null } = $$props;
	validate_store(_groups, '_groups');
	$$subscribe__groups();
	let { currentId = null } = $$props;
	let currentNode;
	let scrollable;
	let scrollableHeight;

	onMount(() => {
		currentNode && currentNode.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	});

	// eslint-disable-next-line no-shadow,no-unused-vars
	function keepOnScreen(node, { id, currentId, scrollableHeight }) {
		if (id === currentId) {
			currentNode = node;
		}

		return {
			// eslint-disable-next-line no-shadow,no-unused-vars
			update({ id, currentId, scrollableHeight }) {
				if (id === currentId) {
					const { y: Y } = scrollable.getBoundingClientRect();
					const { y } = node.getBoundingClientRect();
					const yRel = y - Y;

					if (yRel < 0 || yRel > scrollableHeight) {
						scrollable.scrollTo({ top: yRel, behavior: 'smooth' });
					}
				}
			}
		};
	}

	const writable_props = ['_groups', 'currentId'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
	});

	function nav_elementresize_handler() {
		scrollableHeight = this.clientHeight;
		$$invalidate(4, scrollableHeight);
	}

	function nav_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			scrollable = $$value;
			$$invalidate(3, scrollable);
		});
	}

	$$self.$$set = $$props => {
		if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
		if ('currentId' in $$props) $$invalidate(1, currentId = $$props.currentId);
	};

	$$self.$capture_state = () => ({
		Link,
		onMount,
		setGroups,
		_hrefBase,
		_theme,
		makeURL,
		_groups,
		currentId,
		currentNode,
		scrollable,
		scrollableHeight,
		keepOnScreen,
		$_groups,
		$_hrefBase,
		$_theme
	});

	$$self.$inject_state = $$props => {
		if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
		if ('currentId' in $$props) $$invalidate(1, currentId = $$props.currentId);
		if ('currentNode' in $$props) currentNode = $$props.currentNode;
		if ('scrollable' in $$props) $$invalidate(3, scrollable = $$props.scrollable);
		if ('scrollableHeight' in $$props) $$invalidate(4, scrollableHeight = $$props.scrollableHeight);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*_groups, $_groups*/ 5) {
			_groups && setGroups($_groups);
		}
	};

	return [
		_groups,
		currentId,
		$_groups,
		scrollable,
		scrollableHeight,
		$_hrefBase,
		$_theme,
		keepOnScreen,
		nav_elementresize_handler,
		nav_binding
	];
}

class Sidebar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { _groups: 0, currentId: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sidebar",
			options,
			id: create_fragment$4.name
		});
	}

	get _groups() {
		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _groups(value) {
		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get currentId() {
		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set currentId(value) {
		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Sidebar$1 = Sidebar;

/* ../../components/time_region_value/src/lib/components/Timeline.svelte generated by Svelte v3.58.0 */
const file$2 = "../../components/time_region_value/src/lib/components/Timeline.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[30] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[30] = list[i];
	return child_ctx;
}

// (54:1) {#if width && height && $_layout || isServerSide}
function create_if_block$2(ctx) {
	let svg;
	let if_block0_anchor;
	let if_block0 = /*selectedYear*/ ctx[3] && create_if_block_4$1(ctx);

	function select_block_type_2(ctx, dirty) {
		if (/*showLess*/ ctx[4] && /*selectedYear*/ ctx[3]) return create_if_block_1$2;
		return create_else_block;
	}

	let current_block_type = select_block_type_2(ctx);
	let if_block1 = current_block_type(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_svg_element(nodes, "svg", { width: true, height: true, class: true });
			var svg_nodes = children(svg);
			if (if_block0) if_block0.l(svg_nodes);
			if_block0_anchor = empty();
			if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[5]);
			attr_dev(svg, "height", /*height*/ ctx[1]);
			attr_dev(svg, "class", "svelte-rmsnzm");
			add_location(svg, file$2, 54, 2, 1815);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, svg, anchor);
			if (if_block0) if_block0.m(svg, null);
			append_hydration_dev(svg, if_block0_anchor);
			if_block1.m(svg, null);
		},
		p: function update(ctx, dirty) {
			if (/*selectedYear*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4$1(ctx);
					if_block0.c();
					if_block0.m(svg, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(svg, null);
				}
			}

			if (dirty[0] & /*width*/ 32) {
				attr_dev(svg, "width", /*width*/ ctx[5]);
			}

			if (dirty[0] & /*height*/ 2) {
				attr_dev(svg, "height", /*height*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if (if_block0) if_block0.d();
			if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(54:1) {#if width && height && $_layout || isServerSide}",
		ctx
	});

	return block;
}

// (60:3) {#if selectedYear}
function create_if_block_4$1(ctx) {
	let g0;
	let g0_transform_value;
	let g1;
	let g1_transform_value;

	function select_block_type(ctx, dirty) {
		if (/*hrefPrev*/ ctx[16]) return create_if_block_6;
		return create_else_block_2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*hrefNext*/ ctx[15]) return create_if_block_5;
		return create_else_block_1;
	}

	let current_block_type_1 = select_block_type_1(ctx);
	let if_block1 = current_block_type_1(ctx);

	const block = {
		c: function create() {
			g0 = svg_element("g");
			if_block0.c();
			g1 = svg_element("g");
			if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			g0 = claim_svg_element(nodes, "g", { transform: true, class: true });
			var g0_nodes = children(g0);
			if_block0.l(g0_nodes);
			g0_nodes.forEach(detach_dev);
			g1 = claim_svg_element(nodes, "g", { transform: true, class: true });
			var g1_nodes = children(g1);
			if_block1.l(g1_nodes);
			g1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*prevX*/ ctx[22] + "," + /*buttonY*/ ctx[12] + ")");
			attr_dev(g0, "class", "svelte-rmsnzm");
			toggle_class(g0, "active", /*isPrevYearActive*/ ctx[9]);
			add_location(g0, file$2, 62, 4, 1912);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*nextX*/ ctx[11] + "," + /*buttonY*/ ctx[12] + ")");
			attr_dev(g1, "class", "svelte-rmsnzm");
			toggle_class(g1, "active", /*isNextYearActive*/ ctx[7]);
			add_location(g1, file$2, 90, 4, 2517);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g0, anchor);
			if_block0.m(g0, null);
			insert_hydration_dev(target, g1, anchor);
			if_block1.m(g1, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(g0, null);
				}
			}

			if (dirty[0] & /*prevX, buttonY*/ 4198400 && g0_transform_value !== (g0_transform_value = "translate(" + /*prevX*/ ctx[22] + "," + /*buttonY*/ ctx[12] + ")")) {
				attr_dev(g0, "transform", g0_transform_value);
			}

			if (dirty[0] & /*isPrevYearActive*/ 512) {
				toggle_class(g0, "active", /*isPrevYearActive*/ ctx[9]);
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(g1, null);
				}
			}

			if (dirty[0] & /*nextX, buttonY*/ 6144 && g1_transform_value !== (g1_transform_value = "translate(" + /*nextX*/ ctx[11] + "," + /*buttonY*/ ctx[12] + ")")) {
				attr_dev(g1, "transform", g1_transform_value);
			}

			if (dirty[0] & /*isNextYearActive*/ 128) {
				toggle_class(g1, "active", /*isNextYearActive*/ ctx[7]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g0);
			if_block0.d();
			if (detaching) detach_dev(g1);
			if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$1.name,
		type: "if",
		source: "(60:3) {#if selectedYear}",
		ctx
	});

	return block;
}

// (79:5) {:else}
function create_else_block_2(ctx) {
	let g;
	let rect;
	let polyline;

	const block = {
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { "aria-label": true });
			var g_nodes = children(g);
			rect = claim_svg_element(g_nodes, "rect", { height: true, width: true, class: true });
			children(rect).forEach(detach_dev);
			polyline = claim_svg_element(g_nodes, "polyline", { points: true, class: true });
			children(polyline).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "class", "svelte-rmsnzm");
			add_location(rect, file$2, 80, 7, 2347);
			attr_dev(polyline, "points", /*chevronLeftPath*/ ctx[18]);
			attr_dev(polyline, "class", "svelte-rmsnzm");
			add_location(polyline, file$2, 84, 7, 2425);
			attr_dev(g, "aria-label", "Previous year not available");
			add_location(g, file$2, 79, 6, 2295);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			append_hydration_dev(g, rect);
			append_hydration_dev(g, polyline);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*chevronLeftPath*/ 262144) {
				attr_dev(polyline, "points", /*chevronLeftPath*/ ctx[18]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2.name,
		type: "else",
		source: "(79:5) {:else}",
		ctx
	});

	return block;
}

// (67:5) {#if hrefPrev}
function create_if_block_6(ctx) {
	let a;
	let rect;
	let polyline;
	let a_aria_label_value;

	const block = {
		c: function create() {
			a = svg_element("a");
			rect = svg_element("rect");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_svg_element(nodes, "a", {
				"aria-label": true,
				href: true,
				rel: true
			});

			var a_nodes = children(a);
			rect = claim_svg_element(a_nodes, "rect", { height: true, width: true, class: true });
			children(rect).forEach(detach_dev);
			polyline = claim_svg_element(a_nodes, "polyline", { points: true, class: true });
			children(polyline).forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "class", "svelte-rmsnzm");
			add_location(rect, file$2, 72, 7, 2149);
			attr_dev(polyline, "points", /*chevronLeftPath*/ ctx[18]);
			attr_dev(polyline, "class", "svelte-rmsnzm");
			add_location(polyline, file$2, 76, 7, 2227);
			attr_dev(a, "aria-label", a_aria_label_value = "Show the previous year (" + /*prevYear*/ ctx[8] + ")");
			attr_dev(a, "href", /*hrefPrev*/ ctx[16]);
			attr_dev(a, "rel", "prefetch");
			add_location(a, file$2, 67, 6, 2030);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, rect);
			append_hydration_dev(a, polyline);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*chevronLeftPath*/ 262144) {
				attr_dev(polyline, "points", /*chevronLeftPath*/ ctx[18]);
			}

			if (dirty[0] & /*prevYear*/ 256 && a_aria_label_value !== (a_aria_label_value = "Show the previous year (" + /*prevYear*/ ctx[8] + ")")) {
				attr_dev(a, "aria-label", a_aria_label_value);
			}

			if (dirty[0] & /*hrefPrev*/ 65536) {
				attr_dev(a, "href", /*hrefPrev*/ ctx[16]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(67:5) {#if hrefPrev}",
		ctx
	});

	return block;
}

// (107:5) {:else}
function create_else_block_1(ctx) {
	let g;
	let rect;
	let polyline;

	const block = {
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { "aria-label": true });
			var g_nodes = children(g);
			rect = claim_svg_element(g_nodes, "rect", { height: true, width: true, class: true });
			children(rect).forEach(detach_dev);
			polyline = claim_svg_element(g_nodes, "polyline", { points: true, class: true });
			children(polyline).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "class", "svelte-rmsnzm");
			add_location(rect, file$2, 108, 7, 2945);
			attr_dev(polyline, "points", /*chevronRightPath*/ ctx[17]);
			attr_dev(polyline, "class", "svelte-rmsnzm");
			add_location(polyline, file$2, 112, 7, 3023);
			attr_dev(g, "aria-label", "Next year not available");
			add_location(g, file$2, 107, 6, 2897);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			append_hydration_dev(g, rect);
			append_hydration_dev(g, polyline);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*chevronRightPath*/ 131072) {
				attr_dev(polyline, "points", /*chevronRightPath*/ ctx[17]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(107:5) {:else}",
		ctx
	});

	return block;
}

// (95:5) {#if hrefNext}
function create_if_block_5(ctx) {
	let a;
	let rect;
	let polyline;
	let a_aria_label_value;

	const block = {
		c: function create() {
			a = svg_element("a");
			rect = svg_element("rect");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_svg_element(nodes, "a", {
				"aria-label": true,
				href: true,
				rel: true
			});

			var a_nodes = children(a);
			rect = claim_svg_element(a_nodes, "rect", { height: true, width: true, class: true });
			children(rect).forEach(detach_dev);
			polyline = claim_svg_element(a_nodes, "polyline", { points: true, class: true });
			children(polyline).forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			attr_dev(rect, "class", "svelte-rmsnzm");
			add_location(rect, file$2, 100, 7, 2750);
			attr_dev(polyline, "points", /*chevronRightPath*/ ctx[17]);
			attr_dev(polyline, "class", "svelte-rmsnzm");
			add_location(polyline, file$2, 104, 7, 2828);
			attr_dev(a, "aria-label", a_aria_label_value = "Show the next year (" + /*nextYear*/ ctx[6] + ")");
			attr_dev(a, "href", /*hrefNext*/ ctx[15]);
			attr_dev(a, "rel", "prefetch");
			add_location(a, file$2, 95, 6, 2635);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, rect);
			append_hydration_dev(a, polyline);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "height", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(rect, "width", /*halfHeight*/ ctx[10]);
			}

			if (dirty[0] & /*chevronRightPath*/ 131072) {
				attr_dev(polyline, "points", /*chevronRightPath*/ ctx[17]);
			}

			if (dirty[0] & /*nextYear*/ 64 && a_aria_label_value !== (a_aria_label_value = "Show the next year (" + /*nextYear*/ ctx[6] + ")")) {
				attr_dev(a, "aria-label", a_aria_label_value);
			}

			if (dirty[0] & /*hrefNext*/ 32768) {
				attr_dev(a, "href", /*hrefNext*/ ctx[15]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(95:5) {#if hrefNext}",
		ctx
	});

	return block;
}

// (127:3) {:else}
function create_else_block(ctx) {
	let if_block0_anchor;
	let if_block1_anchor;
	let if_block0 = /*availableYears*/ ctx[0] && create_if_block_3$2(ctx);
	let if_block1 = /*$_yearRange*/ ctx[24] && create_if_block_2$2(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_hydration_dev(target, if_block0_anchor, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_hydration_dev(target, if_block1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*availableYears*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3$2(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*$_yearRange*/ ctx[24]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$2(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(if_block0_anchor);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(127:3) {:else}",
		ctx
	});

	return block;
}

// (120:3) {#if showLess && selectedYear}
function create_if_block_1$2(ctx) {
	let text_1;
	let t;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(/*selectedYear*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_svg_element(nodes, "text", { x: true, y: true, class: true });
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, /*selectedYear*/ ctx[3]);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "x", /*yearsCenterX*/ ctx[21]);
			attr_dev(text_1, "y", /*halfHeight*/ ctx[10]);
			attr_dev(text_1, "class", "svelte-rmsnzm");
			add_location(text_1, file$2, 121, 4, 3143);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, text_1, anchor);
			append_hydration_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selectedYear*/ 8) set_data_dev(t, /*selectedYear*/ ctx[3]);

			if (dirty[0] & /*yearsCenterX*/ 2097152) {
				attr_dev(text_1, "x", /*yearsCenterX*/ ctx[21]);
			}

			if (dirty[0] & /*halfHeight*/ 1024) {
				attr_dev(text_1, "y", /*halfHeight*/ ctx[10]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(120:3) {#if showLess && selectedYear}",
		ctx
	});

	return block;
}

// (131:4) {#if availableYears}
function create_if_block_3$2(ctx) {
	let g;
	let line;
	let g_transform_value;
	let each_value_1 = /*availableYears*/ ctx[0];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			g = svg_element("g");
			line = svg_element("line");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { transform: true });
			var g_nodes = children(g);
			line = claim_svg_element(g_nodes, "line", { x1: true, x2: true, class: true });
			children(line).forEach(detach_dev);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", /*lineX1*/ ctx[20]);
			attr_dev(line, "x2", /*lineX2*/ ctx[19]);
			attr_dev(line, "class", "svelte-rmsnzm");
			add_location(line, file$2, 132, 6, 3329);
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*$_layout*/ ctx[14].y1 + ")");
			add_location(g, file$2, 131, 5, 3280);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			append_hydration_dev(g, line);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(g, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*lineX1*/ 1048576) {
				attr_dev(line, "x1", /*lineX1*/ ctx[20]);
			}

			if (dirty[0] & /*lineX2*/ 524288) {
				attr_dev(line, "x2", /*lineX2*/ ctx[19]);
			}

			if (dirty[0] & /*availableYears, $_hrefBase, indicatorId, $_layout, selectedYear*/ 24589) {
				each_value_1 = /*availableYears*/ ctx[0];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty[0] & /*$_layout*/ 16384 && g_transform_value !== (g_transform_value = "translate(0," + /*$_layout*/ ctx[14].y1 + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(131:4) {#if availableYears}",
		ctx
	});

	return block;
}

// (137:6) {#each availableYears as year}
function create_each_block_1(ctx) {
	let a;
	let circle;
	let circle_cx_value;
	let circle_r_value;
	let a_aria_label_value;
	let a_href_value;

	const block = {
		c: function create() {
			a = svg_element("a");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_svg_element(nodes, "a", {
				"aria-label": true,
				href: true,
				rel: true
			});

			var a_nodes = children(a);
			circle = claim_svg_element(a_nodes, "circle", { cx: true, r: true, class: true });
			children(circle).forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", circle_cx_value = /*$_layout*/ ctx[14].scaleX(/*year*/ ctx[30]));
			attr_dev(circle, "r", circle_r_value = /*$_layout*/ ctx[14].radius);
			attr_dev(circle, "class", "svelte-rmsnzm");
			toggle_class(circle, "selected", /*selectedYear*/ ctx[3] && /*selectedYear*/ ctx[3] === /*year*/ ctx[30]);
			add_location(circle, file$2, 142, 8, 3549);
			attr_dev(a, "aria-label", a_aria_label_value = /*year*/ ctx[30]);
			attr_dev(a, "href", a_href_value = makeURL(/*$_hrefBase*/ ctx[13], /*indicatorId*/ ctx[2], /*year*/ ctx[30]));
			attr_dev(a, "rel", "prefetch");
			add_location(a, file$2, 137, 7, 3426);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, circle);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_layout, availableYears*/ 16385 && circle_cx_value !== (circle_cx_value = /*$_layout*/ ctx[14].scaleX(/*year*/ ctx[30]))) {
				attr_dev(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*$_layout*/ 16384 && circle_r_value !== (circle_r_value = /*$_layout*/ ctx[14].radius)) {
				attr_dev(circle, "r", circle_r_value);
			}

			if (dirty[0] & /*selectedYear, availableYears*/ 9) {
				toggle_class(circle, "selected", /*selectedYear*/ ctx[3] && /*selectedYear*/ ctx[3] === /*year*/ ctx[30]);
			}

			if (dirty[0] & /*availableYears*/ 1 && a_aria_label_value !== (a_aria_label_value = /*year*/ ctx[30])) {
				attr_dev(a, "aria-label", a_aria_label_value);
			}

			if (dirty[0] & /*$_hrefBase, indicatorId, availableYears*/ 8197 && a_href_value !== (a_href_value = makeURL(/*$_hrefBase*/ ctx[13], /*indicatorId*/ ctx[2], /*year*/ ctx[30]))) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(137:6) {#each availableYears as year}",
		ctx
	});

	return block;
}

// (155:4) {#if $_yearRange}
function create_if_block_2$2(ctx) {
	let each_1_anchor;
	let each_value = /*$_yearRange*/ ctx[24];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_hydration_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_layout, $_yearRange, yearsY*/ 25182208) {
				each_value = /*$_yearRange*/ ctx[24];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
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
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(155:4) {#if $_yearRange}",
		ctx
	});

	return block;
}

// (156:5) {#each $_yearRange as year}
function create_each_block(ctx) {
	let text_1;

	let t_value = (/*$_layout*/ ctx[14].doShortenYears
	? shortenYear(/*year*/ ctx[30])
	: /*year*/ ctx[30]) + "";

	let t;
	let text_1_font_size_value;
	let text_1_x_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_svg_element(nodes, "text", {
				"font-size": true,
				x: true,
				y: true,
				class: true
			});

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "font-size", text_1_font_size_value = /*$_layout*/ ctx[14].fontSize);
			attr_dev(text_1, "x", text_1_x_value = /*$_layout*/ ctx[14].scaleX(/*year*/ ctx[30]));
			attr_dev(text_1, "y", /*yearsY*/ ctx[23]);
			attr_dev(text_1, "class", "svelte-rmsnzm");
			add_location(text_1, file$2, 156, 6, 3830);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, text_1, anchor);
			append_hydration_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_layout, $_yearRange*/ 16793600 && t_value !== (t_value = (/*$_layout*/ ctx[14].doShortenYears
			? shortenYear(/*year*/ ctx[30])
			: /*year*/ ctx[30]) + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*$_layout*/ 16384 && text_1_font_size_value !== (text_1_font_size_value = /*$_layout*/ ctx[14].fontSize)) {
				attr_dev(text_1, "font-size", text_1_font_size_value);
			}

			if (dirty[0] & /*$_layout, $_yearRange*/ 16793600 && text_1_x_value !== (text_1_x_value = /*$_layout*/ ctx[14].scaleX(/*year*/ ctx[30]))) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*yearsY*/ 8388608) {
				attr_dev(text_1, "y", /*yearsY*/ ctx[23]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(156:5) {#each $_yearRange as year}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div;
	let if_block = (/*width*/ ctx[5] && /*height*/ ctx[1] && /*$_layout*/ ctx[14] || isServerSide) && create_if_block$2(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "Timeline svelte-rmsnzm");
			add_location(div, file$2, 52, 0, 1739);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p: function update(ctx, dirty) {
			if (/*width*/ ctx[5] && /*height*/ ctx[1] && /*$_layout*/ ctx[14] || isServerSide) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
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
	let yearsY;
	let halfHeight;
	let buttonY;
	let prevX;
	let nextX;
	let yearsCenterX;
	let min;
	let max;
	let med;
	let lineX1;
	let lineX2;
	let chevronLeftPath;
	let chevronRightPath;
	let selectedYearIndex;
	let prevYear;
	let isPrevYearActive;
	let nextYear;
	let isNextYearActive;
	let hrefPrev;
	let hrefNext;
	let $_hrefBase;
	let $_layout;
	let $_yearRange;
	validate_store(_hrefBase, '_hrefBase');
	component_subscribe($$self, _hrefBase, $$value => $$invalidate(13, $_hrefBase = $$value));
	validate_store(_timelineLayout, '_layout');
	component_subscribe($$self, _timelineLayout, $$value => $$invalidate(14, $_layout = $$value));
	validate_store(_yearRange, '_yearRange');
	component_subscribe($$self, _yearRange, $$value => $$invalidate(24, $_yearRange = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Timeline', slots, []);
	const zeroIfNaN = when(isNaN, always(0));
	let { availableYears = null } = $$props;
	let { height = null } = $$props;
	let { indicatorId = null } = $$props;
	let { selectedYear = null } = $$props;
	let { showLess = false } = $$props;
	let { width } = $$props;

	$$self.$$.on_mount.push(function () {
		if (width === undefined && !('width' in $$props || $$self.$$.bound[$$self.$$.props['width']])) {
			console.warn("<Timeline> was created without expected prop 'width'");
		}
	});

	const writable_props = ['availableYears', 'height', 'indicatorId', 'selectedYear', 'showLess', 'width'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Timeline> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('availableYears' in $$props) $$invalidate(0, availableYears = $$props.availableYears);
		if ('height' in $$props) $$invalidate(1, height = $$props.height);
		if ('indicatorId' in $$props) $$invalidate(2, indicatorId = $$props.indicatorId);
		if ('selectedYear' in $$props) $$invalidate(3, selectedYear = $$props.selectedYear);
		if ('showLess' in $$props) $$invalidate(4, showLess = $$props.showLess);
		if ('width' in $$props) $$invalidate(5, width = $$props.width);
	};

	$$self.$capture_state = () => ({
		isServerSide,
		isNotNil,
		_,
		_yearRange,
		_layout: _timelineLayout,
		_hrefBase,
		shortenYear,
		makeURL,
		zeroIfNaN,
		availableYears,
		height,
		indicatorId,
		selectedYear,
		showLess,
		width,
		nextYear,
		isNextYearActive,
		hrefNext,
		prevYear,
		isPrevYearActive,
		hrefPrev,
		selectedYearIndex,
		max,
		min,
		med,
		chevronRightPath,
		chevronLeftPath,
		lineX2,
		lineX1,
		halfHeight,
		nextX,
		yearsCenterX,
		buttonY,
		prevX,
		yearsY,
		$_hrefBase,
		$_layout,
		$_yearRange
	});

	$$self.$inject_state = $$props => {
		if ('availableYears' in $$props) $$invalidate(0, availableYears = $$props.availableYears);
		if ('height' in $$props) $$invalidate(1, height = $$props.height);
		if ('indicatorId' in $$props) $$invalidate(2, indicatorId = $$props.indicatorId);
		if ('selectedYear' in $$props) $$invalidate(3, selectedYear = $$props.selectedYear);
		if ('showLess' in $$props) $$invalidate(4, showLess = $$props.showLess);
		if ('width' in $$props) $$invalidate(5, width = $$props.width);
		if ('nextYear' in $$props) $$invalidate(6, nextYear = $$props.nextYear);
		if ('isNextYearActive' in $$props) $$invalidate(7, isNextYearActive = $$props.isNextYearActive);
		if ('hrefNext' in $$props) $$invalidate(15, hrefNext = $$props.hrefNext);
		if ('prevYear' in $$props) $$invalidate(8, prevYear = $$props.prevYear);
		if ('isPrevYearActive' in $$props) $$invalidate(9, isPrevYearActive = $$props.isPrevYearActive);
		if ('hrefPrev' in $$props) $$invalidate(16, hrefPrev = $$props.hrefPrev);
		if ('selectedYearIndex' in $$props) $$invalidate(25, selectedYearIndex = $$props.selectedYearIndex);
		if ('max' in $$props) $$invalidate(26, max = $$props.max);
		if ('min' in $$props) $$invalidate(27, min = $$props.min);
		if ('med' in $$props) $$invalidate(28, med = $$props.med);
		if ('chevronRightPath' in $$props) $$invalidate(17, chevronRightPath = $$props.chevronRightPath);
		if ('chevronLeftPath' in $$props) $$invalidate(18, chevronLeftPath = $$props.chevronLeftPath);
		if ('lineX2' in $$props) $$invalidate(19, lineX2 = $$props.lineX2);
		if ('lineX1' in $$props) $$invalidate(20, lineX1 = $$props.lineX1);
		if ('halfHeight' in $$props) $$invalidate(10, halfHeight = $$props.halfHeight);
		if ('nextX' in $$props) $$invalidate(11, nextX = $$props.nextX);
		if ('yearsCenterX' in $$props) $$invalidate(21, yearsCenterX = $$props.yearsCenterX);
		if ('buttonY' in $$props) $$invalidate(12, buttonY = $$props.buttonY);
		if ('prevX' in $$props) $$invalidate(22, prevX = $$props.prevX);
		if ('yearsY' in $$props) $$invalidate(23, yearsY = $$props.yearsY);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*availableYears, $_layout*/ 16385) {
			$$invalidate(23, yearsY = availableYears?.length > 0 ? $_layout.y2 : $_layout.ym);
		}

		if ($$self.$$.dirty[0] & /*$_layout*/ 16384) {
			/* buttons */
			$$invalidate(10, halfHeight = $_layout.height / 2);
		}

		if ($$self.$$.dirty[0] & /*halfHeight*/ 1024) {
			$$invalidate(12, buttonY = halfHeight / 2);
		}

		if ($$self.$$.dirty[0] & /*buttonY*/ 4096) {
			$$invalidate(22, prevX = buttonY);
		}

		if ($$self.$$.dirty[0] & /*buttonY, halfHeight*/ 5120) {
			$$invalidate(11, nextX = buttonY + halfHeight + 0.25 * buttonY);
		}

		if ($$self.$$.dirty[0] & /*nextX, halfHeight, width*/ 3104) {
			$$invalidate(21, yearsCenterX = (nextX + halfHeight + width) / 2);
		}

		if ($$self.$$.dirty[0] & /*halfHeight*/ 1024) {
			$$invalidate(27, min = halfHeight / 3);
		}

		if ($$self.$$.dirty[0] & /*min*/ 134217728) {
			$$invalidate(26, max = 2 * min);
		}

		if ($$self.$$.dirty[0] & /*halfHeight*/ 1024) {
			$$invalidate(28, med = halfHeight / 2);
		}

		if ($$self.$$.dirty[0] & /*$_layout, availableYears*/ 16385) {
			$$invalidate(20, lineX1 = zeroIfNaN($_layout.scaleX(availableYears[0]) + $_layout.radius));
		}

		if ($$self.$$.dirty[0] & /*$_layout, availableYears*/ 16385) {
			$$invalidate(19, lineX2 = zeroIfNaN($_layout.scaleX(last$1(availableYears)) - $_layout.radius));
		}

		if ($$self.$$.dirty[0] & /*max, min, med*/ 469762048) {
			$$invalidate(18, chevronLeftPath = `${max} ${min} ${min} ${med} ${max} ${max}`);
		}

		if ($$self.$$.dirty[0] & /*min, max, med*/ 469762048) {
			$$invalidate(17, chevronRightPath = `${min} ${min} ${max} ${med} ${min} ${max}`);
		}

		if ($$self.$$.dirty[0] & /*availableYears, selectedYear*/ 9) {
			$$invalidate(25, selectedYearIndex = findIndex(availableYears, is(selectedYear)));
		}

		if ($$self.$$.dirty[0] & /*availableYears, selectedYearIndex*/ 33554433) {
			$$invalidate(8, prevYear = availableYears[selectedYearIndex - 1]);
		}

		if ($$self.$$.dirty[0] & /*prevYear*/ 256) {
			$$invalidate(9, isPrevYearActive = isNotNil(prevYear));
		}

		if ($$self.$$.dirty[0] & /*availableYears, selectedYearIndex*/ 33554433) {
			$$invalidate(6, nextYear = availableYears[selectedYearIndex + 1]);
		}

		if ($$self.$$.dirty[0] & /*nextYear*/ 64) {
			$$invalidate(7, isNextYearActive = isNotNil(nextYear));
		}

		if ($$self.$$.dirty[0] & /*isPrevYearActive, $_hrefBase, indicatorId, prevYear*/ 8964) {
			$$invalidate(16, hrefPrev = isPrevYearActive
			? makeURL($_hrefBase, indicatorId, prevYear)
			: null);
		}

		if ($$self.$$.dirty[0] & /*isNextYearActive, $_hrefBase, indicatorId, nextYear*/ 8388) {
			$$invalidate(15, hrefNext = isNextYearActive
			? makeURL($_hrefBase, indicatorId, nextYear)
			: null);
		}
	};

	return [
		availableYears,
		height,
		indicatorId,
		selectedYear,
		showLess,
		width,
		nextYear,
		isNextYearActive,
		prevYear,
		isPrevYearActive,
		halfHeight,
		nextX,
		buttonY,
		$_hrefBase,
		$_layout,
		hrefNext,
		hrefPrev,
		chevronRightPath,
		chevronLeftPath,
		lineX2,
		lineX1,
		yearsCenterX,
		prevX,
		yearsY,
		$_yearRange,
		selectedYearIndex,
		max,
		min,
		med
	];
}

class Timeline extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{
				availableYears: 0,
				height: 1,
				indicatorId: 2,
				selectedYear: 3,
				showLess: 4,
				width: 5
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Timeline",
			options,
			id: create_fragment$3.name
		});
	}

	get availableYears() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set availableYears(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get height() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get indicatorId() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set indicatorId(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedYear() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedYear(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get showLess() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showLess(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Timeline$1 = Timeline;

/* ../../components/time_region_value/src/lib/components/ViewSelector.svelte generated by Svelte v3.58.0 */
const file$1 = "../../components/time_region_value/src/lib/components/ViewSelector.svelte";

// (69:27) 
function create_if_block_3$1(ctx) {
	let div0;
	let icon0;
	let t;
	let div1;
	let icon1;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon({
			props: {
				glyph: MapPin,
				stroke: /*strokes*/ ctx[3].map
			},
			$$inline: true
		});

	icon1 = new Icon({
			props: {
				glyph: BarChart,
				stroke: /*strokes*/ ctx[3].barchart
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(icon0.$$.fragment);
			t = space();
			div1 = element("div");
			create_component(icon1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(icon0.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(icon1.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "button clickable svelte-ghla19");
			add_location(div0, file$1, 69, 2, 1239);
			attr_dev(div1, "class", "button clickable rotated svelte-ghla19");
			add_location(div1, file$1, 79, 2, 1409);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			mount_component(icon0, div0, null);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, div1, anchor);
			mount_component(icon1, div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						div0,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('map'))) /*showView*/ ctx[2]('map').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div0, "keydown", /*onKeyDown*/ ctx[5]('map'), false, false, false, false),
					listen_dev(
						div1,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('barchart'))) /*showView*/ ctx[2]('barchart').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div1, "keydown", /*onKeyDown*/ ctx[5]('barchart'), false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const icon0_changes = {};
			if (dirty & /*strokes*/ 8) icon0_changes.stroke = /*strokes*/ ctx[3].map;
			icon0.$set(icon0_changes);
			const icon1_changes = {};
			if (dirty & /*strokes*/ 8) icon1_changes.stroke = /*strokes*/ ctx[3].barchart;
			icon1.$set(icon1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(icon0);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(icon1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(69:27) ",
		ctx
	});

	return block;
}

// (58:23) 
function create_if_block_2$1(ctx) {
	let div;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: {
				glyph: Activity,
				stroke: /*strokes*/ ctx[3].trends
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(icon.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "button clickable svelte-ghla19");
			add_location(div, file$1, 58, 2, 1030);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			mount_component(icon, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						div,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('trends'))) /*showView*/ ctx[2]('trends').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div, "keydown", /*onKeyDown*/ ctx[5]('trends'), false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const icon_changes = {};
			if (dirty & /*strokes*/ 8) icon_changes.stroke = /*strokes*/ ctx[3].trends;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(58:23) ",
		ctx
	});

	return block;
}

// (47:1) {#if $_routes.Index}
function create_if_block_1$1(ctx) {
	let div;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: {
				glyph: Clock,
				stroke: /*strokes*/ ctx[3].distribution
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(icon.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "button clickable svelte-ghla19");
			add_location(div, file$1, 47, 2, 810);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			mount_component(icon, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						div,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('distribution'))) /*showView*/ ctx[2]('distribution').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div, "keydown", /*onKeyDown*/ ctx[5]('distribution'), false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const icon_changes = {};
			if (dirty & /*strokes*/ 8) icon_changes.stroke = /*strokes*/ ctx[3].distribution;
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(47:1) {#if $_routes.Index}",
		ctx
	});

	return block;
}

// (92:1) {#if $_routes.Id || $_routes.IdYear}
function create_if_block$1(ctx) {
	let div0;
	let icon0;
	let t;
	let div1;
	let icon1;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon({
			props: {
				glyph: Info,
				stroke: /*strokes*/ ctx[3].info
			},
			$$inline: true
		});

	icon1 = new Icon({
			props: {
				glyph: Settings,
				stroke: /*strokes*/ ctx[3].settings
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(icon0.$$.fragment);
			t = space();
			div1 = element("div");
			create_component(icon1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(icon0.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(icon1.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "button clickable svelte-ghla19");
			add_location(div0, file$1, 92, 2, 1650);
			attr_dev(div1, "class", "button clickable svelte-ghla19");
			add_location(div1, file$1, 102, 2, 1829);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			mount_component(icon0, div0, null);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, div1, anchor);
			mount_component(icon1, div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						div0,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('info'))) /*showView*/ ctx[2]('info').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div0, "keydown", /*onKeyDown*/ ctx[5]('info'), false, false, false, false),
					listen_dev(
						div1,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('settings'))) /*showView*/ ctx[2]('settings').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div1, "keydown", /*onKeyDown*/ ctx[5]('settings'), false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const icon0_changes = {};
			if (dirty & /*strokes*/ 8) icon0_changes.stroke = /*strokes*/ ctx[3].info;
			icon0.$set(icon0_changes);
			const icon1_changes = {};
			if (dirty & /*strokes*/ 8) icon1_changes.stroke = /*strokes*/ ctx[3].settings;
			icon1.$set(icon1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(icon0);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(icon1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(92:1) {#if $_routes.Id || $_routes.IdYear}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let nav;
	let div;
	let icon;
	let t0;
	let current_block_type_index;
	let if_block0;
	let t1;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: {
				glyph: List,
				stroke: /*strokes*/ ctx[3].sidebar
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$_routes*/ ctx[4].Index) return 0;
		if (/*$_routes*/ ctx[4].Id) return 1;
		if (/*$_routes*/ ctx[4].IdYear) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	let if_block1 = (/*$_routes*/ ctx[4].Id || /*$_routes*/ ctx[4].IdYear) && create_if_block$1(ctx);

	const block = {
		c: function create() {
			nav = element("nav");
			div = element("div");
			create_component(icon.$$.fragment);
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			div = claim_element(nav_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(icon.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			t0 = claim_space(nav_nodes);
			if (if_block0) if_block0.l(nav_nodes);
			t1 = claim_space(nav_nodes);
			if (if_block1) if_block1.l(nav_nodes);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "button clickable svelte-ghla19");
			add_location(div, file$1, 35, 1, 616);
			attr_dev(nav, "class", "ViewSelector svelte-ghla19");
			toggle_class(nav, "id", /*$_routes*/ ctx[4].Id);
			toggle_class(nav, "year", /*$_routes*/ ctx[4].IdYear);
			add_location(nav, file$1, 30, 0, 532);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, nav, anchor);
			append_hydration_dev(nav, div);
			mount_component(icon, div, null);
			append_hydration_dev(nav, t0);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(nav, null);
			}

			append_hydration_dev(nav, t1);
			if (if_block1) if_block1.m(nav, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						div,
						"click",
						function () {
							if (is_function(/*showView*/ ctx[2]('sidebar'))) /*showView*/ ctx[2]('sidebar').apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(div, "keydown", /*onKeyDown*/ ctx[5]('sidebar'), false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			const icon_changes = {};
			if (dirty & /*strokes*/ 8) icon_changes.stroke = /*strokes*/ ctx[3].sidebar;
			icon.$set(icon_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block0) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block0 = if_blocks[current_block_type_index];

					if (!if_block0) {
						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block0.c();
					} else {
						if_block0.p(ctx, dirty);
					}

					transition_in(if_block0, 1);
					if_block0.m(nav, t1);
				} else {
					if_block0 = null;
				}
			}

			if (/*$_routes*/ ctx[4].Id || /*$_routes*/ ctx[4].IdYear) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*$_routes*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(nav, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*$_routes*/ 16) {
				toggle_class(nav, "id", /*$_routes*/ ctx[4].Id);
			}

			if (!current || dirty & /*$_routes*/ 16) {
				toggle_class(nav, "year", /*$_routes*/ ctx[4].IdYear);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			destroy_component(icon);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
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
	let strokes;

	let $_views,
		$$unsubscribe__views = noop$2,
		$$subscribe__views = () => ($$unsubscribe__views(), $$unsubscribe__views = subscribe(_views, $$value => $$invalidate(6, $_views = $$value)), _views);

	let $_routes,
		$$unsubscribe__routes = noop$2,
		$$subscribe__routes = () => ($$unsubscribe__routes(), $$unsubscribe__routes = subscribe(_routes, $$value => $$invalidate(4, $_routes = $$value)), _routes);

	$$self.$$.on_destroy.push(() => $$unsubscribe__views());
	$$self.$$.on_destroy.push(() => $$unsubscribe__routes());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ViewSelector', slots, []);
	const makeStrokes = mapValuesWith(truthynessTo(['black', 'grey']));
	let { _routes = null } = $$props;
	validate_store(_routes, '_routes');
	$$subscribe__routes();
	let { _views = null } = $$props;
	validate_store(_views, '_views');
	$$subscribe__views();
	let { showView = null } = $$props;

	const onKeyDown = id => event => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			showView(id);
		}
	};

	const writable_props = ['_routes', '_views', 'showView'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ViewSelector> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('_routes' in $$props) $$subscribe__routes($$invalidate(0, _routes = $$props._routes));
		if ('_views' in $$props) $$subscribe__views($$invalidate(1, _views = $$props._views));
		if ('showView' in $$props) $$invalidate(2, showView = $$props.showView);
	};

	$$self.$capture_state = () => ({
		Activity,
		BarChart,
		Clock,
		Icon,
		Info,
		List,
		MapPin,
		Settings,
		truthynessTo,
		_,
		makeStrokes,
		_routes,
		_views,
		showView,
		onKeyDown,
		strokes,
		$_views,
		$_routes
	});

	$$self.$inject_state = $$props => {
		if ('_routes' in $$props) $$subscribe__routes($$invalidate(0, _routes = $$props._routes));
		if ('_views' in $$props) $$subscribe__views($$invalidate(1, _views = $$props._views));
		if ('showView' in $$props) $$invalidate(2, showView = $$props.showView);
		if ('strokes' in $$props) $$invalidate(3, strokes = $$props.strokes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$_views*/ 64) {
			$$invalidate(3, strokes = makeStrokes($_views));
		}
	};

	return [_routes, _views, showView, strokes, $_routes, onKeyDown, $_views];
}

class ViewSelector extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { _routes: 0, _views: 1, showView: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ViewSelector",
			options,
			id: create_fragment$2.name
		});
	}

	get _routes() {
		throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _routes(value) {
		throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get _views() {
		throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _views(value) {
		throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get showView() {
		throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showView(value) {
		throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var ViewSelector$1 = ViewSelector;

/* ../../components/time_region_value/src/routes/_layout.svelte generated by Svelte v3.58.0 */
const file = "../../components/time_region_value/src/routes/_layout.svelte";

// (66:0) {#if isClientSide}
function create_if_block_4(ctx) {
	let fetchdriver;
	let updating_outData;
	let updating_outLoadingKeys;
	let current;

	function fetchdriver_outData_binding(value) {
		/*fetchdriver_outData_binding*/ ctx[28](value);
	}

	function fetchdriver_outLoadingKeys_binding(value) {
		/*fetchdriver_outLoadingKeys_binding*/ ctx[29](value);
	}

	let fetchdriver_props = {
		shouldPrefetch: /*shouldPrefetch*/ ctx[2],
		asapKeys: /*$_topojsonPriorities*/ ctx[6].asapKeys,
		nextKeys: /*$_topojsonPriorities*/ ctx[6].nextKeys,
		transformer: exportedObjBufferToAny,
		uriMap: /*$_uriMap*/ ctx[9]
	};

	if (/*$_topoCache*/ ctx[7] !== void 0) {
		fetchdriver_props.outData = /*$_topoCache*/ ctx[7];
	}

	if (/*$_loadingTopojsonKeys*/ ctx[8] !== void 0) {
		fetchdriver_props.outLoadingKeys = /*$_loadingTopojsonKeys*/ ctx[8];
	}

	fetchdriver = new FetchDriver$1({ props: fetchdriver_props, $$inline: true });
	binding_callbacks.push(() => bind$1(fetchdriver, 'outData', fetchdriver_outData_binding));
	binding_callbacks.push(() => bind$1(fetchdriver, 'outLoadingKeys', fetchdriver_outLoadingKeys_binding));

	const block = {
		c: function create() {
			create_component(fetchdriver.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(fetchdriver.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(fetchdriver, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const fetchdriver_changes = {};
			if (dirty[0] & /*shouldPrefetch*/ 4) fetchdriver_changes.shouldPrefetch = /*shouldPrefetch*/ ctx[2];
			if (dirty[0] & /*$_topojsonPriorities*/ 64) fetchdriver_changes.asapKeys = /*$_topojsonPriorities*/ ctx[6].asapKeys;
			if (dirty[0] & /*$_topojsonPriorities*/ 64) fetchdriver_changes.nextKeys = /*$_topojsonPriorities*/ ctx[6].nextKeys;
			if (dirty[0] & /*$_uriMap*/ 512) fetchdriver_changes.uriMap = /*$_uriMap*/ ctx[9];

			if (!updating_outData && dirty[0] & /*$_topoCache*/ 128) {
				updating_outData = true;
				fetchdriver_changes.outData = /*$_topoCache*/ ctx[7];
				add_flush_callback(() => updating_outData = false);
			}

			if (!updating_outLoadingKeys && dirty[0] & /*$_loadingTopojsonKeys*/ 256) {
				updating_outLoadingKeys = true;
				fetchdriver_changes.outLoadingKeys = /*$_loadingTopojsonKeys*/ ctx[8];
				add_flush_callback(() => updating_outLoadingKeys = false);
			}

			fetchdriver.$set(fetchdriver_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(fetchdriver.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(fetchdriver.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(fetchdriver, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(66:0) {#if isClientSide}",
		ctx
	});

	return block;
}

// (95:0) {#if $_screenClasses || isServerSide}
function create_if_block_1(ctx) {
	let section1;
	let div2;
	let div0;
	let sidebar;
	let t0;
	let div1;
	let section0;
	let t1;
	let div1_resize_listener;
	let div2_class_value;
	let t2;
	let section1_class_value;
	let current;

	sidebar = new Sidebar$1({
			props: {
				_groups: /*_groups*/ ctx[0],
				currentId: /*segment*/ ctx[1]
			},
			$$inline: true
		});

	const default_slot_template = /*#slots*/ ctx[27].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[26], null);
	let if_block0 = !/*$_isTimelineHidden*/ ctx[13] && create_if_block_3(ctx);
	let if_block1 = /*$_isSmallScreen*/ ctx[3] && create_if_block_2(ctx);

	const block = {
		c: function create() {
			section1 = element("section");
			div2 = element("div");
			div0 = element("div");
			create_component(sidebar.$$.fragment);
			t0 = space();
			div1 = element("div");
			section0 = element("section");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			section1 = claim_element(nodes, "SECTION", { class: true, style: true });
			var section1_nodes = children(section1);
			div2 = claim_element(section1_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(sidebar.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			section0 = claim_element(div1_nodes, "SECTION", { class: true });
			var section0_nodes = children(section0);
			if (default_slot) default_slot.l(section0_nodes);
			section0_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			if (if_block0) if_block0.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t2 = claim_space(section1_nodes);
			if (if_block1) if_block1.l(section1_nodes);
			section1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "sidebar svelte-dclfdu");
			add_location(div0, file, 105, 3, 3184);
			attr_dev(section0, "class", "svelte-dclfdu");
			add_location(section0, file, 116, 4, 3400);
			attr_dev(div1, "class", "content svelte-dclfdu");
			add_render_callback(() => /*div1_elementresize_handler*/ ctx[31].call(div1));
			toggle_class(div1, "isTimelineHidden", /*$_isTimelineHidden*/ ctx[13]);
			add_location(div1, file, 111, 3, 3279);
			attr_dev(div2, "class", div2_class_value = "viewport " + /*$_viewsClasses*/ ctx[12] + " svelte-dclfdu");
			toggle_class(div2, "routeId", /*routeId*/ ctx[5]);
			toggle_class(div2, "routeIdYear", /*routeIdYear*/ ctx[4]);
			add_location(div2, file, 100, 2, 3097);
			attr_dev(section1, "class", section1_class_value = "time_region_value_layout " + /*$_screenClasses*/ ctx[10] + " svelte-dclfdu");
			attr_dev(section1, "style", /*$_style*/ ctx[11]);
			toggle_class(section1, "hidden", !/*$_screenClasses*/ ctx[10]);
			add_location(section1, file, 95, 1, 2978);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, section1, anchor);
			append_hydration_dev(section1, div2);
			append_hydration_dev(div2, div0);
			mount_component(sidebar, div0, null);
			append_hydration_dev(div2, t0);
			append_hydration_dev(div2, div1);
			append_hydration_dev(div1, section0);

			if (default_slot) {
				default_slot.m(section0, null);
			}

			append_hydration_dev(div1, t1);
			if (if_block0) if_block0.m(div1, null);
			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[31].bind(div1));
			append_hydration_dev(section1, t2);
			if (if_block1) if_block1.m(section1, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const sidebar_changes = {};
			if (dirty[0] & /*_groups*/ 1) sidebar_changes._groups = /*_groups*/ ctx[0];
			if (dirty[0] & /*segment*/ 2) sidebar_changes.currentId = /*segment*/ ctx[1];
			sidebar.$set(sidebar_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 67108864)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[26], dirty, null),
						null
					);
				}
			}

			if (!/*$_isTimelineHidden*/ ctx[13]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*$_isTimelineHidden*/ 8192) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div1, null);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*$_isTimelineHidden*/ 8192) {
				toggle_class(div1, "isTimelineHidden", /*$_isTimelineHidden*/ ctx[13]);
			}

			if (!current || dirty[0] & /*$_viewsClasses*/ 4096 && div2_class_value !== (div2_class_value = "viewport " + /*$_viewsClasses*/ ctx[12] + " svelte-dclfdu")) {
				attr_dev(div2, "class", div2_class_value);
			}

			if (!current || dirty[0] & /*$_viewsClasses, routeId*/ 4128) {
				toggle_class(div2, "routeId", /*routeId*/ ctx[5]);
			}

			if (!current || dirty[0] & /*$_viewsClasses, routeIdYear*/ 4112) {
				toggle_class(div2, "routeIdYear", /*routeIdYear*/ ctx[4]);
			}

			if (/*$_isSmallScreen*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*$_isSmallScreen*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(section1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*$_screenClasses*/ 1024 && section1_class_value !== (section1_class_value = "time_region_value_layout " + /*$_screenClasses*/ ctx[10] + " svelte-dclfdu")) {
				attr_dev(section1, "class", section1_class_value);
			}

			if (!current || dirty[0] & /*$_style*/ 2048) {
				attr_dev(section1, "style", /*$_style*/ ctx[11]);
			}

			if (!current || dirty[0] & /*$_screenClasses, $_screenClasses*/ 1024) {
				toggle_class(section1, "hidden", !/*$_screenClasses*/ ctx[10]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sidebar.$$.fragment, local);
			transition_in(default_slot, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(sidebar.$$.fragment, local);
			transition_out(default_slot, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section1);
			destroy_component(sidebar);
			if (default_slot) default_slot.d(detaching);
			if (if_block0) if_block0.d();
			div1_resize_listener();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(95:0) {#if $_screenClasses || isServerSide}",
		ctx
	});

	return block;
}

// (120:4) {#if !$_isTimelineHidden}
function create_if_block_3(ctx) {
	let nav;
	let timeline;
	let nav_resize_listener;
	let current;

	timeline = new Timeline$1({
			props: {
				availableYears: /*$_availableYears*/ ctx[16],
				height: /*$_timelineHeight*/ ctx[15],
				indicatorId: /*segment*/ ctx[1],
				selectedYear: /*$_selectedYear*/ ctx[17],
				showLess: /*$_isSmallScreen*/ ctx[3],
				width: /*$_timelineWidth*/ ctx[14]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			nav = element("nav");
			create_component(timeline.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			claim_component(timeline.$$.fragment, nav_nodes);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(nav, "class", "svelte-dclfdu");
			add_render_callback(() => /*nav_elementresize_handler*/ ctx[30].call(nav));
			add_location(nav, file, 120, 5, 3474);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, nav, anchor);
			mount_component(timeline, nav, null);
			nav_resize_listener = add_resize_listener(nav, /*nav_elementresize_handler*/ ctx[30].bind(nav));
			current = true;
		},
		p: function update(ctx, dirty) {
			const timeline_changes = {};
			if (dirty[0] & /*$_availableYears*/ 65536) timeline_changes.availableYears = /*$_availableYears*/ ctx[16];
			if (dirty[0] & /*$_timelineHeight*/ 32768) timeline_changes.height = /*$_timelineHeight*/ ctx[15];
			if (dirty[0] & /*segment*/ 2) timeline_changes.indicatorId = /*segment*/ ctx[1];
			if (dirty[0] & /*$_selectedYear*/ 131072) timeline_changes.selectedYear = /*$_selectedYear*/ ctx[17];
			if (dirty[0] & /*$_isSmallScreen*/ 8) timeline_changes.showLess = /*$_isSmallScreen*/ ctx[3];
			if (dirty[0] & /*$_timelineWidth*/ 16384) timeline_changes.width = /*$_timelineWidth*/ ctx[14];
			timeline.$set(timeline_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(timeline.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(timeline.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			destroy_component(timeline);
			nav_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(120:4) {#if !$_isTimelineHidden}",
		ctx
	});

	return block;
}

// (137:2) {#if $_isSmallScreen}
function create_if_block_2(ctx) {
	let viewselector;
	let current;

	viewselector = new ViewSelector$1({
			props: { _routes, _views, showView },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(viewselector.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(viewselector.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(viewselector, target, anchor);
			current = true;
		},
		p: noop$2,
		i: function intro(local) {
			if (current) return;
			transition_in(viewselector.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(viewselector.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(viewselector, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(137:2) {#if $_isSmallScreen}",
		ctx
	});

	return block;
}

// (147:0) {#if !$_screenClasses}
function create_if_block(ctx) {
	let loadingview;
	let current;

	loadingview = new LoadingView({
			props: { stroke: /*$_theme*/ ctx[18].colorMain },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(loadingview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loadingview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loadingview, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loadingview_changes = {};
			if (dirty[0] & /*$_theme*/ 262144) loadingview_changes.stroke = /*$_theme*/ ctx[18].colorMain;
			loadingview.$set(loadingview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(147:0) {#if !$_screenClasses}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let screensensor;
	let t0;
	let t1;
	let t2;
	let if_block2_anchor;
	let current;
	screensensor = new ScreenSensor({ $$inline: true });
	let if_block0 = isClientSide && create_if_block_4(ctx);
	let if_block1 = (/*$_screenClasses*/ ctx[10] || isServerSide) && create_if_block_1(ctx);
	let if_block2 = !/*$_screenClasses*/ ctx[10] && create_if_block(ctx);

	const block = {
		c: function create() {
			create_component(screensensor.$$.fragment);
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
		},
		l: function claim(nodes) {
			claim_component(screensensor.$$.fragment, nodes);
			t0 = claim_space(nodes);
			if (if_block0) if_block0.l(nodes);
			t1 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			t2 = claim_space(nodes);
			if (if_block2) if_block2.l(nodes);
			if_block2_anchor = empty();
		},
		m: function mount(target, anchor) {
			mount_component(screensensor, target, anchor);
			insert_hydration_dev(target, t0, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_hydration_dev(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_hydration_dev(target, t2, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_hydration_dev(target, if_block2_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (isClientSide) if_block0.p(ctx, dirty);

			if (/*$_screenClasses*/ ctx[10] || isServerSide) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*$_screenClasses*/ 1024) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t2.parentNode, t2);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!/*$_screenClasses*/ ctx[10]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*$_screenClasses*/ 1024) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(screensensor.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(screensensor.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(screensensor, detaching);
			if (detaching) detach_dev(t0);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t1);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t2);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(if_block2_anchor);
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
	let routeId;
	let routeIdYear;
	let $_routes;
	let $_isSmallScreen;

	let $_groups,
		$$unsubscribe__groups = noop$2,
		$$subscribe__groups = () => ($$unsubscribe__groups(), $$unsubscribe__groups = subscribe(_groups, $$value => $$invalidate(25, $_groups = $$value)), _groups);

	let $_topojsonPriorities;
	let $_topoCache;
	let $_loadingTopojsonKeys;
	let $_uriMap;
	let $_screenClasses;
	let $_style;
	let $_viewsClasses;
	let $_isTimelineHidden;
	let $_timelineWidth;
	let $_timelineHeight;
	let $_availableYears;
	let $_selectedYear;
	let $_theme;
	validate_store(_routes, '_routes');
	component_subscribe($$self, _routes, $$value => $$invalidate(24, $_routes = $$value));
	validate_store(_isSmallScreen, '_isSmallScreen');
	component_subscribe($$self, _isSmallScreen, $$value => $$invalidate(3, $_isSmallScreen = $$value));
	validate_store(_topojsonPriorities, '_topojsonPriorities');
	component_subscribe($$self, _topojsonPriorities, $$value => $$invalidate(6, $_topojsonPriorities = $$value));
	validate_store(_topoCache, '_topoCache');
	component_subscribe($$self, _topoCache, $$value => $$invalidate(7, $_topoCache = $$value));
	validate_store(_loadingTopojsonKeys, '_loadingTopojsonKeys');
	component_subscribe($$self, _loadingTopojsonKeys, $$value => $$invalidate(8, $_loadingTopojsonKeys = $$value));
	validate_store(_uriMap, '_uriMap');
	component_subscribe($$self, _uriMap, $$value => $$invalidate(9, $_uriMap = $$value));
	validate_store(_screenClasses, '_screenClasses');
	component_subscribe($$self, _screenClasses, $$value => $$invalidate(10, $_screenClasses = $$value));
	validate_store(_style, '_style');
	component_subscribe($$self, _style, $$value => $$invalidate(11, $_style = $$value));
	validate_store(_viewsClasses, '_viewsClasses');
	component_subscribe($$self, _viewsClasses, $$value => $$invalidate(12, $_viewsClasses = $$value));
	validate_store(_isTimelineHidden, '_isTimelineHidden');
	component_subscribe($$self, _isTimelineHidden, $$value => $$invalidate(13, $_isTimelineHidden = $$value));
	validate_store(_timelineWidth, '_timelineWidth');
	component_subscribe($$self, _timelineWidth, $$value => $$invalidate(14, $_timelineWidth = $$value));
	validate_store(_timelineHeight, '_timelineHeight');
	component_subscribe($$self, _timelineHeight, $$value => $$invalidate(15, $_timelineHeight = $$value));
	validate_store(_availableYears, '_availableYears');
	component_subscribe($$self, _availableYears, $$value => $$invalidate(16, $_availableYears = $$value));
	validate_store(_selectedYear, '_selectedYear');
	component_subscribe($$self, _selectedYear, $$value => $$invalidate(17, $_selectedYear = $$value));
	validate_store(_theme, '_theme');
	component_subscribe($$self, _theme, $$value => $$invalidate(18, $_theme = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe__groups());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layout', slots, ['default']);
	let { _groups = null } = $$props;
	validate_store(_groups, '_groups');
	$$subscribe__groups();
	let { flags = null } = $$props;
	let { hrefBase = '' } = $$props;
	let { POIs = null } = $$props;
	let { regionSettings = null } = $$props;
	let { segment = null } = $$props;
	let { shouldPrefetch = false } = $$props;
	let { theme = null } = $$props;

	const writable_props = [
		'_groups',
		'flags',
		'hrefBase',
		'POIs',
		'regionSettings',
		'segment',
		'shouldPrefetch',
		'theme'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	function fetchdriver_outData_binding(value) {
		$_topoCache = value;
		_topoCache.set($_topoCache);
	}

	function fetchdriver_outLoadingKeys_binding(value) {
		$_loadingTopojsonKeys = value;
		_loadingTopojsonKeys.set($_loadingTopojsonKeys);
	}

	function nav_elementresize_handler() {
		$_timelineHeight = this.clientHeight;
		_timelineHeight.set($_timelineHeight);
	}

	function div1_elementresize_handler() {
		$_timelineWidth = this.clientWidth;
		_timelineWidth.set($_timelineWidth);
	}

	$$self.$$set = $$props => {
		if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
		if ('flags' in $$props) $$invalidate(19, flags = $$props.flags);
		if ('hrefBase' in $$props) $$invalidate(20, hrefBase = $$props.hrefBase);
		if ('POIs' in $$props) $$invalidate(21, POIs = $$props.POIs);
		if ('regionSettings' in $$props) $$invalidate(22, regionSettings = $$props.regionSettings);
		if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
		if ('shouldPrefetch' in $$props) $$invalidate(2, shouldPrefetch = $$props.shouldPrefetch);
		if ('theme' in $$props) $$invalidate(23, theme = $$props.theme);
		if ('$$scope' in $$props) $$invalidate(26, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		isClientSide,
		isServerSide,
		LoadingView,
		ScreenSensor,
		FetchDriver: FetchDriver$1,
		exportedObjBufferToAny,
		Sidebar: Sidebar$1,
		Timeline: Timeline$1,
		ViewSelector: ViewSelector$1,
		setGroups,
		_loadingTopojsonKeys,
		_topoCache,
		_topojsonPriorities,
		_uriMap,
		_availableYears,
		_isSmallScreen,
		_screenClasses,
		_timelineHeight,
		_timelineWidth,
		_hrefBase,
		_isTimelineHidden,
		_navFlags,
		_routes,
		_views,
		_viewsClasses,
		showView,
		_POIs,
		_regionSettings,
		_selectedYear,
		_style,
		_theme,
		customizeTheme,
		_groups,
		flags,
		hrefBase,
		POIs,
		regionSettings,
		segment,
		shouldPrefetch,
		theme,
		routeIdYear,
		routeId,
		$_routes,
		$_isSmallScreen,
		$_groups,
		$_topojsonPriorities,
		$_topoCache,
		$_loadingTopojsonKeys,
		$_uriMap,
		$_screenClasses,
		$_style,
		$_viewsClasses,
		$_isTimelineHidden,
		$_timelineWidth,
		$_timelineHeight,
		$_availableYears,
		$_selectedYear,
		$_theme
	});

	$$self.$inject_state = $$props => {
		if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
		if ('flags' in $$props) $$invalidate(19, flags = $$props.flags);
		if ('hrefBase' in $$props) $$invalidate(20, hrefBase = $$props.hrefBase);
		if ('POIs' in $$props) $$invalidate(21, POIs = $$props.POIs);
		if ('regionSettings' in $$props) $$invalidate(22, regionSettings = $$props.regionSettings);
		if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
		if ('shouldPrefetch' in $$props) $$invalidate(2, shouldPrefetch = $$props.shouldPrefetch);
		if ('theme' in $$props) $$invalidate(23, theme = $$props.theme);
		if ('routeIdYear' in $$props) $$invalidate(4, routeIdYear = $$props.routeIdYear);
		if ('routeId' in $$props) $$invalidate(5, routeId = $$props.routeId);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*_groups, $_groups*/ 33554433) {
			_groups && setGroups($_groups);
		}

		if ($$self.$$.dirty[0] & /*flags*/ 524288) {
			flags && _navFlags.set(flags);
		}

		if ($$self.$$.dirty[0] & /*hrefBase*/ 1048576) {
			hrefBase && _hrefBase.set(hrefBase);
		}

		if ($$self.$$.dirty[0] & /*POIs*/ 2097152) {
			POIs && _POIs.set(POIs);
		}

		if ($$self.$$.dirty[0] & /*regionSettings*/ 4194304) {
			regionSettings && _regionSettings.set(regionSettings);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8388608) {
			theme && customizeTheme(theme);
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen, $_routes*/ 16777224) {
			$$invalidate(5, routeId = $_isSmallScreen && $_routes.Id);
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen, $_routes*/ 16777224) {
			$$invalidate(4, routeIdYear = $_isSmallScreen && $_routes.IdYear);
		}
	};

	return [
		_groups,
		segment,
		shouldPrefetch,
		$_isSmallScreen,
		routeIdYear,
		routeId,
		$_topojsonPriorities,
		$_topoCache,
		$_loadingTopojsonKeys,
		$_uriMap,
		$_screenClasses,
		$_style,
		$_viewsClasses,
		$_isTimelineHidden,
		$_timelineWidth,
		$_timelineHeight,
		$_availableYears,
		$_selectedYear,
		$_theme,
		flags,
		hrefBase,
		POIs,
		regionSettings,
		theme,
		$_routes,
		$_groups,
		$$scope,
		slots,
		fetchdriver_outData_binding,
		fetchdriver_outLoadingKeys_binding,
		nav_elementresize_handler,
		div1_elementresize_handler
	];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				_groups: 0,
				flags: 19,
				hrefBase: 20,
				POIs: 21,
				regionSettings: 22,
				segment: 1,
				shouldPrefetch: 2,
				theme: 23
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$1.name
		});
	}

	get _groups() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _groups(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hrefBase() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hrefBase(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get POIs() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set POIs(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get regionSettings() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set regionSettings(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shouldPrefetch() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldPrefetch(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Layout$1 = Layout;

/* src/routes/compounds/time_region_value/_layout.svelte generated by Svelte v3.58.0 */

// (16:0) <Layout  {_groups}  {flags}  {hrefBase}  {regionSettings}  {segment}  {shouldPrefetch} >
function create_default_slot(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(16:0) <Layout  {_groups}  {flags}  {hrefBase}  {regionSettings}  {segment}  {shouldPrefetch} >",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let layout;
	let current;

	layout = new Layout$1({
			props: {
				_groups,
				flags,
				hrefBase,
				regionSettings,
				segment: /*segment*/ ctx[0],
				shouldPrefetch,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t = space();
			create_component(layout.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = head_selector('svelte-d9xgiw', document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(layout.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "@svizzle/time_region_value";
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t, anchor);
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = {};
			if (dirty & /*segment*/ 1) layout_changes.segment = /*segment*/ ctx[0];

			if (dirty & /*$$scope*/ 4) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			destroy_component(layout, detaching);
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

const shouldPrefetch = true; // TODO should take it from a banner

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layout', slots, ['default']);
	let { segment } = $$props;

	$$self.$$.on_mount.push(function () {
		if (segment === undefined && !('segment' in $$props || $$self.$$.bound[$$self.$$.props['segment']])) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	});

	const writable_props = ['segment'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		Layout: Layout$1,
		flags,
		hrefBase,
		regionSettings,
		_groups,
		shouldPrefetch,
		segment
	});

	$$self.$inject_state = $$props => {
		if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [segment, slots, $$scope];
}

class Layout_1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout_1",
			options,
			id: create_fragment.name
		});
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Layout_1 as default };
