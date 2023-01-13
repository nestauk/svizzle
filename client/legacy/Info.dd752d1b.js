import { _ as _inherits, a as _classCallCheck, i as init, s as safe_not_equal, b as _assertThisInitialized, d as dispatch_dev, c as _createClass, S as SvelteComponentDev, e as _getPrototypeOf, f as _possibleConstructorReturn, x as validate_slots, O as svg_element, P as claim_svg_element, n as children, k as detach_dev, p as attr_dev, r as add_location, u as insert_hydration_dev, w as noop } from './client.a726f8ff.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/ui/src/icons/feather/Info.svelte";
function create_fragment(ctx) {
  var circle;
  var line0;
  var line1;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      line0 = svg_element("line");
      line1 = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true
      });
      children(circle).forEach(detach_dev);
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
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", "12");
      attr_dev(circle, "cy", "12");
      attr_dev(circle, "r", "10");
      add_location(circle, file, 1, 0, 34);
      attr_dev(line0, "x1", "12");
      attr_dev(line0, "y1", "16");
      attr_dev(line0, "x2", "12");
      attr_dev(line0, "y2", "12");
      add_location(line0, file, 1, 40, 74);
      attr_dev(line1, "x1", "12");
      attr_dev(line1, "y1", "8");
      attr_dev(line1, "x2", "12.01");
      attr_dev(line1, "y2", "8");
      add_location(line1, file, 1, 85, 119);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
      insert_hydration_dev(target, line0, anchor);
      insert_hydration_dev(target, line1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
      if (detaching) detach_dev(line0);
      if (detaching) detach_dev(line1);
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
  validate_slots('Info', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Info> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
var Info = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Info, _SvelteComponentDev);
  var _super = _createSuper(Info);
  function Info(options) {
    var _this;
    _classCallCheck(this, Info);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Info",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }
  return _createClass(Info);
}(SvelteComponentDev);
var Info$1 = Info;

export { Info$1 as I };
