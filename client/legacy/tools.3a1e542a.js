import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, v as validate_slots, f as space, g as element, t as text, q as query_selector_all, h as detach_dev, j as claim_space, k as claim_element, l as children, m as claim_text, y as attr_dev, n as add_location, o as insert_dev, p as append_dev, r as noop } from './client.17f07262.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/tools.svelte";

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
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1fv7iqp\"]", document.head);
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
      document.title = "Tools";
      attr_dev(iframe, "frameborder", "0");
      attr_dev(iframe, "height", "100%");
      attr_dev(iframe, "marginheight", "0");
      attr_dev(iframe, "marginwidth", "0");
      if (iframe.src !== (iframe_src_value = "/svizzle/tools/jsDocBuild/")) attr_dev(iframe, "src", iframe_src_value);
      attr_dev(iframe, "title", "tools");
      attr_dev(iframe, "width", "100%");
      add_location(iframe, file, 4, 0, 52);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, iframe, anchor);
      append_dev(iframe, t1);
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
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Tools> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Tools", $$slots, []);
  return [];
}

var Tools = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Tools, _SvelteComponentDev);

  var _super = _createSuper(Tools);

  function Tools(options) {
    var _this;

    _classCallCheck(this, Tools);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Tools",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Tools;
}(SvelteComponentDev);

export default Tools;
