import { ac as partial, ad as __, d7 as make, A as _slicedToArray, _ as _inherits, a as _classCallCheck, i as init, s as safe_not_equal, b as _assertThisInitialized, d as dispatch_dev, c as _createClass, S as SvelteComponentDev, e as _getPrototypeOf, f as _possibleConstructorReturn, y as validate_each_argument, Q as Icon, x as validate_slots, W as createEventDispatcher, bg as ChevronRight, h as element, g as space, t as text, J as create_component, m as claim_element, n as children, l as claim_space, k as detach_dev, o as claim_text, K as claim_component, p as attr_dev, r as add_location, u as insert_hydration_dev, v as append_hydration_dev, L as mount_component, U as listen_dev, ay as stop_propagation, B as transition_in, I as group_outros, C as check_outros, G as transition_out, H as destroy_each, M as destroy_component, az as run_all, af as set_data_dev, N as toggle_class, bI as is_function, w as noop$1, ax as validate_store, aH as component_subscribe, aB as bubble, aI as setupResizeObserver, aJ as action_destroyer, d8 as isArray, d9 as isObject, bJ as pairs, aE as empty, co as isUndefined, a7 as pipe, aC as _, cd as isNotNil, cJ as derived, bX as isIterableEmpty, cG as pluck, bZ as always, bE as last, br as writable, aQ as Switch, T as _defineProperty, ap as _toConsumableArray, cb as map, ae as zip, a3 as transformValues, da as negate } from './client.a726f8ff.js';
import { n as noop, t as deselectAllRoots, u as selectAllRoots, v as _isMenuExpanded, w as _focusedRootId, x as _roots, z as _focusedRootDescendants, e as _currentLevel, A as _focusedRoot, B as deselectAllFocusedRootChildren, C as focusRoot, D as selectAllFocusedRootChildren, E as toggleFocusedRootDescendant, F as toggleRoot, _ as _theme, h as _selectionData, G as _yearSelectionData, m as _getIndicatorValue, H as _availableLevels } from './indicator.c3c0747f.js';
import { e as _isSmallScreen, k as _selectedYear } from './stores.eef69787.js';
import { a as CheckSquare, S as Square, d as MinusSquare, c as ChevronUp, b as ChevronDown, L as LinkButton, u as extent, G as Globe, X as XorSelector, w as pairs$1 } from './ColorBinsDiv.5e5da360.js';
import { I as Info } from './Info.dd752d1b.js';
import { L as Link } from './rgb.9472a47b.js';
import { i as initRange, b as linearish, d as bisect, D as Download } from './linear.ded554b7.js';

/**
* @module @svizzle/utils/array-[array-object]
*/

/**
 * Return a function expecting an array of values and returning an object assigning the values to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function} - Array -> Object
 *
 * @example
> makeWithLatLng = makeWithKeys(['lng', 'lat'])
> makeWithLatLng([1, 2])
{lng: 1, lat: 2}
> makeWithLatLng([10, 20])
{lng: 10, lat: 20}
 *
 * @since 0.2.0
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithValues|makeWithValues}
 * @see {@link module:@svizzle/utils/array-[any-object].makeWith|makeWith}
 */
var makeWithKeys = function makeWithKeys(keys) {
  return partial(make, [keys, __]);
};

function quantize() {
  var x0 = 0,
    x1 = 1,
    n = 1,
    domain = [0.5],
    range = [0, 1],
    unknown;
  function scale(x) {
    return x != null && x <= x ? range[bisect(domain, x, 0, n)] : unknown;
  }
  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }
  scale.domain = function (_) {
    var _ref;
    return arguments.length ? ((_ref = _slicedToArray(_, 2), x0 = _ref[0], x1 = _ref[1]), x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };
  scale.range = function (_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };
  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };
  scale.thresholds = function () {
    return domain.slice();
  };
  scale.copy = function () {
    return quantize().domain([x0, x1]).range(range).unknown(unknown);
  };
  return initRange.apply(linearish(scale), arguments);
}

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "../../components/time_region_value/src/lib/components/RegionsSelector.svelte";
function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i].id;
  child_ctx[16] = list[i].name;
  child_ctx[17] = list[i].status;
  return child_ctx;
}

// (53:1) {#if title}
function create_if_block_5$1(ctx) {
  var h2;
  var t;
  var block = {
    c: function create() {
      h2 = element("h2");
      t = text( /*title*/ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes, /*title*/ctx[0]);
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-ply59b");
      add_location(h2, file$8, 53, 2, 1382);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, h2, anchor);
      append_hydration_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*title*/1) set_data_dev(t, /*title*/ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5$1.name,
    type: "if",
    source: "(53:1) {#if title}",
    ctx: ctx
  });
  return block;
}

// (79:29) 
function create_if_block_4$1(ctx) {
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: MinusSquare,
      size: 20
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop$1,
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
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(79:29) ",
    ctx: ctx
  });
  return block;
}

// (74:28) 
function create_if_block_3$1(ctx) {
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: Square,
      size: 20
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop$1,
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
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(74:28) ",
    ctx: ctx
  });
  return block;
}

// (69:5) {#if status === 1}
function create_if_block_2$4(ctx) {
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: CheckSquare,
      size: 20
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop$1,
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
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$4.name,
    type: "if",
    source: "(69:5) {#if status === 1}",
    ctx: ctx
  });
  return block;
}

