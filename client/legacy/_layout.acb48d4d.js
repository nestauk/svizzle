import { D as _slicedToArray, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, w as _createClass, S as SvelteComponentDev, x as validate_each_argument, $ as validate_store, a0 as component_subscribe, v as validate_slots, ag as subscribe, ah as onMount, g as element, t as text, f as space, k as claim_element, l as children, m as claim_text, h as detach_dev, j as claim_space, n as attr_dev, o as add_location, p as insert_dev, r as append_dev, O as set_data_dev, z as transition_in, J as group_outros, A as transition_out, B as check_outros, C as destroy_each, X as add_render_callback, Y as add_resize_listener, u as noop, a5 as binding_callbacks, F as create_component, G as claim_component, H as mount_component, I as destroy_component, K as toggle_class, ai as action_destroyer, a2 as is_function, L as svg_element, R as empty, P as listen_dev, a3 as run_all, y as create_slot, E as update_slot, q as query_selector_all } from './client.83de09e6.js';
import { S as ScreenGauge } from './ScreenGauge.8a8b69cb.js';
import { L as LoadingView } from './LoadingView.009c8dbd.js';
import { L as Link, I as Icon } from './linear.9ddc8189.js';
import { _ as _hrefBase, s as setGroups, a as _timelineLayout, b as _yearRange, c as shortenYear, d as _isSmallScreen, e as _routes, f as _screenClasses, g as _viewsClasses, h as _isTimelineHidden, i as _timelineWidth, j as _timelineHeight, k as _availableYears, l as _selectedYear, m as setPOIs, n as _views, o as setHrefBase, p as setNavFlags, q as showView, r as _groups } from './stores.09d01cf4.js';
import { _ as _theme, a as _style, s as setRegionSettings, c as customizeTheme } from './regionSelection.b05cb2b2.js';
import { m as makeURL, f as flags, h as hrefBase, r as regionSettings } from './_config.07182c00.js';
import { H as _, a9 as isNotNil, D as last, ak as findIndex, al as is, a1 as when, R as always, m as mapValuesWith } from './defaultLocale.ed51f02f.js';
import { i as isServerSide } from './env.a10fb8fd.js';
import { L as List, A as Activity, B as BarChart, C as Clock, M as MapPin } from './MapPin.249533df.js';
import { I as Info } from './Info.eaefe45f.js';
import { S as Settings } from './Settings.dd58fe5c.js';

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
  child_ctx[11] = list[i].label;
  child_ctx[12] = list[i].indicators;
  return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i].title;
  child_ctx[16] = list[i].schema;
  return child_ctx;
} // (60:4) <Link      href={makeURL($_hrefBase, schema.value.id)}      rel='prefetch'      theme={{color: $_theme.colorWhite}}     >


function create_default_slot$1(ctx) {
  var p;
  var t_value =
  /*title*/
  ctx[15] + "";
  var t;
  var keepOnScreen_action;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "svelte-1emt6xg");
      toggle_class(p, "selected",
      /*schema*/
      ctx[16].value.id ===
      /*currentId*/
      ctx[1]);
      add_location(p, file$4, 64, 5, 1470);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);

      if (!mounted) {
        dispose = action_destroyer(keepOnScreen_action =
        /*keepOnScreen*/
        ctx[7].call(null, p, {
          id:
          /*schema*/
          ctx[16].value.id,
          currentId:
          /*currentId*/
          ctx[1],
          scrollableHeight:
          /*scrollableHeight*/
          ctx[4]
        }));
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*$_groups*/
      4 && t_value !== (t_value =
      /*title*/
      ctx[15] + "")) set_data_dev(t, t_value);
      if (keepOnScreen_action && is_function(keepOnScreen_action.update) && dirty &
      /*$_groups, currentId, scrollableHeight*/
      22) keepOnScreen_action.update.call(null, {
        id:
        /*schema*/
        ctx[16].value.id,
        currentId:
        /*currentId*/
        ctx[1],
        scrollableHeight:
        /*scrollableHeight*/
        ctx[4]
      });

      if (dirty &
      /*$_groups, currentId*/
      6) {
        toggle_class(p, "selected",
        /*schema*/
        ctx[16].value.id ===
        /*currentId*/
        ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(60:4) <Link      href={makeURL($_hrefBase, schema.value.id)}      rel='prefetch'      theme={{color: $_theme.colorWhite}}     >",
    ctx: ctx
  });
  return block;
} // (59:3) {#each indicators as {title, schema}}


function create_each_block_1$1(ctx) {
  var link;
  var current;
  link = new Link({
    props: {
      href: makeURL(
      /*$_hrefBase*/
      ctx[5],
      /*schema*/
      ctx[16].value.id),
      rel: "prefetch",
      theme: {
        color:
        /*$_theme*/
        ctx[6].colorWhite
      },
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
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
      var link_changes = {};
      if (dirty &
      /*$_hrefBase, $_groups*/
      36) link_changes.href = makeURL(
      /*$_hrefBase*/
      ctx[5],
      /*schema*/
      ctx[16].value.id);
      if (dirty &
      /*$_theme*/
      64) link_changes.theme = {
        color:
        /*$_theme*/
        ctx[6].colorWhite
      };

      if (dirty &
      /*$$scope, $_groups, currentId, scrollableHeight*/
      524310) {
        link_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
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
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(59:3) {#each indicators as {title, schema}}",
    ctx: ctx
  });
  return block;
} // (56:1) {#each $_groups as {label, indicators}}


function create_each_block$1(ctx) {
  var div;
  var header;
  var t0_value =
  /*label*/
  ctx[11] + "";
  var t0;
  var t1;
  var t2;
  var current;
  var each_value_1 =
  /*indicators*/
  ctx[12];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      div = element("div");
      header = element("header");
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
      header = claim_element(div_nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      t0 = claim_text(header_nodes, t0_value);
      header_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(header, "class", "svelte-1emt6xg");
      add_location(header, file$4, 57, 3, 1273);
      attr_dev(div, "class", "group svelte-1emt6xg");
      add_location(div, file$4, 56, 2, 1250);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, header);
      append_dev(header, t0);
      append_dev(div, t1);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }

      append_dev(div, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*$_groups*/
      4) && t0_value !== (t0_value =
      /*label*/
      ctx[11] + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*makeURL, $_hrefBase, $_groups, $_theme, currentId, scrollableHeight*/
      118) {
        each_value_1 =
        /*indicators*/
        ctx[12];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(div, t2);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
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
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(56:1) {#each $_groups as {label, indicators}}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var nav;
  var nav_resize_listener;
  var current;
  var each_value =
  /*$_groups*/
  ctx[2];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      nav = element("nav");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(nav_nodes);
      }

      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(nav, "class", "svelte-1emt6xg");
      add_render_callback(function () {
        return (
          /*nav_elementresize_handler*/
          ctx[8].call(nav)
        );
      });
      add_location(nav, file$4, 51, 0, 1138);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(nav, null);
      }

      nav_resize_listener = add_resize_listener(nav,
      /*nav_elementresize_handler*/
      ctx[8].bind(nav));
      /*nav_binding*/

      ctx[9](nav);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$_groups, makeURL, $_hrefBase, $_theme, currentId, scrollableHeight*/
      118) {
        each_value =
        /*$_groups*/
        ctx[2];
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block$1(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(nav, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_each(each_blocks, detaching);
      nav_resize_listener();
      /*nav_binding*/

      ctx[9](null);
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
      return $$invalidate(2, $_groups = $$value);
    }), _groups;
  };

  var $_hrefBase;
  var $_theme;
  validate_store(_hrefBase, "_hrefBase");
  component_subscribe($$self, _hrefBase, function ($$value) {
    return $$invalidate(5, $_hrefBase = $$value);
  });
  validate_store(_theme, "_theme");
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(6, $_theme = $$value);
  });
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

  var writable_props = ["_groups", "currentId"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Sidebar> was created with unknown prop '".concat(key, "'"));
  });

  function nav_elementresize_handler() {
    scrollableHeight = this.clientHeight;
    $$invalidate(4, scrollableHeight);
  }

  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      scrollable = $$value;
      $$invalidate(3, scrollable);
    });
  }

  $$self.$$set = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("currentId" in $$props) $$invalidate(1, currentId = $$props.currentId);
  };

  $$self.$capture_state = function () {
    return {
      Link: Link,
      onMount: onMount,
      setGroups: setGroups,
      _hrefBase: _hrefBase,
      _theme: _theme,
      makeURL: makeURL,
      _groups: _groups,
      currentId: currentId,
      currentNode: currentNode,
      scrollable: scrollable,
      scrollableHeight: scrollableHeight,
      keepOnScreen: keepOnScreen,
      $_groups: $_groups,
      $_hrefBase: $_hrefBase,
      $_theme: $_theme
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("_groups" in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ("currentId" in $$props) $$invalidate(1, currentId = $$props.currentId);
    if ("currentNode" in $$props) currentNode = $$props.currentNode;
    if ("scrollable" in $$props) $$invalidate(3, scrollable = $$props.scrollable);
    if ("scrollableHeight" in $$props) $$invalidate(4, scrollableHeight = $$props.scrollableHeight);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*_groups, $_groups*/
    5) {
      _groups && setGroups($_groups);
    }
  };

  return [_groups, currentId, $_groups, scrollable, scrollableHeight, $_hrefBase, $_theme, keepOnScreen, nav_elementresize_handler, nav_binding];
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
      currentId: 1
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
  }]);

  return Sidebar;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "../../components/time_region_value/src/node_modules/components/Timeline.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[30] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[30] = list[i];
  return child_ctx;
} // (51:1) {#if width && height && $_layout || isServerSide}


