import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, x as _createClass, S as SvelteComponentDev, y as validate_each_argument, ak as validate_store, al as component_subscribe, w as validate_slots, ax as subscribe, bx as onMount, aH as isServerSide, aM as _, bq as identity, g as element, t as text, f as space, k as claim_element, l as children, m as claim_text, h as detach_dev, j as claim_space, p as add_location, n as attr_dev, r as insert_hydration_dev, u as append_hydration_dev, a8 as set_data_dev, ah as add_render_callback, ai as add_resize_listener, E as _slicedToArray, v as noop, D as destroy_each, O as svg_element, ab as empty, P as claim_svg_element, I as create_component, J as claim_component, K as mount_component, A as transition_in, B as transition_out, L as destroy_component } from './client.50a99e71.js';
import { e as _isSmallScreen, a as _timelineLayout, _ as _hrefBase, r as setRoute, n as showView, t as resetSelectedYear, c as shortenYear, o as _groups, u as _yearRange } from './stores.8e11225e.js';
import { m as makeURL, h as hrefBase } from './_config.337661bb.js';
import './yootils.es.ac6ee4e8.js';
import './defaultLocale.3f1280a0.js';

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/time_region_value/src/routes/index.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i].description;
  child_ctx[13] = list[i].indicators;
  child_ctx[14] = list[i].label;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[17] = list[i].availableYears;
  child_ctx[18] = list[i].title;
  child_ctx[19] = list[i].schema;
  child_ctx[20] = list[i].year_extent;
  child_ctx[22] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
} // (56:5) {#if width || isServerSide}


function create_if_block(ctx) {
  var svg;
  var each0_anchor;
  var svg_height_value;
  var each_value_3 =
  /*$_yearRange*/
  ctx[7];
  validate_each_argument(each_value_3);
  var each_blocks_1 = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var each_value_1 =
  /*indicators*/
  ctx[13];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var _i = 0; _i < each_value_1.length; _i += 1) {
    each_blocks[_i] = create_each_block_1(get_each_context_1(ctx, each_value_1, _i));
  }

  var block = {
    c: function create() {
      svg = svg_element("svg");

      for (var _i2 = 0; _i2 < each_blocks_1.length; _i2 += 1) {
        each_blocks_1[_i2].c();
      }

      each0_anchor = empty();

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        width: true,
        height: true,
        class: true
      });
      var svg_nodes = children(svg);

      for (var _i4 = 0; _i4 < each_blocks_1.length; _i4 += 1) {
        each_blocks_1[_i4].l(svg_nodes);
      }

      each0_anchor = empty();

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].l(svg_nodes);
      }

      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width",
      /*width*/
      ctx[3]);
      attr_dev(svg, "height", svg_height_value = 4 * gap +
      /*layout*/
      ctx[2].fontSize +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length);
      attr_dev(svg, "class", "svelte-yz4j7q");
      add_location(svg, file, 56, 6, 1147);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, svg, anchor);

      for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
        each_blocks_1[_i6].m(svg, null);
      }

      append_hydration_dev(svg, each0_anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(svg, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*layout, $_yearRange, gap, vStep, $_groups, shortenYearFn*/
      244) {
        each_value_3 =
        /*$_yearRange*/
        ctx[7];
        validate_each_argument(each_value_3);

        var _i8;

        for (_i8 = 0; _i8 < each_value_3.length; _i8 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i8);

          if (each_blocks_1[_i8]) {
            each_blocks_1[_i8].p(child_ctx, dirty);
          } else {
            each_blocks_1[_i8] = create_each_block_3(child_ctx);

            each_blocks_1[_i8].c();

            each_blocks_1[_i8].m(svg, each0_anchor);
          }
        }

        for (; _i8 < each_blocks_1.length; _i8 += 1) {
          each_blocks_1[_i8].d(1);
        }

        each_blocks_1.length = each_value_3.length;
      }

      if (dirty &
      /*vStep, $_groups, makeURL, $_hrefBase, layout, gap*/
      356) {
        each_value_1 =
        /*indicators*/
        ctx[13];
        validate_each_argument(each_value_1);

        var _i9;

        for (_i9 = 0; _i9 < each_value_1.length; _i9 += 1) {
          var _child_ctx = get_each_context_1(ctx, each_value_1, _i9);

          if (each_blocks[_i9]) {
            each_blocks[_i9].p(_child_ctx, dirty);
          } else {
            each_blocks[_i9] = create_each_block_1(_child_ctx);

            each_blocks[_i9].c();

            each_blocks[_i9].m(svg, null);
          }
        }

        for (; _i9 < each_blocks.length; _i9 += 1) {
          each_blocks[_i9].d(1);
        }

        each_blocks.length = each_value_1.length;
      }

      if (dirty &
      /*width*/
      8) {
        attr_dev(svg, "width",
        /*width*/
        ctx[3]);
      }

      if (dirty &
      /*layout, vStep, $_groups*/
      100 && svg_height_value !== (svg_height_value = 4 * gap +
      /*layout*/
      ctx[2].fontSize +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length)) {
        attr_dev(svg, "height", svg_height_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(56:5) {#if width || isServerSide}",
    ctx: ctx
  });
  return block;
} // (69:9) {#if indicators.length > 1}