// (101:4) {#if showFocusedItem}
function create_if_block$7(ctx) {
  var span;
  var current;
  var if_block = /*id*/ctx[15] === /*focusedId*/ctx[2] && create_if_block_1$5(ctx);
  var block = {
    c: function create() {
      span = element("span");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (if_block) if_block.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "chevron");
      add_location(span, file$8, 101, 5, 2229);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      if (if_block) if_block.m(span, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ( /*id*/ctx[15] === /*focusedId*/ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*items, focusedId*/6) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$5(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(span, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$7.name,
    type: "if",
    source: "(101:4) {#if showFocusedItem}",
    ctx: ctx
  });
  return block;
}

// (103:6) {#if id === focusedId}
function create_if_block_1$5(ctx) {
  var icon;
  var current;
  icon = new Icon({
    props: {
      glyph: ChevronRight,
      size: 20
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop$1,
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
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$5.name,
    type: "if",
    source: "(103:6) {#if id === focusedId}",
    ctx: ctx
  });
  return block;
}

// (60:2) {#each items as {id, name, status}}
function create_each_block$3(ctx) {
  var li;
  var span0;
  var current_block_type_index;
  var if_block0;
  var t0;
  var span1;
  var t1_value = /*name*/ctx[16] + "";
  var t1;
  var t2;
  var t3;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block_2$4, create_if_block_3$1, create_if_block_4$1];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if ( /*status*/ctx[17] === 1) return 0;
    if ( /*status*/ctx[17] === 0) return 1;
    if ( /*status*/ctx[17] === -1) return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  var if_block1 = /*showFocusedItem*/ctx[3] && create_if_block$7(ctx);
  var block = {
    c: function create() {
      li = element("li");
      span0 = element("span");
      if (if_block0) if_block0.c();
      t0 = space();
      span1 = element("span");
      t1 = text(t1_value);
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      span0 = claim_element(li_nodes, "SPAN", {
        class: true
      });
      var span0_nodes = children(span0);
      if (if_block0) if_block0.l(span0_nodes);
      span0_nodes.forEach(detach_dev);
      t0 = claim_space(li_nodes);
      span1 = claim_element(li_nodes, "SPAN", {
        class: true
      });
      var span1_nodes = children(span1);
      t1 = claim_text(span1_nodes, t1_value);
      span1_nodes.forEach(detach_dev);
      t2 = claim_space(li_nodes);
      if (if_block1) if_block1.l(li_nodes);
      t3 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "checker clickable svelte-ply59b");
      add_location(span0, file$8, 63, 4, 1518);
      attr_dev(span1, "class", "item svelte-ply59b");
      toggle_class(span1, "clickable", /*showFocusedItem*/ctx[3]);
      toggle_class(span1, "focused", /*id*/ctx[15] === /*focusedId*/ctx[2]);
      add_location(span1, file$8, 88, 4, 1967);
      attr_dev(li, "class", "svelte-ply59b");
      add_location(li, file$8, 60, 3, 1486);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span0);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(span0, null);
      }
      append_hydration_dev(li, t0);
      append_hydration_dev(li, span1);
      append_hydration_dev(span1, t1);
      append_hydration_dev(li, t2);
      if (if_block1) if_block1.m(li, null);
      append_hydration_dev(li, t3);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(span0, "click", function () {
          if (is_function( /*clickToggledAndFocused*/ctx[10]( /*id*/ctx[15]))) /*clickToggledAndFocused*/ctx[10]( /*id*/ctx[15]).apply(this, arguments);
        }, false, false, false), listen_dev(span0, "keydown", function () {
          if (is_function( /*keyToggledAndFocused*/ctx[11]( /*id*/ctx[15]))) /*keyToggledAndFocused*/ctx[11]( /*id*/ctx[15]).apply(this, arguments);
        }, false, false, false), listen_dev(span1, "click", function () {
          if (is_function( /*clickFocused*/ctx[8]( /*id*/ctx[15]))) /*clickFocused*/ctx[8]( /*id*/ctx[15]).apply(this, arguments);
        }, false, false, false), listen_dev(span1, "keydown", function () {
          if (is_function( /*keyFocused*/ctx[9]( /*id*/ctx[15]))) /*keyFocused*/ctx[9]( /*id*/ctx[15]).apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
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
          if_block0.m(span0, null);
        } else {
          if_block0 = null;
        }
      }
      if ((!current || dirty & /*items*/2) && t1_value !== (t1_value = /*name*/ctx[16] + "")) set_data_dev(t1, t1_value);
      if (!current || dirty & /*showFocusedItem*/8) {
        toggle_class(span1, "clickable", /*showFocusedItem*/ctx[3]);
      }
      if (!current || dirty & /*items, focusedId*/6) {
        toggle_class(span1, "focused", /*id*/ctx[15] === /*focusedId*/ctx[2]);
      }
      if ( /*showFocusedItem*/ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*showFocusedItem*/8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$7(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, t3);
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
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (if_block1) if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$3.name,
    type: "each",
    source: "(60:2) {#each items as {id, name, status}}",
    ctx: ctx
  });
  return block;
}
function create_fragment$8(ctx) {
  var div;
  var t0;
  var ul0;
  var t1;
  var ul1;
  var li0;
  var span0;
  var t2;
  var t3;
  var span1;
  var icon0;
  var t4;
  var li1;
  var span2;
  var t5;
  var t6;
  var span3;
  var icon1;
  var current;
  var mounted;
  var dispose;
  var if_block = /*title*/ctx[0] && create_if_block_5$1(ctx);
  var each_value = /*items*/ctx[1];
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  icon0 = new Icon({
    props: {
      glyph: CheckSquare,
      size: 20,
      stroke: "palegreen"
    },
    $$inline: true
  });
  icon1 = new Icon({
    props: {
      glyph: Square,
      size: 20,
      stroke: "red"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      if (if_block) if_block.c();
      t0 = space();
      ul0 = element("ul");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      t1 = space();
      ul1 = element("ul");
      li0 = element("li");
      span0 = element("span");
      t2 = text("Select all");
      t3 = space();
      span1 = element("span");
      create_component(icon0.$$.fragment);
      t4 = space();
      li1 = element("li");
      span2 = element("span");
      t5 = text("Deselect all");
      t6 = space();
      span3 = element("span");
      create_component(icon1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block) if_block.l(div_nodes);
      t0 = claim_space(div_nodes);
      ul0 = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul0_nodes = children(ul0);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul0_nodes);
      }
      ul0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      ul1 = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul1_nodes = children(ul1);
      li0 = claim_element(ul1_nodes, "LI", {
        class: true
      });
      var li0_nodes = children(li0);
      span0 = claim_element(li0_nodes, "SPAN", {});
      var span0_nodes = children(span0);
      t2 = claim_text(span0_nodes, "Select all");
      span0_nodes.forEach(detach_dev);
      t3 = claim_space(li0_nodes);
      span1 = claim_element(li0_nodes, "SPAN", {
        class: true
      });
      var span1_nodes = children(span1);
      claim_component(icon0.$$.fragment, span1_nodes);
      span1_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t4 = claim_space(ul1_nodes);
      li1 = claim_element(ul1_nodes, "LI", {
        class: true
      });
      var li1_nodes = children(li1);
      span2 = claim_element(li1_nodes, "SPAN", {});
      var span2_nodes = children(span2);
      t5 = claim_text(span2_nodes, "Deselect all");
      span2_nodes.forEach(detach_dev);
      t6 = claim_space(li1_nodes);
      span3 = claim_element(li1_nodes, "SPAN", {
        class: true
      });
      var span3_nodes = children(span3);
      claim_component(icon1.$$.fragment, span3_nodes);
      span3_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      ul1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul0, "class", "items svelte-ply59b");
      add_location(ul0, file$8, 56, 1, 1408);
      add_location(span0, file$8, 122, 3, 2546);
      attr_dev(span1, "class", "checker svelte-ply59b");
      add_location(span1, file$8, 123, 3, 2573);
      attr_dev(li0, "class", "end sep clickable svelte-ply59b");
      add_location(li0, file$8, 117, 2, 2444);
      add_location(span2, file$8, 139, 3, 2826);
      attr_dev(span3, "class", "checker svelte-ply59b");
      add_location(span3, file$8, 140, 3, 2855);
      attr_dev(li1, "class", "end clickable svelte-ply59b");
      add_location(li1, file$8, 134, 2, 2724);
      attr_dev(ul1, "class", "svelte-ply59b");
      add_location(ul1, file$8, 116, 1, 2437);
      attr_dev(div, "class", "RegionsSelector svelte-ply59b");
      add_location(div, file$8, 45, 0, 1250);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
      append_hydration_dev(div, t0);
      append_hydration_dev(div, ul0);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul0, null);
      }
      append_hydration_dev(div, t1);
      append_hydration_dev(div, ul1);
      append_hydration_dev(ul1, li0);
      append_hydration_dev(li0, span0);
      append_hydration_dev(span0, t2);
      append_hydration_dev(li0, t3);
      append_hydration_dev(li0, span1);
      mount_component(icon0, span1, null);
      append_hydration_dev(ul1, t4);
      append_hydration_dev(ul1, li1);
      append_hydration_dev(li1, span2);
      append_hydration_dev(span2, t5);
      append_hydration_dev(li1, t6);
      append_hydration_dev(li1, span3);
      mount_component(icon1, span3, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(li0, "click", /*clickSelectedAll*/ctx[4], false, false, false), listen_dev(li0, "keydown", /*keySelectedAll*/ctx[5], false, false, false), listen_dev(li1, "click", /*clickDeselectedAll*/ctx[6], false, false, false), listen_dev(li1, "keydown", /*keyDeselectedAll*/ctx[7], false, false, false), listen_dev(div, "click", stop_propagation(noop), false, false, true), listen_dev(div, "keydown", stop_propagation(noop), false, false, true)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if ( /*title*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_5$1(ctx);
          if_block.c();
          if_block.m(div, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*ChevronRight, items, focusedId, showFocusedItem, clickFocused, keyFocused, clickToggledAndFocused, keyToggledAndFocused, CheckSquare, Square, MinusSquare*/3854) {
        each_value = /*items*/ctx[1];
        validate_each_argument(each_value);
        var _i4;
        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block$3(child_ctx);
            each_blocks[_i4].c();
            transition_in(each_blocks[_i4], 1);
            each_blocks[_i4].m(ul0, null);
          }
        }
        group_outros();
        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block) if_block.d();
      destroy_each(each_blocks, detaching);
      destroy_component(icon0);
      destroy_component(icon1);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$8($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('RegionsSelector', slots, []);
  var dispatch = createEventDispatcher();
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var _$$props$items = $$props.items,
    items = _$$props$items === void 0 ? [] : _$$props$items;
  var _$$props$focusedId = $$props.focusedId,
    focusedId = _$$props$focusedId === void 0 ? null : _$$props$focusedId;
  var _$$props$showFocusedI = $$props.showFocusedItem,
    showFocusedItem = _$$props$showFocusedI === void 0 ? false : _$$props$showFocusedI;
  var makeClickHandler = function makeClickHandler(dispatchedEvents) {
    return function (id) {
      return function () {
        dispatchedEvents.forEach(function (dispatchedEvent) {
          dispatch(dispatchedEvent, id);
        });
      };
    };
  };
  var makeKeyHandler = function makeKeyHandler(dispatchedEvents) {
    return function (id) {
      return function (event) {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          dispatchedEvents.forEach(function (dispatchedEvent) {
            dispatch(dispatchedEvent, id);
          });
        }
      };
    };
  };
  var clickSelectedAll = function clickSelectedAll() {
    return dispatch('selectedAll');
  };
  var keySelectedAll = function keySelectedAll() {
    return makeKeyHandler(['selectedAll']);
  };
  var clickDeselectedAll = function clickDeselectedAll() {
    return dispatch('deselectedAll');
  };
  var keyDeselectedAll = function keyDeselectedAll() {
    return makeKeyHandler(['deselectedAll']);
  };
  var clickFocused = function clickFocused(id) {
    return function () {
      return dispatch('focused', id);
    };
  };
  var keyFocused = makeKeyHandler(['focused']);
  var clickToggledAndFocused = makeClickHandler(['focused', 'toggled']);
  var keyToggledAndFocused = makeKeyHandler(['focused', 'toggled']);
  var writable_props = ['title', 'items', 'focusedId', 'showFocusedItem'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<RegionsSelector> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('items' in $$props) $$invalidate(1, items = $$props.items);
    if ('focusedId' in $$props) $$invalidate(2, focusedId = $$props.focusedId);
    if ('showFocusedItem' in $$props) $$invalidate(3, showFocusedItem = $$props.showFocusedItem);
  };
  $$self.$capture_state = function () {
    return {
      CheckSquare: CheckSquare,
      ChevronRight: ChevronRight,
      Icon: Icon,
      MinusSquare: MinusSquare,
      Square: Square,
      noop: noop,
      createEventDispatcher: createEventDispatcher,
      dispatch: dispatch,
      title: title,
      items: items,
      focusedId: focusedId,
      showFocusedItem: showFocusedItem,
      makeClickHandler: makeClickHandler,
      makeKeyHandler: makeKeyHandler,
      clickSelectedAll: clickSelectedAll,
      keySelectedAll: keySelectedAll,
      clickDeselectedAll: clickDeselectedAll,
      keyDeselectedAll: keyDeselectedAll,
      clickFocused: clickFocused,
      keyFocused: keyFocused,
      clickToggledAndFocused: clickToggledAndFocused,
      keyToggledAndFocused: keyToggledAndFocused
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('items' in $$props) $$invalidate(1, items = $$props.items);
    if ('focusedId' in $$props) $$invalidate(2, focusedId = $$props.focusedId);
    if ('showFocusedItem' in $$props) $$invalidate(3, showFocusedItem = $$props.showFocusedItem);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [title, items, focusedId, showFocusedItem, clickSelectedAll, keySelectedAll, clickDeselectedAll, keyDeselectedAll, clickFocused, keyFocused, clickToggledAndFocused, keyToggledAndFocused];
}
var RegionsSelector = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(RegionsSelector, _SvelteComponentDev);
  var _super = _createSuper$8(RegionsSelector);
  function RegionsSelector(options) {
    var _this;
    _classCallCheck(this, RegionsSelector);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      title: 0,
      items: 1,
      focusedId: 2,
      showFocusedItem: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "RegionsSelector",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }
  _createClass(RegionsSelector, [{
    key: "title",
    get: function get() {
      throw new Error("<RegionsSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RegionsSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "items",
    get: function get() {
      throw new Error("<RegionsSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RegionsSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focusedId",
    get: function get() {
      throw new Error("<RegionsSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RegionsSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "showFocusedItem",
    get: function get() {
      throw new Error("<RegionsSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RegionsSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return RegionsSelector;
}(SvelteComponentDev);
var RegionsSelector$1 = RegionsSelector;

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "../../components/time_region_value/src/lib/components/GeoFilterModal.svelte";

// (49:2) {#if $_isMenuExpanded}
function create_if_block$6(ctx) {
  var div;
  var regionsselector;
  var current;
  regionsselector = new RegionsSelector$1({
    props: {
      items: /*$_focusedRootDescendants*/ctx[3],
      title: "" + ( /*$_currentLevel*/ctx[4] + ": " + /*$_focusedRoot*/ctx[5].name)
    },
    $$inline: true
  });
  regionsselector.$on("deselectedAll", deselectAllFocusedRootChildren);
  regionsselector.$on("selectedAll", selectAllFocusedRootChildren);
  regionsselector.$on("toggled", /*toggledRegion*/ctx[8]);
  var block = {
    c: function create() {
      div = element("div");
      create_component(regionsselector.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(regionsselector.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "descendants svelte-ig1dnl");
      add_location(div, file$7, 49, 3, 1091);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(regionsselector, div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var regionsselector_changes = {};
      if (dirty & /*$_focusedRootDescendants*/8) regionsselector_changes.items = /*$_focusedRootDescendants*/ctx[3];
      if (dirty & /*$_currentLevel, $_focusedRoot*/48) regionsselector_changes.title = "" + ( /*$_currentLevel*/ctx[4] + ": " + /*$_focusedRoot*/ctx[5].name);
      regionsselector.$set(regionsselector_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(regionsselector.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(regionsselector.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(regionsselector);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(49:2) {#if $_isMenuExpanded}",
    ctx: ctx
  });
  return block;
}
function create_fragment$7(ctx) {
  var div2;
  var div1;
  var div0;
  var regionsselector;
  var t;
  var current;
  var mounted;
  var dispose;
  regionsselector = new RegionsSelector$1({
    props: {
      focusedId: /*$_focusedRootId*/ctx[1],
      items: /*$_roots*/ctx[2],
      showFocusedItem: /*$_isMenuExpanded*/ctx[0],
      title: "Countries"
    },
    $$inline: true
  });
  regionsselector.$on("deselectedAll", deselectAllRoots);
  regionsselector.$on("focused", /*focusedRoot*/ctx[6]);
  regionsselector.$on("selectedAll", selectAllRoots);
  regionsselector.$on("toggled", /*toggledRoot*/ctx[7]);
  var if_block = /*$_isMenuExpanded*/ctx[0] && create_if_block$6(ctx);
  var block = {
    c: function create() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      create_component(regionsselector.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(regionsselector.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t = claim_space(div1_nodes);
      if (if_block) if_block.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "roots svelte-ig1dnl");
      add_location(div0, file$7, 35, 2, 760);
      attr_dev(div1, "class", "panel svelte-ig1dnl");
      toggle_class(div1, "expanded", /*$_isMenuExpanded*/ctx[0]);
      add_location(div1, file$7, 31, 1, 698);
      attr_dev(div2, "class", "clickable modal svelte-ig1dnl");
      add_location(div2, file$7, 26, 0, 643);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div2, anchor);
      append_hydration_dev(div2, div1);
      append_hydration_dev(div1, div0);
      mount_component(regionsselector, div0, null);
      append_hydration_dev(div1, t);
      if (if_block) if_block.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div2, "click", /*click_handler*/ctx[9], false, false, false), listen_dev(div2, "keydown", /*keydown_handler*/ctx[10], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var regionsselector_changes = {};
      if (dirty & /*$_focusedRootId*/2) regionsselector_changes.focusedId = /*$_focusedRootId*/ctx[1];
      if (dirty & /*$_roots*/4) regionsselector_changes.items = /*$_roots*/ctx[2];
      if (dirty & /*$_isMenuExpanded*/1) regionsselector_changes.showFocusedItem = /*$_isMenuExpanded*/ctx[0];
      regionsselector.$set(regionsselector_changes);
      if ( /*$_isMenuExpanded*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*$_isMenuExpanded*/1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*$_isMenuExpanded*/1) {
        toggle_class(div1, "expanded", /*$_isMenuExpanded*/ctx[0]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(regionsselector.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(regionsselector.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      destroy_component(regionsselector);
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$7($$self, $$props, $$invalidate) {
  var $_isMenuExpanded;
  var $_focusedRootId;
  var $_roots;
  var $_focusedRootDescendants;
  var $_currentLevel;
  var $_focusedRoot;
  validate_store(_isMenuExpanded, '_isMenuExpanded');
  component_subscribe($$self, _isMenuExpanded, function ($$value) {
    return $$invalidate(0, $_isMenuExpanded = $$value);
  });
  validate_store(_focusedRootId, '_focusedRootId');
  component_subscribe($$self, _focusedRootId, function ($$value) {
    return $$invalidate(1, $_focusedRootId = $$value);
  });
  validate_store(_roots, '_roots');
  component_subscribe($$self, _roots, function ($$value) {
    return $$invalidate(2, $_roots = $$value);
  });
  validate_store(_focusedRootDescendants, '_focusedRootDescendants');
  component_subscribe($$self, _focusedRootDescendants, function ($$value) {
    return $$invalidate(3, $_focusedRootDescendants = $$value);
  });
  validate_store(_currentLevel, '_currentLevel');
  component_subscribe($$self, _currentLevel, function ($$value) {
    return $$invalidate(4, $_currentLevel = $$value);
  });
  validate_store(_focusedRoot, '_focusedRoot');
  component_subscribe($$self, _focusedRoot, function ($$value) {
    return $$invalidate(5, $_focusedRoot = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('GeoFilterModal', slots, []);
  var focusedRoot = function focusedRoot(_ref3) {
    var rootId = _ref3.detail;
    return focusRoot(rootId);
  };
  var toggledRoot = function toggledRoot(_ref4) {
    var rootId = _ref4.detail;
    return toggleRoot(rootId);
  };
  var toggledRegion = function toggledRegion(_ref5) {
    var regionId = _ref5.detail;
    return toggleFocusedRootDescendant(regionId);
  };
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<GeoFilterModal> was created with unknown prop '".concat(key, "'"));
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$capture_state = function () {
    return {
      _currentLevel: _currentLevel,
      _focusedRoot: _focusedRoot,
      _focusedRootDescendants: _focusedRootDescendants,
      _focusedRootId: _focusedRootId,
      _isMenuExpanded: _isMenuExpanded,
      _roots: _roots,
      deselectAllFocusedRootChildren: deselectAllFocusedRootChildren,
      deselectAllRoots: deselectAllRoots,
      focusRoot: focusRoot,
      selectAllFocusedRootChildren: selectAllFocusedRootChildren,
      selectAllRoots: selectAllRoots,
      toggleFocusedRootDescendant: toggleFocusedRootDescendant,
      toggleRoot: toggleRoot,
      RegionsSelector: RegionsSelector$1,
      focusedRoot: focusedRoot,
      toggledRoot: toggledRoot,
      toggledRegion: toggledRegion,
      $_isMenuExpanded: $_isMenuExpanded,
      $_focusedRootId: $_focusedRootId,
      $_roots: $_roots,
      $_focusedRootDescendants: $_focusedRootDescendants,
      $_currentLevel: $_currentLevel,
      $_focusedRoot: $_focusedRoot
    };
  };
  return [$_isMenuExpanded, $_focusedRootId, $_roots, $_focusedRootDescendants, $_currentLevel, $_focusedRoot, focusedRoot, toggledRoot, toggledRegion, click_handler, keydown_handler];
}
var GeoFilterModal = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(GeoFilterModal, _SvelteComponentDev);
  var _super = _createSuper$7(GeoFilterModal);
  function GeoFilterModal(options) {
    var _this;
    _classCallCheck(this, GeoFilterModal);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "GeoFilterModal",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }
  return _createClass(GeoFilterModal);
}(SvelteComponentDev);
var GeoFilterModal$1 = GeoFilterModal;

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "../../components/time_region_value/src/lib/components/Header.svelte";

// (84:1) {#if showChevron}
function create_if_block_2$3(ctx) {
  var div;
  var icon;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: ChevronDown,
      size: 30,
      strokeWidth: 1.5
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
        class: true,
        role: true
      });
      var div_nodes = children(div);
      claim_component(icon.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "clickable chevron svelte-8lug11");
      attr_dev(div, "role", "none");
      add_location(div, file$6, 84, 2, 1862);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(div, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(div, "mousedown", /*savePointerPosition*/ctx[5], false, false, false)];
        mounted = true;
      }
    },
    p: noop$1,
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
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$3.name,
    type: "if",
    source: "(84:1) {#if showChevron}",
    ctx: ctx
  });
  return block;
}

// (102:1) {#if !$_isSmallScreen}
function create_if_block_1$4(ctx) {
  var div;
  var icon;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: Info,
      size: 30,
      strokeWidth: 1.5
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
      attr_dev(div, "class", "clickable info svelte-8lug11");
      add_location(div, file$6, 102, 2, 2165);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div, "click", /*click_handler*/ctx[22], false, false, false), listen_dev(div, "keydown", /*keydown_handler*/ctx[23], false, false, false)];
        mounted = true;
      }
    },
    p: noop$1,
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
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$4.name,
    type: "if",
    source: "(102:1) {#if !$_isSmallScreen}",
    ctx: ctx
  });
  return block;
}

// (170:1) {:else}
function create_else_block$3(ctx) {
  var p;
  var t;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      p = element("p");
      t = text("Tap on title to fold");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "Tap on title to fold");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "clickable foldMessage svelte-8lug11");
      add_location(p, file$6, 170, 2, 3309);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, t);
      if (!mounted) {
        dispose = [listen_dev(p, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(p, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(p, "mousedown", /*savePointerPosition*/ctx[5], false, false, false)];
        mounted = true;
      }
    },
    p: noop$1,
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(170:1) {:else}",
    ctx: ctx
  });
  return block;
}

// (149:1) {#if !$_isSmallScreen}
function create_if_block$5(ctx) {
  var div;
  var icon;
  var t0;
  var p;
  var t1;
  var current;
  var mounted;
  var dispose;
  icon = new Icon({
    props: {
      glyph: Info,
      size: 30,
      strokeWidth: 1.5
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(icon.$$.fragment);
      t0 = space();
      p = element("p");
      t1 = text("Click on title to fold");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(icon.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, "Click on title to fold");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "clickable info svelte-8lug11");
      add_location(div, file$6, 149, 2, 2982);
      attr_dev(p, "class", "clickable foldMessage svelte-8lug11");
      add_location(p, file$6, 161, 2, 3123);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(icon, div, null);
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, t1);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div, "click", /*click_handler_1*/ctx[20], false, false, false), listen_dev(div, "keydown", /*keydown_handler_1*/ctx[21], false, false, false), listen_dev(p, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(p, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(p, "mousedown", /*savePointerPosition*/ctx[5], false, false, false)];
        mounted = true;
      }
    },
    p: noop$1,
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(p);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(149:1) {#if !$_isSmallScreen}",
    ctx: ctx
  });
  return block;
}
function create_fragment$6(ctx) {
  var header0;
  var div0;
  var h10;
  var t0;
  var t1;
  var p0;
  var t2;
  var t3;
  var t4;
  var t5;
  var header1;
  var div1;
  var h11;
  var t6;
  var t7;
  var p1;
  var t8;
  var t9;
  var div2;
  var icon;
  var t10;
  var current_block_type_index;
  var if_block2;
  var current;
  var mounted;
  var dispose;
  var if_block0 = /*showChevron*/ctx[3] && create_if_block_2$3(ctx);
  var if_block1 = ! /*$_isSmallScreen*/ctx[4] && create_if_block_1$4(ctx);
  icon = new Icon({
    props: {
      glyph: ChevronUp,
      size: 30,
      strokeWidth: 1.5
    },
    $$inline: true
  });
  var if_block_creators = [create_if_block$5, create_else_block$3];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (! /*$_isSmallScreen*/ctx[4]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      header0 = element("header");
      div0 = element("div");
      h10 = element("h1");
      t0 = text( /*title*/ctx[1]);
      t1 = space();
      p0 = element("p");
      t2 = text( /*subtitle*/ctx[0]);
      t3 = space();
      if (if_block0) if_block0.c();
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      header1 = element("header");
      div1 = element("div");
      h11 = element("h1");
      t6 = text( /*title*/ctx[1]);
      t7 = space();
      p1 = element("p");
      t8 = text( /*subtitle*/ctx[0]);
      t9 = space();
      div2 = element("div");
      create_component(icon.$$.fragment);
      t10 = space();
      if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      header0 = claim_element(nodes, "HEADER", {
        class: true
      });
      var header0_nodes = children(header0);
      div0 = claim_element(header0_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h10 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h10_nodes = children(h10);
      t0 = claim_text(h10_nodes, /*title*/ctx[1]);
      h10_nodes.forEach(detach_dev);
      t1 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t2 = claim_text(p0_nodes, /*subtitle*/ctx[0]);
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(header0_nodes);
      if (if_block0) if_block0.l(header0_nodes);
      t4 = claim_space(header0_nodes);
      if (if_block1) if_block1.l(header0_nodes);
      header0_nodes.forEach(detach_dev);
      t5 = claim_space(nodes);
      header1 = claim_element(nodes, "HEADER", {
        class: true,
        role: true
      });
      var header1_nodes = children(header1);
      div1 = claim_element(header1_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h11 = claim_element(div1_nodes, "H1", {
        class: true
      });
      var h11_nodes = children(h11);
      t6 = claim_text(h11_nodes, /*title*/ctx[1]);
      h11_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t8 = claim_text(p1_nodes, /*subtitle*/ctx[0]);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(header1_nodes);
      div2 = claim_element(header1_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      claim_component(icon.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      t10 = claim_space(header1_nodes);
      if_block2.l(header1_nodes);
      header1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h10, "class", "svelte-8lug11");
      add_location(h10, file$6, 79, 2, 1718);
      attr_dev(p0, "class", "svelte-8lug11");
      add_location(p0, file$6, 80, 2, 1774);
      attr_dev(div0, "class", "clickable title svelte-8lug11");
      add_location(div0, file$6, 73, 1, 1583);
      attr_dev(header0, "class", "svelte-8lug11");
      add_location(header0, file$6, 72, 0, 1573);
      attr_dev(h11, "class", "svelte-8lug11");
      add_location(h11, file$6, 129, 2, 2582);
      attr_dev(p1, "class", "svelte-8lug11");
      add_location(p1, file$6, 130, 2, 2642);
      attr_dev(div1, "class", "clickable title svelte-8lug11");
      add_location(div1, file$6, 123, 1, 2447);
      attr_dev(div2, "class", "clickable chevron svelte-8lug11");
      add_location(div2, file$6, 133, 1, 2714);
      attr_dev(header1, "class", "fullTitle svelte-8lug11");
      attr_dev(header1, "role", "none");
      toggle_class(header1, "isHeaderOpen", /*isHeaderOpen*/ctx[2]);
      add_location(header1, file$6, 118, 0, 2384);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, header0, anchor);
      append_hydration_dev(header0, div0);
      append_hydration_dev(div0, h10);
      append_hydration_dev(h10, t0);
      append_hydration_dev(div0, t1);
      append_hydration_dev(div0, p0);
      append_hydration_dev(p0, t2);
      append_hydration_dev(header0, t3);
      if (if_block0) if_block0.m(header0, null);
      append_hydration_dev(header0, t4);
      if (if_block1) if_block1.m(header0, null);
      insert_hydration_dev(target, t5, anchor);
      insert_hydration_dev(target, header1, anchor);
      append_hydration_dev(header1, div1);
      append_hydration_dev(div1, h11);
      append_hydration_dev(h11, t6);
      append_hydration_dev(div1, t7);
      append_hydration_dev(div1, p1);
      append_hydration_dev(p1, t8);
      append_hydration_dev(header1, t9);
      append_hydration_dev(header1, div2);
      mount_component(icon, div2, null);
      append_hydration_dev(header1, t10);
      if_blocks[current_block_type_index].m(header1, null);
      current = true;
      if (!mounted) {
        dispose = [action_destroyer(/*titleObserver*/ctx[9].call(null, h10, 'contentBoxSize')), action_destroyer(/*subtitleObserver*/ctx[11].call(null, p0, 'contentBoxSize')), listen_dev(div0, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(div0, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(div0, "mousedown", /*savePointerPosition*/ctx[5], false, false, false), action_destroyer(/*fullTitleObserver*/ctx[13].call(null, h11, 'contentBoxSize')), action_destroyer(/*fullSubtitleObserver*/ctx[15].call(null, p1, 'contentBoxSize')), listen_dev(div1, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(div1, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(div1, "mousedown", /*savePointerPosition*/ctx[5], false, false, false), listen_dev(div2, "click", /*clickToggleHeader*/ctx[6], false, false, false), listen_dev(div2, "keydown", /*keyToggleHeader*/ctx[7], false, false, false), listen_dev(div2, "mousedown", /*savePointerPosition*/ctx[5], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (!current || dirty & /*title*/2) set_data_dev(t0, /*title*/ctx[1]);
      if (!current || dirty & /*subtitle*/1) set_data_dev(t2, /*subtitle*/ctx[0]);
      if ( /*showChevron*/ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*showChevron*/8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(header0, t4);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      if (! /*$_isSmallScreen*/ctx[4]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*$_isSmallScreen*/16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$4(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(header0, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*title*/2) set_data_dev(t6, /*title*/ctx[1]);
      if (!current || dirty & /*subtitle*/1) set_data_dev(t8, /*subtitle*/ctx[0]);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block2 = if_blocks[current_block_type_index];
        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block2.c();
        } else {
          if_block2.p(ctx, dirty);
        }
        transition_in(if_block2, 1);
        if_block2.m(header1, null);
      }
      if (!current || dirty & /*isHeaderOpen*/4) {
        toggle_class(header1, "isHeaderOpen", /*isHeaderOpen*/ctx[2]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(icon.$$.fragment, local);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(icon.$$.fragment, local);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header0);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (detaching) detach_dev(t5);
      if (detaching) detach_dev(header1);
      destroy_component(icon);
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$6($$self, $$props, $$invalidate) {
  var showChevron;
  var $_fullSubtitleSize;
  var $_subtitleSize;
  var $_fullTitleSize;
  var $_titleSize;
  var $_isSmallScreen;
  validate_store(_isSmallScreen, '_isSmallScreen');
  component_subscribe($$self, _isSmallScreen, function ($$value) {
    return $$invalidate(4, $_isSmallScreen = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('Header', slots, []);
  var _$$props$subtitle = $$props.subtitle,
    subtitle = _$$props$subtitle === void 0 ? null : _$$props$subtitle;
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var clickCoord = {
    x: 0,
    y: 0
  };
  var isHeaderOpen = false;
  var savePointerPosition = function savePointerPosition(event) {
    var clientX = event.clientX,
      clientY = event.clientY,
      clickCount = event.detail;
    clickCoord.x = clientX;
    clickCoord.y = clientY;
    if (clickCount > 1) {
      event.preventDefault();
    }
  };

  // toggling
  var toggleHeader = function toggleHeader() {
    $$invalidate(2, isHeaderOpen = !isHeaderOpen);
  };
  var clickToggleHeader = function clickToggleHeader(_ref3) {
    var clientX = _ref3.clientX,
      clientY = _ref3.clientY;
    var wasMouseDragged = clientX - clickCoord.x + clientY - clickCoord.y;
    if (!wasMouseDragged) {
      toggleHeader();
    }
  };
  var keyToggleHeader = function keyToggleHeader(event) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      toggleHeader();
    }
  };

  // resize
  var _setupResizeObserver = setupResizeObserver(),
    _titleSize = _setupResizeObserver._writable,
    titleObserver = _setupResizeObserver.resizeObserver;
  validate_store(_titleSize, '_titleSize');
  component_subscribe($$self, _titleSize, function (value) {
    return $$invalidate(19, $_titleSize = value);
  });
  var _setupResizeObserver2 = setupResizeObserver(),
    _subtitleSize = _setupResizeObserver2._writable,
    subtitleObserver = _setupResizeObserver2.resizeObserver;
  validate_store(_subtitleSize, '_subtitleSize');
  component_subscribe($$self, _subtitleSize, function (value) {
    return $$invalidate(17, $_subtitleSize = value);
  });
  var _setupResizeObserver3 = setupResizeObserver(),
    _fullTitleSize = _setupResizeObserver3._writable,
    fullTitleObserver = _setupResizeObserver3.resizeObserver;
  validate_store(_fullTitleSize, '_fullTitleSize');
  component_subscribe($$self, _fullTitleSize, function (value) {
    return $$invalidate(18, $_fullTitleSize = value);
  });
  var _setupResizeObserver4 = setupResizeObserver(),
    _fullSubtitleSize = _setupResizeObserver4._writable,
    fullSubtitleObserver = _setupResizeObserver4.resizeObserver;
  validate_store(_fullSubtitleSize, '_fullSubtitleSize');
  component_subscribe($$self, _fullSubtitleSize, function (value) {
    return $$invalidate(16, $_fullSubtitleSize = value);
  });
  var writable_props = ['subtitle', 'title'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Header> was created with unknown prop '".concat(key, "'"));
  });
  function click_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = function ($$props) {
    if ('subtitle' in $$props) $$invalidate(0, subtitle = $$props.subtitle);
    if ('title' in $$props) $$invalidate(1, title = $$props.title);
  };
  $$self.$capture_state = function () {
    return {
      ChevronDown: ChevronDown,
      ChevronUp: ChevronUp,
      Icon: Icon,
      Info: Info,
      setupResizeObserver: setupResizeObserver,
      _isSmallScreen: _isSmallScreen,
      subtitle: subtitle,
      title: title,
      clickCoord: clickCoord,
      isHeaderOpen: isHeaderOpen,
      savePointerPosition: savePointerPosition,
      toggleHeader: toggleHeader,
      clickToggleHeader: clickToggleHeader,
      keyToggleHeader: keyToggleHeader,
      _titleSize: _titleSize,
      titleObserver: titleObserver,
      _subtitleSize: _subtitleSize,
      subtitleObserver: subtitleObserver,
      _fullTitleSize: _fullTitleSize,
      fullTitleObserver: fullTitleObserver,
      _fullSubtitleSize: _fullSubtitleSize,
      fullSubtitleObserver: fullSubtitleObserver,
      showChevron: showChevron,
      $_fullSubtitleSize: $_fullSubtitleSize,
      $_subtitleSize: $_subtitleSize,
      $_fullTitleSize: $_fullTitleSize,
      $_titleSize: $_titleSize,
      $_isSmallScreen: $_isSmallScreen
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('subtitle' in $$props) $$invalidate(0, subtitle = $$props.subtitle);
    if ('title' in $$props) $$invalidate(1, title = $$props.title);
    if ('clickCoord' in $$props) clickCoord = $$props.clickCoord;
    if ('isHeaderOpen' in $$props) $$invalidate(2, isHeaderOpen = $$props.isHeaderOpen);
    if ('showChevron' in $$props) $$invalidate(3, showChevron = $$props.showChevron);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*$_titleSize, $_fullTitleSize, $_subtitleSize, $_fullSubtitleSize*/983040) {
      $$invalidate(3, showChevron = $_titleSize.blockSize < $_fullTitleSize.blockSize || $_subtitleSize.blockSize < $_fullSubtitleSize.blockSize);
    }
    if ($$self.$$.dirty & /*isHeaderOpen, showChevron*/12) {
      $$invalidate(2, isHeaderOpen = isHeaderOpen && showChevron);
    }
  };
  return [subtitle, title, isHeaderOpen, showChevron, $_isSmallScreen, savePointerPosition, clickToggleHeader, keyToggleHeader, _titleSize, titleObserver, _subtitleSize, subtitleObserver, _fullTitleSize, fullTitleObserver, _fullSubtitleSize, fullSubtitleObserver, $_fullSubtitleSize, $_subtitleSize, $_fullTitleSize, $_titleSize, click_handler_1, keydown_handler_1, click_handler, keydown_handler];
}
var Header = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Header, _SvelteComponentDev);
  var _super = _createSuper$6(Header);
  function Header(options) {
    var _this;
    _classCallCheck(this, Header);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      subtitle: 0,
      title: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Header",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }
  _createClass(Header, [{
    key: "subtitle",
    get: function get() {
      throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return Header;
}(SvelteComponentDev);
var Header$1 = Header;

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "../../components/time_region_value/src/lib/components/Info/PolymorphicString.svelte";
function get_each_context_2$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}
function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[2] = list[i][0];
  child_ctx[3] = list[i][1];
  return child_ctx;
}
function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}

// (34:1) {:else}
function create_else_block_1$1(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var t3;
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[1]);
      t1 = text(":");
      t2 = space();
      t3 = text( /*item*/ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[1]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      t2 = claim_space(p_nodes);
      t3 = claim_text(p_nodes, /*item*/ctx[0]);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$5, 34, 5, 639);
      add_location(p, file$5, 34, 2, 636);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      append_hydration_dev(p, t2);
      append_hydration_dev(p, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*title*/2) set_data_dev(t0, /*title*/ctx[1]);
      if (dirty & /*item*/1) set_data_dev(t3, /*item*/ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1$1.name,
    type: "else",
    source: "(34:1) {:else}",
    ctx: ctx
  });
  return block;
}

// (27:25) 
function create_if_block_2$2(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var ul;
  var each_value_2 = /*item*/ctx[0];
  validate_each_argument(each_value_2);
  var each_blocks = [];
  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
  }
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[1]);
      t1 = text(":");
      t2 = space();
      ul = element("ul");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[1]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      p_nodes.forEach(detach_dev);
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
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$5, 27, 5, 518);
      add_location(p, file$5, 27, 2, 515);
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$5, 28, 2, 540);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty & /*title*/2) set_data_dev(t0, /*title*/ctx[1]);
      if (dirty & /*item*/1) {
        each_value_2 = /*item*/ctx[0];
        validate_each_argument(each_value_2);
        var _i4;
        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2$1(ctx, each_value_2, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2$1(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(ul, null);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$2.name,
    type: "if",
    source: "(27:25) ",
    ctx: ctx
  });
  return block;
}

// (10:1) {#if isObject(item)}
function create_if_block$4(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var ul;
  var each_value = pairs( /*item*/ctx[0]);
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[1]);
      t1 = text(":");
      t2 = space();
      ul = element("ul");
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[1]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      p_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(ul_nodes);
      }
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$5, 10, 5, 185);
      add_location(p, file$5, 10, 2, 182);
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$5, 11, 2, 207);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty & /*title*/2) set_data_dev(t0, /*title*/ctx[1]);
      if (dirty & /*pairs, item, isArray*/1) {
        each_value = pairs( /*item*/ctx[0]);
        validate_each_argument(each_value);
        var _i8;
        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i8);
          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block$2(child_ctx);
            each_blocks[_i8].c();
            each_blocks[_i8].m(ul, null);
          }
        }
        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(10:1) {#if isObject(item)}",
    ctx: ctx
  });
  return block;
}

// (30:3) {#each item as string}
function create_each_block_2$1(ctx) {
  var li;
  var span;
  var t_value = /*string*/ctx[6] + "";
  var t;
  var block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$5, 30, 8, 579);
      add_location(li, file$5, 30, 4, 575);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*item*/1 && t_value !== (t_value = /*string*/ctx[6] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2$1.name,
    type: "each",
    source: "(30:3) {#each item as string}",
    ctx: ctx
  });
  return block;
}

// (22:4) {:else}
function create_else_block$2(ctx) {
  var li;
  var span;
  var t_value = /*value*/ctx[3] + "";
  var t;
  var block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$5, 22, 9, 432);
      add_location(li, file$5, 22, 5, 428);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*item*/1 && t_value !== (t_value = /*value*/ctx[3] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(22:4) {:else}",
    ctx: ctx
  });
  return block;
}

// (14:4) {#if isArray(value)}
function create_if_block_1$3(ctx) {
  var li;
  var t0_value = /*key*/ctx[2] + "";
  var t0;
  var t1;
  var ul;
  var t2;
  var each_value_1 = /*value*/ctx[3];
  validate_each_argument(each_value_1);
  var each_blocks = [];
  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(":\n\t\t\t\t\t\t");
      ul = element("ul");
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_text(li_nodes, ":\n\t\t\t\t\t\t");
      ul = claim_element(li_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(ul_nodes);
      }
      ul_nodes.forEach(detach_dev);
      t2 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$5, 15, 6, 298);
      add_location(li, file$5, 14, 5, 281);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t0);
      append_hydration_dev(li, t1);
      append_hydration_dev(li, ul);
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(ul, null);
      }
      append_hydration_dev(li, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*item*/1 && t0_value !== (t0_value = /*key*/ctx[2] + "")) set_data_dev(t0, t0_value);
      if (dirty & /*pairs, item*/1) {
        each_value_1 = /*value*/ctx[3];
        validate_each_argument(each_value_1);
        var _i12;
        for (_i12 = 0; _i12 < each_value_1.length; _i12 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i12);
          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block_1$1(child_ctx);
            each_blocks[_i12].c();
            each_blocks[_i12].m(ul, null);
          }
        }
        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(14:4) {#if isArray(value)}",
    ctx: ctx
  });
  return block;
}

