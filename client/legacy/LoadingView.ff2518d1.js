import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, w as validate_slots, O as svg_element, P as claim_svg_element, l as children, h as detach_dev, n as attr_dev, p as add_location, r as insert_hydration_dev, v as noop, x as _createClass, Q as Icon, g as element, t as text, k as claim_element, m as claim_text, u as append_hydration_dev, a8 as set_data_dev, I as create_component, f as space, J as claim_component, j as claim_space, K as mount_component, E as _slicedToArray, A as transition_in, B as transition_out, L as destroy_component } from './client.50a99e71.js';

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "../../components/ui/src/icons/feather/Loader.svelte";

function create_fragment$1(ctx) {
  var line0;
  var line1;
  var line2;
  var line3;
  var line4;
  var line5;
  var line6;
  var line7;
  var block = {
    c: function create() {
      line0 = svg_element("line");
      line1 = svg_element("line");
      line2 = svg_element("line");
      line3 = svg_element("line");
      line4 = svg_element("line");
      line5 = svg_element("line");
      line6 = svg_element("line");
      line7 = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line0 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line0).forEach(detach_dev);
      line1 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line1).forEach(detach_dev);
      line2 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line2).forEach(detach_dev);
      line3 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line3).forEach(detach_dev);
      line4 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line4).forEach(detach_dev);
      line5 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line5).forEach(detach_dev);
      line6 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line6).forEach(detach_dev);
      line7 = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line7).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line0, "x1", "12");
      attr_dev(line0, "y1", "2");
      attr_dev(line0, "x2", "12");
      attr_dev(line0, "y2", "6");
      add_location(line0, file$1, 1, 0, 34);
      attr_dev(line1, "x1", "12");
      attr_dev(line1, "y1", "18");
      attr_dev(line1, "x2", "12");
      attr_dev(line1, "y2", "22");
      add_location(line1, file$1, 1, 43, 77);
      attr_dev(line2, "x1", "4.93");
      attr_dev(line2, "y1", "4.93");
      attr_dev(line2, "x2", "7.76");
      attr_dev(line2, "y2", "7.76");
      add_location(line2, file$1, 1, 88, 122);
      attr_dev(line3, "x1", "16.24");
      attr_dev(line3, "y1", "16.24");
      attr_dev(line3, "x2", "19.07");
      attr_dev(line3, "y2", "19.07");
      add_location(line3, file$1, 1, 141, 175);
      attr_dev(line4, "x1", "2");
      attr_dev(line4, "y1", "12");
      attr_dev(line4, "x2", "6");
      attr_dev(line4, "y2", "12");
      add_location(line4, file$1, 1, 198, 232);
      attr_dev(line5, "x1", "18");
      attr_dev(line5, "y1", "12");
      attr_dev(line5, "x2", "22");
      attr_dev(line5, "y2", "12");
      add_location(line5, file$1, 1, 241, 275);
      attr_dev(line6, "x1", "4.93");
      attr_dev(line6, "y1", "19.07");
      attr_dev(line6, "x2", "7.76");
      attr_dev(line6, "y2", "16.24");
      add_location(line6, file$1, 1, 286, 320);
      attr_dev(line7, "x1", "16.24");
      attr_dev(line7, "y1", "7.76");
      attr_dev(line7, "x2", "19.07");
      attr_dev(line7, "y2", "4.93");
      add_location(line7, file$1, 1, 341, 375);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line0, anchor);
      insert_hydration_dev(target, line1, anchor);
      insert_hydration_dev(target, line2, anchor);
      insert_hydration_dev(target, line3, anchor);
      insert_hydration_dev(target, line4, anchor);
      insert_hydration_dev(target, line5, anchor);
      insert_hydration_dev(target, line6, anchor);
      insert_hydration_dev(target, line7, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(line0);
      if (detaching) detach_dev(line1);
      if (detaching) detach_dev(line2);
      if (detaching) detach_dev(line3);
      if (detaching) detach_dev(line4);
      if (detaching) detach_dev(line5);
      if (detaching) detach_dev(line6);
      if (detaching) detach_dev(line7);
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

function instance$1($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('Loader', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Loader> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var Loader = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Loader, _SvelteComponentDev);

  var _super = _createSuper$1(Loader);

  function Loader(options) {
    var _this;

    _classCallCheck(this, Loader);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Loader",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  return Loader;
}(SvelteComponentDev);

var Loader$1 = Loader;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/ui/src/LoadingView.svelte"; // (31:1) {#if message}

function create_if_block(ctx) {
  var div;
  var span;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      span = element("span");
      t = text(
      /*message*/
      ctx[2]);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes,
      /*message*/
      ctx[2]);
      span_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file, 32, 3, 668);
      add_location(div, file, 31, 2, 659);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, span);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*message*/
      4) set_data_dev(t,
      /*message*/
      ctx[2]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(31:1) {#if message}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div1;
  var div0;
  var icon;
  var t;
  var current;
  icon = new Icon({
    props: {
      fill:
      /*fill*/
      ctx[0],
      glyph:
      /*glyph*/
      ctx[1],
      size:
      /*size*/
      ctx[3],
      stroke:
      /*stroke*/
      ctx[4],
      strokeWidth:
      /*strokeWidth*/
      ctx[5]
    },
    $$inline: true
  });
  var if_block =
  /*message*/
  ctx[2] && create_if_block(ctx);
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      create_component(icon.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(icon.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t = claim_space(div1_nodes);
      if (if_block) if_block.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "spinner svelte-8do3d8");
      add_location(div0, file, 21, 1, 539);
      attr_dev(div1, "class", "LoadingView svelte-8do3d8");
      add_location(div1, file, 20, 0, 512);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      append_hydration_dev(div1, div0);
      mount_component(icon, div0, null);
      append_hydration_dev(div1, t);
      if (if_block) if_block.m(div1, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var icon_changes = {};
      if (dirty &
      /*fill*/
      1) icon_changes.fill =
      /*fill*/
      ctx[0];
      if (dirty &
      /*glyph*/
      2) icon_changes.glyph =
      /*glyph*/
      ctx[1];
      if (dirty &
      /*size*/
      8) icon_changes.size =
      /*size*/
      ctx[3];
      if (dirty &
      /*stroke*/
      16) icon_changes.stroke =
      /*stroke*/
      ctx[4];
      if (dirty &
      /*strokeWidth*/
      32) icon_changes.strokeWidth =
      /*strokeWidth*/
      ctx[5];
      icon.$set(icon_changes);

      if (
      /*message*/
      ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
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
      if (detaching) detach_dev(div1);
      destroy_component(icon);
      if (if_block) if_block.d();
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('LoadingView', slots, []);
  var _$$props$fill = $$props.fill,
      fill = _$$props$fill === void 0 ? null : _$$props$fill;
  var _$$props$glyph = $$props.glyph,
      glyph = _$$props$glyph === void 0 ? Loader$1 : _$$props$glyph;
  var _$$props$message = $$props.message,
      message = _$$props$message === void 0 ? null : _$$props$message;
  var _$$props$size = $$props.size,
      size = _$$props$size === void 0 ? 50 : _$$props$size;
  var _$$props$stroke = $$props.stroke,
      stroke = _$$props$stroke === void 0 ? null : _$$props$stroke;
  var _$$props$strokeWidth = $$props.strokeWidth,
      strokeWidth = _$$props$strokeWidth === void 0 ? 0.75 : _$$props$strokeWidth;
  var writable_props = ['fill', 'glyph', 'message', 'size', 'stroke', 'strokeWidth'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<LoadingView> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ('message' in $$props) $$invalidate(2, message = $$props.message);
    if ('size' in $$props) $$invalidate(3, size = $$props.size);
    if ('stroke' in $$props) $$invalidate(4, stroke = $$props.stroke);
    if ('strokeWidth' in $$props) $$invalidate(5, strokeWidth = $$props.strokeWidth);
  };

  $$self.$capture_state = function () {
    return {
      Icon: Icon,
      Loader: Loader$1,
      fill: fill,
      glyph: glyph,
      message: message,
      size: size,
      stroke: stroke,
      strokeWidth: strokeWidth
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
    if ('message' in $$props) $$invalidate(2, message = $$props.message);
    if ('size' in $$props) $$invalidate(3, size = $$props.size);
    if ('stroke' in $$props) $$invalidate(4, stroke = $$props.stroke);
    if ('strokeWidth' in $$props) $$invalidate(5, strokeWidth = $$props.strokeWidth);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*fill*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, fill = fill || null);
    }

    if ($$self.$$.dirty &
    /*glyph*/
    2) {
      $$invalidate(1, glyph = glyph || Loader$1);
    }

    if ($$self.$$.dirty &
    /*message*/
    4) {
      $$invalidate(2, message = message || null);
    }

    if ($$self.$$.dirty &
    /*size*/
    8) {
      $$invalidate(3, size = size || 50);
    }

    if ($$self.$$.dirty &
    /*stroke*/
    16) {
      $$invalidate(4, stroke = stroke || null);
    }

    if ($$self.$$.dirty &
    /*strokeWidth*/
    32) {
      $$invalidate(5, strokeWidth = strokeWidth || 0.75);
    }
  };

  return [fill, glyph, message, size, stroke, strokeWidth];
}

var LoadingView = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LoadingView, _SvelteComponentDev);

  var _super = _createSuper(LoadingView);

  function LoadingView(options) {
    var _this;

    _classCallCheck(this, LoadingView);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      fill: 0,
      glyph: 1,
      message: 2,
      size: 3,
      stroke: 4,
      strokeWidth: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LoadingView",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(LoadingView, [{
    key: "fill",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "glyph",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "message",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "stroke",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "strokeWidth",
    get: function get() {
      throw new Error("<LoadingView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LoadingView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return LoadingView;
}(SvelteComponentDev);

var LoadingView$1 = LoadingView;

export { LoadingView$1 as L, Loader$1 as a };