function create_if_block$2(ctx) {
  var svg;
  var if_block0_anchor;
  var if_block0 =
  /*selectedYear*/
  ctx[3] && create_if_block_4(ctx);

  function select_block_type_2(ctx, dirty) {
    if (
    /*showLess*/
    ctx[4] &&
    /*selectedYear*/
    ctx[3]) return create_if_block_1$2;
    return create_else_block;
  }

  var current_block_type = select_block_type_2(ctx);
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
      ctx[5]);
      attr_dev(svg, "height",
      /*height*/
      ctx[1]);
      attr_dev(svg, "class", "svelte-rmsnzm");
      add_location(svg, file$3, 51, 2, 1750);
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
      ctx[3]) {
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

      if (dirty[0] &
      /*width*/
      32) {
        attr_dev(svg, "width",
        /*width*/
        ctx[5]);
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
    source: "(51:1) {#if width && height && $_layout || isServerSide}",
    ctx: ctx
  });
  return block;
} // (57:3) {#if selectedYear}


function create_if_block_4(ctx) {
  var g0;
  var g0_transform_value;
  var g1;
  var g1_transform_value;

  function select_block_type(ctx, dirty) {
    if (
    /*hrefPrev*/
    ctx[22]) return create_if_block_6;
    return create_else_block_2;
  }

  var current_block_type = select_block_type(ctx);
  var if_block0 = current_block_type(ctx);

  function select_block_type_1(ctx, dirty) {
    if (
    /*hrefNext*/
    ctx[23]) return create_if_block_5;
    return create_else_block_1;
  }

  var current_block_type_1 = select_block_type_1(ctx);
  var if_block1 = current_block_type_1(ctx);
  var block = {
    c: function create() {
      g0 = svg_element("g");
      if_block0.c();
      g1 = svg_element("g");
      if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      g0 = claim_element(nodes, "g", {
        transform: true,
        class: true
      }, 1);
      var g0_nodes = children(g0);
      if_block0.l(g0_nodes);
      g0_nodes.forEach(detach_dev);
      g1 = claim_element(nodes, "g", {
        transform: true,
        class: true
      }, 1);
      var g1_nodes = children(g1);
      if_block1.l(g1_nodes);
      g1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*prevX*/
      ctx[16] + "," +
      /*buttonY*/
      ctx[8] + ")");
      attr_dev(g0, "class", "svelte-rmsnzm");
      toggle_class(g0, "active",
      /*isPrevYearActive*/
      ctx[11]);
      add_location(g0, file$3, 59, 4, 1847);
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*nextX*/
      ctx[9] + "," +
      /*buttonY*/
      ctx[8] + ")");
      attr_dev(g1, "class", "svelte-rmsnzm");
      toggle_class(g1, "active",
      /*isNextYearActive*/
      ctx[13]);
      add_location(g1, file$3, 87, 4, 2452);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g0, anchor);
      if_block0.m(g0, null);
      insert_dev(target, g1, anchor);
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

      if (dirty[0] &
      /*prevX, buttonY*/
      65792 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*prevX*/
      ctx[16] + "," +
      /*buttonY*/
      ctx[8] + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (dirty[0] &
      /*isPrevYearActive*/
      2048) {
        toggle_class(g0, "active",
        /*isPrevYearActive*/
        ctx[11]);
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

      if (dirty[0] &
      /*nextX, buttonY*/
      768 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*nextX*/
      ctx[9] + "," +
      /*buttonY*/
      ctx[8] + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }

      if (dirty[0] &
      /*isNextYearActive*/
      8192) {
        toggle_class(g1, "active",
        /*isNextYearActive*/
        ctx[13]);
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
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(57:3) {#if selectedYear}",
    ctx: ctx
  });
  return block;
} // (76:5) {:else}


function create_else_block_2(ctx) {
  var g;
  var rect;
  var polyline;
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        "aria-label": true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      polyline = claim_element(g_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "width",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "class", "svelte-rmsnzm");
      add_location(rect, file$3, 77, 7, 2282);
      attr_dev(polyline, "points",
      /*chevronLeftPath*/
      ctx[20]);
      attr_dev(polyline, "class", "svelte-rmsnzm");
      add_location(polyline, file$3, 81, 7, 2360);
      attr_dev(g, "aria-label", "Previous year not available");
      add_location(g, file$3, 76, 6, 2230);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, rect);
      append_dev(g, polyline);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "height",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "width",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*chevronLeftPath*/
      1048576) {
        attr_dev(polyline, "points",
        /*chevronLeftPath*/
        ctx[20]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_2.name,
    type: "else",
    source: "(76:5) {:else}",
    ctx: ctx
  });
  return block;
} // (64:5) {#if hrefPrev}