// (17:7) {#each value as string}
function create_each_block_1$1(ctx) {
  var li;
  var span;
  var t_value = /*string*/ctx[6] + "";
  var t;
  var block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$5, 17, 12, 346);
      add_location(li, file$5, 17, 8, 342);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*item*/1 && t_value !== (t_value = /*string*/ctx[6] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(17:7) {#each value as string}",
    ctx: ctx
  });
  return block;
}

// (13:3) {#each pairs(item) as [key, value]}
function create_each_block$2(ctx) {
  var show_if;
  var if_block_anchor;
  function select_block_type_1(ctx, dirty) {
    if (dirty & /*item*/1) show_if = null;
    if (show_if == null) show_if = !!isArray( /*value*/ctx[3]);
    if (show_if) return create_if_block_1$3;
    return create_else_block$2;
  }
  var current_block_type = select_block_type_1(ctx, -1);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(13:3) {#each pairs(item) as [key, value]}",
    ctx: ctx
  });
  return block;
}
function create_fragment$5(ctx) {
  var div;
  var show_if;
  var show_if_1;
  function select_block_type(ctx, dirty) {
    if (dirty & /*item*/1) show_if = null;
    if (dirty & /*item*/1) show_if_1 = null;
    if (show_if == null) show_if = !!isObject( /*item*/ctx[0]);
    if (show_if) return create_if_block$4;
    if (show_if_1 == null) show_if_1 = !!isArray( /*item*/ctx[0]);
    if (show_if_1) return create_if_block_2$2;
    return create_else_block_1$1;
  }
  var current_block_type = select_block_type(ctx, -1);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div, file$5, 8, 0, 152);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if_block.m(div, null);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}
function instance$5($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('PolymorphicString', slots, []);
  var _$$props$item = $$props.item,
    item = _$$props$item === void 0 ? null : _$$props$item;
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var writable_props = ['item', 'title'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PolymorphicString> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('item' in $$props) $$invalidate(0, item = $$props.item);
    if ('title' in $$props) $$invalidate(1, title = $$props.title);
  };
  $$self.$capture_state = function () {
    return {
      isArray: isArray,
      isObject: isObject,
      pairs: pairs,
      item: item,
      title: title
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('item' in $$props) $$invalidate(0, item = $$props.item);
    if ('title' in $$props) $$invalidate(1, title = $$props.title);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [item, title];
}
var PolymorphicString = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(PolymorphicString, _SvelteComponentDev);
  var _super = _createSuper$5(PolymorphicString);
  function PolymorphicString(options) {
    var _this;
    _classCallCheck(this, PolymorphicString);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      item: 0,
      title: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "PolymorphicString",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }
  _createClass(PolymorphicString, [{
    key: "item",
    get: function get() {
      throw new Error("<PolymorphicString>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PolymorphicString>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<PolymorphicString>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PolymorphicString>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return PolymorphicString;
}(SvelteComponentDev);
var PolymorphicString$1 = PolymorphicString;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "../../components/time_region_value/src/lib/components/Info/PolymorphicURL.svelte";
function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
}
function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[3] = list[i][0];
  child_ctx[4] = list[i][1];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
}

// (53:1) {:else}
function create_else_block_1(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var link;
  var current;
  link = new Link({
    props: {
      href: /*item*/ctx[0],
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[2]);
      t1 = text(":");
      t2 = space();
      create_component(link.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[2]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      t2 = claim_space(p_nodes);
      claim_component(link.$$.fragment, p_nodes);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$4, 54, 3, 894);
      add_location(p, file$4, 53, 2, 887);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      append_hydration_dev(p, t2);
      mount_component(link, p, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty & /*title*/4) set_data_dev(t0, /*title*/ctx[2]);
      var link_changes = {};
      if (dirty & /*item*/1) link_changes.href = /*item*/ctx[0];
      if (dirty & /*$$scope, text*/2050) {
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
      if (detaching) detach_dev(p);
      destroy_component(link);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(53:1) {:else}",
    ctx: ctx
  });
  return block;
}

// (41:25) 
function create_if_block_2$1(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var ul;
  var current;
  var each_value_2 = /*item*/ctx[0];
  validate_each_argument(each_value_2);
  var each_blocks = [];
  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[2]);
      t1 = text(":");
      t2 = space();
      ul = element("ul");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[2]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      p_nodes.forEach(detach_dev);
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
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$4, 42, 3, 722);
      add_location(p, file$4, 41, 2, 715);
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$4, 44, 2, 747);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty & /*title*/4) set_data_dev(t0, /*title*/ctx[2]);
      if (dirty & /*item*/1) {
        each_value_2 = /*item*/ctx[0];
        validate_each_argument(each_value_2);
        var _i4;
        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_2(child_ctx);
            each_blocks[_i4].c();
            transition_in(each_blocks[_i4], 1);
            each_blocks[_i4].m(ul, null);
          }
        }
        group_outros();
        for (_i4 = each_value_2.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      for (var _i5 = 0; _i5 < each_value_2.length; _i5 += 1) {
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
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(41:25) ",
    ctx: ctx
  });
  return block;
}

