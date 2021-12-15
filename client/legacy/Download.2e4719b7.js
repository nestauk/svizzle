import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, w as validate_slots, O as svg_element, P as claim_svg_element, l as children, h as detach_dev, n as attr_dev, p as add_location, r as insert_hydration_dev, v as noop } from './client.50a99e71.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/ui/src/icons/feather/Download.svelte";

function create_fragment(ctx) {
  var path;
  var polyline;
  var line;
  var block = {
    c: function create() {
      path = svg_element("path");
      polyline = svg_element("polyline");
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_svg_element(nodes, "path", {
        d: true
      });
      children(path).forEach(detach_dev);
      polyline = claim_svg_element(nodes, "polyline", {
        points: true
      });
      children(polyline).forEach(detach_dev);
      line = claim_svg_element(nodes, "line", {
        x1: true,
        y1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
      add_location(path, file, 1, 0, 34);
      attr_dev(polyline, "points", "7 10 12 15 17 10");
      add_location(polyline, file, 1, 59, 93);
      attr_dev(line, "x1", "12");
      attr_dev(line, "y1", "15");
      attr_dev(line, "x2", "12");
      attr_dev(line, "y2", "3");
      add_location(line, file, 1, 106, 140);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, path, anchor);
      insert_hydration_dev(target, polyline, anchor);
      insert_hydration_dev(target, line, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
      if (detaching) detach_dev(polyline);
      if (detaching) detach_dev(line);
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
  validate_slots('Download', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Download> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var Download = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Download, _SvelteComponentDev);

  var _super = _createSuper(Download);

  function Download(options) {
    var _this;

    _classCallCheck(this, Download);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Download",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Download;
}(SvelteComponentDev);

var Download$1 = Download;

export { Download$1 as D };
