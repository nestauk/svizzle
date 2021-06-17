import { A as _slicedToArray, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, x as validate_each_argument, v as validate_slots, Z as validate_store, af as subscribe, ag as onMount, g as element, t as text, f as space, k as claim_element, l as children, m as claim_text, h as detach_dev, j as claim_space, n as attr_dev, o as add_location, p as insert_dev, r as append_dev, H as set_data_dev, z as destroy_each, W as add_render_callback, X as add_resize_listener, u as noop, a4 as binding_callbacks, E as toggle_class, ah as action_destroyer, a1 as is_function, $ as component_subscribe, F as svg_element, K as empty, N as create_component, O as claim_component, P as mount_component, I as listen_dev, C as transition_in, D as transition_out, Q as destroy_component, a2 as run_all, R as group_outros, T as check_outros, y as create_slot, B as update_slot, q as query_selector_all } from './client.6106bd4c.js';
import { S as ScreenGauge } from './ScreenGauge.bbe8c4a3.js';
import { a as List, A as Activity, B as BarChart, C as Clock, M as MapPin, L as LoadingView } from './LoadingView.a107c000.js';
import { s as setGroups, _ as _timelineLayout, a as _yearRange, b as shortenYear, c as _isSmallScreen, d as _routes, e as _screenClasses, f as _viewsClasses, g as _isTimelineHidden, h as _timelineWidth, i as _timelineHeight, j as _availableYears, k as _selectedYear, l as _views, m as showView, n as _groups } from './stores.375617f3.js';
import { m as makeURL, h as hrefBase } from './_navigation.48c1bbce.js';
import { D as _, a6 as isNotNil, ah as findIndex, ai as is, z as last, b as mapValuesWith } from './defaultLocale.76beb823.js';
import { I as Icon, a as Info } from './Info.55e98c04.js';
import { S as Settings } from './Settings.d1196423.js';
import { _ as _style, a as _theme, c as customizeTheme } from './theme.386343d9.js';
import './linear.28f0351f.js';

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
var truthynessTo = function truthynessTo(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      valueIfTruthy = _ref2[0],
      valueIfFalsy = _ref2[1];

  return function (x) {
    return x ? valueIfTruthy : valueIfFalsy;
  };
};

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "../../components/time_region_value/src/node_modules/components/Sidebar.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i].label;
  child_ctx[11] = list[i].indicators;
  return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[14] = list[i].title;
  child_ctx[15] = list[i].schema;
  return child_ctx;
} // (57:3) {#each indicators as {title, schema}}


function create_each_block_1$1(ctx) {
  var a;
  var p;
  var t_value =
  /*title*/
  ctx[14] + "";
  var t;
  var keepOnScreen_action;
  var a_href_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      a = element("a");
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        rel: true,
        href: true,
        class: true
      });
      var a_nodes = children(a);
      p = claim_element(a_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "svelte-o5dbbu");
      toggle_class(p, "selected",
      /*schema*/
      ctx[15].value.id ===
      /*currentId*/
      ctx[1]);
      add_location(p, file$4, 61, 5, 1310);
      attr_dev(a, "rel", "prefetch");
      attr_dev(a, "href", a_href_value = makeURL(
      /*hrefBase*/
      ctx[2],
      /*schema*/
      ctx[15].value.id));
      attr_dev(a, "class", "svelte-o5dbbu");
      add_location(a, file$4, 57, 4, 1229);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, p);
      append_dev(p, t);

      if (!mounted) {
        dispose = action_destroyer(keepOnScreen_action =
        /*keepOnScreen*/
        ctx[6].call(null, p, {
          id:
          /*schema*/
          ctx[15].value.id,
          currentId:
          /*currentId*/
          ctx[1],
          scrollableHeight:
          /*scrollableHeight*/
          ctx[5]
        }));
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*$_groups*/
      8 && t_value !== (t_value =
      /*title*/
      ctx[14] + "")) set_data_dev(t, t_value);
      if (keepOnScreen_action && is_function(keepOnScreen_action.update) && dirty &
      /*$_groups, currentId, scrollableHeight*/
      42) keepOnScreen_action.update.call(null, {
        id:
        /*schema*/
        ctx[15].value.id,
        currentId:
        /*currentId*/
        ctx[1],
        scrollableHeight:
        /*scrollableHeight*/
        ctx[5]
      });

      if (dirty &
      /*$_groups, currentId*/
      10) {
        toggle_class(p, "selected",
        /*schema*/
        ctx[15].value.id ===
        /*currentId*/
        ctx[1]);
      }

      if (dirty &
      /*hrefBase, $_groups*/
      12 && a_href_value !== (a_href_value = makeURL(
      /*hrefBase*/
      ctx[2],
      /*schema*/
      ctx[15].value.id))) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(57:3) {#each indicators as {title, schema}}",
    ctx: ctx
  });
  return block;
} // (54:1) {#each $_groups as {label, indicators}}


function create_each_block$1(ctx) {
  var div;
  var h2;
  var t0_value =
  /*label*/
  ctx[10] + "";
  var t0;
  var t1;
  var t2;
  var each_value_1 =
  /*indicators*/
  ctx[11];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text(t0_value);
      t1 = space();

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, t0_value);
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-o5dbbu");
      add_location(h2, file$4, 55, 3, 1167);
      attr_dev(div, "class", "group svelte-o5dbbu");
      add_location(div, file$4, 54, 2, 1144);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t0);
      append_dev(div, t1);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }

      append_dev(div, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$_groups*/
      8 && t0_value !== (t0_value =
      /*label*/
      ctx[10] + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*makeURL, hrefBase, $_groups, currentId, scrollableHeight*/
      46) {
        each_value_1 =
        /*indicators*/
        ctx[11];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, t2);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
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
    id: create_each_block$1.name,
    type: "each",
    source: "(54:1) {#each $_groups as {label, indicators}}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var nav;
  var nav_resize_listener;
  var each_value =
  /*$_groups*/
  ctx[3];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      nav = element("nav");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nav_nodes);
      }

      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(nav, "class", "svelte-o5dbbu");
      add_render_callback(function () {
        return (
          /*nav_elementresize_handler*/
          ctx[7].call(nav)
        );
      });
      add_location(nav, file$4, 49, 0, 1032);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(nav, null);
      }

      nav_resize_listener = add_resize_listener(nav,
      /*nav_elementresize_handler*/
      ctx[7].bind(nav));
      /*nav_binding*/

      ctx[8](nav);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$_groups, makeURL, hrefBase, currentId, scrollableHeight*/
      46) {
        each_value =
        /*$_groups*/
        ctx[3];
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block$1(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(nav, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_each(each_blocks, detaching);
      nav_resize_listener();
      /*nav_binding*/

      ctx[8](null);
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
  var $_groups,
      $$unsubscribe__groups = noop,
      $$subscribe__groups = function $$subscribe__groups() {
    return $$unsubscribe__groups(), $$unsubscribe__groups = subscribe(_groups, function ($$value) {
      return $$invalidate(3, $_groups = $$value);
    }), _groups;
  };

  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__groups();
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Sidebar", slots, []);

  var _$$props$_groups = $$props._groups,
      _groups = _$$props$_groups === void 0 ? null : _$$props$_groups;

  validate_store(_groups, "_groups");
  $$subscribe__groups();
  var _$$props$currentId = $$props.currentId,
      currentId = _$$props$currentId === void 0 ? null : _$$props$currentId;
  var _$$props$hrefBase = $$props.hrefBase,
      hrefBase = _$$props$hrefBase === void 0 ? "" : _$$props$hrefBase;
  var currentNode;
  var scrollable;
  var scrollableHeight;
  onMount(function () {
    currentNode && currentNode.scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    });
  }); // eslint-disable-next-line no-shadow,no-unused-vars

  function keepOnScreen(node, _ref3) {
    var id = _ref3.id,
        currentId = _ref3.currentId;
        _ref3.scrollableHeight;

    if (id === currentId) {
      currentNode = node;
    }

    return {
      // eslint-disable-next-line no-shadow,no-unused-vars
      update: function update(_ref4) {
        var id = _ref4.id,
            currentId = _ref4.currentId,
            scrollableHeight = _ref4.scrollableHeight;

        if (id === currentId) {
          var _scrollable$getBoundi = scrollable.getBoundingClientRect(),
              Y = _scrollable$getBoundi.y;

          var _node$getBoundingClie = node.getBoundingClientRect(),
              y = _node$getBoundingClie.y;

          var yRel = y - Y;

          if (yRel < 0 || yRel > scrollableHeight) {
            scrollable.scrollTo({
              top: yRel,
              behavior: "smooth"
            });
          }
        }
      }
    };
  }

  var writable_props = ["_groups", "currentId", "hrefBase"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Sidebar> was created with unknown prop '".concat(key, "'"));
  });

  function nav_elementresize_handler() {
    scrollableHeight = this.clientHeight;
    $$invalidate(5, scrollableHeight);
  }

  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      scrollable = $$value;
      $$invalidate(4, scrollable);
    });
  }

  $$self.$$set = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("currentId" in $$props) $$invalidate(1, currentId = $$props.currentId);
    if ("hrefBase" in $$props) $$invalidate(2, hrefBase = $$props.hrefBase);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      setGroups: setGroups,
      makeURL: makeURL,
      _groups: _groups,
      currentId: currentId,
      hrefBase: hrefBase,
      currentNode: currentNode,
      scrollable: scrollable,
      scrollableHeight: scrollableHeight,
      keepOnScreen: keepOnScreen,
      $_groups: $_groups
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("currentId" in $$props) $$invalidate(1, currentId = $$props.currentId);
    if ("hrefBase" in $$props) $$invalidate(2, hrefBase = $$props.hrefBase);
    if ("currentNode" in $$props) currentNode = $$props.currentNode;
    if ("scrollable" in $$props) $$invalidate(4, scrollable = $$props.scrollable);
    if ("scrollableHeight" in $$props) $$invalidate(5, scrollableHeight = $$props.scrollableHeight);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*_groups, $_groups*/
    9) {
      _groups && setGroups($_groups);
    }
  };

  return [_groups, currentId, hrefBase, $_groups, scrollable, scrollableHeight, keepOnScreen, nav_elementresize_handler, nav_binding];
}

