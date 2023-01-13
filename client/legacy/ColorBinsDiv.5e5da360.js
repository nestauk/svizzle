import { c7 as allOf, c8 as isGTE, c9 as isLTE, _ as _inherits, a as _classCallCheck, i as init, s as safe_not_equal, b as _assertThisInitialized, d as dispatch_dev, c as _createClass, S as SvelteComponentDev, e as _getPrototypeOf, f as _possibleConstructorReturn, x as validate_slots, O as svg_element, P as claim_svg_element, n as children, k as detach_dev, p as attr_dev, r as add_location, u as insert_hydration_dev, w as noop, z as create_slot, R as makeStyleVars, h as element, m as claim_element, v as append_hydration_dev, A as _slicedToArray, D as update_slot_base, E as get_all_dirty_from_scope, F as get_slot_changes, B as transition_in, G as transition_out, Q as Icon, T as _defineProperty, I as group_outros, C as check_outros, g as space, l as claim_space, t as text, o as claim_text, af as set_data_dev, J as create_component, K as claim_component, L as mount_component, M as destroy_component, y as validate_each_argument, W as createEventDispatcher, H as destroy_each, N as toggle_class, U as listen_dev, bI as is_function, az as run_all, bG as sort, ca as adapter, cb as map, cc as reduce, cd as isNotNil, am as isIterableNotEmpty, ce as every, cf as hasKey, a7 as pipe, aa as getKey, a2 as mapWith, cg as flatten, as as getPath, ar as collect, ch as findIndexWhere, ci as findLastIndexWhere, cj as slice, bH as uniques, c0 as sortWith, al as filterWith, ck as identity, ax as validate_store, aH as component_subscribe, br as writable, bA as concat, bB as mergeObj, bC as appendTo, bE as last, bF as pullFrom, aE as empty, by as add_render_callback, bz as add_resize_listener, aB as bubble } from './client.a726f8ff.js';
import { d as defaultRel } from './rgb.9472a47b.js';
import { i as inclusiveRange, d as getValues, a as arrayMaxWith, b as arrayMinWith, e as getFirstAndLast, l as linear } from './linear.afac3673.js';

/**
* @module @svizzle/utils/array-[number-boolean]
*/

/**
 * Return a function expecting a number and returning true if the number is within the provided range.
 * Note that the range is inclusive.
 *
 * @function
 * @arg {array} range - Array of two numbers
 * @return {function} predicate - Number -> Boolean
 *
 * @example
> isWithinRange = makeIsWithinRange([0, 5])
> isWithinRange(2)
true
> isWithinRange(5)
true
> isWithinRange(8)
false
 *
 * @since 0.1.0
 */
