import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, y as _createClass, S as SvelteComponentDev, v as validate_slots, g as element, t as text, k as claim_element, l as children, m as claim_text, h as detach_dev, n as attr_dev, F as toggle_class, o as add_location, p as insert_dev, r as append_dev, H as listen_dev, x as _slicedToArray, u as noop$1, I as bubble, G as set_data_dev, J as empty, K as getContext, L as setContext, M as create_component, N as claim_component, O as mount_component, D as transition_in, E as transition_out, P as destroy_component, f as space, j as claim_space, Q as group_outros, R as check_outros, z as validate_each_argument, B as destroy_each, T as globals, U as null_to_empty, V as validate_each_keys, W as createEventDispatcher, X as beforeUpdate, Y as afterUpdate, Z as svg_element, $ as run_all, a0 as add_render_callback, a1 as add_resize_listener, a2 as update_keyed_each, a3 as binding_callbacks, a4 as destroy_block, a5 as createCommonjsModule, a6 as unwrapExports, w as _typeof, a7 as assign, q as query_selector_all, a8 as get_spread_update, a9 as get_spread_object } from './client.f552857e.js';
import { _ as _defineProperty, p as pipe, a as skipIf, i as isNil, b as pairs, m as mapWith, j as joinWithColon, c as joinWithSemicolon, d as _, e as isEqual, f as arrayMaxWith, g as arrayMinWith, h as getValue$2, k as merge, l as merge$1, u as updateKey, n as has, o as isNotNullWith, q as getPath, r as lookup, t as makeKeyed, v as setIn } from './_utils.324728ce.js';

var contextKey = {};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONArrow.svelte";

function create_fragment(ctx) {
  var div1;
  var div0;
  var t_value = "▶" + "";
  var t;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      t = text(t_value);
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
      t = claim_text(div0_nodes, t_value);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "arrow svelte-1vyml86");
      toggle_class(div0, "expanded",
      /*expanded*/
      ctx[0]);
      add_location(div0, file, 29, 2, 622);
      attr_dev(div1, "class", "container svelte-1vyml86");
      add_location(div1, file, 28, 0, 587);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, t);

      if (!mounted) {
        dispose = listen_dev(div1, "click",
        /*click_handler*/
        ctx[1], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(div0, "expanded",
        /*expanded*/
        ctx[0]);
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
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var expanded = $$props.expanded;
  var writable_props = ["expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONArrow> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONArrow", $$slots, []);

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$props) {
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      expanded: expanded
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [expanded, click_handler];
}

var JSONArrow = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONArrow, _SvelteComponentDev);

  var _super = _createSuper(JSONArrow);

  function JSONArrow(options) {
    var _this;

    _classCallCheck(this, JSONArrow);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      expanded: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONArrow",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*expanded*/
    ctx[0] === undefined && !("expanded" in props)) {
      console.warn("<JSONArrow> was created without expected prop 'expanded'");
    }

    return _this;
  }

  _createClass(JSONArrow, [{
    key: "expanded",
    get: function get() {
      throw new Error("<JSONArrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONArrow;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONKey.svelte"; // (16:0) {#if showKey && key}

function create_if_block(ctx) {
  var label;
  var span;
  var t0;
  var t1;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      label = element("label");
      span = element("span");
      t0 = text(
      /*key*/
      ctx[0]);
      t1 = text(
      /*colon*/
      ctx[2]);
      this.h();
    },
    l: function claim(nodes) {
      label = claim_element(nodes, "LABEL", {
        class: true
      });
      var label_nodes = children(label);
      span = claim_element(label_nodes, "SPAN", {});
      var span_nodes = children(span);
      t0 = claim_text(span_nodes,
      /*key*/
      ctx[0]);
      t1 = claim_text(span_nodes,
      /*colon*/
      ctx[2]);
      span_nodes.forEach(detach_dev);
      label_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$1, 17, 4, 399);
      attr_dev(label, "class", "svelte-1vlbacg");
      toggle_class(label, "spaced",
      /*isParentExpanded*/
      ctx[1]);
      add_location(label, file$1, 16, 2, 346);
    },
    m: function mount(target, anchor) {
      insert_dev(target, label, anchor);
      append_dev(label, span);
      append_dev(span, t0);
      append_dev(span, t1);

      if (!mounted) {
        dispose = listen_dev(label, "click",
        /*click_handler*/
        ctx[5], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*key*/
      1) set_data_dev(t0,
      /*key*/
      ctx[0]);
      if (dirty &
      /*colon*/
      4) set_data_dev(t1,
      /*colon*/
      ctx[2]);

      if (dirty &
      /*isParentExpanded*/
      2) {
        toggle_class(label, "spaced",
        /*isParentExpanded*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(label);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(16:0) {#if showKey && key}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var if_block_anchor;
  var if_block =
  /*showKey*/
  ctx[3] &&
  /*key*/
  ctx[0] && create_if_block(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*showKey*/
      ctx[3] &&
      /*key*/
      ctx[0]) {
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
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var key = $$props.key,
      isParentExpanded = $$props.isParentExpanded,
      _$$props$isParentArra = $$props.isParentArray,
      isParentArray = _$$props$isParentArra === void 0 ? false : _$$props$isParentArra,
      _$$props$colon = $$props.colon,
      colon = _$$props$colon === void 0 ? ":" : _$$props$colon;
  var writable_props = ["key", "isParentExpanded", "isParentArray", "colon"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONKey> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONKey", $$slots, []);

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
  };

  $$self.$capture_state = function () {
    return {
      key: key,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      colon: colon,
      showKey: showKey
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
    if ("showKey" in $$props) $$invalidate(3, showKey = $$props.showKey);
  };

  var showKey;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*isParentExpanded, isParentArray, key*/
    19) {
       $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
    }
  };

  return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

var JSONKey = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONKey, _SvelteComponentDev);

  var _super = _createSuper$1(JSONKey);

  function JSONKey(options) {
    var _this;

    _classCallCheck(this, JSONKey);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      key: 0,
      isParentExpanded: 1,
      isParentArray: 4,
      colon: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONKey",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONKey> was created without expected prop 'key'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONKey> was created without expected prop 'isParentExpanded'");
    }

    return _this;
  }

  _createClass(JSONKey, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colon",
    get: function get() {
      throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONKey;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$2 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONNested.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[20] = i;
  return child_ctx;
} // (57:4) {#if expandable && isParentExpanded}


function create_if_block_3(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    },
    $$inline: true
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[15]);
  var block = {
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
      var jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
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
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(57:4) {#if expandable && isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (75:4) {:else}


function create_else_block(ctx) {
  var span;
  var t;
  var block = {
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
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(75:4) {:else}",
    ctx: ctx
  });
  return block;
} // (63:4) {#if isParentExpanded}


function create_if_block$1(ctx) {
  var ul;
  var t;
  var current;
  var mounted;
  var dispose;
  var each_value =
  /*slicedKeys*/
  ctx[13];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block =
  /*slicedKeys*/
  ctx[13].length <
  /*previewKeys*/
  ctx[7].length && create_if_block_1(ctx);
  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }

      t = claim_space(ul_nodes);
      if (if_block) if_block.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-rwxv37");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
      add_location(ul, file$2, 63, 6, 1589);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }

      append_dev(ul, t);
      if (if_block) if_block.m(ul, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(ul, "click",
        /*expand*/
        ctx[16], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/
      10129) {
        each_value =
        /*slicedKeys*/
        ctx[13];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(ul, t);
          }
        }

        group_outros();

        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }

      if (
      /*slicedKeys*/
      ctx[13].length <
      /*previewKeys*/
      ctx[7].length) {
        if (if_block) ; else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(ul, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
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
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(63:4) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (67:10) {#if !expanded && index < previewKeys.length - 1}


function create_if_block_2(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(",");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
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
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(67:10) {#if !expanded && index < previewKeys.length - 1}",
    ctx: ctx
  });
  return block;
} // (65:8) {#each slicedKeys as key, index}


function create_each_block(ctx) {
  var jsonnode;
  var t;
  var if_block_anchor;
  var current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]),
      isParentExpanded:
      /*expanded*/
      ctx[0],
      isParentArray:
      /*isArray*/
      ctx[4],
      value:
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12])
    },
    $$inline: true
  });
  var if_block = !
  /*expanded*/
  ctx[0] &&
  /*index*/
  ctx[20] <
  /*previewKeys*/
  ctx[7].length - 1 && create_if_block_2(ctx);
  var block = {
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
      var jsonnode_changes = {};
      if (dirty &
      /*getKey, slicedKeys*/
      8448) jsonnode_changes.key =
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]);
      if (dirty &
      /*expanded*/
      1) jsonnode_changes.isParentExpanded =
      /*expanded*/
      ctx[0];
      if (dirty &
      /*isArray*/
      16) jsonnode_changes.isParentArray =
      /*isArray*/
      ctx[4];
      if (dirty &
      /*expanded, getValue, slicedKeys, getPreviewValue*/
      9729) jsonnode_changes.value =
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12]);
      jsonnode.$set(jsonnode_changes);

      if (!
      /*expanded*/
      ctx[0] &&
      /*index*/
      ctx[20] <
      /*previewKeys*/
      ctx[7].length - 1) {
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
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(65:8) {#each slicedKeys as key, index}",
    ctx: ctx
  });
  return block;
} // (71:8) {#if slicedKeys.length < previewKeys.length }


function create_if_block_1(ctx) {
  var span;
  var t;
  var block = {
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
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(71:8) {#if slicedKeys.length < previewKeys.length }",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var li;
  var label_1;
  var t0;
  var jsonkey;
  var t1;
  var span1;
  var span0;
  var t2;
  var t3;
  var t4;
  var current_block_type_index;
  var if_block1;
  var t5;
  var span2;
  var t6;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*expandable*/
  ctx[11] &&
  /*isParentExpanded*/
  ctx[2] && create_if_block_3(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[12],
      colon:
      /*context*/
      ctx[14].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3]
    },
    $$inline: true
  });
  jsonkey.$on("click",
  /*toggleExpand*/
  ctx[15]);
  var if_block_creators = [create_if_block$1, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*isParentExpanded*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      li = element("li");
      label_1 = element("label");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span1 = element("span");
      span0 = element("span");
      t2 = text(
      /*label*/
      ctx[1]);
      t3 = text(
      /*bracketOpen*/
      ctx[5]);
      t4 = space();
      if_block1.c();
      t5 = space();
      span2 = element("span");
      t6 = text(
      /*bracketClose*/
      ctx[6]);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      label_1 = claim_element(li_nodes, "LABEL", {
        class: true
      });
      var label_1_nodes = children(label_1);
      if (if_block0) if_block0.l(label_1_nodes);
      t0 = claim_space(label_1_nodes);
      claim_component(jsonkey.$$.fragment, label_1_nodes);
      t1 = claim_space(label_1_nodes);
      span1 = claim_element(label_1_nodes, "SPAN", {});
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", {});
      var span0_nodes = children(span0);
      t2 = claim_text(span0_nodes,
      /*label*/
      ctx[1]);
      span0_nodes.forEach(detach_dev);
      t3 = claim_text(span1_nodes,
      /*bracketOpen*/
      ctx[5]);
      span1_nodes.forEach(detach_dev);
      label_1_nodes.forEach(detach_dev);
      t4 = claim_space(li_nodes);
      if_block1.l(li_nodes);
      t5 = claim_space(li_nodes);
      span2 = claim_element(li_nodes, "SPAN", {});
      var span2_nodes = children(span2);
      t6 = claim_text(span2_nodes,
      /*bracketClose*/
      ctx[6]);
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
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[2]);
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
        dispose = listen_dev(span1, "click",
        /*toggleExpand*/
        ctx[15], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*expandable*/
      ctx[11] &&
      /*isParentExpanded*/
      ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*expandable, isParentExpanded*/
          2052) {
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
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      4096) jsonkey_changes.key =
      /*key*/
      ctx[12];
      if (dirty &
      /*isParentExpanded*/
      4) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (!current || dirty &
      /*label*/
      2) set_data_dev(t2,
      /*label*/
      ctx[1]);
      if (!current || dirty &
      /*bracketOpen*/
      32) set_data_dev(t3,
      /*bracketOpen*/
      ctx[5]);
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
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        }

        transition_in(if_block1, 1);
        if_block1.m(li, t5);
      }

      if (!current || dirty &
      /*bracketClose*/
      64) set_data_dev(t6,
      /*bracketClose*/
      ctx[6]);

      if (dirty &
      /*isParentExpanded*/
      4) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[2]);
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
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var key = $$props.key,
      keys = $$props.keys,
      _$$props$colon = $$props.colon,
      colon = _$$props$colon === void 0 ? ":" : _$$props$colon,
      _$$props$label = $$props.label,
      label = _$$props$label === void 0 ? "" : _$$props$label,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      _$$props$isArray = $$props.isArray,
      isArray = _$$props$isArray === void 0 ? false : _$$props$isArray,
      bracketOpen = $$props.bracketOpen,
      bracketClose = $$props.bracketClose;
  var _$$props$previewKeys = $$props.previewKeys,
      previewKeys = _$$props$previewKeys === void 0 ? keys : _$$props$previewKeys;
  var _$$props$getKey = $$props.getKey,
      getKey = _$$props$getKey === void 0 ? function (key) {
    return key;
  } : _$$props$getKey;
  var _$$props$getValue = $$props.getValue,
      getValue = _$$props$getValue === void 0 ? function (key) {
    return key;
  } : _$$props$getValue;
  var _$$props$getPreviewVa = $$props.getPreviewValue,
      getPreviewValue = _$$props$getPreviewVa === void 0 ? getValue : _$$props$getPreviewVa;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded,
      _$$props$expandable = $$props.expandable,
      expandable = _$$props$expandable === void 0 ? true : _$$props$expandable;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread(_objectSpread({}, context), {}, {
    colon: colon
  }));

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  function expand() {
    $$invalidate(0, expanded = true);
  }

  var writable_props = ["key", "keys", "colon", "label", "isParentExpanded", "isParentArray", "isArray", "bracketOpen", "bracketClose", "previewKeys", "getKey", "getValue", "getPreviewValue", "expanded", "expandable"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONNested> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONNested", $$slots, []);

  $$self.$set = function ($$props) {
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

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      contextKey: contextKey,
      JSONArrow: JSONArrow,
      JSONNode: JSONNode,
      JSONKey: JSONKey,
      key: key,
      keys: keys,
      colon: colon,
      label: label,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      isArray: isArray,
      bracketOpen: bracketOpen,
      bracketClose: bracketClose,
      previewKeys: previewKeys,
      getKey: getKey,
      getValue: getValue,
      getPreviewValue: getPreviewValue,
      expanded: expanded,
      expandable: expandable,
      context: context,
      toggleExpand: toggleExpand,
      expand: expand,
      slicedKeys: slicedKeys
    };
  };

  $$self.$inject_state = function ($$props) {
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

  var slicedKeys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*isParentExpanded*/
    4) {
       if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }

    if ($$self.$$.dirty &
    /*expanded, keys, previewKeys*/
    131201) {
       $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
    }
  };

  return [expanded, label, isParentExpanded, isParentArray, isArray, bracketOpen, bracketClose, previewKeys, getKey, getValue, getPreviewValue, expandable, key, slicedKeys, context, toggleExpand, expand, keys, colon];
}

var JSONNested = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONNested, _SvelteComponentDev);

  var _super = _createSuper$2(JSONNested);

  function JSONNested(options) {
    var _this;

    _classCallCheck(this, JSONNested);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
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
      component: _assertThisInitialized(_this),
      tagName: "JSONNested",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[12] === undefined && !("key" in props)) {
      console.warn("<JSONNested> was created without expected prop 'key'");
    }

    if (
    /*keys*/
    ctx[17] === undefined && !("keys" in props)) {
      console.warn("<JSONNested> was created without expected prop 'keys'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONNested> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONNested> was created without expected prop 'isParentArray'");
    }

    if (
    /*bracketOpen*/
    ctx[5] === undefined && !("bracketOpen" in props)) {
      console.warn("<JSONNested> was created without expected prop 'bracketOpen'");
    }

    if (
    /*bracketClose*/
    ctx[6] === undefined && !("bracketClose" in props)) {
      console.warn("<JSONNested> was created without expected prop 'bracketClose'");
    }

    return _this;
  }

  _createClass(JSONNested, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keys",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colon",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isArray",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bracketOpen",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "bracketClose",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "previewKeys",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getKey",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getValue",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getPreviewValue",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expandable",
    get: function get() {
      throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONNested;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;

function create_fragment$3(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label: "" + (
      /*nodeType*/
      ctx[3] + " "),
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.previewKeys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*nodeType*/
      8) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + " ");
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
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType", "expanded"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONObjectNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONObjectNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(7, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      expanded: expanded,
      getValue: getValue,
      keys: keys
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(7, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
    if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
  };

  var keys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    128) {
       $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, expanded, keys, getValue, value];
}

var JSONObjectNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONObjectNode, _SvelteComponentDev);

  var _super = _createSuper$3(JSONObjectNode);

  function JSONObjectNode(options) {
    var _this;

    _classCallCheck(this, JSONObjectNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      key: 0,
      value: 7,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONObjectNode",
      options: options,
      id: create_fragment$3.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[7] === undefined && !("value" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONObjectNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONObjectNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONObjectNode;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1$1 = globals.Object;

function create_fragment$4(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      isArray: true,
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*previewKeys*/
      ctx[6],
      getValue:
      /*getValue*/
      ctx[7],
      label: "Array(" +
      /*value*/
      ctx[1].length + ")",
      bracketOpen: "[",
      bracketClose: "]"
    },
    $$inline: true
  });
  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*previewKeys*/
      64) jsonnested_changes.previewKeys =
      /*previewKeys*/
      ctx[6];
      if (dirty &
      /*value*/
      2) jsonnested_changes.label = "Array(" +
      /*value*/
      ctx[1].length + ")";
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
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var filteredKey = new Set(["length"]);

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object_1$1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONArrayNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONArrayNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      filteredKey: filteredKey,
      getValue: getValue,
      keys: keys,
      previewKeys: previewKeys
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
    if ("keys" in $$props) $$invalidate(5, keys = $$props.keys);
    if ("previewKeys" in $$props) $$invalidate(6, previewKeys = $$props.previewKeys);
  };

  var keys;
  var previewKeys;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    2) {
       $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }

    if ($$self.$$.dirty &
    /*keys*/
    32) {
       $$invalidate(6, previewKeys = keys.filter(function (key) {
        return !filteredKey.has(key);
      }));
    }
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, previewKeys, getValue];
}

var JSONArrayNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONArrayNode, _SvelteComponentDev);

  var _super = _createSuper$4(JSONArrayNode);

  function JSONArrayNode(options) {
    var _this;

    _classCallCheck(this, JSONArrayNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONArrayNode",
      options: options,
      id: create_fragment$4.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONArrayNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONArrayNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONArrayNode;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function create_fragment$5(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey,
      getValue: getValue,
      isArray: true,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
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
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function getKey(key) {
  return String(key[0]);
}

function getValue(key) {
  return key[1];
}

function instance$5($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var keys = [];
  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONIterableArrayNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONIterableArrayNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      keys: keys,
      getKey: getKey,
      getValue: getValue
    };
  };

  $$self.$inject_state = function ($$props) {
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

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    32) {
       {
        var result = [];
        var i = 0;

        var _iterator = _createForOfIteratorHelper(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            result.push([i++, entry]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

var JSONIterableArrayNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONIterableArrayNode, _SvelteComponentDev);

  var _super = _createSuper$5(JSONIterableArrayNode);

  function JSONIterableArrayNode(options) {
    var _this;

    _classCallCheck(this, JSONIterableArrayNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONIterableArrayNode",
      options: options,
      id: create_fragment$5.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[5] === undefined && !("value" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONIterableArrayNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONIterableArrayNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONIterableArrayNode;
}(SvelteComponentDev);

var MapEntry = function MapEntry(key, value) {
  _classCallCheck(this, MapEntry);

  this.key = key;
  this.value = value;
};

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function create_fragment$6(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey$1,
      getValue: getValue$1,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      colon: "",
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
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
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function getKey$1(entry) {
  return entry[0];
}

function getValue$1(entry) {
  return entry[1];
}

function instance$6($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;
  var keys = [];
  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONIterableMapNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONIterableMapNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      MapEntry: MapEntry,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      keys: keys,
      getKey: getKey$1,
      getValue: getValue$1
    };
  };

  $$self.$inject_state = function ($$props) {
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

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    32) {
       {
        var result = [];
        var i = 0;

        var _iterator = _createForOfIteratorHelper$1(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            result.push([i++, new MapEntry(entry[0], entry[1])]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

var JSONIterableMapNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONIterableMapNode, _SvelteComponentDev);

  var _super = _createSuper$6(JSONIterableMapNode);

  function JSONIterableMapNode(options) {
    var _this;

    _classCallCheck(this, JSONIterableMapNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONIterableMapNode",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[5] === undefined && !("value" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[1] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[2] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[3] === undefined && !("nodeType" in props)) {
      console.warn("<JSONIterableMapNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONIterableMapNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONIterableMapNode;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment$7(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      key:
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key,
      keys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label:
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ",
      bracketOpen: "{",
      bracketClose: "}"
    },
    $$inline: true
  });
  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnested_changes = {};
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*isParentExpanded, key, value*/
      7) jsonnested_changes.key =
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key;
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.label =
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ";
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
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var keys = ["key", "value"];

  function getValue(key) {
    return value[key];
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONMapEntryNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONMapEntryNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      JSONNested: JSONNested,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      keys: keys,
      getValue: getValue
    };
  };

  $$self.$inject_state = function ($$props) {
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

var JSONMapEntryNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONMapEntryNode, _SvelteComponentDev);

  var _super = _createSuper$7(JSONMapEntryNode);

  function JSONMapEntryNode(options) {
    var _this;

    _classCallCheck(this, JSONMapEntryNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONMapEntryNode",
      options: options,
      id: create_fragment$7.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONMapEntryNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONMapEntryNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONMapEntryNode;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/JSONValueNode.svelte";

function create_fragment$8(ctx) {
  var li;
  var jsonkey;
  var t0;
  var span;
  var t1_value = (
  /*valueGetter*/
  ctx[2] ?
  /*valueGetter*/
  ctx[2](
  /*value*/
  ctx[1]) :
  /*value*/
  ctx[1]) + "";
  var t1;
  var span_class_value;
  var current;
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[0],
      colon:
      /*colon*/
      ctx[6],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      claim_component(jsonkey.$$.fragment, li_nodes);
      t0 = claim_space(li_nodes);
      span = claim_element(li_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, t1_value);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"));
      add_location(span, file$3, 47, 2, 948);
      attr_dev(li, "class", "svelte-3bjyvl");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      1) jsonkey_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*valueGetter, value*/
      6) && t1_value !== (t1_value = (
      /*valueGetter*/
      ctx[2] ?
      /*valueGetter*/
      ctx[2](
      /*value*/
      ctx[1]) :
      /*value*/
      ctx[1]) + "")) set_data_dev(t1, t1_value);

      if (!current || dirty &
      /*nodeType*/
      32 && span_class_value !== (span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"))) {
        attr_dev(span, "class", span_class_value);
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
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
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      _$$props$valueGetter = $$props.valueGetter,
      valueGetter = _$$props$valueGetter === void 0 ? null : _$$props$valueGetter,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray,
      nodeType = $$props.nodeType;

  var _getContext = getContext(contextKey),
      colon = _getContext.colon;

  var writable_props = ["key", "value", "valueGetter", "isParentExpanded", "isParentArray", "nodeType"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONValueNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONValueNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      contextKey: contextKey,
      JSONKey: JSONKey,
      key: key,
      value: value,
      valueGetter: valueGetter,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      nodeType: nodeType,
      colon: colon
    };
  };

  $$self.$inject_state = function ($$props) {
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

var JSONValueNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONValueNode, _SvelteComponentDev);

  var _super = _createSuper$8(JSONValueNode);

  function JSONValueNode(options) {
    var _this;

    _classCallCheck(this, JSONValueNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      key: 0,
      value: 1,
      valueGetter: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      nodeType: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONValueNode",
      options: options,
      id: create_fragment$8.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[3] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[4] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'isParentArray'");
    }

    if (
    /*nodeType*/
    ctx[5] === undefined && !("nodeType" in props)) {
      console.warn("<JSONValueNode> was created without expected prop 'nodeType'");
    }

    return _this;
  }

  _createClass(JSONValueNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "valueGetter",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nodeType",
    get: function get() {
      throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONValueNode;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$4 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/ErrorNode.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
} // (40:2) {#if isParentExpanded}


function create_if_block_2$1(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    },
    $$inline: true
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[7]);
  var block = {
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
      var jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
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
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(40:2) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (45:2) {#if isParentExpanded}


function create_if_block$2(ctx) {
  var ul;
  var current;
  var if_block =
  /*expanded*/
  ctx[0] && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      ul = element("ul");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      if (if_block) if_block.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-1ca3gb2");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
      add_location(ul, file$4, 45, 4, 1134);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);
      if (if_block) if_block.m(ul, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*expanded*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*expanded*/
          1) {
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
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
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
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(45:2) {#if isParentExpanded}",
    ctx: ctx
  });
  return block;
} // (47:6) {#if expanded}


function create_if_block_1$1(ctx) {
  var jsonnode;
  var t0;
  var li;
  var jsonkey;
  var t1;
  var span;
  var current;
  jsonnode = new JSONNode({
    props: {
      key: "message",
      value:
      /*value*/
      ctx[2].message
    },
    $$inline: true
  });
  jsonkey = new JSONKey({
    props: {
      key: "stack",
      colon: ":",
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3]
    },
    $$inline: true
  });
  var each_value =
  /*stack*/
  ctx[5];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      create_component(jsonnode.$$.fragment);
      t0 = space();
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      claim_component(jsonnode.$$.fragment, nodes);
      t0 = claim_space(nodes);
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      claim_component(jsonkey.$$.fragment, li_nodes);
      t1 = claim_space(li_nodes);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(span_nodes);
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

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(span, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      var jsonnode_changes = {};
      if (dirty &
      /*value*/
      4) jsonnode_changes.value =
      /*value*/
      ctx[2].message;
      jsonnode.$set(jsonnode_changes);
      var jsonkey_changes = {};
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);

      if (dirty &
      /*stack*/
      32) {
        each_value =
        /*stack*/
        ctx[5];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(span, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
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
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(47:6) {#if expanded}",
    ctx: ctx
  });
  return block;
} // (52:12) {#each stack as line, index}


function create_each_block$1(ctx) {
  var span;
  var t_value =
  /*line*/
  ctx[8] + "";
  var t;
  var br;
  var block = {
    c: function create() {
      span = element("span");
      t = text(t_value);
      br = element("br");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      br = claim_element(nodes, "BR", {});
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-1ca3gb2");
      toggle_class(span, "indent",
      /*index*/
      ctx[10] > 0);
      add_location(span, file$4, 52, 14, 1392);
      add_location(br, file$4, 52, 58, 1436);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
      insert_dev(target, br, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*stack*/
      32 && t_value !== (t_value =
      /*line*/
      ctx[8] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (detaching) detach_dev(br);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(52:12) {#each stack as line, index}",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var li;
  var t0;
  var jsonkey;
  var t1;
  var span;
  var t2;
  var t3_value = (
  /*expanded*/
  ctx[0] ? "" :
  /*value*/
  ctx[2].message) + "";
  var t3;
  var t4;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*isParentExpanded*/
  ctx[3] && create_if_block_2$1(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[1],
      colon:
      /*context*/
      ctx[6].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    },
    $$inline: true
  });
  var if_block1 =
  /*isParentExpanded*/
  ctx[3] && create_if_block$2(ctx);
  var block = {
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
      li = claim_element(nodes, "LI", {
        class: true
      });
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
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
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
        dispose = listen_dev(span, "click",
        /*toggleExpand*/
        ctx[7], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
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
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var jsonkey_changes = {};
      if (dirty &
      /*key*/
      2) jsonkey_changes.key =
      /*key*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*expanded, value*/
      5) && t3_value !== (t3_value = (
      /*expanded*/
      ctx[0] ? "" :
      /*value*/
      ctx[2].message) + "")) set_data_dev(t3, t3_value);

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
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
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
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
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;
  var _$$props$expanded = $$props.expanded,
      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread$1(_objectSpread$1({}, context), {}, {
    colon: ":"
  }));

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray", "expanded"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ErrorNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ErrorNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(1, key = $$props.key);
    if ("value" in $$props) $$invalidate(2, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      contextKey: contextKey,
      JSONArrow: JSONArrow,
      JSONNode: JSONNode,
      JSONKey: JSONKey,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      expanded: expanded,
      context: context,
      toggleExpand: toggleExpand,
      stack: stack
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(1, key = $$props.key);
    if ("value" in $$props) $$invalidate(2, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ("stack" in $$props) $$invalidate(5, stack = $$props.stack);
  };

  var stack;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    4) {
       $$invalidate(5, stack = value.stack.split("\n"));
    }

    if ($$self.$$.dirty &
    /*isParentExpanded*/
    8) {
       if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
  };

  return [expanded, key, value, isParentExpanded, isParentArray, stack, context, toggleExpand];
}

var ErrorNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ErrorNode, _SvelteComponentDev);

  var _super = _createSuper$9(ErrorNode);

  function ErrorNode(options) {
    var _this;

    _classCallCheck(this, ErrorNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      key: 1,
      value: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      expanded: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ErrorNode",
      options: options,
      id: create_fragment$9.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[1] === undefined && !("key" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[2] === undefined && !("value" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[3] === undefined && !("isParentExpanded" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[4] === undefined && !("isParentArray" in props)) {
      console.warn("<ErrorNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(ErrorNode, [{
    key: "key",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "expanded",
    get: function get() {
      throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ErrorNode;
}(SvelteComponentDev);

function objType(obj) {
  var type = Object.prototype.toString.call(obj).slice(8, -1);

  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }

    return obj.constructor.name;
  }

  return type;
}

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment$a(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_value =
  /*componentType*/
  ctx[5];

  function switch_props(ctx) {
    return {
      props: {
        key:
        /*key*/
        ctx[0],
        value:
        /*value*/
        ctx[1],
        isParentExpanded:
        /*isParentExpanded*/
        ctx[2],
        isParentArray:
        /*isParentArray*/
        ctx[3],
        nodeType:
        /*nodeType*/
        ctx[4],
        valueGetter:
        /*valueGetter*/
        ctx[6]
      },
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  var block = {
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = {};
      if (dirty &
      /*key*/
      1) switch_instance_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) switch_instance_changes.value =
      /*value*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      4) switch_instance_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) switch_instance_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*nodeType*/
      16) switch_instance_changes.nodeType =
      /*nodeType*/
      ctx[4];
      if (dirty &
      /*valueGetter*/
      64) switch_instance_changes.valueGetter =
      /*valueGetter*/
      ctx[6];

      if (switch_value !== (switch_value =
      /*componentType*/
      ctx[5])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
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
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var key = $$props.key,
      value = $$props.value,
      isParentExpanded = $$props.isParentExpanded,
      isParentArray = $$props.isParentArray;

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
        return typeof value.set === "function" ? JSONIterableMapNode : JSONIterableArrayNode;

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
        return function (raw) {
          return "\"".concat(raw, "\"");
        };

      case "Boolean":
        return function (raw) {
          return raw ? "true" : "false";
        };

      case "Date":
        return function (raw) {
          return raw.toISOString();
        };

      case "Null":
        return function () {
          return "null";
        };

      case "Undefined":
        return function () {
          return "undefined";
        };

      case "Function":
      case "Symbol":
        return function (raw) {
          return raw.toString();
        };

      default:
        return function () {
          return "<".concat(nodeType, ">");
        };
    }
  }

  var writable_props = ["key", "value", "isParentExpanded", "isParentArray"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<JSONNode> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("JSONNode", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
  };

  $$self.$capture_state = function () {
    return {
      JSONObjectNode: JSONObjectNode,
      JSONArrayNode: JSONArrayNode,
      JSONIterableArrayNode: JSONIterableArrayNode,
      JSONIterableMapNode: JSONIterableMapNode,
      JSONMapEntryNode: JSONMapEntryNode,
      JSONValueNode: JSONValueNode,
      ErrorNode: ErrorNode,
      objType: objType,
      key: key,
      value: value,
      isParentExpanded: isParentExpanded,
      isParentArray: isParentArray,
      getComponent: getComponent,
      getValueGetter: getValueGetter,
      nodeType: nodeType,
      componentType: componentType,
      valueGetter: valueGetter
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(4, nodeType = $$props.nodeType);
    if ("componentType" in $$props) $$invalidate(5, componentType = $$props.componentType);
    if ("valueGetter" in $$props) $$invalidate(6, valueGetter = $$props.valueGetter);
  };

  var nodeType;
  var componentType;
  var valueGetter;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*value*/
    2) {
       $$invalidate(4, nodeType = objType(value));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
       $$invalidate(5, componentType = getComponent(nodeType));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
       $$invalidate(6, valueGetter = getValueGetter(nodeType));
    }
  };

  return [key, value, isParentExpanded, isParentArray, nodeType, componentType, valueGetter];
}

var JSONNode = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(JSONNode, _SvelteComponentDev);

  var _super = _createSuper$a(JSONNode);

  function JSONNode(options) {
    var _this;

    _classCallCheck(this, JSONNode);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "JSONNode",
      options: options,
      id: create_fragment$a.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*key*/
    ctx[0] === undefined && !("key" in props)) {
      console.warn("<JSONNode> was created without expected prop 'key'");
    }

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<JSONNode> was created without expected prop 'value'");
    }

    if (
    /*isParentExpanded*/
    ctx[2] === undefined && !("isParentExpanded" in props)) {
      console.warn("<JSONNode> was created without expected prop 'isParentExpanded'");
    }

    if (
    /*isParentArray*/
    ctx[3] === undefined && !("isParentArray" in props)) {
      console.warn("<JSONNode> was created without expected prop 'isParentArray'");
    }

    return _this;
  }

  _createClass(JSONNode, [{
    key: "key",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentExpanded",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isParentArray",
    get: function get() {
      throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return JSONNode;
}(SvelteComponentDev);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "Users/lbonavita/Dev/projects/nesta/svizzle/node_modules/svelte-json-tree/src/Root.svelte";

function create_fragment$b(ctx) {
  var ul;
  var jsonnode;
  var current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*key*/
      ctx[0],
      value:
      /*value*/
      ctx[1],
      isParentExpanded: true,
      isParentArray: false
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      ul = element("ul");
      create_component(jsonnode.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
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
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var jsonnode_changes = {};
      if (dirty &
      /*key*/
      1) jsonnode_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) jsonnode_changes.value =
      /*value*/
      ctx[1];
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
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$b($$self, $$props, $$invalidate) {
  setContext(contextKey, {});
  var _$$props$key = $$props.key,
      key = _$$props$key === void 0 ? "" : _$$props$key,
      value = $$props.value;
  var writable_props = ["key", "value"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Root> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Root", $$slots, []);

  $$self.$set = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  $$self.$capture_state = function () {
    return {
      JSONNode: JSONNode,
      setContext: setContext,
      contextKey: contextKey,
      key: key,
      value: value
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [key, value];
}

var Root = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Root, _SvelteComponentDev);

  var _super = _createSuper$b(Root);

  function Root(options) {
    var _this;

    _classCallCheck(this, Root);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      key: 0,
      value: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Root",
      options: options,
      id: create_fragment$b.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*value*/
    ctx[1] === undefined && !("value" in props)) {
      console.warn("<Root> was created without expected prop 'value'");
    }

    return _this;
  }

  _createClass(Root, [{
    key: "key",
    get: function get() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Root;
}(SvelteComponentDev);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "src/node_modules/app/components/Elements.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i].tag;
  child_ctx[2] = list[i].content;
  return child_ctx;
} // (8:25) 


function create_if_block_1$2(ctx) {
  var pre;
  var t_value =
  /*content*/
  ctx[2] + "";
  var t;
  var block = {
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
      if (dirty &
      /*elements*/
      1 && t_value !== (t_value =
      /*content*/
      ctx[2] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(8:25) ",
    ctx: ctx
  });
  return block;
} // (6:1) {#if tag === 'p'}


function create_if_block$3(ctx) {
  var p;
  var t_value =
  /*content*/
  ctx[2] + "";
  var t;
  var block = {
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
      if (dirty &
      /*elements*/
      1 && t_value !== (t_value =
      /*content*/
      ctx[2] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(6:1) {#if tag === 'p'}",
    ctx: ctx
  });
  return block;
} // (5:0) {#each elements as {tag, content}}


function create_each_block$2(ctx) {
  var if_block_anchor;

  function select_block_type(ctx, dirty) {
    if (
    /*tag*/
    ctx[1] === "p") return create_if_block$3;
    if (
    /*tag*/
    ctx[1] === "pre") return create_if_block_1$2;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type && current_block_type(ctx);
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
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(5:0) {#each elements as {tag, content}}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var each_1_anchor;
  var each_value =
  /*elements*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*elements*/
      1) {
        each_value =
        /*elements*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$2(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
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
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$c($$self, $$props, $$invalidate) {
  var elements = $$props.elements;
  var writable_props = ["elements"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Elements> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Elements", $$slots, []);

  $$self.$set = function ($$props) {
    if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
  };

  $$self.$capture_state = function () {
    return {
      elements: elements
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("elements" in $$props) $$invalidate(0, elements = $$props.elements);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [elements];
}

var Elements = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Elements, _SvelteComponentDev);

  var _super = _createSuper$c(Elements);

  function Elements(options) {
    var _this;

    _classCallCheck(this, Elements);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      elements: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Elements",
      options: options,
      id: create_fragment$c.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*elements*/
    ctx[0] === undefined && !("elements" in props)) {
      console.warn("<Elements> was created without expected prop 'elements'");
    }

    return _this;
  }

  _createClass(Elements, [{
    key: "elements",
    get: function get() {
      throw new Error("<Elements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Elements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Elements;
}(SvelteComponentDev);

function linear(domain, range) {
  var d0 = domain[0];
  var r0 = range[0];
  var m = (range[1] - r0) / (domain[1] - d0);
  return Object.assign(function (num) {
    return r0 + (num - d0) * m;
  }, {
    inverse: function inverse() {
      return linear(range, domain);
    }
  });
} // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

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

var makeStyle = pipe([skipIf(isNil), pairs, mapWith(joinWithColon), joinWithSemicolon]);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/barchart/src/BarchartV.svelte";

function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
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
} // (119:1) {#if title}


function create_if_block_1$3(ctx) {
  var header;
  var h2;
  var t;
  var block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text(
      /*title*/
      ctx[5]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {});
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*title*/
      ctx[5]);
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
      if (dirty[0] &
      /*title*/
      32) set_data_dev(t,
      /*title*/
      ctx[5]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(119:1) {#if title}",
    ctx: ctx
  });
  return block;
} // (131:3) {#each bars as {     barColor,     bkgColor,     displayValue,     dxKey,     isNeg,     key,     label,     length,     x,     xValue,     y,     yText    }


function create_each_block$3(key_1, ctx) {
  var g;
  var rect;
  var rect_fill_value;
  var line;
  var line_stroke_value;
  var line_x__value;
  var line_y__value;
  var line_y__value_1;
  var text0;
  var t0_value =
  /*label*/
  ctx[50] + "";
  var t0;
  var text0_dx_value;
  var text0_y_value;
  var text1;
  var t1_value =
  /*displayValue*/
  ctx[46] + "";
  var t1;
  var text1_x_value;
  var text1_y_value;
  var g_transform_value;
  var mounted;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[29].apply(_ctx, [
      /*key*/
      ctx[49]].concat(args))
    );
  }

  function mouseenter_handler() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*mouseenter_handler*/
      (_ctx2 = ctx)[30].apply(_ctx2, [
      /*key*/
      ctx[49]].concat(args))
    );
  }

  function mouseleave_handler() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*mouseleave_handler*/
      (_ctx3 = ctx)[31].apply(_ctx3, [
      /*key*/
      ctx[49]].concat(args))
    );
  }

  var block = {
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
      g = claim_element(nodes, "g", {
        class: true,
        transform: true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        width: true,
        fill: true,
        height: true
      }, 1);
      children(rect).forEach(detach_dev);
      line = claim_element(g_nodes, "line", {
        stroke: true,
        "stroke-width": true,
        x1: true,
        x2: true,
        y1: true,
        y2: true
      }, 1);
      children(line).forEach(detach_dev);
      text0 = claim_element(g_nodes, "text", {
        class: true,
        dx: true,
        fill: true,
        "font-size": true,
        x: true,
        y: true
      }, 1);
      var text0_nodes = children(text0);
      t0 = claim_text(text0_nodes, t0_value);
      text0_nodes.forEach(detach_dev);
      text1 = claim_element(g_nodes, "text", {
        class: true,
        fill: true,
        "font-size": true,
        x: true,
        y: true
      }, 1);
      var text1_nodes = children(text1);
      t1 = claim_text(text1_nodes, t1_value);
      text1_nodes.forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "width",
      /*width*/
      ctx[6]);
      attr_dev(rect, "fill", rect_fill_value =
      /*bkgColor*/
      ctx[45]);
      attr_dev(rect, "height",
      /*itemHeight*/
      ctx[10]);
      add_location(rect, file$7, 155, 4, 4078);
      attr_dev(line, "stroke", line_stroke_value =
      /*barColor*/
      ctx[44]);
      attr_dev(line, "stroke-width",
      /*barHeight*/
      ctx[1]);
      attr_dev(line, "x1",
      /*x0*/
      ctx[13]);
      attr_dev(line, "x2", line_x__value =
      /*x*/
      ctx[52]);
      attr_dev(line, "y1", line_y__value =
      /*y*/
      ctx[54]);
      attr_dev(line, "y2", line_y__value_1 =
      /*y*/
      ctx[54]);
      add_location(line, file$7, 160, 4, 4154);
      attr_dev(text0, "class", "key svelte-1vlflhi");
      attr_dev(text0, "dx", text0_dx_value =
      /*dxKey*/
      ctx[47]);
      attr_dev(text0, "fill",
      /*textColor*/
      ctx[4]);
      attr_dev(text0, "font-size",
      /*fontSize*/
      ctx[2]);
      attr_dev(text0, "x",
      /*x0*/
      ctx[13]);
      attr_dev(text0, "y", text0_y_value =
      /*yText*/
      ctx[55]);
      toggle_class(text0, "neg",
      /*isNeg*/
      ctx[48]);
      add_location(text0, file$7, 168, 4, 4273);
      attr_dev(text1, "class", "value svelte-1vlflhi");
      attr_dev(text1, "fill",
      /*textColor*/
      ctx[4]);
      attr_dev(text1, "font-size",
      /*fontSize*/
      ctx[2]);
      attr_dev(text1, "x", text1_x_value =
      /*xValue*/
      ctx[53]);
      attr_dev(text1, "y", text1_y_value =
      /*yText*/
      ctx[55]);
      toggle_class(text1, "neg",
      /*isNeg*/
      ctx[48]);
      add_location(text1, file$7, 177, 4, 4434);
      attr_dev(g, "class", "item svelte-1vlflhi");
      attr_dev(g, "transform", g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[10] *
      /*index*/
      ctx[57] + ")");
      toggle_class(g, "clickable",
      /*isInteractive*/
      ctx[3]);
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
        dispose = [listen_dev(g, "click", click_handler, false, false, false), listen_dev(g, "mouseenter", mouseenter_handler, false, false, false), listen_dev(g, "mouseleave", mouseleave_handler, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(rect, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && rect_fill_value !== (rect_fill_value =
      /*bkgColor*/
      ctx[45])) {
        attr_dev(rect, "fill", rect_fill_value);
      }

      if (dirty[0] &
      /*itemHeight*/
      1024) {
        attr_dev(rect, "height",
        /*itemHeight*/
        ctx[10]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && line_stroke_value !== (line_stroke_value =
      /*barColor*/
      ctx[44])) {
        attr_dev(line, "stroke", line_stroke_value);
      }

      if (dirty[0] &
      /*barHeight*/
      2) {
        attr_dev(line, "stroke-width",
        /*barHeight*/
        ctx[1]);
      }

      if (dirty[0] &
      /*x0*/
      8192) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[13]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && line_x__value !== (line_x__value =
      /*x*/
      ctx[52])) {
        attr_dev(line, "x2", line_x__value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && line_y__value !== (line_y__value =
      /*y*/
      ctx[54])) {
        attr_dev(line, "y1", line_y__value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && line_y__value_1 !== (line_y__value_1 =
      /*y*/
      ctx[54])) {
        attr_dev(line, "y2", line_y__value_1);
      }

      if (dirty[0] &
      /*bars*/
      16384 && t0_value !== (t0_value =
      /*label*/
      ctx[50] + "")) set_data_dev(t0, t0_value);

      if (dirty[0] &
      /*bars*/
      16384 && text0_dx_value !== (text0_dx_value =
      /*dxKey*/
      ctx[47])) {
        attr_dev(text0, "dx", text0_dx_value);
      }

      if (dirty[0] &
      /*textColor*/
      16) {
        attr_dev(text0, "fill",
        /*textColor*/
        ctx[4]);
      }

      if (dirty[0] &
      /*fontSize*/
      4) {
        attr_dev(text0, "font-size",
        /*fontSize*/
        ctx[2]);
      }

      if (dirty[0] &
      /*x0*/
      8192) {
        attr_dev(text0, "x",
        /*x0*/
        ctx[13]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && text0_y_value !== (text0_y_value =
      /*yText*/
      ctx[55])) {
        attr_dev(text0, "y", text0_y_value);
      }

      if (dirty[0] &
      /*bars*/
      16384) {
        toggle_class(text0, "neg",
        /*isNeg*/
        ctx[48]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && t1_value !== (t1_value =
      /*displayValue*/
      ctx[46] + "")) set_data_dev(t1, t1_value);

      if (dirty[0] &
      /*textColor*/
      16) {
        attr_dev(text1, "fill",
        /*textColor*/
        ctx[4]);
      }

      if (dirty[0] &
      /*fontSize*/
      4) {
        attr_dev(text1, "font-size",
        /*fontSize*/
        ctx[2]);
      }

      if (dirty[0] &
      /*bars*/
      16384 && text1_x_value !== (text1_x_value =
      /*xValue*/
      ctx[53])) {
        attr_dev(text1, "x", text1_x_value);
      }

      if (dirty[0] &
      /*bars*/
      16384 && text1_y_value !== (text1_y_value =
      /*yText*/
      ctx[55])) {
        attr_dev(text1, "y", text1_y_value);
      }

      if (dirty[0] &
      /*bars*/
      16384) {
        toggle_class(text1, "neg",
        /*isNeg*/
        ctx[48]);
      }

      if (dirty[0] &
      /*itemHeight, bars*/
      17408 && g_transform_value !== (g_transform_value = "translate(0, " +
      /*itemHeight*/
      ctx[10] *
      /*index*/
      ctx[57] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }

      if (dirty[0] &
      /*isInteractive*/
      8) {
        toggle_class(g, "clickable",
        /*isInteractive*/
        ctx[3]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$3.name,
    type: "each",
    source: "(131:3) {#each bars as {     barColor,     bkgColor,     displayValue,     dxKey,     isNeg,     key,     label,     length,     x,     xValue,     y,     yText    }",
    ctx: ctx
  });
  return block;
} // (188:3) {#if crossesZero}


function create_if_block$4(ctx) {
  var line;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_element(nodes, "line", {
        stroke: true,
        x1: true,
        x2: true,
        y2: true
      }, 1);
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "stroke",
      /*axisColor*/
      ctx[0]);
      attr_dev(line, "x1",
      /*x0*/
      ctx[13]);
      attr_dev(line, "x2",
      /*x0*/
      ctx[13]);
      attr_dev(line, "y2",
      /*svgHeight*/
      ctx[11]);
      add_location(line, file$7, 188, 3, 4631);
    },
    m: function mount(target, anchor) {
      insert_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*axisColor*/
      1) {
        attr_dev(line, "stroke",
        /*axisColor*/
        ctx[0]);
      }

      if (dirty[0] &
      /*x0*/
      8192) {
        attr_dev(line, "x1",
        /*x0*/
        ctx[13]);
      }

      if (dirty[0] &
      /*x0*/
      8192) {
        attr_dev(line, "x2",
        /*x0*/
        ctx[13]);
      }

      if (dirty[0] &
      /*svgHeight*/
      2048) {
        attr_dev(line, "y2",
        /*svgHeight*/
        ctx[11]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(188:3) {#if crossesZero}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var div;
  var t;
  var main;
  var svg;
  var each_blocks = [];
  var each_1_lookup = new Map();
  var each_1_anchor;
  var main_resize_listener;
  var mounted;
  var dispose;
  var if_block0 =
  /*title*/
  ctx[5] && create_if_block_1$3(ctx);
  var each_value =
  /*bars*/
  ctx[14];
  validate_each_argument(each_value);

  var get_key = function get_key(ctx) {
    return (
      /*key*/
      ctx[49]
    );
  };

  validate_each_keys(ctx, each_value, get_each_context$3, get_key);

  for (var i = 0; i < each_value.length; i += 1) {
    var child_ctx = get_each_context$3(ctx, each_value, i);
    var key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
  }

  var if_block1 =
  /*crossesZero*/
  ctx[12] && create_if_block$4(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      svg = svg_element("svg");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
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
      svg = claim_element(main_nodes, "svg", {
        width: true,
        height: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(svg_nodes);
      }

      each_1_anchor = empty();
      if (if_block1) if_block1.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[6]);
      attr_dev(svg, "height",
      /*svgHeight*/
      ctx[11]);
      attr_dev(svg, "class", "svelte-1vlflhi");
      add_location(svg, file$7, 129, 2, 3481);
      attr_dev(main, "class", "svelte-1vlflhi");
      add_render_callback(function () {
        return (
          /*main_elementresize_handler*/
          ctx[32].call(main)
        );
      });
      toggle_class(main, "titled",
      /*title*/
      ctx[5]);
      add_location(main, file$7, 123, 1, 3345);
      attr_dev(div, "class", "BarchartV svelte-1vlflhi");
      attr_dev(div, "style",
      /*divStyle*/
      ctx[9]);
      add_location(div, file$7, 114, 0, 3240);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      append_dev(div, main);
      append_dev(main, svg);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(svg, null);
      }

      append_dev(svg, each_1_anchor);
      if (if_block1) if_block1.m(svg, null);
      main_resize_listener = add_resize_listener(main,
      /*main_elementresize_handler*/
      ctx[32].bind(main));
      /*main_binding*/

      ctx[33](main);

      if (!mounted) {
        dispose = listen_dev(main, "mouseleave",
        /*mouseleave_handler_1*/
        ctx[34], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*title*/
      ctx[5]) {
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

      if (dirty[0] &
      /*itemHeight, bars, isInteractive, dispatch, hoveredKey, textColor, fontSize, x0, barHeight, width*/
      58590) {
        var _each_value =
        /*bars*/
        ctx[14];
        validate_each_argument(_each_value);
        validate_each_keys(ctx, _each_value, get_each_context$3, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value, each_1_lookup, svg, destroy_block, create_each_block$3, each_1_anchor, get_each_context$3);
      }

      if (
      /*crossesZero*/
      ctx[12]) {
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

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(svg, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*svgHeight*/
      2048) {
        attr_dev(svg, "height",
        /*svgHeight*/
        ctx[11]);
      }

      if (dirty[0] &
      /*title*/
      32) {
        toggle_class(main, "titled",
        /*title*/
        ctx[5]);
      }

      if (dirty[0] &
      /*divStyle*/
      512) {
        attr_dev(div, "style",
        /*divStyle*/
        ctx[9]);
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();

      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].d();
      }

      if (if_block1) if_block1.d();
      main_resize_listener();
      /*main_binding*/

      ctx[33](null);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var transparentColor = "rgba(0,0,0,0)";

function instance$d($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var axisColor = $$props.axisColor;
  var backgroundColor = $$props.backgroundColor;
  var barDefaultColor = $$props.barDefaultColor;
  var barHeight = $$props.barHeight;
  var focusedKey = $$props.focusedKey;
  var focusedKeyColor = $$props.focusedKeyColor;
  var fontSize = $$props.fontSize;
  var formatFn = $$props.formatFn;
  var hoverColor = $$props.hoverColor;
  var isInteractive = $$props.isInteractive;
  var items = $$props.items;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var keyToLabel = $$props.keyToLabel;
  var keyToLabelFn = $$props.keyToLabelFn;
  var shouldResetScroll = $$props.shouldResetScroll;
  var textColor = $$props.textColor;
  var title = $$props.title;
  var valueAccessor = $$props.valueAccessor;
  var width;
  var hoveredKey;
  /* scroll */

  var previousItems;
  var scrollable;
  var wasNotResettingScroll;
  beforeUpdate(function () {
    $$invalidate(36, wasNotResettingScroll = !shouldResetScroll);
  });
  var writable_props = ["axisColor", "backgroundColor", "barDefaultColor", "barHeight", "focusedKey", "focusedKeyColor", "fontSize", "formatFn", "hoverColor", "isInteractive", "items", "keyToColor", "keyToColorFn", "keyToLabel", "keyToLabelFn", "shouldResetScroll", "textColor", "title", "valueAccessor"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<BarchartV> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("BarchartV", $$slots, []);

  var click_handler = function click_handler(key) {
    isInteractive && dispatch("clicked", {
      id: key
    });
  };

  var mouseenter_handler = function mouseenter_handler(key) {
    isInteractive && dispatch("entered", {
      id: key
    });
    $$invalidate(7, hoveredKey = key);
  };

  var mouseleave_handler = function mouseleave_handler(key) {
    return isInteractive && dispatch("exited", {
      id: key
    });
  };

  function main_elementresize_handler() {
    width = this.clientWidth;
    $$invalidate(6, width);
  }

  function main_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      scrollable = $$value;
      ((($$invalidate(8, scrollable), $$invalidate(24, items)), $$invalidate(20, shouldResetScroll)), $$invalidate(35, previousItems)), $$invalidate(36, wasNotResettingScroll);
    });
  }

  var mouseleave_handler_1 = function mouseleave_handler_1() {
    $$invalidate(7, hoveredKey = null);
  };

  $$self.$set = function ($$props) {
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

  $$self.$capture_state = function () {
    return {
      _: _,
      linearScale: linear,
      isEqual: isEqual,
      afterUpdate: afterUpdate,
      beforeUpdate: beforeUpdate,
      createEventDispatcher: createEventDispatcher,
      makeStyle: makeStyle,
      arrayMaxWith: arrayMaxWith,
      arrayMinWith: arrayMinWith,
      getValue: getValue$2,
      dispatch: dispatch,
      transparentColor: transparentColor,
      axisColor: axisColor,
      backgroundColor: backgroundColor,
      barDefaultColor: barDefaultColor,
      barHeight: barHeight,
      focusedKey: focusedKey,
      focusedKeyColor: focusedKeyColor,
      fontSize: fontSize,
      formatFn: formatFn,
      hoverColor: hoverColor,
      isInteractive: isInteractive,
      items: items,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      keyToLabel: keyToLabel,
      keyToLabelFn: keyToLabelFn,
      shouldResetScroll: shouldResetScroll,
      textColor: textColor,
      title: title,
      valueAccessor: valueAccessor,
      width: width,
      hoveredKey: hoveredKey,
      previousItems: previousItems,
      scrollable: scrollable,
      wasNotResettingScroll: wasNotResettingScroll,
      divStyle: divStyle,
      padding: padding,
      itemHeight: itemHeight,
      svgHeight: svgHeight,
      getMin: getMin,
      getMax: getMax,
      min: min,
      max: max,
      crossesZero: crossesZero,
      domain: domain,
      getX: getX,
      x0: x0,
      bars: bars
    };
  };

  $$self.$inject_state = function ($$props) {
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

  var divStyle;
  var padding;
  var itemHeight;
  var svgHeight;
  var getMin;
  var getMax;
  var min;
  var max;
  var crossesZero;
  var domain;
  var getX;
  var x0;
  var bars;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*axisColor*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(0, axisColor = axisColor || "grey");
    }

    if ($$self.$$.dirty[0] &
    /*backgroundColor*/
    65536) {
       $$invalidate(16, backgroundColor = backgroundColor || transparentColor);
    }

    if ($$self.$$.dirty[0] &
    /*barDefaultColor*/
    131072) {
       $$invalidate(17, barDefaultColor = barDefaultColor || "black");
    }

    if ($$self.$$.dirty[0] &
    /*barHeight*/
    2) {
       $$invalidate(1, barHeight = barHeight || 4);
    }

    if ($$self.$$.dirty[0] &
    /*focusedKeyColor*/
    262144) {
       $$invalidate(18, focusedKeyColor = focusedKeyColor || "rgba(0, 0, 0, 0.1)");
    }

    if ($$self.$$.dirty[0] &
    /*fontSize*/
    4) {
       $$invalidate(2, fontSize = fontSize || 14);
    }

    if ($$self.$$.dirty[0] &
    /*hoverColor*/
    524288) {
       $$invalidate(19, hoverColor = hoverColor || "rgba(0, 0, 0, 0.05)");
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    8) {
       $$invalidate(3, isInteractive = isInteractive || false);
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll*/
    1048576) {
       $$invalidate(20, shouldResetScroll = shouldResetScroll || false);
    }

    if ($$self.$$.dirty[0] &
    /*textColor*/
    16) {
       $$invalidate(4, textColor = textColor || "grey");
    }

    if ($$self.$$.dirty[0] &
    /*title*/
    32) {
       $$invalidate(5, title = title || undefined);
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    2097152) {
       $$invalidate(21, valueAccessor = valueAccessor || getValue$2);
    }

    if ($$self.$$.dirty[0] &
    /*backgroundColor*/
    65536) {
       $$invalidate(9, divStyle = makeStyle({
        "background-color": backgroundColor
      }));
    }

    if ($$self.$$.dirty[0] &
    /*fontSize*/
    4) {
       $$invalidate(37, padding = fontSize / 2);
    }

    if ($$self.$$.dirty[0] &
    /*fontSize, barHeight*/
    6 | $$self.$$.dirty[1] &
    /*padding*/
    64) {
       $$invalidate(10, itemHeight = fontSize + barHeight + 3 * padding);
    }

    if ($$self.$$.dirty[0] &
    /*itemHeight, items*/
    16778240) {
       $$invalidate(11, svgHeight = itemHeight * items.length);
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    2097152) {
       $$invalidate(38, getMin = arrayMinWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*valueAccessor*/
    2097152) {
       $$invalidate(39, getMax = arrayMaxWith(valueAccessor));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    16777216 | $$self.$$.dirty[1] &
    /*getMin*/
    128) {
       $$invalidate(40, min = getMin(items));
    }

    if ($$self.$$.dirty[0] &
    /*items*/
    16777216 | $$self.$$.dirty[1] &
    /*getMax*/
    256) {
       $$invalidate(41, max = getMax(items));
    }

    if ($$self.$$.dirty[1] &
    /*min, max*/
    1536) {
       $$invalidate(12, crossesZero = Math.sign(min) !== Math.sign(max));
    }

    if ($$self.$$.dirty[0] &
    /*crossesZero*/
    4096 | $$self.$$.dirty[1] &
    /*min, max*/
    1536) {
       $$invalidate(42, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
    }

    if ($$self.$$.dirty[0] &
    /*width*/
    64 | $$self.$$.dirty[1] &
    /*domain*/
    2048) {
       $$invalidate(43, getX = linear(domain, [0, width]));
    }

    if ($$self.$$.dirty[1] &
    /*getX*/
    4096) {
       $$invalidate(13, x0 = getX(0));
    }

    if ($$self.$$.dirty[0] &
    /*items, valueAccessor, keyToColor, barDefaultColor, keyToColorFn, focusedKey, focusedKeyColor, hoveredKey, hoverColor, formatFn, crossesZero, keyToLabel, keyToLabelFn, width, itemHeight, barHeight*/
    535696578 | $$self.$$.dirty[1] &
    /*padding, getX*/
    4160) {
       $$invalidate(14, bars = items.map(function (item) {
        var value = valueAccessor(item);
        var isNeg = value < 0;
        return merge(item, {
          barColor: keyToColor ? keyToColor[item.key] || barDefaultColor : keyToColorFn ? keyToColorFn(item.key) : barDefaultColor,
          bkgColor: item.key === focusedKey ? focusedKeyColor : item.key === hoveredKey ? hoverColor : transparentColor,
          displayValue: formatFn ? formatFn(value) : value,
          dxKey: crossesZero ? isNeg ? -padding : padding : 0,
          isNeg: isNeg,
          label: keyToLabel && keyToLabel[item.key] ? keyToLabel[item.key] : keyToLabelFn ? keyToLabelFn(item.key) : item.key,
          x: getX(value),
          xValue: value > 0 ? width : 0,
          y: itemHeight - padding - barHeight / 2,
          yText: itemHeight - barHeight - 2 * padding
        });
      }));
    }

    if ($$self.$$.dirty[0] &
    /*items, shouldResetScroll*/
    17825792 | $$self.$$.dirty[1] &
    /*previousItems*/
    16) {
       afterUpdate(function () {
        if (items && shouldResetScroll && !isEqual(previousItems, items)) {
          $$invalidate(8, scrollable.scrollTop = 0, scrollable);
          $$invalidate(35, previousItems = items);
        }
      });
    }

    if ($$self.$$.dirty[0] &
    /*shouldResetScroll, scrollable*/
    1048832 | $$self.$$.dirty[1] &
    /*wasNotResettingScroll*/
    32) {
       if (wasNotResettingScroll && shouldResetScroll && scrollable) {
        $$invalidate(8, scrollable.scrollTop = 0, scrollable);
      }
    }
  };

  return [axisColor, barHeight, fontSize, isInteractive, textColor, title, width, hoveredKey, scrollable, divStyle, itemHeight, svgHeight, crossesZero, x0, bars, dispatch, backgroundColor, barDefaultColor, focusedKeyColor, hoverColor, shouldResetScroll, valueAccessor, focusedKey, formatFn, items, keyToColor, keyToColorFn, keyToLabel, keyToLabelFn, click_handler, mouseenter_handler, mouseleave_handler, main_elementresize_handler, main_binding, mouseleave_handler_1];
}

var BarchartV = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(BarchartV, _SvelteComponentDev);

  var _super = _createSuper$d(BarchartV);

  function BarchartV(options) {
    var _this;

    _classCallCheck(this, BarchartV);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
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
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "BarchartV",
      options: options,
      id: create_fragment$d.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*axisColor*/
    ctx[0] === undefined && !("axisColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'axisColor'");
    }

    if (
    /*backgroundColor*/
    ctx[16] === undefined && !("backgroundColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'backgroundColor'");
    }

    if (
    /*barDefaultColor*/
    ctx[17] === undefined && !("barDefaultColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'barDefaultColor'");
    }

    if (
    /*barHeight*/
    ctx[1] === undefined && !("barHeight" in props)) {
      console.warn("<BarchartV> was created without expected prop 'barHeight'");
    }

    if (
    /*focusedKey*/
    ctx[22] === undefined && !("focusedKey" in props)) {
      console.warn("<BarchartV> was created without expected prop 'focusedKey'");
    }

    if (
    /*focusedKeyColor*/
    ctx[18] === undefined && !("focusedKeyColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'focusedKeyColor'");
    }

    if (
    /*fontSize*/
    ctx[2] === undefined && !("fontSize" in props)) {
      console.warn("<BarchartV> was created without expected prop 'fontSize'");
    }

    if (
    /*formatFn*/
    ctx[23] === undefined && !("formatFn" in props)) {
      console.warn("<BarchartV> was created without expected prop 'formatFn'");
    }

    if (
    /*hoverColor*/
    ctx[19] === undefined && !("hoverColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'hoverColor'");
    }

    if (
    /*isInteractive*/
    ctx[3] === undefined && !("isInteractive" in props)) {
      console.warn("<BarchartV> was created without expected prop 'isInteractive'");
    }

    if (
    /*items*/
    ctx[24] === undefined && !("items" in props)) {
      console.warn("<BarchartV> was created without expected prop 'items'");
    }

    if (
    /*keyToColor*/
    ctx[25] === undefined && !("keyToColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[26] === undefined && !("keyToColorFn" in props)) {
      console.warn("<BarchartV> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*keyToLabel*/
    ctx[27] === undefined && !("keyToLabel" in props)) {
      console.warn("<BarchartV> was created without expected prop 'keyToLabel'");
    }

    if (
    /*keyToLabelFn*/
    ctx[28] === undefined && !("keyToLabelFn" in props)) {
      console.warn("<BarchartV> was created without expected prop 'keyToLabelFn'");
    }

    if (
    /*shouldResetScroll*/
    ctx[20] === undefined && !("shouldResetScroll" in props)) {
      console.warn("<BarchartV> was created without expected prop 'shouldResetScroll'");
    }

    if (
    /*textColor*/
    ctx[4] === undefined && !("textColor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'textColor'");
    }

    if (
    /*title*/
    ctx[5] === undefined && !("title" in props)) {
      console.warn("<BarchartV> was created without expected prop 'title'");
    }

    if (
    /*valueAccessor*/
    ctx[21] === undefined && !("valueAccessor" in props)) {
      console.warn("<BarchartV> was created without expected prop 'valueAccessor'");
    }

    return _this;
  }

  _createClass(BarchartV, [{
    key: "axisColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "barDefaultColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "barHeight",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedKey",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedKeyColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fontSize",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "formatFn",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hoverColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "items",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToLabel",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToLabelFn",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shouldResetScroll",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "textColor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "valueAccessor",
    get: function get() {
      throw new Error("<BarchartV>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BarchartV>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return BarchartV;
}(SvelteComponentDev);



var barchart = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BarchartV: BarchartV
});

function identity (x) {
  return x;
}

function transform (transform) {
  if (transform == null) return identity;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;

    while (j < n) {
      output[j] = input[j], ++j;
    }

    return output;
  };
}

function reverse (array, n) {
  var t,
      j = array.length,
      i = j - n;

  while (i < --j) {
    t = array[i], array[i++] = array[j], array[j] = t;
  }
}

function geoObject (topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function (o) {
      return feature(topology, o);
    })
  } : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {
    type: "Feature",
    properties: properties,
    geometry: geometry
  } : bbox == null ? {
    type: "Feature",
    id: id,
    properties: properties,
    geometry: geometry
  } : {
    type: "Feature",
    id: id,
    bbox: bbox,
    properties: properties,
    geometry: geometry
  };
}

function object(topology, o) {
  var transformPoint = transform(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();

    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }

    if (i < 0) reverse(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];

    for (var i = 0, n = arcs.length; i < n; ++i) {
      arc(arcs[i], points);
    }

    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.

    return points;
  }

  function ring(arcs) {
    var points = line(arcs);

    while (points.length < 4) {
      points.push(points[0]);
    } // This may happen if an arc has only two points.


    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type,
        coordinates;

    switch (type) {
      case "GeometryCollection":
        return {
          type: type,
          geometries: o.geometries.map(geometry)
        };

      case "Point":
        coordinates = point(o.coordinates);
        break;

      case "MultiPoint":
        coordinates = o.coordinates.map(point);
        break;

      case "LineString":
        coordinates = line(o.arcs);
        break;

      case "MultiLineString":
        coordinates = o.arcs.map(line);
        break;

      case "Polygon":
        coordinates = polygon(o.arcs);
        break;

      case "MultiPolygon":
        coordinates = o.arcs.map(polygon);
        break;

      default:
        return null;
    }

    return {
      type: type,
      coordinates: coordinates
    };
  }

  return geometry(o);
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
function adder () {
  return new Adder();
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function reset() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function add(y) {
    _add(temp, y, this.t);

    _add(this, temp.s, this.s);

    if (this.s) this.t += temp.t;else this.s = temp.t;
  },
  valueOf: function valueOf() {
    return this.s;
  }
};
var temp = new Adder();

function _add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = a - av + (b - bv);
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
var sign = Math.sign || function (x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};
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
  Feature: function Feature(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function FeatureCollection(object, stream) {
    var features = object.features,
        i = -1,
        n = features.length;

    while (++i < n) {
      streamGeometry(features[i].geometry, stream);
    }
  }
};
var streamGeometryType = {
  Sphere: function Sphere(object, stream) {
    stream.sphere();
  },
  Point: function Point(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function MultiPoint(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      object = coordinates[i], stream.point(object[0], object[1], object[2]);
    }
  },
  LineString: function LineString(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function MultiLineString(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      streamLine(coordinates[i], stream, 0);
    }
  },
  Polygon: function Polygon(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function MultiPolygon(object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) {
      streamPolygon(coordinates[i], stream);
    }
  },
  GeometryCollection: function GeometryCollection(object, stream) {
    var geometries = object.geometries,
        i = -1,
        n = geometries.length;

    while (++i < n) {
      streamGeometry(geometries[i], stream);
    }
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1,
      n = coordinates.length - closed,
      coordinate;
  stream.lineStart();

  while (++i < n) {
    coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  }

  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1,
      n = coordinates.length;
  stream.polygonStart();

  while (++i < n) {
    streamLine(coordinates[i], stream, 1);
  }

  stream.polygonEnd();
}

function geoStream (object, stream) {
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
  var lambda = spherical[0],
      phi = spherical[1],
      cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}
function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
} // TODO return a

function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}
function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
} // TODO return d

function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function compose (a, b) {
  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function (x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };
  return compose;
}

function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}

function forwardRotationLambda(deltaLambda) {
  return function (lambda, phi) {
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
    return [atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), asin(k * cosDeltaGamma + y * sinDeltaGamma)];
  }

  rotation.invert = function (lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), asin(k * cosDeltaPhi - x * sinDeltaPhi)];
  };

  return rotation;
}

function rotation (rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  }

  forward.invert = function (coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  };

  return forward;
}

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
} // Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].

function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

function clipBuffer () {
  var lines = [],
      line;
  return {
    point: function point(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function lineStart() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function rejoin() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function result() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual (a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection

  this.e = entry; // is an entry?

  this.v = false; // visited

  this.n = this.p = null; // next & previous
} // A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.


function clipRejoin (segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;
  segments.forEach(function (segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n,
        p0 = segment[0],
        p1 = segment[n],
        x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();

        for (i = 0; i < n; ++i) {
          stream.point((p0 = segment[i])[0], p0[1]);
        }

        stream.lineEnd();
        return;
      } // handle degenerate cases by moving the point


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

    while (current.v) {
      if ((current = current.n) === start) return;
    }

    points = current.z;
    stream.lineStart();

    do {
      current.v = current.o.v = true;

      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) {
            stream.point((point = points[i])[0], point[1]);
          }
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }

        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;

          for (i = points.length - 1; i >= 0; --i) {
            stream.point((point = points[i])[0], point[1]);
          }
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

var sum = adder();

function longitude(point) {
  if (abs(point[0]) <= pi) return point[0];else return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}

function polygonContains (polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin(phi),
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;
  sum.reset();
  if (sinPhi === 1) phi = halfPi + epsilon;else if (sinPhi === -1) phi = -halfPi - epsilon;

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
      sum.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign * tau : delta; // Are the longitudes either side of the point’s meridian (lambda),
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
  } // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.


  return (angle < -epsilon || angle < epsilon && sum < -epsilon) ^ winding & 1;
}

function clip (pointVisible, clipLine, interpolate, start) {
  return function (sink) {
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
      polygonStart: function polygonStart() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function polygonEnd() {
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
      sphere: function sphere() {
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
          i,
          n = ringSegments.length,
          m,
          segment,
          point;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return; // No intersections.

      if (clean & 1) {
        segment = ringSegments[0];

        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();

          for (i = 0; i < m; ++i) {
            sink.point((point = segment[i])[0], point[1]);
          }

          sink.lineEnd();
        }

        return;
      } // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?


      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
} // Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.


function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(function () {
  return true;
}, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]); // Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.

function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      _clean; // no intersections


  return {
    lineStart: function lineStart() {
      stream.lineStart();
      _clean = 1;
    },
    point: function point(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);

      if (abs(delta - pi) < epsilon) {
        // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        _clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) {
        // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies

        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        _clean = 0;
      }

      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function lineEnd() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function clean() {
      return 2 - _clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1) - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
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

function clipCircle (radius) {
  var cr = cos(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  } // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.


  function clipLine(stream) {
    var point0, // previous point
    c0, // code for previous point
    v0, // visibility of previous point
    v00, // visibility of first point
    _clean; // no intersections


    return {
      lineStart: function lineStart() {
        v00 = v0 = false;
        _clean = 1;
      },
      point: function point(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();

        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) point1[2] = 1;
        }

        if (v !== v0) {
          _clean = 0;

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
          var t; // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.

          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            _clean = 0;

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
      lineEnd: function lineEnd() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function clean() {
        return _clean | (v00 && v0) << 1;
      }
    };
  } // Intersects the great circle between a and b with the clip circle.


  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b); // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).

    var n1 = [1, 0, 0],
        // normal
    n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0],
        // cartesianDot(n1, n2),
    determinant = n2n2 - n1n2 * n1n2; // Two polar points.

    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B); // Solve |p(t)|^2 = 1.

    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);
    if (t2 < 0) return;
    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);
    if (!two) return q; // Two intersection points.

    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;
    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;
    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;
    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z; // Check that the first point is between a and b.

    if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  } // Generates a 4-bit vector representing the location of a point relative to
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

function clipLine (a, b, x0, y0, x1, y1) {
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

var clipMax = 1e9,
    clipMin = -clipMax; // TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {
  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0,
        a1 = 0;

    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do {
        stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      } while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
  }

  return function (stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__,
        y__,
        v__,
        // first point
    x_,
        y_,
        v_,
        // previous point
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

          if (a1 <= y1) {
            if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding;
          } else {
            if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding;
          }
        }
      }

      return winding;
    } // Buffer geometry within a polygon and then clip it en masse.


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
    } // TODO rather than special-case polygons, simply handle them separately.
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
        if (v && v_) activeStream.point(x, y);else {
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

function identity$1 (x) {
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
  polygonStart: function polygonStart() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function polygonEnd() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function result() {
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
  result: function result() {
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
  polygonStart: function polygonStart() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function polygonEnd() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function result() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
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
  var dx = x - x0$2,
      dy = y - y0$2,
      z = sqrt(dx * dx + dy * dy);
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
  pointRadius: function pointRadius(_) {
    return this._radius = _, this;
  },
  polygonStart: function polygonStart() {
    this._line = 0;
  },
  polygonEnd: function polygonEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function point(x, y) {
    switch (this._point) {
      case 0:
        {
          this._context.moveTo(x, y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._context.lineTo(x, y);

          break;
        }

      default:
        {
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
  lineStart: function lineStart() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function lineEnd() {
    if (lengthRing) lengthPoint(x00$2, y00$2);
    lengthStream.point = noop;
  },
  polygonStart: function polygonStart() {
    lengthRing = true;
  },
  polygonEnd: function polygonEnd() {
    lengthRing = null;
  },
  result: function result() {
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
  pointRadius: function pointRadius(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function polygonStart() {
    this._line = 0;
  },
  polygonEnd: function polygonEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function point(x, y) {
    switch (this._point) {
      case 0:
        {
          this._string.push("M", x, ",", y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._string.push("L", x, ",", y);

          break;
        }

      default:
        {
          if (this._circle == null) this._circle = circle(this._radius);

          this._string.push("M", x, ",", y, this._circle);

          break;
        }
    }
  },
  result: function result() {
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
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}

function geoPath (projection, context) {
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

  path.area = function (object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function (object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function (object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function (object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function (_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
  };

  path.context = function (_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function transformer(methods) {
  return function (stream) {
    var s = new TransformStream();

    for (var key in methods) {
      s[key] = methods[key];
    }

    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function point(x, y) {
    this.stream.point(x, y);
  },
  sphere: function sphere() {
    this.stream.sphere();
  },
  lineStart: function lineStart() {
    this.stream.lineStart();
  },
  lineEnd: function lineEnd() {
    this.stream.lineEnd();
  },
  polygonStart: function polygonStart() {
    this.stream.polygonStart();
  },
  polygonEnd: function polygonEnd() {
    this.stream.polygonEnd();
  }
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
  return fit(projection, function (b) {
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
  return fit(projection, function (b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}
function fitHeight(projection, height, object) {
  return fit(projection, function (b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16,
    // maximum depth of subdivision
cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

function resample (project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function point(x, y) {
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
      || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }

  return function (stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
    lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function polygonStart() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function polygonEnd() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
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
      var c = cartesian([lambda, phi]),
          p = project(lambda, phi);
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
  point: function point(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function point(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx;
    y *= sy;
    return [dx + k * x, dy - k * y];
  }

  transform.invert = function (x, y) {
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
    x *= sx;
    y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }

  transform.invert = function (x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };

  return transform;
}

function projection(project) {
  return projectionMutator(function () {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project,
      k = 150,
      // scale
  x = 480,
      y = 250,
      // translate
  lambda = 0,
      phi = 0,
      // center
  deltaLambda = 0,
      deltaPhi = 0,
      deltaGamma = 0,
      rotate,
      // pre-rotate
  alpha = 0,
      // post-rotate angle
  sx = 1,
      // reflectX
  sy = 1,
      // reflectX
  theta = null,
      preclip = clipAntimeridian,
      // pre-clip angle
  x0 = null,
      y0,
      x1,
      y1,
      postclip = identity$1,
      // post-clip extent
  delta2 = 0.5,
      // precision
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

  projection.stream = function (stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function (_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function (_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function (_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function (_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$1) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function (_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function (_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function (_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function (_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.angle = function (_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };

  projection.reflectX = function (_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function (_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function (_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function (extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function (size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function (width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function (height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function () {
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

  p.parallels = function (_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin(phi) / cosPhi0];
  }

  forward.invert = function (x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin(y0),
      n = (sy0 + sin(y1)) / 2; // Are the parallels symmetrical around the Equator?

  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);
  var c = 1 + sy0 * (2 * n - sy0),
      r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin(y)) / n;
    return [r * sin(x *= n), r0 - r * cos(x)];
  }

  project.invert = function (x, y) {
    var r0y = r0 - y,
        l = atan2(x, abs(r0y)) * sign(r0y);
    if (r0y * n < 0) l -= pi * sign(x) * sign(r0y);
    return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}
function conicEqualArea () {
  return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}

function azimuthalRaw(scale) {
  return function (x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [k * cy * sin(x), k * sin(y)];
  };
}
function azimuthalInvert(angle) {
  return function (x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [atan2(x * sc, z * cc), asin(z && y * sc / z)];
  };
}

var azimuthalEqualAreaRaw = azimuthalRaw(function (cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function (z) {
  return 2 * asin(z / 2);
});
function azimuthalEqualArea () {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function (c) {
  return (c = acos(c)) && c / sin(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function (z) {
  return z;
});
function azimuthalEquidistant () {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function (x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

function mercator () {
  return mercatorProjection(mercatorRaw).scale(961 / tau);
}
function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null,
      y0,
      x1,
      y1; // clip extent

  m.scale = function (_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function (_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function (_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function (_) {
    return arguments.length ? (_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]] : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
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
    if (f > 0) {
      if (y < -halfPi + epsilon) y = -halfPi + epsilon;
    } else {
      if (y > halfPi - epsilon) y = halfPi - epsilon;
    }

    var r = f / pow(tany(y), n);
    return [r * sin(n * x), f - r * cos(n * x)];
  }

  project.invert = function (x, y) {
    var fy = f - y,
        r = sign(n) * sqrt(x * x + fy * fy),
        l = atan2(x, abs(fy)) * sign(fy);
    if (fy * n < 0) l -= pi * sign(x) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };

  return project;
}
function conicConformal () {
  return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular () {
  return projection(equirectangularRaw).scale(152.63);
}

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : (cy0 - cos(y1)) / (y1 - y0),
      g = cy0 / n + y0;
  if (abs(n) < epsilon) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y,
        nx = n * x;
    return [gy * sin(nx), g - gy * cos(nx)];
  }

  project.invert = function (x, y) {
    var gy = g - y,
        l = atan2(x, abs(gy)) * sign(gy);
    if (gy * n < 0) l -= pi * sign(x) * sign(gy);
    return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}
function conicEquidistant () {
  return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = sqrt(3) / 2,
    iterations = 12;
function equalEarthRaw(lambda, phi) {
  var l = asin(M * sin(phi)),
      l2 = l * l,
      l6 = l2 * l2 * l2;
  return [lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))];
}

equalEarthRaw.invert = function (x, y) {
  var l = y,
      l2 = l * l,
      l6 = l2 * l2 * l2;

  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2) break;
  }

  return [M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l), asin(sin(l) / M)];
};

function equalEarth () {
  return projection(equalEarthRaw).scale(177.158);
}

function gnomonicRaw(x, y) {
  var cy = cos(y),
      k = cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic () {
  return projection(gnomonicRaw).scale(144.049).clipAngle(60);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi,
      phi4 = phi2 * phi2;
  return [lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))), phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))];
}

naturalEarth1Raw.invert = function (x, y) {
  var phi = y,
      i = 25,
      delta;

  do {
    var phi2 = phi * phi,
        phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);

  return [x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))), phi];
};

function naturalEarth1 () {
  return projection(naturalEarth1Raw).scale(175.295);
}

function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}
orthographicRaw.invert = azimuthalInvert(asin);
function orthographic () {
  return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon);
}

function stereographicRaw(x, y) {
  var cy = cos(y),
      k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}
stereographicRaw.invert = azimuthalInvert(function (z) {
  return 2 * atan(z);
});
function stereographic () {
  return projection(stereographicRaw).scale(250).clipAngle(142);
}

function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function (x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi];
};

function transverseMercator () {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function (_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function (_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90]).scale(159.155);
}

var helpers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
    yards: exports.earthRadius / 1.0936
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
    yards: 1 / 1.0936
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
    yards: 1.195990046
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
    if (options === void 0) {
      options = {};
    }

    var feat = {
      type: "Feature"
    };

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
      case "Point":
        return point(coordinates).geometry;

      case "LineString":
        return lineString(coordinates).geometry;

      case "Polygon":
        return polygon(coordinates).geometry;

      case "MultiPoint":
        return multiPoint(coordinates).geometry;

      case "MultiLineString":
        return multiLineString(coordinates).geometry;

      case "MultiPolygon":
        return multiPolygon(coordinates).geometry;

      default:
        throw new Error(type + " is invalid");
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
    if (options === void 0) {
      options = {};
    }

    var geom = {
      type: "Point",
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

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
    if (options === void 0) {
      options = {};
    }

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
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

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
    if (options === void 0) {
      options = {};
    }

    if (coordinates.length < 2) {
      throw new Error("coordinates must be an array of two or more positions");
    }

    var geom = {
      type: "LineString",
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

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
    if (options === void 0) {
      options = {};
    }

    var fc = {
      type: "FeatureCollection"
    };

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
    if (options === void 0) {
      options = {};
    }

    var geom = {
      type: "MultiLineString",
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

    var geom = {
      type: "MultiPoint",
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

    var geom = {
      type: "MultiPolygon",
      coordinates: coordinates
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
    if (options === void 0) {
      options = {};
    }

    var geom = {
      type: "GeometryCollection",
      geometries: geometries
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
    if (precision === void 0) {
      precision = 0;
    }

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
    if (units === void 0) {
      units = "kilometers";
    }

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
    if (units === void 0) {
      units = "kilometers";
    }

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
    if (originalUnit === void 0) {
      originalUnit = "kilometers";
    }

    if (finalUnit === void 0) {
      finalUnit = "kilometers";
    }

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
    if (originalUnit === void 0) {
      originalUnit = "meters";
    }

    if (finalUnit === void 0) {
      finalUnit = "kilometers";
    }

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

    return area / startFactor * finalFactor;
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
    return !!input && input.constructor === Object;
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

    if (["string", "number"].indexOf(_typeof(id)) === -1) {
      throw new Error("id must be a number or a string");
    }
  }

  exports.validateId = validateId; // Deprecated methods

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

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
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
    var j,
        k,
        l,
        geometry,
        stopG,
        coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1; // This logic may look a little weird. The reason why it is that way
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
      geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

      for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
        var multiFeatureIndex = 0;
        var geometryIndex = 0;
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection; // Handles null Geometry -- Skips this geometry

        if (geometry === null) continue;
        coords = geometry.coordinates;
        var geomType = geometry.type;
        wrapShrink = excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon') ? 1 : 0;

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
            for (j = 0; j < geometry.geometries.length; j++) {
              if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
            }

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
      if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
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
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;else previousValue = callback(previousValue, currentProperties, featureIndex);
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
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;else previousValue = callback(previousValue, currentFeature, featureIndex);
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
    var i,
        j,
        g,
        geometry,
        stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1; // This logic may look a little weird. The reason why it is that way
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
      geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
      featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
      featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : undefined;
      featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : undefined;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

      for (g = 0; g < stopG; g++) {
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection; // Handle null Geometry

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
          case 'MultiPolygon':
            {
              if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
              break;
            }

          case 'GeometryCollection':
            {
              for (j = 0; j < geometry.geometries.length; j++) {
                if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
              }

              break;
            }

          default:
            throw new Error('Unknown Geometry Type');
        }
      } // Only increase `featureIndex` per each feature


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
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
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
      var type = geometry === null ? null : geometry.type;

      switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
          if (callback(helpers.feature(geometry, properties, {
            bbox: bbox,
            id: id
          }), featureIndex, 0) === false) return false;
          return;
      }

      var geomType; // Callback for multi-geometry

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
      if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature;else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
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
      var segmentIndex = 0; // Exclude null Geometries

      if (!feature.geometry) return; // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.

      var type = feature.geometry.type;
      if (type === 'Point' || type === 'MultiPoint') return; // Generate 2-vertex line segments

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
      if (started === false && initialValue === undefined) previousValue = currentSegment;else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
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
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine;else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
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
    var segmentIndex = options.segmentIndex || 0; // Find FeatureIndex

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
    } // Find SegmentIndex


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
    var coordIndex = options.coordIndex || 0; // Find FeatureIndex

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
    } // Find Coord Index


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

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
    if (options === void 0) {
      options = {};
    }

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

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
    if (options === void 0) {
      options = {};
    } // Optional parameters


    var precision = options.precision;
    var coordinates = options.coordinates;
    var mutate = options.mutate; // default params

    precision = precision === undefined || precision === null || isNaN(precision) ? 6 : precision;
    coordinates = coordinates === undefined || coordinates === null || isNaN(coordinates) ? 3 : coordinates; // validation

    if (!geojson) throw new Error('<geojson> is required');
    if (typeof precision !== 'number') throw new Error('<precision> must be a number');
    if (typeof coordinates !== 'number') throw new Error('<coordinates> must be a number'); // prevent input mutation

    if (mutate === false || mutate === undefined) geojson = JSON.parse(JSON.stringify(geojson));
    var factor = Math.pow(10, precision); // Truncate Coordinates

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
    if (coords.length > coordinates) coords.splice(coordinates, coords.length); // Truncate coordinate decimals

    for (var i = 0; i < coords.length; i++) {
      coords[i] = Math.round(coords[i] * factor) / factor;
    }

    return coords;
  }

  exports.default = truncate;
});
var truncate = unwrapExports(truncate_1);

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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

var makeUpdateFeaturesProperty = function makeUpdateFeaturesProperty(_ref) {
  var key_alt = _ref.key_alt,
      key = _ref.key,
      map = _ref.map,
      mapFn = _ref.mapFn,
      propName = _ref.propName;
  return updateKey('features', mapWith(updateKey('properties', function (properties) {
    var propValue;

    if (map) {
      propValue = has(map, properties[key]) ? map[properties[key]] : has(map, properties[key_alt]) ? map[properties[key_alt]] : undefined;
    } else if (mapFn) {
      propValue = properties[key] ? mapFn(properties[key]) : properties[key_alt] ? mapFn(properties[key_alt]) : undefined;
    }

    return _objectSpread$2(_objectSpread$2({}, properties), {}, _defineProperty({}, propName, propValue));
  })));
};
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

var makeCentroids = pipe([mapWith(function (feature) {
  return centroid(feature, {
    properties: feature.properties
  });
}), helpers_13]);

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

var setGeometryPrecision = function setGeometryPrecision(precision) {
  return function (geojson) {
    return truncate(geojson, {
      precision: precision,
      mutate: false
    });
  };
}; // TODO DOC: define FeatureCollection type



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

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethSVG.svelte";

function get_each_context$4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[35] = list[i];
  return child_ctx;
} // (85:0) {#if height && width}


function create_if_block$5(ctx) {
  var svg;
  var g;
  var g_transform_value;
  var if_block =
  /*isReady*/
  ctx[15] && create_if_block_1$4(ctx);
  var block = {
    c: function create() {
      svg = svg_element("svg");
      g = svg_element("g");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        height: true,
        width: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      g = claim_element(svg_nodes, "g", {
        transform: true
      }, 1);
      var g_nodes = children(g);
      if (if_block) if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "transform", g_transform_value = "translate(".concat(
      /*safety*/
      ctx[18].left, ",").concat(
      /*safety*/
      ctx[18].top, ")"));
      add_location(g, file$8, 86, 2, 2743);
      attr_dev(svg, "height",
      /*height*/
      ctx[0]);
      attr_dev(svg, "width",
      /*width*/
      ctx[1]);
      attr_dev(svg, "class", "svelte-113z93j");
      add_location(svg, file$8, 85, 0, 2718);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);
      append_dev(svg, g);
      if (if_block) if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*isReady*/
      ctx[15]) {
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

      if (dirty[0] &
      /*height*/
      1) {
        attr_dev(svg, "height",
        /*height*/
        ctx[0]);
      }

      if (dirty[0] &
      /*width*/
      2) {
        attr_dev(svg, "width",
        /*width*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(85:0) {#if height && width}",
    ctx: ctx
  });
  return block;
} // (88:4) {#if isReady}


function create_if_block_1$4(ctx) {
  var rect;
  var each_1_anchor;
  var each_value =
  /*coloredGeojson*/
  ctx[10].features;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      rect = svg_element("rect");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_element(nodes, "rect", {
        height: true,
        width: true,
        fill: true
      }, 1);
      children(rect).forEach(detach_dev);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[0]);
      attr_dev(rect, "width",
      /*width*/
      ctx[1]);
      attr_dev(rect, "fill",
      /*colorSea*/
      ctx[3]);
      add_location(rect, file$8, 88, 4, 2825);
    },
    m: function mount(target, anchor) {
      insert_dev(target, rect, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      1) {
        attr_dev(rect, "height",
        /*height*/
        ctx[0]);
      }

      if (dirty[0] &
      /*width*/
      2) {
        attr_dev(rect, "width",
        /*width*/
        ctx[1]);
      }

      if (dirty[0] &
      /*colorSea*/
      8) {
        attr_dev(rect, "fill",
        /*colorSea*/
        ctx[3]);
      }

      if (dirty[0] &
      /*key_alt, geopath, coloredGeojson, colorDefaultFill, isSelected, colorStrokeSelected, colorStroke, sizeStrokeSelected, sizeStroke, isClickable, isDeselected, dispatch, getPayload, isInteractive*/
      229364) {
        each_value =
        /*coloredGeojson*/
        ctx[10].features;
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$4(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$4(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
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
    block: block,
    id: create_if_block_1$4.name,
    type: "if",
    source: "(88:4) {#if isReady}",
    ctx: ctx
  });
  return block;
} // (94:4) {#each coloredGeojson.features as feature}


function create_each_block$4(ctx) {
  var g;
  var path;
  var path_d_value;
  var path_fill_value;
  var path_stroke_value;
  var path_stroke_width_value;
  var mounted;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[26].apply(_ctx, [
      /*feature*/
      ctx[35]].concat(args))
    );
  }

  function mouseenter_handler() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*mouseenter_handler*/
      (_ctx2 = ctx)[27].apply(_ctx2, [
      /*feature*/
      ctx[35]].concat(args))
    );
  }

  function mouseleave_handler() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*mouseleave_handler*/
      (_ctx3 = ctx)[28].apply(_ctx3, [
      /*feature*/
      ctx[35]].concat(args))
    );
  }

  var block = {
    c: function create() {
      g = svg_element("g");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        class: true,
        id: true
      }, 1);
      var g_nodes = children(g);
      path = claim_element(g_nodes, "path", {
        d: true,
        fill: true,
        stroke: true,
        "stroke-width": true,
        class: true
      }, 1);
      children(path).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", path_d_value =
      /*geopath*/
      ctx[11](
      /*feature*/
      ctx[35]));
      attr_dev(path, "fill", path_fill_value =
      /*feature*/
      ctx[35].properties.color ||
      /*colorDefaultFill*/
      ctx[2]);
      attr_dev(path, "stroke", path_stroke_value =
      /*isSelected*/
      ctx[13](
      /*feature*/
      ctx[35]) ?
      /*colorStrokeSelected*/
      ctx[5] :
      /*colorStroke*/
      ctx[4]);
      attr_dev(path, "stroke-width", path_stroke_width_value =
      /*isSelected*/
      ctx[13](
      /*feature*/
      ctx[35]) ?
      /*sizeStrokeSelected*/
      ctx[9] :
      /*sizeStroke*/
      ctx[8]);
      attr_dev(path, "class", "svelte-113z93j");
      toggle_class(path, "clickable",
      /*isClickable*/
      ctx[16](
      /*feature*/
      ctx[35]));
      toggle_class(path, "deselected",
      /*isDeselected*/
      ctx[14](
      /*feature*/
      ctx[35]));
      add_location(path, file$8, 95, 6, 2981);
      attr_dev(g, "class", "feature svelte-113z93j");
      attr_dev(g, "id",
      /*key_alt*/
      ctx[7]);
      add_location(g, file$8, 94, 4, 2940);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, path);

      if (!mounted) {
        dispose = [listen_dev(path, "click", click_handler, false, false, false), listen_dev(path, "mouseenter", mouseenter_handler, false, false, false), listen_dev(path, "mouseleave", mouseleave_handler, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*geopath, coloredGeojson*/
      3072 && path_d_value !== (path_d_value =
      /*geopath*/
      ctx[11](
      /*feature*/
      ctx[35]))) {
        attr_dev(path, "d", path_d_value);
      }

      if (dirty[0] &
      /*coloredGeojson, colorDefaultFill*/
      1028 && path_fill_value !== (path_fill_value =
      /*feature*/
      ctx[35].properties.color ||
      /*colorDefaultFill*/
      ctx[2])) {
        attr_dev(path, "fill", path_fill_value);
      }

      if (dirty[0] &
      /*isSelected, coloredGeojson, colorStrokeSelected, colorStroke*/
      9264 && path_stroke_value !== (path_stroke_value =
      /*isSelected*/
      ctx[13](
      /*feature*/
      ctx[35]) ?
      /*colorStrokeSelected*/
      ctx[5] :
      /*colorStroke*/
      ctx[4])) {
        attr_dev(path, "stroke", path_stroke_value);
      }

      if (dirty[0] &
      /*isSelected, coloredGeojson, sizeStrokeSelected, sizeStroke*/
      9984 && path_stroke_width_value !== (path_stroke_width_value =
      /*isSelected*/
      ctx[13](
      /*feature*/
      ctx[35]) ?
      /*sizeStrokeSelected*/
      ctx[9] :
      /*sizeStroke*/
      ctx[8])) {
        attr_dev(path, "stroke-width", path_stroke_width_value);
      }

      if (dirty[0] &
      /*isClickable, coloredGeojson*/
      66560) {
        toggle_class(path, "clickable",
        /*isClickable*/
        ctx[16](
        /*feature*/
        ctx[35]));
      }

      if (dirty[0] &
      /*isDeselected, coloredGeojson*/
      17408) {
        toggle_class(path, "deselected",
        /*isDeselected*/
        ctx[14](
        /*feature*/
        ctx[35]));
      }

      if (dirty[0] &
      /*key_alt*/
      128) {
        attr_dev(g, "id",
        /*key_alt*/
        ctx[7]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$4.name,
    type: "each",
    source: "(94:4) {#each coloredGeojson.features as feature}",
    ctx: ctx
  });
  return block;
}

function create_fragment$e(ctx) {
  var if_block_anchor;
  var if_block =
  /*height*/
  ctx[0] &&
  /*width*/
  ctx[1] && create_if_block$5(ctx);
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
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (
      /*height*/
      ctx[0] &&
      /*width*/
      ctx[1]) {
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
    block: block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$e($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var hasColor = isNotNullWith(getPath("properties.color"));
  var safety = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  var truncateGeojson = setGeometryPrecision(4);

  var topoToGeo = function topoToGeo(topojson, id) {
    return truncateGeojson(geoObject(topojson, topojson.objects[id]));
  };

  var height = $$props.height;
  var key = $$props.key;
  var topojson = $$props.topojson;
  var topojsonId = $$props.topojsonId;
  var width = $$props.width;
  var colorDefaultFill = $$props.colorDefaultFill;
  var colorSea = $$props.colorSea;
  var colorStroke = $$props.colorStroke;
  var colorStrokeSelected = $$props.colorStrokeSelected;
  var isInteractive = $$props.isInteractive;
  var key_alt = $$props.key_alt;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var projection = $$props.projection;
  var selectedKeys = $$props.selectedKeys;
  var sizeStroke = $$props.sizeStroke;
  var sizeStrokeSelected = $$props.sizeStrokeSelected;
  var writable_props = ["height", "key", "topojson", "topojsonId", "width", "colorDefaultFill", "colorSea", "colorStroke", "colorStrokeSelected", "isInteractive", "key_alt", "keyToColor", "keyToColorFn", "projection", "selectedKeys", "sizeStroke", "sizeStrokeSelected"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChoroplethSVG> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ChoroplethSVG", $$slots, []);

  var click_handler = function click_handler(feature) {
    return isClickable(feature) && dispatch("clicked", getPayload(feature));
  };

  var mouseenter_handler = function mouseenter_handler(feature) {
    return isInteractive && dispatch("entered", getPayload(feature));
  };

  var mouseleave_handler = function mouseleave_handler(feature) {
    return isInteractive && dispatch("exited", getPayload(feature));
  };

  $$self.$set = function ($$props) {
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

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      geoObject: geoObject,
      geoPath: geoPath,
      _: _,
      makeUpdateFeaturesProperty: makeUpdateFeaturesProperty,
      setGeometryPrecision: setGeometryPrecision,
      isNotNullWith: isNotNullWith,
      projections: projections,
      dispatch: dispatch,
      hasColor: hasColor,
      safety: safety,
      truncateGeojson: truncateGeojson,
      topoToGeo: topoToGeo,
      height: height,
      key: key,
      topojson: topojson,
      topojsonId: topojsonId,
      width: width,
      colorDefaultFill: colorDefaultFill,
      colorSea: colorSea,
      colorStroke: colorStroke,
      colorStrokeSelected: colorStrokeSelected,
      isInteractive: isInteractive,
      key_alt: key_alt,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      projection: projection,
      selectedKeys: selectedKeys,
      sizeStroke: sizeStroke,
      sizeStrokeSelected: sizeStrokeSelected,
      geojson: geojson,
      createColoredGeojson: createColoredGeojson,
      coloredGeojson: coloredGeojson,
      fitProjection: fitProjection,
      geopath: geopath,
      getPayload: getPayload,
      isSelected: isSelected,
      isDeselected: isDeselected,
      isReady: isReady,
      isClickable: isClickable
    };
  };

  $$self.$inject_state = function ($$props) {
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

  var geojson;
  var createColoredGeojson;
  var coloredGeojson;
  var fitProjection;
  var geopath;
  var getPayload;
  var isSelected;
  var isDeselected;
  var isReady;
  var isClickable;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*colorDefaultFill*/
    4) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
       $$invalidate(2, colorDefaultFill = colorDefaultFill || "white");
    }

    if ($$self.$$.dirty[0] &
    /*colorSea*/
    8) {
       $$invalidate(3, colorSea = colorSea || "white");
    }

    if ($$self.$$.dirty[0] &
    /*colorStroke*/
    16) {
       $$invalidate(4, colorStroke = colorStroke || "grey");
    }

    if ($$self.$$.dirty[0] &
    /*colorStrokeSelected*/
    32) {
       $$invalidate(5, colorStrokeSelected = colorStrokeSelected || "black");
    }

    if ($$self.$$.dirty[0] &
    /*topojson, topojsonId*/
    12582912) {
       $$invalidate(29, geojson = topoToGeo(topojson, topojsonId));
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    64) {
       $$invalidate(6, isInteractive = isInteractive || false);
    }

    if ($$self.$$.dirty[0] &
    /*key_alt*/
    128) {
       $$invalidate(7, key_alt = key_alt || "name");
    }

    if ($$self.$$.dirty[0] &
    /*projection*/
    524288) {
       $$invalidate(19, projection = projection && projections[projection] || equirectangular);
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys*/
    1048576) {
       $$invalidate(20, selectedKeys = selectedKeys || []);
    }

    if ($$self.$$.dirty[0] &
    /*sizeStroke*/
    256) {
       $$invalidate(8, sizeStroke = sizeStroke || 0.5);
    }

    if ($$self.$$.dirty[0] &
    /*sizeStrokeSelected*/
    512) {
       $$invalidate(9, sizeStrokeSelected = sizeStrokeSelected || 1);
    }

    if ($$self.$$.dirty[0] &
    /*height*/
    1) {
       $$invalidate(0, height = Math.max(0, height - safety.top - safety.bottom));
    }

    if ($$self.$$.dirty[0] &
    /*width*/
    2) {
       $$invalidate(1, width = Math.max(0, width - safety.left - safety.right));
    }

    if ($$self.$$.dirty[0] &
    /*key_alt, key, keyToColor, keyToColorFn*/
    52428928) {
       $$invalidate(30, createColoredGeojson = makeUpdateFeaturesProperty({
        key_alt: key_alt,
        key: key,
        map: keyToColor,
        mapFn: keyToColorFn,
        propName: "color"
      }));
    }

    if ($$self.$$.dirty[0] &
    /*geojson, createColoredGeojson*/
    1610612736) {
       $$invalidate(10, coloredGeojson = geojson && createColoredGeojson(geojson));
    }

    if ($$self.$$.dirty[0] &
    /*geojson, projection, width, height*/
    537395203) {
       $$invalidate(31, fitProjection = geojson && projection().fitSize([width, height], geojson));
    }

    if ($$self.$$.dirty[1] &
    /*fitProjection*/
    1) {
       $$invalidate(11, geopath = fitProjection && geoPath(fitProjection));
    }

    if ($$self.$$.dirty[0] &
    /*key, key_alt*/
    2097280) {
       $$invalidate(12, getPayload = function getPayload(feature) {
        return feature.properties[key] || feature.properties[key_alt];
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    1052672) {
       $$invalidate(13, isSelected = function isSelected(feature) {
        return selectedKeys.length && selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*selectedKeys, getPayload*/
    1052672) {
       $$invalidate(14, isDeselected = function isDeselected(feature) {
        return selectedKeys.length && !selectedKeys.includes(getPayload(feature));
      });
    }

    if ($$self.$$.dirty[0] &
    /*geopath, coloredGeojson*/
    3072) {
       $$invalidate(15, isReady = geopath && coloredGeojson);
    }

    if ($$self.$$.dirty[0] &
    /*isInteractive*/
    64) {
       $$invalidate(16, isClickable = function isClickable(feature) {
        return isInteractive && hasColor(feature);
      });
    }
  };

  return [height, width, colorDefaultFill, colorSea, colorStroke, colorStrokeSelected, isInteractive, key_alt, sizeStroke, sizeStrokeSelected, coloredGeojson, geopath, getPayload, isSelected, isDeselected, isReady, isClickable, dispatch, safety, projection, selectedKeys, key, topojson, topojsonId, keyToColor, keyToColorFn, click_handler, mouseenter_handler, mouseleave_handler];
}

var ChoroplethSVG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethSVG, _SvelteComponentDev);

  var _super = _createSuper$e(ChoroplethSVG);

  function ChoroplethSVG(options) {
    var _this;

    _classCallCheck(this, ChoroplethSVG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
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
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChoroplethSVG",
      options: options,
      id: create_fragment$e.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*height*/
    ctx[0] === undefined && !("height" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'height'");
    }

    if (
    /*key*/
    ctx[21] === undefined && !("key" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'key'");
    }

    if (
    /*topojson*/
    ctx[22] === undefined && !("topojson" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'topojson'");
    }

    if (
    /*topojsonId*/
    ctx[23] === undefined && !("topojsonId" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'topojsonId'");
    }

    if (
    /*width*/
    ctx[1] === undefined && !("width" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'width'");
    }

    if (
    /*colorDefaultFill*/
    ctx[2] === undefined && !("colorDefaultFill" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'colorDefaultFill'");
    }

    if (
    /*colorSea*/
    ctx[3] === undefined && !("colorSea" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'colorSea'");
    }

    if (
    /*colorStroke*/
    ctx[4] === undefined && !("colorStroke" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'colorStroke'");
    }

    if (
    /*colorStrokeSelected*/
    ctx[5] === undefined && !("colorStrokeSelected" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'colorStrokeSelected'");
    }

    if (
    /*isInteractive*/
    ctx[6] === undefined && !("isInteractive" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'isInteractive'");
    }

    if (
    /*key_alt*/
    ctx[7] === undefined && !("key_alt" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'key_alt'");
    }

    if (
    /*keyToColor*/
    ctx[24] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[25] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*projection*/
    ctx[19] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'projection'");
    }

    if (
    /*selectedKeys*/
    ctx[20] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'selectedKeys'");
    }

    if (
    /*sizeStroke*/
    ctx[8] === undefined && !("sizeStroke" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'sizeStroke'");
    }

    if (
    /*sizeStrokeSelected*/
    ctx[9] === undefined && !("sizeStrokeSelected" in props)) {
      console.warn("<ChoroplethSVG> was created without expected prop 'sizeStrokeSelected'");
    }

    return _this;
  }

  _createClass(ChoroplethSVG, [{
    key: "height",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojson",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojsonId",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorDefaultFill",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorSea",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorStroke",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorStrokeSelected",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key_alt",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projection",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedKeys",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sizeStroke",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sizeStrokeSelected",
    get: function get() {
      throw new Error("<ChoroplethSVG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethSVG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ChoroplethSVG;
}(SvelteComponentDev);

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "Users/lbonavita/Dev/projects/nesta/svizzle/packages/components/choropleth/src/ChoroplethDiv.svelte";

function create_fragment$f(ctx) {
  var div;
  var choroplethsvg;
  var div_resize_listener;
  var current;
  choroplethsvg = new ChoroplethSVG({
    props: {
      colorDefaultFill:
      /*colorDefaultFill*/
      ctx[0],
      colorSea:
      /*colorSea*/
      ctx[1],
      colorStroke:
      /*colorStroke*/
      ctx[2],
      colorStrokeSelected:
      /*colorStrokeSelected*/
      ctx[3],
      height:
      /*height*/
      ctx[14],
      isInteractive:
      /*isInteractive*/
      ctx[4],
      key:
      /*key*/
      ctx[5],
      keyToColor:
      /*keyToColor*/
      ctx[6],
      keyToColorFn:
      /*keyToColorFn*/
      ctx[7],
      projection:
      /*projection*/
      ctx[8],
      selectedKeys:
      /*selectedKeys*/
      ctx[9],
      sizeStroke:
      /*sizeStroke*/
      ctx[10],
      sizeStrokeSelected:
      /*sizeStrokeSelected*/
      ctx[11],
      topojson:
      /*topojson*/
      ctx[12],
      topojsonId:
      /*topojsonId*/
      ctx[13],
      width:
      /*width*/
      ctx[15]
    },
    $$inline: true
  });
  choroplethsvg.$on("clicked",
  /*clicked_handler*/
  ctx[16]);
  choroplethsvg.$on("entered",
  /*entered_handler*/
  ctx[17]);
  choroplethsvg.$on("exited",
  /*exited_handler*/
  ctx[18]);
  var block = {
    c: function create() {
      div = element("div");
      create_component(choroplethsvg.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(choroplethsvg.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "ChoroplethDiv svelte-1g30svd");
      add_render_callback(function () {
        return (
          /*div_elementresize_handler*/
          ctx[19].call(div)
        );
      });
      add_location(div, file$9, 23, 0, 498);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(choroplethsvg, div, null);
      div_resize_listener = add_resize_listener(div,
      /*div_elementresize_handler*/
      ctx[19].bind(div));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var choroplethsvg_changes = {};
      if (dirty &
      /*colorDefaultFill*/
      1) choroplethsvg_changes.colorDefaultFill =
      /*colorDefaultFill*/
      ctx[0];
      if (dirty &
      /*colorSea*/
      2) choroplethsvg_changes.colorSea =
      /*colorSea*/
      ctx[1];
      if (dirty &
      /*colorStroke*/
      4) choroplethsvg_changes.colorStroke =
      /*colorStroke*/
      ctx[2];
      if (dirty &
      /*colorStrokeSelected*/
      8) choroplethsvg_changes.colorStrokeSelected =
      /*colorStrokeSelected*/
      ctx[3];
      if (dirty &
      /*height*/
      16384) choroplethsvg_changes.height =
      /*height*/
      ctx[14];
      if (dirty &
      /*isInteractive*/
      16) choroplethsvg_changes.isInteractive =
      /*isInteractive*/
      ctx[4];
      if (dirty &
      /*key*/
      32) choroplethsvg_changes.key =
      /*key*/
      ctx[5];
      if (dirty &
      /*keyToColor*/
      64) choroplethsvg_changes.keyToColor =
      /*keyToColor*/
      ctx[6];
      if (dirty &
      /*keyToColorFn*/
      128) choroplethsvg_changes.keyToColorFn =
      /*keyToColorFn*/
      ctx[7];
      if (dirty &
      /*projection*/
      256) choroplethsvg_changes.projection =
      /*projection*/
      ctx[8];
      if (dirty &
      /*selectedKeys*/
      512) choroplethsvg_changes.selectedKeys =
      /*selectedKeys*/
      ctx[9];
      if (dirty &
      /*sizeStroke*/
      1024) choroplethsvg_changes.sizeStroke =
      /*sizeStroke*/
      ctx[10];
      if (dirty &
      /*sizeStrokeSelected*/
      2048) choroplethsvg_changes.sizeStrokeSelected =
      /*sizeStrokeSelected*/
      ctx[11];
      if (dirty &
      /*topojson*/
      4096) choroplethsvg_changes.topojson =
      /*topojson*/
      ctx[12];
      if (dirty &
      /*topojsonId*/
      8192) choroplethsvg_changes.topojsonId =
      /*topojsonId*/
      ctx[13];
      if (dirty &
      /*width*/
      32768) choroplethsvg_changes.width =
      /*width*/
      ctx[15];
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
    block: block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$f($$self, $$props, $$invalidate) {
  var colorDefaultFill = $$props.colorDefaultFill;
  var colorSea = $$props.colorSea;
  var colorStroke = $$props.colorStroke;
  var colorStrokeSelected = $$props.colorStrokeSelected;
  var isInteractive = $$props.isInteractive;
  var key = $$props.key;
  var keyToColor = $$props.keyToColor;
  var keyToColorFn = $$props.keyToColorFn;
  var projection = $$props.projection;
  var selectedKeys = $$props.selectedKeys;
  var sizeStroke = $$props.sizeStroke;
  var sizeStrokeSelected = $$props.sizeStrokeSelected;
  var topojson = $$props.topojson;
  var topojsonId = $$props.topojsonId;
  var height;
  var width;
  var writable_props = ["colorDefaultFill", "colorSea", "colorStroke", "colorStrokeSelected", "isInteractive", "key", "keyToColor", "keyToColorFn", "projection", "selectedKeys", "sizeStroke", "sizeStrokeSelected", "topojson", "topojsonId"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChoroplethDiv> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
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

  $$self.$set = function ($$props) {
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

  $$self.$capture_state = function () {
    return {
      ChoroplethSVG: ChoroplethSVG,
      colorDefaultFill: colorDefaultFill,
      colorSea: colorSea,
      colorStroke: colorStroke,
      colorStrokeSelected: colorStrokeSelected,
      isInteractive: isInteractive,
      key: key,
      keyToColor: keyToColor,
      keyToColorFn: keyToColorFn,
      projection: projection,
      selectedKeys: selectedKeys,
      sizeStroke: sizeStroke,
      sizeStrokeSelected: sizeStrokeSelected,
      topojson: topojson,
      topojsonId: topojsonId,
      height: height,
      width: width
    };
  };

  $$self.$inject_state = function ($$props) {
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

  return [colorDefaultFill, colorSea, colorStroke, colorStrokeSelected, isInteractive, key, keyToColor, keyToColorFn, projection, selectedKeys, sizeStroke, sizeStrokeSelected, topojson, topojsonId, height, width, clicked_handler, entered_handler, exited_handler, div_elementresize_handler];
}

var ChoroplethDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ChoroplethDiv, _SvelteComponentDev);

  var _super = _createSuper$f(ChoroplethDiv);

  function ChoroplethDiv(options) {
    var _this;

    _classCallCheck(this, ChoroplethDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
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
      component: _assertThisInitialized(_this),
      tagName: "ChoroplethDiv",
      options: options,
      id: create_fragment$f.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*colorDefaultFill*/
    ctx[0] === undefined && !("colorDefaultFill" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'colorDefaultFill'");
    }

    if (
    /*colorSea*/
    ctx[1] === undefined && !("colorSea" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'colorSea'");
    }

    if (
    /*colorStroke*/
    ctx[2] === undefined && !("colorStroke" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'colorStroke'");
    }

    if (
    /*colorStrokeSelected*/
    ctx[3] === undefined && !("colorStrokeSelected" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'colorStrokeSelected'");
    }

    if (
    /*isInteractive*/
    ctx[4] === undefined && !("isInteractive" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'isInteractive'");
    }

    if (
    /*key*/
    ctx[5] === undefined && !("key" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'key'");
    }

    if (
    /*keyToColor*/
    ctx[6] === undefined && !("keyToColor" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColor'");
    }

    if (
    /*keyToColorFn*/
    ctx[7] === undefined && !("keyToColorFn" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'keyToColorFn'");
    }

    if (
    /*projection*/
    ctx[8] === undefined && !("projection" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'projection'");
    }

    if (
    /*selectedKeys*/
    ctx[9] === undefined && !("selectedKeys" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'selectedKeys'");
    }

    if (
    /*sizeStroke*/
    ctx[10] === undefined && !("sizeStroke" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'sizeStroke'");
    }

    if (
    /*sizeStrokeSelected*/
    ctx[11] === undefined && !("sizeStrokeSelected" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'sizeStrokeSelected'");
    }

    if (
    /*topojson*/
    ctx[12] === undefined && !("topojson" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'topojson'");
    }

    if (
    /*topojsonId*/
    ctx[13] === undefined && !("topojsonId" in props)) {
      console.warn("<ChoroplethDiv> was created without expected prop 'topojsonId'");
    }

    return _this;
  }

  _createClass(ChoroplethDiv, [{
    key: "colorDefaultFill",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorSea",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorStroke",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "colorStrokeSelected",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isInteractive",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColor",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "keyToColorFn",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "projection",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedKeys",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sizeStroke",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sizeStrokeSelected",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojson",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "topojsonId",
    get: function get() {
      throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ChoroplethDiv;
}(SvelteComponentDev);



var choropleth = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ChoroplethSVG: ChoroplethSVG,
  ChoroplethDiv: ChoroplethDiv
});

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var components = _objectSpread$3(_objectSpread$3({}, barchart), choropleth);

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "src/routes/components/[slug].svelte";

function get_each_context$5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[16] = list[i][0];
  child_ctx[17] = list[i][1];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[20] = list[i].key;
  child_ctx[21] = list[i].value;
  child_ctx[23] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[20] = list[i][0];
  child_ctx[21] = list[i][1];
  return child_ctx;
} // (66:2) {#if payloads}


function create_if_block_1$5(ctx) {
  var h2;
  var t0;
  var t1;
  var div;

  var each_value_2 = pairs(
  /*payloads*/
  ctx[7]);

  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Events");
      t1 = space();
      div = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Events");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
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
      add_location(h2, file$a, 66, 2, 1592);
      attr_dev(div, "class", "distancer svelte-1yka1uv");
      add_location(div, file$a, 67, 2, 1610);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*_, payloads*/
      128) {
        each_value_2 = pairs(
        /*payloads*/
        ctx[7]);
        validate_each_argument(each_value_2);

        var _i4;

        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$5.name,
    type: "if",
    source: "(66:2) {#if payloads}",
    ctx: ctx
  });
  return block;
} // (69:3) {#each _.pairs(payloads) as [key, value]}


function create_each_block_2(ctx) {
  var div;
  var span;
  var t0_value =
  /*key*/
  ctx[20] + "";
  var t0;
  var t1;
  var pre;
  var t2_value = (
  /*value*/
  ctx[21] || "[payload]") + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      div = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      pre = element("pre");
      t2 = text(t2_value);
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      span_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      pre = claim_element(div_nodes, "PRE", {
        class: true
      });
      var pre_nodes = children(pre);
      t2 = claim_text(pre_nodes, t2_value);
      pre_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-1yka1uv");
      add_location(span, file$a, 70, 4, 1704);
      attr_dev(pre, "class", "svelte-1yka1uv");
      add_location(pre, file$a, 71, 4, 1727);
      attr_dev(div, "class", "row svelte-1yka1uv");
      add_location(div, file$a, 69, 3, 1682);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, span);
      append_dev(span, t0);
      append_dev(div, t1);
      append_dev(div, pre);
      append_dev(pre, t2);
      append_dev(div, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*payloads*/
      128 && t0_value !== (t0_value =
      /*key*/
      ctx[20] + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*payloads*/
      128 && t2_value !== (t2_value = (
      /*value*/
      ctx[21] || "[payload]") + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(69:3) {#each _.pairs(payloads) as [key, value]}",
    ctx: ctx
  });
  return block;
} // (79:3) {#if data.length > 1}


function create_if_block$6(ctx) {
  var div;
  var each_value_1 =
  /*data*/
  ctx[0];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "distancer svelte-1yka1uv");
      add_location(div, file$a, 79, 3, 1871);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*current_data_index, data*/
      33) {
        each_value_1 =
        /*data*/
        ctx[0];
        validate_each_argument(each_value_1);

        var _i8;

        for (_i8 = 0; _i8 < each_value_1.length; _i8 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_1(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(div, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(79:3) {#if data.length > 1}",
    ctx: ctx
  });
  return block;
} // (81:4) {#each data as {key, value}


function create_each_block_1(ctx) {
  var button;
  var t_value =
  /*key*/
  ctx[20] + "";
  var t;
  var mounted;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[11].apply(_ctx, [
      /*index*/
      ctx[23]].concat(args))
    );
  }

  var block = {
    c: function create() {
      button = element("button");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      t = claim_text(button_nodes, t_value);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(button, "class", "svelte-1yka1uv");
      toggle_class(button, "active",
      /*current_data_index*/
      ctx[5] ===
      /*index*/
      ctx[23]);
      add_location(button, file$a, 81, 4, 1939);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, t);

      if (!mounted) {
        dispose = listen_dev(button, "click", click_handler, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*data*/
      1 && t_value !== (t_value =
      /*key*/
      ctx[20] + "")) set_data_dev(t, t_value);

      if (dirty &
      /*current_data_index*/
      32) {
        toggle_class(button, "active",
        /*current_data_index*/
        ctx[5] ===
        /*index*/
        ctx[23]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(81:4) {#each data as {key, value}",
    ctx: ctx
  });
  return block;
} // (89:3) {#each displayProps as [propName, propValue]}


function create_each_block$5(ctx) {
  var h3;
  var code;
  var t0_value =
  /*propName*/
  ctx[16] + "";
  var t0;
  var t1;
  var div;
  var jsontree;
  var t2;
  var current;
  jsontree = new Root({
    props: {
      value:
      /*propValue*/
      ctx[17]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      h3 = element("h3");
      code = element("code");
      t0 = text(t0_value);
      t1 = space();
      div = element("div");
      create_component(jsontree.$$.fragment);
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      code = claim_element(h3_nodes, "CODE", {});
      var code_nodes = children(code);
      t0 = claim_text(code_nodes, t0_value);
      code_nodes.forEach(detach_dev);
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(jsontree.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(code, file$a, 89, 7, 2162);
      add_location(h3, file$a, 89, 3, 2158);
      attr_dev(div, "class", "distancer svelte-1yka1uv");
      add_location(div, file$a, 90, 3, 2194);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h3, anchor);
      append_dev(h3, code);
      append_dev(code, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);
      mount_component(jsontree, div, null);
      append_dev(div, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*displayProps*/
      512) && t0_value !== (t0_value =
      /*propName*/
      ctx[16] + "")) set_data_dev(t0, t0_value);
      var jsontree_changes = {};
      if (dirty &
      /*displayProps*/
      512) jsontree_changes.value =
      /*propValue*/
      ctx[17];
      jsontree.$set(jsontree_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(jsontree.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(jsontree.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h3);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_component(jsontree);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$5.name,
    type: "each",
    source: "(89:3) {#each displayProps as [propName, propValue]}",
    ctx: ctx
  });
  return block;
}

function create_fragment$g(ctx) {
  var title_value;
  var t0;
  var main;
  var h1;
  var t1;
  var t2;
  var div3;
  var div0;
  var elements;
  var t3;
  var div1;
  var h20;
  var t4;
  var t5;
  var pre;
  var t6_value =
  /*current_data*/
  ctx[8].usage + "";
  var t6;
  var t7;
  var t8;
  var div2;
  var h21;
  var t9;
  var t10;
  var t11;
  var t12;
  var div4;
  var switch_instance;
  var current;
  document.title = title_value = "" + (
  /*name*/
  ctx[2] + ": " +
  /*title*/
  ctx[3] + " - Svizzle");
  elements = new Elements({
    props: {
      elements:
      /*doc*/
      ctx[1]
    },
    $$inline: true
  });
  var if_block0 =
  /*payloads*/
  ctx[7] && create_if_block_1$5(ctx);
  var if_block1 =
  /*data*/
  ctx[0].length > 1 && create_if_block$6(ctx);
  var each_value =
  /*displayProps*/
  ctx[9];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var switch_instance_spread_levels = [
  /*current_data*/
  ctx[8].props];
  var switch_value =
  /*component*/
  ctx[6];

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var _i9 = 0; _i9 < switch_instance_spread_levels.length; _i9 += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[_i9]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
    /*switch_instance_binding*/

    ctx[12](switch_instance);
  }

  var block = {
    c: function create() {
      t0 = space();
      main = element("main");
      h1 = element("h1");
      t1 = text(
      /*title*/
      ctx[3]);
      t2 = space();
      div3 = element("div");
      div0 = element("div");
      create_component(elements.$$.fragment);
      t3 = space();
      div1 = element("div");
      h20 = element("h2");
      t4 = text("Usage");
      t5 = space();
      pre = element("pre");
      t6 = text(t6_value);
      t7 = space();
      if (if_block0) if_block0.c();
      t8 = space();
      div2 = element("div");
      h21 = element("h2");
      t9 = text("Props");
      t10 = space();
      if (if_block1) if_block1.c();
      t11 = space();

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].c();
      }

      t12 = space();
      div4 = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1sqseen\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      h1 = claim_element(main_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*title*/
      ctx[3]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(main_nodes);
      div3 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(elements.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h20 = claim_element(div1_nodes, "H2", {});
      var h20_nodes = children(h20);
      t4 = claim_text(h20_nodes, "Usage");
      h20_nodes.forEach(detach_dev);
      t5 = claim_space(div1_nodes);
      pre = claim_element(div1_nodes, "PRE", {
        class: true
      });
      var pre_nodes = children(pre);
      t6 = claim_text(pre_nodes, t6_value);
      pre_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t7 = claim_space(div3_nodes);
      if (if_block0) if_block0.l(div3_nodes);
      t8 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h21 = claim_element(div2_nodes, "H2", {});
      var h21_nodes = children(h21);
      t9 = claim_text(h21_nodes, "Props");
      h21_nodes.forEach(detach_dev);
      t10 = claim_space(div2_nodes);
      if (if_block1) if_block1.l(div2_nodes);
      t11 = claim_space(div2_nodes);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].l(div2_nodes);
      }

      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t12 = claim_space(main_nodes);
      div4 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      if (switch_instance) claim_component(switch_instance.$$.fragment, div4_nodes);
      div4_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-1yka1uv");
      add_location(h1, file$a, 56, 1, 1378);
      attr_dev(div0, "class", "distancer svelte-1yka1uv");
      add_location(div0, file$a, 58, 2, 1421);
      add_location(h20, file$a, 62, 3, 1514);
      attr_dev(pre, "class", "svelte-1yka1uv");
      add_location(pre, file$a, 63, 3, 1532);
      attr_dev(div1, "class", "distancer svelte-1yka1uv");
      add_location(div1, file$a, 61, 2, 1487);
      add_location(h21, file$a, 77, 3, 1828);
      attr_dev(div2, "class", "distancer svelte-1yka1uv");
      add_location(div2, file$a, 76, 2, 1801);
      attr_dev(div3, "class", "col col1 svelte-1yka1uv");
      add_location(div3, file$a, 57, 1, 1396);
      attr_dev(div4, "class", "col col2 svelte-1yka1uv");
      add_location(div4, file$a, 96, 1, 2292);
      attr_dev(main, "class", "svelte-1yka1uv");
      add_location(main, file$a, 55, 0, 1370);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, main, anchor);
      append_dev(main, h1);
      append_dev(h1, t1);
      append_dev(main, t2);
      append_dev(main, div3);
      append_dev(div3, div0);
      mount_component(elements, div0, null);
      append_dev(div3, t3);
      append_dev(div3, div1);
      append_dev(div1, h20);
      append_dev(h20, t4);
      append_dev(div1, t5);
      append_dev(div1, pre);
      append_dev(pre, t6);
      append_dev(div3, t7);
      if (if_block0) if_block0.m(div3, null);
      append_dev(div3, t8);
      append_dev(div3, div2);
      append_dev(div2, h21);
      append_dev(h21, t9);
      append_dev(div2, t10);
      if (if_block1) if_block1.m(div2, null);
      append_dev(div2, t11);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        each_blocks[_i12].m(div2, null);
      }

      append_dev(main, t12);
      append_dev(main, div4);

      if (switch_instance) {
        mount_component(switch_instance, div4, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*name, title*/
      12) && title_value !== (title_value = "" + (
      /*name*/
      ctx[2] + ": " +
      /*title*/
      ctx[3] + " - Svizzle"))) {
        document.title = title_value;
      }

      if (!current || dirty &
      /*title*/
      8) set_data_dev(t1,
      /*title*/
      ctx[3]);
      var elements_changes = {};
      if (dirty &
      /*doc*/
      2) elements_changes.elements =
      /*doc*/
      ctx[1];
      elements.$set(elements_changes);
      if ((!current || dirty &
      /*current_data*/
      256) && t6_value !== (t6_value =
      /*current_data*/
      ctx[8].usage + "")) set_data_dev(t6, t6_value);

      if (
      /*payloads*/
      ctx[7]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$5(ctx);
          if_block0.c();
          if_block0.m(div3, t8);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*data*/
      ctx[0].length > 1) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block$6(ctx);
          if_block1.c();
          if_block1.m(div2, t11);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty &
      /*displayProps*/
      512) {
        each_value =
        /*displayProps*/
        ctx[9];
        validate_each_argument(each_value);

        var _i13;

        for (_i13 = 0; _i13 < each_value.length; _i13 += 1) {
          var child_ctx = get_each_context$5(ctx, each_value, _i13);

          if (each_blocks[_i13]) {
            each_blocks[_i13].p(child_ctx, dirty);

            transition_in(each_blocks[_i13], 1);
          } else {
            each_blocks[_i13] = create_each_block$5(child_ctx);

            each_blocks[_i13].c();

            transition_in(each_blocks[_i13], 1);

            each_blocks[_i13].m(div2, null);
          }
        }

        group_outros();

        for (_i13 = each_value.length; _i13 < each_blocks.length; _i13 += 1) {
          out(_i13);
        }

        check_outros();
      }

      var switch_instance_changes = dirty &
      /*current_data*/
      256 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*current_data*/
      ctx[8].props)]) : {};

      if (switch_value !== (switch_value =
      /*component*/
      ctx[6])) {
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
          /*switch_instance_binding*/

          ctx[12](switch_instance);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div4, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(elements.$$.fragment, local);

      for (var _i14 = 0; _i14 < each_value.length; _i14 += 1) {
        transition_in(each_blocks[_i14]);
      }

      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(elements.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        transition_out(each_blocks[_i15]);
      }

      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      destroy_component(elements);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      destroy_each(each_blocks, detaching);
      /*switch_instance_binding*/

      ctx[12](null);
      if (switch_instance) destroy_component(switch_instance);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function preload(_ref3) {
  var params = _ref3.params,
      query = _ref3.query;
  return lookup[params.slug];
}

function instance_1($$self, $$props, $$invalidate) {
  var makeKeyedEmptyString = makeKeyed("");
  var data = $$props.data;
  var doc = $$props.doc;
  var events = $$props.events;
  var name = $$props.name;
  var title = $$props.title;
  var instance;

  var makeEventHandler = function makeEventHandler(eventName) {
    return function (event) {
      $$invalidate(7, payloads = setIn(payloads, eventName, JSON.stringify(event.detail)));
    };
  };

  var eventRemovers = [];
  var writable_props = ["data", "doc", "events", "name", "title"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bslugu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bslugu5D", $$slots, []);

  var click_handler = function click_handler(index) {
    $$invalidate(5, current_data_index = index);
  };

  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      instance = $$value;
      $$invalidate(4, instance);
    });
  }

  $$self.$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("events" in $$props) $$invalidate(10, events = $$props.events);
    if ("name" in $$props) $$invalidate(2, name = $$props.name);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
  };

  $$self.$capture_state = function () {
    return {
      lookup: lookup,
      preload: preload,
      _: _,
      makeKeyed: makeKeyed,
      JSONTree: Root,
      Elements: Elements,
      components: components,
      makeKeyedEmptyString: makeKeyedEmptyString,
      data: data,
      doc: doc,
      events: events,
      name: name,
      title: title,
      instance: instance,
      makeEventHandler: makeEventHandler,
      eventRemovers: eventRemovers,
      current_data_index: current_data_index,
      component: component,
      payloads: payloads,
      current_data: current_data,
      displayProps: displayProps
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("events" in $$props) $$invalidate(10, events = $$props.events);
    if ("name" in $$props) $$invalidate(2, name = $$props.name);
    if ("title" in $$props) $$invalidate(3, title = $$props.title);
    if ("instance" in $$props) $$invalidate(4, instance = $$props.instance);
    if ("eventRemovers" in $$props) $$invalidate(13, eventRemovers = $$props.eventRemovers);
    if ("current_data_index" in $$props) $$invalidate(5, current_data_index = $$props.current_data_index);
    if ("component" in $$props) $$invalidate(6, component = $$props.component);
    if ("payloads" in $$props) $$invalidate(7, payloads = $$props.payloads);
    if ("current_data" in $$props) $$invalidate(8, current_data = $$props.current_data);
    if ("displayProps" in $$props) $$invalidate(9, displayProps = $$props.displayProps);
  };

  var current_data_index;
  var component;
  var payloads;
  var current_data;
  var displayProps;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*data*/
    1) {
       $$invalidate(5, current_data_index = data && 0); // reset to zero on navigation

    }

    if ($$self.$$.dirty &
    /*name*/
    4) {
       $$invalidate(6, component = components[name]);
    }

    if ($$self.$$.dirty &
    /*events*/
    1024) {
       $$invalidate(7, payloads = events ? makeKeyedEmptyString(events) : null);
    }

    if ($$self.$$.dirty &
    /*data, current_data_index*/
    33) {
       $$invalidate(8, current_data = data[current_data_index]);
    }

    if ($$self.$$.dirty &
    /*current_data*/
    256) {
       $$invalidate(9, displayProps = pairs(current_data.props));
    }

    if ($$self.$$.dirty &
    /*data, instance, eventRemovers, events*/
    9233) {
       if (data && instance) {
        eventRemovers.forEach(function (remove) {
          return remove();
        });
        $$invalidate(13, eventRemovers = []);
        events && events.forEach(function (eventName) {
          var eventHandler = makeEventHandler(eventName);
          var eventRemover = instance.$on(eventName, eventHandler);
          eventRemovers.push(eventRemover);
        });
      }
    }
  };

  return [data, doc, name, title, instance, current_data_index, component, payloads, current_data, displayProps, events, click_handler, switch_instance_binding];
}

var U5Bslugu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bslugu5D, _SvelteComponentDev);

  var _super = _createSuper$g(U5Bslugu5D);

  function U5Bslugu5D(options) {
    var _this;

    _classCallCheck(this, U5Bslugu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance_1, create_fragment$g, safe_not_equal, {
      data: 0,
      doc: 1,
      events: 10,
      name: 2,
      title: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bslugu5D",
      options: options,
      id: create_fragment$g.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'data'");
    }

    if (
    /*doc*/
    ctx[1] === undefined && !("doc" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'doc'");
    }

    if (
    /*events*/
    ctx[10] === undefined && !("events" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'events'");
    }

    if (
    /*name*/
    ctx[2] === undefined && !("name" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'name'");
    }

    if (
    /*title*/
    ctx[3] === undefined && !("title" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'title'");
    }

    return _this;
  }

  _createClass(U5Bslugu5D, [{
    key: "data",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "doc",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "events",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "name",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bslugu5D;
}(SvelteComponentDev);

export default U5Bslugu5D;
export { preload };
