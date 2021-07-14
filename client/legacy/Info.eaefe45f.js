import { l as pipe, ai as skipIf, aj as isNil, f as pairs$1, w as mapWith } from './defaultLocale.ed51f02f.js';
import { j as joinWithColon, d as joinWithSemicolon } from './ScreenGauge.8a8b69cb.js';
import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, v as validate_slots, L as svg_element, k as claim_element, l as children, h as detach_dev, n as attr_dev, o as add_location, p as insert_dev, u as noop } from './client.83de09e6.js';

/**
* @module @svizzle/utils/string-[string-string]
*/
/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function} - String -> String
 *
 * @example
> prefixed = makePrefixed('---')
> prefixed('A')
'---A'
> prefixed('B')
'---B'
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePostfixed|makePostfixed}
 */

var makePrefixed = function makePrefixed(prefix) {
  return function (string) {
    return prefix + string;
  };
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pairs(values) {
  var pairof = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pair;
  var pairs = [];
  var previous;
  var first = false;

  var _iterator = _createForOfIteratorHelper(values),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var value = _step.value;
      if (first) pairs.push(pairof(previous, value));
      previous = value;
      first = true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return pairs;
}
function pair(a, b) {
  return [a, b];
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
> makeStyle({color: 'red', 'font-size': '10px'})
'color:red;font-size:10px'
 *
 * @since 0.1.0
 */

var makeStyle = pipe([skipIf(isNil), pairs$1, mapWith(joinWithColon), joinWithSemicolon]);
/**
 * Return a style string with hyphenate CSS variables derived from the keys of the expected object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyleVars({foo: 'red', 'bar': '10px'})
'--foo:red;--bar:10px'
 *
 * @since 0.4.0
 */

var makeStyleVars = pipe([skipIf(isNil), pairs$1, mapWith(pipe([joinWithColon, makePrefixed('--')])), joinWithSemicolon]);
/**
 * Return a px representation of the received number.
 * Throws an error if the input is not a number.
 *
 * @function
 * @arg {number} number
 * @return {string}
 *
 * @example
> toPx(10)
'10px'
 *
 * @since 0.1.0
 */

var toPx = function toPx(number) {
  return "".concat(number, "px");
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/ui/src/icons/feather/Info.svelte";

function create_fragment(ctx) {
  var circle;
  var line0;
  var line1;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      line0 = svg_element("line");
      line1 = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      }, 1);
      children(circle).forEach(detach_dev);
      line0 = claim_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      }, 1);
      children(line0).forEach(detach_dev);
      line1 = claim_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      }, 1);
      children(line1).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file, 1, 0, 34);
      attr_dev(line0, "x1", "12");
      attr_dev(line0, "y1", "16");
      attr_dev(line0, "x2", "12");
      attr_dev(line0, "y2", "12");
      add_location(line0, file, 1, 40, 74);
      attr_dev(line1, "x1", "12");
      attr_dev(line1, "y1", "8");
      attr_dev(line1, "x2", "12.01");
      attr_dev(line1, "y2", "8");
      add_location(line1, file, 1, 85, 119);
    },
    m: function mount(target, anchor) {
      insert_dev(target, circle, anchor);
      insert_dev(target, line0, anchor);
      insert_dev(target, line1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(line0);
      if (detaching) detach_dev(line1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Info", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Info> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var Info = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Info, _SvelteComponentDev);

  var _super = _createSuper(Info);

  function Info(options) {
    var _this;

    _classCallCheck(this, Info);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Info",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Info;
}(SvelteComponentDev);

export { Info as I, makeStyle as a, makeStyleVars as m, pairs as p, toPx as t };
