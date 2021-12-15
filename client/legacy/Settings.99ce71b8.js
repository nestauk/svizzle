import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, w as validate_slots, O as svg_element, P as claim_svg_element, l as children, h as detach_dev, n as attr_dev, p as add_location, r as insert_hydration_dev, v as noop } from './client.50a99e71.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/ui/src/icons/feather/Settings.svelte";

function create_fragment(ctx) {
  var circle;
  var path;
  var block = {
    c: function create() {
      circle = svg_element("circle");
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
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "3");
      add_location(circle, file, 1, 0, 34);
      attr_dev(path, "d", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z");
      add_location(path, file, 1, 39, 73);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, path, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(path);
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
  validate_slots('Settings', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Settings> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var Settings = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Settings, _SvelteComponentDev);

  var _super = _createSuper(Settings);

  function Settings(options) {
    var _this;

    _classCallCheck(this, Settings);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Settings",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Settings;
}(SvelteComponentDev);

var Settings$1 = Settings;

export { Settings$1 as S };
