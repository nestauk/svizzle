import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, u as _createClass, S as SvelteComponentDev, w as validate_each_argument, x as create_slot, v as validate_slots, g as element, t as text, f as space, k as claim_element, l as children, m as claim_text, h as detach_dev, j as claim_space, y as attr_dev, n as add_location, o as insert_dev, p as append_dev, z as set_data_dev, A as destroy_each, B as _slicedToArray, C as update_slot, D as transition_in, E as transition_out, F as toggle_class } from './client.17f07262.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/components/_layout.svelte";

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i].slug;
  child_ctx[9] = list[i].title;
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i].key;
  child_ctx[5] = list[i].value;
  return child_ctx;
} // (19:3) {#each value as {slug, title}}


function create_each_block_1(ctx) {
  var a;
  var p;
  var t_value =
  /*title*/
  ctx[9] + "";
  var t;
  var a_href_value;
  var block = {
    c: function create() {
      a = element("a");
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
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
      attr_dev(p, "class", "svelte-1hc583x");
      toggle_class(p, "selected",
      /*slug*/
      ctx[8] ===
      /*segment*/
      ctx[1]);
      add_location(p, file, 20, 4, 426);
      attr_dev(a, "href", a_href_value = "components/" +
      /*slug*/
      ctx[8]);
      attr_dev(a, "class", "svelte-1hc583x");
      add_location(a, file, 19, 3, 393);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, p);
      append_dev(p, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*groups*/
      1 && t_value !== (t_value =
      /*title*/
      ctx[9] + "")) set_data_dev(t, t_value);

      if (dirty &
      /*groups, segment*/
      3) {
        toggle_class(p, "selected",
        /*slug*/
        ctx[8] ===
        /*segment*/
        ctx[1]);
      }

      if (dirty &
      /*groups*/
      1 && a_href_value !== (a_href_value = "components/" +
      /*slug*/
      ctx[8])) {
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
    source: "(19:3) {#each value as {slug, title}}",
    ctx: ctx
  });
  return block;
} // (16:2) {#each groups as {key, value}}


function create_each_block(ctx) {
  var div;
  var h2;
  var t0_value =
  /*key*/
  ctx[4] + "";
  var t0;
  var t1;
  var t2;
  var each_value_1 =
  /*value*/
  ctx[5];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
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
      attr_dev(h2, "class", "svelte-1hc583x");
      add_location(h2, file, 17, 3, 341);
      attr_dev(div, "class", "distancer");
      add_location(div, file, 16, 2, 314);
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
      /*groups*/
      1 && t0_value !== (t0_value =
      /*key*/
      ctx[4] + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*groups, segment*/
      3) {
        each_value_1 =
        /*value*/
        ctx[5];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

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
    id: create_each_block.name,
    type: "each",
    source: "(16:2) {#each groups as {key, value}}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var section;
  var nav;
  var t;
  var main;
  var current;
  var each_value =
  /*groups*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var default_slot_template =
  /*$$slots*/
  ctx[3].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  var block = {
    c: function create() {
      section = element("section");
      nav = element("nav");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      t = space();
      main = element("main");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        class: true
      });
      var section_nodes = children(section);
      nav = claim_element(section_nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nav_nodes);
      }

      nav_nodes.forEach(detach_dev);
      t = claim_space(section_nodes);
      main = claim_element(section_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(nav, "class", "svelte-1hc583x");
      add_location(nav, file, 14, 1, 273);
      attr_dev(main, "class", "svelte-1hc583x");
      add_location(main, file, 28, 1, 535);
      attr_dev(section, "class", "svelte-1hc583x");
      add_location(section, file, 13, 0, 262);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, nav);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(nav, null);
      }

      append_dev(section, t);
      append_dev(section, main);

      if (default_slot) {
        default_slot.m(main, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*groups, segment*/
      3) {
        each_value =
        /*groups*/
        ctx[0];
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(nav, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4) {
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
      if (detaching) detach_dev(section);
      destroy_each(each_blocks, detaching);
      if (default_slot) default_slot.d(detaching);
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

function preload() {
  return this.fetch("components/groups.json").then(function (r) {
    return r.json();
  }).then(function (groups) {
    return {
      groups: groups
    };
  });
}

function instance($$self, $$props, $$invalidate) {
  var groups = $$props.groups;
  var segment = $$props.segment; // 'BarchartV-defaultColor'

  var writable_props = ["groups", "segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", $$slots, ['default']);

  $$self.$set = function ($$props) {
    if ("groups" in $$props) $$invalidate(0, groups = $$props.groups);
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      groups: groups,
      segment: segment
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("groups" in $$props) $$invalidate(0, groups = $$props.groups);
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [groups, segment, $$scope, $$slots];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      groups: 0,
      segment: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*groups*/
    ctx[0] === undefined && !("groups" in props)) {
      console.warn("<Layout> was created without expected prop 'groups'");
    }

    if (
    /*segment*/
    ctx[1] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Layout, [{
    key: "groups",
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
  }]);

  return Layout;
}(SvelteComponentDev);

export default Layout;
export { preload };