function create_if_block_6(ctx) {
  var a;
  var rect;
  var polyline;
  var a_aria_label_value;
  var block = {
    c: function create() {
      a = svg_element("a");
      rect = svg_element("rect");
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "a", {
        "aria-label": true,
        href: true,
        rel: true
      }, 1);
      var a_nodes = children(a);
      rect = claim_element(a_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      polyline = claim_element(a_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline).forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "width",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "class", "svelte-rmsnzm");
      add_location(rect, file$3, 69, 7, 2084);
      attr_dev(polyline, "points",
      /*chevronLeftPath*/
      ctx[20]);
      attr_dev(polyline, "class", "svelte-rmsnzm");
      add_location(polyline, file$3, 73, 7, 2162);
      attr_dev(a, "aria-label", a_aria_label_value = "Show the previous year (" +
      /*prevYear*/
      ctx[10] + ")");
      attr_dev(a, "href",
      /*hrefPrev*/
      ctx[22]);
      attr_dev(a, "rel", "prefetch");
      add_location(a, file$3, 64, 6, 1965);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, rect);
      append_dev(a, polyline);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "height",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "width",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*chevronLeftPath*/
      1048576) {
        attr_dev(polyline, "points",
        /*chevronLeftPath*/
        ctx[20]);
      }

      if (dirty[0] &
      /*prevYear*/
      1024 && a_aria_label_value !== (a_aria_label_value = "Show the previous year (" +
      /*prevYear*/
      ctx[10] + ")")) {
        attr_dev(a, "aria-label", a_aria_label_value);
      }

      if (dirty[0] &
      /*hrefPrev*/
      4194304) {
        attr_dev(a, "href",
        /*hrefPrev*/
        ctx[22]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(64:5) {#if hrefPrev}",
    ctx: ctx
  });
  return block;
} // (104:5) {:else}


function create_else_block_1(ctx) {
  var g;
  var rect;
  var polyline;
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {
        "aria-label": true
      }, 1);
      var g_nodes = children(g);
      rect = claim_element(g_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      polyline = claim_element(g_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "width",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "class", "svelte-rmsnzm");
      add_location(rect, file$3, 105, 7, 2880);
      attr_dev(polyline, "points",
      /*chevronRightPath*/
      ctx[21]);
      attr_dev(polyline, "class", "svelte-rmsnzm");
      add_location(polyline, file$3, 109, 7, 2958);
      attr_dev(g, "aria-label", "Next year not available");
      add_location(g, file$3, 104, 6, 2832);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      append_dev(g, rect);
      append_dev(g, polyline);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "height",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "width",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*chevronRightPath*/
      2097152) {
        attr_dev(polyline, "points",
        /*chevronRightPath*/
        ctx[21]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(104:5) {:else}",
    ctx: ctx
  });
  return block;
} // (92:5) {#if hrefNext}


function create_if_block_5(ctx) {
  var a;
  var rect;
  var polyline;
  var a_aria_label_value;
  var block = {
    c: function create() {
      a = svg_element("a");
      rect = svg_element("rect");
      polyline = svg_element("polyline");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "a", {
        "aria-label": true,
        href: true,
        rel: true
      }, 1);
      var a_nodes = children(a);
      rect = claim_element(a_nodes, "rect", {
        height: true,
        width: true,
        class: true
      }, 1);
      children(rect).forEach(detach_dev);
      polyline = claim_element(a_nodes, "polyline", {
        points: true,
        class: true
      }, 1);
      children(polyline).forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "width",
      /*halfHeight*/
      ctx[7]);
      attr_dev(rect, "class", "svelte-rmsnzm");
      add_location(rect, file$3, 97, 7, 2685);
      attr_dev(polyline, "points",
      /*chevronRightPath*/
      ctx[21]);
      attr_dev(polyline, "class", "svelte-rmsnzm");
      add_location(polyline, file$3, 101, 7, 2763);
      attr_dev(a, "aria-label", a_aria_label_value = "Show the next year (" +
      /*nextYear*/
      ctx[12] + ")");
      attr_dev(a, "href",
      /*hrefNext*/
      ctx[23]);
      attr_dev(a, "rel", "prefetch");
      add_location(a, file$3, 92, 6, 2570);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, rect);
      append_dev(a, polyline);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "height",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(rect, "width",
        /*halfHeight*/
        ctx[7]);
      }

      if (dirty[0] &
      /*chevronRightPath*/
      2097152) {
        attr_dev(polyline, "points",
        /*chevronRightPath*/
        ctx[21]);
      }

      if (dirty[0] &
      /*nextYear*/
      4096 && a_aria_label_value !== (a_aria_label_value = "Show the next year (" +
      /*nextYear*/
      ctx[12] + ")")) {
        attr_dev(a, "aria-label", a_aria_label_value);
      }

      if (dirty[0] &
      /*hrefNext*/
      8388608) {
        attr_dev(a, "href",
        /*hrefNext*/
        ctx[23]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(92:5) {#if hrefNext}",
    ctx: ctx
  });
  return block;
} // (124:3) {:else}


function create_else_block(ctx) {
  var if_block0_anchor;
  var if_block1_anchor;
  var if_block0 =
  /*availableYears*/
  ctx[0] && create_if_block_3$2(ctx);
  var if_block1 =
  /*$_yearRange*/
  ctx[24] && create_if_block_2$2(ctx);
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
          if_block0 = create_if_block_3$2(ctx);
          if_block0.c();
          if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*$_yearRange*/
      ctx[24]) {
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
    id: create_else_block.name,
    type: "else",
    source: "(124:3) {:else}",
    ctx: ctx
  });
  return block;
} // (117:3) {#if showLess && selectedYear}


function create_if_block_1$2(ctx) {
  var text_1;
  var t;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text(
      /*selectedYear*/
      ctx[3]);
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
      ctx[3]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "x",
      /*yearsCenterX*/
      ctx[17]);
      attr_dev(text_1, "y",
      /*halfHeight*/
      ctx[7]);
      attr_dev(text_1, "class", "svelte-rmsnzm");
      add_location(text_1, file$3, 118, 4, 3078);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*selectedYear*/
      8) set_data_dev(t,
      /*selectedYear*/
      ctx[3]);

      if (dirty[0] &
      /*yearsCenterX*/
      131072) {
        attr_dev(text_1, "x",
        /*yearsCenterX*/
        ctx[17]);
      }

      if (dirty[0] &
      /*halfHeight*/
      128) {
        attr_dev(text_1, "y",
        /*halfHeight*/
        ctx[7]);
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
    source: "(117:3) {#if showLess && selectedYear}",
    ctx: ctx
  });
  return block;
} // (128:4) {#if availableYears}


function create_if_block_3$2(ctx) {
  var g;
  var line;
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
      attr_dev(line, "x1",
      /*lineX1*/
      ctx[18]);
      attr_dev(line, "x2",
      /*lineX2*/
      ctx[19]);
      attr_dev(line, "class", "svelte-rmsnzm");
      add_location(line, file$3, 129, 6, 3264);
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*$_layout*/
      ctx[6].y1 + ")");
      add_location(g, file$3, 128, 5, 3215);
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
      /*lineX1*/
      262144) {
        attr_dev(line, "x1",
        /*lineX1*/
        ctx[18]);
      }

      if (dirty[0] &
      /*lineX2*/
      524288) {
        attr_dev(line, "x2",
        /*lineX2*/
        ctx[19]);
      }

      if (dirty[0] &
      /*availableYears, $_hrefBase, indicatorId, $_layout, selectedYear*/
      16461) {
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
      64 && g_transform_value !== (g_transform_value = "translate(0," +
      /*$_layout*/
      ctx[6].y1 + ")")) {
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
    id: create_if_block_3$2.name,
    type: "if",
    source: "(128:4) {#if availableYears}",
    ctx: ctx
  });
  return block;
} // (134:6) {#each availableYears as year}


