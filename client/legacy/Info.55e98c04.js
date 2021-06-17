import { p as pipe, af as skipIf, ag as isNil, E as pairs$1, m as mapWith } from './defaultLocale.76beb823.js';
import { j as joinWithColon, d as joinWithSemicolon } from './ScreenGauge.bbe8c4a3.js';
import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, v as validate_slots, g as element, F as svg_element, N as create_component, k as claim_element, l as children, O as claim_component, h as detach_dev, n as attr_dev, o as add_location, p as insert_dev, r as append_dev, P as mount_component, A as _slicedToArray, R as group_outros, D as transition_out, Q as destroy_component, T as check_outros, C as transition_in, u as noop } from './client.6106bd4c.js';

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

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "../../components/ui/src/icons/Icon.svelte";

function create_fragment$1(ctx) {
  var div;
  var svg;
  var switch_instance;
  var current;
  var switch_value =
  /*glyph*/
  ctx[1];

  function switch_props(ctx) {
    return {
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        fill: true,
        stroke: true,
        svgXmlns: true,
        viewBox: true,
        height: true,
        "stroke-linecap": true,
        "stroke-linejoin": true,
        "stroke-width": true,
        width: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "fill",
      /*fill*/
      ctx[0]);
      attr_dev(svg, "stroke",
      /*stroke*/
      ctx[3]);
      attr_dev(svg, "svgxmlns", svgXmlns);
      attr_dev(svg, "viewBox",
      /*viewBox*/
      ctx[5]);
      attr_dev(svg, "height",
      /*size*/
      ctx[2]);
      attr_dev(svg, "stroke-linecap", strokeLinecap);
      attr_dev(svg, "stroke-linejoin", strokeLinejoin);
      attr_dev(svg, "stroke-width",
      /*strokeWidth*/
      ctx[4]);
      attr_dev(svg, "width",
      /*size*/
      ctx[2]);
      attr_dev(svg, "class", "svelte-1ase79a");
      add_location(svg, file$1, 28, 1, 834);
      attr_dev(div, "class", "svelte-1ase79a");
      add_location(div, file$1, 27, 0, 827);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, svg);

      if (switch_instance) {
        mount_component(switch_instance, svg, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (switch_value !== (switch_value =
      /*glyph*/
      ctx[1])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, svg, null);
        } else {
          switch_instance = null;
        }
      }

      if (!current || dirty &
      /*fill*/
      1) {
        attr_dev(svg, "fill",
        /*fill*/
        ctx[0]);
      }

      if (!current || dirty &
      /*stroke*/
      8) {
        attr_dev(svg, "stroke",
        /*stroke*/
        ctx[3]);
      }

      if (!current || dirty &
      /*viewBox*/
      32) {
        attr_dev(svg, "viewBox",
        /*viewBox*/
        ctx[5]);
      }

      if (!current || dirty &
      /*size*/
      4) {
        attr_dev(svg, "height",
        /*size*/
        ctx[2]);
      }

      if (!current || dirty &
      /*strokeWidth*/
      16) {
        attr_dev(svg, "stroke-width",
        /*strokeWidth*/
        ctx[4]);
      }

      if (!current || dirty &
      /*size*/
      4) {
        attr_dev(svg, "width",
        /*size*/
        ctx[2]);
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
      if (detaching) detach_dev(div);
      if (switch_instance) destroy_component(switch_instance);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var defaultGlyph = null;
var strokeLinecap = "round";
var strokeLinejoin = "round";
var svgXmlns = "http://www.w3.org/2000/svg";

function instance$1($$self, $$props, $$invalidate) {
  var viewBox;
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Icon", slots, []);
  var defaultFill = "none";
  var defaultSize = 24;
  var defaultStroke = "currentColor";
  var defaultStrokeWidth = 2;
  var _$$props$fill = $$props.fill,
      fill = _$$props$fill === void 0 ? defaultFill : _$$props$fill;
  var _$$props$glyph = $$props.glyph,
      glyph = _$$props$glyph === void 0 ? defaultGlyph : _$$props$glyph;
  var _$$props$size = $$props.size,
      size = _$$props$size === void 0 ? defaultSize : _$$props$size;
  var _$$props$glyphSize = $$props.glyphSize,
      glyphSize = _$$props$glyphSize === void 0 ? defaultSize : _$$props$glyphSize;
  var _$$props$stroke = $$props.stroke,
      stroke = _$$props$stroke === void 0 ? defaultStroke : _$$props$stroke;
  var _$$props$strokeWidth = $$props.strokeWidth,
      strokeWidth = _$$props$strokeWidth === void 0 ? defaultStrokeWidth : _$$props$strokeWidth;
  var writable_props = ["fill", "glyph", "size", "glyphSize", "stroke", "strokeWidth"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Icon> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("fill" in $$props) $$invalidate(0, fill = $$props.fill);
    if ("glyph" in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ("size" in $$props) $$invalidate(2, size = $$props.size);
    if ("glyphSize" in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
    if ("stroke" in $$props) $$invalidate(3, stroke = $$props.stroke);
    if ("strokeWidth" in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
  };

  $$self.$capture_state = function () {
    return {
      defaultFill: defaultFill,
      defaultSize: defaultSize,
      defaultStroke: defaultStroke,
      defaultStrokeWidth: defaultStrokeWidth,
      defaultGlyph: defaultGlyph,
      strokeLinecap: strokeLinecap,
      strokeLinejoin: strokeLinejoin,
      svgXmlns: svgXmlns,
      fill: fill,
      glyph: glyph,
      size: size,
      glyphSize: glyphSize,
      stroke: stroke,
      strokeWidth: strokeWidth,
      viewBox: viewBox
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("fill" in $$props) $$invalidate(0, fill = $$props.fill);
    if ("glyph" in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ("size" in $$props) $$invalidate(2, size = $$props.size);
    if ("glyphSize" in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
    if ("stroke" in $$props) $$invalidate(3, stroke = $$props.stroke);
    if ("strokeWidth" in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
    if ("viewBox" in $$props) $$invalidate(5, viewBox = $$props.viewBox);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*fill*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, fill = fill || defaultFill);
    }

    if ($$self.$$.dirty &
    /*glyph*/
    2) {
      $$invalidate(1, glyph = glyph || defaultGlyph);
    }

    if ($$self.$$.dirty &
    /*size*/
    4) {
      $$invalidate(2, size = size || defaultSize);
    }

    if ($$self.$$.dirty &
    /*stroke*/
    8) {
      $$invalidate(3, stroke = stroke || defaultStroke);
    }

    if ($$self.$$.dirty &
    /*strokeWidth*/
    16) {
      $$invalidate(4, strokeWidth = strokeWidth || defaultStrokeWidth);
    }

    if ($$self.$$.dirty &
    /*glyphSize*/
    1024) {
      $$invalidate(5, viewBox = "0 0 ".concat(glyphSize, " ").concat(glyphSize));
    }
  };

  return [fill, glyph, size, stroke, strokeWidth, viewBox, defaultFill, defaultSize, defaultStroke, defaultStrokeWidth, glyphSize];
}

var Icon = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Icon, _SvelteComponentDev);

  var _super = _createSuper$1(Icon);

  function Icon(options) {
    var _this;

    _classCallCheck(this, Icon);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      defaultFill: 6,
      defaultSize: 7,
      defaultStroke: 8,
      defaultStrokeWidth: 9,
      fill: 0,
      glyph: 1,
      size: 2,
      glyphSize: 10,
      stroke: 3,
      strokeWidth: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Icon",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(Icon, [{
    key: "defaultFill",
    get: function get() {
      return this.$$.ctx[6];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultSize",
    get: function get() {
      return this.$$.ctx[7];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultStroke",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "defaultStrokeWidth",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fill",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyph",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyphSize",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "stroke",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "strokeWidth",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Icon;
}(SvelteComponentDev);

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

export { Icon as I, Info as a, makeStyle as b, makeStyleVars as m, pairs as p, toPx as t };