function create_if_block_1(ctx) {
  var line;
  var line_y__value;
  var block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_svg_element(nodes, "line", {
        y1: true,
        y2: true,
        class: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "y1", gap);
      attr_dev(line, "y2", line_y__value = gap +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length);
      attr_dev(line, "class", "svelte-yz4j7q");
      add_location(line, file, 69, 10, 1473);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*vStep, $_groups*/
      96 && line_y__value !== (line_y__value = gap +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length)) {
        attr_dev(line, "y2", line_y__value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(69:9) {#if indicators.length > 1}",
    ctx: ctx
  });
  return block;
} // (63:7) {#each $_yearRange as year}


function create_each_block_3(ctx) {
  var g;
  var text_1;
  var t_value =
  /*shortenYearFn*/
  ctx[4](
  /*year*/
  ctx[23]) + "";
  var t;
  var text_1_font_size_value;
  var text_1_y_value;
  var g_transform_value;
  var if_block =
  /*indicators*/
  ctx[13].length > 1 && create_if_block_1(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      if (if_block) if_block.c();
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        transform: true
      });
      var g_nodes = children(g);
      if (if_block) if_block.l(g_nodes);
      text_1 = claim_svg_element(g_nodes, "text", {
        "font-size": true,
        y: true,
        class: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "font-size", text_1_font_size_value =
      /*layout*/
      ctx[2].fontSize);
      attr_dev(text_1, "y", text_1_y_value = 2 * gap +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length +
      /*layout*/
      ctx[2].fontSize / 2);
      attr_dev(text_1, "class", "svelte-yz4j7q");
      add_location(text_1, file, 76, 9, 1612);
      attr_dev(g, "class", "xref");
      attr_dev(g, "transform", g_transform_value = "translate(" +
      /*layout*/
      ctx[2].scaleX(
      /*year*/
      ctx[23]) + ",0)");
      add_location(g, file, 63, 8, 1312);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      if (if_block) if_block.m(g, null);
      append_hydration_dev(g, text_1);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (
      /*indicators*/
      ctx[13].length > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(g, text_1);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*shortenYearFn, $_yearRange*/
      144 && t_value !== (t_value =
      /*shortenYearFn*/
      ctx[4](
      /*year*/
      ctx[23]) + "")) set_data_dev(t, t_value);

      if (dirty &
      /*layout*/
      4 && text_1_font_size_value !== (text_1_font_size_value =
      /*layout*/
      ctx[2].fontSize)) {
        attr_dev(text_1, "font-size", text_1_font_size_value);
      }

      if (dirty &
      /*vStep, $_groups, layout*/
      100 && text_1_y_value !== (text_1_y_value = 2 * gap +
      /*vStep*/
      ctx[5] *
      /*indicators*/
      ctx[13].length +
      /*layout*/
      ctx[2].fontSize / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }

      if (dirty &
      /*layout, $_yearRange*/
      132 && g_transform_value !== (g_transform_value = "translate(" +
      /*layout*/
      ctx[2].scaleX(
      /*year*/
      ctx[23]) + ",0)")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(63:7) {#each $_yearRange as year}",
    ctx: ctx
  });
  return block;
} // (112:9) {#each availableYears as year}


function create_each_block_2(ctx) {
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
      a = claim_svg_element(nodes, "a", {
        "aria-label": true,
        href: true,
        rel: true
      });
      var a_nodes = children(a);
      circle = claim_svg_element(a_nodes, "circle", {
        cx: true,
        r: true,
        class: true
      });
      children(circle).forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", circle_cx_value =
      /*layout*/
      ctx[2].scaleX(
      /*year*/
      ctx[23]));
      attr_dev(circle, "r", circle_r_value =
      /*layout*/
      ctx[2].radius);
      attr_dev(circle, "class", "svelte-yz4j7q");
      add_location(circle, file, 117, 11, 2874);
      attr_dev(a, "aria-label", a_aria_label_value =
      /*year*/
      ctx[23]);
      attr_dev(a, "href", a_href_value = makeURL(
      /*$_hrefBase*/
      ctx[8],
      /*schema*/
      ctx[19].value.id,
      /*year*/
      ctx[23]));
      attr_dev(a, "rel", "prefetch");
      add_location(a, file, 112, 10, 2732);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, a, anchor);
      append_hydration_dev(a, circle);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*layout, $_groups*/
      68 && circle_cx_value !== (circle_cx_value =
      /*layout*/
      ctx[2].scaleX(
      /*year*/
      ctx[23]))) {
        attr_dev(circle, "cx", circle_cx_value);
      }

      if (dirty &
      /*layout*/
      4 && circle_r_value !== (circle_r_value =
      /*layout*/
      ctx[2].radius)) {
        attr_dev(circle, "r", circle_r_value);
      }

      if (dirty &
      /*$_groups*/
      64 && a_aria_label_value !== (a_aria_label_value =
      /*year*/
      ctx[23])) {
        attr_dev(a, "aria-label", a_aria_label_value);
      }

      if (dirty &
      /*$_hrefBase, $_groups*/
      320 && a_href_value !== (a_href_value = makeURL(
      /*$_hrefBase*/
      ctx[8],
      /*schema*/
      ctx[19].value.id,
      /*year*/
      ctx[23]))) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(112:9) {#each availableYears as year}",
    ctx: ctx
  });
  return block;
} // (87:7) {#each indicators as {availableYears, title, schema, year_extent}