function create_each_block_1(ctx) {
  var a;
  var circle;
  var circle_cx_value;
  var circle_r_value;
  var a_aria_label_value;
  var a_href_value;
  var block = {
    c: function create() {
      a = svg_element("a");
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "a", {
        "aria-label": true,
        href: true,
        rel: true
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
      ctx[6].scaleX(
      /*year*/
      ctx[30]));
      attr_dev(circle, "r", circle_r_value =
      /*$_layout*/
      ctx[6].radius);
      attr_dev(circle, "class", "svelte-rmsnzm");
      toggle_class(circle, "selected",
      /*selectedYear*/
      ctx[3] &&
      /*selectedYear*/
      ctx[3] ===
      /*year*/
      ctx[30]);
      add_location(circle, file$3, 139, 8, 3484);
      attr_dev(a, "aria-label", a_aria_label_value =
      /*year*/
      ctx[30]);
      attr_dev(a, "href", a_href_value = makeURL(
      /*$_hrefBase*/
      ctx[14],
      /*indicatorId*/
      ctx[2],
      /*year*/
      ctx[30]));
      attr_dev(a, "rel", "prefetch");
      add_location(a, file$3, 134, 7, 3361);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, circle);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, availableYears*/
      65 && circle_cx_value !== (circle_cx_value =
      /*$_layout*/
      ctx[6].scaleX(
      /*year*/
      ctx[30]))) {
        attr_dev(circle, "cx", circle_cx_value);
      }

      if (dirty[0] &
      /*$_layout*/
      64 && circle_r_value !== (circle_r_value =
      /*$_layout*/
      ctx[6].radius)) {
        attr_dev(circle, "r", circle_r_value);
      }

      if (dirty[0] &
      /*selectedYear, availableYears*/
      9) {
        toggle_class(circle, "selected",
        /*selectedYear*/
        ctx[3] &&
        /*selectedYear*/
        ctx[3] ===
        /*year*/
        ctx[30]);
      }

      if (dirty[0] &
      /*availableYears*/
      1 && a_aria_label_value !== (a_aria_label_value =
      /*year*/
      ctx[30])) {
        attr_dev(a, "aria-label", a_aria_label_value);
      }

      if (dirty[0] &
      /*$_hrefBase, indicatorId, availableYears*/
      16389 && a_href_value !== (a_href_value = makeURL(
      /*$_hrefBase*/
      ctx[14],
      /*indicatorId*/
      ctx[2],
      /*year*/
      ctx[30]))) {
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
    source: "(134:6) {#each availableYears as year}",
    ctx: ctx
  });
  return block;
} // (152:4) {#if $_yearRange}


function create_if_block_2$2(ctx) {
  var each_1_anchor;
  var each_value =
  /*$_yearRange*/
  ctx[24];
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
      16810048) {
        each_value =
        /*$_yearRange*/
        ctx[24];
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
    source: "(152:4) {#if $_yearRange}",
    ctx: ctx
  });
  return block;
} // (153:5) {#each $_yearRange as year}


