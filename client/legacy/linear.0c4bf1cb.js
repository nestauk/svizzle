import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, w as validate_slots, O as svg_element, P as claim_svg_element, l as children, h as detach_dev, n as attr_dev, p as add_location, r as insert_hydration_dev, v as noop, x as _createClass, z as create_slot, Q as Icon, R as _defineProperty, g as element, I as create_component, k as claim_element, J as claim_component, K as mount_component, A as transition_in, B as transition_out, L as destroy_component, f as space, j as claim_space, N as toggle_class, u as append_hydration_dev, E as _slicedToArray, F as update_slot_base, G as get_all_dirty_from_scope, H as get_slot_changes, M as group_outros, C as check_outros, T as _typeof } from './client.50a99e71.js';
import { e as exponent, f as formatSpecifier, a as formatPrefix, b as format } from './defaultLocale.3f1280a0.js';

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "../../components/ui/src/icons/feather/ExternalLink.svelte";

function create_fragment$1(ctx) {
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
      attr_dev(path, "d", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6");
      add_location(path, file$1, 1, 0, 34);
      attr_dev(polyline, "points", "15 3 21 3 21 9");
      add_location(polyline, file$1, 1, 74, 108);
      attr_dev(line, "x1", "10");
      attr_dev(line, "y1", "14");
      attr_dev(line, "x2", "21");
      attr_dev(line, "y2", "3");
      add_location(line, file$1, 1, 119, 153);
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
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('ExternalLink', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ExternalLink> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}

var ExternalLink = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ExternalLink, _SvelteComponentDev);

  var _super = _createSuper$1(ExternalLink);

  function ExternalLink(options) {
    var _this;

    _classCallCheck(this, ExternalLink);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ExternalLink",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  return ExternalLink;
}(SvelteComponentDev);

var ExternalLink$1 = ExternalLink;

var defaultRel = 'noopener';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file = "../../components/ui/src/Link.svelte"; // (56:1) {#if isExternal && showIcon}

function create_if_block(ctx) {
  var span;
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: ExternalLink$1,
      size:
      /*iconSize*/
      ctx[3],
      stroke:
      /*theme*/
      ctx[9].iconStroke,
      strokeWidth:
      /*theme*/
      ctx[9].iconStrokeWidth
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      span = element("span");
      create_component(icon.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      claim_component(icon.$$.fragment, span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-rt948z");
      add_location(span, file, 56, 2, 1427);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      mount_component(icon, span, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty &
      /*iconSize*/
      8) icon_changes.size =
      /*iconSize*/
      ctx[3];
      if (dirty &
      /*theme*/
      512) icon_changes.stroke =
      /*theme*/
      ctx[9].iconStroke;
      if (dirty &
      /*theme*/
      512) icon_changes.strokeWidth =
      /*theme*/
      ctx[9].iconStrokeWidth;
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
      if (detaching) detach_dev(span);
      destroy_component(icon);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(56:1) {#if isExternal && showIcon}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var a;
  var span;
  var t;
  var a_download_value;
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[14].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[13], null);
  var if_block =
  /*isExternal*/
  ctx[12] &&
  /*showIcon*/
  ctx[7] && create_if_block(ctx);
  var block = {
    c: function create() {
      a = element("a");
      span = element("span");
      if (default_slot) default_slot.c();
      t = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        download: true,
        href: true,
        hreflang: true,
        rel: true,
        style: true,
        target: true,
        type: true,
        class: true
      });
      var a_nodes = children(a);
      span = claim_element(a_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      t = claim_space(a_nodes);
      if (if_block) if_block.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-rt948z");
      toggle_class(span, "bold",
      /*isBold*/
      ctx[4]);
      add_location(span, file, 52, 1, 1349);
      attr_dev(a, "download", a_download_value =
      /*download*/
      ctx[0] ? '' : null);
      attr_dev(a, "href",
      /*href*/
      ctx[1]);
      attr_dev(a, "hreflang",
      /*hreflang*/
      ctx[2]);
      attr_dev(a, "rel",
      /*rel*/
      ctx[6]);
      attr_dev(a, "style",
      /*style*/
      ctx[11]);
      attr_dev(a, "target",
      /*target*/
      ctx[8]);
      attr_dev(a, "type",
      /*type*/
      ctx[10]);
      attr_dev(a, "class", "svelte-rt948z");
      toggle_class(a, "underlined",
      /*isUnderlined*/
      ctx[5]);
      add_location(a, file, 42, 0, 1223);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, a, anchor);
      append_hydration_dev(a, span);

      if (default_slot) {
        default_slot.m(span, null);
      }

      append_hydration_dev(a, t);
      if (if_block) if_block.m(a, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        8192)) {
          update_slot_base(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[13], !current ? get_all_dirty_from_scope(
          /*$$scope*/
          ctx[13]) : get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[13], dirty, null), null);
        }
      }

      if (dirty &
      /*isBold*/
      16) {
        toggle_class(span, "bold",
        /*isBold*/
        ctx[4]);
      }

      if (
      /*isExternal*/
      ctx[12] &&
      /*showIcon*/
      ctx[7]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*isExternal, showIcon*/
          4224) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(a, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*download*/
      1 && a_download_value !== (a_download_value =
      /*download*/
      ctx[0] ? '' : null)) {
        attr_dev(a, "download", a_download_value);
      }

      if (!current || dirty &
      /*href*/
      2) {
        attr_dev(a, "href",
        /*href*/
        ctx[1]);
      }

      if (!current || dirty &
      /*hreflang*/
      4) {
        attr_dev(a, "hreflang",
        /*hreflang*/
        ctx[2]);
      }

      if (!current || dirty &
      /*rel*/
      64) {
        attr_dev(a, "rel",
        /*rel*/
        ctx[6]);
      }

      if (!current || dirty &
      /*style*/
      2048) {
        attr_dev(a, "style",
        /*style*/
        ctx[11]);
      }

      if (!current || dirty &
      /*target*/
      256) {
        attr_dev(a, "target",
        /*target*/
        ctx[8]);
      }

      if (!current || dirty &
      /*type*/
      1024) {
        attr_dev(a, "type",
        /*type*/
        ctx[10]);
      }

      if (dirty &
      /*isUnderlined*/
      32) {
        toggle_class(a, "underlined",
        /*isUnderlined*/
        ctx[5]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      if (if_block) if_block.d();
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

var defaultIconSize = 14;

function instance($$self, $$props, $$invalidate) {
  var isExternal;
  var style;
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('Link', slots, ['default']);
  var defaultStrokeWidth = Icon.defaultStrokeWidth;
  var defaultTheme = {
    iconStroke: 'rgb(16, 174, 249)',
    iconStrokeWidth: defaultStrokeWidth,
    color: 'black'
  };
  var _$$props$download = $$props.download,
      download = _$$props$download === void 0 ? null : _$$props$download;
  var _$$props$href = $$props.href,
      href = _$$props$href === void 0 ? null : _$$props$href;
  var _$$props$hreflang = $$props.hreflang,
      hreflang = _$$props$hreflang === void 0 ? null : _$$props$hreflang;
  var _$$props$iconSize = $$props.iconSize,
      iconSize = _$$props$iconSize === void 0 ? defaultIconSize : _$$props$iconSize;
  var _$$props$isBold = $$props.isBold,
      isBold = _$$props$isBold === void 0 ? false : _$$props$isBold;
  var _$$props$isUnderlined = $$props.isUnderlined,
      isUnderlined = _$$props$isUnderlined === void 0 ? false : _$$props$isUnderlined;
  var _$$props$rel = $$props.rel,
      rel = _$$props$rel === void 0 ? defaultRel : _$$props$rel;
  var _$$props$showIcon = $$props.showIcon,
      showIcon = _$$props$showIcon === void 0 ? true : _$$props$showIcon;
  var _$$props$target = $$props.target,
      target = _$$props$target === void 0 ? null : _$$props$target;
  var _$$props$theme = $$props.theme,
      theme = _$$props$theme === void 0 ? null : _$$props$theme;
  var _$$props$type = $$props.type,
      type = _$$props$type === void 0 ? null : _$$props$type;
  var writable_props = ['download', 'href', 'hreflang', 'iconSize', 'isBold', 'isUnderlined', 'rel', 'showIcon', 'target', 'theme', 'type'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Link> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ('download' in $$props) $$invalidate(0, download = $$props.download);
    if ('href' in $$props) $$invalidate(1, href = $$props.href);
    if ('hreflang' in $$props) $$invalidate(2, hreflang = $$props.hreflang);
    if ('iconSize' in $$props) $$invalidate(3, iconSize = $$props.iconSize);
    if ('isBold' in $$props) $$invalidate(4, isBold = $$props.isBold);
    if ('isUnderlined' in $$props) $$invalidate(5, isUnderlined = $$props.isUnderlined);
    if ('rel' in $$props) $$invalidate(6, rel = $$props.rel);
    if ('showIcon' in $$props) $$invalidate(7, showIcon = $$props.showIcon);
    if ('target' in $$props) $$invalidate(8, target = $$props.target);
    if ('theme' in $$props) $$invalidate(9, theme = $$props.theme);
    if ('type' in $$props) $$invalidate(10, type = $$props.type);
    if ('$$scope' in $$props) $$invalidate(13, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      ExternalLink: ExternalLink$1,
      Icon: Icon,
      defaultRel: defaultRel,
      defaultIconSize: defaultIconSize,
      defaultStrokeWidth: defaultStrokeWidth,
      defaultTheme: defaultTheme,
      download: download,
      href: href,
      hreflang: hreflang,
      iconSize: iconSize,
      isBold: isBold,
      isUnderlined: isUnderlined,
      rel: rel,
      showIcon: showIcon,
      target: target,
      theme: theme,
      type: type,
      style: style,
      isExternal: isExternal
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('download' in $$props) $$invalidate(0, download = $$props.download);
    if ('href' in $$props) $$invalidate(1, href = $$props.href);
    if ('hreflang' in $$props) $$invalidate(2, hreflang = $$props.hreflang);
    if ('iconSize' in $$props) $$invalidate(3, iconSize = $$props.iconSize);
    if ('isBold' in $$props) $$invalidate(4, isBold = $$props.isBold);
    if ('isUnderlined' in $$props) $$invalidate(5, isUnderlined = $$props.isUnderlined);
    if ('rel' in $$props) $$invalidate(6, rel = $$props.rel);
    if ('showIcon' in $$props) $$invalidate(7, showIcon = $$props.showIcon);
    if ('target' in $$props) $$invalidate(8, target = $$props.target);
    if ('theme' in $$props) $$invalidate(9, theme = $$props.theme);
    if ('type' in $$props) $$invalidate(10, type = $$props.type);
    if ('style' in $$props) $$invalidate(11, style = $$props.style);
    if ('isExternal' in $$props) $$invalidate(12, isExternal = $$props.isExternal);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*download*/
    1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, download = download || null);
    }

    if ($$self.$$.dirty &
    /*href*/
    2) {
      $$invalidate(1, href = href || null);
    }

    if ($$self.$$.dirty &
    /*hreflang*/
    4) {
      $$invalidate(2, hreflang = hreflang || null);
    }

    if ($$self.$$.dirty &
    /*iconSize*/
    8) {
      $$invalidate(3, iconSize = iconSize || defaultIconSize);
    }

    if ($$self.$$.dirty &
    /*isBold*/
    16) {
      $$invalidate(4, isBold = isBold || false);
    }

    if ($$self.$$.dirty &
    /*isUnderlined*/
    32) {
      $$invalidate(5, isUnderlined = isUnderlined || false);
    }

    if ($$self.$$.dirty &
    /*rel*/
    64) {
      $$invalidate(6, rel = rel || defaultRel);
    }

    if ($$self.$$.dirty &
    /*showIcon*/
    128) {
      $$invalidate(7, showIcon = showIcon || true);
    }

    if ($$self.$$.dirty &
    /*target*/
    256) {
      $$invalidate(8, target = target || null);
    }

    if ($$self.$$.dirty &
    /*type*/
    1024) {
      $$invalidate(10, type = type || null);
    }

    if ($$self.$$.dirty &
    /*type*/
    1024) {
      $$invalidate(12, isExternal = type === 'external');
    }

    if ($$self.$$.dirty &
    /*theme*/
    512) {
      $$invalidate(9, theme = theme ? _objectSpread(_objectSpread({}, defaultTheme), theme) : defaultTheme);
    }

    if ($$self.$$.dirty &
    /*theme*/
    512) {
      $$invalidate(11, style = theme.color ? "--color: ".concat(theme.color) : null);
    }
  };

  return [download, href, hreflang, iconSize, isBold, isUnderlined, rel, showIcon, target, theme, type, style, isExternal, $$scope, slots];
}

var Link = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Link, _SvelteComponentDev);

  var _super = _createSuper(Link);

  function Link(options) {
    var _this;

    _classCallCheck(this, Link);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      download: 0,
      href: 1,
      hreflang: 2,
      iconSize: 3,
      isBold: 4,
      isUnderlined: 5,
      rel: 6,
      showIcon: 7,
      target: 8,
      theme: 9,
      type: 10
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Link",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(Link, [{
    key: "download",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hreflang",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconSize",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isBold",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isUnderlined",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "rel",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "showIcon",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "target",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "theme",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "type",
    get: function get() {
      throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Link;
}(SvelteComponentDev);

var Link$1 = Link;

function ascending (a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector (f) {
  var delta = f;
  var compare = f;

  if (f.length === 1) {
    delta = function delta(d, x) {
      return f(d) - x;
    };

    compare = ascendingComparator(f);
  }

  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
    }

    return lo;
  }

  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
    }

    return lo;
  }

  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    var i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {
    left: left,
    center: center,
    right: right
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return ascending(f(d), x);
  };
}