var Sidebar = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Sidebar, _SvelteComponentDev);

  var _super = _createSuper$4(Sidebar);

  function Sidebar(options) {
    var _this;

    _classCallCheck(this, Sidebar);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      _groups: 0,
      currentId: 1,
      hrefBase: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Sidebar",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(Sidebar, [{
    key: "_groups",
    get: function get() {
      throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "currentId",
    get: function get() {
      throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hrefBase",
    get: function get() {
      throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Sidebar;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "../../components/time_region_value/src/node_modules/components/Timeline.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[27] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[27] = list[i];
  return child_ctx;
} // (46:1) {#if width && height && $_layout}


function create_if_block$2(ctx) {
  var svg;
  var if_block0_anchor;
  var if_block0 =
  /*selectedYear*/
  ctx[4] && create_if_block_4(ctx);

  function select_block_type(ctx, dirty) {
    if (
    /*showLess*/
    ctx[5] &&
    /*selectedYear*/
    ctx[4]) return create_if_block_1$2;
    return create_else_block$1;
  }

  var current_block_type = select_block_type(ctx);
  var if_block1 = current_block_type(ctx);
  var block = {
    c: function create() {
      svg = svg_element("svg");
      if (if_block0) if_block0.c();
      if_block0_anchor = empty();
      if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        width: true,
        height: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      if (if_block0) if_block0.l(svg_nodes);
      if_block0_anchor = empty();
      if_block1.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[6]);
      attr_dev(svg, "height",
      /*height*/
      ctx[1]);
      attr_dev(svg, "class", "svelte-rmsnzm");
      add_location(svg, file$3, 46, 2, 1494);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);
      if (if_block0) if_block0.m(svg, null);
      append_dev(svg, if_block0_anchor);
      if_block1.m(svg, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*selectedYear*/
      ctx[4]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(svg, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);

        if (if_block1) {
          if_block1.c();
          if_block1.m(svg, null);
        }
      }

      if (dirty[0] &
      /*width*/
      64) {
        attr_dev(svg, "width",
        /*width*/
        ctx[6]);
      }

      if (dirty[0] &
      /*height*/
      2) {
        attr_dev(svg, "height",
        /*height*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      if (if_block0) if_block0.d();
      if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(46:1) {#if width && height && $_layout}",
    ctx: ctx
  });
  return block;
} // (52:3) {#if selectedYear}


function create_if_block_4(ctx) {
  var a0;
  var g0;
  var rect0;
  var polyline0;
  var g0_transform_value;
  var a1;
  var g1;
  var rect1;
  var polyline1;
  var g1_transform_value;
  var block = {
    c: function create() {
      a0 = svg_element("a");
      g0 = svg_element("g");
      rect0 = svg_element("rect");
      polyline0 = svg_element("polyline");
      a1 = svg_element("a");
      g1 = svg_element("g");
      rect1 = svg_element("rect");
      polyline1 = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      a0 = claim_element(nodes, "a", {
        href: true
      }, 1);
      var a0_nodes = children(a0);
      g0 = claim_element(a0_nodes, "g", {
        transform: true,
        class: true
      }, 1);
      var g0_nodes = children(g0);
      rect0 = claim_element(g0_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect0).forEach(detach_dev);
      polyline0 = claim_element(g0_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline0).forEach(detach_dev);
      g0_nodes.forEach(detach_dev);
      a0_nodes.forEach(detach_dev);
      a1 = claim_element(nodes, "a", {
        href: true
      }, 1);
      var a1_nodes = children(a1);
      g1 = claim_element(a1_nodes, "g", {
        transform: true,
        class: true
      }, 1);
      var g1_nodes = children(g1);
      rect1 = claim_element(g1_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect1).forEach(detach_dev);
      polyline1 = claim_element(g1_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline1).forEach(detach_dev);
      g1_nodes.forEach(detach_dev);
      a1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect0, "height",
      /*halfHeight*/
      ctx[8]);
      attr_dev(rect0, "width",
      /*halfHeight*/
      ctx[8]);
      attr_dev(rect0, "class", "svelte-rmsnzm");
      add_location(rect0, file$3, 59, 6, 1717);
      attr_dev(polyline0, "points",
      /*chevronLeftPath*/
      ctx[16]);
      attr_dev(polyline0, "class", "svelte-rmsnzm");
      add_location(polyline0, file$3, 63, 6, 1791);
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*prevX*/
      ctx[14] + "," +
      /*buttonY*/
      ctx[9] + ")");
      attr_dev(g0, "class", "svelte-rmsnzm");
      toggle_class(g0, "active",
      /*isPrevYearActive*/
      ctx[11]);
      add_location(g0, file$3, 55, 5, 1616);
      attr_dev(a0, "href",
      /*hrefPrev*/
      ctx[18]);
      add_location(a0, file$3, 54, 4, 1591);
      attr_dev(rect1, "height",
      /*halfHeight*/
      ctx[8]);
      attr_dev(rect1, "width",
      /*halfHeight*/
      ctx[8]);
      attr_dev(rect1, "class", "svelte-rmsnzm");
      add_location(rect1, file$3, 73, 6, 1997);
      attr_dev(polyline1, "points",
      /*chevronRightPath*/
      ctx[17]);
      attr_dev(polyline1, "class", "svelte-rmsnzm");
      add_location(polyline1, file$3, 77, 6, 2071);
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*nextX*/
      ctx[10] + "," +
      /*buttonY*/
      ctx[9] + ")");
      attr_dev(g1, "class", "svelte-rmsnzm");
      toggle_class(g1, "active",
      /*isNextYearActive*/
      ctx[12]);
      add_location(g1, file$3, 69, 5, 1896);
      attr_dev(a1, "href",
      /*hrefNext*/
      ctx[19]);
      add_location(a1, file$3, 68, 4, 1871);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a0, anchor);
      append_dev(a0, g0);
      append_dev(g0, rect0);
      append_dev(g0, polyline0);
      insert_dev(target, a1, anchor);
      append_dev(a1, g1);
      append_dev(g1, rect1);
      append_dev(g1, polyline1);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*halfHeight*/
      256) {
        attr_dev(rect0, "height",
        /*halfHeight*/
        ctx[8]);
      }

      if (dirty[0] &
      /*halfHeight*/
      256) {
        attr_dev(rect0, "width",
        /*halfHeight*/
        ctx[8]);
      }

      if (dirty[0] &
      /*chevronLeftPath*/
      65536) {
        attr_dev(polyline0, "points",
        /*chevronLeftPath*/
        ctx[16]);
      }

      if (dirty[0] &
      /*prevX, buttonY*/
      16896 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*prevX*/
      ctx[14] + "," +
      /*buttonY*/
      ctx[9] + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (dirty[0] &
      /*isPrevYearActive*/
      2048) {
        toggle_class(g0, "active",
        /*isPrevYearActive*/
        ctx[11]);
      }

      if (dirty[0] &
      /*hrefPrev*/
      262144) {
        attr_dev(a0, "href",
        /*hrefPrev*/
        ctx[18]);
      }

      if (dirty[0] &
      /*halfHeight*/
      256) {
        attr_dev(rect1, "height",
        /*halfHeight*/
        ctx[8]);
      }

      if (dirty[0] &
      /*halfHeight*/
      256) {
        attr_dev(rect1, "width",
        /*halfHeight*/
        ctx[8]);
      }

      if (dirty[0] &
      /*chevronRightPath*/
      131072) {
        attr_dev(polyline1, "points",
        /*chevronRightPath*/
        ctx[17]);
      }

      if (dirty[0] &
      /*nextX, buttonY*/
      1536 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*nextX*/
      ctx[10] + "," +
      /*buttonY*/
      ctx[9] + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }

      if (dirty[0] &
      /*isNextYearActive*/
      4096) {
        toggle_class(g1, "active",
        /*isNextYearActive*/
        ctx[12]);
      }

      if (dirty[0] &
      /*hrefNext*/
      524288) {
        attr_dev(a1, "href",
        /*hrefNext*/
        ctx[19]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a0);
      if (detaching) detach_dev(a1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(52:3) {#if selectedYear}",
    ctx: ctx
  });
  return block;
} // (90:3) {:else}


function create_else_block$1(ctx) {
  var if_block0_anchor;
  var if_block1_anchor;
  var if_block0 =
  /*availableYears*/
  ctx[0] && create_if_block_3$1(ctx);
  var if_block1 =
  /*$_yearRange*/
  ctx[20] && create_if_block_2$2(ctx);
  var block = {
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
      insert_dev(target, if_block0_anchor, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, if_block1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (
      /*availableYears*/
      ctx[0]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*$_yearRange*/
      ctx[20]) {
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
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(90:3) {:else}",
    ctx: ctx
  });
  return block;
} // (83:3) {#if showLess && selectedYear}


function create_if_block_1$2(ctx) {
  var text_1;
  var t;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(
      /*selectedYear*/
      ctx[4]);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        x: true,
        y: true,
        class: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes,
      /*selectedYear*/
      ctx[4]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "x",
      /*yearsCenterX*/
      ctx[15]);
      attr_dev(text_1, "y",
      /*halfHeight*/
      ctx[8]);
      attr_dev(text_1, "class", "svelte-rmsnzm");
      add_location(text_1, file$3, 84, 4, 2178);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*selectedYear*/
      16) set_data_dev(t,
      /*selectedYear*/
      ctx[4]);

      if (dirty[0] &
      /*yearsCenterX*/
      32768) {
        attr_dev(text_1, "x",
        /*yearsCenterX*/
        ctx[15]);
      }

      if (dirty[0] &
      /*halfHeight*/
      256) {
        attr_dev(text_1, "y",
        /*halfHeight*/
        ctx[8]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(83:3) {#if showLess && selectedYear}",
    ctx: ctx
  });
  return block;
} // (94:4) {#if availableYears}


function create_if_block_3$1(ctx) {
  var g;
  var line;
  var line_x__value;
  var line_x__value_1;
  var g_transform_value;
  var each_value_1 =
  /*availableYears*/
  ctx[0];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      g = svg_element("g");
      line = svg_element("line");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        transform: true
      }, 1);
      var g_nodes = children(g);
      line = claim_element(g_nodes, "line", {
        x1: true,
        x2: true,
        class: true
      }, 1);
      children(line).forEach(detach_dev);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(g_nodes);
      }

      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "x1", line_x__value =
      /*$_layout*/
      ctx[7].scaleX(
      /*availableYears*/
      ctx[0][0]) +
      /*$_layout*/
      ctx[7].radius);
      attr_dev(line, "x2", line_x__value_1 =
      /*$_layout*/
      ctx[7].scaleX(last(
      /*availableYears*/
      ctx[0])) -
      /*$_layout*/
      ctx[7].radius);
      attr_dev(line, "class", "svelte-rmsnzm");
      add_location(line, file$3, 95, 6, 2364);
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*$_layout*/
      ctx[7].y1 + ")");
      add_location(g, file$3, 94, 5, 2315);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, line);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(g, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, availableYears*/
      129 && line_x__value !== (line_x__value =
      /*$_layout*/
      ctx[7].scaleX(
      /*availableYears*/
      ctx[0][0]) +
      /*$_layout*/
      ctx[7].radius)) {
        attr_dev(line, "x1", line_x__value);
      }

      if (dirty[0] &
      /*$_layout, availableYears*/
      129 && line_x__value_1 !== (line_x__value_1 =
      /*$_layout*/
      ctx[7].scaleX(last(
      /*availableYears*/
      ctx[0])) -
      /*$_layout*/
      ctx[7].radius)) {
        attr_dev(line, "x2", line_x__value_1);
      }

      if (dirty[0] &
      /*hrefBase, indicatorId, availableYears, $_layout, selectedYear*/
      157) {
        each_value_1 =
        /*availableYears*/
        ctx[0];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(g, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_1.length;
      }

      if (dirty[0] &
      /*$_layout*/
      128 && g_transform_value !== (g_transform_value = "translate(0," +
      /*$_layout*/
      ctx[7].y1 + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(94:4) {#if availableYears}",
    ctx: ctx
  });
  return block;
} // (100:6) {#each availableYears as year}


function create_each_block_1(ctx) {
  var a;
  var circle;
  var circle_cx_value;
  var circle_r_value;
  var a_href_value;
  var block = {
    c: function create() {
      a = svg_element("a");
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "a", {
        href: true
      }, 1);
      var a_nodes = children(a);
      circle = claim_element(a_nodes, "circle", {
        cx: true,
        r: true,
        class: true
      }, 1);
      children(circle).forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", circle_cx_value =
      /*$_layout*/
      ctx[7].scaleX(
      /*year*/
      ctx[27]));
      attr_dev(circle, "r", circle_r_value =
      /*$_layout*/
      ctx[7].radius);
      attr_dev(circle, "class", "svelte-rmsnzm");
      toggle_class(circle, "selected",
      /*selectedYear*/
      ctx[4] &&
      /*selectedYear*/
      ctx[4] ===
      /*year*/
      ctx[27]);
      add_location(circle, file$3, 101, 8, 2618);
      attr_dev(a, "href", a_href_value = makeURL(
      /*hrefBase*/
      ctx[2],
      /*indicatorId*/
      ctx[3],
      /*year*/
      ctx[27]));
      add_location(a, file$3, 100, 7, 2562);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, circle);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, availableYears*/
      129 && circle_cx_value !== (circle_cx_value =
      /*$_layout*/
      ctx[7].scaleX(
      /*year*/
      ctx[27]))) {
        attr_dev(circle, "cx", circle_cx_value);
      }

      if (dirty[0] &
      /*$_layout*/
      128 && circle_r_value !== (circle_r_value =
      /*$_layout*/
      ctx[7].radius)) {
        attr_dev(circle, "r", circle_r_value);
      }

      if (dirty[0] &
      /*selectedYear, availableYears*/
      17) {
        toggle_class(circle, "selected",
        /*selectedYear*/
        ctx[4] &&
        /*selectedYear*/
        ctx[4] ===
        /*year*/
        ctx[27]);
      }

      if (dirty[0] &
      /*hrefBase, indicatorId, availableYears*/
      13 && a_href_value !== (a_href_value = makeURL(
      /*hrefBase*/
      ctx[2],
      /*indicatorId*/
      ctx[3],
      /*year*/
      ctx[27]))) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(100:6) {#each availableYears as year}",
    ctx: ctx
  });
  return block;
} // (114:4) {#if $_yearRange}


