import { _ as _inherits, a as _classCallCheck, i as init, b as _assertThisInitialized, d as dispatch_dev, c as _createClass, S as SvelteComponentDev, e as _getPrototypeOf, f as _possibleConstructorReturn, y as validate_each_argument, s as safe_not_equal, g as space, h as element, t as text, j as head_selector, k as detach_dev, l as claim_space, m as claim_element, n as children, o as claim_text, r as add_location, p as attr_dev, u as insert_hydration_dev, v as append_hydration_dev, A as _slicedToArray, w as noop, H as destroy_each, x as validate_slots, af as set_data_dev } from './client.a726f8ff.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/components/index.svelte";
function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}

// (23:1) {#each components as component}
function create_each_block(ctx) {
  var li;
  var a;
  var t0_value = /*component*/ctx[1].name + "";
  var t0;
  var a_href_value;
  var t1;
  var block = {
    c: function create() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", {
        href: true,
        rel: true
      });
      var a_nodes = children(a);
      t0 = claim_text(a_nodes, t0_value);
      a_nodes.forEach(detach_dev);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", a_href_value = "components/" + /*component*/ctx[1].slug);
      attr_dev(a, "rel", "prefetch");
      add_location(a, file, 24, 3, 423);
      add_location(li, file, 23, 2, 415);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, a);
      append_hydration_dev(a, t0);
      append_hydration_dev(li, t1);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*components*/1 && t0_value !== (t0_value = /*component*/ctx[1].name + "")) set_data_dev(t0, t0_value);
      if (dirty & /*components*/1 && a_href_value !== (a_href_value = "components/" + /*component*/ctx[1].slug)) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(23:1) {#each components as component}",
    ctx: ctx
  });
  return block;
}
function create_fragment(ctx) {
  var t0;
  var h1;
  var t1;
  var t2;
  var ul;
  var each_value = /*components*/ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Components");
      t2 = space();
      ul = element("ul");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = head_selector('svelte-1n0ejc1', document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Components");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Svizzle Components";
      add_location(h1, file, 19, 0, 354);
      attr_dev(ul, "class", "svelte-1rd5d3v");
      add_location(ul, file, 21, 0, 375);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, h1, anchor);
      append_hydration_dev(h1, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (dirty & /*components*/1) {
        each_value = /*components*/ctx[0];
        validate_each_argument(each_value);
        var _i4;
        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(ul, null);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
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
function preload(_ref3) {
  _ref3.params;
    _ref3.query;
  return this.fetch('components.json').then(function (r) {
    return r.json();
  }).then(function (components) {
    return {
      components: components
    };
  });
}
function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Components', slots, []);
  var components = $$props.components;
  $$self.$$.on_mount.push(function () {
    if (components === undefined && !('components' in $$props || $$self.$$.bound[$$self.$$.props['components']])) {
      console.warn("<Components> was created without expected prop 'components'");
    }
  });
  var writable_props = ['components'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Components> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('components' in $$props) $$invalidate(0, components = $$props.components);
  };
  $$self.$capture_state = function () {
    return {
      preload: preload,
      components: components
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('components' in $$props) $$invalidate(0, components = $$props.components);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [components];
}
var Components = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Components, _SvelteComponentDev);
  var _super = _createSuper(Components);
  function Components(options) {
    var _this;
    _classCallCheck(this, Components);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      components: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Components",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }
  _createClass(Components, [{
    key: "components",
    get: function get() {
      throw new Error("<Components>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Components>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Components;
}(SvelteComponentDev);

export { Components as default, preload };