function create_each_block_1(ctx) {
  var g;
  var text0;
  var t0_value =
  /*title*/
  ctx[18] + "";
  var t0;
  var text0_x_value;
  var text0_dy_value;
  var text0_font_size_value;
  var text1;
  var t1_value =
  /*title*/
  ctx[18] + "";
  var t1;
  var text1_x_value;
  var text1_dy_value;
  var text1_font_size_value;
  var line;
  var line_x__value;
  var line_x__value_1;
  var g_transform_value;
  var each_value_2 =
  /*availableYears*/
  ctx[17];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      g = svg_element("g");
      text0 = svg_element("text");
      t0 = text(t0_value);
      text1 = svg_element("text");
      t1 = text(t1_value);
      line = svg_element("line");

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        transform: true
      });
      var g_nodes = children(g);
      text0 = claim_svg_element(g_nodes, "text", {
        class: true,
        x: true,
        dy: true,
        "font-size": true
      });
      var text0_nodes = children(text0);
      t0 = claim_text(text0_nodes, t0_value);
      text0_nodes.forEach(detach_dev);
      text1 = claim_svg_element(g_nodes, "text", {
        x: true,
        dy: true,
        "font-size": true,
        class: true
      });
      var text1_nodes = children(text1);
      t1 = claim_text(text1_nodes, t1_value);
      text1_nodes.forEach(detach_dev);
      line = claim_svg_element(g_nodes, "line", {
        x1: true,
        x2: true,
        class: true
      });
      children(line).forEach(detach_dev);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].l(g_nodes);
      }

      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text0, "class", "bkg svelte-yz4j7q");
      attr_dev(text0, "x", text0_x_value = (
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1])) / 2);
      attr_dev(text0, "dy", text0_dy_value = -(
      /*layout*/
      ctx[2].fontSize + gap));
      attr_dev(text0, "font-size", text0_font_size_value =
      /*layout*/
      ctx[2].fontSize);
      add_location(text0, file, 92, 9, 2052);
      attr_dev(text1, "x", text1_x_value = (
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1])) / 2);
      attr_dev(text1, "dy", text1_dy_value = -(
      /*layout*/
      ctx[2].fontSize + gap));
      attr_dev(text1, "font-size", text1_font_size_value =
      /*layout*/
      ctx[2].fontSize);
      attr_dev(text1, "class", "svelte-yz4j7q");
      add_location(text1, file, 98, 9, 2278);
      attr_dev(line, "x1", line_x__value =
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].radius);
      attr_dev(line, "x2", line_x__value_1 =
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1]) -
      /*layout*/
      ctx[2].radius);
      attr_dev(line, "class", "svelte-yz4j7q");
      add_location(line, file, 105, 9, 2514);
      attr_dev(g, "class", "indicatorsrange");
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*vStep*/
      ctx[5] * (
      /*y*/
      ctx[22] + 1) + ")");
      add_location(g, file, 87, 8, 1921);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, text0);
      append_hydration_dev(text0, t0);
      append_hydration_dev(g, text1);
      append_hydration_dev(text1, t1);
      append_hydration_dev(g, line);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        each_blocks[_i12].m(g, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$_groups*/
      64 && t0_value !== (t0_value =
      /*title*/
      ctx[18] + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*layout, $_groups*/
      68 && text0_x_value !== (text0_x_value = (
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1])) / 2)) {
        attr_dev(text0, "x", text0_x_value);
      }

      if (dirty &
      /*layout*/
      4 && text0_dy_value !== (text0_dy_value = -(
      /*layout*/
      ctx[2].fontSize + gap))) {
        attr_dev(text0, "dy", text0_dy_value);
      }

      if (dirty &
      /*layout*/
      4 && text0_font_size_value !== (text0_font_size_value =
      /*layout*/
      ctx[2].fontSize)) {
        attr_dev(text0, "font-size", text0_font_size_value);
      }

      if (dirty &
      /*$_groups*/
      64 && t1_value !== (t1_value =
      /*title*/
      ctx[18] + "")) set_data_dev(t1, t1_value);

      if (dirty &
      /*layout, $_groups*/
      68 && text1_x_value !== (text1_x_value = (
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1])) / 2)) {
        attr_dev(text1, "x", text1_x_value);
      }

      if (dirty &
      /*layout*/
      4 && text1_dy_value !== (text1_dy_value = -(
      /*layout*/
      ctx[2].fontSize + gap))) {
        attr_dev(text1, "dy", text1_dy_value);
      }

      if (dirty &
      /*layout*/
      4 && text1_font_size_value !== (text1_font_size_value =
      /*layout*/
      ctx[2].fontSize)) {
        attr_dev(text1, "font-size", text1_font_size_value);
      }

      if (dirty &
      /*layout, $_groups*/
      68 && line_x__value !== (line_x__value =
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][0]) +
      /*layout*/
      ctx[2].radius)) {
        attr_dev(line, "x1", line_x__value);
      }

      if (dirty &
      /*layout, $_groups*/
      68 && line_x__value_1 !== (line_x__value_1 =
      /*layout*/
      ctx[2].scaleX(
      /*year_extent*/
      ctx[20][1]) -
      /*layout*/
      ctx[2].radius)) {
        attr_dev(line, "x2", line_x__value_1);
      }

      if (dirty &
      /*$_groups, makeURL, $_hrefBase, layout*/
      324) {
        each_value_2 =
        /*availableYears*/
        ctx[17];
        validate_each_argument(each_value_2);

        var _i13;

        for (_i13 = 0; _i13 < each_value_2.length; _i13 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i13);

          if (each_blocks[_i13]) {
            each_blocks[_i13].p(child_ctx, dirty);
          } else {
            each_blocks[_i13] = create_each_block_2(child_ctx);

            each_blocks[_i13].c();

            each_blocks[_i13].m(g, null);
          }
        }

        for (; _i13 < each_blocks.length; _i13 += 1) {
          each_blocks[_i13].d(1);
        }

        each_blocks.length = each_value_2.length;
      }

      if (dirty &
      /*vStep*/
      32 && g_transform_value !== (g_transform_value = "translate(0," +
      /*vStep*/
      ctx[5] * (
      /*y*/
      ctx[22] + 1) + ")")) {
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
    id: create_each_block_1.name,
    type: "each",
    source: "(87:7) {#each indicators as {availableYears, title, schema, year_extent}",
    ctx: ctx
  });
  return block;
} // (51:3) {#each $_groups as {description, indicators, label}}