function create_if_block_2$2(ctx) {
  var each_1_anchor;
  var each_value =
  /*$_yearRange*/
  ctx[20];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, $_yearRange, yearsY*/
      1056896) {
        each_value =
        /*$_yearRange*/
        ctx[20];
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
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
    block: block,
    id: create_if_block_2$2.name,
    type: "if",
    source: "(114:4) {#if $_yearRange}",
    ctx: ctx
  });
  return block;
} // (115:5) {#each $_yearRange as year}


function create_each_block(ctx) {
  var text_1;
  var t_value = (
  /*$_layout*/
  ctx[7].doShortenYears ? shortenYear(
  /*year*/
  ctx[27]) :
  /*year*/
  ctx[27]) + "";
  var t;
  var text_1_font_size_value;
  var text_1_x_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_element(nodes, "text", {
        "font-size": true,
        x: true,
        y: true,
        class: true
      }, 1);
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "font-size", text_1_font_size_value =
      /*$_layout*/
      ctx[7].fontSize);
      attr_dev(text_1, "x", text_1_x_value =
      /*$_layout*/
      ctx[7].scaleX(
      /*year*/
      ctx[27]));
      attr_dev(text_1, "y",
      /*yearsY*/
      ctx[13]);
      attr_dev(text_1, "class", "svelte-rmsnzm");
      add_location(text_1, file$3, 115, 6, 2899);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, $_yearRange*/
      1048704 && t_value !== (t_value = (
      /*$_layout*/
      ctx[7].doShortenYears ? shortenYear(
      /*year*/
      ctx[27]) :
      /*year*/
      ctx[27]) + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*$_layout*/
      128 && text_1_font_size_value !== (text_1_font_size_value =
      /*$_layout*/
      ctx[7].fontSize)) {
        attr_dev(text_1, "font-size", text_1_font_size_value);
      }

      if (dirty[0] &
      /*$_layout, $_yearRange*/
      1048704 && text_1_x_value !== (text_1_x_value =
      /*$_layout*/
      ctx[7].scaleX(
      /*year*/
      ctx[27]))) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*yearsY*/
      8192) {
        attr_dev(text_1, "y",
        /*yearsY*/
        ctx[13]);
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
    source: "(115:5) {#each $_yearRange as year}",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var div;
  var if_block =
  /*width*/
  ctx[6] &&
  /*height*/
  ctx[1] &&
  /*$_layout*/
  ctx[7] && create_if_block$2(ctx);
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
      attr_dev(div, "class", "Timeline svelte-rmsnzm");
      add_location(div, file$3, 44, 0, 1434);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*width*/
      ctx[6] &&
      /*height*/
      ctx[1] &&
      /*$_layout*/
      ctx[7]) {
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
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block) if_block.d();
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
  var yearsY;
  var halfHeight;
  var buttonY;
  var prevX;
  var nextX;
  var yearsCenterX;
  var min;
  var max;
  var med;
  var chevronLeftPath;
  var chevronRightPath;
  var selectedYearIndex;
  var prevYear;
  var isPrevYearActive;
  var nextYear;
  var isNextYearActive;
  var hrefPrev;
  var hrefNext;
  var $_layout;
  var $_yearRange;
  validate_store(_timelineLayout, "_layout");
  component_subscribe($$self, _timelineLayout, function ($$value) {
    return $$invalidate(7, $_layout = $$value);
  });
  validate_store(_yearRange, "_yearRange");
  component_subscribe($$self, _yearRange, function ($$value) {
    return $$invalidate(20, $_yearRange = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Timeline", slots, []);
  var _$$props$availableYea = $$props.availableYears,
      availableYears = _$$props$availableYea === void 0 ? null : _$$props$availableYea;
  var _$$props$height = $$props.height,
      height = _$$props$height === void 0 ? null : _$$props$height;
  var _$$props$hrefBase = $$props.hrefBase,
      hrefBase = _$$props$hrefBase === void 0 ? "" : _$$props$hrefBase; // relative to `document.baseURI`

  var _$$props$indicatorId = $$props.indicatorId,
      indicatorId = _$$props$indicatorId === void 0 ? null : _$$props$indicatorId;
  var _$$props$selectedYear = $$props.selectedYear,
      selectedYear = _$$props$selectedYear === void 0 ? null : _$$props$selectedYear;
  var _$$props$showLess = $$props.showLess,
      showLess = _$$props$showLess === void 0 ? false : _$$props$showLess;
  var width = $$props.width;
  var writable_props = ["availableYears", "height", "hrefBase", "indicatorId", "selectedYear", "showLess", "width"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Timeline> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("availableYears" in $$props) $$invalidate(0, availableYears = $$props.availableYears);
    if ("height" in $$props) $$invalidate(1, height = $$props.height);
    if ("hrefBase" in $$props) $$invalidate(2, hrefBase = $$props.hrefBase);
    if ("indicatorId" in $$props) $$invalidate(3, indicatorId = $$props.indicatorId);
    if ("selectedYear" in $$props) $$invalidate(4, selectedYear = $$props.selectedYear);
    if ("showLess" in $$props) $$invalidate(5, showLess = $$props.showLess);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
  };

  $$self.$capture_state = function () {
    return {
      _: _,
      isNotNil: isNotNil,
      _yearRange: _yearRange,
      _layout: _timelineLayout,
      shortenYear: shortenYear,
      makeURL: makeURL,
      availableYears: availableYears,
      height: height,
      hrefBase: hrefBase,
      indicatorId: indicatorId,
      selectedYear: selectedYear,
      showLess: showLess,
      width: width,
      yearsY: yearsY,
      $_layout: $_layout,
      halfHeight: halfHeight,
      buttonY: buttonY,
      prevX: prevX,
      nextX: nextX,
      yearsCenterX: yearsCenterX,
      min: min,
      max: max,
      med: med,
      chevronLeftPath: chevronLeftPath,
      chevronRightPath: chevronRightPath,
      selectedYearIndex: selectedYearIndex,
      prevYear: prevYear,
      isPrevYearActive: isPrevYearActive,
      nextYear: nextYear,
      isNextYearActive: isNextYearActive,
      hrefPrev: hrefPrev,
      hrefNext: hrefNext,
      $_yearRange: $_yearRange
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("availableYears" in $$props) $$invalidate(0, availableYears = $$props.availableYears);
    if ("height" in $$props) $$invalidate(1, height = $$props.height);
    if ("hrefBase" in $$props) $$invalidate(2, hrefBase = $$props.hrefBase);
    if ("indicatorId" in $$props) $$invalidate(3, indicatorId = $$props.indicatorId);
    if ("selectedYear" in $$props) $$invalidate(4, selectedYear = $$props.selectedYear);
    if ("showLess" in $$props) $$invalidate(5, showLess = $$props.showLess);
    if ("width" in $$props) $$invalidate(6, width = $$props.width);
    if ("yearsY" in $$props) $$invalidate(13, yearsY = $$props.yearsY);
    if ("halfHeight" in $$props) $$invalidate(8, halfHeight = $$props.halfHeight);
    if ("buttonY" in $$props) $$invalidate(9, buttonY = $$props.buttonY);
    if ("prevX" in $$props) $$invalidate(14, prevX = $$props.prevX);
    if ("nextX" in $$props) $$invalidate(10, nextX = $$props.nextX);
    if ("yearsCenterX" in $$props) $$invalidate(15, yearsCenterX = $$props.yearsCenterX);
    if ("min" in $$props) $$invalidate(21, min = $$props.min);
    if ("max" in $$props) $$invalidate(22, max = $$props.max);
    if ("med" in $$props) $$invalidate(23, med = $$props.med);
    if ("chevronLeftPath" in $$props) $$invalidate(16, chevronLeftPath = $$props.chevronLeftPath);
    if ("chevronRightPath" in $$props) $$invalidate(17, chevronRightPath = $$props.chevronRightPath);
    if ("selectedYearIndex" in $$props) $$invalidate(24, selectedYearIndex = $$props.selectedYearIndex);
    if ("prevYear" in $$props) $$invalidate(25, prevYear = $$props.prevYear);
    if ("isPrevYearActive" in $$props) $$invalidate(11, isPrevYearActive = $$props.isPrevYearActive);
    if ("nextYear" in $$props) $$invalidate(26, nextYear = $$props.nextYear);
    if ("isNextYearActive" in $$props) $$invalidate(12, isNextYearActive = $$props.isNextYearActive);
    if ("hrefPrev" in $$props) $$invalidate(18, hrefPrev = $$props.hrefPrev);
    if ("hrefNext" in $$props) $$invalidate(19, hrefNext = $$props.hrefNext);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*availableYears, $_layout*/
    129) {
      $$invalidate(13, yearsY = availableYears.length > 0 ? $_layout.y2 : $_layout.ym);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout*/
    128) {
      /* buttons */
      $$invalidate(8, halfHeight = $_layout.height / 2);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    256) {
      $$invalidate(9, buttonY = halfHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*buttonY*/
    512) {
      $$invalidate(14, prevX = buttonY);
    }

    if ($$self.$$.dirty[0] &
    /*buttonY, halfHeight*/
    768) {
      $$invalidate(10, nextX = buttonY + halfHeight + 0.25 * buttonY);
    }

    if ($$self.$$.dirty[0] &
    /*nextX, halfHeight, width*/
    1344) {
      $$invalidate(15, yearsCenterX = (nextX + halfHeight + width) / 2);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    256) {
      $$invalidate(21, min = halfHeight / 3);
    }

    if ($$self.$$.dirty[0] &
    /*min*/
    2097152) {
      $$invalidate(22, max = 2 * min);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    256) {
      $$invalidate(23, med = halfHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*max, min, med*/
    14680064) {
      $$invalidate(16, chevronLeftPath = "".concat(max, " ").concat(min, " ").concat(min, " ").concat(med, " ").concat(max, " ").concat(max));
    }

    if ($$self.$$.dirty[0] &
    /*min, max, med*/
    14680064) {
      $$invalidate(17, chevronRightPath = "".concat(min, " ").concat(min, " ").concat(max, " ").concat(med, " ").concat(min, " ").concat(max));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYear*/
    17) {
      $$invalidate(24, selectedYearIndex = findIndex(availableYears, is(selectedYear)));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYearIndex*/
    16777217) {
      $$invalidate(25, prevYear = availableYears[selectedYearIndex - 1]);
    }

    if ($$self.$$.dirty[0] &
    /*prevYear*/
    33554432) {
      $$invalidate(11, isPrevYearActive = isNotNil(prevYear));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYearIndex*/
    16777217) {
      $$invalidate(26, nextYear = availableYears[selectedYearIndex + 1]);
    }

    if ($$self.$$.dirty[0] &
    /*nextYear*/
    67108864) {
      $$invalidate(12, isNextYearActive = isNotNil(nextYear));
    }

    if ($$self.$$.dirty[0] &
    /*isPrevYearActive, hrefBase, indicatorId, prevYear*/
    33556492) {
      $$invalidate(18, hrefPrev = isPrevYearActive ? makeURL(hrefBase, indicatorId, prevYear) : null);
    }

    if ($$self.$$.dirty[0] &
    /*isNextYearActive, hrefBase, indicatorId, nextYear*/
    67112972) {
      $$invalidate(19, hrefNext = isNextYearActive ? makeURL(hrefBase, indicatorId, nextYear) : null);
    }
  };

  return [availableYears, height, hrefBase, indicatorId, selectedYear, showLess, width, $_layout, halfHeight, buttonY, nextX, isPrevYearActive, isNextYearActive, yearsY, prevX, yearsCenterX, chevronLeftPath, chevronRightPath, hrefPrev, hrefNext, $_yearRange, min, max, med, selectedYearIndex, prevYear, nextYear];
}

var Timeline = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Timeline, _SvelteComponentDev);

  var _super = _createSuper$3(Timeline);

  function Timeline(options) {
    var _this;

    _classCallCheck(this, Timeline);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      availableYears: 0,
      height: 1,
      hrefBase: 2,
      indicatorId: 3,
      selectedYear: 4,
      showLess: 5,
      width: 6
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Timeline",
      options: options,
      id: create_fragment$3.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*width*/
    ctx[6] === undefined && !("width" in props)) {
      console.warn("<Timeline> was created without expected prop 'width'");
    }

    return _this;
  }

  _createClass(Timeline, [{
    key: "availableYears",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "height",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hrefBase",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "indicatorId",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedYear",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "showLess",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Timeline;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "../../components/time_region_value/src/node_modules/components/ViewSelector.svelte"; // (57:27) 

function create_if_block_3(ctx) {
  var div0;
  var icon0;
  var t;
  var div1;
  var icon1;
  var current;
  var mounted;
  var dispose;
  icon0 = new Icon({
    props: {
      glyph: MapPin,
      stroke:
      /*strokes*/
      ctx[3].map
    },
    $$inline: true
  });
  icon1 = new Icon({
    props: {
      glyph: BarChart,
      stroke:
      /*strokes*/
      ctx[3].barchart
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div0 = element("div");
      create_component(icon0.$$.fragment);
      t = space();
      div1 = element("div");
      create_component(icon1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div0 = claim_element(nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(icon0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(icon1.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "button clickable svelte-ghla19");
      add_location(div0, file$2, 57, 2, 1407);
      attr_dev(div1, "class", "button clickable rotated svelte-ghla19");
      add_location(div1, file$2, 66, 2, 1544);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div0, anchor);
      mount_component(icon0, div0, null);
      insert_dev(target, t, anchor);
      insert_dev(target, div1, anchor);
      mount_component(icon1, div1, null);
      current = true;

      if (!mounted) {
        dispose = [listen_dev(div0, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("map")))
            /*showView*/
            ctx[2]("map").apply(this, arguments);
        }, false, false, false), listen_dev(div1, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("barchart")))
            /*showView*/
            ctx[2]("barchart").apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var icon0_changes = {};
      if (dirty &
      /*strokes*/
      8) icon0_changes.stroke =
      /*strokes*/
      ctx[3].map;
      icon0.$set(icon0_changes);
      var icon1_changes = {};
      if (dirty &
      /*strokes*/
      8) icon1_changes.stroke =
      /*strokes*/
      ctx[3].barchart;
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
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(57:27) ",
    ctx: ctx
  });
  return block;
} // (47:23) 


function create_if_block_2$1(ctx) {
  var div;
  var icon;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: Activity,
      stroke:
      /*strokes*/
      ctx[3].trends
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(icon.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(icon.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "button clickable svelte-ghla19");
      add_location(div, file$2, 47, 2, 1234);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(icon, div, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(div, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("trends")))
            /*showView*/
            ctx[2]("trends").apply(this, arguments);
        }, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var icon_changes = {};
      if (dirty &
      /*strokes*/
      8) icon_changes.stroke =
      /*strokes*/
      ctx[3].trends;
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
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(47:23) ",
    ctx: ctx
  });
  return block;
} // (37:1) {#if $_routes.Index}


function create_if_block_1$1(ctx) {
  var div;
  var icon;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: Clock,
      stroke:
      /*strokes*/
      ctx[3].distribution
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(icon.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(icon.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "button clickable svelte-ghla19");
      add_location(div, file$2, 37, 2, 1056);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(icon, div, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(div, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("distribution")))
            /*showView*/
            ctx[2]("distribution").apply(this, arguments);
        }, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var icon_changes = {};
      if (dirty &
      /*strokes*/
      8) icon_changes.stroke =
      /*strokes*/
      ctx[3].distribution;
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
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(37:1) {#if $_routes.Index}",
    ctx: ctx
  });
  return block;
} // (78:1) {#if $_routes.Id || $_routes.IdYear}


function create_if_block$1(ctx) {
  var div0;
  var icon0;
  var t;
  var div1;
  var icon1;
  var current;
  var mounted;
  var dispose;
  icon0 = new Icon({
    props: {
      glyph: Info,
      stroke:
      /*strokes*/
      ctx[3].info
    },
    $$inline: true
  });
  icon1 = new Icon({
    props: {
      glyph: Settings,
      stroke:
      /*strokes*/
      ctx[3].settings
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div0 = element("div");
      create_component(icon0.$$.fragment);
      t = space();
      div1 = element("div");
      create_component(icon1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div0 = claim_element(nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(icon0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(icon1.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "button clickable svelte-ghla19");
      add_location(div0, file$2, 78, 2, 1747);
      attr_dev(div1, "class", "button clickable svelte-ghla19");
      add_location(div1, file$2, 87, 2, 1891);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div0, anchor);
      mount_component(icon0, div0, null);
      insert_dev(target, t, anchor);
      insert_dev(target, div1, anchor);
      mount_component(icon1, div1, null);
      current = true;

      if (!mounted) {
        dispose = [listen_dev(div0, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("info")))
            /*showView*/
            ctx[2]("info").apply(this, arguments);
        }, false, false, false), listen_dev(div1, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("settings")))
            /*showView*/
            ctx[2]("settings").apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var icon0_changes = {};
      if (dirty &
      /*strokes*/
      8) icon0_changes.stroke =
      /*strokes*/
      ctx[3].info;
      icon0.$set(icon0_changes);
      var icon1_changes = {};
      if (dirty &
      /*strokes*/
      8) icon1_changes.stroke =
      /*strokes*/
      ctx[3].settings;
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
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(78:1) {#if $_routes.Id || $_routes.IdYear}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var nav;
  var div;
  var icon;
  var t0;
  var current_block_type_index;
  var if_block0;
  var t1;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: List,
      stroke:
      /*strokes*/
      ctx[3].sidebar
    },
    $$inline: true
  });
  var if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$_routes*/
    ctx[4].Index) return 0;
    if (
    /*$_routes*/
    ctx[4].Id) return 1;
    if (
    /*$_routes*/
    ctx[4].IdYear) return 2;
    return -1;
  }

  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }

  var if_block1 = (
  /*$_routes*/
  ctx[4].Id ||
  /*$_routes*/
  ctx[4].IdYear) && create_if_block$1(ctx);
  var block = {
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
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div = claim_element(nav_nodes, "DIV", {
        class: true
      });
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
      add_location(div, file$2, 26, 1, 898);
      attr_dev(nav, "class", "ViewSelector svelte-ghla19");
      toggle_class(nav, "id",
      /*$_routes*/
      ctx[4].Id);
      toggle_class(nav, "year",
      /*$_routes*/
      ctx[4].IdYear);
      add_location(nav, file$2, 21, 0, 814);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, div);
      mount_component(icon, div, null);
      append_dev(nav, t0);

      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(nav, null);
      }

      append_dev(nav, t1);
      if (if_block1) if_block1.m(nav, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(div, "click", function () {
          if (is_function(
          /*showView*/
          ctx[2]("sidebar")))
            /*showView*/
            ctx[2]("sidebar").apply(this, arguments);
        }, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      ctx = new_ctx;
      var icon_changes = {};
      if (dirty &
      /*strokes*/
      8) icon_changes.stroke =
      /*strokes*/
      ctx[3].sidebar;
      icon.$set(icon_changes);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
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

      if (
      /*$_routes*/
      ctx[4].Id ||
      /*$_routes*/
      ctx[4].IdYear) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*$_routes*/
          16) {
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
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty &
      /*$_routes*/
      16) {
        toggle_class(nav, "id",
        /*$_routes*/
        ctx[4].Id);
      }

      if (dirty &
      /*$_routes*/
      16) {
        toggle_class(nav, "year",
        /*$_routes*/
        ctx[4].IdYear);
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
  var strokes;

  var $_views,
      $$unsubscribe__views = noop,
      $$subscribe__views = function $$subscribe__views() {
    return $$unsubscribe__views(), $$unsubscribe__views = subscribe(_views, function ($$value) {
      return $$invalidate(5, $_views = $$value);
    }), _views;
  };

  var $_routes,
      $$unsubscribe__routes = noop,
      $$subscribe__routes = function $$subscribe__routes() {
    return $$unsubscribe__routes(), $$unsubscribe__routes = subscribe(_routes, function ($$value) {
      return $$invalidate(4, $_routes = $$value);
    }), _routes;
  };

  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__views();
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__routes();
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("ViewSelector", slots, []);

  var makeStrokes = mapValuesWith(truthynessTo(["black", "grey"]));

  var _$$props$_routes = $$props._routes,
      _routes = _$$props$_routes === void 0 ? null : _$$props$_routes;

  validate_store(_routes, "_routes");
  $$subscribe__routes();

  var _$$props$_views = $$props._views,
      _views = _$$props$_views === void 0 ? null : _$$props$_views;

  validate_store(_views, "_views");
  $$subscribe__views();
  var _$$props$showView = $$props.showView,
      showView = _$$props$showView === void 0 ? null : _$$props$showView;
  var writable_props = ["_routes", "_views", "showView"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ViewSelector> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("_routes" in $$props) $$subscribe__routes($$invalidate(0, _routes = $$props._routes));
    if ("_views" in $$props) $$subscribe__views($$invalidate(1, _views = $$props._views));
    if ("showView" in $$props) $$invalidate(2, showView = $$props.showView);
  };

  $$self.$capture_state = function () {
    return {
      _: _,
      truthynessTo: truthynessTo,
      Icon: Icon,
      Activity: Activity,
      BarChart: BarChart,
      Clock: Clock,
      Info: Info,
      List: List,
      MapPin: MapPin,
      Settings: Settings,
      makeStrokes: makeStrokes,
      _routes: _routes,
      _views: _views,
      showView: showView,
      strokes: strokes,
      $_views: $_views,
      $_routes: $_routes
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("_routes" in $$props) $$subscribe__routes($$invalidate(0, _routes = $$props._routes));
    if ("_views" in $$props) $$subscribe__views($$invalidate(1, _views = $$props._views));
    if ("showView" in $$props) $$invalidate(2, showView = $$props.showView);
    if ("strokes" in $$props) $$invalidate(3, strokes = $$props.strokes);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*$_views*/
    32) {
      $$invalidate(3, strokes = makeStrokes($_views));
    }
  };

  return [_routes, _views, showView, strokes, $_routes, $_views];
}

var ViewSelector = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ViewSelector, _SvelteComponentDev);

  var _super = _createSuper$2(ViewSelector);

  function ViewSelector(options) {
    var _this;

    _classCallCheck(this, ViewSelector);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      _routes: 0,
      _views: 1,
      showView: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ViewSelector",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(ViewSelector, [{
    key: "_routes",
    get: function get() {
      throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "_views",
    get: function get() {
      throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "showView",
    get: function get() {
      throw new Error("<ViewSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ViewSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ViewSelector;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "../../components/time_region_value/src/routes/_layout.svelte"; // (89:0) {:else}

function create_else_block(ctx) {
  var loadingview;
  var current;
  loadingview = new LoadingView({
    props: {
      stroke:
      /*$_theme*/
      ctx[14].colorMain
    },
    $$inline: true
  });
  var block = {
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
      var loadingview_changes = {};
      if (dirty &
      /*$_theme*/
      16384) loadingview_changes.stroke =
      /*$_theme*/
      ctx[14].colorMain;
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
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(89:0) {:else}",
    ctx: ctx
  });
  return block;
} // (38:0) {#if $_screenClasses}


function create_if_block(ctx) {
  var section1;
  var div2;
  var div0;
  var sidebar;
  var t0;
  var div1;
  var section0;
  var t1;
  var div1_resize_listener;
  var div2_class_value;
  var t2;
  var section1_class_value;
  var current;
  sidebar = new Sidebar({
    props: {
      _groups:
      /*_groups*/
      ctx[0],
      hrefBase:
      /*hrefBase*/
      ctx[1],
      currentId:
      /*segment*/
      ctx[2]
    },
    $$inline: true
  });
  var default_slot_template =
  /*#slots*/
  ctx[19].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[18], null);
  var if_block0 = !
  /*$_isTimelineHidden*/
  ctx[9] && create_if_block_2(ctx);
  var if_block1 =
  /*$_isSmallScreen*/
  ctx[3] && create_if_block_1(ctx);
  var block = {
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
      section1 = claim_element(nodes, "SECTION", {
        class: true,
        style: true
      });
      var section1_nodes = children(section1);
      div2 = claim_element(section1_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(sidebar.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      section0 = claim_element(div1_nodes, "SECTION", {
        class: true
      });
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
      attr_dev(div0, "class", "sidebar svelte-13nq1ic");
      add_location(div0, file$1, 47, 3, 1237);
      attr_dev(section0, "class", "svelte-13nq1ic");
      add_location(section0, file$1, 59, 4, 1469);
      attr_dev(div1, "class", "content svelte-13nq1ic");
      add_render_callback(function () {
        return (
          /*div1_elementresize_handler*/
          ctx[21].call(div1)
        );
      });
      toggle_class(div1, "isTimelineHidden",
      /*$_isTimelineHidden*/
      ctx[9]);
      add_location(div1, file$1, 54, 3, 1348);
      attr_dev(div2, "class", div2_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[8] + " svelte-13nq1ic");
      toggle_class(div2, "routeId",
      /*routeId*/
      ctx[4]);
      toggle_class(div2, "routeIdYear",
      /*routeIdYear*/
      ctx[5]);
      add_location(div2, file$1, 42, 2, 1150);
      attr_dev(section1, "class", section1_class_value = "time_region_value_layout " +
      /*$_screenClasses*/
      ctx[6] + " svelte-13nq1ic");
      attr_dev(section1, "style",
      /*$_style*/
      ctx[7]);
      add_location(section1, file$1, 38, 1, 1065);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section1, anchor);
      append_dev(section1, div2);
      append_dev(div2, div0);
      mount_component(sidebar, div0, null);
      append_dev(div2, t0);
      append_dev(div2, div1);
      append_dev(div1, section0);

      if (default_slot) {
        default_slot.m(section0, null);
      }

      append_dev(div1, t1);
      if (if_block0) if_block0.m(div1, null);
      div1_resize_listener = add_resize_listener(div1,
      /*div1_elementresize_handler*/
      ctx[21].bind(div1));
      append_dev(section1, t2);
      if (if_block1) if_block1.m(section1, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var sidebar_changes = {};
      if (dirty &
      /*_groups*/
      1) sidebar_changes._groups =
      /*_groups*/
      ctx[0];
      if (dirty &
      /*hrefBase*/
      2) sidebar_changes.hrefBase =
      /*hrefBase*/
      ctx[1];
      if (dirty &
      /*segment*/
      4) sidebar_changes.currentId =
      /*segment*/
      ctx[2];
      sidebar.$set(sidebar_changes);

      if (default_slot) {
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        262144)) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[18], dirty, null, null);
        }
      }

      if (!
      /*$_isTimelineHidden*/
      ctx[9]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*$_isTimelineHidden*/
          512) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (dirty &
      /*$_isTimelineHidden*/
      512) {
        toggle_class(div1, "isTimelineHidden",
        /*$_isTimelineHidden*/
        ctx[9]);
      }

      if (!current || dirty &
      /*$_viewsClasses*/
      256 && div2_class_value !== (div2_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[8] + " svelte-13nq1ic")) {
        attr_dev(div2, "class", div2_class_value);
      }

      if (dirty &
      /*$_viewsClasses, routeId*/
      272) {
        toggle_class(div2, "routeId",
        /*routeId*/
        ctx[4]);
      }

      if (dirty &
      /*$_viewsClasses, routeIdYear*/
      288) {
        toggle_class(div2, "routeIdYear",
        /*routeIdYear*/
        ctx[5]);
      }

      if (
      /*$_isSmallScreen*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*$_isSmallScreen*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(section1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*$_screenClasses*/
      64 && section1_class_value !== (section1_class_value = "time_region_value_layout " +
      /*$_screenClasses*/
      ctx[6] + " svelte-13nq1ic")) {
        attr_dev(section1, "class", section1_class_value);
      }

      if (!current || dirty &
      /*$_style*/
      128) {
        attr_dev(section1, "style",
        /*$_style*/
        ctx[7]);
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
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(38:0) {#if $_screenClasses}",
    ctx: ctx
  });
  return block;
} // (63:4) {#if !$_isTimelineHidden}


function create_if_block_2(ctx) {
  var nav;
  var timeline;
  var nav_resize_listener;
  var current;
  timeline = new Timeline({
    props: {
      hrefBase:
      /*hrefBase*/
      ctx[1],
      availableYears:
      /*$_availableYears*/
      ctx[12],
      height:
      /*$_timelineHeight*/
      ctx[11],
      indicatorId:
      /*segment*/
      ctx[2],
      selectedYear:
      /*$_selectedYear*/
      ctx[13],
      showLess:
      /*$_isSmallScreen*/
      ctx[3],
      width:
      /*$_timelineWidth*/
      ctx[10]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      nav = element("nav");
      create_component(timeline.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      claim_component(timeline.$$.fragment, nav_nodes);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(nav, "class", "svelte-13nq1ic");
      add_render_callback(function () {
        return (
          /*nav_elementresize_handler*/
          ctx[20].call(nav)
        );
      });
      add_location(nav, file$1, 63, 5, 1548);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      mount_component(timeline, nav, null);
      nav_resize_listener = add_resize_listener(nav,
      /*nav_elementresize_handler*/
      ctx[20].bind(nav));
      current = true;
    },
    p: function update(ctx, dirty) {
      var timeline_changes = {};
      if (dirty &
      /*hrefBase*/
      2) timeline_changes.hrefBase =
      /*hrefBase*/
      ctx[1];
      if (dirty &
      /*$_availableYears*/
      4096) timeline_changes.availableYears =
      /*$_availableYears*/
      ctx[12];
      if (dirty &
      /*$_timelineHeight*/
      2048) timeline_changes.height =
      /*$_timelineHeight*/
      ctx[11];
      if (dirty &
      /*segment*/
      4) timeline_changes.indicatorId =
      /*segment*/
      ctx[2];
      if (dirty &
      /*$_selectedYear*/
      8192) timeline_changes.selectedYear =
      /*$_selectedYear*/
      ctx[13];
      if (dirty &
      /*$_isSmallScreen*/
      8) timeline_changes.showLess =
      /*$_isSmallScreen*/
      ctx[3];
      if (dirty &
      /*$_timelineWidth*/
      1024) timeline_changes.width =
      /*$_timelineWidth*/
      ctx[10];
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
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(63:4) {#if !$_isTimelineHidden}",
    ctx: ctx
  });
  return block;
} // (81:2) {#if $_isSmallScreen}


function create_if_block_1(ctx) {
  var viewselector;
  var current;
  viewselector = new ViewSelector({
    props: {
      _routes: _routes,
      _views: _views,
      showView: showView
    },
    $$inline: true
  });
  var block = {
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
    p: noop,
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
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(81:2) {#if $_isSmallScreen}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var screengauge;
  var t;
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  screengauge = new ScreenGauge({
    $$inline: true
  });
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$_screenClasses*/
    ctx[6]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      create_component(screengauge.$$.fragment);
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      claim_component(screengauge.$$.fragment, nodes);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(screengauge, target, anchor);
      insert_dev(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
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
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(screengauge.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(screengauge.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(screengauge, detaching);
      if (detaching) detach_dev(t);
      if_blocks[current_block_type_index].d(detaching);
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
  var routeId;
  var routeIdYear;

  var $_groups,
      $$unsubscribe__groups = noop,
      $$subscribe__groups = function $$subscribe__groups() {
    return $$unsubscribe__groups(), $$unsubscribe__groups = subscribe(_groups, function ($$value) {
      return $$invalidate(16, $_groups = $$value);
    }), _groups;
  };

  var $_isSmallScreen;
  var $_routes;
  var $_screenClasses;
  var $_style;
  var $_viewsClasses;
  var $_isTimelineHidden;
  var $_timelineWidth;
  var $_timelineHeight;
  var $_availableYears;
  var $_selectedYear;
  var $_theme;
  validate_store(_isSmallScreen, "_isSmallScreen");
  component_subscribe($$self, _isSmallScreen, function ($$value) {
    return $$invalidate(3, $_isSmallScreen = $$value);
  });
  validate_store(_routes, "_routes");
  component_subscribe($$self, _routes, function ($$value) {
    return $$invalidate(17, $_routes = $$value);
  });
  validate_store(_screenClasses, "_screenClasses");
  component_subscribe($$self, _screenClasses, function ($$value) {
    return $$invalidate(6, $_screenClasses = $$value);
  });
  validate_store(_style, "_style");
  component_subscribe($$self, _style, function ($$value) {
    return $$invalidate(7, $_style = $$value);
  });
  validate_store(_viewsClasses, "_viewsClasses");
  component_subscribe($$self, _viewsClasses, function ($$value) {
    return $$invalidate(8, $_viewsClasses = $$value);
  });
  validate_store(_isTimelineHidden, "_isTimelineHidden");
  component_subscribe($$self, _isTimelineHidden, function ($$value) {
    return $$invalidate(9, $_isTimelineHidden = $$value);
  });
  validate_store(_timelineWidth, "_timelineWidth");
  component_subscribe($$self, _timelineWidth, function ($$value) {
    return $$invalidate(10, $_timelineWidth = $$value);
  });
  validate_store(_timelineHeight, "_timelineHeight");
  component_subscribe($$self, _timelineHeight, function ($$value) {
    return $$invalidate(11, $_timelineHeight = $$value);
  });
  validate_store(_availableYears, "_availableYears");
  component_subscribe($$self, _availableYears, function ($$value) {
    return $$invalidate(12, $_availableYears = $$value);
  });
  validate_store(_selectedYear, "_selectedYear");
  component_subscribe($$self, _selectedYear, function ($$value) {
    return $$invalidate(13, $_selectedYear = $$value);
  });
  validate_store(_theme, "_theme");
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(14, $_theme = $$value);
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__groups();
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", slots, ['default']);

  var _$$props$_groups = $$props._groups,
      _groups = _$$props$_groups === void 0 ? null : _$$props$_groups;

  validate_store(_groups, "_groups");
  $$subscribe__groups();
  var _$$props$hrefBase = $$props.hrefBase,
      hrefBase = _$$props$hrefBase === void 0 ? "" : _$$props$hrefBase; // relative to `document.baseURI`

  var _$$props$segment = $$props.segment,
      segment = _$$props$segment === void 0 ? null : _$$props$segment;
  var _$$props$theme = $$props.theme,
      theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var writable_props = ["_groups", "hrefBase", "segment", "theme"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });

  function nav_elementresize_handler() {
    $_timelineHeight = this.clientHeight;

    _timelineHeight.set($_timelineHeight);
  }

  function div1_elementresize_handler() {
    $_timelineWidth = this.clientWidth;

    _timelineWidth.set($_timelineWidth);
  }

  $$self.$$set = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("hrefBase" in $$props) $$invalidate(1, hrefBase = $$props.hrefBase);
    if ("segment" in $$props) $$invalidate(2, segment = $$props.segment);
    if ("theme" in $$props) $$invalidate(15, theme = $$props.theme);
    if ("$$scope" in $$props) $$invalidate(18, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      ScreenGauge: ScreenGauge,
      LoadingView: LoadingView,
      Sidebar: Sidebar,
      Timeline: Timeline,
      ViewSelector: ViewSelector,
      setGroups: setGroups,
      _isSmallScreen: _isSmallScreen,
      _screenClasses: _screenClasses,
      _timelineHeight: _timelineHeight,
      _timelineWidth: _timelineWidth,
      _isTimelineHidden: _isTimelineHidden,
      _routes: _routes,
      _views: _views,
      _viewsClasses: _viewsClasses,
      showView: showView,
      _availableYears: _availableYears,
      _selectedYear: _selectedYear,
      _style: _style,
      _theme: _theme,
      customizeTheme: customizeTheme,
      _groups: _groups,
      hrefBase: hrefBase,
      segment: segment,
      theme: theme,
      $_groups: $_groups,
      routeId: routeId,
      $_isSmallScreen: $_isSmallScreen,
      $_routes: $_routes,
      routeIdYear: routeIdYear,
      $_screenClasses: $_screenClasses,
      $_style: $_style,
      $_viewsClasses: $_viewsClasses,
      $_isTimelineHidden: $_isTimelineHidden,
      $_timelineWidth: $_timelineWidth,
      $_timelineHeight: $_timelineHeight,
      $_availableYears: $_availableYears,
      $_selectedYear: $_selectedYear,
      $_theme: $_theme
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("hrefBase" in $$props) $$invalidate(1, hrefBase = $$props.hrefBase);
    if ("segment" in $$props) $$invalidate(2, segment = $$props.segment);
    if ("theme" in $$props) $$invalidate(15, theme = $$props.theme);
    if ("routeId" in $$props) $$invalidate(4, routeId = $$props.routeId);
    if ("routeIdYear" in $$props) $$invalidate(5, routeIdYear = $$props.routeIdYear);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*theme*/
    32768) {
      theme && customizeTheme(theme);
    }

    if ($$self.$$.dirty &
    /*_groups, $_groups*/
    65537) {
      _groups && setGroups($_groups);
    }

    if ($$self.$$.dirty &
    /*$_isSmallScreen, $_routes*/
    131080) {
      $$invalidate(4, routeId = $_isSmallScreen && $_routes.Id);
    }

    if ($$self.$$.dirty &
    /*$_isSmallScreen, $_routes*/
    131080) {
      $$invalidate(5, routeIdYear = $_isSmallScreen && $_routes.IdYear);
    }
  };

  return [_groups, hrefBase, segment, $_isSmallScreen, routeId, routeIdYear, $_screenClasses, $_style, $_viewsClasses, $_isTimelineHidden, $_timelineWidth, $_timelineHeight, $_availableYears, $_selectedYear, $_theme, theme, $_groups, $_routes, $$scope, slots, nav_elementresize_handler, div1_elementresize_handler];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$1(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      _groups: 0,
      hrefBase: 1,
      segment: 2,
      theme: 15
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(Layout, [{
    key: "_groups",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hrefBase",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Layout;
}(SvelteComponentDev);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/compounds/time_region_value/_layout.svelte"; // (24:2) <Layout    {_groups}    {hrefBase}    {segment}   >

function create_default_slot(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[1].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  var block = {
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
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        4)) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], dirty, null, null);
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
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(24:2) <Layout    {_groups}    {hrefBase}    {segment}   >",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var section;
  var nav;
  var a;
  var span;
  var t1;
  var t2;
  var main;
  var layout;
  var current;
  layout = new Layout({
    props: {
      _groups: _groups,
      hrefBase: hrefBase,
      segment:
      /*segment*/
      ctx[0],
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
      t0 = space();
      section = element("section");
      nav = element("nav");
      a = element("a");
      span = element("span");
      t1 = text("@svizzle/time_region_value");
      t2 = space();
      main = element("main");
      create_component(layout.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-d9xgiw\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", {
        class: true
      });
      var section_nodes = children(section);
      nav = claim_element(section_nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      a = claim_element(nav_nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      span = claim_element(a_nodes, "SPAN", {});
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, "@svizzle/time_region_value");
      span_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      t2 = claim_space(section_nodes);
      main = claim_element(section_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      claim_component(layout.$$.fragment, main_nodes);
      main_nodes.forEach(detach_dev);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "@svizzle/time_region_value";
      add_location(span, file, 19, 3, 369);
      attr_dev(a, "class", "undecor");
      attr_dev(a, "href", "/svizzle/compounds/time_region_value");
      add_location(a, file, 15, 2, 293);
      attr_dev(nav, "class", "svelte-1fphwp9");
      add_location(nav, file, 14, 1, 285);
      attr_dev(main, "class", "svelte-1fphwp9");
      add_location(main, file, 22, 1, 425);
      attr_dev(section, "class", "svelte-1fphwp9");
      add_location(section, file, 13, 0, 274);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, section, anchor);
      append_dev(section, nav);
      append_dev(nav, a);
      append_dev(a, span);
      append_dev(span, t1);
      append_dev(section, t2);
      append_dev(section, main);
      mount_component(layout, main, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = {};
      if (dirty &
      /*segment*/
      1) layout_changes.segment =
      /*segment*/
      ctx[0];

      if (dirty &
      /*$$scope*/
      4) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(section);
      destroy_component(layout);
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
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", slots, ['default']);
  var segment = $$props.segment;
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Layout: Layout,
      _groups: _groups,
      hrefBase: hrefBase,
      segment: segment
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, slots, $$scope];
}

var Layout_1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout_1, _SvelteComponentDev);

  var _super = _createSuper(Layout_1);

  function Layout_1(options) {
    var _this;

    _classCallCheck(this, Layout_1);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout_1",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Layout_1, [{
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Layout_1;
}(SvelteComponentDev);

export default Layout_1;