function create_each_block(ctx) {
  var text_1;
  var t_value = (
  /*$_layout*/
  ctx[6].doShortenYears ? shortenYear(
  /*year*/
  ctx[30]) :
  /*year*/
  ctx[30]) + "";
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
      ctx[6].fontSize);
      attr_dev(text_1, "x", text_1_x_value =
      /*$_layout*/
      ctx[6].scaleX(
      /*year*/
      ctx[30]));
      attr_dev(text_1, "y",
      /*yearsY*/
      ctx[15]);
      attr_dev(text_1, "class", "svelte-rmsnzm");
      add_location(text_1, file$3, 153, 6, 3765);
    },
    m: function mount(target, anchor) {
      insert_dev(target, text_1, anchor);
      append_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, $_yearRange*/
      16777280 && t_value !== (t_value = (
      /*$_layout*/
      ctx[6].doShortenYears ? shortenYear(
      /*year*/
      ctx[30]) :
      /*year*/
      ctx[30]) + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*$_layout*/
      64 && text_1_font_size_value !== (text_1_font_size_value =
      /*$_layout*/
      ctx[6].fontSize)) {
        attr_dev(text_1, "font-size", text_1_font_size_value);
      }

      if (dirty[0] &
      /*$_layout, $_yearRange*/
      16777280 && text_1_x_value !== (text_1_x_value =
      /*$_layout*/
      ctx[6].scaleX(
      /*year*/
      ctx[30]))) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*yearsY*/
      32768) {
        attr_dev(text_1, "y",
        /*yearsY*/
        ctx[15]);
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
    source: "(153:5) {#each $_yearRange as year}",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var div;
  var if_block = (
  /*width*/
  ctx[5] &&
  /*height*/
  ctx[1] &&
  /*$_layout*/
  ctx[6] || isServerSide) && create_if_block$2(ctx);
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
      add_location(div, file$3, 49, 0, 1674);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
    },
    p: function update(ctx, dirty) {
      if (
      /*width*/
      ctx[5] &&
      /*height*/
      ctx[1] &&
      /*$_layout*/
      ctx[6] || isServerSide) {
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
  var lineX1;
  var lineX2;
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
  var $_hrefBase;
  var $_yearRange;
  validate_store(_timelineLayout, "_layout");
  component_subscribe($$self, _timelineLayout, function ($$value) {
    return $$invalidate(6, $_layout = $$value);
  });
  validate_store(_hrefBase, "_hrefBase");
  component_subscribe($$self, _hrefBase, function ($$value) {
    return $$invalidate(14, $_hrefBase = $$value);
  });
  validate_store(_yearRange, "_yearRange");
  component_subscribe($$self, _yearRange, function ($$value) {
    return $$invalidate(24, $_yearRange = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Timeline", slots, []);

  var zeroIfNaN = when(isNaN, always(0));

  var _$$props$availableYea = $$props.availableYears,
      availableYears = _$$props$availableYea === void 0 ? null : _$$props$availableYea;
  var _$$props$height = $$props.height,
      height = _$$props$height === void 0 ? null : _$$props$height;
  var _$$props$indicatorId = $$props.indicatorId,
      indicatorId = _$$props$indicatorId === void 0 ? null : _$$props$indicatorId;
  var _$$props$selectedYear = $$props.selectedYear,
      selectedYear = _$$props$selectedYear === void 0 ? null : _$$props$selectedYear;
  var _$$props$showLess = $$props.showLess,
      showLess = _$$props$showLess === void 0 ? false : _$$props$showLess;
  var width = $$props.width;
  var writable_props = ["availableYears", "height", "indicatorId", "selectedYear", "showLess", "width"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Timeline> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("availableYears" in $$props) $$invalidate(0, availableYears = $$props.availableYears);
    if ("height" in $$props) $$invalidate(1, height = $$props.height);
    if ("indicatorId" in $$props) $$invalidate(2, indicatorId = $$props.indicatorId);
    if ("selectedYear" in $$props) $$invalidate(3, selectedYear = $$props.selectedYear);
    if ("showLess" in $$props) $$invalidate(4, showLess = $$props.showLess);
    if ("width" in $$props) $$invalidate(5, width = $$props.width);
  };

  $$self.$capture_state = function () {
    return {
      _: _,
      isNotNil: isNotNil,
      _yearRange: _yearRange,
      _layout: _timelineLayout,
      _hrefBase: _hrefBase,
      isServerSide: isServerSide,
      shortenYear: shortenYear,
      makeURL: makeURL,
      zeroIfNaN: zeroIfNaN,
      availableYears: availableYears,
      height: height,
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
      lineX1: lineX1,
      lineX2: lineX2,
      chevronLeftPath: chevronLeftPath,
      chevronRightPath: chevronRightPath,
      selectedYearIndex: selectedYearIndex,
      prevYear: prevYear,
      isPrevYearActive: isPrevYearActive,
      nextYear: nextYear,
      isNextYearActive: isNextYearActive,
      hrefPrev: hrefPrev,
      $_hrefBase: $_hrefBase,
      hrefNext: hrefNext,
      $_yearRange: $_yearRange
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("availableYears" in $$props) $$invalidate(0, availableYears = $$props.availableYears);
    if ("height" in $$props) $$invalidate(1, height = $$props.height);
    if ("indicatorId" in $$props) $$invalidate(2, indicatorId = $$props.indicatorId);
    if ("selectedYear" in $$props) $$invalidate(3, selectedYear = $$props.selectedYear);
    if ("showLess" in $$props) $$invalidate(4, showLess = $$props.showLess);
    if ("width" in $$props) $$invalidate(5, width = $$props.width);
    if ("yearsY" in $$props) $$invalidate(15, yearsY = $$props.yearsY);
    if ("halfHeight" in $$props) $$invalidate(7, halfHeight = $$props.halfHeight);
    if ("buttonY" in $$props) $$invalidate(8, buttonY = $$props.buttonY);
    if ("prevX" in $$props) $$invalidate(16, prevX = $$props.prevX);
    if ("nextX" in $$props) $$invalidate(9, nextX = $$props.nextX);
    if ("yearsCenterX" in $$props) $$invalidate(17, yearsCenterX = $$props.yearsCenterX);
    if ("min" in $$props) $$invalidate(25, min = $$props.min);
    if ("max" in $$props) $$invalidate(26, max = $$props.max);
    if ("med" in $$props) $$invalidate(27, med = $$props.med);
    if ("lineX1" in $$props) $$invalidate(18, lineX1 = $$props.lineX1);
    if ("lineX2" in $$props) $$invalidate(19, lineX2 = $$props.lineX2);
    if ("chevronLeftPath" in $$props) $$invalidate(20, chevronLeftPath = $$props.chevronLeftPath);
    if ("chevronRightPath" in $$props) $$invalidate(21, chevronRightPath = $$props.chevronRightPath);
    if ("selectedYearIndex" in $$props) $$invalidate(28, selectedYearIndex = $$props.selectedYearIndex);
    if ("prevYear" in $$props) $$invalidate(10, prevYear = $$props.prevYear);
    if ("isPrevYearActive" in $$props) $$invalidate(11, isPrevYearActive = $$props.isPrevYearActive);
    if ("nextYear" in $$props) $$invalidate(12, nextYear = $$props.nextYear);
    if ("isNextYearActive" in $$props) $$invalidate(13, isNextYearActive = $$props.isNextYearActive);
    if ("hrefPrev" in $$props) $$invalidate(22, hrefPrev = $$props.hrefPrev);
    if ("hrefNext" in $$props) $$invalidate(23, hrefNext = $$props.hrefNext);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*availableYears, $_layout*/
    65) {
      var _availableYears;

      $$invalidate(15, yearsY = ((_availableYears = availableYears) === null || _availableYears === void 0 ? void 0 : _availableYears.length) > 0 ? $_layout.y2 : $_layout.ym);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout*/
    64) {
      /* buttons */
      $$invalidate(7, halfHeight = $_layout.height / 2);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    128) {
      $$invalidate(8, buttonY = halfHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*buttonY*/
    256) {
      $$invalidate(16, prevX = buttonY);
    }

    if ($$self.$$.dirty[0] &
    /*buttonY, halfHeight*/
    384) {
      $$invalidate(9, nextX = buttonY + halfHeight + 0.25 * buttonY);
    }

    if ($$self.$$.dirty[0] &
    /*nextX, halfHeight, width*/
    672) {
      $$invalidate(17, yearsCenterX = (nextX + halfHeight + width) / 2);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    128) {
      $$invalidate(25, min = halfHeight / 3);
    }

    if ($$self.$$.dirty[0] &
    /*min*/
    33554432) {
      $$invalidate(26, max = 2 * min);
    }

    if ($$self.$$.dirty[0] &
    /*halfHeight*/
    128) {
      $$invalidate(27, med = halfHeight / 2);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, availableYears*/
    65) {
      $$invalidate(18, lineX1 = zeroIfNaN($_layout.scaleX(availableYears[0]) + $_layout.radius));
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, availableYears*/
    65) {
      $$invalidate(19, lineX2 = zeroIfNaN($_layout.scaleX(last(availableYears)) - $_layout.radius));
    }

    if ($$self.$$.dirty[0] &
    /*max, min, med*/
    234881024) {
      $$invalidate(20, chevronLeftPath = "".concat(max, " ").concat(min, " ").concat(min, " ").concat(med, " ").concat(max, " ").concat(max));
    }

    if ($$self.$$.dirty[0] &
    /*min, max, med*/
    234881024) {
      $$invalidate(21, chevronRightPath = "".concat(min, " ").concat(min, " ").concat(max, " ").concat(med, " ").concat(min, " ").concat(max));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYear*/
    9) {
      $$invalidate(28, selectedYearIndex = findIndex(availableYears, is(selectedYear)));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYearIndex*/
    268435457) {
      $$invalidate(10, prevYear = availableYears[selectedYearIndex - 1]);
    }

    if ($$self.$$.dirty[0] &
    /*prevYear*/
    1024) {
      $$invalidate(11, isPrevYearActive = isNotNil(prevYear));
    }

    if ($$self.$$.dirty[0] &
    /*availableYears, selectedYearIndex*/
    268435457) {
      $$invalidate(12, nextYear = availableYears[selectedYearIndex + 1]);
    }

    if ($$self.$$.dirty[0] &
    /*nextYear*/
    4096) {
      $$invalidate(13, isNextYearActive = isNotNil(nextYear));
    }

    if ($$self.$$.dirty[0] &
    /*isPrevYearActive, $_hrefBase, indicatorId, prevYear*/
    19460) {
      $$invalidate(22, hrefPrev = isPrevYearActive ? makeURL($_hrefBase, indicatorId, prevYear) : null);
    }

    if ($$self.$$.dirty[0] &
    /*isNextYearActive, $_hrefBase, indicatorId, nextYear*/
    28676) {
      $$invalidate(23, hrefNext = isNextYearActive ? makeURL($_hrefBase, indicatorId, nextYear) : null);
    }
  };

  return [availableYears, height, indicatorId, selectedYear, showLess, width, $_layout, halfHeight, buttonY, nextX, prevYear, isPrevYearActive, nextYear, isNextYearActive, $_hrefBase, yearsY, prevX, yearsCenterX, lineX1, lineX2, chevronLeftPath, chevronRightPath, hrefPrev, hrefNext, $_yearRange, min, max, med, selectedYearIndex];
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
      indicatorId: 2,
      selectedYear: 3,
      showLess: 4,
      width: 5
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
    ctx[5] === undefined && !("width" in props)) {
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

function create_if_block_3$1(ctx) {
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
    id: create_if_block_3$1.name,
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
  var if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3$1];
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
var file$1 = "../../components/time_region_value/src/routes/_layout.svelte"; // (66:0) {#if $_screenClasses || isServerSide}

function create_if_block_1(ctx) {
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
      currentId:
      /*segment*/
      ctx[1]
    },
    $$inline: true
  });
  var default_slot_template =
  /*#slots*/
  ctx[22].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[21], null);
  var if_block0 = !
  /*$_isTimelineHidden*/
  ctx[8] && create_if_block_3(ctx);
  var if_block1 =
  /*$_isSmallScreen*/
  ctx[2] && create_if_block_2(ctx);
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
      attr_dev(div0, "class", "sidebar svelte-dclfdu");
      add_location(div0, file$1, 76, 3, 2494);
      attr_dev(section0, "class", "svelte-dclfdu");
      add_location(section0, file$1, 87, 4, 2710);
      attr_dev(div1, "class", "content svelte-dclfdu");
      add_render_callback(function () {
        return (
          /*div1_elementresize_handler*/
          ctx[24].call(div1)
        );
      });
      toggle_class(div1, "isTimelineHidden",
      /*$_isTimelineHidden*/
      ctx[8]);
      add_location(div1, file$1, 82, 3, 2589);
      attr_dev(div2, "class", div2_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[7] + " svelte-dclfdu");
      toggle_class(div2, "routeId",
      /*routeId*/
      ctx[3]);
      toggle_class(div2, "routeIdYear",
      /*routeIdYear*/
      ctx[4]);
      add_location(div2, file$1, 71, 2, 2407);
      attr_dev(section1, "class", section1_class_value = "time_region_value_layout " +
      /*$_screenClasses*/
      ctx[5] + " svelte-dclfdu");
      attr_dev(section1, "style",
      /*$_style*/
      ctx[6]);
      toggle_class(section1, "hidden", !
      /*$_screenClasses*/
      ctx[5]);
      add_location(section1, file$1, 66, 1, 2288);
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
      ctx[24].bind(div1));
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
      /*segment*/
      2) sidebar_changes.currentId =
      /*segment*/
      ctx[1];
      sidebar.$set(sidebar_changes);

      if (default_slot) {
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        2097152)) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[21], !current ? -1 : dirty, null, null);
        }
      }

      if (!
      /*$_isTimelineHidden*/
      ctx[8]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*$_isTimelineHidden*/
          256) {
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
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (dirty &
      /*$_isTimelineHidden*/
      256) {
        toggle_class(div1, "isTimelineHidden",
        /*$_isTimelineHidden*/
        ctx[8]);
      }

      if (!current || dirty &
      /*$_viewsClasses*/
      128 && div2_class_value !== (div2_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[7] + " svelte-dclfdu")) {
        attr_dev(div2, "class", div2_class_value);
      }

      if (dirty &
      /*$_viewsClasses, routeId*/
      136) {
        toggle_class(div2, "routeId",
        /*routeId*/
        ctx[3]);
      }

      if (dirty &
      /*$_viewsClasses, routeIdYear*/
      144) {
        toggle_class(div2, "routeIdYear",
        /*routeIdYear*/
        ctx[4]);
      }

      if (
      /*$_isSmallScreen*/
      ctx[2]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*$_isSmallScreen*/
          4) {
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
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*$_screenClasses*/
      32 && section1_class_value !== (section1_class_value = "time_region_value_layout " +
      /*$_screenClasses*/
      ctx[5] + " svelte-dclfdu")) {
        attr_dev(section1, "class", section1_class_value);
      }

      if (!current || dirty &
      /*$_style*/
      64) {
        attr_dev(section1, "style",
        /*$_style*/
        ctx[6]);
      }

      if (dirty &
      /*$_screenClasses, $_screenClasses*/
      32) {
        toggle_class(section1, "hidden", !
        /*$_screenClasses*/
        ctx[5]);
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
    id: create_if_block_1.name,
    type: "if",
    source: "(66:0) {#if $_screenClasses || isServerSide}",
    ctx: ctx
  });
  return block;
} // (91:4) {#if !$_isTimelineHidden}