function create_each_block(ctx) {
  var li;
  var h2;
  var t0_value =
  /*label*/
  ctx[14] + "";
  var t0;
  var t1;
  var p;
  var t2_value =
  /*description*/
  ctx[12] + "";
  var t2;
  var t3;
  var t4;
  var if_block = (
  /*width*/
  ctx[3] || isServerSide) && create_if_block(ctx);
  var block = {
    c: function create() {
      li = element("li");
      h2 = element("h2");
      t0 = text(t0_value);
      t1 = space();
      p = element("p");
      t2 = text(t2_value);
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      h2 = claim_element(li_nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, t0_value);
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(li_nodes);
      p = claim_element(li_nodes, "P", {});
      var p_nodes = children(p);
      t2 = claim_text(p_nodes, t2_value);
      p_nodes.forEach(detach_dev);
      t3 = claim_space(li_nodes);
      if (if_block) if_block.l(li_nodes);
      t4 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h2, file, 52, 5, 1064);
      add_location(p, file, 53, 5, 1086);
      attr_dev(li, "class", "group svelte-yz4j7q");
      add_location(li, file, 51, 4, 1040);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, h2);
      append_hydration_dev(h2, t0);
      append_hydration_dev(li, t1);
      append_hydration_dev(li, p);
      append_hydration_dev(p, t2);
      append_hydration_dev(li, t3);
      if (if_block) if_block.m(li, null);
      append_hydration_dev(li, t4);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$_groups*/
      64 && t0_value !== (t0_value =
      /*label*/
      ctx[14] + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*$_groups*/
      64 && t2_value !== (t2_value =
      /*description*/
      ctx[12] + "")) set_data_dev(t2, t2_value);

      if (
      /*width*/
      ctx[3] || isServerSide) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(li, t4);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(51:3) {#each $_groups as {description, indicators, label}}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var div1;
  var header;
  var h1;
  var t0;
  var t1;
  var div0;
  var ul;
  var div0_resize_listener;
  var each_value =
  /*$_groups*/
  ctx[6];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      div1 = element("div");
      header = element("header");
      h1 = element("h1");
      t0 = text("Indicators");
      t1 = space();
      div0 = element("div");
      ul = element("ul");

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      header = claim_element(div1_nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h1 = claim_element(header_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Indicators");
      h1_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      ul = claim_element(div0_nodes, "UL", {});
      var ul_nodes = children(ul);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 42, 2, 886);
      attr_dev(header, "class", "svelte-yz4j7q");
      add_location(header, file, 41, 1, 875);
      add_location(ul, file, 49, 2, 975);
      attr_dev(div0, "class", "timedist svelte-yz4j7q");
      add_render_callback(function () {
        return (
          /*div0_elementresize_handler*/
          ctx[11].call(div0)
        );
      });
      add_location(div0, file, 45, 1, 919);
      attr_dev(div1, "class", "time_region_value_Index svelte-yz4j7q");
      add_location(div1, file, 40, 0, 836);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      append_hydration_dev(div1, header);
      append_hydration_dev(header, h1);
      append_hydration_dev(h1, t0);
      append_hydration_dev(div1, t1);
      append_hydration_dev(div1, div0);
      append_hydration_dev(div0, ul);

      for (var _i16 = 0; _i16 < each_blocks.length; _i16 += 1) {
        each_blocks[_i16].m(ul, null);
      }

      div0_resize_listener = add_resize_listener(div0,
      /*div0_elementresize_handler*/
      ctx[11].bind(div0));
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*width, gap, layout, vStep, $_groups, makeURL, $_hrefBase, $_yearRange, shortenYearFn, isServerSide*/
      508) {
        each_value =
        /*$_groups*/
        ctx[6];
        validate_each_argument(each_value);

        var _i17;

        for (_i17 = 0; _i17 < each_value.length; _i17 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i17);

          if (each_blocks[_i17]) {
            each_blocks[_i17].p(child_ctx, dirty);
          } else {
            each_blocks[_i17] = create_each_block(child_ctx);

            each_blocks[_i17].c();

            each_blocks[_i17].m(ul, null);
          }
        }

        for (; _i17 < each_blocks.length; _i17 += 1) {
          each_blocks[_i17].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_each(each_blocks, detaching);
      div0_resize_listener();
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

var gap = 7;

function instance$1($$self, $$props, $$invalidate) {
  var layout;
  var vStep;
  var shortenYearFn;
  var $_isSmallScreen;
  var $_timelineLayout;

  var $_groups,
      $$unsubscribe__groups = noop,
      $$subscribe__groups = function $$subscribe__groups() {
    return $$unsubscribe__groups(), $$unsubscribe__groups = subscribe(_groups, function ($$value) {
      return $$invalidate(6, $_groups = $$value);
    }), _groups;
  };

  var $_yearRange,
      $$unsubscribe__yearRange = noop,
      $$subscribe__yearRange = function $$subscribe__yearRange() {
    return $$unsubscribe__yearRange(), $$unsubscribe__yearRange = subscribe(_yearRange, function ($$value) {
      return $$invalidate(7, $_yearRange = $$value);
    }), _yearRange;
  };

  var $_hrefBase;
  validate_store(_isSmallScreen, '_isSmallScreen');
  component_subscribe($$self, _isSmallScreen, function ($$value) {
    return $$invalidate(9, $_isSmallScreen = $$value);
  });
  validate_store(_timelineLayout, '_timelineLayout');
  component_subscribe($$self, _timelineLayout, function ($$value) {
    return $$invalidate(10, $_timelineLayout = $$value);
  });
  validate_store(_hrefBase, '_hrefBase');
  component_subscribe($$self, _hrefBase, function ($$value) {
    return $$invalidate(8, $_hrefBase = $$value);
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__groups();
  });
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe__yearRange();
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('Routes', slots, []);

  var _$$props$_groups = $$props._groups,
      _groups = _$$props$_groups === void 0 ? null : _$$props$_groups;

  validate_store(_groups, '_groups');
  $$subscribe__groups();

  var _$$props$_yearRange = $$props._yearRange,
      _yearRange = _$$props$_yearRange === void 0 ? null : _$$props$_yearRange;

  validate_store(_yearRange, '_yearRange');
  $$subscribe__yearRange();
  /* init */

  onMount(function () {
    resetSelectedYear();
    setRoute('Index');
    showView('distribution');
  });
  /* local vars */
  // bound

  var width;
  var writable_props = ['_groups', '_yearRange'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });

  function div0_elementresize_handler() {
    width = this.clientWidth;
    $$invalidate(3, width);
  }

  $$self.$$set = function ($$props) {
    if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ('_yearRange' in $$props) $$subscribe__yearRange($$invalidate(1, _yearRange = $$props._yearRange));
  };

  $$self.$capture_state = function () {
    return {
      isServerSide: isServerSide,
      _: _,
      onMount: onMount,
      _isSmallScreen: _isSmallScreen,
      _timelineLayout: _timelineLayout,
      _hrefBase: _hrefBase,
      setRoute: setRoute,
      showView: showView,
      resetSelectedYear: resetSelectedYear,
      shortenYear: shortenYear,
      makeURL: makeURL,
      gap: gap,
      _groups: _groups,
      _yearRange: _yearRange,
      width: width,
      shortenYearFn: shortenYearFn,
      layout: layout,
      vStep: vStep,
      $_isSmallScreen: $_isSmallScreen,
      $_timelineLayout: $_timelineLayout,
      $_groups: $_groups,
      $_yearRange: $_yearRange,
      $_hrefBase: $_hrefBase
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('_groups' in $$props) $$subscribe__groups($$invalidate(0, _groups = $$props._groups));
    if ('_yearRange' in $$props) $$subscribe__yearRange($$invalidate(1, _yearRange = $$props._yearRange));
    if ('width' in $$props) $$invalidate(3, width = $$props.width);
    if ('shortenYearFn' in $$props) $$invalidate(4, shortenYearFn = $$props.shortenYearFn);
    if ('layout' in $$props) $$invalidate(2, layout = $$props.layout);
    if ('vStep' in $$props) $$invalidate(5, vStep = $$props.vStep);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*$_timelineLayout*/
    1024) {
      $$invalidate(2, layout = $_timelineLayout);
    }

    if ($$self.$$.dirty &
    /*layout*/
    4) {
      $$invalidate(5, vStep = 2 * layout.radius + 3 * gap + layout.fontSize);
    }

    if ($$self.$$.dirty &
    /*$_isSmallScreen*/
    512) {
      $$invalidate(4, shortenYearFn = $_isSmallScreen ? shortenYear : identity);
    }
  };

  return [_groups, _yearRange, layout, width, shortenYearFn, vStep, $_groups, $_yearRange, $_hrefBase, $_isSmallScreen, $_timelineLayout, div0_elementresize_handler];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper$1(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      _groups: 0,
      _yearRange: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(Routes, [{
    key: "_groups",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "_yearRange",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Routes;
}(SvelteComponentDev);

var Index = Routes;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment(ctx) {
  var index;
  var current;
  index = new Index({
    props: {
      _groups: _groups,
      _yearRange: _yearRange,
      hrefBase: hrefBase
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(index.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(index.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(index, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(index.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(index.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(index, detaching);
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
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('Time_region_value', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Time_region_value> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      Index: Index,
      _groups: _groups,
      _yearRange: _yearRange,
      hrefBase: hrefBase
    };
  };

  return [];
}

var Time_region_value = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Time_region_value, _SvelteComponentDev);

  var _super = _createSuper(Time_region_value);

  function Time_region_value(options) {
    var _this;

    _classCallCheck(this, Time_region_value);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Time_region_value",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Time_region_value;
}(SvelteComponentDev);

export { Time_region_value as default };