var makeIsWithinRange = function makeIsWithinRange(range) {
  return allOf([isGTE(range[0]), isLTE(range[1])]);
};

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "../../components/ui/src/icons/feather/CheckSquare.svelte";
function create_fragment$b(ctx) {
  var polyline;
  var path;
  var block = {
    c: function create() {
      polyline = svg_element("polyline");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(polyline, "points", "9 11 12 14 22 4");
      add_location(polyline, file$b, 1, 0, 34);
      attr_dev(path, "d", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11");
      add_location(path, file$b, 1, 46, 80);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, polyline, anchor);
      insert_hydration_dev(target, path, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polyline);
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$b($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('CheckSquare', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<CheckSquare> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var CheckSquare = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(CheckSquare, _SvelteComponentDev);
  var _super = _createSuper$b(CheckSquare);
  function CheckSquare(options) {
    var _this;
    _classCallCheck(this, CheckSquare);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "CheckSquare",
      options: options,
      id: create_fragment$b.name
    });
    return _this;
  }
  return _createClass(CheckSquare);
}(SvelteComponentDev);
var CheckSquare$1 = CheckSquare;

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "../../components/ui/src/icons/feather/ChevronDown.svelte";
function create_fragment$a(ctx) {
  var polyline;
  var block = {
    c: function create() {
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(polyline, "points", "6 9 12 15 18 9");
      add_location(polyline, file$a, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, polyline, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polyline);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$a($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ChevronDown', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ChevronDown> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ChevronDown = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChevronDown, _SvelteComponentDev);
  var _super = _createSuper$a(ChevronDown);
  function ChevronDown(options) {
    var _this;
    _classCallCheck(this, ChevronDown);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChevronDown",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }
  return _createClass(ChevronDown);
}(SvelteComponentDev);
var ChevronDown$1 = ChevronDown;

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "../../components/ui/src/icons/feather/ChevronUp.svelte";
function create_fragment$9(ctx) {
  var polyline;
  var block = {
    c: function create() {
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(polyline, "points", "18 15 12 9 6 15");
      add_location(polyline, file$9, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, polyline, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polyline);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$9($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ChevronUp', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ChevronUp> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var ChevronUp = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChevronUp, _SvelteComponentDev);
  var _super = _createSuper$9(ChevronUp);
  function ChevronUp(options) {
    var _this;
    _classCallCheck(this, ChevronUp);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChevronUp",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }
  return _createClass(ChevronUp);
}(SvelteComponentDev);
var ChevronUp$1 = ChevronUp;

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "../../components/ui/src/icons/feather/Globe.svelte";
function create_fragment$8(ctx) {
  var circle;
  var line;
  var path;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      line = svg_element("line");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file$8, 1, 0, 34);
      attr_dev(line, "x1", "2");
      attr_dev(line, "y1", "12");
      attr_dev(line, "x2", "22");
      attr_dev(line, "y2", "12");
      add_location(line, file$8, 1, 40, 74);
      attr_dev(path, "d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z");
      add_location(path, file$8, 1, 84, 118);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, line, anchor);
      insert_hydration_dev(target, path, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(line);
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$8($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Globe', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Globe> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var Globe = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Globe, _SvelteComponentDev);
  var _super = _createSuper$8(Globe);
  function Globe(options) {
    var _this;
    _classCallCheck(this, Globe);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Globe",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }
  return _createClass(Globe);
}(SvelteComponentDev);
var Globe$1 = Globe;

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "../../components/ui/src/icons/feather/MinusSquare.svelte";
function create_fragment$7(ctx) {
  var rect;
  var line;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        rx: true,
        ry: true
      });
      children(rect).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "x", "3");
      attr_dev(rect, "y", "3");
      attr_dev(rect, "width", "18");
      attr_dev(rect, "height", "18");
      attr_dev(rect, "rx", "2");
      attr_dev(rect, "ry", "2");
      add_location(rect, file$7, 1, 0, 34);
      attr_dev(line, "x1", "8");
      attr_dev(line, "y1", "12");
      attr_dev(line, "x2", "16");
      attr_dev(line, "y2", "12");
      add_location(line, file$7, 1, 62, 96);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
      insert_hydration_dev(target, line, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$7($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('MinusSquare', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<MinusSquare> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var MinusSquare = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(MinusSquare, _SvelteComponentDev);
  var _super = _createSuper$7(MinusSquare);
  function MinusSquare(options) {
    var _this;
    _classCallCheck(this, MinusSquare);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "MinusSquare",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }
  return _createClass(MinusSquare);
}(SvelteComponentDev);
var MinusSquare$1 = MinusSquare;

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "../../components/ui/src/icons/feather/Square.svelte";
function create_fragment$6(ctx) {
  var rect;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        rx: true,
        ry: true
      });
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "x", "3");
      attr_dev(rect, "y", "3");
      attr_dev(rect, "width", "18");
      attr_dev(rect, "height", "18");
      attr_dev(rect, "rx", "2");
      attr_dev(rect, "ry", "2");
      add_location(rect, file$6, 1, 0, 34);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$6($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Square', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Square> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var Square = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Square, _SvelteComponentDev);
  var _super = _createSuper$6(Square);
  function Square(options) {
    var _this;
    _classCallCheck(this, Square);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Square",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }
  return _createClass(Square);
}(SvelteComponentDev);
var Square$1 = Square;

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "../../components/ui/src/CenteredView.svelte";
function create_fragment$5(ctx) {
  var div1;
  var div0;
  var current;
  var default_slot_template = /*#slots*/ctx[9].default;
  var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[8], null);
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        style: true,
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true,
        style: true
      });
      var div0_nodes = children(div0);
      if (default_slot) default_slot.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "center svelte-62af2i");
      attr_dev(div0, "style", /*centerStyle*/ctx[0]);
      add_location(div0, file$5, 24, 1, 554);
      attr_dev(div1, "style", /*style*/ctx[1]);
      attr_dev(div1, "class", "CenteredView svelte-62af2i");
      add_location(div1, file$5, 20, 0, 515);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      append_hydration_dev(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/256)) {
          update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[8], !current ? get_all_dirty_from_scope( /*$$scope*/ctx[8]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[8], dirty, null), null);
        }
      }
      if (!current || dirty & /*centerStyle*/1) {
        attr_dev(div0, "style", /*centerStyle*/ctx[0]);
      }
      if (!current || dirty & /*style*/2) {
        attr_dev(div1, "style", /*style*/ctx[1]);
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
      if (detaching) detach_dev(div1);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$5($$self, $$props, $$invalidate) {
  var style;
  var centerStyle;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
    $$scope = $$props.$$scope;
  validate_slots('CenteredView', slots, ['default']);
  var alignHorizontally = $$props.alignHorizontally;
  var _$$props$backgroundCo = $$props.backgroundColor,
    backgroundColor = _$$props$backgroundCo === void 0 ? null : _$$props$backgroundCo;
  var _$$props$color = $$props.color,
    color = _$$props$color === void 0 ? null : _$$props$color;
  var _$$props$fontSize = $$props.fontSize,
    fontSize = _$$props$fontSize === void 0 ? null : _$$props$fontSize;
  var _$$props$padding = $$props.padding,
    padding = _$$props$padding === void 0 ? null : _$$props$padding;
  var _$$props$textAlign = $$props.textAlign,
    textAlign = _$$props$textAlign === void 0 ? null : _$$props$textAlign;
  $$self.$$.on_mount.push(function () {
    if (alignHorizontally === undefined && !('alignHorizontally' in $$props || $$self.$$.bound[$$self.$$.props['alignHorizontally']])) {
      console.warn("<CenteredView> was created without expected prop 'alignHorizontally'");
    }
  });
  var writable_props = ['alignHorizontally', 'backgroundColor', 'color', 'fontSize', 'padding', 'textAlign'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<CenteredView> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('alignHorizontally' in $$props) $$invalidate(2, alignHorizontally = $$props.alignHorizontally);
    if ('backgroundColor' in $$props) $$invalidate(3, backgroundColor = $$props.backgroundColor);
    if ('color' in $$props) $$invalidate(4, color = $$props.color);
    if ('fontSize' in $$props) $$invalidate(5, fontSize = $$props.fontSize);
    if ('padding' in $$props) $$invalidate(6, padding = $$props.padding);
    if ('textAlign' in $$props) $$invalidate(7, textAlign = $$props.textAlign);
    if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      alignHorizontally: alignHorizontally,
      backgroundColor: backgroundColor,
      color: color,
      fontSize: fontSize,
      padding: padding,
      textAlign: textAlign,
      centerStyle: centerStyle,
      style: style
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('alignHorizontally' in $$props) $$invalidate(2, alignHorizontally = $$props.alignHorizontally);
    if ('backgroundColor' in $$props) $$invalidate(3, backgroundColor = $$props.backgroundColor);
    if ('color' in $$props) $$invalidate(4, color = $$props.color);
    if ('fontSize' in $$props) $$invalidate(5, fontSize = $$props.fontSize);
    if ('padding' in $$props) $$invalidate(6, padding = $$props.padding);
    if ('textAlign' in $$props) $$invalidate(7, textAlign = $$props.textAlign);
    if ('centerStyle' in $$props) $$invalidate(0, centerStyle = $$props.centerStyle);
    if ('style' in $$props) $$invalidate(1, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*backgroundColor, color, fontSize, padding, textAlign*/248) {
      $$invalidate(1, style = makeStyleVars({
        backgroundColor: backgroundColor || 'white',
        color: color || 'black',
        fontSize: fontSize || '14px',
        padding: padding || '0',
        textAlign: textAlign || 'start'
      }));
    }
    if ($$self.$$.dirty & /*alignHorizontally*/4) {
      $$invalidate(0, centerStyle = alignHorizontally ? 'flex-direction: row' : null);
    }
  };
  return [centerStyle, style, alignHorizontally, backgroundColor, color, fontSize, padding, textAlign, $$scope, slots];
}
var CenteredView = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(CenteredView, _SvelteComponentDev);
  var _super = _createSuper$5(CenteredView);
  function CenteredView(options) {
    var _this;
    _classCallCheck(this, CenteredView);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      alignHorizontally: 2,
      backgroundColor: 3,
      color: 4,
      fontSize: 5,
      padding: 6,
      textAlign: 7
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "CenteredView",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }
  _createClass(CenteredView, [{
    key: "alignHorizontally",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fontSize",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "textAlign",
    get: function get() {
      throw new Error("<CenteredView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<CenteredView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return CenteredView;
}(SvelteComponentDev);
var CenteredView$1 = CenteredView;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$4 = "../../components/ui/src/LinkButton.svelte";

// (79:1) {:else}
function create_else_block$1(ctx) {
  var div;
  var if_block = /*text*/ctx[6] && create_if_block_3$1(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block) if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "svelte-h3r6cx");
      add_location(div, file$4, 79, 2, 1732);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
    },
    p: function update(ctx, dirty) {
      if ( /*text*/ctx[6]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_3$1(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(79:1) {:else}",
    ctx: ctx
  });
  return block;
}

// (53:1) {#if href}
function create_if_block$2(ctx) {
  var a;
  var div;
  var t;
  var a_download_value;
  var current;
  var if_block0 = /*text*/ctx[6] && create_if_block_2$1(ctx);
  var if_block1 = /*glyph*/ctx[9] && create_if_block_1$2(ctx);
  var block = {
    c: function create() {
      a = element("a");
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        download: true,
        href: true,
        hreflang: true,
        rel: true,
        target: true,
        type: true,
        class: true
      });
      var a_nodes = children(a);
      div = claim_element(a_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "clickable svelte-h3r6cx");
      add_location(div, file$4, 61, 3, 1415);
      attr_dev(a, "download", a_download_value = /*download*/ctx[0] ? '' : null);
      attr_dev(a, "href", /*href*/ctx[1]);
      attr_dev(a, "hreflang", /*hreflang*/ctx[2]);
      attr_dev(a, "rel", /*rel*/ctx[4]);
      attr_dev(a, "target", /*target*/ctx[5]);
      attr_dev(a, "type", /*type*/ctx[8]);
      attr_dev(a, "class", "svelte-h3r6cx");
      add_location(a, file$4, 53, 2, 1315);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, a, anchor);
      append_hydration_dev(a, div);
      if (if_block0) if_block0.m(div, null);
      append_hydration_dev(div, t);
      if (if_block1) if_block1.m(div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ( /*text*/ctx[6]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ( /*glyph*/ctx[9]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*glyph*/512) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*download*/1 && a_download_value !== (a_download_value = /*download*/ctx[0] ? '' : null)) {
        attr_dev(a, "download", a_download_value);
      }
      if (!current || dirty & /*href*/2) {
        attr_dev(a, "href", /*href*/ctx[1]);
      }
      if (!current || dirty & /*hreflang*/4) {
        attr_dev(a, "hreflang", /*hreflang*/ctx[2]);
      }
      if (!current || dirty & /*rel*/16) {
        attr_dev(a, "rel", /*rel*/ctx[4]);
      }
      if (!current || dirty & /*target*/32) {
        attr_dev(a, "target", /*target*/ctx[5]);
      }
      if (!current || dirty & /*type*/256) {
        attr_dev(a, "type", /*type*/ctx[8]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(53:1) {#if href}",
    ctx: ctx
  });
  return block;
}

// (81:3) {#if text}
function create_if_block_3$1(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(missingHrefText);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, missingHrefText);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-h3r6cx");
      add_location(span, file$4, 81, 4, 1756);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(81:3) {#if text}",
    ctx: ctx
  });
  return block;
}

// (63:4) {#if text}
function create_if_block_2$1(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text( /*text*/ctx[6]);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, /*text*/ctx[6]);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-h3r6cx");
      add_location(span, file$4, 63, 5, 1459);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*text*/64) set_data_dev(t, /*text*/ctx[6]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(63:4) {#if text}",
    ctx: ctx
  });
  return block;
}

// (66:4) {#if glyph}
function create_if_block_1$2(ctx) {
  var span;
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: /*glyph*/ctx[9],
      fill: /*theme*/ctx[7].iconFill,
      size: /*iconSize*/ctx[3],
      stroke: /*theme*/ctx[7].iconStroke,
      strokeWidth: /*theme*/ctx[7].iconStrokeWidth
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      span = element("span");
      create_component(icon.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      claim_component(icon.$$.fragment, span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-h3r6cx");
      add_location(span, file$4, 66, 5, 1510);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      mount_component(icon, span, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty & /*glyph*/512) icon_changes.glyph = /*glyph*/ctx[9];
      if (dirty & /*theme*/128) icon_changes.fill = /*theme*/ctx[7].iconFill;
      if (dirty & /*iconSize*/8) icon_changes.size = /*iconSize*/ctx[3];
      if (dirty & /*theme*/128) icon_changes.stroke = /*theme*/ctx[7].iconStroke;
      if (dirty & /*theme*/128) icon_changes.strokeWidth = /*theme*/ctx[7].iconStrokeWidth;
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
      if (detaching) detach_dev(span);
      destroy_component(icon);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(66:4) {#if glyph}",
    ctx: ctx
  });
  return block;
}
function create_fragment$4(ctx) {
  var div;
  var current_block_type_index;
  var if_block;
  var current;
  var if_block_creators = [create_if_block$2, create_else_block$1];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*href*/ctx[1]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        class: true
      });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "style", /*style*/ctx[10]);
      attr_dev(div, "class", "linkButton svelte-h3r6cx");
      add_location(div, file$4, 48, 0, 1265);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
      if (!current || dirty & /*style*/1024) {
        attr_dev(div, "style", /*style*/ctx[10]);
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
      if (detaching) detach_dev(div);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
var defaultText = 'Please provide `text`';
var missingHrefText = 'Please provide `href`';
function instance$4($$self, $$props, $$invalidate) {
  var style;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('LinkButton', slots, []);
  var defaultFill = Icon.defaultFill,
    defaultSize = Icon.defaultSize,
    defaultStroke = Icon.defaultStroke,
    defaultStrokeWidth = Icon.defaultStrokeWidth;
  var defaultTheme = {
    backgroundColor: 'black',
    boxShadowColor: 'lightgrey',
    boxShadowVec: '2px 8px 9px -4px',
    iconFill: defaultFill,
    iconStroke: defaultStroke,
    iconStrokeWidth: defaultStrokeWidth,
    textColor: 'white'
  };
  var _$$props$download = $$props.download,
    download = _$$props$download === void 0 ? null : _$$props$download;
  var _$$props$glyph = $$props.glyph,
    glyph = _$$props$glyph === void 0 ? null : _$$props$glyph;
  var _$$props$href = $$props.href,
    href = _$$props$href === void 0 ? null : _$$props$href;
  var _$$props$hreflang = $$props.hreflang,
    hreflang = _$$props$hreflang === void 0 ? null : _$$props$hreflang;
  var _$$props$iconSize = $$props.iconSize,
    iconSize = _$$props$iconSize === void 0 ? defaultSize : _$$props$iconSize;
  var _$$props$rel = $$props.rel,
    rel = _$$props$rel === void 0 ? defaultRel : _$$props$rel;
  var _$$props$target = $$props.target,
    target = _$$props$target === void 0 ? null : _$$props$target;
  var _$$props$text = $$props.text,
    text = _$$props$text === void 0 ? defaultText : _$$props$text;
  var _$$props$theme = $$props.theme,
    theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$type = $$props.type,
    type = _$$props$type === void 0 ? null : _$$props$type;
  var writable_props = ['download', 'glyph', 'href', 'hreflang', 'iconSize', 'rel', 'target', 'text', 'theme', 'type'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<LinkButton> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('download' in $$props) $$invalidate(0, download = $$props.download);
    if ('glyph' in $$props) $$invalidate(9, glyph = $$props.glyph);
    if ('href' in $$props) $$invalidate(1, href = $$props.href);
    if ('hreflang' in $$props) $$invalidate(2, hreflang = $$props.hreflang);
    if ('iconSize' in $$props) $$invalidate(3, iconSize = $$props.iconSize);
    if ('rel' in $$props) $$invalidate(4, rel = $$props.rel);
    if ('target' in $$props) $$invalidate(5, target = $$props.target);
    if ('text' in $$props) $$invalidate(6, text = $$props.text);
    if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
    if ('type' in $$props) $$invalidate(8, type = $$props.type);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      Icon: Icon,
      defaultRel: defaultRel,
      defaultFill: defaultFill,
      defaultSize: defaultSize,
      defaultStroke: defaultStroke,
      defaultStrokeWidth: defaultStrokeWidth,
      defaultText: defaultText,
      defaultTheme: defaultTheme,
      missingHrefText: missingHrefText,
      download: download,
      glyph: glyph,
      href: href,
      hreflang: hreflang,
      iconSize: iconSize,
      rel: rel,
      target: target,
      text: text,
      theme: theme,
      type: type,
      style: style
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('download' in $$props) $$invalidate(0, download = $$props.download);
    if ('glyph' in $$props) $$invalidate(9, glyph = $$props.glyph);
    if ('href' in $$props) $$invalidate(1, href = $$props.href);
    if ('hreflang' in $$props) $$invalidate(2, hreflang = $$props.hreflang);
    if ('iconSize' in $$props) $$invalidate(3, iconSize = $$props.iconSize);
    if ('rel' in $$props) $$invalidate(4, rel = $$props.rel);
    if ('target' in $$props) $$invalidate(5, target = $$props.target);
    if ('text' in $$props) $$invalidate(6, text = $$props.text);
    if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
    if ('type' in $$props) $$invalidate(8, type = $$props.type);
    if ('style' in $$props) $$invalidate(10, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*rel*/16) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(4, rel = rel || defaultRel);
    }
    if ($$self.$$.dirty & /*download*/1) {
      $$invalidate(0, download = download || null);
    }
    if ($$self.$$.dirty & /*href*/2) {
      $$invalidate(1, href = href || null);
    }
    if ($$self.$$.dirty & /*hreflang*/4) {
      $$invalidate(2, hreflang = hreflang || null);
    }
    if ($$self.$$.dirty & /*iconSize*/8) {
      $$invalidate(3, iconSize = iconSize || defaultSize);
    }
    if ($$self.$$.dirty & /*theme*/128) {
      $$invalidate(7, theme = theme ? _objectSpread$2(_objectSpread$2({}, defaultTheme), theme) : defaultTheme);
    }
    if ($$self.$$.dirty & /*theme*/128) {
      $$invalidate(10, style = makeStyleVars(theme));
    }
    if ($$self.$$.dirty & /*target*/32) {
      $$invalidate(5, target = target || null);
    }
    if ($$self.$$.dirty & /*text*/64) {
      $$invalidate(6, text = text || defaultText);
    }
    if ($$self.$$.dirty & /*type*/256) {
      $$invalidate(8, type = type || null);
    }
  };
  return [download, href, hreflang, iconSize, rel, target, text, theme, type, glyph, style];
}
var LinkButton = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LinkButton, _SvelteComponentDev);
  var _super = _createSuper$4(LinkButton);
  function LinkButton(options) {
    var _this;
    _classCallCheck(this, LinkButton);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      download: 0,
      glyph: 9,
      href: 1,
      hreflang: 2,
      iconSize: 3,
      rel: 4,
      target: 5,
      text: 6,
      theme: 7,
      type: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LinkButton",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }
  _createClass(LinkButton, [{
    key: "download",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyph",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hreflang",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconSize",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "rel",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "target",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "text",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "type",
    get: function get() {
      throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return LinkButton;
}(SvelteComponentDev);
var LinkButton$1 = LinkButton;

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "../../components/ui/src/MessageView.svelte";

// (15:0) <CenteredView  {backgroundColor}  {color}  {fontSize}  {padding}  {textAlign} >
function create_default_slot(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text( /*text*/ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, /*text*/ctx[0]);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$3, 21, 1, 432);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*text*/1) set_data_dev(t, /*text*/ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(15:0) <CenteredView  {backgroundColor}  {color}  {fontSize}  {padding}  {textAlign} >",
    ctx: ctx
  });
  return block;
}
function create_fragment$3(ctx) {
  var centeredview;
  var current;
  centeredview = new CenteredView$1({
    props: {
      backgroundColor: /*backgroundColor*/ctx[1],
      color: /*color*/ctx[2],
      fontSize: /*fontSize*/ctx[3],
      padding: /*padding*/ctx[4],
      textAlign: /*textAlign*/ctx[5],
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(centeredview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(centeredview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(centeredview, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var centeredview_changes = {};
      if (dirty & /*backgroundColor*/2) centeredview_changes.backgroundColor = /*backgroundColor*/ctx[1];
      if (dirty & /*color*/4) centeredview_changes.color = /*color*/ctx[2];
      if (dirty & /*fontSize*/8) centeredview_changes.fontSize = /*fontSize*/ctx[3];
      if (dirty & /*padding*/16) centeredview_changes.padding = /*padding*/ctx[4];
      if (dirty & /*textAlign*/32) centeredview_changes.textAlign = /*textAlign*/ctx[5];
      if (dirty & /*$$scope, text*/65) {
        centeredview_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }
      centeredview.$set(centeredview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(centeredview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(centeredview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(centeredview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$3($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('MessageView', slots, []);
  var _$$props$backgroundCo = $$props.backgroundColor,
    backgroundColor = _$$props$backgroundCo === void 0 ? null : _$$props$backgroundCo;
  var _$$props$color = $$props.color,
    color = _$$props$color === void 0 ? null : _$$props$color;
  var _$$props$fontSize = $$props.fontSize,
    fontSize = _$$props$fontSize === void 0 ? null : _$$props$fontSize;
  var _$$props$padding = $$props.padding,
    padding = _$$props$padding === void 0 ? null : _$$props$padding;
  var _$$props$text = $$props.text,
    text = _$$props$text === void 0 ? null : _$$props$text;
  var _$$props$textAlign = $$props.textAlign,
    textAlign = _$$props$textAlign === void 0 ? null : _$$props$textAlign;
  var writable_props = ['backgroundColor', 'color', 'fontSize', 'padding', 'text', 'textAlign'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<MessageView> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('backgroundColor' in $$props) $$invalidate(1, backgroundColor = $$props.backgroundColor);
    if ('color' in $$props) $$invalidate(2, color = $$props.color);
    if ('fontSize' in $$props) $$invalidate(3, fontSize = $$props.fontSize);
    if ('padding' in $$props) $$invalidate(4, padding = $$props.padding);
    if ('text' in $$props) $$invalidate(0, text = $$props.text);
    if ('textAlign' in $$props) $$invalidate(5, textAlign = $$props.textAlign);
  };
  $$self.$capture_state = function () {
    return {
      CenteredView: CenteredView$1,
      backgroundColor: backgroundColor,
      color: color,
      fontSize: fontSize,
      padding: padding,
      text: text,
      textAlign: textAlign
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('backgroundColor' in $$props) $$invalidate(1, backgroundColor = $$props.backgroundColor);
    if ('color' in $$props) $$invalidate(2, color = $$props.color);
    if ('fontSize' in $$props) $$invalidate(3, fontSize = $$props.fontSize);
    if ('padding' in $$props) $$invalidate(4, padding = $$props.padding);
    if ('text' in $$props) $$invalidate(0, text = $$props.text);
    if ('textAlign' in $$props) $$invalidate(5, textAlign = $$props.textAlign);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*text*/1) {
      var _text;
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, text = (_text = text) !== null && _text !== void 0 ? _text : 'Please provide a message');
    }
  };
  return [text, backgroundColor, color, fontSize, padding, textAlign];
}
var MessageView = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(MessageView, _SvelteComponentDev);
  var _super = _createSuper$3(MessageView);
  function MessageView(options) {
    var _this;
    _classCallCheck(this, MessageView);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      backgroundColor: 1,
      color: 2,
      fontSize: 3,
      padding: 4,
      text: 0,
      textAlign: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "MessageView",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }
  _createClass(MessageView, [{
    key: "backgroundColor",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fontSize",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "text",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "textAlign",
    get: function get() {
      throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return MessageView;
}(SvelteComponentDev);
var MessageView$1 = MessageView;

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$2 = "../../components/ui/src/XorSelector.svelte";
function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}

// (48:1) {#each values as val}
function create_each_block$1(ctx) {
  var span;
  var t0_value = /*val*/ctx[12] + "";
  var t0;
  var t1;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      t1 = claim_space(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-xgtjis");
      toggle_class(span, "selected", /*currentValue*/ctx[1] === /*val*/ctx[12]);
      add_location(span, file$2, 48, 2, 1075);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t0);
      append_hydration_dev(span, t1);
      if (!mounted) {
        dispose = [listen_dev(span, "click", function () {
          if (is_function( /*onClick*/ctx[3]( /*val*/ctx[12]))) /*onClick*/ctx[3]( /*val*/ctx[12]).apply(this, arguments);
        }, false, false, false), listen_dev(span, "keydown", function () {
          if (is_function( /*onKeyDown*/ctx[4]( /*val*/ctx[12]))) /*onKeyDown*/ctx[4]( /*val*/ctx[12]).apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*values*/1 && t0_value !== (t0_value = /*val*/ctx[12] + "")) set_data_dev(t0, t0_value);
      if (dirty & /*currentValue, values*/3) {
        toggle_class(span, "selected", /*currentValue*/ctx[1] === /*val*/ctx[12]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(48:1) {#each values as val}",
    ctx: ctx
  });
  return block;
}
function create_fragment$2(ctx) {
  var div;
  var each_value = /*values*/ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      div = element("div");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        class: true
      });
      var div_nodes = children(div);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "style", /*style*/ctx[2]);
      attr_dev(div, "class", "XorSelector svelte-xgtjis");
      add_location(div, file$2, 43, 0, 1013);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (dirty & /*currentValue, values, onClick, onKeyDown*/27) {
        each_value = /*values*/ctx[0];
        validate_each_argument(each_value);
        var _i4;
        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(div, null);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*style*/4) {
        attr_dev(div, "style", /*style*/ctx[2]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$2($$self, $$props, $$invalidate) {
  var currentValue;
  var borderRadiusLeft;
  var borderRadiusRight;
  var style;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('XorSelector', slots, []);
  var dispatch = createEventDispatcher();
  var defaultTheme = {
    borderColor: 'black',
    borderRadius: 0,
    borderWidth: '1px',
    selectedColor: 'black',
    selectedTextColor: 'white',
    textColor: 'black'
  };
  var _$$props$theme = $$props.theme,
    theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$value = $$props.value,
    value = _$$props$value === void 0 ? null : _$$props$value;
  var _$$props$values = $$props.values,
    values = _$$props$values === void 0 ? [] : _$$props$values;
  var updateValue = function updateValue(val) {
    $$invalidate(1, currentValue = val);
    dispatch('changed', val);
  };
  var onClick = function onClick(val) {
    return function () {
      return updateValue(val);
    };
  };
  var onKeyDown = function onKeyDown(val) {
    return function (event) {
      if (['Enter', ' '].includes(event.key)) {
        event.preventDefault();
        updateValue(val);
      }
    };
  };
  var writable_props = ['theme', 'value', 'values'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<XorSelector> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('value' in $$props) $$invalidate(6, value = $$props.value);
    if ('values' in $$props) $$invalidate(0, values = $$props.values);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      createEventDispatcher: createEventDispatcher,
      dispatch: dispatch,
      defaultTheme: defaultTheme,
      theme: theme,
      value: value,
      values: values,
      updateValue: updateValue,
      onClick: onClick,
      onKeyDown: onKeyDown,
      currentValue: currentValue,
      borderRadiusRight: borderRadiusRight,
      borderRadiusLeft: borderRadiusLeft,
      style: style
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('value' in $$props) $$invalidate(6, value = $$props.value);
    if ('values' in $$props) $$invalidate(0, values = $$props.values);
    if ('currentValue' in $$props) $$invalidate(1, currentValue = $$props.currentValue);
    if ('borderRadiusRight' in $$props) $$invalidate(7, borderRadiusRight = $$props.borderRadiusRight);
    if ('borderRadiusLeft' in $$props) $$invalidate(8, borderRadiusLeft = $$props.borderRadiusLeft);
    if ('style' in $$props) $$invalidate(2, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value, values*/65) {
      var _value;
      $$invalidate(1, currentValue = (_value = value) !== null && _value !== void 0 ? _value : values[0]);
    }
    if ($$self.$$.dirty & /*theme*/32) {
      $$invalidate(5, theme = theme ? _objectSpread$1(_objectSpread$1({}, defaultTheme), theme) : defaultTheme);
    }
    if ($$self.$$.dirty & /*theme*/32) {
      $$invalidate(8, borderRadiusLeft = "".concat(theme.borderRadius, " 0 0 ").concat(theme.borderRadius));
    }
    if ($$self.$$.dirty & /*theme*/32) {
      $$invalidate(7, borderRadiusRight = "0 ".concat(theme.borderRadius, " ").concat(theme.borderRadius, " 0"));
    }
    if ($$self.$$.dirty & /*theme, borderRadiusLeft, borderRadiusRight*/416) {
      $$invalidate(2, style = makeStyleVars(_objectSpread$1(_objectSpread$1({}, theme), {}, {
        borderRadiusLeft: borderRadiusLeft,
        borderRadiusRight: borderRadiusRight
      })));
    }
  };
  return [values, currentValue, style, onClick, onKeyDown, theme, value, borderRadiusRight, borderRadiusLeft];
}
var XorSelector = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(XorSelector, _SvelteComponentDev);
  var _super = _createSuper$2(XorSelector);
  function XorSelector(options) {
    var _this;
    _classCallCheck(this, XorSelector);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      theme: 5,
      value: 6,
      values: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "XorSelector",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }
  _createClass(XorSelector, [{
    key: "theme",
    get: function get() {
      throw new Error("<XorSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<XorSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<XorSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<XorSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "values",
    get: function get() {
      throw new Error("<XorSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<XorSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return XorSelector;
}(SvelteComponentDev);
var XorSelector$1 = XorSelector;

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function extent(values, valueof) {
  var min;
  var max;
  if (valueof === undefined) {
    var _iterator = _createForOfIteratorHelper$1(values),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;
        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var index = -1;
    var _iterator2 = _createForOfIteratorHelper$1(values),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;
        if ((_value = valueof(_value, ++index, values)) != null) {
          if (min === undefined) {
            if (_value >= _value) min = max = _value;
          } else {
            if (min > _value) min = _value;
            if (max < _value) max = _value;
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return [min, max];
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

/**
* @module @svizzle/geometry/2DVector
*/

/**
 * Calculates the length of a vector
 *
 * @function
 * @arg {object} point - A point representing a vector starting in the origin
 * @return {number} - The vector length
 *
 * @example
> vectorLength2D(1, 1)
1.4142135623730951
> vectorLength2D(0, 0)
0
 *
 * @since 0.1.0
 */
var vectorLength2D = function vectorLength2D(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
};

/* binning */

/**
 * A binning function that returns an exact amount of bins.
 *
 * @function
 * @arg {array} items - items to be binned
 * @arg {number} amount - desired amount of bins
 * @arg {function} [accessor=_.identity] - item accessor
 * @arg {(number[]|null)} [maxExtent=null] - the desired output extent
 * @return {array} bins - {range, values}[]
 *
 * @example
> const items = [1, 2, 6, 7, 8, 14, 20];
> exactAmountBins({array: items, amount: 3});
[
	{range: [1, 8], values: [1, 2, 6, 7, 8]},
	{range: [8, 15], values: [14]},
	{range: [15, 22], values: [20]}
]
> exactAmountBins({
	array,
	amount: 3,
	maxExtent: [2, 15]
})
[
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
]
> const items = [{a: 1}, {a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}, {a: 20}];
> exactAmountBins({
	array,
	amount: 3,
	accessor: _.getKey('a'),
	maxExtent: [2, 14]
});
[
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
]
 *
 * @since 0.1.0
 */
var exactAmountBins = function exactAmountBins(_ref) {
  var array = _ref.array,
    amount = _ref.amount,
    _ref$accessor = _ref.accessor,
    accessor = _ref$accessor === void 0 ? identity : _ref$accessor,
    _ref$maxExtent = _ref.maxExtent,
    maxExtent = _ref$maxExtent === void 0 ? null : _ref$maxExtent;
  var activeRange = maxExtent ? sort(maxExtent) : extent(array, accessor);
  var _activeRange = _slicedToArray(activeRange, 2),
    min = _activeRange[0],
    max = _activeRange[1];
  if (min === max) {
    return [{
      values: array
    }];
  }
  var integerMin = Math.floor(min);
  var step = Math.ceil((max - integerMin) / amount);
  var integerMax = integerMin + step * amount;
  var ranges = pairs(inclusiveRange([integerMin, integerMax, step]));

  // TODO svizzle/utils
  var findRangeIndex = adapter(map(ranges, function (range, index) {
    var predicate = pipe([accessor, allOf([makeIsWithinRange(activeRange), makeIsWithinRange(range)])]);
    return function (value) {
      return predicate(value) ? index : undefined;
    };
  }));
  return reduce(array, function (acc, item) {
    var index = findRangeIndex(item);
    isNotNil(index) && acc[index].values.push(item);
    return acc;
  }, map(ranges, function (range) {
    return {
      range: range,
      values: []
    };
  }));
};

/* bins getters and functions */

/**
 * Returns true if bins are valid, meaning:
 * - there is at least one bin object
 * - they all have a `range` key
 * - `range` is not `null` or `undefined`
 *
 * @function
 * @arg {array} bins
 * @return {array} bins - {range, values}[]
 *
 * @example
> areValidBins([])
false

> areValidBins([
	{values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false

> areValidBins([
	{range: null, values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false

> areValidBins([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
true
 *
 * @since 0.1.0
 */
var areValidBins = allOf([isIterableNotEmpty, every(allOf([hasKey('range'), pipe([getKey('range'), isNotNil])]))]);

/**
 * Return all the values in the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {any[]} values
 *
 * @example
> getBinsItems([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
[{a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}]
 *
 * @since 0.1.0
 */
var getBinsItems = pipe([mapWith(getValues), flatten]);
var getValuesLength = getPath('values.length');

/**
 * Return the length of the longest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} max - length of the longest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
3
 *
 * @since 0.1.0
 */
var getBinsMax = arrayMaxWith(getValuesLength);

/**
 * Return the length of the shortest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} min - length of the shortest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
1
 *
 * @since 0.1.0
 */
var getBinsMin = arrayMinWith(getValuesLength);

/**
 * Return the extent of the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {array} extent
 *
 * @example
> getBinsExtent([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
[1, 3]
 *
 * @since 0.1.0
 */
var getBinsExtent = collect([getBinsMin, getBinsMax]);

/**
 * Return `true` if the `values` property of the provided bin is not empty
 *
 * @function
 * @arg {object} bin - {range, values}
 * @return {boolean}
 *
 * @example
> isNonEmptyBin({range: [-8, -3], values: []})
false
> isNonEmptyBin({range: [2, 7], values: [2, 6, 7]})
true
 *
 * @since 0.1.0
 */
var isNonEmptyBin = pipe([getValues, isIterableNotEmpty]);

/**
 * Return the index of the first bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findFirstNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
2
 *
 * @since 0.1.0
 */
var findFirstNonEmptyBinIndex = findIndexWhere(isNonEmptyBin);

/**
 * Return the index of the last bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findLastNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
4
 *
 * @since 0.1.0
 */
var findLastNonEmptyBinIndex = findLastIndexWhere(isNonEmptyBin);

/**
 * Return an object containing:
 * - a copy of the provided bins without the trailing bins with no values
 * - `start` and `end` of the trim
 *
 * @function
 * @arg {array} bins
 * @return {object} object - {bins, end, start}
 *
 * @example
> getTrimmedBinsStats([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 4,
	start: 2
}
> getTrimmedBinsStats([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 2,
	start: 0
}
 *
 * @since 0.1.0
 */
var getTrimmedBinsStats = function getTrimmedBinsStats(bins) {
  var start = findFirstNonEmptyBinIndex(bins);
  var end = findLastNonEmptyBinIndex(bins);
  return {
    bins: slice(bins, start, end + 1),
    end: end,
    start: start
  };
};

/* ticks */

/**
 * Return the ticks for the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[-8, -3, 2, 7, 12, 17, 22, 27, 32]
 *
 * @since 0.1.0
 */
var getBinsTicks = pipe([mapWith(getKey('range')), flatten, uniques, sortWith([])]);

/**
 * Return the extent of all ticks for the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks extent
 *
 * @example
> getBinsTicksExtent([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[-8, 32]
 *
 * @since 0.4.0
 */
var getBinsTicksExtent = pipe([getBinsTicks, getFirstAndLast]);

/**
 * Return the ticks for the provided bins using the non-empty ones
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getNonEmptyBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[2, 7, 17, 22, 27]
 *
 * @since 0.1.0
 */
var getNonEmptyBinsTicks = pipe([filterWith(getValuesLength), getBinsTicks]);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$1 = "../../components/legend/src/ColorBinsG.svelte";
function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[50] = list[i].label;
  child_ctx[51] = list[i].x;
  child_ctx[52] = list[i].y;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[55] = list[i].barWidth;
  child_ctx[56] = list[i].barHeight;
  child_ctx[57] = list[i].fill;
  child_ctx[58] = list[i].selected;
  child_ctx[51] = list[i].x;
  child_ctx[52] = list[i].y;
  child_ctx[60] = i;
  return child_ctx;
}

// (313:0) {#if height && width}
function create_if_block$1(ctx) {
  var g;
  function select_block_type(ctx, dirty) {
    if ( /*bins*/ctx[0].length === 0) return create_if_block_1$1;
    return create_else_block;
  }
  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        style: true,
        class: true
      });
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "style", /*style*/ctx[11]);
      attr_dev(g, "class", "ColorBinsG svelte-19g5ym1");
      toggle_class(g, "interactive", /*flags*/ctx[1].isInteractive);
      add_location(g, file$1, 313, 1, 7491);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }
      if (dirty[0] & /*style*/2048) {
        attr_dev(g, "style", /*style*/ctx[11]);
      }
      if (dirty[0] & /*flags*/2) {
        toggle_class(g, "interactive", /*flags*/ctx[1].isInteractive);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(313:0) {#if height && width}",
    ctx: ctx
  });
  return block;
}

// (327:2) {:else}
function create_else_block(ctx) {
  var if_block0_anchor;
  var g1;
  var g0;
  var rect;
  var rect_height_value;
  var rect_width_value;
  var if_block2_anchor;
  var g1_transform_value;
  var mounted;
  var dispose;
  var if_block0 = /*flags*/ctx[1].withBackground && create_if_block_7(ctx);
  var if_block1 = /*flags*/ctx[1].isInteractive && create_if_block_6(ctx);
  var each_value_1 = /*bars*/ctx[9];
  validate_each_argument(each_value_1);
  var each_blocks = [];
  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  var if_block2 = /*flags*/ctx[1].showTicks && create_if_block_4(ctx);
  var if_block3 = /*isBrushing*/ctx[8] && create_if_block_2(ctx);
  var block = {
    c: function create() {
      if (if_block0) if_block0.c();
      if_block0_anchor = empty();
      if (if_block1) if_block1.c();
      g1 = svg_element("g");
      g0 = svg_element("g");
      rect = svg_element("rect");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
      if (if_block3) if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      if_block0_anchor = empty();
      if (if_block1) if_block1.l(nodes);
      g1 = claim_svg_element(nodes, "g", {
        transform: true
      });
      var g1_nodes = children(g1);
      g0 = claim_svg_element(g1_nodes, "g", {
        class: true
      });
      var g0_nodes = children(g0);
      rect = claim_svg_element(g0_nodes, "rect", {
        class: true,
        height: true,
        width: true
      });
      children(rect).forEach(detach_dev);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(g0_nodes);
      }
      g0_nodes.forEach(detach_dev);
      if (if_block2) if_block2.l(g1_nodes);
      if_block2_anchor = empty();
      if (if_block3) if_block3.l(g1_nodes);
      g1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "barsSensorBkg svelte-19g5ym1");
      attr_dev(rect, "height", rect_height_value = /*binsSize*/ctx[14].height);
      attr_dev(rect, "width", rect_width_value = /*binsSize*/ctx[14].width);
      add_location(rect, file$1, 352, 5, 8188);
      attr_dev(g0, "class", "bars");
      add_location(g0, file$1, 348, 4, 8124);
      attr_dev(g1, "transform", g1_transform_value = "translate(" + /*origin*/ctx[15].x + "," + /*origin*/ctx[15].y + ")");
      add_location(g1, file$1, 345, 3, 8052);
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_hydration_dev(target, if_block0_anchor, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_hydration_dev(target, g1, anchor);
      append_hydration_dev(g1, g0);
      append_hydration_dev(g0, rect);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g0, null);
      }
      if (if_block2) if_block2.m(g1, null);
      append_hydration_dev(g1, if_block2_anchor);
      if (if_block3) if_block3.m(g1, null);
      if (!mounted) {
        dispose = listen_dev(g0, "mouseleave", /*resetBrush*/ctx[22], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if ( /*flags*/ctx[1].withBackground) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_7(ctx);
          if_block0.c();
          if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ( /*flags*/ctx[1].isInteractive) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_6(ctx);
          if_block1.c();
          if_block1.m(g1.parentNode, g1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty[0] & /*binsSize*/16384 && rect_height_value !== (rect_height_value = /*binsSize*/ctx[14].height)) {
        attr_dev(rect, "height", rect_height_value);
      }
      if (dirty[0] & /*binsSize*/16384 && rect_width_value !== (rect_width_value = /*binsSize*/ctx[14].width)) {
        attr_dev(rect, "width", rect_width_value);
      }
      if (dirty[0] & /*bars, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags*/4064770) {
        each_value_1 = /*bars*/ctx[9];
        validate_each_argument(each_value_1);
        var _i4;
        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(g0, null);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if ( /*flags*/ctx[1].showTicks) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_4(ctx);
          if_block2.c();
          if_block2.m(g1, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if ( /*isBrushing*/ctx[8]) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_2(ctx);
          if_block3.c();
          if_block3.m(g1, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty[0] & /*origin*/32768 && g1_transform_value !== (g1_transform_value = "translate(" + /*origin*/ctx[15].x + "," + /*origin*/ctx[15].y + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(if_block0_anchor);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(g1);
      destroy_each(each_blocks, detaching);
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(327:2) {:else}",
    ctx: ctx
  });
  return block;
}

// (319:2) {#if bins.length === 0}
function create_if_block_1$1(ctx) {
  var text_1;
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text( /*message*/ctx[3]);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_svg_element(nodes, "text", {
        class: true,
        x: true,
        y: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, /*message*/ctx[3]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "message svelte-19g5ym1");
      attr_dev(text_1, "x", text_1_x_value = /*width*/ctx[7] / 2);
      attr_dev(text_1, "y", text_1_y_value = /*height*/ctx[6] / 2);
      add_location(text_1, file$1, 320, 3, 7600);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*message*/8) set_data_dev(t, /*message*/ctx[3]);
      if (dirty[0] & /*width*/128 && text_1_x_value !== (text_1_x_value = /*width*/ctx[7] / 2)) {
        attr_dev(text_1, "x", text_1_x_value);
      }
      if (dirty[0] & /*height*/64 && text_1_y_value !== (text_1_y_value = /*height*/ctx[6] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(319:2) {#if bins.length === 0}",
    ctx: ctx
  });
  return block;
}

// (330:3) {#if flags.withBackground}
function create_if_block_7(ctx) {
  var rect;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        class: true,
        width: true,
        height: true
      });
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-19g5ym1");
      attr_dev(rect, "width", /*width*/ctx[7]);
      attr_dev(rect, "height", /*height*/ctx[6]);
      add_location(rect, file$1, 330, 4, 7749);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*width*/128) {
        attr_dev(rect, "width", /*width*/ctx[7]);
      }
      if (dirty[0] & /*height*/64) {
        attr_dev(rect, "height", /*height*/ctx[6]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7.name,
    type: "if",
    source: "(330:3) {#if flags.withBackground}",
    ctx: ctx
  });
  return block;
}

// (335:3) {#if flags.isInteractive}
function create_if_block_6(ctx) {
  var rect;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        height: true,
        width: true,
        class: true
      });
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height", /*height*/ctx[6]);
      attr_dev(rect, "width", /*width*/ctx[7]);
      attr_dev(rect, "class", "bkgSensor svelte-19g5ym1");
      toggle_class(rect, "reset", /*selectedBins*/ctx[4].length > 0);
      add_location(rect, file$1, 335, 4, 7874);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
      if (!mounted) {
        dispose = [listen_dev(rect, "click", /*resetSelection*/ctx[23], false, false, false), listen_dev(rect, "keydown", /*onKeyDown*/ctx[24], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*height*/64) {
        attr_dev(rect, "height", /*height*/ctx[6]);
      }
      if (dirty[0] & /*width*/128) {
        attr_dev(rect, "width", /*width*/ctx[7]);
      }
      if (dirty[0] & /*selectedBins*/16) {
        toggle_class(rect, "reset", /*selectedBins*/ctx[4].length > 0);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(335:3) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
}

// (377:7) {#if flags.isInteractive}
function create_if_block_5(ctx) {
  var rect;
  var rect_height_value;
  var rect_width_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        class: true,
        height: true,
        width: true
      });
      children(rect).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "rectsensor svelte-19g5ym1");
      attr_dev(rect, "height", rect_height_value = /*barHeight*/ctx[56]);
      attr_dev(rect, "width", rect_width_value = /*barWidth*/ctx[55]);
      add_location(rect, file$1, 378, 8, 8699);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
      if (!mounted) {
        dispose = [listen_dev(rect, "mousedown", /*onMousedown*/ctx[18], false, false, false), listen_dev(rect, "mouseover", /*onMouseenter*/ctx[17]( /*index*/ctx[60]), false, false, false), listen_dev(rect, "mouseout", /*onMouseleave*/ctx[21]( /*index*/ctx[60]), false, false, false), listen_dev(rect, "mousemove", function () {
          if (is_function( /*isMousedown*/ctx[10] ? /*onMousemove*/ctx[19]( /*index*/ctx[60]) : null)) ( /*isMousedown*/ctx[10] ? /*onMousemove*/ctx[19]( /*index*/ctx[60]) : null).apply(this, arguments);
        }, false, false, false), listen_dev(rect, "mouseup", /*onMouseup*/ctx[20]( /*index*/ctx[60]), false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*bars*/512 && rect_height_value !== (rect_height_value = /*barHeight*/ctx[56])) {
        attr_dev(rect, "height", rect_height_value);
      }
      if (dirty[0] & /*bars*/512 && rect_width_value !== (rect_width_value = /*barWidth*/ctx[55])) {
        attr_dev(rect, "width", rect_width_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(377:7) {#if flags.isInteractive}",
    ctx: ctx
  });
  return block;
}

// (359:5) {#each bars as {       barWidth,       barHeight,       fill,       selected,       x,       y      }
function create_each_block_1(ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var rect_height_value;
  var rect_width_value;
  var g_transform_value;
  var if_block = /*flags*/ctx[1].isInteractive && create_if_block_5(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        transform: true
      });
      var g_nodes = children(g);
      rect = claim_svg_element(g_nodes, "rect", {
        fill: true,
        height: true,
        width: true,
        class: true
      });
      children(rect).forEach(detach_dev);
      if (if_block) if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "fill", rect_fill_value = /*fill*/ctx[57]);
      attr_dev(rect, "height", rect_height_value = /*barHeight*/ctx[56]);
      attr_dev(rect, "width", rect_width_value = /*barWidth*/ctx[55]);
      attr_dev(rect, "class", "svelte-19g5ym1");
      toggle_class(rect, "selected", /*selected*/ctx[58]);
      add_location(rect, file$1, 370, 7, 8487);
      attr_dev(g, "class", "bar svelte-19g5ym1");
      attr_dev(g, "transform", g_transform_value = "translate(" + /*x*/ctx[51] + "," + /*y*/ctx[52] + ")");
      add_location(g, file$1, 366, 6, 8412);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, rect);
      if (if_block) if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*bars*/512 && rect_fill_value !== (rect_fill_value = /*fill*/ctx[57])) {
        attr_dev(rect, "fill", rect_fill_value);
      }
      if (dirty[0] & /*bars*/512 && rect_height_value !== (rect_height_value = /*barHeight*/ctx[56])) {
        attr_dev(rect, "height", rect_height_value);
      }
      if (dirty[0] & /*bars*/512 && rect_width_value !== (rect_width_value = /*barWidth*/ctx[55])) {
        attr_dev(rect, "width", rect_width_value);
      }
      if (dirty[0] & /*bars*/512) {
        toggle_class(rect, "selected", /*selected*/ctx[58]);
      }
      if ( /*flags*/ctx[1].isInteractive) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_5(ctx);
          if_block.c();
          if_block.m(g, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*bars*/512 && g_transform_value !== (g_transform_value = "translate(" + /*x*/ctx[51] + "," + /*y*/ctx[52] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(359:5) {#each bars as {       barWidth,       barHeight,       fill,       selected,       x,       y      }",
    ctx: ctx
  });
  return block;
}

// (395:4) {#if flags.showTicks}
function create_if_block_4(ctx) {
  var g;
  var g_font_size_value;
  var each_value = /*ticks*/ctx[13];
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      g = svg_element("g");
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        "font-size": true
      });
      var g_nodes = children(g);
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(g_nodes);
      }
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "class", "ticks svelte-19g5ym1");
      attr_dev(g, "font-size", g_font_size_value = /*theme*/ctx[5].fontSize);
      toggle_class(g, "vertical", /*flags*/ctx[1].isVertical);
      add_location(g, file$1, 395, 5, 9121);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(g, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*ticks*/8192) {
        each_value = /*ticks*/ctx[13];
        validate_each_argument(each_value);
        var _i8;
        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i8);
          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block(child_ctx);
            each_blocks[_i8].c();
            each_blocks[_i8].m(g, null);
          }
        }
        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty[0] & /*theme*/32 && g_font_size_value !== (g_font_size_value = /*theme*/ctx[5].fontSize)) {
        attr_dev(g, "font-size", g_font_size_value);
      }
      if (dirty[0] & /*flags*/2) {
        toggle_class(g, "vertical", /*flags*/ctx[1].isVertical);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(395:4) {#if flags.showTicks}",
    ctx: ctx
  });
  return block;
}

// (401:6) {#each ticks as {label, x, y}}
function create_each_block(ctx) {
  var text_1;
  var t_value = /*label*/ctx[50] + "";
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_svg_element(nodes, "text", {
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
      attr_dev(text_1, "x", text_1_x_value = /*x*/ctx[51]);
      attr_dev(text_1, "y", text_1_y_value = /*y*/ctx[52]);
      attr_dev(text_1, "class", "svelte-19g5ym1");
      add_location(text_1, file$1, 401, 7, 9268);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*ticks*/8192 && t_value !== (t_value = /*label*/ctx[50] + "")) set_data_dev(t, t_value);
      if (dirty[0] & /*ticks*/8192 && text_1_x_value !== (text_1_x_value = /*x*/ctx[51])) {
        attr_dev(text_1, "x", text_1_x_value);
      }
      if (dirty[0] & /*ticks*/8192 && text_1_y_value !== (text_1_y_value = /*y*/ctx[52])) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(401:6) {#each ticks as {label, x, y}}",
    ctx: ctx
  });
  return block;
}

// (408:4) {#if isBrushing}
function create_if_block_2(ctx) {
  var g;
  function select_block_type_1(ctx, dirty) {
    if ( /*flags*/ctx[1].isVertical) return create_if_block_3;
    return create_else_block_1;
  }
  var current_block_type = select_block_type_1(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true
      });
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "class", "brush svelte-19g5ym1");
      add_location(g, file$1, 408, 5, 9377);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(408:4) {#if isBrushing}",
    ctx: ctx
  });
  return block;
}

// (417:6) {:else}
function create_else_block_1(ctx) {
  var line;
  var line_x__value;
  var line_x__value_1;
  var line_y__value;
  var line_y__value_1;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_svg_element(nodes, "line", {
        x1: true,
        x2: true,
        y1: true,
        y2: true,
        class: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "x1", line_x__value = /*brushLine*/ctx[12].p1);
      attr_dev(line, "x2", line_x__value_1 = /*brushLine*/ctx[12].p2);
      attr_dev(line, "y1", line_y__value = /*geometry*/ctx[2].barThickness);
      attr_dev(line, "y2", line_y__value_1 = /*geometry*/ctx[2].barThickness);
      attr_dev(line, "class", "svelte-19g5ym1");
      add_location(line, file$1, 417, 7, 9532);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*brushLine*/4096 && line_x__value !== (line_x__value = /*brushLine*/ctx[12].p1)) {
        attr_dev(line, "x1", line_x__value);
      }
      if (dirty[0] & /*brushLine*/4096 && line_x__value_1 !== (line_x__value_1 = /*brushLine*/ctx[12].p2)) {
        attr_dev(line, "x2", line_x__value_1);
      }
      if (dirty[0] & /*geometry*/4 && line_y__value !== (line_y__value = /*geometry*/ctx[2].barThickness)) {
        attr_dev(line, "y1", line_y__value);
      }
      if (dirty[0] & /*geometry*/4 && line_y__value_1 !== (line_y__value_1 = /*geometry*/ctx[2].barThickness)) {
        attr_dev(line, "y2", line_y__value_1);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(417:6) {:else}",
    ctx: ctx
  });
  return block;
}

// (412:6) {#if flags.isVertical}
function create_if_block_3(ctx) {
  var line;
  var line_y__value;
  var line_y__value_1;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_svg_element(nodes, "line", {
        y1: true,
        y2: true,
        class: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y1", line_y__value = /*brushLine*/ctx[12].p1);
      attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ctx[12].p2);
      attr_dev(line, "class", "svelte-19g5ym1");
      add_location(line, file$1, 412, 7, 9443);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*brushLine*/4096 && line_y__value !== (line_y__value = /*brushLine*/ctx[12].p1)) {
        attr_dev(line, "y1", line_y__value);
      }
      if (dirty[0] & /*brushLine*/4096 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ctx[12].p2)) {
        attr_dev(line, "y2", line_y__value_1);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(412:6) {#if flags.isVertical}",
    ctx: ctx
  });
  return block;
}
function create_fragment$1(ctx) {
  var if_block_anchor;
  var if_block = /*height*/ctx[6] && /*width*/ctx[7] && create_if_block$1(ctx);
  var block = {
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
      insert_hydration_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if ( /*height*/ctx[6] && /*width*/ctx[7]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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
function instance$1($$self, $$props, $$invalidate) {
  var innerWidth;
  var innerHeight;
  var widgetThickness;
  var origin;
  var binsSize;
  var valuesExtent;
  var range;
  var scale;
  var lastIndex;
  var semigap;
  var bars;
  var ticksDistance;
  var ticksValues;
  var ticks;
  var isBrushing;
  var isPressed;
  var doesBrushAdd;
  var doesBrushRemove;
  var brushStroke;
  var brushExtent;
  var brushRange;
  var brushExtentBarYs;
  var brushLine;
  var style;
  var $_brush;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ColorBinsG', slots, []);
  var dispatch = createEventDispatcher();
  var defaultFlags = {
    isInteractive: false,
    isVertical: false,
    showTicksExtentOnly: false,
    showTicks: true,
    withBackground: false
  };
  var defaultGeometry = {
    barThickness: 25,
    bottom: 10,
    brushThreshold: 10,
    // pixels to trigger brushing
    gap: 2,
    left: 10,
    right: 10,
    textPadding: 5,
    top: 10
  };
  var defaultTheme = {
    backgroundColor: 'white',
    backgroundOpacity: 1,
    binFill: 'white',
    binStroke: null,
    // null for no stroke, or a color string
    binStrokeWidth: 1,
    // ineffective for binStroke: null
    brushAddStroke: 'rgb(107,248,134)',
    brushRemoveStroke: 'rgb(246,97,20)',
    brushStrokeOpacity: 0.8,
    brushStrokeWidth: 8,
    fontSize: 12,
    messageColor: 'black',
    messageFontSize: '1rem',
    selectedBinStroke: 'black',
    selectedBinStrokeWidth: 2,
    textColor: 'black'
  };
  var _$$props$height = $$props.height,
    height = _$$props$height === void 0 ? null : _$$props$height;
  var _$$props$width = $$props.width,
    width = _$$props$width === void 0 ? null : _$$props$width;
  var _$$props$bins = $$props.bins,
    bins = _$$props$bins === void 0 ? [] : _$$props$bins;
  var _$$props$flags = $$props.flags,
    flags = _$$props$flags === void 0 ? null : _$$props$flags;
  var _$$props$geometry = $$props.geometry,
    geometry = _$$props$geometry === void 0 ? null : _$$props$geometry;
  var _$$props$message = $$props.message,
    message = _$$props$message === void 0 ? 'No data' : _$$props$message;
  var _$$props$selectedBins = $$props.selectedBins,
    selectedBins = _$$props$selectedBins === void 0 ? [] : _$$props$selectedBins;
  var _$$props$theme = $$props.theme,
    theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$ticksFormatF = $$props.ticksFormatFn,
    ticksFormatFn = _$$props$ticksFormatF === void 0 ? null : _$$props$ticksFormatF;

  /* brushing */
  var isMousedown = false;
  var brushOff = {
    delta: 0,
    end: null,
    origin: {
      x: null,
      y: null
    },
    start: null,
    modifier: null,
    state: 'Off'
  };
  var _brush = writable(brushOff);
  validate_store(_brush, '_brush');
  component_subscribe($$self, _brush, function (value) {
    return $$invalidate(42, $_brush = value);
  });

  /* events */
  var getModifier = function getModifier(event) {
    return event.shiftKey ? 'shift' : event.altKey ? 'alt' : null;
  };
  var onMouseenter = function onMouseenter(index) {
    return function () {
      if (isBrushing) {
        _brush.update(mergeObj({
          end: index
        }));
      }
      dispatch('entered', index);
    };
  };
  var onMousedown = function onMousedown(event) {
    $$invalidate(10, isMousedown = true);
    _brush.set({
      delta: 0,
      modifier: getModifier(event),
      origin: {
        x: event.offsetX,
        y: event.offsetY
      },
      state: 'Pressed'
    });
  };
  var onMousemove = function onMousemove(index) {
    return function (event) {
      if (isPressed) {
        var delta = vectorLength2D(event.offsetX - $_brush.origin.x, event.offsetY - $_brush.origin.y);
        if (delta > geometry.brushThreshold) {
          _brush.update(mergeObj({
            end: index,
            start: index,
            state: 'Brushing'
          }));
          dispatch('brushstart', index);
        } else {
          _brush.update(mergeObj({
            delta: delta
          }));
        }
      }
    };
  };
  var onMouseup = function onMouseup(index) {
    return function () {
      $$invalidate(10, isMousedown = false);
      if (isPressed) {
        if ($_brush.delta < geometry.brushThreshold) {
          if (doesBrushAdd) {
            $$invalidate(4, selectedBins = uniques(appendTo(selectedBins, index)));
          } else if (doesBrushRemove) {
            $$invalidate(4, selectedBins = pullFrom(selectedBins, [index]));
          } else {
            $$invalidate(4, selectedBins = [index]);
          }
          dispatch('clicked', {
            index: index,
            selectedBins: selectedBins
          });
        }
      } else if (isBrushing) {
        dispatch('brushend', index);
      }
      _brush.set(brushOff);
    };
  };
  var onMouseleave = function onMouseleave(index) {
    return function () {
      dispatch('exited', index);
    };
  };
  var resetBrush = function resetBrush() {
    _brush.set(brushOff);
  };
  var resetSelection = function resetSelection() {
    $$invalidate(4, selectedBins = []);
    dispatch('clicked', {
      selectedBins: selectedBins
    });
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      resetSelection();
    }
  };
  var writable_props = ['height', 'width', 'bins', 'flags', 'geometry', 'message', 'selectedBins', 'theme', 'ticksFormatFn'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ColorBinsG> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('height' in $$props) $$invalidate(6, height = $$props.height);
    if ('width' in $$props) $$invalidate(7, width = $$props.width);
    if ('bins' in $$props) $$invalidate(0, bins = $$props.bins);
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ('message' in $$props) $$invalidate(3, message = $$props.message);
    if ('selectedBins' in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('ticksFormatFn' in $$props) $$invalidate(25, ticksFormatFn = $$props.ticksFormatFn);
  };
  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      writable: writable,
      makeStyleVars: makeStyleVars,
      vectorLength2D: vectorLength2D,
      concat: concat,
      inclusiveRange: inclusiveRange,
      mergeObj: mergeObj,
      linearScale: linear,
      appendTo: appendTo,
      last: last,
      pullFrom: pullFrom,
      sort: sort,
      uniques: uniques,
      getBinsTicks: getBinsTicks,
      getBinsTicksExtent: getBinsTicksExtent,
      dispatch: dispatch,
      defaultFlags: defaultFlags,
      defaultGeometry: defaultGeometry,
      defaultTheme: defaultTheme,
      height: height,
      width: width,
      bins: bins,
      flags: flags,
      geometry: geometry,
      message: message,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      isMousedown: isMousedown,
      brushOff: brushOff,
      _brush: _brush,
      getModifier: getModifier,
      onMouseenter: onMouseenter,
      onMousedown: onMousedown,
      onMousemove: onMousemove,
      onMouseup: onMouseup,
      onMouseleave: onMouseleave,
      resetBrush: resetBrush,
      resetSelection: resetSelection,
      onKeyDown: onKeyDown,
      isBrushing: isBrushing,
      doesBrushRemove: doesBrushRemove,
      doesBrushAdd: doesBrushAdd,
      isPressed: isPressed,
      brushStroke: brushStroke,
      style: style,
      brushRange: brushRange,
      brushExtentBarYs: brushExtentBarYs,
      brushLine: brushLine,
      brushExtent: brushExtent,
      bars: bars,
      ticksDistance: ticksDistance,
      scale: scale,
      ticksValues: ticksValues,
      ticks: ticks,
      semigap: semigap,
      lastIndex: lastIndex,
      range: range,
      valuesExtent: valuesExtent,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      binsSize: binsSize,
      widgetThickness: widgetThickness,
      origin: origin,
      $_brush: $_brush
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('height' in $$props) $$invalidate(6, height = $$props.height);
    if ('width' in $$props) $$invalidate(7, width = $$props.width);
    if ('bins' in $$props) $$invalidate(0, bins = $$props.bins);
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ('message' in $$props) $$invalidate(3, message = $$props.message);
    if ('selectedBins' in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('ticksFormatFn' in $$props) $$invalidate(25, ticksFormatFn = $$props.ticksFormatFn);
    if ('isMousedown' in $$props) $$invalidate(10, isMousedown = $$props.isMousedown);
    if ('isBrushing' in $$props) $$invalidate(8, isBrushing = $$props.isBrushing);
    if ('doesBrushRemove' in $$props) $$invalidate(26, doesBrushRemove = $$props.doesBrushRemove);
    if ('doesBrushAdd' in $$props) $$invalidate(27, doesBrushAdd = $$props.doesBrushAdd);
    if ('isPressed' in $$props) isPressed = $$props.isPressed;
    if ('brushStroke' in $$props) $$invalidate(28, brushStroke = $$props.brushStroke);
    if ('style' in $$props) $$invalidate(11, style = $$props.style);
    if ('brushRange' in $$props) $$invalidate(29, brushRange = $$props.brushRange);
    if ('brushExtentBarYs' in $$props) $$invalidate(30, brushExtentBarYs = $$props.brushExtentBarYs);
    if ('brushLine' in $$props) $$invalidate(12, brushLine = $$props.brushLine);
    if ('brushExtent' in $$props) $$invalidate(31, brushExtent = $$props.brushExtent);
    if ('bars' in $$props) $$invalidate(9, bars = $$props.bars);
    if ('ticksDistance' in $$props) $$invalidate(32, ticksDistance = $$props.ticksDistance);
    if ('scale' in $$props) $$invalidate(33, scale = $$props.scale);
    if ('ticksValues' in $$props) $$invalidate(34, ticksValues = $$props.ticksValues);
    if ('ticks' in $$props) $$invalidate(13, ticks = $$props.ticks);
    if ('semigap' in $$props) $$invalidate(35, semigap = $$props.semigap);
    if ('lastIndex' in $$props) $$invalidate(36, lastIndex = $$props.lastIndex);
    if ('range' in $$props) $$invalidate(37, range = $$props.range);
    if ('valuesExtent' in $$props) $$invalidate(38, valuesExtent = $$props.valuesExtent);
    if ('innerWidth' in $$props) $$invalidate(39, innerWidth = $$props.innerWidth);
    if ('innerHeight' in $$props) $$invalidate(40, innerHeight = $$props.innerHeight);
    if ('binsSize' in $$props) $$invalidate(14, binsSize = $$props.binsSize);
    if ('widgetThickness' in $$props) $$invalidate(41, widgetThickness = $$props.widgetThickness);
    if ('origin' in $$props) $$invalidate(15, origin = $$props.origin);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] & /*bins*/1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, bins = bins || []);
    }
    if ($$self.$$.dirty[0] & /*flags*/2) {
      $$invalidate(1, flags = flags ? _objectSpread(_objectSpread({}, defaultFlags), flags) : defaultFlags);
    }
    if ($$self.$$.dirty[0] & /*geometry*/4) {
      $$invalidate(2, geometry = geometry ? _objectSpread(_objectSpread({}, defaultGeometry), geometry) : defaultGeometry);
    }
    if ($$self.$$.dirty[0] & /*message*/8) {
      $$invalidate(3, message = message || 'No data');
    }
    if ($$self.$$.dirty[0] & /*selectedBins*/16) {
      $$invalidate(4, selectedBins = selectedBins || []);
    }
    if ($$self.$$.dirty[0] & /*theme*/32) {
      $$invalidate(5, theme = theme ? _objectSpread(_objectSpread({}, defaultTheme), theme) : defaultTheme);
    }
    if ($$self.$$.dirty[0] & /*ticksFormatFn*/33554432) {
      $$invalidate(25, ticksFormatFn = ticksFormatFn || function (x) {
        return x;
      });
    }
    if ($$self.$$.dirty[0] & /*width, geometry*/132) {
      /* layout */
      $$invalidate(39, innerWidth = Math.max(0, width - geometry.left - geometry.right));
    }
    if ($$self.$$.dirty[0] & /*height, geometry*/68) {
      $$invalidate(40, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
    }
    if ($$self.$$.dirty[0] & /*geometry, flags, theme*/38) {
      $$invalidate(41, widgetThickness = geometry.barThickness + (flags.showTicks ? flags.isVertical ? 0 : geometry.textPadding + theme.fontSize : 0));
    }
    if ($$self.$$.dirty[0] & /*geometry, flags*/6 | $$self.$$.dirty[1] & /*innerWidth, widgetThickness, innerHeight*/1792) {
      $$invalidate(15, origin = {
        x: geometry.left + (flags.isVertical ? (innerWidth - widgetThickness) / 2 : 0),
        y: geometry.top + (flags.isVertical ? 0 : (innerHeight - widgetThickness) / 2)
      });
    }
    if ($$self.$$.dirty[0] & /*flags, geometry*/6 | $$self.$$.dirty[1] & /*innerWidth, innerHeight*/768) {
      $$invalidate(14, binsSize = {
        width: flags.isVertical ? geometry.barThickness : innerWidth,
        height: flags.isVertical ? innerHeight : geometry.barThickness
      });
    }
    if ($$self.$$.dirty[0] & /*bins*/1) {
      /* scale */
      $$invalidate(38, valuesExtent = bins.length && [bins[0].range[0], last(bins).range[1]]);
    }
    if ($$self.$$.dirty[0] & /*flags*/2 | $$self.$$.dirty[1] & /*innerHeight, innerWidth*/768) {
      $$invalidate(37, range = flags.isVertical ? [innerHeight, 0] : [0, innerWidth]);
    }
    if ($$self.$$.dirty[1] & /*valuesExtent, range*/192) {
      $$invalidate(33, scale = valuesExtent && linear(valuesExtent, range));
    }
    if ($$self.$$.dirty[0] & /*bins*/1) {
      /* bars */
      $$invalidate(36, lastIndex = bins.length - 1);
    }
    if ($$self.$$.dirty[0] & /*geometry*/4) {
      $$invalidate(35, semigap = geometry.gap / 2);
    }
    if ($$self.$$.dirty[1] & /*$_brush*/2048) {
      $$invalidate(8, isBrushing = $_brush.state === 'Brushing');
    }
    if ($$self.$$.dirty[1] & /*$_brush*/2048) {
      $$invalidate(27, doesBrushAdd = $_brush.modifier === 'shift');
    }
    if ($$self.$$.dirty[0] & /*isBrushing*/256 | $$self.$$.dirty[1] & /*$_brush*/2048) {
      $$invalidate(31, brushExtent = isBrushing && sort([$_brush.start, $_brush.end]));
    }
    if ($$self.$$.dirty[0] & /*isBrushing*/256 | $$self.$$.dirty[1] & /*brushExtent*/1) {
      $$invalidate(29, brushRange = isBrushing && inclusiveRange(brushExtent));
    }
    if ($$self.$$.dirty[1] & /*$_brush*/2048) {
      $$invalidate(26, doesBrushRemove = $_brush.modifier === 'alt');
    }
    if ($$self.$$.dirty[0] & /*isBrushing, doesBrushAdd, selectedBins, brushRange, doesBrushRemove*/738197776 | $$self.$$.dirty[1] & /*$_brush*/2048) {
      if (isBrushing) {
        $$invalidate(4, selectedBins = doesBrushAdd ? uniques(concat(selectedBins, brushRange)) : doesBrushRemove ? pullFrom(selectedBins, brushRange) : brushRange);
        dispatch('brushed', {
          end: $_brush.end,
          selectedBins: selectedBins,
          start: $_brush.start
        });
      }
    }
    if ($$self.$$.dirty[0] & /*bins, selectedBins, flags, geometry, theme*/55 | $$self.$$.dirty[1] & /*scale, semigap, lastIndex*/52) {
      $$invalidate(9, bars = bins.map(function (bin, index) {
        var _bin$range = _slicedToArray(bin.range, 2),
          v1 = _bin$range[0],
          v2 = _bin$range[1],
          color = bin.color;
        var selected = selectedBins.length && selectedBins.includes(index);
        var p1 = scale(v1);
        var p2 = scale(v2);
        var x;
        var y;
        var start;
        var end;
        var sensorX;
        var sensorY;
        if (flags.isVertical) {
          start = p1 - (index > 0 ? semigap : 0);
          end = p2 + (index < lastIndex ? semigap : 0);
          x = 0;
          y = end;
          sensorX = 0;
          sensorY = p2;
        } else {
          start = p1 + (index > 0 ? semigap : 0);
          end = p2 - (index < lastIndex ? semigap : 0);
          x = start;
          y = 0;
          sensorX = p1;
          sensorY = 0;
        }
        var barLength = Math.abs(end - start);
        var sensorLength = Math.abs(p2 - p1);
        return _objectSpread(_objectSpread({}, bin), {
          barHeight: flags.isVertical ? barLength : geometry.barThickness,
          barWidth: flags.isVertical ? geometry.barThickness : barLength,
          fill: color || theme.binFill,
          p1: p1,
          p2: p2,
          selected: selected,
          sensorHeight: flags.isVertical ? sensorLength : geometry.barThickness,
          sensorWidth: flags.isVertical ? geometry.barThickness : sensorLength,
          sensorX: sensorX,
          sensorY: sensorY,
          x: x,
          y: y
        });
      }));
    }
    if ($$self.$$.dirty[0] & /*geometry*/4) {
      /* ticks */
      $$invalidate(32, ticksDistance = geometry.barThickness + geometry.textPadding);
    }
    if ($$self.$$.dirty[0] & /*flags, bins*/3) {
      $$invalidate(34, ticksValues = flags.showTicksExtentOnly ? getBinsTicksExtent(bins) : getBinsTicks(bins));
    }
    if ($$self.$$.dirty[0] & /*ticksFormatFn, flags*/33554434 | $$self.$$.dirty[1] & /*ticksValues, ticksDistance, scale*/14) {
      $$invalidate(13, ticks = ticksValues.map(function (value) {
        return {
          label: ticksFormatFn(value),
          x: flags.isVertical ? ticksDistance : scale(value),
          y: flags.isVertical ? scale(value) : ticksDistance
        };
      }));
    }
    if ($$self.$$.dirty[1] & /*$_brush*/2048) {
      isPressed = $_brush.state === 'Pressed';
    }
    if ($$self.$$.dirty[0] & /*doesBrushAdd, theme, doesBrushRemove*/201326624) {
      $$invalidate(28, brushStroke = doesBrushAdd ? theme.brushAddStroke : doesBrushRemove ? theme.brushRemoveStroke : null);
    }
    if ($$self.$$.dirty[0] & /*isBrushing, bars*/768 | $$self.$$.dirty[1] & /*brushExtent*/1) {
      $$invalidate(30, brushExtentBarYs = isBrushing && sort([bars[brushExtent[0]].p1, bars[brushExtent[0]].p2, bars[brushExtent[1]].p1, bars[brushExtent[1]].p2]));
    }
    if ($$self.$$.dirty[0] & /*isBrushing, brushExtentBarYs*/1073742080) {
      $$invalidate(12, brushLine = isBrushing && {
        p1: brushExtentBarYs[0],
        p2: brushExtentBarYs[3]
      });
    }
    if ($$self.$$.dirty[0] & /*theme, brushStroke*/268435488) {
      /* style */
      $$invalidate(11, style = makeStyleVars(_objectSpread(_objectSpread({}, theme), {}, {
        brushStroke: brushStroke
      })));
    }
  };
  return [bins, flags, geometry, message, selectedBins, theme, height, width, isBrushing, bars, isMousedown, style, brushLine, ticks, binsSize, origin, _brush, onMouseenter, onMousedown, onMousemove, onMouseup, onMouseleave, resetBrush, resetSelection, onKeyDown, ticksFormatFn, doesBrushRemove, doesBrushAdd, brushStroke, brushRange, brushExtentBarYs, brushExtent, ticksDistance, scale, ticksValues, semigap, lastIndex, range, valuesExtent, innerWidth, innerHeight, widgetThickness, $_brush];
}
var ColorBinsG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorBinsG, _SvelteComponentDev);
  var _super = _createSuper$1(ColorBinsG);
  function ColorBinsG(options) {
    var _this;
    _classCallCheck(this, ColorBinsG);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      height: 6,
      width: 7,
      bins: 0,
      flags: 1,
      geometry: 2,
      message: 3,
      selectedBins: 4,
      theme: 5,
      ticksFormatFn: 25
    }, null, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorBinsG",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }
  _createClass(ColorBinsG, [{
    key: "height",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return ColorBinsG;
}(SvelteComponentDev);
var ColorBinsG$1 = ColorBinsG;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/legend/src/ColorBinsDiv.svelte";

// (33:1) {#if title}
function create_if_block_1(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text( /*title*/ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes, /*title*/ctx[0]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1amymvq");
      add_location(h2, file, 34, 3, 745);
      attr_dev(header, "class", "svelte-1amymvq");
      add_location(header, file, 33, 2, 733);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, header, anchor);
      append_hydration_dev(header, h2);
      append_hydration_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*title*/1) set_data_dev(t, /*title*/ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(33:1) {#if title}",
    ctx: ctx
  });
  return block;
}

// (47:4) {#if bins}
function create_if_block(ctx) {
  var colorbinsg;
  var current;
  colorbinsg = new ColorBinsG$1({
    props: {
      bins: /*bins*/ctx[1],
      flags: /*flags*/ctx[2],
      geometry: /*geometry*/ctx[3],
      height: /*height*/ctx[8],
      message: /*message*/ctx[4],
      selectedBins: /*selectedBins*/ctx[5],
      theme: /*theme*/ctx[6],
      ticksFormatFn: /*ticksFormatFn*/ctx[7],
      width: /*width*/ctx[9]
    },
    $$inline: true
  });
  colorbinsg.$on("brushed", /*brushed_handler*/ctx[13]);
  colorbinsg.$on("brushend", /*brushend_handler*/ctx[14]);
  colorbinsg.$on("brushstart", /*brushstart_handler*/ctx[15]);
  colorbinsg.$on("clicked", /*clicked_handler*/ctx[16]);
  colorbinsg.$on("entered", /*entered_handler*/ctx[17]);
  colorbinsg.$on("exited", /*exited_handler*/ctx[18]);
  var block = {
    c: function create() {
      create_component(colorbinsg.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(colorbinsg.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(colorbinsg, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var colorbinsg_changes = {};
      if (dirty & /*bins*/2) colorbinsg_changes.bins = /*bins*/ctx[1];
      if (dirty & /*flags*/4) colorbinsg_changes.flags = /*flags*/ctx[2];
      if (dirty & /*geometry*/8) colorbinsg_changes.geometry = /*geometry*/ctx[3];
      if (dirty & /*height*/256) colorbinsg_changes.height = /*height*/ctx[8];
      if (dirty & /*message*/16) colorbinsg_changes.message = /*message*/ctx[4];
      if (dirty & /*selectedBins*/32) colorbinsg_changes.selectedBins = /*selectedBins*/ctx[5];
      if (dirty & /*theme*/64) colorbinsg_changes.theme = /*theme*/ctx[6];
      if (dirty & /*ticksFormatFn*/128) colorbinsg_changes.ticksFormatFn = /*ticksFormatFn*/ctx[7];
      if (dirty & /*width*/512) colorbinsg_changes.width = /*width*/ctx[9];
      colorbinsg.$set(colorbinsg_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(colorbinsg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(colorbinsg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(colorbinsg, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(47:4) {#if bins}",
    ctx: ctx
  });
  return block;
}
function create_fragment(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var main_resize_listener;
  var current;
  var if_block0 = /*title*/ctx[0] && create_if_block_1(ctx);
  var if_block1 = /*bins*/ctx[1] && create_if_block(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      svg = claim_svg_element(main_nodes, "svg", {
        width: true,
        height: true,
        class: true
      });
      var svg_nodes = children(svg);
      if (if_block1) if_block1.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width", /*width*/ctx[9]);
      attr_dev(svg, "height", /*height*/ctx[8]);
      attr_dev(svg, "class", "svelte-1amymvq");
      add_location(svg, file, 42, 3, 894);
      attr_dev(main, "class", "svelte-1amymvq");
      add_render_callback(function () {
        return (/*main_elementresize_handler*/ctx[19].call(main)
        );
      });
      toggle_class(main, "titled", /*title*/ctx[0] && /*title*/ctx[0].length);
      add_location(main, file, 37, 2, 783);
      attr_dev(div, "class", "ColorBinsDiv svelte-1amymvq");
      attr_dev(div, "style", /*style*/ctx[10]);
      toggle_class(div, "interactive", /*flags*/ctx[2] && /*flags*/ctx[2].isInteractive);
      add_location(div, file, 27, 0, 630);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_hydration_dev(div, t);
      append_hydration_dev(div, main);
      append_hydration_dev(main, svg);
      if (if_block1) if_block1.m(svg, null);
      main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ctx[19].bind(main));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if ( /*title*/ctx[0]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ( /*bins*/ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*bins*/2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(svg, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*width*/512) {
        attr_dev(svg, "width", /*width*/ctx[9]);
      }
      if (!current || dirty & /*height*/256) {
        attr_dev(svg, "height", /*height*/ctx[8]);
      }
      if (!current || dirty & /*title*/1) {
        toggle_class(main, "titled", /*title*/ctx[0] && /*title*/ctx[0].length);
      }
      if (!current || dirty & /*style*/1024) {
        attr_dev(div, "style", /*style*/ctx[10]);
      }
      if (!current || dirty & /*flags*/4) {
        toggle_class(div, "interactive", /*flags*/ctx[2] && /*flags*/ctx[2].isInteractive);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      main_resize_listener();
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
function instance($$self, $$props, $$invalidate) {
  var style;
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('ColorBinsDiv', slots, []);
  var _$$props$headerHeight = $$props.headerHeight,
    headerHeight = _$$props$headerHeight === void 0 ? null : _$$props$headerHeight;
  var _$$props$padding = $$props.padding,
    padding = _$$props$padding === void 0 ? null : _$$props$padding;
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var _$$props$bins = $$props.bins,
    bins = _$$props$bins === void 0 ? [] : _$$props$bins;
  var _$$props$flags = $$props.flags,
    flags = _$$props$flags === void 0 ? null : _$$props$flags;
  var _$$props$geometry = $$props.geometry,
    geometry = _$$props$geometry === void 0 ? null : _$$props$geometry;
  var _$$props$message = $$props.message,
    message = _$$props$message === void 0 ? 'No data' : _$$props$message;
  var _$$props$selectedBins = $$props.selectedBins,
    selectedBins = _$$props$selectedBins === void 0 ? [] : _$$props$selectedBins;
  var _$$props$theme = $$props.theme,
    theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$ticksFormatF = $$props.ticksFormatFn,
    ticksFormatFn = _$$props$ticksFormatF === void 0 ? null : _$$props$ticksFormatF;
  var height = 0;
  var width = 0;
  var writable_props = ['headerHeight', 'padding', 'title', 'bins', 'flags', 'geometry', 'message', 'selectedBins', 'theme', 'ticksFormatFn'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ColorBinsDiv> was created with unknown prop '".concat(key, "'"));
  });
  function brushed_handler(event) {
    bubble.call(this, $$self, event);
  }
  function brushend_handler(event) {
    bubble.call(this, $$self, event);
  }
  function brushstart_handler(event) {
    bubble.call(this, $$self, event);
  }
  function clicked_handler(event) {
    bubble.call(this, $$self, event);
  }
  function entered_handler(event) {
    bubble.call(this, $$self, event);
  }
  function exited_handler(event) {
    bubble.call(this, $$self, event);
  }
  function main_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(8, height);
    $$invalidate(9, width);
  }
  $$self.$$set = function ($$props) {
    if ('headerHeight' in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
    if ('padding' in $$props) $$invalidate(12, padding = $$props.padding);
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('bins' in $$props) $$invalidate(1, bins = $$props.bins);
    if ('flags' in $$props) $$invalidate(2, flags = $$props.flags);
    if ('geometry' in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ('message' in $$props) $$invalidate(4, message = $$props.message);
    if ('selectedBins' in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
    if ('theme' in $$props) $$invalidate(6, theme = $$props.theme);
    if ('ticksFormatFn' in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
  };
  $$self.$capture_state = function () {
    return {
      makeStyleVars: makeStyleVars,
      ColorBinsG: ColorBinsG$1,
      headerHeight: headerHeight,
      padding: padding,
      title: title,
      bins: bins,
      flags: flags,
      geometry: geometry,
      message: message,
      selectedBins: selectedBins,
      theme: theme,
      ticksFormatFn: ticksFormatFn,
      height: height,
      width: width,
      style: style
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('headerHeight' in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
    if ('padding' in $$props) $$invalidate(12, padding = $$props.padding);
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('bins' in $$props) $$invalidate(1, bins = $$props.bins);
    if ('flags' in $$props) $$invalidate(2, flags = $$props.flags);
    if ('geometry' in $$props) $$invalidate(3, geometry = $$props.geometry);
    if ('message' in $$props) $$invalidate(4, message = $$props.message);
    if ('selectedBins' in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
    if ('theme' in $$props) $$invalidate(6, theme = $$props.theme);
    if ('ticksFormatFn' in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
    if ('height' in $$props) $$invalidate(8, height = $$props.height);
    if ('width' in $$props) $$invalidate(9, width = $$props.width);
    if ('style' in $$props) $$invalidate(10, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*padding*/4096) {
      $$invalidate(12, padding = padding || '10px');
    }
    if ($$self.$$.dirty & /*headerHeight*/2048) {
      $$invalidate(11, headerHeight = headerHeight || '2rem');
    }
    if ($$self.$$.dirty & /*headerHeight, padding*/6144) {
      $$invalidate(10, style = makeStyleVars({
        headerHeight: headerHeight,
        padding: padding
      }));
    }
  };
  return [title, bins, flags, geometry, message, selectedBins, theme, ticksFormatFn, height, width, style, headerHeight, padding, brushed_handler, brushend_handler, brushstart_handler, clicked_handler, entered_handler, exited_handler, main_elementresize_handler];
}
var ColorBinsDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ColorBinsDiv, _SvelteComponentDev);
  var _super = _createSuper(ColorBinsDiv);
  function ColorBinsDiv(options) {
    var _this;
    _classCallCheck(this, ColorBinsDiv);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      headerHeight: 11,
      padding: 12,
      title: 0,
      bins: 1,
      flags: 2,
      geometry: 3,
      message: 4,
      selectedBins: 5,
      theme: 6,
      ticksFormatFn: 7
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ColorBinsDiv",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }
  _createClass(ColorBinsDiv, [{
    key: "headerHeight",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padding",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bins",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flags",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "geometry",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedBins",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ticksFormatFn",
    get: function get() {
      throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return ColorBinsDiv;
}(SvelteComponentDev);
var ColorBinsDiv$1 = ColorBinsDiv;

export { CenteredView$1 as C, Globe$1 as G, LinkButton$1 as L, MessageView$1 as M, Square$1 as S, XorSelector$1 as X, _taggedTemplateLiteral as _, CheckSquare$1 as a, ChevronDown$1 as b, ChevronUp$1 as c, MinusSquare$1 as d, getValuesLength as e, exactAmountBins as f, getBinsTicks as g, areValidBins as h, getBinsItems as i, getBinsMax as j, getBinsMin as k, getBinsExtent as l, isNonEmptyBin as m, findFirstNonEmptyBinIndex as n, findLastNonEmptyBinIndex as o, getTrimmedBinsStats as p, getBinsTicksExtent as q, getNonEmptyBinsTicks as r, ColorBinsG$1 as s, ColorBinsDiv$1 as t, extent as u, vectorLength2D as v, pairs as w };