// (12:1) {#if isObject(item)}
function create_if_block$3(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var ul;
  var current;
  var each_value = pairs( /*item*/ctx[0]);
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
      p = element("p");
      b = element("b");
      t0 = text( /*title*/ctx[2]);
      t1 = text(":");
      t2 = space();
      ul = element("ul");
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, /*title*/ctx[2]);
      t1 = claim_text(b_nodes, ":");
      b_nodes.forEach(detach_dev);
      p_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(ul_nodes);
      }
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1o74auc");
      add_location(b, file$4, 13, 3, 249);
      add_location(p, file$4, 12, 2, 242);
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$4, 15, 2, 274);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(b, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(ul, null);
      }
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty & /*title*/4) set_data_dev(t0, /*title*/ctx[2]);
      if (dirty & /*pairs, item, isArray*/1) {
        each_value = pairs( /*item*/ctx[0]);
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
            each_blocks[_i10].m(ul, null);
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
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(12:1) {#if isObject(item)}",
    ctx: ctx
  });
  return block;
}

// (56:3) <Link href={item}>
function create_default_slot_3(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text( /*text*/ctx[1]);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, /*text*/ctx[1]);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*text*/2) set_data_dev(t, /*text*/ctx[1]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(56:3) <Link href={item}>",
    ctx: ctx
  });
  return block;
}

// (49:6) <Link {href}>
function create_default_slot_2(ctx) {
  var t0;
  var t1_value = /*index*/ctx[9] + 1 + "";
  var t1;
  var block = {
    c: function create() {
      t0 = text("Link ");
      t1 = text(t1_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, "Link ");
      t1 = claim_text(nodes, t1_value);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, t1, anchor);
    },
    p: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(49:6) <Link {href}>",
    ctx: ctx
  });
  return block;
}

// (46:3) {#each item as href, index}
function create_each_block_2(ctx) {
  var li;
  var span;
  var link;
  var t;
  var current;
  link = new Link({
    props: {
      href: /*href*/ctx[7],
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      li = element("li");
      span = element("span");
      create_component(link.$$.fragment);
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      claim_component(link.$$.fragment, span_nodes);
      t = claim_space(span_nodes);
      span_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$4, 47, 5, 797);
      add_location(li, file$4, 46, 4, 787);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      mount_component(link, span, null);
      append_hydration_dev(span, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var link_changes = {};
      if (dirty & /*item*/1) link_changes.href = /*href*/ctx[7];
      if (dirty & /*$$scope*/2048) {
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
      if (detaching) detach_dev(li);
      destroy_component(link);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(46:3) {#each item as href, index}",
    ctx: ctx
  });
  return block;
}

// (31:4) {:else}
function create_else_block$1(ctx) {
  var li;
  var span;
  var link;
  var t;
  var current;
  link = new Link({
    props: {
      href: /*value*/ctx[4],
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      li = element("li");
      span = element("span");
      create_component(link.$$.fragment);
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      claim_component(link.$$.fragment, span_nodes);
      span_nodes.forEach(detach_dev);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$4, 32, 6, 586);
      add_location(li, file$4, 31, 5, 575);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      mount_component(link, span, null);
      append_hydration_dev(li, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var link_changes = {};
      if (dirty & /*item*/1) link_changes.href = /*value*/ctx[4];
      if (dirty & /*$$scope, item*/2049) {
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
      if (detaching) detach_dev(li);
      destroy_component(link);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(31:4) {:else}",
    ctx: ctx
  });
  return block;
}

// (18:4) {#if isArray(value)}
function create_if_block_1$2(ctx) {
  var li;
  var t0_value = /*key*/ctx[3] + "";
  var t0;
  var t1;
  var ul;
  var t2;
  var current;
  var each_value_1 = /*value*/ctx[4];
  validate_each_argument(each_value_1);
  var each_blocks = [];
  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(":\n\t\t\t\t\t\t");
      ul = element("ul");
      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_text(li_nodes, ":\n\t\t\t\t\t\t");
      ul = claim_element(li_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(ul_nodes);
      }
      ul_nodes.forEach(detach_dev);
      t2 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "svelte-1o74auc");
      add_location(ul, file$4, 20, 6, 372);
      add_location(li, file$4, 18, 5, 348);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t0);
      append_hydration_dev(li, t1);
      append_hydration_dev(li, ul);
      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].m(ul, null);
      }
      append_hydration_dev(li, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty & /*item*/1) && t0_value !== (t0_value = /*key*/ctx[3] + "")) set_data_dev(t0, t0_value);
      if (dirty & /*pairs, item*/1) {
        each_value_1 = /*value*/ctx[4];
        validate_each_argument(each_value_1);
        var _i16;
        for (_i16 = 0; _i16 < each_value_1.length; _i16 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i16);
          if (each_blocks[_i16]) {
            each_blocks[_i16].p(child_ctx, dirty);
            transition_in(each_blocks[_i16], 1);
          } else {
            each_blocks[_i16] = create_each_block_1(child_ctx);
            each_blocks[_i16].c();
            transition_in(each_blocks[_i16], 1);
            each_blocks[_i16].m(ul, null);
          }
        }
        group_outros();
        for (_i16 = each_value_1.length; _i16 < each_blocks.length; _i16 += 1) {
          out(_i16);
        }
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      for (var _i17 = 0; _i17 < each_value_1.length; _i17 += 1) {
        transition_in(each_blocks[_i17]);
      }
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        transition_out(each_blocks[_i18]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(18:4) {#if isArray(value)}",
    ctx: ctx
  });
  return block;
}

// (34:7) <Link href={value}>
function create_default_slot_1(ctx) {
  var t_value = /*key*/ctx[3] + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*item*/1 && t_value !== (t_value = /*key*/ctx[3] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(34:7) <Link href={value}>",
    ctx: ctx
  });
  return block;
}

// (25:10) <Link {href}>
function create_default_slot(ctx) {
  var t0;
  var t1_value = /*index*/ctx[9] + 1 + "";
  var t1;
  var block = {
    c: function create() {
      t0 = text("Link ");
      t1 = text(t1_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, "Link ");
      t1 = claim_text(nodes, t1_value);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, t1, anchor);
    },
    p: noop$1,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(25:10) <Link {href}>",
    ctx: ctx
  });
  return block;
}

// (22:7) {#each value as href, index}
function create_each_block_1(ctx) {
  var li;
  var span;
  var link;
  var t;
  var current;
  link = new Link({
    props: {
      href: /*href*/ctx[7],
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
      li = element("li");
      span = element("span");
      create_component(link.$$.fragment);
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      span = claim_element(li_nodes, "SPAN", {});
      var span_nodes = children(span);
      claim_component(link.$$.fragment, span_nodes);
      span_nodes.forEach(detach_dev);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$4, 23, 9, 435);
      add_location(li, file$4, 22, 8, 421);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, span);
      mount_component(link, span, null);
      append_hydration_dev(li, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var link_changes = {};
      if (dirty & /*item*/1) link_changes.href = /*href*/ctx[7];
      if (dirty & /*$$scope*/2048) {
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
      if (detaching) detach_dev(li);
      destroy_component(link);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(22:7) {#each value as href, index}",
    ctx: ctx
  });
  return block;
}

// (17:3) {#each pairs(item) as [key, value]}
function create_each_block$1(ctx) {
  var show_if;
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block_1$2, create_else_block$1];
  var if_blocks = [];
  function select_block_type_1(ctx, dirty) {
    if (dirty & /*item*/1) show_if = null;
    if (show_if == null) show_if = !!isArray( /*value*/ctx[4]);
    if (show_if) return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(17:3) {#each pairs(item) as [key, value]}",
    ctx: ctx
  });
  return block;
}
function create_fragment$4(ctx) {
  var div;
  var show_if;
  var show_if_1;
  var current_block_type_index;
  var if_block;
  var current;
  var if_block_creators = [create_if_block$3, create_if_block_2$1, create_else_block_1];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (dirty & /*item*/1) show_if = null;
    if (dirty & /*item*/1) show_if_1 = null;
    if (show_if == null) show_if = !!isObject( /*item*/ctx[0]);
    if (show_if) return 0;
    if (show_if_1 == null) show_if_1 = !!isArray( /*item*/ctx[0]);
    if (show_if_1) return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div, file$4, 10, 0, 212);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if_blocks[current_block_type_index].d();
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
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('PolymorphicURL', slots, []);
  var _$$props$item = $$props.item,
    item = _$$props$item === void 0 ? null : _$$props$item;
  var _$$props$text = $$props.text,
    text = _$$props$text === void 0 ? null : _$$props$text;
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var writable_props = ['item', 'text', 'title'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PolymorphicURL> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('item' in $$props) $$invalidate(0, item = $$props.item);
    if ('text' in $$props) $$invalidate(1, text = $$props.text);
    if ('title' in $$props) $$invalidate(2, title = $$props.title);
  };
  $$self.$capture_state = function () {
    return {
      Link: Link,
      isArray: isArray,
      isObject: isObject,
      pairs: pairs,
      item: item,
      text: text,
      title: title
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('item' in $$props) $$invalidate(0, item = $$props.item);
    if ('text' in $$props) $$invalidate(1, text = $$props.text);
    if ('title' in $$props) $$invalidate(2, title = $$props.title);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [item, text, title];
}
var PolymorphicURL = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(PolymorphicURL, _SvelteComponentDev);
  var _super = _createSuper$4(PolymorphicURL);
  function PolymorphicURL(options) {
    var _this;
    _classCallCheck(this, PolymorphicURL);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      item: 0,
      text: 1,
      title: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "PolymorphicURL",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }
  _createClass(PolymorphicURL, [{
    key: "item",
    get: function get() {
      throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "text",
    get: function get() {
      throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return PolymorphicURL;
}(SvelteComponentDev);
var PolymorphicURL$1 = PolymorphicURL;

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "../../components/time_region_value/src/lib/components/Info/InfoView.svelte";
function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  child_ctx[20] = i;
  return child_ctx;
}

// (39:1) {#if description}
function create_if_block_14(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text( /*description*/ctx[3]);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, /*description*/ctx[3]);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "longDesc svelte-1b2hdj4");
      add_location(p, file$3, 39, 2, 989);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*description*/8) set_data_dev(t, /*description*/ctx[3]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_14.name,
    type: "if",
    source: "(39:1) {#if description}",
    ctx: ctx
  });
  return block;
}

// (43:1) {#if date}
function create_if_block_13(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var t2;
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text("Data downloaded on date:");
      t1 = space();
      t2 = text( /*date*/ctx[14]);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, "Data downloaded on date:");
      b_nodes.forEach(detach_dev);
      t1 = claim_space(p_nodes);
      t2 = claim_text(p_nodes, /*date*/ctx[14]);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1b2hdj4");
      add_location(b, file$3, 43, 5, 1052);
      add_location(p, file$3, 43, 2, 1049);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(p, t1);
      append_hydration_dev(p, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*date*/16384) set_data_dev(t2, /*date*/ctx[14]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_13.name,
    type: "if",
    source: "(43:1) {#if date}",
    ctx: ctx
  });
  return block;
}

// (49:2) {#if year_extent[0] !== year_extent[1]}
function create_if_block_12(ctx) {
  var t0;
  var t1_value = /*year_extent*/ctx[13][1] + "";
  var t1;
  var block = {
    c: function create() {
      t0 = text("- ");
      t1 = text(t1_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, "- ");
      t1 = claim_text(nodes, t1_value);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, t1, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*year_extent*/8192 && t1_value !== (t1_value = /*year_extent*/ctx[13][1] + "")) set_data_dev(t1, t1_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_12.name,
    type: "if",
    source: "(49:2) {#if year_extent[0] !== year_extent[1]}",
    ctx: ctx
  });
  return block;
}

// (62:2) {:else}
function create_else_block(ctx) {
  var span;
  var t_value = /*region_types*/ctx[8][0] + "";
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$3, 62, 3, 1405);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*region_types*/256 && t_value !== (t_value = /*region_types*/ctx[8][0] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(62:2) {:else}",
    ctx: ctx
  });
  return block;
}

// (56:2) {#if region_types.length > 1}
function create_if_block_11(ctx) {
  var ui;
  var each_value = /*region_types*/ctx[8];
  validate_each_argument(each_value);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  var block = {
    c: function create() {
      ui = element("ui");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      ui = claim_element(nodes, "UI", {});
      var ui_nodes = children(ui);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ui_nodes);
      }
      ui_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(ui, file$3, 56, 3, 1293);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, ui, anchor);
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ui, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty & /*region_types*/256) {
        each_value = /*region_types*/ctx[8];
        validate_each_argument(each_value);
        var _i4;
        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);
          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);
            each_blocks[_i4].c();
            each_blocks[_i4].m(ui, null);
          }
        }
        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ui);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_11.name,
    type: "if",
    source: "(56:2) {#if region_types.length > 1}",
    ctx: ctx
  });
  return block;
}

// (58:4) {#each region_types as regionType, index}
function create_each_block(ctx) {
  var li;
  var t_value = /*regionType*/ctx[18] + "";
  var t;
  var block = {
    c: function create() {
      li = element("li");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t = claim_text(li_nodes, t_value);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$3, 58, 5, 1349);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, li, anchor);
      append_hydration_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*region_types*/256 && t_value !== (t_value = /*regionType*/ctx[18] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(58:4) {#each region_types as regionType, index}",
    ctx: ctx
  });
  return block;
}

// (67:1) {#if is_experimental}
function create_if_block_10(ctx) {
  var p;
  var t0;
  var b;
  var t1;
  var t2;
  var block = {
    c: function create() {
      p = element("p");
      t0 = text("Note that this indicator is ");
      b = element("b");
      t1 = text("experimental");
      t2 = text(".");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Note that this indicator is ");
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t1 = claim_text(b_nodes, "experimental");
      b_nodes.forEach(detach_dev);
      t2 = claim_text(p_nodes, ".");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1b2hdj4");
      add_location(b, file$3, 68, 31, 1511);
      add_location(p, file$3, 67, 2, 1476);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, t0);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t1);
      append_hydration_dev(p, t2);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_10.name,
    type: "if",
    source: "(67:1) {#if is_experimental}",
    ctx: ctx
  });
  return block;
}

// (73:1) {#if warning}
function create_if_block_9(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var span;
  var t2;
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text("Warning:");
      t1 = space();
      span = element("span");
      t2 = text( /*warning*/ctx[12]);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, "Warning:");
      b_nodes.forEach(detach_dev);
      t1 = claim_space(p_nodes);
      span = claim_element(p_nodes, "SPAN", {});
      var span_nodes = children(span);
      t2 = claim_text(span_nodes, /*warning*/ctx[12]);
      span_nodes.forEach(detach_dev);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1b2hdj4");
      add_location(b, file$3, 74, 3, 1571);
      add_location(span, file$3, 75, 3, 1590);
      add_location(p, file$3, 73, 2, 1564);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(p, t1);
      append_hydration_dev(p, span);
      append_hydration_dev(span, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*warning*/4096) set_data_dev(t2, /*warning*/ctx[12]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_9.name,
    type: "if",
    source: "(73:1) {#if warning}",
    ctx: ctx
  });
  return block;
}