function create_if_block_3(ctx) {
  var nav;
  var timeline;
  var nav_resize_listener;
  var current;
  timeline = new Timeline({
    props: {
      availableYears:
      /*$_availableYears*/
      ctx[11],
      height:
      /*$_timelineHeight*/
      ctx[10],
      indicatorId:
      /*segment*/
      ctx[1],
      selectedYear:
      /*$_selectedYear*/
      ctx[12],
      showLess:
      /*$_isSmallScreen*/
      ctx[2],
      width:
      /*$_timelineWidth*/
      ctx[9]
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
      attr_dev(nav, "class", "svelte-dclfdu");
      add_render_callback(function () {
        return (
          /*nav_elementresize_handler*/
          ctx[23].call(nav)
        );
      });
      add_location(nav, file$1, 91, 5, 2789);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      mount_component(timeline, nav, null);
      nav_resize_listener = add_resize_listener(nav,
      /*nav_elementresize_handler*/
      ctx[23].bind(nav));
      current = true;
    },
    p: function update(ctx, dirty) {
      var timeline_changes = {};
      if (dirty &
      /*$_availableYears*/
      2048) timeline_changes.availableYears =
      /*$_availableYears*/
      ctx[11];
      if (dirty &
      /*$_timelineHeight*/
      1024) timeline_changes.height =
      /*$_timelineHeight*/
      ctx[10];
      if (dirty &
      /*segment*/
      2) timeline_changes.indicatorId =
      /*segment*/
      ctx[1];
      if (dirty &
      /*$_selectedYear*/
      4096) timeline_changes.selectedYear =
      /*$_selectedYear*/
      ctx[12];
      if (dirty &
      /*$_isSmallScreen*/
      4) timeline_changes.showLess =
      /*$_isSmallScreen*/
      ctx[2];
      if (dirty &
      /*$_timelineWidth*/
      512) timeline_changes.width =
      /*$_timelineWidth*/
      ctx[9];
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
    id: create_if_block_3.name,
    type: "if",
    source: "(91:4) {#if !$_isTimelineHidden}",
    ctx: ctx
  });
  return block;
} // (108:2) {#if $_isSmallScreen}


function create_if_block_2(ctx) {
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
    id: create_if_block_2.name,
    type: "if",
    source: "(108:2) {#if $_isSmallScreen}",
    ctx: ctx
  });
  return block;
} // (118:0) {#if !$_screenClasses}