function number$1 (x) {
  return x === null ? NaN : +x;
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
bisector(number$1).center;
var bisect = bisectRight;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);
function ticks (start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    var r0 = Math.round(start / step),
        r1 = Math.round(stop / step);
    if (r0 * step < start) ++r0;
    if (r1 * step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);

    while (++i < n) {
      ticks[i] = (r0 + i) * step;
    }
  } else {
    step = -step;

    var _r = Math.round(start * step),
        _r2 = Math.round(stop * step);

    if (_r / step < start) ++_r;
    if (_r2 / step > stop) --_r2;
    ticks = new Array(n = _r2 - _r + 1);

    while (++i < n) {
      ticks[i] = (_r + i) / step;
    }
  }

  if (reverse) ticks.reverse();
  return ticks;
}
function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;

    case 1:
      this.range(domain);
      break;

    default:
      this.range(range).domain(domain);
      break;
  }

  return this;
}

function define (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) {
    prototype[key] = definition[key];
  }

  return prototype;
}

function Color() {}
var _darker = 0.7;

var _brighter = 1 / _darker;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
define(Color, color, {
  copy: function copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb$1, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  displayable: function displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function formatHsl() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
      t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis$1 (values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

var constant = (function (x) {
  return function () {
    return x;
  };
});

function linear$1(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
}

var rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;
  return rgb;
})(1);

function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;

    for (i = 0; i < n; ++i) {
      color = rgb$1(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }

    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);

function numberArray (a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function (t) {
    for (i = 0; i < n; ++i) {
      c[i] = a[i] * (1 - t) + b[i] * t;
    }

    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) {
    x[i] = interpolate(a[i], b[i]);
  }

  for (; i < nb; ++i) {
    c[i] = b[i];
  }

  return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }

    return c;
  };
}