// (80:1) {#if source_name}
function create_if_block_8(ctx) {
  var polymorphicstring;
  var current;
  polymorphicstring = new PolymorphicString$1({
    props: {
      item: /*source_name*/ctx[9],
      title: "Source name"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicstring.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicstring.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicstring, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicstring_changes = {};
      if (dirty & /*source_name*/512) polymorphicstring_changes.item = /*source_name*/ctx[9];
      polymorphicstring.$set(polymorphicstring_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicstring.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicstring.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicstring, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_8.name,
    type: "if",
    source: "(80:1) {#if source_name}",
    ctx: ctx
  });
  return block;
}

// (86:1) {#if source_url}
function create_if_block_7(ctx) {
  var polymorphicurl;
  var current;
  polymorphicurl = new PolymorphicURL$1({
    props: {
      item: /*source_url*/ctx[10],
      text: /*source_url*/ctx[10],
      title: "Source"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicurl.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicurl.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicurl, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicurl_changes = {};
      if (dirty & /*source_url*/1024) polymorphicurl_changes.item = /*source_url*/ctx[10];
      if (dirty & /*source_url*/1024) polymorphicurl_changes.text = /*source_url*/ctx[10];
      polymorphicurl.$set(polymorphicurl_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicurl.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicurl.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicurl, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7.name,
    type: "if",
    source: "(86:1) {#if source_url}",
    ctx: ctx
  });
  return block;
}

// (93:1) {#if api_doc_url}
function create_if_block_6(ctx) {
  var polymorphicurl;
  var current;
  polymorphicurl = new PolymorphicURL$1({
    props: {
      item: /*api_doc_url*/ctx[0],
      text: /*api_doc_url*/ctx[0],
      title: "Source documentation"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicurl.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicurl.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicurl, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicurl_changes = {};
      if (dirty & /*api_doc_url*/1) polymorphicurl_changes.item = /*api_doc_url*/ctx[0];
      if (dirty & /*api_doc_url*/1) polymorphicurl_changes.text = /*api_doc_url*/ctx[0];
      polymorphicurl.$set(polymorphicurl_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicurl.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicurl.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicurl, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(93:1) {#if api_doc_url}",
    ctx: ctx
  });
  return block;
}

// (100:1) {#if endpoint_url}
function create_if_block_5(ctx) {
  var polymorphicurl;
  var current;
  polymorphicurl = new PolymorphicURL$1({
    props: {
      item: /*endpoint_url*/ctx[4],
      text: /*endpoint_url*/ctx[4],
      title: "Source data"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicurl.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicurl.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicurl, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicurl_changes = {};
      if (dirty & /*endpoint_url*/16) polymorphicurl_changes.item = /*endpoint_url*/ctx[4];
      if (dirty & /*endpoint_url*/16) polymorphicurl_changes.text = /*endpoint_url*/ctx[4];
      polymorphicurl.$set(polymorphicurl_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicurl.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicurl.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicurl, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(100:1) {#if endpoint_url}",
    ctx: ctx
  });
  return block;
}

// (107:1) {#if api_type}
function create_if_block_4(ctx) {
  var polymorphicstring;
  var current;
  polymorphicstring = new PolymorphicString$1({
    props: {
      item: /*api_type*/ctx[1],
      title: "API type"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicstring.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicstring.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicstring, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicstring_changes = {};
      if (dirty & /*api_type*/2) polymorphicstring_changes.item = /*api_type*/ctx[1];
      polymorphicstring.$set(polymorphicstring_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicstring.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicstring.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicstring, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(107:1) {#if api_type}",
    ctx: ctx
  });
  return block;
}

// (113:1) {#if query}
function create_if_block_3(ctx) {
  var polymorphicstring;
  var current;
  polymorphicstring = new PolymorphicString$1({
    props: {
      item: /*query*/ctx[7],
      title: "Query"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicstring.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicstring.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicstring, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicstring_changes = {};
      if (dirty & /*query*/128) polymorphicstring_changes.item = /*query*/ctx[7];
      polymorphicstring.$set(polymorphicstring_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicstring.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicstring.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicstring, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(113:1) {#if query}",
    ctx: ctx
  });
  return block;
}

// (119:1) {#if !_.isUndefined(is_experimental)}
function create_if_block_2(ctx) {
  var polymorphicstring;
  var current;
  polymorphicstring = new PolymorphicString$1({
    props: {
      item: /*is_experimental*/ctx[5],
      title: "Experimental"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polymorphicstring.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polymorphicstring.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polymorphicstring, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polymorphicstring_changes = {};
      if (dirty & /*is_experimental*/32) polymorphicstring_changes.item = /*is_experimental*/ctx[5];
      polymorphicstring.$set(polymorphicstring_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polymorphicstring.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polymorphicstring.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polymorphicstring, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(119:1) {#if !_.isUndefined(is_experimental)}",
    ctx: ctx
  });
  return block;
}

// (122:1) {#if !_.isUndefined(is_public) && !is_public}
function create_if_block$2(ctx) {
  var p;
  var b;
  var t0;
  var t1;
  var span;
  var t2;
  var t3;
  var if_block = /*auth_provider*/ctx[2] && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      p = element("p");
      b = element("b");
      t0 = text("Access:");
      t1 = space();
      span = element("span");
      t2 = text("The dataset originally used to create this indicator is not public.");
      t3 = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      b = claim_element(p_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t0 = claim_text(b_nodes, "Access:");
      b_nodes.forEach(detach_dev);
      t1 = claim_space(p_nodes);
      span = claim_element(p_nodes, "SPAN", {});
      var span_nodes = children(span);
      t2 = claim_text(span_nodes, "The dataset originally used to create this indicator is not public.");
      span_nodes.forEach(detach_dev);
      t3 = claim_space(p_nodes);
      if (if_block) if_block.l(p_nodes);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "svelte-1b2hdj4");
      add_location(b, file$3, 123, 3, 2414);
      add_location(span, file$3, 124, 3, 2432);
      add_location(p, file$3, 122, 2, 2407);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, p, anchor);
      append_hydration_dev(p, b);
      append_hydration_dev(b, t0);
      append_hydration_dev(p, t1);
      append_hydration_dev(p, span);
      append_hydration_dev(span, t2);
      append_hydration_dev(p, t3);
      if (if_block) if_block.m(p, null);
    },
    p: function update(ctx, dirty) {
      if ( /*auth_provider*/ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          if_block.m(p, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(122:1) {#if !_.isUndefined(is_public) && !is_public}",
    ctx: ctx
  });
  return block;
}

// (126:3) {#if auth_provider}
function create_if_block_1$1(ctx) {
  var span;
  var t0;
  var t1;
  var t2;
  var block = {
    c: function create() {
      span = element("span");
      t0 = text("Please contact ");
      t1 = text( /*auth_provider*/ctx[2]);
      t2 = text(" for more details about access.");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "Please contact ");
      t1 = claim_text(span_nodes, /*auth_provider*/ctx[2]);
      t2 = claim_text(span_nodes, " for more details about access.");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$3, 126, 4, 2541);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, span, anchor);
      append_hydration_dev(span, t0);
      append_hydration_dev(span, t1);
      append_hydration_dev(span, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*auth_provider*/4) set_data_dev(t1, /*auth_provider*/ctx[2]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(126:3) {#if auth_provider}",
    ctx: ctx
  });
  return block;
}
function create_fragment$3(ctx) {
  var div1;
  var h2;
  var t0;
  var t1;
  var t2;
  var t3;
  var p0;
  var b0;
  var t4;
  var t5;
  var t6_value = /*year_extent*/ctx[13][0] + "";
  var t6;
  var t7;
  var t8;
  var p1;
  var b1;
  var t9;
  var t10;
  var t11;
  var t12;
  var t13;
  var t14;
  var t15;
  var t16;
  var t17;
  var t18;
  var t19;
  var show_if_1 = !isUndefined( /*is_experimental*/ctx[5]);
  var t20;
  var show_if = !isUndefined( /*is_public*/ctx[6]) && ! /*is_public*/ctx[6];
  var t21;
  var div0;
  var linkbutton;
  var current;
  var if_block0 = /*description*/ctx[3] && create_if_block_14(ctx);
  var if_block1 = /*date*/ctx[14] && create_if_block_13(ctx);
  var if_block2 = /*year_extent*/ctx[13][0] !== /*year_extent*/ctx[13][1] && create_if_block_12(ctx);
  function select_block_type(ctx, dirty) {
    if ( /*region_types*/ctx[8].length > 1) return create_if_block_11;
    return create_else_block;
  }
  var current_block_type = select_block_type(ctx);
  var if_block3 = current_block_type(ctx);
  var if_block4 = /*is_experimental*/ctx[5] && create_if_block_10(ctx);
  var if_block5 = /*warning*/ctx[12] && create_if_block_9(ctx);
  var if_block6 = /*source_name*/ctx[9] && create_if_block_8(ctx);
  var if_block7 = /*source_url*/ctx[10] && create_if_block_7(ctx);
  var if_block8 = /*api_doc_url*/ctx[0] && create_if_block_6(ctx);
  var if_block9 = /*endpoint_url*/ctx[4] && create_if_block_5(ctx);
  var if_block10 = /*api_type*/ctx[1] && create_if_block_4(ctx);
  var if_block11 = /*query*/ctx[7] && create_if_block_3(ctx);
  var if_block12 = show_if_1 && create_if_block_2(ctx);
  var if_block13 = show_if && create_if_block$2(ctx);
  linkbutton = new LinkButton({
    props: {
      download: true,
      glyph: Download,
      href: /*url*/ctx[11],
      text: "Download this indicator",
      theme: {
        backgroundColor: /*$_theme*/ctx[15].colorMain
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div1 = element("div");
      h2 = element("h2");
      t0 = text("About the data");
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      p0 = element("p");
      b0 = element("b");
      t4 = text("Available years:");
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      if (if_block2) if_block2.c();
      t8 = space();
      p1 = element("p");
      b1 = element("b");
      t9 = text("Region types:");
      t10 = space();
      if_block3.c();
      t11 = space();
      if (if_block4) if_block4.c();
      t12 = space();
      if (if_block5) if_block5.c();
      t13 = space();
      if (if_block6) if_block6.c();
      t14 = space();
      if (if_block7) if_block7.c();
      t15 = space();
      if (if_block8) if_block8.c();
      t16 = space();
      if (if_block9) if_block9.c();
      t17 = space();
      if (if_block10) if_block10.c();
      t18 = space();
      if (if_block11) if_block11.c();
      t19 = space();
      if (if_block12) if_block12.c();
      t20 = space();
      if (if_block13) if_block13.c();
      t21 = space();
      div0 = element("div");
      create_component(linkbutton.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h2 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "About the data");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      if (if_block0) if_block0.l(div1_nodes);
      t2 = claim_space(div1_nodes);
      if (if_block1) if_block1.l(div1_nodes);
      t3 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {});
      var p0_nodes = children(p0);
      b0 = claim_element(p0_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t4 = claim_text(b0_nodes, "Available years:");
      b0_nodes.forEach(detach_dev);
      t5 = claim_space(p0_nodes);
      t6 = claim_text(p0_nodes, t6_value);
      t7 = claim_space(p0_nodes);
      if (if_block2) if_block2.l(p0_nodes);
      p0_nodes.forEach(detach_dev);
      t8 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {});
      var p1_nodes = children(p1);
      b1 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t9 = claim_text(b1_nodes, "Region types:");
      b1_nodes.forEach(detach_dev);
      t10 = claim_space(p1_nodes);
      if_block3.l(p1_nodes);
      p1_nodes.forEach(detach_dev);
      t11 = claim_space(div1_nodes);
      if (if_block4) if_block4.l(div1_nodes);
      t12 = claim_space(div1_nodes);
      if (if_block5) if_block5.l(div1_nodes);
      t13 = claim_space(div1_nodes);
      if (if_block6) if_block6.l(div1_nodes);
      t14 = claim_space(div1_nodes);
      if (if_block7) if_block7.l(div1_nodes);
      t15 = claim_space(div1_nodes);
      if (if_block8) if_block8.l(div1_nodes);
      t16 = claim_space(div1_nodes);
      if (if_block9) if_block9.l(div1_nodes);
      t17 = claim_space(div1_nodes);
      if (if_block10) if_block10.l(div1_nodes);
      t18 = claim_space(div1_nodes);
      if (if_block11) if_block11.l(div1_nodes);
      t19 = claim_space(div1_nodes);
      if (if_block12) if_block12.l(div1_nodes);
      t20 = claim_space(div1_nodes);
      if (if_block13) if_block13.l(div1_nodes);
      t21 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(linkbutton.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1b2hdj4");
      add_location(h2, file$3, 36, 1, 943);
      attr_dev(b0, "class", "svelte-1b2hdj4");
      add_location(b0, file$3, 47, 2, 1110);
      add_location(p0, file$3, 46, 1, 1104);
      attr_dev(b1, "class", "svelte-1b2hdj4");
      add_location(b1, file$3, 54, 2, 1237);
      add_location(p1, file$3, 53, 1, 1231);
      attr_dev(div0, "class", "cta svelte-1b2hdj4");
      add_location(div0, file$3, 131, 1, 2641);
      attr_dev(div1, "class", "InfoView svelte-1b2hdj4");
      add_location(div1, file$3, 35, 0, 919);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      append_hydration_dev(div1, h2);
      append_hydration_dev(h2, t0);
      append_hydration_dev(div1, t1);
      if (if_block0) if_block0.m(div1, null);
      append_hydration_dev(div1, t2);
      if (if_block1) if_block1.m(div1, null);
      append_hydration_dev(div1, t3);
      append_hydration_dev(div1, p0);
      append_hydration_dev(p0, b0);
      append_hydration_dev(b0, t4);
      append_hydration_dev(p0, t5);
      append_hydration_dev(p0, t6);
      append_hydration_dev(p0, t7);
      if (if_block2) if_block2.m(p0, null);
      append_hydration_dev(div1, t8);
      append_hydration_dev(div1, p1);
      append_hydration_dev(p1, b1);
      append_hydration_dev(b1, t9);
      append_hydration_dev(p1, t10);
      if_block3.m(p1, null);
      append_hydration_dev(div1, t11);
      if (if_block4) if_block4.m(div1, null);
      append_hydration_dev(div1, t12);
      if (if_block5) if_block5.m(div1, null);
      append_hydration_dev(div1, t13);
      if (if_block6) if_block6.m(div1, null);
      append_hydration_dev(div1, t14);
      if (if_block7) if_block7.m(div1, null);
      append_hydration_dev(div1, t15);
      if (if_block8) if_block8.m(div1, null);
      append_hydration_dev(div1, t16);
      if (if_block9) if_block9.m(div1, null);
      append_hydration_dev(div1, t17);
      if (if_block10) if_block10.m(div1, null);
      append_hydration_dev(div1, t18);
      if (if_block11) if_block11.m(div1, null);
      append_hydration_dev(div1, t19);
      if (if_block12) if_block12.m(div1, null);
      append_hydration_dev(div1, t20);
      if (if_block13) if_block13.m(div1, null);
      append_hydration_dev(div1, t21);
      append_hydration_dev(div1, div0);
      mount_component(linkbutton, div0, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      if ( /*description*/ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_14(ctx);
          if_block0.c();
          if_block0.m(div1, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ( /*date*/ctx[14]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_13(ctx);
          if_block1.c();
          if_block1.m(div1, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if ((!current || dirty & /*year_extent*/8192) && t6_value !== (t6_value = /*year_extent*/ctx[13][0] + "")) set_data_dev(t6, t6_value);
      if ( /*year_extent*/ctx[13][0] !== /*year_extent*/ctx[13][1]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_12(ctx);
          if_block2.c();
          if_block2.m(p0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block3) {
        if_block3.p(ctx, dirty);
      } else {
        if_block3.d(1);
        if_block3 = current_block_type(ctx);
        if (if_block3) {
          if_block3.c();
          if_block3.m(p1, null);
        }
      }
      if ( /*is_experimental*/ctx[5]) {
        if (if_block4) ; else {
          if_block4 = create_if_block_10(ctx);
          if_block4.c();
          if_block4.m(div1, t12);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      if ( /*warning*/ctx[12]) {
        if (if_block5) {
          if_block5.p(ctx, dirty);
        } else {
          if_block5 = create_if_block_9(ctx);
          if_block5.c();
          if_block5.m(div1, t13);
        }
      } else if (if_block5) {
        if_block5.d(1);
        if_block5 = null;
      }
      if ( /*source_name*/ctx[9]) {
        if (if_block6) {
          if_block6.p(ctx, dirty);
          if (dirty & /*source_name*/512) {
            transition_in(if_block6, 1);
          }
        } else {
          if_block6 = create_if_block_8(ctx);
          if_block6.c();
          transition_in(if_block6, 1);
          if_block6.m(div1, t14);
        }
      } else if (if_block6) {
        group_outros();
        transition_out(if_block6, 1, 1, function () {
          if_block6 = null;
        });
        check_outros();
      }
      if ( /*source_url*/ctx[10]) {
        if (if_block7) {
          if_block7.p(ctx, dirty);
          if (dirty & /*source_url*/1024) {
            transition_in(if_block7, 1);
          }
        } else {
          if_block7 = create_if_block_7(ctx);
          if_block7.c();
          transition_in(if_block7, 1);
          if_block7.m(div1, t15);
        }
      } else if (if_block7) {
        group_outros();
        transition_out(if_block7, 1, 1, function () {
          if_block7 = null;
        });
        check_outros();
      }
      if ( /*api_doc_url*/ctx[0]) {
        if (if_block8) {
          if_block8.p(ctx, dirty);
          if (dirty & /*api_doc_url*/1) {
            transition_in(if_block8, 1);
          }
        } else {
          if_block8 = create_if_block_6(ctx);
          if_block8.c();
          transition_in(if_block8, 1);
          if_block8.m(div1, t16);
        }
      } else if (if_block8) {
        group_outros();
        transition_out(if_block8, 1, 1, function () {
          if_block8 = null;
        });
        check_outros();
      }
      if ( /*endpoint_url*/ctx[4]) {
        if (if_block9) {
          if_block9.p(ctx, dirty);
          if (dirty & /*endpoint_url*/16) {
            transition_in(if_block9, 1);
          }
        } else {
          if_block9 = create_if_block_5(ctx);
          if_block9.c();
          transition_in(if_block9, 1);
          if_block9.m(div1, t17);
        }
      } else if (if_block9) {
        group_outros();
        transition_out(if_block9, 1, 1, function () {
          if_block9 = null;
        });
        check_outros();
      }
      if ( /*api_type*/ctx[1]) {
        if (if_block10) {
          if_block10.p(ctx, dirty);
          if (dirty & /*api_type*/2) {
            transition_in(if_block10, 1);
          }
        } else {
          if_block10 = create_if_block_4(ctx);
          if_block10.c();
          transition_in(if_block10, 1);
          if_block10.m(div1, t18);
        }
      } else if (if_block10) {
        group_outros();
        transition_out(if_block10, 1, 1, function () {
          if_block10 = null;
        });
        check_outros();
      }
      if ( /*query*/ctx[7]) {
        if (if_block11) {
          if_block11.p(ctx, dirty);
          if (dirty & /*query*/128) {
            transition_in(if_block11, 1);
          }
        } else {
          if_block11 = create_if_block_3(ctx);
          if_block11.c();
          transition_in(if_block11, 1);
          if_block11.m(div1, t19);
        }
      } else if (if_block11) {
        group_outros();
        transition_out(if_block11, 1, 1, function () {
          if_block11 = null;
        });
        check_outros();
      }
      if (dirty & /*is_experimental*/32) show_if_1 = !isUndefined( /*is_experimental*/ctx[5]);
      if (show_if_1) {
        if (if_block12) {
          if_block12.p(ctx, dirty);
          if (dirty & /*is_experimental*/32) {
            transition_in(if_block12, 1);
          }
        } else {
          if_block12 = create_if_block_2(ctx);
          if_block12.c();
          transition_in(if_block12, 1);
          if_block12.m(div1, t20);
        }
      } else if (if_block12) {
        group_outros();
        transition_out(if_block12, 1, 1, function () {
          if_block12 = null;
        });
        check_outros();
      }
      if (dirty & /*is_public*/64) show_if = !isUndefined( /*is_public*/ctx[6]) && ! /*is_public*/ctx[6];
      if (show_if) {
        if (if_block13) {
          if_block13.p(ctx, dirty);
        } else {
          if_block13 = create_if_block$2(ctx);
          if_block13.c();
          if_block13.m(div1, t21);
        }
      } else if (if_block13) {
        if_block13.d(1);
        if_block13 = null;
      }
      var linkbutton_changes = {};
      if (dirty & /*url*/2048) linkbutton_changes.href = /*url*/ctx[11];
      if (dirty & /*$_theme*/32768) linkbutton_changes.theme = {
        backgroundColor: /*$_theme*/ctx[15].colorMain
      };
      linkbutton.$set(linkbutton_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block6);
      transition_in(if_block7);
      transition_in(if_block8);
      transition_in(if_block9);
      transition_in(if_block10);
      transition_in(if_block11);
      transition_in(if_block12);
      transition_in(linkbutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block6);
      transition_out(if_block7);
      transition_out(if_block8);
      transition_out(if_block9);
      transition_out(if_block10);
      transition_out(if_block11);
      transition_out(if_block12);
      transition_out(linkbutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if_block3.d();
      if (if_block4) if_block4.d();
      if (if_block5) if_block5.d();
      if (if_block6) if_block6.d();
      if (if_block7) if_block7.d();
      if (if_block8) if_block8.d();
      if (if_block9) if_block9.d();
      if (if_block10) if_block10.d();
      if (if_block11) if_block11.d();
      if (if_block12) if_block12.d();
      if (if_block13) if_block13.d();
      destroy_component(linkbutton);
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
  var date;
  var $_theme;
  validate_store(_theme, '_theme');
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(15, $_theme = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('InfoView', slots, []);
  var formatDate = pipe([String, function (s) {
    return "".concat(s.slice(0, 4), "-").concat(s.slice(4, 6), "-").concat(s.slice(6, 8));
  }]);
  var _$$props$api_doc_url = $$props.api_doc_url,
    api_doc_url = _$$props$api_doc_url === void 0 ? null : _$$props$api_doc_url;
  var _$$props$api_type = $$props.api_type,
    api_type = _$$props$api_type === void 0 ? null : _$$props$api_type;
  var _$$props$auth_provide = $$props.auth_provider,
    auth_provider = _$$props$auth_provide === void 0 ? null : _$$props$auth_provide;
  var _$$props$data_date = $$props.data_date,
    data_date = _$$props$data_date === void 0 ? null : _$$props$data_date;
  var _$$props$description = $$props.description,
    description = _$$props$description === void 0 ? null : _$$props$description;
  var _$$props$endpoint_url = $$props.endpoint_url,
    endpoint_url = _$$props$endpoint_url === void 0 ? null : _$$props$endpoint_url;
  var _$$props$is_experimen = $$props.is_experimental,
    is_experimental = _$$props$is_experimen === void 0 ? null : _$$props$is_experimen;
  var _$$props$is_public = $$props.is_public,
    is_public = _$$props$is_public === void 0 ? null : _$$props$is_public;
  var _$$props$query = $$props.query,
    query = _$$props$query === void 0 ? null : _$$props$query;
  var _$$props$region_types = $$props.region_types,
    region_types = _$$props$region_types === void 0 ? null : _$$props$region_types;
  var _$$props$source_name = $$props.source_name,
    source_name = _$$props$source_name === void 0 ? null : _$$props$source_name;
  var _$$props$source_url = $$props.source_url,
    source_url = _$$props$source_url === void 0 ? null : _$$props$source_url;
  var _$$props$url = $$props.url,
    url = _$$props$url === void 0 ? null : _$$props$url;
  var _$$props$warning = $$props.warning,
    warning = _$$props$warning === void 0 ? null : _$$props$warning;
  var _$$props$year_extent = $$props.year_extent,
    year_extent = _$$props$year_extent === void 0 ? null : _$$props$year_extent;
  var writable_props = ['api_doc_url', 'api_type', 'auth_provider', 'data_date', 'description', 'endpoint_url', 'is_experimental', 'is_public', 'query', 'region_types', 'source_name', 'source_url', 'url', 'warning', 'year_extent'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<InfoView> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('api_doc_url' in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
    if ('api_type' in $$props) $$invalidate(1, api_type = $$props.api_type);
    if ('auth_provider' in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
    if ('data_date' in $$props) $$invalidate(16, data_date = $$props.data_date);
    if ('description' in $$props) $$invalidate(3, description = $$props.description);
    if ('endpoint_url' in $$props) $$invalidate(4, endpoint_url = $$props.endpoint_url);
    if ('is_experimental' in $$props) $$invalidate(5, is_experimental = $$props.is_experimental);
    if ('is_public' in $$props) $$invalidate(6, is_public = $$props.is_public);
    if ('query' in $$props) $$invalidate(7, query = $$props.query);
    if ('region_types' in $$props) $$invalidate(8, region_types = $$props.region_types);
    if ('source_name' in $$props) $$invalidate(9, source_name = $$props.source_name);
    if ('source_url' in $$props) $$invalidate(10, source_url = $$props.source_url);
    if ('url' in $$props) $$invalidate(11, url = $$props.url);
    if ('warning' in $$props) $$invalidate(12, warning = $$props.warning);
    if ('year_extent' in $$props) $$invalidate(13, year_extent = $$props.year_extent);
  };
  $$self.$capture_state = function () {
    return {
      Download: Download,
      LinkButton: LinkButton,
      _: _,
      _theme: _theme,
      PolymorphicString: PolymorphicString$1,
      PolymorphicURL: PolymorphicURL$1,
      formatDate: formatDate,
      api_doc_url: api_doc_url,
      api_type: api_type,
      auth_provider: auth_provider,
      data_date: data_date,
      description: description,
      endpoint_url: endpoint_url,
      is_experimental: is_experimental,
      is_public: is_public,
      query: query,
      region_types: region_types,
      source_name: source_name,
      source_url: source_url,
      url: url,
      warning: warning,
      year_extent: year_extent,
      date: date,
      $_theme: $_theme
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('api_doc_url' in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
    if ('api_type' in $$props) $$invalidate(1, api_type = $$props.api_type);
    if ('auth_provider' in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
    if ('data_date' in $$props) $$invalidate(16, data_date = $$props.data_date);
    if ('description' in $$props) $$invalidate(3, description = $$props.description);
    if ('endpoint_url' in $$props) $$invalidate(4, endpoint_url = $$props.endpoint_url);
    if ('is_experimental' in $$props) $$invalidate(5, is_experimental = $$props.is_experimental);
    if ('is_public' in $$props) $$invalidate(6, is_public = $$props.is_public);
    if ('query' in $$props) $$invalidate(7, query = $$props.query);
    if ('region_types' in $$props) $$invalidate(8, region_types = $$props.region_types);
    if ('source_name' in $$props) $$invalidate(9, source_name = $$props.source_name);
    if ('source_url' in $$props) $$invalidate(10, source_url = $$props.source_url);
    if ('url' in $$props) $$invalidate(11, url = $$props.url);
    if ('warning' in $$props) $$invalidate(12, warning = $$props.warning);
    if ('year_extent' in $$props) $$invalidate(13, year_extent = $$props.year_extent);
    if ('date' in $$props) $$invalidate(14, date = $$props.date);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*data_date*/65536) {
      $$invalidate(14, date = data_date && formatDate(data_date));
    }
  };
  return [api_doc_url, api_type, auth_provider, description, endpoint_url, is_experimental, is_public, query, region_types, source_name, source_url, url, warning, year_extent, date, $_theme, data_date];
}
var InfoView = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(InfoView, _SvelteComponentDev);
  var _super = _createSuper$3(InfoView);
  function InfoView(options) {
    var _this;
    _classCallCheck(this, InfoView);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      api_doc_url: 0,
      api_type: 1,
      auth_provider: 2,
      data_date: 16,
      description: 3,
      endpoint_url: 4,
      is_experimental: 5,
      is_public: 6,
      query: 7,
      region_types: 8,
      source_name: 9,
      source_url: 10,
      url: 11,
      warning: 12,
      year_extent: 13
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "InfoView",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }
  _createClass(InfoView, [{
    key: "api_doc_url",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "api_type",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "auth_provider",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data_date",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "description",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "endpoint_url",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "is_experimental",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "is_public",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "query",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "region_types",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "source_name",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "source_url",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "url",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "warning",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "year_extent",
    get: function get() {
      throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return InfoView;
}(SvelteComponentDev);
var InfoView$1 = InfoView;

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "../../components/time_region_value/src/lib/components/Info/InfoModal.svelte";
function create_fragment$2(ctx) {
  var div1;
  var div0;
  var infoview;
  var current;
  var mounted;
  var dispose;
  infoview = new InfoView$1({
    props: {
      api_doc_url: /*api_doc_url*/ctx[0],
      api_type: /*api_type*/ctx[1],
      auth_provider: /*auth_provider*/ctx[2],
      data_date: /*data_date*/ctx[3],
      description: /*description*/ctx[4],
      endpoint_url: /*endpoint_url*/ctx[5],
      is_experimental: /*is_experimental*/ctx[6],
      is_public: /*is_public*/ctx[7],
      query: /*query*/ctx[8],
      region_types: /*region_types*/ctx[9],
      source_name: /*source_name*/ctx[10],
      source_url: /*source_url*/ctx[11],
      url: /*url*/ctx[12],
      warning: /*warning*/ctx[13],
      year_extent: /*year_extent*/ctx[14]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      create_component(infoview.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(infoview.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "panel svelte-1d8tp84");
      add_location(div0, file$2, 27, 1, 633);
      attr_dev(div1, "class", "modal svelte-1d8tp84");
      add_location(div1, file$2, 23, 0, 589);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      append_hydration_dev(div1, div0);
      mount_component(infoview, div0, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div0, "click", stop_propagation(noop), false, false, true), listen_dev(div0, "keydown", stop_propagation(noop), false, false, true), listen_dev(div1, "click", /*click_handler*/ctx[15], false, false, false), listen_dev(div1, "keydown", /*keydown_handler*/ctx[16], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      var infoview_changes = {};
      if (dirty & /*api_doc_url*/1) infoview_changes.api_doc_url = /*api_doc_url*/ctx[0];
      if (dirty & /*api_type*/2) infoview_changes.api_type = /*api_type*/ctx[1];
      if (dirty & /*auth_provider*/4) infoview_changes.auth_provider = /*auth_provider*/ctx[2];
      if (dirty & /*data_date*/8) infoview_changes.data_date = /*data_date*/ctx[3];
      if (dirty & /*description*/16) infoview_changes.description = /*description*/ctx[4];
      if (dirty & /*endpoint_url*/32) infoview_changes.endpoint_url = /*endpoint_url*/ctx[5];
      if (dirty & /*is_experimental*/64) infoview_changes.is_experimental = /*is_experimental*/ctx[6];
      if (dirty & /*is_public*/128) infoview_changes.is_public = /*is_public*/ctx[7];
      if (dirty & /*query*/256) infoview_changes.query = /*query*/ctx[8];
      if (dirty & /*region_types*/512) infoview_changes.region_types = /*region_types*/ctx[9];
      if (dirty & /*source_name*/1024) infoview_changes.source_name = /*source_name*/ctx[10];
      if (dirty & /*source_url*/2048) infoview_changes.source_url = /*source_url*/ctx[11];
      if (dirty & /*url*/4096) infoview_changes.url = /*url*/ctx[12];
      if (dirty & /*warning*/8192) infoview_changes.warning = /*warning*/ctx[13];
      if (dirty & /*year_extent*/16384) infoview_changes.year_extent = /*year_extent*/ctx[14];
      infoview.$set(infoview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(infoview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(infoview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_component(infoview);
      mounted = false;
      run_all(dispose);
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
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('InfoModal', slots, []);
  var _$$props$api_doc_url = $$props.api_doc_url,
    api_doc_url = _$$props$api_doc_url === void 0 ? null : _$$props$api_doc_url;
  var _$$props$api_type = $$props.api_type,
    api_type = _$$props$api_type === void 0 ? null : _$$props$api_type;
  var _$$props$auth_provide = $$props.auth_provider,
    auth_provider = _$$props$auth_provide === void 0 ? null : _$$props$auth_provide;
  var _$$props$data_date = $$props.data_date,
    data_date = _$$props$data_date === void 0 ? null : _$$props$data_date;
  var _$$props$description = $$props.description,
    description = _$$props$description === void 0 ? null : _$$props$description;
  var _$$props$endpoint_url = $$props.endpoint_url,
    endpoint_url = _$$props$endpoint_url === void 0 ? null : _$$props$endpoint_url;
  var _$$props$is_experimen = $$props.is_experimental,
    is_experimental = _$$props$is_experimen === void 0 ? null : _$$props$is_experimen;
  var _$$props$is_public = $$props.is_public,
    is_public = _$$props$is_public === void 0 ? null : _$$props$is_public;
  var _$$props$query = $$props.query,
    query = _$$props$query === void 0 ? null : _$$props$query;
  var _$$props$region_types = $$props.region_types,
    region_types = _$$props$region_types === void 0 ? null : _$$props$region_types;
  var _$$props$source_name = $$props.source_name,
    source_name = _$$props$source_name === void 0 ? null : _$$props$source_name;
  var _$$props$source_url = $$props.source_url,
    source_url = _$$props$source_url === void 0 ? null : _$$props$source_url;
  var _$$props$url = $$props.url,
    url = _$$props$url === void 0 ? null : _$$props$url;
  var _$$props$warning = $$props.warning,
    warning = _$$props$warning === void 0 ? null : _$$props$warning;
  var _$$props$year_extent = $$props.year_extent,
    year_extent = _$$props$year_extent === void 0 ? null : _$$props$year_extent;
  var writable_props = ['api_doc_url', 'api_type', 'auth_provider', 'data_date', 'description', 'endpoint_url', 'is_experimental', 'is_public', 'query', 'region_types', 'source_name', 'source_url', 'url', 'warning', 'year_extent'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<InfoModal> was created with unknown prop '".concat(key, "'"));
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = function ($$props) {
    if ('api_doc_url' in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
    if ('api_type' in $$props) $$invalidate(1, api_type = $$props.api_type);
    if ('auth_provider' in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
    if ('data_date' in $$props) $$invalidate(3, data_date = $$props.data_date);
    if ('description' in $$props) $$invalidate(4, description = $$props.description);
    if ('endpoint_url' in $$props) $$invalidate(5, endpoint_url = $$props.endpoint_url);
    if ('is_experimental' in $$props) $$invalidate(6, is_experimental = $$props.is_experimental);
    if ('is_public' in $$props) $$invalidate(7, is_public = $$props.is_public);
    if ('query' in $$props) $$invalidate(8, query = $$props.query);
    if ('region_types' in $$props) $$invalidate(9, region_types = $$props.region_types);
    if ('source_name' in $$props) $$invalidate(10, source_name = $$props.source_name);
    if ('source_url' in $$props) $$invalidate(11, source_url = $$props.source_url);
    if ('url' in $$props) $$invalidate(12, url = $$props.url);
    if ('warning' in $$props) $$invalidate(13, warning = $$props.warning);
    if ('year_extent' in $$props) $$invalidate(14, year_extent = $$props.year_extent);
  };
  $$self.$capture_state = function () {
    return {
      noop: noop,
      InfoView: InfoView$1,
      api_doc_url: api_doc_url,
      api_type: api_type,
      auth_provider: auth_provider,
      data_date: data_date,
      description: description,
      endpoint_url: endpoint_url,
      is_experimental: is_experimental,
      is_public: is_public,
      query: query,
      region_types: region_types,
      source_name: source_name,
      source_url: source_url,
      url: url,
      warning: warning,
      year_extent: year_extent
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('api_doc_url' in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
    if ('api_type' in $$props) $$invalidate(1, api_type = $$props.api_type);
    if ('auth_provider' in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
    if ('data_date' in $$props) $$invalidate(3, data_date = $$props.data_date);
    if ('description' in $$props) $$invalidate(4, description = $$props.description);
    if ('endpoint_url' in $$props) $$invalidate(5, endpoint_url = $$props.endpoint_url);
    if ('is_experimental' in $$props) $$invalidate(6, is_experimental = $$props.is_experimental);
    if ('is_public' in $$props) $$invalidate(7, is_public = $$props.is_public);
    if ('query' in $$props) $$invalidate(8, query = $$props.query);
    if ('region_types' in $$props) $$invalidate(9, region_types = $$props.region_types);
    if ('source_name' in $$props) $$invalidate(10, source_name = $$props.source_name);
    if ('source_url' in $$props) $$invalidate(11, source_url = $$props.source_url);
    if ('url' in $$props) $$invalidate(12, url = $$props.url);
    if ('warning' in $$props) $$invalidate(13, warning = $$props.warning);
    if ('year_extent' in $$props) $$invalidate(14, year_extent = $$props.year_extent);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [api_doc_url, api_type, auth_provider, data_date, description, endpoint_url, is_experimental, is_public, query, region_types, source_name, source_url, url, warning, year_extent, click_handler, keydown_handler];
}
var InfoModal = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(InfoModal, _SvelteComponentDev);
  var _super = _createSuper$2(InfoModal);
  function InfoModal(options) {
    var _this;
    _classCallCheck(this, InfoModal);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      api_doc_url: 0,
      api_type: 1,
      auth_provider: 2,
      data_date: 3,
      description: 4,
      endpoint_url: 5,
      is_experimental: 6,
      is_public: 7,
      query: 8,
      region_types: 9,
      source_name: 10,
      source_url: 11,
      url: 12,
      warning: 13,
      year_extent: 14
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "InfoModal",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }
  _createClass(InfoModal, [{
    key: "api_doc_url",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "api_type",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "auth_provider",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data_date",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "description",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "endpoint_url",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "is_experimental",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "is_public",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "query",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "region_types",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "source_name",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "source_url",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "url",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "warning",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "year_extent",
    get: function get() {
      throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return InfoModal;
}(SvelteComponentDev);
var InfoModal$1 = InfoModal;

// extent([]) -> [undefined, undefined]
var isValidExtent = function isValidExtent(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    a = _ref2[0],
    b = _ref2[1];
  return isNotNil(a) && isNotNil(b) && a !== b;
};

/* current data */

var _currentData = derived([_selectedYear, _selectionData, _yearSelectionData], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
    selectedYear = _ref2[0],
    selectionData = _ref2[1],
    yearSelectionData = _ref2[2];
  return selectedYear ? yearSelectionData : selectionData;
});
var _isCurrentDataEmpty = derived(_currentData, isIterableEmpty);

/* extent */

var _currentExtext = derived([_getIndicatorValue, _currentData], function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
    getIndicatorValue = _ref4[0],
    currentData = _ref4[1];
  return extent(currentData, getIndicatorValue);
});
var _isExtentValid = derived(_currentExtext, isValidExtent);

/* current color scheme */

var _colorSchemeIndex = writable(0);
var toggleColorScheme = function toggleColorScheme() {
  _colorSchemeIndex.update(function (index) {
    return index === 0 ? 1 : 0;
  });
};
var _colorScheme = derived([_theme, _colorSchemeIndex], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    theme = _ref2[0],
    index = _ref2[1];
  return theme.colorSchemes[index];
});

/* current color scheme label */

var _colorSchemeLabel = derived(_colorScheme, function (s) {
  return s.label;
});
var getLabels = pluck('label');
var _colorSchemeLabels = derived(_theme, function (theme) {
  return getLabels(theme.colorSchemes);
});

/* color scale */

var _baseColorScale = derived(_colorScheme, function (_ref3) {
  var colors = _ref3.colors;
  return quantize().range(colors);
});
var _makeColorScale = derived([_baseColorScale, _colorScheme], function (_ref4) {
  var _ref5 = _slicedToArray(_ref4, 2),
    baseColorScale = _ref5[0],
    colors = _ref5[1].colors;
  return function (extent) {
    return isValidExtent(extent) ? baseColorScale.domain(extent) : always(last(colors));
  };
});
var _colorScale = derived([_currentExtext, _makeColorScale], function (_ref6) {
  var _ref7 = _slicedToArray(_ref6, 2),
    currentExtext = _ref7[0],
    makeColorScale = _ref7[1];
  return makeColorScale(currentExtext);
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file$1 = "../../components/time_region_value/src/lib/components/SettingsRow.svelte";

// (90:1) {#if flags.showRankingControl}
function create_if_block$1(ctx) {
  var div;
  var switch_1;
  var current;
  switch_1 = new Switch({
    props: {
      value: "Absolute",
      values: ['Absolute', 'Ranking']
    },
    $$inline: true
  });
  switch_1.$on("toggled", function () {
    if (is_function( /*handlers*/ctx[0].toggledRanking)) /*handlers*/ctx[0].toggledRanking.apply(this, arguments);
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(switch_1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(switch_1.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "optgroup svelte-1unc2p6");
      add_location(div, file$1, 90, 2, 1903);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(switch_1, div, null);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i: function intro(local) {
      if (current) return;
      transition_in(switch_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(switch_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(switch_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(90:1) {#if flags.showRankingControl}",
    ctx: ctx
  });
  return block;
}
function create_fragment$1(ctx) {
  var div5;
  var div3;
  var div0;
  var icon0;
  var t0;
  var icon1;
  var t1;
  var div1;
  var switch0;
  var t2;
  var div2;
  var xorselector;
  var t3;
  var t4;
  var div4;
  var switch1;
  var current;
  var mounted;
  var dispose;
  icon0 = new Icon({
    props: {
      glyph: Globe,
      size: 28,
      stroke: /*globeStroke*/ctx[3],
      strokeWidth: 1.5
    },
    $$inline: true
  });
  icon1 = new Icon({
    props: {
      glyph: /*flags*/ctx[1].isGeoModalVisible ? ChevronUp : ChevronDown,
      size: 24,
      strokeWidth: 1
    },
    $$inline: true
  });
  switch0 = new Switch({
    props: {
      value: /*flags*/ctx[1].doFilter ? 'Filter' : 'Highlight',
      values: ['Highlight', 'Filter']
    },
    $$inline: true
  });
  switch0.$on("toggled", function () {
    if (is_function( /*handlers*/ctx[0].toggledFiltering)) /*handlers*/ctx[0].toggledFiltering.apply(this, arguments);
  });
  xorselector = new XorSelector({
    props: {
      value: /*$_currentLevel*/ctx[4],
      values: /*$_availableLevels*/ctx[5]
    },
    $$inline: true
  });
  xorselector.$on("changed", function () {
    if (is_function( /*handlers*/ctx[0].setLevel)) /*handlers*/ctx[0].setLevel.apply(this, arguments);
  });
  var if_block = /*flags*/ctx[1].showRankingControl && create_if_block$1(ctx);
  switch1 = new Switch({
    props: {
      value: /*$_colorSchemeLabel*/ctx[6],
      values: /*$_colorSchemeLabels*/ctx[7]
    },
    $$inline: true
  });
  switch1.$on("toggled", toggleColorScheme);
  var block = {
    c: function create() {
      div5 = element("div");
      div3 = element("div");
      div0 = element("div");
      create_component(icon0.$$.fragment);
      t0 = space();
      create_component(icon1.$$.fragment);
      t1 = space();
      div1 = element("div");
      create_component(switch0.$$.fragment);
      t2 = space();
      div2 = element("div");
      create_component(xorselector.$$.fragment);
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();
      div4 = element("div");
      create_component(switch1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div3 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(icon0.$$.fragment, div0_nodes);
      t0 = claim_space(div0_nodes);
      claim_component(icon1.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(switch0.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      claim_component(xorselector.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t3 = claim_space(div5_nodes);
      if (if_block) if_block.l(div5_nodes);
      t4 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      claim_component(switch1.$$.fragment, div4_nodes);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "item globe clickable svelte-1unc2p6");
      add_location(div0, file$1, 53, 2, 1186);
      attr_dev(div1, "class", "item svelte-1unc2p6");
      add_location(div1, file$1, 71, 2, 1509);
      attr_dev(div2, "class", "item clickable svelte-1unc2p6");
      add_location(div2, file$1, 79, 2, 1689);
      attr_dev(div3, "class", "optgroup svelte-1unc2p6");
      add_location(div3, file$1, 52, 1, 1161);
      attr_dev(div4, "class", "optgroup svelte-1unc2p6");
      add_location(div4, file$1, 100, 1, 2082);
      attr_dev(div5, "class", "SettingsRow svelte-1unc2p6");
      add_location(div5, file$1, 50, 0, 1110);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div5, anchor);
      append_hydration_dev(div5, div3);
      append_hydration_dev(div3, div0);
      mount_component(icon0, div0, null);
      append_hydration_dev(div0, t0);
      mount_component(icon1, div0, null);
      append_hydration_dev(div3, t1);
      append_hydration_dev(div3, div1);
      mount_component(switch0, div1, null);
      append_hydration_dev(div3, t2);
      append_hydration_dev(div3, div2);
      mount_component(xorselector, div2, null);
      append_hydration_dev(div5, t3);
      if (if_block) if_block.m(div5, null);
      append_hydration_dev(div5, t4);
      append_hydration_dev(div5, div4);
      mount_component(switch1, div4, null);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(div0, "click", function () {
          if (is_function( /*handlers*/ctx[0].toggledGeoModal)) /*handlers*/ctx[0].toggledGeoModal.apply(this, arguments);
        }, false, false, false), listen_dev(div0, "keydown", function () {
          if (is_function( /*onKeyDown*/ctx[2])) /*onKeyDown*/ctx[2].apply(this, arguments);
        }, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      ctx = new_ctx;
      var icon0_changes = {};
      if (dirty & /*globeStroke*/8) icon0_changes.stroke = /*globeStroke*/ctx[3];
      icon0.$set(icon0_changes);
      var icon1_changes = {};
      if (dirty & /*flags*/2) icon1_changes.glyph = /*flags*/ctx[1].isGeoModalVisible ? ChevronUp : ChevronDown;
      icon1.$set(icon1_changes);
      var switch0_changes = {};
      if (dirty & /*flags*/2) switch0_changes.value = /*flags*/ctx[1].doFilter ? 'Filter' : 'Highlight';
      switch0.$set(switch0_changes);
      var xorselector_changes = {};
      if (dirty & /*$_currentLevel*/16) xorselector_changes.value = /*$_currentLevel*/ctx[4];
      if (dirty & /*$_availableLevels*/32) xorselector_changes.values = /*$_availableLevels*/ctx[5];
      xorselector.$set(xorselector_changes);
      if ( /*flags*/ctx[1].showRankingControl) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*flags*/2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div5, t4);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
      var switch1_changes = {};
      if (dirty & /*$_colorSchemeLabel*/64) switch1_changes.value = /*$_colorSchemeLabel*/ctx[6];
      if (dirty & /*$_colorSchemeLabels*/128) switch1_changes.values = /*$_colorSchemeLabels*/ctx[7];
      switch1.$set(switch1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      transition_in(switch0.$$.fragment, local);
      transition_in(xorselector.$$.fragment, local);
      transition_in(if_block);
      transition_in(switch1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      transition_out(switch0.$$.fragment, local);
      transition_out(xorselector.$$.fragment, local);
      transition_out(if_block);
      transition_out(switch1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div5);
      destroy_component(icon0);
      destroy_component(icon1);
      destroy_component(switch0);
      destroy_component(xorselector);
      if (if_block) if_block.d();
      destroy_component(switch1);
      mounted = false;
      run_all(dispose);
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
  var globeStroke;
  var onKeyDown;
  var $_theme;
  var $_currentLevel;
  var $_availableLevels;
  var $_colorSchemeLabel;
  var $_colorSchemeLabels;
  validate_store(_theme, '_theme');
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(8, $_theme = $$value);
  });
  validate_store(_currentLevel, '_currentLevel');
  component_subscribe($$self, _currentLevel, function ($$value) {
    return $$invalidate(4, $_currentLevel = $$value);
  });
  validate_store(_availableLevels, '_availableLevels');
  component_subscribe($$self, _availableLevels, function ($$value) {
    return $$invalidate(5, $_availableLevels = $$value);
  });
  validate_store(_colorSchemeLabel, '_colorSchemeLabel');
  component_subscribe($$self, _colorSchemeLabel, function ($$value) {
    return $$invalidate(6, $_colorSchemeLabel = $$value);
  });
  validate_store(_colorSchemeLabels, '_colorSchemeLabels');
  component_subscribe($$self, _colorSchemeLabels, function ($$value) {
    return $$invalidate(7, $_colorSchemeLabels = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('SettingsRow', slots, []);
  var defaultHandlers = {
    setLevel: null,
    toggledFiltering: null,
    toggledGeoModal: null,
    toggledRanking: null
  };
  var _$$props$flags = $$props.flags,
    flags = _$$props$flags === void 0 ? {
      doFilter: false,
      isGeoModalVisible: false,
      isRegionsSelectionDirty: false,
      showRankingControl: false
    } : _$$props$flags;
  var _$$props$handlers = $$props.handlers,
    handlers = _$$props$handlers === void 0 ? defaultHandlers : _$$props$handlers;
  var writable_props = ['flags', 'handlers'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SettingsRow> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('handlers' in $$props) $$invalidate(0, handlers = $$props.handlers);
  };
  $$self.$capture_state = function () {
    return {
      ChevronDown: ChevronDown,
      ChevronUp: ChevronUp,
      Globe: Globe,
      Icon: Icon,
      Switch: Switch,
      XorSelector: XorSelector,
      _colorSchemeLabel: _colorSchemeLabel,
      _colorSchemeLabels: _colorSchemeLabels,
      toggleColorScheme: toggleColorScheme,
      _availableLevels: _availableLevels,
      _currentLevel: _currentLevel,
      _theme: _theme,
      defaultHandlers: defaultHandlers,
      flags: flags,
      handlers: handlers,
      onKeyDown: onKeyDown,
      globeStroke: globeStroke,
      $_theme: $_theme,
      $_currentLevel: $_currentLevel,
      $_availableLevels: $_availableLevels,
      $_colorSchemeLabel: $_colorSchemeLabel,
      $_colorSchemeLabels: $_colorSchemeLabels
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('handlers' in $$props) $$invalidate(0, handlers = $$props.handlers);
    if ('onKeyDown' in $$props) $$invalidate(2, onKeyDown = $$props.onKeyDown);
    if ('globeStroke' in $$props) $$invalidate(3, globeStroke = $$props.globeStroke);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*handlers*/1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, handlers = handlers ? _objectSpread$1(_objectSpread$1({}, defaultHandlers), handlers) : defaultHandlers);
    }
    if ($$self.$$.dirty & /*flags, $_theme*/258) {
      $$invalidate(3, globeStroke = flags.isRegionsSelectionDirty ? $_theme.colorSelected : $_theme.colorRef);
    }
    if ($$self.$$.dirty & /*handlers*/1) {
      $$invalidate(2, onKeyDown = function onKeyDown(event) {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          handlers.toggledGeoModal && handlers.toggledGeoModal();
        }
      });
    }
  };
  return [handlers, flags, onKeyDown, globeStroke, $_currentLevel, $_availableLevels, $_colorSchemeLabel, $_colorSchemeLabels, $_theme];
}
var SettingsRow = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SettingsRow, _SvelteComponentDev);
  var _super = _createSuper$1(SettingsRow);
  function SettingsRow(options) {
    var _this;
    _classCallCheck(this, SettingsRow);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      flags: 1,
      handlers: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "SettingsRow",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }
  _createClass(SettingsRow, [{
    key: "flags",
    get: function get() {
      throw new Error("<SettingsRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SettingsRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "handlers",
    get: function get() {
      throw new Error("<SettingsRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SettingsRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return SettingsRow;
}(SvelteComponentDev);
var SettingsRow$1 = SettingsRow;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var file = "../../components/time_region_value/src/lib/components/SettingsView.svelte";

// (84:2) {#if $_isMenuExpanded}
function create_if_block_1(ctx) {
  var div;
  var regionsselector;
  var current;
  regionsselector = new RegionsSelector$1({
    props: {
      items: /*$_focusedRootDescendants*/ctx[8],
      title: "" + ( /*$_currentLevel*/ctx[3] + ": " + /*$_focusedRoot*/ctx[9].name)
    },
    $$inline: true
  });
  regionsselector.$on("deselectedAll", deselectAllFocusedRootChildren);
  regionsselector.$on("selectedAll", selectAllFocusedRootChildren);
  regionsselector.$on("toggled", /*toggledRegion*/ctx[14]);
  var block = {
    c: function create() {
      div = element("div");
      create_component(regionsselector.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(regionsselector.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "descendants");
      add_location(div, file, 84, 3, 1960);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      mount_component(regionsselector, div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var regionsselector_changes = {};
      if (dirty & /*$_focusedRootDescendants*/256) regionsselector_changes.items = /*$_focusedRootDescendants*/ctx[8];
      if (dirty & /*$_currentLevel, $_focusedRoot*/520) regionsselector_changes.title = "" + ( /*$_currentLevel*/ctx[3] + ": " + /*$_focusedRoot*/ctx[9].name);
      regionsselector.$set(regionsselector_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(regionsselector.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(regionsselector.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(regionsselector);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(84:2) {#if $_isMenuExpanded}",
    ctx: ctx
  });
  return block;
}

// (110:1) {#if flags.showRankingControl}
function create_if_block(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var t2;
  var t3;
  var switch_1;
  var current;
  switch_1 = new Switch({
    props: {
      value: "Absolute",
      values: ['Absolute', 'Ranking']
    },
    $$inline: true
  });
  switch_1.$on("toggled", function () {
    if (is_function( /*handlers*/ctx[0].toggledRanking)) /*handlers*/ctx[0].toggledRanking.apply(this, arguments);
  });
  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text("3/");
      t1 = text( /*count*/ctx[2]);
      t2 = text(": Y scale");
      t3 = space();
      create_component(switch_1.$$.fragment);
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
      t0 = claim_text(h2_nodes, "3/");
      t1 = claim_text(h2_nodes, /*count*/ctx[2]);
      t2 = claim_text(h2_nodes, ": Y scale");
      h2_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      claim_component(switch_1.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1mwy054");
      add_location(h2, file, 111, 3, 2549);
      attr_dev(div, "class", "optgroup svelte-1mwy054");
      add_location(div, file, 110, 2, 2523);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, h2);
      append_hydration_dev(h2, t0);
      append_hydration_dev(h2, t1);
      append_hydration_dev(h2, t2);
      append_hydration_dev(div, t3);
      mount_component(switch_1, div, null);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & /*count*/4) set_data_dev(t1, /*count*/ctx[2]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(switch_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(switch_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(switch_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(110:1) {#if flags.showRankingControl}",
    ctx: ctx
  });
  return block;
}
function create_fragment(ctx) {
  var div3;
  var div1;
  var h20;
  var t0;
  var t1;
  var t2;
  var t3;
  var switch0;
  var t4;
  var xorselector;
  var t5;
  var div0;
  var regionsselector;
  var t6;
  var t7;
  var div2;
  var h21;
  var t8;
  var t9;
  var t10;
  var t11;
  var switch1;
  var t12;
  var current;
  switch0 = new Switch({
    props: {
      value: /*flags*/ctx[1].doFilter ? 'Filter' : 'Highlight',
      values: ['Highlight', 'Filter']
    },
    $$inline: true
  });
  switch0.$on("toggled", function () {
    if (is_function( /*handlers*/ctx[0].toggledFiltering)) /*handlers*/ctx[0].toggledFiltering.apply(this, arguments);
  });
  xorselector = new XorSelector({
    props: {
      value: /*$_currentLevel*/ctx[3],
      values: /*$_availableLevels*/ctx[4]
    },
    $$inline: true
  });
  xorselector.$on("changed", function () {
    if (is_function( /*handlers*/ctx[0].setLevel)) /*handlers*/ctx[0].setLevel.apply(this, arguments);
  });
  regionsselector = new RegionsSelector$1({
    props: {
      focusedId: /*$_focusedRootId*/ctx[5],
      items: /*$_roots*/ctx[6],
      showFocusedItem: /*$_isMenuExpanded*/ctx[7],
      title: "Countries"
    },
    $$inline: true
  });
  regionsselector.$on("deselectedAll", deselectAllRoots);
  regionsselector.$on("focused", /*focusedRoot*/ctx[12]);
  regionsselector.$on("selectedAll", selectAllRoots);
  regionsselector.$on("toggled", /*toggledRoot*/ctx[13]);
  var if_block0 = /*$_isMenuExpanded*/ctx[7] && create_if_block_1(ctx);
  switch1 = new Switch({
    props: {
      value: /*$_colorSchemeLabel*/ctx[10],
      values: /*$_colorSchemeLabels*/ctx[11]
    },
    $$inline: true
  });
  switch1.$on("toggled", toggleColorScheme);
  var if_block1 = /*flags*/ctx[1].showRankingControl && create_if_block(ctx);
  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      h20 = element("h2");
      t0 = text("1/");
      t1 = text( /*count*/ctx[2]);
      t2 = text(": regions");
      t3 = space();
      create_component(switch0.$$.fragment);
      t4 = space();
      create_component(xorselector.$$.fragment);
      t5 = space();
      div0 = element("div");
      create_component(regionsselector.$$.fragment);
      t6 = space();
      if (if_block0) if_block0.c();
      t7 = space();
      div2 = element("div");
      h21 = element("h2");
      t8 = text("2/");
      t9 = text( /*count*/ctx[2]);
      t10 = text(": Color scale");
      t11 = space();
      create_component(switch1.$$.fragment);
      t12 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h20 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h20_nodes = children(h20);
      t0 = claim_text(h20_nodes, "1/");
      t1 = claim_text(h20_nodes, /*count*/ctx[2]);
      t2 = claim_text(h20_nodes, ": regions");
      h20_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      claim_component(switch0.$$.fragment, div1_nodes);
      t4 = claim_space(div1_nodes);
      claim_component(xorselector.$$.fragment, div1_nodes);
      t5 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(regionsselector.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t6 = claim_space(div1_nodes);
      if (if_block0) if_block0.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      t7 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h21 = claim_element(div2_nodes, "H2", {
        class: true
      });
      var h21_nodes = children(h21);
      t8 = claim_text(h21_nodes, "2/");
      t9 = claim_text(h21_nodes, /*count*/ctx[2]);
      t10 = claim_text(h21_nodes, ": Color scale");
      h21_nodes.forEach(detach_dev);
      t11 = claim_space(div2_nodes);
      claim_component(switch1.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      t12 = claim_space(div3_nodes);
      if (if_block1) if_block1.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h20, "class", "svelte-1mwy054");
      add_location(h20, file, 57, 2, 1343);
      attr_dev(div0, "class", "roots");
      add_location(div0, file, 70, 2, 1629);
      attr_dev(div1, "class", "optgroup svelte-1mwy054");
      add_location(div1, file, 56, 1, 1318);
      attr_dev(h21, "class", "svelte-1mwy054");
      add_location(h21, file, 99, 2, 2318);
      attr_dev(div2, "class", "optgroup svelte-1mwy054");
      add_location(div2, file, 98, 1, 2293);
      attr_dev(div3, "class", "SettingsView svelte-1mwy054");
      add_location(div3, file, 52, 0, 1264);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div3, anchor);
      append_hydration_dev(div3, div1);
      append_hydration_dev(div1, h20);
      append_hydration_dev(h20, t0);
      append_hydration_dev(h20, t1);
      append_hydration_dev(h20, t2);
      append_hydration_dev(div1, t3);
      mount_component(switch0, div1, null);
      append_hydration_dev(div1, t4);
      mount_component(xorselector, div1, null);
      append_hydration_dev(div1, t5);
      append_hydration_dev(div1, div0);
      mount_component(regionsselector, div0, null);
      append_hydration_dev(div1, t6);
      if (if_block0) if_block0.m(div1, null);
      append_hydration_dev(div3, t7);
      append_hydration_dev(div3, div2);
      append_hydration_dev(div2, h21);
      append_hydration_dev(h21, t8);
      append_hydration_dev(h21, t9);
      append_hydration_dev(h21, t10);
      append_hydration_dev(div2, t11);
      mount_component(switch1, div2, null);
      append_hydration_dev(div3, t12);
      if (if_block1) if_block1.m(div3, null);
      current = true;
    },
    p: function update(new_ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        dirty = _ref2[0];
      ctx = new_ctx;
      if (!current || dirty & /*count*/4) set_data_dev(t1, /*count*/ctx[2]);
      var switch0_changes = {};
      if (dirty & /*flags*/2) switch0_changes.value = /*flags*/ctx[1].doFilter ? 'Filter' : 'Highlight';
      switch0.$set(switch0_changes);
      var xorselector_changes = {};
      if (dirty & /*$_currentLevel*/8) xorselector_changes.value = /*$_currentLevel*/ctx[3];
      if (dirty & /*$_availableLevels*/16) xorselector_changes.values = /*$_availableLevels*/ctx[4];
      xorselector.$set(xorselector_changes);
      var regionsselector_changes = {};
      if (dirty & /*$_focusedRootId*/32) regionsselector_changes.focusedId = /*$_focusedRootId*/ctx[5];
      if (dirty & /*$_roots*/64) regionsselector_changes.items = /*$_roots*/ctx[6];
      if (dirty & /*$_isMenuExpanded*/128) regionsselector_changes.showFocusedItem = /*$_isMenuExpanded*/ctx[7];
      regionsselector.$set(regionsselector_changes);
      if ( /*$_isMenuExpanded*/ctx[7]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*$_isMenuExpanded*/128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx);
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
      if (!current || dirty & /*count*/4) set_data_dev(t9, /*count*/ctx[2]);
      var switch1_changes = {};
      if (dirty & /*$_colorSchemeLabel*/1024) switch1_changes.value = /*$_colorSchemeLabel*/ctx[10];
      if (dirty & /*$_colorSchemeLabels*/2048) switch1_changes.values = /*$_colorSchemeLabels*/ctx[11];
      switch1.$set(switch1_changes);
      if ( /*flags*/ctx[1].showRankingControl) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*flags*/2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div3, null);
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
      transition_in(switch0.$$.fragment, local);
      transition_in(xorselector.$$.fragment, local);
      transition_in(regionsselector.$$.fragment, local);
      transition_in(if_block0);
      transition_in(switch1.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(switch0.$$.fragment, local);
      transition_out(xorselector.$$.fragment, local);
      transition_out(regionsselector.$$.fragment, local);
      transition_out(if_block0);
      transition_out(switch1.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
      destroy_component(switch0);
      destroy_component(xorselector);
      destroy_component(regionsselector);
      if (if_block0) if_block0.d();
      destroy_component(switch1);
      if (if_block1) if_block1.d();
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
  var count;
  var $_currentLevel;
  var $_availableLevels;
  var $_focusedRootId;
  var $_roots;
  var $_isMenuExpanded;
  var $_focusedRootDescendants;
  var $_focusedRoot;
  var $_colorSchemeLabel;
  var $_colorSchemeLabels;
  validate_store(_currentLevel, '_currentLevel');
  component_subscribe($$self, _currentLevel, function ($$value) {
    return $$invalidate(3, $_currentLevel = $$value);
  });
  validate_store(_availableLevels, '_availableLevels');
  component_subscribe($$self, _availableLevels, function ($$value) {
    return $$invalidate(4, $_availableLevels = $$value);
  });
  validate_store(_focusedRootId, '_focusedRootId');
  component_subscribe($$self, _focusedRootId, function ($$value) {
    return $$invalidate(5, $_focusedRootId = $$value);
  });
  validate_store(_roots, '_roots');
  component_subscribe($$self, _roots, function ($$value) {
    return $$invalidate(6, $_roots = $$value);
  });
  validate_store(_isMenuExpanded, '_isMenuExpanded');
  component_subscribe($$self, _isMenuExpanded, function ($$value) {
    return $$invalidate(7, $_isMenuExpanded = $$value);
  });
  validate_store(_focusedRootDescendants, '_focusedRootDescendants');
  component_subscribe($$self, _focusedRootDescendants, function ($$value) {
    return $$invalidate(8, $_focusedRootDescendants = $$value);
  });
  validate_store(_focusedRoot, '_focusedRoot');
  component_subscribe($$self, _focusedRoot, function ($$value) {
    return $$invalidate(9, $_focusedRoot = $$value);
  });
  validate_store(_colorSchemeLabel, '_colorSchemeLabel');
  component_subscribe($$self, _colorSchemeLabel, function ($$value) {
    return $$invalidate(10, $_colorSchemeLabel = $$value);
  });
  validate_store(_colorSchemeLabels, '_colorSchemeLabels');
  component_subscribe($$self, _colorSchemeLabels, function ($$value) {
    return $$invalidate(11, $_colorSchemeLabels = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
    $$props.$$scope;
  validate_slots('SettingsView', slots, []);
  var defaultHandlers = {
    toggledFiltering: null,
    toggledRanking: null
  };
  var _$$props$flags = $$props.flags,
    flags = _$$props$flags === void 0 ? {
      doFilter: false,
      showRankingControl: false
    } : _$$props$flags;
  var _$$props$handlers = $$props.handlers,
    handlers = _$$props$handlers === void 0 ? defaultHandlers : _$$props$handlers;

  /* event handlers */
  var focusedRoot = function focusedRoot(_ref3) {
    var rootId = _ref3.detail;
    return focusRoot(rootId);
  };
  var toggledRoot = function toggledRoot(_ref4) {
    var rootId = _ref4.detail;
    return toggleRoot(rootId);
  };
  var toggledRegion = function toggledRegion(_ref5) {
    var regionId = _ref5.detail;
    return toggleFocusedRootDescendant(regionId);
  };
  var writable_props = ['flags', 'handlers'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SettingsView> was created with unknown prop '".concat(key, "'"));
  });
  $$self.$$set = function ($$props) {
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('handlers' in $$props) $$invalidate(0, handlers = $$props.handlers);
  };
  $$self.$capture_state = function () {
    return {
      Switch: Switch,
      XorSelector: XorSelector,
      _colorSchemeLabel: _colorSchemeLabel,
      _colorSchemeLabels: _colorSchemeLabels,
      toggleColorScheme: toggleColorScheme,
      _availableLevels: _availableLevels,
      _currentLevel: _currentLevel,
      _focusedRoot: _focusedRoot,
      _focusedRootDescendants: _focusedRootDescendants,
      _focusedRootId: _focusedRootId,
      _isMenuExpanded: _isMenuExpanded,
      _roots: _roots,
      deselectAllFocusedRootChildren: deselectAllFocusedRootChildren,
      deselectAllRoots: deselectAllRoots,
      focusRoot: focusRoot,
      selectAllFocusedRootChildren: selectAllFocusedRootChildren,
      selectAllRoots: selectAllRoots,
      toggleFocusedRootDescendant: toggleFocusedRootDescendant,
      toggleRoot: toggleRoot,
      RegionsSelector: RegionsSelector$1,
      defaultHandlers: defaultHandlers,
      flags: flags,
      handlers: handlers,
      focusedRoot: focusedRoot,
      toggledRoot: toggledRoot,
      toggledRegion: toggledRegion,
      count: count,
      $_currentLevel: $_currentLevel,
      $_availableLevels: $_availableLevels,
      $_focusedRootId: $_focusedRootId,
      $_roots: $_roots,
      $_isMenuExpanded: $_isMenuExpanded,
      $_focusedRootDescendants: $_focusedRootDescendants,
      $_focusedRoot: $_focusedRoot,
      $_colorSchemeLabel: $_colorSchemeLabel,
      $_colorSchemeLabels: $_colorSchemeLabels
    };
  };
  $$self.$inject_state = function ($$props) {
    if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
    if ('handlers' in $$props) $$invalidate(0, handlers = $$props.handlers);
    if ('count' in $$props) $$invalidate(2, count = $$props.count);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*handlers*/1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, handlers = handlers ? _objectSpread(_objectSpread({}, defaultHandlers), handlers) : defaultHandlers);
    }
    if ($$self.$$.dirty & /*flags*/2) {
      $$invalidate(2, count = flags.showRankingControl ? 3 : 2);
    }
  };
  return [handlers, flags, count, $_currentLevel, $_availableLevels, $_focusedRootId, $_roots, $_isMenuExpanded, $_focusedRootDescendants, $_focusedRoot, $_colorSchemeLabel, $_colorSchemeLabels, focusedRoot, toggledRoot, toggledRegion];
}
var SettingsView = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SettingsView, _SvelteComponentDev);
  var _super = _createSuper(SettingsView);
  function SettingsView(options) {
    var _this;
    _classCallCheck(this, SettingsView);
    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      flags: 1,
      handlers: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "SettingsView",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }
  _createClass(SettingsView, [{
    key: "flags",
    get: function get() {
      throw new Error("<SettingsView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SettingsView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "handlers",
    get: function get() {
      throw new Error("<SettingsView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SettingsView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);
  return SettingsView;
}(SvelteComponentDev);
var SettingsView$1 = SettingsView;

var _makeColorBins = derived([_baseColorScale, _colorScheme], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    baseColorScale = _ref2[0],
    colors = _ref2[1].colors;
  return function (colScale) {
    var domain = colScale.domain();
    var ranges = pairs$1([domain[0]].concat(_toConsumableArray(baseColorScale.thresholds()), [domain[1]]));
    return map(zip(ranges, colors), makeWithKeys(['range', 'color']));
  };
});
var _colorBins = derived([_colorScale, _isExtentValid, _makeColorBins], function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 3),
    colorScale = _ref4[0],
    isExtentValid = _ref4[1],
    makeColorBins = _ref4[2];
  return isExtentValid && colorScale && makeColorBins(colorScale);
});

// modal utils

var hidden = {
  isVisible: false
};
var toggleIsVisible = transformValues({
  isVisible: negate
});

/* geo modal */

var _geoModal = writable(hidden);
var hideGeoModal = function hideGeoModal() {
  return _geoModal.set(hidden);
};
var toggleGeoModal = function toggleGeoModal() {
  return _geoModal.update(toggleIsVisible);
};

/* info modal */

var _infoModal = writable(hidden);
var hideInfoModal = function hideInfoModal() {
  return _infoModal.set(hidden);
};
var toggleInfoModal = function toggleInfoModal() {
  return _infoModal.update(toggleIsVisible);
};

var config = {
  noDataMessage: 'No data',
  noLegendMessage: 'No legend'
};

var types = {
  "Date_YYYYMMDD": {
    "format": "YYYYMMDD",
    "kind": "date",
    "type": "Datestring"
  },
  "URL": {
    "kind": "uri",
    "type": "string"
  },
  "NutsRegion": {
    "level": "int",
    "name": "GeoRegion.name",
    "nuts_id": "GeoRegion.<region_type>_id",
    "nuts_year_enforced": "GeoRegion.<region_type>_year_enforced",
    "nuts_year_spec": "GeoRegion.<region_type>_year_spec",
    "region_type": "nuts",
    "source_url": "GeoRegion.source_url",
    "source": "GeoRegion.source",
    "type": "GeoRegion"
  },
  "LepRegion": {
    "lep_id": "GeoRegion.id",
    "lep_year_enforced": "GeoRegion.year_enforced",
    "lep_year_spec": "GeoRegion.year_spec",
    "name": "GeoRegion.name",
    "region_type": "lep",
    "source_url": "GeoRegion.source_url",
    "source": "GeoRegion.source",
    "type": "GeoRegion"
  },
  "EUR": {
    "kind": "currency",
    "label": "Euro",
    "data_type": "int|float",
    "unit_string": "EUR",
    "type": "Unit"
  },
  "GBP": {
    "kind": "currency",
    "label": "British Pound",
    "data_type": "int|float",
    "unit_string": "GBP",
    "type": "Unit"
  },
  "USD": {
    "kind": "currency",
    "label": "US Dollar",
    "data_type": "int|float",
    "unit_string": "USD",
    "type": "Unit"
  },
  "GravimetricUnit": {
    "kind": "density",
    "label": "Gravimetric Units",
    "data_type": "int|float",
    "unit_string": "µg m^-3",
    "type": "Unit"
  },
  "Area_hectare": {
    "kind": "area",
    "label": "Hectare",
    "data_type": "int|float",
    "unit_string": "hectare",
    "type": "Unit"
  },
  "REF": {
    "kind": "score",
    "label": "REF score",
    "data_type": "int|float",
    "unit_string": "REF Score (1-4)",
    "type": "Unit"
  },
  "FTE": {
    "kind": "score",
    "label": "Full Time Equivalent",
    "data_type": "float",
    "unit_string": "FTE",
    "type": "Unit"
  },
  "BitTransferRate": {
    "kind": "bit transfer rate",
    "data_type": "float",
    "unit_string": "Mb/s",
    "type": "Unit"
  }
};

export { GeoFilterModal$1 as G, Header$1 as H, InfoModal$1 as I, SettingsRow$1 as S, _currentExtext as _, _isCurrentDataEmpty as a, _colorBins as b, _colorScale as c, _geoModal as d, _infoModal as e, InfoView$1 as f, SettingsView$1 as g, hideGeoModal as h, hideInfoModal as i, toggleGeoModal as j, config as k, types as l, toggleInfoModal as t };