function create_if_block(ctx) {
  var loadingview;
  var current;
  loadingview = new LoadingView({
    props: {
      stroke:
      /*$_theme*/
      ctx[13].colorMain
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
      8192) loadingview_changes.stroke =
      /*$_theme*/
      ctx[13].colorMain;
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
    id: create_if_block.name,
    type: "if",
    source: "(118:0) {#if !$_screenClasses}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var screengauge;
  var t0;
  var t1;
  var if_block1_anchor;
  var current;
  screengauge = new ScreenGauge({
    $$inline: true
  });
  var if_block0 = (
  /*$_screenClasses*/
  ctx[5] || isServerSide) && create_if_block_1(ctx);
  var if_block1 = !
  /*$_screenClasses*/
  ctx[5] && create_if_block(ctx);
  var block = {
    c: function create() {
      create_component(screengauge.$$.fragment);
      t0 = space();
      if (if_block0) if_block0.c();
      t1 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
    },
    l: function claim(nodes) {
      claim_component(screengauge.$$.fragment, nodes);
      t0 = claim_space(nodes);
      if (if_block0) if_block0.l(nodes);
      t1 = claim_space(nodes);
      if (if_block1) if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(screengauge, target, anchor);
      insert_dev(target, t0, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert_dev(target, t1, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, if_block1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*$_screenClasses*/
      ctx[5] || isServerSide) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*$_screenClasses*/
          32) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t1.parentNode, t1);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (!
      /*$_screenClasses*/
      ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*$_screenClasses*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(screengauge.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(screengauge.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(screengauge, detaching);
      if (detaching) detach_dev(t0);
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t1);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(if_block1_anchor);
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
      return $$invalidate(19, $_groups = $$value);
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
    return $$invalidate(2, $_isSmallScreen = $$value);
  });
  validate_store(_routes, "_routes");
  component_subscribe($$self, _routes, function ($$value) {
    return $$invalidate(20, $_routes = $$value);
  });
  validate_store(_screenClasses, "_screenClasses");
  component_subscribe($$self, _screenClasses, function ($$value) {
    return $$invalidate(5, $_screenClasses = $$value);
  });
  validate_store(_style, "_style");
  component_subscribe($$self, _style, function ($$value) {
    return $$invalidate(6, $_style = $$value);
  });
  validate_store(_viewsClasses, "_viewsClasses");
  component_subscribe($$self, _viewsClasses, function ($$value) {
    return $$invalidate(7, $_viewsClasses = $$value);
  });
  validate_store(_isTimelineHidden, "_isTimelineHidden");
  component_subscribe($$self, _isTimelineHidden, function ($$value) {
    return $$invalidate(8, $_isTimelineHidden = $$value);
  });
  validate_store(_timelineWidth, "_timelineWidth");
  component_subscribe($$self, _timelineWidth, function ($$value) {
    return $$invalidate(9, $_timelineWidth = $$value);
  });
  validate_store(_timelineHeight, "_timelineHeight");
  component_subscribe($$self, _timelineHeight, function ($$value) {
    return $$invalidate(10, $_timelineHeight = $$value);
  });
  validate_store(_availableYears, "_availableYears");
  component_subscribe($$self, _availableYears, function ($$value) {
    return $$invalidate(11, $_availableYears = $$value);
  });
  validate_store(_selectedYear, "_selectedYear");
  component_subscribe($$self, _selectedYear, function ($$value) {
    return $$invalidate(12, $_selectedYear = $$value);
  });
  validate_store(_theme, "_theme");
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(13, $_theme = $$value);
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
  var _$$props$flags = $$props.flags,
      flags = _$$props$flags === void 0 ? null : _$$props$flags;
  var _$$props$hrefBase = $$props.hrefBase,
      hrefBase = _$$props$hrefBase === void 0 ? "" : _$$props$hrefBase;
  var _$$props$POIs = $$props.POIs,
      POIs = _$$props$POIs === void 0 ? null : _$$props$POIs;
  var _$$props$regionSettin = $$props.regionSettings,
      regionSettings = _$$props$regionSettin === void 0 ? null : _$$props$regionSettin;
  var _$$props$segment = $$props.segment,
      segment = _$$props$segment === void 0 ? null : _$$props$segment;
  var _$$props$theme = $$props.theme,
      theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var writable_props = ["_groups", "flags", "hrefBase", "POIs", "regionSettings", "segment", "theme"];
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
    if ("flags" in $$props) $$invalidate(14, flags = $$props.flags);
    if ("hrefBase" in $$props) $$invalidate(15, hrefBase = $$props.hrefBase);
    if ("POIs" in $$props) $$invalidate(16, POIs = $$props.POIs);
    if ("regionSettings" in $$props) $$invalidate(17, regionSettings = $$props.regionSettings);
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
    if ("theme" in $$props) $$invalidate(18, theme = $$props.theme);
    if ("$$scope" in $$props) $$invalidate(21, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      ScreenGauge: ScreenGauge,
      LoadingView: LoadingView,
      Sidebar: Sidebar,
      Timeline: Timeline,
      ViewSelector: ViewSelector,
      setGroups: setGroups,
      setPOIs: setPOIs,
      _isSmallScreen: _isSmallScreen,
      _screenClasses: _screenClasses,
      _timelineHeight: _timelineHeight,
      _timelineWidth: _timelineWidth,
      _isTimelineHidden: _isTimelineHidden,
      _routes: _routes,
      _views: _views,
      _viewsClasses: _viewsClasses,
      setHrefBase: setHrefBase,
      setNavFlags: setNavFlags,
      showView: showView,
      setRegionSettings: setRegionSettings,
      _availableYears: _availableYears,
      _selectedYear: _selectedYear,
      _style: _style,
      _theme: _theme,
      customizeTheme: customizeTheme,
      isServerSide: isServerSide,
      _groups: _groups,
      flags: flags,
      hrefBase: hrefBase,
      POIs: POIs,
      regionSettings: regionSettings,
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
    if ("flags" in $$props) $$invalidate(14, flags = $$props.flags);
    if ("hrefBase" in $$props) $$invalidate(15, hrefBase = $$props.hrefBase);
    if ("POIs" in $$props) $$invalidate(16, POIs = $$props.POIs);
    if ("regionSettings" in $$props) $$invalidate(17, regionSettings = $$props.regionSettings);
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
    if ("theme" in $$props) $$invalidate(18, theme = $$props.theme);
    if ("routeId" in $$props) $$invalidate(3, routeId = $$props.routeId);
    if ("routeIdYear" in $$props) $$invalidate(4, routeIdYear = $$props.routeIdYear);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*_groups, $_groups*/
    524289) {
      _groups && setGroups($_groups);
    }

    if ($$self.$$.dirty &
    /*flags*/
    16384) {
      flags && setNavFlags(flags);
    }

    if ($$self.$$.dirty &
    /*hrefBase*/
    32768) {
      hrefBase && setHrefBase(hrefBase);
    }

    if ($$self.$$.dirty &
    /*POIs*/
    65536) {
      POIs && setPOIs(POIs);
    }

    if ($$self.$$.dirty &
    /*regionSettings*/
    131072) {
      regionSettings && setRegionSettings(regionSettings);
    }

    if ($$self.$$.dirty &
    /*theme*/
    262144) {
      theme && customizeTheme(theme);
    }

    if ($$self.$$.dirty &
    /*$_isSmallScreen, $_routes*/
    1048580) {
      $$invalidate(3, routeId = $_isSmallScreen && $_routes.Id);
    }

    if ($$self.$$.dirty &
    /*$_isSmallScreen, $_routes*/
    1048580) {
      $$invalidate(4, routeIdYear = $_isSmallScreen && $_routes.IdYear);
    }
  };

  return [_groups, segment, $_isSmallScreen, routeId, routeIdYear, $_screenClasses, $_style, $_viewsClasses, $_isTimelineHidden, $_timelineWidth, $_timelineHeight, $_availableYears, $_selectedYear, $_theme, flags, hrefBase, POIs, regionSettings, theme, $_groups, $_routes, $$scope, slots, nav_elementresize_handler, div1_elementresize_handler];
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
      flags: 14,
      hrefBase: 15,
      POIs: 16,
      regionSettings: 17,
      segment: 1,
      theme: 18
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
    key: "flags",
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
    key: "POIs",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "regionSettings",
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

var POIs = [{
  name: 'Newcastle upon Tyne',
  population: 302820,
  lng: -1.6578,
  lat: 55.0077,
  region: 'UKC: North East (England)'
}, {
  name: 'Lancaster',
  population: 52234,
  lng: -2.801,
  lat: 54.047,
  region: 'UKD: North West (England)',
  isLeft: true
}, {
  name: 'Liverpool',
  population: 498042,
  lng: -2.983333,
  lat: 53.4,
  region: 'UKD: North West (England)',
  isLeft: true,
  isBottom: true
}, {
  name: 'Manchester',
  population: 552858,
  lng: -2.245278,
  lat: 53.479444,
  region: 'UKD: North West (England)',
  isLeft: true,
  isTop: true
}, {
  name: 'Leeds',
  population: 793139,
  lng: -1.549167,
  lat: 53.799722,
  region: 'UKE: Yorkshire and The Humber',
  isLeft: true,
  isTop: true
}, {
  name: 'Sheffield',
  population: 584853,
  lng: -1.466667,
  lat: 53.383333,
  region: 'UKE: Yorkshire and The Humber'
}, {
  name: 'York',
  population: 210618,
  lng: -1.080278,
  lat: 53.958333,
  region: 'UKE: Yorkshire and The Humber'
}, {
  name: 'Leicester',
  population: 329839,
  lng: -1.133333,
  lat: 52.633333,
  region: 'UKF: East Midlands (England)'
}, {
  name: 'Nottingham',
  population: 321500,
  lng: -1.15,
  lat: 52.95,
  region: 'UKF: East Midlands (England)'
}, {
  name: 'Birmingham',
  population: 1141816,
  lng: -1.9025,
  lat: 52.48,
  region: 'UKG: West Midlands (England)',
  isLeft: true
}, {
  name: 'Warwick',
  population: 371521,
  lng: -1.510556,
  lat: 52.408056,
  region: 'UKG: West Midlands (England)'
}, // {
// 	name: 'Norwich',
// 	population: 143135,
// 	lng: 1.297,
// 	lat: 52.63,
// 	region: 'UKH: East of England'
// },
{
  name: 'Cambridge',
  population: 124798,
  lng: 0.119167,
  lat: 52.205278,
  region: 'UKH: East of England',
  isBottom: true
}, {
  name: 'London',
  population: 8961989,
  lng: -0.083333,
  lat: 51.5,
  region: 'UKI: London'
}, {
  name: 'Brighton',
  population: 290885,
  lng: -0.152778,
  lat: 50.827778,
  region: 'UKJ: South East (England)',
  isBottom: true
}, {
  name: 'Oxford',
  population: 154600,
  lng: -1.257778,
  lat: 51.751944,
  region: 'UKJ: South East (England)'
}, {
  name: 'Southampton',
  population: 269781,
  lng: -1.4,
  lat: 50.9,
  region: 'UKJ: South East (England)',
  isLeft: true,
  isTop: true
}, {
  name: 'Bristol',
  population: 463400,
  lng: -2.583333,
  lat: 51.45,
  region: 'UKK: South West (England)'
}, {
  name: 'Exeter',
  population: 131405,
  lng: -3.533333,
  lat: 50.716667,
  region: 'UKK: South West (England)',
  isLeft: true
}, {
  name: 'Cardiff',
  population: 364248,
  lng: -3.183333,
  lat: 51.483333,
  region: 'UKL: Wales',
  isLeft: true,
  isBottom: true
}, {
  name: 'Swansea',
  population: 246466,
  lng: -3.95,
  lat: 51.616667,
  region: 'UKL: Wales',
  isLeft: true,
  isTop: true
}, {
  name: 'Glasgow',
  population: 633120,
  lng: -4.251433,
  lat: 55.860916,
  region: 'UKM: Scotland',
  isLeft: true
}, {
  name: 'Edinburgh',
  population: 488050,
  lng: -3.189,
  lat: 55.953,
  region: 'UKM: Scotland'
}, {
  name: 'Aberdeen',
  population: 196670,
  lng: -2.11,
  lat: 57.15,
  region: 'UKM: Scotland'
}, {
  name: 'Dundee',
  population: 148270,
  lng: -2.9707,
  lat: 56.462,
  region: 'UKM: Scotland'
}, // {
// 	name: 'Inverness',
// 	population: 70000,
// 	lng: -4.223333,
// 	lat: 57.478056,
// 	region: 'UKM: Scotland'
// },
{
  name: 'Belfast',
  population: 341877,
  lng: -5.93,
  lat: 54.596389,
  region: 'UKN: Northern Ireland',
  isLeft: true
}];

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/compounds/time_region_value/_layout.svelte"; // (18:2) <Link    href='/svizzle/compounds/time_region_value'    rel='prefetch'   >

function create_default_slot_1(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("@svizzle/time_region_value");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, "@svizzle/time_region_value");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file, 21, 3, 482);
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
    id: create_default_slot_1.name,
    type: "slot",
    source: "(18:2) <Link    href='/svizzle/compounds/time_region_value'    rel='prefetch'   >",
    ctx: ctx
  });
  return block;
} // (26:2) <Layout    {_groups}    {flags}    {hrefBase}    {POIs}    {regionSettings}    {segment}   >


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
          ctx[2], !current ? -1 : dirty, null, null);
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
    source: "(26:2) <Layout    {_groups}    {flags}    {hrefBase}    {POIs}    {regionSettings}    {segment}   >",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var section;
  var nav;
  var link;
  var t1;
  var main;
  var layout;
  var current;
  link = new Link({
    props: {
      href: "/svizzle/compounds/time_region_value",
      rel: "prefetch",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  layout = new Layout({
    props: {
      _groups: _groups,
      flags: flags,
      hrefBase: hrefBase,
      POIs: POIs,
      regionSettings: regionSettings,
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
      create_component(link.$$.fragment);
      t1 = space();
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
      claim_component(link.$$.fragment, nav_nodes);
      nav_nodes.forEach(detach_dev);
      t1 = claim_space(section_nodes);
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
      attr_dev(nav, "class", "svelte-1fphwp9");
      add_location(nav, file, 16, 1, 396);
      attr_dev(main, "class", "svelte-1fphwp9");
      add_location(main, file, 24, 1, 541);
      attr_dev(section, "class", "svelte-1fphwp9");
      add_location(section, file, 15, 0, 385);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, section, anchor);
      append_dev(section, nav);
      mount_component(link, nav, null);
      append_dev(section, t1);
      append_dev(section, main);
      mount_component(layout, main, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var link_changes = {};

      if (dirty &
      /*$$scope*/
      4) {
        link_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      link.$set(link_changes);
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
      transition_in(link.$$.fragment, local);
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(link.$$.fragment, local);
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(section);
      destroy_component(link);
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
      Link: Link,
      POIs: POIs,
      _groups: _groups,
      flags: flags,
      hrefBase: hrefBase,
      regionSettings: regionSettings,
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
