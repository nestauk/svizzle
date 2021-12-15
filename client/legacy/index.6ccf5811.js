import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as space, g as element, t as text, q as query_selector_all, h as detach_dev, j as claim_space, k as claim_element, l as children, m as claim_text, n as attr_dev, o as src_url_equal, p as add_location, r as insert_hydration_dev, u as append_hydration_dev, v as noop, w as validate_slots } from './client.50a99e71.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/index.svelte";

function create_fragment(ctx) {
  var t0;
  var iframe;
  var t1;
  var iframe_src_value;
  var block = {
    c: function create() {
      t0 = space();
      iframe = element("iframe");
      t1 = text("Loading...");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all('[data-svelte=\"svelte-ai3r08\"]', document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      iframe = claim_element(nodes, "IFRAME", {
        frameborder: true,
        height: true,
        marginheight: true,
        marginwidth: true,
        src: true,
        title: true,
        width: true
      });
      var iframe_nodes = children(iframe);
      t1 = claim_text(iframe_nodes, "Loading...");
      iframe_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Svizzle Tools";
      attr_dev(iframe, "frameborder", "0");
      attr_dev(iframe, "height", "100%");
      attr_dev(iframe, "marginheight", "0");
      attr_dev(iframe, "marginwidth", "0");
      if (!src_url_equal(iframe.src, iframe_src_value = "jsDocBuild/")) attr_dev(iframe, "src", iframe_src_value);
      attr_dev(iframe, "title", "jsdoc");
      attr_dev(iframe, "width", "100%");
      add_location(iframe, file, 4, 0, 60);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, iframe, anchor);
      append_hydration_dev(iframe, t1);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(iframe);
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
  validate_slots('Routes', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Routes;
}(SvelteComponentDev);

export { Routes as default };