function date (a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber (a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}

function object (a, b) {
  var i = {},
      c = {},
      k;
  if (a === null || _typeof(a) !== "object") a = {};
  if (b === null || _typeof(b) !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) {
      c[k] = i[k](t);
    }

    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

function string (a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators
  // Coerce inputs to strings.

  a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: interpolateNumber(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) {
      s[(o = q[i]).i] = o.x(t);
    }

    return s.join("");
  });
}

function interpolate (a, b) {
  var t = _typeof(b),
      c;

  return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}

function interpolateRound (a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function constants(x) {
  return function () {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];
function identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
} // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


function bimap(domain, range, interpolate) {
  var d0 = domain[0],
      d1 = domain[1],
      r0 = range[0],
      r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function (x) {
    return r0(d0(x));
  };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1; // Reverse descending domains.

  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function (x) {
    var i = bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function (_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
  };

  scale.interpolate = function (_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity, identity);
}

function precisionFixed (step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix (step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound (step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);

  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }

    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }

    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }

  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function (count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);

      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }

      prestep = step;
    }

    return scale;
  };

  return scale;
}
function linear() {
  var scale = continuous();

  scale.copy = function () {
    return copy(scale, linear());
  };

  initRange.apply(scale, arguments);
  return linearish(scale);
}

export { ExternalLink$1 as E, Link$1 as L, ticks as a, linearish as b, copy as c, defaultRel as d, bisect as e, hsl as h, initRange as i, linear as l, rgbBasis as r, transformer as t };
